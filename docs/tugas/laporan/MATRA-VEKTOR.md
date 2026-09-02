# Laporan MATRA-VEKTOR
Terakhir: 2 September 2026, 18.00

> **Bagian di bawah "Catatan lama" SUDAH TIDAK BERLAKU.** Di situ video 1 dan
> video 2 dinyatakan selesai. ARYA menonton keduanya dan MENOLAKNYA. Keduanya
> dibuat ulang; hasil yang berlaku adalah bagian ini.

## Kenapa dua video pertama ditolak, dan apa akar masalahnya

Penilaian ARYA: gambar 3D-nya pecah, panahnya "sembarang tidak akurat", tidak
ada koordinat tertulis, perahunya tidak stabil. Kesimpulannya: "mending 2D aja
kalau gitu, yang penting pesan ke siswanya tersampaikan".

Akar masalahnya bukan 3D-nya, melainkan **kamera yang dimiringkan 14 sampai 26
derajat**. Kemiringan itu dipakai supaya panah yang segaris tidak saling
menutupi. Akibatnya perspektif memendekkan satu arah lebih banyak daripada arah
lain, sehingga **segitiga 3-4-5 tidak lagi terlihat seperti 3-4-5**. Untuk
pelajaran vektor itu fatal: gambarnya membantah hitungannya. Ditambah tidak ada
satu pun angka di sumbunya, jadi siswa tidak bisa memeriksa "3 ke kanan, 1 ke
atas".

Ironisnya widget web topik ini sudah punya `jendelaSeimbang` yang khusus dibuat
untuk memaksa skala x dan y sama, dengan alasan yang sama persis. Aturan itu
saya buang begitu pindah ke video.

Rancangan penggantinya, disetujui ARYA:
`docs/superpowers/specs/2026-09-02-video-vektor-bidang-bernomor.md`. Prinsipnya:
matematika di bidang datar bernomor, kamera tegak lurus, 3D hanya di babak
pembuka. Usul mengubah aturan 1 STANDAR-ILUSTRASI-VIDEO untuk SEMUA topik sudah
ditulis di PROGRESS.md; Grafik Fungsi dan Statistika berisiko mengulang
kesalahan yang sama.

## Yang ditambahkan ke perkakas bersama

`bidang_bernomor()` di AKHIR `manim/gl/ilustrasi.py`: bidang koordinat berangka
dengan skala x dan y terkunci sama. Empat sesi lain langsung bisa memakainya.

**Jebakan yang sudah ditambal di dalamnya, dan MASTER perlu tahu:** `NumberPlane`
ManimGL menempatkan dirinya di TENGAH LAYAR, bukan pada titik asal koordinatnya.
Untuk jangkauan tidak simetris seperti x dari -4 sampai 8, garis "0" tidak jatuh
di titik (0, 0) adegan, dan SELURUH panah meleset dari petaknya. Ditambal dengan
`bidang.shift(-bidang.c2p(0, 0))`. Uji pertama saya lolos justru karena memakai
jangkauan simetris (-6, 6), yang persis menyembunyikan bug ini.

## Video 1 Materi 01 SELESAI (versi baru): `media/uji-480p/vektor1-perahu.mp4`

2,82 MB, 118,35 detik, 11 segmen. Beda panjang narasi dan gambar 0,27 detik.

Isinya: perahu di sungai (3D, dekat) sebagai pengait, lalu satu gerakan turun ke
pandangan tegak lurus dan bidang berangka muncul. Dayung (0, 3) biru, arus
(4, 0) merah, perpindahan sebenarnya (4, 3) ungu, dan ujungnya diberi koordinat
tertulis. Perahunya berlayar menyusuri panah ungu sementara angka panjangnya
hidup di pojok. Lalu arah dayung diputar: 7, lalu 1, lalu kembali 5, dengan
angka yang sama persis. Angkanya sejalan dengan halaman Materi 01 (arus 4,
hasilnya 5) dan sudah lolos `alat/cek_vektor.py`.

**Panah segaris tanpa memiringkan kamera:** panah arus digeser tegak lurus 0,22
satuan, tetap, di semua sudut. Pada panah sepanjang 3 sampai 4 satuan itu di
bawah 6 persen. Tidak mengubah arah yang terbaca, dan **tidak mengubah satu pun
angka**. Ini pengganti kemiringan kamera yang jadi sebab penolakan.

### Tiga cacat ditangkap gerbang video, semuanya diperbaiki

| Cacat | Perbaikannya |
|---|---|
| Angka sumbu "-2" jatuh persis di jalur keterangan layar; keduanya bertindih di dua baris lembar kontak. | Batas bawah bidang dinaikkan ke -1. Baris itu memang tidak pernah dipakai panah mana pun. |
| Bidang kelewat longgar: seperempatnya tidak tersentuh, jadi panahnya terlihat kecil. | Jangkauan dipangkas ke daerah yang benar-benar dipakai, tinggi bingkai 9,6 ke 7,6. |
| Label "dayung" menempel di angka sumbu, dan perahu menutupi ujung panah. | Label digeser 1,3 satuan tegak lurus; perahu dikecilkan 1,4 ke 0,9. |

### Daftar periksa STANDAR-ILUSTRASI-VIDEO

- [ya] Benda nyata dari `gl.ilustrasi` (`perahu`, `air_hidup`, `tanah`), tidak ada benda berupa titik.
- [ya] Latar hidup: air beriak lewat updater di babak pembuka.
- [ya] Kamera satu gerakan panjang dari miring dekat ke tegak lurus, lalu TIDAK PERNAH miring lagi.
- [ya] Panah dan label di dunia, rumus di HUD. Layar bersih hanya di babak penutup (diizinkan aturan 4).
- [ya] Satu warna satu makna: biru dayung, merah arus, ungu perpindahan sebenarnya. Tidak ada kode heksa.
- [ya] `teks()` untuk kata, `rumus()` untuk angka.
- [ya] Semua animasi di dalam `sinema.babak`; jeda 1,6 detik setelah pertanyaan.
- [ya] `cek_kode` bersih; `periksa_adegan` di sebelas babak; lembar kontak 30 frame dibuka dan dinilai satu per satu; `gabung_audio --uji` jalan.
- [ya] Narasi pembuka mengumumkan materinya ("Materi satu, angka saja tidak cukup").
- [ya] Penanda `*kata*` untuk penebalan subtitle, satu sampai dua per segmen.
- [sisa, kecil] Pada arah dayung 180 derajat label "dayung" jatuh sedikit di luar petak. Terbaca, tidak menutupi apa pun.

## SEMUA ENAM VIDEO VEKTOR SELESAI (2 September, malam)

Berkas tinjauan berakhiran `-bersubtitle` di `media/uji-480p/`:

| Materi | Berkas | Ukuran | Panjang |
|---|---|---|---|
| 01 Angka saja tidak cukup | `vektor1-perahu-bersubtitle.mp4` | 3,35 MB | 2:19 |
| 03 Memecah panah jadi dua langkah | `vektor3-komponen-bersubtitle.mp4` | 2,45 MB | 2:16 |
| 04 Panjang panah itu Pythagoras | `vektor4-panjang-bersubtitle.mp4` | 2,54 MB | 2:24 |
| 06 Menjumlah itu menyambung perjalanan | `vektor6-sambung-bersubtitle.mp4` | 2,55 MB | 2:13 |
| 08 Mengurangi itu menambah lawannya | `vektor8-selisih-bersubtitle.mp4` | 2,79 MB | 2:32 |
| 09 Dikali angka: panjang berubah, arah tetap | `vektor9-kali-skalar-bersubtitle.mp4` | 2,79 MB | 2:37 |

Keenamnya memakai aturan yang sama: 3D hanya di babak pembuka, kamera tegak
lurus sesudahnya dan tidak pernah miring lagi, bidang koordinat berangka,
keterangan pita bawah dihapus seluruhnya (pita itu milik subtitle), identitas
cerita plus satuannya di pojok kiri atas, dan asal rumus diperlihatkan sebelum
rumusnya ditulis.

