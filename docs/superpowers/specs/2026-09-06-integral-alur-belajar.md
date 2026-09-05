# Integral: Alur Belajar 11 Materi (topik kesembilan MANTRA)

**Tanggal:** 6 September 2026 · **Dirancang:** MATRA-MASTER · **Disetujui ARYA:** ya, dipercayakan penuh (5 Sep malam)
**Dikerjakan oleh:** sesi MANTRA-TURUNAN-INTEGRAL, SETELAH Turunan selesai (`2026-09-06-turunan-alur-belajar.md`).

---

## Keputusan ARYA (5 Sep 2026)

Sama dengan Turunan: dua topik terpisah di situs, satu sesi, kedalaman
mengikuti buku, **volume benda putar tidak masuk** (tidak ada di buku), dan
**"jangan sampai siswa tidak paham"**: tiap loncatan diberi materi jembatan.
Video belum; halaman dan widget dulu.

---

## Sumber materi

> **Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi)**, 2025.
> Kementerian Pendidikan Dasar dan Menengah.
> **Bab 3 "Integral"**, halaman cetak 159 sampai 219.
> Berkas lokal: `D:\BAHAN MATEMATIKA\LIMIT.pdf`, halaman PDF 175 sampai 235
> (PDF = cetak + 16).

| Buku | Isi | Materi MANTRA |
|---|---|---|
| A, pembuka (PDF 177–182) | Pengeluaran rumah tangga dari lajunya, aturan trapesium, Definisi 3.1 antiturunan | Materi 01 |
| A.2.a (PDF 183–185) | Sifat 3.1 sampai 3.5: ∫dx, ∫xⁿ dx, kelipatan, jumlah, selisih | Materi 02 |
| A.2.a (PDF 185) | Sifat 3.6 aturan substitusi | Materi 03 |
| A.2.a–b (PDF 185–191) | Sifat 3.7 parsial, 3.8 trigonometri, 3.9 eksponensial | Materi 04 |
| B.1 (PDF 194–199) | Jumlahan Riemann | Materi 05 |
| B.2–B.3 (PDF 199–206) | Integral tentu sebagai limit jumlahan, Sifat 3.10 sampai 3.15 | Materi 06 |
| B.4 (PDF 206–210) | Teorema Dasar Kalkulus I dan II | Materi 07 |
| B (PDF 210–219) | Menghitung integral tentu, substitusi dengan batas | Materi 08 |
| C.1 (PDF 220–222) | Luas daerah pada kurva, termasuk di bawah sumbu x | Materi 09 |
| (tambahan SMA) | Luas antara dua kurva | Materi 10 |
| C.2–C.4 (PDF 223–227) | Ekonomi, fisika, kesehatan | Materi 11 |

Rujukan pendamping: `kalkulus 1.pdf` (ITB) untuk istilah, Stewart untuk
definisi, big book SMA dan mathcyber1997 untuk level soal.

---

## Kenapa Integral disusun begini

Salah paham yang dilawan:

> *"integral itu kebalikan turunan, jadi cuma soal menaikkan pangkat."*

Setengahnya benar dan setengahnya itulah masalahnya. Siswa yang hanya tahu
"naikkan pangkat, bagi" tidak tahu KENAPA integral tentu memberi luas, dan
kebingungan saat luasnya bernilai negatif atau saat kurvanya memotong sumbu.
Buku sendiri membuka dengan luas di bawah kurva pengeluaran (aturan
trapesium, PDF 179–181) sebelum menyebut antiturunan, dan urutan itu dijaga:

1. **Dari laju ke jumlah** (Materi 01): kalau tahu kecepatan tiap saat,
   jarak totalnya adalah luas di bawah kurva kecepatan. Ini gagasan utama,
   sebelum ada satu pun rumus.
2. **Membalik turunan** (Materi 01 sampai 04): antiturunan dan aturannya.
3. **Luas yang dihitung jujur** dengan persegi panjang (Materi 05 dan 06).
4. **Jembatan** (Materi 07): Teorema Dasar Kalkulus menjelaskan kenapa dua
   dunia itu, luas dan antiturunan, ternyata satu. Inilah "aha" topik ini.
