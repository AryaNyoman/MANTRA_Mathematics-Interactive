# Alur belajar topik Statistika

Sesi: MATRA-STATISTIKA (cabang `sesi/statistika`)
Tanggal: 1 September 2026
Keadaan: **disetujui ARYA** (gerbang rancangan lolos, jawabannya "setuju")
Gelombang 1: halaman saja. Tanpa video.

---

## 1. Benang merah

> Satu angka tidak pernah cukup untuk menggambarkan sekumpulan data, dan cara
> menyajikan data ikut menentukan kesimpulan yang diambil orang.

Semua tahap menempel pada kalimat itu. Tahap 1 memperlihatkan masalahnya
(dua kelompok yang mean, median, dan modusnya sama persis, tetapi isinya jauh
berbeda), tahap 2 sampai 12 membangun alat untuk menjawabnya, tahap 13
mengembalikan siswa ke masalah yang sama dari sisi pembacanya.

Kenapa bukan urutan buku? Buku mulai dari histogram sebagai teknik. Di sini
teknik selalu datang setelah ada pertanyaan yang tidak bisa dijawab tanpanya.
Pola ini sudah dipakai dan berhasil di topik Limit.

---

## 2. Cakupan dan dasarnya

Kartu topik di situs menulis "Kelas 10 dan 11", jadi keduanya digarap.

**Kelas 10, Bab 7 Statistika** (Buku Panduan Guru Matematika SMA/SMK Kelas X,
Dicky Susanto dkk, Kemendikbudristek 2021, ISBN 978-602-244-537-1, hal. 203-246):
histogram dan diagram batang, frekuensi relatif, ukuran pemusatan (mean, median,
modus) untuk data tunggal dan data kelompok, penggunaan ukuran pemusatan dan
pencilan, kuartil dan persentil, jangkauan, jangkauan antar kuartil, varian,
simpangan baku, serta membandingkan dua kelompok data.

**Kelas 11, Bab 3 Statistika** (Buku Panduan Guru Matematika SMA/SMK Kelas XI,
Dicky Susanto dkk, Kemendikbudristek 2021, ISBN 978-602-244-789-4, hal. 137-177):
diagram pencar data bivariat, arah dan bentuk trend, garis regresi linear dengan
metode kuadrat terkecil, interpolasi dan ekstrapolasi, korelasi product moment,
koefisien determinasi, dan korelasi dibandingkan sebab-akibat.

Satu tahap tambahan di luar kurikulum, atas permintaan file tugas: membaca
grafik dengan kritis (grafik yang menyesatkan).

**Yang sengaja TIDAK masuk:** persentil selain kuartil dibahas sekilas di dalam
tahap kuartil, tidak diberi tahap sendiri, karena mekanismenya identik dengan
kuartil dan tahap sendiri hanya akan mengulang. Diagram lingkaran ikut di tahap
2 sebagai pembanding, bukan tahap sendiri, karena tidak ada yang perlu dilatih
di situ selain membacanya.

---

## 3. Aturan data (aturan keras topik ini)

1. **Data nyata wajib bersumber**: tautan atau nama penerbit plus halaman,
   ditulis di halaman yang dilihat siswa, bukan hanya di komentar kode.
2. **Data buatan wajib mengaku buatan** di halaman, dengan kalimat pendek
   seperti "Angka ini dibuat untuk latihan, bukan data sungguhan."
3. Dilarang menyajikan data karangan seolah data sungguhan. Termasuk dilarang
   menulis "menurut survei" untuk survei yang tidak ada.
4. Semua angka hasil hitungan (mean, median, kuartil, simpangan baku, koefisien
   regresi, r) **dicek dengan Python** lewat `alat/cek_statistik.py` sebelum
   masuk halaman. Angka yang belum dicek tidak boleh ditulis.

Sumber yang dipakai untuk data bersumber: kedua buku panduan guru di atas
(nomor halaman dicantumkan). Data BPS dari web tidak dipakai pada gelombang ini
karena ARYA belum memintanya; kalau nanti diminta, tinggal ditambahkan di tahap
13 dan tahap 10.

---

## 4. Tiga belas tahap

Tiap tahap punya: pertanyaan pembuka, penjelasan berblok (paragraf pendek,
poin, sorot, contoh berhitung), satu widget yang bisa ditarik atau digeser,
kotak "Sering keliru" di bawah, dan intisari.

### Tahap 1. Kenapa satu angka bisa menipu
- **Pertanyaan:** Dua kelas punya rata-rata nilai sama persis. Apakah keduanya
  sama saja?
