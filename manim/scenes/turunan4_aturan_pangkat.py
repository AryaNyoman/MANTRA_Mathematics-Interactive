"""Video 06 topik TURUNAN, untuk Materi 04 "Aturan pangkat lahir dari definisi".

TUGAS VIDEO INI
Halaman Materi 04 sudah mengerjakan aljabarnya lengkap, baris demi baris. Video
yang cuma membacakan ulang baris-baris itu tidak menambah apa pun. Yang
dikerjakan video adalah satu hal yang tidak bisa dilakukan tulisan:
memperlihatkan suku yang masih memuat h benar-benar MENYUSUT sampai hilang saat
h dikecilkan, sementara suku yang tidak memuat h sama sekali tidak bergerak.
Ketimpangan itulah isi aturan pangkat, dan ia terbaca dalam satu tatapan kalau
digerakkan.

WARNANYA MEMBELAH DUA, DAN CUMA DUA
  TINTA         suku yang BERTAHAN, yaitu yang tidak memuat h
  AKSEN merah   suku yang akan LENYAP, yaitu yang memuat h
  SOROT ungu    aturan yang disimpulkan
  REDUP         keterangan dan garis bantu
Tidak ada warna ketiga untuk "suku biasa": tiap suku di video ini pasti masuk
salah satu dari dua golongan itu, dan justru penggolongan itu yang diajarkan.

KENAPA TANPA ANGKA HIDUP
Suku yang memuat h dikecilkan lewat langkah tetap (h = 1, lalu 0,5, lalu 0,1,
lalu hilang), bukan lewat angka yang berubah tiap frame. Angka hidup pada rumus
LaTeX berarti membangun ulang rumusnya tiap frame, dan itu memanggil MiKTeX
puluhan kali per detik.

TANPA 3D (butir 2): jatah pembuka 3D topik ini dipakai video Materi 01.

ANGKANYA SAMA DENGAN HALAMAN
Jabaran (x + h)^2 dan (x + h)^3, deret polanya, 5x^3 -> 15x^2, dan turunan
konstanta adalah isi kotak contoh Materi 04. Klaimnya diperiksa
`alat/klaim-video-turunan.json` dengan awalan V04.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "turunan4-aturan-pangkat"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

Y_KERJA = 0.75        # baris tempat hitungan berlangsung
Y_BAWAH = -1.35       # baris keterangan h


def hud_dengan_papan(ident, papan):
    """Isi `hud=` untuk qc, aman saat panelnya masih kosong."""
    isi = {"identitas": ident}
    papan_isi = papan.semua()
    if papan_isi is not None:
        isi["papan"] = papan_isi
    return isi


def sebelah(kiri_mob, isi, ukuran, warna, buff=0.20):
    """Potongan rumus yang duduk tepat di kanan potongan sebelumnya."""
    m = rumus(isi, ukuran, warna)
    m.next_to(kiri_mob, RIGHT, buff=buff)
    return m


class TurunanAturanPangkat(AdeganMatra):
    """Waktu tiap babak dihitung mundur dari durasi narasinya sejak awal."""

    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True)
        ident = sinema.identitas(self, "merah = memuat h")

        # ================= buka ========================================== #
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(2.4, DURASI["buka"] - 0.8)
            sinema.judul_pembuka(self, "Materi 04: aturan pangkat", lama=lama)
            b.catat(lama)

        # ================= pola: empat titik itu bukan bukti ============= #
        titik = VGroup(*[Dot([-3.4 + k * 1.1, Y_KERJA, 0], radius=0.09).set_color(AKSEN2)
                         for k in range(4)])
        hasil_lama = rumus(r"f'(x) = 2x", 42, TINTA).move_to([1.9, Y_KERJA, 0])
        cap = sinema.label("empat titik", warna=REDUP).move_to([-2.3, Y_BAWAH, 0])

        with sinema.babak(self, "pola", DURASI) as b:
            b.main(LaggedStartMap(FadeIn, titik, lag_ratio=0.4), run_time=2.0)
            b.main(Write(hasil_lama), run_time=1.8)
            b.main(FadeIn(cap, shift=UP * 0.2), run_time=1.4)
            b.main(Indicate(titik, color=AKSEN2), run_time=1.6)
            b.main(Indicate(cap, color=REDUP), run_time=1.4)
            b.main(Indicate(hasil_lama, color=TINTA), run_time=1.6)
            papan.baris(r"\text{pola, bukan bukti}", warna=REDUP, b=b)
            # Layarnya TIDAK dibersihkan di sini. Babak yang mengakhiri dirinya
            # dengan layar kosong menyisakan detik hening sampai kalimat
            # berikutnya mulai; pada percobaan pertama 5,0 detik, dan yang
            # menangkapnya alat/cek_layar_kosong.py, bukan mata. Pembersihan
            # dipindah ke AWAL babak berikutnya.
        qc.periksa_adegan(self, {}, hud=hud_dengan_papan(ident, papan))

        # ================= urai ========================================== #
        urai = rumus(r"(x+h)^2 = x^2 + 2xh + h^2", 42, TINTA)
        urai.move_to([0, Y_KERJA, 0])
        sinema.batasi_lebar(urai, 9.6)

        with sinema.babak(self, "urai", DURASI) as b:
            b.main(FadeOut(titik), FadeOut(cap), FadeOut(hasil_lama), run_time=1.0)
            b.main(Write(urai), run_time=3.6)
            b.main(Indicate(urai, color=TINTA), run_time=1.6)
            papan.baris(r"(x+h)^2", warna=TINTA, b=b)
            b.main(Indicate(urai, color=REDUP), run_time=1.2)
        qc.periksa_adegan(self, {"urai": urai}, hud=hud_dengan_papan(ident, papan))

        # ================= selisih ======================================= #
        with sinema.babak(self, "selisih", DURASI) as b:
            urai = sinema.ganti_rumus(self, urai, r"2xh + h^2", b=b, run_time=2.6)
            b.main(Indicate(urai, color=TINTA), run_time=1.8)
        qc.periksa_adegan(self, {"selisih": urai}, hud=hud_dengan_papan(ident, papan))

        # ================= bagi ========================================== #
        # Sesudah dibagi h, hasilnya dipecah jadi DUA benda terpisah supaya
        # keduanya bisa diperlakukan berbeda: yang kiri diam, yang kanan lenyap.
        tetap = rumus(r"2x", 46, TINTA).move_to([-0.7, Y_KERJA, 0])
        hilang = sebelah(tetap, r"+\ h", 46, AKSEN)

        with sinema.babak(self, "bagi", DURASI) as b:
            b.main(FadeOut(urai), run_time=0.7)
            b.main(Write(tetap), run_time=1.6)
            b.main(Write(hilang), run_time=1.6)
        qc.periksa_adegan(self, {"tetap": tetap, "hilang": hilang},
                          hud=hud_dengan_papan(ident, papan))

        # ================= lenyap: yang memuat h menyusut ================ #
        # Inti seluruh video. Sukunya dikecilkan bertahap, dan `tetap` sengaja
        # TIDAK disentuh sama sekali supaya penonton melihat ia benar-benar diam.
        nilai_h = rumus(r"h = 1", 34, AKSEN).move_to([0.2, Y_BAWAH, 0])

        with sinema.babak(self, "lenyap", DURASI) as b:
            b.main(FadeIn(nilai_h, shift=UP * 0.2), run_time=1.2)
            for teks_h, skala, tembus in ((r"h = 0{,}5", 0.55, 0.55),
                                          (r"h = 0{,}1", 0.28, 0.25)):
                b.main(hilang.animate.scale(skala).set_opacity(tembus), run_time=1.8)
                nilai_h = sinema.ganti_rumus(self, nilai_h, teks_h, b=b, run_time=1.2)
            b.main(FadeOut(hilang), run_time=1.6)
            b.main(Indicate(tetap, color=TINTA), run_time=1.4)
        qc.periksa_adegan(self, {"tetap": tetap}, hud=hud_dengan_papan(ident, papan),
                          tulisan={"nilai h": nilai_h})

        # ================= dapat ========================================= #
        with sinema.babak(self, "dapat", DURASI) as b:
            b.main(FadeOut(nilai_h), run_time=0.7)
            tetap = sinema.ganti_rumus(self, tetap, r"(x^2)' = 2x", b=b, run_time=2.4)
            papan.baris(r"(x^2)' = 2x", warna=TINTA, b=b)
            b.main(Indicate(tetap, color=TINTA), run_time=1.6)
        qc.periksa_adegan(self, {"hasil": tetap}, hud=hud_dengan_papan(ident, papan))

        # ================= tiga: diulang untuk pangkat tiga ============== #
        tetap3 = rumus(r"3x^2", 46, TINTA).move_to([-1.4, Y_KERJA, 0])
        hilang3 = sebelah(tetap3, r"+\ 3xh + h^2", 42, AKSEN)

        with sinema.babak(self, "tiga", DURASI) as b:
            b.main(FadeOut(tetap), run_time=0.7)
            b.main(Write(tetap3), run_time=1.8)
            b.main(Write(hilang3), run_time=2.6)
            b.main(Indicate(hilang3, color=AKSEN), run_time=1.8)
        qc.periksa_adegan(self, {"tetap 3": tetap3, "hilang 3": hilang3},
                          hud=hud_dengan_papan(ident, papan))

        # ================= duahilang ===================================== #
        with sinema.babak(self, "duahilang", DURASI) as b:
            b.main(hilang3.animate.scale(0.45).set_opacity(0.45), run_time=1.8)
            b.main(FadeOut(hilang3), run_time=1.6)
            tetap3 = sinema.ganti_rumus(self, tetap3, r"(x^3)' = 3x^2", b=b, run_time=2.2)
            papan.baris(r"(x^3)' = 3x^2", warna=TINTA, b=b)
        qc.periksa_adegan(self, {"hasil 3": tetap3}, hud=hud_dengan_papan(ident, papan))

        # ================= jajar: polanya dijajarkan ===================== #
        baris_pola = VGroup(
            rumus(r"x \ \rightarrow\ 1", 34, TINTA),
            rumus(r"x^2 \ \rightarrow\ 2x", 34, TINTA),
            rumus(r"x^3 \ \rightarrow\ 3x^2", 34, TINTA),
            rumus(r"x^4 \ \rightarrow\ 4x^3", 34, TINTA),
        )
        baris_pola.arrange(DOWN, buff=0.42, aligned_edge=LEFT)
        baris_pola.move_to([-1.6, -0.2, 0])

        with sinema.babak(self, "jajar", DURASI) as b:
            b.main(FadeOut(tetap3), run_time=0.8)
            for m in baris_pola:
                b.main(FadeIn(m, shift=RIGHT * 0.25), run_time=1.8)
            b.main(Indicate(baris_pola, color=TINTA), run_time=1.8)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"pola": baris_pola}, hud=hud_dengan_papan(ident, papan))

        # ================= aturan ======================================== #
        aturan = rumus(r"(a\,x^n)' = a\,n\,x^{\,n-1}", 46, SOROT).move_to([2.4, -0.2, 0])
        sinema.batasi_lebar(aturan, 5.4)

        with sinema.babak(self, "aturan", DURASI) as b:
            b.main(Write(aturan), run_time=2.8)
            b.main(Indicate(aturan, color=SOROT), run_time=1.8)
            papan.baris(r"(ax^n)' = a\,n\,x^{n-1}", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"pola": baris_pola, "aturan": aturan},
                          hud=hud_dengan_papan(ident, papan))

        # ================= contoh ======================================== #
        contoh = rumus(r"(5x^3)' = 5 \cdot 3 \cdot x^2 = 15x^2", 40, TINTA)
        contoh.move_to([0, -2.0, 0])
        sinema.batasi_lebar(contoh, 9.6)

        with sinema.babak(self, "contoh", DURASI) as b:
            b.main(Write(contoh), run_time=3.2)
            b.main(Indicate(contoh, color=TINTA), run_time=1.8)
            papan.baris(r"(5x^3)' = 15x^2", warna=TINTA, b=b)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"pola": baris_pola, "aturan": aturan, "contoh": contoh},
                          hud=hud_dengan_papan(ident, papan))

        # ================= konstan: grafiknya garis mendatar ============= #
        # Dibuktikan lewat GAMBAR, bukan lewat hitungan lagi: garis mendatar
        # tidak menanjak dan tidak menurun, dan itu memang paling jelas dilihat.
        konst = rumus(r"f(x) = 7", 42, TINTA).move_to([-3.6, 1.5, 0])
        datar = Line([-5.4, 0.2, 0], [-0.4, 0.2, 0]).set_stroke(AKSEN2, width=4.4)
        l_datar = sinema.label("mendatar", warna=AKSEN2).next_to(datar, DOWN, buff=0.30)
        nol = rumus(r"f'(x) = 0", 42, SOROT).move_to([2.6, 1.5, 0])

        with sinema.babak(self, "konstan", DURASI) as b:
            b.main(FadeOut(baris_pola), FadeOut(aturan), FadeOut(contoh), run_time=1.0)
            b.main(Write(konst), run_time=2.0)
            b.main(ShowCreation(datar), run_time=2.0)
            b.main(FadeIn(l_datar, shift=UP * 0.2), run_time=1.2)
            b.main(Write(nol), run_time=2.2)
            papan.baris(r"\text{konstanta}' = 0", warna=SOROT, b=b)
            b.main(Indicate(nol, color=SOROT), run_time=1.6)
        qc.periksa_adegan(self, {"konstan": konst, "nol": nol},
                          hud=hud_dengan_papan(ident, papan),
                          dunia={"garis datar": datar},
                          tulisan={"mendatar": l_datar})
