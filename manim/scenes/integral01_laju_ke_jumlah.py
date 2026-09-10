"""Video Integral Materi 01 (STANDAR v3): dari laju ke jumlah, membalik turunan.

    manimgl manim/scenes/integral01_laju_ke_jumlah.py IntegralLajuKeJumlah -w --hd --config_file manim/hd60.yml

DITULIS ULANG 8 September 2026 mengikuti `docs/tugas/STANDAR-VIDEO-V3.md`.
Naskah 33 segmen (350 detik), animasi dipicu per KATA lewat `sinema.JamKata`
dan `b.tunggu_kata`, bukan lagi lewat pembagian waktu per babak.

TIGA PANGGUNG, TIGA TEMPAT DUNIA YANG BERBEDA
Panggung ingat (atas), bidang laju (tengah), bidang keluarga kurva (bawah),
masing-masing terpisah sepuluh satuan. Kameranya TERBANG dari satu ke yang
lain. Ini pelajaran mahal dari versi v2: menukar dua bidang di TEMPAT YANG
SAMA membuat dua sistem koordinat bertumpuk selama tiga detik, dan tidak ada
gerbang yang menangkapnya sebab `periksa_adegan` cuma berjalan di ujung babak.
Identitas pojok kiri atas juga berganti BERURUTAN (yang lama habis dulu),
bukan silang.

TANPA PEMBUKA 3D, dan itu keputusan yang disengaja
Versi v2 dibuka dengan tumpukan lembaran uang 3D. STANDAR v3 mengizinkan 3D
untuk video pertama tiap topik, tetapi TIDAK mewajibkannya, dan tiga hal
membuatnya tidak lagi pantas di sini: kerangka wajib v3 memberikan detik-detik
pembuka kepada pertanyaan dan SEGAR-INGAT (yang isinya kurva dan kemiringan,
seluruhnya 2D); narasinya sudah 350 detik dari batas 360, jadi tidak ada ruang
menambah apa pun; dan menyisipkan benda 3D di antara dua bidang datar
menghidupkan lagi kelas cacat "dua gambar bertumpuk" yang baru saja dibayar
mahal. Kalau ARYA menghendakinya kembali, tempatnya babak `cerita`.

ANGKA
Diperiksa sympy lewat `alat/klaim-video-integral01.json`, 15 dari 15 lolos,
termasuk angka ANTARA yang diucapkan langkah demi langkah (26, 13, 144).
HATI-HATI: 2x + 1 laju SESAAT, bukan tambahan sebulan penuh; membacanya
sebagai tambahan bulanan memberi 168, bukan 156.

WARNA
AKSEN2 biru = laju dan luas di bawahnya. SOROT ungu = antiturunan dan keluarga
kurvanya. AKSEN merah = tetapan C, keterangan tambahan, dan sorotan.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "integral01-laju-ke-jumlah"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

BULAN = 12.0
# Jarak antarpanggung. Lebih besar daripada tinggi bingkai kamera, jadi dua
# panggung tidak pernah tampak bersamaan selain sebagai perjalanan.
PISAH = 11.0


def laju(x):
    return 2.0 * x + 1.0


def total(x, c=0.0):
    return x * x + x + c


def contoh(x):
    """Kurva segar-ingat, sama dengan contoh Turunan Materi 02 dan 03."""
    return x * x


def sumbu_ingat():
    """Papan kecil untuk segar-ingat topik Turunan."""
    s = Axes(x_range=(0, 3.2, 1), y_range=(0, 9.5, 3), width=6.2, height=3.6,
             axis_config=dict(stroke_color=REDUP, stroke_width=2.2))
    angka = s.add_coordinate_labels(font_size=20, num_decimal_places=0)
    angka.set_color(TINTA).set_opacity(0.75)
    s.angka = angka
    s.latar = True
    return s


def sumbu_laju():
    """Grafik laju: mendatar bulan, tegak juta per bulan.

    Skala kedua sumbu SENGAJA tidak sama, dan itu sah menurut STANDAR v3 butir
    5: keduanya besaran yang berbeda satuan. Video ini tidak pernah meminta
    mata membandingkan kemiringan; yang dibandingkan angka di panel.
    """
    s = Axes(x_range=(0, 12.8, 2), y_range=(0, 27.5, 5), width=9.2, height=4.4,
             axis_config=dict(stroke_color=REDUP, stroke_width=2.4))
    angka = s.add_coordinate_labels(font_size=22, num_decimal_places=0)
    angka.set_color(TINTA).set_opacity(0.75)
    s.angka = angka
    s.latar = True
    return s


def sumbu_keluarga():
    s = Axes(x_range=(-3, 3.2, 1), y_range=(-4, 8.5, 2), width=6.2, height=4.4,
             axis_config=dict(stroke_color=REDUP, stroke_width=2.4))
    angka = s.add_coordinate_labels(font_size=22, num_decimal_places=0)
    angka.set_color(TINTA).set_opacity(0.75)
    s.angka = angka
    s.latar = True
    return s


def kurva(sumbu, f, a, b, warna=TINTA, tebal=3.6):
    """Kurva digambar dari titik yang DIHITUNG, bukan digambar tangan."""
    return ParametricCurve(
        lambda t: sumbu.c2p(t, f(t)), t_range=(a, b, (b - a) / 200.0)
    ).set_stroke(warna, tebal)


def trapesium_laju(sumbu, f, a, b, warna=AKSEN2, opacity=0.30):
    """Daerah di bawah grafik laju. Sudutnya diambil dari `f` sendiri."""
    sudut = [sumbu.c2p(a, 0), sumbu.c2p(b, 0), sumbu.c2p(b, f(b)), sumbu.c2p(a, f(a))]
    return Polygon(*sudut).set_fill(warna, opacity).set_stroke(warna, 2.6)


def kotak_bulan(sumbu, f, a, b, n, warna=AKSEN2, opacity=0.26):
    """Satu persegi panjang per bulan, tingginya laju di AWAL bulan."""
    lebar = (b - a) / n
    kelompok = VGroup()
    for i in range(n):
        kiri = a + i * lebar
        kb, ka = sumbu.c2p(kiri, 0), sumbu.c2p(kiri + lebar, f(kiri))
        kotak = Rectangle(width=ka[0] - kb[0], height=ka[1] - kb[1])
        kotak.move_to((kb + ka) / 2)
        kotak.set_fill(warna, opacity).set_stroke(warna, 1.5, opacity=0.85)
        kelompok.add(kotak)
    return kelompok


def ruas_singgung(sumbu, f, x0, c=0.0, panjang=0.8, warna=AKSEN):
    """Ruas singgung, kemiringannya DIHITUNG, bukan ditarik dari dua titik."""
    m = 2.0 * x0 + 1.0
    y0 = f(x0, c) if f is total else f(x0)
    kiri = sumbu.c2p(x0 - panjang, y0 - m * panjang)
    kanan = sumbu.c2p(x0 + panjang, y0 + m * panjang)
    return Line(kiri, kanan).set_stroke(warna, 3.2)


def bersihkan_panel(scene, papan, buang, b=None, run_time=0.9):
    """Buang beberapa baris panel sekaligus, lalu rapatkan sisanya."""
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
        panel = sinema.PapanRumus(self, ukuran=30, alas=True)
        KATA = sinema.JamKata(TOPIK)

        # =============================================================
        # PANGGUNG A: segar-ingat topik Turunan. Di atas.
        # =============================================================
        s_ingat = sumbu_ingat().shift(UP * PISAH)
        pusat_a, tinggi_a = kamera.muat_datar(s_ingat, sisa_atas=0.30, sisa_kanan=2.4)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat_a, tinggi=tinggi_a)

        k_contoh = kurva(s_ingat, contoh, 0.0, 3.0, warna=TINTA)
        p1 = Dot(s_ingat.c2p(1, contoh(1)), radius=0.075).set_color(AKSEN)
        p2 = Dot(s_ingat.c2p(2, contoh(2)), radius=0.075).set_color(AKSEN)
        tali = Line(s_ingat.c2p(1, contoh(1)), s_ingat.c2p(2, contoh(2)))
        tali.set_stroke(AKSEN, 3.0)
        datar = Line(s_ingat.c2p(1, contoh(1)), s_ingat.c2p(2, contoh(1)))
        datar.set_stroke(REDUP, 2.6)
        tegak = Line(s_ingat.c2p(2, contoh(1)), s_ingat.c2p(2, contoh(2)))
        tegak.set_stroke(REDUP, 2.6)
        singgung_a = Line(
            s_ingat.c2p(0.4, contoh(1) - 2 * 0.6), s_ingat.c2p(1.6, contoh(1) + 2 * 0.6))
        singgung_a.set_stroke(SOROT, 3.2)

        def ruas_contoh(x0, panjang):
            """Ruas singgung kurva contoh; kemiringannya DIHITUNG (2x), bukan
            ditarik sekena hati. Panjangnya dipilih supaya ujungnya tidak
            keluar dari papan (y paling tinggi 9,5)."""
            m, y0 = 2.0 * x0, contoh(x0)
            return Line(s_ingat.c2p(x0 - panjang, y0 - m * panjang),
                        s_ingat.c2p(x0 + panjang, y0 + m * panjang)
                        ).set_stroke(SOROT, 3.0)

        # Dipakai saat narator bilang "kumpulan angka itu membentuk fungsi
        # baru": kumpulannya diperlihatkan, bukan cuma dikatakan.
        singgung_b = ruas_contoh(1.8, 0.45)
        singgung_c = ruas_contoh(2.5, 0.35)

        # ---- buka: pertanyaan video ini, papan masih kosong -----------
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            ident = sinema.identitas(self, "segar-ingat: topik Turunan")
            self.remove(ident)
            b.main(FadeIn(ident), run_time=1.0)
            b.tunggu_kata("seberapa")
            b.main(FadeIn(s_ingat), run_time=1.8)
            b.tunggu_kata("jumlah")
            b.main(ShowCreation(k_contoh), run_time=2.0)
        qc.periksa_adegan(self, {}, hud={"identitas": ident},
                          dunia={"papan ingat": s_ingat})

        # ---- ingat1: Turunan Materi 01, kenaikan dibagi langkah -------
        # Gerbang diam menuntut animasi minimal 0,6 kali lama narasi. Babak
        # segar-ingat paling gampang jatuh di situ: kalimatnya panjang, dan
        # gambarnya sudah ada di layar. Obatnya bukan memperlambat animasi,
        # melainkan memberi tiap frasa kejadiannya sendiri.
        with sinema.babak(self, "ingat1", DURASI, kata=KATA) as b:
            b.tunggu_kata("ingat")
            # BUKAN Indicate: Indicate yang terlihat harus MEMBESARKAN, dan
            # kurva yang membesar akan lepas dari sumbunya. Yang berubah di
            # sini warna dan tebalnya saja, jadi tidak ada yang bergeser.
            b.main(k_contoh.animate.set_stroke(AKSEN, 6.5), run_time=0.6)
            b.main(k_contoh.animate.set_stroke(TINTA, 3.6), run_time=0.6)
            b.tunggu_kata("Turunan")
            b_t01 = panel.baris(r"\text{Turunan 01: laju rata-rata}", warna=REDUP, b=b)
            b.tunggu_kata("Materi")
            b.main(Indicate(b_t01, color=AKSEN), run_time=1.1)
            b.tunggu_kata("seberapa")
            b.main(FadeIn(p1, scale=0.5), FadeIn(p2, scale=0.5),
                   ShowCreation(tali), run_time=2.0)
            # "membagi tambahan dengan selang waktunya": tegak itu tambahannya,
            # datar itu selangnya. Muncul berurutan, mengikuti kalimatnya.
            b.tunggu_kata("membagi")
            b.main(ShowCreation(tegak), run_time=1.4)
            b.main(ShowCreation(datar), run_time=1.6)
        qc.periksa_adegan(self, {},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"papan ingat": s_ingat})

        # ---- ingat2: Turunan Materi 03, turunan sebagai fungsi --------
        with sinema.babak(self, "ingat2", DURASI, kata=KATA) as b:
            b.tunggu_kata("Turunan")
            b_t03 = panel.baris(r"\text{Turunan 03: } f' \text{ fungsi baru}",
                                warna=REDUP, b=b)
            b.tunggu_kata("tiap")
            b.main(FadeOut(tali), FadeOut(datar), FadeOut(tegak), FadeOut(p2),
                   run_time=1.3)
            b.tunggu_kata("kemiringan")
            b.main(ShowCreation(singgung_a), run_time=1.4)
            b.tunggu_kata("Kumpulan")
            b.main(ShowCreation(singgung_b), run_time=0.8)
            b.tunggu_kata("membentuk")
            b.main(ShowCreation(singgung_c), run_time=1.4)
            b.tunggu_kata("namanya")
            b.main(Indicate(b_t03, color=AKSEN), run_time=2.0)
        qc.periksa_adegan(self, {},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"papan ingat": s_ingat})

        # ---- balikarah: panah arah kerja dibalik ----------------------
        maju = baris_arah = VGroup(
            rumus("f", 36, TINTA), rumus(r"\longrightarrow", 36, REDUP),
            rumus("f'", 36, AKSEN))
        baris_arah.arrange(RIGHT, buff=0.22)
        # Di BAWAH papan tidak boleh: itu jalur subtitle, dan
        # qc.jalur_bawah_kosong menolaknya. Kiri atas di dalam papan kosong,
        # sebab kurva x^2 baru naik setelah x lewat dua.
        baris_arah.move_to(s_ingat.c2p(1.0, 7.8))
        balik = VGroup(
            rumus("f'", 36, AKSEN), rumus(r"\longrightarrow", 36, REDUP),
            rumus("f", 36, SOROT))
        balik.arrange(RIGHT, buff=0.22).move_to(baris_arah)
        with sinema.babak(self, "balikarah", DURASI, kata=KATA) as b:
            # Layar dirapikan dulu: kumpulan ruas singgung sudah selesai
            # tugasnya, dan panah butuh tempat yang tenang.
            b.tunggu_kata("kerjanya")
            b.main(FadeOut(singgung_b), FadeOut(singgung_c), run_time=1.2)
            b.tunggu_kata("diberi")
            b.main(FadeIn(maju), run_time=1.1)
            b.tunggu_kata("cari")
            b.main(Indicate(maju[2], color=AKSEN), run_time=1.8)
            b.tunggu_kata("membalik")
            b.main(Transform(maju, balik), run_time=1.8)
            b.tunggu_kata("asalnya")
            b.main(Indicate(maju, color=SOROT), run_time=1.9)
        qc.periksa_adegan(self, {"arah": maju},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"papan ingat": s_ingat})

        # =============================================================
        # PANGGUNG B: bidang laju. Di tengah. Kamera TERBANG ke sini.
        # =============================================================
        s_laju = sumbu_laju()
        l_bulan = sinema.label("bulan", warna=REDUP).next_to(s_laju, DOWN, buff=0.30)
        l_juta = sinema.label("juta/bulan", warna=REDUP)
        l_juta.next_to(s_laju, UP, buff=0.22).align_to(s_laju, LEFT)
        pusat_b, tinggi_b = kamera.muat_datar(
            VGroup(s_laju, l_bulan, l_juta), sisa_atas=0.30, sisa_kanan=2.4)
        g_laju = kurva(s_laju, laju, 0.0, BULAN, warna=AKSEN2)

        ident2 = sinema.identitas(self, "laju: juta rupiah per bulan")
        self.remove(ident2)

        with sinema.babak(self, "cerita", DURASI, kata=KATA) as b:
            # Identitas lama habis DULU, baru yang baru muncul di penerbangan.
            b.main(FadeOut(maju), FadeOut(ident), run_time=1.0)
            bersihkan_panel(self, panel, [b_t01, b_t03], b=b)
            b.tunggu_kata("keluarga")
            b.main(FadeOut(s_ingat), FadeOut(k_contoh), FadeOut(p1),
                   FadeOut(singgung_a), FadeIn(s_laju), FadeIn(ident2),
                   kamera.dekati(frame, pusat_b, tinggi=tinggi_b), run_time=3.2)
            qc.pastikan_hilang(self, {"papan ingat": s_ingat, "kurva contoh": k_contoh,
                                      "arah": maju},
                               nama="pindah ke bidang laju")
            # "melainkan seberapa cepat": satuan tegaknya justru kalimat itu,
            # jadi label juta per bulan muncul persis di situ, bukan belakangan.
            b.tunggu_kata("melainkan")
            b.main(FadeIn(l_juta), run_time=1.6)
            b.tunggu_kata("bertambah")
            b.main(FadeIn(l_bulan), run_time=1.6)
        qc.periksa_adegan(self, {},
                          hud={"identitas": ident2, "papan": panel.semua()},
                          dunia={"papan laju": s_laju})

        # ---- rumuslaju: rumus lajunya lahir dekat gambar --------------
        with sinema.babak(self, "rumuslaju", DURASI, kata=KATA) as b:
            b.tunggu_kata("dua")
            rum = sinema.lahir_rumus(self, r"\text{laju} = 2x + 1",
                                     dekat=s_laju.c2p(9.0, laju(9.0)), papan=panel,
                                     b=b, warna=AKSEN2)

        # ---- baca1, baca2: dua nilai dibaca dari rumusnya -------------
        t1 = Dot(s_laju.c2p(1, laju(1)), radius=0.075).set_color(AKSEN)
        t2 = Dot(s_laju.c2p(2, laju(2)), radius=0.075).set_color(AKSEN)
        n1 = rumus("3", 30, AKSEN).next_to(t1, UL, buff=0.10)
        n2 = rumus("5", 30, AKSEN).next_to(t2, UL, buff=0.10)
        naik1 = DashedLine(s_laju.c2p(1, 0), s_laju.c2p(1, laju(1))).set_stroke(AKSEN, 2.0)
        naik2 = DashedLine(s_laju.c2p(2, 0), s_laju.c2p(2, laju(2))).set_stroke(AKSEN, 2.0)
        with sinema.babak(self, "baca1", DURASI, kata=KATA) as b:
            b.tunggu_kata("baca")
            b.main(Indicate(rum, color=AKSEN), run_time=1.6)
            b.tunggu_kata("pertama")
            b.main(ShowCreation(naik1), run_time=1.4)
            b.tunggu_kata("satu")
            b.main(Indicate(s_laju.angka, color=AKSEN), run_time=1.0)
            b.tunggu_kata("lajunya")
            b.main(FadeIn(t1, scale=0.5), run_time=1.2)
            b.tunggu_kata("tiga")
            b.main(FadeIn(n1), run_time=1.2)
            b.main(Indicate(n1, color=SOROT), run_time=1.2)
        with sinema.babak(self, "baca2", DURASI, kata=KATA) as b:
            b.tunggu_kata("kedua")
            b.main(ShowCreation(naik2), FadeIn(t2, scale=0.5), run_time=1.6)
            b.tunggu_kata("lima")
            b.main(FadeIn(n2), run_time=1.2)
            b.tunggu_kata("cepat")
            b.main(Indicate(VGroup(n1, n2), color=SOROT), run_time=1.6)
        qc.periksa_adegan(self, {"tiga": n1, "lima": n2}, [("tiga", "lima")],
                          hud={"identitas": ident2, "papan": panel.semua()},
                          dunia={"papan laju": s_laju})

        # ---- sesaat: laju SESAAT, bukan tambahan sebulan --------------
        with sinema.babak(self, "sesaat", DURASI, kata=KATA) as b:
            b.tunggu_kata("penting")
            b.main(Indicate(VGroup(n1, n2), color=AKSEN), run_time=1.8)
            b.tunggu_kata("saat")
            b.main(Indicate(t1, color=SOROT, scale_factor=2.0),
                   Indicate(t2, color=SOROT, scale_factor=2.0), run_time=1.6)
            b.tunggu_kata("sebulan")
            b_sesaat = panel.baris(r"\text{laju di satu titik}", warna=AKSEN, b=b)
            # Garis tegak per bulan itu JUSTRU bacaan yang keliru, jadi ia
            # dibuang persis saat narator menyebut bacaan keliru itu.
            b.tunggu_kata("dibaca")
            b.main(FadeOut(naik1), FadeOut(naik2), run_time=1.6)
            b.tunggu_kata("meleset")
            b.main(Indicate(b_sesaat, color=SOROT), run_time=1.6)

        # ---- grafik: garis lurus digambar -----------------------------
        with sinema.babak(self, "grafik", DURASI, kata=KATA) as b:
            # naik1 dan naik2 sudah dibuang di babak 'sesaat'; membuangnya
            # dua kali membuat FadeOut kedua tidak menampakkan apa pun.
            b.main(FadeOut(n1), FadeOut(n2),
                   FadeOut(t1), FadeOut(t2), run_time=1.2)
            b.tunggu_kata("Mendatar")
            b.main(Indicate(l_bulan, color=AKSEN), run_time=1.0)
            b.tunggu_kata("tegak")
            b.main(Indicate(l_juta, color=AKSEN), run_time=1.0)
            b.tunggu_kata("Karena")
            b.main(Indicate(rum, color=AKSEN), run_time=1.8)
            b.tunggu_kata("garis")
            b.main(ShowCreation(g_laju), run_time=2.2)
        qc.periksa_adegan(self, {"garis laju": g_laju},
                          hud={"identitas": ident2, "papan": panel.semua()},
                          dunia={"papan laju": s_laju})

        # ---- satubulan dan kotak: satu persegi panjang ----------------
        satu = kotak_bulan(s_laju, laju, 3.0, 4.0, 1)
        r_tinggi = Line(s_laju.c2p(3, 0), s_laju.c2p(3, laju(3))).set_stroke(SOROT, 4.0)
        l_tinggi = sinema.label("laju", warna=SOROT).next_to(r_tinggi, LEFT, buff=0.12)
        r_lebar = Line(s_laju.c2p(3, laju(3)), s_laju.c2p(4, laju(3))).set_stroke(SOROT, 4.0)
        # DI ATAS tepi kotak tidak boleh: garis laju lewat persis di situ dan
        # mencoret tulisannya. Di kanan tepi kotak, garis lajunya sudah naik
        # lebih tinggi, jadi ruangnya bersih.
        l_lebar = sinema.label("1 bulan", warna=SOROT).next_to(r_lebar, RIGHT, buff=0.20)
        with sinema.babak(self, "satubulan", DURASI, kata=KATA) as b:
            b.tunggu_kata("pertama")
            b_jalan1 = panel.baris(r"\text{jalan 1: luas}", warna=AKSEN2, b=b)
            b.tunggu_kata("laju")
            b.main(ShowCreation(r_tinggi), FadeIn(l_tinggi), run_time=0.6)
            b.tunggu_kata("lama")
            b.main(ShowCreation(r_lebar), FadeIn(l_lebar), run_time=1.2)
        with sinema.babak(self, "kotak", DURASI, kata=KATA) as b:
            b.tunggu_kata("luas")
            b.main(FadeIn(satu), run_time=1.8)
            b.tunggu_kata("tingginya")
            b.main(Indicate(r_tinggi, color=AKSEN), run_time=1.2)
            b.tunggu_kata("lebarnya")
            b.main(Indicate(r_lebar, color=AKSEN), run_time=1.4)
        # CATATAN untuk yang datang berikutnya: label lawan GARIS DIAGONAL
        # tidak bisa dititipkan ke `qc.periksa_adegan`. Yang diadu di situ
        # kotak batas, dan kotak batas garis laju menutupi hampir seluruh
        # bidang, jadi label mana pun di bawah garis dituduh bertindih
        # padahal bersih. Sudah dicoba 9 Sep 2026 dan menggagalkan render
        # dua kali pada label yang gambarnya baik-baik saja. Yang menangkap
        # "1 bulan" tercoret garis adalah membuka framenya, lalu mengukur
        # jalur garisnya (bukan kotaknya) di luar render.
        qc.periksa_adegan(self, {"label tinggi": l_tinggi, "label lebar": l_lebar},
                          [("label tinggi", "label lebar")],
                          hud={"identitas": ident2, "papan": panel.semua()},
                          dunia={"papan laju": s_laju})

        # ---- dekat: dua belas kotak, tepi atasnya miring --------------
        dua_belas = kotak_bulan(s_laju, laju, 0.0, BULAN, 12)
        with sinema.babak(self, "dekat", DURASI, kata=KATA) as b:
            b.main(FadeOut(l_tinggi), FadeOut(l_lebar), FadeOut(r_tinggi),
                   FadeOut(r_lebar), FadeOut(satu), run_time=0.7)
            b.tunggu_kata("dibuatkan")
            b.main(LaggedStartMap(FadeIn, dua_belas, lag_ratio=0.5), run_time=3.8)
            b.tunggu_kata("dekat")
            b.main(Indicate(dua_belas, color=SOROT, scale_factor=1.03), run_time=1.8)
            b.tunggu_kata("sebab")
            b.main(Indicate(g_laju, color=AKSEN), run_time=1.8)
            b.tunggu_kata("Lihat")
            b.main(Indicate(dua_belas, color=AKSEN, scale_factor=1.03), run_time=1.4)
            b.tunggu_kata("miring")
            b.main(Indicate(g_laju, color=SOROT), run_time=2.0)

        # ---- trapesium: tepi miring tertutup rapi ---------------------
        trap = trapesium_laju(s_laju, laju, 0.0, BULAN)
        with sinema.babak(self, "trapesium", DURASI, kata=KATA) as b:
            b.tunggu_kata("lurus")
            b.main(Indicate(g_laju, color=AKSEN), run_time=1.6)
            b.tunggu_kata("ditutup")
            b.main(Indicate(g_laju, color=SOROT), run_time=1.0)
            b.tunggu_kata("trapesium")
            b.main(FadeOut(dua_belas), FadeIn(trap), run_time=2.4)
            # Daerah TIDAK boleh di-Indicate: Indicate membesarkannya 1,2 kali
            # dan daerahnya jadi tampak melewati selangnya. Yang dinaikkan
            # kepekatan isiannya, dua beat berurutan supaya terbaca berdenyut.
            b.tunggu_kata("Jadi")
            b.main(trap.animate.set_fill(AKSEN2, 0.55), run_time=0.6)
            b.main(trap.animate.set_fill(AKSEN2, 0.30), run_time=0.6)
            b.tunggu_kata("tepat")
            b.main(Indicate(trap, color=SOROT, scale_factor=1.03), run_time=1.8)
        qc.periksa_adegan(self, {"garis laju": g_laju},
                          hud={"identitas": ident2, "papan": panel.semua()},
                          dunia={"papan laju": s_laju, "trapesium": trap})

        # ---- sisi: dua sisi sejajarnya ditandai -----------------------
        sisi_kiri = Line(s_laju.c2p(0, 0), s_laju.c2p(0, laju(0))).set_stroke(AKSEN, 4.0)
        sisi_kanan = Line(s_laju.c2p(12, 0), s_laju.c2p(12, laju(12))).set_stroke(AKSEN, 4.0)
        l_kiri = rumus("1", 30, AKSEN).move_to(s_laju.c2p(0.7, 1.8))
        l_kanan = rumus("25", 30, AKSEN).next_to(s_laju.c2p(12, 25), UL, buff=0.10)
        with sinema.babak(self, "sisi", DURASI, kata=KATA) as b:
            b.tunggu_kata("sejajar")
            b.main(trap.animate.set_fill(AKSEN2, 0.50), run_time=0.8)
            b.main(trap.animate.set_fill(AKSEN2, 0.30), run_time=0.8)
            b.tunggu_kata("kiri")
            b.main(ShowCreation(sisi_kiri), FadeIn(l_kiri), run_time=1.8)
            b.tunggu_kata("satu")
            b.main(Indicate(l_kiri, color=SOROT), run_time=1.6)
            b.tunggu_kata("kanan")
            b.main(ShowCreation(sisi_kanan), FadeIn(l_kanan), run_time=1.8)
            b.tunggu_kata("lima")
            b.main(Indicate(l_kanan, color=SOROT), run_time=1.6)

        # ---- hitungtrap: dihitung LANGKAH DEMI LANGKAH ---------------
        h1 = rumus(r"\tfrac{1}{2}(1 + 25)(12)", 34, AKSEN2)
        h1.move_to(s_laju.c2p(6.4, 8.5))
        h2 = rumus(r"\tfrac{1}{2}\cdot 26\cdot 12", 34, AKSEN2).move_to(h1)
        h3 = rumus(r"13\cdot 12 = 156", 34, SOROT).move_to(h1)
        with sinema.babak(self, "hitungtrap", DURASI, kata=KATA) as b:
            b.tunggu_kata("setengah")
            b.main(FadeIn(h1), run_time=2.0)
            b.tunggu_kata("lebarnya")
            b.main(trap.animate.set_fill(AKSEN2, 0.52), run_time=0.9)
            b.main(trap.animate.set_fill(AKSEN2, 0.30), run_time=0.9)
            b.tunggu_kata("sama")
            b.main(Transform(h1, h2), run_time=1.4)
            b.tunggu_kata("Setengahnya")
            b.main(Indicate(h1, color=SOROT), run_time=1.6)
            b.tunggu_kata("Dikali")
            b.main(Transform(h1, h3), run_time=1.4)
            b.tunggu_kata("hasilnya")
            b.main(Indicate(h1, color=AKSEN), run_time=1.6)
        qc.periksa_adegan(self, {"hitungan": h1},
                          hud={"identitas": ident2, "papan": panel.semua()},
                          dunia={"papan laju": s_laju, "trapesium": trap})

        # ---- jalan1: jawaban jalan pertama masuk panel ----------------
        with sinema.babak(self, "jalan1", DURASI, kata=KATA) as b:
            b.tunggu_kata("jawabannya")
            b_luas = panel.baris(r"\text{luas} = 156", warna=AKSEN2, b=b)
            b.tunggu_kata("enam")
            b.main(Indicate(b_luas, color=SOROT), run_time=1.8)

        # =============================================================
        # PANGGUNG C: keluarga kurva. Di bawah. Kamera TERBANG lagi.
        # =============================================================
        s_kel = sumbu_keluarga().shift(DOWN * PISAH)
        pusat_c, tinggi_c = kamera.muat_datar(s_kel, sisa_atas=0.30, sisa_kanan=2.4)
        ident3 = sinema.identitas(self, "mendatar x, tegak T")
        self.remove(ident3)

        with sinema.babak(self, "jalan2", DURASI, kata=KATA) as b:
            b.main(FadeOut(h1), FadeOut(sisi_kiri), FadeOut(sisi_kanan),
                   FadeOut(l_kiri), FadeOut(l_kanan), FadeOut(ident2), run_time=1.0)
            bersihkan_panel(self, panel, [b_sesaat, b_jalan1], b=b)
            b.tunggu_kata("sepintas")
            b.main(FadeOut(s_laju), FadeOut(g_laju), FadeOut(trap),
                   FadeOut(l_bulan), FadeOut(l_juta), FadeIn(s_kel), FadeIn(ident3),
                   kamera.dekati(frame, pusat_c, tinggi=tinggi_c), run_time=3.0)
            qc.pastikan_hilang(self, {"papan laju": s_laju, "trapesium": trap,
                                      "garis laju": g_laju, "kotak": dua_belas},
                               nama="pindah ke bidang keluarga")
            b.tunggu_kata("Sebut")
            b_T = panel.baris(r"T = \text{total}", warna=SOROT, b=b)
            b.main(Indicate(b_T, color=AKSEN), run_time=1.4)
        qc.periksa_adegan(self, {},
                          hud={"identitas": ident3, "papan": panel.semua()},
                          dunia={"papan keluarga": s_kel})

        # ---- cari: T' = 2x + 1 ---------------------------------------
        with sinema.babak(self, "cari", DURASI, kata=KATA) as b:
            b.tunggu_kata("turunan")
            rum = sinema.ganti_rumus(self, rum, r"T' = 2x + 1", b=b,
                                     warna=SOROT, papan=panel)
            b.tunggu_kata("lajunya")
            b.main(Indicate(rum, color=AKSEN), run_time=1.8)
            b.tunggu_kata("mencari")
            b.main(Indicate(b_T, color=AKSEN), run_time=1.6)

        # ---- tebak: kurva T = x^2 + x digambar ------------------------
        k_pokok = kurva(s_kel, lambda x: total(x, 0.0), -3.0, 2.4, warna=SOROT)
        with sinema.babak(self, "tebak", DURASI, kata=KATA) as b:
            b.tunggu_kata("kuadrat")
            b.main(ShowCreation(k_pokok), run_time=2.6)
            b.tunggu_kata("tebakan")
            b_tebak = panel.baris(r"T = x^2 + x", warna=SOROT, b=b)
            b.main(Indicate(b_tebak, color=AKSEN), run_time=1.6)
        qc.periksa_adegan(self, {"kurva pokok": k_pokok},
                          hud={"identitas": ident3, "papan": panel.semua()},
                          dunia={"papan keluarga": s_kel})

        # ---- periksa dan cocok: tebakan DITURUNKAN --------------------
        d1 = rumus(r"(x^2)' = 2x", 32, AKSEN).move_to(s_kel.c2p(-1.7, 6.6))
        d2 = rumus(r"(x)' = 1", 32, AKSEN).next_to(d1, DOWN, buff=0.28)
        d3 = rumus(r"2x + 1", 32, AKSEN2).next_to(d2, DOWN, buff=0.28)
        with sinema.babak(self, "periksa", DURASI, kata=KATA) as b:
            b.tunggu_kata("menurunkannya")
            b.main(Indicate(k_pokok, color=AKSEN), run_time=1.6)
            b.tunggu_kata("kuadrat")
            b.main(FadeIn(d1), run_time=1.8)
            b.tunggu_kata("satu")
            b.main(FadeIn(d2), run_time=1.5)
        with sinema.babak(self, "cocok", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dijumlahkan")
            b.main(FadeIn(d3), run_time=1.8)
            b.tunggu_kata("persis")
            b.main(Indicate(d3, color=SOROT), run_time=1.2)
            b.tunggu_kata("benar")
            b_cocok = panel.baris(r"\text{cocok}", warna=AKSEN2, b=b)
        qc.periksa_adegan(self, {"turunan 1": d1, "turunan 2": d2, "hasil": d3},
                          [("turunan 1", "turunan 2"), ("turunan 2", "hasil")],
                          hud={"identitas": ident3, "papan": panel.semua()},
                          dunia={"papan keluarga": s_kel})

        # ---- tapi dan kenapa: tetapan tujuh, turunannya nol -----------
        k_atas = kurva(s_kel, lambda x: total(x, 2.0), -3.0, 2.0, warna=SOROT)
        k_atas.set_stroke(opacity=0.55)
        # DUA BARIS, dan ujung kanannya dipatok di kiri sumbu tegak. Versi
        # satu baris jauh lebih panjang daripada d1, jadi `move_to(d1)`
        # melemparkan ekornya ke atas sumbu dan menutup angka 6 dan 8.
        tujuh = VGroup(rumus(r"(x^2 + x + 7)'", 30, AKSEN),
                       rumus(r"= 2x + 1", 30, AKSEN))
        tujuh.arrange(DOWN, buff=0.16, aligned_edge=LEFT)
        # Ujung kanan di x = -0,60, bukan -0,25: deretan angka sumbu tegak
        # duduk persis di kiri sumbunya, dan pada -0,25 rumus ini menyenggol
        # salah satunya sebesar 0,10 x 0,15 satuan layar (diukur, bukan
        # ditebak, lewat pengaduan lawan tiap angka satu per satu).
        tujuh.next_to(s_kel.c2p(-0.60, 7.2), LEFT, buff=0.0)
        nol = rumus(r"(\text{tetapan})' = 0", 28, AKSEN)
        nol.next_to(tujuh, DOWN, buff=0.30).align_to(tujuh, LEFT)
        with sinema.babak(self, "tapi", DURASI, kata=KATA) as b:
            b.main(FadeOut(d1), FadeOut(d2), FadeOut(d3), run_time=0.9)
            b.tunggu_kata("periksa")
            b.main(FadeIn(tujuh), run_time=2.0)
        with sinema.babak(self, "kenapa", DURASI, kata=KATA) as b:
            b.tunggu_kata("juga")
            b.main(Indicate(tujuh, color=SOROT), run_time=1.6)
            b.tunggu_kata("tetapan")
            b.main(FadeIn(nol), run_time=1.8)
            b.tunggu_kata("berubah")
            b.main(Indicate(nol, color=SOROT), run_time=1.8)
        # Lewat `tulisan=`, BUKAN lewat pasangan buatan sendiri: `tulisan`
        # mengadu tiap ANGKA SUMBU satu per satu, sedangkan pasangan biasa
        # mengadu kotak batas seluruh kelompok angka, yang menutupi habis
        # bidangnya dan menuduh rumus mana pun bertindih.
        qc.periksa_adegan(self, {},
                          tulisan={"tujuh": tujuh, "nol": nol},
                          hud={"identitas": ident3, "papan": panel.semua()},
                          dunia={"papan keluarga": s_kel})

        # ---- keluarga dan geser: satu keluarga kurva ------------------
        k_bawah = kurva(s_kel, lambda x: total(x, -3.0), -3.0, 2.8, warna=SOROT)
        k_bawah.set_stroke(opacity=0.55)
        with sinema.babak(self, "keluarga", DURASI, kata=KATA) as b:
            b.main(FadeOut(tujuh), FadeOut(nol), run_time=0.9)
            b.tunggu_kata("keluarga")
            b_kel = panel.baris(r"T = x^2 + x + C", warna=AKSEN, b=b)
            b.tunggu_kata("tulis")
            b.main(Indicate(b_kel, color=SOROT), run_time=1.6)
        with sinema.babak(self, "geser", DURASI, kata=KATA) as b:
            b.tunggu_kata("bentuknya")
            b.main(ShowCreation(k_atas), run_time=1.5)
            b.tunggu_kata("digeser")
            b.main(ShowCreation(k_bawah), run_time=1.8)
        qc.periksa_adegan(self, {"kurva pokok": k_pokok},
                          hud={"identitas": ident3, "papan": panel.semua()},
                          dunia={"papan keluarga": s_kel})

        # ---- buktigeser: kemiringan sama di x = 2 ---------------------
        s_pokok = ruas_singgung(s_kel, total, 2.0, 0.0)
        s_atas = ruas_singgung(s_kel, total, 2.0, 2.0)
        s_bawah = ruas_singgung(s_kel, total, 2.0, -3.0)
        with sinema.babak(self, "buktigeser", DURASI, kata=KATA) as b:
            b.tunggu_kata("dua")
            b.main(ShowCreation(s_pokok), run_time=1.4)
            b.main(ShowCreation(s_atas), ShowCreation(s_bawah), run_time=1.2)
            b.tunggu_kata("Kemiringannya")
            b.main(Indicate(VGroup(s_pokok, s_atas, s_bawah), color=AKSEN),
                   run_time=1.6)
            b.tunggu_kata("lima")
            b_lima = panel.baris(r"\text{di } x = 2:\ 5", warna=AKSEN, b=b)
        qc.periksa_adegan(self, {"kurva pokok": k_pokok},
                          hud={"identitas": ident3, "papan": panel.semua()},
                          dunia={"papan keluarga": s_kel})

        # ---- kunci dan nol: satu keterangan tambahan mengunci C -------
        asal = Dot(s_kel.c2p(0, 0), radius=0.09).set_color(AKSEN)
        # Serong kanan bawah dari titik asal jatuh PERSIS di angka sumbu
        # mendatar, dan "= 0" jadi terbaca menempel pada angka 1. Diturunkan
        # sampai di bawah deretan angka itu.
        l_asal = rumus("T(0) = 0", 30, AKSEN)
        l_asal.next_to(asal, DOWN, buff=0.62).shift(RIGHT * 0.9)
        with sinema.babak(self, "kunci", DURASI, kata=KATA) as b:
            b.main(FadeOut(s_pokok), FadeOut(s_atas), FadeOut(s_bawah), run_time=0.9)
            b.tunggu_kata("keterangan")
            b.main(Indicate(b_kel, color=SOROT), run_time=1.6)
            b.tunggu_kata("letaknya")
            b.main(Indicate(VGroup(k_pokok, k_atas, k_bawah), color=AKSEN),
                   run_time=1.8)
        with sinema.babak(self, "nol", DURASI, kata=KATA) as b:
            b.tunggu_kata("totalnya")
            b.main(FadeIn(asal, scale=0.4), FadeIn(l_asal), run_time=1.8)
            b.tunggu_kata("Masukkan")
            b.main(FadeOut(k_atas), FadeOut(k_bawah), run_time=1.4)
            b.tunggu_kata("kecuali")
            b.main(Indicate(asal, color=SOROT, scale_factor=1.8), run_time=1.6)
        qc.periksa_adegan(self, {},
                          tulisan={"asal": l_asal},
                          hud={"identitas": ident3, "papan": panel.semua()},
                          dunia={"papan keluarga": s_kel})

        # ---- hitungT: T(12) dihitung langkah demi langkah -------------
        t1a = rumus(r"T(12) = 12^2 + 12", 34, SOROT).move_to(s_kel.c2p(-1.4, 6.6))
        t1b = rumus(r"= 144 + 12", 34, SOROT).move_to(t1a)
        t1c = rumus(r"= 156", 34, SOROT).move_to(t1a)
        with sinema.babak(self, "hitungT", DURASI, kata=KATA) as b:
            b.tunggu_kata("belas")
            b.main(FadeIn(t1a), run_time=1.8)
            b.tunggu_kata("empat")
            b.main(Transform(t1a, t1b), run_time=1.5)
            # Baris panelnya ditulis SEBELUM pemicu terakhir, bukan sesudahnya:
            # kata "enam" jatuh di ujung kalimat dan tidak menyisakan waktu.
            b_total = panel.baris(r"T(12) = 156", warna=SOROT, b=b)
            b.tunggu_kata("enam")
            b.main(Transform(t1a, t1c), run_time=1.2)
        qc.periksa_adegan(self, {"hitungan T": t1a},
                          hud={"identitas": ident3, "papan": panel.semua()},
                          dunia={"papan keluarga": s_kel})

        # =============================================================
        # KEMBALI KE PANGGUNG B: dua angka 156 berdampingan.
        # =============================================================
        with sinema.babak(self, "sama", DURASI, kata=KATA) as b:
            b.main(FadeOut(t1a), FadeOut(asal), FadeOut(l_asal), FadeOut(k_pokok),
                   FadeOut(ident3), run_time=0.5)
            b.tunggu_kata("sama")
            b.main(FadeOut(s_kel), FadeIn(s_laju), FadeIn(g_laju), FadeIn(trap),
                   FadeIn(l_bulan), FadeIn(l_juta), FadeIn(ident2),
                   kamera.dekati(frame, pusat_b, tinggi=tinggi_b), run_time=2.6)
            qc.pastikan_hilang(self, {"papan keluarga": s_kel, "kurva pokok": k_pokok,
                                      "titik asal": asal},
                               nama="kembali ke bidang laju")
            b.tunggu_kata("membalik")
            b.main(Indicate(trap, color=SOROT, scale_factor=1.03),
                   Indicate(VGroup(b_luas, b_total), color=AKSEN), run_time=1.8)
        qc.periksa_adegan(self, {"garis laju": g_laju},
                          hud={"identitas": ident2, "papan": panel.semua()},
                          dunia={"papan laju": s_laju, "trapesium": trap})

        # ---- nama: istilah antiturunan diberikan ----------------------
        with sinema.babak(self, "nama", DURASI, kata=KATA) as b:
            bersihkan_panel(self, panel, [b_tebak, b_cocok, b_lima], b=b)
            b.tunggu_kata("nama")
            b_anti = panel.baris(r"\text{antiturunan dari } f", warna=SOROT, b=b)
            b.tunggu_kata("melawan")
            b.main(Indicate(b_anti, color=AKSEN), run_time=1.8)

        # ---- tutup: menunjuk Materi 07 --------------------------------
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("bertemu")
            b.main(Indicate(VGroup(b_luas, b_total), color=SOROT), run_time=1.8)
            b.tunggu_kata("tujuh")
            b_next = panel.baris(r"\text{buktinya: Materi 07}", warna=AKSEN, b=b)
            b.main(Indicate(b_next, color=SOROT), run_time=1.8)
            b.tunggu_kata("lambang")
            b.main(Indicate(trap, color=SOROT, scale_factor=1.03), run_time=1.8)
        qc.periksa_adegan(self, {"garis laju": g_laju},
                          hud={"identitas": ident2, "papan": panel.semua()},
                          dunia={"papan laju": s_laju, "trapesium": trap})

        sinema.laporkan_pemicu(self)
