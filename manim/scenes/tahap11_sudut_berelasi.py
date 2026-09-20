"""Lingkaran Satuan dan Sudut Istimewa, Bagian 4 (Materi 11): sudut berelasi.
STANDAR VIDEO v3.1, ditulis 20 Sep 2026 (materi baru atas keputusan ARYA:
tiga soal kuis bab menguji sudut berelasi yang belum pernah diajarkan).

ISINYA: titik P pada 40 derajat di lingkaran satuan (0,77; 0,64). Segitiga
kecil di bawahnya DIPUTAR 90 derajat: sisi mendatar jadi tegak, sisi tegak
jadi mendatar ke kiri, sehingga Q = (-sin, cos). Lalu tiga cara lain
memindahkan P: dicerminkan ke kiri (180 - theta), dibalik ke seberang
(180 + theta), dicerminkan ke bawah (360 - theta). Keempat relasi lahir di
dekat Q lalu terbang ke panel. Pola tanda per kuadran, kapan sin dan cos
bertukar, dan "sering keliru" (-cos, sin) diperiksa dengan angka.

WARNA: biru = sisi mendatar (cos), merah = sisi tegak (sin), tinta = miring,
ungu = sudut dan sorotan. Warna sisi IKUT BERPUTAR bersama segitiganya: sisi
biru yang tadinya mendatar terlihat berdiri tegak sesudah putaran, itulah
bukti visual "sin dan cos bertukar peran".

ANGKANYA: cos 40 = 0,766 (ditulis 0,77), sin 40 = 0,643 (ditulis 0,64);
cos 130 = -0,643 = -sin 40.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "tahap11-sudut-berelasi"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

PUSAT = np.array([-3.4, -0.2, 0.0])
R = 2.0
SUDUT_P = 40.0

X_KERJA = 4.45
Y1, Y2, Y3, Y4 = 0.45, -0.2, -0.85, -1.5


def hud(ident, papan):
    isi = {"identitas": ident} if ident is not None else {}
    p = papan.semua()
    if p is not None:
        isi["papan"] = p
    return isi


def di_lingkaran(derajat):
    r = np.radians(derajat)
    return PUSAT + R * np.array([np.cos(r), np.sin(r), 0.0])


def siku_tanda(sudut_di, arah_a, arah_b, ukuran=0.26, warna=REDUP):
    p = np.array(sudut_di)
    na, nb = np.linalg.norm(arah_a), np.linalg.norm(arah_b)
    if na < 1e-6 or nb < 1e-6:
        return VGroup()
    u = np.array(arah_a) / na * ukuran
    v = np.array(arah_b) / nb * ukuran
    return VGroup(Line(p + u, p + u + v), Line(p + v, p + u + v)).set_stroke(warna, 2.2)


def segitiga_acuan(derajat, tebal=6):
    """Segitiga kecil PUSAT-kaki-titik: mendatar biru, tegak merah, miring tinta.
    Urutan anggota: 0 mendatar, 1 tegak, 2 miring, 3 isian, 4 siku."""
    c = di_lingkaran(derajat)
    k = np.array([c[0], PUSAT[1], 0.0])
    isi = Polygon(PUSAT, k, c).set_fill(SOROT, 0.10).set_stroke(width=0)
    return VGroup(
        Line(PUSAT, k).set_stroke(AKSEN2, tebal),
        Line(k, c).set_stroke(AKSEN, tebal),
        Line(PUSAT, c).set_stroke(TINTA, 3.5),
        isi,
        siku_tanda(k, PUSAT - k, c - k),
    )


def busur_sudut(derajat, radius, warna, tebal=3.5):
    return Arc(radius=radius, start_angle=0, angle=np.radians(derajat), arc_center=PUSAT
               ).set_stroke(warna, tebal)


def kerja(isi, y, ukuran=34, warna=TINTA, x=X_KERJA):
    m = rumus(isi, ukuran, warna).move_to([x, y, 0])
    sinema.batasi_lebar(m, 4.6)
    return m


class SudutBerelasiLahir(AdeganMatra):
    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        ident = None

        lingkaran = Circle(radius=R).move_to(PUSAT).set_stroke(TINTA, 3.0)
        sumbu = VGroup(
            Line(PUSAT + LEFT * R * 1.15, PUSAT + RIGHT * R * 1.15),
            Line(PUSAT + DOWN * R * 1.12, PUSAT + UP * R * 1.12),
        ).set_stroke(REDUP, 2)
        sumbu.latar = True
        lab_x = rumus("x", 26, REDUP).next_to(sumbu[0], RIGHT, buff=0.1)
        lab_y = rumus("y", 26, REDUP).next_to(sumbu[1], UP, buff=0.1)

        # ---- titik P dan segitiga acuannya ----
        C_P = di_lingkaran(SUDUT_P)
        K_P = np.array([C_P[0], PUSAT[1], 0.0])
        tri_P = segitiga_acuan(SUDUT_P)
        titik_P = Dot(C_P, radius=0.085).set_color(SOROT)
        lab_P = rumus("P", 30, SOROT).move_to(C_P + np.array([0.28, 0.26, 0]))
        busur_P = busur_sudut(SUDUT_P, 0.55, SOROT)
        # label sudut di luar busur tetapi di bawah sisi miring: pada 480p pertama
        # label 40 derajat (r 0,9; 20 derajat) menindih sisi miringnya
        lab_theta = rumus(r"\theta", 26, SOROT).move_to(PUSAT + rotate_vector(RIGHT * 1.0, np.radians(16)))
        koor_P = rumus(r"(\cos\theta,\ \sin\theta)", 26, TINTA).next_to(titik_P, RIGHT, buff=0.32).shift(UP * 0.05)

        # ============ buka ============================================== #
        tanya = teks("Kalau titiknya diputar 90 derajat, ke mana sin dan cos-nya pergi?", 34, TINTA)
        tanya.move_to([0, -0.6, 0])
        sinema.batasi_lebar(tanya, 11.0)
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Lingkaran")
            sinema.judul_pembuka(self, "Lingkaran Satuan dan Sudut Istimewa, Bagian 4", lama=3.4)
            b.catat(3.4)
            b.tunggu_kata("Kalau")
            b.main(Write(tanya), run_time=2.0)

        # ============ segar-ingat: (cos theta, sin theta) dari Bagian 1 == #
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            # pertanyaan ditahan sampai nama sub-babnya disebut, lalu lingkaran
            # langsung digambar: tanpa ini layar kosong 6 detik (cek_layar_kosong)
            b.tunggu_kata("Lingkaran")
            b.main(FadeOut(tanya), ShowCreation(sumbu), ShowCreation(lingkaran), FadeIn(lab_x),
                   FadeIn(lab_y), run_time=1.2)
            b.tunggu_kata("titik")
            b.main(FadeIn(titik_P, scale=0.5), run_time=0.5)
            b.tunggu_kata("koordinat")
            b.main(ShowCreation(tri_P[0]), ShowCreation(tri_P[1]), ShowCreation(tri_P[2]),
                   FadeIn(tri_P[3]), FadeIn(tri_P[4]), run_time=0.5)
            b.tunggu_kata("cosinus")
            b.main(FadeIn(koor_P), run_time=0.5)
            papan.baris(r"(x, y) = (\cos\theta,\ \sin\theta)", warna=TINTA, b=b)
            b.tunggu_kata("Sudutnya")
            b.main(ShowCreation(busur_P), FadeIn(lab_theta), run_time=0.8)
            b.tunggu_kata("berlawanan")
            b.main(Indicate(busur_P, color=SOROT, scale_factor=1.0), run_time=0.9)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "segitiga": tri_P},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"koor": koor_P, "theta": lab_theta, "x": lab_x, "y": lab_y})

        # ============ masalah: 130 derajat tidak punya segitiga ========== #
        lab_kI = rumus(r"\mathrm{I}", 26, REDUP).move_to(PUSAT + rotate_vector(RIGHT * 1.55, np.radians(65)))
        hantu = Dot(di_lingkaran(130), radius=0.08).set_color(REDUP)
        lab_hantu = rumus(r"130^\circ", 26, REDUP).move_to(di_lingkaran(130) + np.array([-0.4, 0.3, 0]))
        busur_hantu = busur_sudut(130, 0.85, REDUP, tebal=2.5)
        with sinema.babak(self, "masalah", DURASI, kata=KATA) as b:
            b.tunggu_kata("kuadran")
            b.main(FadeIn(lab_kI), run_time=0.6)
            b.tunggu_kata("Bagaimana")
            b.main(FadeIn(hantu), FadeIn(lab_hantu), ShowCreation(busur_hantu), run_time=1.0)
            b.tunggu_kata("Tidak")
            b.main(Indicate(hantu, color=REDUP), Indicate(busur_hantu, color=REDUP, scale_factor=1.0),
                   run_time=1.0)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "segitiga": tri_P},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"koor": koor_P, "theta": lab_theta, "kI": lab_kI, "hantu": lab_hantu})

        # ============ contoh angka: P pada 40 derajat ==================== #
        n77 = rumus(r"0{,}77", 24, AKSEN2).next_to(tri_P[0], DOWN, buff=0.14)
        # 0,64 di DALAM segitiga: di kanan sisi tegaknya ia jatuh tepat di garis lingkaran
        n64 = rumus(r"0{,}64", 24, AKSEN).move_to([K_P[0] - 0.33, 0.42, 0])
        k1 = kerja(r"P = (\cos 40^\circ,\ \sin 40^\circ)", Y1)
        k2 = kerja(r"P = (0{,}77;\ 0{,}64)", Y2)
        with sinema.babak(self, "titikp", DURASI, kata=KATA) as b:
            b.tunggu_kata("titik")
            ident = sinema.identitas(self, "titik P pada 40 derajat")
            ident.set_opacity(0.0)
            b.main(FadeOut(lab_kI), FadeOut(koor_P), FadeIn(lab_P), ident.animate.set_opacity(1.0),
                   run_time=0.6)
            b.tunggu_kata("sudut")
            th40 = rumus(r"40^\circ", 24, SOROT).move_to(lab_theta)
            b.main(FadeOut(lab_theta), run_time=0.25)
            b.main(FadeIn(th40), Write(k1), run_time=0.8)
            lab_theta = th40
            b.tunggu_kata("Jarak")
            b.main(Indicate(tri_P[0], color=AKSEN2, scale_factor=1.0), run_time=0.9)
            b.tunggu_kata("nol")
            b.main(FadeIn(n77, shift=DOWN * 0.1), run_time=0.5)
            b.tunggu_kata("Tingginya")
            b.main(Indicate(tri_P[1], color=AKSEN, scale_factor=1.0), run_time=0.9)
            b.tunggu_kata("nol", ke=2)
            b.main(FadeIn(n64, shift=RIGHT * 0.1), run_time=0.5)
            b.main(Write(k2), run_time=0.8)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "segitiga": tri_P, "k1": k1, "k2": k2},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"P": lab_P, "theta": lab_theta, "n77": n77, "n64": n64,
                                   "hantu": lab_hantu, "x": lab_x, "y": lab_y})

        # ============ putar 90 derajat: segitiganya ikut ================= #
        tri_Q = tri_P.copy()
        titik_Q = titik_P.copy()
        C_Q = di_lingkaran(130)
        lab_Q = rumus("Q", 30, AKSEN).move_to(C_Q + np.array([-0.3, 0.26, 0]))
        busur_Q = busur_sudut(130, 0.62, AKSEN, tebal=3.0)
        # label 130 di ruang kosong antara sisi miring Q dan sumbu x negatif
        lab_130 = rumus(r"130^\circ", 26, AKSEN).move_to(PUSAT + rotate_vector(RIGHT * 1.15, np.radians(150)))
        k3 = kerja(r"40^\circ + 90^\circ = 130^\circ", Y3, ukuran=32, warna=AKSEN)
        with sinema.babak(self, "putar", DURASI, kata=KATA) as b:
            b.tunggu_kata("putar")
            b.main(FadeOut(hantu), FadeOut(lab_hantu), FadeOut(busur_hantu), run_time=0.4)
            self.add(tri_Q, titik_Q)
            b.main(Rotate(tri_Q, PI / 2, about_point=PUSAT), Rotate(titik_Q, PI / 2, about_point=PUSAT),
                   run_time=2.6, rate_func=smooth)
            b.tunggu_kata("Titik")
            b.main(FadeIn(lab_Q), Indicate(titik_Q, color=AKSEN), run_time=0.8)
            b.tunggu_kata("Sudutnya")
            b.main(ShowCreation(busur_Q), run_time=0.9)
            b.main(FadeIn(lab_130), run_time=0.4)
            b.tunggu_kata("yaitu")
            b.main(Write(k3), run_time=1.0)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "segitiga": tri_P, "segitiga Q": tri_Q,
                                 "k1": k1, "k2": k2, "k3": k3},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"P": lab_P, "Q": lab_Q, "theta": lab_theta, "n77": n77,
                                   "n64": n64, "130": lab_130, "x": lab_x, "y": lab_y})

        # ============ sisi bertukar peran ================================ #
        with sinema.babak(self, "segitiga", DURASI, kata=KATA) as b:
            b.tunggu_kata("Perhatikan")
            b.main(tri_P[3].animate.set_fill(SOROT, 0.35), run_time=0.5)
            b.main(tri_P[3].animate.set_fill(SOROT, 0.10), run_time=0.5)
            b.tunggu_kata("Segitiga", ke=2)
            b.main(tri_Q[3].animate.set_fill(SOROT, 0.35), run_time=0.5)
            b.main(tri_Q[3].animate.set_fill(SOROT, 0.10), run_time=0.5)
            b.tunggu_kata("Sisi")
            b.main(Indicate(tri_Q[0], color=AKSEN2, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("berdiri")
            b.main(Indicate(tri_Q[0], color=AKSEN2, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("sisi", ke=2)
            b.main(Indicate(tri_Q[1], color=AKSEN, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("rebah")
            b.main(Indicate(tri_Q[1], color=AKSEN, scale_factor=1.0), run_time=0.8)

        # ============ baca koordinat Q dari segitiga yang berputar ======= #
        # sisi biru kini tegak di sumbu y (tinggi Q = 0,77); sisi merah kini
        # mendatar ke kiri di ketinggian Q (jarak mendatar Q = 0,64)
        # keduanya di DALAM segitiga Q: di luar, 0,77 menindih busur dan -0,64
        # jatuh di garis lingkaran (480p pertama)
        q77 = rumus(r"0{,}77", 24, AKSEN2).move_to([PUSAT[0] - 0.42, 0.62, 0])
        q64 = rumus(r"0{,}64", 24, AKSEN).move_to([PUSAT[0] - 0.5, PUSAT[1] + R * np.cos(np.radians(SUDUT_P)) - 0.3, 0])
        q64neg = rumus(r"-0{,}64", 24, AKSEN).move_to(q64)
        k4 = kerja(r"Q = (-0{,}64;\ 0{,}77)", Y4, warna=AKSEN)
        with sinema.babak(self, "bacaq", DURASI, kata=KATA) as b:
            b.tunggu_kata("tinggi")
            b.main(FadeIn(q77, shift=LEFT * 0.1), Indicate(tri_Q[0], color=AKSEN2, scale_factor=1.0),
                   run_time=0.9)
            b.tunggu_kata("Dan")
            b.main(FadeIn(q64, shift=UP * 0.1), Indicate(tri_Q[1], color=AKSEN, scale_factor=1.0),
                   run_time=0.9)
            b.tunggu_kata("kiri")
            panah_kiri = Arrow(tri_Q[1].get_right() + UP * 0.55, tri_Q[1].get_left() + UP * 0.55,
                               buff=0, stroke_width=4).set_color(AKSEN)
            b.main(GrowArrow(panah_kiri), run_time=0.6)
            b.tunggu_kata("negatif")
            b.main(FadeOut(q64), FadeOut(panah_kiri), run_time=0.25)
            b.main(FadeIn(q64neg), run_time=0.4)
            q64 = q64neg
            b.main(Write(k4), run_time=0.8)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "segitiga": tri_P, "segitiga Q": tri_Q,
                                 "k1": k1, "k2": k2, "k3": k3, "k4": k4},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"P": lab_P, "Q": lab_Q, "theta": lab_theta, "n77": n77,
                                   "n64": n64, "q77": q77, "q64": q64, "130": lab_130,
                                   "x": lab_x, "y": lab_y})

        # ============ bentuk umum putaran: (-sin, cos) ke panel ========== #
        k_umum = kerja(r"Q = (-\sin\theta,\ \cos\theta)", Y4, warna=SOROT)
        with sinema.babak(self, "rumusputar", DURASI, kata=KATA) as b:
            b.tunggu_kata("koordinat")
            b.main(FadeOut(k3), k4.animate.move_to([X_KERJA, Y3, 0]), run_time=0.6)
            b.main(Write(k_umum), run_time=1.0)
            b.tunggu_kata("Artinya")
            r1 = sinema.lahir_rumus(
                self, r"\sin(\theta+90^\circ)=\cos\theta,\quad \cos(\theta+90^\circ)=-\sin\theta",
                titik_Q, papan, b=b, warna=SOROT, sebagai_utama=False, ukuran_lahir=44)
            b.tunggu_kata("dan")
            b.main(Indicate(r1, color=SOROT, scale_factor=1.0), run_time=1.0)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "segitiga": tri_P, "segitiga Q": tri_Q,
                                 "k1": k1, "k2": k2, "k4": k4, "umum": k_umum},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"P": lab_P, "Q": lab_Q, "theta": lab_theta, "n77": n77,
                                   "n64": n64, "q77": q77, "q64": q64, "130": lab_130,
                                   "x": lab_x, "y": lab_y})

        # ============ cara kedua: dicerminkan ke kiri, 180 - theta ======= #
        tri_C = tri_P.copy()
        titik_C = titik_P.copy()
        C_C = di_lingkaran(140)
        lab_QC = rumus("Q", 30, AKSEN).move_to(C_C + np.array([-0.3, 0.26, 0]))
        busur_C = busur_sudut(140, 0.85, AKSEN, tebal=3.0)
        lab_180m = rumus(r"180^\circ - \theta", 26, AKSEN).move_to(PUSAT + rotate_vector(RIGHT * 1.45, np.radians(118)))
        k_c = kerja(r"Q = (-\cos\theta,\ \sin\theta)", Y2, warna=SOROT)
        with sinema.babak(self, "cermin", DURASI, kata=KATA) as b:
            b.tunggu_kata("Cara")
            b.main(FadeOut(tri_Q), FadeOut(titik_Q), FadeOut(lab_Q), FadeOut(busur_Q), FadeOut(lab_130),
                   FadeOut(q77), FadeOut(q64), FadeOut(k1), FadeOut(k2), FadeOut(k4), FadeOut(k_umum),
                   run_time=0.7)
            b.tunggu_kata("cerminkan")
            self.add(tri_C, titik_C)
            b.main(Rotate(tri_C, TAU / 2, axis=UP, about_point=PUSAT),
                   Rotate(titik_C, TAU / 2, axis=UP, about_point=PUSAT), run_time=2.0, rate_func=smooth)
            b.tunggu_kata("Tingginya")
            b.main(Indicate(tri_C[1], color=AKSEN, scale_factor=1.0), run_time=0.9)
            b.tunggu_kata("jarak")
            b.main(Indicate(tri_C[0], color=AKSEN2, scale_factor=1.0), run_time=0.9)
            b.tunggu_kata("kiri")
            b.main(Write(k_c), FadeIn(lab_QC), run_time=0.9)
            b.tunggu_kata("Sudut")
            b.main(ShowCreation(busur_C), run_time=0.8)
            b.tunggu_kata("seratus")
            b.main(FadeIn(lab_180m), run_time=0.5)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "segitiga": tri_P, "segitiga C": tri_C, "k": k_c},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"P": lab_P, "Q": lab_QC, "theta": lab_theta, "n77": n77,
                                   "n64": n64, "180m": lab_180m, "x": lab_x, "y": lab_y})

        with sinema.babak(self, "rumuscermin", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jadi")
            r2 = sinema.lahir_rumus(
                self, r"\sin(180^\circ-\theta)=\sin\theta,\quad \cos(180^\circ-\theta)=-\cos\theta",
                titik_C, papan, b=b, warna=SOROT, sebagai_utama=False, ukuran_lahir=44)
            b.tunggu_kata("Cosinusnya")
            b.main(Indicate(tri_C[0], color=AKSEN2, scale_factor=1.0), run_time=0.9)
            b.tunggu_kata("cosinus")
            b.main(Indicate(r2, color=SOROT, scale_factor=1.0), run_time=1.0)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "segitiga": tri_P, "segitiga C": tri_C, "k": k_c},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"P": lab_P, "Q": lab_QC, "theta": lab_theta, "n77": n77,
                                   "n64": n64, "180m": lab_180m, "x": lab_x, "y": lab_y})

        # ============ cara ketiga: dibalik ke seberang, 180 + theta ====== #
        tri_B = tri_P.copy()
        titik_B = titik_P.copy()
        C_B = di_lingkaran(220)
        lab_QB = rumus("Q", 30, AKSEN).move_to(C_B + np.array([-0.3, -0.26, 0]))
        busur_B = busur_sudut(220, 0.85, AKSEN, tebal=3.0)
        lab_180p = rumus(r"180^\circ + \theta", 26, AKSEN).move_to(PUSAT + rotate_vector(RIGHT * 1.4, np.radians(120)))
        k_b = kerja(r"Q = (-\cos\theta,\ -\sin\theta)", Y2, warna=SOROT)
        with sinema.babak(self, "balik", DURASI, kata=KATA) as b:
            b.tunggu_kata("Cara")
            b.main(FadeOut(tri_C), FadeOut(titik_C), FadeOut(lab_QC), FadeOut(busur_C), FadeOut(lab_180m),
                   FadeOut(k_c), run_time=0.7)
            b.tunggu_kata("putar")
            self.add(tri_B, titik_B)
            b.main(Rotate(tri_B, PI, about_point=PUSAT), Rotate(titik_B, PI, about_point=PUSAT),
                   run_time=2.0, rate_func=smooth)
            b.tunggu_kata("Q")
            b.main(FadeIn(lab_QB), ShowCreation(busur_B), run_time=0.8)
            b.tunggu_kata("seberang")
            b.main(FadeIn(lab_180p), run_time=0.5)
            b.tunggu_kata("kedua")
            b.main(Indicate(tri_B[0], color=AKSEN2, scale_factor=1.0),
                   Indicate(tri_B[1], color=AKSEN, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("tanda")
            b.main(Write(k_b), run_time=0.9)
            b.tunggu_kata("Sinus")
            r3 = sinema.lahir_rumus(
                self, r"\sin(180^\circ+\theta)=-\sin\theta,\quad \cos(180^\circ+\theta)=-\cos\theta",
                titik_B, papan, b=b, warna=SOROT, sebagai_utama=False, ukuran_lahir=44)
            b.tunggu_kata("dan")
            b.main(Indicate(r3, color=SOROT, scale_factor=1.0), run_time=1.0)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "segitiga": tri_P, "segitiga B": tri_B, "k": k_b},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"P": lab_P, "Q": lab_QB, "theta": lab_theta, "n77": n77,
                                   "n64": n64, "180p": lab_180p, "x": lab_x, "y": lab_y})

        # ============ cara keempat: dicerminkan ke bawah, 360 - theta ==== #
        tri_D = tri_P.copy()
        titik_D = titik_P.copy()
        C_D = di_lingkaran(320)
        lab_QD = rumus("Q", 30, AKSEN).move_to(C_D + np.array([0.28, -0.26, 0]))
        busur_D = busur_sudut(320, 0.85, AKSEN, tebal=3.0)
        lab_360m = rumus(r"360^\circ - \theta", 26, AKSEN).move_to(PUSAT + rotate_vector(RIGHT * 1.35, np.radians(250)))
        k_d = kerja(r"Q = (\cos\theta,\ -\sin\theta)", Y2, warna=SOROT)
        with sinema.babak(self, "bawah", DURASI, kata=KATA) as b:
            b.tunggu_kata("Cara")
            b.main(FadeOut(tri_B), FadeOut(titik_B), FadeOut(lab_QB), FadeOut(busur_B), FadeOut(lab_180p),
                   FadeOut(k_b), run_time=0.7)
            b.tunggu_kata("cerminkan")
            self.add(tri_D, titik_D)
            b.main(Rotate(tri_D, TAU / 2, axis=RIGHT, about_point=PUSAT),
                   Rotate(titik_D, TAU / 2, axis=RIGHT, about_point=PUSAT), run_time=2.0, rate_func=smooth)
            b.tunggu_kata("Jarak")
            b.main(FadeIn(lab_QD), Indicate(tri_D[0], color=AKSEN2, scale_factor=1.0), run_time=0.9)
            b.tunggu_kata("tingginya")
            b.main(Indicate(tri_D[1], color=AKSEN, scale_factor=1.0), run_time=0.9)
            b.tunggu_kata("bawah", ke=2)
            b.main(Write(k_d), ShowCreation(busur_D), FadeIn(lab_360m), run_time=0.9)
            b.tunggu_kata("Sinus")
            r4 = sinema.lahir_rumus(
                self, r"\sin(360^\circ-\theta)=-\sin\theta,\quad \cos(360^\circ-\theta)=\cos\theta",
                titik_D, papan, b=b, warna=SOROT, sebagai_utama=False, ukuran_lahir=44)
            b.tunggu_kata("dan")
            b.main(Indicate(r4, color=SOROT, scale_factor=1.0), run_time=1.0)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "segitiga": tri_P, "segitiga D": tri_D, "k": k_d},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"P": lab_P, "Q": lab_QD, "theta": lab_theta, "n77": n77,
                                   "n64": n64, "360m": lab_360m, "x": lab_x, "y": lab_y})

        # ============ pola tanda per kuadran ============================= #
        # Angka romawi di dalam lingkaran (teks panjang di kuadran I menindih P
        # dan sisi miringnya pada 480p pertama); keterangan tandanya di ruang kerja.
        def label_kuadran(isi, derajat, jarak=1.45):
            return rumus(r"\mathrm{" + isi + "}", 26, SOROT).move_to(PUSAT + rotate_vector(RIGHT * jarak, np.radians(derajat)))

        kI = label_kuadran("I", 65, 1.55)
        kII = label_kuadran("II", 135)
        kIII = label_kuadran("III", 225)
        kIV = label_kuadran("IV", 315)
        tII = kerja(r"\text{kuadran II: hanya } \sin \text{ positif}", Y2, ukuran=30, warna=SOROT)
        tIII = kerja(r"\text{kuadran III: hanya } \tan \text{ positif}", Y3, ukuran=30, warna=SOROT)
        tIV = kerja(r"\text{kuadran IV: hanya } \cos \text{ positif}", Y4, ukuran=30, warna=SOROT)
        with sinema.babak(self, "pola", DURASI, kata=KATA) as b:
            b.tunggu_kata("Empat")
            b.main(FadeOut(tri_D), FadeOut(titik_D), FadeOut(lab_QD), FadeOut(busur_D), FadeOut(lab_360m),
                   FadeOut(k_d), run_time=0.7)
            b.tunggu_kata("Besarnya")
            b.main(Indicate(tri_P[0], color=AKSEN2, scale_factor=1.0),
                   Indicate(tri_P[1], color=AKSEN, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("kuadran")
            b.main(FadeIn(kI), run_time=0.6)
            b.tunggu_kata("kuadran", ke=3)
            b.main(FadeIn(kII), Write(tII), run_time=0.9)
            b.tunggu_kata("kuadran", ke=4)
            b.main(FadeIn(kIII), Write(tIII), run_time=0.9)
            b.tunggu_kata("kuadran", ke=5)
            b.main(FadeIn(kIV), Write(tIV), run_time=0.9)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "segitiga": tri_P,
                                 "tII": tII, "tIII": tIII, "tIV": tIV},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"P": lab_P, "theta": lab_theta, "n77": n77, "n64": n64,
                                   "kI": kI, "kII": kII, "kIII": kIII, "kIV": kIV,
                                   "x": lab_x, "y": lab_y})

        # ============ kapan sin dan cos bertukar ========================= #
        panah90 = Arc(radius=R + 0.35, start_angle=np.radians(SUDUT_P + 10), angle=np.radians(76),
                      arc_center=PUSAT).set_stroke(SOROT, 4)
        panah90.add_tip(width=0.22, length=0.22)
        panah180 = Arc(radius=R + 0.55, start_angle=np.radians(SUDUT_P + 10), angle=np.radians(166),
                       arc_center=PUSAT).set_stroke(AKSEN2, 4)
        panah180.add_tip(width=0.22, length=0.22)
        t90 = rumus(r"90^\circ", 24, SOROT).move_to(PUSAT + rotate_vector(RIGHT * (R + 0.75), np.radians(85)))
        t180 = rumus(r"180^\circ", 24, AKSEN2).move_to(PUSAT + rotate_vector(RIGHT * (R + 0.95), np.radians(150)))
        with sinema.babak(self, "tukar", DURASI, kata=KATA) as b:
            b.tunggu_kata("kapan")
            b.main(Indicate(tri_P[0], color=AKSEN2, scale_factor=1.0),
                   Indicate(tri_P[1], color=AKSEN, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("lewat")
            # label y disembunyikan: panah 90 derajat melintasi puncak sumbu y (480p kedua)
            b.main(ShowCreation(panah90), FadeIn(t90), FadeOut(lab_y), run_time=1.2)
            b.tunggu_kata("lewat", ke=2)
            b.main(ShowCreation(panah180), FadeIn(t180), run_time=1.6)
            b.tunggu_kata("keduanya")
            b.main(Indicate(panah180, color=AKSEN2, scale_factor=1.0), run_time=0.9)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "segitiga": tri_P, "p90": panah90, "p180": panah180},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"P": lab_P, "theta": lab_theta, "n77": n77, "n64": n64,
                                   "kI": kI, "kII": kII, "kIII": kIII, "kIV": kIV,
                                   "t90": t90, "t180": t180, "x": lab_x})

        # ============ sering keliru: (-cos, sin) bukan hasil putaran ===== #
        salah = kerja(r"(-\cos\theta,\ \sin\theta)", Y1, warna=AKSEN)
        coret = Line(salah.get_corner(DL) + DL * 0.1, salah.get_corner(UR) + UR * 0.1).set_stroke(AKSEN, 4)
        benar = kerja(r"(-\sin\theta,\ \cos\theta)", Y2, warna=SOROT)
        cek1 = kerja(r"\cos 130^\circ = -0{,}64", Y3, ukuran=32)
        # dua potongan berikut satu baris di bawah cek1 (dulu di kanan cek1 dan
        # keluar bingkai kanan, tangkapan qc pada render 480p pertama)
        cek2 = rumus(r"= -\sin 40^\circ", 32, TINTA)
        cek3 = rumus(r"\text{bukan } -0{,}77", 32, AKSEN)
        VGroup(cek2, cek3).arrange(RIGHT, buff=0.3).move_to([X_KERJA, Y4, 0])
        with sinema.babak(self, "keliru", DURASI, kata=KATA) as b:
            b.tunggu_kata("Yang")
            b.main(FadeOut(kI), FadeOut(kII), FadeOut(kIII), FadeOut(kIV), FadeOut(panah90),
                   FadeOut(panah180), FadeOut(t90), FadeOut(t180), FadeOut(tII), FadeOut(tIII),
                   FadeOut(tIV), FadeIn(lab_y), run_time=0.6)
            b.tunggu_kata("titik")
            b.main(FadeIn(tri_Q), FadeIn(titik_Q), FadeIn(lab_Q), FadeIn(q77), FadeIn(q64), run_time=0.8)
            b.tunggu_kata("ditulis")
            b.main(Write(salah), run_time=1.0)
            b.tunggu_kata("Itu")
            b.main(ShowCreation(coret), run_time=0.5)
            b.tunggu_kata("bukan")
            b.main(Write(benar), run_time=0.9)
            b.tunggu_kata("cosinus", ke=2)
            b.main(Write(cek1), run_time=1.0)
            b.tunggu_kata("negatif", ke=2)
            b.main(Indicate(q64, color=AKSEN), run_time=0.8)
            b.tunggu_kata("sama")
            b.main(Write(cek2), run_time=0.9)
            b.tunggu_kata("bukan", ke=2)
            b.main(Write(cek3), Indicate(q77, color=AKSEN2), run_time=1.0)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "segitiga": tri_P, "segitiga Q": tri_Q,
                                 "salah": VGroup(salah, coret), "benar": benar, "cek": VGroup(cek1, cek2),
                                 "cek3": cek3},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"P": lab_P, "Q": lab_Q, "theta": lab_theta, "n77": n77,
                                   "n64": n64, "q77": q77, "q64": q64, "x": lab_x, "y": lab_y})

        # ============ penutup ============================================ #
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tanda")
            b.main(FadeOut(salah), FadeOut(coret), FadeOut(cek1), FadeOut(cek2), FadeOut(cek3),
                   run_time=0.6)
            b.tunggu_kata("besarnya")
            b.main(Indicate(tri_P[0], color=AKSEN2, scale_factor=1.0),
                   Indicate(tri_P[1], color=AKSEN, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("Rumus")
            papan.sorot(SOROT, run_time=1.0)
            b.catat(1.0)
            b.tunggu_kata("lingkaran")
            b.main(Indicate(lingkaran, color=SOROT, scale_factor=1.0), run_time=1.0)

        lanjut = teks("Grafik Fungsi Trigonometri, Bagian 1", 30, SOROT)
        lanjut.move_to([X_KERJA, Y3, 0])
        sinema.batasi_lebar(lanjut, 4.6)
        titik_jalan = titik_P.copy()
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Grafik")
            b.main(FadeOut(benar), FadeIn(lanjut, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("berputar")
            self.add(titik_jalan)
            b.main(Rotate(titik_jalan, TAU, about_point=PUSAT), run_time=2.2, rate_func=linear)
            b.tunggu_kata("tingginya")
            b.main(Indicate(tri_P[1], color=AKSEN, scale_factor=1.0), run_time=0.9)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "segitiga": tri_P, "segitiga Q": tri_Q},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"P": lab_P, "Q": lab_Q, "theta": lab_theta, "n77": n77,
                                   "n64": n64, "q77": q77, "q64": q64, "lanjut": lanjut,
                                   "x": lab_x, "y": lab_y})

        sinema.laporkan_pemicu(self)
