# PROGRESS: MATRA

> **SESI BARU: baca berkas ini dari atas sampai bawah SEBELUM mengerjakan apa pun.**
> Terakhir diperbarui: **1 September 2026, malam** (akhir sesi 5).

## Ringkas
| | |
|---|---|
| Tahap sekarang | **DUA topik selesai: Trigonometri (dengan 7 video) dan Limit (belum bervideo)** |
| Yang tersisa | 7 video Limit, lalu empat topik lain (Grafik Fungsi, Vektor, Ruang 3D, Statistika) |
| Rancangannya | `docs/superpowers/specs/2026-08-31-trigonometri-alur-belajar.md`<br>`docs/superpowers/specs/2026-09-01-revisi-besar-situs.md`<br>`docs/superpowers/specs/2026-09-01-limit-alur-belajar.md`<br>`docs/superpowers/plans/2026-09-01-topik-limit.md` |
| Tenggat | 12 September 2026 |
| Menjalankan situs | `cd web && npm run dev` → `http://localhost:3000` |
| Penghalang | *(tidak ada)* |

### Yang berubah di sesi 3: 22 revisi ARYA

**Aturan tetap yang lahir di sesi ini (berlaku SELAMANYA, semua proyek):**
- **Tanda pisah panjang DILARANG** di teks mana pun yang dibaca orang. Ganti
  dengan koma, titik, atau tanda hubung biasa. Sudah dicatat di `~/.claude/CLAUDE.md`
  dan `CLAUDE.md` proyek ini.

**Halaman depan** dirombak jadi perkenalan, bukan daftar: logo Matra, kalimat
pembuka, korsel 4 cuplikan video (`components/Demo.tsx`), tiga kolom "apa saja
isinya", kartu materi urut dari Kelas 10, kaki halaman berisi nama pembuat
(Nyoman Arya Sejati), logo UNDIKSHA, WhatsApp, dan tombol pasang aplikasi.

**Isi materi** dirapikan: kode `TRIG-10-B4` dibuang, label tab jadi `MATERI 01`,
pembuka Materi 01 ditulis ulang jadi masalah dulu baru jawaban, tiap materi
dipecah jadi sesi bernomor, ditambah kotak **YUK BEREKSPERIMEN 🔬**, `BACA CEPAT`
jadi `RINGKASAN`, dan bagian YouTube dipisah dengan tautan pencarian langsung.

**Latihan** kini pilihan ganda **A sampai E**. **Kuis** terkunci diam-diam sampai
kesepuluh materi dibuka DAN 10 menit membaca terkumpul (`lib/kemajuan.ts`).

**Perbaikan teknis:** bug zoom (panggung dulu ikut melar mengikuti layar, kini
dibatasi rem), subtitle tanpa bayangan dan bisa diperbesar siswa, video di-cache
permanen, PWA siap pasang, dan Materi 10 yang tadinya mati kini keempat contohnya
punya penggeser hidup.


### Yang berubah di sesi 4 (pagi 1 Sep) - revisi lanjutan ARYA

**Bug zoom DIPERBAIKI ULANG, yang pertama belum tuntas.** ARYA menemukan pada
zoom 100% tombol "Tonton"/"Coba sendiri" dan pengatur ukuran teks hilang.
Sebabnya `calc(100vh - var(--nav))` menuntut angka `--nav` selalu tepat.
Sekarang tingginya tidak dihitung sama sekali: `body` jadi kolom flex dan
panggung memakai `flex: 1 1 0`. Diuji di 5 ukuran layar, 3 ukuran font
peramban, dan kedua mode.

**Pelajaran yang ARYA minta dicatat:** revisi tampilan WAJIB dicoba sendiri
lewat Playwright di beberapa tingkat zoom sebelum dilaporkan. Sudah disimpan
sebagai memory `verifikasi-visual-multi-zoom`.

**Halaman baru:** `/latihan` (bank soal berjenjang, bar kemajuan, 7 lencana)
dan `/tentang`. Keduanya sudah ditautkan di navigasi sejak lama tetapi
halamannya tidak pernah dibuat, jadi kedua menu itu selama ini **404**.

**Kuis: bank 32 soal.** Tiap sesi mengambil 8 soal dan menghindari yang sudah
pernah keluar, jadi empat sesi pertama tidak mengulang satu soal pun (sudah
dibuktikan lewat pengujian). Semua jawaban numerik diperiksa ulang dengan
hitungan mesin.

