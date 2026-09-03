# Transformasi Geometri: alur belajar 13 materi (topik ketujuh MANTRA)

**Tanggal:** 3 September 2026 · **Disetujui ARYA:** ya, sesi transformasi-geometri
**Cabang:** `sesi/transformasi-geometri` · **Worktree:** `.claude/worktrees/mantra-transformasi-geometri`
**Target sekarang:** materi + widget interaktif + soal. **Tanpa video** (keputusan ARYA 3 Sep).

---

## 1. Keputusan yang sudah diambil ARYA

| Pertanyaan | Jawaban ARYA |
|---|---|
| Cakupan sub-materi | **Semua**: translasi, refleksi, rotasi, dilatasi, komposisi, matriks transformasi |
| Kelengkapan sekarang | **Materi + widget saja.** Video belakangan |
| Matriks belum ada di MANTRA | **Ajarkan matriks secukupnya di dalam topik ini**, bukan bikin topik Matriks tersendiri |
| Urutan materi | **Mulai dari translasi**, menyimpang dari urutan buku yang mulai dari pencerminan |
| Setelah spesifikasi | **Langsung mulai**, tanpa gerbang tinjauan spesifikasi |

Keputusan yang diambil Claude sendiri dan disampaikan ke ARYA:

- Tahap "Transformasi" di topik Grafik Fungsi **ditautkan, tidak diulang**. Itu
  barang lain: yang dipindah di sana adalah kurva lewat rumusnya, di sini titik
  lewat pemetaan.
- Berkas pembantu (`useSeret`, geometri koordinat) **disalin** ke folder topik
  ini, tidak diimpor lintas topik dan tidak dipromosikan ke folder bersama.
  Alasannya di bagian 4.

## 2. Sumber kurikulum (diperiksa, bukan diingat)

Sumber utama: `D:\BAHAN MATEMATIKA\3 Dimensi.pdf`. **Nama berkasnya menyesatkan**:
isinya Buku Siswa Matematika SMA Kelas XI (Kurikulum Sekolah Penggerak, Tim
Penulis, Oktober 2021), bukan geometri ruang.

Transformasi Geometri di situ adalah **Bab 4, halaman buku 175 sampai 227**
(halaman PDF 191 sampai 243). Susunan resminya:

| Bagian buku | Halaman buku | Isi |
|---|---|---|
| A. Transformasi pada Bidang Kartesius | 177 | 1. Pencerminan terhadap Garis, 2. Pencerminan terhadap Titik, 3. Translasi, 4. Rotasi, 5. Dilatasi |
| B. Kaitan Matriks dengan Transformasi | 201 | matriks untuk kelima transformasi di atas |
| C. Komposisi Transformasi dengan Menggunakan Matriks | 214 | gabungan transformasi lewat perkalian matriks |

Garis cermin yang benar-benar dibahas buku, terverifikasi dari isi halaman:
**sumbu X**, **sumbu Y**, **garis `y = x`**, **garis `y = -x`**, **garis `x = k`**,
**garis `y = h`**, dan **pencerminan terhadap sebuah titik**.

Dua hal dari buku yang wajib ditiru apa adanya:

1. **Translasi ditulis sebagai PENJUMLAHAN matriks kolom**, sedangkan pencerminan,
   rotasi, dan dilatasi ditulis sebagai **perkalian** matriks 2x2. Buku menyebut
   bagian itu "menemukan operasi matriks yang berkaitan dengan operasi translasi",
   bukan perkalian. Perbedaan ini menjadi kotak `seringKeliru` di Materi 10.
2. **Istilah "prapeta" dan "peta"** dipakai buku untuk objek asal dan hasilnya.
   Istilah mengikuti buku pemerintah, bukan karangan sendiri.

### Masalah prasyarat, dan bagaimana diselesaikan

Bab 3 buku yang sama adalah **Matriks** (halaman buku 130 sampai 174, termasuk
"Determinan dan Invers Matriks" di halaman 153). MANTRA tidak punya topik
Matriks. `STANDAR-MENGAJAR.md` butir 1.1 melarang memakai gagasan yang belum
dimiliki siswa.

Jalan keluarnya (disetujui ARYA): **Materi 09 mengajarkan matriks secukupnya**,
yaitu matriks 2x2 dikalikan koordinat sebuah titik, dan perkalian dua matriks
2x2 untuk komposisi. Tidak lebih. Determinan disebut sekali saja di Materi 08
sebagai cara membaca perubahan luas, tanpa dijadikan prosedur hitung.

Dua prasyarat lain **sudah ada** di MANTRA dan letaknya lebih awal, jadi sah
dipanggil ulang:

| Prasyarat | Sudah ada di | Dipakai di |
|---|---|---|
| Penjumlahan vektor, notasi komponen | topik **Vektor** (Kelas 10) | Materi 02 (translasi) |
| sin dan cos sebuah sudut | topik **Trigonometri** (Kelas 10) | Materi 06 (rotasi sudut sembarang) |

