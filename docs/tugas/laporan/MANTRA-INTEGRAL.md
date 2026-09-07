# Laporan MANTRA-INTEGRAL

Sesi khusus topik **Integral** (Kelas 12). Dibuka 7 September 2026 atas perintah ARYA.

## Identitas sesi (untuk MASTER)
| Hal | Nilai |
|---|---|
| Nama sesi (alamat pesan) | **MANTRA-INTEGRAL** |
| Cabang | **`sesi/integral-materi`** |
| Worktree | `.claude/worktrees/integral-folder-branch-setup-05863c` |
| Dasar cabang | `sesi/turunan` (= `master` 8caec58 + commit kerangka 5774493) |
| Port dev server | 3016 (3015 dipakai sesi Turunan) |
| Playwright | `-s=mantra-integral` |
| Laporan ini | `docs/tugas/laporan/MANTRA-INTEGRAL.md` |

Cabang lama `sesi/integral` TIDAK dipakai: isinya sama persis dengan leluhur
`master`, tanpa satu pun commit sendiri. Dibiarkan utuh sebagai jejak, boleh
dihapus MASTER kapan saja.

## Pembagian kerja dengan sesi Turunan
Berkas tugas `docs/tugas/MANTRA-TURUNAN-INTEGRAL.md` memberi DUA topik ke satu
sesi. Sejak 7 Sep 2026 ARYA memisahkannya:
- Sesi **materi-turunan-b8c515** (cabang `sesi/turunan-materi`) = **Turunan saja**.
- Sesi **MANTRA-INTEGRAL** (cabang `sesi/integral-materi`) = **Integral saja**.

Sesi ini memakai separuh Integral dari berkas tugas itu, dan rancangan
`docs/superpowers/specs/2026-09-06-integral-alur-belajar.md`.

## Folder milik sesi ini
`web/content/integral/`, `web/components/widget/integral/`,
`web/components/topik/PanggungIntegral.tsx`, `web/app/latihan/integral/page.tsx`,
baris Integral di `daftar-isi.ts`, `topik.ts`, `subbab.ts`, berkas `alat/` yang
namanya menyebut integral, dan laporan ini. Di luar itu jangan disentuh.

## 11 materi Integral (semua masih `siap: false`)
1. Dari laju ke jumlah, membalik turunan
2. Tanda integral dan aturan pangkatnya
3. Substitusi, melihat lapisan
4. Parsial, trigonometri, dan eksponen
5. Luas dari persegi panjang, jumlahan Riemann
6. Integral tentu dan sifat-sifatnya
7. Dua dunia yang ternyata satu, Teorema Dasar Kalkulus
8. Menghitung integral tentu
9. Luas daerah, termasuk yang di bawah sumbu
10. Luas antara dua kurva
11. Integral di sekitar kita

## Selesai
- 7 Sep 2026: cabang `sesi/integral-materi` dibuat, kerangka Integral (11 materi
  rintisan, `PanggungIntegral`, `widget/integral/Rintisan`, halaman latihan,
  pendaftaran di tiga berkas) sudah ada di cabang ini lewat fast-forward.
- Diperiksa: TIDAK ADA folder integral kembar atau nyasar di `D:\MANIM-MATRA`.
  Yang ada hanya folder milik proyek di atas, ditambah rancangan dan berkas tugas.
- `git merge master` bersih, nol konflik (commit `40844ae` di atas `8f7927e`).
- `cd web && npm install` SELESAI: 361 paket, 0 kerentanan.
- `tsc --noEmit` LOLOS (exit 0), dipanggil lewat biner Node langsung, bukan lewat rtk.
- Uji kirim pesan dua arah dengan MANTRA-MASTER BERHASIL: kirim, dibalas, dibalas lagi.

## INTEGRAL SIAP GABUNG

Keempat tahap selesai. Cabang `sesi/integral-materi`, siap digabung MASTER.

| Tahap | Isi | Keadaan |
|---|---|---|
| 1 | 11 materi | SELESAI, direvisi atas pemeriksaan silang MASTER |
| 2 | 10 widget + galeri + panggung | SELESAI, semuanya diuji di peramban |
| 3 | 4 latihan + 32 kuis | SELESAI |
| 4 | `siap: true` per materi lalu topik, plus gerbang | SELESAI |

### Gerbang, semuanya dijalankan ulang setelah saklar dinyalakan
| Gerbang | Hasil |
|---|---|
| `cek_integral.py alat/materi-integral.json` | 65 dari 65 lolos |
| `cek_integral.py alat/soal-integral.json` | 43 dari 43 lolos |
| `cek_integral.py ... --harus-gagal` | 15 klaim sengaja salah, 15 ditolak |
| `cek_urutan_integral.py` | nol pemakaian istilah terlalu dini |
| `periksa_tahap.py integral` | semua tahap lolos |
| `tsc --noEmit` | 0 |
| `eslint` wilayah Integral | 0 |
| `next build` | 0, `/topik/integral` dan `/latihan/integral` dibuat |
| Galat konsol peramban, 11 materi | 0 galat, 0 peringatan |

