# Catatan belajar: cara mathcyber1997 menulis pembahasan

Dibuat 14 Sep 2026 oleh Claude (MATRA-MASTER) atas perintah ARYA: pelajari dulu cara
menulis pembahasan yang benar sebelum menulis ulang 540 soal latihan MANTRA.
Bahan: 132 PDF soal di folder ini (soalnya saja) dan 96 halaman pembahasan dari
situsnya yang tertaut di tiap PDF (`pembahasan-web/*.md`, teks utuh dengan rumus
LaTeX mentah dan penanda `[GAMBAR: url]`). Contoh gambar pembahasan yang diunduh
untuk ditiru ada di `gambar-web/`.

Berkas ini diperbarui sambil membaca. Bagian 1 sampai 3 berlaku untuk semua topik;
bagian 4 catatan per topik MANTRA.

---

## 1. Kerangka satu pembahasan (selalu sama)

Urutan yang dipakai hampir di setiap soal:

1. **Kalimat pembuka yang mengarahkan.** Menyebut fakta kunci yang jadi pijakan,
   atau memerintahkan melihat gambar bantu. Bentuknya salah satu dari:
   - "Perhatikan bahwa α berada di kuadran III sehingga tangen sudutnya bernilai
     positif, sedangkan sinus sudutnya bernilai negatif."
   - "Ingat bahwa π rad = 180°."
   - "Perhatikan sketsa gambar berikut." (lalu gambar BANTU yang digambar sendiri)
   - "Kosinus sudut adalah perbandingan panjang sisi samping sudut terhadap sisi
     miring (hipotenusa) pada suatu segitiga siku-siku." (definisi disebut utuh
     SEBELUM dipakai)
   - "Karena P sudut lancip, maka nilai seluruh perbandingan trigonometri bertanda
     positif."
   - "Diketahui bahwa tan α = 1/a." / "Diketahui: AB = BC = 5√2 cm, TA = TC = 13 cm."
2. **Menerjemahkan yang diketahui jadi benda konkret yang bisa dihitung.**
   "Karena tan α = 3/4, maka bisa dianggap bahwa panjang sisi depan sudutnya 3,
   sedangkan panjang sisi samping sudutnya 4 (tan = de/sa) seperti gambar berikut."
   "Misalkan AB = 3 dan AC = 4, maka dengan menggunakan teorema Pythagoras, diperoleh"
   "Misalkan O merupakan proyeksi titik P ke garis HB. Titik O berada di tengah garis
   HB karena PB = PH."
3. **Hitungan ditulis PENUH, sejajar, satu baris satu langkah.** Tidak ada yang
   dilompati: √(3² + 4²) = √25 = 5; √(72 − 18) = √54 = 3√6. Pencoretan ditunjukkan
   (\cancel). Satuan dibawa (cm).
4. **Tiap alat disebut namanya sebelum dipakai**, dan segitiga yang ditinjau disebut
   beserta letak siku-sikunya: "Sekarang tinjau segitiga siku-siku BOG.",
   "Perhatikan segitiga ABD (siku-siku di A).", "Dengan menggunakan prinsip
   kesamaan luas segitiga, diperoleh", "Dengan menggunakan aturan kosinus pada
   △CFD dengan mengacu pada sudut D, kita peroleh".
5. **Tanda atau syarat dijelaskan di tempatnya, dalam kurung.**
   "sin α = −de/mi = −3/5. (Sinus sudut bernilai negatif ketika berada di
   kuadran III)"; "MH = 4 cm (setengah dari panjang rusuk kubus)"; "OG = 4√3 cm
   (setengah dari panjang diagonal ruang kubus)".
6. **Penutup mengulang APA yang ditanya dengan kata-kata soal, lalu jawaban dikotak,
   lalu huruf pilihan.** "Jadi, jarak titik B ke garis HC adalah [8 cm]. (Jawaban D)"
   "Jadi, nilai cot A = (3/7)√7. (Jawaban B)" Kalau ada satuan, satuan ikut.

Kata sambung yang menuntun (dipakai persis begini, urutannya bermakna):
`Perhatikan bahwa` (fakta kunci) → `Karena ..., maka ...` (akibat) → `Misalkan ...`
(pemisalan) → `Dengan menggunakan teorema Pythagoras, diperoleh` (alat + hasil) →
`Dengan demikian,` / `Untuk itu,` / `Akibatnya,` (menyimpulkan langkah) →
`Selanjutnya,` / `Sekarang, tinjau ...` / `Terakhir, perhatikan ...` (pindah langkah)
→ `Jadi, ...` (penutup). Juga: `Ingat bahwa`, `Diketahui bahwa`, `Tampak bahwa`,
`haruslah`, `Ini berarti`, `Dari sini, diketahui bahwa`, `Di lain itu,`.

Nada: formal, tanpa "kamu" atau "Anda" di dalam pembahasan (kalau ada, "kita":
"kita peroleh", "kita akan mencari"). Kalimat lengkap dengan subjek dan predikat.
Tidak ada kalimat pendek bertitik dua ala catatan.

### Yang salah pada pembahasan saya kemarin (diagnosis, supaya tidak terulang)

Kemarin saya menulis: "Sudut di kuadran III: sin dan cos sama-sama negatif,
sehingga tan-nya positif, cocok dengan 3/4." / "Segitiga acuan bersisi depan 3,
samping 4, miring 5 (Pythagoras)." / "Besar sin α = 3/5; tandanya negatif karena
kuadran III: sin α = −3/5."
- Bentuknya potongan catatan (frasa : frasa), bukan kalimat yang menuntun.
- Hitungan dilompati (langsung "miring 5", tanpa √(3² + 4²) = √25 = 5).
- Alatnya disebut belakangan dalam kurung, bukan sebelum dipakai.
- Tidak ada gambar bantu; gambar soal diulang mentah di panel pembahasan.
- Penutup tidak mengulang kata-kata soal dan tidak menyebut huruf jawaban.

---

## 2. Gambar bantu di pembahasan (bukan gambar soal diulang)

Pembahasan mathcyber1997 hampir selalu menggambar SENDIRI, dan gambarnya mengandung
hasil langkah, bukan keadaan soal. Polanya per jenis:

| Situasi | Gambar bantu yang dipakai | Contoh berkas |
|---|---|---|
| Sudut di kuadran tertentu | (a) bagan empat kuadran dengan nama kuadran, sudut 0°/90°/180°/270°, dan fungsi yang positif di tiap kuadran ("Kuadran III: tan +", jembatan keledai Semua-Sindikat-Tangannya-Kosong); (b) segitiga siku-siku ACUAN berlabel "Depan = 3", "Samping = 4", "Miring = ?", sudut α ditandai | `usbn11.png`, `istimewa6.png` |
| Soal memberi koordinat titik | titik-titik digambar di bidang Kartesius lengkap dengan nama dan koordinatnya, segitiganya diarsir, lalu "Tampak bahwa segitiga KLM siku-siku (di L)" | `trigono12.png` |
| Bangun ruang (kubus, balok, limas) | DUA gambar berdampingan: kiri bangun ruang dengan garis bantu berwarna dan bidang yang diarsir, nama titik bantu (O, K, J); kanan segitiga yang DICABUT dari bangun itu, digambar datar, SEMUA panjang yang sudah diketahui ditulis di sisinya, yang dicari diberi "?", siku-siku diberi tanda kotak, garis tinggi putus-putus | `dimensi3-1.png`, `dimensi7-1.png`, `dimensi8.png`, `dimensi16-1.png` |
| Bangun datar dalam soal cerita (persegi dengan titik P) | sketsa bangun dengan semua nama titik, lalu segitiga yang dipakai dicabut dan digambar terpisah dengan panjangnya | `trigonoasli5.png`, `trigonoasli2.png` |
| Segitiga dari kata-kata ("segitiga KLM siku-siku di L") | "Perhatikan sketsa gambar berikut." lalu segitiga digambar dengan nama titik dan panjang yang diketahui | `trigonoasli4.png` |

Ciri gambar: hitam putih sederhana, huruf tegak, panjang ditulis langsung di sisi
(dengan satuan), tanda tanya untuk yang dicari, satu warna sorot (biru/merah)
hanya untuk benda yang sedang dibicarakan. Tidak ada hiasan.

