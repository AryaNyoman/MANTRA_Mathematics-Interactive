import type { SoalKuis } from '@/content/tipe'

/**
 * Bank soal latihan Vektor: 60 soal, 15 tiap tingkat (13 Sep 2026).
 *
 * SEJARAH: 1 Sep 2026 bank ini 32 soal (8, 10, 8, 6). 13 Sep 2026 ARYA
 * meminta 15 soal per tingkat, syarat naik 10 benar, pembahasan bernomor
 * bergambar, dan penjelasan pengecoh. Id lama v01 sampai v32 DIPERTAHANKAN
 * supaya kemajuan siswa tidak hilang; v17 turun ke mudah. Soal baru v33
 * sampai v60.
 *
 * KALIBRASI (semua tulisan sendiri):
 * - mudah dan sedang: Latihan 3.1 sampai 3.6 Buku Panduan Guru Kelas X
 *   (komponen, panjang, arah, vektor satuan, penjumlahan ujung ke pangkal,
 *   perahu dan arus);
 * - sulit: pola UTBK di mathcyber1997.com/soal-dan-pembahasan-vektor-tingkat-
 *   sma-sederajat (segaris, hasil kali titik, sudut, proyeksi);
 * - sangat sulit: 5 bergaya olimpiade (a + b + c = 0 dengan tiga panjang,
 *   |a - b| diketahui lalu |a + b| dicari, titik pembagi ruas, median
 *   segitiga, syarat tegak lurus dengan parameter) dan 10 sulit-biasa.
 *
 * Penulisan vektor baris memakai dua spasi tanpa koma, (3  4), mengikuti
 * halaman materi. Tiap jawaban berangka punya `// cek:` untuk cek_kuis.mjs.
 */
