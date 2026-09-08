"""Video Integral Materi 03: substitusi, melihat lapisan.

    manimgl manim/scenes/integral03_substitusi.py IntegralSubstitusi -w -l

Video kelima dan terakhir topik ini. BUKAN video bernomor tahap terkecil, jadi
tanpa pembuka 3D.

TANPA BIDANG KOORDINAT SAMA SEKALI, dan itu disengaja. Seluruh isi materi ini
aljabar lapisan: memilih u, menghitung du, mencocokkannya dengan soal. Tidak
ada satu pun pernyataan tentang bentuk kurva atau luas. Memaksakan bidang
koordinat hanya akan memberi gambar yang tidak pernah dipakai, dan aturan
proyek "3D hanya jika dibutuhkan" berlaku sama untuk bidang dua dimensi.
Panggungnya rumus yang berubah di tengah layar, dan itu memang benda yang
sedang dibicarakan.

RUMUS DISUSUN DARI POTONGAN TERPISAH, bukan satu `Tex` panjang yang lalu
diiris `get_part_by_tex`. Sebabnya: angka "2" muncul berkali-kali di rumus
video ini, dan `get_part_by_tex` mengembalikan yang PERTAMA, bukan yang
dimaksud. Potongan terpisah bisa diwarnai dan dinyalakan tepat sasaran.

ANGKA
Diperiksa sympy lewat `alat/klaim-video-integral03.json`, 10 dari 10 lolos.
Dan yang lebih penting untuk video ini: tebakan naif (2x+1)^6/6 DIBUKTIKAN
DITOLAK alatnya, dengan pesan "turunan F adalah 2*(2*x + 1)**5, bukan
(2*x + 1)**5". Jadi kekeliruan yang dibantah video ini benar-benar keliru,
bukan sekadar menurut saya.

WARNA, sama dengan widget `cocokkan-lapisan` di halaman Materi 03
AKSEN2 biru = lapisan dalam u. AKSEN merah = faktor du dan angka yang harus
disesuaikan. SOROT ungu = jawaban benar dan kesimpulan.

Alur berkas: naskah -> buat_narasi.py -> buat_subtitle.py -> adegan ini ->
gabung_audio.py integral03-substitusi IntegralSubstitusi --uji.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "integral03-substitusi"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

# Panggung tengah: kiri bawah zona panel rumus (x 2,10 sampai 6,85, y 1,10
# sampai 3,70) dan di atas jalur subtitle (y > -2,35).
PANGGUNG = np.array([-2.2, 0.2, 0.0])


def baris_rumus(*potongan, ukuran=66, buff=0.18):
    """Satu baris rumus yang disusun dari POTONGAN terpisah.

    Tiap potongan berupa (teks_latex, warna) dan tetap bisa dialamati sendiri,
    jadi angka yang perlu disorot tidak perlu dicari lewat `get_part_by_tex`.
    """
    g = VGroup(*[rumus(t, ukuran, w) for t, w in potongan])
    g.arrange(RIGHT, buff=buff, aligned_edge=DOWN)
    return g


def bersihkan_panel(scene, papan_rumus, buang, b=None, run_time=0.9):
    """Buang beberapa baris panel sekaligus, lalu rapatkan sisanya.

    Salinan kelima dari pembantu yang sama (video 05, 01, 07, 09). Sudah
    tercatat sebagai usulan untuk `gl/sinema.py`; MASTER mengumpulkan usulan
    sinema jadi satu perubahan.
    """
    buang = [m for m in buang if m is not None]
    if not buang:
        return
    scene.play(*[FadeOut(m) for m in buang], run_time=run_time)
    for m in buang:
        if m in papan_rumus.baris_lain:
            papan_rumus.baris_lain.remove(m)
        scene.remove(m)
    for i, m in enumerate(papan_rumus.baris_lain):
        papan_rumus.tempat_baris(m, i)
    papan_rumus.perbarui_alas()
    if b is not None:
        b.catat(run_time)


class IntegralSubstitusi(AdeganMatra):
    def construct(self):
        panel = sinema.PapanRumus(self, ukuran=30, alas=True)
        jam = sinema.jam_subtitle(TOPIK)

        # ---------------------------------------------------------------
        # buka: kartu judul saja, sama dengan kalimat yang diucapkan.
        # ---------------------------------------------------------------
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(2.2, DURASI["buka"] - 0.8)
            sinema.judul_pembuka(self, "Materi 03: substitusi, melihat lapisan",
                                 lama=lama)
            b.catat(lama)

        # ---------------------------------------------------------------
        # soal: bentuk soalnya, dan kenapa menguraikan bukan jalan keluar.
        # ---------------------------------------------------------------
        soal = baris_rumus((r"\int (2x + 1)^5\, dx", TINTA)).move_to(PANGGUNG)
        urai = rumus(r"32x^5 + 80x^4 + 80x^3 + 40x^2 + 10x + 1", 36, REDUP)
        urai.next_to(soal, DOWN, buff=0.55)
        with sinema.babak(self, "soal", DURASI) as b:
            b.main(FadeIn(soal, scale=0.9), run_time=2.4)
            ident = sinema.identitas(self, "aturan rantai dibalik")
            b.main(Indicate(soal, color=SOROT), run_time=1.8)
            b.tunggu_sampai(sinema.mulai(jam, "Diuraikan bisa"))
            b.main(FadeIn(urai), run_time=3.0)
            b.main(Indicate(urai, color=AKSEN), run_time=1.8)
            b.main(FadeOut(urai), run_time=1.2)
        # TANPA "papan" di sini: sampai babak ini panel masih KOSONG, dan
        # `PapanRumus.semua()` mengembalikan None saat kosong. qc lalu memanggil
        # `get_family()` pada None dan render mati dengan pesan yang tidak
        # menyebut panel sama sekali. Jebakan ini sudah tercatat sejak sesi
        # Turunan; video 05, 01, 07, dan 09 tidak kena karena panelnya sudah
        # terisi sebelum pemeriksaan pertama.
        qc.periksa_adegan(self, {"soal": soal}, hud={"identitas": ident})

        # ---------------------------------------------------------------
        # tebak: aturan pangkat dipakai apa adanya.
        # ---------------------------------------------------------------
        tebakan = baris_rumus((r"\frac{(2x + 1)^6}{6}", TINTA), (r"\;?", AKSEN))
        tebakan.move_to(PANGGUNG)
        with sinema.babak(self, "tebak", DURASI) as b:
            b.main(Transform(soal, tebakan), run_time=2.8)
            b.main(Indicate(soal, color=AKSEN), run_time=2.0)
            b_tebak = panel.baris(r"\text{tebakan}", warna=AKSEN, b=b)
            b.main(Indicate(b_tebak, color=SOROT), run_time=1.0)

        # ---------------------------------------------------------------
        # periksa: tebakan itu DITURUNKAN, dan muncul faktor dua.
        # ---------------------------------------------------------------
        # Potongan "2" berdiri sendiri supaya bisa dinyalakan tepat sasaran.
        turun = baris_rumus(
            (r"\left[\frac{(2x + 1)^6}{6}\right]' =", TINTA),
            (r"(2x + 1)^5", TINTA),
            (r"\cdot\, 2", AKSEN),
            ukuran=58,
        ).move_to(PANGGUNG)
        with sinema.babak(self, "periksa", DURASI) as b:
            b.main(FadeOut(soal), run_time=0.8)
            b.main(FadeIn(turun[0]), run_time=2.0)
            b.main(FadeIn(turun[1]), run_time=2.0)
            b.main(FadeIn(turun[2], scale=0.6), run_time=2.2)
            b.main(Indicate(turun[2], color=SOROT), run_time=2.0)
            b_rantai = panel.baris(r"\text{aturan rantai}", warna=AKSEN, b=b)
            b.main(Indicate(b_rantai, color=SOROT), run_time=1.8)
        qc.periksa_adegan(self, {"turunan tebakan": turun},
                          hud={"identitas": ident, "papan": panel.semua()})

        # ---------------------------------------------------------------
        # dua: turunannya DUA KALI yang dicari.
        # ---------------------------------------------------------------
        banding = baris_rumus(
            (r"2", AKSEN), (r"(2x + 1)^5", TINTA),
            (r"\quad\text{lawan}\quad", REDUP), (r"(2x + 1)^5", TINTA),
            ukuran=58,
        ).move_to(PANGGUNG)
        with sinema.babak(self, "dua", DURASI) as b:
            b.main(FadeOut(turun), FadeIn(banding), run_time=2.2)
            b.main(Indicate(banding[0], color=SOROT), run_time=1.4)
            b_dua = panel.baris(r"\text{kelebihan } 2", warna=AKSEN, b=b)
            b.main(Indicate(b_dua, color=SOROT), run_time=1.4)

        # ---------------------------------------------------------------
        # bagi: dibagi dua, dan jawabannya benar.
        # ---------------------------------------------------------------
        benar = baris_rumus((r"\frac{(2x + 1)^6}{12} + C", SOROT)).move_to(PANGGUNG)
        with sinema.babak(self, "bagi", DURASI) as b:
            b.main(FadeOut(banding), run_time=0.8)
            qc.pastikan_hilang(self, {"turunan tebakan": turun,
                                      "perbandingan": banding},
                               nama="akhir babak bagi")
            b.main(FadeIn(benar, scale=0.9), run_time=2.0)
            b.main(Indicate(benar, color=AKSEN), run_time=1.8)
            bersihkan_panel(self, panel, [b_tebak, b_dua], b=b)
            b_benar = panel.baris(r"\text{dibagi } 2", warna=SOROT, b=b)
            b.main(Indicate(b_benar, color=AKSEN), run_time=1.4)
        qc.periksa_adegan(self, {"jawaban benar": benar},
                          hud={"identitas": ident, "papan": panel.semua()})

        # ---------------------------------------------------------------
        # namai: lapisan dalam diberi nama u, lalu du dihitung.
        # ---------------------------------------------------------------
        lapis = baris_rumus(
            (r"u =", AKSEN2), (r"2x + 1", AKSEN2),
            (r"\quad\Rightarrow\quad", REDUP),
            (r"du =", AKSEN), (r"2\, dx", AKSEN),
            ukuran=58,
        ).move_to(PANGGUNG)
        with sinema.babak(self, "namai", DURASI) as b:
            b.main(FadeOut(benar), run_time=0.8)
            b.main(FadeIn(lapis[0]), FadeIn(lapis[1]), run_time=2.2)
            b.main(Indicate(lapis[1], color=SOROT), run_time=2.0)
            b.main(FadeIn(lapis[2]), FadeIn(lapis[3]), FadeIn(lapis[4]), run_time=2.4)
            b.main(Indicate(lapis[4], color=SOROT), run_time=2.0)
            b_u = panel.baris(r"u = 2x + 1", warna=AKSEN2, b=b)
            b_du = panel.baris(r"du = 2\, dx", warna=AKSEN, b=b)
            b.main(Indicate(VGroup(b_u, b_du), color=SOROT), run_time=2.0)
        qc.periksa_adegan(self, {"lapisan": lapis},
                          hud={"identitas": ident, "papan": panel.semua()})

        # ---------------------------------------------------------------
        # empat: empat langkah yang urutannya tidak pernah berubah.
        # ---------------------------------------------------------------
        langkah = VGroup(*[
            sinema.label(t, ukuran=36, warna=w)
            for t, w in [("pilih u", AKSEN2), ("hitung du", AKSEN),
                         ("cocokkan", SOROT), ("kembalikan", TINTA)]
        ])
        langkah.arrange(DOWN, buff=0.34, aligned_edge=LEFT).move_to(PANGGUNG)
        with sinema.babak(self, "empat", DURASI) as b:
            b.main(FadeOut(lapis), run_time=0.8)
            for i in range(4):
                b.main(FadeIn(langkah[i], shift=0.2 * RIGHT), run_time=1.8)
            b.main(Indicate(langkah, color=SOROT), run_time=2.2)
            b.main(Indicate(langkah[2], color=AKSEN), run_time=1.6)
        qc.periksa_adegan(self, {},
                          hud={"identitas": ident, "papan": panel.semua()})

        # ---------------------------------------------------------------
        # contoh2: du-nya sudah lengkap di soal, tidak perlu disesuaikan.
        # ---------------------------------------------------------------
        soal2 = baris_rumus(
            (r"\int", TINTA), (r"2x", AKSEN), (r"(x^2 + 5)^4", AKSEN2), (r"dx", TINTA),
            ukuran=62,
        ).move_to(PANGGUNG)
        with sinema.babak(self, "contoh2", DURASI) as b:
            bersihkan_panel(self, panel, [b_rantai, b_benar, b_u, b_du], b=b)
            b.main(FadeOut(langkah), FadeIn(soal2, scale=0.9), run_time=2.4)
            b_u2 = panel.baris(r"u = x^2 + 5", warna=AKSEN2, b=b)
            b_du2 = panel.baris(r"du = 2x\, dx", warna=AKSEN, b=b)
            b.tunggu_sampai(sinema.mulai(jam, "Bagian 2x dx sudah ada"))
            b.main(Indicate(soal2[1], color=SOROT), run_time=2.4)
            b.main(Indicate(b_du2, color=SOROT), run_time=2.0)
            b.main(Indicate(soal2[2], color=SOROT), run_time=2.2)
        qc.periksa_adegan(self, {"soal kedua": soal2},
                          hud={"identitas": ident, "papan": panel.semua()})

        # ---------------------------------------------------------------
        # hasil2: jawabannya, dan u dikembalikan ke bentuk dalam x.
        # ---------------------------------------------------------------
        jawab2 = baris_rumus((r"\frac{(x^2 + 5)^5}{5} + C", SOROT)).move_to(PANGGUNG)
        with sinema.babak(self, "hasil2", DURASI) as b:
            b.main(Transform(soal2, jawab2), run_time=2.8)
            b.main(Indicate(soal2, color=AKSEN), run_time=2.2)
            b_jawab2 = panel.baris(r"\text{kembali ke } x", warna=SOROT, b=b)
            b.main(Indicate(b_jawab2, color=AKSEN), run_time=1.8)

        # ---------------------------------------------------------------
        # contoh3: yang kurang cuma sebuah ANGKA, dan angka boleh disesuaikan.
        # ---------------------------------------------------------------
        soal3 = baris_rumus(
            (r"\int", TINTA), (r"x", AKSEN), (r"\sqrt{x^2 + 5}", AKSEN2), (r"dx", TINTA),
            ukuran=62,
        ).move_to(PANGGUNG)
        kurang = baris_rumus(
            (r"x\, dx", AKSEN), (r"=", REDUP), (r"\tfrac{1}{2}", SOROT),
            (r"\cdot\, 2x\, dx", AKSEN), ukuran=54,
        )
        kurang.next_to(soal3, DOWN, buff=0.6)
        with sinema.babak(self, "contoh3", DURASI) as b:
            bersihkan_panel(self, panel, [b_u2, b_du2, b_jawab2], b=b)
            b.main(FadeOut(soal2), run_time=0.8)
            b.main(FadeIn(soal3, scale=0.9), run_time=2.4)
            b.main(FadeIn(kurang), run_time=2.6)
            b.tunggu_sampai(sinema.mulai(jam, "Yang kurang cuma angka"))
            b.main(Indicate(kurang[2], color=AKSEN), run_time=2.0)
            b_angka = panel.baris(r"\text{kurang } \tfrac{1}{2}", warna=SOROT, b=b)
            b.main(Indicate(b_angka, color=AKSEN), run_time=1.8)
            b.main(Indicate(soal3[1], color=SOROT), run_time=1.6)
        qc.periksa_adegan(self, {"soal ketiga": soal3, "yang kurang": kurang},
                          [("soal ketiga", "yang kurang")],
                          hud={"identitas": ident, "papan": panel.semua()})

        # ---------------------------------------------------------------
        # gagal: x di depan dibuang, dan yang kurang jadi memuat x.
        # ---------------------------------------------------------------
        soal4 = baris_rumus(
            (r"\int", TINTA), (r"\sqrt{x^2 + 5}", AKSEN2), (r"dx", TINTA),
            ukuran=62,
        ).move_to(soal3)
        kurang4 = baris_rumus(
            (r"dx", AKSEN), (r"=", REDUP), (r"\tfrac{1}{2x}", AKSEN),
            (r"\cdot\, 2x\, dx", AKSEN), ukuran=54,
        )
        kurang4.next_to(soal4, DOWN, buff=0.6)
        with sinema.babak(self, "gagal", DURASI) as b:
            b.main(Transform(soal3, soal4), run_time=2.4)
            b.main(Transform(kurang, kurang4), run_time=2.4)
            b.main(Indicate(kurang4[2], color=SOROT), run_time=2.2)
            b_gagal = panel.baris(r"\text{memuat } x", warna=AKSEN, b=b)
            b.main(Indicate(b_gagal, color=SOROT), run_time=2.0)
            b.main(Indicate(soal3, color=AKSEN), run_time=1.6)
            b.tunggu_sampai(sinema.mulai(jam, "Yang memuat x tidak."))
            b_tutup = panel.baris(r"\text{angka boleh, } x \text{ tidak}",
                                  warna=SOROT, b=b)
            b.main(Indicate(b_tutup, color=AKSEN), run_time=2.2)
            b.main(Indicate(b_gagal, color=SOROT), run_time=2.0)
        qc.periksa_adegan(self, {"soal keempat": soal3, "yang kurang": kurang},
                          [("soal keempat", "yang kurang")],
                          hud={"identitas": ident, "papan": panel.semua()})
