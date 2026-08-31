# MATRA — Matematika Interaktif
## Dokumen Desain

**Tanggal:** 31 Agustus 2026
**Pemilik:** ARYA
**Status:** Disetujui — siap masuk implementasi
**Tenggat demo:** 12 September 2026

---

## 1. Masalah yang dipecahkan

Siswa SMA menghafal rumus matematika tanpa memahami dari mana rumus itu datang.
`sin θ` dihafal sebagai "depan per miring", bukan dipahami sebagai koordinat titik yang berputar.
Limit dihafal sebagai "masukkan angkanya", bukan dipahami sebagai perilaku *mendekati*.

Video saja tidak cukup — siswa menonton lalu lupa. Teks saja tidak cukup — siswa tidak melihat gerakannya.
**MATRA menggabungkan keduanya**: animasi yang menjelaskan, lalu alat yang bisa siswa mainkan sendiri.

## 2. Batasan penting yang membentuk desain

**Manim bukan teknologi interaktif.** Manim adalah mesin render video (output MP4/WebM). Ia tidak bisa
merespons slider atau seretan mouse. Referensi yang ARYA sukai (anatomyatelier.vercel.app) memakai
Three.js — teknologi yang sama sekali berbeda.

Konsekuensinya, MATRA adalah sistem **hybrid**:

| Kebutuhan | Alat | Alasan |
|---|---|---|
| Menjelaskan *kenapa* sesuatu benar | **Manim** → video WebM | Gerak yang dirancang, kualitas 3Blue1Brown |
| Membiarkan siswa *mencoba* | **Widget JavaScript** | Respons seketika, tidak mungkin dari video |

Dua alat, dua tugas berbeda. Bukan satu barang.

## 3. Bentuk produk

Satu situs. Beranda = 6 kartu topik. Tiap halaman topik memakai **urutan yang sama**:

```
1. Animasi Manim        →  "kenapa begitu"       (video WebM)
2. Widget interaktif    →  "coba sendiri"        (React)
3. Penjelasan + rumus   →  "ini definisinya"     (teks + KaTeX)
4. Latihan soal         →  "kerjakan"            (soal + pembahasan)
5. Kuis berskor         →  "sudah paham belum?"  (localStorage)
6. Video YouTube        →  "belajar lebih lanjut" (tautan)
```

Satu cetakan, enam pengisian. **Inilah yang membuat 6 topik muat dalam 12 hari.**

## 4. Susunan teknis

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Situs | Next.js 16 + TypeScript + Tailwind | Standar Vercel, deploy sekali klik |
| Animasi | Manim CE 0.21 → WebM (VP9) | WebM jauh lebih kecil dari MP4 |
| Rumus (video) | **LaTeX / `MathTex`** | Uji banding 31 Agu: spasi & konvensi lebih sesuai buku |
| Rumus (web) | KaTeX 0.18 | Cepat, ringan, tanpa server |
| Widget 2D | **Buatan sendiri** — SVG + React | Mafs tak dirawat 17 bulan → risiko bentrok React |
| Widget 3D | Three.js 0.185 + React Three Fiber 9.7 | Aktif dirawat, matang |
| Kuis & skor | `localStorage` di browser siswa | **Tanpa database, tanpa login** — hemat 3-4 hari |
| Hosting | Vercel (gratis) | Link publik untuk dosen |

### Keputusan yang sengaja TIDAK diambil (YAGNI)
- ❌ Database — tidak menambah nilai yang dosen nilai, memakan 3-4 hari
- ❌ Login / akun siswa — sama
- ❌ Multi-bahasa — struktur disiapkan, tapi tidak dikerjakan sebelum demo
- ❌ Versi HP — dikerjakan setelah 6 topik selesai (keputusan ARYA)
- ❌ Mafs — pustaka mati, risiko terlalu besar untuk tenggat 12 hari

## 5. Enam topik dan miskonsepsi yang dilawan

Tiap widget dirancang membunuh **satu salah paham spesifik**. Ini inti pedagogisnya —
tanpa ini, widget cuma mainan.

Miskonsepsi di bawah **dikutip dari kotak "Miskonsepsi !?" pada Buku Panduan Guru**, bukan karangan
Claude — kecuali dua baris bertanda ‡ yang materinya di luar Kelas 10-11 (lihat catatan kurikulum).

