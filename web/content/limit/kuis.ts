/**
 * Bank soal latihan Limit: 60 soal, 15 tiap tingkat.
 *
 * 14 Sep 2026: seluruh pembahasan ditulis ulang meniru cara mathcyber1997
 * (catatan belajar `PELAJARI BENTUK SOAL MATEMATIKA/CATATAN-BELAJAR-PEMBAHASAN.md`
 * bagian 4.5): pembuka baku "Substitusi langsung nilai x = 5 mengakibatkan
 * munculnya bentuk taktentu 0/0. Limit tersebut dapat ditentukan dengan
 * metode pemfaktoran sebagai berikut.", faktor yang dicoret disebut beserta
 * alasannya, "Dengan metode pengalian akar sekawan, diperoleh ...", untuk
 * tak hingga "bagi setiap suku dengan pangkat tertinggi" lalu pendekatan
 * derajat, untuk parameter "padahal limitnya ada, ini berarti pembilang juga
 * harus 0", dan penutup "Jadi, nilai dari lim ... = 2. (Jawaban E)". Gambar
 * bantu: grafik berlubang (noktah putih) untuk 0/0, tabel nilai untuk
 * pendekatan numerik, grafik dengan asimtot untuk limit tak hingga.
 * Pertanyaan ditulis formal: "Nilai dari lim x→3 (x + 4) adalah…".
 *
 * Id soal lama dipertahankan. Delapan soal kembar atau terlalu tipis diganti
 * jenis yang belum ada (pola mathcyber1997, ditulis sendiri): k03 dan k07
 * jadi k61 (membaca limit dari grafik berloncat) dan k62 (sifat limit);
 * k40 dan k44 jadi k63 (limit sepihak menuju tak hingga dengan tabel) dan
 * k64 (parameter supaya limit ada); k48 dan k51 jadi k65 (selisih dua
 * pecahan disatukan dulu) dan k66 (x − 27 dengan akar pangkat tiga); k30 dan
 * k58 jadi k67 (akar sekawan dua kali) dan k68 (selisih akar tak hingga
 * dengan 3x + 1 ditulis sebagai akar).
 *
 * Tiap jawaban berangka punya `// cek:` yang dihitung `alat/cek_kuis.mjs`;
 * `--ketat` juga memeriksa gaya pembahasannya.
 */
export type { TingkatKuis, SoalKuis } from '@/content/tipe'
import type { SoalKuis } from '@/content/tipe'