**Materi 10 tidak lagi interaktif.** Penggeser dibuang, fotonya kini tampil
utuh dua per baris dengan `contain`, tidak dipotong lagi.

**Lain-lain:** tab cukup "MATERI 01", logo nav jadi lambang M saja dan
diperbesar, menu "Beranda" ditambahkan, bagian "Apa saja isinya" dijadikan
sorotan (judul serif besar, teks tinta, tiga kartu bernomor), korsel halaman
depan kini berselang-seling video dan cuplikan layar asli, dan label sin/cos
di widget lingkaran satuan diberi halo supaya tidak dipotong garis lingkaran.

**Masih menunggu ARYA:** pilihan slogan halaman depan (5 usulan sudah
diberikan).

### Yang berubah di sesi 5 (malam 1 Sep) - topik kedua: LIMIT

**ARYA memilih Limit sebagai topik kedua, lengkap, dengan 6 sampai 7 video.**
Claude sudah menyampaikan bahwa pilihan itu kemungkinan besar menghabiskan
seluruh sisa waktu sampai 12 September sehingga empat topik lain tidak
tergarap. ARYA tetap memilih itu, dan keputusannya dijalankan penuh.

**Rangka halaman topik DIPISAH lebih dulu.** `Trigonometri.tsx` 638 baris
mencampur rangka halaman dengan penyetelan sepuluh widget, jadi topik kedua
tidak punya jalan lain selain menyalinnya. Sekarang:

| Berkas | Isi |
|---|---|
| `components/topik/HalamanTopik.tsx` | rangka, dipakai semua topik |
| `components/topik/PanggungTrigonometri.tsx` | penyetelan widget trigonometri |
| `components/topik/PanggungLimit.tsx` | penyetelan widget limit |
| `components/topik/jenis.ts` | perjanjian antara rangka dan panggung |
| `content/tipe.ts` | tipe isi yang dipakai bersama |
| `content/daftar-isi.ts` | **daftar pusat, menambah topik cukup satu baris di sini** |

**Buktinya Trigonometri tidak rusak:** 36 sidik jari DOM (18 kombinasi tab dan
mode, dikali kolom kiri dan kanan) diambil dari versi lama dan versi baru
dengan localStorage dikosongkan sama persis. Hasilnya identik huruf demi huruf.

**Limit selesai: 10 materi, 9 widget, 4 latihan, bank 32 soal kuis,
halaman `/latihan/limit`.** Yang belum: tujuh videonya.

**Alat baru `alat/cek_soal.py`.** Memeriksa jawaban limit dengan sympy, dan
menolak jawaban salah dengan menyebutkan yang benar. Dibuat SEBELUM satu soal
pun ditulis. Hasil pemeriksaan: 17 angka di materi lolos semua, 5 jawaban
latihan lolos semua, 28 jawaban kuis lolos semua.

**Tiga cacat tampilan ditemukan dengan MELIHAT potret layar**, bukan dari log:
tulisan bertindih di Materi 01, kalimat yang bertentangan dengan gambarnya
sendiri di Materi 04, dan tulisan menabrak kurva di Materi 07 dan 08.
Ketiganya sudah diperbaiki dan diperiksa ulang.

**Keputusan: galeri Materi 10 Limit digambar sendiri, bukan foto.** Alasannya
beda dengan Tahap 10 Trigonometri: di sana yang ditunjukkan DI MANA segitiga
berada, dan foto menjawabnya. Di sini yang ditunjukkan BENTUK KURVANYA, dan
foto roller coaster tidak memperlihatkan itu. Kalau ARYA lebih suka foto,
tinggal diganti.

---

## 📊 Keadaan 10 tahap Trigonometri

