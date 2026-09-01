# Grafik Fungsi: Alur Belajar 12 Tahap (topik ketiga MATRA)

**Tanggal:** 1 September 2026 - **Sesi:** MATRA-GRAFIK-FUNGSI (cabang `sesi/grafik-fungsi`)
**Menyusul:** `2026-08-31-trigonometri-alur-belajar.md` dan `2026-09-01-limit-alur-belajar.md`
**Gelombang 1:** halaman saja. Tanpa video.

---

## Keputusan ARYA (1 September 2026, gerbang rancangan)

| Pertanyaan | Jawaban ARYA |
|---|---|
| Fungsi rasional dan nilai mutlak yang tidak ada di buku kurikulum | **Tetap dimasukkan**, masing-masing dapat tahap sendiri, dengan pengingat untuk mempelajari Limit kalau materinya bersinggungan |
| Pintu masuk tahap 1 | **Baca grafik nyata dulu**, tanpa satu pun rumus |
| Sumber kalibrasi soal | **Buku Kemendikdasmen dulu**, soal mathcyber1997 ditambahkan ARYA menyusul |

Akibat keputusan pertama: jumlah tahap naik dari 10 menjadi **12**, dan jumlah
widget naik menjadi **11 ditambah satu galeri**. Ini batch widget terbesar
sejauh ini (Trigonometri 10, Limit 9). Risikonya dicatat di bagian terakhir.

---

## Apa yang benar-benar ada di kurikulum, dan apa yang tidak

Diperiksa langsung ke berkasnya, bukan dari ingatan.

| Bahan | Buku Kelas 10 Guru | Buku Kelas 11 Guru |
|---|---|---|
| Fungsi kuadrat | ada, **Bab 6**, halaman cetak 168 sampai 197 | dipakai ulang di Bab 1 |
| Fungsi eksponen | ada, **Bab 1A.3**, halaman cetak 24 sampai 33 | tidak ada |
| Logaritma | ada, **Bab 1B**, halaman cetak 39 dan seterusnya | tidak ada |
| Fungsi, komposisi, invers | tidak ada | ada, **Bab 1**, halaman cetak 21 sampai 64 |
| Fungsi rasional | **nol halaman** | **nol halaman** |
| Asimtot | **nol halaman** | **nol halaman** |
| Nilai mutlak sebagai fungsi | hanya muncul di soal peluang, tidak diajarkan | **nol halaman** |

Sebaliknya, capaian pembelajaran resmi Fase F yang dikutip buku Kelas 11
halaman cetak 14 berbunyi:

> "Di akhir fase F, siswa dapat menentukan fungsi invers, komposisi fungsi dan
> **transformasi fungsi** untuk memodelkan situasi dunia nyata berdasarkan
> fungsi yang sesuai (linear, kuadrat, eksponensial)."

Jadi transformasi memang tujuan resminya, dan tiga jenis fungsi itulah yang
disebut namanya. Nilai mutlak dan fungsi rasional **berada di luar** capaian
itu. ARYA sudah diberi tahu dan tetap memilih memasukkannya, dengan alasan
keduanya sering ditemui siswa di luar bab wajib. Keputusan diterima.

Konsekuensinya ditangani begini, bukan diabaikan:

- Tahap 7 (nilai mutlak) dan tahap 10 (fungsi rasional) **diberi label jujur**
  di badan teksnya bahwa keduanya perluasan di luar bab wajib, bukan bahan
  yang pasti keluar di ulangan sekolah.
- Tahap 10 memuat **kotak pengingat** yang menunjuk Limit materi 07 untuk
  perilaku menuju tak hingga, sesuai permintaan ARYA. Di gelombang 1 kotak itu
  masih teks biasa, belum bisa diklik (lihat "Butuh MASTER").

### Istilah mengikuti buku, bukan karangan sendiri

Dua hal yang sudah diverifikasi dan wajib dipakai:

1. Buku Kelas 10 halaman cetak 185 menyebut **tiga bentuk** fungsi kuadrat
   sekaligus, lengkap dengan koordinat puncaknya:
   - bentuk umum `y = ax^2 + bx + c`, puncak `(-b/2a, -D/4a)`
   - **bentuk puncak** `y = a(x - h)^2 + k`, puncak `(h, k)`
   - **bentuk faktor** `y = a(x - p)(x - q)`, absis puncak `(p + q)/2`
2. Buku Kelas 11 halaman cetak 57 memakai kata **"pencerminan"** untuk grafik
   fungsi invers, dan **"fungsi satu-satu"** untuk syaratnya. Bukan cuma
   "bijektif". Kata "satu-satu" yang dipakai ke siswa.

---

## Kenapa Grafik Fungsi disusun begini

Salah paham yang dilawan sudah tertulis di `content/topik.ts`:

> *"setiap grafik pasti sebuah fungsi."*

dan pertanyaan pembukanya:

> *"Kenapa bentuk grafik berubah saat satu angka digeser?"*

Dua kalimat itu menentukan benang merahnya:

> **Grafik itu potret sebuah aturan. Ubah sedikit aturannya, gambarnya bergeser
> dengan cara yang bisa ditebak.**

