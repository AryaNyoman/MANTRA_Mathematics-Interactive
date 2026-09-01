import type { SoalKuis } from '@/content/tipe'

/**
 * Bank 32 soal kuis topik Vektor.
 *
 * SEBARANNYA 8 mudah, 10 sedang, 8 sulit, 6 sangat sulit. Satu sesi kuis
 * mengambil 8 soal dan menghindari yang sudah pernah keluar, jadi empat sesi
 * pertama tidak mengulang satu soal pun.
 *
 * KALIBRASI KESULITAN
 * Ditakar ke Latihan 3.1 sampai 3.6 pada Buku Panduan Guru Matematika SMA/SMK
 * Kelas X (Kemendikbudristek 2021). Soal di sana memakai komponen tiga dimensi
 * dan pembuktian tiga titik segaris, jadi tingkat "sangat sulit" di sini pun
 * mengikuti bentuk itu, bukan sekadar penjumlahan dengan angka besar.
 *
 * SELURUH ANGKA SUDAH DIPERIKSA MESIN:
 *   python alat/cek_vektor.py alat/soal-kuis-vektor.json
 * Hasilnya 53 dari 53 lolos. Kalau ada angka yang diubah, jalankan lagi.
 *
 * `id` tiap soal TETAP dan tidak boleh diubah: id itulah yang dipakai mengingat
 * soal mana yang sudah pernah keluar untuk siswa yang bersangkutan.
 */
