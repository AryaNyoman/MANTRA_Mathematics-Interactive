# Laporan MATRA-GRAFIK-FUNGSI
Terakhir: 4 September 2026, dini hari. Bagian TERBARU di paling atas.

## 4 Sep 2026: video tahap 3 dan tahap 6 dirender ulang, tiga cacat ditutup

Kedua video hilang berkasnya saat laptop mati (`media/` diabaikan git, jadi
hanya `.vtt`-nya yang selamat di git). Dirender ulang 480p, dan dalam prosesnya
tiga cacat ditemukan lalu diperbaiki.

### DUA JEBAKAN YANG BERLAKU UNTUK SEMUA SESI, BUKAN CUMA TOPIK INI

**1. JANGAN menulis `$...$` di dalam `teks()` atau `sinema.label()`.**
`teks()` meloloskan tanda dolar lewat `_KHUSUS` supaya kalimat biasa tidak
menggagalkan kompilasi, jadi mode matematika TIDAK PERNAH aktif dan tanda
dolarnya ikut tercetak di layar. Di `grafik3_puncak.py` label puncak tertulis
`$(1, 4)$` lengkap dengan dolarnya, dan itu lolos ke video jadi. Angka dan
koordinat memang tempatnya di `rumus()`, bukan `teks()`.

**2. JANGAN menulis pergantian baris di dalam `teks()`.**
LaTeX memperlakukan pergantian baris di dalam sumber sebagai spasi biasa, jadi
`teks("baris satu\nbaris dua")` menghasilkan SATU baris panjang, bukan dua.
Akibatnya seluruh kelompok dikecilkan oleh `batasi_lebar` sampai sulit dibaca.
Di `grafik6_transformasi.py` babak penutup kena ini. Cara yang benar: satu
objek `teks()` per baris, lalu `VGroup(...).arrange(DOWN)`, sama seperti babak
penutup `grafik3_puncak.py`.

**3. Jebakan `--awal` pada `cek_sinkron_video.py`: TULISAN sewarna ikut
terhitung sebagai benda.** Pada `grafik3-puncak`, label puncak `(1, 4)`
berwarna SOROT sama seperti titiknya, jadi `--awal 2`, bukan 1. Tandanya
mudah dikenali: kalau SEMUA baris meleset dengan selisih yang sama, yang salah
angka `--awal`, bukan videonya.

### Cacat waktu mati di tahap 6, diukur bukan ditaksir
Detik 23-29 layarnya BEKU pada sumbu kosong (0,56 persen isi layar, nol piksel
berubah selama 7 detik) dan detik 32-37 beku pada sumbu + satu label kecil
(0,70 persen, 6 detik). Total 15 detik gambar tidak bergerak sementara narator
bicara. Sebabnya animasi diikat ke jam subtitle dengan benar, tapi tidak ada
apa pun yang mengisi jeda ANTAR kalimat.

Diperbaiki dua tempat:
- `b03_datar`: kedua sumbu tadinya muncul sekaligus di detik 22, padahal
  narator baru menyebut "dengan sumbu mendatar untuk x dan sumbu tegak untuk y"
  di detik 24,05. Sekarang lembah memudar 3,1 detik (angkanya dihitung: babak
  mulai 17,71 + kamera 3,2 = 20,91, kalimat sumbu mulai 24,05) lalu tiap sumbu
  ditarik saat namanya disebut.
- `b04_titik`: lima slot ruas kiri `f(-2) =` sampai `f(2) =` muncul satu per
  satu selama narator bertanya "Kenapa bentuknya begitu? Bukan sihir, tapi
  dihitung". Ruas kanannya sengaja dikosongkan supaya jawabannya tidak bocor
  sebelum dihitung, lalu tiap slot diganti hitungan penuhnya saat titiknya
  mendarat.

Percobaan pertama perbaikan ini MALAH membuat layar kosong 0,00 persen di detik
24 dan 25, karena lembahnya habis memudar sebelum sumbunya mulai digambar.
Ketahuan hanya karena diukur per detik sesudah render, bukan karena ditonton
sekilas. Itu sebabnya durasi memudarnya dihitung, bukan dikira-kira.

### `alat/cek_sinkron_video.py`: ALARM PALSU, dan sudah begitu sejak awal
Alat itu menggolongkan tiap piksel ke warna palet TERDEKAT. Cara itu gagal pada
benda bercahaya: bola `penanda` memakai `set_shading`, jadi mayoritas pikselnya
ungu gelap, dan ungu gelap lebih dekat ke TINTA (31, 36, 48) daripada ke SOROT
(106, 76, 147). Terukur pada `grafik6-transformasi` detik 38,14: satu titik ungu
JELAS TERLIHAT di layar, terhitung NOL. Alat itu melaporkan video yang sinkron
sebagai 4 dari 5 tidak sinkron. Diuji dengan palet lama dan palet baru pada
frame yang sama, keduanya nol, jadi ini bukan akibat perubahan hari ini.

Yang diperbaiki:
- Penghitungan pindah ke RONA (hue). Pencahayaan mengubah gelap terangnya,
  bukan ronanya. Diuji pada tujuh detik `grafik6-transformasi`: 0, 1, 1, 2, 3,
  4, 5 titik, semuanya tepat.
- Palet TIDAK LAGI disalin sebagai angka, melainkan dibaca dari
  `manim/gl/tema.py` sebagai teks (tanpa `import manimlib`). Salinan lamanya
  sudah meleset: LATAR tertulis (245, 241, 234) padahal tema memakai `#F7F3EE`
  = (247, 243, 238).
- `--pola` tidak lagi punya nilai bawaan kalimat Grafik Fungsi. Kosong berarti
  menolak sambil mencontohkan pola Grafik Fungsi dan Statistika.
- Tambahan `--vtt` untuk berkas subtitle di luar tempat biasa.
- `--warna` menerima SOROT, AKSEN, AKSEN2. TINTA sengaja tidak: ia hampir
  kelabu (ronanya goyah) dan dipakai semua tulisan.
- `durasi.json` sengaja TIDAK dibaca. Ia cuma tahu panjang tiap segmen,
  sedangkan yang dibutuhkan adalah detik mulai tiap KALIMAT, dan itu sudah ada
  sebagai waktu mutlak di `.vtt`. MASTER menyetujui alasan ini.

### Hasil gerbang
| | tahap 3 | tahap 6 |
|---|---|---|
| durasi | 161,67 detik | 166,54 detik |
| selisih suara | 0,45 detik | 0,41 detik |
| `cek_kode` | bersih | bersih |
| lembar kontak | 41 frame, dibuka dan dinilai | 42 frame, dibuka dan dinilai |
| beku + nyaris kosong | tinggal kartu judul | tinggal kartu judul |
| `cek_sinkron_video` | 4 dari 4 sinkron (`--awal 2`) | 5 dari 5 sinkron |

### Belum selesai
- Video belum dipasang ke halaman dan belum di-commit: ARYA sedang menonton.
- Keputusan MASTER 4 Sep: bagian 3D tahap 6 (sekarang 14 detik) dipadatkan jadi
  sekitar 5 detik sebelum kamera turun ke bidang, sebab video pertama topik ini
  adalah tahap 3, bukan tahap 6. Menunggu jawaban ARYA sebelum render lagi.
- Tahap 3 detik 14-17: busur bola yang sudah mendarat diam 4 detik. Ringan.
- Panel rumus tahap 6 di KIRI atas, menyalahi STANDAR butir 111 (rumus di kanan
  atas). Disengaja dan beralasan: semua kurva topik ini naik ke kanan, dan pada
  render pertama rumus akar x tertimpa kurvanya sendiri di pojok kanan.
  Keputusan mau dibiarkan atau standarnya yang menyesuaikan ada di ARYA.

## Selesai

### Gerbang rancangan
- Membedah sumber kurikulum langsung ke berkasnya, bukan dari ingatan:
  buku Kelas 10 Bab 6 (Fungsi Kuadrat) dan Bab 1 (Eksponen dan Logaritma),
  buku Kelas 11 Bab 1 (Komposisi Fungsi dan Invers).
- Temuan yang mengubah rencana: **fungsi rasional, asimtot, dan fungsi nilai
  mutlak nol halaman** di kedua buku. Capaian Fase F (Kelas 11 halaman cetak 14)
  menyebut transformasi fungsi hanya untuk linear, kuadrat, dan eksponensial.
- ARYA diberi tahu dan tetap memilih memasukkan keduanya sebagai tahap sendiri.
  Keputusan dijalankan penuh, statusnya disebut jujur di badan teks tahap 7 dan 10.
- Rancangan: `docs/superpowers/specs/2026-09-01-grafik-fungsi-alur-belajar.md`.

### Isi topik, 12 tahap
Materi, latihan, kuis, dan halaman latihan lengkap. Halaman sudah bisa dibuka di
`/topik/grafik-fungsi` dan `/latihan/grafik-fungsi`.

| Berkas baru | Isi |
|---|---|
| `web/content/grafik-fungsi/tahap.ts` | 12 tahap |
| `web/content/grafik-fungsi/latihan.ts` | 4 soal A sampai E, plus 4 kanal YouTube |
| `web/content/grafik-fungsi/kuis.ts` | bank 32 soal (8 mudah, 10 sedang, 8 sulit, 6 sangat sulit) |
| `web/components/topik/PanggungGrafikFungsi.tsx` | penyetelan 11 widget |
| `web/components/widget/grafik-fungsi/` | 11 widget, galeri, dan alat gambarnya |
| `web/app/latihan/grafik-fungsi/page.tsx` | halaman latihan |
| `alat/cek_grafik_fungsi.py` | pemeriksa jawaban dengan sympy |