Kebiasaan yang dilawan: siswa menghafal bentuk tiap jenis grafik satu per satu,
seolah parabola, eksponen, dan logaritma adalah tiga hafalan terpisah. Padahal
begitu aturan geser, cermin, dan regang dipahami sekali (tahap 6), tahap-tahap
lainnya tinggal penerapan. Karena itu tahap 6 sengaja ditaruh di tengah,
sebagai poros: lima tahap sebelumnya membangun bahan, lima tahap sesudahnya
memanennya.

Sama seperti dua topik sebelumnya: **masalah dulu, rumus belakangan.**

---

## Batas wilayah dengan topik lain

| Bahan | Pemilik | Yang boleh dilakukan di sini |
|---|---|---|
| Grafik sin, cos, tan | Trigonometri tahap 8 dan 9 | Sebut sekilas sebagai contoh di tahap 6, lalu **rujuk**. Jangan gambar ulang, jangan ajarkan pembentukannya |
| Asimtot dan perilaku menuju tak hingga | Limit materi 07 | Tahap 8 dan 10 memakai kata asimtot dan menunjukkan gambarnya, tetapi **alasan formalnya dirujuk ke Limit**, tidak diturunkan dari nol |
| Kekontinuan, lubang pada grafik | Limit materi 04 dan 09 | Tidak disinggung sama sekali |

---

## Alur 12 tahap

Bentuk datanya sama persis dengan Trigonometri dan Limit, jadi **tidak ada tipe
baru**: `no`, `slug`, `judul`, `pertanyaan`, `labelPendek`, `penjelasan`
(kumpulan blok), `seringKeliru`, `intisari`, `widget`, `video`, `siap`.

---

### Tahap 1: Grafik itu bercerita

**Pertanyaan:** Apa yang sebenarnya diceritakan sebuah grafik?

**Isi pokok.** Tanpa satu pun rumus. Sebuah grafik perjalanan motor
(jarak terhadap waktu) dibaca sepotong demi sepotong: bagian yang menanjak
berarti maju, bagian mendatar berarti berhenti, bagian yang menurun berarti
kembali. Lalu diperkenalkan hal yang dibaca orang dari grafik apa pun:
naik atau turun, titik tertinggi dan terendah, tempat memotong sumbu, dan
seberapa curam.

Ditegaskan bahwa sumbu mendatar dan sumbu tegak **bukan gambar peta**. Grafik
jarak terhadap waktu yang menanjak tidak berarti motornya mendaki bukit.
Ini kekeliruan membaca yang sangat umum dan jarang diluruskan.

**Widget `pembaca-grafik`.** Penunjuk yang bisa diseret sepanjang sumbu waktu.
Di setiap posisi, keterangan di sampingnya berganti mengikuti bagian kurva yang
sedang dilewati, dan angka jarak serta waktunya terbaca. Tidak ada rumus di
layar sama sekali.

**Sering keliru:** *"grafik yang naik berarti benda itu naik ke atas."*
Ditaruh di bawah. Jawabannya: yang naik adalah nilai pada sumbu tegak, dan di
grafik ini sumbu tegak berisi jarak, bukan ketinggian.

---

### Tahap 2: Potret sebuah aturan, dan uji garis tegak

**Pertanyaan:** Setiap gambar di bidang koordinat itu grafik fungsi, bukan?

**Isi pokok.** Dua bagian.

Pertama, **dari aturan menjadi gambar**. Fungsi itu mesin: masukkan `x`, keluar
tepat satu `y`. Titik `(x, f(x))` diplot satu per satu, dan kumpulan titiknya
membentuk kurva. Grafik bukan bentuk yang dihafal, melainkan jejak dari
menjalankan aturan itu berkali-kali.

Kedua, **uji garis tegak**. Karena satu masukan hanya boleh punya satu
keluaran, garis tegak mana pun hanya boleh memotong grafik paling banyak sekali.
Lingkaran gagal uji ini, jadi lingkaran **bukan** grafik fungsi. Parabola
terbuka ke samping juga gagal.

Di sini juga diperkenalkan **domain** (daftar `x` yang boleh dimasukkan) dan
**range** (daftar `y` yang mungkin keluar), dibaca langsung dari gambarnya,
bukan dihitung.

**Widget `uji-garis-tegak`.** Lima gambar bergantian: garis lurus, parabola,
lingkaran, parabola tidur, dan grafik tangga. Siswa menyeret garis tegak ke
kiri dan ke kanan. Penghitung titik potong berjalan hidup, dan vonis
"fungsi" atau "bukan fungsi" muncul begitu ada garis yang memotong dua kali.

**Sering keliru:** *"lingkaran itu fungsi karena rumusnya ada."*
Jawabannya: punya rumus bukan syaratnya. Syaratnya satu masukan satu keluaran,
dan `x = 0` pada lingkaran satuan memberi dua jawaban sekaligus.

---

### Tahap 3: Parabola dan bentuk puncak

**Pertanyaan:** Kenapa satu angka bisa memindahkan seluruh parabola?

**Isi pokok.** Bentuk puncak diperkenalkan **lebih dulu** daripada bentuk umum,
karena isinya bisa dibaca langsung tanpa dihitung:

    y = a(x - h)^2 + k

