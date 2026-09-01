/**
 * Bank soal kuis Limit: 32 soal, delapan untuk tiap tingkat.
 *
 * Bentuknya mengikuti bank soal Trigonometri: tiap sesi mengambil 8 soal dan
 * menghindari soal yang sudah pernah keluar, jadi empat sesi pertama tidak
 * mengulang satu soal pun.
 *
 * TINGKAT KESULITAN dikalibrasi ke buku Matematika Tingkat Lanjut Kelas XII
 * (Edisi Revisi 2025) Kemendikdasmen, Bab 2 bagian A.1. Campurannya sengaja
 * beragam: definisi yang harus dipahami, hitungan dua langkah, membaca tabel,
 * bentuk tak tentu, limit trigonometri, dan kekontinuan fungsi sepotong.
 *
 * SEMUA SOAL TULISAN SENDIRI, tidak menyalin dari buku mana pun, jadi tidak ada
 * keterangan sumber (aturan proyek: soal salinan wajib bersumber).
 *
 * SELURUH JAWABAN NUMERIK SUDAH DIPERIKSA MESIN dengan sympy:
 * `python alat/cek_soal.py alat/soal-kuis-limit.json` memberi 28 dari 28 lolos.
 * Empat soal sisanya soal konsep yang tidak punya jawaban berupa angka.
 */

import type { SoalKuis } from '@/content/tipe'