5. Menghitung dan menerapkan (Materi 08 sampai 11).

Batas dengan topik lain: Turunan (semua aturan turunan dipakai, tidak
diulang, cukup "ingat Turunan Materi 07" untuk substitusi), Limit (limit
jumlahan di Materi 06 cukup satu kalimat), Grafik Fungsi (bentuk kurva).

---

## Aturan urutan istilah (`alat/cek_urutan_belajar.py`)

| Istilah | Materi |
|---|---|
| antiturunan, konstanta C | 01 |
| integral tak tentu, tanda ∫, dx, aturan pangkat integral | 02 |
| substitusi, u dan du | 03 |
| integral parsial, integral trigonometri/eksponensial | 04 |
| partisi, jumlahan Riemann, titik sampel | 05 |
| integral tentu, batas atas/bawah, luas bertanda | 06 |
| Teorema Dasar Kalkulus, fungsi luas A(x) | 07 |
| F(b) − F(a), notasi kurung siku | 08 |
| luas daerah, daerah di bawah sumbu | 09 |
| luas antara dua kurva, titik potong | 10 |
| usaha, jarak dari kecepatan, penjualan total | 11 |

Kata sehari-hari (luas, jumlah, tumpukan) boleh kapan saja.

---

## Alur 11 materi

Bentuk data dan aturan widget sama persis dengan Turunan (kendali bersama,
jendela tetap, nyala, Kembalikan, blok `coba` wajib).

### Materi 01: Dari laju ke jumlah, membalik turunan

**Sub-bab A. Membalik turunan.**

**Pertanyaan:** Pengeluaran rumah tangga naik dengan laju 2x + 1 juta per
bulan pada bulan ke-x. Berapa total pengeluaran setahun, kalau yang diketahui
cuma lajunya?

**Isi pokok.** Dua jalan yang akan bertemu: (a) menjumlahkan laju tiap bulan
= luas di bawah kurva laju (buku memakai trapesium, PDF 181; di sini cukup
dilihat, dihitung di Materi 05); (b) mencari fungsi yang turunannya 2x + 1,
yaitu x² + x + C (Definisi 3.1, PDF 182). Dinamai antiturunan. Ditegaskan
C: ada banyak fungsi dengan turunan yang sama, bedanya cuma digeser tegak;
untuk memilih satu perlu satu keterangan tambahan (pengeluaran awal).

**Widget `mesin-balik`.** Kiri: mesin turunan berjalan MUNDUR: masukkan f'
(pilihan: 2x + 1, 3x², cos x, 2), tebak F lewat `Pilihan` beberapa calon
(x² + x, x² + 1, x³, ...), mesin memeriksa dengan menurunkan tebakan dan
menulis hasilnya di panel. Kanan: grafik F(x) + C dengan `Angka` "C" (−3
sampai 3, langkah 0,5) yang menggeser kurvanya; garis singgung di x pilihan
(`Angka` "x") tetap sama kemiringannya untuk C mana pun (menyala saat C
dipegang). `Petunjuk`: "geser C, dan lihat semua kurva punya kemiringan yang
sama di tiap x: itulah sebabnya turunannya tidak berubah".

**Sering keliru:** *"turunan dan antiturunan saling meniadakan persis."*
Tidak: menurunkan lalu mengintegralkan mengembalikan fungsinya PLUS C.

**Video:** ya (prioritas ke-2).

### Materi 02: Tanda integral dan aturan pangkatnya

**Pertanyaan:** Bagaimana menuliskan "semua antiturunan f" dengan satu
lambang, dan apa aturan cepatnya?

**Isi pokok.** ∫ f(x) dx = F(x) + C (PDF 182–183): tanda ∫, integran, dx,
konstanta integrasi. Sifat 3.1 sampai 3.5 (PDF 183–185): ∫ dx = x + C,
∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C untuk n ≠ −1, kelipatan, jumlah, selisih. Tiap
sifat DIPERIKSA dengan menurunkan hasilnya (itulah cara buku membuktikannya).
Contoh: ∫ x⁵ dx = x⁶/6 + C (Contoh 3.2), ∫ (3x² − 4x + 1) dx.