| # | Tahap | Widget | Teks | Video |
|---|---|---|---|---|
| 1 | Kenapa kita butuh ini | ✅ `Bayangan` | ✅ | ⬜ |
| 2 | Perbandingan yang tidak berubah | ✅ `SegitigaSebangun` | ✅ | ✅ **JADI** 1080p60 |
| 3 | Menamai sisi | ✅ `PenamaanSisi` | ✅ | - tidak perlu |
| 4 | Lahirnya sin, cos, tan | ✅ `PabrikRasio` | ✅ | ✅ **JADI** 1080p60 |
| 5 | Lingkaran satuan | ✅ `LingkaranSatuan` | ✅ | ✅ **JADI** 1080p60 |
| 6 | Enam rasio sebagai panjang nyata | ✅ `EnamRasio` | ✅ | ✅ **JADI** 1080p60 |
| 7 | Sudut istimewa | ✅ `PerjalananSudut` | ✅ | ✅ **JADI** 1080p60 |
| 8 | Terbentuknya grafik sinus | ✅ `LingkaranKeGrafik` | ✅ | ✅ **JADI** 1080p60, 96 dtk |
| 9 | Sin, cos, tan berdampingan | ✅ `TigaGrafik` | ✅ | ✅ **JADI** 1080p60 |
| 10 | Dipakai di dunia nyata | galeri foto (tidak interaktif, keputusan ARYA 1 Sep) | ✅ | - tidak perlu |

Plus:
- **Latihan dalam halaman topik**: 4 soal pilihan ganda A-E dengan pembahasan bertahap
- **Kuis**: 8 soal per sesi, diambil dari **bank 32 soal** (`content/trigonometri/kuis.ts`),
  menghindari soal yang sudah pernah keluar
- **Halaman `/latihan`**: bank soal 4 tingkat, bar kemajuan, 7 lencana
- **Halaman `/tentang`**

---

## 📊 Keadaan 10 materi Limit (BARU, sesi 5)

Urutannya sengaja dibalik dari buku: bentuk yang TIDAK bisa disubstitusi
diperkenalkan lebih dulu (Materi 01 dan 04), baru cara cepatnya (Materi 05).

| # | Materi | Widget | Teks | Video |
|---|---|---|---|---|
| 1 | Kecepatan pada satu detik | ✅ `SelangMenyusut` | ✅ | ⬜ prioritas 2 |
| 2 | Mendekati, bukan menyentuh | ✅ `GarisMendekati` | ✅ | ⬜ prioritas 4 |
| 3 | Dua arah harus sepakat | ✅ `TarifMelompat` | ✅ | ⬜ cadangan |
| 4 | Lubang yang tidak mengubah tujuan | ✅ `LubangGrafik` | ✅ | ⬜ **prioritas 1** |
| 5 | Cara cepat, masukkan saja angkanya | ✅ `MesinSifat` | ✅ | - tidak perlu |
| 6 | Kalau hasilnya 0 dibagi 0 | ✅ `BongkarBertahap` | ✅ | ⬜ prioritas 6 |
| 7 | Kalau x lari ke tak hingga | ✅ `PerkecilTampilan` | ✅ | ⬜ prioritas 7 |
| 8 | Limit sinus jadi angka 1 | ✅ `BusurLawanTali` | ✅ | ⬜ prioritas 3 |
| 9 | Fungsi yang tidak putus | ✅ `PerusakFungsi` | ✅ | ⬜ prioritas 5 |
| 10 | Dipakai di dunia nyata | galeri gambar sendiri (bukan foto) | ✅ | - tidak perlu |

Plus: 4 latihan pilihan ganda A-E, bank **32 soal kuis**, halaman `/latihan/limit`.

**Kalau waktunya habis, potong video DARI BAWAH urutan prioritas, jangan acak.**
Situsnya sudah utuh dan layak ditunjukkan walaupun tanpa satu pun video Limit.

---

## 🔜 Yang harus dikerjakan berikutnya

### Tujuh video Limit. Resepnya sudah terbukti tujuh kali, tinggal diulang.

Ketujuh video Trigonometri sudah jadi dari nol sampai tayang, jadi resep di
bawah ini bukan teori. Urutan persisnya, ulangi apa adanya. Sudut pandang
visual tiap video ada di `docs/superpowers/specs/2026-09-01-limit-alur-belajar.md`.

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

Rujukan tambahan: github.com/adenosie/math-vids (Manim versi lama - **tiru pola visualnya,
jangan salin kodenya**).

### Setelah video Limit selesai
Empat topik lain (Grafik Fungsi, Vektor, Ruang 3D, Statistika) masih kosong.
Halaman topiknya sudah ada dan menampilkan "belum dibangun" secara jujur.

