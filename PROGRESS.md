# PROGRESS — MATRA

> **SESI BARU: baca berkas ini dari atas sampai bawah SEBELUM mengerjakan apa pun.**
> Terakhir diperbarui: **31 Agustus 2026, sore** (akhir sesi 1).

## Ringkas
| | |
|---|---|
| Tahap sekarang | **Trigonometri digarap mendalam** — 9 dari 10 tahap sudah punya teks + widget |
| Yang tersisa | **Tahap 10**, lalu **7 video Manim** (belum satu pun jadi) |
| Rancangannya | `docs/superpowers/specs/2026-08-31-trigonometri-alur-belajar.md` |
| Tenggat | ARYA menyesuaikan sendiri. Fokus: Trigonometri sampai mantap dulu |
| Menjalankan situs | `cd web && npm run dev` → biasanya `http://localhost:3001` |
| Git | 9 commit, working tree bersih |
| Penghalang | *(tidak ada)* |

---

## 📊 Keadaan 10 tahap Trigonometri

| # | Tahap | Widget | Teks | Video |
|---|---|---|---|---|
| 1 | Kenapa kita butuh ini | ✅ `Bayangan` | ✅ | ⬜ |
| 2 | Perbandingan yang tidak berubah | ✅ `SegitigaSebangun` | ✅ | 🟡 versi lama 17 dtk, tanpa narasi |
| 3 | Menamai sisi | ✅ `PenamaanSisi` | ✅ | — tidak perlu |
| 4 | Lahirnya sin, cos, tan | ✅ `PabrikRasio` | ✅ | ⬜ |
| 5 | Lingkaran satuan | ✅ `LingkaranSatuan` | ✅ | ⬜ |
| 6 | Enam rasio sebagai panjang nyata | ✅ `EnamRasio` | ✅ | ⬜ |
| 7 | Sudut istimewa | ✅ `PerjalananSudut` | ✅ | ⬜ |
| 8 | Terbentuknya grafik sinus | ✅ `LingkaranKeGrafik` | ✅ | ⬜ |
| 9 | Sin, cos, tan berdampingan | ✅ `TigaGrafik` | ✅ | ⬜ |
| 10 | **Dipakai di dunia nyata** | ⬜ | ⬜ | — butuh foto |

Plus: **Latihan 4 soal** + **Kuis 8 soal berskor** — keduanya sudah jalan dan teruji.

---

## 🔜 Yang harus dikerjakan berikutnya (urut)

### 1. Tahap 10 — Dipakai di dunia nyata
Permintaan ARYA: contoh **konkret dan dekat dengan remaja** — kamera ponsel, layar gawai,
GPS, animasi game. Fotonya diambil dari internet lewat Playwright, lalu ditaruh di
`web/public/gambar/`. Belum dimulai sama sekali.

### 2. Tujuh video Manim — bagian terberat yang tersisa
Pola yang ditiru sudah dibedah jadi lembar kontak di `qc/referensi/`:

| Untuk tahap | Referensi (di folder Downloads ARYA) | Pola yang ditiru |
|---|---|---|
| 5, 6 | `6 Rasion Trigonometri.mp4` | Lingkaran satuan, `cos θ = x`, `sin θ = y`, lalu keenam rasio muncul sebagai ruas berwarna sambil daftar rumus tumbuh di kanan |
| 7 | `Unit Circle Journey (sudut istimewa).mp4` | Lingkaran berlabel derajat + radian, jari-jari menyapu berhenti di tiap sudut istimewa, juring terisi |
| 8 | `Visualizing Trigonometry_ Fungsi SIN.mp4` | Lingkaran **mengecil ke kiri**, sumbu grafik muncul di kanan, garis mendatar menghubungkan tinggi ke grafik |
| 9 | `Grafik SIN COS TAN.mp4` | Tiga panel bertumpuk digerakkan satu sudut |

Rujukan tambahan: github.com/adenosie/math-vids (Manim versi lama — **tiru pola visualnya,
jangan salin kodenya**).

### 3. Setelah Trigonometri mantap
Lima topik lain (Limit, Grafik Fungsi, Vektor, Ruang 3D, Statistika) masih kosong.
Halaman topiknya sudah ada dan menampilkan "belum dibangun" secara jujur.

---

## 🚨 ATURAN WAJIB (jangan dilanggar)

