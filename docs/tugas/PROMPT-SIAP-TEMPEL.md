# Prompt siap tempel untuk tiap sesi

Cara pakai: buka jendela sesinya, tempel prompt yang sesuai, tekan Enter.
Semua prompt di bawah aman diulang berkali-kali.

---

## 0. Prompt PENDEK (yang biasanya dipakai)

Sesi yang dinyalakan lewat `.bat` atau `alat/nyalakan-sesi.ps1` SUDAH diberi
identitas dan penunjuk file tugasnya, jadi cukup satu kalimat ini, sama untuk
kelima sesi:

```
Mulai kerja. Kerjakan gerbang rancangan dulu: susun rancangan tahap, ajukan ke saya, TUNGGU jawaban saya sebelum membangun apa pun.
```

Anak kalimat soal gerbang itu SENGAJA ada. Sesi berjalan mode AUTO tanpa
pengawas per langkah; kalau satu sesi lalai membaca gerbangnya, ia bisa
membangun sejam sebelum bertanya. Sisa aturannya sudah ada di file tugas
masing-masing, tidak perlu diulang.

Prompt panjang di bawah dipakai hanya kalau sebuah sesi terbukti melenceng,
atau saat sesi dimulai dari nol tanpa kalimat pembuka.

---

## 1. Prompt MULAI (dipakai sekali, saat sesi pertama kali disuruh bekerja)

### MATRA-VEKTOR
```
Mulai bekerja. Baca docs/tugas/ATURAN-SEMUA-SESI.md lalu docs/tugas/MATRA-VEKTOR.md sampai habis, dan patuhi keduanya.

Gelombang 1 kamu: HALAMAN saja, tanpa video sama sekali.

Sekarang kerjakan gerbang rancangan lebih dulu, jangan membangun apa pun: bedah bab vektor di Buku Guru Kelas 10 dan Kelas 11 (dua berkas terpisah di D:\BAHAN MATEMATIKA), susun rancangan tahap topik vektor, tulis ke docs/superpowers/specs/, lalu ajukan ringkasannya ke saya lewat AskUserQuestion dan TUNGGU jawaban saya. Setelah saya setuju, baru bangun materi, widget, latihan, dan kuis.

Kalau ada yang perlu diubah di luar wilayahmu, tulis di docs/tugas/laporan/MATRA-VEKTOR.md bagian "Butuh MASTER", jangan kerjakan sendiri.
```

### MATRA-GRAFIK-FUNGSI
```
Mulai bekerja. Baca docs/tugas/ATURAN-SEMUA-SESI.md lalu docs/tugas/MATRA-GRAFIK-FUNGSI.md sampai habis, dan patuhi keduanya.

Gelombang 1 kamu: HALAMAN saja, tanpa video sama sekali.

Sekarang kerjakan gerbang rancangan lebih dulu, jangan membangun apa pun: bedah bab fungsi dan grafiknya di Buku Guru Kelas 10 dan Kelas 11, susun rancangan tahap topik grafik fungsi, tulis ke docs/superpowers/specs/, lalu ajukan ringkasannya ke saya lewat AskUserQuestion dan TUNGGU jawaban saya.

Penting: grafik sin, cos, tan SUDAH dibahas di topik Trigonometri tahap 8 dan 9, dan asimtot sudah dibahas di Limit materi 07. Jangan diulang, cukup rujuk silang. Baca dulu web/content/trigonometri/tahap.ts dan web/content/limit/tahap.ts supaya tahu batasnya.
```

### MATRA-STATISTIKA
```
Mulai bekerja. Baca docs/tugas/ATURAN-SEMUA-SESI.md lalu docs/tugas/MATRA-STATISTIKA.md sampai habis, dan patuhi keduanya.

Gelombang 1 kamu: HALAMAN saja, tanpa video sama sekali.

Sekarang kerjakan gerbang rancangan lebih dulu, jangan membangun apa pun: bedah bab statistika di Buku Guru Kelas 10 dan Kelas 11, susun rancangan tahap topiknya, tulis ke docs/superpowers/specs/, lalu ajukan ringkasannya ke saya lewat AskUserQuestion dan TUNGGU jawaban saya.

Dua hal khusus topikmu: muat skill dataviz SEBELUM menggambar diagram apa pun, dan soal kejujuran data, data nyata wajib bersumber sedangkan data buatan wajib dikatakan buatan di halamannya.
```

