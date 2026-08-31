# PROGRESS — MATRA

> **Sesi baru: baca berkas ini dari atas sampai bawah sebelum mengerjakan apa pun.**
> Diperbarui setiap akhir sesi. Terakhir diperbarui: **31 Agustus 2026**.

## Ringkas
| | |
|---|---|
| Tenggat demo ke dosen | **12 September 2026** (12 hari dari 31 Agu) |
| Hari ke- | **1 dari 12** |
| Tahap sekarang | Fondasi — desain disetujui, lingkungan siap |
| Penghalang | *(tidak ada)* |

---

## ✅ Selesai

### Sesi 1 — 31 Agustus 2026
- Brainstorming tuntas (3 ronde tanya-jawab), desain **disetujui ARYA**
- **Lingkungan terpasang & terbukti jalan** (ada bukti render, bukan klaim):
  - Manim Community 0.20.1 → **0.21.0**
  - **MiKTeX 25.12** (LaTeX), AutoInstall paket aktif, sudah di PATH user
  - **Typst 0.15.0** (ban serep, tidak dipakai)
  - Sudah ada sebelumnya: Python 3.11.9, FFmpeg 8.1.1, Node 24.13
- **Uji banding LaTeX vs Typst** dengan 4 rumus asli → **LaTeX menang** (spasi & konvensi
  lebih sesuai buku). Bukti: `scratchpad/perbandingan-latex-vs-typst.png`
- Semua PDF referensi diperiksa lapisan teksnya (lihat tabel di `CLAUDE.md`)
- Folder `D:\MANIM` → **`D:\MANIM-MATRA`**, semua isi pindah ke drive D
- `CLAUDE.md`, `PROGRESS.md`, dan spec desain dibuat

---

## 🔜 Berikutnya (urut)

### Hari 1
- [x] Cache npm dialihkan ke `D:\npm-cache` (cache lama 11 GB masih di C, menunggu izin hapus)
- [x] Baca Buku Guru Kelas 10 & 11 → daftar bab + kotak "Miskonsepsi !?" terpetakan
- [x] `manim/matra_theme.py` + `manim/scenes/trigonometri.py` (adegan Segitiga Sebangun, 2 tema)
- [x] Render terbukti jalan: 2 PNG transparan, rumus & notasi desimal koma benar
- [x] **3 mockup gaya** di `mockup/` (a-studio, b-papan-tulis, c-kertas-grafik)
- [x] **ARYA memilih gabungan A + C** → dibuat `mockup/d-studio-teknis.html` = **GAYA TERKUNCI**
- [x] Animasi Manim pertama: `UkuranBedaRasioSama` → **WebM 557 KB, 20 detik** (ringan, aman untuk Vercel)
- [x] **Bug temuan ARYA diperbaiki**: segitiga terpotong saat θ besar. Sekarang bingkai
      menyesuaikan otomatis (di 80°: skala turun 58,4 → 6,4 px/cm, segitiga tetap utuh).
      Terverifikasi lewat Playwright pada 15° / 45° / 80°.
- [x] Rangka Next.js **16.3.3** + React 19.2.8 + TypeScript 5 + Tailwind 4 di `web/`
- [x] **Video direvisi total** setelah ARYA menemukan cacat. 7 cacat diperbaiki
      (3 dari ARYA, 4 dari pemeriksaan ulang — termasuk **tanda siku-siku di luar segitiga**)
- [x] **Dua alat mutu baru**: `manim/qc.py` (render GAGAL kalau bertindih/keluar bingkai)
      dan `manim/cek_video.py` (lembar kontak ffmpeg). Aturannya di `CLAUDE.md`
- [x] Audio: ElevenLabs terhubung + `edge-tts` terpasang. 5 contoh suara di `audio/uji/`
- [x] **Tata letak SATU LAYAR** sesuai permintaan ARYA: `mockup/e-satu-layar.html`
      — kiri visual (tab Tonton / Coba sendiri), kanan penjelasan + angka hidup + rumus.
      Tanpa gulir atas-bawah.
- [x] **Warna sisi disatukan** antara video Manim dan widget web (dulu samping biru di
      video tapi hijau di widget — merusak kaitan yang sedang dibangun)
- [x] **Halaman Trigonometri asli di Next.js JALAN** di `http://localhost:3001`
      — beranda 6 kartu + halaman topik satu layar dengan tab Tonton / Coba sendiri.
      `tsc --noEmit` bersih, ESLint bersih, tanpa error konsol.
      Widget diuji di 20° / 45° / 78°: **tidak ada garis yang keluar bidang gambar.**

### Berkas yang sudah jadi (Hari 1–2)
| Berkas | Isi |
|---|---|
| `web/lib/warna.ts` | ⭐ SATU SUMBER warna matematika — wajib sama dengan `manim/matra_theme.py` |
| `web/app/globals.css` | Sistem desain "Studio Teknis" + tata letak satu layar |
| `web/content/topik.ts` | Data 6 topik + label kelas jujur + miskonsepsi tiap topik |
| `web/components/widget/SegitigaSebangun.tsx` | Widget: bingkai swa-sesuai, tidak pernah memotong |
| `web/components/topik/Trigonometri.tsx` | Halaman topik dua kolom |
| `web/app/topik/[slug]/page.tsx` | Route dinamis — **`params` di-`await`** (wajib di Next 16) |

### Pelajaran Next 16 (beda dari ingatan Claude — sudah diverifikasi di dokumen bundel)
- `params` pada route dinamis adalah **`Promise`**, wajib `await params`
- **Tailwind 4**: `@import "tailwindcss"` + `@theme inline` di CSS, **tanpa** `tailwind.config.js`
- **`next lint` sudah dihapus** — pakai `npx eslint .`
- `devIndicators: false` di `next.config.ts` untuk menyembunyikan lencana dev
- Dokumen resmi ada offline di `web/node_modules/next/dist/docs/` — **baca dari situ**

