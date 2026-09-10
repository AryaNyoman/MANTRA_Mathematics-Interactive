# MANTRA-INTEGRAL, gelombang 4 (STANDAR VIDEO v3)

Sesi: MANTRA-INTEGRAL. Cabang `sesi/integral-materi`, worktree
`integral-folder-branch-setup-05863c`, port 3016.
Tanggal: 8 sampai 9 September 2026.

Dua video pertama daftar gelombang 4 selesai dan sudah ada di
`D:\MANIM-MATRA\UNTUK ARYA\CEK 480P`, menunggu ARYA menonton.
Video ketiga (Materi 05) BELUM dikerjakan, sesuai perintah ARYA.

| Video | Naskah | Durasi | Render | Pemicu terlambat | Berkas di CEK 480P |
|---|---|---|---|---|---|
| Integral 01 dari laju ke jumlah | 33 segmen | 5:50 (350,2 s) | 480p mp4 | 0,050 s | mp4, mp4 bersubtitel, vtt, jpg |
| Integral 03 substitusi | 34 segmen | 5:16 (315,9 s) | 480p mp4 | 0,050 s | mp4, mp4 bersubtitel, vtt, jpg |

Batas pemicu terlambat menurut standar 0,15 detik; keduanya jauh di bawah.

## Daftar periksa sepuluh butir v3

| # | Butir | 01 | 03 |
|---|---|---|---|
| 1 | Durasi 3 sampai 6 menit, tanpa jeda kosong lebih dari 1,5 detik | ya | ya |
| 2 | Segar-ingat menyebut nomor dan nama konsep sebelumnya | ya | ya |
| 3 | Tiap rumus lahir dari contoh angka yang dihitung di layar | ya | ya |
| 4 | Semua pemicu kata selisih di bawah 0,15 detik | ya (0,050) | ya (0,050) |
| 5 | Subtitle sama dengan `tulis` huruf demi huruf | ya | ya |
| 6 | Lembar kontak dibuka, angka sumbu dibaca, identitas diperiksa | ya | ya |
| 7 | Widget materi yang sama dibuka dan dibandingkan | ya | ya |
| 8 | Klaim angka lolos sympy, urutan istilah lolos | 15 dari 15 | 14 dari 14 |
| 9 | cek_aset_video, cek_layar_kosong, tsc lolos; medan video terpasang | ya | ya |
| 10 | Keputusan yang disengaja ditulis (di bawah) | ya | ya |

Butir 8 arah gagalnya juga dibuktikan untuk video 03: empat klaim yang
sengaja keliru semuanya DITOLAK alatnya, termasuk tebakan naif
(2x + 1) pangkat 6 dibagi 6 yang jadi inti video itu.

## Cacat yang ditemukan dan diperbaiki

Semuanya lolos gerbang otomatis dan baru ketahuan dari MEMBUKA frame atau
dari mengukur di luar render.

**Video 01, empat cacat**
1. Panah f ke f-aksen masuk jalur subtitle (ditangkap `qc.jalur_bawah_kosong`).
2. Label "1 bulan" TERCORET garis laju. Terbukti dengan mengukur jalur
   garisnya: garis itu memang melewati kotak label pada bulan 3,38 sampai
   3,99. Dipindah ke kanan tepi kotak.
3. Rumus (x^2 + x + 7)' menutup angka 6 dan 8 di sumbu tegak. Dipecah jadi
   dua baris dan ujung kanannya dipatok di kiri deretan angka.
4. Label T(0) = 0 menindih angka 1 di sumbu mendatar. Diturunkan ke bawah
   deretan angka itu.

**Video 03, enam cacat**
1 sampai 4. Tiga baris pemeriksaan jawaban dan dua tumpukan contoh menembus
   jalur subtitle. Ditangkap dengan MENGUKUR sebelum render, jadi tidak
   memakan satu siklus render pun.
5. Rumus inti video terbaca "(2x + 1) 5 dx": pangkat 5 tidak terangkat,
   sebab basis dan pangkat ditulis sebagai dua potongan terpisah dan
   potongan r"^5" sendirian membangun pangkat yang tidak menempel apa pun.
6. "+ C" di sebelah pecahan turun sampai sejajar penyebutnya, sehingga
   x^(n+1)/(n+1) + C terbaca seolah C ada DI DALAM penyebut. Sebabnya
   `arrange(aligned_edge=DOWN)`; diganti rata tengah.

Cacat 5 dan 6 keduanya membuat matematika di layar SALAH, bukan sekadar
jelek. Keduanya lolos `cek_kode`, `cek_waktu_adegan`, `cek_pemicu_urut`,
`qc.periksa_adegan`, dan `cek_layar_kosong`. Yang menangkap keduanya cuma
membuka frame dan membacanya.

