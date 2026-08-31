"""Tahap 6, Enam rasio sebagai panjang nyata.

STORYBOARD (ditulis lebih dulu, kode menyusul):

  1. Judul pembuka penuh layar, lalu MEMUDAR.
  2. Lingkaran satuan dari tahap 5 kembali; x dan y sudah bernama.
  3. Garis singgung TEGAK di sisi kanan lingkaran muncul.
  4. Jari-jari diperpanjang sampai mengenainya; ruas dari sumbu mendatar ke
     titik potong itu disorot, panjangnya tan.
  5. Ruas dari pusat ke titik potong yang sama disorot, panjangnya sec.
  6. Garis singgung MENDATAR di bagian atas lingkaran muncul.
  7. Ruas dari sumbu tegak ke titik potongnya disorot, panjangnya cot.
  8. Ruas dari pusat ke titik potong itu disorot, panjangnya csc.
  9. Keenam ruas tampil bersama, daftar rumusnya lengkap.
 10. Sudut digeser; keenamnya berubah bersama.
 11. Penutup.

KENAPA SATU PER SATU DISOROT, BUKAN ENAM WARNA SEKALIGUS:
tema MATRA hanya punya lima warna, dan kuningnya terlalu pudar untuk teks
(2,04:1 di atas krem). Memaksakan enam warna berbeda akan menghasilkan dua
warna yang tidak terbaca. Jadi: ruas yang SEDANG dibahas disorot ungu tebal
(bentuk tebal masih terbaca pada kontras rendah), yang sudah dibahas meredup.
Di kolom rumus warnanya dikelompokkan menurut MAKNA, bukan sekadar dibedakan:
  biru  = cos dan sec, keduanya soal x
  merah = sin dan csc, keduanya soal y
  tinta = tan dan cot, keduanya perbandingan x dengan y

SUDUT DIBATASI 38°-62°. Di sudut kecil cot dan csc meledak keluar layar, di
sudut besar tan dan sec yang meledak. Batas ini dihitung, bukan ditebak:
pada 62° ujung tan berada di y = 1,92 (batas aman 3,80); pada 38° ujung cot
berada di x = -1,92 (kolom rumus baru mulai di 1,50).

WARNA (sama dengan web/lib/warna.ts):
  biru = x = cos · merah = y = sin · tinta = jari-jari · ungu = sorot
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
TOPIK = "tahap6-enam-rasio"
DURASI: dict[str, float] = json.loads(
    (AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8")
)["segmen"]

# --- ZONA TETAP (bingkai 14,22 x 8; batas aman x ±6,91  y ±3,80) ---
PUSAT = np.array([-4.05, -0.85, 0.0])
R = 1.70                     # jari-jari lingkaran satuan di layar
SUDUT = 55.0                 # sudut kerja
SUDUT_MIN, SUDUT_MAKS = 38.0, 62.0

X_RUMUS = 3.30
Y_RUMUS = [2.55, 1.55, 0.55, -0.45, -1.45, -2.45]
Y_PANEL = 3.30

TEBAL_SOROT = 7
TEBAL_REDUP = 3.5


class EnamRasioNyata(Scene):
    tema = "terang"

    # ==================================================================
    def construct(self):
        self.t = Tema(self.tema)
        self.t.pasang(self)
        self.theta = ValueTracker(SUDUT)
        self.siapkan_lingkaran()
        self.ruas_lama = []          # ruas yang sudah dibahas, dibuat meredup

        self.b01_sapa()
        self.b02_ulang()
        self.b03_singgung()
        self.b04_tan()
        self.b05_sec()
        self.b06_singgung2()
        self.b07_cot()
        self.b08_csc()
        self.b09_enam()
        self.b10_putar()
        self.b11_tutup()

    # ==================================================================
    # Geometri, semuanya turunan dari satu tracker
    # ==================================================================
    def rd(self):
        return np.radians(self.theta.get_value())

    def P(self):
        """Titik di keliling lingkaran."""
        return PUSAT + R * np.array([np.cos(self.rd()), np.sin(self.rd()), 0.0])

    def K(self):
        """Kaki proyeksi pada sumbu mendatar."""
        return np.array([self.P()[0], PUSAT[1], 0.0])

    def T(self):
        """Potong jari-jari diperpanjang dengan garis singgung TEGAK (x = 1)."""
        return PUSAT + R * np.array([1.0, np.tan(self.rd()), 0.0])

    def C(self):
        """Potong jari-jari diperpanjang dengan garis singgung MENDATAR (y = 1)."""
        return PUSAT + R * np.array([1.0 / np.tan(self.rd()), 1.0, 0.0])

    def kanan(self):
        """Titik singgung di sisi kanan lingkaran."""
        return PUSAT + RIGHT * R

    def atas(self):
        """Titik singgung di bagian atas lingkaran."""
        return PUSAT + UP * R

    def siapkan_lingkaran(self):
        t = self.t
        self.lingkaran = Circle(radius=R, color=t.tinta, stroke_width=3.5).move_to(PUSAT)
        self.sb_h = Line(PUSAT + LEFT * R * 1.25, PUSAT + RIGHT * R * 1.9,
                         color=t.redup, stroke_width=2)
        self.sb_v = Line(PUSAT + DOWN * R * 1.25, PUSAT + UP * R * 2.4,
                         color=t.redup, stroke_width=2)
        self.sumbu = VGroup(self.sb_h, self.sb_v)
        # Jari-jari diperpanjang sampai jauh: satu garis yang memuat O, P, C, dan T.
        self.jari = always_redraw(
            lambda: Line(PUSAT, PUSAT + rotate_vector(RIGHT * R * 3.1, self.rd()),
                         color=t.redup, stroke_width=2))
        self.jari_inti = always_redraw(
            lambda: Line(PUSAT, self.P(), color=t.tinta, stroke_width=5))
        self.ruas_x = always_redraw(
            lambda: Line(PUSAT, self.K(), color=t.aksen2, stroke_width=5))
        self.ruas_y = always_redraw(
            lambda: Line(self.K(), self.P(), color=t.aksen, stroke_width=5))
        self.busur = always_redraw(
            lambda: Arc(radius=0.42, start_angle=0, angle=self.rd(),
                        arc_center=PUSAT, color=t.sorot, stroke_width=4))
        self.titik = always_redraw(lambda: Dot(self.P(), radius=0.065, color=t.tinta))
        self.dasar = VGroup(self.lingkaran, self.sumbu, self.jari, self.jari_inti,
                            self.ruas_x, self.ruas_y, self.busur, self.titik)

    def ruas_sorot(self, dari, sampai):
        """Ruas yang sedang dibahas: ungu tebal, mengikuti sudut."""
        return always_redraw(
            lambda: Line(dari(), sampai(), color=self.t.sorot, stroke_width=TEBAL_SOROT))

    def redupkan(self, *ruas):
        """Ruas yang sudah dibahas berubah jadi tipis, supaya yang baru menonjol."""
        for r in ruas:
            r.clear_updaters()
        return [r.animate.set_stroke(color=self.t.redup, width=TEBAL_REDUP)
                for r in ruas]

    def baris_rumus(self, i, *bagian, warna=None, ukuran=34):
        t = self.t
        m = MathTex(*bagian, color=warna or t.tinta, font_size=ukuran)
        m.move_to([X_RUMUS, Y_RUMUS[i], 0])
        return m

    # ==================================================================
    # Babak
    # ==================================================================
    def b01_sapa(self):
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Enam rasio, enam ruas garis", self.t,
                                 lama=DURASI["sapa"] * 0.62)
            b.catat(DURASI["sapa"] * 0.62)
            b.main(Create(self.sumbu), Create(self.lingkaran), run_time=2.0)
        qc.periksa_adegan({"lingkaran": self.lingkaran, "sumbu": self.sumbu})

    def b02_ulang(self):
        t = self.t
        self.lab_x = MathTex("x", color=t.aksen2, font_size=30)
        self.lab_x.add_updater(lambda o: o.next_to(Line(PUSAT, self.K()), DOWN, buff=0.16))
        self.lab_y = MathTex("y", color=t.aksen, font_size=30)
        self.lab_y.add_updater(lambda o: o.next_to(Line(self.K(), self.P()), RIGHT, buff=0.18))
        self.r_cos = self.baris_rumus(0, r"\cos\theta", "=", "x", warna=t.aksen2)
        self.r_sin = self.baris_rumus(1, r"\sin\theta", "=", "y", warna=t.aksen)
        with sinema.babak(self, "ulang", DURASI) as b:
            b.main(Create(self.jari_inti), Create(self.busur), FadeIn(self.titik),
                   run_time=1.6)
            b.main(Create(self.ruas_x), Create(self.ruas_y),
                   FadeIn(self.lab_x), FadeIn(self.lab_y), run_time=1.8)
            b.main(Write(self.r_cos), Write(self.r_sin), run_time=2.4)
        self.label_xy = VGroup(self.lab_x, self.lab_y)
        qc.periksa_adegan(
            {"dasar": self.dasar, "r_cos": self.r_cos, "r_sin": self.r_sin,
             "label_xy": self.label_xy},
            [("dasar", "r_cos"), ("dasar", "r_sin")])

    def b03_singgung(self):
        t = self.t
        self.sing_tegak = Line(self.kanan() + DOWN * 0.55, self.kanan() + UP * 3.15,
                               color=t.redup, stroke_width=2.5)
        # Keterangan ditaruh di KANAN-ATAS garis singgung. Versi pertama
        # menaruhnya di bawah, dan tepi kirinya menembus lingkaran -
        # qc tidak menangkapnya karena pasangan cap-lingkaran belum diperiksa.
        # Sekarang pasangan itu ikut diperiksa di bawah.
        cap = Text("garis singgung", font_size=20, color=t.redup)
        sinema.batasi_lebar(cap, 2.3)
        cap.move_to(self.kanan() + UP * 3.05 + RIGHT * 1.30)
        with sinema.babak(self, "singgung", DURASI) as b:
            b.main(Create(self.sing_tegak), run_time=1.6)
            b.main(FadeIn(cap, shift=UP * 0.12), run_time=0.9)
            b.main(Create(self.jari), run_time=1.8)
            b.jeda(1.2)
        self.cap_singgung = cap
        qc.periksa_adegan(
            {"sing_tegak": self.sing_tegak, "cap": cap, "lingkaran": self.lingkaran,
             "r_sin": self.r_sin, "r_cos": self.r_cos},
            [("sing_tegak", "r_sin"), ("cap", "r_sin"), ("cap", "r_cos"),
             ("cap", "lingkaran")])

    def b04_tan(self):
        t = self.t
        self.ruas_tan = self.ruas_sorot(self.kanan, self.T)
        # Label memakai TINTA, bukan warna sorot. Ini dulu perlu karena warna
        # sorot masih kuning (2,04:1). Sejak diganti ungu (6,20:1) alasannya
        # hilang, tapi tinta tetap dipakai supaya nama ruas dan ruasnya
        # sendiri tidak berebut perhatian.
        lab = MathTex(r"\tan\theta", color=t.tinta, font_size=30)
        lab.add_updater(lambda o: o.next_to(Line(self.kanan(), self.T()), RIGHT, buff=0.16))
        self.r_tan = self.baris_rumus(2, r"\tan\theta", "=", r"\frac{y}{x}")
        with sinema.babak(self, "tan", DURASI) as b:
            b.main(Create(self.ruas_tan), run_time=1.8)
            b.main(FadeIn(lab, shift=RIGHT * 0.15), run_time=0.9)
            b.main(Write(self.r_tan), run_time=2.4)
            b.main(Indicate(self.ruas_tan, scale_factor=1.0, color=t.aksen), run_time=1.4)
            b.jeda(1.4)
        self.lab_tan = lab
        qc.periksa_adegan(
            {"ruas_tan": self.ruas_tan, "lab_tan": lab, "r_tan": self.r_tan,
             "dasar": self.dasar},
            [("lab_tan", "r_tan"), ("ruas_tan", "r_tan")])

    def b05_sec(self):
        t = self.t
        self.ruas_sec = self.ruas_sorot(lambda: PUSAT, self.T)
        self.r_sec = self.baris_rumus(4, r"\sec\theta", "=", r"\frac{1}{x}",
                                      warna=t.aksen2)
        with sinema.babak(self, "sec", DURASI) as b:
            b.main(*self.redupkan(self.ruas_tan),
                   self.lab_tan.animate.set_opacity(0.45), run_time=0.9)
            b.main(Create(self.ruas_sec), run_time=1.4)
            b.main(Write(self.r_sec), run_time=1.8)
        qc.periksa_adegan(
            {"ruas_sec": self.ruas_sec, "r_sec": self.r_sec, "dasar": self.dasar,
             "r_tan": self.r_tan},
            [("r_sec", "r_tan"), ("ruas_sec", "r_sec")])

    def b06_singgung2(self):
        t = self.t
        self.sing_datar = Line(self.atas() + LEFT * 1.7, self.atas() + RIGHT * 2.5,
                               color=t.redup, stroke_width=2.5)
        with sinema.babak(self, "singgung2", DURASI) as b:
            b.main(*self.redupkan(self.ruas_sec), run_time=0.9)
            b.main(Create(self.sing_datar), run_time=2.0)
            b.jeda(1.4)
        qc.periksa_adegan(
            {"sing_datar": self.sing_datar, "dasar": self.dasar, "r_cos": self.r_cos},
            [("sing_datar", "r_cos")])

    def b07_cot(self):
        t = self.t
        self.ruas_cot = self.ruas_sorot(self.atas, self.C)
        lab = MathTex(r"\cot\theta", color=t.tinta, font_size=30)
        lab.add_updater(lambda o: o.next_to(Line(self.atas(), self.C()), UP, buff=0.16))
        self.r_cot = self.baris_rumus(3, r"\cot\theta", "=", r"\frac{x}{y}")
        with sinema.babak(self, "cot", DURASI) as b:
            b.main(Create(self.ruas_cot), run_time=1.6)
            b.main(FadeIn(lab, shift=UP * 0.15), run_time=0.9)
            b.main(Write(self.r_cot), run_time=2.4)
            b.jeda(1.4)
        self.lab_cot = lab
        qc.periksa_adegan(
            {"ruas_cot": self.ruas_cot, "lab_cot": lab, "r_cot": self.r_cot,
             "dasar": self.dasar},
            [("lab_cot", "r_cot"), ("ruas_cot", "r_cot")])

    def b08_csc(self):
        t = self.t
        self.ruas_csc = self.ruas_sorot(lambda: PUSAT, self.C)
        self.r_csc = self.baris_rumus(5, r"\csc\theta", "=", r"\frac{1}{y}",
                                      warna=t.aksen)
        with sinema.babak(self, "csc", DURASI) as b:
            b.main(*self.redupkan(self.ruas_cot),
                   self.lab_cot.animate.set_opacity(0.45), run_time=0.8)
            b.main(Create(self.ruas_csc), run_time=1.3)
            b.main(Write(self.r_csc), run_time=1.6)
        qc.periksa_adegan(
            {"ruas_csc": self.ruas_csc, "r_csc": self.r_csc, "dasar": self.dasar,
             "r_sec": self.r_sec},
            [("r_csc", "r_sec")])

    def b09_enam(self):
        """Keenam ruas tampil bersama. Yang lama dinyalakan lagi, tapi tipis -
        supaya terlihat sebagai satu keluarga, bukan enam gambar terpisah."""
        t = self.t
        self.ruas_csc.clear_updaters()
        semua = VGroup(self.ruas_tan, self.ruas_sec, self.ruas_cot, self.ruas_csc)
        rumus = VGroup(self.r_cos, self.r_sin, self.r_tan, self.r_cot,
                       self.r_sec, self.r_csc)
        kotak = SurroundingRectangle(rumus, color=t.sorot, buff=0.26,
                                     stroke_width=2.5, corner_radius=0.10)
        with sinema.babak(self, "enam", DURASI) as b:
            b.main(*[r.animate.set_stroke(color=t.tinta, width=4.5) for r in semua],
                   self.lab_tan.animate.set_opacity(1.0),
                   self.lab_cot.animate.set_opacity(1.0), run_time=1.8)
            b.main(Create(kotak), run_time=1.6)
            b.jeda(1.6)
        self.kotak_rumus = kotak
        self.semua_ruas = semua
        qc.periksa_adegan(
            {"kotak": kotak, "dasar": self.dasar, "semua_ruas": semua},
            [("kotak", "dasar")])

    def b10_putar(self):
        t = self.t
        # Ruas dipasang ulang sebagai objek hidup supaya ikut bergerak.
        self.remove(self.ruas_tan, self.ruas_sec, self.ruas_cot, self.ruas_csc)
        hidup = VGroup(
            always_redraw(lambda: Line(self.kanan(), self.T(), color=t.tinta, stroke_width=4.5)),
            always_redraw(lambda: Line(PUSAT, self.T(), color=t.aksen2, stroke_width=4.5)),
            always_redraw(lambda: Line(self.atas(), self.C(), color=t.tinta, stroke_width=4.5)),
            always_redraw(lambda: Line(PUSAT, self.C(), color=t.aksen, stroke_width=4.5)),
        )
        self.num_th = Integer(int(SUDUT), font_size=30, color=t.tinta,
                              group_with_commas=False)
        self.num_th.add_updater(lambda m: m.set_value(int(round(self.theta.get_value()))))
        drj = MathTex(r"{}^{\circ}", color=t.tinta, font_size=30)
        drj.add_updater(lambda m: m.next_to(self.num_th, RIGHT, buff=0.05)
                        .align_to(self.num_th, UP))
        panel = sinema.nilai_hidup(
            MathTex(r"\theta =", color=t.tinta, font_size=30),
            self.num_th, [PUSAT[0], Y_PANEL, 0])
        panel.add(drj)
        with sinema.babak(self, "putar", DURASI) as b:
            b.main(FadeIn(hidup), FadeIn(panel), run_time=1.0)
            b.main(self.theta.animate.set_value(SUDUT_MAKS), run_time=2.6,
                   rate_func=smooth)
            b.main(self.theta.animate.set_value(SUDUT_MIN), run_time=3.4,
                   rate_func=smooth)
        self.hidup, self.panel = hidup, panel
        qc.periksa_adegan(
            {"panel": panel, "dasar": self.dasar, "hidup": hidup,
             "kotak": self.kotak_rumus},
            [("panel", "kotak"), ("hidup", "kotak")])

    def b11_tutup(self):
        t = self.t
        # Lebar dihitung dari jarak pusat ke tepi aman, bukan ditebak: dengan
        # titik tengah di x = -3,60 dan batas kiri -6,91, lebar maksimalnya
        # 6,62. Versi pertama memakai 6,4 pada x = -3,90 dan tepi kirinya
        # menembus layar di -7,10, digagalkan qc.periksa_adegan.
        penutup = Text("bukan rumus hafalan, tapi panjang yang bisa ditunjuk",
                       font_size=24, color=t.redup)
        sinema.batasi_lebar(penutup, 6.2)
        penutup.move_to([-3.60, -3.35, 0])
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(self.theta.animate.set_value(SUDUT), run_time=2.0, rate_func=smooth)
            b.main(FadeIn(penutup, shift=UP * 0.15), run_time=1.4)
            b.main(Indicate(self.kotak_rumus, scale_factor=1.03, color=t.sorot),
                   run_time=1.6)
            b.jeda(1.6)
        self.num_th.clear_updaters()
        qc.periksa_adegan(
            {"penutup": penutup, "dasar": self.dasar, "panel": self.panel,
             "kotak": self.kotak_rumus},
            [("penutup", "kotak"), ("penutup", "dasar"), ("panel", "kotak")])
