"""Konsep Limit, Bagian 2 (Materi 02): mendekati, bukan menyentuh.
STANDAR VIDEO v3.1, ditulis ulang 12 Sep 2026 dari adegan Manim CE yang sudah
disetujui ARYA. ISINYA SAMA: f(x) = x kuadrat + 1 didekati ke 3 dari kiri
(2,9 lalu 2,99) dan dari kanan (3,1 lalu 3,01) di dua garis bilangan; kedua
arah menuju 10; x tidak pernah diletakkan tepat di 3; permainan tantangan
(0,1 dijawab 0,016; 0,001 dijawab 0,00016) sebagai epsilon-delta tanpa
lambang; limit adalah janji yang sanggup memenuhi tantangan seketat apa pun.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 2; segar-ingat dari Bagian 1: kurva
  kelapa kecil dengan garis potong yang merapat, angkanya menuju 20.
- Catatan bahwa f(3) = 10 juga (kebetulan sama), titik isi di dalam lingkaran
  bolong, lalu dibuang saat menyebut fungsi Bagian 4 yang tidak punya nilai.
- Jawaban tantangan pertama DICEK dengan angka: f(3,016) = 10,096.
- Kalimat narasi TIDAK diulang sebagai teks di layar (versi lama memasang
  banyak kalimat); yang tampil hanya lambang, angka, pita, dan titik.
- Rumus lahir besar di fokus lalu terbang ke panel: f(x) = x kuadrat + 1 dan
  lim f(x) = 10.
- Tiap kejadian dipicu pada kata yang mengucapkannya.

TATA LETAK: dua garis bilangan (x di atas, f(x) di bawah) dari x -6,1 sampai
2,1; kolom kanan (pusat 4,55) untuk tabel dan baris tantangan, mulai di bawah
panel rumus.

WARNA: merah = x dan arah dari kiri, biru = f(x) dan arah dari kanan,
ungu = titik tujuan dan sorot.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "limit2-mendekati"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

X0, X1 = -6.1, 2.1            # ujung kiri dan kanan kedua garis bilangan
Y_X, Y_F = 1.55, -0.85        # garis bilangan x dan f(x)
X_KANAN = 4.55                # pusat kolom kanan
Y_KOLOM = [0.9, 0.35, -0.2, -0.75, -1.45, -2.0]
C, L = 3.0, 10.0
X_MIN, X_MAX = 2.4, 3.6
F_MIN, F_MAX = 6.76, 13.96


def f(x):
    return x * x + 1


def peta_x(x):
    return X0 + (x - X_MIN) / (X_MAX - X_MIN) * (X1 - X0)


def peta_f(v):
    return X0 + (v - F_MIN) / (F_MAX - F_MIN) * (X1 - X0)


def hud(ident, papan):
    isi = {"identitas": ident} if ident is not None else {}
    p = papan.semua()
    if p is not None:
        isi["papan"] = p
    return isi


def bolong(x, y):
    """Titik tujuan digambar BOLONG: x tidak pernah diletakkan di situ."""
    # Jari-jari 0,18: titik 2,99 dan 3,01 (0,07 satuan dari pusat) jatuh DI
    # DALAM lingkaran, bukan menindih cincinnya.
    return Circle(radius=0.18).move_to([x, y, 0]).set_stroke(SOROT, 3.0).set_fill(LATAR, 1.0)


def sorot_cincin(lingkaran, warna=SOROT):
    """Sorot lingkaran BOLONG: cincin lebih besar yang muncul lalu pudar.

    Indicate(...) menyetel warna isian juga, jadi lingkaran bolong berisi kertas
    berubah jadi cakram penuh warna sorot: lubangnya terlihat terisi (limit2 dan
    limit4, 12 Sep 2026). Cincin ini tanpa isian sama sekali.
    """
    cincin = Circle(radius=lingkaran.get_width() / 2 + 0.09).move_to(lingkaran)
    cincin.set_stroke(warna, 8, opacity=0.5).set_fill(opacity=0)
    return ShowCreationThenFadeOut(cincin)


def pita(lebar, y, warna, minimum=0.14):
    r = Rectangle(width=max(lebar, minimum), height=0.46).set_fill(warna, 0.3).set_stroke(warna, 1.5)
    return r


class MendekatiBukanMenyentuh(AdeganMatra):
    def pasangan(self, x, warna):
        """Titik di garis x, pasangannya di garis f(x), dan penghubungnya."""
        a = Dot([peta_x(x), Y_X, 0], radius=0.07).set_color(warna)
        b = Dot([peta_f(f(x)), Y_F, 0], radius=0.07).set_color(warna)
        garis = DashedLine(a.get_center(), b.get_center(), dash_length=0.1).set_stroke(warna, 1.8, opacity=0.6)
        return VGroup(garis, a, b)

    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        ident = None

        # ============ buka ============================================== #
        tanya = teks("Apa artinya mendekati, kalau ternyata tidak pernah sampai?", 34, TINTA)
        tanya.move_to([0, -0.6, 0])
        sinema.batasi_lebar(tanya, 10.5)
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Konsep")
            sinema.judul_pembuka(self, "Konsep Limit, Bagian 2", lama=2.9)
            b.catat(2.9)
            b.tunggu_kata("Apa")
            b.main(Write(tanya), run_time=1.8)

        # ============ segar-ingat: kecepatan kelapa menuju 20 ============ #
        def s(t):
            return 5.0 * t * t

        def cpm(t):
            return np.array([-2.4 + (t - 0.8) * 1.7, -1.5 + s(t) * 0.05, 0.0])

        kurva_mini = ParametricCurve(lambda t: cpm(t), t_range=(0.8, 3.3, 0.02)).set_stroke(TINTA, 4)
        pojok = np.array([cpm(0.8)[0] - 0.25, cpm(0.8)[1] - 0.3, 0.0])
        sumbu_mini = VGroup(Line(pojok, [cpm(3.3)[0] + 0.3, pojok[1], 0]),
                            Line(pojok, [pojok[0], cpm(3.3)[1] + 0.3, 0])).set_stroke(REDUP, 2)
        sumbu_mini.latar = True
        titik_mini = Dot(cpm(2.0), radius=0.08).set_color(SOROT)
        hm = ValueTracker(1.0)

        def potong_mini():
            h = hm.get_value()
            m = (s(2 + h) - s(2)) / h
            ta, tb = 1.2, 3.2
            pa = cpm(2.0) + (ta - 2.0) * np.array([1.7, m * 0.05, 0.0])
            pb = cpm(2.0) + (tb - 2.0) * np.array([1.7, m * 0.05, 0.0])
            return Line(pa, pb).set_stroke(SOROT, 3.5)

        potong = always_redraw(potong_mini)
        titik2_mini = always_redraw(lambda: Dot(cpm(2.0 + hm.get_value()), radius=0.075).set_color(AKSEN))
        angka_mini = always_redraw(lambda: rumus(
            f"{20 + 5 * hm.get_value():.1f}".replace(".", "{,}") + r"\ \mathrm{m/detik}", 32, SOROT
        ).move_to([4.3, 0.3, 0]))
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi sebelumnya")
            ident = sinema.identitas(self, "ingat Bagian 1")
            ident.set_opacity(0.0)
            # Kurva kelapa langsung tampil bersama identitasnya: kalau menunggu
            # kata "kecepatan", layar kosong tiga detik (cek_layar_kosong).
            b.main(FadeOut(tanya), ident.animate.set_opacity(1.0), ShowCreation(sumbu_mini),
                   ShowCreation(kurva_mini), FadeIn(titik_mini), run_time=0.8)
            b.tunggu_kata("kecepatan")
            self.add(potong, titik2_mini, angka_mini)
            b.main(FadeIn(angka_mini), run_time=0.4)
            b.tunggu_kata("makin")
            b.main(hm.animate.set_value(0.04), run_time=2.4, rate_func=smooth)
            b.tunggu_kata("mendekati")
            sorot_angka = SurroundingRectangle(angka_mini, buff=0.1).set_fill(SOROT, 0.18).set_stroke(width=0)
            b.main(FadeIn(sorot_angka), run_time=0.4)
            b.main(FadeOut(sorot_angka), run_time=0.4)
        mini = VGroup(sumbu_mini, kurva_mini, titik_mini, potong, titik2_mini, angka_mini)

        # ============ fungsi dan dua garis bilangan ====================== #
        garis_x = Line([X0, Y_X, 0], [X1, Y_X, 0]).set_stroke(REDUP, 2)
        garis_f = Line([X0, Y_F, 0], [X1, Y_F, 0]).set_stroke(REDUP, 2)
        nama_x = rumus("x", 30, TINTA).next_to(garis_x, LEFT, buff=0.2)
        nama_f = rumus("f(x)", 28, TINTA).next_to(garis_f, LEFT, buff=0.2)

        def tanda(peta, y, nilai, isi):
            tik = Line([peta(nilai), y - 0.13, 0], [peta(nilai), y + 0.13, 0]).set_stroke(REDUP, 1.6)
            lab = rumus(isi, 20, REDUP).next_to(tik, DOWN, buff=0.1)
            return VGroup(tik, lab)

        skala_x = VGroup(*[tanda(peta_x, Y_X, v, t) for v, t in
                           ((2.4, "2{,}4"), (2.7, "2{,}7"), (3.0, "3"), (3.3, "3{,}3"), (3.6, "3{,}6"))])
        skala_f = VGroup(*[tanda(peta_f, Y_F, v, t) for v, t in
                           ((7, "7"), (9, "9"), (10, "10"), (11, "11"), (13, "13"))])
        garis = VGroup(garis_x, garis_f, skala_x, skala_f)
        garis.latar = True
        tuju_x = bolong(peta_x(C), Y_X)
        tuju_f = bolong(peta_f(L), Y_F)
        lab_c = rumus("3", 26, SOROT).next_to(tuju_x, UP, buff=0.15)
        lab_l = rumus("10", 26, SOROT).move_to([peta_f(L), Y_F - 0.75, 0])
        with sinema.babak(self, "fungsi", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kita")
            for m in (potong, titik2_mini, angka_mini):
                m.clear_updaters()
            b.main(FadeOut(mini), FadeOut(ident), run_time=0.5)
            ident = None
            b.tunggu_kata("f")
            sinema.lahir_rumus(self, r"f(x) = x^2 + 1", np.array([0.0, 0.3, 0.0]), papan, b=b,
                               warna=TINTA, sebagai_utama=False, geser=ORIGIN, tahan=0.5)
            b.tunggu_kata("Pertanyaannya")
            b.main(ShowCreation(garis_x), ShowCreation(garis_f), FadeIn(nama_x), FadeIn(nama_f),
                   run_time=1.0)
            b.main(FadeIn(skala_x), FadeIn(skala_f), run_time=0.6)
            b.tunggu_kata("mendekati")
            ident = sinema.identitas(self, "menuju 3")
            ident.set_opacity(0.0)
            b.main(FadeIn(tuju_x), FadeIn(lab_c), ident.animate.set_opacity(1.0), run_time=0.6)
        qc.periksa_adegan(self, {"tuju x": tuju_x}, hud=hud(ident, papan), dunia={"garis": garis},
                          tulisan={"nama x": nama_x, "nama f": nama_f, "3": lab_c})

        # ============ dari kiri, lalu dari kanan ========================= #
        def baris(i, kiri, kanan, warna):
            a = rumus(kiri, 26, TINTA).move_to([X_KANAN - 1.15, Y_KOLOM[i], 0])
            c = rumus(kanan, 26, warna).move_to([X_KANAN + 1.1, Y_KOLOM[i], 0])
            return VGroup(a, c)

        panah_kiri = Arrow([peta_x(2.5), Y_X + 0.5, 0], [peta_x(2.85), Y_X + 0.5, 0], buff=0,
                           thickness=2.5).set_color(AKSEN)
        panah_kanan = Arrow([peta_x(3.5), Y_X + 0.5, 0], [peta_x(3.15), Y_X + 0.5, 0], buff=0,
                            thickness=2.5).set_color(AKSEN2)
        p1, p2 = self.pasangan(2.9, AKSEN), self.pasangan(2.99, AKSEN)
        p3, p4 = self.pasangan(3.1, AKSEN2), self.pasangan(3.01, AKSEN2)
        r1 = baris(0, r"x = 2{,}9", r"9{,}41", AKSEN)
        r2 = baris(1, r"x = 2{,}99", r"9{,}94", AKSEN)
        r3 = baris(2, r"x = 3{,}1", r"10{,}61", AKSEN2)
        r4 = baris(3, r"x = 3{,}01", r"10{,}06", AKSEN2)
        with sinema.babak(self, "kiri", DURASI, kata=KATA) as b:
            b.tunggu_kata("kiri")
            b.main(ShowCreation(panah_kiri), run_time=0.6)
            b.tunggu_kata("dua")
            b.main(FadeIn(p1), run_time=0.5)
            b.tunggu_kata("nilainya")
            b.main(FadeIn(r1, shift=LEFT * 0.16), run_time=0.6)
            b.tunggu_kata("dua", ke=2)
            b.main(FadeOut(p1), run_time=0.2)
            b.main(FadeIn(p2), run_time=0.4)
            b.tunggu_kata("sembilan", ke=5)
            b.main(FadeIn(r2, shift=LEFT * 0.16), run_time=0.6)
        qc.periksa_adegan(self, {"tuju x": tuju_x, "pasangan": p2, "panah": panah_kiri},
                          hud=hud(ident, papan), dunia={"garis": garis},
                          tulisan={"nama x": nama_x, "nama f": nama_f, "3": lab_c, "r1": r1, "r2": r2})

        with sinema.babak(self, "kanan", DURASI, kata=KATA) as b:
            b.tunggu_kata("kanan")
            b.main(ShowCreation(panah_kanan), run_time=0.6)
            b.tunggu_kata("tiga")
            b.main(FadeIn(p3), run_time=0.5)
            b.tunggu_kata("nilainya")
            b.main(FadeIn(r3, shift=LEFT * 0.16), run_time=0.6)
            b.tunggu_kata("tiga", ke=2)
            b.main(FadeOut(p3), run_time=0.2)
            b.main(FadeIn(p4), run_time=0.4)
            b.tunggu_kata("sepuluh", ke=2)
            b.main(FadeIn(r4, shift=LEFT * 0.16), run_time=0.6)
        tabel = VGroup(r1, r2, r3, r4)
        qc.periksa_adegan(self, {"tuju x": tuju_x, "kiri": p2, "kanan": p4, "panah kiri": panah_kiri,
                                 "panah kanan": panah_kanan},
                          hud=hud(ident, papan), dunia={"garis": garis},
                          tulisan={"nama x": nama_x, "nama f": nama_f, "3": lab_c, "tabel": tabel})

        # ============ kedua arah sepakat: limitnya 10 ==================== #
        with sinema.babak(self, "sepakat", DURASI, kata=KATA) as b:
            b.tunggu_kata("angka")
            b.main(FadeIn(tuju_f), run_time=0.5)
            # Lingkaran bolong ditaruh di BAWAH titik-titik pasangan: kalau di
            # atas, isian kertasnya menutup titik 9,94 dan 10,06 yang ada di dalamnya.
            self.remove(p2, p4)
            self.add(p2, p4)
            b.main(Flash(tuju_f.get_center(), color=SOROT, flash_radius=0.35, line_length=0.18),
                   run_time=0.6)
            b.tunggu_kata("sepuluh")
            b.main(FadeIn(lab_l, shift=DOWN * 0.1), run_time=0.5)
            b.tunggu_kata("limit")
            sinema.lahir_rumus(self, r"\lim_{x \to 3} f(x) = 10", tuju_f, papan, b=b, warna=SOROT,
                               sebagai_utama=False, geser=np.array([2.2, 1.0, 0.0]), tahan=0.5)
        qc.periksa_adegan(self, {"tuju x": tuju_x, "tuju f": tuju_f, "kiri": p2, "kanan": p4},
                          hud=hud(ident, papan), dunia={"garis": garis},
                          tulisan={"nama x": nama_x, "nama f": nama_f, "3": lab_c, "10": lab_l,
                                   "tabel": tabel})

        # ============ x tidak pernah tepat di 3 ========================== #
        with sinema.babak(self, "tekan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Nilai")
            b.main(sorot_cincin(tuju_x, AKSEN), run_time=1.0)
            b.tunggu_kata("tepat")
            b.main(Indicate(lab_c, color=AKSEN, scale_factor=1.2), run_time=0.8)
            b.tunggu_kata("kiri")
            b.main(Indicate(p2[1], color=SOROT, scale_factor=1.6), run_time=0.6)
            b.tunggu_kata("kanan")
            b.main(Indicate(p4[1], color=SOROT, scale_factor=1.6), run_time=0.6)

        # ============ f(3) kebetulan 10 juga; Bagian 4 nanti berbeda ===== #
        isi_x = Dot([peta_x(C), Y_X, 0], radius=0.075).set_color(TINTA)
        isi_f = Dot([peta_f(L), Y_F, 0], radius=0.075).set_color(TINTA)
        nilai3 = rumus(r"f(3) = 9 + 1 = 10", 28, TINTA).move_to([X_KANAN, Y_KOLOM[4], 0])
        with sinema.babak(self, "nilai", DURASI, kata=KATA) as b:
            b.tunggu_kata("kalau")
            b.main(FadeIn(isi_x, scale=1.5), run_time=0.5)
            b.tunggu_kata("f-nya")
            b.main(Write(nilai3), run_time=1.2)
            b.tunggu_kata("sepuluh")
            b.main(FadeIn(isi_f, scale=1.5), run_time=0.5)
            b.tunggu_kata("Nanti")
            b.main(FadeOut(nilai3), run_time=0.5)
            b.tunggu_kata("tidak")
            b.main(FadeOut(isi_x, scale=0.3), FadeOut(isi_f, scale=0.3), run_time=0.6)
            b.tunggu_kata("limitnya")
            b.main(Flash(tuju_f.get_center(), color=SOROT, flash_radius=0.35, line_length=0.18),
                   run_time=0.6)
        qc.periksa_adegan(self, {"tuju x": tuju_x, "tuju f": tuju_f, "kiri": p2, "kanan": p4},
                          hud=hud(ident, papan), dunia={"garis": garis},
                          tulisan={"nama x": nama_x, "nama f": nama_f, "3": lab_c, "10": lab_l,
                                   "tabel": tabel})

        # ============ mendekati masih longgar: permainan tantangan ======= #
        with sinema.babak(self, "longgar", DURASI, kata=KATA) as b:
            b.tunggu_kata("longgar")
            b.main(FadeOut(tabel), FadeOut(p2), FadeOut(p4), FadeOut(panah_kiri), FadeOut(panah_kanan),
                   run_time=0.6)
            b.tunggu_kata("permainan")
            ident2 = sinema.identitas(self, "permainan tantangan")
            ident2.set_opacity(0.0)
            # Berurutan, bukan pudar-silang: dua tulisan di tempat yang sama
            # terbaca tumpang tindih selama peralihan.
            b.main(FadeOut(ident), run_time=0.25)
            b.main(ident2.animate.set_opacity(1.0), run_time=0.3)
            ident = ident2

        # ============ tantangan pertama: 0,1 dijawab 0,016 =============== #
        def lebar_f(d):
            return abs(peta_f(L + d) - peta_f(L - d))

        def lebar_x(d):
            return abs(peta_x(C + d) - peta_x(C - d))

        minta1 = rumus(r"|f(x) - 10| < 0{,}1", 28, AKSEN2).move_to([X_KANAN, Y_KOLOM[0], 0])
        beri1 = rumus(r"|x - 3| < 0{,}016", 28, AKSEN).move_to([X_KANAN, Y_KOLOM[1], 0])
        pita_f1 = pita(lebar_f(0.1), Y_F, AKSEN2).move_to([peta_f(L), Y_F, 0])
        pita_x1 = pita(lebar_x(0.016), Y_X, AKSEN).move_to([peta_x(C), Y_X, 0])
        with sinema.babak(self, "tantang1", DURASI, kata=KATA) as b:
            b.tunggu_kata("menantang")
            b.main(FadeIn(minta1, shift=UP * 0.1), run_time=0.6)
            b.tunggu_kata("berjarak")
            b.main(FadeIn(pita_f1), run_time=0.6)
            b.tunggu_kata("menjawab")
            b.main(FadeIn(beri1, shift=UP * 0.1), run_time=0.6)
            b.tunggu_kata("berjarak", ke=2)
            b.main(FadeIn(pita_x1), run_time=0.6)
        qc.periksa_adegan(self, {"tuju x": tuju_x, "tuju f": tuju_f, "pita f": pita_f1, "pita x": pita_x1},
                          hud=hud(ident, papan), dunia={"garis": garis},
                          tulisan={"nama x": nama_x, "nama f": nama_f, "3": lab_c, "10": lab_l,
                                   "minta 1": minta1, "beri 1": beri1})

        # ============ cek: f(3,016) = 10,096 ============================= #
        p_cek = self.pasangan(3.016, AKSEN)
        cek1 = rumus(r"f(3{,}016) = 10{,}096", 26, TINTA).move_to([X_KANAN, Y_KOLOM[2], 0])
        cek2 = rumus(r"|10{,}096 - 10| = 0{,}096 < 0{,}1", 26, SOROT).move_to([X_KANAN, Y_KOLOM[3], 0])
        with sinema.babak(self, "cek", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di")
            b.main(FadeIn(p_cek), run_time=0.6)
            b.tunggu_kata("f-nya")
            b.main(Write(cek1), run_time=1.0)
            b.tunggu_kata("Jaraknya")
            b.main(Write(cek2), run_time=1.2)
            b.tunggu_kata("memang")
            b.main(Flash(p_cek[2].get_center(), color=AKSEN2, flash_radius=0.3, line_length=0.15),
                   run_time=0.6)
        qc.periksa_adegan(self, {"tuju x": tuju_x, "tuju f": tuju_f, "pita f": pita_f1, "pita x": pita_x1,
                                 "pasangan": p_cek},
                          hud=hud(ident, papan), dunia={"garis": garis},
                          tulisan={"nama x": nama_x, "nama f": nama_f, "3": lab_c, "10": lab_l,
                                   "minta 1": minta1, "beri 1": beri1, "cek 1": cek1, "cek 2": cek2})

        # ============ tantangan kedua: 0,001 dijawab 0,00016 ============= #
        minta2 = rumus(r"|f(x) - 10| < 0{,}001", 28, AKSEN2).move_to([X_KANAN, Y_KOLOM[4], 0])
        beri2 = rumus(r"|x - 3| < 0{,}00016", 28, AKSEN).move_to([X_KANAN, Y_KOLOM[5], 0])
        # Pita kedua sebenarnya seperseratus kali lebih tipis dari yang pertama
        # dan tidak akan terlihat; digambar pada lebar minimum 0,08.
        pita_f2 = pita(lebar_f(0.001), Y_F, AKSEN2, minimum=0.08).move_to([peta_f(L), Y_F, 0])
        pita_x2 = pita(lebar_x(0.00016), Y_X, AKSEN, minimum=0.08).move_to([peta_x(C), Y_X, 0])
        with sinema.babak(self, "tantang2", DURASI, kata=KATA) as b:
            b.tunggu_kata("menantang")
            b.main(FadeOut(p_cek), run_time=0.3)
            b.main(FadeIn(minta2, shift=UP * 0.1), run_time=0.6)
            b.tunggu_kata("kurang")
            b.main(Transform(pita_f1, pita_f2), run_time=0.8)
            b.tunggu_kata("menjawab")
            b.main(FadeIn(beri2, shift=UP * 0.1), run_time=0.6)
            b.tunggu_kata("berjarak")
            b.main(Transform(pita_x1, pita_x2), run_time=0.8)
        tulisan_tantang = {"minta 1": minta1, "beri 1": beri1, "cek 1": cek1, "cek 2": cek2,
                           "minta 2": minta2, "beri 2": beri2}
        qc.periksa_adegan(self, {"tuju x": tuju_x, "tuju f": tuju_f, "pita f": pita_f1, "pita x": pita_x1},
                          hud=hud(ident, papan), dunia={"garis": garis},
                          tulisan={"nama x": nama_x, "nama f": nama_f, "3": lab_c, "10": lab_l,
                                   **tulisan_tantang})

        # ============ janji: seketat apa pun, selalu ada jawabannya ====== #
        with sinema.babak(self, "janji", DURASI, kata=KATA) as b:
            b.tunggu_kata("Limitnya")
            b.main(papan.sorot(), run_time=1.0)
            b.tunggu_kata("ketatnya")
            b.main(Indicate(pita_f1, color=AKSEN2, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("selalu")
            b.main(Indicate(pita_x1, color=AKSEN, scale_factor=1.0), run_time=0.8)

        # ============ beda kebetulan dekat dan benar-benar menuju ======== #
        xm = ValueTracker(2.75)
        gerak = always_redraw(lambda: self.pasangan(xm.get_value(), SOROT))
        with sinema.babak(self, "beda", DURASI, kata=KATA) as b:
            b.tunggu_kata("benar-benar")
            self.add(gerak)
            b.main(xm.animate.set_value(2.999), run_time=2.0, rate_func=smooth)
            b.tunggu_kata("Kalau")
            gerak.clear_updaters()
            b.main(FadeOut(gerak), run_time=0.4)

        # ============ penutup: epsilon dan delta, belum perlu lambangnya = #
        eps = rumus(r"\varepsilon", 40, AKSEN2).next_to(minta1, LEFT, buff=0.35)
        delta = rumus(r"\delta", 40, AKSEN).next_to(beri1, LEFT, buff=0.35)
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("epsilon")
            b.main(FadeIn(eps, scale=1.3), run_time=0.5)
            b.tunggu_kata("delta")
            b.main(FadeIn(delta, scale=1.3), run_time=0.5)
            b.tunggu_kata("lambangnya")
            b.main(FadeOut(eps), FadeOut(delta), run_time=0.5)
            b.tunggu_kata("janji")
            b.main(papan.sorot(), run_time=1.0)
        qc.periksa_adegan(self, {"tuju x": tuju_x, "tuju f": tuju_f, "pita f": pita_f1, "pita x": pita_x1},
                          hud=hud(ident, papan), dunia={"garis": garis},
                          tulisan={"nama x": nama_x, "nama f": nama_f, "3": lab_c, "10": lab_l,
                                   **tulisan_tantang})

        # ============ menunjuk Bagian 3 ================================== #
        lanjut = teks("Konsep Limit, Bagian 3", 30, SOROT).move_to([X_KANAN, -0.3, 0])
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi berikutnya")
            b.main(*[FadeOut(m) for m in (minta1, beri1, cek1, cek2, minta2, beri2)], run_time=0.5)
            b.tunggu_kata("Konsep")
            b.main(FadeIn(lanjut, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("kiri")
            b.main(ShowCreation(panah_kiri), run_time=0.5)
            b.tunggu_kata("kanan")
            b.main(ShowCreation(panah_kanan), run_time=0.5)
        qc.periksa_adegan(self, {"tuju x": tuju_x, "tuju f": tuju_f, "pita f": pita_f1, "pita x": pita_x1,
                                 "panah kiri": panah_kiri, "panah kanan": panah_kanan},
                          hud=hud(ident, papan), dunia={"garis": garis},
                          tulisan={"nama x": nama_x, "nama f": nama_f, "3": lab_c, "10": lab_l,
                                   "lanjut": lanjut})

        sinema.laporkan_pemicu(self)
