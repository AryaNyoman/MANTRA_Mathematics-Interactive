import type { KanalPerSubbab, Soal } from '@/content/tipe'
import { K, kanal } from '../kanal-youtube.ts'

/**
 * Latihan di dalam halaman topik Grafik Fungsi: 4 soal pilihan ganda A sampai E.
 *
 * KALIBRASI TINGKAT KESULITAN
 * Soal buatan Claude cenderung terlalu mudah, itu temuan ARYA dan bukan dugaan.
 * Jadi sebelum satu soal pun ditulis, yang dibaca dulu adalah kunci jawaban
 * Latihan 6.1 sampai 6.6 dan Uji Kompetensi Bab 6 buku Panduan Guru Kelas X
 * (halaman cetak 175 sampai 192), Latihan 1.5 dan 1.6 bab Eksponen dan
 * Logaritma (halaman cetak 43 sampai 46), serta Uji Kompetensi Bab 1 buku
 * Kelas XI (halaman cetak 63).
 *
 * Yang ditemukan di sana, dan ditiru di sini:
 *   - koefisiennya BUKAN selalu 1. Contoh bukunya y = 2x² - 4x - 16
 *   - soalnya sering BERBALIK arah: yang diketahui hasilnya, yang dicari
 *     koefisiennya. Contoh bukunya "diketahui f(f(x)) = 4x + 6, tentukan b"
 *   - angkanya bukan bilangan kecil yang rapi. Contoh bukunya 71.460 dan 18,05
 *
 * PENGECOHNYA BUKAN ASAL SALAH. Tiap butir adalah kekeliruan yang memang sering
 * terjadi, jadi siswa yang memilihnya tetap belajar sesuatu dari pembahasannya.
 *
 * SELURUH ANGKA DI BERKAS INI DIPERIKSA MESIN lewat
 * `python alat/cek_grafik_fungsi.py alat/soal-grafik-fungsi.json`.
 */

