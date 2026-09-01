# Laporan MATRA-VEKTOR
Terakhir: 2 September 2026, 04.30

## Pemeriksaan ulang 2 Sep setelah cabang diselaraskan ke master

Diminta MASTER. Cabang sudah berisi kerja saya, empat topik lain, perbaikan HP
dari sesi UI/UX, dan tujuh video Limit. Dev server pindah ke port **3010**,
Playwright memakai sesi bernama **`-s=matra-vektor`**.

### Tampilan HP: SUDAH BENAR

Satu-satunya syarat gelombang 1 yang belum terpenuhi, sekarang terpenuhi.
Potret 375 piksel dibuka dan dinilai dengan mata, dua kali: sekali pada HEAD
saat itu, sekali lagi setelah cabang maju ke `f9e6a05`, supaya yang dinilai
benar-benar kode terkini.

| Sebelum perbaikan UI/UX | Sesudah |
|---|---|
| Teks meluber keluar layar dan terpotong | Menumpuk satu kolom, semua terbaca |
| Kolom widget menyusut jadi sisa tipis | Widget punya kartu sendiri, tampil utuh |
| Tulisan panel kendali menembus kolom bacaan | Panel kendali rapi di bawah widget |
| Lencana INTERAKTIF menimpa judul materi | Lencana di atas kartu, tidak menimpa |
| Navigasi memenuhi lebar | Tombol menu, tab membungkus jadi beberapa baris |

Diperiksa dua materi yang bentuknya paling berbeda:
- **Materi 01** (widget SVG bisa diseret): bidangnya utuh, kotak keterangan
  warna terbaca, angka sumbu terbaca, tidak ada yang terpotong.
- **Materi 10** (galeri empat foto): foto tampil utuh tanpa terpotong,
  keterangan dan kotak hitungannya terbaca.

Lebar 1366 juga dipotret ulang dan tetap bersih.

**Satu catatan jujur, bukan penghalang**: pada 375 piksel, tulisan DI DALAM
gambar SVG mengecil sampai kira-kira 6 sampai 7 piksel, misalnya penunjuk skala
"lebar tampilan 11 satuan". Masih terbaca, tetapi kecil. Ini akibat bidang
gambar selebar 460 satuan diperkecil mengikuti lebar layar, jadi berlaku untuk
semua topik, bukan khusus vektor. Kalau ARYA merasa terlalu kecil, perbaikannya
ada di sesi UI/UX, bukan di sini.

### Verifikasi diulang dengan biner Node langsung

Aturan baru: `rtk` terbukti mengarang keluaran (temuan MATRA-STATISTIKA).
Semua klaim "lolos" saya pada 1 September dibuat lewat `rtk proxy`, jadi
semuanya saya jalankan ulang tanpa pembungkus.

```
node node_modules/typescript/bin/tsc --noEmit          -> kode keluar 0
node node_modules/eslint/bin/eslint.js <berkas vektor> -> kode keluar 0
node node_modules/next/dist/bin/next build             -> 19 halaman, TypeScript 25,0 detik
node alat/uji-geometri-vektor.mts                      -> SEMUA LOLOS
python alat/cek_vektor.py alat/uji-cek-vektor.json     -> 13 dari 13 DITOLAK (memang harus)
python alat/cek_vektor.py materi + latihan + kuis      -> SEMUA LOLOS: 116 soal
```

**tsc dibuktikan hidup**, bukan sekadar menjawab aman: disisipkan galat tipe
sengaja, tsc menolaknya dengan `error TS2322` dan kode keluar 2; setelah galat
dihapus, kode keluar kembali 0.

**Bukti rtk memang mengarang, dari kasus saya sendiri**: pada 1 September rtk
melaporkan build "Compiled successfully in 1624ms". Build sungguhan hari ini
memakan 25 detik hanya untuk tahap TypeScript-nya saja dan menghasilkan 19
halaman. Angka 1,6 detik itu mustahil. Hasil akhirnya kebetulan sama-sama
lolos, tetapi angkanya tidak bisa dipercaya, dan itu justru yang berbahaya.

