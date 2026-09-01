# Ruang Tiga Dimensi: Alur Belajar 10 Tahap

**Tanggal:** 1 September 2026 · **Sesi:** MATRA-RUANG-TIGA-DIMENSI (cabang `sesi/ruang-3d`)
**Status: MENUNGGU PERSETUJUAN ARYA.** Belum ada satu baris kode pun yang ditulis.
**Menyusul:** `2026-08-31-trigonometri-alur-belajar.md`, `2026-09-01-limit-alur-belajar.md`

---

## 1. Temuan yang mengubah rencana: sumber materinya tidak ada di koleksi ARYA

File tugas menyebut dua sumber utama. Keduanya sudah dibuka dan diperiksa isinya,
bukan ditebak dari namanya. Hasilnya:

| Berkas | Isi sebenarnya | Ada dimensi tiga? |
|---|---|---|
| `D:\BAHAN MATEMATIKA\3 Dimensi.pdf` (352 hal) | **Buku Siswa SMA Kelas XI, Kurikulum Sekolah Penggerak 2021.** Bab 1 Bilangan Kompleks, Bab 2 Polinomial, Bab 3 Matriks, dan seterusnya | **Tidak.** Kata "kubus", "limas", "jarak titik ke bidang" nol kali di 352 halaman. Namanya saja yang menyesatkan |
| `Matematika_BS_KLS_XII_Rev.pdf` (216 hal) | Buku Siswa Kelas XII Edisi Revisi 2025. Bab 1 Barisan dan Deret, Bab 2 Investasi dan Pinjaman, Bab 3 Kaidah Pencacahan, Bab 4 Peluang | **Tidak.** Semua kemunculan kata "ruang" adalah "ruang sampel" pada bab Peluang |
| `Buku Matematika Kelas 10 - Guru.pdf` | Eksponen, Barisan, **Vektor dan Operasinya**, Trigonometri, SPL, Fungsi Kuadrat, Statistika, Peluang | Hampir. "Dimensi tiga" muncul 2 kali, keduanya di bab Vektor, artinya **sistem koordinat Kartesius tiga sumbu**, bukan geometri bangun ruang |
| `Buku Matematika Kelas 11 - Guru.pdf` | Komposisi dan Invers Fungsi, Lingkaran, Statistika (regresi dan korelasi) | Tidak |

**Artinya:** geometri ruang (jarak dan sudut pada kubus, limas, balok) **tidak ada
di buku Kurikulum Merdeka yang dipegang ARYA.** Materi itu berasal dari Kurikulum
2013, Matematika Wajib Kelas XII. Ia tetap hidup di soal seleksi masuk kuliah dan
di buku bimbel, tetapi bukan bab resmi di buku pemerintah yang ada di komputer ini.

Ini bukan alasan membatalkan topiknya. Ini alasan **ARYA harus memilih sikapnya
lebih dulu**, sebab pilihannya menentukan label kelas di kartu topik, dari mana
soal diambil, dan seberapa jauh materi boleh melangkah. Tiga pilihan ada di
bagian 2.

Yang PASTI tersedia dan sudah diverifikasi sebagai jembatan resmi: bab Vektor
Kelas 10 memang memperkenalkan sistem koordinat tiga dimensi. Jadi kalaupun
"bangun ruang" bukan bab resmi, "titik dalam ruang berkoordinat tiga" adalah bab
resmi Kelas 10.

---

## 2. Dua keputusan yang ditunggu dari ARYA

### Keputusan A: cara menggambar ruang di layar (wajib, sudah diperintahkan file tugas)

| Pilihan | Yang didapat | Yang dibayar |
|---|---|---|
| **A1. SVG buatan sendiri + matriks putar (REKOMENDASI)** | Kubus bisa **ditarik untuk diputar bebas** dengan tetikus atau jari. Garis, bidang tembus pandang, label titik, tanda siku-siku, semuanya digambar dengan alat yang sama seperti widget Limit. Tanpa paket baru, ukuran unduhan siswa tidak bertambah | Tidak ada cahaya, bayangan, atau perspektif. Bidang yang saling menutup diurutkan berdasarkan kedalaman, cukup untuk satu kubus, akan berantakan kalau nanti ada belasan benda saling menembus |
| **A2. three.js** | Perspektif dan pencahayaan sungguhan | Paket besar ikut diunduh tiap siswa, padahal yang digambar cuma garis. Gaya "Studio Teknis" harus dipaksakan ulang. Menyalahi pola sembilan widget yang sudah ada. Kuota Vercel ikut terpakai lebih cepat |
| **A3. SVG statis, tiga sudut pandang tetap** | Paling murah dan paling cepat jadi | Justru membunuh inti topiknya. Kesan ruang lahir dari memutarnya sendiri |

