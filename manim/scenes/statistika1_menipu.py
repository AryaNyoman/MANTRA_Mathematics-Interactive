"""Materi 01 Statistika: kenapa satu angka bisa menipu (ManimGL, STANDAR VIDEO v3).

Naskah: manim/narasi/statistika1-menipu.json (32 segmen, 350,1 detik)

GAGASAN POKOK. Halaman sudah menyandingkan dua daftar angka dan bilang mean,
median, dan modusnya sama. Yang tidak bisa dilakukan halaman: memperlihatkan
PERISTIWA meringkasnya. Di video ini kedelapan titik tiap kelas benar-benar
meluncur jadi satu titik di angka 7, dan sesudah meluncur kedua kelas terlihat
sama persis. Lalu titiknya ditumpahkan kembali ke tempat asalnya, dan bedanya
muncul lagi. Runtuh dan tumpah itulah tulang punggung videonya.

YANG BERUBAH DI VERSI 3 (8 September 2026)
  * durasi 101 detik jadi 350 detik: tiap angka dihitung di layar, tidak ada
    lagi hasil yang muncul jadi;
  * animasi dipicu pada detik KATA diucapkan (`sinema.JamKata`), bukan dibagi
    rata sepanjang babak;
  * segar-ingat ke PRASYARAT, sebab ini video pertama topik: tiga ukuran
    pemusatan yang sudah dipelajari di kelas 8 SMP;
  * DUA rumus dilahirkan dari hitungan yang baru saja terlihat, bukan
    disodorkan: rata-rata sesudah 56 dibagi 8 dihitung dua kali, dan jangkauan
    sesudah 8 dikurangi 6 dan 11 dikurangi 3;
  * pembuka 3D: enam belas siswa berdiri sebagai benda nyata, lalu menjadi
    enam belas titik.

KEPUTUSAN YANG DISENGAJA, supaya tidak dikira kelalaian
  1. Kamera miring (3D) HANYA dari detik 13,8 sampai 16,8 video, tiga detik,
     di bawah batas lima detik standar v3. Sesudah kamera tegak lurus, sosok
     orangnya masih terlihat sebentar sampai berubah jadi titik: yang dilarang
     standar adalah kamera miring yang membengkokkan jarak, bukan benda nyata
     itu sendiri, dan aturan topik ini justru meminta data digambar sebagai
     orang lebih dulu.
  2. Lambang x-bar BARU dipakai di segmen `rumusrata`, saat narasi menyebutnya.
     Sebelum itu rumus rata-rata ditulis dengan kata, sebab siswa belum
     diberi tahu lambangnya.
  3. Satu penggaris nilai dipakai bersama dua kelas, angkanya di bawah baris
     Kelas B. Dua penggaris akan menggandakan angka yang sama dan memaksa
     bingkai menyusut.

Data, persis angka halaman (`t01-kelas-a` dan `t01-kelas-b`, dinyatakan buatan):
    Kelas A  6 6 7 7 7 7 8 8      mean 7  median 7  modus 7  jangkauan 2
    Kelas B  3 4 5 7 7 9 10 11    mean 7  median 7  modus 7  jangkauan 8

TATA LETAK (standar v2, masih berlaku):
    kiri atas  identitas benda, menetap
    kanan atas papan rumus
    kaki layar milik subtitle, dijaga qc
    dalam gambar label maksimal dua kata

SATU WARNA SATU MAKNA DI DALAM VIDEO INI:
    AKSEN2 biru = Kelas A, yang rapat      AKSEN bata = Kelas B, yang berpencar
    SOROT ungu  = angka ringkasan          TINTA/REDUP = sumbu dan tulisan
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "statistika1-menipu"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

KELAS_A = [6, 6, 7, 7, 7, 7, 8, 8]
KELAS_B = [3, 4, 5, 7, 7, 9, 10, 11]
PUSAT = 7

# --- Penggaris nilai 2 sampai 12, dipakai kedua kelas.
SKALA_X, PUSAT_X = 0.78, 7.0
ANGKA_X = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

# --- Tata letak tegak. Dihitung ulang untuk v3 sebab sekarang ada JALUR HITUNG
#     di atas gambar (tempat 6+6+7+... dijumlahkan di depan mata). Peta layar:
#     layar_y = (dunia_z - Z_KAMERA) * 8 / TINGGI_BINGKAI
#     Zona terlarang: identitas layar_y 2,40..3,70 di layar_x < -2,10;
#     papan rumus layar_x > 2,10; jalur subtitle layar_y < -2,55.
TINGGI_BINGKAI = 7.2
Z_KAMERA = 0.10
Z_ALAS_A = 0.45          # layar_y  0,39; diturunkan supaya tumpukan empat titik
                         # Kelas A (puncak layar_y 1,58) tidak menyentuh jalur
                         # hitung yang pecahannya turun sampai layar_y 1,72
Z_ALAS_B = -0.75         # layar_y -0,94
Z_ANGKA = -1.18          # layar_y -1,42, masih di atas jalur subtitle
# Jalur hitung memakai satuan LAYAR langsung (HUD), bukan satuan dunia:
# y 2,17 ada di bawah blok identitas (2,40) dan di atas gambar; x negatif
# menjauhkan rumus lebar dari zona papan rumus yang mulai di x 2,10.
Y_HITUNG_LAYAR = 2.17
X_HITUNG_LAYAR = -1.45
X_HITUNG2_LAYAR = 0.60   # jalur kedua, dipakai bersamaan di babak jangkauan
TINGGI_TUMPUK = 0.28
JARI_TITIK = 0.105
X_NAMA = -4.70
TINGGI_ORANG = 0.85

# --- Sudut pembuka 3D. Dipakai kurang dari lima detik (lihat catatan atas).
TEORI_3D = dict(theta=-20, phi=72, pusat=(0, 0, 0.55), tinggi=5.6)


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
        DUNIA, HUD, TULISAN = {}, {}, {}
        self.papan = None

        def taruh(nama, mob, tulisan=False):
            DUNIA[nama] = mob
            if tulisan:
                TULISAN[nama] = mob
            return mob

        def buang(*nama):
            for n in nama:
                DUNIA.pop(n, None)
                TULISAN.pop(n, None)
                HUD.pop(n, None)

        def periksa(pasangan=None):
            hidup_d = {k: v for k, v in DUNIA.items() if v is not None}
            hidup_h = {k: v for k, v in HUD.items() if v is not None}
            if self.papan is not None and self.papan.semua() is not None:
                hidup_h["papan rumus"] = self.papan.semua()
            hidup_t = {k: v for k, v in TULISAN.items() if v is not None}
            # HUD lawan DUNIA disilangkan otomatis, HUD lawan HUD TIDAK.
            # Jalur hitung, papan rumus, dan identitas semuanya HUD, jadi
            # tabrakan di antara mereka harus diminta sendiri. Tanpa ini
            # penyebut rumus yang menindih baris papan lolos diam-diam
            # (temuan lembar kontak 480p, 9 Sep 2026).
            nama_h = list(hidup_h)
            silang = [(a, b) for i, a in enumerate(nama_h) for b in nama_h[i + 1:]]
            qc.periksa_adegan(self, {}, pasangan=(pasangan or []) + silang, hud=hidup_h,
                              dunia=hidup_d, tulisan=hidup_t, jaga_jalur_bawah=True)

        # ------------------------------------------------------------------
        # Panggung yang dipakai hampir sepanjang video.
        # ------------------------------------------------------------------
        def garis_alas(z):
            return Line([xn(1.6), 0, z], [xn(12.4), 0, z]).set_stroke(REDUP, 2.2)

        alas_a, alas_b = garis_alas(Z_ALAS_A), garis_alas(Z_ALAS_B)

        penggaris = VGroup()
        angka_satuan = {}          # tiap angka didaftarkan SENDIRI ke gerbang
        for v in ANGKA_X:
            penggaris.add(Line([xn(v), 0, Z_ALAS_B], [xn(v), 0, Z_ALAS_B - 0.10])
                          .set_stroke(REDUP, 1.4))
            t = tegak(rumus(str(v), 25, REDUP)).move_to([xn(v), 0, Z_ANGKA])
            penggaris.add(t)
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

        nama_a = tegak(sinema.label("Kelas A", 26, AKSEN2)).move_to([X_NAMA, 0, Z_ALAS_A + 0.28])
        nama_b = tegak(sinema.label("Kelas B", 26, AKSEN)).move_to([X_NAMA, 0, Z_ALAS_B + 0.28])

        # Enam belas sosok siswa, berbaris rata SEBELUM dipindah ke nilainya.
        X_BARIS = [-3.5 + i * 1.0 for i in range(8)]

        def barisan(warna, y):
            g = Group()
            for x in X_BARIS:
                o = ilustrasi.orang(TINGGI_ORANG, warna).move_to([x, y, TINGGI_ORANG / 2])
                g.add(o)
            return g

        orang_a = barisan(AKSEN2, 1.35)
        orang_b = barisan(AKSEN, -1.35)
        lantai = ilustrasi.lantai_kisi(ukuran=9.0, langkah=1.0, tinggi_z=0)
        lantai.latar = True

        def jalur_hitung(isi, ukuran=34, warna=SOROT, x=X_HITUNG_LAYAR):
            """Rumus hitungan di jalur atas. HUD, BUKAN benda dunia.

            Harus HUD: `sinema.ganti_rumus` membangun Tex baru tanpa rotasi,
            jadi kalau jalur ini benda dunia yang di-`tegak()`, hasil mornya
            berdiri di bidang xy dan kamera phi=90 melihatnya dari samping,
            pipih dan tidak terbaca (temuan lembar kontak 480p, 9 Sep 2026).
            """
            m = rumus(isi, ukuran, warna).move_to([x, Y_HITUNG_LAYAR, 0])
            sinema.batasi_lebar(m, 6.6)
            return m.fix_in_frame()

        def isi_papan(p):
            """Baris papan TANPA alas kertasnya, untuk disorot.

            `semua()` sengaja menyertakan alas supaya FadeOut tidak
            meninggalkan kertas melayang, tetapi `Indicate` pada alas
            mewarnai seluruh kertas jadi blok ungu yang menelan tulisannya.
            """
            isi = list(p.baris_lain) + ([p.utama] if p.utama is not None else [])
            return VGroup(*isi)

        def denyut(kelompok, warna=SOROT, skala=1.7, lag=0.05):
            """Sorot TIAP titik di tempatnya, bukan kelompoknya sekaligus.

            `Indicate` pada VGroup membesarkan KELOMPOKNYA, sehingga dua titik
            yang berjauhan saling menjauh; pada skala 2 titik nilai 3 dan 11
            terlempar ke tepi layar. Titik data tidak boleh bergeser dari
            nilainya, sebab sumbu di bawahnya jadi berbohong.
            """
            return LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=skala, color=warna, **kw),
                VGroup(*kelompok), lag_ratio=lag)

        # ==================================================================
        # 1 `buka` (11,47 s): judul, lalu dua kartu laporan yang sama persis.
        # ==================================================================
        kamera.pasang_awal(frame, **TEORI_3D)
        ident = sinema.identitas(self, "2 kelas, 8 siswa tiap kelas",
                                 "nilai ulangan 2 sampai 12")
        self.remove(ident)

        def kartu(nama, warna, x):
            g = VGroup(sinema.label(nama, 26, warna), rumus("7", 52, SOROT))
            g.arrange(DOWN, buff=0.22)
            g.move_to([x, 0.35, 0])
            return g.fix_in_frame()

        kartu_a, kartu_b = kartu("Kelas A", AKSEN2, -3.0), kartu("Kelas B", AKSEN, 3.0)
        tanya = rumus(r"\stackrel{?}{=}", 46, TINTA).move_to([0, 0.35, 0]).fix_in_frame()

        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Penyajian")
            sinema.judul_pembuka(self, "Penyajian Data, Bagian 1", lama=3.0)
            b.catat(3.0)
            # Nama kelas muncul saat "Dua kelas" disebut, angkanya baru saat
            # "melaporkan": tanpa ini layar kosong 4 detik sesudah judul
            # (cek_layar_kosong 12 Sep).
            b.tunggu_kata("Dua kelas")
            self.hud_tambah(kartu_a, kartu_b)
            HUD["kartu A"], HUD["kartu B"] = kartu_a, kartu_b
            kartu_a[1].set_opacity(0)
            kartu_b[1].set_opacity(0)
            b.main(FadeIn(kartu_a[0], shift=UP * 0.2), FadeIn(kartu_b[0], shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("melaporkan")
            b.main(kartu_a[1].animate.set_opacity(1), kartu_b[1].animate.set_opacity(1), run_time=0.8)
            b.tunggu_kata("tujuh", ke=1)
            b.main(Indicate(kartu_a, scale_factor=1.15, color=SOROT), run_time=0.9)
            b.tunggu_kata("tujuh", ke=2)
            b.main(Indicate(kartu_b, scale_factor=1.15, color=SOROT), run_time=0.9)
            b.tunggu_kata("Apakah")
            self.hud_tambah(tanya)
            HUD["tanya"] = tanya
            b.main(FadeIn(tanya, scale=0.7), run_time=1.0)
            b.main(Indicate(tanya, scale_factor=1.3, color=SOROT), run_time=1.2)
        periksa(pasangan=[("kartu A", "kartu B"), ("kartu A", "tanya"), ("kartu B", "tanya")])
        self.add(ident)
        HUD["identitas"] = ident

        # ==================================================================
        # 2 `siswa` (8,73 s): PEMBUKA 3D. Enam belas siswa berdiri, lalu kamera
        #    turun jadi tegak lurus dan mereka berdiri di garis kelasnya.
        # ==================================================================
        with sinema.babak(self, "siswa", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ini")
            b.main(FadeOut(kartu_a), FadeOut(kartu_b), FadeOut(tanya), run_time=0.7)
            buang("kartu A", "kartu B", "tanya")
            taruh("lantai", lantai)
            b.main(FadeIn(lantai), run_time=1.0)
            b.tunggu_kata("Ada")
            taruh("orang A", orang_a)
            b.main(LaggedStartMap(FadeIn, orang_a, lag_ratio=0.10), run_time=1.3)
            b.tunggu_kata("delapan", ke=2)
            taruh("orang B", orang_b)
            b.main(LaggedStartMap(FadeIn, orang_b, lag_ratio=0.10), run_time=1.2)
            b.tunggu_kata("Tiap")
            taruh("alas", VGroup(alas_a, alas_b))
            taruh("nama A", nama_a, tulisan=True)
            taruh("nama B", nama_b, tulisan=True)
            b.main(
                kamera.sudut(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA),
                             tinggi=TINGGI_BINGKAI),
                *[o.animate.move_to([x, 0, Z_ALAS_A + TINGGI_ORANG / 2])
                  for o, x in zip(orang_a, X_BARIS)],
                *[o.animate.move_to([x, 0, Z_ALAS_B + TINGGI_ORANG / 2])
                  for o, x in zip(orang_b, X_BARIS)],
                FadeOut(lantai), ShowCreation(alas_a), ShowCreation(alas_b),
                FadeIn(nama_a), FadeIn(nama_b), run_time=2.8)
            buang("lantai")
        periksa()

        # ==================================================================
        # 3 `jadititik` (9,50 s): penggaris nilai, orang jadi titik, titik
        #    meluncur ke nilainya sendiri. Dot plot lahir di depan mata.
        # ==================================================================
        awal_a = [np.array([x, 0.0, Z_ALAS_A + 0.13]) for x in X_BARIS]
        awal_b = [np.array([x, 0.0, Z_ALAS_B + 0.13]) for x in X_BARIS]
        for d, p in zip(titik_a, awal_a):
            d.move_to(p)
        for d, p in zip(titik_b, awal_b):
            d.move_to(p)

        with sinema.babak(self, "jadititik", DURASI, kata=KATA) as b:
            b.tunggu_kata("gambar")
            taruh("penggaris", penggaris)
            TULISAN.update(angka_satuan)
            b.main(FadeIn(penggaris), run_time=1.5)
            b.tunggu_kata("titik", ke=1)
            taruh("titik A", titik_a)
            taruh("titik B", titik_b)
            b.main(*[FadeOut(o, scale=0.25) for o in orang_a],
                   *[FadeOut(o, scale=0.25) for o in orang_b],
                   *[FadeIn(d) for d in titik_a], *[FadeIn(d) for d in titik_b],
                   run_time=1.4)
            buang("orang A", "orang B")
            b.tunggu_kata("taruh")
            b.main(*[d.animate.move_to(p) for d, p in zip(titik_a, asal_a)],
                   *[d.animate.move_to(p) for d, p in zip(titik_b, asal_b)],
                   run_time=2.9)
        periksa()

        # ==================================================================
        # 4 `ingat` (10,77 s): SEGAR-INGAT ke prasyarat kelas 8 SMP.
        # ==================================================================
        papan_ingat = sinema.PapanRumus(self, ukuran=32, tanpa_utama=True, alas=True)
        self.papan = papan_ingat
        semua_titik = VGroup(*titik_a, *titik_b)

        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("segarkan")
            b.main(denyut(semua_titik, SOROT, 1.6, 0.035), run_time=1.2)
            b.tunggu_kata("pelajari")
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.8, color=AKSEN2, **kw),
                titik_a, lag_ratio=0.08), run_time=1.3)
            b.tunggu_kata("tiga")
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.8, color=AKSEN, **kw),
                titik_b, lag_ratio=0.08), run_time=1.4)
            b.tunggu_kata("rata-rata")
            papan_ingat.baris(r"\text{rata-rata}", SOROT, run_time=0.9, b=b)
            b.tunggu_kata("median")
            papan_ingat.baris(r"\text{median}", SOROT, run_time=0.9, b=b)
            b.tunggu_kata("modus")
            papan_ingat.baris(r"\text{modus}", SOROT, run_time=0.9, b=b)
        periksa()

        # ==================================================================
        # 5 `ingat2` (12,23 s): tiap definisi ditunjukkan PADA DATANYA, bukan
        #    ditulis ulang. Tulisan yang diucapkan narator tidak diulang.
        # ==================================================================
        baris_rata, baris_med, baris_mod = papan_ingat.baris_lain
        panah_urut = Arrow([xn(5.4), 0, Z_ALAS_A - 0.30], [xn(8.6), 0, Z_ALAS_A - 0.30],
                           buff=0, thickness=2.4).set_color(REDUP)
        tinggi_a = VGroup(*titik_a[2:6])

        with sinema.babak(self, "ingat2", DURASI, kata=KATA) as b:
            b.tunggu_kata("Rata-rata")
            b.main(Indicate(baris_rata, scale_factor=1.18, color=SOROT), run_time=1.0)
            b.tunggu_kata("dibagi")
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.7, color=SOROT, **kw),
                semua_titik, lag_ratio=0.05), run_time=1.8)
            b.tunggu_kata("Median")
            b.main(Indicate(baris_med, scale_factor=1.18, color=SOROT), run_time=1.0)
            b.tunggu_kata("diurutkan")
            taruh("panah urut", panah_urut)
            b.main(GrowArrow(panah_urut), run_time=1.2)
            b.tunggu_kata("Modus")
            b.main(Indicate(baris_mod, scale_factor=1.18, color=SOROT), run_time=1.0)
            b.tunggu_kata("sering")
            b.main(denyut(tinggi_a, SOROT, 1.9, 0.08), run_time=1.4)
        periksa()

        # ==================================================================
        # 6 `jumlaha` (13,80 s): CONTOH ANGKA. Tiap nilai Kelas A disorot saat
        #    dibacakan, lalu dijumlahkan di jalur hitung.
        # ==================================================================
        papan = sinema.PapanRumus(self, ukuran=32, alas=True)
        jumlah_a = jalur_hitung("6+6+7+7+7+7+8+8")

        with sinema.babak(self, "jumlaha", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kita")
            b.main(FadeOut(papan_ingat.semua()), FadeOut(panah_urut), run_time=0.8)
            buang("panah urut")
            self.papan = papan
            for frasa, ke, i in [("enam", 1, 0), ("enam", 2, 1),
                                 ("tujuh", 1, 2), ("tujuh", 2, 3),
                                 ("tujuh", 3, 4), ("tujuh", 4, 5),
                                 ("delapan", 1, 6), ("delapan", 2, 7)]:
                b.tunggu_kata(frasa, ke=ke)
                b.main(Indicate(titik_a[i], scale_factor=2.2, color=SOROT), run_time=0.7)
            b.tunggu_kata("dijumlahkan")
            HUD["jalur hitung"] = jumlah_a
            b.main(FadeIn(jumlah_a, shift=DOWN * 0.15), run_time=1.0)
            b.tunggu_kata("hasilnya")
            jumlah_a = sinema.ganti_rumus(self, jumlah_a, "6+6+7+7+7+7+8+8 = 56",
                                          b=b, run_time=1.6)
            HUD["jalur hitung"] = jumlah_a
        periksa()

        # ==================================================================
        # 7 `bagia` (8,17 s): 56 dibagi 8 sama dengan 7, dihitung di layar.
        # ==================================================================
        with sinema.babak(self, "bagia", DURASI, kata=KATA) as b:
            b.tunggu_kata("Banyaknya")
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.8, color=AKSEN2, **kw),
                titik_a, lag_ratio=0.08), run_time=1.1)
            b.tunggu_kata("delapan")
            b.main(denyut(titik_a, AKSEN2, 1.8, 0.06), run_time=1.6)
            b.tunggu_kata("rata-ratanya")
            jumlah_a = sinema.ganti_rumus(self, jumlah_a, r"\frac{56}{8}", b=b, run_time=1.5)
            HUD["jalur hitung"] = jumlah_a
            b.tunggu_kata("sama")
            jumlah_a = sinema.ganti_rumus(self, jumlah_a, r"\frac{56}{8} = 7", b=b, run_time=1.5)
            HUD["jalur hitung"] = jumlah_a
        periksa()

        # ==================================================================
        # 8 `jumlahb` (14,77 s): nilai Kelas B dibacakan satu per satu.
        # ==================================================================
        with sinema.babak(self, "jumlahb", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang")
            b.main(FadeOut(jumlah_a), run_time=0.7)
            buang("jalur hitung")
            for frasa, ke, i in [("tiga", 1, 0), ("empat", 1, 1), ("lima", 1, 2),
                                 ("tujuh", 1, 3), ("tujuh", 2, 4), ("sembilan", 1, 5),
                                 ("sepuluh", 1, 6), ("sebelas", 1, 7)]:
                b.tunggu_kata(frasa, ke=ke)
                b.main(Indicate(titik_b[i], scale_factor=2.2, color=SOROT), run_time=0.7)
            b.tunggu_kata("terkecilnya")
            b.main(Indicate(titik_b[0], scale_factor=2.6, color=AKSEN), run_time=1.5)
            b.tunggu_kata("terbesarnya")
            b.main(Indicate(titik_b[7], scale_factor=2.6, color=AKSEN), run_time=1.5)
        periksa()

        # ==================================================================
        # 9 `bagib` (11,07 s): jumlah Kelas B ternyata 56 juga.
        # ==================================================================
        jumlah_b = jalur_hitung("3+4+5+7+7+9+10+11")

        with sinema.babak(self, "bagib", DURASI, kata=KATA) as b:
            b.tunggu_kata("dijumlahkan")
            HUD["jalur hitung"] = jumlah_b
            b.main(FadeIn(jumlah_b, shift=DOWN * 0.15), run_time=1.6)
            b.tunggu_kata("lima")
            jumlah_b = sinema.ganti_rumus(self, jumlah_b, "3+4+5+7+7+9+10+11 = 56",
                                          b=b, run_time=1.6)
            HUD["jalur hitung"] = jumlah_b
            b.tunggu_kata("Dibagi")
            jumlah_b = sinema.ganti_rumus(self, jumlah_b, r"\frac{56}{8} = 7", b=b, run_time=1.6)
            HUD["jalur hitung"] = jumlah_b
            b.tunggu_kata("tujuh")
            b.main(Indicate(jumlah_b, scale_factor=1.3, color=SOROT), run_time=1.3)
            b.tunggu_kata("Persis")
            b.main(denyut(VGroup(*titik_a, *titik_b), SOROT, 1.6, 0.035),
                   run_time=1.4)
        periksa()

        # ==================================================================
        # 10 `rumusrata` (12,43 s): ASAL RUMUS. Dari angka ke huruf, lalu
        #     lambang x-bar diperkenalkan tepat saat narasi menyebutnya.
        # ==================================================================
        with sinema.babak(self, "rumusrata", DURASI, kata=KATA) as b:
            b.tunggu_kata("ditulis")
            b.main(Indicate(jumlah_b, scale_factor=1.25, color=SOROT), run_time=1.4)
            b.tunggu_kata("Jumlahkan")
            jumlah_b = sinema.ganti_rumus(self, jumlah_b, r"x_1 + x_2 + \cdots + x_n",
                                          b=b, run_time=1.8)
            HUD["jalur hitung"] = jumlah_b
            b.tunggu_kata("bagi")
            jumlah_b = sinema.ganti_rumus(self, jumlah_b,
                                          r"\frac{x_1 + x_2 + \cdots + x_n}{n}",
                                          b=b, run_time=1.8)
            HUD["jalur hitung"] = jumlah_b
            b.tunggu_kata("Lambang")
            b.main(FadeOut(jumlah_b), run_time=0.6)
            buang("jalur hitung")
            sinema.lahir_rumus(self, r"\bar{x} = \frac{x_1 + x_2 + \cdots + x_n}{n}",
                               titik_a[3], papan, b=b, warna=SOROT)
        periksa()

        # ==================================================================
        # 11 `mediana` (13,03 s): median Kelas A, dihitung dari urutan.
        # ==================================================================
        panah_urut2 = Arrow([xn(4.4), 0, Z_ALAS_A - 0.30], [xn(9.6), 0, Z_ALAS_A - 0.30],
                            buff=0, thickness=2.4).set_color(REDUP)

        with sinema.babak(self, "mediana", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bagaimana")
            papan.baris(r"\text{rata-rata}: 7 \text{ dan } 7", SOROT, run_time=0.85, b=b)
            b.tunggu_kata("median")
            b.main(Indicate(papan.utama, scale_factor=1.16, color=SOROT), run_time=1.3)
            b.tunggu_kata("urut")
            taruh("panah urut", panah_urut2)
            b.main(GrowArrow(panah_urut2), run_time=1.6)
            b.tunggu_kata("delapan")
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.8, color=AKSEN2, **kw),
                titik_a, lag_ratio=0.08), run_time=1.6)
            b.tunggu_kata("tengah")
            b.main(denyut([titik_a[3], titik_a[4]], SOROT, 2.2, 0.12),
                   run_time=1.2)
            b.tunggu_kata("keempat")
            b.main(Indicate(titik_a[3], scale_factor=2.4, color=SOROT), run_time=0.8)
            b.tunggu_kata("kelima")
            b.main(Indicate(titik_a[4], scale_factor=2.4, color=SOROT), run_time=0.8)
        periksa()

        # ==================================================================
        # 12 `mediana2` (11,67 s): dua nilai tengah dirata-ratakan.
        # ==================================================================
        med_a = jalur_hitung(r"\frac{7+7}{2}")

        with sinema.babak(self, "mediana2", DURASI, kata=KATA) as b:
            b.tunggu_kata("Keduanya")
            b.main(denyut([titik_a[3], titik_a[4]], SOROT, 2.3, 0.12),
                   run_time=1.4)
            b.tunggu_kata("Rata-rata")
            b.main(denyut([titik_a[3], titik_a[4]], AKSEN2, 2.0, 0.12),
                   run_time=1.2)
            b.tunggu_kata("tujuh", ke=2)
            HUD["jalur hitung"] = med_a
            b.main(FadeIn(med_a, shift=DOWN * 0.15), run_time=1.6)
            b.tunggu_kata("sama")
            med_a = sinema.ganti_rumus(self, med_a, r"\frac{7+7}{2} = 7", b=b, run_time=1.7)
            HUD["jalur hitung"] = med_a
            b.tunggu_kata("median")
            b.main(Indicate(med_a, scale_factor=1.25, color=SOROT), run_time=1.6)
        periksa()

        # ==================================================================
        # 13 `medianb` (10,00 s): Kelas B mengulangi hitungan yang sama.
        # ==================================================================
        panah_urut3 = Arrow([xn(2.4), 0, Z_ALAS_B - 0.30], [xn(11.6), 0, Z_ALAS_B - 0.30],
                            buff=0, thickness=2.4).set_color(REDUP)

        with sinema.babak(self, "medianb", DURASI, kata=KATA) as b:
            b.tunggu_kata("urut")
            b.main(FadeOut(panah_urut2), run_time=0.5)
            taruh("panah urut", panah_urut3)
            b.main(GrowArrow(panah_urut3), run_time=1.1)
            b.tunggu_kata("keempat")
            b.main(Indicate(titik_b[3], scale_factor=2.4, color=SOROT), run_time=0.7)
            b.tunggu_kata("kelimanya")
            b.main(Indicate(titik_b[4], scale_factor=2.4, color=SOROT), run_time=0.7)
            b.tunggu_kata("tujuh", ke=1)
            b.main(denyut([titik_b[3], titik_b[4]], AKSEN, 2.2, 0.12),
                   run_time=1.2)
            b.tunggu_kata("Jadi")
            b.main(FadeOut(med_a), FadeOut(panah_urut3), run_time=0.6)
            buang("jalur hitung", "panah urut")
            papan.baris(r"\text{median}: 7 \text{ dan } 7", SOROT, run_time=1.1, b=b)
        periksa()

        # ==================================================================
        # 14 `modus` (13,17 s): tumpukan tertinggi tiap kelas.
        # ==================================================================
        tinggi_b = VGroup(*titik_b[3:5])

        with sinema.babak(self, "modus", DURASI, kata=KATA) as b:
            b.tunggu_kata("modus", ke=1)
            b.main(denyut(semua_titik, SOROT, 1.6, 0.035), run_time=1.5)
            b.tunggu_kata("muncul", ke=1)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.6, color=SOROT, **kw),
                semua_titik, lag_ratio=0.04), run_time=1.6)
            b.tunggu_kata("Kelas", ke=1)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.7, color=AKSEN2, **kw),
                titik_a, lag_ratio=0.06), run_time=1.2)
            b.tunggu_kata("empat")
            b.main(denyut(tinggi_a, AKSEN2, 2.0, 0.08), run_time=1.6)
            b.tunggu_kata("dua")
            b.main(denyut(tinggi_b, AKSEN, 2.0, 0.08), run_time=1.6)
            b.tunggu_kata("terbanyak")
            papan.baris(r"\text{modus}: 7 \text{ dan } 7", SOROT, run_time=1.1, b=b)
        periksa()

        # ==================================================================
        # 15 `samasemua` (10,03 s): ketiganya sepakat, dan itulah masalahnya.
        # ==================================================================
        baris_rt, baris_md, baris_mo = papan.baris_lain

        with sinema.babak(self, "samasemua", DURASI, kata=KATA) as b:
            b.tunggu_kata("ketiga")
            b.main(Indicate(isi_papan(papan), scale_factor=1.08, color=SOROT), run_time=2.2)
            b.tunggu_kata("persis")
            b.main(denyut(semua_titik, SOROT, 1.6, 0.035), run_time=1.4)
            b.tunggu_kata("Rata-rata")
            b.main(Indicate(baris_rt, scale_factor=1.18, color=SOROT), run_time=1.2)
            b.tunggu_kata("median")
            b.main(Indicate(baris_md, scale_factor=1.18, color=SOROT), run_time=1.2)
            b.tunggu_kata("modus")
            b.main(Indicate(baris_mo, scale_factor=1.18, color=SOROT), run_time=1.2)
        periksa()

        # ==================================================================
        # 16 `runtuh` (8,80 s): delapan titik tiap kelas meluncur jadi satu.
        # ==================================================================
        pusat_a = np.array([xn(PUSAT), 0.0, Z_ALAS_A + 0.13])
        pusat_b = np.array([xn(PUSAT), 0.0, Z_ALAS_B + 0.13])

        with sinema.babak(self, "runtuh", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang")
            b.main(Indicate(isi_papan(papan), scale_factor=1.06, color=SOROT), run_time=1.4)
            b.tunggu_kata("diringkas")
            b.main(denyut(semua_titik, SOROT, 1.7, 0.035), run_time=1.5)
            b.tunggu_kata("Delapan")
            b.main(*[m.animate.move_to(pusat_a) for m in titik_a],
                   *[m.animate.move_to(pusat_b) for m in titik_b], run_time=2.3)
            b.tunggu_kata("saja")
            b.main(*[m.animate.set_opacity(0) for m in titik_a[1:]],
                   *[m.animate.set_opacity(0) for m in titik_b[1:]], run_time=1.0)
        periksa()

        # ==================================================================
        # 17 `identik` (9,43 s): sesudah diperas, kedua kelas SAMA PERSIS.
        # ==================================================================
        with sinema.babak(self, "identik", DURASI, kata=KATA) as b:
            b.tunggu_kata("sesudah")
            b.main(denyut([titik_a[0], titik_b[0]], SOROT, 2.2, 0.12),
                   run_time=1.4)
            b.tunggu_kata("sama")
            b.main(Indicate(titik_a[0], scale_factor=2.6, color=SOROT),
                   Indicate(titik_b[0], scale_factor=2.6, color=SOROT), run_time=1.6)
            b.tunggu_kata("titik", ke=1)
            b.main(Indicate(titik_a[0], scale_factor=2.2, color=AKSEN2), run_time=1.4)
            b.tunggu_kata("titik", ke=2)
            b.main(Indicate(titik_b[0], scale_factor=2.2, color=AKSEN), run_time=1.4)
        periksa()

        # ==================================================================
        # 18 `laporan` (11,37 s): tujuh angka tiap kelas sudah hilang. Yang
        #     hilang digambar sebagai lingkaran kosong di tempat asalnya.
        # ==================================================================
        def hantu(asal, warna, lewati):
            g = VGroup()
            for i, p in enumerate(asal):
                if i == lewati:
                    continue
                c = tegak(Circle(radius=JARI_TITIK * 1.25).set_stroke(warna, 2.8)
                          .set_fill(opacity=0))
                g.add(c.move_to(p))
            return g

        hantu_a, hantu_b = hantu(asal_a, AKSEN2, 0), hantu(asal_b, AKSEN, 0)
        redup_kelompok = VGroup(penggaris, alas_a, alas_b, nama_a, nama_b)

        with sinema.babak(self, "laporan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Inilah")
            b.main(denyut([titik_a[0], titik_b[0]], SOROT, 2.2, 0.12),
                   run_time=1.4)
            b.tunggu_kata("laporannya")
            b.main(redup_kelompok.animate.set_opacity(0.28), run_time=1.8)
            b.tunggu_kata("datanya", ke=1)
            b.main(denyut(semua_titik, REDUP, 1.6, 0.035), run_time=1.2)
            b.tunggu_kata("sisa")
            b.main(Indicate(titik_a[0], scale_factor=2.4, color=SOROT),
                   Indicate(titik_b[0], scale_factor=2.4, color=SOROT), run_time=1.6)
            b.tunggu_kata("hilang")
            taruh("hantu A", hantu_a)
            taruh("hantu B", hantu_b)
            b.main(LaggedStartMap(FadeIn, VGroup(*hantu_a, *hantu_b), lag_ratio=0.05),
                   run_time=1.7)
        periksa()

        # ==================================================================
        # 19 `tumpah` (8,73 s): angkanya dikembalikan ke tempat semula.
        # ==================================================================
        with sinema.babak(self, "tumpah", DURASI, kata=KATA) as b:
            b.tunggu_kata("kembalikan")
            b.main(redup_kelompok.animate.set_opacity(1.0), run_time=1.3)
            b.tunggu_kata("semula")
            b.main(denyut(VGroup(*hantu_a, *hantu_b), SOROT, 1.7, 0.03),
                   run_time=1.4)
            b.tunggu_kata("diperas")
            b.main(FadeOut(hantu_a), FadeOut(hantu_b), run_time=1.2)
            buang("hantu A", "hantu B")
            b.tunggu_kata("tumpahkan")
            b.main(*[m.animate.set_opacity(1) for m in titik_a[1:]],
                   *[m.animate.set_opacity(1) for m in titik_b[1:]], run_time=0.6)
            b.main(*[m.animate.move_to(p) for m, p in zip(titik_a, asal_a)],
                   *[m.animate.move_to(p) for m, p in zip(titik_b, asal_b)], run_time=2.0)
        periksa()

        # ==================================================================
        # 20 `rapat` (11,00 s): Kelas A berdesakan dari 6 sampai 8.
        # ==================================================================
        def kurung(dari, sampai, z, warna):
            g = VGroup(
                Line([xn(dari), 0, z], [xn(sampai), 0, z]),
                Line([xn(dari), 0, z - 0.09], [xn(dari), 0, z + 0.09]),
                Line([xn(sampai), 0, z - 0.09], [xn(sampai), 0, z + 0.09]),
            )
            return g.set_stroke(warna, 2.6)

        kurung_a = kurung(6, 8, Z_ALAS_A - 0.26, AKSEN2)

        with sinema.babak(self, "rapat", DURASI, kata=KATA) as b:
            b.tunggu_kata("kelihatan")
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.6, color=SOROT, **kw),
                semua_titik, lag_ratio=0.04), run_time=2.0)
            b.tunggu_kata("berdesakan")
            taruh("kurung A", kurung_a)
            b.main(ShowCreation(kurung_a), run_time=1.8)
            b.tunggu_kata("enam")
            b.main(Indicate(titik_a[0], scale_factor=2.2, color=AKSEN2), run_time=0.6)
            b.tunggu_kata("delapan")
            b.main(Indicate(titik_a[7], scale_factor=2.2, color=AKSEN2), run_time=0.6)
            b.tunggu_kata("tertinggal")
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.7, color=AKSEN2, **kw),
                titik_a, lag_ratio=0.06), run_time=1.6)
        periksa()

        # ==================================================================
        # 21 `pencar` (12,57 s): Kelas B merentang dari 3 sampai 11.
        # ==================================================================
        Z_KURUNG_B = -1.55        # di bawah angka sumbu, pita yang masih bersih
        kurung_b = kurung(3, 11, Z_KURUNG_B, AKSEN)

        with sinema.babak(self, "pencar", DURASI, kata=KATA) as b:
            b.tunggu_kata("berpencar")
            taruh("kurung B", kurung_b)
            b.main(ShowCreation(kurung_b), run_time=2.4)
            b.tunggu_kata("tiga")
            b.main(Indicate(titik_b[0], scale_factor=2.4, color=AKSEN), run_time=1.2)
            b.tunggu_kata("sebelas")
            b.main(Indicate(titik_b[7], scale_factor=2.4, color=AKSEN), run_time=1.2)
            b.tunggu_kata("Rata-ratanya")
            b.main(denyut(tinggi_b, REDUP, 1.9, 0.08), run_time=1.4)
            b.tunggu_kata("dua")
            b.main(denyut(tinggi_b, SOROT, 2.2, 0.08), run_time=1.8)
        periksa()

        # ==================================================================
        # 22 `guru` (11,30 s): yang tertinggal dan yang jauh di depan.
        # ==================================================================
        def tiang(nilai, warna):
            return DashedLine([xn(nilai), 0, Z_ALAS_B + 0.02],
                              [xn(nilai), 0, Z_ALAS_B + 0.78]).set_stroke(warna, 2.2)

        tiang_kiri, tiang_kanan = tiang(3, AKSEN), tiang(11, AKSEN)

        with sinema.babak(self, "guru", DURASI, kata=KATA) as b:
            b.tunggu_kata("kedua")
            b.main(denyut(semua_titik, SOROT, 1.7, 0.035), run_time=1.8)
            b.tunggu_kata("berbeda")
            b.main(FadeOut(kurung_a), FadeOut(kurung_b), run_time=1.2)
            buang("kurung A", "kurung B")
            b.tunggu_kata("Kelas", ke=2)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.7, color=AKSEN, **kw),
                titik_b, lag_ratio=0.06), run_time=1.4)
            b.tunggu_kata("tertinggal")
            taruh("tiang kiri", tiang_kiri)
            b.main(ShowCreation(tiang_kiri),
                   Indicate(titik_b[0], scale_factor=2.4, color=AKSEN), run_time=1.8)
            b.tunggu_kata("depan")
            taruh("tiang kanan", tiang_kanan)
            b.main(ShowCreation(tiang_kanan),
                   Indicate(titik_b[7], scale_factor=2.4, color=AKSEN), run_time=1.7)
        periksa()

        # ==================================================================
        # 23 `ukur` (9,93 s): diukur dari ujung ke ujung.
        # ==================================================================
        panah_kiri = Arrow([xn(1.9), 0, Z_KURUNG_B], [xn(3.0), 0, Z_KURUNG_B],
                           buff=0, thickness=2.6).set_color(SOROT)
        panah_kanan = Arrow([xn(12.1), 0, Z_KURUNG_B], [xn(11.0), 0, Z_KURUNG_B],
                            buff=0, thickness=2.6).set_color(SOROT)

        with sinema.babak(self, "ukur", DURASI, kata=KATA) as b:
            b.tunggu_kata("baru")
            b.main(FadeOut(tiang_kiri), FadeOut(tiang_kanan), run_time=1.0)
            buang("tiang kiri", "tiang kanan")
            b.tunggu_kata("mengukur")
            b.main(denyut([titik_b[0], titik_b[7]], AKSEN, 2.4, 0.12),
                   run_time=1.4)
            b.tunggu_kata("berpencar")
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.7, color=AKSEN, **kw),
                titik_b, lag_ratio=0.06), run_time=1.4)
            b.tunggu_kata("mengukurnya")
            taruh("panah kiri", panah_kiri)
            b.main(GrowArrow(panah_kiri), run_time=1.0)
            b.tunggu_kata("ujung", ke=2)
            taruh("panah kanan", panah_kanan)
            b.main(GrowArrow(panah_kanan), run_time=1.0)
        periksa()

        # ==================================================================
        # 24 `janga` (9,50 s): 8 dikurangi 6 sama dengan 2.
        # ==================================================================
        sel_a = jalur_hitung("8 - 6", 32, AKSEN2, x=-2.70)

        with sinema.babak(self, "janga", DURASI, kata=KATA) as b:
            b.tunggu_kata("Untuk")
            b.main(FadeOut(panah_kiri), FadeOut(panah_kanan),
                   denyut(titik_a, AKSEN2, 1.7, 0.06), run_time=1.3)
            buang("panah kiri", "panah kanan")
            b.tunggu_kata("terbesarnya")
            b.main(Indicate(titik_a[7], scale_factor=2.4, color=AKSEN2), run_time=1.2)
            b.tunggu_kata("terkecilnya")
            b.main(Indicate(titik_a[0], scale_factor=2.4, color=AKSEN2), run_time=1.4)
            b.tunggu_kata("Selisihnya")
            HUD["jalur hitung"] = sel_a
            b.main(FadeIn(sel_a, shift=DOWN * 0.15), run_time=1.6)
            b.tunggu_kata("sama")
            sel_a = sinema.ganti_rumus(self, sel_a, "8 - 6 = 2", b=b, run_time=1.7)
            HUD["jalur hitung"] = sel_a
        periksa()

        # ==================================================================
        # 25 `jangb` (9,83 s): 11 dikurangi 3 sama dengan 8.
        # ==================================================================
        sel_b = jalur_hitung("11 - 3", 32, AKSEN, x=X_HITUNG2_LAYAR)

        with sinema.babak(self, "jangb", DURASI, kata=KATA) as b:
            b.tunggu_kata("Untuk")
            b.main(denyut(titik_b, AKSEN, 1.7, 0.06), run_time=1.3)
            b.tunggu_kata("terbesarnya")
            b.main(Indicate(titik_b[7], scale_factor=2.4, color=AKSEN), run_time=1.2)
            b.tunggu_kata("terkecilnya")
            b.main(Indicate(titik_b[0], scale_factor=2.4, color=AKSEN), run_time=1.4)
            b.tunggu_kata("Selisihnya")
            HUD["jalur hitung 2"] = sel_b
            b.main(FadeIn(sel_b, shift=DOWN * 0.15), run_time=1.6)
            b.tunggu_kata("sama")
            sel_b = sinema.ganti_rumus(self, sel_b, "11 - 3 = 8", b=b, run_time=1.7)
            HUD["jalur hitung 2"] = sel_b
        periksa()

        # ==================================================================
        # 26 `rumusjang` (10,03 s): ASAL RUMUS KEDUA, lahir dari dua hitungan
        #     yang baru saja terlihat.
        # ==================================================================
        with sinema.babak(self, "rumusjang", DURASI, kata=KATA) as b:
            b.tunggu_kata("jangkauan", ke=1)
            b.main(Indicate(sel_a, scale_factor=1.25, color=AKSEN2),
                   Indicate(sel_b, scale_factor=1.25, color=AKSEN), run_time=1.8)
            b.tunggu_kata("hitungan")
            b.main(Indicate(VGroup(sel_a, sel_b), scale_factor=1.15, color=SOROT), run_time=1.2)
            b.tunggu_kata("Jangkauan", ke=2)
            b.main(FadeOut(sel_a), FadeOut(sel_b), FadeOut(papan.semua()), run_time=0.7)
            buang("jalur hitung", "jalur hitung 2")
            papan2 = sinema.PapanRumus(self, ukuran=32, alas=True)
            self.papan = papan2
            sinema.lahir_rumus(
                self, r"\text{jangkauan} = x_{\text{maks}} - x_{\text{min}}",
                titik_b[4], papan2, b=b, warna=SOROT)
        periksa()

        # ==================================================================
        # 27 `duaangka` (10,53 s): akhirnya dua kelas punya angka berbeda.
        # ==================================================================
        with sinema.babak(self, "duaangka", DURASI, kata=KATA) as b:
            b.tunggu_kata("akhirnya")
            b.main(denyut(semua_titik, SOROT, 1.7, 0.035), run_time=1.6)
            b.tunggu_kata("berbeda")
            b.main(Indicate(papan2.utama, scale_factor=1.14, color=SOROT), run_time=1.6)
            b.tunggu_kata("dua")
            papan2.baris(r"\text{jangkauan A} = 2", AKSEN2, run_time=1.1, b=b)
            b.tunggu_kata("delapan")
            papan2.baris(r"\text{jangkauan B} = 8", AKSEN, run_time=1.1, b=b)
            b.tunggu_kata("empat")
            b.main(Indicate(VGroup(*papan2.baris_lain), scale_factor=1.14, color=SOROT),
                   run_time=1.9)
        periksa()

        # ==================================================================
        # 28 `duajenis` (11,37 s): ukuran pertama, di mana pusatnya.
        # ==================================================================
        tiang_pusat = DashedLine([xn(PUSAT), 0, Z_ALAS_B - 0.10],
                                 [xn(PUSAT), 0, Z_ALAS_A + 1.05]).set_stroke(SOROT, 2.6)
        l_pusat = tegak(sinema.label("pusatnya", 22, SOROT)).move_to([xn(9.3), 0, Z_ALAS_A + 1.05])

        with sinema.babak(self, "duajenis", DURASI, kata=KATA) as b:
            b.tunggu_kata("cukup")
            b.main(Indicate(isi_papan(papan2), scale_factor=1.06, color=SOROT), run_time=1.8)
            b.tunggu_kata("dua")
            b.main(denyut(semua_titik, SOROT, 1.7, 0.035), run_time=1.9)
            b.tunggu_kata("pertama")
            b.main(Indicate(VGroup(nama_a, nama_b), scale_factor=1.2, color=SOROT), run_time=0.6)
            b.tunggu_kata("pemusatan")
            taruh("tiang pusat", tiang_pusat)
            taruh("label pusat", l_pusat, tulisan=True)
            b.main(ShowCreation(tiang_pusat), FadeIn(l_pusat), run_time=1.8)
            b.tunggu_kata("pusat")
            b.main(Indicate(l_pusat, scale_factor=1.3, color=SOROT), run_time=1.7)
        periksa()

        # ==================================================================
        # 29 `duajenis2` (11,10 s): ukuran kedua, seberapa lebar sebarannya.
        # ==================================================================
        kurung_sebar = kurung(3, 11, Z_KURUNG_B, SOROT)
        l_sebar = tegak(sinema.label("sebarannya", 22, SOROT)).move_to([xn(1.1), 0, Z_KURUNG_B])

        with sinema.babak(self, "duajenis2", DURASI, kata=KATA) as b:
            b.tunggu_kata("penyebaran")
            taruh("kurung sebar", kurung_sebar)
            taruh("label sebar", l_sebar, tulisan=True)
            b.main(ShowCreation(kurung_sebar), FadeIn(l_sebar), run_time=2.2)
            b.tunggu_kata("berpencar")
            b.main(Indicate(kurung_sebar, scale_factor=1.06, color=SOROT), run_time=1.4)
            b.tunggu_kata("Keduanya")
            b.main(Indicate(l_pusat, scale_factor=1.3, color=SOROT),
                   Indicate(l_sebar, scale_factor=1.3, color=SOROT), run_time=1.9)
            b.tunggu_kata("menggantikan")
            b.main(Indicate(isi_papan(papan2), scale_factor=1.08, color=SOROT), run_time=1.9)
        periksa()

        # ==================================================================
        # 30 `batas` (13,70 s): jangkauan cuma melihat dua data.
        # ==================================================================
        tengah_b = VGroup(*titik_b[1:7])

        with sinema.babak(self, "batas", DURASI, kata=KATA) as b:
            b.tunggu_kata("lumayan")
            b.main(Indicate(papan2.utama, scale_factor=1.14, color=SOROT), run_time=1.6)
            b.tunggu_kata("dua")
            b.main(denyut([titik_b[0], titik_b[7]], SOROT, 2.4, 0.12),
                   run_time=1.1)
            b.tunggu_kata("terkecil")
            b.main(Indicate(titik_b[0], scale_factor=2.4, color=SOROT), run_time=0.75)
            b.tunggu_kata("terbesar")
            b.main(Indicate(titik_b[7], scale_factor=2.4, color=SOROT), run_time=0.75)
            b.tunggu_kata("mengabaikan")
            b.main(tengah_b.animate.set_opacity(0.20), run_time=2.0)
            b.tunggu_kata("jujur")
            b.main(Indicate(isi_papan(papan2), scale_factor=1.06, color=SOROT), run_time=0.8)
            b.tunggu_kata("Ukuran Pemusatan")
            b.main(tengah_b.animate.set_opacity(1.0), run_time=1.6)
        periksa()

        # ==================================================================
        # 31 `tutup` (9,10 s): meringkas selalu membuang sesuatu.
        # ==================================================================
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("Meringkas")
            b.main(Indicate(isi_papan(papan2), scale_factor=1.06, color=SOROT), run_time=1.0)
            b.tunggu_kata("membuang")
            b.main(FadeOut(tiang_pusat), FadeOut(l_pusat),
                   FadeOut(kurung_sebar), FadeOut(l_sebar), run_time=1.5)
            buang("tiang pusat", "label pusat", "kurung sebar", "label sebar")
            b.tunggu_kata("kesalahan", ke=1)
            b.main(denyut(semua_titik, REDUP, 1.6, 0.035), run_time=1.5)
            b.tunggu_kata("kesalahan", ke=2)
            b.main(denyut(semua_titik, SOROT, 1.8, 0.035), run_time=2.2)
        periksa()

        # ==================================================================
        # 32 `lanjut` (10,97 s): penutup yang menunjuk Materi 02.
        # ==================================================================
        batang = VGroup()
        for v, n in [(6, 2), (7, 4), (8, 2)]:
            tinggi = 0.13 + (n - 1) * TINGGI_TUMPUK + 0.16
            r = Rectangle(width=SKALA_X * 0.92, height=tinggi)
            r.set_stroke(AKSEN2, 2.0).set_fill(AKSEN2, 0.16)
            batang.add(tegak(r).move_to([xn(v), 0, Z_ALAS_A + tinggi / 2]))
        batang.latar = True

        kartu_lanjut = VGroup(sinema.label("Penyajian Data", 26, REDUP),
                              sinema.label("Bagian 2", 32, SOROT))
        kartu_lanjut.arrange(DOWN, buff=0.18).move_to([0, 2.78, 0]).fix_in_frame()

        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tadi")
            b.main(denyut(titik_a, AKSEN2, 1.7, 0.06), run_time=1.4)
            b.tunggu_kata("ditumpahkan")
            b.main(denyut(semua_titik, SOROT, 1.8, 0.035), run_time=2.0)
            b.tunggu_kata("materi berikutnya")
            b.main(FadeOut(papan2.semua()), run_time=0.6)
            self.papan = None
            self.hud_tambah(kartu_lanjut)
            HUD["kartu lanjut"] = kartu_lanjut
            b.main(FadeIn(kartu_lanjut, shift=DOWN * 0.2), run_time=0.9)
            b.tunggu_kata("bentuknya")
            taruh("batang", batang)
            b.main(LaggedStartMap(FadeIn, batang, lag_ratio=0.18), run_time=2.2)
        periksa()

        sinema.laporkan_pemicu(self)
