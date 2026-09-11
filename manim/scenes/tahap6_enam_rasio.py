"""Lingkaran Satuan dan Sudut Istimewa, Bagian 2 (Materi 06): enam rasio
sebagai panjang nyata. STANDAR VIDEO v3.1, ditulis ulang 11 Sep 2026 dari
adegan Manim CE yang sudah disetujui ARYA. ISINYA SAMA: dua garis singgung;
tan dan sec lahir di garis singgung tegak, cot dan csc di garis singgung
mendatar; enam ruas satu lingkaran; sudut digeser dan keenamnya ikut.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 2; segar-ingat cos = x dan sin = y
  dari Bagian 1 (lingkaran satuan dibangun lagi di depan mata).
- Keenam rumus disimpan di panel kanan atas, bukan kolom tersendiri.
- Contoh angka pada sudut segitiga 3-4-5: tan = 0,6 : 0,8 = 0,75 = 3 : 4.
- Tiap kejadian dipicu pada kata yang mengucapkannya; angka sudut LaTeX.

KENAPA SATU PER SATU DISOROT: ruas yang SEDANG dibahas ungu tebal, yang sudah
dibahas meredup, supaya enam ruas tidak berebut perhatian.

SUDUT DIBATASI 38 sampai 62 derajat saat digeser: di sudut kecil cot dan csc
meledak ke kiri, di sudut besar tan dan sec meledak ke atas. Sudut contoh
3-4-5 (36,87) masih aman: ujung cot di x = pusat + 1,33 R.

WARNA: biru = x, cos, sec; merah = y, sin, csc; tinta = tan, cot, jari-jari;
ungu = sudut dan sorotan.

ANGKANYA: 0,6 : 0,8 = 0,75 = 3 : 4; tan 55 = 1,428 (di dalam layar).
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "tahap6-enam-rasio"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

PUSAT = np.array([-4.0, -0.8, 0.0])   # dasar lingkaran -2,5, di atas jalur subtitle
R = 1.7
SUDUT = 55.0
SUDUT_345 = float(np.degrees(np.arctan(3 / 4)))
SUDUT_MIN, SUDUT_MAKS = 38.0, 62.0
TEBAL_SOROT, TEBAL_BIASA, TEBAL_REDUP = 7, 4.5, 3.0
X_KERJA, Y_KERJA = 3.3, -1.1


def hud(ident, papan):
    isi = {"identitas": ident} if ident is not None else {}
    p = papan.semua()
    if p is not None:
        isi["papan"] = p
    return isi


class EnamRasioNyata(AdeganMatra):
    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        ident = None
        theta = ValueTracker(SUDUT)

        def rd():
            return np.radians(theta.get_value())

        def P():
            return PUSAT + R * np.array([np.cos(rd()), np.sin(rd()), 0.0])

        def K():
            return np.array([P()[0], PUSAT[1], 0.0])

        def T():   # potong jari-jari diperpanjang dengan garis singgung tegak
            return PUSAT + R * np.array([1.0, np.tan(rd()), 0.0])

        def Cc():  # potong jari-jari diperpanjang dengan garis singgung mendatar
            return PUSAT + R * np.array([1.0 / np.tan(rd()), 1.0, 0.0])

        kanan = PUSAT + RIGHT * R
        atas = PUSAT + UP * R

        lingkaran = Circle(radius=R).move_to(PUSAT).set_stroke(TINTA, 3.2)
        sumbu = VGroup(Line(PUSAT + LEFT * R * 1.25, PUSAT + RIGHT * R * 1.9),
                       Line(PUSAT + DOWN * R * 1.0, PUSAT + UP * R * 2.3)).set_stroke(REDUP, 2)
        sumbu.latar = True
        jari_inti = always_redraw(lambda: Line(PUSAT, P()).set_stroke(TINTA, 5))
        ruas_x = always_redraw(lambda: Line(PUSAT, K()).set_stroke(AKSEN2, 5))
        ruas_y = always_redraw(lambda: Line(K(), P()).set_stroke(AKSEN, 5))
        busur = always_redraw(lambda: Arc(radius=0.42, start_angle=0, angle=rd(),
                                          arc_center=PUSAT).set_stroke(SOROT, 4))
        titik = always_redraw(lambda: Dot(P(), radius=0.07).set_color(TINTA))
        lab_theta = rumus(r"\theta", 30, SOROT)
        lab_theta.add_updater(lambda m: m.move_to(PUSAT + rotate_vector(RIGHT * 0.78, rd() / 2)))
        jari = always_redraw(lambda: Line(PUSAT, PUSAT + rotate_vector(RIGHT * R * 3.1, rd())
                                          ).set_stroke(REDUP, 2))
        dasar = VGroup(lingkaran, jari_inti, ruas_x, ruas_y, busur, titik)

        def label_x(isi):
            m = rumus(isi, 30, AKSEN2)
            m.add_updater(lambda o: o.next_to(Line(PUSAT, K()), DOWN, buff=0.16))
            return m

        def label_y(isi):
            # Di kanan ruas y, kecuali saat titiknya sudah dekat garis singgung
            # tegak (x > 0,7 R): di situ label kanan menabrak garis singgung
            # dan label tan (lembar kontak 480p, detik 100), jadi pindah ke kiri.
            m = rumus(isi, 30, AKSEN)
            m.add_updater(lambda o: o.next_to(
                Line(K(), P()), LEFT if (K()[0] - PUSAT[0]) > 0.7 * R else RIGHT, buff=0.18))
            return m

        lab_x, lab_y = label_x("x"), label_y("y")

        # ============ buka ============================================== #
        tanya = teks("Bisakah keempatnya ditunjuk sebagai panjang ruas garis?", 34, TINTA)
        tanya.move_to([0, -1.0, 0])
        sinema.batasi_lebar(tanya, 10.5)
        # Enam nama dari Bagian 4 tampil saat disebut, supaya layar tidak kosong
        # lima detik antara judul dan pertanyaan (cek_layar_kosong, 480p).
        dua_nama = rumus(r"\sin\theta,\ \cos\theta", 40, TINTA).move_to([0, 0.9, 0])
        empat_nama = rumus(r"\tan\theta,\ \cot\theta,\ \sec\theta,\ \csc\theta", 40, SOROT)
        empat_nama.move_to([0, 0.1, 0])
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Lingkaran")
            sinema.judul_pembuka(self, "Lingkaran Satuan dan Sudut Istimewa, Bagian 2", lama=3.4)
            b.catat(3.4)
            b.tunggu_kata("Selain")
            b.main(FadeIn(dua_nama, shift=UP * 0.15), run_time=0.7)
            b.tunggu_kata("empat")
            b.main(FadeIn(empat_nama, shift=UP * 0.15), run_time=0.8)
            b.tunggu_kata("Bisakah")
            b.main(Write(tanya), run_time=2.0)

        # ============ segar-ingat: lingkaran satuan, cos = x, sin = y ==== #
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi sebelumnya")
            ident = sinema.identitas(self, "ingat Bagian 1")
            ident.set_opacity(0.0)
            b.main(FadeOut(tanya), FadeOut(dua_nama), FadeOut(empat_nama),
                   ident.animate.set_opacity(1.0), run_time=0.5)
            b.tunggu_kata("Lingkaran")
            b.main(ShowCreation(sumbu), run_time=0.6)
            b.tunggu_kata("miring")
            b.main(ShowCreation(jari_inti), ShowCreation(busur), FadeIn(lab_theta), FadeIn(titik),
                   run_time=0.9)
            b.tunggu_kata("jejak")
            b.main(ShowCreation(lingkaran), run_time=1.6)
            b.tunggu_kata("cosinus")
            b.main(ShowCreation(ruas_x), FadeIn(lab_x), run_time=0.6)
            papan.baris(r"\cos\theta = x", warna=AKSEN2, b=b)
            b.tunggu_kata("sinus")
            b.main(ShowCreation(ruas_y), FadeIn(lab_y), run_time=0.5)
            papan.baris(r"\sin\theta = y", warna=AKSEN, b=b)
        qc.periksa_adegan(self, {"dasar": dasar}, hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta})

        # ============ garis singgung tegak =============================== #
        sing_tegak = Line(kanan + DOWN * 0.55, kanan + UP * R * 1.85).set_stroke(REDUP, 2.5)
        cap_singgung = sinema.label("garis singgung", warna=REDUP)
        cap_singgung.next_to(sing_tegak.get_end(), UR, buff=0.12)
        with sinema.babak(self, "singgung", DURASI, kata=KATA) as b:
            b.tunggu_kata("tarik")
            ident2 = sinema.identitas(self, "dua garis singgung")
            ident2.set_opacity(0.0)
            b.main(FadeOut(ident), run_time=0.3)
            b.main(ident2.animate.set_opacity(1.0), run_time=0.3)
            ident = ident2
            b.tunggu_kata("tegak")
            b.main(ShowCreation(sing_tegak), run_time=1.2)
            b.tunggu_kata("disebut")
            b.main(FadeIn(cap_singgung, shift=UP * 0.12), run_time=0.7)
        qc.periksa_adegan(self, {"dasar": dasar, "singgung": sing_tegak},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "cap": cap_singgung})

        # ============ tan: dari sumbu mendatar ke titik potong =========== #
        ruas_tan = Line(kanan, T()).set_stroke(SOROT, TEBAL_SOROT)
        lab_tan = rumus(r"\tan\theta", 30, TINTA).next_to(ruas_tan, RIGHT, buff=0.16)
        with sinema.babak(self, "tan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Perpanjang")
            b.main(ShowCreation(jari), run_time=1.2)
            b.tunggu_kata("Ruas")
            b.main(ShowCreation(ruas_tan), run_time=1.0)
            b.tunggu_kata("tangen")
            b.main(FadeIn(lab_tan, shift=RIGHT * 0.12), run_time=0.6)
            b.tunggu_kata("yaitu")
            papan.baris(r"\tan\theta = \frac{y}{x}", warna=TINTA, b=b)
        qc.periksa_adegan(self, {"dasar": dasar, "singgung": sing_tegak, "tan": ruas_tan},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "cap": cap_singgung, "lab tan": lab_tan})

        # ============ sec: dari pusat ke titik potong yang sama ========== #
        ruas_sec = Line(PUSAT, T()).set_stroke(SOROT, TEBAL_SOROT)
        with sinema.babak(self, "sec", DURASI, kata=KATA) as b:
            b.tunggu_kata("ruas")
            b.main(ruas_tan.animate.set_stroke(REDUP, TEBAL_REDUP),
                   lab_tan.animate.set_opacity(0.45), run_time=0.5)
            b.main(ShowCreation(ruas_sec), run_time=1.0)
            b.tunggu_kata("yaitu")
            papan.baris(r"\sec\theta = \frac{1}{x}", warna=AKSEN2, b=b)
        qc.periksa_adegan(self, {"dasar": dasar, "sec": ruas_sec}, hud=hud(ident, papan),
                          dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "cap": cap_singgung, "lab tan": lab_tan})

        # ============ garis singgung mendatar ============================ #
        sing_datar = Line(atas + LEFT * 1.5, atas + RIGHT * R * 1.4).set_stroke(REDUP, 2.5)
        with sinema.babak(self, "singgung2", DURASI, kata=KATA) as b:
            b.tunggu_kata("tarik")
            b.main(ruas_sec.animate.set_stroke(REDUP, TEBAL_REDUP), run_time=0.5)
            b.tunggu_kata("mendatar")
            b.main(ShowCreation(sing_datar), run_time=1.2)
            b.tunggu_kata("atas")
            b.main(Indicate(Dot(atas, radius=0.001), color=SOROT), run_time=0.01)
        qc.periksa_adegan(self, {"dasar": dasar, "singgung datar": sing_datar},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "cap": cap_singgung, "lab tan": lab_tan})

        # ============ cot: dari sumbu tegak ke titik potong ============== #
        ruas_cot = Line(atas, Cc()).set_stroke(SOROT, TEBAL_SOROT)
        lab_cot = rumus(r"\cot\theta", 30, TINTA).next_to(ruas_cot, UP, buff=0.16)
        with sinema.babak(self, "cot", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ruas")
            b.main(ShowCreation(ruas_cot), run_time=1.0)
            b.tunggu_kata("kotangen")
            b.main(FadeIn(lab_cot, shift=UP * 0.12), run_time=0.6)
            b.tunggu_kata("yaitu")
            papan.baris(r"\cot\theta = \frac{x}{y}", warna=TINTA, b=b)
        qc.periksa_adegan(self, {"dasar": dasar, "cot": ruas_cot}, hud=hud(ident, papan),
                          dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "cap": cap_singgung, "lab tan": lab_tan, "lab cot": lab_cot})

        # ============ csc: dari pusat ke titik potong itu ================= #
        ruas_csc = Line(PUSAT, Cc()).set_stroke(SOROT, TEBAL_SOROT)
        with sinema.babak(self, "csc", DURASI, kata=KATA) as b:
            b.tunggu_kata("ruas")
            b.main(ruas_cot.animate.set_stroke(REDUP, TEBAL_REDUP),
                   lab_cot.animate.set_opacity(0.45), run_time=0.4)
            b.main(ShowCreation(ruas_csc), run_time=0.9)
            b.tunggu_kata("yaitu")
            papan.baris(r"\csc\theta = \frac{1}{y}", warna=AKSEN, b=b)
        qc.periksa_adegan(self, {"dasar": dasar, "csc": ruas_csc}, hud=hud(ident, papan),
                          dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "cap": cap_singgung, "lab tan": lab_tan, "lab cot": lab_cot})

        # ============ enam ruas, enam nama =============================== #
        kotak = SurroundingRectangle(papan.isi(), buff=0.18).set_stroke(SOROT, 2.2)
        kotak.fix_in_frame()
        with sinema.babak(self, "enam", DURASI, kata=KATA) as b:
            b.tunggu_kata("Enam")
            b.main(ruas_tan.animate.set_stroke(TINTA, TEBAL_BIASA),
                   ruas_sec.animate.set_stroke(AKSEN2, TEBAL_BIASA),
                   ruas_cot.animate.set_stroke(TINTA, TEBAL_BIASA),
                   ruas_csc.animate.set_stroke(AKSEN, TEBAL_BIASA),
                   lab_tan.animate.set_opacity(1.0), lab_cot.animate.set_opacity(1.0),
                   run_time=1.0)
            b.tunggu_kata("nama")
            b.main(ShowCreation(kotak), run_time=0.9)
            b.tunggu_kata("lingkaran")
            b.main(Indicate(lingkaran, color=SOROT, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("sudut")
            b.main(Indicate(busur, color=SOROT, scale_factor=1.0), run_time=0.8)
        semua_ruas = VGroup(ruas_tan, ruas_sec, ruas_cot, ruas_csc)
        qc.periksa_adegan(self, {"dasar": dasar, "ruas": semua_ruas}, hud=hud(ident, papan),
                          dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "cap": cap_singgung, "lab tan": lab_tan, "lab cot": lab_cot})

        # ============ contoh angka: sudut segitiga 3-4-5 ================= #
        # Ruas statis diganti ruas hidup dengan bentuk yang persis sama,
        # supaya keenamnya ikut saat sudutnya berubah.
        hidup = VGroup(
            always_redraw(lambda: Line(kanan, T()).set_stroke(TINTA, TEBAL_BIASA)),
            always_redraw(lambda: Line(PUSAT, T()).set_stroke(AKSEN2, TEBAL_BIASA)),
            always_redraw(lambda: Line(atas, Cc()).set_stroke(TINTA, TEBAL_BIASA)),
            always_redraw(lambda: Line(PUSAT, Cc()).set_stroke(AKSEN, TEBAL_BIASA)),
        )
        lab_tan_hidup = rumus(r"\tan\theta", 30, TINTA)
        lab_tan_hidup.add_updater(lambda m: m.next_to(Line(kanan, T()), RIGHT, buff=0.16))
        lab_cot_hidup = rumus(r"\cot\theta", 30, TINTA)
        lab_cot_hidup.add_updater(lambda m: m.next_to(Line(atas, Cc()), UP, buff=0.16))
        k1 = rumus(r"\tan\theta =", 38, TINTA).move_to([X_KERJA - 1.5, Y_KERJA, 0])
        k2 = rumus(r"0{,}6 : 0{,}8", 38, TINTA).next_to(k1, RIGHT, buff=0.25)
        k3 = rumus(r"= 0{,}75", 38, SOROT).next_to(k2, RIGHT, buff=0.25)
        with sinema.babak(self, "contoh", DURASI, kata=KATA) as b:
            b.tunggu_kata("Coba")
            self.remove(ruas_tan, ruas_sec, ruas_cot, ruas_csc, lab_tan, lab_cot)
            self.add(hidup, lab_tan_hidup, lab_cot_hidup)
            b.main(FadeOut(kotak), FadeOut(cap_singgung), run_time=0.4)
            b.tunggu_kata("segitiga")
            b.main(theta.animate.set_value(SUDUT_345), run_time=1.2, rate_func=smooth)
            # Angkanya ditulis di ruang kerja, bukan ditempel ke sisi: pada
            # segitiga sekecil ini "0,6" menabrak garis singgung, label tan,
            # atau label theta di mana pun ia ditaruh (lembar kontak 480p).
            b.tunggu_kata("x")
            x08 = rumus(r"x = 0{,}8", 36, AKSEN2).move_to([X_KERJA - 1.3, Y_KERJA + 1.3, 0])
            b.main(Write(x08), Indicate(lab_x, color=AKSEN2), run_time=0.8)
            b.tunggu_kata("y")
            y06 = rumus(r"y = 0{,}6", 36, AKSEN).next_to(x08, RIGHT, buff=0.8)
            b.main(Write(y06), Indicate(lab_y, color=AKSEN), run_time=0.8)
            b.tunggu_kata("tangen")
            b.main(Write(k1), run_time=0.7)
            b.tunggu_kata("nol", ke=3)
            b.main(Write(k2), run_time=1.4)
            b.tunggu_kata("yaitu")
            b.main(Write(k3), run_time=0.8)
        qc.periksa_adegan(self, {"dasar": dasar, "ruas": hidup, "k1": k1, "k2": k2, "k3": k3,
                                 "x08": x08, "y06": y06},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "lab tan": lab_tan_hidup, "lab cot": lab_cot_hidup})

        k4 = rumus(r"= \text{depan} : \text{samping} = 3 : 4", 34, TINTA)
        k4.next_to(k1, DOWN, buff=0.45).align_to(k2, LEFT)
        # Menggantikan label "tan theta" di kanan ruasnya (di kiri ruas ia
        # menabrak label 0,6; qc menolak).
        lab_075 = rumus(r"0{,}75", 28, SOROT)
        lab_075.add_updater(lambda m: m.next_to(Line(kanan, T()), RIGHT, buff=0.16))
        with sinema.babak(self, "contoh_cocok", DURASI, kata=KATA) as b:
            b.tunggu_kata("Persis")
            b.main(Write(k4), run_time=1.6)
            b.tunggu_kata("Ruas")
            b.main(Indicate(hidup[0], color=SOROT, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("nol")
            b.main(FadeOut(lab_tan_hidup), run_time=0.2)
            b.main(FadeIn(lab_075), run_time=0.4)
        qc.periksa_adegan(self, {"dasar": dasar, "ruas": hidup, "k1": k1, "k2": k2, "k3": k3,
                                 "k4": k4},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "lab cot": lab_cot_hidup, "0,75": lab_075})

        # ============ sudut digeser: keenamnya ikut ====================== #
        sudut_hidup = always_redraw(lambda: rumus(
            rf"\theta = {int(round(theta.get_value()))}^\circ", 30, TINTA
        ).move_to([PUSAT[0] + 1.1, PUSAT[1] + R * 2.3 + 0.35, 0]))   # kanan sumbu tegak, jauh dari identitas
        with sinema.babak(self, "putar", DURASI, kata=KATA) as b:
            b.tunggu_kata("Geser")
            b.main(FadeOut(k1), FadeOut(k2), FadeOut(k3), FadeOut(k4), FadeOut(lab_075),
                   FadeOut(x08), FadeOut(y06), run_time=0.3)
            b.main(FadeIn(sudut_hidup), FadeIn(lab_tan_hidup), run_time=0.4)
            b.tunggu_kata("berubah")
            b.main(theta.animate.set_value(SUDUT_MAKS), run_time=2.0, rate_func=smooth)
            b.tunggu_kata("memanjang")
            b.main(theta.animate.set_value(SUDUT_MIN), run_time=2.6, rate_func=smooth)
        qc.periksa_adegan(self, {"dasar": dasar, "ruas": hidup}, hud=hud(ident, papan),
                          dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "lab tan": lab_tan_hidup, "lab cot": lab_cot_hidup,
                                   "sudut": sudut_hidup})

        # ============ penutup ============================================ #
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("sekan")
            b.main(theta.animate.set_value(SUDUT), run_time=1.6, rate_func=smooth)
            b.tunggu_kata("tunjuk")
            b.main(Indicate(hidup[1], color=SOROT, scale_factor=1.0),
                   Indicate(hidup[3], color=SOROT, scale_factor=1.0), run_time=1.2)

        lanjut = teks("Lingkaran Satuan dan Sudut Istimewa, Bagian 3", 30, SOROT)
        lanjut.move_to([X_KERJA, Y_KERJA, 0])
        sinema.batasi_lebar(lanjut, 7.4)
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Lingkaran")
            b.main(FadeIn(lanjut, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("persis")
            b.main(papan.sorot(), run_time=1.0)
        qc.periksa_adegan(self, {"dasar": dasar, "ruas": hidup}, hud=hud(ident, papan),
                          dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "lab tan": lab_tan_hidup, "lab cot": lab_cot_hidup,
                                   "sudut": sudut_hidup, "lanjut": lanjut})

        sinema.laporkan_pemicu(self)
