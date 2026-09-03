# Laporan MATRA-STATISTIKA
Terakhir: 4 September 2026 pagi. **Bagian terbaru di paling atas** (permintaan MASTER).

> **SIAP GABUNG.** TIGA BELAS video dari tiga belas tahap selesai di 480p, dan
> sepuluh di antaranya sudah dirapikan tata letaknya sesudah koreksi MASTER.
> Cabang `sesi/statistika`, pohon kerja bersih, sudah disinkronkan dengan
> `master` c223dc9. Berkas tampilan yang dibekukan MASTER tidak satu pun
> disentuh; yang berubah `manim/`, `web/public/anim/*.vtt`, dan dua perbaikan
> berkas bersama `manim/gl/ilustrasi.py` yang masing-masing jadi commit sendiri.

---

# 4 September 2026: tata letak dirapikan, dan satu kesalahan baca yang saya buat

## Kesalahan saya, dan MASTER yang menemukannya

Saya mengira jalur panel memesan SELURUH pita atas layar, jadi saya mengunci
dunia di bawah layar y = 1,10 dan menulis di laporan bahwa "dunia cuma boleh
46 persen tinggi layar, itu harga tata letak versi 2". **Itu salah, dan saya
mengarangnya sendiri.** Tidak ada di kode maupun di standar.

Yang sebenarnya dipesan cuma DUA POJOK: identitas di kiri (layar x < -2,1) dan
papan rumus di kanan (x > 2,1). Tengah atas bebas, dan `qc.periksa_adegan`
memang cuma memeriksa tabrakan NYATA, bukan kotak yang dipesan. Saya memeriksa
sendiri kode `qc` sesudah MASTER mengoreksi: tidak ada satu baris pun yang
membatasi tinggi dunia.