export const KUIS: SoalKuis[] = [
  /* ---------------------------- mudah ---------------------------- */
  {
    id: 'v01',
    pertanyaan: 'Besaran berikut yang TERMASUK vektor adalah ...',
    pilihan: ['suhu', 'massa', 'perpindahan', 'waktu', 'panjang tali'],
    benar: 2,
    alasan: 'Vektor adalah besaran yang butuh arah. Perpindahan jelas butuh arah: berpindah 5 meter ke utara berbeda dengan 5 meter ke selatan. Massa, suhu, waktu, dan panjang tali selesai dijelaskan satu angka saja, jadi keempatnya skalar. Menyebut "massa 60 kg ke utara" tidak berarti apa-apa.',
    tingkat: 'mudah',
  },
  {
    id: 'v02',
    pertanyaan: 'Panjang vektor (3  4) adalah ...',
    pilihan: ['5', '7', '12', '25', '1'],
    benar: 0,
    alasan: 'Pythagoras: akar dari 3 kuadrat ditambah 4 kuadrat, yaitu akar 25, sama dengan 5. Pilihan 7 muncul kalau komponennya langsung dijumlahkan, dan 25 kalau akarnya lupa ditarik.',
    tingkat: 'mudah',
  },
  {
    id: 'v03',
    pertanyaan: 'Hasil dari (2  5) ditambah (3  -1) adalah ...',
    pilihan: ['(6  -5)', '(5  6)', '(-1  6)', '(5  4)', '(5  -4)'],
    benar: 3,
    alasan: 'Jumlahkan yang sejenis: mendatar 2 ditambah 3 sama dengan 5, tegak 5 ditambah negatif 1 sama dengan 4. Pilihan (5 6) muncul kalau tanda negatifnya terlewat.',
    tingkat: 'mudah',
  },
  {
    id: 'v04',
    pertanyaan: 'Hasil dari (7  2) dikurangi (3  5) adalah ...',
    pilihan: ['(4  3)', '(4  -3)', '(-4  3)', '(10  7)', '(4  7)'],
    benar: 1,
    alasan: 'Kurangkan yang sejenis: 7 dikurangi 3 sama dengan 4, dan 2 dikurangi 5 sama dengan negatif 3. Pilihan (-4 3) adalah hasil kalau urutannya dibalik, dan itu vektor lawannya.',
    tingkat: 'mudah',
  },
  {
    id: 'v05',
    pertanyaan: 'Hasil dari 3 dikali vektor (2  -1) adalah ...',
    pilihan: ['(2  -3)', '(6  -1)', '(5  2)', '(6  3)', '(6  -3)'],
    benar: 4,
    alasan: 'Setiap komponen dikalikan, tidak ada yang dilewati: 3 dikali 2 sama dengan 6, dan 3 dikali negatif 1 sama dengan negatif 3. Pilihan (6 -1) muncul kalau hanya komponen mendatarnya yang dikalikan.',
    tingkat: 'mudah',
  },
  {
    id: 'v06',
    pertanyaan: 'Diketahui A(2, 3) dan B(5, 7). Vektor AB adalah ...',
    pilihan: ['(7  10)', '(-3  -4)', '(3  4)', '(3  -4)', '(2  3)'],
    benar: 2,
    alasan: 'Ujung dikurangi pangkal: (5 dikurangi 2, 7 dikurangi 3) sama dengan (3 4). Pilihan (-3 -4) muncul kalau urutannya dibalik, dan (7 10) kalau kedua titiknya dijumlahkan.',
    tingkat: 'mudah',
  },
  {
    id: 'v07',
    pertanyaan: 'Panjang vektor (-8  6) adalah ...',
    pilihan: ['10', '-10', '2', '14', '100'],
    benar: 0,
    alasan: 'Akar dari negatif 8 kuadrat ditambah 6 kuadrat, yaitu akar dari 64 ditambah 36, sama dengan akar 100, hasilnya 10. Panjang tidak pernah negatif: tanda minusnya sudah hilang saat dikuadratkan, jadi pilihan negatif 10 mustahil.',
    tingkat: 'mudah',
  },
  {
    id: 'v08',
    pertanyaan: 'Vektor lawan dari (5  -2) adalah ...',
    pilihan: ['(2  -5)', '(-5  -2)', '(5  2)', '(-5  2)', '(-2  5)'],
    benar: 3,
    alasan: 'Vektor lawan berarti panjangnya sama tetapi arahnya berkebalikan, jadi KEDUA komponennya berganti tanda. Pilihan (-5 -2) hanya membalik satu komponen, sehingga arahnya berubah tetapi bukan menjadi berlawanan.',
    tingkat: 'mudah',
  },

  /* ---------------------------- sedang ---------------------------- */
  {
    id: 'v09',
    pertanyaan: 'Panjang vektor (2  3) adalah ...',
    pilihan: ['5', 'akar 13', '13', 'akar 5', '6'],
    benar: 1,
    alasan: 'Akar dari 4 ditambah 9 sama dengan akar 13, dan akar 13 bukan bilangan bulat, jadi memang ditinggalkan dalam bentuk akar. Pilihan 5 muncul kalau komponennya dijumlahkan, dan 13 kalau akarnya lupa ditarik.',
    tingkat: 'sedang',
  },
  {
    id: 'v10',
    pertanyaan: 'Vektor satuan yang searah dengan (8  -6) adalah ...',
    pilihan: ['(0,57  -0,43)', '(8  -6)', '(-0,8  0,6)', '(4  -3)', '(0,8  -0,6)'],
    benar: 4,
    alasan: 'Panjangnya 10, jadi tiap komponen dibagi 10. Pilihan (4 -3) muncul kalau dibagi 2 saja, dan (0,57 -0,43) kalau pembaginya 14 yaitu jumlah komponen tanpa tanda. Yang jadi pembagi selalu panjangnya.',
    tingkat: 'sedang',
  },
  {
    id: 'v11',
    pertanyaan: 'Dua gaya bekerja pada satu titik: 9 newton ke timur dan 12 newton ke utara. Besar resultannya adalah ...',
    pilihan: ['3 newton', '21 newton', '15 newton', '108 newton', '10,5 newton'],
    benar: 2,
    alasan: 'Karena keduanya tegak lurus, resultannya akar dari 81 ditambah 144, yaitu akar 225, sama dengan 15. Pilihan 21 muncul kalau kedua besarnya dijumlahkan begitu saja, dan itu hanya benar kalau keduanya searah.',
    tingkat: 'sedang',
  },
  {
    id: 'v12',
    pertanyaan: 'Diketahui A(-1, 4) dan B(3, -2). Panjang vektor AB adalah ...',
    pilihan: ['2 akar 13', '2', '10', 'akar 20', '52'],
    benar: 0,
    alasan: 'AB sama dengan (4 -6), sehingga panjangnya akar dari 16 ditambah 36, yaitu akar 52. Akar 52 disederhanakan menjadi 2 akar 13. Pilihan 2 muncul kalau komponennya dijumlahkan, yaitu 4 ditambah negatif 6.',
    tingkat: 'sedang',
  },
  {
    id: 'v13',
    pertanyaan: 'Vektor (3  p) sejajar dengan vektor (6  10). Nilai p adalah ...',
    pilihan: ['7', '3', '4', '5', '20'],
    benar: 3,
    alasan: 'Sejajar berarti yang satu kelipatan yang lain. Karena 6 adalah 2 kali 3, pengalinya 2, sehingga 10 harus 2 kali p, jadi p sama dengan 5. Pilihan 4 sering dipilih karena mengira selisihnya yang harus sama.',
    tingkat: 'sedang',
  },
  {
    id: 'v14',
    pertanyaan: 'Diketahui a = (3  1) dan b = (4  -2). Hasil dari 2a dikurangi b adalah ...',
    pilihan: ['(2  0)', '(2  4)', '(10  0)', '(-2  -4)', '(6  -1)'],
    benar: 1,
    alasan: '2a sama dengan (6 2), lalu dikurangi (4 -2): mendatar 6 dikurangi 4 sama dengan 2, tegak 2 dikurangi negatif 2 sama dengan 4. Pilihan (2 0) muncul kalau tanda negatif pada b terlewat saat dikurangkan.',
    tingkat: 'sedang',
  },
  {
    id: 'v15',
    pertanyaan: 'Panjang vektor (1  2  2) di ruang tiga dimensi adalah ...',
    pilihan: ['2', '5', '9', 'akar 5', '3'],
    benar: 4,
    alasan: 'Caranya sama dengan dua dimensi, hanya ditambah satu komponen: akar dari 1 ditambah 4 ditambah 4, yaitu akar 9, sama dengan 3. Pilihan 5 muncul kalau komponennya dijumlahkan, dan 9 kalau akarnya lupa ditarik.',
    tingkat: 'sedang',
  },
  {
    id: 'v16',
    pertanyaan: 'Diketahui vektor posisi A(1, 2) dan B(3, -1). Hasil dari 2 kali OA dikurangi OB adalah ...',
    pilihan: ['(1  5)', '(5  3)', '(-1  5)', '(-1  3)', '(5  5)'],
    benar: 2,
    alasan: '2 kali OA sama dengan (2 4), lalu dikurangi OB yaitu (3 -1): mendatar 2 dikurangi 3 sama dengan negatif 1, tegak 4 dikurangi negatif 1 sama dengan 5. Pilihan (5 3) muncul kalau keduanya dijumlahkan, bukan dikurangkan.',
    tingkat: 'sedang',
  },
  {
    id: 'v17',
    pertanyaan: 'Berapa panjang vektor satuan dari sebuah vektor yang panjangnya 17?',
    pilihan: ['1', '17', '1 per 17', 'akar 17', 'bergantung arahnya'],
    benar: 0,
    alasan: 'Panjang vektor satuan selalu tepat 1, berapa pun panjang vektor asalnya dan ke mana pun arahnya. Itu memang definisinya, dan itu pula gunanya: ia menyatakan arah saja, tanpa ikut membawa keterangan sejauh apa.',
    tingkat: 'sedang',
  },
  {
    id: 'v18',
    pertanyaan: 'Perahu didayung tegak lurus menyeberangi sungai dengan perpindahan 4 km tiap jam, sementara arus membawanya 3 km tiap jam ke hilir. Jarak yang benar-benar ditempuh perahu dalam satu jam adalah ...',
    pilihan: ['4 km', '7 km', '1 km', '5 km', '12 km'],
    benar: 3,
    alasan: 'Kedua perpindahan itu tegak lurus, jadi hasilnya (3 4) dan panjangnya akar dari 9 ditambah 16, yaitu 5 km. Pilihan 7 muncul kalau keduanya dijumlahkan langsung, dan 4 kalau arusnya dianggap tidak berpengaruh.',
    tingkat: 'sedang',
  },

  /* ---------------------------- sulit ---------------------------- */
  {
    id: 'v19',
    pertanyaan: 'Titik A(1, 2), B(4, 6), dan C(p, 14) terletak pada satu garis lurus. Nilai p adalah ...',
    pilihan: ['8', '10', '7', '12', '6'],
    benar: 1,
    alasan: 'AB sama dengan (3 4) dan BC sama dengan (p minus 4, 8). Karena 8 adalah 2 kali 4, pengalinya 2, sehingga p dikurangi 4 harus sama dengan 2 kali 3, yaitu 6, jadi p sama dengan 10. Pilihan 7 muncul kalau yang dipakai AC, bukan BC, tanpa menyesuaikan pengalinya.',
    tingkat: 'sulit',
  },
  {
    id: 'v20',
    pertanyaan: 'Diketahui a = (3  4) dan b = (-1  2). Panjang dari a ditambah b adalah ...',
    pilihan: ['40', '5 ditambah akar 5', '8', 'akar 10', '2 akar 10'],
    benar: 4,
    alasan: 'Jumlahkan komponennya lebih dulu: (2 6). Panjangnya akar dari 4 ditambah 36, yaitu akar 40, disederhanakan menjadi 2 akar 10. Pilihan "5 ditambah akar 5" muncul kalau panjang masing-masing dijumlahkan, dan panjang memang tidak boleh dijumlahkan.',
    tingkat: 'sulit',
  },
  {
    id: 'v21',
    pertanyaan: 'Hasil kali titik antara (5  -2) dan (3  4) adalah ...',
    pilihan: ['(15  -8)', '23', '7', '-7', '26'],
    benar: 2,
    alasan: '5 dikali 3 sama dengan 15, lalu negatif 2 dikali 4 sama dengan negatif 8, dijumlahkan menjadi 7. Pilihan (15 -8) salah bentuknya, bukan cuma salah angkanya: hasil kali titik selalu berupa satu bilangan, tidak pernah berupa pasangan.',
    tingkat: 'sulit',
  },
  {
    id: 'v22',
    pertanyaan: 'Sudut antara vektor (1  1) dan vektor (0  3) adalah ...',
    pilihan: ['45 derajat', '90 derajat', '30 derajat', '60 derajat', '0 derajat'],
    benar: 0,
    alasan: 'Vektor (1 1) menghadap 45 derajat dari sumbu mendatar, sedangkan (0 3) menghadap tepat ke atas yaitu 90 derajat. Selisihnya 45 derajat. Bisa juga lewat hasil kali titik: 3 dibagi hasil kali akar 2 dan 3, yaitu 1 per akar 2, dan itu kosinus 45 derajat.',
    tingkat: 'sulit',
  },
  {
    id: 'v23',
    pertanyaan: 'Vektor (x  3) panjangnya 5. Nilai x yang mungkin adalah ...',
    pilihan: ['8 atau -8', 'hanya 4', '2 atau -2', '4 atau -4', 'hanya 2'],
    benar: 3,
    alasan: 'x kuadrat ditambah 9 sama dengan 25, jadi x kuadrat sama dengan 16 dan x sama dengan 4 atau negatif 4. Keduanya sah: vektor (4 3) dan (-4 3) sama-sama sepanjang 5, hanya arahnya berbeda. Menjawab "hanya 4" melupakan bahwa kuadrat menghapus tanda.',
    tingkat: 'sulit',
  },
  {
    id: 'v24',
    pertanyaan: 'Resultan dari tiga vektor (2  1), (-3  4), dan (1  -2) mempunyai panjang ...',
    pilihan: ['0', '3', '5', 'akar 10', '9'],
    benar: 1,
    alasan: 'Jumlahkan ketiganya secara komponen: mendatar 2 ditambah negatif 3 ditambah 1 sama dengan 0, tegak 1 ditambah 4 ditambah negatif 2 sama dengan 3. Resultannya (0 3), panjangnya 3. Pilihan 0 muncul kalau melihat komponen mendatarnya nol lalu mengira seluruh resultannya nol.',
    tingkat: 'sulit',
  },
  {
    id: 'v25',
    pertanyaan: 'Dua vektor saling tegak lurus dengan panjang 3 dan 4. Panjang jumlah kedua vektor itu adalah ...',
    pilihan: ['tidak bisa ditentukan', '7', '1', '12', '5'],
    benar: 4,
    alasan: 'Karena tegak lurus, keduanya membentuk segitiga siku-siku dengan jumlahnya sebagai sisi miring, jadi panjangnya akar dari 9 ditambah 16, yaitu 5. Pilihan 7 benar hanya kalau keduanya searah, dan 1 hanya kalau berlawanan.',
    tingkat: 'sulit',
  },
  {
    id: 'v26',
    pertanyaan: 'Vektor satuan yang BERLAWANAN arah dengan (4  -3) adalah ...',
    pilihan: ['(-4  3)', '(0,8  -0,6)', '(-0,8  0,6)', '(-0,6  0,8)', '(0,6  -0,8)'],
    benar: 2,
    alasan: 'Panjangnya 5, jadi vektor satuan yang searah adalah (0,8 -0,6). Karena yang diminta berlawanan arah, kedua tandanya dibalik menjadi (-0,8 0,6). Pilihan (-4 3) memang berlawanan arah tetapi panjangnya 5, bukan 1, jadi ia bukan vektor satuan.',
    tingkat: 'sulit',
  },

  /* -------------------------- sangat sulit -------------------------- */
  {
    id: 'v27',
    pertanyaan: 'Vektor (2  k) tegak lurus dengan vektor (3  -6). Nilai k adalah ...',
    pilihan: ['1', '-1', '4', '-4', '2'],
    benar: 0,
    alasan: 'Tegak lurus berarti hasil kali titiknya nol: 2 dikali 3 ditambah k dikali negatif 6 sama dengan nol, yaitu 6 dikurangi 6k sama dengan nol, jadi k sama dengan 1. Pilihan negatif 1 muncul kalau tanda negatif pada negatif 6 ikut dibawa dua kali.',
    tingkat: 'sangat sulit',
  },
  {
    id: 'v28',
    pertanyaan: 'Panjang proyeksi vektor (5  12) pada vektor (3  4) adalah ...',
    pilihan: ['2,52', '63', '13', '12,6', '5'],
    benar: 3,
    alasan: 'Hasil kali titiknya 15 ditambah 48 sama dengan 63, dan panjang (3 4) adalah 5, jadi panjang proyeksinya 63 dibagi 5, yaitu 12,6. Pilihan 63 muncul kalau lupa membagi, dan 2,52 kalau dibagi kuadrat panjangnya, padahal yang dibagi kuadrat itu rumus vektor proyeksinya.',
    tingkat: 'sangat sulit',
  },
  {
    id: 'v29',
    pertanyaan: 'Diketahui panjang a adalah 5, panjang b adalah 3, dan sudut antara keduanya 60 derajat. Panjang dari a dikurangi b adalah ...',
    pilihan: ['2', 'akar 19', 'akar 49', '8', 'akar 34'],
    benar: 1,
    alasan: 'Kuadrat panjang selisihnya sama dengan 25 ditambah 9 dikurangi 2 dikali 5 dikali 3 dikali kosinus 60 derajat. Kosinus 60 derajat adalah setengah, jadi bagian terakhirnya 15, sehingga hasilnya 34 dikurangi 15 sama dengan 19, dan panjangnya akar 19. Pilihan akar 34 muncul kalau sudutnya dianggap 90 derajat.',
    tingkat: 'sangat sulit',
  },
  {
    id: 'v30',
    pertanyaan: 'Titik A(1, 2, 3), B(3, 5, 7), dan C(7, 11, p) terletak pada satu garis lurus. Nilai p adalah ...',
    pilihan: ['8', '11', '13', '14', '15'],
    benar: 4,
    alasan: 'AB sama dengan (2 3 4) dan BC sama dengan (4 6, p dikurangi 7). Dari dua komponen pertama terlihat pengalinya 2, jadi p dikurangi 7 harus sama dengan 2 kali 4, yaitu 8, sehingga p sama dengan 15. Pilihan 11 muncul kalau pengalinya dikira 1.',
    tingkat: 'sangat sulit',
  },
  {
    id: 'v31',
    pertanyaan: 'Vektor (1  akar 3) membentuk sudut berapa terhadap sumbu mendatar positif?',
    pilihan: ['45 derajat', '30 derajat', '60 derajat', '90 derajat', '120 derajat'],
    benar: 2,
    alasan: 'Panjangnya akar dari 1 ditambah 3, yaitu 2. Kosinus sudutnya adalah komponen mendatar dibagi panjangnya, yaitu 1 per 2, dan itu kosinus 60 derajat. Pilihan 30 derajat muncul kalau yang dibandingkan komponen tegaknya, sehingga sudutnya terhitung dari sumbu yang salah.',
    tingkat: 'sangat sulit',
  },
  {
    id: 'v32',
    pertanyaan: 'Sungai selebar 4 km mengalir dengan arus 3 km per jam. Perahu didayung tegak lurus terhadap tepi dengan kecepatan 5 km per jam. Sejauh berapa perahu itu hanyut ke hilir saat mendarat?',
    pilihan: ['2,4 km', '3 km', '4 km', '1,25 km', '0,8 km'],
    benar: 0,
    alasan: 'Gerak tegaknya 5 km per jam dan sungainya selebar 4 km, jadi waktu menyeberang 4 dibagi 5, yaitu 0,8 jam. Selama 0,8 jam itu arus membawanya 3 dikali 0,8, yaitu 2,4 km. Pilihan 3 km muncul kalau waktunya dikira 1 jam, dan 0,8 km kalau yang dijawab justru waktunya.',
    tingkat: 'sangat sulit',
  },
]
