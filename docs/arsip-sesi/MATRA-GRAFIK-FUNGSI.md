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

## Gelombang 2 (dibuka ARYA 2 Sep 2026; tinjauan isi oleh MASTER)

### Vonis MASTER: LAYAK, suara guru paling kuat dari keempat topik
"Ini bagian yang paling sering salah, jadi kita pelankan", "coba tebak dulu",
alasan selalu mendahului aturan, tahap 6 sebagai poros yang lima tahap
sebelumnya membangun dan lima sesudahnya memanen. Pertahankan gaya ini di
narasi video. Revisi di bawah ini kecil kecuali nomor 3.

### Revisi isi (wajib, urut)
1. **Huruf x dipakai sebagai tanda kali di 9 baris `contoh`** (antara lain
   baris 321 "(2 x 2)", 724 sampai 728 "300 x 0,6"). Di topik ini x adalah
   VARIABEL, jadi "2 x 2" terbaca dua kali variabel x. Ganti dengan tanda ×
   atau kata "kali". Cari dengan: `grep -nE "[0-9)] x [0-9(]" tahap.ts`.
2. **Tahap 2 mengandaikan fungsi linear** tanpa memanggilnya ulang (STANDAR
   butir 1). Sebelum contoh "Jalankan mesin f(x) = 2x + 1", tambah 2 kalimat:
   "Ingat garis lurus di SMP: y = mx + c, m kemiringannya, c tempat memotong
   sumbu y. Itu fungsi juga, dan mesin di bawah ini persis garis itu."
3. **Tahap 11 memuat dua ide besar**: komposisi, lalu invers (plus fungsi
   satu-satu dan uji garis mendatar). PECAH jadi dua tahap: 11 "Dua mesin
   dirangkai" (komposisi saja) dan 12 "Mesin yang membatalkan" (invers,
   satu-satu, uji garis mendatar, pelunasan janji tahap 9). Galeri jadi tahap
   13. Widget `dua-mesin` boleh dipakai keduanya dengan mode berbeda. Periksa
   ikutannya: nomor tahap di latihan dan kuis, `kuisTerbuka` (jumlah tahap),
   spec, dan `labelPendek`. Alasannya: invers menutup lingkaran seluruh topik
   dan layak dapat napas sendiri; tahap 11 sekarang lebih berat dari tahap 6.
4. **Kata "mudah", "jelas", "gampang"** (13 + 5 + 1): periksa satu per satu,
   hapus yang menilai tugas siswa, pertahankan yang menggambarkan benda.
5. Kompresi enam foto galeri di bawah 150 KB (`bakteri.jpg` 265 KB). Aturan
   proyek, bukan selera.

### Daftar periksa
Isi 10 butir `docs/tugas/STANDAR-MENGAJAR.md` bagian 6 untuk TIAP tahap di
laporanmu.

### Video (setelah revisi selesai). DIPERBARUI 2 Sep siang: ManimGL
Sejak 2 Sep siang semua video dibuat dengan ManimGL lewat `manim/gl/`; baca
`docs/tugas/STANDAR-ILUSTRASI-VIDEO.md` dan `docs/tugas/ILMU-3B1B.md` dulu,
contoh: `manim/contoh/contoh_perahu.py`. Untuk topikmu: kurva tetap 2D, tetapi
setiap video dibuka dengan benda nyata yang kurvanya menggambarkan sesuatu
(mobil dari `gl.ilustrasi.mobil` untuk gerak, bola dilempar untuk parabola,
permukaan bercahaya `ParametricSurface` + `SurfaceMesh` kalau perlu z = f(x, y)).
Transformasi grafik: geser dengan `Transform`, jangan hapus lalu gambar ulang.

Enam kandidat, urut prioritas. Satu per satu, lembar kontak dibuka:
1. Tahap 6 transformasi: grafik bergerak, bayangan tertinggal, dua kalimat luar/dalam kurung
2. Tahap 3 bentuk puncak: h dibesarkan, parabola ke KANAN walau tandanya minus
3. Tahap 4 melengkapkan kuadrat: langkah aljabar disorot bersama bagian grafiknya
4. Tahap 9 lipat ke y = x: titik (0, 1) mendarat di (1, 0)
5. Tahap 8 balapan tiga kurva: eksponen kalah dulu lalu menyalip
6. Tahap 10 asimtot bergeser: kurva diputus, bukan disambung

Naskah 10 sampai 12 segmen, 90 sampai 125 detik, ikuti pola
`manim/narasi/limit*.json` dan bagian 5 STANDAR-MENGAJAR. Render 480p saja

## GELOMBANG 4 (8 Sep 2026): TULIS ULANG SEMUA VIDEO, STANDAR v3

Kamu sesi **MANTRA-GRAFIK-FUNGSI**. Keputusan ARYA: semua video MANTRA ditulis ulang dengan
gaya Turunan 02 versi rinci (3 sampai 6 menit, segar-ingat, asal rumus
dibuktikan, narasi tenang, animasi dipicu per kata). Baca berurutan:
`docs/tugas/STANDAR-VIDEO-V3.md`, `docs/tugas/ATURAN-SEMUA-SESI.md` bagian
GELOMBANG 4, `docs/tugas/laporan/PELAJARAN-RENDER-TURUNAN-2026-09-08.md`, lalu
`docs/tugas/laporan/MANTRA-INTEGRAL.md` bagian pemangkas render.

| Hal | Nilai |
|---|---|
| Cabang | `sesi/grafik-fungsi` |
| Worktree | `.claude/worktrees/matra-grafik-fungsi` |
| Port dev server | 3011 |
| Playwright | `-s=matra-grafik-fungsi` |
| Contoh yang disetujui | `manim/scenes/turunan2_garis_singgung.py`, naskah `manim/narasi/turunan2-garis-singgung.json`, video `web/public/anim/turunan2-garis-singgung.mp4` |

Video yang ditulis ulang, URUT (segar-ingat bersambung dari satu ke berikutnya):

| Materi | Nama berkas video |
|---|---|
| 03 bentuk-puncak | `grafik3-puncak` |
| 06 geser-cermin-regang | `grafik6-transformasi` |

Dua video lama ditulis ulang dulu (kedua adegan ManimGL sudah ada). Sesudah keduanya disetujui, ajukan ke ARYA di jendelamu daftar kandidat video berikutnya dari rancangan topik ini (materi yang paling butuh gambar bergerak: fungsi kuadrat, eksponen, komposisi); jangan mulai sebelum ia memilih.

Alur tiap video: naskah 25 sampai 35 segmen dengan `teks` (ejaan ucapan) dan
`tulis` (kalimat utuh berlambang) -> `python manim/buat_narasi.py <video>` ->
adegan dengan `sinema.JamKata` dan `tunggu_kata` -> `cek_kode --dalam`,
`cek_waktu_adegan`, klaim sympy, `cek_urutan_grafik_fungsi` ->
render `--hd --config_file manim/hd60.yml` -> `gabung_audio <video> <Adegan>
--keluar <video>.mp4` -> lembar kontak DIBUKA -> `cek_layar_kosong`,
`buat_subtitle` + `cek_subtitle`, `buat_poster` + `cek_aset_video` ->
salinan 480p bersubtitel -> medan `video` di tahap.ts, tsc -> commit ->
lapor ke MASTER dengan sepuluh butir daftar periksa v3 terisi.

**Video PERTAMA berhenti** sampai ARYA menonton dan menyetujui di jendelamu;
sesudahnya per kelompok dua sampai tiga video. Satu render pada satu waktu.
