# Laporan sesi MANTRA-TURUNAN

| Hal | Isi |
|---|---|
| Nama sesi | `MANTRA-TURUNAN` (pemanggilan `materi-turunan-b8c515-84`) |
| Folder kerja | `D:\MANIM-MATRA\.claude\worktrees\materi-turunan-b8c515` |
| Cabang | `sesi/turunan-materi` |
| Ruang lingkup | TURUNAN saja. Integral pindah ke sesi MANTRA-INTEGRAL (7 Sep) |
| Port dev | 3015 · Playwright `-s=mantra-turunan` |

## TURUNAN SIAP GABUNG

Keempat tahap selesai. `topik.ts` sudah `siap: true`.

### Bukti, semuanya dijalankan dan kode keluarnya dibaca tanpa pipa
| Gerbang | Hasil |
|---|---|
| `cek_turunan.py alat/materi-turunan.json` | 96 klaim, 0 salah, keluar 0 |
| `cek_turunan.py` soal latihan + soal kuis | 82 klaim, 0 salah, keluar 0 |
| `cek_turunan.py alat/uji-cek-turunan-salah.json` | 11 klaim sengaja salah, 11 DITOLAK, keluar 1 |
| `cek_urutan_turunan.py` | SEMUA LOLOS, keluar 0 |
| `periksa_tahap.py turunan` | lolos, keluar 0 |
| `tsc --noEmit` | keluar 0 |
| `eslint content/turunan components/widget/turunan components/topik/PanggungTurunan.tsx` | keluar 0, tanpa keluaran |
| `next build` lewat biner Node langsung | keluar 0 |

Kedua belas materi dibuka satu per satu di peramban. Potret 1366 dinilai untuk
Materi 01 sampai 12, potret 375 untuk Materi 01 dan 11. Seretan diuji dengan
pointer sungguhan pada Materi 03 (28 titik jejak membentuk garis 2x) dan
Materi 07 (pengali tingkat pertama tetap 3, tingkat kedua berubah 1,65 ke 7,65,
kedua batas jepit bekerja).

### Isi yang dihasilkan
- 12 materi, ditulis dari Bab 2 buku Tingkat Lanjut XII yang dibaca langsung
  dengan PyMuPDF, bukan dari ingatan.
- 11 widget interaktif + 1 galeri dunia nyata.
- 4 soal latihan dan 32 soal kuis, tingkatnya dikalibrasi ke pola soal buku.

### Alat baru, ketiganya diuji dua arah
- `alat/cek_turunan.py`: pemeriksa sympy, 11 jenis klaim.
- `alat/cek_urutan_turunan.py`: penjaga urutan istilah, 19 pola.
- `alat/materi-turunan.json`, `alat/soal-latihan-turunan.json`,
  `alat/soal-kuis-turunan.json`, `alat/uji-cek-turunan-salah.json`.

Nilai tiap PENGECOH soal ikut diperiksa sympy, jadi klaim "ini kekeliruan yang
sering terjadi" bukan sekadar keyakinan.

## Sepuluh cacat yang ditemukan karena DIBUKA, bukan karena alat
Tidak satu pun tertangkap tsc atau ESLint. Ini alasan langkah "buka dan lihat"
tidak boleh dilewati.

1. Titik Q keluar bingkai; pada x³ - 3x hilang sama sekali (Materi 02, 03).
2. Keterangan menulis `x^2`, bukan `x²` (Materi 04).
3. Papan dipatok kasus terburuk sehingga polinom biasa tergencet jadi garis
   hampir rata (Materi 05).
4. Label Δu bertabrakan dengan tulisan petunjuk (Materi 06).
5. Blok tabel tersisip dua kali sehingga tabel muncul di atas gambarnya
   (Materi 07). Penyebabnya penggantian teks yang mengenai dua tempat sekaligus.
6. Kotak "coba" Materi 07 menjanjikan "pita terakhir memanjang", padahal karena
   garis y berskala sendiri pita itu justru memendek. Cacat ini ada di TEKS
   MATERI, dan hanya ketahuan karena widget dan bacaannya diperiksa bersamaan.
7. Kotak "coba" Materi 08 mengklaim jejak "menutupi" kurva papan atas, padahal
   kedua papan berskala sedikit berbeda; diubah menjadi "berbentuk sama persis".
8. Kata "naik" dan "turun" di dalam pita tanda tertembus kurvanya (Materi 10).
   Pitanya dipindah ke baris sendiri di bawah bidang.
9. Label kendali tertulis "x1", bukan "x₁" (Materi 09).
10. Penggantian teks kembali mengenai dua tempat sekaligus saat memasang widget
    09 sampai 12; kali ini tertangkap assertion SEBELUM berkasnya berubah.

## Revisi dari pemeriksaan silang MASTER
Sepuluh temuan dikerjakan (commit 7595747). Empat di antaranya matematikanya
memang keliru, dan dua membuat materi membantah dirinya sendiri (Materi 09 vs
Materi 10 soal "garis singgung mendatar selalu berarti kurva berbalik").

Satu temuan saya bantah dengan alasan, dan MASTER membenarkan bantahannya:
kata "jelas" tidak dilarang alat proyek kalau menggambarkan benda. Keenam
pemakaiannya tetap diganti, tetapi karena kata pengisi, bukan karena melanggar.

## Butuh MASTER
1. **Cabangnya `sesi/turunan-materi`**, bukan `sesi/turunan`. Ambil cabang ini
   saat menggabung. `sesi/turunan` dibiarkan utuh sebagai cadangan kerangka.
2. **`widget/turunan/{koordinat.ts,Bidang.tsx,seret.ts}` adalah SALINAN KETIGA**
   dari berkas yang sama (limit → grafik-fungsi → turunan), sebab aturan
   melarang menyunting wilayah sesi lain. Sudah dicatat MASTER sebagai tugas
   penyatuan setelah semua cabang tergabung. Sesi Vektor mengajukan hal sama.
3. **Berkas Integral di cabang ini tidak disentuh dan tidak dihapus**, walau
   Integral sudah bukan wilayah sesi ini. Menghapusnya berisiko menabrak kerja
   sesi MANTRA-INTEGRAL saat penggabungan.
4. **Video Turunan belum dibuat**, sesuai perintah: gelombang 1 halaman saja.
   `cek_urutan_turunan.py` sudah menyiapkan peta naskahnya, tinggal dibuka.

## Butuh keputusan ARYA
1. **Kanal YouTube dipakai ulang dari topik Limit.** Handle dan tautannya sudah
   diperiksa sesi Limit, tetapi sesi ini tidak punya cara memeriksa kanal baru
   yang khusus membahas turunan. Kalau ARYA punya kanal favorit lain, tinggal
   sebutkan.
2. **Materi 12 galeri tidak diberi blok `coba`**, mengikuti Limit dan
   Transformasi. MASTER sudah menyetujui dan memperjelas aturannya di CLAUDE.md
   pada 7 Sep: yang wajib blok coba adalah materi berwidget INTERAKTIF.