| # | Topik | Kelas | Widget unggulan | Miskonsepsi yang dilawan |
|---|---|---|---|---|
| 1 | **Trigonometri** ⭐ | 10 · Bab 4 | **Segitiga Sebangun** — geser ukuran segitiga; sisi berubah, `tan θ` tidak bergerak | *"nilai sin/cos/tan itu angka mati"* → ia **rasio**, tetap sama pada segitiga sebangun |
| 2 | **Limit** ⭐ ‡ | 12 | **Zoom Tak Terbatas** — perbesar terus di sekitar titik; plus slider ε–δ | *"limit = nilai fungsi di titik itu"* → fungsi boleh tidak terdefinisi di sana |
| 3 | Grafik Fungsi | 10 · Bab 6<br>11 · Bab 1 | **Lab Koefisien** — slider a, b, c, d; plus uji garis vertikal | *"setiap grafik pasti fungsi"*; *"kodomain = range"* |
| 4 | Vektor | 10 · Bab 3 | **Meja Vektor** — tarik dua panah; resultan & hasil kali titik ikut berubah | *"vektor cuma panah"* → besar + arah yang dijumlah secara geometris |
| 5 | Ruang 3D ‡ | 12 | **Ruang Bisa Diputar** — titik, garis, bidang, dan irisannya | intuisi 2D yang keliru dipakai di 3D |
| 6 | Statistika | 10 · Bab 7<br>11 · Bab 3 | **Tarik Data** — geser satu titik; mean lari, median diam; plus diagram pencar | *"posisi x dan y boleh tertukar"*; *"arah gradien dibaca terbalik"* |

### ⚠️ Catatan kurikulum (temuan 31 Agu 2026)
Daftar bab resmi Kurikulum Merdeka yang tersedia:
**Kelas 10** — Eksponen & Logaritma · Barisan & Deret · **Vektor** · **Trigonometri** ·
Sistem Persamaan Linear · **Fungsi Kuadrat** · **Statistika** · Peluang.
**Kelas 11** — Komposisi Fungsi & Invers · Lingkaran · **Statistika**.

**Limit dan Ruang 3D tidak ada di Kelas 10-11** — keduanya materi Kelas 12, dan Buku Guru Kelas 12
belum tersedia di mesin ini. Untuk dua topik itu, patokan level diambil dari Big Book SMA +
Diktat Kalkulus ITB. **Setiap halaman topik mencantumkan label kelasnya secara jujur.**

⭐ = topik unggulan: 2 widget + 2 animasi masing-masing. Sisanya 1 widget + 1 animasi.

**Trigonometri dikerjakan pertama** karena polanya paling jelas — ia jadi cetakan yang terbukti
sebelum dipakai 5 kali. **Limit kedua** karena paling sulit, butuh cetakan yang sudah matang.

## 6. Sumber materi dan aturan pemakaiannya

| Sumber | Dipakai untuk | Bisa dibaca |
|---|---|---|
| **Buku Guru Matematika Kelas 10 & 11** (Kurikulum Merdeka) | ⭐ Urutan capaian pembelajaran, miskonsepsi umum, cara guru menjelaskan | teks digital, 512 hal |
| **Diktat Kalkulus 1 & 2 ITB** (Warsoma Djohan, Wono Setya Budhi) | ⭐ Istilah matematika Indonesia yang benar | teks digital, 203 hal |
| Stewart *Calculus* 9e — Solution | Pola & tingkat kesulitan soal | teks digital, 902 hal |
| Big Book Matematika SMA | Bahasa & level SMA | **scan** — halaman terpilih |
| Stewart *Calculus* 9e | Ketepatan definisi & konsep | **scan** — seperlunya |
| mathcyber1997.com (Sukardi, S.Pd., M.Si.) | Soal SMA/kuliah/olimpiade | web |

**Aturan bahasa:** Stewart dan diktat ITB dibaca supaya *Claude* tidak salah konsep.
Yang sampai ke siswa memakai bahasa Buku Guru SMA. **Jembatan, bukan terjemahan.**

**Aturan soal (keputusan ARYA, 31 Agu):** campuran — sebagian ditulis sendiri, sebagian disalin.
- Soal yang **disalin** → wajib mencantumkan sumber (nama penulis + tautan) di bawah soal.
  Ini praktik akademik normal dan menghormati penulis aslinya.
