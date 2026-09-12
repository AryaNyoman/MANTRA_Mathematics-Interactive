"""Statistika Materi 09, Ukuran Pemusatan dan Penyebaran Bagian 5: data
berkelompok, median lewat interpolasi (ManimGL).
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (1:58)
yang sudah disetujui ARYA. DUNIANYA SAMA: empat puluh lembar jawaban
berjatuhan jadi enam batang (angka aslinya ADA sebelum hilang), lubang di
49,5 ditutup tepi kelas, titik tengah dan mean, garis penyapu dengan cacah
kumulatif 3, 11, 23, garis mundur masuk ke batang ketiga (9/12), rumus
interpolasi dibangun dengan morph, luas kiri = luas kanan diarsir, modus
condong ke tetangga yang lebih tinggi, hampiran 67 lawan median asli 67,5.

YANG BERBEDA: pembuka sub-bab plus Bagian 5 dengan pertanyaan halaman
(tabel yang sampai ke tangan kita); segar-ingat Penyajian Data Bagian 3
(luas batang mewakili banyaknya data); hitungan mean 2710 : 40 ditulis;
rumus modus dengan d1 = 4 dan d2 = 3 di panel; bentuk umum ketiga rumus
di panel baru; penutup menunjuk Hubungan Dua Variabel Bagian 1 (diagram
pencar); tiap kejadian dipicu pada KATA; sorotan memakai pita tembus pandang.

SATU WARNA SATU MAKNA: AKSEN2 biru = batang dan luas KIRI, AKSEN bata = luas
KANAN dan modus, SOROT ungu = garis median dan sorotan, TINTA = tulisan dan
titik tengah, REDUP = sumbu dan angkanya. Kamera phi 90 (yang dibandingkan
tinggi dan luas).
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
KATA = sinema.JamKata(TOPIK)

# --- Data. Sama persis dengan halaman Materi 09, sudah lolos pemeriksa.
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

SKALA_X, PUSAT_X = 0.15, 69.5
SKALA_F = 0.22
LEBAR_LEMBAR, TINGGI_LEMBAR = 0.66, 0.16

Z_DASAR = -0.80
Z_ANGKA = Z_DASAR - 0.34
Z_KAMERA = 0.50
TINGGI_BINGKAI = 6.4
X_SUMBU_F = -4.92


def tegak(mob):
    """Berdirikan benda datar di bidang xz supaya menghadap kamera."""
    return mob.rotate(90 * DEGREES, RIGHT)


def xn(nilai):
    return (nilai - PUSAT_X) * SKALA_X


def zf(frekuensi):
    return Z_DASAR + frekuensi * SKALA_F


class Kelompok9(AdeganMatra):
    samples = 4                        # penghalus tepi; bawaan ManimGL 0

    def sorot_pita(self, b, *mobs, lama=1.0, lebih=0.16):
        pita = VGroup()
        for m in mobs:
            p = Rectangle(width=m.get_width() + lebih, height=m.get_depth() + lebih)
            p.set_stroke(width=0).set_fill(SOROT, 0.35)
            pita.add(tegak(p).move_to(m.get_center() + IN * 0.02))
        self.add(pita)
        b.main(FadeIn(pita), run_time=lama * 0.35)
        b.main(FadeOut(pita), run_time=lama * 0.65)
        self.remove(pita)

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        DUNIA, HUD, TULISAN = {}, {}, {}

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
            hidup_t = {k: v for k, v in TULISAN.items() if v is not None}
            qc.periksa_adegan(self, {}, pasangan=pasangan, hud=hidup_h,
                              dunia=hidup_d, tulisan=hidup_t, jaga_jalur_bawah=True)

        # Panggung: dua sumbu berangka.
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

        def lembar(i_kelas, ke_berapa):
            r = Rectangle(width=LEBAR_LEMBAR, height=TINGGI_LEMBAR)
            r.set_fill(AKSEN2, 0.95).set_stroke(LATAR, 1.0)
            bawah, atas, _ = KELAS[i_kelas]
            x = xn((bawah + atas) / 2)
            z = Z_DASAR + (ke_berapa + 0.5) * SKALA_F
            return tegak(r).move_to([x, 0, z])

        lembar_kelas = [VGroup(*[lembar(i, k) for k in range(f)]) for i, (_, _, f) in enumerate(KELAS)]
        semua_lembar = VGroup(*[m for g in lembar_kelas for m in g])

        def batang(i, pakai_tepi):
            bawah, atas, f = KELAS[i]
            kiri, kanan = (bawah - 0.5, atas + 0.5) if pakai_tepi else (bawah, atas)
            r = Rectangle(width=xn(kanan) - xn(kiri), height=f * SKALA_F)
            r.set_fill(AKSEN2, 0.55).set_stroke(AKSEN2, 2.0)
            return tegak(r).move_to([(xn(kiri) + xn(kanan)) / 2, 0, Z_DASAR + f * SKALA_F / 2])

        batang_sempit = VGroup(*[batang(i, False) for i in range(6)])
        batang_tepi = VGroup(*[batang(i, True) for i in range(6)])

        # Tabel yang sampai ke tangan kita (dunia, di atas dua batang terpendek).
        tabel = VGroup()
        XT, ZT = xn(88.5), 2.25
        for i, (bawah, atas, f) in enumerate(KELAS):
            tabel.add(tegak(rumus(f"{bawah} - {atas}", 19, TINTA)).move_to([XT - 0.35, 0, ZT - i * 0.27]))
            tabel.add(tegak(rumus(str(f), 19, AKSEN2)).move_to([XT + 0.55, 0, ZT - i * 0.27]))
        kepala = VGroup(tegak(sinema.label("nilai", 18, REDUP)).move_to([XT - 0.35, 0, ZT + 0.30]),
                        tegak(sinema.label("f", 18, REDUP)).move_to([XT + 0.55, 0, ZT + 0.30]))
        garis_tabel = Line([XT - 0.95, 0, ZT + 0.16], [XT + 0.80, 0, ZT + 0.16]).set_stroke(REDUP, 1.4)
        tabel_semua = VGroup(tabel, kepala, garis_tabel)

        # ==================================================================
        # buka: judul sub-bab, tabel muncul di tengah, tanda tanya.
        # ==================================================================
        kamera.pasang_awal(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA), tinggi=TINGGI_BINGKAI)
        tabel_buka = tabel_semua.copy().scale(1.35).move_to([0, 0, 0.75])
        tanya = tegak(rumus("?", 48, SOROT)).move_to([1.9, 0, 0.75])
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ukuran")
            sinema.judul_pembuka(self, "Ukuran Pemusatan dan Penyebaran, Bagian 5", lama=3.6, y=2.6)
            b.catat(3.6)
            b.tunggu_kata("tabelnya")
            taruh("tabel buka", tabel_buka, tulisan=True)
            b.main(FadeIn(tabel_buka), run_time=0.8)
            b.tunggu_kata("sudah")
            self.sorot_pita(b, tabel_buka, lama=0.9, lebih=0.3)
            b.tunggu_kata("apa yang")
            taruh("tanya", tanya, tulisan=True)
            b.main(FadeIn(tanya, shift=0.2 * OUT), run_time=0.6)
        periksa()

        # ==================================================================
        # ingat: luas batang mewakili banyaknya data (histogram kecil).
        # ==================================================================
        mini = VGroup()
        for i, (w, h) in enumerate(((0.55, 0.6), (0.55, 1.0), (0.55, 0.45))):
            r = Rectangle(width=w, height=h).set_fill(AKSEN2, 0.5).set_stroke(AKSEN2, 1.6)
            mini.add(tegak(r).move_to([-0.55 + i * 0.55, 0, 0.9 + h / 2]))
        mini.add(Line([-1.0, 0, 0.9], [0.9, 0, 0.9]).set_stroke(REDUP, 1.6))
        l_luas = tegak(sinema.label("luas", 20, SOROT)).move_to([1.35, 0, 1.5])
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Penyajian")
            b.main(FadeOut(tanya), run_time=0.4)
            buang("tanya")
            b.tunggu_kata("luas batang")
            taruh("mini", mini)
            b.main(FadeOut(tabel_buka), FadeIn(mini), run_time=0.7)
            buang("tabel buka")
            taruh("label luas", l_luas, tulisan=True)
            b.main(FadeIn(l_luas), run_time=0.4)
            self.sorot_pita(b, *mini[:3], lama=1.2)
            b.tunggu_kata("Hari ini")
            b.main(FadeOut(l_luas), run_time=0.4)
            buang("label luas")
        periksa()

        # ==================================================================
        # data: sumbu, empat puluh lembar jawaban berjatuhan, tabelnya.
        # ==================================================================
        with sinema.babak(self, "data", DURASI, kata=KATA) as b:
            b.tunggu_kata("Empat puluh")
            HUD["identitas"] = sinema.identitas(self, "40 siswa, nilai ujian", "6 kelas, lebar 10")
            HUD["identitas"].set_opacity(0)
            taruh("sumbu", VGroup(sumbu_x, sumbu_f))
            taruh("angka x", angka_x)
            taruh("angka f", angka_f)
            b.main(FadeOut(mini), ShowCreation(sumbu_x), ShowCreation(sumbu_f), FadeIn(angka_x), FadeIn(angka_f),
                   HUD["identitas"].animate.set_opacity(1), run_time=1.0)
            buang("mini")
            b.tunggu_kata("nilainya")
            taruh("lembar", semua_lembar)
            b.main(LaggedStart(*[FadeIn(m, shift=DOWN * 0.5) for m in semua_lembar], lag_ratio=0.055), run_time=3.2)
            b.tunggu_kata("Tabel")
            taruh("tabel", tabel_semua, tulisan=True)
            b.main(FadeIn(tabel_semua), run_time=0.9)
        periksa()

        # ==================================================================
        # hilang: lembar jadi batang. Angka aslinya lenyap di sini.
        # ==================================================================
        l_dua_belas = tegak(sinema.label("12 siswa", 20, TINTA)).move_to([xn(64.5), 0, zf(12) + 0.30])
        with sinema.babak(self, "hilang", DURASI, kata=KATA) as b:
            b.tunggu_kata("hilang")
            taruh("batang", batang_sempit)
            b.main(*[FadeOut(m) for m in semua_lembar],
                   LaggedStartMap(FadeIn, batang_sempit, lag_ratio=0.08), run_time=1.8)
            buang("lembar")
            b.tunggu_kata("dua belas")
            taruh("label dua belas", l_dua_belas, tulisan=True)
            b.main(FadeIn(l_dua_belas), run_time=0.6)
            b.tunggu_kata("tidak tahu")
            self.sorot_pita(b, batang_sempit[I_MEDIAN], lama=1.2)
        periksa()

        # ==================================================================
        # tepi: lubang di antara 49 dan 50, batang dilebarkan sampai bertemu.
        # ==================================================================
        celah = DashedLine([xn(49.5), 0, Z_DASAR - 0.02], [xn(49.5), 0, zf(9)]).set_stroke(SOROT, 2.2)
        l_tepi = tegak(rumus("49{,}5", 21, SOROT)).move_to([xn(49.5), 0, zf(9) + 0.26])
        with sinema.babak(self, "tepi", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kelas")
            b.main(FadeOut(l_dua_belas), run_time=0.5)
            buang("label dua belas")
            b.tunggu_kata("berlubang")
            taruh("celah", VGroup(celah, l_tepi))
            TULISAN["angka tepi"] = l_tepi
            b.main(ShowCreation(celah), FadeIn(l_tepi), run_time=1.0)
            b.tunggu_kata("tepi kelas")
            taruh("batang", batang_tepi)
            b.main(*[ReplacementTransform(a, c) for a, c in zip(batang_sempit, batang_tepi)],
                   FadeOut(VGroup(celah, l_tepi)), run_time=1.5)
            buang("celah", "angka tepi")
        periksa()

        # ==================================================================
        # wakil: titik tengah tiap kelas, lalu meannya.
        # ==================================================================
        titik_tengah = VGroup()
        for i, t in enumerate(TENGAH):
            d = Dot(radius=0.055).set_fill(TINTA, 1).set_stroke(LATAR, 1.0)
            titik_tengah.add(tegak(d).move_to([xn(t), 0, zf(KELAS[i][2]) + 0.14]))
        l_wakil = tegak(sinema.label("titik tengah", 20, TINTA)).move_to([xn(72.5), 0, zf(12) + 0.36])
        l_445 = tegak(rumus("44{,}5", 20, TINTA)).move_to([xn(44.5), 0, zf(3) + 0.42])
        l_mean = tegak(rumus(r"\bar{x} = 2710 : 40 = 67{,}75", 21, TINTA)).move_to([xn(70.5), 0, zf(12) + 0.36])
        ptr_mean = VGroup(
            Polygon([xn(MEAN), 0, Z_DASAR - 0.08], [xn(MEAN) - 0.09, 0, Z_DASAR - 0.24],
                    [xn(MEAN) + 0.09, 0, Z_DASAR - 0.24]).set_fill(TINTA, 1).set_stroke(TINTA, 1.5),
        )
        with sinema.babak(self, "wakil", DURASI, kata=KATA) as b:
            b.tunggu_kata("titik tengahnya")
            taruh("titik tengah", titik_tengah)
            b.main(LaggedStartMap(FadeIn, titik_tengah, lag_ratio=0.18), run_time=1.2)
            taruh("label wakil", l_wakil, tulisan=True)
            b.main(FadeIn(l_wakil), run_time=0.5)
            b.tunggu_kata("empat puluh empat")
            taruh("angka 44,5", l_445, tulisan=True)
            b.main(FadeIn(l_445), Indicate(titik_tengah[0], scale_factor=2.0, color=SOROT), run_time=0.8)
            b.tunggu_kata("Jumlah")
            b.main(FadeOut(l_wakil), run_time=0.4)
            buang("label wakil")
            self.sorot_pita(b, *batang_tepi, lama=1.4)
            b.tunggu_kata("dibagi")
            taruh("penunjuk mean", ptr_mean)
            b.main(FadeIn(ptr_mean, shift=UP * 0.2), run_time=0.7)
            b.tunggu_kata("meannya")
            taruh("angka mean", l_mean, tulisan=True)
            b.main(FadeIn(l_mean), run_time=0.7)
        periksa()

        # ==================================================================
        # belah: garis penyapu dari kiri, cacah kumulatif PERSIS saat batasnya dilewati.
        # ==================================================================
        garis_sapu = Line([xn(39.5), 0, Z_DASAR], [xn(39.5), 0, zf(13)]).set_stroke(SOROT, 3.0)
        cacah = [tegak(rumus(str(k), 21, SOROT)).move_to([xn(KELAS[i][1] + 0.5), 0, zf(12.6)])
                 for i, k in enumerate(KUMULATIF[:3])]
        with sinema.babak(self, "belah", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang")
            b.main(FadeOut(l_mean), FadeOut(ptr_mean), FadeOut(titik_tengah), FadeOut(l_445),
                   FadeOut(tabel_semua), run_time=0.7)
            buang("angka mean", "penunjuk mean", "titik tengah", "angka 44,5", "tabel")
            b.tunggu_kata("membelah")
            taruh("garis sapu", garis_sapu)
            b.main(FadeIn(garis_sapu), run_time=0.6)
            for frasa, i in (("tiga", 0), ("sebelas", 1), ("dua puluh tiga", 2)):
                b.tunggu_kata(frasa)
                x_batas = xn(KELAS[i][1] + 0.5)
                taruh(f"cacah {i}", cacah[i], tulisan=True)
                b.main(garis_sapu.animate.move_to([x_batas, 0, garis_sapu.get_center()[2]]), run_time=0.7)
                b.main(FadeIn(cacah[i], shift=DOWN * 0.15), run_time=0.3)
        periksa()

        # ==================================================================
        # masuk: dua puluh terlampaui, garisnya mundur masuk ke batang ketiga.
        # ==================================================================
        arsir_kiri = Rectangle(width=xn(MEDIAN) - xn(L), height=FM * SKALA_F)
        arsir_kiri.set_fill(AKSEN2, 0.9).set_stroke(width=0)
        arsir_kiri = tegak(arsir_kiri).move_to([(xn(L) + xn(MEDIAN)) / 2, 0, Z_DASAR + FM * SKALA_F / 2])
        l_bagian = tegak(rumus(r"\tfrac{9}{12}", 22, AKSEN2)).move_to([xn(63.2), 0, zf(12) + 0.30])
        with sinema.babak(self, "masuk", DURASI, kata=KATA) as b:
            b.tunggu_kata("terlampaui")
            b.main(Indicate(cacah[2], scale_factor=1.5, color=SOROT), run_time=0.8)
            b.tunggu_kata("di dalam")
            b.main(*[FadeOut(c) for c in cacah[:2]], run_time=0.4)
            buang("cacah 0", "cacah 1")
            taruh("arsir kiri", arsir_kiri)
            b.main(garis_sapu.animate.move_to([xn(MEDIAN), 0, garis_sapu.get_center()[2]]),
                   FadeIn(arsir_kiri), run_time=1.4)
            b.tunggu_kata("kurang")
            taruh("bagian", l_bagian, tulisan=True)
            b.main(FadeIn(l_bagian), run_time=0.5)
            b.tunggu_kata("berdiri")
            b.main(Indicate(l_bagian, scale_factor=1.4, color=AKSEN2), run_time=0.8)
        periksa()

        # ==================================================================
        # rumus: rumus interpolasinya dibangun dengan morph, lalu dihitung.
        # ==================================================================
        with sinema.babak(self, "rumus", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sembilan")
            papan.tumbuh(r"Me = L + \frac{n/2 - F}{f} \cdot p", None, run_time=1.2, b=b)
            b.tunggu_kata("Lebar kelasnya")
            papan.tumbuh(r"Me = 59{,}5 + \frac{9}{12} \cdot 10", None, run_time=1.2, b=b)
            b.tunggu_kata("tujuh koma")
            papan.tumbuh(r"Me = 59{,}5 + 7{,}5 = 67", None, run_time=1.2, b=b)
        periksa()

        # ==================================================================
        # bukti: luas kiri sama dengan luas kanan.
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

        with sinema.babak(self, "bukti", DURASI, kata=KATA) as b:
            b.tunggu_kata("berhenti")
            b.main(FadeOut(l_bagian), FadeOut(arsir_kiri), FadeOut(cacah[2]), run_time=0.5)
            buang("bagian", "arsir kiri", "cacah 2")
            taruh("angka median", l_median, tulisan=True)
            b.main(FadeIn(l_median), run_time=0.5)
            b.tunggu_kata("luas di")
            taruh("luas kiri", luas_kiri)
            taruh("cacah kiri", n_kiri, tulisan=True)
            b.main(LaggedStartMap(FadeIn, luas_kiri, lag_ratio=0.12), run_time=1.0)
            b.main(FadeIn(n_kiri), run_time=0.3)
            b.tunggu_kata("luas di", ke=2)
            taruh("luas kanan", luas_kanan)
            taruh("cacah kanan", n_kanan, tulisan=True)
            b.main(LaggedStartMap(FadeIn, luas_kanan, lag_ratio=0.12), run_time=1.0)
            self.bring_to_front(garis_sapu)
            b.main(FadeIn(n_kanan), run_time=0.3)
            b.tunggu_kata("bukan hafalan")
            b.main(papan.sorot(), run_time=1.0)
            b.tunggu_kata("letak")
            b.main(Indicate(garis_sapu, scale_factor=1.05, color=SOROT), run_time=0.8)
        periksa()

        # ==================================================================
        # modus: condong ke tetangga yang lebih tinggi; rumusnya di panel.
        # ==================================================================
        garis_modus = DashedLine([xn(MODUS), 0, Z_DASAR], [xn(MODUS), 0, zf(12)]).set_stroke(AKSEN, 3.0)
        tarik_kiri = Line([xn(59.5), 0, zf(10.6)], [xn(62.5), 0, zf(10.6)]).set_stroke(AKSEN2, 2.2)
        tarik_kanan = Line([xn(69.5), 0, zf(10.6)], [xn(66.4), 0, zf(10.6)]).set_stroke(AKSEN, 2.6)
        l_d1 = tegak(rumus("d_1 = 4", 20, AKSEN2)).move_to([xn(55.0), 0, zf(10.6)])
        l_d2 = tegak(rumus("d_2 = 3", 20, AKSEN)).move_to([xn(74.5), 0, zf(10.6)])
        l_mo = tegak(rumus("Mo = 65{,}21", 20, AKSEN)).move_to([xn(63.0), 0, zf(12) + 0.34])

        with sinema.babak(self, "modus", DURASI, kata=KATA) as b:
            b.tunggu_kata("batang tertinggi")
            b.main(FadeOut(luas_kiri), FadeOut(luas_kanan), FadeOut(n_kiri), FadeOut(n_kanan),
                   FadeOut(garis_sapu), FadeOut(l_median), run_time=0.7)
            buang("luas kiri", "luas kanan", "cacah kiri", "cacah kanan", "garis sapu", "angka median")
            self.sorot_pita(b, batang_tepi[I_MEDIAN], lama=1.0)
            b.tunggu_kata("condong")
            b.main(Indicate(batang_tepi[3], scale_factor=1.0, color=AKSEN), run_time=0.9)
            b.tunggu_kata("Selisih")
            taruh("tarik", VGroup(tarik_kiri, tarik_kanan))
            taruh("d1", l_d1, tulisan=True)
            b.main(ShowCreation(tarik_kiri), FadeIn(l_d1), run_time=0.8)
            b.tunggu_kata("ke kanan")
            taruh("d2", l_d2, tulisan=True)
            b.main(ShowCreation(tarik_kanan), FadeIn(l_d2), run_time=0.8)
            b.tunggu_kata("modusnya")
            papan.baris(r"Mo = 59{,}5 + \tfrac{4}{7} \cdot 10", AKSEN, b=b)
            b.tunggu_kata("enam puluh")
            taruh("garis modus", garis_modus)
            taruh("angka modus", l_mo, tulisan=True)
            b.main(ShowCreation(garis_modus), FadeIn(l_mo), run_time=0.9)
        periksa()

        # ==================================================================
        # umum: tiga bentuk umum di panel baru.
        # ==================================================================
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bentuk")
            b.main(FadeOut(papan.semua()), run_time=0.5)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, tanpa_utama=True)
            b.tunggu_kata("Mean")
            papan.baris(r"\bar{x} = \tfrac{\sum f \cdot x_t}{n}", TINTA, b=b)
            b.tunggu_kata("Median")
            papan.baris(r"Me = L + \tfrac{n/2 - F}{f} \cdot p", SOROT, b=b)
            b.tunggu_kata("Modus")
            papan.baris(r"Mo = L + \tfrac{d_1}{d_1 + d_2} \cdot p", AKSEN, b=b)
            b.tunggu_kata("kali lebar", ke=2)
            b.main(papan.sorot(), run_time=1.0)
        periksa()

        # ==================================================================
        # tutup: hampiran 67 lawan median asli 67,5.
        # ==================================================================
        garis_hampir = Line([xn(MEDIAN), 0, Z_DASAR], [xn(MEDIAN), 0, zf(12)]).set_stroke(SOROT, 3.0)
        garis_asli = DashedLine([xn(MEDIAN_ASLI), 0, Z_DASAR], [xn(MEDIAN_ASLI), 0, zf(12)]).set_stroke(TINTA, 2.6)
        l_hampir = tegak(rumus("67", 20, SOROT)).move_to([xn(65.4), 0, zf(12.7)])
        l_asli = tegak(rumus("67{,}5", 20, TINTA)).move_to([xn(71.4), 0, zf(12.7)])
        l_kata = tegak(sinema.label("beda tipis", 20, TINTA)).move_to([xn(80.0), 0, zf(12.7)])

        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("hampiran")
            b.main(FadeOut(VGroup(tarik_kiri, tarik_kanan)), FadeOut(l_d1), FadeOut(l_d2),
                   FadeOut(garis_modus), FadeOut(l_mo), run_time=0.6)
            buang("tarik", "d1", "d2", "garis modus", "angka modus")
            taruh("garis hampiran", garis_hampir)
            taruh("angka hampiran", l_hampir, tulisan=True)
            b.main(ShowCreation(garis_hampir), FadeIn(l_hampir), run_time=0.8)
            b.tunggu_kata("enam puluh tujuh koma")
            taruh("garis asli", garis_asli)
            taruh("angka asli", l_asli, tulisan=True)
            b.main(ShowCreation(garis_asli), FadeIn(l_asli), run_time=0.9)
            b.tunggu_kata("bukan")
            taruh("kata beda", l_kata, tulisan=True)
            b.main(FadeIn(l_kata), run_time=0.5)
            b.tunggu_kata("tebakan")
            self.sorot_pita(b, *batang_tepi, lama=1.4)
        periksa()

        # ==================================================================
        # lanjut: dua angka tiap siswa, diagram pencar kecil.
        # ==================================================================
        judul_lanjut = teks("Hubungan Dua Variabel, Bagian 1", 30, SOROT).move_to([0, 2.6, 0]).fix_in_frame()
        PENCAR = [(1, 55), (2, 62), (2.5, 58), (3, 70), (4, 72), (4.5, 80), (5, 78), (6, 88)]
        XP0, ZP0 = -2.4, -0.9
        sumbu_p = VGroup(Line([XP0, 0, ZP0], [XP0 + 5.0, 0, ZP0]), Line([XP0, 0, ZP0], [XP0, 0, ZP0 + 3.0])).set_stroke(REDUP, 2.2)
        l_jam = tegak(sinema.label("lama belajar", 20, REDUP)).move_to([XP0 + 2.5, 0, ZP0 - 0.32])
        l_nilai = tegak(sinema.label("nilai", 20, REDUP)).move_to([XP0 - 0.55, 0, ZP0 + 1.5])
        titik_p = VGroup(*[tegak(Dot(radius=0.08).set_fill(AKSEN2, 1)).move_to([XP0 + 0.3 + j * 0.72, 0, ZP0 + (n - 50) * 0.07])
                           for j, n in PENCAR])
        tren = DashedLine([XP0 + 0.4, 0, ZP0 + 0.45], [XP0 + 4.8, 0, ZP0 + 2.7]).set_stroke(SOROT, 2.2)
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Hubungan")
            b.main(FadeOut(VGroup(batang_tepi, sumbu_x, sumbu_f, angka_x, angka_f, garis_hampir, garis_asli,
                                  l_hampir, l_asli, l_kata)),
                   FadeOut(papan.semua()), FadeOut(HUD["identitas"]), run_time=0.7)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, tanpa_utama=True)
            HUD["identitas"] = None
            for n in list(DUNIA):
                buang(n)
            self.hud_tambah(judul_lanjut)
            HUD["judul lanjut"] = judul_lanjut
            b.main(FadeIn(judul_lanjut, shift=0.2 * UP), run_time=0.7)
            b.tunggu_kata("dua angka")
            taruh("sumbu pencar", sumbu_p)
            taruh("label jam", l_jam, tulisan=True)
            taruh("label nilai", l_nilai, tulisan=True)
            b.main(ShowCreation(sumbu_p), FadeIn(l_jam), FadeIn(l_nilai), run_time=0.9)
            taruh("titik pencar", titik_p)
            b.main(LaggedStartMap(lambda m: FadeIn(m, scale=1.6), titik_p, lag_ratio=0.12), run_time=1.2)
            b.tunggu_kata("berhubungan")
            taruh("tren", tren)
            b.main(ShowCreation(tren), run_time=0.9)
        periksa()

        sinema.laporkan_pemicu(self)