### Gerbang angka
- `python alat/cek_grafik_fungsi.py --uji-sendiri` lolos 15 kasus, **termasuk 7
  yang sengaja dibuat salah**. Pemeriksa yang selalu bilang lolos tidak berguna.
- 117 angka di materi lolos, 77 angka di latihan dan kuis lolos. Total 194.
- Satu kekeliruan tertangkap alat ini dan sudah diperbaiki: nilai tabungan bunga
  majemuk tahun ke-9 saya tulis 5.546.158, yang benar 5.546.157.

### Gerbang visual
Potret 1366 dan 375 piksel DIBUKA dan dinilai satu per satu, bukan cuma dibuat.
Enam cacat ditemukan dari melihat gambarnya, dan semuanya sudah diperbaiki:

| Cacat | Sebabnya | Perbaikan |
|---|---|---|
| Keterangan tahap 1 keluar bingkai kanan | kalimat 70 huruf, muatnya 60 | kalimat dipendekkan, plus pemotong otomatis di `Bidang` |
| Tulisan "memotong 1 kali" dan "x = 1" tertimpa kurva di tahap 2 | keterangan digambar DI DALAM kotak grafik | seluruh keterangan dipindah ke pita khusus di luar kotak |
| Kedua lengan parabola tahap 4 keluar kotak dan menimpa keterangan | jalur kurva boleh melewati batas jendela | isi grafik sekarang dipotong tegas pada batas kotak |
| Label "potong sumbu y" menabrak kurva | label digambar menempel di titiknya | dipindah ke pita keterangan |
| Tahap 11: kedua kurva jadi dua paku sempit, titik 26 dan 31 di luar layar | jendelanya dipatok terlalu lebar | jendela dihitung dari kurvanya sendiri dan wajib memuat titik yang disorot |
| Catatan bawah bertindih penunjuk skala | keduanya berbagi satu baris | catatan bawah dipendekkan otomatis kalau penunjuk skala menyala |

Dua perbaikan di antaranya menutup KELAS cacatnya, bukan satu kejadiannya:
pita keterangan di luar kotak, dan pemotongan gambar pada batas kotak. Setelah
itu, tabrakan teks dengan kurva tidak mungkin terjadi lagi di widget mana pun.

Satu foto galeri juga diganti setelah dilihat: foto antena parabola yang pertama
memajang logo merek besar dan lengkung parabolanya tidak terlihat. Diganti
piringan teleskop radio Parkes, yang bentuknya jelas dan bebas merek.

### Gerbang selesai
- `npx tsc --noEmit` bersih, `npx eslint .` bersih, `npm run build` lolos 16 halaman.
- Enam foto galeri berlisensi terbuka, sumber dan **nama pembuatnya** dicatat di
  `web/public/gambar/sumber.json` dan ditampilkan di halaman. Lima di antaranya
  CC BY atau CC BY-SA, yang memang mewajibkan atribusi terlihat.

## Sedang dikerjakan
- Tidak ada. Gelombang 1 selesai, menunggu tinjauan ARYA.

## Butuh MASTER

1. **`web/content/topik.ts`, satu baris, SUDAH SAYA UBAH.** `grafik-fungsi` dari
   `siap: false` menjadi `siap: true`. Saya laporkan terus terang karena berkas
   itu tidak disebut di tabel kepemilikan. Alasannya: tanpa baris itu
   `app/topik/[slug]/page.tsx` menampilkan kartu "belum dibangun" dan seluruh
   topik tidak bisa dibuka sama sekali, jadi hasil kerjanya tidak bisa ditinjau
   ARYA. Perubahannya satu baris, khusus topik ini, dan tidak mungkin bentrok
   dengan sesi lain karena tiap sesi mengubah barisnya sendiri. Kalau MASTER
   menilai ini melanggar, silakan dibatalkan dan ambil alih.

2. **Usul menaikkan alat gambar ke folder bersama.** `koordinat.ts` dan
   `Bidang.tsx` disalin dari `components/widget/limit/` karena berkas itu wilayah
   sesi Limit. Salinan di sini sudah BERKEMBANG lebih jauh: ada pita keterangan
   di luar kotak, pemotongan gambar pada batas kotak, `jalurParametrik` untuk
   bentuk yang bukan fungsi, dan `keMatematika` untuk widget yang titiknya
   diseret. Setelah semua digabung, sebaiknya versi inilah yang dinaikkan ke
   `components/widget/bersama/`, karena dua perbaikan tata letaknya juga berguna
   untuk widget Limit.

3. **Jenis blok baru untuk rujukan antartopik.** ARYA meminta ada pengingat
   mempelajari Limit saat materinya bersinggungan. Tahap 8 dan 10 sudah memuatnya
   sebagai teks biasa. Supaya bisa diklik, perlu jenis blok `rujuk` di
   `content/tipe.ts` (milik MASTER) dan perendernya di `Penjelasan.tsx` (milik
   UI/UX).

4. **Catatan kecil, bukan permintaan.** `components/topik/Penjelasan.tsx` masih
   mengimpor tipe `Blok` dari `@/content/trigonometri`, padahal tipe itu sudah
   pindah ke `@/content/tipe`.

## Butuh MATRA-DESAIN-UI-UX

Dua temuan tampilan yang BUKAN milik sesi ini, dan keduanya sudah ada sebelum
topik ini dibuat. Diukur, bukan dikira-kira.

1. **Halaman topik rusak di lebar 375 piksel, di SEMUA topik.** Kolom kiri dan
   kolom kanan saling tumpang tindih, tulisan menimpa tombol. Sudah dibandingkan
   dengan potret `/topik/limit` yang sudah tayang: rusaknya sama persis. Ini
   penting karena ARYA meninjau dari HP.

2. **Halaman menggulir menyamping di 375 piksel.** Lebar isi lebih besar
   daripada layar: Trigonometri 461, Limit 432, Grafik Fungsi 432, sedangkan
   layarnya 375. Yang meluber terutama blok berkelas `kode`.

3. Baris tab di lebar 1366 hanya memuat sampai MATERI 09; sisanya perlu digulir.
   Barisnya memang `overflow-x: auto`, jadi tidak ada yang hilang, tetapi tidak
   ada tanda apa pun bahwa ia bisa digulir. Dengan 12 tab, tiga tab terakhir
   praktis tidak akan ditemukan siswa.

## Butuh keputusan ARYA
- **Tinjau isinya.** Angkanya sudah diperiksa mesin, tetapi ketepatan bahasa dan
  tingkat kesulitan untuk siswa SMA tetap perlu mata ARYA. Yang paling perlu
  dicek: tahap 6 (aturan luar kurung lawan dalam kurung) dan enam soal kuis
  bertingkat sangat sulit.
- **Soal mathcyber1997.** Sesuai jawaban ARYA di gerbang rancangan, kalibrasi
  memakai buku Kemendikdasmen dulu. Soal pembanding dari mathcyber ditunggu.
- **Berat foto galeri.** Enam foto totalnya sekitar 1 MB, yang terberat
  `bakteri.jpg` 265 KB. Belum dikompres. Sejalan dengan catatan lama di
  `PROGRESS.md` soal pengompresan gambar sebelum deploy.

---

# Pemeriksaan ulang setelah penyelarasan ke master (2 September 2026)

Diminta MASTER: potret ulang tampilan HP setelah perbaikan UI/UX masuk, lalu
laporkan apakah sudah benar. Dikerjakan dengan aturan baru: port 3011,
`playwright-cli -s=matra-grafik-fungsi`, verifikasi lewat biner Node langsung.

## Tampilan HP 375 piksel: SUDAH BENAR

Dua cacat yang saya laporkan sebelumnya keduanya hilang.

| Yang diukur | Sebelum (1 Sep) | Sekarang (2 Sep) |
|---|---|---|
| Lebar isi halaman lawan lebar layar | 432 lawan 375, menggulir menyamping | **375 lawan 375, tidak menggulir** |
| Kolom kiri dan kanan | saling tumpang tindih, tulisan menimpa tombol | **satu kolom rapi, tidak ada tumpang tindih** |

Tiga tahap dibuka dan DINILAI dengan mata, bukan cuma dipotret:

- **Tahap 1**: satu kolom, menu jadi tombol tiga garis, baris tab bisa digulir,
  widget di atas dan bacaan di bawah. Keterangan di pita atas tetap terbaca.
- **Tahap 5**: kedua titik yang bisa diseret tetap terlihat jelas dan berlabel,
  rumusnya tidak tertimpa apa pun.
- **Tahap 12**: satu kartu foto per baris, fotonya utuh tidak terpotong,
  keterangan dan kredit fotonya terbaca.

Delapan elemen memang masih melewati tepi layar, tetapi semuanya tombol MATERI
di dalam baris tab yang memang `overflow-x: auto`. Itu gulir di dalam wadahnya
sendiri, bukan halaman yang meluber, dan `document.body.scrollWidth` sudah sama
dengan lebar layar.

## Verifikasi lewat biner Node langsung

Aturan baru dipatuhi: `rtk` tidak dipakai untuk pemeriksaan.

- **Bukti tsc memang hidup**: satu baris `const sengajaSalah: number = "..."`
  disisipkan sengaja ke `fungsi.ts`. tsc MENOLAKNYA dengan
  `error TS2322: Type 'string' is not assignable to type 'number'` dan kode
  keluar 2. Baris itu lalu dibuang, dan `git diff` kembali kosong, jadi
  berkasnya persis seperti semula.
- `node node_modules/typescript/bin/tsc --noEmit` kode keluar **0**.
- `node node_modules/next/dist/bin/next build` kode keluar **0**.
- `python alat/cek_grafik_fungsi.py --uji-sendiri` tetap menolak ketujuh kasus
  yang sengaja dibuat salah; 117 angka materi dan 77 angka soal tetap lolos.

