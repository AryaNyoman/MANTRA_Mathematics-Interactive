/**
 * Bank soal kuis Turunan: 32 soal, delapan untuk tiap tingkat.
 *
 * Bentuknya mengikuti bank soal Limit: tiap sesi mengambil 8 soal dan
 * menghindari soal yang sudah pernah keluar.
 *
 * KALIBRASI TINGKAT KESULITAN, ke buku Tingkat Lanjut Kelas XII Bab 2:
 *   mudah        satu aturan, satu langkah. Setara Contoh Soal 2.4 nomor 1
 *                sampai 3, dan Latihan Soal Definisi Turunan nomor 4.
 *   sedang       dua langkah, atau satu aturan yang harus dikenali dulu.
 *                Setara Contoh Soal 2.5 sampai 2.7 dan Ayo Mencoba 2.6.
 *   sulit        tiga langkah, atau syarat yang harus diperiksa sendiri.
 *                Setara Ayo Mencoba 2.8 dan 2.9 serta soal aplikasi.
 *   sangat sulit gabungan beberapa materi, atau nilai yang harus dicari
 *                mundur dari syarat. Setara latihan akhir bab.
 *
 * SOAL DITULIS SENDIRI. Tidak ada soal salinan di berkas ini, jadi tidak ada
 * yang perlu disebut sumbernya; yang dikalibrasi hanya POLA dan tingkatnya.
 *
 * Pengecohnya bukan angka asal. Tiap pengecoh adalah kekeliruan yang memang
 * sering terjadi, dan `alasan` menyebutkan kekeliruan mana.
 *
 * SELURUH JAWABAN NUMERIK SUDAH DIPERIKSA MESIN dengan sympy:
 * `python alat/cek_turunan.py alat/soal-kuis-turunan.json`.
 */

import type { SoalKuis } from '@/content/tipe'

