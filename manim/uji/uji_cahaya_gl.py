"""UJI COBA ManimGL, bukan video materi. Boleh dibuang.

Menjawab satu pertanyaan: apakah cahaya, jala, bayangan tipuan, dan kamera
terbang ala 3b1b terasa "hidup" di laptop ini, DAN di atas latar krem
"Studio Teknis" (bukan cuma di latar gelap tempat 3b1b biasa bekerja).
"""

import sys
from pathlib import Path

import numpy as np
from manimlib import *

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import tambal_manimgl  # noqa: E402,F401  (latex -no-pdf, lihat berkasnya)

# Palet MATRA (manim/matra_theme.py), disalin supaya berkas ini berdiri sendiri.
TERANG = dict(latar="#F7F3EE", tinta="#1F2430", redup="#8B8378",
              aksen="#C25E4D", aksen2="#3A6EA5", sorot="#6A4C93")
GELAP = dict(latar="#0E1016", tinta="#ECEAE4", redup="#5C6270",
             aksen="#FF6B5B", aksen2="#58C4DD", sorot="#B9A0E8")


def gundukan(x, y):
    return 2.2 * np.exp(-(x * x + y * y) / 2.5)


class UjiCahayaTerang(Scene):
    warna = TERANG
    default_camera_config = dict(background_color=TERANG["latar"])

    def construct(self):
        w = self.warna
        frame = self.frame

        # Lantai: bidang koordinat tipis, memberi rasa ruang.
        lantai = NumberPlane(
            x_range=(-4, 4, 1), y_range=(-4, 4, 1),
            background_line_style=dict(stroke_color=w["redup"], stroke_width=1, stroke_opacity=0.35),
            faded_line_style=dict(stroke_color=w["redup"], stroke_width=0.5, stroke_opacity=0.12),
        )
        sumbu = ThreeDAxes(x_range=(-4, 4, 1), y_range=(-4, 4, 1), z_range=(0, 3, 1))
        sumbu.set_stroke(w["redup"], width=2)

        # Permukaan bercahaya: shading (pantulan, kilap, bayangan-diri).
        permukaan = ParametricSurface(
            lambda u, v: sumbu.c2p(u, v, gundukan(u, v)),
            u_range=(-3.5, 3.5), v_range=(-3.5, 3.5), resolution=(101, 101),
        )
        permukaan.set_color(w["aksen2"], opacity=0.92)
        permukaan.set_shading(0.4, 0.3, 0.5)
        permukaan.always_sort_to_camera(self.camera)

        # Jala tipis: memberi "badan" pada permukaan.
        jala = SurfaceMesh(permukaan, resolution=(21, 21))
        jala.set_stroke(w["tinta"], width=1, opacity=0.18)

        # Bayangan tipuan ala 3b1b: salinan permukaan, tipis, digeser sedikit ke bawah.
        bayangan = permukaan.copy()
        bayangan.set_color(w["tinta"], opacity=0.22)
        bayangan.set_shading(0, 0, 0)
        bayangan.shift(0.03 * IN)

        # Tulisan tetap menempel di layar walau kamera terbang (fix_in_frame).
        # ATURAN ManimGL: `Text(color=...)` DIABAIKAN. Selalu `.set_color()` setelah dibuat.
        judul = Text("uji cahaya ManimGL", font_size=36).set_color(w["tinta"])
        judul.to_corner(UL, buff=0.5).fix_in_frame()
        rumus = Tex(r"z = 2{,}2\,e^{-(x^2+y^2)/2{,}5}", font_size=40)
        rumus.set_color(w["tinta"]).to_corner(UR, buff=0.5).fix_in_frame()

        frame.reorient(-35, 68, 0, center=(0, 0, 0.8), height=9)
        self.add(lantai, sumbu, judul, rumus)
        self.play(ShowCreation(permukaan), run_time=2.0)
        self.add(bayangan, permukaan, jala)
        self.play(FadeIn(jala), run_time=0.6)
        # Kamera terbang: perlahan, satu gerakan panjang, bukan potongan.
        self.play(frame.animate.reorient(35, 62, 0, center=(0, 0, 0.8), height=8), run_time=5.0)
        self.play(frame.animate.reorient(70, 78, 0, center=(0, 0, 0.8), height=9), run_time=2.4)


class UjiCahayaGelap(UjiCahayaTerang):
    warna = GELAP
    default_camera_config = dict(background_color=GELAP["latar"])
