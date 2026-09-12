"""Lingkaran Satuan dan Sudut Istimewa, Bagian 3 (Materi 07): sudut istimewa.
STANDAR VIDEO v3.1, ditulis ulang 11 Sep 2026 dari adegan Manim CE yang sudah
disetujui ARYA. ISINYA SAMA: persegi bersisi 1 dipotong diagonal jadi
45-45-90 (miring akar 2); segitiga sama sisi bersisi 2 dibelah jadi 30-60-90
(tegak akar 3); sin 45, 30, 60; ketiganya di lingkaran satuan; jari-jari
menyapu berhenti di tiap sudut istimewa.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 3; segar-ingat koordinat (cos, sin)
  dari Bagian 1 dengan contoh desimal yang tidak habis (sudut 50 derajat).
- Akar 2 dan akar 3 DIHITUNG di layar lewat Pythagoras (1 + 1 = 2, 4 - 1 = 3),
  bukan disodorkan. Pythagoras di sini prasyarat nyata, bukan tempelan.
- Nilai sin lahir besar di dekat segitiganya lalu terbang ke panel kanan atas.
- Tiap kejadian dipicu pada kata yang mengucapkannya.

INTI YANG HARUS TERTANAM: nilainya lahir dari dua bangun yang bisa digambar
sendiri di buku tulis. Karena itu pemotongan persegi dan pembelahan segitiga
harus benar-benar terlihat.

DIPERDALAM 13 Sep 2026 (revisi ARYA): cos 45, cos 30, cos 60 disebut dan
masuk panel (dulu hanya sin); 1/akar 2 ditulis juga sebagai akar 2 / 2 seperti
di tabel; kedua segitiga DICIUTKAN ke sisi miring 1 supaya sisinya persis nilai
sin dan cos; di lingkaran, titiknya ditegaskan (cos theta, sin theta) dengan
kaki mendatar biru (cos) dan kaki tegak merah (sin), dan di 30 derajat kedua
kakinya diberi angka sebelum koordinatnya ditulis, supaya siswa tahu dari
mana (akar 3 / 2, 1/2) datang.

WARNA: biru = alas/samping, merah = tegak/depan, tinta = miring, ungu = sudut.
ANGKANYA: 1 + 1 = 2 (akar 2); 4 - 1 = 3 (akar 3); cos 50 = 0,6428, sin 50 = 0,7660.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "tahap7-sudut-istimewa"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

PANGGUNG = np.array([-3.7, -0.4, 0.0])   # pusat bangun di kiri
SISI = 2.3                               # panjang layar untuk 1 satuan
R_LING = 1.9
ISTIMEWA = [30, 45, 60]
X_KERJA, Y_KERJA = 3.2, -0.6


def hud(ident, papan):
    isi = {"identitas": ident} if ident is not None else {}
    p = papan.semua()
    if p is not None:
        isi["papan"] = p
    return isi


def busur_di(titik, ke_a, ke_b, radius=0.5, warna=SOROT):
    """Busur sudut DALAM di `titik`, antara arah ke_a dan ke_b (selisih terpendek)."""
    a = np.arctan2(*(ke_a - titik)[1::-1])
    b = np.arctan2(*(ke_b - titik)[1::-1])
    beda = (b - a + PI) % TAU - PI
    if beda < 0:
        a, beda = b, -beda
    return Arc(radius=radius, start_angle=a, angle=beda, arc_center=titik).set_stroke(warna, 4)


def siku_tanda(sudut_di, arah_a, arah_b, ukuran=0.26, warna=REDUP):
    p = np.array(sudut_di)
    u = np.array(arah_a) / np.linalg.norm(arah_a) * ukuran
    v = np.array(arah_b) / np.linalg.norm(arah_b) * ukuran
    return VGroup(Line(p + u, p + u + v), Line(p + v, p + u + v)).set_stroke(warna, 2.4)


class SudutIstimewaLahir(AdeganMatra):
    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        ident = None

        # ============ buka ============================================== #
        # Tanpa lambang derajat: huruf "°" ditolak latex, dan "$" di dalam
        # teks ditolak cek_kode. Diucapkan "derajat", ditulis "derajat".
        tanya = teks("Kenapa 30, 45, dan 60 derajat disebut sudut istimewa?", 34, TINTA)
        tanya.move_to([0, -0.6, 0])
        sinema.batasi_lebar(tanya, 10.5)
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Lingkaran")
            sinema.judul_pembuka(self, "Lingkaran Satuan dan Sudut Istimewa, Bagian 3", lama=3.4)
            b.catat(3.4)
            b.tunggu_kata("Kenapa")
            b.main(Write(tanya), run_time=2.0)

        # ============ segar-ingat: koordinat titik di lingkaran satuan ==== #
        pusat_ingat = PANGGUNG
        ling_ingat = Circle(radius=R_LING).move_to(pusat_ingat).set_stroke(TINTA, 3)
        # Sumbu ke bawah hanya 1,1 R: pada 1,15 R ujungnya masuk jalur subtitle.
        sumbu_ingat = VGroup(Line(pusat_ingat + LEFT * R_LING * 1.15, pusat_ingat + RIGHT * R_LING * 1.15),
                             Line(pusat_ingat + DOWN * R_LING * 1.1, pusat_ingat + UP * R_LING * 1.15)
                             ).set_stroke(REDUP, 2)
        sumbu_ingat.latar = True
        arah50 = np.array([np.cos(np.radians(50)), np.sin(np.radians(50)), 0.0])
        p50 = pusat_ingat + R_LING * arah50
        jari50 = Line(pusat_ingat, p50).set_stroke(TINTA, 4)
        titik50 = Dot(p50, radius=0.08).set_color(SOROT)
        koor_umum = rumus(r"(\cos\theta, \sin\theta)", 30, TINTA).next_to(p50, UR, buff=0.12)
        koor_desimal = rumus(r"(0{,}6428\ldots,\ 0{,}7660\ldots)", 30, REDUP)
        koor_desimal.next_to(p50, UR, buff=0.12)
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi sebelumnya")
            ident = sinema.identitas(self, "ingat Bagian 1")
            ident.set_opacity(0.0)
            b.main(FadeOut(tanya), ident.animate.set_opacity(1.0), run_time=0.5)
            b.tunggu_kata("Lingkaran")
            b.main(ShowCreation(sumbu_ingat), ShowCreation(ling_ingat), run_time=1.4)
            b.tunggu_kata("titik")
            b.main(ShowCreation(jari50), FadeIn(titik50), run_time=0.7)
            b.tunggu_kata("koordinat")
            b.main(Write(koor_umum), run_time=1.2)
            b.tunggu_kata("desimal")
            b.main(FadeOut(koor_umum), run_time=0.2)
            b.main(FadeIn(koor_desimal), run_time=0.5)
        qc.periksa_adegan(self, {"lingkaran": ling_ingat, "jari": jari50, "titik": titik50},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu_ingat},
                          tulisan={"koordinat": koor_desimal})

        # ============ tiga sudut istimewa ================================ #
        tiga = VGroup(*[rumus(rf"{d}^\circ", 54, SOROT) for d in ISTIMEWA])
        tiga.arrange(RIGHT, buff=0.9).move_to([X_KERJA, 0.3, 0])
        with sinema.babak(self, "kenapa", DURASI, kata=KATA) as b:
            b.tunggu_kata("tiga", ke=2)
            b.main(FadeIn(tiga[0], shift=UP * 0.2), run_time=0.6)
            b.tunggu_kata("empat")
            b.main(FadeIn(tiga[1], shift=UP * 0.2), run_time=0.6)
            b.tunggu_kata("enam")
            b.main(FadeIn(tiga[2], shift=UP * 0.2), run_time=0.6)
            b.tunggu_kata("bulat")
            b.main(Indicate(koor_desimal, color=REDUP), run_time=0.8)
            b.tunggu_kata("persis")
            b.main(Indicate(tiga, color=SOROT), run_time=1.0)
        qc.periksa_adegan(self, {"lingkaran": ling_ingat, "tiga": tiga}, hud=hud(ident, papan),
                          dunia={"sumbu": sumbu_ingat}, tulisan={"koordinat": koor_desimal})

        # ============ persegi bersisi 1, dipotong diagonal =============== #
        kb = PANGGUNG + LEFT * SISI * 0.5 + DOWN * SISI * 0.5
        kanan_bawah, kanan_atas, kiri_atas = kb + RIGHT * SISI, kb + RIGHT * SISI + UP * SISI, kb + UP * SISI
        persegi = Square(side_length=SISI).move_to(PANGGUNG).set_stroke(TINTA, 4)
        diagonal = Line(kb, kanan_atas).set_stroke(SOROT, 5)
        l_bawah = rumus("1", 30, TINTA).next_to(persegi, DOWN, buff=0.2)
        l_kiri = rumus("1", 30, TINTA).next_to(persegi, LEFT, buff=0.2)
        with sinema.babak(self, "persegi", DURASI, kata=KATA) as b:
            b.tunggu_kata("pertama")
            ident2 = sinema.identitas(self, "dua bangun")
            ident2.set_opacity(0.0)
            b.main(FadeOut(ling_ingat), FadeOut(sumbu_ingat), FadeOut(jari50), FadeOut(titik50),
                   FadeOut(koor_desimal), FadeOut(tiga), FadeOut(ident), run_time=0.6)
            # Persegi digambar SEKARANG, bersama identitas barunya, bukan tiga
            # detik kemudian pada kata "persegi": layar sempat kosong 2 detik.
            b.main(ident2.animate.set_opacity(1.0), ShowCreation(persegi), run_time=1.0)
            ident = ident2
            b.tunggu_kata("persegi", ke=2)
            b.main(Indicate(persegi, color=TINTA, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("satu")
            b.main(FadeIn(l_bawah), FadeIn(l_kiri), run_time=0.6)
            b.tunggu_kata("diagonalnya")
            b.main(ShowCreation(diagonal), run_time=1.0)
        qc.periksa_adegan(self, {"persegi": persegi, "diagonal": diagonal}, hud=hud(ident, papan),
                          tulisan={"bawah": l_bawah, "kiri": l_kiri})

        # ============ segitiga 45-45-90 ================================== #
        alas45 = Line(kb, kanan_bawah).set_stroke(AKSEN2, 5)
        tegak45 = Line(kanan_bawah, kanan_atas).set_stroke(AKSEN, 5)
        miring45 = Line(kb, kanan_atas).set_stroke(TINTA, 5)
        buang = VGroup(Line(kb, kiri_atas), Line(kiri_atas, kanan_atas)).set_stroke(TINTA, 4)
        siku45 = siku_tanda(kanan_bawah, kb - kanan_bawah, kanan_atas - kanan_bawah)
        s45a = busur_di(kb, kanan_bawah, kanan_atas, radius=0.5)
        s45b = busur_di(kanan_atas, kb, kanan_bawah, radius=0.5)
        l45a = rumus(r"45^\circ", 24, SOROT).move_to(kb + RIGHT * 0.95 + UP * 0.32)
        l45b = rumus(r"45^\circ", 24, SOROT).move_to(kanan_atas + LEFT * 0.34 + DOWN * 0.95)
        l_tegak45 = rumus("1", 30, AKSEN).next_to(tegak45, RIGHT, buff=0.2)
        segi45 = VGroup(alas45, tegak45, miring45, siku45, s45a, s45b)
        with sinema.babak(self, "empatlima", DURASI, kata=KATA) as b:
            b.tunggu_kata("tersisa")
            self.add(alas45, tegak45, miring45)
            self.remove(persegi, diagonal)
            self.add(buang)
            b.main(FadeOut(buang), FadeOut(l_kiri), run_time=0.8)
            b.main(ShowCreation(siku45), run_time=0.3)
            b.tunggu_kata("empat")
            b.main(ShowCreation(s45a), ShowCreation(s45b), FadeIn(l45a), FadeIn(l45b), run_time=0.9)
            b.tunggu_kata("tegaknya")
            b.main(FadeIn(l_tegak45), Indicate(l_bawah, color=AKSEN2), run_time=0.7)
        qc.periksa_adegan(self, {"segitiga": segi45}, hud=hud(ident, papan),
                          tulisan={"bawah": l_bawah, "tegak": l_tegak45, "45a": l45a, "45b": l45b})

        # ============ miring 45 lewat Pythagoras ========================== #
        h1 = rumus(r"1^2 + 1^2 = 2", 40, TINTA).move_to([X_KERJA, Y_KERJA + 0.8, 0])
        h2 = rumus(r"\text{miring} = \sqrt{2}", 40, TINTA).move_to([X_KERJA, Y_KERJA - 0.2, 0])
        l_miring45 = rumus(r"\sqrt{2}", 30, TINTA).move_to((kb + kanan_atas) / 2 + UP * 0.36 + LEFT * 0.34)
        with sinema.babak(self, "miring45", DURASI, kata=KATA) as b:
            b.tunggu_kata("Pythagoras")
            b.main(Indicate(miring45, color=SOROT, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("Satu")
            b.main(Write(h1), run_time=1.8)
            b.tunggu_kata("akar")
            b.main(Write(h2), FadeIn(l_miring45), run_time=1.0)
        qc.periksa_adegan(self, {"segitiga": segi45, "h1": h1, "h2": h2}, hud=hud(ident, papan),
                          tulisan={"bawah": l_bawah, "tegak": l_tegak45, "45a": l45a, "45b": l45b,
                                   "miring": l_miring45})

        # ============ sin 45 = 1 / akar 2 ================================ #
        with sinema.babak(self, "nilai45", DURASI, kata=KATA) as b:
            b.tunggu_kata("depan")
            b.main(FadeOut(h1), FadeOut(h2), run_time=0.3)
            sinema.lahir_rumus(self, r"\sin 45^\circ = \frac{1}{\sqrt{2}}", segi45, papan, b=b,
                               warna=SOROT, geser=RIGHT * 3.4 + UP * 0.6, sebagai_utama=False)
            b.tunggu_kata("pasti")
            b.main(papan.sorot(), run_time=0.8)
        qc.periksa_adegan(self, {"segitiga": segi45}, hud=hud(ident, papan),
                          tulisan={"bawah": l_bawah, "tegak": l_tegak45, "45a": l45a, "45b": l45b,
                                   "miring": l_miring45})

        # ============ cos 45 = 1 / akar 2 = akar 2 / 2 ==================== #
        h_rasional = rumus(r"\frac{1}{\sqrt{2}} = \frac{1}{\sqrt{2}} \cdot \frac{\sqrt{2}}{\sqrt{2}} = \frac{\sqrt{2}}{2}",
                           36, TINTA).move_to([X_KERJA, Y_KERJA - 0.9, 0])
        with sinema.babak(self, "cos45", DURASI, kata=KATA) as b:
            b.tunggu_kata("Cosinus")
            b.main(Indicate(alas45, color=AKSEN2, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("juga")
            baris_cos45 = sinema.lahir_rumus(self, r"\cos 45^\circ = \frac{1}{\sqrt{2}}", segi45, papan, b=b,
                                             warna=SOROT, geser=RIGHT * 3.4 + UP * 0.6, sebagai_utama=False)
            b.tunggu_kata("Bentuk")
            b.main(Write(h_rasional), run_time=1.6)
            b.tunggu_kata("bentuk", ke=2)
            sinema.ganti_rumus(self, baris_cos45, r"\cos 45^\circ = \frac{\sqrt{2}}{2}", b=b,
                               run_time=0.9, papan=papan)
            b.tunggu_kata("tabel")
            b.main(papan.sorot(), run_time=0.8)
        qc.periksa_adegan(self, {"segitiga": segi45, "rasional": h_rasional}, hud=hud(ident, papan),
                          tulisan={"bawah": l_bawah, "tegak": l_tegak45, "45a": l45a, "45b": l45b,
                                   "miring": l_miring45})

        # ============ segitiga sama sisi bersisi 2, dibelah ============== #
        s = SISI * 1.12
        kb2 = PANGGUNG + LEFT * s * 0.5 + DOWN * s * 0.45
        kanan2 = kb2 + RIGHT * s
        puncak = kb2 + RIGHT * s * 0.5 + UP * s * np.sqrt(3) / 2
        tengah = kb2 + RIGHT * s * 0.5
        samasisi = Polygon(kb2, kanan2, puncak).set_stroke(TINTA, 4).set_fill(opacity=0)
        tinggi = DashedLine(puncak, tengah).set_stroke(SOROT, 4)
        l_dua = VGroup(rumus("2", 30, TINTA).move_to((kb2 + puncak) / 2 + LEFT * 0.3 + UP * 0.12),
                       rumus("2", 30, TINTA).move_to((kanan2 + puncak) / 2 + RIGHT * 0.3 + UP * 0.12),
                       rumus("2", 30, TINTA).next_to(Line(kb2, kanan2), DOWN, buff=0.2))
        with sinema.babak(self, "samasisi", DURASI, kata=KATA) as b:
            b.tunggu_kata("kedua")
            b.main(FadeOut(segi45), FadeOut(l_bawah), FadeOut(l_tegak45), FadeOut(l45a),
                   FadeOut(l45b), FadeOut(l_miring45), FadeOut(h_rasional), run_time=0.6)
            b.tunggu_kata("segitiga")
            b.main(ShowCreation(samasisi), run_time=1.2)
            b.tunggu_kata("dua")
            b.main(LaggedStartMap(FadeIn, l_dua, lag_ratio=0.3), run_time=0.9)
            b.tunggu_kata("belah")
            b.main(ShowCreation(tinggi), run_time=0.9)
        qc.periksa_adegan(self, {"samasisi": samasisi, "tinggi": tinggi}, hud=hud(ident, papan),
                          tulisan={"dua": l_dua})

        # ============ segitiga 30-60-90 ================================== #
        alas30 = Line(tengah, kanan2).set_stroke(AKSEN2, 5)
        tegak30 = Line(tengah, puncak).set_stroke(AKSEN, 5)
        miring30 = Line(kanan2, puncak).set_stroke(TINTA, 5)
        buang2 = VGroup(Line(kb2, tengah), Line(kb2, puncak)).set_stroke(TINTA, 4)
        siku30 = siku_tanda(tengah, kanan2 - tengah, puncak - tengah)
        s30 = busur_di(puncak, tengah, kanan2, radius=0.6)
        s60 = busur_di(kanan2, puncak, tengah, radius=0.5)
        l30 = rumus(r"30^\circ", 24, SOROT).move_to(puncak + DOWN * 1.0 + RIGHT * 0.2)
        l60 = rumus(r"60^\circ", 24, SOROT).move_to(kanan2 + LEFT * 0.62 + UP * 0.34)
        l_alas30 = rumus("1", 30, AKSEN2).next_to(alas30, DOWN, buff=0.2)
        l_miring30 = rumus("2", 30, TINTA).move_to((kanan2 + puncak) / 2 + RIGHT * 0.3 + UP * 0.12)
        segi30 = VGroup(alas30, tegak30, miring30, siku30, s30, s60)
        with sinema.babak(self, "tigapuluh", DURASI, kata=KATA) as b:
            b.tunggu_kata("muncul")
            self.add(alas30, tegak30, miring30)
            self.remove(samasisi, tinggi)
            self.add(buang2)
            b.main(FadeOut(buang2), FadeOut(l_dua), run_time=0.8)
            b.main(ShowCreation(siku30), run_time=0.3)
            b.tunggu_kata("tiga")
            b.main(ShowCreation(s30), FadeIn(l30), run_time=0.7)
            b.tunggu_kata("enam")
            b.main(ShowCreation(s60), FadeIn(l60), run_time=0.7)
            b.tunggu_kata("Alasnya")
            b.main(FadeIn(l_alas30), Indicate(alas30, color=AKSEN2, scale_factor=1.0), run_time=0.7)
            b.tunggu_kata("miringnya")
            b.main(FadeIn(l_miring30), Indicate(miring30, color=TINTA, scale_factor=1.0), run_time=0.7)
        qc.periksa_adegan(self, {"segitiga": segi30}, hud=hud(ident, papan),
                          tulisan={"30": l30, "60": l60, "alas": l_alas30, "miring": l_miring30})

        # ============ tegak 30 lewat Pythagoras =========================== #
        h3 = rumus(r"2^2 - 1^2 = 3", 40, TINTA).move_to([X_KERJA, Y_KERJA + 0.8, 0])
        h4 = rumus(r"\text{tegak} = \sqrt{3}", 40, TINTA).move_to([X_KERJA, Y_KERJA - 0.2, 0])
        l_tegak30 = rumus(r"\sqrt{3}", 30, AKSEN).next_to(tegak30, LEFT, buff=0.16)
        with sinema.babak(self, "tegak30", DURASI, kata=KATA) as b:
            b.tunggu_kata("Pythagoras")
            b.main(Indicate(tegak30, color=SOROT, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("Dua")
            b.main(Write(h3), run_time=1.8)
            b.tunggu_kata("akar")
            b.main(Write(h4), FadeIn(l_tegak30), run_time=1.0)
        qc.periksa_adegan(self, {"segitiga": segi30, "h3": h3, "h4": h4}, hud=hud(ident, papan),
                          tulisan={"30": l30, "60": l60, "alas": l_alas30, "miring": l_miring30,
                                   "tegak": l_tegak30})

        # ============ sin 30 dan sin 60 ================================== #
        with sinema.babak(self, "nilai30", DURASI, kata=KATA) as b:
            b.tunggu_kata("sinus")
            b.main(FadeOut(h3), FadeOut(h4), run_time=0.3)
            sinema.lahir_rumus(self, r"\sin 30^\circ = \frac{1}{2}", segi30, papan, b=b,
                               warna=SOROT, geser=RIGHT * 3.4 + UP * 0.6, sebagai_utama=False)
            b.tunggu_kata("sinus", ke=2)
            sinema.lahir_rumus(self, r"\sin 60^\circ = \frac{\sqrt{3}}{2}", segi30, papan, b=b,
                               warna=SOROT, geser=RIGHT * 3.4 + UP * 0.6, sebagai_utama=False)
        qc.periksa_adegan(self, {"segitiga": segi30}, hud=hud(ident, papan),
                          tulisan={"30": l30, "60": l60, "alas": l_alas30, "miring": l_miring30,
                                   "tegak": l_tegak30})

        # ============ cos 30 dan cos 60: baca sisi sampingnya ============= #
        with sinema.babak(self, "cos30", DURASI, kata=KATA) as b:
            b.tunggu_kata("sampingnya")
            b.main(Indicate(tegak30, color=AKSEN, scale_factor=1.0),
                   Indicate(alas30, color=AKSEN2, scale_factor=1.0), run_time=0.9)
            b.tunggu_kata("tiga puluh")
            sinema.lahir_rumus(self, r"\cos 30^\circ = \frac{\sqrt{3}}{2}", segi30, papan, b=b,
                               warna=SOROT, geser=RIGHT * 3.4 + UP * 0.6, sebagai_utama=False)
            b.tunggu_kata("enam puluh")
            sinema.lahir_rumus(self, r"\cos 60^\circ = \frac{1}{2}", segi30, papan, b=b,
                               warna=SOROT, geser=RIGHT * 3.4 + UP * 0.6, sebagai_utama=False)
            b.tunggu_kata("bertukar")
            b.main(papan.sorot(), run_time=0.8)
        qc.periksa_adegan(self, {"segitiga": segi30}, hud=hud(ident, papan),
                          tulisan={"30": l30, "60": l60, "alas": l_alas30, "miring": l_miring30,
                                   "tegak": l_tegak30})

        # ============ ciutkan ke sisi miring 1 ============================ #
        # Segitiga 30-60 diciutkan setengah di sekitar titik sudut 60 (kanan2);
        # segitiga 45 digambar lagi kecil di kirinya, sisi 1/akar 2 satuan.
        # Skala ciut = jari-jari lingkaran satuan (1,9) dibagi sisi miring
        # semula (2 satuan = s): sisi miringnya jadi persis sepanjang jari-jari
        # lingkaran yang akan datang, dan segitiganya masih terbaca (0,5 terlalu
        # kecil di lembar 480p).
        CIUT = R_LING / s
        grup30 = VGroup(alas30, tegak30, miring30, siku30, s30, s60, l30, l60)
        tengah_k = kanan2 + (tengah - kanan2) * CIUT
        puncak_k = kanan2 + (puncak - kanan2) * CIUT
        l_alas_k = rumus(r"\tfrac{1}{2}", 28, AKSEN2).next_to(Line(tengah_k, kanan2), DOWN, buff=0.18)
        l_tegak_k = rumus(r"\tfrac{\sqrt{3}}{2}", 28, AKSEN).next_to(Line(tengah_k, puncak_k), LEFT, buff=0.14)
        l_miring_k = rumus("1", 28, TINTA).move_to((kanan2 + puncak_k) / 2 + RIGHT * 0.3 + UP * 0.14)
        s45 = R_LING / np.sqrt(2)
        kb45 = np.array([-6.3, kanan2[1], 0.0])
        kbawah45, katas45 = kb45 + RIGHT * s45, kb45 + RIGHT * s45 + UP * s45
        segi45k = VGroup(Line(kb45, kbawah45).set_stroke(AKSEN2, 5),
                         Line(kbawah45, katas45).set_stroke(AKSEN, 5),
                         Line(kb45, katas45).set_stroke(TINTA, 5),
                         siku_tanda(kbawah45, kb45 - kbawah45, katas45 - kbawah45),
                         busur_di(kb45, kbawah45, katas45, radius=0.42))
        l45k = rumus(r"45^\circ", 22, SOROT).move_to(kb45 + RIGHT * 0.78 + UP * 0.26)
        l_alas45k = rumus(r"\tfrac{\sqrt{2}}{2}", 28, AKSEN2).next_to(segi45k[0], DOWN, buff=0.18)
        l_tegak45k = rumus(r"\tfrac{\sqrt{2}}{2}", 28, AKSEN).next_to(segi45k[1], RIGHT, buff=0.14)
        l_miring45k = rumus("1", 28, TINTA).move_to((kb45 + katas45) / 2 + UP * 0.3 + LEFT * 0.3)
        with sinema.babak(self, "ciut", DURASI, kata=KATA) as b:
            b.tunggu_kata("ciutkan")
            b.main(FadeOut(l_alas30), FadeOut(l_miring30), FadeOut(l_tegak30),
                   grup30.animate.scale(CIUT, about_point=kanan2), run_time=1.3)
            b.tunggu_kata("miringnya")
            b.main(FadeIn(l_miring_k), run_time=0.5)
            b.tunggu_kata("setengah")
            b.main(FadeIn(l_alas_k), run_time=0.5)
            b.tunggu_kata("akar tiga")
            b.main(FadeIn(l_tegak_k), run_time=0.5)
            b.tunggu_kata("Segitiga", ke=2)
            b.main(ShowCreation(segi45k), FadeIn(l45k), run_time=0.9)
            b.tunggu_kata("dibagi", ke=2)
            b.main(FadeIn(l_miring45k), run_time=0.5)
            b.tunggu_kata("kedua")
            b.main(FadeIn(l_alas45k), FadeIn(l_tegak45k), run_time=0.7)
        qc.periksa_adegan(self, {"segitiga 30": grup30, "segitiga 45": segi45k}, hud=hud(ident, papan),
                          tulisan={"30": l30, "60": l60, "alas": l_alas_k, "tegak": l_tegak_k,
                                   "miring": l_miring_k, "45": l45k, "alas45": l_alas45k,
                                   "tegak45": l_tegak45k, "miring45": l_miring45k})

        # ============ ketiganya di lingkaran satuan ====================== #
        pusat = PANGGUNG
        lingkaran = Circle(radius=R_LING).move_to(pusat).set_stroke(TINTA, 3.2)
        sumbu = VGroup(Line(pusat + LEFT * R_LING * 1.15, pusat + RIGHT * R_LING * 1.15),
                       Line(pusat + DOWN * R_LING * 1.1, pusat + UP * R_LING * 1.15)
                       ).set_stroke(REDUP, 2)
        sumbu.latar = True
        tanda_sudut = VGroup()
        for d in ISTIMEWA:
            arah = np.array([np.cos(np.radians(d)), np.sin(np.radians(d)), 0.0])
            garis = Line(pusat + arah * R_LING, pusat + arah * R_LING * 1.1).set_stroke(REDUP, 2)
            lab = rumus(rf"{d}^\circ", 24, TINTA).move_to(pusat + arah * R_LING * 1.32)
            tanda_sudut.add(VGroup(garis, lab))
        theta = ValueTracker(30.0)

        def arah_t():
            return np.array([np.cos(np.radians(theta.get_value())),
                             np.sin(np.radians(theta.get_value())), 0.0])

        def P_t():
            return pusat + R_LING * arah_t()

        def K_t():
            return np.array([P_t()[0], pusat[1], 0.0])

        jari = always_redraw(lambda: Line(pusat, P_t()).set_stroke(TINTA, 5))
        juring = always_redraw(lambda: Sector(
            radius=R_LING, angle=max(np.radians(theta.get_value()), 1e-3), arc_center=pusat
        ).set_fill(SOROT, 0.16).set_stroke(width=0))
        titik = always_redraw(lambda: Dot(P_t(), radius=0.075).set_color(AKSEN))
        kaki_cos = always_redraw(lambda: Line(pusat, K_t()).set_stroke(AKSEN2, 5))
        kaki_sin = always_redraw(lambda: Line(K_t(), P_t()).set_stroke(AKSEN, 5))
        sapuan = VGroup(juring, jari, titik)
        koor_umum2 = rumus(r"(\cos\theta, \sin\theta)", 30, TINTA)
        # Di kanan bawah titiknya: di kanan atas ia menabrak label "30°" di tepi
        # lingkaran (lembar 480p, 163 detik).
        koor_umum2.add_updater(lambda m: m.next_to(P_t(), RIGHT, buff=0.3).shift(DOWN * 0.35))
        with sinema.babak(self, "lingkaran", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang")
            ident3 = sinema.identitas(self, "lingkaran satuan")
            ident3.set_opacity(0.0)
            b.main(FadeOut(grup30), FadeOut(segi45k), FadeOut(l45k), FadeOut(l_alas_k), FadeOut(l_tegak_k),
                   FadeOut(l_miring_k), FadeOut(l_alas45k), FadeOut(l_tegak45k), FadeOut(l_miring45k),
                   FadeOut(ident), run_time=0.5)
            b.main(ident3.animate.set_opacity(1.0), run_time=0.3)
            ident = ident3
            b.tunggu_kata("lingkaran")
            b.main(ShowCreation(sumbu), ShowCreation(lingkaran), run_time=1.0)
            b.main(LaggedStart(*[FadeIn(m, shift=UP * 0.1) for m in tanda_sudut], lag_ratio=0.3),
                   run_time=0.6)
            b.tunggu_kata("Setiap")
            b.main(FadeIn(sapuan), ShowCreation(kaki_cos), ShowCreation(kaki_sin), run_time=0.8)
            b.tunggu_kata("cosinus")
            b.main(Write(koor_umum2), run_time=1.0)
            b.tunggu_kata("sampingnya")
            b.main(Indicate(kaki_cos, color=AKSEN2, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("depannya")
            b.main(Indicate(kaki_sin, color=AKSEN, scale_factor=1.0), run_time=0.8)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "sapuan": sapuan},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"koordinat": koor_umum2})

        # ============ jari-jari berhenti di tiap sudut, koordinat muncul == #
        isi_koor = [r"\left(\tfrac{\sqrt{3}}{2}, \tfrac{1}{2}\right)",
                    r"\left(\tfrac{\sqrt{2}}{2}, \tfrac{\sqrt{2}}{2}\right)",
                    r"\left(\tfrac{1}{2}, \tfrac{\sqrt{3}}{2}\right)"]
        koor = VGroup()
        for d, isi in zip(ISTIMEWA, isi_koor):
            arah = np.array([np.cos(np.radians(d)), np.sin(np.radians(d)), 0.0])
            m = rumus(isi, 26, SOROT).move_to(pusat + arah * R_LING * 1.72)
            koor.add(m)
        # Label 45 derajat digeser sedikit ke luar supaya tiga koordinat yang
        # berdekatan (15 derajat) tidak bersinggungan.
        koor[1].shift(RIGHT * 0.55 + UP * 0.1)
        # Angka kaki di 30 derajat: samping akar 3 / 2 di bawah kaki mendatar,
        # depan 1/2 di kanan kaki tegak, dibaca sebelum koordinatnya ditulis.
        arah30 = np.array([np.cos(np.radians(30)), np.sin(np.radians(30)), 0.0])
        k30 = np.array([pusat[0] + R_LING * arah30[0], pusat[1], 0.0])
        l_samping30 = rumus(r"\tfrac{\sqrt{3}}{2}", 26, AKSEN2).next_to(Line(pusat, k30), DOWN, buff=0.14)
        l_depan30 = rumus(r"\tfrac{1}{2}", 26, AKSEN).next_to(Line(k30, pusat + R_LING * arah30), RIGHT, buff=0.12)
        with sinema.babak(self, "sapu", DURASI, kata=KATA) as b:
            b.tunggu_kata("menyapu")
            b.main(theta.animate.set_value(0), run_time=0.5, rate_func=smooth)
            b.tunggu_kata("berhenti")
            b.main(theta.animate.set_value(30), run_time=0.7, rate_func=smooth)
            b.main(FadeOut(koor_umum2), FadeOut(tanda_sudut[0][1]), run_time=0.3)
            b.tunggu_kata("sampingnya")
            b.main(FadeIn(l_samping30), Indicate(kaki_cos, color=AKSEN2, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("depannya")
            b.main(FadeIn(l_depan30), Indicate(kaki_sin, color=AKSEN, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("titiknya")
            b.main(FadeIn(koor[0]), run_time=0.5)
            b.tunggu_kata("empat")
            b.main(FadeOut(l_samping30), FadeOut(l_depan30), run_time=0.2)
            b.main(theta.animate.set_value(45), run_time=0.6, rate_func=smooth)
            b.main(FadeOut(tanda_sudut[1][1]), FadeIn(koor[1]), run_time=0.3)
            b.tunggu_kata("enam")
            b.main(theta.animate.set_value(60), run_time=0.6, rate_func=smooth)
            b.main(FadeOut(tanda_sudut[2][1]), FadeIn(koor[2]), run_time=0.3)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "sapuan": sapuan},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"koor 30": koor[0], "koor 45": koor[1], "koor 60": koor[2]})

        # ============ penutup ============================================ #
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("Itulah")
            b.main(theta.animate.set_value(45), run_time=1.2, rate_func=smooth)
            b.tunggu_kata("dihitung")
            b.main(papan.sorot(), run_time=1.0)

        lanjut = teks("Grafik Fungsi Trigonometri, Bagian 1", 30, SOROT)
        # Di bawah panel: panelnya kini enam baris pecahan (sin dan cos 45, 30,
        # 60) dan menjulur sampai y sekitar -0,3; di Y_KERJA teksnya tertindih
        # (qc, 480p 13 Sep).
        lanjut.move_to([X_KERJA, -1.9, 0])
        sinema.batasi_lebar(lanjut, 7.4)
        tinggi_titik = always_redraw(lambda: Line(
            pusat + R_LING * arah_t(), np.array([pusat[0] + R_LING * arah_t()[0], pusat[1], 0.0])
        ).set_stroke(AKSEN, 5))
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Grafik")
            b.main(FadeIn(lanjut, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("berputar")
            b.main(theta.animate.set_value(70), run_time=1.2, rate_func=smooth)
            b.tunggu_kata("tingginya")
            b.main(ShowCreation(tinggi_titik), run_time=0.7)
            b.main(theta.animate.set_value(20), run_time=1.6, rate_func=smooth)
        qc.periksa_adegan(self, {"lingkaran": lingkaran, "sapuan": sapuan, "tinggi": tinggi_titik},
                          hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"koor 30": koor[0], "koor 45": koor[1], "koor 60": koor[2],
                                   "lanjut": lanjut})

        sinema.laporkan_pemicu(self)