**Widget `naik-pangkat`.** Kendali: `Pilihan` "Pangkat n" (0, 1, 2, 3, ½,
−2), `Angka` "koefisien a" (−3 sampai 3, langkah 0,5), `Angka` "C". Gambar:
papan atas f = a·xⁿ, papan bawah F = a·xⁿ⁺¹/(n + 1) + C; titik x yang bisa
diseret menunjukkan tinggi f di atas sama dengan kemiringan F di bawah
(garis singgung kecil). Panel: rumus F ditulis bertahap, dan "periksa:
F' = ..." menyala hijau bila cocok. `Petunjuk`: "pilih n = −1, dan mesinnya
menolak: pangkat naik jadi 0, pembaginya nol. Itu kasus khusus yang tidak
dibahas di SMA".

**Sering keliru:** *"∫ x² dx = 2x."* Itu turunan; widget memperlihatkan
arah mesinnya.

**Video:** tidak.

### Materi 03: Substitusi, melihat lapisan

**Pertanyaan:** Bagaimana mengintegralkan (2x + 1)⁵ tanpa menguraikannya?

**Isi pokok.** Sifat 3.6 (PDF 185): kalau integran berbentuk [g(x)]ⁿ · g'(x),
maka hasilnya [g(x)]ⁿ⁺¹/(n + 1) + C. Ini aturan rantai (Turunan Materi 07)
dibaca terbalik: u = g(x), du = g'(x) dx. Langkahnya selalu sama: pilih u,
hitung du, cocokkan dengan yang ada di soal (kalau kurang faktor tetap,
sesuaikan), integralkan dalam u, kembalikan ke x. Contoh: ∫ (2x + 1)⁵ dx,
∫ x(x² + 1)³ dx, ∫ 2x/√(x² + 1) dx.

**Widget `cocokkan-lapisan`.** Soal ditampilkan; siswa memilih u lewat
`Pilihan` (tiga calon, satu benar), mesin menulis du dan menandai bagian
soal yang ditutupi u (menyala) dan bagian yang menjadi du. Kalau calon
salah, mesin menjelaskan kenapa (sisanya tidak bisa jadi du). `Angka`
"Langkah" (1 sampai 4) membuka penyelesaian baris demi baris (pola
`limit/BongkarBertahap`). `Petunjuk`: "coba u yang salah dulu, dan lihat
sisanya tidak pernah bisa jadi du".

**Sering keliru:** *"∫ (2x+1)⁵ dx = (2x+1)⁶/6 + C."* Lupa membagi 2 (turunan
dalam); mesin menurunkan hasil itu dan memperlihatkan selisihnya.

**Video:** ya (prioritas ke-5).

### Materi 04: Parsial, trigonometri, dan eksponen

**Pertanyaan:** Kalau integrannya hasil kali dua fungsi berbeda jenis,
seperti x·sin x, bagaimana?

**Isi pokok.** Aturan parsial ∫ u dv = uv − ∫ v du (Sifat 3.7, PDF
185–186), dibaca sebagai aturan hasil kali (Turunan Materi 06) terbalik;
diturunkan dengan menurunkan uv. Sifat 3.8 (∫ sin = −cos, ∫ cos = sin,
∫ sec² = tan) dan 3.9 (∫ eˣ = eˣ, ∫ e^(ax) = e^(ax)/a). Contoh parsial
SATU tingkat: ∫ x cos x dx; Contoh 3.5 (x² sin x, dua tingkat) diberi
label "pengayaan". Jujur ke siswa: parsial paling jarang keluar di ujian
SMA, tetapi ada di buku.

**Widget `pasangkan-turunan-integral`.** Permainan mencocokkan: enam kartu
fungsi (sin x, cos x, eˣ, x², sec² x, 1/x²) dan enam kartu antiturunan;
`Pilihan` per kartu kiri memilih pasangannya, kartu yang cocok menyala,
salah diberi alasan (hasil turunannya ditulis). Tanpa seret. `Petunjuk`:
"tiap tebakan diperiksa dengan satu cara saja: turunkan lagi".