export const KUIS: SoalKuis[] = [
  /* ---------------------------------------------------------- mudah */
  {
    id: 'k01',
    tingkat: 'mudah',
    pertanyaan: 'Limit sebuah fungsi di titik c menanyakan hal apa?',
    pilihan: [
      'Berapa nilai f(c) kalau x diletakkan tepat di c',
      'Ke mana f(x) menuju saat x mendekati c dari kiri dan dari kanan',
      'Berapa nilai terbesar f(x) di sekitar c',
      'Apakah f(x) memotong sumbu di c',
      'Berapa kemiringan grafik f di titik c',
    ],
    benar: 1,
    alasan: 'Limit menanyakan tujuan, bukan keadaan. Nilai f(c) itu pertanyaan yang berbeda, dan Materi 03 dan 04 menunjukkan keduanya bisa berbeda jauh.',
  },
  {
    id: 'k02',
    tingkat: 'mudah',
    pertanyaan: 'Berapa limit (x + 4) untuk x mendekati 3?',
    pilihan: ['3', '4', '7', '12', 'tidak ada'],
    benar: 2,
    alasan: 'x + 4 adalah suku banyak, jadi kontinu di mana-mana dan boleh langsung disubstitusi. Hasilnya 3 + 4 = 7.',
  },
  {
    id: 'k03',
    tingkat: 'mudah',
    pertanyaan: 'Berapa limit dari angka 9 untuk x mendekati 2?',
    pilihan: ['2', '9', '18', '0', 'tidak ada'],
    benar: 1,
    alasan: 'Ini sifat limit yang pertama: limit sebuah angka tetap adalah angka itu sendiri. Angka 9 tidak berubah walaupun x bergerak, jadi jawabannya tetap 9.',
  },
  {
    id: 'k04',
    tingkat: 'mudah',
    pertanyaan: 'Limit kiri sebuah fungsi di titik c bernilai 5, dan limit kanannya juga 5. Berapa limitnya di c?',
    pilihan: ['5', '10', '0', 'tidak ada', 'bergantung nilai f(c)'],
    benar: 0,
    alasan: 'Limit ada kalau kedua arah sepakat, dan nilainya adalah angka yang disepakati itu. Nilai f(c) tidak ikut menentukan, itu urusan kekontinuan di Materi 09.',
  },
  {
    id: 'k05',
    tingkat: 'mudah',
    pertanyaan: 'Limit kiri sebuah fungsi di titik c bernilai 2, sedangkan limit kanannya 7. Berapa limitnya di c?',
    pilihan: ['2', '7', '4,5', '9', 'limitnya tidak ada'],
    benar: 4,
    alasan: 'Kedua arah harus sepakat. Karena berbeda, tidak ada satu angka yang dituju, jadi limitnya tidak ada. Bukan rata-ratanya, bukan salah satunya.',
  },
  {
    id: 'k06',
    tingkat: 'mudah',
    pertanyaan: 'Berapa limit x² untuk x mendekati -3?',
    pilihan: ['-9', '9', '-6', '6', '3'],
    benar: 1,
    alasan: 'Substitusi langsung: (-3)² = 9. Tanda negatifnya hilang karena dikuadratkan. Yang memilih -9 biasanya menguadratkan 3 dulu baru memasang tanda minusnya.',
  },
  {
    id: 'k07',
    tingkat: 'mudah',
    pertanyaan: 'Kalau angkanya dimasukkan dan hasilnya 0 dibagi 0, apa artinya?',
    pilihan: [
      'Limitnya pasti 0',
      'Limitnya pasti 1',
      'Limitnya pasti tidak ada',
      'Bentuknya belum memberi tahu apa-apa dan harus ditulis ulang',
      'Fungsinya salah tulis',
    ],
    benar: 3,
    alasan: 'Bentuk 0 dibagi 0 disebut bentuk tak tentu. Buktinya ia belum memberi tahu apa-apa: (x² - 1) : (x - 1) limitnya 2, sedangkan (x² - 4) : (x - 2) limitnya 4, padahal keduanya 0 dibagi 0.',
  },
  {
    id: 'k08',
    tingkat: 'mudah',
    pertanyaan: 'Berapa limit (2x + 1) : (x + 3) untuk x mendekati 1?',
    pilihan: ['3/4', '4/3', '1', '3', 'tidak ada'],
    benar: 0,
    alasan: 'Periksa penyebutnya dulu: 1 + 3 = 4, bukan nol, jadi substitusi sah. Pembilangnya 2 + 1 = 3. Hasilnya 3/4.',
  },

  /* --------------------------------------------------------- sedang */
  {
    id: 'k09',
    tingkat: 'sedang',
    pertanyaan: 'Berapa limit (x² - 25) : (x - 5) untuk x mendekati 5?',
    pilihan: ['0', '5', '10', '25', 'tidak ada'],
    benar: 2,
    alasan: 'Substitusi memberi 0 dibagi 0. Faktorkan: (x - 5)(x + 5) : (x - 5), coret, sisanya x + 5. Masukkan 5, hasilnya 10.',
  },
  {
    id: 'k10',
    tingkat: 'sedang',
    pertanyaan: 'Fungsi f(x) = (x² - 1) : (x - 1) tidak punya nilai di x = 1. Berapa limitnya untuk x mendekati 1?',
    pilihan: ['0', '1', '2', 'tidak ada, karena f(1) tidak ada', 'tak hingga'],
    benar: 2,
    alasan: 'Nilai fungsi dan limit dua hal berbeda. Untuk x bukan 1, bentuknya sama dengan x + 1, jadi limitnya 2. Pilihan keempat menggoda, tapi limit justru dibuat supaya bisa menjawab walaupun titiknya bolong.',
  },
  {
    id: 'k11',
    tingkat: 'sedang',
    pertanyaan: 'Berapa limit sin x dibagi x untuk x mendekati 0, dengan x dalam radian?',
    pilihan: ['0', '1', 'sin', 'tidak ada', 'tak hingga'],
    benar: 1,
    alasan: 'Ini hasil yang dibuktikan lewat perbandingan luas di lingkaran satuan. Pilihan "sin" muncul kalau x dicoret seperti bilangan biasa, padahal sin bukan bilangan melainkan nama fungsi.',
  },
  {
    id: 'k12',
    tingkat: 'sedang',
    pertanyaan: 'Berapa limit (3x + 1) : (x - 2) saat x menuju tak hingga?',
    pilihan: ['0', '1/2', '3', 'tak hingga', 'tidak ada'],
    benar: 2,
    alasan: 'Pangkat tertinggi atas dan bawah sama-sama 1, jadi limitnya perbandingan angka di depannya: 3 dibagi 1 sama dengan 3.',
  },
  {
    id: 'k13',
    tingkat: 'sedang',
    pertanyaan: 'Manakah yang BUKAN syarat sebuah fungsi kontinu di titik c?',
    pilihan: [
      'f(c) harus ada',
      'limit f(x) di c harus ada',
      'limitnya harus sama dengan f(c)',
      'grafiknya tidak boleh punya sudut tajam di c',
      'ketiga syarat di atas harus terpenuhi sekaligus',
    ],
    benar: 3,
    alasan: 'Kontinu hanya menuntut grafiknya tidak putus, bukan tidak bersudut. Grafik nilai mutlak berbentuk huruf V tetap kontinu di titik sudutnya, karena pensilnya tidak perlu diangkat.',
  },
  {
    id: 'k14',
    tingkat: 'sedang',
    pertanyaan: 'Berapa limit (x² - x - 6) : (x - 3) untuk x mendekati 3?',
    pilihan: ['0', '3', '5', '6', 'tidak ada'],
    benar: 2,
    alasan: 'Substitusi memberi 0 dibagi 0. Faktorkan pembilangnya: (x - 3)(x + 2). Coret (x - 3), sisanya x + 2. Masukkan 3, hasilnya 5.',
  },
  {
    id: 'k15',
    tingkat: 'sedang',
    pertanyaan: 'Berapa limit (2x + 7) : (x² + 1) saat x menuju tak hingga?',
    pilihan: ['0', '2', '7', 'tak hingga', 'tidak ada'],
    benar: 0,
    alasan: 'Pangkat penyebut 2, pangkat pembilang 1. Penyebutnya tumbuh jauh lebih cepat, jadi pecahannya mengecil terus menuju 0.',
  },
  {
    id: 'k16',
    tingkat: 'sedang',
    pertanyaan: 'Berapa limit sin 4x dibagi 2x untuk x mendekati 0?',
    pilihan: ['1/2', '1', '2', '4', '8'],
    benar: 2,
    alasan: 'Aturannya: sin ax dibagi bx menuju a dibagi b. Di sini 4 dibagi 2 sama dengan 2. Yang menjawab 1 biasanya mengira semua bentuk sinus dibagi x hasilnya selalu 1, padahal angka di depan sudutnya ikut menentukan.',
  },

  /* ---------------------------------------------------------- sulit */
  {
    id: 'k17',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit (√(x + 9) - 3) : x untuk x mendekati 0?',
    pilihan: ['0', '1/6', '1/3', '3', 'tidak ada'],
    benar: 1,
    alasan: 'Ada akar, jadi kalikan dengan sekawan √(x + 9) + 3. Pembilangnya jadi (x + 9) - 9 = x, lalu dicoret dengan penyebutnya. Sisanya 1 : (√(x + 9) + 3), masukkan 0 jadi 1 : 6.',
  },
  {
    id: 'k18',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit tan 3x dibagi sin 5x untuk x mendekati 0?',
    pilihan: ['0', '3/5', '5/3', '1', '15'],
    benar: 1,
    alasan: 'Untuk sudut kecil, tan ax dan sin ax sama-sama berperilaku seperti ax. Jadi perbandingannya 3 dibagi 5. Aturan ini berlaku untuk campuran tan dan sin sekaligus.',
  },
  {
    id: 'k19',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit (x³ - 8) : (x - 2) untuk x mendekati 2?',
    pilihan: ['0', '4', '8', '12', 'tidak ada'],
    benar: 3,
    alasan: 'Bentuk selisih pangkat tiga: x³ - 8 = (x - 2)(x² + 2x + 4). Coret (x - 2), sisanya x² + 2x + 4. Masukkan 2: 4 + 4 + 4 = 12.',
  },
  {
    id: 'k20',
    tingkat: 'sulit',
    pertanyaan: 'Fungsi f didefinisikan f(x) = (x² - 9) : (x - 3) untuk x bukan 3, dan f(3) = a. Berapa a supaya f kontinu di x = 3?',
    pilihan: ['0', '3', '6', '9', 'tidak ada nilai a yang cocok'],
    benar: 2,
    alasan: 'Kontinu menuntut nilai sama dengan limitnya. Untuk x bukan 3, bentuknya sama dengan x + 3, jadi limitnya 6. Maka a harus 6.',
  },
  {
    id: 'k21',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit (x² - 4) : (x² - x - 2) untuk x mendekati 2?',
    pilihan: ['1', '4/3', '3/4', '0', 'tidak ada'],
    benar: 1,
    alasan: 'Kedua-duanya difaktorkan: (x - 2)(x + 2) dibagi (x - 2)(x + 1). Coret (x - 2), sisanya (x + 2) : (x + 1). Masukkan 2: 4 dibagi 3.',
  },
  {
    id: 'k22',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit (1 - cos x) dibagi x untuk x mendekati 0?',
    pilihan: ['0', '1/2', '1', '2', 'tidak ada'],
    benar: 0,
    alasan: 'Kalikan dengan sekawan (1 + cos x). Pembilangnya jadi 1 - cos²x = sin²x. Bentuknya berubah jadi (sin x : x) dikali (sin x : (1 + cos x)), yaitu 1 dikali (0 : 2) sama dengan 0. Hati-hati membedakannya dengan soal yang penyebutnya x kuadrat.',
  },
  {
    id: 'k23',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit √(x² + 3x) - x saat x menuju tak hingga?',
    pilihan: ['0', '3/2', '3', 'tak hingga', 'tidak ada'],
    benar: 1,
    alasan: 'Bentuk tak hingga dikurangi tak hingga. Kalikan dengan sekawan √(x² + 3x) + x. Pembilangnya jadi 3x, lalu bagi semuanya dengan x. Hasilnya 3 dibagi (1 + 1) sama dengan 3/2.',
  },
  {
    id: 'k24',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit nilai mutlak (x - 4) dibagi (x - 4) untuk x mendekati 4?',
    pilihan: ['1', '-1', '0', 'limitnya tidak ada', 'tak hingga'],
    benar: 3,
    alasan: 'Dari kanan, x - 4 positif sehingga nilai mutlaknya sama dengan dirinya dan hasilnya 1. Dari kiri, x - 4 negatif sehingga hasilnya -1. Kedua arah tidak sepakat, jadi limitnya tidak ada.',
  },

  /* --------------------------------------------------- sangat sulit */
  {
    id: 'k25',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit (x - 3) dibagi (√(x + 1) - 2) untuk x mendekati 3?',
    pilihan: ['1/4', '2', '4', '0', 'tidak ada'],
    benar: 2,
    alasan: 'Kalikan dengan sekawan penyebutnya, yaitu √(x + 1) + 2. Penyebutnya jadi (x + 1) - 4 = x - 3, yang dicoret dengan pembilangnya. Sisanya √(x + 1) + 2, masukkan 3: 2 + 2 = 4.',
  },
  {
    id: 'k26',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit sin(x - 2) dibagi (x² - 4) untuk x mendekati 2?',
    pilihan: ['0', '1/4', '1/2', '1', 'tidak ada'],
    benar: 1,
    alasan: 'Faktorkan penyebutnya jadi (x - 2)(x + 2). Pisahkan menjadi [sin(x - 2) : (x - 2)] dikali [1 : (x + 2)]. Bagian pertama menuju 1, bagian kedua menuju 1 dibagi 4.',
  },
  {
    id: 'k27',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit √(4x² + x) - 2x saat x menuju tak hingga?',
    pilihan: ['0', '1/4', '1/2', '1', 'tak hingga'],
    benar: 1,
    alasan: 'Kalikan dengan sekawan √(4x² + x) + 2x. Pembilangnya jadi x. Bagi semuanya dengan x, penyebutnya menuju 2 + 2 = 4. Hasilnya 1 dibagi 4.',
  },
  {
    id: 'k28',
    tingkat: 'sangat sulit',
    pertanyaan: 'Fungsi f didefinisikan: f(x) = ax + 1 untuk x kurang dari 2, dan f(x) = x² - 3 untuk x lebih besar atau sama dengan 2. Berapa a supaya f kontinu di x = 2?',
    pilihan: ['-1', '0', '1', '2', 'tidak ada nilai a yang cocok'],
    benar: 1,
    alasan: 'Limit kanan dan nilai f(2) sama-sama 4 - 3 = 1. Limit kirinya 2a + 1. Supaya kontinu, 2a + 1 harus sama dengan 1, jadi a = 0.',
  },
  {
    id: 'k29',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit (1 - cos 2x) dibagi x kuadrat untuk x mendekati 0?',
    pilihan: ['0', '1/2', '1', '2', '4'],
    benar: 3,
    alasan: 'Pakai 1 - cos 2x = 2 sin²x. Bentuknya jadi 2 dikali (sin x : x) dikali (sin x : x), yaitu 2 dikali 1 dikali 1 sama dengan 2. Bandingkan dengan soal serupa yang penyebutnya hanya x, jawabannya 0.',
  },
  {
    id: 'k30',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit (x² - 5x + 6) : (x² - 4) untuk x mendekati 2?',
    pilihan: ['1/4', '-1/4', '0', '-1', 'tidak ada'],
    benar: 1,
    alasan: 'Faktorkan keduanya: (x - 2)(x - 3) dibagi (x - 2)(x + 2). Coret (x - 2), sisanya (x - 3) : (x + 2). Masukkan 2: (-1) dibagi 4. Tanda minusnya mudah hilang kalau pemfaktorannya terburu-buru.',
  },
  {
    id: 'k31',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit (tan x - sin x) dibagi x pangkat tiga untuk x mendekati 0?',
    pilihan: ['0', '1/6', '1/2', '1', 'tidak ada'],
    benar: 2,
    alasan: 'Tulis tan x - sin x sebagai sin x dikali (1 - cos x) dibagi cos x. Bentuknya jadi (sin x : x) dikali [(1 - cos x) : x²] dikali (1 : cos x), yaitu 1 dikali 1/2 dikali 1 sama dengan 1/2.',
  },
  {
    id: 'k32',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit x dikali sin(1 dibagi x) saat x menuju tak hingga?',
    pilihan: ['0', '1', 'tak hingga', 'tidak ada', 'bergantung nilai x'],
    benar: 1,
    alasan: 'Misalkan u = 1 dibagi x. Saat x menuju tak hingga, u menuju 0, dan bentuknya berubah menjadi sin u dibagi u. Jawabannya 1. Yang menjawab 0 biasanya mengira sin(1 : x) menuju 0 sehingga seluruhnya nol, padahal x-nya membesar tanpa batas dan keduanya saling mengimbangi.',
  },
]
