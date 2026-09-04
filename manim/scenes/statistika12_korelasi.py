"""Materi 12 Statistika: korelasi bukan sebab-akibat (ManimGL). Penutup topik.

Naskah: manim/narasi/statistika12-korelasi.json (10 segmen, 121,4 detik)

GAGASAN POKOK. Halaman bisa menulis "r cuma mengukur kelurusan". Yang tidak
bisa dilakukan halaman: memperlihatkan PARABOLA yang hubungannya sempurna
sementara garis lurus terbaiknya mendatar dan r-nya nol persis. Tujuh titik
y = x kuadrat, ditarik satu per satu dari rumusnya, lalu garis terbaik yang
tumbuh mendatar di tengahnya. Itu bukti bergerak bahwa angka r saja tidak
pernah cukup, dan itulah puncak videonya.

Angka diperiksa ulang dengan Python terhadap halamannya:
    jam belajar dan nilai   r = 0,98   r kuadrat = 0,97
    jam main gim dan nilai  r = -0,98
    y = x kuadrat, x dari -3 sampai 3   r = 0,00 PERSIS

TATA LETAK (standar video versi 2):
    kiri atas  identitas benda, menetap
    kanan atas papan rumus, berubah lewat morph
    kaki layar milik subtitle, dijaga qc
    dalam gambar label maksimal dua kata

SATU WARNA SATU MAKNA DI DALAM VIDEO INI:
    AKSEN2 biru = hubungan positif      AKSEN bata = hubungan negatif, peringatan
    SOROT ungu  = garis terbaik dan angka r
    TINTA/REDUP = titik parabola, sumbu, tulisan

Kamera phi 90, tegak lurus.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "statistika12-korelasi"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

BELAJAR = [(2, 55), (3, 58), (4, 64), (5, 63), (6, 70), (7, 72), (8, 75), (9, 80), (10, 78), (11, 85)]
GIM = [(1, 88), (2, 85), (3, 80), (4, 82), (5, 75), (6, 72), (7, 70), (8, 65), (9, 66), (10, 60)]
PARABOLA = [(x, x * x) for x in range(-3, 4)]

# --- Bidang untuk data siswa: jam 0 sampai 12, nilai 51 sampai 89.
SKALA_X, PUSAT_JAM = 0.7167, 6.0
# Dinaikkan 4 Sep: tengah atas layar bebas.
SKALA_Y, DASAR_NILAI = 0.0880, 51.0
ANGKA_X = [0, 2, 4, 6, 8, 10, 12]
ANGKA_Y = [55, 65, 75, 85]

# --- Bidang untuk parabola: x dari -4 sampai 4, y dari -1 sampai 10.
# Puncak parabola y = 9 harus berhenti di bawah jalur panel (layar y = 1,10),
# jadi satu satuan y tidak boleh lebih dari 0,216 satuan dunia.
SKALA_PX, SKALA_PY = 1.02, 0.280
ANGKA_PX = [-3, -2, -1, 0, 1, 2, 3]
ANGKA_PY = [0, 3, 6, 9]

Z_DASAR = -1.08
Z_ANGKA = Z_DASAR - 0.32
X_SUMBU_Y = -4.72
Z_KAMERA = 0.50
TINGGI_BINGKAI = 6.4


def tegak(mob):
    """Berdirikan benda datar di bidang xz supaya menghadap kamera."""
    return mob.rotate(90 * DEGREES, RIGHT)


def xj(jam):
    return (jam - PUSAT_JAM) * SKALA_X


def zn(nilai):
    return Z_DASAR + (nilai - DASAR_NILAI) * SKALA_Y


def xp(x):
    return x * SKALA_PX


def zp(y):
    return Z_DASAR + (y + 1.0) * SKALA_PY


class Korelasi12(AdeganMatra):
    samples = 4                        # penghalus tepi; bawaan ManimGL 0

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        DUNIA, HUD, TULISAN = {}, {}, {}
        # Identitas harus benar SEPANJANG video. Menyebut "10 siswa" membantah
        # empat babak terakhir, yang isinya tujuh titik parabola, bukan siswa.
        HUD["identitas"] = sinema.identitas(self, "kekuatan hubungan",
                                            "diukur dengan r")

        def taruh(nama, mob, tulisan=False):
            DUNIA[nama] = mob
            if tulisan:
                TULISAN[nama] = mob
            return mob

        def buang(*nama):
            for n in nama:
                DUNIA[n] = None
                TULISAN.pop(n, None)

        def periksa(pasangan=None):
            hidup_d = {k: v for k, v in DUNIA.items() if v is not None}
            hidup_h = {k: v for k, v in HUD.items() if v is not None}
            if papan.semua() is not None:
                hidup_h["papan rumus"] = papan.semua()
            hidup_t = {k: v for k, v in TULISAN.items() if v is not None}
            qc.periksa_adegan(self, {}, pasangan=pasangan, hud=hidup_h,
                              dunia=hidup_d, tulisan=hidup_t, jaga_jalur_bawah=True)

        # ------------------------------------------------------------------
        # Bidang siswa
        # ------------------------------------------------------------------
        sumbu_x = Line([xj(-0.8), 0, Z_DASAR], [xj(12.8), 0, Z_DASAR]).set_stroke(REDUP, 2.4)
        sumbu_y = Line([X_SUMBU_Y, 0, Z_DASAR], [X_SUMBU_Y, 0, zn(88)]).set_stroke(REDUP, 2.4)
        angka_satuan, angka = {}, VGroup()
        for j in ANGKA_X:
            angka.add(Line([xj(j), 0, Z_DASAR], [xj(j), 0, Z_DASAR - 0.10]).set_stroke(REDUP, 1.6))
            t = tegak(rumus(str(j), 20, REDUP)).move_to([xj(j), 0, Z_ANGKA])
            angka.add(t)
            angka_satuan[f"x{j}"] = t
        for v in ANGKA_Y:
            angka.add(Line([X_SUMBU_Y, 0, zn(v)], [X_SUMBU_Y - 0.10, 0, zn(v)])
                      .set_stroke(REDUP, 1.6))
            t = tegak(rumus(str(v), 20, REDUP)).move_to([X_SUMBU_Y - 0.38, 0, zn(v)])
            angka.add(t)
            angka_satuan[f"y{v}"] = t

        def awan(pasangan, warna, fx, fz, jari=0.078):
            g = VGroup()
            for a, c in pasangan:
                d = Dot(radius=jari).set_fill(warna, 1).set_stroke(LATAR, 1.0)
                g.add(tegak(d).move_to([fx(a), 0, fz(c)]))
            return g

        titik = awan(BELAJAR, AKSEN2, xj, zn)
        titik_gim = awan(GIM, AKSEN, xj, zn)
        garis_naik = Line([xj(2), 0, zn(55.6)], [xj(11), 0, zn(84.4)]).set_stroke(SOROT, 3.0)
        garis_turun = Line([xj(1), 0, zn(87.9)], [xj(10), 0, zn(60.7)]).set_stroke(SOROT, 3.0)

        # ------------------------------------------------------------------
        # Bidang parabola
        # ------------------------------------------------------------------
        p_sumbu_x = Line([xp(-4.2), 0, zp(0)], [xp(4.2), 0, zp(0)]).set_stroke(REDUP, 2.4)
        p_sumbu_y = Line([xp(0), 0, zp(-1)], [xp(0), 0, zp(10.4)]).set_stroke(REDUP, 2.4)
        p_angka_satuan, p_angka = {}, VGroup()
        for x in ANGKA_PX:
            if x == 0:
                continue
            p_angka.add(Line([xp(x), 0, zp(0)], [xp(x), 0, zp(-0.4)]).set_stroke(REDUP, 1.6))
            t = tegak(rumus(str(x), 20, REDUP)).move_to([xp(x), 0, zp(-0.9)])
            p_angka.add(t)
            p_angka_satuan[f"px{x}"] = t
        for y in ANGKA_PY:
            if y == 0:
                continue
            p_angka.add(Line([xp(0), 0, zp(y)], [xp(-0.16), 0, zp(y)]).set_stroke(REDUP, 1.6))
            t = tegak(rumus(str(y), 20, REDUP)).move_to([xp(-0.44), 0, zp(y)])
            p_angka.add(t)
            p_angka_satuan[f"py{y}"] = t

        titik_p = awan(PARABOLA, TINTA, xp, zp, jari=0.072)
        lengkung = VMobject().set_points_smoothly(
            [np.array([xp(x / 10), 0, zp((x / 10) ** 2)]) for x in range(-30, 31, 2)])
        lengkung.set_stroke(REDUP, 2.4)
        # Garis lurus terbaik untuk parabola ini: y rata-rata = 4, mendatar.
        garis_datar = Line([xp(-3.4), 0, zp(4)], [xp(3.4), 0, zp(4)]).set_stroke(SOROT, 3.2)

        # ==================================================================
        # Babak 1 `buka`: kekuatan hubungan diberi angka.
        # ==================================================================
        kamera.pasang_awal(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA), tinggi=TINGGI_BINGKAI)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 12: Korelasi bukan sebab", lama=3.2, y=2.6)
            b.catat(3.2)
            # Dua benda pipih, bukan satu kotak sebesar grafik; lihat
            # catatan yang sama di statistika11_regresi.py.
            taruh("sumbu datar", sumbu_x)
            taruh("sumbu tegak", sumbu_y)
            taruh("angka", angka)
            TULISAN.update(angka_satuan)
            b.main(ShowCreation(sumbu_x), ShowCreation(sumbu_y), FadeIn(angka), run_time=1.6)
            taruh("titik", titik)
            b.main(LaggedStart(*[FadeIn(m, scale=0.4) for m in titik],
                               lag_ratio=0.12), run_time=3.0)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.8, color=AKSEN2, **kw),
                titik, lag_ratio=0.1), run_time=2.0)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 2 `kuat`: r = 0,98, titiknya rapat ke garis.
        # ==================================================================
        with sinema.babak(self, "kuat", DURASI) as b:
            taruh("garis", garis_naik)
            b.main(ShowCreation(garis_naik), run_time=2.0)
            sinema.lahir_rumus(self, r"r = 0{,}98", garis_naik, papan, b=b, warna=SOROT)
            b.main(Indicate(titik, scale_factor=1.06, color=AKSEN2), run_time=1.6)
            b.main(Indicate(papan.utama, scale_factor=1.2, color=SOROT), run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 3 `arah`: data lain, garisnya turun, r nya minus.
        # ==================================================================
        with sinema.babak(self, "arah", DURASI) as b:
            b.main(FadeOut(titik), FadeOut(garis_naik), run_time=1.0)
            buang("titik", "garis")
            taruh("titik gim", titik_gim)
            taruh("garis", garis_turun)
            b.main(LaggedStart(*[FadeIn(m, scale=0.4) for m in titik_gim],
                               lag_ratio=0.1), run_time=2.4)
            b.main(ShowCreation(garis_turun), run_time=1.8)
            sinema.ganti_rumus(self, papan.utama, r"r = -0{,}98", b=b,
                               run_time=1.6, papan=papan)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 4 `baca`: tanda itu arah, besarnya kekuatan.
        # ==================================================================
        skala_r = Line([-2.60, 0, zn(88.5)], [2.60, 0, zn(88.5)]).set_stroke(REDUP, 2.4)
        tanda_r = VGroup(*[Line([x, 0, zn(88.5) - 0.09], [x, 0, zn(88.5) + 0.09])
                           .set_stroke(REDUP, 1.8) for x in (-2.60, 0.0, 2.60)])
        l_kiri = tegak(rumus("-1", 20, AKSEN)).move_to([-2.60, 0, zn(88.5) + 0.32])
        l_tengah = tegak(rumus("0", 20, REDUP)).move_to([0.0, 0, zn(88.5) + 0.32])
        l_kanan = tegak(rumus("1", 20, AKSEN2)).move_to([2.60, 0, zn(88.5) + 0.32])

        with sinema.babak(self, "baca", DURASI) as b:
            taruh("skala r", VGroup(skala_r, tanda_r))
            taruh("r kiri", l_kiri, tulisan=True)
            taruh("r tengah", l_tengah, tulisan=True)
            taruh("r kanan", l_kanan, tulisan=True)
            b.main(ShowCreation(skala_r), ShowCreation(tanda_r), run_time=1.6)
            b.main(FadeIn(l_kiri), FadeIn(l_tengah), FadeIn(l_kanan), run_time=1.2)
            b.main(Indicate(l_kiri, scale_factor=1.4, color=AKSEN),
                   Indicate(l_kanan, scale_factor=1.4, color=AKSEN2), run_time=1.6)
            b.main(Indicate(l_tengah, scale_factor=1.4, color=REDUP), run_time=1.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 5 `kuadrat`: r dikuadratkan, artinya jadi terpakai.
        # ==================================================================
        with sinema.babak(self, "kuadrat", DURASI) as b:
            b.main(FadeOut(titik_gim), FadeOut(garis_turun), run_time=1.0)
            buang("titik gim", "garis")
            taruh("titik", titik)
            taruh("garis", garis_naik)
            b.main(LaggedStart(*[FadeIn(m, scale=0.4) for m in titik], lag_ratio=0.06),
                   run_time=1.8)
            b.main(ShowCreation(garis_naik), run_time=1.4)
            sinema.ganti_rumus(self, papan.utama, r"r^2 = 0{,}97", b=b,
                               run_time=1.6, papan=papan)
            papan.baris(r"97\% \text{ dijelaskan}", SOROT)
            b.catat(1.0)
            b.main(Indicate(papan.semua(), scale_factor=1.1, color=SOROT), run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 6 `sisa`: tiga persennya dari hal lain.
        # ==================================================================
        with sinema.babak(self, "sisa", DURASI) as b:
            papan.baris(r"3\% \text{ dari hal lain}", REDUP)
            b.catat(1.0)
            b.main(Indicate(papan.baris_lain[-1], scale_factor=1.2, color=REDUP), run_time=1.6)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.7, color=AKSEN2, **kw),
                titik, lag_ratio=0.09), run_time=2.2)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 7 `jebakan`: tujuh titik, y persis sama dengan x kuadrat.
        # ==================================================================
        with sinema.babak(self, "jebakan", DURASI) as b:
            # Skala r ikut dipadamkan. Ia milik babak `baca` dan kalau tertinggal
            # ia melayang di atas parabola tanpa arti (terlihat di render pertama).
            b.main(FadeOut(titik), FadeOut(garis_naik), FadeOut(angka), FadeOut(sumbu_x),
                   FadeOut(sumbu_y), FadeOut(papan.semua()),
                   FadeOut(VGroup(skala_r, tanda_r)), FadeOut(l_kiri), FadeOut(l_tengah),
                   FadeOut(l_kanan), run_time=1.4)
            buang("titik", "garis", "angka", "sumbu datar", "sumbu tegak", "skala r",
                  "r kiri", "r tengah", "r kanan", *angka_satuan.keys())
            papan.utama = None
            papan.baris_lain = []
            taruh("sumbu parabola", VGroup(p_sumbu_x, p_sumbu_y))
            taruh("angka parabola", p_angka)
            TULISAN.update(p_angka_satuan)
            b.main(ShowCreation(p_sumbu_x), ShowCreation(p_sumbu_y), FadeIn(p_angka),
                   run_time=1.6)
            taruh("titik parabola", titik_p)
            b.main(LaggedStart(*[FadeIn(m, scale=0.4) for m in titik_p], lag_ratio=0.16),
                   run_time=3.0)
            taruh("lengkung", lengkung)
            b.main(ShowCreation(lengkung), run_time=2.2)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 8 `nol`: tetapi r nya NOL, dan garis lurus terbaiknya mendatar.
        # ==================================================================
        with sinema.babak(self, "nol", DURASI) as b:
            taruh("garis datar", garis_datar)
            b.main(ShowCreation(garis_datar), run_time=2.0)
            sinema.lahir_rumus(self, r"r = 0", garis_datar, papan, b=b, warna=AKSEN)
            b.main(Indicate(garis_datar, scale_factor=1.04, color=AKSEN), run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 9 `lihat`: selalu lihat gambarnya.
        # ==================================================================
        l_sempurna = tegak(sinema.label("hubungan sempurna", 19, TINTA))
        l_sempurna.move_to([xp(2.0), 0, zp(8.6)])

        with sinema.babak(self, "lihat", DURASI) as b:
            taruh("label sempurna", l_sempurna, tulisan=True)
            b.main(FadeIn(l_sempurna), run_time=1.2)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.7, color=TINTA, **kw),
                titik_p, lag_ratio=0.12), run_time=2.4)
            b.main(Indicate(papan.utama, scale_factor=1.3, color=AKSEN), run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 10 `sebab`: korelasi bukan sebab-akibat.
        # ==================================================================
        with sinema.babak(self, "sebab", DURASI) as b:
            b.main(FadeOut(l_sempurna), run_time=0.8)
            buang("label sempurna")
            sinema.ganti_rumus(self, papan.utama, r"\text{bukan sebab-akibat}", b=b,
                               run_time=1.8, papan=papan)
            b.main(Indicate(papan.utama, scale_factor=1.2, color=AKSEN), run_time=1.6)
            b.main(Indicate(VGroup(titik_p, lengkung), scale_factor=1.05, color=TINTA),
                   run_time=1.6)
            b.main(Indicate(garis_datar, scale_factor=1.04, color=AKSEN), run_time=1.6)
            b.jeda(1.4)
        periksa()
