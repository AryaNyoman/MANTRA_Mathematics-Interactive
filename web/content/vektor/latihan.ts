import type { KanalPerSubbab, Soal } from '@/content/tipe'
import { K, kanal } from '../kanal-youtube.ts'

/**
 * Latihan terbimbing topik Vektor: 4 soal pilihan ganda A sampai E.
 *
 * KALIBRASI KESULITAN
 * Ditakar ke Latihan 3.1 sampai 3.6 pada Buku Panduan Guru Matematika SMA/SMK
 * Kelas X (Kemendikbudristek 2021), halaman 108 sampai 133. Soal di sana bukan
 * cuma menjumlahkan dua vektor: ada komponen tiga dimensi, ada pembuktian
 * tiga titik segaris lewat kelipatan, dan ada resultan yang dibaca dari peta.
 * Karena itu soal keempat di bawah memakai bentuk segaris, bukan penjumlahan
 * biasa. Aturan proyek: soal buatan sendiri cenderung terlalu mudah.
 *
 * PENGECOHNYA BUKAN ASAL SALAH
 * Tiap pilihan yang salah adalah satu kekeliruan yang memang sering terjadi dan
 * sudah dibahas di kotak "Sering keliru" pada materinya, sehingga siswa yang
 * memilihnya tetap belajar sesuatu.
 *
 * SELURUH ANGKA SUDAH DIPERIKSA MESIN:
 *   python alat/cek_vektor.py alat/soal-latihan-vektor.json
 * Hasilnya 12 dari 12 lolos. Kalau ada angka yang diubah, jalankan lagi.
 */
