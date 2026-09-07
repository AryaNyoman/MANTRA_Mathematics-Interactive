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

## Sedang dikerjakan
Tahap 2: 11 widget Integral dan `PanggungIntegral.tsx`. Widget masih
`Rintisan` semua.

## TAHAP 1 SELESAI: 11 materi terisi (7 Sep 2026)

Commit `9004d9b`. Semua materi `siap: true`; `topik.ts` sengaja masih
`siap: false` sampai widget, latihan, dan kuis selesai.

### Bukti gerbang
| Gerbang | Perintah | Hasil |
|---|---|---|
| Angka | `python alat/cek_integral.py alat/materi-integral.json` | **66 dari 66 lolos**, kode 0 |
| Pemeriksa angka bisa gagal | `... uji-cek-integral-salah.json --harus-gagal` | **15 klaim salah, 15 ditolak**, kode 0 |
| Urutan istilah | `python alat/cek_urutan_integral.py` | **SEMUA LOLOS**, kode 0 |
| Pemeriksa urutan bisa gagal | dua pelanggaran ditanam di Materi 01 | **3 tertangkap**, kode 1, lalu dikembalikan |
| Daftar periksa mengajar | `python alat/periksa_tahap.py integral` | **semua tahap lolos**, kode 0 |
| Tipe | `node node_modules/typescript/bin/tsc --noEmit` | kode 0 |
| tsc dibuktikan hidup | nama widget palsu ditanam | **TS2322**, kode 2, lalu dikembalikan |
| Lint | `node node_modules/eslint/bin/eslint.js content/integral ...` | kode 0 |

### Alat baru milik sesi ini
- `alat/cek_integral.py`, tujuh jenis klaim: antiturunan, tentu, riemann,
  luas, luas_antara, akar, nilai. Dua keputusan rancangan yang penting:
  jumlahan Riemann dihitung sebagai JUMLAH (bukan lewat integral), dan klaim
  luas mencari titik potongnya SENDIRI (bukan menerima dari klaim), supaya
  kekeliruan "lupa memecah di titik potong" benar-benar tertangkap.
- `alat/uji-cek-integral-salah.json`, 15 klaim sengaja salah.
- `alat/cek_urutan_integral.py`, penjaga urutan istilah.
- `alat/materi-integral.json`, 66 klaim angka.

### Jebakan yang sempat menggigit
`sympy.Symbol('x', real=True)` BUKAN lambang yang sama dengan `x` bawaan
`sympify('x**2')`. Versi pertama `cek_integral.py` mencampur keduanya,
sehingga `diff` mengembalikan 0 dan alat menolak SEMUA klaim, termasuk yang
benar, sambil TERLIHAT lulus uji "harus gagal". Ketahuan hanya karena pesan
penolakannya dibaca ("turunan F adalah 0"), bukan karena kode keluarnya.
Ini bukti langsung bahwa uji satu arah tidak cukup. Sudah ditulis sebagai
peringatan di dalam kodenya.

## Dua selisih dengan buku, keduanya diperiksa lewat GAMBAR halaman asli

1. **Sifat 3.2 salah cetak.** Buku menulis syarat "n bilangan rasional dan
   n != 0" (cetak 168, PDF 184). Yang benar n != -1, sebab di situlah
   penyebut n+1 menjadi nol. Nilai n = 0 justru aman. Halaman siswa memakai
   syarat yang benar dan TIDAK menyebut salah cetaknya.
2. **Rancangan salah menulis fungsi Contoh 3.14.**
   `2026-09-06-integral-alur-belajar.md` menulis `y = 3000x + 1000`. Buku
   menulis `y = 3000 akar x + 1000`. Hanya bentuk buku yang memberi 20.000;
   bentuk di rancangan memberi 28.000. Halaman memakai bentuk buku.
   Rancangannya sendiri TIDAK saya ubah (bukan berkas milik sesi ini).

## Tiga klaim matematis yang sengaja tidak ditulis mutlak
1. "Integral kebalikan turunan" ditulis dengan tambahan C-nya (Materi 01).
2. "Integral tentu sama dengan luas" ditulis dengan syaratnya, dan justru
   dibongkar di Materi 09 (integral 0 sementara luasnya 64/3).
3. "Substitusi selalu bisa" dibantah di Materi 03 dengan contoh tandingan.

## Butuh MASTER
Sudah dijawab MASTER 7 Sep 2026, tidak ada yang menggantung:
1. Cabang `sesi/integral-materi` DITERIMA sebagai cabang resmi sesi ini.
2. Integral BOLEH MULAI SEKARANG. Kalimat "Turunan dulu" di berkas tugas dibatalkan;
   kepala `docs/tugas/MANTRA-TURUNAN-INTEGRAL.md` kini memuat tabel pembagian dua sesi.
3. Sesi Turunan sudah dilarang menyentuh berkas integral. Sebaliknya sesi ini dilarang
   menyentuh `content/turunan/`, `PanggungTurunan.tsx`, `widget/turunan/`,
   `latihan/turunan/`, dan laporan mereka.

Koreksi MASTER yang saya terima: leluhur bersama cabang ini adalah `cdf3119`,
bukan `8caec58` seperti yang saya tulis semula.

**Satu permintaan baru (7 Sep, setelah tahap 1).** `alat/periksa_tahap.py`
milik MASTER, butir 2 "panggil ulang", memakai daftar topik
`(Vektor|Trigonometri|Grafik Fungsi|Limit|Statistika)`. **Turunan, Integral,
dan Transformasi Geometri tidak ada di daftar itu**, jadi materi yang
memanggil ulang lewat kalimat "di topik Turunan" dilaporkan `TDK` walau
isinya benar. Materi 04 saya sempat kena. Saya perbaiki dengan menambah
rujukan "Materi 02" dan "Materi 03" di teksnya (perbaikan yang memang
membuat materinya lebih baik), tetapi alatnya tetap akan salah lapor untuk
sesi Turunan. Mohon tiga nama topik itu ditambahkan.

## Butuh keputusan ARYA
- **Lampu hijau tahap 1.** Aturan ARYA mewajibkan estimasi disebut sebelum kerja besar.
  Estimasi sudah disampaikan: tahap 1 (11 materi) besar, tahap 2 (10 widget) besar,
  tahap 3 (latihan dan kuis) sedang, tahap 4 (gerbang mutu) sedang. Menunggu jawaban.

## Titik rawan matematis yang sudah ditandai
MASTER menemukan 4 kalimat matematis keliru dari 12 materi Turunan. Untuk Integral,
tiga klaim ini TIDAK boleh ditulis sebagai kalimat mutlak:
1. "Integral kebalikan turunan" hanya benar sampai konstanta.
2. "Integral tentu sama dengan luas" salah kalau kurva ada di bawah sumbu. Justru itu
   isi Materi 09.
3. "Substitusi selalu bisa" tidak benar.
