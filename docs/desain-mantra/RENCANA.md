# Rencana penerapan desain MANTRA ke situs

Keputusan ARYA 3 Sep 2026: dikerjakan MASTER di worktree terpisah
(`.claude/worktrees/mantra`, cabang `sesi/mantra`), **sekaligus sampai selesai**,
lalu digabung sekali di akhir. Lima sesi lain terus mengerjakan video di
worktree mereka dan tidak boleh diganggu.

Sumber kebenaran: `docs/desain-mantra/HANDOFF.md` (spesifikasi lengkap dari
perancang) dan `MANTRA.dc.html` (sumber rancangan, hanya untuk dibaca).
Tangkapan layar tiap tampilan ada di `docs/desain-mantra/tangkapan/`.

## Yang TIDAK diubah (batas tegas)

- **Nama repo, folder, dokumen, dan sesi tetap MATRA.** Yang berganti jadi
  MANTRA hanya yang dilihat siswa (judul halaman, nav, manifes, kaki halaman).
  Mengganti nama internal berarti memaksa lima sesi menyelesaikan konflik untuk
  sesuatu yang tidak terlihat siapa pun.
- **Warna di dalam widget** (`samping #3A6EA5`, `depan #C25E4D`, `miring
  #1F2430`, `sudut #6A4C93`). Warna itu disamakan dengan video Manim; mengubahnya
  membuat gambar di situs membantah gambar di video.
- **Naskah materi** di `web/content/<topik>/tahap.ts`. Desain ini hanya
  mengelompokkan ulang dan mengganti kulitnya, bukan menulis ulang isinya.
- **Berkas milik sesi lain** selain penambahan medan `subbab` yang dijelaskan
  di tahap 4.

## Token (dari HANDOFF, final dan pasti)

| Nama | Nilai | Pakai |
|---|---|---|
| `--kertas` | `#FAF9F5` | dasar halaman |
| `--kartu` | `#FFFFFF` | kartu, panel, isi nav |
| `--cekung` | `#FAF9F5` | sidebar, sumur visual |
| `--tinta` | `#101A2B` | teks utama, tombol gelap |
| `--garis` | `rgba(16,26,43,.12)` | garis rambut |
| `--emas` | `#B08A3E` | tombol utama, garis tab aktif |
| `--emas-tua` | `#8A6A28` | teks emas di atas isian terang |
| `--biru` | `#2B4B8F` | kicker, kata "animasi" |
| `--hijau` | `#6E9C7A` | selesai, ekor bar kemajuan |
| `--jingga` | `#E8582C` | jawaban salah, kata "interaksi" |

Huruf: **Newsreader** (judul, 400/500 + italic 400) dan **Space Grotesk**
(antarmuka, 400/500/600/700). Fraunces, Inter, dan IBM Plex Mono dipensiunkan.
Ukuran huruf TETAP, tanpa `clamp()`, atas permintaan ARYA.

Latar kisi: `repeating-linear-gradient` 1px pada 8% tinta, jarak 60px, diam.

## Tahapan

### Tahap 1: fondasi
1. `web/app/layout.tsx`: muat Newsreader + Space Grotesk, judul jadi
   "MANTRA · Matematika Interaktif".
2. `web/app/globals.css`: ganti seluruh token warna dan huruf, tambah latar
   kisi, ganti gaya `video::cue` mengikuti palet baru.
3. `web/app/manifest.ts`: nama, nama pendek, warna tema.
4. Aset di `web/public/mantra/` (sudah disalin).

### Tahap 2: rangka dan rute
5. `web/components/Nav.tsx`: nav lengket 70px, logo, deretan tab dengan garis
   bawah beranimasi, label materi terakhir, pil "Lanjutkan".
6. `web/app/page.tsx`: beranda baru (hero, pita kurva, korsel, tiga kartu, CTA,
   kaki halaman).
7. `web/app/peta-materi/page.tsx`: RUTE BARU, kartu bab per kelas, kartu
   "Segera".
