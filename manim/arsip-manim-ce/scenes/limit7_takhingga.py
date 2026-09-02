"""Limit Materi 07, Ketika x membesar tanpa batas.

STORYBOARD (ditulis lebih dulu, kode menyusul):

  1. Judul pembuka, berupa pertanyaan.
  2. Cerita pabrik: biaya tetap ditambah biaya per barang.
  3. Tiga angka nyata dihitung: 100, seribu, sepuluh ribu barang.
  4. Angkanya merapat ke 20.000, tapi tidak pernah sampai.
  5. Pagar: tak hingga BUKAN bilangan.
  6. Tak hingga adalah keterangan arah.
  7. Alat utamanya: satu per x menuju nol.
  8. Soal ditulis, pangkat tertingginya ditandai.
  9. Semuanya dibagi x kuadrat, dua pecahan kecil menuju nol.
 10. Sisanya tiga per satu, jadi tiga.
 11. Grafiknya mendatar merapat ke garis y = 3, namanya asimtot datar.
 12. Diperbesar: selisihnya mengecil terus, tapi tidak pernah nol.

INTI YANG HARUS TERTANAM: tak hingga adalah keterangan arah, bukan angka yang
bisa dimasukkan. Babak 5 dan 6 memasang pagar itu SEBELUM alat hitungnya
diberikan, sebab kalau dibalik siswa telanjur menulis "x = tak hingga".

Babak 12 memakai panel yang DIPERBESAR dan mengatakannya terus terang di
layar. Pada skala penuh selisih kurva dengan garisnya cuma 0,07 satuan, dan
kalau digambar apa adanya ia lenyap, sehingga penonton justru menyimpulkan
kurvanya menyentuh garis. Itu kebalikan dari yang mau diajarkan.

WARNA: aksen = yang sedang dikerjakan, sorot = jawaban dan garis asimtot,
bata = pagar peringatan, redup = keterangan.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import lingkungan  # noqa: E402,F401  -- menambal PATH MiKTeX, WAJIB sebelum manim

import numpy as np  # noqa: E402
from manim import *  # noqa: E402
from matra_theme import Tema  # noqa: E402
import qc  # noqa: E402
import sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "limit7-takhingga"
DURASI: dict[str, float] = json.loads(
    (AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8")
)["segmen"]

# --- ZONA TETAP (bingkai 14,22 x 8; batas aman x +-6,91  y +-3,80) ---
PUSAT_GRAFIK = np.array([-2.40, -0.45, 0.0])
X_KANAN = 3.75
LEBAR_KANAN = 5.60

BATA = "#A6503F"


def biaya_rata(n):
    """Biaya rata-rata per barang: biaya tetap dibagi banyaknya, tambah ongkos satuan."""
    return 5_000_000.0 / n + 20_000.0


def f(x):
    return (3.0 * x * x + 2.0 * x) / (x * x - 5.0)


class TakHingga(Scene):
    tema = "terang"

    # ==================================================================
    def construct(self):
        self.t = Tema(self.tema)
        self.t.pasang(self)

        self.b01_sapa()
        self.b02_pabrik()
        self.b03_angka()
        self.b04_merapat()
        self.b05_bukanbilangan()
        self.b06_arah()
        self.b07_alat()
        self.b08_soal()
        self.b09_bagi()
        self.b10_hasil()
        self.b11_asimtot()
        self.b12_tutup()

    # ==================================================================
    def b01_sapa(self):
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(
                self, "Mendatar, tapi tidak pernah menyentuh", self.t,
                lama=DURASI["sapa"] * 0.80)
            b.catat(DURASI["sapa"] * 0.80)

    def b02_pabrik(self):
        t = self.t
        soal = Text("sebuah pabrik: biaya tetap Rp 5.000.000 sehari,\n"
                    "ditambah Rp 20.000 untuk tiap barang",
                    font_size=30, color=t.tinta, line_spacing=0.95)
        sinema.batasi_lebar(soal, 11.0)
        soal.move_to([0, 1.70, 0])
        rumus = MathTex(r"\text{rata-rata per barang} \;=\; "
                        r"\frac{5{.}000{.}000 + 20{.}000\,n}{n}",
                        color=t.tinta, font_size=42)
        sinema.batasi_lebar(rumus, 11.5)
        rumus.move_to([0, -0.35, 0])
        self.soal_pabrik, self.rumus = soal, rumus
        with sinema.babak(self, "pabrik", DURASI) as b:
            b.main(FadeIn(soal, shift=UP * 0.14), run_time=2.0)
            b.jeda(1.4)
            b.main(FadeIn(rumus), run_time=1.8)
            b.jeda(2.0)
        qc.periksa_adegan({"soal": soal, "rumus": rumus}, [("soal", "rumus")])

    def b03_angka(self):
        t = self.t
        kiri = VGroup(*[Text(s, font_size=30, color=t.tinta)
                        for s in ("100 barang", "1.000 barang", "10.000 barang")]
                      ).arrange(DOWN, buff=0.46, aligned_edge=RIGHT)
        kanan = VGroup(*[Text(s, font_size=30, color=t.sorot)
                         for s in ("Rp 70.000", "Rp 25.000", "Rp 20.500")]
                       ).arrange(DOWN, buff=0.46, aligned_edge=LEFT)
        kanan.next_to(kiri, RIGHT, buff=1.40)
        tabel = VGroup(kiri, kanan).move_to([0, 0.05, 0])
        self.tabel = tabel
        baris = [VGroup(kiri[i], kanan[i]) for i in range(3)]
        with sinema.babak(self, "angka", DURASI) as b:
            b.main(FadeOut(self.soal_pabrik),
                   self.rumus.animate.scale(0.80).move_to([0, 2.45, 0]),
                   run_time=1.0)
            for r in baris[:-1]:
                b.main(FadeIn(r, shift=UP * 0.10), run_time=1.2)
                b.jeda(0.8)
            b.main(FadeIn(baris[-1], shift=UP * 0.10), run_time=1.2)
            b.jeda(1.6)
        qc.periksa_adegan({"rumus": self.rumus, "tabel": tabel},
                          [("rumus", "tabel")])

    def b04_merapat(self):
        t = self.t
        merapat = Text("merapat ke 20.000, tapi tidak pernah sampai",
                       font_size=29, color=t.aksen)
        sinema.batasi_lebar(merapat, 11.0)
        merapat.move_to([0, -1.95, 0])
        sebab = Text("biaya tetapnya selalu menyisakan sedikit,\n"
                     "berapa pun banyaknya barang",
                     font_size=27, color=t.redup, line_spacing=0.9)
        sinema.batasi_lebar(sebab, 11.0)
        sebab.move_to([0, -3.00, 0])
        self.kel_pabrik = VGroup(self.rumus, self.tabel, merapat, sebab)
        with sinema.babak(self, "merapat", DURASI) as b:
            b.main(FadeIn(merapat, shift=UP * 0.12), run_time=1.8)
            b.jeda(1.6)
            b.main(FadeIn(sebab, shift=UP * 0.10), run_time=1.8)
            b.jeda(2.4)
        qc.periksa_adegan({"tabel": self.tabel, "merapat": merapat,
                           "sebab": sebab},
                          [("tabel", "merapat"), ("merapat", "sebab")])

    def b05_bukanbilangan(self):
        t = self.t
        lambang = MathTex(r"\infty", color=t.aksen, font_size=150)
        lambang.move_to([0, 1.60, 0])
        pagar = Text("bukan bilangan", font_size=34, color=BATA)
        sinema.batasi_lebar(pagar, 11.0)
        pagar.move_to([0, -0.35, 0])
        jelas = Text("tidak ada angka yang bernama tak hingga,\n"
                     "jadi ia tidak bisa dimasukkan ke rumus",
                     font_size=29, color=t.tinta, line_spacing=0.95)
        sinema.batasi_lebar(jelas, 11.0)
        jelas.move_to([0, -2.10, 0])
        self.lambang, self.pagar, self.jelas = lambang, pagar, jelas
        with sinema.babak(self, "bukanbilangan", DURASI) as b:
            b.main(FadeOut(self.kel_pabrik), run_time=0.8)
            b.main(FadeIn(lambang, scale=0.85), run_time=1.4)
            b.main(FadeIn(pagar, shift=UP * 0.12), run_time=1.6)
            b.jeda(1.4)
            b.main(FadeIn(jelas, shift=UP * 0.12), run_time=1.8)
            b.jeda(2.2)
        qc.periksa_adegan({"lambang": lambang, "pagar": pagar, "jelas": jelas},
                          [("lambang", "pagar"), ("pagar", "jelas")])

    def b06_arah(self):
        t = self.t
        arah = Text("tak hingga adalah keterangan ARAH:\n"
                    "x dibuat membesar terus menerus, tanpa pernah berhenti",
                    font_size=29, color=t.sorot, line_spacing=0.95)
        sinema.batasi_lebar(arah, 11.5)
        arah.move_to([0, -1.35, 0])
        self.arah = arah
        with sinema.babak(self, "arah", DURASI) as b:
            b.main(FadeOut(self.jelas), FadeOut(self.pagar), run_time=0.7)
            b.main(FadeIn(arah, shift=UP * 0.12), run_time=1.8)
            b.jeda(2.6)
        qc.periksa_adegan({"lambang": self.lambang, "arah": arah},
                          [("lambang", "arah")])

    def b07_alat(self):
        t = self.t
        alat = MathTex(r"x \text{ membesar}", r"\;\Longrightarrow\;",
                       r"\frac{1}{x} \to 0", color=t.tinta, font_size=48)
        alat[2].set_color(t.aksen)
        alat.move_to([0, 1.10, 0])
        # Tiga contoh dibuat sebagai tiga objek terpisah, BUKAN satu MathTex
        # panjang berisi \tfrac dan \qquad. Cara yang kedua menghasilkan satu
        # objek kelewat lebar, lalu dikecilkan seluruhnya oleh batasi_lebar,
        # dan pecahannya menyusut sampai tak terbaca. Cacat render uji pertama.
        contoh = VGroup(
            MathTex(r"\frac{1}{10}=0{,}1", color=t.redup, font_size=38),
            MathTex(r"\frac{1}{1{.}000}=0{,}001", color=t.redup, font_size=38),
            MathTex(r"\frac{1}{1{.}000{.}000}=0{,}000001",
                    color=t.redup, font_size=38),
        ).arrange(RIGHT, buff=0.95)
        sinema.batasi_lebar(contoh, 12.0)
        contoh.move_to([0, -1.20, 0])
        self.alat, self.contoh = alat, contoh
        with sinema.babak(self, "alat", DURASI) as b:
            b.main(FadeOut(self.lambang), FadeOut(self.arah), run_time=0.8)
            b.main(FadeIn(alat), run_time=1.8)
            b.jeda(1.4)
            b.main(FadeIn(contoh, shift=UP * 0.10), run_time=1.6)
            b.jeda(2.0)
        qc.periksa_adegan({"alat": alat, "contoh": contoh},
                          [("alat", "contoh")])

    def b08_soal(self):
        t = self.t
        soal = MathTex(r"\lim_{x \to \infty}", r"\frac{3x^{2}+2x}{x^{2}-5}",
                       color=t.tinta, font_size=54)
        soal.move_to([0, 1.10, 0])
        catat = Text("pangkat tertingginya x kuadrat,\n"
                     "jadi atas dan bawah sama-sama dibagi x kuadrat",
                     font_size=28, color=t.redup, line_spacing=0.95)
        sinema.batasi_lebar(catat, 11.0)
        catat.move_to([0, -1.35, 0])
        self.soal, self.catat_soal = soal, catat
        with sinema.babak(self, "soal", DURASI) as b:
            b.main(FadeOut(self.alat), FadeOut(self.contoh), run_time=0.8)
            b.main(FadeIn(soal), run_time=1.8)
            b.jeda(1.4)
            b.main(FadeIn(catat, shift=UP * 0.10), run_time=1.6)
            b.jeda(2.2)
        qc.periksa_adegan({"soal": soal, "catat": catat}, [("soal", "catat")])

    def b09_bagi(self):
        t = self.t
        bagi = MathTex(r"\lim_{x \to \infty}",
                       r"\frac{3+\dfrac{2}{x}}{1-\dfrac{5}{x^{2}}}",
                       color=t.tinta, font_size=52)
        bagi.move_to([0, 0.90, 0])
        menuju = VGroup(
            MathTex(r"\frac{2}{x} \to 0", color=t.aksen, font_size=46),
            MathTex(r"\frac{5}{x^{2}} \to 0", color=t.aksen, font_size=46),
        ).arrange(RIGHT, buff=1.40)
        menuju.move_to([0, -1.90, 0])
        self.bagi, self.menuju = bagi, menuju
        with sinema.babak(self, "bagi", DURASI) as b:
            b.main(FadeOut(self.soal), FadeOut(self.catat_soal), run_time=0.6)
            b.main(FadeIn(bagi), run_time=1.4)
            b.jeda(1.4)
            b.main(FadeIn(menuju, shift=UP * 0.10), run_time=1.6)
            b.jeda(2.4)
        qc.periksa_adegan({"bagi": bagi, "menuju": menuju},
                          [("bagi", "menuju")])

    def b10_hasil(self):
        t = self.t
        hasil = MathTex(r"\frac{3+0}{1-0}", r"\;=\;", r"\frac{3}{1}",
                        r"\;=\;", "3", color=t.tinta, font_size=54)
        hasil[4].set_color(t.sorot)
        hasil.move_to([0, 0.90, 0])
        self.hasil = hasil
        with sinema.babak(self, "hasil", DURASI) as b:
            b.main(FadeOut(self.bagi), FadeOut(self.menuju), run_time=0.5)
            b.main(FadeIn(hasil), run_time=1.2)
            b.jeda(2.0)
        qc.periksa_adegan({"hasil": hasil})

    def b11_asimtot(self):
        t = self.t
        sumbu = Axes(
            x_range=[0, 44, 10], y_range=[0, 9, 3],
            x_length=6.4, y_length=4.2,
            axis_config={"color": t.redup, "stroke_width": 3,
                         "include_ticks": True, "tip_length": 0.18},
            tips=True,
        ).move_to(PUSAT_GRAFIK)
        # dimulai dari 3,4 sebab di x = akar 5 penyebutnya nol dan kurvanya
        # meledak. Bagian itu bukan urusan babak ini.
        kurva = sumbu.plot(f, x_range=[3.4, 43.5], color=t.tinta, stroke_width=5)
        garis = DashedLine(sumbu.c2p(0, 3), sumbu.c2p(43.5, 3),
                           color=t.sorot, stroke_width=3, dash_length=0.14)
        label = MathTex("y = 3", color=t.sorot, font_size=32)
        label.next_to(sumbu.c2p(43.5, 3), UP, buff=0.14).shift(LEFT * 0.30)
        self.papan = VGroup(sumbu, kurva, garis, label)
        cerita = Text("limitnya sebuah angka,\n"
                      "jadi grafiknya mendatar\n"
                      "merapat ke garis itu.\n\n"
                      "Garis itu disebut\n"
                      "asimtot datar",
                      font_size=27, color=t.tinta, line_spacing=0.95)
        sinema.batasi_lebar(cerita, LEBAR_KANAN)
        cerita.move_to([X_KANAN, 0.30, 0])
        self.cerita = cerita
        with sinema.babak(self, "asimtot", DURASI) as b:
            # Langkah menggambar sengaja dipercepat. Pada takaran pertama
            # keterangan di kanan baru selesai muncul 1,5 detik sebelum babak
            # berikutnya menghapusnya, jadi praktis tidak sempat dibaca.
            b.main(FadeOut(self.hasil), run_time=0.8)
            b.main(Create(sumbu), run_time=1.2)
            b.main(Create(kurva), run_time=1.4)
            b.main(Create(garis), FadeIn(label), run_time=1.0)
            b.jeda(0.6)
            b.main(FadeIn(cerita, shift=UP * 0.10), run_time=1.2)
        qc.periksa_adegan({"papan": self.papan, "cerita": cerita},
                          [("papan", "cerita")])

    def b12_tutup(self):
        t = self.t
        # Panel DIPERBESAR. Pada skala penuh selisih kurva dengan garis y = 3
        # di x = 35 cuma 0,07 satuan, yaitu kurang dari sepertiga milimeter di
        # layar. Kalau digambar apa adanya, penonton menyimpulkan kurvanya
        # menyentuh garis, persis kebalikan dari yang mau diajarkan. Karena itu
        # skalanya diubah, dan perubahannya DISEBUTKAN di layar.
        zoom = Axes(
            x_range=[20, 60, 10], y_range=[2.9, 3.3, 0.1],
            x_length=6.4, y_length=4.2,
            axis_config={"color": t.redup, "stroke_width": 3,
                         "include_ticks": True, "tip_length": 0.18},
            tips=True,
        ).move_to(PUSAT_GRAFIK)
        kurva = zoom.plot(f, x_range=[20, 59.5], color=t.tinta, stroke_width=5)
        garis = DashedLine(zoom.c2p(20, 3), zoom.c2p(59.5, 3),
                           color=t.sorot, stroke_width=3, dash_length=0.14)
        label = MathTex("y = 3", color=t.sorot, font_size=32)
        label.next_to(zoom.c2p(59.5, 3), DOWN, buff=0.16).shift(LEFT * 0.34)
        cap_zoom = Text("panel ini diperbesar", font_size=24, color=t.redup)
        cap_zoom.next_to(zoom, DOWN, buff=0.30)
        papan2 = VGroup(zoom, kurva, garis, label, cap_zoom)

        selisih = Line(zoom.c2p(35, f(35)), zoom.c2p(35, 3),
                       color=t.aksen, stroke_width=4)
        tanda = MathTex("0{,}07", color=t.aksen, font_size=30)
        tanda.next_to(selisih, RIGHT, buff=0.16)

        tutup = Text("kurvanya boleh sedekat apa pun,\n"
                     "tapi selisihnya tidak pernah nol.\n\n"
                     "Itulah beda mendekati\n"
                     "dengan menyentuh",
                     font_size=27, color=t.sorot, line_spacing=0.95)
        sinema.batasi_lebar(tutup, LEBAR_KANAN)
        tutup.move_to([X_KANAN, 0.30, 0])
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(self.papan), FadeOut(self.cerita), run_time=0.8)
            b.main(FadeIn(papan2), run_time=1.8)
            b.jeda(1.2)
            b.main(Create(selisih), FadeIn(tanda), run_time=1.4)
            b.jeda(1.0)
            b.main(FadeIn(tutup, shift=UP * 0.10), run_time=1.6)
            b.jeda(1.8)
        qc.periksa_adegan({"papan": papan2, "tutup": tutup, "selisih": selisih},
                          [("papan", "tutup")])
