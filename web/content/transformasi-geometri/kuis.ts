import type { SoalKuis } from '@/content/tipe'

/**
 * Bank kuis topik Transformasi Geometri: 16 soal, empat tingkat.
 *
 * EMPAT TINGKATNYA BERBEDA CARA BERPIKIR, BUKAN CUMA BERBEDA ANGKA
 * Ini yang diminta `docs/tugas/STANDAR-MENGAJAR.md` pada kompetensi asesmen.
 * Pembedanya:
 *
 *   mudah        satu aturan, satu titik, pusatnya di titik asal
 *   sedang       pusat atau garis cerminnya BUKAN di titik asal
 *   sulit        dua langkah, atau arahnya dibalik (yang dicari aturannya)
 *   sangat sulit yang ditransformasikan bukan titik lagi, atau yang ditanya
 *                sifatnya, bukan hasil hitungannya
 *
 * Menaikkan angka dari 3 menjadi 3.000 tidak membuat sebuah soal lebih sulit.
 * Yang membuatnya lebih sulit adalah bertambahnya langkah yang harus
 * direncanakan siswa sendiri.
 *
 * KALIBRASINYA
 * Tingkat "sangat sulit" ditakar ke Uji Kompetensi Bab 4 buku Matematika
 * Tingkat Lanjut Kelas XI, nomor 17 dan 20, yang mentransformasi garis dan
 * kurva. Satu soal garis dimasukkan di situ. Pembuktian rumus umum
 * (nomor 25 di buku) TIDAK dimasukkan: itu di luar ketiga belas materi topik
 * ini, dan menguji hal yang tidak diajarkan bukan asesmen yang adil.
 *
 * SELURUH ANGKA DIPERIKSA MESIN:
 *   python alat/cek_transformasi.py alat/soal-kuis-transformasi.json
 */