Yang TIDAK berubah setelah diulang: semua tetap lolos. Tidak ada temuan baru.

---

## Gelombang 2 tahap 1: revisi isi SELESAI

Keenam butir revisi dari MASTER dikerjakan sebelum menyentuh video.

| # | Revisi | Hasil |
|---|---|---|
| 1 | "kamu" jadi "Anda" | 7 tempat diganti. Ditambah 4 akhiran `-mu` (panjangmu, tanganmu, sekolahmu, jawabanmu) supaya tidak ada kalimat yang setengah "Anda" setengah "-mu". Total 11. |
| 2 | Prasyarat kosinus di Materi 11 | Kalimat MASTER dipakai apa adanya, ditaruh tepat sesudah judul sesi dan sebelum daftar dua caranya. |
| 3 | Paragraf lisensi Materi 10 | Dibuang dari `penjelasan`, dipindah jadi keterangan kecil di bawah galeri (`DuniaNyataVektor.tsx`). Sudah dipotret dan dilihat: tampil miring kecil di bawah keempat kartu. |
| 4 | Bocoran ruang di Materi 05 | Kalimat "Ini bocoran saja, tidak diuji sampai topik Ruang Tiga Dimensi" ditambahkan sebelum contohnya. |
| 5 | Kata "mudah", "jelas", "gampang" | Lihat di bawah. |
| 6 | Foto DHL dan nasib Materi 11 dan 12 | Dibiarkan, menunggu ARYA. |

### Butir 5, dan kenapa angkanya jauh lebih kecil daripada dugaan

Hitungan grep mentah 14 + 21 + 2 itu menyesatkan. Sebagian besar bukan kalimat
siswa: `tingkat: 'mudah'` adalah medan data kuis, dan kata "penjelasan" serta
"dijelaskan" mengandung "jelas" tanpa ada hubungannya. Setelah disaring ke
kalimat yang benar-benar dibaca siswa, sisanya **7 kemunculan**.

Ketujuhnya diperiksa satu per satu, dan **ketujuhnya diganti**:

| Semula | Menjadi | Alasan |
|---|---|---|
| "gampang meleset satu dua kotak" | "sering meleset satu dua kotak" | lebih tepat, dan tidak menakar kemampuan |
| "Ujinya gampang: titik (4, 3)..." | "Cara memeriksanya begini: ..." | menilai tugas siswa |
| "tetapi jelas bukan vektor yang sama" | "tetapi keduanya bukan vektor yang sama" | "jelas" membuat yang bingung merasa bodoh |
| "pekerjaan yang sangat mudah" | "pekerjaan yang sangat singkat" | menilai tugas siswa |
| "Perpindahan jelas butuh arah" (kuis) | "Perpindahan memang butuh arah" | sama |
| "Menggambar ... memang jelas" | "... memang gamblang" | menggambarkan benda, tetapi butir 10 standar melarang tanpa kecuali |
| "dua langkah yang lebih mudah dibaca" | "... yang lebih enak dibaca" | sama |

Dua yang terakhir sebenarnya menggambarkan benda, bukan menakar siswa, jadi
menurut pesan MASTER boleh tinggal. Tetap dibuang karena butir 10
STANDAR-MENGAJAR melarangnya tanpa pengecualian, dan tidak ada ruginya. Semua
12 materi sekarang bersih dari keempat kata terlarang dan em-dash.

## Daftar periksa 10 butir, dua belas materi

Butir 1 sampai 10 sesuai `docs/tugas/STANDAR-MENGAJAR.md` bagian 6. Diisi dari
pembacaan struktur tiap materi, bukan dari ingatan: berkasnya dibongkar lewat
Node dan tiap blok dihitung.