**Sering keliru:** *"∫ cos x dx = −sin x."* Tanda minus milik ∫ sin.

**Video:** tidak.

### Materi 05: Luas dari persegi panjang, jumlahan Riemann

**Sub-bab B. Luas dan integral tentu.**

**Pertanyaan:** Bagaimana mengukur luas daerah yang salah satu tepinya
melengkung?

**Isi pokok.** Jumlahan Riemann (PDF 194–199): bagi selang [a, b] jadi n
bagian selebar Δx, tinggi tiap persegi panjang f(xᵢ*) pada titik sampel,
jumlahkan. Contoh buku: setengah lingkaran (Ayo Bereksplorasi 3.6) dan
f(x) = x pada [0, 7] dengan 7 bagian (Contoh 3.6). Ditunjukkan: makin
banyak bagian, makin dekat ke luas sebenarnya, dari bawah maupun dari atas.

**Widget `persegi-panjang-menumpuk`.** Kendali: `Angka` "Banyak bagian n"
(1 sampai 60, langkah 1), `Pilihan` "Titik sampel" (kiri / kanan / tengah),
`Pilihan` fungsi (x, x², setengah lingkaran, 4 − x²), `Angka` batas a dan
b (ditahan a < b). Gambar: persegi panjang berwarna, kurva di atasnya;
panel: jumlah persegi panjang, luas sebenarnya (dihitung diam-diam), dan
selisihnya. Saat n dipegang, semua persegi panjang menyala. `Petunjuk`:
"naikkan n dari 4 ke 60, dan lihat selisih ke luas sebenarnya menyusut;
kiri dan kanan mengapit dari dua sisi".

**Sering keliru:** *"persegi panjang kanan selalu lebih besar."* Hanya
untuk fungsi naik; coba 4 − x².

**Video:** ya (prioritas ke-1).

### Materi 06: Integral tentu dan sifat-sifatnya

**Pertanyaan:** Kalau bagiannya dibuat tak hingga banyak, apa nama
hasilnya, dan bagaimana menuliskannya?

**Isi pokok.** ∫ₐᵇ f(x) dx = lim jumlahan Riemann (PDF 199–203), batas
bawah dan atas, contoh ∫₀⁷ x dx = 49/2 dari limit jumlahan (Contoh 3.7,
memakai rumus deret 1 + 2 + ... + n). Sifat 3.10 sampai 3.15 (PDF 204–206):
∫ₐᵃ = 0, membalik batas mengubah tanda, kelipatan, jumlah, selisih, dan
memecah selang di c. **Luas bertanda**: bagian di bawah sumbu x dihitung
negatif; itu sifat integral, bukan kesalahan.

**Widget `pecah-selang`.** Kurva pilihan (x, 4 − x², x³ − 4x). Kendali:
`Angka` a, b (−3 sampai 3, ditahan a ≤ b), `Angka` c di antara (ditahan
a ≤ c ≤ b, bisa diseret). Gambar: daerah [a, c] dan [c, b] berwarna beda,
bagian di bawah sumbu diarsir merah dengan tanda minus. Panel: ∫ₐᶜ, ∫ᶜᵇ,
jumlahnya, dan ∫ₐᵇ (dihitung diam-diam dari antiturunan; tidak ditulis
rumusnya sebelum Materi 07). `Petunjuk`: "geser c ke mana pun, jumlah dua
bagiannya tidak pernah berubah".

**Sering keliru:** *"integral tentu selalu positif karena luas."* Widget
x³ − 4x pada [−2, 2] memberi 0, dan panel menjelaskan kenapa.

**Video:** tidak.

### Materi 07: Dua dunia yang ternyata satu, Teorema Dasar Kalkulus

**Pertanyaan:** Luas dari persegi panjang (Materi 05) dan antiturunan
(Materi 01) tidak kelihatan berhubungan. Kenapa ternyata sama?

