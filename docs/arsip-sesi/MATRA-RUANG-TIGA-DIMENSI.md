# MATRA-RUANG-TIGA-DIMENSI

Kamu sesi MATRA-RUANG-TIGA-DIMENSI. Baca dan patuhi
`docs/tugas/ATURAN-SEMUA-SESI.md` SEBELUM baris mana pun di bawah ini.

## Misi
Topik **Ruang Tiga Dimensi** (geometri ruang SMA) utuh: materi bertahap
(sekitar 8-10 tahap), widget interaktif, latihan terbimbing, kuis.
Gelombang 1 = halaman saja, tanpa video.

## Sumber utama
- AWAS: `3 Dimensi.pdf` ternyata Buku Siswa Kelas XI (bilangan kompleks,
  polinomial, matriks), BUKAN geometri ruang. Sudah diperiksa sesi ini.
  Sumber yang benar-benar dipakai ada di laporanmu.
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

## Keadaan 2 Sep 2026 (ditulis MASTER dari laporanmu)

**Gelombang 1 SELESAI**: 10 materi, 9 widget 3D dengan SVG dan matriks putar
buatan sendiri, galeri 4 adegan, 4 latihan, 32 soal kuis, 70 angka lolos
`cek_ruang.py`, dikalibrasi ke lima soal UN/EBTANAS asli. Menunggu tinjauan
ARYA. Jangan memulai video.

Koreksi dari temuanmu, sudah dibetulkan MASTER: `3 Dimensi.pdf` ternyata Buku
Siswa Kelas XI, bukan geometri ruang. Rujukan di `CLAUDE.md` dan file tugasmu
sudah diperbaiki supaya sesi berikutnya tidak tertipu judul berkas itu.

Yang MASTER ambil alih: `topik.ts` baris `ruang-3d` kini resmi wilayahmu,
silakan ubah ke `siap: true` dan commit (kamu sempat mengembalikannya).
Tampilan HP diperbaiki UI/UX; setelah cabangmu diselaraskan, potret ulang 375.

Yang menunggu keputusan ARYA (dari laporanmu): galeri tahap 10 gambar sendiri
atau foto; tinjau tahap 6 dan enam soal sangat sulit.

Gelombang 2 nanti: enam video kandidat sudah di rancanganmu, dipimpin tahap 1
dan tahap 3, memakai Manim `ThreeDScene` sesuai keputusan ARYA.

Pengingat teknis untuk sesi berikutnya: port **3013**, Playwright
`-s=matra-ruang-3d`, verifikasi lewat biner Node langsung (bukan rtk).

## Gelombang 2 (dibuka ARYA 2 Sep 2026; tinjauan isi oleh MASTER)

