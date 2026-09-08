"""Video Integral Materi 03 (STANDAR v3): substitusi, melihat lapisan.

    manimgl manim/scenes/integral03_substitusi.py IntegralSubstitusi -w -l

DITULIS ULANG 9 September 2026 mengikuti `docs/tugas/STANDAR-VIDEO-V3.md`.
Naskah 34 segmen (316 detik), animasi dipicu per KATA lewat `sinema.JamKata`
dan `b.tunggu_kata`, bukan lagi lewat pembagian waktu per babak.

TANPA BIDANG KOORDINAT SAMA SEKALI, dan itu disengaja. Seluruh isi materi ini
aljabar lapisan: memilih u, menghitung du, mencocokkannya dengan soal. Tidak
ada satu pun pernyataan tentang bentuk kurva atau luas. Memaksakan bidang
koordinat hanya akan memberi gambar yang tidak pernah dipakai, dan aturan
proyek "3D hanya jika dibutuhkan" berlaku sama untuk bidang dua dimensi.
Panggungnya rumus yang berubah di tengah layar, dan itu memang benda yang
sedang dibicarakan.

SATU PENGECUALIAN: segar-ingat tentang "+ C" memakai tiga busur sejajar TANPA
sumbu. Yang perlu terlihat cuma bahwa ketiganya bentuknya sama dan cuma
tingginya berbeda; menambahkan sumbu bernomor akan meminta mata membaca angka
yang tidak pernah disebut narator.

RUMUS DISUSUN DARI POTONGAN TERPISAH, bukan satu `Tex` panjang yang lalu
diiris `get_part_by_tex`. Sebabnya: angka "2" muncul berkali-kali di rumus
video ini, dan `get_part_by_tex` mengembalikan yang PERTAMA, bukan yang
dimaksud. Potongan terpisah bisa diwarnai dan dinyalakan tepat sasaran.

ANGKA
Diperiksa sympy lewat `alat/klaim-video-integral03.json`, 14 dari 14 lolos,
termasuk angka ANTARA yang diucapkan langkah demi langkah. Arah gagalnya juga
dibuktikan: `alat/klaim-video-integral03-salah.json --harus-gagal` berisi
empat klaim yang sengaja keliru, dan keempatnya ditolak, termasuk tebakan
naif (2x+1)^6/6 yang jadi inti seluruh video.

WARNA
AKSEN2 biru = lapisan dalam u. AKSEN merah = faktor du dan angka yang harus
disesuaikan. SOROT ungu = jawaban benar dan kesimpulan.
CATATAN JUJUR: docstring versi lama mengaku warnanya "sama dengan widget
`cocokkan-lapisan`". Widgetnya dibuka 9 Sep 2026 dan itu TIDAK benar: widget
memakai navy dan emas MANTRA, dan tidak mewarnai u berbeda dari du sama
sekali. Yang memang sama istilah dan contohnya (tiga soal yang sama persis,
"yang kurang cuma sebuah angka", "masih memuat x", "kembalikan u"), dan itu
yang penting bagi siswa.

Alur berkas: naskah -> buat_narasi.py -> adegan ini -> gabung_audio.py
integral03-substitusi IntegralSubstitusi --uji -> buat_subtitle.py.
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

    DIRATAKAN DI TENGAH, bukan di bawah. Versi 8 Sep meratakan tepi bawah, dan
    pada render 9 Sep hasilnya salah baca: "+ C" di sebelah sebuah pecahan
    turun sampai sejajar penyebutnya, sehingga x^(n+1)/(n+1) + C terbaca
    seolah C ada DI DALAM penyebut. Rata tengah juga cara LaTeX menaruh
    integran di sebelah tanda integral yang tinggi.
    """
    g = VGroup(*[rumus(t, ukuran, w) for t, w in potongan])
    g.arrange(RIGHT, buff=buff)
    return g


def busur(geser, warna, lebar=2.6, tinggi=0.35):
    """Satu busur cekung TANPA sumbu, untuk segar-ingat soal '+ C'.

    Titiknya DIHITUNG dari x kuadrat, bukan digambar tangan, supaya ketiga
    busur benar-benar sebangun dan bedanya cuma tinggi.
    """
    return ParametricCurve(
        lambda t: np.array([t * lebar / 2.0,
                            tinggi * t * t + geser, 0.0]),
        t_range=(-1.0, 1.0, 0.02),
    ).set_stroke(warna, 3.0)


def bersihkan_panel(scene, papan, buang, b=None, run_time=0.9):
    """Buang beberapa baris panel sekaligus, lalu rapatkan sisanya."""
    buang = [m for m in buang if m is not None]
    if not buang:
        return
    scene.play(*[FadeOut(m) for m in buang], run_time=run_time)
    for m in buang:
        if m in papan.baris_lain:
            papan.baris_lain.remove(m)
        scene.remove(m)
    for i, m in enumerate(papan.baris_lain):
        papan.tempat_baris(m, i)
    papan.perbarui_alas()
    if b is not None:
        b.catat(run_time)


