# MATRA-GRAFIK-FUNGSI

Kamu sesi MATRA-GRAFIK-FUNGSI. Baca dan patuhi
`docs/tugas/ATURAN-SEMUA-SESI.md` SEBELUM baris mana pun di bawah ini.

## Misi
Topik **Grafik Fungsi** utuh selevel SMA: materi bertahap (sekitar 8-10
tahap), widget interaktif, latihan terbimbing, kuis. Gelombang 1 = halaman
saja, tanpa video.

## Sumber utama
- `D:\BAHAN MATEMATIKA\Buku Matematika Kelas 10 - Guru.pdf` dan `Kelas 11 - Guru.pdf`
  (fungsi kuadrat, eksponen, transformasi; verifikasi sendiri babnya)
- Diktat ITB kalkulus 1 (fungsi dan grafiknya)
- Big book SMA dan https://mathcyber1997.com (kalibrasi soal)

## Cakupan yang diharapkan (rancanganmu boleh berbeda, ajukan ke ARYA)
Membaca grafik sebagai cerita, fungsi kuadrat (bentuk puncak vs umum),
transformasi (geser, cermin, regang), fungsi eksponen dan logaritma,
nilai mutlak, fungsi rasional dan asimtotnya, komposisi ringan.

## Batas wilayah
- Grafik sin/cos/tan SUDAH ada di topik Trigonometri tahap 8-9: JANGAN
  diulang, cukup rujuk silang.
- Asimtot dan perilaku menuju tak hingga SUDAH dibahas Limit materi 07:
  boleh disinggung, jangan diajarkan ulang dari nol.

## Folder milikmu
`web/content/grafik-fungsi/`, `web/components/widget/grafik-fungsi/`,
satu baris entri di `daftar-isi.ts`,
laporan `docs/tugas/laporan/MATRA-GRAFIK-FUNGSI.md`.

## Ide widget (silakan nilai ulang saat merancang)
- Transformasi: slider a, h, k pada a(x-h)^2+k, grafik bergerak hidup.
- Cermin dan regang: satu tombol per transformasi, bekasnya membayang.
- Eksponen vs linear: balapan pertumbuhan pada sumbu yang sama.
Baca skill `dataviz` sebelum menggambar grafik apa pun.
Ingat aturan bingkai: gambar tidak boleh terpotong, penunjuk skala wajib.

## Keadaan 2 Sep 2026 (ditulis MASTER dari laporanmu)

**Gelombang 1 SELESAI**: 12 tahap, 11 widget, 4 latihan, 32 soal kuis, 194
angka lolos pemeriksa dua arah, enam foto galeri berlisensi dan beratribusi.
Menunggu tinjauan ARYA. Jangan memulai video.

Yang MASTER ambil alih dari daftar "Butuh MASTER"-mu:
- `topik.ts` dan `latihan/grafik-fungsi/page.tsx`: kini RESMI wilayahmu.
- Usulmu menaikkan `koordinat.ts` dan `Bidang.tsx` versimu ke folder bersama:
  DITERIMA sebagai rencana, dikerjakan MASTER setelah semua topik tergabung.
  Versimu yang dipakai (pita keterangan di luar kotak, pemotongan pada batas).
- Jenis blok `rujuk` untuk tautan antartopik: dicatat, menunggu MASTER.
- Impor tipe `Blok` yang basi di `Penjelasan.tsx`: dicatat untuk UI/UX.

Yang menunggu keputusan ARYA (dari laporanmu): tinjau tahap 6 dan enam soal
sangat sulit; soal pembanding mathcyber; kompresi foto galeri (1 MB, terberat
`bakteri.jpg` 265 KB, kompres di bawah 150 KB seperti yang dilakukan VEKTOR).

Pengingat teknis untuk sesi berikutnya: port **3011**, Playwright
`-s=matra-grafik-fungsi`, verifikasi lewat biner Node langsung (bukan rtk).