Kalimat yang mengikat teks dan gambar: "seperti gambar berikut", "Perhatikan sketsa
gambar berikut.", "Selanjutnya, tarik garis EG, EJ, dan JG sehingga diperoleh
segitiga yang dapat digambarkan sebagai berikut.", "(lihat gambar kanan)",
"Sketsakan ulang gambarnya dengan memberi nama titik sudutnya seperti gambar."

Konsekuensi untuk MANTRA: panel pembahasan butuh gambar per langkah (langkah yang
menggambar sesuatu membawa gambarnya sendiri), dan perender baru untuk (1) bagan
kuadran bersorot, (2) segitiga acuan berlabel angka, (3) segitiga umum yang dicabut
dari bangun ruang (nama titik, panjang sisi, garis tinggi, tanda siku), (4) bangun
ruang dengan bidang diarsir dan ruas berwarna (sudah ada: Balok).

---

## 3. Kebiasaan kecil yang membuat pembahasan jelas

- Singkatan `de`, `sa`, `mi` (depan, samping, miring) diperkenalkan lalu dipakai
  konsisten: "sin α = de/mi".
- Titik bantu selalu DINAMAI sebelum dipakai: "Misalkan O titik tengah EG",
  "Misalkan proyeksi titik E pada bidang BDG adalah titik K".
- Alasan kenapa kaki tegak lurus jatuh di tengah disebut: "Titik O tepat di tengah AG
  karena panjang MA dan MG sama."
- Diagonal disebut jenisnya dan rumusnya: "HB merupakan diagonal ruang kubus, dan
  karena panjang rusuknya s = 12 cm, maka HB = s√3 = 12√3 cm."
- Kalau soal bisa dikerjakan dua cara, keduanya diberi judul: "Metode Penyelesaian 1:
  Konsep Segitiga", "Metode Penyelesaian 2: Konsep Vektor 3D" plus catatan kapan
  cara kedua boleh dipakai.
- "Tips & Trick" diberikan SETELAH cara panjang, bukan menggantikannya: "jarak yang
  dimaksud dapat dicari secara langsung dengan rumus (2/3)s√3".
- Soal pernyataan benar/salah: semua pernyataan dihitung, lalu "Jadi, dari kelima
  pernyataan yang diberikan, pernyataan yang salah ada pada pilihan jawaban D."
- Soal pembuktian: "Pembuktian dari ruas kiri." lalu hitungan sampai "(Terbukti)".
- Bentuk jawaban dirapikan ke bentuk pilihan: 3/√7 ditulis (3/7)√7; √(10/4) ditulis
  (1/2)√10; 120/13 ditulis 9 3/13 karena pilihannya begitu.

---

## 4. Catatan per topik MANTRA

(Diisi sambil membaca. Format tiap topik: jenis soal yang ada di PDF mathcyber1997,
pola penyelesaian yang dipakai pembahasannya, gambar bantu yang dipakai, dan apa
yang belum ada di bank MANTRA.)

### 4.1 Trigonometri (Perbandingan_Trigonometri__Dasar_, ..._Sudut_Istimewa)

Sumber dibaca: `pembahasan-web/soal-dan-pembahasan-perbandingan-trigonometri-dasar.md`
(20 PG + 6 uraian), `...-sudut-istimewa.md` (19 PG + 2 uraian).

Jenis soal:
- konversi derajat dan radian; sudut negatif dan sudut lebih dari 360°;
- perbandingan dari gambar segitiga (nilai sin/cos/tan, mana pernyataan yang salah);
- diberi satu perbandingan, cari perbandingan lain (cos A = 3/4, cari cot A) lewat
  segitiga acuan + Pythagoras;
- perbandingan dari titik koordinat (segitiga KLM dengan koordinat; koordinat kutub);
- dengan huruf (sin B = p, cari tan B; tan α = 1/a, cari cos α − 1/sin α);
- menentukan panjang sisi dari sudut istimewa (sin 30° = BC/AC);
- sudut berelasi (180° − α, 180° + α, 360° − α, 90° ± x), termasuk gabungan
  beberapa nilai istimewa dalam satu pecahan;
- kuadran: diberi tan α dan batas sudut, cari sin α (POLA YANG DICONTOHKAN ARYA);
- membandingkan sin 1, sin 2, sin 3 (radian);
- segitiga bertingkat (AD = AB cos θ, lalu DE = AD sin θ), garis tinggi;
- bentuk (5 sin x + 6 cos x) : (2 cos x − 3 sin x) dibagi cos x supaya jadi tan x;
- luas bangun (trapesium di lingkaran satuan) dinyatakan dalam sin/cos.

Pola penyelesaian soal kuadran (tiru persis):
1. "Perhatikan bahwa α berada di kuadran III sehingga tangen sudutnya bernilai
   positif, sedangkan sinus sudutnya bernilai negatif." + bagan kuadran.
2. "Karena tan α = 3/4, maka bisa dianggap bahwa panjang sisi depan sudutnya 3,
   sedangkan panjang sisi samping sudutnya 4 (tan = de/sa) seperti gambar berikut."
   + segitiga acuan.
3. "Dengan demikian, mi = √(3² + 4²) = √25 = 5."
4. "Untuk itu, sin α = −de/mi = −3/5. (Sinus sudut bernilai negatif ketika berada di
   kuadran III)"
5. "Jadi, nilai dari sin α = −3/5. (Jawaban C)"

Pola soal "diberi cos A = 3/4, cari cot A":
definisi kosinus (kalimat utuh) → "Untuk itu, cos A = 3/4 = AB/AC." → "Misalkan
AB = 3 dan AC = 4, maka dengan menggunakan teorema Pythagoras, diperoleh BC =
√(AC² − AB²) = √(4² − 3²) = √7." → definisi kotangen → "Untuk itu, cot A = AB/BC =
3/√7 = (3/7)√7." → "Jadi, nilai cot A = (3/7)√7. (Jawaban B)".

Pola soal koordinat: "Pertama, sketsakan segitiga KLM pada sistem koordinat Kartesius
seperti berikut." + gambar → "Tampak bahwa segitiga KLM merupakan segitiga siku-siku
(di L)." → "Dari gambar di atas, diketahui bahwa KL = 3 − (−5) = 8; KM = 4 − (−2) = 6."
→ Pythagoras → "Untuk itu, cos L = KL/LM = 8/10 = 4/5".

### 4.2 Ruang Tiga Dimensi (Dimensi_Tiga__Konsep_Jarak_)

Sumber dibaca: `...-dimensi-tiga-konsep-jarak-titik-garis-dan-bidang.md` (34 soal).

Jenis soal: panjang diagonal ruang (dua kali Pythagoras); jarak titik ke rusuk yang
jatuh di titik sudut ("Jarak B ke HC sama dengan jarak B ke C"); titik ke diagonal
bidang (segitiga sama sisi BEG, kaki di tengah); titik tengah rusuk ke diagonal ruang
(dua segitiga siku-siku berturut-turut); titik ke diagonal dengan kaki BUKAN di
tengah (misalkan DO = 4√2 − x, dua Pythagoras, substitusi); titik ke bidang diagonal
(setengah diagonal bidang); titik ke bidang BDG (kesamaan luas segitiga, tips
(2/3)s√3); proyeksi ruas pada bidang diagonal; jarak dua bidang sejajar PUW dan QVS
(diagonal ruang dikurangi dua jarak); titik pada perpanjangan rusuk (DC : CP = 3 : 1);
titik dengan perbandingan pada rusuk (EP : PF = 1 : 3); balok (Pythagoras 8-6-10 lalu
10-5); limas segi empat beraturan (tinggi, jarak A ke TC lewat segitiga sama sisi
atau kesamaan luas); limas segitiga beraturan (aturan kosinus); prisma segitiga;
soal cerita balok (lampu dan sakelar); irisan bidang (segi enam beraturan); jarak
dua garis bersilangan EM dan CN (jajar genjang, kesamaan luas); aturan kosinus untuk
sudut 60° lalu segitiga sama sisi.

Pola penyelesaian (tiru persis):
1. "Perhatikan sketsa gambar berikut." + kubus dengan garis bantu dan titik bantu
   bernama.
2. Kalimat yang MENGUBAH pertanyaan jadi ruas konkret: "Jarak titik B ke EG adalah
   jarak B ke O di mana O titik tengah EG." / "Misalkan proyeksi titik E pada bidang
   BDG adalah titik K."
3. "Pertama, perhatikan segitiga siku-siku JCG. Diketahui CG = 8 cm dan JC = 4√2 cm
   karena merupakan setengah dari panjang diagonal bidang." → Pythagoras penuh.