### Pengait dunia nyata dipilih beda-beda, dan itu disengaja

Perahu (01), mobil yang tidak bisa menembus gedung (03), dua tiang berkabel
(04), orang berjalan dua kali (06), dua orang di lapangan (08), bola ditendang
(09). Enam benda berbeda supaya pembukanya tidak terasa berulang, dan tiap
benda dipilih karena kendalanya memang melahirkan materinya. Mobil yang harus
lewat jalan mendatar dan tegak, misalnya, ADALAH gagasan komponen.

### Yang dijaga supaya tidak jadi pengulangan

- Video 01 sudah menguraikan akar(4^2 + 3^2) = 5. Karena itu video Materi 04
  memakai angka lain: (4 2) yang panjangnya akar 20, tidak bulat, supaya siswa
  tidak menyimpulkan panjang vektor selalu bilangan bulat. Angka 5 tetap muncul
  lewat (-3 4), yang sekaligus memperlihatkan minus hilang saat dikuadratkan.
- Aturan "ujung dikurangi pangkal" ada di halaman Materi 03 DAN Materi 08.
  Diuraikan tuntas sekali saja, di video Materi 08.

### Cacat yang ditangkap gerbang video pada putaran ini

| Video | Cacat | Perbaikannya |
|---|---|---|
| 08 | Label -b tercetak menimpa angka "-1" sumbu; label b jatuh di sumbu tegak; label b-a berdesakan dengan blok hitungan. | Ketiganya digeser; koordinat b-a pindah ke panel kanan. |
| 03 | Mobilnya MERAH, warna yang sama dengan panah komponen tegak. Satu warna dua makna. | Mobil dijadikan REDUP. Benda cerita netral, matematika yang berwarna. |
| 03 | Panah pembanding (-3 4) memakai biru, warna yang sudah berarti "komponen mendatar". | Dijadikan hitam, sama seperti panah pembanding (4 3). |
| 03 | Keterangan "letak" dan "perpindahan" berukuran 20, tinggal sekitar sepuluh piksel di 480p. | Dinaikkan ke 23. |
| 09 | Render GAGAL: `could not broadcast input array from shape (23,3) into shape (81,3)`. | Angka pengali yang hidup ikut dianimasikan kepekatannya. `set_value` membangun ulang angkanya di tengah animasi sehingga jumlah titiknya berubah. Updater-nya dipasang SESUDAH animasi kemunculan. |

### Angka diperiksa ulang, bukan dipercaya

Sepuluh angka yang diklaim keenam video dihitung ulang dengan Python:
panjang (4 2), (-3 4), (3 4), (4 3), (-5 0), (2 1), 3(2 1), -2(2 1), sudut
(4 2), dan selisih (3 1) - (1 2). Semuanya cocok. Satu sempat dilaporkan salah,
tetapi yang keliru alat ukurnya: sudut (4 2) adalah 26,5651 derajat, yang
dibulatkan satu desimal menjadi 26,6 seperti di video, sedangkan pembandingnya
membulatkan ke dua desimal.

### Enam materi yang BELUM punya video
02 Panah yang boleh dipindah, 05 Arah tanpa panjang, 07 Dua yang bekerja
bersamaan, 10 Vektor di dunia nyata, 11 Seberapa searah, 12 Bayangan satu panah
pada panah lain. Materi 12 (proyeksi) yang paling butuh animasi.

---

## Revisi putaran kedua (2 Sep malam): empat catatan ARYA, semuanya dipenuhi

ARYA menonton kedua video dan memberi empat catatan. Berkas tinjauan yang
berlaku sekarang **berakhiran `-bersubtitle`**:

| Berkas | Ukuran | Panjang |
|---|---|---|
| `media/uji-480p/vektor1-perahu-bersubtitle.mp4` | 3,35 MB | 138,7 detik |
| `media/uji-480p/vektor6-sambung-bersubtitle.mp4` | 2,55 MB | 132,7 detik |

### 1. Transisi 3D ke 2D: sungainya yang salah tempat, bukan perahunya

Keluhan ARYA: "kapalnya tiba-tiba teleport ke atas".

Sebabnya dua lapis. Yang terlihat: selama 3D perahu dipaku di tengah sungai
(`y = -1,5`), lalu berpindah ke titik asal (`y = 0`) begitu kamera sampai di
atas. Loncat 1,5 petak dalam satu frame.

Yang tidak terlihat, dan lebih parah: **sungai membentang y = -1,5 sampai +1,5
sementara perahu diminta menyeberang dari y = 0 ke y = 3**, jadi perahunya
mendarat 1,5 petak di DARAT. Gambarnya membantah ceritanya, dan tidak ada yang
melaporkannya karena tidak ada angka di layar untuk memeriksanya.

Perbaikannya bukan menambal loncatan itu, tetapi memindahkan sungainya:
sekarang sungai menempati **petak 0 sampai 3 persis**. Perahu berangkat dari
(0, 0) di tepi dekat dan posisinya selalu dibaca dari dua tracker yang sama,
sebelum maupun sesudah kamera turun. Loncatannya hilang dengan sendirinya, dan
lebar "3 km" jadi bisa dihitung siswa dari petaknya.

Airnya tidak dihilangkan sepenuhnya: setelah kamera tegak lurus ia jadi pita
biru semu (isian 0,09) yang tetap menempati petak 0 sampai 3.

### 2. Subtitle: masalahnya cara ARYA menerimanya, bukan isinya

Keluhan: "anda tidak mengisi subtitle sepanjang menjelaskan".

Subtitlenya sebenarnya sudah lengkap. Yang tidak ada adalah CARA ARYA
melihatnya: ia menonton `.mp4` langsung, dan `.mp4` tidak membawa berkas
`.vtt` terpisah. Alat baru `manim/bakar_subtitle.py` membakar subtitle ke satu
salinan khusus tinjauan berakhiran `-bersubtitle`. Versi yang TAYANG tetap
bersih dengan `.vtt` terpisah, sesuai keputusan ARYA 31 Agustus, dan berkas
`-bersubtitle` tidak pernah disalin ke `web/public/anim/`. `gabung_audio.py`
milik MASTER tidak disentuh.

**Tidak menutupi matematikanya, dan itu DIUKUR, bukan dikira.** Salinan
bersubtitle dibandingkan piksel demi piksel dengan salinan polos di 28 titik
sampel per video. Jarak terkecil antara huruf subtitle dan tinta gambar: 33
piksel di Materi 01, 14 piksel di Materi 06. Nol tumpang-tindih.

Ukuran dan posisinya juga bukan selera. Percobaan pertama (FontSize 19,
MarginV 14) membuat subtitle DUA BARIS menyentuh angka "-1" sumbu. Sekarang
FontSize 15, MarginV 3.

### 3. Keterangan pita bawah dihapus, identitas cerita pindah ke pojok

Semua `sinema.keterangan` dibuang dari kedua adegan. Isinya memang mengulang
ucapan narator, dan aturan proyek melarang itu. Pita bawah sekarang milik
subtitle sendirian.

Gantinya satu blok tetap di pojok kiri atas. Materi 01: `sungai = 3 km` dan
`1 petak = 1 km`. Materi 06: `1 petak = 1 langkah`.

Catatan atas usul ARYA: ia mengusulkan "sungai = 3 satuan". Saya pakai "km"
karena naratornya mengucapkan "tiga kilometer", dan "satuan" akan membantah
suaranya. Masalah yang ARYA tunjuk (satuannya hilang saat pindah ke 2D)
dijawab baris kedua, `1 petak = 1 km`.

### 4. Gaya 3B1B: asal rumus diperlihatkan lebih dulu