> **KEPUTUSAN AUDIO (ARYA, 31 Agu): CAMPUR.** Draf naskah pakai `edge-tts`
> (gratis, tanpa batas, suara asli Indonesia `id-ID-ArdiNeural` / `id-ID-GadisNeural`).
> Final pakai ElevenLabs. Kuota gratis **10.000 karakter per BULAN**, reset 1 Okt 2026,
> tagihan **1:1 per huruf**. Terpakai hari ini: 216. Kunci di `.env.local` (di-gitignore).

> **WARNA SISI — satu sumber kebenaran.** `manim/matra_theme.py` yang menentukan.
> Web WAJIB ikut: samping `#3A6EA5` · depan `#C25E4D` · miring `#1F2430` · sudut `#D9A441`.
> Jangan pakai warna aksen situs (hijau/bata) untuk sisi segitiga.

### Belum beres / catatan
- Repo git ada **di dalam `web/`** (dibuat create-next-app), root belum jadi repo.
  Sebaiknya dipindah ke root supaya animasi & dokumen ikut tersimpan riwayatnya. **Perlu izin ARYA.**
- Cache npm lama **11 GB** masih di C: (ARYA memilih tidak dihapus dulu)
- `web/AGENTS.md` bawaan Next 16 berisi peringatan penting: baca
  `node_modules/next/dist/docs/` sebelum menulis kode — **API-nya beda dari ingatan Claude**

> **GAYA TERKUNCI — "Studio Teknis"** (`mockup/d-studio-teknis.html`)
> Krem `#F6F2EC` · kartu `#FFFDFA` · tinta `#211E1A` · hijau `#2F5D50` · oker `#B8863B` · bata `#A6503F`
> Judul **Fraunces** (serif) · teks **Inter** · angka & label teknis **IBM Plex Mono**
> Ciri: penomoran bagian (01, 02…), tabel angka rata kolom bergaris tegas, petak latar halus.

> **Kurikulum — SUDAH TERTUTUP.** Limit & Ruang 3D tidak ada di Buku Guru Kelas 10-11,
> tapi 31 Agu ARYA menambahkan ke `D:\BAHAN MATEMATIKA`: `LIMIT.pdf` (320 hal),
> `3 Dimensi.pdf` (352 hal), `Matematika_BS_KLS_XII_Rev.pdf` (216 hal) —
> **ketiganya teks digital**, bisa dibaca langsung.

### Poles kecil yang tertunda (kerjakan saat membangun komponen asli)
- Label `θ` menumpuk dengan segitiga saat sudut ≥ 75°
- Tanda siku-siku hilang saat segitiga sangat kecil

### Hari 2-3 — Trigonometri ⭐ (jadi cetakan untuk 5 topik lain)
- [ ] Animasi Manim: lingkaran satuan → grafik sin/cos terbentuk
- [ ] Widget **Lingkaran Satuan Hidup** (tarik sudut, 3 hal berubah serempak)
- [ ] Teks penjelasan + rumus + latihan soal + kuis
- [ ] Cari & pasang tautan YouTube pengajar Indonesia

### Hari 4-5 — Limit ⭐
### Hari 6-9 — Grafik Fungsi → Vektor → Ruang 3D → Statistika (1 topik/hari)
### Hari 10 — Latihan soal + kuis semua topik
### Hari 11 — Deploy Vercel + poles
### Hari 12 — Cadangan

---

## 📌 Keputusan yang sudah diambil (jangan diulang perdebatannya)

| Keputusan | Alasan |
|---|---|
| **Hybrid**: Manim video + widget JS | Manim tidak interaktif di browser. Video untuk menjelaskan, widget untuk dicoba. |
| **LaTeX**, bukan Typst | Uji banding 31 Agu: spasi & konvensi LaTeX lebih sesuai buku matematika |
| **Tanpa database** | Hemat 3-4 hari kerja, tidak menambah nilai di mata dosen |
| **Widget 2D buatan sendiri** | Mafs tak dirawat 17 bulan, berisiko bentrok dengan React baru |
| **Three.js + R3F** untuk 3D & vektor | Aktif dirawat (pembaruan 3 hari lalu) |
| **Laptop dulu**, HP setelah semua selesai | Keputusan ARYA — lebih mudah dipantau saat membuat |
| Soal: **campuran** — sebagian tulis sendiri, sebagian salin | Keputusan ARYA. Yang disalin **wajib** dicantumkan sumbernya. |
| Semua berkas di **drive D** | C: tinggal 16 GB dari 376 GB |
| Nama proyek **MATRA** | "matra" = dimensi (KBBI) |

## ⚠️ Risiko yang dipantau
1. **Waktu review ARYA jadi leher botol** — materi matematika wajib diperiksa ARYA
2. **Render Manim makan menit, bukan detik** — selalu render di latar belakang
3. **Widget buatan sendiri** — kalau Hari 2 terbukti terlalu lambat, pindah ke Mafs. Putuskan Hari 2, jangan Hari 8.
4. **C: 96% penuh** — cache npm & paket MiKTeX menumpuk di C. Pantau.
5. **PDF scan mahal dibaca** — bedah halaman terpilih, jangan borong

## 🗒️ Catatan untuk Claude sesi berikutnya
- ARYA **bukan programmer**. Jelaskan dampak dulu, mekanisme belakangan.
- ARYA minta dikritik, bukan diiyakan. Kalau ada pendekatan lebih baik, katakan.
- Jangan mengaku selesai tanpa menjalankan dan melihat hasilnya.
- Folder `D:\MANIM` lama sudah kosong — boleh dihapus (menunggu izin ARYA).