4. "Selanjutnya, tarik garis EG, EJ, dan JG sehingga diperoleh segitiga yang dapat
   digambarkan sebagai berikut." + segitiga dicabut dengan semua panjang.
5. "Akan dicari panjang EK dengan menggunakan prinsip kesamaan luas segitiga."
   L₁ = L₂, (1/2) × LJ × EG = (1/2) × EK × JG, 8 × 8√2 = EK × 4√6, EK = 16/√3 = (16/3)√3.
6. "Jadi, jarak titik E ke bidang BGD adalah (16/3)√3. (Jawaban E)" lalu
   "Tips & Trick: ... (2/3)s√3".

Alat yang dipakai berulang: Pythagoras dua kali; kesamaan luas segitiga (alas × tinggi
sama untuk dua pasang); rumus kesebangunan garis tinggi segitiga siku-siku
(tinggi = hasil kali kedua kaki : sisi miring, "RO = PR × RM / PM"); aturan kosinus
untuk segitiga tak siku; vektor 3D sebagai cara kedua.

Yang belum ada di bank MANTRA Ruang 3D dan layak ditambah (pola, bukan salinan):
kaki tegak lurus yang tidak di tengah (dua persamaan Pythagoras), titik pada
perpanjangan rusuk, jarak dua bidang sejajar PUW-QVS, limas segitiga beraturan,
prisma segitiga dengan huruf s dan t, irisan bidang, soal cerita ruangan (lampu dan
sakelar), rumus kesebangunan garis tinggi 5-12-13 → 60/13.

### 4.3 Turunan (Turunan_Fungsi_Aljabar, Turunan_Fungsi_Trigonometri, Aplikasi_Turunan)

Sumber dibaca: `...-turunan-fungsi-aljabar.md` (29 PG + 7 uraian),
`...-aplikasi-turunan-diferensial.md` (25 PG + uraian).

Jenis soal turunan aljabar: aturan dasar pada bentuk pecahan dan akar (ditulis
ulang ke pangkat dulu: 1/x = x⁻¹, t√t = t^(3/2)); nilai f′ di satu titik; x yang
membuat y′ = 0; hasil kali dan rantai bersama ((x²)(3x − 1)³, (2x + 1)⁵(x + 1));
hasil bagi di dalam akar; turunan |x| lewat y² = x²; turunan invers dan invers
turunan; f(p(x)) diketahui, cari f′ lewat rantai; (f∘g)′ = (g∘f)′; laju perubahan
f pada x = 2 (didefinisikan dulu sebagai f′(2)); laju pertambahan penduduk; nilai
minimum p = m² + n² dengan kendala; membaca f(0) dan f′(0) dari grafik (gradien
garis singgung dari dua titik yang dilewati); h = f/g dari dua grafik garis lurus;
kecepatan dan percepatan partikel (t negatif dibuang); mencari a, b, c dari
syarat f′(0), f′(1), f(2) (SPL).

Jenis soal aplikasi turunan: keuntungan maksimum (f biaya, g penjualan, h = g − f);
biaya proyek minimum (x hari × biaya per hari); tinggi maksimum peluru; luas taman
maksimum dari keliling; kotak tanpa tutup volume tetap → luas permukaan minimum;
tabung tanpa tutup luas tetap → volume maksimum; laju terkait (dV/dt = dV/dr ·
dr/dt untuk bola, kerucut dengan kesebangunan r = (2/3)h, kubus); kawat 500 m jadi
kerangka balok; kertas HVS dengan margin; luas minimum segitiga oleh garis lewat
(4, 3); sudut pandang layar bioskop maksimum (tan(α − β)); nilai minimum 4x + y
dengan xy ≥ 4.

Pola penyelesaian turunan (tiru persis):
- "Gunakan aturan turunan dasar." lalu bentuk ditulis ulang ke pangkat, lalu
  turunannya ditulis dengan pangkat yang MASIH kelihatan: f′(x) = 2x^(2−1) −
  (−1)x^(−1−1) + 0 = 2x + x⁻². Baru dirapikan.
- Rantai dan hasil kali: "Misalkan u = x² ⟹ u′ = 2x; v = (3x − 1)³ ⟹ v′ =
  3(3x − 1)²(3) = 9(3x − 1)²." Bagian dalam diberi nama (p, p′) dengan
  underbrace. "Dengan aturan hasil kali dalam turunan, kita peroleh f′(x) = u′v +
  uv′ = ..." lalu difaktorkan ke bentuk pilihan.
- Nilai di titik: "Substitusi x = 1 dan kita akan peroleh" dengan angka yang
  disubstitusi diberi warna.
- Konsep didefinisikan sebelum dihitung: "Laju perubahan fungsi pada saat x = 2
  dinyatakan oleh nilai turunan pertama f(x) saat x = 2, atau secara matematis,
  f′(2)." / "f′(0) menyatakan gradien garis singgung f(x) di titik x = 0. Tampak
  pada grafik bahwa garis singgung f(x) di titik tersebut melalui (−1, 6) dan
  (0, 2) sehingga gradiennya adalah f′(0) = m = (6 − 2)/(−1 − 0) = −4."
- Optimasi: (1) "Misalkan f(x) menyatakan total biaya produksi x unit barang, g(x)
  menyatakan harga jual ..., dan h(x) menyatakan keuntungan ..., maka" semua fungsi
  dinamai beserta artinya dan satuannya; (2) "Nyatakan t dalam x dengan menggunakan
  volume kotak berbentuk balok tersebut." (kendala dipakai menghapus satu peubah);
  (3) "Nyatakan luas permukaan (L) balok sebagai fungsi terhadap variabel x.";
  (4) "Luas permukaan akan minimum saat L′(x) = 0 sehingga ditulis" + penyelesaian
  sejajar; (5) akar yang tidak masuk akal dibuang DENGAN alasan: "Karena x
  menyatakan jumlah barang dan nilainya tidak mungkin negatif/pecahan, maka x yang
  diambil adalah x = 2." / "Diperoleh x = 15 (tidak memenuhi) atau x = 5." /
  "Perhatikan juga bahwa interval nilai x yang mungkin adalah 0 < x < 15.";
  (6) "Substitusikan x = 2 ke h(x)." lalu nilai; (7) "Jadi, keuntungan maksimum
  yang diperoleh perusahaan tersebut adalah Rp32.000,00. (Jawaban B)".
- Laju terkait: "Diketahui: dV/dt = 40 cm³/detik, dr/dt = 20 cm/detik." →
  "Diketahui juga bahwa rumus volume bola dinyatakan oleh V = (4/3)πr³ sehingga
  turunannya terhadap r adalah dV/dr = 4πr²." → "Menurut Aturan Rantai, kita
  peroleh dV/dt = dV/dr · dr/dt" → substitusi → "Jadi, ...".
- Ada juga gaya "Diketahui: ... Ditanya: dV/dt." untuk soal cerita.

Gambar bantu: sketsa benda dengan peubah tertulis di sisinya (kertas HVS dengan
margin dan p, l; kerucut dengan r dan h; segitiga sudut pandang dengan α, β, θ dan
jarak x); grafik dengan garis singgung dan dua titik yang dilewatinya.

### 4.4 Integral (Integral_Tentu, Jumlah_Riemann, Luas_Daerah_Menurut_Integral)

Sumber dibaca: `...-integral-tentu.md` (26 soal), `luas-daerah-integral.md`
(16 PG + uraian).

