# Turunan: Alur Belajar 12 Materi (topik kedelapan MANTRA)

**Tanggal:** 6 September 2026 · **Dirancang:** MATRA-MASTER · **Disetujui ARYA:** ya, dipercayakan penuh (5 Sep malam: "rancangan turunan tidak perlu konfirmasi ke saya")
**Dikerjakan oleh:** sesi MANTRA-TURUNAN-INTEGRAL di worktree `.claude/worktrees/mantra-turunan` (cabang `sesi/turunan`), bersama `2026-09-06-integral-alur-belajar.md`.

---

## Keputusan yang sudah diambil ARYA (5 Sep 2026)

| Pertanyaan | Jawaban ARYA |
|---|---|
| Bentuk di situs | **Dua topik terpisah**, Turunan dan Integral, keduanya Kelas 12 |
| Sesi | **Satu sesi** mengerjakan keduanya, Turunan dulu |
| Kedalaman | Mengikuti buku sampai aplikasi turunan; **"jangan sampai siswa tidak paham"**, jadi tiap loncatan diberi materi jembatan |
| Volume benda putar (Integral) | Tidak masuk, tidak ada di buku |
| Kerangka kode | Dibuat MASTER di cabang `sesi/turunan`, sesi tinggal mengisi |
| Video | **Belum**. Halaman dan widget dulu; MASTER memeriksa silang; baru ARYA memerintahkan video |

---

## Sumber materi (bukan ingatan Claude)

> **Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi)**, 2025.
> Kementerian Pendidikan Dasar dan Menengah.
> **Bab 2 "Turunan Fungsi"**, halaman cetak 79 sampai 157.
> Berkas lokal: `D:\BAHAN MATEMATIKA\LIMIT.pdf` (nama berkasnya menyesatkan: itu
> buku utuh; halaman PDF = halaman cetak + 16, jadi Bab 2 ada di PDF 95 sampai 173).

Susunan resmi bab itu, dan ke mana tiap bagiannya masuk di sini:

| Buku | Isi | Materi MANTRA |
|---|---|---|
| A.1 (PDF 98–112) | Limit dan kontinuitas | **Tidak diulang.** Sudah jadi topik Limit (10 materi). Materi 01 menyambung dari sana |
| A.2 (PDF 113–117) | Garis sekan, garis tangen, Definisi 2.3 dan 2.4 | Materi 01, 02 |
| A.3 (PDF 118) | Notasi Newton dan Leibniz | Materi 03 |
| B.1.a (PDF 119–123) | Aturan pangkat, turunan konstanta, Sifat Turunan 1–4 | Materi 04, 05, 06 |
| B.1.b (PDF 124–129) | Aturan rantai | Materi 07 |
| B.2 (PDF 130–131) | Turunan fungsi aljabar (gabungan) | Materi 05, 06, 07 (latihan) |
| B.3 (PDF 132–135) | Turunan trigonometri, STT 1 | Materi 08 |
| B.4 (PDF 136–142) | Turunan eksponensial, bilangan e, Definisi 2.5 | Materi 08 |
| C.1 (PDF 143–147) | Persamaan garis singgung | Materi 09 |
| C.2 (PDF 147–152) | Fungsi naik, turun, diam, Definisi 2.6 | Materi 10 |
| C.3 (PDF 153–163) | Titik ekstrem, uji turunan pertama | Materi 11 |
| D (PDF 164–168) | Aplikasi di berbagai bidang: kecepatan-percepatan, optimum | Materi 12 |

Rujukan pendamping, hanya untuk memastikan istilah dan definisinya benar:
`D:\SEKOLAH S1 & S2\S1\matematika\kalkulus 1.pdf` (diktat ITB) dan Stewart
(`Calculus (9rd Edition).pdf`, scan; buka seperlunya). Level bahasa dan soal:
big book SMA dan https://mathcyber1997.com.

**Catatan gaya.** Buku memakai kisah pabrik sepatu dan Pacu Jawi. MANTRA
memakai contoh sendiri (contoh dan angka ditulis sendiri), tetapi urutan
konsep dan definisi mengikuti buku, dan buku disebut sebagai sumbernya di
kepala `tahap.ts`.