- **Isi:** Kelas A `6, 6, 7, 7, 7, 7, 8, 8` dan Kelas B `3, 4, 5, 7, 7, 9, 10, 11`.
  Mean, median, dan modus ketiganya sama: 7. Yang berbeda cuma sebarannya.
  Dari sini lahir dua pertanyaan yang mengisi seluruh topik: bagaimana meringkas
  data, dan bagaimana mengukur sebarannya.
- **Widget `DuaKelompok`:** dua garis bilangan bertitik. Siswa menggeser titik
  di kelas B; ketiga ukuran pemusatan dan jangkauannya ikut berubah hidup.
  Ada tombol "samakan rata-ratanya" untuk membuktikan mean bisa dipertahankan
  sambil bentuk datanya diobrak-abrik.
- **Sering keliru:** "kalau rata-ratanya sama, datanya mirip."
- **Data:** buatan, dinyatakan buatan.

### Tahap 2. Dari daftar angka jadi gambar
- **Pertanyaan:** Kapan pakai diagram batang, kapan histogram?
- **Isi:** Perbedaan data kategori dan data angka. Diagram batang untuk kategori
  (batangnya renggang, urutannya bebas), histogram untuk angka yang dikelompokkan
  (batangnya rapat, urutannya tidak boleh ditukar karena sumbunya garis bilangan).
  Line plot sebagai bentuk paling jujur untuk data sedikit: setiap titik satu
  data, tidak ada yang disembunyikan. Diagram lingkaran disinggung sebagai
  penyaji bagian dari keseluruhan, dan kelemahannya: mata manusia buruk
  membandingkan luas juring.
- **Widget `BentukData`:** satu kumpulan data, empat tombol tampilan (line plot,
  diagram batang, histogram, diagram lingkaran). Tampilan yang tidak sesuai
  jenis datanya diberi tanda peringatan, bukan disembunyikan, supaya siswa
  melihat kenapa salah.
- **Sering keliru:** "diagram batang dan histogram itu sama, cuma beda nama."
- **Dasar:** Buku Guru Kelas X hal. 204 dan 211 (subbab A).

### Tahap 3. Lebar kelas mengubah cerita
- **Pertanyaan:** Dari data yang sama persis, kenapa bisa lahir dua histogram
  yang bentuknya berbeda?
- **Isi:** Menentukan lebar kelas itu pilihan manusia, bukan hasil rumus. Kelas
  terlalu sempit membuat data terlihat berantakan, terlalu lebar menghapus
  polanya. Prinsip luas: kalau dua kelas digabung, luas persegi panjangnya
  dipertahankan, jadi tinggi batangnya bukan sekadar dijumlah. Contoh dari buku:
  kelas 8-10 (tinggi 12) dan 10-12 (tinggi 4) punya luas 24 + 8 = 32, digabung
  jadi kelas 8-12 dengan tinggi 8 karena 4 x 8 = 32.
- **Widget `LebarKelas`:** 40 data tinggi badan, penggeser lebar kelas dari 1
  sampai 10. Histogram digambar ulang tiap perubahan, dengan tabel frekuensinya
  di samping supaya siswa melihat kaitannya.
- **Sering keliru:** "banyak kelas ditentukan rumus, jadi cuma ada satu
  histogram yang benar."
- **Dasar:** Buku Guru Kelas X hal. 211 (perhitungan luasnya diambil dari sana).

### Tahap 4. Frekuensi relatif
- **Pertanyaan:** Kelas A 25 siswa, kelas B 40 siswa. Kelas mana yang lebih
  banyak siswa nilainya di atas 80?
- **Isi:** Membandingkan frekuensi mentah antara dua kelompok berbeda ukuran itu
  menyesatkan. Frekuensi relatif (dibagi banyak data) menyamakan takarannya.
  Persen dan pecahan desimal sebagai dua tampilan hal yang sama.
- **Widget `FrekuensiRelatif`:** dua histogram berdampingan, satu tombol untuk
  menukar sumbu tegaknya antara frekuensi asli dan frekuensi relatif. Kesimpulan
  di bawahnya ikut berubah, dan itu yang jadi kejutannya.
- **Sering keliru:** "kelompok yang batangnya lebih tinggi pasti lebih banyak."
- **Dasar:** Buku Guru Kelas X hal. 204 (subbab B).