Jenis soal: menghitung integral tentu polinom, akar, pecahan (integran diubah ke
pangkat dulu: "Ubah bentuk integrannya terlebih dahulu."); ∫f(5 − x) dari ∫f(x)
(substitusi u, batas ikut berganti); batas atas a yang belum diketahui ("Karena a
merupakan batas atas integral yang nilainya harus lebih besar dari batas bawahnya,
yaitu 1, diambil a = 2."); parameter p dalam integran; pernyataan sifat integral
(diperiksa satu per satu: "Periksa pernyataan I: ..."); f(x) = ax + b dari dua
integral (SPLDV); kelinearan; membalik batas; fungsi ganjil dan genap (integral
simetris fungsi ganjil = 0, genap = 2 kali integral dari 0); fungsi periodik
f(x + 3) = f(x); f(x) memuat konstanta berupa integral dirinya sendiri (dinamai C
lalu dipecahkan); integral trigonometri sederhana. Luas daerah: menulis rumus
integral dari gambar (batas dari titik potong, y_atas − y_bawah); daerah di bawah
sumbu (tanda dibalik atau "Abaikan tanda negatif"); daerah dipartisi dengan garis
tegak dan dijelaskan lewat "batang tegak" (strip); kurva simetris (2A₁); luas
antara parabola dan garis dengan tiga cara (integral; D√D/(6a²); |a/6 (Δx)³|);
garis x = k yang membagi daerah sama luas; k dari kesamaan dua luas; peluang
lewat luas daerah.

Pola penyelesaian integral tentu (tiru persis):
"Dengan menggunakan aturan integral dasar beserta definisi integral tentu,
diperoleh" → [F(x)] dengan batas ditulis, lalu KEDUA substitusi ditulis lengkap
dalam kurung ((1/3)(2)³ − 3(2)) − ((1/3)(−1)³ − 3(−1)), lalu dirapikan bertahap →
"Jadi, nilai dari ∫ ... = −6. (Jawaban B)".

Pola luas daerah (tiru persis):
1. "Daerah yang diarsir terbatas pada selang titik potong kedua kurva. Untuk itu,
   kita akan mencari koordinat titik potongnya dulu dengan cara menyamakan kedua
   fungsi." y = y, x² = x + 6, (x − 3)(x + 2) = 0. "Diperoleh x = 3 atau x = −2.
   Untuk x = 3, diperoleh y = 9. Untuk x = −2, diperoleh y = 4. Jadi, koordinat
   titik potongnya adalah (3, 9) dan (−2, 4)."
2. "Karena variabel integralnya menggunakan x, maka kita beri batas atas dan batas
   bawah integral berdasarkan absis titik potong, yaitu x = −2 sebagai batas bawah
   dan x = 3 sebagai batas atas."
3. "Perhatikan bahwa kurva y = x + 6 berada di atas kurva y = x² pada interval
   −2 < x < 3 sehingga luas daerah yang diarsir dinyatakan oleh L = ∫(y_atas −
   y_bawah) dx = ..." Mana yang di atas diputuskan lewat UJI TITIK: "Misalnya kita
   pilih x = 0 sehingga y = 0 < 1/2. Ini artinya, kurva y = 1/2 selalu berada di
   atas kurva ... pada interval tersebut."
4. Kalau soal tanpa gambar: "Pertama, gambarkan dulu sketsa grafik kedua fungsi
   pada bidang koordinat. Kurva y = 3 − x² berbentuk parabola, sedangkan kurva
   y = 2|x| berbentuk seperti huruf V ..." (bentuk tiap kurva disebut) lalu
   "Kedua, arsir daerah yang dibatasi oleh kedua kurva tersebut."
5. Partisi: "kita harus partisi daerahnya terlebih dahulu dengan garis tegak x = 1
   sebagai pembatas." + gambar batang tegak: "Pada selang (−1, 1), dibuat batang
   tegak dengan puncaknya menyentuh kurva y = x² + 2x + 1 dan dasarnya menyentuh
   sumbu X."
6. Di bawah sumbu: "Karena di bawah sumbu X, maka hasil perhitungan integralnya
   negatif padahal luas tidak mungkin bernilai negatif. Untuk itu, ..."
7. Cara lain diberi judul "Cara 2: Menggunakan Diskriminan", "Cara 3: Menggunakan
   Selisih Absis Titik Potong" SETELAH cara integral.

Gambar bantu: grafik GeoGebra dengan daerah diarsir, titik potong berlabel
koordinat, garis pembatas partisi, batang tegak (strip) yang menunjukkan
y_atas − y_bawah, daerah A₁ dan A₂ diberi nama.

### 4.5 Limit (Limit_Fungsi_Aljabar, Limit_Tak_Hingga, Limit_Fungsi_Trigonometri, HOTS)

Sumber dibaca: `...-limit-fungsi-aljabar.md` (29 PG + 11 uraian),
`...-limit-tak-hingga.md` (50 soal, teorema di awal), ringkasan kalimat pembuka
36 soal trigonometri dan 32 soal HOTS.

Jenis soal: membaca limit dari grafik (kiri = kanan → ada; beda → tidak ada;
noktah putih = f tidak terdefinisi); fungsi sepotong (rumus mana yang dipakai);
substitusi langsung (termasuk jumlah dua limit, akar pangkat tiga); sifat limit
(lim f² − g²); parameter dari nilai limit; soal cerita "mendekati detik ke-5";
pemfaktoran (0/0), termasuk selisih dua pecahan yang disatukan dulu dan selisih
kubik x − 27 = (x^(1/3) − 3)(...); akar sekawan (di pembilang, di penyebut, dua
akar sekaligus, dua kali berturut-turut); |x| lewat limit kiri dan kanan;
kekontinuan fungsi sepotong; limit sepihak menuju tak hingga (tabel + grafik);
substitusi x = y¹⁵; tak hingga: bagi pangkat tertinggi (ditulis suku per suku
2x³/x⁴ + ...), derajat pembilang vs penyebut, selisih akar (sekawan lalu bagi x),
rumus cepat (b − p)/(2√a) setelah 3x + 1 ditulis √(9x² + 6x + 1), pemisalan
y = 1/x untuk bentuk trigonometri (x sin(1/x)); trigonometri: sin ax/bx = a/b,
1 − cos 2x = 2 sin² x, tan x − sin x; HOTS: limit ada memaksa pembilang 0
("Karena memiliki nilai limit berhingga, maka substitusi langsung x = 0 harus
menghasilkan bentuk taktentu 0/0. Ini mengimplikasikan ..."), dalil L Hospital
(disebut sebagai alat, dengan syaratnya), limit kiri = kanan supaya limit ada.

Pola penyelesaian (tiru persis):
- Pembuka baku: "Substitusi langsung nilai x = 1 mengakibatkan munculnya bentuk
  taktentu 0/0. Limit tersebut dapat ditentukan dengan menggunakan metode
  pemfaktoran sebagai berikut." atau "Dengan metode pengalian akar sekawan,
  diperoleh" (pengali sekawan diberi warna: × (√x + 2)/(√x + 2)).
- Faktor yang dicoret ditunjukkan (\cancel), lalu "= lim (x + 1) = 1 + 1 = 2."
- Penutup: "Jadi, nilai dari lim ... = 2. (Jawaban E)" dengan bentuk limitnya
  ditulis ulang utuh di dalam kotak.
- Grafik: "Tampak pada grafik bahwa lim x→1⁻ f(x) = lim x→1⁺ f(x) = 2. Dengan
  demikian, ..." / "... = 5, sedangkan ... = 8. Karena berbeda, ini berarti nilai
  lim f(x) tidak ada."
- Fungsi sepotong: "Karena x → 1, rumus fungsi f(x) yang digunakan adalah
  f(x) = 2x + 1."
- Tak hingga: "Pendekatan formal: ..." (bagi suku per suku) lalu "Pendekatan lain:
  Perhatikan bahwa bagian pembilang dan penyebut fungsinya merupakan fungsi polinom.
  Karena derajat pembilang = 3 < derajat penyebut = 4, nilai limitnya adalah 0."
  Untuk selisih akar: sekawan → "Bagi setiap suku dengan variabel berpangkat
  tertinggi, yaitu x." → hasil. Rumus cepat dipakai SETELAH bentuk dicocokkan:
  "Perhatikan bahwa 3x + 1 = √(3x + 1)² = √(9x² + 6x + 1) berlaku karena x menuju
  takhingga (nilainya dipastikan positif)."
- Parameter: "Substitusi langsung x = −3 pada fungsi menghasilkan penyebut bernilai
  0, padahal limitnya ada, yaitu −7. Ini berarti, hasil substitusi juga harus
  menghasilkan pembilang 0." → 9c − 18 = 0 → c = 2.
- Kekontinuan: "Diketahui: f(1) = 2. Agar kontinu, lim x→1 f(x) juga harus bernilai
  2." → hitung limit → "Karena f(1) = lim ..., fungsi tersebut kontinu di x = 1."
- Limit sepihak tak hingga: tabel nilai x = 7, 6, 5 → "Tampak bahwa ketika x
  semakin mengecil mendekati 4, nilai fungsinya semakin membesar menuju takhingga."
  + "pendekatan geometris, yaitu dengan cara menggambar grafiknya".

Gambar bantu: grafik fungsi dengan noktah putih (lubang) dan noktah hitam,
loncatan; grafik x/(x − 4) dengan asimtot untuk limit sepihak.

### 4.6 Vektor (Vektor__Matematika_, Latihan_Soal___Vektor Level 1 dan 2)

Sumber dibaca: `...-vektor-tingkat-sma-sederajat.md` (45 soal). Dua PDF Latihan
Soal Vektor tidak punya halaman pembahasan (produk berbayar), hanya soalnya.

Jenis soal: operasi 2a + b − c dalam bentuk i, j, k (diubah dulu ke tripel
koordinat); tiga titik segaris → perbandingan AB : BC (vektornya berkelipatan);
tegak lurus → hasil kali titik nol → parameter m; (a + b) • (a − c); 2u − a·v
tegak lurus v; panjang proyeksi skalar (rumus x•v/|v|); proyeksi dengan
parameter yang dicari (dikuadratkan kedua ruas); pertidaksamaan panjang proyeksi;
vektor satuan bersudut 45° atau 60° (|u| = |v| = 1, u•v = cos sudut); sudut antar
vektor dari koordinat (cos θ = a•b/(|a||b|), lalu sin θ = √(1 − cos²θ)); aturan
kosinus pada vektor (|a − b|² = |a|² + |b|² − 2|a||b| cos θ).

Pola penyelesaian (tiru persis):
- Pembuka: "Diketahui a = (1, 2, −3), b = (3, 0, 5), c = (−2, −4, 1)." (bentuk
  i, j, k ditulis ulang jadi koordinat) → "Dengan demikian, u = 2a + b − c =
  2(1, 2, −3) + (3, 0, 5) − (−2, −4, 1) = (2 + 3 + 2, 4 + 0 + 4, −6 + 5 − 1) =
  (7, 8, −2)." (penjumlahan per komponen ditulis).
- Tegak lurus: "Karena a ⊥ b (saling tegak lurus), a • b = 0 sehingga ditulis"
  → (1)(4) + (2)(4) + (−3)(m) = 0 → m = 4.
- Proyeksi: "Panjang proyeksi vektor skalar x pada vektor v dinyatakan oleh
  |x_v| = x • v / |v|" (rumus disebut) → hitungan penuh dengan √(9 + 4 + 36) = 7.
- Sudut: "Misalkan θ merupakan besar sudut yang terbentuk oleh kedua vektor
  tersebut. Kosinus sudut kedua vektor itu dinyatakan oleh cos θ = ..." → "Dari
  cos θ = 0, diperoleh θ = 90°." / "Untuk cos θ = −1/2, diperoleh θ = 120°."
- Kolinear: "Karena A, B, C segaris, vektor yang dibentuk oleh dua dari tiga titik
  itu akan saling berkelipatan (memiliki perbandingan yang sama)."
- Parameter dari akar: "Dari sini, diperoleh m = −19 atau m = 1. Karena m > 0,
  dipilih m = 1."
- Catatan kecil di akhir: "Catatan: Besar sudut antara dua vektor yang sama adalah
  0°."

Gambar bantu: hampir tidak ada (vektor 3D dikerjakan aljabar). Untuk MANTRA yang
2D, gambar bantu yang masuk akal: panah a dan b berpangkal sama dengan sudut θ
ditandai; proyeksi digambar sebagai bayangan tegak lurus pada b; segitiga
resultan untuk soal perahu/pesawat dengan panjangnya ditulis.

### 4.7 Statistika (Statistika__SMA_, Aplikasi_Statistika, Soal Statistika UTBK-SNBT)

Sumber dibaca: `...-statistika-tingkat-sma-sederajat.md` (47 soal, dibaca 15
pertama penuh), ringkasan `...-aplikasi-soal-cerita-statistika.md` (19 soal) dan
`soal-pembahasan-statistika-utbk-snbt.md` (10 soal).

Jenis soal: modus data berkelompok (tabel dan histogram); median berkelompok
(tabel dilengkapi frekuensi kumulatif); mean berkelompok (dua cara: nilai tengah
dan rata-rata sementara); x dari rata-rata yang diketahui; rata-rata gabungan
persentase; bilangan salah baca 60 terbaca 30; persentil/desil berkelompok;
rata-rata berubah setelah data dibuang atau ditambah (dimisalkan jumlah dan
banyak data); lima bilangan dengan median dan modus tertentu (dimisalkan terurut
a ≤ b ≤ c ≤ d ≤ e); data dikali lalu dikurangi (mean dan jangkauan ikut);
UTBK: pernyataan benar/salah dari tabel atau grafik ("Mari periksa kebenaran
pernyataan yang diberikan." lalu "Pernyataan (1): ..."), dua kasus (Kasus 1,
Kasus 2).

Pola penyelesaian data berkelompok (tiru persis):
1. Tabel ditulis ULANG di pembahasan dengan baris kelas modus/median diberi warna
   merah, dan kolom baru ditambahkan (frekuensi kumulatif F_k; x_i dan f_i x_i).
   "Lengkapi tabel di atas dengan menambahkan kolom frekuensi kumulatif." /
   "Ubah penyajian data pada histogram di atas menjadi bentuk tabel seperti di
   bawah (dilengkapi dengan kolom frekuensi kumulatif)."
2. "Dari tabel distribusi di atas, diketahui kelas modusnya pada kelas dengan
   rentang 19−24 karena frekuensinya tertinggi." / "Kelas median terletak di kelas
   yang memuat datum ke-n/2 = 40/2 = 20, yaitu pada kelas dengan rentang 42−47."
3. Tiap besaran disebut NAMANYA lalu angkanya: "Tepi bawah kelas modus L₀ = 19 −
   0,5 = 18,5. Lebar kelas c = 6. Selisih frekuensi kelas modus dengan kelas
   sebelumnya d₁ = 10 − 6 = 4. Selisih frekuensi kelas modus dengan kelas
   setelahnya d₂ = 10 − 2 = 8." (atau ringkas: "Diketahui: L₀ = ..., c = ...,
   d₁ = ..., d₂ = ...")
4. "Untuk itu, didapat Mo = L₀ + c(d₁/(d₁ + d₂)) = 18,5 + 6(4/(4 + 8)) = 18,5 + 2
   = 20,5."
5. "Jadi, modus dari data tersebut adalah 20,50. (Jawaban D)" (bentuk angka
   mengikuti pilihan: 20,50).
Mean: "Alternatif I: Rata-rata Hitung" (tabel x_i, f_i x_i, "Diperoleh Σf = 60 dan
Σf_i x_i = 4210 sehingga rataan datanya dinyatakan oleh ...") dan "Alternatif II:
Rata-rata Sementara" ("Misal dipilih rata-rata sementara x_s = 71. Selanjutnya,
buatlah tabel berikut.").
Soal cerita: "Misalkan banyak bilangan dalam kelompok itu adalah n. Karena
rata-ratanya 40, maka jumlah bilangan seluruhnya adalah ΣF = 40n." / "Ingat bahwa
jumlah datum dihitung dengan cara mengalikan frekuensi dan rata-ratanya." /
"Diketahui: ... Ditanya: ...".

Gambar bantu: TABEL yang diperluas dan disorot adalah gambar bantunya; untuk
histogram, tabel hasil pembacaannya. Untuk MANTRA: butuh perender tabel dengan
baris disorot dan kolom tambahan; untuk diagram, batang kelas modus disorot.

### 4.8 Transformasi Geometri (Transformasi_Geometri)

Sumber dibaca: `...-transformasi-geometri-tingkat-sma.md` (26 soal).

Jenis soal: prapeta dari peta translasi; rotasi −90° dengan matriks cos/sin;
refleksi y = −x; dilatasi pusat (a, b) faktor −4; rotasi pusat (a, b); dilatasi
faktor 1 (identitas); komposisi refleksi lalu dilatasi (skema panah); matriks lalu
refleksi x = 8; dilatasi segitiga (tiap titik dihitung) dan luasnya dari gambar;
vektor awal dari hasil komposisi (mundur); bayangan GARIS oleh translasi
(substitusi x = x′ − 3), oleh matriks lalu cermin (SPLDV x, y dalam x″, y″),
oleh cermin lalu rotasi, oleh translasi lalu dilatasi; bayangan KURVA y = x² + 3x
+ 3 oleh cermin lalu dilatasi; kurva didilatasi pusat (−1, 2) lalu rotasi −90°;
luas hasil transformasi matriks (determinan × luas awal); faktor skala dari
gambar; translasi garis dari gambar; dilatasi pada garis alfabet; garis digeser
lalu dicerminkan menghasilkan y = −4x → a − b; refleksi terhadap y = x + 1.

Pola penyelesaian (tiru persis):
- Konsep disebut dulu sebagai aturan utuh: "Konsep translasi: Jika titik (x, y)
  ditranslasikan oleh T = (a, b), maka koordinat bayangannya adalah (x′, y′) =
  (x, y) + (a, b)." / "Konsep rotasi: Jika titik (x, y) dirotasikan pada pusat
  (a, b) sebesar sudut θ dengan orientasi berlawanan arah jarum jam, maka
  koordinat bayangan titiknya adalah (matriks) (x − a, y − b) + (a, b)."
- Rotasi selalu lewat matriks dengan cos dan sin DITULIS lalu diganti angkanya:
  cos 90° = 0, sin 90° = 1, matriks (0 −1; 1 0).
- Komposisi ditulis sebagai SKEMA PANAH: B(4, 8) → [R_X] → B′(4, −8) →
  [D[O, 1/2]] → B″(2, −4). "Untuk itu, dapat dibuat skema panah dari proses
  refleksi terhadap sumbu X terhadap titik B berikut."
- Garis/kurva: "Ambil sembarang titik yang dilalui garis itu, misalkan titik
  (x, y)." → skema panah → "Dengan demikian, dapat ditulis x′ = x + 3 dan y′ = y +
  2, atau x = x′ − 3, y = y′ − 2." → "Substitusikan kedua bentuk ini pada persamaan
  garis y = 2x + 3." → hitungan → "Dengan menghilangkan tanda aksen ganda,
  diperoleh persamaan bayangan garisnya, yakni 3x + y − 1 = 0."
- Mundur (cari prapeta): "Misalkan vektor awalnya adalah (a, b)." → skema maju →
  "Diperoleh hasil transformasi vektor berbentuk (a, −b). Karena diketahui ...
  merupakan hasil transformasinya, diperoleh a = −3 dan b = −4."
- Dari gambar: "Tampak pada gambar bahwa proses dilatasi mengambil pusat di titik
  paling kiri bawah. Asumsikan sebagai titik (0, 0) sehingga A(0, 1), ..." →
  "Sebagai contoh, ambil titik B(3, 1) yang bayangannya adalah B′(9, 3).
  Pengalinya adalah 3."
- Luas: "Perhatikan bahwa penyajian matriks untuk dilatasi berpusat di O dan
  faktor skala 3 adalah (3 0; 0 3)." → T₂ · T₁ → "Luas gambar yang baru
  dinyatakan oleh L = |det| × Luas Awal".

Gambar bantu: bayangan segitiga digambar di koordinat lalu alas dan tingginya
dibaca ("Segitiga tersebut memiliki luas L = (16 × 28)/2 = 224"). Untuk MANTRA
(sudah ada perender `bidang`): gambar pembahasan = bangun + bayangan + cermin/pusat
+ panah dari titik ke bayangannya.

### 4.9 Grafik Fungsi (Fungsi_Kuadrat, Persamaan_Garis_Lurus, Fungsi_Eksponen, Komposisi_dan_Invers)

Sumber dibaca: `...-fungsi-kuadrat.md` (48 soal, dibaca 20 pertama penuh).

Jenis soal fungsi kuadrat: titik balik dari rumus (x_p = −b/2a, y_p = f(x_p));
titik yang dilalui (diperiksa satu per satu: "Periksa titik A(2, −11): Substitusi
x = 2 pada f(x), diperoleh ... Diperoleh y = −11 sehingga titik A dilalui oleh
grafik"); puncak (m, m) → k; persamaan dari gambar yang memotong sumbu X (bentuk
k(x − a)(x − b) lalu satu titik untuk k); tanda a, c, D dari gambar ("Parabola
terbuka ke bawah, artinya a bernilai negatif. Parabola tidak memotong sumbu X,
artinya D bernilai negatif. Parabola memotong sumbu Y di bawah sumbu X, artinya c
bernilai negatif."); f(7) dari tiga titik; definit negatif (dua syarat + garis
bilangan untuk irisan); sumbu simetri → a → nilai maksimum; bentuk a(x − x_p)² +
y_p dari gambar; daerah hasil pada domain terbatas (nilai maksimum di puncak,
minimum di ujung domain yang terjauh dari puncak); fungsi dengan titik balik sama
dan melalui satu titik; pernyataan benar/salah ("Cek opsi A: ... Jadi, pernyataan
pada opsi A benar."); pergeseran grafik dipandang sebagai pergeseran titik balik;
menyinggung sumbu X (D = 0) lalu pilih a < 0 karena "titik balik maksimum";
menyinggung garis (substitusi, D = 0); selalu positif (a > 0 dan D < 0); dua akar
positif (jumlah > 0, hasil kali > 0, D > 0, lalu irisan).

Pola penyelesaian (tiru persis): "Karena f(x) = 2x² − 4x + 5, berarti a = 2,
b = −4, c = 5." → "Absis titik balik dinyatakan oleh x_p = −b/(2a) = −(−4)/(2(2))
= 1." → "Substitusikan x = 1 pada f(x) = ... sehingga diperoleh y_p = f(1) = ... =
3." → "Jadi, koordinat titik balik grafik fungsi kuadratnya adalah (x_p, y_p) =
(1, 3). (Jawaban A)" + gambar parabola dengan titik baliknya.
Syarat ganda: "Syarat koefisien x² negatif: a + 1 < 0 ⟺ a < −1. Syarat diskriminan
negatif: ... a < −2. Irisan dari a < −1 dan a < −2 dapat ditentukan dengan
menggunakan bantuan garis bilangan seperti gambar."

Gambar bantu: parabola dengan titik balik ditandai (hasil hitungan), garis
bilangan untuk irisan syarat, parabola asal dan hasil geseran berdampingan.

### 4.10 Tambahan di luar folder (diambil karena bank MANTRA memuatnya)

`pembahasan-web/tambahan/`: Dimensi Tiga konsep SUDUT (14 soal), Fungsi Naik dan
Turun (13 soal), Persamaan Garis Singgung (24 soal).

Sudut di ruang: "Misalkan P titik tengah EG. Sudut α adalah sudut antara garis AE
dan bidang AFH sama dengan sudut antara garis AE dan AP." (sudut garis-bidang
diturunkan jadi sudut dua garis pada satu segitiga siku-siku) → "Perhatikan bahwa
segitiga AEF merupakan segitiga siku-siku di titik E." → Pythagoras → "sin α =
de/mi = EP/AP = 2√2/(2√6) = (1/3)√3." Sudut dua bidang: "Sudut antara bidang AFH
dan bidang ABCD adalah sudut α, yang dapat diwakili oleh ∠PAQ pada segitiga
siku-siku PQA." Kalau segitiganya sama kaki bukan siku: aturan kosinus, lalu
"cos α = −1/3 ... Sudutnya berada di kuadran II karena kosinus sudut bernilai
negatif. Ini berarti, sinus sudutnya bernilai positif."

Naik/turun: "Diketahui f(x) = ... sehingga turunan pertamanya adalah f′(x) = ...
Kurva f(x) selalu turun jika diberi syarat f′(x) < 0." → pembuat nol → garis
bilangan → "Jadi, interval x yang membuat kurva fungsi ... selalu turun adalah
1 < x < 3." Dengan parameter: "Diketahui f(x) = ... dan f(x) selalu naik di
0 < x < 2, mengimplikasikan bahwa f′(x) > 0 pada selang itu ..." Penutup kadang
ditegaskan dengan grafik GeoGebra.

Garis singgung: "Diketahui f(x) = ... Turunan pertama dari fungsi f(x) adalah
f′(x) = ... Karena titik singgungnya di (2, 16), gradien garis singgung k
diperoleh saat x = 2, yaitu m = f′(2) = ..." → "Persamaan garis yang melalui titik
(2, 16) dan bergradien 11 adalah y − 16 = 11(x − 2) ..." → "Jadi, persamaan garis
k adalah y = 11x − 6." Kalau yang diberi ordinat: "Titik singgung berordinat 8
sehingga x³ = 8 ⟺ x = 2. Jadi, koordinat titik singgung di (2, 8)." Sejajar/tegak
lurus: "Garis x − 2y + 3 = 0 memiliki gradien 1/2. ... Nilai turunan pertama dari
f(x) pada absis titik singgung adalah gradien garis singgungnya, yaitu f′(x) = m."

---

## 5. Resep menulis pembahasan MANTRA (yang akan dipakai saat menulis ulang 540 soal)

Aturan MANTRA yang tetap berlaku di atas gaya mathcyber1997: tanpa em-dash; kata
"miskonsepsi" dilarang; kotak "Kenapa pilihan lain menggoda" (jebakan) tetap ada
tetapi ditulis dengan kalimat utuh bergaya sama; setiap jawaban berangka tetap
punya `// cek:`; bahasa formal tanpa "kamu" atau "Anda" (boleh "kita").

Kerangka `langkah` (tiap butir satu kalimat lengkap atau satu hitungan; butir
boleh membawa gambar bantunya sendiri):

1. PEMBUKA: fakta kunci atau definisi utuh atau "Perhatikan sketsa gambar berikut."
   (+ gambar bantu langkah ini).
2. PEMISALAN: "Karena ..., maka bisa dianggap ..." / "Misalkan O titik tengah ..."
   / "Misalkan f(x) menyatakan ..." (+ gambar: segitiga acuan, titik bantu bernama).
3. ALAT + HITUNGAN PENUH: "Dengan menggunakan teorema Pythagoras, diperoleh
   BC = √(4² − 3²) = √7." Satu alat per butir; tidak ada lompatan; satuan ikut.
4. (ulangi 3 untuk langkah berikutnya: "Selanjutnya, tinjau segitiga ...")
5. SYARAT/TANDA di tempatnya, dalam kurung: "(sinus bernilai negatif di kuadran
   III)"; akar yang dibuang diberi alasan.
6. PENUTUP: "Jadi, <ulang pertanyaan dengan kata soal> adalah <jawaban dengan
   satuan>. (Jawaban C)" Bentuk jawaban disesuaikan dengan bentuk pilihan.

Kotak jebakan: satu kalimat per pengecoh yang layak dibahas, dengan pola
"Pilihan D, 3/5, lupa memberi tanda kuadran III." (huruf, nilai, kekeliruannya).
Tidak semua pengecoh perlu; dua sampai tiga yang paling menggoda.

Kalimat yang DIHINDARI (kebiasaan lama): potongan "A: B" tanpa kata kerja; "cocok
dengan"; "tandanya negatif karena kuadran III: sin α = −3/5" (dua fakta digabung
titik dua); menyebut alat belakangan dalam kurung "(Pythagoras)"; penutup tanpa
huruf jawaban.

Contoh lengkap versi MANTRA untuk soal k46 (tan α = 3/4, 180° ≤ α ≤ 270°, sin α):
langkah = [
 {teks: "Perhatikan bahwa 180° ≤ α ≤ 270°, jadi α berada di kuadran III. Di kuadran
  III, tangen bernilai positif, sedangkan sinus dan kosinus bernilai negatif.",
  gambar: bagan kuadran dengan kuadran III disorot},
 {teks: "Karena tan α = 3/4 dan tan = de/sa, bisa dianggap panjang sisi depan
  sudutnya 3 dan panjang sisi sampingnya 4, seperti segitiga acuan berikut.",
  gambar: segitiga acuan depan 3, samping 4, miring ?},
 "Dengan menggunakan teorema Pythagoras, diperoleh mi = √(3² + 4²) = √25 = 5.",
 "Untuk itu, sin α = −de/mi = −3/5. (Sinus sudut bernilai negatif ketika berada di
  kuadran III.)",
 "Jadi, nilai sin α = −3/5. (Jawaban C)" ]
