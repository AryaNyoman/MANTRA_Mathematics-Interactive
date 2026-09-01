"""Limit Materi 09, Fungsi yang tidak putus.

STORYBOARD (ditulis lebih dulu, kode menyusul):

  1. Judul pembuka.
  2. Perumpamaan rel roller coaster.
  3. Tiga syarat kontinu ditulis di kolom kanan.
  4. Fungsi mulus digambar, ketiga syarat menyala hijau.
  5. Dirusak: berlubang. Syarat 1 gagal.
  6. Dirusak: titiknya digeser. HANYA syarat 3 yang gagal.
  7. Dirusak: melompat. Syarat 2 gagal.
  8. Dirusak: meledak. Syarat 1 dan 2 gagal.
  9. Ditegaskan ketiga kerusakan pertama sudah pernah ditemui.
 10. Janji Materi 05 diingatkan.
 11. Alasannya: suku banyak kontinu di mana-mana.
 12. Penutup: substitusi itu akibat kekontinuan, bukan definisi limit.

INTI YANG HARUS TERTANAM: substitusi langsung bukan definisi limit, melainkan
AKIBAT dari kekontinuan. Babak 10 sampai 12 melunasi janji yang sengaja
ditunda di Materi 05, dan itu yang menutup seluruh alur topik Limit.

Bentuk "geser satu titik" pada babak 6 tidak boleh dipangkas: tanpa itu syarat
ketiga tidak pernah gagal sendirian, sehingga siswa tidak punya kesempatan
melihat gunanya syarat ketiga.

WARNA: hijau tua = syarat lolos, bata = syarat gagal, ungu = titik yang
diperiksa, tinta = kurva.
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
TOPIK = "limit9-kontinu"
DURASI: dict[str, float] = json.loads(
    (AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8")
)["segmen"]

# --- ZONA TETAP (bingkai 14,22 x 8; batas aman x +-6,91  y +-3,80) ---
PUSAT_GRAFIK = np.array([-3.55, -0.30, 0.0])
X_KANAN = 3.35
LEBAR_KANAN = 5.60
C = 2.0

# Hijau dan bata diambil dari aksen SITUS, sengaja, sebab keduanya di sini
# berperan sebagai tanda lolos dan gagal, bukan sebagai besaran matematika.
HIJAU = "#2F5D50"
BATA = "#A6503F"


def dasar(x):
    return 0.5 * x * x - x + 3.0


class FungsiTidakPutus(Scene):
    tema = "terang"

    # ==================================================================
    def construct(self):
        self.t = Tema(self.tema)
        self.t.pasang(self)
        self.siapkan_grafik()

        self.b01_sapa()
        self.b02_rel()
        self.b03_syarat()
        self.b04_mulus()
        self.b05_lubang()
        self.b06_geser()
        self.b07_lompat()
        self.b08_asimtot()
        self.b09_kenal()
        self.b10_janji()
        self.b11_sebab()
        self.b12_tutup()

    # ==================================================================
    def siapkan_grafik(self):
        t = self.t
        self.sumbu = Axes(
            x_range=[-0.4, 4.4, 1], y_range=[-0.4, 8.4, 2],
            x_length=5.2, y_length=4.6,
            axis_config={"color": t.redup, "stroke_width": 3,
                         "include_ticks": True, "tip_length": 0.18},
            tips=True,
        ).move_to(PUSAT_GRAFIK)
        self.label_sumbu = VGroup(
            MathTex("x", color=t.redup, font_size=24).next_to(
                self.sumbu.x_axis.get_end(), DR, buff=0.12),
            MathTex("y", color=t.redup, font_size=24).next_to(
                self.sumbu.y_axis.get_end(), UL, buff=0.12),
        )
        self.bantu = DashedLine(
            self.sumbu.c2p(C, -0.35), self.sumbu.c2p(C, 8.3),
            color=t.sorot, stroke_width=1.6, dash_length=0.12).set_stroke(opacity=0.7)
        self.papan = VGroup(self.sumbu, self.label_sumbu)

    def kurva_mulus(self, x0=-0.35, x1=4.35):
        return self.sumbu.plot(dasar, x_range=[x0, x1], color=self.t.tinta,
                               stroke_width=5)

    def titik(self, x, y, warna, isi=True, r=0.10):
        t = self.t
        if isi:
            return Dot(self.sumbu.c2p(x, y), color=warna, radius=r).set_z_index(5)
        return Circle(radius=r + 0.03, color=warna, stroke_width=4,
                      fill_color=t.latar, fill_opacity=1.0
                      ).move_to(self.sumbu.c2p(x, y)).set_z_index(5)

    def buat_syarat(self):
        """Tiga baris syarat di kolom kanan, beserta lampu bulatnya."""
        t = self.t
        teks = ["1.  f(2) ada", "2.  limitnya ada", "3.  keduanya sama"]
        baris = VGroup()
        for i, s in enumerate(teks):
            y = 2.55 - i * 0.68
            lampu = Dot([X_KANAN - 2.30, y, 0], color=t.redup, radius=0.10)
            lab = Text(s, font_size=26, color=t.redup)
            lab.next_to(lampu, RIGHT, buff=0.28)
            baris.add(VGroup(lampu, lab))
        return baris

    def nyalakan(self, lolos):
        """Warnai ketiga lampu dan tulisannya sesuai lolos atau gagal."""
        aksi = []
        for i, ok in enumerate(lolos):
            warna = HIJAU if ok else BATA
            aksi.append(self.syarat[i][0].animate.set_color(warna))
            aksi.append(self.syarat[i][1].animate.set_color(warna))
        return aksi

    def ganti_gambar(self, nama, gambar_baru, lolos, keterangan, lama_ganti=1.6):
        """Satu putaran perusakan: ganti gambarnya, nyalakan lampu, beri catatan."""
        t = self.t
        cap = Text(keterangan, font_size=23, color=t.redup, line_spacing=0.9)
        sinema.batasi_lebar(cap, LEBAR_KANAN)
        cap.move_to([X_KANAN, -1.10, 0])
        with sinema.babak(self, nama, DURASI) as b:
            b.main(FadeOut(self.gambar), FadeIn(gambar_baru), run_time=lama_ganti)
            b.main(*self.nyalakan(lolos), run_time=1.4)
            if getattr(self, "cap_rusak", None) is not None:
                # Berurutan, BUKAN silang. Dua keterangan berbeda yang sama-sama
                # setengah tembus pandang di tempat yang sama jadi bubur selama
                # 1,4 detik. Terlihat di lembar kontak render uji kedua.
                b.main(FadeOut(self.cap_rusak), run_time=0.7)
                b.main(FadeIn(cap, shift=UP * 0.10), run_time=1.0)
            else:
                b.main(FadeIn(cap, shift=UP * 0.12), run_time=1.4)
            b.jeda(1.4)
        self.gambar = gambar_baru
        self.cap_rusak = cap
        qc.periksa_adegan({"papan": self.papan, "syarat": self.syarat, "cap": cap},
                          [("papan", "syarat"), ("syarat", "cap")])

    # ==================================================================
    def b01_sapa(self):
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Fungsi yang tidak putus", self.t,
                                 lama=DURASI["sapa"] * 0.80)
            b.catat(DURASI["sapa"] * 0.80)

    def b02_rel(self):
        t = self.t
        # Dua baris dimunculkan bergantian, bukan sekaligus. Kalau sekaligus,
        # layar diam sebelas detik penuh dan penonton kehilangan pegangan.
        # Baris kedua diberi warna sorot sebab di situlah inti perumpamaannya.
        baris1 = Text("rel boleh menanjak, menukik, berputar",
                      font_size=29, color=t.tinta)
        baris2 = Text("yang tidak boleh: ada potongan rel yang hilang",
                      font_size=29, color=t.sorot)
        # digabung dulu baru dikecilkan, supaya kedua baris tetap seukuran
        rel = VGroup(baris1, baris2).arrange(DOWN, buff=0.34, aligned_edge=LEFT)
        sinema.batasi_lebar(rel, 10.0)
        rel.move_to([0, 0.35, 0])
        self.rel = rel
        with sinema.babak(self, "rel", DURASI) as b:
            b.main(FadeIn(baris1, shift=UP * 0.14), run_time=1.8)
            b.jeda(2.2)
            b.main(FadeIn(baris2, shift=UP * 0.14), run_time=1.8)
            b.jeda(2.4)
        qc.periksa_adegan({"baris1": baris1, "baris2": baris2},
                          [("baris1", "baris2")])

    def b03_syarat(self):
        t = self.t
        self.syarat = self.buat_syarat()
        judul = Text("kontinu di x = 2 menuntut tiga hal sekaligus",
                     font_size=25, color=t.sorot)
        sinema.batasi_lebar(judul, LEBAR_KANAN)
        judul.move_to([X_KANAN, 3.25, 0])
        self.judul_syarat = judul
        with sinema.babak(self, "syarat", DURASI) as b:
            b.main(FadeOut(self.rel), run_time=0.8)
            b.main(FadeIn(judul), run_time=1.4)
            for s in self.syarat:
                b.main(FadeIn(s, shift=LEFT * 0.16), run_time=1.4)
            b.jeda(1.2)
        qc.periksa_adegan({"syarat": self.syarat, "judul": judul},
                          [("judul", "syarat")])

    def b04_mulus(self):
        t = self.t
        self.gambar = VGroup(self.kurva_mulus(),
                             self.titik(C, dasar(C), t.sorot))
        self.cap_rusak = None
        # Keterangan WAJIB dipecah manual jadi baris pendek. batasi_lebar hanya
        # mengecilkan objek yang kelewat lebar, jadi kalimat panjang satu baris
        # menyusut sampai hurufnya tak terbaca. Itu cacat render uji pertama.
        cap = Text("ketiganya terpenuhi.\nFungsinya kontinu di x = 2",
                   font_size=23, color=t.redup, line_spacing=0.9)
        sinema.batasi_lebar(cap, LEBAR_KANAN)
        cap.move_to([X_KANAN, -1.10, 0])
        with sinema.babak(self, "mulus", DURASI) as b:
            b.main(Create(self.sumbu), FadeIn(self.label_sumbu), run_time=1.6)
            b.main(Create(self.gambar[0]), FadeIn(self.bantu), run_time=1.8)
            b.main(FadeIn(self.gambar[1]), run_time=0.8)
            b.main(*self.nyalakan([True, True, True]), run_time=1.4)
            b.main(FadeIn(cap, shift=UP * 0.12), run_time=1.4)
            b.jeda(1.2)
        self.cap_rusak = cap
        qc.periksa_adegan({"papan": self.papan, "syarat": self.syarat, "cap": cap},
                          [("papan", "syarat"), ("syarat", "cap")])

    def b05_lubang(self):
        t = self.t
        baru = VGroup(self.kurva_mulus(),
                      self.titik(C, dasar(C), t.sorot, isi=False))
        self.ganti_gambar("lubang", baru, [False, True, False],
                          "syarat 1 gagal:\n"
                          "f(2) tidak ada.\n"
                          "Limitnya tetap 3, sebab\n"
                          "limit melihat tetangganya")

    def b06_geser(self):
        t = self.t
        baru = VGroup(self.kurva_mulus(),
                      self.titik(C, dasar(C), t.sorot, isi=False),
                      self.titik(C, 6.0, t.aksen))
        self.ganti_gambar("geser", baru, [True, True, False],
                          "HANYA syarat 3 yang gagal.\n"
                          "f(2) = 6, limitnya 3.\n"
                          "Dua-duanya ada, tapi beda")

    def b07_lompat(self):
        t = self.t
        kiri = self.sumbu.plot(dasar, x_range=[-0.35, C], color=t.tinta, stroke_width=5)
        kanan = self.sumbu.plot(lambda x: dasar(x) + 2.0, x_range=[C, 4.35],
                                color=t.tinta, stroke_width=5)
        baru = VGroup(kiri, kanan,
                      self.titik(C, dasar(C), t.tinta),
                      self.titik(C, dasar(C) + 2.0, t.tinta, isi=False))
        self.ganti_gambar("lompat", baru, [True, False, False],
                          "syarat 2 gagal.\n"
                          "Dari kiri menuju 3,\n"
                          "dari kanan menuju 5.\n"
                          "Nilainya ada, limitnya tidak")

    def b08_asimtot(self):
        t = self.t
        f = lambda x: 1.2 / ((x - C) ** 2)
        kiri = self.sumbu.plot(f, x_range=[-0.35, C - 0.40], color=t.tinta,
                               stroke_width=5)
        kanan = self.sumbu.plot(f, x_range=[C + 0.40, 4.35], color=t.tinta,
                                stroke_width=5)
        baru = VGroup(kiri, kanan)
        self.ganti_gambar("asimtot", baru, [False, False, False],
                          "syarat 1 dan 2 gagal.\n"
                          "Di x = 2 penyebutnya nol,\n"
                          "nilainya membesar tanpa batas")

    def b09_kenal(self):
        t = self.t
        kenal = Text("berlubang sudah di Materi 04\n"
                     "melompat sudah di Materi 03\n"
                     "meledak sudah di Materi 07",
                     font_size=25, color=t.sorot, line_spacing=0.95)
        sinema.batasi_lebar(kenal, LEBAR_KANAN)
        kenal.move_to([X_KANAN, -2.85, 0])
        self.kenal = kenal
        with sinema.babak(self, "kenal", DURASI) as b:
            b.main(FadeIn(kenal, shift=UP * 0.12), run_time=2.2)
            b.jeda(2.4)
        qc.periksa_adegan({"papan": self.papan, "kenal": kenal,
                           "cap": self.cap_rusak}, [("cap", "kenal")])

    def b10_janji(self):
        t = self.t
        janji = Text("janji dari Materi 05 dilunasi di sini",
                     font_size=27, color=t.sorot)
        sinema.batasi_lebar(janji, LEBAR_KANAN)
        janji.move_to([X_KANAN, 2.20, 0])
        self.janji = janji
        # Grafik dikembalikan ke parabola. Tiga babak penutup bicara tentang
        # SUKU BANYAK yang kontinu di mana-mana; kalau gambar asimtot dibiarkan
        # menempel sampai habis, layar justru membantah ucapannya selama 50
        # detik terakhir. Cacat itu terlihat di lembar kontak render uji.
        pulih = VGroup(self.kurva_mulus(), self.titik(C, dasar(C), t.sorot))
        with sinema.babak(self, "janji", DURASI) as b:
            b.main(FadeOut(self.syarat), FadeOut(self.judul_syarat),
                   FadeOut(self.cap_rusak), FadeOut(self.kenal), run_time=1.0)
            b.main(FadeOut(self.gambar), FadeIn(pulih), run_time=1.6)
            b.main(FadeIn(janji, shift=UP * 0.12), run_time=2.0)
            b.jeda(2.0)
        self.gambar = pulih
        qc.periksa_adegan({"papan": self.papan, "janji": janji})

    def b11_sebab(self):
        t = self.t
        sebab = Text("suku banyak kontinu di SEMUA titik\n"
                     "kontinu berarti limit sama dengan nilai fungsi\n"
                     "jadi memasukkan angkanya memang boleh",
                     font_size=25, color=t.tinta, line_spacing=0.95)
        sinema.batasi_lebar(sebab, LEBAR_KANAN)
        sebab.move_to([X_KANAN, 0.55, 0])
        self.sebab = sebab
        # Rumusnya ditulis supaya kata "suku banyak" punya wujud yang dilihat,
        # bukan cuma istilah. Ditaruh di bawah papan, di ruang yang memang kosong.
        rumus = MathTex(r"f(x)=\tfrac{1}{2}x^{2}-x+3", color=t.tinta, font_size=32)
        rumus.move_to([PUSAT_GRAFIK[0], -3.10, 0])
        with sinema.babak(self, "sebab", DURASI) as b:
            b.main(FadeIn(sebab, shift=UP * 0.14), run_time=2.6)
            b.main(FadeIn(rumus), run_time=1.2)
            b.jeda(2.2)
        qc.periksa_adegan({"papan": self.papan, "sebab": sebab,
                           "janji": self.janji, "rumus": rumus},
                          [("janji", "sebab"), ("papan", "rumus")])

    def b12_tutup(self):
        t = self.t
        tutup = Text("substitusi bukan definisi limit,\n"
                     "melainkan AKIBAT dari kekontinuan",
                     font_size=28, color=t.sorot, line_spacing=0.9)
        sinema.batasi_lebar(tutup, LEBAR_KANAN)
        tutup.move_to([X_KANAN, -1.75, 0])
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeIn(tutup, shift=UP * 0.14), run_time=2.4)
            b.jeda(2.4)
        qc.periksa_adegan({"papan": self.papan, "tutup": tutup, "sebab": self.sebab},
                          [("sebab", "tutup"), ("papan", "tutup")])
