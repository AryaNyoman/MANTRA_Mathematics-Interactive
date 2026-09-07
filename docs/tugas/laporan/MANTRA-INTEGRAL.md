# Laporan MANTRA-INTEGRAL

Sesi khusus topik **Integral** (Kelas 12). Dibuka 7 September 2026 atas perintah ARYA.

## Identitas sesi (untuk MASTER)
| Hal | Nilai |
|---|---|
| Nama sesi (alamat pesan) | **MANTRA-INTEGRAL** |
| Cabang | **`sesi/integral-materi`** |
| Worktree | `.claude/worktrees/integral-folder-branch-setup-05863c` |
| Dasar cabang | `sesi/turunan` (= `master` 8caec58 + commit kerangka 5774493) |
| Port dev server | 3016 (3015 dipakai sesi Turunan) |
| Playwright | `-s=mantra-integral` |
| Laporan ini | `docs/tugas/laporan/MANTRA-INTEGRAL.md` |

Cabang lama `sesi/integral` TIDAK dipakai: isinya sama persis dengan leluhur
`master`, tanpa satu pun commit sendiri. Dibiarkan utuh sebagai jejak, boleh
dihapus MASTER kapan saja.

## Pembagian kerja dengan sesi Turunan
Berkas tugas `docs/tugas/MANTRA-TURUNAN-INTEGRAL.md` memberi DUA topik ke satu
sesi. Sejak 7 Sep 2026 ARYA memisahkannya:
- Sesi **materi-turunan-b8c515** (cabang `sesi/turunan-materi`) = **Turunan saja**.
- Sesi **MANTRA-INTEGRAL** (cabang `sesi/integral-materi`) = **Integral saja**.

Sesi ini memakai separuh Integral dari berkas tugas itu, dan rancangan
`docs/superpowers/specs/2026-09-06-integral-alur-belajar.md`.

## Folder milik sesi ini
`web/content/integral/`, `web/components/widget/integral/`,
`web/components/topik/PanggungIntegral.tsx`, `web/app/latihan/integral/page.tsx`,
baris Integral di `daftar-isi.ts`, `topik.ts`, `subbab.ts`, berkas `alat/` yang
namanya menyebut integral, dan laporan ini. Di luar itu jangan disentuh.

## 11 materi Integral (semua masih `siap: false`)
1. Dari laju ke jumlah, membalik turunan
2. Tanda integral dan aturan pangkatnya
3. Substitusi, melihat lapisan
4. Parsial, trigonometri, dan eksponen
5. Luas dari persegi panjang, jumlahan Riemann
6. Integral tentu dan sifat-sifatnya
7. Dua dunia yang ternyata satu, Teorema Dasar Kalkulus
8. Menghitung integral tentu
9. Luas daerah, termasuk yang di bawah sumbu
10. Luas antara dua kurva
11. Integral di sekitar kita

## Selesai
- 7 Sep 2026: cabang `sesi/integral-materi` dibuat, kerangka Integral (11 materi
  rintisan, `PanggungIntegral`, `widget/integral/Rintisan`, halaman latihan,
  pendaftaran di tiga berkas) sudah ada di cabang ini lewat fast-forward.
- Diperiksa: TIDAK ADA folder integral kembar atau nyasar di `D:\MANIM-MATRA`.
  Yang ada hanya folder milik proyek di atas, ditambah rancangan dan berkas tugas.
- `git merge master` bersih, nol konflik (commit `40844ae` di atas `8f7927e`).
- `cd web && npm install` SELESAI: 361 paket, 0 kerentanan.
- `tsc --noEmit` LOLOS (exit 0), dipanggil lewat biner Node langsung, bukan lewat rtk.
- Uji kirim pesan dua arah dengan MANTRA-MASTER BERHASIL: kirim, dibalas, dibalas lagi.

## INTEGRAL SIAP GABUNG

Keempat tahap selesai. Cabang `sesi/integral-materi`, siap digabung MASTER.

