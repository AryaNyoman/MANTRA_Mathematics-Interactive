import type { SoalKuis } from '@/content/tipe'

/**
 * Bank soal latihan Transformasi Geometri: 60 soal, 15 tiap tingkat
 * (14 Sep 2026).
 *
 * SEJARAH: bank pertama 16 soal (4 per tingkat, id tg-<nama>), dikalibrasi
 * ke Uji Kompetensi Bab 4 Matematika Tingkat Lanjut Kelas XI. 13 Sep ARYA
 * meminta 15 soal per tingkat, syarat naik 10 benar, pembahasan bernomor
 * bergambar, dan penjelasan pengecoh. Id lama DIPERTAHANKAN; soal baru
 * tg-m05..m15 (mudah), tg-s05..s15 (sedang), tg-l05..l15 (sulit),
 * tg-x05..x15 (sangat sulit).
 *
 * EMPAT TINGKAT BERBEDA CARA BERPIKIR, bukan cuma beda angka:
 *   mudah        satu aturan, satu titik, pusat atau cerminnya di titik asal
 *   sedang       pusat atau garis cerminnya BUKAN di titik asal, faktor
 *                negatif atau pecahan
 *   sulit        dua langkah, arah dibalik (yang dicari aturannya), garis
 *                yang ditranslasi, membaca matriks
 *   sangat sulit yang ditransformasikan garis atau kurva, komposisi yang
 *                dirangkum jadi satu, mencari prapeta; 5 bergaya olimpiade
 *                dan 10 sulit-biasa
 *
 * Koordinat ditulis (x, y). Tiap jawaban berangka punya `// cek:` yang
 * menghitung ulang hasilnya dengan aturan transformasi.
 */
