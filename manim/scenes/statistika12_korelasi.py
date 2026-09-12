"""Statistika Materi 12, Hubungan Dua Variabel Bagian 3: korelasi bukan
sebab-akibat (ManimGL).
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (2:01)
yang sudah disetujui ARYA. DUNIANYA SAMA: awan jam belajar dengan garis
naik dan r = 0,98; awan jam main gim dengan garis turun dan r = -0,98;
skala r dari -1 sampai 1; r kuadrat 0,97; tujuh titik y = x kuadrat yang
ditarik satu per satu, lengkungnya, dan garis lurus terbaik yang mendatar
dengan r = 0.

YANG BERBEDA: pembuka sub-bab plus Bagian 3 dengan pertanyaan halaman
(r = 0,98 besar di layar dan tanda tanya sebab-akibat); segar-ingat Bagian 1
(rapat lawan berserakan, dibaca dengan mata); bentuk umum r antara -1 dan 1,
tanda, besar, r kuadrat di panel; penutup menjawab pertanyaan pembuka lalu
menunjuk Bagian 4; tiap kejadian dipicu pada KATA; sorotan memakai pita
tembus pandang.

Angka diperiksa ulang dengan Python terhadap halamannya:
    jam belajar dan nilai   r = 0,98   r kuadrat = 0,97
    jam main gim dan nilai  r = -0,98
    y = x kuadrat, x dari -3 sampai 3   r = 0,00 PERSIS

SATU WARNA SATU MAKNA: AKSEN2 biru = hubungan positif, AKSEN bata = hubungan
negatif dan peringatan, SOROT ungu = garis terbaik, angka r, sorotan,
TINTA/REDUP = titik parabola, sumbu, tulisan. Kamera phi 90.
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
KATA = sinema.JamKata(TOPIK)

BELAJAR = [(2, 55), (3, 58), (4, 64), (5, 63), (6, 70), (7, 72), (8, 75), (9, 80), (10, 78), (11, 85)]
GIM = [(1, 88), (2, 85), (3, 80), (4, 82), (5, 75), (6, 72), (7, 70), (8, 65), (9, 66), (10, 60)]
LEMAH = [(2, 62), (3, 55), (4, 72), (5, 60), (6, 78), (7, 64), (8, 70), (9, 84), (10, 68), (11, 80)]
PARABOLA = [(x, x * x) for x in range(-3, 4)]

SKALA_X, PUSAT_JAM = 0.7167, 6.0
SKALA_Y, DASAR_NILAI = 0.0880, 51.0
ANGKA_X = [0, 2, 4, 6, 8, 10, 12]
ANGKA_Y = [55, 65, 75, 85]

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

    def sorot_pita(self, b, *mobs, lama=1.0, lebih=0.2):
        pita = VGroup()
        for m in mobs:
            p = Rectangle(width=m.get_width() + lebih, height=m.get_depth() + lebih)
            p.set_stroke(width=0).set_fill(SOROT, 0.35)
            pita.add(tegak(p).move_to(m.get_center() + IN * 0.02))
        self.add(pita)
        b.main(FadeIn(pita), run_time=lama * 0.35)
        b.main(FadeOut(pita), run_time=lama * 0.65)
        self.remove(pita)

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        DUNIA, HUD, TULISAN = {}, {}, {}

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

        # Bidang siswa
        sumbu_x = Line([xj(-0.8), 0, Z_DASAR], [xj(12.8), 0, Z_DASAR]).set_stroke(REDUP, 2.4)
        sumbu_y = Line([X_SUMBU_Y, 0, Z_DASAR], [X_SUMBU_Y, 0, zn(88)]).set_stroke(REDUP, 2.4)
        angka_satuan, angka = {}, VGroup()
        for j in ANGKA_X:
            angka.add(Line([xj(j), 0, Z_DASAR], [xj(j), 0, Z_DASAR - 0.10]).set_stroke(REDUP, 1.6))
            t = tegak(rumus(str(j), 20, REDUP)).move_to([xj(j), 0, Z_ANGKA])
            angka.add(t)
            angka_satuan[f"x{j}"] = t
        for v in ANGKA_Y:
            angka.add(Line([X_SUMBU_Y, 0, zn(v)], [X_SUMBU_Y - 0.10, 0, zn(v)]).set_stroke(REDUP, 1.6))
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
        titik_lemah = awan(LEMAH, AKSEN2, xj, zn)
        garis_naik = Line([xj(2), 0, zn(55.6)], [xj(11), 0, zn(84.4)]).set_stroke(SOROT, 3.0)
        garis_turun = Line([xj(1), 0, zn(87.9)], [xj(10), 0, zn(60.7)]).set_stroke(SOROT, 3.0)

        # Bidang parabola
        p_sumbu_x = Line([xp(-4.2), 0, zp(0)], [xp(4.2), 0, zp(0)]).set_stroke(REDUP, 2.4)
        p_sumbu_y = Line([xp(0), 0, zp(-1)], [xp(0), 0, zp(9.7)]).set_stroke(REDUP, 2.4)
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
        garis_datar = Line([xp(-3.4), 0, zp(4)], [xp(3.4), 0, zp(4)]).set_stroke(SOROT, 3.2)

        # ==================================================================
        # buka: judul sub-bab; r = 0,98 besar, lalu tanda tanya sebab-akibat.
        # ==================================================================
        kamera.pasang_awal(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA), tinggi=TINGGI_BINGKAI)
        r_buka = tegak(rumus("r = 0{,}98", 48, SOROT)).move_to([0, 0, 1.1])
        panah_sebab = tegak(rumus(r"x \Rightarrow y\ ?", 40, AKSEN)).move_to([0, 0, 0.0])
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Hubungan")
            sinema.judul_pembuka(self, "Hubungan Dua Variabel, Bagian 3", lama=3.2, y=2.6)
            b.catat(3.2)
            b.tunggu_kata("Angka")
            taruh("r buka", r_buka, tulisan=True)
            b.main(FadeIn(r_buka, scale=1.3), run_time=0.8)
            b.tunggu_kata("menyebabkan")
            taruh("panah sebab", panah_sebab, tulisan=True)
            b.main(FadeIn(panah_sebab, shift=0.2 * OUT), run_time=0.7)
        periksa()

        # ==================================================================
        # ingat: rapat lawan berserakan, dibaca dengan mata.
        # ==================================================================
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Bagian")
            b.main(FadeOut(r_buka), FadeOut(panah_sebab), run_time=0.5)
            buang("r buka", "panah sebab")
            HUD["identitas"] = sinema.identitas(self, "kekuatan hubungan", "diukur dengan r")
            HUD["identitas"].set_opacity(0)
            taruh("sumbu datar", sumbu_x)
            taruh("sumbu tegak", sumbu_y)
            taruh("angka", angka)
            TULISAN.update(angka_satuan)
            b.main(ShowCreation(sumbu_x), ShowCreation(sumbu_y), FadeIn(angka), HUD["identitas"].animate.set_opacity(1),
                   run_time=1.0)
            b.tunggu_kata("titiknya rapat")
            taruh("titik", titik)
            b.main(LaggedStart(*[FadeIn(m, scale=0.4) for m in titik], lag_ratio=0.06), run_time=0.9)
            b.tunggu_kata("berserakan")
            taruh("titik", titik_lemah)
            b.main(*[Transform(a, c) for a, c in zip(titik, titik_lemah)], run_time=1.0)
            b.tunggu_kata("Hari ini")
            b.main(*[Transform(a, c) for a, c in zip(titik, awan(BELAJAR, AKSEN2, xj, zn))], run_time=1.0)
            taruh("titik", titik)
        periksa()

        # ==================================================================
        # kuat: r = 0,98, titiknya rapat ke garis.
        # ==================================================================
        with sinema.babak(self, "kuat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Titiknya")
            taruh("garis", garis_naik)
            b.main(ShowCreation(garis_naik), run_time=1.2)
            b.tunggu_kata("r nya")
            sinema.lahir_rumus(self, r"r = 0{,}98", garis_naik, papan, b=b, warna=SOROT, ukuran_lahir=48,
                               tahan=0.5, run_time=1.0)
            b.tunggu_kata("sangat kuat")
            self.sorot_pita(b, titik, lama=1.2, lebih=0.4)
        periksa()

        # ==================================================================
        # arah: data lain, garisnya turun, r nya minus.
        # ==================================================================
        with sinema.babak(self, "arah", DURASI, kata=KATA) as b:
            b.tunggu_kata("data lain")
            b.main(FadeOut(titik), FadeOut(garis_naik), run_time=0.6)
            buang("titik", "garis")
            b.tunggu_kata("jam main")
            taruh("titik gim", titik_gim)
            b.main(LaggedStart(*[FadeIn(m, scale=0.4) for m in titik_gim], lag_ratio=0.1), run_time=1.4)
            b.tunggu_kata("garisnya")
            taruh("garis", garis_turun)
            b.main(ShowCreation(garis_turun), run_time=1.0)
            b.tunggu_kata("minus")
            sinema.ganti_rumus(self, papan.utama, r"r = -0{,}98", b=b, run_time=1.0, papan=papan)
        periksa()

        # ==================================================================
        # baca: tanda itu arah, besarnya kekuatan; skala r.
        # ==================================================================
        skala_r = Line([-2.60, 0, zn(88.5)], [2.60, 0, zn(88.5)]).set_stroke(REDUP, 2.4)
        tanda_r = VGroup(*[Line([x, 0, zn(88.5) - 0.09], [x, 0, zn(88.5) + 0.09]).set_stroke(REDUP, 1.8)
                           for x in (-2.60, 0.0, 2.60)])
        l_kiri = tegak(rumus("-1", 20, AKSEN)).move_to([-2.60, 0, zn(88.5) + 0.32])
        l_tengah = tegak(rumus("0", 20, REDUP)).move_to([0.0, 0, zn(88.5) + 0.32])
        l_kanan = tegak(rumus("1", 20, AKSEN2)).move_to([2.60, 0, zn(88.5) + 0.32])
        with sinema.babak(self, "baca", DURASI, kata=KATA) as b:
            b.tunggu_kata("cara membacanya")
            taruh("skala r", VGroup(skala_r, tanda_r))
            taruh("r kiri", l_kiri, tulisan=True)
            taruh("r tengah", l_tengah, tulisan=True)
            taruh("r kanan", l_kanan, tulisan=True)
            b.main(ShowCreation(skala_r), ShowCreation(tanda_r), FadeIn(l_kiri), FadeIn(l_tengah), FadeIn(l_kanan),
                   run_time=1.2)
            b.tunggu_kata("plus")
            b.main(Indicate(l_kanan, scale_factor=1.5, color=SOROT), run_time=0.7)
            b.tunggu_kata("minus")
            b.main(Indicate(l_kiri, scale_factor=1.5, color=SOROT), run_time=0.7)
            b.tunggu_kata("Besarnya")
            self.sorot_pita(b, skala_r, lama=1.2, lebih=0.2)
            b.tunggu_kata("rapat")
            self.sorot_pita(b, titik_gim, lama=1.0, lebih=0.4)
        periksa()

        # ==================================================================
        # kuadrat: r dikuadratkan, artinya jadi terpakai.
        # ==================================================================
        with sinema.babak(self, "kuadrat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kuadratkan")
            b.main(FadeOut(titik_gim), FadeOut(garis_turun), run_time=0.6)
            buang("titik gim", "garis")
            taruh("titik", titik)
            taruh("garis", garis_naik)
            b.main(LaggedStart(*[FadeIn(m, scale=0.4) for m in titik], lag_ratio=0.06), ShowCreation(garis_naik),
                   run_time=1.2)
            b.tunggu_kata("dikuadratkan")
            sinema.ganti_rumus(self, papan.utama, r"r^2 = 0{,}98^2 = 0{,}97", b=b, run_time=1.0, papan=papan)
            b.tunggu_kata("sembilan puluh tujuh")
            papan.baris(r"97\% \text{ dijelaskan}", SOROT, b=b)
            b.tunggu_kata("garis itu")
            b.main(Indicate(garis_naik, scale_factor=1.03, color=SOROT), run_time=0.9)
        periksa()

        # ==================================================================
        # sisa: tiga persennya dari hal lain.
        # ==================================================================
        with sinema.babak(self, "sisa", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sisa")
            papan.baris(r"3\% \text{ dari hal lain}", REDUP, b=b)
            b.tunggu_kata("cara belajarnya")
            b.main(LaggedStartMap(lambda m, **kw: Indicate(m, scale_factor=1.7, color=SOROT, **kw),
                                  titik, lag_ratio=0.09), run_time=1.6)
            b.tunggu_kata("Selalu")
            b.main(Indicate(papan.baris_lain[-1], scale_factor=1.0, color=SOROT), run_time=1.0)
        periksa()

        # ==================================================================
        # jebakan: tujuh titik, y persis sama dengan x kuadrat.
        # ==================================================================
        with sinema.babak(self, "jebakan", DURASI, kata=KATA) as b:
            b.tunggu_kata("jebakannya")
            b.main(FadeOut(titik), FadeOut(garis_naik), FadeOut(angka), FadeOut(sumbu_x), FadeOut(sumbu_y),
                   FadeOut(papan.semua()), FadeOut(VGroup(skala_r, tanda_r)), FadeOut(l_kiri), FadeOut(l_tengah),
                   FadeOut(l_kanan), run_time=0.8)
            buang("titik", "garis", "angka", "sumbu datar", "sumbu tegak", "skala r", "r kiri", "r tengah", "r kanan",
                  *angka_satuan.keys())
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self)
            taruh("sumbu parabola", VGroup(p_sumbu_x, p_sumbu_y))
            taruh("angka parabola", p_angka)
            TULISAN.update(p_angka_satuan)
            b.main(ShowCreation(p_sumbu_x), ShowCreation(p_sumbu_y), FadeIn(p_angka), run_time=1.0)
            b.tunggu_kata("tujuh titik")
            taruh("titik parabola", titik_p)
            b.main(LaggedStart(*[FadeIn(m, scale=0.4) for m in titik_p], lag_ratio=0.16), run_time=1.6)
            b.tunggu_kata("x kuadrat")
            papan.baris(r"y = x^2", TINTA, b=b)
            b.tunggu_kata("Tidak ada")
            taruh("lengkung", lengkung)
            b.main(ShowCreation(lengkung), run_time=1.4)
            b.tunggu_kata("sempurna")
            b.main(LaggedStartMap(lambda m, **kw: Indicate(m, scale_factor=1.7, color=SOROT, **kw),
                                  titik_p, lag_ratio=0.12), run_time=1.2)
        periksa()

        # ==================================================================
        # nol: tetapi r nya NOL, garis lurus terbaiknya mendatar.
        # ==================================================================
        with sinema.babak(self, "nol", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tetapi")
            sinema.lahir_rumus(self, r"r = 0", titik_p[3], papan, b=b, warna=AKSEN, ukuran_lahir=52,
                               tahan=0.5, run_time=1.0, geser=UP * 1.0 + RIGHT * 1.6)
            b.tunggu_kata("Garis lurus")
            taruh("garis datar", garis_datar)
            b.main(ShowCreation(garis_datar), run_time=1.2)
            b.tunggu_kata("kelurusan")
            b.main(Indicate(garis_datar, scale_factor=1.04, color=AKSEN), run_time=0.9)
            b.tunggu_kata("melengkung")
            b.main(Indicate(lengkung, color=SOROT, scale_factor=1.0), run_time=1.2)
        periksa()

        # ==================================================================
        # lihat: selalu lihat gambarnya.
        # ==================================================================
        l_sempurna = tegak(sinema.label("hubungan sempurna", 19, TINTA)).move_to([xp(1.25), 0, zp(9.6)])
        with sinema.babak(self, "lihat", DURASI, kata=KATA) as b:
            b.tunggu_kata("cuma angkanya")
            b.main(Indicate(papan.utama, scale_factor=1.0, color=SOROT), run_time=0.9)
            b.tunggu_kata("hubungan sempurna")
            taruh("label sempurna", l_sempurna, tulisan=True)
            b.main(FadeIn(l_sempurna), run_time=0.6)
            b.tunggu_kata("lihat gambarnya")
            b.main(LaggedStartMap(lambda m, **kw: Indicate(m, scale_factor=1.7, color=SOROT, **kw),
                                  titik_p, lag_ratio=0.12), run_time=1.4)
        periksa()

        # ==================================================================
        # umum: aturan membaca r, di panel.
        # ==================================================================
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bentuk")
            b.main(FadeOut(papan.semua()), FadeOut(l_sempurna), run_time=0.5)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, tanpa_utama=True)
            buang("label sempurna")
            b.tunggu_kata("antara")
            papan.baris(r"-1 \le r \le 1", TINTA, b=b)
            b.tunggu_kata("Tandanya")
            papan.baris(r"\text{tanda}: \text{arah}", AKSEN2, b=b)
            b.tunggu_kata("besarnya")
            papan.baris(r"|r|: \text{kekuatan garis lurus}", AKSEN2, b=b)
            b.tunggu_kata("r kuadrat")
            papan.baris(r"r^2: \text{bagian yang dijelaskan}", SOROT, b=b)
        periksa()

        # ==================================================================
        # sebab: korelasi bukan sebab-akibat.
        # ==================================================================
        with sinema.babak(self, "sebab", DURASI, kata=KATA) as b:
            b.tunggu_kata("Korelasi")
            b.main(FadeOut(VGroup(p_sumbu_x, p_sumbu_y, p_angka, titik_p, lengkung, garis_datar)), run_time=0.6)
            buang("sumbu parabola", "angka parabola", "titik parabola", "lengkung", "garis datar", *p_angka_satuan.keys())
            b.tunggu_kata("sebab-akibat")
            tiga = VGroup(
                tegak(rumus(r"x \Rightarrow y", 34, AKSEN)),
                tegak(rumus(r"y \Rightarrow x", 34, AKSEN)),
                tegak(rumus(r"z \Rightarrow x,\ z \Rightarrow y", 34, AKSEN)),
                tegak(sinema.label("kebetulan", 30, AKSEN)),
            )
            for i, m in enumerate(tiga):
                m.move_to([0, 0, 1.6 - i * 0.8])
            taruh("empat", tiga, tulisan=True)
            coret = Line([-1.2, 0, 1.35], [1.2, 0, 1.85]).set_stroke(AKSEN, 4)
            b.main(FadeIn(tiga[0]), run_time=0.6)
            b.tunggu_kata("terbalik")
            b.main(FadeIn(tiga[1]), run_time=0.6)
            b.tunggu_kata("hal ketiga")
            b.main(FadeIn(tiga[2]), run_time=0.6)
            b.tunggu_kata("kebetulan")
            b.main(FadeIn(tiga[3]), run_time=0.6)
        periksa()

        # ==================================================================
        # tutup: jawaban pertanyaan pembuka.
        # ==================================================================
        r_tutup = tegak(rumus("r = 0{,}98", 40, SOROT)).move_to([-3.6, 0, 0.4])
        l_bersama = tegak(sinema.label("bergerak bersama", 24, SOROT)).move_to([-3.6, 0, -0.3])
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("nol koma")
            taruh("r tutup", r_tutup, tulisan=True)
            b.main(FadeIn(r_tutup, scale=1.2), run_time=0.7)
            b.tunggu_kata("bergerak")
            taruh("label bersama", l_bersama, tulisan=True)
            b.main(FadeIn(l_bersama), run_time=0.6)
            b.tunggu_kata("butuh bukti")
            self.sorot_pita(b, tiga, lama=1.2, lebih=0.3)
        periksa()

        # ==================================================================
        # lanjut: semua angkanya benar, kesimpulannya salah (grafik dipotong).
        # ==================================================================
        judul_lanjut = teks("Hubungan Dua Variabel, Bagian 4", 30, SOROT).move_to([0, 2.6, 0]).fix_in_frame()
        NILAI_L = [412, 418, 425, 421, 430]
        grafik = VGroup()
        XL0, ZL0 = -1.5, -0.9
        sumbu_l = VGroup(Line([XL0, 0, ZL0], [XL0 + 4.0, 0, ZL0]), Line([XL0, 0, ZL0], [XL0, 0, ZL0 + 2.6])).set_stroke(REDUP, 2.2)
        titik_l = [np.array([XL0 + 0.5 + i * 0.75, 0, ZL0 + (v - 410) * 0.12]) for i, v in enumerate(NILAI_L)]
        polyline = VMobject().set_points_as_corners(titik_l).set_stroke(AKSEN, 3.0)
        dot_l = VGroup(*[tegak(Dot(radius=0.07).set_fill(AKSEN, 1)).move_to(p) for p in titik_l])
        l_410 = tegak(rumus("410", 20, REDUP)).move_to([XL0 - 0.45, 0, ZL0])
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Hubungan")
            b.main(FadeOut(tiga), FadeOut(r_tutup), FadeOut(l_bersama), FadeOut(papan.semua()), FadeOut(HUD["identitas"]),
                   FadeIn(judul_lanjut, shift=0.2 * UP), run_time=0.7)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, tanpa_utama=True)
            HUD["identitas"] = None
            buang("empat", "r tutup", "label bersama")
            self.hud_tambah(judul_lanjut)
            HUD["judul lanjut"] = judul_lanjut
            b.tunggu_kata("semua angkanya")
            taruh("sumbu l", sumbu_l)
            taruh("label 410", l_410, tulisan=True)
            taruh("dot l", dot_l)
            b.main(ShowCreation(sumbu_l), FadeIn(l_410), LaggedStartMap(FadeIn, dot_l, lag_ratio=0.15), run_time=1.2)
            b.tunggu_kata("salah")
            taruh("polyline", polyline)
            b.main(ShowCreation(polyline), run_time=1.0)
        periksa()

        sinema.laporkan_pemicu(self)
