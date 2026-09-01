# Laporan MATRA-GRAFIK-FUNGSI
Terakhir: 1 September 2026, malam

## Selesai
- Membaca `PROGRESS.md`, `CLAUDE.md`, `ATURAN-SEMUA-SESI.md`, dan file tugas.
- Membedah sumber kurikulum, bukan mengandalkan ingatan:
  - `Buku Matematika Kelas 10 - Guru.pdf`: Bab 6 Fungsi Kuadrat (halaman cetak
    168 sampai 197) dan Bab 1 Eksponen dan Logaritma (halaman cetak 24 sampai 46)
  - `Buku Matematika Kelas 11 - Guru.pdf`: Bab 1 Komposisi Fungsi dan Invers
    (halaman cetak 21 sampai 64)
  - Temuan: **fungsi rasional, asimtot, dan fungsi nilai mutlak tidak ada sama
    sekali** di kedua buku. Capaian Fase F (Kelas 11 halaman cetak 14) menyebut
    transformasi fungsi hanya untuk linear, kuadrat, dan eksponensial.
- Gerbang rancangan: tiga pertanyaan diajukan ke ARYA, semuanya sudah dijawab.
- Rancangan tertulis:
  `docs/superpowers/specs/2026-09-01-grafik-fungsi-alur-belajar.md` (12 tahap,
  11 widget, satu galeri).

## Sedang dikerjakan
- Menunggu persetujuan akhir ARYA atas rancangan sebelum menulis satu baris kode.

## Butuh MASTER
1. **Satu baris di `web/content/topik.ts`**: `grafik-fungsi` diubah dari
   `siap: false` menjadi `siap: true` saat topik ini digabung. Berkas itu tidak
   disebut di tabel kepemilikan, jadi tidak disentuh sendiri.
2. **Usul menaikkan alat gambar ke folder bersama.**
   `components/widget/limit/koordinat.ts` dan `Bidang.tsx` dipakai persis oleh
   topik ini, tetapi berada di wilayah sesi Limit. Untuk gelombang 1 keduanya
   **disalin** ke `components/widget/grafik-fungsi/` supaya tidak memblokir
   siapa pun. Setelah semua sesi digabung, sebaiknya disatukan sekali ke
   `components/widget/bersama/` oleh MASTER.
3. **Jenis blok baru untuk rujukan antartopik.** ARYA meminta ada pengingat
   untuk mempelajari Limit saat materinya bersinggungan (tahap 8 dan 10 topik
   ini menyinggung asimtot). Supaya bisa diklik, perlu jenis blok `rujuk` di
   `content/tipe.ts` (milik MASTER) dan perendernya di
   `components/topik/Penjelasan.tsx` (milik MATRA-DESAIN-UI-UX). Untuk
   gelombang 1 dipakai blok `sorot` biasa berupa teks, tanpa tautan.
4. **Catatan kecil, bukan permintaan.** `components/topik/Penjelasan.tsx` masih
   mengimpor tipe `Blok` dari `@/content/trigonometri`, padahal tipe itu sudah
   dipindah ke `@/content/tipe`. Berjalan normal sekarang, tetapi akan
   membingungkan topik keempat dan seterusnya.

## Butuh keputusan ARYA
- **Persetujuan rancangan 12 tahap** sebelum pembangunan dimulai. Sedang ditunggu.
- **Tahap 12 galeri**: foto Wikimedia seperti Trigonometri, atau gambar buatan
  sendiri seperti Limit. Boleh diputuskan nanti saat tahap itu digarap.
- **Soal mathcyber1997**: ARYA akan menempelkan sendiri karena situs itu
  memblokir pemeriksa bot. Kalibrasi dari buku Kemendikdasmen jalan lebih dulu
  supaya pekerjaan tidak berhenti.
