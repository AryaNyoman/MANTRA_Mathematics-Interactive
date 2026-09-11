# MANTRA-TRIGONOMETRI

Kamu sesi MANTRA-TRIGONOMETRI. Baca dan patuhi `docs/tugas/ATURAN-SEMUA-SESI.md`
SEBELUM baris mana pun di bawah ini dikerjakan.

## GELOMBANG 4 (8 Sep 2026): TULIS ULANG SEMUA VIDEO, STANDAR v3

Kamu sesi **MANTRA-TRIGONOMETRI**. Keputusan ARYA: semua video MANTRA ditulis ulang dengan
gaya Turunan 02 versi rinci (3 sampai 6 menit, segar-ingat, asal rumus
dibuktikan, narasi tenang, animasi dipicu per kata). Baca berurutan:
`docs/tugas/STANDAR-VIDEO-V3.md`, `docs/tugas/ATURAN-SEMUA-SESI.md` bagian
GELOMBANG 4, `docs/tugas/laporan/PELAJARAN-RENDER-TURUNAN-2026-09-08.md`, lalu
`docs/tugas/laporan/MANTRA-INTEGRAL.md` bagian pemangkas render.

| Hal | Nilai |
|---|---|
| Cabang | `sesi/trigonometri-video` |
| Worktree | `.claude/worktrees/mantra-trigonometri` |
| Port dev server | 3017 |
| Playwright | `-s=mantra-trigonometri` |
| Contoh yang disetujui | `manim/scenes/turunan2_garis_singgung.py`, naskah `manim/narasi/turunan2-garis-singgung.json`, video `web/public/anim/turunan2-garis-singgung.mp4` |

Video yang ditulis ulang, URUT (segar-ingat bersambung dari satu ke berikutnya):

| Materi | Nama berkas video |
|---|---|
| 02 perbandingan-tetap | `tahap2-perbandingan-tetap` |
| 04 lahirnya-sin-cos-tan | `tahap4-lahirnya-rasio` |
| 05 lingkaran-satuan | `tahap5-lingkaran-satuan` |
| 06 enam-rasio | `tahap6-enam-rasio` |
| 07 sudut-istimewa | `tahap7-sudut-istimewa` |
| 08 grafik-sin | `tahap8-grafik-sin` |
| 09 tiga-grafik | `tahap9-tiga-grafik` |

Tujuh video lama berwadah webm dari zaman Manim Community, tanpa master H.264 dan tanpa adegan ManimGL: SEMUA dibuat baru dari nol dengan ManimGL (perkakas `manim/gl/`), bukan disunting. Naskah lamanya di `manim/narasi/tahap*.json` boleh jadi bahan, pola kerangkanya jangan ditiru. Ini topik unggulan yang dilihat pertama oleh dosen: mulai dari Materi 02, dan Materi 01 (tidak bervideo) diingat di segar-ingatnya. Nama berkas video baru: `trigonometri2-perbandingan-tetap.mp4` dst (ganti nama lama `tahapN-*`, perbarui `tahap.ts`). Prasyarat topik ini tidak ada; segar-ingat Materi 02 mengingat perbandingan dan segitiga dari SMP.

Alur tiap video: naskah 25 sampai 35 segmen dengan `teks` (ejaan ucapan) dan
`tulis` (kalimat utuh berlambang) -> `python manim/buat_narasi.py <video>` ->
adegan dengan `sinema.JamKata` dan `tunggu_kata` -> `cek_kode --dalam`,
`cek_waktu_adegan`, klaim sympy, `cek_urutan_trigonometri` ->
render `--hd --config_file manim/hd60.yml` -> `gabung_audio <video> <Adegan>
--keluar <video>.mp4` -> lembar kontak DIBUKA -> `cek_layar_kosong`,
`buat_subtitle` + `cek_subtitle`, `buat_poster` + `cek_aset_video` ->
salinan 480p bersubtitel -> medan `video` di tahap.ts, tsc -> commit ->
lapor ke MASTER dengan sepuluh butir daftar periksa v3 terisi.

**Video PERTAMA berhenti** sampai ARYA menonton dan menyetujui di jendelamu;
sesudahnya per kelompok dua sampai tiga video. Satu render pada satu waktu.
