import type { SoalKuis } from '@/content/tipe'

/**
 * Bank soal latihan Grafik Fungsi: 60 soal, 15 tiap tingkat (13 Sep 2026).
 *
 * SEJARAH: 2 Sep 2026 bank ini 32 soal (8, 10, 8, 6) dengan id gf-m01
 * sampai gf-x06. 13 Sep 2026 ARYA meminta 15 soal per tingkat, syarat naik
 * 10 benar, pembahasan bernomor bergambar, dan penjelasan pengecoh. Id lama
 * DIPERTAHANKAN; gf-x04 turun ke sedang dan gf-x06 turun ke sulit karena
 * kalibrasi. Soal baru: gf-m09 sampai m15, gf-s11 sampai s14, gf-t09 sampai
 * t14, gf-x07 sampai x17.
 *
 * KALIBRASI (semua tulisan sendiri):
 * - mudah dan sedang: Uji Kompetensi Bab 6 Buku Panduan Guru Kelas X
 *   (titik potong, sumbu simetri, nilai minimum y = 2x² - 4x - 16) dan Bab 1
 *   Kelas XI (komposisi dan invers);
 * - sulit dan sangat sulit: pola UTBK di mathcyber1997.com/soal-dan-
 *   pembahasan-fungsi-kuadrat (tanda a, c, D dari bentuk grafik; definit
 *   positif; menyinggung sumbu x dengan parameter; persamaan fungsi
 *   2f(x) + f(1 - x) = x²), plus 5 bergaya olimpiade (persamaan fungsi,
 *   relasi rekursif f(x + 1) = f(x) + 2, jumlah kuadrat solusi nilai mutlak,
 *   jarak akar, fungsi eksponen dari dua titik).
 *
 * Cakupan dibatasi materi 1 sampai 9: membaca grafik, uji garis tegak,
 * domain dan range, parabola (puncak, a, bentuk umum, diskriminan, menyusun
 * rumus), transformasi (geser, cermin, regang, nilai mutlak), eksponen dan
 * logaritma, fungsi rasional dan asimtot, komposisi dan invers.
 *
 * Fungsi pada `gambar` ditulis dalam x biasa (bukan derajat). Tiap jawaban
 * berangka punya `// cek:` untuk alat/cek_kuis.mjs.
 */

