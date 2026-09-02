"""Tahap 5, Lingkaran satuan.

STORYBOARD (ditulis lebih dulu, kode menyusul):

  1. Judul pembuka penuh layar, lalu MEMUDAR.
  2. Segitiga siku-siku biasa muncul; sisi miringnya diberi nama r.
  3. Dua rumus dari tahap 4 tumbuh di kanan, masih dalam bentuk kata.
  4. Segitiga diperkecil sampai sisi miringnya tepat satu; label r berganti 1.
  5. Titik ujungnya diputar sekeliling; jejaknya membentuk lingkaran satuan.
  6. Nama sisi berganti jadi x dan y; rumus pertama berubah jadi x per satu.
  7. Penyebutnya dicoret, yang tersisa hanya x.
  8. Hal yang sama pada sinus: y per satu, lalu y.
  9. Kesimpulan muncul: koordinat titik itu (cos theta, sin theta).
 10. Sudut digeser; kedua angka bergerak bersama titiknya.
 11. Penutup.

INTI YANG HARUS TERTANAM: penyebutnya hilang BUKAN karena disederhanakan
begitu saja, melainkan karena sisi miringnya memang dibuat satu. Itu sebabnya
babak 4 (memperkecil) harus terlihat, bukan dilewati.

ATURAN YANG DIPATUHI BERKAS INI, sama dengan tahap 8:
  * Lama tiap babak dari durasi suara sebenarnya; `sinema.babak` menggagalkan
    render kalau animasi melewati narasinya.
  * `qc.periksa_adegan` di tiap babak.
  * Rumus dirakit sebagai MathTex MULTI-BAGIAN, supaya tiap bagian bisa
    diwarnai dan diganti tanpa mengiris karakter (penyebab warna belang).

WARNA (sama dengan web/lib/warna.ts):
  biru  = sisi samping = x = cos
  merah = sisi depan   = y = sin
  tinta = sisi miring  = r
  ungu = sudut
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
TOPIK = "tahap5-lingkaran-satuan"
DURASI: dict[str, float] = json.loads(
    (AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8")
)["segmen"]

# --- ZONA TETAP (bingkai 14,22 x 8; batas aman x ±6,91  y ±3,80) ---
PUSAT = np.array([-3.60, -0.30, 0.0])   # titik sudut theta, sekaligus pusat lingkaran
R_AWAL = 2.80                            # sisi miring "r" sebelum diperkecil
R_SATU = 2.00                            # sisi miring setelah dibuat = 1
SUDUT_AWAL = 35.0

X_RUMUS = 3.40                           # kolom rumus di kanan
Y_RUMUS1 = 1.45
Y_RUMUS2 = 0.05
Y_SIMPUL = -1.55
Y_PANEL = 2.85


class LingkaranSatuanLahir(Scene):
    tema = "terang"

    # ==================================================================
    def construct(self):
        self.t = Tema(self.tema)
        self.t.pasang(self)
        self.siapkan_penggerak()
        self.siapkan_segitiga()

        self.b01_sapa()
        self.b02_segitiga()
        self.b03_rumus()
        self.b04_kecilkan()
        self.b05_lingkaran()
        self.b06_bagi()
        self.b07_hilang()
        self.b08_sinus()
        self.b09_koordinat()
        self.b10_putar()
        self.b11_tutup()

    # ==================================================================
    # Bahan, semuanya turunan dari dua tracker, jadi tidak ada urutan
    # updater yang perlu dijaga.
    # ==================================================================
    def siapkan_penggerak(self):
        self.theta = ValueTracker(SUDUT_AWAL)   # derajat
        self.rad = ValueTracker(R_AWAL)

    def R(self):
        return self.rad.get_value()

    def rd(self):
        return np.radians(self.theta.get_value())

    def C(self):
        """Titik ujung sisi miring."""
        return PUSAT + self.R() * np.array([np.cos(self.rd()), np.sin(self.rd()), 0.0])

    def K(self):
        """Kaki siku-siku pada sumbu mendatar."""
        return np.array([self.C()[0], PUSAT[1], 0.0])

    def siapkan_segitiga(self):
        t = self.t
        self.samping = always_redraw(
            lambda: Line(PUSAT, self.K(), color=t.aksen2, stroke_width=6))
        self.depan = always_redraw(
            lambda: Line(self.K(), self.C(), color=t.aksen, stroke_width=6))
        self.miring = always_redraw(
            lambda: Line(PUSAT, self.C(), color=t.tinta, stroke_width=6))
        # Kedua garis berangkat DARI titik siku, supaya tandanya jatuh di dalam
        # segitiga. Versi yang menaruhnya di luar pernah lolos ke video jadi.
        self.siku = always_redraw(
            lambda: RightAngle(Line(self.K(), PUSAT), Line(self.K(), self.C()),
                               length=0.28, color=t.redup, stroke_width=3))
        self.busur = always_redraw(
            lambda: Arc(radius=0.46, start_angle=0,
                        angle=float(np.clip(self.rd(), 0.02, TAU - 1e-3)),
                        arc_center=PUSAT, color=t.sorot, stroke_width=5))
        self.titik = always_redraw(
            lambda: Dot(self.C(), radius=0.075, color=t.tinta))
        self.lab_theta = MathTex(r"\theta", color=t.sorot, font_size=34)
        self.lab_theta.add_updater(lambda m: m.move_to(
            PUSAT + rotate_vector(RIGHT * 0.86, self.rd() / 2)))
        self.segitiga = VGroup(self.samping, self.depan, self.miring,
                               self.siku, self.busur, self.titik, self.lab_theta)

    def label_sisi(self, teks_miring: str, teks_x: str, teks_y: str):
        """Tiga nama sisi yang menempel pada garisnya lewat updater posisi."""
        t = self.t
        m = MathTex(teks_miring, color=t.tinta, font_size=32)
        m.add_updater(lambda o: o.move_to(
            (PUSAT + self.C()) / 2 + rotate_vector(UP * 0.34, self.rd())))
        x = MathTex(teks_x, color=t.aksen2, font_size=32)
        x.add_updater(lambda o: o.next_to(Line(PUSAT, self.K()), DOWN, buff=0.20))
        # buff sengaja lebih longgar daripada label x: ujung garis depan ditempati
        # titik hitam, dan pada 0,20 labelnya tampak menyentuh titik itu.
        y = MathTex(teks_y, color=t.aksen, font_size=32)
        y.add_updater(lambda o: o.next_to(Line(self.K(), self.C()), RIGHT, buff=0.30))
        return m, x, y

    # ==================================================================
    # Babak
    # ==================================================================
    def b01_sapa(self):
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Lingkaran satuan", self.t, lama=DURASI["sapa"])
            b.catat(DURASI["sapa"])

    def b02_segitiga(self):
        self.lab_r, self.lab_x, self.lab_y = self.label_sisi(
            "r", r"\text{samping}", r"\text{depan}")
        self.nama_sisi = VGroup(self.lab_r, self.lab_x, self.lab_y)
        with sinema.babak(self, "segitiga", DURASI) as b:
            b.main(Create(self.miring), Create(self.samping), Create(self.depan),
                   run_time=2.2)
            b.main(Create(self.siku), Create(self.busur), FadeIn(self.lab_theta),
                   run_time=1.4)
            b.main(FadeIn(self.nama_sisi, shift=UP * 0.12), FadeIn(self.titik),
                   run_time=1.6)
            b.jeda(1.4)
        qc.periksa_adegan({"segitiga": self.segitiga, "nama_sisi": self.nama_sisi})

    def b03_rumus(self):
        t = self.t
        # MathTex multi-bagian: tiap potongan bisa diwarnai dan diganti sendiri,
        # tanpa mengiris karakter.
        self.r_cos = MathTex(r"\cos\theta", "=",
                             r"\frac{\text{samping}}{\text{miring}}",
                             color=t.tinta, font_size=36).move_to([X_RUMUS, Y_RUMUS1, 0])
        self.r_cos[0].set_color(t.aksen2)
        self.r_sin = MathTex(r"\sin\theta", "=",
                             r"\frac{\text{depan}}{\text{miring}}",
                             color=t.tinta, font_size=36).move_to([X_RUMUS, Y_RUMUS2, 0])
        self.r_sin[0].set_color(t.aksen)
        with sinema.babak(self, "rumus", DURASI) as b:
            b.main(Write(self.r_cos), run_time=3.4)
            b.main(Write(self.r_sin), run_time=3.4)
            b.jeda(1.6)
        qc.periksa_adegan(
            {"r_cos": self.r_cos, "r_sin": self.r_sin, "segitiga": self.segitiga,
             "nama_sisi": self.nama_sisi},
            [("r_cos", "segitiga"), ("r_sin", "segitiga"), ("r_cos", "r_sin"),
             ("r_cos", "nama_sisi"), ("r_sin", "nama_sisi")])

    def b04_kecilkan(self):
        """Sisi miring diperkecil sampai satu. Babak ini TIDAK boleh dilewati -
        inilah alasan penyebutnya nanti boleh hilang."""
        satu = MathTex("1", color=self.t.tinta, font_size=32)
        satu.add_updater(lambda o: o.move_to(
            (PUSAT + self.C()) / 2 + rotate_vector(UP * 0.34, self.rd())))
        with sinema.babak(self, "kecilkan", DURASI) as b:
            b.main(self.rad.animate.set_value(R_SATU), run_time=3.2)
            self.lab_r.clear_updaters()
            b.main(ReplacementTransform(self.lab_r, satu), run_time=1.4)
        self.lab_r = satu
        self.nama_sisi = VGroup(self.lab_r, self.lab_x, self.lab_y)
        qc.periksa_adegan({"segitiga": self.segitiga, "nama_sisi": self.nama_sisi,
                           "r_cos": self.r_cos},
                          [("segitiga", "r_cos")])

    def b05_lingkaran(self):
        t = self.t
        self.lingkaran = Circle(radius=R_SATU, color=t.tinta,
                                stroke_width=3.5).move_to(PUSAT)
        self.sb_h = Line(PUSAT + LEFT * R_SATU * 1.18, PUSAT + RIGHT * R_SATU * 1.18,
                         color=t.redup, stroke_width=2)
        self.sb_v = Line(PUSAT + DOWN * R_SATU * 1.18, PUSAT + UP * R_SATU * 1.18,
                         color=t.redup, stroke_width=2)
        self.sumbu = VGroup(self.sb_h, self.sb_v)
        with sinema.babak(self, "lingkaran", DURASI) as b:
            b.main(Create(self.sumbu), run_time=1.2)
            # Titik menyapu satu putaran penuh; lingkarannya tumbuh mengikuti.
            b.main(self.theta.animate.set_value(SUDUT_AWAL + 360),
                   Create(self.lingkaran), run_time=6.0, rate_func=linear)
            self.theta.set_value(SUDUT_AWAL)
            b.jeda(1.4)
        qc.periksa_adegan(
            {"lingkaran": self.lingkaran, "sumbu": self.sumbu,
             "segitiga": self.segitiga, "r_cos": self.r_cos, "r_sin": self.r_sin},
            [("sumbu", "r_cos"), ("sumbu", "r_sin")])

    def b06_bagi(self):
        t = self.t
        # Nama sisi berganti menjadi koordinat.
        self.lab_x.clear_updaters()
        self.lab_y.clear_updaters()
        x_baru = MathTex("x", color=t.aksen2, font_size=34)
        x_baru.add_updater(lambda o: o.next_to(Line(PUSAT, self.K()), DOWN, buff=0.20))
        y_baru = MathTex("y", color=t.aksen, font_size=34)
        y_baru.add_updater(lambda o: o.next_to(Line(self.K(), self.C()), RIGHT, buff=0.20))

        self.r_cos2 = MathTex(r"\cos\theta", "=", r"\frac{x}{1}",
                              color=t.tinta, font_size=36).move_to([X_RUMUS, Y_RUMUS1, 0])
        self.r_cos2[0].set_color(t.aksen2)
        self.r_cos2[2].set_color(t.aksen2)
        with sinema.babak(self, "bagi", DURASI) as b:
            b.main(ReplacementTransform(self.lab_x, x_baru),
                   ReplacementTransform(self.lab_y, y_baru), run_time=1.8)
            b.main(ReplacementTransform(self.r_cos, self.r_cos2), run_time=2.6)
            b.main(Indicate(self.r_cos2[2], scale_factor=1.15, color=t.sorot),
                   run_time=1.6)
            b.jeda(1.6)
        self.lab_x, self.lab_y = x_baru, y_baru
        self.nama_sisi = VGroup(self.lab_r, self.lab_x, self.lab_y)
        qc.periksa_adegan({"r_cos2": self.r_cos2, "r_sin": self.r_sin,
                           "segitiga": self.segitiga},
                          [("r_cos2", "r_sin"), ("r_cos2", "segitiga")])

    def b07_hilang(self):
        t = self.t
        self.r_cos3 = MathTex(r"\cos\theta", "=", "x",
                              color=t.tinta, font_size=40).move_to([X_RUMUS, Y_RUMUS1, 0])
        self.r_cos3[0].set_color(t.aksen2)
        self.r_cos3[2].set_color(t.aksen2)
        coret = Line(self.r_cos2[2].get_corner(DL), self.r_cos2[2].get_corner(UR),
                     color=t.sorot, stroke_width=4)
        with sinema.babak(self, "hilang", DURASI) as b:
            b.main(Create(coret), run_time=1.1)
            b.jeda(1.0)
            b.main(FadeOut(coret), ReplacementTransform(self.r_cos2, self.r_cos3),
                   run_time=2.2)
            b.jeda(1.4)
        qc.periksa_adegan({"r_cos3": self.r_cos3, "r_sin": self.r_sin,
                           "segitiga": self.segitiga},
                          [("r_cos3", "r_sin"), ("r_cos3", "segitiga")])

    def b08_sinus(self):
        t = self.t
        r_sin2 = MathTex(r"\sin\theta", "=", r"\frac{y}{1}",
                         color=t.tinta, font_size=36).move_to([X_RUMUS, Y_RUMUS2, 0])
        r_sin2[0].set_color(t.aksen)
        r_sin2[2].set_color(t.aksen)
        self.r_sin3 = MathTex(r"\sin\theta", "=", "y",
                              color=t.tinta, font_size=40).move_to([X_RUMUS, Y_RUMUS2, 0])
        self.r_sin3[0].set_color(t.aksen)
        self.r_sin3[2].set_color(t.aksen)
        with sinema.babak(self, "sinus", DURASI) as b:
            b.main(ReplacementTransform(self.r_sin, r_sin2), run_time=2.4)
            b.main(ReplacementTransform(r_sin2, self.r_sin3), run_time=2.4)
            b.jeda(1.4)
        qc.periksa_adegan({"r_cos3": self.r_cos3, "r_sin3": self.r_sin3,
                           "segitiga": self.segitiga},
                          [("r_cos3", "r_sin3"), ("r_sin3", "segitiga")])

    def b09_koordinat(self):
        t = self.t
        self.simpul = MathTex("(", "x", ",", "y", ")", "=",
                              "(", r"\cos\theta", ",", r"\sin\theta", ")",
                              color=t.tinta, font_size=38).move_to([X_RUMUS, Y_SIMPUL, 0])
        for i in (1, 7):
            self.simpul[i].set_color(t.aksen2)
        for i in (3, 9):
            self.simpul[i].set_color(t.aksen)
        kotak = SurroundingRectangle(self.simpul, color=t.sorot, buff=0.20,
                                     stroke_width=2.5, corner_radius=0.08)
        with sinema.babak(self, "koordinat", DURASI) as b:
            b.main(Write(self.simpul), run_time=3.4)
            b.main(Create(kotak), Indicate(self.titik, scale_factor=1.6,
                                           color=t.sorot), run_time=1.6)
            b.jeda(1.6)
        self.kotak_simpul = kotak
        qc.periksa_adegan(
            {"simpul": self.simpul, "kotak": kotak, "r_sin3": self.r_sin3,
             "segitiga": self.segitiga, "sumbu": self.sumbu},
            [("simpul", "r_sin3"), ("kotak", "r_sin3"), ("simpul", "sumbu")])

    def b10_putar(self):
        """Sudut digeser; koordinat ikut bergerak. Angka hidup baru muncul di
        sini, saat mata sudah selesai membaca rumusnya."""
        t = self.t
        self.num_th = Integer(int(SUDUT_AWAL), font_size=32, color=t.tinta,
                              group_with_commas=False)
        self.num_th.add_updater(lambda m: m.set_value(int(round(self.theta.get_value()))))
        drj = MathTex(r"{}^{\circ}", font_size=32, color=t.tinta)
        drj.add_updater(lambda m: m.next_to(self.num_th, RIGHT, buff=0.05)
                        .align_to(self.num_th, UP))
        panel = sinema.nilai_hidup(
            MathTex(r"\theta =", font_size=32, color=t.tinta),
            self.num_th, [PUSAT[0], Y_PANEL, 0])
        panel.add(drj)
        with sinema.babak(self, "putar", DURASI) as b:
            b.main(FadeIn(panel), run_time=0.9)
            b.main(self.theta.animate.set_value(118), run_time=3.0, rate_func=linear)
            b.main(self.theta.animate.set_value(232), run_time=3.0, rate_func=linear)
        self.panel = panel
        qc.periksa_adegan(
            {"panel": panel, "segitiga": self.segitiga, "lingkaran": self.lingkaran,
             "simpul": self.simpul},
            [("panel", "lingkaran"), ("panel", "simpul")])

    def b11_tutup(self):
        t = self.t
        penutup = Text("koordinat sebuah titik yang berputar",
                       font_size=26, color=t.redup)
        sinema.batasi_lebar(penutup, 6.2)
        penutup.move_to([PUSAT[0], -3.05, 0])
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(self.theta.animate.set_value(310), run_time=2.6, rate_func=linear)
            b.main(FadeIn(penutup, shift=UP * 0.15), run_time=1.4)
            b.main(Indicate(self.simpul, scale_factor=1.08, color=t.sorot),
                   run_time=1.6)
            b.jeda(1.6)
        self.num_th.clear_updaters()
        qc.periksa_adegan(
            {"penutup": penutup, "segitiga": self.segitiga, "panel": self.panel,
             "simpul": self.simpul, "lingkaran": self.lingkaran},
            [("penutup", "lingkaran"), ("penutup", "simpul"), ("panel", "lingkaran")])