class IntegralSubstitusi(AdeganMatra):
    def construct(self):
        panel = sinema.PapanRumus(self, ukuran=30, alas=True)
        KATA = sinema.JamKata(TOPIK)

        # =============================================================
        # PEMBUKA: satu pertanyaan yang dijawab video ini.
        # =============================================================
        soal = baris_rumus(
            # SATU potongan untuk (2x + 1)^5, bukan basis dan pangkat
            # terpisah: potongan r"^5" sendirian membangun pangkat yang
            # tidak menempel pada apa pun, dan pada render 9 Sep 2026
            # rumus inti video ini terbaca "(2x + 1) 5 dx".
            (r"\int", TINTA), (r"(2x + 1)^5", AKSEN2), (r"dx", TINTA),
            ukuran=62,
        ).move_to(PANGGUNG)

        ident = sinema.identitas(self, "segar-ingat: Materi 01 dan 02")
        self.remove(ident)
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bagaimana")
            b.main(FadeIn(ident), run_time=1.0)
            b.tunggu_kata("antiturunan")
            b.main(FadeIn(soal, scale=0.9), run_time=2.2)
            b.tunggu_kata("lima")
            b.main(Indicate(soal[1], color=AKSEN), run_time=1.2)
            b.tunggu_kata("menguraikan")
            b.main(Indicate(soal, color=SOROT), run_time=2.0)
        qc.periksa_adegan(self, {"soal": soal}, hud={"identitas": ident})

        # =============================================================
        # SEGAR-INGAT: Materi 01 (antiturunan, tebak lalu periksa, + C)
        # dan Materi 02 (lambang integral, aturan pangkat).
        # =============================================================
        panah_balik = baris_rumus(
            (r"f'", AKSEN), (r"\longrightarrow", REDUP), (r"f", TINTA), ukuran=52,
        ).move_to(PANGGUNG)

        with sinema.babak(self, "ingat1", DURASI, kata=KATA) as b:
            # Soalnya TIDAK dibuang di awal babak. Versi pertama membuangnya di
            # detik 9 dan panah baru muncul di detik 11,6, jadi layar kosong
            # tiga detik (ditangkap cek_layar_kosong, bukan mata saya).
            b.tunggu_kata("menjawab")
            b.main(Indicate(soal, color=AKSEN), run_time=1.4)
            b.tunggu_kata("Materi")
            b_m01 = panel.baris(r"\text{Integral 01: antiturunan}", warna=REDUP, b=b)
            b.tunggu_kata("membalik")
            b.main(FadeOut(soal), FadeIn(panah_balik), run_time=1.6)
            b.tunggu_kata("antiturunan")
            b.main(Indicate(b_m01, color=AKSEN), run_time=1.0)
            b.tunggu_kata("mesin")
            b.main(Indicate(panah_balik, color=AKSEN), run_time=1.6)
        qc.periksa_adegan(self, {"panah balik": panah_balik},
                          hud={"identitas": ident, "papan": panel.semua()})

        # Alur "tebak, lalu periksa dengan menurunkannya".
        alur = VGroup(
            sinema.label("tebak", ukuran=34, warna=AKSEN2),
            rumus(r"\longrightarrow", 34, REDUP),
            sinema.label("turunkan", ukuran=34, warna=AKSEN),
            rumus(r"\longrightarrow", 34, REDUP),
            sinema.label("cocok", ukuran=34, warna=SOROT),
        )
        alur.arrange(RIGHT, buff=0.22).next_to(panah_balik, DOWN, buff=0.70)

        with sinema.babak(self, "ingat2", DURASI, kata=KATA) as b:
            b.tunggu_kata("menebak")
            b.main(FadeIn(alur[0]), run_time=0.8)
            b.tunggu_kata("memeriksa")
            b.main(FadeIn(alur[1]), FadeIn(alur[2]), run_time=1.2)
            b.tunggu_kata("menurunkannya")
            b.main(Indicate(alur[2], color=SOROT), run_time=1.6)
            b.tunggu_kata("cocok")
            b.main(FadeIn(alur[3]), FadeIn(alur[4]), run_time=1.6)
            b.tunggu_kata("benar")
            b.main(Indicate(alur[4], color=AKSEN), run_time=1.6)
        qc.periksa_adegan(self, {"panah balik": panah_balik, "alur": alur},
                          [("panah balik", "alur")],
                          hud={"identitas": ident, "papan": panel.semua()})

        # "+ C" dan gambar kuncinya: tiga busur sebangun, cuma beda tinggi.
        plus_c = rumus(r"+\, C", 46, AKSEN).next_to(panah_balik, RIGHT, buff=0.45)
        # Tinggi dan jarak busurnya kecil DENGAN SENGAJA: versi pertama setinggi
        # 2,8 satuan layar dan pangkalnya masuk jalur subtitle (diukur sebelum
        # render). Yang perlu terlihat cuma "bentuknya sama, tingginya beda".
        busur_kel = VGroup(busur(0.32, SOROT), busur(0.0, TINTA), busur(-0.32, SOROT))
        busur_kel[0].set_stroke(opacity=0.55)
        busur_kel[2].set_stroke(opacity=0.55)
        busur_kel.next_to(alur, DOWN, buff=0.30)

        with sinema.babak(self, "ingat3", DURASI, kata=KATA) as b:
            b.tunggu_kata("berakhiran")
            b.main(FadeIn(plus_c), run_time=0.7)
            b.tunggu_kata("C")
            b.main(Indicate(plus_c, color=SOROT), run_time=0.6)
            b.tunggu_kata("menggeser")
            b.main(FadeOut(alur), ShowCreation(busur_kel), run_time=1.4)
            b.tunggu_kata("mengubah")
            b.main(Indicate(busur_kel, color=AKSEN, scale_factor=1.04), run_time=1.8)
        qc.periksa_adegan(self, {"panah balik": panah_balik, "keluarga": busur_kel},
                          [("panah balik", "keluarga")],
                          hud={"identitas": ident, "papan": panel.semua()})

        lambang = baris_rumus(
            (r"\int", AKSEN), (r"f(x)", TINTA), (r"dx", AKSEN), ukuran=58,
        ).move_to(PANGGUNG)

        with sinema.babak(self, "ingat4", DURASI, kata=KATA) as b:
            # Layar dikosongkan BERTAHAP: panah balik bertahan sampai lambang
            # integral siap menggantikannya. Versi pertama membuang ketiganya
            # sekaligus dan meninggalkan layar kosong empat detik.
            b.tunggu_kata("Materi")
            b.main(FadeOut(busur_kel), FadeOut(plus_c), run_time=1.2)
            b.tunggu_kata("tanda")
            b_m02 = panel.baris(r"\text{Integral 02: aturan pangkat}",
                                warna=REDUP, b=b)
            b.tunggu_kata("pangkatnya")
            b.main(FadeOut(panah_balik), FadeIn(lambang), run_time=1.0)
            b.tunggu_kata("berkenalan")
            b.main(Indicate(b_m02, color=AKSEN), run_time=0.6)
            b.tunggu_kata("lambang")
            b.main(Indicate(lambang, color=AKSEN2), run_time=0.9)
            b.tunggu_kata("cepat")
            b.main(Indicate(lambang[0], color=SOROT), run_time=1.4)
        qc.pastikan_hilang(self, {"panah balik": panah_balik, "keluarga": busur_kel},
                           nama="akhir segar-ingat Materi 01")
        qc.periksa_adegan(self, {"lambang": lambang},
                          hud={"identitas": ident, "papan": panel.semua()})

        pangkat = baris_rumus(
            (r"\int x^n\, dx =", TINTA), (r"\frac{x^{n+1}}{n+1}", AKSEN2),
            (r"+\, C", AKSEN), ukuran=54,
        ).move_to(PANGGUNG)
        kecuali = rumus(r"n \neq -1", 40, AKSEN).next_to(pangkat, DOWN, buff=0.55)

        with sinema.babak(self, "ingat5", DURASI, kata=KATA) as b:
            b.tunggu_kata("antiturunan")
            b.main(FadeOut(lambang), FadeIn(pangkat[0]), run_time=2.0)
            b.tunggu_kata("dibagi")
            b.main(FadeIn(pangkat[1]), FadeIn(pangkat[2]), run_time=2.2)
            b.tunggu_kata("Berlaku")
            b.main(Indicate(pangkat[1], color=SOROT), run_time=1.0)
            b.tunggu_kata("kecuali")
            b.main(FadeIn(kecuali, scale=0.7), run_time=1.8)
        qc.periksa_adegan(self, {"aturan pangkat": pangkat, "kecuali": kecuali},
                          [("aturan pangkat", "kecuali")],
                          hud={"identitas": ident, "papan": panel.semua()})

        # =============================================================
        # Apa yang dibawa ke video ini, lalu soalnya.
        # =============================================================
        ident2 = sinema.identitas(self, "aturan rantai dibalik")
        self.remove(ident2)

        with sinema.babak(self, "bawa", DURASI, kata=KATA) as b:
            # Identitas lama habis DULU, baru yang baru muncul.
            b.tunggu_kata("kalimat")
            b.main(FadeOut(kecuali), FadeOut(ident), run_time=1.4)
            b.tunggu_kata("ditulis")
            b.main(FadeIn(ident2), run_time=0.7)
            b.tunggu_kata("polos")
            b_polos = panel.baris(r"\text{aturan pangkat: untuk } x \text{ polos}",
                                  warna=REDUP, b=b)
            b.tunggu_kata("sedangkan")
            b.main(FadeOut(pangkat), FadeIn(soal), run_time=1.4)
            b.tunggu_kata("dua")
            b.main(Indicate(soal[1], color=SOROT), run_time=1.8)
        qc.pastikan_hilang(self, {"aturan pangkat": pangkat, "identitas lama": ident},
                           nama="pindah ke soal video ini")
        qc.periksa_adegan(self, {"soal": soal},
                          hud={"identitas": ident2, "papan": panel.semua()})

        # Uraian pangkat lima, suku demi suku, supaya "enam suku" terlihat.
        urai = VGroup(*[rumus(t, 30, REDUP) for t in
                        [r"32x^5", r"+\, 80x^4", r"+\, 80x^3",
                         r"+\, 40x^2", r"+\, 10x", r"+\, 1"]])
        urai.arrange(RIGHT, buff=0.14).next_to(soal, DOWN, buff=0.65)

        with sinema.babak(self, "uraikan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Menguraikan")
            b.main(Indicate(soal[1], color=AKSEN), run_time=1.4)
            b.tunggu_kata("Hasilnya")
            b.main(LaggedStartMap(FadeIn, urai, lag_ratio=0.5), run_time=1.4)
            b.tunggu_kata("tiap")
            b.main(Indicate(urai[1], color=AKSEN), run_time=1.0)
            b.tunggu_kata("diantiturunkan")
            b.main(LaggedStartMap(Indicate, urai, lag_ratio=0.35, color=AKSEN), run_time=2.4)
        qc.periksa_adegan(self, {"soal": soal, "uraian": urai},
                          [("soal", "uraian")],
                          hud={"identitas": ident2, "papan": panel.semua()})

        besar1 = rumus(r"(2x + 1)^{10} \;\rightarrow\; 11 \text{ suku}", 34, REDUP)
        besar2 = rumus(r"(2x + 1)^{20} \;\rightarrow\; 21 \text{ suku}", 34, REDUP)
        besar1.move_to(urai)
        besar2.next_to(besar1, DOWN, buff=0.35)

        with sinema.babak(self, "besar", DURASI, kata=KATA) as b:
            b.tunggu_kata("sepuluh")
            b.main(FadeOut(urai), FadeIn(besar1), run_time=1.4)
            b.tunggu_kata("sebelas")
            b.main(Indicate(besar1, color=AKSEN), run_time=1.4)
            b.tunggu_kata("satu")
            b.main(FadeIn(besar2), run_time=1.4)
            b.tunggu_kata("Cara")
            b.main(Indicate(VGroup(besar1, besar2), color=SOROT), run_time=2.2)
        qc.periksa_adegan(self, {"soal": soal, "pangkat besar": VGroup(besar1, besar2)},
                          [("soal", "pangkat besar")],
                          hud={"identitas": ident2, "papan": panel.semua()})

        # =============================================================
        # CONTOH ANGKA: tebak, lalu buktikan tebakan itu keliru.
        # =============================================================
        tebakan = baris_rumus(
            (r"\frac{(2x + 1)^6}{6}", TINTA), (r"?", AKSEN), ukuran=62,
        ).move_to(PANGGUNG)

        with sinema.babak(self, "tebak", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jadi")
            b.main(FadeOut(besar1), FadeOut(besar2), run_time=0.9)
            b.tunggu_kata("Materi")
            b.main(Indicate(b_m01, color=AKSEN), run_time=1.2)
            b.tunggu_kata("menebak")
            b.main(Indicate(soal, color=AKSEN2), run_time=1.4)
            b.tunggu_kata("Naikkan")
            b.main(Indicate(soal[1], color=SOROT), run_time=0.9)
            b.tunggu_kata("lalu")
            b_tebak = panel.baris(r"\text{tebakan}", warna=AKSEN, b=b)
            b.main(Indicate(b_tebak, color=SOROT), run_time=0.5)

        with sinema.babak(self, "tebakrumus", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tebakannya")
            b.main(Transform(soal, tebakan), run_time=2.0)
            b.tunggu_kata("enam")
            b.main(Indicate(soal, color=AKSEN), run_time=0.6)
            b.tunggu_kata("dibagi")
            b.main(Indicate(soal, color=SOROT), run_time=1.8)
        qc.periksa_adegan(self, {"tebakan": soal},
                          hud={"identitas": ident2, "papan": panel.semua()})

        # Turunan tebakan itu, potongan demi potongan.
        turun = baris_rumus(
            (r"\left[\frac{(2x + 1)^6}{6}\right]' =", TINTA),
            (r"(2x + 1)^5", TINTA),
            (r"\cdot\, 2", AKSEN),
            ukuran=52,
        ).move_to(PANGGUNG)

        with sinema.babak(self, "periksa", DURASI, kata=KATA) as b:
            b.tunggu_kata("menurunkannya")
            b.main(FadeOut(soal), FadeIn(turun[0]), run_time=1.6)
            b.tunggu_kata("Pangkat")
            b.main(FadeIn(turun[1]), run_time=1.0)
            b.tunggu_kata("lima")
            b.main(Indicate(turun[1], color=AKSEN), run_time=0.7)
            b.tunggu_kata("angka")
            b.main(Indicate(turun[0], color=REDUP, scale_factor=1.03), run_time=1.0)
            b.tunggu_kata("habis")
            b.main(Indicate(turun[0], color=AKSEN, scale_factor=1.03), run_time=2.4)

        with sinema.babak(self, "rantai", DURASI, kata=KATA) as b:
            b.tunggu_kata("rantai")
            b_rantai = panel.baris(r"\text{aturan rantai}", warna=AKSEN, b=b)
            b.tunggu_kata("langkah")
            b.main(Indicate(b_rantai, color=SOROT), run_time=1.4)
            b.tunggu_kata("Hasilnya")
            b.main(FadeIn(turun[2], scale=0.6), run_time=1.0)
            b.tunggu_kata("dikalikan")
            b.main(Indicate(turun[2], color=SOROT), run_time=0.7)
            b.tunggu_kata("kurungnya")
            b.main(Indicate(turun[2], color=AKSEN), run_time=1.8)
        qc.periksa_adegan(self, {"turunan tebakan": turun},
                          hud={"identitas": ident2, "papan": panel.semua()})

        isi = baris_rumus(
            (r"(2x + 1)'", AKSEN2), (r"=", REDUP), (r"2", AKSEN), ukuran=46,
        ).next_to(turun, DOWN, buff=0.60)

        with sinema.babak(self, "turunanisi", DURASI, kata=KATA) as b:
            b.tunggu_kata("Turunan")
            b.main(FadeIn(isi[0]), FadeIn(isi[1]), run_time=1.2)
            b.tunggu_kata("adalah")
            b.main(FadeIn(isi[2], scale=0.6), run_time=1.8)
        qc.periksa_adegan(self, {"turunan tebakan": turun, "turunan isi": isi},
                          [("turunan tebakan", "turunan isi")],
                          hud={"identitas": ident2, "papan": panel.semua()})

        banding = baris_rumus(
            (r"2", AKSEN), (r"(2x + 1)^5", TINTA),
            (r"\quad\text{lawan}\quad", REDUP), (r"(2x + 1)^5", TINTA),
            ukuran=48,
        ).move_to(PANGGUNG)

        with sinema.babak(self, "kelebihan", DURASI, kata=KATA) as b:
            b.tunggu_kata("turunan")
            b.main(FadeOut(turun), FadeOut(isi), FadeIn(banding), run_time=1.8)
            b.tunggu_kata("lima")
            b.main(Indicate(banding[0], color=SOROT), run_time=1.2)
            b.tunggu_kata("lipat")
            b_lebih = panel.baris(r"\text{kelebihan } 2", warna=AKSEN, b=b)
            b.tunggu_kata("cari")
            b.main(Indicate(b_lebih, color=SOROT), run_time=1.6)

        # Dinaikkan 0,9 satuan: di bawahnya nanti berdiri tiga baris
        # pemeriksaan, dan dari PANGGUNG dua baris terakhirnya jatuh ke jalur
        # subtitle (diukur sebelum render, bukan ditemukan sesudahnya).
        benar = baris_rumus(
            (r"\frac{(2x + 1)^6}{12}", SOROT), (r"+\, C", AKSEN), ukuran=62,
        ).move_to(PANGGUNG + UP * 0.9)

        with sinema.babak(self, "bagi", DURASI, kata=KATA) as b:
            b.tunggu_kata("cuma")
            b.main(Indicate(banding[0], color=AKSEN), run_time=1.2)
            b.tunggu_kata("gampang")
            b.main(FadeOut(banding), run_time=1.4)
            b.tunggu_kata("Bagi")
            b.main(FadeIn(benar[0], scale=0.9), run_time=2.2)
        qc.pastikan_hilang(self, {"perbandingan": banding, "turunan tebakan": turun},
                           nama="akhir babak bagi")

        with sinema.babak(self, "jawaban", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jawabannya")
            b.main(Indicate(benar[0], color=AKSEN), run_time=1.6)
            b.tunggu_kata("pangkat")
            b.main(Indicate(benar[0], color=SOROT, scale_factor=1.05), run_time=1.0)
            b.tunggu_kata("dibagi")
            b.main(Indicate(benar[0], color=AKSEN2, scale_factor=1.05), run_time=1.2)
            b.tunggu_kata("C")
            b.main(FadeIn(benar[1], scale=0.6), run_time=1.6)
        qc.periksa_adegan(self, {"jawaban benar": benar},
                          hud={"identitas": ident2, "papan": panel.semua()})

        # Jawabannya DIPERIKSA lagi, langkah demi langkah dengan angka.
        cek1 = rumus(r"\left[\frac{(2x + 1)^6}{12}\right]'", 34, TINTA)
        cek2 = rumus(r"= \tfrac{6}{12} \cdot 2 \cdot (2x + 1)^5", 34, TINTA)
        cek3 = rumus(r"\tfrac{6}{12} \cdot 2 = 1", 34, SOROT)
        cek1.next_to(benar, DOWN, buff=0.40)
        cek2.next_to(cek1, DOWN, buff=0.16)
        cek3.next_to(cek2, DOWN, buff=0.16)

        with sinema.babak(self, "buktijawab", DURASI, kata=KATA) as b:
            b.tunggu_kata("Diperiksa")
            b.main(FadeIn(cek1), run_time=2.0)
            b.tunggu_kata("Turunannya")
            b.main(FadeIn(cek2), run_time=2.4)
            b.tunggu_kata("lima")
            b.main(Indicate(cek2, color=AKSEN), run_time=1.2)
            b.tunggu_kata("sama")
            b.main(FadeIn(cek3), run_time=1.2)
            b.tunggu_kata("cocok")
            b_cocok = panel.baris(r"\text{cocok}", warna=SOROT, b=b)
            b.main(Indicate(b_cocok, color=AKSEN), run_time=0.8)
        qc.periksa_adegan(self, {"jawaban benar": benar,
                                 "pemeriksaan": VGroup(cek1, cek2, cek3)},
                          [("jawaban benar", "pemeriksaan")],
                          hud={"identitas": ident2, "papan": panel.semua()})

        # =============================================================
        # ASAL RUMUS: angka dua itu turunan isi kurung, jadi diberi nama u.
        # =============================================================
        u_baris = baris_rumus(
            (r"u =", AKSEN2), (r"2x + 1", AKSEN2), ukuran=52,
        ).move_to(PANGGUNG)
        du_baris = baris_rumus(
            (r"du =", AKSEN), (r"2\, dx", AKSEN), ukuran=52,
        ).next_to(u_baris, DOWN, buff=0.42)
        dx_baris = baris_rumus(
            (r"dx =", AKSEN), (r"\tfrac{du}{2}", AKSEN), ukuran=52,
        ).next_to(du_baris, DOWN, buff=0.42)

        with sinema.babak(self, "namai", DURASI, kata=KATA) as b:
            b.tunggu_kata("Angka")
            b.main(FadeOut(cek1), FadeOut(cek2), FadeOut(cek3), run_time=1.4)
            b.tunggu_kata("Ia")
            b.main(Indicate(benar[0], color=AKSEN), run_time=1.4)
            b.tunggu_kata("Maka")
            b.main(FadeOut(benar), run_time=1.2)
            b.tunggu_kata("u")
            b.main(FadeIn(u_baris[0], scale=0.7), run_time=1.6)

        with sinema.babak(self, "du", DURASI, kata=KATA) as b:
            b.tunggu_kata("u")
            b.main(FadeIn(u_baris[1]), run_time=2.2)
            b.tunggu_kata("Turunkan")
            b.main(Indicate(u_baris, color=SOROT), run_time=1.2)
            b.tunggu_kata("du")
            # 1,8 detik, bukan 2,2: baris panel di belakangnya memakan 0,9
            # detik lagi, dan babak ini cuma 7,4 detik.
            b.main(FadeIn(du_baris), run_time=1.8)
            b_u = panel.baris(r"u = 2x + 1", warna=AKSEN2, b=b)

        with sinema.babak(self, "tukar", DURASI, kata=KATA) as b:
            b.tunggu_kata("situ")
            b.main(FadeIn(dx_baris), run_time=1.6)
            b.tunggu_kata("Sekarang")
            b.main(Indicate(dx_baris, color=SOROT), run_time=1.2)
            b.tunggu_kata("ulang")
            b_du = panel.baris(r"du = 2\, dx", warna=AKSEN, b=b)
            b.main(Indicate(VGroup(b_u, b_du), color=SOROT), run_time=1.4)
        qc.periksa_adegan(self, {"u": u_baris, "du": du_baris, "dx": dx_baris},
                          [("u", "du"), ("du", "dx")],
                          hud={"identitas": ident2, "papan": panel.semua()})

        dalam_u = baris_rumus(
            (r"\frac{1}{2}", AKSEN), (r"\int", TINTA), (r"u^5", AKSEN2),
            (r"du", AKSEN), ukuran=60,
        ).move_to(PANGGUNG)

        with sinema.babak(self, "dalamu", DURASI, kata=KATA) as b:
            b.tunggu_kata("Integral")
            b.main(FadeOut(u_baris), FadeOut(du_baris), FadeOut(dx_baris),
                   FadeIn(dalam_u), run_time=2.6)
            b.tunggu_kata("Aturan")
            b.main(Indicate(b_m02, color=AKSEN), run_time=1.4)
            b.tunggu_kata("sebab")
            b.main(Indicate(dalam_u[2], color=SOROT), run_time=1.4)
            b.tunggu_kata("polos")
            b_polos2 = panel.baris(r"u \text{ polos: aturan pangkat boleh}",
                                   warna=AKSEN2, b=b)

        hasil_u = baris_rumus(
            (r"\frac{1}{2} \cdot \frac{u^6}{6}", AKSEN2), ukuran=60,
        ).move_to(PANGGUNG)
        hasil_u12 = baris_rumus((r"\frac{u^6}{12}", AKSEN2), ukuran=60).move_to(PANGGUNG)

        with sinema.babak(self, "kerjakan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Hasilnya")
            b.main(Transform(dalam_u, hasil_u), run_time=2.0)
            b.tunggu_kata("lalu")
            b.main(Indicate(dalam_u, color=SOROT), run_time=1.4)
            b.tunggu_kata("jadi")
            b.main(Transform(dalam_u, hasil_u12), run_time=1.4)
            b.tunggu_kata("belas")
            b.main(Indicate(dalam_u, color=AKSEN), run_time=1.6)

        benar2 = baris_rumus(
            (r"\frac{(2x + 1)^6}{12} + C", SOROT), ukuran=60,
        ).move_to(PANGGUNG)

        with sinema.babak(self, "kembalikan", DURASI, kata=KATA) as b:
            b.tunggu_kata("terakhir")
            b.main(Indicate(dalam_u, color=SOROT), run_time=1.6)
            b.tunggu_kata("Kembalikan")
            b.main(Transform(dalam_u, benar2), run_time=2.2)
            b.tunggu_kata("jawabannya")
            b.main(Indicate(dalam_u, color=AKSEN), run_time=1.2)
            b.tunggu_kata("tebakan")
            b.main(Indicate(b_tebak, color=SOROT), run_time=1.4)
        qc.periksa_adegan(self, {"jawaban lewat u": dalam_u},
                          hud={"identitas": ident2, "papan": panel.semua()})

        # =============================================================
        # BENTUK UMUM: empat langkah yang urutannya tidak pernah berubah.
        # =============================================================
        ident3 = sinema.identitas(self, "empat langkah, tiga contoh")
        self.remove(ident3)

        langkah = VGroup(*[
            sinema.label(t, ukuran=36, warna=w)
            for t, w in [("pilih u", AKSEN2), ("hitung du", AKSEN),
                         ("cocokkan", SOROT), ("kembalikan", TINTA)]
        ])
        langkah.arrange(DOWN, buff=0.34, aligned_edge=LEFT).move_to(PANGGUNG)

        with sinema.babak(self, "empat", DURASI, kata=KATA) as b:
            b.tunggu_kata("empat")
            b.main(FadeOut(dalam_u), FadeOut(ident2), run_time=1.2)
            b.tunggu_kata("urutannya")
            b.main(FadeIn(ident3), run_time=0.6)
            bersihkan_panel(self, panel, [b_tebak, b_rantai, b_lebih, b_cocok,
                                          b_polos, b_polos2], b=b)
            b.tunggu_kata("Pilih")
            b.main(FadeIn(langkah[0], shift=0.2 * RIGHT), run_time=0.6)
            b.tunggu_kata("Hitung")
            b.main(FadeIn(langkah[1], shift=0.2 * RIGHT), run_time=1.5)
            b.tunggu_kata("Cocokkan")
            b.main(FadeIn(langkah[2], shift=0.2 * RIGHT), run_time=2.8)
            b.tunggu_kata("Kerjakan")
            b.main(FadeIn(langkah[3], shift=0.2 * RIGHT), run_time=1.3)
            b.tunggu_kata("lalu")
            b.main(Indicate(langkah, color=SOROT, scale_factor=1.04), run_time=2.4)
        qc.pastikan_hilang(self, {"identitas lama": ident2},
                           nama="pindah ke bentuk umum")
        qc.periksa_adegan(self, {"empat langkah": langkah},
                          hud={"identitas": ident3, "papan": panel.semua()})

        # =============================================================
        # TIGA CONTOH: sudah cocok, kurang angka, kurang bentuk ber-x.
        # =============================================================
        soal2 = baris_rumus(
            (r"\int", TINTA), (r"2x", AKSEN), (r"(x^2 + 5)^4", AKSEN2), (r"dx", TINTA),
            ukuran=58,
        # Dinaikkan 0,75 satuan: di bawah soal ini berdiri u, du, lalu baris
        # "yang kurang" milik contoh ketiga. Dari PANGGUNG, baris terakhirnya
        # menembus jalur subtitle (diukur sebelum render).
        ).move_to(PANGGUNG + UP * 0.75)

        with sinema.babak(self, "contoh2", DURASI, kata=KATA) as b:
            b.tunggu_kata("kedua")
            b.main(FadeOut(langkah), run_time=1.4)
            b.tunggu_kata("Integral")
            b.main(FadeIn(soal2, scale=0.9), run_time=1.4)
            b.tunggu_kata("dikali")
            b.main(Indicate(soal2[1], color=SOROT), run_time=0.4)
            b.tunggu_kata("kuadrat")
            b.main(Indicate(soal2[2], color=SOROT), run_time=2.6)

        u2_baris = baris_rumus(
            (r"u = x^2 + 5", AKSEN2), ukuran=44,
        ).next_to(soal2, DOWN, buff=0.55)
        du2_baris = baris_rumus(
            (r"du = 2x\, dx", AKSEN), ukuran=44,
        ).next_to(u2_baris, DOWN, buff=0.32)

        with sinema.babak(self, "contoh2u", DURASI, kata=KATA) as b:
            b.tunggu_kata("Pilih")
            b.main(FadeIn(u2_baris), run_time=2.2)
            b.tunggu_kata("maka")
            b.main(FadeIn(du2_baris), run_time=2.4)
            b.tunggu_kata("Bagian")
            b.main(Indicate(soal2[1], color=SOROT), run_time=1.6)
            b.tunggu_kata("jadi")
            b_sesuai = panel.baris(r"\text{tidak perlu disesuaikan}",
                                  warna=SOROT, b=b)
            b.tunggu_kata("disesuaikan")
            b.main(Indicate(b_sesuai, color=AKSEN), run_time=1.8)
        qc.periksa_adegan(self, {"soal kedua": soal2, "u dan du":
                                 VGroup(u2_baris, du2_baris)},
                          [("soal kedua", "u dan du")],
                          hud={"identitas": ident3, "papan": panel.semua()})

        dalam_u2 = baris_rumus((r"\int u^4\, du", AKSEN2), ukuran=58).move_to(soal2)
        hasil_u2 = baris_rumus((r"\frac{u^5}{5}", AKSEN2), ukuran=58).move_to(soal2)
        jawab2 = baris_rumus(
            (r"\frac{(x^2 + 5)^5}{5}", SOROT), (r"+\, C", AKSEN), ukuran=58,
        ).move_to(soal2)

        with sinema.babak(self, "contoh2hasil", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tinggal")
            b.main(Transform(soal2, dalam_u2), run_time=2.0)
            b.tunggu_kata("yaitu")
            b.main(Transform(soal2, hasil_u2), run_time=2.6)
            b.tunggu_kata("Kembalikan")
            b.main(Transform(soal2, jawab2[0]), run_time=1.2)
            b.tunggu_kata("hasilnya")
            b.main(Indicate(soal2, color=AKSEN), run_time=2.6)
            b.tunggu_kata("C")
            b.main(FadeIn(jawab2[1], scale=0.6), run_time=1.6)
        qc.periksa_adegan(self, {"jawaban kedua": soal2},
                          hud={"identitas": ident3, "papan": panel.semua()})

        soal3 = baris_rumus(
            (r"\int", TINTA), (r"x", AKSEN), (r"\sqrt{x^2 + 5}", AKSEN2),
            (r"dx", TINTA), ukuran=58,
        ).move_to(soal2)

        with sinema.babak(self, "contoh3", DURASI, kata=KATA) as b:
            b.tunggu_kata("ketiga")
            b.main(FadeOut(soal2), FadeOut(jawab2[1]), run_time=1.4)
            b.tunggu_kata("Integral")
            b.main(FadeIn(soal3, scale=0.9), run_time=1.2)
            b.tunggu_kata("akar")
            b.main(Indicate(soal3[2], color=AKSEN2), run_time=3.2)
            b.tunggu_kata("Dengan")
            b.main(Indicate(u2_baris, color=SOROT), run_time=1.2)
            b.tunggu_kata("cuma")
            b.main(Indicate(soal3[1], color=SOROT), run_time=1.2)
            b.tunggu_kata("sedangkan")
            b.main(Indicate(du2_baris, color=SOROT), run_time=2.8)

        kurang = baris_rumus(
            (r"x\, dx", AKSEN), (r"=", REDUP), (r"\tfrac{1}{2}", SOROT),
            (r"\cdot\, 2x\, dx", AKSEN), ukuran=44,
        ).next_to(du2_baris, DOWN, buff=0.40)

        with sinema.babak(self, "contoh3angka", DURASI, kata=KATA) as b:
            b.tunggu_kata("kurang")
            b.main(FadeIn(kurang), run_time=1.4)
            b.tunggu_kata("setengah")
            b.main(Indicate(kurang[2], color=AKSEN), run_time=0.8)
            b.tunggu_kata("boleh")
            b_angka = panel.baris(r"\text{kurang } \tfrac{1}{2}", warna=SOROT, b=b)
            b.main(Indicate(b_angka, color=AKSEN), run_time=1.7)
        qc.periksa_adegan(self, {"soal ketiga": soal3, "yang kurang": kurang},
                          [("soal ketiga", "yang kurang")],
                          hud={"identitas": ident3, "papan": panel.semua()})

        jawab3 = baris_rumus(
            (r"\frac{(x^2 + 5)^{3/2}}{3}", SOROT), (r"+\, C", AKSEN), ukuran=54,
        ).move_to(soal3)

        with sinema.babak(self, "contoh3hasil", DURASI, kata=KATA) as b:
            b.tunggu_kata("Hasilnya")
            b.main(Transform(soal3, jawab3[0]), run_time=2.0)
            b.tunggu_kata("pangkat")
            b.main(Indicate(soal3, color=AKSEN2), run_time=1.4)
            b.tunggu_kata("dibagi")
            b.main(Indicate(soal3, color=AKSEN), run_time=1.6)
            b.tunggu_kata("C")
            b.main(FadeIn(jawab3[1], scale=0.6), run_time=1.5)

        soal4 = baris_rumus(
            (r"\int", TINTA), (r"\sqrt{x^2 + 5}", AKSEN2), (r"dx", TINTA),
            ukuran=58,
        ).move_to(soal3)
        kurang4 = baris_rumus(
            (r"dx", AKSEN), (r"=", REDUP), (r"\tfrac{1}{2x}", AKSEN),
            (r"\cdot\, 2x\, dx", AKSEN), ukuran=44,
        ).move_to(kurang)

        with sinema.babak(self, "gagal", DURASI, kata=KATA) as b:
            b.tunggu_kata("buang")
            b.main(FadeOut(jawab3[1]), Transform(soal3, soal4), run_time=1.4)
            b.tunggu_kata("sisakan")
            b.main(Indicate(soal3, color=AKSEN2), run_time=2.2)
            b.tunggu_kata("Dengan")
            b.main(Indicate(u2_baris, color=SOROT), run_time=1.4)
            b.tunggu_kata("kurang")
            b.main(Transform(kurang, kurang4), run_time=1.2)
            b.tunggu_kata("melainkan")
            b.main(Indicate(kurang, color=AKSEN, scale_factor=1.06), run_time=2.6)
        qc.periksa_adegan(self, {"soal keempat": soal3, "yang kurang": kurang},
                          [("soal keempat", "yang kurang")],
                          hud={"identitas": ident3, "papan": panel.semua()})

        # Kalimat utuh lewat gl.teks, bukan \text{...} di dalam rumus: MiKTeX
        # gagal membangunnya, dan cek_kode menolaknya sebelum render.
        boleh = VGroup(teks("kurang sebuah angka", 34, SOROT),
                       rumus(r"\longrightarrow", 34, REDUP),
                       teks("boleh diperbaiki", 34, SOROT))
        boleh.arrange(RIGHT, buff=0.25).move_to(PANGGUNG)
        tidak = VGroup(teks("kurang bentuk ber-x", 34, AKSEN),
                       rumus(r"\longrightarrow", 34, REDUP),
                       teks("tidak boleh", 34, AKSEN))
        tidak.arrange(RIGHT, buff=0.25).next_to(boleh, DOWN, buff=0.40)

        with sinema.babak(self, "batas", DURASI, kata=KATA) as b:
            b.tunggu_kata("batas")
            b.main(FadeOut(soal3), FadeOut(kurang), FadeOut(u2_baris),
                   FadeOut(du2_baris), run_time=1.4)
            b.tunggu_kata("Kekurangan")
            b.main(FadeIn(boleh), run_time=0.6)
            b.tunggu_kata("boleh")
            b.main(Indicate(boleh, color=AKSEN), run_time=1.2)
            b.tunggu_kata("memuat")
            b.main(FadeIn(tidak), run_time=1.8)
            b.tunggu_kata("situlah")
            bersihkan_panel(self, panel, [b_sesuai, b_angka], b=b)
            b_batas = panel.baris(r"\text{angka boleh, } x \text{ tidak}",
                                  warna=SOROT, b=b)
            b.main(Indicate(b_batas, color=AKSEN), run_time=1.6)
        qc.periksa_adegan(self, {"boleh": boleh, "tidak": tidak},
                          [("boleh", "tidak")],
                          hud={"identitas": ident3, "papan": panel.semua()})

        # =============================================================
        # PENUTUP: ringkas, lalu tunjuk Materi 04.
        # =============================================================
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ringkasnya")
            b.main(FadeOut(boleh), FadeOut(tidak), run_time=1.0)
            b.tunggu_kata("dipangkatkan")
            b.main(FadeIn(langkah), run_time=1.6)
            b.tunggu_kata("beri")
            b.main(Indicate(langkah[0], color=AKSEN2), run_time=1.4)
            b.tunggu_kata("cocokkan")
            b.main(Indicate(langkah[2], color=SOROT), run_time=1.0)
            b.tunggu_kata("kerjakan")
            b.main(Indicate(langkah[3], color=AKSEN), run_time=1.0)
            b.tunggu_kata("kembalikan")
            b.main(Indicate(langkah, color=SOROT, scale_factor=1.04), run_time=1.6)
            b.tunggu_kata("berikutnya")
            b_next = panel.baris(r"\text{berikutnya: Materi 04}", warna=AKSEN, b=b)
            b.tunggu_kata("memakai")
            b.main(Indicate(b_next, color=SOROT), run_time=2.2)
            b.tunggu_kata("tertangani")
            b.main(Indicate(langkah, color=AKSEN, scale_factor=1.04), run_time=2.4)
        qc.periksa_adegan(self, {"empat langkah": langkah},
                          hud={"identitas": ident3, "papan": panel.semua()})

        sinema.laporkan_pemicu(self)
