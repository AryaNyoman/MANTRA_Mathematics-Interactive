"""Tahap 2 — Perbandingan yang tidak berubah.

MENGGANTIKAN video lama `UkuranBedaRasioSama` (17 detik, tanpa narasi), yang
dirilis pada 31 Agu 2026 dengan 7 cacat karena hanya dicek lognya. Berkas ini
ditulis ulang dari nol mengikuti pola tahap 4-9.

STORYBOARD (ditulis lebih dulu, kode menyusul):

  1. Judul pembuka; dugaan dari tahap 1 diingatkan.
  2. Segitiga muncul dengan ukuran 1,8 dan 2,4 sentimeter.
  3. Hasil baginya dihitung: 0,75.
  4. Segitiga DIBESARKAN — sudutnya tidak disentuh.
  5. Ukuran barunya terbaca: 3 dan 4.
  6. Dibagi lagi: tetap 0,75. Kedua hasil disandingkan.
  7. Sebabnya: kedua sisi dikali angka yang sama.
  8. Pengali di atas dan di bawah dicoret — saling menghapus.
  9. Sekarang SUDUTNYA yang diubah; barulah angkanya bergerak.
 10. Penutup.

INTI YANG HARUS TERTANAM: yang membuat hasil baginya tetap bukan keajaiban,
melainkan pembilang dan penyebut dikali angka yang sama. Karena itu babak 7-8
(pencoretan) adalah puncak video ini, bukan tempelan.

ATURAN YANG DIPATUHI — sama dengan tahap 4-9.

WARNA: biru = samping · merah = depan · tinta = miring · ungu = sudut/hasil
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import lingkungan  # noqa: E402,F401  -- menambal PATH MiKTeX, WAJIB sebelum manim

from manim import *  # noqa: E402
from matra_theme import Tema  # noqa: E402
import qc  # noqa: E402
import sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "tahap2-perbandingan-tetap"
DURASI: dict[str, float] = json.loads(
    (AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8")
)["segmen"]

# --- ZONA TETAP (bingkai 14,22 x 8; batas aman x ±6,91  y ±3,80) ---
SIKU = np.array([-6.10, -1.95, 0.0])
SATUAN = 1.02                  # panjang layar untuk 1 sentimeter
RASIO = 0.75                   # depan / samping — tetap sepanjang video
AWAL, BESAR = 2.40, 4.00       # panjang sisi samping, dalam sentimeter

X_KANAN = 2.75
Y_BARIS = [2.35, 1.05, -0.35]
Y_SEBAB = -1.85
Y_PENUTUP = -3.30


class PerbandinganTetap(Scene):
    tema = "terang"

    # ==================================================================
    def construct(self):
        self.t = Tema(self.tema)
        self.t.pasang(self)
        self.samping_cm = ValueTracker(AWAL)
        self.rasio = ValueTracker(RASIO)
        self.siapkan_segitiga()

        self.b01_sapa()
        self.b02_segitiga()
        self.b03_bagi1()
        self.b04_besarkan()
        self.b05_ukur2()
        self.b06_bagi2()
        self.b07_kenapa()
        self.b08_hapus()
        self.b09_geser()
        self.b10_tutup()

    # ==================================================================
    def B(self):
        return SIKU + RIGHT * self.samping_cm.get_value() * SATUAN

    def C(self):
        return self.B() + UP * self.samping_cm.get_value() * self.rasio.get_value() * SATUAN

    def siapkan_segitiga(self):
        t = self.t
        self.samping = always_redraw(
            lambda: Line(SIKU, self.B(), color=t.aksen2, stroke_width=6))
        self.depan = always_redraw(
            lambda: Line(self.B(), self.C(), color=t.aksen, stroke_width=6))
        self.miring = always_redraw(
            lambda: Line(SIKU, self.C(), color=t.tinta, stroke_width=6))
        # Kedua garis berangkat DARI titik siku, supaya tandanya jatuh di dalam
        # segitiga. Versi lama menaruhnya di luar — salah geometri.
        self.siku = always_redraw(
            lambda: RightAngle(Line(self.B(), SIKU), Line(self.B(), self.C()),
                               length=0.28, color=t.redup, stroke_width=3))
        self.busur = always_redraw(
            lambda: Arc(radius=0.52, start_angle=0,
                        angle=np.arctan(self.rasio.get_value()),
                        arc_center=SIKU, color=t.sorot, stroke_width=5))
        self.lab_theta = MathTex(r"\theta", color=t.sorot, font_size=32)
        self.lab_theta.add_updater(lambda m: m.move_to(
            SIKU + rotate_vector(RIGHT * 0.92, np.arctan(self.rasio.get_value()) / 2)))
        self.segitiga = VGroup(self.samping, self.depan, self.miring,
                               self.siku, self.busur, self.lab_theta)

    def koma(self, nilai, digit=1):
        return f"{nilai:.{digit}f}".rstrip("0").rstrip(".").replace(".", "{,}")

    def angka_sisi(self):
        """Dua label ukuran yang menempel pada sisinya dan ikut berubah."""
        t = self.t
        s = sinema.AngkaKoma(AWAL, num_decimal_places=1, color=t.aksen2, font_size=28)
        s.add_updater(lambda m: m.set_value(self.samping_cm.get_value())
                      .next_to(Line(SIKU, self.B()), DOWN, buff=0.22))
        d = sinema.AngkaKoma(AWAL * RASIO, num_decimal_places=1,
                             color=t.aksen, font_size=28)
        d.add_updater(lambda m: m.set_value(
            self.samping_cm.get_value() * self.rasio.get_value())
            .next_to(Line(self.B(), self.C()), RIGHT, buff=0.22))
        return s, d

    def baris(self, i, *bagian, ukuran=36, warna=None):
        m = MathTex(*bagian, color=warna or self.t.tinta, font_size=ukuran)
        m.move_to([X_KANAN, Y_BARIS[i], 0])
        return m

    # ==================================================================
    # Babak
    # ==================================================================
    def penanda_bagian(self, teks: str):
        """Penanda bagian di pojok kiri atas — permintaan ARYA supaya siswa tahu
        video ini punya dua babak: dulu MEMBUKTIKAN, baru MENJELASKAN sebabnya."""
        t = self.t
        m = Text(teks, font_size=22, color=t.redup)
        sinema.batasi_lebar(m, 4.4)
        m.move_to([-3.90, 3.35, 0])
        return m

    def b01_sapa(self):
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Perbandingan yang tidak berubah", self.t,
                                 lama=DURASI["sapa"] * 0.52)
            b.catat(DURASI["sapa"] * 0.52)
            self.bagian = self.penanda_bagian("Bagian 1 — buktinya")
            b.main(FadeIn(self.bagian), run_time=0.9)
            b.main(Create(self.miring), Create(self.samping), Create(self.depan),
                   Create(self.siku), run_time=2.2)
        qc.periksa_adegan({"segitiga": self.segitiga, "bagian": self.bagian},
                          [("bagian", "segitiga")])

    def b02_segitiga(self):
        self.lab_s, self.lab_d = self.angka_sisi()
        self.ukuran = VGroup(self.lab_s, self.lab_d)
        with sinema.babak(self, "segitiga", DURASI) as b:
            b.main(Create(self.busur), FadeIn(self.lab_theta), run_time=1.4)
            b.main(FadeIn(self.lab_d, shift=LEFT * 0.15), run_time=1.6)
            b.main(FadeIn(self.lab_s, shift=UP * 0.15), run_time=1.6)
            b.jeda(1.4)
        qc.periksa_adegan({"segitiga": self.segitiga, "ukuran": self.ukuran})

    def b03_bagi1(self):
        t = self.t
        self.h1 = self.baris(0, r"\frac{1{,}8}{2{,}4}", "=", "0{,}75")
        self.h1[0].set_color(t.tinta)
        self.h1[2].set_color(t.sorot)
        with sinema.babak(self, "bagi1", DURASI) as b:
            b.main(Write(self.h1), run_time=3.0)
            b.main(Indicate(self.h1[2], scale_factor=1.18, color=t.sorot), run_time=1.6)
            b.jeda(1.4)
        qc.periksa_adegan({"h1": self.h1, "segitiga": self.segitiga,
                           "ukuran": self.ukuran},
                          [("h1", "segitiga"), ("h1", "ukuran")])

    def b04_besarkan(self):
        t = self.t
        jaga = Text("sudutnya tidak disentuh", font_size=22, color=t.redup)
        sinema.batasi_lebar(jaga, 3.6)
        jaga.move_to([X_KANAN, Y_SEBAB, 0])
        with sinema.babak(self, "besarkan", DURASI) as b:
            b.main(FadeIn(jaga, shift=UP * 0.12), run_time=1.2)
            b.main(self.samping_cm.animate.set_value(BESAR), run_time=3.6)
            b.main(Indicate(self.busur, scale_factor=1.0, color=t.sorot), run_time=1.4)
        self.jaga = jaga
        qc.periksa_adegan({"segitiga": self.segitiga, "ukuran": self.ukuran,
                           "jaga": jaga, "h1": self.h1},
                          [("segitiga", "h1"), ("jaga", "segitiga")])

    def b05_ukur2(self):
        t = self.t
        with sinema.babak(self, "ukur2", DURASI) as b:
            b.main(Indicate(self.lab_d, scale_factor=1.3, color=t.aksen), run_time=1.8)
            b.main(Indicate(self.lab_s, scale_factor=1.3, color=t.aksen2), run_time=1.8)
            b.jeda(1.4)
        qc.periksa_adegan({"ukuran": self.ukuran, "segitiga": self.segitiga})

    def b06_bagi2(self):
        t = self.t
        self.h2 = self.baris(1, r"\frac{3}{4}", "=", "0{,}75")
        self.h2[0].set_color(t.tinta)
        self.h2[2].set_color(t.sorot)
        kotak = SurroundingRectangle(VGroup(self.h1[2], self.h2[2]), color=t.sorot,
                                     buff=0.20, stroke_width=3, corner_radius=0.08)
        with sinema.babak(self, "bagi2", DURASI) as b:
            b.main(Write(self.h2), run_time=2.6)
            b.main(Create(kotak), run_time=1.4)
            b.jeda(1.6)
        self.kotak_sama = kotak
        qc.periksa_adegan({"h1": self.h1, "h2": self.h2, "kotak": kotak,
                           "segitiga": self.segitiga},
                          [("h2", "segitiga"), ("kotak", "segitiga")])

    def b07_kenapa(self):
        t = self.t
        self.h3 = self.baris(2, r"\frac{1{,}8 \times k}{2{,}4 \times k}", ukuran=34)
        bagian2 = self.penanda_bagian("Bagian 2 — sebabnya")
        with sinema.babak(self, "kenapa", DURASI) as b:
            b.main(FadeOut(self.kotak_sama), FadeOut(self.jaga),
                   ReplacementTransform(self.bagian, bagian2), run_time=1.2)
            b.main(Write(self.h3), run_time=2.8)
            b.jeda(1.4)
        self.bagian = bagian2
        qc.periksa_adegan({"h3": self.h3, "h1": self.h1, "h2": self.h2,
                           "segitiga": self.segitiga},
                          [("h3", "segitiga"), ("h3", "h2")])

    def b08_hapus(self):
        """Puncak video: pengali di atas dan di bawah saling menghapus."""
        t = self.t
        coret = VGroup(
            Line(self.h3.get_corner(UL) + RIGHT * 0.62 + DOWN * 0.10,
                 self.h3.get_corner(UL) + RIGHT * 1.18 + DOWN * 0.46,
                 color=t.sorot, stroke_width=4),
            Line(self.h3.get_corner(DL) + RIGHT * 0.62 + UP * 0.46,
                 self.h3.get_corner(DL) + RIGHT * 1.18 + UP * 0.10,
                 color=t.sorot, stroke_width=4),
        )
        hasil = MathTex(r"\frac{1{,}8}{2{,}4}", "=", "0{,}75",
                        color=t.tinta, font_size=34).move_to([X_KANAN, Y_BARIS[2], 0])
        hasil[2].set_color(t.sorot)
        with sinema.babak(self, "hapus", DURASI) as b:
            b.main(Create(coret), run_time=1.6)
            b.jeda(1.2)
            b.main(FadeOut(coret), ReplacementTransform(self.h3, hasil), run_time=2.4)
            b.jeda(1.4)
        self.h3 = hasil
        qc.periksa_adegan({"hasil": hasil, "h1": self.h1, "h2": self.h2,
                           "segitiga": self.segitiga},
                          [("hasil", "segitiga"), ("hasil", "h2")])

    def b09_geser(self):
        """Baru sekarang SUDUTNYA diubah — dan angkanya ikut bergerak."""
        t = self.t
        hidup = sinema.AngkaKoma(RASIO, num_decimal_places=2, color=t.sorot,
                                 font_size=34)
        hidup.add_updater(lambda m: m.set_value(self.rasio.get_value()))
        panel = sinema.nilai_hidup(
            MathTex(r"\frac{\text{depan}}{\text{samping}} =",
                    color=t.tinta, font_size=32),
            hidup, [X_KANAN, Y_SEBAB, 0])
        with sinema.babak(self, "geser", DURASI) as b:
            b.main(FadeOut(self.h1), FadeOut(self.h2), FadeOut(self.h3),
                   FadeIn(panel), run_time=1.4)
            b.main(self.rasio.animate.set_value(1.15), run_time=2.6, rate_func=smooth)
            b.main(self.rasio.animate.set_value(0.42), run_time=3.0, rate_func=smooth)
        self.panel, self.num_hidup = panel, hidup
        qc.periksa_adegan({"panel": panel, "segitiga": self.segitiga,
                           "ukuran": self.ukuran},
                          [("panel", "segitiga")])

    def b10_tutup(self):
        t = self.t
        penutup = Text("hanya sudut yang menentukan, bukan ukuran",
                       font_size=25, color=t.redup)
        sinema.batasi_lebar(penutup, 6.0)
        penutup.move_to([X_KANAN, Y_PENUTUP, 0])
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(self.rasio.animate.set_value(RASIO), run_time=2.2, rate_func=smooth)
            b.main(FadeIn(penutup, shift=UP * 0.14), run_time=1.8)
            b.main(Indicate(self.panel, scale_factor=1.06, color=t.sorot), run_time=1.8)
            b.jeda(1.6)
        self.num_hidup.clear_updaters()
        qc.periksa_adegan(
            {"penutup": penutup, "panel": self.panel, "segitiga": self.segitiga,
             "ukuran": self.ukuran},
            [("penutup", "panel"), ("penutup", "segitiga")])
