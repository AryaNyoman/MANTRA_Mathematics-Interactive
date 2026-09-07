# Laporan MANTRA-TRANSFORMASI-GEOMETRI
Terakhir: 5 September 2026, malam

Topik ketujuh MANTRA, dikerjakan di worktree `mantra-transformasi-geometri`.
Isi: 13 materi, 12 widget, dan 6 video. Berkas ini mencatat apa yang sudah
dikerjakan, cacat apa yang ditemukan, dan bagaimana ditemukannya.

---

## Video 01 sampai 06 pada 480p: keadaan sekarang

Semuanya terukur pada berkas jadi di `media/uji-480p/`, bukan dikira-kira.

| Video | Materi | Adegan | Detik | Gerak pertama | Diam terpanjang |
|---|---|---|---|---|---|
| 01 setiap titik | 01 | `TransformasiSetiapTitik` | 130,0 | 3,00 s | 5,6 s @ 124 s |
| 02 cermin garis | 02 | `TransformasiCerminGaris` | 124,9 | 0,75 s | 7,2 s @ 106 s |
| 03 rotasi | 06 | `TransformasiRotasi` | 130,4 | 0,38 s | 4,8 s @ 79 s |
| 04 dilatasi | 07 | `TransformasiDilatasi` | 62,9 | 0,25 s | 5,1 s @ 41 s |
| 05 matriks | 09 | `TransformasiMatriks` | 143,6 | 0,38 s | 5,2 s @ 85 s |
| 06 urutan | 12 | `TransformasiUrutan` | 142,6 | 0,75 s | 5,4 s @ 30 s |

Enam dari enam memenuhi batas lima detik untuk gerak pertama. Selisih gambar
dengan suara di bawah 0,35 detik untuk semuanya, jauh di dalam batas 1,5 detik
`gabung_audio.py`. Tiap video punya pasangan `-bersubtitle` untuk ditonton ARYA.

Video 04 masih 63 detik sementara lima lainnya 125 sampai 144 detik. Naskahnya
belum diperpanjang; yang diperbaiki sesi ini cuma layar matinya, bukan isinya.

---

## Urutan belajar: pelajaran termahal sesi ini

ARYA menemukan video 01 memakai **dilatasi** padahal siswa baru diajari
translasi. Sebabnya urutan materi disusun menurut logika Claude, bukan menurut
urutan buku. Perintah ARYA setelah itu tegas:

> "intinya jangan sebut istilah yang belum dipelajari oleh siswa, agar siswa
> tidak kebingungan. prioritaskan urutan belajar!"

Yang dikerjakan:

1. **Materi diurutkan ulang mengikuti buku**, dan 36 rujukan silang "Materi NN"
   dipetakan ulang (`alat/urutkan_ulang.py`). Peta akhirnya: cermin garis lurus,
   cermin garis miring, dan cermin titik naik ke nomor 2, 3, 4; translasi turun
   ke nomor 5.
2. **Kotak "keterangan yang jujur" dihapus.** Isinya penjelasan kurikulum untuk
   guru, bukan untuk siswa, dan ARYA memintanya dibuang.
3. **`alat/cek_urutan_belajar.py` dibuat.** Ia membaca 13 halaman materi DAN
   enam naskah video, lalu menolak tiap istilah yang muncul sebelum materinya
   diajarkan. Sekarang: SEMUA LOLOS.

Yang SENGAJA dibolehkan alat itu:

- **Kata sehari-hari** seperti "geser" dan "memutar". Itu bahasa Indonesia,
  bukan istilah. Melarangnya akan memaksa kalimat jadi kaku tanpa menolong
  siapa pun.
- **Kalimat janji** seperti "nanti kita buktikan" dan "akan dibahas". Menyebut
  bahwa sesuatu akan datang tidak sama dengan memakainya, dan janji semacam itu
  justru mengikat materi jadi satu jalan cerita. Video 03 menagih satu janji
  Materi 04 di babak "sama".

---

## Video 03 rotasi: empat putaran render, empat kelas cacat

