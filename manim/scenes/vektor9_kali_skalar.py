"""Vektor Materi 09, Operasi Vektor Bagian 4: dikali angka, panjang berubah, arah tetap.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (2:37)
yang sudah disetujui ARYA. ISINYA SAMA: bola ditendang, a = (2 1); pengali 3
memberi (6 3) dan arahnya tidak bergeser; setengah menyusut; pengali
diturunkan TERUS melewati 0 (vektor nol) sampai -2 (arah berbalik, (-4 -2));
panjang akar 5 = 2,24, 3 akar 5 = 6,71, 2 akar 5 = 4,47; panjang tidak
pernah negatif; semua kelipatan a terletak pada satu garis: sejajar.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 4 lalu pertanyaannya; segar-ingat
  Vektor dalam Sistem Koordinat Bagian 2: rumus panjang, dengan panah (4 2).
- Bentuk umum k a = (k a1  k a2) LAHIR besar di dekat panahnya.
- Tiap kejadian dipicu pada kata yang mengucapkannya (`sinema.JamKata`);
  pengalinya bergerak tepat pada kalimat yang menyebutnya.
- Kalimat narasi tidak ditulis sebagai teks di layar; penutup memperlihatkan
  panah a, k a searah, k a berbalik, dan |k a| = |k| |a|; pancingan Penerapan
  Vektor berupa kipas panah.
- Sorot panah memakai pita ungu tembus pandang (`sorot_pita`), bukan Indicate.

KENAPA PENGALINYA BERGERAK TERUS: siswa MELIHAT panahnya menyusut, lenyap tepat
di nol, lalu tumbuh lagi berbalik arah; itu juga yang diminta alat coba di
halamannya. Angka pengali hidup di kanan bawah papan (`AngkaKoma`), pengikutnya
dipasang SESUDAH animasi kemunculannya (set_value membangun ulang angkanya,
dan di tengah animasi kepekatan jumlah titiknya berubah lalu render gagal).

WARNA: ungu panah hasil perkalian, biru panah a asli sebagai pembanding,
merah angka pengali yang hidup, abu bola dan garis bantu.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "vektor9-kali-skalar"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

Z = 0.02
ASAL = np.array([0.0, 0.0, Z])
VA = np.array([2.0, 1.0, 0.0])          # a = (2 1)
V_INGAT = np.array([4.0, 2.0, 0.0])     # panah (4 2) dari Bagian 2

BIDANG_X, BIDANG_Y = (-5.0, 7.0, 1.0), (-2.0, 3.0, 1.0)
GARIS_SAMAR, GARIS_SEDANG, GARIS_PENUH = 0.30, 0.55, 1.0


def panah(a, b, warna, tebal=5):
    a = np.array(a, dtype=float)
    b = np.array(b, dtype=float)
    if np.linalg.norm(b - a) < 0.05:
        b = a + 0.05 * RIGHT
    return Arrow(a, b, buff=0, thickness=tebal).set_color(warna)


class KaliSkalar(AdeganMatra):
    def construct(self):
        frame = self.frame
        self.aktif, self.tulisan, self.hud_ku = {}, {}, {}

        bidang = ilustrasi.bidang_bernomor(BIDANG_X, BIDANG_Y)
        bidang.set_stroke(opacity=0.0)
        bidang.angka.set_opacity(0)
        self.add(bidang)
        self.k = ValueTracker(0.0)
        bola = ilustrasi.bola(0.22, REDUP)
        pusat0 = bola.get_center().copy()
        bola.add_updater(lambda m: m.move_to(pusat0 + self.k.get_value() * VA))

        # Jalur kanan DIPESAN untuk papan rumus: titik (6, 3), tempat 3a mendarat,
        # jatuh tepat di bawah panel kalau bidang memenuhi layar (gerbang qc:
        # "papan menindih bola").
        pusat, tinggi = kamera.muat_datar(bidang, sisa_kanan=2.6)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi * 1.06)
        self.papan = sinema.PapanRumus(self, ukuran=30, tanpa_utama=True, alas=True)

        # ============ buka ============================================== #
        tanya_buka = teks("Apa yang terjadi kalau sebuah panah dikali bilangan?", 34, TINTA)
        sinema.batasi_lebar(tanya_buka, 11.4)
        tanya_buka.move_to([0, 0.3, 0]).fix_in_frame()

        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Operasi")
            sinema.judul_pembuka(self, "Operasi Vektor, Bagian 4", lama=3.0, y=1.6)
            b.catat(3.0)
            b.tunggu_kata("Apa yang")
            self.hud_tambah(tanya_buka)
            b.main(Write(tanya_buka), run_time=1.6)
            self.hud_ku["tanya buka"] = tanya_buka
        self.gerbang()

        # ============ ingat: rumus panjang, panah (4 2) =================== #
        p_ingat = panah(ASAL, ASAL + V_INGAT, SOROT, tebal=7)
        i_datar = Line(ASAL, ASAL + V_INGAT[0] * RIGHT).set_stroke(AKSEN2, 6)
        i_tegak = Line(ASAL + V_INGAT[0] * RIGHT, ASAL + V_INGAT).set_stroke(AKSEN, 6)
        li_x = rumus("x", 30, AKSEN2).move_to([V_INGAT[0] / 2, -0.55, Z])
        li_y = rumus("y", 30, AKSEN).move_to([V_INGAT[0] + 0.5, V_INGAT[1] / 2, Z])
        kali_besar = rumus(r"k \cdot \vec{a}", 48, SOROT).move_to([1.0, -1.0, Z])
        ident = None

        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Vektor")
            ident = sinema.identitas(self, "ingat panjang", alas=True)
            ident.set_opacity(0)
            b.main(FadeOut(tanya_buka), ident.animate.set_opacity(1),
                   bidang.animate.set_stroke(opacity=GARIS_SAMAR), run_time=0.6)
            self.aktif["bidang"] = bidang
            self.remove(tanya_buka)
            self.hud_ku.pop("tanya buka", None)
            self.hud_ku["identitas"] = ident
            b.tunggu_kata("panjang panah")
            self.add(p_ingat)
            b.main(GrowArrow(p_ingat), run_time=0.9)
            self.aktif["panah ingat"] = p_ingat
            b.tunggu_kata("komponennya")
            self.add(i_datar, i_tegak, li_x, li_y)
            b.main(ShowCreation(i_datar), ShowCreation(i_tegak), FadeIn(li_x), FadeIn(li_y),
                   run_time=0.8)
            self.aktif["langkah x"] = i_datar
            self.aktif["langkah y"] = i_tegak
            self.tulisan["x"] = li_x
            self.tulisan["y"] = li_y
            b.tunggu_kata("akar dari")
            self.papan.baris(r"|\vec{v}| = \sqrt{x^2 + y^2}", SOROT, b=b)
            b.tunggu_kata("Hari ini")
            pergi = Group(p_ingat, i_datar, i_tegak, li_x, li_y)
            self.papan_baru(b, lama=0.6, bareng=[FadeOut(pergi), FadeOut(ident)])
            self.remove(*pergi, ident)
            ident = None
            self.hud_ku.pop("identitas", None)
            for nama in ("panah ingat", "langkah x", "langkah y"):
                self.aktif.pop(nama, None)
            self.tulisan.clear()
            b.tunggu_kata("dikali bilangan")
            self.add(kali_besar)
            b.main(FadeIn(kali_besar, scale=1.3), run_time=0.7)
            self.tulisan["kali besar"] = kali_besar
        self.gerbang()

        # ============ cerita: bola di lapangan ============================ #
        arah_tetap = DashedLine(ASAL, ASAL + VA * 1.6, dash_length=0.14).set_stroke(REDUP, 3)

        with sinema.babak(self, "cerita", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sebuah bola")
            b.main(FadeOut(kali_besar), bidang.animate.set_stroke(opacity=GARIS_SEDANG),
                   run_time=0.6)
            self.remove(kali_besar)
            self.tulisan.pop("kali besar", None)
            self.add(bola)
            b.main(FadeIn(bola, scale=1.6), run_time=0.8)
            self.aktif["bola"] = bola
            b.tunggu_kata("arah yang")
            self.add(arah_tetap)
            b.main(ShowCreation(arah_tetap), run_time=1.2)
            self.aktif["arah tetap"] = arah_tetap
            b.tunggu_kata("tenaganya")
            for _ in range(2):
                b.main(Indicate(bola, scale_factor=1.35, color=SOROT), run_time=0.8)
        self.gerbang()

        # ============ terbang ============================================= #
        with sinema.babak(self, "terbang", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kita lihat")
            b.main(kamera.sudut(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi),
                   bidang.animate.set_stroke(opacity=GARIS_PENUH), run_time=1.4)
            b.main(bidang.angka.animate.set_opacity(0.75), run_time=0.7)
            b.tunggu_kata("Satu petak")
            b.main(FadeOut(arah_tetap), run_time=0.4)
            self.remove(arah_tetap)
            self.aktif.pop("arah tetap", None)
            ident = sinema.identitas(self, "1 petak = 1 langkah", alas=True)
            ident.set_opacity(0)
            b.main(ident.animate.set_opacity(1), run_time=0.6)
            self.hud_ku["identitas"] = ident
        self.gerbang()

        # ============ satu: a = (2 1), pengali 1 ========================== #
        p_hasil = always_redraw(self.buat_panah)
        p_asal = Arrow(ASAL, ASAL + VA, buff=0, thickness=4).set_color(AKSEN2)
        p_asal.set_opacity(0.45)
        l_a = rumus(r"\vec{a}", 28, AKSEN2).move_to(ASAL + VA * 0.55 + 0.45 * DOWN)

        label_k = teks("pengali", 24, AKSEN)
        angka_k = sinema.AngkaKoma(1.0, num_decimal_places=1, font_size=40).set_color(AKSEN)
        ukur_k = VGroup(label_k, angka_k).arrange(RIGHT, buff=0.22)
        sinema.batasi_lebar(ukur_k, 4.5)
        ukur_k.move_to([6.85 - ukur_k.get_width() / 2 - 0.47, 0.62, 0]).fix_in_frame()
        alas_ukur = sinema.alas_hud(self, ukur_k, pad_x=0.42)
        alas_ukur.set_opacity(0)

        with sinema.babak(self, "satu", DURASI, kata=KATA) as b:
            b.tunggu_kata("dua petak")
            self.add(p_asal, p_hasil)
            self.bring_to_front(bola)
            b.main(self.k.animate.set_value(1.0), run_time=1.4)
            self.aktif["panah a asli"] = p_asal
            b.tunggu_kata("Panah itu")
            self.add(l_a)
            b.main(FadeIn(l_a), run_time=0.4)
            self.tulisan["label a"] = l_a
            b.tunggu_kata("dua satu")
            self.papan.baris(r"\vec{a} = (2\ \ 1)", AKSEN2, b=b)
            b.tunggu_kata("Pengalinya")
            self.hud_tambah(ukur_k)
            ukur_k.set_opacity(0)
            b.main(ukur_k.animate.set_opacity(1), alas_ukur.animate.set_opacity(1), run_time=0.6)
            angka_k.add_updater(lambda m: m.set_value(self.k.get_value()))
            self.hud_ku["ukur k"] = ukur_k
        self.gerbang()

        # ============ tiga: pengali 3 ===================================== #
        with sinema.babak(self, "tiga", DURASI, kata=KATA) as b:
            b.tunggu_kata("tiga kali")
            b.main(self.k.animate.set_value(3.0), run_time=2.0)
            b.tunggu_kata("dua kali tiga")
            kali = self.papan.baris(r"2 \times 3 = 6", AKSEN2, b=b)
            b.tunggu_kata("satu kali tiga")
            kali = sinema.ganti_rumus(self, kali, r"2 \times 3 = 6,\quad 1 \times 3 = 3", b=b,
                                      papan=self.papan, warna=TINTA, run_time=0.8)
            b.tunggu_kata("mendarat")
            self.papan.baris(r"3\vec{a} = (6\ \ 3)", SOROT, b=b)
            b.tunggu_kata("arahnya tidak")
            self.sorot_pita(b, p_hasil, lama=1.2)
        self.gerbang()

        # ============ kecil: pengali setengah ============================= #
        with sinema.babak(self, "kecil", DURASI, kata=KATA) as b:
            b.tunggu_kata("Panahnya")
            b.main(self.k.animate.set_value(0.5), run_time=1.1)
            b.tunggu_kata("setengahnya")
            self.papan.baris(r"\tfrac{1}{2}\vec{a} = (1\ \ 0{,}5)", SOROT, b=b)
            b.tunggu_kata("Arahnya")
            self.sorot_pita(b, p_asal, lama=1.2)
            b.tunggu_kata("cuma panjangnya")
            self.sorot_pita(b, p_hasil, lama=0.9)
        self.gerbang()

        # ============ umum: k a = (k a1  k a2) ============================ #
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bentuk umumnya")
            self.papan_baru(b, lama=0.6)
            b.tunggu_kata("k kali")
            sinema.lahir_rumus(self, r"k\,\vec{a} = (k\,a_1\ \ \ k\,a_2)", ASAL + VA * 1.2,
                               self.papan, b=b, warna=SOROT, sebagai_utama=False,
                               ukuran_lahir=48, tahan=1.0, run_time=1.1, geser=UP * 1.0)
            b.tunggu_kata("Tiap komponen")
            b.main(self.papan.sorot(), run_time=1.0)
        self.gerbang()

        # ============ tanya: turunkan pelan-pelan ========================= #
        with sinema.babak(self, "tanya", DURASI, kata=KATA) as b:
            b.tunggu_kata("pelan-pelan")
            b.main(self.k.animate.set_value(0.12), run_time=2.6, rate_func=linear)
            b.tunggu_kata("apa yang")
            b.main(self.k.animate.set_value(0.08), run_time=1.0, rate_func=linear)
        self.gerbang()

        # ============ nol ================================================= #
        nol_label = sinema.label("vektor nol", 24, REDUP)
        nol_label.move_to(ASAL + np.array([1.0, -0.75, 0.0]))

        with sinema.babak(self, "nol", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di pengali")
            b.main(self.k.animate.set_value(0.0), run_time=0.8, rate_func=linear)
            b.tunggu_kata("lenyap")
            b.main(Flash(ASAL, color=SOROT, flash_radius=0.6, line_length=0.22), run_time=0.7)
            b.tunggu_kata("Bolanya")
            b.main(Indicate(bola, scale_factor=1.35, color=SOROT), run_time=0.8)
            b.tunggu_kata("vektor nol")
            self.add(nol_label)
            b.main(FadeIn(nol_label), run_time=0.5)
            self.tulisan["vektor nol"] = nol_label
            self.papan.baris(r"0\,\vec{a} = (0\ \ 0)", REDUP, b=b)
        self.gerbang()

        # ============ negatif: pengali -2 ================================= #
        with sinema.babak(self, "negatif", DURASI, kata=KATA) as b:
            b.tunggu_kata("jadi negatif")
            b.main(FadeOut(nol_label), run_time=0.3)
            self.remove(nol_label)
            self.tulisan.pop("vektor nol", None)
            b.main(self.k.animate.set_value(-2.0), run_time=2.4)
            b.tunggu_kata("Negatif dua")
            self.papan.baris(r"-2\,\vec{a} = (-4\ \ -2)", SOROT, b=b)
            b.tunggu_kata("ke belakang")
            self.sorot_pita(b, p_hasil, lama=1.0)
        self.gerbang()

        # ============ panjang ============================================= #
        with sinema.babak(self, "panjang", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang panjangnya")
            self.papan_baru(b, lama=0.6)
            b.tunggu_kata("akar dari")
            pj_a = self.papan.baris(r"|\vec{a}| = \sqrt{4 + 1}", TINTA, b=b)
            b.tunggu_kata("akar lima")
            pj_a = sinema.ganti_rumus(self, pj_a, r"|\vec{a}| = \sqrt{5} \approx 2{,}24", b=b,
                                      papan=self.papan, warna=TINTA, run_time=0.8)
            b.tunggu_kata("Tiga a")
            b.main(self.k.animate.set_value(3.0), run_time=0.9)
            b.tunggu_kata("tiga akar")
            self.papan.baris(r"|3\vec{a}| = 3\sqrt{5} \approx 6{,}71", TINTA, b=b)
            b.tunggu_kata("Dan negatif")
            b.main(self.k.animate.set_value(-2.0), run_time=1.2)
            b.tunggu_kata("dua akar")
            pj_k = self.papan.baris(r"|{-2}\vec{a}| = 2\sqrt{5} \approx 4{,}47", SOROT, b=b)
        self.gerbang()

        # ============ keliru: panjang tidak pernah negatif ================ #
        with sinema.babak(self, "keliru", DURASI, kata=KATA) as b:
            b.tunggu_kata("Empat koma")
            b.main(Indicate(pj_k, color=AKSEN, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("bukan")
            self.papan.baris(r"\text{bukan } {-4{,}47}", AKSEN, b=b)
            b.tunggu_kata("Yang dibalik")
            self.sorot_pita(b, p_hasil, lama=1.2)
        self.gerbang()

        # ============ sejajar: satu garis ================================= #
        arah = VA / np.linalg.norm(VA)
        garis = DashedLine(ASAL - arah * 4.6, ASAL + arah * 7.0, dash_length=0.14)
        garis.set_stroke(REDUP, 3)
        l_sejajar = sinema.label("kelipatan a", 23, REDUP)
        l_sejajar.move_to(ASAL + np.array([2.4, -1.3, 0.0]))

        with sinema.babak(self, "sejajar", DURASI, kata=KATA) as b:
            b.tunggu_kata("Perhatikan semua")
            self.add(garis)
            self.bring_to_front(p_asal, p_hasil, bola)
            b.main(ShowCreation(garis), run_time=1.4)
            self.aktif["garis"] = garis
            b.tunggu_kata("satu garis")
            self.add(l_sejajar)
            b.main(FadeIn(l_sejajar), run_time=0.5)
            self.tulisan["kelipatan a"] = l_sejajar
            b.tunggu_kata("kelipatan yang")
            b.main(self.k.animate.set_value(3.0), run_time=1.2)
            b.tunggu_kata("berlawanan")
            b.main(self.k.animate.set_value(-2.0), run_time=1.2)
        self.gerbang()

        # ============ tutup =============================================== #
        P = np.array([-2.2, -0.6, 0.0])
        U = np.array([1.5, 0.75, 0.0])
        t_a = Arrow(P, P + U, buff=0, thickness=5).set_color(AKSEN2).fix_in_frame()
        t_pos = Arrow(P, P + 2.6 * U, buff=0, thickness=5).set_color(SOROT).fix_in_frame()
        t_neg = Arrow(P, P - 1.4 * U, buff=0, thickness=5).set_color(AKSEN).fix_in_frame()
        t_la = rumus(r"\vec{a}", 30, AKSEN2).move_to(P + 0.5 * U + np.array([0.15, -0.5, 0])).fix_in_frame()
        t_lpos = rumus(r"k > 0", 30, SOROT).move_to(P + 2.1 * U + np.array([-0.35, 0.55, 0])).fix_in_frame()
        t_lneg = rumus(r"k < 0", 30, AKSEN).move_to(P - 0.9 * U + np.array([0.35, -0.55, 0])).fix_in_frame()
        rumus_tutup = rumus(r"|k\,\vec{a}| = |k|\,|\vec{a}|", 42, SOROT).move_to([0, 2.45, 0]).fix_in_frame()

        semua = Group(bidang, bola, p_hasil, p_asal, l_a, garis, l_sejajar)

        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jadi ingat")
            bola.clear_updaters()
            angka_k.clear_updaters()
            self.papan_baru(b, lama=1.0, bareng=[FadeOut(semua), FadeOut(ukur_k),
                                                 FadeOut(alas_ukur), FadeOut(ident)])
            self.remove(*semua, ukur_k, alas_ukur, ident)
            ident = None
            self.aktif.clear()
            self.tulisan.clear()
            self.hud_ku.clear()
            b.tunggu_kata("Dikali angka positif")
            self.hud_tambah(t_a, t_la, t_pos, t_lpos)
            b.main(GrowArrow(t_a), FadeIn(t_la), run_time=0.6)
            b.main(GrowArrow(t_pos), FadeIn(t_lpos), run_time=0.8)
            for k, m in (("t a", t_a), ("t la", t_la), ("t pos", t_pos), ("t lpos", t_lpos)):
                self.hud_ku[k] = m
            b.tunggu_kata("Dikali angka negatif")
            self.hud_tambah(t_neg, t_lneg)
            b.main(GrowArrow(t_neg), FadeIn(t_lneg), run_time=0.9)
            self.hud_ku["t neg"] = t_neg
            self.hud_ku["t lneg"] = t_lneg
            b.tunggu_kata("Panjangnya")
            self.hud_tambah(rumus_tutup)
            b.main(FadeIn(rumus_tutup, shift=UP * 0.2), run_time=0.9)
            self.hud_ku["rumus tutup"] = rumus_tutup
        self.gerbang()

        # ============ lanjut: Penerapan Vektor ============================ #
        judul_lanjut = teks("Penerapan Vektor", 30, SOROT)
        judul_lanjut.move_to([0, 1.9, 0]).fix_in_frame()
        Q = np.array([0.0, -0.9, 0.0])
        kipas = VGroup(*[Arrow(Q, Q + 2.0 * np.array([np.cos(t), np.sin(t), 0.0]), buff=0,
                               thickness=4).set_color(w).fix_in_frame()
                         for t, w in ((0.15, SOROT), (0.7, AKSEN2), (1.25, AKSEN),
                                      (1.9, SOROT), (2.6, AKSEN2))])

        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di materi")
            pergi = Group(t_a, t_la, t_pos, t_lpos, t_neg, t_lneg, rumus_tutup)
            b.main(FadeOut(pergi), run_time=0.6)
            self.remove(*pergi)
            self.hud_ku.clear()
            b.tunggu_kata("Penerapan")
            self.hud_tambah(judul_lanjut)
            b.main(FadeIn(judul_lanjut, shift=UP * 0.2), run_time=0.8)
            self.hud_ku["judul lanjut"] = judul_lanjut
            b.tunggu_kata("panah-panah")
            self.hud_tambah(kipas)
            b.main(LaggedStartMap(GrowArrow, kipas, lag_ratio=0.2), run_time=1.6)
            self.hud_ku["kipas"] = kipas
        self.gerbang()

        sinema.laporkan_pemicu(self)

    # ================================================================== #
    def buat_panah(self):
        """Panah k kali a. Di sekitar k = 0 panahnya disembunyikan, bukan
        digambar sepanjang nol: Arrow dengan panjang nol membuat render gagal,
        dan lenyapnya panah memang isi pelajarannya."""
        k = self.k.get_value()
        ujung = ASAL + k * VA
        if abs(k) < 0.06:
            p = Arrow(ASAL, ASAL + 0.06 * VA, buff=0, thickness=7).set_color(SOROT)
            return p.set_opacity(0.0)
        return Arrow(ASAL, ujung, buff=0, thickness=7).set_color(SOROT)

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
