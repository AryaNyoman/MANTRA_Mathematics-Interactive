# MATRA-STATISTIKA

Kamu sesi MATRA-STATISTIKA. Baca dan patuhi
`docs/tugas/ATURAN-SEMUA-SESI.md` SEBELUM baris mana pun di bawah ini.

## Misi
Topik **Statistika** utuh selevel SMA: materi bertahap (sekitar 8-10 tahap),
widget interaktif, latihan terbimbing, kuis. Gelombang 1 = halaman saja,
tanpa video.

## Sumber utama
- `D:\BAHAN MATEMATIKA\Buku Matematika Kelas 10 - Guru.pdf` dan `Kelas 11 - Guru.pdf`
  (bab statistika; verifikasi sendiri penempatan kelasnya)
- Big book SMA dan https://mathcyber1997.com (kalibrasi soal)

## Aturan khusus topik ini
- **Data wajib jujur.** Data nyata harus bersumber (tautan + siapa yang
  menerbitkan). Data buatan harus DIKATAKAN buatan di halaman. Dilarang
  menyajikan data karangan seolah sungguhan.
- **Baca skill `dataviz` SEBELUM menggambar diagram apa pun.** Topikmu
  paling banyak grafiknya, paling gampang jadi berantakan.

## Cakupan yang diharapkan (rancanganmu boleh berbeda, ajukan ke ARYA)
Membaca dan menyajikan data (tabel, batang, garis, lingkaran, histogram),
ukuran pemusatan (rata-rata, median, modus, dan KAPAN masing-masing layak
dipakai), kuartil dan boxplot, ukuran penyebaran (jangkauan, simpangan
baku dengan makna, bukan sekadar rumus), pencilan dan pengaruhnya,
membaca statistik dengan kritis (grafik yang menyesatkan).

## Folder milikmu
`web/content/statistika/`, `web/components/widget/statistika/`,
satu baris entri di `daftar-isi.ts`,
laporan `docs/tugas/laporan/MATRA-STATISTIKA.md`.

## Ide widget (silakan nilai ulang saat merancang)
- Titik data bisa ditambah/digeser: mean, median, modus bergerak hidup.
- Pencilan: satu titik ditarik jauh, mean ikut lari, median bertahan.
- Histogram: lebar kelas diubah, bentuk cerita berubah.
- Grafik menyesatkan: sumbu dipotong vs sumbu jujur, berdampingan.
Semua angka contoh tetap dicek sympy/python. Ingat aturan bingkai.

## Keadaan 2 Sep 2026 (ditulis MASTER dari laporanmu)

**Gelombang 1 SELESAI**: 13 materi, 13 widget, 4 latihan, 32 soal kuis, 146
angka lolos DUA pemeriksa (Python eksak dan Node dari kode situs), palet lolos
validator dataviz, semua widget bisa diseret dan dijalankan papan ketik.
Menunggu tinjauan ARYA. Jangan memulai video.

Tiga temuanmu mengubah aturan SEMUA sesi, terima kasih:
1. `rtk` mengarang keluaran: aturan verifikasi diganti ke biner Node langsung.
2. Playwright dipakai bersama: sekarang wajib `-s=<nama-worktree>`.
3. Jebakan `papan.ts` vs `Papan.tsx` dicatat di aturan bersama.

Yang MASTER ambil alih: `topik.ts` dan `latihan/statistika/page.tsx` kini
resmi wilayahmu. Alat skala kembar akan dinaikkan ke folder bersama setelah
semua tergabung. Tampilan HP diperbaiki UI/UX; setelah cabangmu diselaraskan,
potret ulang 375 piksel, terutama tabel tiga kolom di Materi 01.

Yang menunggu keputusan ARYA (dari laporanmu): data BPS sungguhan atau tetap
data buatan yang jujur; tinjau Materi 09 (interpolasi) dan delapan soal
sangat sulit.

Pengingat teknis untuk sesi berikutnya: port **3012** (bukan 3003 lagi),
Playwright `-s=matra-statistika`, verifikasi lewat biner Node langsung.

## Gelombang 2 (dibuka ARYA 2 Sep 2026; tinjauan isi oleh MASTER)

### Vonis MASTER: LAYAK, contoh terbaik "kenapa dulu, bagaimana kemudian"
Mean sebagai titik seimbang DIBUKTIKAN (jumlah simpangan nol), simpangan baku
dibangun empat langkah dan tiap langkah punya alasan, tahap 13 membalik
siswa jadi pembaca kritis. Kejujuran data konsisten. Revisi di bawah kecil.

### Revisi isi (wajib, urut)
1. **Huruf x dipakai sebagai tanda kali di 13 baris `contoh`** (tahap 3, 7, 9,
   11). Di tahap 10 sampai 12 x adalah VARIABEL, jadi "n x 4814" rancu. Ganti
   dengan tanda × atau kata "kali" di SEMUA tahap supaya seragam. Cari:
   `grep -nE "[0-9)] x [0-9(]" tahap-*.ts`.
2. **Tahap 9 memuat lima prosedur** (tepi kelas, mean, median, kuartil, modus).
   Tiap sesi sudah punya `contoh`, bagus, tetapi `coba` hanya untuk median.
   Jangan dipecah; lengkapi: (a) tambah `coba` kedua untuk modus memakai
   widget yang sama (ubah frekuensi tetangga kiri/kanan, lihat modus condong),
   (b) sebelum sesi modus tambah satu kalimat pemanggil ulang "ingat, tiap
   kelas diwakili titik tengahnya, dan batang tertinggi belum tentu modusnya
   tepat di tengah".
3. **Tahap 2 "line plot"** beri padanan sekali saat pertama muncul: "line plot
   (diagram titik)". Istilah buku dipertahankan, siswa dapat kata Indonesianya.
4. **Data BPS: keputusan MASTER, tetap data buatan yang jujur** untuk gelombang
   ini. Tidak mengambil data web sekarang. Kalau ARYA nanti minta, itu
   permintaan terpisah.
5. **Kata "mudah", "gampang", "jelas"** (11 + 8 + 5, paling banyak di antara
   topik): periksa satu per satu, hapus yang menilai tugas siswa.

### Daftar periksa
Isi 10 butir `docs/tugas/STANDAR-MENGAJAR.md` bagian 6 untuk TIAP tahap di
laporanmu. Tahap 9 dan 11 yang paling perlu dicek butir 4 dan 6.

### Video (setelah revisi selesai)
Enam kandidat, urut prioritas. Satu per satu, lembar kontak dibuka. Baca
skill `dataviz` lagi sebelum menggambar data di Manim:
1. Tahap 5 jungkat-jungkit: penopang di mean, papan miring kalau bukan
2. Tahap 8 simpangan baku: empat langkah, persegi tumbuh kuadrat
3. Tahap 6 pencilan: satu titik ditarik, mean lari, median diam
4. Tahap 9 interpolasi median: garis digeser sampai luas kiri sama dengan kanan
5. Tahap 11 residu: ruas tegak ke garis, jumlah kuadrat mengecil ke garis terbaik
6. Tahap 13 sumbu dipotong: data sama, dua kesan berbeda

Naskah 10 sampai 12 segmen, 90 sampai 125 detik, ikuti pola
`manim/narasi/limit*.json` dan bagian 5 STANDAR-MENGAJAR. Render 480p saja
lewat `python alat/antre_render.py matra-statistika -- manim -ql ...`.
