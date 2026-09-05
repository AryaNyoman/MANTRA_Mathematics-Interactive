"""Perkakas bersama keenam video Transformasi Geometri.

KENAPA BERKAS INI ADA
Video 01 butuh DELAPAN kali render sebelum lolos, dan empat dari enam cacatnya
lolos dari seluruh gerbang otomatis. Tiga di antaranya adalah kesalahan yang
akan terulang persis sama di lima video berikutnya kalau tiap video menghitung
sendiri: letak kamera, bentuk bendanya, dan pencatatan waktu panel rumus.
Berkas ini memindahkan ketiganya ke satu tempat, supaya kesalahannya cuma bisa
dibuat sekali.

Polanya meniru `ruang_3d_umum.py` yang dipakai topik Ruang 3D.

TIGA JEBAKAN YANG SUDAH DIBAYAR MAHAL, JANGAN DIULANG
1. `b.catat(n)` BUKAN jeda. Ia hanya mengaku n detik terpakai tanpa menunggu.
   Memakainya untuk menahan layar justru MEMENDEKKAN video, sebab
   `Babak.tutup()` menambal sisa waktu dan `catat` palsu mengecilkan sisanya.
   Untuk menahan layar: tidak usah melakukan apa-apa, `tutup()` sudah menambal
   sampai pas dengan narasi.
2. `papan.baris(...)` WAJIB diberi `b=b`. Animasinya 0,8 detik, dan tanpa `b=`
   waktu itu tidak tercatat ke babak: `tutup()` menambal terlalu banyak dan
   videonya jadi lebih panjang daripada narasinya sampai `gabung_audio.py`
   menolaknya. Dua yang terlewat di video 01 meleset 1,6 detik.
   (Parameter `b=` ditambahkan MASTER 4 Sep 2026 setelah temuan ini. Sebelum
   itu waktunya harus dicatat tangan; jangan lagi memakai `b.catat(0.8)`
   manual, sebab sekarang akan terhitung DUA KALI.)
3. Teks yang ditaruh di ruang 3D ikut dimiringkan kameranya dan bisa tergambar
   TERBALIK. Semua tulisan harus muncul setelah kamera tegak lurus, atau
   dipasang ke layar dengan `fix_in_frame`.
4. `sinema.ganti_rumus` mengganti rumus dengan memindahkan lambang yang SAMA.
   Antara dua rumus yang nyaris tidak punya lambang bersama, yang terjadi
   bukan morph melainkan tumpukan coretan tak terbaca selama satu setengah
   detik. Untuk rumus yang isinya beda jauh, pakai `papan.baris` (menumpuk),
   bukan `ganti_rumus` (mengganti).
"""

import math

import numpy as np

# `gl` sengaja TIDAK diimpor di puncak berkas.
#
# Mengimpornya menarik seluruh manimlib, dan itu membuat `uji_letak()` di bawah
# tidak bisa dijalankan sebagai skrip biasa tanpa menyiapkan jalur modul lebih
# dulu. Alat mutu yang susah dijalankan adalah alat mutu yang tidak akan
# dijalankan. Impornya ditunda ke dalam fungsi yang benar-benar membutuhkannya.

# Zona HUD, disalin dari `manim/gl/sinema.py` supaya hitungan di bawah bisa
# dibaca tanpa membuka berkas lain. Kalau nilai di sana berubah, ubah juga di
# sini, dan `uji_letak()` di bawah akan menangkap kalau keduanya berbeda.
ZONA_RUMUS_KIRI = 2.10
ZONA_IDENTITAS_BAWAH = 2.40
ZONA_SUBTITLE_ATAS = -2.55

LAYAR_LEBAR = 14.22
LAYAR_TINGGI = 8.0

# Batas bingkai yang dipakai qc sendiri: separuh layar dikurangi margin 0,3.
QC_KANAN = LAYAR_LEBAR / 2 - 0.3
QC_KIRI = -QC_KANAN

# Seberapa jauh ANGKA sumbu menggantung di luar garis petak terakhir.
#
# Inilah yang membuat video 02 gagal pada percobaan pertama, dan yang membuat
# `uji_letak` versi pertama tidak menangkapnya: ujinya memeriksa garis petak,
# padahal yang keluar bingkai adalah angkanya. Terukur 0,21 satuan layar pada
# kasus itu; dipakai 0,25 supaya ada sisa.
#
# Ditulis dalam satuan LAYAR, bukan satuan dunia. Ukuran huruf angka sumbu
# tetap di layar berapa pun skala petanya, jadi menuliskannya dalam satuan
# dunia akan salah sendiri setiap kali skalanya berubah.
GANTUNG_ANGKA = 0.25

