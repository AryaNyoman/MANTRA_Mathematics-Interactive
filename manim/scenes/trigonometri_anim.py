"""Trigonometri, animasi utama, bernarasi.

Kelas 10, Bab 4. Melawan miskonsepsi resmi Kurikulum Merdeka: siswa mengira
nilai tan/sin/cos adalah angka mati, padahal ia perbandingan yang tetap sama
pada segitiga sebangun.

LAMA TIAP TAHAP DIAMBIL DARI DURASI SUARA YANG SEBENARNYA
(`audio/trigonometri/durasi.json`, dibuat oleh `manim/buat_narasi.py`).
Tidak ada satu pun angka waktu yang ditebak, kalau naskahnya berubah,
jalankan ulang buat_narasi.py lalu render ulang, dan sinkronnya tetap terjaga.

RIWAYAT: versi pertama (17 detik, tanpa narasi) punya 7 cacat yang lolos
karena hanya dicek lognya, bukan ditonton. Sejak itu berlaku dua aturan -
`qc.periksa_adegan` menggagalkan render kalau ada yang bertindih atau keluar
bingkai, dan `manim/cek_video.py` wajib dijalankan lalu HASILNYA DILIHAT.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from manim import *  # noqa: E402
from matra_theme import Tema  # noqa: E402
import qc  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
DURASI: dict[str, float] = json.loads(
    (AKAR / "audio" / "trigonometri" / "durasi.json").read_text(encoding="utf-8")
)["segmen"]

# --- ZONA TETAP (bingkai 14,22 x 8) ---
Y_JUDUL = 3.4
POJOK = np.array([-6.3, -2.6, 0.0])
X_KANAN = 3.6
Y_RUMUS = 1.9
Y_HITUNG = 0.1
Y_BAWAH = -3.45
SATUAN = 1.0
SUDUT = np.arctan(0.75)


def pecahan(atas: Mobject, bawah: Mobject, warna) -> VGroup:
    """Pecahan dirakit sendiri supaya tiap bagian bisa diwarnai dengan pasti.

    JANGAN mewarnai lewat pengirisan indeks karakter (`rumus[0][3:8]`), itu
    penyebab kata "depan" tampil belang setengah merah setengah biru di versi
    pertama.
    """
    lebar = max(atas.width, bawah.width) + 0.22
    garis = Line(LEFT * lebar / 2, RIGHT * lebar / 2, color=warna, stroke_width=3)
    atas.next_to(garis, UP, buff=0.13)
    bawah.next_to(garis, DOWN, buff=0.13)
    return VGroup(atas, garis, bawah)


def koma(nilai: float) -> str:
    return f"{nilai:.1f}".rstrip("0").rstrip(".").replace(".", "{,}")


class UkuranBedaRasioSama(Scene):
    tema = "terang"

    # ------------------------------------------------------------------
    def tahap(self, nama: str, *animasi, porsi: float = 0.62) -> None:
        """Mainkan animasi lalu tunggu, sehingga tahap ini memakan waktu
        persis sepanjang kalimat narasinya."""
        lama = DURASI[nama]
        if animasi:
            jalan = min(lama * porsi, lama - 0.2)
            self.play(*animasi, run_time=max(jalan, 0.3))
            self.wait(max(lama - jalan, 0))
        else:
            self.wait(lama)

    # ------------------------------------------------------------------
    def construct(self):
        t = Tema(self.tema)
        t.pasang(self)
        skala = ValueTracker(2.4)

        def b():
            return POJOK + RIGHT * skala.get_value() * SATUAN

        def c():
            return b() + UP * skala.get_value() * np.tan(SUDUT) * SATUAN

        # ---------- geometri (kiri) ----------
        samping = always_redraw(lambda: Line(POJOK, b(), color=t.aksen2, stroke_width=6))
        depan = always_redraw(lambda: Line(b(), c(), color=t.aksen, stroke_width=6))
        miring = always_redraw(lambda: Line(c(), POJOK, color=t.tinta, stroke_width=6))
        # kedua garis berangkat DARI titik siku-siku, supaya tandanya jatuh
        # di dalam segitiga (versi pertama menaruhnya di luar, salah geometri)
        siku = always_redraw(lambda: RightAngle(
            Line(b(), POJOK), Line(b(), c()), length=0.34, color=t.redup, stroke_width=3))

        def jari():
            return 0.40 + 0.13 * skala.get_value()

        busur = always_redraw(lambda: Angle(
            Line(POJOK, b()), Line(POJOK, c()), radius=jari(), color=t.sorot, stroke_width=5))
        lab_theta = always_redraw(lambda: MathTex(r"\theta", color=t.sorot, font_size=40)
                                  .move_to(POJOK + rotate_vector(RIGHT * (jari() + 0.45), SUDUT / 2)))

        segitiga = VGroup(samping, depan, miring, siku, busur, lab_theta)
        judul = Text("Perbandingan Trigonometri", font_size=40, color=t.tinta).move_to([0, Y_JUDUL, 0])

        # =========== 01 buka ===========
        self.tahap("buka",
                   Write(judul), Create(miring), Create(samping), Create(depan),
                   Create(siku), Create(busur), FadeIn(lab_theta), porsi=0.75)
        qc.periksa_adegan({"judul": judul, "segitiga": segitiga}, [("judul", "segitiga")])

        # =========== 02 namai ===========
        nama_depan = always_redraw(lambda: Text("sisi depan", font_size=26, color=t.aksen)
                                   .next_to(Line(b(), c()), RIGHT, buff=0.28))
        nama_samping = always_redraw(lambda: Text("sisi samping", font_size=26, color=t.aksen2)
                                     .next_to(Line(POJOK, b()), DOWN, buff=0.28))
        # Digeser lurus ke ATAS, bukan kiri-atas. Versi kiri-atas membuat label
        # ini keluar tepi kiri layar (tertangkap qc.periksa_adegan).
        nama_miring = always_redraw(lambda: Text("sisi miring", font_size=26, color=t.tinta)
                                    .move_to(Line(c(), POJOK).get_center() + UP * 0.48))
        satuan_tahap = DURASI["namai"] / 3
        for m, garis in ((nama_depan, depan), (nama_samping, samping), (nama_miring, miring)):
            self.play(FadeIn(m, shift=UP * 0.15),
                      garis.animate.set_stroke(width=10), run_time=satuan_tahap * 0.35)
            self.play(garis.animate.set_stroke(width=6), run_time=satuan_tahap * 0.2)
            self.wait(satuan_tahap * 0.45)
        nama_sisi = VGroup(nama_depan, nama_samping, nama_miring)
        qc.periksa_adegan({"nama_sisi": nama_sisi, "judul": judul}, [("nama_sisi", "judul")])

        # =========== 03 ukur ===========
        lab_samping = always_redraw(lambda: MathTex(
            koma(skala.get_value()) + r"\ \text{cm}", color=t.aksen2, font_size=30
        ).next_to(nama_samping, DOWN, buff=0.16))
        lab_depan = always_redraw(lambda: MathTex(
            koma(skala.get_value() * np.tan(SUDUT)) + r"\ \text{cm}", color=t.aksen, font_size=30
        ).next_to(nama_depan, DOWN, buff=0.16))
        self.tahap("ukur", FadeIn(lab_samping, shift=UP * 0.15), FadeIn(lab_depan, shift=UP * 0.15))
        ukuran = VGroup(lab_samping, lab_depan)

        # =========== 04 hitung1 ===========
        kiri_rumus = MathTex(r"\tan\theta=", color=t.tinta, font_size=46)
        frac_kata = pecahan(
            MathTex(r"\text{depan}", color=t.aksen, font_size=38),
            MathTex(r"\text{samping}", color=t.aksen2, font_size=38), t.tinta)
        rumus = VGroup(kiri_rumus, frac_kata).arrange(RIGHT, buff=0.22).move_to([X_KANAN, Y_RUMUS, 0])

        def baris(atas, bawah, hasil_teks):
            s1 = MathTex("=", color=t.tinta, font_size=46)
            fr = pecahan(MathTex(atas, color=t.aksen, font_size=38),
                         MathTex(bawah, color=t.aksen2, font_size=38), t.tinta)
            s2 = MathTex("=", color=t.tinta, font_size=46)
            hs = MathTex(hasil_teks, color=t.sorot, font_size=54)
            g = VGroup(s1, fr, s2, hs).arrange(RIGHT, buff=0.26).move_to([X_KANAN, Y_HITUNG, 0])
            return g, hs

        hitung1, hasil1 = baris("1{,}8", "2{,}4", "0{,}75")
        lama = DURASI["hitung1"]
        self.play(Write(rumus), run_time=lama * 0.35)
        self.play(Write(hitung1), run_time=lama * 0.35)
        kotak = SurroundingRectangle(hasil1, color=t.sorot, buff=0.18,
                                     stroke_width=3, corner_radius=0.08)
        self.play(Create(kotak), run_time=lama * 0.15)
        self.wait(lama * 0.15)
        qc.periksa_adegan(
            {"rumus": rumus, "hitung1": hitung1, "segitiga": segitiga, "judul": judul,
             "ukuran": ukuran},
            [("rumus", "segitiga"), ("hitung1", "segitiga"), ("rumus", "judul"),
             ("hitung1", "rumus"), ("ukuran", "hitung1")])

        # =========== 05 besarkan ===========
        # Ditaruh di kolom kanan, BUKAN di bawah tengah: zona bawah-kiri sudah
        # dipakai label ukuran "2,4 cm" (tertangkap qc.periksa_adegan).
        pesan = Text("sudut θ tidak diubah sama sekali", font_size=28, color=t.redup)
        pesan.set(width=min(pesan.width, 5.6)).move_to([X_KANAN, -1.75, 0])
        lama = DURASI["besarkan"]
        self.play(FadeIn(pesan), run_time=lama * 0.12)
        self.play(skala.animate.set_value(4.0), run_time=lama * 0.62, rate_func=smooth)
        self.wait(lama * 0.26)
        qc.periksa_adegan({"segitiga": segitiga, "pesan": pesan, "hitung1": hitung1,
                           "ukuran": ukuran},
                          [("segitiga", "hitung1"), ("ukuran", "pesan"), ("segitiga", "pesan")])

        # =========== 06 hitung2 ===========
        hitung2, hasil2 = baris("3", "4", "0{,}75")
        lama = DURASI["hitung2"]
        self.play(ReplacementTransform(hitung1, hitung2),
                  kotak.animate.surround(hasil2, buff=0.18),
                  FadeOut(pesan), run_time=lama * 0.45)
        self.play(Indicate(hasil2, color=t.sorot, scale_factor=1.22), run_time=lama * 0.25)
        self.wait(lama * 0.3)

        # =========== 07 salahpaham ===========
        kotak_kalk = RoundedRectangle(width=4.6, height=1.5, corner_radius=0.14,
                                      color=t.redup, stroke_width=3).move_to([0, Y_BAWAH + 0.35, 0])
        isi_kalk = MathTex(r"\tan 37^\circ = 0{,}75", color=t.redup, font_size=40).move_to(kotak_kalk)
        cap_kalk = Text("“angka mati dari kalkulator”", font_size=24, color=t.redup)
        cap_kalk.next_to(kotak_kalk, DOWN, buff=0.16)
        coret = Line(kotak_kalk.get_corner(DL), kotak_kalk.get_corner(UR),
                     color=t.aksen, stroke_width=6)
        lama = DURASI["salahpaham"]
        self.play(Create(kotak_kalk), Write(isi_kalk), FadeIn(cap_kalk), run_time=lama * 0.45)
        self.wait(lama * 0.2)
        self.play(Create(coret), run_time=lama * 0.2)
        self.wait(lama * 0.15)
        kalk = VGroup(kotak_kalk, isi_kalk, cap_kalk, coret)
        qc.periksa_adegan({"kalk": kalk, "segitiga": segitiga, "hitung2": hitung2},
                          [("kalk", "segitiga"), ("kalk", "hitung2")])

        # =========== 08 kenapa ===========
        lama = DURASI["kenapa"]
        self.play(FadeOut(kalk), run_time=lama * 0.2)
        self.play(Indicate(frac_kata, color=t.sorot, scale_factor=1.15), run_time=lama * 0.3)
        self.play(Circumscribe(rumus, color=t.sorot, buff=0.2), run_time=lama * 0.3)
        self.wait(lama * 0.2)

        # =========== 09 skala ===========
        lama = DURASI["skala"]
        self.play(skala.animate.set_value(1.1), run_time=lama * 0.35, rate_func=smooth)
        self.play(skala.animate.set_value(5.4), run_time=lama * 0.40, rate_func=smooth)
        self.play(skala.animate.set_value(4.0), run_time=lama * 0.15, rate_func=smooth)
        self.wait(lama * 0.10)
        qc.periksa_adegan({"segitiga": segitiga, "hitung2": hitung2, "ukuran": ukuran},
                          [("segitiga", "hitung2"), ("ukuran", "hitung2")])

        # =========== 10 tutup ===========
        kunci = Text("Ukurannya beda. Perbandingannya sama.", font_size=34, color=t.tinta)
        kunci.set(width=min(kunci.width, 8.4)).move_to([1.9, Y_BAWAH, 0])
        lama = DURASI["tutup"]
        self.play(Write(kunci), run_time=lama * 0.5)
        self.play(Indicate(hasil2, color=t.sorot, scale_factor=1.2), run_time=lama * 0.25)
        self.wait(lama * 0.25)

        qc.periksa_adegan(
            {"judul": judul, "segitiga": segitiga, "rumus": rumus, "hitung2": hitung2,
             "kunci": kunci, "ukuran": ukuran},
            [("kunci", "segitiga"), ("kunci", "hitung2"), ("segitiga", "hitung2"),
             ("segitiga", "rumus"), ("rumus", "judul"), ("hitung2", "rumus"),
             ("ukuran", "kunci")])


class UkuranBedaRasioSamaGelap(UkuranBedaRasioSama):
    tema = "gelap"