Label kelas topik ini: **"Kelas 11"**, `urutanKelas: 11`.

## 3. Tiga belas materi

Bendanya satu bentuk **tidak simetris**: huruf L dengan enam titik sudut, tiga
di antaranya diberi nama A, B, C untuk dipakai di tabel angka. Bentuk simetris
akan menyembunyikan hasil pencerminan, jadi ketidaksimetrisan itu syarat, bukan
selera.

| # | slug | judul | labelPendek | widget |
|---|---|---|---|---|
| 01 | `prapeta-dan-peta` | Setiap titik ikut pindah | Prapeta | `papan-bebas` |
| 02 | `translasi` | Menggeser sejauh sebuah vektor | Translasi | `geser-bentuk` |
| 03 | `cermin-garis-lurus` | Cermin pada garis tegak dan mendatar | Cermin lurus | `cermin-lurus` |
| 04 | `cermin-garis-miring` | Cermin pada garis y = x dan y = -x | Cermin miring | `cermin-miring` |
| 05 | `cermin-titik` | Cermin pada sebuah titik | Cermin titik | `cermin-titik` |
| 06 | `rotasi` | Memutar terhadap sebuah pusat | Rotasi | `putar-bentuk` |
| 07 | `dilatasi` | Memperbesar dan memperkecil | Dilatasi | `perbesar-bentuk` |
| 08 | `yang-tetap` | Apa yang tetap, apa yang berubah | Yang tetap | `meja-ukur` |
| 09 | `matriks-secukupnya` | Matriks secukupnya | Matriks | `mesin-matriks` |
| 10 | `matriks-transformasi` | Matriks tiap transformasi | Matriksnya | `cocokkan-matriks` |
| 11 | `komposisi` | Dua transformasi berurutan | Komposisi | `dua-langkah` |
| 12 | `komposisi-matriks` | Komposisi lewat perkalian matriks | Urutan | `urutan-matriks` |
| 13 | `dunia-nyata` | Dipakai di dunia nyata | Nyata | `dunia-nyata-transformasi` |

### Materi 01: Setiap titik ikut pindah

**Pertanyaan pembuka.** Bayangan wajahmu di kaca dan stiker yang kamu geser di
layar ponsel, apa yang sama dari keduanya?

**Gagasan tunggal.** Transformasi bukan menggeser gambar sebagai satu benda utuh.
Transformasi adalah **aturan yang memberi setiap titik sebuah tujuan**. Gambar
ikut pindah karena semua titiknya pindah, bukan sebaliknya.

Istilah diberikan setelah bendanya dilihat: **prapeta** (bentuk asal) dan
**peta** (hasilnya), memakai istilah buku.

**Widget `papan-bebas`.** Satu bentuk L, satu tombol pilih di antara lima
transformasi. Beberapa titik sudutnya diberi tanda, dan garis putus-putus
menghubungkan tiap titik prapeta ke pasangannya di peta, sehingga terlihat
bahwa yang bekerja adalah pemetaan titik ke titik.

**Sering keliru.** "Yang dipindah kan gambarnya, bukan titiknya." Menggoda
karena di layar memang gambar yang terlihat bergerak. Cara membedakannya: pilih
dilatasi dengan k = 2, lalu perhatikan jarak antartitik ikut berubah. Kalau yang
dipindah gambar sebagai benda kaku, jarak itu mustahil berubah.

**Intisari.** Transformasi memasangkan setiap titik dengan satu titik tujuan.
Prapeta adalah asal, peta adalah hasil. Lima transformasi dipelajari di topik ini.

### Materi 02: Menggeser sejauh sebuah vektor

**Pertanyaan pembuka.** Kalau seluruh isi peta digeser 3 langkah ke kanan dan 2
ke atas, apa yang berubah dari sebuah titik di dalamnya, dan apa yang tidak?

**Panggil ulang.** Di topik Vektor kita sudah menjumlahkan dua vektor lewat
komponennya. Translasi memakai persis operasi itu, hanya diterapkan pada titik.

**Aturannya.** Titik `P(x, y)` oleh translasi `(a, b)` menjadi
`P'(x + a, y + b)`.

**Contoh berlangkah.** `A(1, 2)` oleh translasi `(4, -3)`. Baris per baris:
komponen mendatar dijumlah karena geseran mendatar menambah nilai x, jadi
`1 + 4 = 5`; komponen tegak dijumlah karena geseran tegak menambah nilai y,
jadi `2 + (-3) = -1`; jadi `A'(5, -1)`.

**Coba.** `B(-2, 5)` oleh translasi `(3, 1)`. Penuntun: jumlahkan x dengan 3,
lalu y dengan 1. Jawaban `B'(1, 6)`.

**Widget `geser-bentuk`.** Vektor translasinya berupa panah yang ujungnya bisa
ditarik. Bentuk L prapeta tetap terlihat samar, peta ikut bergerak. Tabel angka
menunjukkan A, B, C dan A', B', C' berdampingan.