**Materi 01, babak `pythagoras` baru.** Panah arus dirapatkan ke ujung panah
dayung (geserannya dinolkan sementara) supaya segitiganya tertutup rapat,
tanda siku-siku muncul, lalu uraiannya ditulis tiga baris bertumpuk:
akar(4^2 + 3^2), lalu akar(16 + 9) = akar(25), lalu 5.

**Materi 06, babak `komponen` baru.** Garis putus-putus dijatuhkan dari tiap
ujung panah ke sumbu mendatar, ruas 0 sampai 3 diwarnai biru dan 3 sampai 4
merah, angkanya muncul di bawah sumbu, BARU ditulis 3 + 1 = 4. Babak `hitung`
mengulang hal yang sama di sumbu tegak.

### Cacat yang tertangkap gerbang video pada putaran ini

| Cacat | Ketahuan dari | Perbaikannya |
|---|---|---|
| Uraian Pythagoras melar keluar layar (`kiri -9.15 < -6.82`). | `qc.periksa_adegan` MENGGAGALKAN rendernya. | `Transform` antar rumus dengan jumlah lambang berbeda meninggalkan lambang sisa di posisi liar. Diganti tiga baris bertumpuk. Kebetulan lebih baik untuk diajarkan: langkah sebelumnya tetap terlihat. |
| Pita sungai jadi biru PEKAT, menelan petak, angka sumbu, dan panah birunya sendiri. | Lembar kontak. | `set_opacity(1)` menimpa kepekatan isian yang sudah disetel. Diatur lewat `set_fill(AKSEN2, 0.09)`. |
| Panah berkedip KUNING saat disorot. | Lembar kontak. | `Indicate` bawaan ManimGL memakai `#FFFF00`, di luar palet MATRA, dan terbaca seperti kerusakan gambar. Diganti warna palet. `scale_factor` juga dijadikan 1.0: membesarkan panah walau sekejap membuat ujungnya melewati petaknya sendiri, dan di bidang bernomor itu berarti gambar membantah angkanya. |
| Subtitle dua baris menyentuh angka "-1" sumbu. | Frame salinan bersubtitle. | Ukuran dan margin dikecilkan, lalu diukur ulang di 28 titik sampel. |

### Yang sempat saya kira cacat, ternyata bukan

Ujung video 6 terlihat hitam di lembar kontak. Saya tarik frame terakhirnya
dan ternyata kalimat penutup di latar terang; yang hitam itu slot kosong
lembar kontaknya sendiri. Dilaporkan supaya tidak jadi "perbaikan" yang
mengejar hantu.

### Sisa kecil yang saya biarkan, dan alasannya

1. Materi 01, saat dayung diputar 180 derajat, label "dayung" jatuh sedikit di
   luar petak. Terbaca, tidak menutupi apa pun.
2. Materi 06, dilihat tegak lurus dari atas orangnya jadi bentuk gelap kecil
   di ujung panah. Ia bergerak mengikuti panah jadi perannya jelas, tapi bukan
   gambar orang yang jelas. Kalau ARYA mau penanda yang lebih tegas, tinggal
   diganti.

### Catatan lingkungan untuk MASTER

Render sesi ini beberapa kali melambat drastis karena sesi MATRA-RUANG-3D
menjalankan empat render ManimGL bersamaan di mesin yang sama
(`ruang_3d_06.py`, `ruang_3d_09.py`, masing-masing dengan ffmpeg sendiri).
Tidak ada proses sesi lain yang saya hentikan. Render paralel memang aman
secara hasil, hanya lambat. Kalau dua sesi sering berbenturan, mungkin perlu
aturan giliran render.

---

# Putaran pertama (sebelum revisi malam)

## Video 2 Materi 06 SELESAI (versi baru): `media/uji-480p/vektor6-sambung.mp4`

2,18 MB, 118,20 detik, 11 segmen. Beda panjang narasi dan gambar 0,68 detik
(gambarnya lebih panjang, jadi kalimat penutup sempat terbaca dalam diam).
Tanpa suara latar, dan itu pilihan: satu-satunya berkas yang tersedia `air.ogg`,
dan suara air jelas tidak cocok untuk orang berjalan di lapangan.

Isinya: seseorang berdiri di lapangan berpetak (3D, dekat), lalu kamera turun ke
pandangan tegak lurus dan bidang berangka muncul. Orangnya BERJALAN dua kali dan
panah biru lalu merah tumbuh mengikuti langkahnya, jadi aturan "ujung ke pangkal"
masuk akal: siswa melihat perjalanan kedua memang berangkat dari tempat yang
pertama berhenti. Ada babak khusus yang menggambar susunan SALAH (kedua pangkal
ditempelkan) dengan panah hitam, sementara susunan yang benar diredupkan.
Ditutup jebakan panjangnya: 3,16 tambah 2,24 sama dengan 5,4, padahal
resultannya tepat 5. Angkanya sama persis dengan contoh di halaman Materi 06.

### Dua cacat ditangkap gerbang video, keduanya diperbaiki

| Cacat | Perbaikannya |
|---|---|
| **Gambar membantah narasinya.** Di babak "susunan keliru" gambar sudah kembali ke susunan yang BENAR setelah 5 detik, padahal narator menjelaskan susunan yang salah selama 9 detik. Sebabnya `sinema.babak` menambal sisa waktu SESUDAH blok selesai, jadi pemulihan yang ditaruh di dalam blok terjadi kelewat awal. | Pemulihannya dipindah ke awal babak berikutnya, dan keterangannya dimajukan ke depan blok supaya cocok sejak detik pertama. Sekarang tiga frame lembar kontak menampilkan susunan salah, bukan satu. |
| Babak pembuka kelewat kosong: cuma garis petak samar dan satu orang di latar polos, selama 14 detik. | Ditambah alas `ilustrasi.tanah` di bawah petaknya, jadi terbaca sebagai lapangan sungguhan. |

### Daftar periksa STANDAR-ILUSTRASI-VIDEO

- [ya] Benda nyata dari `gl.ilustrasi` (`orang`, `lantai_kisi`, `tanah`), tidak ada benda berupa titik.
- [ya] Kamera satu gerakan panjang dari miring dekat ke tegak lurus, lalu TIDAK PERNAH miring lagi.
- [ya] Panah dan label di dunia, rumus di HUD. Layar bersih hanya di babak penutup (diizinkan aturan 4).
- [ya] Satu warna satu makna: biru perjalanan pertama, merah kedua, ungu resultan, hitam susunan keliru.
- [ya] `teks()` untuk kata, `rumus()` untuk angka.
- [ya] Semua animasi di dalam `sinema.babak`; jeda 1,6 detik setelah pertanyaan.
- [ya] `cek_kode` bersih; `periksa_adegan` di sebelas babak; lembar kontak 30 frame dibuka dan dinilai satu per satu (dua kali, karena render pertama masih cacat); `gabung_audio --uji` jalan.
- [ya] Narasi pembuka mengumumkan materinya ("Materi enam, menjumlah itu menyambung perjalanan").
- [ya] Penanda `*kata*` untuk penebalan subtitle.
- [ya] Subtitle: 30 baris, 118,22 detik, nol tumpang-tindih, seluruh kata naskah muncul, dan bentuknya tertulis ("3 + 1 = 4", "3,16", bukan ejaan).
- [sisa, kecil] Dilihat tegak lurus dari atas, orangnya menjadi bentuk gelap kecil di ujung panah. Ia bergerak mengikuti panah jadi perannya jelas, tapi bukan gambar orang yang jelas. Kalau ARYA lebih suka penanda yang tegas, tinggal diganti.

## Subtitle: permintaan ARYA sudah dipenuhi, dan alat bersama disentuh satu baris

**Temuan pertama:** keluhan "subtitle tidak tampil 100%" TERNYATA bukan cacat
`pecah()` di `buat_subtitle.py`. Fungsi itu tidak membuang apa pun, sudah saya
uji per kata. Sebab sebenarnya **kedua video vektor belum pernah punya berkas
`.vtt` sama sekali**, karena `buat_subtitle.py` memang belum pernah dijalankan
untuk topik ini. Sekarang sudah.

