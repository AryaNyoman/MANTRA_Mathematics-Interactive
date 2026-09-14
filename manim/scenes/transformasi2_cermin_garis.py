"""Video 02 Transformasi Geometri, Materi 02 "Cermin pada garis tegak dan mendatar".

STANDAR VIDEO v3 (8 September 2026). Ditulis ulang dari versi 2 yang 125 detik
dan 18 babak jadi 263 detik dan 31 babak.

APA YANG BERUBAH DARI VERSI 2, DAN KENAPA
1. RUMUS 2k - x SEKARANG DIBUKTIKAN. Versi 2 menyebut rumusnya lebih dulu lalu
   mengujinya pada dua titik. Sekarang empat babak `umum_*` menurunkannya dari
   jarak: jaraknya k - x, bayangannya sejauh itu lagi dari cermin, jadi
   letaknya k + (k - x), yang dirapikan menjadi 2k - x. Angka baru dipakai lagi
   sesudah rumusnya lahir.
2. ADA SEGAR-INGAT KE VIDEO 01. Bukan pemutaran ulang: yang diambil satu
   gagasan kunci, "jarak tiap titik ke garis lipatan tidak berubah", sebab
   gagasan itulah yang membuat rumus video ini bisa diturunkan.
3. SATU KOTAK KAMERA UNTUK SELURUH BAGIAN MATEMATIKANYA. Versi 2 memakai dua
   kotak: cermin di sumbu Y dulu, baru digeser ke x = 5. Cerminnya sekarang
   langsung di x = 5 sejak babak kaca, jadi kacanya dan garis cerminnya benda
   yang sama, dan tidak ada satu pun perpindahan kamera di tengah hitungan.
4. ANIMASI DIPICU PER KATA lewat `sinema.JamKata` dan `b.tunggu_kata`.

TIDAK ADA 3D di video ini: pembuka 3D hanya untuk video PERTAMA tiap topik.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
from transformasi_umum import (  # noqa: E402
    L, NAMA_SUDUT, bidang_untuk, letak_peta, poligon, tempel_label, titik3,
)

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "transformasi2-cermin-garis"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

TEBAL_BENTUK = 5.0
TEBAL_BANTU = 3.0
JARI_TITIK = 0.13

# Satu kotak untuk seluruh video. Muat: bentuk L (x 1..6), petanya di seberang
# cermin (x 4..9), sosok orang beserta bayangannya (x 3 dan 7), dan bentuk
# kecil untuk cermin mendatar di akhir.
KOTAK = (0.0, 10.0, 0.0, 4.0)
K = 5.0          # letak cermin tegak; angka yang sama dengan halaman Materi 02
H_DATAR = 2.0    # letak cermin mendatar di babak penutup

# Bentuk kecil untuk cermin mendatar. Setengah ukuran, dan itu keharusan
# aritmetika: kotak ini setinggi 4 satuan sedangkan huruf L aslinya setinggi 2,
# jadi ia tidak mungkin muat seluruhnya di satu sisi cermin yang juga butuh
# ruang untuk bayangannya.
KECIL = [(3.0, 0.5), (5.5, 0.5), (5.5, 1.0), (3.5, 1.0), (3.5, 1.5), (3.0, 1.5)]


def cermin_tegak(p, k):
    return (2 * k - p[0], p[1])


def cermin_datar(p, h):
    return (p[0], 2 * h - p[1])


def geser_saja(p):
    """Kekeliruan yang diperagakan: bentuknya DIPINDAH ke seberang, tanpa dibalik.

    Digeser +3 supaya mendarat di kotak yang PERSIS sama dengan peta yang benar
    (keduanya x = 4 sampai 9), sehingga bedanya murni pada bentuknya, bukan
    pada letaknya.
    """
    return (p[0] + 3.0, p[1])


def sosok(pusat_x, pusat_y):
    """Sosok orang yang TIDAK simetris, supaya bayangannya terlihat menghadap
    arah sebaliknya. Sebuah titik tidak bisa menunjukkan itu, sebab titik tidak
    punya arah."""
    return [
        (pusat_x - 0.56, pusat_y - 1.12),
        (pusat_x + 0.56, pusat_y - 1.12),
        (pusat_x + 0.56, pusat_y + 0.32),
        (pusat_x, pusat_y + 1.12),
    ]


class TransformasiCerminGaris(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)

        peta_benar = [cermin_tegak(p, K) for p in L]
        A, B = L[0], L[1]
        A_peta, B_peta = peta_benar[0], peta_benar[1]

        ident = None

        def hud_kini():
            isi = {}
            if ident is not None:
                isi["identitas"] = ident
            papan_isi = papan.semua()
            if papan_isi is not None:
                isi["papan"] = papan_isi
            return isi

        # ================================================================ #
        # PEMBUKA                                                           #
        # ================================================================ #
        tanya_buka = rumus(r"\text{Cerminnya digeser: rumusnya jadi apa?}", 40, TINTA)
        sinema.batasi_lebar(tanya_buka, 10.0)
        tanya_buka.move_to(ORIGIN)

        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Prapeta")
            # lama 4,3 (dulu 5,0): narasi Bian sampai di "Cerminnya" pada 4,4 s (14 Sep 2026)
            sinema.judul_pembuka(self, "Prapeta, Peta, dan Pencerminan, Bagian 2", lama=4.3, y=2.6)
            b.catat(4.3)
            # Pertanyaannya muncul pada "Cerminnya", bukan "Kalau garisnya":
            # judul memudar lalu jeda 3 detik itu terbaca cek_layar_kosong
            # sebagai layar kosong (12 Sep 2026).
            b.tunggu_kata("Cerminnya")
            b.main(FadeIn(tanya_buka, shift=0.3 * UP), run_time=1.0)

        # ================================================================ #
        # SEGAR-INGAT VIDEO 01                                              #
        # ================================================================ #
        rum_lama = rumus(r"(x,\ y) \to (x,\ -y)", 44, AKSEN2)
        rum_lama.move_to(np.array([0.0, 1.4, 0.0]))
        # Gambar ringkas video 01: satu titik, sumbu mendatar, bayangannya.
        sumbu_ingat = DashedLine(
            np.array([-3.4, -0.9, 0.0]), np.array([3.4, -0.9, 0.0]),
        ).set_stroke(SOROT, 3.0)
        t_atas = Dot(np.array([-1.4, 0.1, 0.0]), radius=JARI_TITIK).set_color(AKSEN)
        t_bawah = Dot(np.array([-1.4, -1.9, 0.0]), radius=JARI_TITIK).set_color(AKSEN2)
        ruas_ingat_a = Line(np.array([-1.4, -0.9, 0.0]),
                            np.array([-1.4, 0.1, 0.0])).set_stroke(AKSEN, TEBAL_BANTU)
        ruas_ingat_b = Line(np.array([-1.4, -0.9, 0.0]),
                            np.array([-1.4, -1.9, 0.0])).set_stroke(AKSEN, TEBAL_BANTU)

        with sinema.babak(self, "ingat_satu", DURASI, kata=KATA) as b:
            b.tunggu_kata("Setiap titik")
            b.main(FadeOut(tanya_buka), FadeIn(rum_lama, shift=0.25 * UP), run_time=1.2)
            b.tunggu_kata("aturan")
            b.main(Indicate(rum_lama, color=SOROT), run_time=1.4)

        with sinema.babak(self, "ingat_jarak", DURASI, kata=KATA) as b:
            b.tunggu_kata("jarak setiap titik")
            b.main(ShowCreation(sumbu_ingat), FadeIn(t_atas), run_time=1.2)
            b.main(ShowCreation(ruas_ingat_a), run_time=0.9)
            b.tunggu_kata("sisi yang lain")
            b.main(ShowCreation(ruas_ingat_b), FadeIn(t_bawah), run_time=1.4)
        qc.periksa_adegan(self, {"rumus lama": rum_lama, "titik atas": t_atas,
                                 "titik bawah": t_bawah})

        with sinema.babak(self, "bawa", DURASI, kata=KATA) as b:
            b.tunggu_kata("boleh ada di mana saja")
            # 1,0 dan 0,7 detik (dulu 1,4 dan 1,2): frasa ini yang terakhir, narasi
            # Bian menyisakan 1,9 detik (14 Sep 2026)
            b.main(sumbu_ingat.animate.shift(0.9 * UP), run_time=1.0)
            b.main(Indicate(sumbu_ingat, color=AKSEN), run_time=0.7)

        # ================================================================ #
        # KACA: dua meter di depan, dua meter di belakang                   #
        # ================================================================ #
        pusat_peta, tinggi_peta = letak_peta(*KOTAK)
        bidang = bidang_untuk(*KOTAK)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat_peta, tinggi=tinggi_peta)

        ORANG = (3.0, 2.0)
        BAYANG = cermin_tegak(ORANG, K)
        kaca = DashedLine(
            titik3((K, -0.2)), titik3((K, 4.2)),
        ).set_stroke(SOROT, 4.0)
        dot_orang = poligon(sosok(*ORANG), TINTA, tebal=4.0, isian=0.16)
        l_orang = tempel_label(sinema.label("kamu", warna=TINTA), dot_orang, UP)
        dot_bayang = poligon([cermin_tegak(t, K) for t in sosok(*ORANG)],
                             AKSEN2, tebal=4.0, isian=0.20)
        l_bayang = tempel_label(sinema.label("bayangan", warna=AKSEN2), dot_bayang, UP)
        ruas_orang = Line(titik3(ORANG), titik3((K, ORANG[1]))).set_stroke(AKSEN, TEBAL_BANTU)
        angka_orang = sinema.label("2", warna=AKSEN)
        angka_orang.next_to(ruas_orang.get_center(), DOWN, buff=0.18)
        ruas_bayang = Line(titik3((K, ORANG[1])), titik3(BAYANG)).set_stroke(AKSEN, TEBAL_BANTU)
        angka_bayang = sinema.label("2", warna=AKSEN)
        angka_bayang.next_to(ruas_bayang.get_center(), DOWN, buff=0.18)

        with sinema.babak(self, "kaca", DURASI, kata=KATA) as b:
            b.main(
                FadeOut(rum_lama), FadeOut(sumbu_ingat), FadeOut(t_atas),
                FadeOut(t_bawah), FadeOut(ruas_ingat_a), FadeOut(ruas_ingat_b),
                run_time=0.6,
            )
            b.tunggu_kata("kaca")
            b.main(FadeIn(bidang), ShowCreation(kaca), run_time=1.2)
            ident = sinema.identitas(self, "1 petak = 1 satuan")
            b.tunggu_kata("Bayanganmu")
            b.main(ShowCreation(dot_orang), FadeIn(l_orang), run_time=1.2)
        qc.periksa_adegan(self, {"orang": dot_orang}, hud=hud_kini(),
                          tulisan={"label orang": l_orang},
                          dunia={"bidang": bidang, "kaca": kaca})

        with sinema.babak(self, "jarak_kaca", DURASI, kata=KATA) as b:
            b.tunggu_kata("di belakang kaca")
            b.main(ShowCreation(dot_bayang), FadeIn(l_bayang), run_time=1.4)
            b.tunggu_kata("empat meter")
            b.main(ShowCreation(ruas_orang), FadeIn(angka_orang),
                   ShowCreation(ruas_bayang), FadeIn(angka_bayang), run_time=1.4)
        qc.periksa_adegan(
            self, {"orang": dot_orang, "bayangan": dot_bayang},
            hud=hud_kini(),
            tulisan={"label orang": l_orang, "label bayangan": l_bayang,
                     "angka orang": angka_orang, "angka bayangan": angka_bayang},
            dunia={"bidang": bidang, "kaca": kaca},
        )

        with sinema.babak(self, "dua_hal", DURASI, kata=KATA) as b:
            b.tunggu_kata("di sisi mana")
            b.main(Indicate(dot_bayang, color=SOROT), run_time=1.3)
            b.tunggu_kata("sejauh berapa")
            b.main(Indicate(angka_orang, color=SOROT),
                   Indicate(angka_bayang, color=SOROT), run_time=1.3)
        qc.periksa_adegan(self, {"orang": dot_orang, "bayangan": dot_bayang},
                          hud=hud_kini(), dunia={"bidang": bidang, "kaca": kaca})

        # ================================================================ #
        # PETA: bentuk huruf L, cermin di x = 5                             #
        # ================================================================ #
        prapeta = poligon(L, TINTA, tebal=TEBAL_BENTUK, isian=0.14)
        nama_pra = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(huruf, warna=TINTA)
            t.next_to(titik3(L[i]), DOWN if i < 2 else UP, buff=0.24)
            nama_pra[huruf] = t
        l_k = sinema.label("x = 5", warna=SOROT)
        l_k.next_to(titik3((K, 4.0)), UP, buff=0.18)

        with sinema.babak(self, "peta_masuk", DURASI, kata=KATA) as b:
            b.main(
                FadeOut(dot_orang), FadeOut(l_orang), FadeOut(dot_bayang),
                FadeOut(l_bayang), FadeOut(ruas_orang), FadeOut(ruas_bayang),
                FadeOut(angka_orang), FadeOut(angka_bayang),
                run_time=0.8,
            )
            b.tunggu_kata("huruf L")
            b.main(ShowCreation(prapeta), *[FadeIn(nama_pra[h]) for h in nama_pra],
                   run_time=1.8)
        qc.periksa_adegan(self, {"prapeta": prapeta}, hud=hud_kini(),
                          dunia={"bidang": bidang, "kaca": kaca})

        with sinema.babak(self, "garis_lima", DURASI, kata=KATA) as b:
            b.tunggu_kata("garis tegak")
            b.main(FadeIn(l_k), run_time=1.0)
            b.tunggu_kata("ungu")
            b.main(Indicate(kaca, color=AKSEN2), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta}, hud=hud_kini(),
                          tulisan={"label k": l_k},
                          dunia={"bidang": bidang, "kaca": kaca})

        # ================================================================ #
        # CONTOH ANGKA: titik A, lalu titik B di sisi seberang              #
        # ================================================================ #
        dot_a = Dot(titik3(A), radius=JARI_TITIK).set_color(AKSEN)
        l_a = sinema.label("(1, 1)", warna=AKSEN)
        # Di bawah huruf "A", bukan di bawah titiknya: di bawah titik ia
        # menindih huruf A (terlihat di lembar kontak 1080p, 12 Sep 2026).
        l_a.next_to(nama_pra["A"], DOWN, buff=0.10)
        ruas_a1 = Line(titik3(A), titik3((K, A[1]))).set_stroke(AKSEN, 4.0)
        angka_a1 = sinema.label("4", warna=AKSEN)
        angka_a1.next_to(ruas_a1.get_center(), UP, buff=0.18)

        with sinema.babak(self, "titik_a", DURASI, kata=KATA) as b:
            b.tunggu_kata("titik A")
            b.main(FadeIn(dot_a, scale=0.4), FadeIn(l_a), run_time=1.0)
            b.tunggu_kata("Hitung petaknya")
            b.main(ShowCreation(ruas_a1), FadeIn(angka_a1), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "titik A": dot_a},
                          hud=hud_kini(),
                          tulisan={"label A": l_a, "angka A": angka_a1, "label k": l_k,
                                   "nama A": nama_pra["A"], "nama B": nama_pra["B"]},
                          dunia={"bidang": bidang, "kaca": kaca})

        ruas_a2 = Line(titik3((K, A[1])), titik3(A_peta)).set_stroke(AKSEN, 4.0)
        angka_a2 = sinema.label("4", warna=AKSEN)
        angka_a2.next_to(ruas_a2.get_center(), UP, buff=0.18)
        dot_a2 = Dot(titik3(A_peta), radius=JARI_TITIK).set_color(AKSEN2)
        l_a2 = sinema.label("(9, 1)", warna=AKSEN2)
        l_a2.next_to(titik3(A_peta), DOWN, buff=0.26)

        with sinema.babak(self, "seberang_a", DURASI, kata=KATA) as b:
            b.tunggu_kata("empat petak juga")
            b.main(ShowCreation(ruas_a2), FadeIn(angka_a2), run_time=1.4)
            b.tunggu_kata("sembilan")
            b.main(FadeIn(dot_a2, scale=0.4), run_time=1.0)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "titik A": dot_a, "titik A aksen": dot_a2},
            hud=hud_kini(),
            tulisan={"label A": l_a, "angka A": angka_a1, "angka A2": angka_a2,
                     "label k": l_k},
            dunia={"bidang": bidang, "kaca": kaca},
        )

        with sinema.babak(self, "hasil_a", DURASI, kata=KATA) as b:
            b.tunggu_kata("A aksen")
            b.main(FadeIn(l_a2), run_time=1.0)
            b.tunggu_kata("Tingginya tetap")
            b.main(Indicate(dot_a, color=SOROT), Indicate(dot_a2, color=SOROT),
                   run_time=1.4)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "titik A": dot_a, "titik A aksen": dot_a2},
            hud=hud_kini(),
            tulisan={"label A": l_a, "label A aksen": l_a2, "label k": l_k},
            dunia={"bidang": bidang, "kaca": kaca},
        )

        dot_b = Dot(titik3(B), radius=JARI_TITIK).set_color(SOROT)
        l_b = sinema.label("(6, 1)", warna=SOROT)
        l_b.next_to(titik3(B), DOWN, buff=0.26)
        ruas_b1 = Line(titik3((K, B[1])), titik3(B)).set_stroke(SOROT, 4.0)
        angka_b1 = sinema.label("1", warna=SOROT)
        angka_b1.next_to(ruas_b1.get_center(), UP, buff=0.18)

        with sinema.babak(self, "titik_b", DURASI, kata=KATA) as b:
            b.main(FadeOut(ruas_a1), FadeOut(ruas_a2),
                   FadeOut(angka_a1), FadeOut(angka_a2), run_time=0.45)
            b.tunggu_kata("titik B")
            b.main(FadeIn(dot_b, scale=0.4), FadeIn(l_b), run_time=1.0)
            b.tunggu_kata("satu petak")
            b.main(ShowCreation(ruas_b1), FadeIn(angka_b1), run_time=1.3)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "titik B": dot_b},
            hud=hud_kini(),
            tulisan={"label B": l_b, "angka B": angka_b1, "label k": l_k},
            dunia={"bidang": bidang, "kaca": kaca},
        )

        ruas_b2 = Line(titik3(B_peta), titik3((K, B[1]))).set_stroke(SOROT, 4.0)
        angka_b2 = sinema.label("1", warna=SOROT)
        angka_b2.next_to(ruas_b2.get_center(), UP, buff=0.18)
        dot_b2 = Dot(titik3(B_peta), radius=JARI_TITIK).set_color(AKSEN2)
        l_b2 = sinema.label("(4, 1)", warna=AKSEN2)
        l_b2.next_to(titik3(B_peta), DOWN, buff=0.26)

        with sinema.babak(self, "seberang_b", DURASI, kata=KATA) as b:
            b.tunggu_kata("di kiri cermin")
            b.main(ShowCreation(ruas_b2), FadeIn(angka_b2), run_time=1.3)
            b.tunggu_kata("B aksen")
            b.main(FadeIn(dot_b2, scale=0.4), FadeIn(l_b2), run_time=1.2)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "titik B": dot_b, "titik B aksen": dot_b2},
            hud=hud_kini(),
            tulisan={"label B": l_b, "label B aksen": l_b2, "label k": l_k},
            dunia={"bidang": bidang, "kaca": kaca},
        )

        # ================================================================ #
        # ASAL RUMUS: 2k - x diturunkan dari jarak, bukan disodorkan        #
        # ================================================================ #
        P_UMUM = (2.0, 3.0)
        dot_p = Dot(titik3(P_UMUM), radius=JARI_TITIK).set_color(SOROT)
        l_p = sinema.label("(x, y)", warna=SOROT)
        l_p.next_to(titik3(P_UMUM), UP, buff=0.24)
        ruas_p1 = Line(titik3(P_UMUM), titik3((K, P_UMUM[1]))).set_stroke(SOROT, 4.0)
        l_selisih = sinema.label("k - x", warna=SOROT)
        l_selisih.next_to(ruas_p1.get_center(), UP, buff=0.18)

        with sinema.babak(self, "umum_jarak", DURASI, kata=KATA) as b:
            b.main(
                FadeOut(dot_a), FadeOut(dot_a2), FadeOut(l_a), FadeOut(l_a2),
                FadeOut(dot_b), FadeOut(dot_b2), FadeOut(l_b), FadeOut(l_b2),
                FadeOut(ruas_b1), FadeOut(ruas_b2), FadeOut(angka_b1), FadeOut(angka_b2),
                run_time=0.8,
            )
            b.tunggu_kata("sembarang")
            b.main(FadeIn(dot_p, scale=0.4), FadeIn(l_p), run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta, "titik P": dot_p},
                          hud=hud_kini(), tulisan={"label P": l_p, "label k": l_k},
                          dunia={"bidang": bidang, "kaca": kaca})

        with sinema.babak(self, "umum_selisih", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jaraknya ke cermin")
            b.main(ShowCreation(ruas_p1), FadeIn(l_selisih), run_time=1.4)
            b.tunggu_kata("Cocok")
            b.main(Indicate(ruas_p1, color=AKSEN), run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta, "titik P": dot_p},
                          hud=hud_kini(),
                          tulisan={"label P": l_p, "label selisih": l_selisih,
                                   "label k": l_k},
                          dunia={"bidang": bidang, "kaca": kaca})

        P_PETA = cermin_tegak(P_UMUM, K)
        dot_p2 = Dot(titik3(P_PETA), radius=JARI_TITIK).set_color(AKSEN2)
        ruas_p2 = Line(titik3((K, P_UMUM[1])), titik3(P_PETA)).set_stroke(AKSEN2, 4.0)
        l_selisih2 = sinema.label("k - x", warna=AKSEN2)
        l_selisih2.next_to(ruas_p2.get_center(), UP, buff=0.18)

        with sinema.babak(self, "umum_tambah", DURASI, kata=KATA) as b:
            b.tunggu_kata("sejauh itu lagi")
            b.main(ShowCreation(ruas_p2), FadeIn(l_selisih2),
                   FadeIn(dot_p2, scale=0.4), run_time=1.6)
            b.tunggu_kata("letaknya")
            papan.baris(r"k + (k - x)", warna=SOROT, b=b)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "titik P": dot_p, "titik P aksen": dot_p2},
            hud=hud_kini(),
            tulisan={"label P": l_p, "label selisih": l_selisih,
                     "label selisih 2": l_selisih2, "label k": l_k},
            dunia={"bidang": bidang, "kaca": kaca},
        )

        with sinema.babak(self, "umum_rapikan", DURASI, kata=KATA) as b:
            b.tunggu_kata("dijumlahkan")
            papan.baris(r"= 2k - x", warna=AKSEN, b=b)
            b.tunggu_kata("lahir dari jarak")
            b.main(Indicate(ruas_p1, color=AKSEN), Indicate(ruas_p2, color=AKSEN),
                   run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "titik P": dot_p},
                          hud=hud_kini(),
                          dunia={"bidang": bidang, "kaca": kaca})

        with sinema.babak(self, "rumus", DURASI, kata=KATA) as b:
            b.tunggu_kata("Aturannya")
            rum = sinema.lahir_rumus(
                self, r"(x,\ y) \to (2k - x,\ y)",
                dekat=dot_p, papan=papan, b=b, warna=SOROT,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta, "titik P": dot_p},
                          hud=hud_kini(),
                          dunia={"bidang": bidang, "kaca": kaca})

        with sinema.babak(self, "uji_rumus", DURASI, kata=KATA) as b:
            b.main(
                FadeOut(dot_p), FadeOut(dot_p2), FadeOut(l_p),
                FadeOut(ruas_p1), FadeOut(ruas_p2),
                FadeOut(l_selisih), FadeOut(l_selisih2),
                run_time=0.8,
            )
            b.tunggu_kata("sembilan")
            b.main(FadeIn(dot_a, scale=0.4), FadeIn(dot_a2, scale=0.4), run_time=1.0)
            b.tunggu_kata("empat")
            b.main(FadeIn(dot_b, scale=0.4), FadeIn(dot_b2, scale=0.4), run_time=1.0)
            b.tunggu_kata("cocok")
            b.main(Indicate(prapeta, color=AKSEN2), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "titik A": dot_a, "titik B": dot_b},
                          hud=hud_kini(), dunia={"bidang": bidang, "kaca": kaca})

        with sinema.babak(self, "dua_arah", DURASI, kata=KATA) as b:
            b.tunggu_kata("Rumus yang sama")
            b.main(Indicate(dot_a, color=AKSEN), Indicate(dot_a2, color=AKSEN),
                   run_time=1.3)
            b.tunggu_kata("aturan terpisah")
            b.main(Indicate(dot_b, color=SOROT), Indicate(dot_b2, color=SOROT),
                   run_time=1.3)
        qc.periksa_adegan(self, {"prapeta": prapeta, "titik A": dot_a, "titik B": dot_b},
                          hud=hud_kini(), dunia={"bidang": bidang, "kaca": kaca})

        # ================================================================ #
        # PETA UTUH, lalu kekeliruan                                        #
        # ================================================================ #
        peta = poligon(peta_benar, AKSEN2, tebal=TEBAL_BENTUK, isian=0.20)
        nama_peta = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(f"{huruf}'", warna=AKSEN2)
            t.next_to(titik3(peta_benar[i]), DOWN if i < 2 else UP, buff=0.24)
            nama_peta[huruf] = t

        with sinema.babak(self, "peta_utuh", DURASI, kata=KATA) as b:
            b.main(FadeOut(dot_a), FadeOut(dot_a2), FadeOut(dot_b), FadeOut(dot_b2),
                   run_time=0.6)
            b.tunggu_kata("keenam sudutnya")
            b.main(ShowCreation(peta), *[FadeIn(nama_peta[h]) for h in nama_peta],
                   run_time=1.8)
            b.tunggu_kata("terbalik")
            b.main(Indicate(peta, color=SOROT), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta}, hud=hud_kini(),
                          dunia={"bidang": bidang, "kaca": kaca})

        salah = poligon([geser_saja(p) for p in L], AKSEN, tebal=TEBAL_BENTUK, isian=0.16)

        with sinema.babak(self, "keliru", DURASI, kata=KATA) as b:
            b.main(FadeOut(peta), *[FadeOut(nama_peta[h]) for h in nama_peta],
                   run_time=0.7)
            b.tunggu_kata("merah")
            b.main(ShowCreation(salah), run_time=1.8)
        qc.periksa_adegan(self, {"prapeta": prapeta, "salah": salah}, hud=hud_kini(),
                          dunia={"bidang": bidang, "kaca": kaca})

        dot_salah = Dot(titik3(geser_saja(A)), radius=JARI_TITIK).set_color(AKSEN)
        l_salah = sinema.label("(4, 1)", warna=AKSEN)
        l_salah.next_to(titik3(geser_saja(A)), DOWN, buff=0.26)

        with sinema.babak(self, "betul", DURASI, kata=KATA) as b:
            b.tunggu_kata("lihat titik A")
            b.main(FadeIn(dot_a, scale=0.4), FadeIn(l_a), run_time=1.0)
            b.tunggu_kata("mendarat di sembilan")
            b.main(FadeOut(salah), ShowCreation(peta),
                   FadeIn(dot_a2, scale=0.4), FadeIn(l_a2), run_time=1.3)
            b.tunggu_kata("dipindah mendarat")
            b.main(FadeIn(dot_salah, scale=0.4), FadeIn(l_salah), run_time=1.2)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "peta": peta, "titik salah": dot_salah},
            hud=hud_kini(),
            tulisan={"label A": l_a, "label A aksen": l_a2, "label salah": l_salah},
            dunia={"bidang": bidang, "kaca": kaca},
        )

        with sinema.babak(self, "pelajaran", DURASI, kata=KATA) as b:
            b.tunggu_kata("Satu titik")
            b.main(Indicate(dot_a2, color=SOROT), Indicate(dot_salah, color=SOROT),
                   run_time=1.6)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta}, hud=hud_kini(),
                          dunia={"bidang": bidang, "kaca": kaca})

        # ================================================================ #
        # CERMIN MENDATAR                                                   #
        # ================================================================ #
        garis_datar = DashedLine(
            titik3((0.6, H_DATAR)), titik3((9.4, H_DATAR)),
        ).set_stroke(SOROT, 4.0)
        l_h = sinema.label("y = 2", warna=SOROT)
        l_h.next_to(titik3((1.2, H_DATAR)), UP, buff=0.20)
        kecil_pra = poligon(KECIL, TINTA, tebal=3.4, isian=0.14)
        kecil_peta = poligon([cermin_datar(p, H_DATAR) for p in KECIL],
                             AKSEN2, tebal=3.4, isian=0.20)

        with sinema.babak(self, "mendatar_gagasan", DURASI, kata=KATA) as b:
            b.main(
                FadeOut(prapeta), *[FadeOut(nama_pra[h]) for h in nama_pra],
                FadeOut(peta), FadeOut(dot_a), FadeOut(dot_a2), FadeOut(l_a),
                FadeOut(l_a2), FadeOut(dot_salah), FadeOut(l_salah),
                FadeOut(kaca), FadeOut(l_k),
                run_time=0.5,
            )
            b.tunggu_kata("cermin mendatar")
            b.main(ShowCreation(garis_datar), FadeIn(l_h), run_time=1.4)
        qc.periksa_adegan(self, {}, hud=hud_kini(), tulisan={"label h": l_h},
                          dunia={"bidang": bidang, "cermin datar": garis_datar})

        with sinema.babak(self, "mendatar_gambar", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bendanya di bawah")
            b.main(ShowCreation(kecil_pra), run_time=1.1)
            b.tunggu_kata("bayangannya di atas")
            b.main(ShowCreation(kecil_peta), run_time=1.6)
        qc.periksa_adegan(self, {"benda": kecil_pra, "bayangan": kecil_peta},
                          hud=hud_kini(), tulisan={"label h": l_h},
                          dunia={"bidang": bidang, "cermin datar": garis_datar})

        with sinema.babak(self, "mendatar_rumus", DURASI, kata=KATA) as b:
            b.tunggu_kata("aturannya menjadi")
            papan.baris(r"(x,\ y) \to (x,\ 2h - y)", warna=AKSEN, b=b)
            b.tunggu_kata("mendatarnya")
            b.main(Indicate(garis_datar, color=AKSEN2), run_time=1.4)
        qc.periksa_adegan(self, {"benda": kecil_pra, "bayangan": kecil_peta},
                          hud=hud_kini(), tulisan={"label h": l_h},
                          dunia={"bidang": bidang, "cermin datar": garis_datar})

        # ================================================================ #
        # PENUTUP                                                           #
        # ================================================================ #
        SUDUT_P = KECIL[0]
        kaki = np.array([SUDUT_P[0], H_DATAR, 0.03])
        ruas_bawah = Line(titik3(SUDUT_P), kaki).set_stroke(AKSEN, 4.0)
        ruas_atas = Line(kaki, titik3(cermin_datar(SUDUT_P, H_DATAR))).set_stroke(AKSEN, 4.0)
        angka_bawah = sinema.label("1,5", warna=AKSEN)
        angka_bawah.next_to(ruas_bawah.get_center(), LEFT, buff=0.20)
        angka_atas = sinema.label("1,5", warna=AKSEN)
        angka_atas.next_to(ruas_atas.get_center(), LEFT, buff=0.20)

        with sinema.babak(self, "rangkum", DURASI, kata=KATA) as b:
            b.tunggu_kata("sama jauh")
            b.main(ShowCreation(ruas_bawah), FadeIn(angka_bawah),
                   ShowCreation(ruas_atas), FadeIn(angka_atas), run_time=1.6)
            b.tunggu_kata("tegak lurus")
            b.main(Indicate(kecil_pra, color=SOROT), Indicate(kecil_peta, color=SOROT),
                   run_time=1.4)
        qc.periksa_adegan(
            self, {"benda": kecil_pra, "bayangan": kecil_peta},
            hud=hud_kini(),
            tulisan={"label h": l_h, "angka bawah": angka_bawah, "angka atas": angka_atas},
            dunia={"bidang": bidang, "cermin datar": garis_datar},
        )

        titik_di_cermin = Dot(titik3((7.5, H_DATAR)), radius=0.16).set_color(AKSEN)
        l_di_cermin = sinema.label("di cermin", warna=AKSEN)
        l_di_cermin.next_to(titik_di_cermin, UP, buff=0.26)

        with sinema.babak(self, "tanya", DURASI, kata=KATA) as b:
            b.main(FadeOut(ruas_bawah), FadeOut(ruas_atas),
                   FadeOut(angka_bawah), FadeOut(angka_atas), run_time=0.7)
            b.tunggu_kata("tepat berada")
            b.main(FadeIn(titik_di_cermin, scale=0.4), FadeIn(l_di_cermin), run_time=1.2)
            b.main(Indicate(titik_di_cermin, color=SOROT), run_time=1.2)
        qc.periksa_adegan(
            self, {"benda": kecil_pra, "bayangan": kecil_peta,
                   "titik di cermin": titik_di_cermin},
            hud=hud_kini(),
            tulisan={"label h": l_h, "label di cermin": l_di_cermin},
            dunia={"bidang": bidang, "cermin datar": garis_datar},
        )

        # Cermin miring y = x sebagai pengantar Bagian 3: garisnya diputar 45
        # derajat di tempat, bendanya tinggal.
        # Ujungnya (4,4, 4,4), bukan (7,4, 7,4): pada kamera KOTAK ini y dunia 7,4
        # jatuh di y layar 4,30, keluar bingkai (qc menolaknya, 12 Sep 2026).
        garis_miring = DashedLine(titik3((0.6, 0.6)), titik3((4.4, 4.4))).set_stroke(SOROT, 4.0)
        with sinema.babak(self, "berikut", DURASI, kata=KATA) as b:
            b.main(FadeOut(titik_di_cermin), FadeOut(l_di_cermin), run_time=0.6)
            b.tunggu_kata("Bagian")
            judul_lanjut = teks("Prapeta, Peta, dan Pencerminan, Bagian 3", 30, SOROT)
            judul_lanjut.move_to([0, 2.9, 0]).fix_in_frame()
            self.hud_tambah(judul_lanjut)
            b.main(FadeIn(judul_lanjut, shift=0.2 * UP), run_time=0.8)
            b.tunggu_kata("miring")
            b.main(FadeOut(kecil_peta), FadeOut(l_h), Transform(garis_datar, garis_miring), run_time=1.4)
            b.tunggu_kata("gagasan jarak")
            b.main(Indicate(rum, color=AKSEN), run_time=1.4)
        qc.periksa_adegan(self, {"benda": kecil_pra}, hud=hud_kini(),
                          dunia={"bidang": bidang, "cermin": garis_datar})

        sinema.laporkan_pemicu(self)
