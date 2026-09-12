"""Video Integral Materi 07 "Dua dunia yang ternyata satu, Teorema Dasar
Kalkulus": Luas dan Integral Tentu, Bagian 3.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (2:20)
yang sudah disetujui ARYA. DUNIANYA SAMA: dua papan bertumpuk (atas f(x) = x^2
pada [0, 3] dengan daerahnya, bawah jejak A(x) = x^3/3), susunannya sama
dengan widget `luas-yang-tumbuh`; pita tipis di ujung kanan dengan kotak
pembesaran; ruas singgung di papan bawah; F = A + C; C saling menghapus;
contoh integral x^2 dari 1 sampai 3 = 26/3; enam puluh persegi panjang yang
masih meleset 0,13.

YANG BERBEDA: pembuka sub-bab plus Bagian 3 dengan pertanyaan halaman;
segar-ingat Membalik Turunan Bagian 1 dan Luas dan Integral Tentu Bagian 2;
babak asal rumus ("Dari mana jawabannya?"); bentuk umum TDK II LAHIR di atas
papan lalu masuk panel; babak "keliru" (26/3 + C, lalu C-nya terhapus di depan
mata); rangkuman dengan pertanyaan; penutup menunjuk Bagian 4; tiap kejadian
dipicu pada KATA (`sinema.JamKata`).

ANGKA diperiksa sympy lewat `alat/klaim-video-integral07.json` (A(3) = 9,
A(1) = 1/3, pita h = 0,2 memberi 331/375 lawan 4/5, integral = 26/3, n = 60
meleset 361/2700).

SKALA MENDATAR DAN TEGAK TIDAK SAMA (x 3,2 satuan, y 9,5 satuan pada kotak
lebar dan pendek): video ini tidak pernah meminta membandingkan kemiringan
dengan mata; yang dibandingkan angkanya di panel.

WARNA: AKSEN2 biru = f dan luas di bawahnya; SOROT ungu = fungsi luas A dan
jejaknya; AKSEN merah = pita tipis dan tetapan C.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "integral07-teorema-dasar"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

KANAN = 3.0        # batas kanan gambar
X_PITA = 2.0       # tempat pita tipis diperiksa
H_PITA = 0.2       # lebar pita, angkanya ikut diperiksa sympy


def f(x):
    return x * x


def A(x):
    return x * x * x / 3.0


def papan(y_maks=9.5, langkah=3):
    """Satu papan koordinat. Batas bawah kedua sumbu kelipatan langkahnya."""
    s = Axes(x_range=(0, 3.2, 1), y_range=(0, y_maks, langkah), width=7.6, height=2.5,
             axis_config=dict(stroke_color=REDUP, stroke_width=2.2))
    angka = s.add_coordinate_labels(font_size=20, num_decimal_places=0)
    angka.set_color(TINTA).set_opacity(0.75)
    s.angka = angka
    s.latar = True
    return s


def kurva(sumbu, fungsi, a, b, warna=TINTA, tebal=3.6):
    return ParametricCurve(lambda t: sumbu.c2p(t, fungsi(t)), t_range=(a, b, (b - a) / 200.0)).set_stroke(warna, tebal)


def daerah(sumbu, fungsi, a, b, warna=AKSEN2, opacity=0.28, langkah=80):
    if b - a < 1e-4:
        b = a + 1e-4
    titik = [sumbu.c2p(a + (b - a) * i / langkah, fungsi(a + (b - a) * i / langkah)) for i in range(langkah + 1)]
    titik += [sumbu.c2p(b, 0), sumbu.c2p(a, 0)]
    return Polygon(*titik).set_fill(warna, opacity).set_stroke(warna, 0, opacity=0)


def ruas_singgung(sumbu, fungsi, turunan, x0, panjang=0.7, warna=AKSEN):
    """Ruas singgung di x0, kemiringannya DIHITUNG dari turunannya."""
    m = turunan(x0)
    y0 = fungsi(x0)
    kiri = sumbu.c2p(x0 - panjang, y0 - m * panjang)
    kanan = sumbu.c2p(x0 + panjang, y0 + m * panjang)
    return Line(kiri, kanan).set_stroke(warna, 3.2)


def kotak_pembesaran(x0, h, pusat=(4.6, -0.7), lebar=3.0, tinggi=2.2):
    """Pembesaran ujung kanan pita: tepi atas RATA lawan tepi atas MELENGKUNG.
    Ditempel ke layar (fix_in_frame), di ruang kosong kanan bawah: di bawah
    zona panel rumus dan di atas jalur subtitle."""
    y0 = f(x0) - 0.35
    y1 = f(x0 + h) + 0.35
    kiri = pusat[0] - lebar / 2
    alas = pusat[1] - tinggi / 2

    def peta(px, py):
        u = (px - (x0 - 0.03)) / (h + 0.06)
        v = (py - y0) / (y1 - y0)
        return np.array([kiri + u * lebar, alas + v * tinggi, 0.0])

    bingkai = Rectangle(width=lebar, height=tinggi).move_to([pusat[0], pusat[1], 0])
    bingkai.set_fill(LATAR, 1.0).set_stroke(REDUP, 1.6)
    n = 60
    lengkung = [peta(x0 + h * i / n, f(x0 + h * i / n)) for i in range(n + 1)]
    kurva_kecil = VMobject().set_points_smoothly(
        [peta(x0 - 0.03, f(x0 - 0.03))] + lengkung + [peta(x0 + h + 0.03, f(x0 + h + 0.03))]).set_stroke(AKSEN2, 3.0)
    atap_rata = Line(peta(x0, f(x0)), peta(x0 + h, f(x0))).set_stroke(AKSEN, 3.0)
    selisih = Polygon(*(lengkung + [peta(x0 + h, f(x0)), peta(x0, f(x0))]))
    selisih.set_fill(SOROT, 0.55).set_stroke(SOROT, 1.2)
    l_besar = sinema.label("diperbesar", warna=REDUP, ukuran=20)
    l_besar.next_to(bingkai, DOWN, buff=0.10)
    g = VGroup(bingkai, selisih, atap_rata, kurva_kecil, l_besar)
    g.fix_in_frame()
    return g, selisih


def bersihkan_panel(scene, panel, buang, b=None, run_time=0.5):
    """Buang beberapa baris panel sekaligus, lalu rapatkan sisanya."""
    buang = [m for m in buang if m is not None and m in panel.baris_lain]
    if not buang:
        return
    anim = [FadeOut(m) for m in buang]
    for m in buang:
        panel.baris_lain.remove(m)
    if b is not None:
        b.main(*anim, run_time=run_time)
    else:
        scene.play(*anim, run_time=run_time)
    for m in buang:
        scene.remove(m)
    for i, m in enumerate(panel.baris_lain):
        panel.tempat_baris(m, i)
    panel.perbarui_alas()


class IntegralTeoremaDasar(AdeganMatra):
    def construct(self):
        frame = self.frame
        panel = sinema.PapanRumus(self, ukuran=30, alas=True)
        ident = None

        def hud(**tambahan):
            isi = {}
            if ident is not None:
                isi["identitas"] = ident
            panel_isi = panel.semua()
            if panel_isi is not None:
                isi["papan"] = panel_isi
            isi.update(tambahan)
            return isi

        def nyala(*mobs, warna=SOROT, skala=1.0):
            return [Indicate(m, color=warna, scale_factor=skala) for m in mobs]

        atas = papan().move_to([0.0, 1.65, 0])
        bawah = papan().move_to([0.0, -1.55, 0])
        l_atas = sinema.label("f(x)", warna=AKSEN2)
        l_atas.next_to(atas, UP, buff=0.10).align_to(atas, LEFT)
        l_bawah = sinema.label("A(x)", warna=SOROT)
        l_bawah.next_to(bawah, UP, buff=0.10).align_to(bawah, LEFT)
        # sisa_kanan 2,6 (dulu 1,8): tepi kanan papan atas jatuh di x layar 1,98,
        # jadi baris panel selebar apa pun (maks 4,35) tidak menyentuhnya.
        pusat, tinggi_kam = kamera.muat_datar(VGroup(atas, bawah, l_atas, l_bawah), sisa_atas=0.30, sisa_kanan=2.6)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi_kam)

        k_f = kurva(atas, f, 0.0, KANAN, warna=AKSEN2)
        k_A = kurva(bawah, A, 0.0, KANAN, warna=SOROT)
        kotak = VGroup(*[
            Rectangle(width=atas.c2p(0.5, 0)[0] - atas.c2p(0, 0)[0],
                      height=atas.c2p(0, f(0.5 * i + 0.5))[1] - atas.c2p(0, 0)[1])
            .move_to((atas.c2p(0.5 * i, 0) + atas.c2p(0.5 * i + 0.5, f(0.5 * i + 0.5))) / 2)
            .set_fill(AKSEN2, 0.22).set_stroke(AKSEN2, 1.2)
            for i in range(6)
        ])

        # ---- buka: sub-bab, lalu dua pekerjaan yang dipertanyakan ------- #
        tanya_buka = rumus(r"\text{luas}\ \overset{?}{=}\ \text{antiturunan}", 40, AKSEN).move_to(bawah.get_center())
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Luas")
            sinema.judul_pembuka(self, "Luas dan Integral Tentu, Bagian 3", lama=3.0, y=2.6)
            b.catat(3.0)
            b.tunggu_kata("persegi panjang")
            b.main(FadeIn(atas), FadeIn(l_atas), ShowCreation(k_f), run_time=0.8)
            b.main(LaggedStartMap(FadeIn, kotak, lag_ratio=0.3), run_time=0.9)
            b.tunggu_kata("Kenapa")
            b.main(FadeIn(tanya_buka, scale=0.9), run_time=0.8)
        qc.periksa_adegan(self, {"label atas": l_atas, "tanya": tanya_buka}, hud=hud(), dunia={"papan atas": atas})

        # ---- ingat: antiturunan dan tetapan C; tanda integral tentu ------- #
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Membalik")
            ident = sinema.identitas(self, "atas f(x), bawah A(x)")
            ident.set_opacity(0)
            b.main(ident.animate.set_opacity(1), run_time=0.5)
            b.tunggu_kata("antiturunan f")
            b_anti0 = panel.baris(r"F' = f", warna=SOROT, b=b)
            b.tunggu_kata("tetapan C")
            b_c = panel.baris(r"F + C", warna=REDUP, b=b)
            b.tunggu_kata("tanda integral")
            b_int = panel.baris(r"\int_a^b f(x)\,dx", warna=AKSEN2, b=b)
            b.tunggu_kata("batas bawah")
            b.main(*nyala(b_int, warna=AKSEN), run_time=0.9)
        qc.periksa_adegan(self, {"label atas": l_atas, "tanya": tanya_buka}, hud=hud(), dunia={"papan atas": atas})

        # ---- dua: dua pekerjaan yang asal usulnya berbeda ----------------- #
        with sinema.babak(self, "dua", DURASI, kata=KATA) as b:
            b.tunggu_kata("membalik mesin")
            b.main(*nyala(b_anti0), run_time=0.9)
            b.tunggu_kata("menumpuk")
            b.main(*nyala(kotak, warna=AKSEN2, skala=1.03), run_time=0.9)
            b.tunggu_kata("Tidak ada")
            b.main(*nyala(tanya_buka, warna=AKSEN), run_time=0.9)
        qc.periksa_adegan(self, {"label atas": l_atas, "tanya": tanya_buka}, hud=hud(), dunia={"papan atas": atas})

        # ---- tumbuh: batas atas dibiarkan bergerak, daerahnya terisi ------ #
        xt = ValueTracker(0.0)
        daerah_hidup = always_redraw(lambda: daerah(atas, f, 0.0, max(0.01, xt.get_value())))
        garis_x = always_redraw(lambda: Line(atas.c2p(xt.get_value(), 0), atas.c2p(xt.get_value(), f(xt.get_value())))
                                .set_stroke(SOROT, 2.4))
        with sinema.babak(self, "tumbuh", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang")
            b.main(FadeOut(kotak), FadeOut(tanya_buka), run_time=0.6)
            bersihkan_panel(self, panel, [b_anti0, b_c, b_int], b=b, run_time=0.4)
            b.tunggu_kata("Batas atasnya")
            self.add(daerah_hidup, garis_x)
            b.main(xt.animate.set_value(0.8), run_time=1.0)
            b.tunggu_kata("bergerak")
            b.main(xt.animate.set_value(1.6), run_time=1.2)
            b.tunggu_kata("Sebut A")
            b_A = panel.baris(r"A(x) = \text{luas } 0 \to x", warna=SOROT, b=b)
            b.tunggu_kata("A bukan")
            b.main(*nyala(b_A, warna=AKSEN), run_time=0.9)
            b.tunggu_kata("fungsi")
            b.main(xt.animate.set_value(2.2), run_time=1.0)
        qc.periksa_adegan(self, {"label atas": l_atas}, hud=hud(), dunia={"papan atas": atas})

        # ---- jejak: nilai A digambar di papan bawah ----------------------- #
        jejak = always_redraw(lambda: kurva(bawah, A, 0.0, max(0.01, xt.get_value()), warna=SOROT))
        titik_A = always_redraw(lambda: Dot(bawah.c2p(xt.get_value(), A(xt.get_value())), radius=0.065).set_color(SOROT))
        with sinema.babak(self, "jejak", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tiap letak")
            b.main(FadeIn(bawah), FadeIn(l_bawah), run_time=0.8)
            b.tunggu_kata("digambar")
            self.add(jejak, titik_A)
            b.main(FadeIn(titik_A, scale=0.4), run_time=0.6)
            b.tunggu_kata("Jejaknya")
            b.main(xt.animate.set_value(KANAN), run_time=2.4)
        # Jejaknya dibekukan jadi kurva tetap: kalau dibiarkan hidup ia ikut
        # menyusut saat x dikembalikan ke titik pemeriksaan.
        jejak.clear_updaters()
        self.remove(jejak)
        self.add(k_A)
        qc.periksa_adegan(self, {"label bawah": l_bawah}, hud=hud(), dunia={"papan atas": atas, "papan bawah": bawah})

        # ---- tanya: pertanyaan kuncinya, x dikembalikan ke x = 2 ---------- #
        with sinema.babak(self, "tanya", DURASI, kata=KATA) as b:
            b.tunggu_kata("Pertanyaan")
            b_tanya = panel.baris(r"A' = \;?", warna=AKSEN, b=b)
            b.tunggu_kata("digeser")
            b.main(xt.animate.set_value(X_PITA), run_time=1.4)
            b.tunggu_kata("seberapa cepat")
            b.main(*nyala(garis_x, warna=AKSEN), run_time=0.9)
            b.tunggu_kata("Coba tebak")
            b.main(Indicate(titik_A, color=AKSEN, scale_factor=2.0), run_time=0.9)
            b.tunggu_kata("kedua papan")
            b.main(*nyala(l_atas, warna=AKSEN2), *nyala(l_bawah, warna=SOROT), run_time=0.9)
        qc.periksa_adegan(self, {"label bawah": l_bawah}, hud=hud(), dunia={"papan atas": atas, "papan bawah": bawah})

        # ---- pita: asal rumus, tambahan luas berupa pita tipis ------------ #
        pita = Rectangle(width=atas.c2p(X_PITA + H_PITA, 0)[0] - atas.c2p(X_PITA, 0)[0],
                         height=atas.c2p(0, f(X_PITA))[1] - atas.c2p(0, 0)[1])
        pita.move_to((atas.c2p(X_PITA, 0) + atas.c2p(X_PITA + H_PITA, f(X_PITA))) / 2)
        pita.set_fill(AKSEN, 0.55).set_stroke(AKSEN, 1.8)
        l_h = rumus("h", 28, AKSEN).next_to(pita, DR, buff=0.10)
        l_tinggi = rumus("f(x)", 28, AKSEN).next_to(pita, UR, buff=0.10)
        with sinema.babak(self, "pita", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dari mana")
            bersihkan_panel(self, panel, [b_tanya, b_A], b=b, run_time=0.4)
            b.tunggu_kata("Geser x")
            b.main(xt.animate.set_value(X_PITA + H_PITA), FadeIn(pita), run_time=1.2)
            b.tunggu_kata("pita tipis")
            b.main(*nyala(pita), run_time=0.9)
            b.tunggu_kata("lebarnya h")
            b.main(FadeIn(l_h), run_time=0.6)
            b.tunggu_kata("tingginya")
            b.main(FadeIn(l_tinggi), run_time=0.6)
        qc.periksa_adegan(self, {"label h": l_h, "label tinggi": l_tinggi}, [("label h", "label tinggi")],
                          hud=hud(), dunia={"papan atas": atas, "papan bawah": bawah})

        # ---- bagi: tambahan dibagi h tinggal f(x) -------------------------- #
        with sinema.babak(self, "bagi", DURASI, kata=KATA) as b:
            b.tunggu_kata("tambahannya")
            b_tambah = panel.baris(r"\Delta A \approx f(x)\,h", warna=AKSEN, b=b)
            b.tunggu_kata("Bagi dengan")
            b_bagi = panel.baris(r"\tfrac{\Delta A}{h} \approx f(x)", warna=AKSEN2, b=b)
            b.tunggu_kata("Itulah laju")
            b.main(*nyala(b_bagi), run_time=0.9)
            b.tunggu_kata("turunan A")
            b_tdk = panel.baris(r"A'(x) = f(x)", warna=SOROT, b=b)
            b.tunggu_kata("tinggi kurva")
            b.main(*nyala(garis_x, warna=AKSEN), run_time=0.9)
        qc.periksa_adegan(self, {"label h": l_h}, hud=hud(), dunia={"papan atas": atas, "papan bawah": bawah})

        # ---- hampir: kata "kira-kira" itu perlu, angkanya disebut --------- #
        besar, selisih_pita = kotak_pembesaran(X_PITA, H_PITA)
        with sinema.babak(self, "hampir", DURASI, kata=KATA) as b:
            b.tunggu_kata("kira-kira")
            b.main(*nyala(pita), run_time=0.8)
            b.tunggu_kata("tepi atas")
            b.main(FadeIn(besar), run_time=1.0)
            b.tunggu_kata("melengkung")
            b.main(*nyala(selisih_pita, warna=AKSEN), run_time=0.9)
            b.tunggu_kata("Untuk h")
            # Baris "delta A" sudah selesai tugasnya; panel dijaga tiga baris.
            bersihkan_panel(self, panel, [b_tambah], b=b, run_time=0.3)
            b_angka = panel.baris(r"h = 0{,}2:\ 0{,}88 \ \text{lawan}\ 0{,}80", warna=AKSEN, b=b)
            b.tunggu_kata("hampirannya")
            b.main(*nyala(b_angka), run_time=0.9)
            b.tunggu_kata("Makin kecil")
            pita_kecil = pita.copy().stretch_to_fit_width((atas.c2p(X_PITA + 0.05, 0) - atas.c2p(X_PITA, 0))[0])
            pita_kecil.align_to(pita, LEFT).align_to(pita, DOWN)
            b.main(Transform(pita, pita_kecil), FadeOut(l_h), run_time=1.0)
            b.main(xt.animate.set_value(X_PITA + 0.05), run_time=0.8)
        qc.periksa_adegan(self, {"label tinggi": l_tinggi}, hud=hud(), dunia={"papan atas": atas, "papan bawah": bawah})

        # ---- tdk1: A' = f, jadi A antiturunan f; dua dunia bertemu -------- #
        singgung = ruas_singgung(bawah, A, f, X_PITA)
        with sinema.babak(self, "tdk1", DURASI, kata=KATA) as b:
            b.tunggu_kata("Maka")
            bersihkan_panel(self, panel, [b_tambah, b_bagi, b_angka], b=b, run_time=0.4)
            b.main(FadeOut(pita), FadeOut(besar), FadeOut(l_tinggi), *nyala(b_tdk), run_time=0.8)
            b.tunggu_kata("A adalah")
            b.main(ShowCreation(singgung), run_time=1.0)
            b.main(Indicate(titik_A, color=AKSEN, scale_factor=2.0), run_time=0.7)
            b.tunggu_kata("Di situlah")
            b_anti = panel.baris(r"\text{jadi } A \text{ antiturunan } f", warna=AKSEN2, b=b)
            b.tunggu_kata("Inilah")
            b_nama1 = panel.baris(r"\text{Teorema Dasar Kalkulus I}", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"label bawah": l_bawah}, hud=hud(), dunia={"papan atas": atas, "papan bawah": bawah})

        # ---- beda: A dan F cuma berbeda sebuah tetapan --------------------- #
        k_F = kurva(bawah, lambda x: A(x) + 1.6, 0.0, KANAN, warna=SOROT)
        k_F.set_stroke(opacity=0.5)
        with sinema.babak(self, "beda", DURASI, kata=KATA) as b:
            b.tunggu_kata("sebut F")
            b.main(ShowCreation(k_F), run_time=1.0)
            b.tunggu_kata("sama-sama")
            b.main(*nyala(k_A, warna=AKSEN), *nyala(k_F, warna=AKSEN), run_time=0.9)
            b.tunggu_kata("sebuah tetapan")
            b_beda = panel.baris(r"F = A + C", warna=AKSEN, b=b)
        qc.periksa_adegan(self, {"label bawah": l_bawah}, hud=hud(), dunia={"papan atas": atas, "papan bawah": bawah})

        # ---- hapus: C muncul dua kali dengan tanda berlawanan, lalu hilang - #
        daerah_1_3 = daerah(atas, f, 1.0, 3.0, warna=SOROT, opacity=0.30)
        with sinema.babak(self, "hapus", DURASI, kata=KATA) as b:
            b.tunggu_kata("Luas dari")
            bersihkan_panel(self, panel, [b_tdk, b_anti, b_nama1], b=b, run_time=0.4)
            # Daerah "0 sampai x" pergi sebelum daerah "1 sampai 3" datang.
            # `clear_updaters` dulu: always_redraw memulihkan dirinya di tengah FadeOut.
            daerah_hidup.clear_updaters()
            garis_x.clear_updaters()
            b.main(FadeOut(daerah_hidup), FadeOut(garis_x), FadeOut(singgung), FadeIn(daerah_1_3), run_time=0.8)
            b.tunggu_kata("adalah A")
            b_luas13 = panel.baris(r"\text{luas } 1 \to 3 = A(3) - A(1)", warna=SOROT, b=b)
            b.tunggu_kata("Tulis dengan")
            b_hapus = panel.baris(r"(F(3){+}C) - (F(1){+}C)", warna=AKSEN, b=b)
            b.tunggu_kata("berlawanan")
            b.main(*nyala(b_hapus), run_time=0.9)
            b.tunggu_kata("saling menghapus")
            b_sisa = panel.baris(r"= F(3) - F(1)", warna=AKSEN2, b=b)
        qc.periksa_adegan(self, {"label bawah": l_bawah}, hud=hud(), dunia={"papan atas": atas, "papan bawah": bawah})

        # ---- umum: TDK II lahir di atas papan, masuk panel ----------------- #
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bentuk")
            b.main(FadeOut(k_F), run_time=0.4)
            bersihkan_panel(self, panel, [b_beda, b_luas13, b_hapus, b_sisa], b=b, run_time=0.4)
            b.tunggu_kata("integral f")
            rum = sinema.lahir_rumus(self, r"\int_a^b f(x)\,dx = F(b) - F(a)", dekat=atas, papan=panel, b=b,
                                     warna=SOROT, tahan=0.6, run_time=1.0, geser=DOWN * 0.2)
            b.tunggu_kata("antiturunan mana")
            b.main(*nyala(rum), run_time=0.9)
            b.tunggu_kata("Inilah")
            b_nama2 = panel.baris(r"\text{Teorema Dasar Kalkulus II}", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"label atas": l_atas}, hud=hud(), dunia={"papan atas": atas, "papan bawah": bawah})

        # ---- contoh: integral x^2 dari 1 sampai 3, tanpa persegi panjang --- #
        with sinema.babak(self, "contoh", DURASI, kata=KATA) as b:
            b.tunggu_kata("Coba")
            bersihkan_panel(self, panel, [b_nama2], b=b, run_time=0.4)
            b.tunggu_kata("x kuadrat")
            b_soal = panel.baris(r"\int_1^3 x^2\,dx", warna=AKSEN2, b=b)
            b.tunggu_kata("satu sampai")
            b.main(*nyala(daerah_1_3, warna=AKSEN), run_time=0.9)
            b.tunggu_kata("Antiturunannya")
            b_F = panel.baris(r"F(x) = \tfrac{x^3}{3}", warna=TINTA, b=b)
            b.tunggu_kata("Batas atas")
            b_hitung = panel.baris(r"9 - \tfrac{1}{3} = \tfrac{26}{3}", warna=SOROT, b=b)
            b.tunggu_kata("selisihnya")
            b.main(*nyala(b_hitung, warna=AKSEN), run_time=0.9)
        qc.periksa_adegan(self, {"label atas": l_atas}, hud=hud(), dunia={"papan atas": atas, "papan bawah": bawah})

        # ---- keliru: 26/3 + C, lalu C-nya terhapus di depan mata ----------- #
        salah = rumus(r"\tfrac{26}{3} + C", 44, AKSEN).move_to(bawah.get_center())
        with sinema.babak(self, "keliru", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kekeliruan")
            titik_A.clear_updaters()
            b.main(FadeOut(bawah), FadeOut(l_bawah), FadeOut(k_A), FadeOut(titik_A), run_time=0.6)
            b.tunggu_kata("C ikut")
            b.main(FadeIn(salah, scale=0.9), run_time=0.8)
            b.tunggu_kata("Padahal")
            salah = sinema.ganti_rumus(self, salah, r"(9 + C) - (\tfrac{1}{3} + C)", b=b, run_time=1.0, warna=TINTA)
            b.tunggu_kata("terhapus")
            salah = sinema.ganti_rumus(self, salah, r"9 - \tfrac{1}{3} = \tfrac{26}{3}", b=b, run_time=1.0, warna=SOROT)
            b.tunggu_kata("tanpa C")
            b.main(*nyala(salah), run_time=0.9)
        qc.periksa_adegan(self, {"label atas": l_atas, "hitung": salah}, hud=hud(), dunia={"papan atas": atas})

        # ---- tutup: bandingkan dengan enam puluh persegi panjang ----------- #
        kotak60 = VGroup(*[
            Rectangle(width=atas.c2p(1.0 + 2.0 / 60, 0)[0] - atas.c2p(1.0, 0)[0],
                      height=atas.c2p(0, f(1.0 + 2.0 * (i + 1) / 60))[1] - atas.c2p(0, 0)[1])
            .move_to((atas.c2p(1.0 + 2.0 * i / 60, 0) + atas.c2p(1.0 + 2.0 * (i + 1) / 60, f(1.0 + 2.0 * (i + 1) / 60))) / 2)
            .set_fill(AKSEN2, 0.22).set_stroke(AKSEN2, 0.5, opacity=0.7)
            for i in range(60)
        ])
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bandingkan")
            bersihkan_panel(self, panel, [b_soal, b_F], b=b, run_time=0.4)
            b.tunggu_kata("Enam puluh")
            b.main(FadeIn(kotak60), run_time=1.0)
            b.tunggu_kata("meleset")
            b_meleset = panel.baris(r"n = 60:\ \text{meleset } 0{,}13", warna=AKSEN, b=b)
            b.tunggu_kata("pengurangan")
            b.main(FadeOut(kotak60), *nyala(salah), run_time=0.9)
            b.tunggu_kata("dasar")
            b.main(*nyala(rum), run_time=0.9)
        qc.periksa_adegan(self, {"label atas": l_atas, "hitung": salah}, hud=hud(), dunia={"papan atas": atas})

        # ---- rangkum: satu kalimat, lalu satu pertanyaan ------------------- #
        soal_akhir = rumus(r"\int_a^a f(x)\,dx = \ ?", 44, AKSEN).move_to(bawah.get_center())
        with sinema.babak(self, "rangkum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Rangkumannya")
            bersihkan_panel(self, panel, [b_meleset], b=b, run_time=0.4)
            b.tunggu_kata("tinggi kurvanya")
            b.main(*nyala(k_f, warna=AKSEN2), run_time=0.9)
            b.tunggu_kata("antiturunan")
            b.main(*nyala(rum), run_time=0.9)
            b.tunggu_kata("Satu pertanyaan")
            b.main(FadeOut(salah), FadeIn(soal_akhir, scale=0.9), run_time=0.8)
            b.tunggu_kata("berapa")
            b.main(*nyala(soal_akhir, warna=AKSEN), run_time=0.9)
        qc.periksa_adegan(self, {"label atas": l_atas, "soal akhir": soal_akhir}, hud=hud(), dunia={"papan atas": atas})

        # ---- lanjut: Bagian 4, urutan kerja yang rapi ---------------------- #
        judul_lanjut = teks("Luas dan Integral Tentu, Bagian 4", 30, SOROT).move_to([0, 2.9, 0]).fix_in_frame()
        urutan = rumus(r"\int_a^b f(x)\,dx = \Big[\,F(x)\,\Big]_a^b", 44, TINTA).move_to([0.0, 0.2, 0])
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di materi")
            b.main(FadeOut(soal_akhir), FadeOut(atas), FadeOut(l_atas), FadeOut(k_f), FadeOut(daerah_1_3),
                   FadeOut(panel.semua()), run_time=0.6)
            self.remove(*panel.semua())
            panel = sinema.PapanRumus(self, ukuran=30, alas=True)
            self.hud_tambah(judul_lanjut)
            self.remove(judul_lanjut)
            b.tunggu_kata("Luas dan")
            b.main(FadeIn(judul_lanjut, shift=0.2 * UP), run_time=0.7)
            b.tunggu_kata("urutan kerja")
            b.main(FadeIn(urutan, scale=0.9), run_time=0.8)
            b.tunggu_kata("disubstitusi")
            b.main(*nyala(urutan), run_time=0.9)
        qc.periksa_adegan(self, {"urutan": urutan}, hud={"identitas": ident, "judul": judul_lanjut})

        sinema.laporkan_pemicu(self)