---

## Kenapa Turunan disusun begini

Salah paham yang dilawan (untuk `content/topik.ts`):

> *"turunan itu rumus pangkat: turunkan pangkatnya, kalikan ke depan."*

Salah paham itu wajar. Di sekolah, sembilan dari sepuluh soal turunan
memang selesai dengan aturan pangkat. Siswa lalu percaya turunan ADALAH
aturan itu, dan begitu bertemu sin x, e^x, atau grafik yang harus dibaca
kemiringannya, ia kehilangan pegangan. Padahal turunan adalah **kemiringan
garis singgung**, satu gagasan; aturan pangkat cuma cara cepat menghitungnya
untuk satu jenis fungsi.

Karena itu urutannya: **kemiringan dulu, rumus belakangan**. Empat materi
pertama tidak memakai satu pun aturan; siswa melihat garis potong berubah
jadi garis singgung, lalu melihat kemiringan itu berubah dari titik ke titik
sampai membentuk fungsi baru. Baru sesudah itu aturan pangkat DITURUNKAN
dari definisi (Materi 04), bukan disodorkan.

Sama seperti Trigonometri dan Limit: **masalah dulu, rumus belakangan.**

Batas dengan topik lain (jangan mengulang, sambungkan):
- **Limit** (sudah ada): limit, bentuk 0/0, kecepatan sesaat (Limit Materi
  01), kekontinuan (Limit Materi 09). Turunan Materi 01 mulai dengan
  "Limit Materi 01 sudah memperlihatkan selang yang menyusut; sekarang kita
  beri nama pada hasilnya."
- **Grafik Fungsi**: bentuk grafik, transformasi. Turunan hanya membaca
  kemiringannya.
- **Trigonometri Materi 09** (tiga grafik): Materi 08 memakai kembali grafik
  sin dan cos untuk memperlihatkan "kemiringan sinus adalah kosinus".

---

## Aturan urutan istilah (alat `alat/cek_urutan_belajar.py`)

Keputusan ARYA 5 Sep 2026: istilah tidak boleh muncul sebelum materi yang
mengajarkannya. Daftar untuk topik ini (materi yang mengajarkan):

| Istilah | Materi |
|---|---|
| laju perubahan rata-rata, garis potong (sekan) | 01 |
| garis singgung, turunan, f'(x), kemiringan sesaat | 02 |
| fungsi turunan, dy/dx, notasi Leibniz | 03 |
| aturan pangkat | 04 |
| turunan jumlah, selisih, kelipatan | 05 |
| aturan hasil kali, aturan hasil bagi | 06 |
| aturan rantai, fungsi komposisi (nama), fungsi dalam/luar | 07 |
| turunan sin, cos, tan, e^x, bilangan e | 08 |
| persamaan garis singgung, gradien garis singgung | 09 |
| fungsi naik, fungsi turun, stasioner (diam) | 10 |
| titik ekstrem, titik balik maksimum/minimum, uji turunan pertama | 11 |
| percepatan, turunan kedua, nilai optimum | 12 |

Kata sehari-hari (miring, curam, naik) BOLEH dipakai kapan saja; yang
dilarang menyebut NAMANYA lebih awal (temuan sesi Transformasi).

---

## Alur 12 materi

Bentuk datanya sama dengan topik lain (`content/tipe.ts`): `no`, `slug`,
`judul`, `pertanyaan`, `labelPendek`, `intisari`, `penjelasan` (blok),
`seringKeliru`, `widget`, `video`, `siap`. **Setiap materi berwidget WAJIB
punya blok `jenis: 'coba'`** (aturan CLAUDE.md, 5 Sep 2026).

Semua widget memakai **sistem kendali bersama** `web/components/kendali/`
(`Angka`, `Koordinat`, `Pilihan`, `Petunjuk`, `Kembalikan`) dan aturan
5 Sep 2026: jendela TETAP (tidak melar saat diseret), seretan ditahan di
kotak batas, bagian gambar menyala (`.nyala`) saat kendalinya dipegang, label
sumbu dari `lib/petak-sumbu.ts`, tombol Kembalikan semula. Contoh yang harus
ditiru: `widget/vektor/PanahBerpindah.tsx` (seret + ketik), `widget/limit/`
(papan fungsi), `widget/grafik-fungsi/Bidang.tsx`.