Catatan cara kerja: `cp` untuk mengembalikan berkas GAGAL diam-diam karena ia
bertanya "overwrite?" dan tidak mendapat jawaban. Itu jebakan yang sudah
tercatat di `PROGRESS.md`, dan saya masuk ke dalamnya. Pengembaliannya dikerjakan
ulang dengan alat sunting berkas.

## Satu cacat ditemukan, BUKAN milik sesi ini

`node node_modules/eslint/bin/eslint.js .` gagal dengan kode keluar **1**:

```
web/components/widget/ruang-3d/Bingkai3D.tsx
  139:27  error  Cannot access refs during render   react-hooks/refs
  cursor: onUbah ? (seret.current ? 'grabbing' : 'grab') : 'default',
```

Berkas itu berasal dari commit `d179cc0` milik **MATRA-RUANG-TIGA-DIMENSI**,
jadi tidak saya sentuh sesuai aturan kepemilikan. Perlu diteruskan ke sesi itu.

Dampaknya nyata, bukan sekadar keluhan pemeriksa: membaca `seret.current` saat
render membuat kursor tidak berubah menjadi "grabbing" pada saat yang tepat,
karena mengubah `ref` tidak memicu render ulang. Perbaikannya biasanya
memindahkan keadaan "sedang menyeret" dari `useRef` ke `useState`. Widget saya
memakai `useState` untuk hal yang sama, jadi polanya sudah ada contohnya di
`components/widget/grafik-fungsi/SusunParabola.tsx`.

**Akibatnya `eslint .` seluruh proyek masih merah**, dan gerbang "eslint bersih"
belum bisa dinyatakan lolos oleh siapa pun sampai berkas itu diperbaiki.


---

# Gelombang 2, tahap revisi isi (2 September 2026)

## Lima revisi tinjauan MASTER: selesai semua

| # | Revisi | Hasil |
|---|---|---|
| 1 | Huruf x sebagai tanda kali di 9 baris | diganti lambang kali, sisa nol |
| 2 | Tahap 2 memanggil ulang fungsi linear SMP | ditambahkan sebelum mesin f(x) = 2x + 1 |
| 3 | Tahap 11 dipecah jadi komposisi dan invers | jadi 13 tahap, ikutannya diperiksa satu per satu |
| 4 | Kata yang menghakimi tugas siswa | 6 kalimat diganti |
| 5 | Kompresi enam foto galeri | semuanya di bawah 150 KB, total 820 KB jadi 531 KB |

## Daftar periksa 10 butir per tahap

Butir 2, 4, 6, 7, 9, dan 10 dijawab MESIN lewat `alat/periksa_tahap.py`, karena
jawaban mesin lebih dapat dipercaya daripada mata yang sudah membaca berkas
yang sama belasan kali. Butir 1, 3, 5, dan 8 dinilai sendiri setelah menarik
pertanyaan pembuka, blok pertama, dan isi `seringKeliru` tiap tahap.

| # | Tahap | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Grafik itu bercerita | sbg | ya | ya | ya | ya | n/a | ya | ya | ya | ya |
| 2 | Potret sebuah aturan | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 3 | Parabola dan bentuk puncak | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 4 | Bentuk umum dan diskriminan | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 5 | Menyusun rumus dari gambarnya | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 6 | Geser, cermin, regang | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 7 | Nilai mutlak, cara melipat grafik | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 8 | Eksponen, tumbuh dan meluruh | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 9 | Logaritma yang dicerminkan | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 10 | Fungsi rasional dan asimtotnya | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 11 | Dua mesin dirangkai | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 12 | Mesin yang membatalkan | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 13 | Dipakai di dunia nyata | sbg | ya | ya | n/a | ya | n/a | n/a | n/a | ya | ya |

`sbg` berarti sebagian, `n/a` berarti butirnya memang tidak berlaku.

### Yang TIDAK penuh, dan kenapa dibiarkan begitu

**Butir 1, tahap 1 dan tahap 13: sebagian.** Pertanyaan pembukanya bisa dijawab
sekilas oleh siswa sebelum membaca. "Apa yang sebenarnya diceritakan sebuah
grafik?" akan dijawab "ya isinya data", dan "di mana grafik dipakai orang?"
akan dijawab "di berita". Keduanya sengaja dibiarkan: tahap 1 adalah pintu
masuk yang tugasnya menurunkan pagar, bukan memasang teka-teki, dan tahap 13
galeri penutup yang memang merangkum. Sebelas tahap di tengah semuanya penuh.

**Butir 4, tahap 13: tidak berlaku.** Galeri tidak punya penanda `sesi` sama
sekali, karena isinya satu daftar contoh.

**Butir 6, tahap 1 dan 13: tidak berlaku.** Keduanya bukan tahap prosedur.
Tahap 1 sengaja tidak memuat satu pun rumus, dan itu keputusan ARYA di gerbang
rancangan.

**Butir 7 dan 8, tahap 13: tidak berlaku.** Galeri tidak interaktif, dan tidak
ada kekeliruan khas yang perlu diluruskan di sana.

### Enam perbaikan yang lahir dari daftar periksa ini

Daftar ini bukan formalitas; ia menemukan hal yang belum beres:

1. **Tahap 1 tidak memanggil ulang apa pun** (butir 2). Ditambahkan: grafik
   kasus penyakit di berita, langkah harian di ponsel, nilai rapor.
2. **Tahap 8 juga tidak** (butir 2). Ditambahkan penghubung ke tahap 3 sampai 7:
   sampai sini x selalu dijumlah atau dipangkatkan, sekarang x pindah tempat.
3. **Tahap 4 membuka langsung dengan lambang** (butir 3). Sekarang dibuka dengan
   parabola jembatan gantung dari tahap 3 yang bentuknya tidak berubah, baru
   masuk ke tulisannya.
4. sampai 6. **Enam `seringKeliru` hanya membetulkan tanpa menyebut KENAPA
   kekeliruan itu menggoda** (butir 8), yaitu tahap 1, 4, 5, 6, 9, dan 10.
   Semuanya kini menyebutnya. Contoh tahap 6: godaannya kuat karena mengalikan
   dua di mana pun biasanya berarti membesarkan, dan itu memang benar untuk
   angka di LUAR kurung.

## Alat baru

| Berkas | Untuk apa |
|---|---|
| `alat/kompres_gambar.py` | Menurunkan berat foto di bawah 150 KB. Mutu diturunkan bertahap dan berhenti begitu batasnya terpenuhi, dan mutu di bawah 55 DITOLAK: lebih baik lapor gagal daripada diam-diam memasang foto berbercak |
| `alat/periksa_tahap.py` | Menjawab enam butir daftar periksa dari struktur isinya, dan menyiapkan bahan untuk empat butir sisanya |

Keduanya khusus topik ini, jadi tidak menyentuh wilayah sesi lain.


---

# Gelombang 2, video 1 dari 6: tahap 6 transformasi (2 September 2026)

**Selesai 480p, siap ditonton ARYA.**
Berkas: `media/uji-480p/grafik6-transformasi.mp4`, 2,43 MB, 123,96 detik.
Belum disalin ke situs, memang begitu untuk versi tinjauan.

| Bagian | Keadaan |
|---|---|
| Naskah | `manim/narasi/grafik6-transformasi.json`, 12 segmen, 123,98 detik |
| Adegan | `manim/scenes/grafik6_transformasi.py`, 12 babak, 75 animasi |
| Suara | `audio/grafik6-transformasi/`, edge-tts id-ID-ArdiNeural |
| Selisih gambar dan suara | 0,15 detik (batas berhenti 1,5 detik) |

## Rancangannya

Tahap 6 dipilih pertama karena ia poros topik ini, dan karena dua kekeliruan
terbesarnya (arah geser dan arah regang) adalah hal yang paling sulit
ditangkap dari halaman diam.

Dua babak sengaja BERHENTI sebelum menjawab, babak 4 dan babak 9. Rumusnya
ditulis, pertanyaannya diajukan, lalu diam beberapa detik. Alasannya: kedua
kekeliruan itu hanya menempel kalau penonton sempat menebak salah lebih dulu.

Tiga fungsi dasar dipakai berurutan, parabola lalu akar lalu kurva sinus,
dengan perlakuan yang sama persis. Kalau cuma parabola yang dipakai, aturannya
akan terlihat seperti sifat parabola, padahal justru itu yang mau dibantah.
Kurva sinus hanya DIPINJAM; pembentukannya milik Trigonometri tahap 8, dan
narasinya menyebut itu.

## Gerbang mutu: tiga cacat ditemukan, tidak satu pun terlihat dari log

Render pertama lolos semua pemeriksaan mesin: `cek_kode.py` bersih,
`qc.periksa_adegan` lolos di tiap babak, gerbang waktu `sinema.babak` lolos,
kode keluar 0, 63 animasi. Ketiga cacat di bawah ini baru ketahuan setelah
lembar kontaknya DIBUKA dan frame-nya dinilai satu per satu.

| Cacat | Sebabnya | Perbaikan |
|---|---|---|
| Rumus jadi coretan kembar tak terbaca sepanjang 2 detik tiap berganti (terlihat di detik 70) | `ReplacementTransform` antara dua `MathTex` yang jumlah lambangnya berbeda | rumus keluar dulu baru masuk, tidak pernah di-morph |
| Angka pada sumbu tidak terbaca di 480p | ukuran 20 dengan warna redup, di kedua sumbu | ukuran 26, warna tinta, dan hanya di sumbu x karena video ini soal perpindahan mendatar |
| Keterangan tertinggal satu babak: narasi bicara sinus, layar masih menampilkan keterangan babak akar | keterangannya dipasang di AKHIR babak | dipasang di AWAL babak |
| Potongan `x dikali 2 dulu` masih setengah tertulis di detik 102 | `Write` 1,8 detik terlalu cepat untuk dua baris | dinaikkan menjadi 2,4 detik |