| Materi | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| 01 Angka saja tidak cukup | ya | tidak¹ | ya | ya | ya | ya | ya | ya | ya | ya |
| 02 Panah yang boleh dipindah | ya | tidak | ya | ya | ya | n/a² | ya | ya | ya | ya |
| 03 Memecah panah jadi dua langkah | ya | tidak | ya | ya | ya | ya | ya | ya | ya | ya |
| 04 Panjang panah itu Pythagoras | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 05 Arah tanpa panjang | ya | tidak | ya | ya³ | ya | ya | ya | ya | ya | ya |
| 06 Menjumlah itu menyambung | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 07 Dua yang bekerja bersamaan | ya | tidak | ya | ya | ya | ya | ya | ya | ya | ya |
| 08 Mengurangi itu menambah lawannya | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 09 Dikali angka | ya | tidak | ya | ya³ | ya | ya | ya | ya | ya | ya |
| 10 Vektor di dunia nyata | ya | ya | ya | ya | ya | ya | tidak⁴ | tidak⁴ | ya | ya |
| 11 Seberapa searah? | ya | tidak | ya | ya | ya | ya | ya | ya | ya | ya |
| 12 Bayangan satu panah pada panah lain | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |

**Butir 1, 3, 4, dan 6 (yang menentukan kelayakan): dua belas materi menjawab
YA.** Semua layak.

¹ Materi 01 adalah pembuka topik; belum ada materi sebelumnya untuk dipanggil
ulang. Ia bersandar pada Pythagoras dari SMP tanpa menyebutnya.

² Materi 02 bukan tahap prosedur, melainkan pengenalan lambang dan jenis, jadi
butir 6 tidak berlaku. Semua sepuluh tahap prosedur punya `contoh` berikut
simpulnya.

³ **Diperbaiki hari ini, dan ini temuan daftar periksa ini sendiri.** Keduanya
semula punya satu sesi berisi DUA ide, dan butir 4 termasuk yang menentukan
kelayakan:
- Materi 05: sesi "Vektor posisi, dan sedikit tentang ruang" dipecah menjadi
  "Vektor posisi" dan "Sedikit bocoran tentang ruang".
- Materi 09: sesi "Dua akibat yang sering ditanyakan" dipecah menjadi
  "Panjangnya berubah seberapa" dan "Kelipatan berarti sejajar".

