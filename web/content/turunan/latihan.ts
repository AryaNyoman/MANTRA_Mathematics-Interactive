/**
 * Latihan dan rujukan luar untuk topik Turunan.
 *
 * SOAL DITULIS SENDIRI, tapi tingkat kesulitannya dikalibrasi dulu ke buku
 * Matematika Tingkat Lanjut Kelas XII (Edisi Revisi 2025) Kemendikdasmen,
 * Bab 2. Pola yang ditiru dari buku itu, polanya dan bukan soalnya:
 *   - Contoh Soal 2.8 dan Ayo Mencoba 2.6 : persamaan garis singgung yang
 *     titiknya HARUS DICARI DULU, bukan diberikan. Soal buku bahkan meminta
 *     titik potong kurva dengan sebuah garis terlebih dahulu.
 *   - Ayo Mencoba 2.8 dan 2.9 : titik ekstrem, dan jenisnya harus diputuskan.
 *   - Latihan Soal Aplikasi Turunan : soal cerita yang rumusnya disusun sendiri.
 * Tanpa kalibrasi ini, soal buatan Claude cenderung satu langkah dan terlalu
 * mudah. Itu temuan ARYA, bukan dugaan. Keempat soal di bawah semuanya menuntut
 * paling sedikit dua langkah, dan pengecohnya adalah kekeliruan yang memang
 * sering terjadi, bukan angka asal.
 *
 * SELURUH JAWABAN SUDAH DIPERIKSA MESIN dengan sympy:
 * `python alat/cek_turunan.py alat/soal-latihan-turunan.json`.
 */

import type { KanalPerSubbab, Soal } from '@/content/tipe'
import { K, kanal } from '../kanal-youtube.ts'

