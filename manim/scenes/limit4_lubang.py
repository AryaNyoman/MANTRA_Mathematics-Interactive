"""Konsep Limit, Bagian 4 (Materi 04): lubang yang tidak mengubah tujuan.
STANDAR VIDEO v3.1, ditulis ulang 12 Sep 2026 dari adegan Manim CE yang sudah
disetujui ARYA. ISINYA SAMA: f(x) = (x kuadrat - 1) : (x - 1); di x = 1
hasilnya 0 : 0, tidak terdefinisi (bukan 0, bukan tak hingga); grafiknya garis
lurus dengan satu titik bolong; didekati dari kiri 0,9 dan 0,99, dari kanan
1,1 dan 1,01, keduanya menuju 2; limitnya 2 walau titiknya kosong; pembilang
difaktorkan, faktor (x - 1) dicoret hanya kalau x bukan 1; sisanya x + 1;
nilai fungsi dan limit dua hal berbeda.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 4 dengan cuplikan garis berlubang;
  segar-ingat Bagian 3 (kiri dan kanan harus sepakat) dengan garis bilangan.
- Pemfaktoran DICEK dengan angka di x = 0,9: (0,81 - 1) : (0,9 - 1) = 1,9,
  cocok dengan baris tabel yang sengaja dibiarkan tinggal.
- Kalimat narasi tidak diulang sebagai teks; "bukan 0, bukan tak hingga"
  diperlihatkan sebagai f(1) = 0 dan f(1) = tak hingga yang dicoret.
- Rumus lahir besar di fokus lalu terbang ke panel: f(x), lim f(x) = 2,
  x bukan 1. Coretan faktor berupa garis tipis yang tidak menutup hurufnya.
- Titik tetangga BERHENTI di 0,9 dan 1,1: pada skala ini 0,99 dan 1,01 jatuh
  di dalam lingkaran lubang dan akan terlihat seperti mengisinya. Kedekatan
  yang sesungguhnya dibawa tabel.
- Tiap kejadian dipicu pada kata yang mengucapkannya.

WARNA: biru = sumbu dan tetangga kiri, merah = tetangga kanan dan penolakan,
tinta = kurva dan rumus, ungu = lubang dan kesimpulan.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "limit4-lubang"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

ASAL = np.array([-5.45, -2.18, 0.0])   # titik (0, 0) papan grafik
X_KOLOM = 1.6                          # tepi kiri kolom kanan
X_KANAN = 3.4                          # pusat tabel
Y_BARIS = [1.3, 0.7, 0.1, -0.5]
LUBANG_X, LUBANG_Y = 1.0, 2.0


def hud(ident, papan):
    isi = {"identitas": ident} if ident is not None else {}
    p = papan.semua()
    if p is not None:
        isi["papan"] = p
    return isi


def coretan(g, warna=AKSEN):
    """Garis miring tipis melintasi glyph g, tidak menutup hurufnya."""
    return Line(g.get_corner(DL) + np.array([-0.05, -0.05, 0]),
                g.get_corner(UR) + np.array([0.05, 0.05, 0])).set_stroke(warna, 3)


def sorot_cincin(lingkaran, warna=SOROT):
    """Sorot lingkaran BOLONG: cincin lebih besar yang muncul lalu pudar.

    Indicate(...) menyetel warna isian juga, jadi lingkaran bolong berisi kertas
    berubah jadi cakram penuh warna sorot: lubangnya terlihat terisi (limit2 dan
    limit4, 12 Sep 2026). Cincin ini tanpa isian sama sekali.
    """
    cincin = Circle(radius=lingkaran.get_width() / 2 + 0.09).move_to(lingkaran)
    cincin.set_stroke(warna, 8, opacity=0.5).set_fill(opacity=0)
    return ShowCreationThenFadeOut(cincin)


def pita_atas(m, warna=SOROT):
    return SurroundingRectangle(m, buff=0.08).set_fill(warna, 0.18).set_stroke(width=0)


class LubangDiGrafik(AdeganMatra):
    def pecahan(self, kiri, atas, bawah, ukuran=34, warna=TINTA):
        """Pecahan yang pembilang dan penyebutnya bisa dipegang sendiri-sendiri
        (coretan harus mendarat TEPAT pada faktornya)."""
        k = rumus(kiri, ukuran, warna) if kiri else None
        a = rumus(atas, ukuran - 2, warna)
        b = rumus(bawah, ukuran - 2, warna)
        lebar = max(a.get_width(), b.get_width()) + 0.16
        garis = Line(LEFT * lebar / 2, RIGHT * lebar / 2).set_stroke(warna, 2)
        pec = VGroup(a, garis, b).arrange(DOWN, buff=0.1)
        if k is None:
            return pec, a, b
        semua = VGroup(k, pec).arrange(RIGHT, buff=0.16)
        return semua, a, b

    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        ident = None

        # ============ buka: cuplikan garis berlubang ==================== #
        cuplik_garis = Line([-2.2, -0.4, 0], [2.2, 1.4, 0]).set_stroke(TINTA, 5)
        cuplik_lubang = Circle(radius=0.16).move_to([0, 0.5, 0]).set_stroke(SOROT, 3.5).set_fill(LATAR, 1.0)
        tanya = teks("Bisakah limitnya tetap ada?", 34, TINTA).move_to([0, -1.6, 0])
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Konsep")
            sinema.judul_pembuka(self, "Konsep Limit, Bagian 4", lama=3.0)
            b.catat(3.0)
            b.tunggu_kata("fungsi")
            b.main(ShowCreation(cuplik_garis), run_time=0.6)
            b.tunggu_kata("titik")
            b.main(FadeIn(cuplik_lubang, scale=1.6), run_time=0.5)
            b.tunggu_kata("Bisakah")
            b.main(Write(tanya), run_time=1.4)

        # ============ segar-ingat: kiri dan kanan harus sepakat ========== #
        garis_ingat = Line([-3.2, 0.3, 0], [3.2, 0.3, 0]).set_stroke(REDUP, 2)
        garis_ingat.latar = True
        tuju_ingat = Circle(radius=0.16).move_to([0, 0.3, 0]).set_stroke(SOROT, 3.5).set_fill(LATAR, 1.0)
        panah_ki = Arrow([-2.4, 0.3, 0], [-0.45, 0.3, 0], buff=0, thickness=2.5).set_color(AKSEN2)
        panah_ka = Arrow([2.4, 0.3, 0], [0.45, 0.3, 0], buff=0, thickness=2.5).set_color(AKSEN)
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi sebelumnya")
            ident = sinema.identitas(self, "ingat Bagian 3")
            ident.set_opacity(0.0)
            b.main(FadeOut(tanya), FadeOut(cuplik_garis), FadeOut(cuplik_lubang),
                   ident.animate.set_opacity(1.0), ShowCreation(garis_ingat), FadeIn(tuju_ingat),
                   run_time=0.7)
            b.tunggu_kata("kiri")
            b.main(ShowCreation(panah_ki), run_time=0.6)
            b.tunggu_kata("kanan")
            b.main(ShowCreation(panah_ka), run_time=0.6)
            b.tunggu_kata("menuju")
            b.main(Flash(tuju_ingat.get_center(), color=SOROT, flash_radius=0.35, line_length=0.18),
                   run_time=0.6)
        qc.periksa_adegan(self, {"tuju": tuju_ingat, "kiri": panah_ki, "kanan": panah_ka},
                          hud=hud(ident, papan), dunia={"garis": garis_ingat})

        # ============ fungsinya ========================================== #
        with sinema.babak(self, "fungsi", DURASI, kata=KATA) as b:
            b.tunggu_kata("Perhatikan")
            b.main(FadeOut(garis_ingat), FadeOut(tuju_ingat), FadeOut(panah_ki), FadeOut(panah_ka),
                   FadeOut(ident), run_time=0.5)
            ident = None
            b.tunggu_kata("x")
            # Ditahan besar 2,6 detik sampai kalimatnya selesai: kalau langsung
            # terbang ke panel, layar kosong tiga detik (cek_layar_kosong).
            sinema.lahir_rumus(self, r"f(x) = \frac{x^2 - 1}{x - 1}", np.array([0.0, 0.4, 0.0]), papan,
                               b=b, warna=TINTA, sebagai_utama=False, geser=ORIGIN, tahan=2.6)

        # ============ masukkan x = 1: 0 dibagi 0 ========================= #
        subs, subs_atas, subs_bawah = self.pecahan(r"f(1) =", r"1^2 - 1", r"1 - 1", ukuran=38)
        subs.move_to([1.0, 0.9, 0])
        nol_nol = rumus(r"= \frac{0}{0}", 38, AKSEN).next_to(subs, RIGHT, buff=0.2)
        with sinema.babak(self, "coba", DURASI, kata=KATA) as b:
            b.tunggu_kata("masukkan")
            b.main(Write(subs), run_time=1.2)
            b.tunggu_kata("Pembilangnya")
            p1 = pita_atas(subs_atas)
            b.main(FadeIn(p1), run_time=0.4)
            b.main(FadeOut(p1), run_time=0.4)
            b.tunggu_kata("penyebutnya")
            p2 = pita_atas(subs_bawah)
            b.main(FadeIn(p2), run_time=0.4)
            b.main(FadeOut(p2), run_time=0.4)
            b.tunggu_kata("Nol dibagi")
            b.main(FadeIn(nol_nol, shift=RIGHT * 0.15), run_time=0.7)
        qc.periksa_adegan(self, {"subs": subs}, hud=hud(ident, papan), tulisan={"nol": nol_nol})

        # ============ tidak terdefinisi: bukan 0, bukan tak hingga ======= #
        pecahan_nol = nol_nol.family_members_with_points()
        # glyph nol_nol: '=' lalu pecahan 0, garis, 0. Coretan melintasi seluruh pecahan.
        silang = Line(nol_nol.get_corner(DL) + np.array([0.35, -0.05, 0]),
                      nol_nol.get_corner(UR) + np.array([0.05, 0.05, 0])).set_stroke(AKSEN, 4)
        bukan0 = rumus(r"f(1) = 0", 36, AKSEN).move_to([1.0, -0.5, 0])
        bukan_inf = rumus(r"f(1) = \infty", 36, AKSEN).move_to([1.0, -1.35, 0])
        coret0 = coretan(bukan0[-1])
        coret_inf = coretan(bukan_inf[-1])
        with sinema.babak(self, "tolak", DURASI, kata=KATA) as b:
            b.tunggu_kata("tidak")
            b.main(ShowCreation(silang), run_time=0.6)
            b.tunggu_kata("Bukan")
            b.main(FadeIn(bukan0, shift=UP * 0.1), run_time=0.5)
            b.main(ShowCreation(coret0), run_time=0.4)
            b.tunggu_kata("bukan", ke=2)
            b.main(FadeIn(bukan_inf, shift=UP * 0.1), run_time=0.5)
            b.main(ShowCreation(coret_inf), run_time=0.4)
        qc.periksa_adegan(self, {"subs": subs, "silang": silang, "coret": VGroup(coret0, coret_inf)},
                          hud=hud(ident, papan),
                          tulisan={"nol": nol_nol, "bukan 0": bukan0, "bukan inf": bukan_inf})

        # ============ grafiknya: garis dengan satu titik bolong ========== #
        # Lebar 6,0 (2 satuan layar per satuan x): titik 0,9 dan 1,1 harus
        # terlihat LEPAS dari lingkaran lubang, bukan menyentuh cincinnya.
        sumbu = Axes(x_range=(-0.3, 2.7, 1), y_range=(-0.3, 3.7, 1), width=6.0, height=4.2,
                     axis_config=dict(stroke_color=REDUP, stroke_width=2.2))
        sumbu.shift(ASAL - sumbu.c2p(0, 0))
        cp = sumbu.c2p
        angka = VGroup(*[rumus(str(i), 22, REDUP).next_to(cp(i, 0), DOWN, buff=0.15) for i in (1, 2)],
                       *[rumus(str(j), 22, REDUP).next_to(cp(0, j), LEFT, buff=0.15) for j in (1, 2, 3)])
        sumbu.angka = angka
        sumbu.latar = True
        nama_x = rumus("x", 24, REDUP).next_to(cp(2.7, 0), RIGHT, buff=0.15)
        nama_y = rumus("y", 24, REDUP).next_to(cp(0, 3.7), UP, buff=0.15)
        # Garis digambar sebagai satu ruas: lubang selebar satu titik tidak
        # akan pernah tertangkap pencuplikan, padahal lubang itulah isinya.
        garis = Line(cp(-0.3, 0.7), cp(2.7, 3.7)).set_stroke(TINTA, 5)
        titik_lubang = cp(LUBANG_X, LUBANG_Y)
        lubang = Circle(radius=0.11).move_to(titik_lubang).set_stroke(SOROT, 3.2).set_fill(LATAR, 1.0)
        bantu = VGroup(DashedLine(cp(LUBANG_X, 0), titik_lubang, dash_length=0.1),
                       DashedLine(cp(0, LUBANG_Y), titik_lubang, dash_length=0.1)).set_stroke(SOROT, 2)
        with sinema.babak(self, "gambar", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tapi")
            b.main(FadeOut(subs), FadeOut(nol_nol), FadeOut(silang), FadeOut(bukan0), FadeOut(bukan_inf),
                   FadeOut(coret0), FadeOut(coret_inf), run_time=0.5)
            b.tunggu_kata("grafiknya")
            ident = sinema.identitas(self, "titik bolong")
            ident.set_opacity(0.0)
            b.main(ShowCreation(sumbu), FadeIn(angka), FadeIn(nama_x), FadeIn(nama_y),
                   ident.animate.set_opacity(1.0), run_time=1.0)
            b.tunggu_kata("garis")
            b.main(ShowCreation(garis), run_time=1.2)
            b.tunggu_kata("bolong")
            b.main(FadeIn(lubang, scale=1.6), ShowCreation(bantu), run_time=0.7)
        dunia = {"sumbu": sumbu}
        qc.periksa_adegan(self, {"garis": garis, "lubang": lubang, "bantu": bantu},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"nama x": nama_x, "nama y": nama_y})

        # ============ tetangga kiri, lalu kanan ========================== #
        def baris(i, kiri, kanan, warna):
            a = rumus(kiri, 28, TINTA).move_to([X_KANAN - 1.2, Y_BARIS[i], 0])
            c = rumus(kanan, 28, warna).move_to([X_KANAN + 1.1, Y_BARIS[i], 0])
            return VGroup(a, c)

        def tetangga(x, warna):
            y = x + 1
            titik = Dot(cp(x, y), radius=0.055).set_color(warna)
            pandu = VGroup(DashedLine(cp(x, 0), cp(x, y), dash_length=0.08),
                           DashedLine(cp(0, y), cp(x, y), dash_length=0.08)).set_stroke(warna, 1.6)
            return VGroup(pandu, titik)

        t_kiri, t_kanan = tetangga(0.9, AKSEN2), tetangga(1.1, AKSEN)
        r1 = baris(0, r"x = 0{,}9", r"1{,}9", AKSEN2)
        r2 = baris(1, r"x = 0{,}99", r"1{,}99", AKSEN2)
        r3 = baris(2, r"x = 1{,}1", r"2{,}1", AKSEN)
        r4 = baris(3, r"x = 1{,}01", r"2{,}01", AKSEN)
        with sinema.babak(self, "kiri", DURASI, kata=KATA) as b:
            b.tunggu_kata("nol")
            b.main(FadeIn(t_kiri), run_time=0.5)
            b.tunggu_kata("nilainya")
            b.main(FadeIn(r1, shift=LEFT * 0.16), run_time=0.6)
            b.tunggu_kata("nilainya", ke=2)
            b.main(FadeIn(r2, shift=LEFT * 0.16), run_time=0.6)
        qc.periksa_adegan(self, {"garis": garis, "lubang": lubang, "kiri": t_kiri},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"nama x": nama_x, "nama y": nama_y, "r1": r1, "r2": r2})

        with sinema.babak(self, "kanan", DURASI, kata=KATA) as b:
            b.tunggu_kata("satu")
            b.main(FadeIn(t_kanan), run_time=0.5)
            b.tunggu_kata("nilainya")
            b.main(FadeIn(r3, shift=LEFT * 0.16), run_time=0.6)
            b.tunggu_kata("nilainya", ke=2)
            b.main(FadeIn(r4, shift=LEFT * 0.16), run_time=0.6)
        tabel = VGroup(r1, r2, r3, r4)
        qc.periksa_adegan(self, {"garis": garis, "lubang": lubang, "kiri": t_kiri, "kanan": t_kanan},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"nama x": nama_x, "nama y": nama_y, "tabel": tabel})

        # ============ kedua arah menuju 2: limitnya 2 ==================== #
        with sinema.babak(self, "sepakat", DURASI, kata=KATA) as b:
            b.tunggu_kata("angka")
            b.main(Flash(titik_lubang, color=SOROT, flash_radius=0.4, line_length=0.2), run_time=0.6)
            b.tunggu_kata("dua")
            b.main(Indicate(angka[3], color=SOROT, scale_factor=1.4), run_time=0.8)
            b.tunggu_kata("limit")
            sinema.lahir_rumus(self, r"\lim_{x \to 1} f(x) = 2", lubang, papan, b=b, warna=SOROT,
                               sebagai_utama=False, geser=np.array([2.6, 0.9, 0.0]), tahan=0.5)
            b.tunggu_kata("kosong")
            b.main(sorot_cincin(lubang, SOROT), run_time=0.8)
        qc.periksa_adegan(self, {"garis": garis, "lubang": lubang, "kiri": t_kiri, "kanan": t_kanan},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"nama x": nama_x, "nama y": nama_y, "tabel": tabel})

        # ============ kenapa: pembilang difaktorkan ====================== #
        faktor, f_atas, f_bawah = self.pecahan(r"f(x) =", r"(x - 1)(x + 1)", r"x - 1", ukuran=32)
        faktor.move_to([X_KOLOM + faktor.get_width() / 2, 0.45, 0])
        glyph_atas = f_atas.family_members_with_points()
        bagian_kiri = VGroup(*glyph_atas[0:5])    # (x - 1)
        bagian_kanan = VGroup(*glyph_atas[5:10])  # (x + 1)
        with sinema.babak(self, "kenapa", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kenapa")
            b.main(FadeOut(r2), FadeOut(r3), FadeOut(r4), run_time=0.5)
            b.tunggu_kata("pembilangnya")
            b.main(Write(faktor), run_time=1.3)
            b.tunggu_kata("x")
            pk = pita_atas(bagian_kiri)
            b.main(FadeIn(pk), run_time=0.3)
            b.main(FadeOut(pk), run_time=0.3)
            b.tunggu_kata("x", ke=2)
            pk2 = pita_atas(bagian_kanan)
            b.main(FadeIn(pk2), run_time=0.3)
            b.main(FadeOut(pk2), run_time=0.3)
        qc.periksa_adegan(self, {"garis": garis, "lubang": lubang, "kiri": t_kiri, "kanan": t_kanan},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"nama x": nama_x, "nama y": nama_y, "r1": r1, "faktor": faktor})

        # ============ cek dengan angka di x = 0,9 ======================== #
        cek1, c1_atas, c1_bawah = self.pecahan(r"x = 0{,}9:", r"0{,}81 - 1", r"0{,}9 - 1", ukuran=28)
        cek1.move_to([X_KOLOM + cek1.get_width() / 2, -0.55, 0])
        cek2, c2_atas, c2_bawah = self.pecahan("=", r"-0{,}19", r"-0{,}1", ukuran=28)
        cek2.next_to(cek1, RIGHT, buff=0.18)
        hasil_cek = rumus(r"= 1{,}9", 28, SOROT).next_to(cek2, RIGHT, buff=0.18)
        with sinema.babak(self, "cek", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di")
            b.main(Write(cek1), run_time=1.2)
            b.tunggu_kata("pembilangnya")
            pc = pita_atas(c1_atas)
            b.main(FadeIn(pc), run_time=0.3)
            b.main(FadeOut(pc), run_time=0.3)
            b.tunggu_kata("yaitu")
            b.main(Write(cek2), run_time=1.0)
            b.tunggu_kata("Penyebutnya")
            pd = pita_atas(c2_bawah)
            b.main(FadeIn(pd), run_time=0.3)
            b.main(FadeOut(pd), run_time=0.3)
            b.tunggu_kata("Hasil")
            b.main(Write(hasil_cek), run_time=0.8)
            b.tunggu_kata("cocok")
            pt = VGroup(pita_atas(r1[1]), pita_atas(hasil_cek))
            b.main(FadeIn(pt), run_time=0.4)
            b.main(FadeOut(pt), run_time=0.4)
        cek = VGroup(cek1, cek2, hasil_cek)
        qc.periksa_adegan(self, {"garis": garis, "lubang": lubang, "kiri": t_kiri, "kanan": t_kanan},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"nama x": nama_x, "nama y": nama_y, "r1": r1, "faktor": faktor,
                                   "cek": cek})

        # ============ coret faktornya, asal x bukan 1 ==================== #
        coret_atas = coretan(bagian_kiri)
        coret_bawah = coretan(f_bawah)
        with sinema.babak(self, "coret", DURASI, kata=KATA) as b:
            b.tunggu_kata("dicoret")
            b.main(ShowCreation(coret_atas), ShowCreation(coret_bawah), run_time=0.7)
            b.tunggu_kata("hanya")
            sinema.lahir_rumus(self, r"x \neq 1", faktor, papan, b=b, warna=AKSEN,
                               sebagai_utama=False, geser=np.array([0.0, -1.4, 0.0]), tahan=0.5)
        qc.periksa_adegan(self, {"garis": garis, "lubang": lubang, "coretan": VGroup(coret_atas, coret_bawah)},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"nama x": nama_x, "nama y": nama_y, "r1": r1, "faktor": faktor,
                                   "cek": cek})

        # ============ sisanya x + 1 ====================================== #
        sisa = rumus(r"= x + 1", 32, SOROT).next_to(faktor, RIGHT, buff=0.2)
        with sinema.babak(self, "sisa", DURASI, kata=KATA) as b:
            b.tunggu_kata("x")
            b.main(FadeIn(sisa, shift=RIGHT * 0.15), run_time=0.8)
            b.tunggu_kata("grafiknya")
            sorot_garis = Line(cp(-0.3, 0.7), cp(2.7, 3.7)).set_stroke(SOROT, 16, opacity=0.4)
            b.main(ShowCreationThenFadeOut(sorot_garis), run_time=1.4)
            self.remove(sorot_garis)
            b.tunggu_kata("berlubang")
            b.main(Flash(titik_lubang, color=SOROT, flash_radius=0.4, line_length=0.2), run_time=0.6)
        qc.periksa_adegan(self, {"garis": garis, "lubang": lubang},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"nama x": nama_x, "nama y": nama_y, "r1": r1, "faktor": faktor,
                                   "cek": cek, "sisa": sisa})

        # ============ penutup: nilai fungsi dan limit berbeda ============ #
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("Nilai")
            b.main(sorot_cincin(lubang, AKSEN), run_time=0.8)
            b.tunggu_kata("adalah")
            b.main(papan.sorot(), run_time=1.0)
            b.tunggu_kata("dibuat")
            b.main(Flash(titik_lubang, color=SOROT, flash_radius=0.4, line_length=0.2), run_time=0.6)

        # ============ menunjuk Sifat Limit Bagian 1 ====================== #
        lanjut = VGroup(teks("Sifat Limit dan Cara Menghitungnya,", 28, SOROT),
                        teks("Bagian 1", 28, SOROT)).arrange(DOWN, buff=0.12)
        lanjut.move_to([X_KOLOM + lanjut.get_width() / 2, -1.0, 0])
        sinema.batasi_lebar(lanjut, 5.0)
        titik_cepat = Dot(cp(1.5, 2.5), radius=0.06).set_color(SOROT)
        lab_cepat = rumus(r"2{,}5", 24, SOROT).next_to(titik_cepat, DR, buff=0.1)
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi berikutnya")
            b.main(FadeOut(cek), FadeOut(r1), FadeOut(t_kiri), FadeOut(t_kanan), run_time=0.5)
            b.tunggu_kata("Sifat")
            b.main(FadeIn(lanjut, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("masukkan")
            b.main(FadeIn(titik_cepat, scale=1.5), FadeIn(lab_cepat), run_time=0.6)
        qc.periksa_adegan(self, {"garis": garis, "lubang": lubang, "titik cepat": titik_cepat},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"nama x": nama_x, "nama y": nama_y, "faktor": faktor, "sisa": sisa,
                                   "lanjut": lanjut, "2,5": lab_cepat})

        sinema.laporkan_pemicu(self)
