import type { SoalKuis } from '@/content/tipe'

/**
 * Bank 32 soal kuis topik Ruang Tiga Dimensi.
 *
 * Tiap sesi kuis mengambil 8 soal dan menghindari yang sudah pernah keluar,
 * jadi empat sesi pertama tidak mengulang satu soal pun.
 *
 * KALIBRASI KESULITAN
 * Patokannya lima soal Ujian Nasional asli. Empat di antaranya masuk ke bank
 * ini apa adanya beserta sumbernya (k19 sampai k22), dan sisanya ditulis
 * sendiri dengan tingkat yang disamakan. Tanpa patokan itu, soal buatan
 * cenderung terlalu mudah, dan itu temuan ARYA, bukan dugaan.
 *
 * SEMUA jawaban numerik diperiksa `alat/cek_ruang.py` dengan sympy lewat
 * berkas `alat/soal-ruang-3d.json`, sebelum dipasang di sini.
 *
 * Kubus acuannya selalu ABCD.EFGH: alas ABCD, tutup EFGH, A tepat di bawah E.
 */

export const KUIS: SoalKuis[] = [
  /* ---------------------------- mudah ---------------------------- */
  {
    id: 'r01',
    tingkat: 'mudah',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 10 cm. Berapa panjang diagonal sisi AC?',
    pilihan: ['10 cm', '10 akar 2 cm', '10 akar 3 cm', '20 cm', '100 cm'],
    benar: 1,
    alasan:
      'AC diagonal sebuah sisi, jadi Pythagoras sekali: AC² = 10² + 10² = 200, AC = 10 akar 2. Yang memilih 10 akar 3 tertukar dengan diagonal RUANG, dan 20 datang dari menjumlahkan panjang begitu saja tanpa Pythagoras.',
  },
  {
    id: 'r02',
    tingkat: 'mudah',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 5 cm. Berapa panjang diagonal ruang AG?',
    pilihan: ['5 akar 2 cm', '5 akar 3 cm', '5 akar 5 cm', '10 cm', '15 cm'],
    benar: 1,
    alasan:
      'Diagonal ruang melewati tiga arah sekaligus, jadi AG² = 5² + 5² + 5² = 75 dan AG = 5 akar 3. Angka 3 di dalam akar menghitung ada berapa arah yang dilewati.',
  },
  {
    id: 'r03',
    tingkat: 'mudah',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan garis AB terhadap garis HG?',
    pilihan: ['Berpotongan', 'Sejajar', 'Bersilangan', 'Berimpit', 'Tegak lurus'],
    benar: 1,
    alasan:
      'AB rusuk alas depan, HG rusuk tutup belakang. Arah keduanya sama persis, dan ada satu bidang yang memuat keduanya, yaitu bidang ABGH. Jadi sejajar, bukan bersilangan.',
  },
  {
    id: 'r04',
    tingkat: 'mudah',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan garis AB terhadap garis CG?',
    pilihan: ['Berpotongan', 'Sejajar', 'Bersilangan', 'Berimpit', 'Tidak dapat ditentukan'],
    benar: 2,
    alasan:
      'Keduanya tidak punya titik persekutuan dan arahnya berbeda. Tidak ada satu bidang pun yang memuat keduanya, jadi bersilangan. Kalau digambar dari sudut tertentu keduanya bisa TAMPAK berpotongan, dan itulah jebakan gambar datar.',
  },
  {
    id: 'r05',
    tingkat: 'mudah',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 7 cm. Berapa jarak bidang alas ABCD ke bidang tutup EFGH?',
    pilihan: ['3,5 cm', '7 cm', '7 akar 2 cm', '7 akar 3 cm', '14 cm'],
    benar: 1,
    alasan:
      'Kedua bidang sejajar, jadi ambil satu titik sembarang saja. Ambil A, jaraknya ke tutup adalah panjang rusuk AE, yaitu 7. Tidak perlu rumus baru.',
  },
  {
    id: 'r06',
    tingkat: 'mudah',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 3 cm. Berapa jarak titik A ke titik G?',
    pilihan: ['3 cm', '3 akar 2 cm', '3 akar 3 cm', '6 cm', '9 cm'],
    benar: 2,
    alasan:
      'A dan G adalah dua sudut yang paling berjauhan pada kubus, jadi AG adalah diagonal ruang: 3 akar 3, kira-kira 5,196 cm.',
  },
  {
    id: 'r07',
    tingkat: 'mudah',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan garis AG terhadap bidang alas ABCD?',
    pilihan: [
      'Terletak pada bidang',
      'Sejajar bidang',
      'Menembus bidang',
      'Tegak lurus bidang',
      'Berimpit dengan bidang',
    ],
    benar: 2,
    alasan:
      'AG hanya menyentuh alas di titik A, lalu naik meninggalkannya, jadi menembus. Ia bukan tegak lurus alas, sebab yang tegak lurus alas adalah rusuk tegak seperti AE.',
  },
  {
    id: 'r08',
    tingkat: 'mudah',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan garis EF terhadap bidang alas ABCD?',
    pilihan: [
      'Terletak pada bidang',
      'Sejajar bidang',
      'Menembus bidang',
      'Tegak lurus bidang',
      'Berpotongan di titik A',
    ],
    benar: 1,
    alasan:
      'EF ada di tutup kubus dan tidak pernah menyentuh alas, berapa pun diperpanjang. Jadi sejajar. Jaraknya ke alas tetap satu rusuk di sepanjang garis.',
  },

  /* --------------------------- sedang ---------------------------- */
  {
    id: 'r09',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak titik B ke garis AC?',
    pilihan: ['3 cm', '3 akar 2 cm', '6 cm', '6 akar 2 cm', '2 akar 6 cm'],
    benar: 1,
    alasan:
      'Segitiga ABC sama kaki, jadi kaki tegak lurus dari B jatuh tepat di tengah AC. Panjangnya setengah diagonal alas: 3 akar 2, kira-kira 4,243. Yang menjawab 6 mengukur ke titik A atau C, dan itu bukan yang terpendek.',
  },
  {
    id: 'r10',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak titik A ke bidang BDE?',
    pilihan: ['2 akar 3 cm', '3 akar 2 cm', '2 akar 6 cm', '6 cm', '6 akar 3 cm'],
    benar: 0,
    alasan:
      'Kaki tegak lurusnya jatuh di titik berat segitiga BDE, yang terletak pada diagonal ruang AG di sepertiga panjangnya. Jadi jaraknya sepertiga dari 6 akar 3, yaitu 2 akar 3. Yang menjawab 6 mengukur AB, AD, atau AE, dan ketiganya miring terhadap bidang itu.',
  },
  {
    id: 'r11',
    tingkat: 'sedang',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara garis AH dan garis AF?',
    pilihan: ['30 derajat', '45 derajat', '60 derajat', '90 derajat', '120 derajat'],
    benar: 2,
    alasan:
      'AH, AF, dan FH sama-sama diagonal sisi, jadi segitiga AFH sama sisi dan setiap sudutnya 60 derajat. Yang menjawab 45 mengira sudutnya sama dengan sudut diagonal pada persegi, padahal segitiga ini berdiri miring di dalam ruang.',
  },
  {
    id: 'r12',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 9 cm. Berapa jarak garis AE ke bidang BCGF?',
    pilihan: ['4,5 cm', '9 cm', '9 akar 2 cm', '9 akar 3 cm', '18 cm'],
    benar: 1,
    alasan:
      'AE sejajar bidang BCGF, jadi cukup ambil satu titik. Ambil A, jaraknya ke sisi kanan adalah panjang rusuk AB, yaitu 9. Titik mana pun pada AE memberi angka yang sama.',
  },
  {
    id: 'r13',
    tingkat: 'sedang',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara diagonal ruang AG dan bidang alas ABCD?',
    pilihan: [
      'kira-kira 30 derajat',
      'kira-kira 35,26 derajat',
      'kira-kira 45 derajat',
      'kira-kira 54,74 derajat',
      'kira-kira 60 derajat',
    ],
    benar: 1,
    alasan:
      'Bayangan AG pada alas adalah AC. Pada segitiga ACG yang siku-siku di C, tan sudut = CG dibagi AC = 1 dibagi akar 2, sehingga sudutnya kira-kira 35,26 derajat. Angka 54,74 adalah pelengkapnya sampai 90, dan itu jawaban untuk sudut bidang BDG terhadap alas, bukan yang ini.',
  },
  {
    id: 'r14',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 12 cm. Berapa jarak titik C ke bidang BDG?',
    pilihan: ['4 akar 3 cm', '4 akar 6 cm', '6 akar 2 cm', '12 cm', '2 akar 3 cm'],
    benar: 0,
    alasan:
      'Susunannya kembar dengan jarak A ke bidang BDE: sebuah titik sudut dan bidang yang memotong ketiga tetangganya. Jaraknya sepertiga diagonal ruang, yaitu sepertiga dari 12 akar 3, jadi 4 akar 3.',
  },
  {
    id: 'r15',
    tingkat: 'sedang',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan garis AC terhadap garis BG?',
    pilihan: ['Berpotongan di B', 'Sejajar', 'Bersilangan', 'Berimpit', 'Berpotongan di G'],
    benar: 2,
    alasan:
      'AC ada di alas, BG ada di sisi kanan. Keduanya tidak punya titik persekutuan dan arahnya berbeda, jadi bersilangan. Meski begitu sudut di antara keduanya tetap bisa diukur, caranya salah satu digeser sejajar dirinya sendiri sampai bertemu.',
  },
  {
    id: 'r16',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak titik E ke garis AG?',
    pilihan: ['2 akar 3 cm', '2 akar 6 cm', '3 akar 2 cm', '6 cm', '6 akar 2 cm'],
    benar: 1,
    alasan:
      'Jawabannya 2 akar 6, kira-kira 4,899. Menariknya, titik B dan D memberi angka yang sama persis, sebab diagonal ruang AG adalah sumbu simetri kubus dan ketiga tetangga titik A duduk mengelilinginya.',
  },
  {
    id: 'r17',
    tingkat: 'sedang',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara bidang BDG dan bidang alas ABCD?',
    pilihan: [
      'kira-kira 30 derajat',
      'kira-kira 35,26 derajat',
      'kira-kira 45 derajat',
      'kira-kira 54,74 derajat',
      'kira-kira 60 derajat',
    ],
    benar: 3,
    alasan:
      'Garis potongnya BD. Ambil titik P di tengah BD, lalu tarik PC di alas dan PG di bidang BDG, keduanya tegak lurus BD dan bertumpu di P yang sama. tan sudut = CG dibagi PC = 6 dibagi 3 akar 2, jadi kira-kira 54,74 derajat.',
  },
  {
    id: 'r18',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa panjang proyeksi diagonal ruang AG pada bidang alas ABCD?',
    pilihan: ['6 cm', '6 akar 2 cm', '6 akar 3 cm', '3 akar 2 cm', '12 cm'],
    benar: 1,
    alasan:
      'Bayangan A adalah A sendiri, dan bayangan G adalah C. Jadi proyeksinya AC, yaitu diagonal alas sepanjang 6 akar 2. Yang menjawab 6 akar 3 menyebutkan panjang AG-nya sendiri, bukan bayangannya.',
  },

  /* ---------------------------- sulit ---------------------------- */
  {
    id: 'r19',
    tingkat: 'sulit',
    pertanyaan:
      'Kubus ABCD.EFGH berusuk 4 cm. Titik P adalah titik tengah EH. Berapa jarak titik P ke garis CF? (Soal UAN 2003)',
    pilihan: ['akar 8 cm', 'akar 12 cm', 'akar 14 cm', 'akar 18 cm', 'akar 20 cm'],
    benar: 3,
    alasan:
      'Jawabannya akar 18, yaitu 3 akar 2. Kelima pilihan sengaja berbentuk akar yang mirip, jadi menebak dari bentuknya tidak menolong. Pasang koordinat, cari kaki tegak lurus dari P pada CF, lalu ukur.',
  },
  {
    id: 'r20',
    tingkat: 'sulit',
    pertanyaan:
      'Kubus ABCD.EFGH berusuk 8 cm. Berapa panjang proyeksi DE pada bidang BDHF? (Soal UN 2004)',
    pilihan: ['2 akar 2 cm', '2 akar 6 cm', '4 akar 2 cm', '4 akar 6 cm', '8 akar 2 cm'],
    benar: 3,
    alasan:
      'Titik D sudah ada di bidang BDHF, jadi bayangannya dirinya sendiri. Bayangan E adalah titik tengah EG. Panjang proyeksinya 4 akar 6. Pengecoh 4 akar 2 adalah jarak E ke bidangnya, bukan panjang proyeksinya.',
  },
  {
    id: 'r21',
    tingkat: 'sulit',
    pertanyaan:
      'Kubus ABCD.EFGH berusuk 6 cm. Berapa panjang proyeksi AF pada bidang ACGE? (Soal EBTANAS 1999)',
    pilihan: ['3 akar 2 cm', '3 akar 3 cm', '3 akar 6 cm', '6 akar 2 cm', '6 akar 3 cm'],
    benar: 2,
    alasan:
      'Bayangan A adalah A sendiri, dan bayangan F jatuh di titik tengah antara F dan H. Panjang proyeksinya 3 akar 6, kira-kira 7,348. Bidang ACGE adalah bidang diagonal yang berdiri tegak membelah kubus.',
  },
  {
    id: 'r22',
    tingkat: 'sulit',
    pertanyaan:
      'Pada kubus ABCD.EFGH, berapa besar sudut antara garis AH dan bidang diagonal BDHF? (Soal UAN 2005)',
    pilihan: ['30 derajat', '45 derajat', '60 derajat', '75 derajat', '90 derajat'],
    benar: 0,
    alasan:
      'Jawabannya tepat 30 derajat. Yang perlu dicari dulu bayangan AH pada bidang BDHF, bukan langsung mengukur sudut AH terhadap rusuk terdekat. Yang menjawab 45 biasanya melihat AH sebagai diagonal persegi dan berhenti di situ.',
  },
  {
    id: 'r23',
    tingkat: 'sulit',
    pertanyaan:
      'Kubus ABCD.EFGH berusuk 6 cm. Titik M adalah titik tengah rusuk EF. Berapa jarak titik M ke garis BD?',
    pilihan: [
      '3 akar 2 cm',
      '4,5 akar 2 cm',
      '6 cm',
      '3 akar 6 cm',
      '6 akar 2 cm',
    ],
    benar: 1,
    alasan:
      'Jawabannya 4,5 akar 2, kira-kira 6,364. Kaki tegak lurusnya tidak jatuh di titik bernama, jadi jalan paling aman memasang koordinat lalu memakai jalan pintas luas segitiga.',
  },
  {
    id: 'r24',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak antara garis AE dan garis BG?',
    pilihan: ['3 cm', '3 akar 2 cm', '6 cm', '6 akar 2 cm', 'Tidak dapat dihitung karena bersilangan'],
    benar: 2,
    alasan:
      'Garis bersilangan tetap punya jarak, yaitu panjang ruas yang tegak lurus keduanya. Di sini jaraknya 6, sama dengan satu rusuk. Pilihan terakhir menggoda tetapi salah: bersilangan bukan berarti jaraknya tidak ada.',
  },
  {
    id: 'r25',
    tingkat: 'sulit',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara garis AF dan garis BG?',
    pilihan: ['30 derajat', '45 derajat', '60 derajat', '75 derajat', '90 derajat'],
    benar: 2,
    alasan:
      'Keduanya bersilangan, jadi geser dulu salah satunya sejajar dirinya sendiri sampai bertemu. Setelah digeser, sudutnya menjadi sudut segitiga sama sisi, yaitu 60 derajat. Menggeser tidak mengubah arah, jadi tidak mengubah sudut.',
  },
  {
    id: 'r26',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak titik G ke bidang ACF?',
    pilihan: ['2 akar 3 cm', '3 akar 2 cm', '2 akar 6 cm', '4 akar 3 cm', '6 cm'],
    benar: 0,
    alasan:
      'Jawabannya 2 akar 3, sama dengan jarak A ke bidang BDE. Itu bukan kebetulan: keduanya susunan yang sama, sebuah titik sudut dan bidang yang memotong ketiga tetangganya, hanya dilihat dari ujung kubus yang berlawanan.',
  },

  /* ------------------------ sangat sulit ------------------------- */
  {
    id: 'r27',
    tingkat: 'sangat sulit',
    pertanyaan:
      'Balok ABCD.EFGH mempunyai panjang 8 cm, lebar 6 cm, dan tinggi 4 cm. Berapa panjang diagonal ruang AG?',
    pilihan: ['2 akar 29 cm', '10 cm', '4 akar 6 cm', '2 akar 26 cm', '18 cm'],
    benar: 0,
    alasan:
      'Untuk balok, diagonal ruangnya akar dari 8² + 6² + 4² = 64 + 36 + 16 = 116, jadi 2 akar 29, kira-kira 10,770. Yang menjawab 10 berhenti di diagonal alas 8 dan 6, lupa menambahkan tingginya.',
  },
  {
    id: 'r28',
    tingkat: 'sangat sulit',
    pertanyaan:
      'Limas T.ABCD mempunyai alas persegi bersisi 6 cm dan tinggi 4 cm, dengan T tepat di atas titik potong diagonal alas. Berapa besar sudut antara bidang sisi TAB dan bidang alas?',
    pilihan: [
      'kira-kira 33,69 derajat',
      'kira-kira 41,81 derajat',
      'kira-kira 48,19 derajat',
      'kira-kira 53,13 derajat',
      'kira-kira 56,31 derajat',
    ],
    benar: 3,
    alasan:
      'Garis potongnya AB. Ambil titik tengah AB, lalu tarik satu garis mendatar ke tengah alas (panjang 3) dan satu garis miring ke T. tan sudut = 4 dibagi 3, jadi kira-kira 53,13 derajat. Yang menjawab 33,69 memakai tan 4 per 6, yaitu mengukur dari sudut alas, bukan dari tengah sisi.',
  },
  {
    id: 'r29',
    tingkat: 'sangat sulit',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara bidang ACF dan bidang alas ABCD?',
    pilihan: [
      'kira-kira 35,26 derajat',
      'kira-kira 45 derajat',
      'kira-kira 54,74 derajat',
      'kira-kira 60 derajat',
      'kira-kira 70,53 derajat',
    ],
    benar: 2,
    alasan:
      'Garis potongnya AC. Ambil titik tengah AC, lalu tarik garis ke B di alas dan garis ke F di bidang ACF, keduanya tegak lurus AC dan bertumpu di titik yang sama. Hasilnya kira-kira 54,74 derajat, sama besar dengan sudut bidang BDG terhadap alas, sebab keduanya bidang yang sejenis.',
  },
  {
    id: 'r30',
    tingkat: 'sangat sulit',
    pertanyaan:
      'Balok ABCD.EFGH mempunyai panjang 8 cm, lebar 6 cm, dan tinggi 4 cm. Berapa jarak titik A ke bidang BDHF?',
    pilihan: ['4,8 cm', '5 cm', '3,4 cm', '6,4 cm', '2,4 cm'],
    benar: 0,
    alasan:
      'Bidang BDHF berdiri tegak di atas diagonal BD. Jadi soalnya menjadi jarak titik A ke garis BD pada persegi panjang alas 8 kali 6. BD = 10, dan jaraknya 8 kali 6 dibagi 10, yaitu 4,8. Ini jalan pintas luas segitiga yang dipakai di tahap 5.',
  },
  {
    id: 'r31',
    tingkat: 'sangat sulit',
    pertanyaan:
      'Kubus ABCD.EFGH berusuk 6 cm. Titik M adalah titik tengah rusuk AE. Berapa jarak titik M ke bidang BDG?',
    pilihan: ['2 akar 3 cm', '3 akar 3 cm', '4 akar 3 cm', '3 akar 2 cm', '6 cm'],
    benar: 1,
    alasan:
      'Jawabannya 3 akar 3, kira-kira 5,196. Perhatikan bahwa jarak A ke bidang BDG adalah 2 akar 3 dan jarak E ke bidang itu lebih besar, jadi titik tengahnya berada di antara keduanya. Memeriksa masuk akal tidaknya jawaban seperti ini menangkap banyak kesalahan hitung.',
  },
  {
    id: 'r32',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak titik F ke bidang ACH?',
    pilihan: ['2 akar 3 cm', '3 akar 3 cm', '4 akar 3 cm', '6 akar 3 cm', '3 akar 6 cm'],
    benar: 2,
    alasan:
      'Jawabannya 4 akar 3, kira-kira 6,928, yaitu dua pertiga diagonal ruang. Titik F berada di seberang bidang ACH, sedangkan titik B hanya berjarak sepertiga diagonal ruang dari bidang itu. Jangan tertukar antara keduanya.',
  },
]
