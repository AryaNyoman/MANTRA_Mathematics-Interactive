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
