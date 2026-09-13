"""Vektor Materi 06, Operasi Vektor Bagian 1: menjumlah itu menyambung perjalanan.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (2:12)
yang sudah disetujui ARYA. ISINYA SAMA: pejalan berjalan (3 1) lalu (1 2)
dari tempat ia berhenti; resultan (4 3) dari titik berangkat ke titik akhir;
ujung ke pangkal; susunan keliru pangkal ke pangkal; garis bantu ke sumbu
memperlihatkan 3 + 1 = 4 dan 1 + 2 = 3; jebakan panjang 3,16 + 2,24 = 5,4
padahal resultannya tepat 5.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 1 lalu pertanyaannya; segar-ingat
  Vektor dalam Sistem Koordinat Bagian 1: satu panah = dua angka, digambar
  ulang sebagai (4 2) dengan dua langkahnya.
- Bentuk umum a + b = (a1 + b1  a2 + b2) LAHIR besar di dekat resultannya.
- Tiap kejadian dipicu pada kata yang mengucapkannya (`sinema.JamKata`).
- Kalimat narasi tidak ditulis sebagai teks di layar; penutup memperlihatkan
  penjumlahan komponen yang sah dan penjumlahan panjang yang dicoret;
  pancingan Bagian 2 berupa dua panah sepangkal yang ditutup jajar genjang.
- Sorot panah memakai pita ungu tembus pandang (`sorot_pita`), bukan Indicate.

KENAPA PANAHNYA DIBEKUKAN SETELAH BABAK jalan2: selama orangnya berjalan,
panah digambar ulang tiap frame (`always_redraw`) supaya tumbuh mengikuti
langkah. Sesudah berhenti, panah yang sama diganti salinan diam, sebab babak
`keliru` perlu MEREDUPKAN susunan yang benar, dan benda `always_redraw`
mengembalikan kepekatannya sendiri tiap frame.

WARNA: biru perjalanan pertama, merah perjalanan kedua, ungu resultan,
abu susunan yang keliru dan garis bantu.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "vektor6-sambung"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

Z = 0.02
ASAL = np.array([0.0, 0.0, Z])
V1 = np.array([3.0, 1.0, 0.0])             # perjalanan pertama
V2 = np.array([1.0, 2.0, 0.0])             # perjalanan kedua
SIMPANG = ASAL + V1
AKHIR = ASAL + V1 + V2
V_INGAT = np.array([4.0, 2.0, 0.0])        # panah (4 2) dari Vektor dalam Sistem Koordinat

BIDANG_X, BIDANG_Y = (-2.0, 7.0, 1.0), (-1.0, 4.0, 1.0)
GARIS_SAMAR, GARIS_SEDANG, GARIS_PENUH = 0.30, 0.55, 1.0
MIRING_AWAL = 0.0          # kamera TEGAK LURUS sejak awal: segar-ingat menggambar di petak, dan petak miring membuat segitiganya berbohong; "kita lihat dari atas" tinggal zum ringan


def panah(a, b, warna, tebal=5):
    """Panah pendek pun tetap sah: panjang nol membuat Arrow gagal."""
    a = np.array(a, dtype=float)
    b = np.array(b, dtype=float)
    if np.linalg.norm(b - a) < 0.05:
        b = a + 0.05 * RIGHT
    return Arrow(a, b, buff=0, thickness=tebal).set_color(warna)


class SambungPerjalanan(AdeganMatra):
    def construct(self):
        frame = self.frame
        self.aktif, self.tulisan, self.hud_ku = {}, {}, {}

        bidang = ilustrasi.bidang_bernomor(BIDANG_X, BIDANG_Y)
        # Bidang tidak tampak selama pembuka (pertanyaannya menempati tengah
        # layar); ia menyala samar pada kalimat segar-ingat.
        bidang.set_stroke(opacity=0.0)
        bidang.angka.set_opacity(0)
        self.add(bidang)

        pejalan = ilustrasi.orang(1.15)
        pusat0 = pejalan.get_center().copy()
        self.t1 = ValueTracker(0.0)
        self.t2 = ValueTracker(0.0)
        pejalan.add_updater(lambda m: m.move_to(pusat0 + self.langkah()))

        pusat, tinggi = kamera.muat_datar(bidang)
        kamera.pasang_awal(frame, theta=0, phi=MIRING_AWAL, pusat=pusat,
                           tinggi=tinggi * 1.06)
        self.papan = sinema.PapanRumus(self, ukuran=30, tanpa_utama=True, alas=True)

        # ============ buka ============================================== #
        tanya_buka = teks("Dua perjalanan berturut-turut, hasilnya perjalanan apa?", 34, TINTA)
        sinema.batasi_lebar(tanya_buka, 11.4)
        tanya_buka.move_to([0, 0.3, 0]).fix_in_frame()

        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Operasi")
            sinema.judul_pembuka(self, "Operasi Vektor, Bagian 1", lama=3.0, y=1.6)
            b.catat(3.0)
            b.tunggu_kata("Dua perjalanan")
            self.hud_tambah(tanya_buka)
            b.main(Write(tanya_buka), run_time=1.6)
            self.hud_ku["tanya buka"] = tanya_buka
        self.gerbang()

        # ============ ingat: panah (4 2) = dua angka ====================== #
        p_ingat = panah(ASAL, ASAL + V_INGAT, SOROT, tebal=7)
        i_datar = Line(ASAL, ASAL + V_INGAT[0] * RIGHT).set_stroke(AKSEN2, 6)
        i_tegak = Line(ASAL + V_INGAT[0] * RIGHT, ASAL + V_INGAT).set_stroke(AKSEN, 6)
        li_datar = rumus("4", 30, AKSEN2).move_to([V_INGAT[0] / 2, -0.55, Z])
        li_tegak = rumus("2", 30, AKSEN).move_to([V_INGAT[0] + 0.5, V_INGAT[1] / 2, Z])
        ident = None

        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Vektor")
            ident = sinema.identitas(self, "ingat komponen", alas=True)
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
            b.tunggu_kata("berapa ke kanan")
            self.add(i_datar, li_datar)
            b.main(ShowCreation(i_datar), FadeIn(li_datar), run_time=0.8)
            self.aktif["langkah ingat datar"] = i_datar
            self.tulisan["4 ingat"] = li_datar
            b.tunggu_kata("berapa ke atas")
            self.add(i_tegak, li_tegak)
            b.main(ShowCreation(i_tegak), FadeIn(li_tegak), run_time=0.8)
            self.aktif["langkah ingat tegak"] = i_tegak
            self.tulisan["2 ingat"] = li_tegak
            self.papan.baris(r"(4\ \ 2)", SOROT, b=b)
            b.tunggu_kata("kita sambung")
            self.sorot_pita(b, p_ingat, lama=0.9)
        self.gerbang()

        # ============ cerita: pejalan di lapangan berpetak ================ #
        with sinema.babak(self, "cerita", DURASI, kata=KATA) as b:
            b.tunggu_kata("Seseorang")
            pergi = Group(p_ingat, i_datar, i_tegak, li_datar, li_tegak)
            self.papan_baru(b, lama=0.7, bareng=[FadeOut(pergi), FadeOut(ident),
                                                 bidang.animate.set_stroke(opacity=GARIS_SEDANG)])
            self.remove(*pergi, ident)
            ident = None
            self.hud_ku.pop("identitas", None)
            for nama in ("panah ingat", "langkah ingat datar", "langkah ingat tegak"):
                self.aktif.pop(nama, None)
            self.tulisan.clear()
            self.add(pejalan)
            b.main(FadeIn(pejalan, scale=1.5), run_time=0.8)
            self.aktif["pejalan"] = pejalan
            b.tunggu_kata("berjalan dua")
            for _ in range(2):
                b.main(Indicate(pejalan, scale_factor=1.18, color=TINTA), run_time=0.8)
            b.tunggu_kata("di mana")
            b.main(Indicate(bidang.axes, scale_factor=1.0, color=SOROT), run_time=1.2)
        self.gerbang()

        # ============ terbang: tegak lurus, angka sumbu, identitas ======== #
        with sinema.babak(self, "terbang", DURASI, kata=KATA) as b:
            b.tunggu_kata("bisa kita")
            b.main(bidang.animate.set_stroke(opacity=GARIS_PENUH), run_time=1.0)
            b.tunggu_kata("dari atas")
            b.main(kamera.sudut(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi),
                   run_time=1.6)
            b.tunggu_kata("kedua sumbunya")
            b.main(bidang.angka[0].animate.set_opacity(0.75), run_time=0.7)
            b.main(bidang.angka[1].animate.set_opacity(0.75), run_time=0.7)
            b.tunggu_kata("Satu petak")
            ident = sinema.identitas(self, "1 petak = 1 langkah", alas=True)
            ident.set_opacity(0)
            b.main(ident.animate.set_opacity(1), run_time=0.7)
            self.hud_ku["identitas"] = ident
        self.gerbang()

        # ============ jalan1: perjalanan pertama ========================== #
        p1 = always_redraw(lambda: panah(ASAL, ASAL + V1 * self.t1.get_value(), AKSEN2))
        titik1 = Dot(radius=0.08).set_color(AKSEN2).move_to(SIMPANG)
        koord1 = rumus(r"(3,\ 1)", 26, AKSEN2).move_to(SIMPANG + np.array([0.75, -0.42, 0.0]))

        with sinema.babak(self, "jalan1", DURASI, kata=KATA) as b:
            b.tunggu_kata("tiga petak")
            self.add(p1)
            self.bring_to_front(pejalan)
            b.main(self.t1.animate.set_value(1.0), run_time=2.6)
            b.tunggu_kata("Panah biru")
            self.papan.baris(r"\vec{a} = (3\ \ 1)", AKSEN2, b=b)
            b.tunggu_kata("ujungnya")
            self.add(titik1, koord1)
            self.bring_to_front(pejalan)
            b.main(FadeIn(titik1, scale=2.0), FadeIn(koord1), run_time=0.6)
            self.tulisan["koordinat 1"] = koord1
        self.gerbang()

        # ============ jalan2: perjalanan kedua ============================ #
        p2 = always_redraw(lambda: panah(SIMPANG, SIMPANG + V2 * self.t2.get_value(), AKSEN))
        titik2 = Dot(radius=0.09).set_color(SOROT).move_to(AKHIR)
        koord2 = rumus(r"(4,\ 3)", 26, SOROT).move_to(AKHIR + np.array([0.85, 0.42, 0.0]))

        with sinema.babak(self, "jalan2", DURASI, kata=KATA) as b:
            b.tunggu_kata("Satu petak")
            self.add(p2)
            self.bring_to_front(pejalan)
            b.main(self.t2.animate.set_value(1.0), run_time=2.4)
            b.tunggu_kata("Panah merah")
            self.papan.baris(r"\vec{b} = (1\ \ 2)", AKSEN, b=b)
            b.tunggu_kata("berhenti di")
            self.add(titik2, koord2)
            self.bring_to_front(pejalan)
            b.main(FadeIn(titik2, scale=2.0), FadeIn(koord2), run_time=0.6)
            self.tulisan["koordinat 2"] = koord2

        # Panah dibekukan (catatan kepala berkas).
        pejalan.clear_updaters()
        self.remove(p1, p2)
        pa = panah(ASAL, SIMPANG, AKSEN2)
        pb = panah(SIMPANG, AKHIR, AKSEN)
        self.add(pa, pb)
        self.bring_to_front(pejalan)
        self.aktif["panah a"] = pa
        self.aktif["panah b"] = pb
        self.gerbang()

        # ============ tanya: ke mana ia berpindah? ======================== #
        titik0 = Dot(radius=0.10).set_color(TINTA).move_to(ASAL)
        tanda_tanya = rumus("?", 44, SOROT).move_to([1.2, 1.7, Z])

        with sinema.babak(self, "tanya", DURASI, kata=KATA) as b:
            b.tunggu_kata("lupakan")
            b.main(pa.animate.set_opacity(0.45), pb.animate.set_opacity(0.45), run_time=0.7)
            b.tunggu_kata("titik ia berangkat")
            self.add(titik0)
            b.main(FadeIn(titik0, scale=2.5), Flash(ASAL, color=SOROT, flash_radius=0.5,
                                                    line_length=0.2), run_time=0.8)
            self.aktif["titik asal"] = titik0
            b.tunggu_kata("ke mana")
            self.add(tanda_tanya)
            b.main(FadeIn(tanda_tanya, scale=1.4), run_time=0.5)
            self.tulisan["tanda tanya"] = tanda_tanya
        self.gerbang()

        # ============ resultan ============================================ #
        pr = panah(ASAL, AKHIR, SOROT, tebal=7)
        l_resultan = teks("resultan", 24, SOROT).move_to(ASAL + (V1 + V2) * 0.5 + np.array([-0.55, 0.62, 0.0]))

        with sinema.babak(self, "resultan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Panah ungu")
            b.main(FadeOut(tanda_tanya), run_time=0.3)
            self.remove(tanda_tanya)
            self.tulisan.pop("tanda tanya", None)
            self.add(pr)
            self.bring_to_front(pejalan)
            b.main(GrowArrow(pr), run_time=1.6)
            self.aktif["resultan"] = pr
            b.tunggu_kata("empat koma")
            b.main(Indicate(koord2, color=SOROT), run_time=0.8)
            b.tunggu_kata("namanya")
            self.add(l_resultan)
            b.main(FadeIn(l_resultan), run_time=0.5)
            self.tulisan["label resultan"] = l_resultan
            self.papan.baris(r"\vec{a} + \vec{b} = (4\ \ 3)", SOROT, b=b)
        self.gerbang()

        # ============ aturan: ujung ke pangkal ============================ #
        sambung = Dot(radius=0.11).set_color(TINTA).move_to(SIMPANG)
        l_sambung = sinema.label("ujung = pangkal", 24, TINTA)
        # Di kanan atas simpangnya: di kanan bawah ia menindih koordinat (3, 1).
        l_sambung.move_to(SIMPANG + np.array([1.45, 0.55, 0.0]))

        with sinema.babak(self, "aturan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Perhatikan")
            b.main(pa.animate.set_opacity(1.0), pb.animate.set_opacity(1.0), run_time=0.6)
            b.tunggu_kata("Pangkal panah")
            self.add(sambung)
            b.main(FadeIn(sambung, scale=2.5), run_time=0.6)
            self.aktif["sambung"] = sambung
            b.tunggu_kata("ujung panah")
            self.add(l_sambung)
            b.main(FadeIn(l_sambung), run_time=0.5)
            self.tulisan["label sambung"] = l_sambung
            b.tunggu_kata("menutup segitiga")
            self.sorot_pita(b, pa, pb, pr, lama=1.2)
        self.gerbang()

        # ============ keliru: pangkal ke pangkal ========================== #
        pb_salah = panah(ASAL, ASAL + V2, AKSEN)
        pb_salah.set_opacity(0.55)
        p_salah = panah(ASAL + V1, ASAL + V2, REDUP, tebal=5)
        benar = VGroup(pa, pb, pr, sambung, l_sambung, titik1, titik2, koord1, koord2, l_resultan)

        with sinema.babak(self, "keliru", DURASI, kata=KATA) as b:
            b.tunggu_kata("kedua pangkalnya")
            b.main(benar.animate.set_opacity(0.22), run_time=0.8)
            self.add(pb_salah)
            b.main(GrowArrow(pb_salah), run_time=0.9)
            self.aktif["b salah"] = pb_salah
            b.tunggu_kata("bukan resultan")
            self.add(p_salah)
            b.main(GrowArrow(p_salah), run_time=1.0)
            self.aktif["salah"] = p_salah
            b.tunggu_kata("lebih pendek")
            self.sorot_pita(b, p_salah, lama=1.0)
        self.gerbang()

        # ============ komponen: dari mana angka mendatarnya =============== #
        Y_LABEL = -0.72
        bantu_x = VGroup(
            DashedLine(SIMPANG, [SIMPANG[0], 0, Z], dash_length=0.14).set_stroke(AKSEN2, 2),
            DashedLine(AKHIR, [AKHIR[0], 0, Z], dash_length=0.14).set_stroke(SOROT, 2),
        )
        ruas_a = Line([0, 0, Z], [3, 0, Z]).set_stroke(AKSEN2, 7)
        ruas_b = Line([3, 0, Z], [4, 0, Z]).set_stroke(AKSEN, 7)
        n_a = rumus("3", 30, AKSEN2).move_to([1.5, Y_LABEL, 0])
        n_b = rumus("1", 30, AKSEN).move_to([3.5, Y_LABEL, 0])

        with sinema.babak(self, "komponen", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sebelum")
            b.main(FadeOut(pb_salah), FadeOut(p_salah), benar.animate.set_opacity(1.0),
                   run_time=0.8)
            self.remove(pb_salah, p_salah)
            self.aktif.pop("b salah", None)
            self.aktif.pop("salah", None)
            b.tunggu_kata("garis bantu")
            self.add(bantu_x)
            b.main(ShowCreation(bantu_x), run_time=1.4)
            self.aktif["bantu x"] = bantu_x
            b.tunggu_kata("mengisi petak")
            self.add(ruas_a, n_a)
            b.main(ShowCreation(ruas_a), FadeIn(n_a), run_time=1.0)
            self.aktif["ruas a"] = ruas_a
            self.tulisan["angka a"] = n_a
            b.tunggu_kata("menyambungnya")
            self.add(ruas_b, n_b)
            b.main(ShowCreation(ruas_b), FadeIn(n_b), run_time=1.0)
            self.aktif["ruas b"] = ruas_b
            self.tulisan["angka b"] = n_b
        self.gerbang()

        # ============ hitung: sumbu tegak, lalu angkanya ================== #
        X_LABEL = -0.95
        bantu_y = VGroup(
            DashedLine(SIMPANG, [0, SIMPANG[1], Z], dash_length=0.14).set_stroke(AKSEN2, 2),
            DashedLine(AKHIR, [0, AKHIR[1], Z], dash_length=0.14).set_stroke(SOROT, 2),
        )
        ruas_c = Line([0, 0, Z], [0, 1, Z]).set_stroke(AKSEN2, 7)
        ruas_d = Line([0, 1, Z], [0, 3, Z]).set_stroke(AKSEN, 7)
        n_c = rumus("1", 30, AKSEN2).move_to([X_LABEL, 0.5, 0])
        n_d = rumus("2", 30, AKSEN).move_to([X_LABEL, 2.0, 0])

        with sinema.babak(self, "hitung", DURASI, kata=KATA) as b:
            b.tunggu_kata("tiga tambah")
            hitung = self.papan.baris(r"3 + 1 = 4", TINTA, b=b)
            b.tunggu_kata("sumbu y")
            self.add(bantu_y, ruas_c, n_c, ruas_d, n_d)
            b.main(ShowCreation(bantu_y), run_time=0.4)
            self.aktif["bantu y"] = bantu_y
            b.main(ShowCreation(ruas_c), FadeIn(n_c), ShowCreation(ruas_d), FadeIn(n_d),
                   run_time=0.45)
            self.aktif["ruas c"] = ruas_c
            self.aktif["ruas d"] = ruas_d
            self.tulisan["angka c"] = n_c
            self.tulisan["angka d"] = n_d
            b.tunggu_kata("satu tambah")
            hitung = sinema.ganti_rumus(self, hitung, r"3 + 1 = 4,\quad 1 + 2 = 3", b=b,
                                        papan=self.papan, warna=TINTA, run_time=0.9)
        self.gerbang()

        # ============ umum: a + b = (a1 + b1  a2 + b2) ==================== #
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bentuk umumnya")
            self.papan_baru(b, lama=0.6)
            b.tunggu_kata("a tambah")
            sinema.lahir_rumus(self, r"\vec{a} + \vec{b} = (a_1 + b_1\ \ \ a_2 + b_2)", pr,
                               self.papan, b=b, warna=SOROT, sebagai_utama=False,
                               ukuran_lahir=44, tahan=1.0, run_time=1.1, geser=UP * 1.2)
            b.tunggu_kata("Yang mendatar")
            self.sorot_pita(b, ruas_a, ruas_b, lama=1.0)
            b.tunggu_kata("yang tegak")
            self.sorot_pita(b, ruas_c, ruas_d, lama=1.0)
        self.gerbang()

        # ============ panjang: jebakannya ================================= #
        bantu = VGroup(bantu_x, bantu_y, ruas_a, ruas_b, ruas_c, ruas_d, n_a, n_b, n_c, n_d)
        # Di BAWAH panah biru: di atasnya label ini jatuh tepat di jalur resultan.
        l_pa = rumus(r"3{,}16", 24, AKSEN2).move_to(ASAL + V1 * 0.5 + np.array([0.2, -0.34, 0.0]))
        l_pb = rumus(r"2{,}24", 24, AKSEN).move_to(SIMPANG + V2 * 0.5 + np.array([0.62, 0.0, 0.0]))
        l_pr = rumus("5", 28, SOROT).move_to(ASAL + (V1 + V2) * 0.5 + np.array([0.35, -0.45, 0.0]))

        with sinema.babak(self, "panjang", DURASI, kata=KATA) as b:
            b.tunggu_kata("hati-hati")
            b.main(FadeOut(bantu), FadeOut(l_sambung), FadeOut(sambung), run_time=0.6)
            self.remove(*bantu, l_sambung, sambung)
            for nama in ("bantu x", "bantu y", "ruas a", "ruas b", "ruas c", "ruas d", "sambung"):
                self.aktif.pop(nama, None)
            for nama in ("angka a", "angka b", "angka c", "angka d", "label sambung"):
                self.tulisan.pop(nama, None)
            b.tunggu_kata("Perjalanan pertama")
            self.add(l_pa)
            b.main(FadeIn(l_pa), run_time=0.5)
            self.tulisan["panjang a"] = l_pa
            b.tunggu_kata("yang kedua")
            self.add(l_pb)
            b.main(FadeIn(l_pb), run_time=0.5)
            self.tulisan["panjang b"] = l_pb
            b.tunggu_kata("Dijumlahkan")
            jebak = self.papan.baris(r"3{,}16 + 2{,}24 = 5{,}4", AKSEN, b=b)
            b.tunggu_kata("resultannya")
            self.add(l_pr)
            b.main(FadeIn(l_pr, scale=1.4), run_time=0.5)
            self.tulisan["panjang r"] = l_pr
            self.sorot_pita(b, pr, lama=0.9)
        self.gerbang()

        # ============ tutup: komponen boleh, panjang tidak ================ #
        baris_boleh = rumus(r"(3\ \ 1) + (1\ \ 2) = (4\ \ 3)", 40, SOROT).move_to([0, 0.9, 0]).fix_in_frame()
        baris_tidak = rumus(r"3{,}16 + 2{,}24 = 5{,}4 \neq 5", 40, AKSEN).move_to([0, -0.7, 0]).fix_in_frame()
        centang = rumus(r"\checkmark", 40, AKSEN2).next_to(baris_boleh, RIGHT, buff=0.4).fix_in_frame()
        coret = Line(baris_tidak.get_left() + np.array([-0.1, -0.12, 0]),
                     baris_tidak.get_right() + np.array([0.1, 0.12, 0])).set_stroke(AKSEN, 4).fix_in_frame()

        semua = Group(bidang, pejalan, pa, pb, pr, titik0, titik1, titik2, koord1, koord2,
                      l_resultan, l_pa, l_pb, l_pr)

        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            # Dunia dibersihkan pada "Komponen boleh", bukan di awal babak: kalau
            # di awal, layar kosong dua detik (cek_layar_kosong).
            b.tunggu_kata("Komponen boleh")
            self.papan_baru(b, lama=0.8, bareng=[FadeOut(semua), FadeOut(ident)])
            self.remove(*semua, ident)
            ident = None
            self.aktif.clear()
            self.tulisan.clear()
            self.hud_ku.clear()
            self.hud_tambah(baris_boleh, centang)
            b.main(FadeIn(baris_boleh, shift=UP * 0.2), run_time=0.8)
            b.main(FadeIn(centang, scale=1.4), run_time=0.4)
            self.hud_ku["baris boleh"] = baris_boleh
            self.hud_ku["centang"] = centang
            b.tunggu_kata("Panjang tidak")
            self.hud_tambah(baris_tidak, coret)
            b.main(FadeIn(baris_tidak, shift=UP * 0.2), run_time=0.7)
            b.main(ShowCreation(coret), run_time=0.5)
            self.hud_ku["baris tidak"] = baris_tidak
            self.hud_ku["coret"] = coret
        self.gerbang()

        # ============ lanjut: jajar genjang =============================== #
        judul_lanjut = teks("Operasi Vektor, Bagian 2", 30, SOROT)
        judul_lanjut.move_to([0, 1.9, 0]).fix_in_frame()
        P = np.array([-1.7, -1.5, 0.0])
        A = np.array([2.6, 0.7, 0.0])
        B = np.array([0.9, 1.7, 0.0])
        j_a = Arrow(P, P + A, buff=0, thickness=5).set_color(AKSEN2).fix_in_frame()
        j_b = Arrow(P, P + B, buff=0, thickness=5).set_color(AKSEN).fix_in_frame()
        j_a2 = DashedLine(P + B, P + B + A, dash_length=0.14).set_stroke(AKSEN2, 3).fix_in_frame()
        j_b2 = DashedLine(P + A, P + A + B, dash_length=0.14).set_stroke(AKSEN, 3).fix_in_frame()
        j_r = Arrow(P, P + A + B, buff=0, thickness=6).set_color(SOROT).fix_in_frame()

        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Operasi Vektor")
            pergi = Group(baris_boleh, centang, baris_tidak, coret)
            self.hud_tambah(judul_lanjut)
            b.main(FadeOut(pergi), FadeIn(judul_lanjut, shift=UP * 0.2), run_time=0.8)
            self.remove(*pergi)
            self.hud_ku.clear()
            self.hud_ku["judul lanjut"] = judul_lanjut
            b.tunggu_kata("bekerja serentak")
            self.hud_tambah(j_a, j_b)
            b.main(GrowArrow(j_a), GrowArrow(j_b), run_time=1.0)
            self.hud_ku["janji a"] = j_a
            self.hud_ku["janji b"] = j_b
            b.tunggu_kata("jajar genjang")
            self.hud_tambah(j_a2, j_b2, j_r)
            b.main(ShowCreation(j_a2), ShowCreation(j_b2), run_time=0.7)
            b.main(GrowArrow(j_r), run_time=0.8)
            self.hud_ku["janji sisi a"] = j_a2
            self.hud_ku["janji sisi b"] = j_b2
            self.hud_ku["janji resultan"] = j_r
        self.gerbang()

        sinema.laporkan_pemicu(self)

    # ================================================================== #
    def langkah(self):
        """Posisi pejalan: berangkat dari asal, dua perjalanan berurutan."""
        return V1 * self.t1.get_value() + V2 * self.t2.get_value()

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