**Menambah topik ketiga sekarang jauh lebih murah.** Yang perlu dibuat cuma:
isi di `content/<topik>/`, satu komponen panggung untuk widgetnya, satu baris
di `content/daftar-isi.ts`, dan `siap: true` di `content/topik.ts`. Rangka
halaman, halaman latihan, dan daftar latihan sudah bebas topik.

---

## 🚨 ATURAN WAJIB (jangan dilanggar)

### Gerbang video
**Urutan gerbangnya ADA TIGA, dan ketiganya wajib:**
`cek_kode.py` (sebelum render) → render uji `-ql` + lembar kontak → render final `-qh` + lembar kontak lagi.

**"Rendered" di log BUKAN bukti video itu benar.** Pada 31 Agu sebuah video dirilis
dengan **7 cacat** karena hanya dicek lognya - ARYA yang menemukannya. Sejak itu:
1. Adegan wajib memanggil `qc.periksa_adegan()` di tiap tahap → render **GAGAL** kalau
   ada yang bertindih atau keluar bingkai
2. Jalankan `python manim/cek_video.py <video> --detik <momen>` lalu **BUKA lembar
   kontaknya dan nilai tiap frame satu per satu**
3. Baru boleh bilang selesai. Ada cacat tersisa → **sebutkan**, jangan diamkan

### Bentuk penjelasan
- **Jangan tembok paragraf.** Pecah jadi blok berselang-seling: paragraf pendek,
  daftar poin berlabel tebal, kalimat sorot, kotak contoh berhitung.
- **Tapi jangan dipangkas isinya.** Ada siswa yang belajar dengan membaca.
- Kata **"Miskonsepsi" JANGAN muncul** - itu istilah guru. Pakai **"Sering keliru"**,
  dan taruh **di bawah** setelah siswa paham, bukan menyambut di halaman depan.

### Widget
- Tidak boleh memotong gambarnya sendiri. Bingkai wajib menyesuaikan otomatis dan
  memberi tahu penggunanya lewat penunjuk skala.
- Sebisanya bisa **ditarik/diklik langsung**, bukan cuma lewat slider.

### Soal
Kalibrasi dulu ke sumber nyata **sebelum** menulis. Soal buatan Claude cenderung
terlalu mudah - itu temuan ARYA, bukan dugaan.

### Warna matematika - satu sumber kebenaran
`manim/matra_theme.py` = `web/lib/warna.ts`:
samping `#3A6EA5` · depan `#C25E4D` · miring `#1F2430` · sudut `#D9A441`
**Jangan** pakai aksen situs (hijau `#2F5D50`, oker `#B8863B`, bata `#A6503F`) untuk
bagian matematika - pernah terjadi dan merusak kaitan video↔widget.

---

## 🧰 Peta berkas

### Alat mutu (Python)
| Berkas | Fungsi |
|---|---|
| `manim/qc.py` | Gerbang tata letak di dalam adegan. Sudah menangkap 3 cacat nyata |
| `manim/cek_video.py` | Lembar kontak ffmpeg - wajib dijalankan **dan dilihat** |
| `manim/buat_narasi.py` | Bikin suara per kalimat **dan ukur durasinya** → `durasi.json` |
| `manim/gabung_audio.py` | Gabung narasi ke video; **berhenti** kalau selisih > 1,5 detik |
| `manim/matra_theme.py` | Warna & tema animasi |
| `manim/sinema.py` | ⭐ **BARU** Gerakan & tata teks bersama. `babak()` menghitung waktu tiap segmen otomatis dan MENGGAGALKAN render kalau animasi melewati narasinya. `AngkaKoma`, `judul_pembuka`, `keterangan`, `sorot_bagian` |
| `manim/cek_kode.py` | ⭐ **BARU** Periksa adegan SEBELUM render. Menangkap LaTeX rusak, `MathTex` lupa awalan `r`, kelas adegan tanpa `qc.periksa_adegan`, warna hex ditulis langsung. `--dalam` membangun tiap potongan LaTeX sungguhan |
| `manim/lingkungan.py` | ⭐ **BARU** Menambal PATH MiKTeX. **WAJIB di-import paling atas di tiap adegan** |
| `manim/narasi/trigonometri.json` | Naskah narasi, satu sumber kebenaran |
| `alat/cek_soal.py` | ⭐ **BARU sesi 5** Periksa jawaban limit dengan sympy. Bandingkan selisih yang disederhanakan, bukan teks, jadi `0.25` diakui sama dengan `1/4`. Dukung `oo`, limit sepihak, dan jawaban "tidak ada". Kode keluar bukan nol kalau ada yang salah |

