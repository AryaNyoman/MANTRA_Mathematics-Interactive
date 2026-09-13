/**
 * Bank soal latihan Limit: 60 soal, 15 tiap tingkat (14 Sep 2026).
 *
 * SEJARAH: 3 Sep 2026 bank ini 32 soal (8 per tingkat, id k01 sampai k32),
 * dikalibrasi ke Matematika Tingkat Lanjut Kelas XII Bab 2 bagian A.1.
 * 13 Sep ARYA meminta 15 soal per tingkat, syarat naik 10 benar, pembahasan
 * bernomor bergambar, dan penjelasan pengecoh. Id lama DIPERTAHANKAN; soal
 * baru k33 sampai k60.
 *
 * KALIBRASI (semua tulisan sendiri):
 * - mudah dan sedang: buku Tingkat Lanjut Kelas XII (substitusi, membaca
 *   tabel dan grafik, limit kiri kanan, pemfaktoran, sin x / x);
 * - sulit: pola UTBK (sekawan, dua pemfaktoran, limit tak hingga selisih
 *   akar, kekontinuan fungsi sepotong);
 * - sangat sulit: 5 bergaya olimpiade (selisih dua akar dibagi x,
 *   x kali selisih akar, (1 - cos x) : (x sin x), parameter supaya limit
 *   bernilai tertentu, selisih dua sinus) dan 10 sulit-biasa.
 *
 * Cakupan dibatasi materi 1 sampai 10: konsep limit, limit kiri dan kanan,
 * lubang, substitusi, pemfaktoran, sekawan, limit tak hingga, limit
 * trigonometri dasar, kekontinuan. Aturan L'Hopital dan turunan sengaja
 * TIDAK dipakai (belum diperkenalkan).
 *
 * Gambar memakai fungsi dalam x biasa. Tiap jawaban berangka punya
 * `// cek:` yang dihitung numerik (mendekati titiknya) oleh cek_kuis.mjs.
 */

import type { SoalKuis } from '@/content/tipe'

