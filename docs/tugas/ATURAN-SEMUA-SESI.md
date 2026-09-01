# Aturan semua sesi paralel MATRA

Berlaku untuk: MATRA-VEKTOR, MATRA-GRAFIK-FUNGSI, MATRA-STATISTIKA,
MATRA-RUANG-TIGA-DIMENSI, MATRA-DESAIN-UI-UX.
MATRA-MASTER = sesi di `D:\MANIM-MATRA` yang memegang cabang `master`,
menggabungkan semua kerjaan, dan satu-satunya yang boleh deploy.

PENTING: ingatan lintas-sesi Claude TIDAK ikut ke worktree (ingatan menempel
pada path folder). Sumber kebenaranmu HANYA: `PROGRESS.md`, `CLAUDE.md`,
file tugasmu, dan isi repo. Jangan mengandalkan "seingat saya".

## Wajib di menit pertama, berurutan
1. Baca `PROGRESS.md` dari atas sampai bawah. Lalu `CLAUDE.md`.
2. Baca file tugasmu: `docs/tugas/<NAMA-SESI>.md`.
3. Beri judul sesi sesuai namamu (alat set_session_title, kalau tersedia).
4. `cd web && npm install` (sekali, 2-5 menit; worktree tidak berbagi
   node_modules).
5. Jalankan dev server HANYA di port jatahmu (tabel di bawah).

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

## Kepemilikan file
| Wilayah | Pemilik |
|---|---|
| `web/content/<topikmu>/`, `web/components/widget/<topikmu>/` | sesi topik itu |
| `manim/scenes/<topikmu>*`, `manim/narasi/<topikmu>*` | sesi topik itu (gelombang 2) |
| SATU baris entri topikmu di `web/content/daftar-isi.ts` | sesi topik (konflik saat gabung diurus MASTER) |
| `web/app/` (layout, globals.css), komponen bersama (`Demo`, `PemutarVideo`, `topik/`, dst) | MATRA-DESAIN-UI-UX |
| `web/content/tipe.ts`, `manim/sinema.py`, `manim/qc.py`, alat bersama lain | MASTER (ajukan permintaan) |
| `PROGRESS.md`, `CLAUDE.md`, penggabungan, deploy | MASTER |

Butuh perubahan di file yang bukan milikmu? Tulis di laporanmu bagian
"Butuh MASTER", lengkap dengan alasannya. JANGAN kerjakan sendiri.

## Alur gelombang (keputusan ARYA, 1 Sep 2026)
1. **Gelombang 1 (SEKARANG): halaman.** Materi + widget + latihan + kuis
   sampai halaman topikmu utuh. TANPA video.
2. Lapor selesai, ARYA meninjau, MASTER menggabungkan dan deploy.
3. **Gelombang 2: video 480p** untuk direvisi ARYA. Jangan mulai sebelum
   halamanmu disetujui.
4. **Gelombang 3: render 1080p60 sekaligus** setelah revisi video beres.

## Gerbang rancangan (WAJIB sebelum membangun apa pun)
Susun dulu rancangan tahap topikmu (pakai skill `superpowers:brainstorming`),
tulis ke `docs/superpowers/specs/2026-09-XX-<topik>-alur-belajar.md`, lalu
ajukan ringkasannya ke ARYA lewat AskUserQuestion dan TUNGGU jawabannya.
ARYA memeriksa dari HP; bersabarlah. Membangun tanpa persetujuan = risiko
kerja dua kali, dan itu alasan gerbang ini ada.

## Pola yang ditiru (sudah terbukti dua topik)
- Struktur konten: `web/content/limit/tahap.ts` (+ `latihan.ts`, `kuis.ts`),
  tipe dari `web/content/tipe.ts`, daftar di `web/content/daftar-isi.ts`.
- Widget: `web/components/widget/limit/` (SVG + React buatan sendiri,
  `Bidang.tsx` untuk bingkai yang menyesuaikan otomatis + penunjuk skala).
- Halaman memakai `HalamanTopik` generik; kamu TIDAK perlu menyentuhnya,
  cukup mengisi konten dan mendaftarkannya.
- Soal: tingkat kesulitan dikalibrasi ke sumber nyata SEBELUM menulis
  (lihat PROGRESS.md; soal buatan sendiri cenderung kemudahan).

## Perkakas wajib
- Verifikasi perintah (build, tsc, render): lewat `rtk proxy "<perintah>"`.
  JANGAN percaya exit code pipa biasa; sudah pernah menipu (lihat PROGRESS.md).
- Pemeriksaan visual halaman: `playwright-cli` (buka → snapshot → screenshot),
  BUKAN preview MCP. Lebar uji minimal: 375 dan 1366 piksel.
- Semua angka matematika dicek `sympy` (pola: `alat/cek_soal.py`).
- PDF scan: PyMuPDF render halaman jadi PNG lalu dibaca sebagai gambar.
  Bedah halaman terpilih, jangan borong.
- Diagram/grafik data: baca skill `dataviz` dulu (terutama Statistika).
- Sebelum lapor selesai: skill `superpowers:verification-before-completion`.

## Port dev server
| Sesi | Port |
|---|---|
| MATRA-VEKTOR | 3001 |
| MATRA-GRAFIK-FUNGSI | 3002 |
| MATRA-STATISTIKA | 3003 |
| MATRA-RUANG-TIGA-DIMENSI | 3004 |
| MATRA-DESAIN-UI-UX | 3005 |

Jalankan: `cd web && npm run dev -- -p <port>`.

## Laporan
File: `docs/tugas/laporan/<NAMA-SESI>.md` di cabangmu sendiri. Perbarui tiap
kali ada kemajuan berarti. Formatnya:

```markdown
# Laporan <NAMA-SESI>
Terakhir: <tanggal jam>
## Selesai
## Sedang dikerjakan
## Butuh MASTER
## Butuh keputusan ARYA
```

Commit kecil dan sering di cabangmu sendiri, pesan commit bahasa Indonesia.

## Selesai gelombang 1 artinya
- Halaman topik tampil utuh lewat entri `daftar-isi.ts`.
- Semua angka lolos sympy, semua soal salinan bersumber (tautan + penulis).
- Screenshot 375px dan 1366px sudah DIBUKA dan DINILAI mata, bukan cuma dibuat.
- `rtk proxy "npx tsc --noEmit"` dan `rtk proxy "npm run build"` lolos di `web/`.
- Laporan terisi, commit rapi, lalu beri tahu ARYA di sesimu.
