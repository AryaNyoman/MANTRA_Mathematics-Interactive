# Aturan semua sesi paralel MATRA

Berlaku untuk: MATRA-VEKTOR, MATRA-GRAFIK-FUNGSI, MATRA-STATISTIKA,
MATRA-RUANG-TIGA-DIMENSI, MATRA-DESAIN-UI-UX.
MATRA-MASTER = sesi di `D:\MANIM-MATRA` yang memegang cabang `master`,
menggabungkan semua kerjaan, dan satu-satunya yang boleh deploy.

> **Diperbarui 2 Sep 2026** setelah kelima sesi menyelesaikan gelombang 1.
> Empat aturan berubah karena temuan kalian sendiri; ditandai (BARU).

PENTING: ingatan lintas-sesi Claude TIDAK ikut ke worktree (ingatan menempel
pada path folder). Sumber kebenaranmu HANYA: `PROGRESS.md`, `CLAUDE.md`,
file tugasmu, laporanmu, dan isi repo. Jangan mengandalkan "seingat saya".

## Peran MASTER sejak 2 Sep sore (keputusan ARYA, berlaku tetap)
MASTER **tidak menerima atau meninjau setoran video**. Tiap sesi merevisi
kerjaannya sendiri berdasarkan tinjauan ARYA langsung, dan bertanggung jawab
atas gerbang mutunya sendiri (cek_kode, qc, lembar kontak, daftar periksa
STANDAR-ILUSTRASI-VIDEO.md). Tugas MASTER hanya dua: (1) **menyatukan** semua
cabang ke `master` (dengan tsc dan build sebagai pemeriksaan teknis
penggabungan, bukan penilaian isi), dan (2) **menyampaikan aturan dan larangan
global** ke semua sesi. Kalau kamu butuh keputusan isi atau visual, tanyakan
ke ARYA, bukan ke MASTER.

## Keadaan sekarang (2 Sep 2026, sore)
Kelima sesi SELESAI gelombang 1. **ARYA menyetujui semuanya dan membuka
gelombang 2.** Semua cabang sudah tergabung ke `master` dan diselaraskan balik.
Tinjauan VISUAL dan revisi video oleh ARYA langsung ke tiap sesi. Revisi isi dari MASTER dan tugas gelombang 2
ada di file tugas masing-masing, bagian "Gelombang 2". Standar mengajar yang
dipakai menilai: `docs/tugas/STANDAR-MENGAJAR.md`. Baca itu SEBELUM menulis
naskah video, sebab narasi video adalah bentuk paling murni dari "guru
menjelaskan".

## STANDAR VIDEO VERSI 2 (2 Sep MALAM, membatalkan yang bertentangan di bawah)
Setelah menonton semua video, ARYA mengunci sepuluh keputusan di
`docs/tugas/STANDAR-ILUSTRASI-VIDEO.md` (versi 2). Ringkasnya: tata letak layar
sama untuk semua topik (identitas kiri atas, rumus kanan atas, kaki layar milik
subtitle, label ≤2 kata di gambar); 3D hanya pembuka video pertama tiap topik
(kecuali Ruang 3D dan Transformasi Geometri); rumus lahir dekat benda lalu
terbang ke panel, berubah lewat morph lambang (`sinema.ganti_rumus`); subtitle
satu baris memakai lambang (`tulis` di naskah); sumbu berangka; maksimal dua
render per sesi. `sinema.keterangan` DIHAPUS dan menggagalkan render. Peran
MASTER: hanya menggabung ke `master` dan menyampaikan aturan; revisi isi dan
visual datang dari ARYA langsung ke tiap sesi.

## VIDEO SEJAK 2 SEP SIANG: ManimGL, bukan Manim Community (WAJIB)
Keputusan ARYA: Manim Community DICABUT dari laptop ini. Semua video baru dibuat
dengan **ManimGL 1.7.2** lewat perkakas bersama `manim/gl/`. Sebelum menyentuh
video, baca berurutan:
1. `docs/tugas/STANDAR-ILUSTRASI-VIDEO.md`: delapan aturan ya/tidak (benda nyata
   3D bercahaya, kamera dari dunia ke peta, rumus di atas gambar, semua huruf
   LaTeX lewat `teks()`/`rumus()`, gerbang mutu).
