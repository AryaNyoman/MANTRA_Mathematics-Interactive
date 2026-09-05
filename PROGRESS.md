# PROGRESS: MANTRA (dulu MATRA)

## 5 SEP (malam): SEMUA WIDGET MEMAKAI SISTEM KENDALI BERSAMA

Permintaan ARYA (5 Sep): widget jangan cuma bisa diseret di gambar; siswa
harus bisa MENGETIK angkanya, tiap kendali harus menjelaskan gunanya, label
sumbu harus rinci, dan perubahan harus terlihat langsung di gambar.
Rancangannya: `docs/superpowers/specs/2026-09-05-sistem-kendali-widget-design.md`.

Yang jadi, di ketujuh topik (56 materi berwidget, semuanya dicek di browser
desktop dan HP 390 px, tidak ada yang melebar):
- `web/components/kendali/`: `Angka` (nama + arti, angka tampil, kolom ketik
  yang DIPOTONG ke batas bukan ditolak, penggeser), `Koordinat` (x, y, plus
  pratinjau vektor kolom dan i-j), `Pilihan` (tombol bersegmen), `Petunjuk`
  (kalimat "geser X, perhatikan Y"), dan `sedang-diubah.ts` (kendali yang
  dipegang melaporkan `kunci`-nya, gambar menyalakan bagiannya: kelas `.nyala`).
- `web/lib/petak-sumbu.ts`: satu pembuat label sumbu untuk semua papan;
  jaraknya dipilih supaya labelnya rapat tapi tidak bertumpuk.
- Gambar lengket (`position: sticky`) di atas kendalinya, jadi saat menggeser
  perubahan terlihat tanpa menggulir.
- Kata "tahap" di teks siswa Trigonometri diganti "Materi 0N".

Cara memakai di widget baru: taruh `<Angka nama arti nilai onUbah min max
langkah kunci>` di dalam `.kendali`; kalau widget punya pegangan yang bisa
diseret, panggil `useSedangDiubah()` dan beri kelas `nyala` saat kuncinya
sama. Contoh: `Panah.tsx` (vektor), `Bentuk.tsx` (transformasi),
`SegitigaSebangun.tsx`.

Yang sengaja BELUM: sorot `.nyala` baru ada di Vektor, Transformasi, dan
Segitiga sebangun; tombol aksi lama ("Kembalikan semula", "Samakan
rata-ratanya") di Statistika masih bergaya lama karena memang bukan besaran.

## 5 SEP: MANTRA v2 "Panggung Sinema" SUDAH DI PRODUKSI

Cabang `sesi/mantra-v2` sudah digabung ke `master` dan dinaikkan ke
produksi. **https://matra-eight.vercel.app** kini memakai rancangan v2.
Pratinjaunya (`mantra-rancangan-v2.vercel.app`) masih hidup sebagai
pembanding dan boleh dibuang kapan saja.

Isi perubahan ada di pesan commit, jangan disalin ulang ke sini. Ringkasnya:
nav, hero, dan kaki halaman jadi permukaan navy; halaman belajar jadi tiga
kolom penuh layar (daftar materi, bacaan, ALAT) dengan pembatas yang bisa
ditarik dan mode fokus layar penuh; Peta Materi jadi baris sub-bab; menu
Latihan jadi kartu per bab tanpa kuis; ada halaman 404, keadaan memuat, dan
kotak galat video.

### YANG PERLU DIKETAHUI SESI BERIKUTNYA

1. **Gerbang resolusi video MENOLAK saat promote ini, dan tetap dinaikkan
   atas keputusan ARYA.** `python alat/cek_resolusi_anim.py` melaporkan 33
   video masih 480p. Sebelum promote ini produksi TIDAK punya video topik
   sama sekali (404), jadi menaikkannya membuat video muncul untuk pertama
   kali, di mutu draf. Begitu render 1080p selesai, jalankan gerbangnya lagi
   sampai lolos lalu deploy ulang.

2. **Kredit ElevenLabs di halaman Tentang belum sesuai kenyataan.** Seluruh
   `manim/narasi/*.json` masih mencatat `id-ID-ArdiNeural` (edge-tts).
   ARYA akan mengganti suaranya; penandanya ada di `app/tentang/page.tsx`.

3. **Bank soal menu Latihan dan kuis bab masih satu kumpulan** (32 soal
   `kuis.ts`). Yang sudah dikerjakan: kuis kini MENDAHULUKAN soal yang belum
   pernah dijawab benar di bank soal. Kalau suatu saat mau benar-benar
   terpisah, perlu bank soal baru.

4. **Kartu ManimGL menaut ke manim.community**, padahal yang dipakai ManimGL
   milik 3Blue1Brown. ARYA tahu bedanya dan tetap memilih itu.

> **SESI BARU: baca berkas ini dari atas sampai bawah SEBELUM mengerjakan apa pun.**
> Terakhir diperbarui: **3 September 2026 sore**.
>
> **SITUS SUDAH TAYANG: https://matra-eight.vercel.app** (bisa dibuka siapa pun,
> tanpa login). Baca bagian "Deploy Vercel" di bawah sebelum menyentuh deploy.
>
> **Rezim SESI PARALEL aktif sejak 1 Sep malam.** MASTER kerja di
> `D:\MANIM-MATRA` (master); lima sesi lain di worktree masing-masing.
> Baca bagian "Folder kembar" di bawah dan `docs/tugas/ATURAN-SEMUA-SESI.md`.

## Ringkas
| | |
|---|---|
| Tahap sekarang | **ENAM topik tayang dengan tampilan MANTRA** (Trigonometri dan Limit lengkap dengan video). Topik ketujuh, Transformasi Geometri, baru dimulai |
| Yang tersisa | **Gelombang 2 berjalan di 6 sesi**: revisi isi dari MASTER lalu video 480p. ARYA meninjau sambil jalan |
| Alamat tayang | https://matra-eight.vercel.app (produksi) dan https://mantra-uji.vercel.app (uji, alamat tetap) |
| Rancangannya | `docs/superpowers/specs/2026-08-31-trigonometri-alur-belajar.md`<br>`docs/superpowers/specs/2026-09-01-revisi-besar-situs.md`<br>`docs/superpowers/specs/2026-09-01-limit-alur-belajar.md`<br>`docs/superpowers/plans/2026-09-01-topik-limit.md` |
| Tenggat | 12 September 2026 |
| Menjalankan situs | `cd web && npm run dev` → `http://localhost:3000` |
| Penghalang | *(tidak ada)* |

## 🧭 MULAI DARI SINI (sesi berikutnya, ditulis 2 Sep 2026)

### 🎬 4 SEP PAGI: MASTER menonton, menggabung, menambal gerbang, memberi tugas

- **Peran MASTER berubah atas perintah ARYA 4 Sep**: MASTER MENONTON lembar
  kontak video sesi, memberi masukan, dan mengirim revisinya (aturan 2 Sep
  "sesi merevisi sendiri, MASTER tidak menerima setoran" DICABUT).
- Digabung ke master: `sesi/ruang-3d`, `sesi/statistika`, `sesi/vektor`,
  `sesi/transformasi-geometri` (konflik satu baris komentar di `topik.ts`).
  tsc 0, build 22 halaman. Grafik Fungsi dan UI/UX tidak punya commit baru.
- 16 lembar kontak dinilai (3D enam, Vektor enam, Statistika empat). Dua
  cacat LINTAS SESI, keduanya pelanggaran STANDAR yang sudah ada: pembuka 3D
  15 sampai 20 detik hampir kosong di semua video (aturan: 8 sampai 10 detik,
  hanya video pertama), dan dunia dimampatkan ke separuh tinggi karena zona
  HUD dibaca sebagai seluruh lebar atas (aturan: hanya dua pojok). STANDAR
  dipertegas di butir 1 dan 2.
- Gerbang mutu ditambal (`29b54bc`): `periksa_adegan(..., tulisan={...})`
  dan pemeriksaan isi `papan.semua()`; `nilai_hidup` memberi "=".
  `uji_qc.py` 13 ok.
- Pesan tinjauan + tugas dikirim ke lima sesi hidup (3D, Vektor, Statistika,
  Grafik Fungsi, Transformasi Geometri). UI/UX TIDAK menyala.
