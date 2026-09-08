# MANTRA-LIMIT

Kamu sesi MANTRA-LIMIT. Baca dan patuhi `docs/tugas/ATURAN-SEMUA-SESI.md`
SEBELUM baris mana pun di bawah ini dikerjakan.

## GELOMBANG 4 (8 Sep 2026): TULIS ULANG SEMUA VIDEO, STANDAR v3

Kamu sesi **MANTRA-LIMIT**. Keputusan ARYA: semua video MANTRA ditulis ulang dengan
gaya Turunan 02 versi rinci (3 sampai 6 menit, segar-ingat, asal rumus
dibuktikan, narasi tenang, animasi dipicu per kata). Baca berurutan:
`docs/tugas/STANDAR-VIDEO-V3.md`, `docs/tugas/ATURAN-SEMUA-SESI.md` bagian
GELOMBANG 4, `docs/tugas/laporan/PELAJARAN-RENDER-TURUNAN-2026-09-08.md`, lalu
`docs/tugas/laporan/MANTRA-INTEGRAL.md` bagian pemangkas render.

| Hal | Nilai |
|---|---|
| Cabang | `sesi/limit-video` |
| Worktree | `.claude/worktrees/mantra-limit` |
| Port dev server | 3018 |
| Playwright | `-s=mantra-limit` |
| Contoh yang disetujui | `manim/scenes/turunan2_garis_singgung.py`, naskah `manim/narasi/turunan2-garis-singgung.json`, video `web/public/anim/turunan2-garis-singgung.mp4` |

Video yang ditulis ulang, URUT (segar-ingat bersambung dari satu ke berikutnya):

| Materi | Nama berkas video |
|---|---|
| 01 kecepatan-sesaat | `limit1-kecepatan` |
| 02 mendekati | `limit2-mendekati` |
| 04 lubang | `limit4-lubang` |
| 06 nol-per-nol | `limit6-nolpernol` |
| 07 tak-hingga | `limit7-takhingga` |
| 08 limit-sinus | `limit8-sinus` |
| 09 kontinu | `limit9-kontinu` |

Tujuh video lama webm dari zaman Manim Community: adegan ManimGL-nya belum ada, buat baru dari nol; naskah lama `manim/narasi/limit*.json` boleh jadi bahan. Nama berkas tetap `limitN-*.mp4`. Segar-ingat Materi 01 mengingat Grafik Fungsi (membaca grafik) dan pengalaman speedometer; Turunan 01 nanti mengingat Limit 01, jadi jaga istilah "kecepatan sesaat" dan "selang yang menyusut".

Alur tiap video: naskah 25 sampai 35 segmen dengan `teks` (ejaan ucapan) dan
`tulis` (kalimat utuh berlambang) -> `python manim/buat_narasi.py <video>` ->
adegan dengan `sinema.JamKata` dan `tunggu_kata` -> `cek_kode --dalam`,
`cek_waktu_adegan`, klaim sympy, `cek_urutan_limit` ->
render `--hd --config_file manim/hd60.yml` -> `gabung_audio <video> <Adegan>
--keluar <video>.mp4` -> lembar kontak DIBUKA -> `cek_layar_kosong`,
`buat_subtitle` + `cek_subtitle`, `buat_poster` + `cek_aset_video` ->
salinan 480p bersubtitel -> medan `video` di tahap.ts, tsc -> commit ->
lapor ke MASTER dengan sepuluh butir daftar periksa v3 terisi.

**Video PERTAMA berhenti** sampai ARYA menonton dan menyetujui di jendelamu;
sesudahnya per kelompok dua sampai tiga video. Satu render pada satu waktu.