**Sering keliru.** "Translasi `(3, -2)` berarti geser 3 ke kanan dan 2 ke atas."
Menggoda karena angka 2 dibaca lepas dari tandanya. Cara membedakannya: tanda
minus pada komponen tegak berarti nilai y berkurang, dan y berkurang artinya
turun.

**Intisari.** Translasi menambahkan vektor geseran ke koordinat setiap titik.
Bentuk, ukuran, dan arah putarnya tidak berubah, hanya letaknya.

### Materi 03: Cermin pada garis tegak dan mendatar

**Pertanyaan pembuka.** Kalau kamu berdiri 2 meter di depan kaca, di mana
bayanganmu berada, dan kenapa di situ?

**Gagasan tunggal.** Pencerminan pada sebuah garis memindahkan titik ke sisi
seberang garis itu, **tegak lurus terhadap garisnya**, dengan **jarak yang sama**.
Garis cerminnya sendiri tidak bergeser sedikit pun.

Dimulai dari kasus paling sederhana, sumbu X dan sumbu Y, lalu garis cerminnya
digeser menjadi `x = k` dan `y = h`. Keduanya satu gagasan yang sama: sumbu
hanyalah kasus `k = 0`.

**Aturannya.**

| Cermin | Peta dari `P(x, y)` |
|---|---|
| sumbu X (garis `y = 0`) | `(x, -y)` |
| sumbu Y (garis `x = 0`) | `(-x, y)` |
| garis `x = k` | `(2k - x, y)` |
| garis `y = h` | `(x, 2h - y)` |

**Contoh berlangkah.** `A(1, 2)` dicerminkan pada garis `x = 5`. Jarak A ke
garis adalah `5 - 1 = 4`, jadi bayangannya harus 4 satuan di seberang, yaitu
pada `5 + 4 = 9`. Nilai y tidak disentuh karena garis cerminnya tegak. Jadi
`A'(9, 2)`. Diperiksa dengan rumus: `2(5) - 1 = 9`. Cocok.

**Coba.** `B(3, -1)` dicerminkan pada garis `y = 2`. Penuntun: jaraknya
`2 - (-1) = 3`, jadi bayangannya 3 di atas garis. Jawaban `B'(3, 5)`.

**Widget `cermin-lurus`.** Garis cerminnya bisa dipilih tegak atau mendatar dan
digeser. Untuk setiap titik sudut, garis putus-putus tegak lurus ke cermin
digambar, dan kedua potongannya diberi angka jarak yang sama.

**Sering keliru.** "Dicerminkan pada garis `x = 5` berarti nilai x dikurangi 5."
Menggoda karena angka 5 memang ada di rumus garisnya. Cara membedakannya:
gambar dulu, lalu hitung jaraknya. Titik `x = 1` yang dikurangi 5 memberi -4,
padahal bayangannya jelas berada di kanan garis, bukan jauh di kiri.

### Materi 04: Cermin pada garis y = x dan y = -x

**Pertanyaan pembuka.** Apa yang terjadi pada titik `(3, 7)` kalau dicerminkan
pada garis yang membelah kuadran pertama tepat di tengah?

**Gagasan tunggal.** Pada garis `y = x`, **koordinatnya bertukar tempat**:
`(x, y)` menjadi `(y, x)`. Pada garis `y = -x`, koordinatnya bertukar tempat
**dan keduanya berganti tanda**: `(x, y)` menjadi `(-y, -x)`.

Alasannya ditunjukkan lewat gambar sebelum rumusnya ditulis: garis `y = x`
adalah tempat semua titik yang kedua koordinatnya sama, jadi mencerminkannya
sama dengan menukar peran mendatar dan tegak.

**Contoh berlangkah.** `A(2, 5)` pada `y = x` menjadi `A'(5, 2)`. Pada `y = -x`
menjadi `A''(-5, -2)`.

**Coba.** `B(-3, 4)` pada `y = -x`. Penuntun: tukar dulu jadi `(4, -3)`, lalu
kedua tanda dibalik. Jawaban `B'(-4, 3)`.

**Widget `cermin-miring`.** Kedua garis miring bisa dipilih. Nilai koordinat
prapeta dan peta ditampilkan berdampingan, dan saat pencerminannya berjalan,
angka yang bertukar disorot supaya pertukarannya terlihat, bukan cuma terbaca.

**Sering keliru.** "Cermin pada `y = -x` cukup membalik tanda, tanpa menukar."
Menggoda karena tanda minus lebih menarik perhatian daripada pertukaran
posisinya. Cara membedakannya: uji dengan titik yang kedua koordinatnya berbeda
jauh, misalnya `(1, 9)`. Kalau cuma tanda yang dibalik, hasilnya `(-1, -9)`,
dan itu tidak berada tegak lurus dari garisnya.

### Materi 05: Cermin pada sebuah titik

**Pertanyaan pembuka.** Kalau pusat cerminnya bukan garis, tapi satu titik,
ke mana sebuah titik lain akan pergi?