- **Bentrok yang diketahui**: Vektor punya 70 baris `sinema.py` belum
  disimpan yang menyentuh `PapanRumus`, sama dengan perubahan 3D yang sudah di
  master. Vektor diminta commit, merge, dan mempertahankan perubahan 3D.
- **Antrean render bersama: `alat/antre_render.py <nama-worktree>`** (BUKAN di
  `manim/`; MASTER pernah salah tulis jalurnya 4 Sep). Semua render lewat sini
  supaya lima sesi tidak berebut kartu grafis.
- **TUGAS PER SESI (4 Sep pagi), juga dikirim lewat pesan; sesi yang
  dinyalakan ulang membacanya dari sini:**
  - **Ruang 3D**: merge master; pembuka 01 maksimal 10 detik dan ada kejadian,
    03 sampai 09 maksimal 5 detik atau langsung rangka; kubus diberi cahaya dan
    bayangan (`gl.ilustrasi.balok`); angka sumbu cukup 0, 3, 6; `nilai_hidup`
    kini otomatis "="; render 01 dan 04 dulu untuk dinilai; 03 tunggu ARYA.
  - **Vektor**: commit `sinema.py` lalu merge master, pertahankan perubahan 3D
    di `PapanRumus`; potong pembuka 03/04/06/08/09 ke maksimal 5 detik; bidang
    boleh naik (tengah atas bebas); label "dayung" 180 derajat dan resultan
    hitam di 06; render ulang hanya 01 dan 06.
  - **Statistika**: merge master; 06 kamera didekatkan (garis bilangan penuh,
    orang terlihat), 11 kamera diperbesar di babak residu saja; pindahkan
    kamus TULISAN ke `tulisan=`; tujuh video baru ikut aturan zona.
  - **Grafik Fungsi**: lapor status dua revisi (grafik3, grafik6), commit,
    merge master; buat `alat/cek_sinkron_video.py` umum untuk topik lain.
  - **Transformasi Geometri** (sesi TIDAK menyala saat pesan dikirim): merge
    master, daftarkan bab di `web/content/subbab.ts`, buktikan lewat
    `/peta-materi`; baca STANDAR versi master sebelum video pertama.
  - **UI/UX** (tidak menyala; usulan MASTER kalau dinyalakan): audit MANTRA
    di HP lewat https://mantra-uji.vercel.app, potret ulang `demo-latihan.jpg`
    dan `demo-banksoal.jpg` untuk korsel (masih tampilan lama), ruang kosong di
    bawah widget lebar pendek pada layar lebar, langkah bernomor pembahasan.
- Menunggu keputusan ARYA: (1) Ruang 3D materi 03, kamera sejajar AC
  (usul: tetap, dengan aba-aba di narasi); (2) Statistika mengerjakan tujuh
  video di luar rencana enam (usul: boleh, 480p semua); (3) sesi UI/UX
  dinyalakan lagi atau tidak; (4) foto pesawat ber-livery DHL di Vektor.

### 🔁 4 SEP PAGI: sesi dimuat ulang, nama berganti lagi, master di `3dd4bae`

- Semua sesi mati dan menyala lagi dengan nama otomatis (`manim-matra-6f`,
  `-c6`, `-6b`, `-b4`); MASTER kini `manim-matra-65`. Sesi yang mau lapor ke
  MASTER: `ListAgents`, pilih baris yang **bukan** dirinya dan bukan sesi
  topik, atau tunggu pesan MASTER yang menyebut namanya.
- Digabung ke master 4 Sep pagi: Statistika (10 video dirapikan,
  `gl.ilustrasi.tumbuh_batang`), Ruang 3D (`gl.ilustrasi.balok` bercahaya
  tiga muka + bayangan lantai, uji `manim/uji/uji_balok_tiga_terang.py`,
  keenam pembuka punya kejadian), Vektor (laporan), Grafik Fungsi (alat
  sinkron versi rona, tahap 3 dan 6), Transformasi Geometri (**video 01
  lolos semua gerbang**, worktree-nya masih punya 18 berkas belum disimpan).
  `uji_qc.py` 16 uji, tsc 0.
- Aturan yang lahir hari ini (semua di STANDAR): pembuka 3D hanya video
  pertama (nomor tahap terkecil), video lain "detik pertama bergerak"
  maksimal 5 detik di 2D maupun 3D, kartu judul dikecualikan; zona HUD hanya
  dua pojok; `alas_hud` + tanda `latar`; sumbu didaftarkan sebagai dua pita
  pipih; `cek_kode` menolak `$` dan baris baru di dalam `teks()`.
- Masih menunggu ARYA: izin Grafik Fungsi untuk merge master dan render
  ulang tahap 6 (memadatkan 3D ke 5 detik).

### 🗺️ 4 SEP DINI HARI: peta struktur graphify sudah ada

- `graphify-out/graph.json`: **2.471 simpul, 5.881 hubungan, 167 komunitas
  bernama**. Isinya seluruh kode (`manim/`, `web/`, `alat/`, termasuk arsip
  Manim CE), 52 dokumen (spec, standar, PROGRESS, CLAUDE, rancangan MANTRA),
  dan 43 foto materi. Buka `graphify-out/graph.html` di peramban untuk
  menjelajah; `GRAPH_REPORT.md` untuk simpul pusat, hubungan tak terduga,
  dan pertanyaan yang layak ditelusuri.
- **Cara pakai tiap sesi:** baca `GRAPH_REPORT.md` dulu, lalu
  `graphify query "<pertanyaan>"`, `graphify path "A" "B"`, atau
  `graphify explain "X"`. Kode berubah? `graphify update .` (AST, gratis).
- **Yang dipelajari dengan mahal, jangan diulang** (rincian di CLAUDE.md
  bagian Peta struktur): Gemini gratis kena kuota harian 20 permintaan;
  OpenCode Zen saldo kosong; di OpenCode Go `glm-5.3` menghabiskan seluruh
  keluaran untuk berpikir (JSON kosong) dan `deepseek-v4-flash` butuh opt-in
  wilayah; yang bekerja: `glm-5.3-flash` lewat `/zen/go/v1`, 42 dokumen
  dalam 10 menit, 187 ribu token masuk / 38 ribu keluar (sekitar 2 sen
  dolar). Skrip pemanggil AST di Windows WAJIB punya pagar
  `if __name__ == "__main__":`, dan jangan pernah menamai skrip `ast.py`
  (menutupi modul bawaan Python, semua impor pecah).
- Rantai panjang (lebih dari 10 menit) TIDAK boleh dijalankan sebagai
  perintah latar belakang alat (batas 10 menit); jalankan lewat
  `Start-Process bash.exe <skrip>` dan pantau berkas lognya. Log jangan
  lewat pipa `grep`/`cut` (tertahan sampai selesai), tulis langsung ke berkas.

### ✅ 3 SEP MALAM: rancangan MANTRA TAYANG di produksi

- `sesi/mantra` digabung ke `master` (fast-forward ke `faac773`) setelah ARYA
  memeriksa di laptop dan HP, lalu build yang PERSIS ia periksa dinaikkan ke
  produksi lewat `vercel promote` (bukan build ulang). Produksi
  https://matra-eight.vercel.app sekarang MANTRA. Worktree `mantra` dihapus
  karena sudah tergabung.
- **Alamat uji TETAP: https://mantra-uji.vercel.app.** Tiap deploy preview
  diarahkan ulang ke sini dengan `vercel alias set <deploy> mantra-uji.vercel.app`,
  supaya ARYA cukup menyimpan satu alamat di HP. Jangan lagi memberi ARYA
  alamat acak `matra-xxxx-...vercel.app`: ia pernah membuka yang lama dan
  mengira perbaikannya belum ada (3 Sep).
- **Cara deploy yang benar mulai sekarang:** dari `D:\MANIM-MATRA\web` di
  `master`. Preview: `vercel deploy --yes` lalu `vercel alias set ...`.
  Produksi: hanya atas kata ARYA, WAJIB lolos `python alat/cek_resolusi_anim.py`
  dulu (video 480p tinjauan memakai nama yang sama dengan 1080p; temuan 3D
  4 Sep), lalu pakai `vercel promote <deploy>` untuk
  menaikkan build yang sudah ia periksa, bukan `--prod` yang membangun ulang.