| Tahap | Isi | Keadaan |
|---|---|---|
| 1 | 11 materi | SELESAI, direvisi atas pemeriksaan silang MASTER |
| 2 | 10 widget + galeri + panggung | SELESAI, semuanya diuji di peramban |
| 3 | 4 latihan + 32 kuis | SELESAI |
| 4 | `siap: true` per materi lalu topik, plus gerbang | SELESAI |

### Gerbang, semuanya dijalankan ulang setelah saklar dinyalakan
| Gerbang | Hasil |
|---|---|
| `cek_integral.py alat/materi-integral.json` | 65 dari 65 lolos |
| `cek_integral.py alat/soal-integral.json` | 43 dari 43 lolos |
| `cek_integral.py ... --harus-gagal` | 15 klaim sengaja salah, 15 ditolak |
| `cek_urutan_integral.py` | nol pemakaian istilah terlalu dini |
| `periksa_tahap.py integral` | semua tahap lolos |
| `tsc --noEmit` | 0 |
| `eslint` wilayah Integral | 0 |
| `next build` | 0, `/topik/integral` dan `/latihan/integral` dibuat |
| Galat konsol peramban, 11 materi | 0 galat, 0 peringatan |

### Kesepuluh widget, semuanya potretnya DIBUKA dan seretnya diuji
| Widget | Materi | Bukti singkat |
|---|---|---|
| `mesin-balik` | 01 | C digeser 0 sampai 3, kemiringan tetap 1 |
| `naik-pangkat` | 02 | tinggi papan atas sama dengan kemiringan papan bawah; n = -1 ditolak |
| `cocokkan-lapisan` | 03 | calon u salah dijelaskan sebabnya, bukan sekadar ditolak |
| `pasangkan-turunan-integral` | 04 | pasangan salah menampilkan turunannya sendiri |
| `persegi-panjang-menumpuk` | 05 | n=7 memberi 28; selisih menyusut 3,5 ke 1,75 ke 0,408 |
| `pecah-selang` | 06 | c digeser ke tiga tempat, jumlahnya tetap 0 |
| `luas-yang-tumbuh` | 07 | x=1,5 memberi A 1,125 dan kemiringan 1,5 |
| `hitung-bertahap` | 08 | soal substitusi terbuka penuh sampai 4/3 |
| `luas-dua-daerah` | 09 | integral 0 sementara luas 21,333 |
| `dua-kurva` | 10 | x³ dan x pada [-1,1]: luas 0,5, selisih 0 |
| `dunia-nyata-integral` | 11 | galeri empat kartu, jalurnya dihitung dari rumusnya |

### Cacat yang ditemukan sendiri dan sudah diperbaiki
Semuanya LOLOS tsc dan eslint, dan hanya ketahuan dari membuka potret atau
memeriksa angkanya:
1. Widget 01: angka kemiringan menimpa garis sumbu; kurva bayangan keluar
   bingkai pada C ekstrem.
2. Widget 02: jendela diukur untuk keadaan ekstrem sehingga keadaan awal
   nyaris datar; pesan penolakan terpotong jadi "ak pangkat -1"; panel mengaku
   F punya kemiringan padahal F-nya tidak ada.
3. SEMUA widget: menyeret dengan tetikus ikut menyeleksi tulisan, angka sumbu
   jadi blok biru. Diperbaiki sekali di `Bidang.tsx`.
4. `potongTanda`: akar yang jatuh PERSIS di titik cuplikan tidak terdeteksi,
   sehingga luas antara x³ dan x pada [-1,1] dilaporkan 0 padahal 0,5. Widget
   09 dengan sin x mengidap hal yang sama tanpa ketahuan.
5. Widget 07: keterangan terpotong; jejak kurva luas digambar di kiri nol.
6. Bank soal: ke-32 jawaban benar semuanya di pilihan A. Disebar jadi
   7, 7, 6, 6, 6.

