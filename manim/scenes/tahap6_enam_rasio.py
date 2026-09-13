"""Lingkaran Satuan dan Sudut Istimewa, Bagian 2 (Materi 06): enam rasio
sebagai panjang nyata. STANDAR VIDEO v3.1, ditulis ulang 11 Sep 2026 dari
adegan Manim CE yang sudah disetujui ARYA; DIPERDALAM 13 Sep 2026 atas revisi
ARYA ("tidak dijelaskan kenapa tiba-tiba sec = 1/x, cot = x/y; titik x = 1
dan y = 1 tidak ada di video; beri segar-ingat dari A4").

ISI SEKARANG
- Segar-ingat A4: segitiga siku-siku dengan tiga nama sisi, enam pembagian
  ditulis (sin, cos, tan dan kebalikannya csc, sec, cot).
- Segar-ingat B1: lingkaran satuan, cos = x, sin = y.
- Titik x = 1 DITANDAI, garis singgung tegak; jari-jari diperpanjang; DUA
  SEGITIGA SEBANGUN diwarnai: kecil (miring 1) dan besar (samping 1). Dari
  segitiga besar lahir ruas tan (depan) dan sec (miring); dari segitiga
  kecil lahir bentuk y/x dan 1/x.
- Titik y = 1 ditandai, garis singgung mendatar; sudut theta muncul lagi di
  titik tabrak (garisnya sejajar sumbu), busurnya digambar; depan = 1, jadi
  ruasnya cot dan csc; dari segitiga kecil x/y dan 1/y.
- Contoh 3-4-5: tan 0,75 lalu sec 1,25, cot 1,33, csc 1,67.
- Sudut digeser, keenamnya ikut; penutup.

KENAPA SATU PER SATU DISOROT: ruas yang SEDANG dibahas ungu tebal, yang sudah
dibahas meredup, supaya enam ruas tidak berebut perhatian.

SUDUT DIBATASI 38 sampai 62 derajat saat digeser: di sudut kecil cot dan csc
meledak ke kiri, di sudut besar tan dan sec meledak ke atas. Sudut contoh
3-4-5 (36,87) masih aman: ujung cot di x = pusat + 1,33 R.

WARNA: biru = x, cos, sec; merah = y, sin, csc; tinta = tan, cot, jari-jari;
ungu = sudut dan sorotan.
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

        # ============ segar-ingat A4: segitiga, enam pembagian ============ #
        # Segitiga siku-siku 3-4-5 di kiri, keenam pembagian di kanan.
        A = np.array([-5.2, -1.9, 0.0])
        Bp = A + RIGHT * 3.2
        Cp = Bp + UP * 2.4
        segitiga = Polygon(A, Bp, Cp).set_stroke(TINTA, 4).set_fill(SOROT, 0.06)
        siku = Square(side_length=0.28).set_stroke(TINTA, 2.5).move_to(Bp + np.array([-0.14, 0.14, 0]))
        busur_a = Arc(radius=0.55, start_angle=0, angle=np.arctan(2.4 / 3.2), arc_center=A).set_stroke(SOROT, 4)
        lab_theta_a = rumus(r"\theta", 30, SOROT).move_to(A + rotate_vector(RIGHT * 0.9, np.arctan(2.4 / 3.2) / 2))
        cap_depan = sinema.label("depan", warna=AKSEN).next_to(Line(Bp, Cp), RIGHT, buff=0.14)
        cap_samping = sinema.label("samping", warna=AKSEN2).next_to(Line(A, Bp), DOWN, buff=0.14)
        cap_miring = sinema.label("miring", warna=TINTA).move_to((A + Cp) / 2 + np.array([-0.45, 0.35, 0]))
        tiga = VGroup(
            rumus(r"\sin\theta = \frac{\text{depan}}{\text{miring}}", 30, AKSEN),
            rumus(r"\cos\theta = \frac{\text{samping}}{\text{miring}}", 30, AKSEN2),
            rumus(r"\tan\theta = \frac{\text{depan}}{\text{samping}}", 30, TINTA),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.32).move_to([1.2, -0.2, 0])
        tiga_lagi = VGroup(
            rumus(r"\csc\theta = \frac{\text{miring}}{\text{depan}}", 30, AKSEN),
            rumus(r"\sec\theta = \frac{\text{miring}}{\text{samping}}", 30, AKSEN2),
            rumus(r"\cot\theta = \frac{\text{samping}}{\text{depan}}", 30, TINTA),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.32).move_to([4.9, -0.2, 0])
        with sinema.babak(self, "ingat4", DURASI, kata=KATA) as b:
            b.tunggu_kata("Perbandingan")
            ident = sinema.identitas(self, "ingat Bagian 4")
            ident.set_opacity(0.0)
            # Segitiganya digambar BERSAMA lenyapnya pembuka: kalau menunggu
            # "tiga sisi", layar kosong 2,5 detik (cek_layar_kosong 480p).
            b.main(FadeOut(tanya), FadeOut(dua_nama), FadeOut(empat_nama),
                   ident.animate.set_opacity(1.0), ShowCreation(segitiga), FadeIn(siku),
                   run_time=1.0)
            b.tunggu_kata("tiga sisi")
            b.main(ShowCreation(busur_a), FadeIn(lab_theta_a),
                   FadeIn(cap_depan), FadeIn(cap_samping), FadeIn(cap_miring), run_time=0.8)
            b.tunggu_kata("Sinus")
            b.main(FadeIn(tiga[0], shift=RIGHT * 0.15), run_time=0.7)
            b.tunggu_kata("cosinus")
            b.main(FadeIn(tiga[1], shift=RIGHT * 0.15), run_time=0.7)
            b.tunggu_kata("tangen")
            b.main(FadeIn(tiga[2], shift=RIGHT * 0.15), run_time=0.7)
        qc.periksa_adegan(self, {"segitiga": VGroup(segitiga, siku, busur_a), "tiga": tiga},
                          hud=hud(ident, papan),
                          tulisan={"theta": lab_theta_a, "depan": cap_depan,
                                   "samping": cap_samping, "miring": cap_miring})

        with sinema.babak(self, "ingat4b", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kosekan")
            b.main(FadeIn(tiga_lagi[0], shift=RIGHT * 0.15), run_time=0.7)
            b.tunggu_kata("sekan")
            b.main(FadeIn(tiga_lagi[1], shift=RIGHT * 0.15), run_time=0.7)
            b.tunggu_kata("kotangen")
            b.main(FadeIn(tiga_lagi[2], shift=RIGHT * 0.15), run_time=0.7)
            b.tunggu_kata("Keenam")
            b.main(Indicate(tiga, color=SOROT, scale_factor=1.0),
                   Indicate(tiga_lagi, color=SOROT, scale_factor=1.0), run_time=1.0)
        qc.periksa_adegan(self, {"segitiga": VGroup(segitiga, siku, busur_a), "tiga": tiga,
                                 "tiga lagi": tiga_lagi},
                          hud=hud(ident, papan),
                          tulisan={"theta": lab_theta_a, "depan": cap_depan,
                                   "samping": cap_samping, "miring": cap_miring})

        # ============ segar-ingat B1: lingkaran satuan, cos = x, sin = y = #
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Lalu")
            ident2 = sinema.identitas(self, "ingat Bagian 1")
            ident2.set_opacity(0.0)
            b.main(FadeOut(VGroup(segitiga, siku, busur_a, lab_theta_a, cap_depan, cap_samping,
                                  cap_miring, tiga, tiga_lagi)),
                   FadeOut(ident), run_time=0.5)
            b.main(ident2.animate.set_opacity(1.0), ShowCreation(sumbu), run_time=0.6)
            ident = ident2
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

        # ============ titik x = 1 dan garis singgung tegak ================ #
        titik_1 = Dot(kanan, radius=0.075).set_color(AKSEN2)
        # Di kanan bawah titiknya: garis singgung tegak turun 0,55 di bawah sumbu,
        # jadi label yang tepat di bawah titik tertusuk garis itu (lembar 480p).
        lab_x1 = rumus(r"x = 1", 26, AKSEN2).next_to(kanan, DR, buff=0.12).shift(RIGHT * 0.2)
        sing_tegak = Line(kanan + DOWN * 0.55, kanan + UP * R * 1.85).set_stroke(REDUP, 2.5)
        cap_singgung = sinema.label("garis singgung", warna=REDUP)
        cap_singgung.next_to(sing_tegak.get_end(), UR, buff=0.12)
        with sinema.babak(self, "singgung", DURASI, kata=KATA) as b:
            b.tunggu_kata("tandai")
            ident2 = sinema.identitas(self, "dua garis singgung")
            ident2.set_opacity(0.0)
            b.main(FadeOut(ident), run_time=0.3)
            b.main(ident2.animate.set_opacity(1.0), FadeIn(titik_1, scale=0.5), FadeIn(lab_x1),
                   run_time=0.5)
            ident = ident2
            b.tunggu_kata("tarik")
            b.main(ShowCreation(sing_tegak), run_time=1.2)
            b.tunggu_kata("disebut")
            b.main(FadeIn(cap_singgung, shift=UP * 0.12), run_time=0.7)
        qc.periksa_adegan(self, {"dasar": dasar, "singgung": sing_tegak, "titik 1": titik_1},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "cap": cap_singgung, "x1": lab_x1})

        # ============ dua segitiga sebangun =============================== #
        seg_kecil = Polygon(PUSAT, K(), P()).set_stroke(width=0).set_fill(AKSEN2, 0.22)
        seg_besar = Polygon(PUSAT, kanan, T()).set_stroke(width=0).set_fill(SOROT, 0.14)
        lab_miring1 = rumus("1", 28, TINTA).move_to(
            (PUSAT + P()) / 2 + rotate_vector(UP * 0.28, rd()))
        lab_samping1 = rumus("1", 28, SOROT).next_to(Line(PUSAT, kanan), DOWN, buff=0.16).shift(RIGHT * 0.55)
        with sinema.babak(self, "sebangun", DURASI, kata=KATA) as b:
            b.tunggu_kata("Perpanjang")
            b.main(ShowCreation(jari), run_time=1.2)
            b.tunggu_kata("kecil")
            b.main(FadeIn(seg_kecil), FadeIn(lab_miring1), run_time=0.8)
            b.tunggu_kata("besar")
            b.main(FadeIn(seg_besar), run_time=0.8)
            b.tunggu_kata("sampingnya")
            b.main(FadeIn(lab_samping1), run_time=0.5)
            b.tunggu_kata("sebangun")
            b.main(Indicate(busur, color=SOROT, scale_factor=1.0), run_time=0.9)
        qc.periksa_adegan(self, {"dasar": dasar, "singgung": sing_tegak, "titik 1": titik_1},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "cap": cap_singgung, "x1": lab_x1, "miring 1": lab_miring1,
                                   "samping 1": lab_samping1})

        # ============ tan: sisi depan segitiga besar ====================== #
        ruas_tan = Line(kanan, T()).set_stroke(SOROT, TEBAL_SOROT)
        lab_tan = rumus(r"\tan\theta", 30, TINTA).next_to(ruas_tan, RIGHT, buff=0.16)
        kerja_tan = rumus(r"\tan\theta = \frac{\text{depan}}{\text{samping}} = \frac{\text{depan}}{1}",
                          32, TINTA).move_to([X_KERJA, Y_KERJA + 0.9, 0])
        # Ikon segitiga kecil di samping rumus (permintaan ARYA 13 Sep: siswa
        # harus tahu segitiga MANA yang dipakai tiap perbandingan).
        def ikon(seg, warna, opasitas=0.35):
            return seg.copy().clear_updaters().set_fill(warna, opasitas).set_stroke(TINTA, 2).set_height(0.5)

        ikon_besar = ikon(seg_besar, SOROT).next_to(kerja_tan, LEFT, buff=0.3)
        with sinema.babak(self, "tan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Pada")
            b.main(Indicate(seg_besar, color=SOROT, scale_factor=1.0), FadeIn(ikon_besar), run_time=0.9)
            b.tunggu_kata("tangen")
            b.main(Write(kerja_tan), run_time=1.4)
            b.tunggu_kata("sampingnya")
            b.main(Indicate(lab_samping1, color=SOROT), run_time=0.7)
            b.tunggu_kata("depannya")
            b.main(ShowCreation(ruas_tan), run_time=1.0)
            b.tunggu_kata("persis")
            b.main(FadeIn(lab_tan, shift=RIGHT * 0.12), run_time=0.6)
        qc.periksa_adegan(self, {"dasar": dasar, "singgung": sing_tegak, "tan": ruas_tan,
                                 "kerja": kerja_tan, "ikon": ikon_besar},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "cap": cap_singgung, "lab tan": lab_tan, "x1": lab_x1,
                                   "miring 1": lab_miring1, "samping 1": lab_samping1})

        kerja_tan2 = rumus(r"\tan\theta = \frac{y}{x}", 32, TINTA).next_to(kerja_tan, DOWN, buff=0.35)
        kerja_tan2.align_to(kerja_tan, LEFT)
        ikon_kecil = ikon(seg_kecil, AKSEN2).next_to(kerja_tan2, LEFT, buff=0.3).align_to(ikon_besar, LEFT)
        with sinema.babak(self, "tan_xy", DURASI, kata=KATA) as b:
            b.tunggu_kata("kecil")
            b.main(Indicate(seg_kecil, color=AKSEN2, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("y dibagi")
            b.main(FadeIn(ikon_kecil), Write(kerja_tan2), run_time=1.2)
            b.tunggu_kata("sama")
            papan.baris(r"\tan\theta = \frac{y}{x}", warna=TINTA, b=b)
            b.tunggu_kata("sebesar")
            b.main(Indicate(ruas_tan, color=SOROT, scale_factor=1.0), run_time=0.8)
        qc.periksa_adegan(self, {"dasar": dasar, "singgung": sing_tegak, "tan": ruas_tan,
                                 "kerja": kerja_tan, "kerja2": kerja_tan2, "ikon": ikon_besar,
                                 "ikon2": ikon_kecil},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "cap": cap_singgung, "lab tan": lab_tan, "x1": lab_x1,
                                   "miring 1": lab_miring1, "samping 1": lab_samping1})

        # ============ sec: sisi miring segitiga besar ===================== #
        ruas_sec = Line(PUSAT, T()).set_stroke(SOROT, TEBAL_SOROT)
        kerja_sec = rumus(r"\sec\theta = \frac{\text{miring}}{\text{samping}} = \frac{\text{miring}}{1}",
                          32, AKSEN2).move_to([X_KERJA, Y_KERJA + 0.9, 0])
        kerja_sec2 = rumus(r"\sec\theta = \frac{1}{x}", 32, AKSEN2).next_to(kerja_sec, DOWN, buff=0.35)
        kerja_sec2.align_to(kerja_sec, LEFT)
        ikon_besar2 = ikon(seg_besar, SOROT).next_to(kerja_sec, LEFT, buff=0.3)
        ikon_kecil2 = ikon(seg_kecil, AKSEN2).next_to(kerja_sec2, LEFT, buff=0.3).align_to(ikon_besar2, LEFT)
        with sinema.babak(self, "sec", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekan")
            b.main(FadeOut(kerja_tan), FadeOut(kerja_tan2), FadeOut(ikon_besar), FadeOut(ikon_kecil),
                   run_time=0.3)
            b.main(Write(kerja_sec), run_time=1.4)
            b.tunggu_kata("besar")
            b.main(Indicate(seg_besar, color=SOROT, scale_factor=1.0), FadeIn(ikon_besar2), run_time=0.8)
            b.tunggu_kata("miringnya")
            b.main(ruas_tan.animate.set_stroke(REDUP, TEBAL_REDUP),
                   lab_tan.animate.set_opacity(0.45), run_time=0.4)
            b.main(ShowCreation(ruas_sec), run_time=1.0)
            b.tunggu_kata("kecil")
            b.main(Indicate(seg_kecil, color=AKSEN2, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("satu per")
            b.main(FadeIn(ikon_kecil2), Write(kerja_sec2), run_time=1.0)
            papan.baris(r"\sec\theta = \frac{1}{x}", warna=AKSEN2, b=b)
        qc.periksa_adegan(self, {"dasar": dasar, "sec": ruas_sec, "kerja": kerja_sec,
                                 "kerja2": kerja_sec2, "ikon": ikon_besar2, "ikon2": ikon_kecil2},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "cap": cap_singgung, "lab tan": lab_tan, "x1": lab_x1,
                                   "miring 1": lab_miring1, "samping 1": lab_samping1})

        # ============ titik y = 1 dan garis singgung mendatar ============= #
        titik_y1 = Dot(atas, radius=0.075).set_color(AKSEN)
        # Di atas garis singgung mendatar, kiri sumbu tegak: di bawahnya label
        # menindih lingkaran dan garis singgungnya (lembar 480p).
        lab_y1 = rumus(r"y = 1", 26, AKSEN).next_to(atas, UP, buff=0.12).shift(LEFT * 0.55)
        sing_datar = Line(atas + LEFT * 1.5, atas + RIGHT * R * 1.4).set_stroke(REDUP, 2.5)
        with sinema.babak(self, "singgung2", DURASI, kata=KATA) as b:
            b.tunggu_kata("tandai")
            b.main(FadeOut(kerja_sec), FadeOut(kerja_sec2), FadeOut(seg_besar), FadeOut(lab_samping1),
                   FadeOut(ikon_besar2), FadeOut(ikon_kecil2),
                   ruas_sec.animate.set_stroke(REDUP, TEBAL_REDUP), run_time=0.5)
            b.main(FadeIn(titik_y1, scale=0.5), FadeIn(lab_y1), run_time=0.5)
            b.tunggu_kata("mendatar")
            b.main(ShowCreation(sing_datar), run_time=1.2)
            b.tunggu_kata("atas")
            b.main(Indicate(titik_y1, color=AKSEN), run_time=0.6)
        qc.periksa_adegan(self, {"dasar": dasar, "singgung datar": sing_datar, "titik y1": titik_y1},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "cap": cap_singgung, "lab tan": lab_tan, "x1": lab_x1,
                                   "y1": lab_y1, "miring 1": lab_miring1})

        # ============ sejajar: theta muncul lagi di titik tabrak =========== #
        seg_atas = Polygon(PUSAT, atas, Cc()).set_stroke(width=0).set_fill(SOROT, 0.14)
        # busur theta di titik tabrak Cc: antara arah ke kiri (garis y = 1) dan
        # arah ke pusat (jari-jari), yaitu dari 180 derajat memutar ke 180 + theta
        busur_cc = Arc(radius=0.42, start_angle=np.pi, angle=rd(), arc_center=Cc()).set_stroke(SOROT, 4)
        lab_theta_cc = rumus(r"\theta", 30, SOROT).move_to(Cc() + rotate_vector(LEFT * 0.72, rd() / 2))
        lab_depan1 = rumus("1", 28, SOROT).next_to(Line(PUSAT, atas), LEFT, buff=0.16).shift(UP * 0.35)
        with sinema.babak(self, "sejajar", DURASI, kata=KATA) as b:
            b.tunggu_kata("Perpanjang")
            b.main(Indicate(jari, color=SOROT, scale_factor=1.0), run_time=0.9)
            b.tunggu_kata("sejajar")
            b.main(Indicate(sing_datar, color=SOROT, scale_factor=1.0),
                   Indicate(sumbu[0], color=SOROT, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("muncul")
            b.main(ShowCreation(busur_cc), FadeIn(lab_theta_cc), run_time=0.9)
            b.tunggu_kata("segitiga besar")
            b.main(FadeIn(seg_atas), run_time=0.7)
            b.tunggu_kata("depannya")
            b.main(FadeIn(lab_depan1), Indicate(Line(PUSAT, atas), color=SOROT, scale_factor=1.0),
                   run_time=0.9)
        qc.periksa_adegan(self, {"dasar": dasar, "singgung datar": sing_datar, "titik y1": titik_y1,
                                 "seg atas": seg_atas},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "cap": cap_singgung, "lab tan": lab_tan, "x1": lab_x1,
                                   "y1": lab_y1, "miring 1": lab_miring1, "theta cc": lab_theta_cc,
                                   "depan 1": lab_depan1})

        # ============ cot: sisi samping segitiga atas ===================== #
        ruas_cot = Line(atas, Cc()).set_stroke(SOROT, TEBAL_SOROT)
        lab_cot = rumus(r"\cot\theta", 30, TINTA).next_to(ruas_cot, UP, buff=0.16)
        kerja_cot = rumus(r"\cot\theta = \frac{\text{samping}}{\text{depan}} = \frac{\text{samping}}{1}",
                          32, TINTA).move_to([X_KERJA, Y_KERJA + 0.9, 0])
        kerja_cot2 = rumus(r"\cot\theta = \frac{x}{y}", 32, TINTA).next_to(kerja_cot, DOWN, buff=0.35)
        kerja_cot2.align_to(kerja_cot, LEFT)
        ikon_atas = ikon(seg_atas, SOROT).next_to(kerja_cot, LEFT, buff=0.3)
        ikon_kecil3 = ikon(seg_kecil, AKSEN2).next_to(kerja_cot2, LEFT, buff=0.3).align_to(ikon_atas, LEFT)
        with sinema.babak(self, "cot", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kotangen")
            b.main(Indicate(seg_atas, color=SOROT, scale_factor=1.0), FadeIn(ikon_atas), Write(kerja_cot),
                   run_time=1.4)
            b.tunggu_kata("sampingnya")
            b.main(ShowCreation(ruas_cot), run_time=1.0)
            b.tunggu_kata("panjangnya")
            b.main(FadeIn(lab_cot, shift=UP * 0.12), run_time=0.6)
            b.tunggu_kata("kecil")
            b.main(Indicate(seg_kecil, color=AKSEN2, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("x per")
            b.main(FadeIn(ikon_kecil3), Write(kerja_cot2), run_time=1.0)
            papan.baris(r"\cot\theta = \frac{x}{y}", warna=TINTA, b=b)
        qc.periksa_adegan(self, {"dasar": dasar, "cot": ruas_cot, "kerja": kerja_cot,
                                 "kerja2": kerja_cot2, "ikon": ikon_atas, "ikon2": ikon_kecil3},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "cap": cap_singgung, "lab tan": lab_tan, "lab cot": lab_cot,
                                   "x1": lab_x1, "y1": lab_y1, "miring 1": lab_miring1,
                                   "theta cc": lab_theta_cc, "depan 1": lab_depan1})

        # ============ csc: sisi miring segitiga atas ====================== #
        ruas_csc = Line(PUSAT, Cc()).set_stroke(SOROT, TEBAL_SOROT)
        kerja_csc = rumus(r"\csc\theta = \frac{\text{miring}}{\text{depan}} = \frac{\text{miring}}{1}",
                          32, AKSEN).move_to([X_KERJA, Y_KERJA + 0.9, 0])
        kerja_csc2 = rumus(r"\csc\theta = \frac{1}{y}", 32, AKSEN).next_to(kerja_csc, DOWN, buff=0.35)
        kerja_csc2.align_to(kerja_csc, LEFT)
        ikon_atas2 = ikon(seg_atas, SOROT).next_to(kerja_csc, LEFT, buff=0.3)
        ikon_kecil4 = ikon(seg_kecil, AKSEN2).next_to(kerja_csc2, LEFT, buff=0.3).align_to(ikon_atas2, LEFT)
        with sinema.babak(self, "csc", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kosekan")
            b.main(FadeOut(kerja_cot), FadeOut(kerja_cot2), FadeOut(ikon_atas), FadeOut(ikon_kecil3),
                   run_time=0.3)
            b.main(Indicate(seg_atas, color=SOROT, scale_factor=1.0), FadeIn(ikon_atas2), Write(kerja_csc),
                   run_time=1.4)
            b.tunggu_kata("miringnya")
            b.main(ruas_cot.animate.set_stroke(REDUP, TEBAL_REDUP),
                   lab_cot.animate.set_opacity(0.45), run_time=0.4)
            b.main(ShowCreation(ruas_csc), run_time=0.9)
            b.tunggu_kata("satu per")
            b.main(Indicate(seg_kecil, color=AKSEN2, scale_factor=1.0), FadeIn(ikon_kecil4),
                   Write(kerja_csc2), run_time=1.0)
            papan.baris(r"\csc\theta = \frac{1}{y}", warna=AKSEN, b=b)
        qc.periksa_adegan(self, {"dasar": dasar, "csc": ruas_csc, "kerja": kerja_csc,
                                 "kerja2": kerja_csc2, "ikon": ikon_atas2, "ikon2": ikon_kecil4},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "cap": cap_singgung, "lab tan": lab_tan, "lab cot": lab_cot,
                                   "x1": lab_x1, "y1": lab_y1, "miring 1": lab_miring1,
                                   "theta cc": lab_theta_cc, "depan 1": lab_depan1})

        # ============ enam ruas, enam nama =============================== #
        kotak = SurroundingRectangle(papan.isi(), buff=0.18).set_stroke(SOROT, 2.2)
        kotak.fix_in_frame()
        with sinema.babak(self, "enam", DURASI, kata=KATA) as b:
            b.tunggu_kata("Enam")
            b.main(FadeOut(kerja_csc), FadeOut(kerja_csc2), FadeOut(seg_atas), FadeOut(seg_kecil),
                   FadeOut(ikon_atas2), FadeOut(ikon_kecil4),
                   FadeOut(lab_miring1), FadeOut(lab_depan1), FadeOut(busur_cc), FadeOut(lab_theta_cc),
                   ruas_tan.animate.set_stroke(TINTA, TEBAL_BIASA),
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
                                   "cap": cap_singgung, "lab tan": lab_tan, "lab cot": lab_cot,
                                   "x1": lab_x1, "y1": lab_y1})

        # ============ contoh angka: sudut segitiga 3-4-5 ================= #
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
        k1 = rumus(r"\tan\theta =", 36, TINTA).move_to([X_KERJA - 1.5, Y_KERJA, 0])
        k2 = rumus(r"0{,}6 : 0{,}8", 36, TINTA).next_to(k1, RIGHT, buff=0.25)
        k3 = rumus(r"= 0{,}75", 36, SOROT).next_to(k2, RIGHT, buff=0.25)
        with sinema.babak(self, "contoh", DURASI, kata=KATA) as b:
            b.tunggu_kata("Coba")
            self.remove(ruas_tan, ruas_sec, ruas_cot, ruas_csc, lab_tan, lab_cot)
            self.add(hidup, lab_tan_hidup, lab_cot_hidup)
            b.main(FadeOut(kotak), FadeOut(cap_singgung), FadeOut(lab_x1), FadeOut(lab_y1),
                   run_time=0.4)
            b.tunggu_kata("segitiga")
            b.main(theta.animate.set_value(SUDUT_345), run_time=1.2, rate_func=smooth)
            b.tunggu_kata("x")
            x08 = rumus(r"x = 0{,}8", 34, AKSEN2).move_to([X_KERJA - 1.3, Y_KERJA + 1.3, 0])
            b.main(Write(x08), Indicate(lab_x, color=AKSEN2), run_time=0.8)
            b.tunggu_kata("y")
            y06 = rumus(r"y = 0{,}6", 34, AKSEN).next_to(x08, RIGHT, buff=0.8)
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

        k4 = rumus(r"= \text{depan} : \text{samping} = 3 : 4", 32, TINTA)
        k4.next_to(k1, DOWN, buff=0.4).align_to(k2, LEFT)
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

        # ============ contoh: sec, cot, csc dengan angka yang sama ========= #
        tiga_angka = VGroup(
            rumus(r"\sec\theta = 1 : 0{,}8 = 1{,}25", 34, AKSEN2),
            rumus(r"\cot\theta = 0{,}8 : 0{,}6 = 1{,}33", 34, TINTA),
            rumus(r"\csc\theta = 1 : 0{,}6 = 1{,}67", 34, AKSEN),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to([X_KERJA, Y_KERJA + 0.2, 0])
        # Segitiga yang dipakai tiap perbandingan DISOROT lagi pada sudut 3-4-5
        # (permintaan ARYA 13 Sep): segitiga besar di garis x = 1 untuk sec,
        # segitiga di garis y = 1 untuk cot dan csc.
        t345 = np.radians(SUDUT_345)
        T345 = PUSAT + R * np.array([1.0, np.tan(t345), 0.0])
        C345 = PUSAT + R * np.array([1.0 / np.tan(t345), 1.0, 0.0])
        seg_besar_345 = Polygon(PUSAT, kanan, T345).set_stroke(width=0).set_fill(SOROT, 0.16)
        seg_atas_345 = Polygon(PUSAT, atas, C345).set_stroke(width=0).set_fill(SOROT, 0.16)
        ikon_c1 = ikon(seg_besar_345, SOROT).next_to(tiga_angka[0], LEFT, buff=0.3)
        ikon_c2 = ikon(seg_atas_345, SOROT).next_to(tiga_angka[1], LEFT, buff=0.3).align_to(ikon_c1, LEFT)
        ikon_c3 = ikon(seg_atas_345, SOROT).next_to(tiga_angka[2], LEFT, buff=0.3).align_to(ikon_c1, LEFT)
        with sinema.babak(self, "contoh_tiga", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekan")
            b.main(FadeOut(k1), FadeOut(k2), FadeOut(k3), FadeOut(k4), FadeOut(x08), FadeOut(y06),
                   run_time=0.3)
            b.tunggu_kata("segitiga besar")
            b.main(FadeIn(seg_besar_345), FadeIn(ikon_c1), run_time=0.6)
            b.tunggu_kata("satu dibagi")
            b.main(Write(tiga_angka[0]), run_time=1.3)
            b.tunggu_kata("dua lima")
            b.main(Indicate(hidup[1], color=SOROT, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("segitiga di")
            b.main(FadeOut(seg_besar_345), FadeIn(seg_atas_345), run_time=0.6)
            b.tunggu_kata("Kotangen", ke=2)
            b.main(FadeIn(ikon_c2), Write(tiga_angka[1]), run_time=1.3)
            b.tunggu_kata("tiga tiga")
            b.main(Indicate(hidup[2], color=SOROT, scale_factor=1.0), run_time=0.7)
            b.tunggu_kata("kosekan", ke=2)
            b.main(FadeIn(ikon_c3), Write(tiga_angka[2]), run_time=1.3)
            b.tunggu_kata("enam tujuh")
            b.main(Indicate(hidup[3], color=SOROT, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("tabel")
            b.main(FadeOut(seg_atas_345), Indicate(tiga_angka, color=SOROT, scale_factor=1.0), run_time=0.9)
        qc.periksa_adegan(self, {"dasar": dasar, "ruas": hidup, "tiga angka": tiga_angka,
                                 "ikon": VGroup(ikon_c1, ikon_c2, ikon_c3)},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu, "jari": jari},
                          tulisan={"x": lab_x, "y": lab_y, "theta": lab_theta,
                                   "lab cot": lab_cot_hidup, "0,75": lab_075})

        # ============ sudut digeser: keenamnya ikut ====================== #
        sudut_hidup = always_redraw(lambda: rumus(
            rf"\theta = {int(round(theta.get_value()))}^\circ", 30, TINTA
        ).move_to([PUSAT[0] + 1.1, PUSAT[1] + R * 2.3 + 0.35, 0]))
        with sinema.babak(self, "putar", DURASI, kata=KATA) as b:
            b.tunggu_kata("Geser")
            b.main(FadeOut(tiga_angka), FadeOut(lab_075), FadeOut(ikon_c1), FadeOut(ikon_c2), FadeOut(ikon_c3),
                   run_time=0.3)
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
