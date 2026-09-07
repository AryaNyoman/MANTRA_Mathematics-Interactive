/**
 * Bank soal kuis Integral: 32 soal, delapan untuk tiap tingkat.
 *
 * Bentuknya mengikuti bank soal Limit. Tingkat kesulitan dikalibrasi ke buku
 * Matematika Tingkat Lanjut Kelas XII (Edisi Revisi 2025) Bab 3.
 *
 * SUMBER SOAL. Sebagian besar soal di sini ditulis sendiri: yang mengikuti buku
 * hanya bentuk dan tingkat kesulitannya. Tetapi SEMBILAN soal memakai fungsi dan
 * angka persis dari buku, dan semuanya sekarang menyebutkan sumbernya di akhir
 * `alasan` lengkap dengan halaman cetaknya: int-md1, int-sl7, int-ss1, int-ss2,
 * int-ss4, int-ss5, int-ss6, int-ss7, dan int-ss8. Aturan proyek: soal salinan
 * WAJIB bersumber, dan soal tanpa keterangan berarti tulisan sendiri.
 *
 * Satu soal berada di antara keduanya dan sengaja TIDAK diberi sumber:
 * int-sd5 memakai pola Contoh Soal 3.3 (2x(x kuadrat + 5) pangkat 4) dengan
 * angka yang diganti menjadi 2x(x kuadrat + 1) pangkat 3. Angkanya beda, jadi
 * ia soal sendiri yang meniru bentuk, bukan salinan.
 *
 * EMPAT TINGKAT YANG BENAR-BENAR BERBEDA CARA BERPIKIRNYA, bukan cuma angkanya
 * lebih besar:
 *   mudah        satu aturan dipakai sekali, tanpa batas
 *   sedang       integral tentu sederhana, atau satu kali substitusi
 *   sulit        substitusi dengan batas, luas bertanda, parsial satu tingkat
 *   sangat sulit dipecah di titik potong, dua kurva, dan penerapan
 *
 * PENGECOHNYA KEKELIRUAN NYATA, bukan angka asal. Yang paling sering dipakai:
 * menjawab dengan turunannya, lupa membagi turunan dalam pada substitusi,
 * menjawab luas dengan hasil integral, dan lupa memecah di titik potong.
 *
 * SELURUH JAWABAN NUMERIK DIPERIKSA MESIN dengan sympy lewat
 * `python alat/cek_integral.py alat/soal-integral.json`, bukan `cek_soal.py`:
 * alat itu hanya paham klaim limit.
 */

import type { SoalKuis } from '@/content/tipe'