## Butuh MASTER
1. **Gabungkan `sesi/integral-materi`.** Semua gerbang lolos.
2. **Satu error eslint di wilayah sesi lain, BUKAN dari saya:**
   `web/components/widget/transformasi-geometri/Legenda.tsx` baris 58,
   `react-hooks/immutability`, "Cannot reassign x after render completes".
   Berkas itu SAMA PERSIS dengan versi di master (`git diff master HEAD`
   kosong), jadi errornya bawaan master. Saya tidak menyentuhnya sesuai aturan
   wilayah. Kalau `eslint .` dipakai sebagai gerbang gabung, ini akan menahan
   siapa pun, bukan cuma saya.
3. **Perkakas gambar salinan keempat** (`koordinat.ts`, `seret.ts`,
   `Bidang.tsx` di `widget/integral/`) sudah Anda catat sebagai utang MASTER.
   Catatan tambahan: perbaikan `userSelect: none` dan perbaikan `potongTanda`
   ada di salinan SAYA saja. Kalau salinan itu disatukan nanti, dua perbaikan
   ini yang harus menang.
4. **Dua ketidakcocokan rancangan yang saya putuskan sendiri**, mohon
   diperiksa: pangkat `-1` saya masukkan ke daftar pilihan widget 02 (tanpa itu
   kalimat petunjuk rancangan mustahil diikuti), dan `cek_soal.py` saya ganti
   `cek_integral.py` untuk berkas soal (alat lama hanya paham klaim limit).

## Video 05 "Luas dari persegi panjang, jumlahan Riemann": SELESAI 480p

`media/uji-480p/integral05-riemann.mp4`, 118,1 detik, 2,06 MB. Ada juga
`integral05-riemann-bersubtitle.mp4` yang subtitlenya dibakar, untuk ditonton
ARYA. Keduanya TIDAK dilacak git (mp4 di luar `web/public/anim/` diabaikan),
jadi ambil langsung dari worktree ini.

**DELAPAN kali render.** Render 7 dan 8 lahir dari empat permintaan MASTER
setelah 9cb9c09 digabung; berkas mp4-nya BERUBAH sejak itu, jadi salinan yang
sudah dipasang di master perlu diambil ulang dari sini.

Yang lolos gerbang otomatis pada render kelima tetapi baru ketahuan dari
MEMBUKA gambarnya:

1. **Segitiga pucat raksasa tertinggal dua babak terakhir.** `daerah_lurus`
   (daerah di bawah f(x) = x) dihitung dari bidang lama dan tidak ikut dibuang
   saat kamera terbang ke bidang kecil. Sejak detik 92 sampai video habis ia
   menutupi separuh kanan layar, berdiri di belakang panel "kiri 6,25 kanan
   4,25", dan membantah gambarnya sendiri. `qc.periksa_adegan` diam karena ia
   hanya memeriksa benda yang DISERAHKAN kepadanya. Sekarang ada
   `pastikan_hilang()` di adegannya: render GAGAL kalau benda babak lama masih
   terpasang. Sudah dibuktikan dua arah (menolak saat tersisa, diam saat bersih).
2. **Tujuh `Indicate` menyuruh benda berubah ke warna yang sudah dipakainya.**
   `Indicate(segitiga, color=SOROT)` pada segitiga yang memang SOROT hanya
   menyisakan perbesaran dua persen: tidak satu piksel pun berganti warna.
   Itulah sebab empat rentang "beku" di alat ukur diam, bukan kelemahan alatnya.
   Semua sudah diberi warna lawan dan `scale_factor` 1,05.
3. **Denyut pengganti pada tanda partisi juga tidak terbaca.** Diganti gerak
   yang sekalian mengajar: ruas pengukur Δx BERJALAN dari bagian ke bagian,
   sehingga "sama lebar" terlihat, bukan cuma didengar.
4. **1,8 detik diam menunggu kalimat di babak `tinggi`.** Diisi garis putus
   putus dari titik sampel ke sumbu tegak, tepat saat narator mengucapkan
   "setinggi nilai fungsi".

