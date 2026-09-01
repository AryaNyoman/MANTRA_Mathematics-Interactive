import type { SoalKuis } from '@/content/tipe'

/**
 * Bank soal kuis Statistika, 32 butir, empat tingkat kesulitan.
 *
 * Delapan soal diambil tiap sesi dan yang sudah pernah keluar dihindari, jadi
 * empat sesi pertama tidak mengulang satu soal pun.
 *
 * KALIBRASI DILAKUKAN SEBELUM MENULIS, BUKAN SESUDAH
 * Aturan proyek: soal buatan sendiri cenderung terlalu mudah. Itu temuan ARYA,
 * bukan dugaan. Sumber kalibrasinya soal pengayaan di Buku Panduan Guru
 * Matematika SMA/SMK Kelas X, Kemendikbudristek 2021, halaman 243 sampai 244.
 *
 * Yang paling berharga dari kalibrasi itu: soal tersulit di buku ternyata bukan
 * soal hitung-hitungan, melainkan soal PENGUBAHAN DATA. Semua nilai ditambah
 * tetapan, atau dikali tetapan, lalu ditanya ukuran mana yang berubah dan mana
 * yang tetap. Jawabannya menuntut paham arti tiap ukuran, bukan hafal rumus:
 * menambah tetapan menggeser semua ukuran pemusatan tetapi TIDAK mengubah
 * simpangan baku sama sekali. Soal seperti itu tidak akan lahir dari mengarang
 * sendiri, dan sekarang ada empat di bank ini (st-20, st-21, st-29, st-32).
 *
 * SELURUH ANGKA berasal dari `content/statistika/data.json` dan sudah lolos
 * `alat/cek_statistik.py` serta `alat/cek_statistik_web.mjs`.
 */