### Vonis MASTER: LAYAK
Satu gagasan payung ("setiap soal jarak adalah soal mencari kaki tegak
lurus") diulang konsisten tahap 3 sampai 7, dan tahap 1 yang menyuruh mencoba
dulu baru membahas adalah pedagogi yang tepat untuk membongkar tipuan gambar.
Kalibrasi ke lima soal UN asli itu kekuatan, tetapi cara memakainya di halaman
belum seperti guru (revisi 1).

### Revisi isi (wajib, urut)
1. **Tiga soal UN hanya diberi jawabannya** tanpa jalan: tahap 5 ("Jawabannya
   3 akar 2"), tahap 6 ("Jawaban: 2 akar 3 cm"), tahap 9 ("Jawabannya 30
   derajat", bahkan bayangannya belum dicari). Guru tidak berhenti di jawaban.
   Tambah 3 sampai 4 baris pengerjaan tiap soal: kakinya di mana, segitiga
   mana yang dipakai, hitungannya. Atau pindahkan ke `latihan.ts` dengan
   pembahasan penuh. Angkanya lewat `cek_ruang.py`.
2. **Tahap 9 memakai tan tanpa pemanggil ulang** (STANDAR butir 1). Sebelum
   contoh AG terhadap alas, tambah satu kalimat: "Ingat dari Trigonometri
   tahap 4: tan sudut = sisi depan dibagi sisi samping pada segitiga
   siku-siku."
3. **Tahap 8 menyebut "aturan kosinus"** untuk segitiga tidak istimewa tanpa
   menuliskannya. Tuliskan rumusnya satu baris dalam `contoh` kecil beserta
   catatan sumbernya (bab Trigonometri di buku sekolah), atau ubah kalimatnya
   jadi rujukan eksplisit ke sana. Jangan menyebut alat yang tidak diberikan.
4. **Tahap 9 memuat dua ide besar** (garis-bidang, bidang-bidang) tetapi
   `coba` hanya untuk yang pertama. Tambah `coba` kedua untuk bidang-bidang
   memakai mode kedua widgetmu (geser titik P di garis potong, lihat PC tidak
   lagi tegak lurus dan sudutnya salah).
5. **Kata "mudah", "jelas", "gampang"** (12 + 4 + 2): periksa satu per satu,
   hapus yang menilai tugas siswa.
6. Galeri tahap 10 gambar sendiri atau foto: keputusan VISUAL milik ARYA.
   Biarkan seperti sekarang sampai ia bilang.

### Daftar periksa
Isi 10 butir `docs/tugas/STANDAR-MENGAJAR.md` bagian 6 untuk TIAP tahap di
laporanmu.

### Video (setelah revisi selesai)
Enam kandidat sesuai rancanganmu, urut prioritas: tahap 1, 3, 4, 6, 8, 9.
DIPERBARUI 2 Sep siang: memakai **ManimGL** lewat `manim/gl/` (Manim Community
dicabut; `ThreeDScene` tidak ada lagi, semua adegan `AdeganMatra` dan kameranya
`self.frame`). Baca `docs/tugas/STANDAR-ILUSTRASI-VIDEO.md` dan
`docs/tugas/ILMU-3B1B.md` dulu; contoh: `manim/contoh/contoh_perahu.py` dan
`manim/uji/uji_cahaya_gl.py` (permukaan bercahaya + jala + kamera terbang).
Topikmu adalah yang paling diuntungkan: bidang, balok, bola, dan irisan
(`Surface.set_clip_plane`) semuanya bercahaya dan kamera `kamera.putar_pelan`
memberi rasa ruang. Peringatan khusus 3D: `qc.periksa_adegan(self, ...)` wajib
di tiap babak pada sudut kamera awal DAN akhir; label huruf sudut menempel di
layar lewat `self.hud_tambah` atau ditempatkan dengan `Z` di atas benda supaya
tidak tertutup. Render `manimgl ... -w -l`, boleh paralel, 480p saja.
Naskah ikuti `manim/narasi/contoh-perahu.json` dan bagian 5 STANDAR-MENGAJAR.

## GELOMBANG 4 (8 Sep 2026): TULIS ULANG SEMUA VIDEO, STANDAR v3

Kamu sesi **MANTRA-3D**. Keputusan ARYA: semua video MANTRA ditulis ulang dengan
gaya Turunan 02 versi rinci (3 sampai 6 menit, segar-ingat, asal rumus
dibuktikan, narasi tenang, animasi dipicu per kata). Baca berurutan:
`docs/tugas/STANDAR-VIDEO-V3.md`, `docs/tugas/ATURAN-SEMUA-SESI.md` bagian
GELOMBANG 4, `docs/tugas/laporan/PELAJARAN-RENDER-TURUNAN-2026-09-08.md`, lalu
`docs/tugas/laporan/MANTRA-INTEGRAL.md` bagian pemangkas render.

| Hal | Nilai |
|---|---|
| Cabang | `sesi/ruang-3d` |
| Worktree | `.claude/worktrees/matra-ruang-3d` |
| Port dev server | 3013 |
| Playwright | `-s=matra-ruang-3d` |
| Contoh yang disetujui | `manim/scenes/turunan2_garis_singgung.py`, naskah `manim/narasi/turunan2-garis-singgung.json`, video `web/public/anim/turunan2-garis-singgung.mp4` |

Video yang ditulis ulang, URUT (segar-ingat bersambung dari satu ke berikutnya):

| Materi | Nama berkas video |
|---|---|
| 01 gambar-boleh-berbohong | `ruang-3d-01` |
| 03 jarak-terpendek | `ruang-3d-03` |
| 04 dua-kali-pythagoras | `ruang-3d-04` |
| 06 jarak-titik-ke-bidang | `ruang-3d-06` |
| 08 sudut-garis-bersilangan | `ruang-3d-08` |
| 09 sudut-dengan-bidang | `ruang-3d-09` |

Keenam video 1080p60 yang baru tayang ditulis ulang lagi: itu keputusan sadar ARYA. Topik ini boleh 3D sepanjang video (pengecualian standar). Segar-ingat Materi 01 mengingat Vektor 04 (panjang) dan Pythagoras SMP.

Alur tiap video: naskah 25 sampai 35 segmen dengan `teks` (ejaan ucapan) dan
`tulis` (kalimat utuh berlambang) -> `python manim/buat_narasi.py <video>` ->
adegan dengan `sinema.JamKata` dan `tunggu_kata` -> `cek_kode --dalam`,
`cek_waktu_adegan`, klaim sympy, `cek_urutan_ruang_3d` ->
render `--hd --config_file manim/hd60.yml` -> `gabung_audio <video> <Adegan>
--keluar <video>.mp4` -> lembar kontak DIBUKA -> `cek_layar_kosong`,
`buat_subtitle` + `cek_subtitle`, `buat_poster` + `cek_aset_video` ->
salinan 480p bersubtitel -> medan `video` di tahap.ts, tsc -> commit ->
lapor ke MASTER dengan sepuluh butir daftar periksa v3 terisi.

**Video PERTAMA berhenti** sampai ARYA menonton dan menyetujui di jendelamu;
sesudahnya per kelompok dua sampai tiga video. Satu render pada satu waktu.
