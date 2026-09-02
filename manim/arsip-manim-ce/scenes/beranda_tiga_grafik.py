"""Beranda: tiga grafik sin, cos, tan sebagai loop mulus tanpa suara.

Dipakai di slide pertama korsel halaman depan. Tugasnya membuat pengunjung
berhenti sebentar dan berkata "wow", bukan mengajar. Karena itu tidak ada
narasi, tidak ada judul, dan tidak ada jeda: begitu halaman dimuat ia langsung
berjalan sendiri dan mengulang terus seperti GIF.

KENAPA KURVANYA YANG MENGALIR, BUKAN PENANDANYA YANG BERGERAK

Kalau kurvanya diam dan sebuah garis penanda bergeser dari kiri ke kanan, maka
frame terakhir (penanda di kanan) berbeda dari frame pertama (penanda di kiri).
Saat video diulang, bedanya terlihat sebagai kedipan.

Di sini kebalikannya: penandanya diam di tepi kiri, dan kurvanya yang mengalir
ke kanan mengikuti fase yang bertambah. Setelah fase bertambah tepat satu
putaran penuh, gambarnya kembali sama persis dengan awalnya, sebab sinus dan
kawan-kawannya berulang tiap 360 derajat. Jadi sambungan ulangnya benar-benar
mulus, bukan sekadar hampir.

Sudut lingkaran juga memakai fase yang sama, jadi jari-jarinya menyelesaikan
tepat satu putaran. Keduanya kembali ke keadaan awal pada saat yang sama.

WARNA: merah = sinus, biru = kosinus, ungu = tangen. Sama dengan situs.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import lingkungan  # noqa: E402,F401  -- menambal PATH MiKTeX, WAJIB sebelum manim

from manim import *  # noqa: E402
from matra_theme import Tema  # noqa: E402
import qc  # noqa: E402

# --- ZONA TETAP (bingkai 14,22 x 8; batas aman x +-6,91  y +-3,80) ---
PUSAT_LINGKARAN = np.array([-4.70, 0.0, 0.0])
JARI = 1.75

GRAF_X0 = -2.25          # tepi kiri papan grafik, tempat penanda berdiri
GRAF_X1 = 6.55           # tepi kanan
GRAF_Y = 0.0
AMPLI = 1.75             # tinggi satu satuan pada grafik
TAMPIL = 2.0 * TAU       # berapa radian yang muat di papan, dua putaran penuh

LAMA = 10.0              # detik satu putaran penuh, sekaligus panjang video
BATAS_TAN = 1.30         # tangen dipotong di sini, dalam satuan yang sama
                         # dengan sin dan cos. Angka 2.35 dipakai di render
                         # pertama dan salah: dikali AMPLI hasilnya 4.11
                         # satuan, melewati setengah tinggi bingkai 4.0,
                         # jadi tangennya keluar layar dan menabrak legenda.


def x_layar(u: float) -> float:
    """Ubah sudut u (radian, 0 di penanda) menjadi koordinat mendatar layar."""
    return GRAF_X0 + (u / TAMPIL) * (GRAF_X1 - GRAF_X0)


class BerandaTigaGrafik(Scene):
    tema = "terang"

    def construct(self):
        t = Tema(self.tema)
        self.t = t
        t.pasang(self)

        fase = ValueTracker(0.0)

        # ---------------- lingkaran satuan di kiri ----------------
        # fill_opacity=0 WAJIB ditulis. Tanpa itu `set_opacity` di bawah akan
        # menyetel opasitas ISI sekaligus GARIS, dan lingkarannya berubah jadi
        # cakram abu penuh. Cacat itu terlihat di lembar kontak render pertama.
        lingkaran = Circle(radius=JARI, color=t.redup, stroke_width=2.5,
                           fill_opacity=0)
        lingkaran.move_to(PUSAT_LINGKARAN).set_stroke(opacity=0.55)
        sumbu_l = VGroup(
            Line(PUSAT_LINGKARAN + LEFT * (JARI + 0.35),
                 PUSAT_LINGKARAN + RIGHT * (JARI + 0.35),
                 color=t.redup, stroke_width=1.6).set_opacity(0.5),
            Line(PUSAT_LINGKARAN + DOWN * (JARI + 0.35),
                 PUSAT_LINGKARAN + UP * (JARI + 0.35),
                 color=t.redup, stroke_width=1.6).set_opacity(0.5),
        )

        def titik_lingkaran() -> np.ndarray:
            a = fase.get_value()
            return PUSAT_LINGKARAN + np.array([np.cos(a) * JARI, np.sin(a) * JARI, 0.0])

        jari = always_redraw(lambda: Line(
            PUSAT_LINGKARAN, titik_lingkaran(), color=t.tinta, stroke_width=3.5))
        ruas_cos = always_redraw(lambda: Line(
            PUSAT_LINGKARAN,
            PUSAT_LINGKARAN + RIGHT * (np.cos(fase.get_value()) * JARI),
            color=t.aksen2, stroke_width=6).set_opacity(0.9))
        ruas_sin = always_redraw(lambda: Line(
            PUSAT_LINGKARAN + RIGHT * (np.cos(fase.get_value()) * JARI),
            titik_lingkaran(), color=t.aksen, stroke_width=6).set_opacity(0.9))
        bulat = always_redraw(lambda: Dot(
            titik_lingkaran(), color=t.sorot, radius=0.085))

        # ---------------- papan grafik di kanan ----------------
        sumbu_g = Line([GRAF_X0, GRAF_Y, 0], [GRAF_X1, GRAF_Y, 0],
                       color=t.redup, stroke_width=1.6).set_opacity(0.5)
        penanda = Line([GRAF_X0, GRAF_Y - AMPLI - 0.42, 0],
                       [GRAF_X0, GRAF_Y + AMPLI + 0.42, 0],
                       color=t.redup, stroke_width=1.6).set_opacity(0.55)

        def kurva(fungsi, warna, potong=None):
            """Kurva yang mengalir: nilainya diambil pada sudut fase + u."""
            def buat():
                titik: list[np.ndarray] = []
                potongan: list[list[np.ndarray]] = []
                langkah = 420
                for i in range(langkah + 1):
                    u = TAMPIL * i / langkah
                    nilai = fungsi(fase.get_value() + u)
                    if potong is not None and abs(nilai) > potong:
                        if len(titik) > 1:
                            potongan.append(titik)
                        titik = []
                        continue
                    titik.append(np.array([x_layar(u), GRAF_Y + nilai * AMPLI, 0.0]))
                if len(titik) > 1:
                    potongan.append(titik)
                # set_points_as_corners, BUKAN set_points_smoothly. Penghalusan
                # melengkungkan potongan curam sampai menyembul melewati batas
                # yang baru saja dipotong. Dengan 420 cuplikan, garis patah pun
                # sudah terlihat mulus di mata.
                return VGroup(*[
                    VMobject(color=warna, stroke_width=3.5).set_points_as_corners(p)
                    for p in potongan
                ])
            return always_redraw(buat)

        k_sin = kurva(np.sin, t.aksen)
        k_cos = kurva(np.cos, t.aksen2)
        k_tan = kurva(np.tan, t.sorot, potong=BATAS_TAN)

        # titik di tepi kiri, tempat nilai sekarang dibaca
        def titik_di_penanda(fungsi, warna, potong=None):
            def buat():
                nilai = fungsi(fase.get_value())
                if potong is not None and abs(nilai) > potong:
                    return VGroup()
                return Dot([GRAF_X0, GRAF_Y + nilai * AMPLI, 0], color=warna, radius=0.075)
            return always_redraw(buat)

        d_sin = titik_di_penanda(np.sin, t.aksen)
        d_cos = titik_di_penanda(np.cos, t.aksen2)
        d_tan = titik_di_penanda(np.tan, t.sorot, potong=BATAS_TAN)

        # garis penghubung dari tinggi titik di lingkaran ke titik sinus
        sambung = always_redraw(lambda: DashedLine(
            titik_lingkaran(),
            [GRAF_X0, GRAF_Y + np.sin(fase.get_value()) * AMPLI, 0],
            color=t.aksen, stroke_width=1.8, dash_length=0.11).set_opacity(0.55))

        # ---------------- keterangan warna ----------------
        legenda = VGroup(
            MathTex(r"\sin", color=t.aksen, font_size=30),
            MathTex(r"\cos", color=t.aksen2, font_size=30),
            MathTex(r"\tan", color=t.sorot, font_size=30),
        ).arrange(RIGHT, buff=0.55)
        legenda.move_to([(GRAF_X0 + GRAF_X1) / 2, GRAF_Y + AMPLI + 1.05, 0])

        semua = VGroup(lingkaran, sumbu_l, sumbu_g, penanda, legenda)
        qc.periksa_adegan({"semua": semua, "legenda": legenda})

        self.add(sumbu_l, lingkaran, sumbu_g, penanda, legenda,
                 k_tan, k_cos, k_sin, sambung,
                 ruas_cos, ruas_sin, jari, bulat, d_tan, d_cos, d_sin)

        # Satu putaran penuh, laju TETAP. `rate_func=linear` wajib: fungsi laju
        # bawaan melambat di ujung, dan perlambatan itu terlihat sebagai sentakan
        # setiap kali video mengulang.
        self.play(fase.animate.set_value(TAU), run_time=LAMA, rate_func=linear)
