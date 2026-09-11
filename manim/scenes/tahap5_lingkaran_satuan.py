"""Lingkaran Satuan dan Sudut Istimewa, Bagian 1 (Materi 05): lingkaran
satuan. STANDAR VIDEO v3.1, ditulis ulang 11 Sep 2026 dari adegan Manim CE
yang sudah disetujui ARYA. ISINYA SAMA: segitiga siku-siku diperkecil sampai
sisi miringnya 1, jejak titik ujungnya jadi lingkaran satuan, penyebut 1
dicoret sehingga cos = x dan sin = y, koordinat titik = (cos, sin), sudut
digeser dan koordinatnya ikut.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 1; segar-ingat dua rumus Bagian 4
  (cos = samping : miring, sin = depan : miring) disimpan di panel kanan atas.
- Contoh angka: segitiga 3-4-5 dari Bagian 4 diperkecil jadi (0,8, 0,6).
- Tiap kejadian dipicu pada kata yang mengucapkannya.
- Angka hidup (sudut) dirender LaTeX.

INTI YANG HARUS TERTANAM: penyebutnya hilang BUKAN karena disederhanakan
begitu saja, melainkan karena sisi miringnya memang dibuat 1. Babak
memperkecil harus terlihat.

WARNA: biru = samping = x = cos, merah = depan = y = sin, tinta = miring,
ungu = sudut dan sorotan.

ANGKANYA: 3-4-5 diperkecil 1/5: 4/5 = 0,8 = cos, 3/5 = 0,6 = sin; sudutnya
arctan(3/4) = 36,87 derajat.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "tahap5-lingkaran-satuan"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

PUSAT = np.array([-3.4, -0.2, 0.0])     # sudut theta = pusat lingkaran
R_AWAL = 2.8                             # sisi miring r sebelum diperkecil
R_SATU = 2.0                             # sisi miring = 1 di layar
SUDUT_AWAL = 35.0
SUDUT_345 = float(np.degrees(np.arctan(3 / 4)))

X_KERJA = 3.3
Y_COS, Y_SIN, Y_SIMPUL = 0.9, -0.4, -1.8


def hud(ident, papan):
    isi = {"identitas": ident} if ident is not None else {}
    p = papan.semua()
    if p is not None:
        isi["papan"] = p
    return isi


def siku_tanda(sudut_di, arah_a, arah_b, ukuran=0.28, warna=REDUP):
    p = np.array(sudut_di)
    na, nb = np.linalg.norm(arah_a), np.linalg.norm(arah_b)
    if na < 1e-6 or nb < 1e-6:
        return VGroup()
    u = np.array(arah_a) / na * ukuran
    v = np.array(arah_b) / nb * ukuran
    return VGroup(Line(p + u, p + u + v), Line(p + v, p + u + v)).set_stroke(warna, 2.4)


def pecahan(atas, bawah, ukuran=44, warna_atas=TINTA, warna_bawah=TINTA):
    a = rumus(atas, ukuran, warna_atas)
    b = rumus(bawah, ukuran, warna_bawah)
    lebar = max(a.get_width(), b.get_width()) + 0.3
    garis = Line(LEFT * lebar / 2, RIGHT * lebar / 2).set_stroke(TINTA, 3)
    a.next_to(garis, UP, buff=0.14)
    b.next_to(garis, DOWN, buff=0.14)
    return VGroup(a, b, garis)


class LingkaranSatuanLahir(AdeganMatra):
    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        ident = None

        theta = ValueTracker(SUDUT_AWAL)
        rad = ValueTracker(R_AWAL)

        def rd():
            return np.radians(theta.get_value())

        def C():
            return PUSAT + rad.get_value() * np.array([np.cos(rd()), np.sin(rd()), 0.0])

        def K():
            return np.array([C()[0], PUSAT[1], 0.0])

        samping = always_redraw(lambda: Line(PUSAT, K()).set_stroke(AKSEN2, 6))
        depan = always_redraw(lambda: Line(K(), C()).set_stroke(AKSEN, 6))
        miring = always_redraw(lambda: Line(PUSAT, C()).set_stroke(TINTA, 6))
        tanda = always_redraw(lambda: siku_tanda(K(), PUSAT - K(), C() - K()))
        busur = always_redraw(lambda: Arc(
            radius=0.5, start_angle=0, angle=float(np.clip(rd(), 0.02, TAU - 1e-3)),
            arc_center=PUSAT).set_stroke(SOROT, 4))
        titik = always_redraw(lambda: Dot(C(), radius=0.085).set_color(TINTA))
        lab_theta = rumus(r"\theta", 32, SOROT)
        lab_theta.add_updater(lambda m: m.move_to(PUSAT + rotate_vector(RIGHT * 0.9, rd() / 2)))
        segitiga = VGroup(samping, depan, miring, tanda, busur, titik)

        # Tiap label duduk di sisi LUAR segitiganya, di kuadran mana pun titiknya
        # berada. Dengan arah tetap (miring selalu "kiri", x selalu bawah,
        # y selalu kanan) label jatuh ke dalam segitiga begitu titiknya lewat
        # 90 atau 180 derajat (lembar kontak 480p, detik 126).
        def luar_miring():
            mid = (PUSAT + C()) / 2
            n = rotate_vector(UP, rd())
            if np.dot(n, K() - mid) > 0:
                n = -n
            return mid + n * 0.36

        def label_miring(isi, warna=TINTA):
            m = rumus(isi, 32, warna)
            m.add_updater(lambda o: o.move_to(luar_miring()))
            return m

        def label_x(isi):
            m = rumus(isi, 32, AKSEN2)
            m.add_updater(lambda o: o.next_to(
                Line(PUSAT, K()), DOWN if C()[1] >= PUSAT[1] else UP, buff=0.2))
            return m

        def label_y(isi):
            m = rumus(isi, 32, AKSEN)
            m.add_updater(lambda o: o.next_to(
                Line(K(), C()), RIGHT if C()[0] >= PUSAT[0] else LEFT, buff=0.3))
            return m

        lab_r = label_miring(r"\text{miring}")
        lab_x = label_x(r"\text{samping}")
        lab_y = label_y(r"\text{depan}")

        # ============ buka ============================================== #
        tanya = teks("Apa yang terjadi kalau sisi miring dibuat tepat 1?", 34, TINTA)
        tanya.move_to([0, -0.6, 0])
        sinema.batasi_lebar(tanya, 10.5)
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Lingkaran")
            sinema.judul_pembuka(self, "Lingkaran Satuan dan Sudut Istimewa, Bagian 1", lama=3.4)
            b.catat(3.4)
            b.tunggu_kata("Apa")
            b.main(Write(tanya), run_time=2.0)

        # ============ segar-ingat: dua rumus Bagian 4 ==================== #
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi sebelumnya")
            ident = sinema.identitas(self, "ingat Bagian 4")
            ident.set_opacity(0.0)
            b.main(FadeOut(tanya), ident.animate.set_opacity(1.0), run_time=0.5)
            b.tunggu_kata("Perbandingan")
            b.main(ShowCreation(samping), ShowCreation(depan), ShowCreation(miring),
                   run_time=1.0)
            b.main(ShowCreation(tanda), FadeIn(lab_x), FadeIn(lab_y), FadeIn(lab_r), run_time=0.6)
            b.tunggu_kata("Cosinus")
            papan.baris(r"\cos\theta = \text{samping} : \text{miring}", warna=AKSEN2, b=b)
            b.tunggu_kata("sinus")
            papan.baris(r"\sin\theta = \text{depan} : \text{miring}", warna=AKSEN, b=b)
        qc.periksa_adegan(self, {"segitiga": segitiga}, hud=hud(ident, papan),
                          tulisan={"miring": lab_r, "x": lab_x, "y": lab_y})

        # ============ segitiga yang sama, sudut theta, miring r ========== #
        with sinema.babak(self, "segitiga", DURASI, kata=KATA) as b:
            b.tunggu_kata("segitiga")
            b.main(Indicate(miring, color=TINTA, scale_factor=1.0),
                   Indicate(samping, color=AKSEN2, scale_factor=1.0),
                   Indicate(depan, color=AKSEN, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("theta")
            b.main(ShowCreation(busur), FadeIn(lab_theta), run_time=0.8)
            b.tunggu_kata("r")
            lab_r_baru = label_miring("r")
            b.main(FadeOut(lab_r), run_time=0.25)
            b.main(FadeIn(lab_r_baru), FadeIn(titik), run_time=0.4)
            lab_r = lab_r_baru
        qc.periksa_adegan(self, {"segitiga": segitiga}, hud=hud(ident, papan),
                          tulisan={"miring": lab_r, "x": lab_x, "y": lab_y, "theta": lab_theta})

        # ============ diperkecil sampai miringnya 1 ====================== #
        with sinema.babak(self, "kecilkan", DURASI, kata=KATA) as b:
            b.tunggu_kata("perkecil")
            b.main(rad.animate.set_value(R_SATU), run_time=2.3, rate_func=smooth)
            b.tunggu_kata("satu")
            lab_satu = label_miring("1")
            b.main(FadeOut(lab_r), run_time=0.25)
            b.main(FadeIn(lab_satu), run_time=0.4)
            b.main(Indicate(lab_satu, color=SOROT), run_time=0.8)
            lab_r = lab_satu
        qc.periksa_adegan(self, {"segitiga": segitiga}, hud=hud(ident, papan),
                          tulisan={"miring": lab_r, "x": lab_x, "y": lab_y, "theta": lab_theta})

        # ============ jejaknya lingkaran satuan ========================== #
        lingkaran = Circle(radius=R_SATU).move_to(PUSAT).set_stroke(TINTA, 3.2)
        lingkaran.rotate(np.radians(SUDUT_AWAL), about_point=PUSAT)
        sumbu = VGroup(
            Line(PUSAT + LEFT * R_SATU * 1.12, PUSAT + RIGHT * R_SATU * 1.12),
            Line(PUSAT + DOWN * R_SATU * 1.12, PUSAT + UP * R_SATU * 1.12),
        ).set_stroke(REDUP, 2)
        sumbu.latar = True
        with sinema.babak(self, "lingkaran", DURASI, kata=KATA) as b:
            b.tunggu_kata("putar")
            # Nama sisi disembunyikan selama titik menyapu: pada sudut dekat
            # 180 derajat segitiganya gepeng dan ketiga labelnya bertumpuk di
            # sumbu (lembar kontak 480p, detik 42).
            b.main(ShowCreation(sumbu), FadeOut(lab_x), FadeOut(lab_y), FadeOut(lab_r),
                   run_time=0.5)
            b.main(theta.animate.set_value(SUDUT_AWAL + 360), ShowCreation(lingkaran),
                   run_time=4.4, rate_func=linear)
            theta.set_value(SUDUT_AWAL)
            b.main(FadeIn(lab_x), FadeIn(lab_y), FadeIn(lab_r), run_time=0.4)
            b.tunggu_kata("lingkaran", ke=2)
            ident2 = sinema.identitas(self, "lingkaran satuan")
            ident2.set_opacity(0.0)
            b.main(FadeOut(ident), run_time=0.3)
            b.main(ident2.animate.set_opacity(1.0), run_time=0.3)
            ident = ident2
        qc.periksa_adegan(self, {"segitiga": segitiga, "lingkaran": lingkaran},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"miring": lab_r, "x": lab_x, "y": lab_y, "theta": lab_theta})

        # ============ cos theta = x : 1 ================================== #
        k_cos = rumus(r"\cos\theta =", 40, AKSEN2).move_to([X_KERJA - 1.3, Y_COS, 0])
        p_cos = pecahan("x", "1", warna_atas=AKSEN2)
        p_cos.next_to(k_cos, RIGHT, buff=0.3).match_y(k_cos)
        with sinema.babak(self, "bagi", DURASI, kata=KATA) as b:
            b.tunggu_kata("rumusnya")
            lab_x_baru, lab_y_baru = label_x("x"), label_y("y")
            b.main(FadeOut(lab_x), FadeOut(lab_y), run_time=0.25)
            b.main(FadeIn(lab_x_baru), FadeIn(lab_y_baru), run_time=0.4)
            lab_x, lab_y = lab_x_baru, lab_y_baru
            b.tunggu_kata("miringnya")
            b.main(Indicate(lab_r, color=SOROT), run_time=0.8)
            b.tunggu_kata("cosinus")
            b.main(Write(k_cos), run_time=0.8)
            b.tunggu_kata("x")
            b.main(FadeIn(p_cos[0], shift=DOWN * 0.15), ShowCreation(p_cos[2]), run_time=0.5)
            b.tunggu_kata("satu", ke=2)
            b.main(FadeIn(p_cos[1], shift=UP * 0.15), run_time=0.5)
        qc.periksa_adegan(self, {"segitiga": segitiga, "lingkaran": lingkaran,
                                 "k cos": k_cos, "p cos": p_cos},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"miring": lab_r, "x": lab_x, "y": lab_y, "theta": lab_theta})

        # ============ penyebut 1 dicoret ================================= #
        coret1 = Line(p_cos[1].get_corner(DL) + DL * 0.08, p_cos[1].get_corner(UR) + UR * 0.08
                      ).set_stroke(AKSEN, 4)
        x_saja = rumus("x", 40, AKSEN2).next_to(k_cos, RIGHT, buff=0.3).match_y(k_cos)
        with sinema.babak(self, "hilang", DURASI, kata=KATA) as b:
            b.tunggu_kata("dicoret")
            b.main(ShowCreation(coret1), run_time=0.6)
            b.tunggu_kata("tersisa")
            b.main(FadeOut(coret1), FadeOut(p_cos[1]), FadeOut(p_cos[2]),
                   ReplacementTransform(p_cos[0], x_saja), run_time=0.9)
            b.main(Indicate(x_saja, color=AKSEN2), run_time=0.7)
        r_cos = VGroup(k_cos, x_saja)

        # ============ sin theta = y : 1 = y ============================== #
        k_sin = rumus(r"\sin\theta =", 40, AKSEN).move_to([X_KERJA - 1.3, Y_SIN, 0])
        p_sin = pecahan("y", "1", warna_atas=AKSEN)
        p_sin.next_to(k_sin, RIGHT, buff=0.3).match_y(k_sin)
        coret2 = Line(p_sin[1].get_corner(DL) + DL * 0.08, p_sin[1].get_corner(UR) + UR * 0.08
                      ).set_stroke(AKSEN, 4)
        y_saja = rumus("y", 40, AKSEN).next_to(k_sin, RIGHT, buff=0.3).match_y(k_sin)
        with sinema.babak(self, "sinus", DURASI, kata=KATA) as b:
            b.tunggu_kata("sinus")
            b.main(Write(k_sin), run_time=0.7)
            b.tunggu_kata("y")
            b.main(FadeIn(p_sin[0], shift=DOWN * 0.15), ShowCreation(p_sin[2]), run_time=0.4)
            b.tunggu_kata("satu")
            b.main(FadeIn(p_sin[1], shift=UP * 0.15), run_time=0.4)
            b.tunggu_kata("berarti")
            b.main(ShowCreation(coret2), run_time=0.4)
            b.main(FadeOut(coret2), FadeOut(p_sin[1]), FadeOut(p_sin[2]),
                   ReplacementTransform(p_sin[0], y_saja), run_time=0.8)
        r_sin = VGroup(k_sin, y_saja)
        qc.periksa_adegan(self, {"segitiga": segitiga, "lingkaran": lingkaran,
                                 "cos": r_cos, "sin": r_sin},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"miring": lab_r, "x": lab_x, "y": lab_y, "theta": lab_theta})

        # ============ koordinat titik = (cos theta, sin theta) =========== #
        koor = rumus("(x, y)", 30, TINTA)
        koor.add_updater(lambda m: m.next_to(titik, UR, buff=0.12))
        simpul = rumus(r"(x, y) = (\cos\theta, \sin\theta)", 38, TINTA)
        simpul.move_to([X_KERJA, Y_SIMPUL, 0])
        kotak = SurroundingRectangle(simpul, buff=0.18).set_stroke(SOROT, 2.5)
        with sinema.babak(self, "koordinat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Koordinat")
            b.main(FadeIn(koor), Indicate(titik, color=SOROT), run_time=0.8)
            b.tunggu_kata("Koordinatnya")
            b.main(Write(simpul), run_time=1.6)
            b.tunggu_kata("sinus")
            b.main(ShowCreation(kotak), run_time=0.8)
            papan.baris(r"(x, y) = (\cos\theta, \sin\theta)", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"segitiga": segitiga, "lingkaran": lingkaran,
                                 "cos": r_cos, "sin": r_sin, "simpul": simpul, "kotak": kotak},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"miring": lab_r, "x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "koor": koor})

        # ============ contoh angka: 3-4-5 diperkecil jadi (0,8, 0,6) ===== #
        # Segitiga 3-4-5 digambar di ruang kerja kanan, lalu menyusut dan
        # pindah menempel ke segitiga satuan (sudutnya arctan 3/4).
        S = 0.5
        a345 = np.array([X_KERJA - 1.6, -1.4, 0.0])
        b345 = a345 + RIGHT * 4 * S
        c345 = b345 + UP * 3 * S
        tri = VGroup(Line(a345, b345).set_stroke(AKSEN2, 5), Line(b345, c345).set_stroke(AKSEN, 5),
                     Line(a345, c345).set_stroke(TINTA, 5))
        n3 = rumus("3", 30, AKSEN).next_to(tri[1], RIGHT, buff=0.15)
        n4 = rumus("4", 30, AKSEN2).next_to(tri[0], DOWN, buff=0.15)
        n5 = rumus("5", 30, TINTA).move_to((a345 + c345) / 2 + UP * 0.32 + LEFT * 0.2)
        with sinema.babak(self, "contoh", DURASI, kata=KATA) as b:
            b.tunggu_kata("Coba")
            b.main(FadeOut(r_cos), FadeOut(r_sin), FadeOut(simpul), FadeOut(kotak),
                   FadeOut(koor), run_time=0.5)
            b.tunggu_kata("segitiga")
            b.main(ShowCreation(tri), run_time=0.4)
            b.tunggu_kata("tiga")
            b.main(FadeIn(n3), run_time=0.4)
            b.tunggu_kata("empat")
            b.main(FadeIn(n4), run_time=0.4)
            b.tunggu_kata("lima")
            b.main(FadeIn(n5), run_time=0.4)
            b.tunggu_kata("diperkecil")
            # Segitiga satuan berputar ke sudut 3-4-5, dan segitiga contoh
            # menyusut lalu menempel ke atasnya (miring 5 jadi 1).
            faktor = R_SATU / (5 * S)
            tujuan_a = PUSAT
            b.main(theta.animate.set_value(SUDUT_345),
                   tri.animate.scale(faktor, about_point=a345).shift(tujuan_a - a345),
                   FadeOut(n3), FadeOut(n4), FadeOut(n5), run_time=1.6)
            b.main(FadeOut(tri), run_time=0.3)
            # Angkanya ditulis di ruang kerja, BUKAN ditempel ke sisi segitiga:
            # di sisi, "0,6" menindih garis lingkaran (kanan) atau label theta
            # (kiri) pada segitiga sekecil ini (lembar kontak 1080p, detik 103).
            b.tunggu_kata("nol")
            x08 = rumus(r"x = 0{,}8", 40, AKSEN2).move_to([X_KERJA - 1.4, Y_COS, 0])
            b.main(Write(x08), Indicate(lab_x, color=AKSEN2), run_time=0.9)
            b.tunggu_kata("nol", ke=2)
            y06 = rumus(r"y = 0{,}6", 40, AKSEN).next_to(x08, RIGHT, buff=0.9)
            b.main(Write(y06), Indicate(lab_y, color=AKSEN), run_time=0.9)
        qc.periksa_adegan(self, {"segitiga": segitiga, "lingkaran": lingkaran,
                                 "x08": x08, "y06": y06},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"miring": lab_r, "x": lab_x, "y": lab_y, "theta": lab_theta})

        koor2 = rumus("(0{,}8,\ 0{,}6)", 30, SOROT)
        koor2.add_updater(lambda m: m.next_to(titik, UR, buff=0.12))
        c08 = rumus(r"\cos\theta = 0{,}8", 40, AKSEN2).move_to([X_KERJA - 1.4, Y_SIN, 0])
        s06 = rumus(r"\sin\theta = 0{,}6", 40, AKSEN).next_to(c08, RIGHT, buff=0.9)
        with sinema.babak(self, "contoh_titik", DURASI, kata=KATA) as b:
            b.tunggu_kata("koordinat")
            b.main(FadeIn(koor2), Indicate(titik, color=SOROT), run_time=0.8)
            b.tunggu_kata("Cosinus")
            b.main(Write(c08), run_time=0.9)
            b.tunggu_kata("sinus")
            b.main(Write(s06), run_time=0.9)
            b.tunggu_kata("persis")
            b.main(Indicate(c08, color=AKSEN2), Indicate(s06, color=AKSEN), run_time=1.0)
        qc.periksa_adegan(self, {"segitiga": segitiga, "lingkaran": lingkaran,
                                 "c08": c08, "s06": s06},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"miring": lab_r, "x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "koor": koor2})

        # ============ sudut digeser: koordinatnya ikut ==================== #
        sudut_hidup = always_redraw(lambda: rumus(
            rf"\theta = {int(round(theta.get_value())) % 360}^\circ", 30, TINTA
        ).move_to([PUSAT[0], PUSAT[1] + R_SATU * 1.12 + 0.42, 0]))
        with sinema.babak(self, "putar", DURASI, kata=KATA) as b:
            b.tunggu_kata("Geser")
            b.main(FadeOut(koor2), FadeOut(c08), FadeOut(s06), FadeOut(x08), FadeOut(y06),
                   run_time=0.3)
            b.main(FadeIn(sudut_hidup), run_time=0.4)
            b.tunggu_kata("bergerak")
            b.main(theta.animate.set_value(118), run_time=2.0, rate_func=linear)
            b.tunggu_kata("Satu")
            b.main(theta.animate.set_value(232), run_time=1.9, rate_func=linear)
        qc.periksa_adegan(self, {"segitiga": segitiga, "lingkaran": lingkaran},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"miring": lab_r, "x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "sudut": sudut_hidup})

        # ============ penutup ============================================ #
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sinus")
            b.main(theta.animate.set_value(310), run_time=2.0, rate_func=linear)
            b.tunggu_kata("posisi")
            b.main(Indicate(titik, color=SOROT), run_time=0.8)
            b.tunggu_kata("berputar")
            b.main(theta.animate.set_value(SUDUT_AWAL + 360), run_time=1.5, rate_func=linear)

        lanjut = teks("Lingkaran Satuan dan Sudut Istimewa, Bagian 2", 30, SOROT)
        lanjut.move_to([X_KERJA, Y_SIN, 0])
        sinema.batasi_lebar(lanjut, 7.4)
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Lingkaran")
            b.main(FadeIn(lanjut, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("lingkaran", ke=2)
            b.main(Indicate(lingkaran, color=SOROT, scale_factor=1.0), run_time=1.0)
        qc.periksa_adegan(self, {"segitiga": segitiga, "lingkaran": lingkaran},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"miring": lab_r, "x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "sudut": sudut_hidup, "lanjut": lanjut})

        sinema.laporkan_pemicu(self)