### Materi 01: Seberapa cepat, rata-ratanya

**Sub-bab A. Kemiringan yang berubah.**

**Pertanyaan:** Pabrik membuat 20 barang pada jam pertama dan 64 barang
sampai jam ketiga. Berapa laju produksinya dari jam ke-1 sampai jam ke-3,
dan kenapa angka itu terlihat sebagai kemiringan sebuah garis?

**Isi pokok.** Laju perubahan rata-rata = selisih nilai dibagi selisih
waktu = kemiringan garis yang menghubungkan dua titik pada kurva (buku PDF
113–116, Gambar 2.8 dan 2.9, dengan angka sendiri). Garis itu dinamai garis
potong. Ditegaskan: angka yang sama bisa berbeda tergantung DUA titik mana
yang dipilih; itu sebabnya ia disebut rata-rata. Sambungan ke Limit Materi
01: di sana selang waktu dibuat menyusut; di sini kita mulai dari selang
yang masih lebar.

**Widget `garis-potong`.** Kurva produksi (mulus, naik lalu melandai) pada
papan ber-sumbu (jam 0 sampai 6, hasil 0 sampai 120). Dua titik P dan Q di
kurva. Kendali: `Angka` "Jam awal x₁" (0 sampai 5, langkah 0,5), `Angka`
"Selang waktu h" (0,5 sampai 4, langkah 0,5); keduanya juga bisa diseret di
gambar (titik P dan Q, sasaran sentuh besar, `TitikPegang` pola Statistika).
Gambar menampilkan segitiga Δx dan Δy di bawah garis potong dan angka
kemiringannya; saat h dipegang, segitiganya menyala. Panel kanan: tabel
x₁, x₁+h, f(x₁), f(x₁+h), Δy/Δx. `Petunjuk`: "geser h makin kecil, dan
perhatikan kemiringannya berhenti berubah banyak". Jendela tetap.

**Sering keliru:** *"laju rata-rata itu nilai fungsi di tengah selang."*
Bukan; ia selisih dibagi selisih, dan tidak peduli apa yang terjadi di
antara dua titiknya.

**Video:** ya (prioritas ke-5).

### Materi 02: Garis potong yang berubah jadi garis singgung

**Pertanyaan:** Kalau titik Q terus mendekati P, garis potongnya menjadi
garis apa, dan angka apa yang tersisa?

**Isi pokok.** Definisi turunan di satu titik sebagai limit kemiringan
garis potong saat h menuju 0 (Definisi 2.3 dan 2.4, PDF 116–117):

    f'(x₁) = lim (h→0) [ f(x₁ + h) − f(x₁) ] / h

Dinamai: garis singgung, kemiringan sesaat, turunan. Dihitung SATU kali dari
definisi untuk f(x) = x² di x = 1: [(1+h)² − 1]/h = 2 + h → 2. Ditegaskan
bahwa h = 0 tidak boleh dimasukkan ke bentuk aslinya (itu Limit Materi 04),
dan bahwa hasilnya SATU ANGKA untuk satu titik.

**Widget `sekan-ke-tangen`.** Kurva f(x) = x² (atau pilihan: x², x³ − 3x,
sin x). Titik P tetap (bisa diketik x₁, −2 sampai 2), titik Q di x₁ + h.
Kendali: `Angka` "h" dari 2 turun sampai 0,01 (langkah 0,01, tampil 2
desimal) dengan `Pilihan` "Contoh cepat" h = 1 / 0,5 / 0,1 / 0,01; `Pilihan`
fungsi. Gambar: garis potong biru mengejar garis singgung ungu yang sudah
digambar samar; tabel kanan: h, kemiringan garis potong, selisihnya ke
f'(x₁). Saat h dipegang, garis potong dan titik Q menyala. `Petunjuk`:
"kecilkan h sampai 0,01, garis birunya menempel ke garis ungu; angkanya
merapat ke 2 tapi tidak pernah menyentuh sebelum h benar-benar nol".

