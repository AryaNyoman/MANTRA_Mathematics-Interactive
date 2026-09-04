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
import unicodedata
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]

RUSUK = 6.0

# KOORDINAT SAMA PERSIS DENGAN HALAMAN DAN DENGAN `alat/cek_ruang.py`.
# Titik A duduk di titik asal, jadi angka pada sumbu benar-benar bisa dibaca
# siswa: B ada di enam pada sumbu x, D di enam pada sumbu y, E di enam pada
# sumbu z. Versi pertama video memusatkan kubus di titik asal sehingga A jatuh
# di (-3, -3, 0); begitu sumbu diberi angka (revisi ARYA 2 Sep malam), angka
# minus itu justru akan membingungkan, dan tidak cocok dengan halaman.
T = {
    "A": np.array([0.0, 0.0, 0.0]), "B": np.array([RUSUK, 0.0, 0.0]),
    "C": np.array([RUSUK, RUSUK, 0.0]), "D": np.array([0.0, RUSUK, 0.0]),
    "E": np.array([0.0, 0.0, RUSUK]), "F": np.array([RUSUK, 0.0, RUSUK]),
    "G": np.array([RUSUK, RUSUK, RUSUK]), "H": np.array([0.0, RUSUK, RUSUK]),
}
PASANGAN_RUSUK = [
    ("A", "B"), ("B", "C"), ("C", "D"), ("D", "A"),
    ("E", "F"), ("F", "G"), ("G", "H"), ("H", "E"),
    ("A", "E"), ("B", "F"), ("C", "G"), ("D", "H"),
]

# Kamera dipusatkan LEBIH RENDAH daripada tengah kubus, dan bingkainya dibuat
# lebih tinggi daripada yang pas. Keduanya untuk memberi ruang kosong di kaki
# layar: percobaan sebelumnya membuat titik sudut A jatuh tepat di baris
# keterangan, dan garis diagonal menembus tulisannya. Keterangan tanpa alas
# (keputusan ARYA 2 Sep sore) membuat apa pun di belakangnya terlihat menembus.
PUSAT = np.array([RUSUK / 2, RUSUK / 2, 2.5])
TINGGI_BINGKAI = 15.0
ACUAN_SKALA = 15.5   # jarak kamera acuan, lihat `label_hadap`

SUMBU_UJUNG = RUSUK + 1.4   # sumbu menjulur sedikit melewati kubus


def durasi(topik: str) -> dict:
    return json.loads((AKAR / "audio" / topik / "durasi.json").read_text(encoding="utf-8"))["segmen"]


# Sumber cahaya ManimGL bawaannya di (-10, 10, 10), yaitu di BELAKANG kubus
# dilihat dari kamera kita (theta sekitar -40 berarti kamera duduk di sisi +x
# dan -y). Akibatnya kedua muka yang terlihat sama-sama kena cahaya serong dan
# jadi hampir sewarna: kubusnya terbaca sebagai balok gelap datar, bukan benda.
# Cahaya dipindah ke sisi KAMERA supaya muka depan terang, muka kanan sedang,
# dan atap paling terang. (Temuan MASTER 4 Sep, keenam video.)
# Titik cahayanya milik `gl.ilustrasi` sekarang, supaya topik lain memakai
# yang sama. Alasan letaknya ada di sana.
CAHAYA = ilustrasi.CAHAYA_BAKU


def pasang_cahaya(scene, di=None):
    """Pindahkan sumber cahaya ke sisi kamera. Panggil sebelum babak pertama."""
    scene.camera.light_source.move_to(CAHAYA if di is None else di)
    return scene.camera.light_source


def bayangan_kubus(cahaya=None, warna=TINTA, opacity=0.20):
    """Bayangan kubus topik ini di lantai. Perhitungannya di `gl.ilustrasi`."""
    return ilustrasi.bayangan_lantai([T[n] for n in "ABCDEFGH"],
                                     CAHAYA if cahaya is None else cahaya,
                                     warna=warna, opacity=opacity)