jebakan = "Pilihan D, 3/5, lupa memberi tanda kuadran III. Pilihan B, −4/5, adalah
nilai cos α, bukan sin α. Pilihan A, −3/4, memberi tanda negatif pada tan α,
padahal tangen di kuadran III justru positif."

Contoh soal ruang (r10, jarak A ke bidang BDE, rusuk 6):
1. "Perhatikan sketsa gambar berikut." + kubus dengan bidang BDE diarsir, diagonal
   AG, titik tembus K bernama, titik J tengah BD.
2. "Misalkan proyeksi titik A pada bidang BDE adalah titik K. Jarak titik A ke
   bidang BDE sama dengan panjang AK."
3. "Pertama, perhatikan segitiga siku-siku AJE (siku-siku di A). Diketahui AE = 6 cm
   dan AJ = 3√2 cm karena merupakan setengah dari panjang diagonal bidang."
4. "Dengan teorema Pythagoras, diperoleh JE = √(AJ² + AE²) = √(18 + 36) = √54 =
   3√6 cm." + segitiga AJE dicabut (AJ = 3√2, AE = 6, JE = ?)
5. "Selanjutnya, dengan menggunakan prinsip kesamaan luas segitiga pada △AJE,
   diperoleh (1/2) × AJ × AE = (1/2) × JE × AK, sehingga 3√2 × 6 = 3√6 × AK dan
   AK = 18√2/(3√6) = 6/√3 = 2√3 cm."