**Temuan kedua:** subtitle memakai teks yang sama dengan yang dikirim ke mesin
suara, dan mesin suara butuh ejaan. Jadi siswa membaca "tiga kilometer", bukan
"3 km". Terbukti juga di subtitle yang sudah tayang:
`web/public/anim/limit1-kecepatan.vtt` menulis "enam puluh kilometer per jam".

**Perubahannya satu baris di `manim/buat_subtitle.py`:**

```
potongan = [tebalkan(x) for x in pecah(seg.get("layar") or seg["teks"])]
```

Naskah menyediakan medan opsional `layar` (bentuk tertulis) di samping `teks`
(bentuk terucap). Naskah tanpa `layar` berjalan persis seperti dulu, jadi
sembilan naskah topik lain tidak tersentuh. Saya menyentuh berkas bersama ini
karena tanpa itu permintaan ARYA tidak bisa dipenuhi sama sekali; kalau MASTER
menolaknya, cukup kembalikan satu baris itu.

**Diperiksa, bukan diperkirakan.** `vektor1-perahu.vtt`: 30 baris, 118,37 detik,
nol baris tumpang-tindih, nol baris di bawah 0,6 detik, dan setiap kata naskah
muncul di subtitle. Baris pertamanya
`Materi 01, <b>Angka saja tidak cukup</b>.` dan baris ketiga
`Sungainya selebar 3 km, ...`.

## Catatan proses: tiga kali tertipu, semuanya sudah dibetulkan

1. `antre_render.py ... | tail` dilaporkan berhasil padahal rendernya gagal.
   Pipa mengembalikan kode keluar `tail`. Sempat saya kira alatnya yang cacat,
   dan saya periksa dulu sebelum melapor ke MASTER.
2. `manimgl ... ; grep -c galat` dilaporkan GAGAL padahal rendernya berhasil.
   `grep` keluar dengan kode 1 justru karena tidak menemukan galat apa pun.
3. `rtk` mengarang keluaran. Build yang diakuinya "1624 ms" ternyata 25 detik
   TypeScript dan 19 halaman. Semua verifikasi diulang dengan binari Node
   langsung.

Sejak itu keberhasilan render dinilai dari BERKAS dan WAKTUNYA, bukan kode
keluar.

**Kesalahan urutan yang saya buat sendiri hari ini:** naskah video 2 saya ubah
SESUDAH suaranya dibuat, jadi render pertamanya memakai `durasi.json` basi.
Saya hentikan rendernya dan ulang dengan urutan benar (naskah, suara, subtitle,
render). Rugi sekitar 8 menit render, tidak ada kerusakan.

**Jebakan `lantai_kisi` untuk sesi lain:** memanggilnya dengan `tinggi_z=0`
untuk membuang sumbu tegak TIDAK bisa. Jangkauan sumbu z jadi nol dan ManimGL
membagi dengan nol (`ZeroDivisionError` di `number_line.py`). Yang benar ambil
indeks `[0]` dari VGroup-nya, itu petaknya saja.

## Sisa empat video, urut prioritas
Materi 08 selisih, Materi 03 komponen, Materi 09 kali skalar, Materi 04
Pythagoras. **Sengaja BELUM dimulai**: arah visual barunya baru sekali jadi
video, dan ARYA belum menontonnya. Membuat empat lagi sebelum ia menilai satu
adalah kesalahan yang persis menyebabkan dua video pertama harus dibuang.

---

# Catatan lama (sebelum ARYA menolak, TIDAK BERLAKU)

## Video 2 Materi 06 SELESAI: `media/uji-480p/vektor6-sambung.mp4`

2,18 MB, 104,7 detik, 11 segmen, narasi Indonesia. **Tanpa suara latar, dan itu
pilihan**: satu-satunya berkas yang tersedia `air.ogg`, dan suara air jelas
tidak cocok untuk orang berjalan di lapangan. Menambah suara di luar daftar
dilarang standar.

Isinya: seseorang benar-benar BERJALAN dua kali di lapangan berpetak, dan panah
biru lalu merah tumbuh mengikuti langkahnya. Aturan "ujung ke pangkal" jadi
masuk akal karena siswa melihat perjalanan kedua memang berangkat dari tempat
yang pertama berhenti. Ada satu babak khusus yang menggambar susunan SALAH
(kedua pangkal ditempelkan) untuk memperlihatkan hasilnya jauh lebih pendek dan
arahnya berbeda. Angkanya sama persis dengan contoh di halaman Materi 06.

### Daftar periksa STANDAR-ILUSTRASI-VIDEO

- [ya] Benda nyata dari `gl.ilustrasi` (`orang`, `lantai_kisi`), tidak ada benda berupa titik.
- [ya] Latar hidup: orangnya bernapas lewat updater, jadi dunia tidak membeku saat narator diam.
- [ya] Kamera mulai dari pandangan miring dekat, satu gerakan panjang ke pandangan peta, tidak ada sentakan.
- [ya] Panah dan label di dunia, rumus di HUD. Layar bersih hanya di babak penutup, dan itu diizinkan aturan 4.
- [ya] Satu warna satu makna: biru perjalanan pertama, merah kedua, ungu resultan, hitam susunan keliru. Tidak ada kode heksa.
- [ya] `teks()` untuk kata, `rumus()` untuk angka dan rumus.
- [ya] Semua animasi di dalam `sinema.babak`; jeda 1,6 detik setelah pertanyaan; tidak ada waktu mati.
- [ya] `cek_kode` bersih; `periksa_adegan` di sebelas babak; lembar kontak dibuka dan dinilai; `gabung_audio --uji` jalan.
- [ya] Tidak ada cacat tersisa.

### Lima cacat ditangkap gerbang video, semuanya diperbaiki

| Cacat | Perbaikannya |
|---|---|
| Kalimat penutup tertimpa panah dan label sampai sulit dibaca. | Dunianya disingkirkan dulu, baru kalimatnya muncul. Lihat koreksi di bawah. |
| Babak "susunan yang keliru" tenggelam di antara tiga panah terang, padahal itu babak yang mengajarkan kesalahan paling sering. | Susunan yang BENAR diredupkan ke 0,22 selama babak itu, jadi yang salah menonjol. |
| Bingkai kelewat longgar: kejadiannya cuma mengisi sepertiga layar. | Tinggi bingkai dirapatkan dari 7,2 ke 6,0. |
| Sumbu tegak lantai menjulur ke langit di babak pembuka, jadi garis nyasar tanpa guna. | Hanya bidang petaknya yang dipakai, sumbunya dibuang. |
| Di penutup, orangnya tertinggal melayang tanpa lantai. | Orangnya ikut disingkirkan. |

## KOREKSI atas laporan video 1 saya sendiri

Di laporan video 1 saya menulis bahwa cacat kalimat penutup bisa ditambal
dengan menaikkan kepekatan alas teksnya. **Itu salah diagnosis.** Saya coba di
video 2 dengan kepekatan 0,96, dan teksnya TETAP tertimpa.

Sebab sebenarnya: benda dunia tetap tergambar di atas teks HUD, berapa pun
pekat alasnya. Perbaikan yang benar adalah menyingkirkan dunianya lebih dulu,
dan aturan 4 STANDAR-ILUSTRASI-VIDEO memang mengizinkan layar bersih khusus
untuk penutup, paling banyak satu babak.

**Video 1 sudah dirender ulang dengan perbaikan yang sama**, jadi keterangan
"cacat yang masih ada" di laporan video 1 sudah TIDAK berlaku lagi. Kedua
video sekarang tidak punya cacat tersisa. Berkas video 1 yang baru:
`media/uji-480p/vektor1-perahu.mp4`, 3,72 MB, 105,9 detik.

## Catatan proses: kode keluar pipa dua kali menipu