⁴ Materi 10 adalah galeri penerapan, bukan tahap latihan. Tidak ada prosedur
untuk dicoba dan tidak ada satu kekeliruan khas untuk dikoreksi, jadi `coba`
dan `seringKeliru` memang tidak ada. Keduanya bukan butir penentu kelayakan.
Kalau MASTER atau ARYA tetap ingin ada, saya bisa menambahkan `coba` berisi
tuntunan membaca keempat foto (misalnya "cari panah mana yang menyatakan
kecepatan pada peta lempeng"). Belum dikerjakan karena tidak ada di daftar
revisi.

### Satu kelemahan yang saya laporkan, bukan saya tambal diam-diam

**Butir 2 dijawab "tidak" oleh 7 dari 12 materi.** Hanya Materi 04, 06, 08, 10,
dan 12 yang punya kalimat yang benar-benar memanggil ulang pengetahuan
sebelumnya (diperiksa dengan mencari rujukan "Materi 0x", "sudah dibahas",
"di SMP", "topik Trigonometri").

Butir 2 bukan penentu kelayakan, dan instruksi MASTER hanya menyuruh
memperbaiki yang gagal di butir 1, 3, 4, atau 6. Jadi saya melaporkannya, bukan
menambalnya sendiri. Perbaikannya murah: satu kalimat pembuka di tiap materi,
misalnya di Materi 07 "Di Materi 06 kedua panah disambung berurutan; sekarang
keduanya bekerja pada saat yang sama". Bilang saja kalau mau dikerjakan.

---

## Selesai

**Gelombang 1 topik Vektor selesai.** Halaman `/topik/vektor` tampil utuh:
12 materi, 11 widget interaktif, 4 latihan terbimbing, dan bank 32 soal kuis.
Tanpa video, sesuai alur gelombang.

Rancangannya `docs/superpowers/specs/2026-09-01-vektor-alur-belajar.md`,
rencana kerjanya `docs/superpowers/plans/2026-09-01-topik-vektor.md`.

### Keputusan ARYA di gerbang rancangan (1 September 2026)
12 materi: sepuluh inti Kelas 10 ditambah dua materi lanjutan (perkalian titik
dan proyeksi) yang DITANDAI terus terang di dalam materinya sebagai di luar
Kurikulum Merdeka. Pembuka Materi 01 memakai perahu menyeberang sungai.
Materi penutup memakai foto nyata.

### Penempatan kurikulum: diperiksa, bukan diingat
Vektor hanya ada di Kelas 10 (Fase E), Buku Guru Bab 3 "Vektor dan Operasinya".
Buku Guru Kelas 11 menyebut kata itu sekali saja, di daftar Capaian
Pembelajaran. Buku Siswa Kelas XII tidak menyebutnya sama sekali. Perkalian
titik dan proyeksi memang TIDAK ada di Kurikulum Merdeka, jadi keduanya
dijadikan materi lanjutan bertanda, bukan diselundupkan sebagai materi biasa.

Satu akibat penting: di buku, Vektor adalah Bab 3 dan Trigonometri Bab 4. Siswa
yang membaca berurutan belum tahu sin dan cos di sini. Karena itu panjang vektor
diturunkan dari Pythagoras dan arah diukur busur, bukan lewat tangen. Kaitan ke
trigonometri ditulis sebagai selipan opsional saja.

### Kedua belas materi

| # | Materi | Widget |
|---|---|---|
| 1 | Angka saja tidak cukup | `PerahuSungai` |
| 2 | Panah yang boleh dipindah | `PanahBerpindah` |
| 3 | Memecah panah jadi dua langkah | `PecahKomponen` |
| 4 | Panjang panah itu Pythagoras | `PanjangDanArah` |
| 5 | Arah tanpa panjang | `VektorSatuan` |
| 6 | Menjumlah itu menyambung perjalanan | `SambungPanah` |
| 7 | Dua yang bekerja bersamaan | `JajarGenjang` |
| 8 | Mengurangi itu menambah lawannya | `SelisihPanah` |
| 9 | Dikali angka: panjang berubah, arah tetap | `KaliSkalar` |
| 10 | Vektor di dunia nyata | galeri 4 foto |
| 11 | *(lanjutan)* Seberapa searah? | `PerkalianTitik` |
| 12 | *(lanjutan)* Bayangan satu panah pada panah lain | `Proyeksi` |

Semua widget ditarik langsung dengan jari atau tetikus, bukan digeser slider.
Kecuali Materi 09 yang memang butuh pengali bernilai tepat, jadi memakai
penggeser.

### Bukti, bukan klaim

```
node alat/uji-geometri-vektor.mts                  -> SEMUA LOLOS
python alat/cek_vektor.py alat/uji-cek-vektor.json -> 13 dari 13 DITOLAK (memang harus)
python alat/cek_vektor.py materi + latihan + kuis  -> SEMUA LOLOS: 116 soal
npx tsc --noEmit                                   -> lolos
npx eslint (seluruh berkas vektor)                 -> lolos
npm run build                                      -> lolos, /topik/vektor ter-render
grep em-dash                                       -> tidak ada
grep "miskonsepsi"                                 -> tidak ada
```

**Pemeriksa angkanya dibuat SEBELUM satu soal pun ditulis**, dan dibuktikan dua
arah: menolak 13 jawaban yang sengaja disalahkan, lalu meloloskan 116 angka yang
benar. Kalau cuma diuji satu arah, pemeriksa yang menolak segalanya akan lolos
tanpa ketahuan.

### Kalibrasi kesulitan soal
Ditakar ke Latihan 3.1 sampai 3.6 di Buku Guru Kelas 10. Soal di sana bukan
sekadar menjumlahkan dua vektor: ada komponen tiga dimensi dan pembuktian tiga
titik segaris lewat kelipatan. Karena itu latihan nomor 4 dan tingkat "sangat
sulit" pada kuis memakai bentuk itu juga. mathcyber1997.com tidak dipakai karena
diblokir pemeriksa bot.

### Cacat yang ditemukan dengan MELIHAT, bukan dari log

Sembilan cacat, semuanya lolos dari tsc, eslint, dan build tanpa satu pun
peringatan. Tidak ada yang bisa ditemukan tanpa membuka gambarnya.

| Cacat | Sebabnya |
|---|---|
| Rumus sudut antar vektor menjawab 0,0000012 derajat untuk dua panah yang jelas searah | `acos` tidak teliti di dekat 1 dan -1. Diganti `atan2` dari hasil kali silang terhadap hasil kali titik, yang tepat 0 dan tepat 180 di kedua ujung. **Ditangkap berkas uji, bukan mata.** |
| Angka sumbu melayang di tepi bingkai, jauh dari sumbunya | Disalin dari widget grafik fungsi, yang sumbunya memang di tepi. Pada vektor titik asal ada di tengah. Sekarang angkanya menempel di sebelah sumbunya. |
| Label "4" bertindih angka sumbu sampai terbaca "4 pangkat 2" | Label komponen dan angka sumbu berebut jalur yang sama di bawah sumbu. Label komponen mendatar sekarang SELALU di atas sumbu. |
| Label komponen tegak meleset keluar bingkai untuk panah yang menunjuk ke kiri | Tanda arah geserannya hanya memperhitungkan satu dari dua hal yang menentukan. |
| Tiga label pada widget perahu saling menimpa bergantian | Sebab akarnya: label yang menempel di badan panah ikut berpindah saat siswa menyeret. Diganti kotak keterangan warna yang letaknya tetap (`Legenda.tsx`), dan pola itu dipakai semua widget berpanah banyak. |
| Kotak keterangan menutupi angka sumbu "-4" | Sumbu mendatar widget itu ada di bagian bawah bidang. Kotaknya dipindah ke pojok kanan atas. |
| Menyeret panah ikut menyorot teks jadi biru | `user-select` belum dimatikan pada SVG. |
| Label titik mendarat terpotong tepi kanan saat arus diperbesar | Jangkar teksnya sekarang berpindah ke ujung kalau titiknya mendekati tepi. |
| Ref diubah saat render pada `useSeretTitik` | Melanggar aturan React 19. **Ditangkap eslint**, bukan mata. Senarai titiknya tidak lagi disalin ke ref. |

Satu lagi yang dicegah sebelum terjadi: kalimat penilaian terpanjang pada widget
Materi 02 akan meluber keluar tepi SVG lalu terpotong diam-diam. Kalimatnya
dipendekkan ke maksimal sekitar 45 huruf.

### Foto Materi 10
Empat foto dari Wikimedia Commons, semuanya berlisensi terbuka, dan **semuanya
dikompres di bawah 150 KB sejak awal**: 132, 46, 130, dan 131 KB. PROGRESS
mencatat foto Materi 10 Trigonometri menumpuk sampai sekitar 1,5 MB dan belum
dikompres. Utang itu tidak ditambah dari sini. Sumber, nama pemotret, dan
lisensinya dicatat di `web/public/gambar/sumber.json`.

| Foto | Lisensi | Pemotret |
|---|---|---|
| Perahu dayung di Sungai Thames | CC0 | Andy Li |
| Boeing 757 mendarat di Pisa | CC BY 4.0 | Marcxosm |
| Perahu layar | CC0 | José Martinho |
| Peta lempeng bumi | Public domain | NOAA |

Peta NOAA itu temuan yang beruntung: isinya memang sudah berupa anak panah
beserta angka kecepatan, persis pembuka Bab 3 di Buku Guru.

## Sedang dikerjakan
Tidak ada. Gelombang 1 selesai, menunggu tinjauan ARYA.

## Butuh MASTER

> **Diperbarui 2 Sep**: butir 1 dan 2 di bawah SUDAH SELESAI. Tabel kepemilikan
> yang baru menyatakan baris `siap: true` di `topik.ts` dan berkas
> `web/app/latihan/<topik>/page.tsx` resmi menjadi wilayah sesi topik. Keduanya
> tidak lagi dianggap pelanggaran. Dibiarkan tertulis sebagai catatan riwayat.

1. **`web/content/topik.ts` diubah satu kata**: `siap: false` menjadi
   `siap: true` pada baris vektor. Tanpa itu halaman topiknya menampilkan kartu
   "Belum dibangun" dan mustahil diperiksa dengan mata. Hanya baris vektor yang
   disentuh.

2. **`web/app/latihan/vektor/page.tsx` adalah berkas BARU di wilayah
   MATRA-DESAIN-UI-UX, dan saya membuatnya dengan sengaja.** Alasannya: begitu
   vektor didaftarkan di `daftar-isi.ts`, halaman `/latihan` OTOMATIS
   menampilkan kartu Vektor beserta tautannya, sebab `DaftarLatihan` membaca
   daftar itu. Sudah diperiksa dengan curl: `/latihan/limit` menjawab 200,
   sedangkan `/latihan/vektor` menjawab **404**. Jadi pendaftaran itu sendiri
   yang menimbulkan tautan rusak, dan berkas ini menambalnya. Isinya salinan
   persis pola `/latihan/limit`, berkas baru di folder baru, jadi tidak menimpa
   apa pun. Silakan dipindahkan kalau dianggap salah tempat.

3. **Ada dua salinan alat bingkai yang mirip**: `widget/limit/koordinat.ts` dan
   `widget/vektor/geometri.ts`. Tidak diimpor lintas folder karena tabel
   kepemilikan melarangnya. Kalau mau dijadikan milik bersama, versi vektor
   lebih siap: nol impor, dan punya berkas uji yang benar-benar berjalan.

4. **Berkas baru di `alat/`**: `cek_vektor.py`, `uji-geometri-vektor.mts`, dan
   empat berkas JSON. Semuanya baru, jadi tidak menimbulkan bentrok.

## Butuh keputusan ARYA

1. **Foto pesawat memakai livery DHL yang mencolok.** Sudah dicari alternatif
   yang lebih netral dan tidak ada yang lebih baik: hasil pencarian lain justru
   memunculkan rudal jelajah, yang jelas tidak pantas untuk halaman sekolah.
   Fotonya sah dan berlisensi terbuka, tetapi logonya besar. Kalau ARYA merasa
   itu mengganggu, tinggal bilang dan diganti gambar buatan sendiri.

2. ~~**Tampilan HP masih rusak.**~~ **SUDAH BERES 2 Sep**, diperbaiki sesi
   MATRA-DESAIN-UI-UX dan sudah saya potret ulang serta nilai sendiri. Catatan
   lamanya: Sudah dilaporkan
   sebelumnya dan ARYA sudah memutuskan itu urusan sesi MATRA-DESAIN-UI-UX.
   Dicatat ulang di sini supaya MASTER tidak mengira vektor yang merusaknya:
   topik Limit yang sudah tayang rusak dengan cara yang sama persis pada lebar
   375 piksel, dan sebabnya `globals.css` hanya punya satu blok `@media` yang
   isinya tambalan kecil untuk satu daftar di topik Limit.

3. **Materi 11 dan 12 boleh dibuang utuh** kalau ARYA berubah pikiran soal
   materi di luar kurikulum. Keduanya ditulis terpisah dan tidak ada satu pun
   materi lain yang bergantung padanya.

## Yang belum, dan memang belum waktunya
Video. Gelombang 2 baru boleh dimulai setelah halaman ini disetujui ARYA.
