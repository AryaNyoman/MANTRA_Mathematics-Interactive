# Laporan MATRA-RUANG-TIGA-DIMENSI

Terakhir: 2 September 2026
Cabang: `sesi/ruang-3d` · Worktree: `.claude/worktrees/matra-ruang-3d`

> **Urutan berkas ini: YANG TERBARU DI PALING ATAS.** Bagian paling bawah
> adalah yang paling lama. Diubah 4 Sep 2026 atas permintaan MASTER, sebab
> urutan kronologis membuat pembaca menemukan kabar lama lebih dulu.

## Selesai

**Gelombang 1 SELESAI: halaman topik Ruang Tiga Dimensi utuh.**
10 materi, 9 widget interaktif, galeri dunia nyata, 4 latihan, bank 32 soal kuis.

### Keputusan ARYA yang dijalankan

| Pertanyaan | Jawaban |
|---|---|
| Cara menggambar 3D di widget | SVG buatan sendiri + matriks putar, bukan three.js |
| Video 3D-nya | tetap Manim `ThreeDScene`, gelombang 2 |
| Daftar tahap | 10 tahap seperti rancangan |
| Sumber materi | jalan terus dengan sumber campuran (2 Sep) |

### Sumber, ditulis terbuka

Buku dimensi tiga tidak ada di koleksi ARYA. Sudah diperiksa isinya satu per
satu, bukan ditebak dari judul: `3 Dimensi.pdf` ternyata Buku Siswa Kelas XI
(bilangan kompleks, polinomial, matriks), Kelas XII Revisi 2025 berisi barisan
sampai peluang, Buku Guru 10 dan 11 tidak memuatnya. Penelusuran seluruh drive D
menemukan dua berkas lain, keduanya di luar folder BAHAN MATEMATIKA:

| Berkas | Dipakai untuk |
|---|---|
| `…\SMT 3\KSM\dokumen.tips_makalah-ruang-dimensi-3.pdf` | daftar cakupan saja. Ini makalah siswa SMA, banyak salah ketik dan satu judul bagian keliru, jadi TIDAK dikutip sebagai sumber kebenaran. Di dalamnya ada 5 soal Ujian Nasional asli, dan itu yang paling berharga |
| `…\SMT 3\KSM\05-kapita-selekta-pemb-geometri-ruang-di-smp.pdf` | modul PPPPTK Matematika, Depdiknas. Resmi, dipakai untuk memastikan istilah Indonesianya benar. Tingkatnya SMP, jadi tidak menutupi jarak dan sudut |

**Kalibrasi kesulitan memakai lima soal Ujian Nasional asli** yang ditemukan di
makalah itu: UN 2004, EBTANAS 1999, EBTANAS 1992, UAN 2003, UAN 2005. Kelimanya
dihitung ulang dan lolos. Empat di antaranya masuk ke bank kuis apa adanya
lengkap dengan sumbernya, dan dua masuk ke latihan halaman.

### Isi yang dibangun

| # | Materi | Widget |
|---|---|---|
| 1 | Gambar ruang boleh berbohong | `KubusPutar`, BD dan EG yang tampak berpotongan |
| 2 | Kosakata kedudukan | `PemilihKedudukan`, pilih dua ruas, kedudukan plus alasannya |
| 3 | Jarak selalu yang terpendek | `KakiTegakLurus`, geser kaki, grafik lembah di kolom kanan |
| 4 | Dua kali Pythagoras | `DiagonalKubus`, dua langkah dengan segitiga penolongnya |
| 5 | Jarak titik ke garis | `JarakKeGaris`, tiga titik yang jawabannya sama |
| 6 | Jarak titik ke bidang | `JarakKeBidang`, ruas tegak lurus yang menembus |
| 7 | Jarak garis dan bidang sejajar | `JarakSejajar`, angka yang tidak bergerak |
| 8 | Sudut garis bersilangan | `SudutBersilangan`, geseran yang mendarat jadi AH |
| 9 | Sudut dengan bidang, sudut antarbidang | `SudutBidang`, dua mode |
| 10 | Dipakai di dunia nyata | `DuniaNyataRuang`, empat adegan |

Satu gagasan sengaja diulang di tahap 3 sampai 7: **setiap soal jarak adalah
soal mencari kaki tegak lurus.** Buku biasanya memberi empat rumus terpisah,
dan itulah sebabnya siswa menghafal empat hal padahal cuma ada satu.

### Alat dan mesin

- **`alat/cek_ruang.py`**, pemeriksa sympy. Jarak, sudut, kedudukan, panjang
  proyeksi, titik tengah, pada kubus, balok, limas, atau titik sembarang.
  Uji bawaan: 20 jawaban benar lolos, 4 jawaban yang sengaja disalahkan ditolak.
- **`alat/soal-ruang-3d.json`**, 70 angka yang dipakai materi, latihan, kuis,
  dan galeri. `python alat/cek_ruang.py alat/soal-ruang-3d.json` → **70 lolos,
  0 salah**, kode keluar 0.
- **`widget/ruang-3d/ruang.ts`**, mesin gambar: matriks putar, proyeksi
  ortografis, bingkai bola yang tidak mengembang saat diputar, rusuk terhalang.
- **`widget/ruang-3d/Bingkai3D.tsx`**, rangka gambar yang dipakai kesembilan
  widget. Ditulis sekali, jadi tidak mungkin ada widget yang lupa menggambar
  rusuk terhalang atau lupa penunjuk skala.

### Cacat yang ditemukan dengan MELIHAT potret layar

Semuanya lolos `tsc` dan `npm run build` tanpa satu pun galat, jadi tidak ada
yang bisa ditemukan tanpa membuka gambarnya.

| Cacat | Sebabnya | Keadaan |
|---|---|---|
| Sudut awal tahap 1 salah, kedua ruas justru tampak TERPISAH sehingga tipuan yang mau ditunjukkan tidak pernah terjadi | sudut awal disalin dari nilai bersama, tidak pernah diperiksa | diperbaiki. Batasnya dihitung dengan menyapu seluruh sudut: ilusinya hanya terjadi di atas 52 derajat |
| Baris keterangan bertindih penunjuk skala di 3 widget | baris kiri dan penunjuk skala kanan ada di baris yang sama, yang kiri kepanjangan | diperbaiki, semua baris kiri dipendekkan di bawah 34 huruf |
| Menarik kubus ikut menyorot huruf A sampai H jadi biru | SVG tanpa `userSelect: none` | diperbaiki |
| Angka sudut menimpa garisnya sendiri di tahap 9 | pada sudut yang tampak sempit, kedua kakinya berdekatan | diperbaiki, angkanya dipindah ke baris bawah, busurnya tetap sebagai penunjuk |
| Judul kartu galeri tertutup lencana CONTOH NYATA | lencana itu milik rangka halaman dan menempel di pojok kiri atas panggung | diperbaiki, nama benda dipindah ke keterangan kartu |
| Penunjuk sudut pandang muncul di gambar yang tidak bisa diputar | dulu selalu digambar | diperbaiki, hanya muncul kalau gambarnya memang bisa ditarik |
| Huruf sudut terpotong ruas berwarna yang lewat di belakangnya | tidak ada halo | diperbaiki, halo warna kartu, cara yang sama seperti label sin dan cos di widget trigonometri |
| **Dua kesalahan geometri di galeri** | acuan mendatar sudut atap diambil ke titik sudut alas, bukan tegak lurus garis tiris. Dan sudut tangga keluar 48 derajat padahal keterangannya menyebut aturan tukang 75 derajat | diperbaiki, keduanya dihitung ulang dan diperiksa mesin |

### Verifikasi yang dijalankan dan DILIHAT

- `python alat/cek_ruang.py --uji` → kode keluar 0.
- `python alat/cek_ruang.py alat/soal-ruang-3d.json` → 70 lolos, 0 salah.
- `rtk proxy "npx tsc --noEmit"` → kode keluar 0.
- `rtk proxy "npm run build"` → lolos, 15 halaman terbangun.
- Potret layar 1366 piksel untuk **kesepuluh materi**, tab Latihan, tab Kuis,
  dan mode kedua tahap 9. Semuanya dibuka dan dinilai satu per satu, bukan
  cuma dibuat.
- Tarikan tetikus diuji sungguhan: sudut berubah dan tulisannya ikut berubah
  dari "tampak berpotongan" menjadi "tampak terpisah".
- Tidak ada tanda em-dash dan tidak ada kata terlarang di seluruh berkas baru.

## Sedang dikerjakan

Tidak ada. Gelombang 1 selesai, menunggu tinjauan ARYA.

## Butuh MASTER

1. **`web/content/topik.ts`, entri `ruang-3d`: `siap: false` → `siap: true`.**
   Halamannya sudah utuh, jadi baris ini yang tersisa. Untuk memotret, berkas
   itu diubah lokal lalu **sudah dikembalikan**; `git status` bersih untuknya.

2. **Warna sudut di `CLAUDE.md` dan `PROGRESS.md` sudah basi.** Keduanya masih
   menulis `#D9A441`, padahal `web/lib/warna.ts` sudah menggantinya jadi
   `#6A4C93`. Saya ikut berkas kode.

3. **HALAMAN TOPIK RUSAK DI LEBAR HP, DAN INI SUDAH TAYANG.** Bukan cacat
   widget saya: topik **Limit yang sudah di-deploy** rusak persis sama di 375
   piksel, kolom kiri dan kanan saling menimpa. Sebabnya `.panggung` di
   `web/app/globals.css` baris 194 memaksa kolom kanan minimal 24rem, dan di
   seluruh berkas itu hanya ada satu media query yang isinya tidak berhubungan.
   Diuji: 1366 baik, 768 baik, 375 rusak. Berkas itu milik MATRA-DESAIN-UI-UX.
   Menurut saya ini paling mendesak dari semua temuan saya, sebab siswa
   kemungkinan besar membukanya dari HP.