Akibatnya semua adegan saya menyisakan sepertiga atas layar kosong dan bendanya
mungil. MASTER menemukannya lewat lembar kontak Materi 06 ("garis bilangan tipis
di tengah layar yang hampir kosong, orang-orangnya mungil").

## Yang dirapikan

| Materi | Yang diubah |
|---|---|
| 01 | tumpukan titik 0,20 jadi 0,28, titik 0,078 jadi 0,105, angka sumbu 20 jadi 25, kamera turun ke 0,30 |
| 02 | tinggi per siswa 0,180 jadi 0,245 |
| 03 | tinggi per siswa 0,100 jadi 0,135, kotak contoh gabung kelas 0,13 jadi 0,175 |
| 04 | tinggi per siswa 0,050 jadi 0,072, batang rata 2,00 jadi 2,85 |
| 06 | orang 1,00 jadi 1,70, penggaris 0,42x0,05 jadi 0,70x0,10, kamera turun ke 0,35, pembuka jadi datar penuh |
| 07 | titik naik ke 0,34, tumpukan 0,30, kotak boxplot 0,46 jadi 0,60, kurung jangkauan biasa naik ke 1,55 |
| 10, 11, 12 | satu satuan nilai 0,0647 jadi 0,0880; parabola 12 dari 0,205 jadi 0,280; skala jauh 11 dari 0,0164 jadi 0,0223 |
| 13 | langit-langit 1,42 jadi 2,10 |

Materi 11 juga mendapat perbaikan yang diusulkan MASTER: kamera didekatkan dari
6,4 ke 4,8 selama empat babak residu, jadi residu terbesar naik dari 15 piksel
ke 32 piksel. Sumbu dan kelompok garis tebakan dilepas dari daftar periksa DI
BABAK ITU SAJA, dan garis yang masih terlihat didaftarkan menggantikannya, jadi
tidak ada benda yang lolos periksa diam-diam.

Materi 06 pembukanya dibuat datar penuh (phi 90 sejak frame pertama). Pembuka
miring cuma boleh di video pertama topik, dan video pertama Statistika adalah
Materi 01, yang memang datar.

## Tiga yang DIBIARKAN, dengan alasan

1. **Materi 05, alasan struktural, sudah disetujui ARYA.** Dicoba dua kali dan
   ditolak gerbang dua kali: orang 1,85 memberi irisan 0,21 x 0,33 dengan papan
   temuan, lalu 1,60 dengan kamera dinaikkan justru memberi irisan 0,17 x 0,82.
   Sebabnya bukan angka: siswa membentang selebar layar sampai ke pojok kanan,
   sementara papan temuan Materi 05 TUMBUH ke bawah sepanjang video. Siswa yang
   lebih tinggi pasti menabraknya, dan menaikkan kamera untuk menghindarinya
   mendorong angka sumbu masuk jalur subtitle. Membesarkannya berarti merombak
   panggung, bukan merapikan tata letak. MASTER menyetujui dibiarkan.
2. **Materi 08 dan 09 dibiarkan atas keputusan MASTER.** Materi 08 sudah
   merentang 3,45 satuan; Materi 09 batangnya sampai layar y 2,08 dan MASTER
   menyebutnya acuan komposisi. Mengubah yang sudah benar hanya berisiko.
3. **Pembuka miring Materi 05 dan 08 dibiarkan, pengecualian dengan persetujuan
   ARYA.** Keduanya sudah disetujui sebelum Materi 01 ada, isinya bekerja
   (jungkat-jungkit dan botol, bukan lapangan kosong), dan 8 sampai 10 detik
   masih dalam batas pembuka yang bermakna.

## Jebakan gerbang yang ditemukan hari ini

**Kotak batas sebuah KELOMPOK adalah gabungan seluruh anggotanya.** Materi 11
ditolak dengan "papan rumus menindih sumbu, irisan 1,48 x 0,32" padahal tidak
ada satu garis pun yang bersentuhan: sumbu mendatar dan sumbu tegak saya
daftarkan sebagai satu kelompok, dan kotak batas kelompok itu sebesar seluruh
bidang grafik, jadi panel di pojok kanan atas dianggap masuk ke dalamnya.

Perbaikannya tidak butuh mekanisme baru: sumbu didaftarkan sebagai DUA benda
pipih, pita mendatar di bawah dan pita tegak di kiri. Diterapkan juga ke Materi
10 dan 12 yang berpola sama dan lolos tipis. MASTER menjadikannya cara baku
untuk sumbu polos; `alas_hud` + tanda `latar` tetap untuk tulisan yang memang
harus menumpang di atas kisi.

## Perkakas bersama yang bertambah

- `qc.periksa_adegan(..., tulisan=...)` sudah resmi (MASTER, dari usul sesi ini
  dan sesi Ruang 3D). Sepuluh adegan Statistika dipindahkan dari kamus `TULISAN`
  buatan sendiri ke parameter itu. Materi 05 dan 08 tidak punya `TULISAN` sebab
  dibuat sebelum pola itu ada.
- `ilustrasi.tumbuh_batang` dinaikkan ke berkas bersama (commit tersendiri):
  batang tumbuh dari alasnya. `GrowFromEdge` bawaan butuh argumen tepi dan
  tepinya di bidang xy, sedangkan batang adegan MATRA berdiri di sumbu z, jadi
  ia gagal lewat `LaggedStartMap`.
- `ilustrasi.orang` berkaki bersih (commit 8e464e8, 3 Sep) sudah dipakai semua sesi.

## Yang masih tersisa sesudah dirapikan

1. Materi 07 masih menyisakan sekitar sepertiga atas layar kosong pada babak
   awal; ruang itu baru terpakai di babak `jak` oleh kurung jangkauan biasa.
   Menaikkannya lagi akan mendorong kurung itu ke jalur panel.
2. Panel Materi 10 menulis "arah, kekuatan" sampai babak penutup. Kalimatnya
   tetap benar, jadi basi tetapi tidak membantah gambarnya.
3. Materi 03 babak `salah` menyisakan sekitar 6 detik tanpa animasi baru.
4. `alat/cek_sinkron_video.py` versi rona sudah masuk master c223dc9 dan belum
   saya pakai; sinkron sementara dijaga lewat `sinema.babak` dan selisih
   suara-gambar 0,02 sampai 0,24 detik.

---

# Catatan lebih lama, urut mundur

Cabang `sesi/statistika`. Gelombang 1, halaman saja, tanpa video.
Rancangan: `docs/superpowers/specs/2026-09-01-statistika-alur-belajar.md`, sudah
disetujui ARYA.

## Selesai

**Topik Statistika utuh: 13 materi, 13 widget, 4 latihan, bank 32 soal kuis,
dan halaman `/latihan/statistika`.** Cakupannya Kelas 10 Bab 7 dan Kelas 11
Bab 3 secara penuh, ditambah satu materi membaca grafik dengan kritis.
Diperiksa langsung ke kedua buku panduan guru, bukan ditebak.

**Dua alat pemeriksa angka, dibuat sebelum satu angka pun ditulis.**
- `alat/cek_statistik.py` menghitung dengan pecahan eksak, bukan desimal.
  Cara kuartilnya mengikuti kurikulum, diverifikasi dari Buku Guru Kelas X
  halaman 227 sampai 228, dan kedua contoh buku itu dipasang sebagai uji-diri.
  Uji diri lolos 13 dari 13.
- `alat/cek_statistik_web.mjs` menjalankan berkas TypeScript situs di Node lalu
  membandingkan hasilnya dengan data dan klaim yang sama. Gunanya menutup celah
  yang tidak bisa ditutup pemeriksa Python: widget menghitung ulang sendiri saat
  siswa menyeret titik, dan hitungan itu ditulis dalam bahasa lain.

**146 angka lolos di KEDUA pemeriksa, dari 28 kumpulan data.**

**Semua data buatan, dan tiap halaman menyatakannya buatan**, lewat satu fungsi
bersama supaya tidak ada halaman yang lupa.

**Palet kategori lolos validator `dataviz`.** Percobaan pertama gagal dan itu
berguna: hijau situs terbaca abu-abu, dan pasangan hijau dengan oker hanya
berjarak 5,0 bagi penderita protanopia. Palet akhir berakar dari Okabe-Ito
dengan biru proyek. Dua peringatan yang tersisa dibayar dengan label langsung di
tiap potongan plus tabel angka, bukan diabaikan.

**Ketiga belas widget bisa diseret DAN bisa dijalankan dengan papan ketik.**
Titik yang bisa ditarik juga bisa disasar lewat Tab lalu digerakkan tombol
panah. Ini diuji, bukan diasumsikan.

### Pemeriksaan yang dijalankan dan hasilnya

| Pemeriksaan | Hasil |
|---|---|
| `node node_modules/typescript/bin/tsc --noEmit` | lolos, exit 0 |
| `node node_modules/eslint/bin/eslint.js .` | bersih, exit 0 |
| `node node_modules/next/dist/bin/next build` | lolos, 15 halaman |
| `python alat/cek_statistik.py` | 146 angka cocok |
| `node alat/cek_statistik_web.mjs` | 146 angka cocok |
| Potret layar 1366 piksel, tiap materi | dibuka dan dinilai satu per satu |
| Potret layar 375 piksel | terhalang, lihat butir 3 di bawah |

### Cacat yang ditemukan dengan MELIHAT potret layar

Semuanya lolos dari log tanpa satu pun galat, dan tidak ada yang bisa ditemukan
tanpa membuka gambarnya.

| Materi | Cacat | Sebabnya |
|---|---|---|
| 02 | label kategori dua baris menabrak judul sumbu | ruang tepi bawah kurang untuk nama sepanjang "Sepeda motor" |
| 03 | angka batas kelas bertumpuk tak terbaca pada lebar kelas 1 | sumbu digambar DUA KALI, oleh bingkai dan oleh widget |
| 03 | teks menjanjikan tiga batang pada lebar 10, nyatanya empat | tidak dicocokkan dengan gambarnya |
| 05 | sepertiga atas bingkai kosong melompong | papan ditaruh terlalu bawah |
| 05 | teks menjanjikan penanda modus, gambarnya tidak punya | tidak dicocokkan dengan gambarnya |
| 06 | sembilan titik gaji karyawan menggumpal jadi satu noda | penumpukan cuma berlaku untuk nilai yang sama persis, padahal sembilan gaji itu cuma memakai 14 piksel |
| 06 | label rata-rata menembus tumpukan titik | letaknya setinggi tumpukan |
| 06 | label median duduk di atas angka nol pada sumbu | jarak label tidak bisa diatur |
| 07 | ujung kumis diberi label "maks 35" padahal nilai terbesarnya 60 | ujung kumis dan maksimum dianggap sama |
| 08 | garis simpangan tidak pernah terlihat, padahal teksnya menjanjikannya | digambar tepat di atas garis bilangan |
| 09 | dua tulisan bertumpuk, dan label garis menabrak judul sumbu | terlalu banyak tulisan di satu bingkai |
| 12 | peringatan "garis lurus tidak cocok" menimpa titik data | letaknya dipatok, tidak menghindari data |
| 13 | teks menjanjikan tombol, yang dibuat penggeser | tidak dicocokkan dengan alatnya |

Satu cacat lagi ditangkap eslint, bukan mata: diagram lingkaran mengubah
variabel biasa di dalam `map`. Itu larangan React 19 yang SUDAH tercatat di
`PROGRESS.md`, dan saya mengulanginya.

### Kalibrasi soal, dan apa yang didapat

Sesuai aturan proyek, tingkat kesulitan dikalibrasi ke sumber nyata SEBELUM soal
ditulis. Sumbernya soal pengayaan Buku Guru Kelas X halaman 243 sampai 244.

Temuannya berharga: soal tersulit di buku bukan soal hitung-hitungan, melainkan
soal **pengubahan data**. Semua nilai ditambah tetapan, atau dikali tetapan,
lalu ditanya ukuran mana yang berubah dan mana yang tetap. Menambah tetapan
menggeser semua ukuran pemusatan tetapi TIDAK mengubah simpangan baku sama
sekali. Saya tidak akan mengarang jenis soal itu sendiri. Sekarang ada empat di
bank, dan kaidahnya sudah dibuktikan mesin lewat tiga kumpulan data.

## Butuh MASTER

**1. Dua berkas di luar wilayah sesi ini, masing-masing commit tersendiri
supaya gampang ditahan.**

- `bce7eb3` satu baris `siap: true` di `web/content/topik.ts`. Tanpa itu
  `app/topik/[slug]/page.tsx` baris 41 tidak merender halaman topiknya sama
  sekali, jadi kerjaan sesi ini tidak bisa diperiksa dengan mata.
- `3d8d141` berkas baru `web/app/latihan/statistika/page.tsx`. Ini BUKAN
  tambahan yang manis-manis: begitu statistika didaftarkan di `daftar-isi.ts`,
  halaman `/latihan` langsung menampilkan kartu Statistika dengan tombol MULAI
  LATIHAN, dan tombol itu menuju 404. Sudah dibuktikan dengan curl: 404 sebelum
  berkas itu ada, 200 sesudahnya. `DaftarLatihan` menyaring berdasarkan
  `ISI_TOPIK`, bukan berdasarkan tanda `siap`, jadi 404 itu lahir dari
  pendaftaran di wilayah saya sendiri.

**2. `rtk proxy` TIDAK BISA DIPERCAYA, padahal `ATURAN-SEMUA-SESI.md`
mewajibkannya untuk perintah pemeriksaan.** Buktinya:

```
$ rtk proxy "npx tsc --version"
TypeScript: No errors found

$ npx next build
Next.js Build
2 routes (1 static, 1 dynamic)
Time: 1215ms | Errors: 0 | Warnings: 0
```

Baris pertama adalah jawaban untuk pertanyaan VERSI. Baris kedua mengaku
membangun 2 rute dalam 1,2 detik, padahal situs ini punya 15 halaman. Keduanya
keluaran palsu. Yang saya pakai:

```
node node_modules/typescript/bin/tsc --noEmit
node node_modules/eslint/bin/eslint.js .
node node_modules/next/dist/bin/next build
```

Dan tsc saya buktikan benar-benar memeriksa: saya taruh kesalahan tipe sengaja,
ia dilaporkan dengan exit 2, lalu dihapus lagi dan exit 0. Sarannya: ubah aturan
sesi, sebutkan pemanggilan langsung. Menyuruh lima sesi memercayai pembungkus
yang menipu itu berbahaya.

**3. Tampilan 375 piksel rusak di SELURUH situs, bukan cuma topik saya.**
Saya potret `/topik/limit` pada lebar yang sama sebagai pembanding: teks keluar
tepi kanan, panel kendali kiri menimpa kolom kanan, baris tab hilang. Rusaknya
sama persis di kedua topik, jadi ini bawaan tata letak bersama, wilayah
MATRA-DESAIN-UI-UX. Saya tidak menyentuhnya. Akibatnya: syarat "potret 375 sudah
dinilai" belum bisa dipenuhi secara berarti sampai sesi UI/UX selesai. Satu hal
yang memang milik saya dan perlu diperiksa ulang setelah itu: tabel banding di
Materi 01 punya TIGA kolom, lebih lebar daripada tabel dua kolom yang dipakai
topik lain.

**4. `playwright-cli` DIPAKAI BERSAMA antar sesi, dan itu berbahaya.**
Tanpa nama sesi, semua worktree memakai satu browser yang sama. Potret saya
sempat tersimpan ke `..\matra-vektor\.playwright-cli\`, dan sebaliknya sesi lain
bisa menggeser halaman yang sedang saya periksa tanpa saya sadari. Foldernya
diabaikan git di sana, jadi tidak saya sentuh. Perbaikannya sepele dan sebaiknya
masuk aturan sesi:

```
playwright-cli -s=<nama-sesi> open <url>
```

**5. Usul, bukan permintaan.** `components/widget/limit/koordinat.ts` dan
`components/widget/statistika/skala.ts` berbagi sekitar enam puluh baris yang
sama. Saya menulis ulang, tidak mengimpor, sebab folder Limit bukan wilayah saya
dan mengimpornya membuat topik ini ikut rusak kalau folder itu dirapikan. Kalau
ada topik keempat yang butuh hal sama, naikkan bagian yang berulang jadi alat
bersama.

**6. Amatan kecil.** Baris tab materi memang tergulir (`overflow-x: auto`,
lebar isi 1325 lawan 788 pada layar 1366), jadi tidak ada yang terpotong. Tetapi
tanpa tanda apa pun bahwa ia bisa digulir, siswa mudah mengira materinya cuma
sembilan. Dengan 13 materi ini lebih terasa daripada di topik lain.

**7. Jebakan Windows kena lagi.** `papan.ts` dan `Papan.tsx` dianggap berkas
yang sama oleh Windows, dan TypeScript menolak keduanya. Sudah tercatat di
`PROGRESS.md` untuk pasangan `bidang.ts` dan `Bidang.tsx`. Berkas saya diganti
nama jadi `skala.ts`.

## Butuh keputusan ARYA

**1. Data BPS.** Semua data topik ini buatan, dan tiap halaman menyatakannya
buatan. Itu jujur dan nol risiko. Kalau ARYA ingin data Indonesia yang
sungguhan, saya perlu mengambilnya dari web dan itu permintaan terpisah. Paling
cocok dipasang di Materi 10 dan Materi 13.

**2. Materi matematika belum diperiksa mata ARYA.** Angkanya sudah diperiksa
mesin dua kali, tetapi ketepatan bahasa dan tingkat kesulitannya untuk siswa SMA
tetap butuh ARYA. Yang paling perlu dilihat: Materi 09 (rumus interpolasi data
berkelompok) dan delapan soal tingkat "sangat sulit" di bank kuis, apakah
terlalu berat.

**3. Cara meninjau.** Dev server sesi ini berjalan di port 3003:
`http://localhost:3003/topik/statistika`. Kalau jendelanya sudah tertutup,
hidupkan lagi dengan `cd web && npm run dev -- -p 3003`.

---

# 2 September 2026: gelombang 2

## Potret 375 piksel, dibuka dan dinilai

Diminta MASTER setelah perbaikan HP dari sesi UI/UX masuk ke cabang saya.

**Tampilan HP topik Statistika sudah benar.** `document.scrollWidth` sama
dengan `clientWidth`, 375 lawan 375, jadi nol luapan mendatar. Satu-satunya
elemen yang keluar tepi adalah tombol MATERI 05 ke atas di dalam baris tab,
dan baris itu memang bergulir menyamping dengan sengaja.

**Tabel tiga kolom Materi 01, yang dikhawatirkan, AMAN.** Ketiga kolomnya muat
utuh, angka rata kanan, kolom "Kelas B" berhenti 16 piksel sebelum tepi layar.

**Dua cacat yang saya temukan sendiri, dan sudah diperbaiki.** Keduanya hanya
muncul di lebar HP dan tidak menghasilkan galat apa pun di log.

| Materi | Cacat | Perbaikan |
|---|---|---|
| 01 | lencana "INTERAKTIF" menutupi separuh atas "Kelas A, tidak bisa digeser" | baris teks turun dari y 20 ke y 42 |
| 05 | lencana yang sama menutupi kata "sei" pada "seimbang, penopangnya tepat di rata-rata" | baris teks turun dari y 22 ke y 42 |

Sebabnya satu: di layar lebar SVG membesar sehingga baris itu jatuh di bawah
lencana, di 375 piksel SVG mengecil dan baris itu naik ke belakang lencana.
Jarak sekarang 12 piksel, diukur ulang di peramban.

Cacat ketiga muncul belakangan di Materi 09 setelah widgetnya diberi kendali
tambahan, dan itu membuka sebab yang lebih dalam: **seberapa jauh lencana masuk
ke dalam papan berubah-ubah menurut banyaknya baris kendali sebuah widget.**
Papan yang kendalinya banyak menyusut sampai batas, dan tepi atasnya lalu
persis di bawah lencana. Karena itu keterangan papan sekarang digambar MASUK ke
dalam bingkai dengan halo krem, berlaku untuk kelima widget yang memakainya,
bukan ditambal satu per satu.

## Revisi isi yang diminta MASTER

| Permintaan | Status |
|---|---|
| Huruf x sebagai tanda kali diganti | selesai, 24 tempat, jadi tanda kali sungguhan |
| Tahap 9 dilengkapi, tidak dipecah | selesai, lihat di bawah |
| "line plot (diagram titik)" sekali | selesai, di judul sesi saat pertama muncul |
| Data BPS: tetap data buatan yang jujur | diterima, tidak ada pengambilan data web |
| Kata "mudah", "gampang", "jelas" | selesai, 13 tempat |

**Tahap 9.** Ditambah paragraf pemanggil ulang sebelum sesi modus, dan `coba`
kedua khusus modus. Supaya `coba` itu benar-benar bisa dikerjakan, widget
`DataKelompok` diberi dua penggeser frekuensi tetangga dan penanda modus di
dalam batang tertinggi. Tiga angka yang dijanjikan teksnya saya jalankan
sendiri di peramban dan cocok: tetangga kanan 11 memberi modus 67,5, kedua
tetangga sama memberi 64,5, tetangga kanan 0 memberi 60,27. Ketiganya lalu
ditambahkan ke `data.json` supaya ikut diperiksa dua pemeriksa, bukan cuma
dilihat sekali. **Sekarang 152 angka, dua-duanya lolos.**

Kata "jelas" yang tersisa sengaja dibiarkan: "pemotongan itu DIBERITAHUKAN
dengan jelas" di Tahap 13 dan kata "menjelaskan" di beberapa tempat. Keduanya
bukan penilaian atas tugas siswa.

## Daftar periksa STANDAR-MENGAJAR bagian 6, per tahap

Butir: 1 pertanyaan pembuka belum terjawab sebelumnya · 2 ada pemanggil ulang ·
3 benda sebelum lambang · 4 satu sesi satu ide · 5 istilah baru diberi arti ·
6 contoh prosedur beralasan per baris · 7 ada `coba` berpenuntun · 8
`seringKeliru` menjelaskan kenapa menggoda · 9 `intisari` hanya yang dibahas ·
10 bersih dari kata terlarang dan em-dash.

| Tahap | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 Satu angka bisa menipu | ya | ya | ya | ya | ya | n/b | ya | ya | ya | ya |
| 2 Daftar angka jadi gambar | ya | ya | ya | ya | ya | n/b | ya | ya | ya | ya |
| 3 Lebar kelas | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 4 Dua kelompok beda jumlah | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 5 Mean, median, modus | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 6 Pencilan | ya | ya | ya | ya | ya | n/b | ya | ya | ya | ya |
| 7 Kuartil dan boxplot | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 8 Simpangan baku | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 9 Data berkelompok | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 10 Diagram pencar | ya | ya | ya | ya | ya | n/b | ya | ya | ya | ya |
| 11 Garis regresi | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 12 Korelasi bukan sebab | ya | ya | ya | ya | ya | n/b | ya | ya | ya | ya |
| 13 Grafik menyesatkan | ya | ya | ya | ya | ya | n/b | ya | ya | ya | ya |

"n/b" pada butir 6 berarti tidak berlaku: tahap itu bukan tahap prosedur.
Tahap prosedurnya ada enam: 3, 4, 5, 7, 8, 9, 11.

**Empat butir "tidak" ditemukan saat mengisi daftar ini, dan semuanya sudah
diperbaiki sebelum tabel di atas ditulis.** Daftar periksa ini memang menangkap
hal yang tidak tertangkap mata:

| Temuan | Butir | Perbaikan |
|---|---|---|
| Tahap 6 satu-satunya tahap tanpa kalimat pemanggil ulang | 2 | dibuka dengan menagih kembali bukti Tahap 5, bahwa mean titik seimbang, sebab sifat itu juga yang membuatnya bisa diseret pencilan |
| Tahap 9 contoh mean berkelompok cuma enam baris perkalian tanpa keterangan | 6 | diberi baris pembuka "banyak siswa kali titik tengah kelasnya" |
| Tahap 11 contoh rumus regresi melompat dari daftar jumlah ke rumus b lalu ke rumus a | 6 | diberi tiga baris penanda tahap |
| Tahap 7 `seringKeliru` langsung membantah tanpa menyebut kenapa keliru itu menggoda | 8 | ditambah: godaannya datang dari histogram, di sana batang lebih besar memang berarti data lebih banyak |

Satu lagi yang setengah lolos dan sudah ditutup: mean, median, dan modus
muncul di Tahap 1 sebagai istilah yang dianggap sudah dikenal dari SMP,
sementara artinya baru dibongkar di Tahap 5 (butir 5). Sekarang Tahap 1 memberi
arti singkat ketiganya sambil menunjuk ke Tahap 5.

## Pemeriksaan yang dijalankan hari ini

| Pemeriksaan | Hasil |
|---|---|
| `node node_modules/typescript/bin/tsc --noEmit` | lolos, exit 0 |
| `node node_modules/eslint/bin/eslint.js` wilayah statistika | bersih, exit 0 |
| `node node_modules/next/dist/bin/next build` | lolos, 19 halaman |
| `python alat/cek_statistik.py` | 152 angka cocok, 31 kumpulan data |
| `node alat/cek_statistik_web.mjs` | 152 angka cocok |
| `python alat/cek_statistik.py --uji-diri` | 13 dari 13 |
| Potret 375 piksel, ketiga belas materi | dibuka dan dinilai satu per satu |
| Tiga langkah `coba` modus Tahap 9 | dijalankan di peramban, angkanya cocok |

**eslint seluruh `web/` GAGAL, tetapi bukan di wilayah saya:**
`components/widget/ruang-3d/Bingkai3D.tsx:139` melanggar `react-hooks/refs`,
"Cannot access refs during render". Sudah saya laporkan ke MASTER untuk
diteruskan ke MATRA-RUANG 3D. Saya tidak menyentuhnya.

## Untuk MASTER

**Lencana "INTERAKTIF" adalah jebakan bersama, bukan cuma masalah saya.** Ia
menumpang di atas pojok kiri atas panel, di atas SVG widget, jadi setiap widget
di SELURUH situs harus mengosongkan kotak kira-kira 110 kali 25 satuan viewBox
di sana. Lebih buruk lagi, seberapa dalam ia masuk berubah menurut tinggi baris
kendali widget, jadi widget yang hari ini aman bisa rusak besok begitu
kendalinya bertambah satu baris. Kalau lencananya diberi latar tak tembus
pandang atau dipindah ke luar panel, kelima topik aman sekaligus.

## Berikutnya

Video 480p, urut prioritas di file tugas. Video pertama selesai, lihat bagian
di bawah.

---

# Video 1 dari 6: Tahap 5, jungkat-jungkit (ManimGL)

Berkas: `media/uji-480p/statistika5-pemusatan.mp4`, 123,3 detik, 480p, narasi
tergabung. Adegan `manim/scenes/statistika5_pemusatan.py`, naskah
`manim/narasi/statistika5-pemusatan.json`, storyboard
`docs/superpowers/specs/2026-09-02-statistika-video-5-storyboard.md`.

## Gagasan videonya

Halaman Tahap 5 sudah membuktikan mean adalah titik seimbang lewat widget yang
bisa digeser. Yang TIDAK bisa dilakukan halaman: memperlihatkan papan itu
benar-benar jatuh ke satu sisi karena beban. Itu pekerjaan video, dan itulah
seluruh isinya. Rumus mean sengaja ditahan sampai babak kesepuluh, setelah
papannya mendatar sendiri di angka 7.

Modus tidak diberi warna, tetapi ditandai BENTUK: siswa yang nilainya sama
berdiri berjajar ke belakang, jadi barisan 7 dan 8 terlihat paling tebal.
Dengan begitu tiga warna cukup untuk tiga peran, dan aturan satu warna satu
makna tetap utuh: biru data, bata mean, ungu median.

## Daftar periksa STANDAR-ILUSTRASI-VIDEO.md

| Butir | Nilai |
|---|---|
| Benda nyata dari `gl.ilustrasi`, tidak ada benda berupa titik atau garis | ya. Delapan `orang`, papan `balok`, tumpuan `penopang`, lantai `tanah` |
| Latar hidup dan updater menjaga dunia bergerak saat diam | ya. Tiap siswa bernapas lewat updater yang tetap jalan selama jeda |
| Kamera mulai dari dunia, satu gerakan panjang, tidak ada sentakan | ya. Lima gerakan di lima babak berbeda, terpendek 2,4 detik, tidak ada potongan mendadak |
| Panah dan label di dunia, rumus di HUD, gambar tidak pernah diganti layar kosong | ya. Tidak ada satu pun babak berisi rumus di layar kosong |
| Satu warna satu makna, tidak ada kode heksa di adegan | ya, SETELAH diperbaiki. Lihat cacat nomor 8 di bawah |
| `teks()` untuk kata, `rumus()` untuk angka | ya. Tidak ada satuan di video ini, jadi `\mathrm` tidak terpakai |
| Semua animasi di dalam `sinema.babak`, jeda setelah pertanyaan, tidak ada waktu mati | ya dengan catatan. Tiap babak menyisakan 2 sampai 4 detik yang isinya cuma napas siswa. Bukan layar beku, tetapi juga bukan babak yang penuh |
| `cek_kode` bersih, `periksa_adegan` tiap babak, lembar kontak dibuka, `gabung_audio --uji` jalan | ya. `cek_kode --dalam` bersih, sebelas `periksa_adegan`, lembar kontak 124 frame dibuka dua kali, selisih suara dan gambar 0,15 detik |
| Cacat yang tersisa disebut di laporan | ya, di bawah |

## Enam render, dan apa yang ditemukan tiap kali

**Render 1 MATI di tengah, dan exit code-nya tetap 0.** `lantai_kisi` dengan
`tinggi_z = 0` membuat `ThreeDAxes` membagi nol. Kalau saya percaya kode keluar,
saya akan melaporkan video yang tidak pernah jadi. Ini bukti kedua bulan ini
bahwa "Rendered" bukan bukti apa-apa.

**Render 2 ditolak gerbang waktu `sinema.babak`:** saya memakai durasi naskah
sebelum dipangkas, jadi animasi babak `sapa` 13,0 detik sedangkan narasinya
9,26 detik. Gerbangnya bekerja persis seperti seharusnya.

**Render 3 sampai 6: sembilan cacat, semuanya cuma terlihat dengan MEMBUKA
lembar kontak.** Tidak satu pun muncul sebagai galat.

| # | Cacat | Perbaikan |
|---|---|---|
| 1 | kamera terlalu jauh, isi cuma memenuhi sepertiga tengah bingkai | tinggi bingkai 8,4 turun ke 6,4 dan pusatnya dinaikkan |
| 2 | panah simpangan melayang tanpa penghubung ke siswa pemiliknya | tiap panah diberi tali putus tegak ke kepala pemiliknya |
| 3 | label modus menabrak angka 7, 8, 9 di lantai | kurung dan labelnya dipindah ke atas kepala |
| 4 | lantai sempit sehingga tepinya terlihat dan terbaca sebagai meja | lantai dibuat 30 kali 18, tepinya di luar bingkai |
| 5 | angka lantai abu di atas garis bilangan abu, nyaris tak terbaca | warnanya jadi TINTA |
| 6 | angka 7 hilang di balik penopang, tepat pada momen terpenting video | penopang diramping dari 0,9 x 1,3 jadi 0,7 x 0,85 |
| 7 | siswa tidak segaris dengan angkanya | angka didekatkan dari y -1,75 ke -1,15; kamera memandang agak dari atas, jadi angka yang lebih dekat tergeser ke tepi |
| 8 | `Indicate` bawaan ManimGL mewarnai siswa KUNING dan HIJAU | `color=` disebut tegas: TINTA untuk modus, SOROT untuk median |
| 9 | keterangan babak sebelumnya bertahan selama tumpuan bergeser, membantah gambarnya | keterangan babak `geser` dipasang di AWAL babak, bukan di akhir |

Dua lagi yang lebih halus dan ikut diperbaiki: satu frame kosong saat judul
memudar (papan sekarang sudah ada sejak frame pertama), dan putaran kamera
penutup 16 derajat yang membuat papan yang SEIMBANG terlihat miring, persis
membantah kalimat penutupnya (diturunkan jadi 6 derajat).

Cacat nomor 8 layak diingat semua sesi: **`Indicate` tanpa `color=` memakai
kuning**, warna di luar palet Studio Teknis. `cek_kode` tidak menangkapnya
sebab ia hanya mencari kode heksa yang ditulis langsung.

## Cacat yang TERSISA, disebut bukan didiamkan

**Panah ManimGL meruncing ke pangkal.** Akibatnya pangkal panah terpanjang, si
4 yang berangkat dari nilai 11, nyaris tak terlihat di 480p: yang terbaca cuma
paruh dekat kepalanya. Geometrinya benar, sudah saya buktikan terpisah bahwa
panahnya membentang penuh 0 sampai 4 satuan. Artinya di 1080p ia akan jauh
lebih baik. Kalau ARYA tetap ingin pangkalnya tegas, penyelesaiannya memakai
garis biasa plus kepala panah terpisah, dan itu perubahan kecil.

**Tiap babak menyisakan 2 sampai 4 detik tanpa animasi baru.** Layarnya tidak
beku (siswa terus bernapas), tetapi juga tidak berkembang. Sebabnya narasi
saya lebih panjang daripada gerak yang saya rancang. Untuk video berikutnya
saya akan merancang gerak dulu, baru menulis narasi sepanjang geraknya.

## Yang perlu diketahui MASTER

Berkas tugas saya masih menulis perintah render lama di baris terakhir bagian
Video: `python alat/antre_render.py matra-statistika -- manim -ql ...`. Itu
bertentangan dengan aturan baru (ManimGL, `manimgl ... -w -l`, antrean tidak
wajib). Saya mengikuti aturan yang baru. Baris itu sebaiknya diperbarui supaya
sesi lain tidak tertipu.

Satu benda baru saya tambahkan ke berkas bersama `manim/gl/ilustrasi.py`:
`penopang()`, prisma segitiga untuk tumpuan jungkat-jungkit. Dibuat sebagai
commit tersendiri (`0d39981`) supaya gampang ditahan. Balok biasa tidak terbaca
sebagai tumpuan, dan seluruh gagasan video ini ada pada papan yang bisa jatuh.

## Berikutnya

Video kedua: Tahap 8, simpangan baku, empat langkah dengan persegi yang tumbuh
kuadrat. Belum dimulai.

---

# Tinjauan ARYA atas video Tahap 5, dan tiga temuan untuk SEMUA sesi

Ditulis 2 September 2026 malam, setelah ARYA menonton render keenam dan
render ketujuh. Bagian ini yang paling perlu dibaca MASTER.

## 1. "3D ini membuat siswa jadi bingung" (ARYA), dan ARYA benar

Kalimat lengkapnya: *"videonya tidak terlalu jelas terutama perbedaan selisih
antara kelompok nilai 5 dengan nilai 7. Itu saya lihat gambarnya pecah, tidak
jelas"*, ditambah *"kalau misal tidak perlu 3D juga ga masalah, tidak perlu
dipaksakan yang penting pesan ke siswanya tersampaikan"*.

Yang saya lewatkan, dan sekarang saya anggap kaidah: **kalau isi sebuah adegan
adalah MEMBANDINGKAN PANJANG, sudut pandang miring merusaknya.** Pada sudut
miring, jarak yang sama panjang di dunia digambar tidak sama panjang di layar.
Saya meminta siswa membandingkan sesuatu yang gambarnya sendiri sudah
menyimpangkannya. Itu bukan sekadar kurang enak dilihat, itu keliru.

Tiga perubahan, dan bendanya TETAP 3D bercahaya:
1. Kamera hampir sejajar tanah (phi 85, theta 0) sepanjang bagian yang harus
   dibaca. Satu satuan nilai = satu jarak layar yang sama di mana pun.
2. Siswa, angka, papan, dan tumpuan semuanya di y = 0. Sebelumnya angka ada di
   y -1,15 dan siswa terlihat tidak segaris dengan angkanya. Nilai kembar
   digeser 0,17 satuan ke SAMPING, bukan ke belakang.
3. Bukti "enam lawan enam" tidak lagi enam panah tipis di ketinggian berbeda.
   Ketiga jarak kiri dijajarkan jadi SATU batang (3+2+1), ketiga jarak kanan
   jadi batang kedua (1+1+4), berpangkal sama. Sama panjang atau tidak kini
   terlihat sekejap. Ini yang paling menjawab keluhan ARYA.

**Usul untuk STANDAR-ILUSTRASI-VIDEO.md, bagian "Kapan 3D, kapan 2D":**
tambahkan satu kalimat. *"Kalau yang harus dibandingkan siswa adalah PANJANG
atau JARAK, ratakan kameranya. Sudut miring membuat panjang yang sama digambar
tidak sama, dan itu membantah pelajarannya sendiri. Bendanya tetap 3D."*

## 2. Tepi bergerigi BUKAN semata soal 480p: `samples` ManimGL bawaannya 0

ARYA: *"kok masih kurang halus teksturnya ya? masih terlihat kotak-kotak apa
karena masih 480p 30 fps ya?"*

Diperiksa, bukan ditebak. `manimlib/scene/scene.py` menyetel `Scene.samples = 0`,
artinya penghalus tepi MATI. Komentar di `manimlib/camera/camera.py` sendiri
berbunyi *"Although vector graphics handle antialiasing fine without
multisampling, for 3d scenes one might want to set samples to be greater than
0"*, dan `ThreeDScene` bawaannya memang `samples = 4`. **`AdeganMatra` mewarisi
`Scene`, jadi semua adegan MATRA selama ini dirender tanpa penghalus tepi.**

Dipasang `samples = 4` di adegan saya, dan tepi papan yang tadinya bertangga
jadi mulus PADA RESOLUSI YANG SAMA. Jadi jawabannya: sebagian besar bukan 480p,
melainkan setelan yang tidak pernah dinyalakan. Di 1080p pun tanpa ini tetap
bergerigi, hanya lebih halus karena pikselnya lebih kecil. 30 fps tidak ada
hubungannya, itu soal kehalusan gerak.

**Permintaan ke MASTER: pindahkan `samples = 4` ke `AdeganMatra` di
`manim/gl/tema.py`.** Semua sesi langsung menikmatinya, dan tidak perlu ada
yang mengingatnya per adegan. Saya tidak menyentuh berkas itu sendiri karena
milik MASTER. Catatan: `custom_config.yml` BUKAN tempatnya; menaruh `samples`
di bawah `camera:` membuat manimgl gagal dengan "got multiple values for
keyword argument 'samples'". Sudah saya coba dan kembalikan.

## 3. Subtitle: sudah 100 persen, yang kurang adalah cara meninjaunya

ARYA: *"untuk subtitlenya saya minta tampilkan 100%, semua apa yang dikatakan
narator ditampilkan, tidak setengah-setengah."*

Diperiksa mesin: berkas `web/public/anim/statistika5-pemusatan.vtt` memuat
**236 kata, naskahnya juga 236 kata, cocok kata per kata.** Jadi subtitle-nya
memang sudah utuh.

Yang ARYA lihat setengah-setengah adalah `sinema.keterangan`, ringkasan satu
baris di dalam gambar. Sebabnya sederhana: **mp4 uji tidak memuat subtitle sama
sekali**, sebab subtitle dibaca pemutar situs dari berkas vtt terpisah. Saat
meninjau lewat berkas mp4, subtitle itu tidak pernah kelihatan.

Perbaikan: dibuat salinan tinjauan `statistika5-tinjau-bersubtitle.mp4`, video
yang sama ditambah pita krem 86 piksel di bawahnya berisi subtitle penuh.
Gambar aslinya tidak tertutup sedikit pun.

**Usul untuk MASTER:** beri `gabung_audio.py` pilihan `--subtitle` yang membuat
salinan tinjauan seperti ini otomatis. Kalau tidak, setiap sesi akan
menyimpulkan hal yang sama kelirunya: mengira subtitle-nya kurang.

## 4. Subtitle memakai lambang, bukan ejaan

ARYA: *"kalau dibilang tujuh puluh dua maka tulis aja 72, kalau dibilang akar,
ya tulis aja lambang akar."*

Ini bertabrakan dengan STANDAR-MENGAJAR bagian 5 aturan 5, yang mewajibkan
angka DIEJA di naskah supaya mesin suara mengucapkannya seperti guru.
Dua-duanya benar untuk saluran yang berbeda: telinga butuh "lima puluh enam
dibagi delapan", mata jauh lebih cepat menangkap "56 dibagi 8".

Penyelesaiannya satu baris di `manim/buat_subtitle.py` (commit tersendiri
`d0e6377`, berkas bersama, gampang ditahan): `seg.get("tulis") or seg["teks"]`.
Naskah tanpa medan `tulis` berjalan persis seperti sebelumnya. Tujuh segmen
naskah saya sudah diberi `tulis`.

ARYA menegaskan lagi (2 Sep malam) bahwa ini BUKAN cuma soal angka, melainkan
soal LAMBANG matematika: subtitle tidak boleh jadi salinan mentah ucapan.

| Yang diucapkan narator | Yang SALAH ditulis | Yang benar |
|---|---|---|
| "titik dua koma empat" | Titik dua koma empat | Titik (2,4) |
| "f dari x kurang 1" | f dari x kurang 1 | f(x-1) |
| "lima puluh enam dibagi delapan" | lima puluh enam dibagi delapan | 56 : 8 |
| "akar dua" | akar dua | akar 2 atau lambang akarnya |

Ini paling berdampak pada sesi Grafik Fungsi, Vektor, dan Limit, yang naskahnya
penuh notasi fungsi dan koordinat. Berkas vtt menerima Unicode, jadi lambang
seperti akar dan pangkat dua bisa ditulis langsung.

**Permintaan ke MASTER:** kalau setuju, tambahkan aturan 10 di STANDAR-MENGAJAR
bagian 5, dan sebutkan tabel di atas sebagai contohnya supaya sesi lain tidak
menyalin ucapan mentah-mentah.

## Keadaan video Tahap 5 sekarang

Tujuh render. Berkas untuk situs: `media/uji-480p/statistika5-pemusatan.mp4`,
122,4 detik, selisih suara dan gambar 0,14 detik. Salinan tinjauan bersubtitle:
`media/uji-480p/statistika5-tinjau-bersubtitle.mp4`. Subtitle situs:
`web/public/anim/statistika5-pemusatan.vtt`, 35 baris.

Vonis ARYA atas versi datar: *"oke sudah makin bagus lah"*, dan *"sisanya sudah
bagus, silahkan dilanjutkan"*.

Cacat tersisa yang saya sebut sendiri: tiap babak menyisakan 2 sampai 4 detik
tanpa animasi baru, sebab narasi ditulis sebelum geraknya dirancang. Untuk
video kedua urutannya saya balik: rancang gerak dulu, baru tulis narasi
sepanjang gerak itu.

---

# Aturan teks di video: tiga keputusan ARYA untuk SEMUA sesi

Ditetapkan 2 September 2026 malam sesudah ARYA menonton video Materi 05 dan 08,
disepakati lewat brainstorming. **Bagian ini yang paling perlu dibaca MASTER**,
sebab ketiganya mengubah cara semua sesi membuat video, bukan cuma saya.

## 1. Rumus tidak boleh menindih animasinya

ARYA: *"wajib anda perhatikan jika ada rumus yang tertindih dengan animasinya,
maka jangan letakan disana."*

Buktinya panel `B: Sigma = 250` duduk persis di atas garis Mesin B. Yang penting
bukan cacatnya, melainkan KENAPA lolos: `qc.periksa_adegan` cuma memeriksa
pasangan yang saya tuliskan sendiri, dan saya menulis pasangan panel dengan
botol dan dengan angka, tetapi lupa pasangan panel dengan GARIS. Tiga kali
berturut-turut tabrakan lolos dengan pola yang sama.

**Daftar yang ditulis tangan selalu punya lubang.** Karena itu `periksa_adegan`
sekarang menerima `hud=` dan `dunia=` lalu memeriksa SILANG semuanya, dan tiap
adegan memelihara kamus DUNIA dan HUD sepanjang jalan. Tidak ada lagi yang perlu
diingat penulis adegan.

Perkakasnya sudah dipasang di `manim/gl/qc.py` (commit `e5a4774`, berkas bersama,
gampang ditahan). Ia langsung membuktikan dirinya: menolak render Materi 05
dengan pesan "papan temuan menindih bilah kiri", cacat yang dulu baru ketahuan
setelah ARYA menonton.

## 2. Jangan menulis keterangan di bawah layar

ARYA: *"karena sudah ada subtitle, jangan sampai anda menulis ulang keterangan
tambahan lagi dibawah objeknya, karena akan menjadi double makna, membuat siswa
bingung. Atau jangan ditulis dibawah dekat subtitle, pindahkan di kiri atas,
dan bahasanya diubah jadi bentuk matematika. Bila perlu pakai gaya 3B1B dimana
sebelum pernyataan matematika itu muncul, kasitau muncul rumusnya darimana."*

Tiga jalur layar sekarang resmi:

| Jalur | Isi |
|---|---|
| kiri atas | papan rumus yang TUMBUH, isinya matematika bukan kalimat |
| kanan atas | panel angka hasil hitungan |
| bawah | TERLARANG, itu jalur subtitle |

`sinema.PapanRumus` mengerjakannya. Dua cara pakai:
- `tumbuh()` untuk rumus yang membungkus dirinya. Materi 08:
  `x - x-bar` lalu kuadratnya lalu jumlahnya lalu dibagi n lalu akarnya. Tiap
  langkah memakai `TransformMatchingTex`, jadi potongan yang sudah ada BERPINDAH
  dan yang benar-benar baru saja yang tumbuh; mata tidak kehilangan jejak.
  Tiap pertumbuhan diberi dua kata yang menyebut operasinya, lalu memudar.
- `baris()` untuk temuan yang ditumpuk. Materi 05 bukan satu rantai melainkan
  tiga jawaban, jadi papannya menumpuk: modus, median, jumlah simpangan nol,
  baru mean.

`jaga_jalur_bawah=True` di `periksa_adegan` menggagalkan render kalau ada yang
masuk jalur subtitle. Aturan ini ditegakkan mesin, bukan ingatan.

**Akibat yang harus diterima semua sesi:** begitu jalur atas dipesan untuk teks,
dunia harus digeser turun dan sering perlu diperkecil skalanya. Di Materi 08
skala turun dari 0,19 ke 0,17 satuan per ml. Rancang tinggi panggung SEBELUM
menulis adegan.

## 3. Subtitle memakai lambang matematika

ARYA: *"jangan ditulis mentah-mentah, misal ada yang dia bilang titik dua koma
empat, artinya anda harus menulis Titik (2,4). Contoh lain, anda tulis f dari x
kurang 1, yang seharusnya f(x-1)."*

| Yang diucapkan | Yang SALAH ditulis | Yang benar |
|---|---|---|
| "titik dua koma empat" | titik dua koma empat | Titik (2,4) |
| "f dari x kurang 1" | f dari x kurang 1 | f(x-1) |
| "lima puluh enam dibagi delapan" | lima puluh enam dibagi delapan | 56 : 8 |
| "akar lima puluh" | akar lima puluh | akar 50 atau lambangnya |

Perkakasnya medan `tulis` di naskah narasi (commit `d0e6377`). `teks` tetap
dieja untuk mesin suara, `tulis` yang masuk subtitle. **Paling berdampak pada
sesi Grafik Fungsi, Vektor, dan Limit**, yang naskahnya penuh notasi fungsi dan
koordinat.

## Permintaan ke MASTER

1. Tambahkan aturan 10 di `STANDAR-MENGAJAR.md` bagian 5 untuk medan `tulis`,
   dengan tabel di atas sebagai contohnya.
2. Tambahkan tiga jalur layar ke `STANDAR-ILUSTRASI-VIDEO.md`, dan ganti aturan
   yang menyuruh memakai `sinema.keterangan`: sejak ada subtitle, keterangan di
   bawah layar adalah pengulangan.
3. Pindahkan `samples = 4` ke `AdeganMatra` di `manim/gl/tema.py`. Sampai
   sekarang setiap sesi harus mengingatnya sendiri per adegan.
4. Tambahkan satu kalimat di bagian "Kapan 3D, kapan 2D": kalau yang harus
   dibandingkan siswa adalah PANJANG atau LUAS, ratakan kameranya.

## Keadaan dua video sekarang

| | Materi 05 | Materi 08 |
|---|---|---|
| berkas situs | `media/uji-480p/statistika5-pemusatan.mp4` | `statistika8-simpangan.mp4` |
| salinan tinjauan | `statistika5-tinjau.mp4` | `statistika8-tinjau.mp4` |
| subtitle | `web/public/anim/statistika5-pemusatan.vtt` | `statistika8-simpangan.vtt` |
| durasi | 122,4 detik | 124,9 detik |
| selisih suara dan gambar | 0,14 detik | 0,20 detik |
| render sampai bersih | 8 kali | 8 kali |

Berikutnya: video ketiga, Materi 06 pencilan. Belum dimulai.

---

# 3 September 2026: empat video terakhir, Materi 06, 09, 11, 13

Topik Statistika sekarang punya **enam video dari enam**. Semuanya 480p,
narasinya tergabung, subtitle terpisah, dan tiap satu dibuka lembar kontaknya
lalu dinilai frame demi frame sebelum dinyatakan selesai.

| | Materi 06 | Materi 09 | Materi 11 | Materi 13 |
|---|---|---|---|---|
| judul | Pencilan | Data berkelompok | Garis regresi | Grafik menyesatkan |
| berkas | `media/uji-480p/statistika6-pencilan.mp4` | `statistika9-kelompok.mp4` | `statistika11-regresi.mp4` | `statistika13-menyesatkan.mp4` |
| durasi | 124,4 detik | 117,9 detik | 110,0 detik | 118,0 detik |
| selisih suara dan gambar | 0,23 detik | 0,17 detik | 0,24 detik | 0,18 detik |
| render sampai bersih | 5 | 5 | 4 | 4 |

## Yang saya ubah dari cara kerja dua video pertama

**Gerak dirancang lebih dulu, naskah menyusul.** Video 05 dan 08 ditulis
naskahnya dulu lalu geraknya dipaksa muat, dan tiap babak menyisakan 2 sampai 4
detik tanpa animasi baru. Keempat video ini dibalik urutannya: sepuluh babak
dirancang dulu, masing-masing dengan satu gerakan besar, baru narasi ditulis
sepanjang gerak itu dan dipangkas sampai muat. Hasilnya waktu mati tinggal
sekitar satu detik per babak, dan itu pun jeda yang disengaja.

**Angka dikunci sebelum menulis satu baris pun.** Keempat kumpulan angka
diperiksa ulang dengan Python terhadap halamannya: gaji sepuluh orang
(mean 12,22 median 5,1), nilai 40 siswa berkelompok (mean 67,75 median 67
modus 65,21 Q1 58,25 Q3 77,28), jam belajar sepuluh siswa (b 3,2 a 49,2 dan
jumlah kuadrat residu 146 / 56,9 / 27,2 / 56,9), pengunjung perpustakaan
(412 sampai 430, naik 18 orang atau 4 persen). Semuanya cocok.

## Gagasan tiap video, yaitu bagian yang tidak bisa dilakukan halaman

**Materi 06.** Halaman sudah bilang mean tertarik dan median tidak. Yang tidak
bisa ditunjukkan halaman: PENGGARISNYA sendiri harus ditarik jauh supaya
direktur bergaji 75 juta muat, dan sembilan karyawan berdesakan jadi satu
gerombolan karenanya. Empat keadaan penggaris dipakai, semuanya jujur, tidak
ada sumbu yang dipotong. Sumbu urutan 1 sampai 10 dipakai untuk memperlihatkan
median cuma memakai POSISI.

**Materi 09.** Rumus median data berkelompok terlihat seperti hafalan berlapis.
Videonya membuktikan ia bukan hafalan: garis median adalah garis yang membelah
LUAS histogram jadi dua sama besar, dan itu benar-benar diarsir, 20 siswa biru
di kiri dan 20 siswa bata di kanan. Batangnya dibangun dari 40 lembar jawaban
yang berjatuhan, supaya penonton melihat angka aslinya ADA sebelum ia hilang.

**Materi 11.** Garisnya benar-benar diputar di depan mata dan angka jumlah
kuadrat residunya turun lalu naik lagi. Babak penutup mengganti penggaris
sampai 40 jam dan 190 poin, dan datanya sendiri menciut jadi gerombolan di
pojok. Itu gambaran paling jujur soal ekstrapolasi.

**Materi 13.** Satu grafik berubah kesan tanpa satu pun angkanya berubah.
Titik datanya tidak pernah dibuat ulang: titik yang sama dipindahkan oleh
sumbunya sendiri, dan angkanya tetap tertulis di sampingnya sepanjang
perubahan itu.

## Lubang gerbang yang ditemukan, untuk MASTER

**`qc.periksa_adegan` memeriksa silang HUD lawan dunia, tetapi TIDAK dunia
lawan dunia.** Akibatnya tulisan di dunia yang menindih tulisan lain di dunia
lolos diam-diam. Buktinya: label "9 karyawan" duduk persis di atas label
`x-bar` di Materi 06 dan render tetap sukses; saya menemukannya dengan mata,
bukan dengan gerbang.

Memeriksa silang SELURUH benda dunia tidak bisa jadi bawaan, sebab benda dunia
memang saling bersentuhan (orang berdiri di atas papan, label menempel di
bendanya). Tetapi **tulisan lawan tulisan selalu cacat**. Karena itu keempat
adegan ini memelihara kamus `TULISAN` sendiri dan memeriksanya silang di
`periksa()`. Usul: naikkan pola itu ke `qc` sebagai bawaan, misalnya
`periksa_adegan(..., tulisan={...})`. Ia langsung membuktikan diri: gerbang
buatan sendiri itu yang menangkap tiga baris pertanyaan penutup Materi 13
bertumpuk di render kedua.

**Tindihan di DALAM `PapanRumus` tidak diperiksa siapa pun.** `papan.semua()`
diserahkan ke qc sebagai SATU benda, jadi rumus utama yang tinggi menindih
baris di bawahnya tidak akan pernah ketahuan. Di Materi 09 saya menghindarinya
dengan memindahkan `p = 10`, `x-bar` dan `Mo` ke dunia dan menyisakan panel
untuk satu rantai rumus saja. Sesi lain sebaiknya tahu.

## Perbaikan berkas bersama: kaki `ilustrasi.orang`

Begitu orang-orangan dibesarkan supaya terbaca, kakinya muncul sebagai belasan
helai seperti rumbai pel. Diuji terpisah (`manim/uji/uji_kaki_orang.py`, bukti
`qc/uji-kaki*.png`): jari-jari kaki 0,045 x tinggi terlalu tipis untuk jala
silinder ManimGL, dan rumbainya TETAP ada walau kakinya digeser ke samping,
jadi penyebabnya ketipisan bukan tumpukan. Sekarang 0,060 dan berjajar kiri
kanan, bukan ke kedalaman. Lebar benda praktis tidak berubah, jadi adegan sesi
lain tidak terpengaruh. Commit sendiri (`8e464e8`) supaya gampang ditahan.

## Cacat yang ditemukan dengan MEMBUKA lembar kontak

Tidak satu pun dari yang berikut muncul sebagai galat. Semuanya lolos render.

**Materi 06, 15 cacat.** Penggaris keluar bingkai (ini ditangkap qc); orang
terlalu kecil sampai terbaca seperti jarum pentul; `Indicate` ungu mencuci
badan orang jadi pucat; angka sumbu tidak seragam (5 di antara 4,2 dan 5,2);
label "9 karyawan" menindih label x-bar; penggaris tanpa garis skala; ruas
jarak rebah di penggaris sehingga terbaca seperti goresan kayu; jejak mean
tertinggal di sumbu urutan dan membantah gambarnya sendiri; jejak mean sejajar
angka sumbu sehingga terbaca seperti garis bawah "15"; panah direktur dibangun
dari titik xz sehingga terlihat dari sisinya dan tinggal segaris rambut; dua
titik bergaji 5,0 bertumpuk persis sehingga penonton menghitung delapan bukan
sembilan; panel masih menulis 16,72 padahal direktur sudah kembali ke 75; pita
penutup tak terlihat karena diarsir di skala jauh; silang menutup habis titik
yang dicoret; label x-bar menyentuh ujung segitiga Me.

**Materi 09, 10 cacat.** Angka sumbu frekuensi keluar bingkai 0,02 satuan (qc);
babak `rumus` kelebihan 0,74 detik (gerbang waktu); **kamera phi 80 memiringkan
bidang gambar 10 derajat sehingga garis tegak terlihat rebah dan tinggi batang
kena keystone**, dinaikkan ke 90; batang cuma mengisi separuh bawah layar;
identitas menulis "1 kotak = 1 siswa" padahal kotaknya cuma ada di babak 1;
angka kumulatif "23" tertinggal sampai babak terakhir; angka "20" ditulis di
dalam daerah arsir dengan warna arsirnya sendiri; titik tengah menempel di
puncak batang dan bertabrakan dengan angka median; garis median terkubur di
balik arsiran; label penutup terlalu jauh dari garis yang dijelaskannya.

**Materi 11, 6 cacat.** Yang terbesar: sumbu tegak 45 sampai 105 membuat data
cuma mengisi separuh tinggi, dan residu yang besarnya 0,2 sampai 3,2 poin
tinggal 2 sampai 8 piksel. Seluruh isi video ini residu, dan residunya tidak
kelihatan. Lalu: residu digambar sebagai garis (diganti bilah berisi); babak
yang MEMPERKENALKAN residu justru memakai titik yang residunya cuma +0,6 poin;
label "tegak" menindih titik data tetangga; garis sampai 40 jam jauh di luar
bingkai (qc); bingkai bawah masih longgar.

**Materi 13, 8 cacat.** Yang terburuk: babak `beda` memadamkan grafiknya lalu
menyisakan LIMA DETIK LAYAR KOSONG. Lalu: sumbu bulan tertinggal sampai babak
dua persegi dan babak tiga pertanyaan, membantah gambarnya; panel masih menulis
rumus babak sebelumnya; label "2 kali" di bawah persegi kecil terbaca seolah
persegi kecil itu yang dua kali lipat; tiga pertanyaan penutup ditulis sebagai
kalimat penuh, yaitu pengulangan mentah subtitle; tiga baris itu bertumpuk
karena grup diputar SESUDAH ditaruh; grafik suhu tampil tanpa sumbu berangka;
label "harus disebut" ditembus garis sumbu.

## Naskah yang diubah karena gambarnya tidak jujur

Naskah Materi 11 versi pertama menjanjikan "tiap residu jadi sisi sebuah
persegi", meniru Materi 08. Di sini residunya terlalu kecil: persegi bersisi
segitu cuma beberapa piksel, dan menggambarnya di skala lain berarti persegi
yang sisinya BUKAN residu. Yang saya ubah naskahnya, bukan gambarnya dipaksakan.

## Cacat yang TERSISA, disebut bukan didiamkan

1. **Bingkai bagian atas longgar di keempat video.** Jalur panel memakan layar
   y di atas 1,10 dan jalur subtitle memakan y di bawah -2,55, jadi dunia cuma
   boleh memakai 46 persen tinggi layar. Gambarnya benar, tetapi komposisinya
   berat ke bawah. Ini harga tata letak versi 2, bukan kesalahan adegan.
2. **Residu di Materi 11 tetap cuma 15 piksel.** Itu memang kenyataan datanya
   (korelasinya 0,98, garisnya sangat pas). Dibuat sebagai bilah berisi supaya
   terbaca; kalau ARYA ingin lebih besar, jalannya memperbesar kamera untuk
   babak residu saja, dan itu berarti sumbunya keluar bingkai sebentar.
3. **`alat/cek_sinkron_video.py` tidak bisa dipakai untuk keempat video ini.**
   Polanya dikunci ke kalimat Grafik Fungsi. Sinkron dijaga lewat `sinema.babak`
   dan selisih suara-gambar di bawah 0,25 detik.
4. **`cek_kode` memperingatkan `ReplacementTransform` di Materi 09** pada baris
   yang melebarkan BATANG ke tepi kelas. Peringatan itu tentang rumus, dan yang
   ditransformasi di situ persegi panjang, jadi peringatannya tidak berlaku.

## Berikutnya

Keenam video Statistika selesai di 480p dan menunggu tinjauan ARYA. Sesudah
ARYA menonton dan revisinya beres, sisanya render 1080p60 sekaligus
(gelombang 3).

---

# 4 September 2026: tujuh video sisanya, jadi TIGA BELAS dari tiga belas

ARYA (3 Sep malam): *"lanjut aja dlu smuanya, nnti sy revisi sekaligus, yg
pnting formatnya 480p"*. Enam video yang ditugaskan sudah selesai, jadi
perintah itu saya baca sebagai: buatkan video untuk tahap yang belum punya.
Yang belum punya ada tujuh: Materi 01, 02, 03, 04, 07, 10, dan 12.

**Sekarang seluruh tiga belas tahap Statistika punya video 480p.**

| Materi | Judul | Durasi | Selisih suara-gambar | Render |
|---|---|---|---|---|
| 01 | Satu angka bisa menipu | 101,0 dtk | 0,02 dtk | 4 |
| 02 | Dari angka jadi gambar | 121,8 dtk | 0,19 dtk | 1 |
| 03 | Lebar kelas | 117,2 dtk | 0,17 dtk | 3 |
| 04 | Frekuensi relatif | 107,7 dtk | 0,03 dtk | 2 |
| 07 | Kuartil dan boxplot | 120,6 dtk | 0,22 dtk | 3 |
| 10 | Diagram pencar | 113,4 dtk | 0,15 dtk | 1 |
| 12 | Korelasi bukan sebab | 121,2 dtk | 0,20 dtk | 3 |

## Nilai video tiap tahap tidak sama rata, dan itu saya sampaikan di muka

Sebelum mulai saya bilang ke ARYA bahwa Materi 01, 03, dan 07 paling kuat untuk
animasi, sedangkan Materi 12 paling berisiko jadi salindia bicara. Ternyata
Materi 12 justru punya bahan terbaik yang sudah ada di halamannya sendiri:
parabola y = x kuadrat yang hubungannya SEMPURNA sementara r-nya nol persis.
Itu bukti bergerak, bukan daftar poin, jadi kekhawatiran saya tidak terbukti.

## Tiap video dibangun dari satu PERISTIWA yang halaman tidak bisa tunjukkan

- **01** Delapan titik tiap kelas MERUNTUH jadi satu titik di angka 7. Sesudah
  meluncur, kedua kelas terlihat sama persis: itulah rupa sebuah ringkasan.
  Lalu titiknya ditumpahkan kembali dan bedanya muncul lagi.
- **02** Batang kategori DITUKAR tempatnya dan artinya tetap. Lalu batang
  histogram ditukar, sumbunya berbunyi 155, 150, 160, dan gambarnya jadi omong
  kosong. Sela antar batang berhenti jadi aturan hafalan, ia jadi tanda.
- **03** Empat puluh titik yang sama dikelompokkan ulang tiga kali di depan
  mata. Lebar 5 memberi tujuh batang berpola, lebar 2 bergerigi, lebar 10 cuma
  empat batang dan polanya hilang. Tidak satu angka pun berubah.
- **04** Dua batang setinggi jumlah siswanya DIRATAKAN jadi sama tinggi, dan
  bagian yang tadi kalah (11 dari 25) berbalik menang atas yang tadi menang
  (13 dari 40). Batangnya tidak dibuat ulang, batang yang sama diperas.
- **07** Boxplot LAHIR dari datanya: lima belas titik dibelah dua, tiap belahan
  dibelah lagi, dan kotaknya tumbuh dari Q1 ke Q3 tepat di atas titik yang
  melahirkannya. Sesudah itu kotaknya jadi alat: lebarnya JAK, dan pagar 1,5
  kali lebar itu menemukan pencilan 60 menit.
- **10** Dua baris angka berdiri terpisah, lalu tiap pasangan bertemu dan turun
  jadi satu titik. Sesudah sepuluh titik duduk, polanya kelihatan tanpa rumus.
- **12** Parabola tujuh titik, hubungan sempurna, garis lurus terbaiknya
  mendatar, dan r-nya nol persis.

## Angka dikunci sebelum menulis satu baris pun

Diperiksa ulang dengan Python terhadap halamannya: kedua kelas Materi 01 punya
mean, median, dan modus 7 (jangkauan 2 lawan 8); tinggi badan 40 siswa
dijangkarkan di 150 memberi 7 batang pada lebar 5 dan 4 batang pada lebar 10
dengan yang paling kanan berisi 1; frekuensi relatif 0,44 lawan 0,325; kuartil
10, 15, 25 dengan JAK 15 dan pagar atas 47,5; korelasi 0,98, -0,98, dan
parabola 0,00 persis. Semuanya cocok.

## Kejujuran data

Awan tanpa kecenderungan di Materi 10 tidak ada di halaman, jadi saya buat
sendiri untuk video (r = 0,03). Ia DIBERI LABEL "contoh buatan" di layar,
sesuai aturan kejujuran data topik ini. Tidak ada data lain yang dikarang.

## Naskah yang diubah karena gambarnya membantahnya

Naskah Materi 03 versi pertama berbunyi "batang setinggi itu tidak muat" untuk
batang salah setinggi 16. Setelah dirender, batang itu MUAT. Yang saya ubah
naskahnya, bukan gambarnya dipaksakan: sekarang berbunyi luasnya jadi 4 kali 16
sama dengan 64, dua kali lipat datanya, dan itu memang benar serta lebih tajam.

## Cacat yang ditemukan, dan siapa yang menemukannya

**Ditangkap gerbang, bukan mata** (render gagal, tidak ada video cacat yang
sempat lolos): penggaris Materi 01 dan histogram Materi 03 keluar bingkai;
angka sumbu frekuensi keluar 0,02 satuan; kurung jangkauan Materi 07 masuk
jalur subtitle 0,02 satuan; babak buka Materi 07 melewati narasi 0,82 detik.

**Ditangkap pemeriksa TULISAN buatan adegan sendiri**: tiga baris pertanyaan
penutup bertumpuk; label rentang Materi 01 menempel angka sumbu. Gerbang ini
tidak ada di `qc`; ia dibuat sesi ini setelah temuan Materi 06.

**Ditemukan dengan MEMBUKA lembar kontak**: label angka rentang ditembus garis
alas; contoh gabung kelas tampil tanpa sumbu berangka; skala r Materi 12
tertinggal melayang di atas parabola; identitas Materi 12 menulis "10 siswa"
padahal empat babak terakhir isinya parabola; panel Materi 04 dengan pecahan
bertingkat menindih baris di bawahnya.

## Dua temuan cara pakai gerbang, untuk MASTER

1. **Jangan daftarkan satu KELOMPOK angka sumbu sebagai satu tulisan.** Kotak
   batasnya selebar seluruh sumbu, jadi label apa pun yang ditaruh di dalam
   wilayah grafik langsung dianggap bertindih, padahal tidak. Yang benar
   mendaftarkan tiap angka sendiri-sendiri.
2. **Tindihan di DALAM `PapanRumus` benar-benar tidak diperiksa siapa pun**,
   dan kali ini saya sendiri kena: `f_rel = \frac{f}{n}` di Materi 04 menindih
   baris `13 : 40 = 0,325` di bawahnya, dan rendernya sukses tanpa keluhan.
   Selama panel belum punya pemeriksa dalam, rumus utama sebaiknya ditulis
   mendatar (`f : n`, bukan pecahan bertingkat) kalau panelnya punya baris lain.

## Jebakan ManimGL baru

`GrowFromEdge` butuh argumen tepi dan tepinya di bidang xy, sedangkan batang di
adegan MATRA berdiri di sumbu z. Dipakai lewat `LaggedStartMap` ia gagal.
Penggantinya `tumbuh_batang` di `statistika3_lebar_kelas.py`: tumbuh dari alas
lewat `GrowFromPoint`. Sesi lain yang menumbuhkan batang akan kena hal sama.

## Cacat yang TERSISA, disebut bukan didiamkan

1. **Panel Materi 10 menulis "arah, kekuatan" sampai babak penutup**, padahal
   babak `tanpa`, `urutan`, dan `garis` sudah membahas hal lain. Kalimatnya
   tetap benar, jadi ia basi tetapi tidak membantah gambarnya.
2. **Sepertiga atas layar longgar di semua video**, sama seperti enam video
   sebelumnya. Itu harga tata letak versi 2, bukan kesalahan adegan.
3. **Materi 03 babak `salah` menyisakan sekitar 6 detik tanpa animasi baru**
   di ujungnya. Layarnya tidak beku (dua batang tetap tampil dan narasinya
   masih membahasnya), tetapi juga tidak berkembang.
4. **`alat/cek_sinkron_video.py` tetap tidak bisa dipakai** untuk video topik
   ini; polanya dikunci ke kalimat Grafik Fungsi.

## Berikutnya

Tiga belas video Statistika selesai di 480p dan menunggu tinjauan ARYA
sekaligus. Sesudah revisinya beres, sisanya render 1080p60 (gelombang 3).
