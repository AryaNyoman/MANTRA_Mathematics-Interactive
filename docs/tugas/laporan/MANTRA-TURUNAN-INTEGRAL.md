# Laporan sesi MANTRA-TURUNAN

| Hal | Isi |
|---|---|
| Nama sesi | `MANTRA-TURUNAN` (pemanggilan `materi-turunan-b8c515-84`) |
| Folder kerja | `D:\MANIM-MATRA\.claude\worktrees\materi-turunan-b8c515` |
| Cabang | `sesi/turunan-materi` |
| Ruang lingkup | TURUNAN saja. Integral pindah ke sesi MANTRA-INTEGRAL (7 Sep) |
| Port dev | 3015 · Playwright `-s=mantra-turunan` |

## 8 Sep, audit tambahan: pelajaran render untuk MASTER

ARYA meminta temuan/keanehan produksi dicatat lagi. Rincian dan bukti ada di
[Pelajaran render Turunan 1–3](PELAJARAN-RENDER-TURUNAN-2026-09-08.md).
CLAUDE.md dan PROGRESS.md di checkout MASTER serta worktree ikut diperbarui.
Pembaruan ini hanya dokumentasi; hasil video tetap versi yang sudah dilaporkan.

Temuan penting: timing presisi belum menjamin kelengkapan kalimat; garis bisa
menimpa angka walau QC tata letak lolos; detektor diam melewatkan perubahan
kecil tabel; penggantian subtitle sempat menyeberangi batas kalimat; keluaran
lama dapat tertinjau lagi setelah render/penggabungan gagal. Laporan membedakan
kasus yang sudah diperbaiki dari keterbatasan pemeriksa.

**Tambahan baru yang diuji saat audit ini:** normalisasi pada periksa-hasil.py
Turunan 3 membuang operator/tanda matematika. Empat pasangan yang berbeda,
termasuk 2x + h dan 2xh, dianggap sama. MASTER perlu memperkuat pembanding;
ini belum diimplementasikan dan tidak menyatakan MP4 final memiliki salah rumus.

Dua tindak lanjut isi masih terbuka: penghubung lisan Turunan 2 sesuai koreksi
ARYA, serta pembuka/rujukan empat titik dalam video 04 setelah bukti dimajukan
ke 03. Audio/video 2 dan 4 tidak direvisi ulang pada audit catatan ini.
Bukti suara tetap terbatas pada transkripsi sampel dan tinjauan yang dicatat,
belum pengujian pemahaman siswa. Tidak ada pesan langsung ke task MASTER.

## 8 Sep, tindak lanjut: rombakan Turunan 3

Status produksi: **selesai 1080p60**, durasi 5:55,33, di worktree
`materi-turunan-b8c515`. Permintaan langsung ARYA "lakukan hal yg sama pd
video3" melanjutkan tahap catatan menjadi pengerjaan video.

Naskah baru 649 kata, 31 bagian; suara Ardi -5%, durasi 355,333333 detik,
109 cue subtitle lengkap. Rumus 2x dibuktikan dari selisih tinggi dan limit;
tinggi dan kemiringan dibedakan; jejak biru dibangun dari hasil pengukuran;
|x| memberi contoh turunan yang tidak ada di titik sudut. Penghubung ke
video 1/2 disebut lengkap sebelum tulisan singkat miring = naik/datar.

**Perbedaan yang perlu diketahui MASTER:** bukti untuk x² kini dimajukan
dari Materi 04 ke 03 karena ARYA meminta asal rumus dijelaskan. Halaman 03
dan satu kalimat penghubung halaman 04 sudah diselaraskan. Pembuka VIDEO 04
segmen `pola` masih mengucapkan versi lama "empat titik, pola bukan bukti";
jadikan itu tindak lanjut saat video 04 direvisi. Video 01/02/04 tidak
ikut diubah. Kode, audio, dan media tetap di worktree; belum merge/deploy.

Perkakas khusus baru:
`alat/buat_suara_turunan3.py` memakai mesin WordBoundary Turunan 2 tanpa
mengubah mesin/aset 2; `alat/buat_subtitle_turunan3.py` menyimpan kalimat
utuh dengan lambang angka. Adegan `TurunanFungsiBaru` memakai babak dan
pemicu kata seperti revisi Turunan 1. Hasil dan bukti akhir tercatat
di `qc/turunan3-fungsi-turunan/hasil-revisi.md`.

