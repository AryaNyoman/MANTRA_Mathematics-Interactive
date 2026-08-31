# PROGRESS — MATRA

> **SESI BARU: baca berkas ini dari atas sampai bawah SEBELUM mengerjakan apa pun.**
> Terakhir diperbarui: **31 Agustus 2026, malam** (akhir sesi 2).

## Ringkas
| | |
|---|---|
| Tahap sekarang | **Trigonometri 10 dari 10 tahap lengkap** teks + widget. **Video pertama JADI.** |
| Yang tersisa | **6 video Manim lagi** (tahap 2, 4, 5, 6, 7, 9) |
| Rancangannya | `docs/superpowers/specs/2026-08-31-trigonometri-alur-belajar.md` |
| Tenggat | 12 September 2026 |
| Menjalankan situs | `cd web && npm run dev` → biasanya `http://localhost:3001` |
| Penghalang | *(tidak ada)* |

### Yang berubah di sesi 2
1. **Tahap 10 selesai** — 4 contoh (kamera, layar berputar, game, suara) + widget galeri
   berfoto nyata, contoh kamera bisa digeser jaraknya.
2. **Video tahap 8 SELESAI** dan sudah tayang: `web/public/anim/tahap8-grafik-sin.webm`,
   1080p60, 91 detik, 6,14 MB, bernarasi, lolos gerbang mutu 23 frame.
3. **Tiga perkakas baru** dibangun dari membedah dua repo rujukan — lihat bagian
   "Perkakas" di bawah. Ketiganya dipakai ulang untuk 6 video berikutnya.
4. **Pemutar video di situs** akhirnya ada. Sebelumnya tipe `Tahap` menyediakan
   tempat untuk video tapi tidak ada satu pun bagian situs yang menampilkannya —
   video jadi pun tidak akan terlihat siswa.

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
| 8 | Terbentuknya grafik sinus | ✅ `LingkaranKeGrafik` | ✅ | ✅ **JADI** 1080p60, 91 dtk |
| 9 | Sin, cos, tan berdampingan | ✅ `TigaGrafik` | ✅ | ⬜ |
| 10 | Dipakai di dunia nyata | ✅ `DuniaNyata` | ✅ | — tidak perlu |

Plus: **Latihan 4 soal** + **Kuis 8 soal berskor** — keduanya sudah jalan dan teruji.

---

## 🔜 Yang harus dikerjakan berikutnya

### Enam video Manim sisanya — RESEP SUDAH TERBUKTI, TINGGAL DIULANG

Video tahap 8 sudah jadi dari nol sampai tayang. Urutan persisnya, ulangi apa adanya:

```bash
# 1. Tulis naskah  ->  manim/narasi/<topik>.json  (10 segmen, ±90 detik)
# 2. Buat suara + ukur durasinya
python manim/buat_narasi.py <topik>
# 3. Tulis adegan  ->  manim/scenes/<berkas>.py
#    Tiru manim/scenes/tahap8_grafik_sin.py: storyboard di kepala berkas,
#    sub-adegan bernama b01_/b02_..., sinema.babak untuk waktu.
# 4. Periksa SEBELUM render  (2 detik, bukan 10 menit)
python manim/cek_kode.py manim/scenes/<berkas>.py --dalam
# 5. Render UJI kualitas rendah dulu  (±3 menit)
manim -ql --disable_caching manim/scenes/<berkas>.py <NamaAdegan>
# 6. Gerbang mutu: LIHAT lembar kontaknya, nilai tiap frame
python manim/cek_video.py media/videos/<berkas>/480p15/<NamaAdegan>.mp4 --per-detik 0.25
# 7. Baru render final 1080p60  (±15 menit)
manim -qh --format=webm manim/scenes/<berkas>.py <NamaAdegan>
# 8. Gabung narasi -> otomatis tersalin ke web/public/anim/
python manim/gabung_audio.py <topik> <NamaAdegan> --keluar <topik>.webm
# 9. Poster + daftarkan ke tahap.ts
ffmpeg -y -ss 62 -i web/public/anim/<topik>.webm -frames:v 1 -q:v 3 web/public/anim/<topik>.jpg
#    lalu di tahap.ts:  video: { berkas: '<topik>.webm', poster: '<topik>.jpg' },
# 10. Gerbang mutu SEKALI LAGI pada berkas final
python manim/cek_video.py media/<topik>.webm --per-detik 0.25
```

**Jangan lewati langkah 5-6.** Render uji 480p15 memakan 3 menit dan menangkap
cacat yang kalau lolos akan memaksa mengulang render final 15 menit. Pada video
tahap 8, langkah itu menangkap 4 cacat: angka bertumpuk, tanda derajat jatuh di
tengah baris, kurva memotong label sumbu, dan 40% layar bawah kosong.

