"""Grafik Fungsi Trigonometri, Bagian 2 (Materi 09): sin, cos, tan berdampingan.
STANDAR VIDEO v3.1, ditulis ulang 12 Sep 2026 dari adegan Manim CE yang sudah
disetujui ARYA (tata letaknya juga dipakai `beranda_tiga_grafik.py`). ISINYA
SAMA: tiga panel bertumpuk, tiap panel lingkaran kecil di kiri dan papan
grafik di kanan; sin mencatat tinggi, cos mencatat posisi mendatar dan
berangkat 90 derajat lebih awal, tan = tinggi : mendatar dengan jurang di 90
karena pembaginya nol; sin dan cos terkurung 1 dan minus 1, tan tanpa batas;
sin dan cos mengulang tiap 360, tan tiap 180.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 2; segar-ingat grafik sinus dari
  Bagian 1 (panel atas lahir dulu sendirian).
- Tiap panel punya sudutnya sendiri (tiga pelacak), tetapi "satu sudut yang
  sama" DIPERLIHATKAN: ketiga jari-jari digerakkan serentak dari 0 ke 45 di
  awal, dan satu putaran penuh serentak di penutup. Versi lama mengembalikan
  satu pelacak ke nol sehingga kurva yang sudah jadi ikut lenyap.
- Contoh angka: di 45 derajat tinggi dan mendatar sama besar, tan = 1.
- Sorot memakai pita tembus pandang, bukan garis yang menutup kurvanya.
- Penutup menunjuk Penerapan Trigonometri.

TATA LETAK: jalur subtitle (y di bawah -2,55) dan pojok identitas (kiri atas)
dijaga: panel diperkecil dari versi beranda (R 0,52, bukan 0,78) dan panel
tangen diberi tinggi lebih (1,7 satuan) supaya cabangnya sempat melesat
sebelum dipotong. Kolom kanan (x 4,4 sampai 6,7) untuk rumus tan, catatan
periode, dan penunjuk materi berikutnya; panel rumus HUD tidak dipakai
karena papan grafik atas memenuhi zonanya.

WARNA: merah = sin (tinggi), biru = cos (mendatar), tinta = tan, ungu = sorot.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "tahap9-tiga-grafik"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

Y_PANEL = [2.0, 0.25, -1.6]     # titik tengah panel sin, cos, tan
R_LING = 0.52                   # jari-jari lingkaran kecil = 1 satuan tinggi papan
T = R_LING
X_LING = -5.75                  # pusat lingkaran kecil
X_GRAFIK = -3.95                # sudut 0 pada papan grafik
L_GRAFIK = 8.2                  # panjang papan, 0 sampai 540 derajat (ujung x 4,25)
AKHIR = 540
TAN_MAKS = 1.7                  # tan digambar selama nilainya di antara -1,7 dan 1,7
X_KANAN = 5.55                  # kolom keterangan di kanan papan
LEBAR_KANAN = 2.3


def x_dari(derajat):
    return X_GRAFIK + L_GRAFIK * derajat / AKHIR


def arah_dari(derajat):
    r = np.radians(derajat)
    return np.array([np.cos(r), np.sin(r), 0.0])


def pita(x0, x1, y0, tinggi, warna=SOROT, opasitas=0.13):
    """Pita tembus pandang di papan: sorot yang tidak menutup kurva."""
    r = Rectangle(width=x1 - x0, height=tinggi).set_fill(warna, opasitas).set_stroke(width=0)
    return r.move_to([(x0 + x1) / 2, y0, 0])


def hud(ident):
    return {"identitas": ident} if ident is not None else {}


class TigaGrafikBersama(AdeganMatra):
    # ------------------------------------------------------------------
    def buat_panel(self, y0, nama, fungsi, warna, th, tampak, tampak_hubung,
                   potong=None, tinggi=False, mendatar=False, radian=False):
        """Satu panel: lingkaran kecil di kiri, papan grafik di kanan.

        `th` sudut panel ini (derajat); `tampak` opasitas kurva; `tampak_hubung`
        opasitas garis penghubung dan titik grafik. `potong` membatasi nilai
        yang digambar (tangen). `tinggi`/`mendatar` menggambar ruas merah
        (tinggi) dan biru (mendatar) di lingkaran, hidup mengikuti sudut.
        """
        pusat = np.array([X_LING, y0, 0.0])
        tinggi_papan = (potong if potong else 1.35) * T
        lingkaran = Circle(radius=R_LING, stroke_color=TINTA, stroke_width=2.5, fill_opacity=0)
        lingkaran.move_to(pusat)
        sb = VGroup(Line(pusat + LEFT * R_LING * 1.25, pusat + RIGHT * R_LING * 1.25),
                    Line(pusat + DOWN * R_LING * 1.25, pusat + UP * R_LING * 1.25)
                    ).set_stroke(REDUP, 1.5)
        sumbu_x = Line([X_GRAFIK - 0.15, y0, 0], [X_GRAFIK + L_GRAFIK + 0.1, y0, 0]
                       ).set_stroke(REDUP, 1.8)
        sumbu_y = Line([X_GRAFIK, y0 - tinggi_papan, 0], [X_GRAFIK, y0 + tinggi_papan, 0]
                       ).set_stroke(REDUP, 1.8)

        def titik_ling():
            return pusat + R_LING * arah_dari(th.get_value())

        def kaki():
            return np.array([titik_ling()[0], y0, 0.0])

        def nilai():
            return fungsi(np.radians(th.get_value()))

        def muat(n):
            return potong is None or abs(n) <= potong

        jari = always_redraw(lambda: Line(pusat, titik_ling()).set_stroke(TINTA, 3))
        titik = always_redraw(lambda: Dot(titik_ling(), radius=0.06).set_color(warna))
        ruas = VGroup()
        if tinggi:
            ruas.add(always_redraw(lambda: Line(kaki(), titik_ling()).set_stroke(AKSEN, 4)))
        if mendatar:
            ruas.add(always_redraw(lambda: Line(pusat, kaki()).set_stroke(AKSEN2, 4)))

        def ujung_grafik():
            d, n = th.get_value(), nilai()
            if not muat(n) or d > AKHIR:
                return None
            return np.array([x_dari(d), y0 + n * T, 0.0])

        def buat_sambung():
            u = ujung_grafik()
            if u is None:
                return VGroup()
            return DashedLine(titik_ling(), u, dash_length=0.09).set_stroke(
                warna, 1.8, opacity=0.6 * tampak_hubung.get_value())

        def buat_titik_grafik():
            u = ujung_grafik()
            if u is None:
                return VGroup()
            return Dot(u, radius=0.065).set_color(warna).set_opacity(tampak_hubung.get_value())

        sambung = always_redraw(buat_sambung)
        titik_grafik = always_redraw(buat_titik_grafik)

        # Kurva per CABANG: sin dan cos satu cabang; tangen putus di tiap
        # asimtot, tiap cabang berhenti di tepi panel dan muncul lagi di
        # seberang asimtot, seperti kurva tangen yang sebenarnya.
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
            penuh = VMobject(stroke_color=warna, stroke_width=4, fill_opacity=0)
            penuh.set_points_smoothly([
                np.array([x_dari(d), y0 + fungsi(np.radians(d)) * T, 0.0])
                for d in np.linspace(a, bb, 90)
            ])
            potongan = penuh.copy()

            def pasang(m, penuh=penuh, a=a, bb=bb):
                alpha = (th.get_value() - a) / (bb - a)
                m.pointwise_become_partial(penuh, 0, float(np.clip(alpha, 1e-4, 1.0)))
                # set_stroke, BUKAN set_opacity: set_opacity ikut menyalakan
                # isian dan kurvanya berubah jadi bidang.
                terlihat = 0.0 if th.get_value() <= a else 1.0
                m.set_stroke(opacity=terlihat * tampak.get_value())

            potongan.add_updater(pasang)
            kurva.add(potongan)

        label = rumus(nama, 26, warna).move_to([X_GRAFIK - 0.5, y0 + 0.9, 0])
        # Skala derajat di SETIAP panel (permintaan ARYA 1 Sep 2026), radian
        # hanya di panel terbawah. Angkanya diberi halo sewarna kertas supaya
        # kurva yang lewat di kelipatan 180 derajat tidak mencoretnya.
        skala = VGroup()
        for d, rad in ((0, "0"), (180, r"\pi"), (360, r"2\pi"), (540, r"3\pi")):
            x = x_dari(d)
            tik = Line([x, y0 - 0.1, 0], [x, y0 + 0.1, 0]).set_stroke(REDUP, 1.6)
            drj = rumus(rf"{d}^\circ", 18, REDUP).next_to(tik, DOWN, buff=0.05)
            drj.add_background_rectangle(color=LATAR, opacity=1.0, buff=0.04)
            bagian = VGroup(tik, drj)
            if radian:
                rd_ = rumus(rad, 18, AKSEN2).next_to(drj, DOWN, buff=0.04)
                rd_.add_background_rectangle(color=LATAR, opacity=1.0, buff=0.04)
                bagian.add(rd_)
            skala.add(bagian)
        rangka = VGroup(lingkaran, sb, sumbu_x, sumbu_y)
        rangka.latar = True
        return dict(y0=y0, pusat=pusat, rangka=rangka, lingkaran=lingkaran,
                    papan=VGroup(sumbu_x, sumbu_y), sumbu_y=sumbu_y, jari=jari, titik=titik,
                    ruas=ruas, kurva=kurva, sambung=sambung, titik_grafik=titik_grafik,
                    label=label, skala=skala, titik_ling=titik_ling)

    def pasang_panel(self, p):
        self.add(p["rangka"], p["skala"], p["label"], p["kurva"], p["sambung"],
                 p["ruas"], p["jari"], p["titik"], p["titik_grafik"])

    # ------------------------------------------------------------------
    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        ident = None

        th_sin, th_cos, th_tan = ValueTracker(0.0), ValueTracker(0.0), ValueTracker(0.0)
        tampak = [ValueTracker(1.0) for _ in range(3)]
        hubung = [ValueTracker(1.0) for _ in range(3)]
        p_sin = self.buat_panel(Y_PANEL[0], r"\sin\theta", np.sin, AKSEN, th_sin, tampak[0],
                                hubung[0], tinggi=True)
        p_cos = self.buat_panel(Y_PANEL[1], r"\cos\theta", np.cos, AKSEN2, th_cos, tampak[1],
                                hubung[1], mendatar=True)
        p_tan = self.buat_panel(Y_PANEL[2], r"\tan\theta", np.tan, TINTA, th_tan, tampak[2],
                                hubung[2], potong=TAN_MAKS, tinggi=True, mendatar=True, radian=True)
        semua_panel = (p_sin, p_cos, p_tan)

        def zona_panel(*panel):
            z = {}
            for nama, p in zip(("sin", "cos", "tan"), semua_panel):
                if p not in panel:
                    continue
                z[f"rangka {nama}"] = p["rangka"]
                z[f"kurva {nama}"] = p["kurva"]
                z[f"jari {nama}"] = p["jari"]
            return z

        def tulisan_panel(*panel):
            t = {}
            for nama, p in zip(("sin", "cos", "tan"), semua_panel):
                if p in panel:
                    t[f"label {nama}"] = p["label"]
                    t[f"skala {nama}"] = p["skala"]
            return t

        # ============ buka ============================================== #
        tanya = VGroup(teks("Kalau sin, cos, dan tan lahir dari satu titik yang sama,", 34, TINTA),
                       teks("kenapa bentuk grafiknya berbeda?", 34, TINTA))
        tanya.arrange(DOWN, buff=0.18).move_to([0, -0.6, 0])
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Grafik")
            sinema.judul_pembuka(self, "Grafik Fungsi Trigonometri, Bagian 2", lama=3.4)
            b.catat(3.4)
            b.tunggu_kata("Kalau")
            b.main(Write(tanya), run_time=2.2)

        # ============ segar-ingat: grafik sinus lahir dari tinggi titik === #
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi sebelumnya")
            ident = sinema.identitas(self, "ingat Bagian 1")
            ident.set_opacity(0.0)
            b.main(FadeOut(tanya), ident.animate.set_opacity(1.0), run_time=0.5)
            b.tunggu_kata("Grafik")
            b.main(ShowCreation(p_sin["rangka"]), FadeIn(p_sin["label"]), FadeIn(p_sin["skala"]),
                   run_time=1.4)
            b.tunggu_kata("grafik sinus")
            self.add(p_sin["kurva"], p_sin["sambung"], p_sin["ruas"], p_sin["jari"],
                     p_sin["titik"], p_sin["titik_grafik"])
            b.tunggu_kata("jejak")
            b.main(th_sin.animate.set_value(AKHIR), run_time=4.2, rate_func=linear)
        qc.periksa_adegan(self, zona_panel(p_sin), hud=hud(ident), tulisan=tulisan_panel(p_sin))

        # ============ tiga panel berdampingan, satu sudut yang sama ====== #
        with sinema.babak(self, "tiga", DURASI, kata=KATA) as b:
            b.tunggu_kata("letakkan")
            ident2 = sinema.identitas(self, "satu sudut")
            ident2.set_opacity(0.0)
            b.main(FadeOut(ident), ident2.animate.set_opacity(1.0), run_time=0.5)
            ident = ident2
            b.tunggu_kata("cosinus")
            b.main(ShowCreation(p_cos["rangka"]), FadeIn(p_cos["label"]), FadeIn(p_cos["skala"]),
                   run_time=1.0)
            self.add(p_cos["kurva"], p_cos["sambung"], p_cos["ruas"], p_cos["jari"],
                     p_cos["titik"], p_cos["titik_grafik"])
            b.tunggu_kata("tangen")
            b.main(ShowCreation(p_tan["rangka"]), FadeIn(p_tan["label"]), FadeIn(p_tan["skala"]),
                   run_time=1.0)
            self.add(p_tan["kurva"], p_tan["sambung"], p_tan["ruas"], p_tan["jari"],
                     p_tan["titik"], p_tan["titik_grafik"])
            b.tunggu_kata("Ketiganya")
            # Kurva sinus dari segar-ingat dipudarkan sambil jari-jarinya
            # meneruskan putaran ke 720 (= posisi 0), lalu sudutnya dikembalikan
            # ke 0 tanpa ada yang berpindah di layar.
            b.main(hubung[0].animate.set_value(0.0), run_time=0.25)
            b.main(tampak[0].animate.set_value(0.0), th_sin.animate.set_value(720), run_time=0.7,
                   rate_func=smooth)
            th_sin.set_value(0.0)
            b.main(tampak[0].animate.set_value(1.0), hubung[0].animate.set_value(1.0), run_time=0.3)
            b.tunggu_kata("satu sudut")
            b.main(th_sin.animate.set_value(45), th_cos.animate.set_value(45),
                   th_tan.animate.set_value(45), run_time=1.5, rate_func=smooth)
        qc.periksa_adegan(self, zona_panel(*semua_panel), hud=hud(ident),
                          tulisan=tulisan_panel(*semua_panel))

        # ============ sin: naik turun antara 1 dan -1 ==================== #
        def batas_satu(p):
            x = X_GRAFIK
            atas = rumus("1", 18, REDUP).next_to([x, p["y0"] + T, 0], LEFT, buff=0.14)
            bawah = rumus("-1", 18, REDUP).next_to([x, p["y0"] - T, 0], LEFT, buff=0.14)
            return VGroup(atas, bawah)

        batas_sin, batas_cos = batas_satu(p_sin), batas_satu(p_cos)
        with sinema.babak(self, "sin", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sinus")
            b.main(th_sin.animate.set_value(AKHIR), run_time=3.8, rate_func=linear)
            b.tunggu_kata("antara")
            b.main(FadeIn(batas_sin), run_time=0.5)
        qc.periksa_adegan(self, zona_panel(*semua_panel), hud=hud(ident),
                          tulisan={**tulisan_panel(*semua_panel), "batas sin": batas_sin})

        # ============ cos: mencatat posisi mendatar ====================== #
        with sinema.babak(self, "cos", DURASI, kata=KATA) as b:
            b.tunggu_kata("cosinus")
            b.main(th_cos.animate.set_value(AKHIR), run_time=3.8, rate_func=linear)
            b.tunggu_kata("persis")
            b.main(FadeIn(batas_cos), run_time=0.5)
            b.tunggu_kata("berangkat")
            awal_cos = VMobject().set_points_smoothly([
                np.array([x_dari(d), Y_PANEL[1] + np.cos(np.radians(d)) * T, 0.0])
                for d in np.linspace(0, 90, 30)]).set_stroke(SOROT, 14, opacity=0.4)
            b.main(ShowCreationThenFadeOut(awal_cos), run_time=1.2)
        self.remove(awal_cos)
        qc.periksa_adegan(self, zona_panel(*semua_panel), hud=hud(ident),
                          tulisan={**tulisan_panel(*semua_panel), "batas sin": batas_sin,
                                   "batas cos": batas_cos})

        # ============ cos berangkat 90 derajat lebih awal ================ #
        puncak_sin = np.array([x_dari(90), Y_PANEL[0] + T, 0.0])
        puncak_cos = np.array([x_dari(0), Y_PANEL[1] + T, 0.0])
        tanda_sin = Dot(puncak_sin, radius=0.075).set_color(SOROT)
        tanda_cos = Dot(puncak_cos, radius=0.075).set_color(SOROT)
        panah = Arrow(puncak_sin, puncak_cos, buff=0.12, path_arc=-1.1, thickness=2.5)
        panah.set_color(SOROT)
        cap90 = rumus(r"90^\circ", 26, SOROT).next_to(panah, RIGHT, buff=0.1)
        with sinema.babak(self, "geser", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sembilan")
            b.main(FadeIn(tanda_sin, scale=1.6), FadeIn(tanda_cos, scale=1.6), run_time=0.6)
            b.tunggu_kata("lebih awal")
            b.main(ShowCreation(panah), FadeIn(cap90), run_time=1.4)
            b.tunggu_kata("Masuk")
            b.main(hubung[0].animate.set_value(0.0), hubung[1].animate.set_value(0.0), run_time=0.4)
            b.tunggu_kata("sudutnya")
            # Kedua jari-jari (sin dan cos) diputar ke posisi 0 derajat = 720,
            # supaya yang diucapkan ("saat sudutnya 0") benar-benar terlihat.
            b.main(th_sin.animate.set_value(720), th_cos.animate.set_value(720), run_time=1.4,
                   rate_func=smooth)
            b.tunggu_kata("kanan")
            b.main(Flash(p_cos["titik_ling"](), color=SOROT, flash_radius=0.3, line_length=0.15),
                   run_time=0.6)
            b.tunggu_kata("Posisi")
            sorot_mendatar = Line(p_cos["pusat"], p_cos["titik_ling"]()).set_stroke(AKSEN2, 14,
                                                                                    opacity=0.4)
            b.main(ShowCreationThenFadeOut(sorot_mendatar), run_time=1.0)
            self.remove(sorot_mendatar)
            b.tunggu_kata("tingginya")
            b.main(Flash(p_sin["titik_ling"](), color=AKSEN, flash_radius=0.3, line_length=0.15),
                   run_time=0.6)
            b.main(FadeOut(tanda_sin), FadeOut(tanda_cos), FadeOut(panah), FadeOut(cap90),
                   run_time=0.6)
        qc.periksa_adegan(self, zona_panel(*semua_panel), hud=hud(ident),
                          tulisan={**tulisan_panel(*semua_panel), "batas sin": batas_sin,
                                   "batas cos": batas_cos})

        # ============ tan = tinggi : mendatar; di 45 derajat tan = 1 ===== #
        tan_kiri = rumus(r"\tan\theta =", 28, TINTA)
        tan_atas = rumus(r"\sin\theta", 26, AKSEN)
        tan_bawah = rumus(r"\cos\theta", 26, AKSEN2)
        tan_garis = Line(LEFT * 0.42, RIGHT * 0.42).set_stroke(TINTA, 2)
        pecahan = VGroup(tan_atas, tan_garis, tan_bawah).arrange(DOWN, buff=0.08)
        rumus_tan = VGroup(tan_kiri, pecahan).arrange(RIGHT, buff=0.15)
        sinema.batasi_lebar(rumus_tan, LEBAR_KANAN)
        rumus_tan.move_to([X_KANAN, Y_PANEL[2], 0])
        titik45 = np.array([x_dari(45), Y_PANEL[2] + T, 0.0])
        satu_tan = rumus("1", 22, SOROT).next_to(titik45, LEFT, buff=0.1)
        with sinema.babak(self, "tan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tangen")
            b.main(Write(rumus_tan), run_time=1.4)
            b.tunggu_kata("keduanya")
            sorot_ruas = VGroup(*[r.copy().clear_updaters().set_stroke(width=14, opacity=0.4)
                                  for r in p_tan["ruas"]])
            b.main(ShowCreationThenFadeOut(sorot_ruas), run_time=1.2)
            self.remove(sorot_ruas)
            b.tunggu_kata("tepat")
            b.main(FadeIn(satu_tan, shift=LEFT * 0.1), run_time=0.5)
        qc.periksa_adegan(self, zona_panel(*semua_panel), hud=hud(ident),
                          tulisan={**tulisan_panel(*semua_panel), "batas sin": batas_sin,
                                   "batas cos": batas_cos, "rumus tan": rumus_tan,
                                   "satu": satu_tan})

        # ============ pembaginya menuju nol ============================== #
        kotak = SurroundingRectangle(tan_bawah, buff=0.08).set_stroke(AKSEN2, 2.5).set_fill(opacity=0)
        with sinema.babak(self, "bagi", DURASI, kata=KATA) as b:
            b.tunggu_kata("pembaginya")
            b.main(ShowCreation(kotak), run_time=0.8)
            b.tunggu_kata("hasilnya")
            b.main(th_tan.animate.set_value(75), run_time=1.6, rate_func=linear)
            b.tunggu_kata("Tetapi")
            b.main(th_tan.animate.set_value(86), run_time=1.4, rate_func=linear)
            b.tunggu_kata("posisi")
            b.main(FadeOut(kotak), run_time=0.3)
            b.tunggu_kata("tepat")
            b.main(th_tan.animate.set_value(90), run_time=0.6, rate_func=smooth)
        qc.periksa_adegan(self, zona_panel(*semua_panel), hud=hud(ident),
                          tulisan={**tulisan_panel(*semua_panel), "batas sin": batas_sin,
                                   "batas cos": batas_cos, "rumus tan": rumus_tan,
                                   "satu": satu_tan})

        # ============ jurang: asimtot, kurva melesat ===================== #
        asimtot = VGroup(*[
            DashedLine([x_dari(d), Y_PANEL[2] - TAN_MAKS * T, 0], [x_dari(d), Y_PANEL[2] + TAN_MAKS * T, 0],
                       dash_length=0.09).set_stroke(REDUP, 2)
            for d in (90, 270, 450)])
        with sinema.babak(self, "jurang", DURASI, kata=KATA) as b:
            b.tunggu_kata("nol")
            b.main(ShowCreation(asimtot), run_time=1.2)
            b.tunggu_kata("Kurvanya")
            sorot_cabang = p_tan["kurva"][0].copy().clear_updaters().set_stroke(SOROT, 14, opacity=0.4)
            b.main(ShowCreationThenFadeOut(sorot_cabang), run_time=1.4)
            self.remove(sorot_cabang)
            b.tunggu_kata("menyentuh")
            b.main(th_tan.animate.set_value(180), run_time=2.2, rate_func=linear)
        qc.periksa_adegan(self, {**zona_panel(*semua_panel), "asimtot": asimtot}, hud=hud(ident),
                          tulisan={**tulisan_panel(*semua_panel), "batas sin": batas_sin,
                                   "batas cos": batas_cos, "rumus tan": rumus_tan,
                                   "satu": satu_tan})

        # ============ sin dan cos terkurung, tan tanpa batas ============= #
        pita_sin = pita(x_dari(0), x_dari(AKHIR), Y_PANEL[0], 2 * T)
        pita_cos = pita(x_dari(0), x_dari(AKHIR), Y_PANEL[1], 2 * T)
        with sinema.babak(self, "banding", DURASI, kata=KATA) as b:
            b.tunggu_kata("terkurung")
            b.main(FadeIn(pita_sin), FadeIn(pita_cos), run_time=0.8)
            b.tunggu_kata("Tangen")
            b.main(th_tan.animate.set_value(450), run_time=3.4, rate_func=linear)
            b.main(FadeOut(pita_sin), FadeOut(pita_cos), run_time=0.5)
        qc.periksa_adegan(self, {**zona_panel(*semua_panel), "asimtot": asimtot}, hud=hud(ident),
                          tulisan={**tulisan_panel(*semua_panel), "batas sin": batas_sin,
                                   "batas cos": batas_cos, "rumus tan": rumus_tan,
                                   "satu": satu_tan})

        # ============ periode: 360 untuk sin dan cos, 180 untuk tan ====== #
        ulang_sin = pita(x_dari(0), x_dari(360), Y_PANEL[0], 2.7 * T)
        ulang_cos = pita(x_dari(0), x_dari(360), Y_PANEL[1], 2.7 * T)
        ulang_tan = pita(x_dari(90), x_dari(270), Y_PANEL[2], 2 * TAN_MAKS * T)
        catat360 = VGroup(sinema.label("tiap", ukuran=24, warna=SOROT),
                          rumus(r"360^\circ", 26, SOROT)).arrange(RIGHT, buff=0.12)
        catat360.move_to([X_KANAN, (Y_PANEL[0] + Y_PANEL[1]) / 2, 0])
        catat180 = VGroup(sinema.label("tiap", ukuran=24, warna=SOROT),
                          rumus(r"180^\circ", 26, SOROT)).arrange(RIGHT, buff=0.12)
        catat180.move_to([X_KANAN, Y_PANEL[2] + 0.75, 0])
        with sinema.babak(self, "ulang", DURASI, kata=KATA) as b:
            b.tunggu_kata("mengulang")
            b.main(FadeIn(ulang_sin), FadeIn(ulang_cos), FadeIn(catat360), run_time=0.8)
            b.tunggu_kata("Tangen")
            b.main(th_tan.animate.set_value(AKHIR), run_time=0.8, rate_func=linear)
            b.main(hubung[2].animate.set_value(0.0), run_time=0.3)
            b.main(th_tan.animate.set_value(720), run_time=1.2, rate_func=linear)
            b.tunggu_kata("seratus")
            b.main(FadeIn(ulang_tan), FadeIn(catat180), run_time=0.8)
        qc.periksa_adegan(self, {**zona_panel(*semua_panel), "asimtot": asimtot}, hud=hud(ident),
                          tulisan={**tulisan_panel(*semua_panel), "batas sin": batas_sin,
                                   "batas cos": batas_cos, "rumus tan": rumus_tan,
                                   "satu": satu_tan, "tiap 360": catat360, "tiap 180": catat180})

        # ============ penutup: tiga kurva, satu putaran ================== #
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tiga")
            b.main(FadeOut(ulang_sin), FadeOut(ulang_cos), FadeOut(ulang_tan), FadeOut(catat360),
                   FadeOut(catat180), FadeOut(satu_tan), run_time=0.4)
            b.tunggu_kata("satu putaran")
            # Ketiganya di 720 (posisi 0): satu putaran penuh SERENTAK.
            b.main(th_sin.animate.set_value(1080), th_cos.animate.set_value(1080),
                   th_tan.animate.set_value(1080), run_time=3.0, rate_func=linear)
            b.tunggu_kata("dicatat")
            sorot_tiga = VGroup(*[m.copy().clear_updaters().set_stroke(SOROT, 12, opacity=0.4)
                                  for p in semua_panel for m in p["kurva"]])
            b.main(ShowCreationThenFadeOut(sorot_tiga), run_time=1.6)
            self.remove(sorot_tiga)
        qc.periksa_adegan(self, {**zona_panel(*semua_panel), "asimtot": asimtot}, hud=hud(ident),
                          tulisan={**tulisan_panel(*semua_panel), "batas sin": batas_sin,
                                   "batas cos": batas_cos, "rumus tan": rumus_tan})

        # ============ menunjuk Penerapan Trigonometri ==================== #
        lanjut = VGroup(teks("Penerapan", 30, SOROT), teks("Trigonometri", 30, SOROT))
        lanjut.arrange(DOWN, buff=0.12).move_to([X_KANAN, Y_PANEL[0], 0])
        sinema.batasi_lebar(lanjut, LEBAR_KANAN)
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Penerapan")
            b.main(FadeIn(lanjut, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("sudut")
            b.main(th_sin.animate.set_value(1170), th_cos.animate.set_value(1170),
                   th_tan.animate.set_value(1170), run_time=2.4, rate_func=smooth)
        qc.periksa_adegan(self, {**zona_panel(*semua_panel), "asimtot": asimtot}, hud=hud(ident),
                          tulisan={**tulisan_panel(*semua_panel), "batas sin": batas_sin,
                                   "batas cos": batas_cos, "rumus tan": rumus_tan,
                                   "lanjut": lanjut})

        sinema.laporkan_pemicu(self)
