"""Vektor Materi 01, Angka saja tidak cukup. ManimGL.

Dikembangkan dari `manim/contoh/contoh_perahu.py` (lima babak pertamanya),
bukan ditulis dari nol. Versi Manim Community yang lama sudah ditolak ARYA
karena perahunya digambar sebagai titik; kodenya diarsipkan di
`manim/arsip-manim-ce/`.

STORYBOARD
  1. sapa      Pandangan miring dekat: perahu 3D mengangguk di air hidup,
               dua tepi tanah. Judul pembuka.
  2. terbang   SATU gerakan kamera panjang ke pandangan peta yang sedikit
               dimiringkan (phi 14 derajat, bukan tegak lurus).
  3. dayung    Panah biru dari perahu, 3 km melintang sungai. Rumus di HUD.
  4. arus      Panah merah dari UJUNG panah biru, 4 km ke hilir. Rumus di HUD.
  5. resultan  Panah ungu menutup dari titik berangkat ke ujung merah.
  6. hilir     Perahu benar-benar berlayar menyusuri panah ungu, mendarat 4 km
               di hilir. Angka panjang perpindahan hidup di HUD: 5.
  7. tanya     Pertanyaan, lalu diam. Dunia tetap hidup (air terus beriak).
  8. searah    Dayung diputar 90 ke 0 derajat. Angka merambat 5 ke 7.
  9. lawan     Diputar 0 ke 180 derajat. Angka merambat 7 ke 1.
 10. tegak     Kembali ke 90 derajat. Angka kembali ke 5.
 11. tutup     Kalimat sorot Materi 01, kata per kata, di atas dunia yang hidup.

KENAPA SATU PASANG ANGKA SAJA (3 dan 4)
Contoh rujukan memakai arus 2, sehingga perpindahannya akar 13. Angka itu
memaksa video punya DUA pasang angka: satu untuk cerita sungai, satu lagi untuk
memperlihatkan 7, 1, dan 5. Dengan arus 4, kasus sungainya SENDIRI sudah kasus
tegak lurus yang hasilnya 5, dan memutar arah dayung memberi 7 dan 1 tanpa
mengganti angkanya sama sekali. Satu pasang angka, tiga jawaban: itu inti
Materi 01.

KENAPA PANAH ARUS DIANGKAT SEDIKIT (Z_ARUS)
Pada 0 dan 180 derajat, panah dayung dan panah arus segaris. Kalau digambar
pada ketinggian yang sama, keduanya saling menutupi dan siswa tidak bisa
melihat mana yang menambah dan mana yang mengurangi. Mengangkat panah arus
0,45 satuan tidak mengubah satu pun angka (tinggi tidak ikut dihitung di peta
datar), tetapi membuat ketiga kasus terbaca. Karena itu kameranya dimiringkan
14 derajat, bukan tegak lurus dari atas: kemiringan itulah yang membuat
selisih tinggi terlihat.

WARNA, SATU MAKNA SEPANJANG VIDEO
  AKSEN2 biru = dayung        AKSEN merah = arus
  SOROT ungu  = perpindahan sebenarnya dan kesimpulan
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

# Sungai: x searah aliran (hilir ke kanan), y melintang, z ke atas.
LEBAR, PANJANG = 3.0, 18.0          # lebar 3 km, sesuai naskah
X0, Y0 = -5.0, -LEBAR / 2           # perahu berangkat dari tepi dekat
Z_PANAH = 1.6                       # di atas puncak tiang
Z_ARUS = Z_PANAH + 0.70             # panah arus digambar selapis di atasnya

DAYUNG_KM = 3.0
ARUS_KM = 4.0
V_ARUS = ARUS_KM * RIGHT

# Pandangan peta: sengaja dimiringkan supaya selisih tinggi panah terlihat.
PETA = dict(theta=0, phi=14, pusat=(-2.0, 0.6, 0.0), tinggi=10.0)

# Bingkai babak putaran: dibuat memuat ketiga kasus sekaligus. Ujung terjauh ke
# kiri adalah ujung dayung pada 180 derajat (x = -8), terjauh ke kanan adalah
# ujung resultan pada 0 derajat (x = +2). Nama kedua tepi menjulur sampai x = -9.
#
# MARGINNYA SENGAJA LEBIH LEBAR DARIPADA HITUNGAN, dan ini bukan kemalasan:
# `qc.ke_layar` memproyeksikan tanpa pembagian perspektif, sedangkan kamera
# ManimGL memakai perspektif. Benda yang diangkat mendekat ke kamera (panah arus
# di sini) terlempar lebih jauh ke tepi daripada yang dihitung qc, sehingga qc
# meloloskan bingkai yang ternyata terpotong. Sudah terbukti sekali pada
# tinggi 7,6: pangkal panah arus dan kedua nama tepi tergunting.
# Kemiringannya 26 derajat, bukan 14 seperti babak peta. Pada 0 dan 180 derajat
# ketiga panah segaris, dan pada kemiringan 14 derajat angkat 0,45 satuan belum
# cukup: panah merah tertutup panah biru dan perahu, sehingga ARAHNYA tidak
# terbaca. Untuk video tentang arah, itu kekurangan yang tidak boleh dibiarkan.
PUTARAN = dict(theta=0, phi=26, pusat=(-3.5, 0.1, 0.0), tinggi=8.6)


class PerahuVektor(AdeganMatra):
    def construct(self):
        frame = self.frame

        # ==============================================================
        # Dunia dan besaran hidup
        # ==============================================================
        air = ilustrasi.air_hidup(self, PANJANG, LEBAR)
        tepi_jauh = ilustrasi.tanah(PANJANG, 2.4, LEBAR / 2 + 1.2)
        tepi_dekat = ilustrasi.tanah(PANJANG, 2.4, -LEBAR / 2 - 1.2)

        asli = ilustrasi.perahu(1.6)
        perahu = asli.copy()
        # Letak perahu diikat ke dua pelacak, supaya babak 6 bisa MENGGERAKKAN
        # perahunya, bukan memindahkannya diam-diam.
        self.bx = ValueTracker(X0)
        self.by = ValueTracker(Y0)
        ilustrasi.ayunkan(asli, perahu, X0, Y0, 0.0)
        perahu.add_updater(
            lambda m: ilustrasi.ayunkan(asli, m, self.bx.get_value(), self.by.get_value(), self.time))

        # Arah dayung dalam derajat dari sumbu x positif. 90 = melintang sungai.
        self.th = ValueTracker(90.0)
        self.asal = np.array([X0, Y0, Z_PANAH])

        # ==============================================================
        # Babak 1: dunia nyata dulu, matematikanya belakangan
        # ==============================================================
        kamera.pasang_awal(frame, theta=-32, phi=72,
                           pusat=(X0 + 0.4, Y0 + 0.5, 0.35), tinggi=5.0)
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
        # Babak 2: satu gerakan panjang, dunia ke peta
        # ==============================================================
        n_jauh = teks("tepi seberang", 28).move_to([-8.0, LEBAR / 2 + 1.2, Z_PANAH])
        n_dekat = teks("tepi berangkat", 28).move_to([-8.0, -LEBAR / 2 - 1.2, Z_PANAH])
        with sinema.babak(self, "terbang", DURASI) as b:
            lama = max(2.0, DURASI["terbang"] - 1.6)
            b.main(kamera.sudut(frame, **PETA), run_time=lama)
            b.main(FadeIn(n_jauh), FadeIn(n_dekat), run_time=0.6)
            sinema.keterangan(self, "dilihat dari atas, seperti peta")
            b.catat(0.6)
        qc.periksa_adegan(self, {"perahu": perahu, "tepi jauh": n_jauh, "tepi dekat": n_dekat,
                                 "keterangan": self._matra_keterangan},
                          [("tepi dekat", "keterangan"), ("tepi jauh", "tepi dekat")])

        # ==============================================================
        # Babak 3: panah dayung, digambar hidup supaya bisa diputar nanti
        # ==============================================================
        p_dayung = always_redraw(
            lambda: Arrow(self.asal, self.asal + self.v_dayung(), buff=0, thickness=5).set_color(AKSEN2))
        l_dayung = teks("dayung 3 km", 26, AKSEN2)
        # Digeser TEGAK LURUS terhadap panahnya, bukan selalu ke kiri. Versi
        # pertama memakai geseran tetap ke kiri, dan pada 180 derajat label ini
        # jatuh persis di garis panah arus sampai tercoret merah dan tidak
        # terbaca. Geseran tegak lurus ikut berputar bersama panahnya, jadi ia
        # selalu berada di sisi yang kosong.
        l_dayung.add_updater(
            lambda m: m.move_to(self.asal + self.v_dayung() * 0.55 + 0.8 * self.tegak_dayung()))
        panel_d = rumus(r"\vec{d} = (0,\ 3)", 34, AKSEN2).to_corner(UR, buff=0.45)

        with sinema.babak(self, "dayung", DURASI) as b:
            b.main(GrowArrow(p_dayung), run_time=1.3)
            self.add(l_dayung)
            b.main(FadeIn(l_dayung), run_time=0.6)
            self.hud_tambah(panel_d)
            panel_d.set_opacity(0)
            b.main(panel_d.animate.set_opacity(1), run_time=0.6)
            sinema.keterangan(self, "melintang sungai, sejauh 3 km")
            b.catat(0.6)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"perahu": perahu, "dayung": p_dayung, "label dayung": l_dayung,
                                 "panel d": panel_d, "keterangan": self._matra_keterangan},
                          [("label dayung", "perahu"), ("panel d", "keterangan")])

        # ==============================================================
        # Babak 4: panah arus, berangkat dari UJUNG panah dayung
        # ==============================================================
        p_arus = always_redraw(
            lambda: Arrow(self.ujung_dayung(), self.ujung_arus(), buff=0, thickness=5).set_color(AKSEN))
        l_arus = teks("arus 4 km", 26, AKSEN)
        l_arus.add_updater(lambda m: m.move_to(self.ujung_dayung() + V_ARUS * 0.5 + 0.62 * UP
                                               + np.array([0.0, 0.0, Z_ARUS - Z_PANAH])))
        panel_a = rumus(r"\vec{a} = (4,\ 0)", 34, AKSEN)
        panel_a.next_to(panel_d, DOWN, buff=0.25).align_to(panel_d, RIGHT)

        with sinema.babak(self, "arus", DURASI) as b:
            b.main(GrowArrow(p_arus), run_time=1.3)
            self.add(l_arus)
            b.main(FadeIn(l_arus), run_time=0.6)
            self.hud_tambah(panel_a)
            panel_a.set_opacity(0)
            b.main(panel_a.animate.set_opacity(1), run_time=0.6)
            sinema.keterangan(self, "searah sungai, sejauh 4 km")
            b.catat(0.6)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"dayung": p_dayung, "arus": p_arus, "label dayung": l_dayung,
                                 "label arus": l_arus, "panel d": panel_d, "panel a": panel_a},
                          [("label dayung", "label arus"), ("panel d", "panel a")])

        # ==============================================================
        # Babak 5: resultan menutup segitiganya
        # ==============================================================
        p_res = always_redraw(
            lambda: Arrow(self.asal, self.ujung_arus_datar(), buff=0, thickness=7).set_color(SOROT))
        panel_r = rumus(r"\vec{d} + \vec{a} = (4,\ 3)", 34, SOROT)
        panel_r.next_to(panel_a, DOWN, buff=0.25).align_to(panel_a, RIGHT)

        with sinema.babak(self, "resultan", DURASI) as b:
            b.main(GrowArrow(p_res), run_time=1.6)
            self.hud_tambah(panel_r)
            panel_r.set_opacity(0)
            b.main(panel_r.animate.set_opacity(1), run_time=0.6)
            sinema.keterangan(self, "inilah perpindahan yang sebenarnya", warna=SOROT)
            b.catat(0.6)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"resultan": p_res, "panel d": panel_d, "panel a": panel_a,
                                 "panel r": panel_r, "keterangan": self._matra_keterangan},
                          [("panel a", "panel r"), ("panel r", "keterangan")])

        # ==============================================================
        # Babak 6: perahunya benar-benar berlayar, angkanya hidup
        # ==============================================================
        label_p = teks("panjang perpindahan", 24, SOROT)
        angka_p = sinema.AngkaKoma(5.0, num_decimal_places=2, font_size=38).set_color(SOROT)
        angka_p.add_updater(lambda m: m.set_value(self.panjang_res()))
        satuan = teks("km", 24, SOROT)
        ukur = VGroup(label_p, angka_p, satuan).arrange(RIGHT, buff=0.18)
        ukur.to_corner(UL, buff=0.45)

        mendarat = Dot(radius=0.10).set_color(SOROT)
        mendarat.add_updater(lambda m: m.move_to(self.ujung_arus_datar()))

        with sinema.babak(self, "hilir", DURASI) as b:
            self.hud_tambah(ukur)
            ukur.set_opacity(0)
            b.main(ukur.animate.set_opacity(1), run_time=0.6)
            self.add(mendarat)
            b.main(self.bx.animate.set_value(X0 + ARUS_KM),
                   self.by.animate.set_value(Y0 + DAYUNG_KM), run_time=3.4)
            sinema.keterangan(self, "mendarat 4 km di hilir, menempuh 5 km", warna=SOROT)
            b.catat(0.6)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"ukur": ukur, "panel d": panel_d, "resultan": p_res,
                                 "keterangan": self._matra_keterangan},
                          [("ukur", "panel d"), ("ukur", "keterangan")])

        # ==============================================================
        # Babak 7: pertanyaan, lalu diam. Air tetap beriak, bukan waktu mati.
        # ==============================================================
        with sinema.babak(self, "tanya", DURASI) as b:
            sinema.keterangan(self, "angkanya tetap 3 dan 4, arah dayungnya diputar", warna=SOROT)
            b.catat(0.6)
            # Satu gerakan kamera, dan ia menjawab pertanyaan "apa yang jadi
            # terlihat setelah ini": bingkai PUTARAN memuat ketiga kasus
            # sekaligus. Tanpa ini, pada 180 derajat semua panah berdesakan di
            # sepertiga kiri layar sementara dua pertiga sisanya air kosong.
            b.main(kamera.sudut(frame, **PUTARAN),
                   run_time=max(2.0, DURASI["tanya"] - 2.4))
            b.jeda(1.6)
        qc.periksa_adegan(self, {"ukur": ukur, "keterangan": self._matra_keterangan},
                          [("ukur", "keterangan")])

        # ==============================================================
        # Babak 8 sampai 10: satu pasang angka, tiga jawaban
        #
        # Keterangan ditulis SEBELUM panahnya diputar, bukan sesudah. Versi
        # pertama memutar dulu baru mengganti keterangan, dan akibatnya selama
        # seluruh putaran layar masih menampilkan kalimat babak sebelumnya
        # sementara angka panjangnya sudah berubah. Terlihat di lembar kontak:
        # "searah: 3 tambah 4 memberi 7" terbaca bersamaan dengan angka 1,00.
        # ==============================================================
        with sinema.babak(self, "searah", DURASI) as b:
            # Perahu dikembalikan ke titik berangkat bersamaan dengan panahnya
            # berputar, supaya tidak ada benda yang "hilang lalu muncul".
            sinema.keterangan(self, "searah: 3 tambah 4 memberi 7", warna=SOROT)
            b.catat(0.6)
            b.main(self.th.animate.set_value(0.0),
                   self.bx.animate.set_value(X0), self.by.animate.set_value(Y0),
                   run_time=max(2.0, DURASI["searah"] - 2.4))
            b.jeda(1.0)
        qc.periksa_adegan(self, {"dayung": p_dayung, "arus": p_arus, "ukur": ukur,
                                 "keterangan": self._matra_keterangan},
                          [("ukur", "keterangan")])

        with sinema.babak(self, "lawan", DURASI) as b:
            sinema.keterangan(self, "berlawanan: sisanya tinggal 1", warna=SOROT)
            b.catat(0.6)
            b.main(self.th.animate.set_value(180.0),
                   run_time=max(2.0, DURASI["lawan"] - 2.2))
            b.jeda(1.0)
        qc.periksa_adegan(self, {"dayung": p_dayung, "arus": p_arus, "ukur": ukur,
                                 "keterangan": self._matra_keterangan},
                          [("ukur", "keterangan")])

        with sinema.babak(self, "tegak", DURASI) as b:
            sinema.keterangan(self, "tegak lurus lagi: kembali 5", warna=SOROT)
            b.catat(0.6)
            b.main(self.th.animate.set_value(90.0),
                   run_time=max(2.0, DURASI["tegak"] - 3.0))
            b.jeda(1.4)
        qc.periksa_adegan(self, {"dayung": p_dayung, "arus": p_arus, "resultan": p_res,
                                 "ukur": ukur, "keterangan": self._matra_keterangan},
                          [("ukur", "keterangan")])

        # ==============================================================
        # Babak 11: penutup, dunia tetap terlihat di belakangnya
        # ==============================================================
        tutup1 = teks("Besaran yang butuh arah itulah yang disebut VEKTOR.", 30, TINTA)
        sinema.batasi_lebar(tutup1, 11.0)
        tutup2 = teks("Yang cukup satu angka disebut skalar.", 30, SOROT)
        sinema.batasi_lebar(tutup2, 11.0)
        tutup = VGroup(tutup1, tutup2).arrange(DOWN, buff=0.35).move_to([0, 0.4, 0])
        sinema.alas_teks(tutup)

        with sinema.babak(self, "tutup", DURASI) as b:
            sinema.hapus_keterangan(self, run_time=0.4)
            b.catat(0.4)
            self.hud_tambah(tutup)
            tutup.set_opacity(0)
            b.main(tutup.animate.set_opacity(1), run_time=1.8)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"tutup": tutup, "ukur": ukur}, [("tutup", "ukur")])

    # ==================================================================
    # Besaran turunan, semua dihitung dari satu pelacak sudut
    # ==================================================================
    def v_dayung(self):
        a = self.th.get_value() * DEGREES
        return DAYUNG_KM * np.array([np.cos(a), np.sin(a), 0.0])

    def tegak_dayung(self):
        """Arah tegak lurus panah dayung, menjauh dari panah arus."""
        a = self.th.get_value() * DEGREES
        return np.array([-np.sin(a), np.cos(a), 0.0])

    def ujung_dayung(self):
        """Ujung panah dayung, sudah dinaikkan ke lapis panah arus."""
        return self.asal + self.v_dayung() + np.array([0.0, 0.0, Z_ARUS - Z_PANAH])

    def ujung_arus(self):
        return self.ujung_dayung() + V_ARUS

    def ujung_arus_datar(self):
        """Ujung yang sama, dikembalikan ke lapis panah dayung.

        Resultan digambar di lapis bawah supaya ia menutup segitiga terhadap
        panah dayung, bukan melayang mengikuti panah arus yang sengaja diangkat.
        """
        return self.asal + self.v_dayung() + V_ARUS

    def panjang_res(self):
        return float(np.linalg.norm(self.v_dayung() + V_ARUS))