**Rekomendasi: A1.** File tugas menuliskan A1 sebagai "rotasi bebas terbatas".
Setelah diperiksa, kalimat itu terlalu merendahkan: rotasi bebas sungguhan hanya
butuh matriks 3x3 dan proyeksi ortografis, sekitar 40 baris, dan hasilnya bisa
ditarik dengan jari di HP. Yang benar benar hilang dibanding three.js cuma
perspektif dan bayangan, dan keduanya tidak dipakai buku matematika mana pun.

### Keputusan B: sikap terhadap sumber yang tidak ada

| Pilihan | Isinya |
|---|---|
| **B1. Jalan terus, sumber disusun sendiri (REKOMENDASI)** | Materi ditulis sendiri, tiap angka dibuktikan `sympy` sebelum ditulis (sudah dimulai, lihat bagian 6). Label kartu tetap "Kelas 12", ditambah satu kalimat jujur di pembuka topik bahwa bab ini tidak ada di buku Kurikulum Merdeka tetapi masih keluar di seleksi masuk kuliah. Soal salinan menunggu ARYA menempelkan soal asli, sebab mathcyber1997 diblokir pemeriksa bot dan tidak boleh diterobos |
| **B2. Tunggu ARYA mencarikan PDF dimensi tiga** | Paling aman untuk ketepatan istilah, tetapi sesi ini berhenti sampai berkasnya ada |
| **B3. Ganti bingkai jadi "Geometri Ruang dengan Koordinat"** | Bersandar pada bab Vektor Kelas 10 yang resmi. Label berubah jadi Kelas 10 dan 12. Risikonya bertabrakan dengan sesi MATRA-VEKTOR, dan jarak titik ke bidang lewat rumus vektor terasa seperti mengulang topik mereka |

**Rekomendasi: B1**, dengan catatan sumber ditulis terbuka di halaman.

---

## 3. Kenapa disusun begini

Salah paham yang dilawan sudah tercatat di `content/topik.ts`:

> *"intuisi datar dipakai di ruang."*
> Pertanyaan kartunya: *"Kenapa yang terlihat berpotongan belum tentu berpotongan?"*

Salah paham itu punya sebab yang sangat konkret: **semua gambar ruang di buku
adalah gambar datar.** Dua garis yang di kertas jelas jelas bersilang di satu
titik, di ruang sebenarnya bisa lewat begitu saja tanpa bersentuhan, terpisah
jarak beberapa sentimeter menjauh dari mata pembaca. Siswa tidak salah berpikir.
Siswa hanya mempercayai gambar yang memang menipu.

Karena itu tahap pertama bukan definisi dan bukan rumus, melainkan **membongkar
tipuan gambarnya lebih dulu**, dengan kubus yang bisa diputar sendiri sampai dua
garis tadi terlihat memisah. Sesudah siswa merasakan sendiri bahwa gambar bisa
berbohong, barulah kosakata kedudukan diperkenalkan.

Pola yang sama dengan dua topik sebelumnya: **masalah dulu, rumus belakangan.**

Satu gagasan lagi yang memayungi tahap 3 sampai 7, dan sengaja diajarkan sebagai
satu kalimat yang diulang ulang:

> **Setiap soal jarak adalah soal mencari kaki tegak lurus.**

Jarak titik ke garis, titik ke bidang, garis ke bidang, dua bidang sejajar,
semuanya satu ide yang sama dipakai di tempat berbeda. Buku biasanya menyajikan
empat rumus terpisah, dan itulah kenapa siswa menghafal empat hal padahal cuma
ada satu.

---

## 4. Alur 10 tahap

Bentuk datanya persis sama dengan Trigonometri dan Limit, jadi tidak ada tipe
baru: `no`, `slug`, `judul`, `pertanyaan`, `labelPendek`, `penjelasan`,
`seringKeliru`, `intisari`, `widget`, `video`, `siap`.

Kubus acuan di seluruh topik dinamai sama, supaya siswa tidak perlu membaca ulang
huruf pada tiap tahap: **ABCD.EFGH**, alas ABCD, tutup EFGH, A tepat di bawah E.