6. "Jadi, jarak titik A ke bidang BDE adalah 2√3 cm. (Jawaban A)"
7. (opsional) "Tips: untuk jarak titik sudut ke bidang yang memotong ketiga
   tetangganya, hasilnya selalu sepertiga diagonal ruang, (1/3)s√3."

Contoh soal limit (k17, (√(x + 9) − 3)/x, x → 0):
"Substitusi langsung nilai x = 0 mengakibatkan munculnya bentuk taktentu 0/0."
→ "Dengan metode pengalian akar sekawan, diperoleh lim (√(x + 9) − 3)/x ×
(√(x + 9) + 3)/(√(x + 9) + 3) = lim ((x + 9) − 9)/(x(√(x + 9) + 3)) = lim
x/(x(√(x + 9) + 3))." → "Coret faktor x yang sama, lalu substitusi x = 0: 1/(√9 +
3) = 1/6." → "Jadi, nilai dari lim (√(x + 9) − 3)/x = 1/6. (Jawaban B)"

Contoh soal optimasi (turunan-sangat-06, tangki 32 m³):
"Misalkan alas tangki berbentuk persegi dengan sisi s meter dan tingginya t meter.
Karena isinya 32 m³, berlaku s²t = 32." → "Nyatakan t dalam s: t = 32/s²." →
"Luas bahan tangki tanpa tutup adalah alas ditambah empat sisi tegak. Nyatakan L
sebagai fungsi terhadap variabel s: L(s) = s² + 4st = s² + 128/s." → "Luas bahan
akan minimum saat L′(s) = 0 sehingga ditulis 2s − 128/s² = 0, 2s³ = 128, s³ = 64,
s = 4." → "Untuk s = 4, diperoleh t = 32/16 = 2." → "Substitusikan s = 4 ke L(s):
L(4) = 16 + 128/4 = 16 + 32 = 48." → "Jadi, luas bahan paling sedikit yang
diperlukan adalah 48 m². (Jawaban A)"

