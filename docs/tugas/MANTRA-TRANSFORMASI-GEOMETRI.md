# MANTRA-TRANSFORMASI-GEO

Kamu sesi MANTRA-TRANSFORMASI-GEO. Baca dan patuhi `docs/tugas/ATURAN-SEMUA-SESI.md`
SEBELUM baris mana pun di bawah ini dikerjakan.

## GELOMBANG 4 (8 Sep 2026): TULIS ULANG SEMUA VIDEO, STANDAR v3

Kamu sesi **MANTRA-TRANSFORMASI-GEO**. Keputusan ARYA: semua video MANTRA ditulis ulang dengan
gaya Turunan 02 versi rinci (3 sampai 6 menit, segar-ingat, asal rumus
dibuktikan, narasi tenang, animasi dipicu per kata). Baca berurutan:
`docs/tugas/STANDAR-VIDEO-V3.md`, `docs/tugas/ATURAN-SEMUA-SESI.md` bagian
GELOMBANG 4, `docs/tugas/laporan/PELAJARAN-RENDER-TURUNAN-2026-09-08.md`, lalu
`docs/tugas/laporan/MANTRA-INTEGRAL.md` bagian pemangkas render.

| Hal | Nilai |
|---|---|
| Cabang | `sesi/transformasi-geometri` |
| Worktree | `.claude/worktrees/mantra-transformasi-geometri` |
| Port dev server | 3014 |
| Playwright | `-s=mantra-transformasi` |
| Contoh yang disetujui | `manim/scenes/turunan2_garis_singgung.py`, naskah `manim/narasi/turunan2-garis-singgung.json`, video `web/public/anim/turunan2-garis-singgung.mp4` |

Video yang ditulis ulang, URUT (segar-ingat bersambung dari satu ke berikutnya):

| Materi | Nama berkas video |
|---|---|
| 01 prapeta-dan-peta | `transformasi1-setiap-titik` |
| 02 cermin-garis-lurus | `transformasi2-cermin-garis` |
| 06 rotasi | `transformasi3-rotasi` |
| 07 dilatasi | `transformasi4-dilatasi` |
| 09 matriks (transformasi5-matriks, BELUM dirujuk tahap.ts) | `transformasi5-matriks` |
| 12 komposisi-matriks | `transformasi6-urutan` |

Pertanyaan "perbaiki 05 dan 06 dulu atau render apa adanya" gugur: semuanya ditulis ulang. Temuan isi area kerja (05 dan 06 hanya 1,7 persen) dipakai sebagai patokan: tata rumus versi baru semua ke panel. Materi 9 belum merujuk `transformasi5-matriks.mp4` di `tahap.ts`; betulkan saat videonya jadi. Boleh 3D untuk pembuka (topik ini pengecualian).

Alur tiap video: naskah 25 sampai 35 segmen dengan `teks` (ejaan ucapan) dan
`tulis` (kalimat utuh berlambang) -> `python manim/buat_narasi.py <video>` ->
adegan dengan `sinema.JamKata` dan `tunggu_kata` -> `cek_kode --dalam`,
`cek_waktu_adegan`, klaim sympy, `cek_urutan_transformasi_geometri` ->
render `--hd --config_file manim/hd60.yml` -> `gabung_audio <video> <Adegan>
--keluar <video>.mp4` -> lembar kontak DIBUKA -> `cek_layar_kosong`,
`buat_subtitle` + `cek_subtitle`, `buat_poster` + `cek_aset_video` ->
salinan 480p bersubtitel -> medan `video` di tahap.ts, tsc -> commit ->
lapor ke MASTER dengan sepuluh butir daftar periksa v3 terisi.

**Video PERTAMA berhenti** sampai ARYA menonton dan menyetujui di jendelamu;
sesudahnya per kelompok dua sampai tiga video. Satu render pada satu waktu.
