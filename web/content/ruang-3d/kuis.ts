/**
 * Bank soal latihan Ruang Tiga Dimensi: 60 soal, 15 tiap tingkat.
 *
 * 14 Sep 2026: seluruh pembahasan ditulis ulang meniru cara mathcyber1997
 * (ARYA menolak versi sebelumnya yang berbentuk potongan catatan dan
 * mengulang gambar soal). Polanya, dari catatan belajar
 * `PELAJARI BENTUK SOAL MATEMATIKA/CATATAN-BELAJAR-PEMBAHASAN.md` bagian 4.2:
 * "Perhatikan sketsa gambar berikut." dengan kubus bergaris bantu dan titik
 * bantu BERNAMA, kalimat yang mengubah pertanyaan jadi ruas konkret
 * ("Misalkan O proyeksi P pada CF, jarak P ke CF adalah panjang PO"),
 * segitiga DICABUT dari kubus dan digambar datar dengan semua panjangnya,
 * teorema Pythagoras penuh, kesamaan luas segitiga, dan penutup
 * "Jadi, ... (Jawaban D)".
 *
 * Id soal lama dipertahankan. Delapan soal yang kembar atau terlalu tipis
 * diganti jenis yang belum ada (pola mathcyber1997, ditulis sendiri):
 * r06 dan r35 (diagonal ruang kembar) jadi r61 (diagonal bidang balok)
 * dan r62 (soal cerita lampu dan sakelar); r12 dan r40 (jarak = rusuk)
 * jadi r63 (titik pada perpanjangan rusuk) dan r64 (garis tinggi 5-12-13,
 * 60/13); r24 dan r26 jadi r65 (titik berperbandingan pada rusuk) dan r66
 * (jarak dua bidang sejajar AFH dan BDG); r27 dan r57 (terlalu mudah untuk
 * tingkatnya) jadi r67 (bidang empat beraturan) dan r68 (jarak dua garis
 * bersilangan AC dan HB lewat garis tinggi). Pilihan jawaban memakai
 * lambang √ dan °, bukan kata "akar" dan "derajat".
 *
 * Tiap jawaban berangka punya `// cek:` yang dihitung `alat/cek_kuis.mjs`;
 * `--ketat` juga memeriksa gaya pembahasannya.
 */
export type { TingkatKuis, SoalKuis } from '@/content/tipe'
import type { ButirKuisBab, SoalKuis } from '@/content/tipe'

