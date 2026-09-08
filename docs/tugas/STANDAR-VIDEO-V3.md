# STANDAR VIDEO MANTRA versi 3 (8 September 2026)

Berlaku untuk SEMUA video, keputusan ARYA setelah menonton Turunan 01, 02, 03
versi rinci. Contoh yang disetujui: `turunan2-garis-singgung` (5:56). Standar
ini menggantikan aturan durasi dan struktur versi 2; tata letak layar versi 2
(`STANDAR-ILUSTRASI-VIDEO.md`: identitas kiri atas, panel rumus kanan atas,
pita subtitle di kaki layar, label dua kata) tetap berlaku untuk yang tidak
bertentangan. Rancangan dan alasannya:
`docs/superpowers/specs/2026-09-08-standar-video-v3-design.md`.

## 1. Kerangka wajib tiap video (urut)

| Bagian | Isi | Panjang kira-kira |
|---|---|---|
| Pembuka | SATU pertanyaan yang dijawab video ini, diucapkan dan ditulis | 5 sampai 10 detik |
| Segar-ingat | mengingat materi sebelumnya: sebut NOMOR dan NAMA konsepnya, perlihatkan kembali gambar atau rumus kuncinya dalam bentuk ringkas, lalu sebut apa yang dibawa ke video ini. Materi 01 sebuah topik mengingat topik PRASYARATNYA (Turunan 01 mengingat Limit 01; Integral 01 mengingat Turunan) | 20 sampai 45 detik |
| Contoh angka | satu contoh dengan angka kecil, dihitung di layar langkah demi langkah | |
| Asal rumus | rumusnya DIBUKTIKAN dari contoh itu, bukan disodorkan; tiap langkah aljabar terlihat | |
| Bentuk umum | dari angka ke huruf; rumus umum lahir di dekat gambarnya lalu ke panel | |
| Penutup | ringkas satu kalimat, lalu sebut apa yang dipakai di video berikutnya | 10 sampai 20 detik |

Durasi 3 sampai 6 menit (180 sampai 360 detik); materi sederhana mendekati 3,
materi yang perlu penjabaran mendekati 6. `buat_narasi.py` memperingatkan di
luar rentang itu. Jangan mengisi waktu dengan pengulangan atau jeda kosong.

## 2. Segar-ingat, aturannya