**Gagasan tunggal.** Pencerminan pada titik `M` memindahkan `P` ke seberang `M`
sepanjang garis lurus `PM`, dengan jarak yang sama. Akibatnya `M` selalu tepat
di tengah antara `P` dan `P'`.

**Aturannya.** Pada titik asal `O(0, 0)`: `(x, y)` menjadi `(-x, -y)`. Pada
titik `M(a, b)`: `(x, y)` menjadi `(2a - x, 2b - y)`.

**Jembatan ke materi berikutnya.** Pencerminan pada sebuah titik memberi hasil
yang sama dengan **memutar setengah lingkaran** terhadap titik itu. Ini
disebutkan di sini, dan dibuktikan di Materi 06.

**Contoh berlangkah.** `A(1, 2)` pada `M(3, 3)`. Titik tengahnya harus M, jadi
`(1 + x')/2 = 3` memberi `x' = 5`, dan `(2 + y')/2 = 3` memberi `y' = 4`. Jadi
`A'(5, 4)`. Diperiksa dengan rumus: `2(3) - 1 = 5` dan `2(3) - 2 = 4`. Cocok.

**Coba.** `B(4, -1)` pada `M(1, 2)`. Jawaban `B'(-2, 5)`.

**Widget `cermin-titik`.** Pusat cerminnya bisa ditarik ke mana saja. Garis
lurus dari prapeta melewati pusat ke peta digambar, dengan dua potongan berangka
yang selalu sama panjang.

### Materi 06: Memutar terhadap sebuah pusat

**Pertanyaan pembuka.** Jarum jam berputar 90 derajat. Kalau ujungnya semula
di `(4, 0)`, di mana ia sekarang, dan apa yang menentukan jawabannya?

**Urutan sengaja bertahap.** Sudut bulat dulu, karena hasilnya bisa dibaca
langsung dari gambar tanpa kalkulator. Sudut sembarang belakangan, karena butuh
sin dan cos.

**Aturannya, sudut bulat, pusat di titik asal, arah berlawanan jarum jam:**

| Sudut | Peta dari `P(x, y)` |
|---|---|
| 90 derajat | `(-y, x)` |
| 180 derajat | `(-x, -y)` |
| 270 derajat | `(y, -x)` |

**Yang harus disadari siswa.** Baris 180 derajat itu **persis** rumus
pencerminan pada titik asal di Materi 05. Jadi janji di materi sebelumnya
terbukti, bukan cuma diklaim.

**Sudut sembarang.** Panggil ulang Trigonometri: `P(x, y)` diputar sejauh
`a` terhadap titik asal menjadi
`(x cos a - y sin a, x sin a + y cos a)`.

Rumus ini **diturunkan, tidak diberikan**: titik dituliskan lewat jaraknya dari
pusat dan sudutnya, lalu sudutnya ditambah, lalu dibuka dengan rumus jumlah
sudut yang sudah ada di topik Trigonometri.

**Pusat bukan titik asal.** Resep tiga langkah: geser supaya pusat pindah ke
titik asal, putar, geser kembali.

**Widget `putar-bentuk`.** Penggeser sudut dari -360 sampai 360 derajat, dengan
tanda berhenti di 90, 180, 270. Pusat putarnya bisa ditarik. Busur sudut
digambar dari prapeta ke peta untuk satu titik sudut yang disorot.

**Sering keliru.** "Rotasi 90 derajat berarti nilai x dan y ditukar."
Menggoda karena hasilnya `(-y, x)` memang mengandung pertukaran. Cara
membedakannya: bandingkan dengan cermin pada `y = x` yang hasilnya `(y, x)`.
Keduanya berbeda tanda, dan gambarnya jelas berbeda: yang satu berputar, yang
satu terlipat.

### Materi 07: Memperbesar dan memperkecil

**Pertanyaan pembuka.** Foto diperbesar dua kali di layar. Semua titiknya
menjauh dari mana?

**Gagasan tunggal.** Dilatasi dengan pusat `M` dan faktor `k` memindahkan setiap
titik sepanjang garis dari `M`, sehingga jaraknya menjadi `k` kali semula.

**Aturannya.** Pusat titik asal: `(x, y)` menjadi `(kx, ky)`. Pusat `M(a, b)`:
`(a + k(x - a), b + k(y - b))`.

**Tiga watak k yang harus dicoba sendiri.** `k > 1` membesar; `0 < k < 1`
mengecil; `k < 0` mengecil atau membesar **sekaligus menyeberang** ke sisi lain
pusatnya. `k = 1` tidak mengubah apa pun, dan `k = 0` meruntuhkan semuanya ke
satu titik.

**Contoh berlangkah.** Segitiga dengan `A(2, 1)` didilatasi faktor 3 berpusat
di `M(1, 1)`. Selisih A dari M adalah `(1, 0)`, dikali 3 jadi `(3, 0)`,
dikembalikan dari M jadi `A'(4, 1)`.

