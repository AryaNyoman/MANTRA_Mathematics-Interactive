import type { SoalKuis } from '@/content/tipe'

/**
 * Bank 32 soal kuis Grafik Fungsi. Tiap sesi mengambil 8 soal dan menghindari
 * yang sudah pernah keluar, jadi empat sesi pertama tidak mengulang satu soal
 * pun.
 *
 * KALIBRASI. Tingkat kesulitannya diukur ke sumber nyata SEBELUM ditulis, sama
 * seperti berkas latihan. Patokan tertingginya Uji Kompetensi Bab 6 buku
 * Panduan Guru Kelas X halaman cetak 190, yang meminta siswa membaca titik
 * potong, sumbu simetri, dan nilai minimum sekaligus dari y = 2x² - 4x - 16;
 * dan Uji Kompetensi Bab 1 buku Kelas XI halaman cetak 63, yang membalik arah
 * pertanyaan menjadi "diketahui f(f(x)) = 4x + 6, tentukan b".
 *
 * SEBARANNYA: 8 mudah, 10 sedang, 8 sulit, 6 sangat sulit, mencakup ketiga belas
 * tahap. Yang bertingkat sangat sulit sengaja menuntut dua langkah berpikir,
 * bukan sekadar angka yang lebih besar.
 *
 * SELURUH JAWABAN NUMERIK DIPERIKSA MESIN lewat
 * `python alat/cek_grafik_fungsi.py alat/soal-grafik-fungsi.json`.
 */

