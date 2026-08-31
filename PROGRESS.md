# PROGRESS — MATRA

> **Sesi baru: baca berkas ini dari atas sampai bawah sebelum mengerjakan apa pun.**
> Terakhir diperbarui: **31 Agustus 2026, sore**.

## Ringkas
| | |
|---|---|
| Tahap sekarang | **Trigonometri digarap mendalam** — 10 tahap belajar, 7 video |
| Rancangannya | `docs/superpowers/specs/2026-08-31-trigonometri-alur-belajar.md` |
| Tenggat | ARYA menyesuaikan sendiri. Fokus: Trigonometri sampai mantap dulu |
| Situs jalan di | `http://localhost:3001` (`cd web && npm run dev`) |
| Git | 5 commit, working tree bersih |
| Penghalang | *(tidak ada)* |

---

## 🔄 Arah sekarang — Trigonometri 10 tahap

ARYA mengkritik struktur awal: halaman langsung menyodorkan rumus `tan θ = depan/samping`
**tanpa pernah menjelaskan apa itu tangen dan dari mana asalnya**. Kritik itu benar.

| # | Tahap | Video | Status |
|---|---|---|---|
| 1 | Kenapa kita butuh ini (masalah nyata) | ✅ perlu | 🟢 teks+widget jadi, video belum |
| 2 | Perbandingan yang tidak berubah | ✅ **sudah ada** | 🟡 perlu narasi ulang |
| 3 | Menamai sisi (depan/samping/miring) | — | ✅ selesai |
| 4 | Lahirnya sin, cos, tan | ✅ perlu | 🟢 teks+widget jadi, video belum |
| 5 | Lingkaran satuan (`cos θ = x`, `sin θ = y`) | ✅ perlu | 🟢 teks+widget jadi, video belum |
| 6 | Enam rasio sebagai panjang nyata | ✅ perlu | ⬜ belum |
| 7 | Sudut istimewa & kenapa istimewa | ✅ perlu | ⬜ belum |
| 8 | Terbentuknya grafik sin | ✅ perlu | ⬜ belum |
| 9 | Sin, cos, tan berdampingan | ✅ perlu | ⬜ belum |
| 10 | Dipakai di dunia nyata (+ foto) | — | ⬜ belum |

**Permintaan ARYA yang wajib dipatuhi:**
- Kata **"Miskonsepsi" JANGAN di halaman depan** — istilah guru, terasa menghakimi
  sebelum mengajar. Turunkan jadi kotak **"Sering keliru"** di bawah tiap tahap.
- **Jangan memampatkan informasi.** Ada siswa yang belajar dengan membaca, ada yang
  dengan menonton. Teks harus lengkap DAN video harus banyak & bertahap.
- Tahap 10 pakai contoh konkret dekat remaja: kamera ponsel, layar gawai, GPS,
  animasi game. Fotonya diambil dari internet lewat Playwright.

**Referensi video ARYA** (4 berkas di folder Downloads) sudah dibedah jadi lembar
kontak di `qc/referensi/`. Pemetaannya ke tiap tahap ada di dokumen rancangan.
Repo rujukan tambahan: github.com/adenosie/math-vids (Manim versi lama — tiru
pola visualnya, jangan salin kodenya).

---

## ✅ Sudah selesai

### Lingkungan (terverifikasi, bukan klaim)
Manim **0.21.0** · MiKTeX **25.12** (AutoInstall aktif) · Typst 0.15 (cadangan, tak dipakai)
FFmpeg 8.1.1 · Python 3.11.9 · Node 24.13
Next **16.3.3** · React **19.2.8** · TypeScript 5 · Tailwind **4**

### Alat mutu — WAJIB dipakai
| Berkas | Fungsi |
|---|---|
| `manim/qc.py` | Dipanggil di dalam adegan. Render **GAGAL** kalau objek bertindih atau keluar bingkai. Sudah menangkap 2 cacat nyata. |
| `manim/cek_video.py` | Lembar kontak ffmpeg. Wajib dijalankan **dan hasilnya dilihat** sebelum video dinyatakan jadi. |
| `manim/buat_narasi.py` | Membuat suara per kalimat **dan mengukur durasinya** → `audio/<topik>/durasi.json` |
| `manim/gabung_audio.py` | Menggabung narasi ke video; **berhenti** kalau selisih durasi > 1,5 detik |

### Situs
- Beranda 6 kartu topik, label kelas jujur, yang belum digarap ditandai
- Halaman topik satu layar: kiri visual (tab), kanan penjelasan
- Widget Segitiga Sebangun: bingkai swa-sesuai (tidak pernah memotong),
  **bisa ditarik langsung** di titik puncaknya