**Widget `perbesar-bentuk`.** Penggeser k dari -3 sampai 3 dengan langkah kecil,
pusat bisa ditarik. Garis lurus dari pusat lewat prapeta ke peta digambar,
sehingga terlihat semua titik bergerak pada garis yang melalui pusat.
**Bingkai papan wajib menyesuaikan otomatis di sini**: k = 3 melempar bentuknya
keluar layar kalau tidak.

### Materi 08: Apa yang tetap, apa yang berubah

**Pertanyaan pembuka.** Dari lima transformasi yang sudah kita pakai, mana yang
bisa mengubah luas sebuah bangun, dan mana yang tidak mungkin?

**Gagasan tunggal.** Empat transformasi pertama **tidak mengubah panjang dan
sudut**. Hanya dilatasi yang mengubah ukuran. Ini yang membuat keempatnya
disebut transformasi yang mempertahankan jarak.

**Tabel yang dibangun bersama siswa, bukan disodorkan:**

| | Panjang sisi | Besar sudut | Luas | Arah putar A ke B ke C |
|---|---|---|---|---|
| Translasi | tetap | tetap | tetap | tetap |
| Pencerminan garis | tetap | tetap | tetap | **berbalik** |
| Pencerminan titik | tetap | tetap | tetap | tetap |
| Rotasi | tetap | tetap | tetap | tetap |
| Dilatasi faktor k | **k kali, tanpa tandanya** | tetap | **k kuadrat kali** | tetap, berapa pun k |

Dua baris yang paling sering mengejutkan siswa: pencerminan membalik arah putar
(bayangan tangan kanan adalah tangan kiri), dan luas berubah `k` **kuadrat**
kali, bukan `k` kali.

Satu baris yang mudah ditulis salah, jadi dicatat di sini supaya tidak
terulang: **dilatasi tidak pernah membalik arah putar**, termasuk saat `k`
negatif. Dilatasi dengan `k` negatif sama dengan dilatasi `k` positif lalu
diputar setengah lingkaran, dan setengah putaran tidak membalik arah putar.
Bentuknya memang tampak terjungkir, tetapi urutan A ke B ke C tetap searah.
Hanya pencerminan yang membalik urutan itu.

**Widget `meja-ukur`.** Pilih transformasi, lalu panjang AB, besar sudut di B,
luas, dan arah putar ditampilkan hidup untuk prapeta dan peta berdampingan.
Yang berubah disorot.

**Sering keliru.** "Dilatasi selalu mempertahankan jarak antara dua titik."
Ini pernyataan salah yang diambil dari daftar benar-salah di rangkuman buku
(halaman PDF 238). Menggoda karena keempat transformasi lain memang begitu.
Cara membedakannya: satu contoh k = 2 sudah cukup meruntuhkannya.

**Catatan jujur.** Perubahan luas `k` kuadrat kali disebut di sini tanpa
dibuktikan; pembuktiannya lewat determinan disebut sekali di Materi 09 sebagai
tautan, dan bukan bagian yang diujikan di topik ini.

### Materi 09: Matriks secukupnya

**Catatan pembuka yang wajib ada.** Materi ini bukan bab Matriks. Yang diambil
hanya sebanyak yang dibutuhkan untuk lima materi berikutnya. Kalau di sekolah
kamu sudah belajar Matriks, materi ini bisa dilewati cepat.

**Pertanyaan pembuka.** Lima aturan transformasi yang sudah kita punya semuanya
berbentuk "x baru dari x dan y, y baru dari x dan y". Bisakah keempat angka
pengalinya ditulis dalam satu benda saja?

**Gagasan tunggal.** Matriks 2x2 adalah **empat angka yang disusun dua baris dua
kolom**, dan mengalikannya dengan koordinat sebuah titik berarti:

```
| a  b |   | x |     | ax + by |
|      | . |   |  =  |         |
| c  d |   | y |     | cx + dy |
```

**Cara membacanya yang membuat matriks tidak lagi acak.** Kolom pertama matriks
adalah **tempat mendaratnya titik (1, 0)**, dan kolom kedua adalah tempat
mendaratnya titik `(0, 1)`. Sekali siswa melihat ini, matriks berhenti terasa
seperti kumpulan angka hafalan.

**Contoh berlangkah.** Matriks `[[0, -1], [1, 0]]` dikali `(3, 2)`:
baris pertama memberi `0(3) + (-1)(2) = -2`; baris kedua memberi
`1(3) + 0(2) = 3`; jadi hasilnya `(-2, 3)`. Bandingkan dengan Materi 06:
itu tepat rotasi 90 derajat.

**Perkalian dua matriks** diajarkan di sini juga, sebab Materi 12
membutuhkannya, dengan aturan yang sama diterapkan kolom per kolom.

**Widget `mesin-matriks`.** Empat kotak isian a, b, c, d. Persegi satuan
digambar dan berubah bentuk mengikuti isian, dengan kedua vektor kolom diberi
warna berbeda dan diberi label. Angka determinan `ad - bc` ditampilkan sebagai
keterangan luas, **tanpa** dijadikan prosedur yang harus dihitung siswa.

