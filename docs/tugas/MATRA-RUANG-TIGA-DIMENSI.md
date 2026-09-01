# MATRA-RUANG-TIGA-DIMENSI

Kamu sesi MATRA-RUANG-TIGA-DIMENSI. Baca dan patuhi
`docs/tugas/ATURAN-SEMUA-SESI.md` SEBELUM baris mana pun di bawah ini.

## Misi
Topik **Ruang Tiga Dimensi** (geometri ruang SMA) utuh: materi bertahap
(sekitar 8-10 tahap), widget interaktif, latihan terbimbing, kuis.
Gelombang 1 = halaman saja, tanpa video.

## Sumber utama
- `D:\BAHAN MATEMATIKA\3 Dimensi.pdf` dan `D:\BAHAN MATEMATIKA\Matematika_BS_KLS_XII_Rev.pdf` (khusus topikmu, cek dulu isinya)
- Buku Guru 10 & 11 kalau babnya ada; kalau topik ini ternyata kelas 12,
  pakai big book SMA + https://mathcyber1997.com + diktat ITB, dan catat
  sumber tiap soal. Verifikasi penempatan kurikulum sendiri, jangan menebak.

## KEPUTUSAN WAJIB DI GERBANG RANCANGAN: cara menggambar 3D
Aturan proyek: widget dibuat sendiri dengan SVG + React (2D). Topikmu
satu-satunya yang butuh kesan ruang. Di gerbang rancangan, ajukan ke ARYA
pilihan ini dengan jujur:
1. **Proyeksi isometrik/kabinet dengan SVG buatan sendiri (rekomendasi):**
   konsisten dengan aturan proyek, tanpa ketergantungan baru, cukup untuk
   kubus/balok/limas dan garis-garis di dalamnya. Rotasi bebas terbatas.
2. **Pustaka 3D (mis. three.js):** rotasi bebas sungguhan, tapi menambah
   ketergantungan besar, gaya visualnya harus dipaksa cocok "Studio Teknis",
   dan menyalahi pola widget yang ada.
JANGAN membangun sebelum ARYA memilih.

## Batas wilayah dengan MATRA-VEKTOR
Milikmu: kedudukan titik/garis/bidang, jarak (titik-garis, titik-bidang,
garis-bidang), sudut di bangun ruang, proyeksi pada bidang. Milik mereka:
aljabar vektor dan operasinya. Kalau butuh vektor sebagai alat hitung jarak,
pakai seperlunya dan rujuk silang, jangan mengajarkannya ulang.

## Folder milikmu
`web/content/ruang-3d/`, `web/components/widget/ruang-3d/`,
satu baris entri di `daftar-isi.ts`,
laporan `docs/tugas/laporan/MATRA-RUANG-TIGA-DIMENSI.md`.

## Ide widget (silakan nilai ulang saat merancang)
- Kubus transparan: titik sudut bisa dipilih dua, ruas dan jaraknya tampil.
- Jarak titik ke bidang: garis tegak lurusnya digambar, bukan cuma angkanya.
- Irisan bidang pada kubus (kalau masuk rancangan; berat, boleh ditunda).
Semua jarak/sudut contoh dicek sympy. Ingat aturan bingkai + penunjuk skala.