### Alat baru: `alat/cek_waktu_adegan.py`
Menghitung waktu tiap babak dari teks kodenya, tanpa menjalankan ManimGL.
Sebabnya render 480p makan 3 sampai 5 menit dan gerbang waktu `sinema.babak`
berhenti di babak PERTAMA yang kelebihan, jadi kesalahan di babak berikutnya
baru ketahuan satu render kemudian. Render kelima mati di `tinggi` padahal
`contoh` dan `hitung7` sama-sama baru diubah.

Alat ini juga menangkap JANGKAR HILANG: `sinema.mulai(jam, "awalan")` memberi
None diam-diam kalau tidak ada subtitle yang diawali teks itu, dan enam jangkar
video ini pernah patah begitu selama empat render tanpa satu pun peringatan.

Dibuktikan dua arah pada adegan sungguhan: lolos saat benar, menandai `tinggi`
saat kelebihan (angka 8,76 detik lawan 8,67 detik yang dilaporkan render, jadi
tebakannya sedikit di sisi aman), dan melaporkan jangkar hilang saat dirusak.
Batasnya ditulis di dalam berkasnya: ini pembaca teks, bukan penerjemah Python,
dan bukan pengganti render.

### Empat rentang yang masih ditandai "diam", sudah dinilai satu per satu
Alat ukur diam memakai perubahan piksel se-layar, sedangkan video ini banyak
memakai kejadian kecil dan setempat. Frame-nya sudah dibuka:

| Rentang | Narasi yang berjalan | Vonis |
|---|---|---|
| 46,2 sampai 56,8 d | "Titik sampel kanan. Tinggi 1, 2, 3, ..., 7." | BUKAN cacat. Frame 49 d dua kotak, 55 d enam kotak: kotaknya memang muncul satu per satu, satu tiap detik, seirama hitungan narator. |
| 28,8 sampai 34,4 d | "...setinggi nilai fungsi, diambil di satu titik sampel." | BUKAN cacat. Frame 33 d berisi batang tegak, titik sampel di kurva, dan garis putus putus ke sumbu; semuanya garis tipis, jadi luput dari alat ukur. |
| 62,6 sampai 67,1 d | "Daerah aslinya segitiga siku-siku..." | BUKAN cacat. Segitiga digambar, lalu alas dan tinggi ditandai berikut labelnya. |
| 69,9 sampai 74,4 d | "Titik sampel kiri memberi 21." | BUKAN cacat. Frame 72 d kotak di ATAS garis, frame 74 d kotak di BAWAH garis: tangganya benar-benar berganti, hanya warnanya sama-sama pucat. |

### Empat permintaan MASTER, semuanya dikerjakan
1. **Medan `video:` dipasang** di Materi 05 `content/integral/tahap.ts`.
   `npx tsc --noEmit` bersih.
2. **Tiga mp3 basi DIBUANG.** MASTER benar bahwa izin ARYA hanya untuk berkas
   yang tidak bisa dibuat ulang, dan saya periksa sendiri bahwa ketiganya
   DILACAK GIT, jadi menghapusnya bisa dibatalkan lewat riwayat.
   `cek_aset_video.py integral` sekarang SEMUA LOLOS.
3. **`pastikan_hilang` naik ke `manim/gl/qc.py`** sebagai commit tersendiri
   (e413896) yang hanya menyentuh `qc.py` dan `uji_qc.py`, dengan lima uji dua
   arah. Yang membedakannya dari `mob in scene.mobjects` polos: ia juga
   menemukan benda yang terpasang sebagai ANAK VGroup, dan itu diuji.
   `periksa_adegan` tidak disentuh. Seluruh `uji_qc.py` lolos.
