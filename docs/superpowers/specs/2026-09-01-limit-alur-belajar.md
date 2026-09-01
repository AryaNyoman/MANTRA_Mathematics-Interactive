# Limit: Alur Belajar 10 Tahap (topik kedua MATRA)

**Tanggal:** 1 September 2026 · **Disetujui ARYA:** ya, sesi 5
**Menyusul:** `2026-08-31-trigonometri-alur-belajar.md`

---

## Keputusan yang sudah diambil ARYA

| Pertanyaan | Jawaban ARYA |
|---|---|
| Topik kedua | **Limit** (bukan Vektor, bukan Statistika) |
| Video Manim | **6 sampai 7 video**, setara Trigonometri |
| Kelengkapan | **Lengkap**: materi, widget, latihan, kuis, halaman `/latihan` |
| Rangka kode | **Pilihan A**: rangka halaman dipisah supaya dipakai bersama |

Claude sudah menyampaikan bahwa 7 video plus kelengkapan penuh kemungkinan
besar **menghabiskan seluruh sisa waktu sampai 12 September**, sehingga empat
topik lain tidak akan tergarap. ARYA tetap memilih ini. Keputusan diterima,
catatan risikonya ada di bagian terakhir dokumen ini.

---

## Sumber materi (bukan ingatan Claude)

Dasar utamanya buku resmi:

> **Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi)**, 2025.
> Sri Adi Widodo, Wikan Budi Utami, Fitria Sulistyowati, Atiek Sandrawati.
> Kementerian Pendidikan Dasar dan Menengah.
> Bab 2 bagian A.1 **"Limit dan Kontinuitas Fungsi"**, halaman cetak 82 sampai 97.
> Berkas lokal: `D:\BAHAN MATEMATIKA\LIMIT.pdf` (halaman PDF 97 sampai 112).

Cakupan resminya ada empat bagian, dan keempatnya masuk:

1. Definisi limit fungsi secara intuitif (didekati dari kiri dan dari kanan)
2. Tujuh sifat limit fungsi
3. Limit fungsi trigonometri
4. Kontinuitas fungsi

Buku itu juga menyebut, di kotak "Ayo Mengingat Kembali" halaman 91, empat
jalan keluar saat bertemu bentuk tak tentu: memakai sifat limit, memfaktorkan,
mengalikan dengan sekawan, dan membagi dengan pangkat tertinggi. Keempatnya
ikut diajarkan.

Rujukan pendamping, dipakai hanya untuk memastikan istilah Indonesianya benar:
`D:\SEKOLAH S1 & S2\S1\matematika\kalkulus 1.pdf` (diktat ITB).

**Catatan gaya bahasa.** Buku resmi memakai kisah Pacu Jawi dan wahana
Halilintar sebagai pembuka. MATRA memakai contoh sendiri supaya tidak menyalin,
tetapi tetap menyebut buku itu sebagai sumber konsepnya.

---

## Kenapa Limit disusun begini

Salah paham yang dilawan sudah tercatat di `content/topik.ts`:

> *"limit itu ya nilai fungsi di titik itu."*

Salah paham itu tidak muncul entah dari mana. Ia muncul karena hampir semua
soal latihan di sekolah **memang** bisa dijawab dengan memasukkan angkanya.
Siswa lalu menyimpulkan bahwa limit adalah cara berbelit untuk melakukan
substitusi. Baru kemudian, saat bertemu bentuk 0 dibagi 0, ia kehilangan pegangan.

Karena itu urutannya dibalik dari kebiasaan buku: **bentuk yang tidak bisa
disubstitusi diperkenalkan lebih dulu** (Tahap 1 dan Tahap 4), baru cara
cepatnya (Tahap 5). Dengan begitu substitusi terasa sebagai jalan pintas yang
kebetulan sah, bukan sebagai definisi.

Sama seperti Trigonometri: **masalah dulu, rumus belakangan.**

---

## Alur 10 tahap

