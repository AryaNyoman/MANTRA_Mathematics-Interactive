/**
 * Bank soal latihan Trigonometri: 60 soal, 15 tiap tingkat.
 *
 * SEJARAH: 1 Sep 2026 bank ini 32 soal (8 per tingkat). 13 Sep 2026 ARYA
 * meminta 15 soal per tingkat, pembahasan bernomor bergambar, dan penjelasan
 * kenapa pengecoh menggoda. 14 Sep 2026 ARYA MENOLAK pembahasannya
 * (potongan catatan, hitungan dilompati, gambar soal diulang mentah) dan
 * memerintahkan meniru cara mathcyber1997 menulis pembahasan. Semua
 * pembahasan ditulis ulang mengikuti catatan belajar
 * `PELAJARI BENTUK SOAL MATEMATIKA/CATATAN-BELAJAR-PEMBAHASAN.md` bagian 5:
 * pembuka fakta kunci, pemisalan ("bisa dianggap de = 3 dan sa = 4"), alat
 * disebut lalu hitungan penuh, tanda kuadran dalam kurung, penutup "Jadi,
 * ... (Jawaban C)", dan GAMBAR BANTU per langkah (bagan kuadran, segitiga
 * acuan) alih-alih gambar soal yang diulang.
 *
 * Id soal lama DIPERTAHANKAN supaya kemajuan siswa di peramban tidak hilang.
 * Delapan soal yang paling tipis diganti soal jenis baru yang belum ada di
 * bank (dipelajari dari mathcyber1997, ditulis sendiri): k06 dan k35
 * (konversi radian) jadi k61 dan k62; k14 dan k42 jadi k63 (titik koordinat)
 * dan k64 (cos A = 3/4, cari cot A); k22 dan k27 jadi k65 (sin B = p) dan
 * k66 (pecahan dibagi cos x); k52 dan k53 jadi k67 (tan α = 1/a) dan k68
 * (luas segitiga pada lingkaran satuan). Id yang diganti tidak dipakai lagi.
 *
 * CAKUPAN dibatasi materi 1 sampai 10: perbandingan pada segitiga siku-siku,
 * sebangun, lingkaran satuan dan kuadran, enam perbandingan dan garis
 * singgung, sudut istimewa, sudut berelasi, grafik sin cos tan, penerapan
 * elevasi dan depresi. Identitas sudut ganda, aturan sinus dan kosinus
 * sengaja TIDAK dipakai karena belum diperkenalkan.
 *
 * Tiap jawaban berangka punya `// cek:` yang dihitung `alat/cek_kuis.mjs`;
 * `--ketat` juga memeriksa gaya pembahasannya.
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
      'Perhatikan bahwa segitiga siku-siku mempunyai tepat satu sudut siku-siku, yaitu sudut 90° yang bertanda kotak kecil di pojok kanan bawah gambar.',
      {
        teks: 'Sisi di hadapan sudut siku-siku itu, yang sama sekali tidak menyentuhnya, disebut sisi miring atau hipotenusa. Sisi ini selalu yang terpanjang karena menghadap sudut terbesar, seperti gambar berikut.',
        gambar: { jenis: 'segitiga', sudut: 35, label: ['depan', 'samping', 'miring'], namaSudut: 'θ', sorot: 'miring' },
      },
      'Dua sisi lainnya dinamai menurut sudut θ: sisi depan adalah sisi di hadapan θ, dan sisi samping adalah sisi yang mengapit θ.',
      'Jadi, sisi yang menghadap sudut siku-siku disebut sisi miring. (Jawaban C)',
    ],
    jebakan: 'Pilihan E, tegak, dan pilihan D, alas, menyebut posisi sisi pada gambar, padahal nama sisi ditentukan oleh sudut yang ditinjau, bukan oleh arah gambarnya. Pilihan A, depan, adalah sisi di hadapan sudut θ, bukan di hadapan sudut siku-siku.',
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
      {
        teks: 'Perhatikan bahwa penamaan sisi mengacu pada sudut θ: sisi depan adalah sisi di hadapan θ, sisi samping adalah sisi yang mengapit θ selain sisi miring, dan sisi miring adalah sisi di hadapan sudut siku-siku, seperti gambar berikut.',
        gambar: { jenis: 'segitiga', sudut: 35, label: ['depan (de)', 'samping (sa)', 'miring (mi)'], namaSudut: 'θ', sorot: 'depan' },
      },
      'Sinus suatu sudut didefinisikan sebagai perbandingan panjang sisi depan sudut terhadap panjang sisi miring, ditulis sin θ = de/mi.',
      'Jadi, sin θ adalah perbandingan depan : miring. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, depan : samping, adalah definisi tan θ, sedangkan pilihan C, samping : miring, adalah definisi cos θ. Pilihan D, miring : depan, adalah kebalikan sinus, yaitu csc θ.',
    alasan: 'sin θ = depan : miring. Yang "depan : samping" itu tan, "samping : miring" itu cos.',
  },
  {
    // cek: Math.abs(Math.tan(45*D) - 1) < 1e-9
    id: 'k03',
    tingkat: 'mudah',
    pertanyaan: 'Nilai tan 45° adalah…',
    gambar: { jenis: 'segitiga', sudut: 45, label: ['?', '?', '?'], namaSudut: '45°' },
    pilihan: ['0,5', '1', '√2', '√3', '0'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa segitiga siku-siku dengan salah satu sudut lancipnya 45° mempunyai sudut lancip lain sebesar 180° − 90° − 45° = 45°, sehingga segitiga itu sama kaki: sisi depan dan sisi samping sudut 45° sama panjang.',
      {
        teks: 'Misalkan kedua sisi itu panjangnya 1, maka dengan menggunakan teorema Pythagoras, sisi miringnya √(1² + 1²) = √2, seperti segitiga acuan berikut.',
        gambar: { jenis: 'segitiga', sudut: 45, label: ['1', '1', '√2'], namaSudut: '45°' },
      },
      'Dengan demikian, tan 45° = de/sa = 1/1 = 1.',
      'Jadi, nilai tan 45° adalah 1. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, √2, adalah panjang sisi miring segitiga acuan, padahal tangen tidak memakai sisi miring. Pilihan A, 0,5, keliru karena mengira 45° adalah setengah dari 90° sehingga nilainya juga setengah.',
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
      'Sinus sudut adalah perbandingan panjang sisi depan sudut terhadap panjang sisi miring pada segitiga siku-siku, ditulis sin θ = de/mi.',
      {
        teks: 'Diketahui de = 3 cm dan mi = 5 cm. Untuk melengkapi gambar, sisi sampingnya dapat dihitung dengan teorema Pythagoras: sa = √(5² − 3²) = √(25 − 9) = √16 = 4 cm, walaupun nilai ini tidak dibutuhkan untuk sinus.',
        gambar: { jenis: 'segitiga', sudut: 37, label: ['3', '4', '5'], namaSudut: 'θ', sorot: 'depan' },
      },
      'Untuk itu, sin θ = de/mi = 3/5 = 0,6.',
      'Jadi, nilai sin θ = 0,6. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 0,8, adalah cos θ = 4/5 dan pilihan C, 0,75, adalah tan θ = 3/4. Pilihan D, 1,67, muncul bila pecahannya terbalik menjadi 5/3, padahal nilai sinus tidak pernah melebihi 1.',
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
      {
        teks: 'Perhatikan bahwa jari-jari lingkaran satuan panjangnya 1, sehingga jari-jari itu menjadi sisi miring segitiga siku-siku yang kakinya mendatar (biru) dan tegak (merah), seperti gambar berikut.',
        gambar: { jenis: 'lingkaran', sudut: 50, label: '(x, y)', kaki: true },
      },
      'Dengan definisi kosinus, panjang kaki mendatar = sa/mi × mi = cos θ × 1 = cos θ. Itulah koordinat x titiknya.',
      'Dengan definisi sinus, panjang kaki tegak = de/mi × mi = sin θ × 1 = sin θ. Itulah koordinat y titiknya.',
      'Karena koordinat ditulis mendatar dahulu lalu tegak, titik itu adalah (cos θ, sin θ).',
      'Jadi, koordinat titik di ujung jari-jari bersudut θ adalah (cos θ, sin θ). (Jawaban B)',
    ],
    jebakan: 'Pilihan A, (sin θ, cos θ), menukar urutan koordinat; kekeliruan ini paling sering terjadi dan membuat semua tanda kuadran ikut terbalik. Pilihan C dan D memakai tan θ, padahal tangen adalah perbandingan kedua kaki, bukan koordinat titiknya.',
    alasan: 'Mendatar dulu baru tegak: (cos θ, sin θ).',
  },
  {
    // cek: Math.abs(150*D - 5*Math.PI/6) < 1e-9
    id: 'k61',
    tingkat: 'mudah',
    pertanyaan: 'Besar sudut 150° dinyatakan dalam radian adalah…',
    pilihan: ['5π/6', '3π/4', '2π/3', '5π/3', '150π'],
    benar: 0,
    langkah: [
      'Ingat bahwa π radian = 180°, sehingga 1° = π/180 radian.',
      'Untuk itu, 150° = 150 × π/180 radian = 150π/180 radian.',
      'Sederhanakan pecahannya dengan membagi pembilang dan penyebut dengan 30, diperoleh 150π/180 = 5π/6.',
      'Jadi, besar sudut 150° dalam radian adalah 5π/6. (Jawaban A)',
    ],
    jebakan: 'Pilihan E, 150π, mengalikan dengan π tanpa membagi 180. Pilihan C, 2π/3, adalah 120°, dan pilihan B, 3π/4, adalah 135°; keduanya muncul dari salah menyederhanakan pecahan.',
    alasan: '150° = 150π/180 = 5π/6 radian.',
  },
  {
    // cek: Math.abs(Math.cos(0) - 1) < 1e-9
    id: 'k07',
    tingkat: 'mudah',
    pertanyaan: 'Nilai cos 0° adalah…',
    gambar: { jenis: 'lingkaran', sudut: 0, label: '(?, ?)' },
    pilihan: ['0', '0,5', '1', '√3/2', 'tidak terdefinisi'],
    benar: 2,
    langkah: [
      {
        teks: 'Perhatikan bahwa pada sudut 0° jari-jari lingkaran satuan berimpit dengan sumbu-x positif, sehingga titik ujungnya adalah (1, 0), seperti gambar berikut.',
        gambar: { jenis: 'lingkaran', sudut: 0, label: '(1, 0)', kaki: false },
      },
      'Koordinat x titik pada lingkaran satuan adalah kosinus sudutnya, sedangkan koordinat y adalah sinusnya. Dengan demikian, cos 0° = 1 dan sin 0° = 0.',
      'Jadi, nilai cos 0° adalah 1. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 0, adalah nilai sin 0°, bukan cos 0°. Pilihan E menganggap kosinus tidak terdefinisi pada sudut nol, padahal yang tidak terdefinisi hanyalah tangen pada 90° dan 270°.',
    alasan: 'Pada sudut 0° titik lingkaran satuan ada di (1, 0). Koordinat mendatarnya 1, jadi cos 0° = 1.',
  },
  {
    // cek: Math.abs(Math.sin(90*D) - 1) < 1e-9
    id: 'k08',
    tingkat: 'mudah',
    pertanyaan: 'Nilai terbesar yang mungkin dicapai sin θ adalah…',
    gambar: { jenis: 'lingkaran', sudut: 60, label: '(cos θ, sin θ)' },
    pilihan: ['1', '90', '180', 'tak terhingga', '0,5'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa sin θ adalah koordinat y titik pada lingkaran satuan. Karena jari-jari lingkaran itu 1, tidak ada titik pada lingkaran yang koordinat y-nya melebihi 1.',
      {
        teks: 'Nilai 1 itu benar-benar tercapai ketika jari-jari menunjuk lurus ke atas, yaitu pada sudut 90°, sehingga sin 90° = 1. Grafik y = sin x berikut memperlihatkan puncaknya tepat di (90°, 1).',
        gambar: { jenis: 'grafik', fungsi: ['Math.sin(x*Math.PI/180)'], jangkauan: [0, 360, -1.5, 1.5], titik: [{ x: 90, y: 1, label: '(90°, 1)' }], datar: [1] },
      },
      'Jadi, nilai terbesar yang mungkin dicapai sin θ adalah 1. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 90, mengacaukan nilai sinus dengan sudut tempat nilai itu tercapai. Pilihan D, tak terhingga, berlaku untuk tangen di dekat 90°, bukan untuk sinus.',
    alasan: 'sin θ adalah koordinat y pada lingkaran berjari-jari 1, jadi paling besar 1 (tercapai di 90°).',
  },
  {
    id: 'k33',
    tingkat: 'mudah',
    pertanyaan: 'cos θ adalah perbandingan antara…',
    gambar: { jenis: 'segitiga', sudut: 35, label: ['depan', 'samping', 'miring'], namaSudut: 'θ' },
    pilihan: ['depan : miring', 'samping : miring', 'depan : samping', 'miring : samping', 'samping : depan'],
    benar: 1,
    langkah: [
      {
        teks: 'Perhatikan bahwa sisi samping adalah sisi yang mengapit sudut θ selain sisi miring, sedangkan sisi miring adalah sisi di hadapan sudut siku-siku, seperti gambar berikut.',
        gambar: { jenis: 'segitiga', sudut: 35, label: ['depan (de)', 'samping (sa)', 'miring (mi)'], namaSudut: 'θ', sorot: 'samping' },
      },
      'Kosinus suatu sudut didefinisikan sebagai perbandingan panjang sisi samping sudut terhadap panjang sisi miring, ditulis cos θ = sa/mi.',
      'Jadi, cos θ adalah perbandingan samping : miring. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, depan : miring, adalah sin θ, dan pilihan C, depan : samping, adalah tan θ. Pilihan D, miring : samping, adalah kebalikan kosinus, yaitu sec θ.',
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
      'Kosinus sudut adalah perbandingan panjang sisi samping sudut terhadap panjang sisi miring pada segitiga siku-siku, ditulis cos θ = sa/mi.',
      {
        teks: 'Diketahui sa = 8 cm dan mi = 10 cm. Untuk melengkapi gambar, sisi depannya dihitung dengan teorema Pythagoras: de = √(10² − 8²) = √(100 − 64) = √36 = 6 cm.',
        gambar: { jenis: 'segitiga', sudut: 37, label: ['6', '8', '10'], namaSudut: 'θ', sorot: 'samping' },
      },
      'Untuk itu, cos θ = sa/mi = 8/10 = 0,8.',
      'Jadi, nilai cos θ = 0,8. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 0,6, adalah sin θ = 6/10 dan pilihan C, 0,75, adalah tan θ = 6/8. Pilihan D, 1,25, adalah pecahan yang terbalik, 10/8, padahal kosinus tidak pernah melebihi 1.',
    alasan: 'cos θ = samping : miring = 8 : 10 = 0,8.',
  },
  {
    // cek: Math.abs(2*Math.PI/3/D - 120) < 1e-9
    id: 'k62',
    tingkat: 'mudah',
    pertanyaan: 'Besar sudut 2π/3 radian dinyatakan dalam derajat adalah…',
    pilihan: ['60°', '90°', '120°', '150°', '240°'],
    benar: 2,
    langkah: [
      'Ingat bahwa π radian = 180°.',
      'Untuk itu, 2π/3 radian = (2/3) × π radian = (2/3) × 180° = 360°/3 = 120°.',
      'Jadi, besar sudut 2π/3 radian adalah 120°. (Jawaban C)',
    ],
    jebakan: 'Pilihan E, 240°, mengganti π dengan 360° (satu putaran penuh), padahal π radian hanyalah setengah putaran. Pilihan A, 60°, adalah π/3, sepertiga dari 180°, bukan dua pertiganya.',
    alasan: '2π/3 radian = (2/3) × 180° = 120°.',
  },
  {
    // cek: Math.abs(Math.sin(30*D) - 0.5) < 1e-9
    id: 'k36',
    tingkat: 'mudah',
    pertanyaan: 'Nilai sin 30° adalah…',
    gambar: { jenis: 'segitiga', sudut: 30, label: ['?', '?', '?'], namaSudut: '30°' },
    pilihan: ['0,5', '√3/2', '1', '√2/2', '0,3'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa segitiga siku-siku bersudut 30° adalah separuh dari segitiga sama sisi: sisi di hadapan sudut 30° panjangnya tepat setengah sisi miring.',
      {
        teks: 'Misalkan sisi miringnya 2, maka sisi depan sudut 30° adalah 1, dan dengan teorema Pythagoras sisi sampingnya √(2² − 1²) = √3, seperti segitiga acuan berikut.',
        gambar: { jenis: 'segitiga', sudut: 30, label: ['1', '√3', '2'], namaSudut: '30°', sorot: 'depan' },
      },
      'Dengan demikian, sin 30° = de/mi = 1/2 = 0,5.',
      'Jadi, nilai sin 30° adalah 0,5. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, √3/2, adalah cos 30° (sisi samping dibagi sisi miring). Pilihan E, 0,3, menebak dari angka 30 tanpa menghitung perbandingan sisi.',
    alasan: 'Segitiga 30-60-90 bersisi 1, √3, 2: sin 30° = 1/2.',
  },
  {
    // cek: Math.abs(Math.cos(90*D)) < 1e-9 && Math.abs(Math.sin(90*D) - 1) < 1e-9
    id: 'k37',
    tingkat: 'mudah',
    pertanyaan: 'Titik (0, 1) pada lingkaran satuan dicapai pada sudut…',
    gambar: { jenis: 'lingkaran', sudut: 90, label: '(0, 1)' },
    pilihan: ['0°', '45°', '90°', '180°', '270°'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa titik (0, 1) terletak tepat di atas pusat lingkaran: absisnya 0 dan ordinatnya 1, sehingga jari-jari ke titik itu berimpit dengan sumbu-y positif.',
      {
        teks: 'Sudut diukur dari sumbu-x positif berlawanan arah jarum jam, dan sumbu-y positif tercapai setelah seperempat putaran, yaitu 360°/4 = 90°, seperti bagan berikut.',
        gambar: { jenis: 'kuadran', sudut: 90, label: '(0, 1)' },
      },
      'Dengan demikian, cos 90° = 0 dan sin 90° = 1, sesuai koordinat (0, 1).',
      'Jadi, titik (0, 1) dicapai pada sudut 90°. (Jawaban C)',
    ],
    jebakan: 'Pilihan E, 270°, adalah sudut untuk titik (0, −1), tepat di bawah pusat. Pilihan A, 0°, adalah sudut untuk titik (1, 0); yang tertukar biasanya membaca (0, 1) sebagai sumbu-x.',
    alasan: 'Lurus ke atas berarti seperempat putaran dari sumbu-x positif: 90°.',
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
      'Perhatikan bahwa yang diketahui sisi miring dan yang dicari sisi depan sudut 30°, sehingga perbandingan yang memuat keduanya adalah sinus: sin 30° = de/mi.',
      'Ingat bahwa sin 30° = 1/2. Untuk itu, 1/2 = de/10, sehingga de = 10 × 1/2 = 5 cm.',
      {
        teks: 'Sebagai pemeriksaan, sisi sampingnya adalah 10 × cos 30° = 10 × (1/2)√3 = 5√3 ≈ 8,66 cm, dan 5² + (5√3)² = 25 + 75 = 100 = 10², sesuai teorema Pythagoras.',
        gambar: { jenis: 'segitiga', sudut: 30, label: ['5 cm', '5√3 cm', '10 cm'], namaSudut: '30°', sorot: 'depan' },
      },
      'Jadi, panjang sisi di depan sudut 30° adalah 5 cm. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 8,66 cm, adalah sisi samping (10 cos 30°), bukan sisi depan. Pilihan D, 20 cm, membagi 10 dengan 1/2 alih-alih mengalikannya, padahal sisi depan tidak mungkin lebih panjang dari sisi miring.',
    alasan: 'de = mi × sin 30° = 10 × 0,5 = 5 cm.',
  },
  {
    // cek: Math.abs(Math.sin(270*D) + 1) < 1e-9
    id: 'k39',
    tingkat: 'mudah',
    pertanyaan: 'Pada grafik y = sin x, nilai terendah yang dicapai kurva adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.sin(x*Math.PI/180)'], jangkauan: [0, 360, -1.5, 1.5] },
    pilihan: ['0', '-1', '-90', '-360', '-0,5'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa sin x adalah koordinat y titik pada lingkaran satuan yang berjari-jari 1, sehingga nilainya selalu berada di antara −1 dan 1.',
      {
        teks: 'Nilai −1 tercapai ketika jari-jari menunjuk lurus ke bawah, yaitu pada x = 270°, sehingga titik terendah grafik adalah (270°, −1), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['Math.sin(x*Math.PI/180)'], jangkauan: [0, 360, -1.5, 1.5], titik: [{ x: 270, y: -1, label: '(270°, -1)' }], datar: [-1] },
      },
      'Jadi, nilai terendah yang dicapai kurva y = sin x adalah −1. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, −90, dan pilihan D, −360, mengacaukan nilai fungsi (sumbu tegak) dengan sudut (sumbu mendatar). Pilihan A, 0, adalah nilai sinus pada 0° dan 180°, bukan nilai terendahnya.',
    alasan: 'Sinus adalah koordinat y pada lingkaran berjari-jari 1, jadi terendahnya −1 di 270°.',
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
      'Perhatikan bahwa sinus memerlukan sisi miring, sin θ = de/mi, sedangkan yang diketahui baru sisi depan dan sisi samping.',
      {
        teks: 'Dengan menggunakan teorema Pythagoras, diperoleh mi = √(5² + 12²) = √(25 + 144) = √169 = 13 cm, seperti gambar berikut.',
        gambar: { jenis: 'segitiga', sudut: 23, label: ['5', '12', '13'], namaSudut: 'θ', sorot: 'miring' },
      },
      'Untuk itu, sin θ = de/mi = 5/13 ≈ 0,385.',
      'Jadi, nilai sin θ ≈ 0,385. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 0,417, adalah 5/12, yaitu tan θ; sisi samping dipakai seolah-olah sisi miring. Pilihan C, 0,923, adalah cos θ = 12/13. Pilihan D, 2,400, adalah 12/5, pecahan tangen yang terbalik.',
    alasan: 'Sisi miring dari Pythagoras 13, jadi sin θ = 5/13 ≈ 0,385.',
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
      'Karena sin θ = 0,6 = 3/5 dan sin = de/mi, maka bisa dianggap bahwa panjang sisi depan sudutnya 3 dan panjang sisi miringnya 5.',
      {
        teks: 'Dengan menggunakan teorema Pythagoras, diperoleh sa = √(5² − 3²) = √(25 − 9) = √16 = 4, seperti segitiga acuan berikut.',
        gambar: { jenis: 'segitiga', sudut: 37, label: ['3', '4', '5'], namaSudut: 'θ', sorot: 'samping' },
      },
      'Untuk itu, cos θ = sa/mi = 4/5 = 0,8. (Semua perbandingan bertanda positif karena θ sudut lancip.)',
      'Jadi, nilai cos θ = 0,8. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 0,4, mengurangkan 1 − 0,6 seolah sinus dan kosinus berjumlah 1; yang berjumlah 1 adalah kuadratnya, sin² θ + cos² θ = 1. Pilihan E, 0,36, berhenti pada sin² θ tanpa dikurangkan dari 1 dan ditarik akarnya.',
    alasan: 'Segitiga acuan 3-4-5: cos θ = 4/5 = 0,8.',
  },
  {
    // cek: Math.abs(1/0.5 - 2) < 1e-9
    id: 'k11',
    tingkat: 'sedang',
    pertanyaan: 'Jika cos θ = 0,5 maka sec θ =',
    pilihan: ['0,5', '1', '2', '-0,5', '0,25'],
    benar: 2,
    langkah: [
      'Sekan sudut didefinisikan sebagai kebalikan kosinus, yaitu sec θ = 1/cos θ = mi/sa.',
      'Diketahui cos θ = 0,5 = 1/2. Untuk itu, sec θ = 1/(1/2) = 2.',
      'Sebagai pemeriksaan, cos θ = 1/2 berarti bisa dianggap sa = 1 dan mi = 2, dan memang sec θ = mi/sa = 2/1 = 2.',
      'Jadi, nilai sec θ = 2. (Jawaban C)',
    ],
    jebakan: 'Pilihan D, −0,5, mengira "kebalikan" berarti berganti tanda, padahal kebalikan pecahan adalah menukar pembilang dan penyebut. Pilihan E, 0,25, mengkuadratkan 0,5 alih-alih membaliknya.',
    alasan: 'sec θ = 1/cos θ = 1/0,5 = 2.',
  },
  {
    // cek: Math.abs(Math.sin(1) - Math.sin(1 + 2*Math.PI)) < 1e-9
    id: 'k12',
    tingkat: 'sedang',
    pertanyaan: 'Periode grafik y = sin x adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.sin(x*Math.PI/180)'], jangkauan: [0, 720, -1.5, 1.5] },
    pilihan: ['90°', '180°', '270°', '360°', '720°'],
    benar: 3,
    langkah: [
      'Periode adalah panjang selang terpendek sebelum pola grafik berulang persis sama.',
      {
        teks: 'Perhatikan bahwa nilai sin x adalah koordinat y titik pada lingkaran satuan, dan titik itu kembali ke tempat semula setelah satu putaran penuh, yaitu 360°. Grafiknya memperlihatkan pola naik, turun, dan kembali ke 0 yang berulang tiap 360°.',
        gambar: { jenis: 'grafik', fungsi: ['Math.sin(x*Math.PI/180)'], jangkauan: [0, 720, -1.5, 1.5], tegak: [360, 720], arsir: [{ dari: 0, sampai: 360, label: 'satu periode' }] },
      },
      'Selang 180° belum cukup: pada 0° sampai 180° grafik berada di atas sumbu, sedangkan pada 180° sampai 360° berada di bawah sumbu, jadi polanya belum berulang.',
      'Jadi, periode grafik y = sin x adalah 360°. (Jawaban D)',
    ],
    jebakan: 'Pilihan B, 180°, hanya melihat grafik kembali menyentuh sumbu-x di 180°, padahal setelah itu bentuknya terbalik (di bawah sumbu). Pilihan E, 720°, memang mengulang pola, tetapi bukan yang terpendek.',
    alasan: 'Satu putaran penuh lingkaran satuan adalah 360°, dan grafik sin mengulang persis tiap 360°.',
  },
  {
    id: 'k13',
    tingkat: 'sedang',
    pertanyaan: 'Pada kuadran II (sudut antara 90° dan 180°), tanda sin θ dan cos θ berturut-turut…',
    gambar: { jenis: 'lingkaran', sudut: 135, label: '(cos θ, sin θ)' },
    pilihan: ['positif dan positif', 'positif dan negatif', 'negatif dan positif', 'negatif dan negatif', 'nol dan negatif'],
    benar: 1,
    langkah: [
      {
        teks: 'Perhatikan bahwa titik pada lingkaran satuan berkoordinat (cos θ, sin θ). Di kuadran II titiknya berada di kiri atas pusat, sehingga absisnya negatif dan ordinatnya positif, seperti bagan berikut.',
        gambar: { jenis: 'kuadran', sorot: 2, sudut: 135, label: 'θ' },
      },
      'Karena absis adalah cos θ, maka cos θ bernilai negatif; karena ordinat adalah sin θ, maka sin θ bernilai positif.',
      'Dengan demikian, di kuadran II hanya sinus (dan kebalikannya, kosekan) yang bernilai positif.',
      'Jadi, tanda sin θ dan cos θ di kuadran II berturut-turut adalah positif dan negatif. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, negatif dan positif, menukar peran sin dan cos; ini akibat menulis koordinat sebagai (sin θ, cos θ). Pilihan D, negatif dan negatif, adalah tanda di kuadran III.',
    alasan: 'Di kuadran II titiknya di kiri atas: y positif (sin), x negatif (cos).',
  },
  {
    // cek: Math.abs(-6/Math.hypot(6, 8) + 0.6) < 1e-9
    id: 'k63',
    tingkat: 'sedang',
    pertanyaan: 'Titik P(−6, 8) terletak pada kaki sudut θ yang diukur dari sumbu-x positif. Nilai cos θ = …',
    gambar: { jenis: 'vektor', panah: [{ ke: [-6, 8], label: 'P(-6, 8)', warna: 'miring' }], jangkauan: [-8, 3, -1, 10] },
    pilihan: ['-3/5', '3/5', '-4/5', '4/5', '-4/3'],
    benar: 0,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Titik P(−6, 8) berada di kuadran II karena absisnya negatif dan ordinatnya positif, sehingga kosinus sudutnya bernilai negatif. Kaki mendatar (biru) sepanjang 6 dan kaki tegak (merah) sepanjang 8 membentuk segitiga siku-siku dengan OP sebagai sisi miring.',
        gambar: { jenis: 'vektor', panah: [{ ke: [-6, 8], label: 'r', warna: 'miring' }], komponen: [0], jangkauan: [-8, 3, -1, 10] },
      },
      'Dengan menggunakan teorema Pythagoras, jarak titik P ke titik asal O adalah r = √((−6)² + 8²) = √(36 + 64) = √100 = 10.',
      'Untuk sudut yang kakinya melalui titik P(x, y) dengan jarak r ke titik asal, berlaku cos θ = x/r dan sin θ = y/r.',
      'Untuk itu, cos θ = −6/10 = −3/5. (Kosinus bernilai negatif ketika sudut berada di kuadran II.)',
      'Jadi, nilai cos θ = −3/5. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 3/5, lupa membawa tanda negatif dari absis −6. Pilihan D, 4/5, adalah sin θ = y/r. Pilihan E, −4/3, adalah tan θ = y/x.',
    alasan: 'r = 10, cos θ = x/r = −6/10 = −3/5.',
  },
  {
    // cek: Math.abs(3*Math.sin(90*D) - 3) < 1e-9
    id: 'k15',
    tingkat: 'sedang',
    pertanyaan: 'Nilai maksimum grafik y = 3 sin x adalah…',
    gambar: { jenis: 'grafik', fungsi: ['3*Math.sin(x*Math.PI/180)', 'Math.sin(x*Math.PI/180)'], jangkauan: [0, 360, -4, 4], nama: ['y = 3 sin x', 'y = sin x'] },
    pilihan: ['1', '3', '6', '360', '0,33'],
    benar: 1,
    langkah: [
      'Ingat bahwa nilai sin x paling besar adalah 1, tercapai pada x = 90°.',
      'Mengalikan sin x dengan 3 berarti setiap nilai dikalikan 3, sehingga nilai terbesar y = 3 sin x adalah 3 × 1 = 3, tercapai pada x = 90° juga.',
      {
        teks: 'Angka 3 ini disebut amplitudo: jarak dari garis tengah (y = 0) ke puncak grafik, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['3*Math.sin(x*Math.PI/180)'], jangkauan: [0, 360, -4, 4], titik: [{ x: 90, y: 3, label: '(90°, 3)' }], datar: [3, -3] },
      },
      'Jadi, nilai maksimum grafik y = 3 sin x adalah 3. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, 6, mengambil jarak puncak ke lembah (3 − (−3)), padahal yang ditanya nilai maksimumnya, bukan tinggi gelombangnya. Pilihan A, 1, lupa bahwa pengali 3 membesarkan nilainya.',
    alasan: 'Pengali 3 di depan sin melipatkan tinggi gelombang: maksimumnya 3 × 1 = 3.',
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
      'Perhatikan bahwa tangga, dinding, dan tanah membentuk segitiga siku-siku: tangga sebagai sisi miring (5 m), tinggi ujung tangga sebagai sisi depan sudut 60°, dan jarak kaki tangga sebagai sisi samping.',
      'Karena yang diketahui sisi miring dan yang dicari sisi depan, perbandingan yang dipakai adalah sinus: sin 60° = t/5.',
      {
        teks: 'Ingat bahwa sin 60° = (1/2)√3. Untuk itu, t = 5 × (1/2)√3 = (5/2)√3 ≈ 2,5 × 1,732 ≈ 4,33 m, seperti gambar berikut.',
        gambar: { jenis: 'segitiga', sudut: 60, label: ['(5/2)√3 m', '2,5 m', '5 m'], namaSudut: '60°', sorot: 'depan' },
      },
      'Jadi, tinggi ujung tangga dari tanah kira-kira 4,33 m. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 2,50 m, adalah jarak kaki tangga ke dinding (5 cos 60°), bukan tingginya. Pilihan D, 5,77 m, membagi 5 dengan sin 60° alih-alih mengalikannya, padahal tinggi tidak mungkin melebihi panjang tangga.',
    alasan: 'tinggi = 5 sin 60° = 5 × 0,866 ≈ 4,33 m.',
  },
  {
    id: 'k17',
    tingkat: 'sedang',
    pertanyaan: 'cot θ adalah perbandingan…',
    pilihan: ['depan : samping', 'samping : depan', 'miring : depan', 'miring : samping', 'samping : miring'],
    benar: 1,
    langkah: [
      'Kotangen sudut didefinisikan sebagai kebalikan tangen, yaitu cot θ = 1/tan θ.',
      'Karena tan θ = de/sa, membalik pecahan itu memberi cot θ = sa/de, yaitu perbandingan sisi samping terhadap sisi depan.',
      'Ketiga perbandingan kebalikan lainnya adalah sec θ = mi/sa (kebalikan kosinus) dan csc θ = mi/de (kebalikan sinus).',
      'Jadi, cot θ adalah perbandingan samping : depan. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, depan : samping, adalah tan θ, kebalikan dari yang ditanya. Pilihan C, miring : depan, adalah csc θ, dan pilihan D, miring : samping, adalah sec θ; keduanya kebalikan, tetapi dari fungsi yang lain.',
    alasan: 'cot θ = 1/tan θ = samping : depan.',
  },
  {
    id: 'k18',
    tingkat: 'sedang',
    pertanyaan: 'Dua segitiga siku-siku sebangun. Segitiga kedua tiga kali lebih besar. Nilai cos θ pada segitiga kedua…',
    pilihan: ['tiga kali lipat', 'sepertiganya', 'sama saja', 'sembilan kali lipat', 'tidak bisa ditentukan'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa dua segitiga sebangun mempunyai sudut-sudut yang sama besar, dan semua sisinya berbanding dengan faktor yang sama, di sini 3.',
      {
        teks: 'Misalkan pada segitiga pertama sa = 4 dan mi = 5, maka pada segitiga kedua sa = 3 × 4 = 12 dan mi = 3 × 5 = 15, seperti gambar berikut.',
        gambar: { jenis: 'segitiga', sudut: 37, label: ['9', '12', '15'], namaSudut: 'θ', sorot: 'samping' },
      },
      'Dengan demikian, cos θ pada segitiga kedua = 12/15 = 4/5, sama persis dengan cos θ pada segitiga pertama = 4/5, karena faktor 3 pada pembilang dan penyebut saling mencoret.',
      'Jadi, nilai cos θ pada segitiga kedua sama saja dengan pada segitiga pertama. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, tiga kali lipat, mengira perbandingan ikut membesar bersama sisinya, padahal pembilang dan penyebut membesar bersama sehingga hasil baginya tetap. Justru karena inilah nilai perbandingan trigonometri hanya bergantung pada sudut.',
    alasan: 'Sebangun berarti semua sisi dikali angka yang sama; perbandingannya tetap.',
  },
  {
    // cek: Math.abs(Math.cos(180*D) + 1) < 1e-9
    id: 'k26',
    tingkat: 'sedang',
    pertanyaan: 'Nilai cos 180° adalah…',
    gambar: { jenis: 'lingkaran', sudut: 180, label: '(?, ?)' },
    pilihan: ['1', '0', '-1', '0,5', '-0,5'],
    benar: 2,
    langkah: [
      {
        teks: 'Perhatikan bahwa sudut 180° adalah setengah putaran, sehingga jari-jari lingkaran satuan berimpit dengan sumbu-x negatif dan titik ujungnya adalah (−1, 0), seperti gambar berikut.',
        gambar: { jenis: 'lingkaran', sudut: 180, label: '(-1, 0)', kaki: false },
      },
      'Koordinat x titik pada lingkaran satuan adalah kosinus sudutnya. Untuk itu, cos 180° = −1 dan sin 180° = 0.',
      'Jadi, nilai cos 180° adalah −1. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, 0, adalah sin 180°, bukan cos 180°. Pilihan A, 1, lupa bahwa titiknya berada di sisi kiri sumbu, tempat absis bernilai negatif.',
    alasan: 'Setengah putaran mendarat di (−1, 0); absisnya −1.',
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
      {
        teks: 'Perhatikan bahwa titik pada lingkaran satuan bersudut 40° berkoordinat (cos 40°, sin 40°), sehingga kaki mendatar segitiga di bawahnya sepanjang cos 40°, kaki tegaknya sin 40°, dan sisi miringnya jari-jari 1, seperti gambar berikut.',
        gambar: { jenis: 'lingkaran', sudut: 40, label: '(cos 40°, sin 40°)', kaki: true },
      },
      'Dengan menggunakan teorema Pythagoras pada segitiga itu, diperoleh cos² 40° + sin² 40° = 1² = 1.',
      'Hubungan ini berlaku untuk sudut berapa pun, sin² θ + cos² θ = 1, dan dikenal sebagai identitas Pythagoras.',
      'Jadi, nilai sin² 40° + cos² 40° adalah 1. (Jawaban C)',
    ],
    jebakan: 'Pilihan E, bergantung pada sudutnya, menggoda karena sin 40° dan cos 40° memang bergantung pada sudut, tetapi jumlah kuadratnya selalu 1 untuk sudut apa pun. Pilihan D, 1,64, adalah (sin 40° + cos 40°)² yang keliru dianggap sama dengan sin² 40° + cos² 40°.',
    alasan: 'Identitas Pythagoras: sin² θ + cos² θ = 1 untuk sudut berapa pun.',
  },
  {
    // cek: Math.abs(Math.cos(65*D) - Math.sin(25*D)) < 1e-9
    id: 'k40',
    tingkat: 'sedang',
    pertanyaan: 'Jika sin 25° = 0,42, maka cos 65° =',
    gambar: { jenis: 'segitiga', sudut: 25, label: ['depan', 'samping', 'miring'], namaSudut: '25°' },
    pilihan: ['0,42', '0,58', '0,91', '0,84', 'tidak bisa ditentukan'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa 25° + 65° = 90°, sehingga kedua sudut itu saling berpenyiku (komplemen): keduanya adalah dua sudut lancip pada satu segitiga siku-siku.',
      {
        teks: 'Misalkan sisi-sisi segitiga itu a (di hadapan sudut 25°), b, dan c (sisi miring). Dilihat dari sudut 25°, sisi a adalah sisi depan, sehingga sin 25° = a/c. Dilihat dari sudut 65° di pojok atas, sisi a yang sama justru menjadi sisi samping, sehingga cos 65° = a/c.',
        gambar: { jenis: 'segitiga', sudut: 25, label: ['a', 'b', 'c'], namaSudut: '25°', sorot: 'depan' },
      },
      'Dengan demikian, cos 65° = sin 25° = 0,42. Secara umum berlaku cos(90° − θ) = sin θ.',
      'Jadi, nilai cos 65° = 0,42. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 0,58, mengurangkan 1 − 0,42, padahal sinus dan kosinus tidak berjumlah 1. Pilihan C, 0,91, adalah cos 25°, bukan cos 65°. Pilihan E menyerah, padahal sudut berpenyiku selalu bisa dihubungkan.',
    alasan: 'Sudut berpenyiku: cos 65° = sin(90° − 65°) = sin 25° = 0,42.',
  },
  {
    // cek: Math.abs(Math.tan(60*D) - 1.732) < 0.001
    id: 'k41',
    tingkat: 'sedang',
    pertanyaan: 'Nilai tan 60° adalah…',
    gambar: { jenis: 'segitiga', sudut: 60, label: ['?', '?', '?'], namaSudut: '60°' },
    pilihan: ['√3', '1/√3', '1', '2', '√3/2'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa segitiga siku-siku bersudut 60° mempunyai sudut lancip lain 30°, sehingga ia separuh dari segitiga sama sisi: sisi di hadapan sudut 30° adalah setengah sisi miring.',
      {
        teks: 'Misalkan sisi miringnya 2, maka sisi di hadapan sudut 30° (yaitu sisi samping sudut 60°) adalah 1, dan dengan teorema Pythagoras sisi depan sudut 60° adalah √(2² − 1²) = √3, seperti segitiga acuan berikut.',
        gambar: { jenis: 'segitiga', sudut: 60, label: ['√3', '1', '2'], namaSudut: '60°', sorot: 'depan' },
      },
      'Dengan demikian, tan 60° = de/sa = √3/1 = √3.',
      'Jadi, nilai tan 60° adalah √3. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 1/√3, adalah tan 30°, karena sisi depan dan samping tertukar. Pilihan E, √3/2, adalah sin 60°; sisi miring ikut dipakai padahal tangen hanya memakai kedua kaki.',
    alasan: 'Segitiga 30-60-90 bersisi 1, √3, 2: tan 60° = √3/1 = √3.',
  },
  {
    // cek: Math.abs(1/Math.tan(Math.acos(3/4)) - 3*Math.sqrt(7)/7) < 1e-9
    id: 'k64',
    tingkat: 'sedang',
    pertanyaan: 'Diketahui cos A = 3/4 dengan A sudut lancip. Nilai cot A = …',
    gambar: { jenis: 'segitiga', sudut: 41.4, label: ['?', '3', '4'], namaSudut: 'A' },
    pilihan: ['(3/7)√7', '(1/3)√7', '3/4', '(4/7)√7', '(1/4)√7'],
    benar: 0,
    langkah: [
      'Kosinus sudut adalah perbandingan panjang sisi samping sudut terhadap panjang sisi miring (hipotenusa) pada suatu segitiga siku-siku. Untuk itu, cos A = 3/4 = sa/mi.',
      {
        teks: 'Misalkan sa = 3 dan mi = 4, maka dengan menggunakan teorema Pythagoras, diperoleh de = √(4² − 3²) = √(16 − 9) = √7, seperti segitiga acuan berikut.',
        gambar: { jenis: 'segitiga', sudut: 41.4, label: ['√7', '3', '4'], namaSudut: 'A', sorot: 'depan' },
      },
      'Kotangen sudut adalah perbandingan panjang sisi samping terhadap sisi depan sudut, kebalikan dari tangen. Untuk itu, cot A = sa/de = 3/√7.',
      'Rasionalkan penyebutnya dengan mengalikan pembilang dan penyebut dengan √7, diperoleh cot A = 3√7/7 = (3/7)√7.',
      'Jadi, nilai cot A = (3/7)√7. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, (1/3)√7, adalah tan A = √7/3, kebalikan dari yang ditanya. Pilihan C, 3/4, hanya mengulang nilai cos A. Pilihan E, (1/4)√7, adalah sin A = √7/4.',
    alasan: 'Segitiga acuan 3, √7, 4: cot A = 3/√7 = (3/7)√7.',
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
      'Karena tan θ = 3/4 dan tan = de/sa, maka bisa dianggap bahwa panjang sisi depan sudutnya 3, sedangkan panjang sisi sampingnya 4.',
      {
        teks: 'Dengan menggunakan teorema Pythagoras, diperoleh mi = √(3² + 4²) = √(9 + 16) = √25 = 5, seperti segitiga acuan berikut.',
        gambar: { jenis: 'segitiga', sudut: 37, label: ['3', '4', '5'], namaSudut: 'θ', sorot: 'miring' },
      },
      'Untuk itu, sin θ = de/mi = 3/5 = 0,60. (Bertanda positif karena θ sudut lancip.)',
      'Jadi, nilai sin θ = 0,60. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 0,75, hanya mengubah 3/4 ke desimal, seolah-olah sinus sama dengan tangen. Pilihan C, 0,80, adalah cos θ = 4/5. Pilihan D, 1,25, adalah sec θ = 5/4; pecahannya terbalik.',
    alasan: 'Segitiga acuan 3-4-5: sin θ = 3/5 = 0,6.',
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
      {
        teks: 'Perhatikan bahwa 90° < 150° < 180°, sehingga 150° berada di kuadran II. Di kuadran II sinus bernilai positif, sedangkan kosinus dan tangen bernilai negatif, seperti bagan berikut.',
        gambar: { jenis: 'kuadran', sorot: 2, sudut: 150, label: '150°' },
      },
      'Sudut 150° dapat ditulis sebagai 180° − 30°, sehingga sudut acuannya (jarak ke sumbu-x terdekat) adalah 30°.',
      'Dengan menggunakan hubungan sudut berelasi sin(180° − α) = sin α, diperoleh sin 150° = sin 30° = 1/2 = 0,5.',
      'Jadi, nilai sin 150° adalah 0,5. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, −0,5, memberi tanda negatif hanya karena sudutnya "besar", padahal di kuadran II sinus justru positif. Pilihan C, 0,866, adalah sin 60°; sudut acuannya salah dihitung sebagai 150° − 90° = 60°, padahal acuan diambil terhadap sumbu-x (180°), bukan sumbu-y.',
    alasan: '150° = 180° − 30° di kuadran II, sin positif: sin 150° = sin 30° = 0,5.',
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
      {
        teks: 'Perhatikan bahwa 90° < 120° < 180°, sehingga 120° berada di kuadran II. Di kuadran II hanya sinus yang positif; tangen bernilai negatif, seperti bagan berikut.',
        gambar: { jenis: 'kuadran', sorot: 2, sudut: 120, label: '120°' },
      },
      'Sudut 120° dapat ditulis sebagai 180° − 60°, sehingga sudut acuannya adalah 60°.',
      'Dengan menggunakan hubungan sudut berelasi tan(180° − α) = −tan α, diperoleh tan 120° = −tan 60° = −√3 ≈ −1,73.',
      'Jadi, nilai tan 120° ≈ −1,73. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 1,73, benar besarnya tetapi lupa tanda negatif kuadran II. Pilihan D, −0,58, memakai tan 30° sebagai acuan; sudut acuannya salah dihitung sebagai 120° − 90° = 30°, padahal harus 180° − 120° = 60°.',
    alasan: '120° = 180° − 60° di kuadran II, tan negatif: tan 120° = −tan 60° = −√3.',
  },
  {
    // cek: Math.abs(0.6/Math.sqrt(1 - 0.36) - Math.tan(Math.asin(0.6))) < 1e-9
    id: 'k65',
    tingkat: 'sulit',
    pertanyaan: 'Jika sin B = p dengan B sudut lancip, maka tan B = …',
    gambar: { jenis: 'segitiga', sudut: 37, label: ['p', '?', '1'], namaSudut: 'B' },
    pilihan: ['p/√(1 − p²)', '√(1 − p²)/p', 'p/(1 − p²)', '√(1 − p²)', '1/p'],
    benar: 0,
    langkah: [
      'Sinus sudut adalah perbandingan sisi depan terhadap sisi miring, sehingga sin B = p = p/1 bisa dianggap sebagai de = p dan mi = 1.',
      {
        teks: 'Dengan menggunakan teorema Pythagoras, diperoleh sa = √(1² − p²) = √(1 − p²), seperti segitiga acuan berikut.',
        gambar: { jenis: 'segitiga', sudut: 37, label: ['p', '√(1 − p²)', '1'], namaSudut: 'B', sorot: 'samping' },
      },
      'Untuk itu, tan B = de/sa = p/√(1 − p²). (Semua perbandingan bertanda positif karena B sudut lancip.)',
      'Sebagai pemeriksaan dengan angka, ambil p = 0,6: tan B = 0,6/√(1 − 0,36) = 0,6/0,8 = 3/4, sesuai segitiga 3-4-5.',
      'Jadi, tan B = p/√(1 − p²). (Jawaban A)',
    ],
    jebakan: 'Pilihan B, √(1 − p²)/p, adalah cot B, pecahannya terbalik. Pilihan D, √(1 − p²), adalah cos B. Pilihan C, p/(1 − p²), lupa menarik akar saat menghitung sisi samping.',
    alasan: 'de = p, mi = 1, sa = √(1 − p²), sehingga tan B = p/√(1 − p²).',
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
      'Perhatikan bahwa tiang, bayangannya, dan sinar matahari membentuk segitiga siku-siku dengan siku di kaki tiang. Sudut elevasi 30° berada di ujung bayangan; tiang (12 m) adalah sisi depan sudut itu dan bayangan adalah sisi sampingnya.',
      'Karena yang diketahui sisi depan dan yang dicari sisi samping, perbandingan yang dipakai adalah tangen: tan 30° = 12/b.',
      {
        teks: 'Ingat bahwa tan 30° = (1/3)√3. Untuk itu, b = 12/tan 30° = 12/((1/3)√3) = 36/√3 = 12√3 ≈ 12 × 1,732 ≈ 20,8 m, seperti gambar berikut.',
        gambar: { jenis: 'segitiga', sudut: 30, label: ['12 m', '12√3 m', '24 m'], namaSudut: '30°', sorot: 'samping' },
      },
      'Jadi, panjang bayangan tiang kira-kira 20,8 m. (Jawaban D)',
    ],
    jebakan: 'Pilihan B, 10,4 m, adalah 12 tan 30°, hasil mengalikan alih-alih membagi; padahal pada sudut 30° yang kecil, bayangan haruslah lebih panjang dari tiangnya. Pilihan E, 24,0 m, adalah panjang sinar (sisi miring, 12/sin 30°), bukan bayangannya.',
    alasan: 'tan 30° = 12/bayangan, sehingga bayangan = 12/tan 30° = 12√3 ≈ 20,8 m.',
  },
  {
    // cek: Math.abs(Math.cos(90*D)) < 1e-9 && Math.abs(Math.cos(270*D)) < 1e-9
    id: 'k24',
    tingkat: 'sulit',
    pertanyaan: 'Pada sudut berapa saja tan θ tidak terdefinisi, untuk 0° ≤ θ < 360°?',
    gambar: { jenis: 'grafik', fungsi: ['Math.tan(x*Math.PI/180)'], jangkauan: [0, 360, -4, 4] },
    pilihan: ['0° dan 180°', '90° dan 270°', '45° dan 225°', '180° saja', '90° saja'],
    benar: 1,
    langkah: [
      'Ingat bahwa tan θ = sin θ/cos θ, sehingga tangen tidak terdefinisi tepat ketika penyebutnya nol, yaitu ketika cos θ = 0.',
      'Kosinus adalah koordinat x titik pada lingkaran satuan, dan koordinat x itu nol hanya ketika titiknya berada pada sumbu-y, yaitu di (0, 1) dan (0, −1).',
      {
        teks: 'Titik (0, 1) dicapai pada sudut 90° dan titik (0, −1) pada sudut 270°. Pada grafik y = tan θ, di kedua sudut itu kurva melesat ke atas dan ke bawah tanpa pernah menyentuh garis tegaknya (asimtot), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['Math.tan(x*Math.PI/180)'], jangkauan: [0, 360, -4, 4], tegak: [90, 270] },
      },
      'Jadi, tan θ tidak terdefinisi pada 90° dan 270°. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 0° dan 180°, adalah sudut tempat tan θ bernilai 0, bukan tidak terdefinisi; di sana sin θ yang nol, bukan cos θ. Pilihan E, 90° saja, melupakan bahwa cos θ juga nol pada 270°.',
    alasan: 'tan = sin/cos; penyebut nol saat cos θ = 0, yaitu di 90° dan 270°.',
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
      {
        teks: 'Perhatikan bahwa θ berada di kuadran II sehingga sinusnya bernilai positif, sedangkan kosinusnya bernilai negatif, seperti bagan berikut.',
        gambar: { jenis: 'kuadran', sorot: 2, sudut: 127, label: 'θ' },
      },
      'Karena sin θ = 0,8 = 4/5 dan sin = de/mi, maka bisa dianggap bahwa panjang sisi depan sudut acuannya 4 dan panjang sisi miringnya 5.',
      {
        teks: 'Dengan menggunakan teorema Pythagoras, diperoleh sa = √(5² − 4²) = √(25 − 16) = √9 = 3, seperti segitiga acuan berikut.',
        gambar: { jenis: 'segitiga', sudut: 53, label: ['4', '3', '5'], namaSudut: 'θ', sorot: 'samping' },
      },
      'Untuk itu, cos θ = −sa/mi = −3/5 = −0,6. (Kosinus bernilai negatif ketika sudut berada di kuadran II.)',
      'Jadi, nilai cos θ = −0,6. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 0,6, benar besarnya tetapi lupa memberi tanda kuadran II. Pilihan D, −0,2, mengurangkan 1 − 0,8, seolah sinus dan kosinus berjumlah 1; yang berjumlah 1 adalah kuadratnya.',
    alasan: 'Segitiga acuan 3-4-5 memberi |cos θ| = 0,6; di kuadran II cos negatif: −0,6.',
  },
  {
    // cek: Math.abs((5*Math.sin(Math.atan(2)) + 6*Math.cos(Math.atan(2)))/(2*Math.cos(Math.atan(2)) - 3*Math.sin(Math.atan(2))) + 4) < 1e-9
    id: 'k66',
    tingkat: 'sulit',
    pertanyaan: 'Jika tan x = 2, maka nilai dari (5 sin x + 6 cos x)/(2 cos x − 3 sin x) = …',
    pilihan: ['-4', '4', '-1', '16', '11/8'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa bentuk yang ditanya memuat sin x dan cos x, sedangkan yang diketahui hanya tan x. Ingat bahwa tan x = sin x/cos x, sehingga pembilang dan penyebut dibagi cos x supaya muncul tan x.',
      'Dengan membagi pembilang dan penyebut dengan cos x, diperoleh (5 sin x + 6 cos x)/(2 cos x − 3 sin x) = (5 tan x + 6)/(2 − 3 tan x).',
      'Substitusikan tan x = 2, diperoleh (5 · 2 + 6)/(2 − 3 · 2) = 16/(−4) = −4.',
      'Jadi, nilai dari (5 sin x + 6 cos x)/(2 cos x − 3 sin x) adalah −4. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 4, lupa tanda negatif penyebut 2 − 6 = −4. Pilihan D, 16, hanya menghitung pembilangnya. Pilihan E, 11/8, mengganti sin x dan cos x keduanya dengan 1 lalu menambahkan tan x di tempat yang keliru.',
    alasan: 'Bagi pembilang dan penyebut dengan cos x: (5 tan x + 6)/(2 − 3 tan x) = 16/(−4) = −4.',
  },
  {
    // cek: Math.abs(360/3 - 120) < 1e-9
    id: 'k28',
    tingkat: 'sulit',
    pertanyaan: 'Grafik y = 4 cos(3x) memiliki amplitudo dan periode berturut-turut…',
    gambar: { jenis: 'grafik', fungsi: ['4*Math.cos(3*x*Math.PI/180)'], jangkauan: [0, 360, -5, 5] },
    pilihan: ['4 dan 360°', '4 dan 120°', '3 dan 120°', '3 dan 360°', '12 dan 120°'],
    benar: 1,
    langkah: [
      'Ingat bahwa untuk y = a cos(bx), amplitudonya |a| dan periodenya 360°/b.',
      'Karena y = 4 cos(3x), berarti a = 4 dan b = 3. Untuk itu, amplitudonya 4: grafik bergerak dari −4 sampai 4.',
      {
        teks: 'Periodenya 360°/3 = 120°: pengali 3 pada x membuat satu putaran penuh kosinus selesai dalam sepertiga jarak, sehingga dalam 360° ada tiga gelombang, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['4*Math.cos(3*x*Math.PI/180)'], jangkauan: [0, 360, -5, 5], tegak: [120, 240], arsir: [{ dari: 0, sampai: 120, label: 'satu periode' }], datar: [4, -4] },
      },
      'Jadi, amplitudo dan periode grafik y = 4 cos(3x) berturut-turut 4 dan 120°. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, 3 dan 120°, menukar peran kedua angka: 3 adalah pengali sudut yang menentukan periode, bukan amplitudo. Pilihan A, 4 dan 360°, lupa bahwa pengali 3 memperpendek periode. Pilihan E, 12, mengalikan 4 dan 3 tanpa alasan.',
    alasan: 'a = 4 amplitudo; periode = 360°/3 = 120°.',
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
      'Perhatikan bahwa sudut depresi diukur dari garis mendatar di puncak menara ke bawah menuju kapal. Karena garis mendatar itu sejajar dengan permukaan laut, sudut elevasi dari kapal ke puncak menara juga 25° (sudut dalam berseberangan).',
      'Dengan demikian, dilihat dari kapal, menara (40 m) adalah sisi depan sudut 25° dan jarak mendatar d adalah sisi sampingnya. Perbandingan yang memuat keduanya adalah tangen: tan 25° = 40/d.',
      {
        teks: 'Untuk itu, d = 40/tan 25° ≈ 40/0,4663 ≈ 85,8 m, seperti gambar berikut.',
        gambar: { jenis: 'segitiga', sudut: 25, label: ['40 m', '85,8 m', '94,6 m'], namaSudut: '25°', sorot: 'samping' },
      },
      'Jadi, jarak mendatar kapal dari kaki menara kira-kira 85,8 m. (Jawaban D)',
    ],
    jebakan: 'Pilihan B, 18,7 m, adalah 40 tan 25°, hasil mengalikan alih-alih membagi; padahal pada sudut sekecil 25° jaraknya harus jauh lebih panjang dari tinggi menara. Pilihan E, 94,6 m, adalah panjang garis pandang (40/sin 25°), yaitu sisi miring, bukan jarak mendatarnya.',
    alasan: 'tan 25° = 40/d, sehingga d = 40/tan 25° ≈ 85,8 m.',
  },
  {
    // cek: Math.abs(2*1 - 2*(-1) - 4) < 1e-9
    id: 'k31',
    tingkat: 'sulit',
    pertanyaan: 'Sebuah roda berputar dan tinggi satu titik di tepinya mengikuti y = 2 sin x meter dari sumbu. Selisih antara titik tertinggi dan terendah adalah…',
    gambar: { jenis: 'grafik', fungsi: ['2*Math.sin(x*Math.PI/180)'], jangkauan: [0, 360, -3, 3] },
    pilihan: ['1 m', '2 m', '4 m', '6,28 m', '360 m'],
    benar: 2,
    langkah: [
      'Ingat bahwa sin x bernilai paling besar 1 (pada x = 90°) dan paling kecil −1 (pada x = 270°).',
      {
        teks: 'Karena y = 2 sin x, titik tertinggi adalah 2 × 1 = 2 m dan titik terendah adalah 2 × (−1) = −2 m, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['2*Math.sin(x*Math.PI/180)'], jangkauan: [0, 360, -3, 3], titik: [{ x: 90, y: 2, label: '2' }, { x: 270, y: -2, label: '-2' }], datar: [2, -2] },
      },
      'Dengan demikian, selisih tinggi kedua titik itu adalah 2 − (−2) = 4 m, yaitu dua kali amplitudo, sama dengan diameter roda.',
      'Jadi, selisih antara titik tertinggi dan terendah adalah 4 m. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, 2 m, hanya mengambil amplitudo (jarak dari sumbu ke puncak), padahal titik terendahnya di bawah sumbu, sehingga selisihnya dua kali amplitudo. Pilihan D, 6,28 m, mengira yang ditanya keliling roda (2π kali jari-jari 1).',
    alasan: 'Tertinggi 2, terendah −2, selisihnya 4 m (diameter roda).',
  },
  {
    // cek: Math.abs(Math.tan(45*D) - 1) < 1e-9 && Math.abs(Math.tan(225*D) - 1) < 1e-9 && Math.abs(Math.tan(135*D) + 1) < 1e-9
    id: 'k32',
    tingkat: 'sulit',
    pertanyaan: 'Jika tan θ = 1 dan 0° ≤ θ < 360°, nilai θ yang mungkin adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.tan(x*Math.PI/180)', '1'], jangkauan: [0, 360, -4, 4], tegak: [90, 270], nama: ['y = tan θ', 'y = 1'] },
    pilihan: ['45° saja', '45° dan 135°', '45° dan 225°', '135° dan 315°', '45°, 135°, 225°, dan 315°'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa tan θ = 1 bernilai positif, sehingga θ harus berada di kuadran tempat tangen positif, yaitu kuadran I atau kuadran III (di sana sinus dan kosinus bertanda sama).',
      {
        teks: 'Sudut acuannya adalah sudut lancip dengan tangen 1, yaitu 45°. Di kuadran I sudutnya 45° sendiri, dan di kuadran III sudutnya 180° + 45° = 225°, seperti bagan berikut.',
        gambar: { jenis: 'kuadran', sorot: 3, sudut: 225, label: '225°' },
      },
      'Sebagai pemeriksaan, tan 225° = tan(180° + 45°) = tan 45° = 1, sedangkan tan 135° = −tan 45° = −1 dan tan 315° = −1, keduanya tidak memenuhi.',
      'Jadi, nilai θ yang mungkin adalah 45° dan 225°. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, 45° dan 135°, mengira tangen berulang seperti sinus (sudut dan pelurusnya), padahal tan 135° = −1. Pilihan E memuat semua sudut yang tangennya bernilai 1 atau −1 tanpa memeriksa tandanya. Pilihan A lupa bahwa tangen berulang tiap 180°.',
    alasan: 'Tangen positif di kuadran I dan III: 45° dan 180° + 45° = 225°.',
  },
  {
    // cek: Math.abs(50*Math.sin(30*D) + 1 - 26) < 1e-9
    id: 'k43',
    tingkat: 'sulit',
    pertanyaan: 'Benang layang-layang sepanjang 50 m terentang lurus membentuk sudut 30° dengan tanah. Tangan pemegangnya 1 m di atas tanah. Tinggi layang-layang dari tanah adalah…',
    gambar: { jenis: 'segitiga', sudut: 30, label: ['tinggi (t)', 'jarak mendatar', '50 m'], namaSudut: '30°' },
    pilihan: ['25 m', '26 m', '43,3 m', '44,3 m', '51 m'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa benang (50 m) adalah sisi miring segitiga siku-siku yang sudut 30°-nya berada di tangan pemegang, dan tinggi layang-layang di atas tangan, t, adalah sisi depan sudut itu.',
      {
        teks: 'Karena yang diketahui sisi miring dan yang dicari sisi depan, dipakai sinus: sin 30° = t/50, sehingga t = 50 × sin 30° = 50 × 1/2 = 25 m, seperti gambar berikut.',
        gambar: { jenis: 'segitiga', sudut: 30, label: ['25 m', '25√3 m', '50 m'], namaSudut: '30°', sorot: 'depan' },
      },
      'Tinggi 25 m itu diukur dari tangan, sedangkan tangan berada 1 m di atas tanah. Untuk itu, tinggi layang-layang dari tanah adalah 25 + 1 = 26 m.',
      'Jadi, tinggi layang-layang dari tanah adalah 26 m. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 25 m, benar untuk tinggi di atas tangan tetapi lupa menambahkan 1 m tinggi tangan. Pilihan D, 44,3 m, memakai kosinus (jarak mendatar 50 cos 30° ≈ 43,3 m) lalu menambah 1 m. Pilihan E, 51 m, menganggap benang tegak lurus.',
    alasan: '50 sin 30° = 25 m di atas tangan, ditambah 1 m tinggi tangan: 26 m.',
  },
  {
    // cek: Math.abs(10*Math.tan(60*D) - 17.32) < 0.01
    id: 'k44',
    tingkat: 'sulit',
    pertanyaan: 'Dari titik A, puncak menara terlihat dengan sudut elevasi 30°. Setelah berjalan 20 m mendekati menara ke titik B, sudut elevasinya menjadi 60°. Tinggi menara kira-kira…',
    gambar: { jenis: 'svg', viewBox: '0 0 460 230', isi: '<line x1="30" y1="200" x2="430" y2="200" stroke="#8B8378" stroke-width="1.4"/><line x1="360" y1="200" x2="360" y2="60" stroke="#C25E4D" stroke-width="3"/><line x1="70" y1="200" x2="360" y2="60" stroke="#1F2430" stroke-width="1.6"/><line x1="220" y1="200" x2="360" y2="60" stroke="#1F2430" stroke-width="1.6"/><path d="M 100 200 A 30 30 0 0 0 96 186" fill="none" stroke="#6A4C93" stroke-width="1.8"/><path d="M 246 200 A 26 26 0 0 0 233 178" fill="none" stroke="#6A4C93" stroke-width="1.8"/><text x="104" y="192" font-size="12" fill="#6A4C93" font-family="var(--font-mono), sans-serif">30°</text><text x="250" y="188" font-size="12" fill="#6A4C93" font-family="var(--font-mono), sans-serif">60°</text><text x="70" y="218" font-size="12" text-anchor="middle" fill="#1F2430" font-family="var(--font-mono), sans-serif">A</text><text x="220" y="218" font-size="12" text-anchor="middle" fill="#1F2430" font-family="var(--font-mono), sans-serif">B</text><text x="145" y="218" font-size="11" text-anchor="middle" fill="#3A6EA5" font-family="var(--font-mono), sans-serif">20 m</text><text x="290" y="218" font-size="11" text-anchor="middle" fill="#3A6EA5" font-family="var(--font-mono), sans-serif">x</text><text x="372" y="134" font-size="12" fill="#C25E4D" font-family="var(--font-mono), sans-serif">h</text>' },
    pilihan: ['10,0 m', '11,5 m', '17,3 m', '20,0 m', '34,6 m'],
    benar: 2,
    langkah: [
      'Misalkan tinggi menara h meter dan jarak titik B ke kaki menara x meter, sehingga jarak titik A ke kaki menara adalah x + 20 meter.',
      {
        teks: 'Pertama, tinjau segitiga siku-siku dari titik B (sudut 60°). Dengan definisi tangen, tan 60° = h/x, sehingga h = x tan 60° = x√3.',
        gambar: { jenis: 'segitiga', sudut: 60, label: ['h', 'x', ''], namaSudut: '60°', sorot: 'depan' },
      },
      {
        teks: 'Selanjutnya, tinjau segitiga siku-siku dari titik A (sudut 30°). Dengan definisi tangen, tan 30° = h/(x + 20), sehingga h = (x + 20) tan 30° = (x + 20)/√3.',
        gambar: { jenis: 'segitiga', sudut: 30, label: ['h', 'x + 20', ''], namaSudut: '30°', sorot: 'samping' },
      },
      'Karena kedua ruas kanan menyatakan h yang sama, samakan keduanya: x√3 = (x + 20)/√3. Kalikan kedua ruas dengan √3, diperoleh 3x = x + 20, sehingga 2x = 20 dan x = 10.',
      'Substitusikan x = 10 ke h = x√3, diperoleh h = 10√3 ≈ 10 × 1,732 ≈ 17,3 m.',
      'Jadi, tinggi menara kira-kira 17,3 m. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 10,0 m, berhenti pada x = 10, padahal x adalah jarak B ke menara, bukan tingginya. Pilihan E, 34,6 m, adalah 20 tan 60°; jarak 20 m dipakai seolah-olah jarak B ke menara. Pilihan B, 11,5 m, adalah 20 tan 30°, kekeliruan yang sama dari titik A.',
    alasan: 'h = x√3 dan h = (x + 20)/√3 memberi x = 10, jadi h = 10√3 ≈ 17,3 m.',
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
      {
        teks: 'Perhatikan bahwa 180° < 240° < 270°, sehingga 240° berada di kuadran III. Di kuadran III hanya tangen yang positif; sinus bernilai negatif, seperti bagan berikut.',
        gambar: { jenis: 'kuadran', sorot: 3, sudut: 240, label: '240°' },
      },
      'Sudut 240° dapat ditulis sebagai 180° + 60°, sehingga sudut acuannya adalah 60°.',
      'Dengan menggunakan hubungan sudut berelasi sin(180° + α) = −sin α, diperoleh sin 240° = −sin 60° = −(1/2)√3 ≈ −0,866.',
      'Jadi, nilai sin 240° ≈ −0,866. (Jawaban D)',
    ],
    jebakan: 'Pilihan C, 0,866, benar besarnya tetapi lupa tanda negatif kuadran III. Pilihan B, −0,5, memakai sudut acuan 30°; acuannya salah dihitung sebagai 270° − 240° = 30°, padahal acuan diambil terhadap sumbu-x (180°), yaitu 240° − 180° = 60°.',
    alasan: '240° = 180° + 60° di kuadran III, sin negatif: sin 240° = −sin 60° ≈ −0,866.',
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
      {
        teks: 'Perhatikan bahwa 180° ≤ α ≤ 270°, sehingga α berada di kuadran III. Di kuadran III tangen bernilai positif, sedangkan sinus dan kosinus bernilai negatif, seperti bagan berikut.',
        gambar: { jenis: 'kuadran', sorot: 3, sudut: 216.87, label: 'α' },
      },
      {
        teks: 'Karena tan α = 3/4 dan tan = de/sa, maka bisa dianggap bahwa panjang sisi depan sudut acuannya 3, sedangkan panjang sisi sampingnya 4, seperti segitiga acuan berikut.',
        gambar: { jenis: 'segitiga', sudut: 36.87, label: ['Depan = 3', 'Samping = 4', 'Miring = ?'], namaSudut: 'α', sorot: 'miring' },
      },
      'Dengan menggunakan teorema Pythagoras, diperoleh mi = √(3² + 4²) = √(9 + 16) = √25 = 5.',
      'Untuk itu, sin α = −de/mi = −3/5. (Sinus sudut bernilai negatif ketika berada di kuadran III.)',
      'Jadi, nilai sin α = −3/5. (Jawaban C)',
    ],
    jebakan: 'Pilihan D, 3/5, lupa memberi tanda kuadran III. Pilihan B, −4/5, adalah nilai cos α, bukan sin α. Pilihan A, −3/4, memberi tanda negatif pada tan α, padahal tangen di kuadran III justru positif.',
    alasan: 'Segitiga acuan 3-4-5 memberi |sin α| = 3/5; di kuadran III sinus negatif: −3/5.',
  },
  {
    // cek: Math.abs((Math.sin(150*D) + Math.sin(120*D)) / (Math.cos(210*D) - Math.cos(300*D)) + 1) < 1e-9
    id: 'k47',
    tingkat: 'sangat sulit',
    pertanyaan: 'Nilai dari (sin 150° + sin 120°) : (cos 210° - cos 300°) adalah…',
    pilihan: ['2', '1', '0', '-1/2', '-1'],
    benar: 4,
    langkah: [
      {
        teks: 'Perhatikan bahwa keempat sudut itu bukan sudut istimewa lancip, sehingga masing-masing diubah ke sudut acuannya lewat sudut berelasi. Tanda tiap nilai mengikuti kuadrannya: 150° dan 120° di kuadran II (sinus positif), 210° di kuadran III (kosinus negatif), 300° di kuadran IV (kosinus positif), seperti bagan berikut.',
        gambar: { jenis: 'kuadran', sorot: 3, sudut: 210, label: '210°' },
      },
      'Untuk pembilang, sin 150° = sin(180° − 30°) = sin 30° = 1/2 dan sin 120° = sin(180° − 60°) = sin 60° = (1/2)√3, sehingga sin 150° + sin 120° = 1/2 + (1/2)√3 = (1/2)(1 + √3).',
      'Untuk penyebut, cos 210° = cos(180° + 30°) = −cos 30° = −(1/2)√3 dan cos 300° = cos(360° − 60°) = cos 60° = 1/2, sehingga cos 210° − cos 300° = −(1/2)√3 − 1/2 = −(1/2)(√3 + 1).',
      'Dengan demikian, hasil baginya adalah (1/2)(1 + √3) : (−(1/2)(1 + √3)) = −1, karena faktor (1/2)(1 + √3) pada pembilang dan penyebut saling mencoret.',
      'Jadi, nilai dari (sin 150° + sin 120°) : (cos 210° − cos 300°) adalah −1. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 1, lupa tanda negatif pada cos 210° (kuadran III). Pilihan C, 0, mengira cos 210° dan cos 300° sama besar sehingga penyebutnya nol, padahal yang satu memakai acuan 30° dan yang lain 60°.',
    alasan: 'Pembilang (1/2)(1 + √3), penyebut −(1/2)(1 + √3), hasilnya −1.',
  },
  {
    id: 'k48',
    tingkat: 'sangat sulit',
    pertanyaan: 'Jika sin 70° = p dan cos 70° = q, maka cos 110° · cot 160° + sin 200° =',
    pilihan: ['p - q', 'p + q', '2p', '2q', '2p - 2q'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa ketiga sudut yang ditanya dapat dihubungkan dengan 70° atau dengan 20° = 90° − 70°: 110° = 180° − 70°, 160° = 180° − 20°, dan 200° = 180° + 20°.',
      {
        teks: 'Pertama, cos 110° = cos(180° − 70°) = −cos 70° = −q. (Kosinus bernilai negatif di kuadran II.)',
        gambar: { jenis: 'kuadran', sorot: 2, sudut: 110, label: '110°' },
      },
      'Kedua, cot 160° = cot(180° − 20°) = −cot 20°. Karena 20° dan 70° berpenyiku, cot 20° = tan 70° = sin 70°/cos 70° = p/q, sehingga cot 160° = −p/q.',
      'Ketiga, sin 200° = sin(180° + 20°) = −sin 20°. Karena sin 20° = cos 70° = q, diperoleh sin 200° = −q.',
      'Substitusikan ketiganya: cos 110° · cot 160° + sin 200° = (−q)(−p/q) + (−q) = p − q.',
      'Jadi, nilai cos 110° · cot 160° + sin 200° = p − q. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, p + q, lupa tanda negatif pada sin 200° (kuadran III). Pilihan E, 2p − 2q, muncul bila cot 160° dihitung sebagai −2p/q karena sudut 160° keliru diacukan ke 70° alih-alih 20°.',
    alasan: 'cos 110° = −q, cot 160° = −p/q, sin 200° = −q; hasilnya p − q.',
  },
  {
    // cek: Math.abs(10*0.8*0.8 - 6.4) < 1e-9
    id: 'k49',
    tingkat: 'sangat sulit',
    pertanyaan: 'Segitiga ABC siku-siku di B, AC = 10 cm, dan cos ∠A = 0,8. Dari B ditarik garis tegak lurus ke AC, memotong AC di D. Panjang AD adalah…',
    gambar: { jenis: 'segitiga-umum', titik: ['A', 'B', 'C'], panjang: [8, 6, 10], sisi: ['', '', '10 cm'], siku: 1, tinggi: { dari: 1, kaki: 'D' }, sudut: [{ di: 0, label: 'A' }] },
    pilihan: ['4,8 cm', '6,0 cm', '6,4 cm', '8,0 cm', '3,6 cm'],
    benar: 2,
    langkah: [
      {
        teks: 'Pertama, tinjau segitiga ABC (siku-siku di B). Dilihat dari sudut A, AB adalah sisi samping dan AC sisi miring, sehingga cos A = AB/AC. Untuk itu, AB = AC cos A = 10 × 0,8 = 8 cm, dan dengan teorema Pythagoras BC = √(10² − 8²) = √36 = 6 cm, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'B', 'C'], panjang: [8, 6, 10], sisi: ['8 cm', '6 cm', '10 cm'], siku: 1, tinggi: { dari: 1, kaki: 'D' }, sudut: [{ di: 0, label: 'A' }], sorot: 0 },
      },
      {
        teks: 'Selanjutnya, tinjau segitiga ABD (siku-siku di D, karena BD tegak lurus AC). Sudut A pada segitiga ini sama dengan sudut A semula. Dilihat dari sudut A, AD adalah sisi samping dan AB sisi miring, sehingga cos A = AD/AB.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'D', 'B'], panjang: [6.4, 4.8, 8], sisi: ['?', '4,8 cm', '8 cm'], siku: 1, sudut: [{ di: 0, label: 'A' }], sorot: 0 },
      },
      'Untuk itu, AD = AB cos A = 8 × 0,8 = 6,4 cm.',
      'Secara ringkas, AD = AC cos A · cos A = AC cos² A = 10 × 0,64 = 6,4 cm: kosinus dipakai dua kali karena segitiganya bertingkat.',
      'Jadi, panjang AD adalah 6,4 cm. (Jawaban C)',
    ],
    jebakan: 'Pilihan D, 8,0 cm, berhenti pada AB, padahal yang ditanya AD di tingkat berikutnya. Pilihan A, 4,8 cm, adalah BD = AB sin A, garis tingginya, bukan AD. Pilihan E, 3,6 cm, adalah DC = 10 − 6,4, sisa ruas di sebelahnya.',
    alasan: 'AB = 10 cos A = 8; AD = AB cos A = 6,4 cm (kosinus dipakai dua kali).',
  },
  {
    // cek: Math.sin(3) < Math.sin(1) && Math.sin(1) < Math.sin(2)
    id: 'k50',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sudut 1, 2, dan 3 diukur dalam RADIAN. Urutan yang benar adalah…',
    pilihan: ['sin 1 < sin 2 < sin 3', 'sin 3 < sin 2 < sin 1', 'sin 1 < sin 3 < sin 2', 'sin 2 < sin 1 < sin 3', 'sin 3 < sin 1 < sin 2'],
    benar: 4,
    langkah: [
      'Ingat bahwa π rad = 180°, sehingga 1 rad ≈ 57,3°, 2 rad ≈ 114,6°, dan 3 rad ≈ 171,9°. Ketiganya berada di antara 0° dan 180°, jadi ketiga sinusnya positif.',
      'Dengan menggunakan sudut berelasi sin(180° − α) = sin α, diperoleh sin 2 = sin(114,6°) = sin(65,4°) dan sin 3 = sin(171,9°) = sin(8,1°), sedangkan sin 1 = sin(57,3°).',
      {
        teks: 'Pada selang 0° sampai 90° sinus naik, sehingga urutan ketiga sudut acuan 8,1° < 57,3° < 65,4° memberi sin 3 < sin 1 < sin 2, seperti terlihat pada grafik berikut.',
        gambar: { jenis: 'grafik', fungsi: ['Math.sin(x)'], jangkauan: [0, 3.5, -0.5, 1.5], titik: [{ x: 1, y: 0.841, label: 'sin 1' }, { x: 2, y: 0.909, label: 'sin 2' }, { x: 3, y: 0.141, label: 'sin 3' }] },
      },
      'Sebagai pemeriksaan dengan kalkulator, sin 1 ≈ 0,841, sin 2 ≈ 0,909, dan sin 3 ≈ 0,141.',
      'Jadi, urutan yang benar adalah sin 3 < sin 1 < sin 2. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, sin 1 < sin 2 < sin 3, mengira sinus terus naik seiring sudut membesar, padahal setelah 90° (≈ 1,57 rad) sinus turun. Pilihan B, sin 3 < sin 2 < sin 1, membaca 1, 2, 3 sebagai derajat.',
    alasan: '1, 2, 3 radian ≈ 57°, 115°, 172°; acuannya 57°, 65°, 8°: sin 3 < sin 1 < sin 2.',
  },
  {
    // cek: Math.abs(60/Math.tan(30*D) - 60/Math.tan(60*D) - 69.28) < 0.01
    id: 'k51',
    tingkat: 'sangat sulit',
    pertanyaan: 'Dari puncak gedung setinggi 60 m, dua mobil yang berada di satu sisi gedung dalam satu garis lurus terlihat dengan sudut depresi 60° dan 30°. Jarak kedua mobil kira-kira…',
    gambar: { jenis: 'svg', viewBox: '0 0 460 230', isi: '<line x1="30" y1="200" x2="440" y2="200" stroke="#8B8378" stroke-width="1.4"/><line x1="80" y1="200" x2="80" y2="60" stroke="#C25E4D" stroke-width="3"/><line x1="80" y1="60" x2="300" y2="60" stroke="#8B8378" stroke-width="1.2" stroke-dasharray="5 4"/><line x1="80" y1="60" x2="161" y2="200" stroke="#1F2430" stroke-width="1.6"/><line x1="80" y1="60" x2="322" y2="200" stroke="#1F2430" stroke-width="1.6"/><path d="M 120 60 A 40 40 0 0 1 100 95" fill="none" stroke="#6A4C93" stroke-width="1.8"/><path d="M 150 60 A 70 70 0 0 1 140 95" fill="none" stroke="#6A4C93" stroke-width="1.8"/><text x="104" y="82" font-size="11" fill="#6A4C93" font-family="var(--font-mono), sans-serif">60°</text><text x="150" y="84" font-size="11" fill="#6A4C93" font-family="var(--font-mono), sans-serif">30°</text><text x="60" y="134" font-size="12" fill="#C25E4D" font-family="var(--font-mono), sans-serif">60 m</text><circle cx="161" cy="200" r="5" fill="#3A6EA5"/><circle cx="322" cy="200" r="5" fill="#3A6EA5"/><text x="161" y="220" font-size="12" text-anchor="middle" fill="#3A6EA5" font-family="var(--font-mono), sans-serif">mobil 1</text><text x="322" y="220" font-size="12" text-anchor="middle" fill="#3A6EA5" font-family="var(--font-mono), sans-serif">mobil 2</text>' },
    pilihan: ['34,6 m', '60,0 m', '69,3 m', '103,9 m', '138,6 m'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa sudut depresi diukur dari garis mendatar di puncak gedung, dan garis mendatar itu sejajar dengan jalan, sehingga sudut elevasi dari tiap mobil ke puncak gedung sama dengan sudut depresinya: 60° untuk mobil yang dekat dan 30° untuk mobil yang jauh.',
      {
        teks: 'Pertama, tinjau segitiga siku-siku untuk mobil 1 (sudut 60°). Dengan definisi tangen, tan 60° = 60/d₁, sehingga d₁ = 60/tan 60° = 60/√3 = 20√3 ≈ 34,6 m.',
        gambar: { jenis: 'segitiga', sudut: 60, label: ['60 m', 'd₁ = 20√3 m', ''], namaSudut: '60°', sorot: 'samping' },
      },
      {
        teks: 'Selanjutnya, tinjau segitiga siku-siku untuk mobil 2 (sudut 30°). Dengan definisi tangen, tan 30° = 60/d₂, sehingga d₂ = 60/tan 30° = 60√3 ≈ 103,9 m.',
        gambar: { jenis: 'segitiga', sudut: 30, label: ['60 m', 'd₂ = 60√3 m', ''], namaSudut: '30°', sorot: 'samping' },
      },
      'Karena kedua mobil berada di sisi yang sama, jarak keduanya adalah selisih jarak masing-masing ke kaki gedung: d₂ − d₁ = 60√3 − 20√3 = 40√3 ≈ 40 × 1,732 ≈ 69,3 m.',
      'Jadi, jarak kedua mobil kira-kira 69,3 m. (Jawaban C)',
    ],
    jebakan: 'Pilihan D, 103,9 m, adalah jarak mobil 2 ke gedung, bukan jarak antar mobil. Pilihan A, 34,6 m, adalah jarak mobil 1 ke gedung. Pilihan E, 138,6 m, menjumlahkan kedua jarak, seolah-olah mobil berada di sisi gedung yang berlawanan.',
    alasan: 'd₂ − d₁ = 60√3 − 20√3 = 40√3 ≈ 69,3 m.',
  },
  {
    // cek: Math.abs(Math.sin(Math.atan(1/2))*Math.cos(Math.atan(1/2)) - 2/5) < 1e-9
    id: 'k67',
    tingkat: 'sangat sulit',
    pertanyaan: 'Jika tan α = 1/a dengan a > 0 dan α sudut lancip, maka nilai sin α · cos α = …',
    pilihan: ['a/(1 + a²)', '1/(1 + a²)', 'a²/(1 + a²)', 'a/√(1 + a²)', '1/a'],
    benar: 0,
    langkah: [
      'Diketahui tan α = 1/a dengan α lancip, sehingga bisa dianggap de = 1 dan sa = a (tan = de/sa).',
      {
        teks: 'Dengan menggunakan teorema Pythagoras, diperoleh mi = √(1² + a²) = √(1 + a²), seperti segitiga acuan berikut.',
        gambar: { jenis: 'segitiga', sudut: 27, label: ['1', 'a', '√(1 + a²)'], namaSudut: 'α', sorot: 'miring' },
      },
      'Untuk itu, sin α = de/mi = 1/√(1 + a²) dan cos α = sa/mi = a/√(1 + a²).',
      'Dengan demikian, sin α · cos α = (1/√(1 + a²)) · (a/√(1 + a²)) = a/(1 + a²), karena √(1 + a²) · √(1 + a²) = 1 + a².',
      'Sebagai pemeriksaan dengan angka, ambil a = 2: tan α = 1/2 memberi segitiga 1, 2, √5, sehingga sin α · cos α = (1/√5)(2/√5) = 2/5, dan rumus a/(1 + a²) = 2/5 juga.',
      'Jadi, nilai sin α · cos α = a/(1 + a²). (Jawaban A)',
    ],
    jebakan: 'Pilihan D, a/√(1 + a²), hanyalah cos α; perkalian dengan sin α membuat akarnya hilang. Pilihan C, a²/(1 + a²), adalah cos² α, dan pilihan B, 1/(1 + a²), adalah sin² α.',
    alasan: 'de = 1, sa = a, mi = √(1 + a²): sin α cos α = a/(1 + a²).',
  },
  {
    // cek: Math.abs(0.5 * 2*Math.cos(30*D) * Math.sin(30*D) - Math.sin(30*D)*Math.cos(30*D)) < 1e-9
    id: 'k68',
    tingkat: 'sangat sulit',
    pertanyaan: 'Pada lingkaran satuan berpusat O, titik P terletak pada sudut θ (lancip) dan titik Q pada sudut 180° − θ. Luas segitiga OPQ dinyatakan dalam θ adalah…',
    gambar: { jenis: 'lingkaran', sudut: 50, label: 'P' },
    pilihan: ['sin θ cos θ', '2 sin θ cos θ', '(1/2) sin θ cos θ', 'sin² θ', 'cos² θ'],
    benar: 0,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Titik P pada sudut θ berkoordinat (cos θ, sin θ), sedangkan titik Q pada sudut 180° − θ berkoordinat (cos(180° − θ), sin(180° − θ)) = (−cos θ, sin θ), yaitu cermin P terhadap sumbu-y.',
        gambar: { jenis: 'bidang', bangun: [[0, 0], [0.643, 0.766], [-0.643, 0.766]], labelBangun: ['O', 'P(cos θ, sin θ)', 'Q(-cos θ, sin θ)'], jangkauan: [-1.6, 1.6, -0.4, 1.4] },
      },
      'Tampak bahwa P dan Q sama tingginya, sehingga PQ mendatar dengan panjang PQ = cos θ − (−cos θ) = 2 cos θ.',
      'Tinggi segitiga OPQ dari titik O ke garis PQ adalah ordinat kedua titik itu, yaitu sin θ.',
      'Dengan menggunakan rumus luas segitiga, diperoleh L = (1/2) × PQ × tinggi = (1/2) × 2 cos θ × sin θ = sin θ cos θ.',
      'Jadi, luas segitiga OPQ adalah sin θ cos θ. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 2 sin θ cos θ, lupa faktor 1/2 pada rumus luas segitiga. Pilihan C, (1/2) sin θ cos θ, memakai alas cos θ, padahal PQ membentang dari −cos θ sampai cos θ, sehingga panjangnya 2 cos θ.',
    alasan: 'PQ = 2 cos θ, tinggi sin θ, luas = (1/2)(2 cos θ)(sin θ) = sin θ cos θ.',
  },
  {
    // cek: Math.abs(45 + 225 - 270) < 1e-9
    id: 'k54',
    tingkat: 'sangat sulit',
    pertanyaan: 'Jumlah semua sudut θ pada 0° ≤ θ < 360° yang memenuhi sin θ = cos θ adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.sin(x*Math.PI/180)', 'Math.cos(x*Math.PI/180)'], jangkauan: [0, 360, -1.5, 1.5], nama: ['y = sin θ', 'y = cos θ'] },
    pilihan: ['45°', '90°', '180°', '270°', '360°'],
    benar: 3,
    langkah: [
      'Perhatikan bahwa cos θ ≠ 0 untuk sudut yang memenuhi (kalau cos θ = 0, maka sin θ = ±1 ≠ 0), sehingga kedua ruas boleh dibagi cos θ: sin θ/cos θ = 1, yaitu tan θ = 1.',
      {
        teks: 'Tangen bernilai positif di kuadran I dan III. Sudut acuan dengan tan = 1 adalah 45°, sehingga penyelesaiannya θ = 45° (kuadran I) dan θ = 180° + 45° = 225° (kuadran III), seperti terlihat pada perpotongan kedua grafik berikut.',
        gambar: { jenis: 'grafik', fungsi: ['Math.sin(x*Math.PI/180)', 'Math.cos(x*Math.PI/180)'], jangkauan: [0, 360, -1.5, 1.5], titik: [{ x: 45, y: 0.707, label: '45°' }, { x: 225, y: -0.707, label: '225°' }], nama: ['y = sin θ', 'y = cos θ'] },
      },
      'Sebagai pemeriksaan, sin 45° = cos 45° = (1/2)√2 dan sin 225° = cos 225° = −(1/2)√2.',
      'Dengan demikian, jumlah semua sudut yang memenuhi adalah 45° + 225° = 270°.',
      'Jadi, jumlah semua sudut θ yang memenuhi sin θ = cos θ adalah 270°. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 45°, hanya mengambil satu penyelesaian; tangen berulang tiap 180°, sehingga 225° juga memenuhi. Pilihan C, 180°, menjumlahkan 45° dan 135°, padahal pada 135° nilai sin dan cos berlawanan tanda.',
    alasan: 'sin θ = cos θ berarti tan θ = 1: θ = 45° dan 225°, jumlahnya 270°.',
  },
  {
    // cek: Math.abs(Math.sin(120*D) - 0.866) < 0.001
    id: 'k55',
    tingkat: 'sangat sulit',
    pertanyaan: 'Jika sec θ = -2 dan θ berada di kuadran II, maka sin θ =',
    gambar: { jenis: 'lingkaran', sudut: 120, label: '(cos θ, sin θ)' },
    pilihan: ['-√3/2', '-1/2', '1/2', '√3/2', '2'],
    benar: 3,
    langkah: [
      'Ingat bahwa sec θ = 1/cos θ, sehingga cos θ = 1/sec θ = 1/(−2) = −1/2. Tanda negatif ini sesuai dengan kuadran II, tempat kosinus bernilai negatif dan sinus bernilai positif.',
      {
        teks: 'Karena |cos θ| = 1/2 dan cos = sa/mi, maka bisa dianggap bahwa sisi samping sudut acuannya 1 dan sisi miringnya 2. Dengan teorema Pythagoras, diperoleh de = √(2² − 1²) = √3, seperti segitiga acuan berikut.',
        gambar: { jenis: 'segitiga', sudut: 60, label: ['√3', '1', '2'], namaSudut: '60°', sorot: 'depan' },
      },
      'Untuk itu, sin θ = +de/mi = √3/2. (Sinus bernilai positif ketika sudut berada di kuadran II.) Sudutnya sendiri adalah θ = 180° − 60° = 120°.',
      'Jadi, nilai sin θ = √3/2. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, −√3/2, memberi tanda negatif pada sinus, padahal di kuadran II sinus positif; tanda negatif sekan hanya menandai kosinusnya. Pilihan B, −1/2, adalah cos θ. Pilihan E, 2, membaca sec θ seolah-olah nilai sinus.',
    alasan: 'cos θ = −1/2; segitiga acuan 1, √3, 2; di kuadran II sinus positif: √3/2.',
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
      'Perhatikan bahwa nilai terbesar sin(bx) adalah 1, sehingga nilai puncak y = a sin(bx) adalah a × 1 = a. Karena puncaknya bernilai 3, diperoleh a = 3.',
      'Ingat bahwa sin mencapai puncak pertamanya ketika sudutnya 90°. Puncak pertama terjadi pada x = 45°, sehingga haruslah b × 45° = 90°, yaitu b = 90°/45° = 2.',
      {
        teks: 'Sebagai pemeriksaan, y = 3 sin(2x) memberi y(45°) = 3 sin 90° = 3, dan periodenya 360°/2 = 180°, sehingga puncak berikutnya di 225°, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['3*Math.sin(2*x*Math.PI/180)'], jangkauan: [0, 360, -4, 4], titik: [{ x: 45, y: 3, label: '(45°, 3)' }, { x: 225, y: 3, label: '(225°, 3)' }], tegak: [180], datar: [3] },
      },
      'Jadi, nilai a dan b berturut-turut adalah 3 dan 2. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 3 dan 4, membagi 180° dengan 45°, seolah puncak pertama terjadi pada setengah periode; puncak pertama sinus ada pada seperempat periode. Pilihan D, 3 dan 1/2, membalik pecahan 90°/45°. Pilihan E membaca koordinat titik sebagai a dan b.',
    alasan: 'Puncak bernilai a = 3; sin puncak pertama saat bx = 90°, jadi b = 2.',
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
      {
        teks: 'Perhatikan bahwa 180° < 210° < 270°, sehingga 210° berada di kuadran III, tempat sinus bernilai negatif: kursi berada di bawah poros, seperti bagan berikut.',
        gambar: { jenis: 'kuadran', sorot: 3, sudut: 210, label: '210°' },
      },
      'Sudut 210° = 180° + 30°, sehingga dengan sudut berelasi sin(180° + α) = −sin α diperoleh sin 210° = −sin 30° = −1/2.',
      'Substitusikan ke rumus tinggi: h = 12 + 10 sin 210° = 12 + 10 × (−1/2) = 12 − 5 = 7 m.',
      'Jadi, tinggi kursi dari tanah saat θ = 210° adalah 7 m. (Jawaban B)',
    ],
    jebakan: 'Pilihan D, 17 m, lupa tanda negatif sin 210° sehingga kursi dianggap di atas poros. Pilihan A, 2 m, adalah titik terendah (θ = 270°, sin = −1), bukan pada 210°. Pilihan C, 12 m, mengira sinus 210° nol.',
    alasan: 'sin 210° = −1/2, jadi h = 12 − 5 = 7 m.',
  },
  {
    // cek: Math.abs(2.4/Math.sqrt(1 + 2.4*2.4) - 0.923) < 0.001
    id: 'k58',
    tingkat: 'sangat sulit',
    pertanyaan: 'Pada lingkaran satuan, jari-jari bersudut lancip θ diperpanjang sampai menabrak garis singgung x = 1. Ruas pada garis singgung itu panjangnya 2,4. Nilai sin θ kira-kira…',
    gambar: { jenis: 'svg', viewBox: '0 0 460 210', isi: '<line x1="80" y1="150" x2="290" y2="150" stroke="#8B8378" stroke-width="1.2"/><line x1="150" y1="200" x2="150" y2="20" stroke="#8B8378" stroke-width="1.2"/><circle cx="150" cy="150" r="45" fill="none" stroke="#1F2430" stroke-width="1.6"/><line x1="195" y1="200" x2="195" y2="25" stroke="#3A6EA5" stroke-width="1.6"/><line x1="150" y1="150" x2="195" y2="42" stroke="#1F2430" stroke-width="1.6"/><line x1="195" y1="150" x2="195" y2="42" stroke="#6A4C93" stroke-width="4"/><path d="M 168 150 A 18 18 0 0 0 157 134" fill="none" stroke="#6A4C93" stroke-width="1.8"/><text x="172" y="142" font-size="12" fill="#6A4C93" font-family="var(--font-mono), sans-serif">θ</text><text x="204" y="100" font-size="12" fill="#6A4C93" font-family="var(--font-mono), sans-serif">2,4</text><text x="204" y="166" font-size="11" fill="#3A6EA5" font-family="var(--font-mono), sans-serif">x = 1</text><text x="166" y="166" font-size="11" fill="#8B8378" font-family="var(--font-mono), sans-serif">1</text>' },
    pilihan: ['0,385', '0,417', '0,923', '0,960', '2,400'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa pusat lingkaran, titik singgung (1, 0), dan ujung ruas pada garis singgung membentuk segitiga siku-siku dengan siku di titik singgung. Sisi samping sudut θ adalah jari-jari sepanjang 1, dan sisi depannya adalah ruas pada garis singgung sepanjang 2,4.',
      'Dengan definisi tangen, tan θ = de/sa = 2,4/1 = 2,4. Inilah sebabnya ruas pada garis singgung itu disebut "tangen".',
      {
        teks: 'Karena tan θ = 2,4 = 12/5, maka bisa dianggap de = 12 dan sa = 5. Dengan teorema Pythagoras, diperoleh mi = √(12² + 5²) = √(144 + 25) = √169 = 13, seperti segitiga acuan berikut.',
        gambar: { jenis: 'segitiga', sudut: 67.4, label: ['12', '5', '13'], namaSudut: 'θ', sorot: 'miring' },
      },
      'Untuk itu, sin θ = de/mi = 12/13 ≈ 0,923.',
      'Jadi, nilai sin θ ≈ 0,923. (Jawaban C)',
    ],
    jebakan: 'Pilihan E, 2,400, adalah tan θ, bukan sin θ; ruas pada garis singgung memang tangen, dan sinus harus dihitung lagi dari segitiga acuannya. Pilihan A, 0,385, adalah cos θ = 5/13. Pilihan B, 0,417, adalah cot θ = 5/12.',
    alasan: 'Ruas pada garis singgung = tan θ = 2,4 = 12/5; segitiga 5-12-13 memberi sin θ = 12/13 ≈ 0,923.',
  },
  {
    id: 'k59',
    tingkat: 'sangat sulit',
    pertanyaan: 'Titik P berada di lingkaran satuan pada sudut θ. Titik Q diperoleh dengan memutar P seperempat putaran (90°) berlawanan arah jarum jam. Koordinat Q dinyatakan dalam θ adalah…',
    gambar: { jenis: 'lingkaran', sudut: 40, label: 'P (cos θ, sin θ)' },
    pilihan: ['(sin θ, cos θ)', '(-sin θ, cos θ)', '(cos θ, -sin θ)', '(-cos θ, -sin θ)', '(sin θ, -cos θ)'],
    benar: 1,
    langkah: [
      {
        teks: 'Perhatikan bahwa memutar P seperempat putaran berlawanan arah jarum jam berarti menambah sudutnya 90°, sehingga Q berada pada sudut θ + 90° dan berkoordinat (cos(θ + 90°), sin(θ + 90°)), seperti gambar berikut.',
        gambar: { jenis: 'lingkaran', sudut: 130, label: 'Q (cos(θ + 90°), sin(θ + 90°))', kaki: true },
      },
      'Dengan menggunakan hubungan sudut berelasi untuk 90° + θ, diperoleh cos(90° + θ) = −sin θ dan sin(90° + θ) = cos θ. (Kaki mendatar dan tegak segitiga bertukar peran, dan kaki mendatar Q mengarah ke kiri sehingga bertanda negatif.)',
      'Dengan demikian, Q = (−sin θ, cos θ).',
      'Sebagai pemeriksaan, ambil θ = 0°: P = (1, 0) dan Q seharusnya (0, 1), dan rumus memberi (−sin 0°, cos 0°) = (0, 1).',
      'Jadi, koordinat Q adalah (−sin θ, cos θ). (Jawaban B)',
    ],
    jebakan: 'Pilihan A, (sin θ, cos θ), hanya menukar koordinat tanpa memberi tanda negatif, padahal Q berada di kiri P. Pilihan E, (sin θ, −cos θ), adalah hasil putaran searah jarum jam (θ − 90°). Pilihan D adalah setengah putaran.',
    alasan: 'Q pada sudut θ + 90°: (cos(θ + 90°), sin(θ + 90°)) = (−sin θ, cos θ).',
  },
  {
    // cek: Math.abs((1.4*1.4 - 1)/2 - 0.48) < 1e-9
    id: 'k60',
    tingkat: 'sangat sulit',
    pertanyaan: 'Jika sin θ + cos θ = 1,4, maka sin θ · cos θ =',
    pilihan: ['0,24', '0,40', '0,48', '0,70', '0,96'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa yang ditanya hasil kali sin θ · cos θ, dan hasil kali itu muncul ketika jumlah sin θ + cos θ dikuadratkan.',
      'Kuadratkan kedua ruas: (sin θ + cos θ)² = 1,4², sehingga sin² θ + 2 sin θ cos θ + cos² θ = 1,96.',
      'Dengan menggunakan identitas Pythagoras sin² θ + cos² θ = 1, diperoleh 1 + 2 sin θ cos θ = 1,96, sehingga 2 sin θ cos θ = 0,96.',
      'Untuk itu, sin θ · cos θ = 0,96/2 = 0,48.',
      'Sebagai pemeriksaan, sin θ = 0,8 dan cos θ = 0,6 memenuhi jumlah 1,4, dan hasil kalinya memang 0,48.',
      'Jadi, nilai sin θ · cos θ = 0,48. (Jawaban C)',
    ],
    jebakan: 'Pilihan E, 0,96, lupa membagi 2 setelah mendapat 2 sin θ cos θ. Pilihan D, 0,70, membagi 1,4 dengan 2, seolah hasil kali sama dengan setengah jumlah. Pilihan B, 0,40, mengurangkan 1,4 − 1 tanpa mengkuadratkan.',
    alasan: 'Kuadratkan: 1 + 2 sin θ cos θ = 1,96, jadi sin θ cos θ = 0,48.',
  },
]