- Bukan pemutaran ulang: ambil SATU gambar atau rumus kunci dari video
  sebelumnya, tampilkan versi ringkasnya, sebut namanya lengkap ("kemiringan
  adalah kenaikan dibagi langkah mendatar", bukan "hitungan yang sama").
- Penghubung disebut di SUARA dan SUBTITLE, bukan hanya di gambar.
- Kalau video ini mengubah kesimpulan video sebelumnya (mis. sekarang rumus
  dibuktikan, dulu cuma pola), katakan itu terbuka.
- Pemeriksa urutan istilah tetap berlaku: yang diingat hanya yang sudah
  diajarkan.

## 3. Narasi dan bahasa

- Suara `id-ID-ArdiNeural`, tempo `-5%` (bawaan `buat_narasi.py`), jeda napas
  0,35 detik di ujung tiap segmen. Tenang, tidak terburu.
- Satu segmen = satu gagasan, 8 sampai 15 detik; naskah 25 sampai 35 segmen.
- Bahasa akrab siswa; bentuk lengkap dulu, baru singkatan di gambar
  ("kemiringan = kenaikan / langkah mendatar", baru "miring = naik/datar").
- Pengetahuan lama yang bisa mengecoh disebut dan dibedakan (Pythagoras
  mencari panjang sisi; kemiringan membandingkan perubahan). Satuan yang
  berbeda tidak boleh dikuadratkan lalu dijumlahkan.
- Angka dan lambang di `teks` DIEJA sebagaimana diucapkan ("dua eks tambah
  ha"); di `tulis` ditulis sebagai lambang ("2x + h"). `tulis` = kalimat
  UTUH yang diucapkan, kalimat demi kalimat sama dengan `teks`; itulah yang
  jadi subtitle. Tanda tebal `*istilah*` boleh, harus berpasangan di satu
  kalimat.

## 4. Timing per kata (inti versi 3)

- `python manim/buat_narasi.py <video>` menghasilkan `kata.json` (waktu tiap
  kata). Adegan memakai `KATA = sinema.JamKata("<video>")` dan
  `with sinema.babak(self, "id", DURASI, kata=KATA) as b:` lalu
  `b.tunggu_kata("frasa")` sebelum animasi yang harus muncul saat kata itu
  diucapkan. Babak ditutup pada jam audio mutlak, bukan jumlah animasi.
  Frasa yang diucapkan lebih dari sekali di satu segmen dipilih dengan
  `ke=2`; pemicu yang detiknya SUDAH LEWAT menggagalkan render saat itu
  juga (tidak menunggu akhir render), pesannya menyebut segmen dan frasanya.
- Di akhir `construct`: `sinema.laporkan_pemicu(self)`; render GAGAL bila
  ada pemicu terlambat lebih dari 0,15 detik (animasi sebelumnya kepanjangan).
- Yang dipicu per kata: benda yang DISEBUT (pembilang saat disebut, lalu
  penyebut, lalu hasil), sorotan, perpindahan kamera. Kamera jangan
  menghabiskan waktu saat angka sedang dibacakan.
- Frame dibulatkan ke kisi 1/30 detik; kelebihan waktu menggagalkan render
  seperti sebelumnya.

## 5. Gambar

- 2D langsung untuk materi 2D; 3D hanya pembuka video PERTAMA tiap topik,
  maksimal 5 detik, benda nyata dari `gl.ilustrasi`.
- Sumbu bernomor berskala sama (`bidang_bernomor` atau `Axes` dengan angka;
  batas bawah kelipatan langkah). Skala tidak sama hanya bila dua besaran
  berbeda satuan (jam lawan barang), dan saat itu angka di tiap sisi yang
  menjaga kebenaran, serta video tidak meminta mata membandingkan kemiringan.
- Panel rumus boleh memudar (fade); morph lambang tidak wajib. Rumus umum
  lahir dekat gambar lalu terbang ke panel tetap dianjurkan.
- Benda kecil dari pilihan gambar: pita sub-piksel diberi kotak pembesaran;
  jangan menyatakan "terlihat" kalau tidak.
- Identitas pojok kiri atas ikut berganti tiap bidang berganti, dan
  pergantiannya BERURUTAN (lama habis dulu, baru yang baru), bukan silang.
- Sorotan: `Indicate` dengan skala bawaan untuk tulisan; untuk DAERAH pakai
  nyala kelegapan, bukan pembesaran.

## 6. Gerbang wajib sebelum render dan sesudahnya

Sebelum render pertama: `manim/cek_kode.py --dalam`, `alat/cek_waktu_adegan.py
<adegan.py>`, `alat/cek_pemicu_urut.py <adegan.py>` (jam tiap `tunggu_kata`
harus maju terus dalam satu segmen; frasa berulang yang lupa `ke=` ketahuan
di sini, bukan sesudah sembilan menit render), jangkar kata dicocokkan
(JamKata menolak frasa yang tidak ada),
`alat/cek_urutan_<topik>.py` (membaca naskah), klaim angka naskah ke pemeriksa
sympy topik.

Sesudah render (1080p60 langsung, `--hd --config_file manim/hd60.yml`;
`gabung_audio.py <video> <Adegan> --keluar <video>.mp4`):
1. `manim/cek_video.py` lalu BUKA lembar kontaknya frame per frame, termasuk
   detik PERGANTIAN identitas dan bidang, dan baca angka sumbu satu per satu;
2. `alat/cek_layar_kosong.py web/public/anim/<video>.mp4`;
3. `manim/buat_subtitle.py <video>` lalu `alat/cek_subtitle.py <video>`;
4. `alat/buat_poster.py <video> <detik>` lalu `alat/cek_aset_video.py <topik>`;
5. salinan 480p bersubtitel untuk ARYA: `gabung_audio.py ... --uji` (atau
   ffmpeg dari mp4 final) ke `media/uji-480p/<video>-bersubtitle.mp4`;
6. medan `video` di `tahap.ts`, tsc, commit kecil di cabang sendiri.

Tinjauan: video PERTAMA tiap sesi berhenti untuk ditonton dan disetujui ARYA;
sesudahnya dua sampai tiga video per kelompok. Revisi ARYA dikerjakan sesi
sendiri; MASTER hanya menggabung, memasang, dan menayangkan.

## 7. Daftar periksa sebelum lapor "selesai" (jawab ya/tidak di laporan)

1. Durasi 3 sampai 6 menit, tanpa jeda kosong lebih dari 1,5 detik.
2. Ada segar-ingat yang menyebut nomor dan nama konsep sebelumnya.
3. Tiap rumus lahir dari contoh angka yang dihitung di layar.
4. Semua pemicu kata selisih di bawah 0,15 detik (`laporkan_pemicu`).
5. Subtitle = `tulis` huruf demi huruf (`cek_subtitle` lolos), kalimat utuh.
6. Lembar kontak dibuka; angka sumbu dibaca; pergantian identitas diperiksa.
7. Widget materi yang sama DIBUKA; istilah, warna, arah sama dengan video.
8. Klaim angka naskah lolos sympy; urutan istilah lolos.
9. cek_aset_video, cek_layar_kosong, tsc lolos; medan video terpasang.
10. Keputusan yang disengaja (skala, satu papan, dan sebagainya) ditulis di
    laporan supaya ARYA tidak mengira kelalaian.