**Sering keliru.** "Baris matriks dikalikan baris koordinat." Menggoda karena
keduanya sama-sama deretan dua angka. Cara membedakannya: hitung sekali dengan
matriks yang tidak simetris seperti `[[1, 2], [0, 1]]`, lalu periksa hasilnya
pada gambar. Cara yang salah memberi titik yang tidak cocok dengan gambarnya.

### Materi 10: Matriks tiap transformasi

**Pertanyaan pembuka.** Kalau setiap transformasi punya matriksnya sendiri,
bisakah kita mengenali sebuah transformasi hanya dari empat angkanya?

**Daftar matriksnya, disusun ulang oleh siswa lewat aturan kolom Materi 09:**

| Transformasi | Matriks |
|---|---|
| Cermin sumbu X | `[[1, 0], [0, -1]]` |
| Cermin sumbu Y | `[[-1, 0], [0, 1]]` |
| Cermin garis `y = x` | `[[0, 1], [1, 0]]` |
| Cermin garis `y = -x` | `[[0, -1], [-1, 0]]` |
| Cermin titik asal, sama dengan rotasi 180 | `[[-1, 0], [0, -1]]` |
| Rotasi sudut `a` terhadap titik asal | `[[cos a, -sin a], [sin a, cos a]]` |
| Dilatasi faktor k terhadap titik asal | `[[k, 0], [0, k]]` |

**Yang wajib dikatakan terang-terangan.** **Translasi tidak punya matriks 2x2
pengali.** Translasi dituliskan sebagai **penjumlahan matriks kolom**
`(x, y) + (a, b)`. Buku Kelas XI menyebutnya sebagai operasi matriks yang
berkaitan dengan translasi, dan itu penjumlahan, bukan perkalian.

**Batas yang jujur.** Ketujuh matriks di atas hanya berlaku kalau pusatnya di
**titik asal**. Untuk pusat lain, resep tiga langkah dari Materi 06 dan 07 tetap
dipakai: geser ke titik asal, kerjakan, geser kembali.

**Widget `cocokkan-matriks`.** Dua arah: pilih transformasi lalu matriksnya
muncul, atau ketik matriks lalu ditebak transformasi apa itu (termasuk jawaban
jujur "bukan salah satu dari yang kita pelajari").

**Sering keliru.** "Translasi juga punya matriks 2x2, jadi tinggal dikalikan."
Menggoda karena empat transformasi lain memang begitu, dan buku pun menaruh
translasi di bawah judul yang sama. Cara membedakannya: coba cari matriks yang
memindahkan titik asal `(0, 0)` ke tempat lain. Perkalian matriks apa pun
memetakan `(0, 0)` ke `(0, 0)`, jadi geseran mustahil ditulis begitu.

### Materi 11: Dua transformasi berurutan

**Pertanyaan pembuka.** Sebuah bentuk dicerminkan pada sumbu X, lalu diputar 90
derajat. Kalau urutannya dibalik, apakah hasilnya sama?

**Gagasan tunggal.** Komposisi adalah mengerjakan transformasi kedua **pada
hasil** transformasi pertama. **Urutannya menentukan hasil**, dan itu bukan
kekecualian yang jarang, tapi keadaan yang biasa.

**Notasi.** `T2 komposisi T1` berarti `T1` dikerjakan **dahulu**. Notasi
lingkaran kecil dibaca "komposisi", dan yang di kanan dikerjakan lebih dulu.

**Contoh berlangkah, dikerjakan dua arah sampai tuntas.** `A(3, 1)`,
cermin sumbu X lalu rotasi 90 derajat: `(3, 1)` jadi `(3, -1)` jadi `(1, 3)`.
Urutan dibalik: `(3, 1)` jadi `(-1, 3)` jadi `(-1, -3)`. Hasilnya berbeda, dan
gambarnya menunjukkan kenapa.

**Kekecualian yang layak disebut.** Dua translasi boleh dibalik urutannya, dan
hasilnya sama. Dua rotasi dengan pusat yang sama juga. Yang tidak boleh
dibalik adalah campuran jenis, dan campuran pusat yang berbeda.

**Widget `dua-langkah`.** Pilih T1 dan T2 dari daftar. Papan menampilkan tiga
bentuk sekaligus: prapeta, hasil langkah pertama (samar), dan hasil akhir.
Tombol tukar urutan ada di sebelahnya, dan hasil kedua urutan ditampilkan
berdampingan agar bedanya tidak perlu dihafal.

### Materi 12: Komposisi lewat perkalian matriks

**Pertanyaan pembuka.** Dua transformasi punya dua matriks. Kalau keduanya
dikalikan, matriks mana yang ditulis di depan?

