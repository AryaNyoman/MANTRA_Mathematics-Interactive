# MATRA-DESAIN-UI-UX

Kamu sesi MATRA-DESAIN-UI-UX. Baca dan patuhi
`docs/tugas/ATURAN-SEMUA-SESI.md` SEBELUM baris mana pun di bawah ini.

## Misi
Membuat tampilan situs rapi dan nyaman **di laptop DAN di HP**, tanpa
mengubah wataknya. Kamu sesi kualitas tampilan, BUKAN sesi redesign.

## Aturan paling keras di sesimu
- **Gaya visual TERKUNCI: "Studio Teknis".** Patokan:
  `mockup/d-studio-teknis.html`, palet warna dan font ada di `PROGRESS.md`.
  Tugasmu membuat gaya itu bekerja di semua ukuran layar, bukan menggantinya.
- **DILARANG memuat skill gaya** (design-taste-frontend, high-end-visual-design,
  minimalist-ui, industrial-brutalist-ui, redesign-existing-projects,
  imagegen-frontend-web, ui-ux-pro-max). Skill itu untuk mengarang arah baru;
  arahmu sudah dikunci. Skill yang BOLEH: `web-interface-guidelines` (audit),
  `playwright-cli`, `dataviz` (kalau menilai grafik).
- Perilaku yang merupakan keputusan ARYA jangan diubah diam-diam, contohnya:
  tombol video hilang setelah 2 detik, RINGKASAN tepat di atas kotak YouTube,
  urutan blok materi. Ragu? Tanya lewat laporan.

## Yang dikerjakan (urut prioritas)
1. **Audit menyeluruh** semua halaman yang ada (beranda, trigonometri, limit,
   latihan, bank soal) pada lebar 375, 414, 768, 1366, 1920 piksel, dan zoom
   80/90/100/110/125 persen (riwayat: zoom 90% pernah rusak, sudah diperbaiki,
   pastikan tidak kambuh). Catat semua temuan di laporanmu SEBELUM memperbaiki.
2. **Perbaiki responsif HP**: navigasi, korsel beranda, panel widget + panggung
   di layar sempit, tabel kuis, tombol yang kekecilan untuk jempol.
3. **Audit `/web-interface-guidelines`** dan perbaiki temuannya (fokus,
   kontras, target sentuh, aksesibilitas dasar).
4. **Hal kecil yang murah**: ukuran ketuk, jarak antar blok di HP, teks yang
   menabrak tepi, gambar yang memaksa scroll mendatar.

## Cara kerja
- Bukti visual pakai `playwright-cli`: screenshot SEBELUM dan SESUDAH untuk
  tiap perbaikan, dan BUKA screenshotnya, nilai dengan mata.
- Perubahanmu menyentuh file bersama, jadi commit kecil-kecil dengan pesan
  jelas per perbaikan, supaya MASTER gampang menggabungkan dan mengembalikan
  satu perubahan kalau ada yang salah.
- Halaman topik yang sedang dibangun sesi lain (vektor, grafik-fungsi,
  statistika, ruang-3d) BELUM ada di cabangmu. Jangan menunggu mereka;
  perbaiki kerangka bersama, nanti halaman baru ikut kebagian rapinya.

## Folder milikmu
`web/app/` (layout, globals), komponen bersama di `web/components/`
(KECUALI folder `widget/<topik>/` milik sesi topik),
laporan `docs/tugas/laporan/MATRA-DESAIN-UI-UX.md`.
