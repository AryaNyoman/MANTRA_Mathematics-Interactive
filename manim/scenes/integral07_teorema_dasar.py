"""Video Integral Materi 07: dua dunia yang ternyata satu, Teorema Dasar Kalkulus.

    manimgl manim/scenes/integral07_teorema_dasar.py IntegralTeoremaDasar -w -l

Puncak topik ini menurut rancangan. BUKAN video bernomor tahap terkecil, jadi
TIDAK ada pembuka 3D (butir 2 STANDAR-ILUSTRASI-VIDEO).

SATU GAMBAR SEPANJANG VIDEO: dua papan bertumpuk, atas f(x) = x^2 pada [0, 3]
dengan daerahnya, bawah jejak A(x) = x^3/3. Susunannya SENGAJA sama dengan
widget `luas-yang-tumbuh` di halaman Materi 07 ("papan atas", "papan bawah"),
supaya siswa yang sudah mencoba widgetnya mengenali gambarnya. Aturan 24
catatan proyek: buka widgetnya, samakan istilah, warna, dan arah.

ANGKA
Diperiksa sympy lewat `alat/klaim-video-integral07.json`, 12 dari 12 lolos:
A(x) = x^3/3 diperiksa sebagai ANTITURUNAN x^2 (bukan sebagai integral),
A(3) = 9, A(1) = 1/3, f(2) = 4, selisih A'(2) dan f(2) = 0, pita h = 0,2
memberi 331/375 lawan hampiran 4/5, integral 1 sampai 3 = 26/3 lewat DUA
jalan yang berbeda, C terhapus diperiksa dengan C sebagai LAMBANG, dan
jumlahan Riemann n = 60 memberi 23761/2700 yang masih meleset 361/2700.
Angka Riemann yang pertama saya tulis DIKARANG dan ditolak alatnya.

SKALA MENDATAR DAN TEGAK SENGAJA TIDAK SAMA, dan itu perlu disadari: x
membentang 3,2 satuan sedangkan y membentang 9,5, sementara kotak papannya
harus lebar dan pendek. Akibatnya kemiringan di layar tidak sama dengan
kemiringan sebenarnya. Karena itu video ini TIDAK PERNAH meminta penonton
membandingkan kemiringan dengan mata: yang dibandingkan ANGKANYA di panel
(f(2) = 4 dan kemiringan A di 2 = 4), dan ruas singgungnya cuma penunjuk.

WARNA
AKSEN2 biru = fungsi f dan luas di bawahnya. SOROT ungu = fungsi luas A dan
jejaknya. AKSEN merah = pita tipis dan tetapan C.

Alur berkas: naskah -> buat_narasi.py -> buat_subtitle.py -> adegan ini ->
gabung_audio.py integral07-teorema-dasar IntegralTeoremaDasar --uji.
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

KANAN = 3.0        # batas kanan gambar
X_PITA = 2.0       # tempat pita tipis diperiksa
H_PITA = 0.2       # lebar pita, angkanya ikut diperiksa sympy


def f(x):
    """Fungsi yang luasnya diukur. Contoh 3.9 buku memakai x^2 dari 1 sampai 3."""
    return x * x


def A(x):
    """Luas dari 0 sampai x, yaitu antiturunan f yang bernilai nol di nol."""
    return x * x * x / 3.0


def papan(y_maks=9.5, langkah=3):
    """Satu papan koordinat. Batas bawah kedua sumbu kelipatan langkahnya."""
    s = Axes(
        x_range=(0, 3.2, 1), y_range=(0, y_maks, langkah), width=7.6, height=2.5,
        axis_config=dict(stroke_color=REDUP, stroke_width=2.2),
    )
    angka = s.add_coordinate_labels(font_size=20, num_decimal_places=0)
    angka.set_color(TINTA).set_opacity(0.75)
    s.angka = angka          # supaya gerbang tulisan lawan angka sumbu berlaku
    s.latar = True
    return s


def kurva(sumbu, fungsi, a, b, warna=TINTA, tebal=3.6):
    """Kurva digambar dari titik yang DIHITUNG, bukan digambar tangan."""
    return ParametricCurve(
        lambda t: sumbu.c2p(t, fungsi(t)), t_range=(a, b, (b - a) / 200.0)
    ).set_stroke(warna, tebal)


def daerah(sumbu, fungsi, a, b, warna=AKSEN2, opacity=0.28, langkah=80):
    """Daerah di bawah kurva dari a sampai b, dibangun dari fungsinya sendiri."""
    if b - a < 1e-4:
        b = a + 1e-4
    titik = [sumbu.c2p(a + (b - a) * i / langkah, fungsi(a + (b - a) * i / langkah))
             for i in range(langkah + 1)]
    titik += [sumbu.c2p(b, 0), sumbu.c2p(a, 0)]
    return Polygon(*titik).set_fill(warna, opacity).set_stroke(warna, 0, opacity=0)


def ruas_singgung(sumbu, fungsi, turunan, x0, panjang=0.7, warna=AKSEN):
    """Ruas singgung di x0, kemiringannya DIHITUNG dari turunannya.

    Dibuat dari kemiringan, bukan dari dua titik pada kurvanya: dua titik pada
    kurva memberi tali busur, dan tali busur BUKAN garis singgung.
    """
    m = turunan(x0)
    y0 = fungsi(x0)
    kiri = sumbu.c2p(x0 - panjang, y0 - m * panjang)
    kanan = sumbu.c2p(x0 + panjang, y0 + m * panjang)
    return Line(kiri, kanan).set_stroke(warna, 3.2)


def kotak_pembesaran(x0, h, pusat=(4.6, -0.7), lebar=3.0, tinggi=2.2):
    """Pembesaran ujung kanan pita: tepi atas RATA lawan tepi atas MELENGKUNG.

    KENAPA PERLU
    Pada papan yang sebenarnya, x membentang 3,2 satuan dan y membentang 9,5
    dalam kotak yang lebar dan pendek. Pita selebar 0,2 karena itu jadi jalur
    setipis beberapa piksel, dan lengkungan tepi atasnya lebih kecil daripada
    satu piksel: render kedua memperlihatkan pita merah yang cuma BERGANTI
    WARNA saat daerah sebenarnya digambar di atasnya, dan penonton tidak
    mungkin melihat apa yang sedang diucapkan narator. Kotak ini memperbesar
    daerah itu sekitar lima belas kali sehingga selisihnya terlihat.

    Ditempel ke LAYAR (`fix_in_frame`), bukan ke dunia, dan ditaruh di ruang
    kosong kanan bawah: di bawah zona panel rumus (y < 1,10) dan di atas jalur
    subtitle (y > -2,35).
    """
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
        [peta(x0 - 0.03, f(x0 - 0.03))] + lengkung
        + [peta(x0 + h + 0.03, f(x0 + h + 0.03))]).set_stroke(AKSEN2, 3.0)

    atap_rata = Line(peta(x0, f(x0)), peta(x0 + h, f(x0))).set_stroke(AKSEN, 3.0)
    # Yang TERLEWAT oleh persegi panjang: daerah antara tepi rata dan kurvanya.
    selisih = Polygon(*(lengkung + [peta(x0 + h, f(x0)), peta(x0, f(x0))]))
    selisih.set_fill(SOROT, 0.55).set_stroke(SOROT, 1.2)

    l_besar = sinema.label("diperbesar", warna=REDUP, ukuran=20)
    l_besar.next_to(bingkai, DOWN, buff=0.10)

    g = VGroup(bingkai, selisih, atap_rata, kurva_kecil, l_besar)
    g.fix_in_frame()
    return g, selisih


def bersihkan_panel(scene, papan_rumus, buang, b=None, run_time=0.9):
    """Buang beberapa baris panel sekaligus, lalu rapatkan sisanya.

    Salinan ketiga dari pembantu yang sama (video 05 dan 01). Sudah saya catat
    sebagai usulan untuk `gl/sinema.py`; MASTER mengumpulkan usulan sinema jadi
    satu perubahan, jadi untuk sementara ia tinggal di adegan.
    """
    buang = [m for m in buang if m is not None]
    if not buang:
        return
    scene.play(*[FadeOut(m) for m in buang], run_time=run_time)
    for m in buang:
        if m in papan_rumus.baris_lain:
            papan_rumus.baris_lain.remove(m)
        scene.remove(m)
    for i, m in enumerate(papan_rumus.baris_lain):
        papan_rumus.tempat_baris(m, i)
    papan_rumus.perbarui_alas()
    if b is not None:
        b.catat(run_time)


class IntegralTeoremaDasar(AdeganMatra):
    def construct(self):
        frame = self.frame
        panel = sinema.PapanRumus(self, ukuran=30, alas=True)
        jam = sinema.jam_subtitle(TOPIK)

        # ---------------------------------------------------------------
        # buka: kartu judul saja, sama dengan kalimat yang diucapkan.
        # ---------------------------------------------------------------
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(2.2, DURASI["buka"] - 0.8)
            sinema.judul_pembuka(self, "Materi 07: dua dunia yang ternyata satu",
                                 lama=lama)
            b.catat(lama)

        atas = papan().move_to([0.0, 1.65, 0])
        bawah = papan().move_to([0.0, -1.55, 0])
        l_atas = sinema.label("f(x)", warna=AKSEN2)
        l_atas.next_to(atas, UP, buff=0.10).align_to(atas, LEFT)
        l_bawah = sinema.label("A(x)", warna=SOROT)
        l_bawah.next_to(bawah, UP, buff=0.10).align_to(bawah, LEFT)
        # `sisa_kanan` 1,8 sama seperti video 01: yang mengikat ukuran di sini
        # TINGGI layar, jadi memesan jalur kanan menggeser gambar ke kiri
        # menjauhi panel, bukan mengecilkannya.
        pusat, tinggi_kam = kamera.muat_datar(
            VGroup(atas, bawah, l_atas, l_bawah), sisa_atas=0.30, sisa_kanan=1.8)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi_kam)

        k_f = kurva(atas, f, 0.0, KANAN, warna=AKSEN2)
        k_A = kurva(bawah, A, 0.0, KANAN, warna=SOROT)

        # ---------------------------------------------------------------
        # dua: dua pekerjaan yang asal usulnya berbeda.
        # ---------------------------------------------------------------
        with sinema.babak(self, "dua", DURASI) as b:
            b.main(FadeIn(atas), FadeIn(l_atas), run_time=1.6)
            b.main(ShowCreation(k_f), run_time=2.6)
            b_balik = panel.baris(r"\text{membalik turunan}", warna=SOROT, b=b)
            b.tunggu_sampai(sinema.mulai(jam, "dan menumpuk"))
            kotak = VGroup(*[
                Rectangle(
                    width=atas.c2p(0.5, 0)[0] - atas.c2p(0, 0)[0],
                    height=atas.c2p(0, f(0.5 * i + 0.5))[1] - atas.c2p(0, 0)[1],
                ).move_to((atas.c2p(0.5 * i, 0) + atas.c2p(0.5 * i + 0.5, f(0.5 * i + 0.5))) / 2)
                .set_fill(AKSEN2, 0.22).set_stroke(AKSEN2, 1.2)
                for i in range(6)
            ])
            b.main(LaggedStartMap(FadeIn, kotak, lag_ratio=0.45), run_time=2.6)
            b_tumpuk = panel.baris(r"\text{menumpuk persegi panjang}", warna=AKSEN2, b=b)
            ident = sinema.identitas(self, "atas f(x), bawah A(x)")
            b.main(Indicate(kotak, color=SOROT), run_time=1.6)
        qc.periksa_adegan(self, {"label atas": l_atas},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"papan atas": atas})

        # ---------------------------------------------------------------
        # tumbuh: batas atas dibiarkan bergerak, daerahnya terisi.
        # ---------------------------------------------------------------
        # Satu peubah pengikat untuk SELURUH gambar hidup: daerah di papan atas,
        # jejak di papan bawah, dan titiknya. Semuanya digambar ulang dari
        # `xt`, jadi tidak mungkin salah satunya tertinggal dari yang lain.
        xt = ValueTracker(0.0)
        daerah_hidup = always_redraw(
            lambda: daerah(atas, f, 0.0, max(0.01, xt.get_value())))
        garis_x = always_redraw(
            lambda: Line(atas.c2p(xt.get_value(), 0),
                         atas.c2p(xt.get_value(), f(xt.get_value())))
            .set_stroke(SOROT, 2.4))
        with sinema.babak(self, "tumbuh", DURASI) as b:
            b.main(FadeOut(kotak), run_time=0.8)
            bersihkan_panel(self, panel, [b_balik, b_tumpuk], b=b)
            self.add(daerah_hidup, garis_x)
            b.tunggu_sampai(sinema.mulai(jam, "A(x) = luas dari 0"))
            b.main(xt.animate.set_value(1.6), run_time=4.2)
            b_A = panel.baris(r"A(x) = \text{luas } 0 \to x", warna=SOROT, b=b)
            b.tunggu_sampai(sinema.mulai(jam, "A adalah fungsi."))
            b.main(Indicate(b_A, color=AKSEN), run_time=1.8)
        qc.periksa_adegan(self, {"label atas": l_atas},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"papan atas": atas})

        # ---------------------------------------------------------------
        # jejak: nilai A digambar di papan bawah, jejaknya kurva baru.
        # ---------------------------------------------------------------
        jejak = always_redraw(
            lambda: kurva(bawah, A, 0.0, max(0.01, xt.get_value()), warna=SOROT))
        titik_A = always_redraw(
            lambda: Dot(bawah.c2p(xt.get_value(), A(xt.get_value())),
                        radius=0.065).set_color(SOROT))
        with sinema.babak(self, "jejak", DURASI) as b:
            b.main(FadeIn(bawah), FadeIn(l_bawah), run_time=1.6)
            self.add(jejak, titik_A)
            b.main(FadeIn(titik_A, scale=0.4), run_time=1.0)
            b.tunggu_sampai(sinema.mulai(jam, "Jejaknya di papan bawah"))
            b.main(xt.animate.set_value(KANAN), run_time=4.4)
        # Jejaknya DIBEKUKAN jadi kurva tetap begitu selesai digambar. Kalau
        # dibiarkan hidup, ia ikut MENYUSUT saat x dikembalikan ke titik
        # pemeriksaan di babak berikutnya, dan penonton melihat kurva terhapus
        # padahal yang dimaksud cuma "mari kembali ke x = 2". Daerah di papan
        # atas memang harus tetap hidup: luas sampai x MEMANG mengecil kalau x
        # mengecil. Widget `luas-yang-tumbuh` berperilaku sama.
        self.remove(jejak)
        self.add(k_A)
        qc.periksa_adegan(self, {"label bawah": l_bawah},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"papan atas": atas, "papan bawah": bawah})

        # ---------------------------------------------------------------
        # tanya: pertanyaan kuncinya, x dikembalikan ke tempat pemeriksaan.
        # ---------------------------------------------------------------
        with sinema.babak(self, "tanya", DURASI) as b:
            b_tanya = panel.baris(r"A' = \;?", warna=AKSEN, b=b)
            b.main(xt.animate.set_value(X_PITA), run_time=3.4)
            b.main(Indicate(b_tanya, color=SOROT), run_time=1.8)
            b.main(Indicate(garis_x, color=AKSEN), run_time=1.8)
            b.main(Indicate(titik_A, color=AKSEN, scale_factor=2.0), run_time=1.8)
        qc.periksa_adegan(self, {"label bawah": l_bawah},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"papan atas": atas, "papan bawah": bawah})

        # ---------------------------------------------------------------
        # pita: tambahan luas berupa pita tipis di ujung kanan.
        # ---------------------------------------------------------------
        pita = Rectangle(
            width=atas.c2p(X_PITA + H_PITA, 0)[0] - atas.c2p(X_PITA, 0)[0],
            height=atas.c2p(0, f(X_PITA))[1] - atas.c2p(0, 0)[1],
        )
        pita.move_to((atas.c2p(X_PITA, 0) + atas.c2p(X_PITA + H_PITA, f(X_PITA))) / 2)
        pita.set_fill(AKSEN, 0.55).set_stroke(AKSEN, 1.8)
        l_h = rumus("h", 28, AKSEN).next_to(pita, DR, buff=0.10)
        l_tinggi = rumus("f(x)", 28, AKSEN).next_to(pita, UR, buff=0.10)
        with sinema.babak(self, "pita", DURASI) as b:
            bersihkan_panel(self, panel, [b_tanya], b=b)
            b.main(xt.animate.set_value(X_PITA + H_PITA), FadeIn(pita), run_time=2.4)
            b.main(FadeIn(l_h), run_time=1.4)
            b.main(FadeIn(l_tinggi), run_time=1.4)
            b.main(Indicate(pita, color=SOROT), run_time=2.0)
        qc.periksa_adegan(self, {"label h": l_h, "label tinggi": l_tinggi},
                          [("label h", "label tinggi")],
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"papan atas": atas, "papan bawah": bawah})

        # ---------------------------------------------------------------
        # bagi: tambahan dibagi h tinggal f(x).
        # ---------------------------------------------------------------
        with sinema.babak(self, "bagi", DURASI) as b:
            b_tambah = panel.baris(r"\Delta A \approx f(x)\,h", warna=AKSEN, b=b)
            b.main(Indicate(b_tambah, color=SOROT), run_time=1.8)
            b_bagi = panel.baris(r"\tfrac{\Delta A}{h} \approx f(x)", warna=AKSEN2, b=b)
            b.main(Indicate(b_bagi, color=SOROT), run_time=2.0)
            b.main(Indicate(garis_x, color=AKSEN), run_time=1.8)
        qc.periksa_adegan(self, {"label h": l_h},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"papan atas": atas, "papan bawah": bawah})

        # ---------------------------------------------------------------
        # hampir: kata "kira-kira" itu perlu, dan angkanya disebut.
        # ---------------------------------------------------------------
        # Kotak pembesaran, sebab lengkungan tepi atas pita TIDAK TERLIHAT pada
        # papan yang sebenarnya (render kedua: pitanya cuma berganti warna).
        # Render pertama juga menunggu kalimat 6,5 detik dengan layar diam di
        # babak ini, dan gerbang diam berbunyi; kotak ini mengisinya sekaligus.
        besar, selisih_pita = kotak_pembesaran(X_PITA, H_PITA)
        with sinema.babak(self, "hampir", DURASI) as b:
            b.main(Indicate(pita, color=SOROT), run_time=1.8)
            b.main(FadeIn(besar), run_time=2.6)
            b.main(Indicate(selisih_pita, color=AKSEN), run_time=1.8)
            b_angka = panel.baris(r"h = 0{,}2:\ 0{,}88 \ \text{lawan}\ 0{,}80",
                                  warna=AKSEN, b=b)
            b.main(Indicate(b_angka, color=SOROT), run_time=2.0)
            # Pita dikecilkan di depan mata: itulah arti "makin kecil h".
            pita_kecil = pita.copy().stretch_to_fit_width(
                (atas.c2p(X_PITA + 0.05, 0) - atas.c2p(X_PITA, 0))[0])
            pita_kecil.align_to(pita, LEFT).align_to(pita, DOWN)
            b.tunggu_sampai(sinema.mulai(jam, "Makin kecil h"))
            b.main(Transform(pita, pita_kecil), FadeOut(l_h), run_time=2.6)
            b.main(xt.animate.set_value(X_PITA + 0.05), run_time=1.6)
            b.main(Indicate(pita, color=SOROT), run_time=1.8)
        qc.periksa_adegan(self, {"label tinggi": l_tinggi},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"papan atas": atas, "papan bawah": bawah})

        # ---------------------------------------------------------------
        # tdk1: A' = f, jadi A antiturunan f. Dua dunia bertemu.
        # ---------------------------------------------------------------
        singgung = ruas_singgung(bawah, A, f, X_PITA)
        with sinema.babak(self, "tdk1", DURASI) as b:
            bersihkan_panel(self, panel, [b_tambah, b_bagi, b_angka], b=b)
            b.main(FadeOut(pita), FadeOut(besar), FadeOut(l_tinggi), run_time=0.9)
            b.main(ShowCreation(singgung), run_time=2.4)
            b.main(Indicate(titik_A, color=AKSEN, scale_factor=2.0), run_time=1.4)
            b_tdk1 = panel.baris(r"A' = f", warna=SOROT, b=b)
            b.main(Indicate(b_tdk1, color=AKSEN), run_time=1.8)
            b.tunggu_sampai(sinema.mulai(jam, "Teorema Dasar Kalkulus I."))
            b_anti = panel.baris(r"\text{jadi } A \text{ antiturunan } f",
                                 warna=AKSEN2, b=b)
            b.main(Indicate(b_anti, color=SOROT), run_time=1.8)
        qc.periksa_adegan(self, {"label bawah": l_bawah},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"papan atas": atas, "papan bawah": bawah})

        # ---------------------------------------------------------------
        # beda: A dan F cuma berbeda sebuah tetapan.
        # ---------------------------------------------------------------
        k_F = kurva(bawah, lambda x: A(x) + 1.6, 0.0, KANAN, warna=SOROT)
        k_F.set_stroke(opacity=0.5)
        with sinema.babak(self, "beda", DURASI) as b:
            b.main(ShowCreation(k_F), run_time=2.4)
            b.tunggu_sampai(sinema.mulai(jam, "jadi bedanya"))
            b_beda = panel.baris(r"F = A + C", warna=AKSEN, b=b)
            b.main(Indicate(b_beda, color=SOROT), run_time=1.8)
            b.main(Indicate(VGroup(k_A, k_F), color=AKSEN), run_time=1.8)
        qc.periksa_adegan(self, {"label bawah": l_bawah},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"papan atas": atas, "papan bawah": bawah})

        # ---------------------------------------------------------------
        # hapus: C muncul dua kali dengan tanda berlawanan, lalu hilang.
        # ---------------------------------------------------------------
        with sinema.babak(self, "hapus", DURASI) as b:
            bersihkan_panel(self, panel, [b_tdk1, b_anti], b=b)
            # Ditulis DUA TAHAP: dulu dengan A, baru dengan F. Render pertama
            # langsung ke bentuk F dan menunggu kalimat 4,1 detik dengan layar
            # diam. Tahap pertama itu juga yang menjelaskan dari mana bentuk
            # keduanya datang, jadi isinya bukan sekadar pengisi waktu.
            b_luas13 = panel.baris(r"\text{luas } 1 \to 3 = A(3) - A(1)",
                                   warna=SOROT, b=b)
            b.main(Indicate(b_luas13, color=AKSEN), run_time=2.0)
            b_hapus = panel.baris(r"(F(3){+}C) - (F(1){+}C)", warna=AKSEN, b=b)
            b.main(Indicate(b_hapus, color=SOROT), run_time=2.2)
            b.tunggu_sampai(sinema.mulai(jam, "C saling menghapus."))
            b_sisa = panel.baris(r"= F(3) - F(1)", warna=AKSEN2, b=b)
            b.main(Indicate(b_sisa, color=SOROT), run_time=2.0)
        qc.periksa_adegan(self, {"label bawah": l_bawah},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"papan atas": atas, "papan bawah": bawah})

        # ---------------------------------------------------------------
        # contoh: integral x^2 dari 1 sampai 3, tanpa satu persegi panjang pun.
        # ---------------------------------------------------------------
        daerah_1_3 = daerah(atas, f, 1.0, 3.0, warna=SOROT, opacity=0.30)
        with sinema.babak(self, "contoh", DURASI) as b:
            bersihkan_panel(self, panel, [b_beda, b_luas13, b_hapus, b_sisa], b=b)
            # Daerah "0 sampai x" HARUS pergi sebelum daerah "1 sampai 3"
            # datang. Render ketiga menumpuk keduanya, dan hasilnya tiga
            # tingkat warna di satu papan (0 sampai 1 biru muda, 1 sampai 2,05
            # biru bertumpuk ungu, 2,05 sampai 3 ungu saja) sementara narator
            # bicara tentang satu daerah saja.
            # `clear_updaters` dulu: benda `always_redraw` akan digambar ulang
            # tiap frame dan memulihkan dirinya sendiri di tengah FadeOut.
            daerah_hidup.clear_updaters()
            garis_x.clear_updaters()
            b.main(FadeOut(k_F), FadeOut(singgung), FadeOut(daerah_hidup),
                   FadeOut(garis_x), run_time=1.2)
            b.main(FadeIn(daerah_1_3), run_time=2.6)
            b.main(Indicate(k_f, color=SOROT), run_time=1.8)
            b_soal = panel.baris(r"\int_1^3 x^2\,dx", warna=AKSEN2, b=b)
            b.main(Indicate(b_soal, color=SOROT), run_time=1.8)
            b_hitung = panel.baris(r"9 - \tfrac{1}{3} = \tfrac{26}{3}", warna=SOROT, b=b)
            b.main(Indicate(b_hitung, color=AKSEN), run_time=2.0)
            b.main(Indicate(daerah_1_3, color=AKSEN), run_time=2.4)
        qc.periksa_adegan(self, {"label atas": l_atas},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"papan atas": atas, "papan bawah": bawah})

        # ---------------------------------------------------------------
        # tutup: bandingkan tenaganya dengan menumpuk enam puluh kotak.
        # ---------------------------------------------------------------
        kotak60 = VGroup(*[
            Rectangle(
                width=atas.c2p(1.0 + 2.0 / 60, 0)[0] - atas.c2p(1.0, 0)[0],
                height=atas.c2p(0, f(1.0 + 2.0 * (i + 1) / 60))[1] - atas.c2p(0, 0)[1],
            ).move_to((atas.c2p(1.0 + 2.0 * i / 60, 0)
                       + atas.c2p(1.0 + 2.0 * (i + 1) / 60, f(1.0 + 2.0 * (i + 1) / 60))) / 2)
            .set_fill(AKSEN2, 0.22).set_stroke(AKSEN2, 0.5, opacity=0.7)
            for i in range(60)
        ])
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeIn(kotak60), run_time=2.2)
            b_meleset = panel.baris(r"n = 60:\ \text{meleset } 0{,}13", warna=AKSEN, b=b)
            b.main(Indicate(b_meleset, color=SOROT), run_time=2.0)
            b.tunggu_sampai(sinema.mulai(jam, "Pengurangan tadi"))
            b.main(FadeOut(kotak60), run_time=1.4)
            b.main(Indicate(b_hitung, color=SOROT), run_time=2.0)
            b.main(Indicate(daerah_1_3, color=SOROT), run_time=1.8)
        qc.periksa_adegan(self, {"label atas": l_atas},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"papan atas": atas, "papan bawah": bawah})