### Situs (Next.js 16, di `web/`)
| Berkas | Isi |
|---|---|
| `content/tipe.ts` | ⭐ **BARU** Tipe isi yang dipakai SEMUA topik |
| `content/daftar-isi.ts` | ⭐ **BARU** Daftar pusat topik. Menambah topik = satu baris di sini |
| `content/trigonometri/tahap.ts` | ⭐ **10 tahap: teks, poin, contoh, sering-keliru** |
| `content/limit/{tahap,latihan,kuis}.ts` | ⭐ **BARU** Isi topik Limit |
| `content/trigonometri/latihan.ts` | Naskah narasi, 4 latihan, 8 kuis, 4 kanal YouTube |
| `content/topik.ts` | Daftar 6 topik + label kelas jujur |
| `components/topik/HalamanTopik.tsx` | ⭐ Rangka halaman topik, BEBAS TOPIK |
| `components/topik/PanggungTrigonometri.tsx` | Penyetelan 10 widget trigonometri |
| `components/topik/PanggungLimit.tsx` | Penyetelan 9 widget limit |
| `components/topik/jenis.ts` | Perjanjian antara rangka dan panggung |
| `components/topik/Penjelasan.tsx` | Perender blok penjelasan |
| `components/topik/Latihan.tsx`, `Kuis.tsx` | Latihan & kuis |
| `components/widget/*.tsx` | 10 widget Trigonometri |
| `components/widget/limit/*.tsx` | ⭐ **BARU** 9 widget Limit + galeri + bingkai bersama |
| `components/widget/limit/koordinat.ts` | ⭐ Penskalaan, garis petak, penunjuk skala, jalur SVG yang DIPUTUS di asimtot |
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
| **Suara: `edge-tts` `id-ID-ArdiNeural`** | Indonesia asli, gratis, tanpa batas. **ElevenLabs gratis mengunci SEMUA suara Indonesia di balik langganan berbayar** - terverifikasi dari pesan API-nya. Menambah akun gratis TIDAK menolong: yang membatasi tingkat langganan, bukan sisa kredit |
| **Durasi animasi mengikuti durasi suara** | Bukan ditebak. Lihat `durasi.json` |
| **Ekspor 1080p60** (`manim -qh`) | Permintaan ARYA 31 Agu. Biayanya ±15 menit render per video dan berkas ±6 MB (720p30 = ±3 MB). Perkiraan awal Claude "60-80 menit" ternyata SALAH - jauh lebih cepat |
| **Foto Tahap 10 dari Wikimedia Commons** | ARYA minta foto internet HD. Yang terpilih kebetulan semuanya berlisensi terbuka (CC0/CC BY/Public domain) - jadi aman sekaligus. Catatan sumber di `web/public/gambar/sumber.json` |
| **Tahap bervideo: tombol Tonton / Coba sendiri** | Menampilkan video DAN widget sekaligus memaksa panggung digulir. Tata letak satu layar sudah dikunci, jadi siswa memilih salah satu |
| Semua berkas di **drive D** | C: tinggal ~16 GB dari 376 GB |
| Tata letak **satu layar** | Kiri visual, kanan penjelasan. Tanpa gulir atas-bawah |

### Gaya terkunci - "Studio Teknis"
Krem `#F6F2EC` · kartu `#FFFDFA` · tinta `#211E1A` · garis `#E1D9CC`
Judul **Fraunces** · teks **Inter** · angka & label teknis **IBM Plex Mono**
Patokan visual: `mockup/e-satu-layar.html`