- Yang berubah di situs (rincian per commit `01b0f5e`, `86b0a22`, `d810649`,
  `faac773`): huruf Newsreader + Space Grotesk, palet emas-navy, nav lengket,
  beranda baru dengan korsel 16:9 bergeser, rute baru `/peta-materi` (tiap
  materi bisa diklik, `?materi=` membuka materi itu), halaman materi dengan
  sidebar pohon (di HP jadi laci geser), bank soal dengan panel pembahasan di
  samping, kaki halaman putih di semua halaman, lebar halaman ikut layar.
- **Sesi topik:** sekarang boleh `git merge master` untuk mendapat tampilan
  baru. Daftar berkas milik MASTER di bawah TETAP berlaku (jangan diedit di
  cabang sesi), hanya syarat "sampai `sesi/mantra` digabung"-nya yang sudah
  lewat.
- Utang MANTRA yang tersisa: panel pembahasan bank soal memakai satu paragraf
  `alasan`, belum langkah bernomor (medan `langkah?: string[]` sudah ada di
  `SoalKuis`, tinggal diisi per soal); cuplikan layar korsel `demo-latihan.jpg`
  dan `demo-banksoal.jpg` masih memotret tampilan lama; ruang kosong di bawah
  widget lebar pendek pada layar lebar (milik sesi topik).

### ⚠️ 3 SEP SORE: nama situs jadi MANTRA, dan ada topik ketujuh

**Baca tiga butir ini sebelum menyentuh apa pun.**

**1. Situsnya sekarang bernama MANTRA, bukan MATRA.** Yang berganti hanya nama
yang DILIHAT pengguna: judul halaman, logo, nav, metadata. Yang SENGAJA tidak
diganti: nama folder `D:\MANIM-MATRA`, nama cabang `sesi/*`, alamat Vercel
`matra-eight.vercel.app`, dan kunci localStorage `matra:*`. Mengganti kunci
localStorage menghapus kemajuan siswa yang sudah tersimpan, dan mengganti
alamat Vercel memutus tautan yang sudah disebar. Jangan "merapikan" ini.

**2. Topik KETUJUH: Transformasi Geometri.** ARYA membuat worktree
`.claude/worktrees/mantra-transformasi-geometri` pada cabang
`sesi/transformasi-geometri`. Topik baru wajib didaftarkan di TIGA berkas:
`web/content/topik.ts`, `web/content/daftar-isi.ts`, dan `web/content/subbab.ts`
(pemetaan Bab dan Sub-bab). Kalau `subbab.ts` terlewat, topiknya tidak akan
muncul di Peta Materi walaupun halamannya jadi.

**3. JANGAN SENTUH berkas tampilan berikut sampai `sesi/mantra` digabung.**
Perombakan rancangan MANTRA sedang berjalan di worktree `mantra`, dan berkas
di bawah ditulis ulang seluruhnya. Mengubahnya sekarang berarti konflik besar
yang harus diselesaikan tangan:

| Berkas | Milik |
|---|---|
| `web/app/globals.css` | MASTER (sesi/mantra) |
| `web/app/page.tsx`, `web/app/tentang/page.tsx`, `web/app/peta-materi/page.tsx` | MASTER |
| `web/app/layout.tsx`, `web/components/Nav.tsx`, `web/components/Demo.tsx` | MASTER |
| `web/components/mantra/*` (termasuk `Kaki.tsx`) | MASTER |
| `web/components/topik/HalamanTopik.tsx` | MASTER |
| `web/components/latihan/*` | MASTER |
| `web/content/subbab.ts` | MASTER, KECUALI menambah satu entri Bab untuk topik baru |

Yang tetap milik tiap sesi: `manim/scenes/<topik>*.py`, `web/content/<topik>/`,
widget topiknya sendiri, dan `web/public/anim/` untuk berkas videonya.

**Aturan tata letak baru yang berlaku untuk SEMUA halaman:** lebar wadah
halaman DILARANG dipatok piksel (`max-width: 1120px` dan sejenisnya). Pakai
`padding: 0 var(--tepi)`. Patokan piksel tidak ikut berubah saat peramban
di-zoom keluar, sehingga isi halaman menciut ke tengah dan kiri kanan layar
kosong. ARYA menemukannya 3 Sep 2026 di halaman materi.

**Kebersihan worktree:** worktree liar `lokasi-kerja-eca82e` dihapus 3 Sep
(bersih, cabangnya nol commit unik terhadap `sesi/ruang-3d`). Foldernya masih
tertinggal kosong karena ada proses yang memegangnya; hapus manual kalau
mengganggu. Empat cabang `claude/*` sisa sesi lama masih ada dan tidak dipakai.

### Keadaan dalam satu tarikan napas
Enam topik TAYANG di https://matra-eight.vercel.app. Trigonometri dan Limit
lengkap dengan video (7 video masing-masing). Empat topik baru (Vektor, Grafik
Fungsi, Statistika, Ruang 3D) halamannya utuh tanpa video, dan kelimanya
ditambah UI/UX sedang mengerjakan gelombang 2 di sesi paralel.

### 3 SEP SIANG: laptop mati, sesi dinyalakan ulang, empat cabang digabung
- Laptop ARYA mati. Kelima sesi dinyalakan ulang dengan `NYALAKAN-5-SESI.bat`
  (skripnya MELANJUTKAN, bukan mengulang: tiap worktree tetap satu berkas
  transkrip, 1.600 sampai 5.600 baris, hanya ditambahi). Nama MATRA di daftar
  aplikasi TIDAK ikut kembali, sebab sesi terminal didaftarkan sebagai baris
  baru bernama acak; ini hiasan, lapisan antar-sesi tetap mengenali MATRA-*.
  ARYA memutuskan lain kali membuka sesi manual dari aplikasi per worktree.
- Keempat cabang digabung ke `master` tanpa konflik: Vektor (empat video
  terakhir 08, 03, 09, 04, plus Materi 01 dan 06 dinaikkan ke standar v2),
  Grafik Fungsi (Tahap 3 versi v2, `manim/gl/grafik.py` dipindah keluar ke
  wilayah topiknya), Ruang 3D (keenam video disesuaikan ke v2), UI/UX (bukti
  kedua subtitle di produksi). Statistika sudah tergabung sebelumnya.
- Verifikasi setelah gabung: `gl` utuh, uji qc lolos, `cek_kode` bersih untuk
  19 adegan, tsc 0, eslint 0, build sukses. BELUM dideploy: perubahan web-nya
  hanya berkas `.vtt` Vektor, dan ARYA belum menonton videonya.
- Perbaikan perkakas dari temuan sesi (commit e437654): pemotong subtitle
  menegakkan 56 huruf (985 baris, nol yang lewat), slot teratas `PapanRumus`
  dipesan untuk rumus utama, `kamera.muat_datar` untuk bidang yang tidak muat,
  `ganti_rumus(..., papan=papan)`.
- Menunggu keputusan ARYA: ukuran bawaan subtitle 85% (pilihan ARYA) atau 100%
  (usul UI/UX, dengan bukti 64 huruf masih muat satu baris).

### YANG BERUBAH 2 SEP MALAM sampai 3 SEP DINI HARI: standar video VERSI 2
Empat sesi membuat video dengan standar v1 dan ARYA harus mengulang koreksi yang
sama empat kali (kamera miring merusak panjang, keterangan bertabrakan subtitle,
subtitle mengeja angka). MASTER menanyakan sepuluh pilihan, ARYA menjawab,
hasilnya `docs/tugas/STANDAR-ILUSTRASI-VIDEO.md` VERSI 2 (membatalkan v1 di
setiap hal yang bertentangan) dan STANDAR-MENGAJAR bagian 5 aturan 9 dan 10.
- Keempat cabang sesi DIGABUNG ke master (tsc 0, eslint 0, build 43 detik).
- Perkakas `manim/gl/` v2: zona layar dikunci (identitas kiri atas, rumus kanan
  atas, kaki layar milik subtitle dan qc menjaganya), `sinema.label` maks 2
  kata (menggagalkan render), `sinema.keterangan` DIHAPUS, `lahir_rumus` dan
  `ganti_rumus` (morph lambang), `jam_subtitle` + `b.tunggu_sampai`, medan
  `tulis` di naskah (lambang, bukan ejaan), subtitle satu baris 56 huruf,
  `gabung_audio --uji` membuat salinan `-bersubtitle.mp4`, `cek_kode` menolak
  nama Manim CE dan `Indicate` tanpa warna. Render maks 2 per sesi.