2. `docs/tugas/ILMU-3B1B.md`: enam prinsip 3b1b dan PETA NAMA dari Manim
   Community ke ManimGL (`MathTex` jadi `rumus()`, `Create` jadi `ShowCreation`, dst).
3. `manim/contoh/contoh_perahu.py`: contoh rujukan yang sudah lolos gerbang.
Kode lama di `manim/arsip-manim-ce/` TIDAK bisa dijalankan dan JANGAN dicontoh.
Pemanasan wajib sekali: `manimgl manim/uji/uji_ilustrasi_gl.py Etalase -w -l`
lalu buka `media/gl/Etalase.mp4`, supaya kamu tahu perkakasnya jalan di worktree-mu.

## Bergiliran memakai laptop yang sama (2 Sep, DIPERBARUI siang)
Lima sesi berbagi satu laptop dan satu peramban Playwright. Tabrakan yang
sudah terjadi: potret nyasar antar sesi, port saling ambil. Aturannya:

1. **Render ManimGL boleh paralel, MAKSIMAL DUA per sesi sekaligus** (keputusan
   ARYA 2 Sep malam, setelah empat render serentak satu sesi membuat sesi lain
   merayap). Antrean `alat/antre_render.py` tidak wajib; panggil `manimgl`
   langsung: `manimgl manim/scenes/<berkas>.py <Adegan> -w -l`. Render yang
   diperkirakan lebih dari 5 menit WAJIB dilepas dari tugas latar Claude Code
   (yang memotong proses panjang tanpa pesan), lewat PowerShell:
   ```powershell
   Start-Process -FilePath "manimgl" -ArgumentList "manim/scenes/<berkas>.py","<Adegan>","-w","-l" -RedirectStandardOutput "$env:TEMP\<nama>.log" -NoNewWindow -PassThru
   ```
   lalu keberhasilan dinilai dari BERKAS dan WAKTU berkasnya di `media/gl/`,
   bukan dari kode keluar (pipa ke `tail`/`grep` mengembalikan kode alat lain).
2. `next build` jangan dijalankan berbarengan dengan render milikmu sendiri.
3. Yang TIDAK perlu antre: `buat_narasi.py` (jaringan), `tsc`, `cek_kode.py`,
   Playwright (asal `-s=<nama>`), dev server (port sendiri).
4. **Lihat laporan sesi lain** (`docs/tugas/laporan/*.md`, ada di cabangmu
   setelah sinkron) sebelum menyentuh hal yang bisa bersinggungan, dan tulis di
   laporanmu kalau kamu akan memakai sesuatu lama (mis. render 6 video berturut).

## Pakai perkakas sampai habis (BARU)
Jangan mengerjakan dengan tangan apa yang sudah ada alatnya:
- Angka: pemeriksa dua arah milikmu (`alat/cek_<topik>.py`), sympy.
- Naskah video: skill `superpowers:brainstorming` untuk storyboard, lalu
  `manim/buat_narasi.py` (edge-tts, mengukur durasi tiap segmen).
- Adegan (ManimGL): `manim/gl/` = `tema` (AdeganMatra, teks, rumus), `sinema`
  (babak yang gagal kalau melewati narasi, keterangan, AngkaKoma), `kamera`
  (dunia_ke_peta, dekati, putar_pelan), `ilustrasi` (air, tanah, perahu, mobil,
  orang, bola, balok, silinder), `qc` (gagal kalau bertindih atau keluar bingkai,
  sadar sudut kamera). `manim/cek_kode.py --dalam` sebelum render.
- Setelah render: `manim/cek_video.py media/gl/<Adegan>.mp4` lalu BUKA lembar
  kontaknya frame per frame; `manim/buat_subtitle.py`; `manim/gabung_audio.py
  <topik> <Adegan> --uji` untuk 480p (suara latar dari kunci `"latar"` di naskah).
- Halaman: `playwright-cli -s=<nama>` di 375 dan 1366, skill
  `web-interface-guidelines` kalau menyentuh tata letak.
- Sebelum lapor: `superpowers:verification-before-completion`.
- PDF: PyMuPDF ke PNG, baca sebagai gambar; skill `dataviz` untuk grafik data.

