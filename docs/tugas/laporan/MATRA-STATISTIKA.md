# Laporan MATRA-STATISTIKA
Terakhir: 1 September 2026, malam

Cabang `sesi/statistika`. Gelombang 1, halaman saja, tanpa video.
Rancangan: `docs/superpowers/specs/2026-09-01-statistika-alur-belajar.md`, sudah
disetujui ARYA.

## Selesai

**Gerbang rancangan lolos.** 13 tahap, mencakup Kelas 10 Bab 7 dan Kelas 11
Bab 3 secara utuh, ditambah satu tahap membaca grafik dengan kritis. Cakupannya
diperiksa langsung ke kedua buku panduan guru, bukan ditebak.

**Dua alat pemeriksa angka, dibuat sebelum satu angka pun ditulis.**
- `alat/cek_statistik.py` menghitung dengan pecahan eksak. Cara kuartilnya
  mengikuti kurikulum, diverifikasi dari Buku Guru Kelas X halaman 227 sampai
  228, dan kedua contoh buku itu dipasang sebagai uji-diri. Uji diri lolos
  13 dari 13.
- `alat/cek_statistik_web.mjs` menjalankan berkas TypeScript situs di Node,
  lalu membandingkan hasilnya dengan data dan klaim yang sama. Gunanya menutup
  celah yang tidak bisa ditutup pemeriksa Python: widget menghitung ulang
  sendiri saat siswa menyeret titik, dan hitungan itu ditulis dalam bahasa lain.

**117 angka lolos di kedua pemeriksa, dari 22 kumpulan data.**

**Isi 13 tahap sudah ditulis**, dipecah tiga berkas menurut rombongan.
Semua data punya keterangan asal: seluruhnya data buatan, dan tiap halaman
menyatakannya buatan lewat satu fungsi bersama supaya tidak ada yang lupa.

**Palet kategori lolos validator `dataviz`.** Percobaan pertama gagal dan itu
berguna: hijau situs terbaca abu-abu, dan pasangan hijau dengan oker hanya
berjarak 5,0 bagi penderita protanopia. Palet akhir berakar dari Okabe-Ito
dengan biru proyek. Dua peringatan yang tersisa dibayar dengan label langsung
di tiap potongan dan tabel angka, bukan diabaikan.

**Widget pertama hidup dan sudah diperiksa dengan mata**, Tahap 1
`dua-kelompok`. Diuji tiga hal, bukan cuma dilihat:
- tombol panah pada titik yang disasar papan ketik benar-benar mengubah data,
- seretan tepat sasaran walaupun gambar ditampilkan 766 piksel dan bukan 460,
  jadi hitungan skalanya benar,
- angka di tabel cocok dengan yang dihitung pemeriksa.

`npx tsc --noEmit` lolos.

## Sedang dikerjakan

12 widget sisanya, lalu bank kuis.

## Butuh MASTER

**1. Satu baris `siap: true` di `web/content/topik.ts`.** Sudah saya kerjakan
sebagai commit tersendiri (`bce7eb3`) supaya gampang dibuang kalau MASTER mau
menahannya. Alasannya bukan kenyamanan: tanpa baris itu
`app/topik/[slug]/page.tsx` baris 41 tidak merender halaman topik sama sekali,
jadi kerjaan sesi ini tidak bisa diperiksa dengan mata, padahal memeriksa
dengan mata itu wajib.

**2. `rtk proxy` TIDAK BISA DIPERCAYA di worktree ini, padahal
`ATURAN-SEMUA-SESI.md` mewajibkannya untuk perintah pemeriksaan.** Buktinya:

```
$ rtk proxy "npx tsc --version"
TypeScript: No errors found
```

Itu jawaban untuk pertanyaan VERSI. Perintahnya diganti keluarannya, sama persis
seperti jebakan yang sudah tercatat di PROGRESS.md sesi 5, dan pembungkusnya
bahkan mencetak "No hook installed" di tiap pemanggilan. Yang saya pakai:

```
node node_modules/typescript/bin/tsc --noEmit
```

Dan itu saya buktikan benar-benar memeriksa, dengan menaruh kesalahan tipe
sengaja lalu memastikan ia dilaporkan (exit 2), baru menghapusnya lagi
(exit 0). Sarannya: aturan sesi diubah, sebutkan pemanggilan langsung, sebab
menyuruh lima sesi memercayai pembungkus yang menipu itu berbahaya.

**3. Tampilan 375 piksel rusak di SELURUH situs, bukan cuma topik saya.**
Saya potret `/topik/limit` pada lebar yang sama sebagai pembanding: teks keluar
tepi kanan, panel kendali kiri menimpa kolom kanan, dan baris tab hilang.
Rusaknya sama persis di kedua topik, jadi ini bawaan tata letak bersama, wilayah
MATRA-DESAIN-UI-UX. Saya tidak menyentuhnya. Akibatnya untuk sesi ini: syarat
"potret 375 sudah dinilai" belum bisa dipenuhi secara berarti sampai sesi UI/UX
menyelesaikan bagiannya. Saya akan periksa ulang setelah itu.

**4. Usul, bukan permintaan.** `components/widget/limit/koordinat.ts` dan
`components/widget/statistika/papan.ts` berbagi sekitar enam puluh baris yang
sama (penskalaan, pemilihan garis petak, angka gaya Indonesia). Saya menulis
ulang, tidak mengimpor, sebab folder Limit bukan wilayah saya dan mengimpornya
membuat topik ini ikut rusak kalau folder itu dirapikan. Kalau nanti ada topik
keempat yang butuh hal sama, naikkan bagian yang berulang itu jadi alat
bersama.

**5. Amatan kecil.** Baris tab materi memang tergulir (`overflow-x: auto`,
lebar isi 1325 lawan 788 pada layar 1366), jadi tidak ada yang terpotong. Tetapi
tanpa tanda apa pun bahwa ia bisa digulir, siswa mudah mengira materinya cuma
sembilan. Dengan 13 tahap ini jadi lebih terasa daripada di topik lain.

## Butuh keputusan ARYA

**1. Data BPS.** Semua data topik ini buatan, dan tiap halaman menyatakannya
buatan. Itu jujur dan nol risiko. Kalau ARYA ingin data Indonesia yang
sungguhan, misalnya dari BPS, saya perlu mengambilnya dari web dan itu
permintaan terpisah. Paling cocok dipasang di Tahap 10 dan Tahap 13.

**2. Bank kuis 32 soal belum ditulis**, baru 6 butir. Sisanya menunggu
kalibrasi tingkat kesulitan ke sumber nyata, sesuai aturan proyek bahwa soal
buatan sendiri cenderung terlalu mudah. Sumber kalibrasi yang tersedia: soal di
kedua buku panduan guru, dan halaman terpilih big book SMA yang berupa pindaian.
mathcyber1997 diblokir pemeriksa bot, jadi kalau ARYA mau soalnya ikut, dia
perlu menempelkannya sendiri.