Bentuk datanya sama persis dengan Trigonometri, jadi tidak ada tipe baru:
`no`, `slug`, `judul`, `pertanyaan`, `labelPendek`, `penjelasan` (kumpulan blok),
`seringKeliru`, `intisari`, `widget`, `video`, `siap`.

### Tahap 1: Kecepatan pada satu detik

**Pertanyaan:** Speedometer menunjuk 60 km per jam pada satu saat. Padahal
kecepatan itu jarak dibagi waktu. Pada "satu saat", waktunya nol dan jaraknya
juga nol. Kenapa jarumnya tetap punya angka?

**Isi pokok.** Jarak dibagi waktu hanya berlaku untuk satu selang. Untuk satu
titik waktu, hitungan itu menjadi 0 dibagi 0, yang tidak punya arti. Jalan
keluarnya bukan memaksa selangnya nol, melainkan **memperpendek selangnya terus
menerus dan melihat angkanya menuju ke mana.**

Angka yang dipakai: benda jatuh dengan `s(t) = 5t²` meter.
Kecepatan rata rata dari detik 2 sampai detik `2 + h`:

    ( s(2+h) - s(2) ) / h  =  ( 20 + 20h + 5h² - 20 ) / h  =  20 + 5h

Untuk `h` kecil, angkanya menuju **20 meter per detik**. Perhatikan bahwa
`h = 0` tidak boleh dimasukkan ke bentuk aslinya, karena penyebutnya nol.
Yang boleh dimasukkan adalah bentuk yang **sudah disederhanakan**.

**Widget `selang-menyusut`.** Penggeser `h` dari 1 sampai 0,001. Menampilkan
tiga hal serentak: tabel nilai, garis potong pada grafik yang perlahan berubah
menjadi garis singgung, dan angka `20 + 5h` yang merapat ke 20.

**Sering keliru:** *"kalau h = 0 hasilnya juga 20, jadi limit itu cuma
gaya-gayaan."* Ditaruh di bawah. Jawabannya: pada bentuk asli, `h = 0`
memberi 0 dibagi 0. Penyederhanaan itulah yang membolehkan `h` diganti nol,
dan penyederhanaan itu hanya sah untuk `h` yang bukan nol.

**Video:** ya (prioritas ke-2).

---

### Tahap 2: Mendekati, bukan menyentuh

**Pertanyaan:** Apa artinya "mendekati" kalau tidak pernah sampai?

**Isi pokok.** Nilai `x` didorong ke `c` dari kiri dan dari kanan, lalu
`f(x)` diamati. Kalau kedua arah menuju bilangan yang sama, bilangan itulah
limitnya. Definisi resminya, dari Definisi 2.1 buku Kemendikdasmen halaman 84:

> Ketika `x` mendekati `c`, limit `f(x)` adalah `L`, ditulis `lim f(x) = L`,
> berarti untuk `x` mendekati `c` dari kiri dan dari kanan, `f(x)` mendekati `L`.

Ditegaskan sejak awal: **limit tidak peduli apa yang terjadi tepat di `c`.**
Ia hanya peduli pada tetangga-tetangganya. Itu kalimat sorotnya.

**Widget `garis-mendekati`.** Garis bilangan dengan `c` ditandai. Siswa menarik
titik `x` mendekat, tabel di sampingnya terisi hidup mengikuti tarikan, dan
angka `f(x)` menyempit ke satu nilai.

**Video:** ya (prioritas ke-4).

---

### Tahap 3: Dua arah harus sepakat

**Pertanyaan:** Kenapa ada fungsi yang limitnya tidak ada?

**Isi pokok.** Limit kiri dan limit kanan diperkenalkan berikut notasinya.
Kalau keduanya berbeda, limitnya **tidak ada**, walaupun fungsinya punya nilai
di titik itu. Contohnya tarif parkir yang berubah tepat pada jam ketiga:
mendekati dari bawah memberi satu angka, mendekati dari atas memberi angka lain.