## Wajib di menit pertama, berurutan
1. Baca `PROGRESS.md` dari atas sampai bawah. Lalu `CLAUDE.md`.
2. Baca file tugasmu: `docs/tugas/<NAMA-SESI>.md`, terutama bagian
   "Keadaan 2 Sep" di bawahnya.
3. Baca laporanmu sendiri: `docs/tugas/laporan/<NAMA-SESI>.md`.
4. Beri judul sesi sesuai namamu (set_session_title, kalau tersedia).
5. `cd web && npm install` kalau `node_modules` belum ada.
6. Dev server HANYA di port jatahmu (tabel di bawah, SUDAH BERUBAH).

## Larangan keras (pelanggaran = kerjaan dibuang)
- Menyentuh cabang `master`: checkout, merge, push, rebase. Milik MASTER.
- Deploy Vercel dalam bentuk apa pun. Milik MASTER.
- Mengedit `PROGRESS.md` atau `CLAUDE.md`. Kemajuanmu ditulis di laporanmu.
- Masuk atau mengubah folder worktree sesi lain, atau `D:\MANIM-MATRA` langsung.
- Mengedit file bersama di luar wilayahmu (tabel kepemilikan di bawah).
- Tanda em-dash di mana pun. Kata "miskonsepsi" di halaman siswa.
- Mengarang gaya visual baru. Gaya terkunci: "Studio Teknis".
- Mengaku selesai tanpa menjalankan dan MELIHAT hasilnya.
- Kamu berjalan mode AUTO tanpa pengawas per-perintah. Itu alasan untuk LEBIH
  patuh pada batas ini, bukan kurang.

## Kepemilikan file (BARU: dua baris ditambah, dari temuan kalian)
| Wilayah | Pemilik |
|---|---|
| `web/content/<topikmu>/`, `web/components/widget/<topikmu>/` | sesi topik itu |
| `manim/scenes/<topikmu>*`, `manim/narasi/<topikmu>*`, `audio/<topikmu>*` | sesi topik itu (gelombang 2) |
| SATU baris entri topikmu di `web/content/daftar-isi.ts` | sesi topik (konflik saat gabung diurus MASTER) |
| (BARU) SATU baris `siap: true` milik topikmu di `web/content/topik.ts` | sesi topik. Tanpa ini halamanmu tidak bisa dibuka |
| (BARU) berkas baru `web/app/latihan/<topikmu>/page.tsx` | sesi topik. Tanpa ini kartu latihan topikmu menuju 404 |
| `web/app/` (layout, globals.css), komponen bersama (`Nav`, `Demo`, `PemutarVideo`, `topik/`, dst) | MATRA-DESAIN-UI-UX |
| `web/content/tipe.ts`, `manim/sinema.py`, `manim/qc.py`, `alat/` bersama | MASTER (ajukan permintaan) |
| `PROGRESS.md`, `CLAUDE.md`, penggabungan, deploy | MASTER |

Butuh perubahan di file yang bukan milikmu? Tulis di laporanmu bagian
"Butuh MASTER", lengkap dengan alasannya. JANGAN kerjakan sendiri.

## Alur gelombang (keputusan ARYA, 1 Sep 2026)
1. **Gelombang 1: halaman.** SELESAI untuk kelima sesi.
2. ARYA meninjau, MASTER menggabungkan dan deploy.
3. **Gelombang 2: video 480p** untuk direvisi ARYA, dengan ManimGL (sejak 2 Sep
   siang). Resepnya di `PROGRESS.md` bagian "Resep lengkap": storyboard sesuai
   `STANDAR-ILUSTRASI-VIDEO.md`, naskah, `buat_narasi.py`, adegan `AdeganMatra`
   dengan `sinema.babak`, `cek_kode.py`, render `manimgl -w -l`, lalu BUKA
   lembar kontak `cek_video.py` dan nilai tiap frame, `gabung_audio.py --uji`.
4. **Gelombang 3: render 1080p60 sekaligus** setelah revisi video beres.

## Perkakas wajib (BARU: tiga aturan diperbaiki)

### Verifikasi: panggil biner Node LANGSUNG, bukan lewat rtk (BARU)
MATRA-STATISTIKA membuktikan `rtk` mengarang keluaran: `rtk proxy "npx tsc
--version"` menjawab "TypeScript: No errors found", dan `next build` lewat rtk
mengaku membangun 2 rute dalam 1,2 detik padahal situsnya 15 halaman.
Pembungkus yang menipu lebih berbahaya daripada tidak ada pembungkus. Pakai:

```bash
cd web
node node_modules/typescript/bin/tsc --noEmit
node node_modules/eslint/bin/eslint.js .
node node_modules/next/dist/bin/next build
```

Buktikan pemeriksanya hidup sekali di awal: sisipkan kesalahan tipe sengaja,
pastikan tsc menolaknya, lalu hapus lagi.

### Playwright: WAJIB nama sesi (BARU)
Tanpa nama sesi, kelima worktree memakai SATU peramban yang sama: potretmu
bisa tersimpan di folder sesi lain, dan sesi lain bisa menggeser halaman yang
sedang kamu periksa. Selalu:

```bash
playwright-cli -s=<nama-worktree-mu> open http://localhost:<portmu>/...
```

Contoh: `playwright-cli -s=matra-vektor open http://localhost:3010/topik/vektor`.
Lebar uji minimal 375 dan 1366 piksel. BUKA potretnya dan nilai dengan mata.

### Lainnya
- Semua angka matematika dicek `sympy` atau pemeriksa buatanmu sendiri, dan
  pemeriksanya WAJIB dibuktikan dua arah: menolak jawaban yang sengaja salah,
  meloloskan yang benar. Pola yang sudah terbukti: `alat/cek_vektor.py`,
  `alat/cek_statistik.py`, `alat/cek_grafik_fungsi.py`, `alat/cek_ruang.py`.
- PDF scan: PyMuPDF render halaman jadi PNG lalu dibaca sebagai gambar.
- Diagram/grafik data: skill `dataviz`, termasuk validator paletnya.
- Sebelum lapor selesai: skill `superpowers:verification-before-completion`.
- Jebakan Windows: `papan.ts` dan `Papan.tsx` dianggap berkas yang SAMA.
  Jangan beri nama yang hanya beda huruf besar.

## Port dev server (BARU: pindah ke 3010 ke atas)
Port 3000 sampai 3009 DIKOSONGKAN. Alasannya: `npm run dev` tanpa `-p` mengambil
3000, dan kalau 3000 terpakai Next diam-diam naik ke 3001, 3002, dan seterusnya,
yang dulu adalah jatah sesi lain. Itu sumber tabrakannya.

| Sesi | Port |
|---|---|
| MATRA-VEKTOR | 3010 |
| MATRA-GRAFIK-FUNGSI | 3011 |
| MATRA-STATISTIKA | 3012 |
| MATRA-RUANG-TIGA-DIMENSI | 3013 |
| MATRA-DESAIN-UI-UX | 3014 |
| MANTRA-TURUNAN (sejak 7 Sep 2026) | 3015 |
| MANTRA-INTEGRAL (sejak 7 Sep 2026) | 3016 |
| MATRA-MASTER | 3000 |

Jalankan SELALU dengan port tegas: `cd web && npm run dev -- -p <portmu>`.
Kalau portmu sudah dipakai (biasanya sisa proses lama), matikan dulu:
`netstat -ano | findstr :<port>` lalu `taskkill /PID <pid> /F`. Jangan pindah
ke port lain.

## Laporan
File: `docs/tugas/laporan/<NAMA-SESI>.md` di cabangmu sendiri. Perbarui tiap
kali ada kemajuan berarti. Bagiannya: Selesai, Sedang dikerjakan, Butuh MASTER,
Butuh keputusan ARYA. Commit kecil dan sering di cabangmu, pesan commit bahasa
Indonesia. Perubahan pada berkas di luar wilayahmu (kalau terpaksa) dibuat
sebagai commit TERSENDIRI supaya MASTER gampang menahannya.

## Selesai gelombang 1 artinya (sudah dipenuhi kelima sesi)
- Halaman topik tampil utuh lewat `daftar-isi.ts` dan `topik.ts`.
- Semua angka lolos pemeriksa, semua soal salinan bersumber.
- Potret 375 dan 1366 sudah DIBUKA dan DINILAI mata.
- tsc, eslint, dan build lolos lewat pemanggilan langsung.
- Laporan terisi, commit rapi, ARYA diberi tahu di sesimu.
