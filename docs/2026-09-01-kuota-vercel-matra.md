# Kuota Vercel untuk MATRA: berapa lama paket gratis sanggup

**Tanggal:** 1 September 2026
**Dasar:** `Buku-Panduan-Kuota-Vercel-Prisma.pdf` (Edisi 1, Juli 2026) ditambah
pengukuran langsung terhadap situs MATRA yang sedang berjalan.

---

## Jawaban singkat

**Ya, jauh di bawah 1 juta request.** Dengan 100 siswa, MATRA memakai sekitar
**2,7 persen** jatah request dan **4,2 persen** jatah transfer data.

Yang akan habis lebih dulu **bukan** request, melainkan **transfer data**, dan
itu pun baru sekitar **2.400 siswa per bulan**.

**Prisma sama sekali tidak terpakai.** MATRA tidak punya database, tidak punya
login, dan tidak menyimpan apa pun di server. Seluruh jatah 100.000 operasi
Prisma tetap utuh, selamanya, selama aturan proyek "tanpa database" dipegang.

---

## Kenapa MATRA jauh lebih ringan daripada LENTERA HARUM

Buku panduan itu ditulis untuk LENTERA HARUM, dan kesimpulan besarnya adalah:

> Tagihan ditentukan oleh seberapa sering fungsi server dijalankan dan seberapa
> keras ia bekerja, bukan oleh seberapa besar data yang dikirim.

MATRA berada di ujung yang berlawanan. Perbandingannya:

| | LENTERA HARUM | MATRA |
|---|---|---|
| Halaman dimasak tiap dibuka? | Ya, 96 persen | **Tidak, semuanya sudah jadi** |
| Database | Prisma Postgres | **tidak ada** |
| Login | ada | **tidak ada** |
| Yang berat | kerja server | **berkas video** |
| Meteran yang mendesak | Fluid Active CPU 60 persen | **Fast Data Transfer** |

Seluruh halaman MATRA dicetak sekali saat deploy (SSG), lalu dilayani sebagai
berkas jadi. Artinya tiga meteran yang paling mendesak di LENTERA HARUM
(Active CPU, Function Invocations, Edge Request CPU) di MATRA praktis **nol**.

---

## Yang benar-benar diukur, bukan ditebak

Diambil dari situs yang sedang berjalan, 1 September 2026.

### Berat berkas

| Jenis | Jumlah | Ukuran |
|---|---|---|
| Video (.webm dan .mp4) | 11 berkas | **39,82 MB** |
| Gambar (.jpg dan .png) | 24 berkas | 2,92 MB |
| Subtitle, ikon, manifes | 16 berkas | 0,02 MB |
| **Total folder public** | | **42,76 MB** |
| Berkas tampilan (JS) | | 0,83 MB |

**Video adalah 93 persen berat situs ini.** Semua perhitungan di bawah
bergantung pada angka itu, dan hanya itu satu-satunya tuas yang berarti.

### Berat sekali kunjung

| Kejadian | Permintaan | Data |
|---|---|---|
| Membuka beranda | 29 | 442 KB |
| Membuka halaman topik | 26 | 164 KB |
| Berpindah 3 materi | 6 | 129 KB |
| Menonton satu video | 1 | sebesar videonya, 3 sampai 6 MB |

Angka ini diukur dalam mode pengembangan, yang berkas tampilannya **lebih
besar** daripada versi tayang. Jadi seluruh perkiraan di bawah **kelebihan**,
bukan kekurangan.

---

## Permisalan: 100 siswa dalam sebulan

Dua kebiasaan yang dipakai sebagai pembanding:

- **Siswa rajin**: menonton kedelapan video sampai habis, membuka semua materi,
  mengerjakan latihan dan kuis. Sekitar **42 MB** sebulan.
- **Siswa biasa**: menonton tiga video, membaca beberapa materi. Sekitar
  **16 MB** sebulan.

Perhitungan di bawah memakai **siswa rajin**, jadi ini keadaan terburuk.

| Meteran Vercel | Jatah gratis | Terpakai 100 siswa | Persen |
|---|---|---|---|
| **Fast Data Transfer** | 100 GB | **4,2 GB** | **4,2%** |
| **Edge Requests** | 1 juta | **27.000** | **2,7%** |
| Fast Origin Transfer | 10 GB | ± 0,9 GB | 9% |
| Function Invocations | 1 juta | mendekati 0 | ± 0% |
| Fluid Active CPU | 4 jam | mendekati 0 | ± 0% |
| Fluid Provisioned Memory | 360 GB-jam | mendekati 0 | ± 0% |
| Edge Request CPU Duration | 1 jam | mendekati 0 | ± 0% |
| ISR Reads | 1 juta | 0 | 0% |
| **Operasi Prisma** | 100.000 | **0** | **0%** |

