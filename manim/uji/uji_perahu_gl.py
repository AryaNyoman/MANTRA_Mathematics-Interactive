"""UJI COBA 2 ManimGL: perahu 3D di air bergelombang. Calon pembuka Vektor Materi 01.

Pertanyaan yang dijawab: bisakah benda dunia nyata (perahu, air, tepi sungai)
terlihat seperti bendanya, bergerak hidup, lalu kamera terbang ke pandangan
peta tempat matematikanya (panah dayung dan arus) muncul di atas gambar itu.

Pelajaran dari percobaan pertama (2 Sep 2026), berlaku untuk semua adegan 3D:
- Benda yang mengapung harus punya badan DI ATAS garis air, kalau tidak ia
  tertutup permukaan air dan cuma tiangnya yang terlihat.
- Bidang tipis (layar, kertas) dilihat dari atas jadi garis. Miringkan sedikit.
- Jangan menumpuk rotasi kecil tiap frame; bangun ulang dari salinan asli
  (`become`) supaya tidak menyimpang.
- Riak air: tiga gelombang beda arah dan kecil, bukan satu gelombang rapi.
"""

import sys
from pathlib import Path

import numpy as np
from manimlib import *

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import tambal_manimgl  # noqa: E402,F401  (latex -no-pdf di MiKTeX)

# Palet Studio Teknis (manim/matra_theme.py).
LATAR, TINTA, REDUP = "#F7F3EE", "#1F2430", "#8B8378"
AKSEN, AKSEN2, SOROT = "#C25E4D", "#3A6EA5", "#6A4C93"

# Sungai: x searah aliran, y melintang dari tepi ke tepi, z ke atas.
LEBAR, PANJANG = 6.0, 16.0
X0, Y0 = -2.6, -LEBAR / 2 + 0.8          # posisi perahu (dekat tepi berangkat)

# Perahu: panjang, setengah lebar, kedalaman di bawah air, badan di atas air.
L, W, D, F = 2.0, 0.6, 0.35, 0.25


def tinggi_air(x, y, t):
    """Tiga riak kecil yang saling silang, semuanya hanyut ke arah +x (arus)."""
    return (0.06 * np.sin(1.4 * x - 1.6 * t) * np.cos(0.9 * y + 0.5 * t)
            + 0.035 * np.sin(2.3 * x - 1.1 * y - 2.2 * t)
            + 0.025 * np.sin(0.8 * x + 1.7 * y - 1.3 * t))


def buat_perahu():
    """Perahu di titik asal, garis air di z = 0, haluan menghadap +x."""
    def lambung_uv(u, v):
        g = max(0.0, 1 - u * u) ** 0.7       # lebar mengecil ke ujung, ujungnya lancip
        h = 1 - u ** 4                        # kedalaman mengecil ke ujung
        return np.array([L * u, W * g * v, F - (D + F) * h * (1 - v * v)])

    lambung = ParametricSurface(lambung_uv, u_range=(-1, 1), v_range=(-1, 1), resolution=(51, 25))
    lambung.set_color(TINTA, opacity=1.0)
    lambung.set_shading(0.4, 0.3, 0.5)
    geladak = ParametricSurface(
        # Geladak sedikit lebih sempit dari lambung supaya bibir lambung terlihat dari atas.
        lambda u, v: np.array([L * u, 0.9 * W * max(0.0, 1 - u * u) ** 0.7 * v, F]),
        u_range=(-1, 1), v_range=(-1, 1), resolution=(51, 7),
    )
    geladak.set_color(REDUP, opacity=1.0)
    geladak.set_shading(0.2, 0.1, 0.3)
    tiang = Cylinder(height=1.15, radius=0.035).set_color(TINTA)
    tiang.move_to([0.15, 0, F + 0.575])
    layar = Polygon([0.15, 0, F + 1.05], [0.15, 0, F + 0.30], [0.95, 0, F + 0.35])
    layar.set_fill(LATAR, 1.0).set_stroke(TINTA, 1.5)
    layar.rotate(45 * DEGREES, axis=OUT, about_point=np.array([0.15, 0, 0]))
    return Group(lambung, geladak, tiang, layar)