Ini penting karena membalik dugaan siswa: **punya nilai bukan jaminan punya
limit.** Tahap 4 nanti membalik arah sebaliknya.

**Widget `tarif-melompat`.** Grafik tangga, dua penunjuk merayap dari kiri dan
dari kanan, angkanya berhenti di dua tempat berbeda.

**Video:** ya (prioritas ke-8, cadangan kalau waktunya cukup).

---

### Tahap 4: Lubang yang tidak mengubah tujuan

**Pertanyaan:** Titiknya kosong, kenapa limitnya tetap ada?

**Isi pokok.** Inilah pembunuh salah paham utama.

    f(x) = (x² - 1) / (x - 1)

Di `x = 1` fungsinya 0 dibagi 0, jadi **tidak punya nilai sama sekali**.
Tetapi untuk setiap `x` yang bukan 1, bentuk itu sama dengan `x + 1`.
Grafiknya adalah garis `y = x + 1` yang berlubang tepat di titik `(1, 2)`.

Kedua tetangganya menuju 2, jadi limitnya 2. **Nilai fungsi tidak ada,
limitnya ada.** Digabung dengan Tahap 3, siswa melihat keduanya benar-benar
dua hal berbeda.

**Widget `lubang-grafik`.** Perbesaran bertahap ke sekitar `x = 1` sampai
lubangnya terlihat sebagai lingkaran kosong. Penunjuk skala wajib ada, sesuai
aturan proyek.

**Video:** ya (prioritas ke-1, paling penting).

---

### Tahap 5: Cara cepat, masukkan saja angkanya

**Pertanyaan:** Kapan boleh langsung disubstitusi?

**Isi pokok.** Tujuh sifat limit dari buku halaman 85 dan 86, ditulis dalam
bahasa SMA: limit konstanta, limit `x`, kelipatan, jumlah dan selisih, hasil
kali, hasil bagi (dengan syarat penyebutnya tidak nol), pangkat, dan akar.

Kesimpulan praktisnya: untuk suku banyak dan untuk pecahan yang penyebutnya
tidak nol di titik itu, **substitusi langsung memang sah**. Bukan karena limit
sama dengan nilai fungsi, melainkan karena fungsi jenis itu kebetulan tidak
punya kejutan di sana. Alasannya baru lengkap di Tahap 9.

**Widget `mesin-sifat`.** Siswa memilih sifat mana yang dipakai di tiap
langkah; kalau salah, mesinnya menolak dan memberi tahu kenapa.

**Video:** tidak. Tahap ini daftar aturan, tidak ada yang bergerak.

---

### Tahap 6: Kalau hasilnya 0 dibagi 0

**Pertanyaan:** Substitusi buntu. Sekarang bagaimana?

**Isi pokok.** Bentuk tak tentu, dan tiga cara membongkarnya (buku halaman 91):

- **Memfaktorkan.** `(x² - 4)/(x - 2)` di `x = 2` menjadi `x + 2`, hasilnya 4.
- **Mengalikan dengan sekawan.** `(√(x+4) - 2)/x` di `x = 0` dikalikan
  `(√(x+4) + 2)/(√(x+4) + 2)` menjadi `1/(√(x+4) + 2)`, hasilnya **1/4**.
- **Membagi dengan pangkat tertinggi.** Diperkenalkan di sini, dipakai penuh
  di Tahap 7.

Ditegaskan: bentuk 0 dibagi 0 **bukan berarti limitnya tidak ada**. Ia berarti
bentuk yang ditulis belum memberi tahu apa-apa, jadi harus ditulis ulang.

**Widget `bongkar-bertahap`.** Pemecahan muncul selangkah demi selangkah,
siswa menekan untuk maju, dan tiap langkah diberi nama caranya.

**Video:** ya (prioritas ke-6).

---

### Tahap 7: Kalau x lari ke tak hingga

**Pertanyaan:** Kenapa grafik bisa mendatar tapi tidak pernah menyentuh garisnya?

