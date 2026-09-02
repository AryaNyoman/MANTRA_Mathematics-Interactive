"""Materi 08 Statistika: simpangan baku, persegi yang tumbuh kuadrat (ManimGL).

Storyboard: docs/superpowers/specs/2026-09-02-statistika-video-8-storyboard.md
Naskah    : manim/narasi/statistika8-simpangan.json (11 segmen, 125 detik)

Gagasan pokok: simpangan baku bukan rumus berlapis yang harus dihafal, melainkan
jawaban atas satu masalah yang muncul sendiri. Jarak ke mean tidak bisa dijumlah
karena jumlahnya SELALU nol; kuadrat dipakai untuk membuang tanda minus; akar
dipakai untuk mengembalikan satuannya. Tiap langkah punya sebab, dan sebabnya
kelihatan di layar sebelum rumusnya ditulis.

Momen puncak: babak `empatkali`. Empat salinan persegi bersisi 5 ternyata PAS
mengisi persegi bersisi 10. Sisi dua kali lipat, luas empat kali lipat. Itu yang
membuat simpangan baku sangat peka terhadap pencilan, dan itu tidak bisa dilihat
dari rumusnya, hanya dari gambarnya.

Pandangan DATAR sejak babak kedua, mengikuti temuan ARYA pada video Materi 05:
kalau yang harus dibandingkan siswa adalah panjang dan luas, sudut miring
menggambar yang sama jadi tidak sama, dan itu membantah pelajarannya sendiri.

Satu warna satu makna DI DALAM video ini:
    AKSEN2 biru = Mesin A          AKSEN bata = Mesin B
    SOROT ungu  = mean 500          TINTA/REDUP = garis, angka, keterangan
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "statistika8-simpangan"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

# --- Data. Sudah lolos dua pemeriksa sebagai `t08-mesin-a` dan `t08-mesin-b`.
A = [498, 499, 500, 501, 502]        # simpangan -2 -1 0 1 2, kuadrat 4 1 0 1 4, jumlah 10
B = [490, 495, 500, 505, 510]        # simpangan -10 -5 0 5 10, kuadrat 100 25 0 25 100, jumlah 250
MEAN = 500.0
SKALA = 0.22                          # 1 ml = 0,22 satuan dunia


def xw(ml):
    """Letak mendatar sebuah pengukuran; 500 ml duduk di x = 0."""
    return (ml - MEAN) * SKALA


# --- Tinggi tiap lapis panggung. Dipisah longgar supaya persegi Mesin B yang
#     bersisi 2,2 satuan punya ruang tumbuh tanpa menabrak apa pun di atasnya.
Z_GARIS_A = 4.30
Z_GARIS_B = 3.35
Z_ANGKA = 3.00
Z_BARIS_A = 2.28                      # alas persegi Mesin A
Z_BARIS_B = 0.15                      # alas persegi Mesin B
TINGGI_BOTOL = 0.28
JARI_BOTOL = 0.07
TEBAL_BILAH = 0.10
SELA = 0.12                           # sela antar persegi saat dijajarkan


def simpangan(nilai):
    return nilai - MEAN


def tegak(mob):
    """Berdirikan teks di bidang xz supaya menghadap kamera yang sejajar tanah."""
    return mob.rotate(90 * DEGREES, RIGHT)


def kotak(sisi, warna, isi=1.0):
    """Persegi datar di bidang xz. Sisi dalam satuan dunia, bukan ml."""
    r = Rectangle(width=max(sisi, 0.001), height=max(sisi, 0.001))
    r.set_fill(warna, opacity=isi).set_stroke(LATAR, 1.2)
    return tegak(r)


def bilah(panjang, warna):
    """Bilah mendatar setebal tetap: wujud satu jarak sebelum dikuadratkan."""
    r = Rectangle(width=max(panjang, 0.02), height=TEBAL_BILAH)
    r.set_fill(warna, opacity=1).set_stroke(LATAR, 1.0)
    return tegak(r)


def baris_jajar(sisi_list, z_alas, x_tengah=0.0):
    """Letak pusat tiap persegi kalau dijajarkan berdampingan, rata alas."""
    lebar = sum(sisi_list) + SELA * (len(sisi_list) - 1)
    x = x_tengah - lebar / 2
    hasil = []
    for s in sisi_list:
        hasil.append(np.array([x + s / 2, 0.0, z_alas + s / 2]))
        x += s + SELA
    return hasil


class Simpangan8(AdeganMatra):
    # Penghalus tepi. Scene ManimGL bawaannya 0, dan tanpa ini tepi persegi
    # bertangga. Temuan ARYA 2 Sep 2026 pada video Materi 05.
    samples = 4

    def construct(self):
        frame = self.frame

        # ------------------------------------------------------------------
        # Panggung: dua garis ukur, sepuluh botol, satu garis mean bersama.
        # ------------------------------------------------------------------
        # Tanpa lantai. Pada pandangan datar bidang tanah muncul sebagai baji abu
        # besar di belakang persegi, tidak menambah apa pun, dan terbaca seperti
        # bukit. ARYA sudah membolehkan 3D tidak dipaksakan kalau tidak membantu.
        # Yang menjaga dunia tetap hidup di sini adalah goyangan botol.

        def garis(z):
            g = ilustrasi.balok(7.9, 0.5, 0.05, REDUP)
            return g.shift([0, 0, z])

        garis_a, garis_b = garis(Z_GARIS_A), garis(Z_GARIS_B)

        def botol(nilai, z, warna):
            s = ilustrasi.silinder(JARI_BOTOL, TINGGI_BOTOL, warna)
            return s.shift([xw(nilai), 0, z + 0.05])

        botol_a = Group(*[botol(v, Z_GARIS_A, AKSEN2) for v in A])
        botol_b = Group(*[botol(v, Z_GARIS_B, AKSEN) for v in B])
        for i, s in enumerate(list(botol_a) + list(botol_b)):
            s.fase = 1.3 * i
            s.z_lalu = 0.0

        # Goyangan tipis dipasang sebagai GESERAN SELISIH, pola yang sama dengan
        # napas siswa di video Materi 05, supaya tetap benar kalau botolnya
        # dipindahkan animasi lain.
        def goyang(m):
            z = 0.018 * np.sin(1.5 * self.time + m.fase)
            m.shift(OUT * (z - m.z_lalu))
            m.z_lalu = z

        for s in list(botol_a) + list(botol_b):
            s.add_updater(goyang)

        angka_ml = VGroup()
        for v in (490, 495, 500, 505, 510):
            t = tegak(rumus(str(v), 24, TINTA)).move_to([xw(v), 0, Z_ANGKA])
            angka_ml.add(t)

        nama_a = tegak(teks("Mesin A", 26, AKSEN2)).move_to([-3.85, 0, Z_GARIS_A + 0.26])
        nama_b = tegak(teks("Mesin B", 26, AKSEN)).move_to([-3.85, 0, Z_GARIS_B + 0.26])

        garis_mean = ilustrasi.balok(0.055, 0.4, 1.52, SOROT).shift([0, 0, Z_ANGKA + 0.18])
        # Label mean ditaruh DI ANTARA kedua garis, bukan di atas garis A:
        # di atas garis A ia keluar bingkai, dan itu ditangkap qc.periksa_adegan
        # sebelum saya sempat melihat lembar kontaknya.
        l_mean = tegak(teks("mean 500", 24, SOROT)).move_to([1.45, 0, 3.85])

        # ------------------------------------------------------------------
        # Babak 1: dunia dulu, miring dan dekat, lalu SATU gerakan ke pandangan
        # datar tempat panjang dan luas terbaca jujur.
        # ------------------------------------------------------------------
        kamera.pasang_awal(frame, theta=-20, phi=72, pusat=(0, 0, 3.7), tinggi=4.6)
        self.add(garis_a, garis_b)

        with sinema.babak(self, "buka", DURASI) as b:
            sinema.keterangan(self, "lima botol diukur dari *tiap mesin*")
            b.catat(0.6)
            sinema.judul_pembuka(self, "Materi 08: Simpangan baku", lama=3.0, y=2.6)
            b.catat(3.0)
            b.main(FadeIn(nama_a), FadeIn(nama_b), run_time=0.8)
            b.main(LaggedStartMap(FadeIn, botol_a, lag_ratio=0.25),
                   LaggedStartMap(FadeIn, botol_b, lag_ratio=0.25), run_time=2.6)
            b.main(kamera.sudut(frame, theta=0, phi=86, pusat=(0, 0, 2.35), tinggi=6.0),
                   FadeIn(angka_ml), run_time=3.6)
        qc.periksa_adegan(self, {"nama A": nama_a, "nama B": nama_b, "angka": angka_ml,
                                 "keterangan": self._matra_keterangan},
                          [("nama A", "nama B"), ("angka", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 2: pusatnya sama. Inilah jebakan soalnya.
        # ------------------------------------------------------------------
        panel_mean = rumus(r"\bar{x}_A = \bar{x}_B = 500", 32, SOROT).to_corner(UR, buff=0.5)
        with sinema.babak(self, "sama", DURASI) as b:
            sinema.keterangan(self, "rata-ratanya *sama persis*, sebarannya tidak")
            b.catat(0.6)
            garis_mean.set_opacity(0)
            self.add(garis_mean)
            b.main(garis_mean.animate.set_opacity(1), run_time=1.2)
            b.main(FadeIn(l_mean), run_time=0.8)
            self.hud_tambah(panel_mean)
            panel_mean.set_opacity(0)
            b.main(panel_mean.animate.set_opacity(1), run_time=0.8)
            b.main(Indicate(botol_a[2], scale_factor=1.6, color=SOROT),
                   Indicate(botol_b[2], scale_factor=1.6, color=SOROT), run_time=1.4)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"label mean": l_mean, "panel mean": panel_mean,
                                 "nama A": nama_a, "keterangan": self._matra_keterangan},
                          [("label mean", "panel mean"), ("panel mean", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 3: jarak tiap botol ke mean, turun ke daerah kerja masing-masing
        # mesin. Ditaruh berjajar sejak awal, tidak bertumpuk di atas garis:
        # lima ruas yang semuanya berakhir di 500 akan saling menutupi.
        # ------------------------------------------------------------------
        sisi_a = [abs(simpangan(v)) * SKALA for v in A]
        sisi_b = [abs(simpangan(v)) * SKALA for v in B]
        pusat_a = baris_jajar(sisi_a, Z_BARIS_A)
        pusat_b = baris_jajar(sisi_b, Z_BARIS_B)

        bilah_a = VGroup(*[bilah(s, AKSEN2) for s in sisi_a])
        bilah_b = VGroup(*[bilah(s, AKSEN) for s in sisi_b])
        for g, p in zip(bilah_a, pusat_a):
            g.move_to([p[0], 0, Z_BARIS_A + TEBAL_BILAH / 2])
        for g, p in zip(bilah_b, pusat_b):
            g.move_to([p[0], 0, Z_BARIS_B + TEBAL_BILAH / 2])

        tanda_a = VGroup(*[tegak(rumus(f"{int(simpangan(v)):+d}", 20, AKSEN2)) for v in A])
        tanda_b = VGroup(*[tegak(rumus(f"{int(simpangan(v)):+d}", 20, AKSEN)) for v in B])
        for t, g in zip(tanda_a, bilah_a):
            t.move_to(g.get_center() + OUT * 0.30)
        for t, g in zip(tanda_b, bilah_b):
            t.move_to(g.get_center() + OUT * 0.30)

        with sinema.babak(self, "simpangan", DURASI) as b:
            sinema.keterangan(self, "jarak ke 500, dan punya Mesin B *jauh lebih panjang*")
            b.catat(0.6)
            b.main(LaggedStartMap(FadeIn, bilah_a, lag_ratio=0.2), run_time=1.8)
            b.main(LaggedStartMap(FadeIn, bilah_b, lag_ratio=0.2), run_time=1.8)
            b.main(FadeIn(tanda_a), FadeIn(tanda_b), run_time=1.0)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"bilah A": bilah_a, "bilah B": bilah_b,
                                 "angka": angka_ml, "keterangan": self._matra_keterangan},
                          [("bilah A", "angka"), ("bilah B", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 4: kenapa menjumlah gagal. Pasangan bertanda berlawanan bertemu
        # lalu lenyap berdua. Yang harus terbaca bukan "hilang", melainkan
        # "saling meniadakan", jadi keduanya bergerak SALING MENDEKAT dulu.
        # ------------------------------------------------------------------
        panel_nol = rumus(r"\sum (x - \bar{x}) = 0", 32, TINTA)
        panel_nol.next_to(panel_mean, DOWN, buff=0.35).align_to(panel_mean, RIGHT)

        def hapus_pasangan(bilah_grup, tanda_grup, z_alas):
            """Pasangan (0,4) dan (1,3) bertemu di tengah, lalu memudar."""
            temu = [np.array([0.0, 0.0, z_alas + TEBAL_BILAH / 2]) for _ in range(2)]
            gerak = []
            for i, j in ((0, 4), (1, 3)):
                gerak += [bilah_grup[i].animate.move_to(temu[0]),
                          bilah_grup[j].animate.move_to(temu[0]),
                          tanda_grup[i].animate.move_to(temu[0] + OUT * 0.30).set_opacity(0),
                          tanda_grup[j].animate.move_to(temu[0] + OUT * 0.30).set_opacity(0)]
            return gerak

        with sinema.babak(self, "nol", DURASI) as b:
            sinema.keterangan(self, "jumlahnya *selalu nol*, jadi tidak mengukur apa-apa")
            b.catat(0.6)
            self.hud_tambah(panel_nol)
            panel_nol.set_opacity(0)
            b.main(panel_nol.animate.set_opacity(1), run_time=0.8)
            b.main(*hapus_pasangan(bilah_a, tanda_a, Z_BARIS_A),
                   *hapus_pasangan(bilah_b, tanda_b, Z_BARIS_B), run_time=2.8)
            b.main(FadeOut(bilah_a), FadeOut(bilah_b),
                   FadeOut(tanda_a), FadeOut(tanda_b), run_time=1.4)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"panel nol": panel_nol, "panel mean": panel_mean,
                                 "keterangan": self._matra_keterangan},
                          [("panel nol", "panel mean"), ("panel nol", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 5: kuadrat. Tiap jarak jadi SISI sebuah persegi, dan di sinilah
        # tanda minusnya lenyap tanpa dihapus paksa.
        # ------------------------------------------------------------------
        persegi_a = VGroup(*[kotak(s, AKSEN2) for s in sisi_a])
        persegi_b = VGroup(*[kotak(s, AKSEN) for s in sisi_b])
        for g, p in zip(persegi_a, pusat_a):
            g.move_to(p)
        for g, p in zip(persegi_b, pusat_b):
            g.move_to(p)

        nilai_a = VGroup(*[tegak(rumus(str(int(simpangan(v) ** 2)), 19, LATAR)) for v in A])
        nilai_b = VGroup(*[tegak(rumus(str(int(simpangan(v) ** 2)), 19, LATAR)) for v in B])
        for t, g in zip(list(nilai_a) + list(nilai_b), list(persegi_a) + list(persegi_b)):
            t.move_to(g.get_center() + IN * 0.02)

        with sinema.babak(self, "kuadrat", DURASI) as b:
            sinema.keterangan(self, "tiap jarak jadi *sisi* sebuah persegi")
            b.catat(0.6)
            b.main(LaggedStartMap(GrowFromCenter, persegi_a, lag_ratio=0.2), run_time=2.2)
            b.main(LaggedStartMap(GrowFromCenter, persegi_b, lag_ratio=0.2), run_time=2.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"persegi A": persegi_a, "persegi B": persegi_b,
                                 "angka": angka_ml, "keterangan": self._matra_keterangan},
                          [("persegi A", "angka"), ("persegi B", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 6: luasnya dijumlahkan. Angkanya muncul DI DALAM perseginya,
        # jadi mata melihat luas dan angka sebagai satu benda.
        # ------------------------------------------------------------------
        panel_jum_a = rumus(r"A:\ \Sigma = 10", 30, AKSEN2)
        panel_jum_b = rumus(r"B:\ \Sigma = 250", 30, AKSEN)
        panel_jum_a.next_to(panel_nol, DOWN, buff=0.35).align_to(panel_mean, RIGHT)
        panel_jum_b.next_to(panel_jum_a, DOWN, buff=0.34).align_to(panel_mean, RIGHT)

        with sinema.babak(self, "luas", DURASI) as b:
            sinema.keterangan(self, "10 lawan 250, beda *25 kali lipat*")
            b.catat(0.6)
            b.main(FadeIn(nilai_a), FadeIn(nilai_b), run_time=1.2)
            for p in (panel_jum_a, panel_jum_b):
                self.hud_tambah(p)
                p.set_opacity(0)
            b.main(panel_jum_a.animate.set_opacity(1), run_time=1.0)
            b.main(panel_jum_b.animate.set_opacity(1), run_time=1.0)
            b.main(FadeOut(panel_nol), run_time=0.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"panel A": panel_jum_a, "panel B": panel_jum_b,
                                 "panel mean": panel_mean, "nama B": nama_b,
                                 "angka": angka_ml, "botol B": botol_b,
                                 "keterangan": self._matra_keterangan},
                          [("panel A", "panel B"), ("panel A", "panel mean"),
                           ("panel B", "keterangan"), ("panel A", "botol B"),
                           ("panel B", "botol B"), ("panel B", "angka")])

        # ------------------------------------------------------------------
        # Babak 7: varian. Kelima persegi tiap mesin menyusut jadi SATU persegi
        # rata-rata, luasnya varian.
        # ------------------------------------------------------------------
        sisi_var_a = np.sqrt(2.0) * SKALA
        sisi_var_b = np.sqrt(50.0) * SKALA
        var_a = kotak(sisi_var_a, AKSEN2).move_to([-1.5, 0, Z_BARIS_A + sisi_var_a / 2])
        var_b = kotak(sisi_var_b, AKSEN).move_to([1.5, 0, Z_BARIS_B + sisi_var_b / 2])
        l_var_a = tegak(rumus("2", 24, AKSEN2)).move_to(var_a.get_center() + OUT * (sisi_var_a / 2 + 0.28))
        l_var_b = tegak(rumus("50", 26, LATAR)).move_to(var_b.get_center())

        with sinema.babak(self, "varian", DURASI) as b:
            sinema.keterangan(self, "luas rata-ratanya disebut *varian*: 2 lawan 50")
            b.catat(0.6)
            b.main(FadeOut(nilai_a), FadeOut(nilai_b), run_time=0.6)
            b.main(ReplacementTransform(persegi_a, VGroup(var_a)),
                   ReplacementTransform(persegi_b, VGroup(var_b)), run_time=2.6)
            b.main(FadeIn(l_var_a), FadeIn(l_var_b), run_time=0.8)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"varian A": var_a, "varian B": var_b,
                                 "panel B": panel_jum_b, "keterangan": self._matra_keterangan},
                          [("varian A", "varian B"), ("varian B", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 8: MOMEN PUNCAK. Empat salinan persegi bersisi 5 ternyata pas
        # mengisi persegi bersisi 10. Sisi dua kali lipat, luas empat kali lipat.
        # ------------------------------------------------------------------
        s5, s10 = 5 * SKALA, 10 * SKALA
        besar = kotak(s10, AKSEN, isi=0.22).move_to([1.35, 0, Z_BARIS_B + s10 / 2])
        kecil = [kotak(s5, AKSEN).move_to(besar.get_center() + np.array([dx, 0, dz]))
                 for dx, dz in ((-s5 / 2, -s5 / 2), (s5 / 2, -s5 / 2),
                                (-s5 / 2, s5 / 2), (s5 / 2, s5 / 2))]
        awal = kotak(s5, AKSEN).move_to([-1.9, 0, Z_BARIS_B + s5 / 2])
        l_s5 = tegak(rumus("5", 22, LATAR)).move_to(awal.get_center())
        l_s10 = tegak(rumus("10", 24, AKSEN)).move_to(besar.get_center() + OUT * (s10 / 2 + 0.30))

        with sinema.babak(self, "empatkali", DURASI) as b:
            sinema.keterangan(self, "sisi 2 kali lipat, luas *4 kali lipat*")
            b.catat(0.6)
            b.main(FadeOut(var_a), FadeOut(l_var_a), FadeOut(var_b), FadeOut(l_var_b),
                   run_time=0.8)
            b.main(FadeIn(awal), FadeIn(l_s5), FadeIn(besar), FadeIn(l_s10), run_time=1.2)
            b.main(LaggedStart(*[FadeIn(k) for k in kecil], lag_ratio=0.35), run_time=3.2)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"persegi besar": besar, "panel B": panel_jum_b,
                                 "keterangan": self._matra_keterangan},
                          [("persegi besar", "panel B"), ("persegi besar", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 9: akar. Persegi varian menyusut jadi persegi bersisi 1,41 dan
        # 7,07, dan satuannya kembali ml.
        # ------------------------------------------------------------------
        panel_akar = rumus(r"\sqrt{2} = 1{,}41", 30, AKSEN2)
        panel_akar2 = rumus(r"\sqrt{50} = 7{,}07", 30, AKSEN)
        panel_akar.next_to(panel_jum_b, DOWN, buff=0.35).align_to(panel_mean, RIGHT)
        panel_akar2.next_to(panel_akar, DOWN, buff=0.22).align_to(panel_mean, RIGHT)
        sd_a = kotak(1.41 * SKALA, AKSEN2).move_to([-1.5, 0, Z_BARIS_A + 1.41 * SKALA / 2])
        sd_b = kotak(7.07 * SKALA, AKSEN).move_to([1.5, 0, Z_BARIS_B + 7.07 * SKALA / 2])

        with sinema.babak(self, "akar", DURASI) as b:
            sinema.keterangan(self, "diakarkan supaya satuannya *kembali ml*")
            b.catat(0.6)
            b.main(FadeOut(VGroup(*kecil)), FadeOut(awal), FadeOut(l_s5),
                   FadeOut(besar), FadeOut(l_s10), run_time=1.0)
            b.main(FadeIn(sd_a), FadeIn(sd_b), run_time=1.2)
            for p in (panel_akar, panel_akar2):
                self.hud_tambah(p)
                p.set_opacity(0)
            b.main(panel_akar.animate.set_opacity(1),
                   panel_akar2.animate.set_opacity(1),
                   FadeOut(panel_jum_a), FadeOut(panel_jum_b), run_time=1.2)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"panel akar": panel_akar, "panel akar 2": panel_akar2,
                                 "botol B": botol_b,
                                 "keterangan": self._matra_keterangan},
                          [("panel akar 2", "keterangan"), ("panel akar", "botol B")])

        # ------------------------------------------------------------------
        # Babak 10: angkanya jadi kalimat. Pita selebar simpangan baku digambar
        # di sekitar 500 pada garis masing-masing mesin.
        # ------------------------------------------------------------------
        # Pita HARUS dibentuk sebelum diputar. Versi pertama memakai set_height
        # setelah `tegak()`, dan setelah diputar 90 derajat "height" sebuah benda
        # adalah rentang SUMBU Y, bukan tegaknya di layar. Akibatnya pitanya tetap
        # setinggi 1 satuan dan menindih baris angka. Ditangkap qc.periksa_adegan.
        def pita_datar(lebar, tinggi, warna):
            r = Rectangle(width=lebar, height=tinggi)
            r.set_fill(warna, opacity=0.32).set_stroke(warna, 1.2, opacity=0.7)
            return tegak(r)

        pita_a = pita_datar(2 * 1.41 * SKALA, 0.52, AKSEN2).move_to([0, 0, Z_GARIS_A + 0.21])
        pita_b = pita_datar(2 * 7.07 * SKALA, 0.52, AKSEN).move_to([0, 0, Z_GARIS_B + 0.21])

        with sinema.babak(self, "baca", DURASI) as b:
            sinema.keterangan(self, "A meleset sekitar *1,41 ml*, B sekitar *7,07 ml*")
            b.catat(0.6)
            b.main(FadeOut(sd_a), FadeOut(sd_b), FadeOut(l_mean), run_time=0.8)
            # Persegi sudah selesai tugasnya, jadi separuh bawah layar kosong.
            # Kamera turun ke kedua garis supaya pita selebar simpangan baku
            # mengisi bingkai dan bisa dibandingkan dengan mata, bukan dengan
            # mengingat angka di panel.
            b.main(kamera.dekati(frame, [0, 0, 3.75], 3.4), run_time=3.4)
            b.main(GrowFromCenter(pita_a), run_time=1.4)
            b.main(GrowFromCenter(pita_b), run_time=1.4)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"pita A": pita_a, "pita B": pita_b, "angka": angka_ml,
                                 "keterangan": self._matra_keterangan},
                          [("pita B", "angka"), ("pita A", "keterangan")])

        # ------------------------------------------------------------------
        # Babak 11: jawaban pertanyaan pembuka. Botol Mesin B yang berisi 490
        # disorot: itulah botol yang sampai ke pembeli dalam keadaan kurang isi.
        # ------------------------------------------------------------------
        with sinema.babak(self, "tutup", DURASI) as b:
            sinema.keterangan(self, "botol berlabel 500 ml yang isinya *490 ml*", warna=SOROT)
            b.catat(0.6)
            b.main(Indicate(botol_b[0], scale_factor=1.8, color=SOROT), run_time=1.6)
            b.main(kamera.putar_pelan(frame, derajat=5), run_time=3.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"panel akar": panel_akar, "panel akar 2": panel_akar2,
                                 "pita B": pita_b, "keterangan": self._matra_keterangan},
                          [("panel akar 2", "keterangan"), ("pita B", "keterangan")])
