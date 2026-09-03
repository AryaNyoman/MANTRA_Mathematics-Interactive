"""Materi 02 Statistika: diagram batang, histogram, dan line plot (ManimGL).

Naskah: manim/narasi/statistika2-bentuk.json (10 segmen, 121,8 detik)

GAGASAN POKOK. Halaman bisa bilang "batang kategori boleh ditukar, batang
histogram tidak". Yang tidak bisa dilakukan halaman: MENUKARNYA di depan mata,
dua kali, dan membiarkan penonton melihat sendiri bahwa yang pertama tetap
masuk akal dan yang kedua jadi omong kosong. Penukaran itulah tulang punggung
videonya, dan sela antar batang jadi tanda yang kelihatan, bukan aturan hafalan.

Data halaman (keduanya dinyatakan buatan):
    `t02-cara-ke-sekolah`  Jalan kaki 8, Sepeda 6, Sepeda motor 12, Angkot 5,
                           Diantar 9, jumlah 40 siswa
    `t03-tinggi`           tinggi badan 40 siswa yang sama, dikelompokkan per 5 cm
                           dari 150: 1, 5, 11, 11, 7, 4, 1

TATA LETAK (standar video versi 2):
    kiri atas  identitas benda, menetap
    kanan atas papan rumus, berubah lewat morph
    kaki layar milik subtitle, dijaga qc
    dalam gambar label maksimal dua kata

SATU WARNA SATU MAKNA DI DALAM VIDEO INI:
    AKSEN2 biru = data kategori          AKSEN bata = data angka
    SOROT ungu  = yang sedang dipindah   REDUP      = sumbu dan angkanya

Kamera phi 90, tegak lurus: yang dibandingkan TINGGI batang.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "statistika2-bentuk"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

KATEGORI = [("Jalan kaki", 8), ("Sepeda", 6), ("Motor", 12), ("Angkot", 5), ("Diantar", 9)]
# Tinggi badan 40 siswa dikelompokkan per 5 cm, dijangkarkan di 150.
KELAS_CM = [(150, 1), (155, 5), (160, 11), (165, 11), (170, 7), (175, 4), (180, 1)]
LINE_PLOT = [5, 7, 8, 10, 10, 12, 15, 15, 18, 20]      # sepuluh data kecil, contoh line plot

SKALA_F = 0.180                 # satu siswa = 0,180 satuan tinggi
Z_DASAR = -1.06
Z_ANGKA = Z_DASAR - 0.30
Z_KAMERA = 0.50
TINGGI_BINGKAI = 6.4
LEBAR_BATANG = 0.86             # diagram batang, ada sela
LEBAR_HIST = 1.10               # histogram, rapat tanpa sela
X_SUMBU_F = -4.95


def tegak(mob):
    """Berdirikan benda datar di bidang xz supaya menghadap kamera."""
    return mob.rotate(90 * DEGREES, RIGHT)


def zf(frekuensi):
    return Z_DASAR + frekuensi * SKALA_F


class Bentuk2(AdeganMatra):
    samples = 4                        # penghalus tepi; bawaan ManimGL 0

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        DUNIA, HUD, TULISAN = {}, {}, {}
        HUD["identitas"] = sinema.identitas(self, "40 siswa yang sama",
                                            "cara berangkat, tinggi badan")

        def taruh(nama, mob, tulisan=False):
            DUNIA[nama] = mob
            if tulisan:
                TULISAN[nama] = mob
            return mob

        def buang(*nama):
            for n in nama:
                DUNIA[n] = None
                TULISAN.pop(n, None)

        def periksa(pasangan=None):
            hidup_d = {k: v for k, v in DUNIA.items() if v is not None}
            hidup_h = {k: v for k, v in HUD.items() if v is not None}
            if papan.semua() is not None:
                hidup_h["papan rumus"] = papan.semua()
            qc.periksa_adegan(self, {}, pasangan=pasangan, hud=hidup_h,
                              dunia=hidup_d, jaga_jalur_bawah=True)
            hidup_t = [k for k, v in TULISAN.items() if v is not None]
            for i, a in enumerate(hidup_t):
                for c in hidup_t[i + 1:]:
                    qc.tidak_bertindih(frame, TULISAN[a], TULISAN[c], a, c)

        alas = Line([-5.10, 0, Z_DASAR], [5.10, 0, Z_DASAR]).set_stroke(REDUP, 2.4)
        sumbu_f = Line([X_SUMBU_F, 0, Z_DASAR], [X_SUMBU_F, 0, zf(13)]).set_stroke(REDUP, 2.4)
        angka_f_satuan = {}
        angka_f = VGroup()
        for f in (0, 4, 8, 12):
            angka_f.add(Line([X_SUMBU_F, 0, zf(f)], [X_SUMBU_F - 0.10, 0, zf(f)])
                        .set_stroke(REDUP, 1.6))
            t = tegak(rumus(str(f), 20, REDUP)).move_to([X_SUMBU_F - 0.34, 0, zf(f)])
            angka_f.add(t)
            angka_f_satuan[f"f{f}"] = t

        # --- Diagram batang kategori. Lima batang, ADA SELA di antaranya.
        X_KAT = [-3.30, -1.65, 0.0, 1.65, 3.30]

        def batang_kategori(i, f):
            r = Rectangle(width=LEBAR_BATANG, height=f * SKALA_F)
            r.set_fill(AKSEN2, 0.62).set_stroke(AKSEN2, 2.2)
            return tegak(r).move_to([X_KAT[i], 0, Z_DASAR + f * SKALA_F / 2])

        batang = VGroup(*[batang_kategori(i, f) for i, (_, f) in enumerate(KATEGORI)])
        nama_kat = {}
        nama_kat_g = VGroup()
        for i, (nama, _) in enumerate(KATEGORI):
            t = tegak(teks(nama, 19, REDUP)).move_to([X_KAT[i], 0, Z_ANGKA])
            nama_kat_g.add(t)
            nama_kat[f"kategori {i}"] = t

        # --- Histogram tinggi badan. Batangnya RAPAT, tidak ada sela.
        X_HIST0 = -3.30

        def x_hist(i):
            return X_HIST0 + i * LEBAR_HIST

        def batang_hist(i, f):
            r = Rectangle(width=LEBAR_HIST, height=f * SKALA_F)
            r.set_fill(AKSEN, 0.55).set_stroke(AKSEN, 2.2)
            return tegak(r).move_to([x_hist(i), 0, Z_DASAR + f * SKALA_F / 2])

        hist = VGroup(*[batang_hist(i, f) for i, (_, f) in enumerate(KELAS_CM)])
        angka_cm = {}
        angka_cm_g = VGroup()
        for i, (cm, _) in enumerate(KELAS_CM):
            t = tegak(rumus(str(cm), 19, REDUP)).move_to([x_hist(i), 0, Z_ANGKA])
            angka_cm_g.add(t)
            angka_cm[f"cm {i}"] = t

        # ==================================================================
        # Babak 1 `buka`: tabel angka tidak terbaca, itu sebabnya digambar.
        # ==================================================================
        kamera.pasang_awal(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA), tinggi=TINGGI_BINGKAI)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 02: Dari angka jadi gambar", lama=3.2, y=2.6)
            b.catat(3.2)
            taruh("alas", alas)
            b.main(ShowCreation(alas), run_time=1.2)
            taruh("sumbu f", sumbu_f)
            taruh("angka f", angka_f)
            TULISAN.update(angka_f_satuan)
            b.main(ShowCreation(sumbu_f), FadeIn(angka_f), run_time=1.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 2 `jenis`: dua jenis data.
        # ==================================================================
        with sinema.babak(self, "jenis", DURASI) as b:
            sinema.lahir_rumus(self, r"\text{kategori, angka}", alas, papan, b=b, warna=TINTA)
            b.main(Indicate(papan.utama, scale_factor=1.15, color=SOROT), run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 3 `batang`: diagram batang kategori, ada sela.
        # ==================================================================
        with sinema.babak(self, "batang", DURASI) as b:
            taruh("batang", batang)
            b.main(LaggedStartMap(GrowFromCenter, batang, lag_ratio=0.14), run_time=2.6)
            taruh("nama kategori", nama_kat_g)
            TULISAN.update(nama_kat)
            b.main(LaggedStartMap(FadeIn, nama_kat_g, lag_ratio=0.14), run_time=2.0)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.06, color=AKSEN2, **kw),
                batang, lag_ratio=0.12), run_time=2.2)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 4 `tukar`: batang kategori ditukar, dan artinya TETAP.
        # Motor (indeks 2) pindah ke depan, Angkot (indeks 3) ke belakang.
        # ==================================================================
        urutan_baru = [2, 0, 1, 4, 3]      # Motor, Jalan kaki, Sepeda, Diantar, Angkot

        with sinema.babak(self, "tukar", DURASI) as b:
            b.main(Indicate(batang[2], scale_factor=1.08, color=SOROT),
                   Indicate(batang[3], scale_factor=1.08, color=SOROT), run_time=1.4)
            gerak = []
            for slot, asal in enumerate(urutan_baru):
                dx = X_KAT[slot] - X_KAT[asal]
                gerak.append(batang[asal].animate.shift([dx, 0, 0]))
                gerak.append(nama_kat_g[asal].animate.shift([dx, 0, 0]))
            b.main(*gerak, run_time=3.4)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.06, color=AKSEN2, **kw),
                batang, lag_ratio=0.12), run_time=2.2)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 5 `angka`: data angka, tinggi badan.
        # ==================================================================
        with sinema.babak(self, "angka", DURASI) as b:
            b.main(FadeOut(batang), FadeOut(nama_kat_g), run_time=1.2)
            buang("batang", "nama kategori", *nama_kat.keys())
            sinema.ganti_rumus(self, papan.utama, r"\text{tinggi badan}", b=b,
                               run_time=1.6, papan=papan)
            taruh("angka cm", angka_cm_g)
            TULISAN.update(angka_cm)
            b.main(LaggedStartMap(FadeIn, angka_cm_g, lag_ratio=0.12), run_time=2.2)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 6 `histogram`: batangnya rapat, tanpa sela.
        # ==================================================================
        l_rapat = tegak(sinema.label("tanpa sela", 20, AKSEN))
        l_rapat.move_to([x_hist(3), 0, zf(11) + 0.34])

        with sinema.babak(self, "histogram", DURASI) as b:
            taruh("histogram", hist)
            b.main(LaggedStartMap(GrowFromCenter, hist, lag_ratio=0.12), run_time=3.0)
            taruh("label rapat", l_rapat, tulisan=True)
            b.main(FadeIn(l_rapat), run_time=1.0)
            b.main(Indicate(VGroup(hist[2], hist[3]), scale_factor=1.05, color=AKSEN),
                   run_time=1.6)
            b.main(FadeOut(l_rapat), run_time=0.8)
            buang("label rapat")
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 7 `urut`: histogram ditukar, dan gambarnya jadi omong kosong.
        # Yang ditukar batang PERTAMA dengan KEDUA, jadi sumbunya berbunyi
        # 155, 150, 160: urutan yang mustahil untuk angka.
        # ==================================================================
        silang = VGroup()
        pusat_s = np.array([x_hist(3), 0.0, zf(6.0)])
        for tanda in (1, -1):
            for arah in (1, -1):
                silang.add(Line(pusat_s + np.array([arah * 0.30, 0, arah * tanda * 0.30]),
                                pusat_s + np.array([arah * 0.90, 0, arah * tanda * 0.90])))
        silang.set_stroke(AKSEN, 3.4)

        with sinema.babak(self, "urut", DURASI) as b:
            dx = x_hist(1) - x_hist(0)
            b.main(hist[0].animate.shift([dx, 0, 0]), hist[1].animate.shift([-dx, 0, 0]),
                   angka_cm_g[0].animate.shift([dx, 0, 0]),
                   angka_cm_g[1].animate.shift([-dx, 0, 0]), run_time=2.6)
            b.main(Indicate(VGroup(angka_cm_g[0], angka_cm_g[1]), scale_factor=1.4,
                            color=AKSEN), run_time=1.6)
            taruh("silang", silang)
            b.main(ShowCreation(silang), run_time=1.6)
            b.main(FadeOut(silang), run_time=1.0)
            buang("silang")
            b.main(hist[0].animate.shift([-dx, 0, 0]), hist[1].animate.shift([dx, 0, 0]),
                   angka_cm_g[0].animate.shift([-dx, 0, 0]),
                   angka_cm_g[1].animate.shift([dx, 0, 0]), run_time=2.2)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 8 `sela`: selanya bukan hiasan, ia tanda yang kelihatan.
        # ==================================================================
        with sinema.babak(self, "sela", DURASI) as b:
            sinema.ganti_rumus(self, papan.utama, r"\text{sela = kategori}", b=b,
                               run_time=1.6, papan=papan)
            b.main(Indicate(hist, scale_factor=1.03, color=AKSEN), run_time=1.6)
            sinema.ganti_rumus(self, papan.utama, r"\text{rapat = angka}", b=b,
                               run_time=1.6, papan=papan)
            b.main(Indicate(papan.utama, scale_factor=1.15, color=SOROT), run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 9 `lineplot`: tiap data jadi satu titik, apa adanya.
        # ==================================================================
        def x_lp(menit):
            return -3.30 + (menit - 5) * 0.42

        lp_sumbu = Line([x_lp(3.6), 0, Z_DASAR], [x_lp(21.4), 0, Z_DASAR]).set_stroke(REDUP, 2.2)
        lp_angka_satuan, lp_angka = {}, VGroup()
        for v in (5, 10, 15, 20):
            lp_angka.add(Line([x_lp(v), 0, Z_DASAR], [x_lp(v), 0, Z_DASAR - 0.10])
                         .set_stroke(REDUP, 1.5))
            t = tegak(rumus(str(v), 20, REDUP)).move_to([x_lp(v), 0, Z_ANGKA])
            lp_angka.add(t)
            lp_angka_satuan[f"lp {v}"] = t

        hitung, lp_titik = {}, VGroup()
        for v in LINE_PLOT:
            tingkat = hitung.get(v, 0)
            hitung[v] = tingkat + 1
            d = Dot(radius=0.075).set_fill(TINTA, 1).set_stroke(LATAR, 1.2)
            lp_titik.add(tegak(d).move_to([x_lp(v), 0, Z_DASAR + 0.16 + tingkat * 0.22]))

        with sinema.babak(self, "lineplot", DURASI) as b:
            b.main(FadeOut(hist), FadeOut(angka_cm_g), FadeOut(sumbu_f), FadeOut(angka_f),
                   run_time=1.2)
            buang("histogram", "angka cm", "sumbu f", "angka f",
                  *angka_cm.keys(), *angka_f_satuan.keys())
            sinema.ganti_rumus(self, papan.utama, r"\text{line plot}", b=b,
                               run_time=1.6, papan=papan)
            taruh("sumbu lp", VGroup(lp_sumbu, lp_angka))
            TULISAN.update(lp_angka_satuan)
            b.main(FadeIn(lp_sumbu), FadeIn(lp_angka), run_time=1.2)
            taruh("titik lp", lp_titik)
            b.main(LaggedStartMap(FadeIn, lp_titik, lag_ratio=0.14), run_time=2.8)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 10 `tutup`: pertanyaannya data ini jenis apa.
        # ==================================================================
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.7, color=TINTA, **kw),
                lp_titik, lag_ratio=0.1), run_time=2.0)
            sinema.ganti_rumus(self, papan.utama, r"\text{jenis datanya?}", b=b,
                               run_time=1.6, papan=papan)
            b.main(Indicate(papan.utama, scale_factor=1.2, color=SOROT), run_time=1.6)
            b.jeda(1.4)
        periksa()