**Isi pokok.** Fungsi luas A(x) = ∫ₐˣ f(t) dt: luas dari a sampai x.
TDK I (PDF 206–208): A'(x) = f(x), sebab menambah selang sedikit (Δx)
menambah luas sebesar pita setinggi f(x); dibagi Δx tinggal f(x). TDK II
(PDF 208–209): karena A adalah antiturunan f, maka ∫ₐᵇ f = F(b) − F(a).
Contoh 3.9: ∫₁³ x² dx = 27/3 − 1/3 = 26/3, dibandingkan dengan jumlahan
Riemann Materi 05 untuk fungsi yang sama.

**Widget `luas-yang-tumbuh`.** Papan atas: kurva f dan daerah dari a sampai
x yang mengisi saat x diseret (`Angka` "x", a sampai b). Papan bawah:
titik (x, A(x)) menjejak membentuk kurva A. Saat x dipegang: pita tipis
setinggi f(x) di ujung daerah menyala (itulah pertambahan luasnya), dan di
papan bawah garis singgung A dengan kemiringan f(x). Panel: A(x), f(x),
kemiringan A di x (sama). `Pilihan` fungsi (x, x², 4 − x²). `Petunjuk`:
"perhatikan pita di ujung: tingginya persis f(x), dan itulah kemiringan
kurva bawah".

**Sering keliru:** *"F(b) − F(a) harus memakai C."* C hilang karena
dikurangkan; panel menulis kedua C lalu mencoretnya.

**Video:** ya (prioritas ke-3, "aha" topik ini).

### Materi 08: Menghitung integral tentu

**Pertanyaan:** Sekarang alatnya lengkap; bagaimana urutan kerja yang tidak
tersesat?

**Isi pokok.** Notasi [F(x)]ₐᵇ, tiga langkah: antiturunan, masukkan batas
atas, kurangi batas bawah. Sifat integral tentu dipakai untuk memecah soal.
Substitusi dengan batas: batasnya ikut diganti ke u (PDF 212–214), atau
kembali ke x dulu; keduanya sah, jangan dicampur. Contoh: ∫₀³ (x² − 3x + 2)
dx, ∫₀² x²/√(x³ + 1) dx.

**Widget `hitung-bertahap`.** Pola `limit/BongkarBertahap`: `Pilihan` soal
(empat soal, satu memakai substitusi), `Angka` "Langkah" membuka baris demi
baris; tiap baris menyebut sifat yang dipakai; pada substitusi, batas lama
dan baru ditulis berdampingan dan menyala saat diganti. Tanpa seret.
`Petunjuk`: "pada soal substitusi, perhatikan batasnya ikut berubah dari
x ke u".

**Sering keliru:** *"batas integral tetap x padahal integrannya sudah
dalam u."*

**Video:** tidak.

### Materi 09: Luas daerah, termasuk yang di bawah sumbu

**Sub-bab C. Penerapan.**

**Pertanyaan:** Kalau kurvanya memotong sumbu x, kenapa integralnya bisa
lebih kecil daripada luas yang terlihat?

**Isi pokok.** Luas daerah antara kurva dan sumbu x pada [a, b] (PDF
220–222): kalau kurva di atas sumbu, luas = integral; kalau di bawah, luas
= −integral; kalau memotong, PECAH di titik potong dan jumlahkan luas
tiap bagian (Ayo Mencoba 3.11 nomor 2: f(x) = x³ − 2x² − 5x + 6 pada
[−2, 3], dipecah di x = 1). Contoh 3.13: f(x) = x√(x² + 5) pada [0, 2].

**Widget `luas-dua-daerah`.** Kurva pilihan (x² − 4x, x³ − 4x, sin x).
`Angka` batas kiri dan kanan (bisa diseret, ditahan a < b). Gambar: daerah
di atas sumbu biru, di bawah merah; panel: integral bertanda, luas mutlak
tiap bagian, luas total; `Pilihan` "Yang dihitung": integral / luas.
Titik potong dengan sumbu ditandai dan menyala saat batas dipegang.
`Petunjuk`: "letakkan batas sehingga daerah biru dan merah sama besar, dan
integralnya nol sementara luasnya tidak".

**Sering keliru:** *"luas = ∫ₐᵇ f, titik."* Hanya kalau f tidak pernah
negatif di selang itu.

**Video:** ya (prioritas ke-4).

### Materi 10: Luas antara dua kurva

