/**
 * Bank soal latihan Vektor: 60 soal, 15 tiap tingkat.
 *
 * 14 Sep 2026: seluruh pembahasan ditulis ulang meniru cara mathcyber1997
 * (catatan belajar `PELAJARI BENTUK SOAL MATEMATIKA/CATATAN-BELAJAR-PEMBAHASAN.md`
 * bagian 4.6): pembuka "Diketahui a = (1, 2), b = (3, 0)." dengan bentuk
 * i, j ditulis ulang ke koordinat, operasi per komponen ditulis lengkap,
 * "Karena a ⊥ b, a • b = 0 sehingga ditulis ...", rumus disebut sebelum
 * dipakai ("Panjang proyeksi skalar a pada b dinyatakan oleh a • b/|b|"),
 * sudut lewat "Misalkan θ sudut antara keduanya, cos θ = ...", akar yang
 * tidak memenuhi dibuang beralasan, penutup "Jadi, ... (Jawaban D)".
 * Gambar bantu: panah berpangkal sama dengan komponennya, resultan ujung ke
 * pangkal, bayangan proyeksi tegak lurus, sudut antar panah.
 * Vektor ditulis (3, 4), bukan (3  4); akar dan derajat memakai lambang.
 *
 * Id soal lama dipertahankan. Delapan soal kembar atau terlalu tipis diganti
 * jenis yang belum ada (pola mathcyber1997, ditulis sendiri): v36 dan v34
 * jadi v61 (jumlah vektor i, j, k) dan v62 (panjang vektor 3D); v09 dan v43
 * jadi v63 (2a + b − c di ruang) dan v64 (tegak lurus dengan parameter);
 * v45 dan v25 jadi v65 ((a + b) • (a − b) dari panjangnya) dan v66 (proyeksi
 * dengan parameter linear); v31 dan v54 jadi v67 (aturan kosinus vektor,
 * |a − b| = √37) dan v68 (proyeksi dengan parameter yang dikuadratkan).
 * Jawaban benar disebar merata oleh `alat/acak_pilihan.mjs`.
 *
 * Tiap jawaban berangka punya `// cek:` yang dijalankan `alat/cek_kuis.mjs`;
 * `--ketat` juga memeriksa gaya pembahasannya.
 */
export type { TingkatKuis, SoalKuis } from '@/content/tipe'
import type { ButirKuisBab, SoalKuis } from '@/content/tipe'

