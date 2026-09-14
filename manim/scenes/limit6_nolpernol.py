"""Sifat Limit dan Cara Menghitungnya, Bagian 2 (Materi 06): kalau hasilnya 0 : 0.
STANDAR VIDEO v3.1, ditulis ulang 12 Sep 2026 dari adegan Manim CE yang sudah
disetujui ARYA. ISINYA SAMA: 0 : 0 bukan berarti limitnya tidak ada, melainkan
bentuknya belum bercerita; bukti dua soal di titik yang sama (x menuju 2)
sama-sama 0 : 0 tetapi jawabannya 2 dan 4; cara 1 memfaktorkan (x kuadrat - 4)
: (x - 2) dengan syarat x bukan 2, hasil 4; cara 2 mengalikan sekawan pada
(akar(x + 4) - 2) : x, hasil 1/4; urutan tetap: masukkan, kalau 0 : 0 tulis
ulang bentuknya, masukkan lagi.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 2 dengan substitusi yang mentok 0 : 0;
  segar-ingat Bagian 1 (cara cepat: lim (x kuadrat + 1) = 10 dengan
  memasukkan 3).
- Hasil cara 1 DICEK dengan angka di x = 2,1: 0,41 : 0,1 = 4,1, dekat 4.
- Kalimat narasi tidak diulang sebagai teks; "limit tidak ada" hanya tampil
  untuk DICORET, dan ringkasan urutan di penutup memakai lambang panah.
- Rumus lahir besar di fokus lalu terbang ke panel: x bukan 2, hasil cara 1,
  x bukan 0, hasil cara 2. Coretan faktor berupa garis tipis.
- Tiap kejadian dipicu pada kata yang mengucapkannya.

TATA LETAK: panggung pengerjaan di kiri tengah (tepi kiri x -5,6), baris
demi baris ke bawah; panel rumus di kanan atas menampung syarat dan hasil.

WARNA: tinta = rumus yang dikerjakan, merah = bentuk 0 : 0, syarat, dan
coretan, ungu = jawaban dan sorot, redup = pola umum.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "limit6-nolpernol"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

X_KIRI = -5.6          # tepi kiri baris pengerjaan
FS = 44                # ukuran rumus utama


def hud(ident, papan):
    isi = {"identitas": ident} if ident is not None else {}
    p = papan.semua()
    if p is not None:
        isi["papan"] = p
    return isi


def coretan(g, warna=AKSEN):
    """Garis miring tipis melintasi glyph atau kelompok g, tidak menutup hurufnya."""
    return Line(g.get_corner(DL) + np.array([-0.05, -0.05, 0]),
                g.get_corner(UR) + np.array([0.05, 0.05, 0])).set_stroke(warna, 3)


def pita_atas(m, warna=SOROT):
    return SurroundingRectangle(m, buff=0.08).set_fill(warna, 0.18).set_stroke(width=0)


def pecahan(kiri, atas, bawah, ukuran=FS, warna=TINTA, warna_atas=None, warna_bawah=None):
    """Pecahan dengan pembilang dan penyebut yang bisa dipegang sendiri-sendiri."""
    k = rumus(kiri, ukuran, warna) if kiri else None
    a = rumus(atas, ukuran - 4, warna_atas or warna)
    b = rumus(bawah, ukuran - 4, warna_bawah or warna)
    lebar = max(a.get_width(), b.get_width()) + 0.16
    garis = Line(LEFT * lebar / 2, RIGHT * lebar / 2).set_stroke(warna, 2)
    pec = VGroup(a, garis, b).arrange(DOWN, buff=0.1)
    if k is None:
        return pec, a, b
    return VGroup(k, pec).arrange(RIGHT, buff=0.16), a, b


def di_kiri(m, y, x=X_KIRI):
    return m.move_to([x + m.get_width() / 2, y, 0])


class NolPerNol(AdeganMatra):
    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        ident = None

        # ============ buka: angkanya dimasukkan, mentok 0 : 0 ============ #
        soal0, s0_atas, s0_bawah = pecahan(r"\lim_{x \to 2}", r"x^2 - 4", r"x - 2", ukuran=44)
        soal0.move_to([-2.2, 0.4, 0])
        subs0, _, _ = pecahan("=", r"2^2 - 4", r"2 - 2", ukuran=44)
        subs0.next_to(soal0, RIGHT, buff=0.2)
        nol0 = rumus(r"= \frac{0}{0}", 44, AKSEN).next_to(subs0, RIGHT, buff=0.2)
        tanya = rumus("?", 64, SOROT).next_to(nol0, RIGHT, buff=0.5)
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sifat")
            sinema.judul_pembuka(self, "Sifat Limit dan Cara Menghitungnya, Bagian 2", lama=3.6)
            b.catat(3.6)
            b.tunggu_kata("Angkanya")
            b.main(Write(soal0), run_time=0.6)
            b.tunggu_kata("dimasukkan")
            b.main(Write(subs0), run_time=0.9)
            b.tunggu_kata("nol")
            b.main(FadeIn(nol0, shift=RIGHT * 0.15), run_time=0.6)
            b.tunggu_kata("Sekarang")
            b.main(FadeIn(tanya, scale=1.4), run_time=0.5)
        qc.periksa_adegan(self, {"soal": soal0, "subs": subs0}, hud=hud(ident, papan),
                          tulisan={"nol": nol0, "tanya": tanya})

        # ============ segar-ingat: cara cepat Bagian 1 =================== #
        cepat = rumus(r"\lim_{x \to 3} (x^2 + 1) = 3^2 + 1 = 10", 40, TINTA).move_to([-1.6, 0.4, 0])
        buntu = rumus(r"\frac{0}{0}", 72, AKSEN).move_to([-1.6, 0.4, 0])
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi sebelumnya")
            ident = sinema.identitas(self, "ingat Bagian 1")
            ident.set_opacity(0.0)
            b.main(FadeOut(soal0), FadeOut(subs0), FadeOut(nol0), FadeOut(tanya),
                   ident.animate.set_opacity(1.0), run_time=0.5)
            b.tunggu_kata("limit")
            b.main(Write(cepat), run_time=1.6)
            b.tunggu_kata("Kali")
            b.main(FadeOut(cepat), run_time=0.4)
            b.tunggu_kata("buntu")
            b.main(FadeIn(buntu, scale=1.3), run_time=0.5)
        qc.periksa_adegan(self, {"buntu": buntu}, hud=hud(ident, papan))

        # ============ luruskan: 0 : 0 bukan berarti limitnya tidak ada === #
        klaim = rumus(r"\text{limit tidak ada}", 34, AKSEN).move_to([-1.6, -1.0, 0])
        # Teks dicoret MENDATAR (garis miring pada kalimat lebar terlihat landai).
        coret_klaim = Line(klaim.get_left() + LEFT * 0.08, klaim.get_right() + RIGHT * 0.08).set_stroke(AKSEN, 4)
        belum = sinema.label("belum bercerita", ukuran=30, warna=SOROT).move_to([-1.6, -1.0, 0])
        with sinema.babak(self, "bukan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Pertama")
            b.main(FadeOut(ident), run_time=0.3)
            ident = None
            b.tunggu_kata("Bentuk")
            pb = pita_atas(buntu)
            b.main(FadeIn(pb), run_time=0.4)
            b.main(FadeOut(pb), run_time=0.4)
            b.tunggu_kata("limitnya")
            b.main(FadeIn(klaim, shift=UP * 0.1), run_time=0.5)
            b.tunggu_kata("ada")
            b.main(ShowCreation(coret_klaim), run_time=0.5)
            b.tunggu_kata("belum")
            b.main(FadeOut(klaim), FadeOut(coret_klaim), run_time=0.3)
            b.main(FadeIn(belum, shift=UP * 0.1), run_time=0.5)
        qc.periksa_adegan(self, {"buntu": buntu}, hud=hud(ident, papan), tulisan={"belum": belum})

        # ============ bukti: dua soal, sama-sama 0 : 0, jawabannya beda == #
        soal_a, _, _ = pecahan(r"\lim_{x \to 2}", r"2x - 4", r"x - 2", ukuran=40)
        soal_b, _, _ = pecahan(r"\lim_{x \to 2}", r"x^2 - 4", r"x - 2", ukuran=40)
        soal_a.move_to([-3.6, 1.2, 0])
        soal_b.move_to([1.4, 1.2, 0])
        nol_a = rumus(r"\to \frac{0}{0}", 40, AKSEN).next_to(soal_a, DOWN, buff=0.45)
        nol_b = rumus(r"\to \frac{0}{0}", 40, AKSEN).next_to(soal_b, DOWN, buff=0.45)
        jawab_a = rumus("= 2", 48, SOROT).next_to(nol_a, DOWN, buff=0.4)
        jawab_b = rumus("= 4", 48, SOROT).next_to(nol_b, DOWN, buff=0.4)
        with sinema.babak(self, "bukti", DURASI, kata=KATA) as b:
            b.tunggu_kata("dua")
            b.main(FadeOut(buntu), FadeOut(belum), run_time=0.4)
            b.main(Write(soal_a), Write(soal_b), run_time=0.9)
            b.tunggu_kata("nol")
            b.main(FadeIn(nol_a, shift=DOWN * 0.1), FadeIn(nol_b, shift=DOWN * 0.1), run_time=0.6)
            b.tunggu_kata("satu")
            b.main(FadeIn(jawab_a, scale=1.3), run_time=0.5)
            b.tunggu_kata("lain")
            b.main(FadeIn(jawab_b, scale=1.3), run_time=0.5)
            b.tunggu_kata("belum")
            pn = VGroup(pita_atas(nol_a), pita_atas(nol_b))
            b.main(FadeIn(pn), run_time=0.4)
            b.main(FadeOut(pn), run_time=0.4)
        qc.periksa_adegan(self, {"soal a": soal_a, "soal b": soal_b}, hud=hud(ident, papan),
                          tulisan={"nol a": nol_a, "nol b": nol_b, "jawab a": jawab_a, "jawab b": jawab_b})

        # ============ cara 1: memfaktorkan ============================== #
        pola, p_atas, p_bawah = pecahan(None, r"(x - a) \cdot P", r"(x - a) \cdot Q", ukuran=40, warna=REDUP)
        pola.move_to([-1.6, 0.4, 0])
        with sinema.babak(self, "cara1", DURASI, kata=KATA) as b:
            b.tunggu_kata("Cara")
            b.main(FadeOut(soal_a), FadeOut(soal_b), FadeOut(nol_a), FadeOut(nol_b),
                   FadeOut(jawab_a), FadeOut(jawab_b), run_time=0.4)
            ident = sinema.identitas(self, "cara faktor")
            ident.set_opacity(0.0)
            b.main(ident.animate.set_opacity(1.0), run_time=0.3)
            # Pola ditulis begitu kata "memfaktorkan" terdengar: kalau menunggu
            # "sama-sama", layar kosong empat detik (cek_layar_kosong).
            b.tunggu_kata("memfaktorkan")
            b.main(Write(pola), run_time=1.2)
            b.tunggu_kata("sama-sama")
            pp = VGroup(pita_atas(p_atas), pita_atas(p_bawah))
            b.main(FadeIn(pp), run_time=0.4)
            b.main(FadeOut(pp), run_time=0.4)
            b.tunggu_kata("faktor")
            pf = VGroup(pita_atas(VGroup(*p_atas.family_members_with_points()[0:5])),
                        pita_atas(VGroup(*p_bawah.family_members_with_points()[0:5])))
            b.main(FadeIn(pf), run_time=0.4)
            b.main(FadeOut(pf), run_time=0.4)
        qc.periksa_adegan(self, {"pola": pola}, hud=hud(ident, papan))

        # ============ (x^2 - 4) : (x - 2) difaktorkan ==================== #
        soal1, s1_atas, s1_bawah = pecahan(r"\lim_{x \to 2}", r"x^2 - 4", r"x - 2")
        di_kiri(soal1, 1.6)
        baris2, b2_atas, b2_bawah = pecahan(r"= \lim_{x \to 2}", r"(x - 2)(x + 2)", r"x - 2")
        di_kiri(baris2, 0.1)
        g2 = b2_atas.family_members_with_points()
        faktor_kiri = VGroup(*g2[0:5])
        faktor_kanan = VGroup(*g2[5:10])
        with sinema.babak(self, "faktor", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ambil")
            b.main(FadeOut(pola), run_time=0.3)
            b.main(Write(soal1), run_time=1.4)
            b.tunggu_kata("Pembilangnya")
            b.main(Write(baris2), run_time=1.4)
            b.tunggu_kata("x", ke=4)
            pk = pita_atas(faktor_kiri)
            b.main(FadeIn(pk), run_time=0.3)
            b.main(FadeOut(pk), run_time=0.3)
            b.tunggu_kata("dikali")
            pk2 = pita_atas(faktor_kanan)
            b.main(FadeIn(pk2), run_time=0.3)
            b.main(FadeOut(pk2), run_time=0.3)
        qc.periksa_adegan(self, {"soal": soal1, "baris 2": baris2}, hud=hud(ident, papan))

        # ============ coret (x - 2), asal x bukan 2 ====================== #
        coret_a = coretan(faktor_kiri)
        coret_b = coretan(b2_bawah)
        with sinema.babak(self, "coret1", DURASI, kata=KATA) as b:
            b.tunggu_kata("dicoret")
            b.main(ShowCreation(coret_a), ShowCreation(coret_b), run_time=0.7)
            b.tunggu_kata("hanya")
            sinema.lahir_rumus(self, r"x \neq 2", baris2, papan, b=b, warna=AKSEN,
                               sebagai_utama=False, geser=np.array([1.5, -1.3, 0.0]), tahan=0.5)
        qc.periksa_adegan(self, {"soal": soal1, "baris 2": baris2, "coretan": VGroup(coret_a, coret_b)},
                          hud=hud(ident, papan))

        # ============ sisanya x + 2, masukkan 2, hasilnya 4 ============== #
        sisa1 = rumus(r"= \lim_{x \to 2} (x + 2)", FS, TINTA)
        di_kiri(sisa1, -1.4)
        subs1 = rumus(r"= 2 + 2", FS, TINTA).next_to(sisa1, RIGHT, buff=0.25)
        hasil1 = rumus(r"= 4", FS, SOROT).next_to(subs1, RIGHT, buff=0.25)
        with sinema.babak(self, "hasil1", DURASI, kata=KATA) as b:
            b.tunggu_kata("tersisa")
            b.main(Write(sisa1), run_time=1.0)
            b.tunggu_kata("Masukkan")
            b.main(FadeIn(subs1, shift=RIGHT * 0.15), run_time=0.6)
            b.tunggu_kata("hasilnya")
            # 0,3 / tahan 0,1 / 0,5 (dulu 0,5 / 0,2 / 0,8): narasi Bian menyisakan
            # 1,8 detik sesudah "hasilnya", edge-tts dulu lebih longgar (14 Sep 2026)
            b.main(FadeIn(hasil1, scale=1.3), run_time=0.3)
            # Hasilnya langsung ke panel di sini: kalau menunggu babak "cek",
            # kata "Di" (2,7 s) keburu lewat (WaktuTidakMuat pada render uji).
            sinema.lahir_rumus(self, r"\lim_{x \to 2} \frac{x^2 - 4}{x - 2} = 4", hasil1, papan, b=b,
                               warna=SOROT, sebagai_utama=False, geser=np.array([3.6, 0.6, 0.0]),
                               tahan=0.1, run_time=0.5)
        qc.periksa_adegan(self, {"soal": soal1, "baris 2": baris2, "sisa": sisa1, "subs": subs1},
                          hud=hud(ident, papan), tulisan={"hasil": hasil1})

        # ============ cek dengan angka: x = 2,1 ========================== #
        cek1, c1_atas, c1_bawah = pecahan(r"x = 2{,}1:", r"2{,}1^2 - 4", r"2{,}1 - 2", ukuran=38)
        di_kiri(cek1, 0.9)
        cek2, c2_atas, c2_bawah = pecahan("=", r"4{,}41 - 4", r"0{,}1", ukuran=38)
        cek2.next_to(cek1, RIGHT, buff=0.22)
        cek3, _, _ = pecahan("=", r"0{,}41", r"0{,}1", ukuran=38)
        cek3.next_to(cek2, RIGHT, buff=0.22)
        hasil_cek = rumus(r"= 4{,}1", 40, SOROT)
        di_kiri(hasil_cek, -0.7)
        with sinema.babak(self, "cek", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di")
            b.main(FadeOut(soal1), FadeOut(baris2), FadeOut(coret_a), FadeOut(coret_b), FadeOut(sisa1),
                   FadeOut(subs1), FadeOut(hasil1), run_time=0.4)
            b.main(Write(cek1), run_time=1.2)
            b.tunggu_kata("pembilangnya")
            b.main(Write(cek2), run_time=1.2)
            b.tunggu_kata("yaitu")
            b.main(Write(cek3), run_time=1.0)
            b.tunggu_kata("Dibagi")
            pd = pita_atas(cek3[1][2])
            b.main(FadeIn(pd), run_time=0.3)
            b.main(FadeOut(pd), run_time=0.3)
            b.tunggu_kata("hasilnya")
            b.main(FadeIn(hasil_cek, scale=1.3), run_time=0.6)
            b.tunggu_kata("Memang")
            b.main(papan.sorot(), run_time=1.0)
        cek = VGroup(cek1, cek2, cek3, hasil_cek)
        qc.periksa_adegan(self, {"cek": cek}, hud=hud(ident, papan))

        # ============ cara 2: sekawan ==================================== #
        pola_kiri = rumus(r"\sqrt{A} - B", 40, TINTA)
        pola_panah = rumus(r"\longleftrightarrow", 40, REDUP)
        pola_kanan = rumus(r"\sqrt{A} + B", 40, TINTA)
        pola2 = VGroup(pola_kiri, pola_panah, pola_kanan).arrange(RIGHT, buff=0.4).move_to([-1.6, 0.4, 0])
        tanda_plus = pola_kanan.family_members_with_points()[-2]
        with sinema.babak(self, "cara2", DURASI, kata=KATA) as b:
            b.tunggu_kata("Cara")
            b.main(FadeOut(cek), FadeOut(ident), run_time=0.4)
            ident = sinema.identitas(self, "cara sekawan")
            ident.set_opacity(0.0)
            b.main(ident.animate.set_opacity(1.0), run_time=0.3)
            b.tunggu_kata("akar")
            b.main(Write(pola_kiri), run_time=0.8)
            b.tunggu_kata("sekawan")
            b.main(FadeIn(pola_panah), Write(pola_kanan), run_time=1.0)
            b.tunggu_kata("tanda", ke=2)
            pt = pita_atas(tanda_plus, AKSEN)
            b.main(FadeIn(pt), run_time=0.3)
            b.main(FadeOut(pt), run_time=0.5)
        qc.periksa_adegan(self, {"pola": pola2}, hud=hud(ident, papan))

        # ============ soal akar dan sekawan pembilangnya ================= #
        soal2, s2_atas, s2_bawah = pecahan(r"\lim_{x \to 0}", r"\sqrt{x + 4} - 2", r"x", ukuran=38)
        di_kiri(soal2, 1.9)
        nama_sekawan = sinema.label("sekawan", ukuran=28, warna=REDUP)
        isi_sekawan = rumus(r"\sqrt{x + 4} + 2", 38, AKSEN)
        sekawan = VGroup(nama_sekawan, isi_sekawan).arrange(RIGHT, buff=0.3)
        di_kiri(sekawan, 0.6)
        with sinema.babak(self, "sekawan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ambil")
            b.main(FadeOut(pola2), run_time=0.3)
            b.main(Write(soal2), run_time=1.5)
            b.tunggu_kata("Sekawan")
            b.main(FadeIn(nama_sekawan), run_time=0.4)
            b.tunggu_kata("akar", ke=2)
            b.main(Write(isi_sekawan), run_time=1.2)
        qc.periksa_adegan(self, {"soal": soal2}, hud=hud(ident, papan), tulisan={"sekawan": sekawan})

        # ============ kalikan atas dan bawah dengan sekawan ============== #
        k1, k1_atas, k1_bawah = pecahan(r"= \lim_{x \to 0}",
                                        r"(\sqrt{x + 4} - 2)(\sqrt{x + 4} + 2)",
                                        r"x\,(\sqrt{x + 4} + 2)", ukuran=34)
        di_kiri(k1, 0.6)
        k2, k2_atas, k2_bawah = pecahan(r"= \lim_{x \to 0}", r"(x + 4) - 4", r"x\,(\sqrt{x + 4} + 2)",
                                        ukuran=34)
        di_kiri(k2, -0.7)
        k3, k3_atas, k3_bawah = pecahan(r"= \lim_{x \to 0}", r"x", r"x\,(\sqrt{x + 4} + 2)", ukuran=34)
        di_kiri(k3, -1.9)
        with sinema.babak(self, "kali", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kalikan")
            b.main(FadeOut(sekawan), run_time=0.3)
            b.main(Write(k1), run_time=1.8)
            b.tunggu_kata("Pembilangnya")
            b.main(Write(k2), run_time=1.5)
            b.tunggu_kata("yaitu")
            b.main(Write(k3), run_time=1.2)
            b.tunggu_kata("Akarnya")
            pa = pita_atas(k2_atas)
            b.main(FadeIn(pa), run_time=0.4)
            b.main(FadeOut(pa), run_time=0.4)
        qc.periksa_adegan(self, {"soal": soal2, "k1": k1, "k2": k2, "k3": k3}, hud=hud(ident, papan))

        # ============ coret x, asal x bukan 0; hasilnya seperempat ======= #
        coret_x1 = coretan(k3_atas)
        coret_x2 = coretan(k3_bawah.family_members_with_points()[0])
        with sinema.babak(self, "hasil2", DURASI, kata=KATA) as b:
            b.tunggu_kata("dicoret")
            b.main(ShowCreation(coret_x1), ShowCreation(coret_x2), run_time=0.6)
            b.tunggu_kata("sah")
            sinema.lahir_rumus(self, r"x \neq 0", k3, papan, b=b, warna=AKSEN,
                               sebagai_utama=False, geser=np.array([3.6, 0.0, 0.0]), tahan=0.3,
                               run_time=1.0)
            b.tunggu_kata("tersisa")
            k4, k4_atas, k4_bawah = pecahan(r"= \lim_{x \to 0}", r"1", r"\sqrt{x + 4} + 2", ukuran=38)
            di_kiri(k4, -1.9)
            b.main(FadeOut(coret_x1), FadeOut(coret_x2), FadeOut(k3), run_time=0.3)
            b.main(FadeIn(k4), run_time=0.6)
            b.tunggu_kata("Masukkan")
            subs2, _, _ = pecahan("=", r"1", r"\sqrt{4} + 2", ukuran=38)
            subs2.next_to(k4, RIGHT, buff=0.25)
            b.main(FadeIn(subs2, shift=RIGHT * 0.15), run_time=0.6)
            b.tunggu_kata("hasilnya")
            hasil2 = rumus(r"= \frac{1}{4}", 40, SOROT).next_to(subs2, RIGHT, buff=0.25)
            b.main(FadeIn(hasil2, scale=1.3), run_time=0.6)
        qc.periksa_adegan(self, {"soal": soal2, "k1": k1, "k2": k2, "k4": k4, "subs": subs2}, hud=hud(ident, papan),
                          tulisan={"hasil": hasil2})

        # ============ penutup: urutan yang tidak pernah berubah ========== #
        langkah1 = sinema.label("masukkan angkanya", ukuran=32, warna=TINTA).move_to([-1.6, 1.3, 0])
        langkah2 = rumus(r"\text{wajar} \ \Rightarrow\ \text{itu jawabannya}", 32, SOROT).move_to([-1.6, 0.3, 0])
        langkah3a = rumus(r"\frac{0}{0} \ \Rightarrow\ \text{tulis ulang bentuknya}", 32, AKSEN)
        langkah3b = rumus(r"\Rightarrow\ \text{masukkan lagi}", 32, AKSEN)
        langkah3 = VGroup(langkah3a, langkah3b).arrange(RIGHT, buff=0.3).move_to([-1.6, -0.9, 0])
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("Urutannya")
            sinema.lahir_rumus(self, r"\lim_{x \to 0} \frac{\sqrt{x + 4} - 2}{x} = \frac{1}{4}", hasil2,
                               papan, b=b, warna=SOROT, sebagai_utama=False,
                               geser=np.array([1.2, 1.5, 0.0]), tahan=0.4, run_time=1.1)
            b.tunggu_kata("Masukkan")
            b.main(FadeOut(soal2), FadeOut(k1), FadeOut(k2), FadeOut(k4), FadeOut(subs2), FadeOut(hasil2), FadeOut(ident),
                   run_time=0.4)
            ident = None
            b.main(FadeIn(langkah1, shift=UP * 0.1), run_time=0.6)
            b.tunggu_kata("wajar")
            b.main(FadeIn(langkah2, shift=UP * 0.1), run_time=0.7)
            b.tunggu_kata("nol")
            b.main(FadeIn(langkah3a, shift=UP * 0.1), run_time=0.7)
            b.tunggu_kata("baru")
            b.main(FadeIn(langkah3b, shift=RIGHT * 0.15), run_time=0.6)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan),
                          tulisan={"langkah 1": langkah1, "langkah 2": langkah2, "langkah 3": langkah3})

        # ============ menunjuk Bagian 3: x lari ke tak hingga ============ #
        lanjut = teks("Sifat Limit dan Cara Menghitungnya, Bagian 3", 30, SOROT).move_to([-1.6, -2.0, 0])
        sinema.batasi_lebar(lanjut, 9.5)
        takhingga = rumus(r"x \to \infty", 48, SOROT).move_to([4.6, -0.3, 0])
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sifat")
            b.main(FadeIn(lanjut, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("lari")
            b.main(FadeIn(takhingga, shift=RIGHT * 0.3), run_time=0.8)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan),
                          tulisan={"langkah 1": langkah1, "langkah 2": langkah2, "langkah 3": langkah3,
                                   "lanjut": lanjut, "tak hingga": takhingga})

        sinema.laporkan_pemicu(self)