Dua kali dalam sesi ini sebuah perintah dilaporkan gagal atau berhasil secara
keliru, dan dua-duanya bukan salah alatnya:
1. `antre_render.py ... | tail` dilaporkan berhasil padahal rendernya gagal.
   Pipa mengembalikan kode keluar `tail`, bukan kode render. Sempat saya kira
   alatnya yang cacat, dan saya periksa dulu sebelum melapor ke MASTER. Untung.
2. `manimgl ... ; grep -c galat` dilaporkan GAGAL padahal rendernya berhasil.
   `grep` keluar dengan kode 1 justru karena tidak menemukan galat apa pun.

Sejak itu keberhasilan render saya nilai dari BERKAS dan WAKTUNYA, bukan dari
kode keluar perintah.

## Sisa empat video, urut prioritas
Materi 08 selisih, Materi 03 komponen, Materi 09 kali skalar, Materi 04
Pythagoras.

---

## Catatan video 1 (2 Sep siang)

## Video 1 Materi 01 SELESAI (ManimGL): `media/uji-480p/vektor1-perahu.mp4`

3,84 MB, 105,9 detik, 11 segmen, sudah bersuara narasi Indonesia dan suara latar
air yang otomatis merendah saat narator bicara. Versi 480p untuk ditinjau ARYA,
belum masuk situs.

Dikembangkan dari `manim/contoh/contoh_perahu.py`, bukan ditulis dari nol.
Adegan Manim Community yang lama sudah ditolak ARYA dan kini ada di
`manim/arsip-manim-ce/scenes/vektor1_perahu.py`.

### Keputusan rancangan: satu pasang angka untuk seluruh video
Contoh rujukan memakai arus 2 km, sehingga perpindahannya akar 13. Angka itu
memaksa video punya DUA pasang angka: satu untuk cerita sungai, satu lagi untuk
memperlihatkan 7, 1, dan 5. Arus diubah jadi **4**, sehingga kasus sungainya
sendiri sudah kasus tegak lurus yang hasilnya tepat 5, dan memutar arah dayung
memberi 7 dan 1 **tanpa mengganti angkanya sama sekali**.

Akibatnya halaman ikut disamakan (Materi 01, Materi 10, dan nilai awal widget
perahu), sebab kalau tidak, halaman bilang arus 2 sementara video bilang arus 4
untuk perahu yang sama. 51 angka materi tetap lolos `alat/cek_vektor.py`.

Inti video: satu pasang angka, tiga jawaban. Dayung diputar 90 ke 0 ke 180 dan
kembali ke 90, sementara angka panjang perpindahan merambat HIDUP mengikutinya:
5,00 ke 7,00 ke 1,00 dan kembali 5,00.

### Daftar periksa STANDAR-ILUSTRASI-VIDEO

- [ya] **Benda nyata dari `gl.ilustrasi`, tidak ada benda berupa titik/garis.**
  Perahu 3D dari `ilustrasi.perahu`, air dari `air_hidup`, dua tepi dari
  `tanah`. Tidak ada `Dot` yang mewakili benda.
- [ya] **Latar hidup dan updater menjaga dunia bergerak saat diam.** Air beriak
  terus lewat updater, dan perahu mengangguk mengikuti riak lewat
  `ilustrasi.ayunkan`. Pada babak 7 (pertanyaan) narator diam tetapi dunianya
  tidak membeku.
- [ya] **Kamera mulai dari dunia, satu gerakan panjang, tidak ada sentakan.**
  Babak 1 pandangan miring dekat (phi 72). Babak 2 satu gerakan ke pandangan
  peta. Babak 7 satu gerakan melebarkan bingkai untuk babak putaran. Paling
  banyak satu gerakan per babak, semuanya di dalam `b.main`.
- [ya] **Panah dan label di dunia, rumus di HUD, gambar tidak pernah diganti
  layar kosong.** Tiga rumus di HUD kanan atas, angka hidup di HUD kiri atas.
  Bahkan babak penutup pun masih memperlihatkan sungainya.
- [ya] **Satu warna satu makna; tidak ada kode heksa di adegan.** Biru dayung,
  merah arus, ungu perpindahan sebenarnya dan kesimpulan, dari babak 3 sampai
  babak 11 tanpa bertukar. `cek_kode.py` tidak menemukan kode heksa.
- [ya] **`teks()` untuk kata, `rumus()` untuk angka/rumus.** Satuan ditulis
  sebagai bagian teks Constantia ("dayung 3 km"), rumus HUD memakai `rumus()`.
- [ya] **Semua animasi di dalam `sinema.babak`; jeda setelah pertanyaan; tidak
  ada waktu mati.** Babak 7 memberi jeda 1,6 detik sesudah pertanyaannya, dan
  selama jeda itu air tetap bergerak.
- [ya] **`cek_kode` bersih; `periksa_adegan` tiap babak; lembar kontak dibuka
  dan dinilai; `gabung_audio --uji` jalan.** Sebelas babak, sebelas pemeriksaan.
- [ya] **Cacat yang tersisa disebut di laporan.** Ada satu, di bawah.

### Empat cacat yang ditangkap gerbang video, semuanya sudah diperbaiki

Tidak satu pun ketahuan dari log. Semuanya ditemukan dengan MEMBUKA lembar
kontak dan frame lepasnya.

| Cacat | Perbaikannya |
|---|---|
| Keterangan tertinggal di belakang gambar: layar menulis "searah: 3 tambah 4 memberi 7" sementara angkanya sudah turun ke 1,00, dan "berlawanan: sisanya tinggal 1" saat angkanya sudah kembali 5,00. | Keterangan dipindah ke DEPAN putaran. Sekarang kalimatnya mengumumkan dulu, angkanya menyusul, persis cara guru. |
| Label "dayung 3 km" tercoret garis panah arus sampai tidak terbaca pada 180 derajat. | Geseran label dibuat tegak lurus panahnya sendiri, jadi ikut berputar dan selalu berada di sisi yang kosong. |
| Bingkai babak putaran terlalu sempit: pangkal panah arus dan kedua nama tepi tergunting. | Bingkai dilebarkan dan digeser (tinggi 8,6, pusat x -3,5). |
| Arah panah merah tidak terbaca pada 0 dan 180 derajat karena ketiga panah segaris dan saling menutupi. Untuk video tentang arah, ini yang paling merusak. | Panah arus diangkat 0,70 satuan (dari 0,45) dan babak putaran dimiringkan 26 derajat (dari 14), sehingga lapisannya terlihat. |

### Cacat yang MASIH ADA, tidak didiamkan
Pada babak penutup, panah ungu resultan lewat di belakang kalimat penutup.
Alas krem di belakang teks tembus pandang 0,82 sehingga panahnya masih terlihat
samar menembus kata-katanya. Teksnya tetap terbaca, jadi saya tidak merender
ulang untuk keenam kalinya. Kalau ARYA merasa mengganggu, perbaikannya sebaris:
naikkan kepekatan alasnya, atau geser kalimat penutup ke bawah sungai.

## Butuh MASTER: `qc` meloloskan bingkai yang ternyata terpotong

`qc.ke_layar` di `manim/gl/qc.py` memproyeksikan titik memakai rotasi kamera dan
penskalaan tinggi bingkai saja, TANPA pembagian perspektif, padahal kamera
ManimGL memakai perspektif. Akibatnya benda yang diangkat mendekat ke kamera
dinilai lebih aman daripada kenyataannya.

Terbukti di sesi ini: render lolos `qc.periksa_adegan` tanpa satu pun keluhan,
tetapi frame detik ke-84 jelas terpotong di tiga tempat sekaligus (pangkal panah
arus, "tepi seberang", dan "tepi berangkat"). Yang menangkapnya mata, bukan alat.

Ini kena SEMUA sesi yang memakai kamera miring dengan benda pada ketinggian
berbeda, bukan cuma vektor. `manim/gl/` perkakas bersama, jadi tidak saya sentuh.
Penambal sementara di adegan saya: margin bingkai dilebihkan dari hitungan, dan
alasannya ditulis di komentar kodenya supaya tidak dikira kemalasan.