| # | Judul | Pertanyaan pembuka | Widget | Kandidat video |
|---|---|---|---|---|
| 1 | Gambar ruang boleh berbohong | Dua garis ini jelas berpotongan di gambar. Kenapa di benda aslinya tidak? | `KubusPutar` | ya, prioritas 1 |
| 2 | Kosakata kedudukan | Ada berapa cara dua garis bisa bertemu, dan berapa cara mereka tidak bertemu? | `PemilihKedudukan` | tidak perlu |
| 3 | Jarak selalu yang terpendek | Kenapa jarak harus tegak lurus. Kenapa bukan yang miring sedikit? | `KakiTegakLurus` | ya, prioritas 2 |
| 4 | Dua kali Pythagoras | Kenapa diagonal ruang kubus rusuk 1 panjangnya akar 3, bukan akar 2 ditambah 1? | `DiagonalKubus` | ya, prioritas 3 |
| 5 | Jarak titik ke garis | Titiknya di pojok, garisnya diagonal ruang. Di mana kakinya jatuh? | `JarakKeGaris` | tidak perlu |
| 6 | Jarak titik ke bidang | Bidangnya miring dan tidak menyentuh titik itu sama sekali | `JarakKeBidang` | ya, prioritas 4 |
| 7 | Kalau yang diukur garis atau bidang, bukan titik | Kenapa cukup mengambil satu titik saja? | `JarakSejajar` | tidak perlu |
| 8 | Sudut dua garis yang tidak pernah bertemu | Bagaimana mengukur sudut antara dua garis yang tidak punya titik potong? | `SudutBersilangan` | ya, prioritas 5 |
| 9 | Sudut dengan bidang dan sudut antarbidang | Kenapa memiringkan penggaris sedikit saja mengubah sudutnya? | `SudutBidang` | ya, prioritas 6 |
| 10 | Dipakai di dunia nyata | Di mana orang benar benar menghitung ini? | galeri foto | tidak perlu |

Isi ringkas tiap tahap:

### Tahap 1: Gambar ruang boleh berbohong
Dibuka dengan kubus yang sudah diputar ke sudut pandang tempat rusuk AB dan rusuk
CG **tampak berpotongan**. Siswa menarik kubusnya, dan potongan itu terurai.
Sesudah itu baru diberi tiga cara membaca gambar ruang: garis putus putus berarti
terhalang, bidang tembus pandang bukan berarti kosong, dan panjang di gambar
bukan panjang sebenarnya. Ditutup dengan nama resmi kejadian tadi:
**bersilangan**, dua garis yang tidak sejajar dan tidak punya titik persekutuan.

### Tahap 2: Kosakata kedudukan
Daftar lengkap tetapi dibangun bertahap, bukan disodorkan sebagai tabel hafalan.
Dua garis: berpotongan, sejajar, bersilangan. Garis dan bidang: terletak pada,
sejajar, menembus. Dua bidang: berpotongan pada satu garis, atau sejajar.
Widget membiarkan siswa memilih dua unsur pada kubus lalu menampilkan status dan
alasannya. Kotak "sering keliru" di bawah: bersilangan sering dikira sejajar,
sebab keduanya sama sama tidak pernah bertemu.

### Tahap 3: Jarak selalu yang terpendek
Inti seluruh topik. Titik P tetap, garis g tetap, kaki Q digeser sepanjang garis.
Panjang PQ ditampilkan hidup, dan di sebelahnya tumbuh grafik panjang terhadap
posisi. Grafik itu punya satu lembah, dan lembahnya jatuh **tepat** saat tanda
siku-siku menyala. Dari situ definisi jaraknya lahir sendiri, bukan diberikan.

### Tahap 4: Dua kali Pythagoras
Diagonal sisi lebih dulu, baru diagonal ruang, dan yang ditekankan adalah
**segitiga siku-siku penolongnya**, bukan rumus jadi. Kubus rusuk `a`:
diagonal sisi `a√2`, diagonal ruang `a√3`. Widget menyorot segitiga penolong itu
berdiri di dalam kubus sehingga terlihat sungguh tegak lurus.

### Tahap 5: Jarak titik ke garis
Contoh utama: jarak titik B ke diagonal ruang AG pada kubus rusuk 6, hasilnya
`2√6 ≈ 4,899`. Dua jalan diajarkan berdampingan: menghitung lewat segitiga
siku-siku, dan jalan pintas luas segitiga, yaitu `jarak = 2 × luas ÷ alas`.

### Tahap 6: Jarak titik ke bidang
Contoh utama: jarak titik A ke bidang BDE pada kubus rusuk 6, hasilnya
`2√3 ≈ 3,464`. Yang digambar bukan angkanya, melainkan **ruas tegak lurusnya**,
menembus dari A sampai menusuk bidang BDE. Jalan pintas volume limas juga
diajarkan: `jarak = 3 × volume ÷ luas alas`.

