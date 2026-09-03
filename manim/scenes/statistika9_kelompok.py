"""Materi 09 Statistika: data berkelompok, median lewat interpolasi (ManimGL).

Naskah: manim/narasi/statistika9-kelompok.json (10 segmen, 118,0 detik)

GAGASAN POKOK. Rumus median data berkelompok terlihat seperti hafalan berlapis.
Videonya membuktikan ia bukan hafalan: garis median adalah garis yang membelah
LUAS histogram jadi dua sama besar, dan rumus itu cuma cara menghitung letaknya.
Karena itu luas kiri dan luas kanan benar-benar diarsir dan dihitung di layar,
bukan cuma disebut.

Kejujuran datanya dijaga di dua tempat. Pertama, batangnya dibangun dari empat
puluh lembar jawaban yang benar-benar berjatuhan, jadi penonton melihat angka
aslinya ADA sebelum ia hilang. Kedua, hasil hampiran selalu dibandingkan dengan
nilai aslinya (median 67 lawan 67,5), sebab seluruh tahap ini soal hampiran.

TATA LETAK (standar video versi 2):
    kiri atas  identitas benda, menetap
    kanan atas papan rumus, berubah lewat morph
    kaki layar milik subtitle, dijaga qc
    dalam gambar label maksimal dua kata

SATU WARNA SATU MAKNA DI DALAM VIDEO INI:
    AKSEN2 biru = batang dan luas KIRI    AKSEN bata = luas KANAN dan modus
    SOROT ungu  = garis median            TINTA      = tulisan dan titik tengah
    REDUP       = sumbu dan angkanya

Lubang gerbang yang sama seperti Materi 06 berlaku di sini: `qc.periksa_adegan`
tidak memeriksa dunia lawan dunia, jadi adegan ini memelihara `TULISAN` sendiri.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "statistika9-kelompok"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

# --- Data. Sama persis dengan halaman Tahap 9, sudah lolos pemeriksa.
#     (batas bawah tertulis, batas atas tertulis, frekuensi)
KELAS = [(40, 49, 3), (50, 59, 8), (60, 69, 12), (70, 79, 9), (80, 89, 6), (90, 99, 2)]
N = 40
TENGAH = [44.5, 54.5, 64.5, 74.5, 84.5, 94.5]
KUMULATIF = [3, 11, 23, 32, 38, 40]
I_MEDIAN = 2                     # kelas 60 sampai 69 memuat data ke-20
L, F, FM, P = 59.5, 11, 12, 10   # tepi bawah, frekuensi sebelum, frekuensi kelas, panjang
MEAN = 67.75                     # 2710 : 40
MEDIAN = 67.0                    # 59,5 + (9:12) x 10
MODUS = 65.21                    # 59,5 + (4:7) x 10
MEDIAN_ASLI = 67.5

# --- Penggaris mendatar: 1 angka nilai = 0,15 satuan, nilai 69,5 duduk di x = 0.
SKALA_X, PUSAT_X = 0.15, 69.5
SKALA_F = 0.22                   # 1 siswa = 0,22 satuan tinggi
LEBAR_LEMBAR, TINGGI_LEMBAR = 0.66, 0.16

# --- Tinggi tiap lapis. Bingkai 6,4 berarti dunia diperbesar 1,25 kali di layar.
#     Batang tertinggi 12 siswa = 1,92 satuan; puncaknya harus berhenti di bawah
#     layar y = 1,10, dan angka sumbu di atas layar y = -2,55.
Z_DASAR = -0.80
Z_ANGKA = Z_DASAR - 0.34
Z_KAMERA = 0.50
TINGGI_BINGKAI = 6.4
X_SUMBU_F = -4.92                # sumbu frekuensi tegak, di kiri batang pertama
# Angkanya sempat 0,02 satuan keluar bingkai di render pertama; gerbang qc
# yang menangkapnya, bukan mata.


def tegak(mob):
    """Berdirikan benda datar di bidang xz supaya menghadap kamera."""
    return mob.rotate(90 * DEGREES, RIGHT)


def koma(nilai, desimal=1):
    if desimal == 0:
        return str(int(round(nilai)))
    return f"{nilai:.{desimal}f}".replace(".", "{,}")


def xn(nilai):
    """Letak mendatar sebuah nilai ujian."""
    return (nilai - PUSAT_X) * SKALA_X


def zf(frekuensi):
    """Tinggi yang mewakili sekian siswa."""
    return Z_DASAR + frekuensi * SKALA_F


class Kelompok9(AdeganMatra):
    samples = 4                        # penghalus tepi; bawaan ManimGL 0

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        DUNIA, HUD, TULISAN = {}, {}, {}
        HUD["identitas"] = sinema.identitas(self, "40 siswa, nilai ujian",
                                            "6 kelas, lebar 10")

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

        # ------------------------------------------------------------------
        # Panggung: dua sumbu berangka. Sumbu tegak wajib, sebab yang
        # dibandingkan sepanjang video ini adalah LUAS, dan luas tidak punya
        # arti tanpa tahu satu satuan tingginya berapa siswa.
        # ------------------------------------------------------------------
        sumbu_x = Line([xn(36), 0, Z_DASAR], [xn(103), 0, Z_DASAR]).set_stroke(REDUP, 2.4)
        sumbu_f = Line([X_SUMBU_F, 0, Z_DASAR], [X_SUMBU_F, 0, zf(13)]).set_stroke(REDUP, 2.4)

        angka_x = VGroup()
        for v in (40, 50, 60, 70, 80, 90, 100):
            angka_x.add(Line([xn(v), 0, Z_DASAR], [xn(v), 0, Z_DASAR - 0.10]).set_stroke(REDUP, 1.6))
            angka_x.add(tegak(rumus(str(v), 20, REDUP)).move_to([xn(v), 0, Z_ANGKA]))

        angka_f = VGroup()
        for f in (0, 4, 8, 12):
            angka_f.add(Line([X_SUMBU_F, 0, zf(f)], [X_SUMBU_F - 0.10, 0, zf(f)]).set_stroke(REDUP, 1.6))
            angka_f.add(tegak(rumus(str(f), 20, REDUP)).move_to([X_SUMBU_F - 0.30, 0, zf(f)]))

        # Empat puluh lembar jawaban. Batangnya DIBANGUN dari mereka, supaya
        # penonton melihat angka aslinya ada sebelum ia hilang.
        def lembar(i_kelas, ke_berapa):
            r = Rectangle(width=LEBAR_LEMBAR, height=TINGGI_LEMBAR)
            r.set_fill(AKSEN2, 0.95).set_stroke(LATAR, 1.0)
            bawah, atas, _ = KELAS[i_kelas]
            x = xn((bawah + atas) / 2)
            z = Z_DASAR + (ke_berapa + 0.5) * SKALA_F
            return tegak(r).move_to([x, 0, z])

        lembar_kelas = [VGroup(*[lembar(i, k) for k in range(f)])
                        for i, (_, _, f) in enumerate(KELAS)]
        semua_lembar = VGroup(*[m for g in lembar_kelas for m in g])

        # Batang utuh yang menggantikan tumpukan lembar (babak `hilang`), dan
        # nanti dilebarkan ke TEPI kelas (babak `tepi`).
        def batang(i, pakai_tepi):
            bawah, atas, f = KELAS[i]
            kiri, kanan = (bawah - 0.5, atas + 0.5) if pakai_tepi else (bawah, atas)
            r = Rectangle(width=xn(kanan) - xn(kiri), height=f * SKALA_F)
            r.set_fill(AKSEN2, 0.55).set_stroke(AKSEN2, 2.0)
            return tegak(r).move_to([(xn(kiri) + xn(kanan)) / 2, 0, Z_DASAR + f * SKALA_F / 2])

        batang_sempit = VGroup(*[batang(i, False) for i in range(6)])
        batang_tepi = VGroup(*[batang(i, True) for i in range(6)])

        # ==================================================================
        # Babak 1 `buka`: empat puluh lembar jawaban berjatuhan jadi batang.
        # ==================================================================
        # phi HARUS 90. Di 80 derajat bidang xz miring 10 derajat terhadap bidang
        # gambar, sehingga garis tegak terlihat rebah dan tinggi batang kena
        # keystone (terlihat di render ketiga). Video ini membandingkan tinggi
        # dan luas, jadi perspektif sekecil apa pun membantah hitungannya.
        kamera.pasang_awal(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA), tinggi=TINGGI_BINGKAI)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 09: Data berkelompok", lama=3.2, y=2.6)
            b.catat(3.2)
            taruh("sumbu", VGroup(sumbu_x, sumbu_f))
            taruh("angka x", angka_x)
            taruh("angka f", angka_f)
            b.main(ShowCreation(sumbu_x), ShowCreation(sumbu_f), run_time=1.2)
            b.main(FadeIn(angka_x), FadeIn(angka_f), run_time=1.2)
            taruh("lembar", semua_lembar)
            b.main(LaggedStart(*[FadeIn(m, shift=DOWN * 0.5) for m in semua_lembar],
                               lag_ratio=0.055), run_time=5.2)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 2 `hilang`: lembar jadi batang. Angka aslinya lenyap di sini,
        # dan itulah pertanyaan seluruh tahap ini.
        # ==================================================================
        l_dua_belas = tegak(sinema.label("12 siswa", 20, TINTA))
        l_dua_belas.move_to([xn(64.5), 0, zf(12) + 0.30])

        with sinema.babak(self, "hilang", DURASI) as b:
            taruh("batang", batang_sempit)
            b.main(*[FadeOut(m) for m in semua_lembar],
                   LaggedStartMap(FadeIn, batang_sempit, lag_ratio=0.08), run_time=3.0)
            buang("lembar")
            taruh("label dua belas", l_dua_belas, tulisan=True)
            b.main(FadeIn(l_dua_belas), run_time=1.0)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.04, color=AKSEN2, **kw),
                batang_sempit, lag_ratio=0.12), run_time=1.8)
            b.main(Indicate(batang_sempit[I_MEDIAN], scale_factor=1.06, color=AKSEN2),
                   run_time=1.4)
        periksa()

        # ==================================================================
        # Babak 3 `tepi`: lubang di antara 49 dan 50, lalu batang dilebarkan
        # sampai bertemu di 49,5. Sesudah ini barulah ia histogram.
        # ==================================================================
        celah = DashedLine([xn(49.5), 0, Z_DASAR - 0.02], [xn(49.5), 0, zf(9)])
        celah.set_stroke(SOROT, 2.2)
        l_tepi = tegak(rumus("49{,}5", 21, SOROT)).move_to([xn(49.5), 0, zf(9) + 0.26])
        # p = 10, x-bar dan Mo ditulis DI DUNIA, bukan di panel. Panel kanan atas
        # dipakai utuh oleh satu rantai rumus median: rumus utama yang tinggi
        # menindih baris di bawahnya, dan tindihan di DALAM panel tidak
        # diperiksa qc sama sekali.
        l_p = tegak(rumus("p = 10", 21, TINTA)).move_to([xn(64.5), 0, zf(12) + 0.32])

        with sinema.babak(self, "tepi", DURASI) as b:
            b.main(FadeOut(l_dua_belas), run_time=0.6)
            buang("label dua belas")
            taruh("celah", VGroup(celah, l_tepi))
            TULISAN["angka tepi"] = l_tepi
            b.main(ShowCreation(celah), run_time=1.4)
            b.main(FadeIn(l_tepi), run_time=0.8)
            taruh("batang", batang_tepi)
            b.main(*[ReplacementTransform(a, c)
                     for a, c in zip(batang_sempit, batang_tepi)], run_time=2.6)
            b.main(FadeOut(VGroup(celah, l_tepi)), run_time=0.8)
            buang("celah", "angka tepi")
            taruh("panjang kelas", l_p, tulisan=True)
            b.main(FadeIn(l_p), run_time=1.0)
            b.main(Indicate(l_p, scale_factor=1.3, color=TINTA), run_time=1.2)
            b.main(FadeOut(l_p), run_time=0.8)
            buang("panjang kelas")
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 4 `wakil`: tiap kelas diwakili titik tengahnya, lalu meannya.
        # ==================================================================
        titik_tengah = VGroup()
        for i, t in enumerate(TENGAH):
            d = Dot(radius=0.055).set_fill(TINTA, 1).set_stroke(LATAR, 1.0)
            titik_tengah.add(tegak(d).move_to([xn(t), 0, zf(KELAS[i][2]) + 0.14]))
        l_wakil = tegak(sinema.label("titik tengah", 20, TINTA))
        l_wakil.move_to([xn(84.5), 0, zf(11) + 0.26])
        l_mean = tegak(rumus(r"\bar{x} = 67{,}75", 21, TINTA))
        l_mean.move_to([xn(80.5), 0, zf(9) + 0.34])
        ptr_mean = VGroup(
            Polygon([xn(MEAN), 0, Z_DASAR - 0.08], [xn(MEAN) - 0.09, 0, Z_DASAR - 0.24],
                    [xn(MEAN) + 0.09, 0, Z_DASAR - 0.24]).set_fill(TINTA, 1).set_stroke(TINTA, 1.5),
        )

        with sinema.babak(self, "wakil", DURASI) as b:
            taruh("titik tengah", titik_tengah)
            b.main(LaggedStartMap(FadeIn, titik_tengah, lag_ratio=0.18), run_time=2.0)
            taruh("label wakil", l_wakil, tulisan=True)
            b.main(FadeIn(l_wakil), run_time=1.0)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.05, color=AKSEN2, **kw),
                batang_tepi, lag_ratio=0.14), run_time=2.4)
            taruh("penunjuk mean", ptr_mean)
            b.main(FadeIn(ptr_mean, shift=UP * 0.2), run_time=1.2)
            b.main(FadeOut(l_wakil), run_time=0.6)
            buang("label wakil")
            taruh("angka mean", l_mean, tulisan=True)
            b.main(FadeIn(l_mean), run_time=1.0)
            b.main(Indicate(l_mean, scale_factor=1.3, color=TINTA), run_time=1.2)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 5 `belah`: garis penyapu dari kiri, dan cacah kumulatifnya.
        # Tiap angka muncul PERSIS saat batasnya dilewati, bukan sekaligus.
        # ==================================================================
        garis_sapu = Line([xn(39.5), 0, Z_DASAR], [xn(39.5), 0, zf(13)])
        garis_sapu.set_stroke(SOROT, 3.0)
        cacah = [tegak(rumus(str(k), 21, SOROT)).move_to([xn(KELAS[i][1] + 0.5), 0, zf(12.6)])
                 for i, k in enumerate(KUMULATIF[:3])]

        with sinema.babak(self, "belah", DURASI) as b:
            taruh("garis sapu", garis_sapu)
            b.main(FadeIn(garis_sapu), FadeOut(l_mean), FadeOut(ptr_mean),
                   FadeOut(titik_tengah), run_time=0.8)
            buang("angka mean", "penunjuk mean", "titik tengah")
            for i in range(3):
                x_batas = xn(KELAS[i][1] + 0.5)
                taruh(f"cacah {i}", cacah[i], tulisan=True)
                b.main(garis_sapu.animate.move_to([x_batas, 0, garis_sapu.get_center()[2]]),
                       run_time=2.0)
                b.main(FadeIn(cacah[i], shift=DOWN * 0.15), run_time=0.8)
            b.main(Indicate(cacah[2], scale_factor=1.5, color=SOROT), run_time=1.4)
            b.jeda(1.2)
        periksa()

        # ==================================================================
        # Babak 6 `masuk`: dua puluh terlampaui, jadi garisnya mundur masuk ke
        # dalam batang ketiga. Bagian yang sudah terlewati diarsir.
        # ==================================================================
        arsir_kiri = Rectangle(width=xn(MEDIAN) - xn(L), height=FM * SKALA_F)
        arsir_kiri.set_fill(AKSEN2, 0.9).set_stroke(width=0)
        arsir_kiri = tegak(arsir_kiri)
        arsir_kiri.move_to([(xn(L) + xn(MEDIAN)) / 2, 0, Z_DASAR + FM * SKALA_F / 2])
        l_bagian = tegak(rumus(r"\tfrac{9}{12}", 22, AKSEN2))
        l_bagian.move_to([xn(63.2), 0, zf(12) + 0.30])

        with sinema.babak(self, "masuk", DURASI) as b:
            b.main(*[FadeOut(c) for c in cacah[:2]], run_time=0.6)
            buang("cacah 0", "cacah 1")
            b.main(garis_sapu.animate.move_to([xn(MEDIAN), 0, garis_sapu.get_center()[2]]),
                   run_time=2.4)
            taruh("arsir kiri", arsir_kiri)
            b.main(FadeIn(arsir_kiri), run_time=1.4)
            taruh("bagian", l_bagian, tulisan=True)
            b.main(FadeIn(l_bagian), run_time=1.0)
            b.main(Indicate(l_bagian, scale_factor=1.4, color=AKSEN2), run_time=1.2)
            b.jeda(1.2)
        periksa()

        # ==================================================================
        # Babak 7 `rumus`: rumus interpolasinya dibangun, lalu dihitung.
        # ==================================================================
        with sinema.babak(self, "rumus", DURASI) as b:
            papan.tumbuh(r"Me = L + \frac{n/2 - F}{f} \cdot p", "tepinya")
            b.catat(1.2 + papan.waktu_alasan())
            papan.tumbuh(r"Me = 59{,}5 + \frac{20 - 11}{12} \cdot 10")
            b.catat(1.2)
            papan.tumbuh(r"Me = 59{,}5 + 7{,}5 = 67", "hasilnya")
            b.catat(1.2 + papan.waktu_alasan())
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 8 `bukti`: luas kiri sama dengan luas kanan. Inilah alasannya
        # rumus tadi bekerja, dan alasan itu yang tidak muat di halaman.
        # ==================================================================
        def arsir(dari, sampai, i_dari, i_sampai, warna):
            g = VGroup()
            for i in range(i_dari, i_sampai + 1):
                bawah, atas, f = KELAS[i]
                kiri = max(xn(bawah - 0.5), xn(dari))
                kanan = min(xn(atas + 0.5), xn(sampai))
                if kanan - kiri < 0.01:
                    continue
                r = Rectangle(width=kanan - kiri, height=f * SKALA_F)
                r.set_fill(warna, 0.85).set_stroke(width=0)
                g.add(tegak(r).move_to([(kiri + kanan) / 2, 0, Z_DASAR + f * SKALA_F / 2]))
            return g

        luas_kiri = arsir(39.5, MEDIAN, 0, I_MEDIAN, AKSEN2)
        luas_kanan = arsir(MEDIAN, 99.5, I_MEDIAN, 5, AKSEN)
        n_kiri = tegak(rumus("20", 24, AKSEN2)).move_to([xn(52), 0, zf(9.4)])
        n_kanan = tegak(rumus("20", 24, AKSEN)).move_to([xn(84), 0, zf(8.4)])
        l_median = tegak(rumus("67", 21, SOROT)).move_to([xn(MEDIAN), 0, zf(13.1)])

        with sinema.babak(self, "bukti", DURASI) as b:
            b.main(FadeOut(l_bagian), FadeOut(arsir_kiri), FadeOut(cacah[2]), run_time=0.8)
            buang("bagian", "arsir kiri", "cacah 2")
            taruh("angka median", l_median, tulisan=True)
            b.main(FadeIn(l_median), run_time=0.8)
            taruh("luas kiri", luas_kiri)
            b.main(LaggedStartMap(FadeIn, luas_kiri, lag_ratio=0.12), run_time=1.8)
            taruh("cacah kiri", n_kiri, tulisan=True)
            b.main(FadeIn(n_kiri), run_time=0.8)
            taruh("luas kanan", luas_kanan)
            b.main(LaggedStartMap(FadeIn, luas_kanan, lag_ratio=0.12), run_time=1.8)
            # Arsiran digambar SESUDAH garis median, jadi ia menguburnya. Di
            # babak inilah garis itu paling penting, jadi ia dinaikkan ke depan.
            self.bring_to_front(garis_sapu)
            taruh("cacah kanan", n_kanan, tulisan=True)
            b.main(FadeIn(n_kanan), run_time=0.8)
            b.main(Indicate(n_kiri, scale_factor=1.4, color=AKSEN2),
                   Indicate(n_kanan, scale_factor=1.4, color=AKSEN), run_time=1.4)
            b.jeda(1.2)
        periksa()

        # ==================================================================
        # Babak 9 `modus`: modus condong ke tetangga yang lebih tinggi.
        # ==================================================================
        garis_modus = DashedLine([xn(MODUS), 0, Z_DASAR], [xn(MODUS), 0, zf(12)])
        garis_modus.set_stroke(AKSEN, 3.0)
        tarik_kiri = Line([xn(59.5), 0, zf(10.6)], [xn(62.5), 0, zf(10.6)]).set_stroke(AKSEN2, 2.2)
        tarik_kanan = Line([xn(69.5), 0, zf(10.6)], [xn(66.4), 0, zf(10.6)]).set_stroke(AKSEN, 2.6)
        l_d1 = tegak(rumus("d_1 = 4", 20, AKSEN2)).move_to([xn(55.0), 0, zf(10.6)])
        l_d2 = tegak(rumus("d_2 = 3", 20, AKSEN)).move_to([xn(74.5), 0, zf(10.6)])
        l_mo = tegak(rumus("Mo = 65{,}21", 20, AKSEN)).move_to([xn(63.0), 0, zf(12) + 0.34])

        with sinema.babak(self, "modus", DURASI) as b:
            b.main(FadeOut(luas_kiri), FadeOut(luas_kanan), FadeOut(n_kiri),
                   FadeOut(n_kanan), FadeOut(garis_sapu), FadeOut(l_median), run_time=1.0)
            buang("luas kiri", "luas kanan", "cacah kiri", "cacah kanan",
                  "garis sapu", "angka median")
            taruh("tarik", VGroup(tarik_kiri, tarik_kanan))
            taruh("d1", l_d1, tulisan=True)
            taruh("d2", l_d2, tulisan=True)
            b.main(ShowCreation(tarik_kiri), FadeIn(l_d1), run_time=1.4)
            b.main(ShowCreation(tarik_kanan), FadeIn(l_d2), run_time=1.4)
            taruh("garis modus", garis_modus)
            b.main(ShowCreation(garis_modus), run_time=1.6)
            taruh("angka modus", l_mo, tulisan=True)
            b.main(FadeIn(l_mo), run_time=1.0)
            b.main(Indicate(garis_modus, scale_factor=1.06, color=AKSEN), run_time=1.4)
            b.main(Indicate(l_mo, scale_factor=1.3, color=AKSEN), run_time=1.2)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 10 `tutup`: hampiran 67 lawan median asli 67,5. Selisih yang
        # kecil itu bukan kesalahan hitung, melainkan sifat data berkelompok.
        # ==================================================================
        garis_hampir = Line([xn(MEDIAN), 0, Z_DASAR], [xn(MEDIAN), 0, zf(12)])
        garis_hampir.set_stroke(SOROT, 3.0)
        garis_asli = DashedLine([xn(MEDIAN_ASLI), 0, Z_DASAR], [xn(MEDIAN_ASLI), 0, zf(12)])
        garis_asli.set_stroke(TINTA, 2.6)
        l_hampir = tegak(rumus("67", 20, SOROT)).move_to([xn(65.4), 0, zf(12.7)])
        l_asli = tegak(rumus("67{,}5", 20, TINTA)).move_to([xn(71.4), 0, zf(12.7)])
        l_kata = tegak(sinema.label("beda tipis", 20, TINTA))
        l_kata.move_to([xn(80.0), 0, zf(12.7)])

        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(VGroup(tarik_kiri, tarik_kanan)), FadeOut(l_d1), FadeOut(l_d2),
                   FadeOut(garis_modus), FadeOut(l_mo), run_time=1.0)
            buang("tarik", "d1", "d2", "garis modus", "angka modus")
            taruh("garis hampiran", garis_hampir)
            taruh("angka hampiran", l_hampir, tulisan=True)
            b.main(ShowCreation(garis_hampir), FadeIn(l_hampir), run_time=1.6)
            taruh("garis asli", garis_asli)
            taruh("angka asli", l_asli, tulisan=True)
            b.main(ShowCreation(garis_asli), FadeIn(l_asli), run_time=1.8)
            taruh("kata beda", l_kata, tulisan=True)
            b.main(FadeIn(l_kata), run_time=1.0)
            b.main(Indicate(l_asli, scale_factor=1.4, color=TINTA), run_time=1.4)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.05, color=AKSEN2, **kw),
                batang_tepi, lag_ratio=0.12), run_time=2.4)
            b.jeda(1.4)
        periksa()