def kubus_pejal(warna=REDUP, opacity=0.92):
    """Kubus sebagai BENDA: prisma bercahaya, bukan rangka kawat.

    Video selalu dibuka dengan kubus pejal supaya siswa melihat benda dulu,
    baru bangun matematikanya (STANDAR-ILUSTRASI aturan 1, dan "konkret sebelum
    abstrak" di STANDAR-MENGAJAR).
    """
    # Tiga terang tiap muka diurus `ilustrasi.balok`, bersama topik lain.
    b = ilustrasi.balok(RUSUK, RUSUK, RUSUK, warna=warna).set_opacity(opacity)
    # `ilustrasi.balok` lahir berpusat di sumbu tegak dengan alas di z = 0.
    # Kubus kita berjalan dari titik A di titik asal, jadi digeser setengah rusuk.
    return b.shift(np.array([RUSUK / 2, RUSUK / 2, 0.0]))


def rangka_kubus(warna=TINTA, tebal=2.2):
    return VGroup(*[Line(T[a], T[b]) for a, b in PASANGAN_RUSUK]).set_stroke(warna, tebal)


def lantai():
    """Kisi lantai TANPA sumbu.

    Sumbu 3D bawaan `lantai_kisi` menembus kubus dan mudah tertukar dengan
    rusuk, jadi hanya kisinya yang dipakai.
    """
    # Digeser supaya kubus duduk di tengah kisinya, bukan di pojok.
    return ilustrasi.lantai_kisi(ukuran=18.0, langkah=1.0)[0].shift(
        np.array([RUSUK / 2, RUSUK / 2, 0.0]))


def label_hadap(frame, isi, titik, warna=TINTA, ukuran=30, acuan=ACUAN_SKALA,
                rumus_latex=False, kaca=None):
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
    # `rumus_latex=True` untuk nilai yang memuat lambang matematika, misalnya
    # akar. `teks()` meloloskan karakter khusus LaTeX supaya kalimat biasa aman,
    # jadi lambang akar di sana akan tercetak apa adanya, bukan sebagai akar.
    if not isinstance(isi, str):
        asli = isi.copy()
    elif rumus_latex:
        asli = rumus(isi, ukuran, warna)
    else:
        # Lewat `sinema.label`, bukan `teks`, supaya batas DUA KATA untuk label
        # di dalam gambar dijaga mesin (STANDAR-ILUSTRASI v2 butir 4). Render
        # gagal kalau dilanggar, jadi tidak bisa lolos karena saya lupa.
        asli = sinema.label(isi, ukuran, warna)

    def perbarui(m):
        b = asli.copy()
        b.rotate(frame.get_phi(), RIGHT)
        b.rotate(frame.get_theta(), OUT)
        jarak = np.linalg.norm(frame.get_implied_camera_location() - np.array(titik))
        b.scale(max(jarak, 1e-3) / acuan)
        b.move_to(titik)
        # `kaca` adalah pengendali kepekatan dari luar. Tanpa ini label yang
        # punya updater TIDAK BISA dipudarkan: `FadeOut` mengubah kepekatan,
        # lalu updater menggambar ulang dari bentuk aslinya pada frame yang
        # sama dan kepekatan itu hilang. Bug nyata, ketahuan saat sumbu z yang
        # sudah "dipudarkan" ternyata masih terlihat di materi 04.
        if kaca is not None:
            b.set_opacity(float(np.clip(kaca.get_value(), 0.0, 1.0)))
        m.become(b)

    lab = asli.copy()
    perbarui(lab)
    lab.add_updater(perbarui)
    return lab


