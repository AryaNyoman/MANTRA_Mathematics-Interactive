/**
 * Latihan dan rujukan luar untuk topik Integral.
 *
 * Empat soal bertahap, dikalibrasi ke buku Matematika Tingkat Lanjut Kelas XII
 * (Edisi Revisi 2025) Bab 3: Contoh Soal 3.2 sampai 3.15, Ayo Mencoba 3.2
 * sampai 3.13, dan latihan akhir bab.
 *
 * SUMBER SOAL. Keempatnya ditulis sendiri; yang mengikuti buku adalah bentuk
 * dan tingkat kesulitannya, bukan angkanya. Bandingkan dengan buku: soal 4
 * memakai x kuadrat dikurangi 4x pada selang 0 sampai 6, sedangkan versi buku
 * (Ayo Mencoba 3.11) memakai polinom derajat tiga pada selang lain. Kalau nanti
 * ada soal yang angkanya diambil persis dari buku, sumbernya WAJIB ditulis di
 * `pembahasan`, seperti yang dilakukan di `kuis.ts`.
 *
 * PENGECOHNYA BUKAN ASAL SALAH. Tiap butir adalah kekeliruan yang benar-benar
 * sering terjadi dan sudah dibahas di halaman materinya: lupa membagi turunan
 * dalam, menukar turunan dengan antiturunan, menjawab luas dengan hasil
 * integral, dan lupa memecah di titik potong.
 *
 * SELURUH JAWABAN DIPERIKSA MESIN dengan sympy lewat
 * `python alat/cek_integral.py alat/soal-integral.json`, bukan `cek_soal.py`:
 * alat itu hanya paham klaim limit dan tidak bisa memeriksa antiturunan,
 * integral tentu, jumlahan Riemann, maupun luas daerah.
 */

import type { Kanal, Soal } from '@/content/tipe'

