"""Video Integral Materi 05 "Luas dari persegi panjang, jumlahan Riemann":
Luas dan Integral Tentu, Bagian 1.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (2:00)
yang sudah disetujui ARYA. DUNIANYA SAMA: bidang kuadran pertama 0..8, daerah
bertepi lengkung, satu persegi panjang kasar, partisi empat bagian dengan
pengukur delta x yang berjalan, titik sampel yang berpindah, contoh f(x) = x
pada [0, 7] tujuh bagian (kanan 28, segitiga 24,5, kiri 21, jepitan),
n = 14 dan n = 60, kurva turun 4 - x^2 di bidang kecil (kiri 6,25, kanan 4,25).

YANG BERBEDA: pembuka sub-bab plus Bagian 1 dengan pertanyaan halaman;
segar-ingat (rumus SMP: persegi panjang 3 x 2 dan segitiga); ASAL RUMUS:
kelebihan 28 - 24,5 dibaca dari tujuh segitiga kecil setengah satuan; bentuk
umum jumlah f(x_i) delta x lahir di atas gambar lalu masuk panel; rangkuman
dengan pertanyaan; penutup menunjuk Bagian 2 (lambang integral tentu); tiap
kejadian dipicu pada KATA (`sinema.JamKata`).

WARNA, satu makna: AKSEN2 biru = persegi panjang dan jumlahannya; AKSEN merah
= selisih terhadap luas sebenarnya (dan tangga kanan pada kurva turun); SOROT
ungu = luas sebenarnya dan kesimpulan; REDUP = bantu.

Istilah sama dengan widget `PersegiPanjangMenumpuk.tsx`: "bagian", "titik
sampel", "jumlahan", "luas sebenarnya", "selisih". Batas sumbu kelipatan
langkahnya (bidang_bernomor menolak yang lain).
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "integral05-riemann"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

A, B = 0.0, 7.0
KIRI_AWAL, KANAN_AWAL = 0.2, 7.0


def f_lurus(x):
    return x


def f_lengkung(x):
    return 4.0 - x * x


def f_pembuka(x):
    return 1.2 + 5.0 * (x / 7.0) ** 0.55


def kotak_riemann(bidang, f, a, b, n, sampel="kanan", warna=AKSEN2, opacity=0.30):
    """Persegi panjang jumlahan Riemann, tingginya DIHITUNG dari fungsinya."""
    geser = {"kiri": 0.0, "kanan": 1.0, "tengah": 0.5}[sampel]
    lebar = (b - a) / n
    kelompok = VGroup()
    for i in range(n):
        kiri = a + i * lebar
        tinggi = f(kiri + geser * lebar)
        if tinggi <= 0:
            continue
        pkb = bidang.c2p(kiri, 0)
        pka = bidang.c2p(kiri + lebar, tinggi)
        kotak = Rectangle(width=pka[0] - pkb[0], height=pka[1] - pkb[1])
        kotak.move_to((pkb + pka) / 2)
        kotak.set_fill(warna, opacity)
        kotak.set_stroke(warna, 1.6 if n <= 20 else 0.7, opacity=0.85)
        kelompok.add(kotak)
    return kelompok


def kurva(bidang, f, a, b, warna=TINTA, tebal=3.2):
    titik = [bidang.c2p(a + (b - a) * i / 160, f(a + (b - a) * i / 160)) for i in range(161)]
    return VMobject().set_points_smoothly(titik).set_stroke(warna, tebal)


def daerah_bawah(bidang, f, a, b, warna=AKSEN2, opacity=0.18, langkah=60):
    titik = ([bidang.c2p(a, 0)]
             + [bidang.c2p(a + (b - a) * i / langkah, f(a + (b - a) * i / langkah)) for i in range(langkah + 1)]
             + [bidang.c2p(b, 0), bidang.c2p(a, 0)])
    return VMobject().set_points_as_corners(titik).set_fill(warna, opacity).set_stroke(width=0)


def bersihkan_panel(scene, papan, buang, b=None, run_time=0.6):
    """Buang beberapa baris dari panel, lalu rapatkan sisanya."""
    buang = [m for m in buang if m is not None and m in papan.baris_lain]
    if not buang:
        return
    anim = [FadeOut(m) for m in buang]
    for m in buang:
        papan.baris_lain.remove(m)
    if b is not None:
        b.main(*anim, run_time=run_time)
    else:
        scene.play(*anim, run_time=run_time)
    for m in buang:
        scene.remove(m)
    for i, m in enumerate(papan.baris_lain):
        papan.tempat_baris(m, i)
    papan.perbarui_alas()


class IntegralRiemann(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        ident = None

        def hud():
            isi = {}
            if ident is not None:
                isi["identitas"] = ident
            papan_isi = papan.semua()
            if papan_isi is not None:
                isi["papan"] = papan_isi
            return isi

        def nyala(*mobs, warna=SOROT, skala=1.05):
            return [Indicate(m, color=warna, scale_factor=skala) for m in mobs]

        bidang = ilustrasi.bidang_bernomor((0.0, 8.0, 1.0), (0.0, 8.0, 1.0))
        pusat, tinggi_kam = kamera.muat_datar(bidang, sisa_atas=0.35, sisa_kanan=0.55)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi_kam)

        k_lengkung = kurva(bidang, f_pembuka, KIRI_AWAL, KANAN_AWAL)
        daerah = daerah_bawah(bidang, f_pembuka, KIRI_AWAL, KANAN_AWAL)

        # ---- buka: sub-bab, lalu daerah bertepi lengkung ---------------- #
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Luas")
            sinema.judul_pembuka(self, "Luas dan Integral Tentu, Bagian 1", lama=3.0, y=2.6)
            b.catat(3.0)
            # Bidang SESUDAH judul memudar (3,1 s): judul di atas petak terbaca
            # bertumpuk di lembar kontak 480p (12 Sep 2026).
            b.tunggu_kata("Bagaimana")
            b.main(FadeIn(bidang), run_time=0.5)
            b.tunggu_kata("mengukur luas")
            b.main(ShowCreation(k_lengkung), run_time=1.0)
            b.main(FadeIn(daerah), run_time=0.6)
            b.tunggu_kata("melengkung")
            b.main(*nyala(k_lengkung, warna=AKSEN, skala=1.0), run_time=0.9)
        qc.periksa_adegan(self, {"kurva": k_lengkung}, hud=hud(), dunia={"bidang": bidang})

        # ---- ingat: rumus SMP yang dibawa ------------------------------- #
        kotak_mudah = Rectangle(width=bidang.c2p(3, 0)[0] - bidang.c2p(0, 0)[0],
                                height=bidang.c2p(0, 2)[1] - bidang.c2p(0, 0)[1])
        kotak_mudah.move_to((bidang.c2p(0, 0) + bidang.c2p(3, 2)) / 2)
        kotak_mudah.set_fill(REDUP, 0.28).set_stroke(REDUP, 2.4)
        l_mudah = sinema.label("3 x 2", warna=REDUP).move_to(bidang.c2p(1.5, 1.0))
        segi_mudah = Polygon(bidang.c2p(4, 0), bidang.c2p(7, 0), bidang.c2p(7, 2))
        segi_mudah.set_fill(REDUP, 0.28).set_stroke(REDUP, 2.4)
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Membalik")
            ident = sinema.identitas(self, "1 petak = 1 satuan")
            ident.set_opacity(0)
            b.main(ident.animate.set_opacity(1), run_time=0.5)
            b.tunggu_kata("tinggalkan")
            b.main(FadeOut(daerah), k_lengkung.animate.set_stroke(opacity=0.3), run_time=0.8)
            b.tunggu_kata("luas persegi")
            b.main(ShowCreation(kotak_mudah), FadeIn(l_mudah), run_time=0.9)
            b.tunggu_kata("panjang kali")
            papan.baris(r"3 \times 2 = 6", warna=REDUP, b=b)
            b.tunggu_kata("luas segitiga")
            b.main(ShowCreation(segi_mudah), run_time=0.9)
            b.tunggu_kata("setengah alas")
            papan.baris(r"\tfrac{1}{2} \cdot 3 \cdot 2 = 3", warna=REDUP, b=b)
        qc.periksa_adegan(self, {"kotak mudah": kotak_mudah, "segitiga mudah": segi_mudah}, hud=hud(),
                          tulisan={"label 3x2": l_mudah}, dunia={"bidang": bidang})

        # ---- masalah: yang melengkung tidak punya dua sisi ---------------- #
        with sinema.babak(self, "masalah", DURASI, kata=KATA) as b:
            b.tunggu_kata("Persegi panjang")
            b.main(*nyala(kotak_mudah, warna=REDUP, skala=1.03), run_time=0.9)
            b.tunggu_kata("Tapi daerah")
            b.main(FadeOut(kotak_mudah), FadeOut(l_mudah), FadeOut(segi_mudah),
                   k_lengkung.animate.set_stroke(opacity=1.0), FadeIn(daerah), run_time=0.9)
            bersihkan_panel(self, papan, list(papan.baris_lain), b=b, run_time=0.4)
            b.tunggu_kata("tidak ada")
            b.main(*nyala(k_lengkung, warna=AKSEN, skala=1.0), run_time=0.9)
        qc.periksa_adegan(self, {"kurva": k_lengkung}, hud=hud(), dunia={"bidang": bidang})

        # ---- gagasan: satu persegi panjang kasar -------------------------- #
        satu = kotak_riemann(bidang, f_pembuka, KIRI_AWAL, KANAN_AWAL, 1, "kiri")
        with sinema.babak(self, "gagasan", DURASI, kata=KATA) as b:
            b.tunggu_kata("tutupi")
            b.main(FadeIn(satu), run_time=0.9)
            b.tunggu_kata("terlalu kasar")
            b.main(*nyala(satu, warna=AKSEN2, skala=1.03), run_time=0.9)
        qc.periksa_adegan(self, {"kurva": k_lengkung}, hud=hud(), dunia={"bidang": bidang, "satu": satu})

        # ---- potong: partisi empat bagian, pengukur delta x berjalan ------ #
        empat = kotak_riemann(bidang, f_pembuka, KIRI_AWAL, KANAN_AWAL, 4, "kanan")
        lebar4 = (KANAN_AWAL - KIRI_AWAL) / 4
        tanda_x = VGroup(*[Line(bidang.c2p(KIRI_AWAL + lebar4 * i, -0.14), bidang.c2p(KIRI_AWAL + lebar4 * i, 0.18))
                           .set_stroke(SOROT, 3.0) for i in range(5)])
        lebar_bagi = Line(bidang.c2p(KIRI_AWAL, 0.45), bidang.c2p(KIRI_AWAL + lebar4, 0.45)).set_stroke(SOROT, 3.0)
        l_dx = rumus(r"\Delta x", 28, SOROT).next_to(lebar_bagi, UP, buff=0.12)
        with sinema.babak(self, "potong", DURASI, kata=KATA) as b:
            b.tunggu_kata("dipotong")
            b.main(FadeOut(satu), ShowCreation(tanda_x, lag_ratio=0.35), run_time=1.0)
            b.main(FadeIn(empat, lag_ratio=0.3), run_time=1.0)
            b.tunggu_kata("partisi")
            papan.baris(r"\text{partisi: } n = 4", warna=SOROT, b=b)
            b.tunggu_kata("delta x")
            b.main(ShowCreation(lebar_bagi), FadeIn(l_dx), run_time=0.7)
            selebar = bidang.c2p(lebar4, 0) - bidang.c2p(0, 0)
            ukur = VGroup(lebar_bagi, l_dx)
            for _ in range(2):
                b.main(ukur.animate.shift(selebar), run_time=0.45)
        qc.periksa_adegan(self, {"kurva": k_lengkung, "pengukur": lebar_bagi}, hud=hud(),
                          tulisan={"delta x": l_dx}, dunia={"bidang": bidang, "empat": empat})

        # ---- tinggi: titik sampel, kiri, kanan, tengah -------------------- #
        def tegak_di(x):
            return Line(bidang.c2p(x, 0), bidang.c2p(x, f_pembuka(x))).set_stroke(AKSEN, 3.0)

        def titik_di(x):
            return Dot(bidang.c2p(x, f_pembuka(x)), radius=0.075).set_color(AKSEN)

        x_kiri = KIRI_AWAL + lebar4 * 2
        x_kanan = KIRI_AWAL + lebar4 * 3
        x_tengah = KIRI_AWAL + lebar4 * 2.5
        tegak, titik = tegak_di(x_kanan), titik_di(x_kanan)
        l_sampel = sinema.label("titik sampel", warna=AKSEN).next_to(titik, UR, buff=0.14)
        with sinema.babak(self, "tinggi", DURASI, kata=KATA) as b:
            b.tunggu_kata("didirikan")
            b.main(*nyala(empat[2], warna=AKSEN2, skala=1.03), run_time=0.8)
            b.tunggu_kata("nilai fungsi")
            b.main(ShowCreation(tegak), FadeIn(titik, scale=0.5), run_time=0.8)
            b.tunggu_kata("titik sampel")
            b.main(FadeIn(l_sampel), *nyala(titik, warna=AKSEN, skala=1.4), run_time=0.8)
            for frasa, x in (("ujung kiri", x_kiri), ("ujung kanan", x_kanan), ("tengahnya", x_tengah)):
                b.tunggu_kata(frasa)
                b.main(Transform(tegak, tegak_di(x)), Transform(titik, titik_di(x)),
                       l_sampel.animate.next_to(titik_di(x), UR, buff=0.14), run_time=0.7)
        qc.periksa_adegan(self, {"label sampel": l_sampel}, hud=hud(), dunia={"bidang": bidang, "empat": empat})

        # ---- contoh: f(x) = x pada [0, 7], tujuh bagian ------------------- #
        k_lurus = kurva(bidang, f_lurus, A, B, warna=TINTA)
        daerah_lurus = daerah_bawah(bidang, f_lurus, A, B)
        tanda7 = VGroup(*[Line(bidang.c2p(i, -0.14), bidang.c2p(i, 0.18)).set_stroke(SOROT, 3.0) for i in range(8)])
        with sinema.babak(self, "contoh", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kita pakai")
            b.main(FadeOut(empat), FadeOut(daerah), FadeOut(tanda_x), FadeOut(l_dx), FadeOut(lebar_bagi),
                   FadeOut(titik), FadeOut(tegak), FadeOut(l_sampel), run_time=0.5)
            bersihkan_panel(self, papan, list(papan.baris_lain), b=b, run_time=0.3)
            b.tunggu_kata("diperiksa")
            b.main(Transform(k_lengkung, k_lurus), run_time=0.8)
            b.tunggu_kata("f dari")
            rum = sinema.lahir_rumus(self, r"f(x) = x", dekat=k_lurus, papan=papan, b=b, warna=TINTA,
                                     tahan=0.2, run_time=0.7)
            b.tunggu_kata("nol sampai")
            b.main(FadeIn(daerah_lurus), run_time=0.8)
            b.tunggu_kata("tujuh bagian")
            b.main(ShowCreation(tanda7, lag_ratio=0.2), run_time=0.9)
            b.tunggu_kata("Lebar tiap")
            papan.baris(r"\Delta x = 1", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"kurva": k_lengkung}, hud=hud(), dunia={"bidang": bidang})

        # ---- hitung7: tujuh persegi panjang kanan, jumlahnya 28 ----------- #
        kanan7 = kotak_riemann(bidang, f_lurus, A, B, 7, "kanan")
        with sinema.babak(self, "hitung7", DURASI, kata=KATA) as b:
            b.tunggu_kata("ujung kanan")
            b.main(FadeIn(kanan7[0]), run_time=0.6)
            b.tunggu_kata("Tingginya")
            b.main(LaggedStartMap(FadeIn, VGroup(*kanan7[1:]), lag_ratio=0.8), run_time=4.2)
            b.tunggu_kata("dijumlahkan")
            b_jumlah = papan.baris(r"1+2+\cdots+7 = 28", warna=AKSEN2, b=b)
            b.tunggu_kata("dua puluh delapan")
            b.main(*nyala(b_jumlah, warna=SOROT, skala=1.0), run_time=0.8)
            b.tunggu_kata("jumlahan Riemann")
            b.main(*nyala(kanan7, warna=SOROT), run_time=1.2)
        qc.periksa_adegan(self, {"kurva": k_lengkung}, hud=hud(), dunia={"bidang": bidang, "kotak": kanan7})

        # ---- segitiga: luas sebenarnya 24,5 -------------------------------- #
        segitiga = Polygon(bidang.c2p(0, 0), bidang.c2p(7, 0), bidang.c2p(7, 7))
        segitiga.set_fill(SOROT, 0.30).set_stroke(SOROT, 3.0)
        alas = Line(bidang.c2p(0, 0), bidang.c2p(7, 0)).set_stroke(SOROT, 5.0)
        tinggi_s = Line(bidang.c2p(7, 0), bidang.c2p(7, 7)).set_stroke(SOROT, 5.0)
        l_alas = sinema.label("alas 7", warna=SOROT).next_to(bidang.c2p(3.5, 0), UP, buff=0.14)
        l_tinggi = sinema.label("tinggi 7", warna=SOROT).next_to(bidang.c2p(7, 3.5), LEFT, buff=0.16)
        with sinema.babak(self, "segitiga", DURASI, kata=KATA) as b:
            b.tunggu_kata("segitiga siku-siku")
            b.main(kanan7.animate.set_fill(AKSEN2, 0.12).set_stroke(opacity=0.4), FadeOut(tanda7), run_time=0.6)
            b.main(ShowCreation(segitiga), run_time=1.0)
            b.tunggu_kata("alas tujuh")
            b.main(ShowCreation(alas), FadeIn(l_alas), run_time=0.6)
            b.tunggu_kata("tinggi tujuh")
            b.main(ShowCreation(tinggi_s), FadeIn(l_tinggi), run_time=0.7)
            b.tunggu_kata("yaitu")
            b_luas = papan.baris(r"\tfrac{1}{2}\cdot 7\cdot 7 = 24{,}5", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"label alas": l_alas, "label tinggi": l_tinggi}, [("label alas", "label tinggi")],
                          hud=hud(), dunia={"bidang": bidang})

        # ---- jepit: kiri 21, jawabannya terjepit --------------------------- #
        kiri7 = kotak_riemann(bidang, f_lurus, A, B, 7, "kiri")
        bayang_kanan = kanan7.copy().set_fill(AKSEN, 0.10).set_stroke(AKSEN, 1.4)
        with sinema.babak(self, "jepit", DURASI, kata=KATA) as b:
            b.tunggu_kata("kelebihan")
            b.main(FadeOut(alas), FadeOut(l_alas), FadeOut(tinggi_s), FadeOut(l_tinggi),
                   kanan7.animate.set_fill(AKSEN, 0.16).set_stroke(AKSEN, 1.6, opacity=0.8), run_time=0.8)
            b.tunggu_kata("Titik sampel kiri")
            b.main(FadeOut(kanan7), FadeIn(kiri7), run_time=0.9)
            b.tunggu_kata("yaitu")
            b_kiri = papan.baris(r"0+1+\cdots+6 = 21", warna=AKSEN2, b=b)
            b.tunggu_kata("terjepit")
            b_jepit = papan.baris(r"21 \le 24{,}5 \le 28", warna=SOROT, b=b)
            b.main(FadeIn(bayang_kanan), run_time=0.7)
        qc.periksa_adegan(self, {"kurva": k_lengkung}, hud=hud(), dunia={"bidang": bidang, "kotak": kiri7})

        # ---- asal: kelebihannya tujuh segitiga kecil setengah satuan ------- #
        sisa = VGroup(*[Polygon(bidang.c2p(i, i), bidang.c2p(i + 1, i), bidang.c2p(i + 1, i + 1))
                        .set_fill(AKSEN, 0.55).set_stroke(AKSEN, 1.6) for i in range(7)])
        with sinema.babak(self, "asal", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dari mana")
            b.main(FadeOut(kiri7), FadeOut(bayang_kanan), FadeIn(kanan7), run_time=0.8)
            bersihkan_panel(self, papan, [b_kiri, b_jepit], b=b, run_time=0.4)
            b.tunggu_kata("segitiga kecil")
            b.main(LaggedStartMap(FadeIn, sisa, lag_ratio=0.25), run_time=1.4)
            b.tunggu_kata("tiap-tiapnya")
            b.main(*nyala(sisa[3], warna=SOROT, skala=1.2), run_time=0.8)
            b.tunggu_kata("Tujuh kali")
            b_sisa = papan.baris(r"7 \times \tfrac{1}{2} = 3{,}5", warna=AKSEN, b=b)
            b.tunggu_kata("persis")
            b_sel = papan.baris(r"28 - 24{,}5 = 3{,}5", warna=AKSEN, b=b)
        qc.periksa_adegan(self, {"kurva": k_lengkung}, hud=hud(), dunia={"bidang": bidang, "kotak": kanan7, "sisa": sisa})

        # ---- perbanyak: n = 14 lalu n = 60 --------------------------------- #
        kanan14 = kotak_riemann(bidang, f_lurus, A, B, 14, "kanan")
        kanan60 = kotak_riemann(bidang, f_lurus, A, B, 60, "kanan")
        sisa14 = VGroup(*[Polygon(bidang.c2p(i / 2, i / 2), bidang.c2p((i + 1) / 2, i / 2),
                                  bidang.c2p((i + 1) / 2, (i + 1) / 2))
                          .set_fill(AKSEN, 0.55).set_stroke(AKSEN, 1.2) for i in range(14)])
        with sinema.babak(self, "perbanyak", DURASI, kata=KATA) as b:
            b.tunggu_kata("empat belas")
            b.main(FadeOut(kanan7), FadeOut(sisa), FadeIn(kanan14), FadeIn(sisa14), run_time=1.0)
            bersihkan_panel(self, papan, [b_sisa, b_sel], b=b, run_time=0.4)
            b.tunggu_kata("separuh lebar")
            b.main(*nyala(sisa14, warna=SOROT, skala=1.0), run_time=0.9)
            b.tunggu_kata("satu koma")
            sel = papan.baris(r"n = 14:\ \text{selisih } 1{,}75", warna=AKSEN, b=b)
            b.tunggu_kata("enam puluh")
            b.main(FadeOut(kanan14), FadeOut(sisa14), FadeIn(kanan60), run_time=1.0)
            b.tunggu_kata("nol koma")
            sel = sinema.ganti_rumus(self, sel, r"n = 60:\ \text{selisih } 0{,}41", b=b, run_time=0.8, warna=AKSEN,
                                     papan=papan)
        qc.periksa_adegan(self, {"kurva": k_lengkung}, hud=hud(), dunia={"bidang": bidang, "kotak": kanan60})

        # ---- umum: jumlah f(x_i) delta x ------------------------------------ #
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bentuk")
            bersihkan_panel(self, papan, [b_jumlah, b_luas], b=b, run_time=0.4)
            b.tunggu_kata("jumlah f")
            rum_umum = sinema.lahir_rumus(self, r"\sum_{i=1}^{n} f(x_i)\,\Delta x", dekat=kanan60, papan=papan, b=b,
                                          warna=SOROT, tahan=0.5, run_time=0.9, sebagai_utama=False)
            b.tunggu_kata("Makin besar")
            b.main(*nyala(kanan60, warna=SOROT, skala=1.0), run_time=0.9)
            b.tunggu_kata("makin rapat")
            b.main(*nyala(segitiga, warna=SOROT, skala=1.0), run_time=0.9)
        qc.periksa_adegan(self, {"kurva": k_lengkung}, hud=hud(), dunia={"bidang": bidang, "kotak": kanan60})

        # ---- turun: kurva menurun 4 - x^2 di bidang kecil ------------------ #
        bidang_kecil = ilustrasi.bidang_bernomor((0.0, 3.0, 1.0), (0.0, 5.0, 1.0))
        pusat_k, tinggi_k = kamera.muat_datar(bidang_kecil, sisa_atas=0.35, sisa_kanan=0.55)
        k_turun = kurva(bidang, f_lengkung, 0.0, 2.0, warna=TINTA)
        kiri4 = kotak_riemann(bidang, f_lengkung, 0.0, 2.0, 4, "kiri")
        kanan4 = kotak_riemann(bidang, f_lengkung, 0.0, 2.0, 4, "kanan", warna=AKSEN)
        with sinema.babak(self, "turun", DURASI, kata=KATA) as b:
            b.tunggu_kata("disalahpahami")
            b.main(FadeOut(kanan60), FadeOut(segitiga), run_time=0.6)
            b.tunggu_kata("Ganti kurvanya")
            b.main(FadeOut(bidang), FadeOut(daerah_lurus), FadeIn(bidang_kecil),
                   kamera.dekati(frame, pusat_k, tinggi=tinggi_k), run_time=1.2)
            qc.pastikan_hilang(self, {"bidang lama": bidang, "daerah contoh lurus": daerah_lurus,
                                      "kotak n=60": kanan60, "segitiga": segitiga},
                               nama="pergantian bidang di babak turun")
            b.main(Transform(k_lengkung, k_turun), run_time=0.8)
            rum = sinema.ganti_rumus(self, rum, r"f(x) = 4 - x^2", b=b, run_time=0.8, warna=TINTA, papan=papan)
            bersihkan_panel(self, papan, [sel, rum_umum], b=b, run_time=0.4)
            b.tunggu_kata("empat bagian")
            b.main(FadeIn(kiri4, lag_ratio=0.25), run_time=1.0)
            b.tunggu_kata("Kiri enam")
            b_kiri4 = papan.baris(r"\text{kiri } 6{,}25", warna=AKSEN2, b=b)
            b.tunggu_kata("kanan empat")
            b.main(FadeOut(kiri4), FadeIn(kanan4), run_time=0.8)
            b_kanan4 = papan.baris(r"\text{kanan } 4{,}25", warna=AKSEN, b=b)
        qc.periksa_adegan(self, {"kurva turun": k_lengkung}, hud=hud(), dunia={"bidang": bidang_kecil})

        # ---- tutup: kiri lawan kanan; yang lebih tinggi menang ------------- #
        bayang_kiri = kiri4.copy().set_fill(AKSEN2, 0.14).set_stroke(AKSEN2, 1.4)
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("kiri yang")
            b.main(FadeIn(bayang_kiri), run_time=0.7)
            b.main(*nyala(bayang_kiri, warna=SOROT), run_time=0.9)
            b.tunggu_kata("lebih tinggi")
            b_menang = papan.baris(r"\text{yang lebih tinggi menang}", warna=SOROT, b=b)
            b.tunggu_kata("sisi kanan")
            b.main(*nyala(kanan4, warna=SOROT), run_time=0.8)
            b.tunggu_kata("sisi kiri")
            b.main(*nyala(bayang_kiri, warna=SOROT), run_time=0.8)
        qc.periksa_adegan(self, {"kurva turun": k_lengkung}, hud=hud(), dunia={"bidang": bidang_kecil})

        # ---- rangkum: satu kalimat, lalu pertanyaan Bagian 2 ---------------- #
        kanan16 = kotak_riemann(bidang, f_lengkung, 0.0, 2.0, 16, "kanan", warna=AKSEN2)
        kanan64 = kotak_riemann(bidang, f_lengkung, 0.0, 2.0, 64, "kanan", warna=AKSEN2)
        tanya = rumus("?", 44, SOROT).move_to(bidang.c2p(1.5, 3.8))
        with sinema.babak(self, "rangkum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Rangkumannya")
            bersihkan_panel(self, papan, [b_kiri4, b_kanan4, b_menang], b=b, run_time=0.4)
            b.tunggu_kata("menutupinya")
            b.main(FadeOut(bayang_kiri), *nyala(kanan4, warna=SOROT), run_time=0.9)
            b.tunggu_kata("makin banyak")
            b.main(FadeOut(kanan4), FadeIn(kanan16), run_time=0.9)
            b.tunggu_kata("makin dekat")
            b.main(FadeOut(kanan16), FadeIn(kanan64), run_time=0.9)
            b.tunggu_kata("tak hingga")
            b.main(*nyala(kanan64, warna=SOROT, skala=1.0), run_time=0.9)
            b.tunggu_kata("apa nama")
            b.main(FadeIn(tanya, scale=0.6), run_time=0.6)
        qc.periksa_adegan(self, {"kurva turun": k_lengkung}, hud=hud(), tulisan={"tanya": tanya},
                          dunia={"bidang": bidang_kecil, "kotak": kanan64})

        # ---- lanjut: Bagian 2, lambang integral tentu ----------------------- #
        # Di kanan atas (zona panel yang sudah kosong), bukan di tengah atas:
        # puncak bidang kecil mencapai y layar 3,0 dan judul di (0, 2,9)
        # menindihnya (qc menolak, 12 Sep 2026).
        judul_lanjut = teks("Luas dan Integral Tentu, Bagian 2", 30, SOROT).move_to([4.4, 2.35, 0]).fix_in_frame()
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di materi")
            b.main(FadeOut(tanya), FadeOut(papan.semua()), run_time=0.5)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self)
            self.hud_tambah(judul_lanjut)
            self.remove(judul_lanjut)
            b.tunggu_kata("Luas dan")
            b.main(FadeIn(judul_lanjut, shift=0.2 * UP), run_time=0.7)
            b.tunggu_kata("diberi nama")
            b.main(*nyala(kanan64, warna=SOROT, skala=1.0), run_time=0.9)
            b.tunggu_kata("lambang")
            lambang = sinema.lahir_rumus(self, r"\int_0^2 (4 - x^2)\,dx", dekat=kanan64, papan=papan, b=b,
                                         warna=SOROT, tahan=0.5, run_time=0.8)
        qc.periksa_adegan(self, {"kurva turun": k_lengkung},
                          hud={"identitas": ident, "judul": judul_lanjut, "papan": papan.semua()},
                          dunia={"bidang": bidang_kecil, "kotak": kanan64})

        sinema.laporkan_pemicu(self)
