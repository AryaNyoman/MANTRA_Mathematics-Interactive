"""Limit Trigonometri dan Kekontinuan, Bagian 1 (Materi 08): limit sinus jadi 1.
STANDAR VIDEO v3.1, ditulis ulang 12 Sep 2026 dari adegan Manim CE yang sudah
disetujui ARYA. ISINYA SAMA: sin x : x mentok 0 : 0; angka 0,1 dan 0,01 merapat
ke 1; jawabannya di lingkaran satuan: tiga daerah bersarang (segitiga dalam
setengah cos sin, juring setengah x, segitiga luar setengah tan); dibagi
setengah sin x jadi cos x < x : sin x < 1 : cos x; kedua penjepit menuju 1;
syarat radian; jadi tepat 1 karena perbandingan luas, bukan tebakan tabel.
Buktinya mengikuti buku Kemendikdasmen halaman 88 dan 89.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 1; segar-ingat dari Trigonometri
  (Lingkaran Satuan Bagian 2): ruas sin, cos, tan digambar di lingkaran yang
  sama, dengan warna yang sama dengan video Trigonometri.
- Urutan luas DICEK dengan angka di 0,5 radian (0,2104 < 0,25 < 0,2732), dan
  sudutnya benar-benar digerakkan: ketiga daerah hidup mengikuti sudut.
- Kalimat narasi tidak diulang sebagai teks; "derajat" tampil sebagai x
  derajat yang dicoret.
- Rumus lahir besar di fokus lalu terbang ke panel: lim sin x : x = 1.
- Tiap kejadian dipicu pada kata yang mengucapkannya.

WARNA: merah = sin dan segitiga dalam, biru = cos dan segitiga luar, ungu =
sudut, juring, dan sorot, tinta = tan.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "limit8-sinus"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

PUSAT = np.array([-3.9, -0.3, 0.0])
R = 2.1
X_RUMUS, X_NAMA, X_NILAI = 2.5, 4.45, 5.95   # kolom kanan: rumus luas, namanya, angkanya
Y_LUAS = [2.0, 1.35, 0.7]
SUDUT_PERAGA = 55.0     # pada 55 derajat ketiga luasnya kira-kira 1 : 2 : 3


def hud(ident, papan):
    isi = {"identitas": ident} if ident is not None else {}
    p = papan.semua()
    if p is not None:
        isi["papan"] = p
    return isi


def pita_atas(m, warna=SOROT):
    return SurroundingRectangle(m, buff=0.08).set_fill(warna, 0.18).set_stroke(width=0)


def arah(derajat):
    r = np.radians(derajat)
    return np.array([np.cos(r), np.sin(r), 0.0])


class LimitSinus(AdeganMatra):
    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        ident = None
        sud = ValueTracker(SUDUT_PERAGA)

        def P():
            return PUSAT + R * arah(sud.get_value())

        def Q():
            return np.array([P()[0], PUSAT[1], 0.0])

        def S():
            return PUSAT + RIGHT * R + UP * R * np.tan(np.radians(sud.get_value()))

        K = PUSAT + RIGHT * R

        # ============ buka ============================================== #
        soal = rumus(r"\lim_{x \to 0} \frac{\sin x}{x}", 52, TINTA).move_to([-1.2, 0.3, 0])
        satu = rumus("= 1", 52, SOROT).next_to(soal, RIGHT, buff=0.3)
        tanya = rumus("?", 64, AKSEN).next_to(satu, RIGHT, buff=0.5)
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Limit")
            sinema.judul_pembuka(self, "Limit Trigonometri dan Kekontinuan, Bagian 1", lama=3.8)
            b.catat(3.8)
            b.tunggu_kata("Kenapa")
            b.main(Write(soal), run_time=1.2)
            b.tunggu_kata("tepat")
            b.main(FadeIn(satu, scale=1.3), run_time=0.5)
            b.tunggu_kata("bukan")
            b.main(FadeIn(tanya, scale=1.4), run_time=0.5)
        qc.periksa_adegan(self, {"soal": soal}, hud=hud(ident, papan), tulisan={"satu": satu, "tanya": tanya})

        # ============ segar-ingat: sin, cos, tan di lingkaran satuan ===== #
        lingkaran = Circle(radius=R).move_to(PUSAT).set_stroke(TINTA, 2.6)
        sumbu = VGroup(Line(PUSAT + LEFT * (R + 0.3), PUSAT + RIGHT * (R + 0.6)),
                       Line(PUSAT + DOWN * (R * 0.55), PUSAT + UP * (R + 0.3))).set_stroke(REDUP, 1.8)
        sumbu.latar = True
        jari = always_redraw(lambda: Line(PUSAT, P()).set_stroke(TINTA, 3))
        ruas_sin = always_redraw(lambda: Line(Q(), P()).set_stroke(AKSEN, 5))
        ruas_cos = always_redraw(lambda: Line(PUSAT, Q()).set_stroke(AKSEN2, 5))
        ruas_tan = always_redraw(lambda: Line(K, S()).set_stroke(TINTA, 5))
        garis_singgung = Line(K + DOWN * 0.6, K + UP * (R * 1.5 + 0.2)).set_stroke(REDUP, 1.6)
        garis_singgung.latar = True
        lab_sin = rumus(r"\sin x", 28, AKSEN).next_to(Line(Q(), P()), RIGHT, buff=0.12)
        lab_cos = rumus(r"\cos x", 28, AKSEN2).next_to(Line(PUSAT, Q()), DOWN, buff=0.12)
        lab_tan = rumus(r"\tan x", 28, TINTA).next_to(Line(K, S()), RIGHT, buff=0.12)
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ingat")
            ident = sinema.identitas(self, "ingat Trigonometri")
            ident.set_opacity(0.0)
            b.main(FadeOut(soal), FadeOut(satu), FadeOut(tanya), ident.animate.set_opacity(1.0),
                   run_time=0.5)
            b.tunggu_kata("Lingkaran")
            b.main(ShowCreation(sumbu), ShowCreation(lingkaran), run_time=1.2)
            self.add(jari)
            b.tunggu_kata("sinus")
            self.add(ruas_sin)
            b.main(FadeIn(lab_sin), run_time=0.5)
            b.tunggu_kata("kosinus")
            self.add(ruas_cos)
            b.main(FadeIn(lab_cos), run_time=0.5)
            b.tunggu_kata("tangen")
            b.main(ShowCreation(garis_singgung), run_time=0.4)
            self.add(ruas_tan)
            b.main(FadeIn(lab_tan), run_time=0.5)
            b.tunggu_kata("Ketiganya")
            sorot = VGroup(Line(Q(), P()).set_stroke(AKSEN, 14, opacity=0.4),
                           Line(PUSAT, Q()).set_stroke(AKSEN2, 14, opacity=0.4),
                           Line(K, S()).set_stroke(SOROT, 14, opacity=0.4))
            b.main(ShowCreationThenFadeOut(sorot), run_time=1.2)
            self.remove(sorot)
        dunia = {"sumbu": sumbu, "singgung": garis_singgung}
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "jari": jari, "sin": ruas_sin, "cos": ruas_cos,
                                 "tan": ruas_tan},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"lab sin": lab_sin, "lab cos": lab_cos, "lab tan": lab_tan})

        # ============ dimasukkan langsung: 0 : 0 ========================= #
        subs = rumus(r"\frac{\sin 0}{0}", 44, TINTA).move_to([3.0, 0.9, 0])
        nol = rumus(r"= \frac{0}{0}", 44, AKSEN).next_to(subs, RIGHT, buff=0.25)
        with sinema.babak(self, "coba", DURASI, kata=KATA) as b:
            b.tunggu_kata("dimasukkan")
            b.main(FadeOut(ident), Write(subs), run_time=1.0)
            ident = None
            b.tunggu_kata("Bentuk")
            b.main(FadeIn(nol, shift=RIGHT * 0.15), run_time=0.6)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "subs": subs}, hud=hud(ident, papan), dunia=dunia,
                          tulisan={"lab sin": lab_sin, "lab cos": lab_cos, "lab tan": lab_tan, "nol": nol})

        # ============ dicoba dengan angka ================================ #
        def baris(i, kiri, kanan, warna=AKSEN):
            y = 1.6 - i * 0.65
            a = rumus(kiri, 30, TINTA).move_to([2.6, y, 0])
            c = rumus(kanan, 30, warna).move_to([4.9, y, 0])
            return VGroup(a, c)

        radian = sinema.label("radian", ukuran=26, warna=REDUP).move_to([3.7, 2.4, 0])
        r1 = baris(0, r"x = 0{,}1", r"0{,}9983")
        r2 = baris(1, r"x = 0{,}01", r"0{,}999983")
        r3 = baris(2, r"x \to 0", r"1\ ?", SOROT)
        with sinema.babak(self, "angka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dicoba")
            b.main(FadeOut(subs), FadeOut(nol), run_time=0.4)
            b.tunggu_kata("radian")
            b.main(FadeIn(radian, shift=UP * 0.1), run_time=0.5)
            b.tunggu_kata("Di")
            b.main(FadeIn(r1, shift=LEFT * 0.16), run_time=0.7)
            b.tunggu_kata("Di", ke=2)
            b.main(FadeIn(r2, shift=LEFT * 0.16), run_time=0.7)
        with sinema.babak(self, "tanya", DURASI, kata=KATA) as b:
            b.tunggu_kata("Merapat")
            b.main(FadeIn(r3, shift=LEFT * 0.16), run_time=0.7)
            b.tunggu_kata("tepat")
            b.main(Indicate(r3[1], color=SOROT, scale_factor=1.2), run_time=0.8)
        tabel = VGroup(r1, r2, r3)
        qc.periksa_adegan(self, {"lingkaran": lingkaran}, hud=hud(ident, papan), dunia=dunia,
                          tulisan={"lab sin": lab_sin, "lab cos": lab_cos, "lab tan": lab_tan,
                                   "radian": radian, "tabel": tabel})

        # ============ jawabannya di lingkaran satuan ===================== #
        busur = always_redraw(lambda: Arc(radius=0.55, start_angle=0,
                                          angle=max(np.radians(sud.get_value()), 1e-3),
                                          arc_center=PUSAT).set_stroke(SOROT, 4))
        # Saat sudutnya kecil, label x ditahan di atas sumbu (arah minimal 14
        # derajat) supaya tidak menindih ruas cos x.
        lab_x = always_redraw(lambda: rumus("x", 30, SOROT).move_to(
            PUSAT + 0.95 * arah(max(sud.get_value() / 2, 14.0))))
        lab_satu = rumus("1", 28, TINTA).move_to(PUSAT + 0.5 * R * arah(SUDUT_PERAGA) + 0.28 * arah(SUDUT_PERAGA + 90))
        with sinema.babak(self, "lingkaran", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jawabannya")
            b.main(FadeOut(tabel), FadeOut(radian), run_time=0.4)
            ident = sinema.identitas(self, "lingkaran satuan")
            ident.set_opacity(0.0)
            b.main(ident.animate.set_opacity(1.0), run_time=0.3)
            b.tunggu_kata("lingkaran", ke=2)
            sorot_ling = Circle(radius=R).move_to(PUSAT).set_stroke(SOROT, 14, opacity=0.35)
            b.main(ShowCreationThenFadeOut(sorot_ling), run_time=0.9)
            self.remove(sorot_ling)
            b.tunggu_kata("satu")
            b.main(FadeIn(lab_satu), run_time=0.5)
            b.tunggu_kata("sudut")
            b.main(FadeOut(lab_sin), FadeOut(lab_cos), FadeOut(lab_tan), run_time=0.3)
            b.main(ShowCreation(busur), FadeIn(lab_x), run_time=0.7)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "busur": busur}, hud=hud(ident, papan), dunia=dunia,
                          tulisan={"x": lab_x, "1": lab_satu})

        # ============ tiga daerah bersarang ============================== #
        # Yang paling kecil di lapisan paling ATAS: ditambahkan dulu yang luar,
        # lalu juring, lalu segitiga dalam, semuanya tembus pandang dulu.
        seg_luar = Polygon(PUSAT, K, S()).set_fill(AKSEN2, 0.0).set_stroke(AKSEN2, 2.5, opacity=0)
        juring = Sector(radius=R, angle=np.radians(SUDUT_PERAGA), arc_center=PUSAT
                        ).set_fill(SOROT, 0.0).set_stroke(SOROT, 2.5, opacity=0)
        seg_dalam = Polygon(PUSAT, Q(), P()).set_fill(AKSEN, 0.0).set_stroke(AKSEN, 2.5, opacity=0)
        self.add(seg_luar, juring, seg_dalam)
        self.remove(jari, ruas_sin, ruas_cos, ruas_tan, busur, lab_x)
        self.add(jari, ruas_sin, ruas_cos, ruas_tan, busur, lab_x)
        with sinema.babak(self, "tiga", DURASI, kata=KATA) as b:
            b.tunggu_kata("Segitiga")
            b.main(seg_dalam.animate.set_fill(AKSEN, 0.42).set_stroke(AKSEN, 2.5, opacity=1), run_time=0.8)
            b.tunggu_kata("juring")
            b.main(juring.animate.set_fill(SOROT, 0.26).set_stroke(SOROT, 2.5, opacity=1), run_time=0.8)
            b.tunggu_kata("segitiga", ke=2)
            b.main(seg_luar.animate.set_fill(AKSEN2, 0.14).set_stroke(AKSEN2, 2.5, opacity=1), run_time=0.8)
        daerah = VGroup(seg_luar, juring, seg_dalam)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "daerah": daerah}, hud=hud(ident, papan), dunia=dunia,
                          tulisan={"x": lab_x, "1": lab_satu})

        # ============ luas ketiganya ===================================== #
        luas_dalam = rumus(r"\tfrac{1}{2}\cos x\,\sin x", 32, AKSEN).move_to([X_RUMUS, Y_LUAS[0], 0])
        luas_juring = rumus(r"\tfrac{1}{2}\,x", 32, SOROT).move_to([X_RUMUS, Y_LUAS[1], 0])
        luas_luar = rumus(r"\tfrac{1}{2}\tan x", 32, AKSEN2).move_to([X_RUMUS, Y_LUAS[2], 0])
        nama_dalam = sinema.label("segitiga dalam", ukuran=22, warna=REDUP).move_to([X_NAMA, Y_LUAS[0], 0])
        nama_juring = sinema.label("juring", ukuran=22, warna=REDUP).move_to([X_NAMA, Y_LUAS[1], 0])
        nama_luar = sinema.label("segitiga luar", ukuran=22, warna=REDUP).move_to([X_NAMA, Y_LUAS[2], 0])
        with sinema.babak(self, "luas", DURASI, kata=KATA) as b:
            b.tunggu_kata("Luas")
            b.main(Write(luas_dalam), FadeIn(nama_dalam), run_time=1.2)
            b.tunggu_kata("Luas", ke=2)
            b.main(Write(luas_juring), FadeIn(nama_juring), run_time=1.0)
            b.tunggu_kata("jari-jarinya")
            sorot_jari = Line(PUSAT, P()).set_stroke(SOROT, 14, opacity=0.4)
            b.main(ShowCreationThenFadeOut(sorot_jari), run_time=1.0)
            self.remove(sorot_jari)
            b.tunggu_kata("luas", ke=3)
            b.main(Write(luas_luar), FadeIn(nama_luar), run_time=1.0)
        rumus_luas = VGroup(luas_dalam, luas_juring, luas_luar)
        nama_luas = VGroup(nama_dalam, nama_juring, nama_luar)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "daerah": daerah}, hud=hud(ident, papan), dunia=dunia,
                          tulisan={"x": lab_x, "1": lab_satu, "rumus luas": rumus_luas, "nama luas": nama_luas})

        # ============ cek dengan angka di 0,5 radian ===================== #
        # Daerah diganti versi HIDUP supaya sudutnya bisa digerakkan.
        seg_luar_h = always_redraw(lambda: Polygon(PUSAT, K, S()).set_fill(AKSEN2, 0.14).set_stroke(AKSEN2, 2.5))
        juring_h = always_redraw(lambda: Sector(radius=R, angle=max(np.radians(sud.get_value()), 1e-3),
                                                arc_center=PUSAT).set_fill(SOROT, 0.26).set_stroke(SOROT, 2.5))
        seg_dalam_h = always_redraw(lambda: Polygon(PUSAT, Q(), P()).set_fill(AKSEN, 0.42).set_stroke(AKSEN, 2.5))
        self.remove(seg_luar, juring, seg_dalam)
        self.add(seg_luar_h, juring_h, seg_dalam_h)
        self.remove(jari, ruas_sin, ruas_cos, ruas_tan, busur, lab_x)
        self.add(jari, ruas_sin, ruas_cos, ruas_tan, busur, lab_x)
        daerah_h = VGroup(seg_luar_h, juring_h, seg_dalam_h)
        n1 = rumus(r"= 0{,}2104", 30, AKSEN).move_to([X_NILAI, Y_LUAS[0], 0])
        n2 = rumus(r"= 0{,}25", 30, SOROT).move_to([X_NILAI, Y_LUAS[1], 0])
        n3 = rumus(r"= 0{,}2732", 30, AKSEN2).move_to([X_NILAI, Y_LUAS[2], 0])
        with sinema.babak(self, "cek", DURASI, kata=KATA) as b:
            b.tunggu_kata("sudut")
            b.main(sud.animate.set_value(np.degrees(0.5)), run_time=1.4, rate_func=smooth)
            b.tunggu_kata("Segitiga")
            b.main(FadeIn(n1, shift=RIGHT * 0.1), run_time=0.6)
            b.tunggu_kata("Juring")
            b.main(FadeIn(n2, shift=RIGHT * 0.1), run_time=0.6)
            b.tunggu_kata("Segitiga", ke=2)
            b.main(FadeIn(n3, shift=RIGHT * 0.1), run_time=0.6)
            b.tunggu_kata("Memang")
            pn = VGroup(pita_atas(n1), pita_atas(n2), pita_atas(n3))
            b.main(FadeIn(pn), run_time=0.4)
            b.main(FadeOut(pn), run_time=0.4)
        nilai = VGroup(n1, n2, n3)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "daerah": daerah_h}, hud=hud(ident, papan), dunia=dunia,
                          tulisan={"x": lab_x, "1": lab_satu, "rumus luas": rumus_luas, "nama luas": nama_luas,
                                   "nilai": nilai})

        # ============ urutan luasnya pasti naik ========================== #
        u1 = rumus(r"\tfrac{1}{2}\cos x\,\sin x", 30, AKSEN)
        u2 = rumus("<", 30, TINTA)
        u3 = rumus(r"\tfrac{1}{2}\,x", 30, SOROT)
        u4 = rumus("<", 30, TINTA)
        u5 = rumus(r"\tfrac{1}{2}\tan x", 30, AKSEN2)
        urut = VGroup(u1, u2, u3, u4, u5).arrange(RIGHT, buff=0.22).move_to([4.0, -0.3, 0])
        with sinema.babak(self, "urut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Karena")
            b.main(FadeOut(nilai), run_time=0.4)
            b.tunggu_kata("urutan")
            b.main(Write(urut), run_time=1.4)
            b.tunggu_kata("berapa")
            b.main(sud.animate.set_value(60), run_time=1.0, rate_func=smooth)
            b.main(sud.animate.set_value(20), run_time=1.1, rate_func=smooth)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "daerah": daerah_h}, hud=hud(ident, papan), dunia=dunia,
                          tulisan={"x": lab_x, "1": lab_satu, "rumus luas": rumus_luas, "nama luas": nama_luas,
                                   "urut": urut})

        # ============ bagi dengan setengah sin x ========================= #
        pembagi = rumus(r":\ \tfrac{1}{2}\sin x", 26, AKSEN).next_to(urut, DOWN, buff=0.2).shift(RIGHT * 1.6)
        j1 = rumus(r"\cos x", 38, AKSEN2)
        j2 = rumus("<", 38, TINTA)
        j3 = rumus(r"\frac{x}{\sin x}", 38, SOROT)
        j4 = rumus("<", 38, TINTA)
        j5 = rumus(r"\frac{1}{\cos x}", 38, AKSEN2)
        jepit = VGroup(j1, j2, j3, j4, j5).arrange(RIGHT, buff=0.28).move_to([4.0, -1.55, 0])
        with sinema.babak(self, "bagi", DURASI, kata=KATA) as b:
            b.tunggu_kata("setengah")
            b.main(FadeIn(pembagi, shift=UP * 0.1), run_time=0.5)
            b.tunggu_kata("rapi")
            b.main(FadeOut(rumus_luas), FadeOut(nama_luas), FadeOut(pembagi), run_time=0.3)
            # 0,9 detik (dulu 1,1): kata "Kosinus" datang lebih cepat pada narasi Bian (14 Sep 2026)
            b.main(Write(jepit), run_time=0.9)
            b.tunggu_kata("Kosinus")
            p1 = pita_atas(j1, AKSEN2)
            b.main(FadeIn(p1), run_time=0.3)
            b.main(FadeOut(p1), run_time=0.3)
            b.tunggu_kata("satu")
            p5 = pita_atas(j5, AKSEN2)
            b.main(FadeIn(p5), run_time=0.3)
            b.main(FadeOut(p5), run_time=0.3)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "daerah": daerah_h}, hud=hud(ident, papan), dunia=dunia,
                          tulisan={"x": lab_x, "1": lab_satu, "urut": urut, "jepit": jepit})

        # ============ dijepit: kecilkan sudutnya ========================= #
        ke1_kiri = rumus(r"\to 1", 26, SOROT).next_to(j1, DOWN, buff=0.25)
        ke1_kanan = rumus(r"\to 1", 26, SOROT).next_to(j5, DOWN, buff=0.25)
        ke1_tengah = rumus(r"\to 1", 26, SOROT).next_to(j3, DOWN, buff=0.25)
        kotak = SurroundingRectangle(j3, buff=0.12).set_stroke(SOROT, 2.5).set_fill(opacity=0)
        with sinema.babak(self, "jepit", DURASI, kata=KATA) as b:
            b.tunggu_kata("kecilkan")
            b.main(sud.animate.set_value(4), run_time=2.0, rate_func=smooth)
            b.tunggu_kata("menuju")
            b.main(FadeIn(ke1_kiri, shift=DOWN * 0.1), FadeIn(ke1_kanan, shift=DOWN * 0.1), run_time=0.6)
            b.tunggu_kata("terjepit")
            b.main(ShowCreation(kotak), run_time=0.7)
            b.tunggu_kata("ikut")
            b.main(FadeIn(ke1_tengah, shift=DOWN * 0.1), run_time=0.6)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "daerah": daerah_h, "kotak": kotak},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"x": lab_x, "1": lab_satu, "urut": urut, "jepit": jepit,
                                   "ke1": VGroup(ke1_kiri, ke1_kanan, ke1_tengah)})

        # ============ syarat radian ====================================== #
        derajat = rumus(r"\tfrac{1}{2}\,x^\circ", 34, AKSEN).move_to([4.0, -0.3, 0])
        coret_derajat = Line(derajat.get_corner(DL) + np.array([-0.06, -0.06, 0]),
                             derajat.get_corner(UR) + np.array([0.06, 0.06, 0])).set_stroke(AKSEN, 3)
        cap_radian = sinema.label("radian", ukuran=26, warna=SOROT).next_to(u3, UP, buff=0.3)
        with sinema.babak(self, "radian", DURASI, kata=KATA) as b:
            b.tunggu_kata("radian")
            b.main(FadeIn(cap_radian, shift=UP * 0.1), run_time=0.5)
            pu = pita_atas(u3)
            b.main(FadeIn(pu), run_time=0.3)
            b.main(FadeOut(pu), run_time=0.3)
            b.tunggu_kata("derajat")
            b.main(FadeOut(urut), run_time=0.3)
            b.main(FadeIn(derajat, shift=UP * 0.1), run_time=0.5)
            b.tunggu_kata("runtuh")
            b.main(ShowCreation(coret_derajat), run_time=0.5)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "daerah": daerah_h, "kotak": kotak,
                                 "coret": coret_derajat},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"x": lab_x, "1": lab_satu, "jepit": jepit, "derajat": derajat,
                                   "radian": cap_radian, "ke1": VGroup(ke1_kiri, ke1_kanan, ke1_tengah)})

        # ============ penutup: tepat 1 ==================================== #
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("tepat")
            b.main(FadeOut(derajat), FadeOut(coret_derajat), FadeOut(cap_radian), run_time=0.3)
            sinema.lahir_rumus(self, r"\lim_{x \to 0} \frac{\sin x}{x} = 1", jepit, papan, b=b, warna=SOROT,
                               sebagai_utama=False, geser=np.array([0.0, 1.9, 0.0]), tahan=0.5)
            b.tunggu_kata("perbandingan")
            b.main(sud.animate.set_value(SUDUT_PERAGA), run_time=1.6, rate_func=smooth)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "daerah": daerah_h, "kotak": kotak},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"x": lab_x, "1": lab_satu, "jepit": jepit,
                                   "ke1": VGroup(ke1_kiri, ke1_kanan, ke1_tengah)})

        # ============ menunjuk Bagian 2: grafik yang putus =============== #
        lanjut = VGroup(teks("Limit Trigonometri dan Kekontinuan,", 28, SOROT),
                        teks("Bagian 2", 28, SOROT)).arrange(DOWN, buff=0.12).move_to([4.0, 1.0, 0])
        sinema.batasi_lebar(lanjut, 5.2)
        putus = VGroup(Line([2.4, -1.5, 0], [3.6, -0.9, 0]), Line([4.1, -1.3, 0], [5.4, -0.6, 0])).set_stroke(AKSEN, 4)
        utuh = Line([2.4, -2.3, 0], [5.4, -1.7, 0]).set_stroke(SOROT, 4)
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi berikutnya")
            b.main(FadeOut(jepit), FadeOut(kotak), FadeOut(ke1_kiri), FadeOut(ke1_kanan), FadeOut(ke1_tengah),
                   run_time=0.4)
            b.tunggu_kata("Limit")
            b.main(FadeIn(lanjut, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("putus")
            b.main(ShowCreation(putus), run_time=0.8)
            b.tunggu_kata("tidak")
            b.main(ShowCreation(utuh), run_time=0.8)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "daerah": daerah_h, "putus": putus, "utuh": utuh},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"x": lab_x, "1": lab_satu, "lanjut": lanjut})

        sinema.laporkan_pemicu(self)
