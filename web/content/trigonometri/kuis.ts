/**
 * Bank soal latihan Trigonometri: 60 soal, 15 tiap tingkat (13 Sep 2026).
 *
 * SEJARAH: 1 Sep 2026 bank ini 32 soal (8 per tingkat) supaya kuis materi
 * yang mengambil 8 soal acak tidak mengulang. 13 Sep 2026 ARYA meminta 15
 * soal per tingkat, syarat naik 10 benar, pembahasan bernomor bergambar,
 * dan penjelasan kenapa pengecoh menggoda. Id soal lama (k01 sampai k32)
 * DIPERTAHANKAN supaya kemajuan siswa di peramban tidak hilang; beberapa
 * pindah tingkat karena kalibrasi (k26 dan k30 turun ke sedang, k27 sampai
 * k32 turun ke sulit). Soal baru k33 sampai k60.
 *
 * KALIBRASI (semua soal tulisan sendiri, tidak ada yang disalin):
 * - mudah dan sedang: Buku Panduan Guru Matematika Kelas X Bab 4 (Latihan
 *   4.1 sampai 4.7 dan Uji Kompetensi: penamaan sisi, tan dari bayangan,
 *   sebangun, layang-layang Wanimbo, sudut komplementer, tangga jendela,
 *   dua jarak dengan tan 45 dan tan 60);
 * - sulit: pola UTBK di mathcyber1997.com/soal-dan-pembahasan-aplikasi-
 *   trigonometri (elevasi, depresi, dua pengamat, kemiringan jalan);
 * - sangat sulit: 5 bergaya olimpiade (segitiga bertingkat, urutan sin 1,
 *   sin 2, sin 3 radian, jumlah akar persamaan, rotasi 90 derajat di
 *   lingkaran satuan, sin + cos = k) dan 10 sulit-biasa dari mathcyber1997
 *   .com/soal-dan-pembahasan-perbandingan-trigonometri-sudut-istimewa
 *   (kuadran III, sudut berelasi, p dan q).
 *
 * CAKUPAN dibatasi materi 1 sampai 10: perbandingan pada segitiga siku-siku,
 * sebangun, lingkaran satuan dan kuadran, enam perbandingan dan garis
 * singgung, sudut istimewa, grafik sin cos tan (amplitudo, periode),
 * penerapan elevasi dan depresi. Identitas sudut ganda, aturan sinus dan
 * kosinus sengaja TIDAK dipakai karena belum diperkenalkan.
 *
 * Tiap jawaban berangka punya `// cek:` yang dihitung `alat/cek_kuis.mjs`.
 */
export type { TingkatKuis, SoalKuis } from '@/content/tipe'
import type { SoalKuis } from '@/content/tipe'

