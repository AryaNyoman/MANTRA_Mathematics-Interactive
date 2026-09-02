# Prompt siap tempel untuk tiap sesi

Cara pakai: buka jendela sesinya, tempel prompt yang sesuai, tekan Enter.
Semua prompt di bawah aman diulang berkali-kali.

---

## FASE SEKARANG (2 Sep 2026): kelima sesi SELESAI gelombang 1

Jangan tempel "lanjutkan saja": mereka tidak punya apa-apa untuk dilanjutkan
sampai MASTER menggabungkan cabang mereka dan ARYA meninjau hasilnya.

### A. Setelah MASTER menyelaraskan cabangmu ke master (dipakai SEKALI)

Sama untuk kelima sesi:

```
Cabangmu barusan diselaraskan ke master oleh MASTER. Jalankan git log --oneline -5 dan git status untuk melihat keadaannya. Lalu baca ulang docs/tugas/ATURAN-SEMUA-SESI.md (empat aturannya berubah: port, Playwright, verifikasi, kepemilikan) dan bagian "Keadaan 2 Sep 2026" di file tugasmu. Matikan dev server lama, nyalakan lagi di port barumu. Potret ulang halamanmu di 375 piksel dengan playwright-cli -s=<nama-worktree>, BUKA potretnya, dan laporkan apakah tampilan HP-nya sudah benar setelah perbaikan UI/UX masuk. Jangan membangun apa pun yang baru.
```

### B. Kalau ARYA sudah meninjau dan minta revisi

```
ARYA sudah meninjau halamanmu. Revisinya: <tulis di sini>. Kerjakan revisi itu saja, jangan menambah hal lain. Setelah selesai: tsc, eslint, build lewat biner Node langsung, potret ulang 375 dan 1366 dengan -s=<nama-worktree>, perbarui laporanmu, commit di cabangmu. Jangan sentuh master.
```

### C. Kalau ARYA menyetujui halaman dan membuka gelombang 2 (video)

```
ARYA menyetujui halamanmu. Gelombang 2 dibuka: video 480p untuk direvisi. Ikuti "Resep lengkap" di PROGRESS.md langkah 1 sampai 6, JANGAN langkah 7 ke atas (1080p milik gelombang 3). Mulai dari daftar kandidat video di rancanganmu; kerjakan SATU video sampai lembar kontaknya kamu buka dan nilai frame per frame, baru video berikutnya. Aturan video di CLAUDE.md bagian GERBANG VIDEO berlaku penuh. Render satu per satu, jangan paralel, sebab empat sesi lain juga merender di laptop yang sama.
```

### E. PINDAH KE MANIMGL (2 Sep siang, dipakai SEKALI untuk 4 sesi topik)

```
Keputusan ARYA 2 Sep siang: Manim Community DICABUT, semua video dibuat dengan ManimGL lewat perkakas bersama manim/gl/. Video gelombang 1 gaya lama (benda = titik, latar = kotak) ditolak. Lakukan berurutan: (1) git merge master, lalu git log --oneline -5 dan git status. (2) Baca docs/tugas/ATURAN-SEMUA-SESI.md bagian "VIDEO SEJAK 2 SEP SIANG", docs/tugas/STANDAR-ILUSTRASI-VIDEO.md, docs/tugas/ILMU-3B1B.md, dan bagian "Video" yang DIPERBARUI di file tugasmu. (3) Pemanasan: manimgl manim/uji/uji_ilustrasi_gl.py Etalase -w -l, buka media/gl/Etalase.mp4 lewat cek_video.py, laporkan perkakasnya jalan. (4) Lanjutkan revisi isi yang belum selesai, lalu video PERTAMA dari daftar kandidatmu dengan resep ManimGL di PROGRESS.md "Resep lengkap": storyboard sesuai 8 aturan standar, naskah, buat_narasi, adegan AdeganMatra, cek_kode, render -l (paralel boleh), lembar kontak DIBUKA, gabung_audio --uji. Kode lama di manim/arsip-manim-ce/ jangan dicontoh. Lapor di laporanmu dengan daftar periksa STANDAR-ILUSTRASI-VIDEO.md terisi ya/tidak, commit di cabangmu, jangan sentuh master.
```

Untuk MATRA-DESAIN-UI-UX (tidak membuat video):
```
Info dari MASTER: sejak 2 Sep siang video dibuat dengan ManimGL (manim/gl/); tidak ada yang berubah di situs untukmu, kecuali nanti video baru tetap datang sebagai WebM + VTT + JPG seperti biasa. Lanjutkan tugasmu, git merge master saat sempat.
```

### D. Sesi baru dibangunkan (setelah jendela ditutup)

```
Lanjutkan. Ingat kamu sesi NAMA-SESI. Baca ulang docs/tugas/ATURAN-SEMUA-SESI.md, docs/tugas/NAMA-SESI.md bagian "Keadaan 2 Sep 2026", dan laporanmu di docs/tugas/laporan/NAMA-SESI.md. Lapor singkat posisimu sekarang sebelum menyambung kerja. Port dan nama sesi Playwright ada di file tugasmu.
```

---

## Arsip: prompt gelombang 1 (sudah dipakai, disimpan untuk topik berikutnya)

### Prompt pendek satu kalimat
```
Mulai kerja. Kerjakan gerbang rancangan dulu: susun rancangan tahap, ajukan ke saya, TUNGGU jawaban saya sebelum membangun apa pun.
```

### Prompt SETOR (saat sesi mengaku selesai gelombang 1)
```
Sebelum lapor selesai, buktikan dulu, jangan mengaku tanpa bukti:
1. node node_modules/typescript/bin/tsc --noEmit di web, tempel hasilnya
2. node node_modules/next/dist/bin/next build di web, tempel hasilnya
3. semua angka sudah lolos pemeriksa dua arah
4. semua soal salinan punya tautan sumber dan nama penulis
5. screenshot lebar 375 dan 1366 sudah kamu BUKA dan nilai, sebutkan temuannya
6. laporanmu sudah diperbarui
Kalau ada yang gagal, bilang gagal dan tempel errornya. Lalu commit rapi di cabangmu sendiri, JANGAN gabungkan ke master, itu tugas MASTER.
```