def huruf_sudut(frame, sorot=None, dorong=0.92, naik=0.38):
    """KEDELAPAN huruf titik sudut, selalu, walau yang dibahas cuma sebagian.

    Revisi ARYA 2 Sep malam: "Wajib juga menuliskan semua titik pada bangun 3
    dimensi, walaupun dia tidak dipergunakan, tapi tetap diberikan warna yang
    berbeda karena dia yang akan disorot saat itu." Jadi `sorot` adalah peta
    nama ke warna untuk titik yang sedang dibahas; sisanya otomatis REDUP.

    Dorongannya MENDATAR saja, mengikuti arah dari sumbu tegak kubus ke titik
    itu, lalu ditambah sedikit ke atas. Sengaja tidak pernah ke bawah: percobaan
    pertama memakai arah tiga dimensi dari pusat kubus, dan huruf titik alas
    ikut terdorong TURUN sampai menindih baris keterangan di kaki layar.
    `qc.periksa_adegan` yang menangkapnya, dan render materi 03 gagal seperti
    seharusnya, bukan lolos diam-diam.
    """
    sorot = sorot or {}
    hasil = {}
    for nama in "ABCDEFGH":
        arah = np.array([T[nama][0] - PUSAT[0], T[nama][1] - PUSAT[1], 0.0])
        arah = arah / max(np.linalg.norm(arah), 1e-6)
        letak = T[nama] + arah * dorong + np.array([0.0, 0.0, naik])
        warna = sorot.get(nama, REDUP)
        ukuran = 30 if nama in sorot else 26
        hasil[nama] = label_hadap(frame, nama, letak, warna, ukuran)
    return hasil


def papan_koordinat(frame, sampai=None, tekan=None):
    """Sumbu x, y, z DENGAN ANGKA, dikembalikan dalam dua bagian terpisah.

    Revisi ARYA 2 Sep malam: "Wajib memberikan satuan angka pada titik koordinat
    X Y nya, jangan dibiarkan polos, siswa sulit melihatnya" dan "bila perlu
    buatkan sumbu Z beserta satuan angkanya jika suatu saat membicarakan masalah
    tinggi". Lalu disempurnakan malam itu juga: sumbu z ditampilkan di awal saja
    untuk memperkenalkan arah tinggi, lalu dihilangkan, dan dimunculkan lagi
    HANYA saat tinggi benar-benar dipakai menghitung.

    Karena itu kembaliannya dua bagian:
        datar  = sumbu x dan y beserta angkanya, menetap sepanjang video
        tinggi = sumbu z beserta angkanya, dimunculkan dan dihilangkan sesuai
                 kebutuhan babak

    Sumbunya sengaja digambar tipis dan redup, berimpit dengan rusuk AB, AD, dan
    AE. Menggesernya keluar kubus akan lebih rapi dipandang tetapi salah: sumbu
    harus lewat titik asal, dan titik asal adalah A.
    """
    ujung = SUMBU_UJUNG if sampai is None else sampai
    tekan = tekan or {}

    def satu_sumbu(arah, keluar, nama, langkah=3, jauh=0.95, kaca=None):
        gambar = VGroup(Arrow(ORIGIN, arah * ujung, buff=0, thickness=2.4).set_color(REDUP))
        label = []
        # Garis kecil penanda tetap tiap SATU satuan supaya skalanya terasa,
        # tetapi ANGKANYA hanya tiap `langkah`. Versi sebelumnya memberi angka
        # pada tiap satuan di sumbu x dan y; ketiga sumbu bertemu di titik A,
        # jadi angka-angkanya berdesakan di pojok yang sama sampai sulit dibaca.
        # (Temuan MASTER 4 Sep: cukup 0, 3, dan 6 di tiap sumbu.)
        for k in range(1, int(RUSUK) + 1):
            titik = arah * k
            ditekan = k in tekan.get(nama, ())
            gambar.add(Line(titik, titik + keluar * 0.26).set_stroke(
                SOROT if ditekan else REDUP, 3 if ditekan else 2))
            if k % langkah and not ditekan:
                continue
            # Angkanya didorong jauh keluar (0,95) dan berukuran 26. Percobaan
            # pertama memakai 0,52 dan ukuran 22: angkanya berdesakan dengan
            # huruf titik sudut, dan terlalu kecil untuk dibaca di 480p.
            label.append(label_hadap(
                frame, str(k), titik + keluar * jauh,
                SOROT if ditekan else REDUP, 34 if ditekan else 26, kaca=kaca))
        # Nama sumbu diangkat dari bidang alas supaya tidak berdesakan dengan
        # huruf titik sudut B dan D yang juga ada di dekat ujung sumbu.
        label.append(label_hadap(
            frame, nama, arah * (ujung + 0.55) + np.array([0.0, 0.0, 0.62]), REDUP, 28,
            kaca=kaca))
        return gambar, label

    gx, lx = satu_sumbu(np.array([1.0, 0.0, 0.0]), np.array([0.0, -1.0, 0.0]), "x")
    gy, ly = satu_sumbu(np.array([0.0, 1.0, 0.0]), np.array([-1.0, 0.0, 0.0]), "y")
    # Angka sumbu z dikeluarkan ke arah yang BERBEDA dari sumbu y. Percobaan
    # pertama memakai (-0,7, -0,7): benar secara ruang, tetapi di layar kolom
    # angkanya bertumpuk dengan kolom sumbu y sampai tidak terbaca.
    keluar_z = np.array([-0.45, -0.9, 0.0])
    # Sumbu z sengaja hanya diberi angka setiap TIGA satuan, dan angkanya
    # didorong lebih jauh. Ketiga sumbu bertemu di titik A, jadi angka-angka
    # kecil dari ketiganya berkumpul di pojok yang sama sampai tidak terbaca.
    # Yang benar-benar dibutuhkan dari sumbu z cuma rasa skala dan angka 6 di
    # puncaknya, bukan enam angka berjejer.
    kaca_z = ValueTracker(1.0)
    gz, lz = satu_sumbu(np.array([0.0, 0.0, 1.0]), keluar_z / np.linalg.norm(keluar_z),
                        "z", langkah=3, jauh=1.35, kaca=kaca_z)

    # Angka nol didorong lebih jauh daripada huruf titik sudut. Huruf A juga
    # dilempar ke arah diagonal yang sama sejauh 0,92, jadi pada jarak 0,62
    # keduanya berdiri persis satu di atas yang lain dan terbaca "A0".
    nol = label_hadap(frame, "0", np.array([-1.15, -1.15, 0.0]), REDUP, 26)
    return {
        "datar": [gx, gy, *lx, *ly, nol],
        "tinggi": [gz, *lz],
        "garis_z": gz,
        "kaca_z": kaca_z,
    }


