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

4. **Umpan balik tahap 1 (17 Sep malam, sesudah melihat hasilnya):**
   - elemen bersama (judul bab yang "terbang" ke halaman belajar, judul kartu
     ke bank soal) DIHAPUS: "saya gak suka animasi judul yang terbang sana
     sini". Baris A "Elemen bersama" menjadi tidak berlaku;
   - pindah halaman BERURUTAN, bukan bersamaan: teks halaman lama dan baru
     yang saling tindih membuat pusing. Halaman lama pergi dulu 140 ms, baru
     halaman baru masuk 280 ms (`--d-halaman-keluar`, `--d-halaman-masuk`),
     geser 20 px maju dan 14 px kembali. Menggantikan 520/300 bersamaan di
     tabel A.

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
- **TombolPasang tidak memesan tempat kosong.** Di iPhone dan Firefox peristiwa
  `beforeinstallprompt` tidak pernah datang, jadi celah permanen di samping
  tombol utama lebih mengganggu daripada satu pergeseran kecil saat tombolnya
  muncul; tombolnya cukup memudar masuk 200 ms.
- **Tombol Periksa, Sebelumnya, Berikutnya berada di luar badan soal yang
  di-`key`**, supaya menekan Berikutnya lima kali berturut-turut tidak
  melepas tombol yang sedang difokus.
- **Tahap 3 (18 Sep 2026): laci HP dan tirai TIDAK dipindahkan ke portal
  body.** Rancangan menyarankan `createPortal` supaya panggung boleh
  di-transform; di halaman belajar `main` memang tidak pernah di-transform
  (lihat butir `[data-panggung]` di atas) dan semua animasinya berisi
  `backwards`, jadi `position: fixed` di dalam `main` aman. Portal justru
  memindahkan pohon keluar dari grid di HP sesudah hidrasi (di server tata
  letaknya desktop), dan itu merakit ulang seluruh daftar materi. Tirainya
  sekarang selalu dirakit (`data-buka`) supaya memudar keluar, dan di desktop
  disembunyikan `display: none` (kalau tidak ia jadi sel grid pertama).
- **Kuncup pohon: label memudar dulu lewat state `memudar` (140 ms), baru
  `rel` dinyalakan** dan kolomnya menyempit (grid-template-columns 400 ms).
  Label memang dilepas dari DOM saat kuncup; mempertahankannya hanya untuk
  dipudarkan berarti mengubah semua baris pohon.
- **Isi bacaan berganti berarah lewat `key` dan `startTransition`.** Merakit
  materi baru butuh 300 sampai 400 ms di produksi (ratusan rumus KaTeX,
  widget); `startTransition` menjaga materi lama tetap hidup sampai yang baru
  siap, dan animasi gesernya mulai saat pertukaran. Hasil TeksMat disimpan
  lintas komponen (`SIMPANAN` di TeksMat.tsx) supaya kunjungan ulang murah.
- **Lipatan sub-bab pohon (pohon-sub) tidak dibuat**: ARYA 17 Sep memutuskan
  tidak ada lipatan baru.
- **`.alat-sisip` tidak diberi `min-height`**: di HP yang bertukar adalah
  video dan alat (tombol Tonton / Coba sendiri), tingginya memang berbeda;
  keduanya cukup memudar masuk 200 ms saat dipasang.
- **Tahap 4 (18 Sep 2026): korsel beranda TIDAK berganti sendiri.** HANDOFF
  dan spek H menulis "otomatis 7 s, berhenti saat hover/fokus/sentuh";
  ARYA sudah mencabut pergantian otomatis 5 Sep 2026 (video slide pertama
  tidak pernah sempat selesai, slide yang sedang dibaca berpindah di tengah
  kalimat). Keputusan ARYA menang: slide hanya berganti lewat panah, titik,
  atau papan ketik. Rel tetap 500 ms dengan `--kurva-pindah`.
- **Titik korsel melebar lewat transform, tetapi bukan `scaleX(2.2)` pada
  satu pil**: scaleX menyepeng ujung bulatnya jadi elips. Batang 28 px
  dirakit dari dua tutup bulat (`::before`, `::after`) yang bergeser 11 px
  dan ruas tengah 22 px yang direntangkan dari nol; titik tetangga ikut
  bergeser 11 px lewat transform (`:has(~ [data-aktif])`), jadi barisnya
  tetap rata tengah tanpa tata letak ulang. Tampak akhirnya sama persis
  dengan versi lama yang mengubah `width`.
- **`.tombol-putar`, `.saklar .gagang`, `.simpan-video .batang` tidak ada di
  MANTRA**: pemutarnya memakai kendali bawaan peramban (tidak ada tombol
  putar sendiri), saklar subtitle adalah tombol teks `aria-pressed` (diberi
  transisi warna 140 ms), dan simpan video adalah kotak centang tanpa batang
  kemajuan. Butir spek itu tidak dipindahkan.
- **Lencana geser "+5 detik" selalu terpasang** (`data-tampil`, bukan bongkar
  pasang): tekanan panah beruntun memperpanjang tahannya 700 ms, lalu memudar
  200 ms dengan tulisannya tetap ada. Versi bongkar pasang membiarkan animasi
  pudar lama habis di tengah tekanan berikutnya, lencananya lenyap padahal
  tulisannya masih berganti.
- **`.nyala` tetap seketika, tanpa transisi 140 ms**: kelasnya dipasang pada
  elemen SVG (circle, line, path, g) tanpa kelas dasar, dan transisi `filter`
  pada `g` berisi banyak anak mahal. Reduced motion pun memintanya "warna
  saja".
- **Tempat kotak centang "Simpan video" dipesan sejak render server**
  (`useSyncExternalStore`, jawaban server "petugas ada", tersembunyi sampai
  pemeriksaan simpanan selesai). Tanpa ini Layout Shift halaman materi 0,0006:
  barisnya melebar 112 px dan bergeser ke kiri sesudah hidrasi. Sesudahnya 0.
- **MunculSaatGulir menulis `data-tampil` langsung ke DOM**, bukan state
  React: satu atribut tidak perlu merakit ulang isinya, dan aturan
  `react-hooks/set-state-in-effect` menolak setState sinkron di efek.
- **Cincin fokus memakai `--oker`** (yang memang sama dengan `--emas`), tetapi
  selektornya jadi `:focus-visible` universal: sebelumnya hanya tautan,
  tombol, dan `.tombol`; kotak centang, `summary`, dan elemen ber-`tabindex`
  tidak bercincin.
- **Audit tahap 4 (18 Sep 2026)**: reduced motion (emulasi Playwright):
  token 0 ms, rel korsel dan titik 0, MunculSaatGulir langsung tampil, kurva
  404 langsung tergambar; Layout Shift beranda, /topik/integral,
  /topik/trigonometri materi 2, /latihan/turunan, /peta-materi = 0; jendela
  keluar latihan: fokus awal "Tetap di sini", Tab tiga kali tetap di dalam,
  Esc menutup dan fokus kembali ke tautan pembuka; Berikutnya 5 kali cepat:
  soal 1 ke 6, fokus tetap di tombol; Lanjut 3 kali cepat: Materi 01 ke 04;
  tidak ada galat konsol. **Belum diukur: 60 fps pada CPU 4 kali lebih
  lambat** (playwright-cli tidak membawa profil kinerja); yang bisa
  dijamin dari kodenya: semua gerak tahap 1 sampai 4 hanya transform dan
  opacity kecuali `grid-template-columns` lipat pohon dan mode fokus.
