"""Video Integral Materi 01: dari laju ke jumlah, membalik turunan.

    manimgl manim/scenes/integral01_laju_ke_jumlah.py IntegralLajuKeJumlah -w -l

INI SATU-SATUNYA VIDEO INTEGRAL YANG BOLEH DIBUKA 3D
Butir 2 STANDAR-ILUSTRASI-VIDEO: 3D hanya untuk video dengan NOMOR TAHAP
TERKECIL, yaitu video yang PERTAMA DITONTON siswa, bukan yang pertama dibuat.
Bagian 3D-nya sekitar 4,4 detik (lembaran uang menumpuk di samping seorang
penabung), lalu SATU gerakan kamera turun ke bidang datar dan tidak pernah
miring lagi.
MASTER menetapkan batas 4 detik pada 8 Sep 2026; peralihan kamera yang BEKERJA
(3,2 detik terbang turun sambil tumpukan memudar) dikecualikan standarnya
sendiri.

ANGKA
Seluruhnya diperiksa sympy lewat `alat/klaim-video-integral01.json`, dan
pemeriksanya dibuktikan dua arah (11 klaim benar lolos, 11 versi rusak ditolak):
3, 5, 156 lewat integral, 156 lewat trapesium, turunan x^2+x, x^2+x+7,
x^2+x-3, kemiringan 5 di x = 2, dan selisih dua jalan = 0.

JEBAKAN YANG SUDAH MENGGIGIT SEKALI
2x + 1 adalah laju SESAAT, bukan tambahan sebulan penuh. Membacanya sebagai
tambahan bulanan memberi 3+5+...+25 = 168, bukan 156; MASTER menemukan
kekeliruan itu di halaman Materi 01 pada 7 Sep 2026. Karena itu lembaran di
pembuka menumpuk TERUS MENERUS, bukan melompat sekali sebulan, dan tidak ada
satu pun tulisan di layar yang menyebut "bulan ini menambah sekian".

WARNA
AKSEN2 biru = laju dan luas di bawahnya. SOROT ungu = antiturunan dan keluarga
kurvanya. AKSEN merah = tetapan C dan keterangan tambahan yang menguncinya.
Sama dengan halaman Materi 01 dan widget `mesin-balik`.

Alur berkas: naskah -> buat_narasi.py -> buat_subtitle.py -> adegan ini ->
gabung_audio.py integral01-laju-ke-jumlah IntegralLajuKeJumlah --uji.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "integral01-laju-ke-jumlah"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

BULAN = 12.0


def laju(x):
    """Laju pengeluaran pada bulan ke-x, juta rupiah per bulan."""
    return 2.0 * x + 1.0


def total(x, c=0.0):
    """Antiturunan laju: total pengeluaran sampai bulan ke-x."""
    return x * x + x + c


def sumbu_laju():
    """Sumbu grafik laju. Batas bawah kedua sumbu kelipatan langkahnya.

    Skala x dan y SENGAJA tidak sama di sini, dan itu benar: yang mendatar
    bulan, yang tegak juta rupiah per bulan. Dua besaran berbeda, jadi
    `bidang_bernomor` (yang mengunci kedua skala) justru salah alat. Yang
    dijaga bukan kesamaan skala melainkan angka sumbunya jatuh di garis petak.
    """
    # LEBARNYA sengaja hampir dua setengah kali tingginya. `muat_datar`
    # memuat sisi yang paling menuntut, dan untuk gambar yang lebih tinggi
    # daripada nisbah layar itu selalu TINGGI: pada render keempat sumbu
    # selebar 7,4 cuma mengisi 58 persen lebar layar dan sisanya kertas
    # kosong. Melebarkan sumbu x tidak mengubah matematikanya sedikit pun,
    # sebab mendatar dan tegak di sini memang dua besaran yang berbeda.
    s = Axes(
        x_range=(0, 12.8, 2), y_range=(0, 27.5, 5), width=9.2, height=4.4,
        axis_config=dict(stroke_color=REDUP, stroke_width=2.4),
    )
    s.move_to([0.2, 0.1, 0])
    angka = s.add_coordinate_labels(font_size=22, num_decimal_places=0)
    angka.set_color(TINTA).set_opacity(0.75)
    s.angka = angka          # supaya gerbang tulisan lawan angka sumbu berlaku
    s.latar = True
    return s


def sumbu_keluarga():
    """Sumbu keluarga kurva T = x^2 + x + C. Jendela kecil di sekitar nol.

    Tidak memakai jendela grafik laju: T(12) = 156, dan sumbu setinggi itu
    membuat lengkungannya rata seperti garis. Yang harus terlihat di sini
    justru bentuk lengkungnya dan jarak antaranggota keluarganya.
    """
    # TIDAK dilebarkan seperti sumbu laju, dan ada dua sebabnya. Pertama, di
    # sini mendatar dan tegak sama-sama panjang, jadi melebarkan berlebihan
    # membuat parabolanya tampak lebih landai daripada sebenarnya. Kedua,
    # lebar 8,2 sudah dicoba pada render kelima dan qc menolaknya: "papan
    # menindih sumbu, irisan 0,54 x 1,03 satuan layar". Yang mengikat di sini
    # TINGGI layar, jadi melebarkan sumbu tidak membuatnya mengecil, ia justru
    # menjulur sampai ke bawah panel rumus.
    s = Axes(
        x_range=(-3, 3.2, 1), y_range=(-4, 8.5, 2), width=6.2, height=4.4,
        axis_config=dict(stroke_color=REDUP, stroke_width=2.4),
    )
    s.move_to([0.2, 0.1, 0])
    angka = s.add_coordinate_labels(font_size=22, num_decimal_places=0)
    angka.set_color(TINTA).set_opacity(0.75)
    s.angka = angka
    s.latar = True
    return s


def garis_fungsi(sumbu, f, a, b, warna=TINTA, tebal=4.0):
    """Kurva digambar dari titik yang DIHITUNG, bukan digambar tangan."""
    return ParametricCurve(
        lambda t: sumbu.c2p(t, f(t)), t_range=(a, b, (b - a) / 200.0)
    ).set_stroke(warna, tebal)


def kotak_bulan(sumbu, f, a, b, n, warna=AKSEN2, opacity=0.26):
    """Satu persegi panjang per bulan, tingginya laju di AWAL bulan.

    Tingginya dihitung dari `f`, tidak diketik terpisah: gambar yang angkanya
    ditulis tangan cepat atau lambat akan membantah panel di sebelahnya.
    """
    lebar = (b - a) / n
    kelompok = VGroup()
    for i in range(n):
        kiri = a + i * lebar
        tinggi = f(kiri)
        kiri_bawah = sumbu.c2p(kiri, 0)
        kanan_atas = sumbu.c2p(kiri + lebar, tinggi)
        kotak = Rectangle(width=kanan_atas[0] - kiri_bawah[0],
                          height=kanan_atas[1] - kiri_bawah[1])
        kotak.move_to((kiri_bawah + kanan_atas) / 2)
        kotak.set_fill(warna, opacity)
        kotak.set_stroke(warna, 1.5, opacity=0.85)
        kelompok.add(kotak)
    return kelompok


def trapesium_laju(sumbu, f, a, b, warna=AKSEN2, opacity=0.30):
    """Daerah di bawah grafik laju, dari a sampai b.

    Bentuknya trapesium HANYA karena grafik lajunya garis lurus; itulah yang
    membuat angkanya tepat, bukan hampiran. Sudutnya diambil dari `f` supaya
    tepi miringnya benar-benar berimpit dengan grafiknya.
    """
    sudut = [sumbu.c2p(a, 0), sumbu.c2p(b, 0), sumbu.c2p(b, f(b)), sumbu.c2p(a, f(a))]
    return Polygon(*sudut).set_fill(warna, opacity).set_stroke(warna, 2.6)


def ruas_singgung(sumbu, f, x0, c, panjang=0.9, warna=AKSEN):
    """Ruas singgung kurva T = x^2 + x + c di x0, kemiringannya DIHITUNG."""
    # Ruasnya dibuat dari KEMIRINGAN di x0, bukan dari dua titik pada kurvanya:
    # dua titik pada kurva memberi tali busur, dan tali busur BUKAN singgung.
    m = 2.0 * x0 + 1.0
    y0 = f(x0, c)
    kiri = sumbu.c2p(x0 - panjang, y0 - m * panjang)
    kanan = sumbu.c2p(x0 + panjang, y0 + m * panjang)
    return Line(kiri, kanan).set_stroke(warna, 3.4)


def bersihkan_panel(scene, papan, buang, b=None, run_time=0.9):
    """Buang beberapa baris panel sekaligus, lalu rapatkan sisanya.

    Salinan pembantu yang sama dari `integral05_riemann.py`. `PapanRumus`
    dirancang untuk beberapa potongan pendek, bukan daftar; tanpa pembersihan
    ini panel video 01 akan memuat tujuh baris di babak terakhir dan baris
    terbawahnya menindih yang lain. Baris yang dibuang dilepas juga dari
    `papan.baris_lain` supaya tidak menyisakan lubang, dan alas kertasnya
    dikecilkan supaya tidak tertinggal kotak kosong.

    CATATAN UNTUK MASTER: pembantu ini sekarang ada di DUA adegan Integral
    dengan isi yang sama persis. Kalau video berikutnya juga membutuhkannya,
    tempatnya `gl/sinema.py`, bukan disalin untuk ketiga kalinya.
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


