# MANTRA-TURUNAN-INTEGRAL

Kamu sesi MANTRA-TURUNAN-INTEGRAL. Baca dan patuhi `docs/tugas/ATURAN-SEMUA-SESI.md`
SEBELUM baris mana pun di bawah ini dikerjakan. Lalu `PROGRESS.md` dan `CLAUDE.md`.

Worktree-mu: `.claude/worktrees/mantra-integral-materi-505cfc`, cabang
`sesi/turunan` (SATU cabang untuk kedua topik). Nama foldernya warisan sesi
lama dan tidak bisa diganti selama sesi memakainya; yang penting cabangnya.
Sebelum apa pun: `git branch --show-current` harus menjawab `sesi/turunan`.
Kalau menjawab `master`, BERHENTI dan lapor MASTER: folder itu berarti bukan
worktree lagi dan setiap perintah git akan mengenai master. Port dev server **3015**. Playwright
`-s=mantra-turunan`. `cd web && npm install` sudah dijalankan MASTER; kalau
`node_modules` hilang, ulangi.

## Misi
Dua topik baru MANTRA, Kelas 12, dikerjakan BERURUTAN oleh kamu sendiri:
1. **Turunan**, 12 materi, 11 widget, galeri dunia nyata, 4 latihan, 32 kuis.
2. **Integral**, 11 materi, 10 widget, galeri dunia nyata, 4 latihan, 32 kuis.

Gelombang 1 = halaman dan widget saja. **JANGAN membuat video** sampai MASTER
menyuruh; urutan kandidat videonya sudah ada di rancangan, tapi ARYA ingin
halamannya diperiksa dulu.

## Rancangan: SUDAH DISETUJUI, tinggal dijalankan
ARYA (5 Sep 2026) mempercayakan rancangan sepenuhnya ke MASTER, jadi kamu
TIDAK perlu mengajukan ulang ke ARYA. Ikuti:
- `docs/superpowers/specs/2026-09-06-turunan-alur-belajar.md`
- `docs/superpowers/specs/2026-09-06-integral-alur-belajar.md`

Di sana tiap materi punya: pertanyaan, isi pokok (dengan halaman buku),
rancangan widget (apa yang diseret, batasnya, kendali apa, apa yang menyala,
kalimat petunjuk), sering keliru, dan prioritas video. Peta sub-bab dan daftar
istilah per materi juga di sana.

Kalau saat mengerjakan kamu menemukan rancangan yang tidak masuk akal
(matematikanya keliru, widgetnya tidak mungkin dibuat, urutannya membuat
siswa bingung), **tetap kerjakan bagian lain** dan tulis di laporanmu bagian
"Butuh keputusan ARYA" dengan usulanmu. Jangan diam, jangan mengubah rancangan
diam-diam.

Tiga keputusan ARYA yang mengikat: dua topik terpisah di situs; kedalaman
mengikuti buku, **"tapi jangan sampai siswa tidak paham"** (jadi tiap loncatan
diberi jembatan, dan integral parsial dilabeli pengayaan); volume benda putar
TIDAK masuk.

## Sumber utama (baca bukunya, jangan mengandalkan ingatan)
- `D:\BAHAN MATEMATIKA\LIMIT.pdf` = buku UTUH Matematika Tingkat Lanjut
  Kelas XII (Edisi Revisi 2025), 320 halaman PDF. Bab 2 Turunan: PDF 95
  sampai 173. Bab 3 Integral: PDF 175 sampai 235. Halaman PDF = cetak + 16.
  Teks digital: baca dengan PyMuPDF (`fitz`), halaman per halaman, seperlunya.
- `D:\SEKOLAH S1 & S2\S1\matematika\kalkulus 1.pdf` (diktat ITB): istilah.
- Stewart (`Calculus (9rd Edition).pdf`, scan): definisi, hanya kalau ragu.
- Big book SMA dan https://mathcyber1997.com: level bahasa dan soal.

