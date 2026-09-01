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
