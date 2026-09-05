"""Video 06 Transformasi Geometri, Materi 12 "Komposisi lewat perkalian matriks".

YANG DILACAK SEBUAH TITIK, BUKAN BENTUK L, DAN ITU BUKAN KEMALASAN
Dua sebabnya:

1. Naskahnya memang begitu. Narator berkata "Kita ikuti titik A saja", dan
   contoh berhitung di halaman Materi 11 dan 12 juga memakai satu titik P(3, 1).
   Video yang menampilkan bentuk sementara narasi membahas satu titik akan
   membuat siswa mencari titik itu di antara enam sudut.
2. Bentuk L yang dikenai dua urutan komposisi ini menjangkau y = -6 sampai
   y = 6. Satu kotak setinggi dua belas satuan menciutkan bentuknya jadi 13
   persen lebar layar, dan pada ukuran itu koordinat sudutnya tidak terbaca
   lagi, padahal justru koordinat itulah pelajarannya.

Satu bentuk tetap muncul, DI BABAK "periksa" SAJA: segitiga kecil dekat titik
asal, cukup rapat untuk muat utuh di kotak matriks. Babak itu memang menuntut
sebuah bentuk, sebab kalimatnya berbunyi "kenakan pada seluruh bentuknya".

TANPA 3D. Koordinat harus akurat.

DUA KOTAK KAMERA, DAN PEMBAGIAN TUGASNYA TEGAS
Paruh pertama (dua sampai beda) adalah GEOMETRI: satu titik ditelusuri lewat
dua urutan, dan seluruh kotak dipakai untuk koordinat. Paruh kedua (matriks
sampai rangkum) adalah ALJABAR: geometrinya dibuang, petaknya menyusut jadi
4 kali 4 satuan, dan kamera menyisakan tiga satuan KOSONG di bawah petak itu.
Tiga satuan itulah ruang rumus.

Ruang kosong itu wajib, bukan kemewahan. Rumus yang berdiri di ATAS bidang
petak akan menindih angka sumbu, dan `qc.periksa_adegan` tidak menangkapnya
dengan sengaja: benda dunia lawan benda dunia memang dibolehkan bersentuhan,
sebab label yang menempel pada bendanya adalah hal normal. Render 5 September
2026 memperlihatkan akibatnya di setiap babak aljabar sekaligus.

Ukuran hurufnya dijaga `transformasi_umum.rumus_dunia`, yang membesarkan tiap
rumus dengan 1/skala kamera supaya ukurannya di LAYAR tetap sama. Tanpa itu,
rumus 32 pada kotak berskala 0,59 tampil sebagai 19.

RUMUS DUNIA DAN GAMBAR TIDAK PERNAH TAMPIL BERSAMA di paruh kedua. Babak yang
butuh rumus besar membuang gambarnya, babak yang butuh gambar membuang
rumusnya. Keduanya sekaligus berarti keduanya menciut, dan itu cara paling
cepat membuat dua-duanya tidak terbaca.

Angka di video ini SAMA PERSIS dengan contoh di halaman Materi 11 dan 12, dan
diperiksa mesin lewat `alat/cek_transformasi.py` dengan awalan V06.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
from transformasi_umum import (  # noqa: E402
    bidang_untuk, juring, kosongkan_papan, letak_peta, poligon, rumus_dunia,
    titik3,
)

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "transformasi6-urutan"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

KOTAK_G = (-3.0, 4.0, -4.0, 4.0)   # paruh geometri: satu titik, dua urutan
KOTAK_M = (-2.0, 2.0, -5.0, 2.0)   # paruh aljabar: yang dilihat kamera
PETAK_M = (-2.0, 2.0, -2.0, 2.0)   # paruh aljabar: yang bergaris dan berangka

# DUA SLOT RUMUS, KEDUANYA DI BAWAH PETAK, dan itu perbaikan atas render
# 5 September 2026.
#
# Versi pertama menaruh rumus di dalam petak (y = 1,3 sampai -1,5) dan setiap
# satu di antaranya menindih angka sumbu. `qc.periksa_adegan` meloloskannya,
# dan memang begitu seharusnya: benda dunia lawan benda dunia dibolehkan
# bersentuhan, sebab label yang menempel pada bendanya normal. Yang salah tata
# letaknya, bukan gerbangnya. Sekarang petak berhenti di y = -2 dan kamera
# menjangkau y = -5; selisih tiga satuan itu ruang rumus, bersih dari angka.
SLOT_1 = np.array([0.0, -3.25, 0.05])
SLOT_2 = np.array([0.0, -4.55, 0.05])

P = (3.0, 1.0)

# Segitiga uji babak "periksa". Sudutnya di titik asal, jadi ia tidak bergeser
# menjauh saat diputar dan boleh dibuat sebesar seperempat petak tanpa keluar
# kotak. Versi pertama memakai segitiga sesisi satu satuan, dan pada skala 0,59
# bentuk itu cuma 0,6 satuan layar: terlalu kecil untuk membandingkan dua hasil,
# padahal membandingkan dua hasil justru tugas babak itu.
SEGITIGA = [(0.0, 0.0), (2.0, 0.0), (2.0, 2.0)]


def cermin_x(p):
    return (p[0], -p[1])


def putar90(p):
    return (-p[1], p[0])


def cermin_yx(p):
    return (p[1], p[0])


def cermin_ymx(p):
    return (-p[1], -p[0])


class TransformasiUrutan(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        asal = np.array([0.0, 0.0, 0.03])

        # Urutan yang diminta soal: cermin dulu, baru putar.
        antara_1 = cermin_x(P)          # (3, -1)
        hasil_1 = putar90(antara_1)     # (1, 3)
        # Urutan yang dibalik: putar dulu, baru cermin.
        antara_2 = putar90(P)           # (-1, 3)
        hasil_2 = cermin_x(antara_2)    # (-1, -3)

        pusat_g, tinggi_g = letak_peta(*KOTAK_G)
        bidang_g = bidang_untuk(*KOTAK_G)
        pusat_m, tinggi_m = letak_peta(*KOTAK_M)
        bidang_m = bidang_untuk(*PETAK_M)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat_g, tinggi=tinggi_g)

        def di_slot(isi, ukuran, warna, slot, maks=6.8):
            """Rumus dunia berukuran tetap di layar. Lihat `rumus_dunia`.

            Selalu dihitung dengan `tinggi_m`, tinggi kamera paruh ALJABAR,
            sebab semua rumus dunia video ini muncul sesudah kamera pindah ke
            sana. Memakai tinggi kamera yang salah membuat ukurannya meleset
            sebesar perbandingan kedua kotak.
            """
            return rumus_dunia(isi, ukuran, warna, tinggi_m, slot, maks_layar=maks)

        def tanda(p, warna, nama, arah=DOWN):
            d = Dot(titik3(p), radius=0.09).set_color(warna)
            t = sinema.label(nama, warna=warna)
            t.next_to(titik3(p), arah, buff=0.24)
            return d, t

        # --- buka -------------------------------------------------------- #
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(3.0, DURASI["buka"] - 0.6)
            sinema.judul_pembuka(self, "Materi 12: Urutan menentukan hasil", lama=lama)
            b.catat(lama)

        # --- dua: titik A muncul ----------------------------------------- #
        dot_a, l_a = tanda(P, TINTA, "A(3, 1)", DOWN)
        # Kotak baca koordinat: tiga ke kanan, satu ke atas. Ia kejadian besar
        # babak ini DAN keterangan yang berguna, bukan kilatan yang dicari-cari.
        kotak_baca = poligon([(0.0, 0.0), (P[0], 0.0), (P[0], P[1]), (0.0, P[1])],
                             AKSEN2, tebal=1.5, isian=0.10)

        with sinema.babak(self, "dua", DURASI) as b:
            b.main(FadeIn(bidang_g), run_time=0.8)
            b.main(FadeIn(dot_a, scale=0.4), FadeIn(l_a), run_time=1.2)
            ident = sinema.identitas(self, "1 petak = 1 satuan")
            b.main(ShowCreation(kotak_baca), run_time=1.4)
            b.main(Indicate(kotak_baca, color=SOROT), run_time=1.2)
        qc.periksa_adegan(self, {"titik A": dot_a, "kotak baca": kotak_baca},
                          hud={"identitas": ident},
                          tulisan={"label A": l_a},
                          dunia={"bidang": bidang_g})

        # --- langkah: cermin sumbu X ------------------------------------- #
        # PITA CERMIN, BUKAN SEKADAR GARIS PUTUS-PUTUS.
        #
        # Pencerminan pada sumbu X memindahkan titik menyeberangi sumbu itu,
        # dan daerah yang diseberanginya adalah pita setinggi dua kali jarak
        # titiknya. Pita berisi ribuan piksel; ruas putus-putus setebal 1,8
        # hanya sekitar seratus, di bawah ambang 300 alat ukur gerak. Versi
        # pertama video ini punya ENAM babak yang seluruh isinya benda setipis
        # itu, dan `alat/cek_kejadian.py` menandai semuanya.
        pita_1 = poligon(
            [(P[0] - 0.35, P[1]), (P[0] + 0.35, P[1]),
             (P[0] + 0.35, antara_1[1]), (P[0] - 0.35, antara_1[1])],
            AKSEN2, tebal=1.5, isian=0.16,
        )
        dot_1, l_1 = tanda(antara_1, AKSEN2, "(3, -1)", DOWN)

        with sinema.babak(self, "langkah", DURASI) as b:
            b.main(FadeOut(kotak_baca), ShowCreation(pita_1), run_time=1.2)
            b.main(FadeIn(dot_1, scale=0.4), FadeIn(l_1), run_time=1.2)
            rum = sinema.lahir_rumus(
                self, r"\text{cermin } X", dekat=dot_1, papan=papan, b=b, warna=AKSEN2,
            )
        qc.periksa_adegan(self, {"titik A": dot_a, "hasil 1": dot_1, "pita": pita_1},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"label A": l_a, "label 1": l_1},
                          dunia={"bidang": bidang_g})

        # --- kedua: rotasi 90 derajat ------------------------------------ #
        jari_1 = (antara_1[0] ** 2 + antara_1[1] ** 2) ** 0.5
        sudut_1 = np.arctan2(antara_1[1], antara_1[0])
        sapu_1 = poligon(juring(jari_1, sudut_1, sudut_1 + PI / 2),
                         AKSEN2, tebal=1.5, isian=0.10)
        dot_2, l_2 = tanda(hasil_1, AKSEN2, "(1, 3)", UP)

        with sinema.babak(self, "kedua", DURASI) as b:
            b.main(FadeOut(pita_1), ShowCreation(sapu_1), run_time=1.4)
            b.main(FadeIn(dot_2, scale=0.4), FadeIn(l_2), run_time=1.2)
            papan.baris(r"\text{lalu rotasi } 90^\circ", warna=AKSEN2, b=b)
            b.main(Indicate(sapu_1, color=SOROT), run_time=1.2)
        qc.periksa_adegan(self, {"titik A": dot_a, "hasil akhir": dot_2, "sapuan": sapu_1},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"label A": l_a, "label akhir": l_2},
                          dunia={"bidang": bidang_g})

        # --- balik: urutan dibalik, warna berbeda ------------------------- #
        jari_2 = (P[0] ** 2 + P[1] ** 2) ** 0.5
        sudut_2 = np.arctan2(P[1], P[0])
        sapu_2 = poligon(juring(jari_2, sudut_2, sudut_2 + PI / 2),
                         SOROT, tebal=1.5, isian=0.10)
        pita_2 = poligon(
            [(antara_2[0] - 0.35, antara_2[1]), (antara_2[0] + 0.35, antara_2[1]),
             (antara_2[0] + 0.35, hasil_2[1]), (antara_2[0] - 0.35, hasil_2[1])],
            SOROT, tebal=1.5, isian=0.16,
        )
        dot_3, l_3 = tanda(antara_2, SOROT, "(-1, 3)", UP)
        dot_4, l_4 = tanda(hasil_2, SOROT, "(-1, -3)", DOWN)

        with sinema.babak(self, "balik", DURASI) as b:
            b.main(FadeOut(sapu_1), ShowCreation(sapu_2), run_time=1.4)
            b.main(FadeIn(dot_3, scale=0.4), FadeIn(l_3), run_time=1.0)
            b.main(FadeOut(sapu_2), ShowCreation(pita_2), run_time=1.4)
            b.main(FadeIn(dot_4, scale=0.4), FadeIn(l_4), run_time=1.0)
        qc.periksa_adegan(
            self,
            {"titik A": dot_a, "hasil 1": dot_2, "hasil 2": dot_4, "pita 2": pita_2},
            hud={"identitas": ident, "papan": papan.semua()},
            tulisan={"label hasil 1": l_2, "label hasil 2": l_4, "label antara": l_3},
            dunia={"bidang": bidang_g},
        )

        # --- beda: kedua hasilnya disorot berdampingan -------------------- #
        with sinema.babak(self, "beda", DURASI) as b:
            b.main(FadeOut(pita_2), run_time=0.8)
            b.main(
                Indicate(dot_2, color=AKSEN2), Indicate(dot_4, color=SOROT),
                run_time=1.2,
            )
            papan.baris(r"(1,\ 3) \neq (-1,\ -3)", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"hasil 1": dot_2, "hasil 2": dot_4},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"label hasil 1": l_2, "label hasil 2": l_4},
                          dunia={"bidang": bidang_g})

        # --- matriks: geometrinya dibuang, kamera merapat ----------------- #
        kerja = di_slot(r"M_2 M_1 \begin{pmatrix} x \\ y \end{pmatrix}", 34, TINTA,
                        SLOT_1, maks=4.4)

        with sinema.babak(self, "matriks", DURASI) as b:
            kosongkan_papan(self, papan, b=b, run_time=0.6)
            b.main(
                FadeOut(dot_a), FadeOut(l_a), FadeOut(dot_1), FadeOut(l_1),
                FadeOut(dot_2), FadeOut(l_2), FadeOut(dot_3), FadeOut(l_3),
                FadeOut(dot_4), FadeOut(l_4),
                run_time=0.8,
            )
            b.main(
                kamera.dunia_ke_peta(frame, pusat=pusat_m, tinggi=tinggi_m),
                FadeOut(bidang_g), FadeIn(bidang_m),
                run_time=1.6,
            )
            rum = sinema.ganti_rumus(self, rum, r"M_2 M_1", b=b, warna=SOROT, papan=papan)
            b.main(FadeIn(kerja, shift=0.3 * UP), run_time=1.2)
        qc.periksa_adegan(self, {"kerja": kerja},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_m})

        # --- kenapa: yang terdekat koordinat bekerja lebih dulu ----------- #
        # Panahnya ditaruh di ruang rumus, bukan di dalam petak: ia menerangkan
        # arah membaca rumus, jadi tempatnya di sebelah rumus itu.
        panah_baca = Arrow(
            titik3((1.6, -4.3)), titik3((-1.6, -4.3)), buff=0, thickness=4,
        ).set_color(AKSEN)

        with sinema.babak(self, "kenapa", DURASI) as b:
            b.main(GrowArrow(panah_baca), run_time=1.2)
            b.main(Indicate(kerja, color=AKSEN), run_time=1.4)
            papan.baris(r"\text{terdekat menyentuh lebih dulu}", warna=TINTA, b=b)
        qc.periksa_adegan(self, {"kerja": kerja, "panah baca": panah_baca},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_m})

        # --- kalikan: keempat kotaknya dihitung satu per satu ------------- #
        # SATU BENDA YANG BERUBAH EMPAT KALI, bukan empat benda ditumpuk.
        #
        # Empat baris hitungan sekaligus butuh empat slot, dan kotak ini cuma
        # punya tiga. Yang lebih penting: hitungan kotak kiri atas sudah selesai
        # ketika kotak kanan atas dibicarakan, dan menahannya di layar membuat
        # siswa harus memilih sendiri baris mana yang sedang dibahas.
        susun = di_slot(r"M_2 M_1 = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}"
                        r"\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}", 32, TINTA,
                        SLOT_1, maks=6.8)
        kotak = [
            r"\text{kiri atas} = (0)(1) + (-1)(0) = 0",
            r"\text{kanan atas} = (0)(0) + (-1)(-1) = 1",
            r"\text{kiri bawah} = (1)(1) + (0)(0) = 1",
            r"\text{kanan bawah} = (1)(0) + (0)(-1) = 0",
        ]
        hitung = di_slot(kotak[0], 28, AKSEN2, SLOT_2, maks=6.8)

        with sinema.babak(self, "kalikan", DURASI) as b:
            b.main(FadeOut(kerja), FadeOut(panah_baca), run_time=0.6)
            b.main(FadeIn(susun, shift=0.3 * UP), run_time=1.2)
            b.main(FadeIn(hitung, shift=0.25 * UP), run_time=1.2)
            for isi in kotak[1:]:
                b.main(Transform(hitung, di_slot(isi, 28, AKSEN2, SLOT_2, maks=6.8)),
                       run_time=1.5)
            b.main(Indicate(susun, color=SOROT), run_time=1.4)
            b.main(Indicate(hitung, color=SOROT), run_time=1.4)
        qc.periksa_adegan(self, {"susun": susun, "hitung": hitung},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_m})

        # --- hasil: gabungannya ternyata cermin garis y = x --------------- #
        gabung = di_slot(r"M_2 M_1 = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}"
                         r" = \text{cermin } y = x", 32, AKSEN, SLOT_1, maks=6.8)
        pakai = di_slot(r"(3,\ 1) \to (1,\ 3)", 30, AKSEN, SLOT_2, maks=5.0)

        with sinema.babak(self, "hasil", DURASI) as b:
            b.main(Transform(susun, gabung), run_time=1.6)
            b.main(Transform(hitung, pakai), run_time=1.5)
            b.main(Indicate(susun, color=SOROT), run_time=1.4)
            b.main(Indicate(hitung, color=AKSEN2), run_time=1.4)
            b.main(Indicate(hitung, color=SOROT), run_time=1.4)
        qc.periksa_adegan(self, {"gabungan": susun, "dipakai": hitung},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_m})

        # --- periksa: dibuktikan pada seluruh bentuk ---------------------- #
        # Rumusnya dibuang lebih dulu. Segitiga uji ini melintasi SLOT_2 dan
        # SLOT_3, jadi menahan rumus di sana akan membuat keduanya bertindih,
        # dan qc memang akan menolaknya.
        segitiga = poligon(SEGITIGA, TINTA, tebal=3.0, isian=0.10)
        seg_cermin = poligon([cermin_x(p) for p in SEGITIGA], REDUP, tebal=2.4, isian=0.08)
        seg_akhir = poligon([putar90(cermin_x(p)) for p in SEGITIGA],
                            AKSEN2, tebal=3.0, isian=0.12)
        seg_langsung = poligon([cermin_yx(p) for p in SEGITIGA],
                               AKSEN, tebal=5.0, isian=0.0)
        garis_yx = DashedLine(titik3((-2.0, -2.0)), titik3((2.0, 2.0))).set_stroke(AKSEN, 2.2)

        with sinema.babak(self, "periksa", DURASI) as b:
            b.main(FadeOut(susun), FadeOut(hitung), run_time=0.6)
            b.main(ShowCreation(segitiga), run_time=1.2)
            b.main(ShowCreation(seg_cermin), run_time=1.2)
            b.main(ShowCreation(seg_akhir), run_time=1.4)
            b.main(FadeOut(seg_cermin), ShowCreation(garis_yx), run_time=1.2)
            b.main(ShowCreation(seg_langsung), run_time=1.4)
            b.main(Indicate(seg_akhir, color=SOROT), run_time=1.2)
            b.main(Indicate(segitiga, color=AKSEN2), run_time=1.2)
        qc.periksa_adegan(
            self,
            {"segitiga": segitiga, "hasil dua langkah": seg_akhir,
             "hasil langsung": seg_langsung},
            hud={"identitas": ident, "papan": papan.semua()},
            dunia={"bidang": bidang_m, "garis": garis_yx},
        )

        # --- tutup: urutan tertukar memberi jawaban urutan lain ----------- #
        # Cermin garis y = -x, bukan kekacauan. Digambar sebagai garis kedua di
        # samping y = x supaya keduanya bisa dibandingkan langsung.
        # Ujungnya berhenti di (2, -2), bukan (2,5, -2,5). Versi pertama
        # menjulur sampai -2,5 dan `qc.periksa_adegan` MENGGAGALKAN rendernya:
        # "garis 2 masuk jalur subtitle di bawah layar (bawah -2,56 < -2,55)".
        # Gerbangnya benar; garis hiasan tidak boleh merebut pita subtitle.
        garis_ymx = DashedLine(titik3((-2.0, 2.0)), titik3((2.0, -2.0))).set_stroke(SOROT, 2.2)
        balik = di_slot(r"M_1 M_2 = \begin{pmatrix} 0 & -1 \\ -1 & 0 \end{pmatrix}"
                        r" = \text{cermin } y = -x", 30, SOROT, SLOT_2, maks=6.8)
        # Hasil urutan yang tertukar DIGAMBAR, tidak cuma ditulis. Kalimatnya
        # berbunyi "jawabannya bukan kacau, melainkan jawaban untuk urutan yang
        # sebaliknya", dan satu-satunya cara membuktikan itu adalah
        # memperlihatkan bahwa hasilnya bentuk yang utuh dan rapi, cuma berada
        # di seperempat bidang yang lain.
        seg_balik = poligon([cermin_ymx(p) for p in SEGITIGA],
                            SOROT, tebal=3.0, isian=0.12)

        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(seg_langsung), FadeOut(seg_akhir), run_time=0.8)
            b.main(ShowCreation(garis_ymx), run_time=1.2)
            b.main(ShowCreation(seg_balik), run_time=1.4)
            b.main(FadeIn(balik, shift=0.25 * UP), run_time=1.2)
            b.main(Indicate(balik, color=AKSEN), run_time=1.4)
            b.main(Indicate(seg_balik, color=AKSEN2), run_time=1.2)
            b.main(Indicate(segitiga, color=SOROT), run_time=1.2)
        qc.periksa_adegan(self, {"segitiga": segitiga, "balik": balik,
                                 "hasil tertukar": seg_balik},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_m, "garis": garis_yx,
                                 "garis 2": garis_ymx})

        # --- sama: dua putaran BOLEH ditukar ------------------------------ #
        # CONTOH TANDINGAN, DAN VIDEO INI BUTUH SATU.
        #
        # Sembilan babak sebelumnya semuanya memperlihatkan urutan yang
        # mengubah hasil. Tanpa satu contoh yang urutannya TIDAK berpengaruh,
        # yang dipelajari siswa bukan "urutan bisa penting" melainkan "urutan
        # selalu penting", dan itu tidak benar. Dua putaran terhadap pusat yang
        # sama selalu boleh ditukar, sebab keduanya cuma menjumlahkan sudut.
        sapu_30 = poligon(juring(2.0, 0.0, 30 * DEGREES), AKSEN2, tebal=1.5, isian=0.14)
        sapu_60 = poligon(juring(2.0, 30 * DEGREES, 90 * DEGREES), SOROT, tebal=1.5, isian=0.14)

        with sinema.babak(self, "sama", DURASI) as b:
            b.main(
                FadeOut(segitiga), FadeOut(seg_balik),
                FadeOut(garis_yx), FadeOut(garis_ymx), FadeOut(balik),
                run_time=0.8,
            )
            b.main(ShowCreation(sapu_30), run_time=1.4)
            b.main(ShowCreation(sapu_60), run_time=1.4)
            papan.baris(r"30^\circ + 60^\circ = 60^\circ + 30^\circ", warna=AKSEN2, b=b)
            b.main(Indicate(sapu_30, color=AKSEN), run_time=1.2)
            b.main(Indicate(sapu_60, color=AKSEN), run_time=1.2)
        qc.periksa_adegan(self, {"sapu 30": sapu_30, "sapu 60": sapu_60},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_m})

        # --- jaga: dibaca dari kanan ke kiri ------------------------------ #
        aturan = di_slot(r"M_2 M_1 \begin{pmatrix} x \\ y \end{pmatrix}"
                         r"\ :\ M_1 \text{ dulu}", 32, TINTA, SLOT_1, maks=6.4)
        panah_jaga = Arrow(
            titik3((1.6, -4.5)), titik3((-1.6, -4.5)), buff=0, thickness=4,
        ).set_color(AKSEN)

        with sinema.babak(self, "jaga", DURASI) as b:
            kosongkan_papan(self, papan, b=b, run_time=0.6)
            b.main(FadeOut(sapu_30), FadeOut(sapu_60), run_time=0.8)
            b.main(FadeIn(aturan, shift=0.3 * UP), run_time=1.2)
            b.main(GrowArrow(panah_jaga), run_time=1.2)
            b.main(Indicate(aturan, color=AKSEN2), run_time=1.4)
            b.main(Indicate(aturan, color=SOROT), run_time=1.4)
        qc.periksa_adegan(self, {"aturan": aturan, "panah jaga": panah_jaga},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_m})

        # --- rangkum: satu kalimat, lalu satu pertanyaan ------------------ #
        # Pertanyaan penutupnya digambar: segitiga dicerminkan pada sumbu X dua
        # kali, dan pada cerminan kedua ia kembali persis ke tempat semula.
        # Jawabannya matriks satuan, tetapi videonya berhenti sebelum itu.
        tanya = di_slot(r"\text{cermin } X \cdot \text{cermin } X = ?", 32, AKSEN,
                        SLOT_1, maks=6.0)

        with sinema.babak(self, "rangkum", DURASI) as b:
            b.main(FadeOut(aturan), FadeOut(panah_jaga), run_time=0.8)
            # Dicerminkan, lalu dicerminkan lagi, dan bentuknya kembali persis
            # ke tempat semula. Itu jawaban pertanyaannya, diperagakan tanpa
            # diucapkan: video berhenti sebelum menyebut matriks satuan.
            b.main(ShowCreation(segitiga), run_time=1.2)
            b.main(ShowCreation(seg_cermin), run_time=1.2)
            b.main(FadeOut(seg_cermin), run_time=1.0)
            b.main(ShowCreation(seg_cermin), run_time=1.2)
            b.main(FadeOut(seg_cermin), run_time=1.0)
            b.main(Indicate(segitiga, color=AKSEN2), run_time=1.2)
            b.main(FadeIn(tanya, shift=0.25 * UP), run_time=1.2)
            b.main(Indicate(tanya, color=SOROT), run_time=1.4)
            b.main(Indicate(segitiga, color=AKSEN), run_time=1.2)
        qc.periksa_adegan(self, {"segitiga": segitiga, "tanya": tanya},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_m})