## Kerangka yang SUDAH ADA di cabangmu (buatan MASTER, 6 Sep 2026)
| Berkas | Keadaan |
|---|---|
| `web/content/turunan/{tahap,latihan,kuis,index}.ts` | 12 materi dengan judul, slug, pertanyaan, nama widget; penjelasan masih RINTISAN satu paragraf + blok `coba`; `siap: false`; latihan dan kuis kosong |
| `web/content/integral/{tahap,latihan,kuis,index}.ts` | sama, 11 materi |
| `web/components/topik/PanggungTurunan.tsx`, `PanggungIntegral.tsx` | panggung dengan SATU widget contoh yang sudah dipasangi kendali (Angka, Pilihan, Kembalikan, Petunjuk); widget lain masih `Rintisan` |
| `web/components/widget/turunan/Rintisan.tsx`, `widget/integral/Rintisan.tsx` | pengganti sementara; hapus setelah semua widget jadi |
| `web/app/latihan/turunan/page.tsx`, `latihan/integral/page.tsx` | sudah jadi |
| `daftar-isi.ts`, `topik.ts` (`siap: false`), `subbab.ts` | sudah terdaftar |

tsc, eslint, dan build sudah lolos pada kerangka ini. Kalau setelah kerjamu
salah satunya gagal, itu kerjamu, bukan kerangkanya.

## Folder milikmu
`web/content/turunan/`, `web/content/integral/`, `web/components/widget/turunan/`,
`web/components/widget/integral/`, `PanggungTurunan.tsx`, `PanggungIntegral.tsx`,
kedua halaman latihan, baris milikmu di `daftar-isi.ts`, `topik.ts`, `subbab.ts`,
berkas BARU di `alat/` yang namanya menyebut topikmu (`alat/materi-turunan.json`,
`alat/soal-latihan-turunan.json`, `alat/soal-kuis-turunan.json`, tiga yang sama
untuk integral, `alat/cek_urutan_turunan.py`, `alat/cek_urutan_integral.py`),
dan laporanmu `docs/tugas/laporan/MANTRA-TURUNAN-INTEGRAL.md`.

Di luar itu: JANGAN. Butuh perubahan di berkas bersama (`kendali/`, `tipe.ts`,
`globals.css`, `HalamanTopik`)? Tulis di laporan bagian "Butuh MASTER".

## Aturan widget (semuanya sudah jadi aturan proyek, bukan saran)
1. **Kendali bersama** `web/components/kendali/`: `Angka` (nama + arti, bisa
   diketik dan digeser, `kunci` unik), `Pilihan`, `Koordinat`, `Petunjuk`,
   `Kembalikan`. Jangan membuat slider atau input sendiri.
2. **Jendela gambar TETAP**: tidak melar saat titik diseret. Pola:
   `widget/vektor/geometri.ts` (`jendelaTetap`, `tahanBersama`),
   `widget/grafik-fungsi/SusunParabola.tsx` (`JENDELA_TETAP`).
3. **Seretan ditahan di kotak batas** (`BATAS_*` diekspor dari komponen
   widget, dipakai juga oleh `Angka`), ranah non-negatif kalau materinya
   memang begitu (jam, panjang, n).
4. **Menyala**: bagian gambar yang kuncinya sedang dipegang diberi kelas
   `nyala` (`useSedangDiubah` dari `kendali/sedang-diubah.ts`).
5. **Sasaran sentuh besar** untuk titik yang diseret: `widget/statistika/TitikPegang.tsx`
   (lingkaran transparan r ≥ 16). `touch-action: none` di SVG AKAR, bukan
   anaknya (WebKit mengabaikannya di anak).
6. **Tombol Kembalikan** mengembalikan semua keadaan widget ke nilai awal.
7. **Tidak memotong gambarnya sendiri**; label sumbu lewat `lib/petak-sumbu.ts`.
8. Keadaan widget dipegang di Panggung (pola `PanggungLimit`), komponen
   widget hanya menggambar.

## Aturan isi
- `docs/tugas/STANDAR-MENGAJAR.md` (daftar periksa 10 butir per materi).
- Blok pendek, bukan tembok paragraf, tapi isi tidak dipangkas. Kata ganti
  "Anda". Kata "miskonsepsi" DILARANG. Em-dash DILARANG di mana pun.
- **Blok `coba` WAJIB di tiap materi berwidget** (CLAUDE.md, 5 Sep 2026).
- **Urutan istilah**: buat `alat/cek_urutan_turunan.py` dan
  `alat/cek_urutan_integral.py` dengan menyalin `alat/cek_urutan_belajar.py`
  dan mengganti berkas tahap serta tabel ISTILAH sesuai daftar di rancangan.
  Nol pelanggaran sebelum materi dinyalakan.