export const KUIS: SoalKuis[] = [
  // ================================================================ MUDAH
  {
    id: 'v01',
    tingkat: 'mudah',
    pertanyaan: 'Besaran berikut yang TERMASUK vektor adalah…',
    pilihan: ['perpindahan', 'suhu', 'massa', 'waktu', 'panjang tali'],
    benar: 0,
    langkah: [
      'Ingat bahwa vektor adalah besaran yang mempunyai besar DAN arah, sedangkan skalar hanya mempunyai besar.',
      'Periksa tiap pilihan: suhu, massa, waktu, dan panjang tali cukup dinyatakan dengan satu angka beserta satuannya (30°C, 2 kg, 5 detik, 3 m); tidak ada arahnya, jadi keempatnya skalar.',
      'Perpindahan berbeda: "5 km" belum lengkap tanpa arahnya, misalnya 5 km ke utara; dua perpindahan yang sama jauhnya tetapi berlawanan arah membawa ke tempat yang berbeda. Perpindahan mempunyai besar dan arah, sehingga perpindahan adalah vektor.',
      'Jadi, besaran yang termasuk vektor adalah perpindahan. (Jawaban A)',
    ],
    jebakan: 'Pilihan E, panjang tali, tampak benar karena tali bisa "diarahkan", tetapi panjangnya sendiri tidak punya arah; yang punya arah adalah gaya tarik pada tali, bukan panjangnya. Pilihan B, suhu, tidak punya arah walau bisa negatif; tanda negatif bukan arah.',
    alasan: 'Vektor punya besar dan arah; hanya perpindahan yang begitu.',
  },
  {
    // cek: Math.hypot(3, 4) === 5
    id: 'v02',
    tingkat: 'mudah',
    pertanyaan: 'Panjang vektor (3, 4) adalah…',
    gambar: { jenis: 'vektor', panah: [{ ke: [3, 4], label: '(3, 4)' }] },
    pilihan: ['7', '12', '25', '5', '1'],
    benar: 3,
    langkah: [
      'Panjang (besar) vektor a = (a₁, a₂) dinyatakan oleh |a| = √(a₁² + a₂²), yaitu teorema Pythagoras pada segitiga siku-siku yang kakinya komponen mendatar dan tegak.',
      {
        teks: 'Komponen mendatar 3 (biru) dan komponen tegak 4 (merah) membentuk segitiga siku-siku dengan panah sebagai sisi miringnya, seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [3, 4], label: '|a| = ?' }], komponen: [0] },
      },
      'Dengan demikian, |a| = √(3² + 4²) = √(9 + 16) = √25 = 5.',
      'Jadi, panjang vektor (3, 4) adalah 5. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 7, menjumlahkan komponennya, 3 + 4, padahal panjang panah bukan jumlah kakinya. Pilihan C, 25, berhenti pada 3² + 4² tanpa menarik akar. Pilihan B, 12, mengalikan komponennya.',
    alasan: '|a| = √(3² + 4²) = 5 (Pythagoras).',
  },
  {
    // cek: 2 + 3 === 5 && 5 + (-1) === 4
    id: 'v03',
    tingkat: 'mudah',
    pertanyaan: 'Hasil dari (2, 5) + (3, −1) adalah…',
    gambar: { jenis: 'vektor', panah: [{ ke: [2, 5], label: '(2, 5)' }, { dari: [2, 5], ke: [3, -1], label: '(3, −1)' }] },
    pilihan: ['(6, −5)', '(5, 6)', '(5, 4)', '(−1, 6)', '(5, −4)'],
    benar: 2,
    langkah: [
      'Penjumlahan vektor dilakukan per komponen: komponen mendatar dijumlahkan dengan komponen mendatar, komponen tegak dengan komponen tegak.',
      'Dengan demikian, (2, 5) + (3, −1) = (2 + 3, 5 + (−1)) = (5, 4).',
      {
        teks: 'Secara gambar, panah kedua dipasang di ujung panah pertama (aturan ujung ke pangkal), dan hasilnya adalah panah dari pangkal pertama ke ujung kedua, yaitu ke titik (5, 4), seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [2, 5], label: '(2, 5)' }, { dari: [2, 5], ke: [3, -1], label: '(3, −1)' }, { ke: [5, 4], label: '(5, 4)', warna: 'depan' }] },
      },
      'Jadi, hasil dari (2, 5) + (3, −1) adalah (5, 4). (Jawaban C)',
    ],
    jebakan: 'Pilihan E, (5, −4), salah tanda pada komponen tegak: 5 + (−1) = 4, bukan −4. Pilihan B, (5, 6), mengurangkan −1 alih-alih menambahkannya. Pilihan A, (6, −5), mengalikan komponen-komponennya.',
    alasan: 'Per komponen: (2 + 3, 5 − 1) = (5, 4).',
  },
  {
    // cek: 7 - 3 === 4 && 2 - 5 === -3
    id: 'v04',
    tingkat: 'mudah',
    pertanyaan: 'Hasil dari (7, 2) − (3, 5) adalah…',
    pilihan: ['(4, 3)', '(4, −3)', '(−4, 3)', '(10, 7)', '(4, 7)'],
    benar: 1,
    langkah: [
      'Pengurangan vektor dilakukan per komponen, sama seperti penjumlahan: (a₁, a₂) − (b₁, b₂) = (a₁ − b₁, a₂ − b₂).',
      'Dengan demikian, (7, 2) − (3, 5) = (7 − 3, 2 − 5) = (4, −3).',
      {
        teks: 'Sebagai pemeriksaan, (3, 5) + (4, −3) = (7, 2), kembali ke vektor pertama; pada gambar, panah selisih menghubungkan ujung (3, 5) ke ujung (7, 2).',
        gambar: { jenis: 'vektor', panah: [{ ke: [7, 2], label: '(7, 2)' }, { ke: [3, 5], label: '(3, 5)', warna: 'samping' }, { dari: [3, 5], ke: [4, -3], label: '(4, −3)', warna: 'depan' }], jangkauan: [-1, 9, -1, 7] },
      },
      'Jadi, hasil dari (7, 2) − (3, 5) adalah (4, −3). (Jawaban B)',
    ],
    jebakan: 'Pilihan A, (4, 3), lupa tanda negatif pada 2 − 5 = −3. Pilihan C, (−4, 3), menghitung (3, 5) − (7, 2), urutannya terbalik. Pilihan D, (10, 7), menjumlahkan alih-alih mengurangkan.',
    alasan: 'Per komponen: (7 − 3, 2 − 5) = (4, −3).',
  },
  {
    // cek: 3 * 2 === 6 && 3 * -1 === -3
    id: 'v05',
    tingkat: 'mudah',
    pertanyaan: 'Hasil dari 3 × (2, −1) adalah…',
    gambar: { jenis: 'vektor', panah: [{ ke: [2, -1], label: '(2, −1)' }], jangkauan: [-1, 8, -4, 2] },
    pilihan: ['(2, −3)', '(6, −1)', '(5, 2)', '(6, −3)', '(6, 3)'],
    benar: 3,
    langkah: [
      'Perkalian vektor dengan skalar k dilakukan pada SETIAP komponen: k(a₁, a₂) = (ka₁, ka₂); panjangnya menjadi k kali, arahnya tetap bila k positif.',
      'Dengan demikian, 3 × (2, −1) = (3 · 2, 3 · (−1)) = (6, −3).',
      {
        teks: 'Pada gambar, panah hasil searah dengan (2, −1) dan tiga kali lebih panjang.',
        gambar: { jenis: 'vektor', panah: [{ ke: [6, -3], label: '(6, −3)', warna: 'depan' }, { ke: [2, -1], label: '(2, −1)' }], jangkauan: [-1, 8, -4, 2] },
      },
      'Jadi, hasil dari 3 × (2, −1) adalah (6, −3). (Jawaban D)',
    ],
    jebakan: 'Pilihan B, (6, −1), hanya mengalikan komponen pertama. Pilihan E, (6, 3), menghilangkan tanda negatif; 3 × (−1) tetap −3. Pilihan C, (5, 2), menambahkan 3 pada tiap komponen alih-alih mengalikannya.',
    alasan: 'Tiap komponen dikali 3: (6, −3).',
  },
  {
    // cek: 5 - 2 === 3 && 7 - 3 === 4
    id: 'v06',
    tingkat: 'mudah',
    pertanyaan: 'Diketahui A(2, 3) dan B(5, 7). Vektor AB adalah…',
    gambar: { jenis: 'vektor', panah: [{ dari: [2, 3], ke: [3, 4], label: 'AB' }], jangkauan: [-1, 7, -1, 8] },
    pilihan: ['(7, 10)', '(3, 4)', '(−3, −4)', '(3, −4)', '(2, 3)'],
    benar: 1,
    langkah: [
      'Vektor AB adalah perpindahan dari titik A ke titik B, dinyatakan oleh koordinat ujung dikurangi koordinat pangkal: AB = B − A.',
      'Dengan demikian, AB = (5 − 2, 7 − 3) = (3, 4).',
      {
        teks: 'Pada gambar, dari A ke B bergerak 3 satuan ke kanan (biru) dan 4 satuan ke atas (merah).',
        gambar: { jenis: 'vektor', panah: [{ dari: [2, 3], ke: [3, 4], label: 'AB = (3, 4)' }], komponen: [0], jangkauan: [-1, 7, -1, 8] },
      },
      'Jadi, vektor AB adalah (3, 4). (Jawaban B)',
    ],
    jebakan: 'Pilihan C, (−3, −4), menghitung A − B, yaitu vektor BA yang arahnya berlawanan. Pilihan A, (7, 10), menjumlahkan kedua koordinat. Pilihan E, (2, 3), menyalin koordinat A, padahal vektor AB tidak bergantung pada letak pangkalnya.',
    alasan: 'AB = B − A = (5 − 2, 7 − 3) = (3, 4).',
  },
  {
    // cek: Math.hypot(-8, 6) === 10
    id: 'v07',
    tingkat: 'mudah',
    pertanyaan: 'Panjang vektor (−8, 6) adalah…',
    gambar: { jenis: 'vektor', panah: [{ ke: [-8, 6], label: '(−8, 6)' }] },
    pilihan: ['10', '−10', '2', '14', '100'],
    benar: 0,
    langkah: [
      'Panjang vektor (a₁, a₂) dinyatakan oleh |a| = √(a₁² + a₂²). Tanda komponen tidak berpengaruh karena dikuadratkan.',
      {
        teks: 'Komponen mendatar −8 (ke kiri) dan tegak 6 (ke atas) membentuk segitiga siku-siku dengan panah sebagai sisi miringnya, seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [-8, 6], label: '|a| = ?' }], komponen: [0] },
      },
      'Dengan demikian, |a| = √((−8)² + 6²) = √(64 + 36) = √100 = 10.',
      'Jadi, panjang vektor (−8, 6) adalah 10. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, −10, memberi tanda negatif karena komponen pertamanya negatif, padahal panjang tidak pernah negatif. Pilihan E, 100, lupa menarik akar. Pilihan C, 2, menjumlahkan −8 + 6.',
    alasan: '|a| = √(64 + 36) = 10; panjang selalu positif.',
  },
  {
    id: 'v08',
    tingkat: 'mudah',
    pertanyaan: 'Vektor lawan dari (5, −2) adalah…',
    gambar: { jenis: 'vektor', panah: [{ ke: [5, -2], label: '(5, −2)' }], jangkauan: [-6, 6, -3, 3] },
    pilihan: ['(2, −5)', '(−5, −2)', '(−5, 2)', '(5, 2)', '(−2, 5)'],
    benar: 2,
    langkah: [
      'Vektor lawan dari a adalah −a: vektor yang panjangnya sama tetapi arahnya berlawanan, sehingga a + (−a) = 0.',
      'Untuk memperoleh −a, setiap komponen diberi tanda berlawanan: −(5, −2) = (−5, 2).',
      {
        teks: 'Pada gambar, kedua panah sama panjang dan menunjuk ke arah yang tepat berlawanan.',
        gambar: { jenis: 'vektor', panah: [{ ke: [5, -2], label: '(5, −2)' }, { ke: [-5, 2], label: '(−5, 2)', warna: 'depan' }], jangkauan: [-6, 6, -3, 3] },
      },
      'Jadi, vektor lawan dari (5, −2) adalah (−5, 2). (Jawaban C)',
    ],
    jebakan: 'Pilihan B, (−5, −2), hanya membalik tanda komponen pertama; kedua komponen harus dibalik. Pilihan E, (−2, 5), menukar urutan komponen sekaligus membalik tanda, bukan lawan tetapi vektor lain.',
    alasan: '−(5, −2) = (−5, 2): kedua komponen berganti tanda.',
  },
  {
    id: 'v17',
    tingkat: 'mudah',
    pertanyaan: 'Panjang vektor satuan dari sebuah vektor yang panjangnya 17 adalah…',
    pilihan: ['17', '1/17', '√17', 'bergantung arahnya', '1'],
    benar: 4,
    langkah: [
      'Vektor satuan dari a, ditulis â = a/|a|, adalah vektor yang searah dengan a dan panjangnya tepat 1; itulah arti kata "satuan".',
      'Berapa pun panjang a, pembagian dengan |a| membuat panjangnya menjadi |a|/|a| = 1. Untuk |a| = 17, panjang vektor satuannya 17/17 = 1.',
      'Jadi, panjang vektor satuan dari vektor yang panjangnya 17 adalah 1. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 1/17, adalah PENGALI yang dipakai untuk membuat vektor satuan (a dikali 1/17), bukan panjang hasilnya. Pilihan D tampak benar karena arah vektor satuan memang mengikuti a, tetapi panjangnya selalu 1.',
    alasan: 'Vektor satuan selalu panjangnya 1.',
  },
  {
    // cek: 4 - 1 === 3 && 3 - 1 === 2
    id: 'v33',
    tingkat: 'mudah',
    pertanyaan: 'Diketahui A(1, 1) dan B(4, 3). Vektor AB adalah…',
    gambar: { jenis: 'vektor', panah: [{ dari: [1, 1], ke: [3, 2], label: 'AB' }], jangkauan: [-1, 6, -1, 5] },
    pilihan: ['(5, 4)', '(3, 2)', '(−3, −2)', '(2, 3)', '(4, 3)'],
    benar: 1,
    langkah: [
      'Vektor AB dinyatakan oleh koordinat ujung dikurangi koordinat pangkal: AB = B − A.',
      'Dengan demikian, AB = (4 − 1, 3 − 1) = (3, 2).',
      {
        teks: 'Pada gambar, dari A ke B bergerak 3 satuan ke kanan dan 2 satuan ke atas.',
        gambar: { jenis: 'vektor', panah: [{ dari: [1, 1], ke: [3, 2], label: 'AB = (3, 2)' }], komponen: [0], jangkauan: [-1, 6, -1, 5] },
      },
      'Jadi, vektor AB adalah (3, 2). (Jawaban B)',
    ],
    jebakan: 'Pilihan C, (−3, −2), adalah BA, arahnya terbalik. Pilihan E, (4, 3), menyalin koordinat B seolah pangkalnya di titik asal. Pilihan A, (5, 4), menjumlahkan koordinat.',
    alasan: 'AB = B − A = (3, 2).',
  },
  {
    // cek: Math.hypot(2, 3, -6) === 7
    id: 'v62',
    tingkat: 'mudah',
    pertanyaan: 'Panjang vektor 2i + 3j − 6k adalah…',
    pilihan: ['11', '√11', '7', '49', '5'],
    benar: 2,
    langkah: [
      'Diketahui a = 2i + 3j − 6k, yang dalam bentuk koordinat ditulis a = (2, 3, −6).',
      'Panjang vektor di ruang dinyatakan oleh |a| = √(a₁² + a₂² + a₃²), perluasan teorema Pythagoras ke tiga komponen.',
      'Dengan demikian, |a| = √(2² + 3² + (−6)²) = √(4 + 9 + 36) = √49 = 7.',
      'Jadi, panjang vektor 2i + 3j − 6k adalah 7. (Jawaban C)',
    ],
    jebakan: 'Pilihan D, 49, lupa menarik akar. Pilihan A, 11, menjumlahkan besar komponennya, 2 + 3 + 6. Pilihan E, 5, salah menghitung 4 + 9 + 36 sebagai 25 atau mengabaikan komponen k.',
    alasan: '|a| = √(4 + 9 + 36) = 7.',
  },
  {
    // cek: 2 + 1 === 3 && -1 + 4 === 3 && 3 - 1 === 2
    id: 'v61',
    tingkat: 'mudah',
    pertanyaan: 'Diketahui a = 2i − j + 3k dan b = i + 4j − k. Vektor a + b adalah…',
    pilihan: ['i − 5j + 4k', '3i + 3j + 4k', '2i + 4j − 3k', '3i − 3j + 2k', '3i + 3j + 2k'],
    benar: 4,
    langkah: [
      'Tulis ulang kedua vektor ke bentuk koordinat: a = (2, −1, 3) dan b = (1, 4, −1); i, j, k hanyalah penanda komponen ke arah sumbu-x, sumbu-y, dan sumbu-z.',
      'Penjumlahan dilakukan per komponen: a + b = (2 + 1, −1 + 4, 3 + (−1)) = (3, 3, 2).',
      'Kembalikan ke bentuk i, j, k: a + b = 3i + 3j + 2k.',
      'Jadi, vektor a + b adalah 3i + 3j + 2k. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 3i + 3j + 4k, mengurangkan tanda pada komponen k: 3 + (−1) = 2, bukan 4. Pilihan D, 3i − 3j + 2k, salah tanda pada komponen j: −1 + 4 = 3. Pilihan A adalah a − b.',
    alasan: 'Per komponen: (2 + 1, −1 + 4, 3 − 1) = (3, 3, 2).',
  },
  {
    id: 'v35',
    tingkat: 'mudah',
    pertanyaan: 'Vektor 2i + 3j sama dengan…',
    gambar: { jenis: 'vektor', panah: [{ ke: [1, 0], label: 'i', warna: 'samping' }, { ke: [0, 1], label: 'j', warna: 'depan' }], jangkauan: [-1, 4, -1, 4] },
    pilihan: ['(3, 2)', '(2, 3)', '(5, 0)', '(2, 0)', '(0, 3)'],
    benar: 1,
    langkah: [
      'Ingat bahwa i = (1, 0) adalah vektor satuan ke arah sumbu-x dan j = (0, 1) vektor satuan ke arah sumbu-y.',
      'Dengan demikian, 2i + 3j = 2(1, 0) + 3(0, 1) = (2, 0) + (0, 3) = (2, 3): koefisien i menjadi komponen mendatar dan koefisien j menjadi komponen tegak.',
      {
        teks: 'Pada gambar, dua langkah i ke kanan dan tiga langkah j ke atas berakhir di titik (2, 3).',
        gambar: { jenis: 'vektor', panah: [{ ke: [1, 0], label: 'i', warna: 'samping' }, { ke: [0, 1], label: 'j', warna: 'depan' }, { ke: [2, 3], label: '2i + 3j = (2, 3)' }], komponen: [2], jangkauan: [-1, 4, -1, 4] },
      },
      'Jadi, vektor 2i + 3j sama dengan (2, 3). (Jawaban B)',
    ],
    jebakan: 'Pilihan A, (3, 2), menukar urutan komponen; koefisien i selalu ditulis dahulu. Pilihan C, (5, 0), menjumlahkan koefisien seolah i dan j searah, padahal keduanya tegak lurus.',
    alasan: 'Koefisien i dan j menjadi komponen: (2, 3).',
  },
  {
    id: 'v37',
    tingkat: 'mudah',
    pertanyaan: 'Dua vektor dikatakan SAMA jika…',
    pilihan: ['titik pangkalnya sama', 'panjangnya sama, arahnya boleh beda', 'panjangnya sama dan arahnya sama', 'keduanya digambar di tempat yang sama', 'komponen mendatarnya sama'],
    benar: 2,
    langkah: [
      'Ingat bahwa vektor ditentukan hanya oleh dua hal: besar (panjang) dan arah. Letak pangkalnya tidak termasuk; vektor boleh digeser ke mana pun asal panjang dan arahnya tetap.',
      'Karena itu dua vektor sama jika dan hanya jika panjangnya sama dan arahnya sama; dalam koordinat, semua komponennya sama.',
      {
        teks: 'Pada gambar, kedua panah (2, 3) berpangkal di tempat berbeda tetapi merupakan vektor yang sama.',
        gambar: { jenis: 'vektor', panah: [{ ke: [2, 3], label: '(2, 3)' }, { dari: [3, 1], ke: [2, 3], label: '(2, 3)', warna: 'depan' }], jangkauan: [-1, 7, -1, 6] },
      },
      'Jadi, dua vektor dikatakan sama jika panjangnya sama dan arahnya sama. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, panjang sama dan arah boleh beda, hanya memberi vektor yang sama besarnya, bukan vektor yang sama; (3, 4) dan (5, 0) sama panjang tetapi berbeda. Pilihan A dan D mengira letak pangkal ikut menentukan vektor.',
    alasan: 'Sama berarti sama panjang dan sama arah; pangkal boleh berbeda.',
  },
  {
    // cek: 4/2 === 6/3
    id: 'v38',
    tingkat: 'mudah',
    pertanyaan: 'Vektor yang SEJAJAR dengan (2, 3) adalah…',
    gambar: { jenis: 'vektor', panah: [{ ke: [2, 3], label: '(2, 3)' }], jangkauan: [-1, 8, -1, 7] },
    pilihan: ['(3, 2)', '(2, −3)', '(4, 6)', '(4, 5)', '(6, 4)'],
    benar: 2,
    langkah: [
      'Dua vektor sejajar jika yang satu merupakan kelipatan yang lain, b = k·a; dengan kata lain, perbandingan komponennya sama.',
      'Periksa (4, 6): 4/2 = 2 dan 6/3 = 2, perbandingannya sama, sehingga (4, 6) = 2(2, 3), sejajar dan dua kali lebih panjang.',
      {
        teks: 'Pilihan lain tidak berkelipatan: (3, 2) memberi 3/2 ≠ 2/3; (2, −3) memberi 1 ≠ −1; (4, 5) memberi 2 ≠ 5/3; (6, 4) memberi 3 ≠ 4/3. Pada gambar, hanya (4, 6) yang searah dengan (2, 3).',
        gambar: { jenis: 'vektor', panah: [{ ke: [2, 3], label: '(2, 3)' }, { dari: [3, 0], ke: [4, 6], label: '(4, 6) = 2(2, 3)', warna: 'depan' }], jangkauan: [-1, 8, -1, 7] },
      },
      'Jadi, vektor yang sejajar dengan (2, 3) adalah (4, 6). (Jawaban C)',
    ],
    jebakan: 'Pilihan A, (3, 2), menukar komponen; arahnya berbeda walau angkanya sama. Pilihan D, (4, 5), menambahkan 2 pada tiap komponen, padahal sejajar berarti DIKALI angka yang sama, bukan ditambah.',
    alasan: '(4, 6) = 2(2, 3): perbandingan komponen sama.',
  },
  // =============================================================== SEDANG
  {
    // cek: 2*2 + 1 + 3 === 8 && 2*(-1) + 4 - 0 === 2 && 2*3 - 2 - 5 === -1
    id: 'v63',
    tingkat: 'sedang',
    pertanyaan: 'Diketahui a = (2, −1, 3), b = (1, 4, −2), dan c = (−3, 0, 5). Vektor 2a + b − c adalah…',
    pilihan: ['(2, 2, 9)', '(8, 2, 9)', '(8, 2, −1)', '(5, 2, −1)', '(8, −2, −1)'],
    benar: 2,
    langkah: [
      'Diketahui a = (2, −1, 3), b = (1, 4, −2), dan c = (−3, 0, 5). Hitung dulu 2a dengan mengalikan tiap komponen: 2a = (4, −2, 6).',
      'Dengan demikian, 2a + b − c = (4, −2, 6) + (1, 4, −2) − (−3, 0, 5) = (4 + 1 + 3, −2 + 4 − 0, 6 − 2 − 5) = (8, 2, −1); pengurangan −(−3) menjadi +3 pada komponen pertama.',
      'Jadi, vektor 2a + b − c adalah (8, 2, −1). (Jawaban C)',
    ],
    jebakan: 'Pilihan B, (8, 2, 9), salah tanda pada komponen ketiga (menambahkan 5 alih-alih mengurangkannya). Pilihan D, (5, 2, −1), keliru pada −(−3): mengurangkan 3 alih-alih menambahkannya. Pilihan E salah tanda pada komponen kedua.',
    alasan: 'Per komponen: (4 + 1 + 3, −2 + 4, 6 − 2 − 5) = (8, 2, −1).',
  },
  {
    // cek: Math.abs(8/10 - 0.8) < 1e-9 && Math.abs(-6/10 + 0.6) < 1e-9
    id: 'v10',
    tingkat: 'sedang',
    pertanyaan: 'Vektor satuan yang searah dengan (8, −6) adalah…',
    gambar: { jenis: 'vektor', panah: [{ ke: [8, -6], label: '(8, −6)' }], jangkauan: [-1, 9, -7, 1] },
    pilihan: ['(0,57; −0,43)', '(8, −6)', '(−0,8; 0,6)', '(4, −3)', '(0,8; −0,6)'],
    benar: 4,
    langkah: [
      'Vektor satuan yang searah dengan a dinyatakan oleh â = a/|a|: vektor a dibagi panjangnya sendiri, sehingga arahnya tetap dan panjangnya menjadi 1.',
      'Hitung panjangnya: |a| = √(8² + (−6)²) = √(64 + 36) = √100 = 10.',
      'Dengan demikian, â = (8, −6)/10 = (8/10, −6/10) = (0,8; −0,6).',
      {
        teks: 'Sebagai pemeriksaan, |â| = √(0,64 + 0,36) = √1 = 1, dan arahnya sama dengan (8, −6), seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [8, -6], label: '(8, −6)' }, { ke: [0.8, -0.6], label: 'â', warna: 'depan' }], jangkauan: [-1, 9, -7, 1] },
      },
      'Jadi, vektor satuan yang searah dengan (8, −6) adalah (0,8; −0,6). (Jawaban E)',
    ],
    jebakan: 'Pilihan D, (4, −3), memang searah tetapi panjangnya 5, bukan 1. Pilihan C, (−0,8; 0,6), panjangnya 1 tetapi arahnya BERLAWANAN. Pilihan A, (0,57; −0,43), membagi dengan 14 (jumlah besar komponen), bukan dengan panjang 10.',
    alasan: 'â = a/|a| = (8, −6)/10 = (0,8; −0,6).',
  },
  {
    // cek: Math.hypot(9, 12) === 15
    id: 'v11',
    tingkat: 'sedang',
    pertanyaan: 'Dua gaya bekerja pada satu titik: 9 newton ke timur dan 12 newton ke utara. Besar resultannya adalah…',
    gambar: { jenis: 'vektor', panah: [{ ke: [9, 0], label: '9 N', warna: 'samping' }, { dari: [9, 0], ke: [0, 12], label: '12 N', warna: 'depan' }], jangkauan: [-1, 11, -1, 14] },
    pilihan: ['3 newton', '21 newton', '108 newton', '10,5 newton', '15 newton'],
    benar: 4,
    langkah: [
      'Misalkan arah timur sebagai sumbu-x positif dan utara sebagai sumbu-y positif, sehingga F₁ = (9, 0) dan F₂ = (0, 12) dalam newton.',
      'Resultan adalah jumlah vektor: R = F₁ + F₂ = (9 + 0, 0 + 12) = (9, 12).',
      {
        teks: 'Karena kedua gaya saling tegak lurus, resultan menjadi sisi miring segitiga siku-siku berkaki 9 dan 12, seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [9, 0], label: '9 N', warna: 'samping' }, { dari: [9, 0], ke: [0, 12], label: '12 N', warna: 'depan' }, { ke: [9, 12], label: 'R = ?' }], jangkauan: [-1, 11, -1, 14] },
      },
      'Dengan teorema Pythagoras, |R| = √(9² + 12²) = √(81 + 144) = √225 = 15 newton.',
      'Jadi, besar resultan kedua gaya adalah 15 newton. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 21 newton, menjumlahkan besar gaya seolah searah; itu hanya berlaku bila keduanya sejajar. Pilihan A, 3 newton, mengurangkannya seolah berlawanan arah. Pilihan C, 108, mengalikan.',
    alasan: 'Tegak lurus: |R| = √(9² + 12²) = 15 N.',
  },
  {
    // cek: Math.abs(Math.hypot(4, -6) - 2*Math.sqrt(13)) < 1e-9
    id: 'v12',
    tingkat: 'sedang',
    pertanyaan: 'Diketahui A(−1, 4) dan B(3, −2). Panjang vektor AB adalah…',
    gambar: { jenis: 'vektor', panah: [{ dari: [-1, 4], ke: [4, -6], label: 'AB' }], jangkauan: [-2, 5, -3, 5] },
    pilihan: ['2', '10', '√20', '52', '2√13'],
    benar: 4,
    langkah: [
      'Pertama, tentukan vektor AB = B − A = (3 − (−1), −2 − 4) = (4, −6).',
      {
        teks: 'Komponen mendatar 4 dan tegak −6 membentuk segitiga siku-siku dengan AB sebagai sisi miringnya, seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ dari: [-1, 4], ke: [4, -6], label: 'AB = (4, −6)' }], komponen: [0], jangkauan: [-2, 5, -3, 5] },
      },
      'Dengan demikian, |AB| = √(4² + (−6)²) = √(16 + 36) = √52 = √(4 · 13) = 2√13.',
      'Jadi, panjang vektor AB adalah 2√13. (Jawaban E)',
    ],
    jebakan: 'Pilihan D, 52, lupa menarik akar. Pilihan C, √20, menghitung koordinat B saja seolah pangkalnya di titik asal, atau salah mengurangkan −2 − 4 sebagai 2. Pilihan A, 2, hanya mengambil faktor 2 dari 2√13.',
    alasan: 'AB = (4, −6); |AB| = √52 = 2√13.',
  },
  {
    // cek: 10 / 2 === 5
    id: 'v13',
    tingkat: 'sedang',
    pertanyaan: 'Vektor (3, p) sejajar dengan vektor (6, 10). Nilai p adalah…',
    pilihan: ['7', '3', '4', '20', '5'],
    benar: 4,
    langkah: [
      'Dua vektor sejajar jika yang satu kelipatan yang lain, sehingga perbandingan komponen-komponennya sama: 3/6 = p/10.',
      'Dari 3/6 = 1/2, diperoleh p/10 = 1/2, sehingga p = 5.',
      'Sebagai pemeriksaan, (6, 10) = 2(3, 5); memang berkelipatan.',
      'Jadi, nilai p adalah 5. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 7, menambahkan selisih 6 − 3 = 3 pada 10 dengan arah keliru (10 − 3), mengira sejajar berarti komponennya berselisih tetap; padahal sejajar berarti perbandingannya tetap. Pilihan D, 20, membalik perbandingan menjadi p = 10 · 2.',
    alasan: 'Sejajar: 3/6 = p/10 memberi p = 5.',
  },
  {
    // cek: 2*3 - 4 === 2 && 2*1 - (-2) === 4
    id: 'v14',
    tingkat: 'sedang',
    pertanyaan: 'Diketahui a = (3, 1) dan b = (4, −2). Hasil dari 2a − b adalah…',
    pilihan: ['(2, 4)', '(2, 0)', '(10, 0)', '(−2, −4)', '(6, −1)'],
    benar: 0,
    langkah: [
      'Diketahui a = (3, 1) dan b = (4, −2). Hitung dulu 2a = (6, 2).',
      'Dengan demikian, 2a − b = (6, 2) − (4, −2) = (6 − 4, 2 − (−2)) = (2, 4); pengurangan −(−2) menjadi +2.',
      {
        teks: 'Secara gambar, 2a − b sama dengan 2a + (−b): panah −b = (−4, 2) dipasang di ujung 2a, seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [6, 2], label: '2a' }, { dari: [6, 2], ke: [-4, 2], label: '−b', warna: 'samping' }, { ke: [2, 4], label: '2a − b = (2, 4)', warna: 'depan' }], jangkauan: [-1, 8, -1, 6] },
      },
      'Jadi, hasil dari 2a − b adalah (2, 4). (Jawaban A)',
    ],
    jebakan: 'Pilihan B, (2, 0), salah tanda: 2 − (−2) = 4, bukan 0. Pilihan C, (10, 0), menjumlahkan 2a dan b alih-alih mengurangkan. Pilihan E, (6, −1), menghitung 2a − b hanya pada komponen pertama lalu menyalin b.',
    alasan: '2a − b = (6 − 4, 2 + 2) = (2, 4).',
  },
  {
    // cek: Math.hypot(1, 2, 2) === 3
    id: 'v15',
    tingkat: 'sedang',
    pertanyaan: 'Panjang vektor (1, 2, 2) di ruang tiga dimensi adalah…',
    pilihan: ['2', '5', '9', '3', '√5'],
    benar: 3,
    langkah: [
      'Panjang vektor di ruang dinyatakan oleh |a| = √(a₁² + a₂² + a₃²), perluasan teorema Pythagoras ke tiga komponen (Pythagoras dua kali: pada alas, lalu dengan tingginya).',
      'Dengan demikian, |a| = √(1² + 2² + 2²) = √(1 + 4 + 4) = √9 = 3.',
      'Jadi, panjang vektor (1, 2, 2) adalah 3. (Jawaban D)',
    ],
    jebakan: 'Pilihan C, 9, lupa menarik akar. Pilihan B, 5, menjumlahkan komponennya. Pilihan E, √5, hanya memakai dua komponen pertama, melupakan komponen ketiga.',
    alasan: '|a| = √(1 + 4 + 4) = 3.',
  },
  {
    // cek: 2*1 - 3 === -1 && 2*2 - (-1) === 5
    id: 'v16',
    tingkat: 'sedang',
    pertanyaan: 'Diketahui vektor posisi A(1, 2) dan B(3, −1). Hasil dari 2·OA − OB adalah…',
    pilihan: ['(−1, 5)', '(1, 5)', '(5, 3)', '(−1, 3)', '(5, 5)'],
    benar: 0,
    langkah: [
      'Vektor posisi titik A adalah OA = (1, 2) dan vektor posisi titik B adalah OB = (3, −1), yaitu vektor dari titik asal ke titik itu.',
      'Hitung dulu 2·OA = (2, 4). Dengan demikian, 2·OA − OB = (2, 4) − (3, −1) = (2 − 3, 4 − (−1)) = (−1, 5).',
      'Jadi, hasil dari 2·OA − OB adalah (−1, 5). (Jawaban A)',
    ],
    jebakan: 'Pilihan B, (1, 5), salah tanda pada 2 − 3 = −1. Pilihan D, (−1, 3), salah tanda pada 4 − (−1) = 5. Pilihan E, (5, 5), menjumlahkan alih-alih mengurangkan pada komponen pertama.',
    alasan: '2·OA − OB = (2 − 3, 4 + 1) = (−1, 5).',
  },
  {
    // cek: Math.hypot(3, 4) === 5
    id: 'v18',
    tingkat: 'sedang',
    pertanyaan: 'Perahu didayung tegak lurus menyeberangi sungai dengan perpindahan 4 km tiap jam, sementara arus membawanya 3 km tiap jam ke hilir. Jarak yang benar-benar ditempuh perahu dalam satu jam adalah…',
    gambar: { jenis: 'vektor', panah: [{ ke: [0, 4], label: 'dayung 4', warna: 'depan' }, { dari: [0, 4], ke: [3, 0], label: 'arus 3', warna: 'samping' }], jangkauan: [-1, 5, -1, 6] },
    pilihan: ['4 km', '7 km', '1 km', '5 km', '12 km'],
    benar: 3,
    langkah: [
      'Misalkan arah menyeberang sebagai sumbu-y dan arah arus (hilir) sebagai sumbu-x. Dalam satu jam, perpindahan karena dayungan adalah d = (0, 4) dan perpindahan karena arus adalah s = (3, 0), dalam km.',
      'Perpindahan sebenarnya adalah jumlah keduanya: d + s = (3, 4).',
      {
        teks: 'Karena kedua perpindahan saling tegak lurus, jarak sebenarnya adalah sisi miring segitiga siku-siku berkaki 3 dan 4, seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [0, 4], label: 'dayung 4', warna: 'depan' }, { dari: [0, 4], ke: [3, 0], label: 'arus 3', warna: 'samping' }, { ke: [3, 4], label: 'sebenarnya = ?' }], jangkauan: [-1, 5, -1, 6] },
      },
      'Dengan teorema Pythagoras, |d + s| = √(3² + 4²) = √25 = 5 km.',
      'Jadi, jarak yang benar-benar ditempuh perahu dalam satu jam adalah 5 km. (Jawaban D)',
    ],
    jebakan: 'Pilihan B, 7 km, menjumlahkan 4 + 3 seolah kedua gerak searah. Pilihan A, 4 km, mengabaikan arus, padahal arus ikut menggeser perahu. Pilihan C, 1 km, mengurangkan seolah arus melawan dayungan.',
    alasan: 'Tegak lurus: √(3² + 4²) = 5 km.',
  },
  {
    // cek: Math.abs(Math.atan2(3, 3)/D - 45) < 1e-9
    id: 'v39',
    tingkat: 'sedang',
    pertanyaan: 'Sudut vektor (3, 3) terhadap sumbu-x positif adalah…',
    gambar: { jenis: 'vektor', panah: [{ ke: [3, 3], label: '(3, 3)' }] },
    pilihan: ['45°', '30°', '60°', '90°', '3°'],
    benar: 0,
    langkah: [
      'Misalkan θ sudut antara vektor dan sumbu-x positif. Pada segitiga siku-siku yang dibentuk komponen mendatar dan tegak, tan θ = komponen tegak/komponen mendatar.',
      {
        teks: 'Untuk (3, 3), tan θ = 3/3 = 1, sehingga θ = 45°; segitiganya siku-siku sama kaki, seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [3, 3], label: '(3, 3)' }], komponen: [0] },
      },
      'Jadi, sudut vektor (3, 3) terhadap sumbu-x positif adalah 45°. (Jawaban A)',
    ],
    jebakan: 'Pilihan E, 3°, menyalin angka komponennya. Pilihan C, 60°, mengira segitiga sama kaki bersudut 60°; itu segitiga sama SISI. Pilihan D, 90°, hanya berlaku bila komponen mendatarnya 0.',
    alasan: 'tan θ = 3/3 = 1, θ = 45°.',
  },
  {
    // cek: Math.abs(4/5 - 0.8) < 1e-9 && Math.abs(3/5 - 0.6) < 1e-9
    id: 'v40',
    tingkat: 'sedang',
    pertanyaan: 'Vektor satuan yang searah dengan (4, 3) adalah…',
    pilihan: ['(0,6; 0,8)', '(0,8; 0,6)', '(4, 3)', '(1, 1)', '(0,4; 0,3)'],
    benar: 1,
    langkah: [
      'Vektor satuan yang searah dengan a dinyatakan oleh â = a/|a|.',
      'Hitung panjangnya: |a| = √(4² + 3²) = √25 = 5.',
      'Dengan demikian, â = (4, 3)/5 = (4/5, 3/5) = (0,8; 0,6). Panjangnya √(0,64 + 0,36) = 1, sesuai.',
      'Jadi, vektor satuan yang searah dengan (4, 3) adalah (0,8; 0,6). (Jawaban B)',
    ],
    jebakan: 'Pilihan A, (0,6; 0,8), menukar urutan komponen; arahnya jadi berbeda. Pilihan E, (0,4; 0,3), membagi dengan 10, bukan dengan panjang 5, sehingga panjangnya 0,5. Pilihan D, (1, 1), mengira vektor satuan selalu berkomponen 1.',
    alasan: 'â = (4, 3)/5 = (0,8; 0,6).',
  },
  {
    // cek: Math.abs(Math.hypot(5, 4) - 6.4) < 0.01
    id: 'v41',
    tingkat: 'sedang',
    pertanyaan: 'Resultan dari (2, 5) dan (3, −1) panjangnya kira-kira…',
    gambar: { jenis: 'vektor', panah: [{ ke: [2, 5], label: '(2, 5)' }, { dari: [2, 5], ke: [3, -1], label: '(3, −1)' }] },
    pilihan: ['7,0', '9,0', '5,1', '11,0', '6,4'],
    benar: 4,
    langkah: [
      'Pertama, hitung resultannya sebagai jumlah vektor per komponen: R = (2, 5) + (3, −1) = (5, 4).',
      {
        teks: 'Panjang resultan dihitung dari komponennya dengan teorema Pythagoras, seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [2, 5], label: '(2, 5)' }, { dari: [2, 5], ke: [3, -1], label: '(3, −1)' }, { ke: [5, 4], label: 'R = (5, 4)', warna: 'depan' }], komponen: [2] },
      },
      'Dengan demikian, |R| = √(5² + 4²) = √(25 + 16) = √41 ≈ 6,4.',
      'Jadi, panjang resultannya kira-kira 6,4. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 9,0, menjumlahkan komponen resultan 5 + 4. Pilihan A, 7,0, membulatkan √41 ke atas terlalu jauh atau menghitung |(2, 5)| + |(3, −1)| secara keliru; panjang jumlah vektor tidak sama dengan jumlah panjangnya.',
    alasan: 'R = (5, 4); |R| = √41 ≈ 6,4.',
  },
  {
    // cek: (2 + 6)/2 === 4 && (1 + 5)/2 === 3
    id: 'v42',
    tingkat: 'sedang',
    pertanyaan: 'Diketahui OA = (2, 1) dan OB = (6, 5). Vektor posisi titik tengah AB adalah…',
    gambar: { jenis: 'vektor', panah: [{ ke: [2, 1], label: 'OA' }, { ke: [6, 5], label: 'OB' }], jangkauan: [-1, 8, -1, 7] },
    pilihan: ['(4, 3)', '(8, 6)', '(4, 4)', '(2, 2)', '(3, 4)'],
    benar: 0,
    langkah: [
      'Misalkan M titik tengah AB. Vektor posisi titik tengah adalah rata-rata kedua vektor posisi ujungnya: OM = (OA + OB)/2, karena M dicapai dengan berjalan dari A sejauh setengah AB.',
      'Dengan demikian, OM = ((2, 1) + (6, 5))/2 = (8, 6)/2 = (4, 3).',
      {
        teks: 'Pada gambar, titik (4, 3) tepat di tengah ruas yang menghubungkan A(2, 1) dan B(6, 5).',
        gambar: { jenis: 'vektor', panah: [{ ke: [2, 1], label: 'OA' }, { ke: [6, 5], label: 'OB' }, { ke: [4, 3], label: 'OM = (4, 3)', warna: 'depan' }, { dari: [2, 1], ke: [4, 4], label: 'AB', warna: 'samping' }], jangkauan: [-1, 8, -1, 7] },
      },
      'Jadi, vektor posisi titik tengah AB adalah (4, 3). (Jawaban A)',
    ],
    jebakan: 'Pilihan B, (8, 6), adalah OA + OB tanpa dibagi 2, yaitu titik sudut keempat jajar genjang, bukan titik tengah. Pilihan D, (2, 2), adalah setengah dari AB = (4, 4), yaitu perpindahan A ke M, bukan vektor posisi M.',
    alasan: 'OM = (OA + OB)/2 = (4, 3).',
  },
  {
    // cek: 1*4 + 2*1 + (-3)*2 === 0
    id: 'v64',
    tingkat: 'sedang',
    pertanyaan: 'Vektor a = (1, 2, −3) tegak lurus dengan vektor b = (4, 1, m). Nilai m adalah…',
    pilihan: ['−2', '6', '2', '−6', '0'],
    benar: 2,
    langkah: [
      'Diketahui a = (1, 2, −3) dan b = (4, 1, m). Karena a ⊥ b (saling tegak lurus), hasil kali titiknya nol: a • b = 0.',
      'Hasil kali titik dihitung dengan menjumlahkan hasil kali komponen yang bersesuaian: a • b = (1)(4) + (2)(1) + (−3)(m) = 4 + 2 − 3m = 6 − 3m.',
      'Samakan dengan nol: 6 − 3m = 0, sehingga 3m = 6 dan m = 2.',
      'Jadi, nilai m adalah 2. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, −2, salah tanda saat memindahkan ruas pada 6 − 3m = 0. Pilihan B, 6, berhenti pada 3m = 6 tanpa membagi 3. Pilihan E, 0, mengira tegak lurus berarti komponen ketiganya nol.',
    alasan: 'a • b = 4 + 2 − 3m = 0 memberi m = 2.',
  },
  {
    // cek: Math.abs(Math.atan(3/4)/D - 36.87) < 0.01
    id: 'v44',
    tingkat: 'sedang',
    pertanyaan: 'Perahu didayung ke utara dengan kecepatan 4 km/jam, sementara arus 3 km/jam ke timur. Arah gerak perahu yang sebenarnya menyimpang dari utara sebesar kira-kira…',
    gambar: { jenis: 'vektor', panah: [{ ke: [0, 4], label: '4 utara', warna: 'depan' }, { dari: [0, 4], ke: [3, 0], label: '3 timur', warna: 'samping' }], jangkauan: [-1, 5, -1, 6] },
    pilihan: ['53,1° ke timur', '45° ke timur', '36,9° ke barat', '36,9° ke timur', '0°'],
    benar: 3,
    langkah: [
      'Misalkan utara sebagai sumbu-y dan timur sebagai sumbu-x. Kecepatan perahu sebenarnya adalah jumlah vektor (0, 4) + (3, 0) = (3, 4).',
      {
        teks: 'Misalkan θ sudut simpangan gerak sebenarnya dari arah utara. Pada segitiga siku-siku berkaki 4 (utara) dan 3 (timur), sisi di hadapan θ adalah 3 dan sisi di sampingnya 4, sehingga tan θ = 3/4, seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [0, 4], label: '4 utara', warna: 'depan' }, { dari: [0, 4], ke: [3, 0], label: '3 timur', warna: 'samping' }, { ke: [3, 4], label: 'gerak nyata, θ dari utara' }], jangkauan: [-1, 5, -1, 6] },
      },
      'Untuk itu, θ = arctan(3/4) ≈ 36,87°, menyimpang ke arah timur karena arus membawa ke timur.',
      'Jadi, arah gerak perahu menyimpang dari utara sebesar kira-kira 36,9° ke timur. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 53,1° ke timur, memakai tan θ = 4/3, yaitu sudut terhadap arah TIMUR, bukan terhadap utara. Pilihan C, 36,9° ke barat, salah arah simpangan; arus ke timur menggeser perahu ke timur.',
    alasan: 'tan θ = 3/4 memberi θ ≈ 36,9° dari utara ke arah timur.',
  },
  // ================================================================ SULIT
  {
    // cek: 4 + 2*3 === 10
    id: 'v19',
    tingkat: 'sulit',
    pertanyaan: 'Titik A(1, 2), B(4, 6), dan C(p, 14) terletak pada satu garis lurus. Nilai p adalah…',
    pilihan: ['8', '7', '10', '12', '6'],
    benar: 2,
    langkah: [
      'Karena A, B, C segaris (kolinear), vektor yang dibentuk oleh dua dari tiga titik itu saling berkelipatan: AC = k · AB untuk suatu bilangan k.',
      'Hitung kedua vektor: AB = B − A = (4 − 1, 6 − 2) = (3, 4) dan AC = C − A = (p − 1, 14 − 2) = (p − 1, 12).',
      'Dari komponen kedua, 12 = 4k sehingga k = 3. Dari komponen pertama, p − 1 = 3k = 3(3) = 9, sehingga p = 10.',
      {
        teks: 'Sebagai pemeriksaan, AC = (9, 12) = 3(3, 4) = 3·AB, memang berkelipatan, seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ dari: [1, 2], ke: [9, 12], label: 'AC = 3·AB' }, { dari: [1, 2], ke: [3, 4], label: 'AB', warna: 'depan' }], jangkauan: [-1, 12, -1, 15] },
      },
      'Jadi, nilai p adalah 10. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, 7, menambahkan selisih absis A ke B (3) sekali lagi pada 4, padahal C tiga kali lebih jauh dari A daripada B. Pilihan D, 12, menyalin ordinat 14 − 2. Pilihan A, 8, memakai k = 2.',
    alasan: 'AC = k·AB: 12 = 4k, k = 3; p − 1 = 9, p = 10.',
  },
  {
    // cek: Math.abs(Math.hypot(2, 6) - 2*Math.sqrt(10)) < 1e-9
    id: 'v20',
    tingkat: 'sulit',
    pertanyaan: 'Diketahui a = (3, 4) dan b = (−1, 2). Panjang a + b adalah…',
    gambar: { jenis: 'vektor', panah: [{ ke: [3, 4], label: 'a' }, { dari: [3, 4], ke: [-1, 2], label: 'b' }], jangkauan: [-1, 5, -1, 7] },
    pilihan: ['2√10', '40', '5 + √5', '8', '√10'],
    benar: 0,
    langkah: [
      'Pertama, hitung a + b per komponen: a + b = (3 + (−1), 4 + 2) = (2, 6).',
      {
        teks: 'Panjang jumlahnya dihitung dari komponen hasilnya, bukan dari panjang masing-masing, seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [3, 4], label: 'a' }, { dari: [3, 4], ke: [-1, 2], label: 'b' }, { ke: [2, 6], label: 'a + b = (2, 6)', warna: 'depan' }], komponen: [2], jangkauan: [-1, 5, -1, 7] },
      },
      'Dengan demikian, |a + b| = √(2² + 6²) = √(4 + 36) = √40 = √(4 · 10) = 2√10.',
      'Jadi, panjang a + b adalah 2√10. (Jawaban A)',
    ],
    jebakan: 'Pilihan C, 5 + √5, menjumlahkan panjang a (5) dan panjang b (√5); panjang jumlah vektor tidak sama dengan jumlah panjangnya kecuali keduanya searah. Pilihan B, 40, lupa menarik akar. Pilihan D, 8, menjumlahkan komponen 2 + 6.',
    alasan: 'a + b = (2, 6); |a + b| = √40 = 2√10.',
  },
  {
    // cek: 5*3 + (-2)*4 === 7
    id: 'v21',
    tingkat: 'sulit',
    pertanyaan: 'Hasil kali titik (5, −2) • (3, 4) adalah…',
    pilihan: ['(15, −8)', '23', '−7', '7', '26'],
    benar: 3,
    langkah: [
      'Hasil kali titik dua vektor didefinisikan sebagai jumlah hasil kali komponen yang bersesuaian: (a₁, a₂) • (b₁, b₂) = a₁b₁ + a₂b₂. Hasilnya sebuah BILANGAN (skalar), bukan vektor.',
      'Dengan demikian, (5, −2) • (3, 4) = (5)(3) + (−2)(4) = 15 + (−8) = 7.',
      'Jadi, hasil kali titik (5, −2) • (3, 4) adalah 7. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, (15, −8), berhenti pada perkalian per komponen tanpa menjumlahkannya; hasil kali titik bukan vektor. Pilihan B, 23, lupa tanda negatif: (−2)(4) = −8. Pilihan C, −7, membalik tanda seluruhnya.',
    alasan: '(5)(3) + (−2)(4) = 15 − 8 = 7.',
  },
  {
    // cek: Math.abs(Math.acos(3/(Math.sqrt(2)*3))/D - 45) < 1e-9
    id: 'v22',
    tingkat: 'sulit',
    pertanyaan: 'Sudut antara vektor (1, 1) dan vektor (0, 3) adalah…',
    gambar: { jenis: 'vektor', panah: [{ ke: [1, 1], label: '(1, 1)' }, { ke: [0, 3], label: '(0, 3)', warna: 'depan' }], jangkauan: [-1, 3, -1, 4] },
    pilihan: ['90°', '30°', '60°', '45°', '0°'],
    benar: 3,
    langkah: [
      'Misalkan θ sudut antara kedua vektor. Kosinus sudut kedua vektor dinyatakan oleh cos θ = (a • b)/(|a||b|).',
      'Hitung bagian-bagiannya: a • b = (1)(0) + (1)(3) = 3; |a| = √(1 + 1) = √2; |b| = √(0 + 9) = 3.',
      'Dengan demikian, cos θ = 3/(√2 · 3) = 1/√2 = (1/2)√2, sehingga θ = 45°.',
      {
        teks: 'Secara gambar, (1, 1) membentuk sudut 45° dengan sumbu-x dan (0, 3) berimpit dengan sumbu-y (90°), sehingga selisihnya 45°, seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [1, 1], label: '(1, 1), 45° dari sumbu-x' }, { ke: [0, 3], label: '(0, 3), 90°', warna: 'depan' }], jangkauan: [-1, 3, -1, 4] },
      },
      'Jadi, sudut antara vektor (1, 1) dan vektor (0, 3) adalah 45°. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 90°, mengira vektor yang salah satunya sejajar sumbu selalu tegak lurus dengan yang lain. Pilihan C, 60°, menukar cos θ = 1/√2 dengan cos 60° = 1/2.',
    alasan: 'cos θ = 3/(√2 · 3) = 1/√2, θ = 45°.',
  },
  {
    // cek: Math.hypot(4, 3) === 5 && Math.hypot(-4, 3) === 5
    id: 'v23',
    tingkat: 'sulit',
    pertanyaan: 'Vektor (x, 3) panjangnya 5. Nilai x yang mungkin adalah…',
    pilihan: ['8 atau −8', 'hanya 4', '2 atau −2', '4 atau −4', 'hanya 2'],
    benar: 3,
    langkah: [
      'Panjang vektor (x, 3) dinyatakan oleh √(x² + 3²). Samakan dengan 5: √(x² + 9) = 5.',
      'Kuadratkan kedua ruas: x² + 9 = 25, sehingga x² = 16 dan x = 4 atau x = −4.',
      {
        teks: 'Kedua nilai memenuhi karena kuadrat menghilangkan tanda: vektor (4, 3) dan (−4, 3) sama panjang, keduanya 5, seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [4, 3], label: '(4, 3)' }, { ke: [-4, 3], label: '(−4, 3)', warna: 'depan' }], jangkauan: [-5, 5, -1, 4] },
      },
      'Jadi, nilai x yang mungkin adalah 4 atau −4. (Jawaban D)',
    ],
    jebakan: 'Pilihan B, hanya 4, melupakan akar negatif; panjang tidak peduli arah kiri atau kanan. Pilihan C, 2 atau −2, mengurangkan 5 − 3 alih-alih 5² − 3². Pilihan A, 8 atau −8, menjumlahkan 5 + 3.',
    alasan: 'x² + 9 = 25, x = ±4.',
  },
  {
    // cek: 2 - 3 + 1 === 0 && 1 + 4 - 2 === 3
    id: 'v24',
    tingkat: 'sulit',
    pertanyaan: 'Resultan dari tiga vektor (2, 1), (−3, 4), dan (1, −2) mempunyai panjang…',
    gambar: { jenis: 'vektor', panah: [{ ke: [2, 1], label: '(2, 1)' }, { dari: [2, 1], ke: [-3, 4], label: '(−3, 4)' }, { dari: [-1, 5], ke: [1, -2], label: '(1, −2)' }], jangkauan: [-3, 4, -1, 6] },
    pilihan: ['0', '3', '5', '√10', '9'],
    benar: 1,
    langkah: [
      'Resultan tiga vektor adalah jumlah ketiganya per komponen: R = (2 + (−3) + 1, 1 + 4 + (−2)) = (0, 3).',
      {
        teks: 'Secara gambar, ketiga panah disambung ujung ke pangkal dan resultannya menghubungkan pangkal pertama ke ujung terakhir, yaitu titik (0, 3), seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [2, 1], label: '(2, 1)' }, { dari: [2, 1], ke: [-3, 4], label: '(−3, 4)' }, { dari: [-1, 5], ke: [1, -2], label: '(1, −2)' }, { ke: [0, 3], label: 'R = (0, 3)', warna: 'depan' }], jangkauan: [-3, 4, -1, 6] },
      },
      'Panjangnya |R| = √(0² + 3²) = √9 = 3.',
      'Jadi, panjang resultan ketiga vektor itu adalah 3. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 0, mengira komponen mendatar yang nol membuat resultannya nol; komponen tegaknya 3. Pilihan E, 9, lupa menarik akar dari 0 + 9. Pilihan C, 5, menjumlahkan panjang-panjang secara keliru.',
    alasan: 'R = (0, 3); |R| = 3.',
  },
  {
    // cek: 25 - 9 === 16
    id: 'v65',
    tingkat: 'sulit',
    pertanyaan: 'Diketahui |a| = 5 dan |b| = 3. Nilai dari (a + b) • (a − b) adalah…',
    pilihan: ['34', '8', '16', '15', '2'],
    benar: 2,
    langkah: [
      'Hasil kali titik memenuhi sifat distributif seperti perkalian biasa, sehingga (a + b) • (a − b) = a • a − a • b + b • a − b • b.',
      'Karena a • b = b • a (komutatif), kedua suku tengah saling meniadakan, sehingga tersisa a • a − b • b.',
      'Ingat bahwa a • a = |a|², sehingga (a + b) • (a − b) = |a|² − |b|² = 5² − 3² = 25 − 9 = 16. Sudut antara a dan b tidak diperlukan.',
      'Jadi, nilai (a + b) • (a − b) = 16. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 34, menjumlahkan 25 + 9 seolah tandanya sama. Pilihan D, 15, mengalikan panjangnya, 5 × 3, mengira hasil kali titik cukup dari panjangnya saja. Pilihan E, 2, menghitung 5 − 3 tanpa mengkuadratkan.',
    alasan: '(a + b) • (a − b) = |a|² − |b|² = 25 − 9 = 16.',
  },
  {
    // cek: Math.abs(-4/5 + 0.8) < 1e-9 && Math.abs(3/5 - 0.6) < 1e-9
    id: 'v26',
    tingkat: 'sulit',
    pertanyaan: 'Vektor satuan yang BERLAWANAN arah dengan (4, −3) adalah…',
    gambar: { jenis: 'vektor', panah: [{ ke: [4, -3], label: '(4, −3)' }], jangkauan: [-2, 5, -4, 2] },
    pilihan: ['(−4, 3)', '(0,8; −0,6)', '(−0,6; 0,8)', '(0,6; −0,8)', '(−0,8; 0,6)'],
    benar: 4,
    langkah: [
      'Vektor satuan searah a adalah â = a/|a|; yang berlawanan arah adalah −â, panjangnya tetap 1 tetapi arahnya dibalik.',
      'Hitung panjangnya: |a| = √(4² + (−3)²) = √25 = 5, sehingga â = (4, −3)/5 = (0,8; −0,6).',
      {
        teks: 'Dengan demikian, −â = (−0,8; 0,6); pada gambar, panah ini pendek (panjang 1) dan menunjuk berlawanan dengan (4, −3).',
        gambar: { jenis: 'vektor', panah: [{ ke: [4, -3], label: '(4, −3)' }, { ke: [-0.8, 0.6], label: '−â = (−0,8; 0,6)', warna: 'depan' }], jangkauan: [-2, 5, -4, 2] },
      },
      'Jadi, vektor satuan yang berlawanan arah dengan (4, −3) adalah (−0,8; 0,6). (Jawaban E)',
    ],
    jebakan: 'Pilihan A, (−4, 3), berlawanan arah tetapi panjangnya 5, bukan 1. Pilihan B, (0,8; −0,6), panjangnya 1 tetapi SEARAH, bukan berlawanan. Pilihan C, (−0,6; 0,8), menukar komponen.',
    alasan: '−â = −(4, −3)/5 = (−0,8; 0,6).',
  },
  {
    // cek: (2*1 + 2 + 2)/3 === 2
    id: 'v66',
    tingkat: 'sulit',
    pertanyaan: 'Panjang proyeksi skalar vektor a = (p, 2, 1) pada vektor b = (2, 1, 2) sama dengan 2. Nilai p adalah…',
    pilihan: ['2', '3', '0', '−1', '1'],
    benar: 4,
    langkah: [
      'Panjang proyeksi skalar vektor a pada vektor b dinyatakan oleh |a_b| = (a • b)/|b|.',
      'Hitung bagian-bagiannya: a • b = (p)(2) + (2)(1) + (1)(2) = 2p + 4, dan |b| = √(2² + 1² + 2²) = √(4 + 1 + 4) = √9 = 3.',
      'Samakan dengan 2: (2p + 4)/3 = 2, sehingga 2p + 4 = 6, 2p = 2, dan p = 1.',
      'Sebagai pemeriksaan, dengan p = 1 diperoleh a • b = 6 dan 6/3 = 2, sesuai.',
      'Jadi, nilai p adalah 1. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 3, lupa membagi a • b dengan |b| (memakai 2p + 4 = 2 dengan tanda keliru) atau menyamakan 2p + 4 dengan 2|b| = 6 lalu salah hitung. Pilihan D, −1, menyelesaikan 2p + 4 = 2 (lupa mengalikan 2 dengan |b| = 3).',
    alasan: '(a • b)/|b| = (2p + 4)/3 = 2 memberi p = 1.',
  },
  {
    // cek: Math.abs(Math.acos(1/2)/D - 60) < 1e-9
    id: 'v46',
    tingkat: 'sulit',
    pertanyaan: 'Sudut antara vektor (1, 0) dan vektor (1, √3) adalah…',
    gambar: { jenis: 'vektor', panah: [{ ke: [1, 0], label: '(1, 0)', warna: 'samping' }, { ke: [1, 1.732], label: '(1, √3)' }], jangkauan: [-1, 3, -1, 3] },
    pilihan: ['60°', '30°', '45°', '90°', '120°'],
    benar: 0,
    langkah: [
      'Misalkan θ sudut antara kedua vektor. Kosinus sudutnya dinyatakan oleh cos θ = (a • b)/(|a||b|).',
      'Hitung bagian-bagiannya: a • b = (1)(1) + (0)(√3) = 1; |a| = 1; |b| = √(1 + 3) = 2.',
      'Dengan demikian, cos θ = 1/(1 · 2) = 1/2, sehingga θ = 60°.',
      {
        teks: 'Secara gambar, (1, 0) berimpit dengan sumbu-x, dan (1, √3) membentuk sudut dengan tan θ = √3/1, yaitu 60°, seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [1, 0], label: '(1, 0)', warna: 'samping' }, { ke: [1, 1.732], label: '(1, √3), θ = 60°' }], komponen: [1], jangkauan: [-1, 3, -1, 3] },
      },
      'Jadi, sudut antara vektor (1, 0) dan vektor (1, √3) adalah 60°. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 30°, menukar cos θ = 1/2 dengan sin 30° = 1/2; yang bernilai 1/2 untuk kosinus adalah 60°. Pilihan E, 120°, memberi cos θ = −1/2, padahal hasil kali titiknya positif.',
    alasan: 'cos θ = 1/(1 · 2) = 1/2, θ = 60°.',
  },
  {
    // cek: Math.abs((3*1 + 4*1)/Math.sqrt(2) - 4.95) < 0.01
    id: 'v47',
    tingkat: 'sulit',
    pertanyaan: 'Panjang proyeksi vektor (3, 4) pada vektor (1, 1) kira-kira…',
    gambar: { jenis: 'vektor', panah: [{ ke: [3, 4], label: '(3, 4)' }, { ke: [1, 1], label: '(1, 1)', warna: 'samping' }], jangkauan: [-1, 5, -1, 5] },
    pilihan: ['7,00', '3,50', '5,00', '2,47', '4,95'],
    benar: 4,
    langkah: [
      'Panjang proyeksi skalar vektor a pada vektor b dinyatakan oleh |a_b| = (a • b)/|b|: bayangan tegak lurus a pada garis yang searah b.',
      'Hitung bagian-bagiannya: a • b = (3)(1) + (4)(1) = 7 dan |b| = √(1 + 1) = √2.',
      'Dengan demikian, |a_b| = 7/√2 = (7/2)√2 ≈ 4,95.',
      {
        teks: 'Pada gambar, garis putus-putus dari ujung (3, 4) jatuh tegak lurus pada garis searah (1, 1); ruas tebal sepanjang 4,95 itulah proyeksinya.',
        gambar: { jenis: 'vektor', panah: [{ ke: [3, 4], label: '(3, 4)' }, { ke: [1, 1], label: '(1, 1)', warna: 'samping' }], proyeksi: { dari: 0, ke: 1, label: '4,95' }, jangkauan: [-1, 5, -1, 5] },
      },
      'Jadi, panjang proyeksi vektor (3, 4) pada vektor (1, 1) kira-kira 4,95. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 7,00, berhenti pada a • b tanpa membagi |b|. Pilihan B, 3,50, membagi 7 dengan |b|² = 2, yaitu koefisien VEKTOR proyeksinya, bukan panjangnya. Pilihan C, 5,00, adalah panjang (3, 4) sendiri.',
    alasan: '(a • b)/|b| = 7/√2 ≈ 4,95.',
  },
  {
    // cek: Math.abs(Math.acos(6/(4*3))/D - 60) < 1e-9
    id: 'v48',
    tingkat: 'sulit',
    pertanyaan: 'Diketahui |a| = 4, |b| = 3, dan a • b = 6. Sudut antara a dan b adalah…',
    pilihan: ['30°', '45°', '90°', '60°', '120°'],
    benar: 3,
    langkah: [
      'Misalkan θ sudut antara a dan b. Ingat definisi hasil kali titik lewat sudut: a • b = |a||b| cos θ, sehingga cos θ = (a • b)/(|a||b|).',
      'Substitusikan: cos θ = 6/(4 · 3) = 6/12 = 1/2.',
      'Dari cos θ = 1/2, diperoleh θ = 60°.',
      'Jadi, sudut antara a dan b adalah 60°. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 30°, menukar kosinus dengan sinus. Pilihan E, 120°, salah tanda; hasil kali titik yang positif berarti sudutnya lancip. Pilihan C, 90°, hanya bila a • b = 0.',
    alasan: 'cos θ = 6/(4 · 3) = 1/2, θ = 60°.',
  },
  {
    // cek: 1 + 3*3 === 10
    id: 'v49',
    tingkat: 'sulit',
    pertanyaan: 'Titik A(0, 1), B(2, 4), dan C(6, p) segaris. Nilai p adalah…',
    pilihan: ['7', '8', '12', '10', '9'],
    benar: 3,
    langkah: [
      'Karena A, B, C segaris, vektor AC dan AB saling berkelipatan: AC = k · AB.',
      'Hitung kedua vektor: AB = (2 − 0, 4 − 1) = (2, 3) dan AC = (6 − 0, p − 1) = (6, p − 1).',
      'Dari komponen pertama, 6 = 2k sehingga k = 3. Dari komponen kedua, p − 1 = 3k = 9, sehingga p = 10.',
      'Sebagai pemeriksaan, AC = (6, 9) = 3(2, 3), berkelipatan dengan AB.',
      'Jadi, nilai p adalah 10. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 7, menambahkan 3 sekali lagi pada ordinat B, mengira C hanya "satu langkah" lagi; padahal absisnya 6 berarti tiga langkah dari A. Pilihan E, 9, menghitung 3k tanpa menambahkan ordinat A.',
    alasan: 'AC = 3·AB: p − 1 = 9, p = 10.',
  },
  {
    // cek: Math.abs(Math.hypot(3, -2) - 3.61) < 0.01
    id: 'v50',
    tingkat: 'sulit',
    pertanyaan: 'Diketahui a = (2, 1) dan b = (−1, 3). Panjang a − b kira-kira…',
    gambar: { jenis: 'vektor', panah: [{ ke: [2, 1], label: 'a' }, { ke: [-1, 3], label: 'b', warna: 'samping' }], jangkauan: [-2, 4, -1, 4] },
    pilihan: ['2,24', '1,41', '3,61', '5,00', '4,12'],
    benar: 2,
    langkah: [
      'Pertama, hitung a − b per komponen: a − b = (2 − (−1), 1 − 3) = (3, −2).',
      {
        teks: 'Secara gambar, a − b adalah panah dari ujung b ke ujung a (karena b + (a − b) = a), seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [2, 1], label: 'a' }, { ke: [-1, 3], label: 'b', warna: 'samping' }, { dari: [-1, 3], ke: [3, -2], label: 'a − b = (3, −2)', warna: 'depan' }], jangkauan: [-2, 4, -1, 4] },
      },
      'Dengan demikian, |a − b| = √(3² + (−2)²) = √(9 + 4) = √13 ≈ 3,61.',
      'Jadi, panjang a − b kira-kira 3,61. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 2,24, adalah |a| = √5, dan pilihan E, 4,12, hampir |a| + |b| = √5 + √10 ≈ 5,4 yang dibulatkan keliru; panjang selisih harus dari komponen selisihnya. Pilihan B, 1,41, menghitung (2 − 1, 1 − 3) secara salah.',
    alasan: 'a − b = (3, −2); |a − b| = √13 ≈ 3,61.',
  },
  {
    // cek: Math.abs(Math.hypot(300, 50) - 304.1) < 0.1
    id: 'v51',
    tingkat: 'sulit',
    pertanyaan: 'Pesawat terbang ke utara dengan kecepatan 300 km/jam. Angin bertiup ke timur 50 km/jam. Kecepatan pesawat terhadap tanah kira-kira…',
    gambar: { jenis: 'vektor', panah: [{ ke: [0, 300], label: '300', warna: 'depan' }, { dari: [0, 300], ke: [50, 0], label: 'angin 50', warna: 'samping' }], jangkauan: [-50, 150, -50, 350] },
    pilihan: ['304,1 km/jam', '350 km/jam', '250 km/jam', '300 km/jam', '354,1 km/jam'],
    benar: 0,
    langkah: [
      'Misalkan utara sebagai sumbu-y dan timur sebagai sumbu-x. Kecepatan pesawat terhadap udara adalah (0, 300) dan kecepatan angin (50, 0), dalam km/jam.',
      'Kecepatan terhadap tanah adalah jumlah keduanya: (0 + 50, 300 + 0) = (50, 300).',
      {
        teks: 'Karena keduanya tegak lurus, besarnya dihitung dengan teorema Pythagoras, seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [0, 300], label: '300', warna: 'depan' }, { dari: [0, 300], ke: [50, 0], label: 'angin 50', warna: 'samping' }, { ke: [50, 300], label: 'terhadap tanah = ?' }], jangkauan: [-50, 150, -50, 350] },
      },
      'Dengan demikian, |v| = √(50² + 300²) = √(2.500 + 90.000) = √92.500 ≈ 304,1 km/jam.',
      'Jadi, kecepatan pesawat terhadap tanah kira-kira 304,1 km/jam. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 350 km/jam, menjumlahkan 300 + 50 seolah angin searah pesawat. Pilihan C, 250, mengurangkannya seolah angin melawan. Pilihan D, 300, mengabaikan angin, padahal angin menggeser lintasan walau hanya sedikit menambah lajunya.',
    alasan: 'Tegak lurus: √(50² + 300²) ≈ 304,1 km/jam.',
  },
  // ========================================================= SANGAT SULIT
  {
    // cek: 2*3 + 1*(-6) === 0
    id: 'v27',
    tingkat: 'sangat sulit',
    pertanyaan: 'Vektor (2, k) tegak lurus dengan vektor (3, −6). Nilai k adalah…',
    pilihan: ['−1', '4', '−4', '1', '2'],
    benar: 3,
    langkah: [
      'Karena kedua vektor saling tegak lurus, hasil kali titiknya nol: (2, k) • (3, −6) = 0.',
      'Hitung hasil kali titiknya: (2)(3) + (k)(−6) = 6 − 6k. Samakan dengan nol: 6 − 6k = 0, sehingga k = 1.',
      {
        teks: 'Sebagai pemeriksaan, (2, 1) dan (3, −6) memang tegak lurus: gradien (2, 1) adalah 1/2 dan gradien (3, −6) adalah −2, hasil kalinya −1, seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [2, 1], label: '(2, 1)' }, { ke: [3, -6], label: '(3, −6)', warna: 'samping' }], jangkauan: [-1, 5, -7, 3] },
      },
      'Jadi, nilai k adalah 1. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, −1, salah tanda saat menyelesaikan 6 − 6k = 0. Pilihan C, −4, mengira tegak lurus berarti komponennya "ditukar dan dibalik tandanya" tanpa memperhatikan kelipatan: (6, 3) ⊥ (3, −6) memang, tetapi soalnya (2, k). Pilihan B, 4, menyamakan (2, k) sejajar (3, −6) dengan tanda keliru.',
    alasan: '(2)(3) + k(−6) = 0 memberi k = 1.',
  },
  {
    // cek: Math.abs((5*3 + 12*4)/5 - 12.6) < 1e-9
    id: 'v28',
    tingkat: 'sangat sulit',
    pertanyaan: 'Panjang proyeksi vektor (5, 12) pada vektor (3, 4) adalah…',
    gambar: { jenis: 'vektor', panah: [{ ke: [5, 12], label: '(5, 12)' }, { ke: [3, 4], label: '(3, 4)', warna: 'samping' }], jangkauan: [-1, 13, -1, 14] },
    pilihan: ['2,52', '12,6', '63', '13', '5'],
    benar: 1,
    langkah: [
      'Panjang proyeksi skalar vektor a pada vektor b dinyatakan oleh |a_b| = (a • b)/|b|.',
      'Diketahui a = (5, 12) dan b = (3, 4), sehingga a • b = (5)(3) + (12)(4) = 15 + 48 = 63 dan |b| = √(3² + 4²) = √25 = 5.',
      'Untuk itu, |a_b| = 63/5 = 12,6.',
      {
        teks: 'Pada gambar, garis putus-putus dari ujung (5, 12) jatuh tegak lurus pada garis searah (3, 4); ruas tebal sepanjang 12,6 (lebih panjang dari b sendiri yang hanya 5) itulah proyeksinya.',
        gambar: { jenis: 'vektor', panah: [{ ke: [5, 12], label: 'a' }, { ke: [3, 4], label: 'b', warna: 'samping' }], proyeksi: { dari: 0, ke: 1, label: '12,6' }, jangkauan: [-1, 13, -1, 14] },
      },
      'Jadi, panjang proyeksi vektor (5, 12) pada vektor (3, 4) adalah 12,6. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, 63, berhenti pada a • b tanpa membagi |b|. Pilihan A, 2,52, membagi 63 dengan |b|² = 25, yaitu koefisien VEKTOR proyeksi, bukan panjangnya. Pilihan D, 13, adalah panjang (5, 12) sendiri; proyeksi selalu lebih pendek atau sama.',
    alasan: '(a • b)/|b| = 63/5 = 12,6.',
  },
  {
    // cek: Math.abs(Math.sqrt(25 + 9 - 2*5*3*0.5) - Math.sqrt(19)) < 1e-9
    id: 'v29',
    tingkat: 'sangat sulit',
    pertanyaan: 'Diketahui |a| = 5, |b| = 3, dan sudut antara keduanya 60°. Panjang a − b adalah…',
    pilihan: ['√19', '2', '√49', '8', '√34'],
    benar: 0,
    langkah: [
      'Panjang selisih vektor dihitung lewat kuadratnya: |a − b|² = (a − b) • (a − b) = |a|² − 2(a • b) + |b|².',
      'Hitung a • b dari sudutnya: a • b = |a||b| cos 60° = 5 · 3 · 1/2 = 15/2.',
      'Substitusikan: |a − b|² = 25 − 2(15/2) + 9 = 25 − 15 + 9 = 19, sehingga |a − b| = √19.',
      'Bentuk ini sama dengan aturan kosinus pada segitiga yang sisinya |a|, |b|, dan |a − b| dengan sudut apit 60°: |a − b|² = |a|² + |b|² − 2|a||b| cos 60°.',
      'Jadi, panjang a − b adalah √19. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 2, mengurangkan panjangnya, 5 − 3, yang hanya benar bila kedua vektor searah (sudut 0°). Pilihan E, √34, memakai 25 + 9 tanpa suku −2(a • b), yaitu rumus untuk vektor tegak lurus. Pilihan C, √49 = 7, memakai +2(a • b), yaitu panjang a + b.',
    alasan: '|a − b|² = 25 + 9 − 2(5)(3)(1/2) = 19.',
  },
  {
    // cek: 7 + 2*4 === 15
    id: 'v30',
    tingkat: 'sangat sulit',
    pertanyaan: 'Titik A(1, 2, 3), B(3, 5, 7), dan C(7, 11, p) terletak pada satu garis lurus. Nilai p adalah…',
    pilihan: ['8', '11', '15', '13', '14'],
    benar: 2,
    langkah: [
      'Karena A, B, C segaris, vektor AC dan AB saling berkelipatan: AC = k · AB.',
      'Hitung kedua vektor: AB = (3 − 1, 5 − 2, 7 − 3) = (2, 3, 4) dan AC = (7 − 1, 11 − 2, p − 3) = (6, 9, p − 3).',
      'Dari komponen pertama, 6 = 2k sehingga k = 3; komponen kedua cocok, 9 = 3(3). Dari komponen ketiga, p − 3 = 3(4) = 12, sehingga p = 15.',
      'Jadi, nilai p adalah 15. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, 11, menambahkan 4 sekali lagi pada 7, mengira C satu langkah lagi setelah B; padahal komponen lain menunjukkan C tiga langkah dari A. Pilihan E, 14, memakai k = 3 pada komponen ketiga tetapi lupa menambahkan koordinat A (3 + 12 dihitung sebagai 14). Pilihan D, 13, memakai k = 2,5.',
    alasan: 'AC = 3·AB: p − 3 = 12, p = 15.',
  },
  {
    // cek: Math.abs(Math.acos((37 - 9 - 16)/(-2*3*4))/D - 120) < 1e-9
    id: 'v67',
    tingkat: 'sangat sulit',
    pertanyaan: 'Diketahui |a| = 3, |b| = 4, dan |a − b| = √37. Sudut antara a dan b adalah…',
    pilihan: ['120°', '60°', '90°', '150°', '30°'],
    benar: 0,
    langkah: [
      'Misalkan θ sudut antara a dan b. Kuadratkan panjang selisihnya: |a − b|² = |a|² − 2(a • b) + |b|², dan a • b = |a||b| cos θ.',
      'Substitusikan nilai yang diketahui: 37 = 9 − 2(3)(4) cos θ + 16 = 25 − 24 cos θ.',
      'Untuk itu, 24 cos θ = 25 − 37 = −12, sehingga cos θ = −12/24 = −1/2.',
      'Dari cos θ = −1/2, diperoleh θ = 120°. (Kosinus negatif menandakan sudut tumpul.)',
      'Jadi, sudut antara a dan b adalah 120°. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 60°, lupa tanda negatif pada cos θ = −1/2; cos 60° = +1/2 akan memberi |a − b|² = 13, bukan 37. Pilihan C, 90°, memakai 9 + 16 = 25 ≠ 37 tanpa memeriksa. Pilihan D, 150°, menukar cos 120° dengan cos 150° = −(1/2)√3.',
    alasan: '37 = 25 − 24 cos θ, cos θ = −1/2, θ = 120°.',
  },
  {
    // cek: Math.abs(3 * (4/5) - 2.4) < 1e-9
    id: 'v32',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sungai selebar 4 km mengalir dengan arus 3 km per jam. Perahu didayung tegak lurus terhadap tepi dengan kecepatan 5 km per jam. Sejauh berapa perahu itu hanyut ke hilir saat mendarat?',
    gambar: { jenis: 'vektor', panah: [{ ke: [0, 5], label: 'dayung 5', warna: 'depan' }, { dari: [0, 5], ke: [3, 0], label: 'arus 3', warna: 'samping' }], jangkauan: [-1, 5, -1, 7] },
    pilihan: ['3 km', '2,4 km', '4 km', '1,25 km', '0,8 km'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa gerak menyeberang dan gerak hanyut saling tegak lurus dan berlangsung bersamaan, sehingga keduanya dihitung terpisah dengan WAKTU yang sama.',
      'Waktu menyeberang ditentukan oleh komponen tegak lurus saja: lebar sungai dibagi kecepatan dayung, t = 4 km / (5 km/jam) = 0,8 jam.',
      'Selama 0,8 jam itu, arus menggeser perahu ke hilir sejauh 3 km/jam × 0,8 jam = 2,4 km.',
      {
        teks: 'Pada gambar, lintasan sebenarnya adalah panah (3, 5) yang diperpanjang sampai tepi seberang (4 km): perbandingan hanyut terhadap lebar sama dengan 3 : 5, sehingga hanyutnya (3/5)(4) = 2,4 km.',
        gambar: { jenis: 'vektor', panah: [{ ke: [0, 5], label: 'dayung 5', warna: 'depan' }, { dari: [0, 5], ke: [3, 0], label: 'arus 3', warna: 'samping' }, { ke: [2.4, 4], label: 'mendarat (2,4; 4)' }], jangkauan: [-1, 5, -1, 7] },
      },
      'Jadi, perahu hanyut ke hilir sejauh 2,4 km saat mendarat. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 3 km, mengira perahu menyeberang tepat satu jam, padahal lebar 4 km ditempuh dalam 0,8 jam. Pilihan E, 0,8 km, menyalin waktu 0,8 jam sebagai jarak. Pilihan D, 1,25 km, membalik perbandingan 4/5 menjadi 5/4 lalu dikalikan 1.',
    alasan: 't = 4/5 = 0,8 jam; hanyut = 3 × 0,8 = 2,4 km.',
  },
  {
    // cek: Math.abs(Math.acos((49 - 9 - 25)/(2*3*5))/D - 60) < 1e-9
    id: 'v52',
    tingkat: 'sangat sulit',
    pertanyaan: 'Diketahui a + b + c = 0, dengan |a| = 3, |b| = 5, dan |c| = 7. Sudut antara a dan b adalah…',
    pilihan: ['120°', '90°', '30°', '60°', '45°'],
    benar: 3,
    langkah: [
      'Dari a + b + c = 0 diperoleh c = −(a + b), sehingga |c| = |a + b|; panjang c sama dengan panjang jumlah a dan b.',
      'Kuadratkan: |a + b|² = |a|² + 2(a • b) + |b|², sehingga 49 = 9 + 2(a • b) + 25, dan a • b = (49 − 34)/2 = 15/2.',
      'Misalkan θ sudut antara a dan b. Dari a • b = |a||b| cos θ, diperoleh cos θ = (15/2)/(3 · 5) = (15/2)/15 = 1/2.',
      'Dari cos θ = 1/2, diperoleh θ = 60°. (Secara gambar, ketiga vektor membentuk segitiga bersisi 3, 5, 7; sudut LUAR di pertemuan a dan b adalah 60°, sedangkan sudut dalam segitiganya 120°.)',
      'Jadi, sudut antara a dan b adalah 60°. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 120°, adalah sudut dalam segitiga 3-5-7 di antara sisi 3 dan 5 (aturan kosinus memberi cos = (9 + 25 − 49)/30 = −1/2); tetapi sudut antara VEKTOR a dan b diukur saat pangkalnya disatukan, yaitu pelurusnya, 60°. Pilihan B, 90°, memakai 9 + 25 = 34 ≠ 49.',
    alasan: '|a + b|² = |c|²: 49 = 34 + 2(a • b), cos θ = 1/2, θ = 60°.',
  },
  {
    // cek: Math.abs(Math.sqrt(3 + 1 + 2*1.5) - Math.sqrt(7)) < 1e-9
    id: 'v53',
    tingkat: 'sangat sulit',
    pertanyaan: 'Diketahui |a| = √3, |b| = 1, dan |a − b| = 1. Panjang a + b adalah…',
    pilihan: ['√3', '√5', '2√2', '3', '√7'],
    benar: 4,
    langkah: [
      'Cari dulu a • b dari panjang selisihnya: |a − b|² = |a|² − 2(a • b) + |b|², sehingga 1 = 3 − 2(a • b) + 1, dan a • b = (3 + 1 − 1)/2 = 3/2.',
      'Selanjutnya, hitung kuadrat panjang jumlahnya: |a + b|² = |a|² + 2(a • b) + |b|² = 3 + 2(3/2) + 1 = 3 + 3 + 1 = 7.',
      'Dengan demikian, |a + b| = √7.',
      'Cara lain: jumlahkan kedua identitas, |a + b|² + |a − b|² = 2(|a|² + |b|²) (hukum jajar genjang), sehingga |a + b|² = 2(3 + 1) − 1 = 7, sama.',
      'Jadi, panjang a + b adalah √7. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, √3, mengira |a + b| = |a| karena |b| = |a − b| = 1 "saling menghapus". Pilihan C, 2√2 = √8, memakai 2(|a|² + |b|²) tanpa mengurangkan |a − b|². Pilihan D, 3, menjumlahkan panjangnya, √3 + 1 ≈ 2,73 dibulatkan.',
    alasan: 'a • b = 3/2; |a + b|² = 3 + 3 + 1 = 7.',
  },
  {
    // cek: Math.abs((4*3 + 8)/Math.sqrt(9 + 16) - 4) < 1e-9
    id: 'v68',
    tingkat: 'sangat sulit',
    pertanyaan: 'Panjang proyeksi vektor b = (4, 4, 2) pada vektor a = (m, 0, 4) sama dengan 4. Nilai m adalah…',
    pilihan: ['−3', '3', '4', '2', '6'],
    benar: 1,
    langkah: [
      'Panjang proyeksi skalar vektor b pada vektor a dinyatakan oleh |b_a| = (a • b)/|a|.',
      'Hitung bagian-bagiannya: a • b = (m)(4) + (0)(4) + (4)(2) = 4m + 8, dan |a| = √(m² + 0 + 16) = √(m² + 16).',
      'Samakan dengan 4: (4m + 8)/√(m² + 16) = 4, sehingga 4m + 8 = 4√(m² + 16), yaitu m + 2 = √(m² + 16).',
      'Kuadratkan kedua ruas: (m + 2)² = m² + 16, sehingga m² + 4m + 4 = m² + 16, 4m = 12, dan m = 3. Periksa ke persamaan sebelum dikuadratkan: m + 2 = 5 dan √(9 + 16) = 5, memenuhi (ruas kiri positif).',
      'Jadi, nilai m adalah 3. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, −3, tidak memenuhi persamaan semula: (−12 + 8)/5 = −4/5 ≠ 4; kuadrat bisa memunculkan akar palsu, sehingga hasil selalu diperiksa kembali. Pilihan C, 4, menyamakan m dengan proyeksinya. Pilihan E, 6, salah menyelesaikan 4m = 12.',
    alasan: '(4m + 8)/√(m² + 16) = 4 → m + 2 = √(m² + 16) → m = 3.',
  },
  {
    // cek: (5*3 + 5*1)/(3*3 + 1*1) === 2
    id: 'v55',
    tingkat: 'sangat sulit',
    pertanyaan: 'Vektor proyeksi ortogonal (5, 5) pada (3, 1) adalah…',
    gambar: { jenis: 'vektor', panah: [{ ke: [5, 5], label: '(5, 5)' }, { ke: [3, 1], label: '(3, 1)', warna: 'samping' }], jangkauan: [-1, 8, -1, 7] },
    pilihan: ['(3, 1)', '(2, 2)', '(6, 2)', '(9, 3)', '(5, 5)'],
    benar: 2,
    langkah: [
      'Vektor proyeksi ortogonal a pada b dinyatakan oleh a_b = ((a • b)/|b|²) · b: vektor b dikalikan dengan bilangan (a • b)/|b|². Berbeda dengan PANJANG proyeksi yang pembaginya |b|, di sini pembaginya |b|² karena hasilnya harus berupa vektor searah b.',
      'Diketahui a = (5, 5) dan b = (3, 1), sehingga a • b = (5)(3) + (5)(1) = 20 dan |b|² = 3² + 1² = 10.',
      'Dengan demikian, a_b = (20/10)(3, 1) = 2(3, 1) = (6, 2).',
      {
        teks: 'Pada gambar, kaki tegak lurus dari ujung (5, 5) ke garis searah (3, 1) jatuh tepat di (6, 2); ruas tebal itulah vektor proyeksinya, dua kali panjang b.',
        gambar: { jenis: 'vektor', panah: [{ ke: [5, 5], label: 'a' }, { ke: [3, 1], label: 'b', warna: 'samping' }], proyeksi: { dari: 0, ke: 1, label: 'a_b = (6, 2)' }, jangkauan: [-1, 8, -1, 7] },
      },
      'Jadi, vektor proyeksi ortogonal (5, 5) pada (3, 1) adalah (6, 2). (Jawaban C)',
    ],
    jebakan: 'Pilihan A, (3, 1), lupa mengalikan dengan koefisien 2. Pilihan D, (9, 3), memakai pembagi |b| = √10 dengan pembulatan keliru atau mengalikan 3. Pilihan B, (2, 2), menyalin koefisien 2 ke kedua komponen alih-alih mengalikan b dengan 2.',
    alasan: 'a_b = ((a • b)/|b|²) b = (20/10)(3, 1) = (6, 2).',
  },
  {
    // cek: 1 + (7 - 1)/3 === 3 && 2 + (5 - 2)/3 === 3
    id: 'v56',
    tingkat: 'sangat sulit',
    pertanyaan: 'Titik P membagi ruas AB dengan perbandingan AP : PB = 1 : 2, dengan A(1, 2) dan B(7, 5). Vektor posisi P adalah…',
    gambar: { jenis: 'vektor', panah: [{ dari: [1, 2], ke: [6, 3], label: 'AB' }], jangkauan: [-1, 8, -1, 6] },
    pilihan: ['(5, 4)', '(3, 3)', '(4; 3,5)', '(2, 1)', '(9, 7)'],
    benar: 1,
    langkah: [
      'Perbandingan AP : PB = 1 : 2 berarti P berada sepertiga jalan dari A ke B, sehingga AP = (1/3)·AB.',
      'Hitung AB = B − A = (7 − 1, 5 − 2) = (6, 3), sehingga AP = (1/3)(6, 3) = (2, 1).',
      'Vektor posisi P adalah OP = OA + AP = (1, 2) + (2, 1) = (3, 3).',
      {
        teks: 'Sebagai pemeriksaan, PB = B − P = (4, 2) = 2·AP, sesuai perbandingan 1 : 2, seperti gambar berikut. (Rumus pembagian ruas: OP = (2·OA + 1·OB)/(1 + 2) = ((2, 4) + (7, 5))/3 = (3, 3), sama.)',
        gambar: { jenis: 'vektor', panah: [{ dari: [1, 2], ke: [6, 3], label: 'AB' }, { ke: [3, 3], label: 'OP = (3, 3)', warna: 'depan' }, { dari: [1, 2], ke: [2, 1], label: 'AP', warna: 'samping' }], jangkauan: [-1, 8, -1, 6] },
      },
      'Jadi, vektor posisi P adalah (3, 3). (Jawaban B)',
    ],
    jebakan: 'Pilihan A, (5, 4), membagi ruas dengan perbandingan 2 : 1 (dua pertiga jalan), terbalik. Pilihan C, (4; 3,5), adalah titik tengah AB (perbandingan 1 : 1). Pilihan D, (2, 1), adalah vektor AP, bukan vektor posisi P.',
    alasan: 'OP = OA + (1/3)AB = (1, 2) + (2, 1) = (3, 3).',
  },
  {
    // cek: Math.abs(Math.sqrt(1 + 1 + 2*0.5) - 1.73) < 0.01
    id: 'v57',
    tingkat: 'sangat sulit',
    pertanyaan: 'Vektor a dan b adalah vektor satuan dengan sudut 60° di antaranya. Panjang a + b kira-kira…',
    pilihan: ['2,00', '1,00', '1,41', '0,50', '1,73'],
    benar: 4,
    langkah: [
      'Karena a dan b vektor satuan, |a| = |b| = 1, dan hasil kali titiknya a • b = |a||b| cos 60° = 1 · 1 · 1/2 = 1/2.',
      'Kuadrat panjang jumlahnya: |a + b|² = |a|² + 2(a • b) + |b|² = 1 + 2(1/2) + 1 = 3.',
      'Dengan demikian, |a + b| = √3 ≈ 1,73.',
      {
        teks: 'Secara gambar, a, b, dan a + b membentuk belah ketupat bersisi 1 dengan sudut 60°; diagonal panjangnya √3, seperti gambar berikut (a = (1, 0) dan b = (1/2, (1/2)√3)).',
        gambar: { jenis: 'vektor', panah: [{ ke: [1, 0], label: 'a', warna: 'samping' }, { ke: [0.5, 0.866], label: 'b' }, { ke: [1.5, 0.866], label: 'a + b, panjang √3', warna: 'depan' }], jangkauan: [-0.5, 2.5, -0.5, 1.5] },
      },
      'Jadi, panjang a + b kira-kira 1,73. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 2,00, menjumlahkan panjangnya, 1 + 1, yang hanya benar bila keduanya searah. Pilihan C, 1,41, memakai rumus vektor tegak lurus (√(1 + 1)), padahal sudutnya 60°. Pilihan B, 1,00, hasil untuk sudut 120°.',
    alasan: '|a + b|² = 1 + 2(1/2) + 1 = 3; |a + b| = √3 ≈ 1,73.',
  },
  {
    // cek: Math.abs(Math.hypot(2.5, 1.5) - 2.92) < 0.01
    id: 'v58',
    tingkat: 'sangat sulit',
    pertanyaan: 'Pada segitiga ABC, AB = (4, 0) dan AC = (1, 3). Panjang garis berat dari A ke titik tengah BC kira-kira…',
    gambar: { jenis: 'vektor', panah: [{ ke: [4, 0], label: 'AB', warna: 'samping' }, { ke: [1, 3], label: 'AC' }], jangkauan: [-1, 5, -1, 4] },
    pilihan: ['2,92', '3,50', '2,50', '4,00', '3,16'],
    benar: 0,
    langkah: [
      'Misalkan M titik tengah BC. Vektor dari A ke titik tengah BC adalah rata-rata kedua vektor ke ujungnya: AM = (AB + AC)/2.',
      'Dengan demikian, AM = ((4, 0) + (1, 3))/2 = (5, 3)/2 = (2,5; 1,5).',
      {
        teks: 'Panjang garis berat itu adalah panjang AM, seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [4, 0], label: 'AB', warna: 'samping' }, { ke: [1, 3], label: 'AC' }, { ke: [2.5, 1.5], label: 'AM = (2,5; 1,5)', warna: 'depan' }, { dari: [4, 0], ke: [-3, 3], label: 'BC', warna: 'sudut' }], jangkauan: [-1, 5, -1, 4] },
      },
      'Dengan teorema Pythagoras, |AM| = √(2,5² + 1,5²) = √(6,25 + 2,25) = √8,5 ≈ 2,92.',
      'Jadi, panjang garis berat dari A ke titik tengah BC kira-kira 2,92. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 3,50, adalah setengah dari |AB| + |AC| = (4 + √10)/2 ≈ 3,58 dibulatkan keliru; panjang rata-rata vektor bukan rata-rata panjangnya. Pilihan E, 3,16, adalah |AC| = √10. Pilihan C, 2,50, hanya komponen mendatar AM.',
    alasan: 'AM = (AB + AC)/2 = (2,5; 1,5); |AM| = √8,5 ≈ 2,92.',
  },
  {
    // cek: Math.abs(Math.acos(1/Math.sqrt(50))/D - 81.87) < 0.01
    id: 'v59',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sudut antara a = (1, 2) dan b = (3, −1) kira-kira…',
    gambar: { jenis: 'vektor', panah: [{ ke: [1, 2], label: 'a' }, { ke: [3, -1], label: 'b', warna: 'samping' }], jangkauan: [-1, 4, -2, 3] },
    pilihan: ['45°', '81,9°', '90°', '63,4°', '18,4°'],
    benar: 1,
    langkah: [
      'Misalkan θ sudut antara a dan b. Kosinus sudutnya dinyatakan oleh cos θ = (a • b)/(|a||b|).',
      'Hitung bagian-bagiannya: a • b = (1)(3) + (2)(−1) = 3 − 2 = 1; |a| = √(1 + 4) = √5; |b| = √(9 + 1) = √10.',
      'Dengan demikian, cos θ = 1/(√5 · √10) = 1/√50 = 1/(5√2) ≈ 0,1414.',
      'Untuk itu, θ = arccos(0,1414) ≈ 81,87°. Sudutnya hampir siku-siku karena hasil kali titiknya kecil dibanding panjangnya.',
      'Jadi, sudut antara a dan b kira-kira 81,9°. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, 90°, mengira a • b = 0, padahal 3 − 2 = 1 ≠ 0. Pilihan D, 63,4°, adalah sudut a terhadap sumbu-x (tan = 2), dan pilihan E, 18,4°, sudut b terhadap sumbu-x (tan = 1/3); sudut antara keduanya adalah jumlahnya 81,9°, bukan salah satunya.',
    alasan: 'cos θ = 1/(√5 · √10) = 1/√50, θ ≈ 81,9°.',
  },
  {
    // cek: (2 + -1*1)*2 + (1 + -1*3)*1 === 0
    id: 'v60',
    tingkat: 'sangat sulit',
    pertanyaan: 'Diketahui a = (2, 1) dan b = (1, 3). Nilai t supaya a + t·b tegak lurus dengan a adalah…',
    pilihan: ['1', '−1', '−5', '5', '0'],
    benar: 1,
    langkah: [
      'Tulis dulu vektor yang dimaksud: a + t·b = (2, 1) + t(1, 3) = (2 + t, 1 + 3t).',
      'Karena a + t·b ⊥ a, hasil kali titiknya nol: (2 + t, 1 + 3t) • (2, 1) = 0.',
      'Hitung: (2 + t)(2) + (1 + 3t)(1) = 4 + 2t + 1 + 3t = 5 + 5t. Samakan dengan nol: 5 + 5t = 0, sehingga t = −1.',
      {
        teks: 'Sebagai pemeriksaan, untuk t = −1 diperoleh a + t·b = (1, −2), dan (1, −2) • (2, 1) = 2 − 2 = 0, memang tegak lurus, seperti gambar berikut.',
        gambar: { jenis: 'vektor', panah: [{ ke: [2, 1], label: 'a' }, { ke: [1, 3], label: 'b', warna: 'samping' }, { ke: [1, -2], label: 'a − b ⊥ a', warna: 'depan' }], jangkauan: [-1, 4, -3, 4] },
      },
      'Jadi, nilai t adalah −1. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 1, salah tanda saat menyelesaikan 5 + 5t = 0. Pilihan C, −5, berhenti pada 5t = −5 tanpa membagi 5. Pilihan E, 0, mengira a sendiri sudah tegak lurus dengan dirinya, padahal a • a = 5 ≠ 0.',
    alasan: '(2 + t)·2 + (1 + 3t)·1 = 5 + 5t = 0 memberi t = −1.',
  },
]

/**
 * Paket kuis bab: 10 soal yang konsepnya diajarkan materi bab ini, dengan
 * materi asalnya (ARYA 20 Sep 2026). Dikurasi dengan membaca soal dan
 * bacaan materinya; soal bank lain tetap di menu Latihan. Urutan soal dan
 * pilihannya diacak di peramban. Pemeriksa: `node alat/cek_kuis_bab.mjs`.
 */
export const KUIS_BAB: ButirKuisBab[] = [
  { id: 'v01', materi: 'angka-saja-tidak-cukup' },
  { id: 'v37', materi: 'panah-yang-boleh-dipindah' },
  { id: 'v06', materi: 'memecah-panah' },
  { id: 'v02', materi: 'panjang-dan-arah' },
  { id: 'v10', materi: 'arah-tanpa-panjang' },
  { id: 'v03', materi: 'menjumlah-vektor' },
  { id: 'v11', materi: 'jajar-genjang' },
  { id: 'v04', materi: 'mengurangi-vektor' },
  { id: 'v38', materi: 'kali-skalar' },
  { id: 'v21', materi: 'perkalian-titik' },
]