export const LATIHAN: Soal[] = [
  {
    no: 1,
    label: 'Menyusun dari puncak',
    pertanyaan:
      'Sebuah grafik fungsi kuadrat mempunyai puncak di titik (3, -4) dan melalui titik (1, 4). Tentukan bentuk umum fungsinya.',
    pilihan: [
      'y = 2x² - 12x + 14',
      'y = 2x² + 12x + 14',
      'y = x² - 6x + 5',
      'y = 2x² - 12x + 22',
      'y = 2x² - 6x + 14',
    ],
    benar: 0,
    jawaban: 'y = 2x² - 12x + 14',
    pembahasan: [
      'Yang diketahui puncaknya, jadi mulai dari bentuk puncak: y = a(x - 3)² - 4.',
      'Masukkan titik (1, 4) untuk mencari a: 4 = a(1 - 3)² - 4, yaitu 4 = 4a - 4.',
      'Dari situ 4a = 8, jadi a = 2. Rumusnya y = 2(x - 3)² - 4.',
      'Jabarkan kurungnya: y = 2(x² - 6x + 9) - 4 = 2x² - 12x + 18 - 4.',
      'Hasilnya y = 2x² - 12x + 14.',
      'Pilihan B keliru tandanya: puncak di x = 3 memberi kurung (x - 3), bukan (x + 3). Pilihan C menganggap a selalu 1, padahal a harus dihitung dari titik yang dilewati. Pilihan D memakai +4 di ujung, padahal ordinat puncaknya -4.',
    ],
  },
  {
    no: 2,
    label: 'Menggeser grafik',
    pertanyaan:
      'Grafik y = akar x digeser 3 satuan ke kanan, lalu 2 satuan ke bawah. Rumus grafik yang baru adalah?',
    pilihan: [
      'y = akar (x - 3) - 2',
      'y = akar (x + 3) - 2',
      'y = akar (x - 3) + 2',
      'y = akar x - 3 - 2',
      'y = akar (x - 2) - 3',
    ],
    benar: 0,
    jawaban: 'y = akar (x - 3) - 2',
    pembahasan: [
      'Geser ke kanan bekerja di DALAM kurung, dan tandanya kebalikan arahnya: geser 3 ke kanan ditulis (x - 3).',
      'Alasannya: titik awal grafik akar ada saat isi akarnya nol. Supaya x - 3 bernilai nol, x harus 3, jadi titik itu memang pindah ke kanan.',
      'Geser ke bawah bekerja di LUAR, dan tandanya apa adanya: turun 2 ditulis dikurangi 2.',
      'Digabung: y = akar (x - 3) - 2.',
      'Pilihan B membalik arah gesernya. Pilihan D menaruh angka 3 di luar akar, sehingga yang terjadi geser ke bawah dua kali, bukan ke kanan. Pilihan E menukar kedua angkanya.',
    ],
  },
  {
    no: 3,
    label: 'Tabungan bunga majemuk',
    pertanyaan:
      'Dini menabung Rp2.000.000,00 dengan bunga majemuk 12 persen per tahun. Setelah berapa tahun tabungannya pertama kali melebihi Rp6.000.000,00?',
    pilihan: [
      '3 tahun',
      '8 tahun',
      '9 tahun',
      '10 tahun',
      '17 tahun',
    ],
    benar: 3,
    jawaban: '10 tahun',
    pembahasan: [
      'Bunga majemuk berarti saldonya DIKALIKAN 1,12 tiap tahun, bukan ditambah jumlah tetap. Jadi rumusnya y = 2.000.000 × 1,12 pangkat x.',
      'Yang dicari: kapan 2.000.000 × 1,12 pangkat x melewati 6.000.000, yaitu kapan 1,12 pangkat x melewati 3.',
      'Tahun ke-8: 1,12 pangkat 8 sekitar 2,476, jadi saldonya sekitar Rp4.952.000. Belum cukup.',
      'Tahun ke-9: 1,12 pangkat 9 sekitar 2,773, jadi saldonya sekitar Rp5.546.000. Masih kurang.',
      'Tahun ke-10: 1,12 pangkat 10 sekitar 3,106, jadi saldonya sekitar Rp6.212.000. Sudah lewat, jadi jawabannya 10 tahun.',
      'Pilihan A menyamakan "jadi tiga kali lipat" dengan "tiga tahun", padahal keduanya tidak berhubungan.',
      'Pilihan E adalah jawaban untuk bunga TUNGGAL: kalau bunganya selalu 12 persen dari modal awal saja, yaitu Rp240.000 tiap tahun, perlu Rp4.000.000 dibagi Rp240.000, yaitu 16,7 tahun, sehingga baru terlampaui pada tahun ke-17. Bunga majemuk jauh lebih cepat karena bunganya ikut berbunga, dan itulah beda fungsi eksponen dengan fungsi linear.',
    ],
  },
  {
    no: 4,
    label: 'Merangkai dua fungsi',
    pertanyaan:
      'Diketahui f(x) = 3x - 1 dan g(x) = x² + 2. Nilai dari (g komposisi f)(2) adalah?',
    pilihan: [
      '27',
      '17',
      '25',
      '13',
      '11',
    ],
    benar: 0,
    jawaban: '27',
    pembahasan: [
      'Pada (g komposisi f)(x), yang bekerja lebih dulu adalah yang paling dekat dengan x, yaitu f.',
      'Langkah pertama: f(2) = 3(2) - 1 = 5.',
      'Langkah kedua: hasil itu masuk ke g, jadi g(5) = 5² + 2 = 27.',
      'Pilihan B adalah hasil kalau urutannya dibalik: f(g(2)) = f(6) = 17. Itu kekeliruan yang paling sering terjadi di soal komposisi.',
      'Pilihan C lupa menambahkan 2 pada langkah kedua. Pilihan D memakai rumus yang salah, yaitu 3x² - 1 + 2. Pilihan E menjumlahkan f(2) dengan g(2) alih-alih merangkainya.',
    ],
  },
]

/**
 * Kanal YouTube yang layak ditonton untuk topik ini.
 *
 * Sengaja BUKAN tautan ke satu video tertentu, karena video bisa dihapus
 * pemiliknya dan tautan mati lebih buruk daripada tidak ada tautan. Yang
 * diberikan kanalnya berikut kata kunci yang disarankan.
 */