export const KUIS: SoalKuis[] = [
  /* ---------------------------- mudah ---------------------------- */
  {
    id: 'tg-translasi-dasar',
    pertanyaan: 'Titik (1, 2) ditranslasikan oleh vektor (3, 4). Petanya adalah ...',
    pilihan: ['(4  6)', '(-2  -2)', '(3  8)', '(4  2)', '(3  4)'],
    benar: 0,
    alasan: 'Koordinatnya dijumlahkan dengan komponen geserannya: 1 tambah 3 sama dengan 4, dan 2 tambah 4 sama dengan 6. Pilihan (3, 8) menggoda karena angkanya dikalikan, bukan dijumlahkan. Pilihan (3, 4) adalah vektor geserannya sendiri, yang memang tertulis di soal dan karena itu terasa akrab.',
    tingkat: 'mudah',
  },
  {
    id: 'tg-cermin-sumbu-x',
    pertanyaan: 'Titik (-3, 7) dicerminkan pada sumbu X. Petanya adalah ...',
    pilihan: ['(3  7)', '(3  -7)', '(-3  -7)', '(7  -3)', '(-7  -3)'],
    benar: 2,
    alasan: 'Sumbu X adalah garis mendatar, jadi perpindahannya tegak dan hanya nilai y yang berbalik tanda: (-3, 7) menjadi (-3, -7). Pilihan (3, 7) menggoda karena nama "sumbu X" membuat kita mengubah nilai x. Yang menentukan justru sebaliknya: mencerminkan pada garis mendatar mengubah yang tegak.',
    tingkat: 'mudah',
  },
  {
    id: 'tg-rotasi-90-dasar',
    pertanyaan: 'Titik (2, 0) diputar 90 derajat berlawanan arah jarum jam terhadap titik asal. Petanya adalah ...',
    pilihan: ['(0  -2)', '(0  2)', '(-2  0)', '(2  0)', '(-2  2)'],
    benar: 1,
    alasan: 'Aturannya (x, y) menjadi (-y, x), jadi (2, 0) menjadi (0, 2). Bisa juga tanpa rumus: titiknya ada di sumbu X sejauh 2 dari pusat, dan diputar seperempat putaran berlawanan jarum jam ia mendarat di sumbu Y positif. Pilihan (0, -2) adalah hasil memutar ke arah jarum jam.',
    tingkat: 'mudah',
  },
  {
    id: 'tg-cermin-sumbu-y',
    pertanyaan: 'Titik (6, -1) dicerminkan pada sumbu Y. Petanya adalah ...',
    pilihan: ['(6  1)', '(-6  1)', '(-1  6)', '(-6  -1)', '(1  -6)'],
    benar: 3,
    alasan: 'Sumbu Y adalah garis tegak, jadi hanya nilai x yang berbalik tanda: (6, -1) menjadi (-6, -1). Nilai -1 dibiarkan apa adanya. Pilihan (-6, 1) menggoda karena terasa lebih rapi kalau kedua tandanya diubah sekaligus, padahal yang diubah hanya satu.',
    tingkat: 'mudah',
  },

  /* ---------------------------- sedang ---------------------------- */
  {
    id: 'tg-cermin-y-sama-x',
    pertanyaan: 'Titik (-4, 6) dicerminkan pada garis y = x. Petanya adalah ...',
    pilihan: ['(4  -6)', '(-6  4)', '(-4  -6)', '(6  -4)', '(4  6)'],
    benar: 3,
    alasan: 'Cermin pada y = x cukup menukar kedua koordinatnya, tanda ikut pindah bersama angkanya: (-4, 6) menjadi (6, -4). Pilihan (4, -6) menggoda karena tandanya diubah juga, padahal untuk garis y = x tandanya tidak disentuh. Yang menukar DAN membalik tanda adalah garis y = -x.',
    tingkat: 'sedang',
  },
  {
    id: 'tg-dilatasi-pusat-asal',
    pertanyaan: 'Titik (-2, 5) didilatasi dengan pusat titik asal dan faktor 3. Petanya adalah ...',
    pilihan: ['(-6  15)', '(1  8)', '(-6  5)', '(-5  2)', '(6  -15)'],
    benar: 0,
    alasan: 'Dilatasi berpusat titik asal mengalikan kedua koordinatnya dengan faktornya: (-2 dikali 3, 5 dikali 3) sama dengan (-6, 15). Pilihan (1, 8) menggoda karena faktornya dijumlahkan, bukan dikalikan, dan penjumlahan adalah kebiasaan yang terbawa dari translasi di materi sebelumnya.',
    tingkat: 'sedang',
  },
  {
    id: 'tg-cermin-garis-datar',
    pertanyaan: 'Titik (2, 5) dicerminkan pada garis y = 3. Petanya adalah ...',
    pilihan: ['(2  -5)', '(2  1)', '(2  8)', '(2  2)', '(2  -1)'],
    benar: 1,
    alasan: 'Hitung jaraknya dulu: dari y sama dengan 5 ke garis y sama dengan 3 berjarak 2 satuan. Bayangannya 2 satuan di seberang, yaitu di y sama dengan 1. Pilihan (2, 2) menggoda karena mengurangi 3 dari 5, dan pilihan (2, 8) karena menambahkannya. Keduanya melupakan bahwa jaraknya harus dihitung lebih dahulu, lalu ditambahkan dari garisnya.',
    tingkat: 'sedang',
  },
  {
    id: 'tg-rotasi-180-berpusat',
    pertanyaan: 'Titik (5, 3) diputar 180 derajat terhadap titik (2, 1). Petanya adalah ...',
    pilihan: ['(-5  -3)', '(-1  1)', '(1  -1)', '(9  5)', '(-1  -1)'],
    benar: 4,
    alasan: 'Rotasi 180 derajat sama dengan pencerminan pada pusatnya, jadi pusatnya wajib berada tepat di tengah: (2 dikali 2 dikurangi 5, 2 dikali 1 dikurangi 3) sama dengan (-1, -1). Pilihan (-5, -3) menggoda karena memakai rumus untuk pusat di titik asal, padahal pusatnya di (2, 1). Periksa jawabannya: titik tengah (5, 3) dan (-1, -1) memang (2, 1).',
    tingkat: 'sedang',
  },

  /* ---------------------------- sulit ---------------------------- */
  {
    id: 'tg-komposisi-cermin-translasi',
    pertanyaan: 'Titik (4, 1) dicerminkan pada sumbu Y, lalu hasilnya ditranslasikan oleh vektor (2, -3). Peta akhirnya adalah ...',
    pilihan: ['(-4  1)', '(-6  -2)', '(-2  -2)', '(6  -2)', '(-2  4)'],
    benar: 2,
    alasan: 'Langkah pertama, cermin sumbu Y: (4, 1) menjadi (-4, 1). Langkah kedua, translasi (2, -3): (-4 tambah 2, 1 kurang 3) sama dengan (-2, -2). Pilihan (-4, 1) adalah hasil berhenti di langkah pertama, dan itu kekeliruan yang paling sering terjadi pada soal dua langkah. Pilihan (-6, -2) adalah hasil membalik urutannya.',
    tingkat: 'sulit',
  },
  {
    id: 'tg-cari-vektor-translasi',
    pertanyaan: 'Sebuah translasi memetakan titik (-3, 8) ke titik (2, 1). Vektor translasinya adalah ...',
    pilihan: ['(-5  7)', '(5  -7)', '(5  7)', '(-1  9)', '(-5  -7)'],
    benar: 1,
    alasan: 'Arah soalnya dibalik: yang dicari aturannya. Vektornya adalah peta dikurangi prapeta, yaitu (2 dikurangi -3, 1 dikurangi 8) sama dengan (5, -7). Pilihan (-5, 7) menggoda karena pengurangannya dibalik, dan hasilnya kebetulan terlihat masuk akal. Periksa maju: (-3 tambah 5, 8 kurang 7) sama dengan (2, 1). Betul.',
    tingkat: 'sulit',
  },
  {
    id: 'tg-kolom-matriks',
    pertanyaan: 'Matriks yang mewakili pencerminan pada garis y = x memetakan titik (1, 0) ke ...',
    pilihan: ['(1  0)', '(0  1)', '(-1  0)', '(0  -1)', '(1  1)'],
    benar: 1,
    alasan: 'Cermin pada y = x menukar koordinatnya, jadi (1, 0) menjadi (0, 1). Jawaban ini juga langsung memberi kolom pertama matriksnya, sebab kolom pertama sebuah matriks adalah tempat mendaratnya titik (1, 0). Itu cara membaca yang dipakai Materi 09. Pilihan (1, 0) menggoda karena titik itu tampak "sudah di garisnya", padahal (1, 0) tidak terletak pada garis y = x.',
    tingkat: 'sulit',
  },
  {
    id: 'tg-rotasi-90-berpusat',
    pertanyaan: 'Titik (3, -2) diputar 90 derajat berlawanan arah jarum jam terhadap titik (1, -2). Petanya adalah ...',
    pilihan: ['(2  1)', '(1  0)', '(3  0)', '(-1  -2)', '(1  -4)'],
    benar: 1,
    alasan: 'Kerjakan tiga langkah. Ukur dari pusatnya: (3 kurang 1, -2 kurang -2) sama dengan (2, 0). Putar 90 derajat dengan aturan (x, y) menjadi (-y, x): (2, 0) menjadi (0, 2). Kembalikan dari pusatnya: (1 tambah 0, -2 tambah 2) sama dengan (1, 0). Pilihan (2, 1) adalah hasil memutar terhadap titik asal, bukan terhadap pusat yang diminta.',
    tingkat: 'sulit',
  },

  /* ------------------------ sangat sulit ------------------------ */
  {
    id: 'tg-gabungan-jadi-satu',
    pertanyaan: 'Sebuah titik dicerminkan pada sumbu X, lalu diputar 90 derajat berlawanan arah jarum jam terhadap titik asal. Gabungan kedua langkah itu sama dengan satu transformasi tunggal, yaitu ...',
    pilihan: [
      'cermin pada garis y = x',
      'cermin pada garis y = -x',
      'rotasi 90 derajat terhadap titik asal',
      'rotasi 180 derajat terhadap titik asal',
      'cermin pada sumbu Y',
    ],
    benar: 0,
    alasan: 'Coba pada satu titik, misalnya (3, 1). Cermin sumbu X memberi (3, -1), lalu rotasi 90 derajat memberi (1, 3). Koordinatnya bertukar tempat tanpa berubah tanda, dan itu ciri cermin pada garis y = x. Lewat matriks: matriks rotasi dikali matriks cermin sumbu X memang menghasilkan matriks cermin y = x. Pilihan cermin y = -x adalah jawaban untuk urutan yang DIBALIK, dan itu jebakan utama Materi 12.',
    tingkat: 'sangat sulit',
  },
  {
    id: 'tg-cermin-garis-persamaan',
    pertanyaan: 'Garis y = 2x + 3 dicerminkan pada sumbu X. Persamaan petanya adalah ...',
    pilihan: ['y = 2x - 3', 'y = -2x + 3', 'y = -2x - 3', 'y = 2x + 3', 'y = 0,5x + 3'],
    benar: 2,
    alasan: 'Yang ditransformasikan bukan titik, jadi caranya berbeda. Ambil sebuah titik (x, y) pada petanya. Titik itu berasal dari (x, -y) pada garis semula, sebab cermin sumbu X membalik tanda y. Masukkan ke persamaan semula: -y sama dengan 2x tambah 3, sehingga y sama dengan -2x kurang 3. Kedua tandanya berubah, bukan salah satu. Pilihan y = -2x + 3 hanya mengubah kemiringannya, dan pilihan y = 2x - 3 hanya mengubah tetapannya. Periksa dengan satu titik: (0, 3) pada garis semula seharusnya jadi (0, -3), dan hanya jawaban yang benar melewatinya.',
    tingkat: 'sangat sulit',
  },
  {
    id: 'tg-luas-dilatasi',
    pertanyaan: 'Sebuah segitiga berluas 12 satuan didilatasi dengan faktor -3. Luas petanya adalah ...',
    pilihan: ['36 satuan', '-108 satuan', '4 satuan', '108 satuan', '-36 satuan'],
    benar: 3,
    alasan: 'Dilatasi mengalikan setiap panjang dengan besar faktornya, dan luas ditentukan oleh DUA panjang sekaligus, jadi luasnya dikalikan faktor kuadrat: 12 dikali 9 sama dengan 108. Pilihan 36 satuan adalah kekeliruan yang paling sering, yaitu mengalikan luas dengan faktornya saja. Tanda minus pada faktornya tidak membuat luasnya negatif: luas tidak pernah negatif, dan kuadrat dari -3 memang 9.',
    tingkat: 'sangat sulit',
  },
  {
    id: 'tg-urutan-boleh-dibalik',
    pertanyaan: 'Pada pasangan transformasi manakah hasilnya TETAP SAMA walaupun urutan pengerjaannya dibalik?',
    pilihan: [
      'translasi (2, 1) dan translasi (-3, 4)',
      'cermin sumbu X dan rotasi 90 derajat terhadap titik asal',
      'cermin garis y = x dan translasi (1, 1)',
      'rotasi 90 derajat terhadap titik asal dan rotasi 90 derajat terhadap (1, 1)',
      'dilatasi faktor 2 terhadap titik asal dan translasi (3, 0)',
    ],
    benar: 0,
    alasan: 'Dua translasi selalu boleh dibalik urutannya, sebab hasilnya sama dengan menjumlahkan kedua vektornya, dan penjumlahan tidak peduli urutan. Empat pasangan lain tidak boleh. Yang paling menggoda pilihan terakhir: coba pada titik (1, 0). Didilatasi dulu lalu digeser memberi (5, 0), sedangkan digeser dulu lalu didilatasi memberi (8, 0). Dua rotasi memang boleh dibalik, tetapi hanya kalau PUSATNYA sama, dan pada pilihan keempat pusatnya berbeda.',
    tingkat: 'sangat sulit',
  },
]