export const KUIS: SoalKuis[] = [
  /* ================================ mudah ================================ */
  {
    id: 'k01',
    tingkat: 'mudah',
    pertanyaan: 'Limit sebuah fungsi di titik c menanyakan hal apa?',
    pilihan: ['Berapa nilai f(c) kalau x diletakkan tepat di c', 'Ke mana f(x) menuju saat x mendekati c dari kiri dan dari kanan', 'Berapa nilai terbesar f(x) di sekitar c', 'Apakah f(x) memotong sumbu di c', 'Berapa kemiringan grafik f di titik c'],
    benar: 1,
    langkah: [
      'Limit menanyakan TUJUAN: ke mana nilai f(x) bergerak saat x makin dekat ke c.',
      'Nilai f(c) sendiri pertanyaan lain; materi 03 dan 04 menunjukkan keduanya bisa berbeda, bahkan f(c) boleh tidak ada.',
    ],
    jebakan: '"Berapa nilai f(c)" adalah kekeliruan paling dasar: limit dibuat justru untuk titik yang nilainya bolong atau melompat.',
    alasan: 'Limit menanyakan tujuan, bukan keadaan di titik itu.',
  },
  {
    // cek: 3 + 4 === 7
    id: 'k02',
    tingkat: 'mudah',
    pertanyaan: 'Berapa limit (x + 4) untuk x mendekati 3?',
    gambar: { jenis: 'grafik', fungsi: ['x + 4'], jangkauan: [0, 6, 0, 10], titik: [{ x: 3, y: 7, label: '(3, 7)' }] },
    pilihan: ['3', '4', '7', '12', 'tidak ada'],
    benar: 2,
    langkah: [
      'x + 4 suku banyak: grafiknya garis tanpa lubang, jadi boleh langsung substitusi.',
      '3 + 4 = 7.',
    ],
    jebakan: '12 mengalikan 3 dan 4. "tidak ada" mengira limit selalu bermasalah; untuk fungsi mulus, limit sama dengan nilainya.',
    alasan: 'Substitusi: 3 + 4 = 7.',
  },
  {
    id: 'k03',
    tingkat: 'mudah',
    pertanyaan: 'Berapa limit dari angka 9 untuk x mendekati 2?',
    gambar: { jenis: 'grafik', fungsi: ['9'], jangkauan: [0, 5, 0, 12], tegak: [2] },
    pilihan: ['2', '9', '18', '0', 'tidak ada'],
    benar: 1,
    langkah: [
      'Fungsi tetap f(x) = 9: grafiknya garis mendatar setinggi 9.',
      'Ke mana pun x bergerak, nilainya tetap 9. Limitnya 9.',
    ],
    jebakan: '2 menjawab titik yang didekati, bukan nilai fungsinya. 18 mengalikan keduanya.',
    alasan: 'Limit tetapan adalah tetapan itu sendiri.',
  },
  {
    id: 'k04',
    tingkat: 'mudah',
    pertanyaan: 'Limit kiri sebuah fungsi di titik c bernilai 5, dan limit kanannya juga 5. Berapa limitnya di c?',
    pilihan: ['5', '10', '0', 'tidak ada', 'bergantung nilai f(c)'],
    benar: 0,
    langkah: [
      'Limit ada kalau kedua arah sepakat.',
      'Keduanya 5, jadi limitnya 5.',
      'Nilai f(c) tidak ikut menentukan; itu urusan kekontinuan.',
    ],
    jebakan: '10 menjumlahkan kedua arah, padahal keduanya menunjuk tujuan yang sama. "bergantung f(c)" mencampur limit dengan kekontinuan.',
    alasan: 'Kedua arah sepakat di 5.',
  },
  {
    id: 'k05',
    tingkat: 'mudah',
    pertanyaan: 'Limit kiri sebuah fungsi di titik c bernilai 2, sedangkan limit kanannya 7. Berapa limitnya di c?',
    gambar: { jenis: 'grafik', fungsi: ['x < 3 ? 2 : NaN', 'x >= 3 ? 7 : NaN'], jangkauan: [0, 6, 0, 9], tegak: [3], lubang: [{ x: 3, y: 2 }], titik: [{ x: 3, y: 7 }] },
    pilihan: ['2', '7', '4,5', '9', 'limitnya tidak ada'],
    benar: 4,
    langkah: [
      'Dari kiri menuju 2, dari kanan menuju 7: tidak ada satu angka yang dituju bersama.',
      'Limitnya tidak ada, bukan rata-ratanya, bukan salah satunya.',
    ],
    jebakan: '4,5 merata-ratakan; itu menjawab pertanyaan yang tidak ditanyakan. Lompatan di grafik adalah tanda limit tidak ada.',
    alasan: 'Kedua arah tidak sepakat.',
  },
  {
    // cek: (-3)*(-3) === 9
    id: 'k06',
    tingkat: 'mudah',
    pertanyaan: 'Berapa limit x² untuk x mendekati -3?',
    pilihan: ['-9', '9', '-6', '6', '3'],
    benar: 1,
    langkah: [
      'x² mulus di mana-mana: substitusi.',
      '(-3)² = 9; tanda negatif hilang karena dikuadratkan.',
    ],
    jebakan: '-9 mengkuadratkan 3 lalu memasang minus. -6 mengalikan -3 dengan 2.',
    alasan: '(-3)² = 9.',
  },
  {
    id: 'k07',
    tingkat: 'mudah',
    pertanyaan: 'Kalau angkanya dimasukkan dan hasilnya 0 dibagi 0, apa artinya?',
    pilihan: ['Limitnya pasti 0', 'Limitnya pasti 1', 'Limitnya pasti tidak ada', 'Bentuknya belum memberi tahu apa-apa dan harus ditulis ulang', 'Fungsinya salah tulis'],
    benar: 3,
    langkah: [
      '0 dibagi 0 disebut bentuk tak tentu: belum menentukan apa-apa.',
      'Buktinya: (x² - 1) : (x - 1) di 1 memberi 2, sedangkan (x² - 4) : (x - 2) di 2 memberi 4, padahal keduanya 0 dibagi 0.',
      'Fungsinya harus ditulis ulang (difaktorkan, disekawankan) lalu dicoba lagi.',
    ],
    jebakan: '"Pasti 0" dan "pasti 1" menebak dari bentuknya; nol per nol bisa berapa saja, itulah sebabnya disebut tak tentu.',
    alasan: 'Bentuk tak tentu harus ditulis ulang.',
  },
  {
    // cek: Math.abs((2*1 + 1)/(1 + 3) - 0.75) < 1e-9
    id: 'k08',
    tingkat: 'mudah',
    pertanyaan: 'Berapa limit (2x + 1) : (x + 3) untuk x mendekati 1?',
    pilihan: ['3/4', '4/3', '1', '3', 'tidak ada'],
    benar: 0,
    langkah: [
      'Periksa penyebut: 1 + 3 = 4, bukan nol, substitusi sah.',
      'Pembilang: 2 + 1 = 3. Hasilnya 3/4.',
    ],
    jebakan: '4/3 membalik pecahan. "tidak ada" mengira setiap pecahan bermasalah; hanya penyebut nol yang perlu dicurigai.',
    alasan: '3 : 4.',
  },
  {
    // cek: 3*2 - 1 === 5
    id: 'k33',
    tingkat: 'mudah',
    pertanyaan: 'Berapa limit (3x - 1) untuk x mendekati 2?',
    pilihan: ['5', '6', '2', '-1', 'tidak ada'],
    benar: 0,
    langkah: [
      'Suku banyak: substitusi langsung.',
      '3 × 2 - 1 = 5.',
    ],
    jebakan: '6 lupa mengurangi 1. 2 menjawab titiknya.',
    alasan: '3(2) - 1 = 5.',
  },
  {
    // cek: (0 + 4)/(0 + 2) === 2
    id: 'k34',
    tingkat: 'mudah',
    pertanyaan: 'Berapa limit (x² + 4) : (x + 2) untuk x mendekati 0?',
    pilihan: ['2', '4', '0', '1', 'tidak ada'],
    benar: 0,
    langkah: [
      'Penyebut di x = 0 adalah 2, tidak nol: substitusi sah.',
      '(0 + 4) : (0 + 2) = 2.',
    ],
    jebakan: '0 mengira "x mendekati 0" berarti hasilnya 0; yang menuju 0 adalah x, bukan f(x). 4 lupa membagi.',
    alasan: '4 : 2 = 2.',
  },
  {
    id: 'k35',
    tingkat: 'mudah',
    pertanyaan: 'Grafik f berlubang di x = 1: dari kiri dan kanan kurvanya menuju tinggi 2, tetapi titik (1, 2) sendiri kosong. Berapa limit f(x) untuk x mendekati 1?',
    gambar: { jenis: 'grafik', fungsi: ['x + 1'], jangkauan: [-1, 3, -1, 4], lubang: [{ x: 1, y: 2 }], tegak: [1] },
    pilihan: ['2', '1', '0', 'tidak ada, karena titiknya kosong', 'tak hingga'],
    benar: 0,
    langkah: [
      'Limit menanyakan tujuan, bukan apa yang ada tepat di titiknya.',
      'Dari kiri dan kanan kurva menuju 2, jadi limitnya 2.',
      'Lubang hanya berarti f(1) tidak ada; limitnya tetap 2.',
    ],
    jebakan: '"tidak ada karena titiknya kosong" mencampur nilai fungsi dengan limit; limit justru dibuat untuk situasi ini.',
    alasan: 'Kedua arah menuju 2.',
  },
  {
    // cek: Math.sqrt(4) === 2
    id: 'k36',
    tingkat: 'mudah',
    pertanyaan: 'Berapa limit √x untuk x mendekati 4?',
    gambar: { jenis: 'grafik', fungsi: ['Math.sqrt(x)'], jangkauan: [0, 9, 0, 4], titik: [{ x: 4, y: 2, label: '(4, 2)' }] },
    pilihan: ['2', '4', '16', '√2', 'tidak ada'],
    benar: 0,
    langkah: [
      '√x mulus di sekitar 4 (grafiknya tersambung).',
      'Substitusi: √4 = 2.',
    ],
    jebakan: '16 mengkuadratkan alih-alih mengakarkan. 4 menjawab titiknya.',
    alasan: '√4 = 2.',
  },
  {
    id: 'k37',
    tingkat: 'mudah',
    pertanyaan: 'Tabel: x = 0,9 memberi f(x) = 2,7; x = 0,99 memberi 2,97; x = 0,999 memberi 2,997. Berapa limit kiri f(x) saat x mendekati 1?',
    gambar: { jenis: 'garis-data', kategori: ['x = 0,9', 'x = 0,99', 'x = 0,999'], nilai: [2.7, 2.97, 2.997], satuan: 'f(x)' },
    pilihan: ['3', '2,997', '2,9', '1', 'tidak bisa ditentukan'],
    benar: 0,
    langkah: [
      'Baca polanya: 2,7 lalu 2,97 lalu 2,997, makin dekat ke 3 tiap kali x makin dekat ke 1.',
      'Tujuannya 3; itulah limit kirinya.',
    ],
    jebakan: '2,997 adalah nilai TERAKHIR di tabel, bukan tujuannya. Limit adalah angka yang didekati, bukan angka yang dicapai.',
    alasan: 'Polanya menuju 3.',
  },
  {
    // cek: Math.abs(1/1e6) < 1e-3
    id: 'k38',
    tingkat: 'mudah',
    pertanyaan: 'Berapa limit 1 : x saat x menuju tak hingga?',
    gambar: { jenis: 'grafik', fungsi: ['1/x'], jangkauan: [0.2, 12, -0.5, 3] },
    pilihan: ['0', '1', 'tak hingga', 'tidak ada', '-1'],
    benar: 0,
    langkah: [
      'Pembagi makin besar: 1 : 10 = 0,1; 1 : 1.000 = 0,001; 1 : 1.000.000 = 0,000001.',
      'Nilainya makin dekat ke 0 tanpa pernah negatif: limitnya 0.',
    ],
    jebakan: '"tak hingga" menukar x dengan hasilnya; yang membesar x, hasilnya justru menciut.',
    alasan: '1 dibagi bilangan sangat besar menuju 0.',
  },
  {
    id: 'k39',
    tingkat: 'mudah',
    pertanyaan: 'Untuk x mendekati 0, nilai 1 : x² membesar tanpa batas. Bagaimana limitnya?',
    gambar: { jenis: 'grafik', fungsi: ['1/(x*x)'], jangkauan: [-3, 3, -1, 8], tegak: [0] },
    pilihan: ['Tidak ada; nilainya membesar tanpa batas', '0', '1', '1 dibagi 0 sama dengan 0', '2'],
    benar: 0,
    langkah: [
      'x = 0,1 memberi 100; x = 0,01 memberi 10.000: makin dekat, makin besar.',
      'Tidak ada angka yang dituju, jadi limitnya tidak ada; ditulis "menuju tak hingga" untuk menggambarkan caranya tidak ada.',
    ],
    jebakan: '"1 dibagi 0 sama dengan 0" adalah kekeliruan aritmetika: pembagian dengan nol tidak punya jawaban, apalagi nol.',
    alasan: 'Membesar tanpa batas: limit tidak ada.',
  },

  /* =============================== sedang =============================== */
  {
    // cek: Math.abs((5.001*5.001 - 25)/(5.001 - 5) - 10) < 0.01
    id: 'k09',
    tingkat: 'sedang',
    pertanyaan: 'Berapa limit (x² - 25) : (x - 5) untuk x mendekati 5?',
    gambar: { jenis: 'grafik', fungsi: ['x + 5'], jangkauan: [0, 8, 0, 14], lubang: [{ x: 5, y: 10 }] },
    pilihan: ['0', '5', '10', '25', 'tidak ada'],
    benar: 2,
    langkah: [
      'Substitusi memberi 0 dibagi 0: bentuk tak tentu.',
      'Faktorkan: (x - 5)(x + 5) : (x - 5), coret (x - 5) karena x tidak pernah tepat 5.',
      'Sisanya x + 5; masukkan 5, hasilnya 10.',
    ],
    jebakan: '0 dan "tidak ada" menyerah pada bentuk 0/0. 25 berhenti di x² tanpa membagi.',
    alasan: 'Setelah dicoret, x + 5 = 10.',
  },
  {
    // cek: Math.abs((1.001*1.001 - 1)/(1.001 - 1) - 2) < 0.01
    id: 'k10',
    tingkat: 'sedang',
    pertanyaan: 'Fungsi f(x) = (x² - 1) : (x - 1) tidak punya nilai di x = 1. Berapa limitnya untuk x mendekati 1?',
    gambar: { jenis: 'grafik', fungsi: ['x + 1'], jangkauan: [-1, 3, -1, 4], lubang: [{ x: 1, y: 2 }] },
    pilihan: ['0', '1', '2', 'tidak ada, karena f(1) tidak ada', 'tak hingga'],
    benar: 2,
    langkah: [
      'Untuk x ≠ 1, f(x) = (x - 1)(x + 1) : (x - 1) = x + 1.',
      'Grafiknya garis y = x + 1 dengan satu lubang di (1, 2). Limitnya 2.',
    ],
    jebakan: '"tidak ada karena f(1) tidak ada" mencampur nilai fungsi dan limit; lubang tidak mengubah tujuan.',
    alasan: 'Limitnya 2 walau f(1) tidak ada.',
  },
  {
    // cek: Math.abs(Math.sin(0.001)/0.001 - 1) < 1e-4
    id: 'k11',
    tingkat: 'sedang',
    pertanyaan: 'Berapa limit sin x dibagi x untuk x mendekati 0, dengan x dalam radian?',
    gambar: { jenis: 'grafik', fungsi: ['Math.sin(x)/x'], jangkauan: [-6, 6, -0.5, 1.3], lubang: [{ x: 0, y: 1 }] },
    pilihan: ['0', '1', 'sin', 'tidak ada', 'tak hingga'],
    benar: 1,
    langkah: [
      'Untuk sudut kecil dalam radian, sin x hampir sama dengan x: sin 0,1 ≈ 0,0998.',
      'Perbandingannya menuju 1; dibuktikan lewat perbandingan luas di lingkaran satuan (materi 08).',
    ],
    jebakan: '"sin" mencoret x seperti bilangan; sin bukan bilangan, melainkan nama fungsi. 0 mengira sin 0 = 0 lalu berhenti.',
    alasan: 'sin x / x menuju 1.',
  },
  {
    // cek: Math.abs((3*1e6 + 1)/(1e6 - 2) - 3) < 1e-4
    id: 'k12',
    tingkat: 'sedang',
    pertanyaan: 'Berapa limit (3x + 1) : (x - 2) saat x menuju tak hingga?',
    gambar: { jenis: 'grafik', fungsi: ['(3*x + 1)/(x - 2)', '3'], jangkauan: [3, 40, 0, 8], nama: ['y = (3x + 1)/(x - 2)', 'y = 3'] },
    pilihan: ['0', '1/2', '3', 'tak hingga', 'tidak ada'],
    benar: 2,
    langkah: [
      'Pangkat tertinggi atas dan bawah sama (x¹): bagi semuanya dengan x.',
      '(3 + 1/x) : (1 - 2/x); saat x membesar, 1/x dan 2/x menuju 0.',
      'Hasilnya 3 : 1 = 3.',
    ],
    jebakan: '-1/2 datang dari membagi tetapannya (1 : -2), padahal tetapan tidak berarti dibanding suku x saat x besar.',
    alasan: 'Perbandingan koefisien pangkat tertinggi: 3.',
  },
  {
    id: 'k13',
    tingkat: 'sedang',
    pertanyaan: 'Manakah yang BUKAN syarat sebuah fungsi kontinu di titik c?',
    gambar: { jenis: 'grafik', fungsi: ['Math.abs(x)'], jangkauan: [-3, 3, -1, 4] },
    pilihan: ['f(c) harus ada', 'limit f(x) di c harus ada', 'limitnya harus sama dengan f(c)', 'grafiknya tidak boleh punya sudut tajam di c', 'ketiga syarat di atas harus terpenuhi sekaligus'],
    benar: 3,
    langkah: [
      'Kontinu: f(c) ada, limit ada, dan keduanya sama. Artinya grafik tidak putus.',
      'Grafik |x| berbentuk V dengan sudut tajam di 0, tetapi pensil tidak perlu diangkat: kontinu.',
    ],
    jebakan: '"Tidak boleh bersudut" adalah syarat TURUNAN (materi Turunan), bukan kekontinuan.',
    alasan: 'Sudut tajam tidak melanggar kekontinuan.',
  },
  {
    // cek: Math.abs((3.001*3.001 - 3.001 - 6)/(3.001 - 3) - 5) < 0.01
    id: 'k14',
    tingkat: 'sedang',
    pertanyaan: 'Berapa limit (x² - x - 6) : (x - 3) untuk x mendekati 3?',
    pilihan: ['0', '3', '5', '6', 'tidak ada'],
    benar: 2,
    langkah: [
      'Substitusi: 0 dibagi 0.',
      'Faktorkan pembilang: (x - 3)(x + 2). Coret (x - 3).',
      'Sisanya x + 2; masukkan 3, hasilnya 5.',
    ],
    jebakan: '6 memfaktorkan keliru menjadi (x - 3)(x + 3). Periksa: (x - 3)(x + 2) = x² - x - 6, cocok.',
    alasan: 'x + 2 di x = 3 adalah 5.',
  },
  {
    // cek: Math.abs((2*1e6 + 7)/(1e12 + 1)) < 1e-4
    id: 'k15',
    tingkat: 'sedang',
    pertanyaan: 'Berapa limit (2x + 7) : (x² + 1) saat x menuju tak hingga?',
    gambar: { jenis: 'grafik', fungsi: ['(2*x + 7)/(x*x + 1)'], jangkauan: [0, 30, -0.5, 3] },
    pilihan: ['0', '2', '7', 'tak hingga', 'tidak ada'],
    benar: 0,
    langkah: [
      'Pangkat penyebut (2) lebih besar dari pembilang (1).',
      'Bagi dengan x²: (2/x + 7/x²) : (1 + 1/x²) menuju 0 : 1 = 0.',
    ],
    jebakan: '2 membandingkan koefisien tanpa melihat pangkatnya; itu hanya berlaku kalau pangkat atas dan bawah sama.',
    alasan: 'Penyebut tumbuh lebih cepat: 0.',
  },
  {
    // cek: Math.abs(Math.sin(4*0.001)/(2*0.001) - 2) < 1e-4
    id: 'k16',
    tingkat: 'sedang',
    pertanyaan: 'Berapa limit sin 4x dibagi 2x untuk x mendekati 0?',
    pilihan: ['1/2', '1', '2', '4', '8'],
    benar: 2,
    langkah: [
      'Tulis sin 4x : 2x = (sin 4x : 4x) × (4x : 2x).',
      'Bagian pertama menuju 1 (bentuk sin u / u), bagian kedua 4 : 2 = 2.',
      'Hasilnya 2.',
    ],
    jebakan: '1 mengira semua bentuk sinus dibagi x hasilnya 1; angka di depan sudutnya ikut menentukan.',
    alasan: 'sin ax / bx menuju a/b = 2.',
  },
  {
    // cek: Math.abs((3.001*3.001 - 9)/(3.001 - 3) - 6) < 0.01
    id: 'k40',
    tingkat: 'sedang',
    pertanyaan: 'Berapa limit (x² - 9) : (x - 3) untuk x mendekati 3?',
    gambar: { jenis: 'grafik', fungsi: ['x + 3'], jangkauan: [0, 6, 0, 10], lubang: [{ x: 3, y: 6 }] },
    pilihan: ['6', '3', '0', '9', 'tidak ada'],
    benar: 0,
    langkah: [
      '0 dibagi 0: faktorkan x² - 9 = (x - 3)(x + 3).',
      'Coret (x - 3), sisa x + 3; di x = 3 hasilnya 6.',
    ],
    jebakan: '9 berhenti di x². 3 menjawab titiknya.',
    alasan: 'x + 3 = 6.',
  },
  {
    // cek: Math.abs(Math.sin(3*0.001)/0.001 - 3) < 1e-4
    id: 'k41',
    tingkat: 'sedang',
    pertanyaan: 'Berapa limit sin 3x dibagi x untuk x mendekati 0?',
    pilihan: ['3', '1', '0', '1/3', 'tidak ada'],
    benar: 0,
    langkah: [
      'sin 3x : x = 3 × (sin 3x : 3x).',
      'sin 3x : 3x menuju 1, jadi hasilnya 3.',
    ],
    jebakan: '1 lupa angka 3 di depan sudut. 1/3 membaliknya.',
    alasan: '3 × 1 = 3.',
  },
  {
    // cek: Math.abs((2e12 + 1)/(1e12 - 3) - 2) < 1e-4
    id: 'k42',
    tingkat: 'sedang',
    pertanyaan: 'Berapa limit (2x² + 1) : (x² - 3) saat x menuju tak hingga?',
    pilihan: ['2', '0', '-1/3', 'tak hingga', '1'],
    benar: 0,
    langkah: [
      'Pangkat tertinggi sama (x²): bagi semuanya dengan x².',
      '(2 + 1/x²) : (1 - 3/x²) menuju 2 : 1 = 2.',
    ],
    jebakan: '-1/3 membagi tetapannya. "tak hingga" hanya kalau pangkat atas lebih besar.',
    alasan: 'Koefisien x²: 2/1.',
  },
  {
    // cek: 1*1 === 1 && 2*1 - 1 === 1
    id: 'k43',
    tingkat: 'sedang',
    pertanyaan: 'Fungsi f(x) = x² untuk x < 1 dan f(x) = 2x - 1 untuk x ≥ 1. Apakah f kontinu di x = 1?',
    gambar: { jenis: 'grafik', fungsi: ['x < 1 ? x*x : 2*x - 1'], jangkauan: [-1, 3, -1, 5], titik: [{ x: 1, y: 1, label: '(1, 1)' }] },
    pilihan: ['Ya, kedua potongan bertemu di (1, 1)', 'Tidak, karena rumusnya berganti', 'Tidak, limit kiri 1 dan limit kanan 2', 'Tidak, karena f(1) tidak ada', 'Tidak bisa ditentukan'],
    benar: 0,
    langkah: [
      'Limit kiri: x² di 1 = 1. Limit kanan: 2(1) - 1 = 1. Sepakat.',
      'f(1) memakai rumus kedua: 2(1) - 1 = 1, sama dengan limitnya.',
      'Ketiga syarat terpenuhi: kontinu. Grafiknya tersambung mulus.',
    ],
    jebakan: '"Tidak, karena rumusnya berganti" mengira dua rumus pasti putus; yang menentukan adalah apakah kedua potongannya bertemu.',
    alasan: 'Kiri 1, kanan 1, f(1) = 1.',
  },
  {
    // cek: Math.abs((1.001*1.001 + 1.001 - 2)/(1.001 - 1) - 3) < 0.01
    id: 'k44',
    tingkat: 'sedang',
    pertanyaan: 'Berapa limit (x² + x - 2) : (x - 1) untuk x mendekati 1?',
    pilihan: ['3', '2', '0', '1', 'tidak ada'],
    benar: 0,
    langkah: [
      '0 dibagi 0: faktorkan x² + x - 2 = (x - 1)(x + 2).',
      'Coret (x - 1), sisa x + 2; di x = 1 hasilnya 3.',
    ],
    jebakan: '2 memfaktorkan sebagai (x - 1)(x + 1) tanpa memeriksa: (x - 1)(x + 1) = x² - 1, bukan x² + x - 2.',
    alasan: 'x + 2 = 3.',
  },
  {
    // cek: Math.abs(Math.tan(0.001)/0.001 - 1) < 1e-4
    id: 'k45',
    tingkat: 'sedang',
    pertanyaan: 'Berapa limit tan x dibagi x untuk x mendekati 0?',
    pilihan: ['1', '0', 'tidak ada', 'tak hingga', '1/2'],
    benar: 0,
    langkah: [
      'tan x = sin x : cos x, jadi tan x : x = (sin x : x) × (1 : cos x).',
      'sin x : x menuju 1, dan cos 0 = 1. Hasilnya 1 × 1 = 1.',
    ],
    jebakan: '"tak hingga" mengira tan selalu meledak; tan meledak di 90°, bukan di 0.',
    alasan: 'tan x / x menuju 1.',
  },
  {
    // cek: Math.abs((1e18 - 1)/(2e18 + 1e6) - 0.5) < 1e-4
    id: 'k46',
    tingkat: 'sedang',
    pertanyaan: 'Berapa limit (x³ - 1) : (2x³ + x) saat x menuju tak hingga?',
    pilihan: ['1/2', '0', '1', '-1', 'tak hingga'],
    benar: 0,
    langkah: [
      'Pangkat tertinggi x³ di atas dan di bawah: bagi semuanya dengan x³.',
      '(1 - 1/x³) : (2 + 1/x²) menuju 1 : 2.',
    ],
    jebakan: '-1 membagi tetapan -1 dengan... tidak ada tetapan di bawah; 0 mengira pembilang kalah, padahal pangkatnya sama.',
    alasan: 'Koefisien x³: 1/2.',
  },

  /* =============================== sulit =============================== */
  {
    // cek: Math.abs((Math.sqrt(0.001 + 9) - 3)/0.001 - 1/6) < 1e-3
    id: 'k17',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit (√(x + 9) - 3) : x untuk x mendekati 0?',
    pilihan: ['0', '1/6', '1/3', '3', 'tidak ada'],
    benar: 1,
    langkah: [
      'Substitusi: (3 - 3) : 0 = 0/0. Ada akar: kalikan dengan sekawan √(x + 9) + 3 di atas dan bawah.',
      'Pembilang jadi (x + 9) - 9 = x; coret dengan penyebut x.',
      'Sisanya 1 : (√(x + 9) + 3); di x = 0 hasilnya 1 : 6.',
    ],
    jebakan: '1/3 memasukkan 0 hanya ke satu suku sekawan (1 : 3). 0 menyerah pada bentuk 0/0.',
    alasan: 'Setelah sekawan: 1/(3 + 3) = 1/6.',
  },
  {
    // cek: Math.abs(Math.tan(3*0.001)/Math.sin(5*0.001) - 0.6) < 1e-4
    id: 'k18',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit tan 3x dibagi sin 5x untuk x mendekati 0?',
    pilihan: ['0', '3/5', '5/3', '1', '15'],
    benar: 1,
    langkah: [
      'Untuk sudut kecil, tan ax dan sin ax sama-sama berperilaku seperti ax.',
      'tan 3x : sin 5x = (tan 3x : 3x) × (5x : sin 5x) × (3x : 5x) menuju 1 × 1 × 3/5.',
    ],
    jebakan: '5/3 membalik; 15 mengalikan. Aturan a/b berlaku untuk campuran tan dan sin sekaligus.',
    alasan: '3/5.',
  },
  {
    // cek: Math.abs((2.001**3 - 8)/(2.001 - 2) - 12) < 0.02
    id: 'k19',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit (x³ - 8) : (x - 2) untuk x mendekati 2?',
    pilihan: ['0', '4', '8', '12', 'tidak ada'],
    benar: 3,
    langkah: [
      'Selisih pangkat tiga: x³ - 8 = (x - 2)(x² + 2x + 4).',
      'Coret (x - 2), sisa x² + 2x + 4; di x = 2: 4 + 4 + 4 = 12.',
    ],
    jebakan: '4 memakai pemfaktoran kuadrat (x - 2)(x + 2) yang salah untuk pangkat tiga. 8 berhenti di 2³.',
    alasan: '4 + 4 + 4 = 12.',
  },
  {
    // cek: 3 + 3 === 6
    id: 'k20',
    tingkat: 'sulit',
    pertanyaan: 'Fungsi f didefinisikan f(x) = (x² - 9) : (x - 3) untuk x bukan 3, dan f(3) = a. Berapa a supaya f kontinu di x = 3?',
    gambar: { jenis: 'grafik', fungsi: ['x + 3'], jangkauan: [0, 6, 0, 10], lubang: [{ x: 3, y: 6 }] },
    pilihan: ['0', '3', '6', '9', 'tidak ada nilai a yang cocok'],
    benar: 2,
    langkah: [
      'Kontinu menuntut f(3) = limitnya.',
      'Untuk x ≠ 3, f(x) = x + 3, limitnya di 3 adalah 6.',
      'Jadi a = 6: lubangnya ditambal tepat di (3, 6).',
    ],
    jebakan: '"tidak ada nilai yang cocok" mengira lubang tidak bisa ditambal; justru limit yang ada membuat penambalan mungkin.',
    alasan: 'a = limit = 6.',
  },
  {
    // cek: Math.abs((2.001*2.001 - 4)/(2.001*2.001 - 2.001 - 2) - 4/3) < 0.01
    id: 'k21',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit (x² - 4) : (x² - x - 2) untuk x mendekati 2?',
    pilihan: ['1', '4/3', '3/4', '0', 'tidak ada'],
    benar: 1,
    langkah: [
      'Faktorkan keduanya: (x - 2)(x + 2) : (x - 2)(x + 1).',
      'Coret (x - 2), sisa (x + 2) : (x + 1); di x = 2: 4 : 3.',
    ],
    jebakan: '3/4 membalik. 1 mengira "kuadrat dibagi kuadrat pasti 1".',
    alasan: '4/3.',
  },
  {
    // cek: Math.abs((1 - Math.cos(0.001))/0.001) < 1e-3
    id: 'k22',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit (1 - cos x) dibagi x untuk x mendekati 0?',
    pilihan: ['0', '1/2', '1', '2', 'tidak ada'],
    benar: 0,
    langkah: [
      'Kalikan dengan sekawan (1 + cos x): pembilang jadi 1 - cos²x = sin²x.',
      'Bentuknya (sin x : x) × (sin x : (1 + cos x)) menuju 1 × (0 : 2) = 0.',
    ],
    jebakan: '1/2 adalah jawaban untuk penyebut x² (soal lain). Perhatikan pangkat penyebutnya.',
    alasan: '0.',
  },
  {
    // cek: Math.abs(Math.sqrt(1e12 + 3e6) - 1e6 - 1.5) < 1e-3
    id: 'k23',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit √(x² + 3x) - x saat x menuju tak hingga?',
    pilihan: ['0', '3/2', '3', 'tak hingga', 'tidak ada'],
    benar: 1,
    langkah: [
      'Bentuk tak hingga dikurangi tak hingga: kalikan dengan sekawan √(x² + 3x) + x.',
      'Pembilang jadi (x² + 3x) - x² = 3x.',
      'Bagi atas dan bawah dengan x: 3 : (√(1 + 3/x) + 1) menuju 3 : 2.',
    ],
    jebakan: '0 mengira dua yang sama besar saling menghapus; selisihnya justru menuju angka tetap. 3 lupa penyebut sekawan menjadi 2.',
    alasan: '3/2.',
  },
  {
    // cek: Math.abs(4.001 - 4)/(4.001 - 4) === 1 && Math.abs(3.999 - 4)/(3.999 - 4) === -1
    id: 'k24',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit nilai mutlak (x - 4) dibagi (x - 4) untuk x mendekati 4?',
    gambar: { jenis: 'grafik', fungsi: ['x < 4 ? -1 : NaN', 'x > 4 ? 1 : NaN'], jangkauan: [1, 7, -2, 2], tegak: [4], lubang: [{ x: 4, y: 1 }, { x: 4, y: -1 }] },
    pilihan: ['1', '-1', '0', 'limitnya tidak ada', 'tak hingga'],
    benar: 3,
    langkah: [
      'Dari kanan (x > 4): x - 4 positif, mutlaknya sama, hasil 1.',
      'Dari kiri (x < 4): x - 4 negatif, mutlaknya lawannya, hasil -1.',
      'Dua arah tidak sepakat: limit tidak ada.',
    ],
    jebakan: '1 hanya memeriksa dari kanan. 0 merata-ratakan 1 dan -1.',
    alasan: 'Kiri -1, kanan 1.',
  },
  {
    // cek: Math.abs((Math.sqrt(1 + 0.001) - 1)/0.001 - 0.5) < 1e-3
    id: 'k47',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit (√(1 + x) - 1) : x untuk x mendekati 0?',
    pilihan: ['1/2', '1', '0', '2', 'tidak ada'],
    benar: 0,
    langkah: [
      '0/0 dengan akar: kalikan sekawan √(1 + x) + 1.',
      'Pembilang jadi (1 + x) - 1 = x; coret dengan x.',
      'Sisa 1 : (√(1 + x) + 1) menuju 1 : 2.',
    ],
    jebakan: '1 memasukkan 0 ke sekawan sebagai 1 : 1, lupa suku +1-nya.',
    alasan: '1/(1 + 1) = 1/2.',
  },
  {
    // cek: Math.abs((2.001*2.001 - 4)/(2.001*2.001 - 3*2.001 + 2) - 4) < 0.02
    id: 'k48',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit (x² - 4) : (x² - 3x + 2) untuk x mendekati 2?',
    pilihan: ['4', '2', '1', '0', 'tidak ada'],
    benar: 0,
    langkah: [
      'Faktorkan: (x - 2)(x + 2) : (x - 1)(x - 2).',
      'Coret (x - 2), sisa (x + 2) : (x - 1); di x = 2: 4 : 1 = 4.',
    ],
    jebakan: '1 mengira "kuadrat per kuadrat". 2 menjawab titiknya.',
    alasan: '4/1 = 4.',
  },
  {
    // cek: Math.abs((1 - Math.cos(0.001))/(0.001*0.001) - 0.5) < 1e-3
    id: 'k49',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit (1 - cos x) dibagi x² untuk x mendekati 0?',
    pilihan: ['1/2', '0', '1', '2', 'tidak ada'],
    benar: 0,
    langkah: [
      'Sekawan (1 + cos x): pembilang jadi sin²x.',
      'Bentuknya (sin x : x)² × 1 : (1 + cos x) menuju 1 × 1/2.',
    ],
    jebakan: '0 adalah jawaban untuk penyebut x (bukan x²). Pangkat penyebutnya mengubah hasilnya.',
    alasan: '1/2.',
  },
  {
    // cek: Math.abs(Math.sqrt(1e12 + 1) - 1e6) < 1e-3
    id: 'k50',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit √(x² + 1) - x saat x menuju tak hingga?',
    pilihan: ['0', '1', '1/2', 'tak hingga', 'tidak ada'],
    benar: 0,
    langkah: [
      'Sekawan: pembilang jadi (x² + 1) - x² = 1.',
      '1 : (√(x² + 1) + x): penyebut membesar tanpa batas, hasilnya menuju 0.',
    ],
    jebakan: '1/2 mencampur dengan soal √(x² + 3x) - x; di sini pembilangnya tetap 1, tidak ada x yang membantu.',
    alasan: '1 dibagi sesuatu yang membesar: 0.',
  },
  {
    // cek: 4 + 4 === 8
    id: 'k51',
    tingkat: 'sulit',
    pertanyaan: 'Fungsi f(x) = (x² - 16) : (x - 4) untuk x ≠ 4, dan f(4) = a. Nilai a supaya f kontinu?',
    pilihan: ['8', '4', '16', '0', 'tidak ada'],
    benar: 0,
    langkah: [
      'Untuk x ≠ 4: (x - 4)(x + 4) : (x - 4) = x + 4.',
      'Limit di 4 adalah 8; a harus 8.',
    ],
    jebakan: '16 berhenti di x². 4 menjawab titiknya.',
    alasan: 'a = 8.',
  },
  {
    // cek: Math.abs(Math.sin(2*0.001)/Math.tan(3*0.001) - 2/3) < 1e-4
    id: 'k52',
    tingkat: 'sulit',
    pertanyaan: 'Berapa limit sin 2x dibagi tan 3x untuk x mendekati 0?',
    pilihan: ['2/3', '3/2', '1', '6', '0'],
    benar: 0,
    langkah: [
      'Sudut kecil: sin 2x ≈ 2x, tan 3x ≈ 3x.',
      'Perbandingannya 2 : 3.',
    ],
    jebakan: '3/2 membalik. 1 mengira sin dan tan saling menghapus tanpa melihat angka di depan sudut.',
    alasan: '2/3.',
  },
  {
    // cek: 2 + 1 === 3 && 5 - 2 === 3
    id: 'k53',
    tingkat: 'sulit',
    pertanyaan: 'Fungsi f(x) = x + 1 untuk x < 2 dan f(x) = 5 - x untuk x ≥ 2. Berapa limit f(x) untuk x mendekati 2?',
    gambar: { jenis: 'grafik', fungsi: ['x < 2 ? x + 1 : 5 - x'], jangkauan: [-1, 5, -1, 5], titik: [{ x: 2, y: 3, label: '(2, 3)' }] },
    pilihan: ['3', 'tidak ada', '2', '5', '1'],
    benar: 0,
    langkah: [
      'Limit kiri: 2 + 1 = 3. Limit kanan: 5 - 2 = 3.',
      'Sepakat di 3: limitnya 3. Grafiknya berbentuk atap yang tersambung.',
    ],
    jebakan: '"tidak ada" mengira dua rumus berarti melompat; keduanya bertemu di 3.',
    alasan: 'Kiri 3, kanan 3.',
  },

  /* ============================ sangat sulit ============================ */
  {
    // cek: Math.abs((3.001 - 3)/(Math.sqrt(3.001 + 1) - 2) - 4) < 0.01
    id: 'k25',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit (x - 3) dibagi (√(x + 1) - 2) untuk x mendekati 3?',
    pilihan: ['1/4', '2', '4', '0', 'tidak ada'],
    benar: 2,
    langkah: [
      'Akarnya di penyebut: kalikan sekawan penyebut, √(x + 1) + 2.',
      'Penyebut jadi (x + 1) - 4 = x - 3; coret dengan pembilang.',
      'Sisa √(x + 1) + 2; di x = 3: 2 + 2 = 4.',
    ],
    jebakan: '1/4 membalik (sekawan dipasang seolah akarnya di pembilang).',
    alasan: '2 + 2 = 4.',
  },
  {
    // cek: Math.abs(Math.sin(2.001 - 2)/(2.001*2.001 - 4) - 0.25) < 1e-3
    id: 'k26',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit sin(x - 2) dibagi (x² - 4) untuk x mendekati 2?',
    pilihan: ['0', '1/4', '1/2', '1', 'tidak ada'],
    benar: 1,
    langkah: [
      'Faktorkan penyebut: (x - 2)(x + 2).',
      'Pisahkan: [sin(x - 2) : (x - 2)] × [1 : (x + 2)].',
      'Bagian pertama menuju 1 (u = x - 2 menuju 0), bagian kedua 1/4.',
    ],
    jebakan: '0 melihat sin 0 = 0 lalu berhenti; penyebutnya juga 0, jadi bentuknya tak tentu.',
    alasan: '1 × 1/4.',
  },
  {
    // cek: Math.abs(Math.sqrt(4e12 + 1e6) - 2e6 - 0.25) < 1e-3
    id: 'k27',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit √(4x² + x) - 2x saat x menuju tak hingga?',
    pilihan: ['0', '1/4', '1/2', '1', 'tak hingga'],
    benar: 1,
    langkah: [
      'Sekawan √(4x² + x) + 2x: pembilang jadi (4x² + x) - 4x² = x.',
      'Bagi dengan x: 1 : (√(4 + 1/x) + 2) menuju 1 : (2 + 2) = 1/4.',
    ],
    jebakan: '1/2 lupa bahwa √(4x²) = 2x, bukan x, sehingga penyebut sekawannya 4, bukan 2.',
    alasan: '1/4.',
  },
  {
    // cek: 2*0 + 1 === 4 - 3
    id: 'k28',
    tingkat: 'sangat sulit',
    pertanyaan: 'Fungsi f didefinisikan: f(x) = ax + 1 untuk x kurang dari 2, dan f(x) = x² - 3 untuk x lebih besar atau sama dengan 2. Berapa a supaya f kontinu di x = 2?',
    pilihan: ['-1', '0', '1', '2', 'tidak ada nilai a yang cocok'],
    benar: 1,
    langkah: [
      'Limit kanan dan f(2): 4 - 3 = 1.',
      'Limit kiri: 2a + 1. Kontinu berarti 2a + 1 = 1, jadi a = 0.',
      'Cek: potongan kiri jadi garis mendatar y = 1 yang bertemu parabola di (2, 1).',
    ],
    jebakan: '1 memasukkan a = 1 tanpa menghitung (2a + 1 = 3 ≠ 1).',
    alasan: '2a + 1 = 1.',
  },
  {
    // cek: Math.abs((1 - Math.cos(2*0.001))/(0.001*0.001) - 2) < 1e-3
    id: 'k29',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit (1 - cos 2x) dibagi x kuadrat untuk x mendekati 0?',
    pilihan: ['0', '1/2', '1', '2', '4'],
    benar: 3,
    langkah: [
      '1 - cos 2x = 2 sin²x (dari cos 2x = 1 - 2 sin²x).',
      'Bentuknya 2 × (sin x : x)² menuju 2 × 1 = 2.',
    ],
    jebakan: '1/2 memakai hasil (1 - cos x)/x² tanpa menyesuaikan sudut 2x. 4 mengkuadratkan angka 2 padahal hanya dikalikan sekali.',
    alasan: '2.',
  },
  {
    // cek: Math.abs((2.001*2.001 - 5*2.001 + 6)/(2.001*2.001 - 4) + 0.25) < 1e-3
    id: 'k30',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit (x² - 5x + 6) : (x² - 4) untuk x mendekati 2?',
    pilihan: ['1/4', '-1/4', '0', '-1', 'tidak ada'],
    benar: 1,
    langkah: [
      'Faktorkan: (x - 2)(x - 3) : (x - 2)(x + 2).',
      'Coret (x - 2), sisa (x - 3) : (x + 2); di x = 2: -1 : 4.',
    ],
    jebakan: '1/4 kehilangan tanda minus dari (2 - 3). Pemfaktoran yang terburu-buru sering menjatuhkan tanda.',
    alasan: '-1/4.',
  },
  {
    // cek: Math.abs((Math.tan(0.001) - Math.sin(0.001))/(0.001**3) - 0.5) < 1e-3
    id: 'k31',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit (tan x - sin x) dibagi x pangkat tiga untuk x mendekati 0?',
    pilihan: ['0', '1/6', '1/2', '1', 'tidak ada'],
    benar: 2,
    langkah: [
      'tan x - sin x = sin x (1 : cos x - 1) = sin x (1 - cos x) : cos x.',
      'Bentuknya (sin x : x) × [(1 - cos x) : x²] × (1 : cos x) menuju 1 × 1/2 × 1.',
    ],
    jebakan: '0 mengira tan x dan sin x saling menghapus; keduanya berbeda di orde x³, dan penyebutnya tepat x³.',
    alasan: '1/2.',
  },
  {
    // cek: Math.abs(1e6 * Math.sin(1/1e6) - 1) < 1e-6
    id: 'k32',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit x dikali sin(1 dibagi x) saat x menuju tak hingga?',
    pilihan: ['0', '1', 'tak hingga', 'tidak ada', 'bergantung nilai x'],
    benar: 1,
    langkah: [
      'Misalkan u = 1 : x; saat x menuju tak hingga, u menuju 0.',
      'x sin(1/x) = sin u : u, yang menuju 1.',
    ],
    jebakan: '0 mengira sin(1/x) menuju 0 lalu seluruhnya nol; x-nya membesar tanpa batas, keduanya saling mengimbangi.',
    alasan: 'Bentuk sin u / u: 1.',
  },
  {
    // cek: Math.abs((Math.sqrt(1 + 0.001) - Math.sqrt(1 - 0.001))/0.001 - 1) < 1e-3
    id: 'k54',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit (√(1 + x) - √(1 - x)) : x untuk x mendekati 0?',
    pilihan: ['1', '0', '1/2', '2', 'tidak ada'],
    benar: 0,
    langkah: [
      'Sekawan √(1 + x) + √(1 - x): pembilang jadi (1 + x) - (1 - x) = 2x.',
      'Coret x: 2 : (√(1 + x) + √(1 - x)) menuju 2 : (1 + 1) = 1.',
    ],
    jebakan: '1/2 lupa bahwa selisih dua akarnya memberi 2x, bukan x. 0 menyerah pada 0/0.',
    alasan: '2/2 = 1.',
  },
  {
    // cek: Math.abs(1e6*(Math.sqrt(1e12 + 1) - 1e6) - 0.5) < 1e-3
    id: 'k55',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit x(√(x² + 1) - x) saat x menuju tak hingga?',
    pilihan: ['1/2', '0', '1', 'tak hingga', 'tidak ada'],
    benar: 0,
    langkah: [
      'Selisih akar menuju 0 tetapi dikali x yang membesar: bentuk tak tentu 0 kali tak hingga.',
      'Sekawan: √(x² + 1) - x = 1 : (√(x² + 1) + x).',
      'Dikali x: x : (√(x² + 1) + x); bagi dengan x: 1 : (√(1 + 1/x²) + 1) menuju 1/2.',
    ],
    jebakan: '0 melihat selisih akar menuju 0 dan berhenti; pengali x mengimbanginya. "tak hingga" melihat x saja.',
    alasan: '1/2.',
  },
  {
    // cek: Math.abs((1 - Math.cos(0.001))/(0.001*Math.sin(0.001)) - 0.5) < 1e-3
    id: 'k56',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit (1 - cos x) : (x sin x) untuk x mendekati 0?',
    pilihan: ['1/2', '1', '0', '2', 'tidak ada'],
    benar: 0,
    langkah: [
      'Sekawan (1 + cos x): pembilang jadi sin²x.',
      'sin²x : (x sin x) = sin x : x, dikali 1 : (1 + cos x).',
      'Menuju 1 × 1/2 = 1/2.',
    ],
    jebakan: '0 melihat 1 - cos 0 = 0 dan berhenti; penyebutnya juga 0.',
    alasan: '1/2.',
  },
  {
    // cek: Math.abs((1.001*1.001 + 3*1.001 - 4)/(1.001 - 1) - 5) < 0.01 && 3 + (-4) === -1
    id: 'k57',
    tingkat: 'sangat sulit',
    pertanyaan: 'Diketahui limit (x² + ax + b) : (x - 1) untuk x mendekati 1 sama dengan 5. Nilai a + b adalah?',
    pilihan: ['-1', '1', '5', '4', '-5'],
    benar: 0,
    langkah: [
      'Penyebut menuju 0 tetapi limitnya ada (5): pembilang juga harus 0 di x = 1, yaitu 1 + a + b = 0.',
      'Maka pembilang = (x - 1)(x + c) dengan c = a + 1 (dari koefisien x: c - 1 = a). Setelah dicoret, limitnya 1 + c = 5, jadi c = 4.',
      'a = 3, b = -4 (periksa: x² + 3x - 4 = (x - 1)(x + 4)). a + b = -1.',
    ],
    jebakan: '5 mengira a + b = limitnya. 4 menjawab c. Kunci soal: limit yang ada memaksa pembilang ikut nol.',
    alasan: 'a = 3, b = -4.',
  },
  {
    // cek: Math.abs((Math.sin(5*0.001) - Math.sin(3*0.001))/0.001 - 2) < 1e-4
    id: 'k58',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit (sin 5x - sin 3x) : x untuk x mendekati 0?',
    pilihan: ['2', '8', '0', '15', '1'],
    benar: 0,
    langkah: [
      'Pecah menjadi dua: sin 5x : x - sin 3x : x.',
      'Masing-masing menuju 5 dan 3; selisihnya 2.',
    ],
    jebakan: '8 menjumlahkan alih-alih mengurangkan. 0 mengira sin 0 - sin 0 selesai, padahal dibagi x yang juga menuju 0.',
    alasan: '5 - 3 = 2.',
  },
  {
    // cek: Math.abs((2e6 + Math.sin(1e6))/1e6 - 2) < 1e-4
    id: 'k59',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa limit (2x + sin x) : x saat x menuju tak hingga?',
    pilihan: ['2', 'tidak ada, karena sin x terus berayun', '3', '1', '0'],
    benar: 0,
    langkah: [
      'Pecah: 2x : x + sin x : x = 2 + sin x : x.',
      'sin x terkurung antara -1 dan 1, sedangkan x membesar: sin x : x menuju 0.',
      'Hasilnya 2 + 0 = 2.',
    ],
    jebakan: '"tidak ada karena sin x berayun" benar bahwa sin x berayun, tetapi ayunannya dibagi x yang raksasa, jadi terjepit ke 0.',
    alasan: '2.',
  },
  {
    // cek: 1 + 2 === 3 && 1 + 2 === 3 && 1 * 2 === 2
    id: 'k60',
    tingkat: 'sangat sulit',
    pertanyaan: 'Fungsi f(x) = ax + 2 untuk x < 1, f(1) = 3, dan f(x) = x² + b untuk x > 1 kontinu di x = 1. Nilai a × b adalah?',
    pilihan: ['2', '3', '1', '6', '0'],
    benar: 0,
    langkah: [
      'Kontinu di 1: limit kiri = limit kanan = f(1) = 3.',
      'Kiri: a + 2 = 3, jadi a = 1. Kanan: 1 + b = 3, jadi b = 2.',
      'a × b = 2.',
    ],
    jebakan: '3 menjawab f(1). 6 mengalikan a dan b yang keliru (2 × 3) karena lupa mengurangi tetapan.',
    alasan: 'a = 1, b = 2.',
  },
]