export const KUIS: SoalKuis[] = [
  // ================================================================ MUDAH
  {
    id: 'k01',
    tingkat: 'mudah',
    pertanyaan: 'Pernyataan yang tepat tentang lim x→c f(x) adalah…',
    pilihan: ['Berapa nilai f(c) kalau x diletakkan tepat di c', 'Berapa nilai terbesar f(x) di sekitar c', 'Apakah f(x) memotong sumbu di c', 'Ke mana f(x) menuju saat x mendekati c dari kiri dan dari kanan', 'Berapa kemiringan grafik f di titik c'],
    benar: 3,
    langkah: [
      'Limit fungsi f di titik c, ditulis lim x→c f(x) = L, berarti nilai f(x) dapat dibuat sedekat mungkin ke L dengan mengambil x cukup dekat ke c, tanpa x harus sama dengan c.',
      {
        teks: 'Perhatikan grafik berikut. Titik (1, 2) sendiri kosong (f tidak terdefinisi di x = 1), tetapi dari kiri dan dari kanan kurva sama-sama menuju tinggi 2, sehingga lim x→1 f(x) = 2. Nilai f(c) tidak menentukan limit; yang menentukan adalah arah kurva di sekitar c.',
        gambar: { jenis: 'grafik', fungsi: ['x + 1'], jangkauan: [-1, 3, -1, 4], lubang: [{ x: 1, y: 2 }], tegak: [1], datar: [2] },
      },
      'Karena itu, limit menanyakan ke mana f(x) menuju ketika x mendekati c dari kedua sisi; limit ada bila arah dari kiri dan dari kanan sama.',
      'Jadi, pernyataan yang tepat adalah ke mana f(x) menuju saat x mendekati c dari kiri dan dari kanan. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, nilai f(c), adalah pengertian yang paling sering tertukar: limit bisa ada walaupun f(c) tidak ada, dan bisa berbeda dari f(c). Pilihan E, kemiringan grafik, adalah pengertian turunan, yang memang dibangun dari limit tetapi bukan limit itu sendiri.',
    alasan: 'Limit menanyakan ke mana f(x) menuju saat x mendekati c dari kedua sisi, bukan nilai f(c).',
  },
  {
    // cek: 3 + 4 === 7
    id: 'k02',
    tingkat: 'mudah',
    pertanyaan: 'Nilai dari lim x→3 (x + 4) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x + 4'], jangkauan: [0, 6, 0, 10], tegak: [3] },
    pilihan: ['3', '7', '4', '12', 'tidak ada'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa f(x) = x + 4 adalah fungsi polinom, sehingga nilainya di dekat x = 3 sama dengan nilainya di x = 3; limitnya dapat dihitung dengan substitusi langsung.',
      {
        teks: 'Substitusikan x = 3, diperoleh lim x→3 (x + 4) = 3 + 4 = 7. Pada grafik, garis y = x + 4 melewati titik (3, 7) tanpa loncatan atau lubang, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x + 4'], jangkauan: [0, 6, 0, 10], titik: [{ x: 3, y: 7, label: '(3, 7)' }], tegak: [3], datar: [7] },
      },
      'Jadi, nilai dari lim x→3 (x + 4) = 7. (Jawaban B)',
    ],
    jebakan: 'Pilihan D, 12, mengalikan 3 dengan 4 alih-alih menjumlahkan. Pilihan E, tidak ada, mengira limit selalu bermasalah, padahal untuk polinom limit selalu ada dan sama dengan nilai fungsinya.',
    alasan: 'Polinom: substitusi langsung, 3 + 4 = 7.',
  },
  {
    id: 'k61',
    tingkat: 'mudah',
    pertanyaan: 'Perhatikan grafik fungsi f berikut. Nilai lim x→2 f(x) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x < 2 ? x + 1 : NaN', 'x > 2 ? x + 1 : NaN'], jangkauan: [-1, 5, -1, 7], lubang: [{ x: 2, y: 3 }], titik: [{ x: 2, y: 5, label: '(2, 5)' }], tegak: [2] },
    pilihan: ['5', 'tidak ada', '3', '2', '4'],
    benar: 2,
    langkah: [
      'Ingat bahwa nilai limit dibaca dari arah kurva ketika x mendekati 2, bukan dari titik yang digambar di x = 2 itu sendiri.',
      {
        teks: 'Tampak pada grafik bahwa lim x→2⁻ f(x) = 3 (kurva dari kiri menuju noktah putih di (2, 3)) dan lim x→2⁺ f(x) = 3 (kurva dari kanan juga menuju noktah putih yang sama), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x < 2 ? x + 1 : NaN', 'x > 2 ? x + 1 : NaN'], jangkauan: [-1, 5, -1, 7], lubang: [{ x: 2, y: 3 }], titik: [{ x: 2, y: 5, label: 'f(2) = 5' }], tegak: [2], datar: [3] },
      },
      'Karena limit kiri sama dengan limit kanan, limitnya ada dan nilainya 3. Noktah hitam di (2, 5) hanya menyatakan f(2) = 5, dan nilai f(2) tidak memengaruhi limit.',
      'Jadi, nilai lim x→2 f(x) = 3. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 5, membaca nilai f(2) dari noktah hitam, padahal limit dibaca dari arah kurva. Pilihan B, tidak ada, mengira loncatan noktah membuat limit gagal; yang membuat limit tidak ada adalah limit kiri dan kanan yang berbeda.',
    alasan: 'Limit kiri = limit kanan = 3; noktah hitam f(2) = 5 tidak memengaruhi limit.',
  },
  {
    id: 'k04',
    tingkat: 'mudah',
    pertanyaan: 'Diketahui lim x→c⁻ f(x) = 5 dan lim x→c⁺ f(x) = 5. Nilai lim x→c f(x) adalah…',
    pilihan: ['10', '0', '5', 'tidak ada', 'bergantung nilai f(c)'],
    benar: 2,
    langkah: [
      'Ingat bahwa limit fungsi di titik c ada jika dan hanya jika limit kiri dan limit kanannya ada dan sama; nilai limitnya adalah nilai bersama itu.',
      'Diketahui lim x→c⁻ f(x) = 5 dan lim x→c⁺ f(x) = 5, sehingga kedua limit sepihak sama.',
      'Dengan demikian, lim x→c f(x) = 5, berapa pun nilai f(c), bahkan bila f(c) tidak ada.',
      'Jadi, nilai lim x→c f(x) = 5. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 10, menjumlahkan kedua limit sepihak, padahal keduanya menunjuk nilai yang SAMA, bukan dua bagian yang digabung. Pilihan E menggoda karena f(c) terasa penting, padahal limit tidak bergantung pada nilai fungsi tepat di c.',
    alasan: 'Limit kiri = limit kanan = 5, jadi limitnya 5.',
  },
  {
    id: 'k05',
    tingkat: 'mudah',
    pertanyaan: 'Diketahui lim x→c⁻ f(x) = 2 dan lim x→c⁺ f(x) = 7. Nilai lim x→c f(x) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x < 3 ? 2 : NaN', 'x >= 3 ? 7 : NaN'], jangkauan: [0, 6, 0, 9], tegak: [3], lubang: [{ x: 3, y: 2 }], titik: [{ x: 3, y: 7 }] },
    pilihan: ['2', '7', '4,5', '9', 'limitnya tidak ada'],
    benar: 4,
    langkah: [
      'Ingat bahwa limit fungsi di titik c ada hanya jika limit kiri dan limit kanannya sama.',
      {
        teks: 'Tampak pada grafik bahwa dari kiri kurva menuju tinggi 2, sedangkan dari kanan menuju tinggi 7; ada loncatan di x = c, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x < 3 ? 2 : NaN', 'x >= 3 ? 7 : NaN'], jangkauan: [0, 6, 0, 9], tegak: [3], lubang: [{ x: 3, y: 2 }], titik: [{ x: 3, y: 7 }], datar: [2, 7] },
      },
      'Karena lim x→c⁻ f(x) = 2 ≠ 7 = lim x→c⁺ f(x), kedua sisi tidak sepakat, sehingga nilai lim x→c f(x) tidak ada.',
      'Jadi, lim x→c f(x) tidak ada. (Jawaban E)',
    ],
    jebakan: 'Pilihan C, 4,5, mengambil rata-rata 2 dan 7, seolah limit adalah jalan tengah; limit bukan kompromi, melainkan satu nilai yang disepakati kedua sisi. Pilihan B, 7, memilih limit kanan saja karena titik hitamnya di sana.',
    alasan: 'Limit kiri 2 dan limit kanan 7 berbeda, jadi limitnya tidak ada.',
  },
  {
    // cek: (-3)*(-3) === 9
    id: 'k06',
    tingkat: 'mudah',
    pertanyaan: 'Nilai dari lim x→−3 x² adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-5, 5, -1, 12], tegak: [-3] },
    pilihan: ['-9', '-6', '9', '6', '3'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa f(x) = x² adalah fungsi polinom, sehingga limitnya dapat dihitung dengan substitusi langsung.',
      {
        teks: 'Substitusikan x = −3, diperoleh lim x→−3 x² = (−3)² = (−3)(−3) = 9. Pada grafik parabola, titik dengan absis −3 berada setinggi 9, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-5, 5, -1, 12], titik: [{ x: -3, y: 9, label: '(-3, 9)' }], tegak: [-3], datar: [9] },
      },
      'Jadi, nilai dari lim x→−3 x² = 9. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, −9, lupa bahwa kuadrat bilangan negatif bernilai positif; (−3)² bukan −(3²). Pilihan B, −6, mengalikan −3 dengan 2 alih-alih mengkuadratkannya.',
    alasan: 'Substitusi langsung: (−3)² = 9.',
  },
  {
    // cek: 2*4 - 3*(-1) === 11
    id: 'k62',
    tingkat: 'mudah',
    pertanyaan: 'Diketahui lim x→2 f(x) = 4 dan lim x→2 g(x) = −1. Nilai dari lim x→2 (2f(x) − 3g(x)) adalah…',
    pilihan: ['5', '8', '-5', '11', '1'],
    benar: 3,
    langkah: [
      'Ingat sifat limit: limit dari jumlah atau selisih sama dengan jumlah atau selisih limitnya, dan konstanta pengali boleh dikeluarkan dari limit, yaitu lim (a·f(x) − b·g(x)) = a·lim f(x) − b·lim g(x).',
      'Dengan sifat itu, diperoleh lim x→2 (2f(x) − 3g(x)) = 2·lim x→2 f(x) − 3·lim x→2 g(x).',
      'Substitusikan nilai yang diketahui: 2(4) − 3(−1) = 8 + 3 = 11.',
      'Jadi, nilai dari lim x→2 (2f(x) − 3g(x)) = 11. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 5, menghitung 8 − 3, lupa bahwa g(x) menuju −1 sehingga −3(−1) = +3. Pilihan B, 8, hanya menghitung suku pertama.',
    alasan: 'Sifat limit: 2(4) − 3(−1) = 11.',
  },
  {
    // cek: Math.abs((2*1 + 1)/(1 + 3) - 0.75) < 1e-9
    id: 'k08',
    tingkat: 'mudah',
    pertanyaan: 'Nilai dari lim x→1 (2x + 1)/(x + 3) adalah…',
    pilihan: ['4/3', '3/4', '1', '3', 'tidak ada'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa substitusi langsung x = 1 membuat penyebut bernilai 1 + 3 = 4 ≠ 0, sehingga fungsi rasional ini terdefinisi di x = 1 dan limitnya sama dengan nilai fungsinya.',
      'Substitusikan x = 1, diperoleh lim x→1 (2x + 1)/(x + 3) = (2·1 + 1)/(1 + 3) = 3/4.',
      'Jadi, nilai dari lim x→1 (2x + 1)/(x + 3) = 3/4. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 4/3, membalik pecahan, penyebut dibagi pembilang. Pilihan E, tidak ada, mengira setiap limit pecahan bermasalah, padahal masalah hanya muncul bila penyebutnya menjadi 0.',
    alasan: 'Penyebut tidak nol, substitusi langsung: 3/4.',
  },
  {
    // cek: 3*2 - 1 === 5
    id: 'k33',
    tingkat: 'mudah',
    pertanyaan: 'Nilai dari lim x→2 (3x − 1) adalah…',
    pilihan: ['6', '2', '5', '-1', 'tidak ada'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa f(x) = 3x − 1 adalah fungsi polinom (garis lurus), sehingga limitnya dihitung dengan substitusi langsung.',
      'Substitusikan x = 2, diperoleh lim x→2 (3x − 1) = 3(2) − 1 = 6 − 1 = 5.',
      'Jadi, nilai dari lim x→2 (3x − 1) = 5. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 6, berhenti pada 3 × 2 tanpa mengurangkan 1. Pilihan B, 2, menyalin nilai yang didekati x, padahal yang ditanya nilai fungsinya.',
    alasan: 'Substitusi langsung: 3(2) − 1 = 5.',
  },
  {
    // cek: (0 + 4)/(0 + 2) === 2
    id: 'k34',
    tingkat: 'mudah',
    pertanyaan: 'Nilai dari lim x→0 (x² + 4)/(x + 2) adalah…',
    pilihan: ['4', '0', '1', '2', 'tidak ada'],
    benar: 3,
    langkah: [
      'Perhatikan bahwa substitusi x = 0 membuat penyebut bernilai 0 + 2 = 2 ≠ 0, sehingga limitnya sama dengan nilai fungsinya di x = 0.',
      'Substitusikan x = 0, diperoleh lim x→0 (x² + 4)/(x + 2) = (0 + 4)/(0 + 2) = 4/2 = 2.',
      'Jadi, nilai dari lim x→0 (x² + 4)/(x + 2) = 2. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 4, hanya menghitung pembilangnya. Pilihan B, 0, mengira x → 0 membuat seluruh fungsi menuju 0, padahal suku tetap 4 dan 2 tidak ikut menghilang.',
    alasan: 'Penyebut tidak nol: 4/2 = 2.',
  },
  {
    id: 'k35',
    tingkat: 'mudah',
    pertanyaan: 'Grafik f berlubang di x = 1: dari kiri dan kanan kurvanya menuju tinggi 2, tetapi titik (1, 2) sendiri kosong. Nilai lim x→1 f(x) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x + 1'], jangkauan: [-1, 3, -1, 4], lubang: [{ x: 1, y: 2 }], tegak: [1] },
    pilihan: ['1', '0', 'tidak ada, karena titiknya kosong', '2', 'tak hingga'],
    benar: 3,
    langkah: [
      'Ingat bahwa limit hanya memperhatikan nilai f(x) untuk x di DEKAT 1, bukan tepat di x = 1; lubang di x = 1 berarti f(1) tidak terdefinisi, dan itu tidak menghalangi limit.',
      {
        teks: 'Tampak pada grafik bahwa lim x→1⁻ f(x) = 2 dan lim x→1⁺ f(x) = 2, karena dari kedua sisi kurva menuju noktah putih di (1, 2), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x + 1'], jangkauan: [-1, 3, -1, 4], lubang: [{ x: 1, y: 2 }], tegak: [1], datar: [2] },
      },
      'Karena limit kiri sama dengan limit kanan, lim x→1 f(x) = 2.',
      'Jadi, nilai lim x→1 f(x) = 2. (Jawaban D)',
    ],
    jebakan: 'Pilihan C, tidak ada karena titiknya kosong, mencampuradukkan nilai fungsi dengan limit; justru contoh inilah yang menunjukkan limit bisa ada tanpa f(1). Pilihan A, 1, menyalin absis lubang, bukan tingginya.',
    alasan: 'Kedua sisi menuju 2; lubang di (1, 2) tidak memengaruhi limit.',
  },
  {
    // cek: Math.sqrt(4) === 2
    id: 'k36',
    tingkat: 'mudah',
    pertanyaan: 'Nilai dari lim x→4 √x adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.sqrt(x)'], jangkauan: [0, 9, 0, 4], tegak: [4] },
    pilihan: ['4', '16', '√2', 'tidak ada', '2'],
    benar: 4,
    langkah: [
      'Perhatikan bahwa f(x) = √x terdefinisi dan kurvanya mulus di sekitar x = 4 (4 berada di dalam daerah asal x ≥ 0), sehingga limitnya dapat dihitung dengan substitusi langsung.',
      {
        teks: 'Substitusikan x = 4, diperoleh lim x→4 √x = √4 = 2, sesuai titik (4, 2) pada grafik berikut.',
        gambar: { jenis: 'grafik', fungsi: ['Math.sqrt(x)'], jangkauan: [0, 9, 0, 4], titik: [{ x: 4, y: 2, label: '(4, 2)' }], tegak: [4], datar: [2] },
      },
      'Jadi, nilai dari lim x→4 √x = 2. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 16, mengkuadratkan 4 alih-alih menarik akarnya. Pilihan A, 4, menyalin nilai yang didekati x tanpa menghitung fungsinya.',
    alasan: 'Substitusi langsung: √4 = 2.',
  },
  {
    id: 'k37',
    tingkat: 'mudah',
    pertanyaan: 'Diketahui f(0,9) = 2,7; f(0,99) = 2,97; dan f(0,999) = 2,997. Nilai lim x→1⁻ f(x) yang paling masuk akal adalah…',
    gambar: { jenis: 'tabel', kepala: ['x', 'f(x)'], baris: [['0,9', '2,7'], ['0,99', '2,97'], ['0,999', '2,997']] },
    pilihan: ['2,997', '2,9', '1', 'tidak bisa ditentukan', '3'],
    benar: 4,
    langkah: [
      'Perhatikan bahwa nilai x pada tabel semakin mendekati 1 dari kiri (0,9; 0,99; 0,999), sehingga tabel ini memperlihatkan perilaku f untuk limit kiri di x = 1.',
      {
        teks: 'Lengkapi tabel dengan selisih nilai f(x) terhadap 3: 3 − 2,7 = 0,3; 3 − 2,97 = 0,03; 3 − 2,997 = 0,003. Selisihnya menyusut sepuluh kali lipat setiap kali x sepuluh kali lebih dekat ke 1.',
        gambar: { jenis: 'tabel', kepala: ['x', 'f(x)', '3 − f(x)'], baris: [['0,9', '2,7', '0,3'], ['0,99', '2,97', '0,03'], ['0,999', '2,997', '0,003']], kolomBaru: [2], sorot: [2] },
      },
      'Tampak bahwa ketika x semakin mendekati 1 dari kiri, nilai f(x) semakin mendekati 3 tanpa pernah berhenti di 2,997; nilai 2,997 hanyalah pemberhentian terakhir pada tabel, bukan tujuannya.',
      'Jadi, nilai lim x→1⁻ f(x) yang paling masuk akal adalah 3. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 2,997, mengambil baris terakhir tabel seolah itu tujuannya, padahal tabel bisa diperpanjang (0,9999 memberi 2,9997) dan terus mendekati 3. Pilihan C, 1, menyalin nilai yang didekati x.',
    alasan: 'Selisih ke 3 menyusut 0,3; 0,03; 0,003: f(x) menuju 3.',
  },
  {
    // cek: Math.abs(1/1e6) < 1e-3
    id: 'k38',
    tingkat: 'mudah',
    pertanyaan: 'Nilai dari lim x→∞ 1/x adalah…',
    gambar: { jenis: 'grafik', fungsi: ['1/x'], jangkauan: [0.2, 12, -0.5, 3] },
    pilihan: ['0', '1', 'tak hingga', 'tidak ada', '-1'],
    benar: 0,
    langkah: [
      {
        teks: 'Perhatikan tabel nilai berikut: ketika x membesar tanpa batas, 1/x menyusut menuju 0 tanpa pernah bernilai 0.',
        gambar: { jenis: 'tabel', kepala: ['x', '1/x'], baris: [['10', '0,1'], ['100', '0,01'], ['1.000', '0,001'], ['1.000.000', '0,000001']] },
      },
      {
        teks: 'Pada grafik y = 1/x, kurva semakin menempel ke sumbu-x (garis y = 0) ketika x semakin ke kanan; garis y = 0 adalah asimtot datarnya, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['1/x'], jangkauan: [0.2, 12, -0.5, 3], datar: [0] },
      },
      'Dengan demikian, lim x→∞ 1/x = 0. Ini fakta dasar yang dipakai pada semua limit tak hingga: 1/xⁿ → 0 untuk n > 0.',
      'Jadi, nilai dari lim x→∞ 1/x = 0. (Jawaban A)',
    ],
    jebakan: 'Pilihan C, tak hingga, menukar arah: yang menuju tak hingga adalah x, sedangkan 1/x justru mengecil. Pilihan D, tidak ada, mengira nilai yang tidak pernah tercapai (0) tidak boleh jadi limit; limit adalah tujuan, bukan nilai yang harus dicapai.',
    alasan: '1/x menyusut ke 0 ketika x membesar tanpa batas.',
  },
  {
    id: 'k39',
    tingkat: 'mudah',
    pertanyaan: 'Untuk x mendekati 0, nilai 1/x² membesar tanpa batas. Pernyataan yang tepat tentang lim x→0 1/x² adalah…',
    gambar: { jenis: 'grafik', fungsi: ['1/(x*x)'], jangkauan: [-3, 3, -1, 8], tegak: [0] },
    pilihan: ['0', '1', '1 dibagi 0 sama dengan 0', '2', 'Tidak ada; nilainya membesar tanpa batas'],
    benar: 4,
    langkah: [
      {
        teks: 'Perhatikan tabel nilai berikut: ketika x semakin dekat ke 0 (dari kiri maupun kanan), 1/x² semakin besar tanpa batas.',
        gambar: { jenis: 'tabel', kepala: ['x', '1/x²'], baris: [['0,1', '100'], ['0,01', '10.000'], ['0,001', '1.000.000'], ['−0,001', '1.000.000']] },
      },
      {
        teks: 'Pada grafik, kurva melesat ke atas di kedua sisi garis x = 0 (asimtot tegak) dan tidak pernah mendekati satu bilangan tertentu, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['1/(x*x)'], jangkauan: [-3, 3, -1, 8], tegak: [0] },
      },
      'Limit dikatakan ada hanya bila nilai fungsi mendekati SATU bilangan. Karena 1/x² membesar tanpa batas, lim x→0 1/x² tidak ada; ditulis lim x→0 1/x² = ∞ sebagai keterangan perilakunya, bukan sebagai nilai.',
      'Jadi, lim x→0 1/x² tidak ada karena nilainya membesar tanpa batas. (Jawaban E)',
    ],
    jebakan: 'Pilihan C, 1 dibagi 0 sama dengan 0, adalah kekeliruan aritmetika: pembagian dengan nol tidak terdefinisi, bukan nol. Pilihan A, 0, menukar dengan lim x→∞ 1/x².',
    alasan: 'Nilainya membesar tanpa batas di kedua sisi, tidak menuju satu bilangan: limit tidak ada.',
  },
  // =============================================================== SEDANG
  {
    // cek: Math.abs((5.001*5.001 - 25)/(5.001 - 5) - 10) < 0.01
    id: 'k09',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari lim x→5 (x² − 25)/(x − 5) adalah…',
    pilihan: ['0', '5', '25', 'tidak ada', '10'],
    benar: 4,
    langkah: [
      'Substitusi langsung nilai x = 5 mengakibatkan munculnya bentuk taktentu 0/0, karena pembilang 25 − 25 = 0 dan penyebut 5 − 5 = 0. Limit tersebut dapat ditentukan dengan metode pemfaktoran sebagai berikut.',
      'Dengan memfaktorkan pembilang sebagai selisih dua kuadrat, diperoleh lim x→5 (x² − 25)/(x − 5) = lim x→5 (x − 5)(x + 5)/(x − 5).',
      'Coret faktor (x − 5) yang sama pada pembilang dan penyebut (boleh, karena x hanya mendekati 5 dan tidak pernah sama dengan 5, sehingga x − 5 ≠ 0), sehingga tersisa lim x→5 (x + 5) = 5 + 5 = 10.',
      {
        teks: 'Grafik fungsinya adalah garis y = x + 5 yang berlubang di (5, 10): dari kedua sisi kurva menuju tinggi 10, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x + 5'], jangkauan: [0, 8, 0, 14], lubang: [{ x: 5, y: 10 }], tegak: [5], datar: [10] },
      },
      'Jadi, nilai dari lim x→5 (x² − 25)/(x − 5) = 10. (Jawaban E)',
    ],
    jebakan: 'Pilihan D, tidak ada, berhenti pada bentuk 0/0 seolah itu jawaban akhir, padahal 0/0 hanya tanda bahwa bentuknya harus ditulis ulang. Pilihan A, 0, mengambil pembilang 0 tanpa memperhatikan penyebut yang juga 0.',
    alasan: 'Bentuk 0/0; faktorkan (x − 5)(x + 5)/(x − 5) = x + 5 → 10.',
  },
  {
    // cek: Math.abs((1.001*1.001 - 1)/(1.001 - 1) - 2) < 0.01
    id: 'k10',
    tingkat: 'sedang',
    pertanyaan: 'Fungsi f(x) = (x² − 1)/(x − 1) tidak terdefinisi di x = 1. Nilai lim x→1 f(x) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x + 1'], jangkauan: [-1, 3, -1, 4], lubang: [{ x: 1, y: 2 }] },
    pilihan: ['0', '1', 'tidak ada, karena f(1) tidak ada', '2', 'tak hingga'],
    benar: 3,
    langkah: [
      'Substitusi langsung nilai x = 1 mengakibatkan munculnya bentuk taktentu 0/0. Limit tersebut dapat ditentukan dengan metode pemfaktoran sebagai berikut.',
      'Dengan memfaktorkan pembilang, diperoleh lim x→1 (x² − 1)/(x − 1) = lim x→1 (x − 1)(x + 1)/(x − 1).',
      'Coret faktor (x − 1) yang sama (x mendekati 1, bukan sama dengan 1), sehingga tersisa lim x→1 (x + 1) = 1 + 1 = 2.',
      {
        teks: 'Grafik f adalah garis y = x + 1 dengan satu lubang di (1, 2). Fungsi memang tidak terdefinisi di x = 1, tetapi dari kedua sisi kurva menuju 2, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x + 1'], jangkauan: [-1, 3, -1, 4], lubang: [{ x: 1, y: 2 }], tegak: [1], datar: [2] },
      },
      'Jadi, nilai lim x→1 f(x) = 2. (Jawaban D)',
    ],
    jebakan: 'Pilihan C, tidak ada karena f(1) tidak ada, mencampuradukkan nilai fungsi dengan limit; limit hanya melihat x di dekat 1. Pilihan E, tak hingga, mengira pembagian dengan nol selalu meledak, padahal pembilangnya juga menuju nol.',
    alasan: 'Bentuk 0/0; faktorkan menjadi x + 1 → 2, walau f(1) tidak ada.',
  },
  {
    // cek: Math.abs(Math.sin(0.001)/0.001 - 1) < 1e-4
    id: 'k11',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari lim x→0 (sin x)/x, dengan x dalam radian, adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.sin(x)/x'], jangkauan: [-6, 6, -0.5, 1.3], lubang: [{ x: 0, y: 1 }] },
    pilihan: ['0', 'sin', '1', 'tidak ada', 'tak hingga'],
    benar: 2,
    langkah: [
      'Substitusi langsung x = 0 memberi bentuk taktentu 0/0, karena sin 0 = 0 dan penyebutnya 0.',
      {
        teks: 'Perhatikan tabel nilai berikut (x dalam radian): semakin dekat x ke 0, nilai sin x semakin hampir sama dengan x itu sendiri, sehingga perbandingannya menuju 1.',
        gambar: { jenis: 'tabel', kepala: ['x', 'sin x', '(sin x)/x'], baris: [['0,5', '0,4794', '0,9589'], ['0,1', '0,0998', '0,9983'], ['0,01', '0,0099998', '0,99998']], kolomBaru: [2] },
      },
      {
        teks: 'Grafik y = (sin x)/x berlubang di (0, 1) dan dari kedua sisi menuju 1, seperti gambar berikut. Hasil ini adalah limit trigonometri dasar: lim x→0 (sin x)/x = 1.',
        gambar: { jenis: 'grafik', fungsi: ['Math.sin(x)/x'], jangkauan: [-6, 6, -0.5, 1.3], lubang: [{ x: 0, y: 1 }], datar: [1] },
      },
      'Jadi, nilai dari lim x→0 (sin x)/x = 1. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 0, hanya melihat pembilang sin 0 = 0 tanpa memperhatikan penyebut yang juga menuju 0. Pilihan D, tidak ada, mengira lubang di x = 0 menggagalkan limit. Catatan: hasil 1 hanya berlaku bila x dalam radian; dalam derajat limitnya π/180.',
    alasan: 'Limit trigonometri dasar: sin x ≈ x di dekat 0, sehingga (sin x)/x → 1.',
  },
  {
    // cek: Math.abs((3*1e6 + 1)/(1e6 - 2) - 3) < 1e-4
    id: 'k12',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari lim x→∞ (3x + 1)/(x − 2) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['(3*x + 1)/(x - 2)'], jangkauan: [3, 40, 0, 8] },
    pilihan: ['0', '1/2', 'tak hingga', 'tidak ada', '3'],
    benar: 4,
    langkah: [
      'Perhatikan bahwa ketika x menuju tak hingga, pembilang dan penyebut sama-sama membesar tanpa batas, sehingga muncul bentuk taktentu ∞/∞. Limit tersebut ditentukan dengan membagi setiap suku dengan variabel berpangkat tertinggi, yaitu x.',
      'Dengan membagi setiap suku dengan x, diperoleh lim x→∞ (3x + 1)/(x − 2) = lim x→∞ (3x/x + 1/x)/(x/x − 2/x) = lim x→∞ (3 + 1/x)/(1 − 2/x).',
      'Ingat bahwa 1/x → 0 dan 2/x → 0 ketika x → ∞. Untuk itu, nilai limitnya adalah (3 + 0)/(1 − 0) = 3.',
      {
        teks: 'Pendekatan lain: pembilang dan penyebut adalah polinom berderajat sama (derajat 1), sehingga limitnya adalah perbandingan koefisien pangkat tertinggi, 3/1 = 3. Pada grafik, kurva semakin menempel ke garis y = 3 (asimtot datar), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['(3*x + 1)/(x - 2)'], jangkauan: [3, 40, 0, 8], datar: [3], nama: ['y = (3x + 1)/(x − 2), asimtot y = 3'] },
      },
      'Jadi, nilai dari lim x→∞ (3x + 1)/(x − 2) = 3. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 1/2, membagi konstanta 1 dengan −2 dengan tanda terbalik, padahal konstanta justru tidak berpengaruh ketika x sangat besar. Pilihan C, tak hingga, hanya melihat pembilang membesar tanpa membandingkannya dengan penyebut.',
    alasan: 'Bagi dengan x: (3 + 1/x)/(1 − 2/x) → 3/1 = 3.',
  },
  {
    id: 'k13',
    tingkat: 'sedang',
    pertanyaan: 'Manakah yang BUKAN syarat fungsi f kontinu di titik c?',
    gambar: { jenis: 'grafik', fungsi: ['Math.abs(x)'], jangkauan: [-3, 3, -1, 4] },
    pilihan: ['grafiknya tidak boleh punya sudut tajam di c', 'f(c) harus ada', 'limit f(x) di c harus ada', 'limitnya harus sama dengan f(c)', 'ketiga syarat di atas harus terpenuhi sekaligus'],
    benar: 0,
    langkah: [
      'Ingat bahwa fungsi f kontinu di titik c bila tiga syarat terpenuhi sekaligus: f(c) ada, lim x→c f(x) ada, dan lim x→c f(x) = f(c). Secara gambar, kurvanya dapat digambar melewati c tanpa mengangkat pena.',
      {
        teks: 'Perhatikan grafik y = |x| berikut. Di x = 0 grafik mempunyai sudut tajam, tetapi f(0) = 0, lim x→0 |x| = 0 (kedua sisi menuju 0), dan keduanya sama; ketiga syarat terpenuhi, sehingga |x| kontinu di 0 walau bersudut tajam.',
        gambar: { jenis: 'grafik', fungsi: ['Math.abs(x)'], jangkauan: [-3, 3, -1, 4], titik: [{ x: 0, y: 0, label: '(0, 0)' }] },
      },
      'Dengan demikian, sudut tajam tidak melanggar kekontinuan; sudut tajam hanya membuat fungsi tidak mempunyai TURUNAN di titik itu.',
      'Jadi, yang bukan syarat kekontinuan adalah grafiknya tidak boleh punya sudut tajam di c. (Jawaban A)',
    ],
    jebakan: 'Pilihan E menggoda karena berbunyi seperti kalimat definisi, padahal isinya benar (memang ketiganya harus terpenuhi sekaligus), sehingga bukan jawaban dari "yang BUKAN syarat". Sudut tajam sering dikira memutus kurva karena tampak "patah", padahal penanya tidak perlu diangkat.',
    alasan: 'Syarat kontinu: f(c) ada, limit ada, limit = f(c). Sudut tajam (seperti |x| di 0) tidak melanggar; itu soal turunan.',
  },
  {
    // cek: Math.abs((3.001*3.001 - 3.001 - 6)/(3.001 - 3) - 5) < 0.01
    id: 'k14',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari lim x→3 (x² − x − 6)/(x − 3) adalah…',
    pilihan: ['0', '3', '6', '5', 'tidak ada'],
    benar: 3,
    langkah: [
      'Substitusi langsung nilai x = 3 mengakibatkan munculnya bentuk taktentu 0/0, karena 9 − 3 − 6 = 0 dan 3 − 3 = 0. Limit tersebut dapat ditentukan dengan metode pemfaktoran sebagai berikut.',
      'Cari dua bilangan yang hasil kalinya −6 dan jumlahnya −1, yaitu −3 dan 2, sehingga x² − x − 6 = (x − 3)(x + 2). Dengan demikian, lim x→3 (x² − x − 6)/(x − 3) = lim x→3 (x − 3)(x + 2)/(x − 3).',
      'Coret faktor (x − 3) yang sama, sehingga tersisa lim x→3 (x + 2) = 3 + 2 = 5.',
      {
        teks: 'Grafiknya garis y = x + 2 berlubang di (3, 5), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x + 2'], jangkauan: [0, 6, 0, 9], lubang: [{ x: 3, y: 5 }], tegak: [3], datar: [5] },
      },
      'Jadi, nilai dari lim x→3 (x² − x − 6)/(x − 3) = 5. (Jawaban D)',
    ],
    jebakan: 'Pilihan C, 6, muncul dari pemfaktoran keliru (x − 3)(x + 3), seolah pembilangnya x² − 9. Pilihan B, 3, menyalin nilai yang didekati x.',
    alasan: 'Bentuk 0/0; faktorkan (x − 3)(x + 2)/(x − 3) = x + 2 → 5.',
  },
  {
    // cek: Math.abs((2*1e6 + 7)/(1e12 + 1)) < 1e-4
    id: 'k15',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari lim x→∞ (2x + 7)/(x² + 1) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['(2*x + 7)/(x*x + 1)'], jangkauan: [0, 30, -0.5, 3] },
    pilihan: ['2', '7', 'tak hingga', '0', 'tidak ada'],
    benar: 3,
    langkah: [
      'Perhatikan bahwa bentuknya ∞/∞ ketika x → ∞. Limit tersebut ditentukan dengan membagi setiap suku dengan variabel berpangkat tertinggi, yaitu x².',
      'Dengan membagi setiap suku dengan x², diperoleh lim x→∞ (2x + 7)/(x² + 1) = lim x→∞ (2/x + 7/x²)/(1 + 1/x²).',
      'Karena 2/x → 0, 7/x² → 0, dan 1/x² → 0 ketika x → ∞, nilai limitnya adalah (0 + 0)/(1 + 0) = 0.',
      {
        teks: 'Pendekatan lain: pembilang berderajat 1 dan penyebut berderajat 2. Karena derajat pembilang lebih kecil dari derajat penyebut, nilai limitnya 0; penyebut tumbuh jauh lebih cepat. Pada grafik, kurva menempel ke sumbu-x, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['(2*x + 7)/(x*x + 1)'], jangkauan: [0, 30, -0.5, 3], datar: [0] },
      },
      'Jadi, nilai dari lim x→∞ (2x + 7)/(x² + 1) = 0. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 2, mengambil koefisien pangkat tertinggi pembilang dibagi koefisien penyebut, padahal aturan "perbandingan koefisien" hanya berlaku bila derajat pembilang dan penyebut SAMA. Pilihan C, tak hingga, hanya melihat pembilang membesar.',
    alasan: 'Derajat pembilang (1) < derajat penyebut (2): limitnya 0.',
  },
  {
    // cek: Math.abs(Math.sin(4*0.001)/(2*0.001) - 2) < 1e-4
    id: 'k16',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari lim x→0 (sin 4x)/(2x) adalah…',
    pilihan: ['1/2', '2', '1', '4', '8'],
    benar: 1,
    langkah: [
      'Substitusi langsung x = 0 memberi bentuk taktentu 0/0. Ingat limit trigonometri dasar lim u→0 (sin u)/u = 1, yang berlaku selama sudut di dalam sinus SAMA dengan penyebutnya.',
      'Supaya sudut 4x muncul di penyebut, tulis ulang (sin 4x)/(2x) = (sin 4x)/(4x) × (4x)/(2x) = (sin 4x)/(4x) × 2.',
      'Ketika x → 0, juga 4x → 0, sehingga (sin 4x)/(4x) → 1. Untuk itu, lim x→0 (sin 4x)/(2x) = 1 × 2 = 2.',
      'Secara umum berlaku lim x→0 (sin ax)/(bx) = a/b; di sini a/b = 4/2 = 2.',
      'Jadi, nilai dari lim x→0 (sin 4x)/(2x) = 2. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 1/2, membalik perbandingan menjadi b/a = 2/4. Pilihan C, 1, memakai lim (sin u)/u = 1 tanpa memperhatikan bahwa sudutnya 4x sedangkan penyebutnya 2x.',
    alasan: '(sin 4x)/(2x) = (sin 4x)/(4x) × 2 → 1 × 2 = 2.',
  },
  {
    // cek: 3.999/(3.999 - 4) < -1000
    id: 'k63',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari lim x→4⁻ x/(x − 4) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x/(x - 4)'], jangkauan: [0, 8, -12, 12], tegak: [4] },
    pilihan: ['4', 'tidak ada; nilainya menuju negatif tak hingga', '0', '1', 'tidak ada; nilainya menuju positif tak hingga'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa substitusi x = 4 membuat penyebut bernilai 0 sedangkan pembilangnya 4 ≠ 0, sehingga bentuknya 4/0, bukan 0/0: nilai fungsi membesar tanpa batas, dan tandanya harus diperiksa dari sisi yang diminta, yaitu dari kiri (x < 4).',
      {
        teks: 'Perhatikan tabel nilai berikut untuk x mendekati 4 dari kiri.',
        gambar: { jenis: 'tabel', kepala: ['x', 'x − 4', 'x/(x − 4)'], baris: [['3,9', '−0,1', '−39'], ['3,99', '−0,01', '−399'], ['3,999', '−0,001', '−3.999']], kolomBaru: [1, 2] },
      },
      'Tampak bahwa ketika x semakin mendekati 4 dari kiri, penyebut x − 4 adalah bilangan negatif yang semakin kecil, sedangkan pembilang mendekati 4 (positif), sehingga hasil baginya negatif dan besarnya membesar tanpa batas.',
      {
        teks: 'Pendekatan geometris: pada grafik y = x/(x − 4), di sebelah kiri asimtot tegak x = 4 kurva melesat ke bawah, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x/(x - 4)'], jangkauan: [0, 8, -12, 12], tegak: [4], datar: [1], arsir: [{ dari: 3, sampai: 4, label: 'x → 4⁻' }] },
      },
      'Dengan demikian, limit kirinya tidak ada sebagai bilangan; perilakunya ditulis lim x→4⁻ x/(x − 4) = −∞.',
      'Jadi, lim x→4⁻ x/(x − 4) tidak ada; nilainya menuju negatif tak hingga. (Jawaban B)',
    ],
    jebakan: 'Pilihan E, positif tak hingga, adalah perilaku dari sisi KANAN (x > 4, penyebut positif kecil). Pilihan D, 1, adalah limit ketika x → ∞ (asimtot datar y = 1), bukan ketika x → 4.',
    alasan: 'Bentuk 4/0 dari kiri: penyebut negatif kecil, hasilnya menuju −∞.',
  },
  {
    // cek: Math.abs(Math.sin(3*0.001)/0.001 - 3) < 1e-4
    id: 'k41',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari lim x→0 (sin 3x)/x adalah…',
    pilihan: ['1', '3', '0', '1/3', 'tidak ada'],
    benar: 1,
    langkah: [
      'Substitusi langsung x = 0 memberi bentuk taktentu 0/0. Ingat limit trigonometri dasar lim u→0 (sin u)/u = 1.',
      'Supaya sudut 3x muncul di penyebut, tulis ulang (sin 3x)/x = (sin 3x)/(3x) × 3.',
      'Ketika x → 0, juga 3x → 0, sehingga (sin 3x)/(3x) → 1. Untuk itu, lim x→0 (sin 3x)/x = 1 × 3 = 3.',
      'Jadi, nilai dari lim x→0 (sin 3x)/x = 3. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 1, memakai lim (sin u)/u = 1 tanpa menyamakan sudut 3x dengan penyebut x. Pilihan D, 1/3, membalik pengalinya.',
    alasan: '(sin 3x)/x = (sin 3x)/(3x) × 3 → 3.',
  },
  {
    // cek: Math.abs((2e12 + 1)/(1e12 - 3) - 2) < 1e-4
    id: 'k42',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari lim x→∞ (2x² + 1)/(x² − 3) adalah…',
    pilihan: ['0', '-1/3', '2', 'tak hingga', '1'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa bentuknya ∞/∞ ketika x → ∞. Limit tersebut ditentukan dengan membagi setiap suku dengan variabel berpangkat tertinggi, yaitu x².',
      'Dengan membagi setiap suku dengan x², diperoleh lim x→∞ (2x² + 1)/(x² − 3) = lim x→∞ (2 + 1/x²)/(1 − 3/x²).',
      'Karena 1/x² → 0 dan 3/x² → 0 ketika x → ∞, nilai limitnya adalah (2 + 0)/(1 − 0) = 2.',
      'Pendekatan lain: derajat pembilang sama dengan derajat penyebut (keduanya 2), sehingga limitnya adalah perbandingan koefisien pangkat tertinggi, 2/1 = 2.',
      'Jadi, nilai dari lim x→∞ (2x² + 1)/(x² − 3) = 2. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, −1/3, membagi konstanta 1 dengan −3, padahal konstanta tidak berpengaruh ketika x sangat besar. Pilihan D, tak hingga, hanya melihat pembilang membesar tanpa membandingkannya dengan penyebut yang membesar sama cepatnya.',
    alasan: 'Derajat sama: perbandingan koefisien x², 2/1 = 2.',
  },
  {
    // cek: 1*1 === 1 && 2*1 - 1 === 1
    id: 'k43',
    tingkat: 'sedang',
    pertanyaan: 'Fungsi f(x) = x² untuk x < 1 dan f(x) = 2x − 1 untuk x ≥ 1. Apakah f kontinu di x = 1?',
    gambar: { jenis: 'grafik', fungsi: ['x < 1 ? x*x : 2*x - 1'], jangkauan: [-1, 3, -1, 5] },
    pilihan: ['Ya, kedua potongan bertemu di (1, 1)', 'Tidak, karena rumusnya berganti', 'Tidak, limit kiri 1 dan limit kanan 2', 'Tidak, karena f(1) tidak ada', 'Tidak bisa ditentukan'],
    benar: 0,
    langkah: [
      'Fungsi kontinu di x = 1 bila f(1) ada, lim x→1 f(x) ada, dan keduanya sama. Periksa ketiganya satu per satu.',
      'Pertama, karena x = 1 memenuhi x ≥ 1, rumus yang dipakai adalah f(x) = 2x − 1, sehingga f(1) = 2(1) − 1 = 1.',
      'Kedua, limit kiri memakai rumus untuk x < 1: lim x→1⁻ f(x) = lim x→1⁻ x² = 1² = 1. Limit kanan memakai rumus untuk x ≥ 1: lim x→1⁺ f(x) = lim x→1⁺ (2x − 1) = 2(1) − 1 = 1. Karena keduanya sama, lim x→1 f(x) = 1.',
      {
        teks: 'Ketiga, lim x→1 f(x) = 1 = f(1). Pada grafik, potongan parabola dan potongan garis bertemu di titik (1, 1) tanpa loncatan, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x < 1 ? x*x : 2*x - 1'], jangkauan: [-1, 3, -1, 5], titik: [{ x: 1, y: 1, label: '(1, 1)' }], tegak: [1] },
      },
      'Jadi, f kontinu di x = 1 karena kedua potongan bertemu di (1, 1). (Jawaban A)',
    ],
    jebakan: 'Pilihan B, tidak karena rumusnya berganti, mengira pergantian rumus otomatis memutus kurva; yang menentukan adalah apakah kedua rumus memberi nilai sama di titik sambungan. Pilihan C keliru menghitung limit kanan 2(1) − 1 sebagai 2.',
    alasan: 'Limit kiri 1, limit kanan 1, f(1) = 1: ketiganya sama, kontinu.',
  },
  {
    // cek: Math.abs((-3)*(-3) + 5*(-3) + 6) < 1e-9 && Math.abs(((-3.001)**2 + 5*(-3.001) + 6)/(-3.001 + 3) + 1) < 0.01
    id: 'k64',
    tingkat: 'sedang',
    pertanyaan: 'Jika lim x→−3 (x² + cx + 6)/(x + 3) mempunyai nilai (berhingga), nilai c adalah…',
    pilihan: ['5', '-5', '3', '-3', '2'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa substitusi langsung x = −3 pada fungsi menghasilkan penyebut bernilai −3 + 3 = 0, padahal limitnya ada (berhingga). Ini berarti hasil substitusi juga harus menghasilkan pembilang 0, supaya bentuknya 0/0 yang masih bisa disederhanakan, bukan bilangan/0 yang meledak.',
      'Substitusikan x = −3 pada pembilang dan samakan dengan 0: (−3)² + c(−3) + 6 = 0, sehingga 9 − 3c + 6 = 0, yaitu 15 = 3c dan c = 5.',
      'Sebagai pemeriksaan, dengan c = 5 pembilangnya x² + 5x + 6 = (x + 3)(x + 2), sehingga lim x→−3 (x + 3)(x + 2)/(x + 3) = lim x→−3 (x + 2) = −3 + 2 = −1, memang berhingga.',
      'Jadi, nilai c adalah 5. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, −5, salah tanda saat memindahkan ruas: 9 + 6 = 15 harus sama dengan 3c, bukan −3c. Pilihan C, 3, menebak dari angka pada penyebut x + 3.',
    alasan: 'Limit ada dan penyebut 0 memaksa pembilang 0: 9 − 3c + 6 = 0, c = 5.',
  },
  {
    // cek: Math.abs(Math.tan(0.001)/0.001 - 1) < 1e-4
    id: 'k45',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari lim x→0 (tan x)/x adalah…',
    pilihan: ['0', 'tidak ada', '1', 'tak hingga', '1/2'],
    benar: 2,
    langkah: [
      'Substitusi langsung x = 0 memberi bentuk taktentu 0/0, karena tan 0 = 0.',
      'Ingat bahwa tan x = (sin x)/(cos x), sehingga (tan x)/x = (sin x)/x × 1/(cos x).',
      'Dengan sifat limit hasil kali, lim x→0 (tan x)/x = lim x→0 (sin x)/x × lim x→0 1/(cos x) = 1 × 1/(cos 0) = 1 × 1/1 = 1.',
      'Jadi, nilai dari lim x→0 (tan x)/x = 1. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 0, hanya melihat tan 0 = 0 tanpa memperhatikan penyebut yang juga menuju 0. Pilihan D, tak hingga, mengira tangen selalu meledak; itu terjadi di dekat 90°, bukan di dekat 0.',
    alasan: '(tan x)/x = (sin x)/x × 1/cos x → 1 × 1 = 1.',
  },
  {
    // cek: Math.abs((1e18 - 1)/(2e18 + 1e6) - 0.5) < 1e-4
    id: 'k46',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari lim x→∞ (x³ − 1)/(2x³ + x) adalah…',
    pilihan: ['0', '1/2', '1', '-1', 'tak hingga'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa bentuknya ∞/∞ ketika x → ∞. Limit tersebut ditentukan dengan membagi setiap suku dengan variabel berpangkat tertinggi, yaitu x³.',
      'Dengan membagi setiap suku dengan x³, diperoleh lim x→∞ (x³ − 1)/(2x³ + x) = lim x→∞ (1 − 1/x³)/(2 + 1/x²).',
      'Karena 1/x³ → 0 dan 1/x² → 0 ketika x → ∞, nilai limitnya adalah (1 − 0)/(2 + 0) = 1/2.',
      'Pendekatan lain: derajat pembilang sama dengan derajat penyebut (keduanya 3), sehingga limitnya adalah perbandingan koefisien x³, yaitu 1/2.',
      'Jadi, nilai dari lim x→∞ (x³ − 1)/(2x³ + x) = 1/2. (Jawaban B)',
    ],
    jebakan: 'Pilihan D, −1, membagi konstanta −1 dengan suku x pada penyebut seolah keduanya yang menentukan. Pilihan C, 1, mengabaikan koefisien 2 pada penyebut.',
    alasan: 'Derajat sama: perbandingan koefisien x³, 1/2.',
  },
  // ================================================================ SULIT
  {
    // cek: Math.abs((Math.sqrt(0.001 + 9) - 3)/0.001 - 1/6) < 1e-3
    id: 'k17',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari lim x→0 (√(x + 9) − 3)/x adalah…',
    pilihan: ['0', '1/3', '3', '1/6', 'tidak ada'],
    benar: 3,
    langkah: [
      'Substitusi langsung nilai x = 0 mengakibatkan munculnya bentuk taktentu 0/0, karena √9 − 3 = 0. Karena pembilang memuat bentuk akar, limit tersebut ditentukan dengan metode pengalian akar sekawan.',
      'Sekawan dari √(x + 9) − 3 adalah √(x + 9) + 3. Dengan mengalikan pembilang dan penyebut dengan bentuk sekawan itu, diperoleh lim x→0 (√(x + 9) − 3)/x × (√(x + 9) + 3)/(√(x + 9) + 3) = lim x→0 ((x + 9) − 9)/(x(√(x + 9) + 3)) = lim x→0 x/(x(√(x + 9) + 3)).',
      'Coret faktor x yang sama pada pembilang dan penyebut, sehingga tersisa lim x→0 1/(√(x + 9) + 3).',
      'Substitusikan x = 0, diperoleh 1/(√9 + 3) = 1/(3 + 3) = 1/6.',
      {
        teks: 'Grafik fungsinya berlubang di (0, 1/6) dan dari kedua sisi menuju 1/6, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['(Math.sqrt(x + 9) - 3)/x'], jangkauan: [-6, 6, 0, 0.4], lubang: [{ x: 0, y: 0.1667 }], datar: [0.1667] },
      },
      'Jadi, nilai dari lim x→0 (√(x + 9) − 3)/x = 1/6. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 0, berhenti pada pembilang √9 − 3 = 0 tanpa memperhatikan penyebut yang juga 0. Pilihan B, 1/3, lupa menambahkan 3 pada penyebut setelah sekawan (memakai 1/√9 saja).',
    alasan: 'Kalikan sekawan: x/(x(√(x + 9) + 3)) → 1/(3 + 3) = 1/6.',
  },
  {
    // cek: Math.abs(Math.tan(3*0.001)/Math.sin(5*0.001) - 0.6) < 1e-4
    id: 'k18',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari lim x→0 (tan 3x)/(sin 5x) adalah…',
    pilihan: ['3/5', '0', '5/3', '1', '15'],
    benar: 0,
    langkah: [
      'Substitusi langsung x = 0 memberi bentuk taktentu 0/0. Ingat limit trigonometri dasar lim u→0 (sin u)/u = 1 dan lim u→0 (tan u)/u = 1.',
      'Bagi pembilang dan penyebut dengan x supaya bentuk dasar itu muncul: (tan 3x)/(sin 5x) = ((tan 3x)/x)/((sin 5x)/x).',
      'Tulis (tan 3x)/x = (tan 3x)/(3x) × 3 → 1 × 3 = 3, dan (sin 5x)/x = (sin 5x)/(5x) × 5 → 1 × 5 = 5 ketika x → 0.',
      'Dengan sifat limit hasil bagi, diperoleh lim x→0 (tan 3x)/(sin 5x) = 3/5.',
      'Secara umum berlaku lim x→0 (tan ax)/(sin bx) = a/b, dengan a dan b koefisien sudutnya.',
      'Jadi, nilai dari lim x→0 (tan 3x)/(sin 5x) = 3/5. (Jawaban A)',
    ],
    jebakan: 'Pilihan C, 5/3, membalik perbandingan (koefisien penyebut dibagi pembilang). Pilihan E, 15, mengalikan kedua koefisien alih-alih membaginya.',
    alasan: '(tan 3x)/(sin 5x) → 3/5 (perbandingan koefisien sudut).',
  },
  {
    // cek: Math.abs((2.001**3 - 8)/(2.001 - 2) - 12) < 0.02
    id: 'k19',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari lim x→2 (x³ − 8)/(x − 2) adalah…',
    pilihan: ['0', '4', '8', 'tidak ada', '12'],
    benar: 4,
    langkah: [
      'Substitusi langsung nilai x = 2 mengakibatkan munculnya bentuk taktentu 0/0, karena 8 − 8 = 0. Limit tersebut dapat ditentukan dengan metode pemfaktoran sebagai berikut.',
      'Ingat rumus selisih dua kubik a³ − b³ = (a − b)(a² + ab + b²). Dengan a = x dan b = 2, diperoleh x³ − 8 = (x − 2)(x² + 2x + 4).',
      'Dengan demikian, lim x→2 (x³ − 8)/(x − 2) = lim x→2 (x − 2)(x² + 2x + 4)/(x − 2). Coret faktor (x − 2) yang sama, sehingga tersisa lim x→2 (x² + 2x + 4).',
      'Substitusikan x = 2, diperoleh 2² + 2(2) + 4 = 4 + 4 + 4 = 12.',
      'Jadi, nilai dari lim x→2 (x³ − 8)/(x − 2) = 12. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 4, hanya menghitung suku x² = 4 dari faktor kuadratnya. Pilihan C, 8, memakai pemfaktoran keliru (x − 2)(x² + 4) yang sebenarnya sama dengan x³ − 2x² + 4x − 8, bukan x³ − 8.',
    alasan: 'x³ − 8 = (x − 2)(x² + 2x + 4); setelah dicoret, 4 + 4 + 4 = 12.',
  },
  {
    // cek: 3 + 3 === 6
    id: 'k20',
    tingkat: 'sulit',
    pertanyaan: 'Fungsi f didefinisikan f(x) = (x² − 9)/(x − 3) untuk x ≠ 3 dan f(3) = a. Nilai a supaya f kontinu di x = 3 adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x + 3'], jangkauan: [0, 6, 0, 10], lubang: [{ x: 3, y: 6 }] },
    pilihan: ['0', '3', '6', '9', 'tidak ada nilai a yang cocok'],
    benar: 2,
    langkah: [
      'Diketahui f(3) = a. Agar f kontinu di x = 3, lim x→3 f(x) harus ada dan nilainya sama dengan f(3) = a.',
      'Untuk x ≠ 3, substitusi langsung x = 3 memberi bentuk taktentu 0/0, sehingga limitnya ditentukan dengan pemfaktoran: lim x→3 (x² − 9)/(x − 3) = lim x→3 (x − 3)(x + 3)/(x − 3) = lim x→3 (x + 3) = 3 + 3 = 6.',
      {
        teks: 'Grafik f untuk x ≠ 3 adalah garis y = x + 3 yang berlubang di (3, 6). Kekontinuan berarti lubang itu ditambal tepat dengan nilai f(3) = a, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x + 3'], jangkauan: [0, 6, 0, 10], titik: [{ x: 3, y: 6, label: 'f(3) = a = 6' }], tegak: [3] },
      },
      'Karena lim x→3 f(x) = 6 harus sama dengan f(3) = a, diperoleh a = 6.',
      'Jadi, nilai a supaya f kontinu di x = 3 adalah 6. (Jawaban C)',
    ],
    jebakan: 'Pilihan D, 9, menghitung 3² dari pembilang saja. Pilihan E menyerah karena f(3) semula tidak terdefinisi, padahal lubang seperti ini justru selalu bisa ditambal dengan nilai limitnya.',
    alasan: 'Limitnya 6, jadi a = 6 menambal lubang di (3, 6).',
  },
  {
    // cek: Math.abs((2.001*2.001 - 4)/(2.001*2.001 - 2.001 - 2) - 4/3) < 0.01
    id: 'k21',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari lim x→2 (x² − 4)/(x² − x − 2) adalah…',
    pilihan: ['1', '3/4', '0', 'tidak ada', '4/3'],
    benar: 4,
    langkah: [
      'Substitusi langsung nilai x = 2 mengakibatkan munculnya bentuk taktentu 0/0, karena 4 − 4 = 0 dan 4 − 2 − 2 = 0. Limit tersebut dapat ditentukan dengan metode pemfaktoran sebagai berikut.',
      'Faktorkan pembilang dan penyebut: x² − 4 = (x − 2)(x + 2) dan x² − x − 2 = (x − 2)(x + 1). Dengan demikian, lim x→2 (x² − 4)/(x² − x − 2) = lim x→2 (x − 2)(x + 2)/((x − 2)(x + 1)).',
      'Coret faktor (x − 2) yang sama, sehingga tersisa lim x→2 (x + 2)/(x + 1).',
      'Substitusikan x = 2, diperoleh (2 + 2)/(2 + 1) = 4/3.',
      'Jadi, nilai dari lim x→2 (x² − 4)/(x² − x − 2) = 4/3. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 3/4, membalik pecahan hasil akhir. Pilihan A, 1, mengira dua polinom berderajat sama selalu berlimit 1; itu aturan untuk x → ∞, bukan x → 2.',
    alasan: 'Faktorkan: (x + 2)/(x + 1) → 4/3.',
  },
  {
    // cek: Math.abs((1 - Math.cos(0.001))/0.001) < 1e-3
    id: 'k22',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari lim x→0 (1 − cos x)/x adalah…',
    pilihan: ['1/2', '0', '1', '2', 'tidak ada'],
    benar: 1,
    langkah: [
      'Substitusi langsung x = 0 memberi bentuk taktentu 0/0, karena 1 − cos 0 = 1 − 1 = 0.',
      'Ingat identitas sudut ganda cos x = 1 − 2 sin²(x/2), sehingga 1 − cos x = 2 sin²(x/2).',
      'Dengan demikian, (1 − cos x)/x = 2 sin²(x/2)/x = sin(x/2) × (sin(x/2))/(x/2), karena 2 sin(x/2)/x = sin(x/2)/(x/2).',
      'Ketika x → 0, faktor pertama sin(x/2) → sin 0 = 0, dan faktor kedua (sin(x/2))/(x/2) → 1 (limit trigonometri dasar). Untuk itu, nilai limitnya adalah 0 × 1 = 0.',
      'Jadi, nilai dari lim x→0 (1 − cos x)/x = 0. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 1/2, adalah nilai lim (1 − cos x)/x², dengan penyebut x KUADRAT; di sini penyebutnya hanya x sehingga masih tersisa faktor sin(x/2) yang menuju 0. Pilihan C, 1, mengira semua limit trigonometri bentuk 0/0 bernilai 1.',
    alasan: '1 − cos x = 2 sin²(x/2); dibagi x menyisakan sin(x/2) × 1 → 0.',
  },
  {
    // cek: Math.abs(Math.sqrt(1e12 + 3e6) - 1e6 - 1.5) < 1e-3
    id: 'k23',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari lim x→∞ (√(x² + 3x) − x) adalah…',
    pilihan: ['3/2', '0', '3', 'tak hingga', 'tidak ada'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa ketika x → ∞, kedua suku √(x² + 3x) dan x sama-sama menuju tak hingga, sehingga muncul bentuk taktentu ∞ − ∞. Limit tersebut ditentukan dengan mengalikan bentuk sekawan lebih dulu.',
      'Dengan mengalikan dengan (√(x² + 3x) + x)/(√(x² + 3x) + x), diperoleh lim x→∞ ((x² + 3x) − x²)/(√(x² + 3x) + x) = lim x→∞ 3x/(√(x² + 3x) + x).',
      'Bagi setiap suku dengan variabel berpangkat tertinggi, yaitu x (untuk suku di dalam akar, x = √x² karena x positif): lim x→∞ 3/(√(1 + 3/x) + 1).',
      'Karena 3/x → 0 ketika x → ∞, nilai limitnya adalah 3/(√1 + 1) = 3/2.',
      'Sebagai jalan pintas, untuk lim x→∞ (√(ax² + bx + c) − √(ax² + px + q)) berlaku rumus (b − p)/(2√a); dengan x = √(x² + 0x + 0), diperoleh (3 − 0)/(2√1) = 3/2.',
      'Jadi, nilai dari lim x→∞ (√(x² + 3x) − x) = 3/2. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 0, mengira ∞ − ∞ selalu 0, padahal itu bentuk taktentu. Pilihan C, 3, lupa membagi dengan 2 (penyebut √1 + 1 = 2 setelah sekawan).',
    alasan: 'Sekawan: 3x/(√(x² + 3x) + x) → 3/(1 + 1) = 3/2.',
  },
  {
    // cek: Math.abs(4.001 - 4)/(4.001 - 4) === 1 && Math.abs(3.999 - 4)/(3.999 - 4) === -1
    id: 'k24',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari lim x→4 |x − 4|/(x − 4) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x < 4 ? -1 : NaN', 'x > 4 ? 1 : NaN'], jangkauan: [1, 7, -2, 2], tegak: [4], lubang: [{ x: 4, y: 1 }, { x: 4, y: -1 }] },
    pilihan: ['1', 'limitnya tidak ada', '-1', '0', 'tak hingga'],
    benar: 1,
    langkah: [
      'Substitusi langsung x = 4 memberi bentuk taktentu 0/0. Karena ada nilai mutlak, tinjau limit kiri dan limit kanan secara terpisah, sebab |x − 4| membuka menjadi bentuk yang berbeda di kedua sisi.',
      'Untuk x < 4, nilai x − 4 negatif sehingga |x − 4| = −(x − 4). Dengan demikian, lim x→4⁻ |x − 4|/(x − 4) = lim x→4⁻ −(x − 4)/(x − 4) = −1.',
      'Untuk x > 4, nilai x − 4 positif sehingga |x − 4| = x − 4. Dengan demikian, lim x→4⁺ |x − 4|/(x − 4) = lim x→4⁺ (x − 4)/(x − 4) = 1.',
      {
        teks: 'Tampak pada grafik bahwa fungsi bernilai tetap −1 di kiri dan tetap 1 di kanan; ada loncatan di x = 4, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x < 4 ? -1 : NaN', 'x > 4 ? 1 : NaN'], jangkauan: [1, 7, -2, 2], tegak: [4], lubang: [{ x: 4, y: 1 }, { x: 4, y: -1 }], datar: [1, -1] },
      },
      'Karena limit kiri (−1) berbeda dengan limit kanan (1), nilai lim x→4 |x − 4|/(x − 4) tidak ada.',
      'Jadi, limit tersebut tidak ada. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 1, hanya memeriksa sisi kanan; pilihan C, −1, hanya sisi kiri. Pilihan D, 0, mengambil rata-rata keduanya, padahal limit tidak berkompromi.',
    alasan: 'Limit kiri −1, limit kanan 1: berbeda, jadi limit tidak ada.',
  },
  {
    // cek: Math.abs((Math.sqrt(1 + 0.001) - 1)/0.001 - 0.5) < 1e-3
    id: 'k47',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari lim x→0 (√(1 + x) − 1)/x adalah…',
    pilihan: ['1', '0', '2', '1/2', 'tidak ada'],
    benar: 3,
    langkah: [
      'Substitusi langsung nilai x = 0 mengakibatkan munculnya bentuk taktentu 0/0, karena √1 − 1 = 0. Limit tersebut ditentukan dengan metode pengalian akar sekawan.',
      'Dengan mengalikan pembilang dan penyebut dengan sekawan √(1 + x) + 1, diperoleh lim x→0 ((1 + x) − 1)/(x(√(1 + x) + 1)) = lim x→0 x/(x(√(1 + x) + 1)).',
      'Coret faktor x yang sama, sehingga tersisa lim x→0 1/(√(1 + x) + 1).',
      'Substitusikan x = 0, diperoleh 1/(√1 + 1) = 1/2.',
      'Jadi, nilai dari lim x→0 (√(1 + x) − 1)/x = 1/2. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 1, lupa menambahkan 1 pada penyebut setelah sekawan (memakai 1/√1 saja). Pilihan B, 0, berhenti pada pembilang √1 − 1 = 0.',
    alasan: 'Sekawan: x/(x(√(1 + x) + 1)) → 1/(1 + 1) = 1/2.',
  },
  {
    // cek: Math.abs((1/(2.001 - 2) - 4/(2.001*2.001 - 4)) - 0.25) < 0.01
    id: 'k65',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari lim x→2 (1/(x − 2) − 4/(x² − 4)) adalah…',
    pilihan: ['0', 'tidak ada', '1/4', '1/2', '4'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa substitusi x = 2 membuat kedua pecahan berpenyebut 0, sehingga muncul bentuk taktentu ∞ − ∞. Kedua pecahan harus disatukan lebih dulu sebelum limitnya dihitung.',
      'Samakan penyebutnya. Karena x² − 4 = (x − 2)(x + 2), pecahan pertama dikalikan (x + 2)/(x + 2): 1/(x − 2) − 4/(x² − 4) = (x + 2)/((x − 2)(x + 2)) − 4/((x − 2)(x + 2)) = (x + 2 − 4)/((x − 2)(x + 2)) = (x − 2)/((x − 2)(x + 2)).',
      'Sekarang bentuknya 0/0 ketika x = 2. Coret faktor (x − 2) yang sama, sehingga tersisa lim x→2 1/(x + 2).',
      'Substitusikan x = 2, diperoleh 1/(2 + 2) = 1/4.',
      'Jadi, nilai dari lim x→2 (1/(x − 2) − 4/(x² − 4)) = 1/4. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, tidak ada, berhenti pada ∞ − ∞ seolah itu jawaban akhir, padahal kedua pecahan saling meniadakan bagian yang meledak. Pilihan A, 0, mengira ∞ − ∞ selalu 0.',
    alasan: 'Satukan pecahan: (x − 2)/((x − 2)(x + 2)) = 1/(x + 2) → 1/4.',
  },
  {
    // cek: Math.abs((1 - Math.cos(0.001))/(0.001*0.001) - 0.5) < 1e-3
    id: 'k49',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari lim x→0 (1 − cos x)/x² adalah…',
    pilihan: ['0', '1', '2', '1/2', 'tidak ada'],
    benar: 3,
    langkah: [
      'Substitusi langsung x = 0 memberi bentuk taktentu 0/0, karena 1 − cos 0 = 0.',
      'Ingat identitas sudut ganda 1 − cos x = 2 sin²(x/2), sehingga (1 − cos x)/x² = 2 sin²(x/2)/x².',
      'Tulis x² = 4(x/2)², sehingga 2 sin²(x/2)/x² = 2 sin²(x/2)/(4(x/2)²) = (1/2) × ((sin(x/2))/(x/2))².',
      'Ketika x → 0, juga x/2 → 0, sehingga (sin(x/2))/(x/2) → 1. Untuk itu, nilai limitnya adalah (1/2) × 1² = 1/2.',
      'Jadi, nilai dari lim x→0 (1 − cos x)/x² = 1/2. (Jawaban D)',
    ],
    jebakan: 'Pilihan C, 2, berhenti pada 2 sin²(x/2)/x² dan menganggap sin²(x/2)/x² → 1, lupa bahwa penyebutnya seharusnya (x/2)², bukan x². Pilihan A, 0, adalah nilai lim (1 − cos x)/x, dengan penyebut x pangkat satu.',
    alasan: '1 − cos x = 2 sin²(x/2); dibagi x² = 4(x/2)² memberi (1/2) × 1 = 1/2.',
  },
  {
    // cek: Math.abs(Math.sqrt(1e12 + 1) - 1e6) < 1e-3
    id: 'k50',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari lim x→∞ (√(x² + 1) − x) adalah…',
    pilihan: ['1', '1/2', '0', 'tak hingga', 'tidak ada'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa bentuknya ∞ − ∞ ketika x → ∞ (bentuk taktentu). Limit tersebut ditentukan dengan mengalikan bentuk sekawan lebih dulu.',
      'Dengan mengalikan dengan (√(x² + 1) + x)/(√(x² + 1) + x), diperoleh lim x→∞ ((x² + 1) − x²)/(√(x² + 1) + x) = lim x→∞ 1/(√(x² + 1) + x).',
      'Ketika x → ∞, penyebut √(x² + 1) + x membesar tanpa batas sedangkan pembilangnya tetap 1, sehingga pecahannya menuju 0.',
      'Sebagai pemeriksaan dengan rumus (b − p)/(2√a): kedua akar √(x² + 0x + 1) dan √(x² + 0x + 0) mempunyai b = p = 0, sehingga limitnya (0 − 0)/2 = 0.',
      'Jadi, nilai dari lim x→∞ (√(x² + 1) − x) = 0. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, 1/2, meniru hasil soal √(x² + x) − x tanpa memeriksa bahwa di sini tidak ada suku x di dalam akar (b = 0). Pilihan A, 1, mengambil pembilang 1 setelah sekawan tanpa memperhatikan penyebut yang membesar.',
    alasan: 'Sekawan: 1/(√(x² + 1) + x) → 0.',
  },
  {
    // cek: Math.abs((27.001 - 27)/(Math.cbrt(27.001) - 3) - 27) < 0.01
    id: 'k66',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari lim x→27 (x − 27)/(∛x − 3) adalah…',
    pilihan: ['9', '27', '3', '1/27', 'tidak ada'],
    benar: 1,
    langkah: [
      'Substitusi langsung nilai x = 27 mengakibatkan munculnya bentuk taktentu 0/0, karena ∛27 − 3 = 0. Karena penyebut memuat akar pangkat tiga, dipakai rumus selisih dua kubik dengan pemisalan.',
      'Misalkan y = ∛x, sehingga x = y³ dan x − 27 = y³ − 27 = y³ − 3³. Ketika x → 27, nilai y → ∛27 = 3.',
      'Dengan rumus a³ − b³ = (a − b)(a² + ab + b²), diperoleh lim y→3 (y³ − 27)/(y − 3) = lim y→3 (y − 3)(y² + 3y + 9)/(y − 3).',
      'Coret faktor (y − 3) yang sama, sehingga tersisa lim y→3 (y² + 3y + 9) = 9 + 9 + 9 = 27.',
      'Jadi, nilai dari lim x→27 (x − 27)/(∛x − 3) = 27. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 9, hanya menghitung suku y² = 9 dari faktor kuadratnya. Pilihan C, 3, menyalin nilai ∛27. Pilihan D, 1/27, membalik pecahan hasil akhir.',
    alasan: 'Misalkan y = ∛x: (y³ − 27)/(y − 3) = y² + 3y + 9 → 27.',
  },
  {
    // cek: Math.abs(Math.sin(2*0.001)/Math.tan(3*0.001) - 2/3) < 1e-4
    id: 'k52',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari lim x→0 (sin 2x)/(tan 3x) adalah…',
    pilihan: ['3/2', '1', '6', '2/3', '0'],
    benar: 3,
    langkah: [
      'Substitusi langsung x = 0 memberi bentuk taktentu 0/0. Ingat limit trigonometri dasar lim u→0 (sin u)/u = 1 dan lim u→0 (tan u)/u = 1.',
      'Bagi pembilang dan penyebut dengan x: (sin 2x)/(tan 3x) = ((sin 2x)/x)/((tan 3x)/x).',
      'Tulis (sin 2x)/x = (sin 2x)/(2x) × 2 → 1 × 2 = 2, dan (tan 3x)/x = (tan 3x)/(3x) × 3 → 1 × 3 = 3 ketika x → 0.',
      'Dengan sifat limit hasil bagi, diperoleh lim x→0 (sin 2x)/(tan 3x) = 2/3.',
      'Jadi, nilai dari lim x→0 (sin 2x)/(tan 3x) = 2/3. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 3/2, membalik perbandingan koefisien. Pilihan C, 6, mengalikan 2 dan 3 alih-alih membaginya. Pilihan B, 1, mengira sinus dan tangen "sama-sama 1" sehingga saling menghapus tanpa melihat koefisien sudutnya.',
    alasan: '(sin 2x)/(tan 3x) → 2/3 (perbandingan koefisien sudut).',
  },
  {
    // cek: 2 + 1 === 3 && 5 - 2 === 3
    id: 'k53',
    tingkat: 'sulit',
    pertanyaan: 'Fungsi f(x) = x + 1 untuk x < 2 dan f(x) = 5 − x untuk x ≥ 2. Nilai lim x→2 f(x) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x < 2 ? x + 1 : 5 - x'], jangkauan: [-1, 5, -1, 5] },
    pilihan: ['3', 'tidak ada', '2', '5', '1'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa rumus f berganti tepat di x = 2, sehingga limit kiri dan limit kanan harus dihitung dengan rumus yang berbeda, lalu dibandingkan.',
      'Limit kiri memakai rumus untuk x < 2: lim x→2⁻ f(x) = lim x→2⁻ (x + 1) = 2 + 1 = 3.',
      'Limit kanan memakai rumus untuk x ≥ 2: lim x→2⁺ f(x) = lim x→2⁺ (5 − x) = 5 − 2 = 3.',
      {
        teks: 'Karena limit kiri sama dengan limit kanan, lim x→2 f(x) = 3. Pada grafik, kedua potongan garis bertemu di puncak (2, 3) tanpa loncatan, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x < 2 ? x + 1 : 5 - x'], jangkauan: [-1, 5, -1, 5], titik: [{ x: 2, y: 3, label: '(2, 3)' }], tegak: [2] },
      },
      'Jadi, nilai lim x→2 f(x) = 3. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, tidak ada, mengira pergantian rumus (dan sudut tajam pada grafik) otomatis membuat limit gagal; yang menentukan hanyalah kesamaan limit kiri dan kanan. Pilihan D, 5, mengambil konstanta dari rumus kanan tanpa menghitung.',
    alasan: 'Limit kiri 2 + 1 = 3, limit kanan 5 − 2 = 3: sama, jadi limitnya 3.',
  },
  // ========================================================= SANGAT SULIT
  {
    // cek: Math.abs((3.001 - 3)/(Math.sqrt(3.001 + 1) - 2) - 4) < 0.01
    id: 'k25',
    tingkat: 'sangat sulit',
    pertanyaan: 'Nilai dari lim x→3 (x − 3)/(√(x + 1) − 2) adalah…',
    pilihan: ['1/4', '2', '4', '0', 'tidak ada'],
    benar: 2,
    langkah: [
      'Substitusi langsung nilai x = 3 mengakibatkan munculnya bentuk taktentu 0/0, karena √4 − 2 = 0. Bentuk akar ada di PENYEBUT, sehingga sekawan penyebutlah yang dipakai.',
      'Dengan mengalikan pembilang dan penyebut dengan sekawan √(x + 1) + 2, diperoleh lim x→3 (x − 3)(√(x + 1) + 2)/((√(x + 1) − 2)(√(x + 1) + 2)) = lim x→3 (x − 3)(√(x + 1) + 2)/((x + 1) − 4) = lim x→3 (x − 3)(√(x + 1) + 2)/(x − 3).',
      'Coret faktor (x − 3) yang sama, sehingga tersisa lim x→3 (√(x + 1) + 2).',
      'Substitusikan x = 3, diperoleh √4 + 2 = 2 + 2 = 4.',
      'Jadi, nilai dari lim x→3 (x − 3)/(√(x + 1) − 2) = 4. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 1/4, adalah kebalikan hasil, muncul bila pecahannya dibalik seperti pada soal bentuk (√(x + 1) − 2)/(x − 3). Pilihan B, 2, hanya menghitung √4 tanpa menambahkan 2.',
    alasan: 'Sekawan penyebut: (x − 3)(√(x + 1) + 2)/(x − 3) → 2 + 2 = 4.',
  },
  {
    // cek: Math.abs(Math.sin(2.001 - 2)/(2.001*2.001 - 4) - 0.25) < 1e-3
    id: 'k26',
    tingkat: 'sangat sulit',
    pertanyaan: 'Nilai dari lim x→2 sin(x − 2)/(x² − 4) adalah…',
    pilihan: ['1/4', '0', '1/2', '1', 'tidak ada'],
    benar: 0,
    langkah: [
      'Substitusi langsung x = 2 memberi bentuk taktentu 0/0, karena sin 0 = 0 dan 4 − 4 = 0.',
      'Faktorkan penyebut: x² − 4 = (x − 2)(x + 2), sehingga sin(x − 2)/(x² − 4) = (sin(x − 2))/(x − 2) × 1/(x + 2).',
      'Misalkan u = x − 2; ketika x → 2, nilai u → 0, sehingga (sin(x − 2))/(x − 2) = (sin u)/u → 1 (limit trigonometri dasar).',
      'Dengan sifat limit hasil kali, diperoleh lim x→2 sin(x − 2)/(x² − 4) = 1 × 1/(2 + 2) = 1/4.',
      'Jadi, nilai dari lim x→2 sin(x − 2)/(x² − 4) = 1/4. (Jawaban A)',
    ],
    jebakan: 'Pilihan D, 1, berhenti pada (sin u)/u → 1 dan melupakan faktor 1/(x + 2). Pilihan C, 1/2, memakai 1/(x + 2) dengan x = 0, bukan x = 2.',
    alasan: 'sin(x − 2)/((x − 2)(x + 2)) → 1 × 1/4 = 1/4.',
  },
  {
    // cek: Math.abs(Math.sqrt(4e12 + 1e6) - 2e6 - 0.25) < 1e-3
    id: 'k27',
    tingkat: 'sangat sulit',
    pertanyaan: 'Nilai dari lim x→∞ (√(4x² + x) − 2x) adalah…',
    pilihan: ['0', '1/2', '1', 'tak hingga', '1/4'],
    benar: 4,
    langkah: [
      'Perhatikan bahwa bentuknya ∞ − ∞ ketika x → ∞ (bentuk taktentu). Limit tersebut ditentukan dengan mengalikan bentuk sekawan lebih dulu.',
      'Dengan mengalikan dengan (√(4x² + x) + 2x)/(√(4x² + x) + 2x), diperoleh lim x→∞ ((4x² + x) − 4x²)/(√(4x² + x) + 2x) = lim x→∞ x/(√(4x² + x) + 2x).',
      'Bagi setiap suku dengan x (di dalam akar, x = √x²): lim x→∞ 1/(√(4 + 1/x) + 2).',
      'Karena 1/x → 0 ketika x → ∞, nilai limitnya adalah 1/(√4 + 2) = 1/(2 + 2) = 1/4.',
      'Sebagai pemeriksaan dengan rumus (b − p)/(2√a): tulis 2x = √(4x² + 0x + 0), sehingga limitnya (1 − 0)/(2√4) = 1/4.',
      'Jadi, nilai dari lim x→∞ (√(4x² + x) − 2x) = 1/4. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 1/2, memakai penyebut √4 = 2 saja dan lupa menambahkan 2x/x = 2. Pilihan A, 0, mengira ∞ − ∞ selalu 0.',
    alasan: 'Sekawan: x/(√(4x² + x) + 2x) → 1/(2 + 2) = 1/4.',
  },
  {
    // cek: 2*0 + 1 === 4 - 3
    id: 'k28',
    tingkat: 'sangat sulit',
    pertanyaan: 'Fungsi f(x) = ax + 1 untuk x < 2 dan f(x) = x² − 3 untuk x ≥ 2. Nilai a supaya f kontinu di x = 2 adalah…',
    pilihan: ['-1', '1', '2', 'tidak ada nilai a yang cocok', '0'],
    benar: 4,
    langkah: [
      'Agar f kontinu di x = 2, limit kiri, limit kanan, dan f(2) harus sama. Karena x = 2 memakai rumus x² − 3, diketahui f(2) = 2² − 3 = 1, dan limit kanannya juga lim x→2⁺ (x² − 3) = 1.',
      'Limit kiri memakai rumus untuk x < 2: lim x→2⁻ f(x) = lim x→2⁻ (ax + 1) = 2a + 1.',
      'Supaya kontinu, limit kiri harus sama dengan 1: 2a + 1 = 1, sehingga 2a = 0 dan a = 0.',
      {
        teks: 'Sebagai pemeriksaan, dengan a = 0 potongan kiri menjadi garis datar y = 1 yang bertemu dengan parabola y = x² − 3 di titik (2, 1), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x < 2 ? 1 : x*x - 3'], jangkauan: [-1, 4, -2, 6], titik: [{ x: 2, y: 1, label: '(2, 1)' }], tegak: [2] },
      },
      'Jadi, nilai a supaya f kontinu di x = 2 adalah 0. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 1, muncul bila f(2) dihitung 2² − 3 = 2 (salah hitung) lalu 2a + 1 = 2 dipaksa; padahal 4 − 3 = 1. Pilihan D menyerah karena a = 0 terasa "tidak ada", padahal a = 0 adalah nilai yang sah.',
    alasan: 'Limit kanan 1; limit kiri 2a + 1 = 1 memberi a = 0.',
  },
  {
    // cek: Math.abs((1 - Math.cos(2*0.001))/(0.001*0.001) - 2) < 1e-3
    id: 'k29',
    tingkat: 'sangat sulit',
    pertanyaan: 'Nilai dari lim x→0 (1 − cos 2x)/x² adalah…',
    pilihan: ['2', '0', '1/2', '1', '4'],
    benar: 0,
    langkah: [
      'Substitusi langsung x = 0 memberi bentuk taktentu 0/0, karena 1 − cos 0 = 0.',
      'Ingat identitas sudut ganda cos 2x = 1 − 2 sin² x, sehingga 1 − cos 2x = 2 sin² x.',
      'Dengan demikian, (1 − cos 2x)/x² = 2 sin² x/x² = 2 × ((sin x)/x)².',
      'Ketika x → 0, (sin x)/x → 1, sehingga nilai limitnya adalah 2 × 1² = 2.',
      'Jadi, nilai dari lim x→0 (1 − cos 2x)/x² = 2. (Jawaban A)',
    ],
    jebakan: 'Pilihan C, 1/2, adalah nilai lim (1 − cos x)/x² (sudut x, bukan 2x); sudut 2x melipatkan hasilnya empat kali karena 2² = 4, dan (1/2) × 4 = 2. Pilihan E, 4, memakai 1 − cos 2x = 4 sin² x, keliru menuliskan identitasnya.',
    alasan: '1 − cos 2x = 2 sin² x, sehingga limitnya 2 × 1 = 2.',
  },
  {
    // cek: Math.abs((Math.sqrt(4.001) - 2)/(Math.sqrt(4.001 + 5) - 3) - 1.5) < 0.01
    id: 'k67',
    tingkat: 'sangat sulit',
    pertanyaan: 'Nilai dari lim x→4 (√x − 2)/(√(x + 5) − 3) adalah…',
    pilihan: ['2/3', '1', '3/2', '0', '3'],
    benar: 2,
    langkah: [
      'Substitusi langsung nilai x = 4 mengakibatkan munculnya bentuk taktentu 0/0, karena √4 − 2 = 0 dan √9 − 3 = 0. Pembilang dan penyebut sama-sama memuat akar, sehingga pengalian akar sekawan dilakukan DUA KALI: sekawan pembilang dan sekawan penyebut.',
      'Kalikan dengan (√x + 2)/(√x + 2) dan dengan (√(x + 5) + 3)/(√(x + 5) + 3), diperoleh lim x→4 ((x − 4)(√(x + 5) + 3))/((x + 5 − 9)(√x + 2)) = lim x→4 ((x − 4)(√(x + 5) + 3))/((x − 4)(√x + 2)).',
      'Coret faktor (x − 4) yang sama, sehingga tersisa lim x→4 (√(x + 5) + 3)/(√x + 2).',
      'Substitusikan x = 4, diperoleh (√9 + 3)/(√4 + 2) = (3 + 3)/(2 + 2) = 6/4 = 3/2.',
      'Jadi, nilai dari lim x→4 (√x − 2)/(√(x + 5) − 3) = 3/2. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 2/3, menukar tempat kedua sekawan (memakai (√x + 2)/(√(x + 5) + 3)); sekawan pembilang selalu pindah ke penyebut dan sebaliknya. Pilihan B, 1, mengira kedua akar "sama-sama nol" sehingga saling menghapus.',
    alasan: 'Sekawan dua kali: (√(x + 5) + 3)/(√x + 2) → 6/4 = 3/2.',
  },
  {
    // cek: Math.abs((Math.tan(0.001) - Math.sin(0.001))/(0.001**3) - 0.5) < 1e-3
    id: 'k31',
    tingkat: 'sangat sulit',
    pertanyaan: 'Nilai dari lim x→0 (tan x − sin x)/x³ adalah…',
    pilihan: ['0', '1/2', '1/6', '1', 'tidak ada'],
    benar: 1,
    langkah: [
      'Substitusi langsung x = 0 memberi bentuk taktentu 0/0. Ubah tan x menjadi (sin x)/(cos x) supaya pembilang bisa difaktorkan.',
      'Pembilang menjadi tan x − sin x = (sin x)/(cos x) − sin x = sin x (1/(cos x) − 1) = sin x (1 − cos x)/(cos x).',
      'Dengan demikian, (tan x − sin x)/x³ = (sin x)/x × (1 − cos x)/x² × 1/(cos x); pangkat x³ dibagi menjadi x dan x² untuk masing-masing faktor.',
      'Ketika x → 0, (sin x)/x → 1, (1 − cos x)/x² → 1/2 (dari 1 − cos x = 2 sin²(x/2)), dan 1/(cos x) → 1/cos 0 = 1. Untuk itu, nilai limitnya adalah 1 × 1/2 × 1 = 1/2.',
      'Jadi, nilai dari lim x→0 (tan x − sin x)/x³ = 1/2. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 0, mengira tan x dan sin x "sama-sama x" sehingga selisihnya 0; selisih keduanya memang menuju 0, tetapi sebanding dengan x³/2, sama cepatnya dengan penyebut. Pilihan C, 1/6, adalah nilai lim (x − sin x)/x³, soal yang serupa tetapi berbeda.',
    alasan: 'tan x − sin x = sin x (1 − cos x)/cos x; limitnya 1 × 1/2 × 1 = 1/2.',
  },
  {
    // cek: Math.abs(1e6 * Math.sin(1/1e6) - 1) < 1e-6
    id: 'k32',
    tingkat: 'sangat sulit',
    pertanyaan: 'Nilai dari lim x→∞ x sin(1/x) adalah…',
    pilihan: ['0', '1', 'tak hingga', 'tidak ada', 'bergantung nilai x'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa ketika x → ∞, faktor x membesar tanpa batas sedangkan sin(1/x) → sin 0 = 0, sehingga muncul bentuk taktentu ∞ × 0.',
      'Misalkan y = 1/x, sehingga x = 1/y. Ketika x → ∞, nilai y → 0⁺. Dengan pemisalan ini, x sin(1/x) = (1/y) sin y = (sin y)/y.',
      'Dengan demikian, lim x→∞ x sin(1/x) = lim y→0 (sin y)/y = 1 (limit trigonometri dasar).',
      {
        teks: 'Perhatikan tabel berikut sebagai pemeriksaan: semakin besar x, nilai x sin(1/x) semakin mendekati 1.',
        gambar: { jenis: 'tabel', kepala: ['x', '1/x', 'x sin(1/x)'], baris: [['10', '0,1', '0,9983'], ['100', '0,01', '0,99998'], ['1.000', '0,001', '0,9999998']], kolomBaru: [2] },
      },
      'Jadi, nilai dari lim x→∞ x sin(1/x) = 1. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 0, hanya melihat sin(1/x) → 0 tanpa memperhitungkan pengali x yang membesar. Pilihan C, tak hingga, hanya melihat faktor x. Keduanya saling mengimbangi tepat menjadi 1.',
    alasan: 'Misalkan y = 1/x: x sin(1/x) = (sin y)/y → 1.',
  },
  {
    // cek: Math.abs((Math.sqrt(1 + 0.001) - Math.sqrt(1 - 0.001))/0.001 - 1) < 1e-3
    id: 'k54',
    tingkat: 'sangat sulit',
    pertanyaan: 'Nilai dari lim x→0 (√(1 + x) − √(1 − x))/x adalah…',
    pilihan: ['1', '0', '1/2', '2', 'tidak ada'],
    benar: 0,
    langkah: [
      'Substitusi langsung nilai x = 0 mengakibatkan munculnya bentuk taktentu 0/0, karena √1 − √1 = 0. Limit tersebut ditentukan dengan metode pengalian akar sekawan; sekawan dari selisih dua akar adalah jumlah kedua akar itu.',
      'Dengan mengalikan pembilang dan penyebut dengan √(1 + x) + √(1 − x), diperoleh lim x→0 ((1 + x) − (1 − x))/(x(√(1 + x) + √(1 − x))) = lim x→0 2x/(x(√(1 + x) + √(1 − x))).',
      'Coret faktor x yang sama, sehingga tersisa lim x→0 2/(√(1 + x) + √(1 − x)).',
      'Substitusikan x = 0, diperoleh 2/(√1 + √1) = 2/2 = 1.',
      'Jadi, nilai dari lim x→0 (√(1 + x) − √(1 − x))/x = 1. (Jawaban A)',
    ],
    jebakan: 'Pilihan C, 1/2, adalah hasil bila hanya SATU akar yang ada (lim (√(1 + x) − 1)/x); di sini kedua akar bergerak berlawanan arah sehingga selisihnya dua kali lipat. Pilihan B, 0, berhenti pada pembilang 0.',
    alasan: 'Sekawan: 2x/(x(√(1 + x) + √(1 − x))) → 2/2 = 1.',
  },
  {
    // cek: Math.abs(1e6*(Math.sqrt(1e12 + 1) - 1e6) - 0.5) < 1e-3
    id: 'k55',
    tingkat: 'sangat sulit',
    pertanyaan: 'Nilai dari lim x→∞ x(√(x² + 1) − x) adalah…',
    pilihan: ['1/2', '0', '1', 'tak hingga', 'tidak ada'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa faktor x menuju tak hingga sedangkan √(x² + 1) − x menuju 0, sehingga muncul bentuk taktentu ∞ × 0. Selisih akarnya diubah dulu dengan sekawan.',
      'Dengan mengalikan √(x² + 1) − x dengan (√(x² + 1) + x)/(√(x² + 1) + x), diperoleh √(x² + 1) − x = ((x² + 1) − x²)/(√(x² + 1) + x) = 1/(√(x² + 1) + x).',
      'Dengan demikian, x(√(x² + 1) − x) = x/(√(x² + 1) + x). Bagi setiap suku dengan x (di dalam akar, x = √x²): 1/(√(1 + 1/x²) + 1).',
      'Karena 1/x² → 0 ketika x → ∞, nilai limitnya adalah 1/(√1 + 1) = 1/2.',
      'Jadi, nilai dari lim x→∞ x(√(x² + 1) − x) = 1/2. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 0, hanya melihat √(x² + 1) − x → 0 tanpa pengali x yang membesar. Pilihan D, tak hingga, hanya melihat pengali x. Keduanya saling mengimbangi menjadi 1/2.',
    alasan: 'Sekawan: x/(√(x² + 1) + x) → 1/(1 + 1) = 1/2.',
  },
  {
    // cek: Math.abs((1 - Math.cos(0.001))/(0.001*Math.sin(0.001)) - 0.5) < 1e-3
    id: 'k56',
    tingkat: 'sangat sulit',
    pertanyaan: 'Nilai dari lim x→0 (1 − cos x)/(x sin x) adalah…',
    pilihan: ['1', '0', '2', '1/2', 'tidak ada'],
    benar: 3,
    langkah: [
      'Substitusi langsung x = 0 memberi bentuk taktentu 0/0, karena 1 − cos 0 = 0 dan 0 × sin 0 = 0.',
      'Tulis ulang supaya muncul bentuk dasar: (1 − cos x)/(x sin x) = (1 − cos x)/x² × x/(sin x); pengali x/(sin x) mengganti sin x pada penyebut menjadi x.',
      'Ketika x → 0, (1 − cos x)/x² → 1/2 (dari 1 − cos x = 2 sin²(x/2)), dan x/(sin x) → 1 (kebalikan limit trigonometri dasar).',
      'Untuk itu, nilai limitnya adalah 1/2 × 1 = 1/2.',
      'Jadi, nilai dari lim x→0 (1 − cos x)/(x sin x) = 1/2. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 1, mengira setiap limit trigonometri bentuk 0/0 bernilai 1. Pilihan B, 0, hanya melihat pembilang 1 − cos x → 0 tanpa memperhatikan penyebut yang menuju 0 sama cepatnya (keduanya sebanding dengan x²).',
    alasan: '(1 − cos x)/x² × x/sin x → 1/2 × 1 = 1/2.',
  },
  {
    // cek: Math.abs((1.001*1.001 + 3*1.001 - 4)/(1.001 - 1) - 5) < 0.01 && 3 + (-4) === -1
    id: 'k57',
    tingkat: 'sangat sulit',
    pertanyaan: 'Diketahui lim x→1 (x² + ax + b)/(x − 1) = 5. Nilai a + b adalah…',
    pilihan: ['1', '-1', '5', '4', '-5'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa substitusi x = 1 menghasilkan penyebut bernilai 0, padahal limitnya ada, yaitu 5. Ini berarti hasil substitusi juga harus menghasilkan pembilang 0: 1 + a + b = 0, sehingga b = −1 − a.',
      'Substitusikan b = −1 − a ke pembilang: x² + ax − 1 − a = (x² − 1) + a(x − 1) = (x − 1)(x + 1) + a(x − 1) = (x − 1)(x + 1 + a).',
      'Dengan demikian, lim x→1 (x − 1)(x + 1 + a)/(x − 1) = lim x→1 (x + 1 + a) = 2 + a.',
      'Karena limitnya 5, diperoleh 2 + a = 5, sehingga a = 3 dan b = −1 − 3 = −4.',
      'Untuk itu, a + b = 3 + (−4) = −1.',
      'Jadi, nilai a + b = −1. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, 5, menyalin nilai limitnya. Pilihan A, 1, salah tanda pada b: dari 1 + a + b = 0 dengan a = 3 seharusnya b = −4, bukan 4.',
    alasan: 'Pembilang harus 0 di x = 1 (b = −1 − a); faktor tersisa x + 1 + a → 2 + a = 5; a = 3, b = −4.',
  },
  {
    // cek: Math.abs(Math.sqrt(9e12 + 12e6 - 5) - (3e6 + 1) - 1) < 1e-3
    id: 'k68',
    tingkat: 'sangat sulit',
    pertanyaan: 'Nilai dari lim x→∞ (√(9x² + 12x − 5) − (3x + 1)) adalah…',
    pilihan: ['0', '2', '1/2', 'tak hingga', '1'],
    benar: 4,
    langkah: [
      'Perhatikan bahwa bentuknya ∞ − ∞ ketika x → ∞ (bentuk taktentu). Supaya rumus selisih dua akar bisa dipakai, suku 3x + 1 ditulis sebagai akar.',
      'Perhatikan bahwa 3x + 1 = √((3x + 1)²) = √(9x² + 6x + 1) berlaku karena x menuju tak hingga, sehingga 3x + 1 dipastikan positif.',
      'Dengan demikian, lim x→∞ (√(9x² + 12x − 5) − (3x + 1)) = lim x→∞ (√(9x² + 12x − 5) − √(9x² + 6x + 1)).',
      'Kedua akar mempunyai koefisien x² yang sama, a = 9, dengan b = 12 dan p = 6. Dengan rumus lim x→∞ (√(ax² + bx + c) − √(ax² + px + q)) = (b − p)/(2√a), diperoleh (12 − 6)/(2√9) = 6/6 = 1.',
      'Sebagai pemeriksaan lewat sekawan: pembilang menjadi (9x² + 12x − 5) − (9x² + 6x + 1) = 6x − 6, penyebutnya √(9x² + 12x − 5) + √(9x² + 6x + 1); setelah dibagi x, limitnya (6 − 0)/(3 + 3) = 1.',
      'Jadi, nilai dari lim x→∞ (√(9x² + 12x − 5) − (3x + 1)) = 1. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 2, memakai rumus b/(2√a) = 12/6 seolah suku 3x + 1 hanya 3x; konstanta +1 ikut menyumbang 6x setelah dikuadratkan. Pilihan A, 0, mengira ∞ − ∞ selalu 0.',
    alasan: '3x + 1 = √(9x² + 6x + 1); rumus (b − p)/(2√a) = (12 − 6)/6 = 1.',
  },
  {
    // cek: Math.abs((2e6 + Math.sin(1e6))/1e6 - 2) < 1e-4
    id: 'k59',
    tingkat: 'sangat sulit',
    pertanyaan: 'Nilai dari lim x→∞ (2x + sin x)/x adalah…',
    pilihan: ['tidak ada, karena sin x terus berayun', '3', '1', '0', '2'],
    benar: 4,
    langkah: [
      'Pecah pecahannya menjadi dua suku: (2x + sin x)/x = 2x/x + (sin x)/x = 2 + (sin x)/x.',
      'Perhatikan bahwa −1 ≤ sin x ≤ 1 untuk semua x, sehingga untuk x > 0 berlaku −1/x ≤ (sin x)/x ≤ 1/x.',
      'Ketika x → ∞, kedua pengapit −1/x dan 1/x menuju 0, sehingga menurut teorema apit lim x→∞ (sin x)/x = 0; ayunan sin x tetap terbatas, sedangkan pembaginya membesar tanpa batas.',
      {
        teks: 'Grafik y = (2x + sin x)/x berayun makin kecil di sekitar garis y = 2, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['(2*x + Math.sin(x))/x'], jangkauan: [1, 40, 0, 4], datar: [2] },
      },
      'Dengan demikian, lim x→∞ (2x + sin x)/x = 2 + 0 = 2.',
      'Jadi, nilai dari lim x→∞ (2x + sin x)/x = 2. (Jawaban E)',
    ],
    jebakan: 'Pilihan A menggoda karena sin x memang tidak mempunyai limit di tak hingga, tetapi yang dibagi x adalah sin x, dan hasil bagi itu menuju 0. Pilihan B, 3, mengganti sin x dengan nilai terbesarnya 1 lalu menganggap 1/x tidak menghilang.',
    alasan: '(2x + sin x)/x = 2 + (sin x)/x → 2 + 0 = 2 (teorema apit).',
  },
  {
    // cek: 1 + 2 === 3 && 1 + 2 === 3 && 1 * 2 === 2
    id: 'k60',
    tingkat: 'sangat sulit',
    pertanyaan: 'Fungsi f(x) = ax + 2 untuk x < 1, f(1) = 3, dan f(x) = x² + b untuk x > 1 kontinu di x = 1. Nilai a × b adalah…',
    pilihan: ['2', '3', '1', '6', '0'],
    benar: 0,
    langkah: [
      'Agar f kontinu di x = 1, limit kiri dan limit kanan harus sama dengan f(1) = 3.',
      'Limit kiri memakai rumus untuk x < 1: lim x→1⁻ f(x) = a(1) + 2 = a + 2. Supaya sama dengan 3, diperoleh a + 2 = 3, sehingga a = 1.',
      'Limit kanan memakai rumus untuk x > 1: lim x→1⁺ f(x) = 1² + b = 1 + b. Supaya sama dengan 3, diperoleh 1 + b = 3, sehingga b = 2.',
      'Untuk itu, a × b = 1 × 2 = 2.',
      {
        teks: 'Sebagai pemeriksaan, dengan a = 1 dan b = 2 potongan garis y = x + 2 dan potongan parabola y = x² + 2 bertemu di titik (1, 3), tempat f(1) = 3 juga berada, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x < 1 ? x + 2 : x*x + 2'], jangkauan: [-2, 3, 0, 8], titik: [{ x: 1, y: 3, label: '(1, 3)' }], tegak: [1] },
      },
      'Jadi, nilai a × b = 2. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 3, menjumlahkan a + b alih-alih mengalikannya. Pilihan D, 6, muncul bila b dihitung dari 1 + b = 3 keliru menjadi b = 3 lalu dikalikan 2.',
    alasan: 'a + 2 = 3 memberi a = 1; 1 + b = 3 memberi b = 2; a × b = 2.',
  },
]
