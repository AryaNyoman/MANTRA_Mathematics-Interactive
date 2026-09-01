"""Limit Materi 06, Ketika hasilnya nol per nol.

STORYBOARD (ditulis lebih dulu, kode menyusul):

  1. Judul pembuka.
  2. Luruskan: nol per nol BUKAN berarti limitnya tidak ada.
  3. Bukti: dua soal, sama-sama nol per nol, jawabannya 2 dan 4.
  4. Cara 1 diperkenalkan: memfaktorkan, beserta alasannya.
  5. (x^2-4)/(x-2) difaktorkan.
  6. Faktor kembar dicoret, disertai syarat x bukan 2.
  7. Sisanya x+2, dimasukkan, hasilnya 4.
  8. Cara 2 diperkenalkan: kali sekawan, dipakai kalau ada akar.
  9. Soal akar ditulis, sekawannya disebut.
 10. Dikalikan sekawan, akarnya hilang.
 11. x dicoret, dimasukkan nol, hasilnya seperempat.
 12. Penutup: urutan tiga langkah yang tidak pernah berubah.

INTI YANG HARUS TERTANAM: nol per nol adalah tanda "bentuk ini belum
bercerita", bukan tanda "limitnya tidak ada". Babak 3 yang membuktikannya,
dan tanpa babak itu dua cara di belakangnya cuma resep hafalan.

Kedua soal pada babak 3 sengaja dipilih di titik yang SAMA (x menuju 2) dan
sama-sama nol per nol, supaya satu-satunya yang berbeda adalah jawabannya.
Kalau titiknya dibedakan, siswa bisa berkilah "ya jelas beda, titiknya beda".

WARNA: aksen = bagian yang sedang dikerjakan, sorot = jawaban, bata = pagar
peringatan, redup = keterangan.
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
TOPIK = "limit6-nolpernol"
DURASI: dict[str, float] = json.loads(
    (AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8")
)["segmen"]

# --- ZONA TETAP (bingkai 14,22 x 8; batas aman x +-6,91  y +-3,80) ---
Y_TAJUK = 3.15
Y_RUMUS = 0.85
Y_CATATAN = -1.95
FS = 46

BATA = "#A6503F"
HIJAU = "#2F5D50"


class NolPerNol(Scene):
    tema = "terang"

    # ==================================================================
    def construct(self):
        self.t = Tema(self.tema)
        self.t.pasang(self)
        self.tajuk = None

        self.b01_sapa()
        self.b02_bukan()
        self.b03_bukti()
        self.b04_cara1()
        self.b05_faktor()
        self.b06_coret1()
        self.b07_hasil1()
        self.b08_cara2()
        self.b09_sekawan()
        self.b10_kali()
        self.b11_hasil2()
        self.b12_tutup()

    # ---------------- alat bantu ----------------
    def pecahan(self, atas, bawah):
        """Pecahan dirakit sendiri dari tiga bagian.

        Sengaja TIDAK memakai \\frac: coretan nanti perlu menunjuk faktor
        tertentu, dan pada \\frac utuh coretannya gampang mendarat di garis
        pecahan, bukan di faktornya. Cacat itu sudah terjadi di Materi 04.
        """
        VGroup(atas, bawah).arrange(DOWN, buff=0.38)
        lebar = max(atas.width, bawah.width) + 0.26
        garis = Line(LEFT * lebar / 2, RIGHT * lebar / 2,
                     color=self.t.tinta, stroke_width=3.4)
        garis.move_to((atas.get_bottom() + bawah.get_top()) / 2)
        return VGroup(atas, garis, bawah)

    def coret(self, mob):
        """Garis miring dari kiri bawah ke kanan atas, jelas bukan garis pecahan.

        Ketebalannya menyesuaikan lebar sasaran. Pada lambang sempit seperti
        satu huruf x, garis setebal faktor (x-2) menutup hurufnya habis
        sehingga terlihat DIHAPUS, bukan dicoret, dan pembaca kehilangan tahu
        apa yang barusan dicoret. Cacat itu terlihat di render uji pertama.
        """
        sempit = mob.width < 0.50
        pad_x = 0.13 if sempit else 0.08
        pad_y = 0.05 if sempit else 0.06
        tebal = 2.6 if sempit else 4.2
        a = mob.get_corner(DL) + np.array([-pad_x, -pad_y, 0])
        c = mob.get_corner(UR) + np.array([pad_x, pad_y, 0])
        return Line(a, c, color=BATA, stroke_width=tebal).set_z_index(6)

    def ganti_tajuk(self, b, teks):
        t = self.t
        baru = Text(teks, font_size=30, color=t.sorot)
        sinema.batasi_lebar(baru, 11.0)
        baru.move_to([0, Y_TAJUK, 0])
        if self.tajuk is not None:
            b.main(FadeOut(self.tajuk), run_time=0.6)
        b.main(FadeIn(baru, shift=DOWN * 0.10), run_time=1.0)
        self.tajuk = baru
        return baru

    # ==================================================================
    def b01_sapa(self):
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Ketika hasilnya nol per nol", self.t,
                                 lama=DURASI["sapa"] * 0.80)
            b.catat(DURASI["sapa"] * 0.80)

    def b02_bukan(self):
        t = self.t
        bentuk = MathTex(r"\frac{0}{0}", color=t.aksen, font_size=110)
        bentuk.move_to([0, 1.55, 0])
        salah = Text("bukan berarti limitnya tidak ada",
                     font_size=30, color=BATA)
        sinema.batasi_lebar(salah, 11.0)
        salah.move_to([0, -0.45, 0])
        benar = Text("artinya: bentuk yang ditulis\nbelum bercerita apa-apa",
                     font_size=30, color=HIJAU, line_spacing=0.9)
        sinema.batasi_lebar(benar, 11.0)
        benar.move_to([0, -2.20, 0])
        self.kel_bukan = VGroup(bentuk, salah, benar)
        with sinema.babak(self, "bukan", DURASI) as b:
            b.main(FadeIn(bentuk, scale=0.85), run_time=1.4)
            b.main(FadeIn(salah, shift=UP * 0.12), run_time=1.6)
            b.jeda(1.4)
            b.main(FadeIn(benar, shift=UP * 0.12), run_time=1.8)
            b.jeda(2.2)
        qc.periksa_adegan({"bentuk": bentuk, "salah": salah, "benar": benar},
                          [("bentuk", "salah"), ("salah", "benar")])

    def b03_bukti(self):
        t = self.t
        soal_a = MathTex(r"\lim_{x \to 2} \frac{2x-4}{x-2}",
                         color=t.tinta, font_size=44).move_to([-3.40, 1.35, 0])
        soal_b = MathTex(r"\lim_{x \to 2} \frac{x^{2}-4}{x-2}",
                         color=t.tinta, font_size=44).move_to([3.40, 1.35, 0])
        bentuk_a = MathTex(r"\to \tfrac{0}{0}", color=t.aksen,
                           font_size=40).move_to([-3.40, -0.35, 0])
        bentuk_b = MathTex(r"\to \tfrac{0}{0}", color=t.aksen,
                           font_size=40).move_to([3.40, -0.35, 0])
        jawab_a = MathTex("= 2", color=t.sorot, font_size=52
                          ).move_to([-3.40, -1.75, 0])
        jawab_b = MathTex("= 4", color=t.sorot, font_size=52
                          ).move_to([3.40, -1.75, 0])
        catat = Text("bentuk awalnya sama persis, jawabannya berbeda",
                     font_size=27, color=t.redup)
        sinema.batasi_lebar(catat, 11.0)
        catat.move_to([0, -3.15, 0])
        self.kel_bukti = VGroup(soal_a, soal_b, bentuk_a, bentuk_b,
                                jawab_a, jawab_b, catat)
        with sinema.babak(self, "bukti", DURASI) as b:
            b.main(FadeOut(self.kel_bukan), run_time=0.8)
            b.main(FadeIn(soal_a), FadeIn(soal_b), run_time=2.0)
            b.main(FadeIn(bentuk_a), FadeIn(bentuk_b), run_time=1.6)
            b.jeda(1.0)
            b.main(FadeIn(jawab_a, scale=0.9), FadeIn(jawab_b, scale=0.9),
                   run_time=1.8)
            b.jeda(1.2)
            b.main(FadeIn(catat, shift=UP * 0.10), run_time=1.6)
            b.jeda(1.6)
        qc.periksa_adegan({"soalA": soal_a, "soalB": soal_b, "bentukA": bentuk_a,
                           "jawabA": jawab_a, "catat": catat},
                          [("soalA", "soalB"), ("soalA", "bentukA"),
                           ("bentukA", "jawabA"), ("jawabA", "catat")])

    def b04_cara1(self):
        t = self.t
        alasan = Text("kalau atas dan bawah sama-sama nol di titik yang sama,\n"
                      "keduanya pasti punya faktor yang sama",
                      font_size=28, color=t.tinta, line_spacing=0.95)
        sinema.batasi_lebar(alasan, 11.0)
        alasan.move_to([0, 0.55, 0])
        self.alasan = alasan
        with sinema.babak(self, "cara1", DURASI) as b:
            b.main(FadeOut(self.kel_bukti), run_time=0.8)
            self.ganti_tajuk(b, "Cara 1: memfaktorkan")
            b.main(FadeIn(alasan, shift=UP * 0.12), run_time=2.2)
            b.jeda(2.4)
        qc.periksa_adegan({"tajuk": self.tajuk, "alasan": alasan},
                          [("tajuk", "alasan")])

    def b05_faktor(self):
        t = self.t
        lim = MathTex(r"\lim_{x \to 2}", color=t.tinta, font_size=FS)
        atas1 = MathTex("x^{2}-4", color=t.tinta, font_size=FS)
        bawah1 = MathTex("x-2", color=t.tinta, font_size=FS)
        rumus1 = VGroup(lim, self.pecahan(atas1, bawah1)
                        ).arrange(RIGHT, buff=0.32).move_to([0, Y_RUMUS, 0])

        lim2 = MathTex(r"\lim_{x \to 2}", color=t.tinta, font_size=FS)
        self.atas2 = MathTex("(x-2)", "(x+2)", color=t.tinta, font_size=FS)
        self.atas2[0].set_color(t.aksen)
        self.bawah2 = MathTex("(x-2)", color=t.aksen, font_size=FS)
        rumus2 = VGroup(lim2, self.pecahan(self.atas2, self.bawah2)
                        ).arrange(RIGHT, buff=0.32).move_to([0, Y_RUMUS, 0])
        self.rumus = rumus2

        with sinema.babak(self, "faktor", DURASI) as b:
            b.main(FadeOut(self.alasan), run_time=0.8)
            b.main(FadeIn(rumus1), run_time=1.8)
            b.jeda(1.6)
            # Ditukar BERURUTAN, bukan ReplacementTransform. Morph huruf demi
            # huruf antara dua bentuk yang jumlah lambangnya jauh berbeda
            # menghasilkan dua detik coretan tak terbaca. Cacat itu terlihat
            # di lembar kontak render uji pertama.
            b.main(FadeOut(rumus1), run_time=0.7)
            b.main(FadeIn(rumus2), run_time=1.2)
            b.jeda(2.0)
        qc.periksa_adegan({"tajuk": self.tajuk, "rumus": rumus2},
                          [("tajuk", "rumus")])

    def b06_coret1(self):
        t = self.t
        c1 = self.coret(self.atas2[0])
        c2 = self.coret(self.bawah2)
        syarat = Text("boleh, sebab x bukan 2.\n"
                      "Limit memang tidak pernah menyentuh x = 2",
                      font_size=27, color=t.redup, line_spacing=0.9)
        sinema.batasi_lebar(syarat, 11.0)
        syarat.move_to([0, Y_CATATAN, 0])
        self.syarat1 = syarat
        self.coretan1 = VGroup(c1, c2)
        with sinema.babak(self, "coret1", DURASI) as b:
            b.main(Create(c1), Create(c2), run_time=1.4)
            b.jeda(1.2)
            b.main(FadeIn(syarat, shift=UP * 0.10), run_time=1.8)
            b.jeda(2.0)
        qc.periksa_adegan({"rumus": self.rumus, "syarat": syarat},
                          [("rumus", "syarat")])

    def b07_hasil1(self):
        t = self.t
        sisa = MathTex(r"\lim_{x \to 2}", "(x+2)", "= 4",
                       color=t.tinta, font_size=FS)
        sisa[2].set_color(t.sorot)
        sisa.move_to([0, Y_RUMUS, 0])
        self.hasil1 = sisa
        with sinema.babak(self, "hasil1", DURASI) as b:
            b.main(FadeOut(self.coretan1), FadeOut(self.rumus),
                   FadeIn(sisa), run_time=1.8)
            b.jeda(2.0)
        qc.periksa_adegan({"tajuk": self.tajuk, "sisa": sisa,
                           "syarat": self.syarat1},
                          [("tajuk", "sisa"), ("sisa", "syarat")])

    def b08_cara2(self):
        t = self.t
        alasan = Text("kalau ada tanda akar, memfaktorkan biasanya buntu.\n"
                      "Sekawan: bentuk yang sama persis, tanda tengahnya dibalik",
                      font_size=27, color=t.tinta, line_spacing=0.95)
        sinema.batasi_lebar(alasan, 11.5)
        alasan.move_to([0, 0.55, 0])
        self.alasan2 = alasan
        with sinema.babak(self, "cara2", DURASI) as b:
            b.main(FadeOut(self.hasil1), FadeOut(self.syarat1), run_time=0.8)
            self.ganti_tajuk(b, "Cara 2: kali sekawan")
            b.main(FadeIn(alasan, shift=UP * 0.12), run_time=2.2)
            b.jeda(2.6)
        qc.periksa_adegan({"tajuk": self.tajuk, "alasan": alasan},
                          [("tajuk", "alasan")])

    def b09_sekawan(self):
        t = self.t
        lim = MathTex(r"\lim_{x \to 0}", color=t.tinta, font_size=FS)
        atas = MathTex(r"\sqrt{x+4}-2", color=t.tinta, font_size=FS)
        bawah = MathTex("x", color=t.tinta, font_size=FS)
        rumus = VGroup(lim, self.pecahan(atas, bawah)
                       ).arrange(RIGHT, buff=0.32).move_to([0, Y_RUMUS, 0])
        self.rumusA = rumus
        label = MathTex(r"\text{sekawannya: }", r"\sqrt{x+4}+2",
                        color=t.redup, font_size=38)
        label[1].set_color(t.aksen)
        label.move_to([0, Y_CATATAN, 0])
        self.label_sekawan = label
        with sinema.babak(self, "sekawan", DURASI) as b:
            b.main(FadeOut(self.alasan2), run_time=0.8)
            b.main(FadeIn(rumus), run_time=2.0)
            b.jeda(1.8)
            b.main(FadeIn(label, shift=UP * 0.10), run_time=1.8)
            b.jeda(2.2)
        qc.periksa_adegan({"tajuk": self.tajuk, "rumus": rumus, "label": label},
                          [("tajuk", "rumus"), ("rumus", "label")])

    def b10_kali(self):
        t = self.t
        # Pengalinya ditulis utuh dulu di sebelah soal, supaya "kalikan atas dan
        # bawah dengan sekawan" benar-benar terlihat dikerjakan, bukan cuma
        # disebut lalu hasilnya muncul begitu saja.
        atas_p = MathTex(r"\sqrt{x+4}+2", color=t.aksen, font_size=FS)
        bawah_p = MathTex(r"\sqrt{x+4}+2", color=t.aksen, font_size=FS)
        tanda = MathTex(r"\times", color=t.tinta, font_size=FS)
        pengali = VGroup(tanda, self.pecahan(atas_p, bawah_p)
                         ).arrange(RIGHT, buff=0.26)

        lim = MathTex(r"\lim_{x \to 0}", color=t.tinta, font_size=40)
        atas = MathTex("(x+4)-4", color=t.aksen, font_size=40)
        bawah = MathTex("x", r"\left(\sqrt{x+4}+2\right)",
                        color=t.tinta, font_size=40)
        gabung = VGroup(lim, self.pecahan(atas, bawah)
                        ).arrange(RIGHT, buff=0.32).move_to([0, Y_RUMUS, 0])
        self.rumusB = gabung
        catat = Text("akarnya hilang karena dikuadratkan",
                     font_size=27, color=t.redup)
        sinema.batasi_lebar(catat, 11.0)
        catat.move_to([0, Y_CATATAN, 0])
        self.catat_kali = catat
        with sinema.babak(self, "kali", DURASI) as b:
            b.main(self.rumusA.animate.move_to([-2.35, Y_RUMUS, 0]),
                   FadeOut(self.label_sekawan), run_time=1.0)
            pengali.next_to(self.rumusA, RIGHT, buff=0.30)
            b.main(FadeIn(pengali), run_time=1.4)
            qc.periksa_adegan({"soal": self.rumusA, "pengali": pengali},
                              [("soal", "pengali")])
            b.jeda(2.0)
            b.main(FadeOut(self.rumusA), FadeOut(pengali), run_time=0.8)
            b.main(FadeIn(gabung), run_time=1.2)
            b.jeda(1.2)
            b.main(FadeIn(catat, shift=UP * 0.10), run_time=1.6)
            b.jeda(1.8)
        qc.periksa_adegan({"tajuk": self.tajuk, "rumus": gabung, "catat": catat},
                          [("tajuk", "rumus"), ("rumus", "catat")])

    def b11_hasil2(self):
        t = self.t
        # Pembilangnya disederhanakan dulu jadi x, baru dicoret. Coretan di sini
        # sengaja dibuat serupa dengan Cara 1, supaya siswa mengenali bahwa
        # kedua cara berakhir pada gerakan yang sama.
        lim = MathTex(r"\lim_{x \to 0}", color=t.tinta, font_size=40)
        atas_s = MathTex("x", color=t.aksen, font_size=40)
        bawah_s = MathTex("x", r"\left(\sqrt{x+4}+2\right)",
                          color=t.tinta, font_size=40)
        bawah_s[0].set_color(t.aksen)
        sederhana = VGroup(lim, self.pecahan(atas_s, bawah_s)
                           ).arrange(RIGHT, buff=0.32).move_to([0, Y_RUMUS, 0])

        lim2 = MathTex(r"\lim_{x \to 0}", color=t.tinta, font_size=40)
        atas2 = MathTex("1", color=t.tinta, font_size=40)
        bawah2 = MathTex(r"\sqrt{x+4}+2", color=t.tinta, font_size=40)
        sama = MathTex(r"=\ \tfrac{1}{4}", color=t.sorot, font_size=48)
        sisa = VGroup(lim2, self.pecahan(atas2, bawah2), sama
                      ).arrange(RIGHT, buff=0.34).move_to([0, Y_RUMUS, 0])
        self.hasil2 = sisa
        catat = Text("x boleh dicoret, sah sebab x bukan nol",
                     font_size=27, color=t.redup)
        sinema.batasi_lebar(catat, 11.0)
        catat.move_to([0, Y_CATATAN, 0])
        self.catat2 = catat
        c1 = self.coret(atas_s)
        c2 = self.coret(bawah_s[0])
        with sinema.babak(self, "hasil2", DURASI) as b:
            b.main(FadeOut(self.rumusB), FadeOut(self.catat_kali), run_time=0.5)
            b.main(FadeIn(sederhana), run_time=0.8)
            qc.periksa_adegan({"tajuk": self.tajuk, "sederhana": sederhana},
                              [("tajuk", "sederhana")])
            b.main(Create(c1), Create(c2), run_time=1.2)
            b.jeda(1.0)
            b.main(FadeOut(sederhana), FadeOut(c1), FadeOut(c2), run_time=0.7)
            b.main(FadeIn(sisa), run_time=1.1)
            b.jeda(1.2)
            b.main(FadeIn(catat, shift=UP * 0.10), run_time=1.5)
            b.jeda(1.8)
        qc.periksa_adegan({"tajuk": self.tajuk, "sisa": sisa, "catat": catat},
                          [("tajuk", "sisa"), ("sisa", "catat")])

    def b12_tutup(self):
        t = self.t
        langkah = Text("1.  masukkan angkanya\n"
                       "2.  kalau wajar, itu jawabannya\n"
                       "3.  kalau nol per nol, tulis ulang\n"
                       "     bentuknya, lalu masukkan lagi",
                       font_size=30, color=t.tinta, line_spacing=1.0)
        sinema.batasi_lebar(langkah, 10.5)
        langkah.move_to([0, 0.35, 0])
        tegas = Text("urutannya selalu sama, tidak pernah berubah",
                     font_size=27, color=t.sorot)
        sinema.batasi_lebar(tegas, 11.0)
        tegas.move_to([0, -2.45, 0])
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(self.hasil2), FadeOut(self.catat2),
                   FadeOut(self.tajuk), run_time=1.0)
            b.main(FadeIn(langkah, shift=UP * 0.14), run_time=2.6)
            b.jeda(2.4)
            b.main(FadeIn(tegas, shift=UP * 0.10), run_time=1.8)
            b.jeda(3.0)
        qc.periksa_adegan({"langkah": langkah, "tegas": tegas},
                          [("langkah", "tegas")])