export const KUIS: SoalKuis[] = [
  /* ---------------------------- mudah ---------------------------- */
  {
    id: 'gf-m01',
    pertanyaan: 'Pada grafik jarak terhadap waktu, bagian garis yang MENDATAR berarti benda itu sedang apa?',
    pilihan: ['Berhenti', 'Bergerak dengan kecepatan tetap', 'Berbalik arah', 'Bergerak paling cepat', 'Melaju di jalan datar'],
    benar: 0,
    alasan: 'Garis mendatar berarti jaraknya tidak berubah walaupun waktu terus berjalan, jadi bendanya diam. Pilihan terakhir menggoda karena kata "datar", padahal sumbu tegaknya berisi jarak, bukan ketinggian jalan.',
    tingkat: 'mudah',
  },
  {
    id: 'gf-m02',
    pertanyaan: 'Manakah yang BUKAN grafik sebuah fungsi?',
    pilihan: ['Lingkaran', 'Garis lurus miring', 'Parabola terbuka ke atas', 'Grafik tangga', 'Kurva sinus'],
    benar: 0,
    alasan: 'Pada lingkaran, satu nilai x bisa memberi dua nilai y. Contohnya pada x² + y² = 25, masukan x = 3 memberi y = 4 dan y = -4 sekaligus, sehingga uji garis tegaknya gagal. Grafik tangga terlihat aneh karena putus-putus, tetapi tiap x tetap punya tepat satu y.',
    tingkat: 'mudah',
  },
  {
    id: 'gf-m03',
    pertanyaan: 'Koordinat puncak grafik y = (x - 4)² + 1 adalah?',
    pilihan: ['(4, 1)', '(-4, 1)', '(1, 4)', '(4, -1)', '(-4, -1)'],
    benar: 0,
    alasan: 'Pada bentuk puncak y = a(x - h)² + k, puncaknya (h, k). Di sini h = 4 karena isi kurungnya nol saat x = 4, dan k = 1. Pilihan B jatuh pada jebakan tanda, dan pilihan C menukar urutan koordinatnya.',
    tingkat: 'mudah',
  },
  {
    id: 'gf-m04',
    pertanyaan: 'Grafik y = -2(x + 1)² + 5 terbuka ke arah mana, dan puncaknya titik apa?',
    pilihan: [
      'Ke bawah, puncaknya titik tertinggi',
      'Ke atas, puncaknya titik terendah',
      'Ke bawah, puncaknya titik terendah',
      'Ke atas, puncaknya titik tertinggi',
      'Ke samping, tidak punya puncak',
    ],
    benar: 0,
    alasan: 'Nilai a adalah -2, dan a negatif berarti parabolanya terbuka ke bawah. Kalau terbuka ke bawah, puncaknya menjadi titik TERTINGGI, yaitu nilai maksimum fungsinya.',
    tingkat: 'mudah',
  },
  {
    id: 'gf-m05',
    pertanyaan: 'Grafik y = x² - 5x + 6 memotong sumbu y di titik?',
    pilihan: ['(0, 6)', '(6, 0)', '(0, -5)', '(0, 1)', '(2, 0)'],
    benar: 0,
    alasan: 'Memotong sumbu y berarti x = 0. Masukkan x = 0, maka suku x² dan -5x hilang, tersisa 6. Jadi titiknya (0, 6), dan itu berarti nilai c memang selalu menjadi titik potong sumbu y. Pilihan E adalah salah satu titik potong sumbu X, bukan sumbu y.',
    tingkat: 'mudah',
  },
  {
    id: 'gf-m06',
    pertanyaan: 'Sebuah virus menular tiga kali lipat tiap fase. Kalau fase pertama ada 3 orang tertular, berapa yang tertular pada fase keempat?',
    pilihan: ['81 orang', '12 orang', '27 orang', '9 orang', '243 orang'],
    benar: 0,
    alasan: 'Tiap fase angkanya dikalikan tiga, bukan ditambah tiga. Jadi 3, lalu 9, lalu 27, lalu 81. Pilihan B adalah jebakan penjumlahan, yaitu menambah 3 tiap fase. Pilihan C adalah jawaban fase ketiga, dan pilihan E fase kelima.',
    tingkat: 'mudah',
  },
  {
    id: 'gf-m07',
    pertanyaan: 'Nilai dari logaritma 32 dengan bilangan pokok 2 adalah?',
    pilihan: ['5', '16', '6', '4', '64'],
    benar: 0,
    alasan: 'Logaritma menanyakan pangkatnya: dua pangkat berapa yang menghasilkan 32? Jawabannya 5, karena 2 pangkat 5 sama dengan 32. Pilihan B adalah 32 dibagi 2, dan itu kekeliruan yang sering terjadi saat logaritma dikira pembagian.',
    tingkat: 'mudah',
  },
  {
    id: 'gf-m08',
    pertanyaan: 'Grafik y = 1 dibagi x tidak punya nilai pada x sama dengan berapa?',
    pilihan: ['0', '1', '-1', 'tidak ada, semua x boleh', '1 dan -1'],
    benar: 0,
    alasan: 'Penyebutnya tidak boleh nol, dan penyebut di sini adalah x sendiri. Pada x = 0 pembagiannya tidak punya jawaban, jadi di situlah grafiknya terbelah dan asimtot tegaknya berdiri.',
    tingkat: 'mudah',
  },

  /* ---------------------------- sedang ---------------------------- */
  {
    id: 'gf-s01',
    pertanyaan: 'Sumbu simetri grafik y = 2x² - 8x + 3 adalah garis?',
    pilihan: ['x = 2', 'x = -2', 'x = 4', 'x = -4', 'x = 8'],
    benar: 0,
    alasan: 'Sumbu simetrinya x = -b dibagi 2a. Di sini b = -8 dan a = 2, jadi x = 8 dibagi 4, yaitu 2. Pilihan B lupa bahwa tanda minus di depan b membatalkan tanda minus pada b itu sendiri. Pilihan C memakai -b dibagi a saja.',
    tingkat: 'sedang',
  },
  {
    id: 'gf-s02',
    pertanyaan: 'Diskriminan y = x² - 6x + 9 bernilai 0. Apa artinya untuk grafiknya?',
    pilihan: [
      'Menyinggung sumbu x di satu titik',
      'Memotong sumbu x di dua titik',
      'Tidak menyentuh sumbu x sama sekali',
      'Grafiknya tidak ada',
      'Grafiknya berupa garis lurus',
    ],
    benar: 0,
    alasan: 'D = 0 berarti kedua akarnya kembar, sehingga kedua titik potongnya berimpit menjadi satu. Grafiknya menyentuh sumbu x tepat di satu tempat, yaitu di x = 3, dan itu sekaligus puncaknya.',
    tingkat: 'sedang',
  },
  {
    id: 'gf-s03',
    pertanyaan: 'Sebuah parabola memotong sumbu x di x = -3 dan x = 5. Bentuk faktornya adalah?',
    pilihan: [
      'y = a(x + 3)(x - 5)',
      'y = a(x - 3)(x + 5)',
      'y = a(x + 3)(x + 5)',
      'y = a(x - 3)(x - 5)',
      'y = a(x + 8)',
    ],
    benar: 0,
    alasan: 'Bentuk faktornya y = a(x - p)(x - q), yaitu akarnya yang DIKURANGKAN. Untuk akar -3 ditulis (x - (-3)), yaitu (x + 3), dan untuk akar 5 ditulis (x - 5). Cara mengeceknya cepat: masukkan x = 5 dan hasilnya harus nol.',
    tingkat: 'sedang',
  },
  {
    id: 'gf-s04',
    pertanyaan: 'Grafik y = f(x + 2) adalah grafik y = f(x) yang digeser ke arah mana?',
    pilihan: ['2 satuan ke kiri', '2 satuan ke kanan', '2 satuan ke atas', '2 satuan ke bawah', 'tidak bergeser, hanya melebar'],
    benar: 0,
    alasan: 'Angka itu ada di DALAM kurung, jadi ia mengerjakan kebalikannya. Isi kurung x + 2 bernilai nol saat x = -2, jadi kejadian yang tadinya terjadi di nol sekarang terjadi di -2, yaitu bergeser ke kiri.',
    tingkat: 'sedang',
  },
  {
    id: 'gf-s05',
    pertanyaan: 'Grafik y = -x² diperoleh dari grafik y = x² dengan cara apa?',
    pilihan: [
      'Dicerminkan terhadap sumbu x',
      'Dicerminkan terhadap sumbu y',
      'Digeser ke bawah',
      'Diregangkan tegak',
      'Dicerminkan terhadap garis y = x',
    ],
    benar: 0,
    alasan: 'Tanda minusnya ada di LUAR, jadi ia mengerjakan hasilnya: tiap nilai y dibalik tandanya, sehingga grafiknya terbalik atas bawah. Mencerminkan terhadap sumbu y ditulis f(-x), dan pada parabola justru tidak mengubah apa pun karena ia sudah simetris.',
    tingkat: 'sedang',
  },
  {
    id: 'gf-s06',
    pertanyaan: 'Nilai dari |x - 4| pada x = 1 adalah?',
    pilihan: ['3', '-3', '5', '-5', '4'],
    benar: 0,
    alasan: 'Hitung isinya dulu: 1 - 4 = -3. Lalu ambil nilai mutlaknya, yaitu jaraknya dari nol, sehingga hasilnya 3. Nilai mutlak tidak pernah menghasilkan bilangan negatif, jadi pilihan B dan D bisa dicoret tanpa menghitung.',
    tingkat: 'sedang',
  },
  {
    id: 'gf-s07',
    pertanyaan: 'Sebuah bola dijatuhkan dari 5.000 mm. Tiap pantulan tingginya tinggal 0,8 kali sebelumnya. Berapa tinggi pantulan ketiga?',
    pilihan: ['2.560 mm', '3.000 mm', '2.000 mm', '3.200 mm', '1.024 mm'],
    benar: 0,
    alasan: 'Tiap pantulan dikalikan 0,8: 5.000 jadi 4.000, lalu 3.200, lalu 2.560. Pilihan D adalah tinggi pantulan KEDUA, dan pilihan C adalah jebakan pengurangan tetap, yaitu mengira tiap pantulan berkurang 1.000 mm.',
    tingkat: 'sedang',
  },
  {
    id: 'gf-s08',
    pertanyaan: 'Domain fungsi y = log x dengan bilangan pokok 2 adalah?',
    pilihan: ['x lebih dari 0', 'semua bilangan real', 'x lebih dari atau sama dengan 0', 'x kurang dari 0', 'x tidak sama dengan 0'],
    benar: 0,
    alasan: 'Logaritma menanyakan "dua pangkat berapa", dan dua dipangkatkan apa pun selalu memberi bilangan positif. Jadi tidak ada pangkat yang menghasilkan nol maupun bilangan negatif. Pilihan C keliru karena nol pun tidak termasuk: grafiknya justru punya asimtot tegak di sumbu y.',
    tingkat: 'sedang',
  },
  {
    id: 'gf-s09',
    pertanyaan: 'Asimtot tegak grafik y = 1 dibagi (x + 3) berada di?',
    pilihan: ['x = -3', 'x = 3', 'y = -3', 'y = 3', 'x = 0'],
    benar: 0,
    alasan: 'Asimtot tegak ada di tempat penyebutnya nol. Penyebutnya x + 3, dan itu nol saat x = -3. Pilihan B jatuh pada jebakan tanda, dan pilihan C serta D keliru sumbu: asimtot TEGAK selalu ditulis sebagai x sama dengan sesuatu.',
    tingkat: 'sedang',
  },
  {
    id: 'gf-s10',
    pertanyaan: 'Diketahui f(x) = 2x + 5. Rumus fungsi inversnya adalah?',
    pilihan: [
      'f invers (x) = (x - 5) : 2',
      'f invers (x) = 1 : (2x + 5)',
      'f invers (x) = (x + 5) : 2',
      'f invers (x) = 2x - 5',
      'f invers (x) = (x : 2) - 5',
    ],
    benar: 0,
    alasan: 'Fungsi f mengalikan 2 lalu menambah 5. Untuk membatalkannya, urutannya dibalik: kurangi 5 dulu, baru bagi 2. Pilihan B adalah kekeliruan paling umum, yaitu mengira lambang pangkat minus satu berarti satu per fungsinya. Periksa dengan menjalankan maju lalu balik: f(3) = 11, lalu (11 - 5) : 2 = 3, kembali ke asal.',
    tingkat: 'sedang',
  },

  /* ---------------------------- sulit ---------------------------- */
  {
    id: 'gf-t01',
    pertanyaan: 'Koordinat puncak grafik y = 3x² + 12x + 5 adalah?',
    pilihan: ['(-2, -7)', '(-2, 7)', '(2, -7)', '(-4, 5)', '(-2, -19)'],
    benar: 0,
    alasan: 'Sumbu simetrinya x = -12 dibagi 6, yaitu -2. Masukkan kembali: y = 3(-2)² + 12(-2) + 5 = 12 - 24 + 5 = -7. Jadi puncaknya (-2, -7). Pilihan D memakai -b dibagi a, dan pilihan E salah tanda saat mensubstitusi.',
    tingkat: 'sulit',
  },
  {
    id: 'gf-t02',
    pertanyaan: 'Sebuah parabola berpuncak di (-1, -8) dan melalui titik (1, 0). Bentuk umumnya adalah?',
    pilihan: [
      'y = 2x² + 4x - 6',
      'y = 2x² - 4x - 6',
      'y = x² + 2x - 7',
      'y = 2x² + 4x - 8',
      'y = -2x² - 4x - 6',
    ],
    benar: 0,
    alasan: 'Mulai dari bentuk puncak: y = a(x + 1)² - 8. Masukkan (1, 0): 0 = a(2)² - 8, jadi 4a = 8 dan a = 2. Rumusnya y = 2(x + 1)² - 8, dan setelah dijabarkan menjadi 2x² + 4x + 2 - 8 = 2x² + 4x - 6. Pilihan C menganggap a = 1 tanpa memeriksanya.',
    tingkat: 'sulit',
  },
  {
    id: 'gf-t03',
    pertanyaan: 'Titik (6, 5) ada pada grafik y = f(x). Pada grafik y = f(2x), titik itu berpindah ke mana?',
    pilihan: ['(3, 5)', '(12, 5)', '(6, 10)', '(6, 2.5)', '(3, 10)'],
    benar: 0,
    alasan: 'Angka 2 ada di dalam kurung, jadi ia mengerjakan masukannya. Supaya mesin menerima 6 seperti semula, nilai x yang dipakai harus 3, karena 2 kali 3 sama dengan 6. Nilai y tidak disentuh sama sekali, jadi tetap 5. Grafiknya memampat menjadi setengah lebarnya, bukan melebar.',
    tingkat: 'sulit',
  },
  {
    id: 'gf-t04',
    pertanyaan: 'Diketahui f(x) = x - 5. Berapa nilai |f(-2)| dan f(|-2|) berturut-turut?',
    pilihan: ['7 dan -3', '7 dan 3', '-7 dan -3', '3 dan 7', '7 dan 7'],
    benar: 0,
    alasan: 'Untuk yang pertama, hitung isinya dulu: f(-2) = -7, lalu dimutlakkan menjadi 7. Untuk yang kedua, masukannya yang dimutlakkan dulu: |-2| = 2, lalu f(2) = 2 - 5 = -3. Hasilnya berbeda, dan itu membuktikan mutlak di luar tidak sama dengan mutlak di dalam. Pilihan E adalah kekeliruan mengira keduanya sama.',
    tingkat: 'sulit',
  },
  {
    id: 'gf-t05',
    pertanyaan: 'Sebuah kultur bakteri mula-mula 200 sel dan membelah menjadi dua kali lipat tiap jam. Setelah berapa jam jumlahnya mencapai 6.400 sel?',
    pilihan: ['5 jam', '32 jam', '6 jam', '4 jam', '31 jam'],
    benar: 0,
    alasan: 'Rumusnya 200 dikali 2 pangkat x. Karena 6.400 dibagi 200 sama dengan 32, yang dicari adalah 2 pangkat berapa yang menghasilkan 32, yaitu 5. Pilihan B mengira 32 itu jawabannya sendiri, padahal 32 adalah berapa KALI LIPAT jumlahnya bertambah, bukan berapa jamnya.',
    tingkat: 'sulit',
  },
  {
    id: 'gf-t06',
    pertanyaan: 'Asimtot datar grafik y = (3x - 2) dibagi (x + 4) berada di?',
    pilihan: ['y = 3', 'y = -2', 'y = 4', 'y = -4', 'y = 0'],
    benar: 0,
    alasan: 'Untuk x yang sangat besar, angka -2 dan +4 hampir tidak berpengaruh dibanding suku 3x dan x. Jadi pecahannya mendekati 3x dibagi x, yaitu 3. Pilihan D adalah asimtot TEGAK-nya, yaitu x = -4, dan itu pertanyaan yang berbeda. Alasan lengkap kenapa perilaku ini bisa dihitung ada di topik Limit materi 07.',
    tingkat: 'sulit',
  },
  {
    id: 'gf-t07',
    pertanyaan: 'Diketahui f(x) = x² + 1 dan g(x) = 2x - 3. Rumus (f komposisi g)(x) adalah?',
    pilihan: [
      '4x² - 12x + 10',
      '2x² - 1',
      '4x² + 10',
      '2x² + 2',
      '4x² - 12x + 8',
    ],
    benar: 0,
    alasan: 'Yang bekerja lebih dulu adalah g, jadi hasilnya f(2x - 3) = (2x - 3)² + 1. Jabarkan: 4x² - 12x + 9 + 1 = 4x² - 12x + 10. Pilihan B adalah hasil urutan sebaliknya, yaitu g(f(x)) = 2(x² + 1) - 3 = 2x² - 1. Pilihan C lupa suku tengah saat mengkuadratkan.',
    tingkat: 'sulit',
  },
  {
    id: 'gf-t08',
    pertanyaan: 'Setengah lingkaran ATAS berjari-jari 3 dengan pusat di titik asal digambar di bidang koordinat. Domain dan rangenya adalah?',
    pilihan: [
      'domain -3 sampai 3, range 0 sampai 3',
      'domain -3 sampai 3, range -3 sampai 3',
      'domain 0 sampai 3, range 0 sampai 3',
      'domain -3 sampai 3, range 0 sampai 9',
      'bukan fungsi, jadi tidak punya domain',
    ],
    benar: 0,
    alasan: 'Domain adalah semua x yang boleh dimasukkan, dan setengah lingkaran itu melebar dari -3 sampai 3. Range adalah semua y yang mungkin keluar, dan karena hanya bagian ATAS yang diambil, nilainya dari 0 sampai 3. Pilihan E keliru: lingkaran penuh memang bukan fungsi, tetapi setengah lingkaran atas lolos uji garis tegak.',
    tingkat: 'sulit',
  },

  /* ------------------------- sangat sulit ------------------------- */
  {
    id: 'gf-x01',
    pertanyaan: 'Sebuah parabola memotong sumbu x di (-2, 0) dan (4, 0), serta memotong sumbu y di (0, -16). Bentuk umumnya adalah?',
    pilihan: [
      'y = 2x² - 4x - 16',
      'y = x² - 2x - 8',
      'y = 2x² + 4x - 16',
      'y = -2x² + 4x + 16',
      'y = 2x² - 4x + 16',
    ],
    benar: 0,
    alasan: 'Akarnya diketahui, jadi pakai bentuk faktor: y = a(x + 2)(x - 4). Masukkan (0, -16): -16 = a(2)(-4) = -8a, sehingga a = 2. Jabarkan: 2(x² - 2x - 8) = 2x² - 4x - 16. Pilihan B adalah jawaban kalau a dianggap 1, dan itu memberi titik potong sumbu y di -8, bukan -16.',
    tingkat: 'sangat sulit',
  },
  {
    id: 'gf-x02',
    pertanyaan: 'Diketahui f(x) = ax + b dengan a bilangan positif, dan (f komposisi f)(x) = 9x + 8. Nilai a + b adalah?',
    pilihan: ['5', '11', '7', '17', '4'],
    benar: 0,
    alasan: 'Susun dulu majunya: f(f(x)) = a(ax + b) + b = a²x + ab + b. Samakan dengan 9x + 8. Dari suku x: a² = 9, dan karena a positif maka a = 3. Dari sisanya: 3b + b = 4b = 8, jadi b = 2. Maka a + b = 5. Catatan: tanpa syarat a positif, a = -3 dan b = -4 juga memenuhi, dan itulah sebabnya syarat itu dicantumkan.',
    tingkat: 'sangat sulit',
  },
  {
    id: 'gf-x03',
    pertanyaan: 'Grafik y = x² mula-mula digeser 3 satuan ke kanan, BARU kemudian dikenai penggantian x menjadi 2x. Rumus akhirnya adalah?',
    pilihan: [
      'y = (2x - 3)²',
      'y = 4(x - 3)²',
      'y = (2x + 3)²',
      'y = 2(x - 3)²',
      'y = (x - 6)²',
    ],
    benar: 0,
    alasan: 'Setelah digeser, rumusnya menjadi h(x) = (x - 3)². Penggantian x menjadi 2x dikenakan pada rumus itu, jadi hasilnya h(2x) = (2x - 3)². Pilihan B adalah hasil kalau urutannya dibalik, yaitu dimampatkan dulu baru digeser, dan hasilnya memang berbeda. Urutan transformasi berpengaruh, sama seperti urutan komposisi.',
    tingkat: 'sangat sulit',
  },
  {
    id: 'gf-x04',
    pertanyaan: 'Bilangan x memenuhi 2 pangkat x sama dengan 20. Nilai x terletak di antara?',
    pilihan: ['4 dan 5', '3 dan 4', '9 dan 10', '10 dan 11', '19 dan 20'],
    benar: 0,
    alasan: 'Cukup mengapit dengan pangkat yang sudah dikenal: 2 pangkat 4 sama dengan 16, dan 2 pangkat 5 sama dengan 32. Karena 20 ada di antara 16 dan 32, maka x ada di antara 4 dan 5. Pilihan C adalah jebakan pembagian, yaitu mengira 20 dibagi 2 memberi jawabannya.',
    tingkat: 'sangat sulit',
  },
  {
    id: 'gf-x05',
    pertanyaan: 'Grafik y = x² + mx + 9 menyinggung sumbu x. Nilai m yang memenuhi adalah?',
    pilihan: ['6 atau -6', '6 saja', '3 atau -3', '9 atau -9', '0 saja'],
    benar: 0,
    alasan: 'Menyinggung sumbu x berarti diskriminannya nol. Hitung: D = m² - 4(1)(9) = m² - 36, dan D = 0 memberi m² = 36, sehingga m = 6 atau m = -6. Keduanya sah: m = 6 memberi (x + 3)² dan m = -6 memberi (x - 3)². Pilihan B melupakan akar yang negatif, dan itu kekeliruan yang paling sering terjadi di soal jenis ini.',
    tingkat: 'sangat sulit',
  },
  {
    id: 'gf-x06',
    pertanyaan: 'Kenapa fungsi y = x² dengan domain semua bilangan real TIDAK punya fungsi invers?',
    pilihan: [
      'Karena dua masukan berbeda bisa memberi keluaran yang sama',
      'Karena grafiknya melengkung, bukan garis lurus',
      'Karena hasilnya tidak pernah negatif',
      'Karena grafiknya tidak memotong sumbu x di dua titik',
      'Karena rumusnya tidak bisa dibalik secara aljabar',
    ],
    benar: 0,
    alasan: 'Syarat punya invers adalah fungsinya satu-satu. Pada y = x², masukan 3 dan -3 sama-sama memberi 9, jadi mesin pembalinya tidak tahu harus mengembalikan yang mana. Itu terlihat dari uji garis mendatar: garis y = 9 memotong grafiknya dua kali. Pilihan E keliru, karena secara aljabar akar 9 memang bisa dihitung; masalahnya ada dua jawaban, bukan tidak ada jawaban. Kalau domainnya dibatasi ke x nol atau positif, inversnya langsung ada.',
    tingkat: 'sangat sulit',
  },
]