Naskahnya diperpanjang dari 68 ke 130 detik, dari 10 ke 18 babak. Yang
ditambahkan: uji aturan pada satu titik, contoh kedua 270 derajat, babak
kekeliruan arah, pusat putaran yang bukan titik asal, dan rangkuman berbusur.

### Cacat yang lolos gerbang otomatis dan baru ketahuan di lembar kontak

| Cacat | Sebab | Perbaikan |
|---|---|---|
| Titik merah nyangkut di (0, 4) **sepanjang sisa video** | `ujung` (penanda ujung jarum) tidak ikut dibuang saat jarumnya dibuang | dibuang bersama rombongannya di babak "bentuk" |
| Panel memajang rumus setengah putaran selama 27 detik **sementara layar memutar seperempat** | rumus utama tidak dikembalikan sesudah babak puncak | `ganti_rumus` balik ke aturan 90 derajat di babak "keliru" |
| Bentuk 37 derajat cuma tampil **2,5 detik** lalu ditimpa | rangkuman memunculkan lagi peta 90 derajat | busur rangkuman diarahkan ke bentuk 37 derajat yang sudah ada; kamera baru pindah di situ, ke kotak terbesar video ini |
| Label penutup "di sini?" tergores garis sumbu, angka 1 menimpa hurufnya | ditempel ke kanan titik asal, tepat di jalur angka sumbu | dipindah ke kiri atas |
| Tulisan "1 kiri" dan "6 naik" mengulang persis kalimat narator, dan "6 naik" menindih angka 3 | melanggar aturan proyek: tulisan di gambar hanya untuk yang TIDAK diucapkan | keduanya dibuang; jalurnya sendiri tetap ada, jadi putus-putus dan lebih tebal supaya tidak terbaca sebagai tepi bentuk |

### Enam kotak kamera, dan itu bukan kerumitan yang dicari-cari

Rotasi memindahkan benda ke seberang pusatnya, jadi prapeta dan petanya nyaris
tidak pernah berdekatan. Satu kotak yang menampung semua peta video ini
berukuran 11 kali 14 satuan, dan pada ukuran itu bentuk L-nya tinggal
sepersepuluh lebar layar: sumbunya masih terbaca, koordinat sudutnya tidak.
Karena peta-peta itu muncul bergantian, kameranya ikut berpindah.

Babak "keliru" dan "betul" memakai **jarum jam**, bukan bentuk L, dan naskahnya
diubah untuk itu. Kalimatnya sendiri berbunyi "searah jarum jam", jadi jarum
jam benda yang paling tepat. Ada alasan kedua: hasil putar +90 dan -90 pada
bentuk L terpisah 12 satuan, dan menampilkan keduanya memaksa kamera mundur
sampai bentuknya tidak terbaca lagi.

---

## Video 05 matriks dan 06 urutan: rumus dunia menindih angka sumbu

Keduanya diperpanjang: 05 dari 77 ke 144 detik (10 ke 16 babak), 06 dari 81 ke
143 detik (10 ke 15 babak).

### Cacat yang sama di kedua video

Rumus kerja ditaruh **di dalam bidang petak**, dan setiap satu di antaranya
menindih angka sumbu. `qc.periksa_adegan` meloloskannya, dan memang seharusnya
begitu: benda dunia lawan benda dunia sengaja dibolehkan bersentuhan, sebab
label yang menempel pada bendanya adalah hal normal. **Yang salah tata
letaknya, bukan gerbangnya.**

Perbaikannya: **kotak kamera dan kotak petak dipisah**. Petak berhenti tepat di
batas yang dibutuhkan gambar; kamera menjangkau dua sampai tiga satuan lebih ke
bawah; selisih itulah ruang rumus, bersih dari satu angka sumbu pun.

Harganya jujur: skala video 05 turun dari 1,04 ke 0,83, jadi persegi satuannya
20 persen lebih kecil. Itu harga yang pantas untuk rumus yang tidak bertindih.

### Ukuran huruf yang ikut menciut

Rumus adalah benda dunia, dan benda dunia menciut bersama kamera. Rumus 32 pada
kotak berskala 0,52 tampil sebagai 16, dan 16 tidak layak dibaca.
`sinema.batasi_lebar` tidak bisa menolong: ia hanya MENGECILKAN yang kelewat
lebar, tidak pernah membesarkan yang kelewat kecil.

