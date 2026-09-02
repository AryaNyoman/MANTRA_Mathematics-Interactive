"""Tahap 7, Sudut istimewa.

STORYBOARD (ditulis lebih dulu, kode menyusul):

  1. Judul pembuka; tiga sudut disebut: 30, 45, 60.
  2. Ditegaskan: istimewanya karena nilainya EKSAK, bukan karena angkanya bulat.
  3. Persegi bersisi satu muncul, lalu dipotong menurut diagonalnya.
  4. Separuhnya memudar; tersisa segitiga 45-45-90 dengan sisi 1, 1, akar 2.
  5. Nilai sin 45 ditulis di kanan.
  6. Segitiga sama sisi bersisi dua muncul, lalu dibelah tepat di tengah.
  7. Separuhnya memudar; tersisa segitiga 30-60-90 dengan sisi 1, akar 3, 2.
  8. Nilai sin 30 dan sin 60 ditulis di kanan.
  9. Lingkaran satuan menggantikan bangun-bangun tadi.
 10. Jari-jari menyapu, berhenti di 30, 45, 60; koordinatnya muncul.
 11. Penutup.

INTI YANG HARUS TERTANAM: nilainya lahir dari dua bangun yang bisa digambar
sendiri di buku tulis. Karena itu babak 3-4 dan 6-7 harus benar-benar terlihat
DIPOTONG, bukan langsung menyodorkan segitiga hasilnya.

ATURAN YANG DIPATUHI, sama dengan tahap 5, 6, 8:
  * Lama tiap babak dari durasi suara sebenarnya.
  * `qc.periksa_adegan` di tiap babak.
  * Semua MathTex/Text menyebut warna (gerbang cek_kode.py).

WARNA: biru = alas/samping · merah = tinggi/depan · tinta = miring · ungu = sudut
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
TOPIK = "tahap7-sudut-istimewa"
DURASI: dict[str, float] = json.loads(
    (AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8")
)["segmen"]

# --- ZONA TETAP (bingkai 14,22 x 8; batas aman x ±6,91  y ±3,80) ---
PANGGUNG = np.array([-3.70, -0.30, 0.0])   # titik acuan bangun di kiri
SISI = 2.30                                 # panjang layar untuk "satu satuan"
X_RUMUS = 3.35
Y_RUMUS = [1.75, 0.35, -1.05]
Y_PANEL = 3.20
R_LING = 1.85
ISTIMEWA = [30, 45, 60]


class SudutIstimewaLahir(Scene):
    tema = "terang"

    # ==================================================================
    def construct(self):
        self.t = Tema(self.tema)
        self.t.pasang(self)

        self.b01_sapa()
        self.b02_kenapa()
        self.b03_persegi()
        self.b04_empatlima()
        self.b05_nilai45()
        self.b06_samasisi()
        self.b07_tigapuluh()
        self.b08_nilai30()
        self.b09_lingkaran()
        self.b10_sapu()
        self.b11_tutup()

    # ==================================================================
    def sisi_label(self, teks, garis, arah, warna, buff=0.20, ukuran=30):
        m = MathTex(teks, color=warna, font_size=ukuran)
        m.next_to(garis, arah, buff=buff)
        return m

    def busur_di(self, titik, ke_a, ke_b, radius=0.50):
        """Busur sudut DALAM di `titik`, antara arah ke_a dan ke_b.

        `Angle` bawaan Manim memilih sendiri sisi mana yang digambar, dan pada
        segitiga 30-60-90 ia sempat menggambar sudut refleksnya, busur kuning
        hampir satu lingkaran penuh. Di sini sudutnya dihitung sendiri dengan
        arctan2 lalu dinormalkan ke selisih terkecil, jadi hasilnya selalu
        sudut dalam.
        """
        a = np.arctan2(*(ke_a - titik)[1::-1])
        b = np.arctan2(*(ke_b - titik)[1::-1])
        beda = (b - a + PI) % TAU - PI          # selisih terpendek, -pi..pi
        return Arc(radius=radius, start_angle=a, angle=beda,
                   arc_center=titik, color=self.t.sorot, stroke_width=4)

    def baris_rumus(self, i, *bagian, ukuran=36):
        m = MathTex(*bagian, color=self.t.tinta, font_size=ukuran)
        m.move_to([X_RUMUS, Y_RUMUS[i], 0])
        return m

    # ==================================================================
    # Babak
    # ==================================================================
    def b01_sapa(self):
        t = self.t
        self.tiga = VGroup(*[
            MathTex(rf"{d}^\circ", color=t.sorot, font_size=54) for d in ISTIMEWA
        ]).arrange(RIGHT, buff=1.05).move_to([0, -0.40, 0])
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Sudut istimewa", t, lama=DURASI["sapa"] * 0.52)
            b.catat(DURASI["sapa"] * 0.52)
            b.main(LaggedStart(*[FadeIn(m, shift=UP * 0.25) for m in self.tiga],
                               lag_ratio=0.45), run_time=2.6)
            b.jeda(1.0)
        qc.periksa_adegan({"tiga": self.tiga})

    def b02_kenapa(self):
        t = self.t
        # Dua kalimat pendek yang saling menggantikan, bukan dua blok sekaligus.
        salah = Text("bukan karena angkanya bulat", font_size=30, color=t.redup)
        sinema.batasi_lebar(salah, 7.0)
        salah.move_to([0, -2.05, 0])
        benar = Text("tapi karena nilainya bisa ditulis persis",
                     font_size=30, color=t.tinta)
        sinema.batasi_lebar(benar, 7.6)
        benar.move_to([0, -2.05, 0])
        with sinema.babak(self, "kenapa", DURASI) as b:
            b.main(FadeIn(salah, shift=UP * 0.15), run_time=1.4)
            b.jeda(1.4)
            b.main(ReplacementTransform(salah, benar), run_time=1.8)
            b.jeda(1.6)
            b.main(FadeOut(benar), FadeOut(self.tiga), run_time=1.2)
        qc.periksa_adegan({"benar": benar})

    def b03_persegi(self):
        """Persegi bersisi satu, lalu dipotong menurut diagonalnya."""
        t = self.t
        kiri_bawah = PANGGUNG + LEFT * SISI * 0.5 + DOWN * SISI * 0.5
        self.persegi = Square(side_length=SISI, color=t.tinta,
                              stroke_width=4).move_to(PANGGUNG)
        self.diagonal = Line(kiri_bawah, kiri_bawah + RIGHT * SISI + UP * SISI,
                             color=t.sorot, stroke_width=5)
        lab = MathTex("1", color=t.tinta, font_size=30)
        lab.next_to(self.persegi, DOWN, buff=0.20)
        lab2 = MathTex("1", color=t.tinta, font_size=30)
        lab2.next_to(self.persegi, LEFT, buff=0.20)
        self.lab_persegi = VGroup(lab, lab2)
        with sinema.babak(self, "persegi", DURASI) as b:
            b.main(Create(self.persegi), run_time=2.0)
            b.main(FadeIn(self.lab_persegi), run_time=1.2)
            b.main(Create(self.diagonal), run_time=2.0)
            b.jeda(1.4)
        qc.periksa_adegan({"persegi": self.persegi, "lab": self.lab_persegi,
                           "diagonal": self.diagonal})

    def b04_empatlima(self):
        """Separuh atas memudar; tersisa segitiga 45-45-90."""
        t = self.t
        kb = PANGGUNG + LEFT * SISI * 0.5 + DOWN * SISI * 0.5
        kanan_bawah = kb + RIGHT * SISI
        kanan_atas = kb + RIGHT * SISI + UP * SISI
        buang = Polygon(kb, kanan_atas, kb + UP * SISI,
                        color=t.redup, fill_opacity=0.0, stroke_width=0)
        self.segi45 = Polygon(kb, kanan_bawah, kanan_atas,
                              color=t.tinta, stroke_width=4)
        alas = Line(kb, kanan_bawah, color=t.aksen2, stroke_width=5)
        tegak = Line(kanan_bawah, kanan_atas, color=t.aksen, stroke_width=5)
        self.sudut45 = self.busur_di(kb, kanan_bawah, kanan_atas, radius=0.52)
        lab45 = MathTex(r"45^\circ", color=t.tinta, font_size=26)
        lab45.next_to(self.sudut45, RIGHT, buff=0.12)
        lab_mir = MathTex(r"\sqrt{2}", color=t.tinta, font_size=30)
        lab_mir.move_to((kb + kanan_atas) / 2 + UP * 0.34 + LEFT * 0.30)
        self.tanda45 = VGroup(self.sudut45, lab45, lab_mir, alas, tegak)
        with sinema.babak(self, "empatlima", DURASI) as b:
            # Diagonal WAJIB ikut dihapus. Versi pertama melupakannya, dan garis
            # sorot itu tertinggal melintang di layar sampai akhir video -
            # bahkan menembus lingkaran satuan di babak 9.
            b.main(FadeOut(self.persegi), FadeOut(buang), FadeOut(self.diagonal),
                   Create(self.segi45), run_time=1.8)
            b.main(Create(alas), Create(tegak), run_time=1.4)
            b.main(Create(self.sudut45), FadeIn(lab45), run_time=1.4)
            b.main(FadeIn(lab_mir, shift=UP * 0.12), run_time=1.2)
            b.jeda(1.4)
        qc.periksa_adegan({"segi45": self.segi45, "tanda45": self.tanda45,
                           "lab": self.lab_persegi})

    def b05_nilai45(self):
        t = self.t
        self.r45 = self.baris_rumus(0, r"\sin 45^\circ", "=", r"\frac{1}{\sqrt{2}}")
        self.r45[0].set_color(t.sorot)
        with sinema.babak(self, "nilai45", DURASI) as b:
            b.main(Write(self.r45), run_time=2.8)
            b.main(Indicate(self.r45[2], scale_factor=1.15, color=t.aksen),
                   run_time=1.6)
            b.jeda(1.6)
        qc.periksa_adegan({"r45": self.r45, "segi45": self.segi45,
                           "tanda45": self.tanda45},
                          [("r45", "segi45"), ("r45", "tanda45")])

    def b06_samasisi(self):
        """Segitiga sama sisi bersisi dua, lalu dibelah di tengah."""
        t = self.t
        s = SISI * 1.15
        kb = PANGGUNG + LEFT * s * 0.5 + DOWN * s * 0.42
        kanan = kb + RIGHT * s
        puncak = kb + RIGHT * s * 0.5 + UP * s * np.sqrt(3) / 2
        self.samasisi = Polygon(kb, kanan, puncak, color=t.tinta, stroke_width=4)
        self.tinggi = DashedLine(puncak, kb + RIGHT * s * 0.5, color=t.sorot,
                                 stroke_width=4, dash_length=0.13)
        self.lab_dua = VGroup(
            self.sisi_label("2", Line(kb, puncak), LEFT, t.tinta, buff=0.16),
            self.sisi_label("2", Line(kanan, puncak), RIGHT, t.tinta, buff=0.16),
            self.sisi_label("2", Line(kb, kanan), DOWN, t.tinta, buff=0.18),
        )
        self.titik_segi = (kb, kanan, puncak, s)
        with sinema.babak(self, "samasisi", DURASI) as b:
            # Yang lama memudar SAMBIL yang baru digambar. Kalau dipisah jadi
            # dua langkah, ada 1,2 detik layar benar-benar kosong di tengah
            # video, terlihat di render uji sebagai frame nyaris putih.
            b.main(FadeOut(self.segi45), FadeOut(self.tanda45),
                   FadeOut(self.lab_persegi), Create(self.samasisi), run_time=2.4)
            b.main(FadeIn(self.lab_dua), run_time=1.4)
            b.main(Create(self.tinggi), run_time=1.8)
        qc.periksa_adegan({"samasisi": self.samasisi, "tinggi": self.tinggi,
                           "lab_dua": self.lab_dua, "r45": self.r45},
                          [("samasisi", "r45"), ("lab_dua", "r45")])

    def b07_tigapuluh(self):
        """Separuh kiri memudar; tersisa segitiga 30-60-90."""
        t = self.t
        kb, kanan, puncak, s = self.titik_segi
        tengah = kb + RIGHT * s * 0.5
        self.segi30 = Polygon(tengah, kanan, puncak, color=t.tinta, stroke_width=4)
        alas = Line(tengah, kanan, color=t.aksen2, stroke_width=5)
        tegak = Line(tengah, puncak, color=t.aksen, stroke_width=5)
        s30 = self.busur_di(puncak, tengah, kanan, radius=0.55)
        s60 = self.busur_di(kanan, puncak, tengah, radius=0.50)
        l30 = MathTex(r"30^\circ", color=t.tinta, font_size=25).next_to(s30, DOWN, buff=0.12)
        l60 = MathTex(r"60^\circ", color=t.tinta, font_size=25).next_to(s60, LEFT, buff=0.14)
        l_alas = MathTex("1", color=t.aksen2, font_size=30).next_to(alas, DOWN, buff=0.18)
        l_tegak = MathTex(r"\sqrt{3}", color=t.aksen, font_size=30).next_to(tegak, LEFT, buff=0.16)
        self.tanda30 = VGroup(s30, s60, l30, l60, l_alas, l_tegak, alas, tegak)
        with sinema.babak(self, "tigapuluh", DURASI) as b:
            b.main(FadeOut(self.samasisi), FadeOut(self.lab_dua),
                   FadeOut(self.tinggi), Create(self.segi30), run_time=2.0)
            b.main(Create(alas), Create(tegak), run_time=1.4)
            b.main(Create(s30), Create(s60), FadeIn(l30), FadeIn(l60), run_time=1.8)
            b.main(FadeIn(l_alas), FadeIn(l_tegak), run_time=1.4)
            b.jeda(1.6)
        qc.periksa_adegan({"segi30": self.segi30, "tanda30": self.tanda30,
                           "r45": self.r45},
                          [("segi30", "r45"), ("tanda30", "r45")])

    def b08_nilai30(self):
        t = self.t
        self.r30 = self.baris_rumus(1, r"\sin 30^\circ", "=", r"\frac{1}{2}")
        self.r30[0].set_color(t.sorot)
        self.r60 = self.baris_rumus(2, r"\sin 60^\circ", "=", r"\frac{\sqrt{3}}{2}")
        self.r60[0].set_color(t.sorot)
        with sinema.babak(self, "nilai30", DURASI) as b:
            b.main(Write(self.r30), run_time=2.4)
            b.main(Write(self.r60), run_time=2.6)
            b.jeda(1.6)
        self.daftar = VGroup(self.r45, self.r30, self.r60)
        qc.periksa_adegan({"daftar": self.daftar, "segi30": self.segi30,
                           "tanda30": self.tanda30},
                          [("daftar", "segi30"), ("daftar", "tanda30")])

    def b09_lingkaran(self):
        t = self.t
        self.pusat_ling = PANGGUNG + DOWN * 0.15
        self.lingkaran = Circle(radius=R_LING, color=t.tinta,
                                stroke_width=3.5).move_to(self.pusat_ling)
        self.sb_h = Line(self.pusat_ling + LEFT * R_LING * 1.2,
                         self.pusat_ling + RIGHT * R_LING * 1.2,
                         color=t.redup, stroke_width=2)
        self.sb_v = Line(self.pusat_ling + DOWN * R_LING * 1.2,
                         self.pusat_ling + UP * R_LING * 1.2,
                         color=t.redup, stroke_width=2)
        self.sumbu = VGroup(self.sb_h, self.sb_v)

        # Derajatnya DITULIS di lingkaran, permintaan ARYA setelah melihat
        # lingkarannya polos. Tanpa label, siswa harus menebak jari-jari itu
        # sedang berhenti di sudut berapa.
        self.tanda_sudut = VGroup()
        for d in ISTIMEWA:
            r = np.radians(d)
            arah = np.array([np.cos(r), np.sin(r), 0.0])
            garis = Line(self.pusat_ling + arah * R_LING,
                         self.pusat_ling + arah * R_LING * 1.10,
                         color=t.redup, stroke_width=2)
            lab = MathTex(rf"{d}^\circ", color=t.tinta, font_size=25)
            lab.move_to(self.pusat_ling + arah * R_LING * 1.30)
            self.tanda_sudut.add(VGroup(garis, lab))

        with sinema.babak(self, "lingkaran", DURASI) as b:
            b.main(FadeOut(self.segi30), FadeOut(self.tanda30), run_time=1.2)
            b.main(Create(self.sumbu), Create(self.lingkaran), run_time=2.2)
            b.main(LaggedStart(*[FadeIn(m, shift=UP * 0.10)
                                 for m in self.tanda_sudut], lag_ratio=0.3),
                   run_time=2.4)
        qc.periksa_adegan({"lingkaran": self.lingkaran, "sumbu": self.sumbu,
                           "daftar": self.daftar, "tanda_sudut": self.tanda_sudut},
                          [("lingkaran", "daftar"), ("sumbu", "daftar"),
                           ("tanda_sudut", "daftar")])

    def b10_sapu(self):
        """Jari-jari berhenti di tiap sudut istimewa, juringnya terisi."""
        t = self.t
        self.theta = ValueTracker(0.0)
        jari = always_redraw(lambda: Line(
            self.pusat_ling,
            self.pusat_ling + R_LING * np.array(
                [np.cos(np.radians(self.theta.get_value())),
                 np.sin(np.radians(self.theta.get_value())), 0.0]),
            color=t.tinta, stroke_width=5))
        juring = always_redraw(lambda: Sector(
            radius=R_LING, angle=max(np.radians(self.theta.get_value()), 1e-3),
            arc_center=self.pusat_ling, color=t.sorot,
            fill_opacity=0.18, stroke_width=0))
        titik = always_redraw(lambda: Dot(
            self.pusat_ling + R_LING * np.array(
                [np.cos(np.radians(self.theta.get_value())),
                 np.sin(np.radians(self.theta.get_value())), 0.0]),
            radius=0.07, color=t.aksen))
        self.sapuan = VGroup(juring, jari, titik)
        satuan = DURASI["sapu"] / (len(ISTIMEWA) + 1)
        with sinema.babak(self, "sapu", DURASI) as b:
            b.main(FadeIn(self.sapuan), run_time=satuan * 0.5)
            for d in ISTIMEWA:
                b.main(self.theta.animate.set_value(d),
                       run_time=satuan * 0.62, rate_func=smooth)
                b.main(Indicate(self.daftar[ISTIMEWA.index(d)],
                                scale_factor=1.10, color=t.sorot),
                       run_time=satuan * 0.38)
        qc.periksa_adegan({"sapuan": self.sapuan, "lingkaran": self.lingkaran,
                           "daftar": self.daftar},
                          [("sapuan", "daftar")])

    def b11_tutup(self):
        t = self.t
        penutup = Text("nilainya bisa dihitung sendiri, bukan ditekan di kalkulator",
                       font_size=24, color=t.redup)
        sinema.batasi_lebar(penutup, 6.4)
        penutup.move_to([-3.55, -3.30, 0])
        kotak = SurroundingRectangle(self.daftar, color=t.sorot, buff=0.28,
                                     stroke_width=2.5, corner_radius=0.10)
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(self.theta.animate.set_value(45), run_time=1.6, rate_func=smooth)
            b.main(Create(kotak), run_time=1.6)
            b.main(FadeIn(penutup, shift=UP * 0.15), run_time=1.6)
            b.jeda(1.6)
        qc.periksa_adegan(
            {"penutup": penutup, "kotak": kotak, "lingkaran": self.lingkaran,
             "sapuan": self.sapuan},
            [("penutup", "kotak"), ("penutup", "lingkaran"), ("kotak", "lingkaran")])
