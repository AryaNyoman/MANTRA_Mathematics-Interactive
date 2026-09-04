"""Materi 01 Statistika: kenapa satu angka bisa menipu (ManimGL).

Naskah: manim/narasi/statistika1-menipu.json (10 segmen, 101,0 detik)

GAGASAN POKOK. Halaman sudah menyandingkan dua daftar angka dan bilang mean,
median, dan modusnya sama. Yang tidak bisa dilakukan halaman: memperlihatkan
PERISTIWA meringkasnya. Di video ini kedelapan titik tiap kelas benar-benar
meluncur jadi satu titik di angka 7, dan sesudah meluncur kedua kelas terlihat
sama persis. Lalu titiknya ditumpahkan kembali ke tempat asalnya, dan bedanya
muncul lagi. Runtuh dan tumpah itulah tulang punggung videonya.

Data, persis angka halaman (`t01-kelas-a` dan `t01-kelas-b`, dinyatakan buatan):
    Kelas A  6 6 7 7 7 7 8 8      mean 7  median 7  modus 7  jangkauan 2
    Kelas B  3 4 5 7 7 9 10 11    mean 7  median 7  modus 7  jangkauan 8

TATA LETAK (standar video versi 2):
    kiri atas  identitas benda, menetap
    kanan atas papan rumus, berubah lewat morph
    kaki layar milik subtitle, dijaga qc
    dalam gambar label maksimal dua kata

SATU WARNA SATU MAKNA DI DALAM VIDEO INI:
    AKSEN2 biru = Kelas A, yang rapat      AKSEN bata = Kelas B, yang berpencar
    SOROT ungu  = angka ringkasan          TINTA/REDUP = sumbu dan tulisan

Kamera phi 90, tegak lurus: yang dibandingkan JARAK antar titik, dan perspektif
sekecil apa pun akan membantah hitungannya.

Tulisan di dunia diserahkan ke `qc.periksa_adegan(tulisan=...)`, gerbang
resmi sejak 4 Sep 2026. Ia memeriksa tulisan silang satu sama lain dan
terhadap HUD, dan isi `PapanRumus` diperiksa baris demi baris.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "statistika1-menipu"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

KELAS_A = [6, 6, 7, 7, 7, 7, 8, 8]
KELAS_B = [3, 4, 5, 7, 7, 9, 10, 11]
PUSAT = 7

# --- Penggaris nilai 2 sampai 12, dipakai kedua kelas.
SKALA_X, PUSAT_X = 0.78, 7.0
ANGKA_X = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

# --- Dua baris dot plot. Kelas A menumpuk sampai empat titik (empat siswa
#     bernilai 7), Kelas B paling tinggi dua titik.
# Diperbesar 4 Sep: zona HUD cuma dua pojok atas, jadi dunia boleh
# jauh lebih tinggi daripada yang saya kira.
Z_ALAS_A = 0.80
Z_ALAS_B = -0.62
TINGGI_TUMPUK = 0.28
JARI_TITIK = 0.105
Z_ANGKA = -1.06
X_NAMA = -4.62
Z_KAMERA = 0.30
TINGGI_BINGKAI = 6.4


def tegak(mob):
    """Berdirikan benda datar di bidang xz supaya menghadap kamera."""
    return mob.rotate(90 * DEGREES, RIGHT)


def xn(nilai):
    return (nilai - PUSAT_X) * SKALA_X


def tumpuk(nilai_list):
    """Untuk tiap data, tingkat ke berapa ia ditumpuk di atas nilainya."""
    hitung, hasil = {}, []
    for v in nilai_list:
        hasil.append(hitung.get(v, 0))
        hitung[v] = hitung.get(v, 0) + 1
    return hasil


class Menipu1(AdeganMatra):
    samples = 4                        # penghalus tepi; bawaan ManimGL 0

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        DUNIA, HUD, TULISAN = {}, {}, {}
        HUD["identitas"] = sinema.identitas(self, "2 kelas, 8 siswa tiap kelas",
                                            "nilai ulangan 2 sampai 12")

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

        # ------------------------------------------------------------------
        # Panggung: satu penggaris nilai, dua garis alas, dua dot plot.
        # ------------------------------------------------------------------
        def garis_alas(z):
            return Line([xn(1.6), 0, z], [xn(12.4), 0, z]).set_stroke(REDUP, 2.2)

        alas_a, alas_b = garis_alas(Z_ALAS_A), garis_alas(Z_ALAS_B)

        angka = VGroup()
        angka_satuan = {}          # tiap angka didaftarkan SENDIRI ke gerbang
        for v in ANGKA_X:
            angka.add(Line([xn(v), 0, Z_ALAS_B], [xn(v), 0, Z_ALAS_B - 0.10])
                      .set_stroke(REDUP, 1.4))
            t = tegak(rumus(str(v), 25, REDUP)).move_to([xn(v), 0, Z_ANGKA])
            angka.add(t)
            angka_satuan[f"angka {v}"] = t

        def dot_plot(nilai_list, z_alas, warna):
            g = VGroup()
            for v, tingkat in zip(nilai_list, tumpuk(nilai_list)):
                d = Dot(radius=JARI_TITIK).set_fill(warna, 1).set_stroke(LATAR, 1.2)
                g.add(tegak(d).move_to([xn(v), 0, z_alas + 0.13 + tingkat * TINGGI_TUMPUK]))
            return g

        titik_a = dot_plot(KELAS_A, Z_ALAS_A, AKSEN2)
        titik_b = dot_plot(KELAS_B, Z_ALAS_B, AKSEN)
        asal_a = [m.get_center().copy() for m in titik_a]
        asal_b = [m.get_center().copy() for m in titik_b]

        nama_a = tegak(sinema.label("Kelas A", 27, AKSEN2)).move_to([X_NAMA, 0, Z_ALAS_A + 0.30])
        nama_b = tegak(sinema.label("Kelas B", 27, AKSEN)).move_to([X_NAMA, 0, Z_ALAS_B + 0.30])

        # ==================================================================
        # Babak 1 `buka`: dua garis, lalu enam belas titik nilai.
        # ==================================================================
        kamera.pasang_awal(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA), tinggi=TINGGI_BINGKAI)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 01: Satu angka bisa menipu", lama=3.2, y=2.6)
            b.catat(3.2)
            taruh("alas", VGroup(alas_a, alas_b))
            taruh("angka", angka)
            TULISAN.update(angka_satuan)
            b.main(ShowCreation(alas_a), ShowCreation(alas_b), FadeIn(angka), run_time=1.4)
            taruh("nama A", nama_a, tulisan=True)
            taruh("nama B", nama_b, tulisan=True)
            b.main(FadeIn(nama_a), FadeIn(nama_b), run_time=1.0)
            taruh("titik A", titik_a)
            b.main(LaggedStartMap(FadeIn, titik_a, lag_ratio=0.14), run_time=2.0)
            taruh("titik B", titik_b)
            b.main(LaggedStartMap(FadeIn, titik_b, lag_ratio=0.14), run_time=2.0)
            b.jeda(1.2)
        periksa()

        # ==================================================================
        # Babak 2 `lapor`: yang dilaporkan wali kelas cuma satu angka.
        # ==================================================================
        with sinema.babak(self, "lapor", DURASI) as b:
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.5, color=AKSEN2, **kw),
                titik_a, lag_ratio=0.1), run_time=2.0)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.5, color=AKSEN, **kw),
                titik_b, lag_ratio=0.1), run_time=2.0)
            sinema.lahir_rumus(self, r"\bar{x} = 7", titik_a[3], papan, b=b, warna=SOROT)
            b.main(Indicate(papan.utama, scale_factor=1.2, color=SOROT), run_time=1.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 3 `runtuh`: delapan titik tiap kelas meluncur jadi satu.
        # Sesudah meluncur kedua kelas terlihat SAMA PERSIS, dan itu memang
        # yang dilihat orang yang cuma dikirimi ringkasannya.
        # ==================================================================
        pusat_a = np.array([xn(PUSAT), 0.0, Z_ALAS_A + 0.13])
        pusat_b = np.array([xn(PUSAT), 0.0, Z_ALAS_B + 0.13])

        with sinema.babak(self, "runtuh", DURASI) as b:
            b.main(*[m.animate.move_to(pusat_a) for m in titik_a],
                   *[m.animate.move_to(pusat_b) for m in titik_b], run_time=3.4)
            b.main(*[m.animate.set_opacity(0) for m in titik_a[1:]],
                   *[m.animate.set_opacity(0) for m in titik_b[1:]], run_time=1.2)
            b.main(Indicate(titik_a[0], scale_factor=2.0, color=SOROT),
                   Indicate(titik_b[0], scale_factor=2.0, color=SOROT), run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 4 `sama`: median dan modus juga sepakat.
        # ==================================================================
        with sinema.babak(self, "sama", DURASI) as b:
            papan.baris(r"Me = 7", SOROT)
            b.catat(0.9)
            papan.baris(r"Mo = 7", SOROT)
            b.catat(0.9)
            b.main(Indicate(papan.semua(), scale_factor=1.12, color=SOROT), run_time=1.6)
            b.main(Indicate(titik_a[0], scale_factor=2.2, color=SOROT),
                   Indicate(titik_b[0], scale_factor=2.2, color=SOROT), run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 5 `kembali`: yang diperas jadi satu ditumpahkan lagi.
        # ==================================================================
        with sinema.babak(self, "kembali", DURASI) as b:
            b.main(*[m.animate.set_opacity(1) for m in titik_a[1:]],
                   *[m.animate.set_opacity(1) for m in titik_b[1:]], run_time=1.0)
            b.main(*[m.animate.move_to(p) for m, p in zip(titik_a, asal_a)],
                   *[m.animate.move_to(p) for m, p in zip(titik_b, asal_b)], run_time=3.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 6 `beda`: sekarang bedanya kelihatan.
        # ==================================================================
        l_rapat = tegak(sinema.label("rapat", 20, AKSEN2))
        l_rapat.move_to([xn(9.6), 0, Z_ALAS_A + 0.34])
        l_pencar = tegak(sinema.label("berpencar", 20, AKSEN))
        l_pencar.move_to([xn(3.0), 0, Z_ALAS_B + 0.62])

        with sinema.babak(self, "beda", DURASI) as b:
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.6, color=AKSEN2, **kw),
                titik_a, lag_ratio=0.1), run_time=1.8)
            taruh("label rapat", l_rapat, tulisan=True)
            b.main(FadeIn(l_rapat), run_time=1.0)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.6, color=AKSEN, **kw),
                titik_b, lag_ratio=0.1), run_time=1.8)
            taruh("label pencar", l_pencar, tulisan=True)
            b.main(FadeIn(l_pencar), run_time=1.0)
            b.main(Indicate(titik_b[0], scale_factor=2.4, color=AKSEN),
                   Indicate(titik_b[7], scale_factor=2.4, color=AKSEN), run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 7 `jangkauan`: diukur dari ujung ke ujung.
        # ==================================================================
        def rentang(dari, sampai, z, warna):
            g = VGroup(
                Line([xn(dari), 0, z], [xn(sampai), 0, z]),
                Line([xn(dari), 0, z - 0.09], [xn(dari), 0, z + 0.09]),
                Line([xn(sampai), 0, z - 0.09], [xn(sampai), 0, z + 0.09]),
            )
            return g.set_stroke(warna, 2.6)

        rentang_a = rentang(6, 8, Z_ALAS_A - 0.26, AKSEN2)
        Z_KURUNG_B = -1.44        # di bawah angka sumbu, satu-satunya pita yang bersih
        rentang_b = rentang(3, 11, Z_KURUNG_B, AKSEN)
        l_ra = tegak(rumus("2", 26, AKSEN2)).move_to([xn(8.9), 0, Z_ALAS_A - 0.26])
        # Di bawah kurung, angka ini menempel pada angka sumbu 12 (ditangkap
        # gerbang tulisan). Dinaikkan ke ruang antara kurung dan titik data.
        l_rb = tegak(rumus("8", 26, AKSEN)).move_to([xn(11.85), 0, Z_KURUNG_B])

        with sinema.babak(self, "jangkauan", DURASI) as b:
            b.main(FadeOut(l_rapat), FadeOut(l_pencar), run_time=0.8)
            buang("label rapat", "label pencar")
            taruh("rentang A", rentang_a)
            taruh("angka rentang A", l_ra, tulisan=True)
            b.main(ShowCreation(rentang_a), run_time=1.4)
            b.main(FadeIn(l_ra), run_time=0.8)
            taruh("rentang B", rentang_b)
            taruh("angka rentang B", l_rb, tulisan=True)
            b.main(ShowCreation(rentang_b), run_time=1.8)
            b.main(FadeIn(l_rb), run_time=0.8)
            b.main(Indicate(l_rb, scale_factor=1.5, color=AKSEN), run_time=1.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 8 `guru`: yang tertinggal jauh disembunyikan ringkasan.
        # ==================================================================
        tiang = DashedLine([xn(3), 0, Z_ALAS_B + 0.02], [xn(3), 0, Z_ALAS_B + 0.72])
        tiang.set_stroke(AKSEN, 2.2)
        l_tinggal = tegak(sinema.label("tertinggal jauh", 20, AKSEN))
        l_tinggal.move_to([xn(4.4), 0, Z_ALAS_B + 0.88])

        with sinema.babak(self, "guru", DURASI) as b:
            b.main(FadeOut(rentang_a), FadeOut(l_ra), FadeOut(rentang_b), FadeOut(l_rb),
                   run_time=1.0)
            buang("rentang A", "angka rentang A", "rentang B", "angka rentang B")
            taruh("tiang", VGroup(tiang, l_tinggal))
            TULISAN["label tertinggal"] = l_tinggal
            b.main(ShowCreation(tiang), run_time=1.4)
            b.main(FadeIn(l_tinggal), run_time=1.0)
            b.main(Indicate(titik_b[0], scale_factor=2.6, color=AKSEN), run_time=1.6)
            b.main(Indicate(papan.utama, scale_factor=1.2, color=SOROT), run_time=1.4)
            b.main(FadeOut(VGroup(tiang, l_tinggal)), run_time=0.8)
            buang("tiang", "label tertinggal")
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 9 `dua`: butuh DUA jenis ukuran sekaligus.
        # ==================================================================
        panah_pusat = VGroup(
            Line([xn(PUSAT), 0, Z_ALAS_A - 0.30], [xn(PUSAT), 0, Z_ALAS_A - 0.06]),
        ).set_stroke(SOROT, 3.0)
        l_pusat = tegak(sinema.label("pusatnya", 20, SOROT))
        l_pusat.move_to([xn(9.4), 0, Z_ALAS_A - 0.26])
        rentang2 = rentang(3, 11, Z_KURUNG_B, SOROT)
        l_sebar = tegak(sinema.label("sebarannya", 20, SOROT))
        l_sebar.move_to([xn(1.4), 0, Z_KURUNG_B])   # sejajar kurungnya

        with sinema.babak(self, "dua", DURASI) as b:
            taruh("panah pusat", panah_pusat)
            taruh("label pusat", l_pusat, tulisan=True)
            b.main(ShowCreation(panah_pusat), FadeIn(l_pusat), run_time=1.6)
            taruh("rentang dua", rentang2)
            taruh("label sebar", l_sebar, tulisan=True)
            b.main(ShowCreation(rentang2), run_time=1.6)
            b.main(FadeIn(l_sebar), run_time=1.0)
            b.main(Indicate(l_pusat, scale_factor=1.3, color=SOROT),
                   Indicate(l_sebar, scale_factor=1.3, color=SOROT), run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 10 `tutup`: meringkas selalu membuang sesuatu.
        # ==================================================================
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(panah_pusat), FadeOut(l_pusat), FadeOut(rentang2),
                   FadeOut(l_sebar), run_time=1.0)
            buang("panah pusat", "label pusat", "rentang dua", "label sebar")
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.6, color=AKSEN2, **kw),
                titik_a, lag_ratio=0.08), run_time=1.6)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.6, color=AKSEN, **kw),
                titik_b, lag_ratio=0.08), run_time=1.6)
            b.main(Indicate(papan.semua(), scale_factor=1.12, color=SOROT), run_time=1.6)
            b.jeda(1.4)
        periksa()