**Sering keliru:** *"turunan itu garis singgungnya."* Turunan adalah
KEMIRINGAN garis singgung, sebuah angka; garisnya sendiri dibahas Materi 09.

**Video:** ya (prioritas ke-1, inti topik).

### Materi 03: Turunan sebagai fungsi baru

**Pertanyaan:** Kalau tiap titik punya kemiringannya sendiri, apa yang
terjadi kalau semua kemiringan itu digambar?

**Isi pokok.** Dari turunan di SATU titik (angka) ke turunan di SEMUA titik
(fungsi baru f'). Untuk f(x) = x², kemiringan di x = −1, 0, 1, 2 adalah
−2, 0, 2, 4: titik-titik itu membentuk garis y = 2x, jadi f'(x) = 2x.
Notasi: f'(x) (Newton) dan dy/dx (Leibniz), PDF 118; dy/dx dibaca sebagai
"perubahan y per perubahan x", bukan pecahan biasa. Kaitan bentuk: f' positif
di tempat f menanjak, nol di puncak/lembah, negatif di tempat f menurun
(dibahas penuh Materi 10, di sini cukup dilihat).

**Widget `grafik-turunan`.** Dua papan bertumpuk (atas f, bawah f') dengan
sumbu x yang sama. Kendali: `Angka` "x" (−3 sampai 3, langkah 0,1), juga
bisa diseret (titik di kurva atas); `Pilihan` fungsi (x², x³ − 3x, sin x,
|x| untuk pengecualian). Saat x digeser, garis singgung di papan atas ikut,
dan titik (x, f'(x)) di papan bawah menjejak membentuk kurva f' (jejak
tersimpan sampai tombol Kembalikan). Panel kanan: x, f(x), kemiringan.
`Petunjuk`: "sapu x dari kiri ke kanan, dan lihat kurva bawah lahir dari
kemiringan kurva atas". Untuk |x| di x = 0, jejaknya melompat dari −1 ke 1
dan panel menulis "turunan tidak ada di sini".

**Sering keliru:** *"f' adalah f yang digambar lebih kecil."* f' adalah
catatan kemiringan f, bentuknya bisa sama sekali berbeda.

**Video:** ya (prioritas ke-2).

### Materi 04: Aturan pangkat lahir dari definisi

**Pertanyaan:** Kenapa turunan x² adalah 2x, x³ adalah 3x², dan seterusnya?

**Isi pokok.** Menghitung dari definisi (PDF 119–121, Ayo Bereksplorasi
2.6): (x+h)² − x² = 2xh + h², dibagi h jadi 2x + h, limitnya 2x. Lalu x³:
3x² + 3xh + h² → 3x². Polanya: xⁿ → n·xⁿ⁻¹ (Aturan Pangkat, PDF 120), dan
konstanta → 0 (grafiknya mendatar, PDF 121). Ditegaskan: aturan ini
DITURUNKAN, bukan dihafal, dan berlaku untuk pangkat pecahan dan negatif
(√x = x^½ → ½ x^(−½)), yang buku bahas lewat Sifat Eksponen (PDF 122–124).

**Widget `mesin-pangkat`.** Kendali: `Pilihan` "Pangkat n" (1, 2, 3, 4,
½, −1), `Angka` "x" (0,5 sampai 3, langkah 0,1; ditahan positif supaya
pangkat pecahan sah), `Angka` "h" (1 turun ke 0,01). Gambar: kurva xⁿ,
garis potong dengan h, dan kotak hitung yang menulis uraian (x+h)ⁿ − xⁿ
dibagi h untuk n bulat 1 sampai 4 (baris demi baris, seperti
`limit/BongkarBertahap`), lalu hasil n·xⁿ⁻¹ di panel kanan dibandingkan
dengan kemiringan garis potong. `Petunjuk`: "ganti n, dan perhatikan sisa
yang mengandung h selalu hilang saat h menuju nol".

**Sering keliru:** *"turunan x² adalah x."* Pangkatnya turun SETELAH
dikalikan ke depan; widget memperlihatkan 2x bukan x lewat kemiringan.

**Video:** ya (prioritas ke-6).

### Materi 05: Menurunkan suku demi suku

**Sub-bab B. Aturan menurunkan.**

**Pertanyaan:** Kalau fungsinya jumlah beberapa suku, bolehkah tiap suku
diturunkan sendiri-sendiri?

**Isi pokok.** Sifat Turunan 1 dan 2 (PDF 121): kelipatan, jumlah, selisih.
Alasannya dari limit jumlah = jumlah limit (Limit Materi 05). Contoh
polinom: 3x⁴ − 2x² + 5x − 7 → 12x³ − 4x + 5. Ditegaskan yang TIDAK boleh:
hasil kali dan hasil bagi tidak boleh diturunkan suku demi suku (dibuktikan
salah dengan satu contoh angka: (x · x)' ≠ 1 · 1), itu urusan Materi 06.

**Widget `susun-polinom`.** Kendali: empat `Angka` koefisien a, b, c, d
(masing-masing −3 sampai 3, langkah 0,5) untuk ax³ + bx² + cx + d; `Angka`
"x" untuk membaca kemiringan. Gambar: kurva f (atas) dan f' (bawah) berubah
serentak; rumus f' ditulis hidup di panel kanan, suku yang koefisiennya
sedang dipegang menyala di rumus DAN di kurva (bagian kurva berubah).
`Petunjuk`: "ubah d saja, dan lihat kurva bawah tidak bergerak sama sekali:
konstanta hilang saat diturunkan".

**Sering keliru:** *"(u · v)' = u' · v'."* Ditaruh di bawah, dengan contoh
angka yang membantahnya.

**Video:** tidak. Materi aturan; widgetnya sudah cukup.

### Materi 06: Hasil kali dan hasil bagi

**Pertanyaan:** Kenapa turunan hasil kali bukan hasil kali turunan?

**Isi pokok.** Sifat Turunan 3 dan 4 (PDF 121): (uv)' = u'v + uv',
(u/v)' = (u'v − uv')/v². Alasan hasil kali lewat GAMBAR: persegi panjang
berukuran u × v yang kedua sisinya bertambah sedikit; luas tambahannya dua
pita (u'·v dan u·v') plus pojok kecil yang lenyap saat h menuju nol. Hasil
bagi diturunkan dari hasil kali dan Materi 07, atau diterima sebagai aturan
dengan satu contoh diperiksa angkanya. Contoh: (x² + 1)(x − 3), dan
(2x + 1)/(x − 1).

**Widget `luas-berubah`.** Persegi panjang u(x) × v(x) untuk u = x + 1,
v = x² (atau pilihan lain). Kendali: `Angka` "x" (0,5 sampai 3), `Angka`
"h" (1 turun ke 0,05). Gambar: persegi panjang lama, dua pita tambahan
berwarna aksen dan aksen2, pojok kecil ungu; panel kanan: luas pita 1 =
Δu·v, pita 2 = u·Δv, pojok = Δu·Δv, dibagi h masing-masing, dan jumlahnya
dibandingkan dengan (uv)' dari rumus. Saat h dipegang, pojoknya menyala
(itulah yang lenyap). `Petunjuk`: "kecilkan h, dan lihat pojok ungu hilang
lebih cepat daripada dua pitanya".

**Sering keliru:** *"pembilang aturan hasil bagi boleh dibalik urutannya."*
Tandanya berubah; diperiksa dengan angka di panel.

**Video:** ya (prioritas ke-4, gambar pita paling menjelaskan).

### Materi 07: Fungsi di dalam fungsi, aturan rantai

**Pertanyaan:** Kalau y bergantung pada u, dan u bergantung pada x, seberapa
cepat y berubah terhadap x?

**Isi pokok.** Aturan rantai (PDF 124–129): fungsi luar dan fungsi dalam,
(f∘g)'(x) = f'(g(x)) · g'(x), atau dy/dx = dy/du · du/dx. Jalan masuknya
seperti buku: (x² + 1)² diuraikan dulu lalu diturunkan (4x³ + 4x = 2(x²+1)·2x),
lalu (x² + 1)³, sampai polanya terlihat, baru dinamai. Sambungan ke
komposisi fungsi (Kelas 11) cukup satu kalimat, tidak diulang. Contoh
lanjutan: √(3x + 1), (2x − 5)⁸.

**Widget `mesin-bertingkat`.** Dua mesin berderet: x masuk ke mesin g
(pilihan: 2x + 1, x² + 1, 3x), keluar u, masuk mesin f (pilihan: u², u³,
√u), keluar y. Kendali: `Angka` "x" (0,5 sampai 3), `Pilihan` g, `Pilihan`
f. Gambar: tiga garis bilangan bertumpuk (x, u, y) dengan pita kecil Δx di
x, pita Δu yang panjangnya g'(x) kali lipat, pita Δy yang panjangnya f'(u)
kali lipat lagi; angka pengali tiap tingkat di panel kanan dan hasil kalinya.
Saat x dipegang, ketiga pita menyala. `Petunjuk`: "pilih g = 3x, dan lihat
pita u selalu tiga kali pita x apa pun f-nya".

**Sering keliru:** *"turunan (2x+1)⁵ adalah 5(2x+1)⁴, selesai."* Lupa
mengalikan turunan dalam (2); widget memperlihatkan pita dalam yang
dilupakan.

**Video:** ya (prioritas ke-3).

### Materi 08: Turunan sinus, kosinus, dan eˣ

**Pertanyaan:** Kalau fungsinya bukan pangkat, dari mana turunannya?

**Isi pokok.** Turunan sin x = cos x dan cos x = −sin x (STT 1, PDF
132–135), diyakinkan lewat gambar: kemiringan grafik sinus di tiap titik
persis tinggi grafik kosinus di titik yang sama (memakai kembali Trigonometri
Materi 09). Bukti dari definisi ditulis ringkas untuk sinus dengan
lim sin h / h = 1 (Limit Materi 08). tan x → sec² x diturunkan lewat aturan
hasil bagi (Materi 06). Turunan eˣ = eˣ (PDF 136–141): bilangan e
diperkenalkan sebagai bilangan pokok yang membuat kemiringan kurva sama
dengan tingginya; aˣ hanya disebut. Semua sudut dalam radian.

**Widget `kemiringan-sinus`.** Papan atas: grafik pilihan (sin x, cos x,
eˣ) dengan titik yang bisa diseret; papan bawah: jejak kemiringannya
(seperti Materi 03) yang ternyata membentuk cos x, −sin x, atau eˣ sendiri
(disamarkan dulu, lalu ditampilkan lewat `Pilihan` "Tampilkan tebakan").
Kendali: `Angka` "x" (−2π sampai 2π untuk trigonometri, −2 sampai 2 untuk
eˣ), `Pilihan` fungsi. `Petunjuk`: "untuk eˣ, tinggi kurva dan kemiringannya
selalu sama persis; itulah yang membuat e istimewa".

**Sering keliru:** *"turunan cos x adalah sin x."* Tanda minusnya hilang;
jejak di papan bawah memperlihatkan kurvanya terbalik.

**Video:** ya (prioritas ke-7, cadangan).

### Materi 09: Persamaan garis singgung

**Sub-bab C. Turunan membaca grafik.**

**Pertanyaan:** Sekarang kemiringannya diketahui; bagaimana menulis
persamaan garisnya?

**Isi pokok.** y − y₁ = m(x − x₁) dengan m = f'(x₁) (PDF 143–147). Tiga
langkah buku: cari titik singgung, cari turunan, tulis persamaan. Contoh:
y = x² + 2x + 1 di x = 0 dan x = −1. Garis normal disebut satu kalimat
saja (tegak lurus, kemiringan −1/m), tidak diperdalam.

**Widget `garis-singgung-geser`.** Kurva pilihan (x² + 2x + 1, x³ − 3x,
√x). Titik singgung bisa diseret dan diketik (`Angka` "x₁", −3 sampai 3,
langkah 0,5). Gambar: garis singgung penuh dengan persamaannya ditulis di
panel kanan bertahap (m = f'(x₁), titik, persamaan). Saat x₁ dipegang, garis
dan titiknya menyala. `Pilihan` "Contoh buku" mengisi x₁ = 0 dan x₁ = −1.
`Petunjuk`: "geser ke puncak atau lembah, dan garis singgungnya mendatar:
m = 0".

**Sering keliru:** *"gradien garis singgung dibaca dari f(x₁), bukan
f'(x₁)."* Panel memisahkan keduanya dengan jelas.

**Video:** tidak (widgetnya sudah cukup).

### Materi 10: Naik, turun, dan diam

**Pertanyaan:** Bisakah tanda turunan memberi tahu bentuk grafik tanpa
menggambarnya?

**Isi pokok.** Definisi 2.6 (PDF 147–152): f naik di selang saat f' > 0,
turun saat f' < 0, diam (stasioner) saat f' = 0. Dikerjakan lewat tabel
tanda: cari akar f', uji tanda di tiap selang. Contoh: f(x) = x³ − 3x,
f' = 3x² − 3, akar ±1, naik di x < −1 dan x > 1, turun di antaranya.

**Widget `peta-tanda`.** Kurva f (pilihan: x³ − 3x, x⁴ − 2x², −x² + 4x)
dengan pita tanda f' di bawah sumbu (hijau +, merah −, titik nol). Kendali:
`Angka` "x" yang bisa diseret; `Pilihan` fungsi. Saat x digeser, garis
singgung kecil ikut dan panel menulis f'(x), tanda, dan kata "naik/turun/
diam". Bagian pita tempat x berada menyala. `Petunjuk`: "cari kedua tempat
garis singgungnya mendatar, lalu baca pitanya berganti warna tepat di situ".

**Sering keliru:** *"f' = 0 berarti puncak."* Belum tentu (x³ di x = 0 diam
tapi tidak berbalik); itu jembatan ke Materi 11.

**Video:** ya (prioritas ke-8, cadangan).

### Materi 11: Titik balik, terbesar dan terkecil

**Pertanyaan:** Kotak tanpa tutup dibuat dari karton persegi 18 cm dengan
memotong pojoknya. Berapa potongan pojok yang membuat volumenya terbesar?

**Isi pokok.** Titik ekstrem/stasioner (f' = 0) dan uji turunan pertama
(PDF 153–163): f' berganti dari negatif ke positif = titik balik minimum,
sebaliknya maksimum, tidak berganti = bukan titik balik. Soal kotak (Contoh
2.15, PDF 166–167, angka dipakai apa adanya karena ini soal klasik): V(x) =
(18 − 2x)² x, V' = 12x² − 144x + 324 = 0 → x = 3 (x = 9 tidak masuk akal),
V maks = 432 cm³. Ditegaskan: nilai maksimum di ujung selang juga harus
diperiksa (x = 0 dan x = 9 memberi V = 0).

**Widget `kotak-terbesar`.** Kiri: karton 18 × 18 dengan pojok terpotong
sebesar x (bisa diseret pojoknya; `Angka` "x" 0,5 sampai 8,5, langkah 0,5)
yang melipat jadi kotak (gambar tampak atas + tinggi ditulis). Kanan (di
papan yang sama, bawah): grafik V(x) dengan titik dan garis singgungnya.
Panel kanan: p, l, t, V(x), V'(x). Saat x dipegang, titik di grafik dan
garis singgungnya menyala. `Petunjuk`: "cari x yang membuat garis singgungnya
mendatar, lalu bandingkan dengan x = 3 dari hitungan".

**Sering keliru:** *"nilai maksimum = nilai x-nya."* Maksimumnya V(3) =
432, bukan 3; panel memisahkan "di mana" dan "berapa".

**Video:** ya (prioritas ke-9, cadangan).

### Materi 12: Turunan di sekitar kita

**Sub-bab D. Penerapan.**

Galeri tidak interaktif, pola `widget/limit/DuniaNyataLimit.tsx` dan
`widget/statistika/DuniaNyataStatistika.tsx`: grafik kecil digambar sendiri,
bukan foto. Empat kartu, tiap kartu menyebut materi yang bekerja:

1. **Kecepatan dan percepatan** (buku Contoh 2.14, PDF 164–165): h(t) =
   50t − 5t², v = h' = 50 − 10t, percepatan = v' = −10 (turunan kedua
   diperkenalkan di sini, satu kalimat). Grafik h dan v.
2. **Pertumbuhan yang lajunya sebanding dengan jumlahnya**: model eksponensial
   (buku B.4), grafik dan kemiringannya; angka contoh.
3. **Kotak dan kaleng termurah**: optimasi (Materi 11) di pabrik.
4. **Biaya marginal** (ekonomi): turunan biaya total = biaya membuat satu
   barang tambahan; grafik biaya dan kemiringannya.

Semua angka ditulis sebagai angka contoh, dinyatakan di bacaannya.

**Video:** tidak.

---

## Peta sub-bab (untuk `subbab.ts`)

| Huruf | Nama | Materi |
|---|---|---|
| A | Kemiringan yang berubah | 1, 2, 3, 4 |
| B | Aturan menurunkan | 5, 6, 7, 8 |
| C | Turunan membaca grafik | 9, 10, 11 |
| D | Penerapan | 12 |

`slug: 'turunan'`, `no: 2` (Bab 2 buku Tingkat Lanjut XII), `kelas: 'Kelas 12'`,
`urutanKelas: 12`, `sumber: 'Tingkat Lanjut K12 Bab 2'`.

---

## Video: urutan prioritas (BELUM dikerjakan sampai ARYA memerintahkan)

| Urutan | Materi | Kenapa |
|---|---|---|
| 1 | 02, garis potong jadi garis singgung | inti topik |
| 2 | 03, turunan sebagai fungsi | membunuh "turunan = rumus" |
| 3 | 07, aturan rantai | paling sering salah di ujian |
| 4 | 06, pita luas hasil kali | gambar yang menjelaskan rumus |
| 5 | 01, laju rata-rata | pembuka; boleh 3D pembuka 5 detik (pabrik) |
| 6 | 04, aturan pangkat dari definisi | |
| 7 | 08, kemiringan sinus | cadangan |
| 8 | 10, naik turun diam | cadangan |
| 9 | 11, kotak terbesar | cadangan |

Aturan video: `docs/tugas/STANDAR-ILUSTRASI-VIDEO.md` versi 2 dan gerbang
video di `CLAUDE.md`. Video pertama topik boleh punya pembuka 3D 5 detik.

---

## Latihan dan kuis

Mengikuti topik lain: 4 soal latihan bertahap di halaman topik, 32 soal kuis
(8 per tingkat), halaman `/latihan/turunan`. **Kalibrasi kesulitan dulu** ke
buku: Latihan Soal Definisi Turunan (PDF 118), Contoh Soal 2.5 sampai 2.15,
Ayo Mencoba 2.3 sampai 2.10, dan latihan akhir bab (PDF 169–173). Soal
salinan wajib bersumber; soal tanpa keterangan berarti tulisan sendiri.

**Semua angka diperiksa mesin**: pakai `alat/cek_soal.py` dengan berkas
klaim `alat/soal-latihan-turunan.json` dan `alat/soal-kuis-turunan.json`
(sympy: `diff`, `limit`, `solve`). Alatnya wajib dibuktikan dua arah (menolak
jawaban yang sengaja salah).

---

## Urutan pengerjaan sesi

| Tahap kerja | Isi | Bukti selesai |
|---|---|---|
| 1 | Isi 12 materi di `content/turunan/tahap.ts` | `cek_urutan_belajar.py` nol pelanggaran, `periksa_tahap.py` lolos |
| 2 | 11 widget + `PanggungTurunan.tsx` | tiap widget: seret, ketik, batas, nyala, kembalikan; potret 375 dan 1366 px |
| 3 | Latihan 4 soal, kuis 32 soal, halaman latihan | `cek_soal.py` lolos, sympy |
| 4 | `siap: true`, laporan SIAP GABUNG | tsc, eslint, build lewat biner Node langsung |

Lalu Integral (`2026-09-06-integral-alur-belajar.md`) dengan urutan yang sama.
