# Sistem gerak "Panggung": keputusan pemindahan ke kode (17 Sep 2026)

Rancangan dari Claude Design (proyek `claude.ai/design/p/9fa96957-8c05-4c11-ad5a-313369f092ac`,
berkas `Gerak MANTRA 5 Spesifikasi.dc.html` dan `Gerak MANTRA 4BCD Nav Laci Jendela.dc.html`)
diserahkan sebagai tiga berkas di folder ini:

- `HANDOFF-GERAK.md`: potongan JSX dan daftar periksa pemindahan (urut dampak) plus daftar audit;
- `gerak-spek.json`: tabel spesifikasi A sampai K, satu baris per titik gerak
  (kolom: kelompok, titik, pemicu, apa yang bergerak, dari mana ke mana, durasi,
  kurva, jeda, tingkat, reduced motion, catatan HP, berkas dan kelas);
- `gerak-mantra.css`: CSS siap tempel (token, keyframes, blok per kelompok).

Prompt yang melahirkan rancangan ini: `../PROMPT-CLAUDE-DESIGN-GERAK.md`.

## Keputusan ARYA saat pemindahan (17 Sep 2026)

1. **Bola yang berjalan di kurva beranda DIPERTAHANKAN** (jingga berpatroli 16 detik,
   hijau acak 9 sampai 17 detik). Rancangan mengusulkan membuangnya (baris K
   "Titik berjalan di kurva"); ARYA memilih mempertahankan permintaannya 5 Sep.
   `PitaKurva.tsx` tidak disentuh untuk itu. Baris "Glyph mengapung" tidak
   berlaku: glif sudah dibuang sejak v2 (4 Sep).
2. **Tidak ada lipatan baru.** Sub-bab pohon, kotak "Sering keliru", Ringkasan,
   dan blok YouTube tetap selalu terbuka (rancangan mengira semuanya bisa
   dilipat; prompt yang keliru). Baris C "Sub-bab pohon lipat" dan E "Lipatan
   sesi, Sering keliru, ringkasan, baca cepat, blok YouTube" menjadi
   "tidak bergerak".
3. **Empat tahap, deploy tiap tahap** supaya ARYA memeriksa di HP:
   1. A, B, G: token dan keyframes, pindah halaman berarah, Nav jangkar di layout,
      garis tab berpindah, wajah nav belajar, menu HP, kemunculan bertahap daftar.
   2. D, F, E (bank soal): jendela `<dialog>` bersama, skor menghitung, perayaan
      lencana, tanda tumbuh, soal berganti berarah, pembahasan hadiah vs sudah
      ada, batang dan angka sekali per sesi, Kuis dan Latihan bab ikut.
   3. C, E (halaman belajar): laci HP dan tirai lewat portal, pilih materi satu
      gerakan, lipat pohon, isi berganti berarah, alat-sisip memesan tempat,
      lencana kunci, LaciLanjut.
   4. H, I, J, K: korsel, pemutar, muncul saat gulir, 404, kerangka memuat,
      cincin fokus; lalu audit bagian 8 HANDOFF di desktop dan 390 px.

## Penyimpangan teknis dari HANDOFF (alasan di tiap butir)

- **Tidak ada `experimental.viewTransition` dan tidak memasang React canary.**
  Next 16.3.3 sudah menyediakan `import { ViewTransition } from 'react'` di App
  Router tanpa pengaturan (`node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`);
  bendera itu sudah tidak dikenal `next.config`. Komponen cadangan `Tautan`
  (`document.startViewTransition` + `router.push`) TIDAK dibuat: App Router
  memuat halaman secara asinkron, jadi potret "baru" akan diambil sebelum
  halamannya ada.
- **Pembungkus `<ViewTransition>` ada di tiap halaman (komponen `Panggung`), bukan di
  layout.** Layout bertahan antar rute, jadi enter dan exit tidak pernah
  berjalan di sana (dokumentasi Next). Kelas masuk dan keluar dipilih lewat
  `enter`/`exit`, arah lewat `html[data-arah]`.
- **Arah ditulis SEBELUM pindah**, bukan di `useEffect` sesudah alamat berganti:
  `ArahRute` mendengarkan klik tautan (fase tangkap) dan `popstate`, menghitung
  arah dari alamat asal dan tujuan, lalu menulis `html[data-arah]`. Kalau
  ditulis sesudahnya, pseudo-elemen transisi sudah terlanjur memakai animasi
  yang salah dan berkedip. Navigasi lewat `router.push` memanggil `aturArah()`
  dulu.
- **Jenis TypeScript** `ViewTransition` datang dari `@types/react/canary`,
  dirujuk lewat `web/react-canary.d.ts`.
- **Mode fokus memakai layar penuh sungguhan** (`requestFullscreen` pada `main`),
  jadi nav memang tidak tergambar oleh peramban saat itu. Nav tetap dirakit
  dengan `data-fokus` dan `inert` seperti rancangan; gerak naiknya hanya
  terlihat saat peramban menolak layar penuh.
- **`[data-panggung]` (panggung mundur saat jendela terbuka) hanya di halaman
  bank soal dan daftar latihan**, bukan halaman belajar: `transform` pada
  `main` menjadikan `main` acuan bagi anak `position: fixed`, dan laci HP di
  halaman belajar pernah rusak karena itu (catatan 3 Sep di globals.css).