### Kesepuluh widget, semuanya potretnya DIBUKA dan seretnya diuji
| Widget | Materi | Bukti singkat |
|---|---|---|
| `mesin-balik` | 01 | C digeser 0 sampai 3, kemiringan tetap 1 |
| `naik-pangkat` | 02 | tinggi papan atas sama dengan kemiringan papan bawah; n = -1 ditolak |
| `cocokkan-lapisan` | 03 | calon u salah dijelaskan sebabnya, bukan sekadar ditolak |
| `pasangkan-turunan-integral` | 04 | pasangan salah menampilkan turunannya sendiri |
| `persegi-panjang-menumpuk` | 05 | n=7 memberi 28; selisih menyusut 3,5 ke 1,75 ke 0,408 |
| `pecah-selang` | 06 | c digeser ke tiga tempat, jumlahnya tetap 0 |
| `luas-yang-tumbuh` | 07 | x=1,5 memberi A 1,125 dan kemiringan 1,5 |
| `hitung-bertahap` | 08 | soal substitusi terbuka penuh sampai 4/3 |
| `luas-dua-daerah` | 09 | integral 0 sementara luas 21,333 |
| `dua-kurva` | 10 | x³ dan x pada [-1,1]: luas 0,5, selisih 0 |
| `dunia-nyata-integral` | 11 | galeri empat kartu, jalurnya dihitung dari rumusnya |

### Cacat yang ditemukan sendiri dan sudah diperbaiki
Semuanya LOLOS tsc dan eslint, dan hanya ketahuan dari membuka potret atau
memeriksa angkanya:
1. Widget 01: angka kemiringan menimpa garis sumbu; kurva bayangan keluar
   bingkai pada C ekstrem.
2. Widget 02: jendela diukur untuk keadaan ekstrem sehingga keadaan awal
   nyaris datar; pesan penolakan terpotong jadi "ak pangkat -1"; panel mengaku
   F punya kemiringan padahal F-nya tidak ada.
3. SEMUA widget: menyeret dengan tetikus ikut menyeleksi tulisan, angka sumbu
   jadi blok biru. Diperbaiki sekali di `Bidang.tsx`.
4. `potongTanda`: akar yang jatuh PERSIS di titik cuplikan tidak terdeteksi,
   sehingga luas antara x³ dan x pada [-1,1] dilaporkan 0 padahal 0,5. Widget
   09 dengan sin x mengidap hal yang sama tanpa ketahuan.
5. Widget 07: keterangan terpotong; jejak kurva luas digambar di kiri nol.
6. Bank soal: ke-32 jawaban benar semuanya di pilihan A. Disebar jadi
   7, 7, 6, 6, 6.

## Butuh MASTER
1. **Gabungkan `sesi/integral-materi`.** Semua gerbang lolos.
2. **Satu error eslint di wilayah sesi lain, BUKAN dari saya:**
   `web/components/widget/transformasi-geometri/Legenda.tsx` baris 58,
   `react-hooks/immutability`, "Cannot reassign x after render completes".
   Berkas itu SAMA PERSIS dengan versi di master (`git diff master HEAD`
   kosong), jadi errornya bawaan master. Saya tidak menyentuhnya sesuai aturan
   wilayah. Kalau `eslint .` dipakai sebagai gerbang gabung, ini akan menahan
   siapa pun, bukan cuma saya.
3. **Perkakas gambar salinan keempat** (`koordinat.ts`, `seret.ts`,
   `Bidang.tsx` di `widget/integral/`) sudah Anda catat sebagai utang MASTER.
   Catatan tambahan: perbaikan `userSelect: none` dan perbaikan `potongTanda`
   ada di salinan SAYA saja. Kalau salinan itu disatukan nanti, dua perbaikan
   ini yang harus menang.
4. **Dua ketidakcocokan rancangan yang saya putuskan sendiri**, mohon
   diperiksa: pangkat `-1` saya masukkan ke daftar pilihan widget 02 (tanpa itu
   kalimat petunjuk rancangan mustahil diikuti), dan `cek_soal.py` saya ganti
   `cek_integral.py` untuk berkas soal (alat lama hanya paham klaim limit).

## Butuh keputusan ARYA
- Video Integral belum dikerjakan sama sekali, sesuai aturan: menunggu perintah.
  Urutan prioritasnya sudah ada di rancangan (05, 01, 07, 09, 03).

## Titik rawan matematis yang sudah ditandai
MASTER menemukan 4 kalimat matematis keliru dari 12 materi Turunan. Untuk
Integral, tiga klaim ini TIDAK ditulis sebagai kalimat mutlak:
1. "Integral kebalikan turunan" hanya benar sampai konstanta.
2. "Integral tentu sama dengan luas" salah kalau kurva ada di bawah sumbu.
3. "Substitusi selalu bisa" tidak benar.
Pemeriksaan silang MASTER menambah empat lagi, semuanya sudah dikerjakan:
laju dibaca sebagai tambahan sebulan penuh, "kiri dan kanan selalu mengapit",
"luas selalu bertambah", dan "titik potong selalu tempat kurva pindah sisi".