### Pelajaran Next 16 (beda dari ingatan Claude - sudah diverifikasi)
- `params` pada route dinamis adalah **`Promise`** → wajib `await params`
- **Tailwind 4**: `@import "tailwindcss"` + `@theme inline`, **tanpa** `tailwind.config.js`
- **`next lint` sudah dihapus** → pakai `npx eslint .`
- React 19 melarang `setState` di dalam `useEffect` dan komponen yang dibuat di dalam render.
  **Penggantinya sudah terbukti di proyek ini:** kalau nilainya berasal dari
  `localStorage`, baca lewat `useSyncExternalStore(langgan, ...)` dari
  `lib/simpanan.ts`. Karena `tulis()` sudah memberi tahu pendengarnya, nilai itu
  segar sendiri tanpa disalin ke state - sekaligus lolos dari ketidakcocokan
  hidrasi. Contoh: `components/PemutarVideo.tsx` dan kunci kuis di
  `components/topik/Trigonometri.tsx`.
- React 19 juga melarang **mengubah variabel biasa setelah render selesai**.
  Penghitung yang dinaikkan di dalam `.map()` melanggar ini; hitung dulu ke
  `Map`, baru dipakai (lihat `components/topik/Penjelasan.tsx`).
- Dokumen resmi ada **offline** di `web/node_modules/next/dist/docs/` - baca dari situ

---

## 📚 Bahan referensi (di luar folder proyek)
| Berkas | Untuk | Bisa dibaca |
|---|---|---|
| `D:\BAHAN MATEMATIKA\Buku Matematika Kelas 10 & 11 - Guru.pdf` | ⭐ Kurikulum Merdeka, kotak "Miskonsepsi !?" | teks digital |
| `D:\BAHAN MATEMATIKA\LIMIT.pdf` (320 hal) | topik Limit | teks digital |
| `D:\BAHAN MATEMATIKA\3 Dimensi.pdf` (352 hal) | topik Ruang 3D | teks digital |
| `D:\BAHAN MATEMATIKA\Matematika_BS_KLS_XII_Rev.pdf` | Buku Siswa Kelas XII | teks digital |
| `D:\SEKOLAH S1 & S2\S1\matematika\kalkulus 1.pdf`, `kalkulus 2.pdf` | Diktat ITB - istilah Indonesia yang benar | teks digital |
| `…\Calculus (9rd Edition) - Solution.pdf` | Pola & tingkat kesulitan soal | teks digital |
| `…\sb-big-book-matematika-sma-…pdf` | Level & bahasa SMA | **scan** |
| https://mathcyber1997.com | Soal | **diblokir pemeriksa bot** - jangan diterobos; minta ARYA menempelkan sendiri |

---

## ⚠️ Risiko & catatan terbuka
1. **Kunci kuis BUKAN pengamanan.** Catatannya ada di peramban siswa sendiri dan
   bisa dihapus siapa pun yang mau. Gunanya mendorong kebiasaan membaca sebelum
   menguji diri, bukan mencegah kecurangan. **Skor kuis di situs ini tidak sah
   sebagai nilai.** Kalau dosen menanyakannya, jawab apa adanya.
2. **Tombol pasang aplikasi belum bisa diuji.** `beforeinstallprompt` hanya
   menyala di situs yang sudah tayang lewat HTTPS. Di `localhost` tombolnya
   memang tidak muncul, dan itu perilaku yang benar, bukan kerusakan.
   Baru bisa dibuktikan setelah situs di-deploy.
3. `web/public/gambar/game.jpg` **939 KB**, keempat foto Materi 10 totalnya
   ±1,5 MB. Berat untuk siswa berkuota terbatas. Belum dikompres karena ARYA
   belum memintanya - tawarkan sebelum deploy.
4. Render Manim 113 detik makan ±8 menit → selalu jalankan di latar belakang,
   dan **jangan pernah dua render sekaligus** (lihat Jebakan lingkungan).
5. Cache npm lama **11 GB** masih di C: (ARYA memilih tidak dihapus).
6. Waktu review ARYA jadi leher botol, materi matematika wajib diperiksa dia.
7. **Tujuh video Limit belum ada.** Kalau semuanya dibuat, ukuran
   `web/public/anim/` bertambah kira-kira 30 MB lagi, jadi total sekitar 60 MB.
   Bicarakan pengompresan sebelum deploy.
8. **Materi Limit belum diperiksa ARYA.** Angkanya sudah diperiksa mesin, tapi
   ketepatan bahasa dan tingkat kesulitannya untuk siswa SMA tetap perlu mata
   ARYA. Yang paling perlu dicek: Materi 08 (bukti sin x dibagi x) dan
   delapan soal tingkat "sangat sulit" di bank kuis, apakah terlalu berat.

