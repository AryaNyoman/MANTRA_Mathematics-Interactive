/**
 * Latihan dan rujukan luar untuk topik Limit.
 *
 * SOAL DITULIS SENDIRI, tapi tingkat kesulitannya dikalibrasi dulu ke buku
 * Matematika Tingkat Lanjut Kelas XII (Edisi Revisi 2025) Kemendikdasmen,
 * Bab 2 bagian A.1. Pola yang ditiru dari buku itu (polanya, bukan soalnya):
 *   - Contoh Soal 2.1 : menerapkan sifat limit langkah demi langkah
 *   - Contoh Soal 2.3 : memeriksa kekontinuan fungsi sepotong-sepotong,
 *                       jawabannya menuntut tiga syarat diperiksa satu per satu
 *   - Ayo Mencoba 2.2 : bentuk 0 dibagi 0 yang harus ditulis ulang dulu
 * Tanpa kalibrasi ini, soal buatan Claude cenderung satu langkah dan terlalu
 * mudah. Itu temuan ARYA, bukan dugaan.
 *
 * SELURUH JAWABAN SUDAH DIPERIKSA MESIN dengan sympy:
 * `python alat/cek_soal.py alat/soal-latihan-limit.json` memberi 5 dari 5 lolos.
 */

import type { KanalPerSubbab, Soal } from '@/content/tipe'
import { K, kanal } from '../kanal-youtube.ts'

