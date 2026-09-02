"""Grafik Fungsi Tahap 06, Geser, cermin, regang.

STORYBOARD (ditulis lebih dulu, kode menyusul):

  1. Judul pembuka, berupa pertanyaan: apakah ini sifat khusus parabola?
  2. Bidang koordinat dan parabola y = x kuadrat, diberi nama f.
  3. f(x) + 1: seluruh grafik naik, bentuknya utuh. Bekas aslinya membayang.
  4. f(x - 1) ditulis, LALU DIAM. Penonton diberi waktu menebak arahnya.
  5. Jawabannya ke kanan, walaupun tandanya minus.
  6. Alasannya: isi kurung nol saat x = 1, jadi titik terendahnya pindah ke sana.
  7. Fungsi dasar diganti akar x, dua perlakuan yang sama dikenakan lagi.
  8. Diganti sekali lagi jadi kurva sinus, dan perpindahannya tetap sama.
  9. f(2x) ditulis, LALU DIAM lagi. Menebak dulu, ini jebakan utamanya.
 10. Jawabannya setengah, bukan dua kali. Titik (2, 4) pindah ke (1, 4).
 11. Alasannya: x sudah dikalikan dua SEBELUM masuk mesin.
 12. Penutup: dua kalimat aturannya, kata per kata seperti di halaman.

INTI YANG HARUS TERTANAM: angka di luar kurung mengerjakan apa yang tertulis,
angka di dalam kurung mengerjakan kebalikannya. Babak 4 dan 9 sengaja BERHENTI
sebelum menjawab, sebab dua kekeliruan terbesar topik ini (arah geser dan arah
regang) hanya menempel kalau penonton sempat menebak salah lebih dulu.

KENAPA TIGA FUNGSI DASAR, BUKAN SATU
Kalau cuma parabola yang dipakai, aturannya terlihat seperti sifat parabola.
Justru itu yang mau dibantah. Karena itu perlakuan yang sama persis dikenakan
ke tiga bentuk yang jelas berbeda, dan penonton melihat perpindahannya sama.

KENAPA SINUSNYA 2 sin x, BUKAN sin x
Bidangnya setinggi 7,6 satuan supaya parabola muat. Pada bidang setinggi itu,
sin x beramplitudo 1 tampil sebagai riak setinggi 0,6 satuan layar, terlalu
tipis untuk memperlihatkan pergeseran. Amplitudonya dinaikkan menjadi 2 dan
labelnya ditulis apa adanya, `f(x) = 2 sin x`. Yang diajarkan pergeserannya,
bukan amplitudonya, jadi tidak ada yang hilang.

Kurva sinus di sini HANYA DIPINJAM sebagai contoh. Pembentukannya milik topik
Trigonometri tahap 8, dan narasinya menyebutkan itu.

WARNA: tinta = kurva sekarang, redup = bekas bentuk sebelumnya, aksen = yang
di luar kurung, aksen2 = yang di dalam kurung, sorot = kesimpulan.
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
TOPIK = "grafik6-transformasi"
DURASI: dict[str, float] = json.loads(
    (AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8")
)["segmen"]

# --- ZONA TETAP (bingkai 14,22 x 8; batas aman x +-6,91  y +-3,80) ---
PUSAT_BIDANG = np.array([-2.55, -0.15, 0.0])
X_PANEL = 3.95          # tengah panel kanan
LEBAR_PANEL = 5.20      # panel 1,35 sampai 6,55, masih di dalam batas aman

X_MIN, X_MAX = -3.4, 4.6
Y_MIN, Y_MAX = -2.6, 5.0


def parabola(x):
    return x * x


def akar(x):
    return np.sqrt(np.clip(x, 0.0, None))


def sinus(x):
    return 2.0 * np.sin(x)


# Tiap fungsi dasar: rumusnya, jangkauan x yang digambar, dan geseran ke kanan
# yang dipakai. Jangkauannya dipilih supaya kurvanya tidak menabrak tepi atas
# bidang, sebab kurva yang terpotong di tepi terlihat seperti kurva yang habis.
DASAR = {
    "parabola": {"f": parabola, "rumus": r"f(x) = x^{2}", "dari": -2.15, "sampai": 2.15},
    "akar": {"f": akar, "rumus": r"f(x) = \sqrt{x}", "dari": 0.0, "sampai": 4.4},
    "sinus": {"f": sinus, "rumus": r"f(x) = 2\sin x", "dari": -3.2, "sampai": 4.4},
}


class GeserCerminRegang(Scene):
    tema = "terang"

    # ==================================================================
    def construct(self):
        self.t = Tema(self.tema)
        self.t.pasang(self)

        self.bidang = None
        self.kurva = None
        self.bayang = None
        self.panel = None

        self.b01_sapa()
        self.b02_parabola()
        self.b03_geseratas()
        self.b04_tanya()
        self.b05_jawab()
        self.b06_kenapa()
        self.b07_akar()
        self.b08_sinus()
        self.b09_mampat()
        self.b10_setengah()
        self.b11_kenapamampat()
        self.b12_tutup()

    # ------------------------------------------------------------------
    # Alat bantu
    # ------------------------------------------------------------------
    def buat_bidang(self) -> Axes:
        """Bidang koordinat, dengan angka HANYA di sumbu x.

        Render uji pertama memakai angka di kedua sumbu, ukuran 20, warna
        redup. Pada lembar kontak 480p angka-angka itu tinggal bayangan yang
        tidak terbaca sama sekali: angka yang tidak terbaca bukan keterangan,
        cuma hiasan yang mengotori bidang.

        Sekarang angkanya lebih besar, berwarna tinta, dan hanya di sumbu x.
        Sumbu y sengaja dikosongkan karena seluruh video ini bicara tentang
        perpindahan MENDATAR, jadi angka tegaknya tidak pernah dibutuhkan.
        """
        sumbu = Axes(
            x_range=[X_MIN, X_MAX, 1],
            y_range=[Y_MIN, Y_MAX, 1],
            x_length=7.0,
            y_length=4.55,
            tips=False,
            axis_config={"color": self.t.redup, "stroke_width": 2},
            x_axis_config={
                "include_numbers": True,
                "numbers_to_include": [-3, -2, -1, 1, 2, 3, 4],
                "font_size": 26,
                "decimal_number_config": {"num_decimal_places": 0},
            },
        )
        sumbu.get_x_axis().numbers.set_color(self.t.tinta)
        sumbu.move_to(PUSAT_BIDANG)
        return sumbu

    def ganti_panel(self, b, panel_baru, lama: float = 1.2) -> None:
        """Tukar panel rumus BERURUTAN, jangan pernah di-morph.

        `ReplacementTransform` antara dua MathTex yang jumlah lambangnya
        berbeda menghasilkan coretan tak terbaca selama seluruh animasinya.
        Cacat itu sudah tercatat di PROGRESS.md untuk video Limit materi 06,
        dan MUNCUL LAGI di render uji pertama video ini: pada detik 70 baris
        `y = f(x - 1) + 1` tampil sebagai tulisan kembar yang buram.

        Keluar dulu, baru masuk. Lebih lama sedikit, tetapi tiap detiknya
        terbaca.
        """
        b.main(FadeOut(self.panel, shift=UP * 0.12), run_time=lama * 0.42)
        b.main(FadeIn(panel_baru, shift=DOWN * 0.12), run_time=lama * 0.58)
        self.panel = panel_baru

    def gambar(self, f, dari, sampai, warna, tebal=4.0):
        """Kurva satu fungsi pada jangkauan x tertentu, dipotong di tepi atas.

        Nilai di luar jendela dijepit, BUKAN dibiarkan, supaya kurva tidak
        melompat keluar bidang dan menimpa panel di sebelahnya.
        """
        return self.bidang.plot(
            lambda x: float(np.clip(f(x), Y_MIN + 0.05, Y_MAX - 0.05)),
            x_range=[dari, sampai, 0.02],
            color=warna,
            stroke_width=tebal,
        )

    def panel_rumus(self, potongan: list[str], warna_akhir=None) -> VGroup:
        """Tumpukan rumus di panel kanan, baris terakhir boleh diberi warna."""
        baris = VGroup(*[
            MathTex(p, color=self.t.tinta, font_size=38) for p in potongan
        ]).arrange(DOWN, buff=0.42, aligned_edge=LEFT)
        if warna_akhir is not None:
            baris[-1].set_color(warna_akhir)
        sinema.batasi_lebar(baris, LEBAR_PANEL)
        baris.move_to([X_PANEL, 1.55, 0])
        return baris

    def periksa(self, extra: dict | None = None):
        zona = {"bidang": self.bidang, "kurva": self.kurva, "panel": self.panel}
        zona.update(extra or {})
        zona = {k: v for k, v in zona.items() if v is not None}
        qc.periksa_adegan(zona, pasangan=[("bidang", "panel"), ("kurva", "panel")])

    # ==================================================================
    def b01_sapa(self):
        with sinema.babak(self, "sapa", DURASI) as b:
            lama = b.lama * 0.80
            sinema.judul_pembuka(
                self,
                "Satu angka digeser,\nseluruh grafik ikut pindah.\nCuma parabola?",
                self.t, lama, ukuran=46,
            )
            b.catat(lama)

    # ==================================================================
    def b02_parabola(self):
        d = DASAR["parabola"]
        self.bidang = self.buat_bidang()
        self.kurva = self.gambar(d["f"], d["dari"], d["sampai"], self.t.tinta)
        self.panel = self.panel_rumus([d["rumus"]])

        with sinema.babak(self, "parabola", DURASI) as b:
            b.main(Create(self.bidang), run_time=1.4)
            b.main(Create(self.kurva), run_time=1.6)
            b.main(Write(self.panel), run_time=1.2)
            self.periksa()
            sinema.keterangan(self, "namanya kita singkat f saja", self.t)
            b.catat(0.6)

    # ==================================================================
    def b03_geseratas(self):
        d = DASAR["parabola"]
        self.bayang = self.gambar(d["f"], d["dari"], d["sampai"], self.t.redup, 2.5)
        self.bayang.set_stroke(opacity=0.55)

        baru = self.gambar(
            lambda x: d["f"](x) + 1.0, d["dari"], d["sampai"], self.t.tinta,
        )
        panel_baru = self.panel_rumus([d["rumus"], r"y = f(x) + 1"], self.t.aksen)

        with sinema.babak(self, "geseratas", DURASI) as b:
            self.add(self.bayang)
            sinema.keterangan(
                self, "di LUAR kurung: naik satu, bentuknya utuh",
                self.t, warna=self.t.aksen,
            )
            b.catat(0.6)
            self.ganti_panel(b, panel_baru)
            b.main(ReplacementTransform(self.kurva, baru), run_time=1.8)
            self.kurva = baru
            self.periksa({"bayang": self.bayang})
            b.jeda(1.0)

    # ==================================================================
    def b04_tanya(self):
        """Menulis f(x - 1) lalu BERHENTI. Penonton menebak dulu."""
        d = DASAR["parabola"]
        panel_baru = self.panel_rumus(
            [d["rumus"], r"y = f(x - 1)"], self.t.aksen2,
        )
        tanda = Text("ke kiri, atau ke kanan?", font_size=27, color=self.t.aksen2)
        sinema.batasi_lebar(tanda, LEBAR_PANEL)
        tanda.next_to(panel_baru, DOWN, buff=0.7)

        with sinema.babak(self, "tanya", DURASI) as b:
            sinema.keterangan(self, "tebak dulu sebelum dijawab", self.t)
            b.catat(0.6)
            self.ganti_panel(b, panel_baru)
            b.main(FadeIn(tanda, shift=UP * 0.2), run_time=0.8)
            self.periksa({"tanda": tanda, "bayang": self.bayang})
            b.jeda(1.6)
        self.tanda_tebak = tanda

    # ==================================================================
    def b05_jawab(self):
        d = DASAR["parabola"]
        # Bekasnya diganti: yang membayang sekarang bentuk SEBELUM digeser
        # mendatar, yaitu f(x) + 1, bukan f(x) asli. Kalau tidak diganti,
        # bayangannya menceritakan babak yang sudah lewat.
        bayang_baru = self.gambar(
            lambda x: d["f"](x) + 1.0, d["dari"], d["sampai"], self.t.redup, 2.5,
        )
        bayang_baru.set_stroke(opacity=0.55)

        geser = self.gambar(
            lambda x: d["f"](x - 1.0) + 1.0, d["dari"] + 1.0, d["sampai"] + 1.0,
            self.t.tinta,
        )

        with sinema.babak(self, "jawab", DURASI) as b:
            sinema.keterangan(
                self, "tandanya minus, pindahnya ke KANAN",
                self.t, warna=self.t.aksen2,
            )
            b.catat(0.6)
            b.main(FadeOut(self.tanda_tebak), run_time=0.5)
            b.main(
                ReplacementTransform(self.bayang, bayang_baru),
                ReplacementTransform(self.kurva, geser),
                run_time=2.0,
            )
            self.bayang, self.kurva = bayang_baru, geser
            self.periksa({"bayang": self.bayang})
            b.jeda(1.0)

    # ==================================================================
    def b06_kenapa(self):
        """Kenapa ke kanan: isi kurungnya nol saat x = 1."""
        d = DASAR["parabola"]
        alasan = VGroup(
            MathTex(r"x - 1 = 0", color=self.t.tinta, font_size=38),
            MathTex(r"x = 1", color=self.t.aksen2, font_size=38),
        ).arrange(DOWN, buff=0.40, aligned_edge=LEFT)
        sinema.batasi_lebar(alasan, LEBAR_PANEL)
        alasan.move_to([X_PANEL, -1.15, 0])

        titik = Dot(self.bidang.c2p(1.0, 1.0), color=self.t.aksen2, radius=0.09)
        garis = DashedLine(
            self.bidang.c2p(1.0, Y_MIN + 0.1), self.bidang.c2p(1.0, 1.0),
            color=self.t.aksen2, stroke_width=2.5,
        )

        with sinema.babak(self, "kenapa", DURASI) as b:
            sinema.keterangan(
                self, "titik terendah pindah ke tempat kurungnya nol", self.t,
            )
            b.catat(0.6)
            b.main(Write(alasan), run_time=1.6)
            b.main(Create(garis), FadeIn(titik, scale=0.5), run_time=1.2)
            self.periksa({"alasan": alasan, "bayang": self.bayang})
            b.jeda(1.2)
            b.main(FadeOut(alasan), FadeOut(garis), FadeOut(titik), run_time=0.8)

    # ==================================================================
    def ganti_dasar(self, b, nama: str, nama_narasi: str):
        """Ganti fungsi dasarnya, lalu kenakan dua perlakuan yang sama.

        Keterangannya dipasang DI AWAL babak, bukan di akhir. Pada render uji
        pertama ia dipasang di akhir, sehingga sepanjang babak sinus layar
        masih menampilkan keterangan babak akar: narasi bicara satu hal,
        tulisan di layar bicara hal sebelumnya.
        """
        d = DASAR[nama]
        asli = self.gambar(d["f"], d["dari"], d["sampai"], self.t.tinta)
        panel_baru = self.panel_rumus([d["rumus"]])

        sinema.keterangan(self, nama_narasi, self.t, warna=self.t.sorot)
        b.catat(0.6)
        b.main(
            FadeOut(self.bayang),
            ReplacementTransform(self.kurva, asli),
            run_time=1.2,
        )
        self.bayang = None
        self.kurva = asli
        self.ganti_panel(b, panel_baru, lama=1.0)

        bayang = self.gambar(d["f"], d["dari"], d["sampai"], self.t.redup, 2.5)
        bayang.set_stroke(opacity=0.55)
        self.add(bayang)
        self.bayang = bayang

        hasil = self.gambar(
            lambda x: d["f"](x - 1.0) + 1.0, d["dari"] + 1.0, d["sampai"] + 1.0,
            self.t.tinta,
        )
        panel_hasil = self.panel_rumus(
            [d["rumus"], r"y = f(x - 1) + 1"], self.t.sorot,
        )
        self.ganti_panel(b, panel_hasil, lama=1.0)
        b.main(ReplacementTransform(self.kurva, hasil), run_time=1.8)
        self.kurva = hasil
        self.periksa({"bayang": self.bayang})

    def b07_akar(self):
        with sinema.babak(self, "akar", DURASI) as b:
            self.ganti_dasar(b, "akar", "bentuk lain, perpindahan sama")
            b.jeda(0.8)

    def b08_sinus(self):
        with sinema.babak(self, "sinus", DURASI) as b:
            self.ganti_dasar(b, "sinus", "aturannya tidak peduli bentuk grafiknya")
            b.jeda(1.2)

    # ==================================================================
    def b09_mampat(self):
        """Menulis f(2x) lalu BERHENTI. Ini jebakan utama tahap ini."""
        d = DASAR["parabola"]
        asli = self.gambar(d["f"], d["dari"], d["sampai"], self.t.tinta)
        panel_baru = self.panel_rumus([d["rumus"], r"y = f(2x)"], self.t.aksen2)
        tanda = Text("dua kali lebar, atau setengah?", font_size=26,
                     color=self.t.aksen2)
        sinema.batasi_lebar(tanda, LEBAR_PANEL)
        tanda.next_to(panel_baru, DOWN, buff=0.7)

        with sinema.babak(self, "mampat", DURASI) as b:
            sinema.keterangan(self, "tebak dulu, ini yang paling menjebak", self.t)
            b.catat(0.6)
            b.main(
                FadeOut(self.bayang),
                ReplacementTransform(self.kurva, asli),
                run_time=1.4,
            )
            self.kurva, self.bayang = asli, None
            self.ganti_panel(b, panel_baru, lama=1.0)
            b.main(FadeIn(tanda, shift=UP * 0.2), run_time=0.8)
            self.periksa({"tanda": tanda})
            b.jeda(1.6)
        self.tanda_mampat = tanda

    # ==================================================================
    def b10_setengah(self):
        d = DASAR["parabola"]
        bayang = self.gambar(d["f"], d["dari"], d["sampai"], self.t.redup, 2.5)
        bayang.set_stroke(opacity=0.55)

        mampat = self.gambar(
            lambda x: d["f"](2.0 * x), -1.08, 1.08, self.t.tinta,
        )
        titik_lama = Dot(self.bidang.c2p(2.0, 4.0), color=self.t.redup, radius=0.08)
        titik_baru = Dot(self.bidang.c2p(1.0, 4.0), color=self.t.aksen2, radius=0.10)
        panah = Arrow(
            self.bidang.c2p(2.0, 4.0), self.bidang.c2p(1.0, 4.0),
            color=self.t.aksen2, buff=0.12, stroke_width=4,
            max_tip_length_to_length_ratio=0.28,
        )

        with sinema.babak(self, "setengah", DURASI) as b:
            sinema.keterangan(
                self, "nilai 4 pindah dari x = 2 ke x = 1", self.t,
                warna=self.t.aksen2,
            )
            b.catat(0.6)
            b.main(FadeOut(self.tanda_mampat), run_time=0.5)
            self.add(bayang)
            self.bayang = bayang
            b.main(ReplacementTransform(self.kurva, mampat), run_time=1.6)
            self.kurva = mampat
            b.main(FadeIn(titik_lama), GrowArrow(panah), FadeIn(titik_baru),
                   run_time=1.2)
            self.periksa({"bayang": self.bayang})
            b.jeda(0.9)
        self.penanda = VGroup(titik_lama, titik_baru, panah)

    # ==================================================================
    def b11_kenapamampat(self):
        alasan = VGroup(
            MathTex(r"f(2 \cdot 1) = f(2)", color=self.t.tinta, font_size=36),
            MathTex(r"x\ \text{dikali 2 dulu}", color=self.t.aksen2, font_size=32),
        ).arrange(DOWN, buff=0.38, aligned_edge=LEFT)
        sinema.batasi_lebar(alasan, LEBAR_PANEL)
        alasan.move_to([X_PANEL, -1.15, 0])

        with sinema.babak(self, "kenapamampat", DURASI) as b:
            sinema.keterangan(
                self, "mesinnya sampai lebih awal, jadi grafiknya memampat",
                self.t,
            )
            b.catat(0.6)
            # Ditulis pelan supaya kalimat keduanya sempat terbaca utuh. Pada
            # render uji pertama, potongan `x dikali 2 dulu` masih setengah
            # tertulis pada detik 102.
            b.main(Write(alasan), run_time=2.4)
            self.periksa({"alasan": alasan, "bayang": self.bayang})
            b.jeda(1.4)
            b.main(FadeOut(alasan), FadeOut(self.penanda), run_time=0.8)

    # ==================================================================
    def b12_tutup(self):
        """Dua kalimat aturannya, kata per kata seperti kalimat sorot di halaman."""
        luar = Text(
            "Angka di LUAR kurung\nmengerjakan apa yang tertulis.",
            font_size=30, color=self.t.aksen, line_spacing=0.9,
        )
        dalam = Text(
            "Angka yang masuk ke DALAM kurung\nmengerjakan kebalikannya.",
            font_size=30, color=self.t.aksen2, line_spacing=0.9,
        )
        dua = VGroup(luar, dalam).arrange(DOWN, buff=0.55)
        sinema.batasi_lebar(dua, 11.5)
        dua.move_to([0, -0.2, 0])

        with sinema.babak(self, "tutup", DURASI) as b:
            sinema.hapus_keterangan(self)
            b.catat(0.4)
            b.main(
                FadeOut(self.bidang), FadeOut(self.kurva),
                FadeOut(self.bayang), FadeOut(self.panel),
                run_time=1.0,
            )
            self.bidang = self.kurva = self.bayang = self.panel = None
            b.main(FadeIn(luar, shift=UP * 0.2), run_time=1.4)
            b.jeda(1.2)
            b.main(FadeIn(dalam, shift=UP * 0.2), run_time=1.4)
            qc.periksa_adegan({"dua": dua})
            b.jeda(1.6)