8. `web/app/tentang/page.tsx`: dua kolom, kartu Manim dan Claude, kartu penulis.
9. `web/app/latihan/page.tsx`: kartu ringkasan per bab + ubin tingkat.

### Tahap 3: halaman materi
10. `web/components/topik/HalamanTopik.tsx`: sidebar pohon menggantikan deretan
    tab; remah roti; panel visual; panel isi; pasangan Kembali/Lanjut.
11. Bank soal dan kuis: sambungkan ke `web/lib/latihan-kemajuan.ts` yang sudah
    ada, jangan tulis ulang aturannya. Syarat kunci kuis WAJIB terlihat.

### Tahap 4: struktur isi
12. Medan `subbab` di `web/content/<topik>/`: pengelompokan sudah disepakati
    dan ditulis di bawah. Ini satu-satunya berkas milik sesi lain yang disentuh,
    jadi perubahannya dibuat sekecil mungkin: satu daftar per topik, tanpa
    menyentuh isi `tahap`.

### Tahap 5: pembuktian
13. `tsc`, `eslint`, `next build` lewat biner Node langsung.
14. Playwright: potret tiap rute pada 1366 dan 375, DIBUKA dan dinilai.
15. Bandingkan dengan `docs/desain-mantra/tangkapan/`.

## Pemetaan Bab dan Sub-bab (dari rancangan, sudah disetujui)

| Bab | Kelas | Sumber | Topik | Sub-bab |
|---|---|---|---|---|
| 3 | 10 | K10 Bab 3 | Vektor dan Operasinya | A Pengertian, notasi, jenis (1,2) · B Vektor dan sistem koordinat (3,4,5) · C Operasi vektor (6,7,8,9) · D Perkalian titik dan proyeksi (11,12) · E Penerapan (10) |
| 4 | 10 | K10 Bab 4 | Trigonometri | A Perbandingan Trigonometri (1,2,3,4) · B Lingkaran Satuan dan Sudut Istimewa (5,6,7) · C Grafik Fungsi Trigonometri (8,9) · D Penerapan (10) |
| 6 | 10-11 | K10 Bab 1 & 6, K11 Bab 1 & 4 | Grafik Fungsi | A Fungsi dan grafiknya (1,2) · B Fungsi kuadrat (3,4,5) · C Transformasi fungsi (6,7) · D Eksponen dan logaritma (8,9) · E Rasional, komposisi, invers (10,11,12) · F Penerapan (13) |
| 7 | 10-11 | K10 Bab 7, K11 Bab 3 | Statistika | A Penyajian data (1,2,3,4) · B Ukuran pemusatan dan penyebaran (5,6,7,8,9) · C Hubungan dua variabel (10,11,12,13) |
| 1 | 12 | K12 Bab 1 | Dimensi Tiga | A Kedudukan titik, garis, bidang (1,2) · B Jarak dalam ruang (3,4,5,6,7) · C Sudut dalam ruang (8,9) · D Penerapan (10) |
| 4 | 12 | K12, LIMIT.pdf | Limit Fungsi | A Konsep limit (1,2,3,4) · B Sifat dan cara menghitung (5,6,7) · C Limit trigonometri dan kekontinuan (8,9) · D Penerapan (10) |

Catatan perancang: Grafik Fungsi sengaja melintasi empat bab buku, dan Vektor
materi 10 ("dunia nyata") dipindah ke sub-bab penutup "Penerapan".

## Utang yang diserahkan ke pemilik berkasnya

- Video di korsel dan panel materi masih poster JPG. Diganti klip bisu berulang
  saat berkasnya siap (`gabung_audio.py` menghasilkan WebM).
- "Pasang di HP" perlu disambungkan ke `TombolPasang.tsx` yang sudah ada.
- Bab "Segera" (barisan dan deret, eksponen dan logaritma, peluang, turunan,
  integral) baru kartu penanda.
