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

## Keadaan 2 Sep 2026 (ditulis MASTER dari laporanmu)

**Gelombang 1 SELESAI**, dan ini yang paling mendesak dari semua sesi: tanpa
perbaikanmu, siswa di HP sama sekali tidak bisa membuka Latihan maupun Kuis.
Tujuh commit: tumpukan kolom di 375, navigasi tiga garis, bank soal, tab
Latihan/Kuis di baris sendiri, target sentuh 44 piksel, judul HP, empat temuan
audit pedoman. Diuji di tujuh ukuran layar dan lima tingkat zoom.

Yang MASTER kerjakan: cabangmu digabung ke master LEBIH DULU dari yang lain
dan langsung di-deploy, sebab situs yang tayang sedang rusak di HP.
`PemutarVideo.tsx` disentuh MASTER juga (`key={berkas}`, memaksa elemen video
dibuat ulang saat pindah tahap); MASTER yang menyelesaikan konfliknya.

Tugasmu berikutnya, setelah cabangmu diselaraskan ke master dan ARYA memberi
aba-aba:
1. Empat topik baru (vektor, grafik fungsi, statistika, ruang 3D) akan masuk
   master. Audit ulang keempatnya di 375 dan 1366 seperti yang kamu lakukan
   pada Limit. Kemungkinan besar ada tabel lebar dan widget yang mengecil.
2. Teks widget Limit yang mengecil di HP: ARYA menyerahkannya ke MASTER, jadi
   bukan tugasmu, tapi laporkan kalau melihat pola yang sama di topik lain.
3. Impor tipe `Blok` yang basi di `Penjelasan.tsx` (temuan GRAFIK-FUNGSI).
4. Jenis blok `rujuk` (tautan antartopik yang bisa diklik): perendernya di
   `Penjelasan.tsx` milikmu, tipenya di `tipe.ts` milik MASTER. Tunggu MASTER.

Yang menunggu keputusan ARYA (dari laporanmu): tautan lompat ke isi (skip
link) ditunda; tombol jeda korsel sengaja tidak dipasang.

Pengingat teknis untuk sesi berikutnya: port **3014** (bukan 3005 lagi),
Playwright `-s=matra-ui-ux`, verifikasi lewat biner Node langsung (bukan rtk).

## Gelombang 2 (dibuka ARYA 2 Sep 2026)

Perbaikanmu sudah tayang di situs asli dan dibuktikan MASTER di 375 piksel.
Empat topik baru kini ada di cabangmu. Tugasmu, urut:

1. **Audit empat topik baru** (vektor, grafik-fungsi, statistika, ruang-3d)
   di 375, 414, 768, 1366 dan zoom 80 sampai 125, persis seperti Limit. Yang
   paling saya curigai dari membaca isinya: tabel lebar di `contoh`
   (Statistika tahap 1 tiga kolom, tahap 9 tabel frekuensi, tahap 11 rumus
   regresi; Grafik tahap 8 tabel "adu tiga fungsi" empat kolom), widget 3D
   Ruang 3D di layar sempit, dan 13 tab Statistika. Catat temuan DULU di
   laporan, urut dari yang paling parah, baru perbaiki.
2. **Baris tab perlu tanda bisa digulir.** Dua sesi melaporkan tab ke-10 dan
   seterusnya praktis tidak ditemukan siswa. Ini keputusan VISUAL, jadi
   ajukan ke ARYA dua pilihan dengan potret layar (misalnya: gradien pudar di
   tepi kanan plus panah kecil; atau tab dibuat dua baris di laptop). Jangan
   pilih sendiri.
3. `components/topik/Penjelasan.tsx` masih mengimpor tipe `Blok` dari
   `@/content/trigonometri`; ganti ke `@/content/tipe`.
4. Kalau menemukan teks di dalam widget yang mengecil di HP seperti kasus
   Limit, LAPORKAN per topik (itu wilayah sesi topik), jangan perbaiki sendiri.
5. Jenis blok `rujuk`: MASTER belum menambah tipenya. Jangan menunggu; ini
   bukan bagian gelombang 2.

Bukti seperti biasa: potret sebelum dan sesudah, dibuka dan dinilai mata,
`playwright-cli -s=matra-ui-ux`, commit kecil per perbaikan.