- Rujukan resmi: `manim/scenes/vektor1_perahu.py` (bidang datar) dan
  `manim/scenes/ruang_3d_01.py` (3D); `manim/contoh/contoh_perahu.py` kini
  kerangka 30 detik saja.
- Subtitle 14 video Trigonometri dan Limit dibetulkan (bentuk tertulis, warna
  tinta, ukuran bawaan 85%) TANPA render ulang, dan **dideploy ke produksi 3 Sep
  dini hari** (`vercel deploy --prod`), sekaligus membawa revisi isi keempat
  topik dari gelombang 2. Videonya sendiri (Manim CE) tidak berubah.
- Jebakan ManimGL baru: `Tex.font_size` adalah FAKTOR SKALA, bukan poin
  (`rumus()`/`teks()` menyimpan `ukuran_matra`); cache LaTeX menyimpan hasil kosong
  saat MiKTeX memasang font (tambalan 3 menolaknya).
- Peran MASTER (ARYA): hanya menggabung ke master dan menyampaikan aturan;
  tinjauan dan revisi dari ARYA langsung ke tiap sesi. Sesi lapor "siap gabung".
- Utang: air masih "longgar" dari pandangan atas (`REVISI-ARYA-VIDEO.md` butir 1,
  resep sudah ditulis, belum dikerjakan); suara latar ditunda ke tahap akhir;
  UI/UX memverifikasi 56 huruf subtitle muat satu baris di Chrome.

### YANG BERUBAH 2 SEP SIANG: pindah ke ManimGL
ARYA menolak video perahu gelombang 1 (perahu = titik, sungai = kotak diam) dan
menuntut level 3b1b. Keputusannya, dijalankan penuh hari itu juga:
- **Manim Community DICABUT, ManimGL 1.7.2 100%.** 14 video Trigonometri dan
  Limit dibiarkan apa adanya; kodenya diarsipkan di `manim/arsip-manim-ce/`.
- Perkakas baru `manim/gl/` (tema, sinema, kamera, ilustrasi, qc), semua
  diuji: `manim/uji/uji_*_gl.py`, `manim/gl/uji_qc.py`. Contoh rujukan lengkap
  yang lolos gerbang: `manim/contoh/contoh_perahu.py` (narasi, air hidup,
  perahu 3D, kamera dunia ke peta, panah, suara latar air dengan ducking).
- Dokumen sesi: `docs/tugas/STANDAR-ILUSTRASI-VIDEO.md`, `docs/tugas/ILMU-3B1B.md`.
  Spec: `docs/superpowers/specs/2026-09-02-pindah-manimgl-dan-standar-ilustrasi-design.md`.
- Huruf: SEMUA LaTeX (`teks()` = TexText untuk kata, `rumus()` = Tex untuk
  angka dan rumus; Constantia dicoba lalu dibatalkan ARYA). Latar krem, satu versi.
- Render paralel BOLEH (8 serentak terbukti aman); antrean tidak wajib.
- Jebakan ManimGL yang sudah ditambal/dilarang: `latex -no-pdf` (MiKTeX),
  argv saat impor, `Text(color=)` diabaikan, dan **cache LaTeX yang menyimpan
  hasil kosong** saat MiKTeX sedang memasang font (tampak seperti teks "dibuang
  diam-diam"; tambalan menolak SVG kosong; kalau terjadi lagi hapus
  `%LOCALAPPDATA%\manim\manim\Cache`).
- Suara latar `manim/suara/air.ogg` masih SINTETIS; ganti rekaman CC0 setelah
  ARYA menyetujui unduhan.
- Utang MASTER baru: pesan pembangunan ke 5 sesi (lihat `PROMPT-SIAP-TEMPEL.md`
  bagian E), lalu terima setoran video ManimGL pertama tiap sesi.

### Yang berjalan tanpa perlu Anda sentuh
Lima sesi hidup di worktree masing-masing, sudah dikirimi tugas gelombang 2:
revisi isi dari MASTER dulu, baru enam video 480p per topik. Kalau jendelanya
tertutup, hidupkan dengan `NYALAKAN-5-SESI.bat`, lalu kirim prompt bagian D di
`docs/tugas/PROMPT-SIAP-TEMPEL.md`.

### Tugas MASTER berikutnya, urut
**Peran MASTER dipersempit ARYA (2 Sep sore, berlaku tetap): MASTER TIDAK
menerima atau meninjau setoran video. Sesi merevisi sendiri dari tinjauan ARYA.
MASTER hanya (1) menyatukan cabang ke `master` dan (2) menyampaikan aturan dan
larangan global ke semua sesi (lewat SendMessage, lihat memori
`kirim-pesan-antar-sesi`).**
1. **Satukan cabang sesi ke `master`** saat sesi lapor siap gabung. Jalankan
   tsc dan build lewat biner Node langsung (pemeriksaan teknis penggabungan,
   bukan penilaian isi), deploy. Konflik yang muncul selalu di `daftar-isi.ts` dan `topik.ts`, dan
   selalu berjenis "dua sesi menambah baris di tempat yang sama": ambil kedua
   sisi, LALU periksa kurung penutupnya (pernah hilang, lihat commit 32d520f).
2. **Lunasi utang MASTER** (daftarnya di bagian Tinjauan isi di atas):
   jenis blok `rujuk`, alat bingkai bersama, teks widget Limit di HP, hapus
   `trigonometri.webm` yang yatim.
3. **Video Limit kedelapan** kalau ARYA mau: Materi 03. Lihat alasannya di
   bagian Keadaan tujuh video Limit.

### Tiga keputusan visual yang masih milik ARYA
Foto pesawat berlogo DHL di Vektor Materi 10; galeri Ruang 3D tahap 10 gambar
sendiri atau foto; bentuk tanda "baris tab bisa digulir" (UI/UX akan mengajukan
dua pilihan berpotret).

### Jangan diulang, ini sudah pernah memakan waktu
- **`rtk` mengarang keluaran** tsc dan build. Verifikasi WAJIB lewat
  `node node_modules/<alat>/bin/...` langsung.
- **Jangan percaya "Automatic merge went well".** Selalu tsc dan build sebelum
  deploy; penggabungan pernah menjatuhkan dua kurung penutup dan lolos.
- **Cacat yang tidur menunggu data bertambah** tidak terlihat di build maupun
  tsc. Contohnya `<source>` video yang tidak ikut berganti saat pindah tahap,
  yang baru muncul setelah tujuh tahap punya video. Yang menemukannya: membuka
  situs yang SUDAH TAYANG dengan Playwright lalu membandingkan alamat yang
  DITULISKAN dengan alamat yang benar-benar DIMUAT.
- **Render ManimGL boleh paralel** (sejak 2 Sep siang; kartu grafis yang
  menggambar). Antrean `alat/antre_render.py` tinggal pilihan untuk 1080p.

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

## 📁 Folder kembar = sesi paralel yang DISENGAJA (rezim 1 Sep malam)