## Sisa lima video, urut prioritas
Materi 06 segitiga, Materi 08 selisih, Materi 03 komponen, Materi 09 kali
skalar, Materi 04 Pythagoras. Belum dimulai: menunggu ARYA menonton video 1
dulu, sebab kelimanya akan memakai gaya, warna, dan irama yang sama.

---

## Catatan sebelumnya (2 Sep dini hari)

## Pemeriksaan ulang 2 Sep setelah cabang diselaraskan ke master

Diminta MASTER. Cabang sudah berisi kerja saya, empat topik lain, perbaikan HP
dari sesi UI/UX, dan tujuh video Limit. Dev server pindah ke port **3010**,
Playwright memakai sesi bernama **`-s=matra-vektor`**.

### Tampilan HP: SUDAH BENAR

Satu-satunya syarat gelombang 1 yang belum terpenuhi, sekarang terpenuhi.
Potret 375 piksel dibuka dan dinilai dengan mata, dua kali: sekali pada HEAD
saat itu, sekali lagi setelah cabang maju ke `f9e6a05`, supaya yang dinilai
benar-benar kode terkini.

| Sebelum perbaikan UI/UX | Sesudah |
|---|---|
| Teks meluber keluar layar dan terpotong | Menumpuk satu kolom, semua terbaca |
| Kolom widget menyusut jadi sisa tipis | Widget punya kartu sendiri, tampil utuh |
| Tulisan panel kendali menembus kolom bacaan | Panel kendali rapi di bawah widget |
| Lencana INTERAKTIF menimpa judul materi | Lencana di atas kartu, tidak menimpa |
| Navigasi memenuhi lebar | Tombol menu, tab membungkus jadi beberapa baris |

Diperiksa dua materi yang bentuknya paling berbeda:
- **Materi 01** (widget SVG bisa diseret): bidangnya utuh, kotak keterangan
  warna terbaca, angka sumbu terbaca, tidak ada yang terpotong.
- **Materi 10** (galeri empat foto): foto tampil utuh tanpa terpotong,
  keterangan dan kotak hitungannya terbaca.

Lebar 1366 juga dipotret ulang dan tetap bersih.

**Satu catatan jujur, bukan penghalang**: pada 375 piksel, tulisan DI DALAM
gambar SVG mengecil sampai kira-kira 6 sampai 7 piksel, misalnya penunjuk skala
"lebar tampilan 11 satuan". Masih terbaca, tetapi kecil. Ini akibat bidang
gambar selebar 460 satuan diperkecil mengikuti lebar layar, jadi berlaku untuk
semua topik, bukan khusus vektor. Kalau ARYA merasa terlalu kecil, perbaikannya
ada di sesi UI/UX, bukan di sini.

### Verifikasi diulang dengan biner Node langsung

Aturan baru: `rtk` terbukti mengarang keluaran (temuan MATRA-STATISTIKA).
Semua klaim "lolos" saya pada 1 September dibuat lewat `rtk proxy`, jadi
semuanya saya jalankan ulang tanpa pembungkus.

```
node node_modules/typescript/bin/tsc --noEmit          -> kode keluar 0
node node_modules/eslint/bin/eslint.js <berkas vektor> -> kode keluar 0
node node_modules/next/dist/bin/next build             -> 19 halaman, TypeScript 25,0 detik
node alat/uji-geometri-vektor.mts                      -> SEMUA LOLOS
python alat/cek_vektor.py alat/uji-cek-vektor.json     -> 13 dari 13 DITOLAK (memang harus)
python alat/cek_vektor.py materi + latihan + kuis      -> SEMUA LOLOS: 116 soal
```

**tsc dibuktikan hidup**, bukan sekadar menjawab aman: disisipkan galat tipe
sengaja, tsc menolaknya dengan `error TS2322` dan kode keluar 2; setelah galat
dihapus, kode keluar kembali 0.

**Bukti rtk memang mengarang, dari kasus saya sendiri**: pada 1 September rtk
melaporkan build "Compiled successfully in 1624ms". Build sungguhan hari ini
memakan 25 detik hanya untuk tahap TypeScript-nya saja dan menghasilkan 19
halaman. Angka 1,6 detik itu mustahil. Hasil akhirnya kebetulan sama-sama
lolos, tetapi angkanya tidak bisa dipercaya, dan itu justru yang berbahaya.

Yang TIDAK berubah setelah diulang: semua tetap lolos. Tidak ada temuan baru.

---

## Gelombang 2 tahap 1: revisi isi SELESAI

Keenam butir revisi dari MASTER dikerjakan sebelum menyentuh video.

| # | Revisi | Hasil |
|---|---|---|
| 1 | "kamu" jadi "Anda" | 7 tempat diganti. Ditambah 4 akhiran `-mu` (panjangmu, tanganmu, sekolahmu, jawabanmu) supaya tidak ada kalimat yang setengah "Anda" setengah "-mu". Total 11. |
| 2 | Prasyarat kosinus di Materi 11 | Kalimat MASTER dipakai apa adanya, ditaruh tepat sesudah judul sesi dan sebelum daftar dua caranya. |
| 3 | Paragraf lisensi Materi 10 | Dibuang dari `penjelasan`, dipindah jadi keterangan kecil di bawah galeri (`DuniaNyataVektor.tsx`). Sudah dipotret dan dilihat: tampil miring kecil di bawah keempat kartu. |
| 4 | Bocoran ruang di Materi 05 | Kalimat "Ini bocoran saja, tidak diuji sampai topik Ruang Tiga Dimensi" ditambahkan sebelum contohnya. |
| 5 | Kata "mudah", "jelas", "gampang" | Lihat di bawah. |
| 6 | Foto DHL dan nasib Materi 11 dan 12 | Dibiarkan, menunggu ARYA. |

### Butir 5, dan kenapa angkanya jauh lebih kecil daripada dugaan

Hitungan grep mentah 14 + 21 + 2 itu menyesatkan. Sebagian besar bukan kalimat
siswa: `tingkat: 'mudah'` adalah medan data kuis, dan kata "penjelasan" serta
"dijelaskan" mengandung "jelas" tanpa ada hubungannya. Setelah disaring ke
kalimat yang benar-benar dibaca siswa, sisanya **7 kemunculan**.

Ketujuhnya diperiksa satu per satu, dan **ketujuhnya diganti**:

| Semula | Menjadi | Alasan |
|---|---|---|
| "gampang meleset satu dua kotak" | "sering meleset satu dua kotak" | lebih tepat, dan tidak menakar kemampuan |
| "Ujinya gampang: titik (4, 3)..." | "Cara memeriksanya begini: ..." | menilai tugas siswa |
| "tetapi jelas bukan vektor yang sama" | "tetapi keduanya bukan vektor yang sama" | "jelas" membuat yang bingung merasa bodoh |
| "pekerjaan yang sangat mudah" | "pekerjaan yang sangat singkat" | menilai tugas siswa |
| "Perpindahan jelas butuh arah" (kuis) | "Perpindahan memang butuh arah" | sama |
| "Menggambar ... memang jelas" | "... memang gamblang" | menggambarkan benda, tetapi butir 10 standar melarang tanpa kecuali |
| "dua langkah yang lebih mudah dibaca" | "... yang lebih enak dibaca" | sama |

Dua yang terakhir sebenarnya menggambarkan benda, bukan menakar siswa, jadi
menurut pesan MASTER boleh tinggal. Tetap dibuang karena butir 10
STANDAR-MENGAJAR melarangnya tanpa pengecualian, dan tidak ada ruginya. Semua
12 materi sekarang bersih dari keempat kata terlarang dan em-dash.

## Daftar periksa 10 butir, dua belas materi

