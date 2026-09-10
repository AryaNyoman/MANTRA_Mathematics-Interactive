"""Vektor Materi 03, Memecah panah jadi dua langkah. ManimGL, STANDAR VIDEO v3.

TULIS ULANG 8 SEPTEMBER 2026. Versi sebelumnya 12 segmen, 2 menit 16 detik.
Versi ini 30 segmen, 4 menit 45 detik, tiap kejadian dipicu pada detik KATA-nya
diucapkan (`sinema.JamKata`).

KERANGKA v3 (docs/tugas/STANDAR-VIDEO-V3.md bagian 1)
  pembuka      buka                        satu pertanyaan, diucapkan dan ditulis
  segar-ingat  ingat1, ingat2, ingat3      Materi 01 (perahu, mendarat 4 ke kanan
                                           3 ke atas) dan Materi 02 (panah boleh
                                           digeser), gambarnya ditampilkan lagi
  contoh angka masalah sampai tulis_baris  mobil 4 blok ke kanan lalu 3 blok naik
  asal rumus   tanya_tukar sampai aturan   ujung dikurangi pangkal DIBUKTIKAN
                                           dari hitungan petak A(1,2) ke B(5,5)
  bentuk umum  umum, terbalik, geser       x ujung - x pangkal, dan arti tanda
  penutup      beda_titik sampai tutup2    titik lawan panah, lalu video berikutnya

TIGA KEPUTUSAN YANG DISENGAJA

1. ANGKA CONTOHNYA 4 DAN 3, BUKAN 3 DAN 4 SEPERTI VERSI LAMA. Itu angka yang
   sama dengan tempat mendarat perahu di video Materi 01, jadi segar-ingatnya
   bukan tempelan: panah mobil di video ini benar-benar panah yang sama.
   Susunan yang ditukar, (3 4), tetap dipakai sebagai lawan bandingnya.

2. ATURAN "UJUNG DIKURANGI PANGKAL" DIKEMBALIKAN KE VIDEO INI. Versi lama
   menyerahkannya ke video Materi 08 supaya videonya pendek. Standar v3 meminta
   tiap rumus lahir dari contoh angka yang dihitung di layar, dan aturan itu
   memang isi halaman Materi 03. Di sini ia dibuktikan dengan menghitung petak
   dari A(1, 2) ke B(5, 5) lebih dulu, baru diperlihatkan bahwa 4 = 5 - 1.

3. TANPA 3D SAMA SEKALI. Materinya 2D, dan jatah 3D satu topik sudah dipakai
   video Materi 01 (STANDAR v3 bagian 5).

MOBILNYA TIDAK BISA DI-FadeIn MAUPUN DI-Indicate: pembaruannya memanggil
`become`, yang menyetel ulang warna dan kepekatan tiap frame. Jadi ia MASUK
dengan melaju dari luar bidang, dan kejadian yang menyorotnya dipikul benda
lain: penanda tujuan, jejak langkahnya, dan panahnya.

WARNA: ungu panah miring (perpindahan), biru langkah mendatar, merah langkah
tegak, hitam susunan yang ditukar, abu benda cerita.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "vektor3-komponen"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

Z = 0.02
ASAL = np.array([0.0, 0.0, Z])
MX, MY = 4.0, 3.0                        # komponen mendatar dan tegak
TUJUAN = np.array([MX, MY, Z])
SUDUT = np.array([MX, 0.0, Z])           # tempat mobil berbelok
TUKAR = np.array([MY, MX, Z])            # susunan yang ditukar, (3 4)
NEG = np.array([-3.0, 4.0, Z])           # contoh komponen bertanda negatif
A_TITIK = np.array([1.0, 2.0, Z])
B_TITIK = np.array([5.0, 5.0, Z])

BIDANG_X, BIDANG_Y = (-4.0, 6.0, 1.0), (-1.0, 6.0, 1.0)


def panah(a, b, warna, tebal=5):
    a, b = np.array(a, dtype=float), np.array(b, dtype=float)
    if np.linalg.norm(b - a) < 0.05:
        b = a + 0.05 * RIGHT
    return Arrow(a, b, buff=0, thickness=tebal).set_color(warna)


def putus(a, b, warna=REDUP):
    return DashedLine(np.array(a, dtype=float), np.array(b, dtype=float),
                      dash_length=0.14).set_stroke(warna, 3)


class PecahJadiKomponen(AdeganMatra):
    def construct(self):
        frame = self.frame
        self.aktif, self.tulisan, self.hud_ku = {}, {}, {}

        bidang = ilustrasi.bidang_bernomor(BIDANG_X, BIDANG_Y)
        bidang.set_opacity(0)
        self.add(bidang)
        pusat, tinggi = kamera.muat_datar(bidang)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi)
        self.papan = sinema.PapanRumus(self, ukuran=30, tanpa_utama=True, alas=True)

        # ==============================================================
        # buka: pertanyaan video ini
        # ==============================================================
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            sinema.judul_pembuka(self, "Materi 03: bagaimana panah bisa dihitung?",
                                 lama=2.4, y=2.4)
            b.catat(2.4)
        self.gerbang()

        # ==============================================================
        # Segar-ingat: perahu Materi 01, lalu panah boleh digeser Materi 02
        # ==============================================================
        p_dayung = panah(ASAL, [0, 3, Z], AKSEN2)
        p_arus = panah([0, 3, Z], [4, 3, Z], AKSEN)
        p_pindah = panah(ASAL, TUJUAN, SOROT, tebal=7)
        ident_km = sinema.identitas(self, "1 petak = 1 km", alas=True)
        ident_km.set_opacity(0)
        self.hud_ku["identitas"] = ident_km

        with sinema.babak(self, "ingat1", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Materi")
            b.main(bidang.animate.set_opacity(1),
                   ident_km.animate.set_opacity(1), run_time=1.0)
            self.aktif["bidang"] = bidang
            b.tunggu_kata("Perahu yang")
            self.add(p_dayung)
            b.main(GrowArrow(p_dayung), run_time=1.0)
            self.aktif["dayung"] = p_dayung
            b.tunggu_kata("dibawa arus")
            self.add(p_arus)
            b.main(GrowArrow(p_arus), run_time=1.0)
            self.aktif["arus"] = p_arus
            b.tunggu_kata("berpindah sejauh")
            self.add(p_pindah)
            b.main(GrowArrow(p_pindah), run_time=1.2)
            self.aktif["perpindahan"] = p_pindah
        self.gerbang()

        proy_x = putus(ASAL, SUDUT)
        proy_y = putus(SUDUT, TUJUAN)
        l_px = sinema.label("4 petak", warna=REDUP).move_to([MX / 2, -0.55, Z])
        l_py = sinema.label("3 petak", warna=REDUP).move_to([MX + 1.05, MY / 2, Z])

        with sinema.babak(self, "ingat2", DURASI, kata=KATA) as b:
            b.tunggu_kata("empat petak")
            self.add(proy_x, l_px)
            l_px.set_opacity(0)
            b.main(ShowCreation(proy_x), l_px.animate.set_opacity(1), run_time=1.0)
            self.aktif["proyeksi x"] = proy_x
            self.tulisan["4 petak"] = l_px
            b.tunggu_kata("tiga petak")
            self.add(proy_y, l_py)
            l_py.set_opacity(0)
            b.main(ShowCreation(proy_y), l_py.animate.set_opacity(1), run_time=1.0)
            self.aktif["proyeksi y"] = proy_y
            self.tulisan["3 petak"] = l_py
        self.gerbang()

        # Salinan panah yang sama, digeser: bukti Materi 02 bahwa letak tidak
        # ikut menentukan. Berangkat dari (-3, 2), jadi ujungnya (1, 5).
        salinan = panah([-3, 2, Z], [1, 5, Z], SOROT, tebal=7)
        salinan.set_stroke(opacity=0.55)

        with sinema.babak(self, "ingat3", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dan di")
            self.papan.baris(r"\text{Materi 02: panjang dan arah}", REDUP, b=b)
            b.tunggu_kata("Letaknya")
            self.add(salinan)
            b.main(TransformFromCopy(p_pindah, salinan), run_time=1.5)
            self.aktif["salinan"] = salinan
            b.tunggu_kata("boleh digeser")
            b.main(Indicate(salinan, scale_factor=1, color=SOROT), run_time=1.0)
        self.gerbang()

        # Sepuluh panah kecil: kenapa menggambar satu per satu melelahkan.
        # SEPULUH, sebab naratornya berkata sepuluh. Siswa yang teliti menghitung
        # panah di layar, dan gambar yang membantah narasinya sendiri lebih
        # merusak daripada gambar yang membosankan.
        acak = [((-3, 0), (-1, 1)), ((-3, 4), (-2, 5)), ((-1, 4), (1, 5)),
                ((2, 5), (4, 5)), ((5, 1), (5, 3)), ((1, -1), (3, 0)),
                ((-2, 1), (-1, 3)), ((4, -1), (5, 0)),
                ((-4, 3), (-3, 4)), ((4, 4), (5, 5))]
        banyak = VGroup(*[panah([a[0], a[1], Z], [c[0], c[1], Z], REDUP, tebal=3)
                          for a, c in acak])

        with sinema.babak(self, "masalah", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tetapi begitu")
            self.add(banyak)
            b.main(LaggedStartMap(GrowArrow, banyak, lag_ratio=0.18), run_time=2.4)
            self.aktif["banyak panah"] = banyak
            b.tunggu_kata("sering meleset")
            b.main(Indicate(banyak, scale_factor=1, color=AKSEN), run_time=1.2)
        self.gerbang()

        ident_blok = sinema.identitas(self, "1 petak = 1 blok jalan", alas=True)
        ident_blok.set_opacity(0)

        with sinema.babak(self, "kota", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jadi kita")
            pergi = Group(banyak, salinan, p_dayung, p_arus, p_pindah,
                          proy_x, proy_y, l_px, l_py)
            self.papan_baru(b, lama=1.0, bareng=[FadeOut(pergi)])
            self.remove(*pergi)
            for nama in ("banyak panah", "salinan", "dayung", "arus",
                         "perpindahan", "proyeksi x", "proyeksi y"):
                self.aktif.pop(nama, None)
            self.tulisan.clear()
            # Identitas berganti BERURUTAN: yang lama habis dulu, baru yang
            # baru datang. Silang menghasilkan dua tulisan bertindih.
            b.tunggu_kata("kita pindah")
            b.main(FadeOut(ident_km), run_time=0.5)
            self.remove(ident_km)
            b.tunggu_kata("satu petak")
            self.hud_tambah(ident_blok)
            b.main(ident_blok.animate.set_opacity(1), run_time=0.6)
            self.hud_ku["identitas"] = ident_blok
        self.gerbang()

        # ==============================================================
        # Mobil: satu panah miring, atau dua langkah
        # ==============================================================
        asli = ilustrasi.mobil(0.8, warna=REDUP, warna_roda=TINTA)
        mobil = asli.copy()
        self.mx, self.my = ValueTracker(-9.0), ValueTracker(0.0)
        self.hadap = ValueTracker(0.0)
        pusat0 = mobil.get_center().copy()

        def taruh(m):
            m.become(asli.copy())
            m.rotate(self.hadap.get_value() * DEGREES, axis=OUT, about_point=pusat0)
            m.move_to(pusat0 + np.array([self.mx.get_value(), self.my.get_value(), 0.0]))

        mobil.add_updater(taruh)
        tanda_tujuan = Circle(radius=0.22).set_stroke(REDUP, 3).move_to(TUJUAN)
        p_miring = panah(ASAL, TUJUAN, SOROT, tebal=7)

        with sinema.babak(self, "miring", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sebuah mobil")
            self.add(mobil)
            b.main(self.mx.animate.set_value(0.0), run_time=1.6)
            self.aktif["mobil"] = mobil
            b.tunggu_kata("di seberang")
            self.add(tanda_tujuan)
            b.main(ShowCreation(tanda_tujuan), run_time=0.8)
            self.aktif["tujuan"] = tanda_tujuan
            b.tunggu_kata("Kalau ia")
            self.add(p_miring)
            b.main(GrowArrow(p_miring), run_time=1.5)
            self.aktif["panah miring"] = p_miring
            b.tunggu_kata("langsung dari")
            b.main(Indicate(p_miring, scale_factor=1, color=SOROT), run_time=1.0)
        self.gerbang()

        jejak_x = Line(ASAL, SUDUT).set_stroke(AKSEN2, 6)
        jejak_y = Line(SUDUT, TUJUAN).set_stroke(AKSEN, 6)

        with sinema.babak(self, "jalan", DURASI, kata=KATA) as b:
            b.tunggu_kata("berjalan empat")
            self.add(jejak_x)
            b.main(self.mx.animate.set_value(MX), ShowCreation(jejak_x), run_time=1.6)
            self.aktif["langkah mendatar"] = jejak_x
            b.tunggu_kata("lalu berbelok")
            self.add(jejak_y)
            b.main(self.hadap.animate.set_value(90.0), run_time=0.5)
            b.main(self.my.animate.set_value(MY), ShowCreation(jejak_y), run_time=1.4)
            self.aktif["langkah tegak"] = jejak_y
        self.gerbang()

        with sinema.babak(self, "sama", DURASI, kata=KATA) as b:
            b.tunggu_kata("Mobilnya berhenti")
            b.main(Indicate(tanda_tujuan, scale_factor=1.5, color=SOROT), run_time=1.0)
            b.tunggu_kata("ujung panah")
            b.main(Indicate(p_miring, scale_factor=1, color=SOROT), run_time=1.0)
            b.tunggu_kata("Jalurnya berbeda")
            b.main(Indicate(jejak_x, scale_factor=1, color=AKSEN2),
                   Indicate(jejak_y, scale_factor=1, color=AKSEN), run_time=1.2)
        self.gerbang()

        l_mx = rumus("4", 32, AKSEN2).move_to([MX / 2, -0.55, Z])
        l_my = rumus("3", 32, AKSEN).move_to([MX + 0.55, MY / 2, Z])

        with sinema.babak(self, "dua_langkah", DURASI, kata=KATA) as b:
            b.tunggu_kata("dua langkah")
            b.main(Indicate(jejak_x, scale_factor=1, color=AKSEN2),
                   Indicate(jejak_y, scale_factor=1, color=AKSEN), run_time=0.8)
            b.tunggu_kata("berapa jauh")
            self.add(l_mx)
            b.main(FadeIn(l_mx), run_time=0.7)
            self.tulisan["4"] = l_mx
            b.tunggu_kata("lalu berapa")
            self.add(l_my)
            b.main(FadeIn(l_my), run_time=0.7)
            self.tulisan["3"] = l_my
        self.gerbang()

        with sinema.babak(self, "nama_komponen", DURASI, kata=KATA) as b:
            b.tunggu_kata("Yang mendatar")
            self.papan.baris(r"\text{komponen mendatar} = 4", AKSEN2, b=b)
            b.tunggu_kata("yang tegak")
            self.papan.baris(r"\text{komponen tegak} = 3", AKSEN, b=b)
        self.gerbang()

        with sinema.babak(self, "tulis_baris", DURASI, kata=KATA) as b:
            b.tunggu_kata("empat tiga")
            sinema.lahir_rumus(self, r"(4\ \ 3)", p_miring, self.papan, b=b,
                               warna=SOROT, sebagai_utama=False, tahan=0.5, run_time=1.0)
            b.tunggu_kata("disebut vektor")
            self.papan.baris(r"\text{vektor baris}", REDUP, b=b)
        self.gerbang()

        with sinema.babak(self, "tanya_tukar", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kalau kedua")
            b.main(Indicate(l_mx, color=SOROT), Indicate(l_my, color=SOROT),
                   run_time=1.0)
        self.gerbang()

        p_tukar = panah(ASAL, TUKAR, TINTA, tebal=5)
        tanda_tukar = Circle(radius=0.22).set_stroke(TINTA, 3).move_to(TUKAR)

        with sinema.babak(self, "tukar", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tiga empat")
            self.add(p_tukar)
            b.main(GrowArrow(p_tukar), run_time=1.4)
            self.aktif["panah ditukar"] = p_tukar
            b.tunggu_kata("mobilnya berhenti")
            self.add(tanda_tukar)
            b.main(ShowCreation(tanda_tukar), run_time=0.8)
            self.aktif["tujuan ditukar"] = tanda_tukar
            b.main(Indicate(tanda_tukar, scale_factor=1.5, color=TINTA), run_time=0.8)
        self.gerbang()

        with sinema.babak(self, "urutan", DURASI, kata=KATA) as b:
            # Papan DIKOSONGKAN dulu. Sampai sini sudah empat baris (komponen
            # mendatar, komponen tegak, (4 3), vektor baris) dan ZONA_RUMUS
            # tingginya cuma 2,6 satuan; baris kelima dan seterusnya menjulur
            # keluar zona lalu digagalkan gerbang.
            b.tunggu_kata("Jadi urutannya")
            self.papan_baru(b, lama=0.5)
            b.tunggu_kata("Angka pertama")
            self.papan.baris(r"(4\ \ 3) \neq (3\ \ 4)", TINTA, b=b)
        self.gerbang()

        p_neg = panah(ASAL, NEG, TINTA, tebal=5)
        neg_x = Line(ASAL, [-3, 0, Z]).set_stroke(AKSEN2, 6)
        neg_y = Line([-3, 0, Z], NEG).set_stroke(AKSEN, 6)

        with sinema.babak(self, "tanda", DURASI, kata=KATA) as b:
            b.tunggu_kata("Negatif tiga")
            pergi = Group(p_tukar, tanda_tukar)
            b.main(FadeOut(pergi), run_time=0.5)
            self.remove(*pergi)
            self.aktif.pop("panah ditukar", None)
            self.aktif.pop("tujuan ditukar", None)
            self.add(p_neg)
            b.main(GrowArrow(p_neg), run_time=0.8)
            self.aktif["panah negatif"] = p_neg
            b.tunggu_kata("bergeser tiga")
            self.add(neg_x)
            b.main(ShowCreation(neg_x), run_time=0.9)
            self.aktif["langkah kiri"] = neg_x
            b.tunggu_kata("lalu naik")
            self.add(neg_y)
            b.main(ShowCreation(neg_y), run_time=0.9)
            self.aktif["langkah naik"] = neg_y
            # Ditulis di babak yang MENGGAMBARNYA, bukan satu babak sesudahnya.
            self.papan.baris(r"(-3\ \ 4)", TINTA, b=b)
        self.gerbang()

        with sinema.babak(self, "kolom", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ada cara")
            self.papan_baru(b, lama=0.5)
            b.tunggu_kata("Angka mendatar")
            self.papan.baris(r"\binom{4}{3}", SOROT, b=b)
            b.tunggu_kata("Bentuk bertumpuk")
            self.papan.baris(r"\text{vektor kolom}", REDUP, b=b)
        self.gerbang()

        with sinema.babak(self, "koma", DURASI, kata=KATA) as b:
            b.tunggu_kata("Titik koordinat")
            pergi = Group(p_neg, neg_x, neg_y)
            self.papan_baru(b, lama=0.6, bareng=[FadeOut(pergi)])
            self.remove(*pergi)
            for nama in ("panah negatif", "langkah kiri", "langkah naik"):
                self.aktif.pop(nama, None)
            self.papan.baris(r"A(3,\ 4) \quad \text{titik, pakai koma}", TINTA, b=b)
            b.tunggu_kata("Vektor baris")
            self.papan.baris(r"(4\ \ 3) \quad \text{panah, tanpa koma}", SOROT, b=b)
        self.gerbang()

        with sinema.babak(self, "kenapa_koma", DURASI, kata=KATA) as b:
            b.tunggu_kata("Yang satu")
            b.main(Indicate(self.papan.baris_lain[0], color=TINTA), run_time=0.9)
            b.tunggu_kata("yang lain")
            b.main(Indicate(self.papan.baris_lain[1], color=SOROT), run_time=0.9)
        self.gerbang()

        # ==============================================================
        # Panah yang tidak berangkat dari titik asal: A(1, 2) ke B(5, 5)
        # ==============================================================
        titik_a = Dot(A_TITIK, radius=0.09).set_color(TINTA)
        titik_b = Dot(B_TITIK, radius=0.09).set_color(TINTA)
        l_a = rumus(r"A(1,\ 2)", 28, TINTA).move_to(A_TITIK + np.array([-0.95, -0.42, 0]))
        # Label B ke KIRI ATAS titiknya, bukan kanan atas. B(5, 5) adalah pojok
        # kanan atas bidang, dan pada kamera `muat_datar` bidang ini ia jatuh di
        # layar (3,20 , 2,74), tepat di jalur panel rumus (ZONA_RUMUS x 2,10
        # sampai 6,85, y 1,10 sampai 3,70). Label di kanan titik itu menindih
        # panel; render 9 Sep gagal dengan "tulisan label B menindih papan".
        l_b = rumus(r"B(5,\ 5)", 28, TINTA).move_to(B_TITIK + np.array([-1.25, 0.30, 0]))
        p_ab = panah(A_TITIK, B_TITIK, SOROT, tebal=6)

        with sinema.babak(self, "tidak_dari_o", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sampai di")
            # Panah mobil TIDAK dibuang, cuma diredupkan: nanti pada babak
            # `geser` ia dibandingkan langsung dengan panah A ke B.
            self.papan_baru(b, lama=0.6, bareng=[
                p_miring.animate.set_stroke(opacity=0.30),
                jejak_x.animate.set_stroke(opacity=0.25),
                jejak_y.animate.set_stroke(opacity=0.25),
                FadeOut(l_mx), FadeOut(l_my), FadeOut(tanda_tujuan)])
            self.remove(l_mx, l_my, tanda_tujuan)
            self.tulisan.clear()
            self.aktif.pop("tujuan", None)
        self.gerbang()

        with sinema.babak(self, "contoh_ab", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ambil A")
            self.add(titik_a, l_a)
            b.main(FadeIn(titik_a, scale=2.0), FadeIn(l_a), run_time=0.8)
            self.aktif["titik A"] = titik_a
            self.tulisan["label A"] = l_a
            b.tunggu_kata("dan B")
            self.add(titik_b, l_b)
            b.main(FadeIn(titik_b, scale=2.0), FadeIn(l_b), run_time=0.8)
            self.aktif["titik B"] = titik_b
            self.tulisan["label B"] = l_b
            b.tunggu_kata("Kita cari")
            self.add(p_ab)
            b.main(GrowArrow(p_ab), run_time=1.4)
            self.aktif["panah AB"] = p_ab
        self.gerbang()

        sudut_ab = np.array([B_TITIK[0], A_TITIK[1], Z])
        ab_x = putus(A_TITIK, sudut_ab, AKSEN2)
        ab_y = putus(sudut_ab, B_TITIK, AKSEN)
        l_abx = rumus("4", 32, AKSEN2).move_to([(A_TITIK[0] + B_TITIK[0]) / 2, A_TITIK[1] - 0.52, Z])
        # Angka 3 di sisi KIRI ruas tegaknya, sebab sisi kanannya sudah masuk
        # jalur panel rumus (lihat catatan pada label B).
        l_aby = rumus("3", 32, AKSEN).move_to([B_TITIK[0] - 0.45, (A_TITIK[1] + B_TITIK[1]) / 2, Z])

        with sinema.babak(self, "hitung_x", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dari x")
            self.add(ab_x)
            b.main(ShowCreation(ab_x), run_time=1.2)
            self.aktif["langkah AB mendatar"] = ab_x
            b.tunggu_kata("Hitung petaknya")
            b.main(Indicate(ab_x, scale_factor=1, color=AKSEN2), run_time=1.0)
            b.tunggu_kata("empat petak")
            self.add(l_abx)
            b.main(FadeIn(l_abx), run_time=0.7)
            self.tulisan["4 AB"] = l_abx
        self.gerbang()

        with sinema.babak(self, "hitung_y", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dari y")
            self.add(ab_y)
            b.main(ShowCreation(ab_y), run_time=1.2)
            self.aktif["langkah AB tegak"] = ab_y
            b.tunggu_kata("Tiga petak")
            self.add(l_aby)
            b.main(FadeIn(l_aby), run_time=0.7)
            self.tulisan["3 AB"] = l_aby
        self.gerbang()

        with sinema.babak(self, "aturan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Empat adalah")
            self.papan.baris(r"4 = 5 - 1", AKSEN2, b=b)
            b.tunggu_kata("tiga adalah")
            self.papan.baris(r"3 = 5 - 2", AKSEN, b=b)
            b.tunggu_kata("Ujung dikurangi")
            self.papan.baris(r"\text{ujung} - \text{pangkal}", SOROT, b=b)
        self.gerbang()

        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Angka mendatarnya")
            # Ditulis sebagai vektor KOLOM, bukan baris. Dua alasan. Pertama,
            # bentuk barisnya selebar 4,5 satuan layar sehingga tepi kirinya
            # menjulur sampai x = 2,18 dan menindih tulisan di bidang. Kedua,
            # kolom itu memang baru saja diperkenalkan babak `kolom`, dan
            # susunannya persis mengikuti kalimatnya: angka mendatar di atas,
            # angka tegak di bawah.
            sinema.lahir_rumus(self, r"\binom{x_B - x_A}{y_B - y_A}", p_ab, self.papan,
                               b=b, warna=SOROT, sebagai_utama=False, tahan=0.5,
                               run_time=1.0)
        self.gerbang()

        p_ba = panah(B_TITIK, A_TITIK, TINTA, tebal=5)

        with sinema.babak(self, "terbalik", DURASI, kata=KATA) as b:
            b.tunggu_kata("hasilnya negatif")
            self.papan_baru(b, lama=0.5)
            self.papan.baris(r"(-4\ \ -3)", TINTA, b=b)
            b.tunggu_kata("itu panah")
            self.add(p_ba)
            b.main(GrowArrow(p_ba), run_time=1.2)
            self.aktif["panah BA"] = p_ba
            b.tunggu_kata("arahnya berkebalikan")
            b.main(Indicate(p_ba, scale_factor=1, color=TINTA), run_time=1.0)
        self.gerbang()

        with sinema.babak(self, "geser", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dan lihat")
            b.main(FadeOut(p_ba), run_time=0.5)
            self.remove(p_ba)
            self.aktif.pop("panah BA", None)
            b.tunggu_kata("empat tiga")
            b.main(p_miring.animate.set_stroke(opacity=1.0), run_time=0.8)
            b.tunggu_kata("padahal berangkatnya")
            b.main(Indicate(p_miring, scale_factor=1, color=SOROT),
                   Indicate(p_ab, scale_factor=1, color=SOROT), run_time=1.4)
            b.tunggu_kata("letaknya memang")
            self.papan.baris(r"(4\ \ 3) = (4\ \ 3)", SOROT, b=b)
        self.gerbang()

        with sinema.babak(self, "beda_titik", DURASI, kata=KATA) as b:
            b.tunggu_kata("Titik empat")
            self.papan_baru(b, lama=0.5)
            self.papan.baris(r"\text{titik } (4,\ 3):\ \text{letak}", TINTA, b=b)
            b.tunggu_kata("sedangkan panah")
            self.papan.baris(r"\text{panah } (4\ \ 3):\ \text{perpindahan}", SOROT, b=b)
        self.gerbang()

        tutup1 = teks("Dua angka sudah cukup mewakili satu panah.", 32, TINTA)
        sinema.batasi_lebar(tutup1, 11.4)
        tutup1.move_to([0, 0.95, 0]).fix_in_frame()
        tutup1b = teks("Itulah sebabnya vektor bisa dihitung, bukan cuma digambar.", 32, SOROT)
        sinema.batasi_lebar(tutup1b, 11.4)
        tutup1b.move_to([0, 0.10, 0]).fix_in_frame()
        tutup2 = teks("Berikutnya: panjang panah, dari kedua angka itu.", 32, TINTA)
        sinema.batasi_lebar(tutup2, 11.4)
        tutup2.move_to([0, -1.30, 0]).fix_in_frame()

        # Peraga janji video berikutnya: segitiga siku-siku dari 4 dan 3.
        pj = np.array([-1.6, -2.15, 0.0])
        j_datar = Line(pj, pj + np.array([1.9, 0, 0])).set_stroke(AKSEN2, 4).fix_in_frame()
        j_tegak = Line(pj + np.array([1.9, 0, 0]), pj + np.array([1.9, 1.1, 0]))
        j_tegak.set_stroke(AKSEN, 4).fix_in_frame()
        j_miring = Line(pj, pj + np.array([1.9, 1.1, 0])).set_stroke(SOROT, 4).fix_in_frame()
        janji = VGroup(j_datar, j_tegak, j_miring)

        semua_dunia = Group(bidang, p_miring, jejak_x, jejak_y, mobil,
                            titik_a, titik_b, l_a, l_b, p_ab, ab_x, ab_y,
                            l_abx, l_aby)

        with sinema.babak(self, "tutup1", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jadi dua")
            mobil.clear_updaters()
            self.papan_baru(b, lama=1.0, bareng=[FadeOut(semua_dunia),
                                                 FadeOut(ident_blok)])
            self.remove(*semua_dunia, ident_blok)
            self.aktif.clear()
            self.tulisan.clear()
            self.hud_ku.clear()
            self.hud_tambah(tutup1)
            tutup1.set_opacity(0)
            b.main(tutup1.animate.set_opacity(1), run_time=1.0)
            self.hud_ku["tutup 1"] = tutup1
            b.tunggu_kata("Itulah sebabnya")
            self.hud_tambah(tutup1b)
            tutup1b.set_opacity(0)
            b.main(tutup1b.animate.set_opacity(1), run_time=1.0)
            self.hud_ku["tutup 1b"] = tutup1b
        self.gerbang()

        with sinema.babak(self, "tutup2", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di video")
            self.hud_tambah(tutup2)
            tutup2.set_opacity(0)
            b.main(tutup2.animate.set_opacity(1), run_time=0.8)
            self.hud_ku["tutup 2"] = tutup2
            b.tunggu_kata("segitiga siku-siku")
            self.hud_tambah(j_datar, j_tegak, j_miring)
            b.main(ShowCreation(j_datar), ShowCreation(j_tegak),
                   ShowCreation(j_miring), run_time=1.2)
            self.hud_ku["janji"] = janji
        self.gerbang()

        sinema.laporkan_pemicu(self)

    # ==================================================================
    def gerbang(self):
        """Gerbang mutu sesudah satu babak. Dipanggil di LUAR `with` supaya baris
        `with sinema.babak(...)` tetap terbaca `alat/cek_waktu_adegan.py`."""
        hud = dict(self.hud_ku)
        papan = self.papan.semua()
        if papan is not None:
            # Alas kertasnya ikut di dalam kelompok ini dan seukuran isinya.
            papan.beralas = True
            hud["papan"] = papan
        qc.periksa_adegan(self, {}, hud=hud, dunia=self.aktif, tulisan=self.tulisan)

    def papan_baru(self, b, lama: float = 0.5, ikut=None, bareng=None):
        """Kosongkan papan rumus, lalu ganti dengan papan kosong yang baru.

        Barisnya benar-benar DIBUANG dari adegan, bukan sekadar dipudarkan:
        benda beropasitas nol tetap punya kotak batas dan gerbang mengukurnya.
        """
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
