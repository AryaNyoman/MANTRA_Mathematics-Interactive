# Empat generasi tampilan MANTRA (bahan dokumentasi tesis)

Potret diambil 12 September 2026 dari kode tiap generasi yang dihidupkan
kembali dari riwayat git (deployment lamanya di Vercel sudah dihapus untuk
menghemat penyimpanan). Semua potret memakai halaman yang sama supaya bisa
dibandingkan berdampingan: beranda, halaman materi (Trigonometri Materi 01),
materi berwidget (Materi 07 "Sudut istimewa", mode Coba sendiri), Peta Materi,
dan Latihan. Ukuran laptop 1366 x 768 piksel, HP 375 x 812 piksel. Berkas
`*-laptop.png` untuk beranda dan Peta Materi memuat seluruh halaman (gulir
penuh); yang lain sebatas satu layar.

| Folder | Generasi | Masa berlaku | Commit yang dipotret |
| --- | --- | --- | --- |
| `v1-matra-studio-teknis` | MATRA, rancangan pertama "Studio Teknis" | 31 Agu sampai 3 Sep 2026 | `ba3cf08` (3 Sep 13:20) |
| `v2-mantra-rancangan-pertama` | MANTRA, rancangan pertama | 3 sampai 4 Sep 2026 | `b2e8e5e` (4 Sep 13:08) |
| `v3-mantra-v2-panggung-sinema` | MANTRA v2 "Panggung Sinema" | 4 sampai 11 Sep 2026 | `da15623` (11 Sep 18:00) |
| `v4-mantra-sekarang` | MANTRA sesudah revisi ARYA 10 Sep | 11 Sep 2026 sampai sekarang | `f12ac36` (12 Sep) |

## Ciri tiap generasi

**v1. MATRA "Studio Teknis" (31 Agu sampai 3 Sep).** Nama situs masih MATRA.
Latar kertas berpetak, huruf monospace untuk label, tab "MATERI 01 ... 10"
berjajar mendatar di atas, widget interaktif tampil dominan di kiri dengan
bacaan di kanan. Beranda: logo besar, slogan tiga baris, korsel lima slide,
tiga kartu "Apa saja isinya", kartu enam topik. Di HP, tab materi menggulir
mendatar dan bacaan jatuh di bawah widget. Revisi besar 22 permintaan ARYA
(1 Sep) dan audit HP (2 Sep) terjadi di generasi ini.

**v2. MANTRA rancangan pertama (3 sampai 4 Sep).** Nama berganti MANTRA
(logo huruf M plus tulisan). Sistem desain baru: huruf Newsreader (serif)
dan Space Grotesk (sans), warna emas #B08A3E, navy #101A2B, kertas #FAF9F5.
Halaman materi memakai sidebar pohon sub-bab di kiri (A, B, C dengan tanda
centang kemajuan), remah roti, batang kemajuan, tombol Lanjutkan di nav.
Halaman Peta Materi lahir di sini (pilih bab, sub-bab, materi). Latar petak
masih dipertahankan.

**v3. MANTRA v2 "Panggung Sinema" (4 sampai 11 Sep).** Nav gelap navy dengan
tombol "Mode fokus"; halaman belajar dibongkar menjadi tiga kolom: sidebar
materi, bacaan di tengah dengan tombol Kembali dan Lanjut, kolom "Alat
interaktif" di kanan yang bisa ditarik lebarnya; latar petak dibuang.
Widget tidak lagi pecah saat zoom, kendali widget memakai komponen bersama
(nama plus arti, angka bisa diketik). Latihan disusun per bab, kuis
mendahulukan soal yang belum dikerjakan. Topik Transformasi Geometri,
Turunan, dan Integral masuk di generasi ini. Potret `materi-widget-laptop`
sengaja memperlihatkan cacat yang baru diperbaiki 12 Sep: tombol sudut di
atas 135° terpotong di kolom alat yang sempit.

**v4. MANTRA sekarang (11 Sep sampai sekarang).** Revisi ARYA 10 Sep: logo
lambang M saja, laci "Lanjutkan" berisi kemajuan tiap bab di samping Peta
Materi, pertanyaan bab di Peta Materi, istilah "Tahap" menjadi "Materi",
judul di atas video. Perbaikan 12 Sep: saklar subtitle hidup/mati, spasi
untuk putar/jeda, tombol pilihan membungkus ke baris berikutnya (bandingkan
dengan potret v3), subtitle tanpa potongan pendek. Semua video memakai
standar naskah v3.1.

## Cara membuat ulang potretnya

1. Keluarkan kode generasi yang diinginkan dari git ke folder sementara:
   `git archive <commit> web | tar -x -C <folder>`, lalu sambungkan
   `web/node_modules` ke node_modules proyek (junction; kunci `package-lock`
   keempat generasi identik).
2. Jalankan `npx next dev --webpack -p <port>` di folder itu (Turbopack
   menolak junction yang menunjuk ke luar folder proyek).
3. `node alat/potret_versi_ui.mjs <nama> <port> <folder-keluar>`. Skrip itu
   memenuhi permintaan video yang berkasnya tidak ada di generasi lama dengan
   video sekarang yang namanya sama, supaya pemutarnya tampil, bukan kotak
   galat.

Salinan kode keempat generasi yang dipakai malam ini ada di
`D:\MANTRA-BACKUP\2026-09-12\versi-ui\` (v1, v2, v3).