Catatan soal Fast Origin Transfer: berkas video hanya ditarik dari asal sekali
untuk tiap wilayah jaringan Vercel, bukan sekali untuk tiap siswa. Karena itu
angkanya tetap, tidak ikut naik saat siswanya bertambah.

---

## Sampai berapa siswa paket gratis ini sanggup

| Meteran | Batas | Muat berapa siswa rajin |
|---|---|---|
| Fast Data Transfer | 100 GB | **± 2.400** |
| Edge Requests | 1 juta | ± 3.700 |
| Fast Origin Transfer | 10 GB | tidak pernah jadi penghalang |

**Yang habis lebih dulu adalah transfer data, di sekitar 2.400 siswa rajin per
bulan.** Kalau kebiasaannya "siswa biasa", angkanya naik ke sekitar 6.200.

Untuk gambaran: satu kelas 30 siswa memakai sekitar **1,3 persen**. Satu
sekolah 500 siswa memakai sekitar **21 persen**. Masih aman.

---

## Yang berubah kalau videonya bertambah

Ini bagian yang perlu diperhatikan, sebab video adalah 93 persen beratnya.

| Keadaan | Video | Per siswa rajin | Muat berapa siswa |
|---|---|---|---|
| Sekarang (8 video) | 36 MB | 42 MB | ± 2.400 |
| Setelah 6 video Limit | 66 MB | 72 MB | **± 1.400** |
| Kalau keenam topik lengkap, ± 42 video | 210 MB | 215 MB | **± 465** |

**Jadi masalahnya bukan sekarang, melainkan nanti.** Saat keenam topik lengkap,
paket gratis hanya sanggup sekitar 465 siswa rajin per bulan, dan angka itu
mulai terasa untuk sebuah sekolah.

---

## Yang bisa dilakukan, urut dari yang paling menguntungkan

1. **Kompres video sebelum deploy.** Ini satu-satunya tuas yang berarti.
   Menurunkan dari 1080p60 ke 1080p30 memangkas sekitar 40 persen; ke 720p30
   memangkas sekitar 65 persen. Pada panel video di halaman materi, bedanya
   nyaris tidak terlihat. Kalau dilakukan, daya tampungnya naik dua sampai tiga
   kali lipat.
2. **Aturan `immutable` sudah terpasang dan sudah benar.** `next.config.ts`
   menandai `/anim/`, `/gambar/`, dan `/merek/` berlaku setahun, jadi siswa yang
   berkunjung ulang tidak mengunduh apa pun lagi. Ini sudah menghemat sangat
   banyak dan tidak perlu diapa-apakan.
   **Konsekuensinya: kalau isi video diganti, NAMA BERKASNYA wajib ikut diganti.**
   Kalau tidak, peramban siswa memutar video lama sampai setahun.
3. **Buang berkas yatim.** `web/public/anim/trigonometri.webm` (0,54 MB) tidak
   dipakai kode mana pun. Ia tidak memakan transfer, tapi memberatkan deploy.
4. **Jangan menambahkan database.** Aturan proyek "tanpa database" bukan cuma
   menghemat waktu pengerjaan; ia yang membuat seluruh meteran mahal di Vercel
   tetap kosong. Menambah login saja akan mengubah situs dari "berkas jadi"
   menjadi "dimasak tiap dibuka", persis keadaan yang membuat LENTERA HARUM
   memakai 60 persen jatah CPU-nya.

---

## Yang perlu Anda pastikan sendiri

1. **Paket Hobby Vercel hanya untuk penggunaan bukan komersial.** MATRA sebagai
   tugas kuliah yang ditunjukkan ke dosen jelas masuk. Kalau nanti dipakai
   sekolah secara resmi atau menghasilkan uang, paketnya harus diganti.
2. **Apa yang terjadi kalau jatahnya habis** tidak dijelaskan dalam buku
   panduan itu selain kalimat umum di pembukanya: "kalau habis, aplikasi bisa
   melambat, berhenti, atau menagih biaya". Sebaiknya Anda periksa sendiri
   setelan Spend Management di dasbor Vercel sebelum situs dipakai orang banyak,
   supaya jelas apakah situsnya dihentikan atau ditagih.
3. **Angka di sini foto keadaan 1 September 2026.** Begitu video bertambah,
   hitunglah ulang dengan cara yang sama: jumlahkan isi `web/public/`, lalu bagi
   100 GB dengan berat per siswa.