### Tahap 5. Mean, median, modus
- **Pertanyaan:** Kalau ditanya "biasanya berapa", angka mana yang menjawab?
- **Isi:** Modus sebagai yang paling sering, median sebagai yang di tengah
  setelah diurutkan, mean sebagai titik seimbang. Penekanan pada mean sebagai
  **titik seimbang jungkat-jungkit**, bukan sekadar jumlah dibagi banyak:
  jumlah simpangan ke kiri selalu sama dengan jumlah simpangan ke kanan.
  Aturan median untuk data genap dan ganjil. Data bisa punya lebih dari satu
  modus, atau tidak punya modus sama sekali.
- **Widget `TigaUkuran`:** titik data di atas papan jungkat-jungkit. Titik bisa
  diseret. Penopang jungkat-jungkit berada di mean dan ikut bergeser; median dan
  modus ditandai dengan garis berwarna beda. Kalau papannya miring, artinya
  penopangnya bukan di mean.
- **Sering keliru:** "median itu angka yang ada di tengah daftar" (tanpa
  diurutkan lebih dulu).
- **Dasar:** Buku Guru Kelas X hal. 206 (subbab C, median dan modus lewat line plot).

### Tahap 6. Pencilan, kapan rata-rata berbohong
- **Pertanyaan:** Gaji rata-rata di kantor itu 12 juta. Kenapa hampir semua
  karyawannya tidak merasa begitu?
- **Isi:** Sembilan karyawan bergaji sekitar 5 juta dan satu direktur bergaji
  75 juta. Mean tertarik ke arah pencilan, median tidak bergeming. Kapan mean
  layak dipakai (data setangkup, tanpa pencilan) dan kapan median lebih jujur
  (data miring, ada pencilan, contohnya gaji dan harga rumah). Pencilan tidak
  otomatis salah dan tidak boleh langsung dibuang; ia justru sering informasi
  yang paling menarik.
- **Widget `TarikPencilan`:** satu titik bisa diseret sejauh mungkin ke kanan.
  Mean ikut lari, median diam. Selisih keduanya ditampilkan sebagai angka hidup.