export const KUIS: SoalKuis[] = [
  /* ---------------------------------------------------------- mudah */
  {
    id: 'st-01',
    tingkat: 'mudah',
    pertanyaan: 'Nilai delapan siswa: 4, 5, 6, 7, 7, 8, 8, 11. Berapa modusnya?',
    pilihan: ['7 saja', '8 saja', '7 dan 8', '11', 'Tidak punya modus'],
    benar: 2,
    alasan:
      'Angka 7 muncul dua kali dan 8 juga dua kali, sedangkan sisanya sekali. Keduanya sama-sama paling sering, jadi datanya punya dua modus. Tidak ada aturan yang mengharuskan modus cuma satu.',
  },
  {
    id: 'st-02',
    tingkat: 'mudah',
    pertanyaan: 'Nilai delapan siswa: 6, 6, 7, 7, 7, 7, 8, 8. Berapa rata-ratanya?',
    pilihan: ['6', '6,5', '7', '7,5', '8'],
    benar: 2,
    alasan:
      'Jumlahnya 56 dan banyak datanya 8, jadi 56 dibagi 8 sama dengan 7. Perhatikan mediannya juga 7 dan modusnya juga 7. Untuk data yang setangkup seperti ini, ketiganya memang sering berimpit.',
  },
  {
    id: 'st-03',
    tingkat: 'mudah',
    pertanyaan: 'Data: 12, 7, 15, 9, 11. Berapa mediannya?',
    pilihan: ['9', '11', '12', '15', '10,8'],
    benar: 1,
    alasan:
      'Urutkan dulu: 7, 9, 11, 12, 15. Banyak datanya ganjil, jadi mediannya data ke-3, yaitu 11. Pilihan 15 adalah angka yang kebetulan tertulis di tengah daftar aslinya, dan itu bukan median. Pilihan 10,8 adalah rata-ratanya.',
  },
  {
    id: 'st-04',
    tingkat: 'mudah',
    pertanyaan: 'Data: 3, 4, 5, 7, 7, 9, 10, 11. Berapa jangkauannya?',
    pilihan: ['3', '7', '8', '11', '14'],
    benar: 2,
    alasan:
      'Jangkauan adalah nilai terbesar dikurangi nilai terkecil, yaitu 11 - 3 = 8. Pilihan 14 muncul kalau keduanya dijumlah, bukan dikurangkan.',
  },
  {
    id: 'st-05',
    tingkat: 'mudah',
    pertanyaan:
      'Data cara siswa berangkat ke sekolah: jalan kaki, sepeda, sepeda motor, angkot, diantar. Gambar apa yang tepat untuk data ini?',
    pilihan: [
      'Histogram, karena batangnya rapat',
      'Diagram batang, karena datanya berupa kategori',
      'Line plot, karena tiap data satu titik',
      'Diagram garis, karena menunjukkan perubahan',
      'Semuanya sama saja',
    ],
    benar: 1,
    alasan:
      'Cara berangkat adalah kategori, bukan angka, jadi tidak punya letak pada garis bilangan. Histogram menuntut sumbu mendatar berupa garis bilangan dan batangnya rapat karena kelas bersebelahan bersambung. Kategori tidak bersambung, urutannya pun boleh ditukar.',
  },
  {
    id: 'st-06',
    tingkat: 'mudah',
    pertanyaan: 'Dari 40 siswa, 12 di antaranya naik sepeda motor. Berapa frekuensi relatifnya?',
    pilihan: ['0,12', '0,3', '3', '12 persen', '30'],
    benar: 1,
    alasan:
      'Frekuensi relatif adalah frekuensi dibagi banyak data, yaitu 12 dibagi 40 sama dengan 0,3, atau 30 persen. Pilihan 0,12 dan 12 persen muncul kalau angka 12 dianggap sudah berupa bagian, padahal ia jumlah orang.',
  },
  {
    id: 'st-07',
    tingkat: 'mudah',
    pertanyaan: 'Berapa bagian data yang nilainya di bawah kuartil bawah Q1?',
    pilihan: ['10 persen', '25 persen', '50 persen', '75 persen', 'Tergantung datanya'],
    benar: 1,
    alasan:
      'Kuartil membelah data terurut menjadi empat bagian yang sama banyak, jadi seperempat data berada di bawah Q1. Ini berlaku untuk data apa pun, jadi jawabannya tidak tergantung datanya.',
  },
  {
    id: 'st-08',
    tingkat: 'mudah',
    pertanyaan:
      'Sebuah kumpulan data punya simpangan baku 0. Apa artinya?',
    pilihan: [
      'Datanya kosong',
      'Semua nilainya sama',
      'Rata-ratanya nol',
      'Datanya tersebar sangat lebar',
      'Ada kesalahan hitung',
    ],
    benar: 1,
    alasan:
      'Simpangan baku nol berarti tidak ada satu pun data yang menyimpang dari mean, dan itu hanya mungkin kalau semua nilainya sama persis. Rata-ratanya sendiri boleh berapa saja.',
  },

  /* --------------------------------------------------------- sedang */
  {
    id: 'st-09',
    tingkat: 'sedang',
    pertanyaan:
      'Dua kelas punya rata-rata, median, dan modus yang sama persis, yaitu 7. Apa yang PASTI bisa disimpulkan?',
    pilihan: [
      'Kedua kelas punya nilai yang sama',
      'Kedua kelas punya sebaran yang sama',
      'Kedua kelas punya jangkauan yang sama',
      'Belum ada yang bisa disimpulkan tentang sebarannya',
      'Kedua kelas punya banyak siswa yang sama',
    ],
    benar: 3,
    alasan:
      'Ukuran pemusatan sama sekali tidak bicara soal sebaran. Contoh di Materi 01 memperlihatkan dua kelas dengan ketiga ukuran itu sama persis, tetapi jangkauannya 2 lawan 8 dan simpangan bakunya 0,71 lawan 2,69.',
  },
  {
    id: 'st-10',
    tingkat: 'sedang',
    pertanyaan:
      'Sekolah A: 18 dari 60 siswa ikut ekstrakurikuler musik. Sekolah B: 25 dari 100 siswa. Mana yang bagian pesertanya lebih besar?',
    pilihan: [
      'Sekolah B, sebab 25 lebih banyak daripada 18',
      'Sekolah A, yaitu 30 persen lawan 25 persen',
      'Sama saja',
      'Tidak bisa dibandingkan',
      'Sekolah B, yaitu 25 persen lawan 18 persen',
    ],
    benar: 1,
    alasan:
      'Jumlah siswanya berbeda, jadi jumlah mentah tidak bisa langsung diadu. 18 dibagi 60 sama dengan 0,3 yaitu 30 persen, sedangkan 25 dibagi 100 sama dengan 0,25 yaitu 25 persen. Jumlah orangnya lebih sedikit, tetapi bagiannya lebih besar.',
  },
  {
    id: 'st-11',
    tingkat: 'sedang',
    pertanyaan: 'Data terurut: 4, 5, 6, 7, 7, 8, 8, 11. Berapa mediannya?',
    pilihan: ['6', '6,5', '7', '7,5', '8'],
    benar: 2,
    alasan:
      'Banyak datanya 8, jadi genap, dan tengahnya ada dua yaitu data ke-4 dan ke-5. Keduanya bernilai 7, jadi mediannya (7 + 7) dibagi 2 sama dengan 7.',
  },
  {
    id: 'st-12',
    tingkat: 'sedang',
    pertanyaan:
      'Gaji sembilan karyawan sekitar 5 juta, lalu satu direktur bergaji 75 juta ikut dihitung. Ukuran mana yang paling mewakili gaji orang kebanyakan di kantor itu?',
    pilihan: [
      'Mean, sebab memakai semua data',
      'Median, sebab tidak tertarik oleh satu nilai yang jauh',
      'Modus, sebab paling sering muncul',
      'Jangkauan',
      'Ketiganya sama saja',
    ],
    benar: 1,
    alasan:
      'Mean memakai NILAI tiap data, jadi gaji 75 juta menyeretnya sampai 12,22 juta, padahal sembilan dari sepuluh orang bergaji 7 juta atau kurang. Median cuma memakai POSISI, jadi ia bertahan di 5,1 juta. Untuk data yang miring seperti gaji dan harga rumah, median lebih jujur.',
  },
  {
    id: 'st-13',
    tingkat: 'sedang',
    pertanyaan:
      'Pada sebuah boxplot, kotaknya lebar sekali. Apa artinya?',
    pilihan: [
      'Datanya banyak',
      'Setengah data yang di tengah tersebar di rentang yang luas',
      'Ada banyak pencilan',
      'Rata-ratanya besar',
      'Datanya sedikit',
    ],
    benar: 1,
    alasan:
      'Kotak membentang dari Q1 sampai Q3, jadi ia selalu berisi tepat setengah data yang di tengah, berapa pun lebarnya. Kotak yang lebar berarti setengah data itu tersebar luas. Boxplot memang tidak menampilkan banyak data sama sekali: dua boxplot identik bisa berasal dari 10 data dan dari 10.000 data.',
  },
  {
    id: 'st-14',
    tingkat: 'sedang',
    pertanyaan:
      'Sebuah grafik garis memperlihatkan lonjakan tajam. Ternyata sumbu tegaknya dimulai dari 410, bukan dari 0. Apa yang sebaiknya disimpulkan?',
    pilihan: [
      'Grafiknya salah dan angkanya palsu',
      'Kenaikannya nyata, tetapi terlihat jauh lebih besar daripada sebenarnya',
      'Kenaikannya memang besar',
      'Grafik seperti itu selalu curang',
      'Sumbu tegak memang tidak pernah dimulai dari nol',
    ],
    benar: 1,
    alasan:
      'Angkanya benar semua; yang berubah cuma dari berapa sumbu tegaknya dimulai. Memotong sumbu tidak selalu curang, misalnya untuk suhu tubuh justru wajib. Yang membedakan curang dan tidak adalah apakah pemotongan itu diberitahukan dengan jelas kepada pembacanya.',
  },
  {
    id: 'st-15',
    tingkat: 'sedang',
    pertanyaan:
      'Dari data yang sama persis bisa lahir dua histogram yang bentuknya berbeda. Kenapa?',
    pilihan: [
      'Karena salah satunya pasti salah hitung',
      'Karena lebar kelasnya dipilih berbeda',
      'Karena datanya diurutkan berbeda',
      'Karena satunya memakai frekuensi relatif',
      'Itu tidak mungkin terjadi',
    ],
    benar: 1,
    alasan:
      'Lebar kelas adalah pilihan manusia, bukan hasil rumus. Kelas yang sempit membuat gambarnya bergerigi, kelas yang lebar menghapus polanya. Keduanya sah, dan itu sebabnya lebar kelas termasuk hal yang perlu diperiksa saat membaca histogram orang lain.',
  },
  {
    id: 'st-16',
    tingkat: 'sedang',
    pertanyaan:
      'Diagram pencar menunjukkan titik-titik yang naik dari kiri bawah ke kanan atas dan menempel rapat pada satu garis. Bagaimana membacanya?',
    pilihan: [
      'Arah naik, bentuk mendekati lurus, hubungan kuat',
      'Arah naik, bentuk melengkung, hubungan lemah',
      'Arah turun, hubungan kuat',
      'Tidak ada hubungan',
      'Yang satu pasti menyebabkan yang lain',
    ],
    benar: 0,
    alasan:
      'Naik berarti korelasi positif, menempel rapat berarti kuat, dan menyusuri garis berarti bentuknya lurus. Pilihan terakhir adalah kesimpulan yang paling sering diambil dan paling sering salah: bergerak bersama bukan berarti yang satu menyebabkan yang lain.',
  },

  /* ---------------------------------------------------------- sulit */
  {
    id: 'st-17',
    tingkat: 'sulit',
    pertanyaan:
      'Data: 2, 4, 6, 8, 10. Berapa simpangan bakunya? Gunakan pembagi n seperti pada buku SMA.',
    pilihan: ['2,4', '2,83', '3,16', '8', '40'],
    benar: 1,
    alasan:
      'Mean 6, simpangannya -4, -2, 0, 2, 4, kuadratnya 16, 4, 0, 4, 16 dengan jumlah 40. Varian = 40 dibagi 5 = 8, dan simpangan bakunya akar dari 8, yaitu 2,83. Pilihan 8 adalah variannya, 40 adalah jumlah kuadratnya, 3,16 muncul kalau pembaginya 4 bukan 5, dan 2,4 adalah rata-rata jarak tanpa dikuadratkan.',
  },
  {
    id: 'st-18',
    tingkat: 'sulit',
    pertanyaan:
      'Tabel nilai 40 siswa: 40-49 ada 3 siswa, 50-59 ada 8, 60-69 ada 12, 70-79 ada 9, 80-89 ada 6, 90-99 ada 2. Berapa mediannya?',
    pilihan: ['64,5', '65,21', '67', '67,75', '69,5'],
    benar: 2,
    alasan:
      'Setengah dari 40 adalah 20. Frekuensi kumulatifnya 3, lalu 11, lalu 23, jadi median jatuh di kelas 60-69 yang tepi bawahnya 59,5. Rumusnya 59,5 + ((20 - 11) dibagi 12) kali 10 = 59,5 + 7,5 = 67. Pilihan 67,75 adalah meannya dan 65,21 adalah modusnya. Ketiganya berdekatan, dan itu yang membuat soal ini menjebak.',
  },
  {
    id: 'st-19',
    tingkat: 'sulit',
    pertanyaan:
      'Dari tabel yang sama, kelas 60-69 punya frekuensi tertinggi yaitu 12, tetangga kirinya 8 dan tetangga kanannya 9. Berapa modus data berkelompoknya?',
    pilihan: ['59,5', '64,5', '65,21', '67', '69,5'],
    benar: 2,
    alasan:
      'Selisih dengan tetangga kiri d1 = 12 - 8 = 4, dengan tetangga kanan d2 = 12 - 9 = 3. Modus = 59,5 + (4 dibagi 7) kali 10 = 59,5 + 5,71 = 65,21. Karena tetangga kanannya lebih tinggi, modusnya condong ke kanan dari 64,5 yang merupakan titik tengah kelas.',
  },
  {
    id: 'st-20',
    tingkat: 'sulit',
    pertanyaan:
      'Setiap nilai pada data 2, 4, 6, 8, 10 ditambah 5 sehingga menjadi 7, 9, 11, 13, 15. Ukuran mana yang TIDAK berubah?',
    pilihan: ['Mean', 'Median', 'Modus', 'Simpangan baku', 'Semuanya berubah'],
    benar: 3,
    alasan:
      'Menambah tetapan menggeser seluruh data ke kanan sejauh yang sama, jadi mean, median, dan modus ikut bergeser 5. Tetapi jarak antar data tidak berubah sedikit pun, dan simpangan baku hanya mengukur jarak. Keduanya tetap 2,83.',
  },
  {
    id: 'st-21',
    tingkat: 'sulit',
    pertanyaan:
      'Setiap nilai pada data 2, 4, 6, 8, 10 dikali 3 sehingga menjadi 6, 12, 18, 24, 30. Simpangan bakunya berubah bagaimana?',
    pilihan: [
      'Tetap 2,83',
      'Bertambah 3 menjadi 5,83',
      'Menjadi 3 kali lipat, yaitu 8,49',
      'Menjadi 9 kali lipat',
      'Tidak bisa ditentukan',
    ],
    benar: 2,
    alasan:
      'Mengali tetapan meregangkan seluruh jarak antar data sebesar tetapan itu juga, jadi simpangan bakunya ikut dikali 3 menjadi 8,49. Perhatikan bedanya dengan menambah tetapan, yang sama sekali tidak mengubahnya. Variannya sendiri jadi 9 kali lipat, sebab varian memakai kuadrat.',
  },
  {
    id: 'st-22',
    tingkat: 'sulit',
    pertanyaan:
      'Garis regresi sebuah data adalah y-topi = 49,2 + 3,2x, dengan x lama belajar dalam jam. Berapa ramalan nilai untuk siswa yang belajar 7 jam?',
    pilihan: ['52,4', '56,2', '71,6', '347,6', '76,4'],
    benar: 2,
    alasan:
      'Substitusikan x = 7: 49,2 + 3,2 kali 7 = 49,2 + 22,4 = 71,6. Pilihan 347,6 muncul kalau a dan b tertukar, yaitu 3,2 + 49,2 kali 7. Tertukarnya a dan b memang kesalahan yang sering terjadi, jadi biasakan menyebut namanya: a perpotongan, b kemiringan.',
  },
  {
    id: 'st-23',
    tingkat: 'sulit',
    pertanyaan:
      'Pada garis regresi y-topi = 49,2 + 3,2x, apa arti angka 3,2 dalam bahasa sehari-hari?',
    pilihan: [
      'Nilai siswa yang tidak belajar sama sekali',
      'Tiap tambahan satu jam belajar, nilai diramalkan naik sekitar 3,2 poin',
      'Rata-rata nilai seluruh siswa',
      'Banyak siswa yang diamati',
      'Kesalahan ramalan garis itu',
    ],
    benar: 1,
    alasan:
      'Angka 3,2 adalah kemiringan, yaitu perubahan y untuk setiap tambahan satu satuan x. Pilihan pertama adalah arti 49,2, yaitu perpotongan, dan itu pun perlu hati-hati sebab tidak ada satu pun siswa dalam data yang belajar nol jam.',
  },
  {
    id: 'st-24',
    tingkat: 'sulit',
    pertanyaan:
      'Data waktu tempuh: 5, 7, 8, 10, 10, 12, 15, 15, 18, 20, 22, 25, 30, 35, 60. Dengan Q1 = 10 dan Q3 = 25, nilai mana yang ditandai pencilan oleh pagar 1,5 kali JAK?',
    pilihan: ['Tidak ada', 'Hanya 5', 'Hanya 60', '35 dan 60', '5 dan 60'],
    benar: 2,
    alasan:
      'JAK = 25 - 10 = 15, jadi 1,5 kali JAK sama dengan 22,5. Pagar bawah = 10 - 22,5 = -12,5 dan pagar atas = 25 + 22,5 = 47,5. Hanya 60 yang berada di luar pagar. Nilai 35 masih di bawah 47,5, dan 5 masih jauh di atas pagar bawah.',
  },

  /* --------------------------------------------------- sangat sulit */
  {
    id: 'st-25',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sekumpulan data punya koefisien korelasi r = 0. Manakah yang benar?',
    pilihan: [
      'Kedua peubah pasti tidak berhubungan sama sekali',
      'Tidak ada hubungan LURUS, tetapi bisa saja berhubungan melengkung',
      'Datanya pasti salah kumpul',
      'Garis regresinya tidak ada',
      'Kedua peubah pasti berhubungan terbalik',
    ],
    benar: 1,
    alasan:
      'r hanya mengukur kelurusan. Data x dari -3 sampai 3 dengan y sama dengan x kuadrat punya r tepat nol, padahal setiap y bisa ditebak dengan sempurna dari x nya. Itu sebabnya angka r tidak pernah boleh dibaca tanpa melihat diagram pencarnya.',
  },
  {
    id: 'st-26',
    tingkat: 'sangat sulit',
    pertanyaan:
      'Penjualan es krim dan jumlah orang tenggelam ternyata naik bersamaan dengan korelasi kuat. Kesimpulan mana yang paling tepat?',
    pilihan: [
      'Es krim menyebabkan orang tenggelam',
      'Orang tenggelam menyebabkan penjualan es krim naik',
      'Ada faktor ketiga, misalnya cuaca panas, yang menaikkan keduanya',
      'Korelasinya pasti salah hitung',
      'Keduanya tidak berhubungan sama sekali',
    ],
    benar: 2,
    alasan:
      'Korelasi kuat punya empat kemungkinan penjelasan: A menyebabkan B, B menyebabkan A, ada faktor ketiga, atau kebetulan. Di sini cuaca panas menaikkan penjualan es krim sekaligus menaikkan jumlah orang berenang. Ilustrasi ini biasa dipakai untuk menjelaskan, bukan hasil penelitian tertentu.',
  },
  {
    id: 'st-27',
    tingkat: 'sangat sulit',
    pertanyaan:
      'Garis regresi y-topi = 49,2 + 3,2x dibuat dari data siswa yang belajar 2 sampai 11 jam. Dipakai untuk meramal siswa yang belajar 40 jam, hasilnya 177,2. Apa masalahnya?',
    pilihan: [
      'Tidak ada masalah, rumusnya sudah benar',
      'Ekstrapolasi terlalu jauh, dan nilainya mustahil sebab maksimal 100',
      'Seharusnya memakai median',
      'Angka 40 kurang besar',
      'Garisnya harus dihitung ulang',
    ],
    benar: 1,
    alasan:
      'Hitungannya benar, dan justru itu jebakannya: rumus selalu memberi jawaban, termasuk untuk pertanyaan yang tidak masuk akal. Nilai 40 jam jauh di luar rentang data 2 sampai 11 jam, dan garisnya tidak tahu bahwa nilai ujian tidak bisa lebih dari 100.',
  },
  {
    id: 'st-28',
    tingkat: 'sangat sulit',
    pertanyaan:
      'Sebuah data punya koefisien determinasi r kuadrat sama dengan 0,97. Apa artinya?',
    pilihan: [
      'Ramalannya benar 97 persen',
      'Sekitar 97 persen keragaman y bisa dijelaskan oleh garis yang memakai x',
      '97 persen datanya tepat di garis',
      'Korelasinya 0,97',
      'Kesalahannya 97 persen',
    ],
    benar: 1,
    alasan:
      'r kuadrat menyatakan bagian keragaman y yang bisa dijelaskan garisnya. Sisa 3 persen berasal dari hal lain yang tidak masuk hitungan. Ia bukan tingkat kebenaran ramalan, dan bukan pula banyaknya titik yang tepat di garis. Perhatikan juga r nya sendiri 0,98, bukan 0,97.',
  },
  {
    id: 'st-29',
    tingkat: 'sangat sulit',
    pertanyaan:
      'Data 2, 4, 6, 8, 10 punya mean 6 dan simpangan baku 2,83. Setiap nilai dikali 2 lalu ditambah 5. Berapa mean dan simpangan baku yang baru?',
    pilihan: [
      'Mean 12, simpangan baku 5,66',
      'Mean 17, simpangan baku 5,66',
      'Mean 17, simpangan baku 10,66',
      'Mean 17, simpangan baku 2,83',
      'Mean 12, simpangan baku 2,83',
    ],
    benar: 1,
    alasan:
      'Mean ikut kedua perlakuan: 2 kali 6 lalu ditambah 5, hasilnya 17. Simpangan baku hanya ikut perkaliannya, yaitu 2 kali 2,83 sama dengan 5,66, sebab menambah tetapan menggeser seluruh data bersama-sama tanpa mengubah jaraknya. Inilah bedanya dua perlakuan itu, dan pilihan yang salah semuanya lahir dari mencampur keduanya.',
  },
  {
    id: 'st-30',
    tingkat: 'sangat sulit',
    pertanyaan:
      'Pada histogram, dua kelas bersebelahan digabung. Kelas 8-10 tingginya 12 dan kelas 10-12 tingginya 4. Berapa tinggi kelas gabungan 8-12?',
    pilihan: ['4', '8', '12', '16', '32'],
    benar: 1,
    alasan:
      'Yang dipertahankan adalah LUAS, bukan tinggi. Luas kelas 8-10 adalah 2 kali 12 = 24, luas kelas 10-12 adalah 2 kali 4 = 8, jumlahnya 32. Kelas gabungan lebarnya 4, jadi tingginya 32 dibagi 4 = 8. Pilihan 16 adalah kesalahan yang paling sering terjadi, yaitu tingginya dijumlah.',
  },
  {
    id: 'st-31',
    tingkat: 'sangat sulit',
    pertanyaan:
      'Mean dari tabel data berkelompok terhitung 67,75, sedangkan mean dari angka aslinya 68. Kenapa berbeda?',
    pilihan: [
      'Ada kesalahan hitung pada salah satunya',
      'Karena tiap kelas diwakili titik tengahnya, jadi hasilnya hampiran',
      'Karena tabelnya memakai frekuensi relatif',
      'Karena banyak datanya berbeda',
      'Seharusnya keduanya selalu sama',
    ],
    benar: 1,
    alasan:
      'Pada data berkelompok, nilai asli tiap data sudah tidak diketahui, jadi setiap kelas diwakili titik tengahnya. Itu tebakan yang masuk akal, bukan kebenaran. Kalau data ternyata menumpuk di satu ujung kelas, selisihnya bisa jauh lebih besar daripada 0,25.',
  },
  {
    id: 'st-32',
    tingkat: 'sangat sulit',
    pertanyaan:
      'Pada data gaji, satu nilai ditarik makin jauh ke kanan. Mean ikut bergerak tetapi median berhenti. Kenapa median tidak bergerak?',
    pilihan: [
      'Karena median selalu bilangan bulat',
      'Karena median hanya memakai posisi data, bukan nilainya',
      'Karena median dihitung sebelum data diurutkan',
      'Karena median mengabaikan data terbesar',
      'Karena datanya genap',
    ],
    benar: 1,
    alasan:
      'Mean memakai nilai tiap data dengan bobot penuh, jadi satu nilai raksasa menyeret hasilnya. Bagi median, data itu cuma "yang paling kanan", mau 75 juta atau 750 juta posisinya tetap sama. Median tidak mengabaikan data terbesar; ia memakainya, tetapi hanya sebagai urutan.',
  },
]