export const LATIHAN: Soal[] = [
  {
    no: 1,
    label: 'Vektor dari dua titik',
    pertanyaan: 'Diketahui titik A(1, -2) dan B(5, 4). Vektor AB adalah ...',
    pilihan: ['(4  6)', '(-4  -6)', '(6  2)', '(4  -6)', '(5  4)'],
    benar: 0,
    jawaban: '(4  6)',
    pembahasan: [
      'Aturannya ujung dikurangi pangkal. Yang jadi ujung adalah B, yang jadi pangkal adalah A.',
      'Komponen mendatar: 5 dikurangi 1, hasilnya 4.',
      'Komponen tegak: 4 dikurangi negatif 2, hasilnya 4 ditambah 2, yaitu 6.',
      'Jadi vektor AB adalah (4  6).',
      'Periksa dengan menggambar: dari A(1, -2) melangkah 4 ke kanan sampai x sama dengan 5, lalu 6 ke atas sampai y sama dengan 4. Betul mendarat di B.',
    ],
  },
  {
    no: 2,
    label: 'Resultan dua gaya',
    pertanyaan: 'Dua gaya bekerja pada satu titik: 5 newton ke arah timur dan 12 newton ke arah utara. Besar resultannya adalah ...',
    pilihan: ['13 newton', '17 newton', '7 newton', '8,5 newton', '60 newton'],
    benar: 0,
    jawaban: '13 newton',
    pembahasan: [
      'Timur dijadikan arah mendatar positif dan utara arah tegak positif, jadi kedua gaya itu (5  0) dan (0  12).',
      'Keduanya bekerja serentak dari satu titik, jadi dipakai metode jajar genjang. Resultannya (5  12).',
      'Besarnya dicari dengan Pythagoras: akar dari 5 kuadrat ditambah 12 kuadrat.',
      'Yaitu akar dari 25 ditambah 144, sama dengan akar 169, hasilnya 13 newton.',
      'Pilihan 17 muncul kalau kedua besarnya langsung dijumlahkan. Itu hanya benar kalau keduanya searah, padahal di sini keduanya tegak lurus.',
    ],
  },
  {
    no: 3,
    label: 'Vektor satuan',
    pertanyaan: 'Vektor satuan yang searah dengan v = (-6  8) adalah ...',
    pilihan: ['(-0,6  0,8)', '(-6  8)', '(0,6  -0,8)', '(-0,43  0,57)', '(-3  4)'],
    benar: 0,
    jawaban: '(-0,6  0,8)',
    pembahasan: [
      'Cari panjang v lebih dulu: akar dari negatif 6 kuadrat ditambah 8 kuadrat.',
      'Yaitu akar dari 36 ditambah 64, sama dengan akar 100, hasilnya 10.',
      'Bagi tiap komponen dengan 10: negatif 6 dibagi 10 sama dengan negatif 0,6, dan 8 dibagi 10 sama dengan 0,8.',
      'Jadi vektor satuannya (-0,6  0,8).',
      'Periksa panjangnya: akar dari 0,36 ditambah 0,64 sama dengan akar 1, yaitu 1. Benar.',
      'Pilihan (-0,43  0,57) muncul kalau pembaginya 14, yaitu 6 ditambah 8. Yang jadi pembagi adalah panjangnya, bukan jumlah komponennya.',
    ],
  },
  {
    no: 4,
    label: 'Tiga titik segaris',
    pertanyaan: 'Titik A(-3, 2), B(1, 5), dan C(p, 11) terletak pada satu garis lurus. Nilai p adalah ...',
    pilihan: ['9', '5', '8', '11', '13'],
    benar: 0,
    jawaban: '9',
    pembahasan: [
      'Tiga titik segaris berarti vektor AB dan vektor BC sejajar, yaitu yang satu kelipatan yang lain.',
      'Cari AB dulu: (1 dikurangi negatif 3, 5 dikurangi 2) sama dengan (4  3).',
      'Lalu BC: (p dikurangi 1, 11 dikurangi 5) sama dengan (p minus 1, 6).',
      'Komponen tegaknya sudah bisa dibandingkan: 6 dibagi 3 sama dengan 2, jadi pengalinya 2.',
      'Karena itu komponen mendatarnya juga harus 2 kali: p dikurangi 1 sama dengan 2 dikali 4, yaitu 8.',
      'Maka p sama dengan 9. Periksa: BC menjadi (8  6), dan itu memang tepat 2 kali (4  3).',
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Kanal YouTube berbahasa Indonesia untuk belajar lebih dalam.        */
/* Kami menautkan KANAL-nya, bukan video tertentu, supaya tautannya    */
/* tidak mati saat video dihapus atau diganti pemiliknya.              */
/* ------------------------------------------------------------------ */

export const KANAL: KanalPerSubbab = {
  // A · Pengenalan Vektor
  A: [
    kanal(K.m4thlab, 'konsep dasar vektor', '5jKGcT-JYtw', 'Konsep Dasar Vektor (Vektor Bagian 1) Matematika Peminatan Kelas 10 - m4thlab'),
    kanal(K.quipper, 'vektor definisi vektor posisi', 'kGRP6kECWjs', 'Vektor (Definisi Vektor, Vektor Posisi, & Panjang Vektor) - Matematika Kelas 10 - Quipper Video'),
    kanal(K.jendelaSains, 'definisi vektor', 'd0Nn9Wr3eZE', 'Vektor • Part 1: Definisi Vektor dan Cara Menyatakan Vektor'),
  ],
  // B · Vektor dalam Sistem Koordinat
  B: [
    kanal(K.quipper, 'vektor posisi panjang vektor', 'kGRP6kECWjs', 'Vektor (Definisi Vektor, Vektor Posisi, & Panjang Vektor) - Matematika Kelas 10 - Quipper Video'),
    kanal(K.m4thlab, 'vektor posisi', 'BQBF7iIQfYk', 'Vektor Posisi (Vektor Bagian 2) Matematika Peminatan Kelas 10 - m4thlab'),
    kanal(K.bigCourse, 'vektor part 1 penjelasan dan operasi vektor', 'kLHRRj2COPE', 'Matematika kelas X - Vektor part 1 - Penjelasan dan Operasi Vektor'),
  ],
  // C · Operasi Vektor
  C: [
    kanal(K.m4thlab, 'operasi vektor', '31XXrJbBZQ8', 'Operasi Vektor Secara Analitik dan Geometri  (Vektor Bagian 3) Matematika Peminatan Kelas 10'),
    kanal(K.matematikaHebat, 'penjumlahan dan pengurangan vektor', 'vLT9YlEIQWg', 'cara muda penjumlahan dan pengurangan bentuk VEKTOR'),
    kanal(K.jendelaSains, 'operasi vektor', 'HWGx525jTtg', 'Vektor Fisika • Part 2: Konsep & Operasi Vektor (Penjumlahan, Pengurangan, Perkalian)'),
  ],
  // D · Perkalian Titik dan Proyeksi
  D: [
    kanal(K.m4thlab, 'perkalian skalar dua vektor', 'pvSE0bdLpuQ', 'Perkalian Skalar Dua Vektor | Perkalian Titik | Dot Product (Vektor Bagian 7) MTK Peminatan Kelas X'),
    kanal(K.matematikaHebat, 'vektor besar sudut antara dua vektor', 'OqImUl7ZzOM', 'VEKTOR - Besar sudut antara dua vektor'),
    kanal(K.m4thlab, 'vektor proyeksi', 'hzdvzb3Nmi0', 'Panjang Proyeksi dan Proyeksi Skalar (Vektor Bagian 8) | Matematika Peminatan Kelas X'),
  ],
  // E · Penerapan Vektor
  E: [
    kanal(K.bigCourse, 'vektor fisika', '-vh_vqZkBiQ', 'Fisika kelas X - Vektor part 1 - Cara Menggambar dan Menghitung Vektor'),
    kanal(K.quipper, 'vektor fisika besaran vektor', 'OJrffDuVXjM', 'Vektor Fisika Kelas 10 - Besaran Vektor - Kurikulum 2013 Revisi (Quipper Video)'),
    kanal(K.jendelaSains, 'vektor fisika operasi vektor', 'HWGx525jTtg', 'Vektor Fisika • Part 2: Konsep & Operasi Vektor (Penjumlahan, Pengurangan, Perkalian)'),
  ],
}