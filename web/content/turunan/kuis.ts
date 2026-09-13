/**
 * Bank soal latihan Turunan: 60 soal, 15 tiap tingkat (14 Sep 2026).
 *
 * SEJARAH: bank pertama 32 soal (8 per tingkat, id turunan-<tingkat>-nn),
 * dikalibrasi ke buku Tingkat Lanjut Kelas XII Bab 2 dan dikalibrasi ulang
 * 7 Sep (enam soal sangat sulit ditulis ulang supaya menuntut lebih dari
 * satu alat). 13 Sep ARYA meminta 15 soal per tingkat, syarat naik 10 benar,
 * pembahasan bernomor bergambar, dan penjelasan pengecoh. Id lama
 * DIPERTAHANKAN; soal baru nomor 09 sampai 15 di tiap tingkat.
 *
 * KALIBRASI:
 *   mudah        satu aturan, satu langkah, angkanya siap dipakai
 *   sedang       dua langkah, atau aturan yang harus DIKENALI dulu (rantai,
 *                hasil kali, hasil bagi, garis singgung di titik yang diberi)
 *   sulit        tiga langkah atau ada syarat yang diperiksa sendiri (uji
 *                tanda, akar yang dibuang, selang naik turun, optimasi
 *                sederhana); pola UTBK
 *   sangat sulit DUA SAMPAI TIGA ALAT sekaligus atau dibaca mundur dari
 *                syaratnya; 5 bergaya olimpiade (dua garis singgung dari
 *                satu titik luar, parameter dari dua titik stasioner, jarak
 *                terdekat ke parabola, laju terkait, nilai maksimum
 *                sin x + cos x) dan 10 sulit-biasa
 *
 * SOAL DITULIS SENDIRI; yang dikalibrasi hanya pola dan tingkatnya.
 * Tiap jawaban berangka punya `// cek:` yang menghitung turunannya secara
 * numerik (selisih simetris h = 1e-4) supaya klaimnya bukan keyakinan.
 */

import type { SoalKuis } from '@/content/tipe'

