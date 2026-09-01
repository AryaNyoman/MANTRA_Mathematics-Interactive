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

## Keadaan sekarang (2 Sep 2026)
Kelima sesi SELESAI gelombang 1 dan menunggu tinjauan ARYA. Urutan berikutnya:
MASTER menggabungkan semua cabang ke `master`, lalu menyelaraskan tiap cabang
sesi kembali ke `master` (`git merge master` di worktree-mu, dilakukan MASTER),
ARYA meninjau, baru gelombang 2 (video) dimulai atas perintah ARYA.
Jangan memulai gelombang 2 sendiri.

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
3. **Gelombang 2: video 480p** untuk direvisi ARYA. Hanya atas perintah ARYA.
   Resepnya di `PROGRESS.md` bagian "Resep lengkap": naskah, `buat_narasi.py`,
   adegan Manim dengan `sinema.babak`, `cek_kode.py`, render `-ql`, lalu
   BUKA lembar kontak `cek_video.py` dan nilai tiap frame.
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