# Kelonggaran di atas ruang untuk angka yang menggantung.
#
# Tanpa ini, `letak_peta` menaruh tepi gambarnya TEPAT di garis batas, dan qc
# menolak kalau BERSENTUHAN, bukan hanya kalau bertindih. Nilai gantung sendiri
# juga cuma perkiraan (0,21 yang terukur, dibulatkan 0,25); kelonggaran ini
# yang menanggung kalau angka sumbunya kebetulan lebih lebar, misalnya saat
# petanya menjangkau bilangan dua digit.
SISA = 0.15

# Kotak yang boleh dipakai GARIS PETAK bidang, sesudah ruang untuk angka yang
# menggantung dan kelonggarannya disisihkan.
AMAN_KANAN = ZONA_RUMUS_KIRI - GANTUNG_ANGKA - SISA
AMAN_KIRI = QC_KIRI + GANTUNG_ANGKA + SISA
AMAN_ATAS = ZONA_IDENTITAS_BAWAH - GANTUNG_ANGKA - SISA
AMAN_BAWAH = ZONA_SUBTITLE_ATAS + GANTUNG_ANGKA + SISA


# Bentuk huruf L, SAMA PERSIS dengan kedua belas widget topik ini
# (`web/components/widget/transformasi-geometri/matriks.ts`). Siswa yang
# menonton video lalu membuka halamannya harus bertemu benda yang sama.
L = [(1.0, 1.0), (6.0, 1.0), (6.0, 2.0), (2.0, 2.0), (2.0, 3.0), (1.0, 3.0)]
NAMA_SUDUT = {0: "A", 1: "B", 2: "C"}
Z = 0.02


def titik3(p, z=Z):
    return np.array([p[0], p[1], z])


def poligon(titik, warna, tebal=3.0, isian=0.0):
    """Poligon dari senarai pasangan koordinat. Impor Polygon ditunda ke
    pemanggil supaya berkas ini tidak menarik seluruh manimlib."""
    from gl import Polygon  # noqa: F401
    pts = [titik3(t) for t in titik]
    return Polygon(*pts).set_stroke(warna, tebal).set_fill(warna, isian)


def letak_peta(x0, x1, y0, y1):
    """Hitung `pusat` dan `tinggi` kamera supaya kotak dunia yang diminta MUAT
    di dalam lorong yang tidak dipakai HUD.

    KENAPA DIHITUNG, BUKAN DITEBAK
    Video 01 gagal dua kali berturut-turut karena angka ini dikira-kira: sekali
    bidangnya masuk jalur subtitle, sekali menindih panel rumus. Lorong yang
    tersedia lebih sempit daripada yang terasa: di atas layar y = 1,10 gambar
    hanya boleh memakai x < 2,10, dan di atas y = 2,40 sisi kirinya juga harus
    dihindari. Fungsi ini menyelesaikan ketiga batas sekaligus.

    Kotak yang dikirim harus SUDAH termasuk labelnya, bukan cuma bendanya.
    Label huruf kira-kira 0,4 satuan, jadi lebihkan segitu di tiap sisi yang
    berlabel.
    """
    # KOTAKNYA DIBULATKAN KELUAR LEBIH DULU, SAMA PERSIS SEPERTI `bidang_untuk`.
    #
    # Ini bug yang sungguh terjadi dan lolos sampai render: video 05 memakai
    # kotak pecahan (-1,8 sampai 1,8), `bidang_untuk` membulatkannya jadi
    # -2 sampai 2, sedangkan fungsi ini menghitung kamera dari angka aslinya.
    # Bidangnya jadi melebar 0,7 satuan lebih jauh daripada yang diperhitungkan
    # kamera, masuk jalur subtitle, dan qc menggagalkan rendernya.
    #
    # Video 01 sampai 04 lolos bukan karena benar, melainkan karena kotaknya
    # kebetulan sudah bulat. Kedua fungsi ini WAJIB memakai pembulatan yang
    # sama; kalau tidak, keduanya berbicara tentang bidang yang berbeda.
    x0, x1 = math.floor(x0), math.ceil(x1)
    y0, y1 = math.floor(y0), math.ceil(y1)



    lebar = float(x1 - x0)
    tinggi_isi = float(y1 - y0)
    if lebar <= 0 or tinggi_isi <= 0:
        raise ValueError(f"kotak dunia tidak masuk akal: x {x0}..{x1}, y {y0}..{y1}")

    muat_tegak = (AMAN_ATAS - AMAN_BAWAH) / tinggi_isi
    muat_datar = (AMAN_KANAN - AMAN_KIRI) / lebar
    skala = min(muat_tegak, muat_datar)

    tinggi_kamera = LAYAR_TINGGI / skala

    # Isi diletakkan di TENGAH lorong yang boleh dipakai, bukan mepet salah satu
    # tepinya, supaya sisa ruangnya terbagi rata dan tidak ada sisi yang nyaris
    # bersentuhan dengan HUD.
    tengah_layar_x = (AMAN_KIRI + AMAN_KANAN) / 2
    tengah_layar_y = (AMAN_BAWAH + AMAN_ATAS) / 2
    pusat_x = (x0 + x1) / 2 - tengah_layar_x / skala
    pusat_y = (y0 + y1) / 2 - tengah_layar_y / skala

    return (pusat_x, pusat_y, 0), tinggi_kamera