## Pelajaran gerbang, mahal (tiga render terbuang)

`qc.periksa_adegan` dengan daftar `pasangan` mengadu KOTAK BATAS. Untuk
garis diagonal panjang dan untuk kelompok angka sumbu, kotak batasnya
menutupi hampir seluruh bidang, jadi ia menuduh bertindih benda yang
gambarnya baik-baik saja. Saya menambahkan pasangan seperti itu dan
menggagalkan tiga render berturut-turut pada tata letak yang benar.

Yang BENAR sudah ada sejak 7 September, dibuat sesi Turunan: parameter
`tulisan=`, yang mengadu tiap angka sumbu satu per satu. Saya tidak
memakainya karena tidak membaca docstringnya lebih dulu.

Untuk label lawan GARIS, tidak ada gerbangnya sama sekali. Yang menangkap
adalah menghitung titik garisnya di luar render lalu memeriksa apakah ada
yang jatuh di dalam kotak label. Usul untuk MASTER: pemeriksa jarak kotak
ke RUAS garis, bukan ke kotak batasnya, pantas masuk `gl/qc.py`.

## Cara kerja yang terbukti murah

Mengukur tata letak di luar render (membangun bendanya dengan manimlib,
mencetak kotak batasnya, mengadu lawan jalur subtitle dan lawan angka
sumbu) memakan beberapa detik. Satu render 480p tiga menit. Video 03
ditangkap empat cacat tata letaknya dengan cara ini SEBELUM render
pertama, dan render pertamanya langsung lolos.

## Keputusan yang disengaja

| Keputusan | Alasan |
|---|---|
| Video 01 tanpa pembuka 3D, padahal video pertama topik | Kerangka wajib v3 memberikan detik pembuka kepada pertanyaan dan segar-ingat yang seluruhnya 2D; narasinya sudah 350 detik dari batas 360; dan menyisipkan benda 3D di antara dua bidang datar menghidupkan lagi kelas cacat "dua gambar bertumpuk". Kalau ARYA menghendakinya, tempatnya babak `cerita`. |
| Video 01 memakai tiga panggung terpisah 11 satuan, kamera terbang | Versi v2 menukar dua bidang di TEMPAT YANG SAMA dan menghasilkan dua sistem koordinat bertumpuk tiga detik. Memisahkan panggungnya membuat cacat itu mustahil. |
| Video 01 skala kedua sumbunya tidak sama | Mendatar bulan, tegak juta per bulan: besaran berbeda satuan. Video ini tidak pernah meminta mata membandingkan kemiringan. |
| Video 03 tanpa bidang koordinat sama sekali | Isinya seluruhnya aljabar lapisan. Memaksakan bidang koordinat memberi gambar yang tidak pernah dipakai. |
| Video 03 memakai tiga busur tanpa sumbu untuk "+ C" | Yang perlu terlihat cuma "bentuknya sama, tingginya beda". Sumbu bernomor akan meminta mata membaca angka yang tidak pernah disebut narator. |
| Render 480p dulu, 1080p60 ditahan | STANDAR v3 menyuruh langsung 1080p60. Saya menyimpang karena ARYA membuat gerbang tinjauan: 1080p60 untuk 350 detik memakan sekitar 80 sampai 100 menit per video, dan merendernya sebelum ARYA setuju berarti membuangnya kalau ada revisi. 1080p menyusul sesudah ARYA menyetujui. |
| Panel video 03 sampai sepuluh baris sebelum dibersihkan | Sudah diperiksa pada frame penuh detik 200: sepuluh baris masih terbaca di 480p, tidak bertindih, dan tetap di dalam zonanya. |

## Yang perlu diketahui ARYA

- Situs BELUM bisa memutar kedua video. Itu memang begitu: yang disalin ke
  `web/public/anim/` hanya versi 1080p final yang sudah disetujui, dan versi
  uji 480p sengaja tidak disalin supaya situs tidak menayangkan video yang
  belum ARYA setujui. Halamannya menampilkan "Videonya belum bisa diputar".
- Berkas tugas `docs/tugas/MATRA-INTEGRAL.md` tidak ada. Bagian gelombang 4
  untuk sesi ini ada di `docs/tugas/MANTRA-TURUNAN-INTEGRAL.md`, dan itu yang
  saya pakai.
- Video 01 masih menyisakan 10 babak yang layarnya diam lebih dari 60 persen
  durasi narasinya (turun dari 26 babak). Video 03 nol. Kalau ARYA merasa
  video 01 terlalu banyak berhenti, sisanya bisa saya kerjakan dengan cara
  yang sama.

## Berikutnya

Menunggu ARYA menonton kedua video di `UNTUK ARYA\CEK 480P`. Video ketiga
daftar gelombang 4 (Integral Materi 05, jumlahan Riemann) belum disentuh.