4. **Detik 92 sampai 95 diperbaiki**, tetapi TIDAK dengan cara yang MASTER
   sebut. "Pindahkan `ganti_rumus` ke `b.main` yang sama" tidak bisa dilakukan:
   `sinema.ganti_rumus` memanggil `scene.play` sendiri, jadi ia tidak
   mengembalikan animasi yang bisa dititipkan. Membuatnya bisa berarti mengubah
   `sinema.py` yang dipakai semua sesi, dan itu di luar izin commit ini.
   Yang saya lakukan: memisahkan perpindahan bidang dari perubahan kurva.
   Sekarang detik 92,8 sampai 95,2 bidang dan kamera pindah sementara kurva
   MASIH lurus dan panel MASIH menulis f(x) = x, jadi keduanya cocok; detik
   95,2 sampai 96,2 kurvanya melengkung; detik 96,2 panelnya menyusul.
   Selisihnya turun dari 3,0 detik keadaan diam yang salah jadi 1,0 detik
   gerakan yang jelas sedang berlangsung, dan yang memimpin GAMBAR, bukan
   panel. Frame 94, 96, dan 98 sudah dibuka untuk membuktikannya.
   Kalau MASTER tetap mau nol detik, itu perlu tambahan pada `sinema.py`
   (mis. `ganti_rumus(..., animasi_saja=True)` yang mengembalikan animasinya);
   saya tidak mengerjakannya sendiri karena berkas itu milik bersama.

### Dua kesalahan alat saya sendiri yang ketahuan di render 7
- **`cek_waktu_adegan.py` melewatkan pembantu setempat.** Babak `turun`
  terbaca 12,50 detik padahal render melaporkan 13,40 dan GAGAL. Selisih 0,90
  itu persis `bersihkan_panel`, fungsi pembantu di berkas adegan yang memanggil
  `b.catat(run_time)`. Alatnya sekarang membaca tanda tangan pembantu semacam
  itu, dan MEMBUNYIKAN peringatan untuk panggilan ber-`b=b` yang tidak
  dikenalnya, supaya waktunya tidak hilang diam-diam lagi. Setelah diperbaiki
  angkanya 13,40, sama persis dengan yang dilaporkan render.
- **Berkas kode-keluar yang saya pakai memantau render selalu menulis 0.**
  `A && B & echo %ERRORLEVEL%` membuat `echo` jalan tanpa syarat DAN
  `%ERRORLEVEL%`-nya diurai sebelum perintahnya jalan. Render 7 yang GAGAL
  terbaca "kode=0"; yang menyelamatkan cuma kebiasaan membaca stderr.
  Sudah diganti `(A && B) & call echo %^ERRORLEVEL%` dan dibuktikan melaporkan
  3 untuk kegagalan yang disengaja dan 0 untuk keberhasilan.

### Yang masih kurang, dan saya sebutkan bukan diamkan
- `alat/cek_sinkron_video.py` TIDAK dipakai untuk video ini. Alat itu butuh pola
  kalimat yang tiap kemunculannya menambah satu benda; naskah video 05 menyebut
  "Tinggi 1, 2, 3, ..., 7" dalam satu kalimat, jadi tidak ada pola per benda.
  Sinkronnya diperiksa dengan membandingkan jam subtitle dan jam kemunculan
  kotak secara manual: kotak pertama mendarat 47,5 d, narator mulai menghitung
  51,4 d, dan selama jeda itu subtitle berbunyi "Titik sampel kanan" sambil dua
  kotak contoh berdiri. Tidak ada gambar yang mendahului jawabannya.

### Berkas pendamping
Subtitle `.vtt`, poster (dibuat ulang dari render kedelapan, detik 55,
rentang 224, bukan latar 10,88 persen), dan medan `video:` di `tahap.ts`
semuanya sudah ada. Tiga potongan suara basi sudah dibuang.
`alat/cek_aset_video.py integral` SEMUA LOLOS.

## Video 01 "Dari laju ke jumlah, membalik turunan": SELESAI 480p