def bidang_untuk(x0, x1, y0, y1, langkah=1.0):
    """Bidang bernomor yang menutupi kotak dunia, dibulatkan ke petak penuh.

    Pembulatannya WAJIB sama dengan yang dipakai `letak_peta`. Kalau berbeda,
    kamera dan bidang berbicara tentang kotak yang berbeda, dan bidangnya bisa
    menjorok ke jalur subtitle tanpa terdeteksi sampai render. Itu sungguh
    terjadi pada video 05.
    """
    from gl import ilustrasi
    return ilustrasi.bidang_bernomor(
        (math.floor(x0), math.ceil(x1), langkah),
        (math.floor(y0), math.ceil(y1), langkah),
    )


def uji_letak():
    """Bukti mandiri bahwa `letak_peta` benar-benar menjaga ketiga batasnya.

    Dijalankan langsung: `python manim/scenes/transformasi_umum.py`.
    Alat mutu yang tidak pernah diuji adalah alat mutu yang belum tentu bekerja,
    dan proyek ini sudah pernah tertipu oleh pemeriksa yang salah lapor.
    """
    kasus = [
        (-1, 6, -3, 3),      # video 02: prapeta di atas, peta di bawah
        (-1, 7, -1, 7),      # video 03: rotasi, empat kuadran
        (0, 12, 0, 6),       # video 04: dilatasi faktor 2
        (-2, 3, -2, 3),      # video 05: persegi satuan dan kolomnya
        (-3, 4, -4, 4),      # video 06: dua urutan komposisi
        (-1.8, 1.8, -1.3, 1.8),   # video 05 apa adanya: kotak PECAHAN
        (0.2, 5.7, -2.4, 3.1),    # pecahan di keempat sisinya
    ]
    gagal = 0
    for x0, x1, y0, y1 in kasus:
        pusat, tinggi = letak_peta(x0, x1, y0, y1)
        s = LAYAR_TINGGI / tinggi

        # TEPI YANG DIUKUR ADALAH TEPI BIDANG YANG SUNGGUH DIBUAT, bukan tepi
        # kotak yang dikirim pemanggil.
        #
        # Ini kekeliruan yang SAMA untuk kedua kalinya di berkas ini. Yang
        # pertama: uji ini mengukur garis petak padahal yang keluar bingkai
        # adalah angka sumbunya. Yang kedua: uji ini mengukur kotak pecahan
        # yang dikirim padahal `bidang_untuk` membulatkannya keluar, sehingga
        # bidang yang sungguh tergambar lebih lebar. Keduanya membuat uji ini
        # melaporkan SEMUA LOLOS untuk kotak yang justru ditolak qc saat render.
        #
        # Pelajarannya: pemeriksa harus mengukur BENDA YANG SUNGGUH ADA di
        # layar, bukan angka yang dipakai untuk memintanya.
        bx0, bx1 = math.floor(x0), math.ceil(x1)
        by0, by1 = math.floor(y0), math.ceil(y1)
        kiri = (bx0 - pusat[0]) * s
        kanan = (bx1 - pusat[0]) * s
        bawah = (by0 - pusat[1]) * s
        atas = (by1 - pusat[1]) * s
        # Yang diperiksa TEPI ANGKANYA, bukan tepi garis petaknya.
        #
        # Versi pertama uji ini memeriksa garis petak saja, dan karena itu
        # melaporkan "SEMUA LOLOS" untuk kotak yang justru ditolak qc pada
        # render sungguhan: yang keluar bingkai adalah angka sumbunya. Alat
        # mutu yang memeriksa hal yang salah lebih berbahaya daripada tidak
        # ada alat sama sekali, sebab ia memberi rasa aman.
        for nama, nilai, batas, arah in (
            ("kanan", kanan + GANTUNG_ANGKA, ZONA_RUMUS_KIRI, "<="),
            ("kiri", kiri - GANTUNG_ANGKA, QC_KIRI, ">="),
            ("atas", atas + GANTUNG_ANGKA, ZONA_IDENTITAS_BAWAH, "<="),
            ("bawah", bawah - GANTUNG_ANGKA, ZONA_SUBTITLE_ATAS, ">="),
        ):
            ok = nilai <= batas + 1e-9 if arah == "<=" else nilai >= batas - 1e-9
            if not ok:
                gagal += 1
                print(f"GAGAL kotak {x0}..{x1}, {y0}..{y1}: tepi {nama} di {nilai:.2f}, "
                      f"batas {arah} {batas:.2f}")
    print("SEMUA LOLOS" if gagal == 0 else f"{gagal} GAGAL")
    return gagal


if __name__ == "__main__":
    import sys
    sys.exit(1 if uji_letak() else 0)