**Cacat pertama itu sudah pernah terjadi dan sudah tercatat** di `PROGRESS.md`
untuk video Limit materi 06, lengkap dengan aturannya: untuk rumus, tukar
berurutan, jangan di-morph. Saya tetap mengulanginya. Sekarang aturan itu
ditulis ulang sebagai docstring `ganti_panel` di dalam berkas adegannya
sendiri, supaya terbaca oleh siapa pun yang menyunting berkas itu, bukan cuma
oleh yang sempat membaca PROGRESS.md sampai habis.

Render kedua diperiksa dengan cara yang sama: lembar kontak 32 frame dibuka,
plus frame lepas di detik 70 dan 102 yang tadi cacat. Ketiganya bersih.

## Catatan jujur yang tersisa

- **Bagian statis cukup panjang di beberapa babak**, sampai sekitar 7 detik.
  Layarnya tidak kosong (grafik, rumus, dan keterangan tetap tampil) dan
  narasinya tetap berjalan, jadi ini bukan waktu mati seperti cacat yang
  dulu ditemukan ARYA. Tetapi kalau ARYA merasa temponya melambat, yang
  dipendekkan adalah narasinya, bukan animasinya.
- **Sinusnya beramplitudo 2, bukan 1**, dan labelnya ditulis apa adanya
  `f(x) = 2 sin x`. Pada bidang setinggi 7,6 satuan, sin x biasa cuma jadi
  riak setipis 0,6 satuan layar dan pergeserannya tidak terlihat.
- **Jeda sekitar 1 detik setelah judul pembuka memudar** masih ada. Itu
  bawaan `sinema.judul_pembuka` dan berlaku untuk SEMUA video MATRA, jadi
  perbaikannya milik MASTER, bukan sesi ini.

## Sisa lima video, urut prioritas file tugas

2. Tahap 3 bentuk puncak, 3. Tahap 4 melengkapkan kuadrat, 4. Tahap 9 lipat
ke y = x, 5. Tahap 8 balapan tiga kurva, 6. Tahap 10 asimtot bergeser.


---

# Butuh MASTER: tiga cacat video yang kemungkinan besar ada juga di sesi lain

Ditulis di sini karena pesan antar-sesi ke MASTER kedaluwarsa tanpa sampai.
Berkas laporan adalah jalur resminya, jadi ini yang dipakai.

Render uji pertama video saya **lolos SEMUA pemeriksaan mesin** dan tetap punya
tiga cacat. Kalau tiga pola di bawah ini juga dipakai sesi lain, cacatnya ikut
terbawa, dan tidak akan tertangkap oleh pemeriksa mana pun.

### 1. Rumus jangan pernah di-morph
`ReplacementTransform` antara dua `MathTex` yang jumlah lambangnya berbeda
menghasilkan tulisan kembar buram selama seluruh animasinya. Aturan ini SUDAH
tercatat di `PROGRESS.md` untuk Limit materi 06, dan saya tetap mengulanginya.

Pelajaran yang lebih penting daripada cacatnya sendiri: **aturan yang cuma
hidup di `PROGRESS.md` tidak cukup.** Saya tulis ulang aturan itu sebagai
docstring `ganti_panel` di dalam berkas adegan saya sendiri, supaya terbaca
oleh siapa pun yang menyunting berkas itu. Usul: sesi lain yang menulis adegan
melakukan hal yang sama, atau `sinema.py` diberi fungsi `ganti_rumus()` resmi
oleh MASTER supaya polanya tidak bisa salah.

### 2. Angka pada sumbu tidak terbaca di 480p
Ukuran 20 dengan warna redup tinggal bayangan pada lembar kontak 480p. Diubah
ke ukuran 26, warna tinta, dan hanya di sumbu yang memang dipakai. Layak
diperiksa di adegan sesi lain, karena ukuran 20 itu saya tiru dari adegan yang
sudah ada.

### 3. Keterangan jangan dipasang di AKHIR babak
Kalau `sinema.keterangan()` dipanggil di akhir babak, sepanjang babak itu layar
masih menampilkan keterangan babak SEBELUMNYA. Akibatnya narasi bicara satu
hal dan tulisan di layar bicara hal lain, dan itu masuk kategori "gambar yang
membantah narasinya" di gerbang video `CLAUDE.md`. Pasang di awal babak.

### Masih terbuka, bukan wilayah saya
`web/components/widget/ruang-3d/Bingkai3D.tsx` baris 139 membaca `ref` saat
render. `node node_modules/eslint/bin/eslint.js .` gagal kode keluar 1 karena
itu, jadi gerbang "eslint bersih" belum bisa dinyatakan lolos oleh sesi mana
pun. Perbaikannya memindahkan keadaan sedang-menyeret dari `useRef` ke
`useState`; contoh polanya ada di
`web/components/widget/grafik-fungsi/SusunParabola.tsx`.


---

# Pindah ke ManimGL, dan video tahap 6 dibangun ulang (2 September 2026)

ARYA mencabut Manim Community. Adegan tahap 6 versi Manim CE yang selesai
beberapa jam sebelumnya ikut usang dan dipindah ke `manim/arsip-manim-ce/`,
BUKAN dihapus: storyboard dan catatan tiga cacatnya masih berguna saat menulis
ulang. Kodenya tidak disalin, API-nya berbeda.

Naskah narasi dan berkas suaranya TIDAK usang dan tetap dipakai, karena
keduanya tidak bergantung pada pustaka animasi.

## Pemanasan perkakas
`manimgl manim/uji/uji_ilustrasi_gl.py Etalase -w -l` jalan di worktree ini,
kode keluar 0. Lembar kontaknya dibuka: perahu, mobil, orang, bola, balok, dan
silinder tampil sebagai benda 3D bercahaya di atas lantai kisi, kamera bergerak
halus, label terbaca. Perkakasnya siap dipakai.

## Keputusan isi: bola di lembah, BUKAN bola dilempar

Aturan baru menuntut tiap video dibuka dengan benda nyata, dan rencana pertama
saya bola yang dilempar. Saya batalkan sendiri sebelum menulis kode:

> Lintasan bola yang dilempar adalah parabola terbuka ke **bawah**, sedangkan
> tahap ini seluruhnya memakai `f(x) = x²` yang terbuka ke **atas**.

Gambar yang membantah rumusnya sendiri adalah cacat terburuk menurut gerbang
video di `CLAUDE.md`. Gantinya bola yang menggelinding di dasar lembah: bentuk
lembahnya memang `x²`, dan bolanya yang terus mengayun sekaligus memenuhi
aturan 2, dunia tidak boleh membeku saat narator diam.

Lembahnya IKUT bergeser dan ikut berganti bentuk bersama kurvanya, memakai
`Transform`. Kalau hanya garis kurvanya yang pindah sementara lembahnya diam,
layar mengatakan dua hal yang berlawanan.

## Daftar periksa delapan aturan STANDAR-ILUSTRASI-VIDEO

| Aturan | Ya/Tidak | Catatan |
|---|---|---|
| Benda nyata dari `gl.ilustrasi`, tidak ada benda berupa titik atau garis | **ya** | `ilustrasi.bola` untuk bolanya; lembahnya ditambahkan sebagai `ilustrasi.lembah_fungsi` di AKHIR berkas sesuai aturan 1, bukan dibuat sendiri di dalam adegan |
| Latar hidup dan updater menjaga dunia bergerak saat diam | **ya** | bola mengayun terus di tiap babak, membaca bentuk yang sedang tampil |
| Kamera mulai dari dunia, satu gerakan panjang, tanpa sentakan | **ya** | babak 1 miring dan dekat; babak 2 satu terbangan 6,4 detik ke pandangan samping; babak lain kamera diam |
| Panah dan label di dunia, rumus di HUD, tidak diganti layar kosong | **ya** | penanda dan panah di dunia; panel rumus di HUD kiri atas; layar teks hanya di babak penutup |
| Satu warna satu makna, tidak ada kode heksa | **ya** | merah = di luar kurung, biru = di dalam kurung, ungu = kesimpulan, abu = bekas bentuk |
| `teks()` untuk kata, `rumus()` untuk angka dan rumus | **ya** | tidak ada satuan fisik di video ini, jadi `\mathrm` tidak terpakai |
| Semua animasi di dalam `sinema.babak`, ada jeda setelah pertanyaan | **ya** | dua babak tebakan diberi jeda 1,5 dan 1,6 detik sebelum dijawab |
| Gerbang mutu tidak dilewati | **ya** | `cek_kode` bersih, `periksa_adegan` di tiap babak, lembar kontak dibuka dan dinilai lima kali, `gabung_audio --uji` jalan |
| Cacat yang tersisa disebut di laporan | **ya** | ada di bawah |

## Lima ronde render, dan apa yang ditemukan tiap ronde

Ini bagian yang paling layak dibaca sesi lain.

| Ronde | Temuan | Ketahuan dari |
|---|---|---|
| 1 | GAGAL: `NameError: Dot3D` | pesan galat |
| 2 | enam cacat sekaligus (lihat daftar di bawah) | membuka lembar kontak |
| 3 | angka sumbu masih tertutup pita keterangan di bagian tengah | membuka lembar kontak |
| 4 | rumus membantah gambar 1,6 detik tiap bentuk berganti | membuka lembar kontak |
| 5 | bersih | membuka lembar kontak |

