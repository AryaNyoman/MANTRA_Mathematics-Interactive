"""Statistika Materi 08, Ukuran Pemusatan dan Penyebaran Bagian 4: simpangan
baku, persegi yang tumbuh kuadrat (ManimGL).
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (2:05)
yang sudah disetujui ARYA. DUNIANYA SAMA: dua garis ukur dengan lima botol
bervolume tiap mesin, satu garis mean bersama; jarak tiap botol ke 500 jadi
bilah bertanda; pasangan bertanda berlawanan bertemu lalu lenyap (jumlahnya
nol); tiap jarak jadi sisi persegi; luas 10 lawan 250; varian = persegi
rata-rata; empat persegi bersisi 5 mengisi persegi bersisi 10; akar
mengembalikan satuan; pita selebar simpangan baku; botol 490 disorot.

YANG BERBEDA: pembuka sub-bab plus Bagian 4 dengan pertanyaan halaman;
segar-ingat Bagian 1 (titik seimbang, jumlah jarak kiri = kanan) yang
disambung ke babak nol; bentuk umum s = akar(jumlah kuadrat simpangan / n)
dan varian s kuadrat dibaca di panel; penutup menunjuk Bagian 5 (tabel);
tiap kejadian dipicu pada KATA; rantai rumus di panel tetap tumbuh dengan
morph, kata alasannya dipakai hanya bila waktunya cukup.

Rantai panel: x - x̄ → Σ(x - x̄) → Σ(x - x̄) = 0 → (x - x̄)² → Σ(x - x̄)²
→ Σ(x - x̄)²/n → √(...) → s = √(...), lalu baris s² = ....

Satu warna satu makna: AKSEN2 biru = Mesin A, AKSEN bata = Mesin B, SOROT
ungu = mean 500 dan sorotan, TINTA/REDUP = garis, angka, rumus.
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
KATA = sinema.JamKata(TOPIK)

# --- Data. Sudah lolos dua pemeriksa sebagai `t08-mesin-a` dan `t08-mesin-b`.
A = [498, 499, 500, 501, 502]        # simpangan -2 -1 0 1 2, kuadrat 4 1 0 1 4, jumlah 10
B = [490, 495, 500, 505, 510]        # simpangan -10 -5 0 5 10, kuadrat 100 25 0 25 100, jumlah 250
MEAN = 500.0
SKALA = 0.17                          # 1 ml = 0,17 satuan dunia


def xw(ml):
    """Letak mendatar sebuah pengukuran; 500 ml duduk di x = 0."""
    return (ml - MEAN) * SKALA


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


def pita_datar(lebar, tinggi, warna, isi=0.32):
    r = Rectangle(width=lebar, height=tinggi)
    r.set_fill(warna, opacity=isi).set_stroke(warna, 1.2, opacity=0.7)
    return tegak(r)


def baris_jajar(sisi_list, z_alas, x_tengah=0.0, sela=SELA):
    lebar = sum(sisi_list) + sela * (len(sisi_list) - 1)
    x = x_tengah - lebar / 2
    hasil = []
    for s in sisi_list:
        hasil.append(np.array([x + s / 2, 0.0, z_alas + s / 2]))
        x += s + sela
    return hasil


class Simpangan8(AdeganMatra):
    samples = 4                       # penghalus tepi; bawaan ManimGL 0

    def sorot_pita(self, b, *mobs, lama=1.0, lebih=0.2):
        pita = VGroup()
        for m in mobs:
            p = Rectangle(width=m.get_width() + lebih, height=m.get_depth() + lebih)
            p.set_stroke(width=0).set_fill(SOROT, 0.35)
            pita.add(tegak(p).move_to(m.get_center() + IN * 0.03))
        self.add(pita)
        b.main(FadeIn(pita), run_time=lama * 0.35)
        b.main(FadeOut(pita), run_time=lama * 0.65)
        self.remove(pita)

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        DUNIA, HUD = {}, {}
        PASANGAN_TETAP = [("nama A", "botol A"), ("nama B", "botol B")]

        def periksa(pasangan=None):
            pasangan = PASANGAN_TETAP + list(pasangan or [])
            hidup_d = {k: v for k, v in DUNIA.items() if v is not None}
            hidup_h = {k: v for k, v in HUD.items() if v is not None}
            if papan.semua() is not None:
                hidup_h["papan rumus"] = papan.semua()
            qc.periksa_adegan(self, {}, pasangan=pasangan, hud=hidup_h,
                              dunia=hidup_d, jaga_jalur_bawah=True)
        LAMA_TUMBUH = 1.2 + papan.waktu_alasan()   # tumbuh + kata alasan yang memudar

        # Panggung: dua garis ukur, sepuluh botol, satu garis mean bersama.
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

        nama_a = tegak(teks("Mesin A", 23, AKSEN2)).move_to([-2.15, 0, Z_GARIS_A + 0.24])
        nama_b = tegak(teks("Mesin B", 23, AKSEN)).move_to([-2.40, 0, Z_GARIS_B + 0.22])

        garis_mean = ilustrasi.balok(0.05, 0.4, 1.30, SOROT).shift([0, 0, Z_ANGKA + 0.16])
        l_mean = tegak(rumus(r"\bar{x}_A = \bar{x}_B = 500", 22, SOROT)).move_to([1.35, 0, Z_GARIS_A + 0.30])

        # ------------------------------------------------------------------
        # buka: dunia miring dan dekat; judul sub-bab, dua mesin, pertanyaannya.
        # ------------------------------------------------------------------
        kamera.pasang_awal(frame, theta=-20, phi=72, pusat=(0, 0, 2.7), tinggi=3.6)
        self.add(garis_a, garis_b)
        DUNIA.update({"garis A": garis_a, "garis B": garis_b, "nama A": nama_a,
                      "nama B": nama_b, "botol A": botol_a, "botol B": botol_b})

        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ukuran")
            sinema.judul_pembuka(self, "Ukuran Pemusatan dan Penyebaran, Bagian 4", lama=3.6, y=2.6)
            b.catat(3.6)
            b.tunggu_kata("Dua mesin")
            b.main(FadeIn(nama_a), FadeIn(nama_b), run_time=0.6)
            b.main(LaggedStartMap(FadeIn, botol_a, lag_ratio=0.25),
                   LaggedStartMap(FadeIn, botol_b, lag_ratio=0.25), run_time=1.8)
            b.tunggu_kata("ditolak")
            b.main(LaggedStartMap(lambda m, **kw: Indicate(m, scale_factor=1.5, color=SOROT, **kw),
                                  botol_b, lag_ratio=0.15), run_time=1.0)
        periksa()

        # ------------------------------------------------------------------
        # ingat: SATU gerakan ke pandangan datar; titik seimbang dari Bagian 1
        # diperagakan pada garis Mesin B: tumpuan di 500, pita kiri dan kanan.
        # ------------------------------------------------------------------
        penopang = ilustrasi.penopang(0.5, 0.36, 0.6).shift([0, 0, Z_GARIS_B - 0.36])
        pita_kiri = pita_datar(xw(500) - xw(490), 0.30, AKSEN2).move_to([(xw(490) + xw(500)) / 2, 0, Z_GARIS_B + 0.18])
        pita_kanan = pita_datar(xw(510) - xw(500), 0.30, AKSEN).move_to([(xw(500) + xw(510)) / 2, 0, Z_GARIS_B + 0.18])
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Bagian")
            b.main(kamera.sudut(frame, theta=0, phi=86, pusat=(0, 0, 1.45), tinggi=6.4), run_time=2.0)
            b.tunggu_kata("titik seimbang")
            DUNIA["penopang"] = penopang
            b.main(GrowFromCenter(penopang), run_time=0.6)
            b.tunggu_kata("jumlah jarak")
            DUNIA["pita kiri"] = pita_kiri
            b.main(GrowFromEdge(pita_kiri, RIGHT), run_time=0.8)
            b.tunggu_kata("jumlah jarak", ke=2)
            DUNIA["pita kanan"] = pita_kanan
            b.main(GrowFromEdge(pita_kanan, LEFT), run_time=0.8)
            b.tunggu_kata("Ingat")
            b.main(FadeOut(penopang), FadeOut(pita_kiri), FadeOut(pita_kanan), run_time=0.6)
            DUNIA["penopang"] = DUNIA["pita kiri"] = DUNIA["pita kanan"] = None
        periksa()

        # ------------------------------------------------------------------
        # botol: lima botol tiap mesin, angkanya dibaca.
        # ------------------------------------------------------------------
        with sinema.babak(self, "botol", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sebuah")
            HUD["identitas"] = sinema.identitas(self, "5 botol tiap mesin", "botol berlabel 500 ml")
            HUD["identitas"].set_opacity(0)
            b.main(HUD["identitas"].animate.set_opacity(1), run_time=0.6)
            b.tunggu_kata("lima botol")
            b.main(LaggedStartMap(lambda m, **kw: Indicate(m, scale_factor=1.4, color=SOROT, **kw),
                                  Group(*botol_a, *botol_b), lag_ratio=0.1), run_time=1.6)
            b.tunggu_kata("hasilnya")
            DUNIA["angka"] = angka_ml
            b.main(FadeIn(angka_ml), run_time=0.8)
        periksa()

        # ------------------------------------------------------------------
        # sama: pusatnya sama. Inilah jebakan soalnya.
        # ------------------------------------------------------------------
        with sinema.babak(self, "sama", DURASI, kata=KATA) as b:
            b.tunggu_kata("Rata-rata")
            garis_mean.set_opacity(0)
            self.add(garis_mean)
            DUNIA["garis mean"] = garis_mean
            DUNIA["label 500"] = l_mean
            b.main(garis_mean.animate.set_opacity(1), FadeIn(l_mean), run_time=1.0)
            b.tunggu_kata("sama persis")
            b.main(Indicate(botol_a[2], scale_factor=1.6, color=SOROT),
                   Indicate(botol_b[2], scale_factor=1.6, color=SOROT), run_time=1.0)
            b.tunggu_kata("lulus")
            b.main(Indicate(nama_a, scale_factor=1.2, color=SOROT), Indicate(nama_b, scale_factor=1.2, color=SOROT),
                   run_time=0.9)
            b.tunggu_kata("sebarannya")
            self.sorot_pita(b, Group(*botol_b), lama=1.2, lebih=0.3)
        periksa()

        # ------------------------------------------------------------------
        # simpangan: jarak tiap botol ke mean. Rumusnya LAHIR di sini.
        # ------------------------------------------------------------------
        sisi_a = [abs(simpangan(v)) * SKALA for v in A]
        sisi_b = [abs(simpangan(v)) * SKALA for v in B]
        # Sela Mesin A dilebarkan: bilahnya cuma 0,0 sampai 0,34 satuan, dan
        # angka tandanya (-1, 0, +1) saling menempel di 480p (12 Sep).
        pusat_a = baris_jajar(sisi_a, Z_BARIS_A, sela=0.34)
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

        with sinema.babak(self, "simpangan", DURASI, kata=KATA) as b:
            b.tunggu_kata("bukan pusatnya")
            papan.tumbuh(r"x - \bar{x}", "jaraknya")
            b.catat(LAMA_TUMBUH)
            b.tunggu_kata("Kita gambar")
            DUNIA.update({"bilah A": bilah_a, "bilah B": bilah_b})
            b.main(LaggedStartMap(FadeIn, bilah_a, lag_ratio=0.2), run_time=1.1)
            b.main(LaggedStartMap(FadeIn, bilah_b, lag_ratio=0.2), run_time=1.1)
            b.tunggu_kata("Punya")
            b.main(FadeIn(tanda_a), FadeIn(tanda_b), run_time=0.7)
            b.tunggu_kata("jauh lebih")
            self.sorot_pita(b, bilah_b, lama=1.2)
        periksa()

        # ------------------------------------------------------------------
        # nol: menjumlah gagal. Pasangan bertanda berlawanan bertemu lalu lenyap.
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

        with sinema.babak(self, "nol", DURASI, kata=KATA) as b:
            b.tunggu_kata("jumlahkan")
            papan.tumbuh(r"\sum (x - \bar{x})", None, run_time=1.2, b=b)
            b.tunggu_kata("Yang di kiri")
            b.main(*hapus_pasangan(bilah_a, tanda_a, Z_BARIS_A),
                   *hapus_pasangan(bilah_b, tanda_b, Z_BARIS_B), run_time=2.8)
            b.tunggu_kata("Dua-duanya")
            papan.tumbuh(r"\sum (x - \bar{x}) = 0", None, run_time=1.0, b=b)
            b.main(FadeOut(bilah_a), FadeOut(bilah_b), FadeOut(tanda_a), FadeOut(tanda_b), run_time=0.25)
            DUNIA["bilah A"] = DUNIA["bilah B"] = None
            b.tunggu_kata("persis")
            b.main(Indicate(papan.utama, scale_factor=1.0, color=SOROT), run_time=0.9)
        periksa()

        # ------------------------------------------------------------------
        # kuadrat: tiap jarak jadi SISI sebuah persegi.
        # ------------------------------------------------------------------
        persegi_a = VGroup(*[kotak(s, AKSEN2) for s in sisi_a])
        persegi_b = VGroup(*[kotak(s, AKSEN) for s in sisi_b])
        for g, p in zip(list(persegi_a) + list(persegi_b), list(pusat_a) + list(pusat_b)):
            g.move_to(p)

        nilai_a = VGroup(*[tegak(rumus(str(int(simpangan(v) ** 2)), 17, LATAR)) for v in A])
        nilai_b = VGroup(*[tegak(rumus(str(int(simpangan(v) ** 2)), 17, LATAR)) for v in B])
        for t, g in zip(list(nilai_a) + list(nilai_b), list(persegi_a) + list(persegi_b)):
            t.move_to(g.get_center())

        with sinema.babak(self, "kuadrat", DURASI, kata=KATA) as b:
            b.tunggu_kata("mengkuadratkan")
            papan.tumbuh(r"(x - \bar{x})^2", "dikuadratkan")
            b.catat(LAMA_TUMBUH)
            b.tunggu_kata("tiap jarak")
            DUNIA.update({"persegi A": persegi_a, "persegi B": persegi_b})
            b.main(LaggedStartMap(GrowFromCenter, persegi_a, lag_ratio=0.2), run_time=1.3)
            b.main(LaggedStartMap(GrowFromCenter, persegi_b, lag_ratio=0.2), run_time=1.6)
        periksa()

        # ------------------------------------------------------------------
        # luas: luasnya dijumlahkan.
        # ------------------------------------------------------------------
        with sinema.babak(self, "luas", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang")
            papan.tumbuh(r"\sum (x - \bar{x})^2", None, run_time=0.9, b=b)
            b.tunggu_kata("luasnya")
            b.main(FadeIn(nilai_a), FadeIn(nilai_b), run_time=0.8)
            b.tunggu_kata("sepuluh")
            baris_a = papan.baris(r"A:\ 10", AKSEN2, b=b)
            b.tunggu_kata("dua ratus")
            baris_b = papan.baris(r"B:\ 250", AKSEN, b=b)
            b.tunggu_kata("dua puluh lima")
            b.main(Indicate(VGroup(baris_a, baris_b), scale_factor=1.0, color=SOROT), run_time=1.0)
        periksa()

        # ------------------------------------------------------------------
        # varian: luas rata-rata. Dua baris temuan dipadamkan sebelum rumus
        # utamanya meninggi jadi pecahan (menjulur ke slot baris pertama).
        # ------------------------------------------------------------------
        sisi_var_a = np.sqrt(2.0) * SKALA
        sisi_var_b = np.sqrt(50.0) * SKALA
        var_a = kotak(sisi_var_a, AKSEN2).move_to([-1.5, 0, Z_BARIS_A + sisi_var_a / 2])
        var_b = kotak(sisi_var_b, AKSEN).move_to([1.5, 0, Z_BARIS_B + sisi_var_b / 2])
        # Di KANAN perseginya, bukan di atas: di atas ia menindih angka 490
        # pada penggaris (lembar kontak 480p 12 Sep).
        l_var_a = tegak(rumus("2", 22, AKSEN2)).move_to(var_a.get_center() + RIGHT * (sisi_var_a / 2 + 0.28))
        l_var_b = tegak(rumus("50", 24, LATAR)).move_to(var_b.get_center())

        with sinema.babak(self, "varian", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dibagi")
            if papan.baris_lain:
                b.main(*[FadeOut(m) for m in papan.baris_lain], run_time=0.4)
                for m in papan.baris_lain:
                    if m in self.hud:
                        self.hud.remove(m)
                papan.baris_lain = []
            papan.tumbuh(r"\frac{\sum (x - \bar{x})^2}{n}", None, run_time=1.0, b=b)
            b.tunggu_kata("tersisa")
            b.main(FadeOut(nilai_a), FadeOut(nilai_b), run_time=0.4)
            b.main(ReplacementTransform(persegi_a, VGroup(var_a)),
                   ReplacementTransform(persegi_b, VGroup(var_b)), run_time=1.8)
            DUNIA["persegi A"] = DUNIA["persegi B"] = None
            DUNIA.update({"varian A": var_a, "varian B": var_b})
            b.tunggu_kata("varian")
            b.main(Indicate(papan.utama, scale_factor=1.0, color=SOROT), run_time=0.8)
            b.tunggu_kata("dua untuk")
            b.main(FadeIn(l_var_a), run_time=0.5)
            b.tunggu_kata("lima puluh")
            b.main(FadeIn(l_var_b), run_time=0.5)
        periksa()

        # ------------------------------------------------------------------
        # empatkali: empat salinan persegi bersisi 5 PAS mengisi persegi bersisi 10.
        # ------------------------------------------------------------------
        s5, s10 = 5 * SKALA, 10 * SKALA
        besar = kotak(s10, AKSEN, isi=0.22).move_to([1.35, 0, Z_BARIS_B + s10 / 2])
        kecil = [kotak(s5, AKSEN).move_to(besar.get_center() + np.array([dx, 0, dz]))
                 for dx, dz in ((-s5 / 2, -s5 / 2), (s5 / 2, -s5 / 2), (-s5 / 2, s5 / 2), (s5 / 2, s5 / 2))]
        awal = kotak(s5, AKSEN).move_to([-1.9, 0, Z_BARIS_B + s5 / 2])
        l_s5 = tegak(rumus("5", 20, LATAR)).move_to(awal.get_center())
        l_s10 = tegak(rumus("10", 22, AKSEN)).move_to(besar.get_center() + OUT * (s10 / 2 + 0.28))

        with sinema.babak(self, "empatkali", DURASI, kata=KATA) as b:
            b.tunggu_kata("Botol yang")
            b.main(FadeOut(var_a), FadeOut(l_var_a), FadeOut(var_b), FadeOut(l_var_b), run_time=0.5)
            DUNIA["varian A"] = DUNIA["varian B"] = None
            DUNIA["persegi besar"] = besar
            b.main(FadeIn(awal), FadeIn(l_s5), FadeIn(besar), FadeIn(l_s10), run_time=0.9)
            b.tunggu_kata("dua kali")
            b.main(Indicate(l_s10, scale_factor=1.4, color=AKSEN), Indicate(l_s5, scale_factor=1.4, color=LATAR),
                   run_time=0.8)
            b.tunggu_kata("Tetapi")
            b.main(LaggedStart(*[FadeIn(k) for k in kecil], lag_ratio=0.35), run_time=2.2)
        periksa()

        # ------------------------------------------------------------------
        # akar: satuannya kembali ke ml.
        # ------------------------------------------------------------------
        sd_a = kotak(1.41 * SKALA, AKSEN2).move_to([-1.5, 0, Z_BARIS_A + 1.41 * SKALA / 2])
        sd_b = kotak(7.07 * SKALA, AKSEN).move_to([1.5, 0, Z_BARIS_B + 7.07 * SKALA / 2])
        l_sd_a = tegak(rumus(r"\sqrt{2} = 1{,}41", 21, AKSEN2))
        l_sd_a.move_to(sd_a.get_center() + RIGHT * (1.41 * SKALA / 2 + 0.95))
        l_sd_b = tegak(rumus(r"\sqrt{50} = 7{,}07", 21, AKSEN))
        l_sd_b.move_to(sd_b.get_center() + OUT * (7.07 * SKALA / 2 + 0.30))

        with sinema.babak(self, "akar", DURASI, kata=KATA) as b:
            b.tunggu_kata("Varian")
            b.main(Indicate(papan.utama, scale_factor=1.0, color=SOROT), run_time=0.9)
            b.tunggu_kata("Jadi")
            papan.tumbuh(r"\sqrt{\frac{\sum (x - \bar{x})^2}{n}}", None, run_time=1.0, b=b)
            b.tunggu_kata("kembali")
            b.main(FadeOut(VGroup(*kecil)), FadeOut(awal), FadeOut(l_s5), FadeOut(besar), FadeOut(l_s10),
                   run_time=0.5)
            DUNIA["persegi besar"] = None
            DUNIA.update({"kotak A": sd_a, "kotak B": sd_b, "label akar A": l_sd_a, "label akar B": l_sd_b})
            b.main(FadeIn(sd_a), FadeIn(sd_b), run_time=0.9)
            b.main(FadeIn(l_sd_a), FadeIn(l_sd_b), run_time=0.7)
        periksa()

        # ------------------------------------------------------------------
        # umum: bentuk umum dibaca; s di depan akarnya, varian s kuadrat.
        # ------------------------------------------------------------------
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("simpangan baku")
            papan.tumbuh(r"s = \sqrt{\frac{\sum (x - \bar{x})^2}{n}}", None, run_time=1.0, b=b)
            b.tunggu_kata("akar dari")
            b.main(Indicate(papan.utama, scale_factor=1.0, color=SOROT), run_time=1.0)
            b.tunggu_kata("varian")
            papan.baris(r"s^2 = \frac{\sum (x - \bar{x})^2}{n}", REDUP, b=b)
            b.tunggu_kata("sebelum")
            b.main(Indicate(papan.baris_lain[-1], scale_factor=1.0, color=SOROT), run_time=0.8)
        periksa()

        # ------------------------------------------------------------------
        # baca: angkanya jadi pita selebar simpangan baku di sekitar 500.
        # ------------------------------------------------------------------
        pita_a = pita_datar(2 * 1.41 * SKALA, 0.48, AKSEN2).move_to([0, 0, Z_GARIS_A + 0.19])
        pita_b = pita_datar(2 * 7.07 * SKALA, 0.48, AKSEN).move_to([0, 0, Z_GARIS_B + 0.19])

        with sinema.babak(self, "baca", DURASI, kata=KATA) as b:
            b.tunggu_kata("Barulah")
            b.main(FadeOut(sd_a), FadeOut(sd_b), FadeOut(l_mean), FadeOut(l_sd_a), FadeOut(l_sd_b), run_time=0.6)
            DUNIA["kotak A"] = DUNIA["kotak B"] = DUNIA["label 500"] = None
            DUNIA["label akar A"] = DUNIA["label akar B"] = None
            b.main(kamera.dekati(frame, [0, 0, 2.72], 3.6), run_time=2.0)
            b.tunggu_kata("Mesin A")
            DUNIA["pita A"] = pita_a
            b.main(GrowFromCenter(pita_a), run_time=1.0)
            b.tunggu_kata("Mesin B")
            DUNIA["pita B"] = pita_b
            b.main(GrowFromCenter(pita_b), run_time=1.0)
        periksa()

        # ------------------------------------------------------------------
        # tutup: jawaban pertanyaan pembuka. Botol Mesin B berisi 490 disorot.
        # ------------------------------------------------------------------
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("Botol")
            b.main(Indicate(botol_b[0], scale_factor=1.8, color=SOROT), run_time=1.0)
            b.tunggu_kata("empat ratus")
            b.main(Indicate(angka_ml[0], scale_factor=1.4, color=SOROT), run_time=0.8)
            b.tunggu_kata("kurang isi")
            b.main(kamera.putar_pelan(frame, derajat=5), run_time=1.4)
        periksa()

        # ------------------------------------------------------------------
        # lanjut: yang tersisa cuma tabelnya.
        # ------------------------------------------------------------------
        judul_lanjut = teks("Ukuran Pemusatan dan Penyebaran, Bagian 5", 30, SOROT)
        judul_lanjut.move_to([0, 2.6, 0]).fix_in_frame()
        tabel = VGroup()
        for i, (kelas, f) in enumerate((("490 - 494", "1"), ("495 - 499", "2"), ("500 - 504", "4"), ("505 - 510", "3"))):
            tabel.add(tegak(rumus(kelas, 20, TINTA)).move_to([-0.55, 0, 3.15 - i * 0.30]))
            tabel.add(tegak(rumus(f, 20, AKSEN)).move_to([0.65, 0, 3.15 - i * 0.30]))
        kepala = VGroup(tegak(sinema.label("isi (ml)", 20, REDUP)).move_to([-0.55, 0, 3.50]),
                        tegak(sinema.label("f", 20, REDUP)).move_to([0.65, 0, 3.50]))
        garis_tabel = Line([-1.25, 0, 3.34], [1.05, 0, 3.34]).set_stroke(REDUP, 1.6)
        tanya = tegak(rumus(r"\bar{x} = ?\quad s = ?", 24, SOROT)).move_to([0, 0, 1.85])
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ukuran")
            b.main(FadeOut(Group(garis_a, garis_b, botol_a, botol_b, angka_ml, nama_a, nama_b, garis_mean,
                                 pita_a, pita_b)),
                   FadeOut(papan.semua()), FadeOut(HUD["identitas"]), run_time=0.7)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self)
            HUD["identitas"] = None
            for n in list(DUNIA):
                DUNIA[n] = None
            self.hud_tambah(judul_lanjut)
            HUD["judul lanjut"] = judul_lanjut
            b.main(FadeIn(judul_lanjut, shift=0.2 * UP), run_time=0.7)
            b.tunggu_kata("tabelnya")
            DUNIA["tabel"] = VGroup(tabel, kepala, garis_tabel)
            b.main(FadeIn(kepala), ShowCreation(garis_tabel), LaggedStartMap(FadeIn, tabel, lag_ratio=0.1), run_time=1.2)
            b.tunggu_kata("dihitung")
            DUNIA["tanya"] = tanya
            b.main(FadeIn(tanya, shift=0.2 * OUT), run_time=0.6)
        periksa()

        sinema.laporkan_pemicu(self)