export const KUIS: SoalKuis[] = [
  /* ================= MUDAH ================= */
  {
    id: 'turunan-mudah-01',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = x⁵ adalah ...',
    pilihan: ['5x⁴', 'x⁴', '5x⁶', '4x⁵', '5x'],
    benar: 0,
    langkah: [
      'Aturan pangkat: pangkatnya turun ke depan jadi pengali, lalu pangkat yang tersisa berkurang satu.',
      '5 · x⁵ menjadi 5x⁴.',
    ],
    jebakan: 'x⁴ mengingat separuh aturan saja (pangkat turun, pengalinya lupa). 5x⁶ menaikkan pangkat, itu arah antiturunan.',
    alasan: 'Aturan pangkat: 5x⁴.',
  },
  {
    // cek: Math.abs((7 - 7) / 2e-4) < 1e-9
    id: 'turunan-mudah-02',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = 7 adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['7'], jangkauan: [-3, 3, 0, 9] },
    pilihan: ['0', '7', '7x', '1', 'tidak ada'],
    benar: 0,
    langkah: [
      'Grafik f(x) = 7 garis mendatar: tidak menanjak, tidak menurun.',
      'Kemiringannya nol di mana pun, jadi f′(x) = 0. Dari definisi: f(x + h) - f(x) = 7 - 7 = 0.',
    ],
    jebakan: '7 mengira turunan tetapan adalah tetapannya sendiri. 7x adalah ANTITURUNANNYA, arah yang terbalik.',
    alasan: 'Garis mendatar: kemiringan 0.',
  },
  {
    // cek: Math.abs(((3*1.0001**2 - 5*1.0001 + 2) - (3*0.9999**2 - 5*0.9999 + 2)) / 2e-4 - 1) < 1e-6
    id: 'turunan-mudah-03',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = 3x² - 5x + 2 adalah ...',
    pilihan: ['6x - 5', '6x - 5 + 2', '3x - 5', '6x + 5', '6x² - 5x'],
    benar: 0,
    langkah: [
      'Turunkan suku demi suku: 3x² memberi 6x; -5x memberi -5; tetapan 2 memberi 0.',
      'Dirangkai: 6x - 5.',
    ],
    jebakan: '6x - 5 + 2 lupa tetapan hilang: menambah 2 hanya mengangkat grafik, tidak memiringkannya. 3x - 5 lupa mengalikan pangkat 2.',
    alasan: '6x - 5.',
  },
  {
    // cek: Math.abs((Math.sqrt(4.0001) - Math.sqrt(3.9999)) / 2e-4 - 0.25) < 1e-6
    id: 'turunan-mudah-04',
    tingkat: 'mudah',
    pertanyaan: 'Jika f(x) = √x, berapakah f′(4)?',
    gambar: { jenis: 'grafik', fungsi: ['Math.sqrt(x)'], jangkauan: [0, 9, 0, 4], titik: [{ x: 4, y: 2, label: '(4, 2)' }] },
    pilihan: ['1/4', '1/2', '2', '1/8', '4'],
    benar: 0,
    langkah: [
      'Tulis dulu sebagai pangkat: √x = x^(1/2).',
      'Aturan pangkat: (1/2)x^(-1/2) = 1 : (2√x).',
      'Di x = 4: 1 : (2 · 2) = 1/4.',
    ],
    jebakan: '1/2 adalah pengali (1/2) yang belum dibagi √x, atau f(4) : 2, bukan turunannya. 2 adalah f(4).',
    alasan: '1/(2√4) = 1/4.',
  },
  {
    // cek: (68 - 20) / (5 - 1) === 12
    id: 'turunan-mudah-05',
    tingkat: 'mudah',
    pertanyaan: 'Sebuah benda menempuh jarak 20 meter pada detik ke-1 dan 68 meter pada detik ke-5. Berapa kecepatan rata-ratanya pada selang itu?',
    gambar: { jenis: 'garis-data', kategori: ['detik 1', 'detik 5'], nilai: [20, 68], satuan: 'meter' },
    pilihan: ['12 m/s', '48 m/s', '17 m/s', '13,6 m/s', '4 m/s'],
    benar: 0,
    langkah: [
      'Laju rata-rata = selisih jarak : selisih waktu.',
      'Selisih jarak 68 - 20 = 48 m; selisih waktu 5 - 1 = 4 s.',
      '48 : 4 = 12 m/s.',
    ],
    jebakan: '48 m/s hanya selisih jaraknya, lupa dibagi waktu; satuannya harus meter PER detik. 13,6 membagi 68 dengan 5 (mengabaikan titik awal).',
    alasan: '48/4 = 12.',
  },
  {
    // cek: Math.abs((Math.sin(0.0001) - Math.sin(-0.0001)) / 2e-4 - Math.cos(0)) < 1e-6
    id: 'turunan-mudah-06',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = sin x adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['Math.sin(x)', 'Math.cos(x)'], jangkauan: [-6.5, 6.5, -1.5, 1.5], nama: ['sin x', 'cos x'] },
    pilihan: ['cos x', '-cos x', '-sin x', 'sin x', 'tan x'],
    benar: 0,
    langkah: [
      'Di x = 0 grafik sinus menanjak paling curam, kemiringannya 1, dan cos 0 = 1.',
      'Di puncak x = π/2 kemiringannya 0, dan cos(π/2) = 0.',
      'Jejak kemiringannya membentuk grafik kosinus: f′(x) = cos x.',
    ],
    jebakan: '-sin x adalah turunan KEDUA sinus. Tanda minus baru muncul pada turunan kosinus, bukan sinus.',
    alasan: 'Kemiringan sinus = tinggi kosinus.',
  },
  {
    // cek: Math.abs((1/2.0001**2 - 1/1.9999**2) / 2e-4 - (-2/8)) < 1e-6
    id: 'turunan-mudah-07',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = 1/x² adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['1/(x*x)'], jangkauan: [0.3, 4, 0, 5] },
    pilihan: ['-2/x³', '2/x³', '-1/x³', '-2/x', '1/(2x)'],
    benar: 0,
    langkah: [
      'Tulis sebagai pangkat negatif: x^(-2).',
      'Aturan pangkat: (-2)x^(-3) = -2 : x³.',
      'Tandanya masuk akal: untuk x positif kurva selalu menurun, jadi turunannya wajib negatif.',
    ],
    jebakan: '2/x³ kehilangan tanda minus dari pangkat -2. -1/x³ lupa pengali 2.',
    alasan: '-2x⁻³.',
  },
  {
    // cek: Math.abs((2*1.0001**3 - 2*0.9999**3) / 2e-4 - 6) < 1e-6
    id: 'turunan-mudah-08',
    tingkat: 'mudah',
    pertanyaan: 'Jika f(x) = 2x³, berapakah f′(1)?',
    pilihan: ['6', '2', '3', '9', '1'],
    benar: 0,
    langkah: [
      'Angka pengali ikut terbawa: f′(x) = 2 · 3x² = 6x².',
      'Di x = 1: 6 · 1 = 6.',
    ],
    jebakan: '2 adalah f(1), nilai fungsinya, bukan turunannya. 3 lupa pengali 2.',
    alasan: '6x² di x = 1: 6.',
  },
  {
    // cek: Math.abs((4*1.0001 - 4*0.9999) / 2e-4 - 4) < 1e-9
    id: 'turunan-mudah-09',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = 4x adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['4*x'], jangkauan: [-2, 3, -4, 10] },
    pilihan: ['4', '4x', '2x²', '0', '1'],
    benar: 0,
    langkah: [
      'Grafik f(x) = 4x garis lurus dengan kemiringan 4 di mana pun.',
      'Aturan pangkat: 4x¹ memberi 4 · 1 · x⁰ = 4.',
    ],
    jebakan: '2x² adalah antiturunannya (arah terbalik). 0 mengira turunan "fungsi sederhana" nol; yang nol hanya tetapan.',
    alasan: 'Kemiringan garis: 4.',
  },
  {
    // cek: Math.abs(((2.0001**2 + 3*2.0001) - (1.9999**2 + 3*1.9999)) / 2e-4 - 7) < 1e-6
    id: 'turunan-mudah-10',
    tingkat: 'mudah',
    pertanyaan: 'Jika f(x) = x² + 3x, berapakah f′(2)?',
    gambar: { jenis: 'grafik', fungsi: ['x*x + 3*x'], jangkauan: [-4, 3, -3, 12], titik: [{ x: 2, y: 10, label: '(2, 10)' }] },
    pilihan: ['7', '10', '4', '5', '3'],
    benar: 0,
    langkah: [
      'f′(x) = 2x + 3.',
      'Di x = 2: 4 + 3 = 7.',
    ],
    jebakan: '10 adalah f(2). 4 hanya turunan suku x², lupa +3 dari suku 3x.',
    alasan: '2(2) + 3 = 7.',
  },
  {
    // cek: Math.abs((Math.cos(1.0001) - Math.cos(0.9999)) / 2e-4 - (-Math.sin(1))) < 1e-6
    id: 'turunan-mudah-11',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = cos x adalah ...',
    pilihan: ['-sin x', 'sin x', '-cos x', 'cos x', 'tan x'],
    benar: 0,
    langkah: [
      'Di x = 0 grafik kosinus di puncak, kemiringan 0, dan -sin 0 = 0.',
      'Sesudah puncak grafik menurun (kemiringan negatif) sementara sin x positif: jadi turunannya -sin x.',
    ],
    jebakan: 'sin x lupa tanda minus. Cara mengingat: sesudah puncak kosinus turun, jadi turunannya harus negatif saat sin x positif.',
    alasan: '-sin x.',
  },
  {
    // cek: Math.abs((Math.exp(1.0001) - Math.exp(0.9999)) / 2e-4 - Math.E) < 1e-6
    id: 'turunan-mudah-12',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = eˣ adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['Math.exp(x)'], jangkauan: [-2, 2.5, 0, 8] },
    pilihan: ['eˣ', 'x · e^(x-1)', 'e', '1', 'x eˣ'],
    benar: 0,
    langkah: [
      'eˣ adalah fungsi istimewa: kemiringannya di tiap titik sama dengan tingginya di titik itu.',
      'Jadi turunannya dirinya sendiri, eˣ.',
    ],
    jebakan: 'x · e^(x-1) memakai aturan pangkat, padahal yang berpangkat bukan x; aturan pangkat berlaku untuk xⁿ, bukan eˣ.',
    alasan: 'Turunan eˣ = eˣ.',
  },
  {
    // cek: Math.abs((5*3.0001**2 - 5*2.9999**2) / 2e-4 - 30) < 1e-6
    id: 'turunan-mudah-13',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = 5x² adalah ...',
    pilihan: ['10x', '5x', '10x²', '2x', '5'],
    benar: 0,
    langkah: [
      'Pengali 5 tetap di depan; x² diturunkan jadi 2x.',
      '5 · 2x = 10x.',
    ],
    jebakan: '5x lupa pangkat 2 turun jadi pengali. 10x² menurunkan pengalinya tetapi lupa mengurangi pangkat.',
    alasan: '10x.',
  },
  {
    // cek: (9 - 1) / (3 - 1) === 4
    id: 'turunan-mudah-14',
    tingkat: 'mudah',
    pertanyaan: 'Tinggi air dalam tangki setelah t menit adalah h(t) = t² cm. Berapa laju rata-rata kenaikan air dari menit ke-1 sampai menit ke-3?',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [0, 4, 0, 12], titik: [{ x: 1, y: 1, label: '(1, 1)' }, { x: 3, y: 9, label: '(3, 9)' }] },
    pilihan: ['4 cm/menit', '8 cm/menit', '3 cm/menit', '6 cm/menit', '2 cm/menit'],
    benar: 0,
    langkah: [
      'Laju rata-rata = selisih tinggi : selisih waktu = kemiringan garis potong dari (1, 1) ke (3, 9).',
      '(9 - 1) : (3 - 1) = 8 : 2 = 4 cm/menit.',
    ],
    jebakan: '8 hanya selisih tingginya. 6 adalah h′(3), laju SESAAT di menit ke-3, bukan rata-ratanya. 3 membagi 9 dengan 3.',
    alasan: '8/2 = 4.',
  },
  {
    // cek: Math.abs((1/2.0001 - 1/1.9999) / 2e-4 - (-1/4)) < 1e-6
    id: 'turunan-mudah-15',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = 1/x adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['1/x'], jangkauan: [0.3, 5, 0, 4] },
    pilihan: ['-1/x²', '1/x²', 'ln x', '-1/x', '1'],
    benar: 0,
    langkah: [
      '1/x = x^(-1). Aturan pangkat: (-1)x^(-2) = -1 : x².',
      'Tandanya masuk akal: 1/x menurun untuk x positif.',
    ],
    jebakan: '1/x² lupa tanda minus dari pangkat -1. ln x adalah ANTITURUNAN 1/x, arah terbalik.',
    alasan: '-x⁻².',
  },

  /* ================= SEDANG ================= */
  {
    // cek: Math.abs((((2.0001**2 + 3)*(2.0001 - 1)) - ((1.9999**2 + 3)*(1.9999 - 1))) / 2e-4 - 11) < 1e-5
    id: 'turunan-sedang-01',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = (x² + 3)(x - 1), berapakah f′(2)?',
    pilihan: ['11', '7', '4', '14', '3'],
    benar: 0,
    langkah: [
      'Aturan hasil kali: u = x² + 3 (u′ = 2x), v = x - 1 (v′ = 1). f′ = u′v + uv′.',
      'f′(x) = 2x(x - 1) + (x² + 3) = 3x² - 2x + 3.',
      'Di x = 2: 12 - 4 + 3 = 11.',
    ],
    jebakan: '4 mengalikan turunan kedua bagian begitu saja (2x · 1 di x = 2), kekeliruan paling sering pada hasil kali. 7 adalah f(2).',
    alasan: '3x² - 2x + 3 di 2: 11.',
  },
  {
    // cek: Math.abs(((3*1.0001 - 2)**4 - (3*0.9999 - 2)**4) / 2e-4 - 12) < 1e-5
    id: 'turunan-sedang-02',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = (3x - 2)⁴, berapakah f′(1)?',
    pilihan: ['12', '4', '36', '3', '1'],
    benar: 0,
    langkah: [
      'Aturan rantai: bagian dalam 3x - 2 (turunannya 3), bagian luar u⁴ (turunannya 4u³).',
      'f′(x) = 4(3x - 2)³ · 3 = 12(3x - 2)³.',
      'Di x = 1: 3 - 2 = 1, jadi 12 · 1 = 12.',
    ],
    jebakan: '4 kehilangan pengali 3 dari bagian dalam. 36 mengalikan 12 dengan 3 sekali lagi.',
    alasan: '12(3x - 2)³ di 1: 12.',
  },
  {
    // cek: Math.abs((((3.0001 + 1)/(3.0001 - 2)) - ((2.9999 + 1)/(2.9999 - 2))) / 2e-4 - (-3)) < 1e-5
    id: 'turunan-sedang-03',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = (x + 1) : (x - 2), berapakah f′(3)?',
    pilihan: ['-3', '3', '1', '-1', '4'],
    benar: 0,
    langkah: [
      'Aturan hasil bagi: (u′v - uv′) : v². u = x + 1, v = x - 2, u′ = v′ = 1.',
      'Pembilang: 1(x - 2) - (x + 1)(1) = -3. Penyebut: (x - 2)².',
      'Di x = 3: -3 : 1 = -3.',
    ],
    jebakan: '3 membalik urutan pembilang (uv′ - u′v); tanda pembilang aturan hasil bagi tidak boleh dibalik. 4 adalah f(3).',
    alasan: '-3/(x - 2)² di 3: -3.',
  },
  {
    // cek: 4 * 2 - 4 === 4
    id: 'turunan-sedang-04',
    tingkat: 'sedang',
    pertanyaan: 'Persamaan garis singgung kurva y = x² di titik dengan absis 2 adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['x*x', '4*x - 4'], jangkauan: [-1, 4, -2, 10], titik: [{ x: 2, y: 4, label: '(2, 4)' }], nama: ['y = x²', 'garis singgung'] },
    pilihan: ['y = 4x - 4', 'y = 4x + 4', 'y = 2x - 4', 'y = 4x', 'y = 4'],
    benar: 0,
    langkah: [
      'Titik singgung: y = 2² = 4, jadi (2, 4).',
      'Gradien: f′(x) = 2x, m = f′(2) = 4.',
      'y - 4 = 4(x - 2), dirapikan y = 4x - 4.',
    ],
    jebakan: 'y = 4x lupa menggeser garis supaya lewat (2, 4). y = 2x - 4 memakai gradien 2 (rumus f′ belum dimasuki x = 2). y = 4 memakai f(2) sebagai gradien 0.',
    alasan: 'Gradien 4 lewat (2, 4).',
  },
  {
    // cek: Math.abs((Math.cos(Math.PI/2 + 0.0001) - Math.cos(Math.PI/2 - 0.0001)) / 2e-4 - (-1)) < 1e-6
    id: 'turunan-sedang-05',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = cos x, berapakah f′(π/2)?',
    gambar: { jenis: 'grafik', fungsi: ['Math.cos(x)'], jangkauan: [-0.5, 3.5, -1.5, 1.5], titik: [{ x: 1.5708, y: 0, label: '(π/2, 0)' }] },
    pilihan: ['-1', '1', '0', '-π/2', 'tidak ada'],
    benar: 0,
    langkah: [
      'f′(x) = -sin x.',
      'sin(π/2) = 1, jadi f′(π/2) = -1.',
      'Cocok dengan gambar: di x = π/2 grafik kosinus sedang menurun paling curam.',
    ],
    jebakan: '1 kehilangan tanda minus, kekeliruan paling sering. 0 adalah f(π/2), nilai fungsinya.',
    alasan: '-sin(π/2) = -1.',
  },
  {
    // cek: Math.abs((Math.exp(2*0.0001) - Math.exp(-2*0.0001)) / 2e-4 - 2) < 1e-6
    id: 'turunan-sedang-06',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = e^(2x), berapakah f′(0)?',
    pilihan: ['2', '1', '0', 'e', '2e'],
    benar: 0,
    langkah: [
      'Aturan rantai: bagian dalam 2x, turunannya 2.',
      'f′(x) = e^(2x) · 2. Di x = 0: e⁰ · 2 = 1 · 2 = 2.',
    ],
    jebakan: '1 melupakan rantai, seolah fungsinya eˣ biasa. 2e memasukkan x = 1, bukan 0.',
    alasan: '2e⁰ = 2.',
  },
  {
    // cek: Math.abs(((40*2.0001 - 5*2.0001**2) - (40*1.9999 - 5*1.9999**2)) / 2e-4 - 20) < 1e-6
    id: 'turunan-sedang-07',
    tingkat: 'sedang',
    pertanyaan: 'Tinggi sebuah bola setelah t detik adalah h(t) = 40t - 5t² meter. Berapa kecepatannya pada detik ke-2?',
    gambar: { jenis: 'grafik', fungsi: ['40*x - 5*x*x'], jangkauan: [0, 8, 0, 90], titik: [{ x: 2, y: 60, label: '(2, 60)' }] },
    pilihan: ['20 m/s', '60 m/s', '30 m/s', '10 m/s', '40 m/s'],
    benar: 0,
    langkah: [
      'Kecepatan = turunan tinggi terhadap waktu: h′(t) = 40 - 10t.',
      'Di t = 2: 40 - 20 = 20 m/s.',
    ],
    jebakan: '60 m/s adalah h(2), TINGGINYA, bukan kecepatannya; satuannya meter, bukan meter per detik. 30 membagi 60 dengan 2 (laju rata-rata dari t = 0).',
    alasan: '40 - 10(2) = 20.',
  },
  {
    // cek: Math.abs((Math.sin(2*(Math.PI/6 + 0.0001)) - Math.sin(2*(Math.PI/6 - 0.0001))) / 2e-4 - 1) < 1e-6
    id: 'turunan-sedang-08',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = sin 2x, berapakah f′(π/6)?',
    pilihan: ['1', '2', '1/2', '√3', '√3 dibagi 2'],
    benar: 0,
    langkah: [
      'Aturan rantai: f′(x) = cos(2x) · 2.',
      'Di x = π/6: 2x = π/3, cos(π/3) = 1/2.',
      '2 · 1/2 = 1.',
    ],
    jebakan: '1/2 kehilangan pengali 2 dari bagian dalam. √3/2 memakai sin(π/3) atau cos(π/6): salah fungsi atau salah sudut.',
    alasan: '2 cos(π/3) = 1.',
  },
  {
    // cek: Math.abs(((1.0001**2 + 1)**2 - (0.9999**2 + 1)**2) / 2e-4 - 8) < 1e-5
    id: 'turunan-sedang-09',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = (x² + 1)², berapakah f′(1)?',
    pilihan: ['8', '4', '2', '16', '6'],
    benar: 0,
    langkah: [
      'Aturan rantai: bagian dalam x² + 1 (turunannya 2x), luar u² (turunannya 2u).',
      'f′(x) = 2(x² + 1) · 2x = 4x(x² + 1).',
      'Di x = 1: 4 · 2 = 8. Periksa lewat penjabaran: x⁴ + 2x² + 1, turunannya 4x³ + 4x = 8 di x = 1. Cocok.',
    ],
    jebakan: '4 lupa mengalikan turunan bagian dalam 2x. 4 juga f(1). 16 mengalikan 2x dua kali.',
    alasan: '4x(x² + 1) di 1: 8.',
  },
  {
    // cek: Math.abs(((Math.PI/2 + 0.0001)*Math.sin(Math.PI/2 + 0.0001) - (Math.PI/2 - 0.0001)*Math.sin(Math.PI/2 - 0.0001)) / 2e-4 - 1) < 1e-6
    id: 'turunan-sedang-10',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = x sin x, berapakah f′(π/2)?',
    pilihan: ['1', '0', 'π/2', '-1', 'π/2 + 1'],
    benar: 0,
    langkah: [
      'Aturan hasil kali: u = x, v = sin x. f′ = 1 · sin x + x · cos x.',
      'Di x = π/2: sin = 1, cos = 0. f′ = 1 + 0 = 1.',
    ],
    jebakan: '0 mengalikan turunan keduanya (1 · cos x), bukan aturan hasil kali. π/2 adalah f(π/2).',
    alasan: 'sin x + x cos x di π/2: 1.',
  },
  {
    // cek: 3 * 1 - 2 === 1
    id: 'turunan-sedang-11',
    tingkat: 'sedang',
    pertanyaan: 'Persamaan garis singgung kurva y = x³ di titik (1, 1) adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['x*x*x', '3*x - 2'], jangkauan: [-2, 2.5, -4, 6], titik: [{ x: 1, y: 1, label: '(1, 1)' }], nama: ['y = x³', 'garis singgung'] },
    pilihan: ['y = 3x - 2', 'y = 3x + 1', 'y = x', 'y = 3x', 'y = 3x - 1'],
    benar: 0,
    langkah: [
      'Gradien: f′(x) = 3x², m = f′(1) = 3.',
      'y - 1 = 3(x - 1), jadi y = 3x - 2.',
      'Periksa: di x = 1, 3 - 2 = 1. Garisnya memang lewat (1, 1).',
    ],
    jebakan: 'y = 3x + 1 memakai 1 sebagai tetapan tanpa menghitung (tidak lewat (1, 1): 3 + 1 = 4). y = x memakai gradien f(1) = 1, bukan f′(1).',
    alasan: 'm = 3 lewat (1, 1).',
  },
  {
    // cek: Math.abs((Math.sqrt(2*4.0001 + 1) - Math.sqrt(2*3.9999 + 1)) / 2e-4 - 1/3) < 1e-6
    id: 'turunan-sedang-12',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = √(2x + 1), berapakah f′(4)?',
    pilihan: ['1/3', '1/6', '2/3', '3', '1/2'],
    benar: 0,
    langkah: [
      'Tulis (2x + 1)^(1/2). Rantai: (1/2)(2x + 1)^(-1/2) · 2 = 1 : √(2x + 1).',
      'Di x = 4: √9 = 3, jadi 1/3.',
    ],
    jebakan: '1/6 lupa mengalikan turunan bagian dalam (2), sehingga pembagi 2-nya tidak tercoret. 3 adalah f(4).',
    alasan: '1/√9 = 1/3.',
  },
  {
    // cek: Math.abs((((2*0.0001 - 1)/(0.0001 + 1)) - ((2*(-0.0001) - 1)/(-0.0001 + 1))) / 2e-4 - 3) < 1e-5
    id: 'turunan-sedang-13',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = (2x - 1) : (x + 1), berapakah f′(0)?',
    pilihan: ['3', '-3', '2', '-1', '1'],
    benar: 0,
    langkah: [
      'Aturan hasil bagi: u = 2x - 1 (u′ = 2), v = x + 1 (v′ = 1).',
      'Pembilang: 2(x + 1) - (2x - 1)(1) = 3. Penyebut (x + 1)².',
      'Di x = 0: 3 : 1 = 3.',
    ],
    jebakan: '-3 membalik urutan pembilang. 2 membagi turunan atas dengan turunan bawah (2 : 1), bukan aturan hasil bagi. -1 adalah f(0).',
    alasan: '3/(x + 1)² di 0: 3.',
  },
  {
    // cek: Math.abs(((2.0001**3 - 3*2.0001) - (1.9999**3 - 3*1.9999)) / 2e-4 - 9) < 1e-5
    id: 'turunan-sedang-14',
    tingkat: 'sedang',
    pertanyaan: 'Posisi sebuah benda pada waktu t detik adalah s(t) = t³ - 3t meter. Berapa kecepatannya saat t = 2?',
    pilihan: ['9 m/s', '2 m/s', '12 m/s', '1 m/s', '6 m/s'],
    benar: 0,
    langkah: [
      'Kecepatan = s′(t) = 3t² - 3.',
      'Di t = 2: 12 - 3 = 9 m/s.',
    ],
    jebakan: '2 m/s adalah s(2), posisinya. 12 lupa suku -3 (turunan -3t adalah -3, bukan 0). 1 membagi posisi dengan waktu.',
    alasan: '3(4) - 3 = 9.',
  },
  {
    // cek: Math.abs((Math.exp(-0.0001) - Math.exp(0.0001)) / 2e-4 - (-1)) < 1e-6
    id: 'turunan-sedang-15',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = e^(-x), berapakah f′(0)?',
    gambar: { jenis: 'grafik', fungsi: ['Math.exp(-x)'], jangkauan: [-2, 3, 0, 6], titik: [{ x: 0, y: 1, label: '(0, 1)' }] },
    pilihan: ['-1', '1', '0', 'e', '-e'],
    benar: 0,
    langkah: [
      'Rantai: bagian dalam -x, turunannya -1. f′(x) = -e^(-x).',
      'Di x = 0: -e⁰ = -1. Cocok dengan gambar: kurvanya menurun.',
    ],
    jebakan: '1 melupakan tanda minus dari turunan -x; grafik yang menurun tidak mungkin punya turunan positif.',
    alasan: '-e⁰ = -1.',
  },

  /* ================= SULIT ================= */
  {
    // cek: (3*(-1)**2 - 6*(-1)) > 0 && (3*1 - 6) < 0 && (3*9 - 18) > 0
    id: 'turunan-sulit-01',
    tingkat: 'sulit',
    pertanyaan: 'Fungsi f(x) = x³ - 3x² naik pada selang ...',
    gambar: { jenis: 'grafik', fungsi: ['x*x*x - 3*x*x'], jangkauan: [-2, 4, -6, 6], titik: [{ x: 0, y: 0, label: '(0, 0)' }, { x: 2, y: -4, label: '(2, -4)' }] },
    pilihan: ['x < 0 atau x > 2', '0 < x < 2', 'x > 2 saja', 'x < 0 saja', 'seluruh bilangan real'],
    benar: 0,
    langkah: [
      'f′(x) = 3x² - 6x = 3x(x - 2), akarnya 0 dan 2.',
      'Uji tanda di tiga selang: f′(-1) = 9 (+), f′(1) = -3 (-), f′(3) = 9 (+).',
      'Naik di tempat f′ positif: x < 0 atau x > 2.',
    ],
    jebakan: '0 < x < 2 adalah selang tempat fungsinya TURUN (tandanya terbalik). "x > 2 saja" lupa selang kiri.',
    alasan: 'f′ > 0 di x < 0 dan x > 2.',
  },
  {
    // cek: 1 - 6 + 9 + 1 === 5 && 3*1 - 12 + 9 === 0
    id: 'turunan-sulit-02',
    tingkat: 'sulit',
    pertanyaan: 'Titik balik maksimum fungsi f(x) = x³ - 6x² + 9x + 1 adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['x*x*x - 6*x*x + 9*x + 1'], jangkauan: [-0.5, 4.5, -1, 7] },
    pilihan: ['(1, 5)', '(3, 1)', '(1, 1)', '(3, 5)', '(2, 3)'],
    benar: 0,
    langkah: [
      'f′(x) = 3x² - 12x + 9 = 3(x - 1)(x - 3), akarnya 1 dan 3.',
      'Uji tanda: f′(0) = 9 (+), f′(2) = -3 (-): di x = 1 berubah dari naik ke turun, maksimum.',
      'f(1) = 1 - 6 + 9 + 1 = 5. Titiknya (1, 5).',
    ],
    jebakan: '(3, 1) adalah titik balik MINIMUM; keduanya titik stasioner, tetapi hanya satu yang maksimum. (2, 3) adalah titik belok.',
    alasan: 'Maksimum di x = 1, f(1) = 5.',
  },
  {
    // cek: Math.abs((4.0001**2.5 - 3.9999**2.5) / 2e-4 - 20) < 1e-4
    id: 'turunan-sulit-03',
    tingkat: 'sulit',
    pertanyaan: 'Jika f(x) = x²√x, berapakah f′(4)?',
    pilihan: ['20', '32', '10', '40', '8'],
    benar: 0,
    langkah: [
      'Gabungkan jadi satu pangkat: x² · x^(1/2) = x^(5/2).',
      'f′(x) = (5/2)x^(3/2).',
      'Di x = 4: 4^(3/2) = 8, jadi (5/2) · 8 = 20.',
    ],
    jebakan: '32 adalah f(4) = 16 · 2. 10 lupa pengali 5/2 separuhnya (memakai 5/4). Aturan hasil kali tanpa menggabung memberi hasil sama tetapi lebih panjang.',
    alasan: '(5/2) · 8 = 20.',
  },
  {
    // cek: 2*3 - 4 === 2 && 9 - 12 + 5 === 2 && 2*3 - 4 === 2
    id: 'turunan-sulit-04',
    tingkat: 'sulit',
    pertanyaan: 'Garis singgung kurva y = x² - 4x + 5 yang sejajar dengan garis y = 2x + 7 mempunyai persamaan ...',
    gambar: { jenis: 'grafik', fungsi: ['x*x - 4*x + 5', '2*x + 7'], jangkauan: [-2, 6, -2, 12], nama: ['y = x² - 4x + 5', 'y = 2x + 7'] },
    pilihan: ['y = 2x - 4', 'y = 2x + 2', 'y = 2x - 1', 'y = 2x + 7', 'y = 2x - 7'],
    benar: 0,
    langkah: [
      'Sejajar berarti gradien sama: m = 2. Yang dicari absisnya.',
      'f′(x) = 2x - 4 = 2, jadi x = 3. Ordinat f(3) = 9 - 12 + 5 = 2; titik (3, 2).',
      'y - 2 = 2(x - 3), dirapikan y = 2x - 4.',
    ],
    jebakan: 'y = 2x + 7 adalah garis yang DIBERIKAN, bukan garis singgungnya. y = 2x - 1 lupa menggeser lewat (3, 2) dengan benar.',
    alasan: 'Gradien 2 lewat (3, 2).',
  },
  {
    // cek: 2 * (12 - 4)**2 === 128 && 12*4 - 96*2 + 144 === 0
    id: 'turunan-sulit-05',
    tingkat: 'sulit',
    pertanyaan: 'Selembar karton persegi bersisi 12 cm dipotong keempat pojoknya berbentuk persegi bersisi x, lalu dilipat menjadi kotak tanpa tutup. Isi kotak terbesarnya adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['x*(12 - 2*x)*(12 - 2*x)'], jangkauan: [0, 6, 0, 140], titik: [{ x: 2, y: 128, label: '(2, 128)' }] },
    pilihan: ['128 cm³', '2 cm³', '64 cm³', '144 cm³', '108 cm³'],
    benar: 0,
    langkah: [
      'V(x) = x(12 - 2x)² = 4x³ - 48x² + 144x.',
      'V′(x) = 12x² - 96x + 144 = 12(x - 2)(x - 6). Akar 2 dan 6; x = 6 dibuang (alasnya habis).',
      'Uji tanda: V′(1) = 60 (+), V′(3) = -36 (-), jadi x = 2 maksimum. V(2) = 2 · 8² = 128 cm³.',
    ],
    jebakan: '2 cm³ adalah NILAI x yang memaksimumkan, bukan isinya (satuannya pun tidak cocok). 64 lupa mengalikan tinggi x = 2.',
    alasan: 'x = 2, V = 128.',
  },
  {
    // cek: 12*1 - 6 === 6
    id: 'turunan-sulit-06',
    tingkat: 'sulit',
    pertanyaan: 'Jika f(x) = x⁴ - 3x², berapakah nilai turunan KEDUA di x = 1?',
    pilihan: ['6', '-2', '12', '0', '-6'],
    benar: 0,
    langkah: [
      'f′(x) = 4x³ - 6x.',
      'f″(x) = 12x² - 6.',
      'Di x = 1: 12 - 6 = 6.',
    ],
    jebakan: '-2 adalah f′(1), turunan PERTAMA; kekeliruan paling sering pada soal turunan kedua adalah berhenti sekali. 12 lupa suku -6.',
    alasan: '12 - 6 = 6.',
  },
  {
    // cek: Math.abs((Math.sqrt(4.0001**2 + 9) - Math.sqrt(3.9999**2 + 9)) / 2e-4 - 0.8) < 1e-6
    id: 'turunan-sulit-07',
    tingkat: 'sulit',
    pertanyaan: 'Jika f(x) = √(x² + 9), berapakah f′(4)?',
    pilihan: ['4/5', '1/5', '5', '8/5', '1/10'],
    benar: 0,
    langkah: [
      'Tulis (x² + 9)^(1/2). Bagian dalam x² + 9, turunannya 2x.',
      'f′(x) = (1/2)(x² + 9)^(-1/2) · 2x = x : √(x² + 9).',
      'Di x = 4: √25 = 5, jadi 4/5.',
    ],
    jebakan: '1/5 kehilangan pengali 2x (rantai terlewat). 8/5 lupa pembagi 2 dari turunan akar. 5 adalah f(4).',
    alasan: '4/√25 = 4/5.',
  },
  {
    // cek: 20 + 2*50/10 === 30
    id: 'turunan-sulit-08',
    tingkat: 'sulit',
    pertanyaan: 'Biaya total membuat x barang adalah B(x) = 1.000 + 20x + x² : 10 ribu rupiah. Biaya marginal saat produksi 50 barang adalah ...',
    pilihan: ['30 ribu rupiah', '25 ribu rupiah', '20 ribu rupiah', '2.250 ribu rupiah', '45 ribu rupiah'],
    benar: 0,
    langkah: [
      'Biaya marginal = turunan biaya total: B′(x) = 20 + 2x : 10 = 20 + x : 5.',
      'Di x = 50: 20 + 10 = 30 ribu rupiah.',
    ],
    jebakan: '2.250 adalah B(50), seluruh biayanya. 45 adalah biaya RATA-RATA per barang (2.250 : 50), bukan biaya marginal (tambahan biaya untuk satu barang berikutnya).',
    alasan: 'B′(50) = 30.',
  },
  {
    // cek: 2**3 - 12*2 === -16 && 3*4 - 12 === 0
    id: 'turunan-sulit-09',
    tingkat: 'sulit',
    pertanyaan: 'Nilai minimum lokal fungsi f(x) = x³ - 12x adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['x*x*x - 12*x'], jangkauan: [-4, 4, -20, 20] },
    pilihan: ['-16', '16', '2', '-2', '0'],
    benar: 0,
    langkah: [
      'f′(x) = 3x² - 12 = 3(x - 2)(x + 2), akarnya -2 dan 2.',
      'Uji tanda: f′(0) = -12 (-), f′(3) = 15 (+): di x = 2 berubah turun ke naik, minimum.',
      'Nilai minimumnya f(2) = 8 - 24 = -16.',
    ],
    jebakan: '2 adalah LETAK minimum (nilai x), bukan nilai minimumnya. 16 adalah f(-2), nilai maksimum lokal.',
    alasan: 'f(2) = -16.',
  },
  {
    // cek: 2*1 + 2 === 4 && 1 + 2 === 3 && 4*1 - 1 === 3
    id: 'turunan-sulit-10',
    tingkat: 'sulit',
    pertanyaan: 'Garis singgung kurva y = x² + 2x yang tegak lurus garis y = -x/4 + 1 mempunyai persamaan ...',
    gambar: { jenis: 'grafik', fungsi: ['x*x + 2*x', '-x/4 + 1'], jangkauan: [-4, 3, -3, 8], nama: ['y = x² + 2x', 'y = -x/4 + 1'] },
    pilihan: ['y = 4x - 1', 'y = -x/4 + 3', 'y = 4x + 3', 'y = 4x', 'y = -4x + 7'],
    benar: 0,
    langkah: [
      'Tegak lurus: hasil kali gradien -1. Gradien garis yang diberi -1/4, jadi gradien singgungnya 4.',
      'f′(x) = 2x + 2 = 4, jadi x = 1. Ordinat f(1) = 3; titik (1, 3).',
      'y - 3 = 4(x - 1), dirapikan y = 4x - 1.',
    ],
    jebakan: 'y = -x/4 + 3 memakai gradien yang SAMA (sejajar), bukan tegak lurus. y = 4x + 3 memakai 3 sebagai tetapan tanpa menggeser.',
    alasan: 'm = 4 lewat (1, 3).',
  },
  {
    // cek: Math.abs(-9 * Math.sin(3 * Math.PI / 6) - (-9)) < 1e-9
    id: 'turunan-sulit-11',
    tingkat: 'sulit',
    pertanyaan: 'Jika f(x) = sin 3x, berapakah f″(π/6)?',
    pilihan: ['-9', '9', '-3', '0', '3'],
    benar: 0,
    langkah: [
      'f′(x) = 3 cos 3x (rantai).',
      'f″(x) = 3 · (-3 sin 3x) = -9 sin 3x (rantai lagi).',
      'Di x = π/6: 3x = π/2, sin = 1, jadi -9.',
    ],
    jebakan: '-3 memakai rantai hanya sekali. 0 adalah f′(π/6) (cos π/2 = 0), turunan pertama, bukan kedua.',
    alasan: '-9 sin(π/2) = -9.',
  },
  {
    // cek: (4*(-2)**3 - 4*(-2)) < 0 && (4*0.5**3 - 4*0.5) < 0 && (4*(-0.5)**3 - 4*(-0.5)) > 0
    id: 'turunan-sulit-12',
    tingkat: 'sulit',
    pertanyaan: 'Fungsi f(x) = x⁴ - 2x² turun pada selang ...',
    gambar: { jenis: 'grafik', fungsi: ['x*x*x*x - 2*x*x'], jangkauan: [-2, 2, -2, 4] },
    pilihan: ['x < -1 atau 0 < x < 1', '-1 < x < 0 atau x > 1', 'x < 0', '-1 < x < 1', 'x > 1'],
    benar: 0,
    langkah: [
      'f′(x) = 4x³ - 4x = 4x(x - 1)(x + 1), akarnya -1, 0, 1: EMPAT selang.',
      'Uji: f′(-2) = -24 (-), f′(-0,5) = 1,5 (+), f′(0,5) = -1,5 (-), f′(2) = 24 (+).',
      'Turun di tempat f′ negatif: x < -1 atau 0 < x < 1. Cocok dengan gambar berbentuk W.',
    ],
    jebakan: '"-1 < x < 1" mengira lembah tunggal; grafiknya W dengan dua lembah, sehingga di antara -1 dan 0 fungsinya justru NAIK. Tiga akar berarti empat selang yang harus diuji semua.',
    alasan: 'f′ < 0 di x < -1 dan 0 < x < 1.',
  },
  {
    // cek: 5 * (10 - 5) === 25 && 10 - 2*5 === 0
    id: 'turunan-sulit-13',
    tingkat: 'sulit',
    pertanyaan: 'Jumlah dua bilangan positif adalah 10. Hasil kali terbesar yang mungkin dari keduanya adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['x*(10 - x)'], jangkauan: [0, 10, 0, 30], titik: [{ x: 5, y: 25, label: '(5, 25)' }] },
    pilihan: ['25', '24', '50', '10', '21'],
    benar: 0,
    langkah: [
      'Misalkan bilangannya x dan 10 - x. Hasil kali P(x) = x(10 - x) = 10x - x².',
      'P′(x) = 10 - 2x = 0 memberi x = 5. P″ = -2 negatif: maksimum.',
      'P(5) = 5 · 5 = 25.',
    ],
    jebakan: '24 (4 · 6) dan 21 (3 · 7) dekat tetapi bukan yang terbesar; menebak angka bulat tidak menjamin maksimum. 10 adalah jumlahnya.',
    alasan: 'x = 5: 25.',
  },
  {
    // cek: Math.abs((1.0001*Math.exp(1.0001) - 0.9999*Math.exp(0.9999)) / 2e-4 - 2*Math.E) < 1e-5
    id: 'turunan-sulit-14',
    tingkat: 'sulit',
    pertanyaan: 'Jika f(x) = x eˣ, berapakah f′(1)?',
    pilihan: ['2e', 'e', '1', 'e + 1', 'e²'],
    benar: 0,
    langkah: [
      'Aturan hasil kali: u = x, v = eˣ. f′ = 1 · eˣ + x · eˣ = (1 + x)eˣ.',
      'Di x = 1: 2e.',
    ],
    jebakan: 'e adalah f(1) dan juga hasil mengalikan turunan keduanya (1 · eˣ) tanpa aturan hasil kali. e + 1 menjumlahkan, bukan mengalikan (1 + x) dengan eˣ.',
    alasan: '(1 + 1)e = 2e.',
  },
  {
    // cek: 30*3 - 5*9 === 45 && 30 - 10*3 === 0
    id: 'turunan-sulit-15',
    tingkat: 'sulit',
    pertanyaan: 'Tinggi sebuah bola setelah t detik adalah h(t) = 30t - 5t² meter. Tinggi maksimum yang dicapai bola adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['30*x - 5*x*x'], jangkauan: [0, 6, 0, 50], titik: [{ x: 3, y: 45, label: '(3, 45)' }] },
    pilihan: ['45 m', '3 m', '30 m', '25 m', '90 m'],
    benar: 0,
    langkah: [
      'Di puncak, kecepatan nol: h′(t) = 30 - 10t = 0 memberi t = 3.',
      'Tinggi maksimum h(3) = 90 - 45 = 45 m.',
    ],
    jebakan: '3 adalah WAKTU mencapai puncak, bukan tingginya. 30 adalah kecepatan awal. 25 adalah h(1).',
    alasan: 't = 3, h = 45.',
  },

  /* ================= SANGAT SULIT ================= */
  {
    // cek: Math.abs((((2*2.0001 + 1)**3/(2.0001 - 1)) - ((2*1.9999 + 1)**3/(1.9999 - 1))) / 2e-4 - 25) < 1e-3
    id: 'turunan-sangat-01',
    tingkat: 'sangat sulit',
    pertanyaan: 'Jika f(x) = (2x + 1)³ : (x - 1), berapakah f′(2)?',
    pilihan: ['25', '-50', '150', '275', '125'],
    benar: 0,
    langkah: [
      'Dua alat: hasil bagi di luar, rantai di dalam pembilang. u = (2x + 1)³, u′ = 3(2x + 1)² · 2 = 6(2x + 1)²; v = x - 1, v′ = 1.',
      'Pembilang: 6(2x + 1)²(x - 1) - (2x + 1)³. Di x = 2: 6 · 25 · 1 - 125 = 25.',
      'Penyebut (x - 1)² = 1. f′(2) = 25.',
    ],
    jebakan: '-50 kehilangan pengali 2 dari bagian dalam (3 · 25 · 1 - 125). 150 melupakan suku kedua aturan hasil bagi. 125 adalah f(2).',
    alasan: '(150 - 125)/1 = 25.',
  },
  {
    // cek: 2*1*0 - 1 === -1 && 2*1 - 1 === 1
    id: 'turunan-sangat-02',
    tingkat: 'sangat sulit',
    pertanyaan: 'Salah satu garis singgung kurva y = x² yang melalui titik (0, -1) adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-3, 3, -2, 6], titik: [{ x: 0, y: -1, label: '(0, -1)' }] },
    pilihan: ['y = 2x - 1', 'y = 2x + 1', 'y = x - 1', 'y = -1', 'y = 2x'],
    benar: 0,
    langkah: [
      '(0, -1) TIDAK pada kurva (0² bukan -1), jadi titik singgungnya tidak diketahui: misalkan (a, a²).',
      'Garis singgungnya y = 2ax - a² (gradien 2a). Harus lewat (0, -1): -1 = -a², jadi a = 1 atau a = -1.',
      'a = 1: y = 2x - 1. (a = -1 memberi garis kedua, y = -2x - 1.)',
    ],
    jebakan: 'y = -1 mengira (0, -1) titik singgungnya sendiri; padahal titik itu di luar kurva. y = 2x + 1 salah tanda tetapan (tidak lewat (0, -1)).',
    alasan: 'a = 1: y = 2x - 1.',
  },
  {
    // cek: 100 + 4*10*5 === 300 && 10*10*5 === 500
    id: 'turunan-sangat-03',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah kotak beralas persegi TANPA tutup dibuat dari bahan seluas 300 cm². Isi kotak terbesar yang mungkin adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['(300*x - x*x*x)/4'], jangkauan: [0, 17, 0, 600], titik: [{ x: 10, y: 500, label: '(10, 500)' }] },
    pilihan: ['500 cm³', '1.000 cm³', '250 cm³', '300 cm³', '750 cm³'],
    benar: 0,
    langkah: [
      'Alas s × s, tinggi t. Bahan: s² + 4st = 300, jadi t = (300 - s²) : 4s.',
      'Isi V = s²t = (300s - s³) : 4. V′ = (300 - 3s²) : 4 = 0 memberi s² = 100, s = 10.',
      't = (300 - 100) : 40 = 5. V = 10 · 10 · 5 = 500 cm³.',
    ],
    jebakan: '1.000 mengira kotaknya kubus (10³); kotak paling berisi di sini justru bukan kubus. 300 menyamakan isi dengan luas bahan.',
    alasan: 's = 10, t = 5: 500.',
  },
  {
    // cek: 3 * 25 * 2 === 150
    id: 'turunan-sangat-04',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sisi sebuah kubus memanjang dengan laju tetap 2 cm per detik. Pada saat sisinya 5 cm, isinya bertambah dengan laju ...',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1] },
    pilihan: ['150 cm³ per detik', '75 cm³ per detik', '50 cm³ per detik', '250 cm³ per detik', '30 cm³ per detik'],
    benar: 0,
    langkah: [
      'V = s³, dan s berubah terhadap waktu: rantai terhadap WAKTU.',
      'Laju isi = 3s² × laju sisi.',
      'Saat s = 5: 3 · 25 · 2 = 150 cm³ per detik.',
    ],
    jebakan: '75 lupa mengalikan laju sisi 2 (hanya 3s²). 250 memakai s³ dikali 2. 30 memakai 3s dikali 2.',
    alasan: '3s² · 2 = 150.',
  },
  {
    // cek: 1 - 3 === -2 && 3*1 - 3 === 0
    id: 'turunan-sangat-05',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kurva y = x³ - 3x punya dua titik dengan garis singgung mendatar. Persamaan garis singgung di titik yang ORDINATNYA negatif adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['x*x*x - 3*x'], jangkauan: [-2.5, 2.5, -4, 4] },
    pilihan: ['y = -2', 'y = 2', 'x = 1', 'y = 0', 'y = -2x'],
    benar: 0,
    langkah: [
      'Mendatar berarti f′ = 0: 3x² - 3 = 0, x = -1 atau x = 1.',
      'f(-1) = 2 (positif), f(1) = -2 (negatif): syarat soal memilih x = 1.',
      'Gradien 0 lewat (1, -2): y = -2.',
    ],
    jebakan: 'y = 2 memakai titik yang ordinatnya positif (syarat terbalik). x = 1 adalah garis TEGAK, bukan mendatar.',
    alasan: 'Titik (1, -2): y = -2.',
  },
  {
    // cek: 16 + 4*4*2 === 48 && 16 * 2 === 32
    id: 'turunan-sangat-06',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah tangki tanpa tutup beralas persegi mempunyai isi 32 m³. Luas bahan paling sedikit yang diperlukan adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['x*x + 128/x'], jangkauan: [1, 9, 0, 140], titik: [{ x: 4, y: 48, label: '(4, 48)' }] },
    pilihan: ['48 m²', '32 m²', '64 m²', '96 m²', '16 m²'],
    benar: 0,
    langkah: [
      'Alas s × s, tinggi t: s²t = 32, jadi t = 32 : s².',
      'Luas bahan L = s² + 4st = s² + 128 : s. L′ = 2s - 128 : s² = 0 memberi s³ = 64, s = 4.',
      't = 32 : 16 = 2. L = 16 + 4 · 4 · 2 = 48 m².',
    ],
    jebakan: '32 hanya menghitung alas (dan menyamakan dengan isinya). 64 menambahkan tutup padahal tangkinya tanpa tutup.',
    alasan: 's = 4, t = 2: 48.',
  },
  {
    // cek: 3*(-1)**2 - 6*(-1) > 0 && 3*1 - 6 < 0 && 6*1 - 6 === 0
    id: 'turunan-sangat-07',
    tingkat: 'sangat sulit',
    pertanyaan: 'Diberikan f(x) = x³ - 3x² + 2. Pernyataan yang BENAR adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['x*x*x - 3*x*x + 2'], jangkauan: [-1.5, 3.5, -3, 4] },
    pilihan: [
      'di x = 0 fungsi mencapai maksimum, dan turunan keduanya nol di x = 1',
      'di x = 0 fungsi mencapai minimum, dan turunan keduanya nol di x = 1',
      'fungsi naik pada 0 < x < 2',
      'turunan keduanya nol di x = 2',
      'fungsi ini tidak punya titik stasioner',
    ],
    benar: 0,
    langkah: [
      'f′(x) = 3x² - 6x = 3x(x - 2), akarnya 0 dan 2.',
      'Uji tanda: f′(-1) = 9 (+), f′(1) = -3 (-): di x = 0 berubah naik ke turun, MAKSIMUM. Pada 0 < x < 2 fungsinya turun.',
      'f″(x) = 6x - 6 = 0 di x = 1, bukan 2.',
    ],
    jebakan: 'Pilihan kedua benar separuh (turunan kedua) tetapi salah jenis titik ekstremnya. Dua alat harus dipakai sekaligus: tanda f′ dan akar f″.',
    alasan: 'Maksimum di 0, f″ = 0 di 1.',
  },
  {
    // cek: 12*(-1) + 4*3 === 0 && -1 + 3 + 3 === 5
    id: 'turunan-sangat-08',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kurva y = ax³ + bx² + 3 mempunyai titik stasioner di x = 2 dan melalui titik (1, 5). Nilai a adalah ...',
    pilihan: ['-1', '1', '-3', '3', '2'],
    benar: 0,
    langkah: [
      'f′(x) = 3ax² + 2bx. Stasioner di 2: 12a + 4b = 0, yaitu 3a + b = 0.',
      'Lewat (1, 5): a + b + 3 = 5, yaitu a + b = 2.',
      'Kurangkan: 2a = -2, a = -1 (dan b = 3). Periksa: f′(2) = -12 + 12 = 0, f(1) = -1 + 3 + 3 = 5.',
    ],
    jebakan: '1 hanya memakai syarat kedua lalu menebak. -3 kehilangan pengali 2 pada turunan bx².',
    alasan: 'a = -1, b = 3.',
  },
  {
    // cek: Math.abs((1 + 1) / 1 - 2) < 1e-9 && 1 - 1/1 === 0
    id: 'turunan-sangat-09',
    tingkat: 'sangat sulit',
    pertanyaan: 'Untuk x > 0, nilai minimum fungsi f(x) = (x² + 1) : x adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['(x*x + 1)/x'], jangkauan: [0.2, 4, 0, 6], titik: [{ x: 1, y: 2, label: '(1, 2)' }] },
    pilihan: ['2', '1', '0', '1/2', 'tidak ada'],
    benar: 0,
    langkah: [
      'Pecah dulu: f(x) = x + 1/x, lebih mudah daripada aturan hasil bagi.',
      'f′(x) = 1 - 1/x² = 0 memberi x² = 1, x = 1 (x = -1 dibuang, syarat x > 0).',
      'Uji: f′(0,5) = -3 (-), f′(2) = 0,75 (+): minimum. f(1) = 2.',
    ],
    jebakan: '1 adalah LETAK minimum (x), bukan nilainya. "tidak ada" mengira fungsi yang meledak di dekat 0 tidak punya minimum; ia punya, di x = 1.',
    alasan: 'x = 1, f = 2.',
  },
  {
    // cek: 1 - 4 + 3 === 0 && 9 - 12 + 3 === 0 && 2*1 + 2*3 === 8
    id: 'turunan-sangat-10',
    tingkat: 'sangat sulit',
    pertanyaan: 'Dari titik (2, 3) dapat ditarik dua garis singgung ke parabola y = x². Jumlah gradien kedua garis singgung itu adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-1, 4, -1, 10], titik: [{ x: 2, y: 3, label: '(2, 3)' }] },
    pilihan: ['8', '4', '6', '12', '2'],
    benar: 0,
    langkah: [
      '(2, 3) di bawah parabola (2² = 4 bukan 3): titik luar. Misalkan titik singgung (a, a²), garisnya y = 2ax - a².',
      'Lewat (2, 3): 3 = 4a - a², jadi a² - 4a + 3 = 0, (a - 1)(a - 3) = 0: a = 1 atau 3.',
      'Gradiennya 2a: 2 dan 6. Jumlahnya 8.',
    ],
    jebakan: '4 adalah f′(2) = 2 · 2, mengira (2, 3) titik singgungnya. 2 dan 6 masing-masing hanya satu gradien.',
    alasan: 'a = 1 dan 3: 2 + 6 = 8.',
  },
  {
    // cek: 3*1 + 2*(-6)*1 + 9 === 0 && 3*9 + 2*(-6)*3 + 9 === 0 && -6 + 9 === 3
    id: 'turunan-sangat-11',
    tingkat: 'sangat sulit',
    pertanyaan: 'Fungsi f(x) = x³ + ax² + bx mempunyai titik stasioner di x = 1 dan x = 3. Nilai a + b adalah ...',
    pilihan: ['3', '-3', '15', '-15', '9'],
    benar: 0,
    langkah: [
      'f′(x) = 3x² + 2ax + b harus nol di 1 dan 3, jadi f′(x) = 3(x - 1)(x - 3) = 3x² - 12x + 9.',
      'Samakan koefisien: 2a = -12 memberi a = -6; b = 9.',
      'a + b = 3. Periksa: f′(1) = 3 - 12 + 9 = 0, f′(3) = 27 - 36 + 9 = 0.',
    ],
    jebakan: '-15 mengira a = -12 (lupa 2a = -12, bukan a). 15 salah tanda pada a.',
    alasan: 'a = -6, b = 9.',
  },
  {
    // cek: Math.abs((20 - 2*(10/3)) * (20 - 6*(10/3))) < 1e-9
    id: 'turunan-sangat-12',
    tingkat: 'sangat sulit',
    pertanyaan: 'Karton persegi bersisi 20 cm dipotong keempat pojoknya berbentuk persegi bersisi x, lalu dilipat menjadi kotak tanpa tutup. Nilai x supaya isinya terbesar adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['x*(20 - 2*x)*(20 - 2*x)'], jangkauan: [0, 10, 0, 650] },
    pilihan: ['10/3 cm', '10 cm', '5 cm', '20/3 cm', '2 cm'],
    benar: 0,
    langkah: [
      'V(x) = x(20 - 2x)². Turunkan dengan aturan hasil kali dan rantai: V′ = (20 - 2x)² + x · 2(20 - 2x)(-2) = (20 - 2x)(20 - 6x).',
      'V′ = 0: x = 10 (dibuang, alas habis) atau x = 10/3.',
      'Uji tanda: V′(1) > 0, V′(5) < 0: maksimum di x = 10/3 cm, kira-kira 3,33.',
    ],
    jebakan: '10 adalah akar yang harus DIBUANG (kotaknya tidak ada). 5 hanya tebakan "seperempat sisi". Jangan menjabarkan (20 - 2x)² kalau memfaktorkan lebih cepat.',
    alasan: '(20 - 2x)(20 - 6x) = 0: x = 10/3.',
  },
  {
    // cek: Math.abs(4 * Math.PI * 9 * 2 - 72 * Math.PI) < 1e-9
    id: 'turunan-sangat-13',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah balon berbentuk bola ditiup sehingga jari-jarinya bertambah 2 cm per detik. Saat jari-jarinya 3 cm, isinya bertambah dengan laju ... (V = 4/3 π r³)',
    pilihan: ['72π cm³ per detik', '36π cm³ per detik', '24π cm³ per detik', '12π cm³ per detik', '108π cm³ per detik'],
    benar: 0,
    langkah: [
      'Rantai terhadap waktu: laju isi = (turunan V terhadap r) × laju r.',
      'dV/dr = 4πr². Di r = 3: 36π.',
      '36π × 2 = 72π cm³ per detik.',
    ],
    jebakan: '36π lupa mengalikan laju jari-jari. 24π memakai 4πr (luas keliling), bukan 4πr². 108π memakai r³.',
    alasan: '4π(9)(2) = 72π.',
  },
  {
    // cek: Math.abs(Math.sin(Math.PI/4) + Math.cos(Math.PI/4) - Math.SQRT2) < 1e-9
    id: 'turunan-sangat-14',
    tingkat: 'sangat sulit',
    pertanyaan: 'Nilai maksimum fungsi f(x) = sin x + cos x pada 0 ≤ x ≤ 2π adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['Math.sin(x) + Math.cos(x)'], jangkauan: [0, 6.3, -2, 2] },
    pilihan: ['√2', '2', '1', '√3', '1 + √2'],
    benar: 0,
    langkah: [
      'f′(x) = cos x - sin x = 0 memberi tan x = 1: x = π/4 atau 5π/4.',
      'f(π/4) = √2/2 + √2/2 = √2; f(5π/4) = -√2 (minimum). Ujung selang: f(0) = f(2π) = 1.',
      'Maksimumnya √2, kira-kira 1,41.',
    ],
    jebakan: '2 menjumlahkan maksimum sin (1) dan maksimum cos (1), padahal keduanya tidak terjadi di x yang sama. 1 adalah nilai di ujung selang.',
    alasan: 'Di π/4: √2.',
  },
  {
    // cek: Math.abs(Math.sqrt(2.5 + (2.5 - 3)**2) - Math.sqrt(11)/2) < 1e-9 && 4*Math.sqrt(2.5)**3 - 10*Math.sqrt(2.5) < 1e-9
    id: 'turunan-sangat-15',
    tingkat: 'sangat sulit',
    pertanyaan: 'Jarak terdekat dari titik (0, 3) ke parabola y = x² adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-3, 3, -1, 6], titik: [{ x: 0, y: 3, label: '(0, 3)' }] },
    pilihan: ['√11 dibagi 2', '3', '√3', '√5 dibagi 2', '2'],
    benar: 0,
    langkah: [
      'Titik pada parabola (x, x²). Kuadrat jaraknya D = x² + (x² - 3)² = x⁴ - 5x² + 9 (minimumkan kuadratnya supaya tanpa akar).',
      'D′ = 4x³ - 10x = 2x(2x² - 5) = 0: x = 0 atau x² = 5/2. Di x = 0, D = 9 (maksimum lokal); di x² = 5/2, D = 25/4 - 25/2 + 9 = 11/4.',
      'Jarak terdekat √(11/4) = √11 : 2, kira-kira 1,66.',
    ],
    jebakan: '3 mengukur ke titik puncak (0, 0) saja, padahal titik terdekatnya di lereng parabola, bukan di puncak. 2 dan √3 tebakan tanpa turunan.',
    alasan: 'x² = 5/2: d = √11/2.',
  },
]
