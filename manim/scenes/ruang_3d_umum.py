"""Perkakas bersama untuk SEMUA video topik Ruang Tiga Dimensi (ManimGL).

Ditulis setelah video materi 01 selesai, supaya kelima video berikutnya tidak
mengulang kesalahan yang sudah dibayar mahal di sana. Semua yang ada di berkas
ini adalah hasil percobaan yang gagal lebih dulu, bukan rancangan di atas
kertas. Riwayat lengkapnya ada di `docs/tugas/laporan/MATRA-RUANG-TIGA-DIMENSI.md`.

Berkas ini milik sesi MATRA-RUANG-TIGA-DIMENSI (`manim/scenes/<topik>*`), bukan
perkakas bersama antar-topik. Kalau ada sesi lain yang membutuhkannya, MASTER
yang memindahkannya ke `manim/gl/`.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]

RUSUK = 6.0
S = RUSUK / 2

# Penamaan titik sudut SAMA PERSIS dengan widget di halaman dan dengan
# `alat/cek_ruang.py`: A di pojok dekat, B ke arah x, D ke arah y, E di atas A.
# Kubusnya digeser supaya berpusat pada sumbu tegak, sehingga diagonal alas dan
# diagonal tutup sama-sama melewati garis x = y = 0.
T = {
    "A": np.array([-S, -S, 0.0]), "B": np.array([S, -S, 0.0]),
    "C": np.array([S, S, 0.0]), "D": np.array([-S, S, 0.0]),
    "E": np.array([-S, -S, RUSUK]), "F": np.array([S, -S, RUSUK]),
    "G": np.array([S, S, RUSUK]), "H": np.array([-S, S, RUSUK]),
}
PASANGAN_RUSUK = [
    ("A", "B"), ("B", "C"), ("C", "D"), ("D", "A"),
    ("E", "F"), ("F", "G"), ("G", "H"), ("H", "E"),
    ("A", "E"), ("B", "F"), ("C", "G"), ("D", "H"),
]

# Kamera sengaja dipusatkan LEBIH RENDAH daripada tengah kubus, dan bingkainya
# dibuat lebih tinggi daripada yang pas. Keduanya untuk satu hal: memberi ruang
# kosong di kaki layar. Percobaan pertama memakai pusat di tengah kubus dan
# bingkai 12, dan akibatnya titik sudut A yang paling dekat kamera jatuh tepat
# di baris keterangan; di materi 04 dan 08 garis AG dan busur sudut bahkan
# menembus tulisannya. Keterangan sekarang tanpa alas (keputusan ARYA 2 Sep),
# jadi apa pun yang lewat di belakangnya terlihat menembus huruf.
PUSAT = np.array([0.0, 0.0, 2.6])
TINGGI_BINGKAI = 13.5
ACUAN_SKALA = 14.0   # jarak kamera acuan, lihat `label_hadap`


def durasi(topik: str) -> dict:
    return json.loads((AKAR / "audio" / topik / "durasi.json").read_text(encoding="utf-8"))["segmen"]


def kubus_pejal(warna=REDUP, opacity=0.92):
    """Kubus sebagai BENDA: prisma bercahaya, bukan rangka kawat.

    Video selalu dibuka dengan kubus pejal supaya siswa melihat benda dulu,
    baru bangun matematikanya (STANDAR-ILUSTRASI aturan 1, dan "konkret sebelum
    abstrak" di STANDAR-MENGAJAR).
    """
    return ilustrasi.balok(RUSUK, RUSUK, RUSUK, warna=warna).set_opacity(opacity)


def rangka_kubus(warna=TINTA, tebal=2.2):
    return VGroup(*[Line(T[a], T[b]) for a, b in PASANGAN_RUSUK]).set_stroke(warna, tebal)


def lantai():
    """Kisi lantai TANPA sumbu.

    Sumbu 3D bawaan `lantai_kisi` menembus kubus dan mudah tertukar dengan
    rusuk, jadi hanya kisinya yang dipakai.
    """
    return ilustrasi.lantai_kisi(ukuran=16.0, langkah=1.0)[0]


def label_hadap(frame, isi, titik, warna=TINTA, ukuran=30, acuan=ACUAN_SKALA):
    """Huruf yang SELALU menghadap kamera DAN selalu sebesar itu juga di layar.

    Dua cacat nyata yang diperbaikinya, keduanya ditemukan dengan melihat
    lembar kontak video materi 01:

    1. ORIENTASI. Huruf yang dibiarkan terbaring di lantai memipih sampai tidak
       terbaca saat kamera miring. Percobaan pertama memakai
       `apply_matrix(frame.get_inverse_camera_rotation_matrix())` dan hasilnya
       ada huruf yang TERCERMIN. Yang benar: miringkan sebesar phi, lalu putar
       sebesar theta. Pada pandangan atas (phi = 0) huruf kembali datar di
       bidang xy, dan itu memang yang diinginkan.

    2. UKURAN. Huruf berukuran dunia berarti huruf yang jauh mengecil. Pada
       pandangan atas, titik di lantai berjarak enam satuan lebih jauh daripada
       titik di atap, dan huruf lantai menyusut sampai tidak terbaca. Karena itu
       huruf diperbesar sebanding jaraknya ke kamera.
    """
    asli = teks(isi, ukuran, warna) if isinstance(isi, str) else isi.copy()

    def perbarui(m):
        b = asli.copy()
        b.rotate(frame.get_phi(), RIGHT)
        b.rotate(frame.get_theta(), OUT)
        jarak = np.linalg.norm(frame.get_implied_camera_location() - np.array(titik))
        b.scale(max(jarak, 1e-3) / acuan)
        b.move_to(titik)
        m.become(b)

    lab = asli.copy()
    perbarui(lab)
    lab.add_updater(perbarui)
    return lab


def huruf_sudut(frame, nama_ke_warna, dorong=0.68, naik=0.30):
    """Huruf titik sudut untuk beberapa titik sekaligus, didorong keluar kubus.

    Dorongannya MENDATAR saja, mengikuti arah dari sumbu tegak kubus ke titik
    itu, lalu ditambah sedikit ke atas. Sengaja tidak pernah ke bawah: percobaan
    pertama memakai arah tiga dimensi dari pusat kubus, dan huruf titik alas
    ikut terdorong TURUN sampai menindih baris keterangan di kaki layar.
    `qc.periksa_adegan` yang menangkapnya (irisan 0,13 kali 0,08 satuan layar),
    dan render materi 03 gagal seperti seharusnya, bukan lolos diam-diam.
    """
    hasil = {}
    for nama, warna in nama_ke_warna.items():
        arah = np.array([T[nama][0], T[nama][1], 0.0])
        arah = arah / max(np.linalg.norm(arah), 1e-6)
        letak = T[nama] + arah * dorong + np.array([0.0, 0.0, naik])
        hasil[nama] = label_hadap(frame, nama, letak, warna)
    return hasil


def penanda(scene, frame, titik, warna=SOROT, jari=0.24, acuan=ACUAN_SKALA):
    """Penanda titik yang berdenyut: LINGKARAN yang selalu menghadap kamera.

    Dua tugas: menunjuk titik penting, dan menjaga layar tetap hidup saat
    narator masih bicara sementara animasinya sudah selesai (tanpa satu pun
    updater, sisa babak jadi waktu mati, aturan 7 STANDAR-ILUSTRASI).

    BENTUKNYA DIPILIH SETELAH DIUJI, BUKAN DITEBAK. Percobaan pertama memakai
    lingkaran datar di bidang xy: sempurna dari atas, memipih jadi coretan
    lonjong dari samping. Percobaan kedua memakai bola, dan penandanya HILANG
    sama sekali. Adegan uji tersendiri mengadu ketiganya di dalam kubus tembus
    pandang: bola hilang, lingkaran datar terlihat tapi memipih, lingkaran
    menghadap kamera terlihat dan tetap bulat.

    Sebabnya: ManimGL menggambar Surface (bola, prisma) dan VMobject (garis,
    lingkaran) lewat jalur berbeda, dan sisi kubus yang tembus pandang TETAP
    menulis kedalaman, jadi Surface di belakangnya dibuang sementara VMobject
    tetap tergambar. Siapa pun yang menaruh benda `gl.ilustrasi` DI DALAM benda
    tembus pandang akan kena hal yang sama.
    """
    return always_redraw(
        lambda: lingkaran_hadap(frame, titik, warna,
                                jari + 0.05 * np.sin(3.0 * scene.time), acuan))


def lingkaran_hadap(frame, titik, warna=SOROT, jari=0.24, acuan=ACUAN_SKALA):
    """Satu lingkaran menghadap kamera, TANPA updater.

    Dipisahkan dari `penanda` supaya adegan yang titiknya sendiri bergerak
    (misalnya titik Q yang digeser di materi 03) bisa membungkusnya dengan
    `always_redraw` sendiri, tanpa updater bersarang di dalam updater.
    """
    c = Circle(radius=jari).set_stroke(warna, 4).set_fill(warna, 0.9)
    c.rotate(frame.get_phi(), RIGHT)
    c.rotate(frame.get_theta(), OUT)
    jarak = np.linalg.norm(frame.get_implied_camera_location() - np.array(titik))
    c.scale(max(jarak, 1e-3) / acuan)
    return c.move_to(titik)


def siku(a, sudut_di, b, warna=REDUP, ukuran=0.42, tebal=2.2):
    """Tanda siku-siku yang benar-benar berdiri di bidang segitiganya.

    Dibangun dari dua arah satuan menuju `a` dan `b`, jadi ia otomatis miring
    mengikuti bidang tempat sudut itu berada, dan tetap benar dari sudut kamera
    mana pun. Kalau kedua arahnya tidak tegak lurus, tanda ini TIDAK boleh
    dipakai; itu sebabnya pemakainya wajib memastikan sendiri kesikuannya.
    """
    u = np.array(a) - np.array(sudut_di)
    v = np.array(b) - np.array(sudut_di)
    u = u / max(np.linalg.norm(u), 1e-9) * ukuran
    v = v / max(np.linalg.norm(v), 1e-9) * ukuran
    p = np.array(sudut_di)
    return VGroup(Line(p + u, p + u + v), Line(p + v, p + u + v)).set_stroke(warna, tebal)


def busur(a, sudut_di, b, warna=SOROT, jari=0.75, tebal=3.0, n=24):
    """Busur sudut di dalam ruang, digambar sebagai garis patah rapat.

    `Arc` bawaan selalu lahir di bidang xy dan harus diputar dua kali untuk
    sampai ke bidang yang benar. Merangkai titik pada busurnya sendiri jauh
    lebih sulit salah, dan hasilnya sama halusnya pada 24 ruas.
    """
    p = np.array(sudut_di, dtype=float)
    u = np.array(a, dtype=float) - p
    v = np.array(b, dtype=float) - p
    u = u / max(np.linalg.norm(u), 1e-9)
    v = v / max(np.linalg.norm(v), 1e-9)
    sudut = float(np.arccos(np.clip(np.dot(u, v), -1.0, 1.0)))
    w = v - np.dot(v, u) * u
    w = w / max(np.linalg.norm(w), 1e-9)
    titik = [p + jari * (np.cos(t) * u + np.sin(t) * w)
             for t in np.linspace(0.0, sudut, n)]
    garis = VMobject().set_points_as_corners(titik)
    return garis.set_stroke(warna, tebal)


def kaki_pada_garis(p, a, b):
    """Kaki tegak lurus dari titik p ke garis ab. Rumus yang sama dengan `cek_ruang.py`."""
    p, a, b = np.array(p, dtype=float), np.array(a, dtype=float), np.array(b, dtype=float)
    d = b - a
    t = float(np.dot(p - a, d) / np.dot(d, d))
    return a + t * d


def isi_sisa(b, *animasi, minimum=2.0, maksimum=10.0, sisakan=1.0):
    """Pakai SISA waktu babak untuk satu gerakan panjang, bukan untuk diam.

    Durasi narasi tidak pernah bulat, dan menebaknya di kode berarti setiap kali
    naskah disunting sedikit, babaknya berubah jadi diam berdetik-detik di
    ujung. Gerakan kamera yang panjang justru dianjurkan (empat sampai sepuluh
    detik menurut ILMU-3B1B), jadi sisa itu diberikan kepadanya.
    """
    lama = float(np.clip(b.sisa - sisakan, minimum, maksimum))
    b.main(*animasi, run_time=lama)
