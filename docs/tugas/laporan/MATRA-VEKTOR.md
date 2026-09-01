# Laporan MATRA-VEKTOR
Terakhir: 1 September 2026, 22.30

## Selesai

**Gerbang rancangan LOLOS.** Rancangan di
`docs/superpowers/specs/2026-09-01-vektor-alur-belajar.md`, rencana kerja
9 tugas di `docs/superpowers/plans/2026-09-01-topik-vektor.md`.
Keputusan ARYA: 12 materi (10 inti Kelas 10 ditambah 2 lanjutan bertanda),
pembuka perahu menyeberang sungai, penutup memakai foto nyata.

**Penempatan kurikulum diperiksa, bukan diingat.** Vektor ada di Kelas 10
(Fase E) saja: Buku Guru Kelas 10 Bab 3 "Vektor dan Operasinya". Buku Guru
Kelas 11 menyebut kata itu hanya sekali di daftar Capaian Pembelajaran, dan
Buku Siswa Kelas XII tidak menyebutnya sama sekali. Perkalian titik dan
proyeksi TIDAK ada di Kurikulum Merdeka, jadi keduanya dijadikan materi
lanjutan bertanda, bukan diselundupkan sebagai materi biasa.

**Tugas 1: matematika vektor beserta ujinya.**
`web/components/widget/vektor/geometri.ts` sengaja tanpa impor, sehingga
`alat/uji-geometri-vektor.mts` bisa dijalankan langsung oleh Node dan menguji
isinya sungguhan. Proyek ini tidak memasang Jest maupun Vitest, jadi inilah
satu-satunya jaring pengaman selain mata manusia.
`rtk proxy "node alat/uji-geometri-vektor.mts"` menjawab **SEMUA LOLOS**.

Satu bug sungguhan tertangkap uji itu: `sudutAntara` yang memakai `acos`
menjawab 0,0000012 derajat untuk dua vektor yang jelas searah, sebab `acos`
tidak teliti di dekat 1 dan -1. Diganti `atan2` dari hasil kali silang terhadap
hasil kali titik, yang tepat 0 dan tepat 180 di kedua ujung.

**Tugas 2: bingkai, panah, penyeretan, halaman hidup.**
`/topik/vektor` sudah bisa dibuka di `localhost:3001`, Materi 03 utuh dengan
widget `PecahKomponen` yang ujung panahnya ditarik langsung (bukan slider).
`rtk proxy "npx tsc --noEmit"` lolos.

Tiga cacat tampilan ditemukan dengan MELIHAT potret layar, bukan dari log:
1. Angka sumbu menempel di tepi bingkai, jauh dari sumbunya sendiri. Pada
   grafik fungsi kedua tempat itu kebetulan sama; pada vektor titik asal ada di
   tengah, jadi angkanya terlihat lepas. Sekarang ditempel di sebelah sumbunya.
2. Label komponen mendatar bertindih dengan angka sumbu, sehingga "4" terbaca
   "4 pangkat 2". Label mendatar sekarang selalu di ATAS sumbu, jalur di bawah
   sumbu diserahkan sepenuhnya kepada angka sumbu.
3. Label komponen tegak meleset keluar bingkai untuk vektor yang menunjuk ke
   kiri, sebab tandanya hanya memperhitungkan satu dari dua hal yang menentukan
   arah geseran.

Seretan diuji sampai batas: ditarik jauh ke luar bingkai, ujungnya berhenti
tepat di (-6; -3,5) dan tidak ada bagian gambar yang terpotong. Skala kedua
sumbu terbukti sama, 47 piksel per satuan di x maupun y.

## Sedang dikerjakan
Tugas 3: naskah Materi 01 sampai 04 beserta empat widgetnya.

## Butuh MASTER

1. **`web/content/topik.ts` sudah saya ubah satu kata: `siap: false` menjadi
   `siap: true` pada baris vektor.** Tanpa itu, `app/topik/[slug]/page.tsx`
   menampilkan kartu "Belum dibangun" dan halaman ini MUSTAHIL diperiksa dengan
   mata. Hanya baris vektor yang disentuh, tidak ada yang lain. Kalau MASTER
   menggabungkan sebelum topik ini rampung, silakan kembalikan ke `false`.

2. **Bingkai widget kini ada dua salinan yang mirip:**
   `widget/limit/koordinat.ts` dan `widget/vektor/geometri.ts`. Tidak
   diimpor lintas folder karena tabel kepemilikan melarangnya. Kalau MASTER mau
   menaikkannya jadi milik bersama, `geometri.ts` versi vektor lebih siap:
   nol impor, dan sudah punya berkas uji yang berjalan.

3. **Belum ada pemeriksa angka untuk vektor.** `alat/cek_vektor.py` akan dibuat
   pada Tugas 7 sebagai berkas BARU di `alat/`, meniru `alat/cek_soal.py`.
   Berkas baru, jadi tidak menimbulkan bentrok penggabungan.

## Butuh keputusan ARYA

**HALAMAN TOPIK RUSAK DI LAYAR HP, DAN INI BUKAN BAWAAN VEKTOR.**

Diuji pada lebar 375 piksel: teks meluber keluar layar dan terpotong, kolom
widget menyusut jadi sisa tipis, tulisan panel kendali menembus kolom bacaan,
dan lencana INTERAKTIF menimpa judul materi.

Yang penting: **topik Limit yang sudah tayang rusak dengan cara yang sama
persis** pada lebar yang sama. Jadi ini cacat rangka halaman bersama, bukan
akibat kode topik vektor.

Sebabnya sudah ditelusuri: `web/app/globals.css` hanya punya SATU blok
`@media`, dan isinya tambalan kecil untuk satu daftar di topik Limit. Tata
letak dua kolom `.panggung` tidak punya penanganan layar sempit sama sekali.

Berkas itu milik MATRA-DESAIN-UI-UX, jadi saya TIDAK menyentuhnya. Perlu
diputuskan ARYA: apakah temuan ini diteruskan ke sesi UI/UX sekarang, mengingat
situsnya sudah tayang di https://matra-eight.vercel.app dan siswa yang membuka
dari HP kemungkinan besar melihat halaman rusak.
