# MATRA: Matematika Interaktif

Situs belajar matematika SMA: **animasi Manim** (menjelaskan *kenapa*) + **widget interaktif**
(siswa mencoba sendiri). Terinspirasi anatomyatelier.vercel.app.
Pemilik: ARYA. Tujuan terdekat: ditunjukkan ke dosen.

> **Tenggat: 12 September 2026.** Baca `PROGRESS.md` DULU tiap sesi baru - di situ status harian,
> keputusan yang sudah diambil, dan apa yang harus dikerjakan berikutnya.

## Cara menjalankan
- Animasi (ManimGL, sejak 2 Sep 2026): `manimgl manim/scenes/<file>.py <NamaScene> -w -l`
  (keluaran `media/gl/`). Perkakas: `manim/gl/`. Contoh rujukan: `manim/contoh/contoh_perahu.py`.
  Standar visual video: `docs/tugas/STANDAR-ILUSTRASI-VIDEO.md`. Manim Community DICABUT.
- Situs: `cd web && npm run dev` → http://localhost:3000
- **Folder kerja yang benar: `D:\MANIM-MATRA` (cabang `master`).** Folder di
  `.claude\worktrees\` adalah salinan proyek yang sama pada cabang lain, dan
  `PROGRESS.md` di dalamnya bisa basi. Ragu? `git worktree list`. Selesai pakai
  worktree? Gabungkan ke `master` lalu hapus worktree-nya.

## Susunan folder
| Folder | Isi |
|---|---|
| `manim/` | Animasi Python (ManimGL 1.7.2; `gl/` perkakas bersama, `arsip-manim-ce/` kode lama yang tak bisa dijalankan) |
| `web/` | Situs Next.js 16 + TypeScript |
| `web/public/anim/` | Video hasil render (WebM) |
| `docs/superpowers/specs/` | Dokumen desain |
| `alat/` | Alat bantu proyek di luar Manim, mis. pemeriksa jawaban soal |

## Aturan proyek (jangan dilanggar)
- **6 topik**: trigonometri⭐, limit⭐, grafik fungsi, vektor, ruang 3D, statistika (⭐ = unggulan)
- **Rumus dan angka pakai LaTeX** (`gl.rumus`, yaitu `Tex` ManimGL), bukan Typst.
  Kata-kata pakai font Constantia (`gl.teks`). `MathTex` dan `Text(color=)` dilarang
  (`cek_kode.py` menolaknya); satuan `\mathrm{km}`, bukan `\text{}`.
- **Video: benda nyata harus terlihat seperti bendanya** (3D bercahaya dari
  `gl.ilustrasi`), kamera mulai dari dunia lalu terbang ke tempat matematika
  terbaca, rumus di atas gambar. Aturan lengkap: `docs/tugas/STANDAR-ILUSTRASI-VIDEO.md`.
- **Tanpa database, tanpa login.** Skor kuis disimpan di browser siswa (localStorage).
- **Semua di drive D.** C: tinggal ~16 GB dari 376 GB. Jangan taruh apa pun besar di C.
- **Soal salinan WAJIB bersumber** (tautan + nama penulis). Soal tanpa keterangan = tulisan sendiri.
- **Bahasa untuk siswa = bahasa SMA.** Stewart & diktat ITB dibaca agar Claude tidak salah konsep -
  bukan untuk diterjemahkan mentah ke siswa.
- Widget 2D dibuat sendiri (SVG + React). Mafs TIDAK dipakai - tak dirawat 17 bulan.
- **Penjelasan: pecah jadi blok** (paragraf pendek / daftar poin / kalimat sorot / kotak
  contoh) - bukan tembok paragraf. Tapi **isinya jangan dipangkas**.
- **Kata "miskonsepsi" DILARANG muncul di halaman.** Itu istilah guru. Pakai
  "Sering keliru", dan taruh di BAWAH setelah siswa paham.
- **Gaya visual terkunci: "Studio Teknis"** - patokannya `mockup/d-studio-teknis.html`,
  daftar warna & font ada di `PROGRESS.md`. Jangan mengarang gaya baru per halaman.
- **JANGAN pakai tanda em-dash (-).** Aturan tetap dari ARYA, 1 Sep 2026, berlaku
  di proyek ini DAN proyek berikutnya. Pakai tanda baca lain: titik, koma, titik dua,
  tanda kurung, atau tanda hubung biasa. Berlaku untuk teks yang dilihat pengguna
  maupun untuk komentar kode.
- **Widget tidak boleh memotong gambarnya sendiri.** Bingkai wajib menyesuaikan otomatis
  dan memberi tahu penggunanya lewat penunjuk skala. (Bug temuan ARYA, 31 Agu.)

## 🚨 GERBANG VIDEO - WAJIB, TANPA PENGECUALIAN

**"Rendered" di log BUKAN bukti video itu benar.** Itu cuma bukti tidak ada error Python.
Pada 31 Agu 2026 sebuah video dirilis dengan 7 cacat karena hanya dicek lognya -
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
   - **ada teks yang menyusut sampai sulit dibaca?** (sebabnya hampir selalu
     satu baris kelewat panjang, atau satu `MathTex` kelewat lebar, lalu
     dikecilkan seluruhnya oleh `batasi_lebar`)
   - **gambar di layar masih cocok dengan yang sedang diucapkan?** Gambar yang
     lupa diganti saat babak berpindah akan MEMBANTAH narasinya sendiri, dan
     itu lebih merusak daripada layar kosong.
   - **coretan menutup habis lambang yang dicoret?** Kalau ya, pembaca tidak
     tahu apa yang barusan dicoret.
3. Adegan wajib memanggil `qc.periksa_adegan(...)` di tiap tahap - render harus GAGAL
   kalau ada yang bertindih atau keluar bingkai, bukan lolos diam-diam.
4. Baru boleh bilang "selesai". Kalau ada cacat tersisa, **sebutkan** - jangan diamkan.

## Bahan referensi (di luar folder proyek)
| Berkas / sumber | Untuk apa | Bisa dibaca? |
|---|---|---|
| `D:\BAHAN MATEMATIKA\Buku Matematika Kelas 10 - Guru.pdf` dan `...Kelas 11 - Guru.pdf` (DUA berkas) | ⭐ Kurikulum Merdeka, miskonsepsi | teks digital |
| `D:\BAHAN MATEMATIKA\3 Dimensi.pdf` (AWAS: isinya Buku Siswa Kelas XI, BUKAN geometri ruang), `Matematika_BS_KLS_XII_Rev.pdf`, `LIMIT.pdf` | bahan tambahan per topik | teks digital |
| `D:\SEKOLAH S1 & S2\S1\matematika\kalkulus 1.pdf`, `kalkulus 2.pdf` | Diktat ITB - istilah Indonesia yang benar | teks digital |
| `…\Calculus (9rd Edition) - Solution.pdf` | Pola & tingkat kesulitan soal | teks digital |
| `…\sb-big-book-matematika-sma-ke-tim-bbm.pdf` | Level & bahasa SMA | **scan** - baca halaman terpilih |
| `…\Calculus (9rd Edition).pdf` | Ketepatan definisi | **scan** - mahal, seperlunya |
| https://mathcyber1997.com | Soal SMA/kuliah/olimpiade | web |

PDF scan dibaca dengan PyMuPDF → render halaman jadi PNG → dibaca sebagai gambar. **Bedah, jangan borong.**

## Lingkungan (terverifikasi 2 Sep 2026)
ManimGL 1.7.2 (Manim Community dicabut 2 Sep) · MiKTeX 25.12 (AutoInstall aktif) · Typst 0.15.0 · FFmpeg 8.1.1 · Python 3.11.9 · Node 24.13
GPU: GeForce MX250 + Intel UHD; render ManimGL tanpa jendela, paralel aman.