**Isi pokok.** Limit di tak hingga dan asimtot datar. Caranya membagi
pembilang dan penyebut dengan pangkat tertinggi.

    lim (3x² + 2x) / (x² - 5)  untuk x menuju tak hingga  =  3

Ditegaskan bahwa tak hingga **bukan bilangan**, jadi tidak bisa disubstitusi.
Ia keterangan arah, bukan tempat tujuan.

**Widget `perkecil-tampilan`.** Kebalikan Tahap 4: tampilan grafik diperkecil
terus sampai kurvanya terlihat menempel pada garis mendatar `y = 3`, tetapi
angka pada tabel menunjukkan ia tidak pernah sama dengan 3.

**Video:** ya (prioritas ke-7).

---

### Tahap 8: Limit sinus jadi angka 1

**Pertanyaan:** Kenapa `sin x` dibagi `x` menuju tepat 1, bukan mendekati saja?

**Isi pokok.** Tahap penyambung ke topik Trigonometri yang sudah jadi.
Buktinya diambil dari buku halaman 88 dan 89, memakai lingkaran satuan:

    luas segitiga dalam  <  luas juring  <  luas segitiga luar
    ½ cos x sin x        <  ½ x          <  ½ tan x

Dibagi `sin x` (positif untuk sudut lancip) memberi

    cos x  <  x / sin x  <  1 / cos x

Saat `x` mengecil, kedua penjepitnya menuju 1, jadi yang terjepit di tengah
juga menuju 1. Karena itu `sin x / x` menuju 1.

Untuk siswa istilahnya cukup **"terjepit"**, tanpa menyebut teorema apit.

Wajib disebutkan: **`x` di sini dalam radian.** Kalau derajat dipakai,
angkanya bukan 1. Ini kesalahan yang sering terjadi dan jarang dijelaskan.

**Widget `busur-lawan-tali`.** Lingkaran satuan memakai warna matematika yang
sama dengan widget Trigonometri, supaya kaitannya terlihat. Sudut dikecilkan,
panjang busur dan panjang `sin x` ditampilkan berdampingan beserta
perbandingannya yang merapat ke 1.

**Video:** ya (prioritas ke-3).

---

### Tahap 9: Fungsi yang tidak putus

**Pertanyaan:** Apa bedanya grafik yang bisa digambar tanpa mengangkat pensil?

**Isi pokok.** Kontinu di `c` kalau tiga syarat terpenuhi sekaligus:

1. `f(c)` ada
2. limitnya di `c` ada
3. keduanya bernilai sama

Tiga cara sebuah fungsi bisa gagal, dan ketiganya sudah pernah ditemui siswa:
**lubang** (Tahap 4), **lompatan** (Tahap 3), dan **asimtot tegak** (baru).

Di sinilah janji Tahap 5 dilunasi: substitusi langsung sah **justru karena**
suku banyak itu kontinu di mana-mana. Jadi urutannya sekarang tertutup rapi.

**Widget `perusak-fungsi`.** Tiga tombol untuk merusak sebuah fungsi yang
semula mulus: bikin lubang, bikin lompat, bikin asimtot. Tiap kerusakan
menampilkan syarat nomor berapa yang dilanggar.

**Video:** ya (prioritas ke-5).

---

### Tahap 10: Dipakai di dunia nyata

Galeri foto, tidak interaktif, meniru keputusan ARYA untuk Tahap 10
Trigonometri pada 1 September.

Empat contoh: rel roller coaster yang harus mulus (contoh dari buku halaman 94),
kadar obat dalam darah yang mendekati batas tetap, laju produksi pabrik, dan
pertumbuhan populasi yang mendatar di daya dukung lingkungan.

Foto diambil dari Wikimedia Commons dengan lisensi terbuka. Sumbernya dicatat
di `web/public/gambar/sumber.json`, mengikuti cara yang sudah dipakai.

**Video:** tidak.

---

## Video: tujuh, dengan urutan prioritas

