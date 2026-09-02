"""Limit Materi 02, Mendekati bukan menyentuh.

STORYBOARD (ditulis lebih dulu, kode menyusul):

  1. Judul pembuka.
  2. Fungsi f(x) = x kuadrat + 1 ditulis, pertanyaannya dipasang.
  3. Dua garis bilangan muncul, x di atas dan f(x) di bawah.
  4. Didekati dari KIRI, titik merayap, tabel kiri terisi.
  5. Didekati dari KANAN, tabel kanan terisi.
  6. Kedua arah sepakat menuju 10.
  7. Ditegaskan x tidak pernah diletakkan tepat di 3.
  8. Kalimat mendekati masih longgar, jadi diuji lewat permainan tantangan.
  9. Tantangan pertama: 0,1 dijawab 0,016.
 10. Tantangan kedua: 0,001 dijawab 0,00016.
 11. Janjinya: seketat apa pun tantangannya, selalu ada jawabannya.
 12. Penutup, lambangnya belum perlu.

INTI YANG HARUS TERTANAM: limit itu JANJI yang sanggup memenuhi tantangan
seketat apa pun. Babak 8 sampai 11 adalah epsilon-delta tanpa lambangnya, dan
di situlah kata "mendekati" berhenti jadi kalimat longgar.

Angka tantangannya sudah diperiksa sympy: delta 0,016 memberi selisih terburuk
0,0963 di bawah target 0,1; delta 0,00016 memberi 0,00096 di bawah 0,001.

WARNA: merah = x dan arah datangnya · biru = f(x) · ungu = titik tujuan.
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
TOPIK = "limit2-mendekati"
DURASI: dict[str, float] = json.loads(
    (AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8")
)["segmen"]

# --- ZONA TETAP (bingkai 14,22 x 8; batas aman x +-6,91  y +-3,80) ---
X0, X1 = -6.10, 2.10          # ujung kiri dan kanan kedua garis bilangan
Y_X = 1.55                    # garis bilangan untuk x
Y_F = -0.85                   # garis bilangan untuk f(x)
X_KANAN = 4.55                # kolom keterangan
LEBAR_KANAN = 4.20

C = 3.0
L = 10.0
X_MIN, X_MAX = 2.40, 3.60
F_MIN, F_MAX = 6.76, 13.96


def f(x):
    return x * x + 1


class MendekatiBukanMenyentuh(Scene):
    tema = "terang"

    # ==================================================================
    def construct(self):
        self.t = Tema(self.tema)
        self.t.pasang(self)
        self.siapkan_garis()

        self.b01_sapa()
        self.b02_fungsi()
        self.b03_kiri()
        self.b04_kanan()
        self.b05_sepakat()
        self.b06_tekan()
        self.b07_longgar()
        self.b08_tantang1()
        self.b09_tantang2()
        self.b10_janji()
        self.b11_beda()
        self.b12_tutup()

    # ==================================================================
    def peta_x(self, x):
        return X0 + (x - X_MIN) / (X_MAX - X_MIN) * (X1 - X0)

    def peta_f(self, v):
        return X0 + (v - F_MIN) / (F_MAX - F_MIN) * (X1 - X0)

    def siapkan_garis(self):
        t = self.t
        self.garis_x = Line([X0, Y_X, 0], [X1, Y_X, 0], color=t.redup, stroke_width=2)
        self.garis_f = Line([X0, Y_F, 0], [X1, Y_F, 0], color=t.redup, stroke_width=2)
        self.nama_x = MathTex("x", color=t.tinta, font_size=30).next_to(
            self.garis_x, LEFT, buff=0.22)
        self.nama_f = MathTex("f(x)", color=t.tinta, font_size=28).next_to(
            self.garis_f, LEFT, buff=0.22)

        def tanda(peta, y, nilai, teks):
            tik = Line([peta(nilai), y - 0.13, 0], [peta(nilai), y + 0.13, 0],
                       color=t.redup, stroke_width=1.6)
            lab = MathTex(teks, color=t.redup, font_size=20).next_to(tik, DOWN, buff=0.10)
            return VGroup(tik, lab)

        self.skala_x = VGroup(*[
            tanda(self.peta_x, Y_X, v, s) for v, s in
            ((2.4, "2{,}4"), (2.7, "2{,}7"), (3.0, "3"), (3.3, "3{,}3"), (3.6, "3{,}6"))
        ])
        self.skala_f = VGroup(*[
            tanda(self.peta_f, Y_F, v, s) for v, s in
            ((7, "7"), (9, "9"), (10, "10"), (11, "11"), (13, "13"))
        ])

        # titik tujuan digambar BOLONG, sebab x tidak pernah diletakkan di situ
        self.tuju_x = Circle(radius=0.13, color=t.sorot, stroke_width=3.5,
                             fill_color=t.latar, fill_opacity=1.0
                             ).move_to([self.peta_x(C), Y_X, 0]).set_z_index(6)
        self.tuju_f = Circle(radius=0.13, color=t.sorot, stroke_width=3.5,
                             fill_color=t.latar, fill_opacity=1.0
                             ).move_to([self.peta_f(L), Y_F, 0]).set_z_index(6)
        self.lab_c = MathTex("c = 3", color=t.sorot, font_size=26).next_to(
            self.tuju_x, UP, buff=0.18)
        self.lab_l = MathTex("L = 10", color=t.sorot, font_size=26).move_to(
            [self.peta_f(L), Y_F - 0.78, 0])

        self.papan = VGroup(self.garis_x, self.garis_f, self.nama_x, self.nama_f,
                            self.skala_x, self.skala_f)

    def titik_pasangan(self, x, warna):
        """Satu titik di garis x dan pasangannya di garis f(x), plus penghubung."""
        t = self.t
        a = Dot([self.peta_x(x), Y_X, 0], color=warna, radius=0.085).set_z_index(4)
        b = Dot([self.peta_f(f(x)), Y_F, 0], color=warna, radius=0.085).set_z_index(4)
        garis = DashedLine(a.get_center(), b.get_center(), color=warna,
                           stroke_width=1.8, dash_length=0.10).set_stroke(opacity=0.6)
        return VGroup(a, b, garis)

    def baris(self, i, kiri, kanan, warna):
        t = self.t
        y = 2.85 - i * 0.60
        a = MathTex(kiri, color=t.tinta, font_size=25).move_to(
            [X_KANAN - 1.20, y, 0])
        b = MathTex(kanan, color=warna, font_size=25).move_to(
            [X_KANAN + 1.15, y, 0])
        return VGroup(a, b)

    # ==================================================================
    def b01_sapa(self):
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Mendekati, bukan menyentuh", self.t,
                                 lama=DURASI["sapa"] * 0.80)
            b.catat(DURASI["sapa"] * 0.80)

    def b02_fungsi(self):
        t = self.t
        self.rumus = MathTex(r"f(x) = x^2 + 1", color=t.tinta, font_size=40)
        self.rumus.move_to([0, 3.20, 0])
        with sinema.babak(self, "fungsi", DURASI) as b:
            b.main(Write(self.rumus), run_time=2.0)
            b.main(Create(self.garis_x), Create(self.garis_f),
                   FadeIn(self.nama_x), FadeIn(self.nama_f), run_time=1.8)
            b.main(FadeIn(self.skala_x), FadeIn(self.skala_f), run_time=1.4)
            b.main(FadeIn(self.tuju_x), FadeIn(self.tuju_f),
                   FadeIn(self.lab_c), FadeIn(self.lab_l), run_time=1.5)
        qc.periksa_adegan({"papan": self.papan, "rumus": self.rumus},
                          [("papan", "rumus")])

    def b03_kiri(self):
        t = self.t
        self.t1 = self.titik_pasangan(2.90, t.aksen)
        self.t2 = self.titik_pasangan(2.99, t.aksen)
        self.r1 = self.baris(0, r"x = 2{,}9", r"9{,}41", t.aksen)
        self.r2 = self.baris(1, r"x = 2{,}99", r"9{,}94", t.aksen)
        with sinema.babak(self, "kiri", DURASI) as b:
            b.main(FadeIn(self.t1), FadeIn(self.r1, shift=LEFT * 0.16), run_time=2.4)
            b.main(FadeOut(self.t1), FadeIn(self.t2),
                   FadeIn(self.r2, shift=LEFT * 0.16), run_time=2.4)
            b.jeda(1.4)
        self.tabel = VGroup(self.r1, self.r2)
        qc.periksa_adegan({"papan": self.papan, "tabel": self.tabel},
                          [("papan", "tabel")])

    def b04_kanan(self):
        t = self.t
        self.t3 = self.titik_pasangan(3.10, t.aksen2)
        self.t4 = self.titik_pasangan(3.01, t.aksen2)
        self.r3 = self.baris(2, r"x = 3{,}1", r"10{,}61", t.aksen2)
        self.r4 = self.baris(3, r"x = 3{,}01", r"10{,}06", t.aksen2)
        with sinema.babak(self, "kanan", DURASI) as b:
            b.main(FadeIn(self.t3), FadeIn(self.r3, shift=LEFT * 0.16), run_time=2.2)
            b.main(FadeOut(self.t3), FadeIn(self.t4),
                   FadeIn(self.r4, shift=LEFT * 0.16), run_time=2.2)
            b.jeda(1.4)
        self.tabel.add(self.r3, self.r4)
        qc.periksa_adegan({"papan": self.papan, "tabel": self.tabel},
                          [("papan", "tabel")])

    def b05_sepakat(self):
        t = self.t
        pesan = Text("kedua arah menuju angka yang sama", font_size=25, color=t.sorot)
        sinema.batasi_lebar(pesan, LEBAR_KANAN)
        pesan.move_to([X_KANAN, 0.20, 0])
        hasil = MathTex(r"\lim_{x \to 3} f(x) = 10", color=t.sorot, font_size=36)
        hasil.move_to([X_KANAN, -0.60, 0])
        self.blok_hasil = VGroup(pesan, hasil)
        with sinema.babak(self, "sepakat", DURASI) as b:
            b.main(Indicate(self.tuju_f, scale_factor=1.25, color=t.sorot), run_time=1.6)
            b.main(FadeIn(pesan, shift=UP * 0.12), run_time=1.6)
            b.main(Write(hasil), run_time=2.2)
            b.jeda(1.4)
        qc.periksa_adegan({"papan": self.papan, "tabel": self.tabel,
                           "hasil": self.blok_hasil},
                          [("tabel", "hasil"), ("papan", "hasil")])

    def b06_tekan(self):
        t = self.t
        tekan = Text("x TIDAK PERNAH diletakkan tepat di 3", font_size=25, color=t.aksen)
        sinema.batasi_lebar(tekan, LEBAR_KANAN)
        tekan.move_to([X_KANAN, -1.55, 0])
        self.tekan = tekan
        with sinema.babak(self, "tekan", DURASI) as b:
            b.main(Indicate(self.tuju_x, scale_factor=1.3, color=t.aksen), run_time=1.8)
            b.main(FadeIn(tekan, shift=UP * 0.12), run_time=1.8)
            b.jeda(1.6)
        qc.periksa_adegan({"papan": self.papan, "tekan": tekan,
                           "hasil": self.blok_hasil}, [("hasil", "tekan")])

    def b07_longgar(self):
        t = self.t
        judul = Text("Permainan tantangan", font_size=30, color=t.sorot)
        sinema.batasi_lebar(judul, LEBAR_KANAN)
        judul.move_to([X_KANAN, 2.85, 0])
        self.judul_main = judul
        with sinema.babak(self, "longgar", DURASI) as b:
            # blok hasil IKUT dibuang. Permainan tantangan adalah bagian baru
            # yang memakai seluruh kolom kanan; membiarkan kalimat lama di situ
            # membuat teks tantangan menabraknya, dan itu terlihat di render uji.
            b.main(FadeOut(self.tabel), FadeOut(self.tekan), FadeOut(self.blok_hasil),
                   FadeOut(self.t2), FadeOut(self.t4), run_time=1.0)
            b.main(FadeIn(judul, shift=UP * 0.12), run_time=1.8)
            b.jeda(1.4)
        qc.periksa_adegan({"papan": self.papan, "judul": judul})

    def tantangan(self, nama, i, target, jawab, x_kiri, x_kanan):
        """Satu putaran tantangan: pita di garis f(x), lalu pita di garis x."""
        t = self.t
        y = 1.85 - i * 1.15
        minta = MathTex(rf"\text{{minta }} |f(x) - 10| < {target}",
                        color=t.aksen2, font_size=25).move_to([X_KANAN, y, 0])
        beri = MathTex(rf"\text{{pakai }} |x - 3| < {jawab}",
                       color=t.aksen, font_size=25).move_to([X_KANAN, y - 0.52, 0])
        # Lebar minimum 0,14 satuan. Pada tantangan kedua pita yang sebenarnya
        # cuma 0,002 satuan layar, jadi kalau digambar apa adanya ia lenyap dan
        # penonton mengira tidak terjadi apa-apa. Keterbatasan gambar ini
        # DISEBUTKAN terus terang di layar, bukan disembunyikan.
        MIN = 0.14
        lebar_f = max(abs(self.peta_f(f(x_kanan)) - self.peta_f(f(x_kiri))), MIN)
        lebar_x = max(abs(self.peta_x(x_kanan) - self.peta_x(x_kiri)), MIN)
        pita_f = Rectangle(width=lebar_f, height=0.46, color=t.aksen2,
                           fill_opacity=0.30, stroke_width=1.5).set_z_index(3)
        pita_f.move_to([self.peta_f(L), Y_F, 0])
        pita_x = Rectangle(width=lebar_x, height=0.46, color=t.aksen,
                           fill_opacity=0.30, stroke_width=1.5).set_z_index(3)
        pita_x.move_to([self.peta_x(C), Y_X, 0])
        with sinema.babak(self, nama, DURASI) as b:
            b.main(FadeIn(minta, shift=UP * 0.10), FadeIn(pita_f), run_time=2.4)
            b.main(FadeIn(beri, shift=UP * 0.10), FadeIn(pita_x), run_time=2.4)
            b.jeda(1.4)
        # dikembalikan TERPISAH: [0] teksnya, [1] pitanya. Pemeriksaan tindihan
        # hanya berlaku untuk teks, sebab kedua pita MEMANG harus bertumpuk,
        # itulah gambaran tantangan yang makin ketat.
        return VGroup(VGroup(minta, beri), VGroup(pita_f, pita_x))

    def b08_tantang1(self):
        self.p1 = self.tantangan("tantang1", 0, "0{,}1", "0{,}016", 2.984, 3.016)
        qc.periksa_adegan({"papan": self.papan, "teks1": self.p1[0],
                           "judul": self.judul_main}, [("judul", "teks1")])

    def b09_tantang2(self):
        self.p2 = self.tantangan("tantang2", 1, "0{,}001", "0{,}00016", 2.9998, 3.0002)
        t = self.t
        jujur = Text("pita kedua digambar lebih lebar dari sebenarnya,\n"
                     "aslinya terlalu tipis untuk terlihat mata",
                     font_size=20, color=t.redup, line_spacing=0.9)
        sinema.batasi_lebar(jujur, LEBAR_KANAN)
        jujur.move_to([X_KANAN, -2.95, 0])
        self.jujur = jujur
        self.add(jujur)
        qc.periksa_adegan({"papan": self.papan, "teks1": self.p1[0],
                           "teks2": self.p2[0], "jujur": jujur},
                          [("teks1", "teks2"), ("teks2", "jujur")])

    def b10_janji(self):
        t = self.t
        janji = Text("berapa pun ketatnya tantangan Anda,\n"
                     "SELALU ada jawabannya",
                     font_size=27, color=t.sorot, line_spacing=0.9)
        sinema.batasi_lebar(janji, LEBAR_KANAN)
        janji.move_to([X_KANAN, -1.15, 0])
        self.janji = janji
        with sinema.babak(self, "janji", DURASI) as b:
            b.main(FadeIn(janji, shift=UP * 0.14), run_time=2.2)
            b.jeda(2.0)
        # teksnya saja yang diperiksa, bukan seluruh kelompok: kelompok p2 juga
        # memuat pita di garis bilangan yang letaknya jauh di kiri, sehingga
        # kotak batasnya melebar melintasi layar dan selalu dianggap menindih
        qc.periksa_adegan({"papan": self.papan, "janji": janji,
                           "teks2": self.p2[0]}, [("teks2", "janji")])

    def b11_beda(self):
        t = self.t
        beda = Text("kalau hanya kebetulan dekat, cepat atau lambat\n"
                    "ada tantangan yang tidak bisa dipenuhi",
                    font_size=22, color=t.redup, line_spacing=0.9)
        sinema.batasi_lebar(beda, LEBAR_KANAN)
        beda.move_to([X_KANAN, -2.25, 0])
        self.beda = beda
        with sinema.babak(self, "beda", DURASI) as b:
            b.main(FadeIn(beda, shift=UP * 0.12), run_time=2.2)
            b.jeda(2.0)
        qc.periksa_adegan({"papan": self.papan, "beda": beda, "janji": self.janji},
                          [("janji", "beda")])

    def b12_tutup(self):
        t = self.t
        tutup = Text("limit itu janji yang sanggup memenuhi\n"
                     "tantangan seketat apa pun",
                     font_size=27, color=t.sorot, line_spacing=0.9)
        sinema.batasi_lebar(tutup, LEBAR_KANAN)
        tutup.move_to([X_KANAN, 0.35, 0])
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(self.p1), FadeOut(self.p2), FadeOut(self.janji),
                   FadeOut(self.beda), FadeOut(self.jujur), run_time=1.0)
            b.main(FadeIn(tutup, shift=UP * 0.14), run_time=2.4)
            b.jeda(2.4)
        qc.periksa_adegan({"papan": self.papan, "tutup": tutup},
                          [("papan", "tutup")])
