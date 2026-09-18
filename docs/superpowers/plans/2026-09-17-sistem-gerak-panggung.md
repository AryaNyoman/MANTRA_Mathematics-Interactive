# Rencana pemindahan sistem gerak "Panggung" (17 Sep 2026)

Rancangan: `docs/desain-mantra/gerak/` (HANDOFF-GERAK.md, gerak-spek.json,
gerak-mantra.css). Keputusan dan penyimpangan: `docs/desain-mantra/gerak/KEPUTUSAN.md`.
Tiap tahap: `npm run lint`, `npx tsc --noEmit`, cek playwright-cli di 1280 dan
390 px (reduced motion mati dan hidup), deploy, lapor ke ARYA, tunggu tanggapan.
Tanpa pustaka animasi. Hanya transform dan opacity (kecuali grid-template-columns
untuk lipat pohon dan mode fokus). Tanpa em-dash.

## Tahap 1: A pindah halaman, B nav, G daftar

- [x] 1.1 `web/app/globals.css`: ganti blok token gerak (baris 96 sampai 101) dengan
      blok 1 gerak-mantra.css (nama lama tetap); tambah keyframes blok 2; hapus
      `main { animation: tab-masuk }` beserta keyframes-nya; tempel blok 3
      (A), 4 (B), 9 (G) yang disesuaikan ke kelas yang ada. `::view-transition { pointer-events: none }`.
      Reduced motion: `::view-transition-old(*), -new(*), -group(*) { animation-duration: 0s }`.
- [x] 1.2 `web/react-canary.d.ts`: `/// <reference types="react/canary" />`.
- [x] 1.3 `web/components/mantra/Panggung.tsx` (client): `<ViewTransition enter="panggung-masuk" exit="panggung-keluar" default="none">`.
      `web/components/mantra/ArahRute.tsx` (client, ±50 baris): klik tangkap
      pada `a[href]` internal + `popstate` → `html[data-arah]` (maju/kembali)
      dan `html[data-transisi]` 520 ms. `lib/arah-rute.ts`: `hitungArah(dari, ke)`,
      `aturArah(ke)` untuk `router.push`.
- [x] 1.4 `web/app/layout.tsx`: `<ArahRute />`, `<Nav />` sekali; hapus `<Nav>` dari
      16 halaman; bungkus isi tiap halaman dengan `<Panggung>` (main + Kaki).
      `Nav.tsx`: label dari alamat (`/latihan/<topik>` → "Latihan <Nama>",
      `/latihan/contoh-gambar` → "Contoh gambar soal", `/latihan` → "Latihan",
      `/topik/<slug>` → nama topik) lalu `sesi.judul` menimpanya.
- [x] 1.5 `Nav.tsx`: tidak `return null` saat fokus (`data-fokus` + `inert`);
      `.nav-tab-garis` satu elemen berpindah lewat `--garis-x/--garis-w`
      (ukur tab aktif per rute dan saat resize); `nav-meta key={teks}`;
      `.nav-menu` grid-template-rows (bukan display none) dengan `inert`
      saat tertutup; `data-belajar` memicu `naik-umpan` pada pil.
- [x] 1.6 `PetaMateri.tsx` (`kisi-bab`) dan `DaftarLatihan.tsx`: `data-bertahap`
      dengan `--n`, lepas `MunculSaatGulir` di daftar itu (satu sumber gerak);
      `[data-transisi]` mematikan bertahap.
- [x] 1.7 (DIHAPUS atas umpan balik ARYA) Elemen bersama: `judul-bab-<slug>` pada h3 kartu bab dan h1 HalamanTopik,
      `kartu-latihan-<slug>` pada kartu DaftarLatihan dan kepala ArenaLatihan
      (`<ViewTransition name share="morph" default="none">`); dibuang kalau
      hasilnya jelek.
- [x] 1.8 `app/topik/[slug]/page.tsx`: `data-isi-asli` pada pembungkus isi
      (`isi-ganti` 160 ms) supaya kerangka → isi tidak melompat.
- [x] 1.9 Cek: Beranda → Peta Materi → belajar → kembali (arah), tab kanan/kiri,
      tombol Kembali peramban, menu HP, garis tab, reduced motion, laci HP
      masih menempel ke layar (transform main tidak ada).

## Tahap 2: D jendela, F umpan balik, E keping (bank soal, kuis, latihan bab)

