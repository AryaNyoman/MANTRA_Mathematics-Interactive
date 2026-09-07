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

## Sedang dikerjakan
Belum ada. Menunggu perintah mulai dari ARYA atau MASTER.

## Butuh MASTER
- `web/node_modules` BELUM ada di worktree ini. Perlu `cd web && npm install`
  sebelum tsc, eslint, build, atau dev server bisa dijalankan.
- Konfirmasi urutan: berkas tugas menulis "Turunan dulu, Integral sesudahnya".
  Kalau dua sesi jalan bersamaan, aturan itu tidak berlaku lagi. Mohon dipastikan
  Integral boleh mulai sekarang, tidak menunggu "TURUNAN SIAP GABUNG".

## Butuh keputusan ARYA
- Belum ada.
