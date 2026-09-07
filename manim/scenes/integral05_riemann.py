"""Video Integral Materi 05: luas dari persegi panjang, jumlahan Riemann.

TIDAK ADA PEMBUKA 3D. Aturan 2 STANDAR-ILUSTRASI-VIDEO memberi jatah 3D kepada
video dengan NOMOR TAHAP TERKECIL, yaitu Materi 01 (yang pertama ditonton
siswa), bukan yang pertama dibuat. Video ini langsung masuk ke matematikanya.

WARNA, satu makna sepanjang video:
  AKSEN2 biru  = persegi panjang dan jumlahannya
  AKSEN merah  = selisih terhadap luas sebenarnya
  SOROT ungu   = luas sebenarnya dan kesimpulan
  REDUP        = bantu, TINTA = tulisan

ISTILAH DISAMAKAN DENGAN WIDGET HALAMANNYA (`widget/integral/
PersegiPanjangMenumpuk.tsx`), diperiksa 8 Sep 2026 dengan membuka widgetnya:
"bagian", "titik sampel" (kiri, kanan, tengah), "jumlahan", "luas sebenarnya",
"selisih". Warnanya juga sama: persegi panjang biru, kurva gelap.

BATAS SUMBU WAJIB KELIPATAN LANGKAHNYA. Versi pertama memakai (-0,5 ... 7,5)
dengan langkah 1, dan angka sumbunya meleset setengah petak lalu dibulatkan
saat ditampilkan; hasilnya tiga angka "0" liar berserakan di kiri dan bawah
sumbu. Terbaca setelah frame diperbesar, tidak terlihat di lembar kontak.
`bidang_bernomor` sekarang menolaknya sendiri.

SELURUH ANGKA di adegan ini sama dengan angka di halaman Materi 05 dan sudah
lolos `python alat/cek_integral.py alat/klaim-video-integral.json`:
28, 21, 24,5, 26,25 (selisih 1,75), 2989/120 (selisih 49/120), 6,25, dan 4,25.

Alur berkas: naskah -> buat_narasi.py -> buat_subtitle.py -> adegan ini ->
cek_kode.py -> manimgl -w -l -> cek_video.py (BUKA lembar kontak) ->
alat/ukur_detik_pertama.py -> alat/cek_layar_kosong.py ->
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
# Kurva pembuka, dipakai hanya untuk memperlihatkan "tepi atas yang melengkung".
KIRI_AWAL, KANAN_AWAL = 0.2, 7.0


def f_lurus(x):
    return x


def f_lengkung(x):
    return 4.0 - x * x


def f_pembuka(x):
    return 1.2 + 5.0 * (x / 7.0) ** 0.55


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


def daerah_bawah(bidang, f, a, b, warna=AKSEN2, opacity=0.18, langkah=60):
    """Daerah di bawah kurva, untuk memperlihatkan 'yang mau diukur'."""
    titik = ([bidang.c2p(a, 0)]
             + [bidang.c2p(a + (b - a) * i / langkah, f(a + (b - a) * i / langkah))
                for i in range(langkah + 1)]
             + [bidang.c2p(b, 0), bidang.c2p(a, 0)])
    return VMobject().set_points_as_corners(titik).set_fill(warna, opacity).set_stroke(width=0)


def bersihkan_panel(scene, papan, buang, b=None, run_time=0.9):
    """Buang beberapa baris dari panel, lalu rapatkan sisanya.

    KENAPA PERLU
    `PapanRumus` sengaja dirancang MENUMPUK, dan itu tepat selama satu contoh:
    melihat 28, lalu 24,5, lalu jepitannya berdampingan justru pelajarannya.
    Tetapi video ini berpindah ke kurva LAIN di babak terakhir, dan panel yang
    masih memajang "1+2+...+7 = 28" di sebelah gambar 4 - x kuadrat sedang
    memajang angka milik kurva yang sudah tidak ada di layar. Terlihat di lembar
    kontak render kedua, bukan dari kode.

    Panel tidak punya cara membuang baris, jadi dikerjakan lewat daftarnya
    sendiri: baris dikeluarkan dari `baris_lain`, sisanya ditempatkan ulang
    supaya tidak menyisakan lubang, dan alas kertasnya dikecilkan supaya tidak
    tertinggal kotak kosong.
    """
    buang = [m for m in buang if m is not None]
    if not buang:
        return
    scene.play(*[FadeOut(m) for m in buang], run_time=run_time)
    for m in buang:
        if m in papan.baris_lain:
            papan.baris_lain.remove(m)
        scene.remove(m)
    for i, m in enumerate(papan.baris_lain):
        papan.tempat_baris(m, i)
    papan.perbarui_alas()
    if b is not None:
        b.catat(run_time)


def pastikan_hilang(scene, benda: dict) -> None:
    """Gagalkan render kalau benda dunia dari babak sebelumnya masih terpasang.

    `qc.periksa_adegan` hanya memeriksa benda yang DISERAHKAN kepadanya, jadi
    benda yang lupa dibuang tidak melanggar apa pun: ia cuma tetap tergambar.
    Pada render kelima itu membuat segitiga contoh f(x) = x tertinggal di
    layar sepanjang dua babak terakhir, di belakang panel rumus, sementara
    narator sudah membahas kurva yang lain. Gerbang ini menyebut namanya.
    """
    tersisa = [nama for nama, m in benda.items() if m in scene.mobjects]
    if tersisa:
        raise RuntimeError(
            "benda babak lama masih di layar: " + ", ".join(tersisa) +
            ". Tambahkan FadeOut-nya pada pergantian babak.")


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

        # Semua isi video berada di kuadran pertama, jadi bidangnya dipatok di
        # sana: batasnya kelipatan langkah, dan tidak ada sumbu negatif yang
        # kosong memakan lebar layar.
        bidang = ilustrasi.bidang_bernomor((0.0, 8.0, 1.0), (0.0, 8.0, 1.0))
        pusat, tinggi_kam = kamera.muat_datar(bidang, sisa_atas=0.35, sisa_kanan=0.55)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi_kam)

        # ---------------------------------------------------------------
        # masalah: persegi panjang yang mudah diukur, lalu daerah melengkung.
        # ---------------------------------------------------------------
        kotak_mudah = Rectangle(
            width=bidang.c2p(3, 0)[0] - bidang.c2p(0, 0)[0],
            height=bidang.c2p(0, 2)[1] - bidang.c2p(0, 0)[1],
        )
        kotak_mudah.move_to((bidang.c2p(0, 0) + bidang.c2p(3, 2)) / 2)
        kotak_mudah.set_fill(REDUP, 0.28).set_stroke(REDUP, 2.4)
        l_mudah = sinema.label("3 x 2", warna=REDUP).move_to(bidang.c2p(1.5, 1.0))

        k_lengkung = kurva(bidang, f_pembuka, KIRI_AWAL, KANAN_AWAL)
        daerah = daerah_bawah(bidang, f_pembuka, KIRI_AWAL, KANAN_AWAL)

        with sinema.babak(self, "masalah", DURASI) as b:
            b.main(FadeIn(bidang), run_time=0.9)
            b.main(ShowCreation(kotak_mudah), FadeIn(l_mudah), run_time=2.0)
            b.tunggu_sampai(sinema.mulai(jam, "Tapi tepi atas"))
            b.main(FadeOut(kotak_mudah), FadeOut(l_mudah), run_time=0.8)
            b.main(ShowCreation(k_lengkung), run_time=2.2)
            b.main(FadeIn(daerah), run_time=1.4)
            ident = sinema.identitas(self, "1 petak = 1 satuan")
        qc.periksa_adegan(self, {"kurva": k_lengkung},
                          hud={"identitas": ident}, dunia={"bidang": bidang})

        # ---------------------------------------------------------------
        # gagasan: satu persegi panjang diletakkan di bawah kurva.
        # ---------------------------------------------------------------
        satu = kotak_riemann(bidang, f_pembuka, KIRI_AWAL, KANAN_AWAL, 1, "kiri")
        with sinema.babak(self, "gagasan", DURASI) as b:
            b.main(FadeIn(satu), run_time=1.6)
            b.tunggu_sampai(sinema.mulai(jam, "tutupi dengan yang bisa."))
            b.main(Indicate(satu, color=AKSEN2, scale_factor=1.03), run_time=1.6)

        # ---------------------------------------------------------------
        # potong: selang dipecah, lebarnya delta x.
        # ---------------------------------------------------------------
        empat = kotak_riemann(bidang, f_pembuka, KIRI_AWAL, KANAN_AWAL, 4, "kanan")
        lebar4 = (KANAN_AWAL - KIRI_AWAL) / 4
        tanda_x = VGroup(*[
            Line(bidang.c2p(KIRI_AWAL + lebar4 * i, -0.14),
                 bidang.c2p(KIRI_AWAL + lebar4 * i, 0.18)).set_stroke(SOROT, 3.0)
            for i in range(5)
        ])
        # Ruas pengukur DI ATAS sumbu, bukan di bawahnya: `qc` tidak memeriksa
        # tulisan dunia lawan angka sumbu (temuan sesi Turunan), jadi label yang
        # ditaruh di jalur angka akan menabraknya tanpa tertangkap gerbang.
        lebar_bagi = Line(bidang.c2p(KIRI_AWAL, 0.45),
                          bidang.c2p(KIRI_AWAL + lebar4, 0.45)).set_stroke(SOROT, 3.0)
        l_dx = rumus(r"\Delta x", 28, SOROT).next_to(lebar_bagi, UP, buff=0.12)

        with sinema.babak(self, "potong", DURASI) as b:
            b.main(FadeOut(satu), run_time=0.5)
            b.main(ShowCreation(tanda_x, lag_ratio=0.35), run_time=1.6)
            b.main(FadeIn(empat, lag_ratio=0.3), run_time=1.6)
            b.tunggu_sampai(sinema.mulai(jam, "Pembagiannya disebut"))
            b.main(ShowCreation(lebar_bagi), FadeIn(l_dx), run_time=1.4)
            b.main(Indicate(l_dx, color=SOROT), run_time=1.2)
            # Ruas pengukurnya BERJALAN dari bagian ke bagian. Dua percobaan
            # sebelumnya memakai denyut warna (`Indicate`) dan keduanya gagal:
            # frame detik 28 dan 30 pada render kelima praktis gambar yang sama,
            # sebab `scale_factor` 1,02 pada bidang setengah tembus pandang
            # hampir tidak mengubah piksel. Yang penting bukan menyalakan
            # kotaknya, melainkan memperlihatkan bahwa lebar yang SAMA muat di
            # tiap bagian. Itu justru arti "sama lebar" yang sedang diucapkan.
            selebar = bidang.c2p(lebar4, 0) - bidang.c2p(0, 0)
            ukur = VGroup(lebar_bagi, l_dx)
            for _ in range(3):
                b.main(ukur.animate.shift(selebar), run_time=1.0)

        # ---------------------------------------------------------------
        # tinggi: titik sampel, dan bahwa TIAP bagian punya satu.
        # ---------------------------------------------------------------
        def tegak_di(i):
            x = KIRI_AWAL + lebar4 * (i + 1)
            return Line(bidang.c2p(x, 0), bidang.c2p(x, f_pembuka(x))).set_stroke(AKSEN, 3.0)

        def titik_di(i):
            x = KIRI_AWAL + lebar4 * (i + 1)
            return Dot(bidang.c2p(x, f_pembuka(x)), radius=0.075).set_color(AKSEN)

        tegak, titik = tegak_di(1), titik_di(1)
        l_sampel = sinema.label("titik sampel", warna=AKSEN).next_to(titik, UR, buff=0.14)
        with sinema.babak(self, "tinggi", DURASI) as b:
            b.main(ShowCreation(tegak), run_time=1.4)
            b.main(FadeIn(titik, scale=0.5), run_time=0.8)
            # Sementara narator mengucapkan "setinggi NILAI FUNGSI", nilainya
            # ditarik ke sumbu tegak. Tanpa ini layar diam 1,8 detik menunggu
            # kalimat berikutnya, dan alat ukur diam menghitung detik 27,9
            # sampai 34,4 sebagai satu rentang beku.
            garis_nilai = DashedLine(
                bidang.c2p(0, f_pembuka(KIRI_AWAL + lebar4 * 2)),
                bidang.c2p(KIRI_AWAL + lebar4 * 2, f_pembuka(KIRI_AWAL + lebar4 * 2)),
            ).set_stroke(AKSEN, 2.0)
            b.main(ShowCreation(garis_nilai), run_time=1.2)
            b.tunggu_sampai(sinema.mulai(jam, "diambil di satu titik sampel."))
            # Label dan denyut titiknya JADI SATU kejadian, bukan dua beruntun:
            # keduanya menerangkan benda yang sama, dan menggabungkannya memberi
            # waktu kepada dua perpindahan di bawah, yang justru perlu terbaca.
            b.main(FadeIn(l_sampel), Indicate(titik, color=AKSEN),
                   FadeOut(garis_nilai), run_time=1.0)
            # TIAP bagian punya titik sampelnya sendiri: batangnya berpindah,
            # bukan diam sementara narator menyebut "di tiap bagian". Persegi
            # panjang yang bersangkutan ikut menyala, sebab batang setipis ini
            # saja tidak terbaca sebagai kejadian di 480p: itulah yang membuat
            # detik 26 sampai 34 pada render keempat tampak beku.
            for i in (2, 3):
                b.main(Transform(tegak, tegak_di(i)), Transform(titik, titik_di(i)),
                       l_sampel.animate.next_to(titik_di(i), UR, buff=0.14),
                       Indicate(empat[i], color=AKSEN, scale_factor=1.03), run_time=1.5)
        qc.periksa_adegan(self, {"label sampel": l_sampel},
                          hud={"identitas": ident}, dunia={"bidang": bidang})

        # ---------------------------------------------------------------
        # contoh: ganti ke f(x) = x pada [0, 7]; rumus LAHIR dekat kurvanya.
        # ---------------------------------------------------------------
        k_lurus = kurva(bidang, f_lurus, A, B, warna=TINTA)
        daerah_lurus = daerah_bawah(bidang, f_lurus, A, B)
        with sinema.babak(self, "contoh", DURASI) as b:
            b.main(FadeOut(empat), FadeOut(daerah), FadeOut(tanda_x), FadeOut(l_dx),
                   FadeOut(lebar_bagi), FadeOut(titik), FadeOut(tegak),
                   FadeOut(l_sampel), run_time=1.0)
            b.main(Transform(k_lengkung, k_lurus), run_time=2.4)
            rum = sinema.lahir_rumus(self, r"f(x) = x", dekat=k_lurus, papan=papan,
                                     b=b, warna=TINTA)
            # Daerah yang mau diukur DIWARNAI sekarang, bukan dibiarkan kosong
            # sampai persegi panjangnya datang. Pada render keempat detik 46
            # hanya berisi satu garis diagonal di bidang kosong sementara
            # narator sudah menyebut selang dan banyak bagiannya.
            b.main(FadeIn(daerah_lurus), run_time=1.6)
            b.main(Indicate(bidang.angka, color=SOROT, scale_factor=1.02), run_time=1.4)

        # ---------------------------------------------------------------
        # hitung7: tujuh persegi panjang kanan, jumlahnya 28.
        # ---------------------------------------------------------------
        kanan7 = kotak_riemann(bidang, f_lurus, A, B, 7, "kanan")
        with sinema.babak(self, "hitung7", DURASI) as b:
            b.main(FadeIn(kanan7[0]), FadeIn(kanan7[1]), run_time=1.4)
            b.tunggu_sampai(sinema.mulai(jam, "Tinggi 1, 2, 3"))
            # lag_ratio 0.8 membuat tiap persegi panjang selesai muncul sebelum
            # yang berikutnya mulai. Pada render keempat lag 0.45 membuat kelima
            # kotak memudar bersamaan pelan-pelan, dan perubahan per frame-nya
            # terlalu kecil untuk terbaca sebagai kejadian.
            b.main(LaggedStartMap(FadeIn, VGroup(*kanan7[2:]), lag_ratio=0.8),
                   run_time=5.0)
            b.tunggu_sampai(sinema.mulai(jam, "Jumlahnya 28."))
            b_jumlah = papan.baris(r"1+2+\cdots+7 = 28", warna=AKSEN2, b=b)
            # Warna denyutnya HARUS beda dari warna benda itu sendiri. Sampai
            # render kelima tujuh `Indicate` di adegan ini menyuruh benda
            # berubah ke warna yang sudah dipakainya, jadi yang tersisa cuma
            # perbesaran dua persen: tidak ada satu piksel pun yang berganti
            # warna, dan alat ukur diam membaca babak-babak itu sebagai beku.
            b.main(Indicate(kanan7, color=SOROT, scale_factor=1.05), run_time=1.6)
        qc.periksa_adegan(self, {"kurva": k_lengkung},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang, "kotak": kanan7})

        # ---------------------------------------------------------------
        # segitiga: daerah aslinya segitiga; luas sebenarnya 24,5.
        # ---------------------------------------------------------------
        segitiga = Polygon(bidang.c2p(0, 0), bidang.c2p(7, 0), bidang.c2p(7, 7))
        segitiga.set_fill(SOROT, 0.30).set_stroke(SOROT, 3.0)
        alas = Line(bidang.c2p(0, 0), bidang.c2p(7, 0)).set_stroke(SOROT, 5.0)
        tinggi_s = Line(bidang.c2p(7, 0), bidang.c2p(7, 7)).set_stroke(SOROT, 5.0)
        l_alas = sinema.label("alas 7", warna=SOROT).next_to(bidang.c2p(3.5, 0), UP, buff=0.14)
        l_tinggi = sinema.label("tinggi 7", warna=SOROT).next_to(bidang.c2p(7, 3.5), LEFT, buff=0.16)
        with sinema.babak(self, "segitiga", DURASI) as b:
            b.main(kanan7.animate.set_fill(AKSEN2, 0.12).set_stroke(opacity=0.4), run_time=1.0)
            b.main(ShowCreation(segitiga), run_time=3.0)
            b.main(ShowCreation(alas), FadeIn(l_alas), run_time=1.6)
            b.main(ShowCreation(tinggi_s), FadeIn(l_tinggi), run_time=1.6)
            b_luas = papan.baris(r"\tfrac{1}{2}\cdot 7\cdot 7 = 24{,}5", warna=SOROT, b=b)
            b.main(Indicate(segitiga, color=AKSEN, scale_factor=1.05), run_time=2.4)
        qc.periksa_adegan(self, {"label alas": l_alas, "label tinggi": l_tinggi},
                          [("label alas", "label tinggi")],
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang})

        # ---------------------------------------------------------------
        # jepit: titik sampel kiri memberi 21; jawabannya terjepit.
        # ---------------------------------------------------------------
        kiri7 = kotak_riemann(bidang, f_lurus, A, B, 7, "kiri")
        # Bayangan tangga KANAN dipanggil kembali di akhir babak. Kalimatnya
        # "jawabannya terjepit di antara 21 dan 28", dan yang paling terbaca
        # bukan denyut warna melainkan KEDUA tangga tampak sekaligus dengan
        # daerah sebenarnya di antaranya.
        bayang_kanan = kanan7.copy().set_fill(AKSEN, 0.10).set_stroke(AKSEN, 1.4)
        with sinema.babak(self, "jepit", DURASI) as b:
            b.main(FadeOut(alas), FadeOut(l_alas), FadeOut(tinggi_s), FadeOut(l_tinggi),
                   kanan7.animate.set_fill(AKSEN, 0.16).set_stroke(AKSEN, 1.6, opacity=0.8),
                   run_time=1.4)
            b.main(FadeOut(kanan7), FadeIn(kiri7), run_time=1.8)
            b.main(Indicate(kiri7, color=SOROT, scale_factor=1.05), run_time=1.4)
            b.tunggu_sampai(sinema.mulai(jam, "Jawabannya terjepit"))
            b_jepit = papan.baris(r"21 \le 24{,}5 \le 28", warna=AKSEN2, b=b)
            b.main(FadeIn(bayang_kanan), run_time=1.4)
            b.main(Indicate(kiri7, color=SOROT, scale_factor=1.05), run_time=1.2)
            b.main(Indicate(bayang_kanan, color=SOROT, scale_factor=1.05), run_time=1.2)
        qc.periksa_adegan(self, {"kurva": k_lengkung},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang, "kotak": kiri7})

        # ---------------------------------------------------------------
        # perbanyak: n = 14 lalu n = 60; selisihnya menyusut.
        # ---------------------------------------------------------------
        kanan14 = kotak_riemann(bidang, f_lurus, A, B, 14, "kanan")
        kanan60 = kotak_riemann(bidang, f_lurus, A, B, 60, "kanan")
        with sinema.babak(self, "perbanyak", DURASI) as b:
            b.main(FadeOut(kiri7), FadeOut(bayang_kanan), FadeIn(kanan14), run_time=2.4)
            sel = papan.baris(r"n = 14:\ \text{selisih } 1{,}75", warna=AKSEN, b=b)
            b.main(FadeOut(kanan14), FadeIn(kanan60), run_time=2.8)
            sel = sinema.ganti_rumus(self, sel, r"n = 60:\ \text{selisih } 0{,}41",
                                     b=b, warna=AKSEN, papan=papan)
            b.main(Indicate(kanan60, color=SOROT, scale_factor=1.05), run_time=2.4)

        # ---------------------------------------------------------------
        # turun: kurva menurun 4 - x^2; bidang DAN kamera berganti sekali.
        # ---------------------------------------------------------------
        bidang_kecil = ilustrasi.bidang_bernomor((0.0, 3.0, 1.0), (0.0, 5.0, 1.0))
        pusat_k, tinggi_k = kamera.muat_datar(bidang_kecil, sisa_atas=0.35, sisa_kanan=0.55)
        k_turun = kurva(bidang, f_lengkung, 0.0, 2.0, warna=TINTA)
        kiri4 = kotak_riemann(bidang, f_lengkung, 0.0, 2.0, 4, "kiri")
        kanan4 = kotak_riemann(bidang, f_lengkung, 0.0, 2.0, 4, "kanan", warna=AKSEN)

        with sinema.babak(self, "turun", DURASI) as b:
            b.main(FadeOut(kanan60), FadeOut(segitiga), run_time=0.9)
            # Kurvanya DI-TRANSFORM, bukan dihapus lalu digambar ulang: lembar
            # kontak render kedua memperlihatkan satu frame berisi bidang kosong
            # tanpa kurva, tepat saat narator berkata "ganti kurvanya".
            # `daerah_lurus` HARUS ikut dibuang di sini. Titiknya dihitung dari
            # `bidang` yang lama, jadi ketika kamera terbang ke bidang kecil ia
            # tertinggal di tempatnya dan berubah jadi segitiga pucat raksasa
            # yang menutupi separuh layar sampai video habis. Terlihat pada
            # render kelima di detik 102: panel "kiri 6,25 kanan 4,25" berdiri
            # di atas segitiga contoh sebelumnya, membantah gambarnya sendiri.
            b.main(FadeOut(bidang), FadeOut(daerah_lurus), FadeIn(bidang_kecil),
                   Transform(k_lengkung, k_turun),
                   kamera.dekati(frame, pusat_k, tinggi=tinggi_k), run_time=3.0)
            pastikan_hilang(self, {"bidang lama": bidang,
                                   "daerah contoh lurus": daerah_lurus,
                                   "kotak n=60": kanan60, "segitiga": segitiga})
            sinema.ganti_rumus(self, rum, r"f(x) = 4 - x^2", b=b, warna=TINTA, papan=papan)
            bersihkan_panel(self, papan, [b_jumlah, b_luas, b_jepit, sel], b=b)
            b.main(FadeIn(kiri4, lag_ratio=0.25), run_time=2.6)
            b_angka = papan.baris(r"\text{kiri } 6{,}25 \quad \text{kanan } 4{,}25",
                                  warna=AKSEN2, b=b)
            b.main(Indicate(kiri4, color=SOROT, scale_factor=1.05), run_time=2.0)
            b.main(Indicate(b_angka, color=SOROT), run_time=1.4)
        qc.periksa_adegan(self, {"kurva turun": k_lengkung},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_kecil})

        # ---------------------------------------------------------------
        # tutup: kiri lawan kanan, dan kesimpulannya.
        # ---------------------------------------------------------------
        bayang_kiri = kiri4.copy().set_fill(AKSEN2, 0.14).set_stroke(AKSEN2, 1.4)
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(kiri4), FadeIn(kanan4), run_time=1.8)
            b.main(FadeIn(bayang_kiri), run_time=1.4)
            b.main(Indicate(bayang_kiri, color=SOROT, scale_factor=1.05), run_time=1.4)
            b.main(Indicate(kanan4, color=SOROT, scale_factor=1.05), run_time=1.4)
            b.tunggu_sampai(sinema.mulai(jam, "di sisi mana kurvanya"))
            papan.baris(r"\text{yang lebih tinggi menang}", warna=SOROT, b=b)
            # Yang tampil di layar adalah `k_lengkung` hasil Transform, bukan
            # `k_turun` yang cuma sasaran dan tidak pernah ditambahkan ke adegan.
            b.main(Indicate(k_lengkung, color=SOROT), run_time=1.8)
            # Kejadian tambahan ditaruh SESUDAH jangkar, bukan sebelumnya.
            # Menambah animasi sebelum `tunggu_sampai` hanya memakan waktu
            # menunggu dan panjang babaknya tidak berubah sama sekali; ekor
            # diamnya tetap 2,9 detik. Yang menutup ekor itu hanya kejadian
            # yang terjadi setelah kalimat jangkarnya dimulai.
            b.main(Indicate(kanan4, color=SOROT, scale_factor=1.05), run_time=1.4)
        qc.periksa_adegan(self, {"kurva turun": k_lengkung},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_kecil})