## Butuh keputusan ARYA

1. **Galeri tahap 10: gambar sendiri atau foto?** Sekarang empat adegan digambar
   dengan mesin yang sama seperti widget lain (ruang kelas, atap limas, menara
   rangka, tangga). Alasannya foto atap memperlihatkan gentengnya, bukan
   segitiga di baliknya. Kalau ARYA lebih suka foto seperti Tahap 10
   Trigonometri, keempatnya bisa diganti tanpa mengubah apa pun yang lain.

2. **Ketepatan bahasa dan tingkat kesulitan tetap perlu mata ARYA.** Angkanya
   sudah dijamin mesin, tetapi yang paling perlu dicek: tahap 6 (dua cara
   menghitung jarak ke bidang) dan enam soal tingkat "sangat sulit" di bank
   kuis, apakah terlalu berat untuk siswa SMA.

3. **Gelombang 2, video.** Belum dimulai, sesuai aturan: video baru dikerjakan
   setelah halaman disetujui. Kandidat prioritasnya sudah ditulis di rancangan,
   enam video, dipimpin tahap 1 dan tahap 3.

---

# Tinjauan MASTER dan tiga cacat yang berlaku di SEMUA video, 4 September 2026

MASTER menonton keenam lembar kontak dan menemukan dua cacat yang ada di semua
video, yang tidak saya laporkan sebab saya menilai tiap video sendiri-sendiri
dan tidak melihat polanya. Ditambah satu dari daftar saya sendiri.

## 1. Pembuka 15 sampai 20 detik hampir tanpa isi

Itu 20 persen tiap video. STANDAR butir 2, dipertegas 4 Sep: pembuka 3D hanya
di video pertama topik, dan HARUS ada yang terjadi.

Yang mengikat: durasi tiap babak datang dari narasi, dan narasi TIDAK boleh
diubah semaunya. Jadi pemendekan pembuka bukan soal memotong detik, melainkan
soal mengisi detik yang sudah ada.

| Materi | Yang dikerjakan | Alasannya |
|---|---|---|
| 01 | kubus tumbuh dari lantai, lalu cahaya disapukan | narasi babak dua menyebut "di depan kita ada sebuah kotak", jadi kubus PEJAL memang harus ada sampai babak tiga. Yang salah bukan lamanya, tetapi tidak adanya kejadian |
| 01 babak dua | ketiga rusuk dari A menyala satu per satu | narasinya menyebut "panjang, lebar, dan tingginya sama". Sebelumnya kalimat itu cuma diucapkan, layarnya tidak berubah |
| 03 sampai 09 | kubus pejal melebur jadi rangka dalam 5 detik pertama | narasi pembukanya hanya mengumumkan judul materi, tidak menyebut kotak, jadi tidak ada yang dilanggar |

Sapuan cahaya pulang-pergi DITOLAK gerbang waktu: babak "buka" materi 01 cuma
8,26 detik dan animasinya jadi 10,00 detik. Sapuannya dijadikan sekali jalan,
berakhir tepat pada arah cahaya yang benar. Gerbang itu bekerja seperti
seharusnya, dan saya tidak mengakalinya dengan memperpendek narasi.

## 2. Kubus terlihat seperti balok gelap datar. Sebabnya BUKAN kurang cahaya

Ini temuan terpenting hari ini, dan diukur, bukan dinilai dengan mata.

Cahaya bawaan ManimGL ada di (-10, 10, 10), yaitu di BELAKANG kubus untuk kamera
topik ini (theta sekitar -40). Dugaan pertama: pindahkan ke sisi kamera. Hasil
render satu frame, terang pada skala 0 sampai 255:

| Muka | Cahaya dipindah ke (-3, -13, 21) |
|---|---|
| atap | 200 |
| muka kanan | 190 |
| muka kiri | 124 |

Atap dan muka kanan cuma berbeda 10. Kubusnya justru makin rata daripada
sebelumnya. Jadi dugaan itu SALAH, dan `set_shading` ManimGL memang lemah arah.

Yang menyelesaikannya: terang tiap muka ditentukan sendiri. `Prism` ManimGL
terdiri dari enam `Square3D` yang bisa diwarnai satu per satu. Hasil terukur:
**atap 200, muka -y 173, muka +x 122**, jarak antar tingkat 27 dan 52.

Diuji dengan RENDER SATU FRAME, bukan video penuh. Satu frame selesai dalam
hitungan detik, jadi tiga kali percobaan angka masih lebih murah daripada satu
video yang salah.

Atas permintaan MASTER, ilmunya tidak ditinggal di topik ini: `ilustrasi.balok`
DINAIKKAN (bukan dibuat fungsi baru di sebelahnya), dan bayangannya jadi
`ilustrasi.bayangan_lantai(titik_sudut, cahaya)` yang umum untuk bangun apa pun.
Penjaganya `manim/uji/uji_balok_tiga_terang.py`: satu frame, mencetak terang
ketiga muka, dan GAGAL kalau jarak antar tingkat kurang dari 20.

**Peringatan:** `ilustrasi.balok` juga dipakai Statistika materi 5, 6, dan 8
untuk pelat tipis dan sekat. Muka atasnya kini sedikit lebih terang. Ada
`tiga_terang=False` untuk mematikannya.

## 3. Bayangan lantai, dan cacat yang saya buat sendiri lalu temukan sendiri

Bayangannya DIHITUNG, bukan ditempel: kedelapan titik sudut diproyeksikan dari
titik cahaya ke bidang z = 0, lalu diambil lambung cembungnya. Kalau cahayanya
digeser, bayangannya ikut.

Render pertama dengan bayangan ini menghasilkan cacat baru: bayangannya
TERTINGGAL sepanjang video sebagai lembar abu-abu besar bertepi tajam, dan di
materi 04 ia menutupi huruf G. Kubus tembus pandang tidak menjatuhkan bayangan
pekat. Sekarang bayangannya dihapus tepat saat kubus jadi rangka.

Ini contoh kenapa lembar kontak wajib dibuka: perbaikan yang benar secara
niat bisa melahirkan cacat baru, dan lognya tetap bersih.

## 4. Angka sumbu tinggal 0, 3, dan 6

Garis penanda kecil tetap tiap satu satuan supaya skalanya terasa, tetapi
angkanya hanya tiap tiga. Ketiga sumbu bertemu di titik A, jadi angka tiap
satuan membuat pojok itu penuh.

## Materi 03: pandangan sejajar AC

ARYA menyetujui pandangan itu dipertahankan, dengan syarat narasi memberi
aba-aba dan perputaran kameranya diperlihatkan. Naskah babak "tutup" sudah
diberi kalimat pembuka: "Sekarang kameranya kita putar pelan ke arah A C. Dari
arah ini A C tampak berdiri tegak walaupun ia tergeletak di lantai, dan justru
karena itu sudut siku-siku di Q terlihat dalam ukuran yang sebenarnya."
Narasinya sudah dibuat ulang, 79,2 detik jadi 91,8 detik. Belum dirender.

## Keadaan render

| Materi | Keadaan | Selisih gambar dan suara |
|---|---|---|
| 01 | dirender ulang, lembar kontak dinilai | 0,15 detik |
| 04 | dirender ulang, lembar kontak dinilai | 0,12 detik |
| 03 | kode dan narasi siap, MENUNGGU giliran render | belum |
| 06, 08, 09 | kode siap, menunggu penilaian MASTER atas 01 dan 04 | belum |

Render lewat `alat/antre_render.py` (bukan `manim/antre_render.py`), sebab
Statistika sedang merender sebelas video dan kartu grafisnya satu.

# Empat cacat yang ketahuan karena videonya DILIHAT, 4 September 2026

Sesi ini dimulai dengan satu utang yang jelas: keenam berkas adegan sudah
ditulis ulang ke standar video versi 2 pada 3 September, tetapi hanya tiga yang
sudah dirender ulang, dan versi 480p bersuara yang ada di `media/uji-480p/`
semuanya masih hasil render 2 September. Artinya kalau ARYA menonton saat itu,
yang dinilainya adalah versi yang sudah dibatalkan.

Sambil melunasi utang itu, empat cacat tertangkap. Tidak satu pun muncul di
log render, dan dua di antaranya ada di berkas bersama `manim/gl/`, jadi
topik lain ikut terbawa.

## 1. Video materi 04 lebih panjang 1,62 detik daripada narasinya

Ketahuan bukan dari melihat, melainkan karena `gabung_audio.py` MENOLAK
menggabungkan: selisih 1,62 detik melewati batas 1,5 detik. Alat itu bekerja
persis seperti yang diharapkan.

Sebabnya bukan naskah dan bukan durasi.json. `papan.tumbuh(...)` dengan kata
alasan memakai 3,2 detik (1,2 untuk morph lambang, lalu 0,5 + 1,0 + 0,5 untuk
kata alasan yang muncul, ditahan, dan memudar), tetapi kode adegan mencatatnya
`b.catat(1.7)` dengan tangan.

Yang membuatnya berbahaya: `Babak.tutup()` TIDAK menggagalkan render. Kelebihan
1,5 detik itu masuk lewat waktu yang tidak tercatat, sehingga bacaan `b.sisa`
ikut salah dan babak mengira dirinya masih punya sisa waktu, lalu menambah
diam di ujungnya. Angka yang salah membuat pemeriksanya ikut salah.

Perbaikan di `manim/gl/sinema.py`: `tumbuh()` dan `baris()` sekarang menerima
`b=` dan mencatat waktunya sendiri, sama seperti `lahir_rumus` yang sudah
begitu sejak awal. Adegan tidak lagi boleh menebak.

Hasil setelah diperbaiki dan dirender ulang: selisih **0,12 detik**.