export const LATIHAN: Soal[] = [
  {
    no: 1,
    label: 'membaca tabel',
    pertanyaan:
      'Sebuah fungsi f menghasilkan angka berikut. Untuk x = 1,9 nilainya 4,75; untuk x = 1,99 nilainya 4,975; untuk x = 2 nilainya 7; untuk x = 2,01 nilainya 5,025; untuk x = 2,1 nilainya 5,25. Berapakah limit f(x) untuk x mendekati 2?',
    pilihan: ['5', '7', '6', 'limitnya tidak ada', '0'],
    benar: 0,
    jawaban: '5',
    pembahasan: [
      'Dari kiri: 4,75 lalu 4,975. Angkanya merapat ke 5.',
      'Dari kanan: 5,25 lalu 5,025. Angkanya juga merapat ke 5.',
      'Kedua arah sepakat menuju 5, jadi limitnya 5.',
      'Nilai f(2) = 7 sengaja dipasang berbeda, dan itu tidak mengubah apa pun. Limit hanya melihat tetangga, bukan titiknya sendiri.',
      'Kalau Anda memilih 7, Anda sedang membaca nilai fungsi, bukan limit. Itu persis salah paham yang dilawan Materi 03 dan 04.',
    ],
  },
  {
    no: 2,
    label: 'memeriksa syarat',
    pertanyaan:
      'Manakah limit berikut yang TIDAK boleh dihitung dengan langsung memasukkan angkanya?',
    pilihan: [
      'lim (x² + 3x) saat x mendekati 1',
      'lim (x + 5) : (x - 3) saat x mendekati 1',
      'lim (x + 5) : (x - 3) saat x mendekati 3',
      'lim √(x + 7) saat x mendekati 2',
      'lim 4 saat x mendekati 9',
    ],
    benar: 2,
    jawaban: 'lim (x + 5) : (x - 3) saat x mendekati 3',
    pembahasan: [
      'Aturannya: substitusi langsung sah kalau penyebutnya tidak nol di titik itu, dan isi akarnya tidak negatif.',
      'Pilihan pertama suku banyak, selalu aman.',
      'Pilihan kedua penyebutnya 1 - 3 = -2, bukan nol, jadi aman. Hasilnya -3.',
      'Pilihan ketiga penyebutnya 3 - 3 = 0, sedangkan pembilangnya 8, bukan nol. Substitusi gugur.',
      'Perhatikan bahwa ini BUKAN bentuk 0 dibagi 0. Karena pembilangnya bukan nol, nilainya membesar tanpa batas dan grafiknya punya asimtot tegak di x = 3.',
      'Pilihan keempat isi akarnya 9, tidak negatif. Pilihan kelima angka tetap, limitnya angka itu sendiri.',
    ],
  },
  {
    no: 3,
    label: 'menemukan kesalahan',
    pertanyaan:
      'Seorang siswa mengerjakan limit (x² - 9) : (x - 3) saat x mendekati 3 seperti ini: "Pembilang dan penyebutnya sama-sama nol, jadi hasilnya 0 dibagi 0, dan berapa pun dibagi dirinya sendiri adalah 1. Jadi limitnya 1." Di mana letak kesalahannya, dan berapa jawaban yang benar?',
    pilihan: [
      'Kesalahannya menganggap 0 dibagi 0 sama dengan 1. Jawaban yang benar 6',
      'Tidak ada kesalahan, jawabannya memang 1',
      'Kesalahannya karena tidak boleh memfaktorkan. Jawaban yang benar 3',
      'Kesalahannya di penyebut. Jawaban yang benar 0',
      'Limitnya tidak ada, karena penyebutnya nol',
    ],
    benar: 0,
    jawaban: 'Kesalahannya menganggap 0 dibagi 0 sama dengan 1. Jawaban yang benar 6',
    pembahasan: [
      'Bentuk 0 dibagi 0 bukan bilangan, jadi ia tidak sama dengan 1 dan tidak sama dengan 0.',
      'Ia disebut bentuk tak tentu: bentuk itu belum memberi tahu apa-apa dan harus ditulis ulang.',
      'Faktorkan pembilangnya: x² - 9 = (x - 3)(x + 3).',
      'Coret (x - 3), sah karena x bukan 3, dan limit memang tidak pernah meletakkan x tepat di 3.',
      'Sisanya x + 3. Masukkan 3, hasilnya 6.',
      'Bukti bahwa 0 dibagi 0 tidak bisa dijawab langsung: bentuk (x² - 4) : (x - 2) di x = 2 juga 0 dibagi 0, tapi limitnya 4, bukan 6.',
    ],
  },
  {
    no: 4,
    label: 'dua langkah',
    pertanyaan:
      'Sebuah fungsi didefinisikan begini: f(x) = (x² - 4) : (x - 2) untuk x yang bukan 2, dan f(2) = a. Berapa nilai a supaya f kontinu di x = 2?',
    pilihan: ['0', '2', '4', '6', 'tidak ada nilai a yang membuatnya kontinu'],
    benar: 2,
    jawaban: '4',
    pembahasan: [
      'Kontinu di x = 2 menuntut tiga hal: f(2) ada, limitnya ada, dan keduanya sama.',
      'Syarat pertama sudah dijamin, karena f(2) memang ditetapkan bernilai a.',
      'Sekarang cari limitnya. Untuk x bukan 2, (x² - 4) : (x - 2) = (x - 2)(x + 2) : (x - 2) = x + 2.',
      'Jadi limitnya 2 + 2 = 4.',
      'Syarat ketiga menuntut a sama dengan limitnya, jadi a = 4.',
      'Kalau a diisi angka lain, katakanlah 6, fungsinya tetap punya nilai dan tetap punya limit, tetapi keduanya berbeda. Itu persis keadaan "geser satu titik" pada alat di Materi 09.',
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Kanal YouTube berbahasa Indonesia untuk belajar lebih dalam.        */
/* Kami menautkan KANAL-nya, bukan video tertentu, supaya tautannya    */
/* tidak mati saat video dihapus atau diganti pemiliknya.              */
/* ------------------------------------------------------------------ */

export const KANAL: KanalPerSubbab = {
  // A · Konsep Limit
  A: [
    kanal(K.m4thlab, 'konsep dasar limit fungsi aljabar'),
    kanal(K.bigCourse, 'limit fungsi aljabar'),
    kanal(K.billykur, 'limit kelas 11'),
  ],
  // B · Sifat Limit dan Cara Menghitungnya
  B: [
    kanal(K.matematikaHebat, 'limit fungsi aljabar substitusi pemfaktoran'),
    kanal(K.ajarPipolondo, 'tipe soal limit fungsi aljabar'),
    kanal(K.seekorLebah, 'limit fungsi aljabar'),
  ],
  // C · Limit Trigonometri dan Kekontinuan
  C: [
    kanal(K.m4thlab, 'limit fungsi trigonometri'),
    kanal(K.bigCourse, 'limit trigonometri'),
    kanal(K.privatAlFaiz, 'limit fungsi trigonometri'),
  ],
  // D · Penerapan Limit
  D: [
    kanal(K.m4thlab, 'limit tak hingga'),
    kanal(K.zeroTutorial, 'limit tak hingga'),
    kanal(K.privatAlFaiz, 'limit tak hingga'),
  ],
}