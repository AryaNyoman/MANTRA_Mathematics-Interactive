"""Limit Materi 08, Limit sinus jadi angka 1.

STORYBOARD (ditulis lebih dulu, kode menyusul):

  1. Judul pembuka.
  2. Dicoba dimasukkan: sin 0 dibagi 0, bentuk tak tentu.
  3. Tabel angka, semuanya radian, merapat ke 1.
  4. Pertanyaannya: kenapa TEPAT satu?
  5. Lingkaran satuan muncul, sudut lancip diambil.
  6. Tiga daerah bersarang disorot satu per satu.
  7. Ketiga luasnya ditulis.
  8. Urutan luasnya naik, karena yang satu termuat di yang lain.
  9. Dibagi sin, bentuknya jadi terjepit.
 10. Sudut dikecilkan, kedua penjepit menuju 1.
 11. Peringatan radian.
 12. Penutup.

INTI YANG HARUS TERTANAM: hasilnya TEPAT satu, dan alasannya bukan tebakan
dari tabel melainkan perbandingan luas. Babak 6 sampai 9 adalah buktinya dan
tidak boleh dipangkas.

Ini penyambung ke topik Trigonometri, jadi lingkaran satuannya WAJIB memakai
warna yang sama dengan video dan widget trigonometri.

WARNA: merah = sin · biru = cos · ungu = sudut dan juring · tinta = jari-jari.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import lingkungan  # noqa: E402,F401  -- menambal PATH MiKTeX, WAJIB sebelum manim

from manim import *  # noqa: E402
from matra_theme import Tema  # noqa: E402
import qc  # noqa: E402
import sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "limit8-sinus"
DURASI: dict[str, float] = json.loads(
    (AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8")
)["segmen"]

# --- ZONA TETAP (bingkai 14,22 x 8; batas aman x +-6,91  y +-3,80) ---
PUSAT = np.array([-3.70, -0.35, 0.0])
JARI = 2.15
X_KANAN = 3.35
SUDUT = 55.0        # sudut peraga. Pada 38 derajat ketiga luasnya nyaris
                    # sama besar dan yang tergambar cuma satu gumpalan;
                    # pada 55 derajat perbandingannya kira-kira 1 : 2 : 3.


class LimitSinus(Scene):
    tema = "terang"

    # ==================================================================
    def construct(self):
        self.t = Tema(self.tema)
        self.t.pasang(self)
        self.siapkan_lingkaran()

        self.b01_sapa()
        self.b02_coba()
        self.b03_angka()
        self.b04_tanya()
        self.b05_lingkaran()
        self.b06_tiga()
        self.b07_luas()
        self.b08_urut()
        self.b09_bagi()
        self.b10_jepit()
        self.b11_radian()
        self.b12_tutup()

    # ==================================================================
    def siapkan_lingkaran(self):
        t = self.t
        r = np.radians(SUDUT)
        self.P = PUSAT + np.array([np.cos(r) * JARI, np.sin(r) * JARI, 0.0])
        self.K = PUSAT + RIGHT * JARI                       # titik di sumbu, sudut 0
        self.Q = PUSAT + RIGHT * (np.cos(r) * JARI)         # kaki tegak lurus dari P
        self.S = PUSAT + RIGHT * JARI + UP * (np.tan(r) * JARI)  # singgung di K

        self.lingkaran = Circle(radius=JARI, color=t.redup, stroke_width=2.4,
                                fill_opacity=0).move_to(PUSAT).set_stroke(opacity=0.55)
        self.sumbu = VGroup(
            Line(PUSAT + LEFT * (JARI + 0.30), PUSAT + RIGHT * (JARI + 0.55),
                 color=t.redup, stroke_width=1.6).set_stroke(opacity=0.55),
            Line(PUSAT + DOWN * (JARI * 0.55), PUSAT + UP * (JARI + 0.30),
                 color=t.redup, stroke_width=1.6).set_stroke(opacity=0.55),
        )
        self.jari = Line(PUSAT, self.P, color=t.tinta, stroke_width=3)
        self.busur = Arc(radius=JARI, start_angle=0, angle=r, arc_center=PUSAT,
                         color=t.sorot, stroke_width=5)
        self.lab_sudut = MathTex(r"\theta", color=t.sorot, font_size=30).move_to(
            PUSAT + rotate_vector(RIGHT * (JARI * 0.42), r / 2))
        self.rangka = VGroup(self.lingkaran, self.sumbu, self.jari, self.busur)

    def baris(self, i, kiri, kanan, warna=None):
        t = self.t
        y = 2.05 - i * 0.62
        a = MathTex(kiri, color=t.tinta, font_size=27).move_to([X_KANAN - 1.40, y, 0])
        b = MathTex(kanan, color=warna or t.aksen, font_size=27).move_to(
            [X_KANAN + 1.20, y, 0])
        return VGroup(a, b)

    # ==================================================================
    def b01_sapa(self):
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Limit sinus jadi angka 1", self.t,
                                 lama=DURASI["sapa"] * 0.80)
            b.catat(DURASI["sapa"] * 0.80)

    def b02_coba(self):
        t = self.t
        self.subs = MathTex(r"\frac{\sin 0}{0}", "=", r"\frac{0}{0}",
                            color=t.tinta, font_size=48).move_to([0, 0.75, 0])
        self.subs[2].set_color(t.aksen)
        cap = Text("bentuk tak tentu lagi", font_size=27, color=t.redup)
        sinema.batasi_lebar(cap, 8.0)
        cap.move_to([0, -0.75, 0])
        self.blok_coba = VGroup(self.subs, cap)
        with sinema.babak(self, "coba", DURASI) as b:
            b.main(Write(self.subs), run_time=2.6)
            b.main(FadeIn(cap, shift=UP * 0.12), run_time=1.6)
            b.jeda(1.4)
        qc.periksa_adegan({"blok": self.blok_coba})

    def b03_angka(self):
        t = self.t
        self.tabel = VGroup(
            self.baris(0, r"x = 0{,}1", r"0{,}9983", t.aksen2),
            self.baris(1, r"x = 0{,}01", r"0{,}999983", t.aksen2),
            self.baris(2, r"x = 0{,}001", r"0{,}99999983", t.aksen2),
        )
        judul = Text("semuanya dalam radian", font_size=24, color=t.redup)
        sinema.batasi_lebar(judul, 5.6)
        judul.move_to([X_KANAN, 2.75, 0])
        self.tabel.add(judul)
        with sinema.babak(self, "angka", DURASI) as b:
            b.main(FadeOut(self.blok_coba), run_time=0.8)
            b.main(FadeIn(judul), run_time=1.0)
            for r in self.tabel[:3]:
                b.main(FadeIn(r, shift=LEFT * 0.16), run_time=1.5)
            b.jeda(1.2)
        qc.periksa_adegan({"tabel": self.tabel})

    def b04_tanya(self):
        t = self.t
        tanya = Text("merapat ke 1. Tapi kenapa TEPAT satu?",
                     font_size=28, color=t.sorot)
        sinema.batasi_lebar(tanya, 5.7)
        tanya.move_to([X_KANAN, 0.05, 0])
        self.tanya = tanya
        with sinema.babak(self, "tanya", DURASI) as b:
            b.main(FadeIn(tanya, shift=UP * 0.14), run_time=2.0)
            b.jeda(1.6)
        qc.periksa_adegan({"tabel": self.tabel, "tanya": tanya},
                          [("tabel", "tanya")])

    def b05_lingkaran(self):
        with sinema.babak(self, "lingkaran", DURASI) as b:
            b.main(FadeOut(self.tanya), run_time=0.7)
            b.main(Create(self.lingkaran), Create(self.sumbu), run_time=2.0)
            b.main(Create(self.jari), Create(self.busur),
                   FadeIn(self.lab_sudut), run_time=2.0)
        qc.periksa_adegan({"rangka": self.rangka, "tabel": self.tabel},
                          [("rangka", "tabel")])

    def b06_tiga(self):
        t = self.t
        # z_index dipaksa: yang paling KECIL harus di lapisan paling atas.
        # Tanpa itu segitiga luar menimbun segitiga dalam, dan yang tergambar
        # cuma satu gumpalan warna, padahal narasinya bilang tiga daerah yang
        # saling bersarang. Cacat itu terlihat di render uji pertama.
        self.seg_luar = Polygon(PUSAT, self.K, self.S, color=t.aksen2,
                                fill_opacity=0.14, stroke_width=2.5).set_z_index(1)
        self.juring = Sector(radius=JARI, start_angle=0, angle=np.radians(SUDUT),
                             arc_center=PUSAT, color=t.sorot,
                             fill_opacity=0.26, stroke_width=2.5).set_z_index(2)
        self.seg_dalam = Polygon(PUSAT, self.Q, self.P, color=t.aksen,
                                 fill_opacity=0.42, stroke_width=2.5).set_z_index(3)
        self.daerah = VGroup(self.seg_luar, self.juring, self.seg_dalam)
        with sinema.babak(self, "tiga", DURASI) as b:
            b.main(FadeOut(self.tabel), run_time=0.8)
            b.main(FadeIn(self.seg_dalam), run_time=1.5)
            b.main(FadeIn(self.juring), run_time=1.5)
            b.main(FadeIn(self.seg_luar), run_time=1.5)
            b.jeda(1.4)
        qc.periksa_adegan({"rangka": self.rangka, "daerah": self.daerah})

    def b07_luas(self):
        t = self.t
        self.luas = VGroup(
            MathTex(r"\tfrac{1}{2}\cos\theta\,\sin\theta", color=t.aksen, font_size=32),
            MathTex(r"\tfrac{1}{2}\,\theta", color=t.sorot, font_size=32),
            MathTex(r"\tfrac{1}{2}\tan\theta", color=t.aksen2, font_size=32),
        ).arrange(DOWN, buff=0.55, aligned_edge=LEFT)
        self.luas.move_to([X_KANAN, 1.55, 0])
        nama = VGroup(
            Text("segitiga dalam", font_size=21, color=t.redup),
            Text("juring", font_size=21, color=t.redup),
            Text("segitiga luar", font_size=21, color=t.redup),
        )
        for n, m in zip(nama, self.luas):
            n.next_to(m, RIGHT, buff=0.45)
        self.blok_luas = VGroup(self.luas, nama)
        with sinema.babak(self, "luas", DURASI) as b:
            for m, n in zip(self.luas, nama):
                b.main(Write(m), FadeIn(n), run_time=2.2)
            b.jeda(1.4)
        qc.periksa_adegan({"rangka": self.rangka, "blok_luas": self.blok_luas},
                          [("rangka", "blok_luas")])

    def b08_urut(self):
        t = self.t
        urut = MathTex(r"\tfrac{1}{2}\cos\theta\sin\theta", "<", r"\tfrac{1}{2}\theta",
                       "<", r"\tfrac{1}{2}\tan\theta", color=t.tinta, font_size=30)
        urut.move_to([X_KANAN, -0.55, 0])
        urut[0].set_color(t.aksen)
        urut[2].set_color(t.sorot)
        urut[4].set_color(t.aksen2)
        self.urut = urut
        with sinema.babak(self, "urut", DURASI) as b:
            b.main(Write(urut), run_time=3.0)
            b.jeda(1.6)
        qc.periksa_adegan({"rangka": self.rangka, "urut": urut,
                           "blok_luas": self.blok_luas},
                          [("blok_luas", "urut"), ("rangka", "urut")])

    def b09_bagi(self):
        t = self.t
        jepit = MathTex(r"\cos\theta", "<", r"\frac{\theta}{\sin\theta}", "<",
                        r"\frac{1}{\cos\theta}", color=t.tinta, font_size=36)
        jepit.move_to([X_KANAN, -1.85, 0])
        jepit[0].set_color(t.aksen2)
        jepit[2].set_color(t.sorot)
        jepit[4].set_color(t.aksen2)
        self.jepit = jepit
        with sinema.babak(self, "bagi", DURASI) as b:
            b.main(FadeOut(self.blok_luas), run_time=0.8)
            b.main(TransformFromCopy(self.urut, jepit), run_time=2.8)
            b.jeda(1.8)
        qc.periksa_adegan({"rangka": self.rangka, "jepit": jepit, "urut": self.urut},
                          [("urut", "jepit"), ("rangka", "jepit")])

    def b10_jepit(self):
        t = self.t
        kotak = SurroundingRectangle(self.jepit[2], color=t.sorot, buff=0.14,
                                     stroke_width=2.5, corner_radius=0.08)
        pesan = Text("kedua penjepitnya menuju 1, jadi yang di tengah ikut",
                     font_size=24, color=t.sorot)
        sinema.batasi_lebar(pesan, 5.7)
        pesan.move_to([X_KANAN, -2.90, 0])
        self.pesan_jepit = pesan
        with sinema.babak(self, "jepit", DURASI) as b:
            b.main(FadeOut(self.urut), run_time=0.7)
            b.main(Indicate(self.jepit[0], scale_factor=1.12, color=t.sorot),
                   Indicate(self.jepit[4], scale_factor=1.12, color=t.sorot),
                   run_time=1.8)
            b.main(Create(kotak), run_time=1.2)
            b.main(FadeIn(pesan, shift=UP * 0.12), run_time=1.8)
            b.jeda(1.6)
        self.kotak_jepit = kotak
        qc.periksa_adegan({"rangka": self.rangka, "jepit": self.jepit,
                           "pesan": pesan}, [("jepit", "pesan")])

    def b11_radian(self):
        t = self.t
        awas = Text("sudutnya WAJIB radian", font_size=29, color=t.aksen)
        sinema.batasi_lebar(awas, 5.7)
        awas.move_to([X_KANAN, 1.75, 0])
        sebab = Text("luas juring = setengah theta hanya benar dalam radian",
                     font_size=23, color=t.redup)
        sinema.batasi_lebar(sebab, 5.7)
        sebab.move_to([X_KANAN, 1.00, 0])
        self.blok_radian = VGroup(awas, sebab)
        with sinema.babak(self, "radian", DURASI) as b:
            b.main(FadeIn(awas, shift=UP * 0.12), run_time=1.8)
            b.main(FadeIn(sebab, shift=UP * 0.10), run_time=1.8)
            b.jeda(2.0)
        qc.periksa_adegan({"rangka": self.rangka, "blok_radian": self.blok_radian,
                           "jepit": self.jepit},
                          [("blok_radian", "jepit"), ("rangka", "blok_radian")])

    def b12_tutup(self):
        t = self.t
        hasil = MathTex(r"\lim_{x \to 0}\frac{\sin x}{x}", "=", "1",
                        color=t.sorot, font_size=46).move_to([X_KANAN, -0.30, 0])
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(self.blok_radian), FadeOut(self.pesan_jepit),
                   FadeOut(self.kotak_jepit), FadeOut(self.jepit), run_time=1.0)
            b.main(Write(hasil), run_time=2.6)
            b.jeda(2.4)
        qc.periksa_adegan({"rangka": self.rangka, "hasil": hasil},
                          [("rangka", "hasil")])
