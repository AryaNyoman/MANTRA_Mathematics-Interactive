# MANTRA: Matematika Interaktif

Situs belajar matematika SMA: **animasi Manim** (menjelaskan *kenapa*) + **widget interaktif**
(siswa mencoba sendiri). Pemilik: ARYA. Tujuan terdekat: ditunjukkan ke dosen.

> **Namanya MANTRA sejak 3 Sep 2026, bukan lagi MATRA.** Yang berganti adalah
> nama yang DILIHAT pengguna: judul halaman, logo, nav, metadata. Nama folder
> (`D:\MANIM-MATRA`), nama cabang `sesi/*`, alamat Vercel `matra-eight`, dan
> kunci localStorage `matra:*` SENGAJA dibiarkan. Mengganti kunci localStorage
> akan menghapus kemajuan siswa yang sudah tersimpan, dan mengganti alamat
> Vercel memutus tautan yang sudah disebar.

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
- **7 topik**: trigonometri⭐, limit⭐, grafik fungsi, vektor, ruang 3D, statistika,
  transformasi geometri (⭐ = unggulan). Transformasi geometri ditambahkan ARYA
  3 Sep 2026 dan dikerjakan di worktree `mantra-transformasi-geometri`.
  Topik baru WAJIB didaftarkan di TIGA tempat: `web/content/topik.ts`,
  `web/content/daftar-isi.ts`, dan `web/content/subbab.ts` (pemetaan bab dan
  sub-bab). Kalau `subbab.ts` terlewat, topiknya tidak muncul di Peta Materi.
- **Semua huruf pakai LaTeX** (keputusan ARYA 2 Sep): rumus dan angka lewat
  `gl.rumus` (`Tex`), kata-kata lewat `gl.teks` (`TexText`). Bukan Typst, bukan
  `Text` Pango. `MathTex` dan `Text(color=)` dilarang (`cek_kode.py` menolaknya).
- **Cache LaTeX ManimGL bisa keracunan**: hasil kosong saat font baru dipasang
  ikut tersimpan. `tambal_manimgl.py` menolak SVG kosong; kalau teks pernah
  "hilang", hapus `%LOCALAPPDATA%\manim\manim\Cache`.
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
- **Gaya visual terkunci: rancangan MANTRA** (sejak 3 Sep 2026, menggantikan
  "Studio Teknis"). Patokannya `docs/desain-mantra/MANTRA.dc.html` dan
  `HANDOFF.md`. Huruf Newsreader (serif) + Space Grotesk (sans). Emas #B08A3E,
  navy #101A2B, kertas #FAF9F5. Jangan mengarang gaya baru per halaman.
- **Lebar halaman TIDAK BOLEH dipatok piksel.** Dilarang `max-width: <n>px`
  pada wadah halaman. Pakai `padding: 0 var(--tepi)`. Sebabnya: patokan piksel
  tidak ikut berubah saat peramban di-zoom keluar, sehingga isinya menciut ke
  tengah dan kiri kanan layar kosong. (Temuan ARYA, 3 Sep 2026.)
- **Kaki halaman satu komponen**: `web/components/mantra/Kaki.tsx`, dipasang
  sebagai SAUDARA `<main>` di tiap halaman, bukan di dalamnya.
- **JANGAN pakai tanda em-dash (-).** Aturan tetap dari ARYA, 1 Sep 2026, berlaku
  di proyek ini DAN proyek berikutnya. Pakai tanda baca lain: titik, koma, titik dua,
  tanda kurung, atau tanda hubung biasa. Berlaku untuk teks yang dilihat pengguna
  maupun untuk komentar kode.
- **Setiap materi berwidget WAJIB punya kotak "Yuk bereksperimen"** (blok
  `jenis: 'coba'`), ditaruh di titik siswa sudah cukup membaca untuk mencoba.
  Sebabnya: di layar sempit, materi TANPA video menyisipkan widgetnya tepat di
  bawah kotak itu (keputusan ARYA 5 Sep 2026), supaya siswa membaca dulu dan
  tidak disodori alat di atas judul. Tanpa kotak, widget jatuh ke akhir bacaan.
  Materi bervideo dan tata letak desktop tidak terpengaruh.
- **Kendali widget memakai komponen bersama** `web/components/kendali/`
  (`Angka`, `Koordinat`, `Pilihan`, `Petunjuk`): nama + arti, angka tampil,
  bisa diketik (dipotong ke batas, bukan ditolak), bisa digeser. Pegangan
  yang bisa diseret memberi kelas `nyala` saat kuncinya sedang dipegang.
  Label sumbu lewat `lib/petak-sumbu.ts`. Rancangan:
  `docs/superpowers/specs/2026-09-05-sistem-kendali-widget-design.md`.
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

## Peta struktur (graphify, dibuat 3 Sep 2026)
`graphify-out/` ada. Sesi baru: baca `graphify-out/GRAPH_REPORT.md`, lalu
`graphify query "<pertanyaan>"` untuk hal spesifik; jangan menjelajah kode dari nol.
- **Kode** diperbarui gratis tanpa LLM: `graphify update .` (AST saja).
- **Dokumen** (`--update` semantik) memakai LLM. Yang terbukti 3 Sep: OpenCode Go
  (`OPENAI_BASE_URL=https://opencode.ai/zen/go/v1`, model `glm-5.3`, gambar
  `glm-5.3-flash`) dengan kunci dari env `OPENAI_API_KEY`, backend `openai`.
  Gemini gratis: model bawaan graphify kena kuota 20 permintaan/hari,
  `gemini-2.5-flash` sudah ditutup, `gemini-3.6-flash` pernah jalan lalu macet.
  OpenCode Zen (`/zen/v1`) menolak: saldo kosong. Kunci TIDAK pernah disimpan
  ke berkas; set lewat env sebelum menjalankan.
- `audio/` (417 berkas suara narasi) dan poster video SENGAJA dikeluarkan dari
  peta: naskahnya sudah ada sebagai teks, mentranskrip ulang sia-sia.

## Lingkungan (terverifikasi 2 Sep 2026)
ManimGL 1.7.2 (Manim Community dicabut 2 Sep) · MiKTeX 25.12 (AutoInstall aktif) · Typst 0.15.0 · FFmpeg 8.1.1 · Python 3.11.9 · Node 24.13
GPU: GeForce MX250 + Intel UHD; render ManimGL tanpa jendela, paralel aman.