- Latihan 4 soal + pembahasan; Kuis 8 soal berskor, rekor di localStorage
- 4 kanal YouTube Indonesia, terverifikasi hidup

### Bug ARYA yang sudah diperbaiki
1. Segitiga terpotong saat sudut curam → bingkai menyesuaikan otomatis
2. Video punya 7 cacat (warna belang, teks bertindih, tanda siku-siku di luar segitiga)
3. Warna sisi beda antara video dan widget → disatukan lewat `web/lib/warna.ts`
4. Zoom terbalik: kotak visual membesar saat teks mengecil → kini diukur dalam rem
5. Segitiga tidak bisa ditarik langsung → titik puncak kini punya pegangan

---

## 📌 Keputusan (jangan diulang perdebatannya)

| Keputusan | Alasan |
|---|---|
| **Hybrid**: Manim video + widget JS | Manim tidak interaktif di browser |
| **LaTeX**, bukan Typst | Uji banding 31 Agu: spasi & konvensi lebih sesuai buku |
| **Tanpa database** | Skor kuis di localStorage. Hemat 3-4 hari, tidak menambah nilai |
| **Widget 2D buatan sendiri** | Mafs tak dirawat 17 bulan |
| **Suara: `edge-tts` `id-ID-ArdiNeural`** | Indonesia asli, gratis, tanpa batas. **ElevenLabs gratis mengunci SEMUA suara Indonesia di balik langganan berbayar** — terverifikasi 31 Agu lewat pesan API-nya. Menambah akun gratis tidak menolong: yang membatasi tingkat langganan, bukan sisa kredit. |
| **Durasi animasi mengikuti durasi suara** | Bukan ditebak. Lihat `durasi.json`. |
| Soal **dikalibrasi dulu** ke sumber nyata | Soal buatan Claude cenderung terlalu mudah (temuan ARYA) |
| Semua berkas di **drive D** | C: tinggal ~16 GB dari 376 GB |

### Gaya terkunci — "Studio Teknis"
Krem `#F6F2EC` · kartu `#FFFDFA` · tinta `#211E1A` · aksen situs hijau `#2F5D50`, oker `#B8863B`, bata `#A6503F`
Judul **Fraunces** · teks **Inter** · angka **IBM Plex Mono**
Patokan: `mockup/e-satu-layar.html`

### Warna MATEMATIKA — satu sumber kebenaran
`manim/matra_theme.py` = `web/lib/warna.ts`. Web WAJIB ikut:
samping `#3A6EA5` · depan `#C25E4D` · miring `#1F2430` · sudut `#D9A441`.
**Jangan** pakai aksen situs (hijau/bata) untuk bagian matematika.

### Pelajaran Next 16 (beda dari ingatan Claude)
- `params` pada route dinamis adalah **`Promise`** — wajib `await params`
- **Tailwind 4**: `@import "tailwindcss"` + `@theme inline`, **tanpa** `tailwind.config.js`
- **`next lint` sudah dihapus** — pakai `npx eslint .`
- Dokumen resmi offline di `web/node_modules/next/dist/docs/` — **baca dari situ**

---

## ⚠️ Risiko & catatan
1. **Waktu review ARYA jadi leher botol** — materi matematika wajib diperiksa ARYA
2. **Render Manim makan menit** — selalu di latar belakang. Adegan 113 detik ±8 menit.
3. **Cache npm lama 11 GB** masih di C: (ARYA memilih tidak dihapus)
4. **PDF scan mahal dibaca** — bedah halaman terpilih, jangan borong
5. Adegan `trigonometri_anim.py` versi bernarasi **belum berhasil dirender** —
   terakhir gagal di gerbang mutu: `kalk keluar bingkai: bawah -4.33 < -3.80`.
   Adegan ini akan ditulis ulang mengikuti rancangan 10 tahap, jadi jangan
   ditambal — rombak saja.

## 🗒️ Catatan untuk Claude sesi berikutnya
- ARYA **bukan programmer**. Jelaskan dampak dulu, mekanisme belakangan.
- ARYA minta dikritik, bukan diiyakan.
- **Jangan mengaku selesai tanpa menjalankan dan MELIHAT hasilnya.**
- Sebelum menyimpulkan sesuatu tidak ada / tidak bisa — **telusuri dulu**.
  Sudah dua kali Claude salah menyimpulkan dan ARYA yang mengoreksi.
