"""Video Integral Materi 05: luas dari persegi panjang, jumlahan Riemann.

TIDAK ADA PEMBUKA 3D. Aturan 2 STANDAR-ILUSTRASI-VIDEO memberi jatah 3D kepada
video dengan NOMOR TAHAP TERKECIL, yaitu Materi 01 (yang pertama ditonton
siswa), bukan yang pertama dibuat. Video ini langsung masuk ke matematikanya.

WARNA, satu makna sepanjang video:
  AKSEN2 biru  = persegi panjang dan jumlahannya
  AKSEN merah  = selisih terhadap luas sebenarnya
  SOROT ungu   = luas sebenarnya dan kesimpulan
  REDUP        = bantu, TINTA = tulisan

SELURUH ANGKA di adegan ini sama dengan angka di halaman Materi 05 dan sudah
lolos `python alat/cek_integral.py alat/klaim-video-integral.json`:
28, 21, 24,5, 26,25 (selisih 1,75), 2989/120 (selisih 49/120), 6,25, dan 4,25.

Alur berkas: naskah -> buat_narasi.py -> buat_subtitle.py -> adegan ini ->
cek_kode.py -> manimgl -w -l -> cek_video.py (BUKA lembar kontak) ->
gabung_audio.py integral05-riemann IntegralRiemann --uji.
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

# Kurva utama: f(x) = x pada [0, 7]. Dipilih buku justru karena daerahnya
# segitiga siku-siku, jadi luas sebenarnya bisa diperiksa siswa dengan rumus SMP.
A, B = 0.0, 7.0


def f_lurus(x):
    return x


def f_lengkung(x):
    return 4.0 - x * x


def kotak_riemann(bidang, f, a, b, n, sampel="kanan", warna=AKSEN2, opacity=0.30):
    """Persegi panjang jumlahan Riemann, dibangun dari fungsinya sendiri.

    Tingginya DIHITUNG, tidak ditulis tangan: gambar yang angkanya diketik
    terpisah dari rumusnya cepat atau lambat akan membantah panel di sebelahnya.
    """
    geser = {"kiri": 0.0, "kanan": 1.0, "tengah": 0.5}[sampel]
    lebar = (b - a) / n
    kelompok = VGroup()
    for i in range(n):
        kiri = a + i * lebar
        tinggi = f(kiri + geser * lebar)
        if tinggi <= 0:
            continue
        pojok_kiri_bawah = bidang.c2p(kiri, 0)
        pojok_kanan_atas = bidang.c2p(kiri + lebar, tinggi)
        kotak = Rectangle(
            width=pojok_kanan_atas[0] - pojok_kiri_bawah[0],
            height=pojok_kanan_atas[1] - pojok_kiri_bawah[1],
        )
        kotak.move_to((pojok_kiri_bawah + pojok_kanan_atas) / 2)
        kotak.set_fill(warna, opacity)
        kotak.set_stroke(warna, 1.6 if n <= 20 else 0.7, opacity=0.85)
        kelompok.add(kotak)
    return kelompok


def kurva(bidang, f, a, b, warna=TINTA, tebal=3.2):
    """Kurva digambar dari titik yang DIHITUNG, bukan muncul jadi."""
    titik = [bidang.c2p(a + (b - a) * i / 160, f(a + (b - a) * i / 160)) for i in range(161)]
    return VMobject().set_points_smoothly(titik).set_stroke(warna, tebal)


class IntegralRiemann(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        jam = sinema.jam_subtitle(TOPIK)

        # ---------------------------------------------------------------
        # buka: HANYA judul materi, sama dengan kalimat yang diucapkan.
        # ---------------------------------------------------------------
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(3.0, DURASI["buka"] - 0.6)
            sinema.judul_pembuka(
                self, "Materi 05: Luas dari persegi panjang", lama=lama)
            b.catat(lama)

        # Bidang dipakai seluruh video; kamera dipasang sekali dan hanya
        # bergerak sekali (babak `turun`), sesuai aturan satu gerakan per babak.
        bidang = ilustrasi.bidang_bernomor((-0.5, 7.5, 1.0), (-0.5, 8.0, 1.0))
        pusat, tinggi_kam = kamera.muat_datar(bidang, sisa_atas=0.35, sisa_kanan=0.55)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi_kam)

        # ---------------------------------------------------------------
        # masalah: persegi panjang yang gampang diukur, lalu daerah melengkung.
        # ---------------------------------------------------------------
        kotak_mudah = Rectangle(
            width=bidang.c2p(3, 0)[0] - bidang.c2p(0, 0)[0],
            height=bidang.c2p(0, 2)[1] - bidang.c2p(0, 0)[1],
        )
        kotak_mudah.move_to((bidang.c2p(0, 0) + bidang.c2p(3, 2)) / 2)
        kotak_mudah.set_fill(REDUP, 0.28).set_stroke(REDUP, 2.4)
        l_mudah = sinema.label("3 x 2", warna=REDUP).move_to(bidang.c2p(1.5, 1.0))

        k_lengkung = kurva(bidang, lambda x: 1.2 + 5.0 * (x / 7.0) ** 0.55, 0.2, 7.0)
        daerah = VMobject().set_points_as_corners(
            [bidang.c2p(0.2, 0)]
            + [bidang.c2p(0.2 + 6.8 * i / 60, 1.2 + 5.0 * ((0.2 + 6.8 * i / 60) / 7.0) ** 0.55)
               for i in range(61)]
            + [bidang.c2p(7.0, 0), bidang.c2p(0.2, 0)]
        ).set_fill(AKSEN2, 0.18).set_stroke(width=0)

        with sinema.babak(self, "masalah", DURASI) as b:
            b.main(FadeIn(bidang), run_time=0.8)
            b.main(ShowCreation(kotak_mudah), FadeIn(l_mudah), run_time=1.6)
            b.tunggu_sampai(sinema.mulai(jam, "Tapi tepi atas"))
            b.main(FadeOut(kotak_mudah), FadeOut(l_mudah), run_time=0.7)
            b.main(ShowCreation(k_lengkung), run_time=2.0)
            b.main(FadeIn(daerah), run_time=1.4)
            ident = sinema.identitas(self, "1 petak = 1 satuan")
        qc.periksa_adegan(self, {"kurva": k_lengkung},
                          hud={"identitas": ident}, dunia={"bidang": bidang})

        # ---------------------------------------------------------------
        # gagasan: satu persegi panjang diletakkan di bawah kurva.
        # ---------------------------------------------------------------
        satu = kotak_riemann(bidang, lambda x: 1.2 + 5.0 * (x / 7.0) ** 0.55, 0.2, 7.0, 1, "kiri")
        with sinema.babak(self, "gagasan", DURASI) as b:
            b.main(FadeIn(satu), run_time=1.2)
            b.main(Indicate(satu, color=AKSEN2, scale_factor=1.03), run_time=1.2)
            b.catat(0.6)

        # ---------------------------------------------------------------
        # potong: selang dipecah jadi beberapa bagian, lebarnya delta x.
        # ---------------------------------------------------------------
        empat = kotak_riemann(bidang, lambda x: 1.2 + 5.0 * (x / 7.0) ** 0.55, 0.2, 7.0, 4, "kanan")
        tanda_x = VGroup(*[
            Line(bidang.c2p(0.2 + 6.8 * i / 4, -0.16), bidang.c2p(0.2 + 6.8 * i / 4, 0.16))
            .set_stroke(SOROT, 3.0) for i in range(5)
        ])
        # Rumus di dalam gambar lewat `rumus()`, BUKAN `sinema.label()`:
        # `label` meloloskan tanda dolar sebagai huruf biasa, jadi dolarnya ikut
        # tercetak di layar. `cek_kode.py` menolaknya, dan itu benar.
        #
        # DITARUH DI ATAS SUMBU, BUKAN DI BAWAHNYA. Versi pertama menempatkannya
        # 0,30 satuan di bawah sumbu, dan di situ persis angka sumbu x berada.
        # `qc` TIDAK memeriksa tulisan dunia lawan angka sumbu (temuan sesi
        # Turunan pada video 02-nya: label "jarak h" terbaca "1 jarak h2 = 0,51"),
        # jadi tabrakan itu akan lolos gerbang dan baru ketahuan dari lembar
        # kontak. Lebih murah dihindari daripada ditemukan.
        lebar_bagi = Line(bidang.c2p(0.2, 0.45), bidang.c2p(0.2 + 6.8 / 4, 0.45))
        lebar_bagi.set_stroke(SOROT, 3.0)
        l_dx = rumus(r"\Delta x", 28, SOROT).next_to(lebar_bagi, UP, buff=0.12)
        with sinema.babak(self, "potong", DURASI) as b:
            b.main(FadeOut(satu), run_time=0.5)
            b.main(ShowCreation(tanda_x), run_time=1.6)
            b.main(FadeIn(empat, lag_ratio=0.25), run_time=2.4)
            b.tunggu_sampai(sinema.mulai(jam, "lebarnya"))
            b.main(ShowCreation(lebar_bagi), FadeIn(l_dx), run_time=1.0)
            b.main(Indicate(l_dx, color=SOROT), run_time=0.8)

        # ---------------------------------------------------------------
        # tinggi: satu titik sampel disorot, tingginya ditarik ke kurva.
        # ---------------------------------------------------------------
        x_s = 0.2 + 6.8 * 1.5 / 4
        y_s = 1.2 + 5.0 * ((0.2 + 6.8 * 2 / 4) / 7.0) ** 0.55
        titik = Dot(bidang.c2p(0.2 + 6.8 * 2 / 4, y_s), radius=0.075).set_color(AKSEN)
        tegak = Line(bidang.c2p(0.2 + 6.8 * 2 / 4, 0),
                     bidang.c2p(0.2 + 6.8 * 2 / 4, y_s)).set_stroke(AKSEN, 3.0)
        l_sampel = sinema.label("titik sampel", warna=AKSEN).next_to(titik, UR, buff=0.14)
        with sinema.babak(self, "tinggi", DURASI) as b:
            b.main(ShowCreation(tegak), run_time=1.2)
            b.main(FadeIn(titik, scale=0.5), run_time=0.7)
            b.tunggu_sampai(sinema.mulai(jam, "titik sampel"))
            b.main(FadeIn(l_sampel), run_time=0.8)
            b.main(Indicate(titik, color=AKSEN), run_time=1.0)
            b.catat(0.5)
        qc.periksa_adegan(self, {"label sampel": l_sampel},
                          hud={"identitas": ident}, dunia={"bidang": bidang})

        # ---------------------------------------------------------------
        # contoh: ganti ke f(x) = x pada [0, 7]. Rumus LAHIR dekat kurvanya.
        # ---------------------------------------------------------------
        k_lurus = kurva(bidang, f_lurus, A, B, warna=TINTA)
        with sinema.babak(self, "contoh", DURASI) as b:
            b.main(FadeOut(empat), FadeOut(daerah), FadeOut(tanda_x), FadeOut(l_dx),
                   FadeOut(lebar_bagi), FadeOut(titik), FadeOut(tegak),
                   FadeOut(l_sampel), run_time=0.9)
            b.main(Transform(k_lengkung, k_lurus), run_time=1.8)
            rum = sinema.lahir_rumus(self, r"f(x) = x", dekat=k_lurus, papan=papan,
                                     b=b, warna=TINTA)
            b.main(Indicate(bidang.angka, color=SOROT, scale_factor=1.02), run_time=1.4)

        # ---------------------------------------------------------------
        # hitung7: tujuh persegi panjang kanan tumbuh satu per satu, jumlah 28.
        # ---------------------------------------------------------------
        kanan7 = kotak_riemann(bidang, f_lurus, A, B, 7, "kanan")
        with sinema.babak(self, "hitung7", DURASI) as b:
            b.main(LaggedStartMap(FadeIn, kanan7, lag_ratio=0.5), run_time=5.2)
            b.tunggu_sampai(sinema.mulai(jam, "Semuanya dijumlahkan"))
            papan.baris(r"1+2+\cdots+7 = 28", warna=AKSEN2, b=b)
            b.main(Indicate(kanan7, color=AKSEN2, scale_factor=1.02), run_time=1.6)
        qc.periksa_adegan(self, {"kurva": k_lengkung},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang, "kotak": kanan7})

        # ---------------------------------------------------------------
        # segitiga: daerah aslinya segitiga; luas sebenarnya 24,5.
        # ---------------------------------------------------------------
        segitiga = Polygon(bidang.c2p(0, 0), bidang.c2p(7, 0), bidang.c2p(7, 7))
        segitiga.set_fill(SOROT, 0.30).set_stroke(SOROT, 3.0)
        with sinema.babak(self, "segitiga", DURASI) as b:
            b.main(kanan7.animate.set_fill(AKSEN2, 0.12).set_stroke(opacity=0.4), run_time=0.9)
            b.main(ShowCreation(segitiga), run_time=2.2)
            b.tunggu_sampai(sinema.mulai(jam, "Setengah kali alas"))
            papan.baris(r"\tfrac{1}{2}\cdot 7\cdot 7 = 24{,}5", warna=SOROT, b=b)
            b.main(Indicate(segitiga, color=SOROT, scale_factor=1.02), run_time=1.6)

        # ---------------------------------------------------------------
        # jepit: titik sampel kiri memberi 21; jawabannya terjepit.
        # ---------------------------------------------------------------
        kiri7 = kotak_riemann(bidang, f_lurus, A, B, 7, "kiri")
        with sinema.babak(self, "jepit", DURASI) as b:
            b.main(kanan7.animate.set_fill(AKSEN, 0.16).set_stroke(AKSEN, 1.6, opacity=0.8),
                   run_time=1.0)
            b.tunggu_sampai(sinema.mulai(jam, "Titik sampel kiri"))
            b.main(FadeOut(kanan7), FadeIn(kiri7), run_time=1.6)
            papan.baris(r"21 \le 24{,}5 \le 28", warna=AKSEN2, b=b)
            b.main(Indicate(kiri7, color=AKSEN2, scale_factor=1.02), run_time=1.6)
        qc.periksa_adegan(self, {"kurva": k_lengkung},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang, "kotak": kiri7})

        # ---------------------------------------------------------------
        # perbanyak: n = 14 lalu n = 60; selisihnya menyusut.
        # ---------------------------------------------------------------
        kanan14 = kotak_riemann(bidang, f_lurus, A, B, 14, "kanan")
        kanan60 = kotak_riemann(bidang, f_lurus, A, B, 60, "kanan")
        with sinema.babak(self, "perbanyak", DURASI) as b:
            b.main(FadeOut(kiri7), FadeIn(kanan14), run_time=1.4)
            sel = papan.baris(r"n = 14:\ \text{selisih } 1{,}75", warna=AKSEN, b=b)
            b.tunggu_sampai(sinema.mulai(jam, "Dengan enam puluh"))
            b.main(FadeOut(kanan14), FadeIn(kanan60), run_time=1.8)
            sinema.ganti_rumus(self, sel, r"n = 60:\ \text{selisih } 0{,}41",
                               b=b, warna=AKSEN, papan=papan)

        # ---------------------------------------------------------------
        # turun: kurva menurun 4 - x^2; kamera mendekat sekali.
        # ---------------------------------------------------------------
        k_turun = kurva(bidang, f_lengkung, 0.0, 2.0, warna=TINTA)
        kiri4 = kotak_riemann(bidang, f_lengkung, 0.0, 2.0, 4, "kiri")
        kanan4 = kotak_riemann(bidang, f_lengkung, 0.0, 2.0, 4, "kanan", warna=AKSEN)

        # BIDANGNYA DIGANTI, BUKAN CUMA KAMERANYA YANG MENDEKAT.
        # Render pertama GAGAL di sini: `qc` menolak "bidang keluar bingkai,
        # kanan 8,12 > 6,82" setelah kamera mendekat, dan penolakan itu benar.
        # Melepas bidang dari daftar pemeriksaan hanya akan membungkam gerbangnya.
        # Yang benar: pakai bidang seukuran daerah yang memang ditampilkan, jadi
        # angka sumbunya pun ikut cocok dengan selang [0, 2] yang sedang dibahas.
        # Kedua bidang memetakan koordinat 1:1 ke layar (`unit_size=1.0` lalu
        # digeser supaya (0,0) di titik asal), sehingga kurva dan persegi panjang
        # yang sudah dibangun memakai `bidang` tetap jatuh di tempat yang sama.
        bidang_kecil = ilustrasi.bidang_bernomor((-0.5, 2.5, 1.0), (-0.5, 4.5, 1.0))
        pusat_k, tinggi_k = kamera.muat_datar(bidang_kecil, sisa_atas=0.35, sisa_kanan=0.55)

        with sinema.babak(self, "turun", DURASI) as b:
            b.main(FadeOut(kanan60), FadeOut(segitiga), FadeOut(k_lengkung), run_time=0.9)
            b.main(FadeOut(bidang), FadeIn(bidang_kecil),
                   kamera.dekati(frame, pusat_k, tinggi=tinggi_k), run_time=2.2)
            b.main(ShowCreation(k_turun), run_time=1.6)
            sinema.ganti_rumus(self, rum, r"f(x) = 4 - x^2", b=b, warna=TINTA, papan=papan)
            b.tunggu_sampai(sinema.mulai(jam, "Kiri enam koma"))
            b.main(FadeIn(kiri4, lag_ratio=0.2), run_time=1.6)
            papan.baris(r"\text{kiri } 6{,}25 \quad \text{kanan } 4{,}25", warna=AKSEN2, b=b)
        qc.periksa_adegan(self, {"kurva turun": k_turun},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_kecil})

        # ---------------------------------------------------------------
        # tutup: kiri lawan kanan, dan kesimpulannya.
        # ---------------------------------------------------------------
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(kiri4), FadeIn(kanan4), run_time=1.4)
            b.main(FadeIn(kiri4.copy().set_fill(AKSEN2, 0.16).set_stroke(AKSEN2, 1.4)),
                   run_time=1.2)
            b.tunggu_sampai(sinema.mulai(jam, "melainkan sisi"))
            papan.baris(r"\text{yang lebih tinggi menang}", warna=SOROT, b=b)
            b.main(Indicate(k_turun, color=SOROT), run_time=1.6)
            b.catat(0.8)
        qc.periksa_adegan(self, {"kurva turun": k_turun},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_kecil})
