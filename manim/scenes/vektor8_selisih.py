"""Vektor Materi 08, Operasi Vektor Bagian 3: mengurangi itu menambah lawannya.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (2:32)
yang sudah disetujui ARYA. ISINYA SAMA: dua orang di (3 1) dan (1 2); panah
posisi a dan b; a - b = a + (-b); b diputar setengah lingkaran jadi (-1 -2);
salinan -b dipindah ke ujung a, resultannya (2 -1); komponennya dikurangi
langsung; panah yang sama muncul dari ujung b ke ujung a (salinan DIGESER,
bukan digambar ulang); arahnya dari b ke a; aturan AB = B - A berasal dari
sini; b - a berlawanan arah.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 3 lalu pertanyaannya; segar-ingat
  Operasi Vektor Bagian 1: kedua panah yang sama dijumlahkan ujung ke pangkal,
  (3 1) + (1 2) = (4 3), digambar ulang di petak.
- Bentuk umum a - b = (a1 - b1  a2 - b2) LAHIR besar di dekat panah selisihnya.
- Tiap kejadian dipicu pada kata yang mengucapkannya (`sinema.JamKata`).
- Kalimat narasi tidak ditulis sebagai teks di layar; penutup memperlihatkan
  a - b = a + (-b) dan gambar kecil dua panah sepangkal dengan panah selisih
  dari ujung b ke ujung a; pancingan Bagian 4 berupa panah yang dipanjangkan
  dan dibalik.
- Vektor ditulis tanpa koma (3 1); titik tetap berkoma (2, -1).
- Sorot panah memakai pita ungu tembus pandang (`sorot_pita`), bukan Indicate.

WARNA: biru a, merah b dan lawannya, ungu selisih, tinta urutan yang keliru.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "vektor8-selisih"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

Z = 0.02
ASAL = np.array([0.0, 0.0, Z])
VA = np.array([3.0, 1.0, 0.0])          # a
VB = np.array([1.0, 2.0, 0.0])          # b
VLAWAN = -VB                            # -b
VSEL = VA - VB                          # a - b = (2 -1)

BIDANG_X, BIDANG_Y = (-3.0, 5.0, 1.0), (-3.0, 3.0, 1.0)
GARIS_SAMAR, GARIS_SEDANG, GARIS_PENUH = 0.30, 0.55, 1.0
MIRING_AWAL = 0.0          # kamera TEGAK LURUS sejak awal: segar-ingat menggambar di petak, dan petak miring membuat segitiganya berbohong; "kita lihat dari atas" tinggal zum ringan


def panah(a, b, warna, tebal=5):
    a = np.array(a, dtype=float)
    b = np.array(b, dtype=float)
    if np.linalg.norm(b - a) < 0.05:
        b = a + 0.05 * RIGHT
    return Arrow(a, b, buff=0, thickness=tebal).set_color(warna)


class SelisihPerjalanan(AdeganMatra):
    def construct(self):
        frame = self.frame
        self.aktif, self.tulisan, self.hud_ku = {}, {}, {}

        bidang = ilustrasi.bidang_bernomor(BIDANG_X, BIDANG_Y)
        bidang.set_stroke(opacity=0.0)
        bidang.angka.set_opacity(0)
        self.add(bidang)

        orang_a = ilustrasi.orang(1.15).shift(VA)
        orang_b = ilustrasi.orang(1.15).shift(VB)

        pusat, tinggi = kamera.muat_datar(bidang)
        kamera.pasang_awal(frame, theta=0, phi=MIRING_AWAL, pusat=pusat,
                           tinggi=tinggi * 1.06)
        self.papan = sinema.PapanRumus(self, ukuran=30, tanpa_utama=True, alas=True)

        # ============ buka ============================================== #
        tanya_buka = teks("Apa arti mengurangi sebuah panah dengan panah lain?", 34, TINTA)
        sinema.batasi_lebar(tanya_buka, 11.4)
        tanya_buka.move_to([0, 0.3, 0]).fix_in_frame()

        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Operasi")
            sinema.judul_pembuka(self, "Operasi Vektor, Bagian 3", lama=3.0, y=1.6)
            b.catat(3.0)
            b.tunggu_kata("Apa arti")
            self.hud_tambah(tanya_buka)
            b.main(Write(tanya_buka), run_time=1.6)
            self.hud_ku["tanya buka"] = tanya_buka
        self.gerbang()

        # ============ ingat: Bagian 1, (3 1) + (1 2) = (4 3) ============== #
        i_a = panah(ASAL, ASAL + VA, AKSEN2)
        i_b = panah(ASAL + VA, ASAL + VA + VB, AKSEN)
        i_r = panah(ASAL, ASAL + VA + VB, SOROT, tebal=7)
        i_sambung = Dot(radius=0.11).set_color(TINTA).move_to(ASAL + VA)
        kurang_besar = rumus(r"\vec{a} - \vec{b}", 48, SOROT).move_to([1.0, -1.2, Z])
        ident = None

        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Operasi")
            ident = sinema.identitas(self, "ingat Bagian 1", alas=True)
            ident.set_opacity(0)
            b.main(FadeOut(tanya_buka), ident.animate.set_opacity(1),
                   bidang.animate.set_stroke(opacity=GARIS_SAMAR), run_time=0.6)
            self.aktif["bidang"] = bidang
            self.remove(tanya_buka)
            self.hud_ku.pop("tanya buka", None)
            self.hud_ku["identitas"] = ident
            b.tunggu_kata("dua panah")
            self.add(i_a)
            b.main(GrowArrow(i_a), run_time=0.8)
            self.aktif["ingat a"] = i_a
            b.tunggu_kata("menempelkan")
            self.add(i_b, i_sambung)
            b.main(GrowArrow(i_b), FadeIn(i_sambung, scale=2.0), run_time=0.8)
            self.aktif["ingat b"] = i_b
            self.aktif["ingat sambung"] = i_sambung
            b.tunggu_kata("komponennya")
            self.add(i_r)
            b.main(GrowArrow(i_r), run_time=0.9)
            self.aktif["ingat resultan"] = i_r
            b.tunggu_kata("tiga satu")
            self.papan.baris(r"(3\ \ 1) + (1\ \ 2) = (4\ \ 3)", SOROT, b=b)
            b.tunggu_kata("Hari ini")
            pergi = Group(i_a, i_b, i_r, i_sambung)
            self.papan_baru(b, lama=0.6, bareng=[FadeOut(pergi), FadeOut(ident)])
            self.remove(*pergi, ident)
            ident = None
            self.hud_ku.pop("identitas", None)
            for nama in ("ingat a", "ingat b", "ingat sambung", "ingat resultan"):
                self.aktif.pop(nama, None)
            b.tunggu_kata("mengurangi")
            self.add(kurang_besar)
            b.main(FadeIn(kurang_besar, scale=1.3), run_time=0.7)
            self.tulisan["kurang besar"] = kurang_besar
        self.gerbang()

        # ============ cerita: dua orang ================================== #
        garis_tanya = DashedLine(ASAL + VB, ASAL + VA, dash_length=0.14).set_stroke(REDUP, 3)

        with sinema.babak(self, "cerita", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dua orang")
            b.main(FadeOut(kurang_besar), bidang.animate.set_stroke(opacity=GARIS_SEDANG),
                   run_time=0.6)
            self.remove(kurang_besar)
            self.tulisan.pop("kurang besar", None)
            self.add(orang_a)
            b.main(FadeIn(orang_a, scale=1.5), run_time=0.8)
            self.aktif["orang a"] = orang_a
            b.tunggu_kata("tempat yang")
            self.add(orang_b)
            b.main(FadeIn(orang_b, scale=1.5), run_time=0.8)
            self.aktif["orang b"] = orang_b
            b.tunggu_kata("ke orang yang")
            self.add(garis_tanya)
            b.main(ShowCreation(garis_tanya), run_time=1.2)
            self.aktif["garis tanya"] = garis_tanya
            b.tunggu_kata("sejauh apa")
            self.sorot_pita(b, garis_tanya, lama=1.0)
        self.gerbang()

        # ============ terbang ============================================= #
        with sinema.babak(self, "terbang", DURASI, kata=KATA) as b:
            b.tunggu_kata("Supaya bisa")
            b.main(bidang.animate.set_stroke(opacity=GARIS_PENUH), run_time=1.0)
            b.tunggu_kata("dari atas")
            b.main(kamera.sudut(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi),
                   run_time=1.1)
            b.main(bidang.angka.animate.set_opacity(0.75), run_time=0.5)
            b.tunggu_kata("Satu petak")
            b.main(FadeOut(garis_tanya), run_time=0.4)
            self.remove(garis_tanya)
            self.aktif.pop("garis tanya", None)
            ident = sinema.identitas(self, "1 petak = 1 langkah", alas=True)
            ident.set_opacity(0)
            b.main(ident.animate.set_opacity(1), run_time=0.6)
            self.hud_ku["identitas"] = ident
        self.gerbang()

        # ============ dua: panah posisi a dan b =========================== #
        pa = panah(ASAL, ASAL + VA, AKSEN2)
        pb = panah(ASAL, ASAL + VB, AKSEN)
        la = rumus(r"\vec{a}", 30, AKSEN2).move_to(ASAL + VA * 0.55 + 0.45 * DOWN)
        lb = rumus(r"\vec{b}", 30, AKSEN).move_to(ASAL + VB * 0.5 + 0.45 * RIGHT)

        with sinema.babak(self, "dua", DURASI, kata=KATA) as b:
            b.tunggu_kata("titik asal")
            b.main(Flash(ASAL, color=SOROT, flash_radius=0.5, line_length=0.2), run_time=0.8)
            b.tunggu_kata("Panah biru")
            self.add(pa)
            b.main(GrowArrow(pa), run_time=1.0)
            self.bring_to_front(orang_a, orang_b)
            self.aktif["a"] = pa
            b.tunggu_kata("tiga satu")
            self.add(la)
            b.main(FadeIn(la), run_time=0.4)
            self.tulisan["label a"] = la
            self.papan.baris(r"\vec{a} = (3\ \ 1)", AKSEN2, b=b)
            b.tunggu_kata("Panah merah")
            self.add(pb)
            b.main(GrowArrow(pb), run_time=1.0)
            self.bring_to_front(orang_a, orang_b)
            self.aktif["b"] = pb
            b.tunggu_kata("satu dua")
            self.add(lb)
            b.main(FadeIn(lb), run_time=0.4)
            self.tulisan["label b"] = lb
            self.papan.baris(r"\vec{b} = (1\ \ 2)", AKSEN, b=b)
        self.gerbang()

        # ============ lawan: -b =========================================== #
        p_lawan = pb.copy().set_color(AKSEN).set_opacity(0.75)
        l_lawan = rumus(r"-\vec{b}", 28, AKSEN).move_to(ASAL + VLAWAN * 0.6 + 0.60 * LEFT)

        with sinema.babak(self, "lawan", DURASI, kata=KATA) as b:
            b.tunggu_kata("a dikurangi")
            self.papan.baris(r"\vec{a} - \vec{b} = \vec{a} + (-\vec{b})", SOROT, b=b)
            b.tunggu_kata("Lawan sebuah")
            self.add(p_lawan)
            b.main(Rotate(p_lawan, PI, about_point=ASAL), run_time=1.6)
            self.aktif["lawan"] = p_lawan
            b.tunggu_kata("berkebalikan")
            self.add(l_lawan)
            b.main(FadeIn(l_lawan), run_time=0.4)
            self.tulisan["label lawan"] = l_lawan
            b.tunggu_kata("negatif satu")
            self.papan.baris(r"-\vec{b} = (-1\ \ -2)", AKSEN, b=b)
        self.gerbang()

        # ============ jumlah: dijumlahkan seperti biasa =================== #
        p_geser = panah(ASAL + VA, ASAL + VA + VLAWAN, AKSEN)
        p_geser.set_opacity(0.75)
        p_sel = panah(ASAL, ASAL + VSEL, SOROT, tebal=7)
        titik_sel = Dot(radius=0.09).set_color(SOROT).move_to(ASAL + VSEL)
        koord_sel = rumus(r"(2,\ -1)", 28, SOROT).move_to(ASAL + VSEL + np.array([0.95, -0.35, 0.0]))

        with sinema.babak(self, "jumlah", DURASI, kata=KATA) as b:
            b.tunggu_kata("Pangkal panah")
            self.add(p_geser)
            b.main(TransformFromCopy(p_lawan, p_geser), run_time=1.4)
            self.aktif["lawan digeser"] = p_geser
            b.tunggu_kata("resultannya")
            self.add(p_sel)
            b.main(GrowArrow(p_sel), run_time=1.2)
            self.aktif["selisih"] = p_sel
            self.add(titik_sel, koord_sel)
            b.main(FadeIn(titik_sel, scale=2.0), FadeIn(koord_sel), run_time=0.5)
            self.tulisan["koordinat selisih"] = koord_sel
        self.gerbang()

        # ============ hitung: komponennya ================================= #
        with sinema.babak(self, "hitung", DURASI, kata=KATA) as b:
            b.tunggu_kata("Hitung")
            self.papan_baru(b, lama=0.5)
            b.tunggu_kata("tiga ditambah")
            self.papan.baris(r"3 + (-1) = 2", AKSEN2, b=b)
            b.tunggu_kata("satu ditambah")
            self.papan.baris(r"1 + (-2) = -1", AKSEN, b=b)
            b.tunggu_kata("Jadi a")
            self.papan.baris(r"\vec{a} - \vec{b} = (2\ \ -1)", SOROT, b=b)
            b.tunggu_kata("Lebih singkat")
            self.papan.baris(r"(3\ \ 1) - (1\ \ 2) = (2\ \ -1)", SOROT, b=b)
        self.gerbang()

        # ============ umum ================================================ #
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bentuk umumnya")
            self.papan_baru(b, lama=0.6)
            b.tunggu_kata("a dikurangi")
            sinema.lahir_rumus(self, r"\vec{a} - \vec{b} = (a_1 - b_1\ \ \ a_2 - b_2)", p_sel,
                               self.papan, b=b, warna=SOROT, sebagai_utama=False,
                               ukuran_lahir=44, tahan=1.2, run_time=1.1, geser=DOWN * 1.2)
        self.gerbang()

        # ============ tanya =============================================== #
        bantu = VGroup(p_lawan, p_geser, l_lawan)
        with sinema.babak(self, "tanya", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang")
            b.main(bantu.animate.set_opacity(0.18), run_time=0.8)
            b.tunggu_kata("selisih ini")
            self.sorot_pita(b, p_sel, lama=1.0)
            b.tunggu_kata("panah lawan")
            b.main(Indicate(l_lawan, color=AKSEN), run_time=0.8)
        self.gerbang()

        # ============ kedua: panah yang sama, di tempat lain ============== #
        p_sel2 = panah(ASAL + VB, ASAL + VA, SOROT, tebal=7)
        l_sel2 = rumus(r"\vec{a} - \vec{b}", 28, SOROT)
        l_sel2.move_to(ASAL + (VA + VB) / 2 + np.array([0.15, 0.65, 0.0]))

        with sinema.babak(self, "kedua", DURASI, kata=KATA) as b:
            b.tunggu_kata("Panah yang")
            salinan = p_sel.copy()
            self.add(salinan)
            self.bring_to_front(orang_a, orang_b)
            b.main(salinan.animate.shift(VB), run_time=1.8)
            self.remove(salinan)
            self.add(p_sel2)
            self.bring_to_front(orang_a, orang_b)
            self.aktif["selisih 2"] = p_sel2
            b.tunggu_kata("Perhatikan panjangnya")
            self.add(l_sel2)
            b.main(FadeIn(l_sel2), run_time=0.5)
            self.tulisan["label selisih 2"] = l_sel2
            b.tunggu_kata("hanya tempatnya")
            self.sorot_pita(b, p_sel, p_sel2, lama=1.2)
        self.gerbang()

        # ============ arah: dari b menuju a =============================== #
        with sinema.babak(self, "arah", DURASI, kata=KATA) as b:
            b.tunggu_kata("dari b")
            b.main(Flash(ASAL + VB, color=AKSEN, flash_radius=0.5, line_length=0.2), run_time=0.45)
            b.tunggu_kata("menuju a")
            b.main(Flash(ASAL + VA, color=AKSEN2, flash_radius=0.5, line_length=0.2), run_time=0.45)
            b.tunggu_kata("Terbalik")
            b.main(ShowCreationThenDestruction(p_sel2.copy().set_color(TINTA)), run_time=1.4)
            b.tunggu_kata("inilah panah")
            self.sorot_pita(b, p_sel2, lama=1.0)
        self.gerbang()

        # ============ titik: AB = B - A =================================== #
        with sinema.babak(self, "titik", DURASI, kata=KATA) as b:
            b.tunggu_kata("posisi B")
            self.papan.baris(r"\vec{AB} = B - A", TINTA, b=b)
            b.tunggu_kata("Ujung dikurangi")
            b.main(Flash(ASAL + VA, color=SOROT, flash_radius=0.5, line_length=0.2), run_time=0.5)
            b.main(Flash(ASAL + VB, color=SOROT, flash_radius=0.5, line_length=0.2), run_time=0.5)
        self.gerbang()

        # ============ keliru: b - a ======================================= #
        p_balik = panah(ASAL, ASAL - VSEL, TINTA, tebal=6)
        l_balik = rumus(r"\vec{b} - \vec{a}", 28, TINTA)
        l_balik.move_to(ASAL - VSEL * 0.62 + np.array([-0.10, 0.55, 0.0]))

        with sinema.babak(self, "keliru", DURASI, kata=KATA) as b:
            b.tunggu_kata("b dikurangi")
            self.add(p_balik)
            b.main(GrowArrow(p_balik), run_time=1.2)
            self.aktif["balik"] = p_balik
            self.add(l_balik)
            b.main(FadeIn(l_balik), run_time=0.4)
            self.tulisan["label balik"] = l_balik
            b.tunggu_kata("arahnya berlawanan")
            self.papan.baris(r"\vec{b} - \vec{a} = (-2\ \ 1)", TINTA, b=b)
            b.tunggu_kata("tempat yang salah")
            self.sorot_pita(b, p_balik, lama=1.0)
        self.gerbang()

        # ============ tutup =============================================== #
        rumus_tutup = rumus(r"\vec{a} - \vec{b} = \vec{a} + (-\vec{b})", 42, SOROT)
        rumus_tutup.move_to([0, 1.3, 0]).fix_in_frame()
        P = np.array([-1.4, -1.9, 0.0])
        A = np.array([3.0, 1.0, 0.0])
        B = np.array([1.0, 2.0, 0.0])
        t_a = Arrow(P, P + A, buff=0, thickness=5).set_color(AKSEN2).fix_in_frame()
        t_b = Arrow(P, P + B, buff=0, thickness=5).set_color(AKSEN).fix_in_frame()
        t_sel = Arrow(P + B, P + A, buff=0, thickness=6).set_color(SOROT).fix_in_frame()
        t_la = rumus(r"\vec{a}", 30, AKSEN2).move_to(P + A * 0.55 + DOWN * 0.42).fix_in_frame()
        t_lb = rumus(r"\vec{b}", 30, AKSEN).move_to(P + B * 0.5 + LEFT * 0.42).fix_in_frame()
        t_lsel = rumus(r"\vec{a} - \vec{b}", 30, SOROT).move_to(P + (A + B) / 2 + np.array([0.3, 0.55, 0])).fix_in_frame()

        semua = Group(bidang, orang_a, orang_b, pa, pb, p_sel, p_sel2, p_balik,
                      la, lb, l_sel2, l_balik, titik_sel, koord_sel, bantu)

        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jadi ingat")
            self.papan_baru(b, lama=1.0, bareng=[FadeOut(semua), FadeOut(ident)])
            self.remove(*semua, ident)
            ident = None
            self.aktif.clear()
            self.tulisan.clear()
            self.hud_ku.clear()
            b.tunggu_kata("Mengurangi itu")
            self.hud_tambah(rumus_tutup)
            b.main(FadeIn(rumus_tutup, shift=UP * 0.2), run_time=0.9)
            self.hud_ku["rumus tutup"] = rumus_tutup
            b.tunggu_kata("Dan panah")
            self.hud_tambah(t_a, t_b, t_la, t_lb)
            b.main(GrowArrow(t_a), GrowArrow(t_b), FadeIn(t_la), FadeIn(t_lb), run_time=0.9)
            for k, m in (("t a", t_a), ("t b", t_b), ("t la", t_la), ("t lb", t_lb)):
                self.hud_ku[k] = m
            b.tunggu_kata("dari ujung b")
            self.hud_tambah(t_sel, t_lsel)
            b.main(GrowArrow(t_sel), run_time=0.9)
            b.main(FadeIn(t_lsel), run_time=0.4)
            self.hud_ku["t sel"] = t_sel
            self.hud_ku["t lsel"] = t_lsel
        self.gerbang()

        # ============ lanjut: dikali bilangan ============================= #
        judul_lanjut = teks("Operasi Vektor, Bagian 4", 30, SOROT)
        judul_lanjut.move_to([0, 1.9, 0]).fix_in_frame()
        Q = np.array([-0.6, -0.9, 0.0])
        U = np.array([1.6, 0.8, 0.0])
        # Kelipatannya digeser tegak lurus sedikit supaya panah aslinya tetap
        # terlihat, bukan tertutup panah yang lebih panjang.
        N = np.array([-0.4, 0.8, 0.0]) / np.linalg.norm([-0.4, 0.8, 0.0]) * 0.16
        j_v = Arrow(Q, Q + U, buff=0, thickness=5).set_color(AKSEN2).fix_in_frame()
        j_2v = Arrow(Q + N, Q + N + 2 * U, buff=0, thickness=5).set_color(SOROT).fix_in_frame()
        j_neg = Arrow(Q - N, Q - N - U, buff=0, thickness=5).set_color(AKSEN).fix_in_frame()
        j_l2 = rumus(r"2\vec{v}", 30, SOROT).move_to(Q + 1.5 * U + np.array([-0.3, 0.5, 0])).fix_in_frame()
        j_lneg = rumus(r"-\vec{v}", 30, AKSEN).move_to(Q - 0.5 * U + np.array([0.3, -0.5, 0])).fix_in_frame()

        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Operasi Vektor")
            pergi = Group(rumus_tutup, t_a, t_b, t_sel, t_la, t_lb, t_lsel)
            self.hud_tambah(judul_lanjut)
            b.main(FadeOut(pergi), FadeIn(judul_lanjut, shift=UP * 0.2), run_time=0.8)
            self.remove(*pergi)
            self.hud_ku.clear()
            self.hud_ku["judul lanjut"] = judul_lanjut
            b.tunggu_kata("sebuah panah")
            self.hud_tambah(j_v)
            b.main(GrowArrow(j_v), run_time=0.8)
            self.hud_ku["janji v"] = j_v
            b.tunggu_kata("panjangnya berubah")
            self.hud_tambah(j_2v, j_l2)
            b.main(GrowArrow(j_2v), FadeIn(j_l2), run_time=0.9)
            self.hud_ku["janji 2v"] = j_2v
            self.hud_ku["label 2v"] = j_l2
            b.tunggu_kata("berbalik")
            self.hud_tambah(j_neg, j_lneg)
            b.main(GrowArrow(j_neg), FadeIn(j_lneg), run_time=0.9)
            self.hud_ku["janji neg"] = j_neg
            self.hud_ku["label neg"] = j_lneg
        self.gerbang()

        sinema.laporkan_pemicu(self)

    # ================================================================== #
    def gerbang(self):
        hud = dict(self.hud_ku)
        papan = self.papan.semua()
        if papan is not None:
            papan.beralas = True
            hud["papan"] = papan
        qc.periksa_adegan(self, {}, hud=hud, dunia=self.aktif, tulisan=self.tulisan)

    def sorot_pita(self, b, *ruas, lama: float = 1.0):
        """Pita ungu tembus pandang di sepanjang panah atau ruas (bukan Indicate)."""
        pita = VGroup(*[Line(r.get_start(), r.get_end()).set_stroke(SOROT, 18, opacity=0.35)
                        for r in ruas])
        self.add(pita)
        b.main(FadeIn(pita), run_time=lama * 0.35)
        b.main(FadeOut(pita), run_time=lama * 0.65)
        self.remove(pita)

    def papan_baru(self, b, lama: float = 0.5, ikut=None, bareng=None):
        g = self.papan.semua()
        gerak = list(bareng or [])
        buang = list(g) if g is not None else []
        if buang:
            gerak.append(FadeOut(Group(*buang)))
        if gerak:
            b.main(*gerak, run_time=lama)
        for m in buang:
            self.remove(m)
            if m in self.hud:
                self.hud.remove(m)
        self.papan = sinema.PapanRumus(self, ukuran=30, tanpa_utama=True, alas=True)
        if ikut is not None:
            self.papan.ikut(ikut)
        return self.papan