### Tahap 7: Kalau yang diukur garis atau bidang
Tahap pendek dan sengaja pendek. Jarak garis ke bidang sejajar, dan jarak dua
bidang sejajar, keduanya runtuh menjadi tahap 6 begitu satu titik sembarang
dipilih. Yang perlu dibuktikan cuma satu: pilihan titiknya tidak berpengaruh.
Widget menggeser titik itu dan menunjukkan angkanya tidak bergerak sama sekali.

### Tahap 8: Sudut dua garis yang tidak pernah bertemu
Aturannya: geser salah satu garis sejajar dirinya sendiri sampai keduanya
bertemu, lalu ukur sudut di sana. Widget menganimasikan geseran itu.
Contoh yang dipakai: sudut antara AH dan AF adalah `60°`, sebab segitiga AFH
ketiga sisinya diagonal sisi sehingga sama sisi. Angka bulat, dan bisa diperiksa
siswa tanpa kalkulator.

### Tahap 9: Sudut dengan bidang dan sudut antarbidang
Sudut garis dengan bidang lewat **proyeksi** garis itu pada bidang. Contoh:
diagonal ruang AG terhadap alas ABCD, `arctan(√2/2) ≈ 35,26°`.
Sudut dua bidang lewat garis potongnya. Contoh: bidang BDG terhadap alas ABCD,
`arctan(√2) ≈ 54,74°`. Yang paling sering keliru dan karena itu diberi kotaknya
sendiri: kedua garis pembentuk sudut wajib **tegak lurus garis potong dan bertemu
di titik yang sama**.

### Tahap 10: Dipakai di dunia nyata
Galeri foto berlisensi terbuka, mengikuti pola Tahap 10 Trigonometri, bukan
gambar buatan sendiri seperti Materi 10 Limit. Alasannya sama dengan yang sudah
dicatat di `PROGRESS.md`: di sini yang ditunjukkan adalah **di mana bangun ruang
itu berada** pada benda nyata, dan foto menjawab pertanyaan itu. Kandidat: kuda
kuda atap, jembatan rangka baja, piramida, tangga putar, dan crane.

---

## 5. Widget: satu mesin gambar, sembilan pemakai

Berkasnya `web/components/widget/ruang-3d/ruang.ts`, sejajar dengan
`widget/limit/koordinat.ts` yang sudah terbukti.

Isinya:

- **Titik ruang dan matriks putar.** Dua sudut saja, mendatar dan menunduk,
  disimpan sebagai keadaan React, diubah dengan tarikan tetikus atau jari.
- **Proyeksi ortografis** ke bidang layar, lalu diteruskan ke penskalaan yang
  sama gayanya dengan `koordinat.ts`.
- **Bingkai menyesuaikan otomatis.** Aturan proyek 31 Agustus: widget tidak boleh
  memotong gambarnya sendiri. Karena kubus yang diputar berubah ubah lebarnya di
  layar, bingkainya dihitung ulang dari titik ekstrem tiap kali diputar, dan
  penunjuk skala ikut berubah. Ini justru lebih penting di sini daripada di
  widget datar.
- **Urutan gambar berdasar kedalaman**, supaya rusuk yang terhalang tampil putus
  putus dan bidang tembus pandang terlihat benar.
- **Warna dari `lib/warna.ts` saja.** Samping `#3A6EA5`, depan `#C25E4D`,
  miring `#1F2430`, sudut `#D9A441`. Tidak boleh memakai aksen situs.

Sembilan widget di atas semuanya memakai mesin ini. Widget yang paling berat
adalah `SudutBidang`, sebab ia menggambar dua bidang sekaligus plus garis potong.

**Ditunda dan tidak masuk gelombang 1:** irisan bidang pada kubus. File tugas
sendiri menyebutnya berat dan boleh ditunda. Kalau ARYA mau, ia bisa ditambahkan
belakangan sebagai tahap 11 tanpa membongkar apa pun.

---

## 6. Angka yang sudah diperiksa mesin

Diperiksa dengan `sympy` sebelum dokumen ini ditulis, bukan sesudah:

| Yang dihitung | Hasil |
|---|---|
| Diagonal sisi kubus rusuk `a` | `a√2` |
| Diagonal ruang kubus rusuk `a` | `a√3` |
| Jarak B ke garis AG | `a√6/3`, untuk `a=6` menjadi `2√6 ≈ 4,899` |
| Jarak A ke bidang BDE | `a√3/3`, untuk `a=6` menjadi `2√3 ≈ 3,464` |
| Jarak A ke bidang BDG | `a√3/3`, sama persis, dan kesamaan ini dipakai sebagai kejutan di tahap 6 |
| Sudut AH dengan AF | tepat `60°` |
| Sudut AG dengan alas ABCD | `arctan(√2/2) ≈ 35,264°` |
| Sudut bidang BDG dengan alas | `arctan(√2) ≈ 54,736°` |
| Kedudukan AB dan CG | bersilangan |
| Kedudukan AE dan BG | bersilangan |

