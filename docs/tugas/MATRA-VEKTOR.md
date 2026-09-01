# MATRA-VEKTOR

Kamu sesi MATRA-VEKTOR. Baca dan patuhi `docs/tugas/ATURAN-SEMUA-SESI.md`
SEBELUM baris mana pun di bawah ini dikerjakan.

## Misi
Topik **Vektor** utuh selevel SMA (Kurikulum Merdeka; verifikasi sendiri
penempatan kelasnya di Buku Guru, jangan percaya ingatan): materi bertahap
(sekitar 8-10 tahap), widget interaktif per tahap yang butuh, latihan
terbimbing, dan kuis. Gelombang 1 = halaman saja, tanpa video.

## Sumber utama
- `D:\BAHAN MATEMATIKA\Buku Matematika Kelas 10 - Guru.pdf` dan `Kelas 11 - Guru.pdf` (cari bab vektor)
- `D:\SEKOLAH S1 & S2\S1\matematika\kalkulus 2.pdf` (istilah Indonesia yang benar)
- Big book SMA (level bahasa) dan https://mathcyber1997.com (kalibrasi soal)

## Cakupan yang diharapkan (rancanganmu boleh berbeda, ajukan ke ARYA)
Dari pengertian vektor sebagai besaran berarah, notasi dan komponen,
penjumlahan/pengurangan (segitiga dan jajar genjang), perkalian skalar,
vektor satuan dan panjang, perkalian titik dan sudut antar vektor, proyeksi,
sampai penerapan (perpindahan, kecepatan). Utamakan visual 2D.

## Batas wilayah dengan MATRA-RUANG-TIGA-DIMENSI
Milikmu: konsep dan operasi vektor (panggung utama 2D; komponen 3D boleh
muncul sebagai angka). Milik mereka: kedudukan, jarak, dan sudut pada bangun
ruang. Ragu soal batas? Tulis di laporan bagian "Butuh MASTER", jangan rebutan.

## Folder milikmu
`web/content/vektor/`, `web/components/widget/vektor/`, satu baris entri di
`daftar-isi.ts`, laporan `docs/tugas/laporan/MATRA-VEKTOR.md`.

## Ide widget (silakan nilai ulang saat merancang)
- Penjumlahan vektor: dua anak panah bisa digeser, resultan mengikuti.
- Perkalian titik: sudut diputar, nilai a.b dan proyeksinya hidup.
- Komponen: vektor dipecah ke sumbu, segitiga siku-sikunya terlihat.
Ingat aturan bingkai: gambar tidak boleh terpotong, penunjuk skala wajib.

## Keadaan 2 Sep 2026 (ditulis MASTER dari laporanmu)

**Gelombang 1 SELESAI**: 12 materi, 11 widget, 4 latihan, 32 soal kuis, 116
angka lolos pemeriksa dua arah. Menunggu tinjauan ARYA. Jangan memulai video.

Yang MASTER ambil alih dari daftar "Butuh MASTER"-mu:
- `topik.ts` dan `latihan/vektor/page.tsx`: keduanya kini RESMI wilayahmu
  (lihat tabel kepemilikan yang baru). Tidak dianggap pelanggaran.
- Alat bingkai kembar (`limit/koordinat.ts` vs `vektor/geometri.ts`): akan
  dinaikkan ke folder bersama SETELAH semua topik tergabung, oleh MASTER.
- Tampilan HP: sudah diperbaiki sesi UI/UX di cabangnya, masuk master lewat
  penggabungan. Setelah cabangmu diselaraskan ke master, potret ulang 375
  piksel dan nilai lagi; itu satu-satunya syarat gelombang 1 yang belum
  terpenuhi secara berarti.

Yang menunggu keputusan ARYA (dari laporanmu): foto pesawat berlogo DHL, dan
nasib Materi 11 dan 12 yang di luar kurikulum.

Pengingat teknis untuk sesi berikutnya: port **3010**, Playwright
`-s=matra-vektor`, verifikasi lewat biner Node langsung (bukan rtk).

## Gelombang 2 (dibuka ARYA 2 Sep 2026; tinjauan isi oleh MASTER)

### Vonis MASTER: LAYAK
Urutannya benar dan beralasan (Pythagoras bukan trigonometri, sebab Bab 3
mendahului Bab 4). Tiap materi prosedural punya `contoh` yang tiap barisnya
menyebut apa dan kenapa, plus `coba` berpenuntun. Sering keliru bersumber ke
buku. Ini sudah cara guru menjelaskan. Revisi di bawah ini kecil, kerjakan
SEBELUM video.

### Revisi isi (wajib, urut)
1. **Kata ganti: "kamu" jadi "Anda"** di 7 tempat. Lima topik lain memakai
   "Anda", termasuk Trigonometri dan Limit yang sudah tayang. Situs harus satu
   suara.
2. **Materi 11, cara kedua memakai kosinus** padahal topik ini sengaja tidak
   mengandaikan trigonometri. Tambah satu kalimat prasyarat sebelum daftar dua
   cara: "Cara kedua memakai kosinus sudut. Kalau belum kenal, baca
   Trigonometri tahap 4 dulu, atau pakai cara pertama saja."
3. **Materi 10, paragraf terakhir** ("Keempat foto berlisensi terbuka ...
   sumber.json") adalah teks meta, bukan pelajaran; guru tidak membacakan
   catatan kaki di tengah kelas. Pindahkan jadi keterangan kecil di bawah
   galeri (di widgetnya), hapus dari `penjelasan`.
4. **Materi 05, contoh 2i + 2j - k** melompat ke ruang. Simpulnya sudah jujur
   soal gambar; tambahkan satu kalimat SEBELUM contohnya: "Ini bocoran saja,
   tidak diuji sampai topik Ruang Tiga Dimensi."
5. **Kata "mudah", "jelas", "gampang"** (13 + 3 + 2 kemunculan): periksa satu
   per satu. Boleh kalau menggambarkan benda ("gambar yang jelas"); hapus
   kalau menilai tugas siswa ("ini mudah"). Catat jumlah yang dihapus.
6. Foto pesawat DHL dan nasib Materi 11 dan 12: keputusan VISUAL dan cakupan,
   milik ARYA. Biarkan sampai ia bilang.

### Daftar periksa
Isi 10 butir `docs/tugas/STANDAR-MENGAJAR.md` bagian 6 untuk TIAP materi di
laporanmu. Materi yang dapat "tidak" di butir 1, 3, 4, atau 6 diperbaiki dulu.

### Video (setelah revisi selesai)
Enam kandidat, urut prioritas. Kerjakan SATU sampai lembar kontaknya kamu
buka dan nilai frame per frame, baru berikutnya:
1. Materi 01 perahu: 3 tambah 4 bisa 7, 5, atau 1 (pembuka seluruh topik)
2. Materi 06 segitiga: ujung ke pangkal, panah menyambung lalu resultan menutup
3. Materi 08 selisih: panah dari ujung b ke ujung a, alasan "ujung dikurangi pangkal"
4. Materi 03 komponen: satu panah jadi dua langkah, mendatar lalu tegak
5. Materi 09 kali skalar: pengali melewati nol, panah lenyap lalu berbalik
6. Materi 04 Pythagoras: segitiga siku-siku yang selalu terbentuk

Naskah 10 sampai 12 segmen, 90 sampai 125 detik, ikuti pola
`manim/narasi/limit*.json` dan bagian 5 STANDAR-MENGAJAR (satu gagasan per
segmen, sebut yang sedang tampil, tanya lalu jeda lalu jawab). Render 480p
saja lewat `python alat/antre_render.py matra-vektor -- manim -ql ...`.