Contoh soal luas (int-sl8, y = x² dan y = x + 2):
"Daerah yang dicari terbatas pada selang titik potong kedua kurva. Untuk itu,
kita cari koordinat titik potongnya dulu dengan menyamakan kedua fungsi: x² = x +
2, x² − x − 2 = 0, (x + 1)(x − 2) = 0. Diperoleh x = −1 atau x = 2." + sketsa
kedua kurva dengan daerah diarsir dan titik potong berlabel → "Karena variabel
integralnya x, batas bawahnya x = −1 dan batas atasnya x = 2." → "Uji titik x = 0:
garis memberi 2, parabola memberi 0, sehingga garis y = x + 2 berada di atas
parabola pada selang itu." → "L = ∫₋₁² ((x + 2) − x²) dx = [x²/2 + 2x − x³/3]₋₁²
= (2 + 4 − 8/3) − (1/2 − 2 + 1/3) = 10/3 + 7/6 = 27/6 = 9/2." → "Jadi, luas daerah
yang dibatasi kedua kurva itu adalah 9/2 satuan luas. (Jawaban D)"

Contoh soal statistika berkelompok (st-18, median 40 siswa):
1. "Lengkapi tabel dengan kolom frekuensi kumulatif." + tabel disorot: 40−49 (3, 3),
   50−59 (8, 11), 60−69 (12, 23) ←, 70−79 (9, 32), 80−89 (6, 38), 90−99 (2, 40).