- `python alat/periksa_tahap.py turunan` (dan `integral`) lolos.
- **Semua angka diperiksa sympy** lewat `alat/cek_soal.py` dengan berkas
  klaim milikmu. `cek_soal.py` sekarang hanya paham `limit`; kalau kamu
  butuh `diff`/`integrate`, buat pemeriksa sendiri `alat/cek_turunan.py`
  (pola `alat/cek_vektor.py`), dan BUKTIKAN dua arah: menolak jawaban yang
  sengaja salah, meloloskan yang benar.
- Soal salinan wajib bersumber (tautan + nama penulis); tanpa keterangan
  berarti tulisan sendiri. Kalibrasi kesulitan ke buku SEBELUM menulis.

## Urutan kerja (Turunan dulu, Integral sesudahnya; jangan diselang-seling)
| Tahap | Isi | Bukti selesai |
|---|---|---|
| 1 | Isi 12 materi Turunan | cek_urutan nol, periksa_tahap lolos, angka lolos |
| 2 | 11 widget Turunan + panggung | tiap widget: seret, ketik, batas, nyala, kembalikan diuji; potret 375 dan 1366 DIBUKA |
| 3 | 4 latihan + 32 kuis Turunan | pemeriksa lolos |
| 4 | `siap: true` per materi lalu topik; tsc, eslint, build lewat biner Node langsung | laporan "TURUNAN SIAP GABUNG" |
| 5 sampai 8 | Sama untuk Integral | laporan "INTEGRAL SIAP GABUNG" |

**`siap` di `topik.ts`** dibiarkan `false` sampai tahap 4 (dan 8). Untuk
melihat halamanmu selama bekerja, ubah ke `true` di kerja lokal saja dan
jangan ikut di-commit (`git add -p`, atau kembalikan sebelum commit).
Materi individu (`siap` di `tahap.ts`) dinyalakan satu per satu begitu lolos.
Selama sebuah materi masih `siap: false`, `?materi=N` untuk materi itu jatuh
ke Materi 01 dan tombolnya di daftar kiri nonaktif (perilaku `HalamanTopik`).
Jadi materi yang SEDANG kamu kerjakan boleh dinyalakan lebih dulu supaya bisa
dilihat; itu aman di-commit, sebab topiknya sendiri masih `siap: false`.

Commit kecil dan sering di `sesi/turunan`, pesan bahasa Indonesia, akhiri
dengan baris `Co-Authored-By` yang biasa. JANGAN menyentuh `master`, JANGAN
deploy, JANGAN mengedit `PROGRESS.md` atau `CLAUDE.md`.

## Melapor
- Laporan: `docs/tugas/laporan/MANTRA-TURUNAN-INTEGRAL.md`, bagian Selesai,
  Sedang dikerjakan, Butuh MASTER, Butuh keputusan ARYA. Perbarui tiap
  kemajuan berarti.
- Saat "TURUNAN SIAP GABUNG" dan "INTEGRAL SIAP GABUNG": kirim pesan ke sesi
  **MATRA-MASTER** (lewat alat kirim pesan antar sesi, kalau tersedia) berisi
  ringkasan bukti (hasil tsc, build, jumlah angka lolos, potret yang dibuka).
  MASTER akan memeriksa silang materi dan widget (ARYA memintanya begitu,
  5 Sep malam), lalu memberi tahu kapan video boleh dimulai.
- ARYA sedang tidur saat tugas ini dibuat. Keputusan yang hanya bisa ia ambil
  ditulis di laporan, bukan ditunggu.

## Yang SUDAH terjadi di proyek ini dan jangan diulang
- Pemeriksa yang tidak diuji dua arah pernah salah lapor. Uji pemeriksamu.
- rtk mengarang keluaran `tsc` dan `next build`: panggil biner Node langsung.
- Soal buatan Claude terlalu mudah: kalibrasi ke buku dulu.
- Istilah bocor ke materi sebelumnya (Transformasi): jalankan pemeriksa urutan.
- Bola yang sulit dipegang di HP (Statistika): sasaran sentuh besar dan
  `touch-action: none` di SVG akar.
- Grafik "licin" sampai keluar daerah (Vektor, Grafik Fungsi): jendela tetap
  dan batas seret.