export const KUIS: SoalKuis[] = [
  /* ================================ mudah ================================ */
  {
    id: 'v01',
    pertanyaan: 'Besaran berikut yang TERMASUK vektor adalah ...',
    pilihan: ['suhu', 'massa', 'perpindahan', 'waktu', 'panjang tali'],
    benar: 2,
    langkah: [
      'Vektor adalah besaran yang belum selesai dijelaskan satu angka: perlu arah.',
      '"Berpindah 5 meter" belum lengkap sebelum disebut ke mana; ke utara dan ke selatan jelas berbeda.',
      'Massa, suhu, waktu, dan panjang tali selesai dengan satu angka: skalar.',
    ],
    jebakan: '"panjang tali" menggoda karena tali bisa direntang ke arah tertentu; tetapi panjangnya sendiri (misalnya 3 m) tidak berubah ke mana pun tali itu diarahkan.',
    alasan: 'Perpindahan butuh arah; yang lain selesai dijelaskan satu angka (skalar).',
    tingkat: 'mudah',
  },
  {
    // cek: Math.hypot(3, 4) === 5
    id: 'v02',
    pertanyaan: 'Panjang vektor (3  4) adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [3, 4], label: '(3  4)' }], komponen: [0] },
    pilihan: ['5', '7', '12', '25', '1'],
    benar: 0,
    langkah: [
      'Komponen 3 ke kanan dan 4 ke atas membentuk segitiga siku-siku; panahnya sisi miring.',
      'Pythagoras: √(3² + 4²) = √(9 + 16) = √25.',
      'Panjangnya 5.',
    ],
    jebakan: '7 menjumlahkan komponennya begitu saja, padahal keduanya tegak lurus. 25 lupa menarik akar.',
    alasan: 'Pythagoras: √(9 + 16) = 5.',
    tingkat: 'mudah',
  },
  {
    // cek: 2 + 3 === 5 && 5 + (-1) === 4
    id: 'v03',
    pertanyaan: 'Hasil dari (2  5) ditambah (3  -1) adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [2, 5], label: '(2  5)' }, { dari: [2, 5], ke: [3, -1], label: '(3  -1)' }, { ke: [5, 4], label: 'hasil' }] },
    pilihan: ['(6  -5)', '(5  6)', '(-1  6)', '(5  4)', '(5  -4)'],
    benar: 3,
    langkah: [
      'Jumlahkan komponen yang sejenis: mendatar dengan mendatar, tegak dengan tegak.',
      'Mendatar: 2 + 3 = 5. Tegak: 5 + (-1) = 4.',
      'Hasilnya (5  4); di gambar, panah kedua disambung di ujung panah pertama, dan hasilnya dari pangkal pertama ke ujung kedua.',
    ],
    jebakan: '(5  6) mengabaikan tanda negatif; (6  -5) mencampur komponen mendatar dengan tegak.',
    alasan: '2 + 3 = 5 dan 5 + (-1) = 4.',
    tingkat: 'mudah',
  },
  {
    // cek: 7 - 3 === 4 && 2 - 5 === -3
    id: 'v04',
    pertanyaan: 'Hasil dari (7  2) dikurangi (3  5) adalah ...',
    pilihan: ['(4  3)', '(4  -3)', '(-4  3)', '(10  7)', '(4  7)'],
    benar: 1,
    langkah: [
      'Kurangkan komponen sejenis: 7 - 3 = 4 (mendatar), 2 - 5 = -3 (tegak).',
      'Hasilnya (4  -3).',
      'Mengurangi sama dengan menambah lawannya: (7  2) + (-3  -5).',
    ],
    jebakan: '(-4  3) adalah hasil kalau urutannya dibalik, itu vektor lawannya. (10  7) menjumlahkan, bukan mengurangkan.',
    alasan: '7 - 3 = 4 dan 2 - 5 = -3.',
    tingkat: 'mudah',
  },
  {
    // cek: 3 * 2 === 6 && 3 * -1 === -3
    id: 'v05',
    pertanyaan: 'Hasil dari 3 dikali vektor (2  -1) adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [2, -1], label: '(2  -1)' }, { dari: [0, 0], ke: [6, -3], label: '3 kali' }] },
    pilihan: ['(2  -3)', '(6  -1)', '(5  2)', '(6  3)', '(6  -3)'],
    benar: 4,
    langkah: [
      'Mengalikan dengan angka berarti tiap komponen dikalikan, tidak ada yang dilewati.',
      '3 × 2 = 6 dan 3 × (-1) = -3.',
      'Hasilnya (6  -3): arahnya tetap, panjangnya tiga kali lipat.',
    ],
    jebakan: '(6  -1) hanya mengalikan komponen mendatar; (6  3) menghilangkan tanda negatif, padahal arah tidak boleh berubah.',
    alasan: 'Tiap komponen dikalikan 3.',
    tingkat: 'mudah',
  },
  {
    // cek: 5 - 2 === 3 && 7 - 3 === 4
    id: 'v06',
    pertanyaan: 'Diketahui A(2, 3) dan B(5, 7). Vektor AB adalah ...',
    gambar: { jenis: 'vektor', panah: [{ dari: [2, 3], ke: [3, 4], label: 'AB' }], jangkauan: [-1, 7, -1, 8] },
    pilihan: ['(7  10)', '(-3  -4)', '(3  4)', '(3  -4)', '(2  3)'],
    benar: 2,
    langkah: [
      'Vektor AB adalah perjalanan dari A ke B: ujung dikurangi pangkal.',
      'Mendatar: 5 - 2 = 3. Tegak: 7 - 3 = 4.',
      'AB = (3  4). Panjangnya 5, tetapi yang ditanya vektornya.',
    ],
    jebakan: '(-3  -4) membalik urutannya, itu BA. (7  10) menjumlahkan kedua titik, padahal vektor adalah selisih posisi.',
    alasan: 'Ujung dikurangi pangkal: (5 - 2, 7 - 3) = (3  4).',
    tingkat: 'mudah',
  },
  {
    // cek: Math.hypot(-8, 6) === 10
    id: 'v07',
    pertanyaan: 'Panjang vektor (-8  6) adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [-8, 6], label: '(-8  6)' }], komponen: [0] },
    pilihan: ['10', '-10', '2', '14', '100'],
    benar: 0,
    langkah: [
      '√((-8)² + 6²) = √(64 + 36) = √100.',
      'Panjangnya 10.',
      'Tanda minus hilang saat dikuadratkan: panjang tidak pernah negatif.',
    ],
    jebakan: '-10 mustahil untuk panjang. 2 adalah -8 + 6, menjumlahkan komponen tanpa kuadrat.',
    alasan: '√(64 + 36) = 10.',
    tingkat: 'mudah',
  },
  {
    id: 'v08',
    pertanyaan: 'Vektor lawan dari (5  -2) adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [5, -2], label: '(5  -2)' }, { ke: [-5, 2], label: 'lawannya' }] },
    pilihan: ['(2  -5)', '(-5  -2)', '(5  2)', '(-5  2)', '(-2  5)'],
    benar: 3,
    langkah: [
      'Vektor lawan: panjang sama, arah berbalik 180°.',
      'Membalik arah berarti KEDUA komponen berganti tanda: (5  -2) menjadi (-5  2).',
    ],
    jebakan: '(-5  -2) dan (5  2) hanya membalik satu komponen: arahnya berubah, tetapi bukan berlawanan.',
    alasan: 'Kedua komponen berganti tanda.',
    tingkat: 'mudah',
  },
  {
    id: 'v17',
    pertanyaan: 'Berapa panjang vektor satuan dari sebuah vektor yang panjangnya 17?',
    pilihan: ['1', '17', '1 per 17', 'akar 17', 'bergantung arahnya'],
    benar: 0,
    langkah: [
      'Vektor satuan dibuat dengan membagi vektor dengan panjangnya sendiri.',
      'Panjang hasilnya 17 : 17 = 1, berapa pun panjang asalnya dan ke mana pun arahnya.',
      'Itulah gunanya: menyatakan arah saja, tanpa membawa keterangan sejauh apa.',
    ],
    jebakan: '"1 per 17" adalah pengalinya, bukan panjang hasilnya. "bergantung arahnya" keliru: arah tidak mengubah panjang.',
    alasan: 'Panjang vektor satuan selalu 1.',
    tingkat: 'mudah',
  },
  {
    // cek: 4 - 1 === 3 && 3 - 1 === 2
    id: 'v33',
    pertanyaan: 'Diketahui A(1, 1) dan B(4, 3). Vektor AB adalah ...',
    gambar: { jenis: 'vektor', panah: [{ dari: [1, 1], ke: [3, 2], label: 'AB' }], jangkauan: [-1, 6, -1, 5] },
    pilihan: ['(3  2)', '(5  4)', '(-3  -2)', '(2  3)', '(4  3)'],
    benar: 0,
    langkah: [
      'Dari A ke B berjalan 3 ke kanan (1 ke 4) dan 2 ke atas (1 ke 3).',
      'AB = (4 - 1, 3 - 1) = (3  2).',
    ],
    jebakan: '(4  3) adalah koordinat titik B, bukan vektor dari A. (2  3) menukar komponen.',
    alasan: 'Ujung dikurangi pangkal: (3  2).',
    tingkat: 'mudah',
  },
  {
    id: 'v34',
    pertanyaan: 'Komponen mendatar dan komponen tegak vektor (5  -2) berturut-turut ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [5, -2], label: '(5  -2)' }], komponen: [0] },
    pilihan: ['5 dan -2', '-2 dan 5', '5 dan 2', '3 dan -2', '7 dan -2'],
    benar: 0,
    langkah: [
      'Angka pertama selalu langkah mendatar: 5 ke kanan.',
      'Angka kedua langkah tegak: -2 berarti 2 ke bawah.',
    ],
    jebakan: '"5 dan 2" membuang tanda: tanpa minus, panahnya naik, padahal ia turun.',
    alasan: 'Mendatar 5, tegak -2.',
    tingkat: 'mudah',
  },
  {
    id: 'v35',
    pertanyaan: 'Vektor 2i + 3j sama dengan ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [1, 0], label: 'i', warna: 'samping' }, { ke: [0, 1], label: 'j', warna: 'depan' }, { ke: [2, 3], label: '2i + 3j' }], jangkauan: [-1, 4, -1, 4] },
    pilihan: ['(2  3)', '(3  2)', '(5  0)', '(2  0)', '(0  3)'],
    benar: 0,
    langkah: [
      'i = (1  0) dan j = (0  1) adalah vektor satuan searah sumbu-x dan sumbu-y.',
      '2i = (2  0) dan 3j = (0  3); dijumlahkan menjadi (2  3).',
    ],
    jebakan: '(5  0) menjumlahkan 2 dan 3 seolah searah; i dan j tegak lurus, jadi keduanya tetap terpisah sebagai dua komponen.',
    alasan: '2i + 3j = (2  0) + (0  3) = (2  3).',
    tingkat: 'mudah',
  },
  {
    // cek: Math.hypot(0, -7) === 7
    id: 'v36',
    pertanyaan: 'Panjang vektor (0  -7) adalah ...',
    pilihan: ['7', '-7', '0', '49', '√7'],
    benar: 0,
    langkah: [
      'Vektor ini lurus ke bawah sejauh 7 langkah, tanpa langkah mendatar.',
      '√(0² + (-7)²) = √49 = 7.',
    ],
    jebakan: '-7 mengira arah ke bawah membuat panjangnya negatif; panjang selalu positif. 49 lupa akar.',
    alasan: '√49 = 7.',
    tingkat: 'mudah',
  },
  {
    id: 'v37',
    pertanyaan: 'Dua vektor dikatakan SAMA jika ...',
    pilihan: [
      'panjangnya sama dan arahnya sama',
      'titik pangkalnya sama',
      'panjangnya sama, arahnya boleh beda',
      'keduanya digambar di tempat yang sama',
      'komponen mendatarnya sama',
    ],
    benar: 0,
    langkah: [
      'Yang menentukan sebuah vektor hanya dua hal: panjang dan arah.',
      'Panah boleh dipindah ke mana pun; selama panjang dan arahnya sama, ia vektor yang sama.',
    ],
    jebakan: '"titik pangkalnya sama" mengira vektor terikat pada tempatnya; panah (3  4) dari titik asal dan dari (10, 10) adalah vektor yang sama.',
    alasan: 'Vektor ditentukan panjang dan arah, bukan letaknya.',
    tingkat: 'mudah',
  },
  {
    // cek: 4/2 === 6/3
    id: 'v38',
    pertanyaan: 'Vektor yang SEJAJAR dengan (2  3) adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [2, 3], label: '(2  3)' }, { dari: [3, 0], ke: [4, 6], label: '(4  6)' }], jangkauan: [-1, 8, -1, 7] },
    pilihan: ['(4  6)', '(3  2)', '(2  -3)', '(4  5)', '(6  4)'],
    benar: 0,
    langkah: [
      'Sejajar berarti yang satu kelipatan yang lain.',
      '(4  6) = 2 × (2  3): kedua komponen dikali angka yang sama.',
      '(4  5) bukan: 4 = 2 × 2 tetapi 5 bukan 2 × 3.',
    ],
    jebakan: '(3  2) dan (6  4) menukar komponen: panahnya condong ke arah lain. Sejajar menuntut pengali yang sama untuk kedua komponen.',
    alasan: '(4  6) = 2 × (2  3).',
    tingkat: 'mudah',
  },

  /* =============================== sedang =============================== */
  {
    // cek: Math.abs(Math.hypot(2, 3) - Math.sqrt(13)) < 1e-9
    id: 'v09',
    pertanyaan: 'Panjang vektor (2  3) adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [2, 3], label: '(2  3)' }], komponen: [0] },
    pilihan: ['5', 'akar 13', '13', 'akar 5', '6'],
    benar: 1,
    langkah: [
      '√(2² + 3²) = √(4 + 9) = √13.',
      '√13 bukan bilangan bulat (13 bukan kuadrat sempurna), jadi ditinggalkan dalam bentuk akar, kira-kira 3,6.',
    ],
    jebakan: '5 menjumlahkan komponen; 13 lupa akar. Tidak semua vektor punya panjang bulat, dan itu biasa.',
    alasan: '√(4 + 9) = √13.',
    tingkat: 'sedang',
  },
  {
    // cek: Math.abs(8/10 - 0.8) < 1e-9 && Math.abs(-6/10 + 0.6) < 1e-9
    id: 'v10',
    pertanyaan: 'Vektor satuan yang searah dengan (8  -6) adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [8, -6], label: '(8  -6)' }, { ke: [0.8, -0.6], label: 'satuan', warna: 'depan' }], jangkauan: [-1, 9, -7, 1] },
    pilihan: ['(0,57  -0,43)', '(8  -6)', '(-0,8  0,6)', '(4  -3)', '(0,8  -0,6)'],
    benar: 4,
    langkah: [
      'Panjang (8  -6) = √(64 + 36) = 10.',
      'Bagi tiap komponen dengan panjangnya: (8/10  -6/10) = (0,8  -0,6).',
      'Periksa: √(0,64 + 0,36) = 1.',
    ],
    jebakan: '(4  -3) dibagi 2 saja, panjangnya masih 5. (0,57  -0,43) membagi dengan 14 (jumlah komponen tanpa tanda); pembaginya harus panjang vektor.',
    alasan: 'Dibagi panjangnya 10.',
    tingkat: 'sedang',
  },
  {
    // cek: Math.hypot(9, 12) === 15
    id: 'v11',
    pertanyaan: 'Dua gaya bekerja pada satu titik: 9 newton ke timur dan 12 newton ke utara. Besar resultannya adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [9, 0], label: '9 N', warna: 'samping' }, { dari: [9, 0], ke: [0, 12], label: '12 N', warna: 'depan' }, { ke: [9, 12], label: 'resultan' }], jangkauan: [-1, 11, -1, 14] },
    pilihan: ['3 newton', '21 newton', '15 newton', '108 newton', '10,5 newton'],
    benar: 2,
    langkah: [
      'Timur dan utara saling tegak lurus, jadi resultannya sisi miring segitiga siku-siku.',
      '√(9² + 12²) = √(81 + 144) = √225 = 15 newton.',
    ],
    jebakan: '21 menjumlahkan besarnya; itu hanya benar kalau keduanya searah. 3 mengurangkannya, benar hanya kalau berlawanan.',
    alasan: '√(81 + 144) = 15.',
    tingkat: 'sedang',
  },
  {
    // cek: Math.abs(Math.hypot(4, -6) - 2*Math.sqrt(13)) < 1e-9
    id: 'v12',
    pertanyaan: 'Diketahui A(-1, 4) dan B(3, -2). Panjang vektor AB adalah ...',
    gambar: { jenis: 'vektor', panah: [{ dari: [-1, 4], ke: [4, -6], label: 'AB' }], jangkauan: [-2, 5, -3, 5] },
    pilihan: ['2 akar 13', '2', '10', 'akar 20', '52'],
    benar: 0,
    langkah: [
      'AB = (3 - (-1), -2 - 4) = (4  -6).',
      'Panjang = √(16 + 36) = √52.',
      '√52 = √(4 × 13) = 2√13 ≈ 7,2.',
    ],
    jebakan: '2 menjumlahkan komponen 4 + (-6). 52 lupa akar. 10 mengira komponennya (6  8).',
    alasan: 'AB = (4  -6), panjang √52 = 2√13.',
    tingkat: 'sedang',
  },
  {
    // cek: 10 / 2 === 5
    id: 'v13',
    pertanyaan: 'Vektor (3  p) sejajar dengan vektor (6  10). Nilai p adalah ...',
    pilihan: ['7', '3', '4', '5', '20'],
    benar: 3,
    langkah: [
      'Sejajar berarti (6  10) = k × (3  p) untuk suatu k.',
      'Dari komponen mendatar: 6 = 3k, jadi k = 2.',
      'Dari komponen tegak: 10 = 2p, jadi p = 5.',
    ],
    jebakan: '7 mengira selisih komponennya yang sama (6 - 3 = 3, jadi 10 - 3). Sejajar itu soal perbandingan, bukan selisih.',
    alasan: 'Pengali 2, jadi p = 5.',
    tingkat: 'sedang',
  },
  {
    // cek: 2*3 - 4 === 2 && 2*1 - (-2) === 4
    id: 'v14',
    pertanyaan: 'Diketahui a = (3  1) dan b = (4  -2). Hasil dari 2a dikurangi b adalah ...',
    pilihan: ['(2  0)', '(2  4)', '(10  0)', '(-2  -4)', '(6  -1)'],
    benar: 1,
    langkah: [
      '2a = (6  2).',
      '2a - b = (6 - 4, 2 - (-2)) = (2  4).',
      'Mengurangi -2 sama dengan menambah 2.',
    ],
    jebakan: '(2  0) menulis 2 - 2 untuk komponen tegak, lupa bahwa yang dikurangkan adalah -2. (10  0) menjumlahkan.',
    alasan: '(6  2) - (4  -2) = (2  4).',
    tingkat: 'sedang',
  },
  {
    // cek: Math.hypot(1, 2, 2) === 3
    id: 'v15',
    pertanyaan: 'Panjang vektor (1  2  2) di ruang tiga dimensi adalah ...',
    pilihan: ['2', '5', '9', 'akar 5', '3'],
    benar: 4,
    langkah: [
      'Caranya sama dengan dua dimensi, hanya ditambah satu komponen.',
      '√(1² + 2² + 2²) = √(1 + 4 + 4) = √9 = 3.',
    ],
    jebakan: '5 menjumlahkan komponen; 9 lupa akar; √5 hanya memakai dua komponen pertama.',
    alasan: '√(1 + 4 + 4) = 3.',
    tingkat: 'sedang',
  },
  {
    // cek: 2*1 - 3 === -1 && 2*2 - (-1) === 5
    id: 'v16',
    pertanyaan: 'Diketahui vektor posisi A(1, 2) dan B(3, -1). Hasil dari 2 kali OA dikurangi OB adalah ...',
    pilihan: ['(1  5)', '(5  3)', '(-1  5)', '(-1  3)', '(5  5)'],
    benar: 2,
    langkah: [
      'Vektor posisi: OA = (1  2), OB = (3  -1).',
      '2·OA = (2  4).',
      '(2  4) - (3  -1) = (2 - 3, 4 + 1) = (-1  5).',
    ],
    jebakan: '(5  3) menjumlahkan. (-1  3) menulis 4 - 1 untuk komponen tegak, padahal yang dikurangkan -1.',
    alasan: '(2  4) - (3  -1) = (-1  5).',
    tingkat: 'sedang',
  },
  {
    // cek: Math.hypot(3, 4) === 5
    id: 'v18',
    pertanyaan: 'Perahu didayung tegak lurus menyeberangi sungai dengan perpindahan 4 km tiap jam, sementara arus membawanya 3 km tiap jam ke hilir. Jarak yang benar-benar ditempuh perahu dalam satu jam adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [0, 4], label: 'dayung 4', warna: 'depan' }, { dari: [0, 4], ke: [3, 0], label: 'arus 3', warna: 'samping' }, { ke: [3, 4], label: 'sebenarnya' }], jangkauan: [-1, 5, -1, 6] },
    pilihan: ['4 km', '7 km', '1 km', '5 km', '12 km'],
    benar: 3,
    langkah: [
      'Dua perpindahan tegak lurus dalam satu jam: 4 km menyeberang dan 3 km ke hilir.',
      'Perpindahan sebenarnya (3  4), panjangnya √(9 + 16) = 5 km.',
    ],
    jebakan: '7 km menjumlahkan langsung; 4 km mengira arus tidak mengubah jarak tempuh.',
    alasan: 'Resultan (3  4) sepanjang 5 km.',
    tingkat: 'sedang',
  },
  {
    // cek: Math.abs(Math.atan2(3, 3)/D - 45) < 1e-9
    id: 'v39',
    pertanyaan: 'Sudut vektor (3  3) terhadap sumbu-x positif adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [3, 3], label: '(3  3)' }], komponen: [0] },
    pilihan: ['45°', '30°', '60°', '90°', '3°'],
    benar: 0,
    langkah: [
      'Arah diukur dari sumbu-x positif, berlawanan arah jarum jam.',
      'tan(sudut) = komponen tegak : komponen mendatar = 3 : 3 = 1.',
      'Sudut yang tangennya 1 adalah 45°.',
    ],
    jebakan: '"3°" membaca komponen sebagai sudut. 90° mengira panah yang komponennya sama pasti tegak; yang tegak adalah (0  3).',
    alasan: 'tan θ = 3/3 = 1, θ = 45°.',
    tingkat: 'sedang',
  },
  {
    // cek: Math.abs(4/5 - 0.8) < 1e-9 && Math.abs(3/5 - 0.6) < 1e-9
    id: 'v40',
    pertanyaan: 'Vektor satuan yang searah dengan (4  3) adalah ...',
    pilihan: ['(0,8  0,6)', '(0,6  0,8)', '(4  3)', '(1  1)', '(0,4  0,3)'],
    benar: 0,
    langkah: [
      'Panjang (4  3) = 5.',
      'Bagi tiap komponen dengan 5: (0,8  0,6).',
    ],
    jebakan: '(0,6  0,8) menukar komponen: arahnya berubah. (0,4  0,3) membagi dengan 10, panjangnya tinggal 0,5.',
    alasan: '(4  3) dibagi 5.',
    tingkat: 'sedang',
  },
  {
    // cek: Math.abs(Math.hypot(5, 4) - 6.4) < 0.01
    id: 'v41',
    pertanyaan: 'Resultan dari (2  5) dan (3  -1) panjangnya kira-kira ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [2, 5], label: '(2  5)' }, { dari: [2, 5], ke: [3, -1], label: '(3  -1)' }, { ke: [5, 4], label: 'resultan' }] },
    pilihan: ['6,4', '7,0', '9,0', '5,1', '11,0'],
    benar: 0,
    langkah: [
      'Jumlahkan komponen dulu: (2 + 3, 5 + (-1)) = (5  4).',
      'Panjang resultan = √(25 + 16) = √41 ≈ 6,4.',
    ],
    jebakan: '7,0 menjumlahkan panjang kedua vektor (√29 + √10 ≈ 8,5 sebenarnya); panjang tidak boleh dijumlahkan kecuali searah. 9,0 adalah 5 + 4.',
    alasan: 'Resultan (5  4), panjang √41 ≈ 6,4.',
    tingkat: 'sedang',
  },
  {
    // cek: (2 + 6)/2 === 4 && (1 + 5)/2 === 3
    id: 'v42',
    pertanyaan: 'Diketahui OA = (2  1) dan OB = (6  5). Vektor posisi titik tengah AB adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [2, 1], label: 'OA' }, { ke: [6, 5], label: 'OB' }, { ke: [4, 3], label: 'OM', warna: 'depan' }], jangkauan: [-1, 8, -1, 7] },
    pilihan: ['(4  3)', '(8  6)', '(4  4)', '(2  2)', '(3  4)'],
    benar: 0,
    langkah: [
      'Titik tengah M berada di separuh perjalanan dari A ke B: OM = (OA + OB) : 2.',
      '(2 + 6, 1 + 5) : 2 = (8  6) : 2 = (4  3).',
    ],
    jebakan: '(8  6) berhenti di penjumlahan tanpa dibagi dua. (2  2) adalah separuh selisih (AB : 2), yaitu perjalanan dari A ke M, bukan posisi M.',
    alasan: '(OA + OB) : 2 = (4  3).',
    tingkat: 'sedang',
  },
  {
    // cek: -2*3 === -6 && -2*-1 === 2
    id: 'v43',
    pertanyaan: 'Hasil dari -2 dikali vektor (3  -1) adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [3, -1], label: '(3  -1)' }, { ke: [-6, 2], label: '-2 kali' }], jangkauan: [-7, 4, -2, 3] },
    pilihan: ['(-6  2)', '(-6  -2)', '(6  -2)', '(1  -3)', '(-6  1)'],
    benar: 0,
    langkah: [
      'Tiap komponen dikali -2: -2 × 3 = -6 dan -2 × (-1) = 2.',
      'Hasilnya (-6  2): panjang dua kali lipat, arah berbalik.',
    ],
    jebakan: '(-6  -2) lupa bahwa negatif kali negatif positif. Pengali negatif membalik arah, bukan membuat panjang negatif.',
    alasan: '(-6  2), dua kali lebih panjang dan berlawanan arah.',
    tingkat: 'sedang',
  },
  {
    // cek: Math.abs(Math.atan(3/4)/D - 36.87) < 0.01
    id: 'v44',
    pertanyaan: 'Perahu didayung ke utara dengan kecepatan 4 km/jam, sementara arus 3 km/jam ke timur. Arah gerak perahu yang sebenarnya menyimpang dari utara sebesar kira-kira ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [0, 4], label: '4 utara', warna: 'depan' }, { dari: [0, 4], ke: [3, 0], label: '3 timur', warna: 'samping' }, { ke: [3, 4], label: 'gerak nyata' }], jangkauan: [-1, 5, -1, 6] },
    pilihan: ['36,9° ke timur', '53,1° ke timur', '45° ke timur', '36,9° ke barat', '0°'],
    benar: 0,
    langkah: [
      'Gerak nyata (3  4): 3 ke timur, 4 ke utara.',
      'Sudut dari arah utara: tan θ = 3 : 4 = 0,75.',
      'θ ≈ 36,9°, ke arah timur (arah arus).',
    ],
    jebakan: '53,1° mengukur dari timur (tan = 4/3), padahal yang ditanya simpangan dari utara. "ke barat" salah arah: arus ke timur.',
    alasan: 'tan θ = 3/4, θ ≈ 36,9° ke timur dari utara.',
    tingkat: 'sedang',
  },

  /* =============================== sulit =============================== */
  {
    // cek: 4 + 2*3 === 10
    id: 'v19',
    pertanyaan: 'Titik A(1, 2), B(4, 6), dan C(p, 14) terletak pada satu garis lurus. Nilai p adalah ...',
    pilihan: ['8', '10', '7', '12', '6'],
    benar: 1,
    langkah: [
      'Segaris berarti AB dan BC sejajar: BC = k × AB.',
      'AB = (3  4), BC = (p - 4, 8).',
      'Dari komponen tegak: 8 = 4k, jadi k = 2. Maka p - 4 = 2 × 3 = 6, p = 10.',
    ],
    jebakan: '7 memakai k = 1. 12 memakai AC = 2 × AB tanpa menyesuaikan (AC seharusnya 3 × AB: (9  12), p = 10 juga). Periksa: AC = (9  12) memang 3 × (3  4).',
    alasan: 'BC = 2 × AB, p - 4 = 6, p = 10.',
    tingkat: 'sulit',
  },
  {
    // cek: Math.abs(Math.hypot(2, 6) - 2*Math.sqrt(10)) < 1e-9
    id: 'v20',
    pertanyaan: 'Diketahui a = (3  4) dan b = (-1  2). Panjang dari a ditambah b adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [3, 4], label: 'a' }, { dari: [3, 4], ke: [-1, 2], label: 'b' }, { ke: [2, 6], label: 'a + b' }], jangkauan: [-1, 5, -1, 7] },
    pilihan: ['40', '5 ditambah akar 5', '8', 'akar 10', '2 akar 10'],
    benar: 4,
    langkah: [
      'Jumlahkan komponen dulu: a + b = (2  6).',
      'Panjang = √(4 + 36) = √40 = 2√10 ≈ 6,3.',
    ],
    jebakan: '"5 + √5" menjumlahkan panjang masing-masing; panjang jumlah lebih pendek karena keduanya tidak searah. 40 lupa akar.',
    alasan: '(2  6), panjang √40 = 2√10.',
    tingkat: 'sulit',
  },
  {
    // cek: 5*3 + (-2)*4 === 7
    id: 'v21',
    pertanyaan: 'Hasil kali titik antara (5  -2) dan (3  4) adalah ...',
    pilihan: ['(15  -8)', '23', '7', '-7', '26'],
    benar: 2,
    langkah: [
      'Kalikan komponen sejenis lalu jumlahkan: 5 × 3 + (-2) × 4.',
      '15 + (-8) = 7.',
      'Hasil kali titik selalu SATU bilangan, bukan vektor.',
    ],
    jebakan: '(15  -8) berhenti sebelum dijumlahkan dan salah bentuknya. 23 menghilangkan tanda negatif.',
    alasan: '15 - 8 = 7.',
    tingkat: 'sulit',
  },
  {
    // cek: Math.abs(Math.acos(3/(Math.sqrt(2)*3))/D - 45) < 1e-9
    id: 'v22',
    pertanyaan: 'Sudut antara vektor (1  1) dan vektor (0  3) adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [1, 1], label: '(1  1)' }, { ke: [0, 3], label: '(0  3)', warna: 'depan' }], jangkauan: [-1, 3, -1, 4] },
    pilihan: ['45 derajat', '90 derajat', '30 derajat', '60 derajat', '0 derajat'],
    benar: 0,
    langkah: [
      '(1  1) menghadap 45° dari sumbu-x; (0  3) tepat ke atas, 90°.',
      'Selisihnya 45°.',
      'Lewat hasil kali titik: cos θ = 3 : (√2 × 3) = 1/√2, dan itu cos 45°.',
    ],
    jebakan: '90° mengira (0  3) tegak lurus dengan apa pun yang miring. Sudut diukur ANTARA kedua panah, bukan terhadap sumbu.',
    alasan: 'cos θ = 1/√2, θ = 45°.',
    tingkat: 'sulit',
  },
  {
    // cek: Math.hypot(4, 3) === 5 && Math.hypot(-4, 3) === 5
    id: 'v23',
    pertanyaan: 'Vektor (x  3) panjangnya 5. Nilai x yang mungkin adalah ...',
    pilihan: ['8 atau -8', 'hanya 4', '2 atau -2', '4 atau -4', 'hanya 2'],
    benar: 3,
    langkah: [
      'x² + 3² = 5², jadi x² + 9 = 25.',
      'x² = 16, sehingga x = 4 atau x = -4.',
      'Keduanya sah: (4  3) dan (-4  3) sama-sama sepanjang 5, hanya condong ke kanan atau ke kiri.',
    ],
    jebakan: '"hanya 4" melupakan bahwa kuadrat menghapus tanda. "2 atau -2" mengira 5 - 3 = 2, padahal hubungannya lewat kuadrat.',
    alasan: 'x² = 16, x = ±4.',
    tingkat: 'sulit',
  },
  {
    // cek: 2 - 3 + 1 === 0 && 1 + 4 - 2 === 3
    id: 'v24',
    pertanyaan: 'Resultan dari tiga vektor (2  1), (-3  4), dan (1  -2) mempunyai panjang ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [2, 1], label: '(2  1)' }, { dari: [2, 1], ke: [-3, 4], label: '(-3  4)' }, { dari: [-1, 5], ke: [1, -2], label: '(1  -2)' }, { ke: [0, 3], label: 'resultan', warna: 'depan' }], jangkauan: [-3, 4, -1, 6] },
    pilihan: ['0', '3', '5', 'akar 10', '9'],
    benar: 1,
    langkah: [
      'Mendatar: 2 + (-3) + 1 = 0. Tegak: 1 + 4 + (-2) = 3.',
      'Resultan (0  3), panjangnya 3: lurus ke atas.',
    ],
    jebakan: '0 melihat komponen mendatar nol lalu mengira seluruhnya nol; komponen tegaknya masih 3.',
    alasan: 'Resultan (0  3), panjang 3.',
    tingkat: 'sulit',
  },
  {
    // cek: Math.hypot(3, 4) === 5
    id: 'v25',
    pertanyaan: 'Dua vektor saling tegak lurus dengan panjang 3 dan 4. Panjang jumlah kedua vektor itu adalah ...',
    pilihan: ['tidak bisa ditentukan', '7', '1', '12', '5'],
    benar: 4,
    langkah: [
      'Tegak lurus: keduanya membentuk kaki segitiga siku-siku, jumlahnya sisi miring.',
      '√(3² + 4²) = 5.',
    ],
    jebakan: '7 hanya benar kalau searah; 1 hanya kalau berlawanan. "tidak bisa ditentukan" keliru: arahnya sudah dikunci oleh kata tegak lurus.',
    alasan: 'Sisi miring segitiga 3-4-5.',
    tingkat: 'sulit',
  },
  {
    // cek: Math.abs(-4/5 + 0.8) < 1e-9 && Math.abs(3/5 - 0.6) < 1e-9
    id: 'v26',
    pertanyaan: 'Vektor satuan yang BERLAWANAN arah dengan (4  -3) adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [4, -3], label: '(4  -3)' }, { ke: [-0.8, 0.6], label: 'dicari', warna: 'depan' }], jangkauan: [-2, 5, -4, 2] },
    pilihan: ['(-4  3)', '(0,8  -0,6)', '(-0,8  0,6)', '(-0,6  0,8)', '(0,6  -0,8)'],
    benar: 2,
    langkah: [
      'Panjang (4  -3) = 5, jadi vektor satuan searahnya (0,8  -0,6).',
      'Berlawanan arah: balik kedua tanda, (-0,8  0,6).',
      'Panjangnya tetap 1.',
    ],
    jebakan: '(-4  3) memang berlawanan arah, tetapi panjangnya 5, bukan 1. (0,8  -0,6) searah, belum dibalik.',
    alasan: '-(4  -3)/5 = (-0,8  0,6).',
    tingkat: 'sulit',
  },
  {
    // cek: 2*4 + 3*(-1) === 5
    id: 'v45',
    pertanyaan: 'Hasil kali titik (2  3) · (4  -1) adalah ...',
    pilihan: ['5', '11', '(8  -3)', '-5', '10'],
    benar: 0,
    langkah: [
      '2 × 4 + 3 × (-1) = 8 - 3.',
      'Hasilnya 5, satu bilangan.',
    ],
    jebakan: '11 menghilangkan tanda negatif. (8  -3) berhenti sebelum menjumlahkan; hasil kali titik bukan vektor.',
    alasan: '8 - 3 = 5.',
    tingkat: 'sulit',
  },
  {
    // cek: Math.abs(Math.acos(1/2)/D - 60) < 1e-9
    id: 'v46',
    pertanyaan: 'Sudut antara vektor (1  0) dan vektor (1  √3) adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [1, 0], label: '(1  0)', warna: 'samping' }, { ke: [1, 1.732], label: '(1  √3)' }], jangkauan: [-1, 3, -1, 3] },
    pilihan: ['60°', '30°', '45°', '90°', '120°'],
    benar: 0,
    langkah: [
      'Hasil kali titik: 1 × 1 + 0 × √3 = 1.',
      'Panjang: |(1  0)| = 1 dan |(1  √3)| = √(1 + 3) = 2.',
      'cos θ = 1 : (1 × 2) = 1/2, jadi θ = 60°.',
    ],
    jebakan: '30° mengira sudut dari sumbu-y. Karena (1  0) adalah sumbu-x sendiri, sudutnya sama dengan arah (1  √3), yaitu tan θ = √3 → 60°.',
    alasan: 'cos θ = 1/2, θ = 60°.',
    tingkat: 'sulit',
  },
  {
    // cek: Math.abs((3*1 + 4*1)/Math.sqrt(2) - 4.95) < 0.01
    id: 'v47',
    pertanyaan: 'Panjang proyeksi vektor (3  4) pada vektor (1  1) kira-kira ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [3, 4], label: '(3  4)' }, { ke: [1, 1], label: '(1  1)', warna: 'samping' }, { ke: [3.5, 3.5], label: 'proyeksi', warna: 'depan' }], jangkauan: [-1, 5, -1, 5] },
    pilihan: ['4,95', '7,00', '3,50', '5,00', '2,47'],
    benar: 0,
    langkah: [
      'Panjang proyeksi = (a · b) : |b|.',
      'a · b = 3 × 1 + 4 × 1 = 7; |b| = √2.',
      '7 : √2 ≈ 4,95.',
    ],
    jebakan: '7,00 lupa membagi dengan |b|. 3,50 membagi dengan |b|² = 2, itu pengali untuk VEKTOR proyeksinya (3,5  3,5), yang panjangnya memang 4,95.',
    alasan: '7/√2 ≈ 4,95.',
    tingkat: 'sulit',
  },
  {
    // cek: Math.abs(Math.acos(6/(4*3))/D - 60) < 1e-9
    id: 'v48',
    pertanyaan: 'Diketahui |a| = 4, |b| = 3, dan a · b = 6. Sudut antara a dan b adalah ...',
    pilihan: ['60°', '30°', '45°', '90°', '120°'],
    benar: 0,
    langkah: [
      'a · b = |a| |b| cos θ.',
      '6 = 4 × 3 × cos θ, jadi cos θ = 6 : 12 = 1/2.',
      'θ = 60°.',
    ],
    jebakan: '30° adalah sudut dengan cos = √3/2, tertukar dengan 1/2. 90° hanya kalau hasil kali titiknya nol.',
    alasan: 'cos θ = 1/2, θ = 60°.',
    tingkat: 'sulit',
  },
  {
    // cek: 1 + 3*3 === 10
    id: 'v49',
    pertanyaan: 'Titik A(0, 1), B(2, 4), dan C(6, p) segaris. Nilai p adalah ...',
    pilihan: ['10', '7', '8', '12', '9'],
    benar: 0,
    langkah: [
      'AB = (2  3), AC = (6, p - 1).',
      'Segaris: AC = k × AB. Dari komponen mendatar, 6 = 2k, jadi k = 3.',
      'p - 1 = 3 × 3 = 9, jadi p = 10.',
    ],
    jebakan: '7 memakai k = 2 (mengira 6 adalah 2 + 2 + 2 lalu salah hitung), 12 memakai 4 × 3 tanpa mengurangi 1 dulu.',
    alasan: 'AC = 3 × AB, p = 10.',
    tingkat: 'sulit',
  },
  {
    // cek: Math.abs(Math.hypot(3, -2) - 3.61) < 0.01
    id: 'v50',
    pertanyaan: 'Diketahui a = (2  1) dan b = (-1  3). Panjang a - b kira-kira ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [2, 1], label: 'a' }, { ke: [-1, 3], label: 'b', warna: 'samping' }, { dari: [-1, 3], ke: [3, -2], label: 'a - b', warna: 'depan' }], jangkauan: [-2, 4, -1, 4] },
    pilihan: ['3,61', '2,24', '1,41', '5,00', '4,12'],
    benar: 0,
    langkah: [
      'a - b = (2 - (-1), 1 - 3) = (3  -2).',
      'Panjang = √(9 + 4) = √13 ≈ 3,61.',
      'Di gambar, a - b adalah panah dari ujung b ke ujung a.',
    ],
    jebakan: '2,24 (√5) adalah panjang a; 1,41 (√2) memakai (1  -2) karena lupa tanda pada -1.',
    alasan: '(3  -2), panjang √13 ≈ 3,61.',
    tingkat: 'sulit',
  },
  {
    // cek: Math.abs(Math.hypot(300, 50) - 304.1) < 0.1
    id: 'v51',
    pertanyaan: 'Pesawat terbang ke utara dengan kecepatan 300 km/jam. Angin bertiup ke timur 50 km/jam. Kecepatan pesawat terhadap tanah kira-kira ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [0, 300], label: '300', warna: 'depan' }, { dari: [0, 300], ke: [50, 0], label: 'angin 50', warna: 'samping' }, { ke: [50, 300], label: 'terhadap tanah' }], jangkauan: [-50, 150, -50, 350] },
    pilihan: ['304,1 km/jam', '350 km/jam', '250 km/jam', '300 km/jam', '354,1 km/jam'],
    benar: 0,
    langkah: [
      'Utara dan timur tegak lurus, jadi resultannya √(300² + 50²).',
      '√(90.000 + 2.500) = √92.500 ≈ 304,1 km/jam.',
      'Angin menyamping hanya sedikit menambah kecepatan, tetapi mengubah arah.',
    ],
    jebakan: '350 menjumlahkan seolah searah; 250 mengurangkan seolah berlawanan. Angin menyamping tidak bekerja seperti keduanya.',
    alasan: '√(300² + 50²) ≈ 304,1.',
    tingkat: 'sulit',
  },

  /* ============================ sangat sulit ============================ */
  {
    // cek: 2*3 + 1*(-6) === 0
    id: 'v27',
    pertanyaan: 'Vektor (2  k) tegak lurus dengan vektor (3  -6). Nilai k adalah ...',
    pilihan: ['1', '-1', '4', '-4', '2'],
    benar: 0,
    langkah: [
      'Tegak lurus berarti hasil kali titiknya nol.',
      '2 × 3 + k × (-6) = 0, yaitu 6 - 6k = 0.',
      'k = 1. Periksa: (2  1) · (3  -6) = 6 - 6 = 0.',
    ],
    jebakan: '-1 membawa tanda negatif dua kali. 4 mengira sejajar (2/3 = k/(-6) memberi k = -4, itu syarat SEJAJAR, bukan tegak lurus).',
    alasan: '6 - 6k = 0, k = 1.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: Math.abs((5*3 + 12*4)/5 - 12.6) < 1e-9
    id: 'v28',
    pertanyaan: 'Panjang proyeksi vektor (5  12) pada vektor (3  4) adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [5, 12], label: '(5  12)' }, { ke: [3, 4], label: '(3  4)', warna: 'samping' }, { ke: [7.56, 10.08], label: 'proyeksi', warna: 'depan' }], jangkauan: [-1, 13, -1, 14] },
    pilihan: ['2,52', '63', '13', '12,6', '5'],
    benar: 3,
    langkah: [
      'Hasil kali titik: 5 × 3 + 12 × 4 = 15 + 48 = 63.',
      'Panjang (3  4) = 5.',
      'Panjang proyeksi = 63 : 5 = 12,6.',
    ],
    jebakan: '63 lupa membagi. 2,52 membagi dengan 25 (kuadrat panjang); itu pengali VEKTOR proyeksi, bukan panjangnya. 13 adalah panjang (5  12) sendiri.',
    alasan: '63 : 5 = 12,6.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: Math.abs(Math.sqrt(25 + 9 - 2*5*3*0.5) - Math.sqrt(19)) < 1e-9
    id: 'v29',
    pertanyaan: 'Diketahui panjang a adalah 5, panjang b adalah 3, dan sudut antara keduanya 60 derajat. Panjang dari a dikurangi b adalah ...',
    pilihan: ['2', 'akar 19', 'akar 49', '8', 'akar 34'],
    benar: 1,
    langkah: [
      '|a - b|² = |a|² + |b|² - 2|a||b| cos θ (dari (a - b)·(a - b)).',
      '= 25 + 9 - 2 × 5 × 3 × cos 60° = 34 - 15 = 19.',
      '|a - b| = √19 ≈ 4,36.',
    ],
    jebakan: '2 mengurangkan panjangnya (hanya benar kalau searah); √34 mengira sudutnya 90°; √49 = 7 memakai tanda plus, itu |a + b|.',
    alasan: '34 - 15 = 19.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: 7 + 2*4 === 15
    id: 'v30',
    pertanyaan: 'Titik A(1, 2, 3), B(3, 5, 7), dan C(7, 11, p) terletak pada satu garis lurus. Nilai p adalah ...',
    pilihan: ['8', '11', '13', '14', '15'],
    benar: 4,
    langkah: [
      'AB = (2  3  4), BC = (4  6, p - 7).',
      'Dua komponen pertama: 4 = 2 × 2 dan 6 = 2 × 3, pengalinya 2.',
      'p - 7 = 2 × 4 = 8, jadi p = 15.',
    ],
    jebakan: '11 memakai pengali 1. Di ruang tiga dimensi, ketiga komponen harus memakai pengali yang sama; dua komponen pertama sudah memberitahunya.',
    alasan: 'BC = 2 × AB, p = 15.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: Math.abs(Math.atan2(Math.sqrt(3), 1)/D - 60) < 1e-9
    id: 'v31',
    pertanyaan: 'Vektor (1  akar 3) membentuk sudut berapa terhadap sumbu-x positif?',
    gambar: { jenis: 'vektor', panah: [{ ke: [1, 1.732], label: '(1  √3)' }], komponen: [0], jangkauan: [-1, 3, -1, 3] },
    pilihan: ['45 derajat', '30 derajat', '60 derajat', '90 derajat', '120 derajat'],
    benar: 2,
    langkah: [
      'Panjangnya √(1 + 3) = 2.',
      'cos θ = mendatar : panjang = 1 : 2, jadi θ = 60°. Atau tan θ = √3 : 1 = √3, juga 60°.',
    ],
    jebakan: '30° membandingkan komponen tegak dengan panjang (sin), lalu membaca sudutnya dari sumbu yang salah.',
    alasan: 'cos θ = 1/2, θ = 60°.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: Math.abs(3 * (4/5) - 2.4) < 1e-9
    id: 'v32',
    pertanyaan: 'Sungai selebar 4 km mengalir dengan arus 3 km per jam. Perahu didayung tegak lurus terhadap tepi dengan kecepatan 5 km per jam. Sejauh berapa perahu itu hanyut ke hilir saat mendarat?',
    gambar: { jenis: 'vektor', panah: [{ ke: [0, 5], label: 'dayung 5', warna: 'depan' }, { dari: [0, 5], ke: [3, 0], label: 'arus 3', warna: 'samping' }, { ke: [3, 5], label: 'gerak' }], jangkauan: [-1, 5, -1, 7] },
    pilihan: ['2,4 km', '3 km', '4 km', '1,25 km', '0,8 km'],
    benar: 0,
    langkah: [
      'Yang menyeberangkan perahu hanya komponen tegak lurus tepi: 5 km/jam.',
      'Waktu menyeberang 4 km = 4 : 5 = 0,8 jam.',
      'Selama 0,8 jam arus membawanya 3 × 0,8 = 2,4 km ke hilir.',
    ],
    jebakan: '3 km mengira waktunya 1 jam. 0,8 km menjawab waktunya, bukan jaraknya.',
    alasan: '0,8 jam × 3 km/jam = 2,4 km.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: Math.abs(Math.acos((49 - 9 - 25)/(2*3*5))/D - 60) < 1e-9
    id: 'v52',
    pertanyaan: 'Diketahui a + b + c = 0, dengan |a| = 3, |b| = 5, dan |c| = 7. Sudut antara a dan b adalah ...',
    pilihan: ['60°', '120°', '90°', '30°', '45°'],
    benar: 0,
    langkah: [
      'Dari a + b + c = 0: a + b = -c, jadi |a + b| = |c| = 7.',
      '|a + b|² = |a|² + |b|² + 2|a||b| cos θ: 49 = 9 + 25 + 30 cos θ.',
      '30 cos θ = 15, cos θ = 1/2, θ = 60°.',
    ],
    jebakan: '120° adalah sudut DALAM segitiga yang dibentuk ketiga panah (ujung ke pangkal); sudut antara vektor diukur pangkal ke pangkal, pelurusnya: 180° - 120° = 60°.',
    alasan: 'cos θ = (49 - 34)/30 = 1/2, θ = 60°.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: Math.abs(Math.sqrt(3 + 1 + 2*1.5) - Math.sqrt(7)) < 1e-9
    id: 'v53',
    pertanyaan: 'Diketahui |a| = √3, |b| = 1, dan |a - b| = 1. Panjang a + b adalah ...',
    pilihan: ['√7', '√3', '√5', '2√2', '3'],
    benar: 0,
    langkah: [
      '|a - b|² = |a|² + |b|² - 2 a·b: 1 = 3 + 1 - 2 a·b, jadi a·b = 3/2.',
      '|a + b|² = |a|² + |b|² + 2 a·b = 3 + 1 + 3 = 7.',
      '|a + b| = √7.',
    ],
    jebakan: '√5 menganggap a·b = 1/2 (salah hitung 1 = 4 - 2a·b). 3 mengira a dan b searah (√3 + 1 tidak sama dengan 3 pun).',
    alasan: 'a·b = 3/2, |a + b|² = 7.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: Math.abs(Math.sqrt(18) - 4.24) < 0.01
    id: 'v54',
    pertanyaan: 'Vektor (k  6) sejajar dengan vektor (3  k), dengan k positif. Nilai k kira-kira ...',
    pilihan: ['4,24', '2,00', '3,00', '18,00', '9,00'],
    benar: 0,
    langkah: [
      'Sejajar: perbandingan komponennya sama, k : 3 = 6 : k.',
      'k² = 18, jadi k = √18 = 3√2 ≈ 4,24 (yang positif).',
      'Periksa: (4,24  6) dan (3  4,24) sama-sama punya perbandingan 1,41.',
    ],
    jebakan: '18 berhenti di k²; 2 dan 3 mencoba menyamakan angka tanpa perbandingan silang.',
    alasan: 'k² = 18, k = 3√2.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: (5*3 + 5*1)/(3*3 + 1*1) === 2
    id: 'v55',
    pertanyaan: 'Vektor proyeksi ortogonal (5  5) pada (3  1) adalah ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [5, 5], label: '(5  5)' }, { ke: [3, 1], label: '(3  1)', warna: 'samping' }, { ke: [6, 2], label: 'proyeksi', warna: 'depan' }], jangkauan: [-1, 8, -1, 7] },
    pilihan: ['(6  2)', '(3  1)', '(2  2)', '(9  3)', '(5  5)'],
    benar: 0,
    langkah: [
      'Vektor proyeksi = (a·b : |b|²) × b.',
      'a·b = 15 + 5 = 20; |b|² = 9 + 1 = 10.',
      '(20 : 10) × (3  1) = 2 × (3  1) = (6  2).',
    ],
    jebakan: '(3  1) lupa mengalikan dengan 2. (9  3) memakai pengali 3 (dari a·b : |b| = 20 : √10 ≈ 6,3 yang dibulatkan seenaknya).',
    alasan: '2 × (3  1) = (6  2).',
    tingkat: 'sangat sulit',
  },
  {
    // cek: 1 + (7 - 1)/3 === 3 && 2 + (5 - 2)/3 === 3
    id: 'v56',
    pertanyaan: 'Titik P membagi ruas AB dengan perbandingan AP : PB = 1 : 2, A(1, 2) dan B(7, 5). Vektor posisi P adalah ...',
    gambar: { jenis: 'vektor', panah: [{ dari: [1, 2], ke: [6, 3], label: 'AB' }, { ke: [3, 3], label: 'OP', warna: 'depan' }], jangkauan: [-1, 8, -1, 6] },
    pilihan: ['(3  3)', '(5  4)', '(4  3,5)', '(2  1)', '(9  7)'],
    benar: 0,
    langkah: [
      'AP : PB = 1 : 2 berarti P berada sepertiga perjalanan dari A ke B.',
      'AB = (6  3), sepertiganya (2  1).',
      'OP = OA + (1/3) AB = (1  2) + (2  1) = (3  3).',
    ],
    jebakan: '(5  4) menaruh P di dua pertiga (PA : PB tertukar). (2  1) adalah perpindahan AP, bukan posisi P.',
    alasan: 'OP = (1  2) + (2  1) = (3  3).',
    tingkat: 'sangat sulit',
  },
  {
    // cek: Math.abs(Math.sqrt(1 + 1 + 2*0.5) - 1.73) < 0.01
    id: 'v57',
    pertanyaan: 'a dan b adalah vektor satuan dengan sudut 60° di antaranya. Panjang a + b kira-kira ...',
    pilihan: ['1,73', '2,00', '1,00', '1,41', '0,50'],
    benar: 0,
    langkah: [
      '|a + b|² = |a|² + |b|² + 2|a||b| cos 60° = 1 + 1 + 2 × 1 × 1 × 1/2 = 3.',
      '|a + b| = √3 ≈ 1,73.',
    ],
    jebakan: '2,00 menjumlahkan panjang seolah searah; 1,41 (√2) mengira sudutnya 90°.',
    alasan: '√(1 + 1 + 1) = √3.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: Math.abs(Math.hypot(2.5, 1.5) - 2.92) < 0.01
    id: 'v58',
    pertanyaan: 'Pada segitiga ABC, AB = (4  0) dan AC = (1  3). Panjang garis berat dari A ke titik tengah BC kira-kira ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [4, 0], label: 'AB', warna: 'samping' }, { ke: [1, 3], label: 'AC' }, { ke: [2.5, 1.5], label: 'AM', warna: 'depan' }], jangkauan: [-1, 5, -1, 4] },
    pilihan: ['2,92', '3,50', '2,50', '4,00', '3,16'],
    benar: 0,
    langkah: [
      'Titik tengah M dari BC: AM = (AB + AC) : 2 = (5  3) : 2 = (2,5  1,5).',
      'Panjang AM = √(6,25 + 2,25) = √8,5 ≈ 2,92.',
    ],
    jebakan: '3,50 mengira panjang AM = (|AB| + |AC|) : 2 = (4 + √10) : 2; panjang tidak boleh dirata-ratakan, vektornya yang dirata-ratakan.',
    alasan: 'AM = (2,5  1,5), panjang √8,5.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: Math.abs(Math.acos(1/Math.sqrt(50))/D - 81.87) < 0.01
    id: 'v59',
    pertanyaan: 'Sudut antara a = (1  2) dan b = (3  -1) kira-kira ...',
    gambar: { jenis: 'vektor', panah: [{ ke: [1, 2], label: 'a' }, { ke: [3, -1], label: 'b', warna: 'samping' }], jangkauan: [-1, 4, -2, 3] },
    pilihan: ['81,9°', '45°', '90°', '63,4°', '18,4°'],
    benar: 0,
    langkah: [
      'a·b = 3 - 2 = 1.',
      '|a| = √5, |b| = √10, sehingga |a||b| = √50 ≈ 7,07.',
      'cos θ = 1 : 7,07 ≈ 0,141, jadi θ ≈ 81,9°.',
    ],
    jebakan: '90° menggoda karena a·b kecil, tetapi tidak nol: hampir tegak lurus bukan tegak lurus. 63,4° dan 18,4° adalah arah a dan b masing-masing dari sumbu-x, yang selisihnya memang 81,9°.',
    alasan: 'cos θ = 1/√50, θ ≈ 81,9°.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: (2 + -1*1)*2 + (1 + -1*3)*1 === 0
    id: 'v60',
    pertanyaan: 'Diketahui a = (2  1) dan b = (1  3). Nilai t supaya a + t·b tegak lurus dengan a adalah ...',
    pilihan: ['-1', '1', '-5', '5', '0'],
    benar: 0,
    langkah: [
      'a + t·b = (2 + t, 1 + 3t).',
      'Tegak lurus dengan a berarti hasil kali titiknya nol: 2(2 + t) + 1(1 + 3t) = 0.',
      '4 + 2t + 1 + 3t = 0, jadi 5t = -5, t = -1.',
      'Periksa: a - b = (1  -2), dan (1  -2)·(2  1) = 2 - 2 = 0.',
    ],
    jebakan: '1 lupa tanda saat memindah ruas. 0 mengira a sendiri tegak lurus dengan a, padahal a·a = 5, bukan nol.',
    alasan: '5 + 5t = 0, t = -1.',
    tingkat: 'sangat sulit',
  },
]
