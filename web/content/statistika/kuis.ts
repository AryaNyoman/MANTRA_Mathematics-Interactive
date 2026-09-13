import type { SoalKuis } from '@/content/tipe'

/**
 * Bank soal latihan Statistika: 60 soal, 15 tiap tingkat (14 Sep 2026).
 *
 * SEJARAH: bank 32 soal (8 per tingkat, id st-01 sampai st-32) dari 4 Sep
 * 2026. 13 Sep ARYA meminta 15 soal per tingkat, syarat naik 10 benar,
 * pembahasan bernomor bergambar, dan penjelasan pengecoh. Id lama
 * DIPERTAHANKAN; soal baru st-33 sampai st-60.
 *
 * KALIBRASI (semua tulisan sendiri):
 * - mudah dan sedang: Buku Panduan Guru Kelas X Bab Statistika (soal
 *   pengayaan halaman 243 sampai 244: pengubahan data, ukuran mana yang
 *   berubah);
 * - sulit: data berkelompok (mean, median, modus, kuartil) memakai tabel
 *   nilai 40 siswa yang sama dengan halaman materi;
 * - sangat sulit: 5 bergaya olimpiade dari mathcyber1997.com/soal-pembahasan-
 *   statistika-utbk-snbt (peserta didiskualifikasi, rata-rata sama dengan
 *   salah satu datum, bilangan diganti, susunan data dari mean-median-modus,
 *   siswa baru yang tidak mengubah rata-rata) dan 10 sulit-biasa.
 *
 * Angka tabel 40 siswa: 40-49 (3), 50-59 (8), 60-69 (12), 70-79 (9), 80-89
 * (6), 90-99 (2); mean 67,75, median 67, modus 65,21, Q1 58,25. Tiap
 * jawaban berangka punya `// cek:` untuk alat/cek_kuis.mjs.
 */