Kalau waktunya habis, pemotongan dilakukan **dari bawah**, bukan acak.

| Urutan | Tahap | Kenapa sepenting itu |
|---|---|---|
| 1 | 4, lubang di grafik | Membunuh salah paham utama topik ini |
| 2 | 1, kecepatan sesaat | Menjawab "kenapa kita butuh limit" |
| 3 | 8, sinus jadi 1 | Menyambung ke Trigonometri, paling indah secara gambar |
| 4 | 2, mendekati | Definisi intinya |
| 5 | 9, kontinuitas | Menutup seluruh alur |
| 6 | 6, bentuk 0 dibagi 0 | Keterampilan yang paling sering dipakai di ujian |
| 7 | 7, tak hingga | Bagus, tapi widgetnya sudah cukup menjelaskan |
| cadangan | 3, dua arah | Hanya kalau waktunya benar-benar tersisa |

Resepnya tidak diubah sama sekali, sepuluh langkah di `PROGRESS.md` diikuti
apa adanya, termasuk **gerbang mutu tiga lapis** yang wajib.

---

## Perubahan pada kode

### Masalahnya sekarang

Tiga berkas mengunci diri ke Trigonometri:

| Berkas | Yang mengunci |
|---|---|
| `components/topik/Trigonometri.tsx` (638 baris) | mengimpor `@/content/trigonometri` dan kesepuluh widgetnya langsung |
| `components/latihan/ArenaLatihan.tsx` | mengimpor `KUIS` dari `@/content/trigonometri` |
| `app/topik/[slug]/page.tsx` | menulis `<Trigonometri />` secara langsung |

Menyalin ketiganya untuk Limit berarti tiap revisi tampilan dari ARYA
dikerjakan dua kali sekarang, dan enam kali kalau semua topik jadi. Sesi 3 saja
menghasilkan 22 revisi. Jadi menyalin bukan penghematan, itu utang.

### Bentuk setelah dirapikan

**Berkas baru:**

| Berkas | Isi |
|---|---|
| `web/content/tipe.ts` | Tipe `Blok`, `Tahap`, `SoalKuis` dipindah ke sini supaya dipakai bersama |
| `web/components/topik/HalamanTopik.tsx` | Rangka umum: daftar tahap, tab layar, penghitung waktu baca, kunci kuis, tombol Tonton dan Coba sendiri |
| `web/components/topik/PanggungTrigonometri.tsx` | Hanya penyetelan 10 widget trigonometri, dipindah dari berkas lama |
| `web/components/topik/PanggungLimit.tsx` | Penyetelan widget Limit |
| `web/content/limit/{tahap,latihan,kuis,index}.ts` | Isi topik Limit |
| `web/components/widget/limit/*.tsx` | Sembilan widget baru |
| `web/app/latihan/limit/page.tsx` | Halaman latihan Limit |

**Berkas yang diubah:**

- `app/topik/[slug]/page.tsx`: memilih isi dan panggung dari sebuah daftar topik,
  bukan menyebut Trigonometri langsung
- `components/latihan/ArenaLatihan.tsx`: menerima bank soal lewat properti
- `content/topik.ts`: Limit menjadi `siap: true`
- `content/trigonometri/tahap.ts`: tipe diambil dari `content/tipe.ts`

**Yang sengaja TIDAK diubah:** `lib/kemajuan.ts` dan `lib/latihan-kemajuan.ts`
sudah menyimpan per topik sejak awal, jadi tidak perlu disentuh. `Penjelasan.tsx`,
`Latihan.tsx`, dan `Kuis.tsx` sudah bebas topik.

### Syarat keberhasilan pemisahan

Trigonometri harus **tampil dan berperilaku persis sama** setelah dipisah.
Pembuktiannya wajib, bukan pilihan:

- `npx tsc --noEmit` dan `npx eslint .` bersih
- `npm run build` berhasil
- Playwright memotret halaman Trigonometri pada **zoom 100 persen dan 150 persen**,
  di layar lebar dan sempit, di mode terang dan gelap