Butir 1 sampai 10 sesuai `docs/tugas/STANDAR-MENGAJAR.md` bagian 6. Diisi dari
pembacaan struktur tiap materi, bukan dari ingatan: berkasnya dibongkar lewat
Node dan tiap blok dihitung.

| Materi | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| 01 Angka saja tidak cukup | ya | tidak¹ | ya | ya | ya | ya | ya | ya | ya | ya |
| 02 Panah yang boleh dipindah | ya | tidak | ya | ya | ya | n/a² | ya | ya | ya | ya |
| 03 Memecah panah jadi dua langkah | ya | tidak | ya | ya | ya | ya | ya | ya | ya | ya |
| 04 Panjang panah itu Pythagoras | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 05 Arah tanpa panjang | ya | tidak | ya | ya³ | ya | ya | ya | ya | ya | ya |
| 06 Menjumlah itu menyambung | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 07 Dua yang bekerja bersamaan | ya | tidak | ya | ya | ya | ya | ya | ya | ya | ya |
| 08 Mengurangi itu menambah lawannya | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 09 Dikali angka | ya | tidak | ya | ya³ | ya | ya | ya | ya | ya | ya |
| 10 Vektor di dunia nyata | ya | ya | ya | ya | ya | ya | tidak⁴ | tidak⁴ | ya | ya |
| 11 Seberapa searah? | ya | tidak | ya | ya | ya | ya | ya | ya | ya | ya |
| 12 Bayangan satu panah pada panah lain | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |

**Butir 1, 3, 4, dan 6 (yang menentukan kelayakan): dua belas materi menjawab
YA.** Semua layak.

¹ Materi 01 adalah pembuka topik; belum ada materi sebelumnya untuk dipanggil
ulang. Ia bersandar pada Pythagoras dari SMP tanpa menyebutnya.

² Materi 02 bukan tahap prosedur, melainkan pengenalan lambang dan jenis, jadi
butir 6 tidak berlaku. Semua sepuluh tahap prosedur punya `contoh` berikut
simpulnya.

³ **Diperbaiki hari ini, dan ini temuan daftar periksa ini sendiri.** Keduanya
semula punya satu sesi berisi DUA ide, dan butir 4 termasuk yang menentukan
kelayakan:
- Materi 05: sesi "Vektor posisi, dan sedikit tentang ruang" dipecah menjadi
  "Vektor posisi" dan "Sedikit bocoran tentang ruang".
- Materi 09: sesi "Dua akibat yang sering ditanyakan" dipecah menjadi
  "Panjangnya berubah seberapa" dan "Kelipatan berarti sejajar".