- **Sering keliru:** "data yang jauh sendiri itu salah catat, hapus saja."
- **Dasar:** Buku Guru Kelas X hal. 206 (pokok materi "Penggunaan Ukuran
  Pemusatan", kosakata "Pencilan").

### Tahap 7. Kuartil, boxplot, dan jangkauan antar kuartil
- **Pertanyaan:** Bagaimana menggambarkan sebaran data hanya dengan lima angka?
- **Isi:** Membelah data terurut jadi empat bagian sama banyak. Q1, Q2 (median),
  Q3. Ringkasan lima angka: minimum, Q1, median, Q3, maksimum. Boxplot sebagai
  gambar dari kelima angka itu. Jangkauan antar kuartil (JAK) = Q3 - Q1, yaitu
  lebar setengah data yang di tengah, kebal terhadap pencilan. Aturan pagar
  1,5 x JAK untuk menandai calon pencilan. Persentil disinggung di sini:
  kuartil itu persentil ke-25, 50, dan 75.
- **Widget `KotakGaris`:** titik data di garis bilangan, boxplot terbentuk di
  atasnya. Titik bisa digeser dan kotaknya ikut berubah. Ada tombol untuk
  menyalakan pagar 1,5 x JAK sehingga pencilan berubah warna sendiri.
- **Sering keliru:** "kotak yang lebih lebar berarti datanya lebih banyak"
  (padahal tiap bagian selalu berisi seperempat data).
- **Dasar:** Buku Guru Kelas X hal. 207 (subbab D dan E).

### Tahap 8. Simpangan baku, rata-rata jarak dari pusat
- **Pertanyaan:** Dua mesin isi ulang punya rata-rata sama, 500 ml. Kenapa yang
  satu tetap ditolak pabrik?
- **Isi:** Dibangun bertahap dan sengaja lambat, karena ini bagian paling sering
  dihafal tanpa dimengerti:
  1. Ukur jarak tiap data ke mean.
  2. Jumlah jarak berarah selalu nol, jadi cara itu gagal. Ini dibuktikan,
     bukan diberitahu.
  3. Kuadratkan supaya tidak saling menghapus, dan kuadrat itu digambar sebagai
     luas persegi sungguhan.
  4. Rata-ratakan luasnya, itu varian.
  5. Akarkan supaya satuannya kembali seperti data aslinya, itu simpangan baku.
  Ditutup dengan tafsirannya: simpangan baku kecil berarti data berkumpul rapat
  di sekitar mean. Pembagi n dipakai (simpangan baku populasi) sesuai buku SMA,
  dan perbedaannya dengan pembagi n-1 disebut satu kalimat sebagai catatan kaki,
  supaya siswa tidak bingung saat melihat kalkulator atau spreadsheet.
- **Widget `JarakKeRata`:** titik data, garis putus-putus ke mean, persegi
  berwarna sebagai kuadrat simpangan. Total luas, varian, dan simpangan baku
  tampil hidup saat titik digeser.
- **Sering keliru:** "simpangan baku besar berarti nilainya jelek."
- **Dasar:** Buku Guru Kelas X hal. 207 (subbab E).

### Tahap 9. Data berkelompok
- **Pertanyaan:** Kalau yang kita punya cuma tabelnya, dan angka aslinya sudah
  hilang, apa yang masih bisa dihitung?
- **Isi:** Tabel frekuensi berkelompok, tepi kelas, titik tengah kelas.
  Mean data kelompok memakai titik tengah sebagai wakil seluruh kelas, dan
  kenapa hasilnya **hampiran**, bukan nilai persis. Modus data kelompok lewat
  kesebangunan di dalam batang tertinggi. Median dan kuartil data kelompok lewat
  interpolasi: menyusuri masuk ke dalam kelas sejauh bagian yang kurang.
  Semua rumus diturunkan dari gambarnya, tidak diturunkan dari langit.
- **Widget `DataKelompok`:** histogram di kiri, tabel frekuensi di kanan, saling
  menyala saat salah satunya disentuh. Garis median digeser sampai luas di kiri
  sama dengan luas di kanan, dan angka hasil rumus interpolasi muncul di titik
  yang sama, jadi rumusnya terbukti di depan mata.
- **Sering keliru:** "mean data kelompok pasti sama dengan mean data aslinya."
- **Dasar:** Buku Guru Kelas X hal. 206 (kosakata "Interpolasi, kesebangunan").

### Tahap 10. Diagram pencar dan arah hubungan
- **Pertanyaan:** Apakah lama belajar berhubungan dengan nilai ujian?
- **Isi:** Data bivariat, satu benda dicatat dua angkanya sekaligus. Sumbu datar
  untuk yang dianggap penyebab, sumbu tegak untuk yang dianggap akibat. Arah
  hubungan (naik, turun, tidak ada), bentuknya (lurus atau melengkung), dan
  kekuatannya (titik rapat atau berpencar).
- **Widget `DiagramPencar`:** titik bisa diseret. Label arah dan bentuk trend
  berubah otomatis mengikuti sebarannya. Ada tombol contoh siap pakai: naik,
  turun, tidak berhubungan, dan melengkung.
- **Sering keliru:** menukar tempat x dan y saat meletakkan titik, sehingga pola
  datanya rusak dan kesimpulannya ikut salah. Ini kotak "Miskonsepsi !?" milik
  buku (Kelas XI hal. 143), ditulis ulang dengan bahasa siswa.
- **Dasar:** Buku Guru Kelas XI hal. 138-143 (subbab A).

### Tahap 11. Garis regresi dan sisa jaraknya
- **Pertanyaan:** Kalau sepuluh orang menarik garis "yang paling pas" pada
  titik yang sama, garis siapa yang benar?
- **Isi:** Residu, yaitu jarak tegak dari titik ke garis. Garis yang lebih baik
  adalah yang jumlah kuadrat residunya lebih kecil, dan itulah metode kuadrat
  terkecil. Rumus a dan b disajikan setelah gagasannya dipahami, bukan sebelum.
  Menafsirkan gradien dalam bahasa konteks ("tiap tambah 1 jam belajar, nilai
  naik sekian"). Interpolasi (menebak di dalam rentang data, relatif aman) dan
  ekstrapolasi (menebak di luar rentang data, berbahaya).
- **Widget `GarisRegresi`:** siswa menarik ujung garisnya sendiri. Residu tiap
  titik digambar sebagai ruas tegak, jumlah kuadratnya tampil hidup, dan ada
  tombol "tunjukkan garis terbaik" untuk membandingkan hasil tarikan siswa
  dengan garis kuadrat terkecil.
- **Sering keliru:** ekstrapolasi berlebihan sampai hasilnya mustahil di dunia
  nyata, misalnya waktu tempuh negatif. Diambil dari kotak "Miskonsepsi !?"
  buku (Kelas XI hal. 168), bersama tertukarnya a dan b saat substitusi.
- **Dasar:** Buku Guru Kelas XI hal. 154-168 (subbab B).

### Tahap 12. Korelasi bukan sebab-akibat
- **Pertanyaan:** Angka hubungannya 0,9. Berarti yang satu menyebabkan yang
  lain, kan?
- **Isi:** Koefisien korelasi r sebagai angka antara -1 dan 1: tandanya arah,
  besarnya kekuatan. Koefisien determinasi r kuadrat sebagai bagian keragaman
  yang bisa dijelaskan garisnya. Lalu bagian terpentingnya: korelasi kuat tidak
  membuktikan sebab-akibat, karena bisa ada faktor ketiga, arah sebabnya bisa
  terbalik, atau kebetulan belaka. Contoh faktor ketiga dijelaskan sebagai
  ilustrasi dan **disebut ilustrasi**, tanpa angka palsu yang mengaku data.
- **Widget `KekuatanHubungan`:** empat sebaran siap pakai dengan nilai r yang
  berbeda, plus titik yang bisa digeser sehingga siswa melihat r bergerak.
  Satu tombol memperlihatkan dua sebaran dengan r sama tetapi bentuk jauh
  berbeda, jadi r saja tidak pernah cukup tanpa melihat gambarnya.
- **Sering keliru:** "r = 0 berarti tidak ada hubungan sama sekali" (padahal
  hubungan melengkung bisa memberi r mendekati nol).
- **Dasar:** Buku Guru Kelas XI hal. 168-177 (subbab C).

### Tahap 13. Grafik yang menyesatkan
- **Pertanyaan:** Grafiknya benar semua angkanya. Kenapa kesimpulannya tetap
  salah?
- **Isi:** Lima cara grafik jujur dipakai untuk menyesatkan:
  1. Sumbu tegak tidak mulai dari nol, sehingga selisih kecil terlihat raksasa.
  2. Lebar kelas dipilih supaya polanya hilang atau muncul.
  3. Gambar yang diperbesar dua arah, sehingga naik dua kali terlihat naik
     empat kali luasnya.
  4. "Rata-rata" yang dipakai dipilih yang paling menguntungkan.
  5. Sumbu datar yang jaraknya tidak sama.
  Ditutup dengan daftar tiga pertanyaan yang harus ditanyakan siswa pada setiap
  grafik yang dilihatnya: sumbunya mulai dari berapa, datanya dari mana, dan
  apa yang tidak ditampilkan.
- **Widget `SumbuJujur`:** satu data yang sama, dua grafik berdampingan. Satu
  tombol mengubah sumbu tegaknya antara mulai dari nol dan dipotong. Selisih
  kesan visualnya yang jadi pelajarannya.
- **Sering keliru:** "grafik yang datanya benar tidak mungkin menipu."
- **Dasar:** di luar kurikulum, permintaan file tugas MATRA-STATISTIKA.

---

## 5. Latihan, kuis, dan kalibrasi soal

- **Latihan dalam halaman:** 4 soal pilihan ganda A sampai E dengan pembahasan
  bertahap, mengikuti pola Trigonometri dan Limit. Pengecohnya bukan asal salah:
  tiap pilihan adalah kekeliruan yang benar-benar sering terjadi (misalnya
  median dihitung tanpa mengurutkan, atau frekuensi mentah dibandingkan langsung
  antar kelompok berbeda ukuran).
- **Kuis:** bank 32 soal, empat tingkat (mudah, sedang, sulit, sangat sulit),
  8 soal per sesi, menghindari soal yang sudah pernah keluar.
- **Halaman `/latihan/statistika`** mengikuti rangka yang sudah bebas topik.
- **Kalibrasi dulu, baru menulis.** Soal buatan Claude cenderung terlalu mudah,
  itu temuan ARYA. Sumber kalibrasi: soal dan eksplorasi di kedua buku panduan
  guru, dan halaman terpilih dari big book SMA (scan, dibaca sebagai gambar
  lewat PyMuPDF, dibedah bukan diborong). mathcyber1997 diblokir pemeriksa bot,
  jadi tidak dipakai kecuali ARYA menempelkan soalnya sendiri.
- Soal salinan wajib bersumber (tautan dan penulis). Soal tanpa keterangan
  berarti tulisan sendiri.

---

## 6. Berkas yang dibuat

Semuanya di dalam wilayah sesi ini, kecuali satu baris yang ditandai.

| Berkas | Isi |
|---|---|
| `web/content/statistika/tahap.ts` | 13 tahap |
| `web/content/statistika/latihan.ts` | 4 latihan dan 4 kanal YouTube |
| `web/content/statistika/kuis.ts` | bank 32 soal |
| `web/content/statistika/data.ts` | semua kumpulan data contoh, satu sumber kebenaran, lengkap dengan keterangan sumber atau keterangan buatan |
| `web/content/statistika/index.ts` | pintu keluar modul |
| `web/components/topik/PanggungStatistika.tsx` | penyetelan 13 widget |
| `web/components/widget/statistika/*.tsx` | 13 widget |
| `web/components/widget/statistika/papan.ts` | penskalaan, sumbu, garis petak, penunjuk skala |
| `web/components/widget/statistika/warna-data.ts` | palet kategori khusus data |
| `web/content/daftar-isi.ts` | **satu baris** entri statistika |
| `alat/cek_statistik.py` | pemeriksa angka dengan Python, berkas baru |
| `docs/tugas/laporan/MATRA-STATISTIKA.md` | laporan sesi |

**Butuh MASTER:** satu baris `siap: true` pada entri statistika di
`web/content/topik.ts`. File itu di luar wilayah sesi ini, jadi diminta lewat
laporan, tidak dikerjakan sendiri.

**Tidak menumpang milik topik lain.** Bingkai widget ditulis sendiri di
`widget/statistika/papan.ts`, tidak mengimpor `widget/limit/koordinat.ts`,
supaya folder Limit tidak jadi ketergantungan dan MASTER bebas memindahkannya.

**Palet warna.** Empat warna matematika terkunci (`#3A6EA5`, `#C25E4D`,
`#1F2430`, `#D9A441`) dipakai untuk peran tetap: biru untuk data utama, bata
untuk pembanding atau pencilan, kuning untuk sorotan seperti mean. Kategori
tambahan pada diagram batang dan lingkaran mengambil palet terpisah di
`warna-data.ts`, yang diturunkan dari gaya Studio Teknis, bukan warna baru
yang dikarang. Skill `dataviz` dibaca sebelum widget pertama digambar.

---

## 7. Aturan yang berlaku saat membangun

1. Penjelasan dipecah jadi blok, tetapi isinya tidak dipangkas.
2. Kata "miskonsepsi" tidak boleh muncul di halaman. Pakai "Sering keliru",
   letaknya di bawah setelah siswa paham.
3. Tanpa tanda em-dash, di teks maupun di komentar kode.
4. Widget tidak boleh memotong gambarnya sendiri. Bingkai menyesuaikan otomatis
   dan memberi tahu lewat penunjuk skala.
5. Sebisanya widget ditarik atau diklik langsung, bukan cuma lewat penggeser.
6. Gaya visual Studio Teknis, tidak mengarang gaya baru.
7. Halaman memakai `HalamanTopik` yang sudah ada. Rangkanya tidak disentuh.

---

## 8. Urutan kerja

1. `alat/cek_statistik.py` dibuat **lebih dulu**, sebelum satu angka pun ditulis.
   Pola ini terbukti di topik Limit lewat `alat/cek_soal.py`.
2. `data.ts` dengan semua kumpulan data, lalu seluruh angkanya dicek.
3. Rangka konten: `tahap.ts` kerangka 13 tahap, daftarkan di `daftar-isi.ts`,
   pastikan halaman sudah tampil walau isinya belum lengkap.
4. Widget dan isi dikerjakan per rombongan, tiap rombongan langsung diperiksa
   mata lewat playwright-cli pada lebar 375 dan 1366:
   - rombongan A: tahap 1 sampai 4 (penyajian data)
   - rombongan B: tahap 5 sampai 9 (pemusatan dan penyebaran)
   - rombongan C: tahap 10 sampai 13 (hubungan dua data dan membaca kritis)
5. Latihan dan kuis, setelah kalibrasi ke sumber.
6. Pemeriksaan akhir: `rtk proxy "npx tsc --noEmit"` dan
   `rtk proxy "npm run build"` di `web/`, potret layar 375 dan 1366 dibuka dan
   dinilai, laporan diisi.

## 9. Selesai gelombang 1 artinya

- Halaman `/topik/statistika` tampil utuh lewat entri `daftar-isi.ts`.
- 13 tahap terisi, 13 widget hidup dan tidak memotong gambarnya sendiri.
- Semua angka lolos `alat/cek_statistik.py`.
- Semua data punya keterangan sumber atau keterangan buatan.
- Potret layar 375 dan 1366 sudah dibuka dan dinilai mata, bukan cuma dibuat.
- `npx tsc --noEmit` dan `npm run build` lolos.
- Laporan terisi, commit rapi.