**Empat dari lima ronde itu lolos SEMUA pemeriksaan mesin**: `cek_kode` bersih,
`qc.periksa_adegan` lolos di tiap babak, gerbang waktu `sinema.babak` lolos,
kode keluar 0. Tidak satu pun cacat di bawah ini bisa ditemukan tanpa membuka
gambarnya. Kalau gerbang lembar kontak tidak ada, video ini sudah dinyatakan
selesai empat kali dalam keadaan cacat.

Enam cacat ronde 2, berikut sebab dan perbaikannya:

1. **Dinding lembah terpotong tepi atas layar.** `qc` tidak berbunyi karena
   lembahnya memang tidak saya masukkan ke daftar yang diperiksa. Sekarang
   ikut diperiksa, jadi kalau terulang rendernya GAGAL, bukan lolos diam-diam.
2. **Angka sumbu sebaris dengan pita keterangan.** Sudut kamera dinaikkan, lalu
   di ronde 3 angkanya dipindah ke ATAS garis sumbu.
3. **Panel rumus di pojok kanan atas tertimpa kurvanya sendiri** di babak akar.
   Semua kurva topik ini naik ke kanan, jadi panelnya pindah ke kiri atas.
4. **Bola lepas dari permukaan** dan melayang di udara 1,5 detik tiap bentuk
   berganti, sebab bola membaca bentuk lama sementara permukaannya sudah
   berubah. Sekarang keduanya membaca satu `ValueTracker` yang sama.
5. **Teks pertanyaan tebakan menimpa bola.** Dipindah ke pita keterangan yang
   beralas krem dan menempel di layar, jadi tidak mungkin bertabrakan.
6. **Rumus berganti setelah bentuknya selesai berubah**, sehingga panel sempat
   menyebut bentuk lama. Sekarang keduanya berganti bersamaan; rumus lamanya
   tetap dikeluarkan dulu, tidak pernah di-morph jadi rumus baru.

## Celah perkakas yang perlu diketahui sesi lain

**`cek_kode.py` tidak menangkap nama fungsi Manim Community.** Render pertama
gagal dengan `NameError: Dot3D`, padahal `cek_kode` melaporkan bersih. Alat itu
memeriksa LaTeX dan pola tulisan, bukan apakah nama yang dipakai benar-benar
ada di ManimGL. Sesi mana pun yang memindahkan adegan dari Manim CE
kemungkinan besar kena hal yang sama. Nama yang saya temui: `Dot3D` tidak ada,
dan `Dot` ManimGL adalah cakram datar di bidang xy yang menipis jadi garis
kalau dilihat dari samping.

Usul untuk MASTER: tambahkan daftar nama terlarang ke `cek_kode.py`
(`Dot3D`, `MathTex`, `Create(`, `ThreeDScene`, `add_fixed_in_frame_mobjects`,
`move_camera`), sama seperti ia sudah menolak `MathTex`. Murah, dan menghemat
satu ronde render penuh untuk tiap sesi.

## Cacat yang TERSISA, disebutkan bukan didiamkan

1. **Lembah `2 akar x` terbaca sebagai landaian, bukan lembah.** Itu memang
   bentuk fungsinya, dan justru itu yang mau ditunjukkan (aturannya tidak
   peduli bentuk grafiknya), tetapi kata "lembah" di narasi babak pembuka jadi
   kurang pas untuk babak ini. Tidak diperbaiki karena memperbaikinya berarti
   mengganti benda nyatanya di tengah video.
2. **Jeda sekitar satu detik setelah judul pembuka memudar.** Bawaan
   `sinema.judul_pembuka` dan berlaku untuk semua video MATRA, jadi
   perbaikannya milik MASTER.
3. **Bagian statis sampai sekitar 6 detik di beberapa babak.** Layarnya tidak
   pernah kosong dan bolanya tetap mengayun, jadi bukan waktu mati menurut
   aturan 7. Kalau ARYA merasa temponya melambat, yang dipendekkan narasinya.

## Berkas

| Berkas | Isi |
|---|---|
| `manim/narasi/grafik6-transformasi.json` | 12 segmen, 124,8 detik |
| `audio/grafik6-transformasi/` | suara per segmen dan durasinya |
| `manim/scenes/grafik6_transformasi.py` | adegan ManimGL, 12 babak |
| `manim/gl/ilustrasi.py` | ditambah `lembah_fungsi` di akhir berkas (aturan 1) |
| `media/uji-480p/grafik6-transformasi.mp4` | 2,6 MB, 124,8 detik, untuk ditinjau ARYA |

## Sisa lima video, urut prioritas

Tahap 3 bentuk puncak, tahap 4 melengkapkan kuadrat, tahap 9 lipat ke y = x,
tahap 8 balapan tiga kurva, tahap 10 asimtot bergeser. Menunggu ARYA menonton
yang pertama dulu, supaya kalau temponya perlu diubah, tidak lima video yang
harus diulang.


---

# Empat koreksi ARYA atas video tahap 6 (2 September 2026, sore)

ARYA menonton `media/uji-480p/grafik6-transformasi.mp4` dan menyebut empat hal.
Semuanya nyata, semuanya sudah diperbaiki, dan tiga di antaranya TIDAK bisa
ditangkap gerbang mesin mana pun yang ada sekarang.

## 1. "Bolanya terlihat seperti teleport ketika grafiknya berpindah"

**Sebabnya.** `geser_dunia` menggeser permukaan dan kurvanya dengan `shift`,
lalu baru MENCATAT geseran itu ke `self.f_kini` SESUDAH animasinya selesai.
Updater bola membaca `self.f_kini`, jadi selama 1,6 sampai 2 detik ia
menggelinding di tempat lamanya sementara lembahnya sudah pindah, lalu pindah
sendiri dalam satu frame.

Yang menyesatkan: peralihan BENTUK (`ubah_bentuk`) sudah punya obat untuk
masalah yang sama, yaitu `self.campur`. Saya membuat obatnya lalu tidak
memakainya di jalur satunya.

**Perbaikannya.** Dua `ValueTracker` baru, `self.geser_x` dan `self.geser_z`,
berjalan 0 ke dx dan 0 ke dz BERSAMAAN dengan `shift`. Updater bola membaca
keduanya: `f_kini(x - gx) + gz`. Karena keduanya memakai perlambatan bawaan
yang sama, posisi bola cocok dengan permukaannya di setiap frame, bukan cuma
di frame awal dan akhir. Ini bukan pencampuran kira-kira: geseran kaku memang
tepat sama dengan menggeser argumen fungsinya.

**Buktinya, diukur bukan dikira.** Sepuluh frame diambil di tengah kedua
geseran, lalu jarak piksel dari pusat bola ke kurva terdekat dihitung:

| detik | jari-jari bola | celah bola ke kurva |
|---|---|---|
| 28,8 sampai 30,4 (geser ke atas) | 17 px | -7,6 sampai +5,1 px |
| 49,6 sampai 51,2 (geser ke kanan) | 17 px | -7,7 sampai -3,4 px |

Angka negatif berarti kurvanya masuk ke dalam bola, jadi bolanya menempel.
Celah terburuk +5,1 px, kira-kira sepertiga jari-jari bola dan sekitar 1
persen tinggi layar. Sebelum diperbaiki bola tertinggal SATU SATUAN penuh,
sekitar 57 piksel, selama hampir dua detik.

## 2. "Subtitle menghalangi grafik, mungkin grafiknya bisa dibuat ke atas"

**Sebabnya.** Dua hal bertumpuk. Pertama, pusat kamera pandangan samping ada di
z = 2,7 sehingga garis sumbu jatuh di 394 piksel dari 480, cuma 11 piksel di
atas pita keterangan. Kedua, garis putus-putus penanda x = 1 turun sampai
z = -1,3, yang di layar MASUK ke pita itu.

**Perbaikannya.** `Z_BAWAH` dinaikkan dari -1,3 ke -0,8, dan pusat kamera
diturunkan (dunia naik di layar) dari z = 2,7 ke z = 2,3. Angka 2,3 dipilih
dari pengukuran, bukan kira-kira: pada percobaan pertama saya pakai 2,0, lalu
lembar kontaknya diukur dan ternyata sisa tepi atas tinggal 19 piksel
sedangkan celah ke keterangan jadi 51 piksel. Timpang. Pada 2,3 keduanya
seimbang.

| | sebelum | percobaan 2,0 | dipakai: 2,3 |
|---|---|---|---|
| sisa tepi atas | 58 px | 19 px | 24 sampai 26 px |
| celah grafik ke keterangan | 11 px | 51 px | 29 sampai 30 px |

## 3. "Judul dulu baru grafiknya, jangan sekaligus, terlalu rame dan berantakan"

**Sebabnya.** Babak 1 memasang lembah, kurva, dan bola lebih dulu, LALU
menaruh judul di atasnya. Judul yang menumpuk di atas permukaan 3D bercahaya
memang ramai.

**Perbaikannya, sesudah membaca ulang Trigonometri.** `arsip-manim-ce/scenes/
tahap8_grafik_sin.py` memperlihatkan polanya dengan jelas: babak pertama HANYA
judul, mengisi seluruh segmen narasi, di layar yang benar-benar kosong;
gambarnya dibangun di babak berikutnya. Pola itu yang dipakai sekarang.

Ini menuntut naskahnya ikut diubah, bukan cuma kodenya. Narasi lama segmen 1
berbunyi "Bola ini menggelinding di dasar lembah ...", padahal layarnya kini
kosong, dan menyebut benda yang belum ada melanggar aturan 2 STANDAR-MENGAJAR.
Jadi:

| segmen | isi baru |
|---|---|
| 1 `sapa` (BARU, judul saja) | pengumuman materi sesuai aturan 8: "Materi enam: geser, cermin, dan regang ..." |
| 2 `lembah` (SEGMEN BARU) | kalimat bola dan lembah pindah ke sini, tempat dunianya memang sedang dibangun |
| 3 `parabola` | tinggal soal terbang ke pandangan samping |