- `h` menggeser ke kanan atau ke kiri, `k` menggeser ke atas atau ke bawah,
  sehingga puncaknya persis di `(h, k)`
- `a` menentukan arah bukaan (ke atas kalau positif, ke bawah kalau negatif)
  dan lebar sempitnya
- garis tegak `x = h` adalah sumbu simetrinya

Peran `a` sebagai penentu arah bukaan diambil dari Eksplorasi 6.3 buku Kelas 10
halaman cetak 173 dan 174. Peran `a` sebagai penentu lebar diambil dari Kunci
Jawaban Latihan 6.1 halaman cetak 175.

Jebakan tanda diberi ruang tersendiri: `(x - 3)^2` bergeser ke **kanan** 3, bukan
ke kiri. Alasannya dijelaskan, tidak cuma disuruh hafal: untuk mendapat nol di
dalam kurung, `x` harus bernilai 3, jadi titik terendahnya pindah ke sana.

**Widget `bentuk-puncak`.** Tiga penggeser `a`, `h`, `k`. Kurva sebelumnya
tertinggal sebagai bayangan pucat sehingga perpindahannya terlihat, bukan cuma
hasil akhirnya. Puncak dan sumbu simetri ikut bergerak dan tetap berlabel.

**Sering keliru:** *"tanda minus di dalam kurung berarti geser ke kiri."*
Ditaruh di bawah, setelah widgetnya dicoba.

---

### Tahap 4: Bentuk umum dan diskriminan

**Pertanyaan:** Kalau rumusnya ditulis `ax^2 + bx + c`, puncaknya di mana?

**Isi pokok.** Bentuk umum `y = ax^2 + bx + c` adalah bentuk puncak yang
kurungnya sudah dijabarkan. Dua jalan pulang:

- **sumbu simetri** `x = -b/2a`, lalu ordinatnya didapat dengan mensubstitusi
  nilai itu (cara yang dipakai buku halaman cetak 184)
- **melengkapkan kuadrat**, yang mengembalikan bentuk puncak apa adanya

Peran `c` juga dibaca langsung: grafiknya memotong sumbu `y` di `(0, c)`
(Eksplorasi 6.4, halaman cetak 175).

Lalu **diskriminan** `D = b^2 - 4ac` sebagai penentu berapa kali grafik memotong
sumbu `x`, mengikuti tabel buku halaman cetak 178:

| D | banyak akar | banyak titik potong dengan sumbu x |
|---|---|---|
| `D > 0` | dua akar berbeda | dua |
| `D = 0` | dua akar kembar | satu, menyinggung |
| `D < 0` | tidak ada akar real | nol |

**Widget `wajah-parabola`.** Satu parabola, dua tulisan berdampingan: bentuk
umum di kiri, bentuk puncak di kanan. Menekan tombol memainkan langkah
melengkapkan kuadrat satu per satu, dan setiap langkah aljabar disorot bersama
bagian grafik yang dijelaskannya. Nilai `D` ditampilkan dan berganti warna
mengikuti tandanya, sementara titik potong dengan sumbu `x` muncul atau hilang.

**Sering keliru:** *"D negatif berarti tidak ada grafiknya."*
Jawabannya: grafiknya tetap ada dan tetap parabola utuh. Yang tidak ada adalah
titik potongnya dengan sumbu `x`, karena seluruh parabola melayang di satu sisi.

---

### Tahap 5: Bentuk faktor, dan menyusun rumus dari grafiknya

**Pertanyaan:** Kalau yang diketahui gambarnya, bagaimana menemukan rumusnya?

**Isi pokok.** Arah kebalikan, dan ini yang dipakai di soal cerita.
Bentuk ketiga diperkenalkan:

    y = a(x - p)(x - q)

dengan `p` dan `q` titik potongnya dengan sumbu `x`, dan sumbu simetrinya tepat
di tengah keduanya. Tiga cara menyusun, persis daftar buku halaman cetak 187:

1. diketahui **tiga titik** sembarang, dipecahkan sebagai sistem persamaan
2. diketahui **dua titik potong sumbu x** dan satu titik lain, pakai bentuk faktor
3. diketahui **puncak** dan satu titik lain, pakai bentuk puncak

Contoh yang dipakai mengikuti Latihan 6.5 nomor 2 halaman cetak 186: puncak
`(2, 8)` dan melalui `(0, 4)`, jawabannya `y = -(x - 2)^2 + 8`.

Ditutup dengan kalimat sorot: satu parabola, tiga cara menuliskannya, dan
ketiganya benar. Yang dipilih adalah yang paling cocok dengan apa yang diketahui.

**Widget `susun-parabola`.** Siswa **menyeret langsung** titik puncak dan satu
titik lain di bidang koordinat. Parabola menyesuaikan seketika, dan ketiga
bentuk rumusnya ditulis serentak di samping, ikut berubah angka demi angka.

**Sering keliru:** *"kalau titik potongnya minus 2 dan 3, rumusnya
`(x + 2)(x + 3)`."* Jawabannya: yang dikurangkan adalah akarnya, jadi
`(x + 2)(x - 3)`. Dicek dengan memasukkan `x = 3`, hasilnya harus nol.

---

### Tahap 6: Geser, cermin, regang. Berlaku untuk semua fungsi

