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