## 2. Identitas kubus terbaca "p = 1 = t = 6 satuan"

Ini yang paling lama tidak ketahuan, dan paling memalukan: tampil di SETIAP
detik di KEENAM video sejak 2 September. Huruf "l" (lebar) pada huruf serif
ukuran 24 tidak bisa dibedakan dari angka "1". Dipastikan dengan memperbesar
potongan layarnya, bukan dengan menduga.

Siswa membaca "p = 1", lalu di ujung kalimat yang sama membaca "= 6 satuan".
Kalimatnya membantah dirinya sendiri.

Sekarang ditulis penuh: **"panjang = lebar = tinggi = 6 satuan"**, yaitu kalimat
yang ARYA minta di putaran revisi 2 September malam. Versi singkat "p = l = t"
adalah pemendekan yang dilakukan sendiri, bukan permintaannya. Lebarnya diukur
dulu sebelum dipakai: 3,86 dari jatah zona identitas 4,55, jadi tidak menyusut.

**Untuk MASTER:** contoh di `docs/tugas/STANDAR-ILUSTRASI-VIDEO.md` butir 1
menuliskan `"p = l = t = 6 satuan"` sebagai patokan identitas. Sesi mana pun
yang menyalin contoh itu akan kena hal yang sama. Contohnya perlu diganti.

## 3. Huruf titik A menindih angka 0 di pojok sumbu

Terbaca seperti "A0". Sebabnya keduanya dilempar ke arah diagonal yang sama
dari titik asal: huruf sudut sejauh 0,92 dan naik 0,38, angka nol sejauh 0,62.
Jadi keduanya berdiri persis satu di atas yang lain. Angka nolnya sekarang
didorong ke 1,15.

## 4. Rumus di panel saling menindih, dan qc buta terhadapnya

Yang paling merusak. Di materi 09, baris `theta = 35,26 derajat` jatuh TEPAT DI
DALAM penyebut pecahan `tan theta = 6 per 6 akar 2` di atasnya. Keduanya jadi
coretan yang tidak terbaca. Terjadi dua kali di video yang sama, untuk theta
dan untuk phi.

Sebabnya `PapanRumus.tempat_baris` menaruh tiap baris pada slot berjarak TETAP
0,62 satuan, padahal rumus pecahan dua tingkat lebih tinggi daripada itu.

Kenapa gerbang mutu tidak menangkapnya: adegan menyerahkan papan ke
`qc.periksa_adegan` sebagai SATU benda (`"panel": papan.semua()`), jadi yang
diperiksa adalah tabrakan papan dengan benda LAIN, bukan tabrakan di dalam
papan itu sendiri. Ini lubang yang perlu diketahui sesi lain: apa pun yang
diserahkan ke qc sebagai satu kelompok, isinya tidak saling diperiksa.

Sekarang tiap baris ditumpuk dari BAWAH benda yang sudah ada di papan. Diukur
sebelum render, bukan dikira-kira: dulu bertindih 0,15 satuan, sekarang
berjarak 0,16 satuan.

## Cara memeriksanya

Tiap video: `gabung_audio.py --uji` (yang juga memeriksa sinkron gambar dan
suara), lalu `cek_video.py --per-detik 0.25` untuk lembar kontak, lalu lembar
kontaknya DIBUKA dan dinilai. Untuk hal yang tidak terbaca di lembar kontak
(huruf identitas, pojok sumbu, panel rumus), frame penuh diambil dengan
`--detik`, lalu bagian yang diragukan dipotong dan diperbesar 4 kali dengan
ffmpeg. Tiga dari empat cacat di atas hanya kelihatan setelah diperbesar.

## Hasil: keenam video dirender ulang dan diperiksa

| Materi | Adegan | Selisih gambar dan suara | Lembar kontak dinilai |
|---|---|---|---|
| 01 | GambarBolehBerbohong | 0,11 detik | ya, plus dua potongan diperbesar |
| 03 | JarakSelaluTerpendek | 0,11 detik | ya, plus frame penuh detik 14 dan 70 |
| 04 | DuaKaliPythagoras | 0,12 detik (dari 1,62) | ya |
| 06 | JarakTitikKeBidang | 0,14 detik | ya |
| 08 | SudutGarisBersilangan | 0,15 detik | ya |
| 09 | SudutDenganBidang | 0,11 detik | ya, plus panel diperbesar di detik 44 dan 78 |

Semuanya ada di `media/uji-480p/`, berikut salinan `-bersubtitle.mp4` untuk
ditonton ARYA. Sengaja TIDAK disalin ke `web/public/anim/`: 480p adalah versi
tinjauan, dan `tahap.ts` baru diisi setelah versi 1080p dibuat.

## Cacat yang MASIH tersisa, disebut apa adanya

1. **Materi 01 membuka dengan sekitar 20 detik kubus pejal yang berputar
   pelan**, tanpa unsur baru masuk. Bukan layar mati, tetapi lambat untuk
   pembuka. Keputusan ARYA: dipercepat, atau diberi sesuatu untuk dilihat.
2. **Materi 03 memandang kubus hampir sejajar diagonal alas AC**, sehingga AC
   tergambar seperti garis tegak di layar. Ini DISENGAJA, sebab memandang
   sejajar sebuah garis adalah satu-satunya cara menampilkan sudut siku-siku
   di titik kaki dalam ukuran sebenarnya. Tetapi tanpa aba-aba, siswa bisa
   mengira alas kubus berdiri tegak. Perlu penilaian ARYA.
3. **Penunjuk nilai hidup materi 03 terbaca "BQ 5,160" tanpa tanda sama
   dengan.** `sinema.nilai_hidup` memang menempelkan label ke angka tanpa
   tanda hubung. Berkas bersama, jadi tidak diubah sendiri.
4. **Angka sumbu masih rapat di dekat titik A.** Angka nol sudah tidak
   menindih huruf A, tetapi kolom angka sumbu y dan sumbu z masih berdekatan
   di pojok yang sama.
5. **Huruf titik sudut kecil di 480p.** Akan membaik sendiri di 1080p; jangan
   dibesarkan sekarang, sebab ukurannya sudah pas terhadap kubusnya.
6. `manim/cek_video.py` sesekali membuat lembar kontak 1 frame per detik walau
   diminta 0,25 (terjadi pada materi 01 dan 09). Tidak merusak, hasilnya justru
   lebih rapat, tetapi ukurannya jadi 4.700 piksel dan perlu diketahui.

## Butuh MASTER

1. Contoh identitas `"p = l = t = 6 satuan"` di `STANDAR-ILUSTRASI-VIDEO.md`
   butir 1 perlu diganti dengan bentuk yang tidak bisa dibaca sebagai angka.
   Sesi lain akan menyalin contoh itu apa adanya.
2. Lubang di gerbang mutu yang perlu diumumkan: apa pun yang diserahkan ke
   `qc.periksa_adegan` sebagai SATU kelompok, isinya tidak saling diperiksa.
   Panel rumus lolos dengan dua baris bertindih persis karena ini.
3. `manim/gl/sinema.py` diubah di commit tersendiri (`04df8e3`), semua topik
   ikut terbawa: `tumbuh`/`baris` bisa mencatat waktu sendiri lewat `b=`, dan
   baris papan ditumpuk dari bawah benda sebelumnya.

# Revisi tata letak layar dari ARYA, 2 September 2026 malam (putaran kedua)

ARYA menonton video hasil putaran pertama dan memberi lima revisi. Empat di
antaranya berlaku UNIVERSAL untuk semua topik, bukan cuma Ruang 3D, jadi
MASTER perlu meneruskannya.

## Yang diminta, apa adanya

1. Sumbu Z ditampilkan di awal saja untuk memberi tahu siswa, lalu dihilangkan,
   dan dimunculkan lagi hanya saat tinggi benar-benar dipakai menghitung.
2. Keterangan di kaki layar dihapus sebab maknanya dobel dengan subtitle.
   Diganti label yang menempel pada bendanya.
3. Identitas kubus dipindah ke sudut layar, dengan bahasa matematika:
   "panjang = lebar = tinggi = 6 satuan".
4. Panel rumus jangan menindih subtitle, dan pakai cara 3b1b: sebelum
   pernyataan matematika muncul, tunjukkan dulu rumusnya berasal dari mana.
5. Pinggiran gambar kurang halus (anti-aliasing).

## Tata letak layar yang disepakati, berlaku di keenam video

| Bagian | Isinya |
|---|---|
| kiri atas | identitas benda, menetap: `p = l = t = 6 satuan` |
| kanan atas | hitungan, muncul saat dipakai |
| kaki layar | MILIK SUBTITLE, tidak ditempati apa pun |
| dalam gambar | label yang menempel pada benda yang dibahas |

Kiri atas dipilih untuk identitas, bukan kanan atas, sebab kanan atas sudah
milik panel rumus. Mata jadi punya satu aturan yang sama di keenam video: kiri
adalah bendanya, kanan adalah hitungannya.

## Koordinat kubus dibetulkan lebih dulu

Tidak diminta, tetapi wajib dikerjakan sebelum angka sumbu dipasang. Versi
sebelumnya memusatkan kubus di titik asal sehingga titik A jatuh di (-3, -3, 0),
padahal di halaman dan di `alat/cek_ruang.py` titik A ada di (0, 0, 0). Memasang
angka tanpa membetulkan ini akan membuat siswa membaca dua koordinat yang saling
bertentangan, dan itu lebih buruk daripada tidak ada angka sama sekali.

## Anti-aliasing: sebabnya ditemukan, dan hasilnya diukur

`Scene.samples` bawaan ManimGL adalah 0, artinya penghalusan pinggiran memang
MATI. ManimGL sendiri memakai 4 untuk adegan tiga dimensi bawaannya;
`AdeganMatra` cuma kebetulan mewarisi angka nol.

