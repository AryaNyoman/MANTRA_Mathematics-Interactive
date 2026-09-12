"""Video 04 Transformasi Geometri, Materi 07 "Memperbesar dan memperkecil":
Translasi, Rotasi, dan Dilatasi, Bagian 3.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (2:17)
yang sudah disetujui ARYA. DUNIANYA SAMA: cubitan dua jari terhadap titik
asal, pusat ditandai, sinar dari pusat lewat tiap sudut, titik meluncur di
garisnya, peta faktor 2 dengan sisi AB 5 jadi 10, kotak dari pusat ke B,
luas 6 jadi 24, busur sudut yang sama, faktor setengah, satu, negatif,
pusat M(1, 1) faktor 3 dengan kekeliruan (6, 3), sinar dari M.

YANG BERBEDA: pembuka sub-bab plus Bagian 3 dengan pertanyaan halaman;
segar-ingat Bagian 2 (rotasi menjaga jarak, kini jaraknya diubah); ASAL
RUMUS: kotak 6 x 1 dari pusat ke B membesar jadi 12 x 2, jadi (kx, ky)
lahir dari gambar; bentuk umum A' = M + k(A - M) dan luas k kuadrat kali
di panel; penutup menunjuk Sifat Transformasi; tiap kejadian dipicu pada
KATA (`sinema.JamKata`).

Angka contoh dan kekeliruan DIAMBIL DARI HALAMAN Materi 07: A(2, 1), k = 3,
M(1, 1) memberi A'(4, 1); mengalikan koordinat langsung memberi (6, 3).
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
from transformasi_umum import (  # noqa: E402
    L, NAMA_SUDUT, bidang_untuk, kosongkan_papan, letak_peta, poligon,
    tempel_label, titik3,
)

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "transformasi4-dilatasi"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

KOTAK_A = (0.0, 13.0, 0.0, 7.0)     # prapeta dan peta faktor 2
KOTAK_B = (-7.0, 7.0, -4.0, 4.0)    # peta faktor setengah dan faktor negatif
KOTAK_C = (0.0, 8.0, 0.0, 5.0)      # pusat bukan titik asal, dan kekeliruannya

M = (1.0, 1.0)
A_TITIK = (2.0, 1.0)
K_LAIN = 3.0
KOTAK_KECIL = [(2.0, 1.0), (3.0, 1.0), (3.0, 2.0), (2.0, 2.0)]


def dilat(p, k):
    return (k * p[0], k * p[1])


def dilat_pusat(p, k, pusat):
    return (pusat[0] + k * (p[0] - pusat[0]), pusat[1] + k * (p[1] - pusat[1]))


def luas(titik):
    n = len(titik)
    jumlah = 0.0
    for i in range(n):
        x1, y1 = titik[i]
        x2, y2 = titik[(i + 1) % n]
        jumlah += x1 * y2 - x2 * y1
    return abs(jumlah) / 2


class TransformasiDilatasi(AdeganMatra):
    def sorot_kotak(self, b, *mobs, lama=1.0):
        kotak = VGroup(*[Rectangle(width=m.get_width() + 0.2, height=m.get_height() + 0.2)
                         .set_stroke(width=0).set_fill(SOROT, 0.30).move_to(m) for m in mobs])
        self.add(kotak)
        b.main(FadeIn(kotak), run_time=lama * 0.35)
        b.main(FadeOut(kotak), run_time=lama * 0.65)
        self.remove(kotak)

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)

        peta2 = [dilat(p, 2.0) for p in L]
        peta_kecil = [dilat(p, 0.5) for p in L]
        peta_negatif = [dilat(p, -1.0) for p in L]

        pusat_a, tinggi_a = letak_peta(*KOTAK_A)
        bidang = bidang_untuk(*KOTAK_A)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat_a, tinggi=tinggi_a)
        asal = np.array([0.0, 0.0, 0.03])

        prapeta = poligon(L, TINTA, tebal=3.2, isian=0.08)
        nama_pra = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(huruf, warna=TINTA)
            t.next_to(titik3(L[i]), DOWN if i < 2 else UP, buff=0.22)
            nama_pra[huruf] = t

        # --- buka: judul sub-bab; foto (bentuk L) membesar, tanda tanya di pusat #
        # "?" di dekat titik asal: pusat yang belum disebut. Jangan di (-0,7, -0,7):
        # pada kamera KOTAK_A itu jatuh ke y layar -2,57, persis jalur subtitle.
        tanya = sinema.label("?", 40, SOROT).move_to(np.array([0.6, 0.6, 0.03]))
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Translasi")
            # Bidang dulu, baru judul di atasnya: judul memudar pada 5,2 s dan
            # "Sebuah foto" baru pada 5,5 s; tanpa bidang, 0,3 s itu layar kosong.
            b.main(FadeIn(bidang), run_time=0.5)
            sinema.judul_pembuka(self, "Translasi, Rotasi, dan Dilatasi, Bagian 3", lama=4.6, y=2.6)
            b.catat(4.6)
            b.tunggu_kata("Sebuah foto")
            b.main(ShowCreation(prapeta), run_time=0.7)
            b.tunggu_kata("diperbesar")
            b.main(prapeta.animate.scale(1.3, about_point=asal), run_time=1.0)
            b.tunggu_kata("dari mana")
            b.main(FadeIn(tanya, scale=0.6), run_time=0.6)
        qc.periksa_adegan(self, {"prapeta": prapeta}, tulisan={"tanya": tanya}, dunia={"bidang": bidang})

        # --- ingat: rotasi menjaga jarak; hari ini jaraknya diubah -------- #
        ident = sinema.identitas(self, "1 petak = 1 satuan")
        self.remove(ident)
        jari_ingat = Line(asal, titik3(dilat(L[1], 1.3))).set_stroke(AKSEN, 3.0)
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Bagian")
            self.add(ident)
            b.main(FadeOut(tanya), FadeIn(ident), prapeta.animate.scale(1.0 / 1.3, about_point=asal), run_time=0.9)
            jari_ingat.put_start_and_end_on(asal, titik3(L[1]))
            b.tunggu_kata("menjaga jarak")
            b.main(ShowCreation(jari_ingat), run_time=0.7)
            b.main(Rotate(jari_ingat, PI / 6, about_point=asal), run_time=0.9)
            b.main(Rotate(jari_ingat, -PI / 6, about_point=asal), run_time=0.7)
            b.tunggu_kata("jaraknya yang")
            b.main(jari_ingat.animate.put_start_and_end_on(asal, titik3(dilat(L[1], 1.5))), run_time=0.8)
            b.main(FadeOut(jari_ingat), run_time=0.4)
        qc.periksa_adegan(self, {"prapeta": prapeta}, hud={"identitas": ident}, dunia={"bidang": bidang})

        # --- foto: cubitan dua jari ---------------------------------------- #
        with sinema.babak(self, "foto", DURASI, kata=KATA) as b:
            b.tunggu_kata("memperbesar")
            b.main(prapeta.animate.scale(1.3, about_point=asal), run_time=1.0)
            b.tunggu_kata("satu titik")
            b.main(prapeta.animate.scale(1.0 / 1.3, about_point=asal), run_time=1.0)
        qc.periksa_adegan(self, {"prapeta": prapeta}, hud={"identitas": ident}, dunia={"bidang": bidang})

        # --- pusat: titik yang tidak bergerak ----------------------------- #
        tanda_pusat = Dot(asal, radius=0.10).set_color(SOROT)
        # Di kanan atas titik asal, bukan tepat di atasnya: di atasnya label
        # menunggangi sumbu y (lembar kontak 12 Sep 2026).
        l_pusat = sinema.label("pusat", warna=SOROT).move_to(np.array([0.8, 0.45, 0.03]))
        with sinema.babak(self, "pusat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Titik itu")
            b.main(FadeIn(tanda_pusat, scale=0.4), FadeIn(l_pusat), run_time=0.8)
            b.tunggu_kata("Tanpa")
            b.main(prapeta.animate.scale(1.3, about_point=asal), run_time=1.0)
            b.tunggu_kata("belum lengkap")
            b.main(prapeta.animate.scale(1.0 / 1.3, about_point=asal), run_time=1.0)
        qc.periksa_adegan(self, {"prapeta": prapeta, "label pusat": l_pusat}, hud={"identitas": ident},
                          dunia={"bidang": bidang})

        # --- sinar: garis dari pusat melewati tiap sudut ------------------ #
        sinar = VGroup(*[Line(asal, titik3(peta2[i])).set_stroke(REDUP, 1.6) for i in range(len(L))])
        with sinema.babak(self, "sinar", DURASI, kata=KATA) as b:
            b.tunggu_kata("Garis-garis")
            b.main(*[FadeIn(nama_pra[h]) for h in nama_pra], run_time=0.6)
            b.main(*[ShowCreation(s) for s in sinar], run_time=1.4)
            b.tunggu_kata("tiap sudut")
            b.main(Indicate(prapeta, color=AKSEN2), run_time=1.0)
        qc.periksa_adegan(self, {"prapeta": prapeta}, hud={"identitas": ident}, dunia={"bidang": bidang, "sinar": sinar})

        # --- meluncur: tiap titik berjalan di garisnya sendiri ------------ #
        titik_jalan = [Dot(titik3(p), radius=0.07).set_color(AKSEN2) for p in L]
        for d in titik_jalan:
            self.add(d)
        with sinema.babak(self, "meluncur", DURASI, kata=KATA) as b:
            b.tunggu_kata("meluncur")
            b.main(*[d.animate.move_to(titik3(peta2[i])) for i, d in enumerate(titik_jalan)], run_time=2.0)
            b.tunggu_kata("tidak pernah")
            b.main(Indicate(sinar, color=SOROT, scale_factor=1.0), run_time=1.0)
        qc.periksa_adegan(self, {"prapeta": prapeta}, hud={"identitas": ident}, dunia={"bidang": bidang, "sinar": sinar})

        # --- dua: petanya utuh, dan sisi AB benar-benar DIUKUR ------------ #
        peta_besar = poligon(peta2, AKSEN2, tebal=3.2, isian=0.12)
        nama_besar = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(f"{huruf}'", warna=AKSEN2)
            t.next_to(titik3(peta2[i]), DOWN if i < 2 else UP, buff=0.22)
            nama_besar[huruf] = t
        ruas_ab = Line(titik3(L[0]), titik3(L[1])).set_stroke(AKSEN, 4.0)
        angka_ab = sinema.label("5", warna=AKSEN)
        angka_ab.next_to(ruas_ab.get_center(), UP, buff=0.20)
        ruas_ab2 = Line(titik3(peta2[0]), titik3(peta2[1])).set_stroke(AKSEN, 4.0)
        angka_ab2 = sinema.label("10", warna=AKSEN)
        angka_ab2.next_to(ruas_ab2.get_center(), UP, buff=0.20)
        with sinema.babak(self, "dua", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dengan faktor")
            b.main(ShowCreation(peta_besar), *[FadeIn(nama_besar[h]) for h in nama_besar], run_time=1.2)
            b.tunggu_kata("Sisi AB")
            b.main(ShowCreation(ruas_ab), FadeIn(angka_ab), run_time=0.8)
            b.tunggu_kata("sepuluh")
            b.main(ShowCreation(ruas_ab2), FadeIn(angka_ab2), run_time=0.8)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_besar}, hud={"identitas": ident},
                          tulisan={"angka AB": angka_ab, "angka A'B'": angka_ab2}, dunia={"bidang": bidang, "sinar": sinar})

        # --- asal: kotak dari pusat ke B ikut membesar -------------------- #
        B = L[1]
        B_peta = peta2[1]
        kotak_b1 = poligon([(0.0, 0.0), (B[0], 0.0), (B[0], B[1]), (0.0, B[1])], AKSEN2, tebal=1.5, isian=0.10)
        kotak_b2 = poligon([(0.0, 0.0), (B_peta[0], 0.0), (B_peta[0], B_peta[1]), (0.0, B_peta[1])], SOROT, tebal=1.5,
                           isian=0.08)
        dot_b = Dot(titik3(B), radius=0.12).set_color(AKSEN)
        dot_b2 = Dot(titik3(B_peta), radius=0.12).set_color(AKSEN)
        # Angka kotak ditaruh DI DALAM kotaknya, bukan di bawah sumbu (di situ
        # angka sumbu). Sinar ke B' adalah y = x/6: di x = 4,5 ia lewat y = 0,75,
        # jadi "6" di y = 0,4 tidak tertimpa garisnya; "1" di kanan B menjauhi
        # label B; "2" di kanan B' menjauhi label B'.
        l_lebar1 = sinema.label("6", warna=AKSEN2).move_to(titik3((4.5, 0.4)))
        l_tinggi1 = sinema.label("1", warna=AKSEN2).move_to(titik3((6.6, 0.5)))
        l_lebar2 = sinema.label("12", warna=SOROT).move_to(titik3((9.0, 0.7)))
        l_tinggi2 = sinema.label("2", warna=SOROT).move_to(titik3((12.5, 1.0)))
        with sinema.babak(self, "asal", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dari mana")
            b.main(FadeOut(ruas_ab), FadeOut(angka_ab), FadeOut(ruas_ab2), FadeOut(angka_ab2), run_time=0.5)
            b.tunggu_kata("Titik B")
            b.main(FadeIn(dot_b, scale=0.4), run_time=0.4)
            b.tunggu_kata("pojok kotak")
            b.main(ShowCreation(kotak_b1), run_time=0.5)
            b.tunggu_kata("selebar")
            b.main(FadeIn(l_lebar1), run_time=0.4)
            b.tunggu_kata("setinggi")
            b.main(FadeIn(l_tinggi1), run_time=0.4)
            b.tunggu_kata("kotaknya")
            b.main(TransformFromCopy(kotak_b1, kotak_b2), FadeIn(dot_b2), run_time=1.4)
            b.tunggu_kata("lebarnya")
            b.main(FadeIn(l_lebar2), run_time=0.4)
            b.tunggu_kata("tingginya")
            b.main(FadeIn(l_tinggi2), run_time=0.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_besar, "kotak B": kotak_b1, "kotak B aksen": kotak_b2},
                          hud={"identitas": ident},
                          tulisan={"6": l_lebar1, "1": l_tinggi1, "12": l_lebar2, "2": l_tinggi2},
                          dunia={"bidang": bidang, "sinar": sinar})

        # --- aturan: B' = (12, 2); rumusnya lahir ------------------------- #
        with sinema.babak(self, "aturan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jadi")
            papan.baris(r"B(6,\ 1) \to B'(12,\ 2)", warna=AKSEN, b=b)
            b.tunggu_kata("dikalikan dua")
            b.main(Indicate(l_lebar2, color=SOROT), Indicate(l_tinggi2, color=SOROT), run_time=0.8)
            b.tunggu_kata("aturannya")
            rum = sinema.lahir_rumus(self, r"(x,\ y) \to (kx,\ ky)", dekat=peta_besar, papan=papan, b=b, warna=AKSEN2,
                                     tahan=0.5, run_time=1.0)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_besar, "kotak B": kotak_b1, "kotak B aksen": kotak_b2},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"6": l_lebar1, "1": l_tinggi1, "12": l_lebar2, "2": l_tinggi2},
                          dunia={"bidang": bidang, "sinar": sinar})

        # --- luas: angka yang paling sering ditulis salah ----------------- #
        luas_pra = luas(L)
        luas_peta = luas(peta2)
        with sinema.babak(self, "luas", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tapi")
            b.main(FadeOut(kotak_b1), FadeOut(kotak_b2), FadeOut(dot_b), FadeOut(dot_b2), FadeOut(l_lebar1),
                   FadeOut(l_tinggi1), FadeOut(l_lebar2), FadeOut(l_tinggi2), run_time=0.5)
            b.tunggu_kata("Luas bentuknya")
            b.main(prapeta.animate.set_fill(TINTA, 0.35), run_time=0.6)
            b.tunggu_kata("petanya")
            b.main(peta_besar.animate.set_fill(AKSEN2, 0.35), run_time=0.6)
            b.tunggu_kata("empat kali")
            papan.baris(rf"\text{{luas}}:\ {luas_pra:.0f} \to {luas_peta:.0f}\ \ (4\times)", warna=SOROT, b=b)
            b.tunggu_kata("sama-sama")
            papan.baris(r"AB:\ 5 \to 10\ \ (2\times)", warna=AKSEN2, b=b)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_besar},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang, "sinar": sinar})

        with sinema.babak(self, "pizza", DURASI, kata=KATA) as b:
            b.tunggu_kata("empat kali")
            papan.baris(r"4 = 2^2,\ \text{bukan } 2", warna=SOROT, b=b)
            b.tunggu_kata("bukan dua")
            b.main(prapeta.animate.set_fill(TINTA, 0.08), peta_besar.animate.set_fill(AKSEN2, 0.12), run_time=0.7)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_besar},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang, "sinar": sinar})

        # --- bentuk: sudutnya tetap ---------------------------------------- #
        busur_a = Arc(start_angle=0, angle=PI / 2, radius=0.45, arc_center=titik3(L[0])).set_stroke(SOROT, 3.0)
        busur_a2 = Arc(start_angle=0, angle=PI / 2, radius=0.90, arc_center=titik3(peta2[0])).set_stroke(SOROT, 3.0)
        with sinema.babak(self, "bentuk", DURASI, kata=KATA) as b:
            b.tunggu_kata("sudutnya")
            b.main(ShowCreation(busur_a), ShowCreation(busur_a2), run_time=1.0)
            b.tunggu_kata("Empat transformasi")
            kosongkan_papan(self, papan, b=b, run_time=0.5)
            papan.baris(r"\text{sudut tetap},\ \text{ukuran} \times 2", warna=AKSEN2, b=b)
            b.tunggu_kata("satu-satunya")
            b.main(Indicate(peta_besar, color=SOROT, scale_factor=1.0), run_time=1.0)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_besar},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang, "sinar": sinar, "busur": busur_a2})

        # --- kecil: faktor setengah, kamera berpindah --------------------- #
        pusat_b, tinggi_b = letak_peta(*KOTAK_B)
        bidang_b = bidang_untuk(*KOTAK_B)
        peta_setengah = poligon(peta_kecil, AKSEN2, tebal=3.0, isian=0.12)
        sinar_b = VGroup(*[Line(asal, titik3(peta_negatif[i])).set_stroke(REDUP, 1.6) for i in range(len(L))])
        with sinema.babak(self, "kecil", DURASI, kata=KATA) as b:
            b.tunggu_kata("Faktor")
            b.main(FadeOut(peta_besar), *[FadeOut(nama_besar[h]) for h in nama_besar], *[FadeOut(d) for d in titik_jalan],
                   FadeOut(sinar), FadeOut(busur_a), FadeOut(busur_a2), run_time=0.5)
            b.main(kamera.dunia_ke_peta(frame, pusat=pusat_b, tinggi=tinggi_b), FadeOut(bidang), FadeIn(bidang_b),
                   run_time=1.2)
            b.tunggu_kata("mengecil")
            b.main(TransformFromCopy(prapeta, peta_setengah), run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta kecil": peta_setengah},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_b})

        # --- satu: faktor satu tidak mengubah apa pun --------------------- #
        with sinema.babak(self, "satu", DURASI, kata=KATA) as b:
            b.tunggu_kata("Faktor satu")
            b.main(Indicate(prapeta, color=SOROT, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("di antara")
            papan.baris(r"0 < k < 1:\ \text{mengecil}", warna=AKSEN2, b=b)
            b.tunggu_kata("mengecil")
            b.main(Indicate(peta_setengah, color=SOROT, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("lebih dari")
            papan.baris(r"k > 1:\ \text{membesar}", warna=AKSEN, b=b)
            b.tunggu_kata("membesar")
            # Labelnya ikut dibesarkan supaya tidak lepas dari sudutnya.
            denyut = VGroup(prapeta, *nama_pra.values())
            b.main(denyut.animate.scale(1.15, about_point=asal), run_time=0.7)
            b.main(denyut.animate.scale(1.0 / 1.15, about_point=asal), run_time=0.7)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta kecil": peta_setengah},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_b})

        # --- negatif: bentuknya dilempar menyeberangi pusatnya ------------ #
        peta_seberang = poligon(peta_negatif, SOROT, tebal=3.0, isian=0.12)
        with sinema.babak(self, "negatif", DURASI, kata=KATA) as b:
            b.tunggu_kata("faktor negatif")
            b.main(FadeOut(peta_setengah), run_time=0.4)
            b.tunggu_kata("menyeberangi")
            b.main(ShowCreation(sinar_b), ShowCreation(peta_seberang), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta seberang": peta_seberang},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_b, "sinar": sinar_b})

        # --- lain: pusatnya BUKAN titik asal ------------------------------ #
        pusat_c, tinggi_c = letak_peta(*KOTAK_C)
        bidang_c = bidang_untuk(*KOTAK_C)
        kecil_c = poligon(KOTAK_KECIL, TINTA, tebal=3.0, isian=0.08)
        besar_c = poligon([dilat_pusat(p, K_LAIN, M) for p in KOTAK_KECIL], AKSEN2, tebal=3.0, isian=0.12)
        dot_m = Dot(titik3(M), radius=0.12).set_color(SOROT)
        l_m = tempel_label(sinema.label("M(1, 1)", warna=SOROT), dot_m, UP, buff=0.22)
        dot_a = Dot(titik3(A_TITIK), radius=0.12).set_color(TINTA)
        l_a = sinema.label("A(2, 1)", warna=TINTA)
        l_a.next_to(titik3(A_TITIK), DOWN, buff=0.30)
        A_PETA = dilat_pusat(A_TITIK, K_LAIN, M)
        dot_a2 = Dot(titik3(A_PETA), radius=0.12).set_color(AKSEN2)
        l_a2 = sinema.label("A'(4, 1)", warna=AKSEN2)
        l_a2.next_to(titik3(A_PETA), DOWN, buff=0.30)
        garis_m = DashedLine(titik3(M), titik3((7.4, 1.0))).set_stroke(REDUP, 2.0)
        ruas_ma = Line(titik3(M), titik3(A_TITIK)).set_stroke(AKSEN, 4.0)
        ruas_ma2 = Line(titik3(M), titik3(A_PETA)).set_stroke(AKSEN, 4.0)
        with sinema.babak(self, "lain", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang")
            kosongkan_papan(self, papan, b=b, run_time=0.5)
            # Gambar lama pergi BERSAMA perpindahan kamera, bukan sebelumnya:
            # dibuang di awal babak, petaknya kosong hampir 4 detik (12 Sep 2026).
            b.tunggu_kata("bukan titik")
            b.main(FadeOut(prapeta), *[FadeOut(nama_pra[h]) for h in nama_pra], FadeOut(peta_seberang), FadeOut(sinar_b),
                   FadeOut(tanda_pusat), FadeOut(l_pusat),
                   kamera.dunia_ke_peta(frame, pusat=pusat_c, tinggi=tinggi_c), FadeOut(bidang_b), FadeIn(bidang_c),
                   run_time=1.2)
            b.tunggu_kata("Titik A")
            b.main(ShowCreation(kecil_c), FadeIn(dot_a), FadeIn(l_a), run_time=1.0)
            b.tunggu_kata("pusatnya M")
            b.main(FadeIn(dot_m), FadeIn(l_m), ShowCreation(garis_m), run_time=1.0)
            b.tunggu_kata("Jarak A")
            b.main(ShowCreation(ruas_ma), run_time=0.7)
            b.tunggu_kata("dikalikan")
            b.main(TransformFromCopy(ruas_ma, ruas_ma2), run_time=1.0)
            b.tunggu_kata("A aksen")
            b.main(ShowCreation(besar_c), FadeIn(dot_a2), FadeIn(l_a2), FadeOut(ruas_ma), FadeOut(ruas_ma2), run_time=1.2)
        qc.periksa_adegan(self, {"persegi": kecil_c, "peta": besar_c, "pusat M": dot_m},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"label M": l_m, "label A": l_a, "label A aksen": l_a2},
                          dunia={"bidang": bidang_c, "garis": garis_m})

        # --- keliru: koordinatnya dikalikan langsung ---------------------- #
        SALAH = dilat(A_TITIK, K_LAIN)
        dot_salah = Dot(titik3(SALAH), radius=0.13).set_color(AKSEN)
        l_salah = sinema.label("(6, 3)", warna=AKSEN)
        l_salah.next_to(titik3(SALAH), UP, buff=0.28)
        garis_salah = DashedLine(titik3(M), titik3(SALAH)).set_stroke(AKSEN, 2.0)
        with sinema.babak(self, "keliru", DURASI, kata=KATA) as b:
            b.tunggu_kata("koordinatnya")
            papan.baris(r"\text{salah}:\ 3 \times (2,\ 1) = (6,\ 3)", warna=AKSEN, b=b)
            b.tunggu_kata("keluar")
            b.main(FadeIn(dot_salah), FadeIn(l_salah), run_time=0.8)
            b.tunggu_kata("bahkan tidak")
            b.main(ShowCreation(garis_salah), run_time=1.0)
            b.tunggu_kata("Yang benar")
            papan.baris(r"\text{benar}:\ A'(4,\ 1)", warna=AKSEN2, b=b)
            b.tunggu_kata("jaraknya ke")
            b.main(Indicate(dot_a2, color=SOROT), Indicate(l_a2, color=SOROT), run_time=1.0)
        qc.periksa_adegan(self, {"persegi": kecil_c, "peta": besar_c, "titik salah": dot_salah},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"label M": l_m, "label A": l_a, "label A aksen": l_a2, "label salah": l_salah},
                          dunia={"bidang": bidang_c, "garis": garis_m, "garis salah": garis_salah})

        # --- umum: A' = M + k(A - M); luas k kuadrat kali ----------------- #
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bentuk")
            kosongkan_papan(self, papan, b=b, run_time=0.5)
            b.main(FadeOut(dot_salah), FadeOut(l_salah), FadeOut(garis_salah), FadeOut(rum), run_time=0.5)
            papan.utama = None
            b.tunggu_kata("A aksen")
            rum = papan.tumbuh(r"A' = M + k\,(A - M)", run_time=1.0, b=b)
            b.tunggu_kata("Kalau M")
            papan.baris(r"M = O:\ (x,\ y) \to (kx,\ ky)", warna=AKSEN2, b=b)
            b.tunggu_kata("luasnya")
            papan.baris(r"\text{luas} \times k^2", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"persegi": kecil_c, "peta": besar_c, "pusat M": dot_m},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"label M": l_m, "label A": l_a, "label A aksen": l_a2},
                          dunia={"bidang": bidang_c, "garis": garis_m})

        # --- rangkum: sinar dari M, lalu satu pertanyaan ------------------ #
        sinar_c = VGroup(*[Line(titik3(M), titik3(dilat_pusat(p, K_LAIN, M))).set_stroke(REDUP, 1.6) for p in KOTAK_KECIL])
        with sinema.babak(self, "rangkum", DURASI, kata=KATA) as b:
            b.tunggu_kata("mengalikan")
            b.main(ShowCreation(sinar_c), run_time=1.2)
            b.tunggu_kata("faktor yang")
            b.main(Indicate(besar_c, color=SOROT, scale_factor=1.0), run_time=0.9)
            b.tunggu_kata("dua puluh lima")
            papan.baris(r"\text{luas} \times 25 \Rightarrow k = ?", warna=AKSEN, b=b)
        qc.periksa_adegan(self, {"persegi": kecil_c, "peta": besar_c, "pusat M": dot_m},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"label M": l_m, "label A": l_a, "label A aksen": l_a2},
                          dunia={"bidang": bidang_c, "garis": garis_m, "sinar": sinar_c})

        # --- lanjut: Sifat Transformasi ----------------------------------- #
        judul_lanjut = teks("Sifat Transformasi", 30, SOROT).move_to([0, 2.9, 0]).fix_in_frame()
        # Lima nama transformasi disusun KE BAWAH sebagai HUD (fix_in_frame) di
        # kanan bidang (x layar 4,2): bidang KOTAK_C berakhir di x layar 0,97 dan
        # puncaknya y layar 2,0, jadi baris mendatar di y 1,85 menindihnya (qc
        # menolak, 12 Sep 2026); zona rumus di kanan kosong pada babak ini.
        lima = VGroup(*[sinema.label(n, 26, TINTA) for n in ("cermin garis", "cermin titik", "geser", "putar")] +
                      [sinema.label("perbesar", 26, AKSEN)])
        lima.arrange(DOWN, buff=0.28, aligned_edge=LEFT).move_to(np.array([4.2, 0.4, 0.0])).fix_in_frame()
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di materi")
            b.main(FadeOut(papan.semua()), run_time=0.5)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self)
            self.hud_tambah(judul_lanjut, lima)
            self.remove(judul_lanjut, lima)
            b.tunggu_kata("Sifat")
            b.main(FadeIn(judul_lanjut, shift=0.2 * UP), run_time=0.7)
            b.tunggu_kata("dijajarkan")
            b.main(LaggedStartMap(FadeIn, lima, lag_ratio=0.2), run_time=1.2)
            b.tunggu_kata("mengubah luas")
            b.main(Indicate(lima[4], color=AKSEN), run_time=0.9)
        qc.periksa_adegan(self, {"persegi": kecil_c, "peta": besar_c, "pusat M": dot_m},
                          hud={"identitas": ident, "judul": judul_lanjut, "lima": lima},
                          tulisan={"label M": l_m, "label A": l_a, "label A aksen": l_a2},
                          dunia={"bidang": bidang_c, "garis": garis_m, "sinar": sinar_c})

        sinema.laporkan_pemicu(self)