Videonya jadi 13 babak, 132,7 detik (sebelumnya 12 babak, 124,8 detik).
Garis kurvanya juga baru ditarik SESUDAH kamera mendarat: dari sudut miring ia
cuma coretan gelap di punggung lembah, dari samping barulah ia jadi grafik.

Segmen 1 sempat 10,3 detik, dan judul diam selama itu terlalu lama. Naskahnya
dipotong jadi 8,6 detik sebelum render.

## 4. "Subtitlenya masih ada background, harusnya dihapus"

Sudah dikerjakan MASTER di `8d7491e` untuk `keterangan` dan `judul_pembuka`,
jadi adegan ini ikut kena begitu `master` digabung. Yang tersisa milik saya
sendiri: babak penutup masih memanggil `sinema.alas_teks` untuk dua kalimat
kesimpulannya. Panggilan itu dibuang. Sekarang tidak ada satu pun alas krem di
video ini.

## Yang perlu diketahui sesi lain

**Tiga dari empat cacat ini lolos SEMUA gerbang mesin.** `cek_kode` bersih,
`qc.periksa_adegan` lolos di tiap babak, gerbang waktu `sinema.babak` lolos,
kode keluar 0, dan lembar kontak ronde 5 saya nilai bersih. Yang menemukan
ketiganya adalah ARYA, menonton videonya utuh.

Pelajarannya bukan "lembar kontak tidak berguna", tetapi bahwa lembar kontak
menangkap cacat DIAM (bertindih, terpotong, salah tulis) dan buta terhadap
cacat GERAK. Bola yang teleport hanya kelihatan kalau dua frame berurutan
dibandingkan, dan frame-frame lembar kontak saya berjarak belasan detik.

Karena itu ronde ini saya tambah satu langkah yang bisa dipakai sesi mana pun:
**ambil frame rapat (0,4 detik) tepat di tengah tiap perpindahan, lalu ukur
jarak piksel benda ke kurvanya**, bukan cuma dilihat. Cara mengukurnya sudah
terbukti sederhana: topeng warna untuk bendanya, topeng gelap untuk kurvanya,
lalu jarak terdekat. Itu yang menghasilkan tabel di butir 1.

## Berkas yang berubah

| Berkas | Perubahan |
|---|---|
| `manim/narasi/grafik6-transformasi.json` | 13 segmen, segmen `lembah` disisipkan, 3 segmen pembuka ditulis ulang |
| `audio/grafik6-transformasi/` | suara dan `durasi.json` dibuat ulang, 132,70 detik |
| `manim/scenes/grafik6_transformasi.py` | 13 babak, dua ValueTracker geseran, `SUDUT_GRAFIK` dan `Z_BAWAH` diubah, `alas_teks` dibuang |
| `media/uji-480p/grafik6-transformasi.mp4` | 2,63 MB, 132,67 detik, selisih suara 0,40 detik |


---

# Sumbu y, titik yang dihitung, dan pita subtitle (2 September 2026, malam)

Ronde koreksi kedua dari ARYA. **Butir 3 di bawah ini yang paling penting untuk
MASTER dan untuk semua sesi lain**, karena ia mengenai setiap video MATRA, bukan
cuma topik ini.

## 1. Sumbu y tidak ada sama sekali. Kesalahan saya.

ARYA: "kenapa garis y tidak dimunculkan? grafik fungsi wajib banget menampilkan
2 sumbu x dan y". Benar. `buat_sumbu` di adegan ini cuma menggambar satu garis
mendatar dengan angkanya. Tidak ada garis tegak, tidak ada angka y, tidak ada
huruf sumbu. Tidak ada alasan teknis; saya memang kelewat, dan tidak ada gerbang
yang memeriksanya.

Yang membuat ini lebih dari sekadar kurang rapi: tanpa sumbu tegak, kalimat
"naik satu satuan" tidak punya alat ukur di layar. Penonton disuruh percaya
narator. Widget di situs sudah benar sejak awal (dua sumbu, `Bidang.tsx` baris
110 dan 111), jadi videonya yang tertinggal dari widgetnya sendiri.

Sekarang: dua garis, angka x dari -3 sampai 4, angka y dari 1 sampai 5, dan
huruf `x` dan `y` di ujung masing-masing.

## 2. Kurvanya tidak boleh muncul begitu saja

ARYA: "wajib juga diberikan titik koordinatnya jika bisa, dimana koordinatnya
didapatkan setelah menghitung nilai fungsi. jadi siswa paham kenapa bisa
bentuknya seperti itu, tidak secara ajaib langsung menjadi seperti itu".

Babak baru `titik` (23,3 detik) disisipkan sebelum grafiknya dipakai:

1. Lima nilai dihitung di layar satu per satu, ditulis penuh:
   `f(-2) = (-2)^2 = 4`, lalu `f(-1)`, `f(0)`, `f(1)`, `f(2)`.
2. Tiap hasil langsung menurunkan satu titik ungu ke bidangnya, pada saat yang
   sama dengan barisnya muncul.
3. Baru SESUDAH kelima titik berdiri sendiri, kurvanya ditarik melewatinya.

Lima titik, bukan tiga. Dengan tiga titik bentuk parabola masih terasa ditebak;
dengan lima, kesetangkupannya kelihatan.

**Titiknya tidak dibuang setelah kurvanya jadi.** Ia ikut bergeser bersama
grafiknya di babak-babak berikutnya, jadi ketika seluruh grafik naik satu
satuan, penonton melihat titik (2, 4) menjadi (2, 5), dan setelah geseran ke
kanan menjadi (3, 5). Transformasinya terbaca sebagai ANGKA yang berubah, bukan
cuma gambar yang bergerak. Titiknya baru dilepas saat bentuk fungsinya berganti
ke akar dan sinus, karena `2^2 = 4` memang tidak berlaku lagi di sana.

**Jebakan ManimGL yang hampir saya lepas ke video.** `FadeOut` di ManimGL
MENGEMBALIKAN objeknya ke keadaan semula saat ia dibersihkan dari adegan. Jadi
kalau objek yang sudah di-`FadeOut` disentuh lagi oleh animasi berikutnya
(`geser_dunia` menggeser semua yang ada di daftar `self.ikutan`), ia masuk lagi
ke layar TERANG BENDERANG. Ketahuan saat membaca ulang urutan babak, bukan dari
gerbang mana pun. Sesi lain yang memakai pola "fade out lalu masih dianimasikan"
kena hal yang sama.

## 3. UNTUK MASTER: pita keterangan menempati tempat subtitle

Ini temuan yang berlaku untuk SEMUA video MATRA, bukan topik ini saja.

**Keadaannya.** `gl.sinema.keterangan` menaruh tulisan di y = -3,30, yang pada
video 480p jatuh di piksel 429 sampai 446 dari 480. Peramban menaruh subtitle
`<track>` dari `web/public/anim/<topik>.vtt` di pita yang kira-kira sama, 420
sampai 470. Jadi di situs, keterangan di dalam gambar dan subtitle saling
menimpa. Ini kemungkinan besar yang dilihat ARYA waktu bilang "subtitle
menghalangi grafik".

Tidak ada gerbang yang bisa menangkapnya, karena keduanya hidup di dunia yang
berbeda: satu dirender Manim, satu digambar peramban. Lembar kontak video tidak
pernah memperlihatkan subtitle sama sekali.

**Yang saya kerjakan di topik ini** (tambalan lokal, bukan perbaikan perkakas):
dunianya dikecilkan (`tinggi` 8,4 ke 10,2, pusat z ke 2,28) dan keterangan
dinaikkan ke y = -2,55 lewat satu pintu `self.ket`. Hasilnya tiga pita yang
tidak pernah bersentuhan, diukur di tujuh frame:

| pita | piksel |
|---|---|
| panel rumus | 26 sampai 50 |
| grafik | 62 sampai 375 |
| keterangan | 384 sampai 401 |
| KOSONG untuk subtitle | 402 sampai 479 |

**Usul untuk MASTER.** Ini pantas jadi keputusan perkakas, bukan tambalan tiap
sesi: naikkan bawaan `keterangan` dan sediakan tinggi baku "pita subtitle" yang
tidak boleh dimasuki adegan mana pun. Kalau tidak, tiap topik menyelesaikannya
sendiri-sendiri dengan angka berbeda, dan lima sesi lain akan menemukan cacat
yang sama satu per satu.

**Percobaan pertama saya GAGAL dan itu ada gunanya.** Keterangan saya naikkan
lebih dulu tanpa mengecilkan dunianya, dan ia mendarat tepat di atas garis sumbu
x. Render tetap lolos: `qc.periksa_adegan` tidak pernah mengadu sumbu dengan
keterangan. Sekarang pasangan itu diperiksa OTOMATIS di tiap babak topik ini,
jadi kalau terulang rendernya gagal. **Sesi lain sebaiknya menambahkan
pasangan yang sama.**

## 4. Subtitle: sudah 100%, dan salinan uji sekarang membawanya

ARYA minta "subtitle tampilkan 100%, semua apa yang dikatakan narator, tidak
setengah-setengah". Setelah ditelusuri, subtitlenya MEMANG sudah 100%:
`buat_subtitle.py` menyalin seluruh naskah kata per kata, 48 baris untuk video
ini, dan `<track>` di `PemutarVideo.tsx` menyalakannya secara bawaan.

Yang salah adalah alur peninjauannya: berkas uji yang saya kirim ke ARYA adalah
mp4 polos tanpa jalur subtitle, jadi satu-satunya tulisan yang ia lihat di bawah
layar adalah KETERANGAN, yang memang cuma sorotan pendek. Wajar ia menyimpulkan
subtitlenya setengah-setengah.

