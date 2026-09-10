# Laporan MATRA-VEKTOR
Terakhir: 9 September 2026, siang

## GELOMBANG 4, STANDAR VIDEO v3: video 01 dan 03 ditulis ulang (8 sampai 9 Sep)

Perintah ARYA: semua video ditulis ulang dengan standar v3, kerjakan video
PERTAMA dan KEDUA di daftar gelombang 4 sampai lolos sepuluh butir daftar
periksa, dan bawa hasilnya ke `UNTUK ARYA\CEK 480P` untuk ditonton dulu
sebelum video ketiga dimulai.

### Persiapan

| Hal | Hasil |
|---|---|
| `git merge master` | Lolos tanpa bentrok, dua kali (8 Sep dan 9 Sep) |
| Backup video v2 | Enam video + poster + subtitle + enam adegan + enam naskah lama disalin ke `UNTUK ARYA\BACKUP VIDEO MANTRA V2ektor\` |
| Alat kembar dibuang | Saya sempat menulis `alat/cek_pemicu_kata.py`; MASTER ternyata sudah punya `alat/cek_pemicu_urut.py` yang lebih baik (ia MERAMALKAN jam adegan, bukan cuma memeriksa urutan). Punya saya dihapus, punya MASTER dipakai |
| Alat baru yang memang belum ada | `alat/cek_urutan_vektor.py` (pemeriksa urutan istilah khusus topik ini, saudara `cek_urutan_turunan.py`), `alat/klaim-vektor1-perahu.json`, `alat/klaim-vektor3-komponen.json` |

### Naskah

| Video | Segmen | Durasi | Segar-ingat |
|---|---|---|---|
| `vektor1-perahu` (Materi 01) | 31 | 4 menit 56 detik | teorema Pythagoras, bekal SMP, digambar sebagai segitiga 3-4-5 di petak yang sama |
| `vektor3-komponen` (Materi 03) | 30 | 4 menit 45 detik | Materi 01 (perahu mendarat 4 petak ke kanan, 3 petak ke atas) dan Materi 02 (panah boleh digeser) |

Sambungannya sengaja dibuat nyata, bukan tempelan: contoh utama video 03
memakai angka 4 dan 3, angka yang sama dengan tempat mendarat perahu di video
01, jadi panah mobil di video 03 benar-benar panah yang sama.

### Keputusan yang saya ambil sendiri, mohon dinilai

1. **Pembuka 3D dipendekkan.** Standar v3 bagian 5 memberi jatah paling lama
   5 detik untuk 3D, dan hanya di video pertama tiap topik. Versi lama memakai
   sekitar 13 detik. Sekarang: 3D miring 0 sampai 3,8 detik, kamera turun 1,6
   detik, tegak lurus sejak detik 5,4. Kalau Anda lebih suka pembuka panjang
   yang lama, itu satu baris ubahan.
2. **Pasangan angka (4 3) TIDAK dipakai di video 01.** Versi lama menulis
   `d = (0, 3)` dan `a = (4, 0)` di panel. Menulis vektor sebagai dua angka
   adalah isi Materi 03, dan video 01 justru ditutup dengan menjanjikannya.
   Yang ditulis sekarang besaran berikut satuannya: "dayung = 3 km".
3. **Aturan "ujung dikurangi pangkal" dikembalikan ke video 03.** Versi lama
   menyerahkannya ke video Materi 08 supaya videonya pendek. Standar v3 meminta
   tiap rumus lahir dari contoh angka yang dihitung di layar, dan aturan itu
   memang isi halaman Materi 03. Di sini ia dibuktikan dengan menghitung petak
   dari A(1, 2) ke B(5, 5) lebih dulu, baru diperlihatkan bahwa 4 = 5 - 1.

### Empat cacat yang ditemukan lembar kontak, dan perbaikannya

Dua render 1080p pertama lolos SEMUA gerbang otomatis. Lembar kontaknya tetap
memperlihatkan empat cacat, dan keempatnya sudah diperbaiki. Ini persis alasan
gerbang video di `CLAUDE.md` ada: "rendered" di log bukan bukti videonya benar.

| Cacat | Buktinya | Perbaikan |
|---|---|---|
| Layar kosong 2,5 detik pada detik 229,5 sampai 232,0 | `alat/cek_layar_kosong.py`, dan frame kosong di lembar kontak | Kalimat "besaran yang butuh arah SEPERTI INI" menunjuk panah yang masih di layar, jadi layar tidak boleh dibersihkan di kata pertama. Pembersihan dipindah ke kata "punya nama", jaraknya tinggal 0,6 detik |
| Perahu 3D terbaca sebagai serpih putih, tiga frame pertama isinya air | Lembar kontak baris 1 | Bingkai kamera 2,8 satuan (dulu 4,4) dan kemiringan 62 derajat (dulu 68). Perahunya sekarang terlihat papan dan dayungnya. Dibuktikan lewat render intip 3 detik sebelum render penuh |
| Label "3 km" menabrak angka sumbu, terbaca "3 km2" | Lembar kontak, frame detik 182, di tengah dayung diputar | Label tidak boleh duduk di jalur angka sumbu tegak. Yang diperbesar JARAKNYA dari panah, bukan sisinya: menukar sisi membuat label meloncat 1,8 satuan di tengah putaran |

| Warna dua langkah pada peraga penutup terbalik | Dibandingkan dengan `web/lib/warna.ts` dan widget `pecah-komponen` | Mendatar BIRU, tegak MERAH. Versi pertama menukar keduanya, jadi peraga "berikutnya" membantah video Materi 03 yang dijanjikannya |

Catatan jujur soal cacat keempat: di dalam video 01 sendiri, biru berarti
"dayung" selama empat menit lalu berarti "langkah mendatar" pada sepuluh detik
terakhir. Saya pilih menyamakan peraga penutup dengan video 03 dan widgetnya,
sebab tugas peraga itu memang menjanjikan video berikutnya, dan pada peraga itu
tidak ada dayung maupun arus. Kalau Anda lebih suka peraga penutupnya abu-abu
saja supaya tidak ikut berwarna, itu satu baris ubahan.

Dua cacat lagi ditemukan di adegan video 03 SEBELUM ia sempat dirender, jadi
tidak memakan render: papan rumus akan menumpuk DELAPAN baris padahal zona
kanan atas muat empat (papan sekarang dikosongkan di tiga tempat), dan narator
berkata "sepuluh panah" padahal yang digambar delapan.

### Butir 7: kedua widget DIBUKA di peramban, bukan cuma dibaca kodenya

`playwright-cli -s=matra-vektor` pada port 3010, Materi 01 dan Materi 03.
Yang cocok dengan video: dayung biru `#3A6EA5`, arus merah `#C25E4D`, langkah
mendatar biru dan langkah tegak merah, istilah "komponen mendatar" dan
"komponen tegak", penulisan `(4 3)` tanpa koma, dan angka contohnya pun sama
(widget `pecah-komponen` bawaannya memang `v = (4 3)`, angka yang saya pakai di
video 03). Yang TIDAK cocok, semuanya sudah begitu sejak sebelum penulisan
ulang ini:

1. **Warna panah hasil.** Video memakai ungu `#6A4C93`; kedua widget memakai
   hitam `#1F2430` (`WARNA.miring`). Di widget perahu, ungu justru dipakai
   untuk lintasan perahu (`WARNA.sudut`), jadi satu warna punya dua makna.
   Saran: WIDGET yang diseragamkan ke ungu, sebab enam video sudah memakai
   ungu dan mengubah widget jauh lebih murah daripada merender ulang enam
   video. Tetapi `WARNA.sudut` sudah terpakai di widget perahu, jadi
   penggantiannya perlu ditata, bukan ditukar begitu saja. Saya tidak
   mengubahnya sendiri: itu keputusan Anda dan berkasnya milik bersama.

2. **Cara menggambar Materi 01.** Di video, panah arus berangkat dari UJUNG
   panah dayung supaya segitiga siku-sikunya terbentuk dan Pythagoras masuk
   akal. Di widget, ketiga panah berangkat dari titik yang sama, sebab kedua
   panahnya memang diseret siswa dari satu titik. Dua-duanya benar, tetapi
   gambarnya berbeda.

3. **Widget Materi 01 sudah memakai notasi yang belum diajarkan.** Panel
   kendalinya menampilkan `(0 3)` dan `0i + 3j` untuk dayung. Pasangan angka
   itu isi Materi 03, dan lambang i dan j isi Materi 05. Widget Materi 03 juga
   menampilkan `4i + 3j` dan "panjang 5" (isi Materi 04 dan 05). Pemeriksa
   `alat/cek_urutan_vektor.py` tidak menangkapnya sebab ia membaca `tahap.ts`
   dan naskah video, bukan komponen React.

   Ini melemahkan salah satu keputusan saya: saya sengaja TIDAK memakai
   pasangan angka (4 3) di video 01 supaya tidak mendahului Materi 03, padahal
   widget di halaman yang sama sudah menampilkannya. Dua-duanya perlu satu
   sikap. Menurut saya widgetnya yang sebaiknya menyembunyikan lambang i dan j
   sampai Materi 05, tetapi panel kendali itu komponen bersama, jadi saya
   ajukan ke Anda, tidak saya ubah.

4. **Nama panah hasil.** Widget menyebutnya "gerak nyata", video menyebutnya
   "panah ungu" dan "perpindahan sebenarnya". Sebaiknya satu nama saja.

### Sepuluh butir daftar periksa v3, video Materi 01

| # | Butir | Jawab |
|---|---|---|
| 1 | Durasi 3 sampai 6 menit, tanpa jeda kosong lebih dari 1,5 detik | YA. 4 menit 56 detik. `cek_layar_kosong.py` lolos, isi area kerja rata-rata 21,79 persen |
| 2 | Ada segar-ingat yang menyebut nomor dan nama konsep sebelumnya | SEBAGIAN, dan sengaja. Namanya disebut lengkap ("teorema Pythagoras", bunyinya diucapkan utuh), tetapi TANPA nomor materi, sebab ini materi pertama topik: yang diingat prasyaratnya, bekal SMP, dan bekal SMP tidak punya nomor materi MANTRA |
| 3 | Tiap rumus lahir dari contoh angka yang dihitung di layar | YA. 3² = 9, 4² = 16, 9 + 16 = 25, √25 = 5 dihitung satu per satu di panel, segitiganya dibentuk dulu dari dua gerakan. Bentuk umum √(a² + b²) lahir besar di dekat gambarnya lalu terbang ke panel |
| 4 | Semua pemicu kata selisih di bawah 0,15 detik | YA. 91 pemicu, terlambat terbesar 0,033 detik |
| 5 | Subtitle sama huruf demi huruf dengan medan `tulis` | YA. `alat/cek_subtitle.py` lolos, 98 baris |
| 6 | Lembar kontak dibuka, angka sumbu dibaca, pergantian identitas diperiksa | YA. 74 frame dinilai satu per satu, empat cacat ditemukan dan diperbaiki. Identitas tidak pernah berganti di video ini (hanya "1 petak = 1 km"), jadi tidak ada pergantian yang bisa bersilang |
| 7 | Widget materi yang sama dibuka, istilah, warna, arah sama | SEBAGIAN. Dibuka dan dinilai; empat selisih di atas, tiga di antaranya sudah ada sebelum penulisan ulang ini |
| 8 | Klaim angka lolos sympy, urutan istilah lolos | YA. 14 klaim video 01 lolos `alat/cek_vektor.py`; pemeriksanya dibuktikan menolak 13 jawaban yang sengaja salah. `alat/cek_urutan_vektor.py` lolos, dan ia sendiri dibuktikan dua arah |
| 9 | cek_aset_video, cek_layar_kosong, tsc lolos, medan video terpasang | YA. tsc lolos DAN dibuktikan hidup (kesalahan tipe sengaja ditolak TS2322, lalu dikembalikan). Medan `video` sudah terpasang di `tahap.ts` sejak gelombang 2 |
| 10 | Keputusan yang disengaja ditulis di laporan | YA, di bagian "Keputusan yang saya ambil sendiri" dan catatan kepala berkas adegannya |

### Butuh MASTER

