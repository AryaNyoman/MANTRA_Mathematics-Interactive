# Laporan MATRA-STATISTIKA
Terakhir: 1 September 2026, malam

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