### Gerbang video
**"Rendered" di log BUKAN bukti video itu benar.** Pada 31 Agu sebuah video dirilis
dengan **7 cacat** karena hanya dicek lognya — ARYA yang menemukannya. Sejak itu:
1. Adegan wajib memanggil `qc.periksa_adegan()` di tiap tahap → render **GAGAL** kalau
   ada yang bertindih atau keluar bingkai
2. Jalankan `python manim/cek_video.py <video> --detik <momen>` lalu **BUKA lembar
   kontaknya dan nilai tiap frame satu per satu**
3. Baru boleh bilang selesai. Ada cacat tersisa → **sebutkan**, jangan diamkan

### Bentuk penjelasan
- **Jangan tembok paragraf.** Pecah jadi blok berselang-seling: paragraf pendek,
  daftar poin berlabel tebal, kalimat sorot, kotak contoh berhitung.
- **Tapi jangan dipangkas isinya.** Ada siswa yang belajar dengan membaca.
- Kata **"Miskonsepsi" JANGAN muncul** — itu istilah guru. Pakai **"Sering keliru"**,
  dan taruh **di bawah** setelah siswa paham, bukan menyambut di halaman depan.

### Widget
- Tidak boleh memotong gambarnya sendiri. Bingkai wajib menyesuaikan otomatis dan
  memberi tahu penggunanya lewat penunjuk skala.
- Sebisanya bisa **ditarik/diklik langsung**, bukan cuma lewat slider.

### Soal
Kalibrasi dulu ke sumber nyata **sebelum** menulis. Soal buatan Claude cenderung
terlalu mudah — itu temuan ARYA, bukan dugaan.

### Warna matematika — satu sumber kebenaran
`manim/matra_theme.py` = `web/lib/warna.ts`:
samping `#3A6EA5` · depan `#C25E4D` · miring `#1F2430` · sudut `#D9A441`
**Jangan** pakai aksen situs (hijau `#2F5D50`, oker `#B8863B`, bata `#A6503F`) untuk
bagian matematika — pernah terjadi dan merusak kaitan video↔widget.

---

## 🧰 Peta berkas

### Alat mutu (Python)
| Berkas | Fungsi |
|---|---|
| `manim/qc.py` | Gerbang tata letak di dalam adegan. Sudah menangkap 3 cacat nyata |
| `manim/cek_video.py` | Lembar kontak ffmpeg — wajib dijalankan **dan dilihat** |
| `manim/buat_narasi.py` | Bikin suara per kalimat **dan ukur durasinya** → `durasi.json` |
| `manim/gabung_audio.py` | Gabung narasi ke video; **berhenti** kalau selisih > 1,5 detik |
| `manim/matra_theme.py` | Warna & tema animasi |
| `manim/narasi/trigonometri.json` | Naskah narasi, satu sumber kebenaran |

### Situs (Next.js 16, di `web/`)
| Berkas | Isi |
|---|---|
| `content/trigonometri/tahap.ts` | ⭐ **10 tahap: teks, poin, contoh, sering-keliru** |
| `content/trigonometri/latihan.ts` | Naskah narasi, 4 latihan, 8 kuis, 4 kanal YouTube |
| `content/topik.ts` | Daftar 6 topik + label kelas jujur |
| `components/topik/Trigonometri.tsx` | Halaman utama, daftar tahap + dua kolom |
| `components/topik/Penjelasan.tsx` | Perender blok penjelasan |
| `components/topik/Latihan.tsx`, `Kuis.tsx` | Latihan & kuis |
| `components/widget/*.tsx` | 9 widget interaktif |
| `lib/warna.ts` | ⭐ Warna matematika |
| `lib/simpanan.ts` | localStorage lewat `useSyncExternalStore` |
| `app/globals.css` | Sistem desain "Studio Teknis" + semua tata letak |

---

## 📌 Keputusan (jangan diulang perdebatannya)

