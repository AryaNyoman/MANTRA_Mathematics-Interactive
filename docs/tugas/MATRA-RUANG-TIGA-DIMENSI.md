# MATRA-RUANG-TIGA-DIMENSI

Kamu sesi MATRA-RUANG-TIGA-DIMENSI. Baca dan patuhi
`docs/tugas/ATURAN-SEMUA-SESI.md` SEBELUM baris mana pun di bawah ini.

## Misi
Topik **Ruang Tiga Dimensi** (geometri ruang SMA) utuh: materi bertahap
(sekitar 8-10 tahap), widget interaktif, latihan terbimbing, kuis.
Gelombang 1 = halaman saja, tanpa video.

## Sumber utama
- AWAS: `3 Dimensi.pdf` ternyata Buku Siswa Kelas XI (bilangan kompleks,
  polinomial, matriks), BUKAN geometri ruang. Sudah diperiksa sesi ini.
  Sumber yang benar-benar dipakai ada di laporanmu.
- Buku Guru 10 & 11 kalau babnya ada; kalau topik ini ternyata kelas 12,
  pakai big book SMA + https://mathcyber1997.com + diktat ITB, dan catat
  sumber tiap soal. Verifikasi penempatan kurikulum sendiri, jangan menebak.

## KEPUTUSAN WAJIB DI GERBANG RANCANGAN: cara menggambar 3D
Aturan proyek: widget dibuat sendiri dengan SVG + React (2D). Topikmu
satu-satunya yang butuh kesan ruang. Di gerbang rancangan, ajukan ke ARYA
pilihan ini dengan jujur:
1. **Proyeksi isometrik/kabinet dengan SVG buatan sendiri (rekomendasi):**
   konsisten dengan aturan proyek, tanpa ketergantungan baru, cukup untuk
   kubus/balok/limas dan garis-garis di dalamnya. Rotasi bebas terbatas.
2. **Pustaka 3D (mis. three.js):** rotasi bebas sungguhan, tapi menambah
   ketergantungan besar, gaya visualnya harus dipaksa cocok "Studio Teknis",
   dan menyalahi pola widget yang ada.
JANGAN membangun sebelum ARYA memilih.

## Batas wilayah dengan MATRA-VEKTOR
Milikmu: kedudukan titik/garis/bidang, jarak (titik-garis, titik-bidang,
garis-bidang), sudut di bangun ruang, proyeksi pada bidang. Milik mereka:
aljabar vektor dan operasinya. Kalau butuh vektor sebagai alat hitung jarak,
pakai seperlunya dan rujuk silang, jangan mengajarkannya ulang.

## Folder milikmu
`web/content/ruang-3d/`, `web/components/widget/ruang-3d/`,
satu baris entri di `daftar-isi.ts`,
laporan `docs/tugas/laporan/MATRA-RUANG-TIGA-DIMENSI.md`.

## Ide widget (silakan nilai ulang saat merancang)
- Kubus transparan: titik sudut bisa dipilih dua, ruas dan jaraknya tampil.
- Jarak titik ke bidang: garis tegak lurusnya digambar, bukan cuma angkanya.
- Irisan bidang pada kubus (kalau masuk rancangan; berat, boleh ditunda).
Semua jarak/sudut contoh dicek sympy. Ingat aturan bingkai + penunjuk skala.

## Keadaan 2 Sep 2026 (ditulis MASTER dari laporanmu)

**Gelombang 1 SELESAI**: 10 materi, 9 widget 3D dengan SVG dan matriks putar
buatan sendiri, galeri 4 adegan, 4 latihan, 32 soal kuis, 70 angka lolos
`cek_ruang.py`, dikalibrasi ke lima soal UN/EBTANAS asli. Menunggu tinjauan
ARYA. Jangan memulai video.

Koreksi dari temuanmu, sudah dibetulkan MASTER: `3 Dimensi.pdf` ternyata Buku
Siswa Kelas XI, bukan geometri ruang. Rujukan di `CLAUDE.md` dan file tugasmu
sudah diperbaiki supaya sesi berikutnya tidak tertipu judul berkas itu.

Yang MASTER ambil alih: `topik.ts` baris `ruang-3d` kini resmi wilayahmu,
silakan ubah ke `siap: true` dan commit (kamu sempat mengembalikannya).
Tampilan HP diperbaiki UI/UX; setelah cabangmu diselaraskan, potret ulang 375.

Yang menunggu keputusan ARYA (dari laporanmu): galeri tahap 10 gambar sendiri
atau foto; tinjau tahap 6 dan enam soal sangat sulit.

Gelombang 2 nanti: enam video kandidat sudah di rancanganmu, dipimpin tahap 1
dan tahap 3, memakai Manim `ThreeDScene` sesuai keputusan ARYA.

Pengingat teknis untuk sesi berikutnya: port **3013**, Playwright
`-s=matra-ruang-3d`, verifikasi lewat biner Node langsung (bukan rtk).