## ⏳ Masih menunggu keputusan ARYA
1. **Slogan halaman depan** (5 usulan diberikan pada sesi 4, belum dipilih).
2. **Galeri Materi 10 Limit**: sekarang gambar buatan sendiri. Kalau ARYA lebih
   suka foto seperti Materi 10 Trigonometri, tinggal bilang.
3. **Kompresi gambar dan video sebelum deploy** (`game.jpg` 939 KB, foto Materi
   10 Trigonometri ±1,5 MB, video ±30 MB).

## 🎓 Pelajaran dari dua repo rujukan (dibedah 31 Agu, sesi 2)

ARYA menemukan dua repo. **Kodenya tidak bisa disalin** - AnimationsWithManim
berbasis Manim Februari 2019 (`manimlib.imports`, `CONFIG = {}`, `TexMobject`,
`ShowCreation` semuanya sudah dihapus dari Manim CE 0.21). Yang diambil polanya.

| Sumber | Yang diambil dan sudah diterapkan |
|---|---|
| Elteoremadebeethoven/AnimationsWithManim | Storyboard sebagai komentar bernomor di kepala berkas, ditulis SEBELUM kode · `construct()` cuma memanggil sub-adegan bernama · "urutan updater itu penting" · `clear_updaters()` sebelum frame terakhir · `align_to(label, DOWN)` untuk angka berubah |
| HarleyCoops/Math-To-Manim (bagian `mythos/`) | Tata bahasa kamera: judul → tampilkan → zoom → **tarik mundur** · **maksimal dua blok teks yang harus dibaca** · keterangan yang menghapus dirinya sendiri · `MathTex` multi-bagian + `get_part_by_tex` alih-alih mengiris karakter · batasi lebar teks (mencegah, bukan mendeteksi) · pemeriksa statis sebelum render |

### 3Blue1Brown, Essence of Calculus bab 7 (dibedah 1 Sep 2026, sesi 5)

ARYA menunjuk `3b1b/videos/_2017/eoc/chapter7.py`. Hasil pembedahannya:

**LISENSINYA MENULAR, DAN INI YANG PALING PENTING.** Repo itu berlisensi
CC BY-NC-SA 4.0. Menyalin kode atau naskahnya memaksa MATRA ikut berlisensi
sama: non-komersial selamanya, dan turunannya wajib dibuka dengan lisensi yang
sama. Karena itu yang boleh diambil hanya GAGASANNYA, sebab ide tidak berhak
cipta, lalu ditulis ulang dengan contoh, angka, dan kalimat sendiri.
JANGAN menyalin kodenya, dan JANGAN menerjemahkan naskahnya.

**Kodenya juga tidak bisa dipakai**: Manim 2017 dengan `manim_imports_ext`,
`CONFIG`, `OldTex`, dan `ShowCreation`. Persis jebakan yang sama dengan
AnimationsWithManim yang sudah dicatat di sesi 2.

**Sebagian besar isinya tidak cocok untuk SMA.** Bab itu bab KETUJUH dari
Essence of Calculus, jadi ia menganggap penontonnya sudah paham turunan. Dari
22 adegannya: 8 soal notasi dx, 5 soal epsilon-delta formal, 4 soal aturan
L Hopital, 3 soal tokoh pi-creature dan kredit. Memaksakan semuanya masuk akan
merusak materi, bukan memperbaikinya.

**Tiga gagasan yang diambil, dan sudah masuk ke materi:**

| Ke materi | Gagasan | Kenapa berharga |
|---|---|---|
| Materi 02 | Permainan tantangan, yaitu epsilon-delta tanpa lambangnya | Kalimat "f x mendekati L" tadinya berhenti sebagai kalimat longgar tanpa cara mengujinya |
| Materi 01 | h itu angka biasa yang dikecilkan, bukan bilangan gaib | Membayangkannya mistis membuat limit terasa lebih sulit daripada sebenarnya |
| Materi 08 | Peringatan lingkaran setan aturan L Hopital | Paling berharga. Banyak siswa bimbel memakai L Hopital untuk membuktikan sin x dibagi x menuju 1, padahal rumus turunan sin x justru DIPEROLEH dari limit itu |

**Kalau mau menggali 3b1b lagi**, yang paling mungkin berguna untuk MATRA
adalah bab turunan dan integral untuk topik lain nanti, BUKAN bab limit ini.
Bab limitnya sudah habis diperas.

