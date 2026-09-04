"""Video 02 Transformasi Geometri, Materi 03 "Cermin pada garis tegak dan mendatar".

TANPA 3D, DAN ITU DISENGAJA
Seluruh isi video ini adalah klaim tentang JARAK: titik dan bayangannya sama
jauh dari cermin. Kamera miring memendekkan satu arah lebih banyak daripada
arah lain, jadi gambar miring akan membantah angka yang sedang diucapkan.
Aturan proyek: matematika yang butuh panjang akurat wajib kamera tegak lurus.

Letak kamera diambil dari `transformasi_umum.letak_peta`, bukan dihitung ulang
di sini. Alasannya ada di kepala berkas itu.

Alur berkas: buat_narasi -> buat_subtitle -> cek_kode -> manimgl -w -l ->
cek_video (BUKA lembar kontak) -> gabung_audio --uji.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
from transformasi_umum import (  # noqa: E402
    L, NAMA_SUDUT, bidang_untuk, letak_peta, poligon, titik3,
)

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "transformasi2-cermin-garis"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

K_AWAL = 0.0    # cermin berimpit sumbu Y
K_GESER = 5.0   # angka yang sama dengan contoh berhitung di halaman Materi 03


def cermin_tegak(p, k):
    return (2 * k - p[0], p[1])


class TransformasiCerminGaris(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)

        peta_awal = [cermin_tegak(p, K_AWAL) for p in L]
        peta_geser = [cermin_tegak(p, K_GESER) for p in L]

        # --- buka -------------------------------------------------------- #
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(3.0, DURASI["buka"] - 0.6)
            sinema.judul_pembuka(self, "Materi 03: Cermin pada garis lurus", lama=lama)
            b.catat(lama)

        # Babak "kaca" dan "jarak" memakai bidang yang sama dengan babak
        # berikutnya, jadi bidangnya dipasang sekali di awal dan tidak pernah
        # dibongkar. Layar yang tidak berubah selama narasi masih membahas hal
        # yang sama itu diizinkan; yang dilarang layar KOSONG.
        pusat_a, tinggi_a = letak_peta(-7.0, 7.0, 0.0, 4.0)
        bidang = bidang_untuk(-7.0, 7.0, 0.0, 4.0)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat_a, tinggi=tinggi_a)

        prapeta = poligon(L, TINTA, tebal=3.2, isian=0.08)
        nama_pra = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(huruf, warna=TINTA)
            t.next_to(titik3(L[i]), DOWN if i < 2 else UP, buff=0.22)
            nama_pra[huruf] = t

        garis_cermin = DashedLine(
            np.array([K_AWAL, -0.2, 0.03]), np.array([K_AWAL, 4.2, 0.03]),
        ).set_stroke(SOROT, 3.0)

        with sinema.babak(self, "kaca", DURASI) as b:
            b.main(FadeIn(bidang), run_time=0.8)
            b.main(ShowCreation(garis_cermin), run_time=1.0)
            ident = sinema.identitas(self, "1 petak = 1 satuan")
        qc.periksa_adegan(self, {"identitas": ident}, dunia={"bidang": bidang})

        with sinema.babak(self, "jarak", DURASI) as b:
            b.main(
                ShowCreation(prapeta),
                *[FadeIn(nama_pra[h]) for h in nama_pra],
                run_time=1.4,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta}, hud={"identitas": ident},
                          dunia={"bidang": bidang})

        # --- bentuk: petanya lahir di seberang cermin -------------------- #
        peta = poligon(peta_awal, AKSEN2, tebal=3.2, isian=0.12)
        nama_peta = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(f"{huruf}'", warna=AKSEN2)
            t.next_to(titik3(peta_awal[i]), DOWN if i < 2 else UP, buff=0.22)
            nama_peta[huruf] = t

        with sinema.babak(self, "bentuk", DURASI) as b:
            b.main(Indicate(garis_cermin, color=SOROT), run_time=1.0)
        qc.periksa_adegan(self, {"prapeta": prapeta}, hud={"identitas": ident},
                          dunia={"bidang": bidang})

        with sinema.babak(self, "cermin", DURASI) as b:
            b.main(
                ShowCreation(peta),
                *[FadeIn(nama_peta[h]) for h in nama_peta],
                run_time=1.6,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta},
                          hud={"identitas": ident}, dunia={"bidang": bidang})

        # --- tegaklurus: dua angka jarak yang sama ----------------------- #
        # Diambil pada titik C, bukan A. C berada di y = 2, jauh dari tepi atas
        # maupun bawah bidang, jadi angka jaraknya punya ruang di kedua sisi
        # garis tanpa menabrak apa pun.
        C = L[2]
        C_peta = peta_awal[2]
        ruas_kiri = Line(titik3(C), np.array([K_AWAL, C[1], 0.03])).set_stroke(AKSEN, 3.0)
        ruas_kanan = Line(np.array([K_AWAL, C[1], 0.03]), titik3(C_peta)).set_stroke(AKSEN, 3.0)
        angka_kiri = sinema.label(f"{abs(C[0] - K_AWAL):.0f}", warna=AKSEN)
        angka_kiri.next_to(ruas_kiri.get_center(), UP, buff=0.16)
        angka_kanan = sinema.label(f"{abs(C_peta[0] - K_AWAL):.0f}", warna=AKSEN)
        angka_kanan.next_to(ruas_kanan.get_center(), UP, buff=0.16)

        with sinema.babak(self, "tegaklurus", DURASI) as b:
            b.main(
                ShowCreation(ruas_kiri), ShowCreation(ruas_kanan),
                FadeIn(angka_kiri), FadeIn(angka_kanan),
                run_time=1.6,
            )
        qc.periksa_adegan(
            self,
            {"prapeta": prapeta, "peta": peta, "angka kiri": angka_kiri, "angka kanan": angka_kanan},
            [("angka kiri", "angka kanan")],
            hud={"identitas": ident}, dunia={"bidang": bidang},
        )

        # --- geser: cerminnya pindah ke x = 5, kamera ikut menyesuaikan --- #
        pusat_b, tinggi_b = letak_peta(0.0, 10.0, 0.0, 4.0)
        bidang_b = bidang_untuk(0.0, 10.0, 0.0, 4.0)
        garis_b = DashedLine(
            np.array([K_GESER, -0.2, 0.03]), np.array([K_GESER, 4.2, 0.03]),
        ).set_stroke(SOROT, 3.0)
        peta_b = poligon(peta_geser, AKSEN2, tebal=3.2, isian=0.12)
        nama_peta_b = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(f"{huruf}'", warna=AKSEN2)
            t.next_to(titik3(peta_geser[i]), DOWN if i < 2 else UP, buff=0.22)
            nama_peta_b[huruf] = t

        with sinema.babak(self, "geser", DURASI) as b:
            b.main(
                FadeOut(ruas_kiri), FadeOut(ruas_kanan),
                FadeOut(angka_kiri), FadeOut(angka_kanan),
                FadeOut(peta), *[FadeOut(nama_peta[h]) for h in nama_peta],
                run_time=0.8,
            )
            b.main(
                kamera.dunia_ke_peta(frame, pusat=pusat_b, tinggi=tinggi_b),
                FadeOut(bidang), FadeIn(bidang_b),
                Transform(garis_cermin, garis_b),
                run_time=max(1.6, DURASI["geser"] - 3.4),
            )
            b.main(
                ShowCreation(peta_b),
                *[FadeIn(nama_peta_b[h]) for h in nama_peta_b],
                run_time=1.6,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_b},
                          hud={"identitas": ident}, dunia={"bidang": bidang_b})

        # --- rumus: lahir dekat bendanya, lalu terbang ke panel ----------- #
        with sinema.babak(self, "rumus", DURASI) as b:
            rum = sinema.lahir_rumus(
                self, r"(x,\ y) \to (2k - x,\ y)",
                dekat=peta_b, papan=papan, b=b, warna=AKSEN2,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_b},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b})

        # --- uji: angka contoh yang sama dengan halamannya ---------------- #
        with sinema.babak(self, "uji", DURASI) as b:
            papan.baris(r"A(1,\ 2) \to A'(9,\ 2)", warna=AKSEN2)
            b.catat(0.8)  # `papan.baris` tidak mencatat waktunya sendiri
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_b},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b})

        # --- tutup: cermin mendatar DITAMBAHKAN, bukan menggantikan -------- #
        #
        # Versi pertama me-morph rumus utama menjadi bentuk cermin MENDATAR,
        # dan itu salah: gambarnya masih memperlihatkan cermin TEGAK di garis
        # x = 5. Panel jadi menerangkan hal yang tidak ada di layar, dan itu
        # jenis cacat yang paling merusak menurut standar proyek: gambar yang
        # membantah tulisannya sendiri.
        #
        # Sekarang keduanya berdiri berdampingan dengan namanya masing-masing.
        # Narasi memang memperkenalkan cermin mendatar sebagai kasus SEJAJAR,
        # bukan sebagai pengganti, jadi panelnya pun harus begitu.
        with sinema.babak(self, "tutup", DURASI) as b:
            papan.baris(r"\text{mendatar: } (x,\ y) \to (x,\ 2h - y)", warna=SOROT)
            b.catat(0.8)  # `papan.baris` tidak mencatat waktunya sendiri
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_b},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b})