export const KUIS: SoalKuis[] = [
  /* ================= MUDAH ================= */
  {
    id: 'turunan-mudah-01',
    pertanyaan: 'Turunan dari f(x) = x⁵ adalah ...',
    pilihan: ['5x⁴', 'x⁴', '5x⁶', '4x⁵', '5x'],
    benar: 0,
    alasan: 'Aturan pangkat: pangkatnya turun ke depan menjadi pengali, lalu pangkat yang tersisa berkurang satu. Jawaban x⁴ adalah kekeliruan paling sering, yaitu mengingat separuh aturan saja.',
    langkah: ['Pangkat 5 turun ke depan: 5 · x⁵', 'Pangkatnya berkurang satu: 5x⁴'],
    tingkat: 'mudah',
  },
  {
    id: 'turunan-mudah-02',
    pertanyaan: 'Turunan dari f(x) = 7 adalah ...',
    pilihan: ['0', '7', '7x', '1', 'tidak ada'],
    benar: 0,
    alasan: 'Grafik f(x) = 7 adalah garis mendatar. Garis mendatar tidak menanjak dan tidak menurun, jadi kemiringannya nol di mana pun.',
    langkah: ['f(x + h) - f(x) = 7 - 7 = 0', '0 dibagi h tetap 0', 'jadi f′(x) = 0'],
    tingkat: 'mudah',
  },
  {
    id: 'turunan-mudah-03',
    pertanyaan: 'Turunan dari f(x) = 3x² - 5x + 2 adalah ...',
    pilihan: ['6x - 5', '6x - 5 + 2', '3x - 5', '6x + 5', '6x² - 5x'],
    benar: 0,
    alasan: 'Jumlah dan selisih boleh diturunkan suku demi suku. Konstanta 2 hilang, dan itu bukan kecerobohan: menambah 2 hanya mengangkat grafiknya tanpa memiringkannya.',
    langkah: ['3x² memberi 6x', '-5x memberi -5', '2 adalah konstanta, memberi 0', 'dirangkai: 6x - 5'],
    tingkat: 'mudah',
  },
  {
    id: 'turunan-mudah-04',
    pertanyaan: 'Jika f(x) = √x, berapakah f′(4)?',
    pilihan: ['1/4', '1/2', '2', '1/8', '4'],
    benar: 0,
    alasan: 'Tulis dulu sebagai pangkat, baru pakai aturan pangkat. Jawaban 1/2 muncul kalau yang dihitung f(4) dibagi 2, bukan turunannya.',
    langkah: ['√x ditulis x^(1/2)', 'turunannya (1/2)x^(-1/2), yaitu 1 dibagi (2√x)', 'di x = 4: 1 dibagi (2 · 2) = 1/4'],
    tingkat: 'mudah',
  },
  {
    id: 'turunan-mudah-05',
    pertanyaan: 'Sebuah benda menempuh jarak 20 meter pada detik ke-1 dan 68 meter pada detik ke-5. Berapa kecepatan rata-ratanya pada selang itu?',
    pilihan: ['12 m/s', '48 m/s', '17 m/s', '13,6 m/s', '4 m/s'],
    benar: 0,
    alasan: 'Laju rata-rata adalah selisih jarak dibagi selisih waktu. Jawaban 48 m/s hanya menghitung selisih jaraknya dan lupa membagi waktunya; perhatikan satuannya harus meter PER detik.',
    langkah: ['selisih jarak: 68 - 20 = 48 meter', 'selisih waktu: 5 - 1 = 4 detik', '48 dibagi 4 = 12 m/s'],
    tingkat: 'mudah',
  },
  {
    id: 'turunan-mudah-06',
    pertanyaan: 'Turunan dari f(x) = sin x adalah ...',
    pilihan: ['cos x', '-cos x', '-sin x', 'sin x', 'tan x'],
    benar: 0,
    alasan: 'Kemiringan grafik sinus di tiap titik sama dengan tinggi grafik kosinus di titik yang sama. Tanda minus baru muncul pada turunan kosinus, bukan sinus.',
    langkah: ['di x = 0 grafik sinus menanjak paling curam, kemiringannya 1, dan cos 0 = 1', 'di puncak, x = π/2, kemiringannya 0, dan cos(π/2) = 0', 'jejak kemiringannya membentuk grafik kosinus'],
    tingkat: 'mudah',
  },
  {
    id: 'turunan-mudah-07',
    pertanyaan: 'Turunan dari f(x) = 1/x² adalah ...',
    pilihan: ['-2/x³', '2/x³', '-1/x³', '-2/x', '1/(2x)'],
    benar: 0,
    alasan: 'Tulis dulu sebagai pangkat negatif. Tanda minusnya masuk akal: kurva 1/x² untuk x positif selalu menurun, jadi turunannya wajib negatif di sana.',
    langkah: ['1/x² ditulis x^(-2)', 'aturan pangkat: (-2)x^(-3)', 'ditulis kembali: -2 dibagi x³'],
    tingkat: 'mudah',
  },
  {
    id: 'turunan-mudah-08',
    pertanyaan: 'Jika f(x) = 2x³, berapakah f′(1)?',
    pilihan: ['6', '2', '3', '9', '1'],
    benar: 0,
    alasan: 'Angka pengali di depan ikut terbawa apa adanya. Jawaban 2 muncul kalau yang dibaca nilai f(1), bukan turunannya.',
    langkah: ['f′(x) = 2 · 3x² = 6x²', 'di x = 1: 6 · 1 = 6'],
    tingkat: 'mudah',
  },

  /* ================= SEDANG ================= */
  {
    id: 'turunan-sedang-01',
    pertanyaan: 'Jika f(x) = (x² + 3)(x - 1), berapakah f′(2)?',
    pilihan: ['11', '7', '4', '14', '3'],
    benar: 0,
    alasan: 'Aturan hasil kali: u′v + uv′. Jawaban 4 muncul kalau turunan kedua bagian dikalikan begitu saja, yaitu 2x · 1 di x = 2, dan itu kekeliruan yang paling sering di materi hasil kali.',
    langkah: ['u = x² + 3 dan v = x - 1, jadi u′ = 2x dan v′ = 1', 'f′(x) = 2x(x - 1) + (x² + 3)', 'jabarkan: 2x² - 2x + x² + 3 = 3x² - 2x + 3', 'di x = 2: 12 - 4 + 3 = 11'],
    tingkat: 'sedang',
  },
  {
    id: 'turunan-sedang-02',
    pertanyaan: 'Jika f(x) = (3x - 2)⁴, berapakah f′(1)?',
    pilihan: ['12', '4', '36', '3', '1'],
    benar: 0,
    alasan: 'Aturan rantai: turunkan bagian luarnya, lalu kalikan turunan bagian dalamnya. Jawaban 4 muncul kalau pengali 3 dari bagian dalam tertinggal.',
    langkah: ['bagian dalam 3x - 2, turunannya 3', 'bagian luar u⁴, turunannya 4u³', 'f′(x) = 4(3x - 2)³ · 3 = 12(3x - 2)³', 'di x = 1: 3 - 2 = 1, jadi 12 · 1 = 12'],
    tingkat: 'sedang',
  },
  {
    id: 'turunan-sedang-03',
    pertanyaan: 'Jika f(x) = (x + 1) : (x - 2), berapakah f′(3)?',
    pilihan: ['-3', '3', '1', '-1', '4'],
    benar: 0,
    alasan: 'Aturan hasil bagi, dan urutan pembilangnya tidak boleh dibalik. Jawaban 3 adalah tanda yang terbalik, yaitu uv′ dikurangi u′v.',
    langkah: ['u = x + 1 dan v = x - 2, jadi u′ = 1 dan v′ = 1', 'pembilang: 1(x - 2) - (x + 1)(1) = -3', 'penyebut: (x - 2)²', 'f′(x) = -3 dibagi (x - 2)²', 'di x = 3: -3 dibagi 1 = -3'],
    tingkat: 'sedang',
  },
  {
    id: 'turunan-sedang-04',
    pertanyaan: 'Persamaan garis singgung kurva y = x² di titik dengan absis 2 adalah ...',
    pilihan: ['y = 4x - 4', 'y = 4x + 4', 'y = 2x - 4', 'y = 4x', 'y = 4'],
    benar: 0,
    alasan: 'Gradiennya diambil dari f′(2), bukan dari f(2). Jawaban y = 4x muncul kalau garisnya lupa digeser supaya lewat titik singgungnya.',
    langkah: ['titiknya: y = 2² = 4, jadi (2, 4)', 'gradiennya: f′(x) = 2x, maka m = 4', 'y - 4 = 4(x - 2)', 'dirapikan: y = 4x - 4'],
    tingkat: 'sedang',
  },
  {
    id: 'turunan-sedang-05',
    pertanyaan: 'Fungsi f(x) = x³ - 3x² naik pada selang ...',
    pilihan: [
      'x < 0 atau x > 2',
      '0 < x < 2',
      'x > 2 saja',
      'x < 0 saja',
      'seluruh bilangan real',
    ],
    benar: 0,
    alasan: 'Fungsi naik di tempat f′ bernilai positif. Jawaban 0 < x < 2 adalah selang tempat fungsinya justru TURUN, yaitu tandanya terbalik.',
    langkah: ['f′(x) = 3x² - 6x = 3x(x - 2)', 'akarnya x = 0 dan x = 2', 'uji x = -1: f′ = 3 + 6 = 9, positif', 'uji x = 1: f′ = 3 - 6 = -3, negatif', 'uji x = 3: f′ = 27 - 18 = 9, positif'],
    tingkat: 'sedang',
  },
  {
    id: 'turunan-sedang-06',
    pertanyaan: 'Jika f(x) = cos x, berapakah f′(π/2)?',
    pilihan: ['-1', '1', '0', '-π/2', 'tidak ada'],
    benar: 0,
    alasan: 'Turunan cos x adalah NEGATIF sin x, dan tanda minus itu yang paling sering hilang. Di x = π/2 grafik kosinus sedang menurun paling curam, jadi jawabannya wajib negatif.',
    langkah: ['f′(x) = -sin x', 'sin(π/2) = 1', 'jadi f′(π/2) = -1'],
    tingkat: 'sedang',
  },
  {
    id: 'turunan-sedang-07',
    pertanyaan: 'Jika f(x) = e^(2x), berapakah f′(0)?',
    pilihan: ['2', '1', '0', 'e', '2e'],
    benar: 0,
    alasan: 'Bagian dalamnya 2x, dan turunannya 2 harus ikut dikalikan. Jawaban 1 muncul kalau aturan rantai terlupa, seolah fungsinya eˣ biasa.',
    langkah: ['bagian dalam 2x, turunannya 2', 'f′(x) = e^(2x) · 2', 'di x = 0: e⁰ = 1, jadi 1 · 2 = 2'],
    tingkat: 'sedang',
  },
  {
    id: 'turunan-sedang-08',
    pertanyaan: 'Tinggi sebuah bola setelah t detik adalah h(t) = 40t - 5t² meter. Berapa kecepatannya pada detik ke-2?',
    pilihan: ['20 m/s', '60 m/s', '30 m/s', '10 m/s', '40 m/s'],
    benar: 0,
    alasan: 'Kecepatan adalah turunan tinggi terhadap waktu. Jawaban 60 m/s muncul kalau yang dihitung h(2), yaitu tingginya, bukan kecepatannya. Perhatikan satuannya: tinggi dalam meter, kecepatan dalam meter per detik.',
    langkah: ['h′(t) = 40 - 10t', 'di t = 2: 40 - 20 = 20 m/s'],
    tingkat: 'sedang',
  },

  /* ================= SULIT ================= */
  {
    id: 'turunan-sulit-01',
    pertanyaan: 'Titik balik maksimum fungsi f(x) = x³ - 6x² + 9x + 1 adalah ...',
    pilihan: ['(1, 5)', '(3, 1)', '(1, 1)', '(3, 5)', '(2, 3)'],
    benar: 0,
    alasan: 'Kedua akar f′ harus diuji tandanya untuk memutuskan mana maksimum. Jawaban (3, 1) adalah titik balik MINIMUM, jadi keduanya benar sebagai titik ekstrem tetapi hanya satu yang maksimum.',
    langkah: [
      'f′(x) = 3x² - 12x + 9 = 3(x - 1)(x - 3), akarnya 1 dan 3',
      'uji di x = 0: f′ = 9, positif; di x = 2: f′ = -3, negatif',
      'di x = 1 tandanya berubah positif ke negatif, jadi maksimum',
      'f(1) = 1 - 6 + 9 + 1 = 5, jadi titiknya (1, 5)',
    ],
    tingkat: 'sulit',
  },
  {
    id: 'turunan-sulit-02',
    pertanyaan: 'Jika f(x) = x²√x, berapakah f′(4)?',
    pilihan: ['20', '32', '10', '40', '8'],
    benar: 0,
    alasan: 'Gabungkan dulu menjadi satu pangkat, baru turunkan. Kalau dipaksa memakai aturan hasil kali tanpa menggabung, hasilnya tetap sama, tetapi jauh lebih panjang dan lebih mudah keliru.',
    langkah: [
      'x²√x = x² · x^(1/2) = x^(5/2)',
      'f′(x) = (5/2)x^(3/2)',
      'di x = 4: 4^(3/2) = 8',
      '(5/2) · 8 = 20',
    ],
    tingkat: 'sulit',
  },
  {
    id: 'turunan-sulit-03',
    pertanyaan: 'Garis singgung kurva y = x² - 4x + 5 yang sejajar dengan garis y = 2x + 7 mempunyai persamaan ...',
    pilihan: ['y = 2x - 4', 'y = 2x + 2', 'y = 2x - 1', 'y = 2x + 7', 'y = 2x - 7'],
    benar: 0,
    alasan: 'Sejajar berarti gradiennya sama, jadi gradiennya diketahui lebih dulu dan absisnya yang dicari. Jawaban y = 2x + 7 adalah garis yang diberikan soal, bukan garis singgungnya.',
    langkah: [
      'sejajar y = 2x + 7 berarti m = 2',
      'f′(x) = 2x - 4, samakan dengan 2: 2x - 4 = 2, jadi x = 3',
      'ordinatnya: f(3) = 9 - 12 + 5 = 2, titiknya (3, 2)',
      'y - 2 = 2(x - 3), dirapikan y = 2x - 4',
    ],
    tingkat: 'sulit',
  },
  {
    id: 'turunan-sulit-04',
    pertanyaan: 'Jika f(x) = sin x + cos x, berapakah f′(π/4)?',
    pilihan: ['0', '1', '√2', '-√2', '2'],
    benar: 0,
    alasan: 'Kedua suku diturunkan sendiri-sendiri, dan tanda minus pada turunan kosinus menentukan hasilnya. Di titik itu keduanya bernilai sama, jadi selisihnya nol.',
    langkah: [
      'f′(x) = cos x - sin x',
      'cos(π/4) = √2 dibagi 2, dan sin(π/4) juga √2 dibagi 2',
      'selisihnya nol',
    ],
    tingkat: 'sulit',
  },
  {
    id: 'turunan-sulit-05',
    pertanyaan: 'Selembar karton persegi bersisi 12 cm dipotong keempat pojoknya berbentuk persegi bersisi x, lalu dilipat menjadi kotak tanpa tutup. Isi kotak terbesarnya adalah ...',
    pilihan: ['128 cm³', '2 cm³', '64 cm³', '144 cm³', '108 cm³'],
    benar: 0,
    alasan: 'Yang ditanyakan isinya, bukan potongannya. Jawaban 2 cm³ adalah nilai x yang memaksimumkan, bukan isi kotaknya, dan satuannya pun tidak cocok.',
    langkah: [
      'V(x) = x(12 - 2x)², dijabarkan menjadi 4x³ - 48x² + 144x',
      'V′(x) = 12x² - 96x + 144 = 12(x - 2)(x - 6)',
      'akarnya x = 2 dan x = 6; x = 6 dibuang karena alasnya habis',
      'uji tanda: V′(1) = 60 positif, V′(3) = -36 negatif, jadi x = 2 maksimum',
      'V(2) = 2 · 8² = 2 · 64 = 128 cm³',
    ],
    tingkat: 'sulit',
  },
  {
    id: 'turunan-sulit-06',
    pertanyaan: 'Jika f(x) = x⁴ - 3x², berapakah nilai turunan KEDUA di x = 1?',
    pilihan: ['6', '-2', '12', '0', '-6'],
    benar: 0,
    alasan: 'Turunkan dua kali, jangan berhenti di turunan pertama. Jawaban -2 adalah f′(1), yaitu turunan pertama, dan itu kekeliruan paling sering pada soal turunan kedua.',
    langkah: [
      'f′(x) = 4x³ - 6x',
      'f″(x) = 12x² - 6',
      'di x = 1: 12 - 6 = 6',
    ],
    tingkat: 'sulit',
  },
  {
    id: 'turunan-sulit-07',
    pertanyaan: 'Jika f(x) = √(x² + 9), berapakah f′(4)?',
    pilihan: ['4/5', '1/5', '5', '8/5', '1/10'],
    benar: 0,
    alasan: 'Aturan rantai dengan bagian dalam x² + 9 yang turunannya 2x. Jawaban 1/5 muncul kalau pengali 2x tertinggal, dan 8/5 kalau pembagian 2 pada turunan akar terlupa.',
    langkah: [
      'tulis sebagai (x² + 9)^(1/2)',
      'bagian dalam x² + 9, turunannya 2x',
      'f′(x) = (1/2)(x² + 9)^(-1/2) · 2x, yaitu x dibagi √(x² + 9)',
      'di x = 4: √(16 + 9) = 5, jadi 4 dibagi 5',
    ],
    tingkat: 'sulit',
  },
  {
    id: 'turunan-sulit-08',
    pertanyaan: 'Biaya total membuat x barang adalah B(x) = 1.000 + 20x + x² : 10 ribu rupiah. Biaya marginal saat produksi 50 barang adalah ...',
    pilihan: ['30 ribu rupiah', '25 ribu rupiah', '20 ribu rupiah', '2.250 ribu rupiah', '45 ribu rupiah'],
    benar: 0,
    alasan: 'Biaya marginal adalah turunan biaya total, bukan biaya total itu sendiri dan bukan biaya rata-rata. Jawaban 2.250 adalah B(50), yaitu seluruh biayanya.',
    langkah: [
      'B′(x) = 20 + 2x : 10 = 20 + x : 5',
      'di x = 50: 20 + 10 = 30',
    ],
    tingkat: 'sulit',
  },

  /* ================= SANGAT SULIT ================= */
  {
    id: 'turunan-sangat-01',
    pertanyaan: 'Jika f(x) = (x² - 1) : (x² + 1), berapakah f′(1)?',
    pilihan: ['1', '0', '1/2', '2', '-1'],
    benar: 0,
    alasan: 'Aturan hasil bagi dengan pembilang dan penyebut yang sama-sama memuat x². Jawaban 0 muncul kalau pembilangnya dikira nol karena f(1) = 0; nilai fungsi nol tidak berarti turunannya nol.',
    langkah: [
      'u = x² - 1 dan v = x² + 1, jadi u′ = 2x dan v′ = 2x',
      'pembilang: 2x(x² + 1) - (x² - 1)(2x) = 2x³ + 2x - 2x³ + 2x = 4x',
      'f′(x) = 4x dibagi (x² + 1)²',
      'di x = 1: 4 dibagi 4 = 1',
    ],
    tingkat: 'sangat sulit',
  },
  {
    id: 'turunan-sangat-02',
    pertanyaan: 'Kurva y = x³ - 3x punya dua titik dengan garis singgung mendatar. Persamaan garis singgung di titik yang ORDINATNYA negatif adalah ...',
    pilihan: ['y = -2', 'y = 2', 'x = 1', 'y = 0', 'y = -2x'],
    benar: 0,
    alasan: 'Setelah kedua titik stasioner ditemukan, syarat tambahan soal yang memilih salah satunya. Jawaban y = 2 memakai titik yang ordinatnya positif, yaitu syaratnya terbalik.',
    langkah: [
      'f′(x) = 3x² - 3 = 0, jadi x = -1 atau x = 1',
      'f(-1) = -1 + 3 = 2, ordinatnya positif',
      'f(1) = 1 - 3 = -2, ordinatnya negatif, jadi titik ini yang dipilih',
      'gradiennya nol, jadi garisnya mendatar melalui (1, -2), yaitu y = -2',
    ],
    tingkat: 'sangat sulit',
  },
  {
    id: 'turunan-sangat-03',
    pertanyaan: 'Fungsi f(x) = x³ + ax² + 3 mempunyai titik stasioner di x = 2. Nilai a adalah ...',
    pilihan: ['-3', '3', '-6', '6', '-12'],
    benar: 0,
    alasan: 'Soal ini dibaca mundur: syaratnya diberikan, nilainya yang dicari. Jawaban -6 muncul kalau suku 2ax dikira ax, yaitu pengali 2 dari aturan pangkat tertinggal.',
    langkah: [
      'f′(x) = 3x² + 2ax',
      'titik stasioner berarti f′(2) = 0',
      '3 · 4 + 2a · 2 = 0, jadi 12 + 4a = 0',
      'a = -3',
    ],
    tingkat: 'sangat sulit',
  },
  {
    id: 'turunan-sangat-04',
    pertanyaan: 'Posisi sebuah benda adalah s(t) = t³ - 6t² + 9t meter. Pada detik keberapa saja benda itu BERHENTI sesaat?',
    pilihan: [
      't = 1 dan t = 3',
      't = 0 dan t = 3',
      't = 2 saja',
      't = 3 saja',
      'benda itu tidak pernah berhenti',
    ],
    benar: 0,
    alasan: 'Berhenti berarti kecepatannya nol, yaitu turunan pertama nol, bukan posisinya nol. Jawaban t = 0 dan t = 3 adalah saat POSISINYA nol, dan itu pertanyaan yang berbeda.',
    langkah: [
      'v(t) = s′(t) = 3t² - 12t + 9',
      'samakan nol: 3(t² - 4t + 3) = 0',
      'faktorkan: 3(t - 1)(t - 3) = 0',
      'jadi t = 1 dan t = 3',
    ],
    tingkat: 'sangat sulit',
  },
  {
    id: 'turunan-sangat-05',
    pertanyaan: 'Jika f(x) = sin 2x, berapakah f′(π/6)?',
    pilihan: ['1', '2', '1/2', '√3', '√3 dibagi 2'],
    benar: 0,
    alasan: 'Aturan rantai pada fungsi trigonometri: bagian dalam 2x turunannya 2. Jawaban 1/2 muncul kalau pengali 2 tertinggal, sehingga yang dihitung cos(π/3) saja.',
    langkah: [
      'f′(x) = cos(2x) · 2',
      'di x = π/6: 2x = π/3',
      'cos(π/3) = 1/2',
      'jadi 2 · (1/2) = 1',
    ],
    tingkat: 'sangat sulit',
  },
  {
    id: 'turunan-sangat-06',
    pertanyaan: 'Sebuah tangki tanpa tutup beralas persegi mempunyai isi 32 m³. Luas bahan paling sedikit yang diperlukan adalah ...',
    pilihan: ['48 m²', '32 m²', '64 m²', '96 m²', '16 m²'],
    benar: 0,
    alasan: 'Rumusnya disusun sendiri dari dua keterangan: isi yang tetap, dan luas yang mau diperkecil. Jawaban 32 m² hanya menghitung alasnya, dan 64 m² lupa bahwa tangkinya tanpa tutup.',
    langkah: [
      'alasnya s kali s, tingginya t, isinya s²t = 32, jadi t = 32 dibagi s²',
      'luas bahan: alas ditambah empat sisi, yaitu s² + 4st',
      'ganti t: L(s) = s² + 128 dibagi s',
      'L′(s) = 2s - 128 dibagi s², samakan nol: 2s³ = 128, jadi s = 4',
      'tingginya t = 32 dibagi 16 = 2',
      'L = 16 + 4 · 4 · 2 = 16 + 32 = 48 m²',
    ],
    tingkat: 'sangat sulit',
  },
  {
    id: 'turunan-sangat-07',
    pertanyaan: 'Jika f(x) = x · eˣ, berapakah f′(0)?',
    pilihan: ['1', '0', 'e', '2', '-1'],
    benar: 0,
    alasan: 'Aturan hasil kali dengan eˣ yang turunannya dirinya sendiri. Jawaban 0 muncul kalau turunan kedua bagian dikalikan begitu saja, yaitu 1 dikali e⁰ dikali x, yang di x = 0 memberi 0.',
    langkah: [
      'u = x dan v = eˣ, jadi u′ = 1 dan v′ = eˣ',
      'f′(x) = 1 · eˣ + x · eˣ = (1 + x)eˣ',
      'di x = 0: (1 + 0) · 1 = 1',
    ],
    tingkat: 'sangat sulit',
  },
  {
    id: 'turunan-sangat-08',
    pertanyaan: 'Jika f(x) = tan x, berapakah f′(π/4)?',
    pilihan: ['2', '1', '√2', '1/2', '0'],
    benar: 0,
    alasan: 'Tangen diturunkan dengan aturan hasil bagi, hasilnya 1 dibagi cos²x. Jawaban 1 muncul kalau yang dihitung nilai tan(π/4), bukan turunannya.',
    langkah: [
      'tan x = sin x dibagi cos x',
      'aturan hasil bagi memberi (cos²x + sin²x) dibagi cos²x, yaitu 1 dibagi cos²x',
      'cos(π/4) = √2 dibagi 2, jadi cos²(π/4) = 1/2',
      '1 dibagi (1/2) = 2',
    ],
    tingkat: 'sangat sulit',
  },
]
