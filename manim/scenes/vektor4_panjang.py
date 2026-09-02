"""Vektor Materi 04, Panjang panah itu Pythagoras. ManimGL.

Arah visualnya sama dengan Materi 01, 03, 06, 08, dan 09:
`docs/superpowers/specs/2026-09-02-video-vektor-bidang-bernomor.md`.
Matematika di bidang datar bernomor, kamera TEGAK LURUS setelah babak pembuka.
Keterangan pita bawah TIDAK dipakai: pita itu milik subtitle.

KENAPA ANGKANYA BEDA DARI HALAMAN
Halaman Materi 04 memakai contoh (4 3) yang panjangnya 5, dan uraian itu sudah
ditampilkan utuh di video Materi 01 (babak `pythagoras`). Mengulangnya di sini
membuat satu video penuh jadi pengulangan. Video ini memakai (4 2) yang
panjangnya akar 20, tidak bulat, supaya siswa tidak menyimpulkan panjang vektor
selalu bilangan bulat. Angka 5 tetap muncul, tetapi lewat (-3 4), yang sekaligus
memperlihatkan tanda minus hilang begitu dikuadratkan.

STORYBOARD
   1. sapa      3D miring DEKAT: dua tiang dengan kabel terbentang di antaranya.
   2. terbang   Turun ke tegak lurus; bidang koordinat bernomor muncul.
   3. komponen  Komponen (4, 2) digambar sebagai dua langkah.
   4. segitiga  Tanda siku-siku; kabelnya adalah sisi miring.
   5. hitung    4^2 = 16, 2^2 = 4, jumlahnya 20, akarnya 2 akar 5.
   6. bulat     Hasilnya tidak bulat, dan itu justru yang biasa.
   7. tanya     Pertanyaan, lalu diam.
   8. negatif   (-3, 4): (-3)^2 = 9, bukan -9. Panjangnya 5.
   9. mutlak    Panjang tidak pernah negatif.
  10. arah      Busur sudut dari sumbu mendatar berlawanan arah jarum jam.
  11. sama      (3 4), (4 3), (-5 0): panjang sama, arah berbeda.
  12. tutup     Layar bersih, kalimat sorot Materi 04.

JANGKAUAN BIDANG
Titik terjauh: (4, 2), (-3, 4), (3, 4), (4, 3), dan (-5, 0). Jadi x cukup -6
sampai 6 dan y -1 sampai 5. Tinggi bingkai 8,0 dengan pusat y 1,8 menaruh baris
paling bawah bidang di sekitar -2,8 pada bingkai, aman di atas jalur subtitle.

WARNA: ungu panah utama, biru langkah mendatar, merah langkah tegak,
hitam panah pembanding.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "vektor4-panjang"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

Z = 0.02
ASAL = np.array([0.0, 0.0, Z])
VX, VY = 4.0, 2.0
VV = np.array([VX, VY, 0.0])            # (4 2)
SUDUT_V = np.array([VX, 0.0, Z])        # pojok siku-siku
VW = np.array([-3.0, 4.0, 0.0])         # (-3 4)

BIDANG_X, BIDANG_Y = (-6.0, 6.0, 1.0), (-1.0, 5.0, 1.0)
PETA = dict(theta=0, phi=0, pusat=(0.0, 1.8, 0.0), tinggi=8.0)


def panah(a, b, warna, tebal=5):
    a = np.array(a, dtype=float)
    b = np.array(b, dtype=float)
    if np.linalg.norm(b - a) < 0.05:
        b = a + 0.05 * RIGHT
    return Arrow(a, b, buff=0, thickness=tebal).set_color(warna)


class PanjangPanah(AdeganMatra):
    def construct(self):
        frame = self.frame

        # ==============================================================
        # Babak 1: dunia nyata, 3D, dari dekat
        # ==============================================================
        alas = ilustrasi.tanah(14.0, 14.0, 1.5, z=-0.02)
        lapangan = VGroup(ilustrasi.lantai_kisi(12.0, 1.0)[0])
        TINGGI_TIANG = 1.5
        tiang1 = ilustrasi.silinder(0.10, TINGGI_TIANG, REDUP)
        tiang2 = ilustrasi.silinder(0.10, TINGGI_TIANG, REDUP).shift(VV)
        kabel = Line(np.array([0.0, 0.0, TINGGI_TIANG]),
                     VV + np.array([0.0, 0.0, TINGGI_TIANG]))
        kabel.set_stroke(TINTA, 2.5)

        kamera.pasang_awal(frame, theta=-30, phi=64, pusat=(2.0, 1.0, 0.9), tinggi=5.2)
        self.add(alas, lapangan, tiang1, tiang2, kabel)
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Panjang panah itu Pythagoras", lama=3.2, y=2.4)
            b.catat(3.2)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"tiang 1": tiang1, "tiang 2": tiang2})

        # ==============================================================
        # Babak 2: turun ke tegak lurus
        # ==============================================================
        bidang = ilustrasi.bidang_bernomor(BIDANG_X, BIDANG_Y)
        bidang.set_opacity(0)
        self.add(bidang)
        identitas = teks("1 petak = 1 meter", 23, REDUP).to_corner(UL, buff=0.42)

        with sinema.babak(self, "terbang", DURASI) as b:
            lama = max(2.0, DURASI["terbang"] - 3.0)
            b.main(kamera.sudut(frame, **PETA), run_time=lama)
            b.main(FadeOut(lapangan), FadeOut(alas), FadeOut(kabel),
                   FadeOut(tiang1), FadeOut(tiang2),
                   bidang.animate.set_opacity(1), run_time=1.4)
            self.hud_tambah(identitas)
            identitas.set_opacity(0)
            b.main(identitas.animate.set_opacity(1), run_time=0.8)
        qc.periksa_adegan(self, {"bidang": bidang, "identitas": identitas})

        # ==============================================================
        # Babak 3: komponennya
        # ==============================================================
        p_datar = panah(ASAL, SUDUT_V, AKSEN2, tebal=4)
        p_tegak = panah(SUDUT_V, SUDUT_V + np.array([0.0, VY, 0.0]), AKSEN, tebal=4)
        l_datar = rumus("4", 28, AKSEN2).move_to([VX / 2, -0.55, 0])
        l_tegak = rumus("2", 28, AKSEN).move_to([VX + 0.55, VY / 2, 0])
        panel_v = rumus(r"\vec{v} = (4\ \ 2)", 32, SOROT).to_corner(UR, buff=0.45)

        with sinema.babak(self, "komponen", DURASI) as b:
            b.main(GrowArrow(p_datar), run_time=1.0)
            b.main(FadeIn(l_datar), run_time=0.4)
            b.main(GrowArrow(p_tegak), run_time=1.0)
            b.main(FadeIn(l_tegak), run_time=0.4)
            self.hud_tambah(panel_v)
            panel_v.set_opacity(0)
            b.main(panel_v.animate.set_opacity(1), run_time=0.6)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"datar": p_datar, "tegak": p_tegak,
                                 "label datar": l_datar, "label tegak": l_tegak,
                                 "panel v": panel_v},
                          [("label datar", "label tegak")])

        # ==============================================================
        # Babak 4: segitiga siku-sikunya
        # ==============================================================
        p_v = panah(ASAL, ASAL + VV, SOROT, tebal=7)
        s = 0.30
        siku = VGroup(
            Line(SUDUT_V + s * LEFT, SUDUT_V + s * LEFT + s * UP),
            Line(SUDUT_V + s * UP, SUDUT_V + s * LEFT + s * UP),
        ).set_stroke(TINTA, 2.6)
        l_miring = teks("sisi miring", 22, SOROT)
        l_miring.move_to(ASAL + VV * 0.5 + np.array([-0.55, 0.55, 0.0]))

        with sinema.babak(self, "segitiga", DURASI) as b:
            b.main(GrowArrow(p_v), run_time=1.4)
            b.main(ShowCreation(siku), run_time=0.6)
            b.main(FadeIn(l_miring), run_time=0.5)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"v": p_v, "miring": l_miring, "panel v": panel_v,
                                 "label tegak": l_tegak},
                          [("miring", "label tegak")])

        # ==============================================================
        # Babak 5: Pythagoras, langkah demi langkah
        # ==============================================================
        uraian = VGroup(
            rumus(r"4^2 = 16", 28, AKSEN2),
            rumus(r"2^2 = 4", 28, AKSEN),
            rumus(r"16 + 4 = 20", 28, TINTA),
            rumus(r"|\vec{v}| = \sqrt{20} = 2\sqrt{5} \approx 4{,}47", 28, SOROT),
        ).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        uraian.next_to(identitas, DOWN, buff=0.34).align_to(identitas, LEFT)

        with sinema.babak(self, "hitung", DURASI) as b:
            self.hud_tambah(uraian)
            uraian.set_opacity(0)
            for baris in uraian:
                b.main(baris.animate.set_opacity(1), run_time=0.8)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"uraian": uraian, "identitas": identitas,
                                 "panel v": panel_v},
                          [("uraian", "identitas"), ("uraian", "panel v")])

        # ==============================================================
        # Babak 6: hasilnya tidak bulat, dan itu biasa
        # ==============================================================
        with sinema.babak(self, "bulat", DURASI) as b:
            b.main(Indicate(uraian[3], scale_factor=1.0, color=AKSEN), run_time=1.2)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"uraian": uraian, "v": p_v})

        # ==============================================================
        # Babak 7: pertanyaan
        # ==============================================================
        with sinema.babak(self, "tanya", DURASI) as b:
            b.main(FadeOut(siku), FadeOut(l_miring),
                   FadeOut(p_datar), FadeOut(p_tegak),
                   FadeOut(l_datar), FadeOut(l_tegak), run_time=0.8)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"v": p_v, "uraian": uraian})

        # ==============================================================
        # Babak 8: komponen yang bertanda negatif
        # ==============================================================
        p_w = panah(ASAL, ASAL + VW, TINTA, tebal=6)
        l_w = rumus(r"\vec{w} = (-3\ \ 4)", 26, TINTA)
        l_w.move_to(ASAL + VW + np.array([-0.15, 0.60, 0.0]))
        uraian_w = VGroup(
            rumus(r"(-3)^2 = 9", 28, TINTA),
            rumus(r"4^2 = 16", 28, TINTA),
            rumus(r"|\vec{w}| = \sqrt{25} = 5", 28, TINTA),
        ).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        uraian_w.next_to(uraian, DOWN, buff=0.34).align_to(uraian, LEFT)

        with sinema.babak(self, "negatif", DURASI) as b:
            b.main(GrowArrow(p_w), run_time=1.4)
            b.main(FadeIn(l_w), run_time=0.5)
            self.hud_tambah(uraian_w)
            uraian_w.set_opacity(0)
            for baris in uraian_w:
                b.main(baris.animate.set_opacity(1), run_time=0.7)
            b.jeda(0.6)
        qc.periksa_adegan(self, {"w": p_w, "label w": l_w, "uraian w": uraian_w,
                                 "uraian": uraian, "panel v": panel_v},
                          [("uraian w", "uraian"), ("label w", "uraian w")])

        # ==============================================================
        # Babak 9: panjang tidak pernah negatif
        # ==============================================================
        with sinema.babak(self, "mutlak", DURASI) as b:
            b.main(Indicate(uraian_w[0], scale_factor=1.0, color=AKSEN), run_time=1.2)
            b.main(Indicate(uraian_w[2], scale_factor=1.0, color=SOROT), run_time=1.2)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"uraian w": uraian_w, "identitas": identitas})

        # ==============================================================
        # Babak 10: arahnya
        # ==============================================================
        theta = np.arctan2(VY, VX)
        busur = Arc(start_angle=0.0, angle=theta, radius=1.25, arc_center=ASAL)
        busur.set_stroke(SOROT, 3)
        sumbu_bantu = DashedLine(ASAL, ASAL + np.array([2.6, 0.0, 0.0]))
        sumbu_bantu.set_stroke(REDUP, 2)
        l_sudut = rumus(r"26{,}6^\circ", 26, SOROT).move_to(ASAL + np.array([1.95, 0.42, 0.0]))

        with sinema.babak(self, "arah", DURASI) as b:
            b.main(FadeOut(p_w), FadeOut(l_w), run_time=0.6)
            b.main(ShowCreation(sumbu_bantu), run_time=0.6)
            b.main(ShowCreation(busur), run_time=1.0)
            b.main(FadeIn(l_sudut), run_time=0.5)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"sudut": l_sudut, "uraian": uraian, "v": p_v},
                          [("sudut", "uraian")])

        # ==============================================================
        # Babak 11: panjang sama, arah berbeda
        # ==============================================================
        SAMA = [np.array([3.0, 4.0, 0.0]), np.array([4.0, 3.0, 0.0]),
                np.array([-5.0, 0.0, 0.0])]
        p_sama = VGroup(*[panah(ASAL, ASAL + v, TINTA, tebal=5) for v in SAMA])
        l_sama = VGroup(
            rumus(r"(3\ \ 4)", 24, TINTA).move_to(ASAL + SAMA[0] + np.array([0.15, 0.50, 0.0])),
            rumus(r"(4\ \ 3)", 24, TINTA).move_to(ASAL + SAMA[1] + np.array([0.95, 0.30, 0.0])),
            rumus(r"(-5\ \ 0)", 24, TINTA).move_to(ASAL + SAMA[2] + np.array([-0.20, 0.55, 0.0])),
        )
        l_lima = teks("ketiganya panjangnya 5", 23, SOROT)
        l_lima.move_to(ASAL + np.array([-2.6, -0.65, 0.0]))

        with sinema.babak(self, "sama", DURASI) as b:
            b.main(FadeOut(busur), FadeOut(sumbu_bantu), FadeOut(l_sudut),
                   FadeOut(p_v), run_time=0.6)
            for p, l in zip(p_sama, l_sama):
                b.main(GrowArrow(p), run_time=0.7)
                b.main(FadeIn(l), run_time=0.3)
            b.main(FadeIn(l_lima), run_time=0.5)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"lima": l_lima, "label 3 4": l_sama[0],
                                 "label 4 3": l_sama[1], "label -5 0": l_sama[2],
                                 "uraian w": uraian_w},
                          [("label 3 4", "label 4 3"), ("lima", "uraian w")])

        # ==============================================================
        # Babak 12: layar bersih, kalimat sorot
        # ==============================================================
        tutup1 = teks("Panjang panah adalah akar dari jumlah kuadrat komponennya.", 30, TINTA)
        sinema.batasi_lebar(tutup1, 11.4)
        tutup2 = teks("Dan panjang saja tidak pernah cukup untuk menyebut sebuah vektor.", 30, SOROT)
        sinema.batasi_lebar(tutup2, 11.4)
        tutup = VGroup(tutup1, tutup2).arrange(DOWN, buff=0.34).move_to([0, 0.3, 0])

        semua = Group(bidang, p_sama, l_sama, l_lima)
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(semua), FadeOut(uraian), FadeOut(uraian_w),
                   FadeOut(identitas), FadeOut(panel_v), run_time=1.4)
            self.hud_tambah(tutup)
            tutup.set_opacity(0)
            b.main(tutup.animate.set_opacity(1), run_time=1.8)
            b.jeda(1.4)
        qc.periksa_adegan(self, {"tutup": tutup})
