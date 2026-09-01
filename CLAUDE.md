# MATRA — Matematika Interaktif

Situs belajar matematika SMA: **animasi Manim** (menjelaskan *kenapa*) + **widget interaktif**
(siswa mencoba sendiri). Terinspirasi anatomyatelier.vercel.app.
Pemilik: ARYA. Tujuan terdekat: ditunjukkan ke dosen.

> **Tenggat: 12 September 2026.** Baca `PROGRESS.md` DULU tiap sesi baru — di situ status harian,
> keputusan yang sudah diambil, dan apa yang harus dikerjakan berikutnya.

## Cara menjalankan
- Animasi: `manim -qm manim/scenes/<file>.py <NamaScene>`
- Situs: `cd web && npm run dev` → http://localhost:3000

## Susunan folder
| Folder | Isi |
|---|---|
| `manim/` | Animasi Python (Manim 0.21) |
| `web/` | Situs Next.js 16 + TypeScript |
| `web/public/anim/` | Video hasil render (WebM) |
| `docs/superpowers/specs/` | Dokumen desain |
| `alat/` | Alat bantu proyek di luar Manim, mis. pemeriksa jawaban soal |

## Aturan proyek (jangan dilanggar)
- **6 topik**: trigonometri⭐, limit⭐, grafik fungsi, vektor, ruang 3D, statistika (⭐ = unggulan)
- **Rumus pakai LaTeX** (`MathTex`), bukan Typst. Typst hanya ban serep kalau MiKTeX rusak.
- **Tanpa database, tanpa login.** Skor kuis disimpan di browser siswa (localStorage).
- **Semua di drive D.** C: tinggal ~16 GB dari 376 GB. Jangan taruh apa pun besar di C.
- **Soal salinan WAJIB bersumber** (tautan + nama penulis). Soal tanpa keterangan = tulisan sendiri.
- **Bahasa untuk siswa = bahasa SMA.** Stewart & diktat ITB dibaca agar Claude tidak salah konsep —
  bukan untuk diterjemahkan mentah ke siswa.
- Widget 2D dibuat sendiri (SVG + React). Mafs TIDAK dipakai — tak dirawat 17 bulan.
- **Penjelasan: pecah jadi blok** (paragraf pendek / daftar poin / kalimat sorot / kotak
  contoh) — bukan tembok paragraf. Tapi **isinya jangan dipangkas**.
- **Kata "miskonsepsi" DILARANG muncul di halaman.** Itu istilah guru. Pakai
  "Sering keliru", dan taruh di BAWAH setelah siswa paham.
- **Gaya visual terkunci: "Studio Teknis"** — patokannya `mockup/d-studio-teknis.html`,
  daftar warna & font ada di `PROGRESS.md`. Jangan mengarang gaya baru per halaman.
- **JANGAN pakai tanda em-dash (—).** Aturan tetap dari ARYA, 1 Sep 2026, berlaku
  di proyek ini DAN proyek berikutnya. Pakai tanda baca lain: titik, koma, titik dua,
  tanda kurung, atau tanda hubung biasa. Berlaku untuk teks yang dilihat pengguna
  maupun untuk komentar kode.
- **Widget tidak boleh memotong gambarnya sendiri.** Bingkai wajib menyesuaikan otomatis
  dan memberi tahu penggunanya lewat penunjuk skala. (Bug temuan ARYA, 31 Agu.)

## 🚨 GERBANG VIDEO — WAJIB, TANPA PENGECUALIAN

**"Rendered" di log BUKAN bukti video itu benar.** Itu cuma bukti tidak ada error Python.
Pada 31 Agu 2026 sebuah video dirilis dengan 7 cacat karena hanya dicek lognya —
ARYA yang menemukannya, bukan Claude. Itu tidak boleh terulang.

Sebelum video APA PUN dinyatakan selesai atau dikirim ke ARYA:

1. Jalankan `python manim/cek_video.py <video> --detik <momen penting>`
2. **BUKA lembar kontaknya dan nilai tiap frame satu per satu.** Periksa:
   - teks bertindih dengan gambar atau teks lain?
   - ada yang keluar tepi layar?
   - warna belang di tengah kata?
   - ada detik yang layarnya kosong (waktu mati)?
   - rumus tampil separuh saat sedang ditulis?
   - kotak sorot meleset dari angkanya?
   - **tanda siku-siku dan busur sudut ada di posisi yang benar secara geometri?**
3. Adegan wajib memanggil `qc.periksa_adegan(...)` di tiap tahap — render harus GAGAL
   kalau ada yang bertindih atau keluar bingkai, bukan lolos diam-diam.
4. Baru boleh bilang "selesai". Kalau ada cacat tersisa, **sebutkan** — jangan diamkan.

## Bahan referensi (di luar folder proyek)
| Berkas / sumber | Untuk apa | Bisa dibaca? |
|---|---|---|
| `D:\BAHAN MATEMATIKA\Buku Matematika Kelas 10 & 11 - Guru.pdf` | ⭐ Kurikulum Merdeka, miskonsepsi | teks digital |
| `D:\SEKOLAH S1 & S2\S1\matematika\kalkulus 1.pdf`, `kalkulus 2.pdf` | Diktat ITB — istilah Indonesia yang benar | teks digital |
| `…\Calculus (9rd Edition) - Solution.pdf` | Pola & tingkat kesulitan soal | teks digital |
| `…\sb-big-book-matematika-sma-ke-tim-bbm.pdf` | Level & bahasa SMA | **scan** — baca halaman terpilih |
| `…\Calculus (9rd Edition).pdf` | Ketepatan definisi | **scan** — mahal, seperlunya |
| https://mathcyber1997.com | Soal SMA/kuliah/olimpiade | web |

PDF scan dibaca dengan PyMuPDF → render halaman jadi PNG → dibaca sebagai gambar. **Bedah, jangan borong.**

## Lingkungan (sudah terpasang & terverifikasi 31 Agu 2026)
Manim 0.21.0 · MiKTeX 25.12 (AutoInstall aktif) · Typst 0.15.0 · FFmpeg 8.1.1 · Python 3.11.9 · Node 24.13