**Pertanyaan:** Kalau daerahnya dibatasi dua kurva, bukan kurva dan sumbu,
apa yang diintegralkan?

**Isi pokok.** Luas = ∫ₐᵇ (atas − bawah) dx, dengan a dan b titik potong
kedua kurva (dicari dari f = g). Persegi panjang Riemann sekarang tingginya
f − g. Kalau kurvanya bertukar posisi, pecah di titik potong. Contoh:
y = x² dan y = x + 2 (potong di −1 dan 2, luas 9/2); y = x³ dan y = x.
Ini di luar bab buku tetapi lazim di ujian SMA; dinyatakan begitu di
bacaannya.

**Widget `dua-kurva`.** Dua kurva pilihan; persegi panjang Riemann tinggi
f − g ditampilkan (`Angka` n untuk mengingat Materi 05), `Angka` batas a, b
yang bisa diseret dan `Pilihan` "Pakai titik potong" yang mengisi a dan b
otomatis. Panel: titik potong, integran (atas − bawah), hasil. Saat batas
dipegang, garis batasnya menyala. `Petunjuk`: "geser batas melewati titik
potong, dan persegi panjangnya berbalik: atas dan bawah bertukar".

**Sering keliru:** *"selalu f − g, urutannya bebas."* Harus atas dikurangi
bawah; kalau terbalik hasilnya negatif.

**Video:** tidak.

### Materi 11: Integral di sekitar kita

Galeri tidak interaktif (pola Limit dan Statistika), empat kartu:

1. **Penjualan total dari laju penjualan** (Contoh 3.14, PDF 223–224):
   y = 3000x + 1000 unit per tahun, total 4 tahun = 20.000; grafik dengan
   daerah terisi.
2. **Jarak dari kecepatan**: v(t) diketahui, jarak = luas di bawah v
   (sambungan ke Turunan Materi 12).
3. **Usaha meregangkan pegas** (Contoh 3.15 dan Ayo Mencoba 3.13, PDF
   225–226): gaya kx, usaha = ∫ kx dx; angka contoh.
4. **Pengeluaran yang dihemat** (Ayo Mencoba 3.12): laju penghematan
   4000x + 1000 per tahun, kapan modal 36.000 kembali.

Semua angka dinyatakan sebagai angka contoh.

**Video:** tidak.

---

## Peta sub-bab (untuk `subbab.ts`)

| Huruf | Nama | Materi |
|---|---|---|
| A | Membalik turunan | 1, 2, 3, 4 |
| B | Luas dan integral tentu | 5, 6, 7, 8 |
| C | Penerapan | 9, 10, 11 |

`slug: 'integral'`, `no: 3`, `kelas: 'Kelas 12'`, `urutanKelas: 12`,
`sumber: 'Tingkat Lanjut K12 Bab 3'`.

---

## Video: urutan prioritas (BELUM dikerjakan sampai ARYA memerintahkan)

| Urutan | Materi | Kenapa |
|---|---|---|
| 1 | 05, persegi panjang menumpuk | gagasan luas yang dihitung jujur |
| 2 | 01, dari laju ke jumlah | pembuka; boleh 3D 5 detik |
| 3 | 07, Teorema Dasar Kalkulus | "aha" topik |
| 4 | 09, luas di bawah sumbu | kesalahan paling sering |
| 5 | 03, substitusi | cadangan |

---

## Latihan dan kuis

Sama dengan Turunan: 4 latihan, 32 kuis, halaman `/latihan/integral`.
Kalibrasi ke Contoh Soal 3.2 sampai 3.15, Ayo Mencoba 3.2 sampai 3.13,
latihan akhir bab (PDF 228–235). Semua angka diperiksa `alat/cek_soal.py`
dengan `alat/soal-latihan-integral.json` dan `alat/soal-kuis-integral.json`
(sympy: `integrate`, `Integral(...).doit()`), alatnya dibuktikan dua arah.

---

## Urutan pengerjaan

Sama dengan Turunan, empat tahap kerja, laporan SIAP GABUNG di akhir.
Jangan mulai Integral sebelum Turunan lolos keempat tahapnya.