class PerahuDiAir(Scene):
    default_camera_config = dict(background_color=LATAR)

    def construct(self):
        frame = self.frame

        # --- Air: permukaan yang digambar ulang tiap frame mengikuti waktu adegan.
        def buat_air():
            t = self.time
            air = ParametricSurface(
                lambda u, v: np.array([u, v, tinggi_air(u, v, t)]),
                u_range=(-PANJANG / 2, PANJANG / 2), v_range=(-LEBAR / 2, LEBAR / 2),
                resolution=(121, 61),
            )
            air.set_color(AKSEN2, opacity=0.95)
            air.set_shading(0.5, 0.5, 0.3)   # air lebih berkilap daripada gundukan
            return air
        air = always_redraw(buat_air)

        # --- Tepi sungai: dua bidang pasir, sedikit di atas muka air.
        def tepi(y_tengah):
            b = Square3D(side_length=1.0)
            b.stretch_to_fit_width(PANJANG).stretch_to_fit_height(2.4)
            b.move_to([0, y_tengah, 0.18])
            b.set_color(REDUP, opacity=0.35)
            b.set_shading(0, 0, 0)
            return b
        tepi_jauh, tepi_dekat = tepi(LEBAR / 2 + 1.2), tepi(-LEBAR / 2 - 1.2)

        # --- Perahu mengangguk mengikuti gelombang. Tiap frame dibangun ulang dari
        #     salinan asli supaya rotasi tidak menumpuk dan menyimpang.
        perahu_asli = buat_perahu()
        perahu = perahu_asli.copy()

        def goyang(m):
            t, eps = self.time, 0.15
            z = tinggi_air(X0, Y0, t)
            angguk = -np.arctan((tinggi_air(X0 + eps, Y0, t) - tinggi_air(X0 - eps, Y0, t)) / (2 * eps))
            oleng = np.arctan((tinggi_air(X0, Y0 + eps, t) - tinggi_air(X0, Y0 - eps, t)) / (2 * eps))
            baru = perahu_asli.copy()
            baru.rotate(angguk, axis=UP, about_point=ORIGIN)
            baru.rotate(oleng, axis=RIGHT, about_point=ORIGIN)
            baru.shift([X0, Y0, z])
            m.become(baru)
        goyang(perahu)
        perahu.add_updater(goyang)

        judul = Text("uji perahu 3D", font_size=30).set_color(REDUP)
        judul.to_corner(DR, buff=0.4).fix_in_frame()

        # --- Babak 1: pandangan samping dekat, perahu mengapung (3 detik).
        frame.reorient(-32, 72, 0, center=(X0 + 0.4, Y0 + 0.5, 0.35), height=5.0)
        self.add(tepi_jauh, tepi_dekat, air, perahu, judul)
        self.wait(3.0)

        # --- Babak 2: kamera terbang ke atas sampai jadi pandangan peta (5 detik).
        self.play(frame.animate.reorient(0, 0, 0, center=(0, 0, 0), height=10.0), run_time=5.0)

        # --- Babak 3: matematikanya muncul DI ATAS gambar: panah dayung dan arus.
        Z = 1.6   # di atas puncak tiang, supaya tidak tertutup apa pun dari atas
        asal = np.array([X0, Y0, Z])
        p_dayung = Arrow(asal, asal + 3.0 * UP, buff=0, thickness=5).set_color(AKSEN2)
        p_arus = Arrow(asal, asal + 2.0 * RIGHT, buff=0, thickness=5).set_color(AKSEN)
        l_dayung = Text("dayung 3 km", font_size=30).set_color(AKSEN2)
        l_dayung.next_to(p_dayung, LEFT, buff=0.2)
        l_arus = Text("arus 2 km", font_size=30).set_color(AKSEN)
        l_arus.next_to(p_arus, RIGHT, buff=0.15)
        n_jauh = Text("tepi seberang", font_size=30).set_color(TINTA).move_to([-5.5, LEBAR / 2 + 1.2, Z])
        n_dekat = Text("tepi berangkat", font_size=30).set_color(TINTA).move_to([-5.4, -LEBAR / 2 - 1.2, Z])
        self.play(FadeIn(n_jauh), FadeIn(n_dekat), run_time=0.8)
        self.play(GrowArrow(p_dayung), FadeIn(l_dayung), run_time=1.2)
        self.play(GrowArrow(p_arus), FadeIn(l_arus), run_time=1.2)
        self.wait(2.0)