class IntegralLajuKeJumlah(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self, ukuran=30, alas=True)
        jam = sinema.jam_subtitle(TOPIK)

        # ---------------------------------------------------------------
        # buka: kartu judul saja, sama dengan kalimat yang diucapkan.
        # ---------------------------------------------------------------
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(2.6, DURASI["buka"] - 0.8)
            sinema.judul_pembuka(self, "Materi 01: dari laju ke jumlah", lama=lama)
            b.catat(lama)

        # ---------------------------------------------------------------
        # tumpuk: SATU-SATUNYA babak 3D. Koin menumpuk di samping penabung.
        # ---------------------------------------------------------------
        kamera.pasang_awal(frame, theta=-32, phi=62, pusat=(-0.3, 0, 1.0), tinggi=6.2)
        lantai = ilustrasi.lantai_kisi(ukuran=10, tinggi_z=0.0)
        penabung = ilustrasi.orang(2.4).move_to([-3.2, 0.6, 1.2])
        # LEMBARAN, bukan keping. Dua percobaan koin gagal dan keduanya terlihat
        # di lembar kontak: ditumpuk rapat, empat belas keping jadi satu tabung
        # ungu polos; diberi celah, `Cylinder` ManimGL ternyata TANPA TUTUP,
        # jadi tumpukannya terbaca sebagai per spiral berongga, bukan uang.
        # `balok` dibangun dari enam muka pejal dan terangnya ditentukan per
        # muka, jadi lempengan tipis terbaca sebagai lembaran yang menumpuk.
        lembar = Group(*[
            ilustrasi.balok(1.9, 1.0, 0.10, warna=SOROT).shift(OUT * (0.155 * i))
            for i in range(9)
        ])
        lembar.shift(RIGHT * 0.9)

        sumbu = sumbu_laju()
        l_bulan = sinema.label("bulan", warna=REDUP).next_to(sumbu, DOWN, buff=0.30)
        l_juta = sinema.label("juta/bulan", warna=REDUP)
        l_juta.next_to(sumbu, UP, buff=0.22).align_to(sumbu, LEFT)
        # `sisa_kanan` 1,8 bukan angka karangan. Render keenam gagal dengan
        # "papan menindih sumbu, irisan 1,18 x 1,04 satuan layar" di babak
        # TERAKHIR, saat panel sudah memuat empat baris dan tepi kirinya paling
        # menjorok. Yang mengikat ukuran di sini tinggi layar, jadi memesan
        # jalur kanan tidak mengecilkan gambarnya, ia menggesernya ke kiri.
        pusat_datar, tinggi_datar = kamera.muat_datar(
            VGroup(sumbu, l_bulan, l_juta), sisa_atas=0.30, sisa_kanan=1.8)

        with sinema.babak(self, "tumpuk", DURASI) as b:
            b.main(FadeIn(lantai), FadeIn(penabung), run_time=1.0)
            # Koinnya menumpuk TERUS MENERUS, satu demi satu tanpa jeda, bukan
            # melompat sekali sebulan: yang digambarkan laju sesaat.
            b.main(LaggedStartMap(FadeIn, lembar, lag_ratio=0.22), run_time=3.4)
            # Peralihan yang BEKERJA: kamera turun sambil dunianya memudar DAN
            # sumbunya datang. Pada render keempat sumbu baru muncul di babak
            # berikutnya, dan di antara keduanya ada 2,0 detik layar benar-benar
            # kosong yang ditangkap `cek_layar_kosong.py`.
            b.main(kamera.dunia_ke_peta(frame, pusat=pusat_datar, tinggi=tinggi_datar),
                   FadeOut(lembar), FadeOut(penabung), FadeOut(lantai),
                   FadeIn(sumbu), run_time=3.2)
        qc.pastikan_hilang(self, {"lantai 3D": lantai, "penabung": penabung},
                           nama="akhir pembuka 3D")

        # ---------------------------------------------------------------
        # turun: sumbu dan garis lajunya digambar.
        # ---------------------------------------------------------------
        g_laju = garis_fungsi(sumbu, laju, 0.0, BULAN, warna=AKSEN2)
        # TANPA `tunggu_sampai` di sini, dan itu disengaja. Kalimat "Lajunya
        # 2x + 1" mulai 8,29 detik setelah babaknya, dan hanya 2,39 detik
        # tersisa sesudahnya: `lahir_rumus` saja sudah 2,3 detik. Mengikatnya
        # ke jangkar berarti babaknya kelebihan. Beatnya disetel supaya rumus
        # itu lahir tepat ketika kalimatnya diucapkan.
        with sinema.babak(self, "turun", DURASI) as b:
            b.main(FadeIn(l_bulan), FadeIn(l_juta), run_time=2.4)
            b.main(ShowCreation(g_laju), run_time=5.0)
            rum = sinema.lahir_rumus(self, r"\text{laju} = 2x + 1",
                                     dekat=sumbu.c2p(9.0, laju(9.0)), papan=papan,
                                     b=b, warna=AKSEN2)
            ident = sinema.identitas(self, "laju: juta rupiah per bulan")
        qc.periksa_adegan(self, {"garis laju": g_laju},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"sumbu": sumbu})

        # ---------------------------------------------------------------
        # baca: dua nilai laju dibaca dari grafiknya, dan ditegaskan SESAAT.
        # ---------------------------------------------------------------
        titik1 = Dot(sumbu.c2p(1, laju(1)), radius=0.07).set_color(AKSEN)
        titik2 = Dot(sumbu.c2p(2, laju(2)), radius=0.07).set_color(AKSEN)
        l_t1 = rumus("3", 30, AKSEN).next_to(titik1, UL, buff=0.10)
        l_t2 = rumus("5", 30, AKSEN).next_to(titik2, UL, buff=0.10)

        def penunjuk(x):
            """Garis putus putus naik dari sumbu bulan, lalu mendatar ke nilainya."""
            naik = DashedLine(sumbu.c2p(x, 0), sumbu.c2p(x, laju(x)))
            datar = DashedLine(sumbu.c2p(x, laju(x)), sumbu.c2p(0, laju(x)))
            return naik.set_stroke(AKSEN, 2.0), datar.set_stroke(AKSEN, 2.0)

        naik1, datar1 = penunjuk(1)
        naik2, datar2 = penunjuk(2)
        # Render ketiga: babak ini menunggu kalimat 4,7 detik dengan layar diam,
        # dan gerbang diam `sinema` berbunyi. Waktunya diisi dengan CARA
        # MEMBACA grafiknya, yang memang isi kalimatnya: naik dari bulan yang
        # dimaksud, lalu mendatar ke nilai lajunya.
        with sinema.babak(self, "baca", DURASI) as b:
            b.main(ShowCreation(naik1), run_time=1.2)
            b.main(FadeIn(titik1, scale=0.5), ShowCreation(datar1), run_time=1.4)
            b.main(FadeIn(l_t1), run_time=1.0)
            b.main(ShowCreation(naik2), run_time=1.2)
            b.main(FadeIn(titik2, scale=0.5), ShowCreation(datar2), run_time=1.4)
            b.main(FadeIn(l_t2), run_time=1.0)
            b.tunggu_sampai(sinema.mulai(jam, "Laju pada satu saat."))
            # Yang ditekankan: nilainya dibaca DI SATU TITIK, bukan sepanjang
            # sebulan. Kedua titiknya dinyalakan bersama supaya "satu saat"
            # punya benda yang menunjuknya.
            b.main(Indicate(titik1, color=SOROT, scale_factor=1.6),
                   Indicate(titik2, color=SOROT, scale_factor=1.6), run_time=1.8)
            b.main(Indicate(l_t1, color=SOROT), Indicate(l_t2, color=SOROT), run_time=1.6)
        qc.periksa_adegan(self, {"garis laju": g_laju},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"sumbu": sumbu})

        # ---------------------------------------------------------------
        # satubulan: satu persegi panjang, TANPA angka.
        # ---------------------------------------------------------------
        # Sengaja tanpa angka: tinggi kali lebar di sini hampiran, dan menuliskan
        # angkanya akan membuat siswa menjumlahkannya sendiri lalu mendapat 168,
        # bukan 156. Yang ditandai bentuknya, bukan bilangannya.
        satu = kotak_bulan(sumbu, laju, 3.0, 4.0, 1)
        ruas_tinggi = Line(sumbu.c2p(3, 0), sumbu.c2p(3, laju(3))).set_stroke(SOROT, 4.0)
        l_tinggi = sinema.label("laju", warna=SOROT).next_to(ruas_tinggi, LEFT, buff=0.12)
        ruas_lebar = Line(sumbu.c2p(3, laju(3)), sumbu.c2p(4, laju(3))).set_stroke(SOROT, 4.0)
        l_lebar = sinema.label("1 bulan", warna=SOROT).next_to(ruas_lebar, UP, buff=0.12)
        with sinema.babak(self, "satubulan", DURASI) as b:
            b.main(FadeOut(titik1), FadeOut(titik2), FadeOut(l_t1), FadeOut(l_t2),
                   FadeOut(naik1), FadeOut(datar1), FadeOut(naik2), FadeOut(datar2),
                   run_time=0.9)
            b.main(FadeIn(satu), run_time=1.8)
            b.main(ShowCreation(ruas_tinggi), FadeIn(l_tinggi), run_time=1.6)
            b.main(ShowCreation(ruas_lebar), FadeIn(l_lebar), run_time=1.6)
            b.main(Indicate(satu, color=SOROT, scale_factor=1.06), run_time=1.8)
        qc.periksa_adegan(self, {"label tinggi": l_tinggi, "label lebar": l_lebar},
                          [("label tinggi", "label lebar")],
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"sumbu": sumbu})

        # ---------------------------------------------------------------
        # semua: dua belas persegi panjang, dan sisa yang belum tertutup.
        # ---------------------------------------------------------------
        dua_belas = kotak_bulan(sumbu, laju, 0.0, BULAN, 12)
        with sinema.babak(self, "semua", DURASI) as b:
            b.main(FadeOut(satu), FadeOut(ruas_tinggi), FadeOut(l_tinggi),
                   FadeOut(ruas_lebar), FadeOut(l_lebar), run_time=0.9)
            b.main(LaggedStartMap(FadeIn, dua_belas, lag_ratio=0.5), run_time=4.6)
            b.main(Indicate(dua_belas, color=SOROT, scale_factor=1.03), run_time=2.0)
            # Yang belum tertutup adalah segitiga tipis di atas tiap kotak,
            # tepat di bawah garis lajunya. Karena itu GARISNYA yang dinyalakan:
            # di situlah letak "baru dekat, belum tepat".
            b.main(Indicate(g_laju, color=SOROT), run_time=2.0)
        qc.periksa_adegan(self, {"garis laju": g_laju},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"sumbu": sumbu, "kotak": dua_belas})

        # ---------------------------------------------------------------
        # trapesium: tepi miringnya tertutup rapi, angkanya jadi TEPAT.
        # ---------------------------------------------------------------
        trap = trapesium_laju(sumbu, laju, 0.0, BULAN)
        sisi_kiri = Line(sumbu.c2p(0, 0), sumbu.c2p(0, laju(0))).set_stroke(AKSEN, 4.0)
        sisi_kanan = Line(sumbu.c2p(12, 0), sumbu.c2p(12, laju(12))).set_stroke(AKSEN, 4.0)
        l_kiri = rumus("1", 30, AKSEN).move_to(sumbu.c2p(0.7, 1.6))
        l_kanan = rumus("25", 30, AKSEN).next_to(sumbu.c2p(12, 25), UL, buff=0.10)
        # Hitungannya ditulis DI DEKAT gambarnya, bukan di panel: panel sudah
        # memuat rumus laju, dan baris panjang di sana akan menyusut sampai
        # sulit dibaca. Panel cukup menyimpan hasilnya.
        l_hitung = rumus(r"\tfrac{1}{2}(1 + 25)(12)", 32, AKSEN2)
        l_hitung.move_to(sumbu.c2p(6.6, 5.0))
        with sinema.babak(self, "trapesium", DURASI) as b:
            b.main(FadeOut(dua_belas), FadeIn(trap), run_time=2.4)
            b.main(ShowCreation(sisi_kiri), FadeIn(l_kiri), run_time=1.6)
            b.main(ShowCreation(sisi_kanan), FadeIn(l_kanan), run_time=1.6)
            b.main(FadeIn(l_hitung), run_time=1.4)
            b_luas = papan.baris(r"\text{luas} = 156", warna=AKSEN2, b=b)
            b.main(Indicate(b_luas, color=SOROT), run_time=1.8)
            b.main(Indicate(trap, color=SOROT, scale_factor=1.04), run_time=2.0)
        qc.periksa_adegan(self, {"hitungan trapesium": l_hitung, "label kanan": l_kanan},
                          [("hitungan trapesium", "label kanan")],
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"sumbu": sumbu, "trapesium": trap})

        # ---------------------------------------------------------------
        # balik: pindah ke jendela keluarga kurva. SATU perpindahan bidang.
        # ---------------------------------------------------------------
        sumbu2 = sumbu_keluarga()
        # DITARUH DI TEMPAT LAIN, bukan di tempat yang sama. Versi pertama
        # menaruh kedua sumbu di titik yang persis sama dan memudarkan yang satu
        # sambil memunculkan yang lain: selama tiga detik penonton melihat DUA
        # sistem koordinat bertumpuk, angka 25 dan angka -3 saling menembus
        # (terlihat di frame detik 71). Sekarang bidang kedua berdiri sembilan
        # satuan di bawah, dan kameranya TERBANG ke sana. Yang lama keluar lewat
        # tepi atas sementara yang baru masuk dari bawah, dan keduanya tidak
        # pernah menempati petak layar yang sama.
        sumbu2.shift(DOWN * 9.0)
        pusat2, tinggi2 = kamera.muat_datar(sumbu2, sisa_atas=0.30, sisa_kanan=0.50)
        # Identitas pojok kiri atas HARUS ikut berganti. Pada render kedelapan
        # ia masih berbunyi "laju: juta rupiah per bulan" sepanjang lima babak
        # yang gambarnya sudah bukan grafik laju lagi, melainkan keluarga kurva
        # T. Keterangan yang tertinggal membantah gambarnya sendiri, dan tidak
        # ada gerbang yang membaca artinya.
        ident2 = sinema.identitas(self, "mendatar x, tegak T")
        # DIKELUARKAN dari adegan, BUKAN dibuat tembus pandang. `identitas`
        # memasang bendanya seketika, dan pada render kesembilan saya meredam
        # dengan `set_opacity(0)` lalu `FadeIn`: `FadeIn` membaca kelegapan
        # yang sedang berlaku sebagai SASARAN, jadi ia memudar dari nol ke nol
        # dan blok itu tidak pernah muncul sama sekali. Lebih buruk lagi, qc
        # tetap "memeriksa" benda yang tak kasatmata itu tanpa mengeluh.
        self.remove(ident2)
        with sinema.babak(self, "balik", DURASI) as b:
            # Identitas lama dipudarkan DI SINI, sampai habis, sebelum yang baru
            # muncul. Blok identitas menempel di LAYAR, jadi ia tidak ikut
            # terbang bersama kamera: memudarkan yang satu sambil memunculkan
            # yang lain membuat dua tulisan bertumpuk di petak layar yang sama
            # selama satu detik, dan hasilnya "injandatar x, tegakoT bulan"
            # (frame detik 71 render kesepuluh). Ditemukan sesi Turunan dan
            # diteruskan MASTER; frame detik pergantian WAJIB ikut diperiksa,
            # sebab `periksa_adegan` cuma berjalan di UJUNG babak.
            b.main(FadeOut(trap), FadeOut(g_laju), FadeOut(l_bulan), FadeOut(l_juta),
                   FadeOut(sisi_kiri), FadeOut(sisi_kanan), FadeOut(l_kiri),
                   FadeOut(l_kanan), FadeOut(l_hitung), FadeOut(ident), run_time=1.4)
            b.main(FadeOut(sumbu), FadeIn(sumbu2), FadeIn(ident2),
                   kamera.dekati(frame, pusat2, tinggi=tinggi2), run_time=3.2)
            qc.pastikan_hilang(self, {"sumbu laju": sumbu, "trapesium": trap,
                                      "garis laju": g_laju, "kotak dua belas": dua_belas,
                                      "hitungan trapesium": l_hitung},
                               nama="pergantian bidang di babak balik")
            b_ttotal = papan.baris(r"T = \text{total}", warna=SOROT, b=b)
            rum = sinema.ganti_rumus(self, rum, r"T' = 2x + 1", b=b,
                                     warna=SOROT, papan=papan)
            b.main(Indicate(rum, color=AKSEN), run_time=1.8)
            b.main(Indicate(b_ttotal, color=AKSEN), run_time=1.6)

        # ---------------------------------------------------------------
        # tebak: T = x^2 + x, diperiksa dengan MENURUNKANNYA.
        # ---------------------------------------------------------------
        k_pokok = garis_fungsi(sumbu2, lambda x: total(x, 0.0), -3.0, 2.4, warna=SOROT)
        with sinema.babak(self, "tebak", DURASI) as b:
            b.main(ShowCreation(k_pokok), run_time=3.2)
            b.tunggu_sampai(sinema.mulai(jam, "Coba x"))
            b_tebak = papan.baris(r"T = x^2 + x", warna=SOROT, b=b)
            b.main(Indicate(b_tebak, color=AKSEN), run_time=1.8)
            b.main(Indicate(k_pokok, color=AKSEN), run_time=1.8)
            b_periksa = papan.baris(r"T' = 2x + 1 \quad \text{cocok}", warna=AKSEN2, b=b)
            b.main(Indicate(b_periksa, color=SOROT), run_time=2.0)
        qc.periksa_adegan(self, {"kurva pokok": k_pokok},
                          hud={"identitas": ident2, "papan": papan.semua()},
                          dunia={"sumbu": sumbu2})

        # ---------------------------------------------------------------
        # plusC: dua anggota lain, turunannya sama.
        # ---------------------------------------------------------------
        k_atas = garis_fungsi(sumbu2, lambda x: total(x, 2.0), -3.0, 2.0, warna=SOROT)
        k_bawah = garis_fungsi(sumbu2, lambda x: total(x, -3.0), -3.0, 2.8, warna=SOROT)
        k_atas.set_stroke(opacity=0.55)
        k_bawah.set_stroke(opacity=0.55)
        with sinema.babak(self, "plusC", DURASI) as b:
            # Panel dibersihkan dari baris yang tugasnya sudah selesai. Tanpa
            # ini panel video ini akan memuat tujuh baris di babak terakhir,
            # dan `PapanRumus` dirancang untuk potongan pendek, bukan daftar.
            bersihkan_panel(self, papan, [b_periksa, b_ttotal], b=b)
            b.main(ShowCreation(k_atas), run_time=2.2)
            b.tunggu_sampai(sinema.mulai(jam, "Dan x"))
            b.main(ShowCreation(k_bawah), run_time=2.2)
            b.tunggu_sampai(sinema.mulai(jam, "Turunan sebuah tetapan"))
            b_nol = papan.baris(r"(\text{tetapan})' = 0", warna=AKSEN, b=b)
            b.main(Indicate(b_nol, color=SOROT), run_time=1.8)
            b.main(Indicate(VGroup(k_pokok, k_atas, k_bawah), color=AKSEN,
                            scale_factor=1.03), run_time=2.2)
        qc.periksa_adegan(self, {"kurva pokok": k_pokok},
                          hud={"identitas": ident2, "papan": papan.semua()},
                          dunia={"sumbu": sumbu2})

        # ---------------------------------------------------------------
        # geser: kemiringan di x = 2 sama untuk ketiga anggota.
        # ---------------------------------------------------------------
        s_pokok = ruas_singgung(sumbu2, total, 2.0, 0.0)
        s_atas = ruas_singgung(sumbu2, total, 2.0, 2.0)
        s_bawah = ruas_singgung(sumbu2, total, 2.0, -3.0)
        with sinema.babak(self, "geser", DURASI) as b:
            bersihkan_panel(self, papan, [b_nol], b=b)
            b.main(ShowCreation(s_pokok), run_time=1.4)
            b.main(ShowCreation(s_atas), ShowCreation(s_bawah), run_time=1.8)
            # Ketiganya sejajar, dan itulah seluruh isi babak ini: menggeser
            # kurva tidak mengubah kemiringannya di titik mana pun.
            b.main(Indicate(VGroup(s_pokok, s_atas, s_bawah), color=SOROT,
                            scale_factor=1.08), run_time=1.8)
            b.tunggu_sampai(sinema.mulai(jam, "digeser oleh C."))
            b_keluarga = papan.baris(r"T = x^2 + x + C", warna=AKSEN, b=b)
            b.main(Indicate(b_keluarga, color=SOROT), run_time=1.4)
        qc.periksa_adegan(self, {"kurva pokok": k_pokok},
                          hud={"identitas": ident2, "papan": papan.semua()},
                          dunia={"sumbu": sumbu2})

        # ---------------------------------------------------------------
        # pilih: satu keterangan tambahan mengunci C, lalu T(12).
        # ---------------------------------------------------------------
        asal = Dot(sumbu2.c2p(0, 0), radius=0.085).set_color(AKSEN)
        l_asal = rumus("T(0) = 0", 30, AKSEN).next_to(asal, DR, buff=0.16)
        with sinema.babak(self, "pilih", DURASI) as b:
            b.main(Indicate(b_keluarga, color=AKSEN), run_time=1.6)
            b.main(FadeOut(s_atas), FadeOut(s_bawah), FadeOut(s_pokok),
                   FadeOut(k_atas), FadeOut(k_bawah), run_time=1.6)
            b.main(FadeIn(asal, scale=0.4), FadeIn(l_asal), run_time=1.8)
            b.main(Indicate(asal, color=SOROT, scale_factor=1.8), run_time=1.6)
            b.main(Indicate(k_pokok, color=AKSEN), run_time=1.8)
            bersihkan_panel(self, papan, [b_tebak], b=b)
            b_total = papan.baris(r"T(12) = 144 + 12 = 156", warna=SOROT, b=b)
            b.main(Indicate(b_total, color=AKSEN), run_time=2.4)
        qc.periksa_adegan(self, {"label asal": l_asal},
                          hud={"identitas": ident2, "papan": papan.semua()},
                          dunia={"sumbu": sumbu2})

        # ---------------------------------------------------------------
        # tutup: kembali ke luasnya, dua angka 156 berdampingan.
        # ---------------------------------------------------------------
        # Kamera KEMBALI ke bidang laju, sebab kalimat penutupnya menyebut
        # "angka yang sama dengan luas tadi". Menutup video di atas gambar
        # keluarga kurva akan membuat gambarnya membantah kalimatnya.
        with sinema.babak(self, "tutup", DURASI) as b:
            # Identitas lama habis DULU (bersama isi bidang keluarga), yang baru
            # menyusul di gerakan kamera. Sama seperti di babak `balik`, dan
            # sebabnya sama: blok identitas menempel di layar dan tidak ikut
            # terbang, jadi dua tulisan bisa bertumpuk di tempat yang sama.
            b.main(FadeOut(asal), FadeOut(l_asal), FadeOut(k_pokok),
                   FadeOut(ident2), run_time=1.0)
            b.main(FadeOut(sumbu2), FadeIn(sumbu), FadeIn(g_laju), FadeIn(trap),
                   FadeIn(l_bulan), FadeIn(l_juta), FadeIn(ident),
                   kamera.dekati(frame, pusat_datar, tinggi=tinggi_datar), run_time=2.8)
            qc.pastikan_hilang(self, {"sumbu keluarga": sumbu2, "kurva pokok": k_pokok,
                                      "titik asal": asal, "singgung pokok": s_pokok},
                               nama="kembali ke bidang laju")
            # Kejadian penutup ditaruh SESUDAH jangkar. Menambahnya sebelum
            # jangkar hanya memakan waktu menunggu, dan ekor diam babaknya
            # tidak berkurang sedikit pun.
            b.tunggu_sampai(sinema.mulai(jam, "Kenapa keduanya bertemu"))
            b.main(Indicate(trap, color=SOROT, scale_factor=1.04), run_time=1.8)
            b.main(Indicate(b_luas, color=AKSEN), run_time=1.6)
            b.main(Indicate(b_total, color=AKSEN), run_time=1.6)
            b.main(Indicate(VGroup(b_luas, b_total), color=SOROT), run_time=1.8)
            papan.baris(r"\text{dua jalan, satu jawaban}", warna=AKSEN, b=b)
        qc.periksa_adegan(self, {"garis laju": g_laju},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"sumbu": sumbu, "trapesium": trap})
