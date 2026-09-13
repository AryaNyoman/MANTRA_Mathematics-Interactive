/**
 * Bank soal latihan Integral: 60 soal, 15 tiap tingkat (14 Sep 2026).
 *
 * SEJARAH: bank pertama 32 soal (8 per tingkat, id int-md/sd/sl/ss 1..8),
 * dikalibrasi ke Matematika Tingkat Lanjut Kelas XII (Edisi Revisi 2025)
 * Bab 3. Sembilan soal memakai fungsi dan angka persis dari buku dan
 * menyebutkan sumbernya di `alasan`: int-md1, int-sl7, int-ss1, int-ss2,
 * int-ss4, int-ss5, int-ss6, int-ss7, int-ss8. 13 Sep ARYA meminta 15 soal
 * per tingkat, syarat naik 10 benar, pembahasan bernomor bergambar, dan
 * penjelasan pengecoh. Id lama DIPERTAHANKAN; soal baru nomor 9 sampai 15
 * di tiap tingkat, semuanya tulisan sendiri.
 *
 * EMPAT TINGKAT:
 *   mudah        satu aturan dipakai sekali, tanpa batas (atau arti C)
 *   sedang       integral tentu sederhana, satu kali substitusi, Riemann
 *   sulit        substitusi dengan batas, luas bertanda, parsial satu tingkat,
 *                jarak dari kecepatan
 *   sangat sulit dipecah di titik potong, dua kurva, batas yang dicari,
 *                penerapan; 5 bergaya olimpiade (dua parabola, batas atas
 *                sebagai bilangan yang dicari, e pangkat x kuadrat, sin cos,
 *                jarak tempuh dengan kecepatan berganti tanda) dan 10
 *                sulit-biasa
 *
 * Tiap jawaban berangka punya `// cek:` yang menghitung integralnya secara
 * numerik (jumlahan titik tengah 2000 bagian) supaya klaimnya bukan
 * keyakinan. Antiturunan berbentuk rumus dicek lewat turunannya.
 */

import type { SoalKuis } from '@/content/tipe'

