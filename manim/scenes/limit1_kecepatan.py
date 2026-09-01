"""Limit Materi 01, Kecepatan pada satu detik.

STORYBOARD (ditulis lebih dulu, kode menyusul):

  1. Judul pembuka.
  2. Rumus kecepatan = jarak dibagi waktu, ditulis di tengah.
  3. Dicoba untuk SATU SAAT: 0 dibagi 0, dicoret.
  4. Jalan keluarnya: perpendek selangnya, jangan paksa jadi nol.
  5. Kurva s(t) = 5t² muncul, titik tetap di detik ke-2.
  6. Selang 1 detik: titik kedua di detik 3, garis potong, 25 m/s.
  7. Selang setengah detik: titik merapat, 22,5 m/s.
  8. Selang sepersepuluh: garis potong nyaris menyinggung, 20,5 m/s.
  9. Tabel angkanya merapat ke 20.
 10. Aljabarnya: kecepatan rata-rata = 20 + 5h.
 11. Syarat pencoretan h, ditulis mencolok.
 12. Penutup.

INTI YANG HARUS TERTANAM: limit bukan cara berbelit untuk memasukkan angka.
Ia cara menjawab pertanyaan yang angkanya justru TIDAK BOLEH dimasukkan.
Karena itu babak 3 (0 dibagi 0 dicoret) dan babak 11 (syarat h bukan nol)
tidak boleh dipangkas: keduanya yang membedakan limit dari substitusi.

WARNA: biru = selang waktu mendatar · merah = jarak tegak · ungu = hasil dan
garis potong · tinta = kurva.
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
TOPIK = "limit1-kecepatan"
DURASI: dict[str, float] = json.loads(
    (AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8")
)["segmen"]

# --- ZONA TETAP (bingkai 14,22 x 8; batas aman x +-6,91  y +-3,80) ---
PUSAT_GRAFIK = np.array([-3.60, -0.45, 0.0])
X_KANAN = 3.25
Y_BARIS = [1.95, 1.25, 0.55, -0.15]
T0 = 2.0


def s(t):
    """Jarak jatuh setelah t detik, dalam meter."""
    return 5.0 * t * t


class KecepatanSesaat(Scene):
    tema = "terang"

    # ==================================================================
    def construct(self):
        self.t = Tema(self.tema)
        self.t.pasang(self)
        self.siapkan_grafik()

        self.b01_sapa()
        self.b02_rumus()
        self.b03_buntu()
        self.b04_jalan()
        self.b05_kelapa()
        self.b06_satu()
        self.b07_setengah()
        self.b08_sepersepuluh()
        self.b09_menuju()
        self.b10_aljabar()
        self.b11_syarat()
        self.b12_tutup()

    # ==================================================================
    def siapkan_grafik(self):
        t = self.t
        self.sumbu = Axes(
            x_range=[0, 3.6, 1], y_range=[0, 70, 20],
            x_length=5.0, y_length=4.5,
            axis_config={"color": t.redup, "stroke_width": 3,
                         "include_ticks": True, "tip_length": 0.18},
            tips=True,
        ).move_to(PUSAT_GRAFIK)
        self.label_sumbu = VGroup(
            MathTex("t", color=t.redup, font_size=24).next_to(
                self.sumbu.x_axis.get_end(), DR, buff=0.12),
            MathTex("s", color=t.redup, font_size=24).next_to(
                self.sumbu.y_axis.get_end(), UL, buff=0.12),
        )
        self.kurva = self.sumbu.plot(s, x_range=[0, 3.55], color=t.tinta,
                                     stroke_width=5)
        self.papan = VGroup(self.sumbu, self.label_sumbu, self.kurva)
        self.titik0 = Dot(self.sumbu.c2p(T0, s(T0)), color=t.sorot, radius=0.085)

    def garis_potong(self, h):
        """Garis lurus lewat dua titik pada kurva, dipanjangkan ke tepi papan.

        Ujungnya dipotong pada X, BUKAN pada y. Versi pertama memotong nilai y
        di nol dan di 69, dan pemotongan itu justru MEMINDAHKAN ujung garisnya
        keluar dari garis yang sebenarnya, sehingga yang tergambar bukan lagi
        garis potong: ia tidak lagi melewati kedua titiknya. Cacat itu terlihat
        jelas pada render uji, garisnya menyeberang jauh dari kedua titik.
        """
        t = self.t
        m = (s(T0 + h) - s(T0)) / h
        y = lambda x: s(T0) + m * (x - T0)
        # cari x tempat garis memotong dasar dan puncak papan, lalu batasi ke papan
        x_bawah = T0 - s(T0) / m
        x_atas = T0 + (69.0 - s(T0)) / m
        x1 = max(0.03, min(x_bawah, x_atas))
        x2 = min(3.50, max(x_bawah, x_atas))
        return Line(self.sumbu.c2p(x1, y(x1)), self.sumbu.c2p(x2, y(x2)),
                    color=t.sorot, stroke_width=3.5)

    def baris(self, i, kiri, kanan):
        t = self.t
        a = MathTex(kiri, color=t.tinta, font_size=28).move_to([X_KANAN - 1.45, Y_BARIS[i], 0])
        b = MathTex(kanan, color=t.aksen, font_size=28).move_to([X_KANAN + 1.30, Y_BARIS[i], 0])
        return VGroup(a, b)

    # ==================================================================
    def b01_sapa(self):
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Kecepatan pada satu detik", self.t,
                                 lama=DURASI["sapa"] * 0.78)
            b.catat(DURASI["sapa"] * 0.78)

    def b02_rumus(self):
        t = self.t
        self.rumus = MathTex(r"\text{kecepatan}", "=", r"\frac{\text{jarak}}{\text{waktu}}",
                             color=t.tinta, font_size=46).move_to([0, 0.95, 0])
        self.rumus[2].set_color(t.aksen2)
        with sinema.babak(self, "rumus", DURASI) as b:
            b.main(Write(self.rumus), run_time=2.6)
            b.jeda(1.2)
        qc.periksa_adegan({"rumus": self.rumus})

    def b03_buntu(self):
        t = self.t
        self.satuSaat = MathTex(r"\text{pada satu saat}", "=", r"\frac{0}{0}",
                                color=t.tinta, font_size=44).move_to([0, -0.85, 0])
        self.satuSaat[2].set_color(t.aksen)
        silang = Cross(self.satuSaat[2], stroke_color=t.aksen, stroke_width=7,
                       scale_factor=0.70)
        vonis = Text("hitungan ini tidak punya jawaban", font_size=28, color=t.aksen)
        sinema.batasi_lebar(vonis, 8.0)
        vonis.move_to([0, -2.35, 0])
        self.tolakan = VGroup(self.satuSaat, silang, vonis)
        with sinema.babak(self, "buntu", DURASI) as b:
            b.main(Write(self.satuSaat), run_time=2.4)
            b.main(Create(silang), run_time=1.1)
            b.main(FadeIn(vonis, shift=UP * 0.14), run_time=1.6)
            b.jeda(1.6)
        qc.periksa_adegan({"rumus": self.rumus, "tolakan": self.tolakan},
                          [("rumus", "tolakan")])

    def b04_jalan(self):
        t = self.t
        jalan = Text("jangan paksa selangnya nol, perpendek saja terus menerus",
                     font_size=27, color=t.sorot)
        sinema.batasi_lebar(jalan, 9.0)
        jalan.move_to([0, -0.85, 0])
        with sinema.babak(self, "jalan", DURASI) as b:
            b.main(FadeOut(self.tolakan), run_time=0.8)
            b.main(FadeIn(jalan, shift=UP * 0.14), run_time=1.8)
            b.jeda(1.4)
            b.main(FadeOut(jalan), FadeOut(self.rumus), run_time=1.0)

    def b05_kelapa(self):
        t = self.t
        self.judul_kurva = MathTex(r"s(t) = 5t^2", color=t.tinta, font_size=34)
        self.judul_kurva.move_to([PUSAT_GRAFIK[0], 2.85, 0])
        with sinema.babak(self, "kelapa", DURASI) as b:
            b.main(Create(self.sumbu), FadeIn(self.label_sumbu), run_time=1.8)
            b.main(Create(self.kurva), run_time=2.2)
            b.main(FadeIn(self.judul_kurva), FadeIn(self.titik0), run_time=1.2)
        qc.periksa_adegan({"papan": self.papan, "judul": self.judul_kurva},
                          [("papan", "judul")])

    def langkah_selang(self, nama, h, indeks, label_kiri, label_kanan,
                       lama_geser=1.6):
        """Satu langkah pemendekan selang: titik kedua, garis potong, satu baris."""
        t = self.t
        titik = Dot(self.sumbu.c2p(T0 + h, s(T0 + h)), color=t.aksen, radius=0.075)
        garis = self.garis_potong(h)
        baris = self.baris(indeks, label_kiri, label_kanan)
        with sinema.babak(self, nama, DURASI) as b:
            if indeks == 0:
                b.main(FadeIn(titik), Create(garis), run_time=lama_geser)
                self.garis_lama = garis
                self.titik_lama = titik
            else:
                b.main(Transform(self.titik_lama, titik),
                       Transform(self.garis_lama, garis), run_time=lama_geser)
            b.main(FadeIn(baris, shift=LEFT * 0.16), run_time=1.5)
            b.jeda(1.2)
        return baris

    def b06_satu(self):
        self.r1 = self.langkah_selang("satu", 1.0, 0,
                                      r"h = 1 \text{ detik}", r"25 \text{ m/s}", 2.0)
        qc.periksa_adegan({"papan": self.papan, "baris": self.r1},
                          [("papan", "baris")])

    def b07_setengah(self):
        self.r2 = self.langkah_selang("setengah", 0.5, 1,
                                      r"h = 0{,}5", r"22{,}5 \text{ m/s}")

    def b08_sepersepuluh(self):
        t = self.t
        self.r3 = self.langkah_selang("sepersepuluh", 0.1, 2,
                                      r"h = 0{,}1", r"20{,}5 \text{ m/s}")
        catat = Text("garis potongnya nyaris menyinggung kurva",
                     font_size=23, color=t.redup)
        sinema.batasi_lebar(catat, 5.6)
        catat.move_to([X_KANAN, -1.05, 0])
        self.catat_singgung = catat
        self.add(catat)

    def b09_menuju(self):
        t = self.t
        self.r4 = self.baris(3, r"h \to 0", r"20 \text{ m/s}")
        self.r4[1].set_color(t.sorot)
        kotak = SurroundingRectangle(self.r4, color=t.sorot, buff=0.16,
                                     stroke_width=2.5, corner_radius=0.08)
        self.tabel = VGroup(self.r1, self.r2, self.r3, self.r4)
        with sinema.babak(self, "menuju", DURASI) as b:
            b.main(FadeIn(self.r4, shift=LEFT * 0.16), run_time=1.6)
            b.main(Create(kotak), run_time=1.2)
            b.main(Indicate(self.r4, scale_factor=1.10, color=t.sorot), run_time=1.6)
            b.jeda(1.4)
        self.kotak_hasil = kotak
        qc.periksa_adegan({"papan": self.papan, "tabel": self.tabel,
                           "catat": self.catat_singgung},
                          [("papan", "tabel"), ("tabel", "catat")])

    def b10_aljabar(self):
        t = self.t
        self.alj = MathTex(r"\frac{s(2+h) - s(2)}{h}", "=",
                           r"\frac{20h + 5h^2}{h}", "=", r"20 + 5h",
                           color=t.tinta, font_size=32)
        self.alj.move_to([X_KANAN, 2.75, 0])
        self.alj[4].set_color(t.sorot)
        with sinema.babak(self, "aljabar", DURASI) as b:
            b.main(FadeOut(self.tabel), FadeOut(self.kotak_hasil),
                   FadeOut(self.catat_singgung), run_time=0.9)
            b.main(Write(self.alj), run_time=3.4)
            b.jeda(1.8)
        qc.periksa_adegan({"papan": self.papan, "alj": self.alj},
                          [("papan", "alj")])

    def b11_syarat(self):
        t = self.t
        syarat = Text("h boleh dicoret HANYA kalau h bukan nol",
                      font_size=27, color=t.sorot)
        sinema.batasi_lebar(syarat, 5.7)
        syarat.move_to([X_KANAN, 1.15, 0])
        sebab = Text("sebab kita sedang membaginya", font_size=23, color=t.redup)
        sinema.batasi_lebar(sebab, 5.7)
        sebab.move_to([X_KANAN, 0.50, 0])
        self.blok = VGroup(syarat, sebab)
        with sinema.babak(self, "syarat", DURASI) as b:
            b.main(FadeIn(syarat, shift=UP * 0.12), run_time=1.8)
            b.main(FadeIn(sebab, shift=UP * 0.10), run_time=1.5)
            b.jeda(2.0)
        qc.periksa_adegan({"papan": self.papan, "alj": self.alj, "blok": self.blok},
                          [("alj", "blok"), ("papan", "blok")])

    def b12_tutup(self):
        t = self.t
        tutup = Text("limit menjawab pertanyaan yang angkanya\n"
                     "justru tidak boleh dimasukkan",
                     font_size=27, color=t.sorot, line_spacing=0.9)
        sinema.batasi_lebar(tutup, 5.7)
        tutup.move_to([X_KANAN, -1.35, 0])
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeIn(tutup, shift=UP * 0.14), run_time=2.2)
            b.jeda(2.4)
        qc.periksa_adegan({"papan": self.papan, "tutup": tutup, "blok": self.blok},
                          [("papan", "tutup"), ("blok", "tutup")])
