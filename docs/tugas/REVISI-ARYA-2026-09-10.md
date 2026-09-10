# Revisi ARYA, 10 September 2026 (dicatat dulu, belum dikerjakan)

Sumber: pesan ARYA di sesi MASTER, 10 Sep 2026, dengan tiga tangkapan layar
(kartu Peta Materi, kepala Materi 01 Vektor, bilah navigasi). Dicatat apa
adanya sebelum brainstorming; keputusan hasil brainstorming ditambahkan di
bagian akhir.

## A. Perubahan cara kerja (berlaku SEKARANG)

1. **MASTER dilarang mengirim tugas atau pesan ke sesi lain.** Semua revisi
   ke depan dikerjakan MASTER sendiri. Yang boleh MASTER lakukan pada cabang
   sesi hanya memperbaiki CATATANNYA. Ditegaskan dua kali: "STOP UNTUK
   MENGIRIMKAN TUGAS/MESSAGE KE SESI LAIN".
2. Semua revisi di bawah DICATAT dulu, dibahas (brainstorming), baru dikerjakan.

## B. Tampilan desktop, berlaku universal

3. **Logo di bilah navigasi**: cukup lambang "M" saja, tanpa tulisan MANTRA.
4. **Jangan menyebut "Kurikulum Merdeka"** di mana pun: kurikulum itu sudah
   tidak ada; anggap semua pembelajaran di sini untuk umum.
   (Ditemukan di Peta Materi: "Susunan sub-bab mengikuti bab buku Kurikulum
   Merdeka"; label kartu "BUKU K10 BAB 4"; kepala `subbab.ts`.)
5. **Tombol "Lanjutkan"** dipindah ke samping menu "Peta Materi" (jangan
   terpisah di kanan, siswa tidak melihatnya). Saat ditekan: DROPDOWN kemajuan
   tiap bab, dengan persentase yang BERANIMASI dari 0 ke nilainya. Alasannya:
   siswa yang belajar tidak berurutan bingung kalau tombol hanya punya satu
   tujuan; dengan dropdown terlihat bab mana yang belum 100 persen.
   Tampilkan hanya 4 bab, sisanya digulir di dalam dropdown.
6. **Pertanyaan di bawah judul bab di Peta Materi** (foto 1) tidak mewakili
   seluruh bab (contoh: Vektor "Kenapa dua panah bisa dijumlahkan?" hanya
   soal penjumlahan). Pilihannya: dihapus semua, atau diganti pertanyaan UMUM
   yang mencakup satu bab (contoh yang baik: Grafik Fungsi Materi 02 "Setiap
   gambar di bidang koordinat itu grafik fungsi, bukan?"). Berlaku HANYA di
   Peta Materi; pertanyaan di dalam halaman materi (foto 2) tetap, karena
   memang merujuk materi itu saja.
7. **Kata "Tahap 01, 02, ..." diganti "Materi 01, 02, ..."** di semua tempat,
   termasuk di dalam teks materi ("saya masih banyak melihatnya di sana").
8. **Judul materi ditaruh DI ATAS videonya** (untuk materi yang punya video),
   di tampilan desktop maupun HP.

## C. Video (berlaku semua 58 video, menambah STANDAR-VIDEO-V3)

9. **Narasi tidak menyebut judul materi di awal video**; menyebut NAMA SUB-BAB
   plus "Bagian n" (n = urutan materi di dalam sub-bab itu). Contoh Grafik
   Fungsi: A "Pengenalan Fungsi dan Grafik" (2 materi), B "Fungsi Kuadrat"
   (3), C "Transformasi Fungsi" (2): yang diucapkan dan ditulis di video
   "Pengenalan Fungsi dan Grafik, Bagian 1", "Pengenalan Fungsi dan Grafik,
   Bagian 2", "Fungsi Kuadrat, Bagian 1", ..., "Transformasi Fungsi, Bagian 2".
   Sekalian: nama sub-bab A Grafik Fungsi "Fungsi dan Grafiknya" diganti
   "Pengenalan Fungsi dan Grafik".
10. **Segar-ingat menyebut sub-bab dan bagian video sebelumnya**, bukan judul
    materinya: bukan "Di materi sebelumnya, Grafik itu Bercerita" (tidak jelas
    materi mana), melainkan "Di materi sebelumnya, Pengenalan Fungsi dan
    Grafik, Bagian 1". Penomoran "Materi 01 sampai 13" di HALAMAN tetap
    boleh; yang disorot hanya PENGUCAPAN di video.
11. **Pythagoras hanyalah CONTOH**, bukan landasan wajib segar-ingat. Yang
    terjadi: hampir semua video memaksakan Pythagoras padahal materinya tidak
    perlu mengingatnya, "jadi jelek semua videonya". Aturannya: segar-ingat
    mengingat prasyarat NYATA materi itu; kalau tidak ada yang perlu diingat,
    jangan dipaksakan.
12. **Narasi video mengucapkan "materi", bukan "tahap"** (tambahan ARYA,
    balasan kedua). Berlaku untuk semua kalimat narasi dan subtitle.

## C2. Kebersihan proyek (tambahan ARYA, balasan kedua)

13. **Rapikan seisi proyek**: berkas yang tidak dipakai atau dobel boleh
    dihapus; berkas yang mungkin masih dipakai dipindahkan ke folder backup.
    Prosedur: MASTER menyusun daftar dulu (hapus / backup / tetap, dengan
    ukuran), ARYA menyetujui daftarnya, baru dieksekusi. Tidak ada
    penghapusan tanpa daftar yang disetujui.

## D. Yang belum jelas, dibawa ke brainstorming

- Nasib delapan sesi yang sedang berjalan dan hasil v3 mereka (Turunan 01
  sampai 04, Transformasi 01 dan 02 sedang dirender): dihentikan ARYA (MASTER
  tidak boleh mengirim pesan), lalu MASTER mengambil alih cabangnya?
- Nama sub-bab tiap topik perlu ditinjau ulang dulu (jadi judul yang
  diucapkan di video); daftar usulan untuk disetujui ARYA.
- Pertanyaan bab di Peta Materi: dihapus atau diganti pertanyaan umum; dan
  label sumber buku ("BUKU K10 BAB 4") ikut dihapus atau tidak.
- Judul pembuka DI LAYAR video: "Fungsi Kuadrat, Bagian 2" saja, atau tetap
  ada "Materi 05" kecil di pojok identitas.

## E. Keputusan hasil brainstorming (balasan ARYA, 10 Sep)

1. **Pembagian kerja: pilihan (a).** Sesi tetap menulis videonya. MASTER
   mengambil alih URUSAN CABANG: pergi ke tiap worktree, meng-commit pekerjaan
   yang belum di-commit, memasukkan ke master yang belum ada di master, lalu
   mengganti semua berkas catatan (md) langsung di cabang masing-masing.
   Tetap tanpa mengirim pesan ke sesi mana pun.
2. **Pertanyaan bab di Peta Materi: pilihan (a)**, diganti satu pertanyaan
   umum per bab; MASTER menyusun sembilan, ARYA menyetujui sekaligus.
3. **Turunan 01 sampai 04 dibiarkan dulu**, tidak dirender ulang sekarang.

## F. Usulan MASTER yang menunggu persetujuan ARYA

### F1. Nama sub-bab yang DIUCAPKAN di video (satu sumber: `web/content/subbab.ts`)

Aturan: nama di sidebar, Peta Materi, dan narasi SAMA; "Bagian n" = urutan
materi di dalam sub-babnya (dihitung dari `nomor` di `subbab.ts`); sub-bab
yang isinya satu materi diucapkan tanpa "Bagian"; sub-bab Penerapan diucapkan
dengan nama topiknya ("Penerapan Vektor").

| Topik | Sekarang | Usulan |
|---|---|---|
| Vektor A | Pengertian, notasi, jenis vektor | Pengenalan Vektor |
| Vektor B | Vektor dan sistem koordinat | Vektor dalam Sistem Koordinat |
| Vektor C | Operasi vektor | Operasi Vektor |
| Vektor D | Perkalian titik dan proyeksi | Perkalian Titik dan Proyeksi |
| Grafik Fungsi A | Fungsi dan grafiknya | Pengenalan Fungsi dan Grafik (permintaan ARYA) |
| Grafik Fungsi D | Eksponen dan logaritma | Fungsi Eksponen dan Logaritma |
| Grafik Fungsi E | Rasional, komposisi, invers | Fungsi Rasional, Komposisi, dan Invers |
| Ruang 3D A | Kedudukan titik, garis, bidang | Kedudukan Titik, Garis, dan Bidang |
| Limit B | Sifat dan cara menghitung | Sifat Limit dan Cara Menghitungnya |
| Turunan C | Turunan membaca grafik | Turunan untuk Membaca Grafik |
| semua "Penerapan" | Penerapan | Penerapan + nama topik (Integral: 3 materi, jadi "Penerapan Integral, Bagian 1 sampai 3") |
| sisanya | huruf kecil campur | nama sama, ditulis Huruf Besar Tiap Kata |

### F2. Pertanyaan umum per bab di Peta Materi

| Bab | Pertanyaan |
|---|---|
| Trigonometri | Kenapa satu sudut cukup untuk menghitung tinggi gedung sampai bentuk gelombang? |
| Vektor | Kenapa arah harus ikut dihitung, bukan hanya besarnya? |
| Grafik Fungsi | Bagaimana rumus berubah menjadi gambar, dan gambar kembali menjadi rumus? |
| Statistika | Bagaimana ribuan angka bisa diringkas jadi satu cerita yang jujur? |
| Ruang 3D | Bagaimana mengukur jarak dan sudut di dalam ruang, bukan hanya di atas kertas? |
| Limit | Apa yang terjadi pada sebuah nilai ketika kita mendekat tetapi tidak pernah sampai? |
| Transformasi Geometri | Kalau bangun digeser, dicerminkan, atau diputar, apa yang tetap dan apa yang berubah? |
| Turunan | Seberapa cepat sesuatu berubah tepat pada satu saat? |
| Integral | Bagaimana potongan kecil yang tak terhingga banyaknya bisa dijumlahkan jadi satu luas? |

### F3. Urutan pengerjaan yang diusulkan

1. Urusan cabang (hari ini): commit pekerjaan sesi yang belum di-commit,
   gabung ke master yang lolos `tsc` dan pemeriksa, tulis catatan baru di
   master (STANDAR-VIDEO-V3 bagian v3.1, CLAUDE.md, PROMPT-SIAP-TEMPEL,
   ATURAN-SEMUA-SESI, nama sub-bab di `subbab.ts`), lalu `git merge master`
   di tiap worktree supaya tiap cabang memegang catatan yang sama.
2. Paket situs: logo, hapus Kurikulum Merdeka, Tahap ke Materi, judul di atas
   video, Lanjutkan berdropdown, pertanyaan bab.
3. Kebersihan proyek: daftar dulu, disetujui, baru dieksekusi.