Dibuat `transformasi_umum.rumus_dunia`, yang membesarkan tiap rumus dengan
1/skala kamera sehingga ukurannya DI LAYAR sama berapa pun kotaknya, dan yang
batas lebarnya dinyatakan dalam satuan layar, bukan satuan dunia.

### Cacat yang saya buat sendiri lalu tangkap sendiri

**Delapan kali seluruh bidang petak berkedip** di video 06, semata supaya tiap
babak lolos ukuran gerak `alat/ukur_detik_pertama.py`. Itu persis yang dilarang
docstring `alat/tambah_sorotan.py` yang saya tulis sendiri: menyorot sembarang
benda supaya angka diamnya turun memperbaiki angkanya dan merusak videonya.

Semuanya diganti kejadian yang punya arti:

| Babak | Pengganti |
|---|---|
| dua | kotak baca koordinat: tiga ke kanan, satu ke atas |
| beda, kenapa, hasil, jaga | sorotan pada rumus yang memang sedang dibicarakan |
| tutup | hasil urutan tertukar DIGAMBAR, bukan cuma ditulis |
| sama | dua juring putaran, 30 lalu 60 derajat |
| rangkum | segitiga dicerminkan dua kali dan kembali ke tempat semula |

Segitiga uji video 06 juga diperbesar dari sesisi satu jadi sesisi dua satuan.
Pada skala 0,59 segitiga sesisi satu cuma 0,6 satuan layar, terlalu kecil untuk
membandingkan dua hasil, padahal membandingkan dua hasil justru tugasnya.

---

## Video 04 dilatasi: layar mati 12,2 detik, ditemukan dengan mengukur

Video 04 tidak diminta pada putaran ini, dan sudah dianggap jadi. Waktu semua
video diukur sekali lagi untuk mengisi tabel di atas, `ukur_detik_pertama.py`
melaporkan **rentang diam 12,2 detik** pada detik 6,2 sampai 18,4, menembus dua
babak sekaligus. Itu yang terpanjang di seluruh enam video, dan letaknya tepat
sesudah kartu judul, bagian yang paling menentukan penonton bertahan atau tidak.

Bukan cuma angkanya yang buruk. Kalimat yang berjalan di situ berbunyi "kamu
memperbesar foto di ponsel dengan dua jari, ada satu titik yang tidak bergerak",
lalu "titik itu pusatnya". Kalimat "ada satu titik yang tidak bergerak" hanya
bisa diperiksa siswa kalau ada yang BERGERAK di sebelahnya. Layar yang diam
membuat pernyataan itu tidak bisa dibantah maupun dibenarkan.

Perbaikannya tanpa mengubah satu kata narasi: cubitan dua jarinya diperagakan.
Bentuknya membesar 1,3 kali lalu mengecil kembali terhadap titik asal, sekali di
babak "foto" dan sekali lagi di babak "pusat" sesudah pusatnya ditandai.

Label sudut A, B, C ditunda ke babak "sinar". Label adalah benda dunia yang
tidak ikut membesar, jadi ia akan lepas dari sudutnya selama cubitan; ketiga
babak awal juga tidak menyebut satu pun nama sudut. Sesudah perbaikan, diam
terpanjang video 04 turun dari 12,2 ke 5,1 detik.

---

## Alat mutu yang dibuat sesi ini

Semuanya diuji dengan kerusakan yang SENGAJA ditanam, sebab penjaga yang tidak
pernah gagal belum terbukti menjaga.

Semuanya juga ditaruh di **`alat/`**, bukan `qc/`. Itu perbaikan menit terakhir:
`qc/` ada di `.gitignore` (tempat lembar kontak dan keluaran sementara), jadi
lima alat yang ditulis sesi ini akan lenyap begitu cabangnya digabung. Alat
mutu yang hilang saat digabung sama saja dengan alat mutu yang tidak pernah
dibuat.