Validasi: 31 babak lolos QC; 88 pemicu kata berselisih paling jauh 0,111834
detik; 16 klaim matematika lulus; subtitle lengkap dan selaras. Lembar kontak
serta frame akhir dibuka. Pemindaian layar kosong dan decode penuh lulus.
Sepuluh berkas MP4 lain tetap identik menurut hash. Gerak pertama 0,125
detik sesudah judul; 38 calon diam beserta konteksnya dicatat dalam laporan.
MP4 utama dan salinan situs berukuran 9.816.530 byte, dengan hash yang sama.
Versi 480p60 bersubtitle tersedia untuk tinjauan langsung. Hasil terbaru
belum ditinjau ARYA; belum di-commit, merge, atau deploy.


## 8 Sep, tindak lanjut: Turunan 1 direvisi atas permintaan ARYA

Setelah tahap catatan, ARYA meminta langsung revisi Turunan 1. Produksi
selesai: 5:51,77, MP4 1080p60, 31 bagian narasi baru, 113 potongan subtitle.
Timing tabel diperbaiki; arti total/rata-rata dan kemiringan dijelaskan
lengkap; tulisan diringkas sesudah pengenalan; Pythagoras dibedakan melalui
contoh 3–4–5 cm dan satuan barang/jam. Materi halaman nomor 1 diselaraskan.

Semua 31 babak lolos QC; 70 pemicu animasi memiliki selisih maksimum
0,032001 detik dari jam kata. Durasi cocok, layar kosong akhir tidak
ditemukan, decode penuh lulus, dan hash 12 video lain tetap sama.
Video 2/3 tidak diubah. Belum ada tinjauan ARYA untuk hasil revisi terbaru.

Berkas dalam worktree `materi-turunan-b8c515`:
- `media/turunan1-laju-rata-rata.mp4` (utama), beserta salinan di web/public/anim.
- `media/uji-480p/turunan1-laju-rata-rata-bersubtitle.mp4` (untuk ditonton).
- `qc/turunan1-laju-rata-rata/hasil-revisi-lanjutan.md` (bukti, batas audit,
  cadangan, dan cara membangun ulang).
- Adegan/narasi Turunan 1, `alat/buat_suara_turunan1.py`,
  `alat/buat_subtitle_turunan1.py`, serta audio dengan `kata.json` dan
  `durasi.json`. Pembuat suara bergantung pada mesin WordBoundary di
  `alat/buat_suara_turunan2.py`, yang tetap tidak berubah.

Implementasi belum di-commit, digabung ke master, atau deploy. Rincian
arahan Turunan 3 di bawah tetap riwayat rencana berikutnya; batas
"catatan dahulu" pada tahap itu telah dilanjutkan oleh perintah revisi
Turunan 1. Lihat juga entri terbaru PROGRESS.md.

## 8 Sep, arahan lanjutan ARYA: persiapan rombakan Turunan 3

**Status: catatan diperbarui, produksi belum dimulai.** Instruksi langsung
ARYA adalah mencatat dahulu sebelum coding, naskah narasi, TTS, render, dan
langkah produksi lain. Sasaran revisi berikutnya video Turunan 3, bukan
otomatis merender ulang video 1 dan 2 pada tahap ini.

### Selesai: arahan pemilik dan bukti dicatat

- Pertahankan kedalaman penjelasan dan intonasi tenang Turunan 2.
  **Batas durasi baru 3–6 menit**, sesuai kerumitan materi; ini menggantikan
  catatan sebelumnya bahwa belum ada batas total.
- Foto 1: layar video 2 menyebut kemiringan, tetapi ucapan/subtitle hanya
  mengatakan "Pada gambar, hitungan yang sama adalah kenaikan ..." lalu
  "dibagi langkah mendatar". Rumus matematikanya benar; nama konsep dan
  penghubung lisan ke video 1 kurang lengkap. Ketepatan waktu 0,031 detik
  yang dilaporkan sebelumnya tidak menangkap kekurangan semantik ini.
- Kalimat penghubung yang diminta ARYA:
  **"Sama seperti video 1 yaitu, kemiringan adalah kenaikan dibagi langkah
  mendatar."** Ini contoh arah koreksi dari pemilik, bukan naskah baru yang
  telah diproduksi. Di video 3 rujuk isi video 2 secara tepat, jangan
  menyalin nomor video secara buta.
- Setelah bentuk lengkap diucapkan dan ditulis, sederhanakan tulisan adegan
  menjadi **"miring = naik/datar"**. Subtitle tetap lengkap sesuai ucapan.
  Jelaskan arti singkatan sebelum memakainya agar "miring" tidak tertukar
  dengan nama sisi segitiga.
- Foto 2: segitiga video 1 menunjukkan 44 barang dan 2 jam. Siswa dapat
  mengira pertanyaannya mencari panjang sisi miring dengan Pythagoras.
  Ulas pengetahuan lama itu di dekat kemunculan segitiga, bukan sesudah
  siswa dipaksa menerima pembagian tanpa alasan.

