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

        def hud_kini():
            """Isi HUD yang BENAR-BENAR ADA saat ini, untuk diserahkan ke qc.

            `papan.semua()` mengembalikan None selama panelnya masih kosong,
            dan qc menabrak None itu. Di video ini panelnya memang kosong
            sampai babak "baca", sebab semua keterangan sebelum itu digambar
            di dunia, bukan ditumpuk di panel.

            Ditulis sebagai fungsi, bukan diperiksa di tiap pemanggilan qc,
            supaya urutan babak boleh berubah tanpa menimbulkan galat ini lagi.
            """
            isi = {"identitas": ident}
            papan_isi = papan.semua()
            if papan_isi is not None:
                isi["papan"] = papan_isi
            return isi

        # --- buka -------------------------------------------------------- #
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(3.0, DURASI["buka"] - 0.6)
            sinema.judul_pembuka(self, "Materi 09: Matriks secukupnya", lama=lama)
            b.catat(lama)

        # --- tumpuk dan susun: empat aturan berbentuk sama ---------------- #
        # PANELNYA CUMA MUAT SATU RUMUS UTAMA PLUS EMPAT BARIS.
        #
        # Versi pertama menaruh ENAM baris di sini, dan qc menggagalkan
        # rendernya: "papan baris 1 menindih papan baris 4". Zona rumus setinggi
        # 2,6 satuan layar dengan jarak antarbaris 0,62, jadi baris kelima dan
        # seterusnya jatuh keluar zona dan menimpa yang di atasnya.
        #
        # Kedua aturan pembuka ini sekarang tampil BESAR DI TENGAH DUNIA lalu
        # memudar, bukan menumpuk di panel. Itu juga lebih benar sebagai
        # sinema: keduanya keadaan "sebelum", bukan temuan yang perlu bertahan
        # di layar sampai video habis. Panel disimpan untuk yang memang harus
        # bertahan.
        aturan1 = rumus(r"\text{cermin } X:\ (1)x + (0)y,\ \ (0)x + (-1)y", 32, REDUP)
        aturan1.move_to(np.array([0.0, 0.9, 0.05]))
        aturan2 = rumus(r"\text{rotasi } 90^\circ:\ (0)x + (-1)y,\ \ (1)x + (0)y", 32, REDUP)
        aturan2.move_to(np.array([0.0, 0.2, 0.05]))
        sinema.batasi_lebar(aturan1, 9.0)
        sinema.batasi_lebar(aturan2, 9.0)

        with sinema.babak(self, "tumpuk", DURASI) as b:
            b.main(FadeIn(bidang), run_time=0.8)
            ident = sinema.identitas(self, "1 petak = 1 satuan")
            b.main(FadeIn(aturan1, shift=0.3 * UP), run_time=1.2)
            b.main(FadeIn(aturan2, shift=0.3 * UP), run_time=1.2)
        qc.periksa_adegan(self, {"identitas": ident, "aturan1": aturan1},
                          dunia={"bidang": bidang})

        with sinema.babak(self, "susun", DURASI) as b:
            # Keempat angka pengalinya disorot satu per satu, lalu kedua
            # aturannya memudar. Sorotan itu kejadian untuk kalimat "yang beda
            # hanya empat angkanya"; tanpanya babak ini diam 7,5 detik, dan
            # peringatan `Babak.tutup()` menyebutkannya dengan angka.
            b.main(Indicate(aturan1, color=AKSEN2), run_time=1.0)
            b.main(Indicate(aturan2, color=AKSEN2), run_time=1.0)
            b.main(FadeOut(aturan1), FadeOut(aturan2), run_time=1.2)
        qc.periksa_adegan(self, {"identitas": ident}, dunia={"bidang": bidang})

        # --- persegi: bendanya muncul ------------------------------------ #
        persegi = poligon(PERSEGI, TINTA, tebal=3.2, isian=0.08)
        l_persegi = sinema.label("persegi satuan", warna=TINTA)
        l_persegi.next_to(titik3((0.5, 1.0)), UP, buff=0.24)

        with sinema.babak(self, "persegi", DURASI) as b:
            b.main(ShowCreation(persegi), FadeIn(l_persegi), run_time=1.6)
        qc.periksa_adegan(self, {"persegi": persegi, "label": l_persegi},
                          hud=hud_kini(),
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
                          hud=hud_kini(),
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
            hud=hud_kini(),
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
                          hud=hud_kini(),
                          dunia={"bidang": bidang})

        # --- kali: yang bertemu koordinat adalah BARIS -------------------- #
        # Tanpa baris panel: slotnya sudah dipakai rumus utama dan tiga baris
        # yang memang harus bertahan sampai akhir. Kalimatnya digambarkan
        # dengan menyorot kedua panah kolom bergantian, yang justru lebih tepat
        # daripada tulisan: yang sedang dibedakan memang kedua arah itu.
        with sinema.babak(self, "kali", DURASI) as b:
            b.main(Indicate(panah1_awal, color=AKSEN2), run_time=1.0)
            b.main(Indicate(panah2_awal, color=AKSEN), run_time=1.0)
            b.main(Indicate(persegi, color=TINTA), run_time=1.0)
        qc.periksa_adegan(self, {"persegi": persegi, "peta": peta_persegi},
                          hud=hud_kini(),
                          dunia={"bidang": bidang})

        # --- kenal dan tutup: matriksnya ternyata rotasi 90 derajat ------- #
        # PANEL DISISAKAN UNTUK MATRIKSNYA SAJA. Uji angkanya ditulis DI DUNIA.
        #
        # Rumus utama video ini matriks DUA BARIS, dan matriks dua baris jauh
        # lebih tinggi daripada jarak antarslot panel yang cuma 0,62 satuan
        # layar. Baris apa pun yang ditumpuk di bawahnya akan tertindih, dan qc
        # menggagalkan render DUA KALI karena itu sebelum sebabnya ketemu.
        #
        # Panel ini memang dirancang untuk potongan pendek satu baris. Lihat
        # cara topik lain memakainya: "modus = 7, 8", "A: 10", "13 : 40 =
        # 0,325". Bukan untuk matriks ditambah kalimat.
        uji = rumus(r"(3,\ 2) \to (-2,\ 3)", 34, SOROT)
        uji.move_to(np.array([0.0, -1.05, 0.05]))
        sinema.batasi_lebar(uji, 6.0)

        with sinema.babak(self, "kenal", DURASI) as b:
            b.main(FadeIn(uji, shift=0.25 * UP), run_time=1.2)
            b.main(Indicate(uji, color=SOROT), run_time=1.0)
        qc.periksa_adegan(self, {"persegi": persegi, "peta": peta_persegi},
                          hud=hud_kini(),
                          dunia={"bidang": bidang})

        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(Indicate(peta_persegi, color=SOROT), run_time=1.0)
            b.main(Indicate(uji, color=AKSEN2), run_time=1.0)
            b.main(FadeOut(uji), run_time=0.8)
        qc.periksa_adegan(self, {"persegi": persegi, "peta": peta_persegi},
                          hud=hud_kini(),
                          dunia={"bidang": bidang})
