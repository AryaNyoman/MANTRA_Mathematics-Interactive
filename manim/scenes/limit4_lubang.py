"""Limit Materi 04, Lubang yang tidak mengubah tujuan.

STORYBOARD (ditulis lebih dulu, kode menyusul):

  1. Judul pembuka.
  2. Rumus f(x) = (x kuadrat kurang 1) dibagi (x kurang 1) ditulis di tengah.
  3. Dicoba dimasukkan x = 1, hasilnya 0 dibagi 0.
  4. Bentuk itu ditolak: dicoret, diberi keterangan tidak terdefinisi.
  5. Rumus mengecil ke kiri atas; sumbu dan garis muncul, berlubang di (1, 2).
  6. Tetangga KIRI merayap: 0,9 lalu 0,99. Tabel di kanan terisi.
  7. Tetangga KANAN merayap: 1,1 lalu 1,01. Tabel terisi penuh.
  8. Kedua arah menuju 2. Lubangnya disorot, limitnya ditulis.
  9. Alasannya: pembilang difaktorkan.
 10. Faktor (x kurang 1) dicoret, DENGAN syarat x bukan 1 ditulis mencolok.
 11. Sisanya x tambah 1, itulah kenapa grafiknya garis dan kenapa berlubang.
 12. Penutup: nilai fungsi dan limit dua hal berbeda.

INTI YANG HARUS TERTANAM: nilai fungsi TIDAK ADA, tetapi limitnya ADA.
Itu satu-satunya hal yang wajib terbawa dari video ini, dan babak 6 sampai 8
adalah tempat hal itu benar-benar terlihat. Jangan dipangkas.

SYARAT "asal x bukan 1" di babak 10 juga tidak boleh dipangkas. Tanpa itu,
pencoretan terlihat seperti aturan aljabar biasa, dan siswa akan menyimpulkan
fungsi asli sama dengan garis biasa, padahal bedanya justru lubang itu.

WARNA: biru = sumbu dan tetangga kiri, merah = tetangga kanan dan penolakan,
tinta = kurva dan rumus, ungu = lubang dan kesimpulan.
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
TOPIK = "limit4-lubang"
DURASI: dict[str, float] = json.loads(
    (AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8")
)["segmen"]

# --- ZONA TETAP (bingkai 14,22 x 8; batas aman x +-6,91  y +-3,80) ---
PUSAT_GRAFIK = np.array([-3.55, -0.55, 0.0])
X_KANAN = 3.15                 # kolom kanan: tabel, lalu penurunan rumus
Y_BARIS = [1.95, 1.30, 0.65, 0.00, -0.65]
Y_RUMUS_ATAS = 3.20

LUBANG_X = 1.0
LUBANG_Y = 2.0


class LubangDiGrafik(Scene):
    tema = "terang"

    # ==================================================================
    def construct(self):
        self.t = Tema(self.tema)
        self.t.pasang(self)
        self.siapkan_grafik()

        self.b01_sapa()
        self.b02_fungsi()
        self.b03_coba()
        self.b04_tolak()
        self.b05_gambar()
        self.b06_kiri()
        self.b07_kanan()
        self.b08_sepakat()
        self.b09_kenapa()
        self.b10_coret()
        self.b11_sisa()
        self.b12_tutup()

    # ==================================================================
    def siapkan_grafik(self):
        """Sumbu, garis, dan lubangnya. Dibuat sekali, dipakai sejak babak 5."""
        t = self.t
        self.sumbu = Axes(
            x_range=[-0.3, 2.7, 1],
            y_range=[-0.3, 3.7, 1],
            x_length=5.0,
            y_length=4.6,
            axis_config={"color": t.redup, "stroke_width": 3,
                         "include_ticks": True, "tip_length": 0.18},
            tips=True,
        ).move_to(PUSAT_GRAFIK)
        self.label_sumbu = VGroup(
            MathTex("x", color=t.redup, font_size=26).next_to(
                self.sumbu.x_axis.get_end(), DR, buff=0.14),
            MathTex("y", color=t.redup, font_size=26).next_to(
                self.sumbu.y_axis.get_end(), UL, buff=0.14),
        )
        # Garisnya digambar sebagai satu ruas, bukan lewat pencuplikan titik.
        # Lubang selebar satu titik tidak akan pernah tertangkap pencuplikan,
        # padahal justru lubang itulah isi videonya.
        self.garis = Line(
            self.sumbu.c2p(-0.3, 0.7), self.sumbu.c2p(2.7, 3.7),
            color=t.tinta, stroke_width=6,
        )
        self.titik_lubang = self.sumbu.c2p(LUBANG_X, LUBANG_Y)
        # z_index dinaikkan supaya lubang selalu di ATAS titik yang merayap.
        # Pada render uji pertama titik biru menutupi lubangnya, padahal justru
        # lubang itu inti videonya.
        self.lubang = Circle(radius=0.14, color=t.sorot, stroke_width=5,
                             fill_color=t.latar, fill_opacity=1.0
                             ).move_to(self.titik_lubang).set_z_index(10)
        self.bantu = VGroup(
            DashedLine(self.sumbu.c2p(LUBANG_X, 0), self.titik_lubang,
                       color=t.aksen2, stroke_width=2.5, dash_length=0.12),
            DashedLine(self.sumbu.c2p(0, LUBANG_Y), self.titik_lubang,
                       color=t.aksen, stroke_width=2.5, dash_length=0.12),
        )
        self.papan = VGroup(self.sumbu, self.label_sumbu, self.garis)

    def pecahan(self, atas, bawah, ukuran=38, warna=None):
        """Pecahan yang pembilang dan penyebutnya bisa dipegang sendiri-sendiri.

        Dibangun manual, BUKAN dengan \frac, karena coretan pembatalan harus
        mendarat TEPAT pada faktornya. Dengan \frac seluruh pecahan menjadi
        satu gumpalan glif sehingga letak coretan cuma bisa ditebak, dan pada
        render uji pertama tebakan itu meleset: kedua coretan menumpuk di garis
        bagi, bukan di faktor yang dicoret.
        """
        t = self.t
        warna = warna or t.tinta
        a = VGroup(*[MathTex(s, color=warna, font_size=ukuran) for s in atas])
        a.arrange(RIGHT, buff=0.05)
        b = VGroup(*[MathTex(s, color=warna, font_size=ukuran) for s in bawah])
        b.arrange(RIGHT, buff=0.05)
        lebar = max(a.width, b.width) + 0.22
        garis = Line(LEFT * lebar / 2, RIGHT * lebar / 2, color=warna, stroke_width=3)
        a.next_to(garis, UP, buff=0.13)
        b.next_to(garis, DOWN, buff=0.13)
        g = VGroup(a, garis, b)
        g.atas, g.garis, g.bawah = a, garis, b
        return g

    def coret_faktor(self, mob):
        """Satu garis miring bersih melintasi satu faktor, dari kiri bawah."""
        return Line(mob.get_corner(DL) + LEFT * 0.06 + DOWN * 0.04,
                    mob.get_corner(UR) + RIGHT * 0.06 + UP * 0.04,
                    color=self.t.aksen, stroke_width=5)

    def baris_tabel(self, i, kiri, kanan, warna):
        """Satu baris tabel nilai di kolom kanan, dua kolom rata."""
        t = self.t
        a = MathTex(kiri, color=t.tinta, font_size=30)
        b = MathTex(kanan, color=warna, font_size=30)
        a.move_to([X_KANAN - 1.35, Y_BARIS[i], 0])
        b.move_to([X_KANAN + 1.15, Y_BARIS[i], 0])
        return VGroup(a, b)

    # ==================================================================
    # Babak
    # ==================================================================
    def b01_sapa(self):
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Lubang yang tidak mengubah tujuan",
                                 self.t, lama=DURASI["sapa"] * 0.80)
            b.catat(DURASI["sapa"] * 0.80)

    def b02_fungsi(self):
        t = self.t
        self.rumus = MathTex(r"f(x)", r"=", r"\frac{x^2 - 1}{x - 1}",
                             color=t.tinta, font_size=52).move_to([0, 0.85, 0])
        with sinema.babak(self, "fungsi", DURASI) as b:
            b.main(Write(self.rumus), run_time=2.6)
            b.jeda(1.0)
        qc.periksa_adegan({"rumus": self.rumus})

    def b03_coba(self):
        t = self.t
        self.subs = MathTex(r"f(1)", r"=", r"\frac{1 - 1}{1 - 1}", r"=",
                            r"\frac{0}{0}", color=t.tinta, font_size=48
                            ).move_to([0, -1.15, 0])
        self.subs[4].set_color(t.aksen)
        with sinema.babak(self, "coba", DURASI) as b:
            b.main(TransformFromCopy(self.rumus[2], self.subs[2]), run_time=2.0)
            b.main(FadeIn(self.subs[0]), FadeIn(self.subs[1]), run_time=1.0)
            b.main(Write(self.subs[3]), Write(self.subs[4]), run_time=1.8)
            b.jeda(1.2)
        qc.periksa_adegan({"rumus": self.rumus, "subs": self.subs},
                          [("rumus", "subs")])

    def b04_tolak(self):
        t = self.t
        silang = Cross(self.subs[4], stroke_color=t.aksen, stroke_width=7,
                       scale_factor=0.72)
        self.vonis = Text("di x = 1 fungsi ini TIDAK TERDEFINISI",
                          font_size=30, color=t.aksen)
        sinema.batasi_lebar(self.vonis, 8.0)
        self.vonis.move_to([0, -2.55, 0])
        bukan = Text("bukan bernilai nol, bukan bernilai tak hingga",
                     font_size=24, color=t.redup)
        sinema.batasi_lebar(bukan, 8.0)
        bukan.move_to([0, -3.25, 0])
        self.tolakan = VGroup(silang, self.vonis, bukan)
        with sinema.babak(self, "tolak", DURASI) as b:
            b.main(Create(silang), run_time=1.2)
            b.main(FadeIn(self.vonis, shift=UP * 0.14), run_time=1.6)
            b.main(FadeIn(bukan, shift=UP * 0.10), run_time=1.6)
            b.jeda(2.0)
        qc.periksa_adegan({"rumus": self.rumus, "subs": self.subs,
                           "tolakan": self.tolakan},
                          [("rumus", "subs")])

    def b05_gambar(self):
        t = self.t
        rumus_kecil = self.rumus.copy().scale(0.62).move_to(
            [PUSAT_GRAFIK[0], Y_RUMUS_ATAS, 0])
        with sinema.babak(self, "gambar", DURASI) as b:
            b.main(FadeOut(self.subs), FadeOut(self.tolakan), run_time=0.9)
            b.main(Transform(self.rumus, rumus_kecil), run_time=1.4)
            b.main(Create(self.sumbu), FadeIn(self.label_sumbu), run_time=1.6)
            b.main(Create(self.garis), run_time=1.6)
            b.main(FadeIn(self.lubang, scale=1.6), run_time=0.9)
        qc.periksa_adegan({"papan": self.papan, "rumus": self.rumus,
                           "lubang": self.lubang},
                          [("papan", "rumus")])

    def b06_kiri(self):
        """Tetangga kiri.

        Titiknya BERHENTI di 0,9 dan tidak dimajukan ke 0,99. Pada skala ini
        0,99 hanya berjarak 0,017 satuan layar dari lubangnya, jadi titik yang
        digambar di situ akan menutupi lubang itu, dan justru lubang itulah
        inti videonya. Kedekatan yang sesungguhnya dibawa oleh TABEL, dan
        keterbatasan gambarnya disebutkan terus terang, bukan disembunyikan.
        """
        t = self.t
        self.judul_tabel = Text("dicoba angka di sekitar 1", font_size=26,
                                color=t.redup).move_to([X_KANAN, 2.75, 0])
        self.r1 = self.baris_tabel(0, r"x = 0{,}9", r"f(x) = 1{,}9", t.aksen2)
        self.r2 = self.baris_tabel(1, r"x = 0{,}99", r"f(x) = 1{,}99", t.aksen2)
        self.r3 = self.baris_tabel(2, r"x = 1", r"\text{tidak ada}", t.aksen)
        titik1 = Dot(self.sumbu.c2p(0.4, 1.4), color=t.aksen2, radius=0.075)
        # Dua baris sebagai DUA objek teks, bukan satu string ber-newline.
        # Versi satu baris terpaksa diperkecil sampai nyaris tak terbaca oleh
        # batasi_lebar, dan itu terlihat pada render uji kedua.
        self.catatan_dekat = VGroup(
            Text("angka yang lebih dekat lagi", font_size=23, color=t.redup),
            Text("sudah terlalu rapat untuk digambar", font_size=23, color=t.redup),
        ).arrange(DOWN, buff=0.12)
        sinema.batasi_lebar(self.catatan_dekat, 5.7)
        self.catatan_dekat.move_to([X_KANAN, -1.25, 0])
        with sinema.babak(self, "kiri", DURASI) as b:
            b.main(FadeIn(self.judul_tabel), FadeIn(titik1), run_time=1.1)
            b.main(titik1.animate.move_to(self.sumbu.c2p(0.9, 1.9)),
                   FadeIn(self.r1, shift=LEFT * 0.16), run_time=2.4)
            b.main(FadeIn(self.r2, shift=LEFT * 0.16),
                   FadeIn(self.catatan_dekat), run_time=2.0)
            b.main(FadeIn(self.r3, shift=LEFT * 0.16), run_time=1.4)
            b.main(Indicate(self.r3, scale_factor=1.10, color=t.aksen), run_time=1.6)
            b.jeda(1.0)
        self.tabel = VGroup(self.judul_tabel, self.r1, self.r2, self.r3)
        self.titik_kiri = titik1
        qc.periksa_adegan({"papan": self.papan, "tabel": self.tabel,
                           "rumus": self.rumus, "catatan_dekat": self.catatan_dekat},
                          [("papan", "tabel"), ("papan", "rumus"),
                           ("tabel", "catatan_dekat")])

    def b07_kanan(self):
        """Tetangga kanan. Titiknya berhenti di 1,1, alasannya sama dengan b06."""
        t = self.t
        self.r4 = self.baris_tabel(3, r"x = 1{,}01", r"f(x) = 2{,}01", t.aksen)
        self.r5 = self.baris_tabel(4, r"x = 1{,}1", r"f(x) = 2{,}1", t.aksen)
        titik2 = Dot(self.sumbu.c2p(2.4, 3.4), color=t.aksen, radius=0.075)
        with sinema.babak(self, "kanan", DURASI) as b:
            b.main(FadeIn(titik2), run_time=0.9)
            b.main(titik2.animate.move_to(self.sumbu.c2p(1.1, 2.1)),
                   FadeIn(self.r5, shift=LEFT * 0.16), run_time=2.6)
            b.main(FadeIn(self.r4, shift=LEFT * 0.16), run_time=2.0)
            b.main(Indicate(self.catatan_dekat, scale_factor=1.06, color=t.sorot),
                   run_time=1.6)
            b.jeda(1.4)
        self.tabel.add(self.r4, self.r5)
        self.titik_kanan = titik2
        qc.periksa_adegan({"papan": self.papan, "tabel": self.tabel,
                           "rumus": self.rumus, "catatan_dekat": self.catatan_dekat},
                          [("papan", "tabel"), ("papan", "rumus"),
                           ("tabel", "catatan_dekat")])

    def b08_sepakat(self):
        t = self.t
        self.simpul = MathTex(r"\lim_{x \to 1} f(x)", r"=", r"2",
                              color=t.sorot, font_size=44).move_to([X_KANAN, -2.30, 0])
        catat = Text("titiknya kosong, tetapi tujuannya jelas",
                     font_size=24, color=t.redup)
        sinema.batasi_lebar(catat, 5.4)
        catat.move_to([X_KANAN, -3.15, 0])
        self.kesimpulan = VGroup(self.simpul, catat)
        with sinema.babak(self, "sepakat", DURASI) as b:
            b.main(FadeIn(self.bantu), run_time=1.0)
            b.main(Indicate(self.lubang, scale_factor=1.5, color=t.sorot), run_time=1.4)
            b.main(Write(self.simpul), run_time=2.2)
            b.main(FadeIn(catat, shift=UP * 0.12), run_time=1.4)
            b.jeda(1.4)
        qc.periksa_adegan({"papan": self.papan, "tabel": self.tabel,
                           "kesimpulan": self.kesimpulan,
                           "catatan_dekat": self.catatan_dekat},
                          [("papan", "kesimpulan"), ("tabel", "kesimpulan"),
                           ("catatan_dekat", "kesimpulan")])

    def b09_kenapa(self):
        t = self.t
        kiri = self.pecahan([r"x^2 - 1"], [r"x - 1"])
        sama = MathTex("=", color=t.tinta, font_size=38)
        kanan = self.pecahan([r"(x-1)", r"(x+1)"], [r"x - 1"])
        self.faktor = VGroup(kiri, sama, kanan).arrange(RIGHT, buff=0.26)
        self.faktor.move_to([X_KANAN, 1.55, 0])
        self.sisi_kanan = kanan
        with sinema.babak(self, "kenapa", DURASI) as b:
            b.main(FadeOut(self.tabel), FadeOut(self.catatan_dekat),
                   FadeOut(self.titik_kiri), FadeOut(self.titik_kanan),
                   run_time=0.9)
            b.main(Write(self.faktor), run_time=3.2)
            b.jeda(1.8)
        qc.periksa_adegan({"papan": self.papan, "faktor": self.faktor,
                           "kesimpulan": self.kesimpulan},
                          [("papan", "faktor"), ("faktor", "kesimpulan")])

    def b10_coret(self):
        t = self.t
        # Coretan mendarat TEPAT pada faktor (x-1), satu di pembilang dan satu
        # di penyebut, karena keduanya mobject tersendiri.
        coret1 = self.coret_faktor(self.sisi_kanan.atas[0])
        coret2 = self.coret_faktor(self.sisi_kanan.bawah[0])
        self.syarat = Text("boleh dicoret HANYA kalau x bukan 1",
                           font_size=27, color=t.sorot)
        sinema.batasi_lebar(self.syarat, 5.6)
        self.syarat.move_to([X_KANAN, 0.20, 0])
        sebab = Text("sebab kita sedang membaginya", font_size=23, color=t.redup)
        sinema.batasi_lebar(sebab, 5.6)
        sebab.move_to([X_KANAN, -0.45, 0])
        self.blok_syarat = VGroup(self.syarat, sebab)
        with sinema.babak(self, "coret", DURASI) as b:
            b.main(Create(coret1), run_time=0.9)
            b.main(Create(coret2), run_time=0.9)
            b.main(FadeIn(self.syarat, shift=UP * 0.12), run_time=1.8)
            b.main(FadeIn(sebab, shift=UP * 0.10), run_time=1.5)
            b.jeda(2.0)
        self.coretan = VGroup(coret1, coret2)
        qc.periksa_adegan({"papan": self.papan, "faktor": self.faktor,
                           "blok_syarat": self.blok_syarat,
                           "kesimpulan": self.kesimpulan},
                          [("papan", "faktor"), ("papan", "blok_syarat"),
                           ("faktor", "blok_syarat"),
                           ("blok_syarat", "kesimpulan")])

    def b11_sisa(self):
        t = self.t
        self.hasil = MathTex(r"= \; x + 1", r"\quad", r"\text{untuk } x \neq 1",
                             color=t.sorot, font_size=40).move_to([X_KANAN, 1.55, 0])
        self.hasil[2].set_color(t.redup)
        with sinema.babak(self, "sisa", DURASI) as b:
            b.main(FadeOut(self.faktor), FadeOut(self.coretan),
                   FadeOut(self.blok_syarat), run_time=0.9)
            b.main(Write(self.hasil), run_time=2.4)
            b.main(Indicate(self.garis, scale_factor=1.0, color=t.sorot), run_time=1.6)
            b.main(Indicate(self.lubang, scale_factor=1.5, color=t.sorot), run_time=1.4)
            b.jeda(1.6)
        qc.periksa_adegan({"papan": self.papan, "hasil": self.hasil,
                           "kesimpulan": self.kesimpulan},
                          [("papan", "hasil"), ("hasil", "kesimpulan")])

    def b12_tutup(self):
        t = self.t
        baris1 = Text("nilai fungsi dan limit adalah dua hal berbeda",
                      font_size=32, color=t.tinta)
        sinema.batasi_lebar(baris1, 5.7)
        baris1.move_to([X_KANAN, 0.30, 0])
        baris2 = Text("yang satu bisa ada tanpa yang lain",
                      font_size=27, color=t.sorot)
        sinema.batasi_lebar(baris2, 5.7)
        baris2.move_to([X_KANAN, -0.45, 0])
        penutup = VGroup(baris1, baris2)
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeIn(baris1, shift=UP * 0.14), run_time=2.0)
            b.main(FadeIn(baris2, shift=UP * 0.12), run_time=1.8)
            b.jeda(2.4)
            b.main(Indicate(self.lubang, scale_factor=1.6, color=t.sorot), run_time=1.6)
        qc.periksa_adegan({"papan": self.papan, "penutup": penutup,
                           "hasil": self.hasil, "kesimpulan": self.kesimpulan},
                          [("papan", "penutup"), ("penutup", "kesimpulan"),
                           ("penutup", "hasil")])
