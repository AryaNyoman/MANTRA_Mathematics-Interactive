"""Tahap 9 — Sin, cos, tan berdampingan.

STORYBOARD (ditulis lebih dulu, kode menyusul):

  1. Judul pembuka; ditegaskan ketiganya digerakkan SATU sudut yang sama.
  2. Panel atas: lingkaran kecil + grafik sinus, kurva tumbuh.
  3. Panel tengah: cosinus muncul, kurvanya tumbuh berdampingan.
  4. Ditunjukkan cos berangkat 90 derajat lebih awal; panah pergeseran muncul.
  5. Panel bawah: tangen, dengan rumusnya tinggi dibagi mendatar.
  6. Pembagi disorot; di 90 derajat pembaginya nol.
  7. Garis putus-putus tegak muncul; kurva tan melesat tanpa menyentuhnya.
  8. Perbandingan: sin dan cos terkurung, tan tidak.
  9. Pengulangan: 360 untuk sin dan cos, 180 untuk tan.
 10. Penutup.

INTI YANG HARUS TERTANAM: satu sudut, tiga catatan berbeda. Karena itu KETIGA
panel digerakkan oleh satu ValueTracker yang sama — bukan tiga animasi terpisah
yang kebetulan seirama.

ASIMTOT dijelaskan sebagai akibat pembagian dengan nol, BUKAN sebagai "nilainya
tak hingga". Itu koreksi yang sudah tertulis di kotak "Sering keliru" tahap 9.

ATURAN YANG DIPATUHI — sama dengan tahap 5, 6, 7, 8.

WARNA: merah = sin (tinggi) · biru = cos (mendatar) · tinta = tan
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
TOPIK = "tahap9-tiga-grafik"
DURASI: dict[str, float] = json.loads(
    (AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8")
)["segmen"]

# --- ZONA TETAP (bingkai 14,22 x 8; batas aman x ±6,91  y ±3,80) ---
# Ketiga panel dinaikkan setelah skala derajat+radian ditambahkan: dua baris
# angka di bawah panel terbawah mendorong tepi bawahnya ke -4,09, melewati
# batas aman -3,80 (digagalkan qc). Jarak antar panel 2,15 menyisakan celah
# 0,04 satuan — cukup, dan diperiksa qc lewat pasangan panel_sin/panel_tan.
Y_PANEL = [2.25, 0.10, -2.05]      # titik tengah tiga panel, atas ke bawah
R_LING = 0.78                       # jari-jari lingkaran kecil tiap panel
X_LING = -5.55                      # pusat lingkaran kecil
X_GRAFIK = -4.20                    # sudut 0 pada papan grafik
# Papan sengaja TIDAK dibuat selebar mungkin. Versi pertama memakai 10,20 dan
# menghabiskan layar sampai x = 6,10, sehingga keterangan tidak punya tempat
# dan menindih panel cos — digagalkan qc. Sekarang disisakan kolom kanan.
L_GRAFIK = 8.20                     # panjang papan, mewakili 0…540°
X_KANAN = 5.55                      # kolom keterangan, sejajar panelnya
LEBAR_KANAN = 2.55
AKHIR = 540
TINGGI_SATU = 0.78                  # 1 satuan tegak = R_LING, supaya sebanding
TAN_MAKS = 1.30                     # tan dipotong di sini agar tidak keluar panel


class TigaGrafikBersama(Scene):
    tema = "terang"

    # ==================================================================
    def construct(self):
        self.t = Tema(self.tema)
        self.t.pasang(self)
        self.theta = ValueTracker(0.0)      # SATU sudut untuk ketiga panel

        self.b01_sapa()
        self.b02_sin()
        self.b03_cos()
        self.b04_geser()
        self.b05_tan()
        self.b06_bagi()
        self.b07_jurang()
        self.b08_banding()
        self.b09_ulang()
        self.b10_tutup()

    # ==================================================================
    # Bahan
    # ==================================================================
    def x_dari(self, derajat):
        return X_GRAFIK + L_GRAFIK * derajat / AKHIR

    def titik_grafik(self, derajat, nilai):
        return np.array([self.x_dari(derajat), self.y0 + nilai * TINGGI_SATU, 0.0])

    def buat_panel(self, i, nama, fungsi, warna, potong=None):
        """Satu panel: lingkaran kecil di kiri, papan grafik di kanan.

        `potong` membatasi nilai yang digambar — dipakai tangen, yang kalau
        dibiarkan akan melesat jauh melewati panel di atas dan di bawahnya.
        """
        t = self.t
        y0 = Y_PANEL[i]
        pusat = np.array([X_LING, y0, 0.0])

        lingkaran = Circle(radius=R_LING, color=t.tinta, stroke_width=2.5).move_to(pusat)
        sb = VGroup(
            Line(pusat + LEFT * R_LING * 1.25, pusat + RIGHT * R_LING * 1.25,
                 color=t.redup, stroke_width=1.5),
            Line(pusat + DOWN * R_LING * 1.25, pusat + UP * R_LING * 1.25,
                 color=t.redup, stroke_width=1.5),
        )
        sumbu_x = Line([X_GRAFIK, y0, 0], [X_GRAFIK + L_GRAFIK, y0, 0],
                       color=t.redup, stroke_width=1.8)
        sumbu_y = Line([X_GRAFIK, y0 - TINGGI_SATU * 1.35, 0],
                       [X_GRAFIK, y0 + TINGGI_SATU * 1.35, 0],
                       color=t.redup, stroke_width=1.8)

        def arah():
            r = np.radians(self.theta.get_value())
            return np.array([np.cos(r), np.sin(r), 0.0])

        jari = always_redraw(lambda: Line(pusat, pusat + R_LING * arah(),
                                          color=t.tinta, stroke_width=3))
        titik = always_redraw(lambda: Dot(pusat + R_LING * arah(),
                                          radius=0.05, color=warna))

        # Kurva digambar per CABANG. Untuk sin dan cos hanya ada satu cabang,
        # tapi tangen putus di tiap asimtot dan harus digambar terpisah.
        #
        # Versi pertama memakai np.clip lalu menyambung semua titik dalam satu
        # garis. Hasilnya bukan kurva tangen melainkan GIGI GERGAJI berpuncak
        # datar: nilainya rata di batas, lalu jatuh tegak lurus melintasi
        # asimtot. Itu salah secara matematis, dan justru mengajarkan kebalikan
        # dari yang mau ditanamkan — bahwa tan "punya nilai maksimum".
        #
        # Sekarang tiap cabang dibatasi pada rentang sudut yang nilainya masih
        # muat di panel, jadi kurvanya berhenti di tepi panel dan muncul lagi
        # di seberang asimtot — persis seperti kurva tangen yang sebenarnya.
        if potong:
            tepi = float(np.degrees(np.arctan(potong)))
            cabang = [(0.0, tepi)]
            for k in (180, 360):
                cabang.append((k - tepi, k + tepi))
            cabang.append((AKHIR - tepi, float(AKHIR)))
        else:
            cabang = [(0.0, float(AKHIR))]

        kurva = VGroup()
        for a, bb in cabang:
            # fill_opacity=0 ditulis TEGAS: VMobject mewarisi isian dari color,
            # dan kurva grafik harus berupa garis, bukan bidang.
            penuh = VMobject(stroke_color=warna, stroke_width=4, fill_opacity=0)
            penuh.set_points_smoothly([
                np.array([self.x_dari(d), y0 + fungsi(np.radians(d)) * TINGGI_SATU, 0.0])
                for d in np.linspace(a, bb, 90)
            ])
            potongan = penuh.copy()

            def pasang(m, penuh=penuh, a=a, bb=bb):
                alpha = (self.theta.get_value() - a) / (bb - a)
                m.pointwise_become_partial(
                    penuh, 0, float(np.clip(alpha, 1e-4, 1.0)))
                # set_stroke, BUKAN set_opacity: set_opacity juga menyalakan
                # isian, dan kurvanya berubah dari garis menjadi bidang penuh
                # warna. Terlihat di render uji sebagai "daun" merah dan biru.
                m.set_stroke(opacity=0.0 if self.theta.get_value() <= a else 1.0)

            potongan.add_updater(pasang)
            kurva.add(potongan)
        kurva_penuh = kurva

        label = MathTex(nama, color=warna, font_size=28)
        label.next_to(sumbu_y, LEFT, buff=0.22).shift(UP * 0.30)

        # Skala sumbu mendatar hanya digambar pada panel PALING BAWAH, supaya
        # tidak diulang tiga kali dan tidak menyesaki panel di atasnya.
        #
        # Derajat DAN radian ditulis berdampingan — permintaan ARYA: "jangan
        # sampai ilmunya kepisah-pisah". Tahap-tahap sebelumnya memakai derajat,
        # jadi derajat tetap ada; radian ditambahkan di bawahnya supaya siswa
        # melihat sendiri bahwa satu putaran penuh sama dengan 2 pi.
        skala = VGroup()
        if i == len(Y_PANEL) - 1:
            for d, rad in ((0, "0"), (180, r"\pi"), (360, r"2\pi"), (540, r"3\pi")):
                x = self.x_dari(d)
                tik = Line([x, y0 - TINGGI_SATU * 1.35, 0],
                           [x, y0 - TINGGI_SATU * 1.55, 0],
                           color=t.redup, stroke_width=1.8)
                drj = MathTex(rf"{d}^\circ", color=t.redup, font_size=21)
                drj.next_to(tik, DOWN, buff=0.10)
                rd_ = MathTex(rad, color=t.aksen2, font_size=21)
                rd_.next_to(drj, DOWN, buff=0.07)
                skala.add(VGroup(tik, drj, rd_))

        return dict(y0=y0, pusat=pusat, lingkaran=lingkaran, sb=sb,
                    sumbu=VGroup(sumbu_x, sumbu_y), jari=jari, titik=titik,
                    kurva=kurva, kurva_penuh=kurva_penuh, label=label,
                    skala=skala,
                    rangka=VGroup(lingkaran, sb, sumbu_x, sumbu_y))

    # ==================================================================
    # Babak
    # ==================================================================
    def b01_sapa(self):
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Satu putaran, tiga catatan", self.t,
                                 lama=DURASI["sapa"] * 0.58)
            b.catat(DURASI["sapa"] * 0.58)
            b.jeda(0.8)

    def b02_sin(self):
        t = self.t
        self.y0 = Y_PANEL[0]
        self.p_sin = self.buat_panel(0, r"\sin\theta", np.sin, t.aksen)
        p = self.p_sin
        with sinema.babak(self, "sin", DURASI) as b:
            b.main(Create(p["rangka"]), FadeIn(p["label"]), run_time=2.0)
            b.main(FadeIn(p["jari"]), FadeIn(p["titik"]), run_time=0.9)
            self.add(p["kurva"])
            b.main(self.theta.animate.set_value(AKHIR), run_time=5.4, rate_func=linear)
            self.theta.set_value(0.0)
        qc.periksa_adegan({"panel_sin": p["rangka"], "kurva": p["kurva"],
                           "label": p["label"]})

    def b03_cos(self):
        t = self.t
        self.y0 = Y_PANEL[1]
        self.p_cos = self.buat_panel(1, r"\cos\theta", np.cos, t.aksen2)
        p = self.p_cos
        with sinema.babak(self, "cos", DURASI) as b:
            b.main(Create(p["rangka"]), FadeIn(p["label"]), run_time=1.8)
            b.main(FadeIn(p["jari"]), FadeIn(p["titik"]), run_time=0.8)
            self.add(p["kurva"])
            b.main(self.theta.animate.set_value(AKHIR), run_time=5.2, rate_func=linear)
            self.theta.set_value(0.0)
        qc.periksa_adegan(
            {"panel_cos": p["rangka"], "kurva_cos": p["kurva"],
             "panel_sin": self.p_sin["rangka"], "label": p["label"]},
            [("panel_cos", "panel_sin")])

    def b04_geser(self):
        """Cos berangkat 90 derajat lebih awal — ditunjukkan, bukan diklaim."""
        t = self.t
        atas = self.p_sin
        p90 = np.array([self.x_dari(90), atas["y0"] + TINGGI_SATU, 0.0])
        p0 = np.array([self.x_dari(0), self.p_cos["y0"] + TINGGI_SATU, 0.0])
        tanda_sin = Dot(p90, radius=0.075, color=t.sorot)
        tanda_cos = Dot(p0, radius=0.075, color=t.sorot)
        panah = CurvedArrow(p90, p0, color=t.sorot, stroke_width=3, angle=-0.7)
        cap = MathTex(r"90^\circ", color=t.tinta, font_size=28)
        cap.next_to(panah, RIGHT, buff=0.16)
        with sinema.babak(self, "geser", DURASI) as b:
            b.main(FadeIn(tanda_sin, scale=1.6), run_time=1.0)
            b.main(FadeIn(tanda_cos, scale=1.6), run_time=1.0)
            b.main(Create(panah), FadeIn(cap), run_time=2.0)
            b.jeda(1.6)
            b.main(self.theta.animate.set_value(120), run_time=3.4, rate_func=linear)
            b.main(FadeOut(panah), FadeOut(cap), FadeOut(tanda_sin),
                   FadeOut(tanda_cos), run_time=1.2)
            self.theta.set_value(0.0)
        qc.periksa_adegan({"panel_sin": atas["rangka"], "panel_cos": self.p_cos["rangka"]},
                          [("panel_sin", "panel_cos")])

    def b05_tan(self):
        t = self.t
        self.y0 = Y_PANEL[2]
        self.p_tan = self.buat_panel(2, r"\tan\theta", np.tan, t.tinta,
                                     potong=TAN_MAKS)
        p = self.p_tan
        # Bentuk sin/cos dipilih, bukan "tinggi/mendatar": lebih pendek sehingga
        # muat di kolom kanan, DAN sekaligus memperlihatkan hubungan yang jadi
        # sebab asimtotnya — pembaginya cos, dan cos bisa nol.
        self.rumus_tan = MathTex(r"\tan\theta", "=", r"\frac{\sin\theta}{\cos\theta}",
                                 color=t.tinta, font_size=28)
        self.rumus_tan[2].set_color(t.aksen2)
        sinema.batasi_lebar(self.rumus_tan, LEBAR_KANAN)
        self.rumus_tan.move_to([X_KANAN, Y_PANEL[2], 0])
        with sinema.babak(self, "tan", DURASI) as b:
            b.main(Create(p["rangka"]), FadeIn(p["label"]), run_time=1.6)
            b.main(FadeIn(p["jari"]), FadeIn(p["titik"]), Write(self.rumus_tan),
                   run_time=2.2)
            # Skala derajat + radian muncul bersama panel terbawah, dan berlaku
            # untuk ketiga panel karena sumbu mendatarnya sejajar.
            b.main(FadeIn(p["skala"]), run_time=1.2)
        qc.periksa_adegan(
            {"panel_tan": p["rangka"], "rumus": self.rumus_tan,
             "panel_cos": self.p_cos["rangka"], "skala": p["skala"]},
            [("panel_tan", "panel_cos"), ("rumus", "panel_cos"),
             ("skala", "rumus")])

    def b06_bagi(self):
        t = self.t
        kotak = SurroundingRectangle(self.rumus_tan[2], color=t.aksen2, buff=0.10,
                                     stroke_width=2.5, corner_radius=0.06)
        with sinema.babak(self, "bagi", DURASI) as b:
            self.add(self.p_tan["kurva"])
            b.main(self.theta.animate.set_value(80), run_time=3.6, rate_func=linear)
            b.main(Create(kotak), run_time=1.2)
            b.jeda(1.4)
            b.main(FadeOut(kotak), run_time=0.8)
        qc.periksa_adegan({"panel_tan": self.p_tan["rangka"],
                           "kurva_tan": self.p_tan["kurva"],
                           "rumus": self.rumus_tan})

    def b07_jurang(self):
        t = self.t
        self.asimtot = VGroup(*[
            DashedLine([self.x_dari(d), Y_PANEL[2] - TINGGI_SATU * 1.30, 0],
                       [self.x_dari(d), Y_PANEL[2] + TINGGI_SATU * 1.30, 0],
                       color=t.redup, stroke_width=2, dash_length=0.09)
            for d in (90, 270, 450)
        ])
        with sinema.babak(self, "jurang", DURASI) as b:
            b.main(Create(self.asimtot), run_time=1.6)
            b.main(self.theta.animate.set_value(180), run_time=4.2, rate_func=linear)
            b.jeda(1.4)
        qc.periksa_adegan({"asimtot": self.asimtot, "panel_tan": self.p_tan["rangka"],
                           "panel_cos": self.p_cos["rangka"]},
                          [("asimtot", "panel_cos")])

    def b08_banding(self):
        t = self.t
        pita = Rectangle(width=L_GRAFIK, height=TINGGI_SATU * 2,
                         color=t.sorot, fill_opacity=0.12, stroke_width=0)
        pita.move_to([X_GRAFIK + L_GRAFIK / 2, Y_PANEL[0], 0])
        pita2 = pita.copy().move_to([X_GRAFIK + L_GRAFIK / 2, Y_PANEL[1], 0])
        cap = Text("terkurung antara −1 dan 1", font_size=22, color=t.redup)
        sinema.batasi_lebar(cap, LEBAR_KANAN)
        cap.move_to([X_KANAN, Y_PANEL[0], 0])
        with sinema.babak(self, "banding", DURASI) as b:
            b.main(FadeIn(pita), FadeIn(pita2), FadeIn(cap), run_time=1.8)
            b.main(self.theta.animate.set_value(300), run_time=4.0, rate_func=linear)
            b.main(FadeOut(pita), FadeOut(pita2), FadeOut(cap), run_time=1.2)
        qc.periksa_adegan({"panel_sin": self.p_sin["rangka"],
                           "panel_tan": self.p_tan["rangka"]},
                          [("panel_sin", "panel_tan")])

    def b09_ulang(self):
        t = self.t
        tanda360 = DashedLine([self.x_dari(360), Y_PANEL[0] + TINGGI_SATU * 1.35, 0],
                              [self.x_dari(360), Y_PANEL[1] - TINGGI_SATU * 1.35, 0],
                              color=t.sorot, stroke_width=2, dash_length=0.10)
        lab360 = MathTex(r"360^\circ", color=t.tinta, font_size=24)
        lab360.next_to(tanda360, UP, buff=0.12)
        # Keterangan periode tangen menggantikan rumusnya di kolom kanan.
        # Versi pertama menaruh teks "180 derajat" TEPAT DI BAWAH asimtot 90
        # derajat — salah tempat, dan bertabrakan maknanya dengan angka 180 di
        # skala sumbu. Sekarang ia jadi kalimat di kolom kanan, tidak ada dua
        # angka sama yang berarti dua hal berbeda.
        lab180 = Text("tan mengulang tiap 180°", font_size=22, color=t.redup)
        sinema.batasi_lebar(lab180, LEBAR_KANAN)
        lab180.move_to([X_KANAN, Y_PANEL[2], 0])
        with sinema.babak(self, "ulang", DURASI) as b:
            b.main(self.theta.animate.set_value(AKHIR), run_time=3.2, rate_func=linear)
            b.main(Create(tanda360), FadeIn(lab360), run_time=1.8)
            b.main(ReplacementTransform(self.rumus_tan, lab180), run_time=1.4)
            b.jeda(1.4)
        self.rumus_tan = lab180
        self.tanda_ulang = VGroup(tanda360, lab360, lab180)
        qc.periksa_adegan(
            {"tanda360": tanda360, "lab360": lab360, "lab180": lab180,
             "panel_sin": self.p_sin["rangka"]},
            [("lab360", "panel_sin")])

    def b10_tutup(self):
        t = self.t
        for p in (self.p_sin, self.p_cos, self.p_tan):
            p["kurva"].clear_updaters()
        penutup = Text("tiga kurva, satu putaran", font_size=24, color=t.redup)
        sinema.batasi_lebar(penutup, LEBAR_KANAN)
        penutup.move_to([X_KANAN, Y_PANEL[1], 0])   # panel tengah, satu-satunya kolom kanan yang masih kosong
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeIn(penutup, shift=UP * 0.15), run_time=1.6)
            # Ditebalkan, BUKAN di-Indicate. Indicate mengubah warnanya jadi
            # kuning serentak, dan ketiga kurva sesaat kehilangan identitas
            # warnanya — padahal justru warna itu yang membedakan mereka.
            b.main(*[p["kurva"].animate.set_stroke(width=6)
                     for p in (self.p_sin, self.p_cos, self.p_tan)], run_time=1.4)
            b.jeda(1.6)
        qc.periksa_adegan(
            {"penutup": penutup, "panel_tan": self.p_tan["rangka"],
             "panel_cos": self.p_cos["rangka"], "tanda_ulang": self.tanda_ulang},
            [("penutup", "panel_cos"), ("penutup", "panel_tan")])