**Jangan menghabiskan waktu di Math-To-Manim lagi**: 788 berkas tapi hanya ~4 yang
berguna; 577 di antaranya ada di `legacy/` dan `archive/`, sisanya kerangka agen AI
yang menyuruh model lain menulis Manim - bukan yang proyek ini butuhkan.

---

## 🔧 Jebakan lingkungan yang sudah diselesaikan

**JANGAN menjalankan dua render Manim bersamaan.** Pada 31 Agu render final
tahap 8 dijalankan berbarengan dengan render uji tahap 5; yang final terputus
diam-diam di animasi 34 dari 46, meninggalkan berkas video LAMA di tempatnya.
Log tidak menunjukkan galat apa pun. Yang menangkapnya adalah `gabung_audio.py`,
lewat selisih durasi 5,1 detik. Render satu per satu.

**PowerShell `Set-Content -Encoding utf8` menyisipkan BOM** di awal berkas, dan
Python menolaknya dengan `invalid non-printable character U+FEFF`. Untuk menyunting
berkas Python, pakai Python atau alat sunting biasa - bukan PowerShell.

**Heredoc bash + string Python biasa bisa memproses escape dua kali.** Menulis
`"\theta"` di dalam heredoc pernah sampai ke Python sebagai TAB + "heta",
sehingga pencarian teks gagal tanpa penjelasan. Untuk menyunting kode yang
mengandung LaTeX, gunakan alat sunting berkas, bukan skrip pengganti teks.

JEBAKAN INI KENA LAGI pada 1 Sep 2026 sesi 5, dua kali dalam satu jam.
Yang pertama: teks tidak ada di tabel video Limit sampai ke Python sebagai
TAB + ext, dan di video terbaca exttidakada. Yang kedua: pemisah baris di
dalam Text() berubah jadi baris baru sungguhan sehingga berkasnya rusak
sintaks. Keduanya lolos dari mata dan baru ketahuan saat MELIHAT frame
videonya. Aturannya bukan saran: untuk kode ber-escape, pakai alat sunting
berkas. Kalau terpaksa lewat skrip, susun karakternya dengan chr(92).



**Pembungkus `rtk` BISA MELAPORKAN LULUS PADAHAL PERINTAHNYA TIDAK JALAN.**
Pada sesi 5 `npx tsc --noEmit` dilaporkan "TypeScript: No errors found", padahal
keluaran aslinya "This is not the tsc command you are looking for" karena
`node_modules` belum ada. Hal yang sama terjadi pada `npm run build`: pesannya
`'next' is not recognized`, tetapi kode keluarnya 0 karena disalurkan ke `tail`.
**Untuk perintah PEMERIKSAAN, selalu pakai `rtk proxy "<perintah>"`** supaya
keluarannya mentah, dan baca isinya, jangan percaya kode keluarnya saja.

**Worktree git TIDAK punya `node_modules`.** Berkas itu di-gitignore, jadi
worktree baru harus dijalankan `npm install` sendiri di dalam `web/` (±2 menit,
361 paket). Gejalanya menyesatkan karena `npx` diam-diam mengunduh paket lain
yang namanya mirip.

**Jangan pakai `cp` untuk menimpa berkas di skrip.** Ia bertanya "overwrite?",
tidak mendapat jawaban karena tidak ada masukan, lalu keluar dengan kode 0
TANPA menyalin apa pun. Pakai Python `shutil.copyfile` atau alat sunting berkas.

**Nama berkas di Windows tidak membedakan huruf besar-kecil.** `bidang.ts` dan
`Bidang.tsx` dianggap berkas yang sama dan TypeScript menolak keduanya. Yang
bawah sudah diganti nama jadi `koordinat.ts`.

**MiKTeX terpasang tapi TIDAK terdaftar di PATH Windows.** Gejalanya menyesatkan:

    FileNotFoundError: [WinError 2] The system cannot find the file specified

Pesan itu tidak menyebut LaTeX sama sekali, jadi mudah disangka salah kode. Yang
"tidak ditemukan" sebenarnya `latex.exe`. Sudah ditambal oleh `manim/lingkungan.py`
- **tiap adegan wajib meng-import `lingkungan` sebelum `from manim import *`.**
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
