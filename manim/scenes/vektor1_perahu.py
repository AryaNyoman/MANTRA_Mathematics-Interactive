"""Vektor Materi 01, Angka saja tidak cukup. ManimGL, arah visual BARU.

Ditulis ulang 2 Sep sore setelah ARYA menolak versi 3D penuh. Rancangannya:
`docs/superpowers/specs/2026-09-02-video-vektor-bidang-bernomor.md`.

PRINSIP POKOK
Matematika digambar di bidang datar bernomor, kamera TEGAK LURUS dari atas,
tidak pernah dimiringkan lagi. 3D hanya di babak pembuka.

Versi sebelumnya memiringkan kamera 14 sampai 26 derajat supaya panah yang
segaris tidak saling menutupi. Akibatnya perspektif memendekkan satu arah lebih
banyak daripada arah lain, sehingga segitiga 3-4-5 TIDAK terlihat seperti
3-4-5. Untuk pelajaran vektor itu fatal: gambarnya membantah hitungannya.

STORYBOARD
  1. sapa      3D miring DEKAT: perahu di air beriak. Judul, dan narasinya
               mengumumkan materinya.
  2. terbang   Satu gerakan turun ke tegak lurus; air dan tepi memudar,
               bidang koordinat bernomor muncul menggantikannya.
  3. dayung    Panah biru (0, 3) dari titik asal.
  4. arus      Panah merah (4, 0) dari ujung biru.
  5. resultan  Panah ungu dari titik asal, ujungnya diberi koordinat (4, 3).
  6. hilir     Perahu berlayar menyusuri panah ungu. Panjangnya hidup: 5.
  7. tanya     Pertanyaan, lalu diam.
  8. searah    Dayung diputar ke 0 derajat. Angka merambat 5 ke 7.
  9. lawan     Diputar ke 180 derajat. Angka merambat 7 ke 1.
 10. tegak     Kembali ke 90 derajat. Angka kembali ke 5.
 11. tutup     Layar bersih, kalimat sorot Materi 01 kata per kata.

TITIK ASAL PERAHU = (0, 0) BIDANG
Disengaja. Dengan begitu koordinat di layar SAMA dengan komponen vektornya:
ujung panah ungu benar-benar berada di petak (4, 3). Kalau perahunya ditaruh di
tempat lain, siswa harus mengurangi dulu sebelum bisa memeriksa, dan seluruh
gunanya bidang bernomor hilang.

GESERAN PANAH ARUS
Pada 0 dan 180 derajat panah dayung dan panah arus segaris. Panah arus digeser
0,22 satuan ke atas supaya keduanya tetap terbaca. Pada panah sepanjang 3 sampai
4 satuan itu di bawah 6 persen, tidak mengubah arah yang terbaca, dan tidak
mengubah satu pun angka. Ini pengganti kemiringan kamera yang dulu dipakai.

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
GESER = 0.22 * UP          # pemisah panah arus, lihat catatan di atas
Z = 0.02                   # tepat di atas bidang, supaya tidak beradu gambar

LEBAR_SUNGAI, PANJANG_SUNGAI = 3.0, 18.0
Y_SUNGAI = -LEBAR_SUNGAI / 2

# Jangkauan dipangkas ke daerah yang BENAR-BENAR dipakai. Versi pertama memakai
# x dari -5 sampai 8 dan y dari -4 sampai 4, dan seperempat bidangnya tidak
# pernah tersentuh sehingga panahnya terlihat kecil. Ujung terjauh: dayung pada
# 180 derajat di x = -3, ujung arus pada 0 derajat di x = 7, dayung pada
# 90 derajat di y = 3.
# Batas bawah dinaikkan ke -1: baris y = -2 tidak pernah dipakai panah mana pun,
# dan angka "-2" di situ jatuh persis di jalur keterangan layar sehingga
# keduanya bertindih. Terlihat di lembar kontak render sebelumnya.
BIDANG_X, BIDANG_Y = (-4.0, 8.0, 1.0), (-1.0, 4.0, 1.0)
PETA = dict(theta=0, phi=0, pusat=(2.0, 1.5, 0.0), tinggi=7.6)


class PerahuVektor(AdeganMatra):
    def construct(self):
        frame = self.frame

        # ==============================================================
        # Babak 1: dunia nyata, 3D, dari dekat
        # ==============================================================
        air = ilustrasi.air_hidup(self, PANJANG_SUNGAI, LEBAR_SUNGAI)
        tepi_jauh = ilustrasi.tanah(PANJANG_SUNGAI, 2.4, LEBAR_SUNGAI / 2 + 1.2)
        tepi_dekat = ilustrasi.tanah(PANJANG_SUNGAI, 2.4, -LEBAR_SUNGAI / 2 - 1.2)

        asli = ilustrasi.perahu(0.9)
        perahu = asli.copy()
        self.bx = ValueTracker(0.0)
        self.by = ValueTracker(0.0)
        # Sebelum babak 2 perahu mengikuti permukaan air; sesudahnya ia berada
        # di atas bidang datar, jadi ayunannya dimatikan.
        self.di_air = True
        ilustrasi.ayunkan(asli, perahu, 0.0, Y_SUNGAI, 0.0)
        perahu.add_updater(lambda m: ilustrasi.ayunkan(
            asli, m, self.bx.get_value(),
            Y_SUNGAI if self.di_air else self.by.get_value(),
            self.time if self.di_air else 0.0))

        self.th = ValueTracker(90.0)

        kamera.pasang_awal(frame, theta=-34, phi=70, pusat=(0.4, Y_SUNGAI + 0.4, 0.35), tinggi=4.6)
        self.add(tepi_jauh, tepi_dekat, air, perahu)
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Angka saja tidak cukup", lama=3.2, y=2.4)
            b.catat(3.2)
            sinema.keterangan(self, "sungai selebar 3 km, kita mau menyeberang")
            b.catat(0.6)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"perahu": perahu, "keterangan": self._matra_keterangan},
                          [("perahu", "keterangan")])

        # ==============================================================
        # Babak 2: turun ke tegak lurus, dunia jadi peta bernomor
        # ==============================================================
        bidang = ilustrasi.bidang_bernomor(BIDANG_X, BIDANG_Y)
        bidang.set_opacity(0)
        self.add(bidang)
        dunia3d = Group(air, tepi_jauh, tepi_dekat)

        with sinema.babak(self, "terbang", DURASI) as b:
            lama = max(2.0, DURASI["terbang"] - 2.2)
            b.main(kamera.sudut(frame, **PETA), run_time=lama)
            self.di_air = False
            b.main(FadeOut(dunia3d), bidang.animate.set_opacity(1), run_time=1.4)
            sinema.keterangan(self, "sekarang kita ukur di petak koordinat")
            b.catat(0.6)
        qc.periksa_adegan(self, {"bidang": bidang, "keterangan": self._matra_keterangan})

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
            sinema.keterangan(self, "naik 3 petak, tidak bergeser ke samping")
            b.catat(0.6)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"dayung": p_dayung, "label d": l_dayung, "panel d": panel_d,
                                 "keterangan": self._matra_keterangan},
                          [("panel d", "keterangan")])

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
            sinema.keterangan(self, "bergeser 4 petak ke kanan, tidak naik")
            b.catat(0.6)
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
            sinema.keterangan(self, "inilah perpindahan yang sebenarnya", warna=SOROT)
            b.catat(0.6)
        qc.periksa_adegan(self, {"resultan": p_res, "koordinat": l_koord, "panel r": panel_r,
                                 "panel a": panel_a},
                          [("panel a", "panel r")])

        # ==============================================================
        # Babak 6: perahunya berlayar, panjangnya hidup
        # ==============================================================
        label_p = teks("panjang perpindahan", 24, SOROT)
        angka_p = sinema.AngkaKoma(5.0, num_decimal_places=2, font_size=38).set_color(SOROT)
        angka_p.add_updater(lambda m: m.set_value(self.panjang_res()))
        ukur = VGroup(label_p, angka_p).arrange(RIGHT, buff=0.20).to_corner(UL, buff=0.45)

        with sinema.babak(self, "hilir", DURASI) as b:
            self.hud_tambah(ukur)
            ukur.set_opacity(0)
            b.main(ukur.animate.set_opacity(1), run_time=0.6)
            b.main(self.bx.animate.set_value(ARUS_KM),
                   self.by.animate.set_value(DAYUNG_KM), run_time=3.6)
            sinema.keterangan(self, "mendarat 4 petak di hilir, menempuh 5", warna=SOROT)
            b.catat(0.6)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"ukur": ukur, "panel d": panel_d, "resultan": p_res},
                          [("ukur", "panel d")])

        # ==============================================================
        # Babak 7 sampai 10: satu pasang angka, tiga jawaban
        # ==============================================================
        with sinema.babak(self, "tanya", DURASI) as b:
            sinema.keterangan(self, "angkanya tetap 3 dan 4, arah dayungnya diputar", warna=SOROT)
            b.catat(0.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"ukur": ukur, "keterangan": self._matra_keterangan})

        for nama, sudut, kalimat in (
            ("searah", 0.0, "searah: 3 tambah 4 memberi 7"),
            ("lawan", 180.0, "berlawanan: sisanya tinggal 1"),
            ("tegak", 90.0, "tegak lurus lagi: kembali 5"),
        ):
            with sinema.babak(self, nama, DURASI) as b:
                # Keterangan mendahului putarannya. Kalau menyusul, selama
                # seluruh putaran layar masih menampilkan kalimat babak
                # sebelumnya sementara angkanya sudah berubah.
                sinema.keterangan(self, kalimat, warna=SOROT)
                b.catat(0.6)
                gerak = [self.th.animate.set_value(sudut)]
                if nama == "searah":
                    gerak += [self.bx.animate.set_value(0.0), self.by.animate.set_value(0.0)]
                b.main(*gerak, run_time=max(2.0, DURASI[nama] - 2.6))
                b.jeda(1.0)
            qc.periksa_adegan(self, {"dayung": p_dayung, "arus": p_arus, "ukur": ukur,
                                     "koordinat": l_koord})

        # ==============================================================
        # Babak 11: layar bersih, kalimat sorot
        # ==============================================================
        tutup1 = teks("Besaran yang butuh arah itulah yang disebut VEKTOR.", 32, TINTA)
        sinema.batasi_lebar(tutup1, 11.4)
        tutup2 = teks("Yang cukup satu angka disebut skalar.", 32, SOROT)
        sinema.batasi_lebar(tutup2, 11.4)
        tutup = VGroup(tutup1, tutup2).arrange(DOWN, buff=0.34).move_to([0, 0.3, 0])

        # Dunianya disingkirkan lebih dulu. Alas teks TIDAK cukup: benda dunia
        # tetap tergambar di atas teks HUD. Aturan 4 STANDAR-ILUSTRASI-VIDEO
        # mengizinkan layar bersih untuk penutup, paling banyak satu babak.
        semua = Group(bidang, perahu, p_dayung, p_arus, p_res, l_dayung, l_arus,
                      titik_ujung, l_koord)
        with sinema.babak(self, "tutup", DURASI) as b:
            sinema.hapus_keterangan(self, run_time=0.4)
            b.catat(0.4)
            b.main(FadeOut(semua), FadeOut(ukur),
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
        return np.array([0.0, 0.0, Z]) + self.v_dayung() + GESER

    def ujung_arus(self):
        return self.ujung_dayung() + V_ARUS

    def ujung_res(self):
        """Ujung resultan, di jalur yang SEBENARNYA, tanpa geseran."""
        return np.array([0.0, 0.0, Z]) + self.v_dayung() + V_ARUS

    def panjang_res(self):
        return float(np.linalg.norm(self.v_dayung() + V_ARUS))