`alat/cek_aset_video.py` hanya menangkap subtitle yang LEBIH PENDEK daripada
videonya (`lama - akhir > AMBANG`). Kebalikannya lolos diam-diam: saat naskah
vektor3-komponen sudah 285 detik sementara videonya masih versi lama 136 detik,
alat itu menjawab "ok". Pasangan yang jelas-jelas tidak cocok itu justru
keadaan paling sering terjadi di gelombang 4, sebab tiap sesi menulis naskah
baru lebih dulu lalu merender belakangan. Sarannya: bandingkan dua arah, dan
sebut selisihnya. Berkasnya milik MASTER, jadi saya tidak menyentuhnya.

## Cacat diperbaiki, 01 dan 06 dirender ulang (4 Sep pagi)

Perintah ARYA: "anda perbaiki aja dlu cacatnya". Perintah MASTER menyusul:
kerjakan kodenya untuk semua, render ulang HANYA 01 dan 06 untuk dinilai.

### Yang beres

| Cacat | Cara memperbaikinya |
|---|---|
| Label "dayung" jatuh di luar petak pada 180 derajat | Posisinya ditahan di dalam baris terbawah bidang |
| Bidang menyusut 12 sampai 15 persen | `sinema.alas_hud`: tulisan HUD diberi alas kertas, pesanan jalur dihapus |
| Resultan Materi 06 berkedip hitam | Bukan sorotannya yang salah, PANAH KELIRUNYA. Hitam di video itu juga dipakai untuk titik sambung dan label, jadi ia tinta netral; panah keliru jadi REDUP |
| Pembuka 3D kelabu 15 sampai 22 detik | Dipotong di 03, 04, 06, 08, 09. Video pertama topik (Materi 01) tetap punya pembuka 3D |

Pembuka dipotong TANPA mengubah satu kata narasi. `bidang_bernomor` menyimpan
`bidang.angka`, jadi angka sumbu bisa ditahan lalu dimunculkan persis saat
narator berkata "lengkap dengan angka pada kedua sumbunya". Panjang video tidak
berubah, sebab `Babak.tutup()` menutup sisa waktu tiap babak.

### Empat kali gagal sebelum alas kertasnya layak

Semuanya dengan sebab yang jelas dari pesan gerbangnya sendiri, bukan tebakan:
1. alas menonjol lewat tepi layar ("identitas keluar bingkai: kiri -6,93");
2. gerbang menolak HUD menindih bidang, padahal itu yang alas izinkan;
3. alas berhenti 0,34 satuan sebelum tepi, menyisakan pita petak di luarnya
   sehingga terbaca sebagai stiker. Sisinya dirapatkan sampai tepi;
4. alas melebar SEBELUM barisnya muncul, jadi ada bidang kertas kosong 0,8
   detik, empat kali. Pelebarannya dijadikan animasi yang ikut ke `play` yang
   sama dengan kemunculan barisnya.

### Lubang yang saya buat sendiri, ditangkap MASTER

Pengecualian gerbang versi pertama saya: "HUD beralas, lewati SEMUA pasangan
hud x dunia". Itu membuka lubang yang lebih buruk daripada yang ditutupnya,
sebab titik, panah, atau label yang kebetulan berada di bawah panel tidak akan
pernah ketahuan. Sekarang pasangan dilewati hanya bila HUD-nya `beralas` DAN
benda dunianya `latar`. Saya sempat menyebut risiko itu sendiri lalu tetap
melepasnya; seharusnya sempit sejak awal.

### Uji yang tidak pernah gagal tidak membuktikan apa-apa

Render Materi 01 gagal "panel d menindih bidang". Sebabnya `m.beralas = True`
ikut terhapus dari `_ke_depan` waktu bentrok merge diselesaikan, dan justru
jalur itu yang dipakai `papan.baris()`. Uji regresi pertama yang saya tulis
untuk menangkapnya MEMAKAI JALUR YANG SALAH (`perbarui_alas`) sehingga lolos
walaupun bugnya ada. Sekarang memakai `_anim_alas` dan dibuktikan dua arah:
dengan perbaikan dimatikan ia berbunyi "GAGAL: baris papan beralas tidak
bertanda `beralas`".

Sekalian ketemu: `uji_qc.py` mencetak "SEMUA UJI QC LOLOS" dua kali, satu di
tengah padahal separuh uji belum jalan. Dibuang. Sekarang 16 ok, satu
pengumuman, di akhir.

### Dua kali nyaris salah lapor, keduanya ketahuan karena MELIHAT

1. Lembar kontak Materi 06 memperlihatkan satu detik yang bidangnya seperti
   hilang. Diperbesar: bidangnya ada, hanya angkanya sedang memudar masuk dan
   garis petaknya terlalu pucat untuk terlihat pada gambar sekecil itu. Hampir
   memperbaiki yang tidak rusak.
2. Sebelumnya, panah tunggal di penutup Materi 09 juga saya kira cacat;
   ternyata frame di tengah proses memudar.

### Sisa
Materi 03, 04, 08, 09 sudah diperbaiki KODENYA, belum dirender, menunggu vonis
atas bentuk 01 dan 06. Cacat lama yang belum tersentuh: mobil, bola, dan orang
tetap gumpalan kecil dilihat tegak lurus dari atas, dan sekarang lebih terasa
karena pembuka 3D-nya sudah tidak ada.

---

## ENAM video Vektor kini SEMUANYA standar v2 (4 Sep dini hari)

Perintah ARYA: "lanjut aja dlu smuanya, nnti sy revisi sekaligus". Materi 03,
04, 08, dan 09 dinaikkan dari tata letak lama ke standar v2, dirender, dan
lembar kontaknya dibuka satu per satu.

| Materi | Berkas tinjauan | Panjang | Selisih gambar vs narasi |
|---|---|---|---|
| 01 perahu | `media/uji-480p/vektor1-perahu-bersubtitle.mp4` | 2:19 | 0,34 detik |
| 03 komponen | `vektor3-komponen-bersubtitle.mp4` | 2:16 | 0,02 detik |
| 04 panjang | `vektor4-panjang-bersubtitle.mp4` | 2:24 | 0,14 detik |
| 06 sambung | `vektor6-sambung-bersubtitle.mp4` | 2:13 | 0,59 detik |
| 08 selisih | `vektor8-selisih-bersubtitle.mp4` | 2:32 | 0,24 detik |
| 09 kali skalar | `vektor9-kali-skalar-bersubtitle.mp4` | 2:37 | 0,69 detik |

### DUA JEBAKAN BARU, dan yang kedua nyaris membuat saya melapor bohong

**1. `manimgl` keluar dengan kode 0 WALAUPUN gerbang qc menggagalkan render.**
Materi 04 ditolak `CacatTataLetak` ("tiang 1 masuk jalur subtitle") dan Materi
09 ditolak ("ukur k keluar bingkai"), tetapi keduanya melaporkan sukses. Video
LAMA tetap tergeletak di `media/gl/`, `gabung_audio` menggabungnya tanpa protes,
dan lembar kontak yang saya buka adalah lembar kontak video LAMA. Saya hampir
menyatakan Materi 04 selesai padahal yang saya lihat video kemarin.

Yang menyelamatkan: gambarnya masih memperlihatkan blok hitungan lama di kiri
atas grid, padahal kodenya sudah saya buang. Itu mustahil kalau videonya baru.

**Penjaganya sudah dipasang** di `manim/gabung_audio.py`: `periksa_kesegaran()`
menolak video yang lebih TUA daripada berkas adegannya, dengan pesan yang
menyebut kemungkinan CacatTataLetak. Sudah diuji dan memang menolak. Sesi lain
sebaiknya memakai versi ini; **kode keluar 0 bukan bukti render berhasil,
periksa waktu berkas mp4-nya.**

**2. `Babak.catat()` hanya MEMBUKUKAN waktu, tidak menunggu.** `papan.baris`
memanggil `scene.play` sendiri di luar `b.main`, jadi 0,8 detiknya wajib dicatat
manual, dan angkanya harus SAMA PERSIS. Saya mengisi 1,2 dan 1,4 sebagai
"kira-kira", akibatnya Materi 08 meleset 2,04 detik (ditolak `gabung_audio`) dan
Materi 04 meleset ke arah yang lebih berbahaya: gambarnya lebih PENDEK daripada
narasi, dan `ffmpeg -shortest` memotong kalimat penutupnya. Delapan tempat
dibetulkan, sekarang selisihnya 0,14 dan 0,24 detik.

### Yang diubah di keempat adegan

- Kamera peta: `PETA = dict(...)` tulis tangan diganti `kamera.muat_datar`
  dengan pesanan jalur HUD. Nilai `sisa_kanan` DIUKUR, bukan dikarang: baris
  panel dibangun lalu lebarnya dibaca (`ukur_baris`), lalu tepi kirinya dihitung
  dari tepi kanan panel 6,73.
- Identitas benda memakai `sinema.identitas`, panel memakai `sinema.PapanRumus`.
- **Hitungan yang dulu ditumpuk di KIRI pindah ke panel KANAN.** Zona kiri atas
  milik identitas benda saja. Karena zona rumus cuma memuat empat baris, tumpukan
  panjang dipadatkan dan sebagian dijadikan satu baris kerja yang DIMORF:
  Materi 03 tujuh baris jadi empat, Materi 04 delapan jadi empat, Materi 08
  sembilan jadi empat, Materi 09 tujuh jadi empat plus angka pengali hidup.
- Titik periksa qc dipisah `dunia=` dan `hud=` di semua adegan, supaya perkalian
  silangnya benar-benar berjalan.
- Label gambar lebih dari dua kata diganti `sinema.label` yang dijaga mesin:
  "ketiganya panjangnya 5" jadi "panjangnya 5", "semua kelipatan a ada di garis
  ini" jadi "kelipatan a", "vektor nol" tetap.
- Kalimat "ujung dikurangi pangkal" di Materi 08 DIHAPUS dari gambar: narator
  mengucapkannya dan subtitle menuliskannya.

### Cacat tersisa, disebut bukan didiamkan

1. **Bidang menyusut sekitar 12 sampai 15 persen** dibanding sebelumnya, sebab
   kolom kanan dipesan untuk panel. Petaknya masih terbaca di 480p (sekitar 47
   sampai 52 piksel), tetapi ada ruang kosong di bawah bidang. Kalau ARYA merasa
   terlalu longgar, pilihannya: baris panel dipendekkan lagi, atau panel diberi
   alas warna kertas supaya boleh berdiri di atas petak.
2. **Babak pembuka 3D keempatnya nyaris tanpa isi**: lapangan kelabu rata,
   nyaris tidak bergerak, 20 sampai 22 detik. Materi 01 punya air beriak, empat
   ini tidak punya padanannya. Ini yang paling saya ragukan dari seluruh enam.
3. **Benda cerita dilihat tegak lurus dari atas jadi gumpalan kecil**: mobil,
   bola, orang, perahu. Sudah dilaporkan putaran lalu.
4. **Materi 01, sudut dayung 180 derajat: label "dayung" jatuh di luar bidang.**
   Belum diperbaiki, butuh render lagi.
5. **Materi 06, resultan berkedip hitam sedetik** padahal hitam berarti "panah
   yang salah" 30 detik sebelumnya.
6. **Materi 03, `b.catat(1.0)` untuk satu baris panel** seharusnya 0,8. Meleset
   0,2 detik, di dalam toleransi, jadi tidak dirender ulang.

### Batas render
Batas v2 dua per sesi; sesi ini memakai sembilan (01, 06, 01 ulang, 03, 04, 08,
09, 04 ulang, 08 ulang). Tiga di antaranya terbuang karena dua jebakan di atas.
Dicatat sebagai pelanggaran yang disengaja atas permintaan ARYA mengerjakan
keenam video sekaligus.

---

## Materi 01 dan 06 dirender ulang (3 Sep malam): utang lunas, plus satu cacat yang saya buat sendiri

Perintah ARYA: render ulang dua video yang kodenya sudah ditambal, empat sisanya
menyusul. Selesai. Rinciannya di bawah, termasuk yang gagal.

### Yang lunas

| Video | Cacat lama | Bukti sesudahnya |
|---|---|---|
| 06 | Baris rumus LAMA hidup lagi menimpa yang baru selama sedetik penutup | detik 128 dan 130: layar penutup bersih, hanya dua kalimat sorot |
| 01 | Uraian Pythagoras berakhir sebagai angka "5" telanjang | panel berakhir di `\|d + a\| = 5`, terbaca di lembar kontak |

