"""Trigonometri — animasi utama: "Ukurannya beda, perbandingannya sama".

Kelas 10, Bab 4. Melawan miskonsepsi resmi Kurikulum Merdeka: siswa mengira
nilai tan/sin/cos adalah angka mati, padahal ia perbandingan yang tetap sama
pada segitiga sebangun.

CATATAN REVISI 31 Agu 2026 — versi pertama punya 6 cacat yang lolos karena
hanya dicek "render sukses", tidak pernah ditonton:
  * warna "depan" belang (akibat mewarnai per nomor karakter, bukan per kata)
  * teks kesimpulan menindih segitiga dan keluar tepi kanan
  * label theta tidak ikut bergerak saat segitiga membesar
  * layar kosong 1 detik di awal
  * pecahan tampil separuh saat sedang ditulis
  * kotak sorot meleset dari angkanya

Perbaikannya struktural, bukan tambal:
  1. Layar dibagi ZONA tetap. Kiri = geometri, kanan = hitungan, bawah = kesimpulan.
  2. Setiap potongan rumus dibangun sebagai objek terpisah lalu diwarnai
     langsung — tidak ada lagi pengirisan indeks karakter.
  3. `qc.periksa_adegan` dipanggil di tiap tahap. Kalau ada yang bertindih atau
     keluar bingkai, render GAGAL, bukan diam-diam lolos.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from manim import *  # noqa: E402
from matra_theme import Tema  # noqa: E402
import qc  # noqa: E402

# --- ZONA TETAP (satuan layar; bingkai 14,22 x 8) ---
Y_JUDUL = 3.35
POJOK = np.array([-6.2, -2.0, 0.0])   # titik sudut theta segitiga
X_KANAN = 3.5                          # sumbu kolom hitungan
Y_RUMUS = 2.0
Y_HITUNG = 0.35
Y_BAWAH = -3.35                        # baris kesimpulan, selebar layar
SATUAN = 1.0                           # 1 cm = 1 satuan layar
SUDUT = np.arctan(0.75)                # segitiga 3-4-5 -> tan = 0,75


def pecahan(atas: Mobject, bawah: Mobject, warna) -> VGroup:
    """Pecahan yang dirakit sendiri supaya tiap bagian bisa diwarnai dengan pasti."""
    lebar = max(atas.width, bawah.width) + 0.2
    garis = Line(LEFT * lebar / 2, RIGHT * lebar / 2, color=warna, stroke_width=3)
    atas.next_to(garis, UP, buff=0.13)
    bawah.next_to(garis, DOWN, buff=0.13)
    return VGroup(atas, garis, bawah)


def koma(nilai: float) -> str:
    return f"{nilai:.1f}".rstrip("0").rstrip(".").replace(".", "{,}")


class UkuranBedaRasioSama(Scene):
    tema = "terang"

    def construct(self):
        t = Tema(self.tema)
        t.pasang(self)

        skala = ValueTracker(2.4)  # panjang sisi samping, dalam cm

        def b():
            return POJOK + RIGHT * skala.get_value() * SATUAN

        def c():
            return b() + UP * skala.get_value() * np.tan(SUDUT) * SATUAN

        # ---------- ZONA KIRI: geometri ----------
        samping = always_redraw(lambda: Line(POJOK, b(), color=t.aksen2, stroke_width=6))
        depan = always_redraw(lambda: Line(b(), c(), color=t.aksen, stroke_width=6))
        miring = always_redraw(lambda: Line(c(), POJOK, color=t.tinta, stroke_width=6))
        # Kedua garis harus BERANGKAT dari titik siku-siku, supaya tandanya jatuh
        # di dalam segitiga. Versi sebelumnya memakai Line(POJOK, b()) yang arahnya
        # menjauh, sehingga tanda siku muncul di luar segitiga — salah secara geometri.
        siku = always_redraw(lambda: RightAngle(
            Line(b(), POJOK), Line(b(), c()), length=0.32, color=t.redup, stroke_width=3))

        # busur DAN labelnya sama-sama ikut membesar — ini yang dulu diam di tempat
        def jari():
            return 0.42 + 0.13 * skala.get_value()

        busur = always_redraw(lambda: Angle(
            Line(POJOK, b()), Line(POJOK, c()), radius=jari(), color=t.sorot, stroke_width=5))
        lab_theta = always_redraw(lambda: MathTex(r"\theta", color=t.sorot, font_size=38)
                                  .move_to(POJOK + rotate_vector(
                                      RIGHT * (jari() + 0.42), SUDUT / 2)))

        lab_samping = always_redraw(lambda: MathTex(
            koma(skala.get_value()) + r"\ \text{cm}", color=t.aksen2, font_size=32
        ).next_to(Line(POJOK, b()), DOWN, buff=0.25))
        lab_depan = always_redraw(lambda: MathTex(
            koma(skala.get_value() * np.tan(SUDUT)) + r"\ \text{cm}", color=t.aksen, font_size=32
        ).next_to(Line(b(), c()), RIGHT, buff=0.25))

        segitiga = VGroup(samping, depan, miring, siku, busur, lab_theta,
                          lab_samping, lab_depan)

        # ---------- ZONA ATAS: judul ----------
        judul = Text("Perbandingan Trigonometri", font_size=40, color=t.tinta).move_to([0, Y_JUDUL, 0])

        # ---------- ZONA KANAN: rumus (dirakit, bukan diiris indeks) ----------
        kiri_rumus = MathTex(r"\tan\theta=", color=t.tinta, font_size=46)
        frac_kata = pecahan(
            MathTex(r"\text{depan}", color=t.aksen, font_size=40),
            MathTex(r"\text{samping}", color=t.aksen2, font_size=40),
            t.tinta,
        )
        rumus = VGroup(kiri_rumus, frac_kata).arrange(RIGHT, buff=0.22).move_to([X_KANAN, Y_RUMUS, 0])

        self.play(Write(judul), Create(miring), run_time=1.0)
        self.play(Create(samping), Create(depan), run_time=1.0)
        self.play(Create(siku), Create(busur), FadeIn(lab_theta), run_time=0.7)
        self.play(FadeIn(lab_samping, shift=UP * 0.2),
                  FadeIn(lab_depan, shift=LEFT * 0.2), run_time=0.7)

        qc.periksa_adegan(
            {"judul": judul, "segitiga": segitiga},
            [("judul", "segitiga")],
        )

        self.play(Write(rumus), run_time=1.5)
        qc.periksa_adegan({"rumus": rumus, "segitiga": segitiga, "judul": judul},
                          [("rumus", "segitiga"), ("rumus", "judul")])
        self.wait(0.4)

        # ---------- hitungan pertama ----------
        def baris_hitung(atas_teks, bawah_teks, hasil_teks):
            sama1 = MathTex("=", color=t.tinta, font_size=46)
            frac = pecahan(MathTex(atas_teks, color=t.aksen, font_size=40),
                           MathTex(bawah_teks, color=t.aksen2, font_size=40), t.tinta)
            sama2 = MathTex("=", color=t.tinta, font_size=46)
            hasil = MathTex(hasil_teks, color=t.sorot, font_size=52)
            g = VGroup(sama1, frac, sama2, hasil).arrange(RIGHT, buff=0.24)
            g.move_to([X_KANAN, Y_HITUNG, 0])
            return g, hasil

        hitung1, hasil1 = baris_hitung("1{,}8", "2{,}4", "0{,}75")
        self.play(Write(hitung1), run_time=1.4)
        kotak = SurroundingRectangle(hasil1, color=t.sorot, buff=0.18,
                                     stroke_width=3, corner_radius=0.08)
        self.play(Create(kotak), run_time=0.6)
        qc.periksa_adegan({"hitung1": hitung1, "segitiga": segitiga, "rumus": rumus},
                          [("hitung1", "segitiga"), ("hitung1", "rumus")])
        self.wait(0.8)

        # ---------- segitiga membesar ----------
        pesan = Text("Segitiganya kita besarkan…", font_size=30, color=t.redup)
        pesan.move_to([0, Y_BAWAH, 0])
        self.play(FadeIn(pesan), run_time=0.5)
        self.play(skala.animate.set_value(4.0), run_time=2.4, rate_func=smooth)
        qc.periksa_adegan({"segitiga": segitiga, "pesan": pesan, "hitung1": hitung1},
                          [("segitiga", "pesan"), ("segitiga", "hitung1")])
        self.wait(0.4)

        # ---------- hitungan kedua ----------
        hitung2, hasil2 = baris_hitung("3", "4", "0{,}75")
        self.play(ReplacementTransform(hitung1, hitung2),
                  kotak.animate.surround(hasil2, buff=0.18),
                  FadeOut(pesan), run_time=1.5)
        self.wait(0.4)

        # ---------- kesimpulan ----------
        kunci = Text("Ukurannya beda. Perbandingannya sama.", font_size=36, color=t.tinta)
        kunci.set(width=min(kunci.width, 9.0)).move_to([0, Y_BAWAH, 0])
        self.play(Write(kunci), run_time=1.6)

        qc.periksa_adegan(
            {"judul": judul, "segitiga": segitiga, "rumus": rumus,
             "hitung2": hitung2, "kunci": kunci, "kotak": kotak},
            [("kunci", "segitiga"), ("kunci", "hitung2"), ("segitiga", "hitung2"),
             ("segitiga", "rumus"), ("rumus", "judul"), ("hitung2", "rumus")],
        )

        self.play(Indicate(hasil2, color=t.sorot, scale_factor=1.22), run_time=1.0)
        self.wait(1.8)


class UkuranBedaRasioSamaGelap(UkuranBedaRasioSama):
    tema = "gelap"