### MATRA-RUANG-TIGA-DIMENSI
```
Mulai bekerja. Baca docs/tugas/ATURAN-SEMUA-SESI.md lalu docs/tugas/MATRA-RUANG-TIGA-DIMENSI.md sampai habis, dan patuhi keduanya.

Gelombang 1 kamu: HALAMAN saja, tanpa video sama sekali.

Sekarang kerjakan gerbang rancangan lebih dulu, jangan membangun apa pun: bedah D:\BAHAN MATEMATIKA\3 Dimensi.pdf dan Matematika_BS_KLS_XII_Rev.pdf, susun rancangan tahap topiknya, tulis ke docs/superpowers/specs/.

Saat mengajukan rancangan ke saya lewat AskUserQuestion, WAJIB sekalian tanyakan cara menggambar 3D nya: proyeksi SVG buatan sendiri, atau pustaka 3D seperti three.js. Jelaskan untung ruginya dengan jujur, lalu TUNGGU jawaban saya. Jangan membangun widget apa pun sebelum saya memilih.

Batas dengan sesi MATRA-VEKTOR: aljabar vektor milik mereka, kedudukan dan jarak pada bangun ruang milikmu.
```

### MATRA-DESAIN-UI-UX
```
Mulai bekerja. Baca docs/tugas/ATURAN-SEMUA-SESI.md lalu docs/tugas/MATRA-DESAIN-UI-UX.md sampai habis, dan patuhi keduanya.

Kamu sesi kualitas tampilan, BUKAN sesi redesign. Gaya "Studio Teknis" terkunci, dilarang memuat skill gaya apa pun.

Mulai dari audit, jangan langsung memperbaiki: pakai playwright-cli, buka semua halaman yang ada (beranda, trigonometri, limit, latihan, bank soal) pada lebar 375, 414, 768, 1366, 1920 piksel, dan zoom 80, 90, 100, 110, 125 persen. BUKA tiap screenshot dan nilai dengan mata. Tulis semua temuan ke docs/tugas/laporan/MATRA-DESAIN-UI-UX.md, urut dari yang paling parah.

Setelah daftar temuan siap, tunjukkan ke saya, baru perbaiki. Jalankan dev server di port 3005.
```

---

## 2. Prompt LANJUT (dipakai kapan saja, terutama setelah sesi dibangunkan)

Tempel apa adanya, ganti NAMA-SESI sesuai jendelanya:

```
Lanjutkan. Ingat kamu sesi NAMA-SESI. Kalau lupa keadaan, baca ulang docs/tugas/ATURAN-SEMUA-SESI.md, docs/tugas/NAMA-SESI.md, dan laporanmu di docs/tugas/laporan/NAMA-SESI.md. Lapor singkat posisimu sekarang sebelum menyambung kerja.
```

---

## 3. Prompt SETOR (dipakai saat sesi mengaku selesai gelombang 1)

```
Sebelum lapor selesai, buktikan dulu, jangan mengaku tanpa bukti:
1. rtk proxy "npx tsc --noEmit" di web, tempel hasilnya
2. rtk proxy "npm run build" di web, tempel hasilnya
3. semua angka sudah lolos sympy
4. semua soal salinan punya tautan sumber dan nama penulis
5. screenshot lebar 375 dan 1366 sudah kamu BUKA dan nilai, sebutkan temuannya
6. laporanmu sudah diperbarui
Kalau ada yang gagal, bilang gagal dan tempel errornya. Lalu commit rapi di cabangmu sendiri, JANGAN gabungkan ke master, itu tugas MASTER.
```