| Alat | Yang dijaganya | Bukti ia bisa menolak |
|---|---|---|
| `alat/cek_urutan_belajar.py` | istilah muncul sebelum materinya diajarkan | menangkap 58 pemakaian dini sebelum diperbaiki |
| `alat/cek_kejadian.py` | babak tanpa kejadian besar, DIPERIKSA SEBELUM RENDER | kerusakan tanam pada salinan adegan: babak yang dikosongkan tertangkap |
| `alat/warna_sorot.py` | `Indicate` berwarna sama dengan warna bendanya, jadi sorotannya tidak terlihat | menemukan 8 di tiga video |
| `alat/peta_diam.py` | memasangkan tiap rentang diam dengan kalimat narasinya | dipakai menilai video 02 dan 03 |
| `transformasi_umum.tempel_label` | label tergambar DI DALAM benda yang dinamainya | `alat/uji_tempel_label.py`: 3 dari 3 uji lolos, termasuk kerusakan tanam |
| `transformasi_umum.rumus_dunia` | ukuran huruf rumus dunia ikut menciut bersama kamera | dipakai di video 05 dan 06 |

### `alat/cek_kejadian.py` diperbaiki: rumus dunia itu besar, rumus panel kecil

Versi pertama menghitung semua `rumus(` sebagai benda tipis. Itu benar untuk
panel, yang cuma selebar 4,75 satuan layar, tetapi salah untuk rumus yang
berdiri di dunia membentang 5 sampai 9 satuan. Alat itu menandai dua babak
video 05 sebagai berisiko diam, padahal di keduanya sebuah rumus selebar dua
pertiga layar muncul, berubah, atau memudar. Tandanya `move_to`: rumus panel
diletakkan `PapanRumus` sendiri, rumus dunia harus dipindahkan tangan.

---

## Angka video sekarang diperiksa mesin

Adegan video 06 dulu menulis di komentarnya bahwa angkanya "diperiksa mesin
lewat `alat/cek_transformasi.py` dengan awalan V06". **Itu tidak benar**:
berkas itu tidak pernah membaca satu naskah video pun, dan awalan V06 tidak ada
di mana-mana. Klaim tentang pemeriksaan yang tidak terjadi lebih berbahaya
daripada tidak ada klaim sama sekali, sebab ia membuat sesi berikutnya percaya
angkanya sudah aman.

Dibuat `alat/klaim-video-transformasi.json`: 31 klaim angka dari naskah video
03, 05, dan 06, diperiksa `alat/cek_transformasi.py` yang hitungannya ditulis
ulang dari nol dengan `Fraction`, tidak mengimpor apa pun dari widget.

    materi-transformasi-geometri.json      58 dari 58 lolos
    soal-latihan-transformasi.json         13 dari 13 lolos
    soal-kuis-transformasi.json            35 dari 35 lolos
    klaim-video-transformasi.json          31 dari 31 lolos
    SEMUA LOLOS: 137 klaim diperiksa.

Yang termasuk di dalamnya: janji Materi 04 bahwa setengah putaran sama dengan
cermin pada titik asal; rotasi terhadap pusat bukan titik asal lewat tiga
langkah; kedua hasil kali matriks video 06 beserta kedua garis cerminnya; dan
contoh tandingan bahwa dua rotasi boleh ditukar.

Klaim video 01, 02, dan 04 **belum** dikodekan. Itu pekerjaan yang tersisa,
bukan pekerjaan yang sudah selesai.

---

## Berkas pendamping: dua cacat yang ditemukan MASTER, bukan saya

Saat memasang video ke situs (6 Sep), MASTER menemukan dua cacat yang lolos
dari SELURUH gerbang proyek ini. Keduanya milik saya.

| Cacat | Keadaannya | Sebab |
|---|---|---|
| Subtitle basi | `transformasi5-matriks.vtt` berhenti di detik 77 padahal videonya 144 detik; `transformasi6-urutan.vtt` berhenti di 81 padahal 143 | naskah diperpanjang, `buat_subtitle.py` tidak dijalankan ulang |
| Poster kosong | poster Materi 06 dan 07 berukuran persis sama 2.635 byte, keduanya RATA SATU WARNA; poster Materi 09 tidak ada | frame diambil pada detik yang jatuh di layar kosong, dan tak ada yang memeriksanya |

