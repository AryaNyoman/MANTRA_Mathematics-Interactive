# Laporan MATRA-RUANG-TIGA-DIMENSI

Terakhir: 2 September 2026
Cabang: `sesi/ruang-3d` · Worktree: `.claude/worktrees/matra-ruang-3d`

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