export const KUIS: SoalKuis[] = [
  /* ================================ mudah ================================ */
  {
    id: 'gf-m01',
    pertanyaan: 'Pada grafik jarak terhadap waktu, bagian garis yang MENDATAR berarti benda itu sedang apa?',
    gambar: { jenis: 'grafik', fungsi: ['x < 2 ? 2*x : x < 4 ? 4 : 4 + (x - 4)*1.5'], jangkauan: [0, 6, 0, 8], nama: ['jarak (km) terhadap waktu (menit)'] },
    pilihan: ['Berhenti', 'Bergerak dengan kecepatan tetap', 'Berbalik arah', 'Bergerak paling cepat', 'Melaju di jalan datar'],
    benar: 0,
    langkah: [
      'Baca dulu kedua sumbunya: mendatar waktu, tegak jarak dari rumah.',
      'Bagian mendatar (menit 2 sampai 4) berarti jaraknya tidak berubah walaupun waktu berjalan.',
      'Jarak tetap sementara waktu jalan: bendanya diam.',
    ],
    jebakan: '"Melaju di jalan datar" menggoda karena kata "datar", padahal sumbu-y berisi jarak, bukan ketinggian jalan. Grafik bukan peta.',
    alasan: 'Garis mendatar berarti jaraknya tidak berubah walaupun waktu terus berjalan, jadi bendanya diam.',
    tingkat: 'mudah',
  },
  {
    id: 'gf-m02',
    pertanyaan: 'Manakah yang BUKAN grafik sebuah fungsi?',
    pilihan: ['Lingkaran', 'Garis lurus miring', 'Parabola terbuka ke atas', 'Grafik tangga', 'Kurva sinus'],
    benar: 0,
    langkah: [
      'Fungsi: satu masukan x hanya boleh memberi satu keluaran y (uji garis tegak).',
      'Pada lingkaran x² + y² = 25, masukan x = 3 memberi y = 4 dan y = -4 sekaligus: garis tegak x = 3 memotong dua kali.',
      'Yang lain, termasuk grafik tangga yang putus-putus, tiap x tetap punya tepat satu y.',
    ],
    jebakan: 'Grafik tangga terlihat "aneh" karena terputus, tetapi keanehan bentuk bukan ukurannya; ukurannya jumlah y untuk tiap x.',
    alasan: 'Pada lingkaran, satu nilai x bisa memberi dua nilai y, sehingga uji garis tegaknya gagal.',
    tingkat: 'mudah',
  },
  {
    id: 'gf-m03',
    pertanyaan: 'Koordinat puncak grafik y = (x - 4)² + 1 adalah?',
    gambar: { jenis: 'grafik', fungsi: ['(x - 4)*(x - 4) + 1'], jangkauan: [0, 8, -1, 8], titik: [{ x: 4, y: 1, label: 'puncak' }] },
    pilihan: ['(4, 1)', '(-4, 1)', '(1, 4)', '(4, -1)', '(-4, -1)'],
    benar: 0,
    langkah: [
      'Bentuk puncak y = a(x - h)² + k punya puncak (h, k).',
      'Isi kurung (x - 4) bernilai nol saat x = 4, jadi h = 4; k = 1.',
      'Puncaknya (4, 1), titik terendah karena a = 1 positif.',
    ],
    jebakan: '(-4, 1) jatuh pada jebakan tanda: yang ditulis di dalam kurung adalah x MINUS h, jadi minus 4 berarti h = +4. (1, 4) menukar urutan koordinat.',
    alasan: 'Pada bentuk puncak y = a(x - h)² + k, puncaknya (h, k) = (4, 1).',
    tingkat: 'mudah',
  },
  {
    id: 'gf-m04',
    pertanyaan: 'Grafik y = -2(x + 1)² + 5 terbuka ke arah mana, dan puncaknya titik apa?',
    gambar: { jenis: 'grafik', fungsi: ['-2*(x + 1)*(x + 1) + 5'], jangkauan: [-4, 2, -6, 7], titik: [{ x: -1, y: 5, label: '(-1, 5)' }] },
    pilihan: [
      'Ke bawah, puncaknya titik tertinggi',
      'Ke atas, puncaknya titik terendah',
      'Ke bawah, puncaknya titik terendah',
      'Ke atas, puncaknya titik tertinggi',
      'Ke samping, tidak punya puncak',
    ],
    benar: 0,
    langkah: [
      'a = -2, negatif: parabola terbuka ke bawah.',
      'Terbuka ke bawah berarti puncaknya titik TERTINGGI, yaitu nilai maksimum.',
      'Puncaknya di (-1, 5): isi kurung nol saat x = -1.',
    ],
    jebakan: '"Ke bawah, puncaknya titik terendah" mencampur dua hal: arah bukaan ke bawah justru membuat puncak berada di atas.',
    alasan: 'a negatif berarti terbuka ke bawah, sehingga puncaknya titik tertinggi.',
    tingkat: 'mudah',
  },
  {
    // cek: 0*0 - 5*0 + 6 === 6
    id: 'gf-m05',
    pertanyaan: 'Grafik y = x² - 5x + 6 memotong sumbu y di titik?',
    gambar: { jenis: 'grafik', fungsi: ['x*x - 5*x + 6'], jangkauan: [-1, 6, -2, 8], titik: [{ x: 0, y: 6, label: '(0, 6)' }] },
    pilihan: ['(0, 6)', '(6, 0)', '(0, -5)', '(0, 1)', '(2, 0)'],
    benar: 0,
    langkah: [
      'Memotong sumbu y berarti x = 0.',
      'Masukkan x = 0: suku x² dan -5x hilang, tersisa 6.',
      'Titiknya (0, 6): angka c selalu menjadi titik potong sumbu y.',
    ],
    jebakan: '(2, 0) adalah titik potong sumbu X (x = 2 dan x = 3), pertanyaan yang berbeda. (6, 0) menukar koordinat.',
    alasan: 'x = 0 memberi y = 6, jadi (0, 6).',
    tingkat: 'mudah',
  },
  {
    // cek: 3 * 3 ** 3 === 81
    id: 'gf-m06',
    pertanyaan: 'Sebuah virus menular tiga kali lipat tiap fase. Kalau fase pertama ada 3 orang tertular, berapa yang tertular pada fase keempat?',
    gambar: { jenis: 'batang', kategori: ['fase 1', 'fase 2', 'fase 3', 'fase 4'], nilai: [3, 9, 27, 81], satuan: 'orang', sorot: [3] },
    pilihan: ['81 orang', '12 orang', '27 orang', '9 orang', '243 orang'],
    benar: 0,
    langkah: [
      'Tiap fase DIKALI tiga, bukan ditambah tiga.',
      'Fase 1: 3. Fase 2: 9. Fase 3: 27. Fase 4: 81.',
      'Rumusnya 3 × 3ⁿ⁻¹ dengan n nomor fase.',
    ],
    jebakan: '12 menambah 3 tiap fase (pertumbuhan linear). 27 berhenti di fase ketiga, 243 kelewat satu fase.',
    alasan: 'Dikali tiga tiap fase: 3, 9, 27, 81.',
    tingkat: 'mudah',
  },
  {
    // cek: 2 ** 5 === 32
    id: 'gf-m07',
    pertanyaan: 'Nilai dari logaritma 32 dengan bilangan pokok 2 adalah?',
    pilihan: ['5', '16', '6', '4', '64'],
    benar: 0,
    langkah: [
      'Logaritma menanyakan pangkat: 2 pangkat berapa yang menghasilkan 32?',
      '2 × 2 × 2 × 2 × 2 = 32, lima kali.',
      'Jadi ²log 32 = 5.',
    ],
    jebakan: '16 adalah 32 dibagi 2: mengira logaritma itu pembagian. 64 mengalikan.',
    alasan: '2⁵ = 32, jadi logaritmanya 5.',
    tingkat: 'mudah',
  },
  {
    id: 'gf-m08',
    pertanyaan: 'Grafik y = 1 dibagi x tidak punya nilai pada x sama dengan berapa?',
    gambar: { jenis: 'grafik', fungsi: ['1/x'], jangkauan: [-4, 4, -4, 4], tegak: [0] },
    pilihan: ['0', '1', '-1', 'tidak ada, semua x boleh', '1 dan -1'],
    benar: 0,
    langkah: [
      'Penyebut tidak boleh nol, dan penyebutnya x sendiri.',
      'Pada x = 0 pembagiannya tidak punya jawaban.',
      'Di situ grafiknya terbelah dan asimtot tegaknya berdiri.',
    ],
    jebakan: '"1 dan -1" mengira titik (1, 1) dan (-1, -1) istimewa; keduanya ada di grafik dan sah.',
    alasan: 'Penyebut nol di x = 0.',
    tingkat: 'mudah',
  },
  {
    // cek: 2*3 + 1 === 7
    id: 'gf-m09',
    pertanyaan: 'Jika f(x) = 2x + 1, maka f(3) =',
    gambar: { jenis: 'grafik', fungsi: ['2*x + 1'], jangkauan: [-1, 5, -1, 9], titik: [{ x: 3, y: 7, label: '(3, 7)' }] },
    pilihan: ['7', '6', '5', '4', '9'],
    benar: 0,
    langkah: [
      'f(3) berarti masukkan 3 ke tempat x: 2 × 3 + 1.',
      '6 + 1 = 7.',
      'Di grafik: titik (3, 7) ada di garisnya.',
    ],
    jebakan: '6 lupa menambah 1; 5 mengira 2x berarti 2 + x. Rumus adalah mesin: tiap langkahnya dikerjakan berurutan.',
    alasan: '2 × 3 + 1 = 7.',
    tingkat: 'mudah',
  },
  {
    id: 'gf-m10',
    pertanyaan: 'Grafik y = x² lolos uji garis tegak. Artinya?',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-3, 3, -1, 8], tegak: [1.5] },
    pilihan: [
      'Setiap garis tegak memotong grafik paling banyak satu kali, jadi tiap x punya satu y',
      'Grafiknya berdiri tegak',
      'Grafiknya simetris terhadap sumbu y',
      'Setiap y punya tepat satu x',
      'Grafiknya tidak pernah turun',
    ],
    benar: 0,
    langkah: [
      'Uji garis tegak: tarik garis tegak di mana pun, hitung berapa kali ia memotong grafik.',
      'Pada parabola, tiap garis tegak memotong tepat satu kali.',
      'Jadi tiap masukan x punya satu keluaran y: syarat fungsi terpenuhi.',
    ],
    jebakan: '"Setiap y punya tepat satu x" adalah uji garis MENDATAR (syarat invers), dan parabola gagal di situ: y = 4 dicapai x = 2 dan x = -2.',
    alasan: 'Lolos uji garis tegak berarti tiap x memberi tepat satu y.',
    tingkat: 'mudah',
  },
  {
    id: 'gf-m11',
    pertanyaan: 'Puncak grafik y = x² - 3 berada di titik?',
    gambar: { jenis: 'grafik', fungsi: ['x*x - 3'], jangkauan: [-3, 3, -4, 6], titik: [{ x: 0, y: -3, label: '(0, -3)' }] },
    pilihan: ['(0, -3)', '(-3, 0)', '(3, 0)', '(0, 3)', '(-3, -3)'],
    benar: 0,
    langkah: [
      'y = x² - 3 adalah y = x² yang digeser 3 ke bawah (angka -3 di luar kuadrat).',
      'Puncak y = x² di (0, 0); digeser ke bawah 3 menjadi (0, -3).',
    ],
    jebakan: '(-3, 0) mengira geseran ke kiri; angka di LUAR kurung menggerakkan ke atas-bawah, angka di DALAM kurung ke kiri-kanan.',
    alasan: 'Geser ke bawah 3: puncak (0, -3).',
    tingkat: 'mudah',
  },
  {
    // cek: 2 ** 3 === 8
    id: 'gf-m12',
    pertanyaan: 'Pada fungsi y = 2ˣ, nilai y saat x = 3 adalah?',
    gambar: { jenis: 'grafik', fungsi: ['2 ** x'], jangkauan: [-2, 4, -1, 10], titik: [{ x: 3, y: 8, label: '(3, 8)' }] },
    pilihan: ['8', '6', '9', '5', '3'],
    benar: 0,
    langkah: [
      '2ˣ berarti 2 dikalikan dirinya sebanyak x kali.',
      '2³ = 2 × 2 × 2 = 8.',
    ],
    jebakan: '6 menghitung 2 × 3 (perkalian, bukan pangkat). 9 menghitung 3² (menukar pokok dan pangkat).',
    alasan: '2³ = 8.',
    tingkat: 'mudah',
  },
  {
    // cek: 0 + 2 === 2
    id: 'gf-m13',
    pertanyaan: 'Garis y = x + 2 memotong sumbu y di titik?',
    gambar: { jenis: 'grafik', fungsi: ['x + 2'], jangkauan: [-4, 3, -2, 5], titik: [{ x: 0, y: 2, label: '(0, 2)' }, { x: -2, y: 0, label: '(-2, 0)' }] },
    pilihan: ['(0, 2)', '(2, 0)', '(-2, 0)', '(0, -2)', '(1, 3)'],
    benar: 0,
    langkah: [
      'Di sumbu y, x = 0. Masukkan: y = 0 + 2 = 2.',
      'Titiknya (0, 2).',
    ],
    jebakan: '(-2, 0) adalah titik potong sumbu X (y = 0 saat x = -2). (2, 0) menukar koordinat.',
    alasan: 'x = 0 memberi y = 2.',
    tingkat: 'mudah',
  },
  {
    // cek: Math.abs(-5) === 5
    id: 'gf-m14',
    pertanyaan: 'Nilai dari |-5| adalah?',
    pilihan: ['5', '-5', '0', '25', '1/5'],
    benar: 0,
    langkah: [
      'Nilai mutlak adalah jarak bilangan itu dari nol pada garis bilangan.',
      '-5 berjarak 5 dari nol, jadi |-5| = 5.',
    ],
    jebakan: '-5 mengira tanda mutlak tidak berbuat apa-apa. Jarak tidak pernah negatif.',
    alasan: 'Jarak -5 ke nol adalah 5.',
    tingkat: 'mudah',
  },
  {
    id: 'gf-m15',
    pertanyaan: 'Range (daerah hasil) fungsi y = x² adalah?',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-3, 3, -2, 8] },
    pilihan: ['y ≥ 0', 'semua bilangan real', 'y > 0', 'x ≥ 0', 'y ≤ 0'],
    benar: 0,
    langkah: [
      'Range adalah semua nilai y yang bisa keluar dari mesin.',
      'Kuadrat tidak pernah negatif, dan nol tercapai di x = 0.',
      'Jadi y ≥ 0: di grafik, kurva tidak pernah turun di bawah sumbu x.',
    ],
    jebakan: '"y > 0" melupakan puncak (0, 0) yang memang menyentuh nol. "x ≥ 0" menjawab domain (dan itu pun keliru: x boleh negatif).',
    alasan: 'Kuadrat selalu nol atau positif.',
    tingkat: 'mudah',
  },

  /* =============================== sedang =============================== */
  {
    // cek: -(-8)/(2*2) === 2
    id: 'gf-s01',
    pertanyaan: 'Sumbu simetri grafik y = 2x² - 8x + 3 adalah garis?',
    gambar: { jenis: 'grafik', fungsi: ['2*x*x - 8*x + 3'], jangkauan: [-2, 6, -6, 6], tegak: [2] },
    pilihan: ['x = 2', 'x = -2', 'x = 4', 'x = -4', 'x = 8'],
    benar: 0,
    langkah: [
      'Sumbu simetri x = -b : 2a.',
      'b = -8, a = 2: x = -(-8) : 4 = 8 : 4 = 2.',
      'Garis x = 2 membelah parabola jadi dua bagian yang setangkup.',
    ],
    jebakan: 'x = -2 lupa bahwa tanda minus di depan b membatalkan tanda minus pada b sendiri. x = 4 memakai -b : a, tanpa angka 2.',
    alasan: 'x = -b/2a = 8/4 = 2.',
    tingkat: 'sedang',
  },
  {
    // cek: (-6)**2 - 4*1*9 === 0
    id: 'gf-s02',
    pertanyaan: 'Diskriminan y = x² - 6x + 9 bernilai 0. Apa artinya untuk grafiknya?',
    gambar: { jenis: 'grafik', fungsi: ['x*x - 6*x + 9'], jangkauan: [-1, 7, -1, 8], titik: [{ x: 3, y: 0, label: '(3, 0)' }] },
    pilihan: [
      'Menyinggung sumbu x di satu titik',
      'Memotong sumbu x di dua titik',
      'Tidak menyentuh sumbu x sama sekali',
      'Grafiknya tidak ada',
      'Grafiknya berupa garis lurus',
    ],
    benar: 0,
    langkah: [
      'D = b² - 4ac menghitung berapa titik potong dengan sumbu x: D > 0 dua, D = 0 satu, D < 0 tidak ada.',
      'D = 36 - 36 = 0: kedua akarnya kembar, x = 3.',
      'Grafik menyentuh sumbu x tepat di (3, 0), yang sekaligus puncaknya; rumusnya memang (x - 3)².',
    ],
    jebakan: '"Grafiknya tidak ada" salah kaprah: D negatif pun grafiknya tetap ada, hanya tidak menyentuh sumbu x.',
    alasan: 'D = 0 berarti akar kembar: grafik menyinggung sumbu x di satu titik.',
    tingkat: 'sedang',
  },
  {
    id: 'gf-s03',
    pertanyaan: 'Sebuah parabola memotong sumbu x di x = -3 dan x = 5. Bentuk faktornya adalah?',
    gambar: { jenis: 'grafik', fungsi: ['0.5*(x + 3)*(x - 5)'], jangkauan: [-5, 7, -9, 4], titik: [{ x: -3, y: 0, label: '-3' }, { x: 5, y: 0, label: '5' }] },
    pilihan: ['y = a(x + 3)(x - 5)', 'y = a(x - 3)(x + 5)', 'y = a(x + 3)(x + 5)', 'y = a(x - 3)(x - 5)', 'y = a(x + 8)'],
    benar: 0,
    langkah: [
      'Bentuk faktor y = a(x - p)(x - q), dengan p dan q akarnya.',
      'Akar -3: (x - (-3)) = (x + 3). Akar 5: (x - 5).',
      'Periksa cepat: masukkan x = 5, faktor (x - 5) nol, jadi y = 0. Cocok.',
    ],
    jebakan: 'y = a(x - 3)(x + 5) membalik tanda: akarnya jadi 3 dan -5. Yang ditulis dalam kurung adalah x DIKURANGI akar.',
    alasan: 'y = a(x - p)(x - q) dengan p = -3, q = 5.',
    tingkat: 'sedang',
  },
  {
    id: 'gf-s04',
    pertanyaan: 'Grafik y = f(x + 2) adalah grafik y = f(x) yang digeser ke arah mana?',
    gambar: { jenis: 'grafik', fungsi: ['x*x', '(x + 2)*(x + 2)'], jangkauan: [-5, 4, -1, 8], nama: ['y = f(x) = x²', 'y = f(x + 2)'] },
    pilihan: ['2 satuan ke kiri', '2 satuan ke kanan', '2 satuan ke atas', '2 satuan ke bawah', 'tidak bergeser, hanya melebar'],
    benar: 0,
    langkah: [
      'Angka 2 ada di DALAM kurung, jadi ia bekerja pada masukan, dan bekerja terbalik.',
      'x + 2 bernilai nol saat x = -2: kejadian yang tadinya di x = 0 sekarang di x = -2.',
      'Seluruh grafik bergeser 2 ke kiri.',
    ],
    jebakan: '"2 ke kanan" mengikuti tanda plus; yang di dalam kurung selalu kebalikan dari yang terlihat.',
    alasan: 'Isi kurung nol saat x = -2: geser ke kiri.',
    tingkat: 'sedang',
  },
  {
    id: 'gf-s05',
    pertanyaan: 'Grafik y = -x² diperoleh dari grafik y = x² dengan cara apa?',
    gambar: { jenis: 'grafik', fungsi: ['x*x', '-x*x'], jangkauan: [-3, 3, -6, 6], nama: ['y = x²', 'y = -x²'] },
    pilihan: ['Dicerminkan terhadap sumbu x', 'Dicerminkan terhadap sumbu y', 'Digeser ke bawah', 'Diregangkan tegak', 'Dicerminkan terhadap garis y = x'],
    benar: 0,
    langkah: [
      'Tanda minus ada di LUAR (pada hasil): tiap nilai y dibalik tandanya.',
      'Titik (2, 4) menjadi (2, -4): grafik terbalik atas-bawah, itu pencerminan terhadap sumbu x.',
    ],
    jebakan: 'Pencerminan terhadap sumbu y ditulis f(-x), dan pada parabola tidak mengubah apa pun karena ia sudah simetris.',
    alasan: 'Minus di luar membalik tanda y: cermin terhadap sumbu x.',
    tingkat: 'sedang',
  },
  {
    // cek: Math.abs(1 - 4) === 3
    id: 'gf-s06',
    pertanyaan: 'Nilai dari |x - 4| pada x = 1 adalah?',
    pilihan: ['3', '-3', '5', '-5', '4'],
    benar: 0,
    langkah: [
      'Hitung isinya dulu: 1 - 4 = -3.',
      'Ambil nilai mutlaknya, jaraknya dari nol: 3.',
      'Artinya: jarak 1 ke 4 pada garis bilangan adalah 3.',
    ],
    jebakan: '-3 lupa memutlakkan. 5 menghitung 1 + 4, mengira tanda mutlak mengubah minus jadi plus di dalam.',
    alasan: '|1 - 4| = |-3| = 3.',
    tingkat: 'sedang',
  },
  {
    // cek: Math.abs(5000 * 0.8 ** 3 - 2560) < 1e-9
    id: 'gf-s07',
    pertanyaan: 'Sebuah bola dijatuhkan dari 5.000 mm. Tiap pantulan tingginya tinggal 0,8 kali sebelumnya. Berapa tinggi pantulan ketiga?',
    gambar: { jenis: 'batang', kategori: ['awal', 'pantul 1', 'pantul 2', 'pantul 3'], nilai: [5000, 4000, 3200, 2560], satuan: 'mm', sorot: [3] },
    pilihan: ['2.560 mm', '3.000 mm', '2.000 mm', '3.200 mm', '1.024 mm'],
    benar: 0,
    langkah: [
      'Tiap pantulan DIKALI 0,8: 5.000 → 4.000 → 3.200 → 2.560.',
      'Rumusnya 5.000 × 0,8³ = 2.560 mm.',
    ],
    jebakan: '3.200 adalah pantulan KEDUA. 2.000 mengira tiap pantulan berkurang 1.000 mm (pengurangan tetap), padahal peluruhan itu perkalian.',
    alasan: '5.000 × 0,8³ = 2.560.',
    tingkat: 'sedang',
  },
  {
    id: 'gf-s08',
    pertanyaan: 'Domain fungsi y = log x dengan bilangan pokok 2 adalah?',
    gambar: { jenis: 'grafik', fungsi: ['Math.log2(x)'], jangkauan: [-1, 9, -4, 4], tegak: [0] },
    pilihan: ['x lebih dari 0', 'semua bilangan real', 'x lebih dari atau sama dengan 0', 'x kurang dari 0', 'x tidak sama dengan 0'],
    benar: 0,
    langkah: [
      'Logaritma menanyakan "2 pangkat berapa"; 2 dipangkatkan apa pun selalu positif.',
      'Tidak ada pangkat yang menghasilkan nol atau bilangan negatif.',
      'Jadi hanya x > 0; grafiknya punya asimtot tegak di sumbu y.',
    ],
    jebakan: '"x ≥ 0" memasukkan nol, padahal log 0 tidak ada: kurva turun tanpa batas mendekati x = 0.',
    alasan: 'Hanya bilangan positif yang punya logaritma.',
    tingkat: 'sedang',
  },
  {
    id: 'gf-s09',
    pertanyaan: 'Asimtot tegak grafik y = 1 dibagi (x + 3) berada di?',
    gambar: { jenis: 'grafik', fungsi: ['1/(x + 3)'], jangkauan: [-7, 2, -4, 4], tegak: [-3] },
    pilihan: ['x = -3', 'x = 3', 'y = -3', 'y = 3', 'x = 0'],
    benar: 0,
    langkah: [
      'Asimtot tegak ada di tempat penyebutnya nol.',
      'x + 3 = 0 saat x = -3.',
      'Asimtot TEGAK selalu ditulis x = sesuatu.',
    ],
    jebakan: 'x = 3 jatuh pada jebakan tanda. y = -3 salah sumbu: itu bentuk asimtot datar.',
    alasan: 'Penyebut nol di x = -3.',
    tingkat: 'sedang',
  },
  {
    // cek: (11 - 5) / 2 === 3
    id: 'gf-s10',
    pertanyaan: 'Diketahui f(x) = 2x + 5. Rumus fungsi inversnya adalah?',
    pilihan: ['f invers (x) = (x - 5) : 2', 'f invers (x) = 1 : (2x + 5)', 'f invers (x) = (x + 5) : 2', 'f invers (x) = 2x - 5', 'f invers (x) = (x : 2) - 5'],
    benar: 0,
    langkah: [
      'f mengalikan 2 lalu menambah 5. Membatalkannya: urutan dibalik, kurangi 5 dulu baru bagi 2.',
      'f⁻¹(x) = (x - 5) : 2.',
      'Periksa: f(3) = 11, lalu (11 - 5) : 2 = 3. Kembali ke asal.',
    ],
    jebakan: '1 : (2x + 5) mengira lambang pangkat minus satu berarti satu per fungsinya. (x : 2) - 5 membalik langkah tanpa membalik urutannya.',
    alasan: 'Balik urutan dan balik operasinya: (x - 5)/2.',
    tingkat: 'sedang',
  },
  {
    // cek: 2**4 < 20 && 20 < 2**5
    id: 'gf-x04',
    pertanyaan: 'Bilangan x memenuhi 2 pangkat x sama dengan 20. Nilai x terletak di antara?',
    gambar: { jenis: 'grafik', fungsi: ['2 ** x', '20'], jangkauan: [0, 6, -2, 40], nama: ['y = 2ˣ', 'y = 20'] },
    pilihan: ['4 dan 5', '3 dan 4', '9 dan 10', '10 dan 11', '19 dan 20'],
    benar: 0,
    langkah: [
      'Apit dengan pangkat yang dikenal: 2⁴ = 16 dan 2⁵ = 32.',
      '20 ada di antara 16 dan 32, jadi x ada di antara 4 dan 5 (tepatnya ²log 20 ≈ 4,32).',
    ],
    jebakan: '"9 dan 10" membagi 20 dengan 2: mengira pangkat itu perkalian.',
    alasan: '16 < 20 < 32, jadi 4 < x < 5.',
    tingkat: 'sedang',
  },
  {
    // cek: 2*2 - 5*2 + 6 === 0 && 3*3 - 5*3 + 6 === 0
    id: 'gf-s11',
    pertanyaan: 'Grafik y = x² - 5x + 6 memotong sumbu x di?',
    gambar: { jenis: 'grafik', fungsi: ['x*x - 5*x + 6'], jangkauan: [-1, 6, -2, 8], titik: [{ x: 2, y: 0, label: '2' }, { x: 3, y: 0, label: '3' }] },
    pilihan: ['x = 2 dan x = 3', 'x = -2 dan x = -3', 'x = 1 dan x = 6', 'x = 0 dan x = 6', 'x = 5 saja'],
    benar: 0,
    langkah: [
      'Memotong sumbu x berarti y = 0: x² - 5x + 6 = 0.',
      'Faktorkan: dua bilangan yang jumlahnya -5 dan hasil kalinya 6, yaitu -2 dan -3: (x - 2)(x - 3) = 0.',
      'x = 2 atau x = 3.',
    ],
    jebakan: '"x = -2 dan -3" membaca tanda di dalam kurung apa adanya. "x = 1 dan 6" memakai hasil kali 6 tanpa memeriksa jumlahnya.',
    alasan: '(x - 2)(x - 3) = 0.',
    tingkat: 'sedang',
  },
  {
    id: 'gf-s12',
    pertanyaan: 'Grafik y = f(x) - 3 adalah grafik y = f(x) yang?',
    gambar: { jenis: 'grafik', fungsi: ['x*x', 'x*x - 3'], jangkauan: [-3, 3, -4, 8], nama: ['y = f(x)', 'y = f(x) - 3'] },
    pilihan: ['digeser 3 ke bawah', 'digeser 3 ke kiri', 'digeser 3 ke atas', 'digeser 3 ke kanan', 'dicerminkan'],
    benar: 0,
    langkah: [
      'Angka -3 ada di LUAR (dikerjakan pada hasil): tiap y dikurangi 3.',
      'Semua titik turun 3 satuan: geser ke bawah.',
    ],
    jebakan: '"3 ke kiri" mencampur dengan aturan di dalam kurung. Di luar kurung: bekerja apa adanya pada y.',
    alasan: 'Tiap y dikurangi 3: turun 3.',
    tingkat: 'sedang',
  },
  {
    // cek: Math.abs(800 * 0.5 ** 3 - 100) < 1e-9
    id: 'gf-s13',
    pertanyaan: 'Suatu zat meluruh: tiap jam massanya tinggal setengahnya. Mula-mula 800 gram. Setelah 3 jam tersisa?',
    gambar: { jenis: 'garis-data', kategori: ['0 jam', '1 jam', '2 jam', '3 jam'], nilai: [800, 400, 200, 100], satuan: 'gram', sorot: [3] },
    pilihan: ['100 gram', '200 gram', '400 gram', '266,7 gram', '50 gram'],
    benar: 0,
    langkah: [
      'Tiap jam dikali 1/2: 800 → 400 → 200 → 100.',
      'Rumusnya 800 × (1/2)³ = 100 gram.',
    ],
    jebakan: '200 berhenti di jam kedua. 266,7 membagi 800 dengan 3, mengira peluruhan itu pembagian rata.',
    alasan: '800 × (1/2)³ = 100.',
    tingkat: 'sedang',
  },
  {
    // cek: 3 ** 4 === 81
    id: 'gf-s14',
    pertanyaan: 'Nilai ³log 81 adalah?',
    pilihan: ['4', '27', '3', '81/3', '9'],
    benar: 0,
    langkah: [
      '3 pangkat berapa yang menghasilkan 81?',
      '3 × 3 × 3 × 3 = 81, jadi ³log 81 = 4.',
    ],
    jebakan: '27 adalah 81 : 3; 9 adalah √81. Logaritma menanyakan PANGKAT, bukan pembagian atau akar.',
    alasan: '3⁴ = 81.',
    tingkat: 'sedang',
  },

  /* =============================== sulit =============================== */
  {
    // cek: 3*4 + 12*(-2) + 5 === -7 && -12/6 === -2
    id: 'gf-t01',
    pertanyaan: 'Koordinat puncak grafik y = 3x² + 12x + 5 adalah?',
    gambar: { jenis: 'grafik', fungsi: ['3*x*x + 12*x + 5'], jangkauan: [-5, 1, -9, 8], titik: [{ x: -2, y: -7, label: '(-2, -7)' }] },
    pilihan: ['(-2, -7)', '(-2, 7)', '(2, -7)', '(-4, 5)', '(-2, -19)'],
    benar: 0,
    langkah: [
      'Sumbu simetri x = -b : 2a = -12 : 6 = -2.',
      'Masukkan x = -2: y = 3(4) + 12(-2) + 5 = 12 - 24 + 5 = -7.',
      'Puncak (-2, -7).',
    ],
    jebakan: '(-4, 5) memakai -b : a. (-2, -19) salah tanda saat menghitung 3(-2)²: kuadrat bilangan negatif itu positif.',
    alasan: 'x = -2, y = -7.',
    tingkat: 'sulit',
  },
  {
    // cek: 2*1*1 + 4*1 - 6 === 0 && 2*(-1)*(-1) + 4*(-1) - 6 === -8
    id: 'gf-t02',
    pertanyaan: 'Sebuah parabola berpuncak di (-1, -8) dan melalui titik (1, 0). Bentuk umumnya adalah?',
    gambar: { jenis: 'grafik', fungsi: ['2*x*x + 4*x - 6'], jangkauan: [-5, 3, -10, 6], titik: [{ x: -1, y: -8, label: 'puncak' }, { x: 1, y: 0, label: '(1, 0)' }] },
    pilihan: ['y = 2x² + 4x - 6', 'y = 2x² - 4x - 6', 'y = x² + 2x - 7', 'y = 2x² + 4x - 8', 'y = -2x² - 4x - 6'],
    benar: 0,
    langkah: [
      'Puncak diketahui: mulai dari y = a(x + 1)² - 8.',
      'Masukkan (1, 0): 0 = a(2)² - 8, jadi 4a = 8, a = 2.',
      'Jabarkan 2(x + 1)² - 8 = 2x² + 4x + 2 - 8 = 2x² + 4x - 6.',
    ],
    jebakan: 'y = x² + 2x - 7 menganggap a = 1 tanpa memeriksa titik (1, 0). y = 2x² + 4x - 8 lupa menambahkan 2 dari 2 × 1² saat menjabarkan.',
    alasan: 'a = 2, rumusnya 2x² + 4x - 6.',
    tingkat: 'sulit',
  },
  {
    // cek: 2 * 3 === 6
    id: 'gf-t03',
    pertanyaan: 'Titik (6, 5) ada pada grafik y = f(x). Pada grafik y = f(2x), titik itu berpindah ke mana?',
    pilihan: ['(3, 5)', '(12, 5)', '(6, 10)', '(6, 2.5)', '(3, 10)'],
    benar: 0,
    langkah: [
      'Angka 2 di dalam kurung bekerja pada masukan.',
      'Supaya mesin f menerima 6 seperti semula, harus 2x = 6, jadi x = 3.',
      'y tidak disentuh: (3, 5). Grafiknya memampat ke setengah lebar.',
    ],
    jebakan: '(12, 5) mengalikan (mengira melebar). (6, 10) mengerjakan angka 2 pada y, padahal ia di dalam kurung.',
    alasan: '2x = 6 memberi x = 3; y tetap.',
    tingkat: 'sulit',
  },
  {
    // cek: Math.abs(-2 - 5) === 7 && Math.abs(-2) - 5 === -3
    id: 'gf-t04',
    pertanyaan: 'Diketahui f(x) = x - 5. Berapa nilai |f(-2)| dan f(|-2|) berturut-turut?',
    pilihan: ['7 dan -3', '7 dan 3', '-7 dan -3', '3 dan 7', '7 dan 7'],
    benar: 0,
    langkah: [
      '|f(-2)|: hitung f(-2) = -7 dulu, lalu mutlakkan: 7.',
      'f(|-2|): mutlakkan masukannya dulu, |-2| = 2, lalu f(2) = -3.',
      'Hasilnya berbeda: mutlak di luar dan mutlak di dalam bukan hal yang sama.',
    ],
    jebakan: '"7 dan 7" mengira keduanya sama. "7 dan 3" memutlakkan hasil kedua juga, padahal tanda mutlaknya hanya pada masukan.',
    alasan: '|f(-2)| = 7 dan f(|-2|) = -3.',
    tingkat: 'sulit',
  },
  {
    // cek: 200 * 2 ** 5 === 6400
    id: 'gf-t05',
    pertanyaan: 'Sebuah kultur bakteri mula-mula 200 sel dan membelah menjadi dua kali lipat tiap jam. Setelah berapa jam jumlahnya mencapai 6.400 sel?',
    gambar: { jenis: 'grafik', fungsi: ['200 * 2 ** x', '6400'], jangkauan: [0, 6, 0, 7000], nama: ['sel = 200 × 2ˣ', '6.400'] },
    pilihan: ['5 jam', '32 jam', '6 jam', '4 jam', '31 jam'],
    benar: 0,
    langkah: [
      'Rumus: 200 × 2ˣ = 6.400.',
      '2ˣ = 6.400 : 200 = 32.',
      '2⁵ = 32, jadi x = 5 jam.',
    ],
    jebakan: '32 mengira hasil pembagian itu jawabannya; 32 adalah berapa KALI LIPAT, bukan berapa jam.',
    alasan: '2ˣ = 32, x = 5.',
    tingkat: 'sulit',
  },
  {
    id: 'gf-t06',
    pertanyaan: 'Asimtot datar grafik y = (3x - 2) dibagi (x + 4) berada di?',
    gambar: { jenis: 'grafik', fungsi: ['(3*x - 2)/(x + 4)', '3'], jangkauan: [-14, 8, -6, 10], tegak: [-4], nama: ['y = (3x - 2)/(x + 4)', 'y = 3'] },
    pilihan: ['y = 3', 'y = -2', 'y = 4', 'y = -4', 'y = 0'],
    benar: 0,
    langkah: [
      'Untuk x sangat besar, -2 dan +4 tidak berarti dibanding 3x dan x.',
      'Pecahannya mendekati 3x : x = 3.',
      'Asimtot datar y = 3; grafik makin mendekatinya ke kiri dan ke kanan.',
    ],
    jebakan: 'y = -4 adalah asimtot TEGAK (x = -4) yang salah ditulis sebagai y. y = 0 hanya berlaku kalau pembilangnya konstan.',
    alasan: 'Perbandingan koefisien x: 3/1 = 3.',
    tingkat: 'sulit',
  },
  {
    // cek: (2*1 - 3)**2 + 1 === 2 && 4*1 - 12*1 + 10 === 2
    id: 'gf-t07',
    pertanyaan: 'Diketahui f(x) = x² + 1 dan g(x) = 2x - 3. Rumus (f komposisi g)(x) adalah?',
    pilihan: ['4x² - 12x + 10', '2x² - 1', '4x² + 10', '2x² + 2', '4x² - 12x + 8'],
    benar: 0,
    langkah: [
      '(f ∘ g)(x) = f(g(x)): g bekerja dulu, hasilnya dimasukkan ke f.',
      'f(2x - 3) = (2x - 3)² + 1.',
      '(2x - 3)² = 4x² - 12x + 9, ditambah 1 jadi 4x² - 12x + 10.',
    ],
    jebakan: '2x² - 1 adalah urutan sebaliknya, g(f(x)) = 2(x² + 1) - 3. 4x² + 10 lupa suku tengah -12x saat mengkuadratkan.',
    alasan: '(2x - 3)² + 1 = 4x² - 12x + 10.',
    tingkat: 'sulit',
  },
  {
    id: 'gf-t08',
    pertanyaan: 'Setengah lingkaran ATAS berjari-jari 3 dengan pusat di titik asal digambar di bidang koordinat. Domain dan rangenya adalah?',
    gambar: { jenis: 'grafik', fungsi: ['Math.sqrt(9 - x*x)'], jangkauan: [-4, 4, -1, 4] },
    pilihan: [
      'domain -3 sampai 3, range 0 sampai 3',
      'domain -3 sampai 3, range -3 sampai 3',
      'domain 0 sampai 3, range 0 sampai 3',
      'domain -3 sampai 3, range 0 sampai 9',
      'bukan fungsi, jadi tidak punya domain',
    ],
    benar: 0,
    langkah: [
      'Domain: semua x yang dipakai; setengah lingkaran melebar dari -3 sampai 3.',
      'Range: semua y yang keluar; hanya bagian ATAS, jadi 0 sampai 3.',
      'Setengah lingkaran atas lolos uji garis tegak, jadi ia fungsi.',
    ],
    jebakan: '"bukan fungsi" benar untuk lingkaran PENUH; separuhnya lolos. "range -3 sampai 3" mengira bagian bawah ikut.',
    alasan: 'Domain [-3, 3], range [0, 3].',
    tingkat: 'sulit',
  },
  {
    id: 'gf-x06',
    pertanyaan: 'Kenapa fungsi y = x² dengan domain semua bilangan real TIDAK punya fungsi invers?',
    gambar: { jenis: 'grafik', fungsi: ['x*x', '9'], jangkauan: [-4, 4, -1, 12], titik: [{ x: 3, y: 9, label: '(3, 9)' }, { x: -3, y: 9, label: '(-3, 9)' }] },
    pilihan: [
      'Karena dua masukan berbeda bisa memberi keluaran yang sama',
      'Karena grafiknya melengkung, bukan garis lurus',
      'Karena hasilnya tidak pernah negatif',
      'Karena grafiknya tidak memotong sumbu x di dua titik',
      'Karena rumusnya tidak bisa dibalik secara aljabar',
    ],
    benar: 0,
    langkah: [
      'Syarat punya invers: fungsi satu-satu (uji garis mendatar).',
      'Garis y = 9 memotong grafik dua kali, di x = 3 dan x = -3.',
      'Mesin pembalik tidak tahu harus mengembalikan 3 atau -3. Kalau domain dibatasi x ≥ 0, inversnya langsung ada: √x.',
    ],
    jebakan: '"tidak bisa dibalik secara aljabar" keliru: √9 bisa dihitung; masalahnya ada DUA jawaban, bukan tidak ada.',
    alasan: 'Gagal uji garis mendatar: 3 dan -3 sama-sama memberi 9.',
    tingkat: 'sulit',
  },
  {
    // cek: 3*3 - 6*3 + 11 === 2
    id: 'gf-t09',
    pertanyaan: 'Nilai minimum fungsi y = x² - 6x + 11 adalah?',
    gambar: { jenis: 'grafik', fungsi: ['x*x - 6*x + 11'], jangkauan: [-1, 7, -1, 12], titik: [{ x: 3, y: 2, label: '(3, 2)' }] },
    pilihan: ['2', '3', '11', '-7', '20'],
    benar: 0,
    langkah: [
      'a = 1 positif: parabola terbuka ke atas, puncaknya nilai minimum.',
      'Sumbu simetri x = -(-6) : 2 = 3.',
      'y(3) = 9 - 18 + 11 = 2. Nilai minimumnya 2, di titik (3, 2).',
    ],
    jebakan: '3 adalah letak x-nya, bukan nilai minimumnya. 11 adalah titik potong sumbu y. -7 hasil salah tanda 9 - 18 - 11.',
    alasan: 'Puncak (3, 2), minimumnya 2.',
    tingkat: 'sulit',
  },
  {
    // cek: 2*0 - 0 + 3 === 3 && 2*1 - 4*1 + 3 === 1
    id: 'gf-t10',
    pertanyaan: 'Parabola berpuncak di (1, 1) dan memotong sumbu y di (0, 3). Bentuk umumnya adalah?',
    gambar: { jenis: 'grafik', fungsi: ['2*x*x - 4*x + 3'], jangkauan: [-2, 4, -1, 8], titik: [{ x: 1, y: 1, label: 'puncak' }, { x: 0, y: 3, label: '(0, 3)' }] },
    pilihan: ['y = 2x² - 4x + 3', 'y = x² - 2x + 3', 'y = 2x² + 4x + 3', 'y = 3x² - 6x + 1', 'y = 2x² - 4x + 1'],
    benar: 0,
    langkah: [
      'Bentuk puncak: y = a(x - 1)² + 1.',
      'Lewat (0, 3): 3 = a(1) + 1, jadi a = 2.',
      'Jabarkan: 2(x² - 2x + 1) + 1 = 2x² - 4x + 3. Periksa: x = 0 memberi 3, cocok.',
    ],
    jebakan: 'y = x² - 2x + 3 memakai a = 1, tetapi puncaknya jadi (1, 2), bukan (1, 1). y = 2x² - 4x + 1 lupa menambah 1 dari puncak.',
    alasan: 'a = 2 dari titik (0, 3).',
    tingkat: 'sulit',
  },
  {
    // cek: Math.abs(2*5 - 4) === 6 && Math.abs(2*(-1) - 4) === 6
    id: 'gf-t11',
    pertanyaan: 'Penyelesaian |2x - 4| = 6 adalah?',
    gambar: { jenis: 'grafik', fungsi: ['Math.abs(2*x - 4)', '6'], jangkauan: [-3, 7, -1, 10], titik: [{ x: 5, y: 6, label: 'x = 5' }, { x: -1, y: 6, label: 'x = -1' }], nama: ['y = |2x - 4|', 'y = 6'] },
    pilihan: ['x = 5 atau x = -1', 'x = 5 saja', 'x = 1 atau x = 5', 'x = -5 atau x = 1', 'x = 3'],
    benar: 0,
    langkah: [
      'Isi mutlaknya boleh 6 atau -6.',
      '2x - 4 = 6 memberi x = 5; 2x - 4 = -6 memberi x = -1.',
      'Di grafik, garis y = 6 memotong bentuk V di dua tempat.',
    ],
    jebakan: '"x = 5 saja" melupakan cabang negatif; grafik V selalu dipotong garis mendatar (di atas puncaknya) di DUA titik.',
    alasan: 'x = 5 atau x = -1.',
    tingkat: 'sulit',
  },
  {
    id: 'gf-t12',
    pertanyaan: 'Asimtot datar grafik y = 2ˣ - 4 adalah?',
    gambar: { jenis: 'grafik', fungsi: ['2 ** x - 4', '-4'], jangkauan: [-5, 4, -6, 10], nama: ['y = 2ˣ - 4', 'y = -4'] },
    pilihan: ['y = -4', 'y = 0', 'y = 4', 'x = -4', 'y = 2'],
    benar: 0,
    langkah: [
      'y = 2ˣ menempel pada y = 0 di kiri (2ˣ makin kecil tetapi tidak pernah nol).',
      'Angka -4 di luar menggeser seluruh grafik 4 ke bawah, termasuk asimtotnya.',
      'Asimtot datar baru: y = -4.',
    ],
    jebakan: 'y = 0 lupa geseran. x = -4 salah jenis: asimtot eksponen mendatar, bukan tegak.',
    alasan: 'Asimtot y = 0 ikut turun 4: y = -4.',
    tingkat: 'sulit',
  },
  {
    // cek: (2 + 1) ** 2 === 9
    id: 'gf-t13',
    pertanyaan: 'Diketahui f(x) = x² dan g(x) = x + 1. Nilai (f ∘ g)(2) adalah?',
    pilihan: ['9', '5', '4', '3', '6'],
    benar: 0,
    langkah: [
      '(f ∘ g)(2) = f(g(2)): g dulu.',
      'g(2) = 3, lalu f(3) = 9.',
    ],
    jebakan: '5 adalah (g ∘ f)(2) = g(4) = 5, urutan terbalik. Yang ditulis di kanan dikerjakan lebih dulu.',
    alasan: 'g(2) = 3, f(3) = 9.',
    tingkat: 'sulit',
  },
  {
    // cek: Math.log2(8) === 3
    id: 'gf-t14',
    pertanyaan: 'Titik yang terletak pada grafik y = ²log x adalah?',
    gambar: { jenis: 'grafik', fungsi: ['Math.log2(x)'], jangkauan: [-1, 10, -3, 4], titik: [{ x: 8, y: 3, label: '(8, 3)' }, { x: 1, y: 0, label: '(1, 0)' }] },
    pilihan: ['(8, 3)', '(3, 8)', '(2, 4)', '(0, 1)', '(4, 16)'],
    benar: 0,
    langkah: [
      'Titik (x, y) ada di grafik kalau y = ²log x, yaitu 2ʸ = x.',
      '2³ = 8, jadi (8, 3) ada di grafik.',
      '(3, 8) adalah titik grafik y = 2ˣ, cerminannya.',
    ],
    jebakan: '(3, 8) dan (4, 16) adalah titik grafik eksponen 2ˣ, bukan logaritma; keduanya cerminan terhadap garis y = x. (0, 1) tidak mungkin: log 0 tidak ada.',
    alasan: '²log 8 = 3.',
    tingkat: 'sulit',
  },

  /* ============================ sangat sulit ============================ */
  {
    // cek: 2*0 - 0 - 16 === -16 && 2*4*4 - 4*4 - 16 === 0
    id: 'gf-x01',
    pertanyaan: 'Sebuah parabola memotong sumbu x di (-2, 0) dan (4, 0), serta memotong sumbu y di (0, -16). Bentuk umumnya adalah?',
    gambar: { jenis: 'grafik', fungsi: ['2*x*x - 4*x - 16'], jangkauan: [-4, 6, -20, 8], titik: [{ x: -2, y: 0, label: '-2' }, { x: 4, y: 0, label: '4' }, { x: 0, y: -16, label: '(0, -16)' }] },
    pilihan: ['y = 2x² - 4x - 16', 'y = x² - 2x - 8', 'y = 2x² + 4x - 16', 'y = -2x² + 4x + 16', 'y = 2x² - 4x + 16'],
    benar: 0,
    langkah: [
      'Akar diketahui: y = a(x + 2)(x - 4).',
      'Lewat (0, -16): -16 = a(2)(-4) = -8a, jadi a = 2.',
      'Jabarkan: 2(x² - 2x - 8) = 2x² - 4x - 16.',
    ],
    jebakan: 'y = x² - 2x - 8 memakai a = 1; titik potong sumbu y-nya -8, bukan -16. y = -2x² + 4x + 16 memberi (0, 16).',
    alasan: 'a = 2, rumusnya 2x² - 4x - 16.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: 3*3 === 9 && 3*2 + 2 === 8 && 3 + 2 === 5
    id: 'gf-x02',
    pertanyaan: 'Diketahui f(x) = ax + b dengan a bilangan positif, dan (f komposisi f)(x) = 9x + 8. Nilai a + b adalah?',
    pilihan: ['5', '11', '7', '17', '4'],
    benar: 0,
    langkah: [
      'f(f(x)) = a(ax + b) + b = a²x + ab + b.',
      'Samakan dengan 9x + 8: a² = 9, dan a positif, jadi a = 3.',
      'ab + b = 3b + b = 4b = 8, jadi b = 2. Maka a + b = 5.',
    ],
    jebakan: '11 memakai b = 8 (lupa b dikalikan a lalu ditambah b lagi). Tanpa syarat a positif, a = -3 dan b = -4 juga memenuhi; itu sebabnya syaratnya ditulis.',
    alasan: 'a = 3, b = 2.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: (2*2 - 3)**2 === 1
    id: 'gf-x03',
    pertanyaan: 'Grafik y = x² mula-mula digeser 3 satuan ke kanan, BARU kemudian dikenai penggantian x menjadi 2x. Rumus akhirnya adalah?',
    gambar: { jenis: 'grafik', fungsi: ['x*x', '(x - 3)*(x - 3)', '(2*x - 3)*(2*x - 3)'], jangkauan: [-2, 6, -1, 10], nama: ['y = x²', 'geser 3 kanan', 'lalu x → 2x'] },
    pilihan: ['y = (2x - 3)²', 'y = 4(x - 3)²', 'y = (2x + 3)²', 'y = 2(x - 3)²', 'y = (x - 6)²'],
    benar: 0,
    langkah: [
      'Setelah digeser: h(x) = (x - 3)², puncak di x = 3.',
      'Ganti x dengan 2x pada rumus itu: h(2x) = (2x - 3)², puncaknya pindah ke x = 1,5.',
      'Urutan berpengaruh: kalau dimampatkan dulu baru digeser, hasilnya (2(x - 3))² = 4(x - 3)², puncak di x = 3.',
    ],
    jebakan: 'y = 4(x - 3)² adalah urutan sebaliknya. y = (x - 6)² mengira mampat membuat geseran berlipat.',
    alasan: 'h(2x) = (2x - 3)².',
    tingkat: 'sangat sulit',
  },
  {
    // cek: 6*6 - 36 === 0 && (-6)*(-6) - 36 === 0
    id: 'gf-x05',
    pertanyaan: 'Grafik y = x² + mx + 9 menyinggung sumbu x. Nilai m yang memenuhi adalah?',
    pilihan: ['6 atau -6', '6 saja', '3 atau -3', '9 atau -9', '0 saja'],
    benar: 0,
    langkah: [
      'Menyinggung sumbu x berarti D = 0.',
      'D = m² - 4(1)(9) = m² - 36 = 0, jadi m² = 36.',
      'm = 6 (rumus (x + 3)²) atau m = -6 (rumus (x - 3)²). Keduanya sah.',
    ],
    jebakan: '"6 saja" melupakan akar negatif. "3 atau -3" mengambil akar dari 9, bukan dari 36.',
    alasan: 'm² = 36, m = ±6.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: (2*2 - 4*(-1)*(-3)) < 0
    id: 'gf-x07',
    pertanyaan: 'Grafik y = ax² + bx + c terbuka ke bawah, tidak memotong sumbu x, dan memotong sumbu y di bawah sumbu x. Tanda a, c, dan D berturut-turut?',
    gambar: { jenis: 'grafik', fungsi: ['-x*x + 2*x - 3'], jangkauan: [-3, 5, -10, 3] },
    pilihan: ['a < 0, c < 0, D < 0', 'a > 0, c < 0, D > 0', 'a < 0, c > 0, D < 0', 'a > 0, c > 0, D < 0', 'a < 0, c < 0, D > 0'],
    benar: 0,
    langkah: [
      'Terbuka ke bawah: a < 0.',
      'Tidak memotong sumbu x: D < 0.',
      'Memotong sumbu y di bawah sumbu x: c < 0 (c adalah y saat x = 0).',
      'Contohnya y = -x² + 2x - 3: D = 4 - 12 = -8, seluruh grafik di bawah sumbu x.',
    ],
    jebakan: '"a < 0, c < 0, D > 0" salah pada D: kalau D > 0 grafik memotong sumbu x dua kali. Parabola terbuka ke bawah yang puncaknya di bawah sumbu x tidak pernah naik sampai ke sumbu itu.',
    alasan: 'a < 0, D < 0, c < 0.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: 5*5 - 36 < 0 && 6*6 - 36 === 0
    id: 'gf-x08',
    pertanyaan: 'Fungsi f(x) = x² + mx + 9 selalu bernilai positif untuk semua x (definit positif). Nilai m yang memenuhi?',
    gambar: { jenis: 'grafik', fungsi: ['x*x + 2*x + 9', 'x*x + 6*x + 9', 'x*x + 8*x + 9'], jangkauan: [-9, 4, -9, 14], nama: ['m = 2', 'm = 6', 'm = 8'] },
    pilihan: ['-6 < m < 6', 'm < -6 atau m > 6', 'm > 0', '-3 < m < 3', 'm ≠ 0'],
    benar: 0,
    langkah: [
      'Selalu positif berarti grafik seluruhnya di atas sumbu x: a > 0 (sudah, a = 1) dan D < 0.',
      'D = m² - 36 < 0, jadi m² < 36.',
      '-6 < m < 6. Di gambar: m = 2 tidak menyentuh, m = 6 menyinggung, m = 8 memotong.',
    ],
    jebakan: '"m < -6 atau m > 6" membalik arah pertidaksamaan: itu syarat D > 0 (memotong dua kali). "-3 < m < 3" mengambil akar dari 9.',
    alasan: 'm² < 36.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: -5*2*2 + 20*2 + 1 === 21
    id: 'gf-x09',
    pertanyaan: 'Tinggi bola (meter) setelah t detik mengikuti h(t) = -5t² + 20t + 1. Tinggi maksimum bola adalah?',
    gambar: { jenis: 'grafik', fungsi: ['-5*x*x + 20*x + 1'], jangkauan: [0, 4.5, 0, 25], titik: [{ x: 2, y: 21, label: '(2, 21)' }] },
    pilihan: ['21 m', '20 m', '2 m', '1 m', '41 m'],
    benar: 0,
    langkah: [
      'a = -5 negatif: puncaknya nilai maksimum.',
      'Saat puncak: t = -b : 2a = -20 : (-10) = 2 detik.',
      'h(2) = -5(4) + 20(2) + 1 = -20 + 40 + 1 = 21 m.',
    ],
    jebakan: '2 m adalah WAKTUNYA, bukan tingginya. 41 salah tanda pada -5(4). 1 m adalah tinggi awal.',
    alasan: 'Puncak di t = 2, h = 21.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: 2 ** (4 + 1) === 32
    id: 'gf-x10',
    pertanyaan: 'Nilai x yang memenuhi 2ˣ⁺¹ = 32 adalah?',
    pilihan: ['4', '5', '16', '15', '31'],
    benar: 0,
    langkah: [
      '32 = 2⁵, jadi 2ˣ⁺¹ = 2⁵.',
      'Pokoknya sama, pangkatnya harus sama: x + 1 = 5.',
      'x = 4.',
    ],
    jebakan: '5 lupa mengurangi 1 (menjawab pangkatnya, bukan x). 16 mengira 32 dibagi 2.',
    alasan: 'x + 1 = 5, x = 4.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: Math.abs(2 - 2) + 3 === 3
    id: 'gf-x11',
    pertanyaan: 'Grafik y = |x - 2| digeser 3 satuan ke atas. Titik terendah grafik hasilnya adalah?',
    gambar: { jenis: 'grafik', fungsi: ['Math.abs(x - 2)', 'Math.abs(x - 2) + 3'], jangkauan: [-2, 6, -1, 8], nama: ['y = |x - 2|', 'y = |x - 2| + 3'], titik: [{ x: 2, y: 3, label: '(2, 3)' }] },
    pilihan: ['(2, 3)', '(-2, 3)', '(5, 0)', '(2, 0)', '(3, 2)'],
    benar: 0,
    langkah: [
      'y = |x - 2| berbentuk V dengan ujung di (2, 0): isi mutlak nol saat x = 2.',
      'Digeser 3 ke atas: rumus jadi |x - 2| + 3, ujung V pindah ke (2, 3).',
    ],
    jebakan: '(5, 0) mengira geseran ke kanan 3. (-2, 3) membaca tanda dalam kurung apa adanya. (2, 0) lupa geserannya.',
    alasan: 'Ujung V (2, 0) naik 3 menjadi (2, 3).',
    tingkat: 'sangat sulit',
  },
  {
    // cek: 4*9 - 4*(3 + 6) === 0 && 4*4 - 4*(-2 + 6) === 0
    id: 'gf-x12',
    pertanyaan: 'Grafik y = x² - 2kx + k + 6 menyinggung sumbu x. Nilai k yang memenuhi?',
    pilihan: ['k = 3 atau k = -2', 'k = 3 saja', 'k = -3 atau k = 2', 'k = 6', 'k = 0 atau k = 1'],
    benar: 0,
    langkah: [
      'Menyinggung: D = 0 dengan a = 1, b = -2k, c = k + 6.',
      'D = 4k² - 4(k + 6) = 0, bagi 4: k² - k - 6 = 0.',
      '(k - 3)(k + 2) = 0, jadi k = 3 atau k = -2.',
    ],
    jebakan: '"k = 3 saja" membuang akar negatif tanpa alasan; keduanya memberi D = 0. "k = -3 atau 2" salah tanda saat memfaktorkan.',
    alasan: 'k² - k - 6 = 0.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: Math.abs((4 + 4 - 1)/3 - 7/3) < 1e-9 && Math.abs(2*(7/3) + ((1-2)**2 + 2*(1-2) - 1)/3 - 4) < 1e-9
    id: 'gf-x13',
    pertanyaan: 'Fungsi f memenuhi 2f(x) + f(1 - x) = x² untuk setiap bilangan real x. Nilai f(2) adalah?',
    pilihan: ['7/3', '4/3', '4', '2', '5/3'],
    benar: 0,
    langkah: [
      'Persamaan berlaku untuk semua x, jadi ganti x dengan 1 - x: 2f(1 - x) + f(x) = (1 - x)².',
      'Sekarang ada dua persamaan dengan dua "yang tidak diketahui", f(x) dan f(1 - x). Kalikan yang pertama dengan 2 lalu kurangi yang kedua: 3f(x) = 2x² - (1 - x)² = x² + 2x - 1.',
      'f(x) = (x² + 2x - 1) : 3, sehingga f(2) = (4 + 4 - 1) : 3 = 7/3.',
      'Periksa: 2f(2) + f(-1) = 14/3 + (1 - 2 - 1)/3 = 14/3 - 2/3 = 4 = 2². Cocok.',
    ],
    jebakan: '4/3 membagi x² dengan 3 saja (mengabaikan f(1 - x)). 2 mengira f(x) = x²/2. Kunci soal ini: satu persamaan bisa "diduplikasi" dengan mengganti x.',
    alasan: 'f(x) = (x² + 2x - 1)/3, f(2) = 7/3.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: 3 + 2 * 9 === 21
    id: 'gf-x14',
    pertanyaan: 'Fungsi f memenuhi f(x + 1) = f(x) + 2 untuk semua x, dan f(1) = 3. Nilai f(10) adalah?',
    pilihan: ['21', '20', '23', '12', '30'],
    benar: 0,
    langkah: [
      'Tiap x naik 1, nilai f naik 2: f(2) = 5, f(3) = 7, dan seterusnya. Ini garis lurus dengan kemiringan 2.',
      'Dari x = 1 ke x = 10 ada 9 langkah, nilainya naik 9 × 2 = 18.',
      'f(10) = 3 + 18 = 21.',
    ],
    jebakan: '23 menghitung 10 langkah (dari 1 sampai 10 ada 9 langkah, bukan 10). 20 memakai f(x) = 2x tanpa memeriksa f(1) = 3; rumus yang cocok adalah f(x) = 2x + 1.',
    alasan: 'f(x) = 2x + 1, f(10) = 21.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: Math.abs(3*3 - 4) === 5 && Math.abs((-3)*(-3) - 4) === 5 && 9 + 9 === 18
    id: 'gf-x15',
    pertanyaan: 'Jumlah kuadrat semua nilai x yang memenuhi |x² - 4| = 5 adalah?',
    gambar: { jenis: 'grafik', fungsi: ['Math.abs(x*x - 4)', '5'], jangkauan: [-4, 4, -1, 12], titik: [{ x: 3, y: 5, label: '3' }, { x: -3, y: 5, label: '-3' }], nama: ['y = |x² - 4|', 'y = 5'] },
    pilihan: ['18', '9', '0', '6', '10'],
    benar: 0,
    langkah: [
      'Isi mutlak 5 atau -5: x² - 4 = 5 memberi x² = 9; x² - 4 = -5 memberi x² = -1, tidak ada x real.',
      'Jadi x = 3 atau x = -3 (garis y = 5 memotong grafik hanya dua kali; lembah tengahnya cuma setinggi 4).',
      'Jumlah kuadratnya 9 + 9 = 18.',
    ],
    jebakan: '0 menjawab JUMLAH x-nya (3 + (-3)), bukan jumlah kuadratnya. 9 hanya menghitung satu akar. Cabang x² = -1 sering keliru dianggap memberi x = ±1.',
    alasan: 'x² = 9, dua akar, 9 + 9 = 18.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: Math.abs((1 + Math.sqrt(9)) - (1 - Math.sqrt(9))) === 6
    id: 'gf-x16',
    pertanyaan: 'Parabola y = x² - 2x + c memotong sumbu x di dua titik yang berjarak 6 satuan. Nilai c adalah?',
    gambar: { jenis: 'grafik', fungsi: ['x*x - 2*x - 8'], jangkauan: [-4, 6, -10, 6], titik: [{ x: -2, y: 0, label: '-2' }, { x: 4, y: 0, label: '4' }] },
    pilihan: ['-8', '8', '-3', '3', '-9'],
    benar: 0,
    langkah: [
      'Sumbu simetri x = 1; dua akar yang berjarak 6 berada 3 di kiri dan 3 di kanan: x = -2 dan x = 4.',
      'Bentuk faktor: (x + 2)(x - 4) = x² - 2x - 8.',
      'Jadi c = -8. Periksa: sumbu simetri (-2 + 4)/2 = 1, cocok dengan -b/2a.',
    ],
    jebakan: '8 salah tanda. -9 mengira jarak akar = D (padahal jarak akar = √D/a: D = 4 + 32 = 36, √36 = 6, cocok).',
    alasan: 'Akar -2 dan 4, hasil kalinya c = -8.',
    tingkat: 'sangat sulit',
  },
  {
    // cek: 5 * 3 ** 2 === 45 && 5 * 3 ** 3 === 135
    id: 'gf-x17',
    pertanyaan: 'Fungsi eksponen f(x) = a·bˣ melalui (0, 5) dan (2, 45). Nilai f(3) adalah?',
    gambar: { jenis: 'grafik', fungsi: ['5 * 3 ** x'], jangkauan: [-1, 3.5, -10, 150], titik: [{ x: 0, y: 5, label: '(0, 5)' }, { x: 2, y: 45, label: '(2, 45)' }] },
    pilihan: ['135', '90', '65', '405', '125'],
    benar: 0,
    langkah: [
      'Lewat (0, 5): a·b⁰ = a = 5.',
      'Lewat (2, 45): 5·b² = 45, jadi b² = 9 dan b = 3 (pokok eksponen positif).',
      'f(3) = 5 × 3³ = 135.',
    ],
    jebakan: '90 menganggap tumbuhnya linear (+40 tiap 2 langkah). 405 menghitung 5 × 3⁴. 65 menambah 20 lagi dari 45.',
    alasan: 'a = 5, b = 3, f(3) = 135.',
    tingkat: 'sangat sulit',
  },
]