`media/uji-480p/integral01-laju-ke-jumlah.mp4`, 146,2 detik, 2,65 MB, plus
versi bersubtitle untuk ditonton ARYA. Medan `video:` sudah dipasang di Materi
01, poster dari detik 62, `cek_aset_video.py integral` SEMUA LOLOS (dua video),
`tsc --noEmit` 0, `cek_urutan_integral.py` SEMUA LOLOS.

Ini satu-satunya video Integral yang boleh dibuka 3D (butir 2 STANDAR: nomor
tahap TERKECIL, yaitu yang pertama ditonton siswa). Bagian 3D-nya 4,4 detik,
lalu satu gerakan kamera turun dan tidak pernah miring lagi.

**SEPULUH kali render.** Yang ditemukan dan diperbaiki:

1. **Jangkar subtitle diperiksa SEBELUM render pertama**, bukan sesudah empat
   render seperti video 05. Empat dari sembilan jangkar yang saya rencanakan
   tidak akan pernah ketemu (dua jatuh persis di awal babaknya sehingga tidak
   pernah menunggu, satu tidak ada kalimatnya, satu diawali lambang setengah).
   Alat `cek_waktu_adegan.py` yang lahir dari video 05 yang menangkapnya.
2. **Gerbang label menolak "juta per bulan": 3 kata, batasnya 2.** Benar, dan
   sekaligus menunjukkan saya salah alat: angka dan rumus di dunia WAJIB lewat
   `rumus()`, bukan `sinema.label()`. Enam label diperbaiki.
3. **Jebakan backslash heredoc, DUA KALI.** Perintah LaTeX `\tfrac` yang
   ditulis lewat heredoc alat Bash sampai ke berkas sebagai TAB + "frac",
   sebab heredoc menelan satu tingkat backslash. `cek_kode.py` menangkapnya di
   adegan ("mengandung karakter kendali, hampir pasti string lupa awalan r").
   Lalu KALIMAT LAPORAN INI SENDIRI terkena hal yang sama saat ditulis, dan
   yang menangkapnya cuma membaca ulang berkasnya. Sudah tercatat di memori
   proyek sejak sesi ini juga, dan saya tetap melanggarnya dua kali.
   Aturannya: apa pun yang memuat backslash ditulis lewat Edit atau Write,
   tidak pernah lewat shell.
4. **Dua detik layar benar-benar kosong** di antara pembuka 3D dan sumbu
   pertama, ditangkap `cek_layar_kosong.py`. Sumbunya sekarang datang di dalam
   gerakan kamera yang sama, bukan di babak berikutnya.
5. **Gambar cuma mengisi 58 persen lebar layar.** `muat_datar` memuat sisi
   yang paling menuntut, dan untuk grafik itu selalu TINGGI. Sumbu x dilebarkan
   (9,2) sehingga sekarang mengisi sekitar 70 persen. Tidak mengubah
   matematikanya: mendatar bulan, tegak juta per bulan, dua besaran berbeda.
6. **Dua kali qc menolak "papan menindih sumbu"** sesudah pelebaran itu, dan
   yang kedua baru muncul di babak TERAKHIR ketika panel paling penuh. Jalur
   kanan dipesan 1,8; sumbu keluarga kurva dikembalikan ke lebar semula.
7. **Pembuka 3D gagal dua kali dan keduanya kelihatan di lembar kontak.**
   Empat belas keping rapat jadi satu tabung ungu polos; diberi celah,
   `Cylinder` ManimGL ternyata TANPA TUTUP sehingga terbaca sebagai per spiral
   berongga. Diganti sembilan lempeng `balok` pejal: terbaca sebagai lembaran
   uang yang menumpuk.
8. **Identitas pojok kiri atas tertinggal.** Selama lima babak ia masih
   berbunyi "laju: juta rupiah per bulan" padahal gambarnya sudah keluarga
   kurva T. Sekarang ikut berganti, dan kembali saat kamera kembali.
9. **Identitas penggantinya tidak pernah muncul** pada percobaan pertama:
   `set_opacity(0)` lalu `FadeIn` membuat `FadeIn` membaca nol sebagai
   SASARAN, jadi ia memudar dari nol ke nol. Lebih buruk, qc tetap "memeriksa"
   benda tak kasatmata itu tanpa mengeluh. Diganti `self.remove(...)`.