Perbaikannya satu baris di `manim/gl/tema.py`, dan itu berkas MASTER, jadi
commit tersendiri. **Semua topik ikut membaik, bukan cuma Ruang 3D.**

Jebakan yang perlu diketahui sesi lain: `samples` adalah atribut kelas Scene,
BUKAN bagian `default_camera_config`. Menaruhnya di config kamera menghasilkan
galat "got multiple values for keyword argument 'samples'".

Hasilnya diukur, bukan dirasakan: lompatan warna tajam antar piksel turun dari
1332 ke 1241 (sekitar 7 persen), dan piksel peralihan bertambah, tanda
penghalusan bekerja. **Tetapi jujur: penyebab utama kekasaran adalah resolusi
480p itu sendiri.** Gelombang 3 di 1080p akan jauh lebih berpengaruh daripada
setelan ini.

## Cacat yang ditemukan di putaran ini

| Cacat | Sebabnya | Keadaan |
|---|---|---|
| **Sumbu z tidak pernah benar-benar hilang** walau sudah dipudarkan | label sumbu punya updater yang menggambar ulang dirinya dari bentuk asli tiap frame, jadi kepekatan yang diubah `FadeOut` langsung ditimpa pada frame yang sama | diperbaiki: kepekatan dikendalikan DARI DALAM updater lewat `ValueTracker`. Ini jenis bug yang tidak mungkin ketahuan dari log dan tidak mungkin ketahuan dari membaca kode, sebab kodenya terbaca benar |
| Garis pandu ke sumbu z tidak terlihat sedikit pun | titik (0, 0, 6) itu titik E, jadi garis pandunya berimpit persis dengan ruas EG yang merah | diganti dua penanda yang saling menguatkan: angka 6 di sumbu z disorot ungu, dan tinggi tiang diberi label |
| Angka ketiga sumbu berkumpul dan bertumpuk di sekitar titik A | ketiga sumbu bertemu di A, jadi angka-angka kecilnya berdesakan di pojok yang sama | sumbu z hanya diberi angka setiap TIGA satuan dan didorong lebih jauh. Yang dibutuhkan dari sumbu z cuma rasa skala dan angka 6 di puncak |
| Label diagonal AC terbaca "akar 2" saja di materi 04 | angka 6-nya tertutup rangka kubus pada sudut kamera penutup | diperbaiki, digeser ke sisi depan. Ini BUKAN cacat kosmetik: siswa bisa mengira AC panjangnya akar 2 |

## Kendala teknis yang perlu diketahui sesi lain

Tugas latar Claude Code memotong render yang terlalu lama, tanpa pesan galat:
tracebacknya terpotong di tengah dan prosesnya mati dengan pipa tertutup. Sejak
tiap video punya 29 label sumbu, 8 huruf sudut, dan label nilai yang menempel,
dua video paralel sudah melewati batas itu.

