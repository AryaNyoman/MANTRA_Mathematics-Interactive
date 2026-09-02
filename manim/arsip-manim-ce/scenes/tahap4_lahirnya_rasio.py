"""Tahap 4, Lahirnya sin, cos, tan.

STORYBOARD (ditulis lebih dulu, kode menyusul):

  1. Judul pembuka; segitiga siku-siku dengan tiga sisi bernama muncul.
  2. Pertanyaan dihitung: tiga pilihan atas, dua sisa bawah.
  3. Enam kotak pecahan kosong terbentuk, enam kemungkinan, tidak lebih.
  4. Ditegaskan keenamnya punya nama.
  5. Kotak pertama diisi: depan per miring, diberi nama sinus.
  6. Kotak kedua: samping per miring, cosinus.
  7. Kotak ketiga: depan per samping, tangen.
  8. Alasan ketiganya paling sering dipakai: pembaginya sisi terpanjang.
  9. Tiga sisanya diberi nama, ditandai sebagai bahan tahap 6.
 10. Penutup.

INTI YANG HARUS TERTANAM: enam kemungkinan itu DIHITUNG dulu, baru diberi
nama. Kalau langsung menyodorkan tiga rumus, siswa kembali ke keadaan awal -
menerima rumus tanpa tahu dari mana. Karena itu babak 2-3 tidak boleh dipangkas.

ATURAN YANG DIPATUHI, sama dengan tahap 5, 6, 7, 8, 9.

WARNA: biru = samping · merah = depan · tinta = miring · ungu = sudut
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
TOPIK = "tahap4-lahirnya-rasio"
DURASI: dict[str, float] = json.loads(
    (AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8")
)["segmen"]

# --- ZONA TETAP (bingkai 14,22 x 8; batas aman x ±6,91  y ±3,80) ---
SIKU = np.array([-5.60, -1.55, 0.0])   # titik sudut siku-siku
LEBAR = 3.05                            # panjang sisi samping di layar
SUDUT = 34.0                            # sudut theta

X_KOTAK = [1.10, 4.30]                  # dua kolom kotak pecahan
Y_KOTAK = [2.05, 0.20, -1.65]           # tiga baris
Y_PENUTUP = -3.25


class LahirnyaRasio(Scene):
    tema = "terang"

    # ==================================================================
    def construct(self):
        self.t = Tema(self.tema)
        self.t.pasang(self)
        self.siapkan_segitiga()

        self.b01_sapa()
        self.b02_hitung()
        self.b03_enam()
        self.b04_nama()
        self.b05_sin()
        self.b06_cos()
        self.b07_tan()
        self.b08_kenapa()
        self.b09_sisa()
        self.b10_tutup()

    # ==================================================================
    def siapkan_segitiga(self):
        t = self.t
        self.B = SIKU + RIGHT * LEBAR
        self.C = self.B + UP * LEBAR * np.tan(np.radians(SUDUT))
        self.samping = Line(SIKU, self.B, color=t.aksen2, stroke_width=6)
        self.depan = Line(self.B, self.C, color=t.aksen, stroke_width=6)
        self.miring = Line(self.C, SIKU, color=t.tinta, stroke_width=6)
        self.siku = RightAngle(Line(self.B, SIKU), Line(self.B, self.C),
                               length=0.30, color=t.redup, stroke_width=3)
        self.busur = Arc(radius=0.50, start_angle=0, angle=np.radians(SUDUT),
                         arc_center=SIKU, color=t.sorot, stroke_width=5)
        self.lab_theta = MathTex(r"\theta", color=t.sorot, font_size=32).move_to(
            SIKU + rotate_vector(RIGHT * 0.88, np.radians(SUDUT) / 2))
        self.n_samping = MathTex(r"\text{samping}", color=t.aksen2,
                                 font_size=26).next_to(self.samping, DOWN, buff=0.20)
        self.n_depan = MathTex(r"\text{depan}", color=t.aksen,
                               font_size=26).next_to(self.depan, RIGHT, buff=0.20)
        self.n_miring = MathTex(r"\text{miring}", color=t.tinta, font_size=26).move_to(
            (SIKU + self.C) / 2 + UP * 0.40 + LEFT * 0.22)
        self.segitiga = VGroup(self.samping, self.depan, self.miring, self.siku,
                               self.busur, self.lab_theta)
        self.nama_sisi = VGroup(self.n_samping, self.n_depan, self.n_miring)

    def kotak(self, i, atas, bawah, warna_atas, warna_bawah, ukuran=30):
        """Satu pecahan di kisi 3x2, dirakit dari bagian yang diwarnai sendiri."""
        t = self.t
        kolom, baris = divmod(i, 3)
        m = MathTex(rf"\frac{{\text{{{atas}}}}}{{\text{{{bawah}}}}}",
                    color=t.tinta, font_size=ukuran)
        m.move_to([X_KOTAK[kolom], Y_KOTAK[baris], 0])
        return m

    # ==================================================================
    # Babak
    # ==================================================================
    def b01_sapa(self):
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Dari mana sin, cos, tan?", self.t,
                                 lama=DURASI["sapa"] * 0.55)
            b.catat(DURASI["sapa"] * 0.55)
            b.main(Create(self.miring), Create(self.samping), Create(self.depan),
                   Create(self.siku), run_time=2.0)
            b.main(Create(self.busur), FadeIn(self.lab_theta),
                   FadeIn(self.nama_sisi), run_time=1.4)
        qc.periksa_adegan({"segitiga": self.segitiga, "nama_sisi": self.nama_sisi})

    def b02_hitung(self):
        """Tiga pilihan atas, dua sisa bawah, dihitung, bukan diberitahu."""
        t = self.t
        atas = MathTex(r"3", r"\text{ pilihan untuk pembilang}",
                       color=t.tinta, font_size=30).move_to([2.30, 2.35, 0])
        atas[0].set_color(t.sorot)
        bawah = MathTex(r"2", r"\text{ sisa untuk penyebut}",
                        color=t.tinta, font_size=30).move_to([2.30, 1.35, 0])
        bawah[0].set_color(t.sorot)
        # ARYA menanyakan ini setelah menonton: kenapa penyebutnya 2, bukan 3?
        # Jawabannya harus TERTULIS, bukan diandaikan sudah jelas.
        # DUA baris, bukan satu. Versi satu baris terpaksa diperkecil sampai
        # nyaris tak terbaca supaya muat 5,9 satuan, batasi_lebar menskalakan,
        # jadi kalimat panjang justru jadi kecil, bukan terpotong.
        sebab = Text("sisi yang dipakai di atas tidak boleh dipakai lagi di bawah,\n"
                     "karena membagi sisi dengan dirinya sendiri selalu 1",
                     font_size=22, color=t.redup, line_spacing=0.9)
        sinema.batasi_lebar(sebab, 6.1)
        sebab.move_to([2.30, 0.25, 0])
        self.hitungan = VGroup(atas, bawah, sebab)
        with sinema.babak(self, "hitung", DURASI) as b:
            b.main(Write(atas), run_time=2.2)
            b.main(Write(bawah), run_time=2.0)
            b.main(FadeIn(sebab, shift=UP * 0.12), run_time=1.8)
            b.main(LaggedStart(*[Indicate(m, scale_factor=1.12, color=t.sorot)
                                 for m in self.nama_sisi], lag_ratio=0.4),
                   run_time=2.2)
        qc.periksa_adegan({"hitungan": self.hitungan, "segitiga": self.segitiga,
                           "nama_sisi": self.nama_sisi},
                          [("hitungan", "segitiga"), ("hitungan", "nama_sisi")])

    def b03_enam(self):
        t = self.t
        kali = MathTex("3", r"\times", "2", "=", "6",
                       color=t.tinta, font_size=42).move_to([2.30, 1.45, 0])
        kali[4].set_color(t.sorot)
        pasangan = [("depan", "miring"), ("samping", "miring"), ("depan", "samping"),
                    ("miring", "depan"), ("miring", "samping"), ("samping", "depan")]
        self.kotaks = VGroup(*[
            self.kotak(i, a, bw, t.tinta, t.tinta) for i, (a, bw) in enumerate(pasangan)
        ])
        with sinema.babak(self, "enam", DURASI) as b:
            b.main(ReplacementTransform(self.hitungan, kali), run_time=2.0)
            b.main(FadeOut(kali), run_time=0.9)
            b.main(LaggedStart(*[FadeIn(m, shift=UP * 0.12) for m in self.kotaks],
                               lag_ratio=0.22), run_time=4.2)
        qc.periksa_adegan({"kotaks": self.kotaks, "segitiga": self.segitiga,
                           "nama_sisi": self.nama_sisi},
                          [("kotaks", "segitiga"), ("kotaks", "nama_sisi")])

    def b04_nama(self):
        t = self.t
        kotak = SurroundingRectangle(self.kotaks, color=t.redup, buff=0.34,
                                     stroke_width=2, corner_radius=0.10)
        cap = Text("enam kemungkinan, semuanya punya nama",
                   font_size=22, color=t.redup)
        sinema.batasi_lebar(cap, 5.4)
        cap.next_to(kotak, UP, buff=0.22)
        with sinema.babak(self, "nama", DURASI) as b:
            b.main(Create(kotak), run_time=1.6)
            b.main(FadeIn(cap, shift=UP * 0.12), run_time=1.4)
            b.jeda(1.4)
        self.bingkai, self.cap = kotak, cap
        qc.periksa_adegan({"bingkai": kotak, "cap": cap, "segitiga": self.segitiga},
                          [("bingkai", "segitiga"), ("cap", "segitiga")])

    def beri_nama(self, nama_babak, indeks, nama, warna):
        """Satu kotak disorot lalu diberi nama di sebelahnya."""
        t = self.t
        target = self.kotaks[indeks]
        sorot = SurroundingRectangle(target, color=warna, buff=0.16,
                                     stroke_width=3, corner_radius=0.08)
        label = MathTex(nama, color=warna, font_size=32)
        # buff 0,26 membuat "sin theta =" menyentuh kotaknya, terlihat ARYA
        # pada tangkapan layar. Diberi jarak lebih, dan pasangan label-kotak
        # ikut diperiksa qc supaya tindihan seperti ini tidak lolos lagi.
        label.next_to(sorot, LEFT, buff=0.40)
        with sinema.babak(self, nama_babak, DURASI) as b:
            b.main(Create(sorot), run_time=1.2)
            b.main(Write(label), run_time=1.6)
            b.jeda(1.0)
        qc.periksa_adegan({"sorot": sorot, "label": label, "kotaks": self.kotaks,
                           "segitiga": self.segitiga},
                          [("label", "segitiga"), ("label", "sorot")])
        return VGroup(sorot, label)

    def b05_sin(self):
        self.tanda_sin = self.beri_nama("sin", 0, r"\sin\theta =", self.t.aksen)

    def b06_cos(self):
        self.tanda_cos = self.beri_nama("cos", 1, r"\cos\theta =", self.t.aksen2)

    def b07_tan(self):
        self.tanda_tan = self.beri_nama("tan", 2, r"\tan\theta =", self.t.tinta)

    def b08_kenapa(self):
        t = self.t
        cap = Text("pembaginya sisi terpanjang, jadi hasilnya antara 0 dan 1",
                   font_size=22, color=t.redup)
        sinema.batasi_lebar(cap, 6.2)
        cap.move_to([2.70, Y_PENUTUP, 0])
        with sinema.babak(self, "kenapa", DURASI) as b:
            b.main(Indicate(self.n_miring, scale_factor=1.2, color=t.sorot),
                   run_time=1.6)
            b.main(*[Indicate(self.kotaks[i], scale_factor=1.08, color=t.sorot)
                     for i in (0, 1)], run_time=1.8)
            b.main(FadeIn(cap, shift=UP * 0.12), run_time=1.6)
            b.jeda(1.6)
        self.cap_kenapa = cap
        qc.periksa_adegan({"cap": cap, "kotaks": self.kotaks,
                           "segitiga": self.segitiga},
                          [("cap", "kotaks"), ("cap", "segitiga")])

    def b09_sisa(self):
        t = self.t
        nama = [r"\csc\theta =", r"\sec\theta =", r"\cot\theta ="]
        warna = [t.aksen, t.aksen2, t.tinta]
        self.tanda_sisa = VGroup()
        for k, (n, w) in enumerate(zip(nama, warna)):
            target = self.kotaks[3 + k]
            lab = MathTex(n, color=w, font_size=28)
            lab.next_to(target, LEFT, buff=0.24)
            self.tanda_sisa.add(lab)
        with sinema.babak(self, "sisa", DURASI) as b:
            b.main(FadeOut(self.cap_kenapa), run_time=0.8)
            b.main(LaggedStart(*[Write(m) for m in self.tanda_sisa],
                               lag_ratio=0.35), run_time=4.6)
            b.jeda(1.6)
        qc.periksa_adegan({"tanda_sisa": self.tanda_sisa, "kotaks": self.kotaks,
                           "bingkai": self.bingkai, "segitiga": self.segitiga},
                          [("tanda_sisa", "segitiga")])

    def b10_tutup(self):
        t = self.t
        penutup = Text("tiga dari enam cara membagi dua sisi",
                       font_size=24, color=t.redup)
        sinema.batasi_lebar(penutup, 6.0)
        penutup.move_to([2.70, Y_PENUTUP, 0])
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeIn(penutup, shift=UP * 0.12), run_time=1.6)
            b.main(*[Indicate(self.kotaks[i], scale_factor=1.10, color=t.sorot)
                     for i in (0, 1, 2)], run_time=2.0)
            b.jeda(1.6)
        qc.periksa_adegan(
            {"penutup": penutup, "kotaks": self.kotaks, "bingkai": self.bingkai,
             "segitiga": self.segitiga, "cap": self.cap},
            [("penutup", "kotaks"), ("penutup", "segitiga"), ("cap", "segitiga")])
