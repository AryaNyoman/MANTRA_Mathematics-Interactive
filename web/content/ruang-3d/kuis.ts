import type { SoalKuis } from '@/content/tipe'

/**
 * Bank soal latihan Ruang Tiga Dimensi: 60 soal, 15 tiap tingkat (14 Sep 2026).
 *
 * SEJARAH: bank pertama 32 soal (r01 sampai r32, 8/10/8/6 per tingkat),
 * dikalibrasi ke lima soal Ujian Nasional asli; empat di antaranya masuk
 * apa adanya beserta sumbernya (r19 sampai r22). 13 Sep ARYA meminta 15 soal
 * per tingkat, syarat naik 10 benar, pembahasan bernomor bergambar, dan
 * penjelasan pengecoh. Id lama dan tingkatnya DIPERTAHANKAN; soal baru
 * r33 sampai r60 (7 mudah, 5 sedang, 7 sulit, 9 sangat sulit).
 *
 * KALIBRASI:
 * - mudah dan sedang: kosakata kedudukan, diagonal sisi dan ruang, jarak
 *   yang kaki tegak lurusnya jatuh di titik bernama;
 * - sulit: pola UN dan UTBK (proyeksi pada bidang diagonal, jarak titik
 *   tengah rusuk, sudut garis dan bidang, balok);
 * - sangat sulit: 5 bergaya olimpiade (bidang yang tidak bernama, sudut dua
 *   diagonal ruang, sudut dua bidang lewat BD, jarak dua garis bersilangan,
 *   bidang lewat titik tengah rusuk) dan 10 sulit-biasa.
 *
 * Kubus acuannya selalu ABCD.EFGH: alas ABCD, tutup EFGH, A tepat di bawah E.
 * Koordinat untuk `// cek:`: A(0,0,0), B(a,0,0), C(a,a,0), D(0,a,0),
 * E(0,0,a), F(a,0,a), G(a,a,a), H(0,a,a). Semua jawaban berangka diperiksa
 * cek_kuis.mjs lewat koordinat itu.
 */

const KUBUS: { jenis: 'balok'; ukuran: [number, number, number] } = { jenis: 'balok', ukuran: [1, 1, 1] }
const LIMAS_SVG = `<line x1="120" y1="205" x2="300" y2="205" stroke="#8B8378" stroke-width="1.6"/>
<line x1="300" y1="205" x2="360" y2="150" stroke="#8B8378" stroke-width="1.6"/>
<line x1="360" y1="150" x2="180" y2="150" stroke="#8B8378" stroke-width="1.6" stroke-dasharray="5 4"/>
<line x1="180" y1="150" x2="120" y2="205" stroke="#8B8378" stroke-width="1.6" stroke-dasharray="5 4"/>
<line x1="240" y1="40" x2="120" y2="205" stroke="#8B8378" stroke-width="1.6"/>
<line x1="240" y1="40" x2="300" y2="205" stroke="#8B8378" stroke-width="1.6"/>
<line x1="240" y1="40" x2="360" y2="150" stroke="#8B8378" stroke-width="1.6"/>
<line x1="240" y1="40" x2="180" y2="150" stroke="#8B8378" stroke-width="1.6" stroke-dasharray="5 4"/>
<line x1="240" y1="40" x2="240" y2="178" stroke="#C25E4D" stroke-width="1.6" stroke-dasharray="3 3"/>
<circle cx="240" cy="178" r="2.6" fill="#C25E4D"/>
<g font-family="var(--font-mono), sans-serif" font-size="12" fill="#1F2430">
<text x="240" y="32" text-anchor="middle">T</text>
<text x="108" y="212">A</text><text x="308" y="214">B</text>
<text x="366" y="150">C</text><text x="164" y="146">D</text>
<text x="248" y="192" fill="#C25E4D">O</text>
</g>`