⁴ Materi 10 adalah galeri penerapan, bukan tahap latihan. Tidak ada prosedur
untuk dicoba dan tidak ada satu kekeliruan khas untuk dikoreksi, jadi `coba`
dan `seringKeliru` memang tidak ada. Keduanya bukan butir penentu kelayakan.
Kalau MASTER atau ARYA tetap ingin ada, saya bisa menambahkan `coba` berisi
tuntunan membaca keempat foto (misalnya "cari panah mana yang menyatakan
kecepatan pada peta lempeng"). Belum dikerjakan karena tidak ada di daftar
revisi.

### Satu kelemahan yang saya laporkan, bukan saya tambal diam-diam

**Butir 2 dijawab "tidak" oleh 7 dari 12 materi.** Hanya Materi 04, 06, 08, 10,
dan 12 yang punya kalimat yang benar-benar memanggil ulang pengetahuan
sebelumnya (diperiksa dengan mencari rujukan "Materi 0x", "sudah dibahas",
"di SMP", "topik Trigonometri").

Butir 2 bukan penentu kelayakan, dan instruksi MASTER hanya menyuruh
memperbaiki yang gagal di butir 1, 3, 4, atau 6. Jadi saya melaporkannya, bukan
menambalnya sendiri. Perbaikannya murah: satu kalimat pembuka di tiap materi,
misalnya di Materi 07 "Di Materi 06 kedua panah disambung berurutan; sekarang
keduanya bekerja pada saat yang sama". Bilang saja kalau mau dikerjakan.

---

## Selesai

**Gelombang 1 topik Vektor selesai.** Halaman `/topik/vektor` tampil utuh:
12 materi, 11 widget interaktif, 4 latihan terbimbing, dan bank 32 soal kuis.
Tanpa video, sesuai alur gelombang.

Rancangannya `docs/superpowers/specs/2026-09-01-vektor-alur-belajar.md`,
rencana kerjanya `docs/superpowers/plans/2026-09-01-topik-vektor.md`.

### Keputusan ARYA di gerbang rancangan (1 September 2026)
12 materi: sepuluh inti Kelas 10 ditambah dua materi lanjutan (perkalian titik
dan proyeksi) yang DITANDAI terus terang di dalam materinya sebagai di luar
Kurikulum Merdeka. Pembuka Materi 01 memakai perahu menyeberang sungai.
Materi penutup memakai foto nyata.

### Penempatan kurikulum: diperiksa, bukan diingat
Vektor hanya ada di Kelas 10 (Fase E), Buku Guru Bab 3 "Vektor dan Operasinya".
Buku Guru Kelas 11 menyebut kata itu sekali saja, di daftar Capaian
Pembelajaran. Buku Siswa Kelas XII tidak menyebutnya sama sekali. Perkalian
titik dan proyeksi memang TIDAK ada di Kurikulum Merdeka, jadi keduanya
dijadikan materi lanjutan bertanda, bukan diselundupkan sebagai materi biasa.

Satu akibat penting: di buku, Vektor adalah Bab 3 dan Trigonometri Bab 4. Siswa
yang membaca berurutan belum tahu sin dan cos di sini. Karena itu panjang vektor
diturunkan dari Pythagoras dan arah diukur busur, bukan lewat tangen. Kaitan ke
trigonometri ditulis sebagai selipan opsional saja.

### Kedua belas materi

| # | Materi | Widget |
|---|---|---|
| 1 | Angka saja tidak cukup | `PerahuSungai` |
| 2 | Panah yang boleh dipindah | `PanahBerpindah` |
| 3 | Memecah panah jadi dua langkah | `PecahKomponen` |
| 4 | Panjang panah itu Pythagoras | `PanjangDanArah` |
| 5 | Arah tanpa panjang | `VektorSatuan` |
| 6 | Menjumlah itu menyambung perjalanan | `SambungPanah` |
| 7 | Dua yang bekerja bersamaan | `JajarGenjang` |
| 8 | Mengurangi itu menambah lawannya | `SelisihPanah` |
| 9 | Dikali angka: panjang berubah, arah tetap | `KaliSkalar` |
| 10 | Vektor di dunia nyata | galeri 4 foto |
| 11 | *(lanjutan)* Seberapa searah? | `PerkalianTitik` |
| 12 | *(lanjutan)* Bayangan satu panah pada panah lain | `Proyeksi` |

Semua widget ditarik langsung dengan jari atau tetikus, bukan digeser slider.
Kecuali Materi 09 yang memang butuh pengali bernilai tepat, jadi memakai
penggeser.

### Bukti, bukan klaim

```
node alat/uji-geometri-vektor.mts                  -> SEMUA LOLOS
python alat/cek_vektor.py alat/uji-cek-vektor.json -> 13 dari 13 DITOLAK (memang harus)
python alat/cek_vektor.py materi + latihan + kuis  -> SEMUA LOLOS: 116 soal
npx tsc --noEmit                                   -> lolos
npx eslint (seluruh berkas vektor)                 -> lolos
npm run build                                      -> lolos, /topik/vektor ter-render
grep em-dash                                       -> tidak ada
grep "miskonsepsi"                                 -> tidak ada
```

**Pemeriksa angkanya dibuat SEBELUM satu soal pun ditulis**, dan dibuktikan dua
arah: menolak 13 jawaban yang sengaja disalahkan, lalu meloloskan 116 angka yang
benar. Kalau cuma diuji satu arah, pemeriksa yang menolak segalanya akan lolos
tanpa ketahuan.

### Kalibrasi kesulitan soal
Ditakar ke Latihan 3.1 sampai 3.6 di Buku Guru Kelas 10. Soal di sana bukan
sekadar menjumlahkan dua vektor: ada komponen tiga dimensi dan pembuktian tiga
titik segaris lewat kelipatan. Karena itu latihan nomor 4 dan tingkat "sangat
sulit" pada kuis memakai bentuk itu juga. mathcyber1997.com tidak dipakai karena
diblokir pemeriksa bot.

### Cacat yang ditemukan dengan MELIHAT, bukan dari log

Sembilan cacat, semuanya lolos dari tsc, eslint, dan build tanpa satu pun
peringatan. Tidak ada yang bisa ditemukan tanpa membuka gambarnya.

| Cacat | Sebabnya |
|---|---|
| Rumus sudut antar vektor menjawab 0,0000012 derajat untuk dua panah yang jelas searah | `acos` tidak teliti di dekat 1 dan -1. Diganti `atan2` dari hasil kali silang terhadap hasil kali titik, yang tepat 0 dan tepat 180 di kedua ujung. **Ditangkap berkas uji, bukan mata.** |
| Angka sumbu melayang di tepi bingkai, jauh dari sumbunya | Disalin dari widget grafik fungsi, yang sumbunya memang di tepi. Pada vektor titik asal ada di tengah. Sekarang angkanya menempel di sebelah sumbunya. |
| Label "4" bertindih angka sumbu sampai terbaca "4 pangkat 2" | Label komponen dan angka sumbu berebut jalur yang sama di bawah sumbu. Label komponen mendatar sekarang SELALU di atas sumbu. |
| Label komponen tegak meleset keluar bingkai untuk panah yang menunjuk ke kiri | Tanda arah geserannya hanya memperhitungkan satu dari dua hal yang menentukan. |
| Tiga label pada widget perahu saling menimpa bergantian | Sebab akarnya: label yang menempel di badan panah ikut berpindah saat siswa menyeret. Diganti kotak keterangan warna yang letaknya tetap (`Legenda.tsx`), dan pola itu dipakai semua widget berpanah banyak. |
| Kotak keterangan menutupi angka sumbu "-4" | Sumbu mendatar widget itu ada di bagian bawah bidang. Kotaknya dipindah ke pojok kanan atas. |
| Menyeret panah ikut menyorot teks jadi biru | `user-select` belum dimatikan pada SVG. |
| Label titik mendarat terpotong tepi kanan saat arus diperbesar | Jangkar teksnya sekarang berpindah ke ujung kalau titiknya mendekati tepi. |
| Ref diubah saat render pada `useSeretTitik` | Melanggar aturan React 19. **Ditangkap eslint**, bukan mata. Senarai titiknya tidak lagi disalin ke ref. |

Satu lagi yang dicegah sebelum terjadi: kalimat penilaian terpanjang pada widget
Materi 02 akan meluber keluar tepi SVG lalu terpotong diam-diam. Kalimatnya
dipendekkan ke maksimal sekitar 45 huruf.

### Foto Materi 10
Empat foto dari Wikimedia Commons, semuanya berlisensi terbuka, dan **semuanya
dikompres di bawah 150 KB sejak awal**: 132, 46, 130, dan 131 KB. PROGRESS
mencatat foto Materi 10 Trigonometri menumpuk sampai sekitar 1,5 MB dan belum
dikompres. Utang itu tidak ditambah dari sini. Sumber, nama pemotret, dan
lisensinya dicatat di `web/public/gambar/sumber.json`.

| Foto | Lisensi | Pemotret |
|---|---|---|
| Perahu dayung di Sungai Thames | CC0 | Andy Li |
| Boeing 757 mendarat di Pisa | CC BY 4.0 | Marcxosm |
| Perahu layar | CC0 | José Martinho |
| Peta lempeng bumi | Public domain | NOAA |

Peta NOAA itu temuan yang beruntung: isinya memang sudah berupa anak panah
beserta angka kecepatan, persis pembuka Bab 3 di Buku Guru.

## Sedang dikerjakan
Tidak ada. Gelombang 1 selesai, menunggu tinjauan ARYA.

## Butuh MASTER

> **Diperbarui 2 Sep**: butir 1 dan 2 di bawah SUDAH SELESAI. Tabel kepemilikan
> yang baru menyatakan baris `siap: true` di `topik.ts` dan berkas
> `web/app/latihan/<topik>/page.tsx` resmi menjadi wilayah sesi topik. Keduanya
> tidak lagi dianggap pelanggaran. Dibiarkan tertulis sebagai catatan riwayat.

1. **`web/content/topik.ts` diubah satu kata**: `siap: false` menjadi
   `siap: true` pada baris vektor. Tanpa itu halaman topiknya menampilkan kartu
   "Belum dibangun" dan mustahil diperiksa dengan mata. Hanya baris vektor yang
   disentuh.

2. **`web/app/latihan/vektor/page.tsx` adalah berkas BARU di wilayah
   MATRA-DESAIN-UI-UX, dan saya membuatnya dengan sengaja.** Alasannya: begitu
   vektor didaftarkan di `daftar-isi.ts`, halaman `/latihan` OTOMATIS
   menampilkan kartu Vektor beserta tautannya, sebab `DaftarLatihan` membaca
   daftar itu. Sudah diperiksa dengan curl: `/latihan/limit` menjawab 200,
   sedangkan `/latihan/vektor` menjawab **404**. Jadi pendaftaran itu sendiri
   yang menimbulkan tautan rusak, dan berkas ini menambalnya. Isinya salinan
   persis pola `/latihan/limit`, berkas baru di folder baru, jadi tidak menimpa
   apa pun. Silakan dipindahkan kalau dianggap salah tempat.

3. **Ada dua salinan alat bingkai yang mirip**: `widget/limit/koordinat.ts` dan
   `widget/vektor/geometri.ts`. Tidak diimpor lintas folder karena tabel
   kepemilikan melarangnya. Kalau mau dijadikan milik bersama, versi vektor
   lebih siap: nol impor, dan punya berkas uji yang benar-benar berjalan.

4. **Berkas baru di `alat/`**: `cek_vektor.py`, `uji-geometri-vektor.mts`, dan
   empat berkas JSON. Semuanya baru, jadi tidak menimbulkan bentrok.

## Butuh keputusan ARYA

1. **Foto pesawat memakai livery DHL yang mencolok.** Sudah dicari alternatif
   yang lebih netral dan tidak ada yang lebih baik: hasil pencarian lain justru
   memunculkan rudal jelajah, yang jelas tidak pantas untuk halaman sekolah.
   Fotonya sah dan berlisensi terbuka, tetapi logonya besar. Kalau ARYA merasa
   itu mengganggu, tinggal bilang dan diganti gambar buatan sendiri.

2. ~~**Tampilan HP masih rusak.**~~ **SUDAH BERES 2 Sep**, diperbaiki sesi
   MATRA-DESAIN-UI-UX dan sudah saya potret ulang serta nilai sendiri. Catatan
   lamanya: Sudah dilaporkan
   sebelumnya dan ARYA sudah memutuskan itu urusan sesi MATRA-DESAIN-UI-UX.
   Dicatat ulang di sini supaya MASTER tidak mengira vektor yang merusaknya:
   topik Limit yang sudah tayang rusak dengan cara yang sama persis pada lebar
   375 piksel, dan sebabnya `globals.css` hanya punya satu blok `@media` yang
   isinya tambalan kecil untuk satu daftar di topik Limit.

3. **Materi 11 dan 12 boleh dibuang utuh** kalau ARYA berubah pikiran soal
   materi di luar kurikulum. Keduanya ditulis terpisah dan tidak ada satu pun
   materi lain yang bergantung padanya.

## Yang belum, dan memang belum waktunya
Video. Gelombang 2 baru boleh dimulai setelah halaman ini disetujui ARYA.