def sumbu_z_muncul(b, papan, lama=0.8):
    """Munculkan sumbu z dengan halus, garis dan angkanya sekaligus."""
    papan["garis_z"].set_opacity(0)
    b.main(papan["garis_z"].animate.set_opacity(1),
           papan["kaca_z"].animate.set_value(1.0), run_time=lama)


def sumbu_z_pamit(b, papan, lama=0.8):
    """Hilangkan sumbu z dengan halus.

    Angkanya WAJIB lewat `kaca_z`, bukan `FadeOut`: label yang punya updater
    menggambar ulang dirinya tiap frame, jadi kepekatan yang diubah `FadeOut`
    langsung ditimpa dan sumbunya tidak pernah benar-benar hilang.
    """
    b.main(papan["garis_z"].animate.set_opacity(0),
           papan["kaca_z"].animate.set_value(0.0), run_time=lama)


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


LAJU_LATAR = 1.6   # derajat per detik: geseran latar, bukan gerakan yang mencuri perhatian


def tunggu_bergeser(b, frame, jam, awalan: str, laju: float = LAJU_LATAR):
    """Tunggu sampai kalimat itu mulai, TETAPI kameranya bergeser pelan selama
    menunggu, bukan layar berhenti.

    `b.tunggu_sampai` diam betul-betul. Waktu kejadian mulai diikat ke jam
    kalimat (4 Sep), diam itu justru MEMBURUKKAN keadaan: materi 01 diam
    terpanjangnya naik dari 4,2 detik jadi 9,0 detik, sebab geseran kamera yang
    dulu mengisi ekor babak diganti tunggu mati. Angkanya diukur dari video
    jadi, bukan diperkirakan.

    Aturan MASTER 4 Sep: geseran kamera pelan sendiri bukan dosa, yang salah
    adalah menjadikannya SATU-SATUNYA isi 5 sampai 10 detik. Jadi kamera boleh
    jalan sebagai latar, asal tiap kalimat tetap punya kejadian pada benda yang
    disebutnya. Lajunya sengaja kecil (1,6 derajat per detik): cukup untuk
    memberi rasa ruang, tidak cukup untuk mencuri perhatian dari yang dibahas.
    """
    sisa = saat_kalimat(jam, awalan) - b.scene.time
    if sisa > 0.15:
        b.main(kamera.putar_pelan(frame, laju * sisa), run_time=sisa)


