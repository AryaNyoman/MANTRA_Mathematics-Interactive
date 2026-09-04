"""Video 05 Transformasi Geometri, Materi 09 "Matriks secukupnya".

SATU-SATUNYA VIDEO TOPIK INI YANG BENDANYA BUKAN HURUF L
Yang diajarkan di sini bukan akibat sebuah transformasi pada sebuah benda,
melainkan CARA MEMBACA empat angka di dalam matriks. Aturannya: kolom pertama
adalah tempat mendaratnya titik (1, 0), kolom kedua tempat mendaratnya (0, 1).
Kedua titik itu adalah dua sisi persegi satuan, jadi persegi satuanlah gambar
yang membuat aturan itu terlihat langsung. Huruf L hanya akan menyembunyikannya
di balik empat sudut lain yang tidak ada hubungannya.

TANPA 3D. Panjang dan sudut harus akurat.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
from transformasi_umum import (  # noqa: E402
    bidang_untuk, letak_peta, poligon, titik3,
)

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "transformasi5-matriks"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

# Kotaknya sengaja rapat. Bendanya cuma persegi seluas satu satuan, dan kalau
# jendelanya lebar, persegi itu menciut jadi seujung kuku.
KOTAK = (-1.8, 1.8, -1.3, 1.8)

PERSEGI = [(0.0, 0.0), (1.0, 0.0), (1.0, 1.0), (0.0, 1.0)]

# Matriks rotasi 90 derajat: baris pertama 0 dan -1, baris kedua 1 dan 0.
# Dipilih karena siswa BARU SAJA melihatnya sebagai gerakan di video 03, jadi
# babak penutup bisa menagihnya: matriks ini bukan hal baru.
M = {"a": 0.0, "b": -1.0, "c": 1.0, "d": 0.0}


def kenakan(m, p):
    return (m["a"] * p[0] + m["b"] * p[1], m["c"] * p[0] + m["d"] * p[1])


class TransformasiMatriks(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)

        peta = [kenakan(M, p) for p in PERSEGI]
        kolom1 = kenakan(M, (1.0, 0.0))
        kolom2 = kenakan(M, (0.0, 1.0))

        pusat, tinggi = letak_peta(*KOTAK)
        bidang = bidang_untuk(*KOTAK)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi)

        asal = np.array([0.0, 0.0, 0.03])

        # --- buka -------------------------------------------------------- #
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(3.0, DURASI["buka"] - 0.6)
            sinema.judul_pembuka(self, "Materi 09: Matriks secukupnya", lama=lama)
            b.catat(lama)

        # --- tumpuk dan susun: empat aturan berbentuk sama ---------------- #
        with sinema.babak(self, "tumpuk", DURASI) as b:
            b.main(FadeIn(bidang), run_time=0.8)
            ident = sinema.identitas(self, "1 petak = 1 satuan")
            papan.baris(r"\text{cermin } X:\ (1)x + (0)y,\ (0)x + (-1)y", warna=REDUP, b=b)
        qc.periksa_adegan(self, {"identitas": ident},
                          hud={"papan": papan.semua()}, dunia={"bidang": bidang})

        with sinema.babak(self, "susun", DURASI) as b:
            papan.baris(r"\text{rotasi } 90^\circ:\ (0)x + (-1)y,\ (1)x + (0)y", warna=REDUP, b=b)
            papan.baris(r"\text{yang beda hanya empat angkanya}", warna=TINTA, b=b)
        qc.periksa_adegan(self, {"identitas": ident},
                          hud={"papan": papan.semua()}, dunia={"bidang": bidang})

        # --- persegi: bendanya muncul ------------------------------------ #
        persegi = poligon(PERSEGI, TINTA, tebal=3.2, isian=0.08)
        l_persegi = sinema.label("persegi satuan", warna=TINTA)
        l_persegi.next_to(titik3((0.5, 1.0)), UP, buff=0.24)

        with sinema.babak(self, "persegi", DURASI) as b:
            b.main(ShowCreation(persegi), FadeIn(l_persegi), run_time=1.6)
        qc.periksa_adegan(self, {"persegi": persegi, "label": l_persegi},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang})

        # --- kolom1: panah biru, peta dari (1, 0) ------------------------- #
        panah1_awal = Arrow(asal, titik3((1.0, 0.0)), buff=0, thickness=4).set_color(AKSEN2)
        l_kolom1 = sinema.label("(0, 1)", warna=AKSEN2)
        l_kolom1.next_to(titik3(kolom1), RIGHT, buff=0.24)

        with sinema.babak(self, "kolom1", DURASI) as b:
            b.main(GrowArrow(panah1_awal), run_time=1.0)
            b.main(
                Rotate(panah1_awal, PI / 2, about_point=asal),
                FadeIn(l_kolom1),
                run_time=1.6,
            )
        qc.periksa_adegan(self, {"persegi": persegi, "label kolom1": l_kolom1},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang})

        # --- kolom2: panah merah, peta dari (0, 1) ------------------------ #
        panah2_awal = Arrow(asal, titik3((0.0, 1.0)), buff=0, thickness=4).set_color(AKSEN)
        l_kolom2 = sinema.label("(-1, 0)", warna=AKSEN)
        l_kolom2.next_to(titik3(kolom2), DOWN, buff=0.24)

        with sinema.babak(self, "kolom2", DURASI) as b:
            b.main(GrowArrow(panah2_awal), run_time=1.0)
            b.main(
                Rotate(panah2_awal, PI / 2, about_point=asal),
                FadeIn(l_kolom2),
                run_time=1.6,
            )
        qc.periksa_adegan(
            self,
            {"persegi": persegi, "label kolom1": l_kolom1, "label kolom2": l_kolom2},
            [("label kolom1", "label kolom2")],
            hud={"identitas": ident, "papan": papan.semua()},
            dunia={"bidang": bidang},
        )

        # --- baca: matriksnya disusun dari kedua ujung panah -------------- #
        peta_persegi = poligon(peta, SOROT, tebal=3.0, isian=0.12)

        with sinema.babak(self, "baca", DURASI) as b:
            b.main(ShowCreation(peta_persegi), run_time=1.4)
            rum = sinema.lahir_rumus(
                self, r"\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}",
                dekat=peta_persegi, papan=papan, b=b, warna=SOROT,
            )
        qc.periksa_adegan(self, {"persegi": persegi, "peta": peta_persegi},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang})

        # --- kali: yang bertemu koordinat adalah BARIS -------------------- #
        with sinema.babak(self, "kali", DURASI) as b:
            papan.baris(r"\text{baris} \times \text{koordinat, bukan kolom}", warna=AKSEN2, b=b)
        qc.periksa_adegan(self, {"persegi": persegi, "peta": peta_persegi},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang})

        # --- kenal dan tutup: matriksnya ternyata rotasi 90 derajat ------- #
        with sinema.babak(self, "kenal", DURASI) as b:
            papan.baris(r"(3,\ 2) \to (-2,\ 3)", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"persegi": persegi, "peta": peta_persegi},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang})

        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(Indicate(peta_persegi, color=SOROT), run_time=1.0)
            papan.baris(r"\text{itu rotasi } 90^\circ \text{ dari Materi 06}", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"persegi": persegi, "peta": peta_persegi},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang})