Bukti tersimpan di
[foto 1, rumus dan subtitle video 2](bukti-turunan-2026-09-08/foto-1-turunan2-rumus-subtitle.png)
dan
[foto 2, segitiga video 1](bukti-turunan-2026-09-08/foto-2-turunan1-segitiga.png).
Foto adalah bukti visual; arahan berasal dari pesan ARYA yang menyertainya.

### Pokok penjelasan Pythagoras yang harus dijaga

Segitiga itu memang siku-siku. Pythagoras menjawab **berapa panjang sisi
miring**, sedangkan kemiringan menjawab **berapa perubahan tegak untuk
setiap satu langkah mendatar**. Contoh pembeda yang bisa dipilih pada tahap
rancangan: segitiga dengan naik 3 dan datar 4 (satuan panjang sama) memiliki
panjang sisi miring 5, tetapi kemiringan 3/4. Jangan menyebut kemiringan = 5.

Khusus video 1, tegak bersatuan barang dan datar bersatuan jam; keduanya
bukan dua ukuran panjang sejenis yang boleh dijumlahkan kuadratnya.
Hitungan yang bermakna adalah 44 barang / 2 jam = 22 barang/jam.
Panjang atau sudut garis pada layar berubah jika skala gambar diubah,
sedangkan nilai laju dari data tetap. Pythagoras tidak salah; besaran
yang dicari pada pembelajaran ini berbeda.

"Miring = naik/datar" adalah ringkasan bahasa, bukan definisi sisi miring.
Pada grafik yang menurun, pertahankan perubahan tegak bertanda negatif;
jangan memakai panjang sisi positif lalu kehilangan tanda kemiringannya.

### Sedang disiapkan: dasar rancangan video 3, belum naskah

Urutan gagasan yang perlu dibangun: video 2 memberi kemiringan pada satu
titik; video 3 menanyakan kemiringan pada titik-titik lain; hasilnya
dipasangkan dengan posisi x; kumpulan pasangan itu menjadi fungsi turunan.
Asal tinggi titik pada grafik turunan harus diterangkan sebagai **nilai
kemiringan pada grafik asal**, agar siswa tidak menyangka menyalin tinggi
kurva. Jangan langsung menampilkan f′(x) = 2x sebagai aturan hafalan.

Sebelum produksi, cocokkan kembali dengan materi 03 yang ada. Tentukan
porsi pengingat, contoh angka, perubahan tanda, dan kasus sudut sesuai
tujuan materi dan batas 3–6 menit. Ini daftar tujuan, bukan naskah jadi
atau keputusan jumlah adegan.

### Timing dan syarat pemeriksaan berikutnya

- ARYA menunjuk **Turunan 1 detik 10–17** dan telah mengonfirmasi:
  **"Masalah timing yang perlu diperbaiki."** Ini cacat yang perlu dicegah
  terulang pada Turunan 3. Revisi rentang video 1 dicatat sebagai tindak
  lanjut; pada tahap catatan ini belum ada perbaikan atau render ulang.
- Pemeriksaan awal kode/naskah menempatkan rentang ini pada babak catatan
  produksi (sekitar 8,568–19,224 detik), yang memuat perpindahan kamera dan
  kemunculan tabel. Angka ini berasal dari jadwal audio; belum merupakan
  hasil pengukuran pemutaran final pada tahap pencatatan ini.
- Sebelum menganimasikan, pasangan kalimat, objek yang ditunjuk, urutan
  sorotan, dan hasil hitungan harus jelas. Ukur waktu berdasarkan rekaman
  sebenarnya, lalu tinjau apakah istilah dan angka sudah tampak ketika
  dibahas. Hindari membaca angka saat transisi masih menyembunyikan tabel.
- [ ] Penghubung ke video 2 menyebut konsep dan maknanya secara lengkap.
- [ ] Bentuk lengkap dikenalkan sebelum singkatan "miring = naik/datar".
- [ ] Panjang sisi miring, kemiringan, arah perubahan, dan satuan dibedakan.
- [ ] Setiap titik grafik turunan dijelaskan asal nilai tingginya.
- [ ] Narasi, subtitle lengkap, dan peristiwa visual cocok per gagasan.
- [ ] Cuplikan bergerak dengan suara diperiksa, selain lembar kontak.
- [ ] Durasi akhir 180–360 detik tanpa pengulangan pengisi waktu.
- [ ] Semua gerbang matematika, tata letak, dan media tetap dilalui.

### Butuh MASTER dan keputusan yang masih terbuka