def isi_sisa(b, *animasi, minimum=2.0, maksimum=10.0, sisakan=1.0):
    """Pakai SISA waktu babak untuk satu gerakan panjang, bukan untuk diam.

    Durasi narasi tidak pernah bulat, dan menebaknya di kode berarti setiap kali
    naskah disunting sedikit, babaknya berubah jadi diam berdetik-detik di
    ujung. Gerakan kamera yang panjang justru dianjurkan (empat sampai sepuluh
    detik menurut ILMU-3B1B), jadi sisa itu diberikan kepadanya.
    """
    tersedia = b.sisa - sisakan
    if tersedia < minimum:
        # TIDAK cukup waktu untuk gerakan yang diminta. Memaksakan `minimum`
        # membuat adegan melewati batas babak (materi 03 kelebihan 1,39 detik,
        # materi 04 kelebihan 0,38 detik, keduanya ditolak gerbang waktu 4 Sep),
        # dan memampatkannya ke waktu yang tersisa membuat kamera menyentak,
        # sebab `kamera.sudut` selalu sampai ke tujuan dalam `run_time` berapa
        # pun. Jadi yang dipakai geseran latar berlaju TETAP: lamanya boleh
        # sependek apa pun tanpa menyentak, dan layarnya tetap hidup.
        # Diukur: tanpa ini materi 04 punya 2,8 detik beku antara "tidak
        # menempel pada sisi mana pun" dan "Alasnya AC tadi".
        if tersedia > 0.4:
            b.main(kamera.putar_pelan(b.scene.frame, LAJU_LATAR * tersedia),
                   run_time=tersedia)
        return
    b.main(*animasi, run_time=float(np.clip(tersedia, minimum, maksimum)))


def saat_kalimat(jam, awalan: str) -> float:
    """Detik saat kalimat berawalan `awalan` MULAI diucapkan narator.

    Dipakai dengan `b.tunggu_sampai(...)` supaya kejadian di layar jatuh tepat
    pada kalimat yang menyebut bendanya, bukan pada jarak tetap dari awal
    babak. Syarat MASTER 4 Sep, dan alasannya benar: denyut berkala yang tidak
    peduli apa yang sedang dikatakan adalah "napas" yang dilarang STANDAR butir
    3, dan cuma mengejar angka alat ukur. Ujinya sederhana: untuk tiap kejadian
    harus bisa disebut kalimat narasi mana yang memicunya.

    GAGAL kalau kalimatnya tidak ada. `sinema.mulai` mengembalikan None, dan
    `tunggu_sampai(None)` diam-diam tidak menunggu apa pun, jadi satu salah
    ketik akan mengembalikan adegannya ke perilaku lama TANPA memberi tahu.

    Tanda di atas huruf diabaikan saat mencocokkan, jadi awalan boleh ditulis
    "AC menghubungkan" walaupun subtitlenya berbunyi "A̅C̅ menghubungkan".
    """
    def polos(t: str) -> str:
        return "".join(c for c in unicodedata.normalize("NFD", t)
                       if not unicodedata.combining(c)).casefold()

    cari = polos(awalan)
    for detik, kalimat in jam:
        if polos(kalimat).startswith(cari):
            return detik
    tersedia = "\n  ".join(k for _, k in jam[:40])
    raise KeyError(
        f"tidak ada kalimat subtitle yang diawali {awalan!r}.\n"
        f"Ingat urutannya: buat_narasi.py, buat_subtitle.py, BARU render.\n"
        f"Kalimat yang ada:\n  {tersedia}")


def sepanjang3(a, b, t):
    """Titik pada ruas ab, pada pecahan t dari a ke b.

    Dipakai untuk menempelkan label pada ruas yang sedang dibahas. Sengaja tidak
    selalu di tengah: dua ruas yang bersilangan akan bertabrakan labelnya kalau
    keduanya diberi label tepat di tengah.
    """
    a, b = np.array(a, dtype=float), np.array(b, dtype=float)
    return a + (b - a) * t