- [x] 2.1 `web/components/mantra/Jendela.tsx` (`<dialog>`, showModal, Esc,
      klik tirai, `body[data-jendela]`, fokus kembali); CSS `.dialog-mantra`
      dengan `@starting-style` dan `allow-discrete`; HP lembar dari bawah.
      `TombolGuru` memakai kelas yang sama.
- [x] 2.2 `ArenaLatihan.tsx`: tiga jendela → `<Jendela>`; `useHitung` (900 ms,
      sessionStorage `matra:hitung-<halaman>`) untuk skor, `bar-besar`,
      `latihan-persen`; `.skor-angka .garis`; `.lencana-raih` bertahap `--n`.
- [x] 2.3 Umpan balik: `.opsi-mantra .tanda` `tanda-tumbuh`; `.kabar-periksa`;
      `.kartu-soal key={no} data-arah` (Berikutnya, Sebelumnya, peta, keping);
      `.kartu-bahas[data-baru]` hanya sesudah Periksa; label tombol
      `key={teks}` dengan min-width; `.peta-kotak` transisi warna;
      `.lencana[data-raih]`; `TombolPasang` selalu dirakit `[data-siap]`.
- [x] 2.4 `Kuis.tsx`, `Latihan.tsx`: `.opsi .tanda` dan pembahasan `naik-umpan`
      dengan bahasa yang sama (tanpa goyang).
- [x] 2.5 Cek: Periksa benar/salah, Berikutnya 5× cepat, Lihat skor 2× cepat,
      Esc dan fokus kembali, HP lembar dari bawah, reduced motion.

## Tahap 3: C laci dan panel, E pindah materi (halaman belajar)

- [x] 3.1 `HalamanTopik.tsx`: laci HP + tirai (TANPA portal, lihat KEPUTUSAN);
      `.tirai-laci[data-buka]` selalu dirakit; `.pohon[data-laci]` bertransisi
      masuk 400 / keluar 300; `pilihLayar` satu handler (arah + tutup laci +
      ganti layar lewat startTransition).
- [x] 3.2 `.panggung-isi key={slug} data-arah` (Kembali kiri, Lanjut kanan,
      pohon menurut urutan); remah `.kini` dan kolom widget `isi-ganti`.
- [x] 3.3 Lipat pohon: `grid-template-columns` bertransisi, label memudar dulu,
      chevron putar; mode fokus: kolom pohon → 0 (ganti `display: none`).
- [x] 3.4 `.alat-sisip` dan `.layar-atas` memudar masuk (min-height tidak,
      lihat KEPUTUSAN); `.lencana-kunci[data-baru]` sekali saat terbuka;
      `LaciLanjut` panel `naik-umpan`, batang `scaleX` mulai 80 ms.
- [x] 3.5 Cek: laci buka/pilih/tutup di 390 px, lipat pohon, fokus masuk/keluar,
      Kembali/Lanjut, gulir kolom tetap 0 saat pindah materi.

## Tahap 4: H korsel dan video, I memuat dan 404, J mikro, K gulir

- [x] 4.1 `Demo.tsx`: `.demo-rel` transisi 500 ms, titik aktif `scaleX`,
      jeda 7 s berhenti saat hover/fokus/sentuh/reduced motion, slot video
      belum siap = balok `napas` seukuran slide. (Dikerjakan 18 Sep 2026
      TANPA jeda otomatis 7 s: ARYA mencabutnya 5 Sep; titik lewat tutup
      bulat + ruas, lihat KEPUTUSAN.md.)
- [x] 4.2 `PemutarVideo.tsx`: `data-putar` → `.tombol-putar` mengecil pudar;
      `.lencana-geser[data-tampil]`; `.saklar` gagang; `.simpan-video .batang`;
      `.video-galat` memudar masuk; subtitle tanpa transisi.
- [x] 4.3 `MunculSaatGulir.tsx`: kelas `.muncul-gulir[data-tampil]`, threshold .2,
      rootMargin -40px, unobserve; `LogoParalaks` mati di `(pointer: coarse)`;
      `not-found.tsx` `data-selesai` 2,2 s; `SedangMemuat` seukuran panggung.
- [x] 4.4 `:focus-visible` cincin emas; `.nyala` bayangan lingkar; `.pil-emas:hover`.
- [x] 4.5 Audit bagian 8 HANDOFF: reduced motion, Layout Shift 0, fokus dan Esc,
      CPU 4× 60 fps (pindah halaman, jendela, laci, fokus), ketukan cepat,
      grep tidak ada `tab-masuk`, `shake`, `goyang`, `infinite` selain `napas`,
      `putar`, korsel; tidak ada em-dash.