**Pertanyaan:** Apakah aturan geser tadi cuma berlaku untuk parabola?

**Isi pokok.** Poros seluruh topik. Yang di tahap 3 terlihat seperti sifat
khusus parabola ternyata berlaku untuk fungsi apa pun.

| Tulisan | Yang terjadi |
|---|---|
| `f(x) + k` | seluruh grafik naik `k` |
| `f(x - h)` | seluruh grafik geser ke kanan `h` |
| `-f(x)` | dicerminkan terhadap sumbu `x`, terbalik atas bawah |
| `f(-x)` | dicerminkan terhadap sumbu `y`, terbalik kiri kanan |
| `a f(x)` | diregangkan tegak `a` kali |
| `f(bx)` | diregangkan mendatar `1/b` kali, **kebalikannya** |

Aturan kuncinya satu kalimat, dan ini kalimat sorotnya:

> **Angka yang ada di luar kurung mengerjakan apa yang tertulis. Angka yang
> masuk ke dalam kurung mengerjakan kebalikannya.**

Alasannya dijelaskan, bukan disuruh hafal: yang di dalam kurung mengubah
**masukannya**, jadi untuk mendapat keluaran yang sama, `x` harus dipilih lain.

Contoh dijalankan pada tiga fungsi dasar sekaligus supaya terlihat aturannya
sama: parabola, akar, dan grafik sinus. **Grafik sinus hanya dipakai sebagai
contoh, tidak diajarkan di sini.** Pembentukannya ada di Trigonometri tahap 8,
dan tahap ini menyebutkan itu.

**Widget `papan-transformasi`.** Siswa memilih satu fungsi dasar, lalu menekan
tombol transformasi satu per satu. Grafik bergerak dengan animasi, bukan
melompat, dan bentuk aslinya tertinggal sebagai bayangan. Tulisan rumusnya ikut
tersusun mengikuti tombol yang sudah ditekan, sehingga siswa melihat urutan
operasinya, bukan cuma hasilnya.

**Sering keliru:** *"`f(2x)` berarti grafiknya jadi dua kali lebih lebar."*
Jawabannya: justru **setengahnya**, karena `x` sudah dikalikan dua sebelum
masuk mesin, sehingga mesinnya sampai di nilai yang sama pada `x` yang separuh.

---

### Tahap 7: Nilai mutlak, atau cara melipat grafik

**Pertanyaan:** Apa yang terjadi kalau bagian grafik yang di bawah sumbu dipaksa
naik ke atas?

**Catatan kejujuran.** Di badan teksnya disebutkan terang-terangan bahwa fungsi
nilai mutlak **bukan bab wajib** di Kurikulum Merdeka Kelas 10 dan 11, tetapi
sering muncul di soal seleksi dan di bimbel. Jadi siswa tahu status bahan ini.

**Isi pokok.** Nilai mutlak sebagai jarak dari nol, sehingga selalu nol atau
positif. Lalu dua hal yang **berbeda** dan sering dikira sama:

- `y = |f(x)|` melipat bagian yang di **bawah** sumbu `x` ke atas
- `y = f(|x|)` membuang bagian **kiri**, lalu menyalin bagian kanan sebagai
  cerminnya

Grafik `y = |x|` sendiri sebagai bentuk V, dan `y = a|x - h| + k` sebagai
penerapan langsung aturan tahap 6, jadi tidak ada hafalan baru.

**Widget `lipat-mutlak`.** Satu grafik, dua tombol. Menekan tombolnya
memainkan animasi lipatan yang benar-benar melipat, sehingga bedanya terlihat,
bukan cuma diceritakan. Bentuk aslinya tetap membayang.

**Sering keliru:** *"`|f(x)|` dan `f(|x|)` itu sama saja, sama-sama jadi positif."*
Ditaruh di bawah dengan satu contoh tandingan: pada `f(x) = x - 2`, di `x = -1`
yang pertama memberi 3 dan yang kedua memberi -1.

---

### Tahap 8: Eksponen, tumbuh dan meluruh

**Pertanyaan:** Kenapa sesuatu yang mulanya pelan bisa tiba-tiba meledak?

**Isi pokok.** Fungsi eksponen `y = a b^x`. Bedanya dengan fungsi linear dan
kuadrat ditunjukkan lewat perbandingan, mengikuti buku Kelas 10 halaman cetak
27 yang memang menyandingkan `f(x) = 2x`, `f(x) = x^2`, dan `f(x) = 2^x`.

- Fungsi linear **menambah** dengan jumlah yang sama tiap langkah.
- Fungsi eksponen **mengalikan** dengan angka yang sama tiap langkah.

Dua wajahnya:
- **pertumbuhan** kalau `b > 1`, contohnya penularan virus tiga kali lipat tiap
  fase (Eksplorasi 1.3, halaman cetak 24 dan 25)
- **peluruhan** kalau `0 < b < 1`, contohnya dosis obat yang berkurang tiap jam
  dan bola basket yang tinggi pantulnya menyusut (halaman cetak 30 sampai 33)

Grafiknya tidak pernah menyentuh sumbu `x`, dan itulah asimtot datar pertama
yang ditemui siswa. **Disebut namanya, tidak diajarkan alasannya**, dan
dirujuk ke Limit materi 07 lewat kotak pengingat.