Keduanya berbentuk sama: **berkas pendamping ketinggalan saat videonya
berubah**. Video diperiksa berlapis-lapis di proyek ini, berkas pendampingnya
tidak sama sekali. Itu celah yang saya buka sendiri dengan memperpanjang naskah
tanpa memeriksa apa lagi yang bergantung padanya.

Yang dikerjakan:

1. Ketiga `.vtt` dibuat ulang. Sekarang isyarat terakhirnya jatuh di 143,7 s
   (video 143,6), 142,6 s (video 142,6), dan 130,4 s (video 130,4).
2. Poster 03, 04, dan 05 dibuat dari frame yang dipilih dengan menonton, lalu
   DILIHAT satu per satu: 03 detik 121 (bentuk 37 derajat beserta busurnya),
   04 detik 44 (perbesaran dua kali dengan sinar dari pusat, panel menyebut
   luas empat kali), 05 detik 47 (persegi satuan, kedua panah kolom, dan
   matriksnya).
3. **`alat/buat_poster.py`** dibuat: mengambil frame lalu MENOLAK yang kosong.
   Ambangnya dikalibrasi ke berkas yang sungguh ada, bukan dikarang. Percobaan
   pertama memakai ambang 1,5 persen tinta dan menolak SELURUH poster proyek
   ini termasuk yang jelas bagus, sebab video MANTRA memang gambar garis di
   atas kertas. Angka yang dipakai sekarang: tolak di bawah 0,35 persen,
   peringatan di bawah 0,60.
4. **`alat/cek_aset_video.py`** dibuat: satu perintah memeriksa keenam video
   punya subtitle yang panjangnya masuk akal DAN poster yang tidak kosong.
   Dibuktikan bisa menolak dengan menanam kedua kerusakan itu kembali.

Satu temuan sampingan yang BUKAN milik topik ini: `vektor6-sambung.jpg`
posternya bidang petak kosong tanpa satu vektor pun, untuk video tentang
menyambung vektor. Ia tertangkap alat baru itu dan sengaja dibiarkan
tertangkap, tetapi perbaikannya milik sesi Vektor.

---

## Yang belum dikerjakan

- **Video 04 masih 63 detik**, kurang dari separuh panjang lima video lain.
  Isinya sepuluh babak, sedangkan video 03, 05, dan 06 sudah 15 sampai 18.
  Materi 07 punya bahan untuk diperpanjang: faktor pecahan, pusat yang bukan
  titik asal, dan kekeliruan luas yang cuma disinggung sekali. Layar matinya
  sudah beres; panjangnya belum.
- Klaim angka video 01, 02, dan 04 belum masuk `klaim-video-transformasi.json`.
  Yang sudah: 03, 05, 06.
- Video 02 masih punya rentang diam 7,2 detik pada detik 106, yang terpanjang
  di antara keenam video. Narasinya di situ membahas cermin mendatar lalu
  rangkuman, jadi layarnya masih relevan, tetapi angkanya menonjol.
- `alat/cek_kejadian.py` masih menandai satu babak video 01 ("aturan") sebagai
  berisiko dinilai diam. Pengukuran pada video jadi TIDAK membenarkan
  peringatan itu: diamnya di bawah 5,1 detik dan tidak masuk empat terpanjang.
  Peringatan dibiarkan berdiri, sebab alat itu memang dirancang berhati-hati
  berlebihan, dan pengukuran pada video jadi yang berhak memutuskan.
- Video 05 gambarnya kecil: bidang petaknya cuma memakai sekitar seperempat
  lebar layar, sebab kotak kamera harus menyediakan ruang rumus di bawahnya.
  Ini bukan cacat, tetapi juga bukan tata letak terbaik yang mungkin. Sebab
  dasarnya `letak_peta` memesan sisi kanan layar untuk panel di SELURUH tinggi
  kotak, padahal panelnya cuma menempati sudut kanan atas.
- Render 1080p belum dijalankan. Semua yang ada masih 480p untuk direvisi ARYA.

**SIAP GABUNG** untuk keenam video pada 480p, dengan catatan sisa di atas
disebutkan apa adanya.