Jalan keluarnya: lepas prosesnya dari tugas latar.

    Start-Process -FilePath "manimgl" -ArgumentList "manim/scenes/<berkas>.py","<Adegan>","-w","-l" `
        -RedirectStandardOutput "$env:TEMP\<nama>.log" -NoNewWindow -PassThru

Proses yang dilepas tidak terikat batas waktu tugas latar, dan hasilnya
diperiksa belakangan lewat berkas keluarannya.

## Yang perlu diteruskan MASTER ke sesi lain

1. `samples = 4` sudah dipasang di `manim/gl/tema.py`, jadi semua topik ikut
   membaik. Jebakan atribut kelas versus config kamera ada di komentarnya.
2. Satu baris di `manim/buat_subtitle.py` supaya naskah boleh punya bentuk
   TULIS terpisah dari bentuk UCAP.
3. Tata letak layar empat bagian di atas layak jadi aturan bersama, bukan cuma
   milik Ruang 3D. Kalau tiap topik menaruh keterangannya di tempat berbeda,
   siswa harus belajar tata letak baru di tiap topik.
4. Label yang punya updater TIDAK BISA dipudarkan dengan `FadeOut`. Sesi mana
   pun yang memakai `always_redraw` atau updater `become` akan kena hal yang
   sama.

# Revisi ARYA atas video, 2 September 2026 malam

Catatan berjalan. ARYA menonton keenam video dan memberi revisi yang berlaku
UNIVERSAL, bukan per video. Ditulis di sini supaya MASTER bisa meneruskannya ke
sesi lain, sebab tiga dari lima butir mengenai semua topik, bukan cuma Ruang 3D.

## Yang diminta ARYA, apa adanya

1. "Wajib memberikan satuan angka pada titik koordinat X Y nya, jangan dibiarkan
   polos, siswa sulit melihatnya."
2. "Bila perlu buatkan sumbu Z beserta satuan angkanya jika suatu saat
   membicarakan masalah tinggi."
3. "Wajib juga menuliskan semua titik pada bangun 3 dimensi, walaupun dia tidak
   dipergunakan, tapi tetap diberikan warna yang berbeda karena dia yang akan
   disorot saat itu."
4. Subtitle: harus ada, harus memuat SELURUH kalimat narator, tetapi ditulis
   dengan lambang, bukan kata. "Tujuh puluh dua" ditulis 72, "akar" ditulis
   dengan lambang akarnya, "ruas AB" ditulis AB dengan garis di atasnya.
   Subtitle juga tidak boleh menghalangi gambar atau objek matematika.
5. Video 01 khusus: "Darimana jarak 6 satuan itu? mohon diperjelas lagi dengan
   memberikan tinggi 6 satuan misalnya di atas sumbu Z."

## Yang sudah dikerjakan

### Koordinat kubus dibetulkan lebih dulu, sebelum angka dipasang

Ini tidak diminta, tetapi wajib dikerjakan supaya permintaan nomor 1 tidak
menjadi jebakan. Versi pertama video memusatkan kubus di titik asal, sehingga
titik A jatuh di (-3, -3, 0). Begitu sumbu diberi angka, siswa akan membaca
A(-3, -3, 0) padahal di HALAMAN dan di `alat/cek_ruang.py` titik A ada di
(0, 0, 0). Angka yang saling bertentangan lebih buruk daripada tidak ada angka.

Kubus digeser: A di titik asal, B di enam pada sumbu x, D di enam pada sumbu y,
E di enam pada sumbu z. Sekarang video, halaman, dan pemeriksa sympy memakai
koordinat yang sama persis.

### Papan koordinat berangka (`papan_koordinat` di `ruang_3d_umum.py`)

Sumbu x, y, z dengan panah, tanda centang di tiap satuan, dan angka 1 sampai 6
di ketiganya, plus angka 0 di titik asal. Sumbunya digambar tipis dan redup,
berimpit dengan rusuk AB, AD, dan AE. Menggesernya keluar kubus akan lebih rapi
dipandang tetapi salah: sumbu harus lewat titik asal, dan titik asal adalah A.

Ada parameter `tekan` untuk MENYOROT angka tertentu (dipakai video 01 untuk
angka 6 di sumbu z).

### Kedelapan huruf titik sudut, selalu

`huruf_sudut` sekarang menulis A sampai H tanpa kecuali. Yang sedang dibahas
diberi warna dan ukuran lebih besar; sisanya redup dan lebih kecil. Persis
permintaan nomor 3.

### Video 01: dari mana angka enam itu

Garis putus-putus ungu menarik titik silang atas MENDATAR ke sumbu z, tepat di
angka 6 yang disorot ungu dan diperbesar. Jadi enam satuan tidak diumumkan
begitu saja lewat panel; siswa bisa membacanya sendiri di sumbu, sejajar dengan
ujung tiang ungu.

### Subtitle: isi utuh, bentuk ringkas

Naskah narasi sekarang boleh memuat field `subtitle` di tiap segmen: bentuk
TULIS yang berbeda dari bentuk UCAP. Yang diucapkan "tujuh puluh dua" ditulis
"72"; "enam akar tiga" ditulis "6√3"; "ruas AC" ditulis dengan garis di atas
hurufnya memakai U+0305, sehingga bekerja di WebVTT tanpa menyentuh CSS situs
yang bukan wilayah sesi ini. Isinya UTUH, seluruh kalimat narator muncul.

Keenam berkas `.vtt` dibuat, dan disalin juga ke `media/uji-480p/` di sebelah
mp4-nya, supaya ARYA melihat subtitle saat menonton di pemutar biasa. Subtitle
tidak dibakar ke gambar, jadi tidak mungkin menghalangi objek matematika, dan
bisa dimatikan (alasan yang sama yang dipakai sejak 31 Agustus).

## BUTUH MASTER: satu baris di `manim/buat_subtitle.py`

Berkas itu bukan wilayah saya, jadi perubahannya dibuat sebagai commit
tersendiri sesuai aturan. Isinya satu baris:

    potongan = [tebalkan(x) for x in pecah(seg.get("subtitle") or seg["teks"])]

Mundur-kompatibel penuh: naskah yang tidak punya field `subtitle` berjalan
persis seperti sebelumnya. Tanpa baris ini, permintaan ARYA nomor 4 tidak bisa
dipenuhi oleh sesi mana pun.

## Yang perlu diteruskan MASTER ke sesi lain

Butir 1, 2, dan 4 berlaku untuk SEMUA topik yang menggambar sumbu koordinat,
bukan cuma Ruang 3D. Grafik Fungsi dan Statistika kemungkinan besar kena butir
yang sama. Ongkosnya sudah saya ukur, bukan ditebak: 29 label yang harus
diputar mengikuti kamera tiap frame membuat render berjalan 5,5 frame per
detik, jadi video 85 detik selesai sekitar 9 menit di 480p. Masih murah.

## Hasil akhir revisi, keenam video dirender ulang

| Materi | Durasi | Ukuran | Selisih suara | Sumbu z |
|---|---|---|---|---|
| 01 Gambar ruang boleh berbohong | 84,7 dtk | 4,7 MB | 0,15 dtk | ada |
| 03 Jarak selalu yang terpendek | 79,2 dtk | 3,6 MB | 0,14 dtk | tidak |
| 04 Dua kali Pythagoras | 82,7 dtk | 4,6 MB | 0,09 dtk | ada |
| 06 Jarak titik ke bidang | 84,1 dtk | 4,2 MB | 0,14 dtk | ada |
| 08 Sudut dua garis bersilangan | 74,9 dtk | 3,7 MB | 0,15 dtk | tidak |
| 09 Sudut dengan bidang | 93,8 dtk | 4,8 MB | 0,11 dtk | ada |

Berkas `.vtt` ada di `web/public/anim/` untuk situs, dan disalin juga ke
`media/uji-480p/` di sebelah mp4-nya supaya subtitle ikut muncul saat ARYA
menonton di pemutar biasa.

### Cacat yang ditemukan di putaran revisi ini

| Cacat | Sebabnya | Keadaan |
|---|---|---|
| Angka sumbu y dan z bertumpuk jadi dua deret berdempetan di tepi kiri, paling parah di materi 03 | arah keluar keduanya hampir sama, benar secara ruang tetapi saling menimpa di layar | diperbaiki, arah keluar sumbu z diganti, dan materi 03 serta 08 tidak lagi memakai sumbu z sama sekali |
| Garis pandu dari puncak tiang ke sumbu z tidak terlihat sedikit pun (materi 01) | titik (0, 0, 6) itu titik E, jadi garis pandunya berimpit persis dengan ruas EG yang merah | diganti dua penanda: angka 6 di sumbu z disorot ungu, dan tinggi tiang diberi label di sampingnya |
| Kedelapan huruf HILANG di bagian kedua materi 09 | huruf ide pertama saya hapus saat pindah ide, padahal revisi ARYA justru mewajibkan semua titik tetap tertulis | diperbaiki dengan DUA set huruf yang ditukar, bukan dihapus. Sorotnya berpindah dari A, C, G ke B, D, G mengikuti ide yang dibahas |
| Babak "turun" materi 01 kelebihan 0,20 detik | animasi garis pandu ditambahkan tanpa menambah jatah waktunya | ditangkap gerbang waktu `sinema.babak`, bukan mata saya |

### Cacat yang tersisa, disebut apa adanya

1. **Angka sumbu z berbaur dengan badan kubus** di materi 01, 04, 06, dan 09.
   Sumbu z berdiri di rusuk AE, dan angkanya harus keluar ke salah satu sisi.
   Ke sisi mana pun ia keluar, pada sebagian sudut kamera ia akan berada di
   depan kubus yang tembus pandang. Masih terbaca dan tidak menabrak teks mana
   pun. Menurut saya ini pilihan terbaik dari dua yang sama-sama tidak
   sempurna, bukan sesuatu yang layak dikejar dengan render ulang lagi.
2. Empat cacat tersisa dari putaran sebelumnya masih berlaku: huruf B dan D
   sedikit lebih kecil daripada E dan G pada pandangan atas, huruf C agak pudar
   saat tertutup bidang tembus pandang, dua tanda siku-siku di titik P
   bertumpuk pada sudut kamera penutup, dan satu segmen narasi materi 06
   berdurasi 18,5 detik.

---

# Gelombang 2: KEENAM video Ruang 3D selesai (ManimGL)

2 September 2026, malam. Cabang diselaraskan ke master (8d7491e) lebih dulu,
merge bersih tanpa konflik.

## Hasil

| Materi | Berkas | Durasi | Ukuran | Selisih suara |
|---|---|---|---|---|
| 01 Gambar ruang boleh berbohong | `media/uji-480p/ruang-3d-01.mp4` | 84,7 dtk | 4,2 MB | 0,11 dtk |
| 03 Jarak selalu yang terpendek | `ruang-3d-03.mp4` | 79,2 dtk | 3,3 MB | 0,14 dtk |
| 04 Dua kali Pythagoras | `ruang-3d-04.mp4` | 82,7 dtk | 4,1 MB | 0,09 dtk |
| 06 Jarak titik ke bidang | `ruang-3d-06.mp4` | 84,1 dtk | 3,8 MB | 0,14 dtk |
| 08 Sudut dua garis bersilangan | `ruang-3d-08.mp4` | 74,9 dtk | 3,4 MB | 0,15 dtk |
| 09 Sudut dengan bidang | `ruang-3d-09.mp4` | 93,8 dtk | 4,3 MB | 0,11 dtk |

Total 8 menit 20 detik. Semua 480p, semua sudah bersuara.

## Tiga aturan baru dari master, semuanya dipenuhi

1. **Semua huruf LaTeX** (keputusan ARYA 2 Sep siang). Video 01 yang sudah jadi
   pagi tadi DIRENDER ULANG, sebab `gl.teks` sudah berganti dari Constantia ke
   `TexText`.
2. **Pembuka wajib mengumumkan materinya** (STANDAR-MENGAJAR bagian 5 aturan 8).
   Tiap naskah dapat segmen `buka` baru, dan judul di layar memuat nomor yang
   sama dengan yang diucapkan: "Materi 04: Dua kali Pythagoras". Pembukanya
   dipilih menurut POSISI materi, tidak seragam: materi 01 memakai bentuk
   "materi pertama sebuah topik", materi 03 dan 04 mengaitkan ke materi
   sebelumnya, materi 08 memakai bentuk "membalik dugaan" sebab tahap itu punya
   `seringKeliru` yang kuat, materi 09 menyebut dirinya materi terakhir sebelum
   penerapan.
3. **`*kata*` jadi tebal.** Satu sampai dua penegasan per segmen, dan penanda
   yang sama dipakai di keterangan layar.

## Perkakas bersama topik ini: `manim/scenes/ruang_3d_umum.py`

Ditulis supaya kelima video baru tidak mengulang kesalahan yang sudah dibayar
mahal di video pertama. Isinya bukan rancangan di atas kertas, semuanya hasil
percobaan yang gagal lebih dulu:

- `label_hadap`: huruf yang selalu menghadap kamera DAN berukuran tetap di layar.
- `penanda` dan `lingkaran_hadap`: penanda titik yang tidak hilang di balik
  benda tembus pandang.
- `huruf_sudut`: dorongan huruf MENDATAR saja, tidak pernah ke bawah.
- `siku` dan `busur`: tanda siku-siku dan busur sudut yang benar-benar berdiri
  di bidang segitiganya, jadi tetap benar dari sudut kamera mana pun.
- `isi_sisa`: sisa waktu babak dipakai untuk gerakan kamera panjang, bukan untuk
  diam. Ini yang menghapus waktu mati tanpa harus menebak durasi narasi.

## Cacat yang ditemukan, dan bagaimana ditemukannya

### Ditemukan oleh gerbang mutu (render GAGAL, bukan lolos diam-diam)

**`qc.periksa_adegan` menggagalkan render materi 03**: huruf A menindih baris
keterangan, irisan 0,13 kali 0,08 satuan layar. Sebabnya huruf titik sudut
didorong keluar mengikuti arah tiga dimensi dari pusat kubus, sehingga huruf
titik ALAS ikut terdorong TURUN ke kaki layar. Diperbaiki di perkakas bersama,
dorongan sekarang mendatar saja, dan kelima video lain ikut sembuh sebelum
sempat salah.

### Ditemukan dengan MELIHAT lembar kontak

| Cacat | Video | Sebabnya |
|---|---|---|
| Titik sudut A jatuh tepat di baris keterangan, dan garis diagonal serta busur sudut MENEMBUS tulisannya | 04, 06, 08 | keterangan sekarang tanpa alas (keputusan ARYA sore), jadi apa pun yang lewat di belakangnya terlihat menembus huruf. Diperbaiki: kamera dipusatkan lebih rendah (z = 2,6) dan bingkai dilebarkan (13,5), memberi ruang kosong di kaki layar |
| Huruf A, C, G ide pertama masih tertinggal saat ide kedua dibahas, dan huruf A terpotong tepi bawah | 09 | layar menyimpan sisa gagasan yang sudah selesai. Diperbaiki: ketiganya dihapus saat masuk babak garis potong |
| Huruf P tertutup penanda bulatnya sendiri | 09 | labelnya ditaruh tepat di bawah titiknya. Digeser menyamping |
| Busur 60 derajat menyusut jadi coretan kecil di pojok | 08 | titik A jauh dari kamera. Jari-jari busur dinaikkan dari 1,1 ke 2,0 |

Setelah itu saya menambahkan pemeriksaan pasangan **"huruf A lawan keterangan"**
di empat video, supaya kalau cacat ini terulang, rendernya GAGAL dan ketahuan,
bukan lolos seperti sebelumnya.

## Daftar periksa STANDAR-ILUSTRASI-VIDEO.md, berlaku untuk keenam video

- [ya] Benda nyata dari `gl.ilustrasi`: kubus dari `ilustrasi.balok` (prisma
  bercahaya) di atas `lantai_kisi`. Tiap video dibuka dengan kubus PEJAL, baru
  dibuat tembus pandang, supaya siswa melihat benda dulu baru matematikanya.
  Lingkaran ungu adalah titik MATEMATIKA, bukan benda.
- [ya] Latar hidup, dan updater menjaga dunia bergerak saat narator diam.
  `isi_sisa` memberikan sisa waktu tiap babak kepada gerakan kamera, jadi tidak
  ada babak yang berakhir dengan layar diam.
- [ya] Kamera mulai dari dunia, satu gerakan panjang per babak, tidak ada
  sentakan. Gerakan terpanjang 10 detik (batas atas anjuran ILMU-3B1B).
- [ya] Huruf, penanda, panah di dunia; rumus di panel HUD. Tidak ada layar
  kosong berisi rumus saja.
- [ya] Satu warna satu makna, ditetapkan di kepala tiap berkas adegan dan
  dipatuhi sampai frame terakhir. Tidak ada kode heksa, `cek_kode` bersih.
- [ya] `teks()` untuk kata, `rumus()` untuk angka. Satuan `\mathrm`.
- [ya] Semua animasi di dalam `sinema.babak`; jeda 1,6 detik sesudah pertanyaan
  di materi 01.
- [ya] `cek_kode` bersih untuk keenamnya; `qc.periksa_adegan` di TIAP babak
  (37 pemeriksaan seluruhnya); lembar kontak dibuka dan dinilai tiap render;
  `gabung_audio --uji` jalan dengan selisih 0,09 sampai 0,15 detik.
- [ya] Cacat tersisa disebut di bawah.

## Cacat yang MASIH tersisa, disebut apa adanya

1. **Huruf B dan D sedikit lebih kecil daripada E dan G pada pandangan atas**
   (materi 01). Skala menurut jarak sudah sangat mengurangi bedanya, tetapi
   belum menyamakannya persis, sebab perspektif ManimGL tidak sepenuhnya
   sebanding dengan jarak lurus.
2. **Huruf C pudar** di materi 04 dan 08, sebab tertutup bidang segitiga yang
   tembus pandang di depannya. Masih terbaca, tetapi tidak setegas huruf lain.
3. **Dua tanda siku-siku di titik P** (materi 09) bertumpuk jadi satu bentuk
   kecil pada sudut kamera penutup. Keduanya benar secara geometri, tetapi mata
   sulit membedakan mana yang milik PC dan mana yang milik PG.
4. **Segmen "volume" materi 06 berdurasi 18,5 detik**, di atas anjuran 6 sampai
   15 detik walau masih di bawah batas 20. Memecahnya berarti menambah satu
   babak lagi; menurut saya lebih baik dibiarkan sampai ARYA menilai apakah
   terasa panjang saat ditonton.

## Butuh keputusan ARYA

1. **Tonton keenamnya**, lalu putuskan mana yang perlu diulang. Yang paling
   perlu dinilai menurut saya: materi 03 (apakah geseran titik Q cukup pelan
   untuk diikuti) dan materi 09 (isinya dua ide besar dalam satu video 94 detik,
   paling panjang di antara keenamnya).
2. Kalau semuanya lolos, langkah berikutnya gelombang 3: render 1080p60.

---

# Gelombang 2, video pertama: materi 01 "Gambar ruang boleh berbohong"

2 September 2026, malam. ManimGL 1.7.2. Cabang sudah diselaraskan ke master
(51c7c53) lebih dulu, merge bersih tanpa konflik.

## Pemanasan perkakas di worktree ini

| Perintah | Hasil |
|---|---|
| `manimgl manim/uji/uji_cahaya_gl.py UjiCahayaTerang -w -l` | jalan, 10 detik, lembar kontak dibuka: permukaan bercahaya, jala, kamera terbang, latar krem, tidak ada tindihan |
| `manimgl manim/uji/uji_ilustrasi_gl.py Etalase -w -l` | jalan, kedelapan benda tampil (perahu, mobil, orang, bola, balok, silinder, air, lantai kisi) |

Perkakas `manim/gl/` bekerja penuh di worktree ini.

## Berkas yang dibuat

- `manim/narasi/ruang-3d-01.json`: 6 segmen, 941 huruf, 76,46 detik.
- `audio/ruang-3d-01/`: enam potongan suara + `durasi.json` (edge-tts, id-ID-ArdiNeural).
- `manim/scenes/ruang_3d_01.py`: adegan `GambarBolehBerbohong`, 6 babak.
- `media/uji-480p/ruang-3d-01.mp4`: 3,62 MB, 76,44 detik, selisih suara 0,14 detik.

## Kenapa video ini memang layak 3D

Bukan karena topiknya kebetulan tiga dimensi. Seluruh isi materi 01 adalah
tentang KAMERA yang berbohong: di halaman siswa membongkarnya dengan menarik
kubusnya sendiri, dan di video kamera itulah tokoh utamanya. Kamera naik ke
pandangan atas selama 8 detik dan tipuan lahir di depan mata; lalu turun 8,5
detik dan tipuan itu runtuh. Gambar diam tidak bisa melakukan itu, dan itulah
alasan 3D-nya.

## EMPAT RENDER, dan apa yang ditemukan di tiap lembar kontak

Keempatnya keluar dengan kode 0 dan tulisan "File ready". Tidak satu pun cacat
di bawah ini yang bisa ditemukan dari log.

### Render 1: empat cacat

| Cacat | Sebabnya |
|---|---|
| **Empat detik pembuka layarnya kosong** padahal narator berkata "di depan kita ada sebuah kotak" | kubus baru di-`FadeIn` sesudah judul selesai. Gambar membantah narasinya sendiri, persis yang dilarang gerbang video |
| **Tulisan "6 satuan" TERCERMIN**, terbaca terbalik di layar | `apply_matrix(frame.get_inverse_camera_rotation_matrix())` ternyata ikut memantulkan |
| Huruf B dan D menyusut sampai tidak terbaca di pandangan atas | huruf berukuran DUNIA. B dan D di lantai berjarak enam satuan lebih jauh dari kamera daripada E dan G di atap |
| Penanda titik silang jadi coretan lonjong saat kamera turun | lingkaran datar di bidang xy: sempurna dari atas, memipih dari samping |

Perbaikannya: kubus ada sejak frame pertama; huruf diputar dengan dua putaran
yang bisa dibaca maksudnya (miringkan sebesar phi, lalu putar sebesar theta)
dan diperbesar sebanding jaraknya ke kamera sehingga ukurannya di LAYAR tetap;
lingkaran diganti bola.

### Render 2: satu cacat lama sembuh, satu cacat BARU yang lebih parah

Huruf tidak lagi tercermin dan ukurannya seragam. Tetapi penanda titik silang
BAWAH hilang sama sekali, sehingga keterangan "satu titik silang ternyata dua
titik" muncul dengan cuma SATU titik di layar. Ini lebih parah daripada cacat
yang diperbaiki, sebab gambarnya membantah kalimatnya sendiri.

### Render 3: tebakan yang salah, dan diakui

Dugaan saya: bola tenggelam di alas kubus. Penanda diangkat 0,1 satuan.
Hasilnya bola tetap hilang. Tebakan itu mengobati gejala yang salah.

### Diagnosa, bukan tebakan ketiga

Aturan ARYA: gagal tiga kali pada hal yang sama, berhenti. Jadi saya berhenti
menebak dan membuat adegan uji sekali pakai yang mengadu tiga penanda di dalam
satu kubus tembus pandang. Rendernya 30 detik, bukan 12 menit.

| Penanda | Hasil |
|---|---|
| bola (Surface) | **HILANG** |
| lingkaran datar (VMobject) | terlihat, tetapi memipih |
| lingkaran menghadap kamera (VMobject) | terlihat, dan tetap bulat |

Sebabnya: ManimGL menggambar Surface (bola, prisma) dan VMobject (garis,
lingkaran) lewat jalur berbeda, dan sisi kubus yang tembus pandang TETAP
menulis kedalaman. Surface di belakangnya dibuang; VMobject tetap tergambar.
Itu juga menjelaskan kenapa tiang ungu dan ruas BD terlihat menembus kubus
sejak awal, sementara bola tidak.

**Catatan untuk sesi lain dan untuk MASTER: siapa pun yang menaruh benda
`gl.ilustrasi` (bola, balok, silinder) DI DALAM benda tembus pandang akan kena
hal yang sama.** Ini bukan khas topik saya.

### Render 4: bersih

Penanda diganti lingkaran yang diputar menghadap kamera dan diskalakan menurut
jarak, cara yang sudah terbukti untuk huruf titik sudut. Titik silang bawah
dikembalikan ke z = 0 tepat, sebab pergeseran 0,1 tadi mengobati gejala yang
salah. Di detik 66 sekarang terlihat DUA titik ungu yang dihubungkan tiang,
dan keterangannya cocok dengan gambarnya.

## Daftar periksa STANDAR-ILUSTRASI-VIDEO.md

- [ya] Benda nyata dari `gl.ilustrasi`, tidak ada benda berupa titik atau garis.
  Kubus dari `ilustrasi.balok` (prisma bercahaya), lantai dari `lantai_kisi`.
  Titik ungu adalah titik MATEMATIKA, yaitu titik silang, bukan benda.
- [ya] Latar hidup dan updater menjaga dunia bergerak saat narator diam. Sisa
  waktu terbesar tanpa animasi adalah 4,05 detik di babak penutup, dan di situ
  dua penanda sedang berdenyut. Sisa di babak 1 sampai 3 semuanya di bawah 1,6
  detik, jadi tidak ada waktu mati.
- [ya] Kamera mulai dari dunia, satu gerakan panjang per babak, tidak ada
  sentakan: 5,2 / 4,0 / 7,5 / 8,0 / 8,5 / 6,5 detik.
- [ya] Huruf dan penanda di dunia, rumus di panel HUD, gambar tidak pernah
  diganti layar kosong.
- [ya] Satu warna satu makna sepanjang video: AKSEN2 biru = BD di lantai,
  AKSEN merah = EG di atap, SOROT ungu = kesimpulan. Tidak ada kode heksa,
  `cek_kode` bersih.
- [ya] `teks()` untuk kata, `rumus()` untuk angka. Satuan memakai `\\mathrm`.
  Percobaan pertama memakai `\\perp\\!\\!\\!/` dan `cek_kode` menolaknya sebelum
  render, persis fungsinya.
- [ya] Semua animasi di dalam `sinema.babak`. Jeda 1,6 detik sesudah pertanyaan
  "benar-benar bertemu?".
- [ya] `cek_kode` bersih, `qc.periksa_adegan` di keenam babak, lembar kontak
  DIBUKA dan dinilai tiap render, `gabung_audio --uji` jalan dengan selisih
  0,14 detik.
- [ya] Cacat yang tersisa disebutkan di bawah, tidak didiamkan.

## Cacat yang MASIH tersisa, disebut apa adanya

**Huruf B dan D sedikit lebih kecil daripada E dan G pada pandangan atas.**
Skala menurut jarak sudah sangat mengurangi bedanya (di render 1 keduanya tidak
terbaca sama sekali, sekarang terbaca jelas), tetapi belum menyamakannya persis.
Sebabnya perspektif ManimGL tidak sepenuhnya sebanding dengan jarak lurus.
Menyamakannya berarti menghitung proyeksi layar sungguhan, dan menurut saya
itu tidak sepadan untuk beda yang sekarang tinggal sedikit. Kalau ARYA melihat
ini mengganggu, silakan bilang dan akan saya kerjakan.

## Berikutnya

Kandidat video sisa, urut prioritas: tahap 3, 4, 6, 8, 9. Pola yang sudah
terbukti di video ini bisa dipakai ulang: kubus `ilustrasi.balok` yang dibuat
tembus pandang, rangka `Line`, huruf menghadap kamera dengan skala tetap, dan
penanda titik berupa lingkaran menghadap kamera.

---

# Gelombang 2, tahap pertama: revisi isi dari MASTER

Terakhir diperbarui: 2 September 2026, malam. Cabang sudah diselaraskan ke
master (51c7c53) sebelum revisi ini dikerjakan.

## Kelima revisi MASTER, semuanya selesai

### 1. Tiga soal UN cuma diberi jawabannya. SELESAI

Ini kritik yang paling telak, dan benar. Ketiganya sekarang dikerjakan sampai
selesai di halaman, bukan cuma diumumkan hasilnya.

| Tahap | Soal | Yang ditambahkan |
|---|---|---|
| 5 | UAN 2003, jarak P (tengah EH) ke garis CF pada kubus rusuk 4 | 9 baris. Ketiga sisi segitiga PCF dihitung dulu (PF lewat bidang tutup, PC lewat bayangan di alas), lalu kaki K dimisalkan CK = x, tinggi PK ditulis dua kali, suku x kuadrat saling menghapus, x = 3 akar 2, dan PK = 3 akar 2 |
| 6 | EBTANAS 1992, jarak C ke bidang BDG pada kubus rusuk 6 | 7 baris. Jalan pintas volume dikerjakan penuh (limas C.BDG dihitung dua cara), ditambah cara simetri sebagai pembanding |
| 9 | UAN 2005, sudut AH dengan bidang BDHF | 8 baris. Bayangannya DICARI, bukan diloncati: H sudah di bidang jadi bayangannya diri sendiri, bayangan A adalah P tengah BD sebab AP tegak lurus BD dan tegak lurus rusuk tegak. Lalu sin sudut = AP dibagi AH = setengah |

Cara pengerjaannya sengaja berbeda-beda supaya bukan resep yang dihafal: tahap
5 memakai dua Pythagoras yang disamakan, tahap 6 memakai volume, tahap 9
memakai perbandingan sin. Semua angka baru lewat `cek_ruang.py`.

### 2. Tahap 9 memakai tan tanpa pemanggil ulang. SELESAI

Satu paragraf ditambahkan tepat sebelum contoh AG terhadap alas: "Sebelum masuk
ke angka, satu hal dipanggil ulang dari Trigonometri tahap 4. Pada segitiga
siku-siku, tan sudut adalah sisi depan dibagi sisi samping, dan sin sudut
adalah sisi depan dibagi sisi miring." Sin ikut disebut sebab soal UAN 2005 di
tahap yang sama memakainya. Rujukannya diperiksa dulu: Trigonometri tahap 4
memang berjudul "Lahirnya sin, cos, dan tan".

### 3. Tahap 8 menyebut aturan kosinus tanpa menuliskannya. SELESAI

Rumusnya sekarang ditulis dalam blok `contoh` tersendiri, lengkap dengan bentuk
yang dibalik untuk mencari sudut, lalu DICOBA pada segitiga ACH tadi supaya
siswa melihat alat itu bekerja dan hasilnya sama, 60 derajat. Simpulnya
menyebut terus terang bahwa aturan kosinus bukan milik topik ini, melainkan
dipinjam dari bab Trigonometri.

### 4. Tahap 9 dua ide besar tetapi cuma satu `coba`. SELESAI, dan widgetnya ikut dibangun

`coba` kedua ditambahkan, dan supaya `coba` itu ada isinya, widget tahap 9 mode
kedua diberi kemampuan baru: **titik tumpu P bisa digeser di sepanjang garis
potong BD.** Yang terjadi saat digeser:

- kedua tanda siku-siku PADAM, sebab PC memang sudah tidak tegak lurus BD;
- titik P berubah warna jadi merah, begitu juga busur sudutnya;
- baris bawah berganti jadi "terbaca 51,7 derajat, dan itu bukan sudut antarbidang";
- tabel kolom kanan menambah baris "yang terbaca saat P meleset";
- tombol KEMBALIKAN P KE TENGAH selalu tersedia.

Angka yang muncul saat meleset ikut diperiksa mesin, bukan dibiarkan asal
tampil: pada seperempat jalan dari B nilainya 51,6697 derajat.

Kenapa ini lebih baik daripada sekadar kalimat larangan: `seringKeliru` tahap 9
justru berbunyi "dua garis bantunya bertumpu di titik yang berbeda", dan
sekarang siswa bisa MELIHAT akibatnya, bukan diberi tahu.

### 5. Kata "mudah", "jelas", "gampang". SELESAI, 8 tempat

Diperiksa satu per satu, bukan diganti borongan:

| Tempat | Sebelum | Sesudah |
|---|---|---|
| Pertanyaan pembuka tahap 1 | "Dua garis ini jelas berpotongan" | "tampak berpotongan". Ini yang paling penting: kata "jelas" justru menegaskan tipuan sebagai kenyataan, padahal seluruh tahap itu membantahnya |
| `seringKeliru` tahap 3, judul | "titik yang paling gampang dilihat" | "titik yang paling menonjol di gambar" |
| `seringKeliru` tahap 3, isi | "yang jelas kelihatan" | "yang langsung kelihatan" |
| `seringKeliru` tahap 5 | "titik sudut yang jelas terlihat" | "titik sudut yang menonjol" |
| Judul poin tahap 7 | "pilih titik yang paling memudahkan" | "cara memilih titiknya" |
| Butir tahap 7 | "paling mudah dihitung" | "paling sedikit hitungannya" |
| Paragraf tahap 8 | "sudut dua garis berpotongan gampang" | "tidak pernah menimbulkan pertanyaan" |
| `coba` tahap 9 | "sampai segitiga ACG terlihat jelas" | "terlihat utuh" |

Yang SENGAJA tidak diubah: `tingkat: 'mudah'` di `kuis.ts`. Itu label tingkat
kesulitan milik tipe bersama `content/tipe.ts`, dipakai kelima topik, dan bukan
kalimat yang dibaca siswa sebagai penilaian atas dirinya. Mengubahnya akan
merusak berkas milik MASTER.

## Dua perbaikan tambahan yang muncul saat mengerjakan revisi

### `coba` untuk tahap 10, supaya butir 7 daftar periksa bisa dijawab "ya"

Tahap 10 sebelumnya tidak punya `coba` sama sekali. Sekarang ada: siswa diminta
menutup keterangan tiap kartu galeri dan menebak dulu tahap mana yang
mengajarkan hitungan di gambar itu, baru mencocokkan. Ini menutup lingkaran ke
tahap 1 sampai 9, sesuai butir "spiral, bukan lompat".

### Pemanggil ulang tahap 1 di awal tahap 2

Tahap 2 dulu langsung masuk ke daftar tiga kedudukan. Sekarang dibuka dengan
"Di tahap 1 kita sudah bertemu satu kedudukan, yaitu bersilangan, lewat BD dan
EG yang tampak menyilang padahal terpisah enam satuan."

## Tiga cacat yang ditemukan saat memeriksa, bukan dari log

Ketiganya lolos `tsc` tanpa keluhan. Yang menemukan: eslint dan mata.

| Cacat | Sebabnya | Keadaan |
|---|---|---|
| **Kursor tidak pernah berubah jadi tangan menggenggam saat gambar ditarik**, di KESEMBILAN widget | `seret.current` (sebuah ref) dibaca saat render. Ref tidak memicu gambar ulang, jadi kursornya membeku di bentuk lama selamanya | diperbaiki, dijadikan state. Ditemukan `eslint react-hooks/refs`, aturan yang memang ada untuk kesalahan ini |
| Angka sudut di tahap 9 mode kedua **menempel pada huruf C** | huruf C duduk persis di ujung salah satu kaki sudut, jadi angka yang ditaruh di garis bagi sudut pasti mengenainya. Makin parah saat P digeser | diperbaiki, angkanya dihapus dari busur, busurnya tetap sebagai penunjuk. Alasan yang sama sudah dipakai di mode pertama. Angkanya ada di dua baris bawah gambar dan di tabel kanan |
| **Di layar HP 375 piksel, lencana INTERAKTIF menutupi baris keterangan widget** | lencana itu milik rangka panggung dan ukurannya TETAP, sedangkan gambar SVG menyusut mengikuti lebar layar. Di 1366 jaraknya 60 piksel, di 375 jadi nol | diperbaiki dari sisi widget, tanpa menyentuh berkas orang lain: ruang 18 piksel CSS di atas gambar, hanya kalau ada keterangan. Topik Statistika tidak kena karena tata letak widgetnya kebetulan berbeda |

## Daftar periksa 10 butir per tahap (STANDAR-MENGAJAR bagian 6)

Butir yang menentukan layak atau tidak adalah 1, 3, 4, dan 6.

| Tahap | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 Gambar ruang boleh berbohong | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 2 Kosakata kedudukan | ya | ya* | ya | ya | ya | ya | ya | ya | ya | ya |
| 3 Jarak selalu yang terpendek | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 4 Dua kali Pythagoras | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 5 Jarak titik ke garis | ya | ya | ya | ya | ya | ya* | ya | ya | ya | ya* |
| 6 Jarak titik ke bidang | ya | ya | ya | ya | ya | ya* | ya | ya | ya | ya |
| 7 Yang sejajar | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya* |
| 8 Sudut garis bersilangan | ya | ya* | ya | ya | ya | ya | ya | ya | ya | ya* |
| 9 Sudut dengan bidang | ya | ya* | ya | ya | ya | ya* | ya* | ya | ya | ya* |
| 10 Dipakai di dunia nyata | ya | ya | ya | ya | n/a | n/a | ya* | n/a | ya | ya |

Tanda bintang berarti butir itu baru menjadi "ya" SETELAH revisi hari ini:

- **2 butir 2**: pemanggil ulang tahap 1 baru ditambahkan hari ini.
- **5 dan 6 butir 6**: contohnya dulu berhenti di jawaban soal UN, sekarang tiap
  barisnya menyebut apa yang dilakukan dan kenapa.
- **8 butir 2**: aturan kosinus dulu disebut tanpa diberikan, sekarang
  dituliskan dan dirujuk ke bab asalnya.
- **9 butir 2**: pemanggil ulang sin dan tan ke Trigonometri tahap 4.
- **9 butir 6 dan 7**: soal UAN 2005 dikerjakan penuh, dan `coba` kedua untuk
  sudut antarbidang.
- **5, 7, 8, 9 butir 10**: kata "mudah", "jelas", "gampang" dibersihkan.
- **10 butir 7**: `coba` baru ditambahkan hari ini.

Tiga "n/a" di tahap 10: tidak ada istilah baru yang diperkenalkan (butir 5);
tahap ini penerapan, bukan prosedur, sehingga `contoh` diganti cerita yang
dijalankan sampai selesai (butir 6, diizinkan STANDAR bagian 2); dan tidak ada
blok `seringKeliru` (butir 8), sebab kekeliruan yang relevan, yaitu batang
menara yang dikira berpotongan, sudah dibahas di tahap 1 dan diulang di badan
tahap ini.

Tidak ada tahap yang mendapat "tidak" pada butir 1, 3, 4, atau 6.

## Verifikasi yang dijalankan dan DILIHAT

- `python alat/cek_ruang.py --uji` -> 20 jawaban benar lolos, 4 jawaban yang
  sengaja disalahkan ditolak. Kode keluar 0.
- `python alat/cek_ruang.py alat/soal-ruang-3d.json` -> **87 lolos, 0 salah**,
  naik dari 70. Tujuh belas angka baru: jalan pengerjaan tiga soal UN, dan
  angka yang terbaca saat titik P digeser.
- Pemeriksanya terbukti masih galak: dua angka yang saya tebak sendiri untuk
  widget baru DITOLAK, dan nilai sebenarnya yang disebut alat itulah yang
  dipakai (RC = 3 akar 10 dibagi 2, dan sudut 51,6697 derajat).
- `node node_modules/typescript/bin/tsc --noEmit` -> kode keluar 0. Dibuktikan
  hidup dengan menyisipkan kesalahan tipe sengaja, ditolak dengan TS2322, lalu
  dihapus lagi.
- `node node_modules/eslint/bin/eslint.js .` -> bersih, setelah satu galat nyata
  yang ia temukan diperbaiki.
- `node node_modules/next/dist/bin/next build` -> lolos, 19 rute terbangun.
- Potret 1366: materi 2, 5, 6, 8, 9, 10, plus mode kedua tahap 9 pada tumpuan di
  tengah DAN tumpuan yang meleset. Semuanya dibuka dan dinilai satu per satu.
- Potret 375: materi 9 dua mode dan materi 10, sebelum dan sesudah perbaikan
  lencana. Tampilan HP yang dulu rusak sekarang menumpuk rapi, jadi perbaikan
  MATRA-DESAIN-UI-UX terbukti bekerja di topik ini.
- Tidak ada em-dash dan tidak ada kata terlarang di seluruh berkas yang disentuh.

## Sedang dikerjakan

Belum ada. Video gelombang 2, enam kandidat (tahap 1, 3, 4, 6, 8, 9), belum
dimulai. Menunggu revisi isi ini dinilai.

## Butuh MASTER

1. **`web/components/topik/PanggungRuang3D.tsx` disentuh lagi.** Berkas itu ada
   di folder komponen bersama milik MATRA-DESAIN-UI-UX, tetapi isinya khusus
   topik ini dan polanya sama dengan `PanggungStatistika` dan kawan-kawan.
   Perubahannya: penggeser titik P dan satu baris tabel, keduanya cuma muncul di
   tahap 9 mode kedua. Tidak ada gaya baru yang dikarang, `globals.css` tidak
   disentuh sama sekali.
2. Warna sudut di `CLAUDE.md` dan `PROGRESS.md` masih `#D9A441`, padahal
   `web/lib/warna.ts` sudah `#6A4C93`. Belum diperbaiki sejak laporan sebelumnya.
   Saya ikut berkas kode.

