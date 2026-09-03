"""Perkakas bersama video topik GRAFIK FUNGSI. Pola `ruang_3d_umum.py`.

Dipindah ke sini dari `manim/gl/grafik.py` atas arahan MASTER (3 Sep 2026):
yang berguna untuk semua topik sudah diangkat ke `gl/sinema.py` (jam subtitle,
label dua kata, PapanRumus, lahir_rumus, ganti_rumus), dan sisanya milik topik
ini saja, jadi tidak layak menghuni perkakas bersama.

BIDANG xz, BUKAN xy
Adegan topik ini bekerja di bidang xz dengan kamera phi 90, warisan dari video
pertama yang punya pembuka 3D. `ilustrasi.bidang_bernomor` mengharuskan kamera
dari ATAS (bidang xy), jadi ia tidak dipakai di sini. Maksud aturan 9 tetap
terpenuhi: skala x dan z sama-sama satu satuan dunia, kedua sumbu berangka, dan
kedua sumbu berhuruf. Kalau MASTER mau seluruh topik pindah ke xy, itu satu
ronde tersendiri dan menyentuh dua video yang sudah jadi.

TATA LETAK LAYAR (aturan 1 versi 2, dijaga qc)
  kanan atas  ZONA_RUMUS  x 2,10..6,85  y 1,10..3,70   milik PapanRumus
  kaki layar  ZONA_SUBTITLE           y < -2,55        WAJIB kosong
Dengan `sudut_datar()` bawaan, kedua batas itu berarti:
  tidak boleh ada titik dengan x dunia > 3,22 DAN z dunia > 3,17
  tidak boleh ada titik dengan z dunia < -0,60
Jangkauan gambar tiap kurva dipilih dari dua pertidaksamaan itu, bukan
kira-kira. Kalau sebuah kurva melanggar, yang dipendekkan jangkauannya atau
dikecilkan dunianya, BUKAN panelnya yang dipindah.
"""

from manimlib import *
from gl import sinema
from gl.tema import TINTA, REDUP, rumus

Y = -1.72               # kedalaman lapisan tempat semua benda tinggal


def sudut_datar(pusat_z: float = 1.85, tinggi: float = 9.6, x: float = 0.7):
    """Kamera tegak lurus bidang xz. Tidak ada kesan tiga dimensi sama sekali.

    Angkanya dipilih dari ukuran lembar kontak 480p, dan angka itu sudah sekali
    salah: pada `pusat_z` 2,35 angka sumbu x duduk di piksel 407 sedangkan kaki
    layar milik subtitle mulai di 393. `qc` MELOLOSKANNYA, karena lapisan
    y = -1,72 lebih dekat ke kamera sehingga perspektif membesarkannya sekitar
    1,19 kali, dan hitungan zona tidak memperhitungkan itu. Jadi ukur lembar
    kontaknya, jangan percaya gerbangnya saja.

    Arah geraknya: MENURUNKAN `pusat_z` menaikkan dunia di layar, menaikkannya
    menurunkan dunia. Pada 1,85 garis sumbu mendatar duduk di sekitar piksel
    349 dan angkanya di 379, empat belas piksel di atas kaki layar.
    """
    return dict(theta=0, phi=90, pusat=(x, 0.0, pusat_z), tinggi=tinggi)


def tegak(mob):
    """Putar teks supaya terbaca dari pandangan bidang xz."""
    return mob.rotate(PI / 2, RIGHT)


def titik(pos, warna, r: float = 0.12):
    """Titik penanda. Bola kecil, BUKAN `Dot`.

    `Dot` ManimGL adalah cakram datar di bidang xy, jadi dari pandangan xz ia
    menipis jadi garis dan praktis hilang. `Dot3D` tidak ada di ManimGL, itu
    nama Manim Community; render pertama tahap 6 gagal karenanya.
    """
    b = Sphere(radius=r).set_color(warna)
    b.set_shading(0.4, 0.3, 0.5)
    return b.move_to(pos)


def kurva(f, dari, sampai, warna=TINTA, tebal=5.0, langkah=0.02):
    """Kurva z = f(x) di lapisan y = Y."""
    k = ParametricCurve(
        lambda t: np.array([t, Y, f(t)]),
        t_range=(dari, sampai, langkah),
    )
    k.set_stroke(warna, width=tebal)
    return k


