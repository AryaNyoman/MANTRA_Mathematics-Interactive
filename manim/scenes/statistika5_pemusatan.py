"""Tahap 5 Statistika: mean, median, modus lewat jungkat-jungkit (ManimGL).

Storyboard: docs/superpowers/specs/2026-09-02-statistika-video-5-storyboard.md
Naskah    : manim/narasi/statistika5-pemusatan.json (11 segmen, 123 detik)

Yang dibuktikan gambar, bukan diberitahu: rata-rata adalah titik tempat data
seimbang. Karena itu rumus mean baru muncul di babak kesepuluh, setelah papannya
mendatar sendiri di angka tujuh.

Satu warna satu makna sepanjang video:
    AKSEN2 biru = data (delapan siswa)      AKSEN bata = mean (papan, tumpuan)
    SOROT ungu  = median (sekat)            TINTA/REDUP = lantai dan angka bantu
Modus TIDAK diberi warna. Ia ditandai bentuk: nilai yang sama berdiri berjajar
ke belakang, jadi barisan 7 dan 8 terlihat paling tebal. Dengan begitu tiga
warna cukup untuk tiga peran.

REVISI 2 Sep 2026, setelah lembar kontak render pertama DIBUKA dan dinilai:
- kamera tinggi 8,4 dan isinya cuma memenuhi sepertiga tengah bingkai;
- panah simpangan melayang di z 2,25 tanpa apa pun yang menghubungkannya ke
  siswa, jadi terbaca sebagai garis merah yang entah milik siapa;
- label "modus 7 dan 8" menabrak angka 7, 8, dan 9 di lantai;
- lantai `tanah` sempit sehingga tepinya terlihat dan terbaca sebagai meja;
- separuh tiap babak diam tanpa animasi karena narasinya lebih panjang.
Kelimanya diperbaiki di berkas ini.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "statistika5-pemusatan"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

# --- Data. Sudah lolos dua pemeriksa sebagai `t05-ulangan` di situs.
NILAI = [4, 5, 6, 7, 7, 8, 8, 11]
MEAN = 7.0                      # 56 : 8
MEDIAN = 7.0                    # rata-rata data ke-4 dan ke-5, dua-duanya 7


def xw(nilai):
    """Satu satuan dunia = satu nilai; nilai 7 duduk di x = 0."""
    return nilai - MEAN


TINGGI_TUMPU = 0.55             # tinggi puncak penopang
TEBAL_PAPAN = 0.16
Z_ATAS_PAPAN = TINGGI_TUMPU + TEBAL_PAPAN
TINGGI_ORANG = 1.0
Z_KEPALA = Z_ATAS_PAPAN + TINGGI_ORANG
PAPAN_PUSAT = 0.5               # papan sedikit ke kanan, mengikuti sebaran data
PAPAN_PANJANG = 9.0
Y_ANGKA = -1.15                 # angka lantai tepat di depan tepi papan.
#   Pada render kedua angka ini masih di y -1,75, dan karena kamera memandang
#   agak dari atas, angka yang lebih dekat ke kamera tergeser ke tepi: siswa
#   bernilai 11 terlihat berdiri di atas angka 10. Didekatkan supaya siswa dan
#   angkanya segaris.
Z_PANAH = 1.95                  # tepat di atas kepala, cukup dekat untuk terbaca satu kesatuan


def geser_y(nilai_list):
    """Yang nilainya kembar berdiri berjajar ke belakang: itulah tanda modus."""
    hasil, dipakai = [], {}
    banyak = {v: nilai_list.count(v) for v in nilai_list}
    for v in nilai_list:
        k = dipakai.get(v, 0)
        dipakai[v] = k + 1
        hasil.append(0.0 if banyak[v] == 1 else (-0.40 + 0.80 * k))
    return hasil


Y_ORANG = geser_y(NILAI)


def torsi(tumpu):
    """Jumlah simpangan tiap nilai terhadap letak tumpuan. Nol berarti seimbang."""
    return sum(v - tumpu for v in NILAI)


def miring(tumpu):
    """Sudut papan dalam derajat. Putaran positif terhadap UP menurunkan ujung kanan."""
    return float(np.clip(torsi(tumpu), -8.0, 8.0))


def tegak(mob):
    """Berdirikan teks di bidang xz supaya terbaca dari kamera yang hampir sejajar tanah."""
    return mob.rotate(90 * DEGREES, RIGHT)


class Pemusatan5(AdeganMatra):
    def construct(self):
        frame = self.frame

        # ------------------------------------------------------------------
        # Dunia: lantai, garis bilangan, delapan siswa yang bernapas.
        # ------------------------------------------------------------------
        # Lantai memakai `tanah`, bukan `lantai_kisi`: `lantai_kisi` dengan
        # tinggi_z = 0 membuat ThreeDAxes membagi nol dan render mati (exit
        # code-nya tetap 0), sedangkan dengan tinggi_z positif sumbu tegaknya
        # berdiri tepat di angka 7 lalu menembus papan. Sengaja dibuat SANGAT
        # lebar supaya tepinya di luar bingkai; lantai bertepi terbaca sebagai meja.
        lantai = ilustrasi.tanah(panjang=30.0, lebar=18.0, y_tengah=2.0, z=0.0)

        # Garis bilangan dibuat sebagai balok TIPIS, bukan garis, sebab di babak
        # keenam ia berubah jadi papan jungkat-jungkit. Benda yang sama berubah
        # bentuk lebih mudah diikuti mata daripada benda yang hilang lalu muncul.
        papan = ilustrasi.balok(PAPAN_PANJANG, 1.5, 0.06, REDUP).shift(RIGHT * PAPAN_PUSAT)

        angka_lantai = VGroup()
        for v in range(4, 12):
            # Warna TINTA, bukan REDUP: pada babak awal angka ini berdiri di depan
            # garis bilangan yang juga REDUP, dan abu di atas abu nyaris tak terbaca.
            # z rendah supaya angka 7 tidak tenggelam di balik siluet penopang.
            a = tegak(rumus(str(v), 26, TINTA))
            a.move_to([xw(v), Y_ANGKA, 0.08])
            angka_lantai.add(a)

        # Siswa MULAI berkerumun di samping garis bilangan, belum di angkanya.
        # Babak 2 barulah mereka berjalan ke tempatnya. Kalau mereka sudah berdiri
        # rapi sejak awal, narasi "mari mereka berdiri di garis bilangan" membantah
        # gambarnya sendiri, dan itu cacat yang paling merusak menurut CLAUDE.md.
        siswa = Group()
        for i, (v, dy) in enumerate(zip(NILAI, Y_ORANG)):
            o = ilustrasi.orang(TINGGI_ORANG, AKSEN2)
            o.tujuan = np.array([xw(v), dy, 0.06])
            o.shift([-1.25 + 0.36 * i, 2.10 + 0.30 * (i % 2), 0.06])
            o.fase = 1.7 * i
            o.z_lalu = 0.0
            siswa.add(o)

        # Napas dipasang sebagai GESERAN SELISIH, bukan penempatan mutlak, supaya
        # ia tetap benar setelah papannya diputar. Penempatan mutlak akan membatalkan
        # putaran papan pada frame berikutnya.
        def napas(m):
            z = 0.03 * np.sin(1.6 * self.time + m.fase)
            m.shift(OUT * (z - m.z_lalu))
            m.z_lalu = z

        for o in siswa:
            o.add_updater(napas)

        # ------------------------------------------------------------------
        # Babak 1: pandangan dunia, miring dan dekat. Dunia dibangun di depan mata,
        # bukan sudah jadi: lantai, lalu garis bilangan, lalu siswanya berdatangan.
        # ------------------------------------------------------------------
        kamera.pasang_awal(frame, theta=-34, phi=68, pusat=(0.4, 0, 1.0), tinggi=6.4)
        self.add(lantai, papan)

        daftar = rumus(r"4,\ 5,\ 6,\ 7,\ 7,\ 8,\ 8,\ 11", 34, AKSEN2).to_corner(UR, buff=0.5)
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Rata-rata itu angka apa?", lama=2.4, y=2.4)
            b.catat(2.4)
            b.main(LaggedStartMap(FadeIn, siswa, lag_ratio=0.35), run_time=2.5)
            b.main(LaggedStartMap(FadeIn, angka_lantai, lag_ratio=0.25), run_time=0.8)
            self.hud_tambah(daftar)
            daftar.set_opacity(0)
            b.main(daftar.animate.set_opacity(1), run_time=0.6)
            sinema.keterangan(self, "nilai ulangan delapan siswa")
            b.catat(0.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"daftar": daftar, "keterangan": self._matra_keterangan},
                          [("daftar", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 2: SATU gerakan kamera panjang ke sudut tempat garis bilangan terbaca,
        # sambil siswa berjalan ke angka nilainya.
        # ------------------------------------------------------------------
        with sinema.babak(self, "berbaris", DURASI) as b:
            b.main(kamera.sudut(frame, theta=-8, phi=80, pusat=(0.4, 0, 1.05), tinggi=6.6),
                   *[o.animate.move_to(o.tujuan + OUT * TINGGI_ORANG / 2) for o in siswa],
                   run_time=4.6)
            sinema.keterangan(self, "berdiri di angka nilainya masing-masing")
            b.catat(0.6)
        qc.periksa_adegan(self, {"angka": angka_lantai, "daftar": daftar,
                                 "keterangan": self._matra_keterangan},
                          [("angka", "keterangan"), ("daftar", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 3: modus. Ditandai bentuk, bukan warna: dua barisan yang tebal.
        # Kurungnya digambar DI ATAS kepala, bukan di lantai. Di lantai ia tertimpa
        # angka dan hampir tak terlihat dari kamera yang nyaris sejajar tanah.
        # ------------------------------------------------------------------
        kurung_modus = VGroup()
        for v in (7, 8):
            k = VMobject()
            k.set_points_as_corners([
                [xw(v) - 0.34, 0, Z_KEPALA + 0.18],
                [xw(v) - 0.34, 0, Z_KEPALA + 0.40],
                [xw(v) + 0.34, 0, Z_KEPALA + 0.40],
                [xw(v) + 0.34, 0, Z_KEPALA + 0.18],
            ])
            k.set_stroke(TINTA, 4)
            kurung_modus.add(k)
        l_modus = tegak(teks("dua modus: 7 dan 8", 26, TINTA))
        l_modus.move_to([xw(7.5), 0, Z_KEPALA + 0.95])
        with sinema.babak(self, "modus", DURASI) as b:
            b.main(kamera.dekati(frame, [0.6, 0, 1.30], 6.2), run_time=3.0)
            b.main(ShowCreation(kurung_modus), run_time=1.4)
            b.main(FadeIn(l_modus, shift=OUT * 0.2), run_time=0.8)
            # color WAJIB disebut: Indicate bawaan ManimGL memakai kuning, warna di
            # luar palet Studio Teknis, dan itu terlihat di lembar kontak render
            # kelima sebagai siswa yang mendadak kuning dan hijau.
            b.main(Indicate(siswa[3], scale_factor=1.12, color=TINTA),
                   Indicate(siswa[4], scale_factor=1.12, color=TINTA), run_time=1.2)
            b.main(Indicate(siswa[5], scale_factor=1.12, color=TINTA),
                   Indicate(siswa[6], scale_factor=1.12, color=TINTA), run_time=1.2)
            sinema.keterangan(self, "barisan paling tebal, dan di sini ada dua")
            b.catat(0.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"label modus": l_modus, "daftar": daftar,
                                 "keterangan": self._matra_keterangan},
                          [("label modus", "keterangan"), ("label modus", "daftar")])

        # ------------------------------------------------------------------
        # Babak 4: median. Sekat ungu berdiri PERSIS di antara dua siswa bernilai 7,
        # yaitu di y = 0 sedangkan keduanya di y = -0,4 dan +0,4. Jadi sekatnya
        # benar-benar membelah barisan jadi empat lawan empat, bukan seolah-olah.
        # ------------------------------------------------------------------
        sekat = ilustrasi.balok(0.10, 0.10, 2.3, SOROT).shift([xw(MEDIAN), 0, 0])
        panel_med = rumus(r"4 \mid 4", 34, SOROT)
        panel_med.next_to(daftar, DOWN, buff=0.35).align_to(daftar, RIGHT)
        l_median = tegak(teks("median 7", 26, SOROT))
        l_median.move_to([xw(MEDIAN) - 1.5, 0, Z_KEPALA + 1.55])
        with sinema.babak(self, "median", DURASI) as b:
            b.main(FadeOut(kurung_modus), FadeOut(l_modus), run_time=0.8)
            sekat.set_opacity(0)
            self.add(sekat)
            b.main(sekat.animate.set_opacity(1), run_time=1.2)
            b.main(LaggedStart(*[Indicate(siswa[i], scale_factor=1.1, color=SOROT)
                                 for i in (0, 1, 2, 3)], lag_ratio=0.3), run_time=1.5)
            b.main(LaggedStart(*[Indicate(siswa[i], scale_factor=1.1, color=SOROT)
                                 for i in (4, 5, 6, 7)], lag_ratio=0.3), run_time=1.5)
            b.main(FadeIn(l_median), run_time=0.7)
            self.hud_tambah(panel_med)
            panel_med.set_opacity(0)
            b.main(panel_med.animate.set_opacity(1), run_time=0.7)
            sinema.keterangan(self, "empat orang di kiri, empat orang di kanan")
            b.catat(0.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"label median": l_median, "panel median": panel_med,
                                 "daftar": daftar, "keterangan": self._matra_keterangan},
                          [("panel median", "daftar"), ("label median", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 5: pertanyaan, lalu diam sejenak. Dunia tetap hidup karena napas.
        # ------------------------------------------------------------------
        with sinema.babak(self, "tanya", DURASI) as b:
            b.main(FadeOut(l_median), FadeOut(sekat), run_time=1.2)
            b.main(kamera.dekati(frame, [0.4, 0, 1.15], 6.0), run_time=5.2)
            sinema.keterangan(self, "jawaban ketiga: rata-rata", warna=SOROT)
            b.catat(0.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"daftar": daftar, "panel median": panel_med,
                                 "keterangan": self._matra_keterangan},
                          [("daftar", "keterangan"), ("panel median", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 6: garis bilangan BERUBAH jadi papan, tumpuan tumbuh di angka 8.
        # ------------------------------------------------------------------
        tumpu = 8.0
        papan_tebal = ilustrasi.balok(PAPAN_PANJANG, 1.5, TEBAL_PAPAN, AKSEN)
        papan_tebal.shift([PAPAN_PUSAT, 0, TINGGI_TUMPU])
        # Penopang dibuat ramping: pada render ketiga tumpuan selebar 0,9 dan setebal
        # 1,3 menutupi angka di bawahnya, dan angka 7 hilang tepat saat papannya
        # seimbang di 7, yaitu momen terpenting seluruh video.
        penopang = ilustrasi.penopang(0.7, TINGGI_TUMPU, 0.85).shift([xw(tumpu), 0, 0])

        with sinema.babak(self, "papan", DURASI) as b:
            b.main(Transform(papan, papan_tebal),
                   siswa.animate.shift(OUT * Z_ATAS_PAPAN),
                   run_time=2.6)
            b.main(GrowFromCenter(penopang), run_time=1.4)
            sinema.keterangan(self, "tumpuan ditaruh dulu di angka 8")
            b.catat(0.6)
            b.jeda(1.4)
        qc.periksa_adegan(self, {"daftar": daftar, "panel median": panel_med,
                                 "keterangan": self._matra_keterangan},
                          [("daftar", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 7: papan jatuh ke kiri. Putaran dilakukan dengan Rotate dan sudutnya
        # dicatat sendiri, jadi tiap putaran berikutnya cuma SELISIHnya. Kalau tidak,
        # putaran bertumpuk dan papan berbalik makin lama makin miring.
        # ------------------------------------------------------------------
        papan_grup = Group(papan, *siswa)
        sudut_kini = [0.0]

        def ke_sudut(derajat, poros_nilai):
            selisih = (derajat - sudut_kini[0]) * DEGREES
            sudut_kini[0] = derajat
            return Rotate(papan_grup, selisih, axis=UP,
                          about_point=np.array([xw(poros_nilai), 0.0, TINGGI_TUMPU]))

        with sinema.babak(self, "miring", DURASI) as b:
            b.main(ke_sudut(miring(tumpu), tumpu), run_time=3.4)
            sinema.keterangan(self, "yang di kiri jaraknya jauh lebih besar")
            b.catat(0.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"daftar": daftar, "keterangan": self._matra_keterangan},
                          [("daftar", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 8: tumpuan digeser ke kiri sampai papan mendatar. Angka letak
        # tumpuan hidup, berubah pada frame yang sama dengan papannya.
        # ------------------------------------------------------------------
        jejak = ValueTracker(tumpu)
        angka_tumpu = sinema.AngkaKoma(tumpu, num_decimal_places=1, font_size=34).set_color(AKSEN)
        l_tumpu = teks("tumpuan di", 26, AKSEN)
        panel_tumpu = sinema.nilai_hidup(l_tumpu, angka_tumpu,
                                         panel_med.get_center() + DOWN * 0.85)
        panel_tumpu.align_to(daftar, RIGHT)
        angka_tumpu.add_updater(lambda m: m.set_value(jejak.get_value()))
        self.hud_tambah(panel_tumpu)

        with sinema.babak(self, "geser", DURASI) as b:
            b.main(FadeIn(panel_tumpu), run_time=0.6)
            sinema.keterangan(self, "tumpuan digeser pelan ke kiri")
            b.catat(0.6)
            for singgah in (7.5, 7.2, MEAN):
                b.main(penopang.animate.move_to([xw(singgah), 0, TINGGI_TUMPU / 2]),
                       jejak.animate.set_value(singgah),
                       ke_sudut(miring(singgah), singgah),
                       run_time=2.5)
            sinema.keterangan(self, "berhenti tepat di 7, papannya mendatar")
            b.catat(0.6)
        qc.periksa_adegan(self, {"panel tumpuan": panel_tumpu, "daftar": daftar,
                                 "panel median": panel_med,
                                 "keterangan": self._matra_keterangan},
                          [("panel tumpuan", "panel median"), ("panel tumpuan", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 9: panah simpangan. Tiap panah diberi ketinggian sendiri supaya dua
        # siswa yang nilainya sama tidak menimpa panah satu sama lain, DAN diberi
        # tali tegak ke kepala pemiliknya. Pada render pertama panah melayang di
        # z 2,25 tanpa tali, dan terbaca sebagai garis merah entah milik siapa.
        # ------------------------------------------------------------------
        panah, tali, angka_panah = VGroup(), VGroup(), VGroup()
        naik_kiri = naik_kanan = 0
        for v in NILAI:
            if v == MEAN:
                continue
            if v < MEAN:
                z = Z_PANAH + 0.30 * naik_kiri
                naik_kiri += 1
            else:
                z = Z_PANAH + 0.30 * naik_kanan
                naik_kanan += 1
            t = DashedLine([xw(v), 0, Z_KEPALA + 0.05], [xw(v), 0, z], dash_length=0.09)
            tali.add(t.set_stroke(AKSEN, 2.5, opacity=0.8))
            # thickness 11, bukan 4,5: lebar panah = thickness kali 0,015 satuan dunia,
            # jadi 4,5 hanya 0,07 satuan dan pada 480p ia jadi garis rambut. ManimGL
            # sendiri membatasi lebar ke 10 persen panjang panah, jadi panah pendek
            # tidak ikut menggemuk; yang tertolong justru panah terpanjang, si 4,
            # yang paling penting sebab ia yang mengimbangi tiga orang di kiri.
            a = Arrow([xw(v), 0, z], [xw(MEAN), 0, z], buff=0, thickness=11)
            panah.add(a.set_color(AKSEN))
            n = tegak(rumus(str(abs(int(v - MEAN))), 25, AKSEN))
            n.move_to([(xw(v) + xw(MEAN)) / 2, 0, z + 0.20])
            angka_panah.add(n)

        panel_kiri = rumus(r"3 + 2 + 1 = 6", 32, AKSEN)
        panel_kanan = rumus(r"1 + 1 + 4 = 6", 32, AKSEN)
        panel_kiri.next_to(panel_tumpu, DOWN, buff=0.35).align_to(daftar, RIGHT)
        panel_kanan.next_to(panel_kiri, DOWN, buff=0.22).align_to(daftar, RIGHT)

        with sinema.babak(self, "bukti", DURASI) as b:
            b.main(kamera.sudut(frame, theta=-4, phi=82, pusat=(0.2, 0, 1.55), tinggi=7.0),
                   run_time=2.6)
            b.main(LaggedStartMap(ShowCreation, tali, lag_ratio=0.2), run_time=1.4)
            b.main(LaggedStartMap(GrowArrow, panah, lag_ratio=0.2), run_time=2.6)
            b.main(LaggedStartMap(FadeIn, angka_panah, lag_ratio=0.2), run_time=1.2)
            for p in (panel_kiri, panel_kanan):
                self.hud_tambah(p)
                p.set_opacity(0)
            b.main(panel_kiri.animate.set_opacity(1), run_time=0.9)
            b.main(panel_kanan.animate.set_opacity(1), run_time=0.9)
            sinema.keterangan(self, "enam lawan enam")
            b.catat(0.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"panel kiri": panel_kiri, "panel kanan": panel_kanan,
                                 "panel tumpuan": panel_tumpu,
                                 "keterangan": self._matra_keterangan},
                          [("panel kiri", "panel kanan"), ("panel tumpuan", "panel kiri"),
                           ("panel kanan", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 10: BARU sekarang rumusnya. Gambarnya tidak diganti layar kosong.
        # ------------------------------------------------------------------
        panel_mean = rumus(r"\bar{x} = \frac{56}{8} = 7", 38, AKSEN)
        panel_mean.move_to(panel_kiri.get_center() + DOWN * 0.15).align_to(daftar, RIGHT)
        with sinema.babak(self, "rumus", DURASI) as b:
            b.main(FadeOut(angka_panah), run_time=1.0)
            b.main(FadeOut(panel_kanan), run_time=0.7)
            self.hud_tambah(panel_mean)
            panel_mean.set_opacity(0)
            b.main(FadeOut(panel_kiri), panel_mean.animate.set_opacity(1), run_time=2.0)
            b.main(Indicate(panel_mean, scale_factor=1.12, color=SOROT), run_time=2.4)
            sinema.keterangan(self, "rumusnya cuma cara cepat menemukan titik seimbang")
            b.catat(0.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"panel mean": panel_mean, "panel tumpuan": panel_tumpu,
                                 "daftar": daftar, "keterangan": self._matra_keterangan},
                          [("panel mean", "panel tumpuan"), ("panel mean", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 11: penutup. Papan dibiarkan seimbang, siswa terus bernapas, kamera
        # berputar pelan supaya penonton melihat papan itu memang benda di ruang.
        # ------------------------------------------------------------------
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(panah), FadeOut(tali), run_time=1.2)
            sinema.keterangan(self, "di sini ketiganya sama-sama 7, dan itu kebetulan",
                              warna=SOROT)
            b.catat(0.6)
            b.main(kamera.putar_pelan(frame, derajat=6), run_time=6.0)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"panel mean": panel_mean, "panel tumpuan": panel_tumpu,
                                 "keterangan": self._matra_keterangan},
                          [("panel mean", "keterangan"), ("panel tumpuan", "panel mean")])
