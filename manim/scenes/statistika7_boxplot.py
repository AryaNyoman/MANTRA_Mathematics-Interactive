"""Statistika Materi 07, Ukuran Pemusatan dan Penyebaran Bagian 3: kuartil,
boxplot, dan jangkauan antar kuartil (ManimGL).
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (2:01)
yang sudah disetujui ARYA. DUNIANYA SAMA: lima belas titik di penggaris
menit dibelah dua oleh median, tiap belahan dibelah lagi (Q1 = 10, Q3 = 25),
pita seperempat, setengah, tiga perempat, kotak boxplot TUMBUH dari Q1 ke Q3
tepat di bawah titik yang melahirkannya, JAK 15 lawan jangkauan 55 yang
ditentukan dua orang, pagar 47,5 menemukan pencilan 60.

YANG BERBEDA: pembuka sub-bab plus Bagian 3 dengan pertanyaan halaman
(lima titik tanya di penggaris); segar-ingat median dari Bagian 1; bentuk
umum lima angka, JAK, dan pagar bawah/atas di panel baru; penutup menunjuk
Bagian 4 (dua mesin isi ulang); tiap kejadian dipicu pada KATA; sorotan
memakai pita tembus pandang, bukan Indicate atas benda sewarna.

Data halaman Materi 07, waktu tempuh 15 siswa dalam menit, sudah urut:
    5 7 8 10 10 12 15 15 18 20 22 25 30 35 60
    Q1 = 10   Q2 = 15   Q3 = 25   JAK = 15   pagar atas = 47,5   pencilan = 60
Q2 adalah data ke-8 dan TIDAK ikut ke belahan mana pun (cara buku sekolah
untuk banyak data ganjil).

SATU WARNA SATU MAKNA: AKSEN2 biru = belahan kiri dan kotak, AKSEN bata =
belahan kanan dan pencilan, SOROT ungu = median dan sorotan, TINTA/REDUP =
titik, sumbu, tulisan. Kamera phi 90: yang dibandingkan JARAK mendatar.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "statistika7-boxplot"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

DATA = [5, 7, 8, 10, 10, 12, 15, 15, 18, 20, 22, 25, 30, 35, 60]
I_MEDIAN = 7                 # data ke-8
Q1, Q2, Q3 = 10, 15, 25
JAK = Q3 - Q1                # 15
PAGAR_ATAS = Q3 + 1.5 * JAK  # 47,5
PENCILAN = 60

SKALA_X, PUSAT_MENIT = 0.148, 32.0
ANGKA_X = [0, 10, 20, 30, 40, 50, 60]

Z_TITIK = 0.34               # baris titik data
Z_KOTAK = -0.70              # sumbu boxplot, di bawah titiknya
TINGGI_KOTAK = 0.60
Z_ANGKA = -1.34
Z_KAMERA = 0.50
TINGGI_BINGKAI = 6.4
JARI_TITIK = 0.086


def tegak(mob):
    """Berdirikan benda datar di bidang xz supaya menghadap kamera."""
    return mob.rotate(90 * DEGREES, RIGHT)


def xm(menit):
    return (menit - PUSAT_MENIT) * SKALA_X


def tumpuk(nilai_list):
    hitung, hasil = {}, []
    for v in nilai_list:
        hasil.append(hitung.get(v, 0))
        hitung[v] = hitung.get(v, 0) + 1
    return hasil


class Boxplot7(AdeganMatra):
    samples = 4                        # penghalus tepi; bawaan ManimGL 0

    def sorot_pita(self, b, *mobs, lama=1.0, lebih=0.2):
        pita = VGroup()
        for m in mobs:
            p = Rectangle(width=m.get_width() + lebih, height=m.get_depth() + lebih)
            p.set_stroke(width=0).set_fill(SOROT, 0.35)
            pita.add(tegak(p).move_to(m.get_center() + IN * 0.02))
        self.add(pita)
        b.main(FadeIn(pita), run_time=lama * 0.35)
        b.main(FadeOut(pita), run_time=lama * 0.65)
        self.remove(pita)

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self, tanpa_utama=True)
        DUNIA, HUD, TULISAN = {}, {}, {}

        def taruh(nama, mob, tulisan=False):
            DUNIA[nama] = mob
            if tulisan:
                TULISAN[nama] = mob
            return mob

        def buang(*nama):
            for n in nama:
                DUNIA[n] = None
                TULISAN.pop(n, None)

        def periksa(pasangan=None):
            hidup_d = {k: v for k, v in DUNIA.items() if v is not None}
            hidup_h = {k: v for k, v in HUD.items() if v is not None}
            if papan.semua() is not None:
                hidup_h["papan rumus"] = papan.semua()
            hidup_t = {k: v for k, v in TULISAN.items() if v is not None}
            qc.periksa_adegan(self, {}, pasangan=pasangan, hud=hidup_h,
                              dunia=hidup_d, tulisan=hidup_t, jaga_jalur_bawah=True)

        # Panggung: satu penggaris menit, lima belas titik data di atasnya.
        sumbu = Line([xm(-3), 0, Z_ANGKA + 0.24], [xm(66), 0, Z_ANGKA + 0.24]).set_stroke(REDUP, 2.2)
        angka = VGroup()
        for v in ANGKA_X:
            angka.add(Line([xm(v), 0, Z_ANGKA + 0.24], [xm(v), 0, Z_ANGKA + 0.14]).set_stroke(REDUP, 1.5))
            angka.add(tegak(rumus(str(v), 20, REDUP)).move_to([xm(v), 0, Z_ANGKA - 0.10]))

        titik = VGroup()
        for v, tingkat in zip(DATA, tumpuk(DATA)):
            d = Dot(radius=JARI_TITIK).set_fill(TINTA, 1).set_stroke(LATAR, 1.2)
            titik.add(tegak(d).move_to([xm(v), 0, Z_TITIK + tingkat * 0.30]))

        def penggaris_tegak(menit, z_bawah, z_atas, warna, tebal=2.6, putus=False):
            kelas = DashedLine if putus else Line
            g = kelas([xm(menit), 0, z_bawah], [xm(menit), 0, z_atas])
            return g.set_stroke(warna, tebal)

        # ==================================================================
        # buka: judul sub-bab; penggaris dan lima tanda tanya.
        # ==================================================================
        kamera.pasang_awal(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA), tinggi=TINGGI_BINGKAI)
        lima_tanya = VGroup(*[tegak(rumus("?", 30, SOROT)).move_to([xm(v), 0, Z_KOTAK])
                              for v in (5, 15, 27, 40, 55)])
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ukuran")
            sinema.judul_pembuka(self, "Ukuran Pemusatan dan Penyebaran, Bagian 3", lama=3.6, y=2.6)
            b.catat(3.6)
            b.tunggu_kata("Bagaimana")
            taruh("sumbu", sumbu)
            taruh("angka", angka, tulisan=True)
            b.main(ShowCreation(sumbu), FadeIn(angka), run_time=1.0)
            b.tunggu_kata("lima angka")
            taruh("lima tanya", lima_tanya, tulisan=True)
            b.main(LaggedStartMap(lambda m: FadeIn(m, scale=1.5), lima_tanya, lag_ratio=0.2), run_time=1.0)
        periksa()

        # ==================================================================
        # ingat: median membelah dua; diperagakan dengan sekat di penggaris kosong.
        # ==================================================================
        sekat_ingat = penggaris_tegak(30, Z_KOTAK - 0.3, Z_TITIK + 0.5, SOROT, 3.0)
        l_ingat_kiri = tegak(sinema.label("sama banyak", 20, REDUP)).move_to([xm(14), 0, Z_TITIK + 0.3])
        l_ingat_kanan = tegak(sinema.label("sama banyak", 20, REDUP)).move_to([xm(46), 0, Z_TITIK + 0.3])
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Bagian")
            b.main(FadeOut(lima_tanya), run_time=0.5)
            buang("lima tanya")
            b.tunggu_kata("median")
            taruh("sekat ingat", sekat_ingat)
            b.main(ShowCreation(sekat_ingat), run_time=0.7)
            b.tunggu_kata("membelah")
            taruh("label kiri", l_ingat_kiri, tulisan=True)
            taruh("label kanan", l_ingat_kanan, tulisan=True)
            b.main(FadeIn(l_ingat_kiri, shift=0.2 * LEFT), FadeIn(l_ingat_kanan, shift=0.2 * RIGHT), run_time=0.8)
            b.tunggu_kata("Hari ini")
            b.main(FadeOut(sekat_ingat), FadeOut(l_ingat_kiri), FadeOut(l_ingat_kanan), run_time=0.6)
            buang("sekat ingat", "label kiri", "label kanan")
        periksa()

        # ==================================================================
        # data: lima belas titik masuk satu per satu, sudah urut.
        # ==================================================================
        with sinema.babak(self, "data", DURASI, kata=KATA) as b:
            b.tunggu_kata("Lima belas")
            HUD["identitas"] = sinema.identitas(self, "15 siswa, waktu tempuh", "menit, sudah diurutkan")
            HUD["identitas"].set_opacity(0)
            taruh("titik", titik)
            b.main(LaggedStartMap(FadeIn, titik, lag_ratio=0.12), HUD["identitas"].animate.set_opacity(1),
                   run_time=2.4)
            b.tunggu_kata("lima menit")
            b.main(Indicate(titik[0], scale_factor=2.0, color=SOROT), run_time=0.7)
            b.tunggu_kata("enam puluh")
            b.main(Indicate(titik[14], scale_factor=2.0, color=SOROT), run_time=0.7)
        periksa()

        # ==================================================================
        # median: data ke-8 membelah jadi dua bagian sama banyak.
        # ==================================================================
        garis_q2 = penggaris_tegak(Q2, Z_KOTAK - 0.30, Z_TITIK + 0.62, SOROT, 3.2)
        l_q2 = tegak(rumus("Q_2 = 15", 21, SOROT)).move_to([xm(Q2), 0, Z_TITIK + 0.88])
        with sinema.babak(self, "median", DURASI, kata=KATA) as b:
            b.tunggu_kata("data ke")
            b.main(Indicate(titik[I_MEDIAN], scale_factor=2.4, color=SOROT), run_time=0.9)
            b.tunggu_kata("lima belas")
            taruh("garis Q2", garis_q2)
            taruh("label Q2", l_q2, tulisan=True)
            b.main(ShowCreation(garis_q2), FadeIn(l_q2), run_time=1.0)
            b.tunggu_kata("Tujuh")
            b.main(*[Indicate(m, scale_factor=1.7, color=AKSEN2) for m in titik[:I_MEDIAN]], run_time=1.0)
            b.tunggu_kata("tujuh", ke=2)
            b.main(*[Indicate(m, scale_factor=1.7, color=AKSEN) for m in titik[I_MEDIAN + 1:]], run_time=1.0)
        periksa()

        # ==================================================================
        # lagi: tiap belahan dicari mediannya sendiri.
        # ==================================================================
        kurung_kiri = VGroup(
            Line([xm(DATA[0]), 0, Z_TITIK - 0.24], [xm(DATA[I_MEDIAN - 1]), 0, Z_TITIK - 0.24]),
            Line([xm(DATA[0]), 0, Z_TITIK - 0.24], [xm(DATA[0]), 0, Z_TITIK - 0.12]),
            Line([xm(DATA[I_MEDIAN - 1]), 0, Z_TITIK - 0.24], [xm(DATA[I_MEDIAN - 1]), 0, Z_TITIK - 0.12]),
        ).set_stroke(AKSEN2, 2.4)
        kurung_kanan = VGroup(
            Line([xm(DATA[I_MEDIAN + 1]), 0, Z_TITIK - 0.24], [xm(DATA[-1]), 0, Z_TITIK - 0.24]),
            Line([xm(DATA[I_MEDIAN + 1]), 0, Z_TITIK - 0.24], [xm(DATA[I_MEDIAN + 1]), 0, Z_TITIK - 0.12]),
            Line([xm(DATA[-1]), 0, Z_TITIK - 0.24], [xm(DATA[-1]), 0, Z_TITIK - 0.12]),
        ).set_stroke(AKSEN, 2.4)
        l_tujuh_kiri = tegak(rumus("7", 20, AKSEN2)).move_to([xm(7.5), 0, Z_TITIK - 0.48])
        l_tujuh_kanan = tegak(rumus("7", 20, AKSEN)).move_to([xm(38), 0, Z_TITIK - 0.48])

        with sinema.babak(self, "lagi", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kuartil")
            taruh("kurung kiri", kurung_kiri)
            taruh("kurung kanan", kurung_kanan)
            b.main(ShowCreation(kurung_kiri), ShowCreation(kurung_kanan), run_time=1.2)
            b.tunggu_kata("empat")
            taruh("cacah kiri", l_tujuh_kiri, tulisan=True)
            taruh("cacah kanan", l_tujuh_kanan, tulisan=True)
            b.main(FadeIn(l_tujuh_kiri), FadeIn(l_tujuh_kanan), run_time=0.7)
            b.tunggu_kata("tiap belahan")
            self.sorot_pita(b, kurung_kiri, kurung_kanan, lama=1.2)
        periksa()

        # ==================================================================
        # q1q3: mediannya masing-masing, yaitu Q1 dan Q3.
        # ==================================================================
        garis_q1 = penggaris_tegak(Q1, Z_KOTAK - 0.30, Z_TITIK + 0.44, AKSEN2, 3.0)
        garis_q3 = penggaris_tegak(Q3, Z_KOTAK - 0.30, Z_TITIK + 0.44, AKSEN, 3.0)
        l_q1 = tegak(rumus("Q_1 = 10", 21, AKSEN2)).move_to([xm(4.5), 0, Z_TITIK + 0.66])
        l_q3 = tegak(rumus("Q_3 = 25", 21, AKSEN)).move_to([xm(31.5), 0, Z_TITIK + 0.66])

        with sinema.babak(self, "q1q3", DURASI, kata=KATA) as b:
            b.tunggu_kata("Belahan kiri")
            b.main(Indicate(l_tujuh_kiri, scale_factor=1.4, color=AKSEN2), run_time=0.7)
            b.tunggu_kata("sepuluh")
            b.main(Indicate(titik[3], scale_factor=2.4, color=AKSEN2), run_time=0.9)
            b.tunggu_kata("kuartil satu")
            taruh("garis Q1", garis_q1)
            taruh("label Q1", l_q1, tulisan=True)
            b.main(ShowCreation(garis_q1), FadeIn(l_q1), run_time=1.0)
            b.tunggu_kata("Belahan kanan")
            b.main(Indicate(l_tujuh_kanan, scale_factor=1.4, color=AKSEN), run_time=0.7)
            b.tunggu_kata("dua puluh")
            b.main(Indicate(titik[11], scale_factor=2.4, color=AKSEN), run_time=0.9)
            b.tunggu_kata("kuartil tiga")
            taruh("garis Q3", garis_q3)
            taruh("label Q3", l_q3, tulisan=True)
            b.main(ShowCreation(garis_q3), FadeIn(l_q3), run_time=1.0)
            b.main(FadeOut(kurung_kiri), FadeOut(kurung_kanan),
                   FadeOut(l_tujuh_kiri), FadeOut(l_tujuh_kanan), run_time=0.6)
            buang("kurung kiri", "kurung kanan", "cacah kiri", "cacah kanan")
        periksa()

        # ==================================================================
        # arti: seperempat, setengah, tiga perempat.
        # ==================================================================
        def pita(dari, sampai, warna, z):
            r = Rectangle(width=xm(sampai) - xm(dari), height=0.20)
            r.set_fill(warna, 0.30).set_stroke(width=0)
            return tegak(r).move_to([(xm(dari) + xm(sampai)) / 2, 0, z])

        pita1 = pita(DATA[0], Q1, AKSEN2, Z_TITIK - 0.26)
        pita2 = pita(DATA[0], Q2, SOROT, Z_TITIK - 0.50)
        pita3 = pita(DATA[0], Q3, AKSEN, Z_TITIK - 0.74)
        l_p1 = tegak(rumus(r"\tfrac{1}{4}", 20, AKSEN2)).move_to([xm(-1.0), 0, Z_TITIK - 0.26])
        l_p2 = tegak(rumus(r"\tfrac{1}{2}", 20, SOROT)).move_to([xm(-1.0), 0, Z_TITIK - 0.50])
        l_p3 = tegak(rumus(r"\tfrac{3}{4}", 20, AKSEN)).move_to([xm(-1.0), 0, Z_TITIK - 0.74])

        with sinema.babak(self, "arti", DURASI, kata=KATA) as b:
            for frasa, p, l, nama in (("Seperempat", pita1, l_p1, "1"), ("Setengahnya", pita2, l_p2, "2"),
                                      ("Tiga", pita3, l_p3, "3")):
                b.tunggu_kata(frasa)
                taruh(f"pita {nama}", p)
                taruh(f"pecahan {nama}", l, tulisan=True)
                b.main(GrowFromEdge(p, LEFT), FadeIn(l), run_time=1.0)
        periksa()

        # ==================================================================
        # kotak: boxplot LAHIR, tepat di bawah titik yang membuatnya.
        # ==================================================================
        kotak = Rectangle(width=xm(Q3) - xm(Q1), height=TINGGI_KOTAK)
        kotak.set_fill(AKSEN2, 0.28).set_stroke(AKSEN2, 2.6)
        kotak = tegak(kotak).move_to([(xm(Q1) + xm(Q3)) / 2, 0, Z_KOTAK])
        garis_med = Line([xm(Q2), 0, Z_KOTAK - TINGGI_KOTAK / 2],
                         [xm(Q2), 0, Z_KOTAK + TINGGI_KOTAK / 2]).set_stroke(SOROT, 3.2)
        kumis_kiri = VGroup(
            Line([xm(DATA[0]), 0, Z_KOTAK], [xm(Q1), 0, Z_KOTAK]),
            Line([xm(DATA[0]), 0, Z_KOTAK - 0.16], [xm(DATA[0]), 0, Z_KOTAK + 0.16]),
        ).set_stroke(REDUP, 2.4)
        kumis_kanan = VGroup(
            Line([xm(Q3), 0, Z_KOTAK], [xm(PENCILAN), 0, Z_KOTAK]),
            Line([xm(PENCILAN), 0, Z_KOTAK - 0.16], [xm(PENCILAN), 0, Z_KOTAK + 0.16]),
        ).set_stroke(REDUP, 2.4)

        with sinema.babak(self, "kotak", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang")
            b.main(FadeOut(VGroup(pita1, pita2, pita3, l_p1, l_p2, l_p3)), run_time=0.6)
            buang("pita 1", "pita 2", "pita 3", "pecahan 1", "pecahan 2", "pecahan 3")
            b.tunggu_kata("Sebuah kotak")
            taruh("kotak", kotak)
            b.main(GrowFromCenter(kotak), run_time=1.4)
            b.tunggu_kata("satu garis")
            taruh("garis median", garis_med)
            b.main(ShowCreation(garis_med), run_time=0.8)
            b.tunggu_kata("dua kumis")
            taruh("kumis kiri", kumis_kiri)
            taruh("kumis kanan", kumis_kanan)
            b.main(ShowCreation(kumis_kiri), ShowCreation(kumis_kanan), run_time=1.2)
            b.main(FadeOut(garis_q1), FadeOut(garis_q3), FadeOut(garis_q2), run_time=0.6)
            buang("garis Q1", "garis Q3", "garis Q2")
        periksa()

        # ==================================================================
        # baca: cara membacanya.
        # ==================================================================
        l_setengah = tegak(sinema.label("setengah tengah", 19, AKSEN2)).move_to([xm(Q2), 0, Z_KOTAK - 0.56])
        l_ekor = tegak(sinema.label("ekor panjang", 19, REDUP)).move_to([xm(44), 0, Z_KOTAK + 0.42])

        with sinema.babak(self, "baca", DURASI, kata=KATA) as b:
            b.tunggu_kata("boxplot")
            b.main(FadeOut(l_q1), FadeOut(l_q3), FadeOut(l_q2), run_time=0.6)
            buang("label Q1", "label Q3", "label Q2")
            b.tunggu_kata("Kotaknya")
            taruh("label setengah", l_setengah, tulisan=True)
            b.main(FadeIn(l_setengah), run_time=0.5)
            self.sorot_pita(b, kotak, lama=1.2)
            b.tunggu_kata("Garis median")
            b.main(Indicate(garis_med, scale_factor=1.2, color=SOROT), run_time=1.0)
            b.tunggu_kata("kumis")
            taruh("label ekor", l_ekor, tulisan=True)
            b.main(FadeIn(l_ekor), run_time=0.5)
            self.sorot_pita(b, kumis_kanan[0], lama=1.2)
            b.tunggu_kata("menjulur")
            b.main(FadeOut(l_setengah), FadeOut(l_ekor), run_time=0.6)
            buang("label setengah", "label ekor")
        periksa()

        # ==================================================================
        # jak: lebar kotaknya punya nama.
        # ==================================================================
        Z_JAK = -0.16
        Z_BIASA = 1.55
        rentang_jak = VGroup(
            Line([xm(Q1), 0, Z_JAK], [xm(Q3), 0, Z_JAK]),
            Line([xm(Q1), 0, Z_JAK - 0.08], [xm(Q1), 0, Z_JAK + 0.08]),
            Line([xm(Q3), 0, Z_JAK - 0.08], [xm(Q3), 0, Z_JAK + 0.08]),
        ).set_stroke(AKSEN2, 2.6)
        rentang_biasa = VGroup(
            Line([xm(DATA[0]), 0, Z_BIASA], [xm(PENCILAN), 0, Z_BIASA]),
            Line([xm(DATA[0]), 0, Z_BIASA - 0.08], [xm(DATA[0]), 0, Z_BIASA + 0.08]),
            Line([xm(PENCILAN), 0, Z_BIASA - 0.08], [xm(PENCILAN), 0, Z_BIASA + 0.08]),
        ).set_stroke(REDUP, 2.4)
        l_jak = tegak(rumus("15", 20, AKSEN2)).move_to([xm(28.5), 0, Z_JAK])
        l_biasa = tegak(rumus("55", 20, REDUP)).move_to([xm(63.5), 0, Z_BIASA])

        with sinema.babak(self, "jak", DURASI, kata=KATA) as b:
            b.tunggu_kata("Lebar")
            taruh("rentang jak", rentang_jak)
            b.main(ShowCreation(rentang_jak), run_time=0.9)
            b.tunggu_kata("Dua puluh")
            baris_jak = sinema.lahir_rumus(self, r"JAK = 25 - 10 = 15", kotak, papan, b=b, warna=AKSEN2,
                                           sebagai_utama=False, ukuran_lahir=44, tahan=0.4, run_time=0.9,
                                           geser=UP * 1.9)
            taruh("angka jak", l_jak, tulisan=True)
            b.main(FadeIn(l_jak), run_time=0.4)
            b.tunggu_kata("Bandingkan")
            taruh("rentang biasa", rentang_biasa)
            b.main(ShowCreation(rentang_biasa), run_time=1.0)
            b.tunggu_kata("enam puluh")
            papan.baris(r"\text{jangkauan} = 60 - 5 = 55", REDUP, b=b)
            b.tunggu_kata("yaitu")
            taruh("angka biasa", l_biasa, tulisan=True)
            b.main(FadeIn(l_biasa), run_time=0.5)
        periksa()

        # ==================================================================
        # kebal: 55 itu ditentukan dua orang saja.
        # ==================================================================
        with sinema.babak(self, "kebal", DURASI, kata=KATA) as b:
            b.tunggu_kata("dua orang")
            b.main(Indicate(titik[0], scale_factor=2.6, color=SOROT),
                   Indicate(titik[14], scale_factor=2.6, color=SOROT), run_time=1.0)
            b.tunggu_kata("paling dekat")
            self.sorot_pita(b, rentang_biasa[0], lama=1.2)
            b.tunggu_kata("Jangkauan antar")
            self.sorot_pita(b, rentang_jak[0], lama=1.2)
            b.tunggu_kata("keduanya")
            b.main(FadeOut(rentang_biasa), FadeOut(l_biasa), run_time=0.7)
            buang("rentang biasa", "angka biasa")
        periksa()

        # ==================================================================
        # pagar: pencilan ditemukan dengan hitungan.
        # ==================================================================
        garis_pagar = penggaris_tegak(PAGAR_ATAS, Z_KOTAK - 0.30, Z_TITIK + 0.44, AKSEN, 2.6, putus=True)
        l_pagar = tegak(rumus("47{,}5", 20, AKSEN)).move_to([xm(PAGAR_ATAS), 0, Z_TITIK + 0.66])

        with sinema.babak(self, "pagar", DURASI, kata=KATA) as b:
            b.tunggu_kata("Pagarnya")
            baris_pagar = papan.baris(r"1{,}5 \times 15 = 22{,}5", AKSEN, b=b)
            b.tunggu_kata("pagar atasnya")
            baris_pagar2 = papan.baris(r"25 + 22{,}5 = 47{,}5", AKSEN, b=b)
            b.tunggu_kata("empat puluh")
            taruh("garis pagar", garis_pagar)
            taruh("angka pagar", l_pagar, tulisan=True)
            b.main(ShowCreation(garis_pagar), FadeIn(l_pagar), run_time=1.0)
            b.tunggu_kata("Waktu")
            b.main(titik[14].animate.set_color(AKSEN), run_time=0.5)
            b.tunggu_kata("jatuh")
            b.main(Indicate(titik[14], scale_factor=3.0, color=AKSEN), run_time=1.0)
        periksa()

        # ==================================================================
        # umum: lima angka, JAK, pagar bawah dan atas; panel baru.
        # ==================================================================
        lima_dot = VGroup(*[tegak(Dot(radius=0.09).set_fill(SOROT, 1)).move_to([xm(v), 0, Z_KOTAK])
                            for v in (DATA[0], Q1, Q2, Q3, PENCILAN)])
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bentuk")
            b.main(FadeOut(papan.semua()), FadeOut(rentang_jak), FadeOut(l_jak), run_time=0.5)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, tanpa_utama=True)
            buang("rentang jak", "angka jak")
            taruh("lima dot", lima_dot)
            for frasa, i in (("terkecil", 0), ("kuartil satu", 1), ("median", 2), ("kuartil tiga", 3), ("terbesar", 4)):
                b.tunggu_kata(frasa)
                b.main(FadeIn(lima_dot[i], scale=1.8), run_time=0.4)
            b.tunggu_kata("Jangkauan antar")
            papan.baris(r"JAK = Q_3 - Q_1", AKSEN2, b=b)
            b.tunggu_kata("pencilan")
            papan.baris(r"\text{pencilan}: x < Q_1 - 1{,}5\,JAK", AKSEN, b=b)
            b.tunggu_kata("atau")
            papan.baris(r"\text{atau } x > Q_3 + 1{,}5\,JAK", AKSEN, b=b)
        periksa()

        # ==================================================================
        # tutup: tiga hal yang terbaca dari lima angka.
        # ==================================================================
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("lima angka")
            b.main(Indicate(lima_dot, scale_factor=1.4, color=SOROT), run_time=0.9)
            b.tunggu_kata("tengahnya")
            b.main(Indicate(garis_med, scale_factor=1.2, color=SOROT), run_time=0.8)
            b.tunggu_kata("lebar")
            self.sorot_pita(b, kotak, lama=1.2)
            b.tunggu_kata("ekornya")
            self.sorot_pita(b, kumis_kanan[0], lama=1.2)
        periksa()

        # ==================================================================
        # lanjut: dua mesin isi ulang, rata-rata sama, sebaran beda.
        # ==================================================================
        judul_lanjut = teks("Ukuran Pemusatan dan Penyebaran, Bagian 4", 30, SOROT)
        judul_lanjut.move_to([0, 2.6, 0]).fix_in_frame()
        MESIN_A = [498, 499, 500, 500, 501, 502]
        MESIN_B = [470, 485, 500, 500, 515, 530]

        def baris_mesin(nilai, z, warna):
            g = VGroup()
            for v, t in zip(nilai, tumpuk(nilai)):
                g.add(tegak(Dot(radius=0.09).set_fill(warna, 1)).move_to([(v - 500) * 0.06, 0, z + t * 0.26]))
            return g

        dot_a = baris_mesin(MESIN_A, Z_TITIK + 0.6, AKSEN2)
        dot_b = baris_mesin(MESIN_B, Z_KOTAK - 0.2, AKSEN)
        l_a = tegak(sinema.label("mesin A", 22, AKSEN2)).move_to([-3.4, 0, Z_TITIK + 0.6])
        l_b = tegak(sinema.label("mesin B", 22, AKSEN)).move_to([-3.4, 0, Z_KOTAK - 0.2])
        garis_500 = DashedLine([0, 0, Z_KOTAK - 0.6], [0, 0, Z_TITIK + 1.3]).set_stroke(SOROT, 2.0)
        l_500 = tegak(rumus(r"500\ \mathrm{ml}", 22, SOROT)).move_to([0, 0, Z_TITIK + 1.6])
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ukuran")
            b.main(FadeOut(VGroup(titik, kotak, garis_med, kumis_kiri, kumis_kanan, garis_pagar, l_pagar,
                                  lima_dot, sumbu, angka)),
                   FadeOut(papan.semua()), FadeOut(HUD["identitas"]), run_time=0.7)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, tanpa_utama=True)
            HUD["identitas"] = None
            for n in list(DUNIA):
                buang(n)
            self.hud_tambah(judul_lanjut)
            HUD["judul lanjut"] = judul_lanjut
            b.main(FadeIn(judul_lanjut, shift=0.2 * UP), run_time=0.7)
            b.tunggu_kata("dua mesin")
            taruh("dot a", dot_a)
            taruh("dot b", dot_b)
            taruh("label a", l_a, tulisan=True)
            taruh("label b", l_b, tulisan=True)
            b.main(FadeIn(l_a), FadeIn(l_b), LaggedStartMap(FadeIn, dot_a, lag_ratio=0.1),
                   LaggedStartMap(FadeIn, dot_b, lag_ratio=0.1), run_time=1.2)
            b.tunggu_kata("rata-rata")
            taruh("garis 500", garis_500)
            taruh("label 500", l_500, tulisan=True)
            b.main(ShowCreation(garis_500), FadeIn(l_500), run_time=0.8)
            b.tunggu_kata("ditolak")
            self.sorot_pita(b, dot_b, lama=1.2, lebih=0.3)
        periksa()

        sinema.laporkan_pemicu(self)