def bayangan(f, dari, sampai, warna=REDUP, tebal=2.6, opacity=0.5):
    """Bekas bentuk sebelumnya, abu tipis.

    Tanpa pembanding, "lebih sempit" dan "lebih landai" cuma klaim narator.
    Ia juga yang menyelamatkan babak a negatif: kurvanya harus berhenti sebelum
    kaki layar, dan tanpa bayangan ia terbaca seperti parabola yang MENGECIL,
    bukan yang BERBALIK.
    """
    k = kurva(f, dari, sampai, warna, tebal)
    k.set_stroke(opacity=opacity)
    return k


def sumbu_dua(x_angka=(-3, -2, -1, 1, 2, 3, 4), z_angka=(1, 2, 3, 4, 5),
              x_dari=-3.4, x_sampai=4.8, z_bawah=-0.20, z_atas=5.2,
              ukuran=22, warna=REDUP, z_angka_x=-0.42):
    """DUA sumbu, berangka dan berhuruf. Aturan 9.

    Videonya sempat cuma punya sumbu mendatar dan ARYA yang menemukannya;
    widget di situs sudah benar sejak awal, jadi videonya yang tertinggal dari
    widgetnya sendiri.

    Angka sumbu x DI BAWAH garis, tempat lazimnya. Ia sempat ditaruh di atas
    waktu pita keterangan masih ada di dasar layar; sejak pita itu dihapus, di
    atas justru berbahaya, karena kurva yang memotong sumbu tepat di angka
    bulat akan MENCORET angkanya. Terlihat di lembar kontak tahap 3 pada
    x = -1 dan x = 3.

    Angka sumbu z di KIRI garis tegak. Di kanan, ia jatuh ke dalam cekungan
    parabola justru di tempat kurvanya lewat setelah digeser.
    """
    gx = Line([x_dari, Y, 0], [x_sampai, Y, 0])
    gz = Line([0, Y, z_bawah], [0, Y, z_atas])
    for g in (gx, gz):
        g.set_stroke(warna, width=2)

    angka = Group()
    for n in x_angka:
        angka.add(tegak(rumus(str(n), ukuran, warna)).move_to([n, Y, z_angka_x]))
    for n in z_angka:
        angka.add(tegak(rumus(str(n), ukuran, warna)).move_to([-0.34, Y, n]))

    huruf = Group(
        tegak(rumus("x", ukuran + 2, warna)).move_to([x_sampai - 0.25, Y, 0.40]),
        tegak(rumus("y", ukuran + 2, warna)).move_to([0.42, Y, z_atas - 0.1]),
    )
    return Group(gx, gz, angka, huruf)


def ganti_bersama(scene, b, papan, isi_baru, ikut=None, run_time=1.6,
                  key_map=None):
    """Rumus di panel MORPH bersamaan dengan kurvanya berubah bentuk.

    `papan.tumbuh` memanggil `scene.play` sendiri, jadi ia tidak bisa
    digabungkan dengan animasi lain. Di sini rumus barunya dibangun memakai
    penempatan milik `PapanRumus` lalu di-morph DALAM SATU `play` bersama
    perubahan kurvanya.

    Kenapa harus bersamaan: kalau rumusnya berganti setelah gambarnya, panel
    menyebut bentuk lama selama satu setengah detik, dan tulisan yang membantah
    gambarnya lebih merusak daripada layar kosong.

    Morph lambang per lambang (`TransformMatchingStrings`), bukan fade keluar
    lalu masuk: itu dilarang aturan 5 versi 2. Yang menghasilkan coretan kembar
    tak terbaca adalah `ReplacementTransform` mentah, bukan morph.
    """
    baru = papan.tempat_utama(rumus(isi_baru, papan.ukuran, papan.warna))
    gerak = [TransformMatchingStrings(papan.utama, baru, key_map=key_map or {})]
    b.main(*gerak, *(ikut or []), run_time=run_time)
    papan.utama = baru
    return baru


def bersihkan_baris(scene, b, papan, run_time=0.6):
    """Kosongkan temuan yang menumpuk di panel, supaya ruangnya tidak habis.

    ZONA_RUMUS cuma 2,6 satuan tinggi, cukup untuk rumus utama plus sekitar
    empat baris. Temuan yang sudah selesai tugasnya dipadamkan supaya babak
    berikutnya punya tempat.
    """
    if not papan.baris_lain:
        return
    b.main(*[FadeOut(m) for m in papan.baris_lain], run_time=run_time)
    papan.baris_lain = []