export const KANAL: KanalPerSubbab = {
  // A · Pengenalan Fungsi dan Grafik
  A: [
    kanal(K.bigCourse, 'relasi dan pengertian fungsi', 'cqZg8Guf82g', 'Matematika X - Fungsi Komposisi part 1 : Relasi dan Pengertian Fungsi'),
    kanal(K.benni, 'relasi dan fungsi', 'YSx4GjhvxGM', 'Relasi dan Fungsi [Part 1] - Menyatakan Relasi'),
    kanal(K.lianna, 'fungsi dan bukan fungsi', 'BaIu-mZJsjg', 'cara menentukan fungsi dan bukan fungsi | relasi & fungsi | matematika'),
  ],
  // B · Fungsi Kuadrat
  B: [
    kanal(K.m4thlab, 'fungsi kuadrat', 'IwFQPIdqqqQ', 'Fungsi Kuadrat Bagian 1 - Matematika Wajib Kelas X m4thlab'),
    kanal(K.leGuruLes, 'cara menggambar grafik fungsi kuadrat', 'paoM_0T33hE', 'Fungsi Kuadrat (2) - Cara Menggambar Grafik Fungsi Kuadrat - Matematika SMP'),
    kanal(K.seekorLebah, 'grafik fungsi kuadrat', 'I4DsSSuVudA', 'CARA MUDAH MENGGAMBAR GRAFIK FUNGSI KUADRAT‼️'),
  ],
  // C · Transformasi Fungsi
  C: [
    kanal(K.y2education, 'transformasi fungsi', 'XtyaNBGA8uA', 'Transformasi Fungsi #Part 1 // Perubahan Grafik Fungsi Akibat Translasi/Pergeseran Grafik Fungsi'),
    kanal(K.seekorLebah, 'transformasi fungsi', 'T0COfoBIrq0', 'TRANSFORMASI FUNGSI‼️DILATASI (LENGKAP)'),
    kanal(K.jendelaSains, 'menggambar grafik fungsi nilai mutlak', 'weuPESnKpkw', 'Nilai Mutlak • Part 2: Contoh Soal Cara Menggambar Grafik Fungsi Nilai Mutlak'),
  ],
  // D · Fungsi Eksponen dan Logaritma
  D: [
    kanal(K.mantappu, 'eksponen kelas 10', 'AlrOq3W7IZ4', 'EKSPONEN ITU ASYIK! Bahas Eksponen Kelas 10 | Study With Jerome Polin'),
    kanal(K.m4thlab, 'fungsi eksponen', 'NVxky6JC3gw', 'Fungsi Eksponen Matematika Peminatan Kelas X - Apersepsi Masalah COVID-19'),
    kanal(K.pahamify, 'fungsi eksponensial', 'I4w6i7n3A_I', 'Matematika IPA Kelas X: Pengertian Fungsi Eksponensial'),
  ],
  // E · Fungsi Rasional, Komposisi, dan Invers
  E: [
    kanal(K.matematikaHebat, 'fungsi komposisi dan fungsi invers', 'o-ESReWkrzw', 'Fungsi komposisi dan fungsi invers'),
    kanal(K.mantappu, 'fungsi komposisi invers', 'U1QPR2eIXHQ', 'TRIK CEPAT FUNGSI KOMPOSISI & INVERS UTBK SNBT‼️ WAJIB PAHAM! | Jerome Polin'),
    kanal(K.ajarPipolondo, 'fungsi invers', '013sCXz9abs', 'FUNGSI INVERS KELAS 11, KONSEP DAN CONTOH SOAL mudah dipahami'),
  ],
  // F · Penerapan Grafik Fungsi
  F: [
    kanal(K.m4thlab, 'fungsi eksponen pertumbuhan peluruhan', 'fj4B6etl8zs', 'Eksponen & Logaritma Bagian 2 - Fungsi Eksponen - Pertumbuhan  & Peluruhan Kelas X Kurikulum Merdeka'),
    kanal(K.leGuruLes, 'penerapan fungsi kuadrat', 'TH8SACF1OHQ', 'Fungsi Kuadrat (3) - Penerapan Fungsi Kuadrat, Soal Aplikasi Fungsi Kuadrat - Matematika SMP'),
  ],
}