export const KUIS: SoalKuis[] = [
  // ================================================================ MUDAH
  {
    // cek: Math.abs(Math.hypot(10, 10) - 10 * Math.SQRT2) < 1e-9
    id: 'r01',
    tingkat: 'mudah',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 10 cm. Berapa panjang diagonal sisi AC?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'C', '?']] },
    pilihan: ['10 cm', '10√3 cm', '20 cm', '100 cm', '10√2 cm'],
    benar: 4,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. AC adalah diagonal bidang alas ABCD, yaitu sisi miring segitiga ABC yang siku-siku di B.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'C', '?']], bidang: ['A', 'B', 'C', 'D'] },
      },
      {
        teks: 'Cabut segitiga ABC dari kubus dan gambar datar: AB = BC = 10 cm karena keduanya rusuk kubus.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'B', 'C'], panjang: [10, 10, 14.142], sisi: ['10 cm', '10 cm', '?'], siku: 1, sorot: 2 },
      },
      'Dengan menggunakan teorema Pythagoras, diperoleh AC = √(AB² + BC²) = √(10² + 10²) = √200 = √(100 · 2) = 10√2 cm.',
      'Secara umum, diagonal bidang kubus berusuk s panjangnya s√2.',
      'Jadi, panjang diagonal sisi AC adalah 10√2 cm. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 10√3 cm, adalah panjang diagonal RUANG (misalnya AG) yang menembus kubus, bukan diagonal bidang. Pilihan C, 20 cm, menjumlahkan AB + BC, seolah jalan terpendek dari A ke C menyusur rusuk.',
    alasan: 'Diagonal bidang kubus = s√2 = 10√2 cm (Pythagoras pada segitiga ABC).',
  },
  {
    // cek: Math.abs(Math.hypot(5, 5, 5) - 5 * Math.sqrt(3)) < 1e-9
    id: 'r02',
    tingkat: 'mudah',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 5 cm. Berapa panjang diagonal ruang AG?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'G', '?']] },
    pilihan: ['5√3 cm', '5√2 cm', '5√5 cm', '10 cm', '15 cm'],
    benar: 0,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. AG adalah diagonal ruang: ruas dari titik sudut A ke titik sudut G yang tidak sebidang dengannya. AG menjadi sisi miring segitiga ACG yang siku-siku di C, dengan AC diagonal bidang alas.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'G', '?']], bantu: [['A', 'C'], ['C', 'G']] },
      },
      'Pertama, hitung diagonal bidang AC dari segitiga ABC (siku-siku di B): AC = √(5² + 5²) = √50 = 5√2 cm.',
      {
        teks: 'Selanjutnya, tinjau segitiga ACG (siku-siku di C) dengan AC = 5√2 cm dan CG = 5 cm, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'C', 'G'], panjang: [7.071, 5, 8.66], sisi: ['5√2 cm', '5 cm', '?'], siku: 1, sorot: 2 },
      },
      'Dengan teorema Pythagoras, diperoleh AG = √(AC² + CG²) = √(50 + 25) = √75 = √(25 · 3) = 5√3 cm.',
      'Secara umum, diagonal ruang kubus berusuk s panjangnya s√3.',
      'Jadi, panjang diagonal ruang AG adalah 5√3 cm. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 5√2 cm, berhenti pada diagonal bidang AC; teorema Pythagoras harus dipakai dua kali. Pilihan C, 5√5 cm, menjumlahkan 25 + 100 karena AC keliru dianggap 10 cm.',
    alasan: 'Diagonal ruang kubus = s√3 = 5√3 cm (Pythagoras dua kali).',
  },
  {
    id: 'r03',
    tingkat: 'mudah',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan garis AB terhadap garis HG?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'B'], ['H', 'G']] },
    pilihan: ['Berpotongan', 'Bersilangan', 'Sejajar', 'Berimpit', 'Tegak lurus'],
    benar: 2,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. AB adalah rusuk alas, sedangkan HG adalah rusuk tutup yang tepat di atas rusuk DC. Keduanya sama-sama terletak pada bidang diagonal ABGH yang diarsir.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'B'], ['H', 'G']], bidang: ['A', 'B', 'G', 'H'] },
      },
      'Dua garis dikatakan sejajar bila keduanya terletak pada satu bidang dan tidak mempunyai titik persekutuan walaupun diperpanjang.',
      'Karena AB ∥ DC (sisi persegi ABCD) dan DC ∥ HG (sisi persegi DCGH), maka AB ∥ HG; keduanya sebidang pada ABGH dan tidak pernah berpotongan.',
      'Jadi, kedudukan garis AB terhadap garis HG adalah sejajar. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, bersilangan, menggoda karena AB dan HG tidak berada pada satu sisi kubus, padahal keduanya sebidang pada bidang diagonal ABGH. Bersilangan berarti tidak sejajar DAN tidak berpotongan, seperti AB dengan CG.',
    alasan: 'AB ∥ DC dan DC ∥ HG, jadi AB ∥ HG (sebidang pada ABGH, tak berpotongan).',
  },
  {
    id: 'r04',
    tingkat: 'mudah',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan garis AB terhadap garis CG?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'B'], ['C', 'G']] },
    pilihan: ['Berpotongan', 'Sejajar', 'Berimpit', 'Tidak dapat ditentukan', 'Bersilangan'],
    benar: 4,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. AB terletak pada bidang alas ABCD, sedangkan CG adalah rusuk tegak yang menembus bidang alas hanya di titik C, dan C tidak terletak pada garis AB.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'B'], ['C', 'G']], bidang: ['A', 'B', 'C', 'D'] },
      },
      'Dua garis disebut bersilangan bila tidak sejajar dan tidak berpotongan, yang berarti keduanya tidak dapat dimuat dalam satu bidang.',
      'AB tidak sejajar CG (AB mendatar, CG tegak) dan tidak berpotongan (satu-satunya titik CG pada bidang alas adalah C, dan C bukan titik pada AB). Untuk itu, AB dan CG bersilangan.',
      'Jadi, kedudukan garis AB terhadap garis CG adalah bersilangan. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, berpotongan, mengira dua garis yang tampak menyilang pada gambar benar-benar bertemu, padahal persilangan pada gambar hanyalah akibat proyeksi ke kertas. Pilihan D menyerah, padahal kedudukannya bisa ditentukan dari definisi.',
    alasan: 'AB dan CG tidak sejajar dan tidak berpotongan (tidak sebidang): bersilangan.',
  },
  {
    // cek: 7 === 7
    id: 'r05',
    tingkat: 'mudah',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 7 cm. Berapa jarak bidang alas ABCD ke bidang tutup EFGH?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['E', 'F', 'G', 'H'] },
    pilihan: ['7 cm', '3,5 cm', '7√2 cm', '7√3 cm', '14 cm'],
    benar: 0,
    langkah: [
      {
        teks: 'Jarak dua bidang sejajar adalah panjang ruas garis yang tegak lurus pada keduanya. Bidang alas ABCD dan bidang tutup EFGH sejajar, dan rusuk tegak AE tegak lurus pada keduanya, seperti sketsa berikut.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'E', '7 cm']], bidang: ['E', 'F', 'G', 'H'] },
      },
      'Panjang AE sama dengan panjang rusuk kubus, yaitu 7 cm.',
      'Jadi, jarak bidang alas ABCD ke bidang tutup EFGH adalah 7 cm. (Jawaban A)',
    ],
    jebakan: 'Pilihan C, 7√2 cm, dan pilihan D, 7√3 cm, adalah panjang diagonal, padahal jarak selalu diukur sepanjang ruas yang tegak lurus, yang paling pendek. Pilihan B, 3,5 cm, membagi dua tanpa alasan.',
    alasan: 'Jarak dua bidang sejajar diukur tegak lurus: rusuk AE = 7 cm.',
  },
  {
    // cek: Math.abs(Math.hypot(12, 5) - 13) < 1e-9
    id: 'r61',
    tingkat: 'mudah',
    pertanyaan: 'Balok ABCD.EFGH dengan AB = 12 cm, BC = 5 cm, dan AE = 4 cm. Berapa panjang diagonal bidang AC?',
    gambar: { jenis: 'balok', ukuran: [12, 5, 4], ruas: [['A', 'C', '?']] },
    pilihan: ['12 cm', '13 cm', '√185 cm', '17 cm', '4√10 cm'],
    benar: 1,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. AC adalah diagonal bidang alas ABCD yang berbentuk persegi panjang 12 cm × 5 cm, sehingga AC menjadi sisi miring segitiga ABC yang siku-siku di B.',
        gambar: { jenis: 'balok', ukuran: [12, 5, 4], ruas: [['A', 'C', '?']], bidang: ['A', 'B', 'C', 'D'] },
      },
      {
        teks: 'Cabut segitiga ABC dan gambar datar dengan AB = 12 cm dan BC = 5 cm.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'B', 'C'], panjang: [12, 5, 13], sisi: ['12 cm', '5 cm', '?'], siku: 1, sorot: 2 },
      },
      'Dengan teorema Pythagoras, diperoleh AC = √(12² + 5²) = √(144 + 25) = √169 = 13 cm.',
      'Jadi, panjang diagonal bidang AC adalah 13 cm. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, √185 cm, adalah diagonal ruang AG yang ikut memakai tinggi 4 cm, padahal AC hanya berada di alas. Pilihan D, 17 cm, menjumlahkan 12 + 5 seolah menyusur rusuk.',
    alasan: 'Segitiga ABC siku-siku di B: AC = √(144 + 25) = 13 cm.',
  },
  {
    id: 'r07',
    tingkat: 'mudah',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan garis AG terhadap bidang alas ABCD?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'G']], bidang: ['A', 'B', 'C', 'D'] },
    pilihan: ['Terletak pada bidang', 'Sejajar bidang', 'Tegak lurus bidang', 'Berimpit dengan bidang', 'Menembus bidang'],
    benar: 4,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Garis AG memuat titik A yang terletak pada bidang alas ABCD, sedangkan titik G berada di atas bidang alas (pada tutup). Proyeksi AG pada bidang alas adalah AC.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'G']], bantu: [['A', 'C'], ['C', 'G']], bidang: ['A', 'B', 'C', 'D'] },
      },
      'Sebuah garis dikatakan menembus (memotong) bidang bila keduanya mempunyai tepat satu titik persekutuan. Garis AG dan bidang ABCD hanya bersekutu di titik A.',
      'Garis AG tidak tegak lurus bidang alas, karena sudut antara AG dan proyeksinya AC bukan 90°; pada segitiga ACG, tan ∠GAC = CG/AC = s/(s√2) = 1/√2, bukan tak terdefinisi.',
      'Jadi, kedudukan garis AG terhadap bidang alas ABCD adalah menembus bidang. (Jawaban E)',
    ],
    jebakan: 'Pilihan C, tegak lurus bidang, menggoda karena AG "naik" dari alas, padahal AG miring; yang tegak lurus alas adalah rusuk AE. Pilihan A keliru karena hanya titik A yang terletak pada bidang, bukan seluruh garis.',
    alasan: 'AG bersekutu dengan alas hanya di A dan tidak tegak lurus: menembus.',
  },
  {
    id: 'r08',
    tingkat: 'mudah',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan garis EF terhadap bidang alas ABCD?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['E', 'F']], bidang: ['A', 'B', 'C', 'D'] },
    pilihan: ['Terletak pada bidang', 'Menembus bidang', 'Tegak lurus bidang', 'Sejajar bidang', 'Berpotongan di titik A'],
    benar: 3,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. EF adalah rusuk tutup yang tepat di atas rusuk AB, dan setiap titiknya berada setinggi rusuk kubus di atas bidang alas.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['E', 'F'], ['A', 'B']], bidang: ['A', 'B', 'C', 'D'] },
      },
      'Garis dikatakan sejajar bidang bila keduanya tidak mempunyai titik persekutuan, dan itu dipenuhi bila garis tersebut sejajar dengan salah satu garis pada bidang itu.',
      'Karena EF ∥ AB dan AB terletak pada bidang ABCD, sedangkan EF sendiri tidak terletak pada bidang ABCD, maka EF sejajar bidang ABCD.',
      'Jadi, kedudukan garis EF terhadap bidang alas ABCD adalah sejajar bidang. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, terletak pada bidang, menukar EF dengan AB. Pilihan E, berpotongan di titik A, keliru karena A bukan titik pada EF; A terletak tepat di bawah E.',
    alasan: 'EF ∥ AB dan AB ada di alas, sedangkan EF tidak: EF sejajar bidang alas.',
  },
  {
    id: 'r33',
    tingkat: 'mudah',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan bidang ABCD terhadap bidang EFGH?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['E', 'F', 'G', 'H'] },
    pilihan: ['Berpotongan', 'Berimpit', 'Bersilangan', 'Sejajar', 'Tegak lurus'],
    benar: 3,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Bidang alas ABCD dan bidang tutup EFGH dihubungkan oleh rusuk-rusuk tegak AE, BF, CG, DH yang sama panjang dan sejajar.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'E'], ['B', 'F'], ['C', 'G'], ['D', 'H']], bidang: ['E', 'F', 'G', 'H'] },
      },
      'Dua bidang dikatakan sejajar bila tidak mempunyai satu pun titik persekutuan. Setiap titik pada bidang tutup berada tepat sejauh rusuk kubus di atas bidang alas, sehingga keduanya tidak pernah berpotongan.',
      'Jadi, kedudukan bidang ABCD terhadap bidang EFGH adalah sejajar. (Jawaban D)',
    ],
    jebakan: 'Pilihan C, bersilangan, hanya berlaku untuk dua garis, bukan dua bidang; dua bidang hanya mungkin sejajar, berpotongan, atau berimpit. Pilihan E, tegak lurus, berlaku untuk alas dengan bidang sisi tegak seperti ABFE, bukan dengan tutupnya.',
    alasan: 'Alas dan tutup tidak pernah bertemu: sejajar.',
  },
  {
    // cek: Math.abs(Math.hypot(8, 8) - 8 * Math.SQRT2) < 1e-9
    id: 'r34',
    tingkat: 'mudah',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 8 cm. Berapa panjang BG?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['B', 'G', '?']] },
    pilihan: ['8√2 cm', '8 cm', '8√3 cm', '16 cm', '4√2 cm'],
    benar: 0,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. BG adalah diagonal bidang sisi BCGF, yaitu sisi miring segitiga BCG yang siku-siku di C.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['B', 'G', '?']], bidang: ['B', 'C', 'G', 'F'] },
      },
      {
        teks: 'Cabut segitiga BCG dan gambar datar: BC = CG = 8 cm karena keduanya rusuk kubus.',
        gambar: { jenis: 'segitiga-umum', titik: ['B', 'C', 'G'], panjang: [8, 8, 11.314], sisi: ['8 cm', '8 cm', '?'], siku: 1, sorot: 2 },
      },
      'Dengan teorema Pythagoras, diperoleh BG = √(8² + 8²) = √128 = √(64 · 2) = 8√2 cm.',
      'Jadi, panjang BG adalah 8√2 cm. (Jawaban A)',
    ],
    jebakan: 'Pilihan C, 8√3 cm, adalah diagonal ruang, padahal B dan G terletak pada satu bidang sisi. Pilihan E, 4√2 cm, membagi dua diagonal tanpa alasan; itu jarak pusat sisi ke titik sudutnya.',
    alasan: 'BG diagonal bidang sisi BCGF = 8√2 cm.',
  },
  {
    // cek: Math.abs(Math.hypot(3, 2, 3) - Math.sqrt(22)) < 1e-9
    id: 'r62',
    tingkat: 'mudah',
    pertanyaan: 'Sebuah ruangan berbentuk balok berukuran panjang 6 m, lebar 4 m, dan tinggi 3 m. Lampu dipasang tepat di pusat langit-langit, dan sakelar berada di salah satu pojok lantai. Berapa jarak lampu ke sakelar?',
    gambar: { jenis: 'balok', ukuran: [6, 4, 3], tambahan: [{ nama: 'L', di: [0.5, 0.5, 1] }], ruas: [['A', 'L', '?']] },
    pilihan: ['√13 m', '√22 m', '5 m', '√34 m', '7 m'],
    benar: 1,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Misalkan ruangan itu balok ABCD.EFGH dengan AB = 6 m, BC = 4 m, dan AE = 3 m; sakelar di pojok A, lampu L di pusat tutup EFGH, dan O titik tepat di bawah L pada lantai, yaitu pusat alas ABCD.',
        gambar: { jenis: 'balok', ukuran: [6, 4, 3], tambahan: [{ nama: 'L', di: [0.5, 0.5, 1] }, { nama: 'O', di: [0.5, 0.5, 0] }], ruas: [['A', 'L', '?']], bantu: [['A', 'O'], ['O', 'L', '3 m']] },
      },
      'Pertama, hitung AO pada lantai. Titik O berada 3 m dari dinding kiri (setengah panjang) dan 2 m dari dinding depan (setengah lebar), sehingga dengan teorema Pythagoras AO = √(3² + 2²) = √13 m.',
      {
        teks: 'Selanjutnya, tinjau segitiga AOL (siku-siku di O) dengan AO = √13 m dan OL = 3 m (tinggi ruangan), seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'O', 'L'], panjang: [3.606, 3, 4.69], sisi: ['√13 m', '3 m', '?'], siku: 1, sorot: 2 },
      },
      'Dengan teorema Pythagoras, diperoleh AL = √(AO² + OL²) = √(13 + 9) = √22 m ≈ 4,69 m.',
      'Jadi, jarak lampu ke sakelar adalah √22 m. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, √13 m, hanya jarak mendatar dari sakelar ke titik di bawah lampu; tingginya belum diperhitungkan. Pilihan D, √34 m, memakai ukuran penuh 3, 4, 3, padahal lampu di pusat sehingga jarak mendatarnya setengah panjang dan setengah lebar.',
    alasan: 'AO = √(3² + 2²) = √13, lalu AL = √(13 + 3²) = √22 m.',
  },
  {
    // cek: 9 === 9
    id: 'r36',
    tingkat: 'mudah',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 9 cm. Berapa jarak titik E ke garis AB?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'B']] },
    pilihan: ['9√2 cm', '9√3 cm', '9 cm', '4,5 cm', '18 cm'],
    benar: 2,
    langkah: [
      'Jarak titik ke garis adalah panjang ruas dari titik itu yang tegak lurus pada garis tersebut.',
      {
        teks: 'Perhatikan sketsa berikut. Rusuk EA tegak lurus bidang alas, sehingga tegak lurus pula pada garis AB yang terletak di alas. Dengan demikian, kaki tegak lurus dari E ke AB adalah titik A, dan jarak yang dicari adalah panjang EA.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['E', 'A', '9 cm'], ['A', 'B']], bidang: ['A', 'B', 'F', 'E'] },
      },
      'Panjang EA sama dengan rusuk kubus, yaitu 9 cm.',
      'Jadi, jarak titik E ke garis AB adalah 9 cm. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 9√2 cm, adalah panjang EB, ruas miring dari E ke ujung garis, bukan ruas yang tegak lurus. Pilihan D, 4,5 cm, mengira jarak diukur ke titik tengah AB.',
    alasan: 'EA ⟂ AB, jadi jaraknya panjang rusuk EA = 9 cm.',
  },
  {
    id: 'r37',
    tingkat: 'mudah',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan garis AE terhadap bidang alas ABCD?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'E']], bidang: ['A', 'B', 'C', 'D'] },
    pilihan: ['Tegak lurus bidang', 'Sejajar bidang', 'Terletak pada bidang', 'Bersilangan dengan bidang', 'Tidak dapat ditentukan'],
    benar: 0,
    langkah: [
      'Sebuah garis tegak lurus pada bidang bila garis itu tegak lurus pada dua garis berpotongan yang terletak di bidang tersebut.',
      {
        teks: 'Perhatikan sketsa berikut. AE tegak lurus AB (sisi persegi ABFE) dan tegak lurus AD (sisi persegi ADHE); AB dan AD berpotongan di A dan keduanya terletak pada bidang alas.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'E']], bantu: [['A', 'B'], ['A', 'D']], bidang: ['A', 'B', 'C', 'D'] },
      },
      'Karena AE tegak lurus pada dua garis berpotongan di bidang alas, maka AE tegak lurus bidang ABCD.',
      'Jadi, kedudukan garis AE terhadap bidang alas ABCD adalah tegak lurus bidang. (Jawaban A)',
    ],
    jebakan: 'Pilihan D, bersilangan dengan bidang, memakai istilah untuk dua garis; garis dan bidang hanya bisa sejajar, terletak, atau menembus (termasuk tegak lurus). Pilihan C keliru karena hanya titik A yang ada di alas.',
    alasan: 'AE ⟂ AB dan AE ⟂ AD (dua garis berpotongan di alas), jadi AE ⟂ bidang alas.',
  },
  {
    id: 'r38',
    tingkat: 'mudah',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan bidang ABFE terhadap bidang BCGF?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['A', 'B', 'F', 'E'], ruas: [['B', 'F']] },
    pilihan: ['Berpotongan pada garis BF', 'Sejajar', 'Berimpit', 'Berpotongan pada garis AB', 'Bersilangan'],
    benar: 0,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Bidang ABFE adalah sisi depan dan bidang BCGF adalah sisi kanan kubus. Kedua bidang mempunyai titik persekutuan B dan F, sehingga keduanya berpotongan sepanjang garis BF.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'C', 'G', 'F'], ruas: [['B', 'F']], bantu: [['A', 'B'], ['A', 'E'], ['E', 'F']] },
      },
      'Dua bidang yang tidak sejajar dan tidak berimpit selalu berpotongan pada sebuah garis, dan garis itu memuat semua titik persekutuan keduanya.',
      'Garis AB bukan perpotongannya karena A tidak terletak pada bidang BCGF.',
      'Jadi, bidang ABFE dan bidang BCGF berpotongan pada garis BF. (Jawaban A)',
    ],
    jebakan: 'Pilihan D, berpotongan pada garis AB, keliru karena A bukan titik pada bidang BCGF. Pilihan E, bersilangan, adalah istilah untuk dua garis, bukan dua bidang.',
    alasan: 'Sisi depan dan sisi kanan bertemu pada rusuk BF.',
  },
  {
    // cek: 6 === 6
    id: 'r39',
    tingkat: 'mudah',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak titik B ke bidang ADHE?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['A', 'D', 'H', 'E'] },
    pilihan: ['6√2 cm', '6√3 cm', '3 cm', '12 cm', '6 cm'],
    benar: 4,
    langkah: [
      'Jarak titik ke bidang adalah panjang ruas dari titik itu yang tegak lurus pada bidang tersebut.',
      {
        teks: 'Perhatikan sketsa berikut. Rusuk BA tegak lurus bidang ADHE (BA ⟂ AD dan BA ⟂ AE, dua garis berpotongan pada bidang itu), sehingga proyeksi B pada bidang ADHE adalah titik A dan jarak yang dicari adalah panjang BA.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['A', 'D', 'H', 'E'], ruas: [['B', 'A', '6 cm']] },
      },
      'Panjang BA sama dengan rusuk kubus, yaitu 6 cm.',
      'Jadi, jarak titik B ke bidang ADHE adalah 6 cm. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 6√2 cm, adalah panjang BE atau BD, ruas miring ke titik lain pada bidang, bukan ruas tegak lurusnya. Pilihan C, 3 cm, mengira bidang ADHE berada di tengah kubus.',
    alasan: 'BA ⟂ bidang ADHE, jadi jaraknya rusuk BA = 6 cm.',
  },
  // =============================================================== SEDANG
  {
    // cek: Math.abs(Math.hypot(6, 6) / 2 - 3 * Math.SQRT2) < 1e-9
    id: 'r09',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak titik B ke garis AC?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'C']] },
    pilihan: ['3 cm', '6 cm', '6√2 cm', '2√6 cm', '3√2 cm'],
    benar: 4,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Misalkan P titik potong diagonal AC dan BD. Kedua diagonal persegi ABCD saling tegak lurus dan berpotongan di tengah, sehingga BP ⟂ AC dan jarak titik B ke garis AC adalah panjang BP.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['B', 'P', '?']], bantu: [['A', 'C'], ['B', 'D']], tambahan: [{ nama: 'P', di: [0.5, 0.5, 0] }], bidang: ['A', 'B', 'C', 'D'] },
      },
      'Diagonal bidang BD = 6√2 cm, karena diagonal persegi bersisi s panjangnya s√2.',
      'Untuk itu, BP = (1/2) BD = (1/2)(6√2) = 3√2 cm.',
      {
        teks: 'Sebagai pemeriksaan, tinjau segitiga ABP (siku-siku di P) dengan AP = BP = 3√2 cm: AB = √(18 + 18) = √36 = 6 cm, sesuai rusuk kubus.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'B', 'P'], panjang: [6, 4.243, 4.243], sisi: ['6 cm', '3√2 cm', '3√2 cm'], siku: 2, sorot: 1 },
      },
      'Jadi, jarak titik B ke garis AC adalah 3√2 cm. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 6 cm, mengambil panjang rusuk AB, padahal AB tidak tegak lurus AC. Pilihan C, 6√2 cm, adalah panjang seluruh diagonal, bukan setengahnya.',
    alasan: 'Diagonal persegi saling tegak lurus di tengah: BP = (1/2)(6√2) = 3√2 cm.',
  },
  {
    // cek: Math.abs(6 / Math.sqrt(3) - 2 * Math.sqrt(3)) < 1e-9
    id: 'r10',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak titik A ke bidang BDE?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'E'] },
    pilihan: ['3√2 cm', '2√6 cm', '2√3 cm', '6 cm', '6√3 cm'],
    benar: 2,
    langkah: [
      {
        teks: 'Perhatikan sketsa gambar berikut. Misalkan J titik tengah BD dan K titik tembus diagonal ruang AG pada bidang BDE. Diagonal AG tegak lurus bidang BDE, sehingga jarak titik A ke bidang BDE sama dengan panjang AK.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'E'], bantu: [['A', 'G'], ['E', 'J']], tambahan: [{ nama: 'J', di: [0.5, 0.5, 0] }, { nama: 'K', di: [0.333, 0.333, 0.333] }], ruas: [['A', 'K', '?']] },
      },
      'Pertama, tinjau segitiga AJE (siku-siku di A). Diketahui AE = 6 cm dan AJ = 3√2 cm karena merupakan setengah dari panjang diagonal bidang AC = 6√2 cm.',
      {
        teks: 'Dengan teorema Pythagoras, diperoleh JE = √(AJ² + AE²) = √(18 + 36) = √54 = 3√6 cm. Titik K terletak pada JE, sehingga AK adalah garis tinggi segitiga AJE dari titik A, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['J', 'E', 'A'], panjang: [7.348, 6, 4.243], sisi: ['3√6 cm', '6 cm', '3√2 cm'], siku: 2, tinggi: { dari: 2, label: '?', kaki: 'K' }, sorot: 'tinggi' },
      },
      'Dengan menggunakan prinsip kesamaan luas segitiga pada △AJE, diperoleh (1/2) × AJ × AE = (1/2) × JE × AK, sehingga 3√2 × 6 = 3√6 × AK.',
      'Untuk itu, AK = 18√2/(3√6) = 6/√3 = 2√3 cm.',
      'Sebagai jalan pintas, jarak titik sudut kubus ke bidang yang melalui ketiga titik sudut tetangganya selalu sepertiga diagonal ruang, yaitu (1/3)s√3 = (1/3)(6√3) = 2√3 cm.',
      'Jadi, jarak titik A ke bidang BDE adalah 2√3 cm. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 3√2 cm, adalah AJ, jarak A ke garis BD, bukan ke bidangnya; bidang BDE miring sehingga jaraknya lebih pendek lagi. Pilihan D, 6 cm, mengambil rusuk AE, padahal AE tidak tegak lurus bidang BDE.',
    alasan: 'AG ⟂ BDE; kesamaan luas segitiga AJE memberi AK = 6/√3 = 2√3 cm.',
  },
  {
    // cek: Math.abs(Math.acos(((0)*(1) + (1)*(0) + (1)*(1)) / 2) / D - 60) < 1e-9
    id: 'r11',
    tingkat: 'sedang',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara garis AH dan garis AF?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'H'], ['A', 'F']] },
    pilihan: ['30°', '60°', '45°', '90°', '120°'],
    benar: 1,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. AH, AF, dan FH ketiganya diagonal bidang kubus, sehingga sama panjang, yaitu s√2. Tarik FH supaya terbentuk segitiga AFH.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'H'], ['A', 'F']], bantu: [['F', 'H']], bidang: ['A', 'F', 'H'] },
      },
      {
        teks: 'Segitiga AFH sama sisi karena ketiga sisinya s√2, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'F', 'H'], panjang: [1.414, 1.414, 1.414], sisi: ['s√2', 's√2', 's√2'], sudut: [{ di: 0, label: '?' }] },
      },
      'Setiap sudut segitiga sama sisi besarnya 180°/3 = 60°. Sudut antara garis AH dan AF adalah ∠FAH pada segitiga itu.',
      'Jadi, besar sudut antara garis AH dan garis AF adalah 60°. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, 45°, adalah sudut antara diagonal bidang dengan rusuk (misalnya AF dengan AB), bukan antara dua diagonal bidang. Pilihan D, 90°, mengira dua diagonal pada sisi berbeda selalu tegak lurus.',
    alasan: 'AFH segitiga sama sisi (tiga diagonal bidang), sudutnya 60°.',
  },
  {
    // cek: Math.abs(Math.hypot(6, 8) - 10) < 1e-9
    id: 'r63',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Titik P terletak pada perpanjangan rusuk DC sehingga DC : CP = 3 : 1. Berapa jarak titik P ke garis AE?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], tambahan: [{ nama: 'P', di: [1.333, 1, 0] }], bantu: [['C', 'P']], ruas: [['A', 'E']] },
    pilihan: ['6√2 cm', '10 cm', '2√13 cm', '8 cm', '2√10 cm'],
    benar: 1,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Karena DC : CP = 3 : 1, maka CP = (1/3)(6) = 2 cm dan DP = DC + CP = 8 cm. Garis AE tegak lurus bidang alas, sedangkan P terletak pada bidang alas, sehingga jarak P ke garis AE sama dengan jarak P ke titik A, yaitu panjang AP.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], tambahan: [{ nama: 'P', di: [1.333, 1, 0] }], bantu: [['C', 'P']], ruas: [['A', 'P', '?'], ['A', 'E']], bidang: ['A', 'B', 'C', 'D'] },
      },
      {
        teks: 'Tinjau segitiga ADP (siku-siku di D) dengan AD = 6 cm dan DP = 8 cm, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'D', 'P'], panjang: [6, 8, 10], sisi: ['6 cm', '8 cm', '?'], siku: 1, sorot: 2 },
      },
      'Dengan teorema Pythagoras, diperoleh AP = √(AD² + DP²) = √(36 + 64) = √100 = 10 cm.',
      'Jadi, jarak titik P ke garis AE adalah 10 cm. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 6√2 cm, adalah jarak C ke AE (diagonal alas), lupa bahwa P berada 2 cm di luar C. Pilihan D, 8 cm, hanya panjang DP; jarak ke AE harus diukur dari A, bukan dari D.',
    alasan: 'AE ⟂ alas, jadi jarak P ke AE = AP = √(6² + 8²) = 10 cm.',
  },
  {
    // cek: Math.abs(Math.atan(1 / Math.SQRT2) / D - 35.26) < 0.01
    id: 'r13',
    tingkat: 'sedang',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara diagonal ruang AG dan bidang alas ABCD?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'G']], bidang: ['A', 'B', 'C', 'D'] },
    pilihan: ['kira-kira 30°', 'kira-kira 45°', 'kira-kira 54,74°', 'kira-kira 60°', 'kira-kira 35,26°'],
    benar: 4,
    langkah: [
      {
        teks: 'Sudut antara garis dan bidang adalah sudut antara garis itu dengan proyeksinya pada bidang. Proyeksi AG pada bidang alas adalah AC (karena G tepat di atas C), sehingga sudut yang dicari adalah ∠GAC, seperti sketsa berikut.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'G']], bantu: [['A', 'C'], ['C', 'G']], bidang: ['A', 'B', 'C', 'D'] },
      },
      {
        teks: 'Misalkan rusuk kubus s. Tinjau segitiga ACG (siku-siku di C) dengan AC = s√2 (diagonal bidang) dan CG = s, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'C', 'G'], panjang: [1.414, 1, 1.732], sisi: ['s√2', 's', 's√3'], siku: 1, sudut: [{ di: 0, label: 'θ' }] },
      },
      'Dengan definisi tangen, tan θ = CG/AC = s/(s√2) = 1/√2 = (1/2)√2 ≈ 0,7071.',
      'Untuk itu, θ = arctan(0,7071) ≈ 35,26°.',
      'Jadi, besar sudut antara diagonal ruang AG dan bidang alas ABCD kira-kira 35,26°. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 45°, memakai segitiga dengan dua kaki sama (diagonal bidang dengan rusuk), padahal di sini kakinya s dan s√2. Pilihan C, 54,74°, adalah ∠AGC, sudut di puncak segitiga, bukan sudut di A.',
    alasan: 'tan θ = CG/AC = 1/√2, sehingga θ ≈ 35,26°.',
  },
  {
    // cek: Math.abs(12 / Math.sqrt(3) - 4 * Math.sqrt(3)) < 1e-9
    id: 'r14',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 12 cm. Berapa jarak titik C ke bidang BDG?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'G'] },
    pilihan: ['4√6 cm', '6√2 cm', '12 cm', '4√3 cm', '2√3 cm'],
    benar: 3,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Misalkan J titik tengah BD dan K titik tembus diagonal ruang CE pada bidang BDG. Diagonal CE tegak lurus bidang BDG, sehingga jarak titik C ke bidang BDG adalah panjang CK.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'G'], bantu: [['C', 'E'], ['G', 'J']], tambahan: [{ nama: 'J', di: [0.5, 0.5, 0] }, { nama: 'K', di: [0.667, 0.667, 0.333] }], ruas: [['C', 'K', '?']] },
      },
      'Pertama, tinjau segitiga CJG (siku-siku di C). Diketahui CG = 12 cm dan CJ = 6√2 cm karena merupakan setengah dari panjang diagonal bidang AC = 12√2 cm.',
      {
        teks: 'Dengan teorema Pythagoras, diperoleh JG = √(CJ² + CG²) = √(72 + 144) = √216 = 6√6 cm. Titik K terletak pada JG, sehingga CK adalah garis tinggi segitiga CJG dari C, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['J', 'G', 'C'], panjang: [14.697, 12, 8.485], sisi: ['6√6 cm', '12 cm', '6√2 cm'], siku: 2, tinggi: { dari: 2, label: '?', kaki: 'K' }, sorot: 'tinggi' },
      },
      'Dengan menggunakan prinsip kesamaan luas segitiga pada △CJG, diperoleh (1/2) × CJ × CG = (1/2) × JG × CK, sehingga 6√2 × 12 = 6√6 × CK.',
      'Untuk itu, CK = 72√2/(6√6) = 12/√3 = 4√3 cm.',
      'Sebagai jalan pintas, jarak titik sudut kubus ke bidang yang melalui ketiga titik sudut tetangganya selalu (1/3)s√3 = (1/3)(12√3) = 4√3 cm.',
      'Jadi, jarak titik C ke bidang BDG adalah 4√3 cm. (Jawaban D)',
    ],
    jebakan: 'Pilihan B, 6√2 cm, adalah CJ, jarak C ke garis BD, bukan ke bidang BDG yang miring. Pilihan C, 12 cm, mengambil rusuk CG yang tidak tegak lurus bidang BDG.',
    alasan: 'CE ⟂ BDG; kesamaan luas segitiga CJG memberi CK = 12/√3 = 4√3 cm.',
  },
  {
    id: 'r15',
    tingkat: 'sedang',
    pertanyaan: 'Pada kubus ABCD.EFGH, bagaimana kedudukan garis AC terhadap garis BG?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'C'], ['B', 'G']] },
    pilihan: ['Bersilangan', 'Berpotongan di B', 'Sejajar', 'Berimpit', 'Berpotongan di G'],
    benar: 0,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. AC adalah diagonal bidang alas ABCD, sedangkan BG adalah diagonal bidang sisi BCGF. Satu-satunya titik BG yang berada pada bidang alas adalah B, dan B tidak terletak pada garis AC.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'C'], ['B', 'G']], bidang: ['A', 'B', 'C', 'D'] },
      },
      'Untuk itu, AC dan BG tidak berpotongan. Keduanya juga tidak sejajar, karena AC mendatar sedangkan BG menanjak dari B ke G.',
      'Dua garis yang tidak berpotongan dan tidak sejajar tidak dapat dimuat dalam satu bidang; kedudukan seperti itu disebut bersilangan.',
      'Jadi, kedudukan garis AC terhadap garis BG adalah bersilangan. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, berpotongan di B, menggoda karena B adalah ujung BG dan terlihat dekat AC pada gambar, padahal B bukan titik pada garis AC (B dan AC hanya sebidang). Pilihan E keliru karena G berada di luar bidang alas.',
    alasan: 'AC dan BG tidak sejajar dan tidak berpotongan: bersilangan.',
  },
  {
    // cek: Math.abs(Math.sqrt(36 - 36 / 3) - 2 * Math.sqrt(6)) < 1e-9
    id: 'r16',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak titik E ke garis AG?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'G']] },
    pilihan: ['2√3 cm', '3√2 cm', '6 cm', '2√6 cm', '6√2 cm'],
    benar: 3,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Misalkan O proyeksi titik E pada garis AG, sehingga jarak E ke AG adalah panjang EO. Tarik EG supaya terbentuk segitiga AEG yang siku-siku di E (AE ⟂ bidang tutup, jadi AE ⟂ EG).',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'G']], bantu: [['A', 'E'], ['E', 'G']], tambahan: [{ nama: 'O', di: [0.333, 0.333, 0.333] }] },
      },
      {
        teks: 'Diketahui AE = 6 cm, EG = 6√2 cm (diagonal bidang tutup), dan AG = 6√3 cm (diagonal ruang). Gambar segitiga AEG datar dengan garis tinggi EO, seperti berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'G', 'E'], panjang: [10.392, 8.485, 6], sisi: ['6√3 cm', '6√2 cm', '6 cm'], siku: 2, tinggi: { dari: 2, label: '?', kaki: 'O' }, sorot: 'tinggi' },
      },
      'Dengan menggunakan prinsip kesamaan luas segitiga pada △AEG, diperoleh (1/2) × AE × EG = (1/2) × AG × EO, sehingga 6 × 6√2 = 6√3 × EO.',
      'Untuk itu, EO = 36√2/(6√3) = 6√2/√3 = 6√(2/3) = 2√6 cm.',
      'Jadi, jarak titik E ke garis AG adalah 2√6 cm. (Jawaban D)',
    ],
    jebakan: 'Pilihan C, 6 cm, adalah AE, ruas dari E ke ujung garis, bukan ruas yang tegak lurus AG. Pilihan B, 3√2 cm, mengira kaki O membagi AG jadi dua dan memakai setengah EG.',
    alasan: 'Kesamaan luas segitiga AEG: EO = AE × EG/AG = 6 × 6√2/(6√3) = 2√6 cm.',
  },
  {
    // cek: Math.abs(12 * 5 / 13 - 60 / 13) < 1e-9
    id: 'r64',
    tingkat: 'sedang',
    pertanyaan: 'Balok ABCD.EFGH dengan AB = 12 cm, BC = 5 cm, dan AE = 8 cm. Berapa jarak titik B ke garis AC?',
    gambar: { jenis: 'balok', ukuran: [12, 5, 8], ruas: [['A', 'C']] },
    pilihan: ['5 cm', '60/13 cm', '12 cm', '13/2 cm', '65/12 cm'],
    benar: 1,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Misalkan O proyeksi titik B pada diagonal AC, sehingga jarak B ke AC adalah panjang BO. Karena alasnya persegi panjang (bukan persegi), kaki O TIDAK berada di tengah AC.',
        gambar: { jenis: 'balok', ukuran: [12, 5, 8], ruas: [['B', 'O', '?']], bantu: [['A', 'C']], tambahan: [{ nama: 'O', di: [0.852, 0.852, 0] }], bidang: ['A', 'B', 'C', 'D'] },
      },
      {
        teks: 'Tinjau segitiga ABC (siku-siku di B) dengan AB = 12 cm dan BC = 5 cm. Dengan teorema Pythagoras, AC = √(144 + 25) = √169 = 13 cm. BO adalah garis tinggi dari B ke sisi miring AC, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'C', 'B'], panjang: [13, 5, 12], sisi: ['13 cm', '5 cm', '12 cm'], siku: 2, tinggi: { dari: 2, label: '?', kaki: 'O' }, sorot: 'tinggi' },
      },
      'Dengan menggunakan prinsip kesamaan luas segitiga pada △ABC, diperoleh (1/2) × AB × BC = (1/2) × AC × BO, sehingga 12 × 5 = 13 × BO.',
      'Untuk itu, BO = 60/13 cm ≈ 4,62 cm.',
      'Jadi, jarak titik B ke garis AC adalah 60/13 cm. (Jawaban B)',
    ],
    jebakan: 'Pilihan D, 13/2 cm, mengira kaki O di tengah AC seperti pada persegi; itu hanya berlaku bila AB = BC. Pilihan A, 5 cm, mengambil rusuk BC yang tidak tegak lurus AC.',
    alasan: 'Garis tinggi ke sisi miring: BO = AB × BC/AC = 60/13 cm.',
  },
  {
    // cek: Math.abs(Math.atan(6 / 6) / D - 45) < 1e-9
    id: 'r41',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa besar sudut antara garis AF dan bidang alas ABCD?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'F']], bidang: ['A', 'B', 'C', 'D'] },
    pilihan: ['30°', '60°', '45°', 'kira-kira 35,26°', '90°'],
    benar: 2,
    langkah: [
      {
        teks: 'Sudut antara garis dan bidang adalah sudut antara garis itu dengan proyeksinya pada bidang. Proyeksi F pada bidang alas adalah B, sehingga proyeksi AF adalah AB dan sudut yang dicari adalah ∠FAB, seperti sketsa berikut.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'F']], bantu: [['A', 'B'], ['B', 'F']], bidang: ['A', 'B', 'C', 'D'] },
      },
      {
        teks: 'Tinjau segitiga ABF (siku-siku di B) dengan AB = BF = 6 cm, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'B', 'F'], panjang: [6, 6, 8.485], sisi: ['6 cm', '6 cm', '6√2 cm'], siku: 1, sudut: [{ di: 0, label: 'θ' }] },
      },
      'Dengan definisi tangen, tan θ = BF/AB = 6/6 = 1, sehingga θ = 45°. (Segitiga siku-siku sama kaki selalu bersudut 45°.)',
      'Jadi, besar sudut antara garis AF dan bidang alas ABCD adalah 45°. (Jawaban C)',
    ],
    jebakan: 'Pilihan D, 35,26°, adalah sudut diagonal RUANG dengan alas, yang kakinya s dan s√2; di sini AF diagonal bidang dengan kaki s dan s. Pilihan E, 90°, mengira AF tegak lurus alas seperti rusuk AE.',
    alasan: 'Proyeksi AF pada alas adalah AB; segitiga ABF sama kaki, sudutnya 45°.',
  },
  {
    // cek: Math.abs(Math.hypot(8 - 4, 8 - 4, 8) - 4 * Math.sqrt(6)) < 1e-9
    id: 'r42',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 8 cm. Berapa jarak titik G ke garis BD?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['B', 'D']] },
    pilihan: ['4√2 cm', '8√2 cm', '4√3 cm', '4√6 cm', '8 cm'],
    benar: 3,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Misalkan P titik tengah BD (pusat alas). Segitiga BDG sama kaki dengan GB = GD (keduanya diagonal bidang), sehingga garis dari G ke tengah BD tegak lurus BD, dan jarak G ke BD adalah panjang GP.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['G', 'P', '?']], bantu: [['B', 'D'], ['C', 'P'], ['C', 'G'], ['G', 'B'], ['G', 'D']], tambahan: [{ nama: 'P', di: [0.5, 0.5, 0] }] },
      },
      {
        teks: 'Tinjau segitiga GCP (siku-siku di C, karena CG tegak lurus bidang alas). Diketahui CG = 8 cm dan CP = 4√2 cm (setengah diagonal bidang AC = 8√2 cm), seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['P', 'C', 'G'], panjang: [5.657, 8, 9.798], sisi: ['4√2 cm', '8 cm', '?'], siku: 1, sorot: 2 },
      },
      'Dengan teorema Pythagoras, diperoleh GP = √(CP² + CG²) = √(32 + 64) = √96 = √(16 · 6) = 4√6 cm.',
      'Jadi, jarak titik G ke garis BD adalah 4√6 cm. (Jawaban D)',
    ],
    jebakan: 'Pilihan B, 8√2 cm, adalah GB atau GD, ruas miring ke ujung garis, bukan ruas tegak lurusnya. Pilihan A, 4√2 cm, hanya CP, jarak mendatar di alas, tanpa memperhitungkan tinggi CG.',
    alasan: 'GP ⟂ BD; segitiga GCP: GP = √((4√2)² + 8²) = 4√6 cm.',
  },
  {
    // cek: Math.abs(Math.hypot(6, 6) - 6 * Math.SQRT2) < 1e-9
    id: 'r43',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak antara garis AB dan garis HG?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'B'], ['H', 'G']] },
    pilihan: ['6√2 cm', '6 cm', '6√3 cm', '12 cm', '3√2 cm'],
    benar: 0,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. AB dan HG sejajar (sebidang pada ABGH), sehingga jaraknya adalah panjang ruas yang tegak lurus pada keduanya. Ruas BG tegak lurus AB (AB ⟂ bidang BCGF) dan tegak lurus HG (HG ⟂ bidang BCGF pula), jadi jarak yang dicari adalah panjang BG.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'B'], ['H', 'G'], ['B', 'G', '?']], bidang: ['A', 'B', 'G', 'H'] },
      },
      {
        teks: 'BG adalah diagonal bidang sisi BCGF. Tinjau segitiga BCG (siku-siku di C) dengan BC = CG = 6 cm.',
        gambar: { jenis: 'segitiga-umum', titik: ['B', 'C', 'G'], panjang: [6, 6, 8.485], sisi: ['6 cm', '6 cm', '?'], siku: 1, sorot: 2 },
      },
      'Dengan teorema Pythagoras, diperoleh BG = √(36 + 36) = √72 = 6√2 cm.',
      'Jadi, jarak antara garis AB dan garis HG adalah 6√2 cm. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 6 cm, adalah jarak AB ke EF atau ke DC (rusuk yang bersebelahan), padahal HG berada di seberang, terpisah oleh lebar dan tinggi kubus. Pilihan C, 6√3 cm, adalah diagonal ruang, yang tidak tegak lurus pada AB.',
    alasan: 'AB ∥ HG; ruas tegak lurus keduanya adalah BG = 6√2 cm.',
  },
  {
    // cek: Math.abs(Math.acos((0*0 + 1*(-1) + 1*1) / 2) / D - 90) < 1e-9
    id: 'r44',
    tingkat: 'sedang',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara garis BG dan garis DE?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['B', 'G'], ['D', 'E']] },
    pilihan: ['30°', '45°', '60°', '0°', '90°'],
    benar: 4,
    langkah: [
      'Sudut antara dua garis bersilangan adalah sudut antara salah satu garis dengan garis lain yang sejajar garis kedua dan memotong garis pertama.',
      {
        teks: 'Perhatikan sketsa berikut. Geser DE ke bidang BCGF: DE sejajar CF, karena DE dan CF sama-sama diagonal bidang yang menghubungkan pojok bawah belakang ke pojok atas depan pada dua sisi yang sejajar (ADHE dan BCGF). Dengan demikian, sudut antara BG dan DE sama dengan sudut antara BG dan CF.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['B', 'G'], ['D', 'E']], bantu: [['C', 'F']], bidang: ['B', 'C', 'G', 'F'] },
      },
      'BG dan CF adalah dua diagonal persegi BCGF, dan diagonal persegi selalu saling tegak lurus.',
      'Jadi, besar sudut antara garis BG dan garis DE adalah 90°. (Jawaban E)',
    ],
    jebakan: 'Pilihan C, 60°, adalah sudut antara dua diagonal bidang yang bertemu di satu titik sudut (misalnya AF dan AH), bukan dua diagonal pada sisi yang sejajar. Pilihan D, 0°, mengira BG ∥ DE, padahal yang sejajar DE adalah CF.',
    alasan: 'DE ∥ CF, dan CF ⟂ BG (diagonal persegi BCGF): 90°.',
  },
  {
    // cek: Math.abs(Math.atan(6 / (3 * Math.SQRT2)) / D - 54.74) < 0.01
    id: 'r17',
    tingkat: 'sedang',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara bidang BDG dan bidang alas ABCD?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'G'] },
    pilihan: ['kira-kira 30°', 'kira-kira 35,26°', 'kira-kira 54,74°', 'kira-kira 45°', 'kira-kira 60°'],
    benar: 2,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Kedua bidang berpotongan pada garis BD. Misalkan P titik tengah BD. Pada bidang alas, CP ⟂ BD (diagonal persegi), dan pada bidang BDG, GP ⟂ BD (segitiga BDG sama kaki). Sudut antara kedua bidang adalah sudut antara kedua garis itu, yaitu ∠GPC.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'G'], bantu: [['C', 'P'], ['G', 'P'], ['C', 'G']], tambahan: [{ nama: 'P', di: [0.5, 0.5, 0] }] },
      },
      {
        teks: 'Misalkan rusuk kubus 6 cm. Tinjau segitiga GCP (siku-siku di C) dengan CG = 6 cm dan CP = 3√2 cm (setengah diagonal bidang), seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['P', 'C', 'G'], panjang: [4.243, 6, 7.348], sisi: ['3√2 cm', '6 cm', '3√6 cm'], siku: 1, sudut: [{ di: 0, label: 'θ' }] },
      },
      'Dengan definisi tangen, tan θ = CG/CP = 6/(3√2) = 2/√2 = √2 ≈ 1,414.',
      'Untuk itu, θ = arctan(1,414) ≈ 54,74°.',
      'Jadi, besar sudut antara bidang BDG dan bidang alas ABCD kira-kira 54,74°. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, 35,26°, adalah sudut diagonal ruang dengan alas (tan = 1/√2), kebalikan dari perbandingan di sini. Pilihan D, 45°, mengira CP sama panjang dengan CG, padahal CP hanya setengah diagonal.',
    alasan: 'Sudut bidang = ∠GPC dengan tan = CG/CP = √2, sekitar 54,74°.',
  },
  {
    // cek: Math.abs(Math.hypot(6, 6) - 6 * Math.SQRT2) < 1e-9
    id: 'r18',
    tingkat: 'sedang',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa panjang proyeksi diagonal ruang AG pada bidang alas ABCD?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'G']], bidang: ['A', 'B', 'C', 'D'] },
    pilihan: ['6 cm', '6√3 cm', '3√2 cm', '6√2 cm', '12 cm'],
    benar: 3,
    langkah: [
      {
        teks: 'Proyeksi sebuah ruas pada bidang diperoleh dengan memproyeksikan kedua ujungnya. Titik A sudah terletak pada bidang alas, sedangkan proyeksi G pada bidang alas adalah C (GC tegak lurus alas). Dengan demikian, proyeksi AG adalah AC, seperti sketsa berikut.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'G'], ['A', 'C', '?']], bantu: [['C', 'G']], bidang: ['A', 'B', 'C', 'D'] },
      },
      {
        teks: 'AC adalah diagonal persegi ABCD bersisi 6 cm. Tinjau segitiga ABC (siku-siku di B).',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'B', 'C'], panjang: [6, 6, 8.485], sisi: ['6 cm', '6 cm', '?'], siku: 1, sorot: 2 },
      },
      'Dengan teorema Pythagoras, diperoleh AC = √(36 + 36) = √72 = 6√2 cm.',
      'Jadi, panjang proyeksi diagonal ruang AG pada bidang alas adalah 6√2 cm. (Jawaban D)',
    ],
    jebakan: 'Pilihan B, 6√3 cm, adalah panjang AG sendiri; proyeksi selalu lebih pendek daripada ruas miringnya. Pilihan A, 6 cm, mengira bayangan AG hanya sepanjang satu rusuk.',
    alasan: 'Proyeksi G ke alas adalah C, jadi proyeksi AG = AC = 6√2 cm.',
  },
  // ================================================================ SULIT
  {
    // cek: Math.abs(Math.sqrt(16 + 4 + 16 - (6 / Math.SQRT2) ** 2) - Math.sqrt(18)) < 1e-9
    id: 'r19',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 4 cm. Titik P adalah titik tengah EH. Berapa jarak titik P ke garis CF? (Soal UAN 2003)',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['C', 'F']], tambahan: [{ nama: 'P', di: [0, 0.5, 1] }] },
    pilihan: ['√8 cm', '√12 cm', '√14 cm', '√20 cm', '√18 cm'],
    benar: 4,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Misalkan O proyeksi titik P pada garis CF, sehingga jarak P ke CF adalah panjang PO. Tarik PC dan PF supaya terbentuk segitiga PCF.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['C', 'F']], tambahan: [{ nama: 'P', di: [0, 0.5, 1] }, { nama: 'O', di: [1, 0.25, 0.75] }], bantu: [['P', 'C'], ['P', 'F'], ['P', 'O']] },
      },
      'Pertama, hitung PF dari segitiga PEF (siku-siku di E): PE = 2 cm (setengah EH) dan EF = 4 cm, sehingga PF = √(2² + 4²) = √20 = 2√5 cm.',
      'Kedua, hitung PC. Dari segitiga PHD (siku-siku di H), PD = √(PH² + HD²) = √(4 + 16) = √20 cm. Lalu dari segitiga PDC (siku-siku di D, karena DC tegak lurus bidang ADHE), PC = √(PD² + DC²) = √(20 + 16) = √36 = 6 cm.',
      'Ketiga, CF adalah diagonal bidang BCGF, sehingga CF = 4√2 cm.',
      {
        teks: 'Selanjutnya, gambar segitiga PCF datar dengan PF = 2√5 cm, PC = 6 cm, CF = 4√2 cm, dan garis tinggi PO. Karena PF ≠ PC, kaki O tidak berada di tengah CF. Misalkan FO = x, sehingga CO = 4√2 − x.',
        gambar: { jenis: 'segitiga-umum', titik: ['F', 'C', 'P'], panjang: [5.657, 6, 4.472], sisi: ['4√2 cm', '6 cm', '2√5 cm'], tinggi: { dari: 2, label: '?', kaki: 'O' }, sorot: 'tinggi' },
      },
      'Dengan teorema Pythagoras pada segitiga POF dan POC, diperoleh dua bentuk untuk PO²: PO² = PF² − x² = 20 − x², dan PO² = PC² − (4√2 − x)² = 36 − (32 − 8√2x + x²) = 4 + 8√2x − x².',
      'Samakan keduanya: 20 − x² = 4 + 8√2x − x², sehingga 8√2x = 16 dan x = 16/(8√2) = 2/√2 = √2.',
      'Substitusikan x = √2 ke PO² = 20 − x² = 20 − 2 = 18, sehingga PO = √18 cm (= 3√2 cm).',
      'Jadi, jarak titik P ke garis CF adalah √18 cm. (Jawaban E)',
    ],
    jebakan: 'Pilihan D, √20 cm, adalah panjang PF, ruas miring dari P ke ujung garis, bukan ruas tegak lurusnya. Pilihan B, √12 cm, muncul bila kaki O dianggap di tengah CF (PO² = 20 − 8), padahal PF ≠ PC sehingga O tidak di tengah.',
    alasan: 'PF = 2√5, PC = 6, CF = 4√2; dua persamaan Pythagoras memberi FO = √2 dan PO = √18 cm.',
  },
  {
    // cek: Math.abs(Math.hypot(4, 4, 8) - 4 * Math.sqrt(6)) < 1e-9
    id: 'r20',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 8 cm. Berapa panjang proyeksi DE pada bidang BDHF? (Soal UN 2004)',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'H', 'F'], ruas: [['D', 'E']] },
    pilihan: ['2√2 cm', '2√6 cm', '4√2 cm', '4√6 cm', '8√2 cm'],
    benar: 3,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Titik D sudah terletak pada bidang BDHF. Misalkan Q titik tengah EG; diagonal EG tegak lurus bidang BDHF (EG ⟂ FH dan EG ⟂ DH), sehingga proyeksi E pada bidang itu adalah Q. Dengan demikian, proyeksi DE pada bidang BDHF adalah DQ.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'H', 'F'], ruas: [['D', 'E'], ['D', 'Q', '?']], bantu: [['E', 'Q'], ['H', 'Q']], tambahan: [{ nama: 'Q', di: [0.5, 0.5, 1] }] },
      },
      {
        teks: 'Tinjau segitiga DHQ (siku-siku di H, karena DH tegak lurus bidang tutup). Diketahui DH = 8 cm dan HQ = 4√2 cm (setengah diagonal bidang tutup HF = 8√2 cm), seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['D', 'H', 'Q'], panjang: [8, 5.657, 9.798], sisi: ['8 cm', '4√2 cm', '?'], siku: 1, sorot: 2 },
      },
      'Dengan teorema Pythagoras, diperoleh DQ = √(DH² + HQ²) = √(64 + 32) = √96 = √(16 · 6) = 4√6 cm.',
      'Jadi, panjang proyeksi DE pada bidang BDHF adalah 4√6 cm. (Jawaban D)',
    ],
    jebakan: 'Pilihan E, 8√2 cm, adalah panjang DE sendiri; proyeksi selalu lebih pendek dari ruas miringnya. Pilihan C, 4√2 cm, hanya HQ, tanpa memperhitungkan tinggi DH.',
    alasan: 'Proyeksi E ke BDHF adalah Q (tengah EG); DQ = √(8² + (4√2)²) = 4√6 cm.',
  },
  {
    // cek: Math.abs(Math.hypot(3, 3, 6) - 3 * Math.sqrt(6)) < 1e-9
    id: 'r21',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa panjang proyeksi AF pada bidang ACGE? (Soal EBTANAS 1999)',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['A', 'C', 'G', 'E'], ruas: [['A', 'F']] },
    pilihan: ['3√2 cm', '3√3 cm', '3√6 cm', '6√2 cm', '6√3 cm'],
    benar: 2,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Titik A sudah terletak pada bidang ACGE. Misalkan Q titik tengah EG; diagonal FH tegak lurus bidang ACGE dan memotong EG di Q, sehingga proyeksi F pada bidang itu adalah Q. Dengan demikian, proyeksi AF pada bidang ACGE adalah AQ.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['A', 'C', 'G', 'E'], ruas: [['A', 'F'], ['A', 'Q', '?']], bantu: [['F', 'Q'], ['E', 'Q']], tambahan: [{ nama: 'Q', di: [0.5, 0.5, 1] }] },
      },
      {
        teks: 'Tinjau segitiga AEQ (siku-siku di E). Diketahui AE = 6 cm dan EQ = 3√2 cm (setengah diagonal bidang tutup EG = 6√2 cm), seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'E', 'Q'], panjang: [6, 4.243, 7.348], sisi: ['6 cm', '3√2 cm', '?'], siku: 1, sorot: 2 },
      },
      'Dengan teorema Pythagoras, diperoleh AQ = √(AE² + EQ²) = √(36 + 18) = √54 = √(9 · 6) = 3√6 cm.',
      'Jadi, panjang proyeksi AF pada bidang ACGE adalah 3√6 cm. (Jawaban C)',
    ],
    jebakan: 'Pilihan D, 6√2 cm, adalah panjang AF sendiri. Pilihan A, 3√2 cm, hanya EQ, jarak F ke bidang, bukan proyeksi AF.',
    alasan: 'Proyeksi F ke ACGE adalah Q (tengah EG); AQ = √(6² + (3√2)²) = 3√6 cm.',
  },
  {
    // cek: Math.abs(Math.asin((6 / Math.SQRT2) / Math.hypot(6, 6)) / D - 30) < 1e-9
    id: 'r22',
    tingkat: 'sulit',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara garis AH dan bidang diagonal BDHF? (Soal UAN 2005)',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'H', 'F'], ruas: [['A', 'H']] },
    pilihan: ['45°', '60°', '30°', '75°', '90°'],
    benar: 2,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Misalkan P titik tengah AC (pusat alas). Diagonal AC tegak lurus bidang BDHF, sehingga proyeksi A pada bidang itu adalah P, sedangkan H sudah terletak pada bidang. Sudut antara AH dan bidang BDHF adalah ∠AHP.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'H', 'F'], ruas: [['A', 'H']], bantu: [['A', 'P'], ['P', 'H']], tambahan: [{ nama: 'P', di: [0.5, 0.5, 0] }] },
      },
      {
        teks: 'Misalkan rusuk kubus 6 cm. Tinjau segitiga APH (siku-siku di P): AH = 6√2 cm (diagonal bidang) dan AP = 3√2 cm (setengah diagonal bidang), seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['H', 'P', 'A'], panjang: [7.348, 4.243, 8.485], sisi: ['3√6 cm', '3√2 cm', '6√2 cm'], siku: 1, sudut: [{ di: 0, label: 'θ' }] },
      },
      'Dengan definisi sinus, sin θ = AP/AH = 3√2/(6√2) = 1/2.',
      'Untuk itu, θ = 30°.',
      'Jadi, besar sudut antara garis AH dan bidang BDHF adalah 30°. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 45°, adalah sudut AH dengan bidang alas atau dengan rusuk AD, bukan dengan bidang diagonal. Pilihan B, 60°, menukar sinus dengan kosinus (cos 60° = 1/2), padahal AP adalah sisi DEPAN sudut θ.',
    alasan: 'Proyeksi A ke BDHF adalah pusat alas P; sin θ = AP/AH = 1/2, jadi 30°.',
  },
  {
    // cek: Math.abs(Math.sqrt(9 + 36 - (3 / Math.SQRT2) ** 2) - 4.5 * Math.SQRT2) < 1e-9
    id: 'r23',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Titik M adalah titik tengah rusuk EF. Berapa jarak titik M ke garis BD?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['B', 'D']], tambahan: [{ nama: 'M', di: [0.5, 0, 1] }] },
    pilihan: ['3√2 cm', '6 cm', '3√6 cm', '6√2 cm', '(9/2)√2 cm'],
    benar: 4,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Misalkan O proyeksi titik M pada garis BD, sehingga jarak M ke BD adalah panjang MO. Tarik MB dan MD supaya terbentuk segitiga MBD.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['B', 'D']], tambahan: [{ nama: 'M', di: [0.5, 0, 1] }, { nama: 'O', di: [0.75, 0.25, 0] }], bantu: [['M', 'B'], ['M', 'D'], ['M', 'O']] },
      },
      'Pertama, hitung MB dari segitiga MFB (siku-siku di F): MF = 3 cm dan FB = 6 cm, sehingga MB = √(9 + 36) = √45 = 3√5 cm.',
      'Kedua, hitung MD. Misalkan N titik tengah GH, sehingga MN = 6 cm (sejajar rusuk BC) dan MN tegak lurus bidang DCGH. Pada segitiga NHD (siku-siku di H), ND = √(NH² + HD²) = √(9 + 36) = √45 cm. Lalu pada segitiga MND (siku-siku di N), MD = √(MN² + ND²) = √(36 + 45) = √81 = 9 cm.',
      'Ketiga, BD adalah diagonal bidang alas, sehingga BD = 6√2 cm.',
      {
        teks: 'Selanjutnya, gambar segitiga MBD datar dengan MB = 3√5 cm, MD = 9 cm, BD = 6√2 cm, dan garis tinggi MO. Karena MB ≠ MD, kaki O tidak berada di tengah BD. Misalkan BO = x, sehingga DO = 6√2 − x.',
        gambar: { jenis: 'segitiga-umum', titik: ['B', 'D', 'M'], panjang: [8.485, 9, 6.708], sisi: ['6√2 cm', '9 cm', '3√5 cm'], tinggi: { dari: 2, label: '?', kaki: 'O' }, sorot: 'tinggi' },
      },
      'Dengan teorema Pythagoras pada segitiga MOB dan MOD, diperoleh MO² = 45 − x² dan MO² = 81 − (6√2 − x)² = 81 − 72 + 12√2x − x² = 9 + 12√2x − x².',
      'Samakan keduanya: 45 − x² = 9 + 12√2x − x², sehingga 12√2x = 36 dan x = 3/√2 = (3/2)√2.',
      'Substitusikan ke MO² = 45 − x² = 45 − 9/2 = 81/2, sehingga MO = 9/√2 = (9/2)√2 cm ≈ 6,36 cm.',
      'Jadi, jarak titik M ke garis BD adalah (9/2)√2 cm. (Jawaban E)',
    ],
    jebakan: 'Pilihan C, 3√6 cm, muncul bila kaki O dianggap di tengah BD (MO² = 45 − 18 = 27), padahal MB ≠ MD. Pilihan B, 6 cm, mengambil tinggi kubus, seolah BD tepat di bawah M.',
    alasan: 'MB = 3√5, MD = 9, BD = 6√2; dua persamaan Pythagoras memberi BO = (3/2)√2 dan MO = (9/2)√2 cm.',
  },
  {
    // cek: Math.abs(Math.hypot(6, 8) - 10) < 1e-9
    id: 'r65',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 8 cm. Titik P terletak pada rusuk EF dengan EP : PF = 1 : 3. Berapa jarak titik P ke garis BC?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['B', 'C']], tambahan: [{ nama: 'P', di: [0.25, 0, 1] }] },
    pilihan: ['8 cm', '10 cm', '2√41 cm', '6 cm', '2√17 cm'],
    benar: 1,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Karena EP : PF = 1 : 3, maka EP = (1/4)(8) = 2 cm dan PF = 6 cm. Titik P terletak pada bidang sisi ABFE, dan rusuk BC tegak lurus bidang ABFE di titik B, sehingga jarak P ke garis BC sama dengan jarak P ke titik B, yaitu panjang PB.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['B', 'C'], ['P', 'B', '?']], tambahan: [{ nama: 'P', di: [0.25, 0, 1] }], bidang: ['A', 'B', 'F', 'E'] },
      },
      {
        teks: 'Tinjau segitiga PFB (siku-siku di F) dengan PF = 6 cm dan FB = 8 cm, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['B', 'F', 'P'], panjang: [8, 6, 10], sisi: ['8 cm', '6 cm', '?'], siku: 1, sorot: 2 },
      },
      'Dengan teorema Pythagoras, diperoleh PB = √(PF² + FB²) = √(36 + 64) = √100 = 10 cm.',
      'Jadi, jarak titik P ke garis BC adalah 10 cm. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, 2√41 cm, adalah jarak P ke titik C (√(36 + 64 + 64)), bukan ke garis BC; titik terdekat pada BC adalah B, bukan C. Pilihan E, 2√17 cm, memakai EP = 2 cm alih-alih PF = 6 cm, seolah B berada di bawah E.',
    alasan: 'BC ⟂ bidang ABFE di B, jadi jarak P ke BC = PB = √(6² + 8²) = 10 cm.',
  },
  {
    // cek: Math.abs(Math.acos((1*0 + 0*1 + 1*1) / 2) / D - 60) < 1e-9
    id: 'r25',
    tingkat: 'sulit',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara garis AF dan garis BG?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'F'], ['B', 'G']] },
    pilihan: ['60°', '30°', '45°', '75°', '90°'],
    benar: 0,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. AF dan BG bersilangan, sehingga BG digeser ke garis yang sejajar dengannya dan memotong AF: garis AH sejajar BG (keduanya diagonal bidang sisi yang sejajar, ADHE dan BCGF, dengan arah yang sama). Sudut yang dicari adalah ∠FAH.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'F'], ['B', 'G']], bantu: [['A', 'H'], ['F', 'H']], bidang: ['A', 'F', 'H'] },
      },
      {
        teks: 'AF, AH, dan FH ketiganya diagonal bidang kubus, sehingga segitiga AFH sama sisi, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'F', 'H'], panjang: [1.414, 1.414, 1.414], sisi: ['s√2', 's√2', 's√2'], sudut: [{ di: 0, label: '?' }] },
      },
      'Setiap sudut segitiga sama sisi besarnya 60°, sehingga ∠FAH = 60°.',
      'Jadi, besar sudut antara garis AF dan garis BG adalah 60°. (Jawaban A)',
    ],
    jebakan: 'Pilihan E, 90°, mengira dua diagonal pada sisi yang bersebelahan tegak lurus; yang tegak lurus adalah dua diagonal pada SATU sisi (misalnya BG dan CF). Pilihan C, 45°, adalah sudut diagonal bidang dengan rusuk.',
    alasan: 'BG ∥ AH; segitiga AFH sama sisi, jadi sudutnya 60°.',
  },
  {
    // cek: Math.abs(6 * Math.sqrt(3) / 3 - 2 * Math.sqrt(3)) < 1e-9
    id: 'r66',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak antara bidang AFH dan bidang BDG?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'G'], bantu: [['A', 'F'], ['F', 'H'], ['H', 'A']] },
    pilihan: ['3√3 cm', '2√3 cm', '4√3 cm', '6 cm', '3√2 cm'],
    benar: 1,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Bidang AFH dan bidang BDG sejajar (AF ∥ DG dan AH ∥ BG), dan diagonal ruang EC tegak lurus pada keduanya. Misalkan EC menembus bidang AFH di K dan bidang BDG di L; jarak kedua bidang adalah panjang KL.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'G'], bantu: [['A', 'F'], ['F', 'H'], ['H', 'A'], ['E', 'C']], tambahan: [{ nama: 'K', di: [0.333, 0.333, 0.667] }, { nama: 'L', di: [0.667, 0.667, 0.333] }], ruas: [['K', 'L', '?']] },
      },
      'Diketahui dari soal jarak titik ke bidang sebelumnya bahwa jarak titik sudut kubus ke bidang yang melalui ketiga tetangganya adalah (1/3)s√3. Untuk itu, EK = jarak E ke bidang AFH = (1/3)(6√3) = 2√3 cm, dan LC = jarak C ke bidang BDG = 2√3 cm pula.',
      'Panjang diagonal ruang EC = s√3 = 6√3 cm.',
      'Dengan demikian, KL = EC − EK − LC = 6√3 − 2√3 − 2√3 = 2√3 cm. Kedua bidang membagi diagonal ruang menjadi tiga bagian sama panjang.',
      'Jadi, jarak antara bidang AFH dan bidang BDG adalah 2√3 cm. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, 4√3 cm, adalah jarak E ke bidang BDG (dua pertiga diagonal ruang), bukan jarak antara kedua bidang. Pilihan D, 6 cm, mengira jarak kedua bidang sama dengan rusuk, padahal keduanya miring.',
    alasan: 'EC ⟂ kedua bidang dan dibagi tiga sama panjang: jarak = (1/3)(6√3) = 2√3 cm.',
  },
  {
    // cek: Math.abs(Math.hypot(3, 3, 6) - 3 * Math.sqrt(6)) < 1e-9
    id: 'r45',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak titik H ke garis AC?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'C']] },
    pilihan: ['3√2 cm', '6√2 cm', '3√3 cm', '3√6 cm', '6 cm'],
    benar: 3,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Misalkan P titik tengah AC (pusat alas). Segitiga HAC sama kaki dengan HA = HC (keduanya diagonal bidang), sehingga HP ⟂ AC dan jarak H ke AC adalah panjang HP.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['H', 'P', '?']], bantu: [['A', 'C'], ['D', 'P'], ['H', 'A'], ['H', 'C']], tambahan: [{ nama: 'P', di: [0.5, 0.5, 0] }] },
      },
      {
        teks: 'Tinjau segitiga HDP (siku-siku di D, karena DH tegak lurus bidang alas). Diketahui DH = 6 cm dan DP = 3√2 cm (setengah diagonal bidang BD = 6√2 cm), seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['P', 'D', 'H'], panjang: [4.243, 6, 7.348], sisi: ['3√2 cm', '6 cm', '?'], siku: 1, sorot: 2 },
      },
      'Dengan teorema Pythagoras, diperoleh HP = √(DP² + DH²) = √(18 + 36) = √54 = √(9 · 6) = 3√6 cm.',
      'Jadi, jarak titik H ke garis AC adalah 3√6 cm. (Jawaban D)',
    ],
    jebakan: 'Pilihan B, 6√2 cm, adalah HA atau HC, ruas miring ke ujung garis. Pilihan A, 3√2 cm, hanya DP, jarak mendatar di alas, tanpa tinggi DH.',
    alasan: 'HP ⟂ AC dengan P pusat alas; HP = √((3√2)² + 6²) = 3√6 cm.',
  },
  {
    // cek: Math.abs(Math.abs(3 + 0 - 6) / Math.SQRT2 - 1.5 * Math.SQRT2) < 1e-9
    id: 'r46',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Titik P adalah titik tengah AB. Berapa jarak titik P ke bidang BDHF?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'H', 'F'], tambahan: [{ nama: 'P', di: [0.5, 0, 0] }] },
    pilihan: ['3√2 cm', '3 cm', '(3/2)√2 cm', '1,5 cm', '2√3 cm'],
    benar: 2,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Bidang BDHF tegak lurus bidang alas dan memotongnya sepanjang BD, sehingga jarak titik P (yang terletak di alas) ke bidang BDHF sama dengan jarak P ke garis BD di dalam alas. Misalkan O pusat alas; AO ⟂ BD dan AO = 3√2 cm (setengah diagonal). Misalkan pula Q proyeksi P pada BD.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'H', 'F'], tambahan: [{ nama: 'P', di: [0.5, 0, 0] }, { nama: 'O', di: [0.5, 0.5, 0] }, { nama: 'Q', di: [0.75, 0.25, 0] }], bantu: [['A', 'O'], ['B', 'D']], ruas: [['P', 'Q', '?']] },
      },
      {
        teks: 'Tinjau segitiga ABO (siku-siku di O). PQ ∥ AO karena keduanya tegak lurus BD, dan P titik tengah AB, sehingga segitiga BPQ sebangun dengan segitiga BAO dengan perbandingan 1 : 2, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['B', 'O', 'A'], panjang: [4.243, 4.243, 6], sisi: ['3√2 cm', '3√2 cm', '6 cm'], siku: 1, sudut: [{ di: 0, label: '45°' }] },
      },
      'Untuk itu, PQ = (1/2) AO = (1/2)(3√2) = (3/2)√2 cm. (Cara lain: pada segitiga BPQ siku-siku di Q dengan ∠PBQ = 45°, PQ = BP sin 45° = 3 × (1/2)√2 = (3/2)√2 cm.)',
      'Jadi, jarak titik P ke bidang BDHF adalah (3/2)√2 cm. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 3√2 cm, adalah jarak A ke bidang BDHF; P berada di tengah AB sehingga jaraknya tinggal setengah. Pilihan B, 3 cm, mengambil PB, ruas miring dari P ke bidang, bukan ruas tegak lurusnya.',
    alasan: 'Jarak P ke BDHF = jarak P ke BD = (1/2) AO = (3/2)√2 cm.',
  },
  {
    // cek: Math.abs(Math.atan(3 / Math.hypot(6, 6)) / D - 19.47) < 0.01
    id: 'r47',
    tingkat: 'sulit',
    pertanyaan: 'Balok ABCD.EFGH dengan AB = 6 cm, BC = 6 cm, dan AE = 3 cm. Berapa besar sudut antara diagonal ruang AG dan bidang alas ABCD?',
    gambar: { jenis: 'balok', ukuran: [6, 6, 3], ruas: [['A', 'G']] },
    pilihan: ['kira-kira 26,57°', 'kira-kira 19,47°', 'kira-kira 35,26°', '45°', '30°'],
    benar: 1,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Proyeksi G pada bidang alas adalah C, sehingga proyeksi AG adalah AC dan sudut yang dicari adalah ∠GAC.',
        gambar: { jenis: 'balok', ukuran: [6, 6, 3], ruas: [['A', 'G']], bantu: [['A', 'C'], ['C', 'G']], bidang: ['A', 'B', 'C', 'D'] },
      },
      'Pertama, hitung AC dari segitiga ABC (siku-siku di B): AC = √(6² + 6²) = √72 = 6√2 cm.',
      {
        teks: 'Selanjutnya, tinjau segitiga ACG (siku-siku di C) dengan AC = 6√2 cm dan CG = 3 cm, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'C', 'G'], panjang: [8.485, 3, 9], sisi: ['6√2 cm', '3 cm', '9 cm'], siku: 1, sudut: [{ di: 0, label: 'θ' }] },
      },
      'Dengan definisi tangen, tan θ = CG/AC = 3/(6√2) = 1/(2√2) = (1/4)√2 ≈ 0,3536.',
      'Untuk itu, θ = arctan(0,3536) ≈ 19,47°.',
      'Jadi, besar sudut antara AG dan bidang alas kira-kira 19,47°. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, 35,26°, adalah jawaban untuk KUBUS (tan = 1/√2), padahal tinggi balok ini hanya setengah sisi alasnya. Pilihan A, 26,57°, memakai tan = 3/6, yaitu CG dibagi rusuk BC, bukan dibagi diagonal AC.',
    alasan: 'tan θ = CG/AC = 3/(6√2) ≈ 0,354, sehingga θ ≈ 19,47°.',
  },
  {
    // cek: Math.abs(Math.abs(6 + 6 + 3 - 6) / Math.sqrt(3) - 3 * Math.sqrt(3)) < 1e-9
    id: 'r48',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Titik P adalah titik tengah rusuk CG. Berapa jarak titik P ke bidang BDE?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'E'], tambahan: [{ nama: 'P', di: [1, 1, 0.5] }] },
    pilihan: ['2√3 cm', '3√3 cm', '4√3 cm', '6√3 cm', '3√2 cm'],
    benar: 1,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Diagonal ruang AG tegak lurus bidang BDE dan menembusnya di K dengan AK = (1/3) AG = (1/3)(6√3) = 2√3 cm (jarak titik sudut ke bidang tetangganya).',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'E'], tambahan: [{ nama: 'P', di: [1, 1, 0.5] }, { nama: 'K', di: [0.333, 0.333, 0.333] }, { nama: 'J', di: [0.5, 0.5, 0] }], bantu: [['A', 'G'], ['A', 'C']] },
      },
      'Pertama, jarak G ke bidang BDE adalah GK = AG − AK = 6√3 − 2√3 = 4√3 cm.',
      'Kedua, jarak C ke bidang BDE. Misalkan J titik tengah AC; J terletak pada BD, jadi J berada di bidang BDE, dan A serta C sama jauhnya dari J. Akibatnya jarak C ke bidang BDE sama dengan jarak A ke bidang itu, yaitu 2√3 cm (C dan A di sisi yang berlawanan).',
      'Titik G dan C berada di sisi yang sama terhadap bidang BDE, dan P adalah titik tengah ruas CG. Jarak titik pada ruas CG ke bidang berubah secara linear (segitiga sebangun), sehingga jarak P adalah rata-rata jarak C dan G.',
      'Untuk itu, jarak P ke bidang BDE = (2√3 + 4√3)/2 = 6√3/2 = 3√3 cm.',
      'Jadi, jarak titik P ke bidang BDE adalah 3√3 cm. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 2√3 cm, adalah jarak C (atau A) ke bidang, dan pilihan C, 4√3 cm, adalah jarak G; P berada tepat di antara keduanya. Pilihan E, 3√2 cm, mengira jaraknya setengah diagonal bidang.',
    alasan: 'Jarak C = 2√3, jarak G = 4√3; P tengah CG, jadi jaraknya rata-ratanya, 3√3 cm.',
  },
  {
    // cek: Math.abs((Math.sqrt(3) / 4) * 72 - 18 * Math.sqrt(3)) < 1e-9
    id: 'r49',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa luas segitiga ACH?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['A', 'C', 'H'] },
    pilihan: ['18√3 cm²', '36 cm²', '18√2 cm²', '9√3 cm²', '36√3 cm²'],
    benar: 0,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. AC, CH, dan HA ketiganya diagonal bidang kubus, sehingga sama panjang: s√2 = 6√2 cm. Segitiga ACH sama sisi.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['A', 'C', 'H'], bantu: [['A', 'C'], ['C', 'H'], ['H', 'A']] },
      },
      {
        teks: 'Misalkan M titik tengah AC, sehingga HM garis tinggi segitiga ACH. Dengan teorema Pythagoras pada segitiga HMA, HM = √((6√2)² − (3√2)²) = √(72 − 18) = √54 = 3√6 cm, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'C', 'H'], panjang: [8.485, 8.485, 8.485], sisi: ['6√2 cm', '6√2 cm', '6√2 cm'], tinggi: { dari: 2, label: '3√6 cm', kaki: 'M' } },
      },
      'Dengan rumus luas segitiga, diperoleh L = (1/2) × AC × HM = (1/2) × 6√2 × 3√6 = 9√12 = 9 × 2√3 = 18√3 cm².',
      'Sebagai pemeriksaan dengan rumus luas segitiga sama sisi, L = (√3/4) × (6√2)² = (√3/4) × 72 = 18√3 cm², sama.',
      'Jadi, luas segitiga ACH adalah 18√3 cm². (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 36 cm², menghitung (1/2) × 6√2 × 6√2, memakai sisi sebagai tinggi; tinggi segitiga sama sisi bukan sisinya. Pilihan E, 36√3 cm², lupa faktor 1/2 pada rumus luas.',
    alasan: 'ACH sama sisi bersisi 6√2: luas = (√3/4)(72) = 18√3 cm².',
  },
  {
    // cek: Math.abs(Math.atan(4 / 4) / D - 45) < 1e-9
    id: 'r50',
    tingkat: 'sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 4 cm. Berapa besar sudut antara bidang ABGH dan bidang alas ABCD?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['A', 'B', 'G', 'H'] },
    pilihan: ['30°', '60°', 'kira-kira 35,26°', '45°', 'kira-kira 54,74°'],
    benar: 3,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Kedua bidang berpotongan pada garis AB. Pada bidang alas, AD ⟂ AB; pada bidang ABGH, AH ⟂ AB (AB tegak lurus bidang ADHE, jadi tegak lurus semua garis di dalamnya). Sudut antara kedua bidang adalah ∠DAH.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['A', 'B', 'G', 'H'], bantu: [['A', 'D'], ['A', 'H'], ['D', 'H']] },
      },
      {
        teks: 'Tinjau segitiga ADH (siku-siku di D) dengan AD = DH = 4 cm, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'D', 'H'], panjang: [4, 4, 5.657], sisi: ['4 cm', '4 cm', '4√2 cm'], siku: 1, sudut: [{ di: 0, label: 'θ' }] },
      },
      'Dengan definisi tangen, tan θ = DH/AD = 4/4 = 1, sehingga θ = 45°.',
      'Jadi, besar sudut antara bidang ABGH dan bidang alas ABCD adalah 45°. (Jawaban D)',
    ],
    jebakan: 'Pilihan E, 54,74°, adalah sudut bidang BDG dengan alas, yang kakinya s dan (1/2)s√2. Di sini kedua kakinya sama, s dan s. Pilihan C, 35,26°, adalah sudut diagonal ruang dengan alas.',
    alasan: 'Sudut bidang = ∠DAH pada segitiga ADH sama kaki: 45°.',
  },
  {
    // cek: Math.abs(Math.atan(10 / Math.hypot(8, 6)) / D - 45) < 1e-9
    id: 'r51',
    tingkat: 'sulit',
    pertanyaan: 'Balok ABCD.EFGH dengan AB = 8 cm, BC = 6 cm, dan AE = 10 cm. Berapa besar sudut antara AG dan bidang alas ABCD?',
    gambar: { jenis: 'balok', ukuran: [8, 6, 10], ruas: [['A', 'G']] },
    pilihan: ['kira-kira 51,34°', 'kira-kira 59,04°', 'kira-kira 35,26°', '30°', '45°'],
    benar: 4,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Proyeksi G pada bidang alas adalah C, sehingga proyeksi AG adalah AC dan sudut yang dicari adalah ∠GAC.',
        gambar: { jenis: 'balok', ukuran: [8, 6, 10], ruas: [['A', 'G']], bantu: [['A', 'C'], ['C', 'G']], bidang: ['A', 'B', 'C', 'D'] },
      },
      'Pertama, hitung AC dari segitiga ABC (siku-siku di B): AC = √(8² + 6²) = √(64 + 36) = √100 = 10 cm.',
      {
        teks: 'Selanjutnya, tinjau segitiga ACG (siku-siku di C) dengan AC = 10 cm dan CG = 10 cm, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'C', 'G'], panjang: [10, 10, 14.142], sisi: ['10 cm', '10 cm', '10√2 cm'], siku: 1, sudut: [{ di: 0, label: 'θ' }] },
      },
      'Dengan definisi tangen, tan θ = CG/AC = 10/10 = 1, sehingga θ = 45°.',
      'Jadi, besar sudut antara AG dan bidang alas ABCD adalah 45°. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 51,34°, memakai tan = 10/8 (CG dibagi rusuk AB), dan pilihan B, 59,04°, memakai tan = 10/6; keduanya lupa bahwa proyeksi AG adalah diagonal AC, bukan rusuk. Pilihan C, 35,26°, adalah jawaban untuk kubus.',
    alasan: 'AC = 10 = CG, jadi tan θ = 1 dan θ = 45°.',
  },
  // ========================================================= SANGAT SULIT
  {
    // cek: Math.abs(Math.sqrt(36 - 12) - 2 * Math.sqrt(6)) < 1e-9
    id: 'r67',
    tingkat: 'sangat sulit',
    pertanyaan: 'Limas segitiga beraturan T.ABC mempunyai semua rusuk sepanjang 6 cm (bidang empat beraturan). Berapa jarak titik T ke bidang alas ABC?',
    gambar: { jenis: 'svg', viewBox: '0 0 460 230', isi: '<line x1="110" y1="190" x2="330" y2="200" stroke="#1F2430" stroke-width="1.6"/><line x1="330" y1="200" x2="250" y2="130" stroke="#8B8378" stroke-width="1.4" stroke-dasharray="5 4"/><line x1="250" y1="130" x2="110" y2="190" stroke="#8B8378" stroke-width="1.4" stroke-dasharray="5 4"/><line x1="215" y1="40" x2="110" y2="190" stroke="#1F2430" stroke-width="1.6"/><line x1="215" y1="40" x2="330" y2="200" stroke="#1F2430" stroke-width="1.6"/><line x1="215" y1="40" x2="250" y2="130" stroke="#1F2430" stroke-width="1.6"/><g font-family="var(--font-mono), sans-serif" font-size="12" fill="#1F2430"><text x="215" y="30" text-anchor="middle">T</text><text x="96" y="196">A</text><text x="338" y="206">B</text><text x="256" y="126">C</text><text x="150" y="222" fill="#3A6EA5">semua rusuk 6 cm</text></g>' },
    pilihan: ['3√3 cm', '3√2 cm', '4√2 cm', '2√6 cm', '2√3 cm'],
    benar: 3,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Misalkan O proyeksi puncak T pada bidang alas ABC. Karena limas beraturan, O adalah titik berat segitiga sama sisi ABC (titik potong ketiga garis beratnya). Misalkan M titik tengah BC, sehingga AM garis berat sekaligus garis tinggi segitiga ABC, dan O terletak pada AM.',
        gambar: { jenis: 'svg', viewBox: '0 0 460 230', isi: '<line x1="110" y1="190" x2="330" y2="200" stroke="#1F2430" stroke-width="1.6"/><line x1="330" y1="200" x2="250" y2="130" stroke="#8B8378" stroke-width="1.4" stroke-dasharray="5 4"/><line x1="250" y1="130" x2="110" y2="190" stroke="#8B8378" stroke-width="1.4" stroke-dasharray="5 4"/><line x1="215" y1="40" x2="110" y2="190" stroke="#1F2430" stroke-width="1.6"/><line x1="215" y1="40" x2="330" y2="200" stroke="#1F2430" stroke-width="1.6"/><line x1="215" y1="40" x2="250" y2="130" stroke="#1F2430" stroke-width="1.6"/><line x1="110" y1="190" x2="290" y2="165" stroke="#6A4C93" stroke-width="1.4" stroke-dasharray="5 4"/><line x1="215" y1="40" x2="230" y2="173" stroke="#C25E4D" stroke-width="2.4"/><circle cx="230" cy="173" r="3" fill="#C25E4D"/><circle cx="290" cy="165" r="2.6" fill="#6A4C93"/><g font-family="var(--font-mono), sans-serif" font-size="12" fill="#1F2430"><text x="215" y="30" text-anchor="middle">T</text><text x="96" y="196">A</text><text x="338" y="206">B</text><text x="256" y="126">C</text><text x="236" y="190" fill="#C25E4D">O</text><text x="296" y="160" fill="#6A4C93">M</text><text x="238" y="112" fill="#C25E4D">?</text></g>' },
      },
      {
        teks: 'Pertama, tinjau segitiga sama sisi ABC bersisi 6 cm. Pada segitiga AMB (siku-siku di M), BM = 3 cm, sehingga garis tinggi AM = √(6² − 3²) = √27 = 3√3 cm, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['B', 'C', 'A'], panjang: [6, 6, 6], sisi: ['6 cm', '6 cm', '6 cm'], tinggi: { dari: 2, label: '3√3 cm', kaki: 'M' } },
      },
      'Titik berat membagi garis berat dengan perbandingan 2 : 1 dari titik sudut, sehingga AO = (2/3) AM = (2/3)(3√3) = 2√3 cm.',
      {
        teks: 'Selanjutnya, tinjau segitiga TOA (siku-siku di O) dengan TA = 6 cm dan AO = 2√3 cm, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'O', 'T'], panjang: [3.464, 4.899, 6], sisi: ['2√3 cm', '?', '6 cm'], siku: 1, sorot: 1 },
      },
      'Dengan teorema Pythagoras, diperoleh TO = √(TA² − AO²) = √(36 − 12) = √24 = √(4 · 6) = 2√6 cm.',
      'Jadi, jarak titik T ke bidang alas ABC adalah 2√6 cm. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 3√3 cm, adalah tinggi segitiga sisi (AM atau TM), bukan tinggi limas; bidang sisi miring, sehingga tinggi limas lebih pendek. Pilihan E, 2√3 cm, adalah AO, jarak titik sudut alas ke titik berat, yang baru salah satu kaki segitiga TOA.',
    alasan: 'AO = (2/3)(3√3) = 2√3; TO = √(36 − 12) = 2√6 cm.',
  },
  {
    // cek: Math.abs(Math.atan(4 / 3) / D - 53.13) < 0.01
    id: 'r28',
    tingkat: 'sangat sulit',
    pertanyaan: 'Limas T.ABCD mempunyai alas persegi bersisi 6 cm dan tinggi 4 cm, dengan T tepat di atas titik potong diagonal alas (O). Berapa besar sudut antara bidang sisi TAB dan bidang alas?',
    gambar: { jenis: 'svg', viewBox: '0 0 460 230', isi: '<line x1="120" y1="205" x2="300" y2="205" stroke="#8B8378" stroke-width="1.6"/><line x1="300" y1="205" x2="360" y2="150" stroke="#8B8378" stroke-width="1.6"/><line x1="360" y1="150" x2="180" y2="150" stroke="#8B8378" stroke-width="1.6" stroke-dasharray="5 4"/><line x1="180" y1="150" x2="120" y2="205" stroke="#8B8378" stroke-width="1.6" stroke-dasharray="5 4"/><line x1="240" y1="40" x2="120" y2="205" stroke="#8B8378" stroke-width="1.6"/><line x1="240" y1="40" x2="300" y2="205" stroke="#8B8378" stroke-width="1.6"/><line x1="240" y1="40" x2="360" y2="150" stroke="#8B8378" stroke-width="1.6"/><line x1="240" y1="40" x2="180" y2="150" stroke="#8B8378" stroke-width="1.6" stroke-dasharray="5 4"/><line x1="240" y1="40" x2="240" y2="178" stroke="#C25E4D" stroke-width="1.6" stroke-dasharray="3 3"/><circle cx="240" cy="178" r="2.6" fill="#C25E4D"/><g font-family="var(--font-mono), sans-serif" font-size="12" fill="#1F2430"><text x="240" y="32" text-anchor="middle">T</text><text x="108" y="212">A</text><text x="308" y="214">B</text><text x="366" y="150">C</text><text x="164" y="146">D</text><text x="248" y="192" fill="#C25E4D">O</text></g>' },
    pilihan: ['kira-kira 53,13°', 'kira-kira 33,69°', 'kira-kira 41,81°', 'kira-kira 48,19°', 'kira-kira 56,31°'],
    benar: 0,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Bidang TAB dan bidang alas berpotongan pada garis AB. Misalkan M titik tengah AB. Pada bidang alas, OM ⟂ AB; pada bidang TAB, TM ⟂ AB (segitiga TAB sama kaki). Sudut antara kedua bidang adalah ∠TMO.',
        gambar: { jenis: 'svg', viewBox: '0 0 460 230', isi: '<line x1="120" y1="205" x2="300" y2="205" stroke="#8B8378" stroke-width="1.6"/><line x1="300" y1="205" x2="360" y2="150" stroke="#8B8378" stroke-width="1.6"/><line x1="360" y1="150" x2="180" y2="150" stroke="#8B8378" stroke-width="1.6" stroke-dasharray="5 4"/><line x1="180" y1="150" x2="120" y2="205" stroke="#8B8378" stroke-width="1.6" stroke-dasharray="5 4"/><line x1="240" y1="40" x2="120" y2="205" stroke="#8B8378" stroke-width="1.6"/><line x1="240" y1="40" x2="300" y2="205" stroke="#8B8378" stroke-width="1.6"/><line x1="240" y1="40" x2="360" y2="150" stroke="#8B8378" stroke-width="1.6"/><line x1="240" y1="40" x2="180" y2="150" stroke="#8B8378" stroke-width="1.6" stroke-dasharray="5 4"/><line x1="240" y1="40" x2="240" y2="178" stroke="#C25E4D" stroke-width="2"/><line x1="240" y1="178" x2="210" y2="205" stroke="#3A6EA5" stroke-width="2"/><line x1="240" y1="40" x2="210" y2="205" stroke="#6A4C93" stroke-width="2"/><circle cx="240" cy="178" r="2.6" fill="#C25E4D"/><circle cx="210" cy="205" r="2.6" fill="#3A6EA5"/><g font-family="var(--font-mono), sans-serif" font-size="12" fill="#1F2430"><text x="240" y="32" text-anchor="middle">T</text><text x="108" y="212">A</text><text x="308" y="214">B</text><text x="366" y="150">C</text><text x="164" y="146">D</text><text x="250" y="180" fill="#C25E4D">O</text><text x="204" y="222" fill="#3A6EA5">M</text><text x="252" y="115" fill="#C25E4D">4</text><text x="216" y="188" fill="#3A6EA5">3</text></g>' },
      },
      {
        teks: 'Tinjau segitiga TOM (siku-siku di O). Diketahui TO = 4 cm (tinggi limas) dan OM = 3 cm (setengah sisi alas, jarak pusat persegi ke sisinya), seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['M', 'O', 'T'], panjang: [3, 4, 5], sisi: ['3 cm', '4 cm', '5 cm'], siku: 1, sudut: [{ di: 0, label: 'θ' }] },
      },
      'Dengan definisi tangen, tan θ = TO/OM = 4/3 ≈ 1,333.',
      'Untuk itu, θ = arctan(4/3) ≈ 53,13°.',
      'Jadi, besar sudut antara bidang TAB dan bidang alas kira-kira 53,13°. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 33,69°, memakai tan = 4/6, yaitu tinggi dibagi seluruh sisi alas, padahal kakinya hanya OM = 3 cm (setengah sisi). Pilihan C, 41,81°, adalah sudut rusuk TA dengan alas (tan = 4/(3√2)), bukan sudut bidang sisinya.',
    alasan: 'Sudut bidang = ∠TMO dengan tan = 4/3, sekitar 53,13°.',
  },
  {
    // cek: Math.abs(Math.atan(6 / (3 * Math.SQRT2)) / D - 54.74) < 0.01
    id: 'r29',
    tingkat: 'sangat sulit',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara bidang ACF dan bidang alas ABCD?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['A', 'C', 'F'] },
    pilihan: ['kira-kira 35,26°', '45°', 'kira-kira 54,74°', '60°', 'kira-kira 70,53°'],
    benar: 2,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Kedua bidang berpotongan pada garis AC. Misalkan P titik tengah AC (pusat alas). Pada bidang alas, BP ⟂ AC (diagonal persegi); pada bidang ACF, FP ⟂ AC (segitiga ACF sama kaki, FA = FC). Sudut antara kedua bidang adalah ∠FPB.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['A', 'C', 'F'], bantu: [['B', 'P'], ['F', 'P'], ['B', 'F']], tambahan: [{ nama: 'P', di: [0.5, 0.5, 0] }] },
      },
      {
        teks: 'Misalkan rusuk kubus 6 cm. Tinjau segitiga FBP (siku-siku di B, karena BF tegak lurus alas) dengan BF = 6 cm dan BP = 3√2 cm (setengah diagonal bidang), seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['P', 'B', 'F'], panjang: [4.243, 6, 7.348], sisi: ['3√2 cm', '6 cm', '3√6 cm'], siku: 1, sudut: [{ di: 0, label: 'θ' }] },
      },
      'Dengan definisi tangen, tan θ = BF/BP = 6/(3√2) = √2 ≈ 1,414.',
      'Untuk itu, θ = arctan(√2) ≈ 54,74°.',
      'Jadi, besar sudut antara bidang ACF dan bidang alas kira-kira 54,74°. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 35,26°, adalah ∠BFP, sudut di puncak segitiga, atau sudut diagonal ruang dengan alas; keduanya memakai tan = 1/√2. Pilihan B, 45°, mengira BP sama panjang dengan BF, padahal BP hanya setengah diagonal.',
    alasan: 'Sudut bidang = ∠FPB, tan = BF/BP = √2, sekitar 54,74°.',
  },
  {
    // cek: Math.abs(8 * 6 / Math.hypot(8, 6) - 4.8) < 1e-9
    id: 'r30',
    tingkat: 'sangat sulit',
    pertanyaan: 'Balok ABCD.EFGH mempunyai panjang 8 cm, lebar 6 cm, dan tinggi 4 cm. Berapa jarak titik A ke bidang BDHF?',
    gambar: { jenis: 'balok', ukuran: [8, 6, 4], bidang: ['B', 'D', 'H', 'F'] },
    pilihan: ['5 cm', '3,4 cm', '6,4 cm', '4,8 cm', '2,4 cm'],
    benar: 3,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Bidang BDHF tegak lurus bidang alas (memuat rusuk tegak BF) dan memotong alas sepanjang BD. Titik A terletak di alas, sehingga jarak A ke bidang BDHF sama dengan jarak A ke garis BD di dalam alas. Misalkan O proyeksi A pada BD; karena alasnya persegi panjang, O tidak di tengah BD.',
        gambar: { jenis: 'balok', ukuran: [8, 6, 4], bidang: ['B', 'D', 'H', 'F'], ruas: [['A', 'O', '?']], bantu: [['B', 'D']], tambahan: [{ nama: 'O', di: [0.36, 0.64, 0] }] },
      },
      {
        teks: 'Tinjau segitiga ABD (siku-siku di A) dengan AB = 8 cm dan AD = 6 cm. Dengan teorema Pythagoras, BD = √(64 + 36) = √100 = 10 cm. AO adalah garis tinggi ke sisi miring BD, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['B', 'D', 'A'], panjang: [10, 6, 8], sisi: ['10 cm', '6 cm', '8 cm'], siku: 2, tinggi: { dari: 2, label: '?', kaki: 'O' }, sorot: 'tinggi' },
      },
      'Dengan menggunakan prinsip kesamaan luas segitiga pada △ABD, diperoleh (1/2) × AB × AD = (1/2) × BD × AO, sehingga 8 × 6 = 10 × AO.',
      'Untuk itu, AO = 48/10 = 4,8 cm.',
      'Jadi, jarak titik A ke bidang BDHF adalah 4,8 cm. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 5 cm, mengira kaki O di tengah BD seperti pada kubus (setengah diagonal); itu hanya berlaku bila AB = AD. Pilihan C, 6,4 cm, adalah BO (= AB²/BD), letak kaki, bukan tinggi AO.',
    alasan: 'BDHF ⟂ alas; jarak A ke BD = AB × AD/BD = 48/10 = 4,8 cm.',
  },
  {
    // cek: Math.abs(Math.abs(0 + 0 - 3 - 6) / Math.sqrt(3) - 3 * Math.sqrt(3)) < 1e-9
    id: 'r31',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Titik M adalah titik tengah rusuk AE. Berapa jarak titik M ke bidang BDG?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'G'], tambahan: [{ nama: 'M', di: [0, 0, 0.5] }] },
    pilihan: ['3√3 cm', '2√3 cm', '4√3 cm', '3√2 cm', '6 cm'],
    benar: 0,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Diagonal ruang EC tegak lurus bidang BDG dan menembusnya di L dengan LC = (1/3) EC = (1/3)(6√3) = 2√3 cm (jarak titik sudut C ke bidang ketiga tetangganya B, D, G).',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'G'], tambahan: [{ nama: 'M', di: [0, 0, 0.5] }, { nama: 'L', di: [0.667, 0.667, 0.333] }, { nama: 'J', di: [0.5, 0.5, 0] }], bantu: [['E', 'C'], ['A', 'C']] },
      },
      'Pertama, jarak E ke bidang BDG adalah EL = EC − LC = 6√3 − 2√3 = 4√3 cm.',
      'Kedua, jarak A ke bidang BDG. Misalkan J titik tengah AC; J terletak pada BD sehingga berada di bidang BDG, dan A serta C sama jauhnya dari J. Akibatnya jarak A ke bidang BDG sama dengan jarak C, yaitu 2√3 cm.',
      'Titik A dan E berada di sisi yang sama terhadap bidang BDG, dan M adalah titik tengah AE. Jarak titik pada ruas AE ke bidang berubah secara linear (segitiga sebangun), sehingga jarak M adalah rata-rata jarak A dan E.',
      'Untuk itu, jarak M ke bidang BDG = (2√3 + 4√3)/2 = 3√3 cm.',
      'Jadi, jarak titik M ke bidang BDG adalah 3√3 cm. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 2√3 cm, adalah jarak A ke bidang, dan pilihan C, 4√3 cm, adalah jarak E; M berada tepat di tengah keduanya. Pilihan E, 6 cm, mengambil rusuk, seolah bidang BDG sejajar dengan sisi kubus.',
    alasan: 'Jarak A = 2√3, jarak E = 4√3; M tengah AE, jadi rata-ratanya 3√3 cm.',
  },
  {
    // cek: Math.abs(Math.abs(6 - 0 + 6) / Math.sqrt(3) - 4 * Math.sqrt(3)) < 1e-9
    id: 'r32',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak titik F ke bidang ACH?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['A', 'C', 'H'] },
    pilihan: ['2√3 cm', '3√3 cm', '6√3 cm', '3√6 cm', '4√3 cm'],
    benar: 4,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Bidang ACH melalui ketiga tetangga titik D (yaitu A, C, H), sehingga diagonal ruang DF tegak lurus bidang ACH dan menembusnya di K dengan DK = (1/3) DF. Jarak F ke bidang ACH adalah panjang FK.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['A', 'C', 'H'], bantu: [['D', 'F']], tambahan: [{ nama: 'K', di: [0.333, 0.667, 0.333] }], ruas: [['F', 'K', '?']] },
      },
      'Panjang diagonal ruang DF = s√3 = 6√3 cm, sehingga DK = (1/3)(6√3) = 2√3 cm.',
      'Untuk itu, FK = DF − DK = 6√3 − 2√3 = 4√3 cm.',
      'Sebagai pemeriksaan, jarak F ke bidang ACH adalah (2/3) diagonal ruang: bidang ACH memotong DF pada sepertiga dari D, sehingga dua pertiga sisanya di pihak F.',
      'Jadi, jarak titik F ke bidang ACH adalah 4√3 cm. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 2√3 cm, adalah jarak D ke bidang ACH, titik sudut yang tetangganya ada di bidang itu; F berada di ujung lain diagonal. Pilihan C, 6√3 cm, adalah seluruh diagonal DF.',
    alasan: 'DF ⟂ ACH dengan DK = (1/3)DF; FK = (2/3)(6√3) = 4√3 cm.',
  },
  {
    // cek: Math.abs(Math.abs(0 + 0 - 0 - 6) / Math.sqrt(6) - Math.sqrt(6)) < 1e-9
    id: 'r52',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Titik P adalah titik tengah rusuk CG. Berapa jarak titik A ke bidang yang melalui B, D, dan P?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'P'], tambahan: [{ nama: 'P', di: [1, 1, 0.5] }] },
    pilihan: ['2√6 cm', '3√2 cm', '2√3 cm', '√6 cm', '3 cm'],
    benar: 3,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Misalkan J titik tengah BD (pusat alas). Garis BD tegak lurus bidang diagonal ACGE, sehingga bidang BDP tegak lurus bidang ACGE dan keduanya berpotongan sepanjang JP. Titik A terletak pada bidang ACGE, jadi jarak A ke bidang BDP sama dengan jarak A ke garis JP di dalam bidang ACGE.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'P'], tambahan: [{ nama: 'P', di: [1, 1, 0.5] }, { nama: 'J', di: [0.5, 0.5, 0] }], bantu: [['A', 'C'], ['J', 'P'], ['C', 'P']] },
      },
      {
        teks: 'Tinjau segitiga AJP pada bidang ACGE. Diketahui AJ = 3√2 cm (setengah diagonal alas), JC = 3√2 cm, dan CP = 3 cm (setengah rusuk). Dengan teorema Pythagoras pada segitiga JCP (siku-siku di C), JP = √(18 + 9) = √27 = 3√3 cm. Tinggi segitiga AJP dari P ke garis AC adalah CP = 3 cm, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'J', 'P'], panjang: [4.243, 5.196, 9], sisi: ['3√2 cm', '3√3 cm', '9 cm'], tinggi: { dari: 0, label: '?', kaki: 'K' }, sorot: 'tinggi' },
      },
      'Dengan menggunakan prinsip kesamaan luas segitiga pada △AJP, diperoleh (1/2) × AJ × CP = (1/2) × JP × AK, sehingga 3√2 × 3 = 3√3 × AK.',
      'Untuk itu, AK = 9√2/(3√3) = 3√2/√3 = 3√(2/3) = √6 cm.',
      'Jadi, jarak titik A ke bidang BDP adalah √6 cm. (Jawaban D)',
    ],
    jebakan: 'Pilihan B, 3√2 cm, adalah AJ, jarak A ke garis BD, bukan ke bidang BDP yang miring. Pilihan C, 2√3 cm, adalah jarak A ke bidang BDE; bidang BDP lebih landai karena P hanya setengah tinggi.',
    alasan: 'Bidang BDP ⟂ ACGE; kesamaan luas segitiga AJP memberi AK = 3√2 × 3/(3√3) = √6 cm.',
  },
  {
    // cek: Math.abs(Math.acos(1 / 3) / D - 70.53) < 0.01
    id: 'r53',
    tingkat: 'sangat sulit',
    pertanyaan: 'Pada kubus ABCD.EFGH, berapa besar sudut antara dua diagonal ruang AG dan BH?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'G'], ['B', 'H']] },
    pilihan: ['60°', 'kira-kira 54,74°', 'kira-kira 35,26°', '90°', 'kira-kira 70,53°'],
    benar: 4,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Kedua diagonal ruang berpotongan di pusat kubus M dan saling membagi dua sama panjang. Misalkan rusuk kubus 6 cm, maka AM = BM = (1/2)(6√3) = 3√3 cm. Sudut antara AG dan BH adalah ∠AMB pada segitiga AMB.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'G'], ['B', 'H']], tambahan: [{ nama: 'M', di: [0.5, 0.5, 0.5] }], bantu: [['A', 'B']] },
      },
      {
        teks: 'Segitiga AMB sama kaki dengan AM = BM = 3√3 cm dan AB = 6 cm, seperti gambar berikut. Segitiga ini tidak siku-siku, sehingga dipakai aturan kosinus.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'B', 'M'], panjang: [6, 5.196, 5.196], sisi: ['6 cm', '3√3 cm', '3√3 cm'], sudut: [{ di: 2, label: 'θ' }] },
      },
      'Dengan menggunakan aturan kosinus pada △AMB dengan mengacu pada sudut M, diperoleh AB² = AM² + BM² − 2 · AM · BM · cos θ, sehingga 36 = 27 + 27 − 2(27) cos θ.',
      'Untuk itu, 54 cos θ = 54 − 36 = 18, sehingga cos θ = 18/54 = 1/3 dan θ = arccos(1/3) ≈ 70,53°.',
      'Jadi, besar sudut antara diagonal ruang AG dan BH kira-kira 70,53°. (Jawaban E)',
    ],
    jebakan: 'Pilihan D, 90°, mengira dua diagonal ruang saling tegak lurus seperti diagonal persegi, padahal cos θ = 1/3 ≠ 0. Pilihan B, 54,74°, adalah sudut bidang BDG dengan alas; pilihan C, 35,26°, sudut diagonal ruang dengan alas.',
    alasan: 'Aturan kosinus pada segitiga AMB (3√3, 3√3, 6): cos θ = 1/3, θ ≈ 70,53°.',
  },
  {
    // cek: Math.abs(Math.atan(3 / 6) / D - 26.57) < 0.01
    id: 'r54',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Titik P adalah titik tengah rusuk AE. Berapa besar sudut antara garis BP dan bidang alas ABCD?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['B', 'P']], tambahan: [{ nama: 'P', di: [0, 0, 0.5] }] },
    pilihan: ['30°', '45°', 'kira-kira 26,57°', 'kira-kira 63,43°', 'kira-kira 18,43°'],
    benar: 2,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Proyeksi P pada bidang alas adalah A (karena PA bagian dari rusuk tegak AE), sehingga proyeksi BP adalah BA dan sudut yang dicari adalah ∠PBA.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['B', 'P']], tambahan: [{ nama: 'P', di: [0, 0, 0.5] }], bantu: [['A', 'B'], ['A', 'P']], bidang: ['A', 'B', 'C', 'D'] },
      },
      {
        teks: 'Tinjau segitiga BAP (siku-siku di A) dengan AB = 6 cm dan AP = 3 cm (setengah rusuk), seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['B', 'A', 'P'], panjang: [6, 3, 6.708], sisi: ['6 cm', '3 cm', '3√5 cm'], siku: 1, sudut: [{ di: 0, label: 'θ' }] },
      },
      'Dengan definisi tangen, tan θ = AP/AB = 3/6 = 1/2 = 0,5.',
      'Untuk itu, θ = arctan(0,5) ≈ 26,57°.',
      'Jadi, besar sudut antara garis BP dan bidang alas kira-kira 26,57°. (Jawaban C)',
    ],
    jebakan: 'Pilihan D, 63,43°, adalah ∠BPA, sudut di ujung atas, hasil menukar peran kedua kaki (tan = 6/3). Pilihan A, 30°, mengira tan 30° = 1/2, padahal yang bernilai 1/2 adalah sin 30°.',
    alasan: 'Proyeksi BP ke alas adalah BA; tan θ = AP/AB = 1/2, θ ≈ 26,57°.',
  },
  {
    // cek: Math.abs(Math.acos(((-3)*3 + (-3)*3 + 6*6) / (Math.hypot(3,3,6) * Math.hypot(3,3,6))) / D - 70.53) < 0.01
    id: 'r55',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa besar sudut antara bidang BDE dan bidang BDG?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'G'], bantu: [['B', 'E'], ['D', 'E']] },
    pilihan: ['kira-kira 54,74°', 'kira-kira 70,53°', '60°', 'kira-kira 35,26°', '90°'],
    benar: 1,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Kedua bidang berpotongan pada garis BD. Misalkan M titik tengah BD. Segitiga BDE dan BDG sama-sama sama kaki (EB = ED dan GB = GD), sehingga EM ⟂ BD dan GM ⟂ BD. Sudut antara kedua bidang adalah ∠EMG.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'G'], bantu: [['B', 'E'], ['D', 'E'], ['E', 'M'], ['G', 'M'], ['E', 'G']], tambahan: [{ nama: 'M', di: [0.5, 0.5, 0] }] },
      },
      'Pertama, hitung EM dari segitiga EAM (siku-siku di A): AE = 6 cm dan AM = 3√2 cm, sehingga EM = √(36 + 18) = √54 = 3√6 cm. Dengan cara yang sama, GM = 3√6 cm.',
      {
        teks: 'Selanjutnya, tinjau segitiga EMG dengan EM = GM = 3√6 cm dan EG = 6√2 cm (diagonal bidang tutup), seperti gambar berikut. Segitiga ini tidak siku-siku, sehingga dipakai aturan kosinus.',
        gambar: { jenis: 'segitiga-umum', titik: ['E', 'G', 'M'], panjang: [8.485, 7.348, 7.348], sisi: ['6√2 cm', '3√6 cm', '3√6 cm'], sudut: [{ di: 2, label: 'θ' }] },
      },
      'Dengan menggunakan aturan kosinus pada △EMG dengan mengacu pada sudut M, diperoleh EG² = EM² + GM² − 2 · EM · GM · cos θ, sehingga 72 = 54 + 54 − 2(54) cos θ.',
      'Untuk itu, 108 cos θ = 108 − 72 = 36, sehingga cos θ = 36/108 = 1/3 dan θ = arccos(1/3) ≈ 70,53°.',
      'Jadi, besar sudut antara bidang BDE dan bidang BDG kira-kira 70,53°. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 54,74°, adalah sudut SATU bidang (BDG) dengan alas; sudut antara kedua bidang miring itu bukan dua kalinya (109,47°) melainkan pelurusnya, 70,53°, karena keduanya condong ke arah yang berlawanan. Pilihan E, 90°, mengira EM ⟂ GM.',
    alasan: 'Aturan kosinus pada segitiga EMG (3√6, 3√6, 6√2): cos θ = 1/3, θ ≈ 70,53°.',
  },
  {
    // cek: Math.abs(Math.acos((4 * Math.SQRT2) / 8) / D - 45) < 1e-9
    id: 'r56',
    tingkat: 'sangat sulit',
    pertanyaan: 'Limas T.ABCD dengan alas persegi bersisi 8 cm dan semua rusuk tegaknya juga 8 cm (TA = TB = TC = TD = 8). Berapa besar sudut antara rusuk TA dan bidang alas?',
    gambar: { jenis: 'svg', viewBox: '0 0 460 230', isi: '<line x1="120" y1="205" x2="300" y2="205" stroke="#8B8378" stroke-width="1.6"/><line x1="300" y1="205" x2="360" y2="150" stroke="#8B8378" stroke-width="1.6"/><line x1="360" y1="150" x2="180" y2="150" stroke="#8B8378" stroke-width="1.6" stroke-dasharray="5 4"/><line x1="180" y1="150" x2="120" y2="205" stroke="#8B8378" stroke-width="1.6" stroke-dasharray="5 4"/><line x1="240" y1="40" x2="120" y2="205" stroke="#8B8378" stroke-width="1.6"/><line x1="240" y1="40" x2="300" y2="205" stroke="#8B8378" stroke-width="1.6"/><line x1="240" y1="40" x2="360" y2="150" stroke="#8B8378" stroke-width="1.6"/><line x1="240" y1="40" x2="180" y2="150" stroke="#8B8378" stroke-width="1.6" stroke-dasharray="5 4"/><line x1="240" y1="40" x2="240" y2="178" stroke="#C25E4D" stroke-width="1.6" stroke-dasharray="3 3"/><circle cx="240" cy="178" r="2.6" fill="#C25E4D"/><g font-family="var(--font-mono), sans-serif" font-size="12" fill="#1F2430"><text x="240" y="32" text-anchor="middle">T</text><text x="108" y="212">A</text><text x="308" y="214">B</text><text x="366" y="150">C</text><text x="164" y="146">D</text><text x="248" y="192" fill="#C25E4D">O</text></g>' },
    pilihan: ['45°', '30°', '60°', 'kira-kira 35,26°', 'kira-kira 54,74°'],
    benar: 0,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Misalkan O titik potong diagonal alas; T tepat di atas O, sehingga proyeksi TA pada bidang alas adalah AO dan sudut yang dicari adalah ∠TAO.',
        gambar: { jenis: 'svg', viewBox: '0 0 460 230', isi: '<line x1="120" y1="205" x2="300" y2="205" stroke="#8B8378" stroke-width="1.6"/><line x1="300" y1="205" x2="360" y2="150" stroke="#8B8378" stroke-width="1.6"/><line x1="360" y1="150" x2="180" y2="150" stroke="#8B8378" stroke-width="1.6" stroke-dasharray="5 4"/><line x1="180" y1="150" x2="120" y2="205" stroke="#8B8378" stroke-width="1.6" stroke-dasharray="5 4"/><line x1="240" y1="40" x2="120" y2="205" stroke="#6A4C93" stroke-width="2.2"/><line x1="240" y1="40" x2="300" y2="205" stroke="#8B8378" stroke-width="1.6"/><line x1="240" y1="40" x2="360" y2="150" stroke="#8B8378" stroke-width="1.6"/><line x1="240" y1="40" x2="180" y2="150" stroke="#8B8378" stroke-width="1.6" stroke-dasharray="5 4"/><line x1="120" y1="205" x2="360" y2="150" stroke="#3A6EA5" stroke-width="1.4" stroke-dasharray="5 4"/><line x1="240" y1="40" x2="240" y2="178" stroke="#C25E4D" stroke-width="2"/><circle cx="240" cy="178" r="2.6" fill="#C25E4D"/><path d="M 150 200 A 32 32 0 0 0 144 188" fill="none" stroke="#6A4C93" stroke-width="1.6"/><g font-family="var(--font-mono), sans-serif" font-size="12" fill="#1F2430"><text x="240" y="32" text-anchor="middle">T</text><text x="108" y="212">A</text><text x="308" y="214">B</text><text x="366" y="150">C</text><text x="164" y="146">D</text><text x="248" y="192" fill="#C25E4D">O</text><text x="154" y="196" fill="#6A4C93">θ</text><text x="160" y="118" fill="#6A4C93">8</text><text x="180" y="180" fill="#3A6EA5">4√2</text></g>' },
      },
      'Pertama, hitung AO. Diagonal alas AC = 8√2 cm (diagonal persegi bersisi 8), sehingga AO = (1/2) AC = 4√2 cm.',
      {
        teks: 'Selanjutnya, tinjau segitiga TOA (siku-siku di O) dengan TA = 8 cm (sisi miring) dan AO = 4√2 cm, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'O', 'T'], panjang: [5.657, 5.657, 8], sisi: ['4√2 cm', '4√2 cm', '8 cm'], siku: 1, sudut: [{ di: 0, label: 'θ' }] },
      },
      'Dengan definisi kosinus, cos θ = AO/TA = 4√2/8 = (1/2)√2, sehingga θ = 45°. (Tinggi limas TO = √(64 − 32) = 4√2 cm, sama dengan AO, yang memang menandakan sudut 45°.)',
      'Jadi, besar sudut antara rusuk TA dan bidang alas adalah 45°. (Jawaban A)',
    ],
    jebakan: 'Pilihan C, 60°, muncul bila AO keliru dianggap setengah SISI (4 cm) sehingga cos θ = 1/2; padahal AO adalah setengah DIAGONAL. Pilihan B, 30°, menukar kosinus dengan sinus pada kekeliruan yang sama.',
    alasan: 'AO = 4√2, TA = 8: cos θ = √2/2, θ = 45°.',
  },
  {
    // cek: Math.abs(6 / Math.sqrt(6) - Math.sqrt(6)) < 1e-9
    id: 'r68',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak antara garis AC dan garis HB (dua garis bersilangan)?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'C'], ['H', 'B']] },
    pilihan: ['2√6 cm', '3√2 cm', '√6 cm', '2√3 cm', '3 cm'],
    benar: 2,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Diagonal AC tegak lurus bidang BDHF (AC ⟂ BD dan AC ⟂ DH) dan menembusnya di O, pusat alas. Garis HB terletak pada bidang BDHF, sehingga ruas OT yang tegak lurus HB (T pada HB) tegak lurus pada AC sekaligus pada HB. Panjang OT itulah jarak kedua garis bersilangan.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'C'], ['H', 'B'], ['O', 'T', '?']], bidang: ['B', 'D', 'H', 'F'], tambahan: [{ nama: 'O', di: [0.5, 0.5, 0] }, { nama: 'T', di: [0.667, 0.333, 0.333] }] },
      },
      {
        teks: 'Tinjau persegi panjang BDHF dengan BD = 6√2 cm dan DH = 6 cm; diagonalnya HB = 6√3 cm. Pada segitiga BDH (siku-siku di D), jarak D ke HB adalah garis tinggi DK. Dengan kesamaan luas segitiga, (1/2) × BD × DH = (1/2) × HB × DK, sehingga DK = 6√2 × 6/(6√3) = 6√2/√3 = 2√6 cm, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['B', 'H', 'D'], panjang: [10.392, 6, 8.485], sisi: ['6√3 cm', '6 cm', '6√2 cm'], siku: 2, tinggi: { dari: 2, label: '2√6 cm', kaki: 'K' }, sorot: 'tinggi' },
      },
      'Karena O titik tengah BD dan OT ∥ DK (keduanya tegak lurus HB), segitiga BOT sebangun dengan segitiga BDK dengan perbandingan 1 : 2. Untuk itu, OT = (1/2) DK = (1/2)(2√6) = √6 cm.',
      'Jadi, jarak antara garis AC dan garis HB adalah √6 cm. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 2√6 cm, adalah jarak D ke HB, dua kali jarak yang dicari, karena AC memotong BD tepat di tengahnya. Pilihan B, 3√2 cm, adalah OB, jarak O ke ujung garis, bukan ruas tegak lurusnya.',
    alasan: 'AC ⟂ BDHF di O; jarak O ke HB = (1/2) jarak D ke HB = (1/2)(2√6) = √6 cm.',
  },
  {
    // cek: Math.abs(Math.abs((6*0 + 6*(-1) + 0*1)) / Math.SQRT2 - 3 * Math.SQRT2) < 1e-9
    id: 'r58',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Berapa jarak antara garis bersilangan AG dan CD?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'G'], ['C', 'D']] },
    pilihan: ['6 cm', '3√2 cm', '2√6 cm', '3√3 cm', '6√2 cm'],
    benar: 1,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Garis AG terletak pada bidang diagonal ABGH, dan CD ∥ AB sehingga CD sejajar bidang ABGH. Dengan demikian, jarak CD ke AG sama dengan jarak CD ke bidang ABGH, yaitu jarak titik D (salah satu titik pada CD) ke bidang ABGH.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], ruas: [['A', 'G'], ['C', 'D']], bidang: ['A', 'B', 'G', 'H'], tambahan: [{ nama: 'P', di: [0, 0.5, 0.5] }], bantu: [['D', 'P'], ['A', 'H'], ['D', 'E']] },
      },
      {
        teks: 'Bidang ABGH tegak lurus bidang ADHE (karena AB ⟂ ADHE) dan memotongnya sepanjang AH. Untuk itu, jarak D ke bidang ABGH sama dengan jarak D ke garis AH di dalam persegi ADHE. Misalkan P titik potong diagonal AH dan DE; diagonal persegi saling tegak lurus di tengah, sehingga jarak itu adalah DP, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['A', 'H', 'D'], panjang: [8.485, 6, 6], sisi: ['6√2 cm', '6 cm', '6 cm'], siku: 2, tinggi: { dari: 2, label: '?', kaki: 'P' }, sorot: 'tinggi' },
      },
      'Diagonal persegi ADHE panjangnya 6√2 cm, sehingga DP = (1/2)(6√2) = 3√2 cm. (Sebagai pemeriksaan lewat kesamaan luas segitiga ADH: DP = AD × DH/AH = 36/(6√2) = 3√2 cm.)',
      'Jadi, jarak antara garis AG dan garis CD adalah 3√2 cm. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 6 cm, mengambil rusuk DA atau CG, padahal keduanya tidak tegak lurus AG. Pilihan E, 6√2 cm, adalah seluruh diagonal, bukan setengahnya.',
    alasan: 'CD ∥ bidang ABGH; jarak D ke bidang itu = setengah diagonal ADHE = 3√2 cm.',
  },
  {
    // cek: Math.abs(Math.atan(3 / (3 * Math.SQRT2)) / D - 35.26) < 0.01
    id: 'r59',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 6 cm. Titik P adalah titik tengah rusuk CG. Berapa besar sudut antara bidang BDP dan bidang alas ABCD?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'P'], tambahan: [{ nama: 'P', di: [1, 1, 0.5] }] },
    pilihan: ['45°', 'kira-kira 35,26°', 'kira-kira 54,74°', '30°', 'kira-kira 26,57°'],
    benar: 1,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Kedua bidang berpotongan pada garis BD. Misalkan M titik tengah BD (pusat alas). Pada bidang alas, MC ⟂ BD; pada bidang BDP, MP ⟂ BD (segitiga BDP sama kaki, PB = PD). Sudut antara kedua bidang adalah ∠PMC.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['B', 'D', 'P'], tambahan: [{ nama: 'P', di: [1, 1, 0.5] }, { nama: 'M', di: [0.5, 0.5, 0] }], bantu: [['M', 'C'], ['M', 'P'], ['C', 'P']] },
      },
      {
        teks: 'Tinjau segitiga PCM (siku-siku di C, karena CP bagian dari rusuk tegak CG) dengan CP = 3 cm (setengah rusuk) dan MC = 3√2 cm (setengah diagonal alas), seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['M', 'C', 'P'], panjang: [4.243, 3, 5.196], sisi: ['3√2 cm', '3 cm', '3√3 cm'], siku: 1, sudut: [{ di: 0, label: 'θ' }] },
      },
      'Dengan definisi tangen, tan θ = CP/MC = 3/(3√2) = 1/√2 = (1/2)√2 ≈ 0,7071.',
      'Untuk itu, θ = arctan(0,7071) ≈ 35,26°.',
      'Jadi, besar sudut antara bidang BDP dan bidang alas kira-kira 35,26°. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, 54,74°, adalah sudut bidang BDG dengan alas (tan = 6/(3√2) = √2); dengan P di tengah CG, kakinya tinggal setengah sehingga tangennya juga setengah. Pilihan E, 26,57°, memakai tan = 3/6, membagi dengan rusuk alih-alih setengah diagonal.',
    alasan: 'Sudut bidang = ∠PMC, tan = 3/(3√2) = 1/√2, sekitar 35,26°.',
  },
  {
    // cek: Math.abs(Math.abs(0 + 0 - 3) / Math.SQRT2 - 1.5 * Math.SQRT2) < 1e-9
    id: 'r60',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kubus ABCD.EFGH berusuk 3 cm. Berapa jarak titik A ke bidang diagonal CDEF?',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['C', 'D', 'E', 'F'] },
    pilihan: ['3√2 cm', '3 cm', '(3/2)√2 cm', '1,5 cm', '(3/2)√3 cm'],
    benar: 2,
    langkah: [
      {
        teks: 'Perhatikan sketsa berikut. Bidang CDEF tegak lurus bidang ADHE (karena CD ⟂ ADHE) dan memotongnya sepanjang DE. Titik A terletak pada bidang ADHE, sehingga jarak A ke bidang CDEF sama dengan jarak A ke garis DE di dalam persegi ADHE. Misalkan P titik potong diagonal AH dan DE.',
        gambar: { jenis: 'balok', ukuran: [1, 1, 1], bidang: ['C', 'D', 'E', 'F'], tambahan: [{ nama: 'P', di: [0, 0.5, 0.5] }], bantu: [['D', 'E'], ['A', 'H']], ruas: [['A', 'P', '?']] },
      },
      {
        teks: 'Pada persegi ADHE, kedua diagonal saling tegak lurus dan berpotongan di tengah, sehingga AP ⟂ DE dan AP = (1/2) AH. Tinjau segitiga ADE (siku-siku di A) dengan AD = AE = 3 cm, seperti gambar berikut.',
        gambar: { jenis: 'segitiga-umum', titik: ['D', 'E', 'A'], panjang: [4.243, 3, 3], sisi: ['3√2 cm', '3 cm', '3 cm'], siku: 2, tinggi: { dari: 2, label: '?', kaki: 'P' }, sorot: 'tinggi' },
      },
      'Diagonal AH = 3√2 cm, sehingga AP = (1/2)(3√2) = (3/2)√2 cm. (Sebagai pemeriksaan lewat kesamaan luas segitiga ADE: AP = AD × AE/DE = 9/(3√2) = (3/2)√2 cm.)',
      'Jadi, jarak titik A ke bidang diagonal CDEF adalah (3/2)√2 cm. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, 3 cm, mengambil rusuk AD atau AE, padahal keduanya tidak tegak lurus bidang CDEF yang miring 45°. Pilihan A, 3√2 cm, adalah seluruh diagonal AH, bukan setengahnya.',
    alasan: 'CDEF ⟂ ADHE; jarak A ke DE = setengah diagonal AH = (3/2)√2 cm.',
  },
]

/**
 * Paket kuis bab: 10 soal yang konsepnya diajarkan materi bab ini, dengan
 * materi asalnya (ARYA 20 Sep 2026). Dikurasi dengan membaca soal dan
 * bacaan materinya; soal bank lain tetap di menu Latihan. Urutan soal dan
 * pilihannya diacak di peramban. Pemeriksa: `node alat/cek_kuis_bab.mjs`.
 */
export const KUIS_BAB: ButirKuisBab[] = [
  { id: 'r04', materi: 'kosakata-kedudukan' },
  { id: 'r08', materi: 'kosakata-kedudukan' },
  { id: 'r36', materi: 'jarak-terpendek' },
  { id: 'r02', materi: 'dua-kali-pythagoras' },
  { id: 'r09', materi: 'jarak-titik-ke-garis' },
  { id: 'r16', materi: 'jarak-titik-ke-garis' },
  { id: 'r14', materi: 'jarak-titik-ke-bidang' },
  { id: 'r05', materi: 'jarak-sejajar' },
  { id: 'r25', materi: 'sudut-garis-bersilangan' },
  { id: 'r41', materi: 'sudut-dengan-bidang' },
]