- Kesepuluh tahap dibuka satu per satu, widgetnya hidup, tombol Tonton dan
  Coba sendiri terlihat pada semua tingkat zoom

Syarat terakhir itu lahir dari kesalahan nyata pada sesi 4, saat perbaikan
zoom pertama dilaporkan selesai padahal tombolnya hilang pada zoom 100 persen.

---

## Latihan dan kuis

Mengikuti bentuk Trigonometri persis:

- **Latihan di dalam halaman topik:** 4 soal pilihan ganda A sampai E dengan
  pembahasan bertahap
- **Bank kuis:** 32 soal di `content/limit/kuis.ts`, 8 soal diambil tiap sesi,
  menghindari soal yang sudah pernah keluar
- **Halaman `/latihan/limit`:** empat tingkat kesulitan, bar kemajuan, lencana

**Aturan yang tidak boleh dilanggar.** Soal buatan Claude cenderung terlalu
mudah, itu temuan ARYA dan bukan dugaan. Jadi **sebelum satu soal pun ditulis**,
halaman soal di buku Kemendikdasmen (Contoh Soal 2.1 sampai 2.2, Ayo Mencoba,
dan Latihan akhir bab) dibaca dulu untuk mengukur tingkat kesulitannya.
Soal salinan wajib menyebut sumber. Soal tanpa keterangan berarti tulisan sendiri.

Semua jawaban numerik diperiksa ulang dengan hitungan mesin, seperti yang
dilakukan pada bank 32 soal Trigonometri.

---

## Urutan pengerjaan

| Tahap kerja | Isi | Situs bisa ditunjukkan? |
|---|---|---|
| 1 | Pisahkan rangka, buktikan Trigonometri utuh | ya, tanpa perubahan terlihat |
| 2 | Materi 10 tahap Limit | ya, Limit sudah bisa dibaca |
| 3 | Sembilan widget Limit | ya, Limit sudah interaktif |
| 4 | Latihan dan bank kuis Limit | ya, **Limit lengkap** |
| 5 | Tujuh video, satu per satu, urut prioritas | ya, makin kaya tiap video |

Titik amannya ada di akhir tahap kerja 4. Setelah itu situsnya sudah utuh dan
layak ditunjukkan ke dosen walaupun belum ada satu pun video Limit.

---

## Risiko dan catatan terbuka

1. **Waktu.** Perkiraan 6 sampai 8 sesi kerja, sisa waktu 11 hari. Kalau
   meleset, yang dipotong adalah video dari prioritas paling bawah, bukan
   kelengkapan materi. Empat topik lain hampir pasti tetap kosong pada 12
   September, dan halamannya akan tetap jujur mengatakan "belum dibangun".
2. **Pemisahan rangka bisa merusak Trigonometri.** Ditangkal oleh daftar
   syarat keberhasilan di atas. Dikerjakan lebih dulu, sendirian, dan
   dibuktikan sebelum satu baris Limit ditulis.
3. **Sembilan widget baru adalah bagian terbesar yang belum pernah dicoba.**
   Widget Trigonometri semuanya berbasis segitiga dan lingkaran. Widget Limit
   berbasis grafik fungsi dan perbesaran, yang lebih rumit karena bingkainya
   harus menyesuaikan diri otomatis. Aturan proyek melarang widget memotong
   gambarnya sendiri, jadi tiap widget wajib punya penunjuk skala.
4. **Berat halaman.** Tujuh video Limit menambah kira-kira 30 MB lagi ke
   `web/public/anim/`. Digabung dengan Trigonometri yang sudah 30 MB, ini perlu
   dibicarakan sebelum deploy. Tawarkan pengompresan gambar dan video sebelum
   naik ke Vercel.
5. **Waktu review ARYA tetap leher botol.** Materi matematika wajib diperiksa
   ARYA, dan Limit lebih halus konsepnya daripada Trigonometri.