Sekarang ada berkas kedua khusus untuk ditinjau,
`media/uji-480p/grafik6-transformasi-dengan-subtitle.mp4`, dengan subtitle
dibakar ke gambar supaya pasti terlihat di pemutar mana pun. **Versi yang tayang
di situs TETAP memakai berkas .vtt terpisah** sesuai keputusan ARYA 31 Agustus,
jadi masih bisa dimatikan, digeser, dan dibaca pembaca layar.

Usul untuk MASTER: `gabung_audio.py --uji` sebaiknya selalu membuat salinan
berbakar-subtitle ini. Peninjau tidak bisa menilai apa yang tidak ia lihat.

## Angka akhir ronde ini

| | sebelum | sesudah |
|---|---|---|
| babak | 13 | 14 |
| durasi | 132,7 detik | 160,5 detik |
| sumbu | 1 (x saja) | 2, berangka, berhuruf |
| kurva | langsung digambar | 5 nilai dihitung, diplot, baru disambung |
| pita bebas untuk subtitle | 34 piksel, DIPAKAI keterangan | 78 piksel, kosong |
| selisih suara | | 0,48 detik |

Cacat yang tersisa dan tidak saya diamkan: pada babak `titik`, keterangan yang
tampil selama 15 detik pertama masih milik babak sebelumnya ("dari samping,
lembahnya terbaca sebagai grafik"). Tidak salah, tapi juga tidak membantu.
Diperbaiki di ronde berikutnya bersama revisi isi dari ARYA, supaya tidak
menghabiskan satu render penuh sendirian.


---

# Dirombak jadi dua dimensi, dan lima aturan baru dari ARYA (2 September, malam)

Ronde ketiga. **Bagian "Untuk MASTER" di bawah membatalkan dua aturan yang
sekarang sedang dipakai lima sesi lain**, jadi itu yang perlu dibaca lebih dulu.

## Keputusan besar: panggung 3D dibatalkan untuk materi yang datar

ARYA, setelah bertanya "bolanya gunanya buat apa?":

> "kalau grafiknya tidak menunjukkan tanda-tanda 3 dimensi, ya jangan
> dipaksakan untuk seolah-olah dia berada di 3 dimensi. Gunakan 3 dimensi jika
> memang dibutuhkan, bukan dipaksakan harus semua mengandung scene 3 dimensi."

Saya membaca aturan 1 dan 2 `STANDAR-ILUSTRASI-VIDEO.md` ("benda nyata 3D
bercahaya", "dunia tidak boleh membeku") sebagai "tiap video wajib berpanggung
3D", lalu membungkus grafik y = x kuadrat jadi lembah 3D dengan bola
menggelinding tanpa henti di dasarnya. Grafik fungsi itu materi dua dimensi.
Bolanya bukan cuma mubazir, ia MENGGANGGU: gerakan bolak-balik terus-menerus
menarik mata menjauh dari yang sedang dijelaskan.

Sekarang benda nyatanya tinggal PEMBUKA sembilan detik: bola menggelinding
SATU kali dari tepi kiri ke tepi kanan, lalu berhenti. Sesudah itu lembah dan
bolanya pergi dan video sepenuhnya bidang datar. Kebetulan yang enak:
perlambatan bawaan `smooth` justru tepat secara fisika, pelan di tepi dan cepat
di dasar, persis bola sungguhan di lembah.

## Lima aturan ARYA yang sekarang mengatur tulisan di layar

### 1. Subtitle memakai notasi TERTULIS, bukan transkrip ucapan
Narator mengucapkan "titik dua koma empat", subtitle harus menulis "titik
(2, 4)". Narator "f dari x kurang satu", subtitle "f(x - 1)".

Saat ditelusuri, ternyata **tidak ada satu pun dari 17 naskah MATRA yang punya
bentuk tertulis terpisah**: semuanya cuma punya medan `teks`, dipakai mesin
suara DAN subtitle sekaligus. Jadi cacat ini ada di semua video, termasuk
Trigonometri dan Limit yang sudah tayang.

Naskah topik ini sekarang punya dua medan per segmen: `teks` (terucap) dan
`layar` (tertulis, opsional). `buat_subtitle.py` memakai `layar` kalau ada dan
jatuh kembali ke `teks` kalau tidak, jadi 16 naskah lain tetap jalan tanpa
diubah. Lambangnya memakai huruf Unicode (x kuadrat, tanda akar), BUKAN LaTeX:
subtitle digambar peramban dari berkas .vtt dan peramban tidak bisa membaca
LaTeX.

Sepuluh dari empat belas segmen sekarang punya bentuk tertulis sendiri.

### 2. Rumus baru LAHIR di tempat mata menatap, lalu terbang ke panel
ARYA: "mata kita saat ini terlalu fokus sama grafik, padahal ada penambahan
fungsi di pojok kiri atas". Rumus yang langsung terbit di pojok memang tidak
pernah terlihat, dan narasi sesudahnya jadi terasa tidak nyambung.

ARYA mengusulkan kotak merah berkedip. Saya tawarkan cara 3Blue1Brown sebagai
pilihan lain: rumusnya dibuat BESAR di tengah layar, ditahan setengah detik,
lalu mengecil dan berpindah ke panel. ARYA memilih yang itu, dan minta dicatat
sebagai pedoman tetap untuk semua grafik: mata mengikuti gerak yang menyambung,
ia tidak mengikuti benda yang tiba-tiba ada.

Ada satu tambahan yang tidak diminta tapi ternyata perlu: **selama rumusnya
besar, dunianya diredupkan ke 18 persen.** Tanpa itu rumus merah besar
bertumpuk dengan kurva dan angka sumbu, dan angka "3" mengintip dari sela huruf
f(x) sehingga terbaca seperti salah cetak. Meredupkan lebih baik daripada
memberi alas (alas dilarang ARYA) dan sekalian mengerjakan tugasnya lebih baik:
menyisakan SATU benda terang di layar.

### 3. Jangan menulis di layar apa yang sudah diucapkan
Versi lama menuliskan "tebak dulu: ke kiri, atau ke kanan?" padahal narator
mengucapkan kalimat itu dan subtitle sudah menampilkannya. Kata ARYA: "biar gak
rame dan fokusnya gak terbelah". Pita keterangan di dasar layar DIHAPUS
seluruhnya dari video ini.

### 4. Tulisan di dalam gambar = label, maksimal dua kata, menempel di bendanya
Pilihan ARYA sendiri saat ditanya: "singkat-singkat saja, dan padat, 2 kata
maksimal". Sekarang cuma tiga label di seluruh video: "naik 1", "ke KANAN",
"sampai duluan".

Batasnya dijaga mesin, bukan ingatan saya: `self.label` menggagalkan render
kalau lebih dari dua kata. Ia langsung menangkap satu kesalahan saya sendiri di
render pertama. Rumus tidak lewat sana, karena "x = 1" itu satu lambang utuh
dan bukan tiga kata.

### 5. Grafik fungsi wajib punya dua sumbu (dari ronde sebelumnya)
Tetap berlaku, dan sekarang sumbu itu jadi satu-satunya alat ukur di layar
setelah lembahnya pergi.

## Jebakan perkakas yang menghabiskan satu ronde render

**`b.jeda()` DIBATASI maksimum 1,6 detik oleh `gl.sinema` (`JEDA_MAKS`), tanpa
peringatan apa pun.** Jadi `b.jeda(6.4)` diam-diam jadi 1,6 dan `b.jeda(3.4)`
juga jadi 1,6. Akibatnya dua hal yang sudah saya tulis dengan benar tetap salah
di videonya:

- tulisan babak 13 menghilang di detik 142 padahal babaknya sampai detik 151,
  menyisakan sembilan detik layar beku;
- titik pertama di babak `titik` mendarat saat narator masih bertanya "kenapa
  bentuknya begitu", jadi jawabannya mendahului pertanyaannya.

Ketahuan dari lembar kontak, bukan dari galat. Untuk tunggu yang panjang dan
disengaja, pakai `self.wait(n)` lalu `b.catat(n)`; `b.jeda` hanya untuk jeda
pendek. Kalau sebuah tulisan memang harus bertahan sampai akhir babak, jangan
dipadamkan di babaknya sendiri: bawa ke babak berikutnya.

**Usul untuk MASTER:** `b.jeda` sebaiknya BERBUNYI kalau angkanya dipotong,
bukan memotong diam-diam. Satu baris peringatan sudah cukup.

## UNTUK MASTER: dua aturan proyek perlu diubah

Lima sesi lain (Limit, Statistika, Vektor, Ruang 3D, Trigonometri) sedang
membangun video di bawah aturan yang baru saja dibatalkan ARYA untuk materi
datar. Sebaiknya diteruskan sebelum mereka terlanjur:

1. **Aturan 1 dan 2 STANDAR-ILUSTRASI-VIDEO tidak berlaku mutlak.** Benda nyata
   3D dipakai kalau materinya memang tiga dimensi (Ruang 3D, Vektor), atau
   sebagai pembuka pendek untuk menunjukkan asal masalahnya. Bukan sebagai
   panggung seluruh video pada materi datar. "Dunia tidak boleh membeku" juga
   tidak boleh dipakai membenarkan benda yang bergerak terus-menerus tanpa
   makna: itu yang justru mencuri perhatian.
2. **Semua naskah perlu medan `layar`.** Subtitle yang mengeja "f dari x kurang
   satu" ada di semua topik. Alatnya sudah mendukung (jatuh kembali ke `teks`
   kalau tidak ada), tinggal naskahnya ditambahi.
3. **Pedoman "rumus lahir di fokus lalu terbang" berlaku untuk semua topik**,
   bukan cuma Grafik Fungsi. ARYA menyebutnya "wajib kita ingat selamanya".
   Layak dijadikan fungsi di `gl.sinema` supaya tidak ditulis ulang lima kali.

## Angka ronde ini

| | ronde 2 | ronde 3 |
|---|---|---|
| panggung | 3D sepanjang video | 2D, kecuali pembuka 9 detik |
| bola | mengayun tanpa henti | sekali jalan, lalu pergi |
| babak | 14 | 14 |
| durasi | 160,5 detik | 162,9 detik |
| pita keterangan | 384 sampai 401 px | dihapus |
| tulisan di gambar | kalimat penuh | 3 label, maksimal 2 kata |
| subtitle | ejaan ucapan | notasi tertulis, 45 baris |
| ruang bebas untuk subtitle | 78 px | 90 px |
| selisih suara | | 0,34 detik |

Diukur di enam frame salinan berbakar-subtitle: grafik berhenti di 389 piksel,
subtitle di 438 sampai 459. Jarak 49 piksel, tidak ada yang bersentuhan.

## Cacat tersisa, disebut bukan didiamkan

Beberapa babak sekarang punya lima sampai delapan detik layar diam, karena
bolanya tidak ada lagi yang mengisi kekosongan. Menurut saya itu bukan cacat:
diam sambil narator menjelaskan adalah tempo yang wajar, dan justru itu yang
diminta ARYA. Tapi aturan 7 (waktu mati) masih melarangnya di atas kertas, jadi
saya sebutkan supaya tidak dianggap kelalaian.


---

# Gambar mendahului suara, urutan terbalik, dan alat pemeriksa baru (ronde 4)

ARYA menemukan dua hal, dan menyuruh saya berhenti mengandalkan mata sendiri:
"mohon lebih teliti lagi dalam melakukan pembuatan grafik, mohon di crosscheck
ulang lagi menggunakan playwright atau tools sejenisnya". Ronde ini isinya
membangun alat pemeriksanya, dan alat itu langsung menemukan cacat yang sudah
lolos tiga ronde.

## 1. Gambar mendahului suara, terukur

ARYA: "subtitle dan suaranya telat saat menyebutkan titik-titik itu, sekitar
mulai detik ke 36." Diukur, ia benar dan lebih parah dari kedengarannya:

| yang terjadi | gambar | suara | selisih |
|---|---|---|---|
| titik x = -2 mendarat | 30,95 | 32,83 | 1,9 detik terlalu cepat |
| titik x = 2 mendarat | 39,10 | 39,67 | 1,7 detik terlalu cepat |
| kurva ditarik | 40,10 | 45,88 | 5,8 detik terlalu cepat |

**Sebab yang sebenarnya, dan ini penting untuk semua sesi.** Waktu animasi saya
susun sendiri dari `run_time` dan `jeda`, dan susunan itu tidak pernah tahu
kapan sebuah kalimat diucapkan. Ia cuma tahu panjang SELURUH segmen. Untuk
segmen berisi satu gagasan itu cukup. Untuk segmen yang menyebut lima angka
berurutan, tidak, dan tidak akan pernah cukup berapa kali pun ditebak ulang.

**Perbaikannya: animasi diikat ke JAM SUBTITLE.** `buat_subtitle.py` sudah
memecah tiap segmen per kalimat dan membagi waktunya menurut panjang hurufnya.
Angka itu dibaca balik oleh adegannya (`waktu_kalimat`, `mulai_kalimat`,
`self.tunggu_sampai`), jadi gambar, subtitle, dan suara sekarang dijalankan
oleh satu sumber waktu yang sama. Tiap titik mendarat tepat saat kalimatnya
mulai diucapkan, dan kurvanya ditarik tepat saat narator sampai di kata
"kurvanya cuma menghubungkan".

## 2. Urutannya terbalik

ARYA: "urutan pembuatan grafiknya kebalik, harusnya diberi fungsi f(x) = x^2,
lalu mengapa bentuknya seperti itu? barulah kita jelaskan dengan memasukkan
x = -2 s.d x = 2."

Betul, dan itu kesalahan mengajar, bukan kesalahan teknis. Versi sebelumnya
menghitung dulu, menggambar kurvanya, dan BARU menampilkan rumusnya di akhir.
Artinya penonton disuruh menghitung sesuatu yang aturannya belum diberitahukan.
Rumus `f(x) = x^2` sekarang ditulis di babak `datar`, sebelum pertanyaan
"kenapa bentuknya begitu" diajukan.

## 3. Alat baru: `alat/cek_sinkron_video.py`

Gerbang yang ada tidak mungkin menangkap cacat nomor 1. `cek_kode` memeriksa
tulisan, `qc.periksa_adegan` memeriksa tabrakan dan potongan, `sinema.babak`
memeriksa apakah animasi MELEBIHI narasi. Tidak ada yang memeriksa apakah
animasi MENDAHULUI narasi, padahal itu yang merusak: penonton melihat
jawabannya sebelum pertanyaannya selesai diucapkan.

Alat ini membaca `.vtt`, mengambil frame tepat sebelum tiap kalimat MULAI dan
tepat sebelum ia SELESAI, lalu MENGHITUNG bendanya lewat warna. Kalau kalimat
ke-3 disebut, di layar harus ada 2 benda sebelumnya dan 3 sesudahnya. Kalau
tidak, ia berteriak.

```
kalimat                      mulai  sebelum  sesudah  hasil
x = -2 memberi 4.            36.53        0        1  ok
x = -1 memberi 1.            38.29        1        2  ok
x = 0 memberi 0.             40.05        2        3  ok
x = 1 memberi 1.             41.71        3        4  ok
x = 2 memberi 4.             43.37        4        5  ok
>>> 5 kalimat sinkron: tiap benda muncul saat disebut.
```

**Percobaan pertama alat ini SALAH, dan itu layak dicatat.** Ia memakai ambang
jarak warna, dan abu hangat `REDUP` (139, 131, 120) ternyata jaraknya cuma 115
dari ungu `SOROT`, di bawah ambang 150. Jadi angka-angka sumbu ikut terhitung
sebagai benda dan alatnya melaporkan empat kesalahan palsu. Sekarang ia
MEMILAH ke warna terdekat dari seluruh papan warna tema, bukan sekadar
membandingkan dengan satu warna. Alat pemeriksa yang salah lebih berbahaya
daripada tidak punya alat, karena ia meyakinkan.

## 4. Cacat yang sudah lolos TIGA ronde, ketahuan dari satu frame

Saat mengambil frame di detik 31 untuk memeriksa urutan rumus, saya menemukan
coretan kecil melenceng di tepi kiri bawah. Itu rumus yang sedang terbang ke
panel, menuju tempat yang salah.

Sebabnya `besar` dikunci ke layar (`fix_in_frame`) sedangkan sasaran terbangnya
belum, jadi koordinat sasarannya masih koordinat DUNIA. Keadaan akhirnya tetap
benar karena panelnya diganti objek yang benar setelah animasi, jadi cacat ini
HANYA terlihat kalau frame diambil di tengah terbangnya yang cuma 1,2 detik.
Lembar kontak berjarak sepuluh detik melewatkannya tiga ronde berturut-turut.

Pelajarannya untuk sesi lain: **ambil frame di tengah animasi pendek, bukan
cuma di tengah babak.** Momen paling rawan justru yang paling singkat.

## 5. Pemeriksaan di peramban sungguhan (permintaan ARYA)

Subtitle situs dibuka di Chrome lewat Playwright, memakai berkas `.vtt` asli
dan gaya `::cue` yang sama dengan situs. Dua hasil:

**Posisi: aman, dan sekarang terbukti bukan terkira.** Chrome menaruh subtitle
di piksel 448 sampai 478 dari 480. Grafik berhenti di piksel 389. Jarak 59
piksel, tidak bersentuhan. Selama tiga ronde angka ini cuma perkiraan saya;
sekarang ia hasil ukuran.

**Warna: CACAT, dan mengenai semua video MATRA.** `video::cue` di
`web/app/globals.css` memakai `color: #FFFFFF` dengan garis tepi hitam. Putih
di atas latar krem hampir tidak terbaca, dan SEMUA video MATRA berlatar krem
(`LATAR` #F7F3EE). Di tangkapan layarnya, kata "Materi enam:" praktis hilang;
cuma bagian tebalnya yang terbaca, itu pun karena bayangannya.

Sudah diperbaiki: tinta gelap #1F2430 dengan garis tepi krem, lalu dibuka lagi
di Chrome untuk membuktikan. **Ini menyentuh berkas bersama
`web/app/globals.css`, jadi MASTER perlu tahu.** Perubahannya dua nilai warna,
dan sebelum ini berlaku untuk video Trigonometri dan Limit yang sudah tayang.

## Angka ronde ini

| | ronde 3 | ronde 4 |
|---|---|---|
| durasi | 162,9 detik | 166,5 detik |
| urutan | hitung, kurva, baru rumus | rumus, pertanyaan, hitung, kurva |
| sinkron titik dengan suara | 1,7 sampai 5,8 detik terlalu cepat | terverifikasi mesin, 5 dari 5 |
| rumus terbang | menuju titik yang salah | benar, diperiksa di tengah animasi |
| subtitle di peramban | diperkirakan | diukur: 448-478 px, jarak 59 px |
| warna subtitle situs | putih, nyaris tak terbaca di krem | tinta gelap, terbukti terbaca |
| selisih suara | | 0,34 detik |

## Cacat tersisa

Beberapa babak punya lima sampai delapan detik layar diam karena bolanya sudah
tidak ada. Menurut saya itu tempo yang wajar, bukan cacat, tapi aturan 7
(waktu mati) masih melarangnya di atas kertas jadi saya sebutkan.