**Widget `balapan-tumbuh`.** Tiga kurva pada satu sumbu: linear, kuadrat, dan
eksponen, dijalankan bersama sebagai balapan. Tampilannya diperkecil otomatis
supaya tidak ada kurva yang keluar bingkai, dan penunjuk skala memberi tahu
seberapa jauh sudah dizoom keluar. Tabel di sampingnya menunjukkan pada langkah
ke berapa eksponen menyalip kuadrat.

**Sering keliru:** *"`2^x` dan `x^2` itu mirip, sama-sama pangkat."*
Jawabannya: yang berubah pada `x^2` adalah yang dipangkatkan, pada `2^x` yang
berubah adalah pangkatnya. Di `x = 10` selisihnya sudah 100 lawan 1.024.

---

### Tahap 9: Logaritma itu eksponen yang dicerminkan

**Pertanyaan:** Kalau `2^x = 10`, `x` nya berapa?

**Isi pokok.** Logaritma sebagai pertanyaan kebalikan dari eksponen: bukan
"berapa hasilnya", melainkan "berapa pangkatnya". Karena itu grafik logaritma
adalah grafik eksponen yang **dicerminkan terhadap garis `y = x`**.

Yang langsung terbaca dari pencerminan itu, tanpa dihafal terpisah:

- domainnya hanya `x > 0`, karena range eksponen hanya positif
- asimtot datarnya berubah menjadi asimtot tegak, karena sumbunya ikut bertukar
- grafiknya selalu lewat `(1, 0)`, karena eksponen selalu lewat `(0, 1)`
- naiknya sangat lambat, karena eksponen naiknya sangat cepat

Di sini kata **pencerminan** dipakai pertama kali, dan tahap 11 nanti memberi
nama resminya: fungsi invers. Sengaja dilihat dulu, dinamai belakangan, sama
seperti Limit tahap 5 yang janjinya baru dilunasi di tahap 9.

**Widget `cermin-yx`.** Garis `y = x` digambar sebagai garis putus putus.
Grafik eksponen dilipat ke seberang garis itu dengan animasi, dan berhenti
sebagai grafik logaritma. Titik `(0, 1)` dan `(1, 0)` diberi label supaya
pertukarannya terlihat sebagai pertukaran koordinat, bukan sulap.

**Sering keliru:** *"log dari bilangan negatif itu negatif."*
Jawabannya: tidak ada hasilnya sama sekali. Tidak ada pangkat yang membuat
bilangan positif menjadi negatif.

---

### Tahap 10: Fungsi rasional dan asimtotnya

**Pertanyaan:** Kenapa ada grafik yang seperti terbelah dua dan menempel pada
garis tanpa pernah menyentuhnya?

**Catatan kejujuran.** Sama seperti tahap 7, disebutkan terang-terangan bahwa
fungsi rasional **bukan bab wajib** Kelas 10 dan 11. Dimasukkan atas permintaan
ARYA karena sering muncul di soal seleksi.

**Isi pokok.** Fungsi rasional sebagai pecahan yang pembilang dan penyebutnya
berupa fungsi. Grafik dasarnya `y = 1/x`.

- **Asimtot tegak** terjadi di tempat penyebutnya nol, karena di situ fungsinya
  tidak punya nilai sama sekali.
- **Asimtot datar** terlihat saat `x` dibuat sangat besar.

Lalu penerapan langsung tahap 6: `y = 1/(x - 2) + 3` bukan bentuk baru, melainkan
`1/x` yang digeser 2 ke kanan dan 3 ke atas, sehingga asimtotnya ikut pindah ke
`x = 2` dan `y = 3`. Ini yang membuat tahap ini murah, karena aturannya sudah
dipelajari di tahap 6.

**Kotak pengingat, permintaan ARYA:** kenapa kurvanya makin dekat tanpa pernah
menyentuh, dan kenapa perilakunya di tak hingga bisa dihitung, dijawab di topik
**Limit materi 07**. Di sini cukup dilihat gambarnya.

**Widget `asimtot-rasional`.** Dua penggeser untuk memindahkan `1/x`. Kedua
garis asimtot digambar putus putus dan ikut bergeser. Kurvanya **diputus** di
asimtot, tidak disambung sebagai garis miring raksasa. Fungsi pemutus jalur ini
sudah ada dan sudah terbukti di `koordinat.ts` milik Limit, dan disalin ke
folder topik ini.

**Sering keliru:** *"grafiknya menyentuh asimtot di kejauhan."*
Jawabannya: tidak pernah. Yang terjadi adalah jaraknya mengecil terus. Pada
`y = 1/x`, di `x` sama dengan sejuta, nilainya masih 0,000001, tetap bukan nol.

---

### Tahap 11: Dua mesin dirangkai, dan mesin yang membatalkan

**Pertanyaan:** Kalau keluaran satu mesin dimasukkan ke mesin lain, hasilnya
mesin apa?

**Isi pokok.** Dua bagian, keduanya dari buku Kelas 11 Bab 1.

**Komposisi** `(f o g)(x) = f(g(x))`. Yang paling sering salah adalah urutannya:
yang dikerjakan lebih dulu adalah yang **paling dekat dengan x**, yaitu `g`.
Ditunjukkan bahwa `f o g` dan `g o f` umumnya **berbeda**, dengan satu contoh
tandingan yang dihitung penuh.