## Butuh keputusan ARYA

1. **Galeri tahap 10: gambar sendiri atau foto?** Dibiarkan seperti sekarang
   sesuai perintah MASTER, sebab ini keputusan visual milik ARYA.
2. **Bahasa dan tingkat kesulitan** tetap perlu mata ARYA. Yang paling perlu
   dilihat: tahap 5 dan 6 sekarang jauh lebih panjang karena soal UN dikerjakan
   penuh. Apakah masih enak dibaca, atau sudah terasa berat.
3. **Video.** Begitu revisi ini disetujui, urutannya: tahap 1, 3, 4, 6, 8, 9,
   memakai Manim `ThreeDScene`, 480p, satu per satu lewat `alat/antre_render.py`.

---

# BERHENTI SEMENTARA atas permintaan ARYA, 4 September 2026 siang

Ditulis supaya sesi berikutnya tidak perlu menebak. Pohon kerja bersih,
semua sudah dicommit, kunci antrean render sudah dilepas (kalau tidak, lima
sesi lain terblokir 45 menit menunggu kunci yang pemiliknya sudah mati).

## Yang sudah selesai
- Keenam adegan disesuaikan ke tiga cacat tinjauan MASTER (pembuka berisi
  kejadian, kubus bercahaya tiga tingkat terang, angka sumbu 0/3/6).
