"""Grafik Fungsi Trigonometri, Bagian 1 (Materi 08): lahirnya grafik sinus.
STANDAR VIDEO v3.1, ditulis ulang 11 Sep 2026 dari adegan Manim CE yang sudah
disetujui ARYA. ISINYA SAMA: titik berjalan di lingkaran satuan, tingginya
dibawa lurus ke kanan dan ditandai di papan; puncak 1 di 90, nol di 180,
lembah minus 1 di 270, satu putaran di 360, lalu kurvanya mengulang.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 1; segar-ingat koordinat (cos, sin)
  dari Lingkaran Satuan Bagian 1, dengan tinggi titik disorot merah.
- Contoh angka dari sudut istimewa Bagian 3: sin 30 = 1/2, sin 60 = akar 3
  per 2 (sekitar 0,87), dicek langsung di papan.
- Rumus y = sin theta LAHIR besar di atas grafiknya lalu terbang ke panel.
- Penutup menunjuk Bagian 2 dengan tiga grafik kecil (sin, cos, tan) yang
  dinamai satu per satu saat disebut.
- Tiap kejadian dipicu pada kata yang mengucapkannya.

TATA LETAK: lingkaran mula-mula besar di tengah (segar-ingat), lalu digeser
ke kiri dan mengecil; papan grafik di kanan, sumbu mendatarnya setinggi pusat
lingkaran dan satu satuan tingginya = jari-jari, sehingga garis penghubung
dari titik ke grafik SELALU mendatar. Nilai tinggi ditulis di titik grafiknya
(1, 0, minus 1); catatan contoh di ruang kosong di atas papan.

WARNA: merah = tinggi (sin), tinta = jari-jari dan titik, ungu = sudut dan
sorot, redup = sumbu dan penghubung.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "tahap8-grafik-sin"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

PUSAT_AWAL = np.array([0.0, 0.1, 0.0])     # lingkaran besar di tengah (segar-ingat)
R_AWAL = 2.2
PUSAT_AKHIR = np.array([-4.9, -0.3, 0.0])  # sesudah digeser ke kiri
R_AKHIR = 1.6
SUDUT_AWAL = 35
PAPAN_X0 = -2.25        # sumbu tegak papan grafik
PAPAN_L = 8.0           # panjang sumbu mendatar untuk 0 sampai 540 derajat
AKHIR = 540
PY = PUSAT_AKHIR[1]     # sumbu mendatar papan setinggi pusat lingkaran
AMP = R_AKHIR           # 1 satuan tinggi = jari-jari: penghubungnya mendatar
X_CATATAN = -1.5        # tepi kiri catatan contoh di atas papan
X_MINI0, X_MINI1 = -1.7, 5.9   # tiga grafik kecil di penutup
Y_MINI = [1.55, 0.05, -1.45]
A_MINI = 0.45


def hud(ident, papan):
    isi = {"identitas": ident} if ident is not None else {}
    p = papan.semua()
    if p is not None:
        isi["papan"] = p
    return isi


def arah(derajat):
    r = np.radians(derajat)
    return np.array([np.cos(r), np.sin(r), 0.0])


def G(d):
    """Titik grafik untuk sudut d derajat: mendatar = sudut, tegak = tinggi."""
    return np.array([PAPAN_X0 + d / AKHIR * PAPAN_L, PY + AMP * np.sin(np.radians(d)), 0.0])


def kurva_sin(d0, d1, warna, tebal):
    return ParametricCurve(lambda d: G(d), t_range=(d0, d1, 1.0)).set_stroke(warna, tebal)


class GrafikSinusLahir(AdeganMatra):
    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        ident = None

        # Semua benda di lingkaran membaca empat pelacak ini: pusat (cx, cy),
        # jari-jari rr, dan sudut theta (derajat). Menggeser lingkaran berarti
        # menganimasikan pelacaknya; bendanya menggambar ulang dirinya sendiri.
        cx, cy = ValueTracker(PUSAT_AWAL[0]), ValueTracker(PUSAT_AWAL[1])
        rr = ValueTracker(R_AWAL)
        theta = ValueTracker(SUDUT_AWAL)

        def P():
            return np.array([cx.get_value(), cy.get_value(), 0.0])

        def R():
            return rr.get_value()

        def T():
            return P() + R() * arah(theta.get_value())

        def K():
            t = T()
            return np.array([t[0], P()[1], 0.0])

        def buat_sumbu(pusat, r):
            s = VGroup(Line(pusat + LEFT * r * 1.15, pusat + RIGHT * r * 1.15),
                       Line(pusat + DOWN * r * 1.1, pusat + UP * r * 1.15)).set_stroke(REDUP, 2)
            s.latar = True
            return s

        # ============ buka ============================================== #
        tanya = teks("Dari mana datangnya bentuk grafik sinus yang naik turun itu?", 34, TINTA)
        tanya.move_to([0, -0.6, 0])
        sinema.batasi_lebar(tanya, 10.5)
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Grafik")
            sinema.judul_pembuka(self, "Grafik Fungsi Trigonometri, Bagian 1", lama=3.4)
            b.catat(3.4)
            b.tunggu_kata("Dari")
            b.main(Write(tanya), run_time=2.0)

        # ============ segar-ingat: koordinat (cos, sin), tinggi = sin ===== #
        # Versi DIAM dulu supaya ShowCreation terlihat; versi hidup (always_redraw)
        # menggantikannya tepat sebelum bendanya mulai bergerak.
        sumbu_diam = buat_sumbu(PUSAT_AWAL, R_AWAL)
        ling_diam = Circle(radius=R_AWAL).move_to(PUSAT_AWAL).set_stroke(TINTA, 3)
        t0 = PUSAT_AWAL + R_AWAL * arah(SUDUT_AWAL)
        k0 = np.array([t0[0], PUSAT_AWAL[1], 0.0])
        jari_diam = Line(PUSAT_AWAL, t0).set_stroke(TINTA, 3)
        titik_diam = Dot(t0, radius=0.08).set_color(TINTA)
        busur_diam = Arc(radius=R_AWAL * 0.24, start_angle=0, angle=np.radians(SUDUT_AWAL),
                         arc_center=PUSAT_AWAL).set_stroke(SOROT, 3.5)
        lab_theta = rumus(r"\theta", 28, SOROT).move_to(PUSAT_AWAL + 0.85 * arah(SUDUT_AWAL / 2))
        koor = rumus(r"(\cos\theta, \sin\theta)", 32, TINTA).next_to(t0, UR, buff=0.12)
        tinggi_diam = Line(k0, t0).set_stroke(AKSEN, 6)
        garis_sorot = Line(PUSAT_AWAL + LEFT * R_AWAL * 1.15, PUSAT_AWAL + RIGHT * R_AWAL * 1.15
                           ).set_stroke(SOROT, 5)
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi sebelumnya")
            ident = sinema.identitas(self, "ingat Bagian 1")
            ident.set_opacity(0.0)
            b.main(FadeOut(tanya), ident.animate.set_opacity(1.0), run_time=0.5)
            b.tunggu_kata("Lingkaran")
            b.main(ShowCreation(sumbu_diam), ShowCreation(ling_diam), run_time=1.4)
            b.tunggu_kata("titik")
            b.main(ShowCreation(jari_diam), FadeIn(titik_diam), FadeIn(busur_diam),
                   FadeIn(lab_theta), run_time=0.7)
            b.tunggu_kata("koordinat")
            b.main(Write(koor), run_time=1.2)
            b.tunggu_kata("tinggi")
            b.main(ShowCreation(tinggi_diam), run_time=0.6)
            b.tunggu_kata("garis mendatar")
            b.main(ShowCreationThenFadeOut(garis_sorot), run_time=1.2)
        self.remove(garis_sorot)
        qc.periksa_adegan(self, {"lingkaran": ling_diam, "jari": jari_diam, "titik": titik_diam,
                                 "tinggi": tinggi_diam, "busur": busur_diam},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu_diam},
                          tulisan={"koordinat": koor, "theta": lab_theta})

        # ============ titik berjalan berlawanan arah jarum jam =========== #
        jari = always_redraw(lambda: Line(P(), T()).set_stroke(TINTA, 3))
        titik = always_redraw(lambda: Dot(T(), radius=0.08).set_color(TINTA))
        tinggi = always_redraw(lambda: Line(K(), T()).set_stroke(AKSEN, 6))
        with sinema.babak(self, "jalan", DURASI, kata=KATA) as b:
            b.tunggu_kata("berjalan")
            b.main(FadeOut(koor), FadeOut(lab_theta), FadeOut(busur_diam), run_time=0.3)
            self.remove(jari_diam, tinggi_diam, titik_diam)
            self.add(jari, tinggi, titik)
            b.main(theta.animate.set_value(125), run_time=2.0, rate_func=linear)
            b.tunggu_kata("berangkat")
            b.main(theta.animate.set_value(360), run_time=2.2, rate_func=smooth)
        qc.periksa_adegan(self, {"lingkaran": ling_diam, "jari": jari, "titik": titik,
                                 "tinggi": tinggi},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu_diam})

        # ============ yang diperhatikan cuma tingginya =================== #
        theta.set_value(0)   # 360 dan 0 satu tempat: tidak ada yang berubah di layar
        with sinema.babak(self, "tinggi", DURASI, kata=KATA) as b:
            b.tunggu_kata("Seberapa")
            b.main(theta.animate.set_value(60), run_time=1.6, rate_func=smooth)
            lab_sin = rumus(r"\sin\theta", 28, AKSEN).next_to(Line(K(), T()), RIGHT, buff=0.15)
            b.tunggu_kata("Tinggi itulah")
            b.main(FadeIn(lab_sin, shift=RIGHT * 0.15), run_time=0.5)
        qc.periksa_adegan(self, {"lingkaran": ling_diam, "jari": jari, "titik": titik,
                                 "tinggi": tinggi},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu_diam},
                          tulisan={"sin": lab_sin})

        # ============ lingkaran digeser ke kiri, papan kosong di kanan === #
        lingkaran = always_redraw(lambda: Circle(radius=R()).move_to(P()).set_stroke(TINTA, 3))
        sumbu = always_redraw(lambda: buat_sumbu(P(), R()))
        sumbu.latar = True
        busur = always_redraw(lambda: Arc(
            radius=R() * 0.24, start_angle=0, angle=max(np.radians(theta.get_value()), 1e-3),
            arc_center=P()).set_stroke(SOROT, 3.5))
        sudut_hidup = always_redraw(lambda: rumus(
            rf"\theta = {int(round(theta.get_value()))}^\circ", 30, TINTA
        ).move_to([P()[0], P()[1] + R() * 1.15 + 0.42, 0]))

        sumbu_x = Line([PAPAN_X0 - 0.25, PY, 0], [PAPAN_X0 + PAPAN_L + 0.15, PY, 0]
                       ).set_stroke(REDUP, 2)
        sumbu_y = Line([PAPAN_X0, PY - AMP - 0.3, 0], [PAPAN_X0, PY + AMP + 0.3, 0]
                       ).set_stroke(REDUP, 2)
        tanda_tik, angka = VGroup(), VGroup()
        for d in range(90, AKHIR + 1, 90):
            x = PAPAN_X0 + d / AKHIR * PAPAN_L
            tik = Line([x, PY - 0.08, 0], [x, PY + 0.08, 0]).set_stroke(REDUP, 2)
            tanda_tik.add(tik)
            angka.add(rumus(rf"{d}^\circ", 22, REDUP).next_to(tik, DOWN, buff=0.1))
        papan_grafik = VGroup(sumbu_x, sumbu_y, tanda_tik)
        papan_grafik.angka = angka
        papan_grafik.latar = True
        lab_sudut = sinema.label("sudut", ukuran=24, warna=REDUP).next_to(sumbu_x, RIGHT, buff=0.1)
        lab_tinggi = sinema.label("tinggi", ukuran=24, warna=REDUP).next_to(sumbu_y, UP, buff=0.12)
        with sinema.babak(self, "geser", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang")
            ident2 = sinema.identitas(self, "titik berputar")
            ident2.set_opacity(0.0)
            b.main(FadeOut(ident), ident2.animate.set_opacity(1.0), run_time=0.5)
            ident = ident2
            b.tunggu_kata("geser")
            b.main(FadeOut(lab_sin), run_time=0.2)
            self.remove(sumbu_diam, ling_diam, jari, tinggi, titik)
            self.add(sumbu, lingkaran, jari, tinggi, titik)
            b.main(cx.animate.set_value(PUSAT_AKHIR[0]), cy.animate.set_value(PUSAT_AKHIR[1]),
                   rr.animate.set_value(R_AKHIR), run_time=1.8, rate_func=smooth)
            b.tunggu_kata("papan")
            b.main(ShowCreation(papan_grafik), run_time=1.2)
            b.tunggu_kata("Sumbu mendatarnya")
            b.main(FadeIn(angka), FadeIn(lab_sudut), FadeIn(sudut_hidup), FadeIn(busur),
                   run_time=0.8)
            b.tunggu_kata("sumbu tegaknya")
            b.main(FadeIn(lab_tinggi), run_time=0.6)
        dunia = {"sumbu": sumbu, "papan": papan_grafik}
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "jari": jari, "titik": titik,
                                 "tinggi": tinggi, "busur": busur},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"sudut": sudut_hidup, "nama sudut": lab_sudut,
                                   "nama tinggi": lab_tinggi})

        # ============ tinggi dibawa lurus ke kanan, ditandai di papan ==== #
        penghubung = always_redraw(lambda: DashedLine(
            T(), G(min(theta.get_value(), AKHIR)), dash_length=0.12).set_stroke(REDUP, 2))
        titik_g = always_redraw(lambda: Dot(G(min(theta.get_value(), AKHIR)), radius=0.075
                                            ).set_color(AKSEN))
        kurva = always_redraw(lambda: kurva_sin(0, min(max(theta.get_value(), 1.0), AKHIR),
                                                AKSEN, 4))
        with sinema.babak(self, "sapu", DURASI, kata=KATA) as b:
            b.tunggu_kata("berjalan")
            b.main(theta.animate.set_value(22), run_time=1.6, rate_func=linear)
            b.tunggu_kata("tingginya")
            hubung_diam = DashedLine(T(), G(theta.get_value()), dash_length=0.12).set_stroke(REDUP, 2)
            b.main(ShowCreation(hubung_diam), run_time=0.9)
            self.remove(hubung_diam)
            self.add(penghubung)
            b.tunggu_kata("tandai")
            # Kurva hidup menambah titik tiap frame, jadi FadeIn-nya gagal
            # (jumlah titik awal dan akhir beda). Yang dimunculkan salinan
            # diam, lalu ditukar dengan yang hidup begitu tampil penuh.
            kurva_diam = kurva_sin(0, theta.get_value(), AKSEN, 4)
            titik_g_diam = Dot(G(theta.get_value()), radius=0.075).set_color(AKSEN)
            b.main(FadeIn(kurva_diam), FadeIn(titik_g_diam), run_time=0.5)
            self.remove(kurva_diam, titik_g_diam)
            self.add(kurva, titik_g)
            b.main(theta.animate.set_value(26), run_time=1.0, rate_func=linear)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "jari": jari, "titik": titik,
                                 "tinggi": tinggi, "busur": busur, "kurva": kurva,
                                 "penghubung": penghubung, "titik grafik": titik_g},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"sudut": sudut_hidup, "nama sudut": lab_sudut,
                                   "nama tinggi": lab_tinggi})

        # ============ contoh: sudut istimewa 30 dan 60 =================== #
        def tanda_contoh(d):
            p = G(d)
            garis = DashedLine([p[0], PY, 0], p, dash_length=0.08).set_stroke(SOROT, 2.5)
            return VGroup(garis, Dot(p, radius=0.07).set_color(SOROT))

        tanda30, tanda60 = tanda_contoh(30), tanda_contoh(60)
        catatan1 = rumus(r"\sin 30^\circ = \tfrac{1}{2}", 32, SOROT)
        catatan1.move_to([X_CATATAN + catatan1.get_width() / 2, 2.85, 0])
        catatan2 = rumus(r"\sin 60^\circ = \tfrac{\sqrt{3}}{2}", 32, SOROT)
        catatan2.move_to([X_CATATAN + catatan2.get_width() / 2, 2.15, 0])
        catatan2b = rumus(r"\approx 0{,}87", 32, SOROT).next_to(catatan2, RIGHT, buff=0.2)
        with sinema.babak(self, "contoh", DURASI, kata=KATA) as b:
            b.tunggu_kata("Coba")
            b.main(theta.animate.set_value(30), run_time=1.2, rate_func=smooth)
            b.tunggu_kata("tiga puluh")
            b.main(FadeIn(tanda30), run_time=0.5)
            b.tunggu_kata("setengah")
            b.main(Write(catatan1), run_time=1.0)
            b.tunggu_kata("enam puluh")
            b.main(theta.animate.set_value(60), run_time=0.8, rate_func=smooth)
            b.main(FadeIn(tanda60), run_time=0.25)
            b.tunggu_kata("akar")
            b.main(Write(catatan2), run_time=1.0)
            b.tunggu_kata("sekitar")
            b.main(FadeIn(catatan2b, shift=RIGHT * 0.15), run_time=0.6)
        tulisan_contoh = {"catatan 30": catatan1, "catatan 60": catatan2, "kira-kira": catatan2b}
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "titik": titik, "tinggi": tinggi,
                                 "kurva": kurva, "penghubung": penghubung, "titik grafik": titik_g,
                                 "tanda 30": tanda30, "tanda 60": tanda60},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"sudut": sudut_hidup, "nama sudut": lab_sudut,
                                   "nama tinggi": lab_tinggi, **tulisan_contoh})

        # ============ puncak di 90 ======================================= #
        lab1 = rumus("1", 28, AKSEN).next_to(G(90), UP, buff=0.14)
        with sinema.babak(self, "puncak", DURASI, kata=KATA) as b:
            b.tunggu_kata("sembilan")
            b.main(theta.animate.set_value(90), run_time=1.6, rate_func=smooth)
            b.tunggu_kata("Tingginya")
            b.main(FadeIn(lab1, shift=UP * 0.15), run_time=0.5)
            b.tunggu_kata("setinggi-tingginya")
            # Sorot = pita ungu TEMBUS PANDANG yang lebih lebar dari bendanya,
            # bukan garis tebal yang menutupnya (koreksi ARYA 11 Sep: sorot
            # yang menutup rumus terlihat seperti glitch).
            sorot_tinggi = Line(K(), T()).set_stroke(SOROT, 16, opacity=0.4)
            b.main(ShowCreationThenFadeOut(sorot_tinggi), run_time=1.2)
        self.remove(sorot_tinggi)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "titik": titik, "tinggi": tinggi,
                                 "kurva": kurva, "penghubung": penghubung, "titik grafik": titik_g},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"sudut": sudut_hidup, "nama sudut": lab_sudut,
                                   "nama tinggi": lab_tinggi, "satu": lab1, **tulisan_contoh})

        # ============ turun sampai nol di 180 ============================ #
        lab0 = rumus("0", 28, AKSEN).move_to(G(180) + np.array([0.32, 0.3, 0.0]))
        with sinema.babak(self, "turun", DURASI, kata=KATA) as b:
            b.tunggu_kata("Lewat")
            b.main(theta.animate.set_value(120), run_time=1.4, rate_func=smooth)
            b.tunggu_kata("turun")
            b.main(theta.animate.set_value(150), run_time=1.2, rate_func=smooth)
            b.tunggu_kata("seratus")
            b.main(theta.animate.set_value(180), run_time=1.8, rate_func=smooth)
            b.tunggu_kata("nol")
            b.main(FadeIn(lab0, shift=UP * 0.15), run_time=0.5)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "titik": titik, "kurva": kurva,
                                 "penghubung": penghubung, "titik grafik": titik_g},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"sudut": sudut_hidup, "nama sudut": lab_sudut,
                                   "nama tinggi": lab_tinggi, "satu": lab1, "nol": lab0,
                                   **tulisan_contoh})

        # ============ ke bawah garis: negatif, lembah minus 1 di 270 ===== #
        lab_m1 = rumus("-1", 28, AKSEN).next_to(G(270), DOWN, buff=0.14)
        with sinema.babak(self, "bawah", DURASI, kata=KATA) as b:
            b.tunggu_kata("masuk")
            b.main(theta.animate.set_value(215), run_time=1.6, rate_func=smooth)
            b.tunggu_kata("negatif")
            sorot_bawah = Line(K(), T()).set_stroke(SOROT, 16, opacity=0.4)
            b.main(ShowCreationThenFadeOut(sorot_bawah), run_time=1.0)
            self.remove(sorot_bawah)
            b.tunggu_kata("dua ratus")
            b.main(theta.animate.set_value(270), run_time=1.8, rate_func=smooth)
            b.tunggu_kata("minus")
            b.main(FadeIn(lab_m1, shift=DOWN * 0.15), run_time=0.5)
        tulisan_nilai = {"satu": lab1, "nol": lab0, "minus satu": lab_m1}
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "titik": titik, "tinggi": tinggi,
                                 "kurva": kurva, "penghubung": penghubung, "titik grafik": titik_g},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"sudut": sudut_hidup, "nama sudut": lab_sudut,
                                   "nama tinggi": lab_tinggi, **tulisan_nilai, **tulisan_contoh})

        # ============ satu putaran penuh di 360 ========================== #
        with sinema.babak(self, "genap", DURASI, kata=KATA) as b:
            b.tunggu_kata("tiga ratus")
            b.main(theta.animate.set_value(360), run_time=2.2, rate_func=smooth)
            b.tunggu_kata("Satu putaran")
            putaran = kurva_sin(0, 360, SOROT, 14).set_stroke(opacity=0.4)
            b.main(ShowCreationThenFadeOut(putaran), run_time=1.8)
        self.remove(putaran)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "titik": titik, "kurva": kurva,
                                 "penghubung": penghubung, "titik grafik": titik_g},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"sudut": sudut_hidup, "nama sudut": lab_sudut,
                                   "nama tinggi": lab_tinggi, **tulisan_nilai, **tulisan_contoh})

        # ============ jalan terus: kurvanya mengulang ==================== #
        with sinema.babak(self, "ulang", DURASI, kata=KATA) as b:
            b.tunggu_kata("jalan")
            b.main(theta.animate.set_value(AKHIR), run_time=3.6, rate_func=linear)
            b.tunggu_kata("kurvanya")
            ulangan = kurva_sin(360, AKHIR, SOROT, 14).set_stroke(opacity=0.4)
            b.main(ShowCreationThenFadeOut(ulangan), run_time=1.6)
        self.remove(ulangan)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "titik": titik, "kurva": kurva,
                                 "penghubung": penghubung, "titik grafik": titik_g},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"sudut": sudut_hidup, "nama sudut": lab_sudut,
                                   "nama tinggi": lab_tinggi, **tulisan_nilai, **tulisan_contoh})

        # ============ penutup: inilah grafik sinus ======================= #
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("Inilah")
            b.main(FadeOut(catatan1), FadeOut(catatan2), FadeOut(catatan2b),
                   FadeOut(tanda30), FadeOut(tanda60), run_time=0.4)
            b.tunggu_kata("grafik")
            rumus_sin = sinema.lahir_rumus(self, r"y = \sin\theta", papan_grafik, papan, b=b,
                                           warna=SOROT, sebagai_utama=False, geser=UP * 1.1)
            b.tunggu_kata("jejak")
            jejak = kurva_sin(0, AKHIR, SOROT, 14).set_stroke(opacity=0.5)
            b.main(VShowPassingFlash(jejak, time_width=0.25), run_time=1.6)
            self.remove(jejak)
            b.tunggu_kata("berputar")
            b.main(Flash(T(), color=AKSEN, flash_radius=0.35, line_length=0.2), run_time=0.8)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "titik": titik, "kurva": kurva,
                                 "penghubung": penghubung, "titik grafik": titik_g},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"sudut": sudut_hidup, "nama sudut": lab_sudut,
                                   "nama tinggi": lab_tinggi, **tulisan_nilai})

        # ============ menunjuk Bagian 2: tiga grafik dari satu putaran === #
        lanjut = teks("Grafik Fungsi Trigonometri, Bagian 2", 30, SOROT).move_to([2.1, 2.75, 0])
        sinema.batasi_lebar(lanjut, 7.4)

        def mini_x(d):
            return X_MINI0 + d / AKHIR * (X_MINI1 - X_MINI0)

        def mini_kurva(f, potongan, y, warna):
            g = VGroup()
            for d0, d1 in potongan:
                g.add(ParametricCurve(
                    lambda d, y=y, f=f: np.array([mini_x(d), y + A_MINI * f(np.radians(d)), 0.0]),
                    t_range=(d0, d1, 1.0)).set_stroke(warna, 3.5))
            return g

        # tan hanya digambar selama nilainya di antara -2 dan 2 (atan 2 = 63,4 derajat)
        potong_tan = [(0, 63.4), (116.6, 243.4), (296.6, 423.4), (476.6, AKHIR)]
        mini_sumbu = VGroup(*[Line([X_MINI0 - 0.1, y, 0], [X_MINI1 + 0.1, y, 0]).set_stroke(REDUP, 1.6)
                              for y in Y_MINI])
        mini_sumbu.latar = True
        mini_sin = mini_kurva(np.sin, [(0, AKHIR)], Y_MINI[0], AKSEN)
        mini_cos = mini_kurva(np.cos, [(0, AKHIR)], Y_MINI[1], AKSEN2)
        mini_tan = mini_kurva(np.tan, potong_tan, Y_MINI[2], SOROT)
        nama_sin = rumus(r"\sin", 26, AKSEN).move_to([X_MINI0 - 0.55, Y_MINI[0], 0])
        nama_cos = rumus(r"\cos", 26, AKSEN2).move_to([X_MINI0 - 0.55, Y_MINI[1], 0])
        nama_tan = rumus(r"\tan", 26, SOROT).move_to([X_MINI0 - 0.55, Y_MINI[2], 0])
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi berikutnya")
            for m in (kurva, penghubung, titik_g, sudut_hidup):
                m.clear_updaters()
            b.main(FadeOut(papan_grafik), FadeOut(angka), FadeOut(lab_sudut), FadeOut(lab_tinggi),
                   FadeOut(lab1), FadeOut(lab0), FadeOut(lab_m1), FadeOut(kurva),
                   FadeOut(penghubung), FadeOut(titik_g), FadeOut(sudut_hidup), run_time=0.6)
            b.tunggu_kata("Grafik")
            b.main(FadeIn(lanjut, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("jajarkan")
            b.main(ShowCreation(mini_sumbu), run_time=0.6)
            b.tunggu_kata("sinus")
            b.main(ShowCreation(mini_sin), FadeIn(nama_sin), run_time=0.7)
            b.tunggu_kata("cosinus")
            b.main(ShowCreation(mini_cos), FadeIn(nama_cos), run_time=0.8)
            b.tunggu_kata("tangen")
            b.main(ShowCreation(mini_tan), FadeIn(nama_tan), run_time=0.8)
            b.tunggu_kata("satu putaran")
            b.main(theta.animate.set_value(AKHIR + 360), run_time=2.0, rate_func=linear)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "titik": titik, "tinggi": tinggi,
                                 "busur": busur, "sin": mini_sin, "cos": mini_cos, "tan": mini_tan},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu, "sumbu mini": mini_sumbu},
                          tulisan={"lanjut": lanjut, "nama sin": nama_sin, "nama cos": nama_cos,
                                   "nama tan": nama_tan})

        sinema.laporkan_pemicu(self)
