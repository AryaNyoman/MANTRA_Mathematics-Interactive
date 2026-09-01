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
