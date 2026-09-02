# Laporan MATRA-GRAFIK-FUNGSI
Terakhir: 2 September 2026, dini hari

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