export const KUIS: SoalKuis[] = [
  /* ---------------------------- MUDAH ---------------------------- */
  {
    id: 'int-md1',
    pertanyaan: 'Antiturunan dari x⁵ adalah',
    pilihan: ['x⁶/6 + C', '5x⁴ + C', 'x⁶ + C', 'x⁴/4 + C', '6x⁶ + C'],
    benar: 0,
    alasan: 'Pangkat naik satu jadi 6, lalu dibagi pangkat yang baru itu. Pilihan 5x⁴ adalah turunannya, bukan antiturunannya. Soal dari Contoh Soal 3.2, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 170.',
    tingkat: 'mudah',
  },
  {
    id: 'int-md2',
    pertanyaan: 'Antiturunan dari 3x² adalah',
    pilihan: ['9x³ + C', 'x³ + C', '6x + C', '3x³ + C', 'x³/3 + C'],
    benar: 1,
    alasan: 'Angka 3 boleh dikeluarkan dulu (Sifat 3.12), lalu antiturunan x² adalah x³/3. Hasilnya 3 dikali x³/3, yaitu x³.',
    tingkat: 'mudah',
  },
  {
    id: 'int-md3',
    pertanyaan: 'Antiturunan dari 2x + 1 adalah',
    pilihan: ['2x² + x + C', 'x² + x', 'x² + x + C', '2 + C', 'x² + 1 + C'],
    benar: 2,
    alasan: 'Kerjakan dua suku terpisah: 2x menjadi x², dan 1 menjadi x. Pilihan tanpa C bukan jawaban lengkap, sebab antiturunan tidak pernah tunggal.',
    tingkat: 'mudah',
  },
  {
    id: 'int-md4',
    pertanyaan: 'Hasil dari integral dx (tanpa fungsi lain) adalah',
    pilihan: ['1 + C', 'x²/2 + C', '0', 'x + C', 'C'],
    benar: 3,
    alasan: 'Ini Sifat 3.1. Fungsi yang turunannya 1 adalah x, jadi jawabannya x + C.',
    tingkat: 'mudah',
  },
  {
    id: 'int-md5',
    pertanyaan: 'Antiturunan dari sin x adalah',
    pilihan: ['cos x + C', '-sin x + C', 'sin x + C', 'tan x + C', '-cos x + C'],
    benar: 4,
    alasan: 'Turunan cos x adalah minus sin x, jadi untuk membalikkannya tanda minus dipindah ke depan. Tanda minus itu milik sinus, bukan kosinus.',
    tingkat: 'mudah',
  },
  {
    id: 'int-md6',
    pertanyaan: 'Antiturunan dari cos x adalah',
    pilihan: ['sin x + C', '-sin x + C', '-cos x + C', 'sec² x + C', 'cos x + C'],
    benar: 0,
    alasan: 'Turunan sin x adalah cos x, bersih tanpa tanda, jadi membalikkannya juga bersih. Pilihan minus sin x adalah kekeliruan yang paling sering: minusnya terbawa dari aturan turunan kosinus.',
    tingkat: 'mudah',
  },
  {
    id: 'int-md7',
    pertanyaan: 'Antiturunan dari eˣ adalah',
    pilihan: ['ln x + C', 'eˣ + C', 'x eˣ + C', 'eˣ/x + C', 'e^(x+1)/(x+1) + C'],
    benar: 1,
    alasan: 'eˣ adalah fungsi yang turunannya dirinya sendiri, jadi antiturunannya juga dirinya sendiri. Aturan pangkat tidak berlaku di sini, sebab yang dipangkatkan bukan x.',
    tingkat: 'mudah',
  },
  {
    id: 'int-md8',
    pertanyaan: 'Antiturunan dari akar x adalah',
    pilihan: [
      'x²/2 + C',
      '(1/2) akar x + C',
      '(2/3) x akar x + C',
      '(3/2) x akar x + C',
      'akar x + C',
    ],
    benar: 2,
    alasan: 'Tulis akar x sebagai x pangkat setengah. Pangkat naik jadi tiga per dua, lalu dibagi tiga per dua, yang sama dengan dikali dua per tiga.',
    tingkat: 'mudah',
  },

  /* ---------------------------- SEDANG ---------------------------- */
  {
    id: 'int-sd1',
    pertanyaan: 'Hitung integral x² dari 0 sampai 2.',
    pilihan: ['8', '2/3', '4/3', '8/3', '4'],
    benar: 3,
    alasan: 'Antiturunannya x³/3. Masukkan batas atas 8/3, batas bawah 0, lalu kurangkan.',
    langkah: ['antiturunan: x³/3', 'batas atas: 8/3', 'batas bawah: 0', 'kurangkan: 8/3'],
    tingkat: 'sedang',
  },
  {
    id: 'int-sd2',
    pertanyaan: 'Hitung integral x dari 1 sampai 3.',
    pilihan: ['2', '9/2', '8', '3', '4'],
    benar: 4,
    alasan: 'Antiturunannya x²/2. Batas atas memberi 9/2, batas bawah 1/2, selisihnya 4. Bisa diperiksa dengan gambar: daerahnya trapesium dengan sisi 1 dan 3, tinggi 2.',
    langkah: ['antiturunan: x²/2', 'batas atas: 9/2', 'batas bawah: 1/2', 'kurangkan: 4'],
    tingkat: 'sedang',
  },
  {
    id: 'int-sd3',
    pertanyaan: 'Hitung integral 4x³ dari 0 sampai 1.',
    pilihan: ['1', '4', '1/4', '12', '3'],
    benar: 0,
    alasan: 'Antiturunan 4x³ adalah x⁴. Batas atas 1, batas bawah 0, jadi hasilnya 1.',
    langkah: ['keluarkan angka 4', 'antiturunan x³ adalah x⁴/4', '4 dikali x⁴/4 sama dengan x⁴', 'masukkan batas: 1 dikurangi 0'],
    tingkat: 'sedang',
  },
  {
    id: 'int-sd4',
    pertanyaan: 'Antiturunan dari (2x + 1)⁵ adalah',
    pilihan: [
      '(2x + 1)⁶ + C',
      '(2x + 1)⁶/12 + C',
      '(2x + 1)⁶/6 + C',
      '(2x + 1)⁶/2 + C',
      '5(2x + 1)⁴ + C',
    ],
    benar: 1,
    alasan: 'Dengan u = 2x + 1, du = 2 dx, sementara soal hanya punya dx. Kekurangan faktor 2 ditambal dengan mengalikan setengah, jadi pembaginya 12, bukan 6. Turunkan pilihan yang dibagi 6 dan Anda mendapat dua kali soalnya.',
    langkah: ['u = 2x + 1, du = 2 dx', 'soal punya dx saja, jadi dikali setengah', 'antiturunan u⁵ adalah u⁶/6', 'setengah dikali u⁶/6 sama dengan u⁶/12', 'kembalikan u menjadi 2x + 1'],
    tingkat: 'sedang',
  },
  {
    id: 'int-sd5',
    pertanyaan: 'Antiturunan dari 2x(x² + 1)³ adalah',
    pilihan: [
      '2x(x² + 1)⁴/4 + C',
      '3(x² + 1)² + C',
      '(x² + 1)⁴/4 + C',
      '(x² + 1)⁴/8 + C',
      '(x² + 1)⁴ + C',
    ],
    benar: 2,
    alasan: 'Dengan u = x² + 1, du = 2x dx, dan bagian 2x dx sudah ada di soal. Tidak perlu ditambal apa pun, jadi jawabannya u⁴/4.',
    langkah: ['u = x² + 1, du = 2x dx', 'sisa soal sudah persis du', 'antiturunan u³ adalah u⁴/4', 'kembalikan u menjadi x² + 1'],
    tingkat: 'sedang',
  },
  {
    id: 'int-sd6',
    pertanyaan: 'Hitung integral cos x dari 0 sampai setengah pi.',
    pilihan: ['-1', 'setengah pi', '2', '1', '0'],
    benar: 3,
    alasan: 'Antiturunan cos x adalah sin x. Sinus setengah pi bernilai 1, sinus nol bernilai 0, jadi selisihnya 1.',
    langkah: ['antiturunan: sin x', 'batas atas: sin setengah pi sama dengan 1', 'batas bawah: sin 0 sama dengan 0', 'kurangkan: 1'],
    tingkat: 'sedang',
  },
  {
    id: 'int-sd7',
    pertanyaan: 'Antiturunan dari e pangkat 3x adalah',
    pilihan: [
      'e pangkat 3x, ditambah C',
      '3 e pangkat 3x, ditambah C',
      'e pangkat 3x, dibagi x, ditambah C',
      'e pangkat 4x, dibagi 4, ditambah C',
      'e pangkat 3x, dibagi 3, ditambah C',
    ],
    benar: 4,
    alasan: 'Ini Sifat 3.9b. Turunan e pangkat 3x adalah 3 kali dirinya sendiri, jadi untuk membalikkannya hasilnya dibagi 3. Pangkatnya TIDAK naik, sebab yang dipangkatkan bukan x.',
    tingkat: 'sedang',
  },
  {
    id: 'int-sd8',
    pertanyaan: 'Hitung integral x³ dari -1 sampai 1.',
    pilihan: ['0', '1/2', '2', '1/4', '-1/2'],
    benar: 0,
    alasan: 'Antiturunannya x⁴/4. Batas atas 1/4, batas bawah juga 1/4, jadi selisihnya nol. Pada gambar: bagian di sebelah kiri nol berada di bawah sumbu dan meniadakan bagian kanannya. Nol di sini bukan berarti daerahnya tidak ada.',
    langkah: ['antiturunan: x⁴/4', 'batas atas: 1/4', 'batas bawah: 1/4', 'kurangkan: 0'],
    tingkat: 'sedang',
  },

  /* ---------------------------- SULIT ---------------------------- */
  {
    id: 'int-sl1',
    pertanyaan: 'Hitung integral x² dibagi akar (x³ + 1), dari 0 sampai 2.',
    pilihan: ['8/3', '4/3', '2/3', '16/3', '4'],
    benar: 1,
    alasan: 'Substitusi u = x³ + 1 memberi du = 3x² dx, jadi soal dikali sepertiga. Batasnya ikut berganti: x = 0 memberi u = 1 dan x = 2 memberi u = 9.',
    langkah: ['u = x³ + 1, du = 3x² dx', 'soal punya x² dx, jadi dikali sepertiga', 'batas baru: 1 sampai 9', 'antiturunan u pangkat negatif setengah adalah 2 akar u', 'sepertiga dikali 2 dikali (3 dikurangi 1) sama dengan 4/3'],
    tingkat: 'sulit',
  },
  {
    id: 'int-sl2',
    pertanyaan: 'Hitung integral x³ - 4x dari -2 sampai 2.',
    pilihan: ['4', '16', '0', '8', '-8'],
    benar: 2,
    alasan: 'Antiturunannya x⁴/4 - 2x². Kedua batas memberi nilai yang sama, yaitu -4, jadi selisihnya nol. Di layar jelas ada dua daerah berwarna, tetapi satu di atas sumbu dan satu di bawah, dan keduanya sama besar.',
    langkah: ['antiturunan: x⁴/4 - 2x²', 'batas atas: 4 dikurangi 8 sama dengan -4', 'batas bawah: 4 dikurangi 8 sama dengan -4', 'kurangkan: 0'],
    tingkat: 'sulit',
  },
  {
    id: 'int-sl3',
    pertanyaan: 'Tentukan LUAS daerah antara kurva y = x² - 4x dan sumbu x, dari x = 0 sampai x = 6.',
    pilihan: ['32/3', '24', '16/3', '64/3', '0'],
    benar: 3,
    alasan: 'Kurvanya memotong sumbu di x = 4, jadi selangnya wajib dipecah. Bagian 0 sampai 4 memberi -32/3, bagian 4 sampai 6 memberi 32/3. Untuk LUAS keduanya dipositifkan dulu, baru dijumlahkan. Pilihan 0 adalah hasil integralnya, jawaban benar untuk pertanyaan yang berbeda.',
    langkah: ['cari titik potong: x = 0 dan x = 4', 'pecah di x = 4', 'bagian kiri: -32/3, dipositifkan jadi 32/3', 'bagian kanan: 32/3', 'jumlahkan: 64/3'],
    tingkat: 'sulit',
  },
  {
    id: 'int-sl4',
    pertanyaan: 'Antiturunan dari x cos x adalah',
    pilihan: [
      'x sin x - cos x + C',
      'x sin x + C',
      '(x²/2) sin x + C',
      '-x sin x + cos x + C',
      'x sin x + cos x + C',
    ],
    benar: 4,
    alasan: 'Aturan parsial dengan u = x dan dv = cos x dx. Hasilnya x sin x dikurangi antiturunan sin x, dan antiturunan sin x adalah minus cos x, sehingga dikurangi minus menjadi ditambah. Periksa dengan menurunkan: sin x ditambah x cos x dikurangi sin x, kembali ke x cos x.',
    langkah: ['u = x, du = dx', 'dv = cos x dx, v = sin x', 'x sin x dikurangi antiturunan sin x dx', 'antiturunan sin x adalah -cos x', 'jadi x sin x + cos x + C'],
    tingkat: 'sulit',
  },
  {
    id: 'int-sl5',
    pertanyaan: 'Hitung integral x² - 3x + 2 dari 0 sampai 3.',
    pilihan: ['3/2', '9/2', '0', '-3/2', '6'],
    benar: 0,
    alasan: 'Antiturunannya x³/3 - 3x²/2 + 2x. Batas atas memberi 9 - 13,5 + 6 sama dengan 1,5, batas bawah nol. Hasilnya positif walaupun sebagian kurvanya berada di bawah sumbu, sebab bagian yang di atas lebih besar.',
    langkah: ['antiturunan: x³/3 - 3x²/2 + 2x', 'batas atas: 9 - 13,5 + 6 sama dengan 1,5', 'batas bawah: 0', 'kurangkan: 3/2'],
    tingkat: 'sulit',
  },
  {
    id: 'int-sl6',
    pertanyaan: 'Hitung integral 1 dibagi akar x, dari 1 sampai 4.',
    pilihan: ['1/2', '2', '4', '1', '3'],
    benar: 1,
    alasan: 'Tulis 1 dibagi akar x sebagai x pangkat negatif setengah. Pangkat naik jadi setengah, dibagi setengah, hasilnya 2 akar x. Batas atas memberi 4, batas bawah 2, selisihnya 2.',
    langkah: ['tulis sebagai x pangkat negatif setengah', 'pangkat naik jadi setengah', 'dibagi setengah, jadi 2 akar x', 'batas atas 2 akar 4 sama dengan 4', 'batas bawah 2 akar 1 sama dengan 2', 'kurangkan: 2'],
    tingkat: 'sulit',
  },
  {
    id: 'int-sl7',
    pertanyaan: 'Untuk f(x) = x pada selang 0 sampai 7 dibagi 7 bagian, berapa jumlahan Riemann dengan titik sampel KANAN?',
    pilihan: ['49', '3,5', '28', '21', '24,5'],
    benar: 2,
    alasan: 'Lebar tiap bagian 1, dan tingginya 1, 2, 3, 4, 5, 6, 7. Jumlahnya 28. Pilihan 21 adalah jumlahan dengan titik sampel KIRI, dan 24,5 adalah luas sebenarnya yang terjepit di antara keduanya. Soal dari Contoh Soal 3.6, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 180.',
    langkah: ['lebar tiap bagian: 7 dibagi 7 sama dengan 1', 'tinggi titik sampel kanan: 1 sampai 7', 'jumlahkan: 1+2+3+4+5+6+7', 'dikali lebar 1: 28'],
    tingkat: 'sulit',
  },
  {
    id: 'int-sl8',
    pertanyaan: 'Tentukan luas daerah yang dibatasi kurva y = x² dan garis y = x + 2.',
    pilihan: ['3/2', '27/2', '4', '9/2', '9'],
    benar: 3,
    alasan: 'Titik potongnya dicari dari x² = x + 2, yang memberi x = -1 dan x = 2. Di antara keduanya garisnya berada di atas, jadi yang diintegralkan adalah (x + 2) dikurangi x².',
    langkah: ['samakan: x² = x + 2', 'faktorkan: (x + 1)(x - 2) = 0', 'batasnya -1 dan 2', 'periksa di x = 0: garis bernilai 2, parabola 0, jadi garis di atas', 'integralkan (x + 2 - x²) dari -1 sampai 2, hasilnya 9/2'],
    tingkat: 'sulit',
  },

  /* ------------------------- SANGAT SULIT ------------------------- */
  {
    id: 'int-ss1',
    pertanyaan: 'Tentukan LUAS daerah antara kurva y = x³ - 2x² - 5x + 6 dan sumbu x, dari x = -2 sampai x = 3.',
    pilihan: ['125/12', '63/4', '16/3', '189/12', '253/12'],
    benar: 4,
    alasan: 'Kurvanya memotong sumbu di -2, 1, dan 3. Yang berada di dalam selang hanya x = 1, jadi di situlah dipecah. Bagian kiri memberi 63/4, bagian kanan -16/3. Untuk luas keduanya dipositifkan: 63/4 ditambah 16/3 sama dengan 253/12. Pilihan 125/12 adalah hasil integralnya. Soal dari Ayo Mencoba 3.11 nomor 2, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 205.',
    langkah: ['samakan dengan nol: akarnya -2, 1, dan 3', 'yang di dalam selang: x = 1', 'bagian -2 sampai 1: 63/4', 'bagian 1 sampai 3: -16/3', 'positifkan lalu jumlahkan: 63/4 + 16/3 = 253/12'],
    tingkat: 'sangat sulit',
  },
  {
    id: 'int-ss2',
    pertanyaan: 'Untuk kurva yang sama, y = x³ - 2x² - 5x + 6, berapa HASIL INTEGRALNYA dari -2 sampai 3?',
    pilihan: ['125/12', '253/12', '0', '63/4', '-16/3'],
    benar: 0,
    alasan: 'Kali ini bagiannya tidak dipositifkan, melainkan dijumlahkan apa adanya: 63/4 ditambah negatif 16/3, yaitu 125/12. Bandingkan dengan soal sebelumnya: gambarnya sama persis, pertanyaannya berbeda, jawabannya hampir dua kali lipat berbeda. Soal dari Ayo Mencoba 3.11 nomor 2, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 205.',
    langkah: ['bagian -2 sampai 1: 63/4', 'bagian 1 sampai 3: -16/3', 'jumlahkan apa adanya: 63/4 - 16/3', 'samakan penyebut: 189/12 - 64/12 = 125/12'],
    tingkat: 'sangat sulit',
  },
  {
    id: 'int-ss3',
    pertanyaan: 'Tentukan luas daerah yang dibatasi kurva y = x³ dan garis y = x.',
    pilihan: ['3/4', '1/2', '0', '1/4', '1'],
    benar: 1,
    alasan: 'Titik potongnya -1, 0, dan 1, jadi ada DUA daerah. Di antara -1 dan 0 yang di atas adalah x³, sedangkan di antara 0 dan 1 yang di atas adalah x. Urutan pengurangannya bertukar. Masing-masing memberi 1/4, jumlahnya 1/2. Kalau urutannya dipakai satu macam saja, keduanya saling meniadakan dan hasilnya 0.',
    langkah: ['samakan: x³ = x, akarnya -1, 0, 1', 'bagian -1 sampai 0: x³ di atas, hasilnya 1/4', 'bagian 0 sampai 1: x di atas, hasilnya 1/4', 'jumlahkan: 1/2'],
    tingkat: 'sangat sulit',
  },
  {
    id: 'int-ss4',
    pertanyaan: 'Tentukan luas daerah di kuadran pertama yang dibatasi kurva y = x akar (x² + 5), sumbu x, dan garis x = 2.',
    pilihan: [
      '(9 - 5 akar 5) dibagi 3',
      '2 akar 5',
      '(27 - 5 akar 5) dibagi 3',
      '(27 + 5 akar 5) dibagi 3',
      '27 dibagi 3',
    ],
    benar: 2,
    alasan: 'Pada selang 0 sampai 2 kurvanya selalu di atas sumbu, jadi luas sama dengan hasil integralnya dan tidak perlu dipecah. Substitusi u = x² + 5 memberi antiturunan sepertiga kali u pangkat tiga per dua. Soal dari Contoh Soal 3.13, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 204.',
    langkah: ['periksa dulu: kurvanya di atas sumbu pada 0 sampai 2', 'u = x² + 5, du = 2x dx, jadi dikali setengah', 'antiturunan: sepertiga kali u pangkat tiga per dua', 'batas atas u = 9 memberi 27, batas bawah u = 5 memberi 5 akar 5', 'hasilnya (27 - 5 akar 5) dibagi 3'],
    tingkat: 'sangat sulit',
  },
  {
    id: 'int-ss5',
    pertanyaan: 'Antiturunan dari x² sin x adalah',
    pilihan: [
      'x² cos x - 2x sin x - 2 cos x + C',
      '-x² cos x + 2x sin x - 2 cos x + C',
      '(x³/3) sin x + C',
      '-x² cos x + 2x sin x + 2 cos x + C',
      '-x² cos x + C',
    ],
    benar: 3,
    alasan: 'Parsial dikerjakan DUA kali. Putaran pertama dengan u = x² menyisakan antiturunan 2x cos x, yang masih perlu parsial lagi. Periksa dengan menurunkan jawabannya, dan semua suku kecuali x² sin x saling menghapus. Soal dari Contoh Soal 3.5, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 175.',
    langkah: ['putaran 1: u = x², dv = sin x dx, v = -cos x', 'hasil sementara: -x² cos x ditambah antiturunan 2x cos x', 'putaran 2: u = 2x, dv = cos x dx, v = sin x', 'hasil putaran 2: 2x sin x ditambah 2 cos x', 'gabungkan semuanya'],
    tingkat: 'sangat sulit',
  },
  {
    id: 'int-ss6',
    pertanyaan: 'Sebuah ponsel terjual dengan laju 3.000 akar x ditambah 1.000 unit per tahun pada tahun ke-x. Berapa total penjualan selama 4 tahun pertama?',
    pilihan: ['28.000 unit', '13.000 unit', '7.000 unit', '16.000 unit', '20.000 unit'],
    benar: 4,
    alasan: 'Yang diketahui lajunya, yang dicari jumlahnya, jadi hitung luas di bawah grafik laju dari 0 sampai 4. Pilihan 28.000 muncul kalau akar x-nya terlewat dan lajunya dibaca 3.000x. Soal dari Contoh Soal 3.14, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 207.',
    langkah: ['antiturunan: 2.000 x pangkat tiga per dua, ditambah 1.000x', 'batas atas: 2.000 dikali 8 ditambah 4.000', 'batas bawah: 0', 'hasilnya 20.000'],
    tingkat: 'sangat sulit',
  },
  {
    id: 'int-ss7',
    pertanyaan: 'Sebuah gaya sebesar x² + 2x newton bekerja pada benda di jarak x meter. Berapa usaha untuk memindahkannya dari x = 1 ke x = 3?',
    pilihan: ['50/3 joule', '18 joule', '4/3 joule', '22/3 joule', '54 joule'],
    benar: 0,
    alasan: 'Rumus gaya dikali jarak hanya berlaku kalau gayanya tetap. Karena gayanya berubah, jalannya dipotong-potong lalu dijumlahkan, dan itu integral. Soal dari Contoh Soal 3.15, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 209.',
    langkah: ['antiturunan: x³/3 ditambah x²', 'batas atas: 9 ditambah 9 sama dengan 18', 'batas bawah: sepertiga ditambah 1 sama dengan 4/3', 'kurangkan: 18 dikurangi 4/3 sama dengan 50/3'],
    tingkat: 'sangat sulit',
  },
  {
    id: 'int-ss8',
    pertanyaan: 'Peralatan seharga 36.000 menghemat biaya dengan laju 4.000x + 1.000 per tahun pada tahun ke-x. Setelah berapa tahun penghematannya menutup harga beli?',
    pilihan: ['9 tahun', '4 tahun', '3 tahun', '5 tahun', '6 tahun'],
    benar: 1,
    alasan: 'Bentuk pertanyaannya terbalik dari biasanya: yang dicari bukan hasilnya, melainkan batas atasnya. Totalnya ditulis dulu sebagai fungsi dari t, baru disamakan dengan 36.000. Persamaannya punya dua akar, dan yang negatif dibuang sebab waktu tidak berjalan mundur. Soal dari Ayo Mencoba 3.12, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 208.',
    langkah: ['antiturunan: 2.000x² ditambah 1.000x', 'total sampai t: 2.000t² ditambah 1.000t', 'samakan dengan 36.000, lalu bagi 1.000', '2t² + t - 36 = 0', 'akar yang masuk akal: t = 4'],
    tingkat: 'sangat sulit',
  },
]