2. "Kelas median terletak di kelas yang memuat datum ke-n/2 = 40/2 = 20, yaitu
   kelas 60−69 (frekuensi kumulatif sebelumnya 11, sesudahnya 23)."
3. "Tepi bawah kelas median L₀ = 60 − 0,5 = 59,5. Lebar kelas c = 10. Frekuensi
   kumulatif sebelum kelas median ΣF_k = 11. Frekuensi kelas median f_m = 12."
4. "Untuk itu, Me = L₀ + c((n/2 − ΣF_k)/f_m) = 59,5 + 10((20 − 11)/12) = 59,5 +
   7,5 = 67."
5. "Jadi, median data tersebut adalah 67. (Jawaban C)"

Contoh soal transformasi garis (tg-l10, y = x + 2 oleh translasi (3, 1)):
"Ambil sembarang titik (x, y) pada garis y = x + 2. Bayangannya oleh translasi
(3, 1) adalah (x′, y′) = (x + 3, y + 1)." → "Dengan demikian, x = x′ − 3 dan y =
y′ − 1." → "Substitusikan pada persamaan garis: y′ − 1 = (x′ − 3) + 2, sehingga y′ =
x′." → "Dengan menghilangkan tanda aksen, persamaan bayangannya adalah y = x." →
"Periksa: titik (0, 2) pada garis semula digeser jadi (3, 3), dan (3, 3) memenuhi
y = x." → "Jadi, persamaan petanya adalah y = x. (Jawaban A)"

Contoh soal vektor (v28, proyeksi (5, 12) pada (3, 4)):
"Panjang proyeksi skalar vektor a pada vektor b dinyatakan oleh |a_b| = a • b/|b|."
→ "Diketahui a = (5, 12) dan b = (3, 4) sehingga a • b = (5)(3) + (12)(4) = 15 +
48 = 63 dan |b| = √(3² + 4²) = √25 = 5." → "Untuk itu, |a_b| = 63/5 = 12,6." →
"Jadi, panjang proyeksi vektor (5, 12) pada vektor (3, 4) adalah 12,6. (Jawaban
B)" + gambar: dua panah berpangkal sama, garis putus-putus dari ujung a tegak lurus
ke b, ruas proyeksi ditebalkan dan diberi panjang 12,6.

Contoh soal fungsi kuadrat (gf-t01, puncak y = 3x² + 12x + 5):
"Karena y = 3x² + 12x + 5, berarti a = 3, b = 12, c = 5." → "Absis titik puncak
dinyatakan oleh x_p = −b/(2a) = −12/(2 · 3) = −2." → "Substitusikan x = −2:
y_p = 3(−2)² + 12(−2) + 5 = 12 − 24 + 5 = −7." → "Jadi, koordinat puncaknya adalah
(−2, −7). (Jawaban B)" + gambar parabola dengan titik puncak ditandai.

---

## 6. Yang harus dibangun di situs sebelum menulis ulang (ringkas)

- `langkah` menerima butir berupa `{ teks, gambar }` selain string; panel pembahasan
  menampilkan gambar tepat di bawah kalimat langkahnya; gambar soal TIDAK diulang.
- Perender baru: (1) `kuadran` (bagan empat kuadran, satu kuadran disorot, label
  fungsi yang positif), (2) `segitiga` dapat label angka per sisi dan tanda "?"
  serta sorot satu sisi (segitiga acuan), (3) `segitiga-umum` untuk segitiga yang
  dicabut dari bangun ruang: tiga nama titik, panjang tiap sisi, garis tinggi
  putus-putus dengan tanda siku, satu ruas disorot, (4) `tabel` (baris disorot,
  kolom tambahan) untuk statistika, (5) `garis-bilangan` untuk irisan syarat dan
  uji tanda naik/turun, (6) `grafik` dapat arsir selang (naik/turun) dan titik
  puncak berlabel, (7) `luas` dapat pecah di titik potong dengan tanda + dan −,
  batang tegak (strip), dan titik potong berlabel koordinat.
- Perender lama yang sudah cukup: `balok` (ruas dan bidang bersorot, titik bantu),
  `bidang` (bangun + bayangan + cermin + pusat), `vektor` (perlu tambahan: ruas
  proyeksi dan garis putus-putus tegak lurus), `lingkaran`.
- `alat/cek_kuis.mjs` diperluas: memeriksa gambar di dalam `langkah`, dan
  menolak butir langkah yang berbentuk "A: B" tanpa kata kerja (pemeriksa gaya
  sederhana: setiap butir memuat salah satu kata `diperoleh`, `sehingga`, `maka`,
  `adalah`, `misalkan`, `perhatikan`, `jadi`, `substitusi`, `dengan`, `karena`).

---

## 7. Kesenjangan jenis soal bank MANTRA terhadap mathcyber1997 (ditulis versi sendiri, bukan salinan)

Trigonometri: belum ada soal koordinat titik (segitiga KLM dari koordinat, koordinat
kutub), soal berhuruf (sin B = p → tan B; tan α = 1/a), segitiga bertingkat (AD =
AB cos θ lalu DE = AD sin θ), bentuk pecahan dibagi cos x supaya jadi tan x, luas
bangun dalam sin/cos, sec/csc/cot lebih banyak. Soal sangat mudah "Satu putaran
penuh sama dengan…" dan "Satuan yang dipakai…" terlalu tipis dibanding tingkat
mudah mathcyber (konversi radian, baca gambar).

Vektor: bank MANTRA hampir semua 2D; mathcyber SMA banyak 3D (i, j, k). Belum ada:
operasi tiga vektor 3D, proyeksi dengan parameter (kuadratkan kedua ruas), (a +
b) • (a − c) dengan syarat tegak lurus, vektor satuan bersudut 60° (a + b) • (b −
c), aturan kosinus vektor untuk |a − b| = √37 → 120°, pertidaksamaan proyeksi.

Grafik Fungsi: sudah dekat dengan mathcyber fungsi kuadrat. Belum ada: titik yang
dilalui diperiksa satu per satu, puncak (m, m), daerah hasil pada domain terbatas,
fungsi dengan titik balik sama, dua akar positif (tiga syarat), pergeseran dibaca
dari titik balik.

Statistika: belum ada persentil/desil berkelompok, rata-rata sementara, bilangan
salah baca, lima bilangan dengan median dan modus (ada satu), pernyataan
benar/salah dari tabel gaya UTBK ("Mari periksa kebenaran pernyataan").

Transformasi: belum ada transformasi oleh matriks umum lalu cermin (SPLDV x, y),
luas lewat determinan hasil kali dua matriks, faktor skala dibaca dari gambar,
translasi garis dibaca dari gambar, cermin terhadap y = x + 1, dilatasi kurva
berpusat bukan O lalu rotasi.

Limit: belum ada selisih dua pecahan disatukan dulu, x − 27 dengan akar pangkat
tiga, sekawan dua kali, substitusi x = y¹⁵, tak hingga dengan rumus cepat setelah
3x + 1 diubah jadi akar, pendekatan derajat pembilang-penyebut, limit sepihak
menuju tak hingga dengan tabel, limit dari grafik bergambar lebih banyak.

Ruang 3D: belum ada kaki tegak lurus tidak di tengah (dua persamaan), titik pada
perpanjangan rusuk, jarak dua bidang sejajar PUW-QVS, limas segitiga beraturan,
prisma segitiga berhuruf, irisan bidang, soal cerita ruangan, garis tinggi
5-12-13 → 60/13, sudut dua bidang lewat aturan kosinus di kuadran II.

Turunan: belum ada turunan |x|, invers dan invers turunan, f(p(x)) → f′ lewat
rantai, (f∘g)′ = (g∘f)′, membaca f′ dari grafik (garis singgung lewat dua titik),
h = f/g dari dua grafik garis, percepatan saat kecepatan tertentu, interval naik
dengan parameter (a dari 0 < x < 2), garis singgung yang juga menyinggung parabola
lain, luas minimum segitiga oleh garis lewat (4, 3), laju terkait kerucut dengan
kesebangunan.

Integral: belum ada ∫f(5 − x) dari ∫f(x), batas atas a dari nilai integral (ada
satu), pernyataan sifat kelinearan, fungsi ganjil/genap dan periodik, f(x) memuat
integral dirinya sendiri, luas dengan tiga cara (D√D/6a²), garis x = k membagi
dua sama luas, Riemann dari tabel (trapesium) dan titik tengah.