- 58 kejadian diikat ke kalimat narasinya lewat jam subtitle, dan kalimat
  pemicunya ditulis sebagai komentar di atas tiap baris.
- Materi 03 dapat aba-aba pandangan sejajar AC (syarat ARYA lewat MASTER),
  narasi dibuat ulang 79,2 jadi 91,8 detik, kamera penutup benar-benar sampai
  ke theta -135.
- Alat: ukuran "diam terpanjang" masuk `alat/ukur_detik_pertama.py`, dan
  `alat/cek_kalimat_adegan.py` memeriksa awalan kalimat tanpa perlu render.

## Yang TERPUTUS di tengah jalan
Render ulang keenam video dengan perbaikan terakhir (geseran latar mengisi
tunggu dan sisa babak yang pendek). Yang SUDAH jadi dengan kode terbaru:
**materi 01, 03, dan 04**. Yang BELUM: **06, 08, 09**, jadi mp4 keduanya di
`media/gl/` masih hasil putaran sebelumnya.

Lanjutkan dengan:

    python alat/antre_render.py matra-ruang-3d -- manimgl manim/scenes/ruang_3d_06.py JarakTitikKeBidang -w -l
    python alat/antre_render.py matra-ruang-3d -- manimgl manim/scenes/ruang_3d_08.py SudutGarisBersilangan -w -l
    python alat/antre_render.py matra-ruang-3d -- manimgl manim/scenes/ruang_3d_09.py SudutDenganBidang -w -l