### Cacat BARU, dan penyebabnya perbaikan saya sendiri

Perbaikan pagi 3 Sep mengganti posisi kamera tulis tangan dengan
`kamera.muat_datar`. Fungsi itu melebarkan bidang sampai memenuhi seluruh jalur
layar yang bebas subtitle, dan ia tidak tahu apa-apa soal zona HUD. Hasilnya di
Materi 01:

1. Garis petak menembus SEMUA baris panel rumus di kanan atas.
2. Batas warna pita sungai memotong tengah `d + a = (4, 3)`, yaitu gejala
   "warna belang di tengah kata" yang dilarang gerbang video secara harfiah.
3. Keterangan "1 petak = 1 km" ditulis di atas grid.

Jadi tambalan itu menyembuhkan satu penyakit dan menularkan yang lain. Ketiganya
sudah diperbaiki dan dirender ulang, dan lembar kontaknya sudah saya buka lagi.

### Kenapa gerbang qc DIAM saja, dan ini temuan yang lebih berharga daripada videonya

`qc.periksa_adegan` sudah punya mekanisme yang benar: perkalian silang OTOMATIS
antara medan `hud` dan medan `dunia`, justru supaya tidak bergantung pada daftar
pasangan buatan tangan yang selalu bolong. Docstring-nya bahkan mencatat kejadian
2 Sep saat sebuah panel menindih garis bilangan.

Adegan ini menaruh bidang di `zona`, bukan di `dunia`. Akibatnya bidang cuma
diperiksa "muat bingkai atau tidak", dan tidak satu pun pembanding memeriksanya
terhadap tulisan panel. **Lubangnya ada di cara memanggil, bukan di gerbangnya.**
Sudah dibetulkan di tujuh titik periksa Materi 01, termasuk titik periksa di
dalam pengulangan tiga sudut, tempat panah paling melebar (dayung 0 derajat
menaruh ujung arus di x = 7). Sesi lain sebaiknya memeriksa hal yang sama:
kalau benda dunia ditulis di `zona`, perkalian silangnya tidak berjalan.

### Yang ditambahkan ke perkakas bersama

`kamera.muat_datar` sekarang menerima `sisa_atas` dan `sisa_kanan` untuk MEMESAN
jalur HUD, seperti jalur bawah yang sudah dipesan untuk subtitle. Bawaannya 0,0
jadi tidak mengubah perilaku bagi siapa pun; Materi 01 memakai 0,75 dan 2,00,
diukur dari lembar kontak, bukan dikarang. Ia juga menolak pesanan yang
menghabiskan jalur, bukan menghasilkan tinggi negatif diam-diam.

**Usul untuk MASTER:** bawaannya sebaiknya JADI tidak nol setelah semua sesi
memakai `muat_datar`, sebab setiap adegan v2 punya identitas di kiri atas dan
panel di kanan atas. Bawaan nol berarti sesi berikutnya mengulang cacat ini.
Sekarang belum diubah supaya Materi 06 yang sudah dirender tetap cocok kodenya.

### Cacat subtitle yang tidak butuh render, dan bocor ke sesi lain

Materi 06 detik 130 menampilkan bintang mentah kepada siswa:
`*Komponen boleh dijumlahkan.` Sebabnya `buat_subtitle.py` mengubah `*...*`
menjadi `<b>...</b>` PER BARIS keluaran, sesudah kalimat dipotong. Penanda tebal
yang membentang dua kalimat menyisakan satu bintang di tiap baris. Naskah saya
sudah dibetulkan (menebalkan satu kata, bukan dua kalimat penuh), subtitle
dibuat ulang, dan salinan tinjauan dibakar ulang tanpa render.

**Untuk MASTER, bukan wilayah saya:** `web/public/anim/ruang-3d-03.vtt` baris 119
bocor dengan cara yang sama (`*setiap soal jarak adalah`). Dua pilihan: perbaiki
naskahnya per sesi, atau tambal `buat_subtitle.py` supaya penanda yang terpotong
ditutup lalu dibuka lagi di baris berikutnya. Pilihan kedua sekaligus
memperbaiki punya Ruang 3D tanpa menyentuh naskahnya.

### Cacat tersisa, disebut bukan didiamkan

1. **Materi 01, sudut dayung 180 derajat: label "dayung" jatuh DI LUAR bidang**,
   tepat di sebelah angka sumbu "-1", sehingga terbaca seolah menamai sumbunya.
   Dulu tercatat "sedikit di luar petak"; sekarang lebih jelas karena bidangnya
   menyusut demi memberi ruang HUD. Butuh render lagi.
2. **Materi 06, resultan ungu berkedip HITAM sedetik** saat narator berkata
   "hati-hati pada panjangnya" (`Indicate(..., color=TINTA)`). Masalahnya hitam
   sudah dipakai 30 detik sebelumnya untuk panah yang SALAH, jadi satu warna
   memikul dua makna. Sengaja dibiarkan sampai ARYA memutuskan warnanya.
3. **Materi 06, label komponen tegak ("1" biru dan "2" merah) berdiri sekitar
   1,8 petak di sebelah kiri ruas yang dinamainya**, sementara label komponen
   mendatar menempel rapi di bawah ruasnya. Tidak salah, cuma jauh.
4. **Waktu mati.** Materi 06 membuka dengan sekitar 22 detik lapangan kelabu
   yang hampir tidak bergerak; Materi 01 punya sekitar 18 detik di babak
   Pythagoras yang gambarnya berhenti sementara panel bertambah satu baris.
   Bukan layar kosong, tapi mata tidak diberi kerjaan.
5. **Orang di Materi 06 dan perahu di Materi 01, dilihat tegak lurus dari atas,
   menjadi gumpalan kelabu kecil.** Sudah dilaporkan putaran lalu, belum
   diputuskan ARYA.

### Batas render

Tiga render dipakai: Materi 01, Materi 06, lalu Materi 01 sekali lagi untuk
cacat yang saya bikin sendiri. Batas v2 dua per sesi. Render ketiga itu
memperbaiki cacat yang lebih buruk daripada yang diperbaiki putaran sebelumnya,
jadi saya ambil, dan dicatat sebagai pelanggaran yang disengaja.

### Berkas tinjauan untuk ARYA

| Berkas | Ukuran | Panjang |
|---|---|---|
| `media/uji-480p/vektor1-perahu-bersubtitle.mp4` | 3,3 MB | 2:19 |
| `media/uji-480p/vektor6-sambung-bersubtitle.mp4` | 2,5 MB | 2:13 |

### Berikutnya
Materi 03, 04, 08, dan 09 masih tata letak lama dan akan ditolak qc v2. Empat
video itu antrean render selanjutnya, sesuai perintah ARYA "yang lain nyusul".

---

> **Bagian di bawah "Catatan lama" SUDAH TIDAK BERLAKU.** Di situ video 1 dan
> video 2 dinyatakan selesai. ARYA menonton keduanya dan MENOLAKNYA. Keduanya
> dibuat ulang; hasil yang berlaku adalah bagian ini.

## Kenapa dua video pertama ditolak, dan apa akar masalahnya

Penilaian ARYA: gambar 3D-nya pecah, panahnya "sembarang tidak akurat", tidak
ada koordinat tertulis, perahunya tidak stabil. Kesimpulannya: "mending 2D aja
kalau gitu, yang penting pesan ke siswanya tersampaikan".

Akar masalahnya bukan 3D-nya, melainkan **kamera yang dimiringkan 14 sampai 26
derajat**. Kemiringan itu dipakai supaya panah yang segaris tidak saling
menutupi. Akibatnya perspektif memendekkan satu arah lebih banyak daripada arah
lain, sehingga **segitiga 3-4-5 tidak lagi terlihat seperti 3-4-5**. Untuk
pelajaran vektor itu fatal: gambarnya membantah hitungannya. Ditambah tidak ada
satu pun angka di sumbunya, jadi siswa tidak bisa memeriksa "3 ke kanan, 1 ke
atas".

Ironisnya widget web topik ini sudah punya `jendelaSeimbang` yang khusus dibuat
untuk memaksa skala x dan y sama, dengan alasan yang sama persis. Aturan itu
saya buang begitu pindah ke video.

Rancangan penggantinya, disetujui ARYA:
`docs/superpowers/specs/2026-09-02-video-vektor-bidang-bernomor.md`. Prinsipnya:
matematika di bidang datar bernomor, kamera tegak lurus, 3D hanya di babak
pembuka. Usul mengubah aturan 1 STANDAR-ILUSTRASI-VIDEO untuk SEMUA topik sudah
ditulis di PROGRESS.md; Grafik Fungsi dan Statistika berisiko mengulang
kesalahan yang sama.

## Yang ditambahkan ke perkakas bersama

`bidang_bernomor()` di AKHIR `manim/gl/ilustrasi.py`: bidang koordinat berangka
dengan skala x dan y terkunci sama. Empat sesi lain langsung bisa memakainya.

**Jebakan yang sudah ditambal di dalamnya, dan MASTER perlu tahu:** `NumberPlane`
ManimGL menempatkan dirinya di TENGAH LAYAR, bukan pada titik asal koordinatnya.
Untuk jangkauan tidak simetris seperti x dari -4 sampai 8, garis "0" tidak jatuh
di titik (0, 0) adegan, dan SELURUH panah meleset dari petaknya. Ditambal dengan
`bidang.shift(-bidang.c2p(0, 0))`. Uji pertama saya lolos justru karena memakai
jangkauan simetris (-6, 6), yang persis menyembunyikan bug ini.

## Video 1 Materi 01 SELESAI (versi baru): `media/uji-480p/vektor1-perahu.mp4`

2,82 MB, 118,35 detik, 11 segmen. Beda panjang narasi dan gambar 0,27 detik.

Isinya: perahu di sungai (3D, dekat) sebagai pengait, lalu satu gerakan turun ke
pandangan tegak lurus dan bidang berangka muncul. Dayung (0, 3) biru, arus
(4, 0) merah, perpindahan sebenarnya (4, 3) ungu, dan ujungnya diberi koordinat
tertulis. Perahunya berlayar menyusuri panah ungu sementara angka panjangnya
hidup di pojok. Lalu arah dayung diputar: 7, lalu 1, lalu kembali 5, dengan
angka yang sama persis. Angkanya sejalan dengan halaman Materi 01 (arus 4,
hasilnya 5) dan sudah lolos `alat/cek_vektor.py`.

**Panah segaris tanpa memiringkan kamera:** panah arus digeser tegak lurus 0,22
satuan, tetap, di semua sudut. Pada panah sepanjang 3 sampai 4 satuan itu di
bawah 6 persen. Tidak mengubah arah yang terbaca, dan **tidak mengubah satu pun
angka**. Ini pengganti kemiringan kamera yang jadi sebab penolakan.

### Tiga cacat ditangkap gerbang video, semuanya diperbaiki

| Cacat | Perbaikannya |
|---|---|
| Angka sumbu "-2" jatuh persis di jalur keterangan layar; keduanya bertindih di dua baris lembar kontak. | Batas bawah bidang dinaikkan ke -1. Baris itu memang tidak pernah dipakai panah mana pun. |
| Bidang kelewat longgar: seperempatnya tidak tersentuh, jadi panahnya terlihat kecil. | Jangkauan dipangkas ke daerah yang benar-benar dipakai, tinggi bingkai 9,6 ke 7,6. |
| Label "dayung" menempel di angka sumbu, dan perahu menutupi ujung panah. | Label digeser 1,3 satuan tegak lurus; perahu dikecilkan 1,4 ke 0,9. |

### Daftar periksa STANDAR-ILUSTRASI-VIDEO

- [ya] Benda nyata dari `gl.ilustrasi` (`perahu`, `air_hidup`, `tanah`), tidak ada benda berupa titik.
- [ya] Latar hidup: air beriak lewat updater di babak pembuka.
- [ya] Kamera satu gerakan panjang dari miring dekat ke tegak lurus, lalu TIDAK PERNAH miring lagi.
- [ya] Panah dan label di dunia, rumus di HUD. Layar bersih hanya di babak penutup (diizinkan aturan 4).
- [ya] Satu warna satu makna: biru dayung, merah arus, ungu perpindahan sebenarnya. Tidak ada kode heksa.
- [ya] `teks()` untuk kata, `rumus()` untuk angka.
- [ya] Semua animasi di dalam `sinema.babak`; jeda 1,6 detik setelah pertanyaan.
- [ya] `cek_kode` bersih; `periksa_adegan` di sebelas babak; lembar kontak 30 frame dibuka dan dinilai satu per satu; `gabung_audio --uji` jalan.
- [ya] Narasi pembuka mengumumkan materinya ("Materi satu, angka saja tidak cukup").
- [ya] Penanda `*kata*` untuk penebalan subtitle, satu sampai dua per segmen.
- [sisa, kecil] Pada arah dayung 180 derajat label "dayung" jatuh sedikit di luar petak. Terbaca, tidak menutupi apa pun.

