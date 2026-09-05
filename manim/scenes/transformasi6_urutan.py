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

TANPA 3D. Koordinat harus akurat.

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
from transformasi_umum import bidang_untuk, letak_peta, titik3  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "transformasi6-urutan"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

KOTAK = (-3.0, 4.0, -4.0, 4.0)

P = (3.0, 1.0)


def cermin_x(p):
    return (p[0], -p[1])


def putar90(p):
    return (-p[1], p[0])


class TransformasiUrutan(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)

        # Urutan yang diminta soal: cermin dulu, baru putar.
        antara_1 = cermin_x(P)          # (3, -1)
        hasil_1 = putar90(antara_1)     # (1, 3)
        # Urutan yang dibalik: putar dulu, baru cermin.
        antara_2 = putar90(P)           # (-1, 3)
        hasil_2 = cermin_x(antara_2)    # (-1, -3)

        pusat, tinggi = letak_peta(*KOTAK)
        bidang = bidang_untuk(*KOTAK)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi)

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

        with sinema.babak(self, "dua", DURASI) as b:
            b.main(FadeIn(bidang), run_time=0.8)
            b.main(FadeIn(dot_a, scale=0.4), FadeIn(l_a), run_time=1.2)
            ident = sinema.identitas(self, "1 petak = 1 satuan")
        qc.periksa_adegan(self, {"titik A": dot_a, "label A": l_a, "identitas": ident},
                          dunia={"bidang": bidang})

        # --- langkah: cermin sumbu X ------------------------------------- #
        dot_1, l_1 = tanda(antara_1, AKSEN2, "(3, -1)", DOWN)
        jejak_1 = DashedLine(titik3(P), titik3(antara_1)).set_stroke(REDUP, 1.8)

        with sinema.babak(self, "langkah", DURASI) as b:
            b.main(ShowCreation(jejak_1), run_time=0.8)
            b.main(FadeIn(dot_1, scale=0.4), FadeIn(l_1), run_time=1.2)
            rum = sinema.lahir_rumus(
                self, r"\text{cermin } X", dekat=dot_1, papan=papan, b=b, warna=AKSEN2,
            )
        qc.periksa_adegan(self, {"titik A": dot_a, "hasil 1": dot_1, "label 1": l_1},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang, "jejak": jejak_1})

        # --- kedua: rotasi 90 derajat ------------------------------------ #
        dot_2, l_2 = tanda(hasil_1, AKSEN2, "(1, 3)", UP)
        jejak_2 = DashedLine(titik3(antara_1), titik3(hasil_1)).set_stroke(REDUP, 1.8)

        with sinema.babak(self, "kedua", DURASI) as b:
            b.main(ShowCreation(jejak_2), run_time=0.8)
            b.main(FadeIn(dot_2, scale=0.4), FadeIn(l_2), run_time=1.2)
            papan.baris(r"\text{lalu rotasi } 90^\circ", warna=AKSEN2, b=b)
        qc.periksa_adegan(self, {"titik A": dot_a, "hasil akhir": dot_2, "label akhir": l_2},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang, "jejak": jejak_2})

        # --- balik: urutan dibalik, warna berbeda ------------------------- #
        dot_3, l_3 = tanda(antara_2, SOROT, "(-1, 3)", UP)
        dot_4, l_4 = tanda(hasil_2, SOROT, "(-1, -3)", DOWN)
        jejak_3 = DashedLine(titik3(P), titik3(antara_2)).set_stroke(REDUP, 1.8)
        jejak_4 = DashedLine(titik3(antara_2), titik3(hasil_2)).set_stroke(REDUP, 1.8)

        with sinema.babak(self, "balik", DURASI) as b:
            b.main(ShowCreation(jejak_3), FadeIn(dot_3, scale=0.4), FadeIn(l_3), run_time=1.4)
            b.main(ShowCreation(jejak_4), FadeIn(dot_4, scale=0.4), FadeIn(l_4), run_time=1.4)
        qc.periksa_adegan(
            self,
            {"titik A": dot_a, "hasil 1": dot_2, "hasil 2": dot_4,
             "label hasil 1": l_2, "label hasil 2": l_4},
            [("label hasil 1", "label hasil 2")],
            hud={"identitas": ident, "papan": papan.semua()},
            dunia={"bidang": bidang, "jejak": jejak_4},
        )

        # --- beda: kedua hasilnya disorot berdampingan -------------------- #
        with sinema.babak(self, "beda", DURASI) as b:
            b.main(
                Indicate(dot_2, color=AKSEN2), Indicate(dot_4, color=SOROT),
                run_time=1.2,
            )
            papan.baris(r"(1,\ 3) \neq (-1,\ -3)", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"hasil 1": dot_2, "hasil 2": dot_4},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang})

        # --- matriks dan kenapa ------------------------------------------- #
        with sinema.babak(self, "matriks", DURASI) as b:
            rum = sinema.ganti_rumus(
                self, rum, r"M_2 M_1", b=b, warna=SOROT, papan=papan,
            )
        qc.periksa_adegan(self, {"hasil 1": dot_2, "hasil 2": dot_4},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang})

        with sinema.babak(self, "kenapa", DURASI) as b:
            papan.baris(r"M_2 M_1 \begin{pmatrix} x \\ y \end{pmatrix}", warna=SOROT, b=b)
            papan.baris(r"\text{yang terdekat menyentuh lebih dulu}", warna=TINTA, b=b)
        qc.periksa_adegan(self, {"hasil 1": dot_2, "hasil 2": dot_4},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang})

        # --- hasil: matriks gabungannya ternyata cermin y = x ------------- #
        garis_yx = DashedLine(
            titik3((-3.0, -3.0)), titik3((3.5, 3.5)),
        ).set_stroke(AKSEN, 2.2)

        with sinema.babak(self, "hasil", DURASI) as b:
            papan.baris(r"M_2 M_1 = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}", warna=AKSEN, b=b)
            b.main(ShowCreation(garis_yx), run_time=1.2)
        qc.periksa_adegan(self, {"titik A": dot_a, "hasil 1": dot_2},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang, "garis": garis_yx})

        # --- tutup -------------------------------------------------------- #
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(Indicate(garis_yx, color=AKSEN), run_time=1.0)
            papan.baris(r"\text{urutan tertukar} = \text{jawaban urutan lain}", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"titik A": dot_a, "hasil 1": dot_2},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang, "garis": garis_yx})