export const KUIS: SoalKuis[] = [
  // ================================================================ MUDAH
  {
    id: 'k01',
    tingkat: 'mudah',
    pertanyaan: 'Pada segitiga siku-siku, sisi yang menghadap sudut siku-siku disebut sisi…',
    gambar: { jenis: 'segitiga', sudut: 35, label: ['?', '?', '?'], namaSudut: 'θ' },
    pilihan: ['depan', 'samping', 'miring', 'alas', 'tegak'],
    benar: 2,
    langkah: [
      'Cari sudut siku-sikunya dulu: pada gambar ada di pojok kanan bawah.',
      'Sisi yang berada di seberang sudut itu, tidak menyentuhnya, adalah sisi miring.',
      'Sisi miring selalu yang terpanjang, karena menghadap sudut terbesar.',
    ],
    jebakan: 'Pilihan "tegak" dan "alas" menggoda karena menyebut posisi di gambar, padahal nama sisi ditentukan oleh sudut, bukan oleh arah gambarnya. Segitiga yang diputar tetap punya sisi miring yang sama.',
    alasan: 'Sisi miring selalu yang menghadap sudut siku-siku, dan selalu sisi terpanjang.',
  },
  {
    id: 'k02',
    tingkat: 'mudah',
    pertanyaan: 'sin θ adalah perbandingan antara…',
    gambar: { jenis: 'segitiga', sudut: 35, label: ['depan', 'samping', 'miring'], namaSudut: 'θ' },
    pilihan: ['depan : samping', 'depan : miring', 'samping : miring', 'miring : depan', 'samping : depan'],
    benar: 1,
    langkah: [
      'Tandai sudut θ, lalu namai sisinya: depan adalah sisi di seberang θ, samping menempel θ, miring menghadap siku.',
      'Sinus membandingkan sisi depan dengan sisi miring: sin θ = depan : miring.',
      'Ini asal katanya: sinus mengukur "tinggi" titik kalau sisi miringnya dianggap 1.',
    ],
    jebakan: '"depan : samping" adalah tan θ dan "samping : miring" adalah cos θ. Ketiganya sama-sama pecahan dari sisi segitiga, jadi yang membedakan hanya sisi mana yang dipasangkan.',
    alasan: 'sin θ = depan : miring. Yang "depan : samping" itu tan, "samping : miring" itu cos.',
  },
  {
    id: 'k03',
    tingkat: 'mudah',
    pertanyaan: 'Nilai tan 45° adalah…',
    gambar: { jenis: 'segitiga', sudut: 45, label: ['1', '1', '√2'], namaSudut: '45°' },
    pilihan: ['0,5', '1', '√2', '√3', '0'],
    benar: 1,
    langkah: [
      'Segitiga siku-siku bersudut 45° pasti sama kaki: kedua sudut lancipnya sama, jadi sisi depan dan samping sama panjang.',
      'tan 45° = depan : samping = 1 : 1 = 1.',
    ],
    jebakan: '√2 menggoda karena memang muncul di segitiga 45° sebagai sisi miring; tetapi tan tidak memakai sisi miring.',
    alasan: 'Pada sudut 45° sisi depan dan sisi samping sama panjang, jadi hasil baginya 1.',
  },
  {
    // cek: Math.abs(3/5 - 0.6) < 1e-9
    id: 'k04',
    tingkat: 'mudah',
    pertanyaan: 'Segitiga siku-siku dengan sisi depan 3 cm dan sisi miring 5 cm. Nilai sin θ =',
    gambar: { jenis: 'segitiga', sudut: 37, label: ['3', '?', '5'], namaSudut: 'θ' },
    pilihan: ['0,6', '0,8', '0,75', '1,67', '0,375'],
    benar: 0,
    langkah: [
      'sin θ = depan : miring.',
      'Masukkan angkanya: 3 : 5 = 0,6.',
      'Sisi samping tidak diperlukan; kalau penasaran, dari Pythagoras nilainya 4.',
    ],
    jebakan: '0,8 adalah cos θ (4 : 5) dan 0,75 adalah tan θ (3 : 4). 1,67 muncul kalau pecahannya dibalik (5 : 3); nilai sin tidak pernah lebih dari 1.',
    alasan: 'sin θ = depan : miring = 3 : 5 = 0,6. Yang 0,8 itu cos θ, karena sisi sampingnya 4.',
  },
  {
    id: 'k05',
    tingkat: 'mudah',
    pertanyaan: 'Pada lingkaran satuan, titik di ujung jari-jari yang membentuk sudut θ berkoordinat…',
    gambar: { jenis: 'lingkaran', sudut: 50, label: '(?, ?)' },
    pilihan: ['(sin θ, cos θ)', '(cos θ, sin θ)', '(tan θ, 1)', '(1, tan θ)', '(θ, sin θ)'],
    benar: 1,
    langkah: [
      'Jari-jari lingkaran satuan panjangnya 1, jadi ia sisi miring segitiga kecil di bawah titik.',
      'Kaki mendatar (biru) = samping : miring = cos θ, itulah koordinat x.',
      'Kaki tegak (merah) = depan : miring = sin θ, itulah koordinat y.',
      'Koordinat ditulis mendatar dulu baru tegak: (cos θ, sin θ).',
    ],
    jebakan: '(sin θ, cos θ) tertukar urutannya; ini kekeliruan paling sering, dan akibatnya semua tanda kuadran ikut terbalik.',
    alasan: 'Mendatar dulu baru tegak: (cos θ, sin θ).',
  },
  {
    id: 'k06',
    tingkat: 'mudah',
    pertanyaan: 'Satu putaran penuh sama dengan…',
    pilihan: ['π radian', '2π radian', '180 radian', '360 radian', 'π/2 radian'],
    benar: 1,
    langkah: [
      'Satu radian adalah sudut saat panjang busur sama dengan jari-jari.',
      'Keliling lingkaran 2π kali jari-jari, jadi satu putaran memuat 2π busur sepanjang jari-jari: 360° = 2π radian.',
    ],
    jebakan: '"360 radian" mencampur satuan derajat dengan nama radian; π radian baru setengah putaran (180°).',
    alasan: 'Satu putaran = 360° = 2π radian. Setengah putaran (180°) yang sama dengan π radian.',
  },
  {
    id: 'k07',
    tingkat: 'mudah',
    pertanyaan: 'Nilai cos 0° adalah…',
    gambar: { jenis: 'lingkaran', sudut: 0, label: '(1, 0)' },
    pilihan: ['0', '0,5', '1', '√3/2', 'tidak terdefinisi'],
    benar: 2,
    langkah: [
      'Pada sudut 0° jari-jari berimpit dengan sumbu-x positif, titiknya (1, 0).',
      'cos θ adalah koordinat x titik itu, jadi cos 0° = 1.',
      'Sekaligus terlihat sin 0° = 0, sebab koordinat y-nya nol.',
    ],
    jebakan: '0 adalah sin 0°, bukan cos 0°. Yang tertukar biasanya mengira "sudut nol berarti semuanya nol".',
    alasan: 'Pada sudut 0° titik lingkaran satuan ada di (1, 0). Koordinat mendatarnya 1, jadi cos 0° = 1.',
  },
  {
    id: 'k08',
    tingkat: 'mudah',
    pertanyaan: 'Nilai terbesar yang mungkin dicapai sin θ adalah…',
    gambar: { jenis: 'lingkaran', sudut: 90, label: '(0, 1)' },
    pilihan: ['1', '90', '180', 'tak terhingga', '0,5'],
    benar: 0,
    langkah: [
      'sin θ adalah tinggi titik pada lingkaran yang jari-jarinya 1.',
      'Titik paling tinggi ada tepat di atas pusat, pada sudut 90°, tingginya 1.',
      'Jadi sin θ paling besar 1, tercapai saat θ = 90°.',
    ],
    jebakan: '90 adalah SUDUT tempat nilai terbesar itu tercapai, bukan nilainya. Nilai sin tidak pernah lebih dari jari-jari.',
    alasan: 'sin θ adalah tinggi titik pada lingkaran berjari-jari satu, jadi tidak mungkin lebih dari 1.',
  },
  {
    id: 'k33',
    tingkat: 'mudah',
    pertanyaan: 'cos θ adalah perbandingan antara…',
    gambar: { jenis: 'segitiga', sudut: 35, label: ['depan', 'samping', 'miring'], namaSudut: 'θ' },
    pilihan: ['depan : miring', 'samping : miring', 'depan : samping', 'miring : samping', 'samping : depan'],
    benar: 1,
    langkah: [
      'Namai sisi dari sudut θ: samping menempel θ, miring menghadap siku.',
      'Kosinus membandingkan sisi samping dengan sisi miring: cos θ = samping : miring.',
    ],
    jebakan: '"depan : miring" adalah sin θ; "miring : samping" adalah kebalikan cos, yaitu sec θ.',
    alasan: 'cos θ = samping : miring.',
  },
  {
    // cek: Math.abs(8/10 - 0.8) < 1e-9
    id: 'k34',
    tingkat: 'mudah',
    pertanyaan: 'Segitiga siku-siku dengan sisi samping 8 cm dan sisi miring 10 cm. Nilai cos θ =',
    gambar: { jenis: 'segitiga', sudut: 37, label: ['?', '8', '10'], namaSudut: 'θ' },
    pilihan: ['0,6', '0,8', '0,75', '1,25', '1,33'],
    benar: 1,
    langkah: [
      'cos θ = samping : miring.',
      '8 : 10 = 0,8.',
      'Sisi depan (6 cm dari Pythagoras) tidak dipakai di sini.',
    ],
    jebakan: '0,6 adalah sin θ (6 : 10); 1,25 adalah pecahan yang dibalik (10 : 8), padahal cos selalu di antara -1 dan 1.',
    alasan: 'cos θ = samping : miring = 8 : 10 = 0,8.',
  },
  {
    id: 'k35',
    tingkat: 'mudah',
    pertanyaan: 'Sudut 90° sama dengan…',
    pilihan: ['π radian', 'π/2 radian', 'π/4 radian', '2π radian', '90π radian'],
    benar: 1,
    langkah: [
      '180° = π radian.',
      '90° adalah setengahnya, jadi 90° = π/2 radian.',
    ],
    jebakan: '"90π radian" menempelkan π begitu saja pada angka derajat; ubahnya lewat perbandingan 180° = π.',
    alasan: '90° = π/2 radian karena 180° = π radian.',
  },
  {
    // cek: Math.abs(Math.sin(30*D) - 0.5) < 1e-9
    id: 'k36',
    tingkat: 'mudah',
    pertanyaan: 'Nilai sin 30° adalah…',
    gambar: { jenis: 'segitiga', sudut: 30, label: ['1', '√3', '2'], namaSudut: '30°' },
    pilihan: ['0,5', '√3/2', '1', '√2/2', '0,3'],
    benar: 0,
    langkah: [
      'Segitiga 30°-60°-90° lahir dari segitiga sama sisi yang dibelah dua: sisi miring 2, sisi depan 30° adalah 1.',
      'sin 30° = depan : miring = 1 : 2 = 0,5.',
    ],
    jebakan: '√3/2 adalah cos 30° (sisi samping √3 dibagi 2). 0,3 menggoda karena angkanya "mirip 30"; nilai sin tidak dibaca dari besar sudutnya.',
    alasan: 'sin 30° = 1 : 2 = 0,5 dari segitiga 30-60-90 bersisi 1, √3, 2.',
  },
  {
    id: 'k37',
    tingkat: 'mudah',
    pertanyaan: 'Titik (0, 1) pada lingkaran satuan dicapai pada sudut…',
    gambar: { jenis: 'lingkaran', sudut: 90, label: '(0, 1)' },
    pilihan: ['0°', '45°', '90°', '180°', '270°'],
    benar: 2,
    langkah: [
      'Koordinat (0, 1): x = 0 berarti tepat di atas atau di bawah pusat, y = 1 berarti di atas.',
      'Titik tertinggi lingkaran dicapai setelah seperempat putaran, yaitu 90°.',
      'Jadi cos 90° = 0 dan sin 90° = 1.',
    ],
    jebakan: '270° juga punya x = 0, tetapi titiknya (0, -1) di bawah pusat.',
    alasan: 'Titik (0, 1) ada di puncak lingkaran, seperempat putaran dari sumbu-x positif: 90°.',
  },
  {
    // cek: Math.abs(10*Math.sin(30*D) - 5) < 1e-9
    id: 'k38',
    tingkat: 'mudah',
    pertanyaan: 'Segitiga siku-siku dengan sudut 30° dan sisi miring 10 cm. Panjang sisi di depan sudut 30° adalah…',
    gambar: { jenis: 'segitiga', sudut: 30, label: ['?', '?', '10 cm'], namaSudut: '30°' },
    pilihan: ['5 cm', '8,66 cm', '10 cm', '20 cm', '3 cm'],
    benar: 0,
    langkah: [
      'Yang diketahui sisi miring, yang dicari sisi depan: pakai sinus.',
      'sin 30° = depan : 10, dan sin 30° = 0,5.',
      'depan = 10 × 0,5 = 5 cm.',
    ],
    jebakan: '8,66 cm adalah sisi SAMPING (10 × cos 30°). 20 cm keluar kalau membagi, bukan mengalikan: sisi depan tidak mungkin lebih panjang dari sisi miring.',
    alasan: 'depan = miring × sin 30° = 10 × 0,5 = 5 cm.',
  },
  {
    id: 'k39',
    tingkat: 'mudah',
    pertanyaan: 'Pada grafik y = sin x, nilai terendah yang dicapai kurva adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.sin(x*Math.PI/180)'], jangkauan: [0, 360, -1.5, 1.5], titik: [{ x: 270, y: -1, label: '(270°, -1)' }] },
    pilihan: ['0', '-1', '-90', '-360', '-0,5'],
    benar: 1,
    langkah: [
      'sin x adalah tinggi titik pada lingkaran satuan; titik terendahnya tepat di bawah pusat, tingginya -1.',
      'Itu terjadi di x = 270°, dan di grafik terlihat sebagai lembah kurva.',
    ],
    jebakan: '-90 dan -360 adalah angka sudut, bukan tinggi. Grafik sinus terkurung di antara -1 dan 1.',
    alasan: 'Nilai terendah sin x adalah -1, tercapai di 270°.',
  },

  // =============================================================== SEDANG
  {
    // cek: Math.abs(5/13 - 0.3846) < 1e-3
    id: 'k09',
    tingkat: 'sedang',
    pertanyaan: 'Segitiga siku-siku dengan sisi depan 5 cm dan sisi samping 12 cm. Nilai sin θ =',
    gambar: { jenis: 'segitiga', sudut: 23, label: ['5', '12', '?'], namaSudut: 'θ' },
    pilihan: ['0,385', '0,417', '0,923', '2,400', '0,600'],
    benar: 0,
    langkah: [
      'sin butuh sisi miring, yang belum diketahui. Cari dengan Pythagoras: √(5² + 12²) = √169 = 13.',
      'sin θ = depan : miring = 5 : 13.',
      '5 : 13 ≈ 0,385.',
    ],
    jebakan: '0,417 adalah tan θ (5 : 12), jebakan bagi yang lupa mencari miring dulu. 0,923 adalah cos θ (12 : 13).',
    alasan: 'Miring = 13, jadi sin θ = 5 : 13 ≈ 0,385.',
  },
  {
    // cek: Math.abs(Math.sqrt(1 - 0.36) - 0.8) < 1e-9
    id: 'k10',
    tingkat: 'sedang',
    pertanyaan: 'Jika θ sudut lancip dan sin θ = 0,6, maka cos θ =',
    gambar: { jenis: 'segitiga', sudut: 37, label: ['0,6', '?', '1'], namaSudut: 'θ' },
    pilihan: ['0,4', '0,6', '0,8', '1,6', '0,36'],
    benar: 2,
    langkah: [
      'Bayangkan segitiga bersisi miring 1: sisi depannya 0,6.',
      'Sisi samping dari Pythagoras: √(1 - 0,6²) = √(1 - 0,36) = √0,64 = 0,8.',
      'cos θ = samping : miring = 0,8 : 1 = 0,8. Inilah sin² θ + cos² θ = 1.',
    ],
    jebakan: '0,4 datang dari 1 - 0,6; yang berjumlah 1 adalah KUADRATNYA, bukan nilainya. 0,36 adalah sin² θ, baru setengah jalan.',
    alasan: 'cos² θ = 1 - 0,36 = 0,64, jadi cos θ = 0,8.',
  },
  {
    // cek: Math.abs(1/0.5 - 2) < 1e-9
    id: 'k11',
    tingkat: 'sedang',
    pertanyaan: 'Jika cos θ = 0,5 maka sec θ =',
    pilihan: ['0,5', '1', '2', '-0,5', '0,25'],
    benar: 2,
    langkah: [
      'sec θ = miring : samping, kebalikan dari cos θ = samping : miring.',
      'sec θ = 1 : cos θ = 1 : 0,5 = 2.',
    ],
    jebakan: '-0,5 mengira "sekan itu lawan tanda kosinus"; yang benar kebalikan pecahannya. 0,25 adalah cos² θ.',
    alasan: 'sec θ = 1 : cos θ = 2.',
  },
  {
    id: 'k12',
    tingkat: 'sedang',
    pertanyaan: 'Periode grafik y = sin x adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.sin(x*Math.PI/180)'], jangkauan: [0, 720, -1.5, 1.5], tegak: [360] },
    pilihan: ['90°', '180°', '270°', '360°', '720°'],
    benar: 3,
    langkah: [
      'Periode adalah panjang satu gelombang penuh sebelum bentuknya berulang.',
      'sin x lahir dari titik yang berputar; bentuknya berulang setelah satu putaran penuh, 360°.',
      'Di grafik: dari 0° ke 360° ada satu bukit dan satu lembah, lalu polanya mulai lagi.',
    ],
    jebakan: '180° adalah periode tangen, atau jarak dari bukit ke lembah sinus; itu baru setengah gelombang.',
    alasan: 'Kurva sinus mengulang persis setelah satu putaran penuh, yaitu 360°.',
  },
  {
    id: 'k13',
    tingkat: 'sedang',
    pertanyaan: 'Pada kuadran II (sudut antara 90° dan 180°), tanda sin θ dan cos θ berturut-turut…',
    gambar: { jenis: 'lingkaran', sudut: 135, label: '(cos θ, sin θ)' },
    pilihan: ['positif dan positif', 'positif dan negatif', 'negatif dan positif', 'negatif dan negatif', 'nol dan negatif'],
    benar: 1,
    langkah: [
      'Di kuadran II titiknya berada di kiri atas pusat.',
      'Kaki tegak (sin) masih mengarah ke atas: positif.',
      'Kaki mendatar (cos) sudah mengarah ke kiri: negatif.',
    ],
    jebakan: '"negatif dan positif" tertukar karena mengira yang ke kiri itu sinus; ingat sin = tinggi (y), cos = mendatar (x).',
    alasan: 'Di kuadran II tegaknya masih ke atas (sin positif), mendatarnya sudah ke kiri (cos negatif).',
  },
  {
    // cek: Math.abs(60/180 - 1/3) < 1e-9
    id: 'k14',
    tingkat: 'sedang',
    pertanyaan: 'Sudut 60° sama dengan…',
    pilihan: ['π/6 radian', 'π/4 radian', 'π/3 radian', 'π/2 radian', '2π/3 radian'],
    benar: 2,
    langkah: [
      'Perbandingannya 180° = π radian.',
      '60° adalah sepertiga dari 180°, jadi 60° = π/3 radian.',
    ],
    jebakan: 'π/6 adalah 30° dan 2π/3 adalah 120°; salah satu langkah yang sering terjadi adalah membagi 360 (bukan 180) dengan 60.',
    alasan: '60° = π × 60/180 = π/3.',
  },
  {
    id: 'k15',
    tingkat: 'sedang',
    pertanyaan: 'Nilai maksimum grafik y = 3 sin x adalah…',
    gambar: { jenis: 'grafik', fungsi: ['3*Math.sin(x*Math.PI/180)', 'Math.sin(x*Math.PI/180)'], jangkauan: [0, 360, -4, 4], nama: ['y = 3 sin x', 'y = sin x'] },
    pilihan: ['1', '3', '6', '360', '0,33'],
    benar: 1,
    langkah: [
      'sin x paling besar 1 (di 90°).',
      'Dikalikan 3, nilai paling besarnya 3 × 1 = 3.',
      'Angka 3 di depan inilah amplitudo: tinggi bukit dari garis tengah.',
    ],
    jebakan: '6 adalah jarak dari puncak ke lembah (3 ke -3), bukan nilai maksimumnya.',
    alasan: 'sin x paling besar 1, jadi 3 sin x paling besar 3.',
  },
  {
    // cek: Math.abs(5*Math.sin(60*D) - 4.33) < 0.01
    id: 'k16',
    tingkat: 'sedang',
    pertanyaan: 'Sebuah tangga sepanjang 5 m bersandar ke dinding membentuk sudut 60° dengan tanah. Tinggi ujung tangga dari tanah kira-kira…',
    gambar: { jenis: 'segitiga', sudut: 60, label: ['tinggi', 'jarak kaki', '5 m'], namaSudut: '60°' },
    pilihan: ['2,50 m', '2,89 m', '4,33 m', '5,77 m', '10,00 m'],
    benar: 2,
    langkah: [
      'Tangga adalah sisi miring (5 m); tinggi ujungnya adalah sisi di depan sudut 60°.',
      'sin 60° = tinggi : 5, dan sin 60° = √3/2 ≈ 0,866.',
      'tinggi = 5 × 0,866 ≈ 4,33 m.',
    ],
    jebakan: '2,50 m adalah jarak kaki tangga ke dinding (5 × cos 60°), sisi samping, bukan tinggi. 5,77 m lebih panjang dari tangganya, mustahil.',
    alasan: 'Tinggi = 5 × sin 60° ≈ 4,33 m.',
  },
  {
    id: 'k17',
    tingkat: 'sedang',
    pertanyaan: 'cot θ adalah perbandingan…',
    pilihan: ['depan : samping', 'samping : depan', 'miring : depan', 'miring : samping', 'samping : miring'],
    benar: 1,
    langkah: [
      'tan θ = depan : samping.',
      'cot θ adalah kebalikannya: samping : depan.',
    ],
    jebakan: '"miring : depan" adalah csc θ dan "miring : samping" adalah sec θ; ketiga kebalikan ini sering tertukar satu sama lain.',
    alasan: 'cot θ = 1 : tan θ = samping : depan.',
  },
  {
    id: 'k18',
    tingkat: 'sedang',
    pertanyaan: 'Dua segitiga siku-siku sebangun. Segitiga kedua tiga kali lebih besar. Nilai cos θ pada segitiga kedua…',
    pilihan: ['tiga kali lipat', 'sepertiganya', 'sama saja', 'sembilan kali lipat', 'tidak bisa ditentukan'],
    benar: 2,
    langkah: [
      'Pada segitiga kedua, sisi samping dan sisi miring sama-sama dikali 3.',
      'cos θ = 3a : 3b = a : b, faktor 3-nya saling menghilangkan.',
      'Inilah inti bab ini: perbandingan hanya bergantung pada sudut, bukan ukuran segitiga.',
    ],
    jebakan: '"tiga kali lipat" mengira cos ikut membesar bersama sisinya, padahal yang dibandingkan dua sisi yang sama-sama membesar.',
    alasan: 'Sisi samping dan miring sama-sama dikali 3, jadi hasil baginya tidak berubah.',
  },
  {
    id: 'k26',
    tingkat: 'sedang',
    pertanyaan: 'Nilai cos 180° adalah…',
    gambar: { jenis: 'lingkaran', sudut: 180, label: '(-1, 0)' },
    pilihan: ['1', '0', '-1', '0,5', '-0,5'],
    benar: 2,
    langkah: [
      'Pada 180° jari-jari menunjuk ke kiri, titiknya (-1, 0).',
      'cos θ adalah koordinat x, jadi cos 180° = -1; sin 180° = 0.',
    ],
    jebakan: '0 adalah sin 180°. Tanda minus sering terlupa karena membayangkan "jari-jari tetap panjang 1".',
    alasan: 'Pada 180° titiknya (-1, 0), jadi cos 180° = -1.',
  },
  {
    // cek: Math.abs(Math.sin(40*D)**2 + Math.cos(40*D)**2 - 1) < 1e-9
    id: 'k30',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari sin² 40° + cos² 40° adalah…',
    gambar: { jenis: 'lingkaran', sudut: 40, label: '(cos 40°, sin 40°)' },
    pilihan: ['0', '0,5', '1', '1,64', 'bergantung pada sudutnya'],
    benar: 2,
    langkah: [
      'Di lingkaran satuan, cos 40° dan sin 40° adalah kaki mendatar dan tegak segitiga bersisi miring 1.',
      'Pythagoras: kaki² + kaki² = miring² = 1² = 1.',
      'Berlaku untuk sudut berapa pun, jadi jawabannya 1.',
    ],
    jebakan: '1,64 adalah 0,64 + 1: dari cos 40° ≈ 0,77 dan sin 40° ≈ 0,64 yang dijumlahkan tanpa dikuadratkan.',
    alasan: 'Selalu 1 untuk sudut berapa pun: Pythagoras pada segitiga bersisi miring 1.',
  },
  {
    id: 'k40',
    tingkat: 'sedang',
    pertanyaan: 'Jika sin 25° = 0,42, maka cos 65° =',
    gambar: { jenis: 'segitiga', sudut: 25, label: ['depan', 'samping', 'miring'], namaSudut: '25°' },
    pilihan: ['0,42', '0,58', '0,91', '0,84', 'tidak bisa ditentukan'],
    benar: 0,
    langkah: [
      'Dua sudut lancip segitiga siku-siku berjumlah 90°; kalau satu 25°, yang lain 65°.',
      'Sisi DEPAN sudut 25° adalah sisi SAMPING sudut 65°, dan sisi miringnya sama.',
      'Jadi cos 65° = samping : miring = sisi yang sama : miring = sin 25° = 0,42.',
    ],
    jebakan: '0,58 datang dari 1 - 0,42; hubungan sin dan cos bukan penjumlahan biasa. Sudut yang berjumlah 90° saling bertukar sin dan cos.',
    alasan: 'cos 65° = sin 25° karena 25° + 65° = 90°.',
  },
  {
    // cek: Math.abs(Math.tan(60*D) - 1.732) < 0.001
    id: 'k41',
    tingkat: 'sedang',
    pertanyaan: 'Nilai tan 60° adalah…',
    gambar: { jenis: 'segitiga', sudut: 60, label: ['√3', '1', '2'], namaSudut: '60°' },
    pilihan: ['√3', '1/√3', '1', '2', '√3/2'],
    benar: 0,
    langkah: [
      'Segitiga 30-60-90 bersisi 1, √3, 2; di depan sudut 60° ada sisi √3, di sampingnya 1.',
      'tan 60° = depan : samping = √3 : 1 = √3 ≈ 1,73.',
    ],
    jebakan: '1/√3 adalah tan 30° (pasangan sisinya terbalik). √3/2 adalah sin 60°.',
    alasan: 'tan 60° = √3 : 1 = √3.',
  },
  {
    id: 'k42',
    tingkat: 'sedang',
    pertanyaan: 'Titik pada lingkaran satuan untuk sudut 270° adalah…',
    gambar: { jenis: 'lingkaran', sudut: 270, label: '?' },
    pilihan: ['(1, 0)', '(0, 1)', '(-1, 0)', '(0, -1)', '(-1, -1)'],
    benar: 3,
    langkah: [
      '270° adalah tiga perempat putaran: jari-jari menunjuk lurus ke bawah.',
      'Titik tepat di bawah pusat: x = 0, y = -1.',
      'Jadi cos 270° = 0 dan sin 270° = -1.',
    ],
    jebakan: '(-1, -1) tidak mungkin di lingkaran satuan: jaraknya dari pusat √2, bukan 1.',
    alasan: 'Pada 270° titiknya (0, -1).',
  },

  // ================================================================ SULIT
  {
    // cek: Math.abs(3/5 - 0.6) < 1e-9
    id: 'k19',
    tingkat: 'sulit',
    pertanyaan: 'Jika θ sudut lancip dan tan θ = 3/4, maka sin θ =',
    gambar: { jenis: 'segitiga', sudut: 37, label: ['3', '4', '?'], namaSudut: 'θ' },
    pilihan: ['0,60', '0,75', '0,80', '1,25', '0,43'],
    benar: 0,
    langkah: [
      'tan θ = depan : samping = 3 : 4, jadi gambar segitiga bersisi depan 3 dan samping 4.',
      'Miring = √(3² + 4²) = 5.',
      'sin θ = depan : miring = 3 : 5 = 0,6.',
    ],
    jebakan: '0,75 adalah nilai tan-nya sendiri; 0,80 adalah cos θ. 1,25 (5 : 4) adalah sec θ.',
    alasan: 'Miring 5, jadi sin θ = 3 : 5 = 0,6.',
  },
  {
    // cek: Math.abs(Math.sin(150*D) - 0.5) < 1e-9
    id: 'k20',
    tingkat: 'sulit',
    pertanyaan: 'Nilai sin 150° adalah…',
    gambar: { jenis: 'lingkaran', sudut: 150, label: '(cos 150°, sin 150°)' },
    pilihan: ['0,5', '-0,5', '0,866', '-0,866', '0'],
    benar: 0,
    langkah: [
      '150° ada di kuadran II, 30° sebelum 180°; sudut acuannya 30°.',
      'Tinggi titiknya sama dengan tinggi pada 30°: sin 30° = 0,5.',
      'Di kuadran II tinggi masih positif, jadi sin 150° = 0,5.',
    ],
    jebakan: '-0,5 memberi tanda negatif karena "sudah lewat 90°", padahal yang negatif di kuadran II adalah cos, bukan sin. 0,866 adalah sin 60°, sudut acuan yang keliru (180° - 150° = 30°, bukan 60°).',
    alasan: 'sin 150° = sin 30° = 0,5; di kuadran II sin positif.',
  },
  {
    // cek: Math.abs(Math.tan(120*D) + 1.732) < 0.001
    id: 'k21',
    tingkat: 'sulit',
    pertanyaan: 'Nilai tan 120° adalah…',
    gambar: { jenis: 'lingkaran', sudut: 120, label: '(cos 120°, sin 120°)' },
    pilihan: ['1,73', '-1,73', '0,58', '-0,58', 'tidak terdefinisi'],
    benar: 1,
    langkah: [
      'Sudut acuan 120° adalah 180° - 120° = 60°, jadi besarnya sama dengan tan 60° = √3 ≈ 1,73.',
      'Tanda: di kuadran II sin positif, cos negatif; tan = sin : cos, positif dibagi negatif = negatif.',
      'tan 120° ≈ -1,73.',
    ],
    jebakan: '-0,58 memakai sudut acuan 30° (mengira 120° - 90°). Sudut acuan diukur dari sumbu-x, bukan dari 90°.',
    alasan: 'tan 120° = -tan 60° = -√3 ≈ -1,73.',
  },
  {
    id: 'k22',
    tingkat: 'sulit',
    pertanyaan: 'Periode grafik y = sin 2x adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.sin(2*x*Math.PI/180)', 'Math.sin(x*Math.PI/180)'], jangkauan: [0, 360, -1.5, 1.5], nama: ['y = sin 2x', 'y = sin x'] },
    pilihan: ['90°', '180°', '360°', '720°', '2°'],
    benar: 1,
    langkah: [
      'sin 2x mencapai satu gelombang penuh saat 2x berjalan dari 0° ke 360°.',
      'Itu berarti x berjalan dari 0° ke 180°: periode = 360° : 2 = 180°.',
      'Di grafik, kurva sin 2x menyelesaikan dua gelombang dalam ruang satu gelombang sin x.',
    ],
    jebakan: '720° mengalikan (bukan membagi) 360° dengan 2; angka 2 mempercepat sudut, jadi gelombangnya makin pendek.',
    alasan: 'Sudutnya berjalan dua kali lebih cepat, jadi periode 360° : 2 = 180°.',
  },
  {
    // cek: Math.abs(12/Math.tan(30*D) - 20.78) < 0.01
    id: 'k23',
    tingkat: 'sulit',
    pertanyaan: 'Tiang setinggi 12 m. Sudut elevasi matahari 30°. Panjang bayangan tiang kira-kira…',
    gambar: { jenis: 'segitiga', sudut: 30, label: ['12 m', 'bayangan', 'sinar'], namaSudut: '30°' },
    pilihan: ['6,0 m', '10,4 m', '13,9 m', '20,8 m', '24,0 m'],
    benar: 3,
    langkah: [
      'Sudut elevasi matahari ada di ujung bayangan; tiang adalah sisi depan, bayangan sisi samping.',
      'tan 30° = tinggi : bayangan, jadi bayangan = 12 : tan 30°.',
      'tan 30° = 1/√3 ≈ 0,577, maka bayangan = 12 : 0,577 ≈ 20,8 m.',
      'Masuk akal: matahari yang rendah membuat bayangan lebih panjang dari tiangnya.',
    ],
    jebakan: '6,0 m memakai 12 × sin 30°; 10,4 m memakai 12 × cos 30°. Keduanya mengalikan, padahal bayangan harus lebih panjang dari tiang saat matahari rendah.',
    alasan: 'Bayangan = 12 : tan 30° ≈ 20,8 m.',
  },
  {
    id: 'k24',
    tingkat: 'sulit',
    pertanyaan: 'Pada sudut berapa saja tan θ tidak terdefinisi, untuk 0° ≤ θ < 360°?',
    gambar: { jenis: 'grafik', fungsi: ['Math.tan(x*Math.PI/180)'], jangkauan: [0, 360, -4, 4], tegak: [90, 270] },
    pilihan: ['0° dan 180°', '90° dan 270°', '45° dan 225°', '180° saja', '90° saja'],
    benar: 1,
    langkah: [
      'tan θ = sin θ : cos θ; pembagian dengan nol tidak punya jawaban.',
      'cos θ = 0 saat titiknya tepat di atas atau di bawah pusat: 90° dan 270°.',
      'Di grafik, kedua tempat itu ditandai garis putus-putus tegak yang tidak pernah disentuh kurva.',
    ],
    jebakan: '0° dan 180° adalah tempat sin θ = 0, di situ tan θ = 0, terdefinisi. "90° saja" lupa bahwa 270° juga punya cos = 0.',
    alasan: 'Pembagi cos θ nol di 90° dan 270°.',
  },
  {
    // cek: Math.abs(-Math.sqrt(1 - 0.64) + 0.6) < 1e-9
    id: 'k25',
    tingkat: 'sulit',
    pertanyaan: 'Jika sin θ = 0,8 dan θ berada di kuadran II, maka cos θ =',
    gambar: { jenis: 'lingkaran', sudut: 127, label: '(cos θ, 0,8)' },
    pilihan: ['0,6', '-0,6', '0,2', '-0,2', '-0,8'],
    benar: 1,
    langkah: [
      'Besar cos dari sin² + cos² = 1: cos² θ = 1 - 0,64 = 0,36, jadi |cos θ| = 0,6.',
      'Tanda dari kuadran: di kuadran II titiknya di kiri pusat, cos negatif.',
      'cos θ = -0,6.',
    ],
    jebakan: '0,6 benar besarnya tetapi lupa memeriksa kuadran. -0,2 datang dari 1 - 0,8 tanpa kuadrat.',
    alasan: 'Besarnya 0,6 dari Pythagoras, tandanya negatif karena kuadran II.',
  },
  {
    id: 'k27',
    tingkat: 'sulit',
    pertanyaan: 'Berapa banyak sudut θ pada 0° ≤ θ < 360° yang memenuhi sin θ = 0,5?',
    gambar: { jenis: 'grafik', fungsi: ['Math.sin(x*Math.PI/180)', '0.5'], jangkauan: [0, 360, -1.5, 1.5], titik: [{ x: 30, y: 0.5, label: '30°' }, { x: 150, y: 0.5, label: '150°' }], nama: ['y = sin θ', 'y = 0,5'] },
    pilihan: ['satu', 'dua', 'tiga', 'empat', 'tak terhingga'],
    benar: 1,
    langkah: [
      'Tarik garis mendatar y = 0,5 memotong satu gelombang sinus.',
      'Garis itu memotong kurva dua kali: sekali saat naik (30°) dan sekali saat turun (150°).',
      'Di lingkaran satuan: dua titik dengan tinggi 0,5, satu di kuadran I dan satu di kuadran II.',
    ],
    jebakan: '"satu" hanya mengingat 30° dari tabel sudut istimewa; kalkulator pun hanya memberi satu jawaban. "tak terhingga" benar kalau tanpa batas 0° sampai 360°.',
    alasan: 'Dua: 30° dan 150°.',
  },
  {
    // cek: Math.abs(360/3 - 120) < 1e-9
    id: 'k28',
    tingkat: 'sulit',
    pertanyaan: 'Grafik y = 4 cos(3x) memiliki amplitudo dan periode berturut-turut…',
    gambar: { jenis: 'grafik', fungsi: ['4*Math.cos(3*x*Math.PI/180)'], jangkauan: [0, 360, -5, 5], tegak: [120, 240] },
    pilihan: ['4 dan 360°', '4 dan 120°', '3 dan 120°', '3 dan 360°', '12 dan 120°'],
    benar: 1,
    langkah: [
      'Angka di depan (4) mengalikan tinggi: amplitudo 4, kurva bergerak antara -4 dan 4.',
      'Angka di dalam kurung (3) mempercepat sudut: periode = 360° : 3 = 120°.',
      'Di grafik: tiga gelombang penuh dalam 360°.',
    ],
    jebakan: '"3 dan 120°" menukar peran kedua angka; "12 dan 120°" mengalikan keduanya, padahal amplitudo dan periode diatur angka yang berbeda.',
    alasan: 'Amplitudo 4, periode 360° : 3 = 120°.',
  },
  {
    // cek: Math.abs(40/Math.tan(25*D) - 85.78) < 0.02
    id: 'k29',
    tingkat: 'sulit',
    pertanyaan: 'Dari puncak menara setinggi 40 m, sebuah kapal terlihat dengan sudut depresi 25°. Jarak mendatar kapal dari kaki menara kira-kira…',
    gambar: { jenis: 'segitiga', sudut: 25, label: ['40 m', 'jarak', 'garis pandang'], namaSudut: '25°' },
    pilihan: ['16,9 m', '18,7 m', '44,1 m', '85,8 m', '94,6 m'],
    benar: 3,
    langkah: [
      'Sudut depresi diukur dari garis mendatar di puncak; sudut elevasi di kapal sama besarnya, 25°, karena kedua garis mendatar itu sejajar.',
      'Dari kapal: tan 25° = tinggi : jarak = 40 : jarak.',
      'jarak = 40 : tan 25° = 40 : 0,466 ≈ 85,8 m.',
    ],
    jebakan: '18,7 m memakai 40 × tan 25°, membalik pembilang dan penyebut. Kapal yang terlihat dengan sudut kecil (25°) pasti jauh, lebih dari dua kali tinggi menara.',
    alasan: 'Jarak = 40 : tan 25° ≈ 85,8 m.',
  },
  {
    id: 'k31',
    tingkat: 'sulit',
    pertanyaan: 'Sebuah roda berputar dan tinggi satu titik di tepinya mengikuti y = 2 sin x meter dari sumbu. Selisih antara titik tertinggi dan terendah adalah…',
    gambar: { jenis: 'grafik', fungsi: ['2*Math.sin(x*Math.PI/180)'], jangkauan: [0, 360, -3, 3], titik: [{ x: 90, y: 2, label: '2' }, { x: 270, y: -2, label: '-2' }] },
    pilihan: ['1 m', '2 m', '4 m', '6,28 m', '360 m'],
    benar: 2,
    langkah: [
      'Amplitudo 2: titik tertinggi +2 m (di 90°), terendah -2 m (di 270°).',
      'Selisihnya 2 - (-2) = 4 m, sama dengan garis tengah roda.',
    ],
    jebakan: '2 m membaca amplitudo saja, padahal yang ditanya jarak puncak ke lembah. 6,28 m adalah 2π, keliling lingkaran berjari-jari 1, tidak ada hubungannya.',
    alasan: 'Tertinggi +2, terendah -2, selisih 4 m.',
  },
  {
    id: 'k32',
    tingkat: 'sulit',
    pertanyaan: 'Jika tan θ = 1 dan 0° ≤ θ < 360°, nilai θ yang mungkin adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.tan(x*Math.PI/180)', '1'], jangkauan: [0, 360, -4, 4], tegak: [90, 270], titik: [{ x: 45, y: 1, label: '45°' }, { x: 225, y: 1, label: '225°' }] },
    pilihan: ['45° saja', '45° dan 135°', '45° dan 225°', '135° dan 315°', '45°, 135°, 225°, dan 315°'],
    benar: 2,
    langkah: [
      'tan θ = 1 berarti sin θ dan cos θ sama besar DAN sama tanda.',
      'Sama tanda terjadi di kuadran I (keduanya positif) dan kuadran III (keduanya negatif).',
      'Sudut acuan 45°: di kuadran I θ = 45°, di kuadran III θ = 180° + 45° = 225°.',
    ],
    jebakan: '135° dan 315° memberi tan = -1: di kuadran II dan IV sin dan cos berbeda tanda. Grafik tangen berulang tiap 180°, jadi jawabannya 45° + 180°.',
    alasan: 'tan positif di kuadran I dan III: 45° dan 225°.',
  },
  {
    // cek: Math.abs(50*Math.sin(30*D) + 1 - 26) < 1e-9
    id: 'k43',
    tingkat: 'sulit',
    pertanyaan: 'Benang layang-layang sepanjang 50 m terentang lurus membentuk sudut 30° dengan tanah. Tangan pemegangnya 1 m di atas tanah. Tinggi layang-layang dari tanah adalah…',
    gambar: { jenis: 'segitiga', sudut: 30, label: ['tinggi dari tangan', 'jarak mendatar', '50 m'], namaSudut: '30°' },
    pilihan: ['25 m', '26 m', '43,3 m', '44,3 m', '51 m'],
    benar: 1,
    langkah: [
      'Benang adalah sisi miring; tinggi layang-layang DI ATAS TANGAN adalah sisi depan sudut 30°.',
      'tinggi di atas tangan = 50 × sin 30° = 50 × 0,5 = 25 m.',
      'Tangan 1 m di atas tanah, jadi tinggi dari tanah = 25 + 1 = 26 m.',
    ],
    jebakan: '25 m lupa menambahkan tinggi tangan; segitiganya mulai dari tangan, bukan dari tanah. 43,3 m memakai cos 30°, itu jarak mendatar.',
    alasan: '50 × sin 30° = 25 m, ditambah 1 m tinggi tangan = 26 m.',
  },
  {
    // cek: Math.abs(10*Math.tan(60*D) - 17.32) < 0.01
    id: 'k44',
    tingkat: 'sulit',
    pertanyaan: 'Dari titik A, puncak menara terlihat dengan sudut elevasi 30°. Setelah berjalan 20 m mendekati menara ke titik B, sudut elevasinya menjadi 60°. Tinggi menara kira-kira…',
    gambar: {
      jenis: 'svg',
      viewBox: '0 0 460 230',
      isi: '<line x1="30" y1="200" x2="430" y2="200" stroke="#8B8378" stroke-width="1.4"/><line x1="360" y1="200" x2="360" y2="60" stroke="#C25E4D" stroke-width="3"/><line x1="70" y1="200" x2="360" y2="60" stroke="#1F2430" stroke-width="1.6"/><line x1="220" y1="200" x2="360" y2="60" stroke="#1F2430" stroke-width="1.6"/><path d="M 100 200 A 30 30 0 0 0 96 186" fill="none" stroke="#6A4C93" stroke-width="1.8"/><path d="M 246 200 A 26 26 0 0 0 233 178" fill="none" stroke="#6A4C93" stroke-width="1.8"/><text x="104" y="192" font-size="12" fill="#6A4C93" font-family="var(--font-mono), sans-serif">30°</text><text x="250" y="188" font-size="12" fill="#6A4C93" font-family="var(--font-mono), sans-serif">60°</text><text x="70" y="218" font-size="12" text-anchor="middle" fill="#1F2430" font-family="var(--font-mono), sans-serif">A</text><text x="220" y="218" font-size="12" text-anchor="middle" fill="#1F2430" font-family="var(--font-mono), sans-serif">B</text><text x="145" y="218" font-size="11" text-anchor="middle" fill="#3A6EA5" font-family="var(--font-mono), sans-serif">20 m</text><text x="290" y="218" font-size="11" text-anchor="middle" fill="#3A6EA5" font-family="var(--font-mono), sans-serif">x</text><text x="372" y="134" font-size="12" fill="#C25E4D" font-family="var(--font-mono), sans-serif">h</text>',
    },
    pilihan: ['10,0 m', '11,5 m', '17,3 m', '20,0 m', '34,6 m'],
    benar: 2,
    langkah: [
      'Misalkan jarak B ke kaki menara x, tinggi menara h. Dari B: tan 60° = h : x, jadi h = x√3.',
      'Dari A, jaraknya x + 20: tan 30° = h : (x + 20), jadi h = (x + 20)/√3.',
      'Samakan: x√3 = (x + 20)/√3, kalikan √3: 3x = x + 20, jadi x = 10 m.',
      'h = 10√3 ≈ 17,3 m.',
    ],
    jebakan: '10,0 m adalah jarak x, bukan tingginya. 34,6 m (20√3) mengira jarak dari B ke menara 20 m, padahal 20 m adalah jarak A ke B.',
    alasan: 'x = 10 m, h = 10√3 ≈ 17,3 m.',
  },
  {
    // cek: Math.abs(Math.sin(240*D) + 0.866) < 0.001
    id: 'k45',
    tingkat: 'sulit',
    pertanyaan: 'Nilai sin 240° adalah…',
    gambar: { jenis: 'lingkaran', sudut: 240, label: '(cos 240°, sin 240°)' },
    pilihan: ['0,5', '-0,5', '0,866', '-0,866', '-1'],
    benar: 3,
    langkah: [
      '240° ada di kuadran III, 60° lewat dari 180°: sudut acuannya 60°.',
      'Besarnya sama dengan sin 60° = √3/2 ≈ 0,866.',
      'Di kuadran III titiknya di bawah pusat, sin negatif: sin 240° ≈ -0,866.',
    ],
    jebakan: '-0,5 memakai sudut acuan 30° (mengira 270° - 240°); sudut acuan kuadran III dihitung dari 180°.',
    alasan: 'sin 240° = -sin 60° ≈ -0,866.',
  },

  // ========================================================= SANGAT SULIT
  {
    // cek: Math.abs(Math.sin(Math.atan(3/4) + Math.PI) + 0.6) < 1e-9
    id: 'k46',
    tingkat: 'sangat sulit',
    pertanyaan: 'Jika tan α = 3/4 dengan 180° ≤ α ≤ 270°, maka sin α =',
    gambar: { jenis: 'lingkaran', sudut: 216.87, label: '(cos α, sin α)' },
    pilihan: ['-3/4', '-4/5', '-3/5', '3/5', '3/4'],
    benar: 2,
    langkah: [
      'Sudut di kuadran III: sin dan cos sama-sama negatif, sehingga tan-nya positif, cocok dengan 3/4.',
      'Segitiga acuan bersisi depan 3, samping 4, miring 5 (Pythagoras).',
      'Besar sin α = 3/5; tandanya negatif karena kuadran III: sin α = -3/5.',
    ],
    jebakan: '3/5 lupa tanda kuadran. -4/5 adalah cos α. -3/4 memberi tanda negatif pada tan padahal tan di kuadran III positif.',
    alasan: 'Segitiga 3-4-5, sin α = -3/5 karena kuadran III.',
  },
  {
    // cek: Math.abs((Math.sin(150*D) + Math.sin(120*D)) / (Math.cos(210*D) - Math.cos(300*D)) + 1) < 1e-9
    id: 'k47',
    tingkat: 'sangat sulit',
    pertanyaan: 'Nilai dari (sin 150° + sin 120°) : (cos 210° - cos 300°) adalah…',
    pilihan: ['2', '1', '0', '-1/2', '-1'],
    benar: 4,
    langkah: [
      'Ubah tiap sudut ke sudut acuannya lewat lingkaran satuan: sin 150° = sin 30° = 1/2; sin 120° = sin 60° = √3/2.',
      'cos 210° = -cos 30° = -√3/2 (kuadran III); cos 300° = cos 60° = 1/2 (kuadran IV).',
      'Pembilang: 1/2 + √3/2. Penyebut: -√3/2 - 1/2 = -(1/2 + √3/2).',
      'Pembilang dan penyebut berlawanan tanda tetapi sama besar, hasilnya -1.',
    ],
    jebakan: '1 keluar kalau tanda cos 210° dianggap positif. Setiap sudut harus ditempatkan di kuadrannya dulu sebelum tandanya diputuskan.',
    alasan: 'Pembilang (1 + √3)/2, penyebut -(1 + √3)/2, hasil -1.',
  },
  {
    id: 'k48',
    tingkat: 'sangat sulit',
    pertanyaan: 'Jika sin 70° = p dan cos 70° = q, maka cos 110° · cot 160° + sin 200° =',
    pilihan: ['p - q', 'p + q', '2p', '2q', '2p - 2q'],
    benar: 0,
    langkah: [
      'cos 110°: kuadran II, acuan 70°, cos negatif: cos 110° = -q.',
      'cot 160°: acuan 20°, dan cot 20° = tan 70° = p/q; kuadran II membuat tan (dan cot) negatif: cot 160° = -p/q.',
      'sin 200°: kuadran III, acuan 20°, sin 20° = cos 70° = q, negatif: sin 200° = -q.',
      'Susun: (-q)(-p/q) + (-q) = p - q.',
    ],
    jebakan: 'p + q lupa tanda negatif sin 200°. Kuncinya dua hal sekaligus: tanda dari kuadran, dan sudut 20° = 90° - 70° yang menukar sin dengan cos.',
    alasan: '(-q)(-p/q) - q = p - q.',
  },
  {
    // cek: Math.abs(10*0.8*0.8 - 6.4) < 1e-9
    id: 'k49',
    tingkat: 'sangat sulit',
    pertanyaan: 'Segitiga ABC siku-siku di B, AC = 10 cm, dan cos ∠A = 0,8. Dari B ditarik garis tegak lurus ke AC, memotong AC di D. Panjang AD adalah…',
    gambar: {
      jenis: 'svg',
      viewBox: '0 0 460 230',
      isi: '<polygon points="60,200 300,200 300,80" fill="rgba(58,110,165,0.06)" stroke="#1F2430" stroke-width="1.8"/><line x1="300" y1="200" x2="252" y2="104" stroke="#C25E4D" stroke-width="2.2"/><polyline points="288,200 288,188 300,188" fill="none" stroke="#8B8378" stroke-width="1.2"/><path d="M 90 200 A 30 30 0 0 0 86 186" fill="none" stroke="#6A4C93" stroke-width="1.8"/><text x="96" y="193" font-size="12" fill="#6A4C93" font-family="var(--font-mono), sans-serif">A</text><text x="52" y="218" font-size="13" fill="#1F2430" font-family="var(--font-mono), sans-serif">A</text><text x="304" y="218" font-size="13" fill="#1F2430" font-family="var(--font-mono), sans-serif">B</text><text x="306" y="78" font-size="13" fill="#1F2430" font-family="var(--font-mono), sans-serif">C</text><text x="240" y="96" font-size="13" fill="#C25E4D" font-family="var(--font-mono), sans-serif">D</text><text x="150" y="128" font-size="12" fill="#1F2430" font-family="var(--font-mono), sans-serif">10</text>',
    },
    pilihan: ['4,8 cm', '6,0 cm', '6,4 cm', '8,0 cm', '3,6 cm'],
    benar: 2,
    langkah: [
      'Pada segitiga ABC (siku di B): cos A = AB : AC, jadi AB = 10 × 0,8 = 8 cm.',
      'Segitiga ABD juga siku-siku (di D) dan memakai sudut A yang sama: cos A = AD : AB.',
      'AD = AB × 0,8 = 8 × 0,8 = 6,4 cm.',
      'Pola bertingkatnya: AD = AC × cos² A.',
    ],
    jebakan: '8,0 cm berhenti di AB. 4,8 cm adalah BD (8 × sin A dengan sin A = 0,6). Dua segitiga sebangun berbagi sudut A, jadi perbandingan yang sama dipakai dua kali.',
    alasan: 'AB = 8, lalu AD = 8 × 0,8 = 6,4 cm.',
  },
  {
    // cek: Math.sin(3) < Math.sin(1) && Math.sin(1) < Math.sin(2)
    id: 'k50',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sudut 1, 2, dan 3 diukur dalam RADIAN. Urutan yang benar adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.sin(x)'], jangkauan: [0, 3.5, -0.5, 1.5], titik: [{ x: 1, y: 0.841, label: 'sin 1' }, { x: 2, y: 0.909, label: 'sin 2' }, { x: 3, y: 0.141, label: 'sin 3' }] },
    pilihan: ['sin 1 < sin 2 < sin 3', 'sin 3 < sin 2 < sin 1', 'sin 1 < sin 3 < sin 2', 'sin 2 < sin 1 < sin 3', 'sin 3 < sin 1 < sin 2'],
    benar: 4,
    langkah: [
      'Ubah ke derajat: 1 rad ≈ 57°, 2 rad ≈ 115°, 3 rad ≈ 172°.',
      'sin 115° = sin 65° (kuadran II, acuan 180° - 115°) dan sin 172° = sin 8°.',
      'Untuk sudut lancip, makin besar sudut makin besar sinusnya: sin 8° < sin 57° < sin 65°.',
      'Jadi sin 3 < sin 1 < sin 2.',
    ],
    jebakan: '"sin 1 < sin 2 < sin 3" mengira sinus terus naik seiring sudut; setelah 90° (≈1,57 rad) ia turun lagi. Menganggap 1, 2, 3 sebagai derajat juga memberi urutan itu.',
    alasan: 'sin 3 ≈ 0,14, sin 1 ≈ 0,84, sin 2 ≈ 0,91.',
  },
  {
    // cek: Math.abs(60/Math.tan(30*D) - 60/Math.tan(60*D) - 69.28) < 0.01
    id: 'k51',
    tingkat: 'sangat sulit',
    pertanyaan: 'Dari puncak gedung setinggi 60 m, dua mobil yang berada di satu sisi gedung dalam satu garis lurus terlihat dengan sudut depresi 60° dan 30°. Jarak kedua mobil kira-kira…',
    gambar: {
      jenis: 'svg',
      viewBox: '0 0 460 230',
      isi: '<line x1="30" y1="200" x2="440" y2="200" stroke="#8B8378" stroke-width="1.4"/><line x1="80" y1="200" x2="80" y2="60" stroke="#C25E4D" stroke-width="3"/><line x1="80" y1="60" x2="300" y2="60" stroke="#8B8378" stroke-width="1.2" stroke-dasharray="5 4"/><line x1="80" y1="60" x2="161" y2="200" stroke="#1F2430" stroke-width="1.6"/><line x1="80" y1="60" x2="322" y2="200" stroke="#1F2430" stroke-width="1.6"/><path d="M 120 60 A 40 40 0 0 1 100 95" fill="none" stroke="#6A4C93" stroke-width="1.8"/><path d="M 150 60 A 70 70 0 0 1 140 95" fill="none" stroke="#6A4C93" stroke-width="1.8"/><text x="104" y="82" font-size="11" fill="#6A4C93" font-family="var(--font-mono), sans-serif">60°</text><text x="150" y="84" font-size="11" fill="#6A4C93" font-family="var(--font-mono), sans-serif">30°</text><text x="60" y="134" font-size="12" fill="#C25E4D" font-family="var(--font-mono), sans-serif">60 m</text><circle cx="161" cy="200" r="5" fill="#3A6EA5"/><circle cx="322" cy="200" r="5" fill="#3A6EA5"/><text x="161" y="220" font-size="12" text-anchor="middle" fill="#3A6EA5" font-family="var(--font-mono), sans-serif">mobil 1</text><text x="322" y="220" font-size="12" text-anchor="middle" fill="#3A6EA5" font-family="var(--font-mono), sans-serif">mobil 2</text>',
    },
    pilihan: ['34,6 m', '60,0 m', '69,3 m', '103,9 m', '138,6 m'],
    benar: 2,
    langkah: [
      'Sudut depresi sama dengan sudut elevasi dari mobil (garis mendatar sejajar). Jarak tiap mobil ke kaki gedung: jarak = 60 : tan(sudut).',
      'Mobil 1 (60°): 60 : √3 = 20√3 ≈ 34,6 m.',
      'Mobil 2 (30°): 60 : (1/√3) = 60√3 ≈ 103,9 m.',
      'Jarak kedua mobil = 103,9 - 34,6 ≈ 69,3 m (tepatnya 40√3).',
    ],
    jebakan: '103,9 m dan 34,6 m adalah jarak masing-masing mobil ke gedung, bukan jarak antar mobil. 138,6 m menjumlahkan keduanya, padahal kedua mobil di sisi yang sama.',
    alasan: '60√3 - 20√3 = 40√3 ≈ 69,3 m.',
  },
  {
    // cek: Math.abs(2*1 + 1 - 3) < 1e-9 && Math.abs(360/2 - 180) < 1e-9
    id: 'k52',
    tingkat: 'sangat sulit',
    pertanyaan: 'Grafik y = 2 sin(2x) + 1 memiliki nilai maksimum dan periode berturut-turut…',
    gambar: { jenis: 'grafik', fungsi: ['2*Math.sin(2*x*Math.PI/180)+1'], jangkauan: [0, 360, -2, 4], tegak: [180] },
    pilihan: ['2 dan 180°', '3 dan 180°', '3 dan 360°', '2 dan 90°', '1 dan 180°'],
    benar: 1,
    langkah: [
      'sin(2x) paling besar 1, dikali 2 jadi 2, ditambah 1 jadi 3: nilai maksimum 3.',
      '+1 menggeser seluruh kurva ke atas: garis tengahnya di y = 1, bukit di 3, lembah di -1.',
      'Angka 2 di dalam kurung: periode = 360° : 2 = 180°.',
    ],
    jebakan: '"2 dan 180°" membaca amplitudo sebagai nilai maksimum; lupa bahwa +1 menaikkan puncaknya. "3 dan 360°" lupa angka 2 di dalam kurung.',
    alasan: 'Maksimum 2 + 1 = 3, periode 360° : 2 = 180°.',
  },
  {
    // cek: [...Array(720).keys()].filter(d => Math.abs(Math.sin(d*D) - 0.3) < 0.0087).length >= 4
    id: 'k53',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa banyak sudut x pada 0° ≤ x < 720° yang memenuhi sin x = 0,3?',
    gambar: { jenis: 'grafik', fungsi: ['Math.sin(x*Math.PI/180)', '0.3'], jangkauan: [0, 720, -1.5, 1.5], nama: ['y = sin x', 'y = 0,3'] },
    pilihan: ['satu', 'dua', 'tiga', 'empat', 'delapan'],
    benar: 3,
    langkah: [
      'Dalam satu putaran (0° sampai 360°) garis y = 0,3 memotong gelombang sinus dua kali: saat naik (≈17°) dan saat turun (≈163°).',
      '0° sampai 720° memuat dua putaran penuh, dan polanya berulang persis.',
      'Jadi 2 × 2 = 4 sudut.',
    ],
    jebakan: '"dua" hanya menghitung satu putaran. "delapan" mengira tiap putaran memberi empat, padahal garis mendatar memotong satu gelombang sinus tepat dua kali.',
    alasan: 'Dua per putaran, dua putaran: empat.',
  },
  {
    // cek: Math.abs(45 + 225 - 270) < 1e-9
    id: 'k54',
    tingkat: 'sangat sulit',
    pertanyaan: 'Jumlah semua sudut θ pada 0° ≤ θ < 360° yang memenuhi sin θ = cos θ adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.sin(x*Math.PI/180)', 'Math.cos(x*Math.PI/180)'], jangkauan: [0, 360, -1.5, 1.5], titik: [{ x: 45, y: 0.707, label: '45°' }, { x: 225, y: -0.707, label: '225°' }], nama: ['y = sin θ', 'y = cos θ'] },
    pilihan: ['45°', '90°', '180°', '270°', '360°'],
    benar: 3,
    langkah: [
      'sin θ = cos θ berarti tinggi dan mendatar titik di lingkaran sama, sehingga tan θ = 1 (cos θ tidak nol di sini).',
      'tan θ = 1 di kuadran I dan III: θ = 45° dan 225°.',
      'Jumlahnya 45° + 225° = 270°.',
    ],
    jebakan: '45° berhenti di satu jawaban. 180° menjumlahkan 45° dan 135°, padahal di 135° sin dan cos berlawanan tanda.',
    alasan: '45° + 225° = 270°.',
  },
  {
    // cek: Math.abs(Math.sin(120*D) - 0.866) < 0.001
    id: 'k55',
    tingkat: 'sangat sulit',
    pertanyaan: 'Jika sec θ = -2 dan θ berada di kuadran II, maka sin θ =',
    gambar: { jenis: 'lingkaran', sudut: 120, label: '(-0,5, sin θ)' },
    pilihan: ['-√3/2', '-1/2', '1/2', '√3/2', '2'],
    benar: 3,
    langkah: [
      'sec θ = 1 : cos θ, jadi cos θ = -1/2.',
      'Sudut acuan dengan cos = 1/2 adalah 60°; di kuadran II: θ = 180° - 60° = 120°.',
      'sin 120° = sin 60° = √3/2, positif karena kuadran II.',
    ],
    jebakan: '-√3/2 memberi tanda negatif karena melihat -2 pada soal; tanda negatif itu milik cos, sedangkan sin di kuadran II positif.',
    alasan: 'cos θ = -1/2 di kuadran II berarti θ = 120°, sin 120° = √3/2.',
  },
  {
    // cek: Math.abs(3*Math.sin(2*45*D) - 3) < 1e-9
    id: 'k56',
    tingkat: 'sangat sulit',
    pertanyaan: 'Grafik y = a sin(bx) dengan a, b positif mencapai puncak pertamanya di titik (45°, 3). Nilai a dan b berturut-turut…',
    gambar: { jenis: 'grafik', fungsi: ['3*Math.sin(2*x*Math.PI/180)'], jangkauan: [0, 360, -4, 4], titik: [{ x: 45, y: 3, label: '(45°, 3)' }] },
    pilihan: ['3 dan 2', '3 dan 4', '2 dan 3', '3 dan 1/2', '45 dan 3'],
    benar: 0,
    langkah: [
      'Puncak setinggi 3 berarti amplitudo a = 3.',
      'sin mencapai puncak pertama saat sudutnya 90°: bx = 90° pada x = 45°, jadi b = 90 : 45 = 2.',
      'Periksa: periode 360° : 2 = 180°, dan seperempat periode (45°) memang letak puncak pertama.',
    ],
    jebakan: '"3 dan 4" menghitung b dari 180 : 45, mencampur periode dengan letak puncak. "3 dan 1/2" membalik pembagiannya.',
    alasan: 'a = 3 dari tinggi puncak; b = 90 : 45 = 2.',
  },
  {
    // cek: Math.abs(12 + 10*Math.sin(210*D) - 7) < 1e-9
    id: 'k57',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kursi bianglala bergerak di lingkaran berjari-jari 10 m yang porosnya 12 m di atas tanah. Tinggi kursi mengikuti h = 12 + 10 sin θ, dengan θ sudut dari posisi sejajar poros. Saat θ = 210°, tinggi kursi dari tanah adalah…',
    gambar: { jenis: 'lingkaran', sudut: 210, label: 'kursi' },
    pilihan: ['2 m', '7 m', '12 m', '17 m', '22 m'],
    benar: 1,
    langkah: [
      'sin 210°: kuadran III, acuan 30°, negatif: sin 210° = -1/2.',
      'h = 12 + 10 × (-1/2) = 12 - 5 = 7 m.',
      'Masuk akal: 210° berarti kursi sedikit di bawah poros, di antara 12 m (sejajar poros) dan 2 m (titik terendah).',
    ],
    jebakan: '17 m memakai sin 210° = +1/2, lupa tanda kuadran III. 2 m adalah titik terendah (θ = 270°), bukan 210°.',
    alasan: 'sin 210° = -1/2, h = 12 - 5 = 7 m.',
  },
  {
    // cek: Math.abs(2.4/Math.sqrt(1 + 2.4*2.4) - 0.923) < 0.001
    id: 'k58',
    tingkat: 'sangat sulit',
    pertanyaan: 'Pada lingkaran satuan, jari-jari bersudut lancip θ diperpanjang sampai menabrak garis singgung x = 1. Ruas pada garis singgung itu panjangnya 2,4. Nilai sin θ kira-kira…',
    gambar: {
      jenis: 'svg',
      viewBox: '0 0 460 210',
      isi: '<line x1="80" y1="150" x2="290" y2="150" stroke="#8B8378" stroke-width="1.2"/><line x1="150" y1="200" x2="150" y2="20" stroke="#8B8378" stroke-width="1.2"/><circle cx="150" cy="150" r="45" fill="none" stroke="#1F2430" stroke-width="1.6"/><line x1="195" y1="200" x2="195" y2="25" stroke="#3A6EA5" stroke-width="1.6"/><line x1="150" y1="150" x2="195" y2="42" stroke="#1F2430" stroke-width="1.6"/><line x1="195" y1="150" x2="195" y2="42" stroke="#6A4C93" stroke-width="4"/><path d="M 168 150 A 18 18 0 0 0 157 134" fill="none" stroke="#6A4C93" stroke-width="1.8"/><text x="172" y="142" font-size="12" fill="#6A4C93" font-family="var(--font-mono), sans-serif">θ</text><text x="204" y="100" font-size="12" fill="#6A4C93" font-family="var(--font-mono), sans-serif">tan θ = 2,4</text><text x="204" y="166" font-size="11" fill="#3A6EA5" font-family="var(--font-mono), sans-serif">x = 1</text><text x="166" y="166" font-size="11" fill="#8B8378" font-family="var(--font-mono), sans-serif">1</text>',
    },
    pilihan: ['0,385', '0,417', '0,923', '0,960', '2,400'],
    benar: 2,
    langkah: [
      'Ruas pada garis singgung x = 1 panjangnya tan θ (sisi samping segitiga besarnya 1): tan θ = 2,4 = 12/5.',
      'Segitiga acuan bersisi depan 12, samping 5, miring √(144 + 25) = 13.',
      'sin θ = 12 : 13 ≈ 0,923.',
    ],
    jebakan: '0,385 adalah cos θ (5 : 13). 2,400 menjawab tan-nya sendiri; sin tidak pernah melebihi 1.',
    alasan: 'tan θ = 12/5, miring 13, sin θ = 12/13 ≈ 0,923.',
  },
  {
    id: 'k59',
    tingkat: 'sangat sulit',
    pertanyaan: 'Titik P berada di lingkaran satuan pada sudut θ. Titik Q diperoleh dengan memutar P seperempat putaran (90°) berlawanan arah jarum jam. Koordinat Q dinyatakan dalam θ adalah…',
    gambar: { jenis: 'lingkaran', sudut: 40, label: 'P (cos θ, sin θ)' },
    pilihan: ['(sin θ, cos θ)', '(-sin θ, cos θ)', '(cos θ, -sin θ)', '(-cos θ, -sin θ)', '(sin θ, -cos θ)'],
    benar: 1,
    langkah: [
      'Q berada pada sudut θ + 90°, jadi koordinatnya (cos(θ + 90°), sin(θ + 90°)).',
      'Seperempat putaran memutar kaki segitiga: yang tadinya mendatar (cos θ) menjadi tegak, yang tadinya tegak (sin θ) menjadi mendatar tetapi ke kiri.',
      'Jadi cos(θ + 90°) = -sin θ dan sin(θ + 90°) = cos θ: Q = (-sin θ, cos θ).',
      'Periksa dengan θ = 0°: P = (1, 0), Q di 90° = (0, 1); rumusnya memberi (-0, 1). Cocok.',
    ],
    jebakan: '(sin θ, cos θ) menukar kaki tanpa membalik tanda; itu pencerminan terhadap garis y = x, bukan putaran. Uji dengan sudut sederhana seperti θ = 0° langsung memisahkan keduanya.',
    alasan: 'Q di sudut θ + 90°: (-sin θ, cos θ).',
  },
  {
    // cek: Math.abs((1.4*1.4 - 1)/2 - 0.48) < 1e-9
    id: 'k60',
    tingkat: 'sangat sulit',
    pertanyaan: 'Jika sin θ + cos θ = 1,4, maka sin θ · cos θ =',
    pilihan: ['0,24', '0,40', '0,48', '0,70', '0,96'],
    benar: 2,
    langkah: [
      'Kuadratkan kedua ruas: (sin θ + cos θ)² = 1,4² = 1,96.',
      'Ruas kiri dijabarkan: sin² θ + 2 sin θ cos θ + cos² θ = 1 + 2 sin θ cos θ, sebab sin² θ + cos² θ = 1.',
      '1 + 2 sin θ cos θ = 1,96, jadi 2 sin θ cos θ = 0,96.',
      'sin θ cos θ = 0,48.',
    ],
    jebakan: '0,96 lupa membagi dua di langkah terakhir. 0,70 membagi 1,4 dengan 2, seolah sin dan cos boleh dikalikan dari jumlahnya secara langsung.',
    alasan: '(1,96 - 1) : 2 = 0,48.',
  },
]