**Invers** sebagai mesin yang mengembalikan masukan aslinya. Di sini
pencerminan dari tahap 9 diberi nama resminya: grafik fungsi invers adalah
grafik fungsi aslinya yang dicerminkan terhadap `y = x` (buku Kelas 11 halaman
cetak 57).

Syaratnya: fungsinya harus **satu-satu**, dan itu diperiksa dengan **uji garis
mendatar**, sepasang dengan uji garis tegak di tahap 2. Karena itu `y = x^2`
untuk semua bilangan tidak punya invers, kecuali domainnya dibatasi.

Ditutup dengan penutupan lingkaran seluruh topik: logaritma di tahap 9 adalah
invers dari eksponen di tahap 8, dan pencerminan yang dilihat di sana barusan
diberi namanya.

**Widget `dua-mesin`.** Dua kotak mesin berderet, angka mengalir dari kiri ke
kanan lewat keduanya, dan hasilnya diplot sebagai satu titik pada grafik
komposisinya. Satu tombol menukar urutan mesin sehingga bedanya terlihat.
Tombol kedua membalik arah aliran untuk memperlihatkan invers, disertai
pencerminan grafiknya terhadap `y = x`.

**Sering keliru:** *"lambang pangkat minus satu itu artinya satu per fungsinya."*
Jawabannya: bukan. Di sini artinya "mesin kebalikannya", bukan pecahan. Pada
`f(x) = x + 3`, inversnya `x - 3`, bukan `1/(x + 3)`.

---

### Tahap 12: Dipakai di dunia nyata

Galeri, tidak interaktif, mengikuti bentuk tahap 10 Trigonometri dan materi 10
Limit.

Enam contoh, satu untuk tiap jenis fungsi yang dipelajari:

| Jenis | Contoh |
|---|---|
| Kuadrat | lintasan bola basket dan kabel jembatan gantung (keduanya contoh buku Kelas 10 halaman cetak 168 dan 177) |
| Kuadrat | antena parabola dan lampu sorot, karena bentuk itu mengumpulkan sinar ke satu titik |
| Eksponen tumbuh | bunga majemuk dan penyebaran informasi |
| Eksponen luruh | dosis obat dalam darah dan penanggalan karbon |
| Logaritma | skala Richter, desibel, dan pH, ketiganya memampatkan angka raksasa |
| Rasional | waktu tempuh terhadap kecepatan, yang tidak pernah nol |

Sumber gambar dicatat di `web/public/gambar/sumber.json`, mengikuti cara yang
sudah dipakai dua topik sebelumnya.

**Keputusan ARYA, 1 September 2026: foto saja, tanpa lapisan gambar di atasnya.**

ARYA sebenarnya menginginkan bentuk campur (foto dengan kurva digambar
menimpanya), tetapi bentuk itu sudah pernah dicoba di tahap 10 Trigonometri dan
gagal dua kali. Sebabnya ditelusuri ke kodenya, bukan ditebak, dan ada tiga:

1. **Sebagian besar contohnya mati.** Dari empat kartu, hanya satu yang punya
   penggeser dan lapisan gambar. Tiga sisanya tidak melakukan apa pun saat
   disentuh, sehingga ARYA melaporkan "interaktifnya tidak bekerja". Laporannya
   tepat.
2. **Fotonya harus dipotong.** Bingkainya bertinggi tetap, jadi fotonya dipasang
   dengan `object-fit: cover` dan terpangkas. Itu melanggar aturan proyek yang
   melarang widget memotong gambarnya sendiri.
3. **Lapisan gambarnya melar, jadi salah secara geometri.** SVG di atas foto
   memakai `preserveAspectRatio="none"`, sehingga sudut dan lingkarannya ditarik
   mengikuti bentuk kotak foto. Sudut yang ditulis 45 derajat tidak lagi tampil
   45 derajat. Cacat ini tidak pernah disebut waktu itu.

Akar masalahnya satu kalimat: lapisan gambar dipaku ke bingkai foto yang
perbandingan sisinya dipaksa, sehingga fotonya terpotong dan gambarnya melar
pada saat bersamaan.

### Aturan yang lahir dari kegagalan itu, berlaku untuk KESEBELAS widget

Bukan cuma untuk galeri:

- **Tidak boleh ada bagian yang mati.** Kalau sebuah widget punya beberapa
  contoh atau beberapa tombol, semuanya harus melakukan sesuatu. Satu tombol
  yang diam membuat seluruh widget terasa rusak.
- **Yang bisa disentuh harus terlihat bisa disentuh.** Titik yang bisa diseret
  diberi bentuk dan warna yang membedakannya dari titik biasa, dan tetap
  terlihat saat sedang diseret.
- **Tidak ada yang tertindih.** Label, angka, dan garis tidak boleh saling
  menutupi. Kalau ruangnya kurang, yang mengalah adalah tata letaknya, bukan
  ukuran hurufnya.
- **Tidak ada gambar yang dipaksa melar.** Perbandingan sisi bidang gambar tidak
  boleh diregangkan. `preserveAspectRatio="none"` dilarang di topik ini.