**Gagasan tunggal, dan jebakan utama topik ini.** Kalau `T1` dikerjakan dahulu
lalu `T2`, matriks gabungannya adalah **`M2 dikali M1`**. Yang dikerjakan
pertama ditulis **paling kanan**, karena koordinat titiknya berada di kanan dan
dikenai matriks terdekat lebih dulu.

**Contoh berlangkah.** Cermin sumbu X lalu rotasi 90 derajat, pada `A(3, 1)`.
`M1 = [[1, 0], [0, -1]]`, `M2 = [[0, -1], [1, 0]]`.
`M2 M1 = [[0, 1], [1, 0]]`, dikali `(3, 1)` memberi `(1, 3)`, sama dengan
hasil langkah demi langkah di Materi 11. Kalau dikalikan dengan urutan salah,
`M1 M2 = [[0, -1], [-1, 0]]`, hasilnya `(-1, -3)`, yang justru jawaban untuk
urutan yang sebaliknya.

**Widget `urutan-matriks`.** Pilih dua transformasi. Kedua hasil perkalian
`M2 M1` dan `M1 M2` ditampilkan bersama matriksnya dan bersama gambar petanya,
sehingga siswa melihat bahwa keduanya bukan cuma beda tulisan.

**Sering keliru.** "Dikerjakan T1 dulu, jadi M1 ditulis dulu." Menggoda karena
begitulah cara kita membaca kalimat, dari kiri ke kanan. Cara membedakannya:
tulis titiknya sebagai matriks kolom di paling kanan, lalu lihat matriks mana
yang menyentuhnya lebih dahulu.

### Materi 13: Dipakai di dunia nyata

Panel bacaan bergambar, mengikuti pola `dunia-nyata` topik lain. Tiga hal:

1. **Animasi dan permainan.** Setiap gerakan gambar di layar adalah translasi,
   rotasi, dan dilatasi yang dihitung ulang enam puluh kali per detik. Matriks
   dipakai justru karena empat angka lebih murah dihitung daripada memindahkan
   ribuan titik satu per satu.
2. **Ornamen dan batik.** Pola berulang dibangun dari satu motif yang
   ditranslasikan dan dicerminkan. Batik parang memakai translasi miring;
   motif kawung memakai pencerminan pada dua garis.
3. **Lengan robot dan mesin.** Setiap sambungan lengan adalah rotasi terhadap
   pusat yang berbeda, dan komposisinya menentukan letak ujung lengan.

Ditutup dengan **tautan ke tahap "Transformasi" di topik Grafik Fungsi**, dengan
kalimat yang menjelaskan bedanya: di sini titik yang dipindahkan lewat pemetaan,
di sana kurva yang berubah lewat rumusnya. Bukan dua pelajaran yang bertabrakan.

## 4. Rangka teknis

### Berkas yang dibuat

```
web/components/widget/transformasi-geometri/
  papan.ts        koordinat, penskalaan otomatis, angka gaya Indonesia
  matriks.ts      matriks 2x2, matriks tiap transformasi, komposisi
  useSeret.ts     penarikan tetikus dan sentuh
  Papan.tsx       bidang bersumbu berangka, prapeta plus peta
  Bentuk.tsx      huruf L tidak simetris, titik A B C
  PapanBebas.tsx  GeserBentuk.tsx  CerminLurus.tsx  CerminMiring.tsx
  CerminTitik.tsx PutarBentuk.tsx  PerbesarBentuk.tsx  MejaUkur.tsx
  MesinMatriks.tsx  CocokkanMatriks.tsx  DuaLangkah.tsx  UrutanMatriks.tsx
  DuniaNyataTransformasi.tsx

web/content/transformasi-geometri/
  tahap.ts  latihan.ts  kuis.ts  index.ts

web/components/topik/PanggungTransformasiGeometri.tsx

alat/
  uji-matriks-transformasi.mts      uji matematikanya
  cek_transformasi.py               periksa angka di materi
  materi-transformasi-geometri.json
  soal-latihan-transformasi.json  soal-kuis-transformasi.json
```

### Yang diubah pada berkas yang sudah ada

Hanya dua, dan keduanya **bukan** milik MASTER:

- `web/content/topik.ts`: satu entri baru, dan komentar kepala berkas yang
  masih menulis "Daftar 6 topik" diperbaiki menjadi 7.
- `web/content/daftar-isi.ts`: satu entri baru plus impornya.

`web/content/subbab.ts` **ditunda** sampai `sesi/mantra` masuk `master`, sebab
berkasnya belum ada di cabang ini. Tanpa itu topiknya tidak muncul di Peta
Materi, dan itu risiko yang diketahui, bukan kelupaan.

### Kenapa berkas pembantu disalin, bukan dipakai bersama

Pola `useSeret`, penskalaan koordinat, dan pemformatan angka sudah ada di
`web/components/widget/vektor/`. Tiga pilihan dipertimbangkan:

1. **Impor lintas topik** dari folder Vektor. Ditolak: komentar di
   `web/content/tipe.ts` mencatat justru masalah itu yang dulu memaksa
   pemindahan tipe ke folder bersama.