| Keputusan | Alasan |
|---|---|
| **Hybrid**: Manim video + widget JS | Manim tidak interaktif di browser |
| **LaTeX**, bukan Typst | Uji banding 31 Agu: spasi & konvensi lebih sesuai buku |
| **Tanpa database** | Skor kuis di localStorage. Hemat 3-4 hari |
| **Widget 2D buatan sendiri** | Mafs tak dirawat 17 bulan |
| **Suara: `edge-tts` `id-ID-ArdiNeural`** | Indonesia asli, gratis, tanpa batas. **ElevenLabs gratis mengunci SEMUA suara Indonesia di balik langganan berbayar** — terverifikasi dari pesan API-nya. Menambah akun gratis TIDAK menolong: yang membatasi tingkat langganan, bukan sisa kredit |
| **Durasi animasi mengikuti durasi suara** | Bukan ditebak. Lihat `durasi.json` |
| Semua berkas di **drive D** | C: tinggal ~16 GB dari 376 GB |
| Tata letak **satu layar** | Kiri visual, kanan penjelasan. Tanpa gulir atas-bawah |

### Gaya terkunci — "Studio Teknis"
Krem `#F6F2EC` · kartu `#FFFDFA` · tinta `#211E1A` · garis `#E1D9CC`
Judul **Fraunces** · teks **Inter** · angka & label teknis **IBM Plex Mono**
Patokan visual: `mockup/e-satu-layar.html`

### Pelajaran Next 16 (beda dari ingatan Claude — sudah diverifikasi)
- `params` pada route dinamis adalah **`Promise`** → wajib `await params`
- **Tailwind 4**: `@import "tailwindcss"` + `@theme inline`, **tanpa** `tailwind.config.js`
- **`next lint` sudah dihapus** → pakai `npx eslint .`
- React 19 melarang `setState` di dalam `useEffect` dan komponen yang dibuat di dalam render
- Dokumen resmi ada **offline** di `web/node_modules/next/dist/docs/` — baca dari situ

---

## 📚 Bahan referensi (di luar folder proyek)
| Berkas | Untuk | Bisa dibaca |
|---|---|---|
| `D:\BAHAN MATEMATIKA\Buku Matematika Kelas 10 & 11 - Guru.pdf` | ⭐ Kurikulum Merdeka, kotak "Miskonsepsi !?" | teks digital |
| `D:\BAHAN MATEMATIKA\LIMIT.pdf` (320 hal) | topik Limit | teks digital |
| `D:\BAHAN MATEMATIKA\3 Dimensi.pdf` (352 hal) | topik Ruang 3D | teks digital |
| `D:\BAHAN MATEMATIKA\Matematika_BS_KLS_XII_Rev.pdf` | Buku Siswa Kelas XII | teks digital |
| `D:\SEKOLAH S1 & S2\S1\matematika\kalkulus 1.pdf`, `kalkulus 2.pdf` | Diktat ITB — istilah Indonesia yang benar | teks digital |
| `…\Calculus (9rd Edition) - Solution.pdf` | Pola & tingkat kesulitan soal | teks digital |
| `…\sb-big-book-matematika-sma-…pdf` | Level & bahasa SMA | **scan** |
| https://mathcyber1997.com | Soal | **diblokir pemeriksa bot** — jangan diterobos; minta ARYA menempelkan sendiri |

---

## ⚠️ Risiko & catatan terbuka
1. **Belum satu pun video jadi.** Itu sisa pekerjaan terbesar.
2. Adegan `manim/scenes/trigonometri_anim.py` versi bernarasi **belum berhasil dirender** —
   terakhir gagal di gerbang mutu: `kalk keluar bingkai: bawah -4.33 < -3.80`.
   **Jangan ditambal** — adegan itu memang akan dirombak mengikuti rancangan 10 tahap.
3. Render Manim 113 detik makan ±8 menit → selalu jalankan di latar belakang.
4. Cache npm lama **11 GB** masih di C: (ARYA memilih tidak dihapus).
5. Waktu review ARYA jadi leher botol — materi matematika wajib diperiksa dia.

## 🗒️ Catatan untuk Claude sesi berikutnya
- ARYA **bukan programmer**. Jelaskan dampak dulu, mekanisme belakangan.
- ARYA **minta dikritik**, bukan diiyakan. Kalau ada pendekatan lebih baik, katakan.
- **Jangan mengaku selesai tanpa menjalankan dan MELIHAT hasilnya.**
- **Telusuri dulu sebelum menyimpulkan sesuatu tidak ada / tidak bisa.**
  Sudah dua kali Claude salah menyimpulkan dan ARYA yang mengoreksi
  (skill `/teach` yang ternyata ada, dan suara Indonesia di ElevenLabs yang ternyata ada
  tapi terkunci berbayar).