---

## Ringkasan widget

Sebelas widget ditambah satu galeri. Angka itu lebih besar daripada Limit (9)
dan Trigonometri (10), tetapi mesin gambarnya **tidak** sebelas macam:

| Mesin bersama | Dipakai widget |
|---|---|
| Mesin parabola (tiga bentuk, puncak, akar, diskriminan) | 3, 4, 5 |
| Mesin transformasi (animasi geser, cermin, regang, bayangan) | 6, 7, 9 |
| Mesin pencerminan terhadap `y = x` | 9, 11 |
| Penggambar kurva biasa dengan jalur yang diputus | 1, 2, 8, 10 |

| # | Widget | Yang bisa dilakukan siswa |
|---|---|---|
| 1 | `pembaca-grafik` | seret penunjuk, cerita berganti |
| 2 | `uji-garis-tegak` | seret garis tegak melintasi lima gambar |
| 3 | `bentuk-puncak` | tiga penggeser, kurva lama membayang |
| 4 | `wajah-parabola` | jalankan melengkapkan kuadrat langkah demi langkah |
| 5 | `susun-parabola` | **seret titik langsung**, rumus ikut berubah |
| 6 | `papan-transformasi` | tekan tombol transformasi, grafik beranimasi |
| 7 | `lipat-mutlak` | lipat grafik dua cara yang berbeda |
| 8 | `balapan-tumbuh` | jalankan balapan tiga kurva |
| 9 | `cermin-yx` | lipat eksponen jadi logaritma |
| 10 | `asimtot-rasional` | geser `1/x`, asimtotnya ikut pindah |
| 11 | `dua-mesin` | rangkai dua mesin, tukar urutan, balik arah |

Aturan proyek yang berlaku untuk semuanya, tanpa kecuali: **bingkai menyesuaikan
otomatis dan penunjuk skala wajib ada.** Widget tidak boleh memotong gambarnya
sendiri.

---

## Perubahan pada kode

Rangka halaman sudah bebas topik sejak sesi 5, jadi tidak ada pembongkaran
seperti waktu Limit dibangun.

**Berkas baru, semuanya di wilayah sesi ini:**

| Berkas | Isi |
|---|---|
| `web/content/grafik-fungsi/tahap.ts` | 12 tahap |
| `web/content/grafik-fungsi/latihan.ts` | 4 soal pilihan ganda A sampai E |
| `web/content/grafik-fungsi/kuis.ts` | bank 32 soal |
| `web/content/grafik-fungsi/index.ts` | penggabung |
| `web/components/topik/PanggungGrafikFungsi.tsx` | penyetelan 11 widget |
| `web/components/widget/grafik-fungsi/*.tsx` | 11 widget |
| `web/components/widget/grafik-fungsi/koordinat.ts` | salinan alat gambar dari Limit, ditambah kebutuhan topik ini |
| `web/components/widget/grafik-fungsi/Bidang.tsx` | salinan bingkai dari Limit |
| `web/components/widget/grafik-fungsi/seret.ts` | **baru**, alat seret titik dengan tetikus dan sentuh |
| `web/app/latihan/grafik-fungsi/page.tsx` | halaman latihan |
| `alat/cek_grafik_fungsi.py` | pemeriksa jawaban dengan sympy |
| `docs/tugas/laporan/MATRA-GRAFIK-FUNGSI.md` | laporan sesi |

**Berkas milik orang lain yang perlu satu baris (lihat "Butuh MASTER"):**

- `web/content/daftar-isi.ts`: satu entri `grafik-fungsi` (sudah diizinkan aturan)
- `web/content/topik.ts`: `siap: false` menjadi `true`

**Yang sengaja TIDAK disentuh:** `lib/kemajuan.ts` sudah menerima jumlah materi
sebagai parameter lewat `kuisTerbuka(k, jumlahMateri)`, jadi 12 tahap berjalan
tanpa mengubah apa pun di sana. Sudah diperiksa, bukan diasumsikan.

### Kenapa alat gambar disalin, bukan diimpor

`components/widget/limit/koordinat.ts` dan `Bidang.tsx` sudah persis yang
dibutuhkan topik ini: penskalaan, garis petak, penunjuk skala, dan jalur SVG
yang diputus di asimtot. Tetapi berkas itu **milik sesi Limit**, dan aturan
melarang menyunting wilayah sesi lain.

Tiga pilihan, dan alasan memilih yang ketiga:

1. **Impor lintas topik.** Murah, tetapi membuat topik ini rusak kalau Limit
   mengubah berkasnya, dan menaruh ketergantungan pada folder yang bukan
   miliknya. Ditolak.
2. **Minta MASTER menaikkan berkasnya ke folder bersama lebih dulu.** Paling
   rapi, tetapi memblokir pekerjaan sampai MASTER sempat, padahal MASTER sedang
   memegang Limit. Ditolak untuk gelombang 1.
3. **Salin ke folder sendiri, lalu usulkan penggabungan setelah merge.**
   Dipilih. Duplikasinya nyata dan dicatat jujur di laporan, tetapi tidak
   memblokir siapa pun, dan MASTER bisa menyatukannya sekali untuk semua topik
   setelah keenam sesi digabung.