MASTER perlu membaca arahan terbaru ini sebelum meneruskan produksi atau
menyeragamkan video menurut catatan lama. Persetujuan umum video 2 tetap
menjadi dasar gaya, tetapi masukan baru tentang kalimat, singkatan, dan
Pythagoras harus dicatat sebagai tindak lanjut video 1/2. Perbaikannya belum
dikerjakan dalam tahap ini; jangan melaporkan kedua video sudah dikoreksi.

Tidak ada perubahan kode, JSON narasi, TTS, subtitle, atau MP4 pada tahap
ini. Tidak ada merge/deploy. Catatan diperbarui di folder utama dan worktree;
belum ada pesan langsung atau bukti MASTER sudah membaca. Pertanyaan
tentang timing sudah terjawab: 10–17 detik adalah masalah
yang perlu diperbaiki. Tidak ada klarifikasi lain yang menghalangi rancangan.

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

## Enam video, dan empat keputusan yang perlu ARYA tahu disengaja

| Materi | Isi | Panjang |
|---|---|---|
| 01 | Laju rata-rata, pembuka 3D pabrik | 2:03 |
| 02 | Garis singgung dari garis potong | 1:50 |
| 03 | Turunan sebagai fungsi baru | 1:55 |
| 04 | Aturan pangkat lahir dari definisi | 1:57 |
| 06 | Aturan hasil kali, pojok yang lenyap | 2:31 |
| 07 | Aturan rantai, perkalian yang dibuktikan | 2:27 |

Semuanya 480p untuk ARYA revisi. Wadahnya mp4 untuk video 01 dan 04 (keputusan
ARYA 8 September); empat yang lebih dulu masih webm dan akan diganti sekalian
saat 1080p.

### Keputusan 1: video 03 memakai SATU papan, widget-nya dua
Alasan terukurnya ada di bagian sebelumnya. Ringkasnya: dua papan bertumpuk pada
bingkai 16:9 memaksa kamera mundur sampai isinya tinggal 14 persen lebar layar.

### Keputusan 2: video 01 memakai sumbu berskala sendiri, bukan bidang berpetak
Sumbunya jam lawan barang, 6 lawan 90. Bidang berpetak mengunci satu satuan
mendatar sama dengan satu satuan tegak, dan pada data ini gambarnya jadi pita
setinggi 90 satuan di atas alas 6 satuan. Maksud aturan itu adalah supaya
panjang di layar tidak berbohong, dan di sini yang menjaga hal itu adalah ANGKA
pada tiap sisi segitiga (2 jam, 44 barang): siswa membaca angka pada sumbu,
bukan mengukur panjang di layar. Disetujui MASTER 8 September.

### Keputusan 3: video 06 hanya membahas hasil kali, padahal judul materinya
juga menyebut hasil bagi. Alasan aturan hasil kali berupa GAMBAR, dan gambar
bergerak bisa memperlihatkan pojoknya lenyap. Alasan aturan hasil bagi berupa
aljabar, dan halaman sudah mengerjakannya lengkap. Video menyebutnya di penutup
supaya siswa tahu ke mana mencarinya.

### Keputusan 4: video 04 sengaja TIDAK mengulang jabaran halaman baris demi baris
Yang dikerjakan video satu hal yang tidak bisa dilakukan tulisan: suku yang
memuat h benar-benar terlihat menyusut sampai hilang, sementara suku yang tidak
memuat h sama sekali tidak bergerak. Akibatnya video ini yang paling sepi
isinya (0,73 persen area kerja, dibanding 6,03 persen video 06), dan itu memang
konsekuensi menampilkan satu bentuk pendek pada satu waktu.

### Cacat yang ditemukan karena video dibuat, bukan karena video diperiksa
Merancang video Materi 06 memaksa saya membuka widget-nya untuk menentukan warna
tiap pita, dan di situ ketahuan halaman menamai pitanya TERBALIK: "pita mendatar"
untuk pita yang digambar tegak. Tidak satu pun alat proyek bisa menangkap teks
halaman yang membantah widget di halaman yang sama. MASTER sudah menjadikannya
aturan: setiap membuat video untuk materi berwidget, buka widget-nya dan samakan
istilahnya.

### Alat baru: `alat/cek_layar_kosong.py`
Gerbang `sinema.babak` menghitung berapa lama babak DIAM, tetapi tidak bisa
membedakan layar yang diam karena menahan gambar dari layar yang TIDAK BERISI
APA PUN. Video Materi 07 sempat menyisakan 5,5 detik layar kosong dan lolos
semua gerbang. Alat ini memindai isi tiap setengah detik di luar jalur identitas,
panel, dan subtitle. Sudah menangkap satu cacat lagi saat video 04 dibuat.

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