export const LATIHAN: Soal[] = [
  {
    no: 1,
    label: 'aturan pangkat',
    pertanyaan:
      'Tentukan antiturunan dari f(x) = 3x² - 4x + 1.',
    pilihan: [
      'x³ - 4x² + x + C',
      'x³ - 2x² + x',
      'x³ - 2x² + x + C',
      '6x - 4 + C',
      '3x³ - 4x² + x + C',
    ],
    benar: 2,
    jawaban: 'x³ - 2x² + x + C',
    pembahasan: [
      'Kerjakan suku demi suku, sebab penjumlahan dan pengurangan boleh dipecah (Sifat 3.13 dan 3.14).',
      'Suku 3x²: pangkat naik jadi 3, lalu dibagi 3. Hasilnya x³.',
      'Suku -4x: pangkat naik jadi 2, lalu dibagi 2. Hasilnya -2x².',
      'Suku 1: pangkat naik jadi 1, lalu dibagi 1. Hasilnya x.',
      'Periksa dengan menurunkan: turunan x³ - 2x² + x adalah 3x² - 4x + 1, kembali ke soal semula.',
      'Pilihan 6x - 4 adalah TURUNAN dari soal, bukan antiturunannya. Pilihan tanpa C juga salah, sebab satu antiturunan saja bukan jawaban lengkap.',
    ],
  },
  {
    no: 2,
    label: 'substitusi',
    pertanyaan:
      'Tentukan antiturunan dari f(x) = (2x + 1)⁵.',
    pilihan: [
      '5(2x + 1)⁴ + C',
      '(2x + 1)⁶ dibagi 2, ditambah C',
      '2(2x + 1)⁶ dibagi 6, ditambah C',
      '(2x + 1)⁶ dibagi 12, ditambah C',
      '(2x + 1)⁶ dibagi 6, ditambah C',
    ],
    benar: 3,
    jawaban: '(2x + 1)⁶ dibagi 12, ditambah C',
    pembahasan: [
      'Pilih u = 2x + 1, maka du = 2 dx.',
      'Di soal hanya ada dx, kurang faktor 2 dibanding du, jadi seluruhnya dikali setengah.',
      'Antiturunan u⁵ adalah u⁶ per 6, lalu dikali setengah tadi menjadi u⁶ per 12.',
      'Kembalikan u menjadi 2x + 1.',
      'Periksa dengan menurunkan: turunan (2x + 1)⁶ per 12 adalah 6(2x + 1)⁵ per 12, dikali 2 dari aturan rantai, hasilnya (2x + 1)⁵.',
      'Pilihan yang membaginya dengan 6 adalah kekeliruan paling sering: aturan pangkat dipakai tanpa memperhitungkan turunan isi kurungnya. Turunkan jawaban itu dan Anda mendapat 2(2x + 1)⁵, dua kali lipat soalnya.',
    ],
  },
  {
    no: 3,
    label: 'integral tentu dengan substitusi',
    pertanyaan:
      'Hitung integral dari x² dibagi akar (x³ + 1), dari x = 0 sampai x = 2.',
    pilihan: ['2/3', '4', '16/3', '8/3', '4/3'],
    benar: 4,
    jawaban: '4/3',
    pembahasan: [
      'Pilih u = x³ + 1, maka du = 3x² dx. Soal punya x² dx, jadi seluruhnya dikali sepertiga.',
      'Batasnya ikut diganti: x = 0 memberi u = 1, dan x = 2 memberi u = 9.',
      'Antiturunan u pangkat negatif setengah adalah 2 akar u, jadi hasilnya sepertiga dikali 2 akar u, dari 1 sampai 9.',
      'Masukkan batasnya: dua pertiga dikali (akar 9 dikurangi akar 1), yaitu dua pertiga dikali 2.',
      'Hasilnya 4/3.',
      'Kalau batasnya lupa diganti dan tetap dipakai 0 sampai 2 pada rumus dalam u, hasilnya akan berbeda dan tidak ada tanda bahaya apa pun. Setiap kali huruf peubahnya berganti, tanyakan batas ini milik siapa.',
    ],
  },
  {
    no: 4,
    label: 'luas yang memotong sumbu',
    pertanyaan:
      'Tentukan LUAS daerah yang dibatasi kurva y = x² - 4x, sumbu x, garis x = 0, dan garis x = 6.',
    pilihan: [
      '64/3 satuan luas',
      '0 satuan luas',
      '32/3 satuan luas',
      '24 satuan luas',
      '-32/3 satuan luas',
    ],
    benar: 0,
    jawaban: '64/3 satuan luas',
    pembahasan: [
      'Langkah pertama bukan menghitung, melainkan mencari titik potong dengan sumbu x. Samakan x² - 4x dengan nol, dan didapat x = 0 serta x = 4.',
      'Titik potong x = 4 berada di dalam selang, jadi selangnya WAJIB dipecah di situ.',
      'Bagian 0 sampai 4: kurvanya di bawah sumbu, hasilnya -32/3.',
      'Bagian 4 sampai 6: kurvanya di atas sumbu, hasilnya 32/3.',
      'Untuk LUAS, tiap bagian dipositifkan dulu, baru dijumlahkan: 32/3 ditambah 32/3, yaitu 64/3.',
      'Pilihan 0 adalah hasil integralnya, bukan luasnya. Kedua bagian sama besar dan berlawanan tanda, jadi saling meniadakan. Itu jawaban yang benar untuk pertanyaan yang berbeda.',
      'Pilihan 32/3 muncul kalau hanya satu bagian yang dihitung.',
    ],
  },
]

export const KANAL: Kanal[] = [
  {
    nama: 'm4th-lab',
    handle: '@m4thlab',
    url: 'https://www.youtube.com/@m4thlab',
    cari: 'integral tak tentu dan integral tentu kelas 12',
  },
  {
    nama: 'Belajar Matematika SMA',
    handle: '@TrieRush',
    url: 'https://www.youtube.com/@TrieRush',
    cari: 'integral substitusi',
  },
  {
    nama: 'Bimbel SMARRT',
    handle: '@BimbelSMARRT',
    url: 'https://www.youtube.com/@BimbelSMARRT',
    cari: 'luas daerah dengan integral',
  },
]