---

## Latihan dan kuis

Bentuknya persis dua topik sebelumnya:

- **Latihan di halaman topik:** 4 soal pilihan ganda A sampai E dengan
  pembahasan bertahap. Pengecohnya bukan asal salah, tiap butir adalah
  kekeliruan yang benar-benar sering terjadi.
- **Bank kuis:** 32 soal, 8 diambil tiap sesi, menghindari soal yang sudah
  pernah keluar.
- **Halaman `/latihan/grafik-fungsi`:** empat tingkat kesulitan, bar kemajuan,
  lencana.

**Urutan kerjanya tidak boleh dibalik.** Soal buatan Claude cenderung terlalu
mudah, itu temuan ARYA dan bukan dugaan. Jadi sebelum satu soal pun ditulis,
yang dibaca dulu:

| Sumber | Halaman cetak |
|---|---|
| Latihan 6.1 sampai 6.6 dan Uji Kompetensi Bab 6, buku Kelas 10 | 175 sampai 197 |
| Latihan dan Ayo Mencoba bab Eksponen dan Logaritma, buku Kelas 10 | 24 sampai 46 |
| Latihan 1.1 sampai 1.5 dan Uji Kompetensi Bab 1, buku Kelas 11 | 21 sampai 64 |

Soal mathcyber1997 ditambahkan menyusul oleh ARYA, sesuai jawabannya di gerbang
rancangan. Situs itu memblokir pemeriksa bot dan **tidak boleh diterobos**.

Semua jawaban numerik diperiksa mesin lewat `alat/cek_grafik_fungsi.py`, yang
**dibuat sebelum soal pertama ditulis**, meniru urutan yang berhasil di Limit.
Yang diperiksa: koordinat puncak, diskriminan dan akar, hasil transformasi,
nilai eksponen dan logaritma, hasil komposisi, dan rumus invers.

Soal salinan wajib menyebut sumber berikut tautan dan penulisnya. Soal tanpa
keterangan berarti tulisan sendiri.

---

## Urutan pengerjaan

| Langkah | Isi | Halaman bisa dilihat? |
|---|---|---|
| 1 | Alat gambar disalin, `seret.ts` dibuat dan diuji | belum |
| 2 | `cek_grafik_fungsi.py` dibuat, dibuktikan menolak jawaban salah | belum |
| 3 | Kalibrasi soal: baca latihan di ketiga bab sumber | belum |
| 4 | Materi 12 tahap ditulis, didaftarkan di `daftar-isi.ts` | **ya, sudah bisa dibaca** |
| 5 | Sebelas widget, urut tahap | ya, makin hidup tiap widget |
| 6 | Latihan, bank kuis, halaman `/latihan/grafik-fungsi` | ya, **topik lengkap** |
| 7 | Gerbang selesai: tsc, build, sympy, potret 375 dan 1366, laporan | ya |

Titik amannya di akhir langkah 4: materinya sudah bisa dibaca walaupun belum
satu widget pun jadi.

---

## Risiko dan catatan terbuka

1. **Dua belas tab bisa merusak tata letak di layar sempit.** Trigonometri dan
   Limit sama-sama 10, jadi 12 belum pernah diuji. Kalau baris tab tumpah di
   lebar 375 piksel, perbaikannya ada di `app/globals.css` yang **bukan milik
   sesi ini**. Diperiksa dengan Playwright di langkah 4, dan kalau rusak
   dilaporkan ke MASTER, tidak ditambal sendiri.
2. **Sebelas widget adalah batch terbesar sejauh ini,** dan dua di antaranya
   memakai jenis interaksi yang belum pernah dipakai di proyek ini: menyeret
   titik (widget 5) dan animasi transformasi (widget 6 dan 7). Keduanya
   dikerjakan lebih dulu di langkah 5 supaya kalau ternyata mahal, masih ada
   waktu menyederhanakannya menjadi penggeser biasa.
3. **Dua tahap berada di luar kurikulum wajib** (7 nilai mutlak, 10 fungsi
   rasional). Ini keputusan sadar ARYA. Ditangani dengan label jujur di badan
   teks, bukan disembunyikan.
4. **Tahap 10 bersinggungan dengan Limit materi 07.** Sebelum menulisnya,
   `content/limit/tahap.ts` materi 07 dibaca dulu supaya kalimatnya tidak
   bertentangan dengan yang sudah tayang.
5. **Kotak pengingat ke Limit belum bisa diklik** di gelombang 1. Untuk membuat
   tautannya perlu jenis blok baru di `content/tipe.ts` (milik MASTER) dan
   perendernya di `Penjelasan.tsx` (milik UI/UX). Diajukan lewat laporan.
6. **Alat gambar terduplikasi** dengan milik Limit. Disengaja, alasannya di atas.
   Usul penggabungan diajukan ke MASTER setelah merge.
7. **Soal mathcyber1997 menunggu ARYA.** Kalibrasi buku jalan lebih dulu supaya
   pekerjaan tidak berhenti.
8. **Tanpa video di gelombang 1.** Kalau nanti ada video, calon terkuatnya
   tahap 6 (transformasi), karena gerakan grafiknya justru paling cocok untuk
   animasi dan paling sulit ditangkap widget statis.