- Soal yang **ditulis sendiri** → wajib dikalibrasi dulu terhadap Stewart Solution dan mathcyber1997,
  supaya tidak terlalu mudah. *(ARYA sebelumnya menilai soal buatan Claude terlalu sederhana —
  ini masalah kalibrasi, dan kalibrasi itu wajib sebelum menulis, bukan sesudah.)*
- PDF referensi tidak pernah disalin gambar atau teksnya apa adanya.

## 7. Susunan folder

```
D:\MANIM-MATRA\
├── CLAUDE.md                    # konteks proyek — otomatis dibaca tiap sesi
├── PROGRESS.md                  # papan status hidup
├── docs/superpowers/specs/      # dokumen ini
├── manim/
│   ├── matra_theme.py           # warna, font, ukuran — seragam untuk semua animasi
│   ├── scenes/                  # satu berkas per topik
│   └── render.py                # render batch + kompres ke WebM
├── web/
│   ├── app/topik/[slug]/        # halaman topik
│   ├── components/widgets/      # widget interaktif
│   ├── components/plot/         # primitif bidang koordinat (dipakai ulang)
│   ├── content/                 # materi tiap topik (data TypeScript)
│   └── public/anim/             # video WebM hasil render
└── media/                       # keluaran mentah Manim (tidak masuk git)
```

**Prinsip:** tiap widget satu berkas, satu tujuan, bisa diuji sendiri.
`components/plot/` berisi primitif bersama (bidang koordinat, titik yang bisa ditarik,
penggambar fungsi) supaya 6 topik tidak menulis ulang hal yang sama.

## 8. Jadwal 12 hari

| Hari | Target | Bukti selesai |
|---|---|---|
| **1** | Lingkungan siap ✅, 3 mockup gaya, rangka situs | ARYA memilih 1 gaya |
| **2-3** | Trigonometri ⭐ lengkap | 1 halaman utuh jalan = cetakan terbukti |
| **4-5** | Limit ⭐ lengkap | halaman kedua jalan |
| **6** | Grafik Fungsi | |
| **7** | Vektor | |
| **8** | Ruang 3D | |
| **9** | Statistika | |
| **10** | Latihan soal + kuis 6 topik | semua kuis jalan |
| **11** | Deploy Vercel + tautan YouTube + poles | link publik hidup |
| **12** | **Cadangan** — perbaikan & latihan demo | |

Hari 12 sengaja dikosongkan. Kalau ada yang meleset, di situ tempatnya.

## 9. Cara memastikan ini benar-benar jalan

- **Tiap widget diuji manual** di browser sebelum dinyatakan selesai
- **Tiap animasi Manim ditonton** hasilnya, bukan cuma dicek "render sukses"
- **Playwright smoke test** per halaman topik: halaman termuat, video ada, widget merespons
- **Materi matematika diperiksa ARYA** sebelum masuk situs — ini gerbang wajib
- Tidak ada klaim "selesai" tanpa bukti yang dilihat

## 10. Risiko

| # | Risiko | Penanganan |
|---|---|---|
| 1 | Waktu review ARYA jadi leher botol | Kirim materi per topik, jangan menumpuk sampai akhir |
| 2 | Render Manim makan menit | Selalu render di latar belakang sambil mengerjakan hal lain |
| 3 | Widget buatan sendiri terlalu lambat dibuat | **Putuskan di Hari 2**, bukan Hari 8. Kalau lambat → pindah ke Mafs. |
| 4 | Video menumpuk, Vercel tersedak | Kompres WebM VP9, target < 3 MB per video. Cadangan: Vercel Blob |
| 5 | C: 96% penuh | Semua di drive D. Pantau cache npm & paket MiKTeX di C. |
| 6 | PDF scan mahal dibaca | Bedah halaman terpilih (8-10 per topik), jangan borong 754 halaman |

## 11. Yang jujur harus disampaikan ke dosen

MATRA adalah **alat bantu belajar**, bukan sistem yang sudah divalidasi ahli pendidikan.
Materinya disusun dari buku kurikulum dan diktat perguruan tinggi, tapi belum diuji ke siswa nyata
dan belum ditinjau ahli. Menyebutkan ini di muka lebih baik daripada ketahuan saat ditanya.