lalu untuk keenamnya: `gabung_audio.py <topik> <Adegan> --uji`,
`alat/ukur_detik_pertama.py --judul 3.4 media/uji-480p/ruang-3d-0*.mp4`,
`cek_video.py --per-detik 0.25` dan BUKA lembar kontaknya.

## Angka terakhir yang terukur (putaran sebelum perbaikan terakhir)

| Materi | Gerak pertama | Diam terpanjang |
|---|---|---|
| 01 | 0,25 detik | 7,8 detik pada detik 21 |
| 03 | 0,75 detik | 4,4 detik pada detik 30 |
| 04 | 0,75 detik | 6,0 detik pada detik 49 |
| 06 | 0,88 detik | 3,4 detik pada detik 37 |
| 08 | 0,75 detik | 5,4 detik pada detik 69 |
| 09 | 0,75 detik | 5,6 detik pada detik 18 |

Peringatan `Babak.tutup()` berbunyi NOL kali untuk keenamnya, padahal angka di
atas menunjukkan masih ada beku 3 sampai 8 detik. MASTER sudah mencatat ini
sebagai bukti bahwa peringatan yang sunyi bukan bukti bersih.

## Yang menunggu MASTER
Setelah 06, 08, 09 selesai: salin keenam mp4 ke `web/public/anim/`, buat ulang
poster (poster yang ada diambil dari video sebelum perbaikan), `git add` jpg-nya
dan commit, lalu kabari MASTER untuk deploy ulang ke https://mantra-uji.vercel.app.
