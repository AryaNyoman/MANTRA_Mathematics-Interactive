"""Materi 08 Statistika: simpangan baku, persegi yang tumbuh kuadrat (ManimGL).

Storyboard: docs/superpowers/specs/2026-09-02-statistika-video-8-storyboard.md
Naskah    : manim/narasi/statistika8-simpangan.json (11 segmen, 125 detik)

Gagasan pokok: simpangan baku bukan rumus berlapis yang harus dihafal, melainkan
jawaban atas satu masalah yang muncul sendiri. Jarak ke mean tidak bisa dijumlah
karena jumlahnya SELALU nol; kuadrat dipakai untuk membuang tanda minus; akar
dipakai untuk mengembalikan satuannya.

TATA LETAK, keputusan ARYA 2 Sep 2026 malam:
- Tidak ada keterangan di bawah layar. Jalur itu milik subtitle, dan menulis
  ulang kalimat di sana berarti dua kalimat berbeda untuk satu maksud yang sama.
- Kiri atas: PAPAN RUMUS yang tumbuh. Rumus dibangun di depan mata, sepotong
  demi sepotong, dan tiap pertumbuhan diberi satu kata yang menyebut operasinya
  supaya siswa tahu potongan baru itu datang dari mana. Rantainya:
      x - x̄  →  Σ(x - x̄) = 0  →  (x - x̄)²  →  Σ(x - x̄)²  →  Σ(x - x̄)²/n  →  akarnya
- Kanan atas: panel ANGKA hasil hitungan.
- Dunia digeser turun supaya jalur teks di atas benar-benar kosong, dan seluruh
  panel diperiksa SILANG terhadap seluruh benda dunia oleh qc.

Momen puncak: babak `empatkali`. Empat salinan persegi bersisi 5 ternyata PAS
mengisi persegi bersisi 10. Sisi dua kali lipat, luas empat kali lipat.

Satu warna satu makna DI DALAM video ini:
    AKSEN2 biru = Mesin A          AKSEN bata = Mesin B
    SOROT ungu  = mean 500          TINTA/REDUP = garis, angka, rumus
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
SKALA = 0.17                          # 1 ml = 0,17 satuan dunia


def xw(ml):
    """Letak mendatar sebuah pengukuran; 500 ml duduk di x = 0."""
    return (ml - MEAN) * SKALA


# --- Tinggi tiap lapis. Semuanya diturunkan dibanding susunan pertama supaya
#     jalur teks di sepertiga atas layar benar-benar kosong.
Z_GARIS_A = 3.10
Z_GARIS_B = 2.40
Z_ANGKA = 2.08
Z_BARIS_A = 1.55                      # alas persegi Mesin A
Z_BARIS_B = -0.35                     # alas persegi Mesin B
TINGGI_BOTOL = 0.26
JARI_BOTOL = 0.065
TEBAL_BILAH = 0.09
SELA = 0.12


def simpangan(nilai):
    return nilai - MEAN


def tegak(mob):
    """Berdirikan teks di bidang xz supaya menghadap kamera yang sejajar tanah."""
    return mob.rotate(90 * DEGREES, RIGHT)


def kotak(sisi, warna, isi=1.0):
    r = Rectangle(width=max(sisi, 0.001), height=max(sisi, 0.001))
    r.set_fill(warna, opacity=isi).set_stroke(LATAR, 1.2)
    return tegak(r)


def bilah(panjang, warna):
    r = Rectangle(width=max(panjang, 0.02), height=TEBAL_BILAH)
    r.set_fill(warna, opacity=1).set_stroke(LATAR, 1.0)
    return tegak(r)


def pita_datar(lebar, tinggi, warna):
    """Pita HARUS dibentuk sebelum diputar: sesudah `tegak()`, "height" sebuah
    benda adalah rentang sumbu y, bukan tegaknya di layar."""
    r = Rectangle(width=lebar, height=tinggi)
    r.set_fill(warna, opacity=0.32).set_stroke(warna, 1.2, opacity=0.7)
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
    samples = 4                       # penghalus tepi; bawaan ManimGL 0

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        # Kamus ini dipelihara sepanjang adegan dan diserahkan UTUH ke qc tiap
        # babak. Menyerahkan sebagian daftar adalah sumber SEMUA tabrakan yang
        # lolos sejauh ini: dua kali panel menindih garis bilangan semata karena
        # pasangannya tidak saya tuliskan. Yang ditambahkan ke sini akan diperiksa
        # silang terhadap segalanya, tanpa perlu diingat lagi.
        DUNIA, HUD = {}, {}

        def periksa(pasangan=None):
            hidup_d = {k: v for k, v in DUNIA.items() if v is not None}
            hidup_h = {k: v for k, v in HUD.items() if v is not None}
            if papan.semua() is not None:      # kosong di dua babak pertama
                hidup_h["papan rumus"] = papan.semua()
            qc.periksa_adegan(self, {}, pasangan=pasangan, hud=hidup_h,
                              dunia=hidup_d, jaga_jalur_bawah=True)
        LAMA_TUMBUH = 1.2 + papan.waktu_alasan()   # tumbuh + kata alasan yang memudar

        # ------------------------------------------------------------------
        # Panggung: dua garis ukur, sepuluh botol, satu garis mean bersama.
        # ------------------------------------------------------------------
        def garis(z):
            return ilustrasi.balok(6.0, 0.5, 0.05, REDUP).shift([0, 0, z])

        garis_a, garis_b = garis(Z_GARIS_A), garis(Z_GARIS_B)

        def botol(nilai, z, warna):
            return ilustrasi.silinder(JARI_BOTOL, TINGGI_BOTOL, warna).shift([xw(nilai), 0, z + 0.05])

        botol_a = Group(*[botol(v, Z_GARIS_A, AKSEN2) for v in A])
        botol_b = Group(*[botol(v, Z_GARIS_B, AKSEN) for v in B])
        for i, s in enumerate(list(botol_a) + list(botol_b)):
            s.fase = 1.3 * i
            s.z_lalu = 0.0

        def goyang(m):
            z = 0.016 * np.sin(1.5 * self.time + m.fase)
            m.shift(OUT * (z - m.z_lalu))
            m.z_lalu = z

        for s in list(botol_a) + list(botol_b):
            s.add_updater(goyang)

        angka_ml = VGroup()
        for v in (490, 495, 500, 505, 510):
            angka_ml.add(tegak(rumus(str(v), 23, TINTA)).move_to([xw(v), 0, Z_ANGKA]))

        # Nama mesin ditaruh DI BAWAH garisnya, bukan di atas: di atas garis A ia
        # masuk jalur papan rumus di kiri atas.
        nama_a = tegak(teks("Mesin A", 23, AKSEN2)).move_to([-2.15, 0, Z_GARIS_A + 0.24])
        nama_b = tegak(teks("Mesin B", 23, AKSEN)).move_to([-2.15, 0, Z_GARIS_B + 0.22])

        garis_mean = ilustrasi.balok(0.05, 0.4, 1.30, SOROT).shift([0, 0, Z_ANGKA + 0.16])
        l_mean = tegak(teks("500", 21, SOROT)).move_to([0.58, 0, Z_GARIS_A + 0.26])

        # ------------------------------------------------------------------
        # Babak 1: dunia dulu, miring dan dekat, lalu SATU gerakan ke pandangan datar.
        # ------------------------------------------------------------------
        kamera.pasang_awal(frame, theta=-20, phi=72, pusat=(0, 0, 2.7), tinggi=3.6)
        self.add(garis_a, garis_b)
        DUNIA.update({"garis A": garis_a, "garis B": garis_b, "nama A": nama_a,
                      "nama B": nama_b, "angka": angka_ml, "botol A": botol_a,
                      "botol B": botol_b})

        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 08: Simpangan baku", lama=3.0, y=2.6)
            b.catat(3.0)
            b.main(FadeIn(nama_a), FadeIn(nama_b), run_time=0.8)
            b.main(LaggedStartMap(FadeIn, botol_a, lag_ratio=0.25),
                   LaggedStartMap(FadeIn, botol_b, lag_ratio=0.25), run_time=2.6)
            b.main(kamera.sudut(frame, theta=0, phi=86, pusat=(0, 0, 1.45), tinggi=6.4),
                   FadeIn(angka_ml), run_time=3.2)
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 2: pusatnya sama. Inilah jebakan soalnya.
        # ------------------------------------------------------------------
        panel_mean = rumus(r"\bar{x}_A = \bar{x}_B = 500", 30, SOROT).to_corner(UR, buff=0.5)
        with sinema.babak(self, "sama", DURASI) as b:
            garis_mean.set_opacity(0)
            self.add(garis_mean)
            b.main(garis_mean.animate.set_opacity(1), run_time=1.2)
            DUNIA["label 500"] = l_mean
            b.main(FadeIn(l_mean), run_time=0.8)
            HUD["panel mean"] = panel_mean
            self.hud_tambah(panel_mean)
            panel_mean.set_opacity(0)
            b.main(panel_mean.animate.set_opacity(1), run_time=0.8)
            b.main(Indicate(botol_a[2], scale_factor=1.6, color=SOROT),
                   Indicate(botol_b[2], scale_factor=1.6, color=SOROT), run_time=1.4)
            b.main(kamera.dekati(frame, [0, 0, 1.45], 6.2), run_time=2.4)
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 3: jarak tiap botol ke mean. Rumusnya LAHIR di sini.
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

        tanda_a = VGroup(*[tegak(rumus(f"{int(simpangan(v)):+d}", 19, AKSEN2)) for v in A])
        tanda_b = VGroup(*[tegak(rumus(f"{int(simpangan(v)):+d}", 19, AKSEN)) for v in B])
        for t, g in zip(list(tanda_a) + list(tanda_b), list(bilah_a) + list(bilah_b)):
            t.move_to(g.get_center() + OUT * 0.26)

        with sinema.babak(self, "simpangan", DURASI) as b:
            papan.tumbuh(r"x - \bar{x}", "jarak ke rata-rata")
            b.catat(LAMA_TUMBUH)
            DUNIA.update({"bilah A": bilah_a, "bilah B": bilah_b})
            b.main(LaggedStartMap(FadeIn, bilah_a, lag_ratio=0.2), run_time=1.7)
            b.main(LaggedStartMap(FadeIn, bilah_b, lag_ratio=0.2), run_time=1.7)
            b.main(FadeIn(tanda_a), FadeIn(tanda_b), run_time=1.0)
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 4: kenapa menjumlah gagal. Pasangan bertanda berlawanan bertemu
        # lalu lenyap berdua, jadi yang terbaca "saling meniadakan", bukan "hilang".
        # ------------------------------------------------------------------
        def hapus_pasangan(bilah_grup, tanda_grup, z_alas):
            temu = np.array([0.0, 0.0, z_alas + TEBAL_BILAH / 2])
            gerak = []
            for i, j in ((0, 4), (1, 3)):
                gerak += [bilah_grup[i].animate.move_to(temu),
                          bilah_grup[j].animate.move_to(temu),
                          tanda_grup[i].animate.move_to(temu + OUT * 0.26).set_opacity(0),
                          tanda_grup[j].animate.move_to(temu + OUT * 0.26).set_opacity(0)]
            return gerak

        with sinema.babak(self, "nol", DURASI) as b:
            papan.tumbuh(r"\sum (x - \bar{x}) = 0", "dijumlahkan: selalu nol")
            b.catat(LAMA_TUMBUH)
            b.main(*hapus_pasangan(bilah_a, tanda_a, Z_BARIS_A),
                   *hapus_pasangan(bilah_b, tanda_b, Z_BARIS_B), run_time=3.4)
            b.main(FadeOut(bilah_a), FadeOut(bilah_b),
                   FadeOut(tanda_a), FadeOut(tanda_b), run_time=1.4)
            DUNIA["bilah A"] = DUNIA["bilah B"] = None
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 5: kuadrat. Tiap jarak jadi SISI sebuah persegi, dan di sinilah
        # tanda minusnya lenyap tanpa dihapus paksa.
        # ------------------------------------------------------------------
        persegi_a = VGroup(*[kotak(s, AKSEN2) for s in sisi_a])
        persegi_b = VGroup(*[kotak(s, AKSEN) for s in sisi_b])
        for g, p in zip(list(persegi_a) + list(persegi_b), list(pusat_a) + list(pusat_b)):
            g.move_to(p)

        nilai_a = VGroup(*[tegak(rumus(str(int(simpangan(v) ** 2)), 17, LATAR)) for v in A])
        nilai_b = VGroup(*[tegak(rumus(str(int(simpangan(v) ** 2)), 17, LATAR)) for v in B])
        for t, g in zip(list(nilai_a) + list(nilai_b), list(persegi_a) + list(persegi_b)):
            t.move_to(g.get_center())

        with sinema.babak(self, "kuadrat", DURASI) as b:
            papan.tumbuh(r"(x - \bar{x})^2", "dikuadratkan")
            b.catat(LAMA_TUMBUH)
            DUNIA.update({"persegi A": persegi_a, "persegi B": persegi_b})
            b.main(LaggedStartMap(GrowFromCenter, persegi_a, lag_ratio=0.2), run_time=2.1)
            b.main(LaggedStartMap(GrowFromCenter, persegi_b, lag_ratio=0.2), run_time=2.5)
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 6: luasnya dijumlahkan.
        # ------------------------------------------------------------------
        panel_jum_a = rumus(r"A:\ 10", 30, AKSEN2)
        panel_jum_b = rumus(r"B:\ 250", 30, AKSEN)
        panel_jum_a.next_to(panel_mean, DOWN, buff=0.34).align_to(panel_mean, RIGHT)
        panel_jum_b.next_to(panel_jum_a, DOWN, buff=0.30).align_to(panel_mean, RIGHT)

        with sinema.babak(self, "luas", DURASI) as b:
            papan.tumbuh(r"\sum (x - \bar{x})^2", "luasnya dijumlahkan")
            b.catat(LAMA_TUMBUH)
            b.main(FadeIn(nilai_a), FadeIn(nilai_b), run_time=1.2)
            HUD.update({"panel A": panel_jum_a, "panel B": panel_jum_b})
            for p in (panel_jum_a, panel_jum_b):
                self.hud_tambah(p)
                p.set_opacity(0)
            b.main(panel_jum_a.animate.set_opacity(1), run_time=1.0)
            b.main(panel_jum_b.animate.set_opacity(1), run_time=1.0)
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 7: varian, luas rata-rata.
        # ------------------------------------------------------------------
        sisi_var_a = np.sqrt(2.0) * SKALA
        sisi_var_b = np.sqrt(50.0) * SKALA
        var_a = kotak(sisi_var_a, AKSEN2).move_to([-1.5, 0, Z_BARIS_A + sisi_var_a / 2])
        var_b = kotak(sisi_var_b, AKSEN).move_to([1.5, 0, Z_BARIS_B + sisi_var_b / 2])
        l_var_a = tegak(rumus("2", 22, AKSEN2)).move_to(
            var_a.get_center() + OUT * (sisi_var_a / 2 + 0.26))
        l_var_b = tegak(rumus("50", 24, LATAR)).move_to(var_b.get_center())

        with sinema.babak(self, "varian", DURASI) as b:
            papan.tumbuh(r"\frac{\sum (x - \bar{x})^2}{n}", "dibagi n: varian")
            b.catat(LAMA_TUMBUH)
            b.main(FadeOut(nilai_a), FadeOut(nilai_b), run_time=0.6)
            b.main(ReplacementTransform(persegi_a, VGroup(var_a)),
                   ReplacementTransform(persegi_b, VGroup(var_b)), run_time=2.5)
            DUNIA["persegi A"] = DUNIA["persegi B"] = None
            DUNIA.update({"varian A": var_a, "varian B": var_b})
            b.main(FadeIn(l_var_a), FadeIn(l_var_b), run_time=0.8)
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 8: MOMEN PUNCAK. Empat salinan persegi bersisi 5 PAS mengisi
        # persegi bersisi 10. Papan rumus sengaja tidak tumbuh di sini: ini
        # sisipan yang menjelaskan KENAPA kuadrat begitu peka, bukan langkah baru.
        # ------------------------------------------------------------------
        s5, s10 = 5 * SKALA, 10 * SKALA
        besar = kotak(s10, AKSEN, isi=0.22).move_to([1.35, 0, Z_BARIS_B + s10 / 2])
        kecil = [kotak(s5, AKSEN).move_to(besar.get_center() + np.array([dx, 0, dz]))
                 for dx, dz in ((-s5 / 2, -s5 / 2), (s5 / 2, -s5 / 2),
                                (-s5 / 2, s5 / 2), (s5 / 2, s5 / 2))]
        awal = kotak(s5, AKSEN).move_to([-1.9, 0, Z_BARIS_B + s5 / 2])
        l_s5 = tegak(rumus("5", 20, LATAR)).move_to(awal.get_center())
        l_s10 = tegak(rumus("10", 22, AKSEN)).move_to(besar.get_center() + OUT * (s10 / 2 + 0.28))

        with sinema.babak(self, "empatkali", DURASI) as b:
            b.main(FadeOut(var_a), FadeOut(l_var_a), FadeOut(var_b), FadeOut(l_var_b),
                   run_time=0.8)
            b.main(FadeIn(awal), FadeIn(l_s5), FadeIn(besar), FadeIn(l_s10), run_time=1.2)
            DUNIA["varian A"] = DUNIA["varian B"] = None
            DUNIA["persegi besar"] = besar
            b.main(LaggedStart(*[FadeIn(k) for k in kecil], lag_ratio=0.35), run_time=3.2)
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 9: akar. Satuannya kembali ke ml.
        # ------------------------------------------------------------------
        panel_akar = rumus(r"\sqrt{2} = 1{,}41", 28, AKSEN2)
        panel_akar2 = rumus(r"\sqrt{50} = 7{,}07", 28, AKSEN)
        panel_akar.to_corner(UR, buff=0.5).shift(DOWN * 1.15)
        panel_akar2.to_corner(UR, buff=0.5).shift(DOWN * 1.85)
        sd_a = kotak(1.41 * SKALA, AKSEN2).move_to([-1.5, 0, Z_BARIS_A + 1.41 * SKALA / 2])
        sd_b = kotak(7.07 * SKALA, AKSEN).move_to([1.5, 0, Z_BARIS_B + 7.07 * SKALA / 2])

        with sinema.babak(self, "akar", DURASI) as b:
            papan.tumbuh(r"\sqrt{\frac{\sum (x - \bar{x})^2}{n}}", "diakarkan: satuan ml")
            b.catat(LAMA_TUMBUH)
            b.main(FadeOut(VGroup(*kecil)), FadeOut(awal), FadeOut(l_s5),
                   FadeOut(besar), FadeOut(l_s10), run_time=1.0)
            DUNIA["persegi besar"] = None
            DUNIA.update({"kotak A": sd_a, "kotak B": sd_b})
            b.main(FadeIn(sd_a), FadeIn(sd_b), run_time=1.2)
            for p in (panel_akar, panel_akar2):
                self.hud_tambah(p)
                p.set_opacity(0)
            b.main(panel_akar.animate.set_opacity(1), panel_akar2.animate.set_opacity(1),
                   FadeOut(panel_jum_a), FadeOut(panel_jum_b), run_time=1.2)
            HUD["panel A"] = HUD["panel B"] = None
            HUD.update({"panel akar": panel_akar, "panel akar 2": panel_akar2})
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 10: angkanya jadi pita selebar simpangan baku di sekitar 500.
        # ------------------------------------------------------------------
        pita_a = pita_datar(2 * 1.41 * SKALA, 0.48, AKSEN2).move_to([0, 0, Z_GARIS_A + 0.19])
        pita_b = pita_datar(2 * 7.07 * SKALA, 0.48, AKSEN).move_to([0, 0, Z_GARIS_B + 0.19])

        with sinema.babak(self, "baca", DURASI) as b:
            b.main(FadeOut(sd_a), FadeOut(sd_b), FadeOut(l_mean), run_time=0.8)
            # Persegi sudah selesai tugasnya dan separuh bawah layar jadi kosong.
            # Kamera turun ke kedua garis supaya lebar kedua pita bisa dibandingkan
            # dengan mata, bukan dengan mengingat angka di panel.
            b.main(kamera.dekati(frame, [0, 0, 2.72], 3.6), run_time=3.4)
            DUNIA["kotak A"] = DUNIA["kotak B"] = DUNIA["label 500"] = None
            DUNIA.update({"pita A": pita_a, "pita B": pita_b})
            b.main(GrowFromCenter(pita_a), run_time=1.4)
            b.main(GrowFromCenter(pita_b), run_time=1.4)
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 11: jawaban pertanyaan pembuka. Botol Mesin B berisi 490 disorot.
        # ------------------------------------------------------------------
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(Indicate(botol_b[0], scale_factor=1.8, color=SOROT), run_time=1.6)
            b.main(kamera.putar_pelan(frame, derajat=5), run_time=3.6)
            b.jeda(1.6)
        periksa()
