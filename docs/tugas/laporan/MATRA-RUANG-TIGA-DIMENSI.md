# Laporan MATRA-RUANG-TIGA-DIMENSI

Terakhir: 2 September 2026, dini hari
Cabang: `sesi/ruang-3d` · Worktree: `.claude/worktrees/matra-ruang-3d`

## Selesai

**Gerbang rancangan lewat, disetujui ARYA.**
Rancangannya: `docs/superpowers/specs/2026-09-01-ruang-3d-alur-belajar.md`.
Keputusan ARYA:

| Pertanyaan | Jawaban |
|---|---|
| Cara menggambar 3D di widget | **SVG buatan sendiri + matriks putar**, bukan three.js |
| Video 3D-nya | tetap Manim `ThreeDScene`, gelombang 2, tidak berubah |
| Sumber materi | **tunggu ARYA mencarikan PDF dimensi tiga** |
| Daftar tahap | **setuju, 10 tahap** seperti di rancangan |
| Sambil menunggu | kerjakan alat cek DAN mesin gambar widget |

**`alat/cek_ruang.py`** (baru). Memeriksa jarak, sudut, dan kedudukan pada
kubus, balok, limas, atau titik sembarang, dengan sympy dan lewat koordinat.
Rumus jalan pintas yang akan diajarkan ke siswa (luas segitiga, volume limas)
sengaja tidak dipakai di dalamnya, supaya pemeriksaannya bebas dari cara yang
sedang diperiksa. Dibuat SEBELUM satu soal pun ditulis.

Uji bawaan `python alat/cek_ruang.py --uji`, sudah dijalankan, kode keluar 0:
20 jawaban benar lolos semua, dan 4 jawaban yang sengaja disalahkan ditolak
semua. Alat yang tidak menolak jawaban salah tidak ada gunanya, jadi penolakan
itu ikut diuji.

**`web/components/widget/ruang-3d/ruang.ts`** (baru). Mesin gambarnya:
matriks putar, proyeksi ortografis, kubus dan balok siap pakai dengan penamaan
ABCD.EFGH yang sama persis dengan `cek_ruang.py`, deteksi rusuk terhalang untuk
digambar putus putus, dan bingkai otomatis berupa bola pembungkus.

Bingkainya sengaja bola, bukan kotak. Kotak batas ikut berubah tiap kali kubus
diputar, sehingga gambarnya mengembang dan mengempis sendiri selama ditarik,
dan penunjuk skalanya ikut goyang. Bola pembungkus tidak berubah oleh putaran,
jadi gambar dijamin tidak pernah terpotong DAN skalanya tetap.

**`web/components/widget/ruang-3d/KubusPutar.tsx`** (baru). Widget tahap 1.
Kubus rusuk 6 yang bisa ditarik dengan tetikus atau jari. Ruas BD di alas dan
EG di tutup disorot: pada sudut awal keduanya tampak berpotongan, padahal
bersilangan dengan jarak 6 satuan. Keterangan di bawah gambar hidup mengikuti
putaran, menyebut yang TERLIHAT dan yang SEBENARNYA sekaligus.

**`web/components/topik/PanggungRuang3D.tsx`** (baru, berkas baru saja, tidak
menyentuh berkas panggung milik topik lain) dan rangka isi
`web/content/ruang-3d/` dengan tahap 1 saja, plus satu baris entri di
`web/content/daftar-isi.ts`.

### Cacat yang ditemukan dengan MELIHAT potret layar, bukan dari log

Ketiganya lolos dari `tsc` tanpa satu pun galat:

| Cacat | Sebabnya | Keadaan |
|---|---|---|
| Baris "sebenarnya: ..." bertindih dengan penunjuk skala | keduanya ditaruh di baris paling bawah, satu rata kiri satu rata kanan, dan yang kiri kepanjangan | diperbaiki, tata letak keterangan disusun ulang |
| Sudut awal salah, kedua ruas justru **tampak terpisah**, sehingga tipuan yang mau ditunjukkan tahap ini tidak pernah terjadi | sudut awal disalin dari nilai bersama, tidak pernah diperiksa apakah ilusinya benar terjadi di situ | diperbaiki. Batasnya DIHITUNG dengan menyapu seluruh sudut: BD dan EG hanya tampak berpotongan kalau tinggi mata di atas 52 derajat. Sudut awal dipasang 64 derajat |
| Menarik kubus ikut menyorot huruf A sampai H jadi biru | SVG tidak diberi `userSelect: none` | diperbaiki |