Sebelum satu tahap pun ditulis, `alat/cek_ruang.py` dibuat lebih dulu, meniru
`alat/cek_soal.py`: memeriksa jarak, sudut, dan kedudukan pada bangun ruang
sembarang, dan keluar dengan kode bukan nol kalau ada jawaban yang salah.

---

## 7. Latihan dan kuis

Sama seperti dua topik terdahulu: 4 latihan pilihan ganda A sampai E dengan
pembahasan bertahap di dalam halaman, dan bank 32 soal kuis berjenjang mudah,
sedang, sulit, sangat sulit.

**Kalibrasi kesulitan dilakukan dulu, sebelum menulis.** Ini temuan ARYA yang
sudah tercatat: soal buatan Claude cenderung terlalu mudah. Sumber kalibrasi di
topik ini bermasalah, sebab mathcyber1997 diblokir pemeriksa bot dan tidak akan
diterobos. Karena itu **saya minta ARYA menempelkan 5 sampai 10 soal dimensi tiga
asli** (soal sekolah, buku bimbel, atau seleksi masuk kuliah) sebagai patokan.
Kalau tidak ada, saya tetap menulis soal, tetapi tingkat kesulitannya adalah
tebakan saya, dan itu akan saya tulis apa adanya di laporan.

Semua jawaban numerik diperiksa `alat/cek_ruang.py` sebelum masuk ke berkas isi.

---

## 8. Batas dengan sesi MATRA-VEKTOR

Milik saya: kedudukan, jarak, sudut, proyeksi pada bangun ruang.
Milik mereka: aljabar vektor dan operasinya.

Vektor dipakai di topik ini hanya sebagai **alat hitung di balik layar**, yaitu
di `alat/cek_ruang.py` untuk membuktikan angkanya benar. Di halaman siswa, jalan
yang diajarkan adalah segitiga siku-siku, luas, dan volume, bukan rumus hasil
kali titik. Kalau siswa ingin cara vektornya, diberi satu kalimat rujukan silang
ke topik Vektor, bukan pelajaran ulang.

---

## 9. Yang saya butuhkan dari MASTER

Satu baris saja, dan saya tidak akan mengerjakannya sendiri karena berkasnya
bukan milik saya:

- `web/content/topik.ts`, entri `ruang-3d`, ubah `siap: false` menjadi `siap: true`
  setelah halaman selesai. Kalau ARYA memilih pilihan B3 di bagian 2, label
  `kelas` dan `urutanKelas` juga ikut berubah.

Yang saya kerjakan sendiri karena memang wilayah saya: `web/content/ruang-3d/`,
`web/components/widget/ruang-3d/`, satu baris entri di `web/content/daftar-isi.ts`,
satu komponen `web/components/topik/PanggungRuang3D.tsx`, dan `alat/cek_ruang.py`.

Catatan: `components/topik/` disebut milik MATRA-DESAIN-UI-UX di tabel
kepemilikan, tetapi `PanggungLimit.tsx` dan `PanggungTrigonometri.tsx` adalah
penyetelan widget milik topik, bukan rangka bersama. Saya akan **menambah berkas
baru** `PanggungRuang3D.tsx` dan tidak menyentuh berkas mana pun yang sudah ada
di folder itu, sehingga tidak mungkin bentrok saat digabung.

---

## 10. Risiko yang saya lihat

1. **Materinya bukan bab resmi Kurikulum Merdeka.** Sudah dijelaskan di bagian 1.
   Kalau dosen ARYA menanyakan dasar kurikulumnya, jawabannya harus jujur.
2. **Widget 3D lebih mudah membingungkan daripada widget datar.** Kubus yang
   diputar terlalu bebas bisa membuat siswa tersesat. Penangkalnya: sudut pandang
   awal selalu sama, ada tombol kembalikan tampilan, dan putaran menunduk dibatasi
   supaya kubus tidak pernah terbalik.
3. **Sembilan widget 3D lebih mahal daripada sembilan widget datar**, terutama
   tahap 9. Kalau waktunya mepet, yang dipotong dari bawah: tahap 7 digabung ke
   tahap 6.
4. **Bank 32 soal tanpa sumber kalibrasi berisiko terlalu mudah.** Lihat bagian 7.