export const KUIS: SoalKuis[] = [
  /* ================================ mudah ================================ */
  {
    id: 'st-01',
    tingkat: 'mudah',
    pertanyaan: 'Nilai delapan siswa: 4, 5, 6, 7, 7, 8, 8, 11. Berapa modusnya?',
    gambar: { jenis: 'batang', kategori: ['4', '5', '6', '7', '8', '11'], nilai: [1, 1, 1, 2, 2, 1], satuan: 'banyak siswa', sorot: [3, 4] },
    pilihan: ['7 saja', '8 saja', '7 dan 8', '11', 'Tidak punya modus'],
    benar: 2,
    langkah: [
      'Modus adalah nilai yang paling sering muncul.',
      'Hitung: 7 muncul dua kali, 8 muncul dua kali, sisanya sekali.',
      'Dua nilai sama-sama paling sering: modusnya 7 dan 8.',
    ],
    jebakan: '"7 saja" berhenti di nilai pertama yang muncul dua kali. Tidak ada aturan bahwa modus cuma satu.',
    alasan: '7 dan 8 sama-sama muncul dua kali, jadi datanya punya dua modus.',
  },
  {
    // cek: (6+6+7+7+7+7+8+8)/8 === 7
    id: 'st-02',
    tingkat: 'mudah',
    pertanyaan: 'Nilai delapan siswa: 6, 6, 7, 7, 7, 7, 8, 8. Berapa rata-ratanya?',
    pilihan: ['6', '6,5', '7', '7,5', '8'],
    benar: 2,
    langkah: [
      'Jumlahkan: 6 + 6 + 7 + 7 + 7 + 7 + 8 + 8 = 56.',
      'Bagi banyak data: 56 : 8 = 7.',
      'Data setangkup seperti ini membuat mean, median, dan modus berimpit di 7.',
    ],
    jebakan: '6,5 dan 7,5 menebak "di antara" tanpa menjumlah. Rata-rata selalu dihitung dari jumlah dibagi banyak data.',
    alasan: '56 : 8 = 7.',
  },
  {
    // cek: [7,9,11,12,15][2] === 11
    id: 'st-03',
    tingkat: 'mudah',
    pertanyaan: 'Data: 12, 7, 15, 9, 11. Berapa mediannya?',
    pilihan: ['9', '11', '12', '15', '10,8'],
    benar: 1,
    langkah: [
      'Urutkan dulu: 7, 9, 11, 12, 15.',
      'Banyak data 5 (ganjil): median data ke-3.',
      'Data ke-3 adalah 11.',
    ],
    jebakan: '15 adalah angka yang kebetulan di tengah daftar ASLI; median menuntut daftar terurut. 10,8 adalah rata-ratanya.',
    alasan: 'Setelah diurutkan, data tengahnya 11.',
  },
  {
    // cek: 11 - 3 === 8
    id: 'st-04',
    tingkat: 'mudah',
    pertanyaan: 'Data: 3, 4, 5, 7, 7, 9, 10, 11. Berapa jangkauannya?',
    pilihan: ['3', '7', '8', '11', '14'],
    benar: 2,
    langkah: [
      'Jangkauan = nilai terbesar - nilai terkecil.',
      '11 - 3 = 8.',
    ],
    jebakan: '14 menjumlahkan keduanya. 7 adalah modusnya.',
    alasan: '11 - 3 = 8.',
  },
  {
    id: 'st-05',
    tingkat: 'mudah',
    pertanyaan: 'Data cara siswa berangkat ke sekolah: jalan kaki, sepeda, sepeda motor, angkot, diantar. Gambar apa yang tepat untuk data ini?',
    gambar: { jenis: 'batang', kategori: ['jalan', 'sepeda', 'motor', 'angkot', 'diantar'], nilai: [6, 4, 12, 10, 8], satuan: 'siswa' },
    pilihan: ['Histogram, karena batangnya rapat', 'Diagram batang, karena datanya berupa kategori', 'Line plot, karena tiap data satu titik', 'Diagram garis, karena menunjukkan perubahan', 'Semuanya sama saja'],
    benar: 1,
    langkah: [
      'Cara berangkat adalah KATEGORI, bukan angka: tidak punya letak di garis bilangan.',
      'Diagram batang untuk kategori: batang terpisah, urutannya boleh ditukar.',
      'Histogram menuntut sumbu-x berupa garis bilangan dan batang rapat, jadi tidak cocok.',
    ],
    jebakan: '"Histogram" menggoda karena sama-sama batang; bedanya bukan bentuk, melainkan jenis datanya.',
    alasan: 'Kategori digambar dengan diagram batang.',
  },
  {
    // cek: Math.abs(12/40 - 0.3) < 1e-9
    id: 'st-06',
    tingkat: 'mudah',
    pertanyaan: 'Dari 40 siswa, 12 di antaranya naik sepeda motor. Berapa frekuensi relatifnya?',
    pilihan: ['0,12', '0,3', '3', '12 persen', '30'],
    benar: 1,
    langkah: [
      'Frekuensi relatif = frekuensi : banyak data.',
      '12 : 40 = 0,3, atau 30 persen.',
    ],
    jebakan: '0,12 dan 12 persen memperlakukan 12 seolah sudah berupa bagian, padahal ia jumlah orang.',
    alasan: '12 : 40 = 0,3.',
  },
  {
    id: 'st-07',
    tingkat: 'mudah',
    pertanyaan: 'Berapa bagian data yang nilainya di bawah kuartil bawah Q1?',
    pilihan: ['10 persen', '25 persen', '50 persen', '75 persen', 'Tergantung datanya'],
    benar: 1,
    langkah: [
      'Kuartil membelah data terurut jadi empat bagian sama banyak.',
      'Di bawah Q1 ada satu bagian dari empat: 25 persen.',
    ],
    jebakan: '"Tergantung datanya" keliru: pembagian empat bagian berlaku untuk data apa pun; yang berubah cuma NILAI Q1-nya.',
    alasan: 'Seperempat data di bawah Q1.',
  },
  {
    id: 'st-08',
    tingkat: 'mudah',
    pertanyaan: 'Sebuah kumpulan data punya simpangan baku 0. Apa artinya?',
    pilihan: ['Datanya kosong', 'Semua nilainya sama', 'Rata-ratanya nol', 'Datanya tersebar sangat lebar', 'Ada kesalahan hitung'],
    benar: 1,
    langkah: [
      'Simpangan baku mengukur rata-rata jarak data ke mean.',
      'Nol berarti tidak ada data yang menyimpang: semuanya tepat di mean, jadi semuanya sama.',
    ],
    jebakan: '"Rata-ratanya nol" mencampur mean dengan sebaran; data 5, 5, 5 punya mean 5 dan simpangan baku 0.',
    alasan: 'Tidak ada yang menyimpang dari mean: semua nilai sama.',
  },
  {
    // cek: (5 + 7 + 9)/3 === 7
    id: 'st-33',
    tingkat: 'mudah',
    pertanyaan: 'Rata-rata dari 5, 7, dan 9 adalah?',
    gambar: { jenis: 'batang', kategori: ['data 1', 'data 2', 'data 3'], nilai: [5, 7, 9] },
    pilihan: ['7', '6', '8', '21', '5'],
    benar: 0,
    langkah: [
      'Jumlah: 5 + 7 + 9 = 21.',
      'Bagi 3: 21 : 3 = 7.',
      'Mean adalah titik seimbang: 5 kurang 2, 9 lebih 2, saling menghapus.',
    ],
    jebakan: '21 berhenti di jumlah. 6 dan 8 menebak tanpa membagi.',
    alasan: '21 : 3 = 7.',
  },
  {
    // cek: (8 + 9)/2 === 8.5
    id: 'st-34',
    tingkat: 'mudah',
    pertanyaan: 'Data terurut: 3, 4, 6, 8, 9, 12, 15, 20. Berapa mediannya?',
    pilihan: ['8,5', '8', '9', '9,625', '12'],
    benar: 0,
    langkah: [
      'Banyak data 8 (genap): tengahnya ada dua, data ke-4 dan ke-5.',
      'Data ke-4 = 8, ke-5 = 9. Median = (8 + 9) : 2 = 8,5.',
    ],
    jebakan: '8 dan 9 memilih salah satu dari dua data tengah; untuk data genap, keduanya dirata-ratakan. 9,625 adalah mean.',
    alasan: '(8 + 9) : 2 = 8,5.',
  },
  {
    id: 'st-35',
    tingkat: 'mudah',
    pertanyaan: 'Diagram batang pengunjung perpustakaan lima bulan. Bulan dengan pengunjung terbanyak adalah?',
    gambar: { jenis: 'batang', kategori: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'], nilai: [412, 418, 425, 421, 430], satuan: 'orang', sorot: [4] },
    pilihan: ['Mei', 'Mar', 'Apr', 'Jan', 'Feb'],
    benar: 0,
    langkah: [
      'Bandingkan tinggi batang: Mei 430, Mar 425, Apr 421, Feb 418, Jan 412.',
      'Batang tertinggi Mei.',
    ],
    jebakan: 'Mar menggoda karena batangnya terlihat "melonjak" dari Feb; yang ditanya nilai terbesar, bukan kenaikan terbesar.',
    alasan: 'Mei 430 orang, terbanyak.',
  },
  {
    id: 'st-36',
    tingkat: 'mudah',
    pertanyaan: 'Data tinggi badan 40 siswa (dalam cm) paling tepat disajikan dengan?',
    pilihan: ['Histogram', 'Diagram batang kategori', 'Diagram lingkaran', 'Tabel nama siswa', 'Diagram garis'],
    benar: 0,
    langkah: [
      'Tinggi badan adalah data ANGKA yang bersambung: 150 sampai 160, 160 sampai 170, dan seterusnya.',
      'Data angka berkelas disajikan histogram: batang rapat di atas garis bilangan.',
    ],
    jebakan: '"Diagram garis" menggoda karena angka; diagram garis untuk perubahan sepanjang waktu, bukan sebaran ukuran.',
    alasan: 'Data angka bersambung: histogram.',
  },
  {
    // cek: Math.abs(6/30 - 0.2) < 1e-9
    id: 'st-37',
    tingkat: 'mudah',
    pertanyaan: 'Dari 30 siswa, 6 orang memilih bakso sebagai jajanan kesukaan. Frekuensi relatifnya?',
    pilihan: ['0,2', '0,06', '5', '6', '0,5'],
    benar: 0,
    langkah: [
      '6 : 30 = 0,2, atau 20 persen.',
      'Artinya satu dari lima siswa memilih bakso.',
    ],
    jebakan: '5 adalah 30 : 6 (dibalik). 0,06 memperlakukan 6 sebagai persen.',
    alasan: '6 : 30 = 0,2.',
  },
  {
    // cek: [2,4,6,8,10,12,14][5] === 12
    id: 'st-38',
    tingkat: 'mudah',
    pertanyaan: 'Data terurut: 2, 4, 6, 8, 10, 12, 14. Kuartil atas Q3 adalah?',
    pilihan: ['12', '10', '8', '14', '11'],
    benar: 0,
    langkah: [
      'Median (Q2) = 8, data ke-4.',
      'Q3 adalah median separuh kanan: 10, 12, 14. Tengahnya 12.',
    ],
    jebakan: '14 mengira Q3 = nilai terbesar. 11 merata-ratakan 10 dan 12 padahal separuh kanannya ganjil (tiga data).',
    alasan: 'Median dari 10, 12, 14 adalah 12.',
  },
  {
    // cek: 12 - 4 === 8
    id: 'st-39',
    tingkat: 'mudah',
    pertanyaan: 'Data terurut: 2, 4, 6, 8, 10, 12, 14, dengan Q1 = 4 dan Q3 = 12. Jangkauan antar kuartil (JAK) adalah?',
    pilihan: ['8', '12', '4', '16', '6'],
    benar: 0,
    langkah: [
      'JAK = Q3 - Q1.',
      '12 - 4 = 8: lebar kotak pada boxplot.',
    ],
    jebakan: '12 adalah jangkauan biasa (14 - 2). 16 menjumlahkan Q1 dan Q3.',
    alasan: '12 - 4 = 8.',
  },

  /* =============================== sedang =============================== */
  {
    id: 'st-09',
    tingkat: 'sedang',
    pertanyaan: 'Dua kelas punya rata-rata, median, dan modus yang sama persis, yaitu 7. Apa yang PASTI bisa disimpulkan?',
    pilihan: ['Kedua kelas punya nilai yang sama', 'Kedua kelas punya sebaran yang sama', 'Kedua kelas punya jangkauan yang sama', 'Belum ada yang bisa disimpulkan tentang sebarannya', 'Kedua kelas punya banyak siswa yang sama'],
    benar: 3,
    langkah: [
      'Mean, median, modus adalah ukuran PEMUSATAN: di mana data berkumpul.',
      'Sebaran diukur jangkauan atau simpangan baku, yang tidak disebut sama sekali.',
      'Contoh materi 01: dua kelas dengan ketiga ukuran sama, jangkauannya 2 lawan 8.',
    ],
    jebakan: '"Kedua kelas punya nilai yang sama" mengira tiga angka ringkasan cukup memulihkan seluruh data. Ringkasan membuang informasi.',
    alasan: 'Ukuran pemusatan tidak bicara soal sebaran.',
  },
  {
    // cek: Math.abs(18/60 - 0.3) < 1e-9 && Math.abs(25/100 - 0.25) < 1e-9
    id: 'st-10',
    tingkat: 'sedang',
    pertanyaan: 'Sekolah A: 18 dari 60 siswa ikut ekstrakurikuler musik. Sekolah B: 25 dari 100 siswa. Mana yang bagian pesertanya lebih besar?',
    gambar: { jenis: 'batang', kategori: ['A (18/60)', 'B (25/100)'], nilai: [30, 25], satuan: 'persen' },
    pilihan: ['Sekolah B, sebab 25 lebih banyak daripada 18', 'Sekolah A, yaitu 30 persen lawan 25 persen', 'Sama saja', 'Tidak bisa dibandingkan', 'Sekolah B, yaitu 25 persen lawan 18 persen'],
    benar: 1,
    langkah: [
      'Jumlah siswanya beda, jadi samakan takarannya dengan frekuensi relatif.',
      'A: 18 : 60 = 0,30. B: 25 : 100 = 0,25.',
      'Bagian A lebih besar walaupun orangnya lebih sedikit.',
    ],
    jebakan: '"25 persen lawan 18 persen" memperlakukan 18 sebagai persen, padahal pembaginya 60, bukan 100.',
    alasan: '30 persen lawan 25 persen.',
  },
  {
    // cek: (7 + 7)/2 === 7
    id: 'st-11',
    tingkat: 'sedang',
    pertanyaan: 'Data terurut: 4, 5, 6, 7, 7, 8, 8, 11. Berapa mediannya?',
    pilihan: ['6', '6,5', '7', '7,5', '8'],
    benar: 2,
    langkah: [
      'Banyak data 8, genap: tengahnya data ke-4 dan ke-5.',
      'Keduanya 7, jadi median (7 + 7) : 2 = 7.',
    ],
    jebakan: '7,5 merata-ratakan 7 dan 8 (data ke-5 dan ke-6), salah menghitung posisi tengah.',
    alasan: 'Data ke-4 dan ke-5 sama-sama 7.',
  },
  {
    id: 'st-12',
    tingkat: 'sedang',
    pertanyaan: 'Gaji sembilan karyawan sekitar 5 juta, lalu satu direktur bergaji 75 juta ikut dihitung. Ukuran mana yang paling mewakili gaji orang kebanyakan di kantor itu?',
    gambar: { jenis: 'batang', kategori: ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'dir'], nilai: [4.5, 4.8, 5, 5, 5.1, 5.2, 5.5, 6, 7, 75], satuan: 'juta', sorot: [9] },
    pilihan: ['Mean, sebab memakai semua data', 'Median, sebab tidak tertarik oleh satu nilai yang jauh', 'Modus, sebab paling sering muncul', 'Jangkauan', 'Ketiganya sama saja'],
    benar: 1,
    langkah: [
      'Mean memakai NILAI tiap data: gaji 75 juta menyeretnya ke sekitar 12 juta, padahal sembilan orang bergaji 7 juta atau kurang.',
      'Median memakai POSISI: data tengah tetap sekitar 5 juta, tidak peduli seberapa besar si direktur.',
      'Untuk data miring (gaji, harga rumah), median lebih jujur.',
    ],
    jebakan: '"Mean, sebab memakai semua data" terdengar adil, tetapi justru karena memakai semua nilai, satu pencilan bisa mendominasinya.',
    alasan: 'Median tidak tertarik pencilan.',
  },
  {
    id: 'st-13',
    tingkat: 'sedang',
    pertanyaan: 'Pada sebuah boxplot, kotaknya lebar sekali. Apa artinya?',
    pilihan: ['Datanya banyak', 'Setengah data yang di tengah tersebar di rentang yang luas', 'Ada banyak pencilan', 'Rata-ratanya besar', 'Datanya sedikit'],
    benar: 1,
    langkah: [
      'Kotak membentang dari Q1 ke Q3: selalu berisi setengah data yang di tengah.',
      'Kotak lebar berarti separuh data itu tersebar luas (JAK besar).',
      'Boxplot tidak memperlihatkan BANYAK data: 10 dan 10.000 data bisa memberi boxplot yang sama.',
    ],
    jebakan: '"Datanya banyak" adalah kekeliruan paling umum tentang boxplot; lebar kotak mengukur sebaran, bukan jumlah.',
    alasan: 'Lebar kotak = JAK, sebaran separuh data tengah.',
  },
  {
    id: 'st-14',
    tingkat: 'sedang',
    pertanyaan: 'Sebuah grafik garis memperlihatkan lonjakan tajam. Ternyata sumbu-y dimulai dari 410, bukan dari 0. Apa yang sebaiknya disimpulkan?',
    gambar: { jenis: 'garis-data', kategori: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'], nilai: [412, 418, 425, 421, 430], satuan: 'orang', mulai: 410 },
    pilihan: ['Grafiknya salah dan angkanya palsu', 'Kenaikannya nyata, tetapi terlihat jauh lebih besar daripada sebenarnya', 'Kenaikannya memang besar', 'Grafik seperti itu selalu curang', 'Sumbu-y memang tidak pernah dimulai dari nol'],
    benar: 1,
    langkah: [
      'Angkanya benar: 412 sampai 430, naik 18 orang atau sekitar 4 persen.',
      'Sumbu yang dimulai dari 410 memperbesar tampilan kenaikan itu berkali-kali.',
      'Memotong sumbu tidak selalu curang (suhu tubuh misalnya wajib), asalkan diberitahukan jelas.',
    ],
    jebakan: '"Kenaikannya memang besar" membaca gambar tanpa membaca angka sumbunya. "Selalu curang" terlalu jauh: yang menentukan adalah keterbukaan.',
    alasan: 'Angkanya benar, kesannya yang dibesarkan.',
  },
  {
    id: 'st-15',
    tingkat: 'sedang',
    pertanyaan: 'Dari data yang sama persis bisa lahir dua histogram yang bentuknya berbeda. Kenapa?',
    pilihan: ['Karena salah satunya pasti salah hitung', 'Karena lebar kelasnya dipilih berbeda', 'Karena datanya diurutkan berbeda', 'Karena satunya memakai frekuensi relatif', 'Itu tidak mungkin terjadi'],
    benar: 1,
    langkah: [
      'Lebar kelas adalah pilihan manusia, bukan hasil rumus.',
      'Kelas sempit: gambar bergerigi. Kelas lebar: pola terhapus.',
      'Keduanya sah; itu sebabnya lebar kelas harus diperiksa saat membaca histogram orang lain.',
    ],
    jebakan: '"Memakai frekuensi relatif" hanya mengubah angka sumbu-y, bentuk batangnya tetap sama.',
    alasan: 'Lebar kelas mengubah bentuknya.',
  },
  {
    id: 'st-16',
    tingkat: 'sedang',
    pertanyaan: 'Diagram pencar menunjukkan titik-titik yang naik dari kiri bawah ke kanan atas dan menempel rapat pada satu garis. Bagaimana membacanya?',
    gambar: { jenis: 'grafik', fungsi: [], jangkauan: [0, 10, 40, 100], titik: [{ x: 2, y: 55 }, { x: 3, y: 58 }, { x: 4, y: 62 }, { x: 5, y: 65 }, { x: 6, y: 68 }, { x: 7, y: 72 }, { x: 8, y: 75 }, { x: 9, y: 78 }] },
    pilihan: ['Arah naik, bentuk mendekati lurus, hubungan kuat', 'Arah naik, bentuk melengkung, hubungan lemah', 'Arah turun, hubungan kuat', 'Tidak ada hubungan', 'Yang satu pasti menyebabkan yang lain'],
    benar: 0,
    langkah: [
      'Arah: naik ke kanan atas berarti korelasi positif.',
      'Bentuk: menyusuri satu garis berarti lurus.',
      'Kekuatan: menempel rapat berarti kuat.',
    ],
    jebakan: '"Yang satu pasti menyebabkan yang lain" adalah kesimpulan yang paling sering diambil dan paling sering salah: bergerak bersama bukan berarti sebab-akibat.',
    alasan: 'Positif, lurus, kuat.',
  },
  {
    // cek: (20*70 + 30*80)/50 === 76
    id: 'st-40',
    tingkat: 'sedang',
    pertanyaan: 'Kelas A (20 siswa) rata-rata 70, kelas B (30 siswa) rata-rata 80. Rata-rata gabungan kedua kelas adalah?',
    pilihan: ['76', '75', '74', '77', '78'],
    benar: 0,
    langkah: [
      'Rata-rata gabungan bukan rata-rata dari dua rata-rata; kembalikan ke jumlah dulu.',
      'Jumlah A = 20 × 70 = 1.400. Jumlah B = 30 × 80 = 2.400. Total 3.800 dari 50 siswa.',
      '3.800 : 50 = 76, lebih dekat ke 80 karena kelas B lebih banyak.',
    ],
    jebakan: '75 merata-ratakan 70 dan 80 begitu saja, mengabaikan bahwa kelas B siswanya lebih banyak.',
    alasan: '(1.400 + 2.400) : 50 = 76.',
  },
  {
    // cek: 9*5 - (5 + 8 + 10 + 12) === 10
    id: 'st-41',
    tingkat: 'sedang',
    pertanyaan: 'Data 5, 8, x, 10, 12 punya rata-rata 9. Nilai x adalah?',
    pilihan: ['10', '9', '11', '8', '35'],
    benar: 0,
    langkah: [
      'Rata-rata 9 dari 5 data berarti jumlahnya 9 × 5 = 45.',
      'Jumlah yang diketahui: 5 + 8 + 10 + 12 = 35.',
      'x = 45 - 35 = 10.',
    ],
    jebakan: '9 mengira nilai yang hilang pasti sama dengan rata-ratanya. 35 berhenti di jumlah yang diketahui.',
    alasan: '45 - 35 = 10.',
  },
  {
    id: 'st-42',
    tingkat: 'sedang',
    pertanyaan: 'Histogram nilai 40 siswa: 40-49 (3), 50-59 (8), 60-69 (12), 70-79 (9), 80-89 (6), 90-99 (2). Kelas modusnya adalah?',
    gambar: { jenis: 'batang', kategori: ['40-49', '50-59', '60-69', '70-79', '80-89', '90-99'], nilai: [3, 8, 12, 9, 6, 2], satuan: 'siswa', sorot: [2] },
    pilihan: ['60-69', '70-79', '50-59', '90-99', '40-49'],
    benar: 0,
    langkah: [
      'Kelas modus adalah kelas dengan frekuensi tertinggi.',
      'Batang tertinggi 12 siswa, pada kelas 60-69.',
    ],
    jebakan: '90-99 menggoda karena nilainya paling tinggi; yang dibandingkan BANYAK siswanya, bukan besar nilainya.',
    alasan: 'Frekuensi tertinggi 12 di kelas 60-69.',
  },
  {
    // cek: Math.abs(Math.sqrt((4+1+0+1+4)/5) - 1.41) < 0.01
    id: 'st-43',
    tingkat: 'sedang',
    pertanyaan: 'Data 1, 2, 3, 4, 5. Simpangan bakunya (pembagi n) kira-kira?',
    pilihan: ['1,41', '2', '1', '2,5', '10'],
    benar: 0,
    langkah: [
      'Mean = 15 : 5 = 3. Simpangan: -2, -1, 0, 1, 2.',
      'Kuadratkan: 4, 1, 0, 1, 4, jumlah 10. Varian = 10 : 5 = 2.',
      'Simpangan baku = √2 ≈ 1,41.',
    ],
    jebakan: '2 adalah variannya (lupa akar). 10 adalah jumlah kuadrat simpangan. 1 mengira "rata-rata jarak" tanpa kuadrat lalu dibulatkan.',
    alasan: '√(10/5) = √2 ≈ 1,41.',
  },
  {
    // cek: 40 * 90/360 === 10
    id: 'st-44',
    tingkat: 'sedang',
    pertanyaan: 'Diagram lingkaran jajanan 40 siswa: sektor "bakso" bersudut 90°. Banyak siswa yang memilih bakso?',
    pilihan: ['10', '90', '4', '20', '25'],
    benar: 0,
    langkah: [
      'Lingkaran penuh 360° mewakili 40 siswa.',
      '90° adalah 90 : 360 = seperempat.',
      'Seperempat dari 40 = 10 siswa.',
    ],
    jebakan: '90 membaca sudut sebagai jumlah orang. 25 adalah persentasenya, bukan banyak siswanya.',
    alasan: '90/360 × 40 = 10.',
  },
  {
    // cek: (430 - 421) > (425 - 418) && (430 - 421) > (418 - 412)
    id: 'st-45',
    tingkat: 'sedang',
    pertanyaan: 'Diagram garis pengunjung: Jan 412, Feb 418, Mar 425, Apr 421, Mei 430. Kenaikan terbesar terjadi antara?',
    gambar: { jenis: 'garis-data', kategori: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'], nilai: [412, 418, 425, 421, 430], satuan: 'orang', sorot: [3, 4] },
    pilihan: ['Apr ke Mei', 'Feb ke Mar', 'Jan ke Feb', 'Mar ke Apr', 'Jan ke Mei'],
    benar: 0,
    langkah: [
      'Hitung selisih tiap langkah: Jan-Feb +6, Feb-Mar +7, Mar-Apr -4, Apr-Mei +9.',
      'Terbesar +9, dari Apr ke Mei.',
    ],
    jebakan: '"Jan ke Mei" bukan langkah bersebelahan. "Feb ke Mar" menebak dari kemiringan yang terlihat curam padahal +7 < +9.',
    alasan: 'Apr ke Mei naik 9, terbesar.',
  },
  {
    // cek: (60 + 69)/2 === 64.5
    id: 'st-46',
    tingkat: 'sedang',
    pertanyaan: 'Titik tengah kelas 60-69 adalah?',
    pilihan: ['64,5', '65', '64', '69,5', '59,5'],
    benar: 0,
    langkah: [
      'Titik tengah = (batas bawah + batas atas) : 2.',
      '(60 + 69) : 2 = 64,5.',
      'Titik tengah mewakili semua nilai di kelas itu saat menghitung mean data berkelompok.',
    ],
    jebakan: '59,5 dan 69,5 adalah TEPI kelas (dipakai untuk median dan modus), bukan titik tengah. 65 membulatkan.',
    alasan: '(60 + 69)/2 = 64,5.',
  },

  /* =============================== sulit =============================== */
  {
    // cek: Math.abs(Math.sqrt(40/5) - 2.83) < 0.01
    id: 'st-17',
    tingkat: 'sulit',
    pertanyaan: 'Data: 2, 4, 6, 8, 10. Berapa simpangan bakunya? Gunakan pembagi n seperti pada buku SMA.',
    pilihan: ['2,4', '2,83', '3,16', '8', '40'],
    benar: 1,
    langkah: [
      'Mean 6. Simpangan: -4, -2, 0, 2, 4.',
      'Kuadrat: 16, 4, 0, 4, 16, jumlah 40. Varian = 40 : 5 = 8.',
      'Simpangan baku = √8 ≈ 2,83.',
    ],
    jebakan: '8 adalah varian; 40 jumlah kuadrat; 3,16 memakai pembagi 4; 2,4 merata-ratakan jarak tanpa kuadrat.',
    alasan: '√8 ≈ 2,83.',
  },
  {
    // cek: 59.5 + ((20 - 11)/12)*10 === 67
    id: 'st-18',
    tingkat: 'sulit',
    pertanyaan: 'Tabel nilai 40 siswa: 40-49 ada 3 siswa, 50-59 ada 8, 60-69 ada 12, 70-79 ada 9, 80-89 ada 6, 90-99 ada 2. Berapa mediannya?',
    gambar: { jenis: 'batang', kategori: ['40-49', '50-59', '60-69', '70-79', '80-89', '90-99'], nilai: [3, 8, 12, 9, 6, 2], satuan: 'siswa', sorot: [2] },
    pilihan: ['64,5', '65,21', '67', '67,75', '69,5'],
    benar: 2,
    langkah: [
      'Median di data ke-20 (setengah dari 40). Frekuensi kumulatif: 3, 11, 23: data ke-20 ada di kelas 60-69.',
      'Tepi bawah 59,5; sebelum kelas itu sudah ada 11 data; kelasnya berisi 12 data; lebar 10.',
      'Median = 59,5 + ((20 - 11) : 12) × 10 = 59,5 + 7,5 = 67.',
    ],
    jebakan: '67,75 adalah mean, 65,21 modus, 64,5 titik tengah kelas. Ketiganya berdekatan dan sering tertukar.',
    alasan: '59,5 + 7,5 = 67.',
  },
  {
    // cek: Math.abs(59.5 + (4/7)*10 - 65.21) < 0.01
    id: 'st-19',
    tingkat: 'sulit',
    pertanyaan: 'Dari tabel yang sama, kelas 60-69 punya frekuensi tertinggi yaitu 12, tetangga kirinya 8 dan tetangga kanannya 9. Berapa modus data berkelompoknya?',
    pilihan: ['59,5', '64,5', '65,21', '67', '69,5'],
    benar: 2,
    langkah: [
      'd1 = 12 - 8 = 4 (selisih dengan kiri), d2 = 12 - 9 = 3 (selisih dengan kanan).',
      'Modus = tepi bawah + (d1 : (d1 + d2)) × lebar = 59,5 + (4 : 7) × 10.',
      '= 59,5 + 5,71 = 65,21. Condong ke kanan dari titik tengah karena tetangga kanan lebih tinggi.',
    ],
    jebakan: '64,5 menjawab titik tengah kelas modus, tanpa melihat tetangganya. 59,5 berhenti di tepi bawah.',
    alasan: '59,5 + 40/7 ≈ 65,21.',
  },
  {
    id: 'st-20',
    tingkat: 'sulit',
    pertanyaan: 'Setiap nilai pada data 2, 4, 6, 8, 10 ditambah 5 sehingga menjadi 7, 9, 11, 13, 15. Ukuran mana yang TIDAK berubah?',
    gambar: { jenis: 'grafik', fungsi: [], jangkauan: [0, 16, 0, 3], titik: [{ x: 2, y: 1 }, { x: 4, y: 1 }, { x: 6, y: 1, label: 'lama' }, { x: 8, y: 1 }, { x: 10, y: 1 }, { x: 7, y: 2 }, { x: 9, y: 2 }, { x: 11, y: 2, label: 'baru' }, { x: 13, y: 2 }, { x: 15, y: 2 }] },
    pilihan: ['Mean', 'Median', 'Modus', 'Simpangan baku', 'Semuanya berubah'],
    benar: 3,
    langkah: [
      'Menambah tetapan menggeser SEMUA data ke kanan sejauh 5: mean, median, modus ikut naik 5.',
      'Jarak antar data tidak berubah sedikit pun.',
      'Simpangan baku hanya mengukur jarak: tetap 2,83.',
    ],
    jebakan: '"Semuanya berubah" mengira setiap ukuran ikut angkanya; simpangan baku melihat pola sebaran, bukan letaknya.',
    alasan: 'Geseran tidak mengubah jarak antar data.',
  },
  {
    // cek: Math.abs(3 * 2.83 - 8.49) < 0.01
    id: 'st-21',
    tingkat: 'sulit',
    pertanyaan: 'Setiap nilai pada data 2, 4, 6, 8, 10 dikali 3 sehingga menjadi 6, 12, 18, 24, 30. Simpangan bakunya berubah bagaimana?',
    pilihan: ['Tetap 2,83', 'Bertambah 3 menjadi 5,83', 'Menjadi 3 kali lipat, yaitu 8,49', 'Menjadi 9 kali lipat', 'Tidak bisa ditentukan'],
    benar: 2,
    langkah: [
      'Mengali tetapan meregangkan semua jarak antar data sebesar tetapan itu.',
      'Simpangan baku ikut dikali 3: 2,83 × 3 = 8,49.',
      'Variannya (kuadrat) menjadi 9 kali lipat.',
    ],
    jebakan: '"Menjadi 9 kali lipat" benar untuk VARIAN, bukan simpangan baku. "Tetap" mencampur dengan perlakuan menambah tetapan.',
    alasan: 'Dikali 3: 8,49.',
  },
  {
    // cek: Math.abs(49.2 + 3.2*7 - 71.6) < 1e-9
    id: 'st-22',
    tingkat: 'sulit',
    pertanyaan: 'Garis regresi sebuah data adalah y-topi = 49,2 + 3,2x, dengan x lama belajar dalam jam. Berapa ramalan nilai untuk siswa yang belajar 7 jam?',
    gambar: { jenis: 'grafik', fungsi: ['49.2 + 3.2*x'], jangkauan: [0, 12, 40, 90], titik: [{ x: 7, y: 71.6, label: '(7; 71,6)' }], nama: ['y = 49,2 + 3,2x'] },
    pilihan: ['52,4', '56,2', '71,6', '347,6', '76,4'],
    benar: 2,
    langkah: [
      'Substitusi x = 7: 49,2 + 3,2 × 7.',
      '3,2 × 7 = 22,4; 49,2 + 22,4 = 71,6.',
    ],
    jebakan: '347,6 menukar a dan b (3,2 + 49,2 × 7). Biasakan menyebut: a perpotongan, b kemiringan.',
    alasan: '49,2 + 22,4 = 71,6.',
  },
  {
    id: 'st-23',
    tingkat: 'sulit',
    pertanyaan: 'Pada garis regresi y-topi = 49,2 + 3,2x, apa arti angka 3,2 dalam bahasa sehari-hari?',
    pilihan: ['Nilai siswa yang tidak belajar sama sekali', 'Tiap tambahan satu jam belajar, nilai diramalkan naik sekitar 3,2 poin', 'Rata-rata nilai seluruh siswa', 'Banyak siswa yang diamati', 'Kesalahan ramalan garis itu'],
    benar: 1,
    langkah: [
      '3,2 adalah kemiringan: perubahan y untuk tiap tambahan satu satuan x.',
      'x dalam jam, y dalam poin: tiap jam belajar tambahan, nilai naik sekitar 3,2 poin.',
    ],
    jebakan: '"Nilai siswa yang tidak belajar" adalah arti 49,2 (perpotongan), dan itu pun ekstrapolasi karena tidak ada siswa yang belajar nol jam.',
    alasan: 'Kemiringan = kenaikan y per satu satuan x.',
  },
  {
    // cek: 25 + 1.5*(25 - 10) === 47.5 && 60 > 47.5 && 35 < 47.5
    id: 'st-24',
    tingkat: 'sulit',
    pertanyaan: 'Data waktu tempuh: 5, 7, 8, 10, 10, 12, 15, 15, 18, 20, 22, 25, 30, 35, 60. Dengan Q1 = 10 dan Q3 = 25, nilai mana yang ditandai pencilan oleh pagar 1,5 kali JAK?',
    pilihan: ['Tidak ada', 'Hanya 5', 'Hanya 60', '35 dan 60', '5 dan 60'],
    benar: 2,
    langkah: [
      'JAK = 25 - 10 = 15; 1,5 × JAK = 22,5.',
      'Pagar bawah = 10 - 22,5 = -12,5; pagar atas = 25 + 22,5 = 47,5.',
      'Hanya 60 yang di luar pagar. 35 masih di bawah 47,5; 5 jauh di atas -12,5.',
    ],
    jebakan: '"35 dan 60" menandai apa pun yang "terasa jauh"; pagar memberi batas yang bisa dihitung, dan 35 masih di dalam.',
    alasan: 'Pagar atas 47,5: hanya 60 di luarnya.',
  },
  {
    // cek: Math.abs((44.5*3 + 54.5*8 + 64.5*12 + 74.5*9 + 84.5*6 + 94.5*2)/40 - 67.75) < 1e-9
    id: 'st-47',
    tingkat: 'sulit',
    pertanyaan: 'Dari tabel 40 siswa (40-49: 3, 50-59: 8, 60-69: 12, 70-79: 9, 80-89: 6, 90-99: 2), mean data berkelompoknya adalah?',
    gambar: { jenis: 'batang', kategori: ['44,5', '54,5', '64,5', '74,5', '84,5', '94,5'], nilai: [3, 8, 12, 9, 6, 2], satuan: 'siswa (titik tengah)' },
    pilihan: ['67,75', '67', '65,21', '69,5', '70'],
    benar: 0,
    langkah: [
      'Tiap kelas diwakili titik tengahnya: 44,5; 54,5; 64,5; 74,5; 84,5; 94,5.',
      'Kalikan dengan frekuensi lalu jumlahkan: 133,5 + 436 + 774 + 670,5 + 507 + 189 = 2.710.',
      'Mean = 2.710 : 40 = 67,75.',
    ],
    jebakan: '67 adalah median, 65,21 modus. 70 merata-ratakan titik tengah tanpa bobot frekuensi.',
    alasan: '2.710 : 40 = 67,75.',
  },
  {
    // cek: [5,7,8,10,10,12,15,15,18,20,22,25,30,35,60][3] === 10
    id: 'st-48',
    tingkat: 'sulit',
    pertanyaan: 'Data waktu tempuh terurut (15 data): 5, 7, 8, 10, 10, 12, 15, 15, 18, 20, 22, 25, 30, 35, 60. Kuartil bawah Q1 adalah?',
    pilihan: ['10', '8', '9', '12', '15'],
    benar: 0,
    langkah: [
      'Median = data ke-8 = 15.',
      'Separuh kiri (tanpa median): 5, 7, 8, 10, 10, 12, 15; tengahnya data ke-4 = 10.',
      'Q1 = 10.',
    ],
    jebakan: '9 merata-ratakan 8 dan 10 seolah separuh kirinya genap; separuh kiri berisi 7 data, ganjil.',
    alasan: 'Median dari 7 data kiri adalah 10.',
  },
  {
    id: 'st-49',
    tingkat: 'sulit',
    pertanyaan: 'Diagram pencar jumlah jam bermain gim (x) dan nilai ujian (y): titik-titik turun dari kiri atas ke kanan bawah dan cukup rapat. Kesimpulan yang tepat?',
    gambar: { jenis: 'grafik', fungsi: [], jangkauan: [0, 8, 30, 100], titik: [{ x: 1, y: 90 }, { x: 2, y: 82 }, { x: 3, y: 78 }, { x: 4, y: 70 }, { x: 5, y: 66 }, { x: 6, y: 58 }, { x: 7, y: 52 }] },
    pilihan: ['Korelasi negatif kuat: makin lama bermain, nilai cenderung makin rendah', 'Korelasi positif kuat', 'Tidak ada korelasi', 'Bermain gim pasti menyebabkan nilai turun', 'Korelasi negatif lemah'],
    benar: 0,
    langkah: [
      'Arah turun ke kanan: negatif.',
      'Titik rapat menyusuri garis: kuat.',
      'Kata "cenderung" penting: korelasi menyatakan pola, bukan sebab-akibat.',
    ],
    jebakan: '"Pasti menyebabkan" melompat ke sebab-akibat; bisa saja siswa yang sudah kesulitan belajar lari ke gim, atau ada faktor ketiga.',
    alasan: 'Negatif kuat, tanpa klaim sebab-akibat.',
  },
  {
    // cek: Math.abs(55 - 3.2*2 - 48.6) < 1e-9
    id: 'st-50',
    tingkat: 'sulit',
    pertanyaan: 'Garis regresi punya kemiringan b = 3,2 dan melalui titik (2, 55). Nilai perpotongan a-nya adalah?',
    pilihan: ['48,6', '61,4', '55', '3,2', '27,5'],
    benar: 0,
    langkah: [
      'Garis y = a + bx harus dipenuhi titik (2, 55): 55 = a + 3,2 × 2.',
      'a = 55 - 6,4 = 48,6.',
    ],
    jebakan: '61,4 menambah 6,4 alih-alih mengurangi. 27,5 membagi 55 dengan 2, mengira a adalah rata-rata.',
    alasan: '55 - 6,4 = 48,6.',
  },
  {
    // cek: 30 + 1.5*(30 - 20) === 45 && 48 > 45
    id: 'st-51',
    tingkat: 'sulit',
    pertanyaan: 'Suatu data punya Q1 = 20 dan Q3 = 30. Manakah nilai yang termasuk pencilan menurut pagar 1,5 kali JAK?',
    pilihan: ['48', '44', '40', '35', '5'],
    benar: 0,
    langkah: [
      'JAK = 30 - 20 = 10; 1,5 × JAK = 15.',
      'Pagar bawah 20 - 15 = 5, pagar atas 30 + 15 = 45.',
      'Pencilan adalah yang DI LUAR pagar: hanya 48 (> 45). Nilai 5 tepat di pagar, belum di luar.',
    ],
    jebakan: '5 menggoda karena jauh dari kotak, tetapi ia tepat di pagar bawah, bukan melewatinya. 44 masih di bawah 45.',
    alasan: 'Pagar atas 45; 48 di luarnya.',
  },
  {
    // cek: 25 + 10 === 35
    id: 'st-52',
    tingkat: 'sulit',
    pertanyaan: 'Sekumpulan data punya median 25 dan simpangan baku 4. Semua nilai ditambah 10. Median dan simpangan baku yang baru?',
    pilihan: ['Median 35, simpangan baku 4', 'Median 35, simpangan baku 14', 'Median 25, simpangan baku 4', 'Median 25, simpangan baku 14', 'Median 35, simpangan baku 40'],
    benar: 0,
    langkah: [
      'Menambah 10 menggeser semua data: data tengah pun bergeser, median jadi 35.',
      'Jarak antar data tetap, jadi simpangan baku tetap 4.',
    ],
    jebakan: '"Simpangan baku 14" menambahkan 10 pada sebaran; sebaran mengukur jarak, dan jarak tidak berubah oleh geseran.',
    alasan: 'Median +10, simpangan baku tetap.',
  },
  {
    // cek: 3 + 8 + 12 === 23
    id: 'st-53',
    tingkat: 'sulit',
    pertanyaan: 'Dari tabel 40 siswa (40-49: 3, 50-59: 8, 60-69: 12, 70-79: 9, 80-89: 6, 90-99: 2), berapa siswa yang nilainya kurang dari 70?',
    gambar: { jenis: 'batang', kategori: ['40-49', '50-59', '60-69', '70-79', '80-89', '90-99'], nilai: [3, 8, 12, 9, 6, 2], satuan: 'siswa', sorot: [0, 1, 2] },
    pilihan: ['23', '20', '11', '17', '32'],
    benar: 0,
    langkah: [
      'Kurang dari 70 berarti kelas 40-49, 50-59, dan 60-69.',
      '3 + 8 + 12 = 23 siswa (frekuensi kumulatif sampai 69).',
    ],
    jebakan: '11 berhenti di kelas 50-59. 32 memasukkan kelas 70-79 yang nilainya sudah 70 ke atas.',
    alasan: '3 + 8 + 12 = 23.',
  },

  /* ============================ sangat sulit ============================ */
  {
    id: 'st-25',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sekumpulan data punya koefisien korelasi r = 0. Manakah yang benar?',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-3.5, 3.5, -1, 10], titik: [{ x: -3, y: 9 }, { x: -2, y: 4 }, { x: -1, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 4 }, { x: 3, y: 9 }] },
    pilihan: ['Kedua peubah pasti tidak berhubungan sama sekali', 'Tidak ada hubungan LURUS, tetapi bisa saja berhubungan melengkung', 'Datanya pasti salah kumpul', 'Garis regresinya tidak ada', 'Kedua peubah pasti berhubungan terbalik'],
    benar: 1,
    langkah: [
      'r hanya mengukur seberapa lurus hubungannya.',
      'Contoh gambar: x dari -3 sampai 3 dengan y = x² punya r tepat 0, padahal y bisa ditebak sempurna dari x.',
      'Karena itu r tidak boleh dibaca tanpa diagram pencarnya.',
    ],
    jebakan: '"Pasti tidak berhubungan" adalah bacaan paling umum dan keliru: nol hanya berarti tidak ada kecenderungan LURUS.',
    alasan: 'r nol tidak menutup hubungan melengkung.',
  },
  {
    id: 'st-26',
    tingkat: 'sangat sulit',
    pertanyaan: 'Penjualan es krim dan jumlah orang tenggelam ternyata naik bersamaan dengan korelasi kuat. Kesimpulan mana yang paling tepat?',
    pilihan: ['Es krim menyebabkan orang tenggelam', 'Orang tenggelam menyebabkan penjualan es krim naik', 'Ada faktor ketiga, misalnya cuaca panas, yang menaikkan keduanya', 'Korelasinya pasti salah hitung', 'Keduanya tidak berhubungan sama sekali'],
    benar: 2,
    langkah: [
      'Korelasi kuat punya empat kemungkinan penjelasan: A menyebabkan B, B menyebabkan A, faktor ketiga, atau kebetulan.',
      'Cuaca panas menaikkan penjualan es krim dan jumlah orang berenang sekaligus.',
      'Ilustrasi ini dipakai untuk menjelaskan, bukan hasil penelitian tertentu.',
    ],
    jebakan: '"Keduanya tidak berhubungan" keliru: korelasinya nyata; yang tidak ada adalah hubungan sebab-akibat langsung.',
    alasan: 'Faktor ketiga: cuaca panas.',
  },
  {
    // cek: Math.abs(49.2 + 3.2*40 - 177.2) < 1e-9
    id: 'st-27',
    tingkat: 'sangat sulit',
    pertanyaan: 'Garis regresi y-topi = 49,2 + 3,2x dibuat dari data siswa yang belajar 2 sampai 11 jam. Dipakai untuk meramal siswa yang belajar 40 jam, hasilnya 177,2. Apa masalahnya?',
    gambar: { jenis: 'grafik', fungsi: ['49.2 + 3.2*x'], jangkauan: [0, 42, 40, 190], titik: [{ x: 2, y: 55.6, label: 'data 2 sampai 11' }, { x: 11, y: 84.4 }, { x: 40, y: 177.2, label: '177,2?' }], tegak: [11] },
    pilihan: ['Tidak ada masalah, rumusnya sudah benar', 'Ekstrapolasi terlalu jauh, dan nilainya mustahil sebab maksimal 100', 'Seharusnya memakai median', 'Angka 40 kurang besar', 'Garisnya harus dihitung ulang'],
    benar: 1,
    langkah: [
      'Hitungannya benar: 49,2 + 128 = 177,2. Justru itu jebakannya.',
      '40 jam jauh di luar rentang data 2 sampai 11 jam: ekstrapolasi.',
      'Garisnya tidak tahu nilai ujian dibatasi 100; hubungannya pasti berubah di luar rentang data.',
    ],
    jebakan: '"Garisnya harus dihitung ulang" salah sasaran: garisnya benar untuk rentang datanya; yang salah adalah memakainya jauh di luar rentang itu.',
    alasan: 'Ekstrapolasi jauh, hasil mustahil.',
  },
  {
    // cek: Math.abs(Math.sqrt(0.97) - 0.98) < 0.01
    id: 'st-28',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah data punya koefisien determinasi r kuadrat sama dengan 0,97. Apa artinya?',
    pilihan: ['Ramalannya benar 97 persen', 'Sekitar 97 persen keragaman y bisa dijelaskan oleh garis yang memakai x', '97 persen datanya tepat di garis', 'Korelasinya 0,97', 'Kesalahannya 97 persen'],
    benar: 1,
    langkah: [
      'r² adalah bagian keragaman y yang bisa dijelaskan garis regresi.',
      '0,97 berarti 97 persen dijelaskan, 3 persen dari hal lain.',
      'r-nya sendiri √0,97 ≈ 0,98, bukan 0,97.',
    ],
    jebakan: '"Ramalannya benar 97 persen" dan "97 persen data tepat di garis" mengubah ukuran keragaman menjadi ukuran ketepatan; keduanya bukan arti r².',
    alasan: 'r² = bagian keragaman yang dijelaskan.',
  },
  {
    // cek: 2*6 + 5 === 17 && Math.abs(2*2.83 - 5.66) < 1e-9
    id: 'st-29',
    tingkat: 'sangat sulit',
    pertanyaan: 'Data 2, 4, 6, 8, 10 punya mean 6 dan simpangan baku 2,83. Setiap nilai dikali 2 lalu ditambah 5. Berapa mean dan simpangan baku yang baru?',
    pilihan: ['Mean 12, simpangan baku 5,66', 'Mean 17, simpangan baku 5,66', 'Mean 17, simpangan baku 10,66', 'Mean 17, simpangan baku 2,83', 'Mean 12, simpangan baku 2,83'],
    benar: 1,
    langkah: [
      'Mean ikut kedua perlakuan: 2 × 6 + 5 = 17.',
      'Simpangan baku hanya ikut perkalian: 2 × 2,83 = 5,66; penambahan 5 menggeser tanpa mengubah jarak.',
    ],
    jebakan: '"10,66" menambahkan 5 juga pada simpangan baku. "Mean 12" lupa +5 pada mean.',
    alasan: 'Mean 17, simpangan baku 5,66.',
  },
  {
    // cek: (2*12 + 2*4)/4 === 8
    id: 'st-30',
    tingkat: 'sangat sulit',
    pertanyaan: 'Pada histogram, dua kelas bersebelahan digabung. Kelas 8-10 tingginya 12 dan kelas 10-12 tingginya 4. Berapa tinggi kelas gabungan 8-12?',
    gambar: { jenis: 'batang', kategori: ['8-10', '10-12', '8-12 gabungan'], nilai: [12, 4, 8], sorot: [2] },
    pilihan: ['4', '8', '12', '16', '32'],
    benar: 1,
    langkah: [
      'Yang dipertahankan LUAS batang (banyak data), bukan tinggi.',
      'Luas 8-10 = 2 × 12 = 24; luas 10-12 = 2 × 4 = 8; jumlah 32.',
      'Kelas gabungan lebar 4: tinggi = 32 : 4 = 8.',
    ],
    jebakan: '16 menjumlahkan tinggi; itu keliru karena kelasnya juga dua kali lebih lebar.',
    alasan: 'Luas 32 dibagi lebar 4 = 8.',
  },
  {
    id: 'st-31',
    tingkat: 'sangat sulit',
    pertanyaan: 'Mean dari tabel data berkelompok terhitung 67,75, sedangkan mean dari angka aslinya 68. Kenapa berbeda?',
    pilihan: ['Ada kesalahan hitung pada salah satunya', 'Karena tiap kelas diwakili titik tengahnya, jadi hasilnya hampiran', 'Karena tabelnya memakai frekuensi relatif', 'Karena banyak datanya berbeda', 'Seharusnya keduanya selalu sama'],
    benar: 1,
    langkah: [
      'Pada data berkelompok, nilai asli tiap data sudah hilang; tiap kelas diwakili titik tengahnya.',
      'Itu tebakan yang masuk akal, bukan nilai sebenarnya, jadi hasilnya hampiran.',
      'Kalau data menumpuk di satu ujung kelas, selisihnya bisa lebih besar dari 0,25.',
    ],
    jebakan: '"Ada kesalahan hitung" mengira dua cara harus memberi angka yang sama; pengelompokan memang membuang ketelitian.',
    alasan: 'Titik tengah adalah hampiran.',
  },
  {
    id: 'st-32',
    tingkat: 'sangat sulit',
    pertanyaan: 'Pada data gaji, satu nilai ditarik makin jauh ke kanan. Mean ikut bergerak tetapi median berhenti. Kenapa median tidak bergerak?',
    pilihan: ['Karena median selalu bilangan bulat', 'Karena median hanya memakai posisi data, bukan nilainya', 'Karena median dihitung sebelum data diurutkan', 'Karena median mengabaikan data terbesar', 'Karena datanya genap'],
    benar: 1,
    langkah: [
      'Mean memakai nilai tiap data dengan bobot penuh: satu nilai raksasa menyeretnya.',
      'Bagi median, data itu cuma "yang paling kanan": 75 juta atau 750 juta posisinya sama.',
      'Median memakai data terbesar, tetapi hanya sebagai urutan, bukan nilai.',
    ],
    jebakan: '"Mengabaikan data terbesar" hampir benar tetapi keliru: median menghitungnya sebagai satu anggota, hanya tidak peduli besarnya.',
    alasan: 'Median bekerja pada posisi.',
  },
  {
    // cek: (80*60 - 78*61)/2 === 21
    id: 'st-54',
    tingkat: 'sangat sulit',
    pertanyaan: 'Rata-rata nilai 80 peserta adalah 60. Dua peserta didiskualifikasi, dan rata-rata 78 peserta sisanya menjadi 61. Rata-rata nilai dua peserta yang didiskualifikasi itu?',
    pilihan: ['21', '22', '23', '20', '41'],
    benar: 0,
    langkah: [
      'Jumlah semula: 80 × 60 = 4.800.',
      'Jumlah 78 sisa: 78 × 61 = 4.758.',
      'Jumlah dua peserta: 4.800 - 4.758 = 42; rata-ratanya 42 : 2 = 21.',
    ],
    jebakan: '41 berhenti di selisih tanpa dibagi dua (dan salah hitung 1). Kuncinya: rata-rata berubah, kembalikan dulu ke jumlah.',
    alasan: '(4.800 - 4.758) : 2 = 21.',
  },
  {
    // cek: [4, 10, 22].every(x => { const d = [1,7,5,2,5,x]; const m = d.reduce((a,b)=>a+b,0)/6; return d.includes(m) }) && 4 + 10 + 22 === 36
    id: 'st-55',
    tingkat: 'sangat sulit',
    pertanyaan: 'Data 1, 7, 5, 2, 5, x (x bilangan bulat positif) punya rata-rata yang sama dengan salah satu nilai datanya. Jumlah semua nilai x yang mungkin adalah?',
    pilihan: ['36', '26', '32', '10', '40'],
    benar: 0,
    langkah: [
      'Jumlah data = 20 + x, rata-rata = (20 + x) : 6. Rata-rata harus sama dengan 1, 2, 5, 7, atau x.',
      'Sama dengan 7: 20 + x = 42, x = 22. Sama dengan 5: x = 10. Sama dengan x: 20 + x = 6x, x = 4.',
      'Sama dengan 1 atau 2 memberi x negatif, tidak boleh. Jadi x = 4, 10, atau 22; jumlahnya 36.',
    ],
    jebakan: '32 melupakan kasus rata-rata = x sendiri (x = 4). 26 melupakan x = 10. Soal ini menuntut memeriksa SEMUA kandidat, termasuk x sendiri.',
    alasan: 'x = 4, 10, 22; jumlah 36.',
  },
  {
    // cek: 10*16 - 10*15 === 10 && 24 - 10 === 14
    id: 'st-56',
    tingkat: 'sangat sulit',
    pertanyaan: 'Rata-rata sepuluh bilangan adalah 15. Satu bilangan diganti dengan 24, dan rata-ratanya menjadi 16. Bilangan yang diganti itu?',
    pilihan: ['14', '15', '13', '10', '9'],
    benar: 0,
    langkah: [
      'Jumlah semula 10 × 15 = 150; jumlah baru 10 × 16 = 160.',
      'Jumlah naik 10 karena satu bilangan diganti 24: bilangan lama = 24 - 10 = 14.',
    ],
    jebakan: '15 mengira yang diganti adalah rata-ratanya. 10 menjawab besar kenaikannya, bukan bilangannya.',
    alasan: '24 - (160 - 150) = 14.',
  },
  {
    // cek: 5 + 7 + 8 + 10 + 10 === 40
    id: 'st-57',
    tingkat: 'sangat sulit',
    pertanyaan: 'Lima bilangan bulat positif punya mean 8, median 8, dan modus tunggal 10. Nilai TERKECIL yang mungkin dari data itu?',
    pilihan: ['5', '1', '4', '6', '7'],
    benar: 0,
    langkah: [
      'Urutkan a ≤ b ≤ 8 ≤ d ≤ e; jumlahnya 40.',
      'Modus tunggal 10 berarti 10 muncul paling sering: d = e = 10 (dua kali), dan tidak ada nilai lain yang muncul dua kali.',
      'a + b = 40 - 8 - 20 = 12 dengan a < b < 8 (harus berbeda supaya modus tetap tunggal): b paling besar 7, jadi a = 5.',
      'Data: 5, 7, 8, 10, 10. Memenuhi semua syarat.',
    ],
    jebakan: '1 mengira nilai terkecil bebas; tetapi a + b harus 12 dan b tidak boleh melebihi 8. 6 memberi a = b = 6, modusnya jadi dua (6 dan 10).',
    alasan: 'a + b = 12, b ≤ 7, a ≠ b: a = 5.',
  },
  {
    // cek: (151 + 145)/2 === 148
    id: 'st-58',
    tingkat: 'sangat sulit',
    pertanyaan: 'Rata-rata tinggi badan satu kelas 148 cm. Dua siswa baru bergabung, tingginya 151 cm dan 145 cm. Rata-rata kelas sekarang?',
    pilihan: ['Tetap 148 cm', 'Naik sedikit', 'Turun sedikit', 'Tidak bisa ditentukan tanpa banyak siswa', 'Menjadi 148,5 cm'],
    benar: 0,
    langkah: [
      'Rata-rata dua siswa baru: (151 + 145) : 2 = 148, sama dengan rata-rata kelas.',
      'Menambahkan data yang rata-ratanya sama dengan rata-rata lama tidak menggeser rata-rata, berapa pun banyak siswanya.',
      'Periksa: kelas n siswa berjumlah 148n; ditambah 296 jadi 148n + 296 = 148(n + 2), dibagi n + 2 tetap 148.',
    ],
    jebakan: '"Tidak bisa ditentukan tanpa banyak siswa" menggoda karena rumus mean gabungan biasanya butuh n; di sini n tersingkir karena rata-rata pendatang sama persis.',
    alasan: 'Pendatang berrata-rata 148, mean tetap.',
  },
  {
    // cek: Math.abs(49.5 + ((10 - 3)/8)*10 - 58.25) < 1e-9
    id: 'st-59',
    tingkat: 'sangat sulit',
    pertanyaan: 'Dari tabel 40 siswa (40-49: 3, 50-59: 8, 60-69: 12, 70-79: 9, 80-89: 6, 90-99: 2), kuartil bawah Q1 data berkelompoknya adalah?',
    gambar: { jenis: 'batang', kategori: ['40-49', '50-59', '60-69', '70-79', '80-89', '90-99'], nilai: [3, 8, 12, 9, 6, 2], satuan: 'siswa', sorot: [1] },
    pilihan: ['58,25', '54,5', '59,5', '57,5', '52,5'],
    benar: 0,
    langkah: [
      'Q1 di data ke-10 (seperempat dari 40). Kumulatif: 3, lalu 11: data ke-10 ada di kelas 50-59.',
      'Tepi bawah 49,5; sebelumnya 3 data; kelas berisi 8; lebar 10.',
      'Q1 = 49,5 + ((10 - 3) : 8) × 10 = 49,5 + 8,75 = 58,25.',
    ],
    jebakan: '54,5 menjawab titik tengah kelasnya. 59,5 adalah tepi atasnya. Rumus kuartil sama dengan rumus median, hanya posisinya n/4.',
    alasan: '49,5 + 8,75 = 58,25.',
  },
  {
    // cek: Math.abs(0.8*0.8 - 0.64) < 1e-9
    id: 'st-60',
    tingkat: 'sangat sulit',
    pertanyaan: 'Koefisien korelasi jam belajar dan nilai ujian adalah r = 0,8. Berapa persen keragaman nilai ujian yang dijelaskan garis regresinya?',
    pilihan: ['64 persen', '80 persen', '40 persen', '89 persen', '16 persen'],
    benar: 0,
    langkah: [
      'Yang menyatakan bagian keragaman adalah r², bukan r.',
      'r² = 0,8² = 0,64: 64 persen keragaman nilai dijelaskan oleh jam belajar, 36 persen oleh hal lain.',
    ],
    jebakan: '80 persen membaca r sebagai persentase; 89 persen (√0,8) membalik arah kuadratnya.',
    alasan: 'r² = 0,64.',
  },
]
