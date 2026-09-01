"""Vektor Materi 01, Angka saja tidak cukup.

STORYBOARD (ditulis lebih dulu, kode menyusul):

  1. Judul pembuka.
  2. Sungai digambar. Panah dayung biru, tegak lurus menuju seberang.
  3. Panah arus merah muncul di tepi berangkat, mengalir ke hilir.
  4. Lintasan sebenarnya (ungu putus-putus) dan titik mendarat, jauh di hilir.
  5. Panah gerak nyata hitam: dayung ditambah arus.
  6. Layar bersih. Dua kelompok besaran, kiri cukup satu angka.
  7. Kelompok kanan: wajib disertai arah.
  8. Layar bersih. Tiga panel, masing-masing 3 km dan 4 km disusun berbeda.
     Hasilnya BELUM ditampilkan: ini pertanyaan, siswa diberi waktu menebak.
  9. Panel kiri dijawab: searah, 7 km.
 10. Panel tengah dijawab: berlawanan, 1 km.
 11. Panel kanan dijawab: tegak lurus, 5 km, lengkap dengan akarnya.
 12. Penutup: kalimat sorot Materi 01, kata per kata.

INTI YANG HARUS TERTANAM: arah bukan hiasan pada besaran, ia mengubah
hasil hitungannya. Karena itu babak 4 (mendarat di hilir) dan babak 9 sampai 11
(satu pasang angka, tiga jawaban) tidak boleh dipangkas: keduanya yang membuat
siswa merasa perlu vektor sebelum bertemu lambangnya.

KENAPA HASILNYA DITAHAN SAMPAI BABAK 9
Babak 8 mengajukan pertanyaan lalu diam. Itu bagian 5 STANDAR-MENGAJAR butir 3:
tanya, beri jeda, baru jawab. Kalau ketiga jawabannya muncul bersama soalnya,
tidak ada yang perlu ditebak dan segmennya berhenti mengajar.

WARNA: biru = dayung dan besaran mendatar · merah = arus · ungu = lintasan dan
hasil · tinta = gerak sebenarnya dan teks.
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
TOPIK = "vektor1-perahu"
DURASI: dict[str, float] = json.loads(
    (AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8")
)["segmen"]

# --- ZONA TETAP (bingkai 14,22 x 8; batas aman x +-6,91  y +-3,80) ---
# Sungai menempati paruh kiri, tabel angka menempati paruh kanan.
KM = 1.0                      # satu kilometer = satu satuan layar
Y_BERANGKAT = -2.40
Y_SEBERANG = Y_BERANGKAT + 3 * KM      # sungai selebar 3 km
X_SUNGAI = (-6.60, 0.40)
X_MULAI = -5.00
X_TABEL = 3.55
Y_TABEL = [1.55, 0.80, 0.05, -0.90]

# Tiga panel babak 8 sampai 11.
X_PANEL = (-4.55, 0.00, 4.55)
Y_PANEL = -0.60
SKALA_PANEL = 0.34            # satu kilometer pada panel kecil


def titik(x_km, y_km):
    """Koordinat layar dari kilometer, diukur dari titik berangkat."""
    return np.array([X_MULAI + x_km * KM, Y_BERANGKAT + y_km * KM, 0.0])


class PerahuMenyeberang(Scene):
    tema = "terang"

    # ==================================================================
    def construct(self):
        self.t = Tema(self.tema)
        self.t.pasang(self)

        self.b01_sapa()
        self.b02_dayung()
        self.b03_arus()
        self.b04_hilir()
        self.b05_jawab()
        self.b06_besaran()
        self.b07_arah()
        self.b08_tanya()
        self.b09_searah()
        self.b10_lawan()
        self.b11_tegak()
        self.b12_tutup()

    # ------------------------------------------------------------------
    # alat gambar
    # ------------------------------------------------------------------
    def panah(self, dari, ke, warna, tebal=6):
        """Panah lurus. buff nol supaya pangkalnya benar-benar di titik asal."""
        return Arrow(dari, ke, color=warna, buff=0, stroke_width=tebal,
                     max_tip_length_to_length_ratio=0.18,
                     max_stroke_width_to_length_ratio=14)

    def baris_tabel(self, i, nama, nilai, warna):
        t = self.t
        kiri = Text(nama, font_size=26, color=t.redup)
        kiri.move_to([X_TABEL - 1.55, Y_TABEL[i], 0])
        kanan = MathTex(nilai, color=warna, font_size=34)
        kanan.move_to([X_TABEL + 0.95, Y_TABEL[i], 0])
        return VGroup(kiri, kanan)

    def panah_panel(self, pusat_x, dari_km, ke_km, warna, tebal=5):
        """Panah di dalam panel kecil, koordinatnya dalam kilometer."""
        a = np.array([pusat_x + dari_km[0] * SKALA_PANEL,
                      Y_PANEL + dari_km[1] * SKALA_PANEL, 0.0])
        b = np.array([pusat_x + ke_km[0] * SKALA_PANEL,
                      Y_PANEL + ke_km[1] * SKALA_PANEL, 0.0])
        return self.panah(a, b, warna, tebal)

    # ==================================================================
    def b01_sapa(self):
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Angka saja tidak cukup", self.t,
                                 lama=DURASI["sapa"] * 0.80)
            b.catat(DURASI["sapa"] * 0.80)

    # ------------------------------------------------------------------
    def b02_dayung(self):
        t = self.t
        air = Rectangle(
            width=X_SUNGAI[1] - X_SUNGAI[0], height=3 * KM,
            fill_color=t.aksen2, fill_opacity=0.10, stroke_opacity=0,
        ).move_to([(X_SUNGAI[0] + X_SUNGAI[1]) / 2, (Y_BERANGKAT + Y_SEBERANG) / 2, 0])
        tepi_jauh = Line([X_SUNGAI[0], Y_SEBERANG, 0], [X_SUNGAI[1], Y_SEBERANG, 0],
                         color=t.aksen2, stroke_width=4)
        tepi_dekat = Line([X_SUNGAI[0], Y_BERANGKAT, 0], [X_SUNGAI[1], Y_BERANGKAT, 0],
                          color=t.redup, stroke_width=4)
        nama_jauh = Text("tepi seberang", font_size=24, color=t.aksen2)
        nama_jauh.next_to(tepi_jauh, UP, buff=0.16).align_to(tepi_jauh, LEFT)
        nama_dekat = Text("tepi berangkat", font_size=24, color=t.redup)
        nama_dekat.next_to(tepi_dekat, DOWN, buff=0.16).align_to(tepi_dekat, LEFT)
        lebar = Text("3 km", font_size=24, color=t.redup)
        lebar.move_to([X_SUNGAI[1] - 0.75, (Y_BERANGKAT + Y_SEBERANG) / 2, 0])
        # Tulisan di dalam gambar sungai disimpan terpisah supaya bisa diadu
        # satu per satu oleh qc. Mengadu dengan seluruh kelompok sungai keliru:
        # kotak airnya menutupi hampir seluruh paruh kiri layar, jadi apa pun
        # yang digambar di dalam sungai akan dianggap bertindih dengannya.
        self.nama_jauh = nama_jauh
        self.lebar_sungai = lebar
        self.sungai = VGroup(air, tepi_jauh, tepi_dekat, nama_jauh, nama_dekat, lebar)

        self.perahu = Dot(titik(0, 0), color=t.tinta, radius=0.11)
        self.p_dayung = self.panah(titik(0, 0), titik(0, 3), t.aksen2)
        self.baris_dayung = self.baris_tabel(0, "dayung", r"(0\ \ 3)\ \text{km}", t.aksen2)

        with sinema.babak(self, "dayung", DURASI) as b:
            b.main(FadeIn(self.sungai), run_time=1.4)
            b.main(FadeIn(self.perahu, scale=1.6), run_time=0.7)
            b.main(GrowArrow(self.p_dayung), run_time=1.6)
            b.main(FadeIn(self.baris_dayung, shift=LEFT * 0.2), run_time=1.1)
            b.jeda(1.0)
        qc.periksa_adegan(
            {"sungai": self.sungai, "dayung": self.p_dayung, "tabel1": self.baris_dayung},
            [("dayung", "tabel1")])

    # ------------------------------------------------------------------
    def b03_arus(self):
        t = self.t
        self.p_arus = self.panah(titik(0, 0), titik(2, 0), t.aksen)
        self.baris_arus = self.baris_tabel(1, "arus", r"(2\ \ 0)\ \text{km}", t.aksen)
        with sinema.babak(self, "arus", DURASI) as b:
            b.main(GrowArrow(self.p_arus), run_time=1.5)
            b.main(FadeIn(self.baris_arus, shift=LEFT * 0.2), run_time=1.1)
            b.jeda(1.0)
        qc.periksa_adegan(
            {"sungai": self.sungai, "arus": self.p_arus, "tabel2": self.baris_arus},
            [("arus", "tabel2")])

    # ------------------------------------------------------------------
    def b04_hilir(self):
        t = self.t
        self.lintasan = DashedLine(titik(0, 0), titik(2, 3), color=t.sorot,
                                   stroke_width=5, dash_length=0.16)
        self.mendarat = Dot(titik(2, 3), color=t.sorot, radius=0.11)
        # Label ini SEMULA ditaruh di atas titik mendarat, dan di situ ia
        # bertindih dengan nama "tepi seberang" yang menempel di ujung kiri
        # garis yang sama. Terlihat di lembar kontak render uji, frame 8 sampai
        # 10. Sekarang ia turun ke dalam badan sungai, di sebelah KANAN titik
        # mendarat, tempat yang tidak dilewati lintasan maupun panah.
        # Angka 2 km-nya dibuang dari label karena sudah ada di baris "hanyut".
        kabar = Text("mendarat di hilir", font_size=28, color=t.sorot)
        sinema.batasi_lebar(kabar, 3.4)
        kabar.move_to([titik(2, 3)[0] + 1.85, Y_SEBERANG - 0.45, 0])
        self.kabar = kabar
        self.baris_hanyut = self.baris_tabel(3, "hanyut", r"2\ \text{km}", t.sorot)

        with sinema.babak(self, "hilir", DURASI) as b:
            b.main(Create(self.lintasan), run_time=2.0)
            b.main(FadeIn(self.mendarat, scale=1.6), run_time=0.7)
            b.main(FadeIn(kabar, shift=UP * 0.14), run_time=1.2)
            b.jeda(1.4)
            b.main(FadeIn(self.baris_hanyut, shift=LEFT * 0.2), run_time=1.0)
            b.jeda(1.2)
        # Pasangan "kabar" lawan "sungai" WAJIB ada: tanpa itu, tabrakan label
        # dengan nama tepi lolos dari pemeriksa dan baru ketahuan setelah
        # dirender. Persis itu yang terjadi pada render uji pertama.
        qc.periksa_adegan(
            {"kabar": self.kabar, "tabel4": self.baris_hanyut,
             "tabel1": self.baris_dayung, "tabel2": self.baris_arus,
             "tepi": self.nama_jauh, "lebar": self.lebar_sungai},
            [("kabar", "tabel4"), ("tabel1", "tabel2"),
             ("kabar", "tepi"), ("kabar", "lebar")])

    # ------------------------------------------------------------------
    def b05_jawab(self):
        t = self.t
        self.p_gerak = self.panah(titik(0, 0), titik(2, 3), t.tinta, tebal=8)
        self.baris_gerak = self.baris_tabel(2, "gerak nyata", r"(2\ \ 3)\ \text{km}", t.tinta)
        jumlah = MathTex(r"(0\ \ 3)", "+", r"(2\ \ 0)", "=", r"(2\ \ 3)",
                         color=t.tinta, font_size=38)
        jumlah[0].set_color(t.aksen2)
        jumlah[2].set_color(t.aksen)
        jumlah.move_to([X_TABEL, -2.35, 0])
        self.jumlah = jumlah

        with sinema.babak(self, "jawab", DURASI) as b:
            b.main(FadeOut(self.kabar), run_time=0.5)
            b.main(GrowArrow(self.p_gerak), run_time=1.8)
            b.main(FadeIn(self.baris_gerak, shift=LEFT * 0.2), run_time=1.0)
            b.main(Write(jumlah), run_time=2.0)
            b.jeda(1.0)
        qc.periksa_adegan(
            {"gerak": self.p_gerak, "tabel3": self.baris_gerak, "jumlah": self.jumlah,
             "tabel4": self.baris_hanyut},
            [("tabel3", "jumlah"), ("tabel4", "jumlah")])

    # ------------------------------------------------------------------
    def b06_besaran(self):
        t = self.t
        semua_sungai = VGroup(
            self.sungai, self.perahu, self.p_dayung, self.p_arus, self.p_gerak,
            self.lintasan, self.mendarat, self.baris_dayung, self.baris_arus,
            self.baris_gerak, self.baris_hanyut, self.jumlah,
        )

        kepala_kiri = Text("cukup satu angka", font_size=32, color=t.redup)
        kepala_kiri.move_to([-3.50, 2.10, 0])
        garis_kiri = Line([-6.30, 1.62, 0], [-0.70, 1.62, 0], color=t.redup, stroke_width=2)
        isi_kiri = VGroup(*[
            Text(s, font_size=30, color=t.tinta).move_to([-3.50, y, 0])
            for s, y in [("massa 60 kg", 0.85), ("suhu 27 derajat", 0.05),
                         ("waktu 2 jam", -0.75)]
        ])
        self.kiri = VGroup(kepala_kiri, garis_kiri, isi_kiri)

        with sinema.babak(self, "besaran", DURASI) as b:
            b.main(FadeOut(semua_sungai), run_time=1.2)
            b.main(FadeIn(kepala_kiri, shift=DOWN * 0.14), Create(garis_kiri), run_time=1.4)
            for baris in isi_kiri:
                b.main(FadeIn(baris, shift=UP * 0.12), run_time=0.9)
            b.jeda(1.4)
        qc.periksa_adegan({"kiri": self.kiri})

    # ------------------------------------------------------------------
    def b07_arah(self):
        t = self.t
        kepala_kanan = Text("wajib disertai arah", font_size=32, color=t.sorot)
        kepala_kanan.move_to([3.50, 2.10, 0])
        garis_kanan = Line([0.70, 1.62, 0], [6.30, 1.62, 0], color=t.sorot, stroke_width=2)
        isi_kanan = VGroup(*[
            Text(s, font_size=30, color=t.tinta).move_to([3.50, y, 0])
            for s, y in [("perpindahan 5 km", 0.85), ("kecepatan 60 km per jam", 0.05),
                         ("gaya 10 newton", -0.75)]
        ])
        for baris in isi_kanan:
            sinema.batasi_lebar(baris, 5.4)
        self.kanan = VGroup(kepala_kanan, garis_kanan, isi_kanan)
        pemisah = Line([0, 1.90, 0], [0, -1.20, 0], color=t.redup, stroke_width=2)
        self.pemisah = pemisah

        with sinema.babak(self, "arah", DURASI) as b:
            b.main(Create(pemisah), run_time=0.8)
            b.main(FadeIn(kepala_kanan, shift=DOWN * 0.14), Create(garis_kanan), run_time=1.4)
            for baris in isi_kanan:
                b.main(FadeIn(baris, shift=UP * 0.12), run_time=0.9)
            b.jeda(1.2)
        qc.periksa_adegan({"kiri": self.kiri, "kanan": self.kanan, "pemisah": self.pemisah},
                          [("kiri", "kanan"), ("kiri", "pemisah")])

    # ------------------------------------------------------------------
    def b08_tanya(self):
        """Tiga susunan digambar, hasilnya SENGAJA ditahan sampai babak 9."""
        t = self.t
        lama = VGroup(self.kiri, self.kanan, self.pemisah)

        soal = MathTex(r"3\ \text{km}", r"\quad\text{dan}\quad", r"4\ \text{km}",
                       color=t.tinta, font_size=44)
        soal[0].set_color(t.aksen2)
        soal[2].set_color(t.aksen)
        soal.move_to([0, 2.85, 0])
        self.soal = soal

        judul_panel = ["searah", "berlawanan", "tegak lurus"]
        self.panel = []
        for i, x in enumerate(X_PANEL):
            nama = Text(judul_panel[i], font_size=27, color=t.redup)
            nama.move_to([x, 1.55, 0])
            self.panel.append(VGroup(nama))

        # panel kiri: 3 lalu 4, keduanya ke kanan, disambung ujung ke pangkal
        x0 = X_PANEL[0]
        self.susun0 = VGroup(
            self.panah_panel(x0, (-3.5, 0), (-0.5, 0), t.aksen2),
            self.panah_panel(x0, (-0.5, 0), (3.5, 0), t.aksen),
        )
        # panel tengah: 4 ke kanan lalu 3 kembali ke kiri
        x1 = X_PANEL[1]
        self.susun1 = VGroup(
            self.panah_panel(x1, (-2.0, 0), (2.0, 0), t.aksen),
            self.panah_panel(x1, (2.0, -1.1), (-1.0, -1.1), t.aksen2),
        )
        # panel kanan: 3 ke kanan lalu 4 ke atas
        x2 = X_PANEL[2]
        self.susun2 = VGroup(
            self.panah_panel(x2, (-1.5, -2.0), (1.5, -2.0), t.aksen2),
            self.panah_panel(x2, (1.5, -2.0), (1.5, 2.0), t.aksen),
        )
        self.susun = [self.susun0, self.susun1, self.susun2]

        tanda = Text("berapa hasilnya?", font_size=30, color=t.sorot)
        tanda.move_to([0, -2.95, 0])
        self.tanda = tanda

        with sinema.babak(self, "tanya", DURASI) as b:
            b.main(FadeOut(lama), run_time=1.0)
            b.main(Write(soal), run_time=1.8)
            for i in range(3):
                b.main(FadeIn(self.panel[i]), *[GrowArrow(a) for a in self.susun[i]],
                       run_time=1.3)
            b.main(FadeIn(tanda, shift=UP * 0.14), run_time=1.0)
            # Sisa waktunya sengaja dibiarkan diam: ini pertanyaan, dan siswa
            # diberi waktu menebak. sinema.babak.tutup() yang mengisinya.
        qc.periksa_adegan(
            {"soal": self.soal, "kiri": self.susun0, "tengah": self.susun1,
             "kanan": self.susun2, "tanda": self.tanda},
            [("kiri", "tengah"), ("tengah", "kanan"), ("soal", "kiri")])

    # ------------------------------------------------------------------
    def _jawaban(self, i, teks, warna):
        t = self.t
        j = MathTex(teks, color=warna, font_size=42)
        j.move_to([X_PANEL[i], -2.05, 0])
        return j

    def b09_searah(self):
        t = self.t
        self.jawab0 = self._jawaban(0, r"7\ \text{km}", t.sorot)
        with sinema.babak(self, "searah", DURASI) as b:
            b.main(FadeOut(self.tanda), run_time=0.5)
            b.main(Indicate(self.susun0, color=t.sorot, scale_factor=1.06), run_time=1.1)
            b.main(FadeIn(self.jawab0, shift=UP * 0.14), run_time=1.1)
        qc.periksa_adegan({"kiri": self.susun0, "jawab0": self.jawab0})

    def b10_lawan(self):
        t = self.t
        self.jawab1 = self._jawaban(1, r"1\ \text{km}", t.sorot)
        with sinema.babak(self, "lawan", DURASI) as b:
            b.main(Indicate(self.susun1, color=t.sorot, scale_factor=1.06), run_time=1.1)
            b.main(FadeIn(self.jawab1, shift=UP * 0.14), run_time=1.1)
        qc.periksa_adegan({"jawab0": self.jawab0, "jawab1": self.jawab1},
                          [("jawab0", "jawab1")])

    def b11_tegak(self):
        t = self.t
        self.jawab2 = self._jawaban(2, r"5\ \text{km}", t.sorot)
        akar = MathTex(r"\sqrt{3^{2} + 4^{2}} = 5", color=t.tinta, font_size=34)
        akar.move_to([X_PANEL[2], -2.90, 0])
        self.akar = akar
        with sinema.babak(self, "tegak", DURASI) as b:
            b.main(Indicate(self.susun2, color=t.sorot, scale_factor=1.06), run_time=1.1)
            b.main(FadeIn(self.jawab2, shift=UP * 0.14), run_time=1.1)
            b.main(Write(akar), run_time=1.8)
        qc.periksa_adegan(
            {"jawab1": self.jawab1, "jawab2": self.jawab2, "akar": self.akar,
             "kanan": self.susun2},
            [("jawab1", "jawab2"), ("jawab2", "akar")])

    # ------------------------------------------------------------------
    def b12_tutup(self):
        t = self.t
        lama = VGroup(
            self.soal, self.akar, self.jawab0, self.jawab1, self.jawab2,
            *self.panel, *self.susun,
        )
        atas = Text("Besaran yang butuh arah itulah yang disebut VEKTOR.",
                    font_size=36, color=t.tinta)
        sinema.batasi_lebar(atas, 11.6)
        atas.move_to([0, 0.60, 0])
        bawah = Text("Yang cukup satu angka disebut skalar.",
                     font_size=36, color=t.sorot)
        sinema.batasi_lebar(bawah, 11.6)
        bawah.move_to([0, -0.55, 0])
        self.tutup = VGroup(atas, bawah)

        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(lama), run_time=1.2)
            b.main(FadeIn(atas, shift=UP * 0.16), run_time=1.8)
            b.main(FadeIn(bawah, shift=UP * 0.16), run_time=1.8)
        qc.periksa_adegan({"atas": atas, "bawah": bawah}, [("atas", "bawah")])