export const KUIS: SoalKuis[] = [
  /* ---------------------------- MUDAH ---------------------------- */
  {
    id: 'int-md1',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari x⁵ adalah ...',
    pilihan: ['x⁶/6 + C', '5x⁴ + C', 'x⁶ + C', 'x⁴/4 + C', '6x⁶ + C'],
    benar: 0,
    langkah: [
      'Aturan pangkat dibalik: pangkat NAIK satu (5 jadi 6), lalu dibagi pangkat baru itu.',
      'x⁶ : 6 + C. Periksa dengan menurunkan: 6x⁵ : 6 = x⁵.',
    ],
    jebakan: '5x⁴ adalah TURUNANNYA, arah yang terbalik. x⁶ lupa membagi 6 (turunannya 6x⁵, enam kali terlalu besar). Soal dari Contoh Soal 3.2, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 170.',
    alasan: 'Pangkat naik, dibagi pangkat baru. Soal dari Contoh Soal 3.2, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 170.',
  },
  {
    id: 'int-md2',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari 3x² adalah ...',
    pilihan: ['9x³ + C', 'x³ + C', '6x + C', '3x³ + C', 'x³/3 + C'],
    benar: 1,
    langkah: [
      'Keluarkan angka 3 (Sifat 3.12). Antiturunan x² adalah x³ : 3.',
      '3 × x³ : 3 = x³. Ditambah C.',
    ],
    jebakan: '6x adalah turunannya. 3x³ lupa membagi 3; turunannya 9x², tiga kali soalnya.',
    alasan: '3 · x³/3 = x³.',
  },
  {
    id: 'int-md3',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari 2x + 1 adalah ...',
    pilihan: ['2x² + x + C', 'x² + x', 'x² + x + C', '2 + C', 'x² + 1 + C'],
    benar: 2,
    langkah: [
      'Suku demi suku: 2x menjadi x² (2 · x² : 2), dan 1 menjadi x.',
      'x² + x + C.',
    ],
    jebakan: '"x² + x" tanpa C bukan jawaban lengkap: antiturunan tidak pernah tunggal (materi 01). 2x² lupa membagi pangkat baru.',
    alasan: 'x² + x + C.',
  },
  {
    id: 'int-md4',
    tingkat: 'mudah',
    pertanyaan: 'Hasil dari integral dx (tanpa fungsi lain) adalah ...',
    pilihan: ['1 + C', 'x²/2 + C', '0', 'x + C', 'C'],
    benar: 3,
    langkah: [
      'Integral dx sama dengan integral 1 dx: fungsi yang turunannya 1.',
      'Itu x. Jawabannya x + C (Sifat 3.1).',
    ],
    jebakan: '"C" saja mengira tidak ada fungsi yang diintegralkan; sebenarnya yang diintegralkan adalah 1. x²/2 mengira yang diintegralkan x.',
    alasan: 'Turunan x adalah 1.',
  },
  {
    id: 'int-md5',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari sin x adalah ...',
    pilihan: ['cos x + C', '-sin x + C', 'sin x + C', 'tan x + C', '-cos x + C'],
    benar: 4,
    langkah: [
      'Cari fungsi yang turunannya sin x. Turunan cos x adalah -sin x (salah tanda).',
      'Pasang minus: turunan (-cos x) = sin x. Jadi -cos x + C.',
    ],
    jebakan: 'cos x + C lupa tanda minus, kekeliruan paling sering: turunan cos x adalah MINUS sin x, jadi minusnya harus ditebus.',
    alasan: '-cos x + C.',
  },
  {
    id: 'int-md6',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari cos x adalah ...',
    pilihan: ['sin x + C', '-sin x + C', '-cos x + C', 'sec² x + C', 'cos x + C'],
    benar: 0,
    langkah: [
      'Turunan sin x adalah cos x, bersih tanpa tanda.',
      'Jadi antiturunan cos x adalah sin x + C.',
    ],
    jebakan: '-sin x + C membawa tanda minus dari aturan turunan KOSINUS; di sini yang dicari kebalikan turunan sinus, yang tidak berminus.',
    alasan: 'sin x + C.',
  },
  {
    id: 'int-md7',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari eˣ adalah ...',
    pilihan: ['ln x + C', 'eˣ + C', 'x eˣ + C', 'eˣ/x + C', 'e^(x+1)/(x+1) + C'],
    benar: 1,
    langkah: [
      'eˣ adalah fungsi yang turunannya dirinya sendiri.',
      'Maka antiturunannya juga dirinya sendiri: eˣ + C.',
    ],
    jebakan: 'e^(x+1)/(x+1) memakai aturan pangkat, padahal yang berpangkat bukan x. ln x adalah antiturunan 1/x, bukan eˣ.',
    alasan: 'eˣ + C.',
  },
  {
    id: 'int-md8',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari √x adalah ...',
    pilihan: ['x²/2 + C', '(1/2) √x + C', '(2/3) x √x + C', '(3/2) x √x + C', '√x + C'],
    benar: 2,
    langkah: [
      'Tulis √x = x^(1/2). Pangkat naik jadi 3/2, dibagi 3/2 (sama dengan dikali 2/3).',
      '(2/3) x^(3/2) = (2/3) x √x + C.',
    ],
    jebakan: '(3/2) x √x mengalikan pangkat baru alih-alih membagi. (1/2) √x adalah turunan yang keliru pula.',
    alasan: '(2/3) x^(3/2).',
  },
  {
    // cek: Math.abs((1.0001**4 - 0.9999**4) / 2e-4 - 4) < 1e-6
    id: 'int-md9',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari 4x³ adalah ...',
    pilihan: ['x⁴ + C', '12x² + C', '4x⁴ + C', 'x⁴/4 + C', 'x³ + C'],
    benar: 0,
    langkah: [
      'Pangkat naik jadi 4, dibagi 4: 4 · x⁴ : 4 = x⁴.',
      'Periksa: turunan x⁴ adalah 4x³. Jadi x⁴ + C.',
    ],
    jebakan: '12x² adalah turunannya. x⁴/4 lupa bahwa pengali 4 sudah ada di soal dan tercoret dengan pembaginya.',
    alasan: 'x⁴ + C.',
  },
  {
    // cek: Math.abs((6*1.0001 - 6*0.9999) / 2e-4 - 6) < 1e-9
    id: 'int-md10',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari 6 adalah ...',
    pilihan: ['6x + C', '0', '6 + C', '3x² + C', 'x + 6 + C'],
    benar: 0,
    langkah: [
      'Cari fungsi yang turunannya 6: garis dengan kemiringan 6.',
      'Itu 6x. Jawabannya 6x + C.',
    ],
    jebakan: '0 adalah TURUNAN dari 6, arah terbalik. 3x² adalah antiturunan dari 6x, bukan dari 6.',
    alasan: 'Turunan 6x = 6.',
  },
  {
    // cek: Math.abs(((1.0001**3/3 + 1.0001**2/2) - (0.9999**3/3 + 0.9999**2/2)) / 2e-4 - 2) < 1e-6
    id: 'int-md11',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari x² + x adalah ...',
    pilihan: ['x³/3 + x²/2 + C', '2x + 1 + C', 'x³ + x² + C', 'x³/3 + x + C', '(x² + x)²/2 + C'],
    benar: 0,
    langkah: [
      'Suku demi suku: x² menjadi x³ : 3, x menjadi x² : 2.',
      'x³/3 + x²/2 + C.',
    ],
    jebakan: '2x + 1 adalah turunannya. (x² + x)²/2 memperlakukan x² + x seolah satu huruf; aturan pangkat hanya untuk x sendirian.',
    alasan: 'x³/3 + x²/2 + C.',
  },
  {
    // cek: Math.abs(((-1/2.0001) - (-1/1.9999)) / 2e-4 - 1/4) < 1e-6
    id: 'int-md12',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari 1/x² adalah ...',
    pilihan: ['-1/x + C', '1/x + C', '-2/x³ + C', '-1/x', 'ln x² + C'],
    benar: 0,
    langkah: [
      'Tulis 1/x² = x⁻². Pangkat naik jadi -1, dibagi -1: x⁻¹ : (-1) = -1/x.',
      'Periksa: turunan -1/x adalah 1/x². Jadi -1/x + C.',
    ],
    jebakan: '1/x lupa tanda minus dari pembagi -1. -2/x³ adalah turunannya. Pilihan "-1/x" benar bentuknya tetapi tanpa C, tidak lengkap.',
    alasan: '-1/x + C.',
  },
  {
    // cek: 3*3 - 0 === 9
    id: 'int-md13',
    tingkat: 'mudah',
    pertanyaan: 'Hitung integral 2x dari 0 sampai 3.',
    gambar: { jenis: 'luas', fungsi: '2*x', dari: 0, sampai: 3, jangkauan: [0, 4, 0, 7] },
    pilihan: ['9', '6', '3', '18', '4,5'],
    benar: 0,
    langkah: [
      'Antiturunan 2x adalah x². Batas atas 3² = 9, batas bawah 0.',
      'Hasilnya 9. Periksa dengan gambar: daerahnya segitiga beralas 3 dan tinggi 6, luas setengah × 3 × 6 = 9.',
    ],
    jebakan: '6 adalah tinggi segitiga (nilai 2x di x = 3). 18 adalah alas kali tinggi tanpa dibagi dua.',
    alasan: 'x² dari 0 ke 3: 9.',
  },
  {
    // cek: Math.abs((3*Math.sin(1.0001) - 3*Math.sin(0.9999)) / 2e-4 - 3*Math.cos(1)) < 1e-6
    id: 'int-md14',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari 3 cos x adalah ...',
    pilihan: ['3 sin x + C', '-3 sin x + C', '3 cos x + C', 'sin 3x + C', '(3/2) sin x + C'],
    benar: 0,
    langkah: [
      'Keluarkan 3. Antiturunan cos x adalah sin x.',
      '3 sin x + C.',
    ],
    jebakan: '-3 sin x salah tanda (tanda minus milik antiturunan SINUS). sin 3x mencampur pengali dengan sudut.',
    alasan: '3 sin x + C.',
  },
  {
    // cek: 0*0 + 1 === 1 && Math.abs((2.0001**2 - 1.9999**2) / 2e-4 - 4) < 1e-6
    id: 'int-md15',
    tingkat: 'mudah',
    pertanyaan: 'Diketahui F′(x) = 2x dan F(0) = 1. Maka F(x) = ...',
    gambar: { jenis: 'grafik', fungsi: ['x*x + 1', 'x*x'], jangkauan: [-2, 2, -0.5, 5], nama: ['x² + 1', 'x² (C = 0)'], titik: [{ x: 0, y: 1, label: '(0, 1)' }] },
    pilihan: ['x² + 1', 'x²', 'x² + C', '2x + 1', 'x² - 1'],
    benar: 0,
    langkah: [
      'Antiturunan 2x adalah x² + C: satu keluarga kurva yang bergeser tegak.',
      'Syarat F(0) = 1 memilih satu anggota: 0 + C = 1, jadi C = 1.',
      'F(x) = x² + 1.',
    ],
    jebakan: '"x² + C" belum selesai: syarat F(0) = 1 diberikan justru untuk menentukan C. x² memberi F(0) = 0, tidak cocok.',
    alasan: 'C = 1.',
  },

  /* ---------------------------- SEDANG ---------------------------- */
  {
    // cek: Math.abs(8/3 - (Array.from({length:2000},(_,i)=>((i+0.5)/1000)**2).reduce((a,b)=>a+b,0)/1000)) < 1e-4
    id: 'int-sd1',
    tingkat: 'sedang',
    pertanyaan: 'Hitung integral x² dari 0 sampai 2.',
    gambar: { jenis: 'luas', fungsi: 'x*x', dari: 0, sampai: 2, jangkauan: [0, 3, 0, 5] },
    pilihan: ['8', '2/3', '4/3', '8/3', '4'],
    benar: 3,
    langkah: [
      'Antiturunan x² adalah x³ : 3.',
      'Batas atas: 8/3. Batas bawah: 0. Kurangkan: 8/3.',
    ],
    jebakan: '8 lupa membagi 3 (memakai x³). 4 adalah tinggi kurva di x = 2, bukan luasnya.',
    alasan: '8/3.',
  },
  {
    // cek: 9/2 - 1/2 === 4
    id: 'int-sd2',
    tingkat: 'sedang',
    pertanyaan: 'Hitung integral x dari 1 sampai 3.',
    gambar: { jenis: 'luas', fungsi: 'x', dari: 1, sampai: 3, jangkauan: [0, 4, 0, 4] },
    pilihan: ['2', '9/2', '8', '3', '4'],
    benar: 4,
    langkah: [
      'Antiturunan x adalah x² : 2. Batas atas 9/2, batas bawah 1/2.',
      'Selisihnya 4. Periksa gambar: trapesium dengan sisi sejajar 1 dan 3, tinggi 2: (1 + 3) : 2 × 2 = 4.',
    ],
    jebakan: '9/2 lupa mengurangkan batas bawah. 2 hanya lebar selangnya.',
    alasan: '9/2 - 1/2 = 4.',
  },
  {
    // cek: 1**4 - 0 === 1
    id: 'int-sd3',
    tingkat: 'sedang',
    pertanyaan: 'Hitung integral 4x³ dari 0 sampai 1.',
    pilihan: ['1', '4', '1/4', '12', '3'],
    benar: 0,
    langkah: [
      'Antiturunan 4x³ adalah x⁴ (4 · x⁴ : 4).',
      'Batas atas 1, batas bawah 0: hasilnya 1.',
    ],
    jebakan: '4 lupa pembagi 4 dari pangkat baru. 12 memakai turunan (12x²) di x = 1.',
    alasan: 'x⁴ dari 0 ke 1: 1.',
  },
  {
    // cek: Math.abs(((2*1.0001 + 1)**6/12 - (2*0.9999 + 1)**6/12) / 2e-4 - 3**5) < 1e-3
    id: 'int-sd4',
    tingkat: 'sedang',
    pertanyaan: 'Antiturunan dari (2x + 1)⁵ adalah ...',
    pilihan: ['(2x + 1)⁶ + C', '(2x + 1)⁶/12 + C', '(2x + 1)⁶/6 + C', '(2x + 1)⁶/2 + C', '5(2x + 1)⁴ + C'],
    benar: 1,
    langkah: [
      'u = 2x + 1, du = 2 dx. Soal hanya punya dx, jadi dikali setengah.',
      'Antiturunan u⁵ = u⁶ : 6. Setengah × u⁶ : 6 = u⁶ : 12.',
      'Kembalikan: (2x + 1)⁶ : 12 + C.',
    ],
    jebakan: '(2x + 1)⁶/6 lupa menambal faktor 2; turunkan pilihan itu dan hasilnya dua kali soalnya. 5(2x + 1)⁴ arah turunan.',
    alasan: 'Pembaginya 12.',
  },
  {
    // cek: Math.abs(((1.0001**2 + 1)**4/4 - (0.9999**2 + 1)**4/4) / 2e-4 - 2*8) < 1e-3
    id: 'int-sd5',
    tingkat: 'sedang',
    pertanyaan: 'Antiturunan dari 2x(x² + 1)³ adalah ...',
    pilihan: ['2x(x² + 1)⁴/4 + C', '3(x² + 1)² + C', '(x² + 1)⁴/4 + C', '(x² + 1)⁴/8 + C', '(x² + 1)⁴ + C'],
    benar: 2,
    langkah: [
      'u = x² + 1, du = 2x dx, dan 2x dx sudah ada di soal: tidak perlu ditambal.',
      'Antiturunan u³ = u⁴ : 4. Kembalikan: (x² + 1)⁴ : 4 + C.',
    ],
    jebakan: '2x(x² + 1)⁴/4 membiarkan 2x ikut, padahal 2x sudah "terpakai" menjadi du. (x² + 1)⁴/8 menambal setengah yang tidak perlu.',
    alasan: 'u⁴/4 tanpa tambalan.',
  },
  {
    // cek: Math.abs(Math.sin(Math.PI/2) - Math.sin(0) - 1) < 1e-9
    id: 'int-sd6',
    tingkat: 'sedang',
    pertanyaan: 'Hitung integral cos x dari 0 sampai π/2.',
    gambar: { jenis: 'luas', fungsi: 'Math.cos(x)', dari: 0, sampai: 1.5708, jangkauan: [0, 2, 0, 1.3] },
    pilihan: ['-1', 'π/2', '2', '1', '0'],
    benar: 3,
    langkah: [
      'Antiturunan cos x = sin x.',
      'sin(π/2) - sin 0 = 1 - 0 = 1.',
    ],
    jebakan: '-1 memakai -sin x (tanda dari aturan turunan kosinus, salah arah). π/2 hanya lebar selangnya.',
    alasan: '1.',
  },
  {
    // cek: Math.abs((Math.exp(3*1.0001)/3 - Math.exp(3*0.9999)/3) / 2e-4 - Math.exp(3)) < 1e-2
    id: 'int-sd7',
    tingkat: 'sedang',
    pertanyaan: 'Antiturunan dari e^(3x) adalah ...',
    pilihan: ['e^(3x) + C', '3e^(3x) + C', 'e^(3x)/x + C', 'e^(4x)/4 + C', 'e^(3x)/3 + C'],
    benar: 4,
    langkah: [
      'Turunan e^(3x) adalah 3e^(3x) (rantai). Untuk membalikkannya, bagi 3.',
      'e^(3x) : 3 + C (Sifat 3.9b). Pangkatnya TIDAK naik, sebab yang dipangkatkan bukan x.',
    ],
    jebakan: '3e^(3x) adalah turunannya. e^(4x)/4 memakai aturan pangkat pada eksponen, keliru.',
    alasan: 'Dibagi 3.',
  },
  {
    // cek: 1/4 - 1/4 === 0
    id: 'int-sd8',
    tingkat: 'sedang',
    pertanyaan: 'Hitung integral x³ dari -1 sampai 1.',
    gambar: { jenis: 'luas', fungsi: 'x*x*x', dari: -1, sampai: 1, jangkauan: [-1.5, 1.5, -1.5, 1.5] },
    pilihan: ['0', '1/2', '2', '1/4', '-1/2'],
    benar: 0,
    langkah: [
      'Antiturunan x⁴ : 4. Batas atas 1/4, batas bawah juga 1/4.',
      'Selisihnya 0. Pada gambar: bagian kiri di bawah sumbu meniadakan bagian kanan.',
      'Nol bukan berarti daerahnya tidak ada; LUASNYA 1/2, tetapi hasil integralnya 0.',
    ],
    jebakan: '1/2 adalah LUAS daerahnya (kedua bagian dipositifkan), jawaban untuk pertanyaan berbeda. 1/4 lupa mengurangkan batas bawah.',
    alasan: 'Simetris: 0.',
  },
  {
    // cek: (8 + 4) - 0 === 12
    id: 'int-sd9',
    tingkat: 'sedang',
    pertanyaan: 'Hitung integral (3x² + 2) dari 0 sampai 2.',
    gambar: { jenis: 'luas', fungsi: '3*x*x + 2', dari: 0, sampai: 2, jangkauan: [0, 3, 0, 16] },
    pilihan: ['12', '8', '14', '16', '4'],
    benar: 0,
    langkah: [
      'Antiturunan: x³ + 2x.',
      'Batas atas: 8 + 4 = 12. Batas bawah: 0. Hasilnya 12.',
    ],
    jebakan: '8 lupa suku 2x (antiturunan tetapan 2 adalah 2x, bukan 0). 14 adalah nilai 3x² + 2 di x = 2, tingginya, bukan luasnya.',
    alasan: 'x³ + 2x di 2: 12.',
  },
  {
    // cek: Math.abs(-Math.cos(Math.PI) + Math.cos(0) - 2) < 1e-9
    id: 'int-sd10',
    tingkat: 'sedang',
    pertanyaan: 'Hitung integral sin x dari 0 sampai π.',
    gambar: { jenis: 'luas', fungsi: 'Math.sin(x)', dari: 0, sampai: 3.1416, jangkauan: [0, 3.5, 0, 1.3] },
    pilihan: ['2', '0', '1', 'π', '-2'],
    benar: 0,
    langkah: [
      'Antiturunan sin x = -cos x.',
      '-cos π - (-cos 0) = -(-1) + 1 = 2.',
    ],
    jebakan: '0 keliru menghitung cos π sebagai 1 (cos π = -1). -2 memakai cos x sebagai antiturunan (salah tanda). Daerah satu bukit sinus luasnya 2.',
    alasan: '1 + 1 = 2.',
  },
  {
    // cek: Math.abs(((3*1.0001 - 2)**5/15 - (3*0.9999 - 2)**5/15) / 2e-4 - 1) < 1e-3
    id: 'int-sd11',
    tingkat: 'sedang',
    pertanyaan: 'Antiturunan dari (3x - 2)⁴ adalah ...',
    pilihan: ['(3x - 2)⁵/15 + C', '(3x - 2)⁵/5 + C', '3(3x - 2)⁵/5 + C', '(3x - 2)⁵ + C', '4(3x - 2)³ + C'],
    benar: 0,
    langkah: [
      'u = 3x - 2, du = 3 dx; soal punya dx saja, jadi dikali 1/3.',
      'Antiturunan u⁴ = u⁵ : 5. (1/3) × u⁵ : 5 = u⁵ : 15.',
      '(3x - 2)⁵ : 15 + C.',
    ],
    jebakan: '(3x - 2)⁵/5 lupa menambal faktor 3 (turunannya tiga kali soal). 3(3x - 2)⁵/5 mengalikan 3, padahal harus membagi.',
    alasan: 'Pembaginya 5 × 3 = 15.',
  },
  {
    // cek: 5 - 2 === 3
    id: 'int-sd12',
    tingkat: 'sedang',
    pertanyaan: 'Hitung integral 1 dari 2 sampai 5.',
    gambar: { jenis: 'luas', fungsi: '1', dari: 2, sampai: 5, jangkauan: [0, 6, 0, 2] },
    pilihan: ['3', '1', '5', '7', '0'],
    benar: 0,
    langkah: [
      'Antiturunan 1 adalah x. Batas atas 5, batas bawah 2: 5 - 2 = 3.',
      'Gambar: persegi panjang lebar 3, tinggi 1. Luasnya 3.',
    ],
    jebakan: '1 mengira integral tetapan adalah tetapannya. 7 menjumlahkan batasnya.',
    alasan: 'Lebar 3, tinggi 1.',
  },
  {
    // cek: Math.abs(((-Math.exp(-2*1.0001)/2) - (-Math.exp(-2*0.9999)/2)) / 2e-4 - Math.exp(-2)) < 1e-6
    id: 'int-sd13',
    tingkat: 'sedang',
    pertanyaan: 'Antiturunan dari e^(-2x) adalah ...',
    pilihan: ['-e^(-2x)/2 + C', 'e^(-2x)/2 + C', '-2e^(-2x) + C', 'e^(-2x) + C', 'e^(-x²) + C'],
    benar: 0,
    langkah: [
      'Turunan e^(-2x) adalah -2e^(-2x). Untuk membalikkannya, bagi -2.',
      'e^(-2x) : (-2) = -e^(-2x) : 2 + C.',
    ],
    jebakan: 'e^(-2x)/2 lupa tanda minus dari pembagi -2. -2e^(-2x) adalah turunannya.',
    alasan: 'Dibagi -2.',
  },
  {
    // cek: (1/2 - 1) - 0 === -0.5
    id: 'int-sd14',
    tingkat: 'sedang',
    pertanyaan: 'Hitung integral (x - 1) dari 0 sampai 1.',
    gambar: { jenis: 'luas', fungsi: 'x - 1', dari: 0, sampai: 1, jangkauan: [-0.5, 2, -1.5, 1] },
    pilihan: ['-1/2', '1/2', '0', '-1', '1'],
    benar: 0,
    langkah: [
      'Antiturunan x² : 2 - x. Batas atas 1/2 - 1 = -1/2, batas bawah 0.',
      'Hasilnya -1/2: negatif karena seluruh daerahnya di bawah sumbu-x (materi 09).',
    ],
    jebakan: '1/2 adalah LUAS daerahnya; hasil integral daerah di bawah sumbu bertanda negatif. Bedakan "hitung integral" dengan "tentukan luas".',
    alasan: 'Di bawah sumbu: -1/2.',
  },
  {
    // cek: 1 * (0*0 + 1*1) === 1
    id: 'int-sd15',
    tingkat: 'sedang',
    pertanyaan: 'Untuk f(x) = x² pada selang 0 sampai 2 yang dibagi 2 bagian sama lebar, berapa jumlahan Riemann dengan titik sampel KIRI?',
    gambar: { jenis: 'luas', fungsi: 'x*x', dari: 0, sampai: 2, persegi: 2, jangkauan: [0, 3, 0, 5] },
    pilihan: ['1', '5', '8/3', '2', '4'],
    benar: 0,
    langkah: [
      'Lebar tiap bagian 1. Titik sampel kiri: x = 0 dan x = 1, tingginya 0 dan 1.',
      'Jumlahan: 1 × (0 + 1) = 1. Persegi panjang pertama tingginya nol (tidak terlihat di gambar).',
    ],
    jebakan: '5 memakai titik sampel KANAN (1 + 4). 8/3 adalah luas sebenarnya, terjepit di antara 1 dan 5.',
    alasan: 'Kiri: 0 + 1 = 1.',
  },

  /* ---------------------------- SULIT ---------------------------- */
  {
    // cek: Math.abs((2*Math.sqrt(9) - 2*Math.sqrt(1))/3 - 4/3) < 1e-9
    id: 'int-sl1',
    tingkat: 'sulit',
    pertanyaan: 'Hitung integral x² dibagi √(x³ + 1), dari 0 sampai 2.',
    pilihan: ['8/3', '4/3', '2/3', '16/3', '4'],
    benar: 1,
    langkah: [
      'u = x³ + 1, du = 3x² dx; soal punya x² dx, jadi dikali 1/3.',
      'Batas ikut berganti: x = 0 memberi u = 1, x = 2 memberi u = 9.',
      'Antiturunan u^(-1/2) = 2√u. (1/3) × 2 × (√9 - √1) = (1/3) × 2 × 2 = 4/3.',
    ],
    jebakan: '4 lupa dikali 1/3. 8/3 lupa mengurangkan batas bawah (√1 = 1). Batas lama (0 dan 2) TIDAK boleh dimasukkan ke rumus dalam u.',
    alasan: '(1/3)(2)(3 - 1) = 4/3.',
  },
  {
    // cek: (16/4 - 8) - (16/4 - 8) === 0
    id: 'int-sl2',
    tingkat: 'sulit',
    pertanyaan: 'Hitung integral x³ - 4x dari -2 sampai 2.',
    gambar: { jenis: 'luas', fungsi: 'x*x*x - 4*x', dari: -2, sampai: 2, jangkauan: [-2.5, 2.5, -4, 4] },
    pilihan: ['4', '16', '0', '8', '-8'],
    benar: 2,
    langkah: [
      'Antiturunan x⁴ : 4 - 2x². Di x = 2: 4 - 8 = -4. Di x = -2: 4 - 8 = -4.',
      'Selisihnya 0: dua daerah sama besar, satu di atas dan satu di bawah sumbu.',
    ],
    jebakan: '8 adalah LUAS keduanya (4 + 4), bukan hasil integralnya. -8 dan 4 salah mengurangkan.',
    alasan: '-4 - (-4) = 0.',
  },
  {
    // cek: Math.abs((64/3 - 32) + 32/3) < 1e-9 && Math.abs(32/3 + 32/3 - 64/3) < 1e-9
    id: 'int-sl3',
    tingkat: 'sulit',
    pertanyaan: 'Tentukan LUAS daerah antara kurva y = x² - 4x dan sumbu-x, dari x = 0 sampai x = 6.',
    gambar: { jenis: 'luas', fungsi: 'x*x - 4*x', dari: 0, sampai: 6, jangkauan: [-0.5, 6.5, -5, 13] },
    pilihan: ['32/3', '24', '16/3', '64/3', '0'],
    benar: 3,
    langkah: [
      'Kurva memotong sumbu di x = 0 dan x = 4: selangnya WAJIB dipecah di 4.',
      'Bagian 0..4: x³/3 - 2x² di 4 = 64/3 - 32 = -32/3 (di bawah sumbu). Bagian 4..6: (72 - 72) - (-32/3) = 32/3.',
      'Luas: 32/3 + 32/3 = 64/3.',
    ],
    jebakan: '0 adalah HASIL INTEGRAL 0..6 (kedua bagian saling meniadakan), jawaban benar untuk pertanyaan berbeda. 32/3 hanya satu bagian.',
    alasan: 'Dipecah di 4: 64/3.',
  },
  {
    // cek: Math.abs(((1.0001*Math.sin(1.0001) + Math.cos(1.0001)) - (0.9999*Math.sin(0.9999) + Math.cos(0.9999))) / 2e-4 - Math.cos(1)) < 1e-6
    id: 'int-sl4',
    tingkat: 'sulit',
    pertanyaan: 'Antiturunan dari x cos x adalah ...',
    pilihan: ['x sin x - cos x + C', 'x sin x + C', '(x²/2) sin x + C', '-x sin x + cos x + C', 'x sin x + cos x + C'],
    benar: 4,
    langkah: [
      'Parsial: u = x (du = dx), dv = cos x dx (v = sin x).',
      'Hasil: x sin x - integral sin x dx = x sin x - (-cos x) = x sin x + cos x + C.',
      'Periksa dengan menurunkan: sin x + x cos x - sin x = x cos x.',
    ],
    jebakan: 'x sin x - cos x lupa bahwa antiturunan sin x adalah MINUS cos x, sehingga dikurangi minus jadi ditambah. (x²/2) sin x mengintegralkan tiap faktor sendiri-sendiri.',
    alasan: 'x sin x + cos x + C.',
  },
  {
    // cek: Math.abs((9 - 13.5 + 6) - 1.5) < 1e-9
    id: 'int-sl5',
    tingkat: 'sulit',
    pertanyaan: 'Hitung integral x² - 3x + 2 dari 0 sampai 3.',
    gambar: { jenis: 'luas', fungsi: 'x*x - 3*x + 2', dari: 0, sampai: 3, jangkauan: [-0.5, 3.5, -1, 3] },
    pilihan: ['3/2', '9/2', '0', '-3/2', '6'],
    benar: 0,
    langkah: [
      'Antiturunan x³/3 - 3x²/2 + 2x. Di x = 3: 9 - 13,5 + 6 = 1,5. Di 0: 0.',
      'Hasilnya 3/2, positif walaupun sebagian kurva di bawah sumbu (antara 1 dan 2): bagian atas lebih besar.',
    ],
    jebakan: '9/2 lupa suku -3x²/2. 0 mengira bagian atas dan bawah sama besar; tidak, bagian bawah hanya 1/6.',
    alasan: '1,5.',
  },
  {
    // cek: 2*Math.sqrt(4) - 2*Math.sqrt(1) === 2
    id: 'int-sl6',
    tingkat: 'sulit',
    pertanyaan: 'Hitung integral 1 dibagi √x, dari 1 sampai 4.',
    gambar: { jenis: 'luas', fungsi: '1/Math.sqrt(x)', dari: 1, sampai: 4, jangkauan: [0.3, 5, 0, 1.5] },
    pilihan: ['1/2', '2', '4', '1', '3'],
    benar: 1,
    langkah: [
      'Tulis x^(-1/2). Pangkat naik jadi 1/2, dibagi 1/2: 2√x.',
      'Batas atas 2√4 = 4, batas bawah 2√1 = 2. Selisihnya 2.',
    ],
    jebakan: '4 lupa mengurangkan batas bawah. 1/2 memakai pangkat naik tanpa membaginya dengan 1/2.',
    alasan: '4 - 2 = 2.',
  },
  {
    // cek: 1+2+3+4+5+6+7 === 28
    id: 'int-sl7',
    tingkat: 'sulit',
    pertanyaan: 'Untuk f(x) = x pada selang 0 sampai 7 dibagi 7 bagian, berapa jumlahan Riemann dengan titik sampel KANAN?',
    gambar: { jenis: 'luas', fungsi: 'x', dari: 0, sampai: 7, persegi: 7, jangkauan: [0, 8, 0, 8] },
    pilihan: ['49', '3,5', '28', '21', '24,5'],
    benar: 2,
    langkah: [
      'Lebar tiap bagian 7 : 7 = 1. Titik sampel kanan: tingginya 1, 2, 3, 4, 5, 6, 7.',
      'Jumlah 28, dikali lebar 1: 28. (Gambar memperlihatkan persegi panjang kiri; yang kanan satu langkah lebih tinggi.)',
    ],
    jebakan: '21 adalah jumlahan titik sampel KIRI (0 sampai 6). 24,5 adalah luas sebenarnya, terjepit di antara 21 dan 28. Soal dari Contoh Soal 3.6, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 180.',
    alasan: '1 + 2 + ... + 7 = 28. Soal dari Contoh Soal 3.6, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 180.',
  },
  {
    // cek: Math.abs((2 + 4 - 8/3) - (1/2 - 2 + 1/3) - 4.5) < 1e-9
    id: 'int-sl8',
    tingkat: 'sulit',
    pertanyaan: 'Tentukan luas daerah yang dibatasi kurva y = x² dan garis y = x + 2.',
    gambar: { jenis: 'luas', fungsi: 'x + 2', fungsi2: 'x*x', dari: -1, sampai: 2, jangkauan: [-2, 3, -0.5, 5] },
    pilihan: ['3/2', '27/2', '4', '9/2', '9'],
    benar: 3,
    langkah: [
      'Titik potong: x² = x + 2, (x + 1)(x - 2) = 0, batasnya -1 dan 2.',
      'Uji x = 0: garis 2, parabola 0, jadi garis di ATAS. Integralkan (x + 2 - x²).',
      'Antiturunan x²/2 + 2x - x³/3. Di 2: 2 + 4 - 8/3 = 10/3. Di -1: 1/2 - 2 + 1/3 = -7/6. Selisih 10/3 + 7/6 = 27/6 = 9/2.',
    ],
    jebakan: '27/2 salah menyederhanakan 27/6. 3/2 membalik urutan pengurangan lalu memakai nilai mutlaknya secara keliru.',
    alasan: '9/2.',
  },
  {
    // cek: (16 - 1) / 4 === 3.75
    id: 'int-sl9',
    tingkat: 'sulit',
    pertanyaan: 'Hitung integral 2x(x² + 1)³ dari 0 sampai 1.',
    pilihan: ['15/4', '4', '1/4', '16', '15'],
    benar: 0,
    langkah: [
      'u = x² + 1, du = 2x dx (sudah ada). Batas: x = 0 memberi u = 1, x = 1 memberi u = 2.',
      'Integral u³ dari 1 sampai 2: u⁴ : 4 = (16 - 1) : 4 = 15/4.',
    ],
    jebakan: '4 lupa mengurangkan batas bawah (1/4). 15 lupa membagi 4. Batas 0..1 jangan dimasukkan ke rumus dalam u.',
    alasan: '(16 - 1)/4 = 15/4.',
  },
  {
    // cek: Math.abs((8 - 8/3) * 2 - 32/3) < 1e-9
    id: 'int-sl10',
    tingkat: 'sulit',
    pertanyaan: 'Tentukan luas daerah yang dibatasi kurva y = 4 - x² dan sumbu-x.',
    gambar: { jenis: 'luas', fungsi: '4 - x*x', dari: -2, sampai: 2, jangkauan: [-3, 3, -0.5, 5] },
    pilihan: ['32/3', '16/3', '8', '16', '64/3'],
    benar: 0,
    langkah: [
      'Batasnya dicari sendiri: 4 - x² = 0 memberi x = -2 dan x = 2. Di antaranya kurva di atas sumbu.',
      'Antiturunan 4x - x³/3. Di 2: 8 - 8/3 = 16/3. Di -2: -16/3. Selisih 32/3.',
    ],
    jebakan: '16/3 hanya separuh daerah (dari 0 sampai 2), lupa sisi kirinya. 16 adalah luas persegi panjang pembungkus (lebar 4, tinggi 4).',
    alasan: '32/3.',
  },
  {
    // cek: Math.abs(Math.sin(Math.PI/2)/2 - 0 - 0.5) < 1e-9
    id: 'int-sl11',
    tingkat: 'sulit',
    pertanyaan: 'Hitung integral cos 2x dari 0 sampai π/4.',
    pilihan: ['1/2', '1', '0', '2', 'π/4'],
    benar: 0,
    langkah: [
      'Antiturunan cos 2x = sin 2x : 2 (turunan dalam 2 ditebus dengan membagi 2).',
      'Di π/4: sin(π/2) : 2 = 1/2. Di 0: 0. Hasilnya 1/2.',
    ],
    jebakan: '1 lupa membagi 2 (memakai sin 2x). 2 mengalikan 2 alih-alih membagi.',
    alasan: 'sin(π/2)/2 = 1/2.',
  },
  {
    // cek: Math.abs(((1.0001*Math.exp(1.0001) - Math.exp(1.0001)) - (0.9999*Math.exp(0.9999) - Math.exp(0.9999))) / 2e-4 - Math.E) < 1e-5
    id: 'int-sl12',
    tingkat: 'sulit',
    pertanyaan: 'Antiturunan dari x eˣ adalah ...',
    pilihan: ['x eˣ - eˣ + C', 'x eˣ + C', '(x²/2) eˣ + C', 'x eˣ + eˣ + C', 'eˣ + C'],
    benar: 0,
    langkah: [
      'Parsial: u = x (du = dx), dv = eˣ dx (v = eˣ).',
      'x eˣ - integral eˣ dx = x eˣ - eˣ + C.',
      'Periksa: turunan x eˣ - eˣ adalah eˣ + x eˣ - eˣ = x eˣ.',
    ],
    jebakan: 'x eˣ + eˣ salah tanda pada suku kedua (turunannya 2eˣ + x eˣ). (x²/2) eˣ mengintegralkan tiap faktor sendiri.',
    alasan: 'x eˣ - eˣ + C.',
  },
  {
    // cek: Math.abs(1/4 + 1/4 - 0.5) < 1e-9
    id: 'int-sl13',
    tingkat: 'sulit',
    pertanyaan: 'Tentukan LUAS daerah antara kurva y = x³ dan sumbu-x, dari x = -1 sampai x = 1.',
    gambar: { jenis: 'luas', fungsi: 'x*x*x', dari: -1, sampai: 1, jangkauan: [-1.5, 1.5, -1.5, 1.5] },
    pilihan: ['1/2', '0', '1/4', '1', '2'],
    benar: 0,
    langkah: [
      'Kurva memotong sumbu di x = 0: pecah di sana.',
      'Bagian -1..0: x⁴/4 memberi 0 - 1/4 = -1/4 (di bawah), dipositifkan 1/4. Bagian 0..1: 1/4.',
      'Luas 1/4 + 1/4 = 1/2.',
    ],
    jebakan: '0 adalah hasil integral tanpa dipecah; untuk LUAS bagian bawah dipositifkan dulu. 1/4 hanya satu bagian.',
    alasan: 'Dipecah di 0: 1/2.',
  },
  {
    // cek: Math.abs((8 + 2*2) - (1/2 + 2) - 9.5) < 1e-9
    id: 'int-sl14',
    tingkat: 'sulit',
    pertanyaan: 'Hitung integral (x + 1/√x) dari 1 sampai 4.',
    pilihan: ['19/2', '15/2', '17/2', '10', '8'],
    benar: 0,
    langkah: [
      'Antiturunan: x²/2 + 2√x (1/√x = x^(-1/2), naik jadi x^(1/2) dibagi 1/2).',
      'Di 4: 8 + 4 = 12. Di 1: 1/2 + 2 = 5/2. Selisih 12 - 5/2 = 19/2.',
    ],
    jebakan: '15/2 hanya suku x²/2 (8 - 1/2), lupa suku akar. 8 salah memasukkan batas ke 2√x.',
    alasan: '12 - 5/2 = 19/2.',
  },
  {
    // cek: (8 + 2) - 0 === 10
    id: 'int-sl15',
    tingkat: 'sulit',
    pertanyaan: 'Kecepatan sebuah benda adalah v(t) = 3t² + 1 m/s. Jarak yang ditempuh dari t = 0 sampai t = 2 detik adalah ...',
    gambar: { jenis: 'luas', fungsi: '3*x*x + 1', dari: 0, sampai: 2, jangkauan: [0, 3, 0, 15] },
    pilihan: ['10 m', '13 m', '26 m', '6 m', '8 m'],
    benar: 0,
    langkah: [
      'Jarak = luas di bawah grafik kecepatan = integral v dari 0 sampai 2.',
      'Antiturunan t³ + t. Di 2: 8 + 2 = 10. Di 0: 0. Jarak 10 m.',
    ],
    jebakan: '13 adalah v(2), KECEPATAN di detik ke-2, bukan jarak. 26 mengalikan v(2) dengan waktu (hanya benar kalau kecepatannya tetap).',
    alasan: 't³ + t di 2: 10.',
  },

  /* ------------------------- SANGAT SULIT ------------------------- */
  {
    // cek: Math.abs(63/4 + 16/3 - 253/12) < 1e-9
    id: 'int-ss1',
    tingkat: 'sangat sulit',
    pertanyaan: 'Tentukan LUAS daerah antara kurva y = x³ - 2x² - 5x + 6 dan sumbu-x, dari x = -2 sampai x = 3.',
    gambar: { jenis: 'luas', fungsi: 'x*x*x - 2*x*x - 5*x + 6', dari: -2, sampai: 3, jangkauan: [-2.5, 3.5, -8, 12] },
    pilihan: ['125/12', '63/4', '16/3', '189/12', '253/12'],
    benar: 4,
    langkah: [
      'Akar: -2, 1, 3. Yang di dalam selang hanya x = 1: pecah di situ.',
      'Bagian -2..1: 63/4 (di atas). Bagian 1..3: -16/3 (di bawah).',
      'Luas: 63/4 + 16/3 = 189/12 + 64/12 = 253/12.',
    ],
    jebakan: '125/12 adalah HASIL INTEGRALNYA (63/4 - 16/3), bukan luas. 63/4 hanya bagian kiri. Soal dari Ayo Mencoba 3.11 nomor 2, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 205.',
    alasan: '63/4 + 16/3 = 253/12. Soal dari Ayo Mencoba 3.11 nomor 2, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 205.',
  },
  {
    // cek: Math.abs(63/4 - 16/3 - 125/12) < 1e-9
    id: 'int-ss2',
    tingkat: 'sangat sulit',
    pertanyaan: 'Untuk kurva yang sama, y = x³ - 2x² - 5x + 6, berapa HASIL INTEGRALNYA dari -2 sampai 3?',
    gambar: { jenis: 'luas', fungsi: 'x*x*x - 2*x*x - 5*x + 6', dari: -2, sampai: 3, jangkauan: [-2.5, 3.5, -8, 12] },
    pilihan: ['125/12', '253/12', '0', '63/4', '-16/3'],
    benar: 0,
    langkah: [
      'Bagian -2..1: 63/4. Bagian 1..3: -16/3.',
      'Kali ini TIDAK dipositifkan: 63/4 - 16/3 = 189/12 - 64/12 = 125/12.',
    ],
    jebakan: '253/12 adalah LUASNYA (soal sebelumnya). Gambar sama persis, pertanyaan berbeda, jawaban berbeda. Soal dari Ayo Mencoba 3.11 nomor 2, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 205.',
    alasan: '63/4 - 16/3 = 125/12. Soal dari Ayo Mencoba 3.11 nomor 2, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 205.',
  },
  {
    // cek: Math.abs(1/4 + 1/4 - 0.5) < 1e-9
    id: 'int-ss3',
    tingkat: 'sangat sulit',
    pertanyaan: 'Tentukan luas daerah yang dibatasi kurva y = x³ dan garis y = x.',
    gambar: { jenis: 'luas', fungsi: 'x', fungsi2: 'x*x*x', dari: -1, sampai: 1, jangkauan: [-1.5, 1.5, -1.5, 1.5] },
    pilihan: ['3/4', '1/2', '0', '1/4', '1'],
    benar: 1,
    langkah: [
      'Titik potong x³ = x: -1, 0, 1. DUA daerah.',
      'Antara -1 dan 0 yang di atas x³; antara 0 dan 1 yang di atas x. Urutan pengurangannya bertukar.',
      'Masing-masing 1/4, jumlah 1/2.',
    ],
    jebakan: '0 memakai satu urutan pengurangan untuk seluruh selang, sehingga kedua daerah saling meniadakan. 1/4 hanya satu daerah.',
    alasan: '1/4 + 1/4.',
  },
  {
    // cek: Math.abs((27 - 5*Math.sqrt(5))/3 - (1/3)*(9**1.5 - 5**1.5)) < 1e-9
    id: 'int-ss4',
    tingkat: 'sangat sulit',
    pertanyaan: 'Tentukan luas daerah di kuadran pertama yang dibatasi kurva y = x √(x² + 5), sumbu-x, dan garis x = 2.',
    gambar: { jenis: 'luas', fungsi: 'x*Math.sqrt(x*x + 5)', dari: 0, sampai: 2, jangkauan: [0, 2.5, 0, 7] },
    pilihan: ['(9 - 5√5) dibagi 3', '2√5', '(27 - 5√5) dibagi 3', '(27 + 5√5) dibagi 3', '27 dibagi 3'],
    benar: 2,
    langkah: [
      'Pada 0..2 kurva di atas sumbu: luas = hasil integral, tidak perlu dipecah.',
      'u = x² + 5, du = 2x dx, dikali 1/2. Batas u: 5 sampai 9. Antiturunan: (1/2)(2/3)u^(3/2) = (1/3)u^(3/2).',
      '(1/3)(9^(3/2) - 5^(3/2)) = (27 - 5√5) : 3.',
    ],
    jebakan: '(27 + 5√5)/3 salah tanda pada batas bawah. 27/3 lupa batas bawah u = 5 (bukan 0, karena x = 0 memberi u = 5). Soal dari Contoh Soal 3.13, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 204.',
    alasan: '(27 - 5√5)/3. Soal dari Contoh Soal 3.13, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 204.',
  },
  {
    // cek: Math.abs(((-(1.0001**2)*Math.cos(1.0001) + 2*1.0001*Math.sin(1.0001) + 2*Math.cos(1.0001)) - (-(0.9999**2)*Math.cos(0.9999) + 2*0.9999*Math.sin(0.9999) + 2*Math.cos(0.9999))) / 2e-4 - Math.sin(1)) < 1e-5
    id: 'int-ss5',
    tingkat: 'sangat sulit',
    pertanyaan: 'Antiturunan dari x² sin x adalah ...',
    pilihan: ['x² cos x - 2x sin x - 2 cos x + C', '-x² cos x + 2x sin x - 2 cos x + C', '(x³/3) sin x + C', '-x² cos x + 2x sin x + 2 cos x + C', '-x² cos x + C'],
    benar: 3,
    langkah: [
      'Parsial putaran 1: u = x², dv = sin x dx, v = -cos x. Hasil: -x² cos x + integral 2x cos x dx.',
      'Putaran 2: u = 2x, dv = cos x dx, v = sin x. Integral 2x cos x = 2x sin x - integral 2 sin x = 2x sin x + 2 cos x.',
      'Gabung: -x² cos x + 2x sin x + 2 cos x + C. Periksa dengan menurunkan: semua suku kecuali x² sin x saling menghapus.',
    ],
    jebakan: 'Pilihan kedua salah tanda pada 2 cos x (lupa bahwa antiturunan sin x adalah -cos x, dikurangi jadi ditambah). -x² cos x + C berhenti setelah putaran pertama. Soal dari Contoh Soal 3.5, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 175.',
    alasan: 'Parsial dua kali. Soal dari Contoh Soal 3.5, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 175.',
  },
  {
    // cek: 2000 * 8 + 4000 === 20000
    id: 'int-ss6',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah ponsel terjual dengan laju 3.000 √x + 1.000 unit per tahun pada tahun ke-x. Berapa total penjualan selama 4 tahun pertama?',
    gambar: { jenis: 'luas', fungsi: '3000*Math.sqrt(x) + 1000', dari: 0, sampai: 4, jangkauan: [0, 4.5, 0, 8000] },
    pilihan: ['28.000 unit', '13.000 unit', '7.000 unit', '16.000 unit', '20.000 unit'],
    benar: 4,
    langkah: [
      'Diketahui LAJU, dicari JUMLAH: luas di bawah grafik laju dari 0 sampai 4.',
      'Antiturunan: 2.000 x^(3/2) + 1.000x. Di 4: 2.000 × 8 + 4.000 = 20.000. Di 0: 0.',
    ],
    jebakan: '28.000 membaca lajunya sebagai 3.000x (akar terlewat). 7.000 adalah laju di tahun ke-4, bukan jumlahnya. Soal dari Contoh Soal 3.14, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 207.',
    alasan: '20.000 unit. Soal dari Contoh Soal 3.14, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 207.',
  },
  {
    // cek: Math.abs((9 + 9) - (1/3 + 1) - 50/3) < 1e-9
    id: 'int-ss7',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah gaya sebesar x² + 2x newton bekerja pada benda di jarak x meter. Berapa usaha untuk memindahkannya dari x = 1 ke x = 3?',
    gambar: { jenis: 'luas', fungsi: 'x*x + 2*x', dari: 1, sampai: 3, jangkauan: [0, 4, 0, 16] },
    pilihan: ['50/3 joule', '18 joule', '4/3 joule', '22/3 joule', '54 joule'],
    benar: 0,
    langkah: [
      'Gaya berubah, jadi usaha = integral gaya terhadap jarak (jalannya dipotong-potong lalu dijumlahkan).',
      'Antiturunan x³/3 + x². Di 3: 9 + 9 = 18. Di 1: 1/3 + 1 = 4/3. Selisih 50/3.',
    ],
    jebakan: '18 lupa mengurangkan batas bawah. 54 memakai rumus gaya × jarak dengan gaya di x = 3, padahal rumus itu hanya untuk gaya tetap. Soal dari Contoh Soal 3.15, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 209.',
    alasan: '18 - 4/3 = 50/3. Soal dari Contoh Soal 3.15, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 209.',
  },
  {
    // cek: 2*16 + 4 - 36 === 0
    id: 'int-ss8',
    tingkat: 'sangat sulit',
    pertanyaan: 'Peralatan seharga 36.000 menghemat biaya dengan laju 4.000x + 1.000 per tahun pada tahun ke-x. Setelah berapa tahun penghematannya menutup harga beli?',
    gambar: { jenis: 'luas', fungsi: '4000*x + 1000', dari: 0, sampai: 4, jangkauan: [0, 5, 0, 20000] },
    pilihan: ['9 tahun', '4 tahun', '3 tahun', '5 tahun', '6 tahun'],
    benar: 1,
    langkah: [
      'Yang dicari BATAS ATAS t, bukan hasilnya. Total penghematan sampai t: 2.000t² + 1.000t.',
      'Samakan 36.000, bagi 1.000: 2t² + t - 36 = 0, (2t + 9)(t - 4) = 0.',
      't = 4 (t = -4,5 dibuang: waktu tidak mundur).',
    ],
    jebakan: '9 membagi 36.000 dengan 4.000, mengabaikan bahwa lajunya bertambah tiap tahun. 3 tahun baru menghemat 21.000. Soal dari Ayo Mencoba 3.12, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 208.',
    alasan: 't = 4. Soal dari Ayo Mencoba 3.12, Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi 2025), Kemendikdasmen, hal. 208.',
  },
  {
    // cek: Math.abs((4 - 8/3) - 4/3) < 1e-9
    id: 'int-ss9',
    tingkat: 'sangat sulit',
    pertanyaan: 'Tentukan luas daerah yang dibatasi kurva y = x² dan garis y = 2x.',
    gambar: { jenis: 'luas', fungsi: '2*x', fungsi2: 'x*x', dari: 0, sampai: 2, jangkauan: [-0.5, 3, -0.5, 5] },
    pilihan: ['4/3', '8/3', '4', '2/3', '2'],
    benar: 0,
    langkah: [
      'Titik potong x² = 2x: x = 0 dan x = 2. Uji x = 1: garis 2, parabola 1, garis di atas.',
      'Integral (2x - x²) dari 0 sampai 2: x² - x³/3 = 4 - 8/3 = 4/3.',
    ],
    jebakan: '8/3 hanya luas di bawah parabola. 4 hanya luas segitiga di bawah garis. Luas di antara keduanya adalah selisihnya.',
    alasan: '4 - 8/3 = 4/3.',
  },
  {
    // cek: Math.abs((16 - 16/3) * 2 - 64/3) < 1e-9
    id: 'int-ss10',
    tingkat: 'sangat sulit',
    pertanyaan: 'Tentukan luas daerah yang dibatasi parabola y = x² dan parabola y = 8 - x².',
    gambar: { jenis: 'luas', fungsi: '8 - x*x', fungsi2: 'x*x', dari: -2, sampai: 2, jangkauan: [-3, 3, -0.5, 9] },
    pilihan: ['64/3', '32/3', '16', '128/3', '8'],
    benar: 0,
    langkah: [
      'Titik potong: x² = 8 - x², x² = 4, x = -2 dan 2. Di antaranya 8 - x² di atas.',
      'Integral (8 - 2x²) dari -2 sampai 2: 8x - 2x³/3. Di 2: 16 - 16/3 = 32/3. Di -2: -32/3.',
      'Selisih 64/3, kira-kira 21,3.',
    ],
    jebakan: '32/3 lupa sisi kiri (hanya 0..2). 128/3 mengalikan dua kali. Memakai simetri boleh: 2 × 32/3, tetapi jangan lalu digandakan lagi.',
    alasan: '64/3.',
  },
  {
    // cek: 4*4 === 16
    id: 'int-ss11',
    tingkat: 'sangat sulit',
    pertanyaan: 'Diketahui integral 2x dari 0 sampai a sama dengan 16, dengan a > 0. Nilai a adalah ...',
    gambar: { jenis: 'luas', fungsi: '2*x', dari: 0, sampai: 4, jangkauan: [0, 5, 0, 9] },
    pilihan: ['4', '8', '16', '2', '√8'],
    benar: 0,
    langkah: [
      'Yang dicari batas atasnya. Hitung dulu dengan a sebagai huruf: antiturunan x², dari 0 sampai a memberi a².',
      'a² = 16, a = 4 (a = -4 dibuang, syarat a > 0).',
    ],
    jebakan: '8 membagi 16 dengan 2 (mengira integral 2x adalah 2a). 16 menyamakan a dengan hasilnya. √8 mengira integral 2x dari 0 sampai a adalah 2a².',
    alasan: 'a² = 16.',
  },
  {
    // cek: Math.abs((Math.E - 1)/2 - Array.from({length:2000},(_,i)=>{const x=(i+0.5)/2000;return x*Math.exp(x*x)}).reduce((a,b)=>a+b,0)/2000) < 1e-4
    id: 'int-ss12',
    tingkat: 'sangat sulit',
    pertanyaan: 'Hitung integral x e^(x²) dari 0 sampai 1.',
    gambar: { jenis: 'luas', fungsi: 'x*Math.exp(x*x)', dari: 0, sampai: 1, jangkauan: [0, 1.3, 0, 3] },
    pilihan: ['(e - 1) dibagi 2', 'e - 1', 'e dibagi 2', '(e + 1) dibagi 2', '1/2'],
    benar: 0,
    langkah: [
      'u = x², du = 2x dx; soal punya x dx, dikali 1/2. Batas u: 0 sampai 1.',
      '(1/2) integral e^u du dari 0 sampai 1 = (1/2)(e¹ - e⁰) = (e - 1) : 2, kira-kira 0,86.',
    ],
    jebakan: 'e - 1 lupa faktor 1/2. e/2 lupa batas bawah (e⁰ = 1, bukan 0). Tanpa substitusi, e^(x²) tidak punya antiturunan dalam fungsi biasa; faktor x-lah yang menyelamatkan.',
    alasan: '(e - 1)/2.',
  },
  {
    // cek: 8 - 8 + 3 === 3 && 1 - 2 + 3 === 2
    id: 'int-ss13',
    tingkat: 'sangat sulit',
    pertanyaan: 'Fungsi f mempunyai turunan f′(x) = 3x² - 4x dan memenuhi f(1) = 2. Nilai f(2) adalah ...',
    pilihan: ['3', '4', '0', '5', '2'],
    benar: 0,
    langkah: [
      'Antiturunan: f(x) = x³ - 2x² + C.',
      'f(1) = 1 - 2 + C = 2, jadi C = 3. f(x) = x³ - 2x² + 3.',
      'f(2) = 8 - 8 + 3 = 3.',
    ],
    jebakan: '0 lupa C (memakai x³ - 2x²). 4 adalah f′(2), turunannya di 2, bukan f(2). Syarat f(1) = 2 diberikan justru untuk menemukan C.',
    alasan: 'C = 3, f(2) = 3.',
  },
  {
    // cek: Math.abs(Math.sin(Math.PI/2)**2/2 - 0 - 0.5) < 1e-9
    id: 'int-ss14',
    tingkat: 'sangat sulit',
    pertanyaan: 'Hitung integral sin x cos x dari 0 sampai π/2.',
    gambar: { jenis: 'luas', fungsi: 'Math.sin(x)*Math.cos(x)', dari: 0, sampai: 1.5708, jangkauan: [0, 2, 0, 0.7] },
    pilihan: ['1/2', '1', '0', '1/4', 'π/4'],
    benar: 0,
    langkah: [
      'u = sin x, du = cos x dx (sudah ada). Batas u: sin 0 = 0 sampai sin(π/2) = 1.',
      'Integral u du dari 0 sampai 1 = u² : 2 = 1/2.',
      'Cara lain: sin x cos x = (1/2) sin 2x, antiturunan -cos 2x : 4, memberi (1/4)(1 + 1) = 1/2 juga.',
    ],
    jebakan: '1 mengalikan hasil integral sin (1) dengan hasil integral cos (1); integral hasil kali BUKAN hasil kali integral. 1/4 lupa mengalikan 2 pada cara kedua.',
    alasan: 'u²/2 dari 0 ke 1: 1/2.',
  },
  {
    // cek: Math.abs((50 - 25) + Math.abs((80 - 64) - (50 - 25)) - 34) < 1e-9
    id: 'int-ss15',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kecepatan sebuah benda adalah v(t) = 10 - 2t m/s. Berapa JARAK TEMPUH benda itu dari t = 0 sampai t = 8 detik?',
    gambar: { jenis: 'luas', fungsi: '10 - 2*x', dari: 0, sampai: 8, jangkauan: [0, 9, -8, 12] },
    pilihan: ['34 m', '16 m', '25 m', '9 m', '80 m'],
    benar: 0,
    langkah: [
      'v = 0 di t = 5: sesudah itu benda bergerak MUNDUR (v negatif). Jarak tempuh menjumlahkan keduanya tanpa tanda, jadi pecah di 5.',
      'Antiturunan 10t - t². Bagian 0..5: 50 - 25 = 25 m maju. Bagian 5..8: (80 - 64) - 25 = -9, yaitu 9 m mundur.',
      'Jarak tempuh 25 + 9 = 34 m. (Perpindahannya 25 - 9 = 16 m.)',
    ],
    jebakan: '16 m adalah PERPINDAHAN (hasil integral 0..8 tanpa dipecah), bukan jarak tempuh. 25 hanya bagian maju. 80 mengalikan kecepatan awal dengan waktu.',
    alasan: '25 + 9 = 34.',
  },
]
