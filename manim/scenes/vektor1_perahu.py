"""Vektor Materi 01, Angka saja tidak cukup. ManimGL.

Rancangan arah visual:
`docs/superpowers/specs/2026-09-02-video-vektor-bidang-bernomor.md`.

PRINSIP POKOK
Matematika digambar di bidang datar bernomor, kamera TEGAK LURUS dari atas,
tidak pernah dimiringkan lagi. 3D hanya di babak pembuka. Kamera yang miring
memendekkan satu arah lebih banyak daripada arah lain, sehingga segitiga 3-4-5
tidak lagi terlihat seperti 3-4-5, dan gambarnya membantah hitungannya.

REVISI 2 SEPTEMBER MALAM, tiga catatan ARYA setelah menonton:

1. SUNGAINYA YANG DIPINDAH, BUKAN PERAHUNYA. Dulu sungai membentang y = -1,5
   sampai +1,5 sementara perahu diminta menyeberang dari y = 0 ke y = 3, jadi
   perahunya mendarat di darat. Lebih buruk lagi, selama 3D perahu dipaku di
   tengah sungai lalu berpindah ke titik asal begitu kamera sampai di atas:
   loncat 1,5 petak dalam satu frame, dan itu yang ARYA lihat sebagai
   "perahunya tiba-tiba teleport ke atas".
   Sekarang sungai menempati petak 0 sampai 3 PERSIS. Perahu berangkat dari
   (0, 0) dan tidak pernah dipindahkan paksa, jadi loncatannya hilang dengan
   sendirinya, lebar "3 km" bisa dihitung siswa dari petaknya, dan perahu
   benar-benar mendarat di tepi seberang.

2. PITA BAWAH MILIK SUBTITLE SENDIRIAN. Semua `sinema.keterangan` dibuang.
   Isinya memang mengulang ucapan narator, dan aturan proyek melarang itu.
   Gantinya satu blok tetap di pojok kiri atas sebagai identitas cerita, plus
   satuannya, karena begitu pindah ke 2D satuan km tidak lagi tertulis di mana
   pun.

3. ASAL RUMUS DIPERLIHATKAN DULU. Babak `pythagoras` baru: tanda siku-siku
   muncul, panah arus dirapatkan ke ujung panah dayung supaya segitiganya
   tertutup rapat, lalu akar(4^2 + 3^2) ditulis bertahap sampai jadi 5.

STORYBOARD
   1. sapa        3D miring DEKAT: perahu di air beriak, di tepi dekat.
   2. terbang     Turun ke tegak lurus; air jadi pita biru samar di petak 0-3.
   3. dayung      Panah biru (0, 3) dari titik asal.
   4. arus        Panah merah (4, 0) dari ujung biru.
   5. resultan    Panah ungu dari titik asal, ujungnya diberi koordinat (4, 3).
   6. hilir       Perahu berlayar menyusuri panah ungu. Panjangnya hidup.
   7. pythagoras  Dari mana angka 5 itu.
   8. tanya       Pertanyaan, lalu diam.
   9. searah      Dayung diputar ke 0 derajat. Angka merambat 5 ke 7.
  10. lawan       Diputar ke 180 derajat. Angka merambat 7 ke 1.
  11. tegak       Kembali ke 90 derajat. Angka kembali ke 5.
  12. tutup       Layar bersih, kalimat sorot Materi 01.

GESERAN PANAH ARUS
Pada 0 dan 180 derajat panah dayung dan panah arus segaris. Panah arus digeser
tegak lurus 0,22 satuan supaya keduanya tetap terbaca: di bawah 6 persen dari
panjang panah, tidak mengubah arah yang terbaca, dan tidak mengubah satu pun
angka. Ini pengganti kemiringan kamera yang dulu jadi sebab penolakan.
Geserannya sekarang sebuah ValueTracker, karena pada babak `pythagoras` ia
dinolkan sebentar supaya segitiga siku-sikunya tertutup rapat.

WARNA: biru dayung, merah arus, ungu perpindahan sebenarnya dan kesimpulan.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "vektor1-perahu"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

DAYUNG_KM, ARUS_KM = 3.0, 4.0
V_ARUS = ARUS_KM * RIGHT
GESER_AWAL = 0.22          # pemisah panah arus, lihat catatan di atas
Z = 0.02                   # tepat di atas bidang, supaya tidak beradu gambar

LEBAR_SUNGAI, PANJANG_SUNGAI = 3.0, 18.0
# Sungai menempati petak 0 sampai 3, jadi pusatnya di y = 1,5. Titik asal
# koordinat berada di TEPI DEKAT, tempat perahu berangkat.
Y_SUNGAI = LEBAR_SUNGAI / 2

# Jangkauan dipangkas ke daerah yang BENAR-BENAR dipakai. Ujung terjauh: dayung
# pada 180 derajat di x = -3, ujung arus pada 0 derajat di x = 7, dayung pada
# 90 derajat di y = 3. Batas bawah -1: baris y = -2 tidak pernah dipakai, dan
# angka "-2" di situ jatuh di pita subtitle.
BIDANG_X, BIDANG_Y = (-4.0, 8.0, 1.0), (-1.0, 4.0, 1.0)
PETA = dict(theta=0, phi=0, pusat=(2.0, 1.5, 0.0), tinggi=7.6)


class PerahuVektor(AdeganMatra):
    def construct(self):
        frame = self.frame

        # ==============================================================
        # Babak 1: dunia nyata, 3D, dari dekat
        # ==============================================================
        air = ilustrasi.air_hidup(self, PANJANG_SUNGAI, LEBAR_SUNGAI,
                                  pusat=(0.0, Y_SUNGAI))
        tepi_jauh = ilustrasi.tanah(PANJANG_SUNGAI, 2.4, LEBAR_SUNGAI + 1.2)
        tepi_dekat = ilustrasi.tanah(PANJANG_SUNGAI, 2.4, -1.2)

        asli = ilustrasi.perahu(0.9)
        perahu = asli.copy()
        self.bx = ValueTracker(0.0)
        self.by = ValueTracker(0.0)
        # Perahunya TIDAK PERNAH dipindahkan paksa: posisinya selalu dibaca dari
        # dua tracker yang sama, sebelum maupun sesudah kamera turun. Yang
        # dimatikan hanya ayunan ombaknya, karena setelah jadi peta tidak ada
        # lagi permukaan air yang bergoyang.
        self.di_air = True
        ilustrasi.ayunkan(asli, perahu, 0.0, 0.0, 0.0)
        perahu.add_updater(lambda m: ilustrasi.ayunkan(
            asli, m, self.bx.get_value(), self.by.get_value(),
            self.time if self.di_air else 0.0))

        self.th = ValueTracker(90.0)
        self.geser = ValueTracker(GESER_AWAL)

        kamera.pasang_awal(frame, theta=-34, phi=70,
                           pusat=(0.4, 0.7, 0.35), tinggi=4.6)
        self.add(tepi_jauh, tepi_dekat, air, perahu)
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Angka saja tidak cukup", lama=3.2, y=2.4)
            b.catat(3.2)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"perahu": perahu})

        # ==============================================================
        # Babak 2: turun ke tegak lurus, dunia jadi peta bernomor
        # ==============================================================
        # Pita biru samar menggantikan air 3D. Ia menempati petak 0 sampai 3
        # persis, jadi lebar sungai tetap terbaca sepanjang video dan siswa bisa
        # memeriksanya dengan menghitung petak.
        # Kepekatannya diatur lewat `set_fill`, BUKAN `set_opacity`. `set_opacity(1)`
        # menimpa kepekatan isian yang sudah disetel, dan render pertama keluar
        # dengan pita biru PEKAT yang menelan petak, angka sumbu, dan panah
        # birunya sendiri.
        PEKAT_PITA = 0.09
        pita = Rectangle(width=BIDANG_X[1] - BIDANG_X[0], height=LEBAR_SUNGAI)
        pita.set_stroke(width=0).set_fill(AKSEN2, 0.0)
        pita.move_to([(BIDANG_X[0] + BIDANG_X[1]) / 2, Y_SUNGAI, -0.02])
        bidang = ilustrasi.bidang_bernomor(BIDANG_X, BIDANG_Y)
        bidang.set_opacity(0)
        self.add(pita, bidang)
        self.bring_to_front(perahu)
        dunia3d = Group(air, tepi_jauh, tepi_dekat)

        identitas = VGroup(
            teks("sungai = 3 km", 23, REDUP),
            teks("1 petak = 1 km", 23, REDUP),
        ).arrange(DOWN, buff=0.14, aligned_edge=LEFT).to_corner(UL, buff=0.42)

        with sinema.babak(self, "terbang", DURASI) as b:
            lama = max(2.0, DURASI["terbang"] - 3.0)
            b.main(kamera.sudut(frame, **PETA), run_time=lama)
            self.di_air = False
            b.main(FadeOut(dunia3d), bidang.animate.set_opacity(1),
                   pita.animate.set_fill(AKSEN2, PEKAT_PITA), run_time=1.4)
            self.hud_tambah(identitas)
            identitas.set_opacity(0)
            b.main(identitas.animate.set_opacity(1), run_time=0.8)
        qc.periksa_adegan(self, {"bidang": bidang, "identitas": identitas})

        # ==============================================================
        # Babak 3: panah dayung
        # ==============================================================
        asal = np.array([0.0, 0.0, Z])
        p_dayung = always_redraw(
            lambda: Arrow(asal, asal + self.v_dayung(), buff=0, thickness=5).set_color(AKSEN2))
        l_dayung = teks("dayung", 26, AKSEN2)
        l_dayung.add_updater(lambda m: m.move_to(
            asal + self.v_dayung() * 0.5 + 1.3 * self.tegak_dayung()))
        panel_d = rumus(r"\vec{d} = (0,\ 3)", 34, AKSEN2).to_corner(UR, buff=0.45)

        with sinema.babak(self, "dayung", DURASI) as b:
            b.main(GrowArrow(p_dayung), run_time=1.4)
            self.add(l_dayung)
            b.main(FadeIn(l_dayung), run_time=0.5)
            self.hud_tambah(panel_d)
            panel_d.set_opacity(0)
            b.main(panel_d.animate.set_opacity(1), run_time=0.6)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"dayung": p_dayung, "label d": l_dayung,
                                 "panel d": panel_d, "identitas": identitas},
                          [("panel d", "identitas")])

        # ==============================================================
        # Babak 4: panah arus, dari ujung panah dayung
        # ==============================================================
        p_arus = always_redraw(
            lambda: Arrow(self.ujung_dayung(), self.ujung_arus(), buff=0,
                          thickness=5).set_color(AKSEN))
        l_arus = teks("arus", 26, AKSEN)
        l_arus.add_updater(lambda m: m.move_to(self.ujung_dayung() + V_ARUS * 0.5 + 0.55 * UP))
        panel_a = rumus(r"\vec{a} = (4,\ 0)", 34, AKSEN)
        panel_a.next_to(panel_d, DOWN, buff=0.25).align_to(panel_d, RIGHT)

        with sinema.babak(self, "arus", DURASI) as b:
            b.main(GrowArrow(p_arus), run_time=1.4)
            self.add(l_arus)
            b.main(FadeIn(l_arus), run_time=0.5)
            self.hud_tambah(panel_a)
            panel_a.set_opacity(0)
            b.main(panel_a.animate.set_opacity(1), run_time=0.6)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"dayung": p_dayung, "arus": p_arus, "label d": l_dayung,
                                 "label a": l_arus, "panel d": panel_d, "panel a": panel_a},
                          [("label d", "label a"), ("panel d", "panel a")])

        # ==============================================================
        # Babak 5: resultan, koordinat ujungnya ditulis di bidang
        # ==============================================================
        p_res = always_redraw(
            lambda: Arrow(asal, self.ujung_res(), buff=0, thickness=7).set_color(SOROT))
        titik_ujung = Dot(radius=0.09).set_color(SOROT)
        titik_ujung.add_updater(lambda m: m.move_to(self.ujung_res()))
        l_koord = always_redraw(lambda: rumus(
            r"(%d,\ %d)" % (round(self.v_dayung()[0] + ARUS_KM), round(self.v_dayung()[1])),
            30, SOROT).move_to(self.ujung_res() + np.array([0.9, 0.45, 0.0])))
        panel_r = rumus(r"\vec{d} + \vec{a} = (4,\ 3)", 34, SOROT)
        panel_r.next_to(panel_a, DOWN, buff=0.25).align_to(panel_a, RIGHT)

        with sinema.babak(self, "resultan", DURASI) as b:
            b.main(GrowArrow(p_res), run_time=1.8)
            self.add(titik_ujung, l_koord)
            b.main(FadeIn(titik_ujung, scale=2.0), FadeIn(l_koord), run_time=0.7)
            self.hud_tambah(panel_r)
            panel_r.set_opacity(0)
            b.main(panel_r.animate.set_opacity(1), run_time=0.6)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"resultan": p_res, "koordinat": l_koord, "panel r": panel_r,
                                 "panel a": panel_a},
                          [("panel a", "panel r")])

        # ==============================================================
        # Babak 6: perahunya berlayar, panjangnya hidup
        # ==============================================================
        label_p = teks("panjang perpindahan", 24, SOROT)
        angka_p = sinema.AngkaKoma(5.0, num_decimal_places=2, font_size=38).set_color(SOROT)
        angka_p.add_updater(lambda m: m.set_value(self.panjang_res()))
        ukur = VGroup(label_p, angka_p).arrange(RIGHT, buff=0.20)
        ukur.next_to(identitas, DOWN, buff=0.34).align_to(identitas, LEFT)

        with sinema.babak(self, "hilir", DURASI) as b:
            self.hud_tambah(ukur)
            ukur.set_opacity(0)
            b.main(ukur.animate.set_opacity(1), run_time=0.6)
            b.main(self.bx.animate.set_value(ARUS_KM),
                   self.by.animate.set_value(DAYUNG_KM), run_time=3.4)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"ukur": ukur, "identitas": identitas, "resultan": p_res},
                          [("ukur", "identitas")])

        # ==============================================================
        # Babak 7: dari mana angka 5 itu
        # ==============================================================
        # Geseran panah arus dinolkan dulu supaya segitiga siku-sikunya tertutup
        # rapat. Kalau tidak, sisi mendatarnya tergambar 0,22 petak di atas
        # ujung panah dayung, dan siswa yang teliti akan melihat segitiga yang
        # tidak benar-benar tertutup.
        s = 0.30
        pojok = np.array([0.0, DAYUNG_KM, Z])
        siku = VGroup(
            Line(pojok + s * RIGHT, pojok + s * RIGHT + s * DOWN),
            Line(pojok + s * DOWN, pojok + s * RIGHT + s * DOWN),
        ).set_stroke(TINTA, 2.6)
        # Uraiannya ditulis sebagai TIGA BARIS yang muncul berurutan, bukan satu
        # baris yang di-`Transform` berkali-kali. Dua alasan. Pertama, tiap
        # langkah punya jumlah lambang berbeda, dan `Transform` meninggalkan
        # lambang sisa di posisi liar: render pertama gagal di gerbang dengan
        # "langkah keluar bingkai: kiri -9.15". Kedua, langkah yang tetap
        # terlihat justru lebih baik untuk diajarkan, siswa bisa menoleh ke
        # baris sebelumnya.
        uraian = VGroup(
            rumus(r"\sqrt{4^2 + 3^2}", 28, SOROT),
            rumus(r"= \sqrt{16 + 9} = \sqrt{25}", 28, SOROT),
            rumus(r"= 5", 28, SOROT),
        ).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        uraian.next_to(ukur, DOWN, buff=0.30).align_to(ukur, LEFT)

        with sinema.babak(self, "pythagoras", DURASI) as b:
            b.main(self.geser.animate.set_value(0.0), run_time=0.6)
            b.main(ShowCreation(siku), run_time=0.6)
        # `Indicate` bawaan ManimGL berkedip KUNING (#FFFF00), warna yang tidak ada
        # di palet MATRA dan terlihat seperti kerusakan gambar. Warnanya diganti
        # warna palet, dan `scale_factor` dibuat 1.0: membesarkan panah walau
        # sekejap membuat ujungnya melewati petaknya sendiri, dan di bidang
        # bernomor itu berarti gambar membantah angkanya.
            b.main(Indicate(p_dayung, scale_factor=1.0, color=SOROT),
                   Indicate(p_arus, scale_factor=1.0, color=SOROT), run_time=1.0)
            self.hud_tambah(uraian)
            uraian.set_opacity(0)
            for baris in uraian:
                b.main(baris.animate.set_opacity(1), run_time=0.8)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"uraian": uraian, "ukur": ukur, "identitas": identitas,
                                 "panel d": panel_d, "label d": l_dayung},
                          [("uraian", "ukur"), ("uraian", "panel d"), ("uraian", "label d")])

        # ==============================================================
        # Babak 8 sampai 11: satu pasang angka, tiga jawaban
        # ==============================================================
        with sinema.babak(self, "tanya", DURASI) as b:
            # Segitiga siku-siku dan uraiannya disingkirkan: mulai sekarang
            # dayungnya diputar, jadi sudutnya tidak siku-siku lagi dan tanda
            # itu akan berbohong. Geserannya dikembalikan supaya panah yang
            # segaris tetap terbaca.
            b.main(FadeOut(siku), FadeOut(uraian),
                   self.geser.animate.set_value(GESER_AWAL), run_time=0.8)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"ukur": ukur, "identitas": identitas})

        for nama, sudut in (("searah", 0.0), ("lawan", 180.0), ("tegak", 90.0)):
            with sinema.babak(self, nama, DURASI) as b:
                gerak = [self.th.animate.set_value(sudut)]
                if nama == "searah":
                    gerak += [self.bx.animate.set_value(0.0), self.by.animate.set_value(0.0)]
                b.main(*gerak, run_time=max(2.0, DURASI[nama] - 1.4))
                b.jeda(1.0)
            qc.periksa_adegan(self, {"dayung": p_dayung, "arus": p_arus, "ukur": ukur,
                                     "koordinat": l_koord})

        # ==============================================================
        # Babak 12: layar bersih, kalimat sorot
        # ==============================================================
        tutup1 = teks("Besaran yang butuh arah itulah yang disebut VEKTOR.", 32, TINTA)
        sinema.batasi_lebar(tutup1, 11.4)
        tutup2 = teks("Yang cukup satu angka disebut skalar.", 32, SOROT)
        sinema.batasi_lebar(tutup2, 11.4)
        tutup = VGroup(tutup1, tutup2).arrange(DOWN, buff=0.34).move_to([0, 0.3, 0])

        # Dunianya disingkirkan lebih dulu. Alas teks TIDAK cukup: benda dunia
        # tetap tergambar di atas teks HUD. Aturan 4 STANDAR-ILUSTRASI-VIDEO
        # mengizinkan layar bersih untuk penutup, paling banyak satu babak.
        semua = Group(bidang, pita, perahu, p_dayung, p_arus, p_res, l_dayung, l_arus,
                      titik_ujung, l_koord)
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(semua), FadeOut(ukur), FadeOut(identitas),
                   FadeOut(panel_d), FadeOut(panel_a), FadeOut(panel_r), run_time=1.4)
            self.hud_tambah(tutup)
            tutup.set_opacity(0)
            b.main(tutup.animate.set_opacity(1), run_time=1.8)
            b.jeda(1.4)
        qc.periksa_adegan(self, {"tutup": tutup})

    # ==================================================================
    def v_dayung(self):
        a = self.th.get_value() * DEGREES
        return DAYUNG_KM * np.array([np.cos(a), np.sin(a), 0.0])

    def tegak_dayung(self):
        a = self.th.get_value() * DEGREES
        return np.array([-np.sin(a), np.cos(a), 0.0])

    def ujung_dayung(self):
        """Ujung panah dayung, sudah digeser ke jalur panah arus."""
        return np.array([0.0, 0.0, Z]) + self.v_dayung() + self.geser.get_value() * UP

    def ujung_arus(self):
        return self.ujung_dayung() + V_ARUS

    def ujung_res(self):
        """Ujung resultan, di jalur yang SEBENARNYA, tanpa geseran."""
        return np.array([0.0, 0.0, Z]) + self.v_dayung() + V_ARUS

    def panjang_res(self):
        return float(np.linalg.norm(self.v_dayung() + V_ARUS))
