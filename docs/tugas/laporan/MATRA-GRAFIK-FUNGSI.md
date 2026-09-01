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
