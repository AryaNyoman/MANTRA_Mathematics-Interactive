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

## Video: dua selesai, dan tiga cacat yang cuma ketahuan karena DILIHAT
Materi 02 "Garis singgung" (110,4 detik) dan Materi 03 "Turunan sebagai fungsi
baru" (115,1 detik). Keduanya 480p untuk ARYA revisi; 1080p60 menyusul kalau
isinya sudah disetujui.

### Kenapa video 03 memakai SATU papan, padahal widget-nya dua
Ini disengaja, bukan kelalaian. Widget Materi 03 menumpuk dua papan, dan itu
benar di layar situs yang bisa memanjang ke bawah. Di bingkai 16:9 tidak bisa.
`bidang_bernomor` mengunci satu satuan mendatar sama dengan satu satuan tegak,
supaya panjang di layar tidak berbohong. Dua papan bertumpuk untuk f = x kuadrat
beserta f aksen = 2x menuntut tinggi sekitar 9,6 satuan pada lebar cuma 3, dan
bingkainya hanya menyisakan sekitar 6,3 satuan tegak. Diukur, bukan dikira:
kamera terpaksa mundur sampai isinya tinggal 14 persen lebar layar, dan angka
sumbunya tidak terbaca lagi.

Satu papan malah memberi satu hal yang dua papan SEMBUNYIKAN: jejak kemiringan
memotong sumbu mendatar tepat di dasar lembah kurvanya. Hubungan itu inti
materinya, dan dengan satu papan ia terlihat dalam satu tatapan.

### Cacat 1: gerbang qc punya lubang, dan videoku yang menemukannya
Blok "jarak h = 0,51" duduk persis di baris angka sumbu sehingga terbaca
"1 jarak h2 = 0,51", dan LOLOS semua pemeriksaan otomatis. Sebabnya angka sumbu
bagian dari bidang, bidang terdaftar sebagai benda dunia, dan benda dunia
memang boleh bersentuhan. Ditutup di commit tersendiri (a136220) atas
persetujuan MASTER, lengkap dengan lima uji baru. Kelima adegan Transformasi
(satu-satunya topik lain yang terkena) dirender ulang dan semuanya tetap lolos.

### Cacat 2: angka sumbu kedua video SALAH, dan lembar kontak pertama melewatkannya
`bidang_bernomor` menaruh angka mulai dari batas bawah lalu melangkah satu-satu.
Saya menulis batas mentah yang bukan bilangan bulat, jadi seluruh angka meleset
dari garis petaknya lalu dibulatkan saat ditampilkan. Sumbu x video 02 terbaca
"-2, -0, 0, 2, 2, 4": angka 2 muncul dua kali, dan angka 1 tidak ada sama sekali
di video yang seluruh isinya mengukur kemiringan di x = 1.

Lembar kontak pertama tidak menangkapnya karena saya memeriksa tindihan, bukan
kebenaran angkanya. Pelajarannya: "sudah dilihat" tidak sama dengan "sudah
dilihat dengan pertanyaan yang benar". Batas bawah kedua sumbu sekarang bilangan
bulat, dan alasannya ditulis di kedua berkas adegan supaya tidak terulang.

### Cacat 3: suara membantah gambar
Naskah video 03 menyuruh siswa "perhatikan papan bawah", padahal adegannya satu
papan. Dua segmen ditulis ulang agar menyebut yang benar-benar terlihat, yaitu
titik biru yang tingginya sama dengan kemiringan pada papan yang sama. Suara dan
subtitle dibuat ulang.

Ketiganya lolos semua alat. Yang menangkap ketiganya adalah membuka gambarnya.

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
4. **Dua video sudah jadi dan ikut dilacak git** (`.webm`, seperti 28 video
   topik lain). Tidak ada yang perlu dipasang manual. Video Materi 07 sampai
   seterusnya menyusul.
5. **Usul untuk berkas bersama, belum dikerjakan, menunggu keputusanmu:**
   `bidang_bernomor` sebaiknya MENOLAK batas bawah yang bukan kelipatan bulat
   langkahnya. `bidang_untuk` milik Transformasi sudah membulatkan, dan itulah
   sebabnya Transformasi tidak kena jebakan ini. Semua pemanggil lain (vektor
   1/3/4/6/8/9, grafik_umum, transformasi_umum, contoh_perahu, uji_sinema_gl)
   sudah memakai bilangan bulat, jadi penjaganya no-op bagi mereka.

## Butuh keputusan ARYA
1. **Kanal YouTube dipakai ulang dari topik Limit.** Handle dan tautannya sudah
   diperiksa sesi Limit, tetapi sesi ini tidak punya cara memeriksa kanal baru
   yang khusus membahas turunan. Kalau ARYA punya kanal favorit lain, tinggal
   sebutkan.
2. **Materi 12 galeri tidak diberi blok `coba`**, mengikuti Limit dan
   Transformasi. MASTER sudah menyetujui dan memperjelas aturannya di CLAUDE.md
   pada 7 Sep: yang wajib blok coba adalah materi berwidget INTERAKTIF.
