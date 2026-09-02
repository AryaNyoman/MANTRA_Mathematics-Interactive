"""Materi 05 Statistika: mean, median, modus lewat jungkat-jungkit (ManimGL).

Storyboard: docs/superpowers/specs/2026-09-02-statistika-video-5-storyboard.md
Naskah    : manim/narasi/statistika5-pemusatan.json (11 segmen, 122 detik)

Yang dibuktikan gambar, bukan diberitahu: rata-rata adalah titik tempat data
seimbang. Rumus mean sengaja ditahan sampai babak kesepuluh, setelah papannya
mendatar sendiri di angka tujuh.

REVISI BESAR 2 Sep 2026 malam, atas tinjauan ARYA terhadap render keenam:
"3D ini membuat siswa jadi bingung, gambarnya pecah, tidak jelas, terutama
perbedaan selisih antara kelompok nilai 5 dengan nilai 7." ARYA menambahkan
bahwa 3D tidak wajib kalau tidak membantu.

Diagnosis saya, dan kenapa ARYA benar: seluruh isi video ini adalah
MEMBANDINGKAN JARAK. Pada sudut miring, jarak yang sama panjang di dunia
digambar tidak sama panjang di layar, dan siswa diminta membandingkan sesuatu
yang gambarnya sendiri sudah menyimpangkannya. Tiga perubahan:

1. Kamera dibuat hampir sejajar tanah (phi 85, theta 0) sepanjang bagian yang
   harus dibaca. Benda tetap 3D bercahaya, tetapi susunannya terbaca datar,
   jadi satu satuan nilai = satu jarak layar yang sama di mana pun.
2. Siswa, angka, papan, dan tumpuan SEMUANYA di y = 0. Sebelumnya angka ada di
   y -1,15 dan itu membuat siswa terlihat tidak segaris dengan angkanya.
3. Bukti "enam lawan enam" tidak lagi berupa enam panah tipis di ketinggian
   berbeda. Ketiga jarak kiri dijajarkan jadi SATU batang, ketiga jarak kanan
   jadi batang kedua, keduanya berpangkal sama. Sama panjang atau tidak,
   sekarang bisa dilihat dalam sekejap tanpa membandingkan angka.

Satu warna satu makna: AKSEN2 biru = data, AKSEN bata = mean dan jarak ke mean,
SOROT ungu = median, TINTA = angka dan penanda modus. Modus ditandai BENTUK,
yaitu dua orang berdiri berdampingan di satu angka.
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


TINGGI_TUMPU = 0.55
TEBAL_PAPAN = 0.18
Z_ATAS_PAPAN = TINGGI_TUMPU + TEBAL_PAPAN
TINGGI_ORANG = 1.15
Z_KEPALA = Z_ATAS_PAPAN + TINGGI_ORANG
PAPAN_PUSAT = 0.5
PAPAN_PANJANG = 9.0
PAPAN_DALAM = 0.9               # tipis pada pandangan datar, tidak menutupi apa pun
Z_ANGKA = -0.38                 # angka di BAWAH garis, seperti label sumbu
GESER_KEMBAR = 0.17             # dua orang bernilai sama berdiri berdampingan


def geser_x(nilai_list):
    """Nilai kembar digeser sedikit ke kiri dan kanan supaya dua-duanya terlihat.

    Pada susunan lama mereka dijajarkan ke BELAKANG (sumbu y). Itu terbaca saat
    kamera miring, tetapi hilang begitu kamera diratakan, dan kamera harus rata
    supaya jarak antar nilai terbaca jujur. Geseran 0,17 satuan jauh lebih kecil
    daripada satu satuan nilai, jadi keduanya tetap terbaca berdiri di angka
    yang sama.
    """
    hasil, dipakai = [], {}
    banyak = {v: nilai_list.count(v) for v in nilai_list}
    for v in nilai_list:
        k = dipakai.get(v, 0)
        dipakai[v] = k + 1
        hasil.append(0.0 if banyak[v] == 1 else (-GESER_KEMBAR + 2 * GESER_KEMBAR * k))
    return hasil


DX_ORANG = geser_x(NILAI)


def torsi(tumpu):
    """Jumlah simpangan tiap nilai terhadap letak tumpuan. Nol berarti seimbang."""
    return sum(v - tumpu for v in NILAI)


def miring(tumpu):
    """Sudut papan dalam derajat. Putaran positif terhadap UP menurunkan ujung kanan."""
    return float(np.clip(torsi(tumpu), -8.0, 8.0))


def tegak(mob):
    """Berdirikan teks di bidang xz supaya menghadap kamera yang sejajar tanah."""
    return mob.rotate(90 * DEGREES, RIGHT)


def bilah(panjang, tinggi=0.30, warna=AKSEN):
    """Bilah datar di bidang xz: satuan jarak yang bisa dijajarkan jadi batang."""
    r = Rectangle(width=panjang, height=tinggi)
    r.set_fill(warna, opacity=1).set_stroke(LATAR, 1.5)
    return tegak(r)


class Pemusatan5(AdeganMatra):
    def construct(self):
        frame = self.frame

        # ------------------------------------------------------------------
        # Dunia. Lantai ditaruh MEMBELAKANGI garis (y mulai 0,6) supaya daerah di
        # bawah garis tetap krem dan angka sumbunya terbaca di sana.
        # ------------------------------------------------------------------
        lantai = ilustrasi.tanah(panjang=34.0, lebar=70.0, y_tengah=35.6, z=0.0)

        # Garis bilangan dibuat sebagai balok TIPIS, sebab di babak keenam ia
        # BERUBAH jadi papan jungkat-jungkit. Benda yang sama berubah bentuk lebih
        # mudah diikuti mata daripada benda yang hilang lalu muncul.
        papan = ilustrasi.balok(PAPAN_PANJANG, PAPAN_DALAM, 0.07, REDUP)
        papan.shift(RIGHT * PAPAN_PUSAT)

        angka_lantai = VGroup()
        for v in range(4, 12):
            a = tegak(rumus(str(v), 28, TINTA))
            a.move_to([xw(v), 0, Z_ANGKA])
            angka_lantai.add(a)

        # Siswa mulai berkerumun di samping, baru berjalan ke angkanya di babak 2.
        # Kalau mereka sudah berdiri rapi sejak awal, narasi "mari mereka berdiri
        # di garis bilangan" membantah gambarnya sendiri.
        siswa = Group()
        for i, (v, dx) in enumerate(zip(NILAI, DX_ORANG)):
            o = ilustrasi.orang(TINGGI_ORANG, AKSEN2)
            o.tujuan = np.array([xw(v) + dx, 0.0, 0.07])
            o.shift([-1.3 + 0.34 * i, 2.4, 0.07])
            o.fase = 1.7 * i
            o.z_lalu = 0.0
            siswa.add(o)

        # Napas dipasang sebagai GESERAN SELISIH, bukan penempatan mutlak, supaya
        # tetap benar setelah papannya diputar.
        def napas(m):
            z = 0.03 * np.sin(1.6 * self.time + m.fase)
            m.shift(OUT * (z - m.z_lalu))
            m.z_lalu = z

        for o in siswa:
            o.add_updater(napas)

        # ------------------------------------------------------------------
        # Babak 1: pandangan dunia, miring dan dekat.
        # ------------------------------------------------------------------
        kamera.pasang_awal(frame, theta=-22, phi=74, pusat=(0.4, 0, 1.0), tinggi=6.0)
        self.add(lantai, papan)

        daftar = rumus(r"4,\ 5,\ 6,\ 7,\ 7,\ 8,\ 8,\ 11", 34, AKSEN2).to_corner(UR, buff=0.5)
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 05: Mean, median, modus", lama=3.4, y=2.6)
            b.catat(3.4)
            b.main(LaggedStartMap(FadeIn, siswa, lag_ratio=0.35), run_time=3.2)
            b.main(LaggedStartMap(FadeIn, angka_lantai, lag_ratio=0.25), run_time=1.6)
            self.hud_tambah(daftar)
            daftar.set_opacity(0)
            b.main(daftar.animate.set_opacity(1), run_time=0.8)
            sinema.keterangan(self, "nilai ulangan *delapan siswa*")
            b.catat(0.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"daftar": daftar, "keterangan": self._matra_keterangan},
                          [("daftar", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 2: SATU gerakan panjang ke pandangan datar. Inilah gerakan yang
        # membuat jarak antar nilai terbaca jujur, dan sesudah ini kamera hampir
        # tidak berpindah lagi.
        # ------------------------------------------------------------------
        with sinema.babak(self, "berbaris", DURASI) as b:
            b.main(kamera.sudut(frame, theta=0, phi=85, pusat=(0.4, 0, 1.15), tinggi=6.2),
                   *[o.animate.move_to(o.tujuan + OUT * TINGGI_ORANG / 2) for o in siswa],
                   run_time=4.8)
            sinema.keterangan(self, "berdiri di *angka nilainya* masing-masing")
            b.catat(0.6)
        qc.periksa_adegan(self, {"angka": angka_lantai, "daftar": daftar,
                                 "keterangan": self._matra_keterangan},
                          [("angka", "keterangan"), ("daftar", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 3: modus, ditandai bentuk (dua orang berdampingan), bukan warna.
        # ------------------------------------------------------------------
        kurung_modus = VGroup()
        for v in (7, 8):
            k = VMobject()
            k.set_points_as_corners([
                [xw(v) - 0.36, 0, Z_KEPALA + 0.16],
                [xw(v) - 0.36, 0, Z_KEPALA + 0.38],
                [xw(v) + 0.36, 0, Z_KEPALA + 0.38],
                [xw(v) + 0.36, 0, Z_KEPALA + 0.16],
            ])
            k.set_stroke(TINTA, 4)
            kurung_modus.add(k)
        l_modus = tegak(teks("dua modus: 7 dan 8", 26, TINTA))
        l_modus.move_to([xw(7.5), 0, Z_KEPALA + 0.92])
        with sinema.babak(self, "modus", DURASI) as b:
            b.main(kamera.dekati(frame, [0.6, 0, 1.25], 6.0), run_time=2.2)
            b.main(ShowCreation(kurung_modus), run_time=1.4)
            b.main(FadeIn(l_modus, shift=OUT * 0.2), run_time=0.8)
            # color WAJIB disebut: Indicate bawaan ManimGL memakai kuning, warna di
            # luar palet Studio Teknis, dan itu terlihat di lembar kontak render kelima.
            b.main(Indicate(siswa[3], scale_factor=1.12, color=TINTA),
                   Indicate(siswa[4], scale_factor=1.12, color=TINTA), run_time=1.2)
            b.main(Indicate(siswa[5], scale_factor=1.12, color=TINTA),
                   Indicate(siswa[6], scale_factor=1.12, color=TINTA), run_time=1.2)
            sinema.keterangan(self, "barisan paling *tebal*, dan di sini ada dua")
            b.catat(0.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"label modus": l_modus, "daftar": daftar,
                                 "keterangan": self._matra_keterangan},
                          [("label modus", "keterangan"), ("label modus", "daftar")])

        # ------------------------------------------------------------------
        # Babak 4: median. Sekat berdiri di antara siswa ke-4 dan ke-5, yang
        # dua-duanya bernilai 7, jadi sekatnya jatuh tepat di angka 7.
        # ------------------------------------------------------------------
        sekat = ilustrasi.balok(0.09, 0.5, 2.4, SOROT).shift([xw(MEDIAN), 0, 0])
        panel_med = rumus(r"4 \mid 4", 34, SOROT)
        panel_med.next_to(daftar, DOWN, buff=0.35).align_to(daftar, RIGHT)
        l_median = tegak(teks("median 7", 26, SOROT))
        l_median.move_to([xw(MEDIAN) - 1.6, 0, Z_KEPALA + 1.5])
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
            sinema.keterangan(self, "*empat* orang di kiri, *empat* orang di kanan")
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
            b.main(kamera.dekati(frame, [0.4, 0, 1.30], 6.2), run_time=4.4)
            sinema.keterangan(self, "jawaban ketiga: *rata-rata*", warna=SOROT)
            b.catat(0.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"daftar": daftar, "panel median": panel_med,
                                 "keterangan": self._matra_keterangan},
                          [("daftar", "keterangan"), ("panel median", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 6: garis bilangan BERUBAH jadi papan, tumpuan tumbuh di angka 8.
        # ------------------------------------------------------------------
        tumpu = 8.0
        papan_tebal = ilustrasi.balok(PAPAN_PANJANG, PAPAN_DALAM, TEBAL_PAPAN, AKSEN)
        papan_tebal.shift([PAPAN_PUSAT, 0, TINGGI_TUMPU])
        penopang = ilustrasi.penopang(0.7, TINGGI_TUMPU, 0.8).shift([xw(tumpu), 0, 0])

        with sinema.babak(self, "papan", DURASI) as b:
            b.main(Transform(papan, papan_tebal),
                   siswa.animate.shift(OUT * Z_ATAS_PAPAN),
                   run_time=2.6)
            b.main(GrowFromCenter(penopang), run_time=1.4)
            sinema.keterangan(self, "tumpuan ditaruh dulu di angka *8*")
            b.catat(0.6)
            b.jeda(1.4)
        qc.periksa_adegan(self, {"daftar": daftar, "panel median": panel_med,
                                 "keterangan": self._matra_keterangan},
                          [("daftar", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 7: papan jatuh ke kiri. Sudut dicatat sendiri supaya tiap putaran
        # berikutnya cuma SELISIHnya; kalau tidak, putaran bertumpuk.
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
            sinema.keterangan(self, "yang di kiri jaraknya *jauh lebih besar*")
            b.catat(0.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"daftar": daftar, "keterangan": self._matra_keterangan},
                          [("daftar", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 8: tumpuan digeser sampai papan mendatar, angkanya hidup.
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
            sinema.keterangan(self, "tumpuan digeser pelan *ke kiri*")
            b.catat(0.6)
            for singgah in (7.5, 7.2, MEAN):
                b.main(penopang.animate.move_to([xw(singgah), 0, TINGGI_TUMPU / 2]),
                       jejak.animate.set_value(singgah),
                       ke_sudut(miring(singgah), singgah),
                       run_time=2.4)
            sinema.keterangan(self, "berhenti tepat di *7*, papannya mendatar")
            b.catat(0.6)
        qc.periksa_adegan(self, {"panel tumpuan": panel_tumpu, "daftar": daftar,
                                 "panel median": panel_med,
                                 "keterangan": self._matra_keterangan},
                          [("panel tumpuan", "panel median"), ("panel tumpuan", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 9: bukti. Tiap jarak ke tumpuan digambar sebagai bilah, lalu
        # ketiga bilah kiri dijajarkan jadi SATU batang dan ketiga bilah kanan
        # jadi batang kedua, berpangkal sama. Panjangnya sama atau tidak bisa
        # dilihat sekejap, tanpa membandingkan angka satu per satu.
        # Susunan lama, enam panah tipis di ketinggian berbeda, ditolak ARYA
        # karena justru perbandingan jaraknya yang tidak terbaca.
        # ------------------------------------------------------------------
        Z_BILAH = (1.95, 2.30, 2.65)
        # Z_KIRI di ATAS Z_KANAN: narasinya menyebut kiri lebih dulu.
        # X_PANGKAL -3,6 supaya ujung kanan batang (panjang 6) berhenti di 2,4
        # dan tidak menabrak daftar nilai di pojok kanan atas.
        Z_KIRI, Z_KANAN, X_PANGKAL = 3.52, 2.98, -3.6

        def bilah_bernomor(panjang, pusat_x, z):
            g = bilah(panjang).move_to([pusat_x, 0, z])
            n = tegak(rumus(str(int(panjang)), 22, LATAR)).move_to([pusat_x, -0.02, z])
            return VGroup(g, n)

        kiri_nilai = [v for v in NILAI if v < MEAN]          # 4, 5, 6  -> 3, 2, 1
        kanan_nilai = [v for v in NILAI if v > MEAN]         # 8, 8, 11 -> 1, 1, 4

        bilah_kiri, bilah_kanan = VGroup(), VGroup()
        for i, v in enumerate(kiri_nilai):
            p = MEAN - v
            bilah_kiri.add(bilah_bernomor(p, (xw(v) + 0) / 2, Z_BILAH[i]))
        for i, v in enumerate(kanan_nilai):
            p = v - MEAN
            bilah_kanan.add(bilah_bernomor(p, (xw(v) + 0) / 2, Z_BILAH[i]))

        # Sasaran: dijajarkan ujung ke ujung, dua-duanya mulai dari X_PANGKAL.
        sasaran_kiri, sasaran_kanan = [], []
        jalan = X_PANGKAL
        for v in kiri_nilai:
            p = MEAN - v
            sasaran_kiri.append(np.array([jalan + p / 2, 0.0, Z_KIRI]))
            jalan += p
        jalan = X_PANGKAL
        for v in kanan_nilai:
            p = v - MEAN
            sasaran_kanan.append(np.array([jalan + p / 2, 0.0, Z_KANAN]))
            jalan += p

        nama_kiri = tegak(teks("kiri", 24, AKSEN)).move_to([X_PANGKAL - 0.75, 0, Z_KIRI])
        nama_kanan = tegak(teks("kanan", 24, AKSEN)).move_to([X_PANGKAL - 0.85, 0, Z_KANAN])
        panel_jumlah = rumus(r"6 = 6", 36, AKSEN)
        panel_jumlah.next_to(panel_tumpu, DOWN, buff=0.35).align_to(daftar, RIGHT)

        with sinema.babak(self, "bukti", DURASI) as b:
            b.main(LaggedStartMap(FadeIn, bilah_kiri, lag_ratio=0.25), run_time=1.6)
            b.main(LaggedStartMap(FadeIn, bilah_kanan, lag_ratio=0.25), run_time=1.6)
            b.main(*[g.animate.move_to(p) for g, p in zip(bilah_kiri, sasaran_kiri)],
                   *[g.animate.move_to(p) for g, p in zip(bilah_kanan, sasaran_kanan)],
                   run_time=2.6)
            b.main(FadeIn(nama_kiri), FadeIn(nama_kanan), run_time=0.8)
            self.hud_tambah(panel_jumlah)
            panel_jumlah.set_opacity(0)
            b.main(panel_jumlah.animate.set_opacity(1), run_time=0.8)
            sinema.keterangan(self, "dua batang ini *sama panjang*")
            b.catat(0.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"panel jumlah": panel_jumlah, "panel tumpuan": panel_tumpu,
                                 "batang kiri": bilah_kiri, "batang kanan": bilah_kanan,
                                 "daftar": daftar, "keterangan": self._matra_keterangan},
                          [("panel jumlah", "panel tumpuan"), ("panel jumlah", "keterangan"),
                           ("batang kiri", "daftar"), ("batang kanan", "daftar"),
                           ("batang kiri", "batang kanan")])

        # ------------------------------------------------------------------
        # Babak 10: BARU sekarang rumusnya. Gambarnya tidak diganti layar kosong.
        # ------------------------------------------------------------------
        panel_mean = rumus(r"\bar{x} = \frac{56}{8} = 7", 38, AKSEN)
        panel_mean.move_to(panel_jumlah.get_center() + DOWN * 0.1).align_to(daftar, RIGHT)
        with sinema.babak(self, "rumus", DURASI) as b:
            sinema.keterangan(self, "rumusnya cuma cara cepat menemukan *titik seimbang*")
            b.catat(0.6)
            b.main(FadeOut(bilah_kiri), FadeOut(bilah_kanan),
                   FadeOut(nama_kiri), FadeOut(nama_kanan), run_time=1.2)
            self.hud_tambah(panel_mean)
            panel_mean.set_opacity(0)
            b.main(FadeOut(panel_jumlah), panel_mean.animate.set_opacity(1), run_time=1.8)
            b.main(Indicate(panel_mean, scale_factor=1.12, color=SOROT), run_time=2.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"panel mean": panel_mean, "panel tumpuan": panel_tumpu,
                                 "daftar": daftar, "keterangan": self._matra_keterangan},
                          [("panel mean", "panel tumpuan"), ("panel mean", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 11: penutup. Putaran ditahan 6 derajat: pada 16 derajat papan yang
        # SEIMBANG terlihat miring, persis membantah kalimat penutupnya.
        # ------------------------------------------------------------------
        with sinema.babak(self, "tutup", DURASI) as b:
            sinema.keterangan(self, "di sini ketiganya *sama-sama 7*, dan itu kebetulan",
                              warna=SOROT)
            b.catat(0.6)
            b.main(kamera.putar_pelan(frame, derajat=6), run_time=5.0)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"panel mean": panel_mean, "panel tumpuan": panel_tumpu,
                                 "keterangan": self._matra_keterangan},
                          [("panel mean", "keterangan"), ("panel tumpuan", "panel mean")])