### Verifikasi yang sudah dijalankan dan DILIHAT

- `python alat/cek_ruang.py --uji` → kode keluar 0, hasilnya dibaca.
- `rtk proxy "npx tsc --noEmit"` → kode keluar 0.
- `rtk proxy "npm run build"` → kode keluar 0, 15 halaman terbangun.
- Potret layar 1366 dan 768 piksel, dibuka dan dinilai satu per satu.
- Tarikan tetikus diuji sungguhan: putar berubah dari -34 ke -59 derajat,
  tinggi mata dari 64 ke 30 derajat, dan tulisannya ikut berubah dari
  "tampak berpotongan" menjadi "tampak terpisah". Jadi widget ini memang
  bereaksi, bukan cuma tampil.

## Sedang dikerjakan

Tidak ada. Sembilan tahap sisanya menunggu sumber materi dari ARYA.

## Butuh MASTER

1. **`web/content/topik.ts`, entri `ruang-3d`: `siap: false` → `siap: true`.**
   Belum boleh sekarang, halamannya baru berisi satu tahap. Diminta nanti,
   saat topiknya sudah utuh. Untuk memotret, berkas itu sempat diubah lokal
   lalu **sudah dikembalikan**; `git status` bersih untuk berkas itu.

2. **Warna sudut di `CLAUDE.md` dan `PROGRESS.md` sudah basi.** Keduanya masih
   menulis sudut `#D9A441`, padahal `web/lib/warna.ts` sudah menggantinya
   menjadi `#6A4C93` karena kuning di atas krem kontrasnya cuma 2,04 banding 1.
   Saya ikut berkas kode. Dua dokumen itu milik MASTER, tolong disamakan supaya
   sesi berikutnya tidak memakai warna yang salah.

3. **HALAMAN TOPIK RUSAK DI LEBAR HP, DAN INI SUDAH TAYANG.** Bukan cacat
   widget saya: topik **Limit yang sudah di-deploy** rusak persis sama di 375
   piksel. Kolom kiri dan kanan saling menimpa, tulisan terpotong, widgetnya
   tidak terlihat sama sekali.

   Sebabnya `.panggung` di `web/app/globals.css` baris 194:
   `grid-template-columns: minmax(0, 1.22fr) minmax(24rem, 0.78fr)`.
   Kolom kanan dipaksa minimal 24rem, yaitu 384 piksel, sehingga tata letaknya
   menuntut lebar sekitar 700 piksel ke atas. Di seluruh berkas itu hanya ada
   SATU media query, `max-width: 640px`, dan isinya cuma merapikan satu daftar
   milik widget Limit. Jadi halaman topik praktis tidak punya tata letak HP.

   Diuji: 1366 baik, 768 baik, 375 rusak. Berkas itu milik MATRA-DESAIN-UI-UX,
   jadi saya tidak menyentuhnya. Tolong diteruskan ke sesi itu, dan menurut saya
   ini yang paling mendesak dari semua yang saya temukan hari ini, sebab
   kemungkinan besar siswa membukanya dari HP.

## Butuh keputusan ARYA

1. **PDF dimensi tiga.** Sembilan tahap sisanya menunggu ini. Yang sudah saya
   periksa dan TIDAK memuat materinya: `3 Dimensi.pdf` (ternyata Buku Siswa
   Kelas XI: Bilangan Kompleks, Polinomial, Matriks),
   `Matematika_BS_KLS_XII_Rev.pdf`, Buku Guru Kelas 10, Buku Guru Kelas 11.

2. **5 sampai 10 soal dimensi tiga asli** sebagai patokan tingkat kesulitan.
   Boleh soal sekolah, buku bimbel, atau seleksi masuk kuliah. Tanpa itu,
   tingkat kesulitan soal buatan saya adalah tebakan, dan sejarahnya soal
   buatan Claude di proyek ini cenderung terlalu mudah. mathcyber1997 diblokir
   pemeriksa bot dan tidak akan saya terobos.