export const LATIHAN: Soal[] = [
  {
    no: 1,
    label: 'membaca tanda',
    pertanyaan:
      'Fungsi f(x) = x³ - 6x² + 9x. Pada selang manakah fungsi ini TURUN?',
    pilihan: [
      '1 < x < 3',
      'x < 1 atau x > 3',
      '0 < x < 2',
      'x > 3 saja',
      'fungsi ini tidak pernah turun',
    ],
    benar: 0,
    jawaban: '1 < x < 3',
    pembahasan: [
      'Langkah 1, turunkan: f′(x) = 3x² - 12x + 9.',
      'Langkah 2, cari akarnya: 3x² - 12x + 9 = 0, bagi 3 menjadi x² - 4x + 3 = 0, lalu faktorkan (x - 1)(x - 3) = 0. Akarnya x = 1 dan x = 3.',
      'Langkah 3, uji tanda di tiap selang. Di x = 0: f′(0) = 9, positif, berarti naik.',
      'Di x = 2: f′(2) = 12 - 24 + 9 = -3, negatif, berarti turun.',
      'Di x = 4: f′(4) = 48 - 48 + 9 = 9, positif, berarti naik lagi.',
      'Jadi fungsinya turun hanya di antara kedua akar itu, yaitu 1 < x < 3.',
      'Pilihan kedua adalah selang tempat fungsinya NAIK. Kalau Anda memilihnya, tandanya terbalik: periksa lagi nilai f′ di sebuah titik di dalam selang, jangan menebak dari bentuk kurvanya.',
    ],
  },
  {
    no: 2,
    label: 'dua aturan sekaligus',
    pertanyaan:
      'Diketahui f(x) = (2x - 1)³(x + 4). Berapakah f′(1)?',
    pilihan: ['31', '16', '6', '5', '24'],
    benar: 0,
    jawaban: '31',
    pembahasan: [
      'Bentuknya hasil kali, dan salah satu bagiannya bertingkat. Jadi aturan hasil kali dan aturan rantai dipakai bersama.',
      'Ambil u = (2x - 1)³ dan v = x + 4.',
      'Turunan u memakai aturan rantai: bagian luarnya pangkat tiga, bagian dalamnya 2x - 1 yang turunannya 2. Jadi u′ = 3(2x - 1)² · 2 = 6(2x - 1)².',
      'Turunan v sederhana: v′ = 1.',
      'Susun: f′(x) = 6(2x - 1)²(x + 4) + (2x - 1)³ · 1.',
      'Masukkan x = 1, sehingga 2x - 1 = 1: f′(1) = 6 · 1 · 5 + 1 = 30 + 1 = 31.',
      'Kalau Anda mendapat 16, pengali 2 dari aturan rantai tertinggal: 3 · 1 · 5 + 1 = 16. Itu kekeliruan paling sering di materi ini.',
      'Kalau Anda mendapat 6, hanya suku pertama yang dihitung dan aturan hasil kalinya terlupa.',
    ],
  },
  {
    no: 3,
    label: 'titiknya dicari dulu',
    pertanyaan:
      'Kurva y = x² - 4x + 5 memotong garis y = 5 di dua titik. Tentukan persamaan garis singgung kurva itu di titik potong yang absisnya positif.',
    pilihan: [
      'y = 4x - 11',
      'y = -4x + 5',
      'y = 4x + 5',
      'y = 4x - 5',
      'y = 5',
    ],
    benar: 0,
    jawaban: 'y = 4x - 11',
    pembahasan: [
      'Soal ini dua lapis: titik singgungnya belum diberikan, jadi harus dicari dulu.',
      'Langkah 1, cari titik potongnya: x² - 4x + 5 = 5, sehingga x² - 4x = 0, lalu x(x - 4) = 0. Absisnya x = 0 dan x = 4.',
      'Yang diminta absis positif, jadi x = 4. Ordinatnya 5, sesuai garis y = 5. Titiknya (4, 5).',
      'Langkah 2, cari gradiennya: f′(x) = 2x - 4, maka m = f′(4) = 8 - 4 = 4.',
      'Langkah 3, susun persamaannya: y - 5 = 4(x - 4), lalu y = 4x - 16 + 5 = 4x - 11.',
      'Periksa: masukkan x = 4 ke jawabannya, hasilnya 16 - 11 = 5. Cocok dengan ordinat titik singgungnya, jadi garisnya memang lewat titik itu.',
      'Pilihan y = -4x + 5 memakai titik potong yang salah, yaitu x = 0. Pilihan y = 4x + 5 memakai gradien yang benar tetapi lupa menggeser garisnya lewat titik singgungnya.',
    ],
  },
  {
    no: 4,
    label: 'rumusnya disusun sendiri',
    pertanyaan:
      'Seorang peternak punya pagar sepanjang 60 meter untuk membuat kandang berbentuk persegi panjang. Salah satu sisi kandang memakai tembok yang sudah ada, jadi sisi itu tidak perlu dipagari. Berapa luas kandang terbesar yang bisa dibuat?',
    pilihan: ['450 m²', '900 m²', '225 m²', '400 m²', '300 m²'],
    benar: 0,
    jawaban: '450 m²',
    pembahasan: [
      'Langkah 1, susun rumusnya. Sebut x panjang sisi yang tegak lurus tembok. Sisi itu ada DUA, dan sisi yang sejajar tembok ada satu.',
      'Pagar yang terpakai: 2x + sisi sejajar = 60, jadi sisi sejajarnya 60 - 2x.',
      'Luasnya L(x) = x(60 - 2x) = 60x - 2x².',
      'Langkah 2, turunkan: L′(x) = 60 - 4x.',
      'Langkah 3, samakan nol: 60 - 4x = 0, jadi x = 15.',
      'Langkah 4, pastikan itu maksimum. L′(10) = 20, positif; L′(20) = -20, negatif. Tandanya berubah dari positif ke negatif, jadi x = 15 memang titik balik maksimum.',
      'Langkah 5, hitung yang DITANYAKAN, yaitu luasnya: L(15) = 15 · (60 - 30) = 15 · 30 = 450 m².',
      'Pilihan 225 m² adalah 15², yaitu luas kalau kandangnya dikira persegi. Pilihan 900 m² adalah luas kalau keempat sisinya dianggap tidak ada yang gratis. Kalau Anda menjawab 15, yang Anda tulis panjang sisinya, bukan luasnya: perhatikan satuannya, pertanyaan meminta m² bukan m.',
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Kami menautkan KANAL-nya, bukan video tertentu, supaya tautannya    */
/* tidak mati saat video dihapus atau diganti pemiliknya.              */
/*                                                                     */
/* Keempat kanal ini DIPAKAI ULANG dari topik Limit, yang handle dan    */
/* tautannya sudah diperiksa sesi itu. Sesi ini tidak punya cara        */
/* memeriksa kanal baru, dan menebak handle YouTube adalah cara paling  */
/* cepat menghasilkan tautan mati. Yang diganti hanya kata kunci        */
/* pencariannya, disesuaikan dengan topik ini.                          */
/* ------------------------------------------------------------------ */

export const KANAL: KanalPerSubbab = {
  // A · Kemiringan yang Berubah
  A: [
    kanal(K.m4thlab, 'konsep dasar turunan fungsi aljabar'),
    kanal(K.bigCourse, 'aplikasi turunan aljabar definisi'),
    kanal(K.quipper, 'turunan fungsi aljabar'),
  ],
  // B · Aturan Menurunkan
  B: [
    kanal(K.matematikaHebat, 'turunan fungsi aljabar'),
    kanal(K.bigCourse, 'turunan trigonometri'),
    kanal(K.m4thlab, 'turunan fungsi trigonometri'),
  ],
  // C · Turunan untuk Membaca Grafik
  C: [
    kanal(K.m4thlab, 'aplikasi turunan gradien garis singgung'),
    kanal(K.matematikaHebat, 'nilai maksimum dan minimum'),
    kanal(K.bigCourse, 'aplikasi turunan aljabar'),
  ],
  // D · Penerapan Turunan
  D: [
    kanal(K.m4thlab, 'aplikasi turunan'),
    kanal(K.matematikaHebat, 'fungsi naik fungsi turun nilai stasioner'),
    kanal(K.privatAlFaiz, 'aplikasi turunan fungsi naik dan turun'),
  ],
}