Di `.claude\worktrees\` ada worktree: satu gudang git dibuka di beberapa meja
kerja, tiap meja memegang cabang berbeda, masing-masing punya `PROGRESS.md`
sendiri yang bisa beda isi. Dulu ini pernah menyesatkan (Claude sempat bilang
"sudah digabung ke master" padahal belum, ARYA yang menemukannya). Sekarang
worktree justru dipakai resmi, dengan aturan tertulis.

| Sesi | Folder | Cabang | Tugas |
|---|---|---|---|
| MATRA-MASTER | `D:\MANIM-MATRA` | `master` | Limit, integrasi, deploy, PROGRESS.md |
| MATRA-VEKTOR | `.claude\worktrees\matra-vektor` | `sesi/vektor` | topik vektor |
| MATRA-GRAFIK-FUNGSI | `.claude\worktrees\matra-grafik-fungsi` | `sesi/grafik-fungsi` | topik grafik fungsi |
| MATRA-STATISTIKA | `.claude\worktrees\matra-statistika` | `sesi/statistika` | topik statistika |
| MATRA-RUANG-TIGA-DIMENSI | `.claude\worktrees\matra-ruang-3d` | `sesi/ruang-3d` | topik ruang 3D |
| MATRA-DESAIN-UI-UX | `.claude\worktrees\matra-ui-ux` | `sesi/ui-ux` | tampilan laptop + HP |

Aturan main lengkap: `docs/tugas/ATURAN-SEMUA-SESI.md`. Intinya:
- Tiap sesi HANYA di foldernya, HANYA di cabangnya, dilarang menyentuh master.
- Hanya MASTER yang menggabungkan, deploy, dan menulis `PROGRESS.md`;
  sesi lain menulis `docs/tugas/laporan/<NAMA>.md` di cabangnya.
- Selesai digabung, MASTER menghapus worktree + cabangnya supaya tidak ada
  catatan basi tersisa.
- Jangan percaya ingatan soal keadaan git. Periksa: `git worktree list` dan
  `git log --oneline -1 master`.
## 🏁 Keadaan lima sesi paralel (2 Sep 2026, dibaca dari laporan masing-masing)

| Sesi | Hasil gelombang 1 | Angka diperiksa | Menunggu |
|---|---|---|---|
| VEKTOR | 12 materi, 11 widget, 4 latihan, 32 kuis | 116, dua arah | tinjauan ARYA |
| GRAFIK-FUNGSI | 12 tahap, 11 widget, 4 latihan, 32 kuis, 6 foto beratribusi | 194, dua arah | tinjauan ARYA |
| STATISTIKA | 13 materi, 13 widget, 4 latihan, 32 kuis, semua data dinyatakan buatan | 146, dua pemeriksa | tinjauan ARYA |
| RUANG-3D | 10 materi, 9 widget 3D SVG, 4 latihan, 32 kuis, kalibrasi 5 soal UN asli | 70 | tinjauan ARYA |
| UI-UX | tampilan HP diperbaiki: tumpukan kolom, nav tiga garis, tab, target sentuh 44px | 7 layar x 5 zoom | penggabungan MASTER |

Semua laporan lengkap ada di `docs/tugas/laporan/` pada cabang masing-masing.

**Empat temuan sesi yang mengubah aturan bersama** (sudah masuk
`docs/tugas/ATURAN-SEMUA-SESI.md`):
1. **`rtk` mengarang keluaran.** `rtk proxy "npx tsc --version"` menjawab
   "TypeScript: No errors found"; `next build` lewat rtk mengaku 2 rute dalam
   1,2 detik padahal situsnya 15 halaman (STATISTIKA). Verifikasi sekarang
   memanggil `node node_modules/<alat>/bin/...` langsung. Catatan sesi 5 yang
   menyuruh memakai `rtk proxy` DICABUT.
2. **Playwright dipakai bersama antar sesi** tanpa nama sesi: potret nyasar ke
   folder sesi lain. Wajib `playwright-cli -s=<nama>`.
3. **Port 3000-3009 dikosongkan.** `npm run dev` tanpa `-p` naik diam-diam ke
   port sesi lain. Sesi sekarang di 3010 sampai 3014.
4. **`3 Dimensi.pdf` bukan geometri ruang**, isinya Buku Siswa Kelas XI
   (RUANG-3D memeriksa isinya, bukan judulnya).

**Temuan yang paling mendesak, dilaporkan EMPAT sesi secara terpisah:** halaman
topik rusak di lebar 375 piksel di SELURUH situs, termasuk Limit dan
Trigonometri yang sudah tayang. Di HP siswa tidak bisa membuka Latihan maupun
Kuis sama sekali. UI-UX sudah memperbaikinya di cabangnya; prioritas
penggabungan pertama.

**Utang MASTER dari laporan sesi:**
- Naikkan alat bingkai ke `components/widget/bersama/` (versi GRAFIK-FUNGSI
  paling lengkap) setelah semua topik tergabung; tiga topik menyalinnya.
- Jenis blok `rujuk` di `tipe.ts` untuk tautan antartopik yang bisa diklik.
- Teks widget Limit mengecil di HP (ARYA menyerahkannya ke MASTER, 2 Sep).
- Hapus `web/public/anim/trigonometri.webm` (yatim, 0,54 MB).
- Kompres foto galeri GRAFIK-FUNGSI (1 MB, di bawah 150 KB per foto).
- `Penjelasan.tsx` masih mengimpor tipe `Blok` dari tempat lama.

## 🎓 Tinjauan isi empat topik baru (MASTER, 2 Sep 2026)

ARYA (2 Sep): "semua kerjaan hingga saat ini saya anggap selesai, setuju,
lanjut", dan menyerahkan tinjauan ISI ke MASTER; tinjauan VISUAL tetap ARYA.
Keenam topik SUDAH TAYANG di situs asli.

MASTER membaca utuh keempat `tahap.ts` (sekitar 4.000 baris) dan keempat
rancangan, lalu menilainya dengan `docs/tugas/STANDAR-MENGAJAR.md`.

| Topik | Vonis | Kekuatan | Revisi utama |
|---|---|---|---|
| Vektor | LAYAK | urutan beralasan (Pythagoras, bukan trig), contoh + coba lengkap | "kamu" jadi "Anda"; prasyarat kosinus di Materi 11 |
| Grafik Fungsi | LAYAK, suara guru terkuat | alasan selalu sebelum aturan, tahap 6 sebagai poros | huruf x sebagai tanda kali (9 baris); pecah tahap 11 jadi komposisi dan invers |
| Statistika | LAYAK, "kenapa dulu" terbaik | mean titik seimbang DIBUKTIKAN, simpangan baku 4 langkah beralasan | huruf x sebagai tanda kali (13 baris); tahap 9 tambah coba modus |
| Ruang 3D | LAYAK | satu gagasan payung, tahap 1 coba dulu | tiga soal UN cuma jawaban tanpa jalan; tan dan aturan kosinus tanpa pemanggil ulang |

Aturan lintas topik yang lahir dari tinjauan ini (masuk file tugas tiap sesi):
1. Kata ganti siswa **"Anda"** (lima topik memakainya; Vektor menyesuaikan).
2. Tanda kali di baris `contoh`: **×** atau "kali", JANGAN huruf x.
3. Kata "mudah", "jelas", "gampang", "tentu saja" diperiksa satu per satu:
   boleh menggambarkan benda, dilarang menilai tugas siswa.
4. Tiap tahap prosedural wajib `contoh` beralasan + `coba` berpenuntun; tahap
   dua ide besar wajib `coba` untuk keduanya.
5. Daftar periksa 10 butir STANDAR-MENGAJAR diisi per tahap di laporan.

Keputusan MASTER atas pertanyaan sesi: data BPS tidak diambil (tetap data
buatan yang jujur); galeri Ruang 3D dan foto DHL adalah keputusan visual ARYA.

Gelombang 2 per sesi: revisi isi dulu, lalu enam video 480p, satu per satu
lewat `alat/antre_render.py`, narasi mengikuti bagian 5 STANDAR-MENGAJAR.
Daftar videonya ada di tiap `docs/tugas/MATRA-*.md` bagian "Gelombang 2".

### Utang MASTER (jangan hilang)
- Jenis blok `rujuk` di `content/tipe.ts` (tautan antartopik yang bisa
  diklik); perendernya nanti UI/UX. Diminta tiga sesi.
- Naikkan alat bingkai ke `components/widget/bersama/` (versi GRAFIK-FUNGSI
  paling lengkap); tiga topik menyalinnya.
- Teks widget Limit mengecil di HP (ARYA menyerahkannya ke MASTER).
- Hapus `web/public/anim/trigonometri.webm` (yatim, 0,54 MB).
- Kalau GRAFIK memecah tahap 11, `daftar-isi.ts` tidak berubah; cukup
  gabung ulang.

## 🎥 Keputusan ARYA 2 Sep sore: video vektor pindah ke bidang bernomor

Ditulis sesi MATRA-VEKTOR atas perintah ARYA, untuk dilaporkan ke MASTER.
Rinciannya di `docs/superpowers/specs/2026-09-02-video-vektor-bidang-bernomor.md`.

ARYA menonton `vektor1-perahu.mp4` dan `vektor6-sambung.mp4` (ManimGL penuh 3D)
lalu MENOLAK keduanya: gambar 3D-nya pecah, panahnya "sembarang tidak akurat",
tidak ada koordinat tertulis, perahunya tidak stabil.

**Akar masalahnya bukan 3D, melainkan kamera yang dimiringkan.** Supaya panah
yang segaris tidak saling menutupi, pandangan peta dimiringkan 14 sampai 26
derajat. Perspektif lalu memendekkan satu arah lebih banyak daripada arah lain,
sehingga segitiga 3-4-5 TIDAK lagi terlihat seperti 3-4-5. Untuk pelajaran
vektor itu fatal: gambarnya membantah hitungannya. Widget web topik yang sama
punya `jendelaSeimbang` yang dibuat khusus untuk mencegah itu, dan aturannya
dibuang begitu pindah ke video.

Arah barunya, disetujui ARYA:
> Matematika digambar di bidang datar bernomor, kamera tegak lurus dari atas,
> tidak pernah dimiringkan lagi. 3D hanya di babak pembuka, sekadar menjawab
> "kenapa ini penting", lalu ditinggalkan.

Panah yang segaris dipisahkan dengan geseran tegak lurus 0,15 satuan (di bawah
5 persen panjang panahnya, tidak mengubah satu pun angka), BUKAN dengan
mengangkatnya di sumbu z lalu memiringkan kamera.

### Untuk MASTER: usul mengubah aturan 1 STANDAR-ILUSTRASI-VIDEO
Keputusan ARYA: diubah untuk SEMUA topik, bukan pengecualian vektor saja.
Aturan 1 sekarang mewajibkan semua benda nyata dibuat 3D. Usulnya diganti jadi:

> 3D dipakai HANYA kalau memperlihatkan sesuatu yang tidak terlihat di 2D.
> Matematika yang butuh panjang atau sudut yang akurat WAJIB digambar dengan
> kamera tegak lurus, tanpa kemiringan.

Alasannya bukan selera: kesalahan ini sudah menghasilkan dua video ditolak, dan
Grafik Fungsi serta Statistika berisiko mengulanginya.

### Untuk MASTER: fungsi baru menunggu digabung
`bidang_bernomor()` akan ditambahkan sesi vektor di akhir `manim/gl/ilustrasi.py`
(bidang koordinat berangka, skala terkunci sama), sesuai aturan 1 standar yang
menyuruh benda baru ditaruh di situ dengan nama unik.

### Untuk MASTER: subtitle harus memakai angka dan lambang, bukan ejaan
Permintaan ARYA 2 Sep sore. Dua bagian, dan hanya SATU yang benar-benar bug:

**a. "Tampilkan 100%, jangan setengah-setengah" TIDAK perlu diperbaiki.**
Diperiksa di `manim/buat_subtitle.py`: `pecah()` memecah segmen panjang jadi
beberapa baris bertimestamp di batas kalimat lalu koma, dan tidak ada yang
dibuang (`hasil or [teks]` menjaga sisa). Yang ARYA lihat kosong kemungkinan
besar karena dua video vektor BELUM punya berkas `.vtt` sama sekali; sesi
vektor belum pernah menjalankan alatnya. Itu kelalaian sesi, bukan cacat alat.

**b. Angka dan lambang masih dieja: INI yang perlu diperbaiki.**
Bukti dari subtitle yang sudah tayang, `web/public/anim/limit1-kecepatan.vtt`
baris 1: "Speedometer menunjuk enam puluh kilometer per jam." Seharusnya
"60 km/jam". Sebabnya subtitle memakai teks yang sama dengan yang dikirim ke
mesin suara, dan mesin suara memang butuh ejaan.

Usul perubahan, kecil dan tidak merusak naskah lama: tambahkan medan opsional
`"layar"` per segmen di `manim/narasi/<topik>.json`.
- `buat_narasi.py` tetap memakai `teks` (ejaan, untuk mesin suara).
- `buat_subtitle.py` memakai `layar` kalau ada, kalau tidak ada jatuh kembali
  ke `teks`. Naskah lama tetap jalan tanpa diubah.

Contoh: `"teks": "panjangnya akar tiga belas, sekitar tiga koma enam satu"`,
`"layar": "panjangnya √13, sekitar 3,61"`.

**SUDAH DIKERJAKAN sesi vektor, tinggal ditinjau MASTER.** Perubahannya satu
baris di `manim/buat_subtitle.py`:

```
potongan = [tebalkan(x) for x in pecah(seg.get("layar") or seg["teks"])]
```

Naskah tanpa `layar` berjalan persis seperti dulu, jadi sembilan naskah topik
lain tidak tersentuh. Sesi vektor menyentuh berkas bersama ini karena tanpa itu
permintaan ARYA tidak bisa dipenuhi sama sekali; kalau MASTER mau menolaknya,
cukup kembalikan satu baris itu.

Hasilnya sudah diperiksa, bukan diperkirakan. `vektor1-perahu.vtt`: 30 baris,
118,37 detik, nol baris tumpang-tindih, dan setiap kata naskah muncul di
subtitle (jawaban untuk keluhan ARYA "tidak setengah-setengah"). Baris pertama
berbunyi `Materi 01, <b>Angka saja tidak cukup</b>.` dan baris ketiga
`Sungainya selebar 3 km, ...`, bukan "tiga kilometer".

Catatan terpisah: keluhan "subtitle tidak tampil 100%" TERNYATA bukan cacat
`pecah()`. Fungsi itu tidak membuang apa pun, sudah diuji per kata. Sebab
sebenarnya kedua video vektor belum pernah punya berkas `.vtt` sama sekali,
karena `buat_subtitle.py` memang belum pernah dijalankan untuk topik ini.

## 🔗 Pratinjau untuk tinjauan ARYA (2 Sep 2026)

**https://matra-8c3pwiiis-aryasejati002-4616s-projects.vercel.app**

Berisi master seutuhnya: empat topik baru, tujuh video Limit, perbaikan HP.
Kesembilan halaman baru (4 topik + 4 latihan + limit) dicek menjawab HTTP 200.
Situs asli (matra-eight.vercel.app) HANYA memuat perbaikan HP dan video Limit;
empat topik baru SENGAJA belum dipromosikan sampai ARYA meninjau.

Aturan mulai sekarang: **master = tergabung, situs asli = disetujui ARYA.**
Deploy ke situs asli (dengan --prod) hanya setelah ARYA bilang setuju. Sebelum
itu pakai: vercel deploy --yes --cwd D:/MANIM-MATRA/web (TANPA --prod) untuk
tautan pratinjau baru.

Keadaan cabang: kelima cabang sesi selaras dengan master di commit yang sama.
Kelima sesi sudah dikirimi prompt A (potret ulang HP, jangan bangun yang baru).
Penggabungan menyisakan satu pelajaran: penyelesai konflik ambil-keduanya
menjatuhkan penutup entri di daftar-isi.ts dan sumber.json; tsc dan pemeriksa
JSON yang menangkapnya. Selalu tsc + build SEBELUM deploy, jangan percaya
"Automatic merge went well".

## 🚀 Deploy Vercel (dikerjakan 1 Sep 2026, sesi 5)

**Alamat tayang: https://matra-eight.vercel.app**

| Hal | Keadaan |
|---|---|
| Proyek Vercel | `matra` di tim `aryasejati002-4616s-projects` |
| Vercel CLI | **sudah login** sebagai `aryasejati002-4616`, tidak perlu peramban |
| Perintah deploy | `vercel deploy --prod --yes --cwd D:/MANIM-MATRA/web` |
| Vercel Authentication | **DIMATIKAN**, jadi situs bisa dibuka siapa pun yang punya tautannya |
| Git remote | **TIDAK ADA**. Repo ini lokal saja, deploy lewat unggahan CLI, bukan GitHub |
| Cabang utama | **`master`**, bukan `main`. Jangan tertukar |

### Dua jebakan yang sudah kena dan sudah diselesaikan

**1. Semua halaman 404 padahal build sukses.** Proyeknya dibuat lewat
`vercel project add matra`, sehingga preset framework-nya kosong dan Vercel
memperlakukan folder `web/` sebagai unggahan berkas statis biasa. Gejalanya
khas: berkas di `public/` tetap bisa diambil (video 200), tetapi semua halaman
404, dan `vercel inspect` menunjukkan baris `Builds` cuma berisi titik dengan
durasi 0 milidetik. Sudah ditambal oleh `web/vercel.json` yang menyebut
`"framework": "nextjs"` secara tegas. Berkas itu **jangan dihapus**.

**2. Alamatnya bukan yang ditebak.** URL produksi yang sebenarnya adalah
`matra-eight.vercel.app`, muncul di baris `Aliased` pada log deploy.
Alamat `matra-aryasejati002-4616s-projects.vercel.app` menjawab 404, dan
`matra.vercel.app` milik ORANG LAIN yang kebetulan namanya sama. Selalu baca
baris `Aliased` di log, jangan menebak polanya.

### Sebelum deploy berikutnya
1. `npx next build` harus lolos lokal dulu.
2. Kalau isi video diganti, **ganti juga nama berkasnya** (aturan `immutable`
   di `next.config.ts` berlaku setahun).
3. Perkiraan kuota ada di `docs/2026-09-01-kuota-vercel-matra.md`. Ringkas:
   100 siswa memakai 4,2 persen transfer dan 2,7 persen request. Aman sampai
   sekitar 2.400 siswa rajin per bulan, dan turun ke sekitar 465 kalau keenam
   topik lengkap dengan video.

---

## 🎬 Keadaan tujuh video Limit

| Prioritas | Materi | Naskah | Adegan | 480p | 1080p | Keadaan |
|---|---|---|---|---|---|---|
| 1 | 04 Lubang di grafik | ✅ | ✅ | ✅ | ✅ | **TAYANG** |
| 2 | 01 Kecepatan sesaat | ✅ | ✅ | ✅ | ✅ | **TAYANG** |
| 3 | 08 Limit sinus | ✅ | ✅ | ✅ | ✅ | **TAYANG** |
| 4 | 02 Mendekati | ✅ | ✅ | ✅ | ✅ | **TAYANG** |
| 5 | 09 Kontinuitas | ✅ | ✅ | ✅ | ✅ | **TAYANG** |
| 6 | 06 Nol per nol | ✅ | ✅ | ✅ | ✅ | **TAYANG** |
| 7 | 07 Tak hingga | ✅ | ✅ | ✅ | ✅ | **TAYANG** |

**LIMIT TUNTAS (2 Sep 2026).** Tujuh video dari sepuluh materi, dan itu
memang sasarannya. Trigonometri pun tujuh dari sepuluh, jadi polanya sama:

| | Limit | Trigonometri |
|---|---|---|
| Materi/tahap | 10 | 10 |
| Video | 7 | 7 |
| Tanpa video | 03, 05, 10 | 01, 03, 10 |

Alasan ketiganya sengaja tanpa video, bukan tertinggal:
- **Materi 10 Dunia nyata** galeri, tidak butuh animasi. Tahap 10 Trigonometri
  sama, dan Vektor serta Ruang 3D juga merencanakan begitu.
- **Materi 05 Cara cepat** janjinya sengaja ditunda dan dilunasi di Materi 09,
  dan Materi 09 SUDAH punya video. Jadi bagian yang perlu dianimasikan sudah
  ada, tinggal ditonton di tempat pelunasannya.
- **Materi 03 Dua arah harus sepakat** satu-satunya calon yang masih masuk
  akal. Kalau ARYA mau menambah video Limit kedelapan, inilah yang dipilih:
  kiri dan kanan tidak sepakat, jadi limitnya tidak ada. Sebagian sudah
  tergambar di video Materi 02 (dua garis bilangan, mendekat dari dua arah),
  jadi ini penyempurnaan, bukan lubang.

Berkas naskah dan adegan hanya ada untuk ketujuh video itu
(`manim/narasi/limit*.json`, `manim/scenes/limit*.py`). Tidak ada adegan yang
sudah ditulis tetapi belum dirender.

Ketujuhnya 1920x1080 60fps, bersuara,
bersubtitle, berposter, terdaftar di `web/content/limit/tahap.ts`, dan sudah
di-deploy. ARYA memilih "render dulu, risiko diterima" tanpa menunggu ia
menonton, jadi kalau ia menemukan cacat, video itu dirender ulang.

Bitrate videonya 340 sampai 490 kbps. Itu SANGAT hemat untuk 1080p60 (YouTube
menyarankan sekitar 12.000 kbps) sebab isinya warna rata dan teks, bukan
rekaman kamera. Jadi jangan buru-buru menurunkan mutu kalau ukurannya terasa
besar; yang besar adalah jumlahnya, bukan tiap berkasnya.

### 🐛 Bug pemutar yang ikut terbongkar saat tujuh video tayang

Elemen `<video>` dipakai ulang saat siswa pindah tahap. Peramban HANYA membaca
`<source>` ketika elemen videonya pertama dibuat, jadi React mengganti
alamatnya tetapi videonya TIDAK ikut berganti. Yang tampil poster tahap baru,
yang terputar video tahap lama. Bukti dari situs yang sudah tayang:

```
declared=limit9-kontinu.webm | loaded=limit1-kecepatan.webm | durasi=102.1
```

Cacat ini TIDUR selama cuma Materi 04 yang punya video, dan langsung bangun
begitu tujuh tahap punya video. Perbaikannya satu baris: `key={berkas}` pada
elemen `<video>` di `web/components/PemutarVideo.tsx`, supaya elemennya dibuat
ulang dan pemilihan sumbernya diulang dari nol. Sudah diperbaiki, di-deploy
ulang, dan diperiksa satu per satu di situs yang tayang: tujuh tahap memuat
videonya sendiri, termasuk saat kembali ke tahap sebelumnya.

**Pelajarannya:** cacat yang tidur menunggu data bertambah tidak akan terlihat
di `npm run build` maupun di `tsc`. Yang menemukannya adalah membuka situs yang
SUDAH TAYANG dengan Playwright lalu membandingkan alamat yang dituliskan dengan
alamat yang benar-benar dimuat. Lakukan itu setiap kali menambah banyak konten
sejenis sekaligus.

**Catatan untuk MATRA-DESAIN-UI-UX:** `PemutarVideo.tsx` wilayahmu, tapi MASTER
menyentuhnya untuk perbaikan darurat ini. Fast-forward cabangmu ke `master`
sebelum mengedit berkas itu.

**Ukuran jadi masalah baru.** Keenam video baru menambah 35,2 MB, sehingga
`web/public/` naik dari 43,3 MB ke 78,4 MB, dan 96 persen isinya video.
Kuota Vercel gratis masih aman: 100 siswa menonton semua video sekali kira-kira
7,7 GB, yaitu 7,7 persen dari jatah 100 GB per bulan. Tapi kalau keenam topik
nanti punya video, transfer inilah yang akan mentok lebih dulu, bukan request.
Kalau perlu dipangkas: turunkan bitrate VP9, bukan resolusinya.

Ketujuh adegan sudah ditulis dan dirender. Enam salinan tinjauan bersuara ada
di `media/uji-480p/` (Materi 04 tidak perlu, sudah tayang 1080p). Folder itu
tidak masuk git sebab `media/` diabaikan; buat ulang dengan
`python manim/gabung_audio.py <topik> <NamaAdegan> --uji`.

**ATURAN BARU DARI ARYA (1 Sep 2026):** render SEMUA video di 480p dulu untuk
direvisi, baru render 1080p60 sekaligus di akhir. Jangan render final satu per
satu sebelum ARYA melihatnya.

### Cacat yang ditemukan dengan MELIHAT lembar kontak, sesi 6

Semuanya lolos dari log render tanpa satu pun galat. Tidak ada yang bisa
ditemukan tanpa membuka gambarnya.

| Video | Cacat | Sebabnya |
|---|---|---|
| 09 Kontinuitas | semua keterangan menyusut sampai tak terbaca | kalimat panjang satu baris dipaksa muat lebar 5,6 satuan oleh `batasi_lebar`, hurufnya tinggal 40 persen. **Pecah kalimat jadi baris pendek secara manual, jangan andalkan `batasi_lebar`.** |
| 09 Kontinuitas | 50 detik terakhir menayangkan grafik meledak sementara narasinya bilang "suku banyak kontinu di SEMUA titik" | gambar tidak ikut diganti saat babak berpindah, jadi layar membantah ucapannya |
| 09 Kontinuitas | keterangan lama dan baru tumpang tindih 1,4 detik | `FadeOut` dan `FadeIn` dijalankan bersamaan di posisi yang sama. Pakai berurutan. |
| 06 Nol per nol | tiga peralihan rumus jadi coretan tak terbaca 2 detik | `ReplacementTransform` antara dua rumus yang jumlah lambangnya jauh berbeda. **DIKOREKSI 2 Sep malam: rumus TETAP di-morph, tetapi lambang per lambang lewat `sinema.ganti_rumus` (TransformMatchingStrings), bukan ReplacementTransform mentah dan bukan tukar berurutan.** Catatan lama ini sempat membuat sesi Grafik memakai fade out/in, yang ditolak ARYA. |
| 06 Nol per nol | huruf `x` tertutup habis oleh coretannya sendiri, terlihat dihapus bukan dicoret | tebal garis yang pas untuk faktor `(x-2)` kelewat tebal untuk satu huruf. Sekarang tebalnya menyesuaikan lebar sasaran. |
| 07 Tak hingga | dua baris contoh pecahan menyusut sampai sulit dibaca | satu `MathTex` panjang berisi `\tfrac` dan `\qquad` jadi objek kelewat lebar, lalu dikecilkan seluruhnya. **Pisah jadi beberapa objek lalu `arrange`.** |
| 07 Tak hingga | keterangan penutup grafik cuma sempat tampil penuh 1,5 detik | langkah menggambar sebelumnya terlalu panjang |

| 06 Nol per nol | rumus lama dan rumus baru bertumpuk hampir 2 detik pada babak hasil1 | `FadeOut` dan `FadeIn` dijalankan BERSAMAAN di tempat yang sama. **Cacat ini lolos dari lembar kontak 480p** sebab sampelnya kebetulan meleset dari detik itu, dan baru ketahuan pada gerbang mutu berkas FINAL. Bukti bahwa langkah 10 di resep bukan formalitas. |

Satu hal yang **sengaja dibiarkan**: ada jeda sekitar 1 detik layar kosong
antara judul pembuka memudar dan isi pertama muncul, di ketujuh video. Itu
bawaan `sinema.judul_pembuka` yang memakai 80 persen jatah babak `sapa`. Kalau
ARYA merasa itu mengganggu, ubah pengali 0,80 di semua adegan sekaligus.

---

## 🛠️ Alat yang diperbaiki di sesi 5

**`manim/cek_kode.py` punya DUA lapor palsu dan keduanya sempat menghentikan
render.** Sekarang sudah benar, dan perbaikannya sudah diuji lewat berkas uji
yang memuat cacat sungguhan:

1. `Text` dimasukkan ke daftar pembuat LaTeX, padahal `Text` memakai Pango.
   Kalimat Indonesia yang sah dilaporkan gagal dibangun. Sekarang hanya
   `MathTex` dan `Tex` yang dibangun lewat MiKTeX.
2. Newline di dalam `Text` dianggap gejala string lupa awalan `r`, padahal ia
   pemisah baris yang disengaja. Sekarang dikecualikan khusus untuk pembuat
   teks biasa; di dalam `MathTex` newline tetap dianggap salah.

**`alat/cek_soal.py`** (dibuat di paruh pertama sesi ini) memeriksa jawaban
limit dengan sympy dan menolak yang salah.

---

## ⚠️ Cacat kecil yang belum diperbaiki
- Lencana "Matematika SMA" di pojok kanan atas **terpotong** pada layar sempit
  (terlihat di lebar 420 piksel). Tidak menghalangi pemakaian.
- `web/public/anim/trigonometri.webm` (0,54 MB) berkas yatim, tidak dipakai
  kode mana pun. Aman dihapus.

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

### LANGKAH 1: tunggu ARYA menonton enam video 480p

Enam berkas sudah dikirim ke ARYA pada akhir sesi 6, ada juga di
`media/uji-480p/` (folder itu tidak masuk git). Jangan render 1080p sebelum ARYA
menyebut mana yang perlu diperbaiki atau bilang sudah oke. Itu aturan ARYA,
bukan tebakan.

Kalau `media/uji-480p/` sudah terhapus, buat lagi tanpa render ulang:

```bash
python manim/gabung_audio.py limit1-kecepatan  KecepatanSesaat        --uji
python manim/gabung_audio.py limit2-mendekati  MendekatiBukanMenyentuh --uji
python manim/gabung_audio.py limit6-nolpernol  NolPerNol              --uji
python manim/gabung_audio.py limit7-takhingga  TakHingga              --uji
python manim/gabung_audio.py limit8-sinus      LimitSinus             --uji
python manim/gabung_audio.py limit9-kontinu    FungsiTidakPutus       --uji
```

### LANGKAH 2: kalau ARYA sudah setuju, render enam-enamnya 1080p60 sekaligus

Pakai langkah 7 sampai 10 dari resep di bawah, enam kali. Materi 04 dilewati,
sudah tayang. Perkiraan waktu: sekitar 1,5 jam render, bisa ditinggal.

### Resep lengkap. Sudah terbukti tiga belas kali, tinggal diulang.

Ketujuh video Trigonometri sudah jadi dari nol sampai tayang, jadi resep di
bawah ini bukan teori. Urutan persisnya, ulangi apa adanya. Sudut pandang
visual tiap video ada di `docs/superpowers/specs/2026-09-01-limit-alur-belajar.md`.

**DIPERBARUI 2 Sep siang: resep ini kini memakai ManimGL** (Manim Community
dicabut, keputusan ARYA). Langkah dan gerbangnya sama, perkakasnya `manim/gl/`.
Baca dulu `docs/tugas/STANDAR-ILUSTRASI-VIDEO.md` dan `docs/tugas/ILMU-3B1B.md`.

```bash
# 0. Storyboard: benda nyata apa, kamera mulai dari mana, terbang ke mana,
#    warna apa untuk besaran apa (STANDAR-ILUSTRASI-VIDEO.md, 8 aturan)
# 1. Tulis naskah  ->  manim/narasi/<topik>.json  (6-10 segmen, ±90 detik; "latar": "air" kalau di air)
# 2. Buat suara + ukur durasinya
python manim/buat_narasi.py <topik>
# 3. Tulis adegan  ->  manim/scenes/<berkas>.py
#    Tiru manim/contoh/contoh_perahu.py: class X(AdeganMatra), from gl import *,
#    gl.ilustrasi untuk benda, gl.kamera untuk gerakan, sinema.babak untuk waktu,
#    teks() untuk kata, rumus() untuk angka/rumus, qc.periksa_adegan tiap babak.
# 4. Periksa SEBELUM render  (detik, bukan menit)
python manim/cek_kode.py manim/scenes/<berkas>.py --dalam
# 5. Render UJI 480p  (paralel antar sesi BOLEH; adegan berat ±5 fps)
manimgl manim/scenes/<berkas>.py <NamaAdegan> -w -l
# 6. Gerbang mutu: LIHAT lembar kontaknya, nilai tiap frame
python manim/cek_video.py media/gl/<NamaAdegan>.mp4 --per-detik 0.25
# 6b. Gabung narasi versi uji (+ suara latar dari naskah) -> media/uji-480p/<topik>.mp4, kirim ke ARYA
python manim/gabung_audio.py <topik> <NamaAdegan> --uji
# 7. Baru render final 1080p60 setelah ARYA setuju (gelombang 3)
manimgl manim/scenes/<berkas>.py <NamaAdegan> -w --hd --fps 60
# 8. Gabung narasi -> WebM, otomatis tersalin ke web/public/anim/
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
samping `#3A6EA5` · depan `#C25E4D` · miring `#1F2430` · sudut `#6A4C93`
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
- **Periksa keadaan git, jangan mengandalkan ingatan.** Di akhir sesi 6 Claude
  menyatakan kerjaannya sudah masuk `master`, padahal belum. Perintahnya cuma
  `git worktree list` dan `git log --oneline -1 master`, dua detik. Lihat bagian
  "Folder kembar" di atas.
- **Kalau kalimat di layar terasa panjang, hitung hurufnya.** `batasi_lebar`
  tidak memotong baris, ia mengecilkan seluruh objek. Satu baris 78 huruf
  menyusut jadi sekitar 40 persen dan hilang terbaca, tapi render tetap lolos
  tanpa peringatan apa pun. Pecah sendiri dengan `\n`, sekitar 26 huruf per baris.