10. **Rumus trapesium duduk persis di atas garis lajunya**, dan kurva keluarga
    menjulur keluar sumbu (T(2,6) = 9,36 padahal sumbunya berhenti di 8,5).
    Keduanya hanya terlihat dari membuka frame.

### Empat rentang "diam", sudah dinilai satu per satu
Sama seperti video 05, alat ukurnya memakai perubahan piksel se-layar dan
video ini banyak memakai garis tipis. Frame-nya dibuka:

| Rentang | Narasi | Vonis |
|---|---|---|
| 23,4 sampai 44,5 d | "Bacanya begini... laju pada satu saat" lalu "satu bulan: laju kali lama" | BUKAN cacat. Garis putus putus naik lalu mendatar untuk x = 1, lalu untuk x = 2, dua titik, dua angka, lalu satu persegi panjang berikut ruas tinggi dan lebarnya. Semuanya garis tipis. |
| 51,6 sampai 62,1 d | "Dijumlahkan: sudah dekat... trapesium menutup tanpa sisa" | BUKAN cacat. Dua belas kotak berganti jadi trapesium, lalu dua sisi sejajarnya ditandai. Warnanya sama-sama biru muda, jadi selisih pikselnya kecil walau gambarnya berganti. |
| 12,4 sampai 21,0 d | "Kalau digambar... lajunya 2x + 1" | BUKAN cacat. Sumbu datang bersama kamera, lalu garis lajunya digambar 5 detik. Garis setebal 4 piksel di layar selebar 854 memang di bawah ambang alatnya. |
| 77,5 sampai 84,5 d | "Cari T dengan T' = 2x + 1. Coba x² + x" | BUKAN cacat. Parabola digambar 3,2 detik, lalu baris panel dan denyutnya. |

### Yang saya sebutkan, bukan diamkan
- `bersihkan_panel` sekarang ada di DUA adegan Integral dengan isi sama persis.
  Kalau video berikutnya juga membutuhkannya, tempatnya `gl/sinema.py`. Saya
  tidak memindahkannya sendiri: itu berkas milik semua sesi.
- Babak bernama `plusC` memakai huruf besar, satu-satunya di proyek. Saya
  sengaja tidak menamainya ulang: mengganti id segmen berarti menjalankan
  ulang TTS, dan durasi edge-tts bisa bergeser sehingga seluruh penyetelan
  waktu tiga belas babak harus diulang. `cek_waktu_adegan.py` sekarang
  menerima nama apa pun DAN mencocokkan susunan babak dengan durasi.json.
- Usulan untuk MASTER (bukan permintaan): `sinema.ganti_rumus(...,
  animasi_saja=True)` yang mengembalikan animasinya, supaya pergantian rumus
  bisa dititipkan ke `b.main` yang sama dengan gerakan gambarnya. Tanpa itu,
  panel selalu tertinggal atau mendahului gambar sekitar satu detik.

## Butuh keputusan ARYA
- Tiga video sisanya (07, 09, 03) belum dikerjakan. Urutannya dari MASTER.

## Titik rawan matematis yang sudah ditandai
MASTER menemukan 4 kalimat matematis keliru dari 12 materi Turunan. Untuk
Integral, tiga klaim ini TIDAK ditulis sebagai kalimat mutlak:
1. "Integral kebalikan turunan" hanya benar sampai konstanta.
2. "Integral tentu sama dengan luas" salah kalau kurva ada di bawah sumbu.
3. "Substitusi selalu bisa" tidak benar.
Pemeriksaan silang MASTER menambah empat lagi, semuanya sudah dikerjakan:
laju dibaca sebagai tambahan sebulan penuh, "kiri dan kanan selalu mengapit",
"luas selalu bertambah", dan "titik potong selalu tempat kurva pindah sisi".