### Referensi pola visual untuk enam video sisanya
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
**Urutan gerbangnya ADA TIGA, dan ketiganya wajib:**
`cek_kode.py` (sebelum render) → render uji `-ql` + lembar kontak → render final `-qh` + lembar kontak lagi.

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
| `manim/sinema.py` | ⭐ **BARU** Gerakan & tata teks bersama. `babak()` menghitung waktu tiap segmen otomatis dan MENGGAGALKAN render kalau animasi melewati narasinya. `AngkaKoma`, `judul_pembuka`, `keterangan`, `sorot_bagian` |
| `manim/cek_kode.py` | ⭐ **BARU** Periksa adegan SEBELUM render. Menangkap LaTeX rusak, `MathTex` lupa awalan `r`, kelas adegan tanpa `qc.periksa_adegan`, warna hex ditulis langsung. `--dalam` membangun tiap potongan LaTeX sungguhan |
| `manim/lingkungan.py` | ⭐ **BARU** Menambal PATH MiKTeX. **WAJIB di-import paling atas di tiap adegan** |
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
| **Ekspor 1080p60** (`manim -qh`) | Permintaan ARYA 31 Agu. Biayanya ±15 menit render per video dan berkas ±6 MB (720p30 = ±3 MB). Perkiraan awal Claude "60-80 menit" ternyata SALAH — jauh lebih cepat |
| **Foto Tahap 10 dari Wikimedia Commons** | ARYA minta foto internet HD. Yang terpilih kebetulan semuanya berlisensi terbuka (CC0/CC BY/Public domain) — jadi aman sekaligus. Catatan sumber di `web/public/gambar/sumber.json` |
| **Tahap bervideo: tombol Tonton / Coba sendiri** | Menampilkan video DAN widget sekaligus memaksa panggung digulir. Tata letak satu layar sudah dikunci, jadi siswa memilih salah satu |
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

## 🎓 Pelajaran dari dua repo rujukan (dibedah 31 Agu, sesi 2)

ARYA menemukan dua repo. **Kodenya tidak bisa disalin** — AnimationsWithManim
berbasis Manim Februari 2019 (`manimlib.imports`, `CONFIG = {}`, `TexMobject`,
`ShowCreation` semuanya sudah dihapus dari Manim CE 0.21). Yang diambil polanya.

| Sumber | Yang diambil dan sudah diterapkan |
|---|---|
| Elteoremadebeethoven/AnimationsWithManim | Storyboard sebagai komentar bernomor di kepala berkas, ditulis SEBELUM kode · `construct()` cuma memanggil sub-adegan bernama · "urutan updater itu penting" · `clear_updaters()` sebelum frame terakhir · `align_to(label, DOWN)` untuk angka berubah |
| HarleyCoops/Math-To-Manim (bagian `mythos/`) | Tata bahasa kamera: judul → tampilkan → zoom → **tarik mundur** · **maksimal dua blok teks yang harus dibaca** · keterangan yang menghapus dirinya sendiri · `MathTex` multi-bagian + `get_part_by_tex` alih-alih mengiris karakter · batasi lebar teks (mencegah, bukan mendeteksi) · pemeriksa statis sebelum render |

**Jangan menghabiskan waktu di Math-To-Manim lagi**: 788 berkas tapi hanya ~4 yang
berguna; 577 di antaranya ada di `legacy/` dan `archive/`, sisanya kerangka agen AI
yang menyuruh model lain menulis Manim — bukan yang proyek ini butuhkan.

---

## 🔧 Jebakan lingkungan yang sudah diselesaikan

**MiKTeX terpasang tapi TIDAK terdaftar di PATH Windows.** Gejalanya menyesatkan:

    FileNotFoundError: [WinError 2] The system cannot find the file specified

Pesan itu tidak menyebut LaTeX sama sekali, jadi mudah disangka salah kode. Yang
"tidak ditemukan" sebenarnya `latex.exe`. Sudah ditambal oleh `manim/lingkungan.py`
— **tiap adegan wajib meng-import `lingkungan` sebelum `from manim import *`.**
Tambalannya hanya untuk proses yang berjalan; setelan Windows ARYA tidak disentuh.

---

## 🗒️ Catatan untuk Claude sesi berikutnya
- ARYA **bukan programmer**. Jelaskan dampak dulu, mekanisme belakangan.
- ARYA **minta dikritik**, bukan diiyakan. Kalau ada pendekatan lebih baik, katakan.
- **Jangan mengaku selesai tanpa menjalankan dan MELIHAT hasilnya.**
- **Perkiraan waktu Claude bisa meleset jauh.** Sesi 2: render 1080p60 diperkirakan
  "60-80 menit", nyatanya ±15 menit. Ukur sekali, jangan menakut-nakuti dengan tebakan.
- **Telusuri dulu sebelum menyimpulkan sesuatu tidak ada / tidak bisa.**
  Sudah dua kali Claude salah menyimpulkan dan ARYA yang mengoreksi
  (skill `/teach` yang ternyata ada, dan suara Indonesia di ElevenLabs yang ternyata ada
  tapi terkunci berbayar).