2. **Promosikan ke `web/components/widget/bersama/`**. Ditolak untuk sekarang:
   itu mengubah impor di enam topik lain, yang sedang dipegang lima sesi paralel
   dan sedang ditulis ulang MASTER di `sesi/mantra`. Konfliknya besar dan
   keuntungannya nol bagi siswa.
3. **Salin dan sesuaikan.** Dipilih. Ada pengulangan kode, dan itu diterima
   sadar sebagai harga dari kerja paralel. Kalau kelak semua cabang sudah
   tenang, penyatuannya jadi pekerjaan tersendiri yang aman.

### Syarat yang tidak boleh dilewati

1. **Bingkai papan menyesuaikan otomatis.** Aturan proyek: widget tidak boleh
   memotong gambarnya sendiri, dan wajib memberi tahu penggunanya lewat
   penunjuk skala. Di topik ini syarat itu lebih tajam daripada di topik lain,
   sebab dilatasi `k = 3` dan translasi besar memang melempar bentuknya keluar
   layar. Batas papan dihitung ulang dari gabungan prapeta dan peta setiap kali.
2. **Dua sumbu, dan sumbunya berangka.** Aturan tetap MANTRA.
3. **Keadaan widget dipegang di panggung, bukan di widget**, supaya tidak hilang
   saat siswa berpindah materi lalu kembali. Ini pola yang sudah dipakai
   `PanggungVektor.tsx` dan alasannya tertulis di `web/components/topik/jenis.ts`.
4. **Tidak ada em-dash.** Tidak ada kata "miskonsepsi" di halaman.
5. **Modul yang diuji tidak mengimpor apa pun**, supaya `uji-*.mts` bisa
   dijalankan Node langsung tanpa bundler dan tanpa DOM. Alasan lengkapnya ada
   di kepala `alat/uji-geometri-vektor.mts`.

## 5. Gerbang mutu sebelum dinyatakan selesai

Berurutan, dan semuanya harus lolos:

| Langkah | Perintah | Menjawab apa |
|---|---|---|
| 1 | `node alat/uji-matriks-transformasi.mts` | matematika transformasinya benar |
| 2 | `python alat/cek_transformasi.py` | tiap angka di materi diperiksa mesin |
| 3 | `python alat/cek_soal.py` | jawaban latihan dan kuis benar |
| 4 | `python alat/periksa_tahap.py` | daftar periksa STANDAR-MENGAJAR bagian 6 |
| 5 | `npx tsc --noEmit` di `web/` | tidak ada galat tipe |
| 6 | `npm run build` di `web/` | halaman benar-benar terbangun |
| 7 | Playwright, 13 materi dipotret | tidak ada widget yang terpotong |

Butir 1, 3, dan 6 pernah dilanggar orang lain di proyek ini dengan cara yang
sama: menganggap tidak ada galat sebagai bukti hasilnya benar. Laporan akhir
menempelkan keluaran perintahnya, bukan ringkasannya.

## 6. Ukuran dan risiko

**Besar.** Setara topik Vektor: 12 alat interaktif dan materi sekitar 50 KB.
Sudah disampaikan ke ARYA sebelum disetujui.

| Risiko | Kemungkinan | Rencana |
|---|---|---|
| Materi 09 dan 10 membengkak jadi topik Matriks tersendiri | sedang | Berhenti dan lapor ke ARYA, jangan diam-diam melanjutkan. Batasnya sudah ditulis: matriks 2x2 kali koordinat, dan perkalian dua matriks. Determinan hanya disebut |
| Halaman tidak muncul di Peta Materi | tinggi, tapi sudah diketahui | `subbab.ts` belum ada di cabang ini. Dikerjakan setelah `sesi/mantra` digabung |
| Halaman perlu disesuaikan ulang setelah MANTRA masuk | sedang | `HalamanTopik.tsx` sedang ditulis ulang MASTER. Isi dan widget tidak terpengaruh, hanya rangkanya. Karena itu isi dan widget dikerjakan lebih dulu |
| Rotasi sudut sembarang terasa berat untuk siswa | sedang | Sudut bulat dituntaskan lebih dulu di Materi 06, dan sudut sembarang diletakkan setelahnya sebagai bagian terpisah, bukan dicampur |

## 7. Yang sengaja TIDAK dikerjakan sekarang

- **Video.** Keputusan ARYA: materi dan widget saja dulu.
- **Topik Matriks tersendiri.** Ditawarkan, ditolak ARYA, dan alasannya masuk
  akal: satu topik utuh lagi berarti Transformasi Geometri tertunda lama.
- **Determinan dan invers matriks sebagai prosedur.** Di luar kebutuhan topik
  ini. Disebut sekali sebagai tautan, tanpa dilatih.
- **Transformasi pada ruang tiga dimensi.** Bukan materi Kelas XI.
- **Menyatukan berkas pembantu antar topik.** Alasannya di bagian 4.
