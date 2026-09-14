"""Vektor Materi 04, Vektor dalam Sistem Koordinat Bagian 2: panjang panah.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (2:24)
yang sudah disetujui ARYA. ISINYA SAMA: dua tiang dan kabel di antaranya;
vektor (4 2); langkah mendatar, langkah tegak, dan kabel membentuk segitiga
siku-siku dengan kabel sebagai sisi miring; 16 + 4 = 20, akar 20 = 2 akar 5
sekitar 4,47; hasil tidak bulat itu biasa; (-3 4) kuadratnya 9 bukan -9,
panjangnya 5; panjang tidak pernah negatif; arah = sudut dari sumbu mendatar,
26,6 derajat; (3 4), (4 3), (-5 0) sama panjang beda arah.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 2 lalu pertanyaannya; segar-ingat
  Bagian 1: panah (4 3) dicatat dua angka, digambar lagi di petak.
- Bentuk umum |v| = akar(x^2 + y^2) LAHIR besar di dekat panahnya, label 4
  dan 2 berubah jadi x dan y; dua garis tegak diberi pita sorot.
- Tiap kejadian dipicu pada kata yang mengucapkannya (`sinema.JamKata`).
- Kalimat narasi tidak ditulis sebagai teks di layar; penutup memperlihatkan
  rumus panjang dan satu panah berlabel panjang dan sudut; pancingan Bagian 3
  berupa panah sepanjang tepat 1.
- Sorot panah dan ruas memakai pita ungu tembus pandang (`sorot_pita`), bukan
  Indicate (Indicate sewarna bendanya tidak berbekas, dan pada benda lain ia
  menutup bendanya sesaat).

ANGKANYA SENGAJA (4 2), BUKAN (4 3): halaman sudah memakai (4 3) yang
panjangnya 5, dan akar 20 memperlihatkan panjang vektor tidak selalu bulat.
Angka 5 tetap muncul lewat (-3 4).

WARNA: ungu panah utama, biru langkah mendatar, merah langkah tegak,
tinta panah pembanding, abu benda cerita.
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
KATA = sinema.JamKata(TOPIK)

Z = 0.02
ASAL = np.array([0.0, 0.0, Z])
VX, VY = 4.0, 2.0
VV = np.array([VX, VY, 0.0])            # (4 2)
SUDUT_V = np.array([VX, 0.0, Z])        # pojok siku-siku
VW = np.array([-3.0, 4.0, 0.0])         # (-3 4)
V_INGAT = np.array([4.0, 3.0, 0.0])     # panah (4 3) dari Bagian 1

BIDANG_X, BIDANG_Y = (-6.0, 6.0, 1.0), (-1.0, 5.0, 1.0)
GARIS_SAMAR, GARIS_SEDANG, GARIS_PENUH = 0.30, 0.55, 1.0
MIRING_AWAL = 0.0          # kamera TEGAK LURUS sejak awal: segar-ingat menggambar di petak, dan petak miring membuat segitiganya berbohong; "kita lihat dari atas" tinggal zum ringan
TINGGI_TIANG = 1.5


def panah(a, b, warna, tebal=5):
    a = np.array(a, dtype=float)
    b = np.array(b, dtype=float)
    if np.linalg.norm(b - a) < 0.05:
        b = a + 0.05 * RIGHT
    return Arrow(a, b, buff=0, thickness=tebal).set_color(warna)


def pita_atas(m, warna=SOROT):
    return SurroundingRectangle(m, buff=0.08).set_fill(warna, 0.18).set_stroke(width=0)


class PanjangPanah(AdeganMatra):
    def construct(self):
        frame = self.frame
        self.aktif, self.tulisan, self.hud_ku = {}, {}, {}

        bidang = ilustrasi.bidang_bernomor(BIDANG_X, BIDANG_Y)
        # Bidang tidak tampak selama pembuka (pertanyaannya menempati tengah
        # layar); ia menyala samar pada kalimat segar-ingat.
        bidang.set_stroke(opacity=0.0)
        bidang.angka.set_opacity(0)
        self.add(bidang)
        pusat, tinggi = kamera.muat_datar(bidang)
        kamera.pasang_awal(frame, theta=0, phi=MIRING_AWAL, pusat=pusat,
                           tinggi=tinggi * 1.06)
        self.papan = sinema.PapanRumus(self, ukuran=30, tanpa_utama=True, alas=True)

        # ============ buka ============================================== #
        tanya_buka = teks("Sudah punya dua angka, lalu berapa panjang panahnya?", 34, TINTA)
        sinema.batasi_lebar(tanya_buka, 11.4)
        tanya_buka.move_to([0, 0.3, 0]).fix_in_frame()

        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Vektor")
            sinema.judul_pembuka(self, "Vektor dalam Sistem Koordinat, Bagian 2", lama=3.2, y=1.6)
            b.catat(3.2)
            b.tunggu_kata("Sudah")
            self.hud_tambah(tanya_buka)
            b.main(Write(tanya_buka), run_time=1.6)
            self.hud_ku["tanya buka"] = tanya_buka
        self.gerbang()

        # ============ ingat: panah (4 3) dari Bagian 1 ==================== #
        p_ingat = panah(ASAL, ASAL + V_INGAT, SOROT, tebal=7)
        i_datar = Line(ASAL, ASAL + V_INGAT[0] * RIGHT).set_stroke(AKSEN2, 6)
        i_tegak = Line(ASAL + V_INGAT[0] * RIGHT, ASAL + V_INGAT).set_stroke(AKSEN, 6)
        li_datar = rumus("4", 30, AKSEN2).move_to([V_INGAT[0] / 2, -0.55, Z])
        li_tegak = rumus("3", 30, AKSEN).move_to([V_INGAT[0] + 0.5, V_INGAT[1] / 2, Z])
        tanya_panjang = rumus("?", 44, SOROT).move_to(ASAL + V_INGAT / 2 + np.array([-0.5, 0.45, 0]))
        ident = None

        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi sebelumnya")
            ident = sinema.identitas(self, "ingat Bagian 1", alas=True)
            ident.set_opacity(0)
            b.main(FadeOut(tanya_buka), ident.animate.set_opacity(1),
                   bidang.animate.set_stroke(opacity=GARIS_SAMAR), run_time=0.6)
            self.aktif["bidang"] = bidang
            self.remove(tanya_buka)
            self.hud_ku.pop("tanya buka", None)
            self.hud_ku["identitas"] = ident
            b.tunggu_kata("satu panah")
            self.add(p_ingat)
            b.main(GrowArrow(p_ingat), run_time=1.0)
            self.aktif["panah ingat"] = p_ingat
            b.tunggu_kata("empat petak")
            self.add(i_datar, li_datar)
            b.main(ShowCreation(i_datar), FadeIn(li_datar), run_time=0.8)
            self.aktif["langkah ingat datar"] = i_datar
            self.tulisan["4 ingat"] = li_datar
            b.tunggu_kata("tiga petak")
            self.add(i_tegak, li_tegak)
            b.main(ShowCreation(i_tegak), FadeIn(li_tegak), run_time=0.8)
            self.aktif["langkah ingat tegak"] = i_tegak
            self.tulisan["3 ingat"] = li_tegak
            b.tunggu_kata("ditulis")
            self.papan.baris(r"(4\ \ 3)", SOROT, b=b)
            b.tunggu_kata("panjang panahnya")
            self.add(tanya_panjang)
            b.main(FadeIn(tanya_panjang, scale=1.4), run_time=0.5)
            self.tulisan["tanya panjang"] = tanya_panjang
            self.sorot_pita(b, p_ingat, lama=0.9)
        self.gerbang()

        # ============ cerita: dua tiang dan kabel ========================= #
        tiang1 = ilustrasi.silinder(0.10, TINGGI_TIANG, REDUP)
        tiang2 = ilustrasi.silinder(0.10, TINGGI_TIANG, REDUP).shift(VV)
        kabel = Line(np.array([0.0, 0.0, TINGGI_TIANG]),
                     VV + np.array([0.0, 0.0, TINGGI_TIANG]))
        kabel.set_stroke(TINTA, 2.5)

        with sinema.babak(self, "cerita", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dua tiang")
            pergi = Group(p_ingat, i_datar, i_tegak, li_datar, li_tegak, tanya_panjang)
            self.papan_baru(b, lama=0.6, bareng=[FadeOut(pergi), FadeOut(ident),
                                                 bidang.animate.set_stroke(opacity=GARIS_SEDANG)])
            self.remove(*pergi, ident)
            ident = None
            self.hud_ku.pop("identitas", None)
            for nama in ("panah ingat", "langkah ingat datar", "langkah ingat tegak"):
                self.aktif.pop(nama, None)
            self.tulisan.clear()
            self.add(tiang1, tiang2)
            b.main(FadeIn(tiang1, scale=1.5), FadeIn(tiang2, scale=1.5), run_time=0.8)
            self.aktif["tiang 1"] = tiang1
            self.aktif["tiang 2"] = tiang2
            b.tunggu_kata("membentang kabel")
            self.add(kabel)
            b.main(ShowCreation(kabel), run_time=1.4)
            self.aktif["kabel"] = kabel
            b.tunggu_kata("berapa meter")
            self.sorot_pita(b, kabel, lama=0.9)
            self.sorot_pita(b, kabel, lama=0.9)
        self.gerbang()

        # ============ terbang: tegak lurus, angka sumbu, identitas ======== #
        with sinema.babak(self, "terbang", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kita lihat")
            # 1,4 dan 0,3 detik (dulu 1,6 dan 0,4): "Satu petak" datang lebih cepat pada narasi Bian (14 Sep 2026)
            b.main(kamera.sudut(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi),
                   run_time=1.4)
            b.main(bidang.animate.set_stroke(opacity=GARIS_PENUH), run_time=0.3)
            b.tunggu_kata("Satu petak")
            b.main(bidang.angka.animate.set_opacity(0.75), run_time=0.7)
            ident = sinema.identitas(self, "1 petak = 1 meter", alas=True)
            ident.set_opacity(0)
            b.main(ident.animate.set_opacity(1), run_time=0.6)
            self.hud_ku["identitas"] = ident
        self.gerbang()

        # ============ komponen: (4 2) ===================================== #
        p_datar = panah(ASAL, SUDUT_V, AKSEN2, tebal=4)
        p_tegak = panah(SUDUT_V, SUDUT_V + np.array([0.0, VY, 0.0]), AKSEN, tebal=4)
        l_datar = rumus("4", 28, AKSEN2).move_to([VX / 2, -0.55, Z])
        l_tegak = rumus("2", 28, AKSEN).move_to([VX + 0.55, VY / 2, Z])

        with sinema.babak(self, "komponen", DURASI, kata=KATA) as b:
            b.tunggu_kata("empat petak")
            self.add(p_datar, l_datar)
            b.main(GrowArrow(p_datar), FadeIn(l_datar), run_time=0.9)
            self.aktif["datar"] = p_datar
            self.tulisan["4"] = l_datar
            b.tunggu_kata("dua petak")
            self.add(p_tegak, l_tegak)
            b.main(GrowArrow(p_tegak), FadeIn(l_tegak), run_time=0.8)
            self.aktif["tegak"] = p_tegak
            self.tulisan["2"] = l_tegak
            b.tunggu_kata("vektornya")
            self.papan.baris(r"\vec{v} = (4\ \ 2)", SOROT, b=b)
        self.gerbang()

        # ============ segitiga: kabel = sisi miring ======================= #
        p_v = panah(ASAL, ASAL + VV, SOROT, tebal=7)
        s = 0.30
        siku = VGroup(
            Line(SUDUT_V + s * LEFT, SUDUT_V + s * LEFT + s * UP),
            Line(SUDUT_V + s * UP, SUDUT_V + s * LEFT + s * UP),
        ).set_stroke(TINTA, 2.6)
        l_miring = teks("sisi miring", 22, SOROT)
        l_miring.move_to(ASAL + VV * 0.5 + np.array([-0.55, 0.55, 0.0]))

        with sinema.babak(self, "segitiga", DURASI, kata=KATA) as b:
            b.tunggu_kata("langkah mendatar")
            self.sorot_pita(b, p_datar, lama=0.8)
            b.tunggu_kata("langkah tegak")
            self.sorot_pita(b, p_tegak, lama=0.8)
            b.tunggu_kata("kabelnya sendiri")
            self.add(p_v)
            b.main(FadeOut(kabel), GrowArrow(p_v), run_time=1.2)
            self.remove(kabel)
            self.aktif.pop("kabel", None)
            self.aktif["v"] = p_v
            b.tunggu_kata("segitiga siku-siku")
            self.add(siku)
            b.main(ShowCreation(siku), run_time=0.6)
            self.aktif["siku"] = siku
            b.tunggu_kata("sisi miringnya")
            self.add(l_miring)
            b.main(FadeIn(l_miring), run_time=0.5)
            self.tulisan["sisi miring"] = l_miring
            self.sorot_pita(b, p_v, lama=0.9)
        self.gerbang()

        # ============ hitung: Pythagoras langkah demi langkah ============= #
        with sinema.babak(self, "hitung", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kuadratkan yang mendatar")
            self.sorot_pita(b, p_datar, lama=0.8)
            b.tunggu_kata("empat kuadrat")
            self.papan.baris(r"4^2 = 16", AKSEN2, b=b)
            b.tunggu_kata("Kuadratkan yang tegak")
            self.sorot_pita(b, p_tegak, lama=0.8)
            b.tunggu_kata("dua kuadrat")
            jumlah = self.papan.baris(r"2^2 = 4", AKSEN, b=b)
            b.tunggu_kata("Jumlahkan")
            jumlah = sinema.ganti_rumus(self, jumlah, r"16 + 4 = 20", b=b,
                                        papan=self.papan, warna=TINTA, run_time=0.9)
            b.tunggu_kata("tarik akarnya")
            akar = sinema.lahir_rumus(self, r"|\vec{v}| = \sqrt{20} \approx 4{,}47", p_v,
                                      self.papan, b=b, warna=SOROT, sebagai_utama=False,
                                      ukuran_lahir=48, tahan=0.6, run_time=1.1,
                                      geser=UP * 1.3)
            b.tunggu_kata("dua akar lima")
            self.papan.baris(r"\sqrt{20} = 2\sqrt{5}", TINTA, b=b)
        self.gerbang()

        # ============ bulat: hasilnya tidak bulat, itu biasa ============== #
        with sinema.babak(self, "bulat", DURASI, kata=KATA) as b:
            b.tunggu_kata("bukan bilangan")
            b.main(Indicate(akar, color=AKSEN, scale_factor=1.0), run_time=1.2)
            b.tunggu_kata("seperti lima")
            b.main(Indicate(akar, color=SOROT, scale_factor=1.0), run_time=1.0)
        self.gerbang()

        # ============ umum: |v| = akar(x^2 + y^2) ========================= #
        l_x = rumus("x", 30, AKSEN2).move_to(l_datar)
        l_y = rumus("y", 30, AKSEN).move_to(l_tegak)

        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bentuk umumnya")
            self.papan_baru(b, lama=0.6)
            b.tunggu_kata("komponen x")
            b.main(Transform(l_datar, l_x), run_time=0.6)
            b.tunggu_kata("dan y")
            b.main(Transform(l_tegak, l_y), run_time=0.6)
            b.tunggu_kata("panjangnya akar")
            umum = sinema.lahir_rumus(self, r"|\vec{v}| = \sqrt{x^2 + y^2}", p_v, self.papan,
                                      b=b, warna=SOROT, sebagai_utama=False,
                                      ukuran_lahir=52, tahan=0.8, run_time=1.1,
                                      geser=UP * 1.3)
            b.tunggu_kata("Dua garis")
            huruf = umum.family_members_with_points()
            pita_bar = pita_atas(VGroup(huruf[0], huruf[3]))
            pita_bar.fix_in_frame()
            self.add(pita_bar)
            b.main(FadeIn(pita_bar), run_time=0.5)
            b.tunggu_kata("lambang")
            b.main(FadeOut(pita_bar), run_time=0.6)
            self.remove(pita_bar)
        self.gerbang()

        # ============ tanya: kalau komponennya negatif? =================== #
        with sinema.babak(self, "tanya", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang")
            pergi = Group(siku, l_miring, p_datar, p_tegak, l_datar, l_tegak, tiang1, tiang2)
            b.main(FadeOut(pergi), run_time=0.8)
            self.remove(*pergi)
            for nama in ("siku", "datar", "tegak", "tiang 1", "tiang 2"):
                self.aktif.pop(nama, None)
            self.tulisan.clear()
            b.tunggu_kata("bertanda negatif")
            b.main(p_v.animate.set_opacity(0.35), run_time=0.6)
        self.gerbang()

        # ============ negatif: (-3 4) ===================================== #
        p_w = panah(ASAL, ASAL + VW, TINTA, tebal=6)
        l_w = rumus(r"\vec{w} = (-3\ \ 4)", 26, TINTA)
        l_w.move_to(ASAL + VW + np.array([-0.15, 0.60, 0.0]))
        w_datar = Line(ASAL, ASAL + VW[0] * RIGHT).set_stroke(AKSEN2, 6)
        w_tegak = Line(ASAL + VW[0] * RIGHT, ASAL + VW).set_stroke(AKSEN, 6)
        lw_datar = rumus("-3", 28, AKSEN2).move_to([VW[0] / 2, -0.55, Z])
        lw_tegak = rumus("4", 28, AKSEN).move_to([VW[0] - 0.5, VW[1] / 2, Z])

        with sinema.babak(self, "negatif", DURASI, kata=KATA) as b:
            b.tunggu_kata("panah lain")
            self.add(p_w)
            b.main(GrowArrow(p_w), run_time=1.0)
            self.aktif["w"] = p_w
            b.tunggu_kata("negatif tiga")
            self.add(l_w)
            b.main(FadeIn(l_w), run_time=0.5)
            self.tulisan["label w"] = l_w
            b.tunggu_kata("bergeser")
            self.add(w_datar, lw_datar)
            b.main(ShowCreation(w_datar), FadeIn(lw_datar), run_time=0.8)
            self.aktif["langkah kiri"] = w_datar
            self.tulisan["-3"] = lw_datar
            self.add(w_tegak, lw_tegak)
            b.main(ShowCreation(w_tegak), FadeIn(lw_tegak), run_time=0.7)
            self.aktif["langkah naik"] = w_tegak
            self.tulisan["4 w"] = lw_tegak
            b.tunggu_kata("Kuadratkan")
            self.papan_baru(b, lama=0.5)
            kuadrat_w = self.papan.baris(r"(-3)^2 = 9", AKSEN2, b=b)
            b.tunggu_kata("bukan negatif")
            kuadrat_w = sinema.ganti_rumus(self, kuadrat_w, r"(-3)^2 = 9,\ \text{bukan } {-9}",
                                           b=b, papan=self.papan, warna=AKSEN2, run_time=0.8)
            b.tunggu_kata("empat kuadrat")
            self.papan.baris(r"4^2 = 16", AKSEN, b=b)
            b.tunggu_kata("Jumlahnya")
            self.papan.baris(r"9 + 16 = 25", TINTA, b=b)
            b.tunggu_kata("akarnya lima")
            panjang_w = self.papan.baris(r"|\vec{w}| = \sqrt{25} = 5", SOROT, b=b)
        self.gerbang()

        # ============ mutlak: panjang tidak pernah negatif ================ #
        with sinema.babak(self, "mutlak", DURASI, kata=KATA) as b:
            b.tunggu_kata("Minusnya")
            b.main(Indicate(kuadrat_w, color=AKSEN, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("Panjang vektor")
            b.main(Indicate(panjang_w, color=SOROT, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("ukuran tidak")
            self.papan_baru(b, lama=0.5)
            self.papan.baris(r"|\vec{v}| \geq 0", SOROT, b=b)
        self.gerbang()

        # ============ arah: sudut dari sumbu mendatar ===================== #
        theta = np.arctan2(VY, VX)
        busur = Arc(start_angle=0.0, angle=theta, radius=1.25, arc_center=ASAL)
        busur.set_stroke(SOROT, 3)
        sumbu_bantu = DashedLine(ASAL, ASAL + np.array([2.6, 0.0, 0.0]), dash_length=0.14)
        sumbu_bantu.set_stroke(REDUP, 2)
        l_sudut = rumus(r"26{,}6^\circ", 26, SOROT).move_to(ASAL + np.array([1.95, 0.42, 0.0]))
        panah_putar = Arc(start_angle=-0.35, angle=0.9, radius=1.7, arc_center=ASAL)
        panah_putar.set_stroke(REDUP, 3).add_tip(width=0.2, length=0.2)

        with sinema.babak(self, "arah", DURASI, kata=KATA) as b:
            b.tunggu_kata("Panjang saja")
            pergi = Group(p_w, l_w, w_datar, w_tegak, lw_datar, lw_tegak)
            b.main(FadeOut(pergi), p_v.animate.set_opacity(1.0), run_time=0.7)
            self.remove(*pergi)
            for nama in ("w", "langkah kiri", "langkah naik"):
                self.aktif.pop(nama, None)
            self.tulisan.clear()
            b.tunggu_kata("Arahnya")
            self.sorot_pita(b, p_v, lama=0.8)
            b.tunggu_kata("sumbu x")
            self.add(sumbu_bantu)
            b.main(ShowCreation(sumbu_bantu), run_time=0.6)
            self.aktif["sumbu bantu"] = sumbu_bantu
            b.tunggu_kata("berlawanan")
            self.add(busur)
            b.main(ShowCreation(busur), run_time=1.0)
            self.aktif["busur"] = busur
            b.tunggu_kata("sudutnya")
            self.add(l_sudut)
            b.main(FadeIn(l_sudut), run_time=0.5)
            self.tulisan["sudut"] = l_sudut
        self.gerbang()

        # ============ sama: panjang sama, arah berbeda ==================== #
        SAMA = [np.array([3.0, 4.0, 0.0]), np.array([4.0, 3.0, 0.0]),
                np.array([-5.0, 0.0, 0.0])]
        p_sama = VGroup(*[panah(ASAL, ASAL + v, TINTA, tebal=5) for v in SAMA])
        l_sama = VGroup(
            rumus(r"(3\ \ 4)", 24, TINTA).move_to(ASAL + SAMA[0] + np.array([0.15, 0.50, 0.0])),
            rumus(r"(4\ \ 3)", 24, TINTA).move_to(ASAL + SAMA[1] + np.array([0.60, -0.70, 0.0])),
            rumus(r"(-5\ \ 0)", 24, TINTA).move_to(ASAL + SAMA[2] + np.array([-0.20, 0.55, 0.0])),
        )
        l_lima = sinema.label("panjang 5", 23, SOROT)
        l_lima.move_to(ASAL + np.array([-2.6, -0.65, 0.0]))

        with sinema.babak(self, "sama", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tiga empat")
            pergi = Group(busur, sumbu_bantu, l_sudut, p_v)
            self.papan_baru(b, lama=0.4, bareng=[FadeOut(pergi)])
            self.remove(*pergi)
            for nama in ("busur", "sumbu bantu", "v"):
                self.aktif.pop(nama, None)
            self.tulisan.clear()
            self.add(p_sama[0], l_sama[0])
            b.main(GrowArrow(p_sama[0]), FadeIn(l_sama[0]), run_time=0.5)
            self.aktif["panah sama 0"] = p_sama[0]
            self.tulisan["label sama 0"] = l_sama[0]
            b.tunggu_kata("empat tiga")
            self.add(p_sama[1], l_sama[1])
            b.main(GrowArrow(p_sama[1]), FadeIn(l_sama[1]), run_time=0.6)
            self.aktif["panah sama 1"] = p_sama[1]
            self.tulisan["label sama 1"] = l_sama[1]
            b.tunggu_kata("negatif lima")
            self.add(p_sama[2], l_sama[2])
            b.main(GrowArrow(p_sama[2]), FadeIn(l_sama[2]), run_time=0.6)
            self.aktif["panah sama 2"] = p_sama[2]
            self.tulisan["label sama 2"] = l_sama[2]
            b.tunggu_kata("panjangnya sama")
            self.add(l_lima)
            b.main(FadeIn(l_lima), run_time=0.5)
            self.tulisan["panjang 5"] = l_lima
            b.tunggu_kata("arah yang")
            self.sorot_pita(b, *p_sama, lama=1.2)
        self.gerbang()

        # ============ tutup: rumus panjang, panjang dan arah ============== #
        rumus_tutup = rumus(r"|\vec{v}| = \sqrt{x^2 + y^2}", 46, SOROT).move_to([0, 1.1, 0]).fix_in_frame()
        p0 = np.array([-1.6, -1.6, 0.0])
        vt = np.array([3.2, 1.3, 0.0])
        panah_tutup = Arrow(p0, p0 + vt, buff=0, thickness=6).set_color(SOROT).fix_in_frame()
        l_panjang = teks("panjang", 26, REDUP)
        l_panjang.move_to(p0 + vt / 2 + np.array([-0.45, 0.5, 0.0])).fix_in_frame()
        garis_tutup = DashedLine(p0, p0 + RIGHT * 2.0, dash_length=0.14).set_stroke(REDUP, 2).fix_in_frame()
        busur_tutup = Arc(start_angle=0.0, angle=np.arctan2(vt[1], vt[0]), radius=0.9,
                          arc_center=p0).set_stroke(AKSEN, 3).fix_in_frame()
        l_arah = teks("arah", 26, AKSEN).move_to(p0 + np.array([1.1, -0.42, 0.0])).fix_in_frame()

        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jadi ingat")
            pergi = Group(bidang, p_sama, l_sama, l_lima)
            self.papan_baru(b, lama=1.0, bareng=[FadeOut(pergi), FadeOut(ident)])
            self.remove(*pergi, ident)
            ident = None
            self.aktif.clear()
            self.tulisan.clear()
            self.hud_ku.clear()
            b.tunggu_kata("Panjang panah")
            self.hud_tambah(rumus_tutup)
            b.main(FadeIn(rumus_tutup, shift=UP * 0.2), run_time=1.0)
            self.hud_ku["rumus tutup"] = rumus_tutup
            b.tunggu_kata("Dan panjang")
            self.hud_tambah(garis_tutup, panah_tutup, l_panjang)
            b.main(GrowArrow(panah_tutup), FadeIn(garis_tutup), run_time=0.8)
            b.main(FadeIn(l_panjang), run_time=0.4)
            self.hud_ku["panah tutup"] = panah_tutup
            self.hud_ku["garis tutup"] = garis_tutup
            self.hud_ku["label panjang"] = l_panjang
            b.tunggu_kata("menyebut sebuah")
            self.hud_tambah(busur_tutup, l_arah)
            b.main(ShowCreation(busur_tutup), FadeIn(l_arah), run_time=0.8)
            self.hud_ku["busur tutup"] = busur_tutup
            self.hud_ku["label arah"] = l_arah
        self.gerbang()

        # ============ lanjut: panah sepanjang tepat 1 ===================== #
        judul_lanjut = teks("Vektor dalam Sistem Koordinat, Bagian 3", 30, SOROT)
        judul_lanjut.move_to([0, 1.9, 0]).fix_in_frame()
        q0 = np.array([-0.9, -1.0, 0.0])
        arah_satu = vt / np.linalg.norm(vt) * 1.8
        panah_satu = Arrow(q0, q0 + arah_satu, buff=0, thickness=6).set_color(AKSEN2).fix_in_frame()
        l_satu = rumus("1", 34, AKSEN2).move_to(q0 + arah_satu / 2 + np.array([-0.35, 0.4, 0.0])).fix_in_frame()

        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di materi")
            pergi = Group(rumus_tutup, garis_tutup, busur_tutup, l_arah, l_panjang, panah_tutup)
            b.main(FadeOut(pergi), run_time=0.6)
            self.remove(*pergi)
            self.hud_ku.clear()
            b.tunggu_kata("Vektor dalam")
            self.hud_tambah(judul_lanjut)
            b.main(FadeIn(judul_lanjut, shift=UP * 0.2), run_time=0.8)
            self.hud_ku["judul lanjut"] = judul_lanjut
            b.tunggu_kata("panah yang")
            self.hud_tambah(panah_satu)
            b.main(GrowArrow(panah_satu), run_time=0.9)
            self.hud_ku["panah satu"] = panah_satu
            b.tunggu_kata("tepat satu")
            self.hud_tambah(l_satu)
            b.main(FadeIn(l_satu, scale=1.4), run_time=0.5)
            self.hud_ku["label satu"] = l_satu
        self.gerbang()

        sinema.laporkan_pemicu(self)

    # ================================================================== #
    def gerbang(self):
        """Gerbang mutu sesudah satu babak. Dipanggil di LUAR `with` supaya
        baris `with sinema.babak(...)` tetap terbaca `alat/cek_waktu_adegan.py`."""
        hud = dict(self.hud_ku)
        papan = self.papan.semua()
        if papan is not None:
            papan.beralas = True
            hud["papan"] = papan
        qc.periksa_adegan(self, {}, hud=hud, dunia=self.aktif, tulisan=self.tulisan)

    def sorot_pita(self, b, *ruas, lama: float = 1.0):
        """Sorot panah atau ruas dengan pita ungu TEMBUS PANDANG di sepanjangnya
        (bukan Indicate: sewarna bendanya tidak berbekas, dan pada benda lain
        menutup bendanya sesaat). Dibangun dari letak ruas SAAT INI."""
        pita = VGroup(*[Line(r.get_start(), r.get_end()).set_stroke(SOROT, 18, opacity=0.35)
                        for r in ruas])
        self.add(pita)
        b.main(FadeIn(pita), run_time=lama * 0.35)
        b.main(FadeOut(pita), run_time=lama * 0.65)
        self.remove(pita)

    def papan_baru(self, b, lama: float = 0.5, ikut=None, bareng=None):
        """Kosongkan papan rumus, lalu ganti dengan papan kosong yang baru.
        Barisnya benar-benar DIBUANG dari adegan: benda beropasitas nol tetap
        punya kotak batas dan gerbang mengukurnya."""
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