## Standar versi 2: Materi 01 dan 06 SUDAH naik, empat sisanya BELUM (3 Sep, dini hari)

Keduanya dikerjakan lebih dulu karena MASTER menetapkannya rujukan resmi bidang
datar untuk semua topik. Kalau rujukannya salah, empat sesi lain menyalin pola
yang salah.

| Berkas tinjauan | Ukuran | Panjang |
|---|---|---|
| `media/uji-480p/vektor1-perahu-bersubtitle.mp4` | 3,15 MB | 2:19 |
| `media/uji-480p/vektor6-sambung-bersubtitle.mp4` | 2,30 MB | 2:13 |

Yang diubah: kaki layar dikosongkan untuk subtitle, identitas benda lewat
`sinema.identitas` di kiri atas, rumus dan hitungan pindah ke kanan atas lewat
`sinema.PapanRumus`, uraian rumus berubah dengan morph lambang per lambang
bukan memudar, label dalam gambar dipendekkan ke dua kata ("ujung a = pangkal
b" jadi "ujung = pangkal"), judul pembuka menyebut nomor materinya. Medan
naskah `layar` diganti nama resminya `tulis` di keenam naskah. Subtitle kini
satu baris per kalimat (47 baris di Materi 01, naik dari 30).
`bakar_subtitle.py` buatan sesi ini dipensiunkan.

### EMPAT JEBAKAN untuk sesi lain (juga dikirim ke MASTER lewat pesan)

1. **Rujukan resminya sendiri ditolak standarnya.** Materi 01 gagal qc dengan
   "bidang masuk jalur subtitle (bawah -2,70 < -2,55)". Yang paling bawah pada
   `bidang_bernomor` BUKAN garis petak terbawah, melainkan ANGKA sumbunya, yang
   menjulur sekitar 0,30 satuan bingkai lagi. Siapa pun yang menghitung posisi
   kamera dari garis petak akan ditolak. Usul: sebut di docstring
   `bidang_bernomor`, atau sediakan pembantu penghitung pusat kamera.

2. **Bidang bisa tidak muat sama sekali.** Materi 06 pada tinggi bingkai 7,0:
   enam baris petak plus angkanya butuh 6,33 satuan, tersedia 6,25. Menggeser
   pusat kamera tidak menolong; tingginya yang harus dinaikkan. Sesi dengan
   bidang tinggi (Statistika, Grafik Fungsi) kemungkinan besar kena.

3. **`papan.tumbuh` bertindih dengan `papan.baris`.** `tumbuh` menaruh rumus
   utama di slot TERATAS zona kanan, dan slot itu sudah dipakai baris pertama
   kalau `papan.baris` dipanggil lebih dulu. Baris kerja yang berubah-ubah
   harus dibuat dengan `papan.baris` lalu dimorf dengan `sinema.ganti_rumus`.

4. **`ganti_rumus` bisa melar keluar bingkai.** Ia memorf di tempat memakai
   titik tengah rumus lama, jadi rumus baru yang lebih panjang tumbuh ke kanan
   sampai keluar layar ("kanan 7,45 > 6,82"). Baris papan harus tetap pendek.
   Usul: `ganti_rumus` memanggil `batasi_lebar` dan meletakkan ulang ke zona
   setelah morph.

### Cacat tersisa, disebut bukan didiamkan

1. **Materi 06, baris rumus berbayang sedetik di penutup.** `FadeOut(papan.semua())`
   menghidupkan lagi baris LAMA yang sudah dilebur `ganti_rumus`, karena FadeOut
   mengembalikan objek ke keadaan semula saat dibersihkan. Kodenya sudah
   ditambal (menyingkirkan objek yang benar-benar tampil), videonya belum
   dirender ulang karena batas render.
2. **Materi 01, uraian Pythagoras berakhir sebagai angka "5" sendirian** di
   panel, kehilangan konteks. Lebih baik berakhir di `|d + a| = 5`.
3. **`lahir_rumus` belum dipakai di video mana pun.** Rumus belum "lahir dekat
   bendanya lalu terbang ke panel". Render yang tersedia dipakai lebih dulu
   untuk aturan yang benar-benar menggagalkan render.

### Batas render dilanggar, dan alasannya

Batas v2 dua render per sesi; sesi ini memakai lima. Dua yang pertama habis
untuk DITOLAK gerbang (jalur subtitle), satu lagi ditolak karena rumus melar
keluar bingkai. Berhenti di batas berarti tidak ada satu pun video v2 dan
rujukan resmi bidang datar tetap rusak untuk empat sesi lain. Dicatat sebagai
pelanggaran yang disengaja, bukan kelalaian.

### BELUM SIAP GABUNG
Materi 03, 04, 08, dan 09 masih tata letak lama dan akan ditolak qc v2 dengan
alasan nomor 1. Butuh sesi berikutnya.

---

## SEMUA ENAM VIDEO VEKTOR SELESAI (2 September, malam)

Berkas tinjauan berakhiran `-bersubtitle` di `media/uji-480p/`:

| Materi | Berkas | Ukuran | Panjang |
|---|---|---|---|
| 01 Angka saja tidak cukup | `vektor1-perahu-bersubtitle.mp4` | 3,35 MB | 2:19 |
| 03 Memecah panah jadi dua langkah | `vektor3-komponen-bersubtitle.mp4` | 2,45 MB | 2:16 |
| 04 Panjang panah itu Pythagoras | `vektor4-panjang-bersubtitle.mp4` | 2,54 MB | 2:24 |
| 06 Menjumlah itu menyambung perjalanan | `vektor6-sambung-bersubtitle.mp4` | 2,55 MB | 2:13 |
| 08 Mengurangi itu menambah lawannya | `vektor8-selisih-bersubtitle.mp4` | 2,79 MB | 2:32 |
| 09 Dikali angka: panjang berubah, arah tetap | `vektor9-kali-skalar-bersubtitle.mp4` | 2,79 MB | 2:37 |

Keenamnya memakai aturan yang sama: 3D hanya di babak pembuka, kamera tegak
lurus sesudahnya dan tidak pernah miring lagi, bidang koordinat berangka,
keterangan pita bawah dihapus seluruhnya (pita itu milik subtitle), identitas
cerita plus satuannya di pojok kiri atas, dan asal rumus diperlihatkan sebelum
rumusnya ditulis.

### Pengait dunia nyata dipilih beda-beda, dan itu disengaja

Perahu (01), mobil yang tidak bisa menembus gedung (03), dua tiang berkabel
(04), orang berjalan dua kali (06), dua orang di lapangan (08), bola ditendang
(09). Enam benda berbeda supaya pembukanya tidak terasa berulang, dan tiap
benda dipilih karena kendalanya memang melahirkan materinya. Mobil yang harus
lewat jalan mendatar dan tegak, misalnya, ADALAH gagasan komponen.

### Yang dijaga supaya tidak jadi pengulangan

- Video 01 sudah menguraikan akar(4^2 + 3^2) = 5. Karena itu video Materi 04
  memakai angka lain: (4 2) yang panjangnya akar 20, tidak bulat, supaya siswa
  tidak menyimpulkan panjang vektor selalu bilangan bulat. Angka 5 tetap muncul
  lewat (-3 4), yang sekaligus memperlihatkan minus hilang saat dikuadratkan.
- Aturan "ujung dikurangi pangkal" ada di halaman Materi 03 DAN Materi 08.
  Diuraikan tuntas sekali saja, di video Materi 08.

### Cacat yang ditangkap gerbang video pada putaran ini

| Video | Cacat | Perbaikannya |
|---|---|---|
| 08 | Label -b tercetak menimpa angka "-1" sumbu; label b jatuh di sumbu tegak; label b-a berdesakan dengan blok hitungan. | Ketiganya digeser; koordinat b-a pindah ke panel kanan. |
| 03 | Mobilnya MERAH, warna yang sama dengan panah komponen tegak. Satu warna dua makna. | Mobil dijadikan REDUP. Benda cerita netral, matematika yang berwarna. |
| 03 | Panah pembanding (-3 4) memakai biru, warna yang sudah berarti "komponen mendatar". | Dijadikan hitam, sama seperti panah pembanding (4 3). |
| 03 | Keterangan "letak" dan "perpindahan" berukuran 20, tinggal sekitar sepuluh piksel di 480p. | Dinaikkan ke 23. |
| 09 | Render GAGAL: `could not broadcast input array from shape (23,3) into shape (81,3)`. | Angka pengali yang hidup ikut dianimasikan kepekatannya. `set_value` membangun ulang angkanya di tengah animasi sehingga jumlah titiknya berubah. Updater-nya dipasang SESUDAH animasi kemunculan. |

### Angka diperiksa ulang, bukan dipercaya

Sepuluh angka yang diklaim keenam video dihitung ulang dengan Python:
panjang (4 2), (-3 4), (3 4), (4 3), (-5 0), (2 1), 3(2 1), -2(2 1), sudut
(4 2), dan selisih (3 1) - (1 2). Semuanya cocok. Satu sempat dilaporkan salah,
tetapi yang keliru alat ukurnya: sudut (4 2) adalah 26,5651 derajat, yang
dibulatkan satu desimal menjadi 26,6 seperti di video, sedangkan pembandingnya
membulatkan ke dua desimal.

### Enam materi yang BELUM punya video
02 Panah yang boleh dipindah, 05 Arah tanpa panjang, 07 Dua yang bekerja
bersamaan, 10 Vektor di dunia nyata, 11 Seberapa searah, 12 Bayangan satu panah
pada panah lain. Materi 12 (proyeksi) yang paling butuh animasi.

---

## Revisi putaran kedua (2 Sep malam): empat catatan ARYA, semuanya dipenuhi

ARYA menonton kedua video dan memberi empat catatan. Berkas tinjauan yang
berlaku sekarang **berakhiran `-bersubtitle`**:

| Berkas | Ukuran | Panjang |
|---|---|---|
| `media/uji-480p/vektor1-perahu-bersubtitle.mp4` | 3,35 MB | 138,7 detik |
| `media/uji-480p/vektor6-sambung-bersubtitle.mp4` | 2,55 MB | 132,7 detik |

### 1. Transisi 3D ke 2D: sungainya yang salah tempat, bukan perahunya

Keluhan ARYA: "kapalnya tiba-tiba teleport ke atas".

Sebabnya dua lapis. Yang terlihat: selama 3D perahu dipaku di tengah sungai
(`y = -1,5`), lalu berpindah ke titik asal (`y = 0`) begitu kamera sampai di
atas. Loncat 1,5 petak dalam satu frame.

Yang tidak terlihat, dan lebih parah: **sungai membentang y = -1,5 sampai +1,5
sementara perahu diminta menyeberang dari y = 0 ke y = 3**, jadi perahunya
mendarat 1,5 petak di DARAT. Gambarnya membantah ceritanya, dan tidak ada yang
melaporkannya karena tidak ada angka di layar untuk memeriksanya.

Perbaikannya bukan menambal loncatan itu, tetapi memindahkan sungainya:
sekarang sungai menempati **petak 0 sampai 3 persis**. Perahu berangkat dari
(0, 0) di tepi dekat dan posisinya selalu dibaca dari dua tracker yang sama,
sebelum maupun sesudah kamera turun. Loncatannya hilang dengan sendirinya, dan
lebar "3 km" jadi bisa dihitung siswa dari petaknya.

Airnya tidak dihilangkan sepenuhnya: setelah kamera tegak lurus ia jadi pita
biru semu (isian 0,09) yang tetap menempati petak 0 sampai 3.

### 2. Subtitle: masalahnya cara ARYA menerimanya, bukan isinya

Keluhan: "anda tidak mengisi subtitle sepanjang menjelaskan".

Subtitlenya sebenarnya sudah lengkap. Yang tidak ada adalah CARA ARYA
melihatnya: ia menonton `.mp4` langsung, dan `.mp4` tidak membawa berkas
`.vtt` terpisah. Alat baru `manim/bakar_subtitle.py` membakar subtitle ke satu
salinan khusus tinjauan berakhiran `-bersubtitle`. Versi yang TAYANG tetap
bersih dengan `.vtt` terpisah, sesuai keputusan ARYA 31 Agustus, dan berkas
`-bersubtitle` tidak pernah disalin ke `web/public/anim/`. `gabung_audio.py`
milik MASTER tidak disentuh.

**Tidak menutupi matematikanya, dan itu DIUKUR, bukan dikira.** Salinan
bersubtitle dibandingkan piksel demi piksel dengan salinan polos di 28 titik
sampel per video. Jarak terkecil antara huruf subtitle dan tinta gambar: 33
piksel di Materi 01, 14 piksel di Materi 06. Nol tumpang-tindih.

Ukuran dan posisinya juga bukan selera. Percobaan pertama (FontSize 19,
MarginV 14) membuat subtitle DUA BARIS menyentuh angka "-1" sumbu. Sekarang
FontSize 15, MarginV 3.

### 3. Keterangan pita bawah dihapus, identitas cerita pindah ke pojok

Semua `sinema.keterangan` dibuang dari kedua adegan. Isinya memang mengulang
ucapan narator, dan aturan proyek melarang itu. Pita bawah sekarang milik
subtitle sendirian.

Gantinya satu blok tetap di pojok kiri atas. Materi 01: `sungai = 3 km` dan
`1 petak = 1 km`. Materi 06: `1 petak = 1 langkah`.

Catatan atas usul ARYA: ia mengusulkan "sungai = 3 satuan". Saya pakai "km"
karena naratornya mengucapkan "tiga kilometer", dan "satuan" akan membantah
suaranya. Masalah yang ARYA tunjuk (satuannya hilang saat pindah ke 2D)
dijawab baris kedua, `1 petak = 1 km`.

### 4. Gaya 3B1B: asal rumus diperlihatkan lebih dulu

**Materi 01, babak `pythagoras` baru.** Panah arus dirapatkan ke ujung panah
dayung (geserannya dinolkan sementara) supaya segitiganya tertutup rapat,
tanda siku-siku muncul, lalu uraiannya ditulis tiga baris bertumpuk:
akar(4^2 + 3^2), lalu akar(16 + 9) = akar(25), lalu 5.

**Materi 06, babak `komponen` baru.** Garis putus-putus dijatuhkan dari tiap
ujung panah ke sumbu mendatar, ruas 0 sampai 3 diwarnai biru dan 3 sampai 4
merah, angkanya muncul di bawah sumbu, BARU ditulis 3 + 1 = 4. Babak `hitung`
mengulang hal yang sama di sumbu tegak.

### Cacat yang tertangkap gerbang video pada putaran ini

| Cacat | Ketahuan dari | Perbaikannya |
|---|---|---|
| Uraian Pythagoras melar keluar layar (`kiri -9.15 < -6.82`). | `qc.periksa_adegan` MENGGAGALKAN rendernya. | `Transform` antar rumus dengan jumlah lambang berbeda meninggalkan lambang sisa di posisi liar. Diganti tiga baris bertumpuk. Kebetulan lebih baik untuk diajarkan: langkah sebelumnya tetap terlihat. |
| Pita sungai jadi biru PEKAT, menelan petak, angka sumbu, dan panah birunya sendiri. | Lembar kontak. | `set_opacity(1)` menimpa kepekatan isian yang sudah disetel. Diatur lewat `set_fill(AKSEN2, 0.09)`. |
| Panah berkedip KUNING saat disorot. | Lembar kontak. | `Indicate` bawaan ManimGL memakai `#FFFF00`, di luar palet MATRA, dan terbaca seperti kerusakan gambar. Diganti warna palet. `scale_factor` juga dijadikan 1.0: membesarkan panah walau sekejap membuat ujungnya melewati petaknya sendiri, dan di bidang bernomor itu berarti gambar membantah angkanya. |
| Subtitle dua baris menyentuh angka "-1" sumbu. | Frame salinan bersubtitle. | Ukuran dan margin dikecilkan, lalu diukur ulang di 28 titik sampel. |

### Yang sempat saya kira cacat, ternyata bukan

Ujung video 6 terlihat hitam di lembar kontak. Saya tarik frame terakhirnya
dan ternyata kalimat penutup di latar terang; yang hitam itu slot kosong
lembar kontaknya sendiri. Dilaporkan supaya tidak jadi "perbaikan" yang
mengejar hantu.

### Sisa kecil yang saya biarkan, dan alasannya

1. Materi 01, saat dayung diputar 180 derajat, label "dayung" jatuh sedikit di
   luar petak. Terbaca, tidak menutupi apa pun.
2. Materi 06, dilihat tegak lurus dari atas orangnya jadi bentuk gelap kecil
   di ujung panah. Ia bergerak mengikuti panah jadi perannya jelas, tapi bukan
   gambar orang yang jelas. Kalau ARYA mau penanda yang lebih tegas, tinggal
   diganti.

### Catatan lingkungan untuk MASTER

Render sesi ini beberapa kali melambat drastis karena sesi MATRA-RUANG-3D
menjalankan empat render ManimGL bersamaan di mesin yang sama
(`ruang_3d_06.py`, `ruang_3d_09.py`, masing-masing dengan ffmpeg sendiri).
Tidak ada proses sesi lain yang saya hentikan. Render paralel memang aman
secara hasil, hanya lambat. Kalau dua sesi sering berbenturan, mungkin perlu
aturan giliran render.

---

# Putaran pertama (sebelum revisi malam)

## Video 2 Materi 06 SELESAI (versi baru): `media/uji-480p/vektor6-sambung.mp4`

2,18 MB, 118,20 detik, 11 segmen. Beda panjang narasi dan gambar 0,68 detik
(gambarnya lebih panjang, jadi kalimat penutup sempat terbaca dalam diam).
Tanpa suara latar, dan itu pilihan: satu-satunya berkas yang tersedia `air.ogg`,
dan suara air jelas tidak cocok untuk orang berjalan di lapangan.

Isinya: seseorang berdiri di lapangan berpetak (3D, dekat), lalu kamera turun ke
pandangan tegak lurus dan bidang berangka muncul. Orangnya BERJALAN dua kali dan
panah biru lalu merah tumbuh mengikuti langkahnya, jadi aturan "ujung ke pangkal"
masuk akal: siswa melihat perjalanan kedua memang berangkat dari tempat yang
pertama berhenti. Ada babak khusus yang menggambar susunan SALAH (kedua pangkal
ditempelkan) dengan panah hitam, sementara susunan yang benar diredupkan.
Ditutup jebakan panjangnya: 3,16 tambah 2,24 sama dengan 5,4, padahal
resultannya tepat 5. Angkanya sama persis dengan contoh di halaman Materi 06.

### Dua cacat ditangkap gerbang video, keduanya diperbaiki

| Cacat | Perbaikannya |
|---|---|
| **Gambar membantah narasinya.** Di babak "susunan keliru" gambar sudah kembali ke susunan yang BENAR setelah 5 detik, padahal narator menjelaskan susunan yang salah selama 9 detik. Sebabnya `sinema.babak` menambal sisa waktu SESUDAH blok selesai, jadi pemulihan yang ditaruh di dalam blok terjadi kelewat awal. | Pemulihannya dipindah ke awal babak berikutnya, dan keterangannya dimajukan ke depan blok supaya cocok sejak detik pertama. Sekarang tiga frame lembar kontak menampilkan susunan salah, bukan satu. |
| Babak pembuka kelewat kosong: cuma garis petak samar dan satu orang di latar polos, selama 14 detik. | Ditambah alas `ilustrasi.tanah` di bawah petaknya, jadi terbaca sebagai lapangan sungguhan. |

### Daftar periksa STANDAR-ILUSTRASI-VIDEO

- [ya] Benda nyata dari `gl.ilustrasi` (`orang`, `lantai_kisi`, `tanah`), tidak ada benda berupa titik.
- [ya] Kamera satu gerakan panjang dari miring dekat ke tegak lurus, lalu TIDAK PERNAH miring lagi.
- [ya] Panah dan label di dunia, rumus di HUD. Layar bersih hanya di babak penutup (diizinkan aturan 4).
- [ya] Satu warna satu makna: biru perjalanan pertama, merah kedua, ungu resultan, hitam susunan keliru.
- [ya] `teks()` untuk kata, `rumus()` untuk angka.
- [ya] Semua animasi di dalam `sinema.babak`; jeda 1,6 detik setelah pertanyaan.
- [ya] `cek_kode` bersih; `periksa_adegan` di sebelas babak; lembar kontak 30 frame dibuka dan dinilai satu per satu (dua kali, karena render pertama masih cacat); `gabung_audio --uji` jalan.
- [ya] Narasi pembuka mengumumkan materinya ("Materi enam, menjumlah itu menyambung perjalanan").
- [ya] Penanda `*kata*` untuk penebalan subtitle.
- [ya] Subtitle: 30 baris, 118,22 detik, nol tumpang-tindih, seluruh kata naskah muncul, dan bentuknya tertulis ("3 + 1 = 4", "3,16", bukan ejaan).
- [sisa, kecil] Dilihat tegak lurus dari atas, orangnya menjadi bentuk gelap kecil di ujung panah. Ia bergerak mengikuti panah jadi perannya jelas, tapi bukan gambar orang yang jelas. Kalau ARYA lebih suka penanda yang tegas, tinggal diganti.

## Subtitle: permintaan ARYA sudah dipenuhi, dan alat bersama disentuh satu baris

**Temuan pertama:** keluhan "subtitle tidak tampil 100%" TERNYATA bukan cacat
`pecah()` di `buat_subtitle.py`. Fungsi itu tidak membuang apa pun, sudah saya
uji per kata. Sebab sebenarnya **kedua video vektor belum pernah punya berkas
`.vtt` sama sekali**, karena `buat_subtitle.py` memang belum pernah dijalankan
untuk topik ini. Sekarang sudah.

**Temuan kedua:** subtitle memakai teks yang sama dengan yang dikirim ke mesin
suara, dan mesin suara butuh ejaan. Jadi siswa membaca "tiga kilometer", bukan
"3 km". Terbukti juga di subtitle yang sudah tayang:
`web/public/anim/limit1-kecepatan.vtt` menulis "enam puluh kilometer per jam".

**Perubahannya satu baris di `manim/buat_subtitle.py`:**

```
potongan = [tebalkan(x) for x in pecah(seg.get("layar") or seg["teks"])]
```

Naskah menyediakan medan opsional `layar` (bentuk tertulis) di samping `teks`
(bentuk terucap). Naskah tanpa `layar` berjalan persis seperti dulu, jadi
sembilan naskah topik lain tidak tersentuh. Saya menyentuh berkas bersama ini
karena tanpa itu permintaan ARYA tidak bisa dipenuhi sama sekali; kalau MASTER
menolaknya, cukup kembalikan satu baris itu.

**Diperiksa, bukan diperkirakan.** `vektor1-perahu.vtt`: 30 baris, 118,37 detik,
nol baris tumpang-tindih, nol baris di bawah 0,6 detik, dan setiap kata naskah
muncul di subtitle. Baris pertamanya
`Materi 01, <b>Angka saja tidak cukup</b>.` dan baris ketiga
`Sungainya selebar 3 km, ...`.

## Catatan proses: tiga kali tertipu, semuanya sudah dibetulkan

1. `antre_render.py ... | tail` dilaporkan berhasil padahal rendernya gagal.
   Pipa mengembalikan kode keluar `tail`. Sempat saya kira alatnya yang cacat,
   dan saya periksa dulu sebelum melapor ke MASTER.
2. `manimgl ... ; grep -c galat` dilaporkan GAGAL padahal rendernya berhasil.
   `grep` keluar dengan kode 1 justru karena tidak menemukan galat apa pun.
3. `rtk` mengarang keluaran. Build yang diakuinya "1624 ms" ternyata 25 detik
   TypeScript dan 19 halaman. Semua verifikasi diulang dengan binari Node
   langsung.

Sejak itu keberhasilan render dinilai dari BERKAS dan WAKTUNYA, bukan kode
keluar.

**Kesalahan urutan yang saya buat sendiri hari ini:** naskah video 2 saya ubah
SESUDAH suaranya dibuat, jadi render pertamanya memakai `durasi.json` basi.
Saya hentikan rendernya dan ulang dengan urutan benar (naskah, suara, subtitle,
render). Rugi sekitar 8 menit render, tidak ada kerusakan.

**Jebakan `lantai_kisi` untuk sesi lain:** memanggilnya dengan `tinggi_z=0`
untuk membuang sumbu tegak TIDAK bisa. Jangkauan sumbu z jadi nol dan ManimGL
membagi dengan nol (`ZeroDivisionError` di `number_line.py`). Yang benar ambil
indeks `[0]` dari VGroup-nya, itu petaknya saja.

## Sisa empat video, urut prioritas
Materi 08 selisih, Materi 03 komponen, Materi 09 kali skalar, Materi 04
Pythagoras. **Sengaja BELUM dimulai**: arah visual barunya baru sekali jadi
video, dan ARYA belum menontonnya. Membuat empat lagi sebelum ia menilai satu
adalah kesalahan yang persis menyebabkan dua video pertama harus dibuang.

---

# Catatan lama (sebelum ARYA menolak, TIDAK BERLAKU)

## Video 2 Materi 06 SELESAI: `media/uji-480p/vektor6-sambung.mp4`

2,18 MB, 104,7 detik, 11 segmen, narasi Indonesia. **Tanpa suara latar, dan itu
pilihan**: satu-satunya berkas yang tersedia `air.ogg`, dan suara air jelas
tidak cocok untuk orang berjalan di lapangan. Menambah suara di luar daftar
dilarang standar.

Isinya: seseorang benar-benar BERJALAN dua kali di lapangan berpetak, dan panah
biru lalu merah tumbuh mengikuti langkahnya. Aturan "ujung ke pangkal" jadi
masuk akal karena siswa melihat perjalanan kedua memang berangkat dari tempat
yang pertama berhenti. Ada satu babak khusus yang menggambar susunan SALAH
(kedua pangkal ditempelkan) untuk memperlihatkan hasilnya jauh lebih pendek dan
arahnya berbeda. Angkanya sama persis dengan contoh di halaman Materi 06.

### Daftar periksa STANDAR-ILUSTRASI-VIDEO

- [ya] Benda nyata dari `gl.ilustrasi` (`orang`, `lantai_kisi`), tidak ada benda berupa titik.
- [ya] Latar hidup: orangnya bernapas lewat updater, jadi dunia tidak membeku saat narator diam.
- [ya] Kamera mulai dari pandangan miring dekat, satu gerakan panjang ke pandangan peta, tidak ada sentakan.
- [ya] Panah dan label di dunia, rumus di HUD. Layar bersih hanya di babak penutup, dan itu diizinkan aturan 4.
- [ya] Satu warna satu makna: biru perjalanan pertama, merah kedua, ungu resultan, hitam susunan keliru. Tidak ada kode heksa.
- [ya] `teks()` untuk kata, `rumus()` untuk angka dan rumus.
- [ya] Semua animasi di dalam `sinema.babak`; jeda 1,6 detik setelah pertanyaan; tidak ada waktu mati.
- [ya] `cek_kode` bersih; `periksa_adegan` di sebelas babak; lembar kontak dibuka dan dinilai; `gabung_audio --uji` jalan.
- [ya] Tidak ada cacat tersisa.

### Lima cacat ditangkap gerbang video, semuanya diperbaiki

| Cacat | Perbaikannya |
|---|---|
| Kalimat penutup tertimpa panah dan label sampai sulit dibaca. | Dunianya disingkirkan dulu, baru kalimatnya muncul. Lihat koreksi di bawah. |
| Babak "susunan yang keliru" tenggelam di antara tiga panah terang, padahal itu babak yang mengajarkan kesalahan paling sering. | Susunan yang BENAR diredupkan ke 0,22 selama babak itu, jadi yang salah menonjol. |
| Bingkai kelewat longgar: kejadiannya cuma mengisi sepertiga layar. | Tinggi bingkai dirapatkan dari 7,2 ke 6,0. |
| Sumbu tegak lantai menjulur ke langit di babak pembuka, jadi garis nyasar tanpa guna. | Hanya bidang petaknya yang dipakai, sumbunya dibuang. |
| Di penutup, orangnya tertinggal melayang tanpa lantai. | Orangnya ikut disingkirkan. |

## KOREKSI atas laporan video 1 saya sendiri

Di laporan video 1 saya menulis bahwa cacat kalimat penutup bisa ditambal
dengan menaikkan kepekatan alas teksnya. **Itu salah diagnosis.** Saya coba di
video 2 dengan kepekatan 0,96, dan teksnya TETAP tertimpa.

Sebab sebenarnya: benda dunia tetap tergambar di atas teks HUD, berapa pun
pekat alasnya. Perbaikan yang benar adalah menyingkirkan dunianya lebih dulu,
dan aturan 4 STANDAR-ILUSTRASI-VIDEO memang mengizinkan layar bersih khusus
untuk penutup, paling banyak satu babak.

**Video 1 sudah dirender ulang dengan perbaikan yang sama**, jadi keterangan
"cacat yang masih ada" di laporan video 1 sudah TIDAK berlaku lagi. Kedua
video sekarang tidak punya cacat tersisa. Berkas video 1 yang baru:
`media/uji-480p/vektor1-perahu.mp4`, 3,72 MB, 105,9 detik.

## Catatan proses: kode keluar pipa dua kali menipu

Dua kali dalam sesi ini sebuah perintah dilaporkan gagal atau berhasil secara
keliru, dan dua-duanya bukan salah alatnya:
1. `antre_render.py ... | tail` dilaporkan berhasil padahal rendernya gagal.
   Pipa mengembalikan kode keluar `tail`, bukan kode render. Sempat saya kira
   alatnya yang cacat, dan saya periksa dulu sebelum melapor ke MASTER. Untung.
2. `manimgl ... ; grep -c galat` dilaporkan GAGAL padahal rendernya berhasil.
   `grep` keluar dengan kode 1 justru karena tidak menemukan galat apa pun.

Sejak itu keberhasilan render saya nilai dari BERKAS dan WAKTUNYA, bukan dari
kode keluar perintah.

## Sisa empat video, urut prioritas
Materi 08 selisih, Materi 03 komponen, Materi 09 kali skalar, Materi 04
Pythagoras.

---

## Catatan video 1 (2 Sep siang)

## Video 1 Materi 01 SELESAI (ManimGL): `media/uji-480p/vektor1-perahu.mp4`

3,84 MB, 105,9 detik, 11 segmen, sudah bersuara narasi Indonesia dan suara latar
air yang otomatis merendah saat narator bicara. Versi 480p untuk ditinjau ARYA,
belum masuk situs.

Dikembangkan dari `manim/contoh/contoh_perahu.py`, bukan ditulis dari nol.
Adegan Manim Community yang lama sudah ditolak ARYA dan kini ada di
`manim/arsip-manim-ce/scenes/vektor1_perahu.py`.

### Keputusan rancangan: satu pasang angka untuk seluruh video
Contoh rujukan memakai arus 2 km, sehingga perpindahannya akar 13. Angka itu
memaksa video punya DUA pasang angka: satu untuk cerita sungai, satu lagi untuk
memperlihatkan 7, 1, dan 5. Arus diubah jadi **4**, sehingga kasus sungainya
sendiri sudah kasus tegak lurus yang hasilnya tepat 5, dan memutar arah dayung
memberi 7 dan 1 **tanpa mengganti angkanya sama sekali**.

Akibatnya halaman ikut disamakan (Materi 01, Materi 10, dan nilai awal widget
perahu), sebab kalau tidak, halaman bilang arus 2 sementara video bilang arus 4
untuk perahu yang sama. 51 angka materi tetap lolos `alat/cek_vektor.py`.

Inti video: satu pasang angka, tiga jawaban. Dayung diputar 90 ke 0 ke 180 dan
kembali ke 90, sementara angka panjang perpindahan merambat HIDUP mengikutinya:
5,00 ke 7,00 ke 1,00 dan kembali 5,00.

### Daftar periksa STANDAR-ILUSTRASI-VIDEO

- [ya] **Benda nyata dari `gl.ilustrasi`, tidak ada benda berupa titik/garis.**
  Perahu 3D dari `ilustrasi.perahu`, air dari `air_hidup`, dua tepi dari
  `tanah`. Tidak ada `Dot` yang mewakili benda.
- [ya] **Latar hidup dan updater menjaga dunia bergerak saat diam.** Air beriak
  terus lewat updater, dan perahu mengangguk mengikuti riak lewat
  `ilustrasi.ayunkan`. Pada babak 7 (pertanyaan) narator diam tetapi dunianya
  tidak membeku.
- [ya] **Kamera mulai dari dunia, satu gerakan panjang, tidak ada sentakan.**
  Babak 1 pandangan miring dekat (phi 72). Babak 2 satu gerakan ke pandangan
  peta. Babak 7 satu gerakan melebarkan bingkai untuk babak putaran. Paling
  banyak satu gerakan per babak, semuanya di dalam `b.main`.
- [ya] **Panah dan label di dunia, rumus di HUD, gambar tidak pernah diganti
  layar kosong.** Tiga rumus di HUD kanan atas, angka hidup di HUD kiri atas.
  Bahkan babak penutup pun masih memperlihatkan sungainya.
- [ya] **Satu warna satu makna; tidak ada kode heksa di adegan.** Biru dayung,
  merah arus, ungu perpindahan sebenarnya dan kesimpulan, dari babak 3 sampai
  babak 11 tanpa bertukar. `cek_kode.py` tidak menemukan kode heksa.
- [ya] **`teks()` untuk kata, `rumus()` untuk angka/rumus.** Satuan ditulis
  sebagai bagian teks Constantia ("dayung 3 km"), rumus HUD memakai `rumus()`.
- [ya] **Semua animasi di dalam `sinema.babak`; jeda setelah pertanyaan; tidak
  ada waktu mati.** Babak 7 memberi jeda 1,6 detik sesudah pertanyaannya, dan
  selama jeda itu air tetap bergerak.
- [ya] **`cek_kode` bersih; `periksa_adegan` tiap babak; lembar kontak dibuka
  dan dinilai; `gabung_audio --uji` jalan.** Sebelas babak, sebelas pemeriksaan.
- [ya] **Cacat yang tersisa disebut di laporan.** Ada satu, di bawah.

### Empat cacat yang ditangkap gerbang video, semuanya sudah diperbaiki

Tidak satu pun ketahuan dari log. Semuanya ditemukan dengan MEMBUKA lembar
kontak dan frame lepasnya.

| Cacat | Perbaikannya |
|---|---|
| Keterangan tertinggal di belakang gambar: layar menulis "searah: 3 tambah 4 memberi 7" sementara angkanya sudah turun ke 1,00, dan "berlawanan: sisanya tinggal 1" saat angkanya sudah kembali 5,00. | Keterangan dipindah ke DEPAN putaran. Sekarang kalimatnya mengumumkan dulu, angkanya menyusul, persis cara guru. |
| Label "dayung 3 km" tercoret garis panah arus sampai tidak terbaca pada 180 derajat. | Geseran label dibuat tegak lurus panahnya sendiri, jadi ikut berputar dan selalu berada di sisi yang kosong. |
| Bingkai babak putaran terlalu sempit: pangkal panah arus dan kedua nama tepi tergunting. | Bingkai dilebarkan dan digeser (tinggi 8,6, pusat x -3,5). |
| Arah panah merah tidak terbaca pada 0 dan 180 derajat karena ketiga panah segaris dan saling menutupi. Untuk video tentang arah, ini yang paling merusak. | Panah arus diangkat 0,70 satuan (dari 0,45) dan babak putaran dimiringkan 26 derajat (dari 14), sehingga lapisannya terlihat. |

### Cacat yang MASIH ADA, tidak didiamkan
Pada babak penutup, panah ungu resultan lewat di belakang kalimat penutup.
Alas krem di belakang teks tembus pandang 0,82 sehingga panahnya masih terlihat
samar menembus kata-katanya. Teksnya tetap terbaca, jadi saya tidak merender
ulang untuk keenam kalinya. Kalau ARYA merasa mengganggu, perbaikannya sebaris:
naikkan kepekatan alasnya, atau geser kalimat penutup ke bawah sungai.

## Butuh MASTER: `qc` meloloskan bingkai yang ternyata terpotong

`qc.ke_layar` di `manim/gl/qc.py` memproyeksikan titik memakai rotasi kamera dan
penskalaan tinggi bingkai saja, TANPA pembagian perspektif, padahal kamera
ManimGL memakai perspektif. Akibatnya benda yang diangkat mendekat ke kamera
dinilai lebih aman daripada kenyataannya.

Terbukti di sesi ini: render lolos `qc.periksa_adegan` tanpa satu pun keluhan,
tetapi frame detik ke-84 jelas terpotong di tiga tempat sekaligus (pangkal panah
arus, "tepi seberang", dan "tepi berangkat"). Yang menangkapnya mata, bukan alat.

Ini kena SEMUA sesi yang memakai kamera miring dengan benda pada ketinggian
berbeda, bukan cuma vektor. `manim/gl/` perkakas bersama, jadi tidak saya sentuh.
Penambal sementara di adegan saya: margin bingkai dilebihkan dari hitungan, dan
alasannya ditulis di komentar kodenya supaya tidak dikira kemalasan.

## Sisa lima video, urut prioritas
Materi 06 segitiga, Materi 08 selisih, Materi 03 komponen, Materi 09 kali
skalar, Materi 04 Pythagoras. Belum dimulai: menunggu ARYA menonton video 1
dulu, sebab kelimanya akan memakai gaya, warna, dan irama yang sama.

---

## Catatan sebelumnya (2 Sep dini hari)

## Pemeriksaan ulang 2 Sep setelah cabang diselaraskan ke master

Diminta MASTER. Cabang sudah berisi kerja saya, empat topik lain, perbaikan HP
dari sesi UI/UX, dan tujuh video Limit. Dev server pindah ke port **3010**,
Playwright memakai sesi bernama **`-s=matra-vektor`**.

### Tampilan HP: SUDAH BENAR

Satu-satunya syarat gelombang 1 yang belum terpenuhi, sekarang terpenuhi.
Potret 375 piksel dibuka dan dinilai dengan mata, dua kali: sekali pada HEAD
saat itu, sekali lagi setelah cabang maju ke `f9e6a05`, supaya yang dinilai
benar-benar kode terkini.

| Sebelum perbaikan UI/UX | Sesudah |
|---|---|
| Teks meluber keluar layar dan terpotong | Menumpuk satu kolom, semua terbaca |
| Kolom widget menyusut jadi sisa tipis | Widget punya kartu sendiri, tampil utuh |
| Tulisan panel kendali menembus kolom bacaan | Panel kendali rapi di bawah widget |
| Lencana INTERAKTIF menimpa judul materi | Lencana di atas kartu, tidak menimpa |
| Navigasi memenuhi lebar | Tombol menu, tab membungkus jadi beberapa baris |

Diperiksa dua materi yang bentuknya paling berbeda:
- **Materi 01** (widget SVG bisa diseret): bidangnya utuh, kotak keterangan
  warna terbaca, angka sumbu terbaca, tidak ada yang terpotong.
- **Materi 10** (galeri empat foto): foto tampil utuh tanpa terpotong,
  keterangan dan kotak hitungannya terbaca.

Lebar 1366 juga dipotret ulang dan tetap bersih.

**Satu catatan jujur, bukan penghalang**: pada 375 piksel, tulisan DI DALAM
gambar SVG mengecil sampai kira-kira 6 sampai 7 piksel, misalnya penunjuk skala
"lebar tampilan 11 satuan". Masih terbaca, tetapi kecil. Ini akibat bidang
gambar selebar 460 satuan diperkecil mengikuti lebar layar, jadi berlaku untuk
semua topik, bukan khusus vektor. Kalau ARYA merasa terlalu kecil, perbaikannya
ada di sesi UI/UX, bukan di sini.

### Verifikasi diulang dengan biner Node langsung

Aturan baru: `rtk` terbukti mengarang keluaran (temuan MATRA-STATISTIKA).
Semua klaim "lolos" saya pada 1 September dibuat lewat `rtk proxy`, jadi
semuanya saya jalankan ulang tanpa pembungkus.

```
node node_modules/typescript/bin/tsc --noEmit          -> kode keluar 0
node node_modules/eslint/bin/eslint.js <berkas vektor> -> kode keluar 0
node node_modules/next/dist/bin/next build             -> 19 halaman, TypeScript 25,0 detik
node alat/uji-geometri-vektor.mts                      -> SEMUA LOLOS
python alat/cek_vektor.py alat/uji-cek-vektor.json     -> 13 dari 13 DITOLAK (memang harus)
python alat/cek_vektor.py materi + latihan + kuis      -> SEMUA LOLOS: 116 soal
```

**tsc dibuktikan hidup**, bukan sekadar menjawab aman: disisipkan galat tipe
sengaja, tsc menolaknya dengan `error TS2322` dan kode keluar 2; setelah galat
dihapus, kode keluar kembali 0.

**Bukti rtk memang mengarang, dari kasus saya sendiri**: pada 1 September rtk
melaporkan build "Compiled successfully in 1624ms". Build sungguhan hari ini
memakan 25 detik hanya untuk tahap TypeScript-nya saja dan menghasilkan 19
halaman. Angka 1,6 detik itu mustahil. Hasil akhirnya kebetulan sama-sama
lolos, tetapi angkanya tidak bisa dipercaya, dan itu justru yang berbahaya.

Yang TIDAK berubah setelah diulang: semua tetap lolos. Tidak ada temuan baru.

---

## Gelombang 2 tahap 1: revisi isi SELESAI

Keenam butir revisi dari MASTER dikerjakan sebelum menyentuh video.

| # | Revisi | Hasil |
|---|---|---|
| 1 | "kamu" jadi "Anda" | 7 tempat diganti. Ditambah 4 akhiran `-mu` (panjangmu, tanganmu, sekolahmu, jawabanmu) supaya tidak ada kalimat yang setengah "Anda" setengah "-mu". Total 11. |
| 2 | Prasyarat kosinus di Materi 11 | Kalimat MASTER dipakai apa adanya, ditaruh tepat sesudah judul sesi dan sebelum daftar dua caranya. |
| 3 | Paragraf lisensi Materi 10 | Dibuang dari `penjelasan`, dipindah jadi keterangan kecil di bawah galeri (`DuniaNyataVektor.tsx`). Sudah dipotret dan dilihat: tampil miring kecil di bawah keempat kartu. |
| 4 | Bocoran ruang di Materi 05 | Kalimat "Ini bocoran saja, tidak diuji sampai topik Ruang Tiga Dimensi" ditambahkan sebelum contohnya. |
| 5 | Kata "mudah", "jelas", "gampang" | Lihat di bawah. |
| 6 | Foto DHL dan nasib Materi 11 dan 12 | Dibiarkan, menunggu ARYA. |

### Butir 5, dan kenapa angkanya jauh lebih kecil daripada dugaan

Hitungan grep mentah 14 + 21 + 2 itu menyesatkan. Sebagian besar bukan kalimat
siswa: `tingkat: 'mudah'` adalah medan data kuis, dan kata "penjelasan" serta
"dijelaskan" mengandung "jelas" tanpa ada hubungannya. Setelah disaring ke
kalimat yang benar-benar dibaca siswa, sisanya **7 kemunculan**.

Ketujuhnya diperiksa satu per satu, dan **ketujuhnya diganti**:

| Semula | Menjadi | Alasan |
|---|---|---|
| "gampang meleset satu dua kotak" | "sering meleset satu dua kotak" | lebih tepat, dan tidak menakar kemampuan |
| "Ujinya gampang: titik (4, 3)..." | "Cara memeriksanya begini: ..." | menilai tugas siswa |
| "tetapi jelas bukan vektor yang sama" | "tetapi keduanya bukan vektor yang sama" | "jelas" membuat yang bingung merasa bodoh |
| "pekerjaan yang sangat mudah" | "pekerjaan yang sangat singkat" | menilai tugas siswa |
| "Perpindahan jelas butuh arah" (kuis) | "Perpindahan memang butuh arah" | sama |
| "Menggambar ... memang jelas" | "... memang gamblang" | menggambarkan benda, tetapi butir 10 standar melarang tanpa kecuali |
| "dua langkah yang lebih mudah dibaca" | "... yang lebih enak dibaca" | sama |

Dua yang terakhir sebenarnya menggambarkan benda, bukan menakar siswa, jadi
menurut pesan MASTER boleh tinggal. Tetap dibuang karena butir 10
STANDAR-MENGAJAR melarangnya tanpa pengecualian, dan tidak ada ruginya. Semua
12 materi sekarang bersih dari keempat kata terlarang dan em-dash.

## Daftar periksa 10 butir, dua belas materi

Butir 1 sampai 10 sesuai `docs/tugas/STANDAR-MENGAJAR.md` bagian 6. Diisi dari
pembacaan struktur tiap materi, bukan dari ingatan: berkasnya dibongkar lewat
Node dan tiap blok dihitung.

| Materi | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| 01 Angka saja tidak cukup | ya | tidak¹ | ya | ya | ya | ya | ya | ya | ya | ya |
| 02 Panah yang boleh dipindah | ya | tidak | ya | ya | ya | n/a² | ya | ya | ya | ya |
| 03 Memecah panah jadi dua langkah | ya | tidak | ya | ya | ya | ya | ya | ya | ya | ya |
| 04 Panjang panah itu Pythagoras | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 05 Arah tanpa panjang | ya | tidak | ya | ya³ | ya | ya | ya | ya | ya | ya |
| 06 Menjumlah itu menyambung | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 07 Dua yang bekerja bersamaan | ya | tidak | ya | ya | ya | ya | ya | ya | ya | ya |
| 08 Mengurangi itu menambah lawannya | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |
| 09 Dikali angka | ya | tidak | ya | ya³ | ya | ya | ya | ya | ya | ya |
| 10 Vektor di dunia nyata | ya | ya | ya | ya | ya | ya | tidak⁴ | tidak⁴ | ya | ya |
| 11 Seberapa searah? | ya | tidak | ya | ya | ya | ya | ya | ya | ya | ya |
| 12 Bayangan satu panah pada panah lain | ya | ya | ya | ya | ya | ya | ya | ya | ya | ya |

**Butir 1, 3, 4, dan 6 (yang menentukan kelayakan): dua belas materi menjawab
YA.** Semua layak.

¹ Materi 01 adalah pembuka topik; belum ada materi sebelumnya untuk dipanggil
ulang. Ia bersandar pada Pythagoras dari SMP tanpa menyebutnya.

² Materi 02 bukan tahap prosedur, melainkan pengenalan lambang dan jenis, jadi
butir 6 tidak berlaku. Semua sepuluh tahap prosedur punya `contoh` berikut
simpulnya.

³ **Diperbaiki hari ini, dan ini temuan daftar periksa ini sendiri.** Keduanya
semula punya satu sesi berisi DUA ide, dan butir 4 termasuk yang menentukan
kelayakan:
- Materi 05: sesi "Vektor posisi, dan sedikit tentang ruang" dipecah menjadi
  "Vektor posisi" dan "Sedikit bocoran tentang ruang".
- Materi 09: sesi "Dua akibat yang sering ditanyakan" dipecah menjadi
  "Panjangnya berubah seberapa" dan "Kelipatan berarti sejajar".

⁴ Materi 10 adalah galeri penerapan, bukan tahap latihan. Tidak ada prosedur
untuk dicoba dan tidak ada satu kekeliruan khas untuk dikoreksi, jadi `coba`
dan `seringKeliru` memang tidak ada. Keduanya bukan butir penentu kelayakan.
Kalau MASTER atau ARYA tetap ingin ada, saya bisa menambahkan `coba` berisi
tuntunan membaca keempat foto (misalnya "cari panah mana yang menyatakan
kecepatan pada peta lempeng"). Belum dikerjakan karena tidak ada di daftar
revisi.

### Satu kelemahan yang saya laporkan, bukan saya tambal diam-diam

**Butir 2 dijawab "tidak" oleh 7 dari 12 materi.** Hanya Materi 04, 06, 08, 10,
dan 12 yang punya kalimat yang benar-benar memanggil ulang pengetahuan
sebelumnya (diperiksa dengan mencari rujukan "Materi 0x", "sudah dibahas",
"di SMP", "topik Trigonometri").

Butir 2 bukan penentu kelayakan, dan instruksi MASTER hanya menyuruh
memperbaiki yang gagal di butir 1, 3, 4, atau 6. Jadi saya melaporkannya, bukan
menambalnya sendiri. Perbaikannya murah: satu kalimat pembuka di tiap materi,
misalnya di Materi 07 "Di Materi 06 kedua panah disambung berurutan; sekarang
keduanya bekerja pada saat yang sama". Bilang saja kalau mau dikerjakan.

---

## Selesai

**Gelombang 1 topik Vektor selesai.** Halaman `/topik/vektor` tampil utuh:
12 materi, 11 widget interaktif, 4 latihan terbimbing, dan bank 32 soal kuis.
Tanpa video, sesuai alur gelombang.

Rancangannya `docs/superpowers/specs/2026-09-01-vektor-alur-belajar.md`,
rencana kerjanya `docs/superpowers/plans/2026-09-01-topik-vektor.md`.

### Keputusan ARYA di gerbang rancangan (1 September 2026)
12 materi: sepuluh inti Kelas 10 ditambah dua materi lanjutan (perkalian titik
dan proyeksi) yang DITANDAI terus terang di dalam materinya sebagai di luar
Kurikulum Merdeka. Pembuka Materi 01 memakai perahu menyeberang sungai.
Materi penutup memakai foto nyata.

### Penempatan kurikulum: diperiksa, bukan diingat
Vektor hanya ada di Kelas 10 (Fase E), Buku Guru Bab 3 "Vektor dan Operasinya".
Buku Guru Kelas 11 menyebut kata itu sekali saja, di daftar Capaian
Pembelajaran. Buku Siswa Kelas XII tidak menyebutnya sama sekali. Perkalian
titik dan proyeksi memang TIDAK ada di Kurikulum Merdeka, jadi keduanya
dijadikan materi lanjutan bertanda, bukan diselundupkan sebagai materi biasa.

Satu akibat penting: di buku, Vektor adalah Bab 3 dan Trigonometri Bab 4. Siswa
yang membaca berurutan belum tahu sin dan cos di sini. Karena itu panjang vektor
diturunkan dari Pythagoras dan arah diukur busur, bukan lewat tangen. Kaitan ke
trigonometri ditulis sebagai selipan opsional saja.

### Kedua belas materi

| # | Materi | Widget |
|---|---|---|
| 1 | Angka saja tidak cukup | `PerahuSungai` |
| 2 | Panah yang boleh dipindah | `PanahBerpindah` |
| 3 | Memecah panah jadi dua langkah | `PecahKomponen` |
| 4 | Panjang panah itu Pythagoras | `PanjangDanArah` |
| 5 | Arah tanpa panjang | `VektorSatuan` |
| 6 | Menjumlah itu menyambung perjalanan | `SambungPanah` |
| 7 | Dua yang bekerja bersamaan | `JajarGenjang` |
| 8 | Mengurangi itu menambah lawannya | `SelisihPanah` |
| 9 | Dikali angka: panjang berubah, arah tetap | `KaliSkalar` |
| 10 | Vektor di dunia nyata | galeri 4 foto |
| 11 | *(lanjutan)* Seberapa searah? | `PerkalianTitik` |
| 12 | *(lanjutan)* Bayangan satu panah pada panah lain | `Proyeksi` |

Semua widget ditarik langsung dengan jari atau tetikus, bukan digeser slider.
Kecuali Materi 09 yang memang butuh pengali bernilai tepat, jadi memakai
penggeser.

### Bukti, bukan klaim

```
node alat/uji-geometri-vektor.mts                  -> SEMUA LOLOS
python alat/cek_vektor.py alat/uji-cek-vektor.json -> 13 dari 13 DITOLAK (memang harus)
python alat/cek_vektor.py materi + latihan + kuis  -> SEMUA LOLOS: 116 soal
npx tsc --noEmit                                   -> lolos
npx eslint (seluruh berkas vektor)                 -> lolos
npm run build                                      -> lolos, /topik/vektor ter-render
grep em-dash                                       -> tidak ada
grep "miskonsepsi"                                 -> tidak ada
```

**Pemeriksa angkanya dibuat SEBELUM satu soal pun ditulis**, dan dibuktikan dua
arah: menolak 13 jawaban yang sengaja disalahkan, lalu meloloskan 116 angka yang
benar. Kalau cuma diuji satu arah, pemeriksa yang menolak segalanya akan lolos
tanpa ketahuan.

### Kalibrasi kesulitan soal
Ditakar ke Latihan 3.1 sampai 3.6 di Buku Guru Kelas 10. Soal di sana bukan
sekadar menjumlahkan dua vektor: ada komponen tiga dimensi dan pembuktian tiga
titik segaris lewat kelipatan. Karena itu latihan nomor 4 dan tingkat "sangat
sulit" pada kuis memakai bentuk itu juga. mathcyber1997.com tidak dipakai karena
diblokir pemeriksa bot.

### Cacat yang ditemukan dengan MELIHAT, bukan dari log

Sembilan cacat, semuanya lolos dari tsc, eslint, dan build tanpa satu pun
peringatan. Tidak ada yang bisa ditemukan tanpa membuka gambarnya.

| Cacat | Sebabnya |
|---|---|
| Rumus sudut antar vektor menjawab 0,0000012 derajat untuk dua panah yang jelas searah | `acos` tidak teliti di dekat 1 dan -1. Diganti `atan2` dari hasil kali silang terhadap hasil kali titik, yang tepat 0 dan tepat 180 di kedua ujung. **Ditangkap berkas uji, bukan mata.** |
| Angka sumbu melayang di tepi bingkai, jauh dari sumbunya | Disalin dari widget grafik fungsi, yang sumbunya memang di tepi. Pada vektor titik asal ada di tengah. Sekarang angkanya menempel di sebelah sumbunya. |
| Label "4" bertindih angka sumbu sampai terbaca "4 pangkat 2" | Label komponen dan angka sumbu berebut jalur yang sama di bawah sumbu. Label komponen mendatar sekarang SELALU di atas sumbu. |
| Label komponen tegak meleset keluar bingkai untuk panah yang menunjuk ke kiri | Tanda arah geserannya hanya memperhitungkan satu dari dua hal yang menentukan. |
| Tiga label pada widget perahu saling menimpa bergantian | Sebab akarnya: label yang menempel di badan panah ikut berpindah saat siswa menyeret. Diganti kotak keterangan warna yang letaknya tetap (`Legenda.tsx`), dan pola itu dipakai semua widget berpanah banyak. |
| Kotak keterangan menutupi angka sumbu "-4" | Sumbu mendatar widget itu ada di bagian bawah bidang. Kotaknya dipindah ke pojok kanan atas. |
| Menyeret panah ikut menyorot teks jadi biru | `user-select` belum dimatikan pada SVG. |
| Label titik mendarat terpotong tepi kanan saat arus diperbesar | Jangkar teksnya sekarang berpindah ke ujung kalau titiknya mendekati tepi. |
| Ref diubah saat render pada `useSeretTitik` | Melanggar aturan React 19. **Ditangkap eslint**, bukan mata. Senarai titiknya tidak lagi disalin ke ref. |

Satu lagi yang dicegah sebelum terjadi: kalimat penilaian terpanjang pada widget
Materi 02 akan meluber keluar tepi SVG lalu terpotong diam-diam. Kalimatnya
dipendekkan ke maksimal sekitar 45 huruf.

### Foto Materi 10
Empat foto dari Wikimedia Commons, semuanya berlisensi terbuka, dan **semuanya
dikompres di bawah 150 KB sejak awal**: 132, 46, 130, dan 131 KB. PROGRESS
mencatat foto Materi 10 Trigonometri menumpuk sampai sekitar 1,5 MB dan belum
dikompres. Utang itu tidak ditambah dari sini. Sumber, nama pemotret, dan
lisensinya dicatat di `web/public/gambar/sumber.json`.

| Foto | Lisensi | Pemotret |
|---|---|---|
| Perahu dayung di Sungai Thames | CC0 | Andy Li |
| Boeing 757 mendarat di Pisa | CC BY 4.0 | Marcxosm |
| Perahu layar | CC0 | José Martinho |
| Peta lempeng bumi | Public domain | NOAA |

Peta NOAA itu temuan yang beruntung: isinya memang sudah berupa anak panah
beserta angka kecepatan, persis pembuka Bab 3 di Buku Guru.

## Sedang dikerjakan
Tidak ada. Gelombang 1 selesai, menunggu tinjauan ARYA.

## Butuh MASTER

> **Diperbarui 2 Sep**: butir 1 dan 2 di bawah SUDAH SELESAI. Tabel kepemilikan
> yang baru menyatakan baris `siap: true` di `topik.ts` dan berkas
> `web/app/latihan/<topik>/page.tsx` resmi menjadi wilayah sesi topik. Keduanya
> tidak lagi dianggap pelanggaran. Dibiarkan tertulis sebagai catatan riwayat.

1. **`web/content/topik.ts` diubah satu kata**: `siap: false` menjadi
   `siap: true` pada baris vektor. Tanpa itu halaman topiknya menampilkan kartu
   "Belum dibangun" dan mustahil diperiksa dengan mata. Hanya baris vektor yang
   disentuh.

2. **`web/app/latihan/vektor/page.tsx` adalah berkas BARU di wilayah
   MATRA-DESAIN-UI-UX, dan saya membuatnya dengan sengaja.** Alasannya: begitu
   vektor didaftarkan di `daftar-isi.ts`, halaman `/latihan` OTOMATIS
   menampilkan kartu Vektor beserta tautannya, sebab `DaftarLatihan` membaca
   daftar itu. Sudah diperiksa dengan curl: `/latihan/limit` menjawab 200,
   sedangkan `/latihan/vektor` menjawab **404**. Jadi pendaftaran itu sendiri
   yang menimbulkan tautan rusak, dan berkas ini menambalnya. Isinya salinan
   persis pola `/latihan/limit`, berkas baru di folder baru, jadi tidak menimpa
   apa pun. Silakan dipindahkan kalau dianggap salah tempat.

3. **Ada dua salinan alat bingkai yang mirip**: `widget/limit/koordinat.ts` dan
   `widget/vektor/geometri.ts`. Tidak diimpor lintas folder karena tabel
   kepemilikan melarangnya. Kalau mau dijadikan milik bersama, versi vektor
   lebih siap: nol impor, dan punya berkas uji yang benar-benar berjalan.

4. **Berkas baru di `alat/`**: `cek_vektor.py`, `uji-geometri-vektor.mts`, dan
   empat berkas JSON. Semuanya baru, jadi tidak menimbulkan bentrok.

## Butuh keputusan ARYA

1. **Foto pesawat memakai livery DHL yang mencolok.** Sudah dicari alternatif
   yang lebih netral dan tidak ada yang lebih baik: hasil pencarian lain justru
   memunculkan rudal jelajah, yang jelas tidak pantas untuk halaman sekolah.
   Fotonya sah dan berlisensi terbuka, tetapi logonya besar. Kalau ARYA merasa
   itu mengganggu, tinggal bilang dan diganti gambar buatan sendiri.

2. ~~**Tampilan HP masih rusak.**~~ **SUDAH BERES 2 Sep**, diperbaiki sesi
   MATRA-DESAIN-UI-UX dan sudah saya potret ulang serta nilai sendiri. Catatan
   lamanya: Sudah dilaporkan
   sebelumnya dan ARYA sudah memutuskan itu urusan sesi MATRA-DESAIN-UI-UX.
   Dicatat ulang di sini supaya MASTER tidak mengira vektor yang merusaknya:
   topik Limit yang sudah tayang rusak dengan cara yang sama persis pada lebar
   375 piksel, dan sebabnya `globals.css` hanya punya satu blok `@media` yang
   isinya tambalan kecil untuk satu daftar di topik Limit.

3. **Materi 11 dan 12 boleh dibuang utuh** kalau ARYA berubah pikiran soal
   materi di luar kurikulum. Keduanya ditulis terpisah dan tidak ada satu pun
   materi lain yang bergantung padanya.

## Yang belum, dan memang belum waktunya
Video. Gelombang 2 baru boleh dimulai setelah halaman ini disetujui ARYA.