export const KUIS: SoalKuis[] = [
  /* ---------------------------- mudah ---------------------------- */
  {
    // cek: 1 + 3 === 4 && 2 + 4 === 6
    id: 'tg-translasi-dasar',
    tingkat: 'mudah',
    pertanyaan: 'Titik (1, 2) ditranslasikan oleh vektor (3, 4). Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[1, 2]], labelBangun: ['A(1, 2)'], jangkauan: [-1, 6, -1, 8] },
    pilihan: ['(4, 6)', '(-2, -2)', '(3, 8)', '(4, 2)', '(3, 4)'],
    benar: 0,
    langkah: [
      'Translasi = geser: tiap koordinat DITAMBAH komponen vektornya.',
      'x: 1 + 3 = 4. y: 2 + 4 = 6.',
      'Petanya (4, 6).',
    ],
    jebakan: '(3, 8) mengalikan, bukan menjumlahkan. (3, 4) adalah vektor geserannya sendiri, yang memang tertulis di soal dan karena itu terasa akrab.',
    alasan: 'Dijumlahkan: (4, 6).',
  },
  {
    // cek: -3 === -3 && -7 === -7
    id: 'tg-cermin-sumbu-x',
    tingkat: 'mudah',
    pertanyaan: 'Titik (-3, 7) dicerminkan pada sumbu-x. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[-3, 7]], labelBangun: ['A(-3, 7)'], cermin: 'x', jangkauan: [-5, 2, -8, 8] },
    pilihan: ['(3, 7)', '(3, -7)', '(-3, -7)', '(7, -3)', '(-7, -3)'],
    benar: 2,
    langkah: [
      'Sumbu-x adalah garis MENDATAR, jadi bayangan berpindah TEGAK: yang berubah nilai y.',
      'y = 7 menjadi -7; x tetap -3.',
      'Petanya (-3, -7).',
    ],
    jebakan: '(3, 7) menggoda karena nama "sumbu-x" membuat kita mengubah x. Justru sebaliknya: cermin pada garis mendatar mengubah yang tegak.',
    alasan: 'Tanda y berbalik: (-3, -7).',
  },
  {
    // cek: -0 === 0 && 2 === 2
    id: 'tg-rotasi-90-dasar',
    tingkat: 'mudah',
    pertanyaan: 'Titik (2, 0) diputar 90 derajat berlawanan arah jarum jam terhadap titik asal. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[2, 0]], labelBangun: ['A(2, 0)'], pusat: [0, 0], jangkauan: [-3, 3, -3, 3] },
    pilihan: ['(0, -2)', '(0, 2)', '(-2, 0)', '(2, 0)', '(-2, 2)'],
    benar: 1,
    langkah: [
      'Aturan rotasi 90 derajat berlawanan jarum jam berpusat O: (x, y) menjadi (-y, x).',
      '(2, 0) menjadi (-0, 2) = (0, 2).',
      'Tanpa rumus: titiknya di sumbu-x positif sejauh 2; seperempat putaran berlawanan jarum jam mendaratkannya di sumbu-y positif.',
    ],
    jebakan: '(0, -2) adalah hasil memutar SEARAH jarum jam. (-2, 0) memutar 180 derajat.',
    alasan: '(x, y) ke (-y, x): (0, 2).',
  },
  {
    // cek: -6 === -6 && -1 === -1
    id: 'tg-cermin-sumbu-y',
    tingkat: 'mudah',
    pertanyaan: 'Titik (6, -1) dicerminkan pada sumbu-y. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[6, -1]], labelBangun: ['A(6, -1)'], cermin: 'y', jangkauan: [-7, 7, -3, 2] },
    pilihan: ['(6, 1)', '(-6, 1)', '(-1, 6)', '(-6, -1)', '(1, -6)'],
    benar: 3,
    langkah: [
      'Sumbu-y adalah garis TEGAK, jadi bayangan berpindah MENDATAR: yang berubah nilai x.',
      'x = 6 menjadi -6; y tetap -1. Petanya (-6, -1).',
    ],
    jebakan: '(-6, 1) mengubah kedua tanda sekaligus karena terasa "lebih rapi"; yang diubah hanya satu.',
    alasan: 'Tanda x berbalik: (-6, -1).',
  },
  {
    // cek: 3 === 3 && 2 === 2
    id: 'tg-m05',
    tingkat: 'mudah',
    pertanyaan: 'Titik (3, -2) dicerminkan pada sumbu-x. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[3, -2]], labelBangun: ['A(3, -2)'], cermin: 'x', jangkauan: [-1, 5, -3, 3] },
    pilihan: ['(3, 2)', '(-3, -2)', '(-3, 2)', '(-2, 3)', '(3, -2)'],
    benar: 0,
    langkah: [
      'Cermin pada sumbu-x: x tetap, y berbalik tanda.',
      '(3, -2) menjadi (3, 2).',
    ],
    jebakan: '(-3, -2) mengubah x, tertukar dengan cermin sumbu-y. (3, -2) mengira titik di bawah sumbu tidak berpindah.',
    alasan: '(3, 2).',
  },
  {
    // cek: 5 - 2 === 3 && 4 + 3 === 7
    id: 'tg-m06',
    tingkat: 'mudah',
    pertanyaan: 'Titik (5, 4) ditranslasikan oleh vektor (-2, 3). Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[5, 4]], labelBangun: ['A(5, 4)'], jangkauan: [-1, 7, -1, 8] },
    pilihan: ['(3, 7)', '(7, 1)', '(-10, 12)', '(3, 1)', '(7, 7)'],
    benar: 0,
    langkah: [
      'Komponen pertama negatif: geser 2 ke KIRI. Komponen kedua positif: geser 3 ke ATAS.',
      'x: 5 - 2 = 3. y: 4 + 3 = 7. Petanya (3, 7).',
    ],
    jebakan: '(7, 1) membalik tanda kedua komponen (mengurangkan vektornya). (-10, 12) mengalikan.',
    alasan: '(3, 7).',
  },
  {
    // cek: -3 === -3 && 0 === 0
    id: 'tg-m07',
    tingkat: 'mudah',
    pertanyaan: 'Titik (0, 3) diputar 90 derajat berlawanan arah jarum jam terhadap titik asal. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[0, 3]], labelBangun: ['A(0, 3)'], pusat: [0, 0], jangkauan: [-4, 4, -4, 4] },
    pilihan: ['(-3, 0)', '(3, 0)', '(0, -3)', '(3, 3)', '(0, 3)'],
    benar: 0,
    langkah: [
      'Aturan (x, y) menjadi (-y, x): (0, 3) menjadi (-3, 0).',
      'Tanpa rumus: dari sumbu-y positif, seperempat putaran berlawanan jarum jam mendarat di sumbu-x NEGATIF.',
    ],
    jebakan: '(3, 0) memutar searah jarum jam. Bayangkan jarum jam: dari angka 12 berlawanan arah menuju angka 9, yaitu kiri.',
    alasan: '(-3, 0).',
  },
  {
    // cek: 1 === 1 && -4 === -4
    id: 'tg-m08',
    tingkat: 'mudah',
    pertanyaan: 'Titik (-1, -4) dicerminkan pada sumbu-y. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[-1, -4]], labelBangun: ['A(-1, -4)'], cermin: 'y', jangkauan: [-3, 3, -5, 1] },
    pilihan: ['(1, -4)', '(-1, 4)', '(1, 4)', '(-4, -1)', '(-1, -4)'],
    benar: 0,
    langkah: [
      'Cermin pada sumbu-y (garis tegak): x berbalik tanda, y tetap.',
      '(-1, -4) menjadi (1, -4).',
    ],
    jebakan: '(-1, 4) mengubah y, tertukar dengan sumbu-x. (1, 4) mengubah keduanya, itu cermin pada titik asal.',
    alasan: '(1, -4).',
  },
  {
    // cek: 2 * 2 === 4 && 2 * 3 === 6
    id: 'tg-m09',
    tingkat: 'mudah',
    pertanyaan: 'Titik (2, 3) didilatasi dengan pusat titik asal dan faktor 2. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[2, 3]], labelBangun: ['A(2, 3)'], pusat: [0, 0], jangkauan: [-1, 6, -1, 8] },
    pilihan: ['(4, 6)', '(4, 5)', '(1, 1,5)', '(2, 6)', '(4, 3)'],
    benar: 0,
    langkah: [
      'Dilatasi berpusat O: tiap koordinat DIKALI faktornya.',
      '(2 × 2, 3 × 2) = (4, 6). Titiknya menjauh dari O sampai dua kali jaraknya.',
    ],
    jebakan: '(4, 5) menjumlahkan 2, kebiasaan dari translasi. (1, 1,5) membagi, yaitu faktor setengah.',
    alasan: '(4, 6).',
  },
  {
    // cek: -4 === -4 && 1 === 1
    id: 'tg-m10',
    tingkat: 'mudah',
    pertanyaan: 'Titik (4, -1) diputar 180 derajat terhadap titik asal. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[4, -1]], labelBangun: ['A(4, -1)'], pusat: [0, 0], jangkauan: [-5, 5, -3, 3] },
    pilihan: ['(-4, 1)', '(4, 1)', '(-4, -1)', '(1, -4)', '(-1, 4)'],
    benar: 0,
    langkah: [
      'Rotasi 180 derajat berpusat O: kedua koordinat berbalik tanda, (x, y) menjadi (-x, -y).',
      '(4, -1) menjadi (-4, 1). Ini sama dengan cermin pada titik O.',
    ],
    jebakan: '(4, 1) atau (-4, -1) hanya membalik satu tanda; itu cermin pada satu sumbu, bukan setengah putaran.',
    alasan: '(-4, 1).',
  },
  {
    // cek: 5 === 5 && 2 === 2
    id: 'tg-m11',
    tingkat: 'mudah',
    pertanyaan: 'Titik (2, 5) dicerminkan pada garis y = x. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[2, 5]], labelBangun: ['A(2, 5)'], cermin: 'y=x', jangkauan: [-1, 6, -1, 6] },
    pilihan: ['(5, 2)', '(-2, -5)', '(-5, -2)', '(2, -5)', '(5, -2)'],
    benar: 0,
    langkah: [
      'Cermin pada y = x menukar peran x dan y, tanda tidak disentuh.',
      '(2, 5) menjadi (5, 2).',
    ],
    jebakan: '(-5, -2) menukar DAN membalik tanda; itu cermin pada garis y = -x.',
    alasan: 'Ditukar: (5, 2).',
  },
  {
    id: 'tg-m12',
    tingkat: 'mudah',
    pertanyaan: 'Titik A dipindahkan oleh sebuah transformasi ke titik A\'. Titik A disebut ...',
    pilihan: ['prapeta', 'peta', 'bayangan', 'pusat', 'vektor'],
    benar: 0,
    langkah: [
      'Yang dipindahkan (asalnya) disebut PRAPETA; hasilnya disebut PETA atau bayangan.',
      'Awalan "pra" berarti "sebelum": prapeta = sebelum dipetakan.',
    ],
    jebakan: '"Bayangan" dan "peta" nama untuk hasilnya (A\'), bukan asalnya.',
    alasan: 'A prapeta, A\' peta.',
  },
  {
    id: 'tg-m13',
    tingkat: 'mudah',
    pertanyaan: 'Translasi oleh vektor manakah yang membiarkan setiap titik tetap di tempatnya?',
    pilihan: ['(0, 0)', '(1, 1)', '(1, 0)', '(0, 1)', 'tidak ada'],
    benar: 0,
    langkah: [
      'Translasi menambahkan komponen vektor ke tiap koordinat.',
      'Supaya tidak ada yang berubah, kedua komponen harus 0: vektor (0, 0).',
    ],
    jebakan: '(1, 1) menggeser satu satuan ke kanan atas; "1" terasa netral pada perkalian, tetapi translasi memakai penjumlahan.',
    alasan: 'Vektor nol.',
  },
  {
    // cek: -3 === -3 && 5 === 5
    id: 'tg-m14',
    tingkat: 'mudah',
    pertanyaan: 'Titik (3, -5) dicerminkan pada titik asal O. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[3, -5]], labelBangun: ['A(3, -5)'], pusat: [0, 0], jangkauan: [-4, 4, -6, 6] },
    pilihan: ['(-3, 5)', '(-3, -5)', '(3, 5)', '(-5, 3)', '(5, -3)'],
    benar: 0,
    langkah: [
      'Cermin pada titik: pusatnya tepat di tengah antara titik dan bayangannya. Untuk pusat O, kedua koordinat berbalik tanda.',
      '(3, -5) menjadi (-3, 5). Sama dengan rotasi 180 derajat.',
    ],
    jebakan: '(-3, -5) hanya membalik x; itu cermin sumbu-y, bukan cermin titik.',
    alasan: '(-3, 5).',
  },
  {
    // cek: 2 === 2 && 2 === 2
    id: 'tg-m15',
    tingkat: 'mudah',
    pertanyaan: 'Titik (2, 2) dicerminkan pada garis y = x. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[2, 2]], labelBangun: ['A(2, 2)'], cermin: 'y=x', jangkauan: [-1, 4, -1, 4] },
    pilihan: ['(2, 2)', '(-2, -2)', '(-2, 2)', '(2, -2)', '(0, 0)'],
    benar: 0,
    langkah: [
      'Titik (2, 2) TERLETAK pada garis y = x (x-nya sama dengan y-nya).',
      'Titik yang berada tepat di cermin tidak berpindah: petanya (2, 2) juga. Aturan tukar memberi hal yang sama.',
    ],
    jebakan: '(-2, -2) membalik tanda tanpa alasan; cermin y = x tidak mengubah tanda. Titik di cerminnya sendiri selalu tetap.',
    alasan: 'Di cermin: tetap (2, 2).',
  },

  /* ---------------------------- sedang ---------------------------- */
  {
    // cek: 6 === 6 && -4 === -4
    id: 'tg-cermin-y-sama-x',
    tingkat: 'sedang',
    pertanyaan: 'Titik (-4, 6) dicerminkan pada garis y = x. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[-4, 6]], labelBangun: ['A(-4, 6)'], cermin: 'y=x', jangkauan: [-6, 7, -5, 7] },
    pilihan: ['(4, -6)', '(-6, 4)', '(-4, -6)', '(6, -4)', '(4, 6)'],
    benar: 3,
    langkah: [
      'Cermin pada y = x menukar kedua koordinat; tanda ikut pindah BERSAMA angkanya.',
      '(-4, 6) menjadi (6, -4).',
    ],
    jebakan: '(4, -6) menukar lalu membalik tanda pula; itu aturan garis y = -x. Untuk y = x tandanya tidak disentuh.',
    alasan: 'Ditukar utuh: (6, -4).',
  },
  {
    // cek: -2 * 3 === -6 && 5 * 3 === 15
    id: 'tg-dilatasi-pusat-asal',
    tingkat: 'sedang',
    pertanyaan: 'Titik (-2, 5) didilatasi dengan pusat titik asal dan faktor 3. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[-2, 5]], labelBangun: ['A(-2, 5)'], pusat: [0, 0], jangkauan: [-8, 2, -1, 17] },
    pilihan: ['(-6, 15)', '(1, 8)', '(-6, 5)', '(-5, 2)', '(6, -15)'],
    benar: 0,
    langkah: [
      'Dilatasi berpusat O: kedua koordinat dikali faktornya.',
      '(-2 × 3, 5 × 3) = (-6, 15).',
    ],
    jebakan: '(1, 8) menjumlahkan 3, kebiasaan yang terbawa dari translasi. (6, -15) membalik tanda, seolah faktornya -3.',
    alasan: '(-6, 15).',
  },
  {
    // cek: 2 * 3 - 5 === 1
    id: 'tg-cermin-garis-datar',
    tingkat: 'sedang',
    pertanyaan: 'Titik (2, 5) dicerminkan pada garis y = 3. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[2, 5]], labelBangun: ['A(2, 5)'], cermin: 'y=3', jangkauan: [-1, 5, -1, 7] },
    pilihan: ['(2, -5)', '(2, 1)', '(2, 8)', '(2, 2)', '(2, -1)'],
    benar: 1,
    langkah: [
      'Garis y = 3 mendatar: x tetap 2, yang berubah y.',
      'Jarak titik ke cermin: 5 - 3 = 2. Bayangan 2 satuan di SEBERANG: 3 - 2 = 1.',
      'Rumus cepat: y\' = 2k - y = 6 - 5 = 1. Petanya (2, 1).',
    ],
    jebakan: '(2, 2) mengurangi 3 dari 5, dan (2, 8) menambahkannya; keduanya lupa jaraknya dihitung dulu lalu dipantulkan dari garisnya. (2, -5) memakai cermin sumbu-x.',
    alasan: '2 × 3 - 5 = 1.',
  },
  {
    // cek: 2 * 2 - 5 === -1 && 2 * 1 - 3 === -1
    id: 'tg-rotasi-180-berpusat',
    tingkat: 'sedang',
    pertanyaan: 'Titik (5, 3) diputar 180 derajat terhadap titik (2, 1). Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[5, 3]], labelBangun: ['A(5, 3)'], pusat: [2, 1], jangkauan: [-3, 7, -3, 5] },
    pilihan: ['(-5, -3)', '(-1, 1)', '(1, -1)', '(9, 5)', '(-1, -1)'],
    benar: 4,
    langkah: [
      'Rotasi 180 derajat = cermin pada pusatnya: pusat tepat di TENGAH titik dan bayangannya.',
      'x\' = 2 × 2 - 5 = -1. y\' = 2 × 1 - 3 = -1.',
      'Periksa: titik tengah (5, 3) dan (-1, -1) adalah (2, 1). Cocok.',
    ],
    jebakan: '(-5, -3) memakai rumus pusat di titik asal, padahal pusatnya (2, 1). (9, 5) bergerak menjauhi pusat, bukan melewatinya.',
    alasan: '2 × pusat - titik: (-1, -1).',
  },
  {
    // cek: 2 * 5 - 3 === 7 && 1 === 1
    id: 'tg-s05',
    tingkat: 'sedang',
    pertanyaan: 'Titik (3, 1) dicerminkan pada garis x = 5. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[3, 1]], labelBangun: ['A(3, 1)'], cermin: 'x=5', jangkauan: [-1, 9, -1, 4] },
    pilihan: ['(7, 1)', '(-3, 1)', '(8, 1)', '(2, 1)', '(3, 9)'],
    benar: 0,
    langkah: [
      'Garis x = 5 tegak: y tetap 1, yang berubah x.',
      'Jarak ke cermin: 5 - 3 = 2. Bayangan 2 satuan di seberang: 5 + 2 = 7.',
      'Rumus: x\' = 2 × 5 - 3 = 7. Petanya (7, 1).',
    ],
    jebakan: '(-3, 1) memakai cermin sumbu-y (garis x = 0), lupa cerminnya di x = 5. (8, 1) menambahkan 5 ke 3.',
    alasan: '2 × 5 - 3 = 7.',
  },
  {
    // cek: -4 === -4 && 2 === 2
    id: 'tg-s06',
    tingkat: 'sedang',
    pertanyaan: 'Titik (-2, 4) dicerminkan pada garis y = -x. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[-2, 4]], labelBangun: ['A(-2, 4)'], cermin: 'y=-x', jangkauan: [-5, 5, -5, 5] },
    pilihan: ['(-4, 2)', '(4, -2)', '(2, -4)', '(-2, -4)', '(4, 2)'],
    benar: 0,
    langkah: [
      'Cermin pada y = -x: tukar koordinat DAN balik kedua tanda: (x, y) menjadi (-y, -x).',
      '(-2, 4) menjadi (-4, 2).',
    ],
    jebakan: '(4, -2) hanya menukar (aturan y = x). (2, -4) hanya membalik tanda tanpa menukar.',
    alasan: '(-y, -x) = (-4, 2).',
  },
  {
    // cek: 2 + 3 * (6 - 2) === 14 && 1 + 3 * (1 - 1) === 1
    id: 'tg-s07',
    tingkat: 'sedang',
    pertanyaan: 'Titik (6, 1) didilatasi dengan pusat (2, 1) dan faktor 3. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[6, 1]], labelBangun: ['A(6, 1)'], pusat: [2, 1], jangkauan: [-1, 16, -2, 4] },
    pilihan: ['(14, 1)', '(18, 3)', '(12, 3)', '(14, 3)', '(8, 1)'],
    benar: 0,
    langkah: [
      'Ukur dari pusatnya: (6 - 2, 1 - 1) = (4, 0).',
      'Kalikan faktornya: (12, 0).',
      'Kembalikan ke pusatnya: (2 + 12, 1 + 0) = (14, 1).',
    ],
    jebakan: '(18, 3) mengalikan koordinat langsung, seolah pusatnya O. (14, 3) mengalikan y juga padahal jarak tegaknya ke pusat 0.',
    alasan: 'Ukur dari pusat, kali 3, kembalikan: (14, 1).',
  },
  {
    // cek: 2 + (-(1 - 3)) === 4 && 3 + (1 - 2) === 2
    id: 'tg-s08',
    tingkat: 'sedang',
    pertanyaan: 'Titik (1, 1) diputar 90 derajat berlawanan arah jarum jam terhadap titik (2, 3). Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[1, 1]], labelBangun: ['A(1, 1)'], pusat: [2, 3], jangkauan: [-2, 6, -1, 5] },
    pilihan: ['(4, 2)', '(-1, 1)', '(0, 4)', '(3, 0)', '(1, 3)'],
    benar: 0,
    langkah: [
      'Ukur dari pusat: (1 - 2, 1 - 3) = (-1, -2).',
      'Putar 90 berlawanan jarum jam, (x, y) menjadi (-y, x): (-1, -2) menjadi (2, -1).',
      'Kembalikan: (2 + 2, 3 - 1) = (4, 2).',
    ],
    jebakan: '(-1, 1) memutar terhadap O, bukan terhadap (2, 3). (0, 4) memutar searah jarum jam: (-1, -2) menjadi (-2, 1), lalu dikembalikan.',
    alasan: 'Tiga langkah: (4, 2).',
  },
  {
    // cek: 2 * 1 - (-2) === 4
    id: 'tg-s09',
    tingkat: 'sedang',
    pertanyaan: 'Titik (4, -2) dicerminkan pada garis y = 1. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[4, -2]], labelBangun: ['A(4, -2)'], cermin: 'y=1', jangkauan: [-1, 6, -4, 5] },
    pilihan: ['(4, 4)', '(4, 2)', '(4, 3)', '(4, -4)', '(-4, -2)'],
    benar: 0,
    langkah: [
      'Jarak titik ke garis y = 1: dari -2 ke 1 sejauh 3.',
      'Bayangan 3 satuan di atas garis: 1 + 3 = 4. Rumus: 2 × 1 - (-2) = 4.',
      'Petanya (4, 4).',
    ],
    jebakan: '(4, 2) hanya membalik tanda y (cermin sumbu-x). Tanda minus pada -2 sering membuat jaraknya dihitung 1, padahal 3.',
    alasan: '2 × 1 + 2 = 4.',
  },
  {
    // cek: 3 * -2 === -6 && 2 * -2 === -4
    id: 'tg-s10',
    tingkat: 'sedang',
    pertanyaan: 'Titik (3, 2) didilatasi dengan pusat titik asal dan faktor -2. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[3, 2]], labelBangun: ['A(3, 2)'], pusat: [0, 0], jangkauan: [-7, 5, -5, 4] },
    pilihan: ['(-6, -4)', '(6, 4)', '(1, 0)', '(-3, -2)', '(6, -4)'],
    benar: 0,
    langkah: [
      'Faktor negatif: bayangan diperbesar 2 kali DAN berpindah ke seberang pusat.',
      '(3 × -2, 2 × -2) = (-6, -4).',
    ],
    jebakan: '(6, 4) mengabaikan tanda minus. (-3, -2) hanya membalik (faktor -1), lupa memperbesar.',
    alasan: '(-6, -4).',
  },
  {
    // cek: 5 - 3 === 2 && 2 - 7 === -5
    id: 'tg-s11',
    tingkat: 'sedang',
    pertanyaan: 'Sebuah translasi memetakan titik (3, 7) ke titik (5, 2). Vektor translasinya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[3, 7]], bayangan: [[5, 2]], labelBangun: ['A(3, 7)'], labelBayangan: ['A\'(5, 2)'], jangkauan: [-1, 7, -1, 9] },
    pilihan: ['(2, -5)', '(-2, 5)', '(8, 9)', '(2, 5)', '(-2, -5)'],
    benar: 0,
    langkah: [
      'Vektor = peta dikurangi prapeta.',
      '(5 - 3, 2 - 7) = (2, -5): dua ke kanan, lima ke bawah.',
      'Periksa maju: (3 + 2, 7 - 5) = (5, 2). Cocok.',
    ],
    jebakan: '(-2, 5) membalik pengurangannya (prapeta dikurangi peta). (8, 9) menjumlahkan keduanya.',
    alasan: 'Peta dikurangi prapeta: (2, -5).',
  },
  {
    // cek: 2 * 1 - 2 === 0 && 2 * 1 - (-3) === 5
    id: 'tg-s12',
    tingkat: 'sedang',
    pertanyaan: 'Titik (2, -3) diputar 180 derajat terhadap titik (1, 1). Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[2, -3]], labelBangun: ['A(2, -3)'], pusat: [1, 1], jangkauan: [-3, 4, -4, 6] },
    pilihan: ['(0, 5)', '(-2, 3)', '(0, -5)', '(3, -4)', '(-1, 4)'],
    benar: 0,
    langkah: [
      'Rotasi 180: pusat di tengah. x\' = 2 × 1 - 2 = 0, y\' = 2 × 1 - (-3) = 5.',
      'Periksa: titik tengah (2, -3) dan (0, 5) adalah (1, 1). Cocok.',
    ],
    jebakan: '(-2, 3) memakai pusat O. (0, -5) salah tanda pada pengurangan -3.',
    alasan: '(0, 5).',
  },
  {
    // cek: 5 * 0.5 === 2.5 && 2 * 0.5 === 1
    id: 'tg-s13',
    tingkat: 'sedang',
    pertanyaan: 'Titik (5, 2) didilatasi dengan pusat titik asal dan faktor 1/2. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[5, 2]], labelBangun: ['A(5, 2)'], pusat: [0, 0], jangkauan: [-1, 7, -1, 4] },
    pilihan: ['(2,5; 1)', '(10, 4)', '(4,5; 1,5)', '(2, 1)', '(5, 1)'],
    benar: 0,
    langkah: [
      'Faktor antara 0 dan 1: bayangan MENDEKAT ke pusat, ukurannya mengecil.',
      '(5 × 1/2, 2 × 1/2) = (2,5; 1).',
    ],
    jebakan: '(10, 4) membagi dengan 1/2 (sama dengan mengali 2). (4,5; 1,5) mengurangi 1/2, kebiasaan translasi.',
    alasan: '(2,5; 1).',
  },
  {
    // cek: 4 === 4 && -3 === -3
    id: 'tg-s14',
    tingkat: 'sedang',
    pertanyaan: 'Titik (3, 4) diputar 90 derajat SEARAH jarum jam terhadap titik asal. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[3, 4]], labelBangun: ['A(3, 4)'], pusat: [0, 0], jangkauan: [-5, 5, -5, 5] },
    pilihan: ['(4, -3)', '(-4, 3)', '(-3, -4)', '(4, 3)', '(-3, 4)'],
    benar: 0,
    langkah: [
      'Searah jarum jam = -90 derajat: aturannya (x, y) menjadi (y, -x).',
      '(3, 4) menjadi (4, -3).',
      'Periksa arah: titik di kuadran I; diputar searah jarum jam seperempat putaran jatuh ke kuadran IV (x positif, y negatif). Cocok.',
    ],
    jebakan: '(-4, 3) memakai aturan berlawanan jarum jam. Perhatikan kata "searah" di soal.',
    alasan: '(y, -x) = (4, -3).',
  },
  {
    // cek: 2 * 2 - 5 === -1 && 2 * -1 - 3 === -5
    id: 'tg-s15',
    tingkat: 'sedang',
    pertanyaan: 'Titik (5, 3) dicerminkan pada titik (2, -1). Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[5, 3]], labelBangun: ['A(5, 3)'], pusat: [2, -1], jangkauan: [-3, 7, -7, 5] },
    pilihan: ['(-1, -5)', '(-5, -3)', '(9, 7)', '(-1, 5)', '(3, 4)'],
    benar: 0,
    langkah: [
      'Cermin pada titik: pusat di tengah. x\' = 2 × 2 - 5 = -1, y\' = 2 × (-1) - 3 = -5.',
      'Petanya (-1, -5). Periksa: titik tengah (5, 3) dan (-1, -5) adalah (2, -1).',
    ],
    jebakan: '(-5, -3) memakai pusat O. (3, 4) adalah selisih titik ke pusat, baru setengah jalan.',
    alasan: '(-1, -5).',
  },

  /* ---------------------------- sulit ---------------------------- */
  {
    // cek: -4 + 2 === -2 && 1 - 3 === -2
    id: 'tg-komposisi-cermin-translasi',
    tingkat: 'sulit',
    pertanyaan: 'Titik (4, 1) dicerminkan pada sumbu-y, lalu hasilnya ditranslasikan oleh vektor (2, -3). Peta akhirnya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[4, 1]], labelBangun: ['A(4, 1)'], cermin: 'y', jangkauan: [-7, 6, -4, 3] },
    pilihan: ['(-4, 1)', '(-6, -2)', '(-2, -2)', '(6, -2)', '(-2, 4)'],
    benar: 2,
    langkah: [
      'Langkah 1, cermin sumbu-y: (4, 1) menjadi (-4, 1).',
      'Langkah 2, translasi (2, -3): (-4 + 2, 1 - 3) = (-2, -2).',
    ],
    jebakan: '(-4, 1) berhenti di langkah pertama, kekeliruan paling sering pada soal dua langkah. (-6, -2) membalik urutan: translasi dulu (6, -2), baru cermin.',
    alasan: 'Urut: (-2, -2).',
  },
  {
    // cek: 2 - (-3) === 5 && 1 - 8 === -7
    id: 'tg-cari-vektor-translasi',
    tingkat: 'sulit',
    pertanyaan: 'Sebuah translasi memetakan titik (-3, 8) ke titik (2, 1). Vektor translasinya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[-3, 8]], bayangan: [[2, 1]], labelBangun: ['A(-3, 8)'], labelBayangan: ['A\'(2, 1)'], jangkauan: [-5, 4, -1, 10] },
    pilihan: ['(-5, 7)', '(5, -7)', '(5, 7)', '(-1, 9)', '(-5, -7)'],
    benar: 1,
    langkah: [
      'Arahnya dibalik: yang dicari aturannya. Vektor = peta dikurangi prapeta.',
      '(2 - (-3), 1 - 8) = (5, -7).',
      'Periksa maju: (-3 + 5, 8 - 7) = (2, 1). Cocok.',
    ],
    jebakan: '(-5, 7) membalik pengurangan. Tanda minus pada -3 sering tertelan: 2 - (-3) = 5, bukan -1.',
    alasan: '(5, -7).',
  },
  {
    // cek: 0 === 0 && 1 === 1
    id: 'tg-kolom-matriks',
    tingkat: 'sulit',
    pertanyaan: 'Matriks yang mewakili pencerminan pada garis y = x memetakan titik (1, 0) ke ...',
    gambar: { jenis: 'bidang', bangun: [[1, 0]], labelBangun: ['(1, 0)'], cermin: 'y=x', jangkauan: [-2, 2, -2, 2] },
    pilihan: ['(1, 0)', '(0, 1)', '(-1, 0)', '(0, -1)', '(1, 1)'],
    benar: 1,
    langkah: [
      'Cermin y = x menukar koordinat: (1, 0) menjadi (0, 1).',
      'Jawaban ini sekaligus KOLOM PERTAMA matriksnya (materi 09): kolom pertama = tempat mendaratnya (1, 0). Kolom kedua = tempat mendaratnya (0, 1), yaitu (1, 0). Matriksnya baris (0, 1) dan (1, 0).',
    ],
    jebakan: '(1, 0) mengira titik itu "sudah di garisnya"; (1, 0) tidak terletak pada y = x (1 tidak sama dengan 0).',
    alasan: '(0, 1), kolom pertama matriks.',
  },
  {
    // cek: 1 + (-(-2 - -2)) === 1 && -2 + (3 - 1) === 0
    id: 'tg-rotasi-90-berpusat',
    tingkat: 'sulit',
    pertanyaan: 'Titik (3, -2) diputar 90 derajat berlawanan arah jarum jam terhadap titik (1, -2). Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[3, -2]], labelBangun: ['A(3, -2)'], pusat: [1, -2], jangkauan: [-2, 5, -4, 2] },
    pilihan: ['(2, 1)', '(1, 0)', '(3, 0)', '(-1, -2)', '(1, -4)'],
    benar: 1,
    langkah: [
      'Ukur dari pusat: (3 - 1, -2 - (-2)) = (2, 0).',
      'Putar 90 berlawanan jarum jam: (2, 0) menjadi (0, 2).',
      'Kembalikan: (1 + 0, -2 + 2) = (1, 0).',
    ],
    jebakan: '(2, 1) memutar terhadap O. (1, -4) memutar searah jarum jam.',
    alasan: 'Tiga langkah: (1, 0).',
  },
  {
    // cek: 2 + 1 === 3 && 5 - 1 === 4 && 4 === 4 && 3 === 3
    id: 'tg-l05',
    tingkat: 'sulit',
    pertanyaan: 'Titik (2, 5) ditranslasikan oleh (1, -1), lalu hasilnya dicerminkan pada garis y = x. Peta akhirnya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[2, 5]], labelBangun: ['A(2, 5)'], cermin: 'y=x', jangkauan: [-1, 7, -1, 7] },
    pilihan: ['(4, 3)', '(3, 4)', '(6, 1)', '(5, 2)', '(1, 6)'],
    benar: 0,
    langkah: [
      'Langkah 1, translasi: (2 + 1, 5 - 1) = (3, 4).',
      'Langkah 2, cermin y = x: tukar, (4, 3).',
    ],
    jebakan: '(3, 4) berhenti di langkah pertama. (6, 1) membalik urutan: cermin dulu (5, 2), lalu translasi.',
    alasan: '(4, 3).',
  },
  {
    // cek: -4 === -4 && -1 === -1
    id: 'tg-l06',
    tingkat: 'sulit',
    pertanyaan: 'Titik (1, 4) diputar 90 derajat berlawanan arah jarum jam terhadap titik asal, lalu hasilnya dicerminkan pada sumbu-x. Peta akhirnya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[1, 4]], labelBangun: ['A(1, 4)'], pusat: [0, 0], cermin: 'x', jangkauan: [-5, 5, -5, 5] },
    pilihan: ['(-4, -1)', '(-4, 1)', '(4, 1)', '(1, -4)', '(-1, 4)'],
    benar: 0,
    langkah: [
      'Langkah 1, rotasi: (1, 4) menjadi (-4, 1).',
      'Langkah 2, cermin sumbu-x: y berbalik tanda, (-4, -1).',
    ],
    jebakan: '(-4, 1) berhenti di rotasi. (4, 1) membalik urutan: cermin dulu (1, -4), lalu rotasi memberi (4, 1).',
    alasan: '(-4, -1).',
  },
  {
    // cek: (1 + 5) / 2 === 3 && (2 + 0) / 2 === 1
    id: 'tg-l07',
    tingkat: 'sulit',
    pertanyaan: 'Rotasi 180 derajat memetakan titik (1, 2) ke titik (5, 0). Pusat rotasinya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[1, 2]], bayangan: [[5, 0]], labelBangun: ['A(1, 2)'], labelBayangan: ['A\'(5, 0)'], jangkauan: [-1, 7, -2, 4] },
    pilihan: ['(3, 1)', '(0, 0)', '(6, 2)', '(4, -2)', '(2, 1)'],
    benar: 0,
    langkah: [
      'Pada rotasi 180, pusat selalu tepat di TENGAH titik dan bayangannya.',
      'Titik tengah (1, 2) dan (5, 0): ((1 + 5) : 2, (2 + 0) : 2) = (3, 1).',
    ],
    jebakan: '(0, 0) mengira pusat selalu titik asal; kalau pusatnya O, (1, 2) akan ke (-1, -2). (6, 2) menjumlahkan tanpa membagi dua.',
    alasan: 'Titik tengah: (3, 1).',
  },
  {
    // cek: 2 * -3 === -6 && -3 * -3 === 9
    id: 'tg-l08',
    tingkat: 'sulit',
    pertanyaan: 'Dilatasi berpusat titik asal dengan faktor k memetakan titik (2, -3) ke titik (-6, 9). Nilai k adalah ...',
    gambar: { jenis: 'bidang', bangun: [[2, -3]], bayangan: [[-6, 9]], labelBangun: ['A(2, -3)'], labelBayangan: ['A\'(-6, 9)'], pusat: [0, 0], jangkauan: [-7, 4, -4, 10] },
    pilihan: ['-3', '3', '-1/3', '1/3', '-8'],
    benar: 0,
    langkah: [
      'Dilatasi berpusat O: peta = k × prapeta. Jadi k = -6 : 2 = -3.',
      'Periksa koordinat kedua: -3 × (-3) = 9. Cocok.',
    ],
    jebakan: '3 mengabaikan tanda: bayangannya ada di SEBERANG pusat (kuadran berlawanan), tanda minus itulah yang membawanya ke sana. -8 mengurangkan (-6 - 2).',
    alasan: 'k = -6 : 2 = -3.',
  },
  {
    // cek: (1 + 7) / 2 === 4
    id: 'tg-l09',
    tingkat: 'sulit',
    pertanyaan: 'Pencerminan pada garis x = a memetakan titik (1, 4) ke titik (7, 4). Nilai a adalah ...',
    gambar: { jenis: 'bidang', bangun: [[1, 4]], bayangan: [[7, 4]], labelBangun: ['A(1, 4)'], labelBayangan: ['A\'(7, 4)'], jangkauan: [-1, 9, -1, 6] },
    pilihan: ['4', '6', '3', '8', '7'],
    benar: 0,
    langkah: [
      'Cermin tegak berada tepat di tengah antara titik dan bayangannya (mendatar).',
      'a = (1 + 7) : 2 = 4. Periksa: 2 × 4 - 1 = 7. Cocok.',
    ],
    jebakan: '6 adalah JARAK titik ke bayangan, bukan letak cerminnya. 3 adalah jarak titik ke cermin.',
    alasan: 'a = (1 + 7)/2 = 4.',
  },
  {
    // cek: (0 - 3) + 2 === (0 - 1)
    id: 'tg-l10',
    tingkat: 'sulit',
    pertanyaan: 'Garis y = x + 2 ditranslasikan oleh vektor (3, 1). Persamaan petanya adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['x + 2'], jangkauan: [-4, 5, -3, 6], nama: ['y = x + 2'] },
    pilihan: ['y = x', 'y = x + 6', 'y = x + 3', 'y = 4x + 3', 'y = x - 2'],
    benar: 0,
    langkah: [
      'Ambil titik (x, y) pada PETA. Ia berasal dari (x - 3, y - 1) pada garis semula.',
      'Masukkan: y - 1 = (x - 3) + 2, jadi y = x.',
      'Periksa dengan satu titik: (0, 2) pada garis semula digeser jadi (3, 3), dan (3, 3) memang memenuhi y = x.',
    ],
    jebakan: 'y = x + 6 menjumlahkan kedua komponen vektor ke tetapannya; geser ke kanan 3 justru MENURUNKAN tetapan (dikurangi 3), geser ke atas 1 menaikkannya. Kemiringan tidak berubah oleh translasi.',
    alasan: 'y - 1 = x - 3 + 2: y = x.',
  },
  {
    id: 'tg-l11',
    tingkat: 'sulit',
    pertanyaan: 'Matriks rotasi 90 derajat berlawanan arah jarum jam berpusat titik asal adalah ...',
    pilihan: [
      'baris pertama (0, -1), baris kedua (1, 0)',
      'baris pertama (0, 1), baris kedua (-1, 0)',
      'baris pertama (1, 0), baris kedua (0, -1)',
      'baris pertama (0, 1), baris kedua (1, 0)',
      'baris pertama (-1, 0), baris kedua (0, -1)',
    ],
    benar: 0,
    langkah: [
      'Cara membaca matriks (materi 09): kolom pertama = tempat mendaratnya (1, 0), kolom kedua = tempat mendaratnya (0, 1).',
      'Rotasi 90 berlawanan jarum jam: (1, 0) ke (0, 1), dan (0, 1) ke (-1, 0).',
      'Kolom pertama (0, 1), kolom kedua (-1, 0). Ditulis per baris: baris pertama (0, -1), baris kedua (1, 0).',
    ],
    jebakan: 'Pilihan kedua adalah rotasi 90 SEARAH jarum jam. Pilihan keempat cermin y = x, pilihan ketiga cermin sumbu-x, pilihan kelima rotasi 180.',
    alasan: 'Kolom (0, 1) dan (-1, 0).',
  },
  {
    id: 'tg-l12',
    tingkat: 'sulit',
    pertanyaan: 'Matriks dengan baris pertama (2, 0) dan baris kedua (0, 2) mewakili transformasi ...',
    pilihan: ['dilatasi pusat O faktor 2', 'translasi (2, 2)', 'rotasi 180 derajat', 'cermin pada garis y = 2', 'dilatasi pusat O faktor 4'],
    benar: 0,
    langkah: [
      'Kalikan dengan titik (x, y): baris pertama 2x + 0y = 2x, baris kedua 0x + 2y = 2y.',
      '(x, y) menjadi (2x, 2y): kedua koordinat dikali 2, itulah dilatasi berpusat O faktor 2.',
    ],
    jebakan: 'Translasi tidak bisa ditulis sebagai matriks 2 × 2 (materi 10: "satu yang tidak ada di daftar"). Faktor 4 keliru membaca dua angka 2 sebagai perkalian.',
    alasan: '(x, y) ke (2x, 2y).',
  },
  {
    // cek: 10 === 10
    id: 'tg-l13',
    tingkat: 'sulit',
    pertanyaan: 'Sebuah segitiga berluas 10 satuan dicerminkan pada sumbu-y, lalu diputar 90 derajat terhadap titik asal. Luas petanya adalah ...',
    pilihan: ['10 satuan', '20 satuan', '-10 satuan', '40 satuan', '5 satuan'],
    benar: 0,
    langkah: [
      'Cermin dan rotasi mempertahankan JARAK antara dua titik (materi 08), jadi bentuk dan ukurannya tidak berubah.',
      'Luasnya tetap 10 satuan, berapa pun banyak langkahnya.',
    ],
    jebakan: '20 mengira dua transformasi menggandakan luas. Yang mengubah luas hanya dilatasi; cermin, translasi, dan rotasi hanya memindahkan.',
    alasan: 'Luas tetap 10.',
  },
  {
    // cek: 1 + 2 * (3 - 1) === 5 && 2 + 2 * (5 - 2) === 8
    id: 'tg-l14',
    tingkat: 'sulit',
    pertanyaan: 'Titik (3, 5) didilatasi dengan pusat (1, 2) dan faktor 2. Petanya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[3, 5]], labelBangun: ['A(3, 5)'], pusat: [1, 2], jangkauan: [-1, 8, -1, 10] },
    pilihan: ['(5, 8)', '(6, 10)', '(4, 6)', '(7, 12)', '(2, 3)'],
    benar: 0,
    langkah: [
      'Ukur dari pusat: (3 - 1, 5 - 2) = (2, 3).',
      'Kalikan 2: (4, 6).',
      'Kembalikan: (1 + 4, 2 + 6) = (5, 8).',
    ],
    jebakan: '(6, 10) mengalikan koordinat langsung (pusat O). (4, 6) lupa dikembalikan ke pusatnya. (2, 3) baru langkah pertama.',
    alasan: '(5, 8).',
  },
  {
    // cek: -1 + 3 === 2 && 2 + 3 === 5
    id: 'tg-l15',
    tingkat: 'sulit',
    pertanyaan: 'Titik (2, 1) diputar 90 derajat berlawanan arah jarum jam terhadap titik asal, lalu ditranslasikan oleh (3, 3). Peta akhirnya adalah ...',
    gambar: { jenis: 'bidang', bangun: [[2, 1]], labelBangun: ['A(2, 1)'], pusat: [0, 0], jangkauan: [-3, 6, -1, 6] },
    pilihan: ['(2, 5)', '(-1, 2)', '(-4, 5)', '(5, 4)', '(4, -5)'],
    benar: 0,
    langkah: [
      'Rotasi: (2, 1) menjadi (-1, 2).',
      'Translasi: (-1 + 3, 2 + 3) = (2, 5).',
    ],
    jebakan: '(-1, 2) berhenti di rotasi. (-4, 5) membalik urutan: translasi dulu (5, 4), lalu rotasi.',
    alasan: '(2, 5).',
  },

  /* ------------------------ sangat sulit ------------------------ */
  {
    // cek: 1 === 1 && 3 === 3
    id: 'tg-gabungan-jadi-satu',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah titik dicerminkan pada sumbu-x, lalu diputar 90 derajat berlawanan arah jarum jam terhadap titik asal. Gabungan kedua langkah itu sama dengan satu transformasi tunggal, yaitu ...',
    gambar: { jenis: 'bidang', bangun: [[3, 1]], labelBangun: ['P(3, 1)'], cermin: 'x', pusat: [0, 0], jangkauan: [-2, 4, -2, 4] },
    pilihan: ['cermin pada garis y = x', 'cermin pada garis y = -x', 'rotasi 90 derajat terhadap titik asal', 'rotasi 180 derajat terhadap titik asal', 'cermin pada sumbu-y'],
    benar: 0,
    langkah: [
      'Coba pada satu titik, misalnya (3, 1). Cermin sumbu-x: (3, -1). Rotasi 90: (1, 3).',
      'Koordinatnya bertukar tempat tanpa berubah tanda: ciri cermin pada garis y = x.',
      'Lewat matriks: matriks rotasi dikali matriks cermin sumbu-x memang menghasilkan matriks cermin y = x (baris (0, 1) dan (1, 0)).',
    ],
    jebakan: 'Cermin y = -x adalah jawaban untuk urutan yang DIBALIK (rotasi dulu, baru cermin), jebakan utama materi 11.',
    alasan: '(3, 1) ke (1, 3): cermin y = x.',
  },
  {
    // cek: -(2 * 0 + 3) === -3
    id: 'tg-cermin-garis-persamaan',
    tingkat: 'sangat sulit',
    pertanyaan: 'Garis y = 2x + 3 dicerminkan pada sumbu-x. Persamaan petanya adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['2*x + 3'], jangkauan: [-4, 3, -6, 6], nama: ['y = 2x + 3'] },
    pilihan: ['y = 2x - 3', 'y = -2x + 3', 'y = -2x - 3', 'y = 2x + 3', 'y = 0,5x + 3'],
    benar: 2,
    langkah: [
      'Yang ditransformasikan garis, bukan titik. Ambil (x, y) pada PETA; ia berasal dari (x, -y) pada garis semula.',
      'Masukkan: -y = 2x + 3, jadi y = -2x - 3. Kedua tandanya berubah.',
      'Periksa: (0, 3) pada garis semula seharusnya jadi (0, -3), dan hanya y = -2x - 3 yang melewatinya.',
    ],
    jebakan: 'y = -2x + 3 hanya mengubah kemiringan; y = 2x - 3 hanya tetapannya. Cermin sumbu-x membalik SELURUH nilai y, jadi seluruh ruas kanan berganti tanda.',
    alasan: '-y = 2x + 3.',
  },
  {
    // cek: 12 * (-3) * (-3) === 108
    id: 'tg-luas-dilatasi',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah segitiga berluas 12 satuan didilatasi dengan faktor -3. Luas petanya adalah ...',
    pilihan: ['36 satuan', '-108 satuan', '4 satuan', '108 satuan', '-36 satuan'],
    benar: 3,
    langkah: [
      'Dilatasi mengalikan setiap PANJANG dengan |k| = 3.',
      'Luas ditentukan dua panjang sekaligus (alas dan tinggi), jadi luas dikali k² = 9.',
      '12 × 9 = 108 satuan.',
    ],
    jebakan: '36 mengalikan luas dengan faktornya saja, kekeliruan paling sering. Luas tidak pernah negatif; tanda minus hanya membalik letak bayangan ke seberang pusat.',
    alasan: '12 × (-3)² = 108.',
  },
  {
    id: 'tg-urutan-boleh-dibalik',
    tingkat: 'sangat sulit',
    pertanyaan: 'Pada pasangan transformasi manakah hasilnya TETAP SAMA walaupun urutan pengerjaannya dibalik?',
    pilihan: [
      'translasi (2, 1) dan translasi (-3, 4)',
      'cermin sumbu-x dan rotasi 90 derajat terhadap titik asal',
      'cermin garis y = x dan translasi (1, 0)',
      'rotasi 90 derajat terhadap titik asal dan rotasi 90 derajat terhadap (1, 1)',
      'dilatasi faktor 2 terhadap titik asal dan translasi (3, 0)',
    ],
    benar: 0,
    langkah: [
      'Dua translasi selalu boleh dibalik: hasilnya penjumlahan kedua vektor, dan penjumlahan tidak peduli urutan.',
      'Uji pilihan terakhir pada (1, 0): dilatasi lalu geser memberi (5, 0); geser lalu dilatasi memberi (8, 0). Berbeda.',
      'Dua rotasi boleh dibalik hanya kalau PUSATNYA sama; pilihan keempat pusatnya berbeda.',
    ],
    jebakan: 'Pilihan ketiga: uji (1, 0). Cermin lalu geser memberi (1, 1); geser lalu cermin memberi (0, 2). Berbeda. Pilihan kedua adalah jebakan utama materi 11: hasilnya cermin y = x atau cermin y = -x bergantung urutan.',
    alasan: 'Dua translasi: jumlah vektor, urutan bebas.',
  },
  {
    // cek: 2 * (-2) + 4 === 0 && 2 * 0 + 4 === 4
    id: 'tg-x05',
    tingkat: 'sangat sulit',
    pertanyaan: 'Garis 2x + y = 4 dicerminkan pada sumbu-y. Persamaan petanya adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['4 - 2*x'], jangkauan: [-4, 4, -3, 8], nama: ['2x + y = 4'] },
    pilihan: ['y = 2x + 4', 'y = -2x - 4', 'y = -2x + 4', 'y = 2x - 4', 'x + 2y = 4'],
    benar: 0,
    langkah: [
      'Ambil (x, y) pada peta; asalnya (-x, y) pada garis semula.',
      'Masukkan: 2(-x) + y = 4, jadi y = 2x + 4.',
      'Periksa: titik (2, 0) pada garis semula jadi (-2, 0); pada y = 2x + 4 memang 2(-2) + 4 = 0. Titik (0, 4) di sumbu-y tidak berpindah, dan kedua garis memang melewatinya.',
    ],
    jebakan: 'y = -2x + 4 adalah garis SEMULA yang ditulis ulang; cermin sumbu-y membalik kemiringan dari -2 menjadi 2, bukan membiarkannya.',
    alasan: '2(-x) + y = 4.',
  },
  {
    id: 'tg-x06',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah titik dicerminkan pada garis y = x, lalu hasilnya dicerminkan pada sumbu-x. Gabungan keduanya sama dengan satu transformasi tunggal, yaitu ...',
    pilihan: ['rotasi 90 derajat searah jarum jam terhadap titik asal', 'rotasi 90 derajat berlawanan arah jarum jam terhadap titik asal', 'cermin pada garis y = -x', 'rotasi 180 derajat', 'cermin pada sumbu-y'],
    benar: 0,
    langkah: [
      'Uji pada (x, y): cermin y = x memberi (y, x); cermin sumbu-x memberi (y, -x).',
      '(x, y) menjadi (y, -x) adalah aturan rotasi 90 derajat SEARAH jarum jam.',
      'Periksa pada (1, 0): jadi (0, 1) lalu (0, -1); memang (1, 0) diputar searah jarum jam mendarat di (0, -1).',
    ],
    jebakan: 'Rotasi berlawanan jarum jam adalah hasil urutan DIBALIK (sumbu-x dulu, baru y = x): (x, -y) lalu (-y, x). Dua cermin selalu menghasilkan rotasi, arahnya bergantung urutan.',
    alasan: '(x, y) ke (y, -x): rotasi -90.',
  },
  {
    id: 'tg-x07',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kurva y = x² dicerminkan pada garis y = x. Persamaan petanya adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['x*x', 'x'], jangkauan: [-3, 5, -3, 5], nama: ['y = x²', 'y = x'] },
    pilihan: ['x = y²', 'y = -x²', 'y = x²', 'x = -y²', 'y = akar x'],
    benar: 0,
    langkah: [
      'Cermin y = x menukar peran x dan y pada persamaannya.',
      'y = x² menjadi x = y²: parabola yang terbuka ke kanan.',
      'Periksa: (2, 4) pada kurva semula jadi (4, 2); pada x = y², 4 = 2². Cocok.',
    ],
    jebakan: 'y = akar x hanya SEPARUH petanya (cabang y positif); cabang (4, -2) juga ada, sebab (-2, 4) juga pada kurva semula. y = -x² adalah cermin sumbu-x.',
    alasan: 'Tukar x dan y: x = y².',
  },
  {
    // cek: -1 + 2 * 0 + 1 === 0 && -3 + 2 * 1 + 1 === 0
    id: 'tg-x08',
    tingkat: 'sangat sulit',
    pertanyaan: 'Garis y = 2x + 1 diputar 90 derajat berlawanan arah jarum jam terhadap titik asal. Persamaan petanya adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['2*x + 1'], jangkauan: [-4, 4, -4, 4], nama: ['y = 2x + 1'] },
    pilihan: ['x + 2y + 1 = 0', 'y = -2x + 1', '2x - y + 1 = 0', 'x - 2y - 1 = 0', 'y = 2x - 1'],
    benar: 0,
    langkah: [
      'Rotasi 90: (u, v) menjadi (-v, u). Ambil (x, y) pada peta: x = -v dan y = u, jadi asalnya (u, v) = (y, -x).',
      'Asal itu ada di garis semula: -x = 2y + 1, jadi x + 2y + 1 = 0.',
      'Periksa: (0, 1) pada garis semula diputar jadi (-1, 0); pada x + 2y + 1 = 0, -1 + 0 + 1 = 0. Cocok. Kemiringannya -1/2, tegak lurus kemiringan semula 2, seperti seharusnya untuk putaran 90.',
    ],
    jebakan: 'y = -2x + 1 hanya membalik tanda kemiringan (itu cermin, bukan rotasi). Rotasi 90 membuat garis TEGAK LURUS garis semula: kemiringannya harus -1/2, dan hanya pilihan pertama yang begitu.',
    alasan: 'Asal (y, -x): -x = 2y + 1.',
  },
  {
    // cek: 2 * 3 - 3 === 3 && 2 * (3*3) - 3*3 === 9
    id: 'tg-x09',
    tingkat: 'sangat sulit',
    pertanyaan: 'Garis 2x - y = 3 didilatasi dengan pusat titik asal dan faktor 3. Persamaan petanya adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['2*x - 3'], jangkauan: [-2, 8, -4, 14], nama: ['2x - y = 3'] },
    pilihan: ['2x - y = 9', '6x - 3y = 3', '2x - y = 3', '2x - y = 1', '6x - y = 9'],
    benar: 0,
    langkah: [
      'Ambil (x, y) pada peta; asalnya (x/3, y/3).',
      'Masukkan: 2(x/3) - y/3 = 3, kalikan 3: 2x - y = 9.',
      'Periksa: (2, 1) pada garis semula (4 - 1 = 3) jadi (6, 3); 12 - 3 = 9. Cocok. Garisnya sejajar garis semula (kemiringan tetap 2), hanya menjauh dari O.',
    ],
    jebakan: '6x - 3y = 3 mengalikan koefisien x dan y, padahal yang dikali 3 adalah KOORDINAT, sehingga yang berubah justru tetapannya. 2x - y = 1 membagi tetapan (faktor 1/3).',
    alasan: 'Asal (x/3, y/3): 2x - y = 9.',
  },
  {
    id: 'tg-x10',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah titik dicerminkan pada sumbu-x, lalu dicerminkan pada sumbu-y. Gabungan keduanya sama dengan ...',
    pilihan: ['rotasi 180 derajat terhadap titik asal', 'cermin pada garis y = x', 'rotasi 90 derajat berlawanan arah jarum jam', 'cermin pada garis y = -x', 'tidak ada transformasi tunggal yang setara'],
    benar: 0,
    langkah: [
      '(x, y) menjadi (x, -y) lalu (-x, -y): kedua tanda berbalik.',
      'Itu rotasi 180 derajat (atau cermin pada titik O). Urutan dibalik pun hasilnya sama, sebab kedua cermin saling tegak lurus.',
    ],
    jebakan: 'Cermin y = x atau y = -x MENUKAR koordinat; di sini tidak ada yang tertukar, hanya tanda yang berbalik.',
    alasan: '(x, y) ke (-x, -y).',
  },
  {
    // cek: 6 * 2 * 2 === 24
    id: 'tg-x11',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah segitiga berluas 6 satuan diputar 90 derajat terhadap titik asal, lalu didilatasi dengan pusat O dan faktor 2. Luas petanya adalah ...',
    pilihan: ['24 satuan', '12 satuan', '6 satuan', '48 satuan', '18 satuan'],
    benar: 0,
    langkah: [
      'Rotasi tidak mengubah luas: masih 6.',
      'Dilatasi faktor 2 mengalikan luas dengan 2² = 4: 6 × 4 = 24 satuan.',
    ],
    jebakan: '12 mengalikan dengan faktornya saja. 48 mengira rotasi 90 juga menggandakan luas (2 × 2 × 2 × 6), padahal rotasi hanya memutar.',
    alasan: '6 × 2² = 24.',
  },
  {
    id: 'tg-x12',
    tingkat: 'sangat sulit',
    pertanyaan: 'Transformasi T memetakan (1, 0) ke (0, 1) dan memetakan (0, 1) ke (-1, 0). Transformasi T adalah ...',
    pilihan: ['rotasi 90 derajat berlawanan arah jarum jam terhadap O', 'cermin pada garis y = x', 'rotasi 90 derajat searah jarum jam terhadap O', 'cermin pada garis y = -x', 'rotasi 180 derajat terhadap O'],
    benar: 0,
    langkah: [
      'Kedua keterangan itu adalah KOLOM matriks T (materi 09): kolom pertama (0, 1), kolom kedua (-1, 0).',
      'Matriks baris (0, -1) dan (1, 0) adalah matriks rotasi 90 derajat berlawanan jarum jam.',
      'Tanpa matriks: (1, 0) di sumbu-x positif naik ke sumbu-y positif, dan (0, 1) turun ke sumbu-x negatif; keduanya berputar seperempat putaran ke arah yang sama, berlawanan jarum jam.',
    ],
    jebakan: 'Cermin y = x memang membawa (1, 0) ke (0, 1), tetapi ia membawa (0, 1) KEMBALI ke (1, 0), bukan ke (-1, 0). Satu titik uji tidak cukup; keduanya harus cocok.',
    alasan: 'Kolom (0, 1) dan (-1, 0): rotasi 90.',
  },
  {
    id: 'tg-x13',
    tingkat: 'sangat sulit',
    pertanyaan: 'Garis y = 3 dicerminkan pada garis y = x. Persamaan petanya adalah ...',
    gambar: { jenis: 'grafik', fungsi: ['3', 'x'], jangkauan: [-1, 5, -1, 5], nama: ['y = 3', 'y = x'] },
    pilihan: ['x = 3', 'y = -3', 'y = 3', 'x = -3', 'y = x + 3'],
    benar: 0,
    langkah: [
      'Cermin y = x menukar x dan y dalam persamaannya: y = 3 menjadi x = 3.',
      'Bentuknya: garis mendatar setinggi 3 dipantulkan menjadi garis tegak di x = 3. Titik (3, 3), perpotongannya dengan cermin, tidak berpindah.',
    ],
    jebakan: 'y = -3 memakai cermin sumbu-x. Garis mendatar yang dicerminkan pada garis miring 45 derajat berubah jadi garis TEGAK, bukan mendatar lagi.',
    alasan: 'Tukar: x = 3.',
  },
  {
    // cek: -3 === -3 && 4 === 4
    id: 'tg-x14',
    tingkat: 'sangat sulit',
    pertanyaan: 'Rotasi 90 derajat berlawanan arah jarum jam terhadap titik asal memetakan titik P ke (-3, 4). Koordinat P adalah ...',
    gambar: { jenis: 'bidang', bangun: [[-3, 4]], labelBangun: ['P\'(-3, 4)'], pusat: [0, 0], jangkauan: [-5, 5, -5, 5] },
    pilihan: ['(4, 3)', '(-4, -3)', '(3, -4)', '(-4, 3)', '(4, -3)'],
    benar: 0,
    langkah: [
      'Yang dicari PRAPETA: putar balik. Kebalikan rotasi 90 berlawanan jarum jam adalah rotasi 90 searah jarum jam: (x, y) menjadi (y, -x).',
      '(-3, 4) menjadi (4, 3).',
      'Periksa maju: (4, 3) diputar berlawanan jarum jam, (x, y) ke (-y, x), memberi (-3, 4). Cocok.',
    ],
    jebakan: '(-4, -3) memutar (-3, 4) berlawanan jarum jam sekali lagi, seolah soalnya maju; itu memberi titik yang berjarak 180 derajat dari P. Selalu periksa maju.',
    alasan: 'Putar balik: (4, 3).',
  },
  {
    // cek: 5 - 3 === 2 && 1 + 2 === 3
    id: 'tg-x15',
    tingkat: 'sangat sulit',
    pertanyaan: 'Titik P ditranslasikan oleh (3, -2), lalu hasilnya dicerminkan pada garis y = x, dan peta akhirnya (1, 5). Koordinat P adalah ...',
    gambar: { jenis: 'bidang', bangun: [[1, 5]], labelBangun: ['P\'\'(1, 5)'], cermin: 'y=x', jangkauan: [-1, 7, -1, 7] },
    pilihan: ['(2, 3)', '(4, 3)', '(-2, 7)', '(8, -1)', '(3, 2)'],
    benar: 0,
    langkah: [
      'Jalan mundur dari belakang. Batalkan cermin y = x (cermin adalah kebalikan dirinya sendiri): (1, 5) berasal dari (5, 1).',
      'Batalkan translasi (3, -2) dengan mengurangkannya: (5 - 3, 1 + 2) = (2, 3).',
      'Periksa maju: (2, 3) digeser jadi (5, 1), dicerminkan jadi (1, 5). Cocok.',
    ],
    jebakan: '(-2, 7) mengurangkan translasi dari (1, 5) tanpa membatalkan cermin dulu; urutan mundurnya harus dibalik dari urutan maju. (4, 3) menambahkan alih-alih mengurangkan.',
    alasan: 'Mundur: (5, 1) lalu (2, 3).',
  },
]
