"""Materi 07 Statistika: kuartil, boxplot, dan jangkauan antar kuartil (ManimGL).

Naskah: manim/narasi/statistika7-boxplot.json (10 segmen, 120,7 detik)

GAGASAN POKOK. Boxplot di halaman selalu muncul sudah jadi, dan siswa disuruh
menghafal bagian-bagiannya. Yang tidak bisa dilakukan halaman: memperlihatkan
boxplot LAHIR dari datanya. Di video ini lima belas titik dibelah dua, tiap
belahan dibelah lagi, dan kotaknya TUMBUH dari Q1 ke Q3 tepat di atas titik
yang melahirkannya. Sesudah itu kotaknya sendiri jadi alat: lebarnya adalah
jangkauan antar kuartil, dan pagar 1,5 kali lebar itu menemukan pencilannya.

Data halaman Tahap 7, waktu tempuh 15 siswa dalam menit, sudah urut:
    5 7 8 10 10 12 15 15 18 20 22 25 30 35 60
    Q1 = 10   Q2 = 15   Q3 = 25   JAK = 15   pagar atas = 47,5   pencilan = 60
Q2 adalah data ke-8 dan TIDAK ikut ke belahan mana pun, sesuai cara buku
sekolah untuk banyak data ganjil.

TATA LETAK (standar video versi 2):
    kiri atas  identitas benda, menetap
    kanan atas papan rumus, berubah lewat morph
    kaki layar milik subtitle, dijaga qc
    dalam gambar label maksimal dua kata

SATU WARNA SATU MAKNA DI DALAM VIDEO INI:
    AKSEN2 biru = belahan kiri dan kotak     AKSEN bata = belahan kanan dan pencilan
    SOROT ungu  = median, garis pembelah     TINTA/REDUP = titik, sumbu, tulisan

Kamera phi 90, tegak lurus: yang dibandingkan JARAK mendatar.
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

DATA = [5, 7, 8, 10, 10, 12, 15, 15, 18, 20, 22, 25, 30, 35, 60]
I_MEDIAN = 7                 # data ke-8
Q1, Q2, Q3 = 10, 15, 25
JAK = Q3 - Q1                # 15
PAGAR_ATAS = Q3 + 1.5 * JAK  # 47,5
PENCILAN = 60

# --- Penggaris menit 0 sampai 65.
SKALA_X, PUSAT_MENIT = 0.148, 32.0
ANGKA_X = [0, 10, 20, 30, 40, 50, 60]

Z_TITIK = 0.10               # baris titik data
Z_KOTAK = -0.72              # sumbu boxplot, di bawah titiknya
TINGGI_KOTAK = 0.46
Z_ANGKA = -1.34
Z_KAMERA = 0.50
TINGGI_BINGKAI = 6.4
JARI_TITIK = 0.070


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

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        DUNIA, HUD, TULISAN = {}, {}, {}
        HUD["identitas"] = sinema.identitas(self, "15 siswa, waktu tempuh",
                                            "menit, sudah diurutkan")

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
            qc.periksa_adegan(self, {}, pasangan=pasangan, hud=hidup_h,
                              dunia=hidup_d, jaga_jalur_bawah=True)
            hidup_t = [k for k, v in TULISAN.items() if v is not None]
            for i, a in enumerate(hidup_t):
                for c in hidup_t[i + 1:]:
                    qc.tidak_bertindih(frame, TULISAN[a], TULISAN[c], a, c)

        # ------------------------------------------------------------------
        # Panggung: satu penggaris menit, lima belas titik data di atasnya.
        # ------------------------------------------------------------------
        sumbu = Line([xm(-3), 0, Z_ANGKA + 0.24], [xm(66), 0, Z_ANGKA + 0.24])
        sumbu.set_stroke(REDUP, 2.2)
        angka = VGroup()
        for v in ANGKA_X:
            angka.add(Line([xm(v), 0, Z_ANGKA + 0.24], [xm(v), 0, Z_ANGKA + 0.14])
                      .set_stroke(REDUP, 1.5))
            angka.add(tegak(rumus(str(v), 20, REDUP)).move_to([xm(v), 0, Z_ANGKA - 0.10]))

        titik = VGroup()
        for v, tingkat in zip(DATA, tumpuk(DATA)):
            d = Dot(radius=JARI_TITIK).set_fill(TINTA, 1).set_stroke(LATAR, 1.2)
            titik.add(tegak(d).move_to([xm(v), 0, Z_TITIK + tingkat * 0.20]))

        def penggaris_tegak(menit, z_bawah, z_atas, warna, tebal=2.6, putus=False):
            kelas = DashedLine if putus else Line
            g = kelas([xm(menit), 0, z_bawah], [xm(menit), 0, z_atas])
            return g.set_stroke(warna, tebal)

        # ==================================================================
        # Babak 1 `buka`: penggaris, lalu lima belas titik.
        # ==================================================================
        kamera.pasang_awal(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA), tinggi=TINGGI_BINGKAI)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 07: Kuartil dan boxplot", lama=3.2, y=2.6)
            b.catat(3.2)
            taruh("sumbu", sumbu)
            taruh("angka", angka, tulisan=True)
            b.main(ShowCreation(sumbu), FadeIn(angka), run_time=1.4)
            taruh("titik", titik)
            b.main(LaggedStartMap(FadeIn, titik, lag_ratio=0.12), run_time=3.0)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.8, color=TINTA, **kw),
                titik, lag_ratio=0.08), run_time=1.8)
            b.jeda(1.2)
        periksa()

        # ==================================================================
        # Babak 2 `median`: data ke-8 membelah jadi dua bagian sama banyak.
        # ==================================================================
        garis_q2 = penggaris_tegak(Q2, Z_KOTAK - 0.30, Z_TITIK + 0.62, SOROT, 3.2)
        l_q2 = tegak(rumus("Q_2 = 15", 21, SOROT)).move_to([xm(Q2), 0, Z_TITIK + 0.88])

        with sinema.babak(self, "median", DURASI) as b:
            b.main(Indicate(titik[I_MEDIAN], scale_factor=2.4, color=SOROT), run_time=1.6)
            taruh("garis Q2", garis_q2)
            b.main(ShowCreation(garis_q2), run_time=1.6)
            taruh("label Q2", l_q2, tulisan=True)
            b.main(FadeIn(l_q2), run_time=1.0)
            b.main(*[Indicate(m, scale_factor=1.7, color=AKSEN2) for m in titik[:I_MEDIAN]],
                   run_time=1.6)
            b.main(*[Indicate(m, scale_factor=1.7, color=AKSEN) for m in titik[I_MEDIAN + 1:]],
                   run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 3 `lagi`: tiap belahan dicari mediannya sendiri.
        # ==================================================================
        kurung_kiri = VGroup(
            Line([xm(DATA[0]), 0, Z_TITIK - 0.24], [xm(DATA[I_MEDIAN - 1]), 0, Z_TITIK - 0.24]),
            Line([xm(DATA[0]), 0, Z_TITIK - 0.24], [xm(DATA[0]), 0, Z_TITIK - 0.12]),
            Line([xm(DATA[I_MEDIAN - 1]), 0, Z_TITIK - 0.24],
                 [xm(DATA[I_MEDIAN - 1]), 0, Z_TITIK - 0.12]),
        ).set_stroke(AKSEN2, 2.4)
        kurung_kanan = VGroup(
            Line([xm(DATA[I_MEDIAN + 1]), 0, Z_TITIK - 0.24], [xm(DATA[-1]), 0, Z_TITIK - 0.24]),
            Line([xm(DATA[I_MEDIAN + 1]), 0, Z_TITIK - 0.24],
                 [xm(DATA[I_MEDIAN + 1]), 0, Z_TITIK - 0.12]),
            Line([xm(DATA[-1]), 0, Z_TITIK - 0.24], [xm(DATA[-1]), 0, Z_TITIK - 0.12]),
        ).set_stroke(AKSEN, 2.4)
        l_tujuh_kiri = tegak(rumus("7", 20, AKSEN2)).move_to([xm(7.5), 0, Z_TITIK - 0.48])
        l_tujuh_kanan = tegak(rumus("7", 20, AKSEN)).move_to([xm(38), 0, Z_TITIK - 0.48])

        with sinema.babak(self, "lagi", DURASI) as b:
            taruh("kurung kiri", kurung_kiri)
            taruh("kurung kanan", kurung_kanan)
            b.main(ShowCreation(kurung_kiri), run_time=1.4)
            b.main(ShowCreation(kurung_kanan), run_time=1.4)
            taruh("cacah kiri", l_tujuh_kiri, tulisan=True)
            taruh("cacah kanan", l_tujuh_kanan, tulisan=True)
            b.main(FadeIn(l_tujuh_kiri), FadeIn(l_tujuh_kanan), run_time=1.0)
            b.main(Indicate(l_tujuh_kiri, scale_factor=1.4, color=AKSEN2),
                   Indicate(l_tujuh_kanan, scale_factor=1.4, color=AKSEN), run_time=1.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 4 `q1q3`: mediannya masing-masing, yaitu Q1 dan Q3.
        # ==================================================================
        garis_q1 = penggaris_tegak(Q1, Z_KOTAK - 0.30, Z_TITIK + 0.44, AKSEN2, 3.0)
        garis_q3 = penggaris_tegak(Q3, Z_KOTAK - 0.30, Z_TITIK + 0.44, AKSEN, 3.0)
        l_q1 = tegak(rumus("Q_1 = 10", 21, AKSEN2)).move_to([xm(4.5), 0, Z_TITIK + 0.66])
        l_q3 = tegak(rumus("Q_3 = 25", 21, AKSEN)).move_to([xm(31.5), 0, Z_TITIK + 0.66])

        with sinema.babak(self, "q1q3", DURASI) as b:
            b.main(Indicate(titik[3], scale_factor=2.4, color=AKSEN2), run_time=1.4)
            taruh("garis Q1", garis_q1)
            taruh("label Q1", l_q1, tulisan=True)
            b.main(ShowCreation(garis_q1), FadeIn(l_q1), run_time=1.6)
            b.main(Indicate(titik[11], scale_factor=2.4, color=AKSEN), run_time=1.4)
            taruh("garis Q3", garis_q3)
            taruh("label Q3", l_q3, tulisan=True)
            b.main(ShowCreation(garis_q3), FadeIn(l_q3), run_time=1.6)
            b.main(FadeOut(kurung_kiri), FadeOut(kurung_kanan),
                   FadeOut(l_tujuh_kiri), FadeOut(l_tujuh_kanan), run_time=1.0)
            buang("kurung kiri", "kurung kanan", "cacah kiri", "cacah kanan")
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 5 `arti`: seperempat, setengah, tiga perempat.
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

        with sinema.babak(self, "arti", DURASI) as b:
            for p, l in ((pita1, l_p1), (pita2, l_p2), (pita3, l_p3)):
                taruh(f"pita {id(p)}", p)
                taruh(f"label {id(l)}", l, tulisan=True)
                b.main(GrowFromCenter(p), FadeIn(l), run_time=1.6)
            b.main(Indicate(VGroup(pita1, pita2, pita3), scale_factor=1.03, color=SOROT),
                   run_time=1.4)
            b.main(FadeOut(VGroup(pita1, pita2, pita3, l_p1, l_p2, l_p3)), run_time=1.0)
            for p, l in ((pita1, l_p1), (pita2, l_p2), (pita3, l_p3)):
                buang(f"pita {id(p)}", f"label {id(l)}")
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 6 `kotak`: boxplot LAHIR, tepat di bawah titik yang membuatnya.
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

        with sinema.babak(self, "kotak", DURASI) as b:
            taruh("kotak", kotak)
            b.main(GrowFromCenter(kotak), run_time=1.8)
            taruh("garis median", garis_med)
            b.main(ShowCreation(garis_med), run_time=1.2)
            taruh("kumis kiri", kumis_kiri)
            taruh("kumis kanan", kumis_kanan)
            b.main(ShowCreation(kumis_kiri), run_time=1.4)
            b.main(ShowCreation(kumis_kanan), run_time=1.6)
            b.main(FadeOut(garis_q1), FadeOut(garis_q3), FadeOut(garis_q2), run_time=1.0)
            buang("garis Q1", "garis Q3", "garis Q2")
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 7 `baca`: cara membacanya.
        # ==================================================================
        l_setengah = tegak(sinema.label("setengah tengah", 19, AKSEN2))
        l_setengah.move_to([xm(Q2), 0, Z_KOTAK - 0.56])
        l_ekor = tegak(sinema.label("ekor panjang", 19, REDUP))
        l_ekor.move_to([xm(44), 0, Z_KOTAK + 0.42])

        with sinema.babak(self, "baca", DURASI) as b:
            b.main(FadeOut(l_q1), FadeOut(l_q3), FadeOut(l_q2), run_time=0.8)
            buang("label Q1", "label Q3", "label Q2")
            taruh("label setengah", l_setengah, tulisan=True)
            b.main(Indicate(kotak, scale_factor=1.05, color=AKSEN2), FadeIn(l_setengah),
                   run_time=1.8)
            b.main(Indicate(garis_med, scale_factor=1.2, color=SOROT), run_time=1.4)
            taruh("label ekor", l_ekor, tulisan=True)
            b.main(Indicate(kumis_kanan, scale_factor=1.04, color=REDUP), FadeIn(l_ekor),
                   run_time=1.8)
            b.main(FadeOut(l_setengah), FadeOut(l_ekor), run_time=0.8)
            buang("label setengah", "label ekor")
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 8 `jak`: lebar kotaknya punya nama.
        # ==================================================================
        # Kedua kurung dipisah ke atas dan ke bawah. Ditumpuk berdua di bawah
        # kotak, yang paling bawah masuk jalur subtitle (ditangkap gerbang qc),
        # sebab di sana sudah ada sumbu dan angkanya.
        Z_JAK = -0.22                 # antara kotak dan titik data
        Z_BIASA = 0.86                # di atas titik data, ruang yang masih kosong
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

        with sinema.babak(self, "jak", DURASI) as b:
            taruh("rentang jak", rentang_jak)
            taruh("angka jak", l_jak, tulisan=True)
            b.main(ShowCreation(rentang_jak), run_time=1.4)
            sinema.lahir_rumus(self, r"JAK = 25 - 10 = 15", kotak, papan, b=b, warna=AKSEN2)
            b.main(FadeIn(l_jak), run_time=0.8)
            taruh("rentang biasa", rentang_biasa)
            taruh("angka biasa", l_biasa, tulisan=True)
            b.main(ShowCreation(rentang_biasa), run_time=1.8)
            b.main(FadeIn(l_biasa), run_time=0.8)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 9 `kebal`: 55 itu ditentukan dua orang saja.
        # ==================================================================
        with sinema.babak(self, "kebal", DURASI) as b:
            b.main(Indicate(titik[0], scale_factor=2.6, color=REDUP),
                   Indicate(titik[14], scale_factor=2.6, color=REDUP), run_time=1.6)
            b.main(Indicate(rentang_biasa, scale_factor=1.02, color=REDUP), run_time=1.4)
            b.main(Indicate(rentang_jak, scale_factor=1.05, color=AKSEN2), run_time=1.4)
            b.main(FadeOut(rentang_biasa), FadeOut(l_biasa), run_time=1.0)
            buang("rentang biasa", "angka biasa")
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 10 `pagar`: pencilan ditemukan dengan hitungan.
        # ==================================================================
        garis_pagar = penggaris_tegak(PAGAR_ATAS, Z_KOTAK - 0.30, Z_TITIK + 0.44, AKSEN,
                                      2.6, putus=True)
        l_pagar = tegak(rumus("47{,}5", 20, AKSEN)).move_to([xm(PAGAR_ATAS), 0, Z_TITIK + 0.66])

        with sinema.babak(self, "pagar", DURASI) as b:
            sinema.ganti_rumus(self, papan.utama, r"25 + 22{,}5 = 47{,}5", b=b,
                               run_time=1.6, papan=papan)
            taruh("garis pagar", garis_pagar)
            taruh("angka pagar", l_pagar, tulisan=True)
            b.main(ShowCreation(garis_pagar), FadeIn(l_pagar), run_time=1.8)
            b.main(titik[14].animate.set_color(AKSEN), run_time=1.0)
            b.main(Indicate(titik[14], scale_factor=3.0, color=AKSEN), run_time=1.6)
            b.main(Indicate(l_pagar, scale_factor=1.4, color=AKSEN), run_time=1.4)
            b.jeda(1.4)
        periksa()