export const KUIS: SoalKuis[] = [
  /* ---------------------------- mudah ---------------------------- */
  {
    // cek: Math.abs(Math.hypot(10, 10) - 10 * Math.SQRT2) < 1e-9
    id: 'r01',
    tingkat: 'mudah',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 10 cm. Berapa panjang diagonal sisi AC?',
    gambar: { ...KUBUS, ruas: [['A', 'C']] },
    pilihan: ['10 cm', '10 akar 2 cm', '10 akar 3 cm', '20 cm', '100 cm'],
    benar: 1,
    langkah: [
      'AC terletak pada satu sisi (alas ABCD), jadi ia diagonal SISI, bukan diagonal ruang.',
      'Segitiga ABC siku-siku di B: AC² = 10² + 10² = 200.',
      'AC = akar 200 = 10 akar 2 cm, kira-kira 14,14 cm.',
    ],
    jebakan: '10 akar 3 tertukar dengan diagonal RUANG (yang melewati tiga arah). 20 menjumlahkan AB dan BC begitu saja tanpa Pythagoras.',
    alasan: 'Diagonal sisi: rusuk kali akar 2.',
  },
  {
    // cek: Math.abs(Math.hypot(5, 5, 5) - 5 * Math.sqrt(3)) < 1e-9
    id: 'r02',
    tingkat: 'mudah',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 5 cm. Berapa panjang diagonal ruang AG?',
    gambar: { ...KUBUS, ruas: [['A', 'G']] },
    pilihan: ['5 akar 2 cm', '5 akar 3 cm', '5 akar 5 cm', '10 cm', '15 cm'],
    benar: 1,
    langkah: [
      'AG menembus kubus dari sudut bawah depan ke sudut atas belakang: diagonal ruang.',
      'Dua kali Pythagoras: AC² = 25 + 25 = 50, lalu AG² = AC² + CG² = 50 + 25 = 75.',
      'AG = akar 75 = 5 akar 3 cm.',
    ],
    jebakan: 'Angka 3 di dalam akar menghitung ada berapa arah yang dilewati. 5 akar 2 berhenti di diagonal sisi; 15 menjumlahkan tiga rusuk.',
    alasan: 'Diagonal ruang: rusuk kali akar 3.',
  },
  {
    id: 'r03',
    tingkat: 'mudah',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan garis AB terhadap garis HG?',
    gambar: { ...KUBUS, ruas: [['A', 'B'], ['H', 'G']] },
    pilihan: ['Berpotongan', 'Sejajar', 'Bersilangan', 'Berimpit', 'Tegak lurus'],
    benar: 1,
    langkah: [
      'AB rusuk alas depan, HG rusuk tutup belakang. Arah keduanya sama persis.',
      'Ada satu bidang yang memuat keduanya: bidang diagonal ABGH.',
      'Sebidang dan tidak berpotongan: sejajar.',
    ],
    jebakan: 'Bersilangan menggoda karena keduanya "jauh" (beda tinggi dan beda kedalaman). Yang menentukan bukan jauhnya, melainkan ada tidaknya bidang yang memuat keduanya.',
    alasan: 'Sebidang (ABGH) dan searah: sejajar.',
  },
  {
    id: 'r04',
    tingkat: 'mudah',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan garis AB terhadap garis CG?',
    gambar: { ...KUBUS, ruas: [['A', 'B'], ['C', 'G']] },
    pilihan: ['Berpotongan', 'Sejajar', 'Bersilangan', 'Berimpit', 'Tidak dapat ditentukan'],
    benar: 2,
    langkah: [
      'AB mendatar di alas depan, CG tegak di sudut belakang kanan. Arahnya berbeda, jadi bukan sejajar.',
      'Keduanya tidak punya titik persekutuan: AB seluruhnya di ketinggian 0 dan di depan, CG seluruhnya di belakang.',
      'Tidak sejajar dan tidak berpotongan berarti tidak sebidang: bersilangan.',
    ],
    jebakan: 'Pada gambar datar AB dan CG bisa TAMPAK berpotongan kalau dilihat dari sudut tertentu. Itulah jebakan gambar ruang (materi 01): periksa lewat titik persekutuan, bukan lewat gambar.',
    alasan: 'Tidak sebidang: bersilangan.',
  },
  {
    // cek: 7 === 7
    id: 'r05',
    tingkat: 'mudah',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 7 cm. Berapa jarak bidang alas ABCD ke bidang tutup EFGH?',
    gambar: { ...KUBUS, ruas: [['A', 'E']], bidang: ['E', 'F', 'G', 'H'] },
    pilihan: ['3,5 cm', '7 cm', '7 akar 2 cm', '7 akar 3 cm', '14 cm'],
    benar: 1,
    langkah: [
      'Kedua bidang sejajar, jadi jaraknya sama di mana pun diukur: cukup ambil satu titik.',
      'Ambil A. Jarak A ke tutup adalah panjang rusuk tegak AE = 7 cm.',
    ],
    jebakan: '7 akar 3 mengukur AG, yang miring, bukan yang terpendek. Jarak selalu ruas yang tegak lurus.',
    alasan: 'Jarak dua bidang sejajar = rusuk tegak.',
  },
  {
    // cek: Math.abs(Math.hypot(3, 3, 3) - 3 * Math.sqrt(3)) < 1e-9
    id: 'r06',
    tingkat: 'mudah',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 3 cm. Berapa jarak titik A ke titik G?',
    gambar: { ...KUBUS, ruas: [['A', 'G']] },
    pilihan: ['3 cm', '3 akar 2 cm', '3 akar 3 cm', '6 cm', '9 cm'],
    benar: 2,
    langkah: [
      'A dan G dua sudut yang paling berjauhan: AG diagonal ruang.',
      'AG = 3 akar 3 cm, kira-kira 5,196 cm.',
    ],
    jebakan: '9 menjumlahkan tiga rusuk (jalan memutar lewat rusuk), padahal jarak adalah garis lurus.',
    alasan: 'Diagonal ruang 3 akar 3.',
  },
  {
    id: 'r07',
    tingkat: 'mudah',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan garis AG terhadap bidang alas ABCD?',
    gambar: { ...KUBUS, ruas: [['A', 'G']], bidang: ['A', 'B', 'C', 'D'] },
    pilihan: ['Terletak pada bidang', 'Sejajar bidang', 'Menembus bidang', 'Tegak lurus bidang', 'Berimpit dengan bidang'],
    benar: 2,
    langkah: [
      'AG menyentuh alas hanya di A, lalu naik meninggalkannya: satu titik persekutuan.',
      'Satu titik persekutuan berarti menembus (berpotongan).',
      'Ia TIDAK tegak lurus alas: yang tegak lurus alas adalah rusuk tegak seperti AE. AG miring.',
    ],
    jebakan: '"Tegak lurus" menggoda karena AG naik; naik tidak sama dengan tegak lurus. Sudut AG terhadap alas kira-kira 35 derajat, bukan 90.',
    alasan: 'Satu titik persekutuan: menembus, tidak tegak lurus.',
  },
  {
    id: 'r08',
    tingkat: 'mudah',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan garis EF terhadap bidang alas ABCD?',
    gambar: { ...KUBUS, ruas: [['E', 'F']], bidang: ['A', 'B', 'C', 'D'] },
    pilihan: ['Terletak pada bidang', 'Sejajar bidang', 'Menembus bidang', 'Tegak lurus bidang', 'Berpotongan di titik A'],
    benar: 1,
    langkah: [
      'EF ada di tutup, setinggi satu rusuk di atas alas di sepanjang garisnya.',
      'Berapa pun diperpanjang, EF tidak pernah menyentuh alas: sejajar.',
    ],
    jebakan: '"Berpotongan di A" mencampur E (di atas A) dengan A sendiri. E tepat di atas A, bukan sama dengan A.',
    alasan: 'Tidak ada titik persekutuan: sejajar.',
  },
  {
    id: 'r33',
    tingkat: 'mudah',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan bidang ABCD terhadap bidang EFGH?',
    gambar: { ...KUBUS, bidang: ['E', 'F', 'G', 'H'] },
    pilihan: ['Berpotongan', 'Sejajar', 'Berimpit', 'Bersilangan', 'Tegak lurus'],
    benar: 1,
    langkah: [
      'Dua bidang hanya punya dua kemungkinan (materi 02): berpotongan pada sebuah garis, atau sejajar.',
      'Alas dan tutup tidak pernah bertemu: sejajar, jaraknya satu rusuk.',
    ],
    jebakan: '"Bersilangan" adalah istilah untuk dua GARIS, bukan dua bidang; dua bidang tidak pernah bersilangan.',
    alasan: 'Alas dan tutup sejajar.',
  },
  {
    // cek: Math.abs(Math.hypot(8, 8) - 8 * Math.SQRT2) < 1e-9
    id: 'r34',
    tingkat: 'mudah',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 8 cm. Berapa panjang BG?',
    gambar: { ...KUBUS, ruas: [['B', 'G']] },
    pilihan: ['8 cm', '8 akar 2 cm', '8 akar 3 cm', '16 cm', '4 akar 2 cm'],
    benar: 1,
    langkah: [
      'B dan G sama-sama di sisi kanan BCGF, jadi BG diagonal SISI.',
      'BG² = 8² + 8² = 128, BG = 8 akar 2 cm.',
    ],
    jebakan: '8 akar 3 mengira BG diagonal ruang; diagonal ruang dari B adalah BH, bukan BG.',
    alasan: 'Diagonal sisi: 8 akar 2.',
  },
  {
    // cek: Math.abs(Math.hypot(2, 2, 2) - 2 * Math.sqrt(3)) < 1e-9
    id: 'r35',
    tingkat: 'mudah',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 2 cm. Berapa panjang HB?',
    gambar: { ...KUBUS, ruas: [['H', 'B']] },
    pilihan: ['2 akar 2 cm', '2 akar 3 cm', '4 cm', '6 cm', '2 cm'],
    benar: 1,
    langkah: [
      'H di tutup belakang kiri, B di alas depan kanan: tidak ada satu sisi pun yang memuat keduanya, jadi HB diagonal RUANG.',
      'HB = 2 akar 3 cm, sama panjang dengan AG, CE, dan DF (keempat diagonal ruang sama panjang).',
    ],
    jebakan: '2 akar 2 mengira HB diagonal sisi. Periksa: adakah sisi yang memuat H dan B sekaligus? Tidak ada.',
    alasan: 'Diagonal ruang: 2 akar 3.',
  },
  {
    // cek: 9 === 9
    id: 'r36',
    tingkat: 'mudah',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 9 cm. Berapa jarak titik E ke garis AB?',
    gambar: { ...KUBUS, ruas: [['E', 'A'], ['A', 'B']] },
    pilihan: ['9 cm', '9 akar 2 cm', '9 akar 3 cm', '4,5 cm', '18 cm'],
    benar: 0,
    langkah: [
      'Jarak titik ke garis adalah ruas TEGAK LURUS dari titik itu ke garisnya.',
      'EA tegak lurus AB (rusuk tegak dan rusuk alas), jadi kaki tegak lurusnya jatuh tepat di A.',
      'Jaraknya EA = 9 cm.',
    ],
    jebakan: '9 akar 2 mengukur EB, yang miring; ruas miring selalu lebih panjang dari yang tegak lurus.',
    alasan: 'EA tegak lurus AB: jarak 9.',
  },
  {
    id: 'r37',
    tingkat: 'mudah',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan garis AE terhadap bidang alas ABCD?',
    gambar: { ...KUBUS, ruas: [['A', 'E']], bidang: ['A', 'B', 'C', 'D'] },
    pilihan: ['Sejajar bidang', 'Terletak pada bidang', 'Tegak lurus bidang', 'Bersilangan dengan bidang', 'Tidak dapat ditentukan'],
    benar: 2,
    langkah: [
      'AE menembus alas di A.',
      'AE tegak lurus AB dan tegak lurus AD, dua garis berpotongan di alas. Garis yang tegak lurus dua garis berpotongan pada sebuah bidang, tegak lurus bidang itu.',
    ],
    jebakan: '"Bersilangan dengan bidang" bukan istilah yang ada; bersilangan hanya untuk dua garis.',
    alasan: 'Rusuk tegak selalu tegak lurus alas.',
  },
  {
    id: 'r38',
    tingkat: 'mudah',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan bidang ABFE terhadap bidang BCGF?',
    gambar: { ...KUBUS, bidang: ['A', 'B', 'F', 'E'], ruas: [['B', 'F']] },
    pilihan: ['Sejajar', 'Berpotongan pada garis BF', 'Berimpit', 'Berpotongan pada garis AB', 'Bersilangan'],
    benar: 1,
    langkah: [
      'Sisi depan ABFE dan sisi kanan BCGF bertemu di sepanjang rusuk BF.',
      'Dua bidang yang bertemu berpotongan pada sebuah GARIS, dan di sini garisnya BF.',
    ],
    jebakan: '"Berpotongan pada AB" keliru: AB hanya ada di sisi depan, tidak ada di sisi kanan. Titik persekutuan keduanya justru B dan F.',
    alasan: 'Sisi depan dan sisi kanan bertemu di BF.',
  },
  {
    // cek: 6 === 6
    id: 'r39',
    tingkat: 'mudah',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak titik B ke bidang ADHE?',
    gambar: { ...KUBUS, bidang: ['A', 'D', 'H', 'E'], ruas: [['B', 'A']] },
    pilihan: ['6 cm', '6 akar 2 cm', '6 akar 3 cm', '3 cm', '12 cm'],
    benar: 0,
    langkah: [
      'ADHE adalah sisi kiri. Dari B, ruas yang tegak lurus sisi kiri adalah rusuk BA.',
      'Jaraknya BA = 6 cm.',
    ],
    jebakan: '6 akar 2 mengukur BE atau BD, yang miring. Jarak titik ke bidang selalu ruas yang tegak lurus bidangnya.',
    alasan: 'BA tegak lurus sisi kiri: 6.',
  },

  /* --------------------------- sedang ---------------------------- */
  {
    // cek: Math.abs(Math.hypot(6, 6) / 2 - 3 * Math.SQRT2) < 1e-9
    id: 'r09',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak titik B ke garis AC?',
    gambar: { ...KUBUS, ruas: [['A', 'C']], tambahan: [{ nama: 'P', di: [0.5, 0.5, 0] }] },
    pilihan: ['3 cm', '3 akar 2 cm', '6 cm', '6 akar 2 cm', '2 akar 6 cm'],
    benar: 1,
    langkah: [
      'Segitiga ABC sama kaki (AB = BC = 6), jadi kaki tegak lurus dari B jatuh tepat di tengah AC, sebut P.',
      'P adalah titik potong diagonal alas; BP setengah diagonal BD.',
      'BD = 6 akar 2, jadi BP = 3 akar 2 cm, kira-kira 4,24.',
    ],
    jebakan: '6 mengukur ke titik A atau C, ujung garisnya; itu bukan yang terpendek (materi 03: jarak selalu yang terpendek).',
    alasan: 'Setengah diagonal alas: 3 akar 2.',
  },
  {
    // cek: Math.abs(6 / Math.sqrt(3) - 2 * Math.sqrt(3)) < 1e-9
    id: 'r10',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak titik A ke bidang BDE?',
    gambar: { ...KUBUS, bidang: ['B', 'D', 'E'], ruas: [['A', 'G']] },
    pilihan: ['2 akar 3 cm', '3 akar 2 cm', '2 akar 6 cm', '6 cm', '6 akar 3 cm'],
    benar: 0,
    langkah: [
      'Bidang BDE memotong ketiga tetangga A (B, D, E). Diagonal ruang AG tegak lurus bidang itu (materi 06, lewat simetri).',
      'Kaki tegak lurusnya jatuh di AG pada sepertiga panjangnya dari A.',
      'Jarak = sepertiga dari 6 akar 3 = 2 akar 3 cm.',
    ],
    jebakan: '6 mengukur AB, AD, atau AE; ketiganya miring terhadap bidang BDE. Cara kedua (jalan pintas volume limas A.BDE) memberi angka yang sama.',
    alasan: 'Sepertiga diagonal ruang: 2 akar 3.',
  },
  {
    // cek: Math.abs(Math.acos(((0)*(1) + (1)*(0) + (1)*(1)) / 2) / D - 60) < 1e-9
    id: 'r11',
    tingkat: 'sedang',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara garis AH dan garis AF?',
    gambar: { ...KUBUS, ruas: [['A', 'H'], ['A', 'F'], ['F', 'H']] },
    pilihan: ['30 derajat', '45 derajat', '60 derajat', '90 derajat', '120 derajat'],
    benar: 2,
    langkah: [
      'AH, AF, dan FH ketiganya diagonal sisi, jadi sama panjang: segitiga AFH sama sisi.',
      'Setiap sudut segitiga sama sisi 60 derajat, termasuk sudut di A.',
    ],
    jebakan: '45 mengira sudutnya sama dengan sudut diagonal pada persegi; segitiga AFH berdiri miring di dalam ruang, bukan di satu sisi.',
    alasan: 'Segitiga AFH sama sisi: 60.',
  },
  {
    // cek: 9 === 9
    id: 'r12',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 9 cm. Berapa jarak garis AE ke bidang BCGF?',
    gambar: { ...KUBUS, ruas: [['A', 'E'], ['A', 'B']], bidang: ['B', 'C', 'G', 'F'] },
    pilihan: ['4,5 cm', '9 cm', '9 akar 2 cm', '9 akar 3 cm', '18 cm'],
    benar: 1,
    langkah: [
      'AE sejajar bidang BCGF (sisi kanan), jadi jaraknya sama di sepanjang garis: ambil satu titik saja (materi 07).',
      'Ambil A: jarak A ke sisi kanan = AB = 9 cm.',
    ],
    jebakan: '9 akar 2 mengukur AC atau AF, ruas miring. Titik mana pun pada AE memberi 9.',
    alasan: 'Garis sejajar bidang: ambil satu titik, 9.',
  },
  {
    // cek: Math.abs(Math.atan(1 / Math.SQRT2) / D - 35.26) < 0.01
    id: 'r13',
    tingkat: 'sedang',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara diagonal ruang AG dan bidang alas ABCD?',
    gambar: { ...KUBUS, ruas: [['A', 'G'], ['A', 'C'], ['C', 'G']] },
    pilihan: ['kira-kira 30 derajat', 'kira-kira 35,26 derajat', 'kira-kira 45 derajat', 'kira-kira 54,74 derajat', 'kira-kira 60 derajat'],
    benar: 1,
    langkah: [
      'Sudut garis dengan bidang = sudut garis dengan BAYANGANNYA. Bayangan AG pada alas adalah AC.',
      'Segitiga ACG siku-siku di C: tan sudut = CG : AC = a : a akar 2 = 1 : akar 2.',
      'Sudutnya kira-kira 35,26 derajat.',
    ],
    jebakan: '45 memakai tan = CG : BC (segitiga di satu sisi), padahal bayangannya diagonal alas, bukan rusuk. 54,74 adalah pelengkapnya, jawaban untuk sudut bidang BDG terhadap alas.',
    alasan: 'tan = 1/akar 2: 35,26 derajat.',
  },
  {
    // cek: Math.abs(12 / Math.sqrt(3) - 4 * Math.sqrt(3)) < 1e-9
    id: 'r14',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 12 cm. Berapa jarak titik C ke bidang BDG?',
    gambar: { ...KUBUS, bidang: ['B', 'D', 'G'], ruas: [['C', 'E']] },
    pilihan: ['4 akar 3 cm', '4 akar 6 cm', '6 akar 2 cm', '12 cm', '2 akar 3 cm'],
    benar: 0,
    langkah: [
      'Susunannya kembar dengan jarak A ke bidang BDE: sebuah titik sudut (C) dan bidang yang memotong ketiga tetangganya (B, D, G).',
      'Diagonal ruang CE tegak lurus bidang BDG; jaraknya sepertiga CE.',
      'CE = 12 akar 3, jadi jaraknya 4 akar 3 cm.',
    ],
    jebakan: '12 mengukur rusuk CB, yang miring terhadap bidang BDG. 2 akar 3 memakai rusuk 6 dari soal lain.',
    alasan: 'Sepertiga diagonal ruang: 4 akar 3.',
  },
  {
    id: 'r15',
    tingkat: 'sedang',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan garis AC terhadap garis BG?',
    gambar: { ...KUBUS, ruas: [['A', 'C'], ['B', 'G']] },
    pilihan: ['Berpotongan di B', 'Sejajar', 'Bersilangan', 'Berimpit', 'Berpotongan di G'],
    benar: 2,
    langkah: [
      'AC di alas, BG di sisi kanan. B tidak terletak pada AC (AC lewat tengah alas, bukan lewat B).',
      'Tidak ada titik persekutuan dan arahnya berbeda: bersilangan.',
      'Sudutnya tetap bisa diukur dengan menggeser salah satu (materi 08); AC digeser ke EG memberi segitiga sama sisi EGB, sudut 60.',
    ],
    jebakan: '"Berpotongan di B" tertipu gambar: pada gambar datar AC tampak lewat dekat B, padahal AC melintasi tengah alas.',
    alasan: 'Tidak sebidang: bersilangan.',
  },
  {
    // cek: Math.abs(Math.sqrt(36 - 36 / 3) - 2 * Math.sqrt(6)) < 1e-9
    id: 'r16',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak titik E ke garis AG?',
    gambar: { ...KUBUS, ruas: [['A', 'G'], ['E', 'G'], ['A', 'E']] },
    pilihan: ['2 akar 3 cm', '2 akar 6 cm', '3 akar 2 cm', '6 cm', '6 akar 2 cm'],
    benar: 1,
    langkah: [
      'Segitiga AEG siku-siku di E: AE = 6, EG = 6 akar 2, AG = 6 akar 3.',
      'Jalan pintas luas (materi 05): luas = setengah × AE × EG = setengah × AG × jarak.',
      '6 × 6 akar 2 = 6 akar 3 × jarak, jadi jarak = 6 akar 2 : akar 3 = 2 akar 6 cm, kira-kira 4,90.',
    ],
    jebakan: '6 mengukur EA, ujung garisnya, bukan ruas tegak lurus ke AG. Titik B dan D memberi angka yang sama persis, sebab AG sumbu simetri kubus.',
    alasan: 'Jalan pintas luas: 2 akar 6.',
  },
  {
    // cek: 4 === 4
    id: 'r40',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 4 cm. Berapa jarak titik A ke garis BG?',
    gambar: { ...KUBUS, ruas: [['A', 'B'], ['B', 'G']] },
    pilihan: ['4 cm', '4 akar 2 cm', '4 akar 3 cm', '2 akar 2 cm', '2 akar 6 cm'],
    benar: 0,
    langkah: [
      'AB tegak lurus bidang BCGF (sisi kanan), jadi AB tegak lurus SEMUA garis di sisi itu, termasuk BG.',
      'Kaki tegak lurus dari A ke BG jatuh tepat di B: jaraknya AB = 4 cm.',
    ],
    jebakan: '4 akar 2 mengukur AF atau AC. 2 akar 6 memakai rumus jarak ke diagonal ruang, padahal BG diagonal sisi.',
    alasan: 'AB tegak lurus BG: jarak 4.',
  },
  {
    // cek: Math.abs(Math.atan(6 / 6) / D - 45) < 1e-9
    id: 'r41',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa besar sudut antara garis AF dan bidang alas ABCD?',
    gambar: { ...KUBUS, ruas: [['A', 'F'], ['A', 'B'], ['B', 'F']] },
    pilihan: ['30 derajat', '45 derajat', '60 derajat', 'kira-kira 35,26 derajat', '90 derajat'],
    benar: 1,
    langkah: [
      'Bayangan F pada alas adalah B, jadi bayangan AF adalah AB.',
      'Segitiga ABF siku-siku di B dengan AB = BF = 6: tan sudut = 6 : 6 = 1.',
      'Sudutnya 45 derajat.',
    ],
    jebakan: '35,26 adalah sudut diagonal RUANG terhadap alas; AF diagonal sisi, bayangannya rusuk, bukan diagonal alas.',
    alasan: 'tan = 1: 45 derajat.',
  },
  {
    // cek: Math.abs(Math.hypot(8 - 4, 8 - 4, 8) - 4 * Math.sqrt(6)) < 1e-9
    id: 'r42',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 8 cm. Berapa jarak titik G ke garis BD?',
    gambar: { ...KUBUS, ruas: [['B', 'D'], ['G', 'B'], ['G', 'D']], tambahan: [{ nama: 'P', di: [0.5, 0.5, 0] }] },
    pilihan: ['4 akar 6 cm', '4 akar 2 cm', '8 akar 2 cm', '4 akar 3 cm', '8 cm'],
    benar: 0,
    langkah: [
      'GB dan GD sama-sama diagonal sisi (8 akar 2), jadi segitiga GBD sama kaki dan kaki tegak lurus dari G jatuh di tengah BD, sebut P.',
      'GP dihitung dari segitiga GCP siku-siku di C: CP = setengah AC = 4 akar 2, CG = 8.',
      'GP² = 32 + 64 = 96, GP = 4 akar 6 cm, kira-kira 9,80.',
    ],
    jebakan: '8 akar 2 mengukur GB, ujung garisnya. 4 akar 2 hanya CP, lupa menaikkan ke G.',
    alasan: 'GP = akar 96 = 4 akar 6.',
  },
  {
    // cek: Math.abs(Math.hypot(6, 6) - 6 * Math.SQRT2) < 1e-9
    id: 'r43',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak antara garis AB dan garis HG?',
    gambar: { ...KUBUS, ruas: [['A', 'B'], ['H', 'G'], ['B', 'G']] },
    pilihan: ['6 cm', '6 akar 2 cm', '6 akar 3 cm', '12 cm', '3 akar 2 cm'],
    benar: 1,
    langkah: [
      'AB dan HG sejajar (sebidang di ABGH), jadi jaraknya tetap di sepanjang garis: ambil satu titik.',
      'Ambil B. Ruas dari B yang tegak lurus HG adalah BG (BG tegak lurus HG karena HG tegak lurus sisi kanan).',
      'BG diagonal sisi = 6 akar 2 cm.',
    ],
    jebakan: '6 mengukur satu rusuk saja, padahal HG beda tinggi DAN beda kedalaman dari AB; kedua selisih itu digabung lewat Pythagoras.',
    alasan: 'Jarak dua garis sejajar: BG = 6 akar 2.',
  },
  {
    // cek: Math.abs(Math.acos((0*0 + 1*(-1) + 1*1) / 2) / D - 90) < 1e-9
    id: 'r44',
    tingkat: 'sedang',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara garis BG dan garis DE?',
    gambar: { ...KUBUS, ruas: [['B', 'G'], ['D', 'E'], ['C', 'F']] },
    pilihan: ['30 derajat', '45 derajat', '60 derajat', '90 derajat', '0 derajat'],
    benar: 3,
    langkah: [
      'BG dan DE bersilangan. Geser DE sejajar dirinya ke CF (DE dan CF sejajar, keduanya diagonal sisi searah).',
      'BG dan CF adalah dua diagonal persegi BCGF; diagonal persegi saling tegak lurus.',
      'Sudutnya 90 derajat: bersilangan tegak lurus.',
    ],
    jebakan: '60 dipakai untuk dua diagonal sisi yang membentuk segitiga sama sisi (seperti AH dan AF); di sini setelah digeser keduanya diagonal SATU persegi, bukan dua persegi berbeda.',
    alasan: 'Setelah digeser: diagonal satu persegi, 90.',
  },

  /* ---------------------------- sulit ---------------------------- */
  {
    // cek: Math.abs(Math.atan(6 / (3 * Math.SQRT2)) / D - 54.74) < 0.01
    id: 'r17',
    tingkat: 'sedang',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara bidang BDG dan bidang alas ABCD?',
    gambar: { ...KUBUS, bidang: ['B', 'D', 'G'], ruas: [['C', 'G']], tambahan: [{ nama: 'P', di: [0.5, 0.5, 0] }] },
    pilihan: ['kira-kira 30 derajat', 'kira-kira 35,26 derajat', 'kira-kira 45 derajat', 'kira-kira 54,74 derajat', 'kira-kira 60 derajat'],
    benar: 3,
    langkah: [
      'Garis potong kedua bidang adalah BD. Ambil P di tengah BD.',
      'Di alas tarik PC, di bidang BDG tarik PG; keduanya tegak lurus BD dan bertumpu di P yang sama (materi 09).',
      'Segitiga PCG siku-siku di C: tan sudut = CG : PC = 6 : 3 akar 2 = akar 2. Sudutnya kira-kira 54,74 derajat.',
    ],
    jebakan: '35,26 adalah sudut GARIS AG terhadap alas, pelengkap dari jawaban ini. Yang ditanya sudut dua BIDANG, dan garis bantunya PG, bukan AG.',
    alasan: 'tan = akar 2: 54,74 derajat.',
  },
  {
    // cek: Math.abs(Math.hypot(6, 6) - 6 * Math.SQRT2) < 1e-9
    id: 'r18',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa panjang proyeksi diagonal ruang AG pada bidang alas ABCD?',
    gambar: { ...KUBUS, ruas: [['A', 'G'], ['A', 'C'], ['C', 'G']] },
    pilihan: ['6 cm', '6 akar 2 cm', '6 akar 3 cm', '3 akar 2 cm', '12 cm'],
    benar: 1,
    langkah: [
      'Proyeksi = bayangan tegak lurus. Bayangan A pada alas adalah A sendiri (sudah di alas).',
      'Bayangan G adalah C (G tepat di atas C).',
      'Proyeksinya AC = 6 akar 2 cm.',
    ],
    jebakan: '6 akar 3 menyebut panjang AG sendiri, bukan bayangannya; bayangan selalu lebih pendek dari garis miringnya.',
    alasan: 'Bayangan AG adalah AC.',
  },
  {
    // cek: Math.abs(Math.sqrt(16 + 4 + 16 - (6 / Math.SQRT2) ** 2) - Math.sqrt(18)) < 1e-9
    id: 'r19',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 4 cm. Titik P adalah titik tengah EH. Berapa jarak titik P ke garis CF? (Soal UAN 2003)',
    gambar: { ...KUBUS, ruas: [['C', 'F']], tambahan: [{ nama: 'P', di: [0, 0.5, 1] }] },
    pilihan: ['akar 8 cm', 'akar 12 cm', 'akar 14 cm', 'akar 18 cm', 'akar 20 cm'],
    benar: 3,
    langkah: [
      'Pasang koordinat: P(0, 2, 4), C(4, 4, 0), F(4, 0, 4).',
      'PC² = 16 + 4 + 16 = 36 dan PF² = 16 + 4 + 0 = 20, jadi segitiga PCF TIDAK sama kaki; kaki tegak lurusnya tidak di tengah CF.',
      'Jalan pintas luas: CF = 4 akar 2. Dari koordinat, jarak² = PC² - (bayangan PC pada CF)² = 36 - 18 = 18.',
      'Jaraknya akar 18 = 3 akar 2 cm.',
    ],
    jebakan: 'Kelima pilihan sengaja berbentuk akar yang mirip, jadi menebak dari bentuknya tidak menolong. akar 20 mengukur PF, ujung garisnya.',
    alasan: 'akar 18 = 3 akar 2.',
  },
  {
    // cek: Math.abs(Math.hypot(4, 4, 8) - 4 * Math.sqrt(6)) < 1e-9
    id: 'r20',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 8 cm. Berapa panjang proyeksi DE pada bidang BDHF? (Soal UN 2004)',
    gambar: { ...KUBUS, bidang: ['B', 'D', 'H', 'F'], ruas: [['D', 'E']], tambahan: [{ nama: 'Q', di: [0.5, 0.5, 1] }] },
    pilihan: ['2 akar 2 cm', '2 akar 6 cm', '4 akar 2 cm', '4 akar 6 cm', '8 akar 2 cm'],
    benar: 3,
    langkah: [
      'D sudah di bidang BDHF, jadi bayangannya D sendiri.',
      'Bayangan E adalah kaki tegak lurus dari E ke bidang itu, yaitu Q di tengah EG (EG tegak lurus bidang diagonal BDHF).',
      'DQ dari koordinat: D(0, 8, 0), Q(4, 4, 8). DQ² = 16 + 16 + 64 = 96, DQ = 4 akar 6 cm.',
    ],
    jebakan: '4 akar 2 adalah jarak E ke bidangnya (EQ), bukan panjang proyeksinya. 8 akar 2 adalah DE sendiri.',
    alasan: 'DQ = akar 96 = 4 akar 6.',
  },
  {
    // cek: Math.abs(Math.hypot(3, 3, 6) - 3 * Math.sqrt(6)) < 1e-9
    id: 'r21',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa panjang proyeksi AF pada bidang ACGE? (Soal EBTANAS 1999)',
    gambar: { ...KUBUS, bidang: ['A', 'C', 'G', 'E'], ruas: [['A', 'F']], tambahan: [{ nama: 'Q', di: [0.5, 0.5, 1] }] },
    pilihan: ['3 akar 2 cm', '3 akar 3 cm', '3 akar 6 cm', '6 akar 2 cm', '6 akar 3 cm'],
    benar: 2,
    langkah: [
      'A ada di bidang ACGE: bayangannya A sendiri.',
      'Bayangan F jatuh di Q, titik tengah FH (FH tegak lurus bidang diagonal ACGE).',
      'A(0, 0, 0), Q(3, 3, 6): AQ² = 9 + 9 + 36 = 54, AQ = 3 akar 6 cm, kira-kira 7,35.',
    ],
    jebakan: '3 akar 2 adalah jarak F ke bidang (FQ), bukan proyeksinya. 6 akar 2 adalah AF sendiri.',
    alasan: 'AQ = akar 54 = 3 akar 6.',
  },
  {
    // cek: Math.abs(Math.asin((6 / Math.SQRT2) / Math.hypot(6, 6)) / D - 30) < 1e-9
    id: 'r22',
    tingkat: 'sulit',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara garis AH dan bidang diagonal BDHF? (Soal UAN 2005)',
    gambar: { ...KUBUS, bidang: ['B', 'D', 'H', 'F'], ruas: [['A', 'H']], tambahan: [{ nama: 'P', di: [0.5, 0.5, 0] }] },
    pilihan: ['30 derajat', '45 derajat', '60 derajat', '75 derajat', '90 derajat'],
    benar: 0,
    langkah: [
      'Bayangan A pada bidang BDHF adalah P, titik tengah BD (AC tegak lurus bidang itu). H sudah di bidang.',
      'Segitiga APH siku-siku di P: AP = setengah diagonal alas = a akar 2 : 2, AH = a akar 2.',
      'sin sudut = AP : AH = 1 : 2, jadi sudutnya tepat 30 derajat.',
    ],
    jebakan: '45 melihat AH sebagai diagonal persegi ADHE dan berhenti di situ; yang ditanya sudut terhadap bidang BDHF, jadi bayangan AH harus dicari dulu.',
    alasan: 'sin = 1/2: 30 derajat.',
  },
  {
    // cek: Math.abs(Math.sqrt(9 + 36 - (3 / Math.SQRT2) ** 2) - 4.5 * Math.SQRT2) < 1e-9
    id: 'r23',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Titik M adalah titik tengah rusuk EF. Berapa jarak titik M ke garis BD?',
    gambar: { ...KUBUS, ruas: [['B', 'D']], tambahan: [{ nama: 'M', di: [0.5, 0, 1] }] },
    pilihan: ['3 akar 2 cm', '4,5 akar 2 cm', '6 cm', '3 akar 6 cm', '6 akar 2 cm'],
    benar: 1,
    langkah: [
      'Koordinat: M(3, 0, 6), B(6, 0, 0), D(0, 6, 0). MB² = 9 + 36 = 45, MD² = 9 + 36 + 36 = 81; tidak sama kaki.',
      'Arah BD adalah (-1, 1, 0) : akar 2. Bayangan BM pada arah itu panjangnya 3 : akar 2.',
      'Jarak² = MB² - bayangan² = 45 - 4,5 = 40,5. Jarak = akar 40,5 = 4,5 akar 2 cm, kira-kira 6,36.',
    ],
    jebakan: '3 akar 2 mengira kaki tegak lurusnya di tengah BD; M tidak sama jauh dari B dan D, jadi kakinya bergeser ke arah B.',
    alasan: 'akar 40,5 = 4,5 akar 2.',
  },
  {
    // cek: 6 === 6
    id: 'r24',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak antara garis AE dan garis BG?',
    gambar: { ...KUBUS, ruas: [['A', 'E'], ['B', 'G'], ['A', 'B']] },
    pilihan: ['3 cm', '3 akar 2 cm', '6 cm', '6 akar 2 cm', 'Tidak dapat dihitung karena bersilangan'],
    benar: 2,
    langkah: [
      'AE dan BG bersilangan, tetapi tetap punya jarak: panjang ruas yang tegak lurus KEDUANYA.',
      'AB tegak lurus AE (rusuk alas dan rusuk tegak) dan tegak lurus BG (AB tegak lurus sisi kanan).',
      'Jadi AB itulah ruasnya: 6 cm.',
    ],
    jebakan: 'Pilihan terakhir menggoda tetapi salah: bersilangan bukan berarti jaraknya tidak ada. 3 akar 2 memakai setengah diagonal tanpa alasan.',
    alasan: 'AB tegak lurus keduanya: 6.',
  },
  {
    // cek: Math.abs(Math.acos((1*0 + 0*1 + 1*1) / 2) / D - 60) < 1e-9
    id: 'r25',
    tingkat: 'sulit',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara garis AF dan garis BG?',
    gambar: { ...KUBUS, ruas: [['A', 'F'], ['B', 'G'], ['A', 'H'], ['F', 'H']] },
    pilihan: ['30 derajat', '45 derajat', '60 derajat', '75 derajat', '90 derajat'],
    benar: 2,
    langkah: [
      'Bersilangan: geser BG sejajar dirinya ke AH (BG dan AH sejajar, keduanya diagonal sisi searah).',
      'Sudut AF dan AH adalah sudut segitiga AFH yang sama sisi (tiga diagonal sisi).',
      'Sudutnya 60 derajat.',
    ],
    jebakan: '90 mengira dua diagonal sisi selalu tegak lurus; itu hanya kalau keduanya diagonal SATU persegi. Di sini beda persegi.',
    alasan: 'Setelah digeser: segitiga sama sisi, 60.',
  },
  {
    // cek: Math.abs(6 / Math.sqrt(3) - 2 * Math.sqrt(3)) < 1e-9
    id: 'r26',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak titik G ke bidang ACF?',
    gambar: { ...KUBUS, bidang: ['A', 'C', 'F'], ruas: [['B', 'H']] },
    pilihan: ['2 akar 3 cm', '3 akar 2 cm', '2 akar 6 cm', '4 akar 3 cm', '6 cm'],
    benar: 0,
    langkah: [
      'Bidang ACF memotong ketiga tetangga B (A, C, F). Diagonal ruang BH tegak lurus bidang itu; B berjarak sepertiga BH = 2 akar 3, dan H (ujung jauh) dua pertiga BH = 4 akar 3.',
      'G bukan B dan bukan H, jadi pasang koordinat. Bidang ACF: x - y - z = 0 (periksa: A, C(6, 6, 0), F(6, 0, 6) semuanya memberi 0).',
      'G(6, 6, 6): |6 - 6 - 6| : akar 3 = 6 : akar 3 = 2 akar 3 cm. Sama jauhnya dengan B (dan juga dengan D dan E): bidang ACF membelah kubus, dan keempat titik itu sama-sama satu "lapis" darinya.',
    ],
    jebakan: '4 akar 3 mengira G di ujung jauh; yang di ujung jauh BH adalah H, bukan G. 6 mengukur rusuk GC atau GF, yang miring terhadap bidangnya.',
    alasan: 'Koordinat: 6 : akar 3 = 2 akar 3.',
  },
  {
    // cek: Math.abs(Math.hypot(3, 3, 6) - 3 * Math.sqrt(6)) < 1e-9
    id: 'r45',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak titik H ke garis AC?',
    gambar: { ...KUBUS, ruas: [['A', 'C'], ['H', 'A'], ['H', 'C']], tambahan: [{ nama: 'P', di: [0.5, 0.5, 0] }] },
    pilihan: ['3 akar 6 cm', '3 akar 2 cm', '6 akar 2 cm', '3 akar 3 cm', '6 cm'],
    benar: 0,
    langkah: [
      'HA dan HC sama-sama diagonal sisi (6 akar 2): segitiga HAC sama kaki, kaki tegak lurusnya di P, tengah AC.',
      'H(0, 6, 6), P(3, 3, 0): HP² = 9 + 9 + 36 = 54.',
      'HP = 3 akar 6 cm, kira-kira 7,35. (Ini juga tinggi segitiga sama sisi HAC bersisi 6 akar 2.)',
    ],
    jebakan: '3 akar 2 hanya DP (di alas), lupa menaikkan ke H. 6 akar 2 mengukur HA, ujung garisnya.',
    alasan: 'HP = akar 54 = 3 akar 6.',
  },
  {
    // cek: Math.abs(Math.abs(3 + 0 - 6) / Math.SQRT2 - 1.5 * Math.SQRT2) < 1e-9
    id: 'r46',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Titik P adalah titik tengah AB. Berapa jarak titik P ke bidang BDHF?',
    gambar: { ...KUBUS, bidang: ['B', 'D', 'H', 'F'], tambahan: [{ nama: 'P', di: [0.5, 0, 0] }] },
    pilihan: ['1,5 akar 2 cm', '3 akar 2 cm', '3 cm', '1,5 cm', '2 akar 3 cm'],
    benar: 0,
    langkah: [
      'Bidang BDHF berdiri tegak di atas BD, jadi jarak P ke bidang = jarak P ke garis BD di alas.',
      'Segitiga PBD di alas: PB = 3, sudut PBD = 45 derajat (BD diagonal persegi).',
      'Jarak = PB × sin 45 = 3 × akar 2 : 2 = 1,5 akar 2 cm, kira-kira 2,12.',
    ],
    jebakan: '3 akar 2 adalah jarak A ke bidang itu (setengah diagonal); P di tengah AB, jadi jaraknya setengah dari jarak A.',
    alasan: 'Setengah dari 3 akar 2.',
  },
  {
    // cek: Math.abs(Math.atan(3 / Math.hypot(6, 6)) / D - 19.47) < 0.01
    id: 'r47',
    tingkat: 'sulit',
    pertanyaan: 'Balok ABCD.EFGH dengan AB = 6 cm, BC = 6 cm, dan AE = 3 cm. Berapa besar sudut antara diagonal ruang AG dan bidang alas ABCD?',
    gambar: { jenis: 'balok', ukuran: [6, 6, 3], ruas: [['A', 'G'], ['A', 'C'], ['C', 'G']] },
    pilihan: ['kira-kira 19,47 derajat', 'kira-kira 26,57 derajat', 'kira-kira 35,26 derajat', '45 derajat', '30 derajat'],
    benar: 0,
    langkah: [
      'Bayangan AG pada alas adalah AC = 6 akar 2 (alasnya persegi 6 × 6).',
      'Segitiga ACG siku-siku di C: tan sudut = CG : AC = 3 : 6 akar 2 = 1 : 2 akar 2, kira-kira 0,354.',
      'Sudutnya kira-kira 19,47 derajat.',
    ],
    jebakan: '35,26 adalah angka kubus (tinggi = rusuk). Balok ini pipih, tingginya setengah, jadi sudutnya jauh lebih landai. 26,57 memakai tan = 3 : 6 (bayangan rusuk, bukan diagonal alas).',
    alasan: 'tan = 3 : 6 akar 2: 19,47 derajat.',
  },
  {
    // cek: Math.abs(Math.abs(6 + 6 + 3 - 6) / Math.sqrt(3) - 3 * Math.sqrt(3)) < 1e-9
    id: 'r48',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Titik P adalah titik tengah rusuk CG. Berapa jarak titik P ke bidang BDE?',
    gambar: { ...KUBUS, bidang: ['B', 'D', 'E'], tambahan: [{ nama: 'P', di: [1, 1, 0.5] }], ruas: [['A', 'G']] },
    pilihan: ['3 akar 3 cm', '2 akar 3 cm', '4 akar 3 cm', '6 akar 3 cm', '3 akar 2 cm'],
    benar: 0,
    langkah: [
      'Bidang BDE tegak lurus diagonal ruang AG, dan memotongnya di sepertiga dari A (materi 06).',
      'Jarak sebuah titik ke bidang BDE = jarak titik itu ke titik potong tadi, diukur SEARAH AG. Pasang koordinat: bidang BDE adalah x + y + z = 6.',
      'P(6, 6, 3): |6 + 6 + 3 - 6| : akar 3 = 9 : akar 3 = 3 akar 3 cm, kira-kira 5,20.',
    ],
    jebakan: '2 akar 3 adalah jarak A (atau C) ke bidang itu; P lebih tinggi dari C, jadi lebih jauh. 4 akar 3 adalah jarak G, dan P di antara C dan G.',
    alasan: 'Koordinat: 9 : akar 3 = 3 akar 3.',
  },
  {
    // cek: Math.abs((Math.sqrt(3) / 4) * 72 - 18 * Math.sqrt(3)) < 1e-9
    id: 'r49',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa luas segitiga ACH?',
    gambar: { ...KUBUS, bidang: ['A', 'C', 'H'] },
    pilihan: ['18 akar 3 cm²', '36 cm²', '18 akar 2 cm²', '9 akar 3 cm²', '36 akar 3 cm²'],
    benar: 0,
    langkah: [
      'AC, CH, dan AH ketiganya diagonal sisi: segitiga ACH sama sisi bersisi 6 akar 2.',
      'Luas segitiga sama sisi bersisi s: (akar 3 : 4) × s². Di sini s² = 72.',
      'Luas = (akar 3 : 4) × 72 = 18 akar 3 cm², kira-kira 31,18.',
    ],
    jebakan: '36 memakai setengah × 6 akar 2 × 6 akar 2 seolah siku-siku; segitiga ACH sama sisi, bukan siku-siku (materi 08: sudutnya 60).',
    alasan: 'Sama sisi bersisi 6 akar 2: 18 akar 3.',
  },
  {
    // cek: Math.abs(Math.atan(4 / 4) / D - 45) < 1e-9
    id: 'r50',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 4 cm. Berapa besar sudut antara bidang ABGH dan bidang alas ABCD?',
    gambar: { ...KUBUS, bidang: ['A', 'B', 'G', 'H'], ruas: [['A', 'D'], ['A', 'H'], ['D', 'H']] },
    pilihan: ['30 derajat', '45 derajat', '60 derajat', 'kira-kira 35,26 derajat', 'kira-kira 54,74 derajat'],
    benar: 1,
    langkah: [
      'Garis potong kedua bidang: AB.',
      'Di alas tarik AD, di bidang ABGH tarik AH; keduanya tegak lurus AB dan bertumpu di A.',
      'Sudut DAH pada persegi ADHE: AH diagonalnya, jadi 45 derajat.',
    ],
    jebakan: '54,74 adalah sudut bidang BDG (bidang segitiga) terhadap alas; ABGH bidang diagonal, garis bantunya AH di satu persegi.',
    alasan: 'Sudut DAH = 45.',
  },
  {
    // cek: Math.abs(Math.atan(10 / Math.hypot(8, 6)) / D - 45) < 1e-9
    id: 'r51',
    tingkat: 'sulit',
    pertanyaan: 'Balok ABCD.EFGH dengan AB = 8 cm, BC = 6 cm, dan AE = 10 cm. Berapa besar sudut antara AG dan bidang alas ABCD?',
    gambar: { jenis: 'balok', ukuran: [8, 6, 10], ruas: [['A', 'G'], ['A', 'C'], ['C', 'G']] },
    pilihan: ['45 derajat', 'kira-kira 51,34 derajat', 'kira-kira 59,04 derajat', 'kira-kira 35,26 derajat', '30 derajat'],
    benar: 0,
    langkah: [
      'Bayangan AG pada alas: AC = akar (64 + 36) = 10 (tripel 6-8-10).',
      'Segitiga ACG siku-siku di C: tan sudut = CG : AC = 10 : 10 = 1.',
      'Sudutnya 45 derajat, walaupun baloknya bukan kubus: yang menentukan hanya tinggi dibanding diagonal alas.',
    ],
    jebakan: '51,34 memakai tan 10 : 8 dan 59,04 memakai tan 10 : 6, keduanya membandingkan tinggi dengan RUSUK alas, bukan dengan diagonal alas yang menjadi bayangan AG. 35,26 adalah angka kubus, tidak berlaku di sini.',
    alasan: 'tan = 10 : 10 = 1: 45 derajat.',
  },

  /* ------------------------ sangat sulit ------------------------- */
  {
    // cek: Math.abs(Math.hypot(8, 6, 4) - 2 * Math.sqrt(29)) < 1e-9
    id: 'r27',
    tingkat: 'sangat sulit',
    pertanyaan: 'Balok ABCD.EFGH mempunyai panjang 8 cm, lebar 6 cm, dan tinggi 4 cm. Berapa panjang diagonal ruang AG?',
    gambar: { jenis: 'balok', ukuran: [8, 6, 4], ruas: [['A', 'G'], ['A', 'C']] },
    pilihan: ['2 akar 29 cm', '10 cm', '4 akar 6 cm', '2 akar 26 cm', '18 cm'],
    benar: 0,
    langkah: [
      'Diagonal alas dulu: AC² = 8² + 6² = 100, AC = 10.',
      'Diagonal ruang: AG² = AC² + CG² = 100 + 16 = 116.',
      'AG = akar 116 = 2 akar 29 cm, kira-kira 10,77.',
    ],
    jebakan: '10 berhenti di diagonal alas, lupa menambahkan tingginya. 18 menjumlahkan ketiga ukuran.',
    alasan: 'akar (64 + 36 + 16) = 2 akar 29.',
  },
  {
    // cek: Math.abs(Math.atan(4 / 3) / D - 53.13) < 0.01
    id: 'r28',
    tingkat: 'sangat sulit',
    pertanyaan: 'Limas T.ABCD mempunyai alas persegi bersisi 6 cm dan tinggi 4 cm, dengan T tepat di atas titik potong diagonal alas (O). Berapa besar sudut antara bidang sisi TAB dan bidang alas?',
    gambar: { jenis: 'svg', viewBox: '0 0 460 230', isi: LIMAS_SVG },
    pilihan: ['kira-kira 33,69 derajat', 'kira-kira 41,81 derajat', 'kira-kira 48,19 derajat', 'kira-kira 53,13 derajat', 'kira-kira 56,31 derajat'],
    benar: 3,
    langkah: [
      'Garis potong bidang TAB dan alas: AB. Ambil M di tengah AB.',
      'Di alas tarik MO (panjang 3, setengah sisi), di bidang TAB tarik MT; keduanya tegak lurus AB.',
      'Segitiga TOM siku-siku di O: tan sudut = TO : OM = 4 : 3. Sudutnya kira-kira 53,13 derajat.',
    ],
    jebakan: '33,69 memakai tan 4 : 6, mengukur dari sudut alas (A), bukan dari tengah sisi (M); garis bantu harus tegak lurus garis potongnya.',
    alasan: 'tan = 4/3: 53,13 derajat.',
  },
  {
    // cek: Math.abs(Math.atan(6 / (3 * Math.SQRT2)) / D - 54.74) < 0.01
    id: 'r29',
    tingkat: 'sangat sulit',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara bidang ACF dan bidang alas ABCD?',
    gambar: { ...KUBUS, bidang: ['A', 'C', 'F'], ruas: [['B', 'F']], tambahan: [{ nama: 'P', di: [0.5, 0.5, 0] }] },
    pilihan: ['kira-kira 35,26 derajat', '45 derajat', 'kira-kira 54,74 derajat', '60 derajat', 'kira-kira 70,53 derajat'],
    benar: 2,
    langkah: [
      'Garis potong: AC. Ambil P di tengah AC.',
      'Di alas tarik PB (setengah diagonal, a akar 2 : 2), di bidang ACF tarik PF; keduanya tegak lurus AC.',
      'Segitiga PBF siku-siku di B: tan sudut = BF : PB = a : (a akar 2 : 2) = akar 2. Sudutnya kira-kira 54,74 derajat, sama dengan sudut bidang BDG terhadap alas.',
    ],
    jebakan: '35,26 adalah pelengkapnya, yaitu sudut diagonal ruang terhadap alas. 45 memakai BF : AB, garis bantu yang tidak tegak lurus AC.',
    alasan: 'tan = akar 2: 54,74.',
  },
  {
    // cek: Math.abs(8 * 6 / Math.hypot(8, 6) - 4.8) < 1e-9
    id: 'r30',
    tingkat: 'sangat sulit',
    pertanyaan: 'Balok ABCD.EFGH mempunyai panjang 8 cm, lebar 6 cm, dan tinggi 4 cm. Berapa jarak titik A ke bidang BDHF?',
    gambar: { jenis: 'balok', ukuran: [8, 6, 4], bidang: ['B', 'D', 'H', 'F'], ruas: [['B', 'D']] },
    pilihan: ['4,8 cm', '5 cm', '3,4 cm', '6,4 cm', '2,4 cm'],
    benar: 0,
    langkah: [
      'Bidang BDHF berdiri tegak di atas diagonal BD, jadi soalnya turun menjadi jarak A ke garis BD pada persegi panjang alas 8 × 6.',
      'BD = akar (64 + 36) = 10. Jalan pintas luas segitiga ABD: setengah × 8 × 6 = setengah × 10 × jarak.',
      'Jarak = 48 : 10 = 4,8 cm.',
    ],
    jebakan: '5 (setengah BD) hanya benar kalau alasnya PERSEGI; pada persegi panjang kaki tegak lurus dari A tidak jatuh di tengah BD.',
    alasan: '8 × 6 : 10 = 4,8.',
  },
  {
    // cek: Math.abs(Math.abs(0 + 0 - 3 - 6) / Math.sqrt(3) - 3 * Math.sqrt(3)) < 1e-9
    id: 'r31',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Titik M adalah titik tengah rusuk AE. Berapa jarak titik M ke bidang BDG?',
    gambar: { ...KUBUS, bidang: ['B', 'D', 'G'], tambahan: [{ nama: 'M', di: [0, 0, 0.5] }], ruas: [['A', 'G']] },
    pilihan: ['2 akar 3 cm', '3 akar 3 cm', '4 akar 3 cm', '3 akar 2 cm', '6 cm'],
    benar: 1,
    langkah: [
      'Bidang BDG tegak lurus diagonal ruang AG (dan CE). Pasang koordinat: bidang BDG adalah x + y - z = 6.',
      'M(0, 0, 3): |0 + 0 - 3 - 6| : akar 3 = 9 : akar 3 = 3 akar 3 cm, kira-kira 5,20.',
      'Periksa masuk akal: jarak A ke BDG = 6 : akar 3 = 2 akar 3, jarak E = 12 : akar 3 = 4 akar 3, dan M di tengah keduanya: 3 akar 3 tepat di antaranya.',
    ],
    jebakan: '2 akar 3 adalah jarak A, bukan M. Memeriksa "masuk akal atau tidak" seperti langkah 3 menangkap banyak salah hitung.',
    alasan: 'Koordinat: 9 : akar 3 = 3 akar 3.',
  },
  {
    // cek: Math.abs(Math.abs(6 - 0 + 6) / Math.sqrt(3) - 4 * Math.sqrt(3)) < 1e-9
    id: 'r32',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak titik F ke bidang ACH?',
    gambar: { ...KUBUS, bidang: ['A', 'C', 'H'], ruas: [['D', 'F']] },
    pilihan: ['2 akar 3 cm', '3 akar 3 cm', '4 akar 3 cm', '6 akar 3 cm', '3 akar 6 cm'],
    benar: 2,
    langkah: [
      'Bidang ACH memotong ketiga tetangga D; diagonal ruang DF tegak lurus bidang itu dan menembusnya di sepertiga dari D.',
      'F di ujung seberang DF: jaraknya dua pertiga DF = dua pertiga × 6 akar 3 = 4 akar 3 cm, kira-kira 6,93.',
      'Periksa koordinat: bidang ACH adalah x - y + z = 0; F(6, 0, 6) memberi 12 : akar 3 = 4 akar 3.',
    ],
    jebakan: '2 akar 3 adalah jarak D (sepertiga), ujung DF yang dekat. F di ujung yang jauh, jadi dua pertiga. Jangan tertukar ujungnya.',
    alasan: 'Dua pertiga diagonal ruang: 4 akar 3.',
  },
  {
    // cek: Math.abs(Math.abs(0 + 0 - 0 - 6) / Math.sqrt(6) - Math.sqrt(6)) < 1e-9
    id: 'r52',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Titik P adalah titik tengah rusuk CG. Berapa jarak titik A ke bidang yang melalui B, D, dan P?',
    gambar: { ...KUBUS, bidang: ['B', 'D', 'P'], tambahan: [{ nama: 'P', di: [1, 1, 0.5] }] },
    pilihan: ['akar 6 cm', '2 akar 6 cm', '3 akar 2 cm', '2 akar 3 cm', '3 cm'],
    benar: 0,
    langkah: [
      'Bidang BDP tidak bernama, jadi simetri kubus tidak langsung menolong. Pasang koordinat: B(6, 0, 0), D(0, 6, 0), P(6, 6, 3).',
      'Cari persamaan bidangnya: coba x + y - 2z = 6. Periksa: B memberi 6, D memberi 6, P memberi 6 + 6 - 6 = 6. Cocok.',
      'Jarak A(0, 0, 0): |0 - 6| : akar (1 + 1 + 4) = 6 : akar 6 = akar 6 cm, kira-kira 2,45.',
      'Cara tanpa koordinat: bidang BDP dan alas berpotongan di BD; dari A tarik tegak lurus ke garis potong bidang ACGE dengan BDP (garis dari M tengah BD ke P), lalu Pythagoras di segitiga AMP.',
    ],
    jebakan: '3 akar 2 adalah jarak A ke garis BD saja (di alas), belum ke bidang miringnya. 2 akar 3 adalah jarak A ke bidang BDG; P lebih rendah dari G, jadi bidangnya lebih landai dan A lebih dekat.',
    alasan: 'Koordinat: 6 : akar 6 = akar 6.',
  },
  {
    // cek: Math.abs(Math.acos(1 / 3) / D - 70.53) < 0.01
    id: 'r53',
    tingkat: 'sangat sulit',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara dua diagonal ruang AG dan BH?',
    gambar: { ...KUBUS, ruas: [['A', 'G'], ['B', 'H']] },
    pilihan: ['kira-kira 70,53 derajat', '60 derajat', 'kira-kira 54,74 derajat', 'kira-kira 35,26 derajat', '90 derajat'],
    benar: 0,
    langkah: [
      'AG dan BH berpotongan di pusat kubus O. Ambil rusuk a = 2 supaya OA = OB = akar 3 (setengah diagonal ruang) dan AB = 2.',
      'Aturan kosinus di segitiga AOB: cos sudut AOB = (3 + 3 - 4) : (2 × 3) = 1 : 3.',
      'Sudutnya kira-kira 70,53 derajat (sudut lancipnya; sudut tumpul di sebelahnya 109,47).',
    ],
    jebakan: '90 mengira dua diagonal ruang saling tegak lurus seperti diagonal persegi; kubus bukan persegi. 60 menebak dari "segitiga sama sisi" yang tidak ada di sini (OA = OB, tetapi AB berbeda).',
    alasan: 'cos = 1/3: 70,53 derajat.',
  },
  {
    // cek: Math.abs(Math.atan(3 / 6) / D - 26.57) < 0.01
    id: 'r54',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Titik P adalah titik tengah rusuk AE. Berapa besar sudut antara garis BP dan bidang alas ABCD?',
    gambar: { ...KUBUS, ruas: [['B', 'P'], ['A', 'B']], tambahan: [{ nama: 'P', di: [0, 0, 0.5] }] },
    pilihan: ['kira-kira 26,57 derajat', '30 derajat', '45 derajat', 'kira-kira 63,43 derajat', 'kira-kira 18,43 derajat'],
    benar: 0,
    langkah: [
      'Bayangan P pada alas adalah A (P tepat di atas A), jadi bayangan BP adalah BA.',
      'Segitiga BAP siku-siku di A: AP = 3, AB = 6, tan sudut = 3 : 6 = 0,5.',
      'Sudutnya kira-kira 26,57 derajat.',
    ],
    jebakan: '45 memakai titik E (tan 6 : 6), padahal P baru setengah tinggi. 63,43 adalah pelengkapnya (sudut BP terhadap rusuk tegak).',
    alasan: 'tan = 1/2: 26,57 derajat.',
  },
  {
    // cek: Math.abs(Math.acos(((-3)*3 + (-3)*3 + 6*6) / (Math.hypot(3,3,6) * Math.hypot(3,3,6))) / D - 70.53) < 0.01
    id: 'r55',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa besar sudut antara bidang BDE dan bidang BDG?',
    gambar: { ...KUBUS, bidang: ['B', 'D', 'G'], ruas: [['B', 'E'], ['D', 'E']], tambahan: [{ nama: 'M', di: [0.5, 0.5, 0] }] },
    pilihan: ['kira-kira 70,53 derajat', 'kira-kira 54,74 derajat', '60 derajat', 'kira-kira 35,26 derajat', '90 derajat'],
    benar: 0,
    langkah: [
      'Kedua bidang berpotongan di BD. Ambil M di tengah BD; ME di bidang BDE dan MG di bidang BDG, keduanya tegak lurus BD (segitiga BDE dan BDG sama kaki).',
      'ME = MG = akar (18 + 36) = 3 akar 6 (dari M(3, 3, 0) ke E(0, 0, 6) atau G(6, 6, 6)). EG = 6 akar 2.',
      'Aturan kosinus di segitiga EMG: cos = (54 + 54 - 72) : (2 × 54) = 36 : 108 = 1 : 3. Sudutnya kira-kira 70,53 derajat.',
    ],
    jebakan: '54,74 adalah sudut masing-masing bidang terhadap ALAS, bukan sudut keduanya satu sama lain. Keduanya condong ke arah berlawanan di atas BD (E ke kiri depan, G ke kanan belakang), jadi sudut di antaranya 180 - 2 × 54,74 = 70,53; aturan kosinus memberi angka yang sama.',
    alasan: 'cos = 1/3: 70,53 derajat.',
  },
  {
    // cek: Math.abs(Math.acos((4 * Math.SQRT2) / 8) / D - 45) < 1e-9
    id: 'r56',
    tingkat: 'sangat sulit',
    pertanyaan: 'Limas T.ABCD dengan alas persegi bersisi 8 cm dan semua rusuk tegaknya juga 8 cm (TA = TB = TC = TD = 8). Berapa besar sudut antara rusuk TA dan bidang alas?',
    gambar: { jenis: 'svg', viewBox: '0 0 460 230', isi: LIMAS_SVG },
    pilihan: ['45 derajat', '30 derajat', '60 derajat', 'kira-kira 35,26 derajat', 'kira-kira 54,74 derajat'],
    benar: 0,
    langkah: [
      'Semua rusuk tegak sama panjang, jadi T tepat di atas pusat alas O. Bayangan TA pada alas adalah AO.',
      'AO = setengah diagonal alas = 8 akar 2 : 2 = 4 akar 2.',
      'Segitiga TOA siku-siku di O: cos sudut = AO : TA = 4 akar 2 : 8 = akar 2 : 2. Sudutnya 45 derajat (tinggi TO = 4 akar 2 juga, sama dengan AO).',
    ],
    jebakan: '60 mengira segitiga TAB sama sisi memberi sudut 60 terhadap alas; 60 itu sudut TAB di bidang sisi, bukan sudut terhadap alas. Yang benar memakai bayangan AO, bukan AB.',
    alasan: 'cos = akar 2 / 2: 45 derajat.',
  },
  {
    // cek: Math.abs(Math.hypot(0, 6, 6) - 6 * Math.SQRT2) < 1e-9
    id: 'r57',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Titik P tengah rusuk AB dan titik Q tengah rusuk GH. Berapa panjang PQ?',
    gambar: { ...KUBUS, ruas: [['P', 'Q']], tambahan: [{ nama: 'P', di: [0.5, 0, 0] }, { nama: 'Q', di: [0.5, 1, 1] }] },
    pilihan: ['6 akar 2 cm', '6 akar 3 cm', '6 cm', '3 akar 6 cm', '9 cm'],
    benar: 0,
    langkah: [
      'Koordinat: P(3, 0, 0), Q(3, 6, 6). Selisihnya (0, 6, 6): tidak ada selisih ke arah x.',
      'PQ = akar (0 + 36 + 36) = 6 akar 2 cm. PQ ternyata sejajar dan sama panjang dengan diagonal sisi BG (dan AH).',
    ],
    jebakan: '6 akar 3 mengira PQ diagonal ruang karena "menyeberang" dari depan bawah ke belakang atas; P dan Q sama-sama di tengah (x = 3), jadi hanya dua arah yang dilewati.',
    alasan: 'Hanya dua arah: 6 akar 2.',
  },
  {
    // cek: Math.abs(Math.abs((6*0 + 6*(-1) + 0*1)) / Math.SQRT2 - 3 * Math.SQRT2) < 1e-9
    id: 'r58',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak antara garis bersilangan AG dan CD?',
    gambar: { ...KUBUS, ruas: [['A', 'G'], ['C', 'D']], bidang: ['A', 'B', 'G', 'H'] },
    pilihan: ['3 akar 2 cm', '6 cm', '2 akar 6 cm', '3 akar 3 cm', '6 akar 2 cm'],
    benar: 0,
    langkah: [
      'Jarak dua garis bersilangan = jarak salah satu garis ke bidang yang memuat garis lainnya DAN sejajar garis pertama.',
      'AG terletak di bidang diagonal ABGH, dan CD sejajar AB, jadi CD sejajar bidang ABGH.',
      'Jarak CD ke bidang ABGH = jarak C ke bidang itu = jarak C ke garis BG di sisi BCGF = setengah diagonal sisi = 3 akar 2 cm.',
    ],
    jebakan: '6 mengukur rusuk CG atau BC, yang tidak tegak lurus AG. 3 akar 3 memakai sepertiga diagonal ruang, rumus untuk bidang BDE, yang tidak ada di sini.',
    alasan: 'Lewat bidang ABGH: 3 akar 2.',
  },
  {
    // cek: Math.abs(Math.atan(3 / (3 * Math.SQRT2)) / D - 35.26) < 0.01
    id: 'r59',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Titik P adalah titik tengah rusuk CG. Berapa besar sudut antara bidang BDP dan bidang alas ABCD?',
    gambar: { ...KUBUS, bidang: ['B', 'D', 'P'], tambahan: [{ nama: 'P', di: [1, 1, 0.5] }, { nama: 'M', di: [0.5, 0.5, 0] }], ruas: [['M', 'C'], ['C', 'P']] },
    pilihan: ['kira-kira 35,26 derajat', '45 derajat', 'kira-kira 54,74 derajat', '30 derajat', 'kira-kira 26,57 derajat'],
    benar: 0,
    langkah: [
      'Garis potong: BD. Ambil M di tengah BD. Di alas tarik MC (setengah diagonal = 3 akar 2), di bidang BDP tarik MP; keduanya tegak lurus BD.',
      'Segitiga MCP siku-siku di C: CP = 3 (setengah rusuk).',
      'tan sudut = CP : MC = 3 : 3 akar 2 = 1 : akar 2. Sudutnya kira-kira 35,26 derajat.',
    ],
    jebakan: '54,74 adalah sudut bidang BDG (P di G, CP = 6). Dengan P di tengah CG, tangennya separuh, jadi sudutnya lebih landai. Angkanya kebetulan sama dengan sudut AG terhadap alas, tetapi alasannya berbeda.',
    alasan: 'tan = 1/akar 2: 35,26.',
  },
  {
    // cek: Math.abs(Math.abs(0 + 0 - 3) / Math.SQRT2 - 1.5 * Math.SQRT2) < 1e-9
    id: 'r60',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 3 cm. Berapa jarak titik A ke bidang diagonal CDEF?',
    gambar: { ...KUBUS, bidang: ['C', 'D', 'E', 'F'], ruas: [['A', 'D'], ['A', 'E'], ['D', 'E']] },
    pilihan: ['1,5 akar 2 cm', '3 akar 2 cm', '3 cm', '1,5 cm', '1,5 akar 3 cm'],
    benar: 0,
    langkah: [
      'Bidang CDEF memotong sisi kiri ADHE di DE (diagonalnya) dan berdiri tegak lurus sisi itu (CD tegak lurus sisi kiri).',
      'Jadi jarak A ke bidang CDEF = jarak A ke garis DE di dalam persegi ADHE.',
      'Segitiga ADE siku-siku sama kaki (3, 3, 3 akar 2): jarak = setengah diagonal = 1,5 akar 2 cm, kira-kira 2,12.',
    ],
    jebakan: '3 mengukur AD atau AE, ruas miring terhadap bidang CDEF. 1,5 akar 3 mencampur dengan rumus sepertiga diagonal ruang.',
    alasan: 'Setengah diagonal sisi: 1,5 akar 2.',
  },
]
