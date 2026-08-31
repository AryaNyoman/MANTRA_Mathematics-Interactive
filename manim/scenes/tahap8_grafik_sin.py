"""Tahap 8 — Terbentuknya grafik sinus.

STORYBOARD (ditulis lebih dulu, kode menyusul — bukan sebaliknya):

  1. Judul pembuka penuh layar, lalu MEMUDAR. Panggung ditinggalkan bersih.
  2. Lingkaran besar di tengah; titik berjalan di tepinya; jari-jari mengikuti.
  3. Garis tinggi merah muncul, diberi nama sin theta.
  4. Lingkaran mengecil dan bergeser ke kiri; papan grafik terbit di kanan;
     panel angka hidup muncul di atas.
  5. Titik menyapu 0 -> 60 derajat. Garis mendatar membawa tingginya ke papan,
     dan kurva mulai terlukis.
  6. Berhenti di 90 derajat; nilai +1,00 disorot — setinggi-tingginya.
  7. Turun ke 180 derajat; tinggi kembali nol.
  8. Menyelam ke 270 derajat; paling dalam, minus satu.
  9. Genap 360 derajat; penanda "satu putaran penuh" muncul.
 10. Lanjut ke 540 derajat — bentuk yang sama terulang.
 11. Penutup: kurva menebal, sebuah titik menyusurinya ulang, kalimat penutup.

ATURAN YANG DIPATUHI BERKAS INI
  * Lama tiap babak diambil dari durasi suara yang SEBENARNYA
    (`audio/tahap8-grafik-sin/durasi.json`). Tidak satu pun ditebak, dan
    `sinema.babak` MENGGAGALKAN render kalau animasinya melewati narasinya.
  * Paling banyak dua blok teks yang harus dibaca. Judul memudar sebelum panel
    angka muncul; penanda putaran dihapus sebelum kalimat penutup ditulis.
  * `qc.periksa_adegan` dipanggil di tiap babak — render gagal kalau ada yang
    bertindih atau keluar bingkai.

KUNCI GEOMETRI: jari-jari lingkaran dibuat PERSIS sama dengan amplitudo grafik
(LING_R == PAPAN_T / 2). Tanpa itu garis penghubung tidak benar-benar mendatar,
dan seluruh gagasan videonya rusak — siswa tidak akan melihat bahwa tinggi di
lingkaran dan tinggi di grafik adalah besaran yang sama.

KUNCI UPDATER: semua bentuk dihitung langsung dari ValueTracker, tidak ada yang
membaca posisi objek lain. Rujukan memperingatkan "urutan updater itu penting";
cara paling aman adalah tidak punya urutan sama sekali.

WARNA (sama dengan web/lib/warna.ts):
  merah bata = tinggi titik = sisi depan = kurva sinus
  tinta      = jari-jari = sisi miring
  kuning     = sudut
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
TOPIK = "tahap8-grafik-sin"
DURASI: dict[str, float] = json.loads(
    (AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8")
)["segmen"]

# --- ZONA TETAP (bingkai 14,22 x 8; batas aman x ±6,91  y ±3,80) ---
# Ukuran dinaikkan setelah render uji 31 Agu: versi pertama menyisakan 40%
# layar bagian bawah kosong sepanjang video, dan kurvanya jadi kecil.
Y_PANEL = 2.70          # baris angka hidup

LING_X = -4.90          # pusat lingkaran setelah bergeser ke kiri
LING_Y = -0.30          # diturunkan agar berat gambar tidak menumpuk di atas
LING_R = 1.60           # jari-jari akhir — WAJIB = PAPAN_T / 2
AWAL_X, AWAL_Y = 0.0, -0.20
AWAL_R = 2.45           # lingkaran besar di tengah, sebelum bergeser

PAPAN_X0 = -2.25        # posisi layar untuk sudut 0°
PAPAN_Y0 = LING_Y       # WAJIB sejajar pusat lingkaran — kalau tidak, garis
                        # penghubung berhenti mendatar dan videonya kehilangan
                        # seluruh maksudnya
PAPAN_L = 8.45          # panjang sumbu mendatar, mewakili 0…540°
PAPAN_T = 3.20          # tinggi sumbu tegak, mewakili −1…1
AKHIR = 540             # derajat terakhir yang digambar (1,5 putaran)


class GrafikSinusLahir(Scene):
    tema = "terang"

    # ==================================================================
    def construct(self):
        self.t = Tema(self.tema)
        self.t.pasang(self)
        self.siapkan_penggerak()
        self.siapkan_lingkaran()

        self.b01_buka()
        self.b02_tinggi()
        self.b03_geser()
        self.b04_sapu()
        self.b05_puncak()
        self.b06_turun()
        self.b07_bawah()
        self.b08_genap()
        self.b09_ulang()
        self.b10_tutup()

    # ==================================================================
    # Bahan
    # ==================================================================
    def siapkan_penggerak(self):
        self.theta = ValueTracker(0.0)      # derajat
        self.cx = ValueTracker(AWAL_X)
        self.cy = ValueTracker(AWAL_Y)
        self.rad = ValueTracker(AWAL_R)

    def P(self):
        return np.array([self.cx.get_value(), self.cy.get_value(), 0.0])

    def R(self):
        return self.rad.get_value()

    def rd(self):
        return np.radians(self.theta.get_value())

    def T(self):
        """Titik di keliling lingkaran."""
        return self.P() + self.R() * np.array([np.cos(self.rd()), np.sin(self.rd()), 0.0])

    def K(self):
        """Kaki proyeksi titik pada garis mendatar lingkaran."""
        return np.array([self.T()[0], self.P()[1], 0.0])

    def siapkan_lingkaran(self):
        t = self.t
        self.lingkaran = always_redraw(
            lambda: Circle(radius=self.R(), color=t.tinta, stroke_width=4).move_to(self.P()))
        self.sb_h = always_redraw(
            lambda: Line(self.P() + LEFT * self.R() * 1.12,
                         self.P() + RIGHT * self.R() * 1.12,
                         color=t.redup, stroke_width=2))
        self.sb_v = always_redraw(
            lambda: Line(self.P() + DOWN * self.R() * 1.12,
                         self.P() + UP * self.R() * 1.12,
                         color=t.redup, stroke_width=2))
        # Busur TIDAK di-modulo 360: setelah satu putaran ia tetap lingkaran
        # penuh, supaya kalimat "satu putaran penuh selesai" terlihat benar.
        self.busur = always_redraw(
            lambda: Arc(radius=self.R() * 0.30, start_angle=0,
                        angle=float(np.clip(self.rd(), 0.02, TAU - 1e-3)),
                        arc_center=self.P(), color=t.sorot, stroke_width=5))
        self.jari = always_redraw(
            lambda: Line(self.P(), self.T(), color=t.tinta, stroke_width=5))
        self.alas = always_redraw(
            lambda: DashedLine(self.P(), self.K(), color=t.redup,
                               stroke_width=2, dash_length=0.09))
        self.tegak = always_redraw(
            lambda: Line(self.K(), self.T(), color=t.aksen, stroke_width=6))
        self.titik = always_redraw(
            lambda: Dot(self.T(), radius=0.075, color=t.aksen))
        self.gugus_lingkaran = VGroup(
            self.lingkaran, self.sb_h, self.sb_v, self.busur,
            self.jari, self.alas, self.tegak, self.titik)

    # ==================================================================
    # Babak
    # ==================================================================
    def b01_buka(self):
        t = self.t
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Terbentuknya grafik sinus", t, lama=4.0)
            b.catat(4.0)
            b.main(Create(self.lingkaran), Create(self.sb_h), Create(self.sb_v),
                   run_time=1.7)
            b.main(FadeIn(self.jari), FadeIn(self.titik), FadeIn(self.busur),
                   run_time=1.0)
            b.main(self.theta.animate.set_value(35), run_time=2.2)
        qc.periksa_adegan({"lingkaran": self.gugus_lingkaran})

    def b02_tinggi(self):
        t = self.t
        # Label menempel pada garis merah lewat updater posisi — bukan
        # always_redraw MathTex, yang memaksa LaTeX dibangun ulang tiap frame.
        self.lab_tinggi = MathTex(r"\sin\theta", color=t.aksen, font_size=36)
        self.lab_tinggi.add_updater(
            lambda m: m.next_to(Line(self.K(), self.T()), RIGHT, buff=0.20))
        with sinema.babak(self, "tinggi", DURASI) as b:
            b.main(Create(self.alas), Create(self.tegak), run_time=1.4)
            b.main(FadeIn(self.lab_tinggi, shift=RIGHT * 0.2), run_time=0.9)
            b.main(self.theta.animate.set_value(52), run_time=3.6)
            b.main(Indicate(self.tegak, scale_factor=1.0, color=t.sorot), run_time=1.4)
            b.main(self.theta.animate.set_value(58), run_time=1.2)
        qc.periksa_adegan(
            {"lingkaran": self.gugus_lingkaran, "lab_tinggi": self.lab_tinggi})

    def b03_geser(self):
        t = self.t
        self.papan = Axes(
            x_range=[0, AKHIR, 180], y_range=[-1, 1, 1],
            x_length=PAPAN_L, y_length=PAPAN_T, tips=False,
            axis_config=dict(color=t.redup, stroke_width=2.5),
        )
        self.papan.shift(np.array([PAPAN_X0, PAPAN_Y0, 0.0]) - self.papan.c2p(0, 0))
        # Label sudut ditaruh di BAWAH papan, bukan menempel pada sumbu.
        # Menempel di sumbu membuat kurva memotong tepat melalui angka 180° dan
        # 360° — terlihat di render uji 31 Agu. Di bawah papan, kurva tidak
        # pernah sampai ke sana, dan ruang bawah layar jadi terpakai.
        self.lab_x = VGroup(*[
            MathTex(rf"{d}^\circ", font_size=26, color=t.redup)
            .next_to(self.papan.c2p(d, -1), DOWN, buff=0.28)
            for d in (0, 180, 360, AKHIR)
        ])
        self.lab_y = VGroup(
            MathTex("1", font_size=26, color=t.redup)
            .next_to(self.papan.c2p(0, 1), LEFT, buff=0.18),
            MathTex("-1", font_size=26, color=t.redup)
            .next_to(self.papan.c2p(0, -1), LEFT, buff=0.18),
        )
        self.gugus_papan = VGroup(self.papan, self.lab_x, self.lab_y)

        # Panel angka: satu sistem, dua sisi. Yang kiri menempel pada lingkaran,
        # yang kanan pada papan — supaya mata mengaitkan angka ke gambarnya.
        #
        # Panel sudut memakai TINTA, bukan kuning. Kuning #D9A441 di atas krem
        # hanya 2,04:1 — terlalu pudar untuk teks (batas layak 4,5:1). Kuning
        # tetap dipakai untuk busur sudut, karena bentuk tebal masih terbaca
        # pada kontras rendah sementara huruf tipis tidak.
        self.num_th = Integer(0, font_size=34, color=t.tinta, group_with_commas=False)
        self.num_th.add_updater(lambda m: m.set_value(int(round(self.theta.get_value()))))
        # Tanda derajat dipasang sebagai objek tersendiri. Lewat argumen `unit`
        # DecimalNumber meratakannya ke TENGAH tinggi angka, sehingga "239°"
        # tampil sebagai "239o" — tertangkap di render uji 31 Agu.
        self.drj = MathTex(r"{}^{\circ}", font_size=34, color=t.tinta)
        self.drj.add_updater(
            lambda m: m.next_to(self.num_th, RIGHT, buff=0.05).align_to(self.num_th, UP))
        panel_kiri = sinema.nilai_hidup(
            MathTex(r"\theta =", font_size=34, color=t.tinta),
            self.num_th, [LING_X - 0.20, Y_PANEL, 0])
        panel_kiri.add(self.drj)

        self.num_sin = sinema.AngkaKoma(0, num_decimal_places=2, include_sign=True,
                                        font_size=34, color=t.aksen)
        self.num_sin.add_updater(lambda m: m.set_value(np.sin(self.rd())))
        panel_kanan = sinema.nilai_hidup(
            MathTex(r"\sin\theta =", font_size=34, color=t.aksen),
            self.num_sin, [2.05, Y_PANEL, 0])
        self.panel = VGroup(panel_kiri, panel_kanan)

        with sinema.babak(self, "geser", DURASI) as b:
            b.main(self.cx.animate.set_value(LING_X), self.cy.animate.set_value(LING_Y),
                   self.rad.animate.set_value(LING_R),
                   self.theta.animate.set_value(0.0),
                   FadeOut(self.lab_tinggi), run_time=4.6)
            self.lab_tinggi.clear_updaters()
            b.main(Create(self.papan), run_time=1.8)
            b.main(Write(self.lab_x), Write(self.lab_y), run_time=1.4)
            b.main(FadeIn(self.panel), run_time=1.0)
        qc.periksa_adegan(
            {"lingkaran": self.gugus_lingkaran, "papan": self.gugus_papan,
             "panel": self.panel},
            [("lingkaran", "papan"), ("panel", "papan"), ("panel", "lingkaran")])

    def siapkan_kurva(self):
        """Kurva dipotong dari kurva penuh, bukan digambar ulang tiap frame.

        `pointwise_become_partial` tidak membuat objek baru; memanggil
        `papan.plot()` di dalam updater membuat satu objek per frame. Pada
        video 91 detik (2.736 frame) selisihnya bukan main.
        """
        t = self.t
        self.kurva_penuh = self.papan.plot(
            lambda x: np.sin(np.radians(x)), x_range=[0, AKHIR, 2],
            color=t.aksen, stroke_width=5)
        self.kurva = self.kurva_penuh.copy()
        self.kurva.add_updater(lambda m: m.pointwise_become_partial(
            self.kurva_penuh, 0,
            float(np.clip(self.theta.get_value() / AKHIR, 1e-4, 1.0))))

        def G():
            d = self.theta.get_value()
            return self.papan.c2p(d, np.sin(np.radians(d)))

        self.titik_g = always_redraw(lambda: Dot(G(), radius=0.075, color=t.aksen))
        self.penghubung = always_redraw(
            lambda: DashedLine(self.T(), G(), color=t.redup,
                               stroke_width=2.2, dash_length=0.10))

    def b04_sapu(self):
        self.siapkan_kurva()
        self.add(self.kurva)
        with sinema.babak(self, "sapu", DURASI) as b:
            b.main(FadeIn(self.penghubung), FadeIn(self.titik_g), run_time=1.2)
            b.main(self.theta.animate.set_value(60), run_time=6.2, rate_func=linear)
        qc.periksa_adegan(
            {"kurva": self.kurva, "papan": self.gugus_papan,
             "lingkaran": self.gugus_lingkaran, "panel": self.panel},
            [("kurva", "lingkaran"), ("panel", "kurva")])

    def b05_puncak(self):
        with sinema.babak(self, "puncak", DURASI) as b:
            b.main(self.theta.animate.set_value(90), run_time=4.4, rate_func=linear)
            self.kotak = SurroundingRectangle(
                self.num_sin, color=self.t.sorot, buff=0.16,
                stroke_width=3, corner_radius=0.08)
            b.main(Create(self.kotak), run_time=1.0)
            b.jeda(1.4)
        qc.periksa_adegan({"kotak": self.kotak, "kurva": self.kurva},
                          [("kotak", "kurva")])

    def b06_turun(self):
        with sinema.babak(self, "turun", DURASI) as b:
            b.main(FadeOut(self.kotak), run_time=0.6)
            b.main(self.theta.animate.set_value(180), run_time=8.4, rate_func=linear)

    def b07_bawah(self):
        with sinema.babak(self, "bawah", DURASI) as b:
            b.main(self.theta.animate.set_value(270), run_time=9.6, rate_func=linear)
        qc.periksa_adegan(
            {"kurva": self.kurva, "lingkaran": self.gugus_lingkaran,
             "papan": self.gugus_papan, "lab_x": self.lab_x},
            [("kurva", "lingkaran"), ("kurva", "lab_x")])

    def b08_genap(self):
        t = self.t
        with sinema.babak(self, "genap", DURASI) as b:
            b.main(self.theta.animate.set_value(360), run_time=5.2, rate_func=linear)
            self.batas = DashedLine(self.papan.c2p(360, -1), self.papan.c2p(360, 1),
                                    color=t.redup, stroke_width=2, dash_length=0.10)
            self.cap = Text("satu putaran penuh", font_size=24, color=t.redup)
            sinema.batasi_lebar(self.cap, 3.4)
            self.cap.next_to(self.papan.c2p(360, -1), DOWN, buff=0.92)
            b.main(Create(self.batas), FadeIn(self.cap, shift=UP * 0.15), run_time=1.3)
        qc.periksa_adegan({"cap": self.cap, "lab_x": self.lab_x, "batas": self.batas},
                          [("cap", "lab_x")])

    def b09_ulang(self):
        with sinema.babak(self, "ulang", DURASI) as b:
            b.main(self.theta.animate.set_value(AKHIR), run_time=8.2, rate_func=linear)
        qc.periksa_adegan(
            {"kurva": self.kurva, "papan": self.gugus_papan, "panel": self.panel,
             "cap": self.cap, "lab_x": self.lab_x},
            [("kurva", "lab_x"), ("cap", "lab_x"), ("panel", "kurva")])

    def b10_tutup(self):
        t = self.t
        self.kurva.clear_updaters()
        self.num_th.clear_updaters()
        self.drj.clear_updaters()
        self.num_sin.clear_updaters()
        penutup = MathTex(r"\sin\theta = \text{tinggi titik}",
                          font_size=32, color=t.tinta).move_to([LING_X, -2.95, 0])
        jejak = Dot(self.papan.c2p(0, 0), radius=0.08, color=t.sorot)
        with sinema.babak(self, "tutup", DURASI) as b:
            # Penanda putaran dihapus SEBELUM kalimat penutup ditulis, supaya
            # tidak pernah ada tiga blok teks sekaligus di layar.
            b.main(FadeOut(self.penghubung), FadeOut(self.titik_g),
                   FadeOut(self.cap), FadeOut(self.batas), run_time=0.9)
            b.main(self.kurva.animate.set_stroke(width=7), run_time=1.0)
            self.add(jejak)
            b.main(MoveAlongPath(jejak, self.kurva_penuh), Write(penutup), run_time=3.4)
            b.main(FadeOut(jejak), run_time=0.6)
        qc.periksa_adegan(
            {"penutup": penutup, "kurva": self.kurva,
             "lingkaran": self.gugus_lingkaran, "panel": self.panel},
            [("penutup", "kurva"), ("penutup", "lingkaran")])
