"""Sifat Limit dan Cara Menghitungnya, Bagian 3 (Materi 07): x lari ke tak hingga.
STANDAR VIDEO v3.1, ditulis ulang 12 Sep 2026 dari adegan Manim CE yang sudah
disetujui ARYA. ISINYA SAMA: pabrik dengan biaya tetap 5 juta plus 20 ribu per
barang, rata-rata per barang merapat ke 20 ribu tanpa pernah sampai; tak hingga
BUKAN bilangan melainkan keterangan arah; alat: 1/x menuju 0; (3x kuadrat + 2x)
: (x kuadrat - 5) dibagi pangkat tertinggi, limitnya 3; asimtot datar y = 3;
diperbesar: selisihnya 0,07 dan tidak pernah nol.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 3 dengan cuplikan kurva yang merapat
  ke garis; segar-ingat Bagian 2 (faktor dan sekawan) sebagai lambang.
- Rata-rata pabrik ditulis ulang 20.000 + 5.000.000/n supaya "biaya tetapnya
  selalu menyisakan sedikit" terlihat di rumusnya.
- Contoh angka untuk 1/x: x = 10 memberi 0,1, x = 1.000 memberi 0,001.
- Pangkat tertinggi disorot pada rumusnya, pembagian dengan x kuadrat
  ditulis sebagai catatan kecil di samping pembilang dan penyebut.
- Kalimat narasi tidak diulang sebagai teks (versi lama memasang banyak
  kalimat di kolom kanan). "x = tak hingga" tampil hanya untuk DICORET.
- Rumus lahir besar di fokus lalu terbang ke panel: 1/x menuju 0, limitnya 3.
- Tiap kejadian dipicu pada kata yang mengucapkannya.

PANEL DIPERBESAR di penutup: pada skala penuh selisih kurva dengan garis
y = 3 di x = 35 cuma 0,07 satuan dan lenyap di layar, jadi skalanya diganti
dan perubahannya diberi label "panel diperbesar".

WARNA: biru = biaya tetap dan pembilang, merah = per barang, tak hingga,
selisih, ungu = jawaban, garis asimtot, sorot.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "limit7-takhingga"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

X_KIRI = -5.6
X_KANAN = 3.6
PUSAT_GRAFIK = np.array([-2.6, -0.2, 0.0])   # tinggi 3,6: angka sumbu x tetap di atas jalur subtitle


def f(x):
    return (3 * x * x + 2 * x) / (x * x - 5)


def hud(ident, papan):
    isi = {"identitas": ident} if ident is not None else {}
    p = papan.semua()
    if p is not None:
        isi["papan"] = p
    return isi


def pita_atas(m, warna=SOROT):
    return SurroundingRectangle(m, buff=0.08).set_fill(warna, 0.18).set_stroke(width=0)


def di_kiri(m, y, x=X_KIRI):
    return m.move_to([x + m.get_width() / 2, y, 0])


def pecahan(kiri, atas, bawah, ukuran=44, warna=TINTA):
    k = rumus(kiri, ukuran, warna) if kiri else None
    a = rumus(atas, ukuran - 4, warna)
    b = rumus(bawah, ukuran - 4, warna)
    lebar = max(a.get_width(), b.get_width()) + 0.16
    garis = Line(LEFT * lebar / 2, RIGHT * lebar / 2).set_stroke(warna, 2)
    pec = VGroup(a, garis, b).arrange(DOWN, buff=0.1)
    if k is None:
        return pec, a, b
    return VGroup(k, pec).arrange(RIGHT, buff=0.16), a, b


def papan_grafik(x_range, y_range, width, height, pusat):
    sumbu = Axes(x_range=x_range, y_range=y_range, width=width, height=height,
                 axis_config=dict(stroke_color=REDUP, stroke_width=2.2))
    sumbu.move_to(pusat)
    sumbu.latar = True
    return sumbu


def papan_manual(x0, x1, y0, y1, width, height, pusat):
    """Papan dengan sumbu di TEPI KIRI dan BAWAH, untuk rentang yang tidak memuat 0.

    `Axes` ManimGL selalu menaruh angka 0 di titik potong sumbu; rentang
    2,9 sampai 3,3 membuat sumbunya terlempar 11 satuan ke atas (qc menolak).
    """
    kiri, bawah = pusat[0] - width / 2, pusat[1] - height / 2

    def cz(x, y):
        return np.array([kiri + (x - x0) / (x1 - x0) * width, bawah + (y - y0) / (y1 - y0) * height, 0.0])

    sumbu = VGroup(Line(cz(x0, y0), cz(x1, y0)), Line(cz(x0, y0), cz(x0, y1))).set_stroke(REDUP, 2.2)
    tik = VGroup()
    for x in range(int(x0), int(x1) + 1, 10):
        tik.add(Line(cz(x, y0) + DOWN * 0.08, cz(x, y0) + UP * 0.08).set_stroke(REDUP, 2))
    for j in range(5):
        y = y0 + j * (y1 - y0) / 4
        tik.add(Line(cz(x0, y) + LEFT * 0.08, cz(x0, y) + RIGHT * 0.08).set_stroke(REDUP, 2))
    sumbu.add(tik)
    sumbu.latar = True
    return sumbu, cz


class LariKeTakHingga(AdeganMatra):
    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        ident = None

        # ============ buka: cuplikan kurva yang merapat ke garis ========= #
        cuplik = papan_grafik((0, 12, 3), (0, 6, 1), 5.0, 2.8, np.array([0.0, 0.5, 0.0]))
        cc = cuplik.c2p
        kurva_cuplik = ParametricCurve(lambda x: cc(x, 3 + 5 / x), t_range=(1.2, 11.6, 0.05)).set_stroke(TINTA, 4)
        garis_cuplik = DashedLine(cc(0, 3), cc(11.8, 3), dash_length=0.12).set_stroke(SOROT, 3)
        tanya = teks("Kenapa grafik bisa mendatar, tapi tidak pernah menyentuh garisnya?", 34, TINTA)
        tanya.move_to([0, -1.9, 0])
        sinema.batasi_lebar(tanya, 11.0)
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sifat")
            sinema.judul_pembuka(self, "Sifat Limit dan Cara Menghitungnya, Bagian 3", lama=3.8)
            b.catat(3.8)
            b.tunggu_kata("Kenapa")
            b.main(ShowCreation(cuplik), ShowCreation(garis_cuplik), run_time=0.7)
            b.tunggu_kata("mendatar")
            b.main(ShowCreation(kurva_cuplik), run_time=1.0)
            b.tunggu_kata("tidak")
            b.main(Write(tanya), run_time=1.6)
        qc.periksa_adegan(self, {"kurva": kurva_cuplik, "garis": garis_cuplik}, hud=hud(ident, papan),
                          dunia={"sumbu": cuplik}, tulisan={"tanya": tanya})

        # ============ segar-ingat: faktor dan sekawan, lalu x ke tak hingga #
        ingat_faktor, _, _ = pecahan(None, r"(x - 2)(x + 2)", r"x - 2", ukuran=40)
        ingat_faktor.move_to([-3.4, 0.4, 0])
        ingat_sekawan = rumus(r"\frac{\sqrt{x + 4} - 2}{x} \cdot \frac{\sqrt{x + 4} + 2}{\sqrt{x + 4} + 2}", 34, TINTA)
        ingat_sekawan.move_to([1.6, 0.4, 0])
        x_saja = rumus("x", 60, SOROT).move_to([-1.8, 0.4, 0])
        # Panah panjang di bawahnya: satu huruf x saja terlalu tipis, cek_layar_kosong
        # menganggap layar kosong (di bawah 0,1 persen area kerja).
        panah_tumbuh = Arrow([-3.0, -0.6, 0], [2.6, -0.6, 0], buff=0, thickness=3.5).set_color(SOROT)
        panah_inf = rumus(r"\to \infty", 60, SOROT).next_to(x_saja, RIGHT, buff=0.3)
        ke_takhingga = VGroup(x_saja, panah_inf)
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi sebelumnya")
            ident = sinema.identitas(self, "ingat Bagian 2")
            ident.set_opacity(0.0)
            # Cuplikan dibiarkan sampai "bentuk": kalau dibuang di sini, layar
            # kosong empat setengah detik (cek_layar_kosong).
            b.main(FadeOut(tanya), ident.animate.set_opacity(1.0), run_time=0.5)
            b.tunggu_kata("bentuk")
            b.main(FadeOut(cuplik), FadeOut(kurva_cuplik), FadeOut(garis_cuplik), run_time=0.3)
            b.tunggu_kata("nol")
            b.main(Write(ingat_faktor), run_time=1.2)
            b.tunggu_kata("sekawan")
            b.main(Write(ingat_sekawan), run_time=1.4)
            b.tunggu_kata("Kali")
            b.main(FadeOut(ingat_faktor), FadeOut(ingat_sekawan), FadeOut(ident), run_time=0.5)
            ident = None
            b.tunggu_kata("x-nya")
            b.main(FadeIn(x_saja, scale=1.3), ShowCreation(panah_tumbuh), run_time=0.5)
            b.tunggu_kata("membesar")
            b.main(FadeIn(panah_inf, shift=RIGHT * 0.4), run_time=0.7)
        qc.periksa_adegan(self, {"panah": panah_tumbuh}, hud=hud(ident, papan), tulisan={"tak hingga": ke_takhingga})

        # ============ pabrik: biaya tetap plus per barang ================ #
        tetap = rumus(r"5.000.000", 40, AKSEN2)
        per_barang = rumus(r"+\ 20.000\,n", 40, AKSEN)
        biaya = VGroup(tetap, per_barang).arrange(RIGHT, buff=0.2)
        di_kiri(biaya, 1.9)
        nama_tetap = sinema.label("biaya tetap", ukuran=24, warna=AKSEN2).next_to(tetap, DOWN, buff=0.15)
        nama_n = sinema.label("n barang", ukuran=24, warna=AKSEN).next_to(per_barang, DOWN, buff=0.15)
        rata, rata_atas, rata_bawah = pecahan(r"\text{rata-rata} =", r"5.000.000 + 20.000\,n", r"n", ukuran=40)
        di_kiri(rata, 0.2)
        with sinema.babak(self, "pabrik", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sebuah")
            b.main(FadeOut(ke_takhingga), FadeOut(panah_tumbuh), run_time=0.3)
            ident = sinema.identitas(self, "biaya pabrik")
            ident.set_opacity(0.0)
            b.main(ident.animate.set_opacity(1.0), run_time=0.3)
            b.tunggu_kata("biaya")
            b.main(Write(tetap), FadeIn(nama_tetap), run_time=0.9)
            b.tunggu_kata("ditambah")
            b.main(Write(per_barang), FadeIn(nama_n), run_time=0.9)
            b.tunggu_kata("Berapa")
            b.main(Write(rata), run_time=1.4)
        qc.periksa_adegan(self, {"biaya": biaya, "rata": rata}, hud=hud(ident, papan),
                          tulisan={"nama tetap": nama_tetap, "nama n": nama_n})

        # ============ angka: 100, 1.000, 10.000 barang =================== #
        def baris(i, kiri, kanan, warna=AKSEN):
            y = 1.9 - i * 0.62
            a = rumus(kiri, 30, TINTA).move_to([X_KANAN - 1.2, y, 0])
            c = rumus(kanan, 30, warna).move_to([X_KANAN + 1.2, y, 0])
            return VGroup(a, c)

        r1 = baris(0, r"n = 100", r"70.000")
        r2 = baris(1, r"n = 1.000", r"25.000")
        r3 = baris(2, r"n = 10.000", r"20.500")
        r4 = baris(3, r"n \to \infty", r"20.000", SOROT)
        with sinema.babak(self, "angka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Seratus")
            b.main(FadeIn(r1, shift=LEFT * 0.16), run_time=0.7)
            b.tunggu_kata("Seribu")
            b.main(FadeIn(r2, shift=LEFT * 0.16), run_time=0.7)
            b.tunggu_kata("Sepuluh")
            b.main(FadeIn(r3, shift=LEFT * 0.16), run_time=0.7)
        qc.periksa_adegan(self, {"biaya": biaya, "rata": rata}, hud=hud(ident, papan),
                          tulisan={"nama tetap": nama_tetap, "nama n": nama_n, "r1": r1, "r2": r2, "r3": r3})

        # ============ merapat ke 20.000, tidak pernah sampai ============= #
        kotak = SurroundingRectangle(r4, buff=0.14).set_stroke(SOROT, 2.5).set_fill(opacity=0)
        pecah, pecah_atas, pecah_bawah = pecahan(r"= 20.000 +", r"5.000.000", r"n", ukuran=40)
        di_kiri(pecah, -1.4)
        with sinema.babak(self, "merapat", DURASI, kata=KATA) as b:
            b.tunggu_kata("merapat")
            b.main(FadeIn(r4, shift=LEFT * 0.16), run_time=0.6)
            b.tunggu_kata("tidak")
            b.main(ShowCreation(kotak), run_time=0.7)
            b.tunggu_kata("Biaya")
            b.main(Write(pecah), run_time=1.3)
            b.tunggu_kata("sedikit")
            ps = pita_atas(pecah[1])
            b.main(FadeIn(ps), run_time=0.4)
            b.main(FadeOut(ps), run_time=0.4)
        tabel = VGroup(r1, r2, r3, r4)
        qc.periksa_adegan(self, {"biaya": biaya, "rata": rata, "pecah": pecah, "kotak": kotak},
                          hud=hud(ident, papan),
                          tulisan={"nama tetap": nama_tetap, "nama n": nama_n, "tabel": tabel})

        # ============ tak hingga bukan bilangan ========================== #
        besar_inf = rumus(r"\infty", 96, AKSEN).move_to([-3.2, 0.5, 0])
        salah = rumus(r"x = \infty", 44, AKSEN).move_to([2.2, 0.5, 0])
        coret_salah = Line(salah.get_left() + LEFT * 0.1, salah.get_right() + RIGHT * 0.1).set_stroke(AKSEN, 4)
        with sinema.babak(self, "bukanbilangan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sebelum")
            b.main(FadeOut(ident), run_time=0.25)
            ident = sinema.identitas(self, "tak hingga")
            ident.set_opacity(0.0)
            b.main(ident.animate.set_opacity(1.0), run_time=0.3)
            # Pabrik dibersihkan pada "diluruskan", bukan di awal babak: kalau
            # di awal, layar kosong tiga detik sebelum tak hingga muncul.
            b.tunggu_kata("diluruskan")
            b.main(FadeOut(biaya), FadeOut(nama_tetap), FadeOut(nama_n), FadeOut(rata), FadeOut(pecah),
                   FadeOut(tabel), FadeOut(kotak), run_time=0.5)
            b.tunggu_kata("Tak")
            b.main(FadeIn(besar_inf, scale=1.3), run_time=0.6)
            b.tunggu_kata("dimasukkan")
            b.main(Write(salah), run_time=0.8)
            b.tunggu_kata("sebab")
            b.main(ShowCreation(coret_salah), run_time=0.5)
        qc.periksa_adegan(self, {"inf": besar_inf, "coret": coret_salah}, hud=hud(ident, papan),
                          tulisan={"salah": salah})

        # ============ tak hingga adalah keterangan arah ================== #
        garis_arah = Line([-5.0, -1.3, 0], [4.6, -1.3, 0]).set_stroke(REDUP, 2.5)
        garis_arah.latar = True
        ujung = Arrow([3.8, -1.3, 0], [5.6, -1.3, 0], buff=0, thickness=3).set_color(SOROT)
        xa = ValueTracker(-4.2)
        titik_arah = always_redraw(lambda: Dot([xa.get_value(), -1.3, 0], radius=0.1).set_color(AKSEN))
        lab_arah = rumus(r"x \to \infty", 36, SOROT).next_to(ujung, UP, buff=0.2)
        with sinema.babak(self, "arah", DURASI, kata=KATA) as b:
            b.tunggu_kata("keterangan")
            b.main(FadeOut(salah), FadeOut(coret_salah), run_time=0.3)
            b.main(ShowCreation(garis_arah), ShowCreation(ujung), run_time=0.8)
            self.add(titik_arah)
            b.tunggu_kata("dibuat")
            b.main(xa.animate.set_value(3.4), run_time=1.6, rate_func=linear)
            b.tunggu_kata("tanpa")
            b.main(FadeIn(lab_arah, shift=UP * 0.1), run_time=0.6)
        qc.periksa_adegan(self, {"inf": besar_inf, "ujung": ujung, "titik": titik_arah},
                          hud=hud(ident, papan), dunia={"garis": garis_arah}, tulisan={"lab": lab_arah})

        # ============ alat utama: 1/x menuju 0 =========================== #
        satu_per_x = rumus(r"\frac{1}{x}", 64, TINTA).move_to([-3.6, 0.8, 0])
        c1 = rumus(r"x = 10:\quad \frac{1}{10} = 0{,}1", 36, TINTA).move_to([1.8, 1.4, 0])
        c2 = rumus(r"x = 1.000:\quad \frac{1}{1.000} = 0{,}001", 36, TINTA).move_to([1.8, 0.2, 0])
        with sinema.babak(self, "alat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Alat")
            titik_arah.clear_updaters()
            b.main(FadeOut(besar_inf), FadeOut(garis_arah), FadeOut(ujung), FadeOut(titik_arah),
                   FadeOut(lab_arah), FadeOut(ident), run_time=0.4)
            ident = sinema.identitas(self, "alat utama")
            ident.set_opacity(0.0)
            b.main(ident.animate.set_opacity(1.0), run_time=0.3)
            b.tunggu_kata("satu")
            b.main(Write(satu_per_x), run_time=1.0)
            b.tunggu_kata("sepuluh")
            b.main(Write(c1), run_time=1.0)
            b.tunggu_kata("seribu")
            b.main(Write(c2), run_time=1.1)
            b.tunggu_kata("menuju")
            sinema.lahir_rumus(self, r"\frac{1}{x} \to 0", satu_per_x, papan, b=b, warna=SOROT,
                               sebagai_utama=False, geser=np.array([0.0, -1.7, 0.0]), tahan=0.2,
                               run_time=0.8)
        qc.periksa_adegan(self, {"satu per x": satu_per_x}, hud=hud(ident, papan), tulisan={"c1": c1, "c2": c2})

        # ============ soal: bagi dengan pangkat tertinggi ================ #
        soal, s_atas, s_bawah = pecahan(r"\lim_{x \to \infty}", r"3x^2 + 2x", r"x^2 - 5", ukuran=44)
        di_kiri(soal, 1.6)
        ga, gb = s_atas.family_members_with_points(), s_bawah.family_members_with_points()
        x2_atas = VGroup(*ga[1:3])
        x2_bawah = VGroup(*gb[0:2])
        bagi_atas = rumus(r": x^2", 26, AKSEN).next_to(s_atas, RIGHT, buff=0.25)
        bagi_bawah = rumus(r": x^2", 26, AKSEN).next_to(s_bawah, RIGHT, buff=0.25)
        with sinema.babak(self, "soal", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ambil")
            b.main(FadeOut(satu_per_x), FadeOut(c1), FadeOut(c2), FadeOut(ident), run_time=0.4)
            ident = sinema.identitas(self, "pangkat tertinggi")
            ident.set_opacity(0.0)
            b.main(Write(soal), ident.animate.set_opacity(1.0), run_time=1.4)
            b.tunggu_kata("Pangkat")
            px = VGroup(pita_atas(x2_atas), pita_atas(x2_bawah))
            b.main(FadeIn(px), run_time=0.4)
            b.main(FadeOut(px), run_time=0.5)
            b.tunggu_kata("semuanya")
            b.main(FadeIn(bagi_atas, shift=RIGHT * 0.1), FadeIn(bagi_bawah, shift=RIGHT * 0.1), run_time=0.6)
        qc.periksa_adegan(self, {"soal": soal}, hud=hud(ident, papan),
                          tulisan={"bagi atas": bagi_atas, "bagi bawah": bagi_bawah})

        # ============ pembilang 3 + 2/x, penyebut 1 - 5/x^2 ============== #
        baris2, b2_atas, b2_bawah = pecahan(r"= \lim_{x \to \infty}", r"3 + \dfrac{2}{x}", r"1 - \dfrac{5}{x^2}",
                                            ukuran=44)
        di_kiri(baris2, -0.3)
        g2a, g2b = b2_atas.family_members_with_points(), b2_bawah.family_members_with_points()
        # glyph pembilang: 3 + 2 (garis) x ; penyebut: 1 - 5 (garis) x 2
        kecil_atas = VGroup(*g2a[2:])
        kecil_bawah = VGroup(*g2b[2:])
        nol_atas = rumus(r"\to 0", 26, SOROT).next_to(kecil_atas, RIGHT, buff=0.15)
        nol_bawah = rumus(r"\to 0", 26, SOROT).next_to(kecil_bawah, RIGHT, buff=0.15)
        with sinema.babak(self, "bagi", DURASI, kata=KATA) as b:
            b.tunggu_kata("Pembilangnya")
            b.main(FadeOut(bagi_atas), FadeOut(bagi_bawah), run_time=0.3)
            b.main(Write(baris2), run_time=1.5)
            b.tunggu_kata("Penyebutnya")
            pb = pita_atas(b2_bawah)
            b.main(FadeIn(pb), run_time=0.4)
            b.main(FadeOut(pb), run_time=0.4)
            b.tunggu_kata("kedua")
            pk = VGroup(pita_atas(kecil_atas), pita_atas(kecil_bawah))
            b.main(FadeIn(pk), run_time=0.4)
            b.tunggu_kata("menuju")
            b.main(FadeOut(pk), FadeIn(nol_atas), FadeIn(nol_bawah), run_time=0.5)
        qc.periksa_adegan(self, {"soal": soal, "baris 2": baris2}, hud=hud(ident, papan),
                          tulisan={"nol atas": nol_atas, "nol bawah": nol_bawah})

        # ============ sisanya 3 : 1, limitnya 3 ========================== #
        sisa, _, _ = pecahan("=", "3", "1", ukuran=44)
        sisa.next_to(baris2, RIGHT, buff=0.9)
        hasil = rumus("= 3", 48, SOROT).next_to(sisa, RIGHT, buff=0.3)
        with sinema.babak(self, "hasil", DURASI, kata=KATA) as b:
            b.tunggu_kata("tersisa")
            b.main(Write(sisa), run_time=0.9)
            b.tunggu_kata("limitnya")
            b.main(FadeIn(hasil, scale=1.3), run_time=0.5)
            sinema.lahir_rumus(self, r"\lim_{x \to \infty} \frac{3x^2 + 2x}{x^2 - 5} = 3", hasil, papan,
                               b=b, warna=SOROT, sebagai_utama=False, geser=np.array([3.2, 0.6, 0.0]),
                               tahan=0.2, run_time=0.8)
        qc.periksa_adegan(self, {"soal": soal, "baris 2": baris2, "sisa": sisa}, hud=hud(ident, papan),
                          tulisan={"nol atas": nol_atas, "nol bawah": nol_bawah, "hasil": hasil})

        # ============ grafiknya: asimtot datar y = 3 ===================== #
        sumbu = papan_grafik((0, 44, 10), (0, 9, 3), 6.4, 3.6, PUSAT_GRAFIK)
        cp = sumbu.c2p
        angka = VGroup(*[rumus(str(i), 22, REDUP).next_to(cp(i, 0), DOWN, buff=0.12) for i in (10, 20, 30, 40)],
                       *[rumus(str(j), 22, REDUP).next_to(cp(0, j), LEFT, buff=0.12) for j in (3, 6, 9)])
        sumbu.angka = angka
        # dimulai dari 3,4: di x = akar 5 penyebutnya nol dan kurvanya meledak.
        kurva = ParametricCurve(lambda x: cp(x, f(x)), t_range=(3.4, 43.5, 0.1)).set_stroke(TINTA, 4.5)
        asimtot = DashedLine(cp(0, 3), cp(43.5, 3), dash_length=0.14).set_stroke(SOROT, 3)
        lab_y3 = rumus("y = 3", 30, SOROT).next_to(cp(40, 3), UP, buff=0.14)
        nama_asimtot = sinema.label("asimtot datar", ukuran=28, warna=SOROT).move_to([X_KANAN, 0.4, 0])
        with sinema.babak(self, "asimtot", DURASI, kata=KATA) as b:
            b.tunggu_kata("grafiknya")
            b.main(FadeOut(soal), FadeOut(baris2), FadeOut(sisa), FadeOut(hasil), FadeOut(nol_atas),
                   FadeOut(nol_bawah), FadeOut(ident), run_time=0.3)
            ident = sinema.identitas(self, "asimtot datar")
            ident.set_opacity(0.0)
            b.main(ShowCreation(sumbu), FadeIn(angka), ident.animate.set_opacity(1.0), run_time=0.8)
            b.tunggu_kata("merapat")
            b.main(ShowCreation(kurva), run_time=0.7)
            b.tunggu_kata("y")
            b.main(ShowCreation(asimtot), FadeIn(lab_y3), run_time=1.0)
            b.tunggu_kata("asimtot")
            b.main(FadeIn(nama_asimtot, shift=UP * 0.1), run_time=0.6)
        qc.periksa_adegan(self, {"kurva": kurva, "asimtot": asimtot}, hud=hud(ident, papan),
                          dunia={"sumbu": sumbu}, tulisan={"y3": lab_y3, "nama": nama_asimtot})

        # ============ penutup: diperbesar, selisihnya tidak pernah nol === #
        zoom, cz = papan_manual(20, 60, 2.9, 3.3, 6.4, 3.6, PUSAT_GRAFIK)
        angka_z = VGroup(*[rumus(str(i), 22, REDUP).next_to(cz(i, 2.9), DOWN, buff=0.12) for i in (30, 40, 50)],
                         *[rumus(f"3{{,}}{j}", 22, REDUP).next_to(cz(20, 3 + j / 10), LEFT, buff=0.12)
                           for j in (0, 1, 2)])
        zoom.angka = angka_z
        kurva_z = ParametricCurve(lambda x: cz(x, f(x)), t_range=(20, 59.5, 0.1)).set_stroke(TINTA, 4.5)
        asimtot_z = DashedLine(cz(20, 3), cz(59.5, 3), dash_length=0.14).set_stroke(SOROT, 3)
        lab_y3_z = rumus("y = 3", 30, SOROT).next_to(cz(56, 3), DOWN, buff=0.14)
        cap_zoom = sinema.label("panel diperbesar", ukuran=24, warna=REDUP).move_to([X_KANAN + 0.3, 1.9, 0])
        selisih = Line(cz(35, f(35)), cz(35, 3)).set_stroke(AKSEN, 5)
        lab_selisih = rumus(r"0{,}07", 30, AKSEN).next_to(selisih, RIGHT, buff=0.15)
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("sedekat")
            b.main(FadeOut(nama_asimtot), FadeOut(angka), FadeOut(lab_y3), run_time=0.3)
            b.main(ReplacementTransform(sumbu, zoom), ReplacementTransform(kurva, kurva_z),
                   ReplacementTransform(asimtot, asimtot_z), FadeIn(angka_z), FadeIn(lab_y3_z),
                   FadeIn(cap_zoom), run_time=1.4)
            b.tunggu_kata("selisihnya")
            b.main(ShowCreation(selisih), FadeIn(lab_selisih), run_time=0.8)
            b.tunggu_kata("benar-benar")
            sorot_selisih = Line(cz(35, f(35)), cz(35, 3)).set_stroke(SOROT, 16, opacity=0.4)
            b.main(ShowCreationThenFadeOut(sorot_selisih), run_time=1.0)
            self.remove(sorot_selisih)
            b.tunggu_kata("beda")
            b.main(papan.sorot(), run_time=1.0)
        qc.periksa_adegan(self, {"kurva": kurva_z, "asimtot": asimtot_z, "selisih": selisih},
                          hud=hud(ident, papan), dunia={"sumbu": zoom},
                          tulisan={"y3": lab_y3_z, "cap": cap_zoom, "selisih": lab_selisih})

        # ============ menunjuk Limit Trigonometri Bagian 1 =============== #
        lanjut = VGroup(teks("Limit Trigonometri dan Kekontinuan,", 28, SOROT),
                        teks("Bagian 1", 28, SOROT)).arrange(DOWN, buff=0.12).move_to([X_KANAN + 0.3, 0.9, 0])
        sinema.batasi_lebar(lanjut, 5.4)
        sinx = rumus(r"\frac{\sin x}{x} \to 1", 44, SOROT).move_to([X_KANAN + 0.3, -0.7, 0])
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Limit")
            b.main(FadeIn(lanjut, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("sinus")
            b.main(Write(sinx), run_time=1.2)
        qc.periksa_adegan(self, {"kurva": kurva_z, "asimtot": asimtot_z, "selisih": selisih},
                          hud=hud(ident, papan), dunia={"sumbu": zoom},
                          tulisan={"y3": lab_y3_z, "cap": cap_zoom, "selisih": lab_selisih,
                                   "lanjut": lanjut, "sin": sinx})

        sinema.laporkan_pemicu(self)
