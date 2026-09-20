/**
 * Bank soal latihan Transformasi Geometri: 60 soal, 15 tiap tingkat.
 *
 * 14 Sep 2026: seluruh pembahasan ditulis ulang meniru cara mathcyber1997
 * (catatan belajar `PELAJARI BENTUK SOAL MATEMATIKA/CATATAN-BELAJAR-PEMBAHASAN.md`
 * bagian 4.8): konsep disebut dulu sebagai aturan utuh ("Konsep translasi:
 * jika titik (x, y) ditranslasikan oleh (a, b), bayangannya (x + a, y + b)"),
 * rotasi lewat matriks dengan cos dan sin ditulis lalu diganti angkanya,
 * komposisi ditulis sebagai skema panah A → A′ → A″, garis dan kurva lewat
 * "ambil sembarang titik (x, y)" lalu substitusi x = x′ − 3, prapeta lewat
 * "misalkan titik awalnya (a, b)", luas lewat |det| × luas awal, penutup
 * "Jadi, ... (Jawaban A)". Gambar bantu: bangun dan bayangannya di bidang
 * koordinat dengan cermin, pusat, dan panah dari titik ke bayangannya.
 *
 * Id soal lama dipertahankan. Delapan soal kembar atau terlalu tipis diganti
 * jenis yang belum ada (pola mathcyber1997, ditulis sendiri): tg-m05 dan
 * tg-m08 jadi tg-m16 (faktor skala dibaca dari gambar) dan tg-m17 (vektor
 * translasi dibaca dari gambar); tg-s09 dan tg-s15 jadi tg-s16 (titik oleh
 * matriks) dan tg-s17 (luas lewat determinan); tg-l06 dan tg-l13 jadi tg-l16
 * (cermin terhadap y = x + 1) dan tg-l17 (garis oleh matriks lalu cermin);
 * tg-x13 dan tg-x10 jadi tg-x16 (kurva didilatasi lalu dirotasi) dan tg-x17
 * (prapeta dari matriks lalu translasi). Jawaban benar disebar merata oleh
 * `alat/acak_pilihan.mjs`.
 *
 * Tiap jawaban berangka punya `// cek:` yang dijalankan `alat/cek_kuis.mjs`;
 * `--ketat` juga memeriksa gaya pembahasannya.
 */
export type { TingkatKuis, SoalKuis } from '@/content/tipe'
import type { ButirKuisBab, SoalKuis } from '@/content/tipe'

export const KUIS: SoalKuis[] = [
  // ================================================================ MUDAH
  {
    // cek: 1 + 3 === 4 && 2 + 4 === 6
    id: 'tg-translasi-dasar',
    tingkat: 'mudah',
    pertanyaan: 'Titik (1, 2) ditranslasikan oleh vektor (3, 4). Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[1, 2]], labelBangun: ['A(1, 2)'], jangkauan: [-1, 6, -1, 8] },
    pilihan: ['(−2, −2)', '(3, 8)', '(4, 2)', '(4, 6)', '(3, 4)'],
    benar: 3,
    langkah: [
      'Konsep translasi: jika titik (x, y) ditranslasikan oleh vektor T = (a, b), maka koordinat bayangannya adalah (x′, y′) = (x + a, y + b); titik digeser a satuan mendatar dan b satuan tegak.',
      'Dengan demikian, A(1, 2) → A′(1 + 3, 2 + 4) = A′(4, 6).',
      {
        teks: 'Pada gambar, A bergeser 3 satuan ke kanan dan 4 satuan ke atas menuju A′.',
        gambar: { jenis: 'bidang', bangun: [[1, 2]], bayangan: [[4, 6]], labelBangun: ['A(1, 2)'], labelBayangan: ["A′(4, 6)"], panah: true, jangkauan: [-1, 6, -1, 8] },
      },
      'Jadi, peta titik (1, 2) oleh translasi (3, 4) adalah (4, 6). (Jawaban D)',
    ],
    jebakan: 'Pilihan A, (−2, −2), mengurangkan vektor translasi alih-alih menambahkannya (itu translasi kebalikannya). Pilihan B, (3, 8), mengalikan komponennya. Pilihan E, (3, 4), menyalin vektor translasinya.',
    alasan: 'Translasi: (1 + 3, 2 + 4) = (4, 6).',
  },
  {
    // cek: -3 === -3 && -7 === -7
    id: 'tg-cermin-sumbu-x',
    tingkat: 'mudah',
    pertanyaan: 'Titik (−3, 7) dicerminkan pada sumbu-x. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[-3, 7]], labelBangun: ['A(−3, 7)'], cermin: 'x', jangkauan: [-5, 2, -8, 8] },
    pilihan: ['(3, 7)', '(−3, −7)', '(3, −7)', '(7, −3)', '(−7, −3)'],
    benar: 1,
    langkah: [
      'Konsep refleksi terhadap sumbu-x: jika titik (x, y) dicerminkan pada sumbu-x, maka bayangannya (x′, y′) = (x, −y); absis tetap, ordinat berganti tanda, karena cermin mendatar hanya membalik atas-bawah.',
      'Dengan demikian, A(−3, 7) → A′(−3, −7).',
      {
        teks: 'Pada gambar, A dan A′ sama jauhnya dari sumbu-x (7 satuan) pada sisi yang berlawanan, dan ruas AA′ tegak lurus sumbu-x.',
        gambar: { jenis: 'bidang', bangun: [[-3, 7]], bayangan: [[-3, -7]], labelBangun: ['A(−3, 7)'], labelBayangan: ["A′(−3, −7)"], cermin: 'x', panah: true, jangkauan: [-5, 2, -8, 8] },
      },
      'Jadi, peta titik (−3, 7) oleh pencerminan pada sumbu-x adalah (−3, −7). (Jawaban B)',
    ],
    jebakan: 'Pilihan A, (3, 7), membalik absis, yaitu pencerminan pada sumbu-Y. Pilihan C, (3, −7), membalik keduanya, yaitu pencerminan pada titik asal. Pilihan D, (7, −3), menukar koordinat lalu membalik tanda.',
    alasan: 'Cermin sumbu-x: (x, y) → (x, −y) = (−3, −7).',
  },
  {
    // cek: -0 === 0 && 2 === 2
    id: 'tg-rotasi-90-dasar',
    tingkat: 'mudah',
    pertanyaan: 'Titik (2, 0) diputar 90° berlawanan arah jarum jam terhadap titik asal. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[2, 0]], labelBangun: ['A(2, 0)'], pusat: [0, 0], jangkauan: [-3, 3, -3, 3] },
    pilihan: ['(0, −2)', '(0, 2)', '(−2, 0)', '(2, 0)', '(−2, 2)'],
    benar: 1,
    langkah: [
      'Konsep rotasi: jika titik (x, y) dirotasikan sebesar θ berlawanan arah jarum jam dengan pusat O, bayangannya (x′, y′) = (x cos θ − y sin θ, x sin θ + y cos θ). Untuk θ = 90°, cos 90° = 0 dan sin 90° = 1, sehingga (x′, y′) = (−y, x).',
      'Dengan demikian, A(2, 0) → A′(−0, 2) = A′(0, 2).',
      {
        teks: 'Pada gambar, A yang berada pada sumbu-x positif berpindah seperempat putaran ke sumbu-y positif, tetap berjarak 2 dari pusat.',
        gambar: { jenis: 'bidang', bangun: [[2, 0]], bayangan: [[0, 2]], labelBangun: ['A(2, 0)'], labelBayangan: ["A′(0, 2)"], pusat: [0, 0], panah: true, jangkauan: [-3, 3, -3, 3] },
      },
      'Jadi, peta titik (2, 0) oleh rotasi 90° berlawanan arah jarum jam adalah (0, 2). (Jawaban B)',
    ],
    jebakan: 'Pilihan A, (0, −2), memutar SEARAH jarum jam (aturan (y, −x)). Pilihan C, (−2, 0), memutar 180°. Pilihan E, (−2, 2), menambahkan bayangan pada titik asalnya.',
    alasan: 'Rotasi 90°: (x, y) → (−y, x) = (0, 2).',
  },
  {
    // cek: -6 === -6 && -1 === -1
    id: 'tg-cermin-sumbu-y',
    tingkat: 'mudah',
    pertanyaan: 'Titik (6, −1) dicerminkan pada sumbu-y. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[6, -1]], labelBangun: ['A(6, −1)'], cermin: 'y', jangkauan: [-7, 7, -3, 2] },
    pilihan: ['(6, 1)', '(−6, 1)', '(−1, 6)', '(−6, −1)', '(1, −6)'],
    benar: 3,
    langkah: [
      'Konsep refleksi terhadap sumbu-y: jika titik (x, y) dicerminkan pada sumbu-y, maka bayangannya (x′, y′) = (−x, y); ordinat tetap, absis berganti tanda, karena cermin tegak hanya membalik kiri-kanan.',
      'Dengan demikian, A(6, −1) → A′(−6, −1).',
      {
        teks: 'Pada gambar, A dan A′ sama jauhnya dari sumbu-y (6 satuan) pada sisi yang berlawanan, dan ruas AA′ mendatar.',
        gambar: { jenis: 'bidang', bangun: [[6, -1]], bayangan: [[-6, -1]], labelBangun: ['A(6, −1)'], labelBayangan: ["A′(−6, −1)"], cermin: 'y', panah: true, jangkauan: [-7, 7, -3, 2] },
      },
      'Jadi, peta titik (6, −1) oleh pencerminan pada sumbu-y adalah (−6, −1). (Jawaban D)',
    ],
    jebakan: 'Pilihan A, (6, 1), membalik ordinat, yaitu pencerminan pada sumbu-X. Pilihan B, (−6, 1), membalik keduanya (cermin titik asal). Pilihan C, (−1, 6), menukar koordinat, yaitu pencerminan pada garis y = x.',
    alasan: 'Cermin sumbu-y: (x, y) → (−x, y) = (−6, −1).',
  },
  {
    // cek: 9/3 === 3 && 6/2 === 3
    id: 'tg-m16',
    tingkat: 'mudah',
    pertanyaan: 'Perhatikan gambar berikut: segitiga ABC didilatasi dengan pusat O menjadi segitiga A′B′C′. Faktor skala dilatasinya adalah…',
    gambar: { jenis: 'bidang', bangun: [[1, 1], [3, 1], [1, 2]], bayangan: [[3, 3], [9, 3], [3, 6]], labelBangun: ['A', 'B', 'C'], labelBayangan: ["A′", "B′", "C′"], pusat: [0, 0], jangkauan: [-1, 10, -1, 7] },
    pilihan: ['2', '1/3', '6', '3', '9'],
    benar: 3,
    langkah: [
      'Konsep dilatasi: jika titik (x, y) didilatasi dengan pusat O dan faktor skala k, bayangannya (x′, y′) = (kx, ky); jarak tiap titik ke pusat menjadi k kali.',
      'Tampak pada gambar bahwa pusat dilatasinya adalah O(0, 0). Ambil titik B(3, 1) yang bayangannya B′(9, 3): pengalinya adalah 9/3 = 3 pada absis dan 3/1 = 3 pada ordinat, sehingga k = 3.',
      {
        teks: 'Sebagai pemeriksaan, A(1, 1) → A′(3, 3) dan C(1, 2) → C′(3, 6), keduanya juga dikali 3, dan setiap titik terletak segaris dengan pusat O dan bayangannya, seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[1, 1], [3, 1], [1, 2]], bayangan: [[3, 3], [9, 3], [3, 6]], labelBangun: ['A(1, 1)', 'B(3, 1)', 'C(1, 2)'], labelBayangan: ["A′(3, 3)", "B′(9, 3)", "C′(3, 6)"], pusat: [0, 0], panah: true, jangkauan: [-1, 10, -1, 7] },
      },
      'Jadi, faktor skala dilatasinya adalah 3. (Jawaban D)',
    ],
    jebakan: 'Pilihan E, 9, membandingkan LUAS (luas bayangan 9 kali luas semula), padahal faktor skala membandingkan panjang. Pilihan C, 6, mengurangkan 9 − 3 alih-alih membaginya. Pilihan B, 1/3, membalik perbandingan (dari bayangan ke bangun asal).',
    alasan: 'B(3, 1) → B′(9, 3): k = 9/3 = 3.',
  },
  {
    // cek: 5 - 2 === 3 && 4 + 3 === 7
    id: 'tg-m06',
    tingkat: 'mudah',
    pertanyaan: 'Titik (5, 4) ditranslasikan oleh vektor (−2, 3). Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[5, 4]], labelBangun: ['A(5, 4)'], jangkauan: [-1, 7, -1, 8] },
    pilihan: ['(7, 1)', '(−10, 12)', '(3, 7)', '(3, 1)', '(7, 7)'],
    benar: 2,
    langkah: [
      'Konsep translasi: (x, y) → (x + a, y + b) untuk vektor translasi (a, b). Di sini a = −2 (geser 2 ke kiri) dan b = 3 (geser 3 ke atas).',
      'Dengan demikian, A(5, 4) → A′(5 + (−2), 4 + 3) = A′(3, 7).',
      {
        teks: 'Pada gambar, A bergeser 2 satuan ke kiri dan 3 satuan ke atas menuju A′.',
        gambar: { jenis: 'bidang', bangun: [[5, 4]], bayangan: [[3, 7]], labelBangun: ['A(5, 4)'], labelBayangan: ["A′(3, 7)"], panah: true, jangkauan: [-1, 7, -1, 8] },
      },
      'Jadi, peta titik (5, 4) oleh translasi (−2, 3) adalah (3, 7). (Jawaban C)',
    ],
    jebakan: 'Pilihan A, (7, 1), mengurangkan vektor translasi (salah tanda kedua komponen). Pilihan D, (3, 1), benar pada absis tetapi mengurangkan 3 pada ordinat. Pilihan B mengalikan komponen.',
    alasan: 'Translasi: (5 − 2, 4 + 3) = (3, 7).',
  },
  {
    // cek: -3 === -3 && 0 === 0
    id: 'tg-m07',
    tingkat: 'mudah',
    pertanyaan: 'Titik (0, 3) diputar 90° berlawanan arah jarum jam terhadap titik asal. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[0, 3]], labelBangun: ['A(0, 3)'], pusat: [0, 0], jangkauan: [-4, 4, -4, 4] },
    pilihan: ['(3, 0)', '(−3, 0)', '(0, −3)', '(3, 3)', '(0, 3)'],
    benar: 1,
    langkah: [
      'Konsep rotasi 90° berlawanan arah jarum jam dengan pusat O: (x, y) → (−y, x), dari matriks rotasi dengan cos 90° = 0 dan sin 90° = 1.',
      'Dengan demikian, A(0, 3) → A′(−3, 0).',
      {
        teks: 'Pada gambar, A yang berada pada sumbu-y positif berpindah seperempat putaran ke sumbu-x negatif, tetap berjarak 3 dari pusat.',
        gambar: { jenis: 'bidang', bangun: [[0, 3]], bayangan: [[-3, 0]], labelBangun: ['A(0, 3)'], labelBayangan: ["A′(−3, 0)"], pusat: [0, 0], panah: true, jangkauan: [-4, 4, -4, 4] },
      },
      'Jadi, peta titik (0, 3) oleh rotasi 90° berlawanan arah jarum jam adalah (−3, 0). (Jawaban B)',
    ],
    jebakan: 'Pilihan A, (3, 0), memutar searah jarum jam. Pilihan C, (0, −3), memutar 180°. Pilihan E, (0, 3), mengira titik pada sumbu tidak berpindah; hanya pusat rotasi yang diam.',
    alasan: 'Rotasi 90°: (x, y) → (−y, x) = (−3, 0).',
  },
  {
    // cek: 4 - 1 === 3 && 2 - 1 === 1
    id: 'tg-m17',
    tingkat: 'mudah',
    pertanyaan: 'Perhatikan gambar berikut: segitiga ABC ditranslasikan menjadi segitiga A′B′C′. Vektor translasinya adalah…',
    gambar: { jenis: 'bidang', bangun: [[1, 1], [3, 1], [2, 3]], bayangan: [[4, 2], [6, 2], [5, 4]], labelBangun: ['A', 'B', 'C'], labelBayangan: ["A′", "B′", "C′"], jangkauan: [-1, 8, -1, 6] },
    pilihan: ['(1, 3)', '(4, 2)', '(−3, −1)', '(3, 3)', '(3, 1)'],
    benar: 4,
    langkah: [
      'Konsep translasi: vektor translasi (a, b) adalah selisih koordinat bayangan dengan koordinat asalnya, (a, b) = (x′ − x, y′ − y), dan sama untuk semua titik.',
      'Tampak pada gambar bahwa A(1, 1) berpindah ke A′(4, 2), sehingga (a, b) = (4 − 1, 2 − 1) = (3, 1).',
      {
        teks: 'Sebagai pemeriksaan, B(3, 1) → B′(6, 2) dan C(2, 3) → C′(5, 4) juga bergeser (3, 1); semua panah pada gambar sejajar dan sama panjang, ciri translasi.',
        gambar: { jenis: 'bidang', bangun: [[1, 1], [3, 1], [2, 3]], bayangan: [[4, 2], [6, 2], [5, 4]], labelBangun: ['A(1, 1)', 'B(3, 1)', 'C(2, 3)'], labelBayangan: ["A′(4, 2)", "B′(6, 2)", "C′(5, 4)"], panah: true, jangkauan: [-1, 8, -1, 6] },
      },
      'Jadi, vektor translasinya adalah (3, 1). (Jawaban E)',
    ],
    jebakan: 'Pilihan B, (4, 2), menyalin koordinat A′ seolah asalnya di titik O. Pilihan C, (−3, −1), menghitung asal dikurangi bayangan, arah yang terbalik. Pilihan A menukar komponen.',
    alasan: 'A(1, 1) → A′(4, 2): vektor (4 − 1, 2 − 1) = (3, 1).',
  },
  {
    // cek: 2 * 2 === 4 && 2 * 3 === 6
    id: 'tg-m09',
    tingkat: 'mudah',
    pertanyaan: 'Titik (2, 3) didilatasi dengan pusat titik asal dan faktor 2. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[2, 3]], labelBangun: ['A(2, 3)'], pusat: [0, 0], jangkauan: [-1, 6, -1, 8] },
    pilihan: ['(4, 5)', '(1; 1,5)', '(2, 6)', '(4, 3)', '(4, 6)'],
    benar: 4,
    langkah: [
      'Konsep dilatasi dengan pusat O dan faktor k: (x, y) → (kx, ky); kedua koordinat dikalikan k.',
      'Dengan demikian, A(2, 3) → A′(2 · 2, 2 · 3) = A′(4, 6).',
      {
        teks: 'Pada gambar, A′ terletak pada garis OA dengan jarak ke O dua kali jarak OA.',
        gambar: { jenis: 'bidang', bangun: [[2, 3]], bayangan: [[4, 6]], labelBangun: ['A(2, 3)'], labelBayangan: ["A′(4, 6)"], pusat: [0, 0], panah: true, jangkauan: [-1, 6, -1, 8] },
      },
      'Jadi, peta titik (2, 3) oleh dilatasi pusat O faktor 2 adalah (4, 6). (Jawaban E)',
    ],
    jebakan: 'Pilihan A, (4, 5), menambahkan 2 pada tiap koordinat alih-alih mengalikannya (itu translasi). Pilihan B, (1; 1,5), membagi 2 (dilatasi faktor 1/2). Pilihan D, (4, 3), hanya mengalikan absis.',
    alasan: 'Dilatasi: (2 · 2, 2 · 3) = (4, 6).',
  },
  {
    // cek: -4 === -4 && 1 === 1
    id: 'tg-m10',
    tingkat: 'mudah',
    pertanyaan: 'Titik (4, −1) diputar 180° terhadap titik asal. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[4, -1]], labelBangun: ['A(4, −1)'], pusat: [0, 0], jangkauan: [-5, 5, -3, 3] },
    pilihan: ['(4, 1)', '(−4, 1)', '(−4, −1)', '(1, −4)', '(−1, 4)'],
    benar: 1,
    langkah: [
      'Konsep rotasi 180° dengan pusat O: dari matriks rotasi dengan cos 180° = −1 dan sin 180° = 0, diperoleh (x, y) → (−x, −y); kedua koordinat berganti tanda. Rotasi setengah putaran sama dengan pencerminan terhadap titik O.',
      'Dengan demikian, A(4, −1) → A′(−4, 1).',
      {
        teks: 'Pada gambar, O adalah titik tengah ruas AA′.',
        gambar: { jenis: 'bidang', bangun: [[4, -1]], bayangan: [[-4, 1]], labelBangun: ['A(4, −1)'], labelBayangan: ["A′(−4, 1)"], pusat: [0, 0], panah: true, jangkauan: [-5, 5, -3, 3] },
      },
      'Jadi, peta titik (4, −1) oleh rotasi 180° adalah (−4, 1). (Jawaban B)',
    ],
    jebakan: 'Pilihan A, (4, 1), hanya membalik ordinat (cermin sumbu-x); pilihan C, (−4, −1), hanya membalik absis (cermin sumbu-y). Pilihan D dan E menukar koordinat, ciri rotasi 90°, bukan 180°.',
    alasan: 'Rotasi 180°: (x, y) → (−x, −y) = (−4, 1).',
  },
  {
    // cek: 5 === 5 && 2 === 2
    id: 'tg-m11',
    tingkat: 'mudah',
    pertanyaan: 'Titik (2, 5) dicerminkan pada garis y = x. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[2, 5]], labelBangun: ['A(2, 5)'], cermin: 'y=x', jangkauan: [-1, 6, -1, 6] },
    pilihan: ['(−2, −5)', '(5, 2)', '(−5, −2)', '(2, −5)', '(5, −2)'],
    benar: 1,
    langkah: [
      'Konsep refleksi terhadap garis y = x: jika titik (x, y) dicerminkan pada garis y = x, bayangannya (x′, y′) = (y, x); kedua koordinat bertukar tempat.',
      'Dengan demikian, A(2, 5) → A′(5, 2).',
      {
        teks: 'Pada gambar, ruas AA′ tegak lurus garis y = x dan titik tengahnya, (3,5; 3,5), terletak pada garis itu.',
        gambar: { jenis: 'bidang', bangun: [[2, 5]], bayangan: [[5, 2]], labelBangun: ['A(2, 5)'], labelBayangan: ["A′(5, 2)"], cermin: 'y=x', panah: true, jangkauan: [-1, 6, -1, 6] },
      },
      'Jadi, peta titik (2, 5) oleh pencerminan pada garis y = x adalah (5, 2). (Jawaban B)',
    ],
    jebakan: 'Pilihan C, (−5, −2), adalah pencerminan pada garis y = −x (tukar lalu balik tanda). Pilihan A, (−2, −5), pencerminan pada titik asal. Pilihan D dan E hanya membalik satu tanda.',
    alasan: 'Cermin y = x: (x, y) → (y, x) = (5, 2).',
  },
  {
    id: 'tg-m12',
    tingkat: 'mudah',
    pertanyaan: 'Titik A dipindahkan oleh sebuah transformasi ke titik A′. Titik A disebut…',
    pilihan: ['peta', 'bayangan', 'pusat', 'vektor', 'prapeta'],
    benar: 4,
    langkah: [
      'Ingat istilah transformasi: titik hasil pemindahan disebut PETA atau bayangan, sedangkan titik asal yang dipindahkan disebut PRAPETA (awalan "pra" berarti sebelum).',
      'Di sini A adalah titik asal dan A′ hasilnya, sehingga A adalah prapeta dan A′ adalah peta (bayangan) dari A.',
      'Jadi, titik A disebut prapeta. (Jawaban E)',
    ],
    jebakan: 'Pilihan A dan B, peta dan bayangan, adalah nama untuk A′ (hasilnya), bukan untuk A. Pilihan C, pusat, adalah titik tetap pada rotasi atau dilatasi, dan pilihan D, vektor, adalah arah geser pada translasi.',
    alasan: 'Asal = prapeta; hasil = peta (bayangan).',
  },
  {
    id: 'tg-m13',
    tingkat: 'mudah',
    pertanyaan: 'Translasi oleh vektor yang membiarkan setiap titik tetap di tempatnya adalah…',
    pilihan: ['(1, 1)', '(0, 0)', '(1, 0)', '(0, 1)', 'tidak ada'],
    benar: 1,
    langkah: [
      'Konsep translasi: (x, y) → (x + a, y + b). Titik tetap di tempatnya bila (x + a, y + b) = (x, y) untuk semua x dan y.',
      'Persamaan itu memberi a = 0 dan b = 0, sehingga vektornya (0, 0), yaitu tidak bergeser sama sekali (translasi identitas).',
      'Jadi, translasi yang membiarkan setiap titik tetap adalah translasi oleh (0, 0). (Jawaban B)',
    ],
    jebakan: 'Pilihan E, tidak ada, melupakan vektor nol yang sah sebagai translasi. Pilihan A, (1, 1), menggeser setiap titik 1 ke kanan dan 1 ke atas, sehingga tidak ada titik yang tetap.',
    alasan: 'Hanya vektor (0, 0) yang membuat x + a = x dan y + b = y.',
  },
  {
    // cek: -3 === -3 && 5 === 5
    id: 'tg-m14',
    tingkat: 'mudah',
    pertanyaan: 'Titik (3, −5) dicerminkan pada titik asal O. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[3, -5]], labelBangun: ['A(3, −5)'], pusat: [0, 0], jangkauan: [-4, 4, -6, 6] },
    pilihan: ['(−3, −5)', '(3, 5)', '(−3, 5)', '(−5, 3)', '(5, −3)'],
    benar: 2,
    langkah: [
      'Konsep refleksi terhadap titik O: bayangan (x′, y′) = (−x, −y), karena O harus menjadi titik tengah ruas yang menghubungkan titik dan bayangannya. Ini sama dengan rotasi 180° terhadap O.',
      'Dengan demikian, A(3, −5) → A′(−3, 5).',
      {
        teks: 'Pada gambar, O tepat di tengah ruas AA′: ((3 + (−3))/2, (−5 + 5)/2) = (0, 0).',
        gambar: { jenis: 'bidang', bangun: [[3, -5]], bayangan: [[-3, 5]], labelBangun: ['A(3, −5)'], labelBayangan: ["A′(−3, 5)"], pusat: [0, 0], panah: true, jangkauan: [-4, 4, -6, 6] },
      },
      'Jadi, peta titik (3, −5) oleh pencerminan pada titik O adalah (−3, 5). (Jawaban C)',
    ],
    jebakan: 'Pilihan A dan B hanya membalik satu koordinat (cermin terhadap sumbu). Pilihan D, (−5, 3), adalah rotasi 90° berlawanan arah jarum jam. Pilihan E, (5, −3), adalah pencerminan pada garis y = −x, yang menukar koordinat DAN membalik tanda; pencerminan titik hanya membalik tanda tanpa menukar.',
    alasan: 'Cermin titik O: (x, y) → (−x, −y) = (−3, 5).',
  },
  {
    // cek: 2 === 2 && 2 === 2
    id: 'tg-m15',
    tingkat: 'mudah',
    pertanyaan: 'Titik (2, 2) dicerminkan pada garis y = x. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[2, 2]], labelBangun: ['A(2, 2)'], cermin: 'y=x', jangkauan: [-1, 4, -1, 4] },
    pilihan: ['(−2, −2)', '(2, 2)', '(−2, 2)', '(2, −2)', '(0, 0)'],
    benar: 1,
    langkah: [
      'Konsep refleksi terhadap garis y = x: (x, y) → (y, x).',
      'Dengan demikian, A(2, 2) → A′(2, 2): bayangannya adalah titik itu sendiri.',
      {
        teks: 'Alasannya, titik (2, 2) memenuhi persamaan y = x, sehingga terletak PADA cermin; setiap titik pada garis cermin tidak berpindah (titik tetap atau invarian), seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[2, 2]], labelBangun: ['A(2, 2) = A′'], cermin: 'y=x', jangkauan: [-1, 4, -1, 4] },
      },
      'Jadi, peta titik (2, 2) oleh pencerminan pada garis y = x adalah (2, 2). (Jawaban B)',
    ],
    jebakan: 'Pilihan A, (−2, −2), memakai aturan cermin y = −x. Pilihan E, (0, 0), mengira titik "hilang" ke pusat. Titik yang terletak pada cermin tidak pernah berpindah.',
    alasan: '(2, 2) ada pada garis y = x, jadi tetap.',
  },
  // =============================================================== SEDANG
  {
    // cek: 6 === 6 && -4 === -4
    id: 'tg-cermin-y-sama-x',
    tingkat: 'sedang',
    pertanyaan: 'Titik (−4, 6) dicerminkan pada garis y = x. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[-4, 6]], labelBangun: ['A(−4, 6)'], cermin: 'y=x', jangkauan: [-6, 7, -5, 7] },
    pilihan: ['(4, −6)', '(−6, 4)', '(−4, −6)', '(6, −4)', '(4, 6)'],
    benar: 3,
    langkah: [
      'Konsep refleksi terhadap garis y = x: (x, y) → (y, x); kedua koordinat bertukar tempat, tandanya ikut masing-masing.',
      'Dengan demikian, A(−4, 6) → A′(6, −4).',
      {
        teks: 'Pada gambar, A di kiri atas garis y = x dan A′ di kanan bawah, sama jauhnya dari garis itu.',
        gambar: { jenis: 'bidang', bangun: [[-4, 6]], bayangan: [[6, -4]], labelBangun: ['A(−4, 6)'], labelBayangan: ["A′(6, −4)"], cermin: 'y=x', panah: true, jangkauan: [-6, 7, -5, 7] },
      },
      'Jadi, peta titik (−4, 6) oleh pencerminan pada garis y = x adalah (6, −4). (Jawaban D)',
    ],
    jebakan: 'Pilihan B, (−6, 4), adalah pencerminan pada garis y = −x (tukar lalu balik tanda). Pilihan A, (4, −6), pencerminan pada titik asal. Pilihan E, (4, 6), pencerminan pada sumbu-y.',
    alasan: 'Cermin y = x: (x, y) → (y, x) = (6, −4).',
  },
  {
    // cek: -2 * 3 === -6 && 5 * 3 === 15
    id: 'tg-dilatasi-pusat-asal',
    tingkat: 'sedang',
    pertanyaan: 'Titik (−2, 5) didilatasi dengan pusat titik asal dan faktor 3. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[-2, 5]], labelBangun: ['A(−2, 5)'], pusat: [0, 0], jangkauan: [-8, 2, -1, 17] },
    pilihan: ['(1, 8)', '(−6, 5)', '(−6, 15)', '(−5, 2)', '(6, −15)'],
    benar: 2,
    langkah: [
      'Konsep dilatasi dengan pusat O dan faktor k: (x, y) → (kx, ky).',
      'Dengan demikian, A(−2, 5) → A′(3 · (−2), 3 · 5) = A′(−6, 15).',
      {
        teks: 'Pada gambar, A′ segaris dengan O dan A, di sisi yang sama (faktor positif), dengan jarak ke O tiga kali lipat.',
        gambar: { jenis: 'bidang', bangun: [[-2, 5]], bayangan: [[-6, 15]], labelBangun: ['A(−2, 5)'], labelBayangan: ["A′(−6, 15)"], pusat: [0, 0], panah: true, jangkauan: [-8, 2, -1, 17] },
      },
      'Jadi, peta titik (−2, 5) oleh dilatasi pusat O faktor 3 adalah (−6, 15). (Jawaban C)',
    ],
    jebakan: 'Pilihan A, (1, 8), menambahkan 3 (translasi). Pilihan B, (−6, 5), hanya mengalikan absis. Pilihan E, (6, −15), adalah dilatasi faktor −3, ke sisi yang berlawanan.',
    alasan: 'Dilatasi: (3 · (−2), 3 · 5) = (−6, 15).',
  },
  {
    // cek: 2 * 3 - 5 === 1
    id: 'tg-cermin-garis-datar',
    tingkat: 'sedang',
    pertanyaan: 'Titik (2, 5) dicerminkan pada garis y = 3. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[2, 5]], labelBangun: ['A(2, 5)'], cermin: 'y=3', jangkauan: [-1, 5, -1, 7] },
    pilihan: ['(2, −5)', '(2, 8)', '(2, 1)', '(2, 2)', '(2, −1)'],
    benar: 2,
    langkah: [
      'Konsep refleksi terhadap garis mendatar y = k: (x, y) → (x, 2k − y); absis tetap, dan ordinat bayangan sama jauhnya dari k pada sisi lain.',
      'Dengan k = 3, A(2, 5) → A′(2, 2 · 3 − 5) = A′(2, 1). Titik A berada 2 satuan di atas garis, sehingga A′ berada 2 satuan di bawahnya.',
      {
        teks: 'Pada gambar, ruas AA′ tegak lurus garis y = 3 dan garis itu membaginya sama panjang.',
        gambar: { jenis: 'bidang', bangun: [[2, 5]], bayangan: [[2, 1]], labelBangun: ['A(2, 5)'], labelBayangan: ["A′(2, 1)"], cermin: 'y=3', panah: true, jangkauan: [-1, 5, -1, 7] },
      },
      'Jadi, peta titik (2, 5) oleh pencerminan pada garis y = 3 adalah (2, 1). (Jawaban C)',
    ],
    jebakan: 'Pilihan A, (2, −5), memakai aturan cermin sumbu-x (y = 0), padahal cerminnya y = 3. Pilihan B, (2, 8), menambahkan 3 pada ordinat (translasi). Pilihan D, (2, 2), salah menghitung 6 − 5.',
    alasan: 'Cermin y = 3: ordinat 2(3) − 5 = 1.',
  },
  {
    // cek: 2 * 2 - 5 === -1 && 2 * 1 - 3 === -1
    id: 'tg-rotasi-180-berpusat',
    tingkat: 'sedang',
    pertanyaan: 'Titik (5, 3) diputar 180° terhadap titik (2, 1). Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[5, 3]], labelBangun: ['A(5, 3)'], pusat: [2, 1], jangkauan: [-3, 7, -3, 5] },
    pilihan: ['(−5, −3)', '(−1, 1)', '(−1, −1)', '(1, −1)', '(9, 5)'],
    benar: 2,
    langkah: [
      'Konsep rotasi 180° dengan pusat P(a, b): pusat menjadi titik tengah ruas yang menghubungkan titik dan bayangannya, sehingga (x, y) → (2a − x, 2b − y).',
      'Dengan pusat (2, 1), A(5, 3) → A′(2 · 2 − 5, 2 · 1 − 3) = A′(−1, −1).',
      {
        teks: 'Sebagai pemeriksaan, titik tengah AA′ adalah ((5 + (−1))/2, (3 + (−1))/2) = (2, 1), tepat pusat rotasinya, seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[5, 3]], bayangan: [[-1, -1]], labelBangun: ['A(5, 3)'], labelBayangan: ["A′(−1, −1)"], pusat: [2, 1], panah: true, jangkauan: [-3, 7, -3, 5] },
      },
      'Jadi, peta titik (5, 3) oleh rotasi 180° terhadap (2, 1) adalah (−1, −1). (Jawaban C)',
    ],
    jebakan: 'Pilihan A, (−5, −3), memutar terhadap titik ASAL, mengabaikan pusat (2, 1). Pilihan E, (9, 5), menambahkan alih-alih mengurangkan (2a + x). Pilihan B dan D salah tanda pada salah satu koordinat.',
    alasan: 'Pusat adalah titik tengah: (2·2 − 5, 2·1 − 3) = (−1, −1).',
  },
  {
    // cek: 2 * 5 - 3 === 7 && 1 === 1
    id: 'tg-s05',
    tingkat: 'sedang',
    pertanyaan: 'Titik (3, 1) dicerminkan pada garis x = 5. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[3, 1]], labelBangun: ['A(3, 1)'], cermin: 'x=5', jangkauan: [-1, 9, -1, 4] },
    pilihan: ['(−3, 1)', '(8, 1)', '(2, 1)', '(7, 1)', '(3, 9)'],
    benar: 3,
    langkah: [
      'Konsep refleksi terhadap garis tegak x = h: (x, y) → (2h − x, y); ordinat tetap, dan absis bayangan sama jauhnya dari h pada sisi lain.',
      'Dengan h = 5, A(3, 1) → A′(2 · 5 − 3, 1) = A′(7, 1). Titik A berada 2 satuan di kiri garis, sehingga A′ berada 2 satuan di kanannya.',
      {
        teks: 'Pada gambar, ruas AA′ mendatar dan garis x = 5 membaginya sama panjang.',
        gambar: { jenis: 'bidang', bangun: [[3, 1]], bayangan: [[7, 1]], labelBangun: ['A(3, 1)'], labelBayangan: ["A′(7, 1)"], cermin: 'x=5', panah: true, jangkauan: [-1, 9, -1, 4] },
      },
      'Jadi, peta titik (3, 1) oleh pencerminan pada garis x = 5 adalah (7, 1). (Jawaban D)',
    ],
    jebakan: 'Pilihan A, (−3, 1), memakai aturan cermin sumbu-y (x = 0). Pilihan B, (8, 1), menambahkan 5 pada absis. Pilihan E, (3, 9), mengubah ordinat, padahal cermin tegak hanya menggeser kiri-kanan.',
    alasan: 'Cermin x = 5: absis 2(5) − 3 = 7.',
  },
  {
    // cek: -4 === -4 && 2 === 2
    id: 'tg-s06',
    tingkat: 'sedang',
    pertanyaan: 'Titik (−2, 4) dicerminkan pada garis y = −x. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[-2, 4]], labelBangun: ['A(−2, 4)'], cermin: 'y=-x', jangkauan: [-5, 5, -5, 5] },
    pilihan: ['(−4, 2)', '(4, −2)', '(2, −4)', '(−2, −4)', '(4, 2)'],
    benar: 0,
    langkah: [
      'Konsep refleksi terhadap garis y = −x: (x, y) → (−y, −x); kedua koordinat bertukar tempat DAN berganti tanda.',
      'Dengan demikian, A(−2, 4) → A′(−4, −(−2)) = A′(−4, 2).',
      {
        teks: 'Pada gambar, ruas AA′ tegak lurus garis y = −x dan titik tengahnya (−3, 3) terletak pada garis itu (memenuhi y = −x).',
        gambar: { jenis: 'bidang', bangun: [[-2, 4]], bayangan: [[-4, 2]], labelBangun: ['A(−2, 4)'], labelBayangan: ["A′(−4, 2)"], cermin: 'y=-x', panah: true, jangkauan: [-5, 5, -5, 5] },
      },
      'Jadi, peta titik (−2, 4) oleh pencerminan pada garis y = −x adalah (−4, 2). (Jawaban A)',
    ],
    jebakan: 'Pilihan E, (4, 2), hanya menukar koordinat, yaitu pencerminan pada garis y = x; untuk y = −x tandanya juga harus dibalik. Pilihan B, (4, −2), membalik tanda tanpa menukar (rotasi 180°).',
    alasan: 'Cermin y = −x: (x, y) → (−y, −x) = (−4, 2).',
  },
  {
    // cek: 2 + 3 * (6 - 2) === 14 && 1 + 3 * (1 - 1) === 1
    id: 'tg-s07',
    tingkat: 'sedang',
    pertanyaan: 'Titik (6, 1) didilatasi dengan pusat (2, 1) dan faktor 3. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[6, 1]], labelBangun: ['A(6, 1)'], pusat: [2, 1], jangkauan: [-1, 16, -2, 4] },
    pilihan: ['(14, 1)', '(18, 3)', '(12, 3)', '(14, 3)', '(8, 1)'],
    benar: 0,
    langkah: [
      'Konsep dilatasi dengan pusat P(a, b) dan faktor k: bayangannya (x′, y′) = (a + k(x − a), b + k(y − b)); jarak dari pusat dikalikan k, lalu diukur lagi dari pusat.',
      'Dengan pusat (2, 1) dan k = 3, A(6, 1) → A′(2 + 3(6 − 2), 1 + 3(1 − 1)) = A′(2 + 12, 1 + 0) = A′(14, 1).',
      {
        teks: 'Pada gambar, A berjarak 4 dari pusat ke kanan, sehingga A′ berjarak 3 × 4 = 12 dari pusat ke arah yang sama.',
        gambar: { jenis: 'bidang', bangun: [[6, 1]], bayangan: [[14, 1]], labelBangun: ['A(6, 1)'], labelBayangan: ["A′(14, 1)"], pusat: [2, 1], panah: true, jangkauan: [-1, 16, -2, 4] },
      },
      'Jadi, peta titik (6, 1) oleh dilatasi pusat (2, 1) faktor 3 adalah (14, 1). (Jawaban A)',
    ],
    jebakan: 'Pilihan B, (18, 3), mengalikan koordinat dengan 3 seolah pusatnya O. Pilihan D, (14, 3), benar absisnya tetapi mengalikan ordinat 1 dengan 3 tanpa mengurangi pusat dulu. Pilihan E, (8, 1), menambahkan 2 pada absis.',
    alasan: 'Dilatasi pusat (2, 1): (2 + 3·4, 1 + 3·0) = (14, 1).',
  },
  {
    // cek: 2 + (-(1 - 3)) === 4 && 3 + (1 - 2) === 2
    id: 'tg-s08',
    tingkat: 'sedang',
    pertanyaan: 'Titik (1, 1) diputar 90° berlawanan arah jarum jam terhadap titik (2, 3). Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[1, 1]], labelBangun: ['A(1, 1)'], pusat: [2, 3], jangkauan: [-2, 6, -1, 5] },
    pilihan: ['(−1, 1)', '(0, 4)', '(3, 0)', '(1, 3)', '(4, 2)'],
    benar: 4,
    langkah: [
      'Konsep rotasi dengan pusat P(a, b): geser dulu supaya pusat berada di O (hitung x − a dan y − b), putar dengan aturan rotasi, lalu geser kembali: (x′, y′) = (a − (y − b), b + (x − a)) untuk 90° berlawanan arah jarum jam, dari matriks dengan cos 90° = 0 dan sin 90° = 1.',
      'Hitung posisi A relatif terhadap pusat: (x − a, y − b) = (1 − 2, 1 − 3) = (−1, −2).',
      'Putar 90°: (−1, −2) → (−(−2), −1) = (2, −1). Geser kembali: (2 + 2, 3 + (−1)) = (4, 2).',
      {
        teks: 'Sebagai pemeriksaan, jarak A dan A′ ke pusat sama: √(1 + 4) = √5 dan √(4 + 1) = √5, seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[1, 1]], bayangan: [[4, 2]], labelBangun: ['A(1, 1)'], labelBayangan: ["A′(4, 2)"], pusat: [2, 3], panah: true, jangkauan: [-2, 6, -1, 5] },
      },
      'Jadi, peta titik (1, 1) oleh rotasi 90° terhadap (2, 3) adalah (4, 2). (Jawaban E)',
    ],
    jebakan: 'Pilihan A, (−1, 1), memutar terhadap titik ASAL. Pilihan B, (0, 4), memutar searah jarum jam terhadap pusat. Pilihan C, (3, 0), lupa menggeser kembali ke pusat dengan benar.',
    alasan: 'Relatif ke pusat (−1, −2) → (2, −1); ditambah pusat: (4, 2).',
  },
  {
    // cek: 1*3 + 2*1 === 5 && 0*3 + 1*1 === 1
    id: 'tg-s16',
    tingkat: 'sedang',
    pertanyaan: 'Matriks transformasi dengan baris pertama (1, 2) dan baris kedua (0, 1) memetakan titik (3, 1) ke…',
    pilihan: ['(3, 7)', '(5, 1)', '(5, 3)', '(4, 1)', '(7, 1)'],
    benar: 1,
    langkah: [
      'Konsep transformasi matriks: bayangan titik (x, y) oleh matriks (a b; c d) adalah (x′, y′) = (ax + by, cx + dy); baris pertama matriks memberi x′ dan baris kedua memberi y′.',
      'Dengan a = 1, b = 2, c = 0, d = 1 dan titik (3, 1): x′ = 1 · 3 + 2 · 1 = 5 dan y′ = 0 · 3 + 1 · 1 = 1.',
      {
        teks: 'Bayangannya (5, 1): titik bergeser mendatar sejauh 2 kali ordinatnya (transformasi ini disebut geseran atau shear), seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[3, 1]], bayangan: [[5, 1]], labelBangun: ['A(3, 1)'], labelBayangan: ["A′(5, 1)"], panah: true, jangkauan: [-1, 7, -1, 3] },
      },
      'Jadi, matriks itu memetakan (3, 1) ke (5, 1). (Jawaban B)',
    ],
    jebakan: 'Pilihan A, (3, 7), mengalikan kolom dengan koordinat secara terbalik (memakai (x + 0, 2x + y)), yaitu memakai transpos matriksnya. Pilihan D, (4, 1), menjumlahkan 3 + 1 pada absis tanpa mengalikan 2. Pilihan E, (7, 1), menghitung 3 + 2 · 2.',
    alasan: '(1·3 + 2·1, 0·3 + 1·1) = (5, 1).',
  },
  {
    // cek: 3 * -2 === -6 && 2 * -2 === -4
    id: 'tg-s10',
    tingkat: 'sedang',
    pertanyaan: 'Titik (3, 2) didilatasi dengan pusat titik asal dan faktor −2. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[3, 2]], labelBangun: ['A(3, 2)'], pusat: [0, 0], jangkauan: [-7, 5, -5, 4] },
    pilihan: ['(6, 4)', '(1, 0)', '(−3, −2)', '(−6, −4)', '(6, −4)'],
    benar: 3,
    langkah: [
      'Konsep dilatasi dengan pusat O dan faktor k: (x, y) → (kx, ky). Faktor negatif berarti bayangan berada di sisi yang BERLAWANAN terhadap pusat, dengan jarak |k| kali.',
      'Dengan k = −2, A(3, 2) → A′(−2 · 3, −2 · 2) = A′(−6, −4).',
      {
        teks: 'Pada gambar, A′ segaris dengan A dan O tetapi di seberang O, dengan jarak ke O dua kali jarak OA.',
        gambar: { jenis: 'bidang', bangun: [[3, 2]], bayangan: [[-6, -4]], labelBangun: ['A(3, 2)'], labelBayangan: ["A′(−6, −4)"], pusat: [0, 0], panah: true, jangkauan: [-7, 5, -5, 4] },
      },
      'Jadi, peta titik (3, 2) oleh dilatasi pusat O faktor −2 adalah (−6, −4). (Jawaban D)',
    ],
    jebakan: 'Pilihan A, (6, 4), mengabaikan tanda negatif faktor; itu dilatasi faktor 2. Pilihan C, (−3, −2), hanya membalik arah tanpa melipatgandakan jarak (faktor −1). Pilihan E, (6, −4), hanya membalik salah satu koordinat.',
    alasan: 'Dilatasi faktor −2: (−6, −4), di seberang pusat.',
  },
  {
    // cek: 5 - 3 === 2 && 2 - 7 === -5
    id: 'tg-s11',
    tingkat: 'sedang',
    pertanyaan: 'Sebuah translasi memetakan titik (3, 7) ke titik (5, 2). Vektor translasinya adalah…',
    gambar: { jenis: 'bidang', bangun: [[3, 7]], bayangan: [[5, 2]], labelBangun: ['A(3, 7)'], labelBayangan: ["A′(5, 2)"], jangkauan: [-1, 7, -1, 9] },
    pilihan: ['(−2, 5)', '(8, 9)', '(2, −5)', '(2, 5)', '(−2, −5)'],
    benar: 2,
    langkah: [
      'Konsep translasi: (x′, y′) = (x + a, y + b), sehingga vektor translasinya (a, b) = (x′ − x, y′ − y), koordinat bayangan dikurangi koordinat asal.',
      'Dengan demikian, (a, b) = (5 − 3, 2 − 7) = (2, −5): geser 2 ke kanan dan 5 ke bawah.',
      {
        teks: 'Sebagai pemeriksaan, (3, 7) + (2, −5) = (5, 2), seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[3, 7]], bayangan: [[5, 2]], labelBangun: ['A(3, 7)'], labelBayangan: ["A′(5, 2)"], panah: true, jangkauan: [-1, 7, -1, 9] },
      },
      'Jadi, vektor translasinya adalah (2, −5). (Jawaban C)',
    ],
    jebakan: 'Pilihan A, (−2, 5), menghitung asal dikurangi bayangan, arah yang terbalik. Pilihan B, (8, 9), menjumlahkan kedua titik. Pilihan D, (2, 5), lupa bahwa ordinat turun dari 7 ke 2.',
    alasan: 'Vektor = bayangan − asal = (5 − 3, 2 − 7) = (2, −5).',
  },
  {
    // cek: 2 * 1 - 2 === 0 && 2 * 1 - (-3) === 5
    id: 'tg-s12',
    tingkat: 'sedang',
    pertanyaan: 'Titik (2, −3) diputar 180° terhadap titik (1, 1). Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[2, -3]], labelBangun: ['A(2, −3)'], pusat: [1, 1], jangkauan: [-3, 4, -4, 6] },
    pilihan: ['(−2, 3)', '(0, −5)', '(3, −4)', '(−1, 4)', '(0, 5)'],
    benar: 4,
    langkah: [
      'Konsep rotasi 180° dengan pusat P(a, b): pusat adalah titik tengah ruas titik dan bayangannya, sehingga (x, y) → (2a − x, 2b − y).',
      'Dengan pusat (1, 1), A(2, −3) → A′(2 · 1 − 2, 2 · 1 − (−3)) = A′(0, 5).',
      {
        teks: 'Sebagai pemeriksaan, titik tengah AA′ adalah ((2 + 0)/2, (−3 + 5)/2) = (1, 1), tepat pusatnya, seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[2, -3]], bayangan: [[0, 5]], labelBangun: ['A(2, −3)'], labelBayangan: ["A′(0, 5)"], pusat: [1, 1], panah: true, jangkauan: [-3, 4, -4, 6] },
      },
      'Jadi, peta titik (2, −3) oleh rotasi 180° terhadap (1, 1) adalah (0, 5). (Jawaban E)',
    ],
    jebakan: 'Pilihan A, (−2, 3), memutar terhadap titik asal, mengabaikan pusatnya. Pilihan B, (0, −5), salah tanda pada 2 − (−3) = 5. Pilihan C, (3, −4), menambahkan (1, −1) seolah translasi.',
    alasan: 'Pusat titik tengah: (2·1 − 2, 2·1 + 3) = (0, 5).',
  },
  {
    // cek: 5 * 0.5 === 2.5 && 2 * 0.5 === 1
    id: 'tg-s13',
    tingkat: 'sedang',
    pertanyaan: 'Titik (5, 2) didilatasi dengan pusat titik asal dan faktor 1/2. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[5, 2]], labelBangun: ['A(5, 2)'], pusat: [0, 0], jangkauan: [-1, 7, -1, 4] },
    pilihan: ['(2,5; 1)', '(10, 4)', '(4,5; 1,5)', '(2, 1)', '(5, 1)'],
    benar: 0,
    langkah: [
      'Konsep dilatasi dengan pusat O dan faktor k: (x, y) → (kx, ky). Faktor 0 < k < 1 mengecilkan: bayangan lebih dekat ke pusat.',
      'Dengan k = 1/2, A(5, 2) → A′((1/2) · 5, (1/2) · 2) = A′(2,5; 1).',
      {
        teks: 'Pada gambar, A′ berada di tengah ruas OA.',
        gambar: { jenis: 'bidang', bangun: [[5, 2]], bayangan: [[2.5, 1]], labelBangun: ['A(5, 2)'], labelBayangan: ["A′(2,5; 1)"], pusat: [0, 0], panah: true, jangkauan: [-1, 7, -1, 4] },
      },
      'Jadi, peta titik (5, 2) oleh dilatasi pusat O faktor 1/2 adalah (2,5; 1). (Jawaban A)',
    ],
    jebakan: 'Pilihan B, (10, 4), mengalikan 2 (faktor 2), kebalikan dari mengecilkan. Pilihan C, (4,5; 1,5), mengurangkan 1/2 dari tiap koordinat (translasi). Pilihan E, (5, 1), hanya membagi ordinat.',
    alasan: 'Dilatasi 1/2: (2,5; 1).',
  },
  {
    // cek: 4 === 4 && -3 === -3
    id: 'tg-s14',
    tingkat: 'sedang',
    pertanyaan: 'Titik (3, 4) diputar 90° SEARAH jarum jam terhadap titik asal. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[3, 4]], labelBangun: ['A(3, 4)'], pusat: [0, 0], jangkauan: [-5, 5, -5, 5] },
    pilihan: ['(4, −3)', '(−4, 3)', '(−3, −4)', '(4, 3)', '(−3, 4)'],
    benar: 0,
    langkah: [
      'Konsep rotasi: searah jarum jam sebesar 90° sama dengan rotasi −90° (atau 270°) berlawanan arah jarum jam. Dengan cos(−90°) = 0 dan sin(−90°) = −1, matriks rotasinya memberi (x, y) → (y, −x).',
      'Dengan demikian, A(3, 4) → A′(4, −3).',
      {
        teks: 'Pada gambar, A di kuadran I berpindah searah jarum jam ke kuadran IV, tetap berjarak 5 dari O.',
        gambar: { jenis: 'bidang', bangun: [[3, 4]], bayangan: [[4, -3]], labelBangun: ['A(3, 4)'], labelBayangan: ["A′(4, −3)"], pusat: [0, 0], panah: true, jangkauan: [-5, 5, -5, 5] },
      },
      'Jadi, peta titik (3, 4) oleh rotasi 90° searah jarum jam adalah (4, −3). (Jawaban A)',
    ],
    jebakan: 'Pilihan B, (−4, 3), adalah rotasi 90° BERLAWANAN arah jarum jam (aturan (−y, x)). Pilihan C, (−3, −4), rotasi 180°. Pilihan D, (4, 3), hanya menukar koordinat (cermin y = x).',
    alasan: 'Searah jarum jam 90°: (x, y) → (y, −x) = (4, −3).',
  },
  {
    // cek: Math.abs(2*3 - 1*0) * 5 === 30
    id: 'tg-s17',
    tingkat: 'sedang',
    pertanyaan: 'Sebuah segitiga berluas 5 satuan ditransformasikan oleh matriks dengan baris pertama (2, 1) dan baris kedua (0, 3). Luas bayangannya adalah…',
    pilihan: ['15 satuan', '5 satuan', '30 satuan', '25 satuan', '35 satuan'],
    benar: 2,
    langkah: [
      'Konsep luas pada transformasi matriks: luas bayangan sama dengan |determinan matriks| dikalikan luas semula, L′ = |det M| × L.',
      'Hitung determinannya: untuk M = (2 1; 0 3), det M = (2)(3) − (1)(0) = 6 − 0 = 6.',
      'Untuk itu, L′ = |6| × 5 = 30 satuan luas.',
      'Jadi, luas bayangan segitiga itu adalah 30 satuan. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 15 satuan, hanya mengalikan luas dengan salah satu unsur diagonal (3). Pilihan D, 25 satuan, menjumlahkan luas dengan unsur-unsur matriks secara keliru. Pilihan B, 5 satuan, mengira luas tidak berubah; itu hanya berlaku bila |det| = 1 (misalnya rotasi dan pencerminan).',
    alasan: 'L′ = |det| × L = 6 × 5 = 30.',
  },
  // ================================================================ SULIT
  {
    // cek: -4 + 2 === -2 && 1 - 3 === -2
    id: 'tg-komposisi-cermin-translasi',
    tingkat: 'sulit',
    pertanyaan: 'Titik (4, 1) dicerminkan pada sumbu-y, lalu hasilnya ditranslasikan oleh vektor (2, −3). Peta akhirnya adalah…',
    gambar: { jenis: 'bidang', bangun: [[4, 1]], labelBangun: ['A(4, 1)'], cermin: 'y', jangkauan: [-7, 6, -4, 3] },
    pilihan: ['(−2, −2)', '(−4, 1)', '(−6, −2)', '(6, −2)', '(−2, 4)'],
    benar: 0,
    langkah: [
      'Komposisi transformasi dikerjakan berurutan, yang disebut pertama dikerjakan dahulu. Untuk itu, dapat dibuat skema panah: A(4, 1) → [cermin sumbu-y] → A′ → [translasi (2, −3)] → A″.',
      'Langkah pertama, cermin sumbu-y mengubah (x, y) menjadi (−x, y): A(4, 1) → A′(−4, 1).',
      'Langkah kedua, translasi (2, −3) menambahkan vektornya: A′(−4, 1) → A″(−4 + 2, 1 + (−3)) = A″(−2, −2).',
      {
        teks: 'Kedua langkah itu tampak pada gambar berikut: A ke A′ oleh cermin, lalu A′ ke A″ oleh geseran.',
        gambar: { jenis: 'bidang', bangun: [[4, 1], [-4, 1]], bayangan: [[-4, 1], [-2, -2]], labelBangun: ['A(4, 1)', "A′(−4, 1)"], labelBayangan: ["A′", "A″(−2, −2)"], cermin: 'y', panah: true, jangkauan: [-7, 6, -4, 3] },
      },
      'Jadi, peta akhirnya adalah (−2, −2). (Jawaban A)',
    ],
    jebakan: 'Pilihan B, (−4, 1), berhenti setelah pencerminan. Pilihan D, (6, −2), mentranslasikan dulu baru mencerminkan, urutan yang terbalik; urutan pengerjaan mengubah hasilnya. Pilihan C, (−6, −2), mengurangkan vektor translasi.',
    alasan: 'Skema: (4, 1) → (−4, 1) → (−2, −2).',
  },
  {
    // cek: 2 - (-3) === 5 && 1 - 8 === -7
    id: 'tg-cari-vektor-translasi',
    tingkat: 'sulit',
    pertanyaan: 'Sebuah translasi memetakan titik (−3, 8) ke titik (2, 1). Vektor translasinya adalah…',
    gambar: { jenis: 'bidang', bangun: [[-3, 8]], bayangan: [[2, 1]], labelBangun: ['A(−3, 8)'], labelBayangan: ["A′(2, 1)"], jangkauan: [-5, 4, -1, 10] },
    pilihan: ['(−5, 7)', '(5, 7)', '(5, −7)', '(−1, 9)', '(−5, −7)'],
    benar: 2,
    langkah: [
      'Konsep translasi: (x′, y′) = (x + a, y + b), sehingga vektor translasinya (a, b) = (x′ − x, y′ − y).',
      'Dengan demikian, (a, b) = (2 − (−3), 1 − 8) = (5, −7); pengurangan bilangan negatif menjadi penjumlahan pada absis.',
      {
        teks: 'Sebagai pemeriksaan, (−3, 8) + (5, −7) = (2, 1), seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[-3, 8]], bayangan: [[2, 1]], labelBangun: ['A(−3, 8)'], labelBayangan: ["A′(2, 1)"], panah: true, jangkauan: [-5, 4, -1, 10] },
      },
      'Jadi, vektor translasinya adalah (5, −7). (Jawaban C)',
    ],
    jebakan: 'Pilihan A, (−5, 7), menghitung asal dikurangi bayangan, arah terbalik. Pilihan D, (−1, 9), menjumlahkan koordinat kedua titik. Pilihan B, (5, 7), salah tanda pada 1 − 8.',
    alasan: 'Vektor = (2 − (−3), 1 − 8) = (5, −7).',
  },
  {
    // cek: 0 === 0 && 1 === 1
    id: 'tg-kolom-matriks',
    tingkat: 'sulit',
    pertanyaan: 'Matriks yang mewakili pencerminan pada garis y = x memetakan titik (1, 0) ke…',
    gambar: { jenis: 'bidang', bangun: [[1, 0]], labelBangun: ['(1, 0)'], cermin: 'y=x', jangkauan: [-2, 2, -2, 2] },
    pilihan: ['(1, 0)', '(−1, 0)', '(0, −1)', '(1, 1)', '(0, 1)'],
    benar: 4,
    langkah: [
      'Konsep refleksi terhadap garis y = x: (x, y) → (y, x), yang dalam bentuk matriks ditulis (0 1; 1 0), karena x′ = 0 · x + 1 · y dan y′ = 1 · x + 0 · y.',
      'Kalikan matriks itu dengan (1, 0): x′ = 0 · 1 + 1 · 0 = 0 dan y′ = 1 · 1 + 0 · 0 = 1, sehingga bayangannya (0, 1).',
      {
        teks: 'Hasil ini juga terbaca langsung dari aturan tukar koordinat: (1, 0) → (0, 1). Perhatikan bahwa bayangan (1, 0) selalu sama dengan KOLOM PERTAMA matriks transformasinya, dan bayangan (0, 1) sama dengan kolom keduanya.',
        gambar: { jenis: 'bidang', bangun: [[1, 0]], bayangan: [[0, 1]], labelBangun: ['(1, 0)'], labelBayangan: ['(0, 1)'], cermin: 'y=x', panah: true, jangkauan: [-2, 2, -2, 2] },
      },
      'Jadi, matriks pencerminan pada garis y = x memetakan (1, 0) ke (0, 1). (Jawaban E)',
    ],
    jebakan: 'Pilihan A, (1, 0), mengira titik pada sumbu tidak berubah; yang tetap hanya titik pada garis cermin y = x. Pilihan B, (−1, 0), memakai matriks cermin sumbu-y. Pilihan C, (0, −1), memakai matriks cermin y = −x.',
    alasan: 'Matriks (0 1; 1 0) memetakan (1, 0) ke kolom pertamanya, (0, 1).',
  },
  {
    // cek: 1 + (-(-2 - -2)) === 1 && -2 + (3 - 1) === 0
    id: 'tg-rotasi-90-berpusat',
    tingkat: 'sulit',
    pertanyaan: 'Titik (3, −2) diputar 90° berlawanan arah jarum jam terhadap titik (1, −2). Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[3, -2]], labelBangun: ['A(3, −2)'], pusat: [1, -2], jangkauan: [-2, 5, -4, 2] },
    pilihan: ['(1, 0)', '(2, 1)', '(3, 0)', '(−1, −2)', '(1, −4)'],
    benar: 0,
    langkah: [
      'Konsep rotasi dengan pusat P(a, b): hitung posisi relatif (x − a, y − b), putar dengan aturan 90° berlawanan arah jarum jam (u, v) → (−v, u), lalu geser kembali dengan menambahkan (a, b).',
      'Posisi A relatif terhadap pusat (1, −2): (3 − 1, −2 − (−2)) = (2, 0); A berada 2 satuan tepat di kanan pusat.',
      'Putar 90°: (2, 0) → (−0, 2) = (0, 2). Geser kembali: (0 + 1, 2 + (−2)) = (1, 0); bayangan berada 2 satuan tepat di atas pusat.',
      {
        teks: 'Pada gambar, A dan A′ sama-sama berjarak 2 dari pusat, dan sudut APA′ siku-siku.',
        gambar: { jenis: 'bidang', bangun: [[3, -2]], bayangan: [[1, 0]], labelBangun: ['A(3, −2)'], labelBayangan: ["A′(1, 0)"], pusat: [1, -2], panah: true, jangkauan: [-2, 5, -4, 2] },
      },
      'Jadi, peta titik (3, −2) oleh rotasi 90° terhadap (1, −2) adalah (1, 0). (Jawaban A)',
    ],
    jebakan: 'Pilihan B, (2, 1), memutar terhadap titik asal lalu salah geser. Pilihan E, (1, −4), memutar SEARAH jarum jam terhadap pusat (2 satuan di bawah pusat). Pilihan D, (−1, −2), memutar 180° terhadap pusat.',
    alasan: 'Relatif (2, 0) → (0, 2); ditambah pusat (1, −2): (1, 0).',
  },
  {
    // cek: 2 + 1 === 3 && 5 - 1 === 4 && 4 === 4 && 3 === 3
    id: 'tg-l05',
    tingkat: 'sulit',
    pertanyaan: 'Titik (2, 5) ditranslasikan oleh (1, −1), lalu hasilnya dicerminkan pada garis y = x. Peta akhirnya adalah…',
    gambar: { jenis: 'bidang', bangun: [[2, 5]], labelBangun: ['A(2, 5)'], cermin: 'y=x', jangkauan: [-1, 7, -1, 7] },
    pilihan: ['(3, 4)', '(4, 3)', '(6, 1)', '(5, 2)', '(1, 6)'],
    benar: 1,
    langkah: [
      'Buat skema panah sesuai urutan: A(2, 5) → [translasi (1, −1)] → A′ → [cermin y = x] → A″.',
      'Langkah pertama, translasi: A′ = (2 + 1, 5 + (−1)) = (3, 4).',
      'Langkah kedua, cermin y = x menukar koordinat: A″ = (4, 3).',
      {
        teks: 'Kedua langkah tampak pada gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[2, 5], [3, 4]], bayangan: [[3, 4], [4, 3]], labelBangun: ['A(2, 5)', "A′(3, 4)"], labelBayangan: ["A′", "A″(4, 3)"], cermin: 'y=x', panah: true, jangkauan: [-1, 7, -1, 7] },
      },
      'Jadi, peta akhirnya adalah (4, 3). (Jawaban B)',
    ],
    jebakan: 'Pilihan A, (3, 4), berhenti setelah translasi. Pilihan C, (6, 1), mencerminkan dulu menjadi (5, 2) lalu mentranslasikan; urutannya terbalik. Pilihan D, (5, 2), hanya mencerminkan tanpa translasi.',
    alasan: 'Skema: (2, 5) → (3, 4) → (4, 3).',
  },
  {
    // cek: 1 - 1 === 0 && 3 + 1 === 4
    id: 'tg-l16',
    tingkat: 'sulit',
    pertanyaan: 'Titik (3, 1) dicerminkan pada garis y = x + 1. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[3, 1]], labelBangun: ['A(3, 1)'], garis: [{ m: 1, c: 1, label: 'y = x + 1' }], jangkauan: [-1, 5, -1, 5] },
    pilihan: ['(0, 4)', '(1, 4)', '(2, 4)', '(0, 2)', '(4, 0)'],
    benar: 0,
    langkah: [
      'Konsep refleksi terhadap garis y = x + k: geser dulu garisnya ke y = x dengan translasi (0, −k), cerminkan pada y = x, lalu geser kembali dengan (0, k). Hasil gabungannya: (x, y) → (y − k, x + k).',
      'Dengan k = 1, A(3, 1) → A′(1 − 1, 3 + 1) = A′(0, 4).',
      {
        teks: 'Sebagai pemeriksaan, titik tengah AA′ adalah (1,5; 2,5) dan memenuhi y = x + 1 (2,5 = 1,5 + 1), serta ruas AA′ berarah (−3, 3), tegak lurus pada arah garis (1, 1), seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[3, 1]], bayangan: [[0, 4]], labelBangun: ['A(3, 1)'], labelBayangan: ["A′(0, 4)"], garis: [{ m: 1, c: 1, label: 'y = x + 1' }], panah: true, jangkauan: [-1, 5, -1, 5] },
      },
      'Jadi, peta titik (3, 1) oleh pencerminan pada garis y = x + 1 adalah (0, 4). (Jawaban A)',
    ],
    jebakan: 'Pilihan B, (1, 4), menukar koordinat lalu hanya menambahkan 1 pada ordinat (lupa mengurangkan 1 pada absis). Pilihan E, (4, 0), memakai aturan y = x + 1 dengan tanda terbalik. Pilihan D, (0, 2), hanya menggeser tanpa mencerminkan.',
    alasan: 'Cermin y = x + 1: (x, y) → (y − 1, x + 1) = (0, 4).',
  },
  {
    // cek: (1 + 5) / 2 === 3 && (2 + 0) / 2 === 1
    id: 'tg-l07',
    tingkat: 'sulit',
    pertanyaan: 'Rotasi 180° memetakan titik (1, 2) ke titik (5, 0). Pusat rotasinya adalah…',
    gambar: { jenis: 'bidang', bangun: [[1, 2]], bayangan: [[5, 0]], labelBangun: ['A(1, 2)'], labelBayangan: ["A′(5, 0)"], jangkauan: [-1, 7, -2, 4] },
    pilihan: ['(0, 0)', '(6, 2)', '(4, −2)', '(2, 1)', '(3, 1)'],
    benar: 4,
    langkah: [
      'Konsep rotasi 180°: pusat rotasi adalah titik tengah ruas yang menghubungkan titik dengan bayangannya, karena setiap titik berpindah ke seberang pusat pada jarak yang sama.',
      'Titik tengah A(1, 2) dan A′(5, 0) adalah ((1 + 5)/2, (2 + 0)/2) = (3, 1).',
      {
        teks: 'Sebagai pemeriksaan, rotasi 180° terhadap (3, 1) memetakan (1, 2) ke (2 · 3 − 1, 2 · 1 − 2) = (5, 0), sesuai, seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[1, 2]], bayangan: [[5, 0]], labelBangun: ['A(1, 2)'], labelBayangan: ["A′(5, 0)"], pusat: [3, 1], panah: true, jangkauan: [-1, 7, -2, 4] },
      },
      'Jadi, pusat rotasinya adalah (3, 1). (Jawaban E)',
    ],
    jebakan: 'Pilihan A, (0, 0), mengira rotasi selalu berpusat di titik asal; rotasi 180° terhadap O memetakan (1, 2) ke (−1, −2), bukan (5, 0). Pilihan B, (6, 2), menjumlahkan koordinat tanpa membagi 2. Pilihan C, (4, −2), mengambil selisihnya.',
    alasan: 'Pusat = titik tengah A dan A′ = (3, 1).',
  },
  {
    // cek: 2 * -3 === -6 && -3 * -3 === 9
    id: 'tg-l08',
    tingkat: 'sulit',
    pertanyaan: 'Dilatasi berpusat titik asal dengan faktor k memetakan titik (2, −3) ke titik (−6, 9). Nilai k adalah…',
    gambar: { jenis: 'bidang', bangun: [[2, -3]], bayangan: [[-6, 9]], labelBangun: ['A(2, −3)'], labelBayangan: ["A′(−6, 9)"], pusat: [0, 0], jangkauan: [-7, 4, -4, 10] },
    pilihan: ['3', '−1/3', '−3', '1/3', '−8'],
    benar: 2,
    langkah: [
      'Konsep dilatasi pusat O faktor k: (x, y) → (kx, ky), sehingga k = x′/x = y′/y.',
      'Dari absis, k = −6/2 = −3; dari ordinat, k = 9/(−3) = −3. Keduanya cocok, sehingga k = −3.',
      {
        teks: 'Tanda negatif berarti bayangan berada di seberang pusat, dan besarnya 3 berarti jaraknya tiga kali lipat, seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[2, -3]], bayangan: [[-6, 9]], labelBangun: ['A(2, −3)'], labelBayangan: ["A′(−6, 9)"], pusat: [0, 0], panah: true, jangkauan: [-7, 4, -4, 10] },
      },
      'Jadi, nilai k adalah −3. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 3, mengabaikan tanda: bayangan berada di kuadran yang berlawanan, sehingga faktornya negatif. Pilihan B, −1/3, membalik perbandingan (asal dibagi bayangan). Pilihan E, −8, mengurangkan −6 − 2.',
    alasan: 'k = −6/2 = 9/(−3) = −3.',
  },
  {
    // cek: (1 + 7) / 2 === 4
    id: 'tg-l09',
    tingkat: 'sulit',
    pertanyaan: 'Pencerminan pada garis x = a memetakan titik (1, 4) ke titik (7, 4). Nilai a adalah…',
    gambar: { jenis: 'bidang', bangun: [[1, 4]], bayangan: [[7, 4]], labelBangun: ['A(1, 4)'], labelBayangan: ["A′(7, 4)"], jangkauan: [-1, 9, -1, 6] },
    pilihan: ['4', '6', '3', '8', '7'],
    benar: 0,
    langkah: [
      'Konsep refleksi terhadap garis tegak x = a: cermin membagi ruas AA′ sama panjang, sehingga a adalah rata-rata absis titik dan bayangannya: a = (x + x′)/2.',
      'Dengan demikian, a = (1 + 7)/2 = 4. Titik A berada 3 satuan di kiri garis x = 4 dan A′ 3 satuan di kanannya.',
      {
        teks: 'Sebagai pemeriksaan dengan rumus (x, y) → (2a − x, y): (2 · 4 − 1, 4) = (7, 4), sesuai, seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[1, 4]], bayangan: [[7, 4]], labelBangun: ['A(1, 4)'], labelBayangan: ["A′(7, 4)"], cermin: 'x=4', panah: true, jangkauan: [-1, 9, -1, 6] },
      },
      'Jadi, nilai a adalah 4. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 6, mengambil selisih absis 7 − 1 tanpa membagi 2 dan menambah 1. Pilihan D, 8, menjumlahkan absis tanpa membagi 2. Pilihan C, 3, mengambil jarak A ke cermin sebagai a.',
    alasan: 'a = (1 + 7)/2 = 4.',
  },
  {
    // cek: (0 - 3) + 2 === (0 - 1)
    id: 'tg-l10',
    tingkat: 'sulit',
    pertanyaan: 'Garis y = x + 2 ditranslasikan oleh vektor (3, 1). Persamaan petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[0, 2]], labelBangun: ['(0, 2)'], garis: [{ m: 1, c: 2, label: 'y = x + 2' }], jangkauan: [-4, 5, -3, 6] },
    pilihan: ['y = x + 6', 'y = x + 3', 'y = 4x + 3', 'y = x', 'y = x − 2'],
    benar: 3,
    langkah: [
      'Ambil sembarang titik yang dilalui garis itu, misalkan titik (x, y). Bayangannya oleh translasi (3, 1) adalah (x′, y′) = (x + 3, y + 1).',
      'Dengan demikian, dapat ditulis x = x′ − 3 dan y = y′ − 1.',
      'Substitusikan kedua bentuk ini pada persamaan garis y = x + 2: y′ − 1 = (x′ − 3) + 2, sehingga y′ = x′ − 3 + 2 + 1 = x′.',
      {
        teks: 'Dengan menghilangkan tanda aksen, persamaan bayangannya adalah y = x. Sebagai pemeriksaan, titik (0, 2) pada garis semula digeser menjadi (3, 3), dan (3, 3) memenuhi y = x, seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[0, 2]], bayangan: [[3, 3]], labelBangun: ['(0, 2)'], labelBayangan: ['(3, 3)'], garis: [{ m: 1, c: 2, label: 'y = x + 2' }, { m: 1, c: 0, label: 'y = x', warna: 'sudut' }], panah: true, jangkauan: [-4, 5, -3, 6] },
      },
      'Jadi, persamaan petanya adalah y = x. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, y = x + 6, menambahkan kedua komponen vektor pada konstanta (2 + 3 + 1). Pilihan B, y = x + 3, hanya menggeser ke atas 1 tanpa memperhitungkan geseran ke kanan 3 yang menurunkan konstanta. Pilihan C mengubah gradien, padahal translasi tidak mengubah kemiringan.',
    alasan: 'x = x′ − 3, y = y′ − 1 disubstitusikan: y′ = x′; petanya y = x.',
  },
  {
    id: 'tg-l11',
    tingkat: 'sulit',
    pertanyaan: 'Matriks rotasi 90° berlawanan arah jarum jam berpusat titik asal adalah…',
    pilihan: ['baris pertama (0, 1), baris kedua (−1, 0)', 'baris pertama (1, 0), baris kedua (0, −1)', 'baris pertama (0, 1), baris kedua (1, 0)', 'baris pertama (0, −1), baris kedua (1, 0)', 'baris pertama (−1, 0), baris kedua (0, −1)'],
    benar: 3,
    langkah: [
      'Konsep matriks rotasi sebesar θ berlawanan arah jarum jam dengan pusat O: baris pertama (cos θ, −sin θ) dan baris kedua (sin θ, cos θ).',
      'Substitusikan θ = 90°: cos 90° = 0 dan sin 90° = 1, sehingga baris pertama (0, −1) dan baris kedua (1, 0).',
      'Sebagai pemeriksaan, matriks itu memetakan (1, 0) ke kolom pertamanya, (0, 1): titik pada sumbu-x positif berpindah ke sumbu-y positif, memang seperempat putaran berlawanan arah jarum jam.',
      'Jadi, matriks rotasi 90° berlawanan arah jarum jam adalah baris pertama (0, −1), baris kedua (1, 0). (Jawaban D)',
    ],
    jebakan: 'Pilihan A adalah matriks rotasi 90° SEARAH jarum jam (θ = −90°). Pilihan C adalah matriks cermin y = x, dan pilihan E matriks rotasi 180°. Pilihan B matriks cermin sumbu-x.',
    alasan: 'cos 90° = 0, sin 90° = 1: matriks (0 −1; 1 0).',
  },
  {
    id: 'tg-l12',
    tingkat: 'sulit',
    pertanyaan: 'Matriks dengan baris pertama (2, 0) dan baris kedua (0, 2) mewakili transformasi…',
    pilihan: ['translasi (2, 2)', 'rotasi 180°', 'dilatasi pusat O faktor 2', 'cermin pada garis y = 2', 'dilatasi pusat O faktor 4'],
    benar: 2,
    langkah: [
      'Baca aturan matriksnya: (x, y) → (2 · x + 0 · y, 0 · x + 2 · y) = (2x, 2y); setiap koordinat dikalikan 2.',
      'Aturan (x, y) → (kx, ky) adalah konsep dilatasi berpusat O dengan faktor k; di sini k = 2.',
      'Translasi tidak dapat diwakili matriks 2 × 2 (translasi menambah, bukan mengalikan), rotasi 180° diwakili (−1 0; 0 −1), dan faktor 4 akan diwakili (4 0; 0 4).',
      'Jadi, matriks itu mewakili dilatasi pusat O faktor 2. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, translasi (2, 2), mengira angka 2 pada matriks berarti geseran; matriks mengalikan koordinat, bukan menambahnya. Pilihan E, faktor 4, mengalikan kedua unsur diagonal (4 adalah determinannya, faktor luas, bukan faktor skala).',
    alasan: '(x, y) → (2x, 2y): dilatasi faktor 2.',
  },
  {
    // cek: 2*(-1) === -2 && -2*(-0.5) - 1 === 0
    id: 'tg-l17',
    tingkat: 'sulit',
    pertanyaan: 'Garis y = x + 1 ditransformasikan oleh matriks dengan baris pertama (2, 0) dan baris kedua (0, 1), lalu hasilnya dicerminkan pada sumbu-x. Persamaan bayangannya adalah…',
    gambar: { jenis: 'bidang', bangun: [[0, 1]], labelBangun: ['(0, 1)'], garis: [{ m: 1, c: 1, label: 'y = x + 1' }], jangkauan: [-4, 5, -4, 4] },
    pilihan: ['x − 2y + 2 = 0', '2x + y + 1 = 0', 'x + 2y − 2 = 0', 'y = −2x − 1', 'x + 2y + 2 = 0'],
    benar: 4,
    langkah: [
      'Ambil sembarang titik (x, y) pada garis. Buat skema panah: (x, y) → [matriks (2 0; 0 1)] → (x′, y′) = (2x, y) → [cermin sumbu-x] → (x″, y″) = (2x, −y).',
      'Dengan demikian, dapat ditulis x″ = 2x dan y″ = −y, atau x = x″/2 dan y = −y″.',
      'Substitusikan kedua bentuk ini pada persamaan garis y = x + 1: −y″ = x″/2 + 1. Kalikan kedua ruas dengan 2: −2y″ = x″ + 2, sehingga x″ + 2y″ + 2 = 0.',
      {
        teks: 'Dengan menghilangkan tanda aksen ganda, persamaan bayangannya adalah x + 2y + 2 = 0, yaitu y = −(1/2)x − 1. Sebagai pemeriksaan, titik (0, 1) pada garis semula menjadi (0, 1) → (0, −1), dan (0, −1) memenuhi 0 + 2(−1) + 2 = 0, seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[0, 1], [1, 2]], bayangan: [[0, -1], [2, -2]], labelBangun: ['(0, 1)', '(1, 2)'], labelBayangan: ['(0, −1)', '(2, −2)'], garis: [{ m: 1, c: 1, label: 'y = x + 1' }, { m: -0.5, c: -1, label: 'x + 2y + 2 = 0', warna: 'sudut' }], panah: true, jangkauan: [-4, 5, -4, 4] },
      },
      'Jadi, persamaan bayangannya adalah x + 2y + 2 = 0. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, x − 2y + 2 = 0, lupa mencerminkan (tanda y tidak dibalik). Pilihan B, 2x + y + 1 = 0, memakai x = 2x″ (mengalikan alih-alih membagi). Pilihan D, y = −2x − 1, kekeliruan yang sama dengan tanda dibalik.',
    alasan: 'x = x″/2, y = −y″ disubstitusikan: −y″ = x″/2 + 1, yaitu x + 2y + 2 = 0.',
  },
  {
    // cek: 1 + 2 * (3 - 1) === 5 && 2 + 2 * (5 - 2) === 8
    id: 'tg-l14',
    tingkat: 'sulit',
    pertanyaan: 'Titik (3, 5) didilatasi dengan pusat (1, 2) dan faktor 2. Petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[3, 5]], labelBangun: ['A(3, 5)'], pusat: [1, 2], jangkauan: [-1, 8, -1, 10] },
    pilihan: ['(5, 8)', '(6, 10)', '(4, 6)', '(7, 12)', '(2, 3)'],
    benar: 0,
    langkah: [
      'Konsep dilatasi dengan pusat P(a, b) dan faktor k: (x′, y′) = (a + k(x − a), b + k(y − b)).',
      'Posisi A relatif terhadap pusat (1, 2): (3 − 1, 5 − 2) = (2, 3). Kalikan 2: (4, 6). Tambahkan pusat: (1 + 4, 2 + 6) = (5, 8).',
      {
        teks: 'Pada gambar, A′ segaris dengan pusat dan A, dua kali lebih jauh dari pusat.',
        gambar: { jenis: 'bidang', bangun: [[3, 5]], bayangan: [[5, 8]], labelBangun: ['A(3, 5)'], labelBayangan: ["A′(5, 8)"], pusat: [1, 2], panah: true, jangkauan: [-1, 8, -1, 10] },
      },
      'Jadi, peta titik (3, 5) oleh dilatasi pusat (1, 2) faktor 2 adalah (5, 8). (Jawaban A)',
    ],
    jebakan: 'Pilihan B, (6, 10), mengalikan koordinat dengan 2 seolah pusatnya O. Pilihan C, (4, 6), berhenti pada posisi relatif yang sudah dikali 2, lupa menambahkan pusat. Pilihan E, (2, 3), hanya posisi relatif.',
    alasan: 'Relatif (2, 3) → (4, 6); ditambah pusat (1, 2): (5, 8).',
  },
  {
    // cek: -1 + 3 === 2 && 2 + 3 === 5
    id: 'tg-l15',
    tingkat: 'sulit',
    pertanyaan: 'Titik (2, 1) diputar 90° berlawanan arah jarum jam terhadap titik asal, lalu ditranslasikan oleh (3, 3). Peta akhirnya adalah…',
    gambar: { jenis: 'bidang', bangun: [[2, 1]], labelBangun: ['A(2, 1)'], pusat: [0, 0], jangkauan: [-3, 6, -1, 6] },
    pilihan: ['(−1, 2)', '(−4, 5)', '(5, 4)', '(2, 5)', '(4, −5)'],
    benar: 3,
    langkah: [
      'Buat skema panah sesuai urutan: A(2, 1) → [rotasi 90°] → A′ → [translasi (3, 3)] → A″.',
      'Langkah pertama, rotasi 90° berlawanan arah jarum jam terhadap O: (x, y) → (−y, x), sehingga A′ = (−1, 2).',
      'Langkah kedua, translasi (3, 3): A″ = (−1 + 3, 2 + 3) = (2, 5).',
      {
        teks: 'Kedua langkah tampak pada gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[2, 1], [-1, 2]], bayangan: [[-1, 2], [2, 5]], labelBangun: ['A(2, 1)', "A′(−1, 2)"], labelBayangan: ["A′", "A″(2, 5)"], pusat: [0, 0], panah: true, jangkauan: [-3, 6, -1, 6] },
      },
      'Jadi, peta akhirnya adalah (2, 5). (Jawaban D)',
    ],
    jebakan: 'Pilihan A, (−1, 2), berhenti setelah rotasi. Pilihan B, (−4, 5), mentranslasikan dulu ke (5, 4) lalu memutar; urutan terbalik. Pilihan C, (5, 4), hanya mentranslasikan.',
    alasan: 'Skema: (2, 1) → (−1, 2) → (2, 5).',
  },
  // ========================================================= SANGAT SULIT
  {
    // cek: 1 === 1 && 3 === 3
    id: 'tg-gabungan-jadi-satu',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah titik dicerminkan pada sumbu-x, lalu diputar 90° berlawanan arah jarum jam terhadap titik asal. Gabungan kedua langkah itu sama dengan satu transformasi tunggal, yaitu…',
    gambar: { jenis: 'bidang', bangun: [[3, 1]], labelBangun: ['P(3, 1)'], cermin: 'x', pusat: [0, 0], jangkauan: [-2, 4, -2, 4] },
    pilihan: ['cermin pada garis y = −x', 'rotasi 90° terhadap titik asal', 'cermin pada garis y = x', 'rotasi 180° terhadap titik asal', 'cermin pada sumbu-y'],
    benar: 2,
    langkah: [
      'Ambil sembarang titik (x, y) dan buat skema panah: (x, y) → [cermin sumbu-x] → (x, −y) → [rotasi 90°, aturan (u, v) → (−v, u)] → (−(−y), x) = (y, x).',
      'Aturan gabungannya (x, y) → (y, x) tepat sama dengan konsep pencerminan pada garis y = x, yang menukar kedua koordinat.',
      {
        teks: 'Sebagai pemeriksaan dengan P(3, 1): cermin sumbu-x memberi (3, −1), rotasi 90° memberi (1, 3), dan (1, 3) memang bayangan (3, 1) oleh cermin y = x, seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[3, 1], [3, -1]], bayangan: [[3, -1], [1, 3]], labelBangun: ['P(3, 1)', "P′(3, −1)"], labelBayangan: ["P′", "P″(1, 3)"], cermin: 'y=x', panah: true, jangkauan: [-2, 4, -2, 4] },
      },
      'Jadi, gabungan kedua langkah itu sama dengan cermin pada garis y = x. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, cermin y = −x, adalah hasil bila urutannya DIBALIK (rotasi dulu, baru cermin sumbu-x): (x, y) → (−y, x) → (−y, −x). Pilihan B mengira pencerminan "hilang" ditelan rotasi. Aturan umumnya: dua pencerminan menghasilkan rotasi, cermin lalu rotasi menghasilkan pencerminan lain.',
    alasan: '(x, y) → (x, −y) → (y, x): cermin y = x.',
  },
  {
    // cek: -(2 * 0 + 3) === -3
    id: 'tg-cermin-garis-persamaan',
    tingkat: 'sangat sulit',
    pertanyaan: 'Garis y = 2x + 3 dicerminkan pada sumbu-x. Persamaan petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[0, 3]], labelBangun: ['(0, 3)'], garis: [{ m: 2, c: 3, label: 'y = 2x + 3' }], cermin: 'x', jangkauan: [-4, 3, -6, 6] },
    pilihan: ['y = 2x − 3', 'y = −2x − 3', 'y = −2x + 3', 'y = 2x + 3', 'y = 0,5x + 3'],
    benar: 1,
    langkah: [
      'Ambil sembarang titik (x, y) pada garis. Bayangannya oleh cermin sumbu-x adalah (x′, y′) = (x, −y), sehingga x = x′ dan y = −y′.',
      'Substitusikan pada persamaan garis y = 2x + 3: −y′ = 2x′ + 3, sehingga y′ = −2x′ − 3.',
      {
        teks: 'Dengan menghilangkan tanda aksen, persamaan petanya adalah y = −2x − 3. Sebagai pemeriksaan, titik (0, 3) menjadi (0, −3) dan titik (−1, 1) menjadi (−1, −1); keduanya memenuhi y = −2x − 3, seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[0, 3], [-1, 1]], bayangan: [[0, -3], [-1, -1]], labelBangun: ['(0, 3)', '(−1, 1)'], labelBayangan: ['(0, −3)', '(−1, −1)'], garis: [{ m: 2, c: 3, label: 'y = 2x + 3' }, { m: -2, c: -3, label: 'y = −2x − 3', warna: 'sudut' }], cermin: 'x', panah: true, jangkauan: [-4, 3, -6, 6] },
      },
      'Jadi, persamaan petanya adalah y = −2x − 3. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, y = 2x − 3, hanya membalik konstanta, padahal seluruh y berganti tanda sehingga gradien ikut berbalik. Pilihan C, y = −2x + 3, adalah pencerminan pada sumbu-Y (x → −x). Pilihan D mengira garis tidak berubah.',
    alasan: 'y = −y′: −y′ = 2x′ + 3, petanya y = −2x − 3.',
  },
  {
    // cek: 12 * (-3) * (-3) === 108
    id: 'tg-luas-dilatasi',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah segitiga berluas 12 satuan didilatasi dengan faktor −3. Luas petanya adalah…',
    pilihan: ['36 satuan', '−108 satuan', '4 satuan', '108 satuan', '−36 satuan'],
    benar: 3,
    langkah: [
      'Konsep luas pada dilatasi faktor k: setiap panjang menjadi |k| kali, sehingga luas (hasil kali dua panjang) menjadi k² kali: L′ = k² × L.',
      'Dengan k = −3, k² = (−3)² = 9, sehingga L′ = 9 × 12 = 108 satuan luas.',
      'Tanda negatif pada faktor hanya membalik letak bayangan ke seberang pusat; luas tidak pernah negatif. (Cara matriks: dilatasi faktor −3 diwakili (−3 0; 0 −3) dengan determinan 9.)',
      'Jadi, luas petanya adalah 108 satuan. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 36 satuan, hanya mengalikan luas dengan |k| = 3, padahal luas berdimensi dua sehingga faktornya k² = 9. Pilihan B, −108, membawa tanda negatif ke luas. Pilihan C, 4 satuan, membagi 12 dengan 3.',
    alasan: 'L′ = k² × L = 9 × 12 = 108.',
  },
  {
    id: 'tg-urutan-boleh-dibalik',
    tingkat: 'sangat sulit',
    pertanyaan: 'Pada pasangan transformasi manakah hasilnya TETAP SAMA walaupun urutan pengerjaannya dibalik?',
    pilihan: ['cermin sumbu-x dan rotasi 90° terhadap titik asal', 'translasi (2, 1) dan translasi (−3, 4)', 'cermin garis y = x dan translasi (1, 0)', 'rotasi 90° terhadap titik asal dan rotasi 90° terhadap (1, 1)', 'dilatasi faktor 2 terhadap titik asal dan translasi (3, 0)'],
    benar: 1,
    langkah: [
      'Periksa tiap pasangan dengan satu titik uji, misalnya P(x, y). Dua translasi: (x, y) + (2, 1) + (−3, 4) = (x − 1, y + 5), dan dengan urutan dibalik (x, y) + (−3, 4) + (2, 1) = (x − 1, y + 5) juga; penjumlahan vektor bersifat komutatif, sehingga hasilnya selalu sama.',
      'Pasangan B: cermin sumbu-x lalu rotasi 90° memberi (x, y) → (x, −y) → (y, x), sedangkan urutan dibalik memberi (x, y) → (−y, x) → (−y, −x); berbeda.',
      'Pasangan C dengan P(0, 0): cermin y = x lalu translasi (1, 0) memberi (1, 0), sedangkan translasi lalu cermin memberi (0, 1); berbeda. Pasangan E dengan P(0, 0): dilatasi lalu translasi memberi (3, 0), sedangkan translasi lalu dilatasi memberi (6, 0); berbeda.',
      'Pasangan D dengan P(0, 0): rotasi 90° terhadap O memberi (0, 0), lalu rotasi 90° terhadap (1, 1) memberi (2, 0); urutan dibalik: rotasi terhadap (1, 1) memberi (2, 0), lalu rotasi terhadap O memberi (0, 2); berbeda.',
      'Jadi, pasangan yang hasilnya tetap sama walau urutannya dibalik adalah translasi (2, 1) dan translasi (−3, 4). (Jawaban B)',
    ],
    jebakan: 'Pilihan D tampak benar karena keduanya rotasi 90°, tetapi pusatnya berbeda sehingga tidak komutatif; dua rotasi hanya komutatif bila pusatnya sama. Pilihan E tampak benar karena translasinya searah sumbu-x, tetapi dilatasi melipatgandakan geseran yang dilakukan sebelumnya.',
    alasan: 'Hanya dua translasi yang komutatif (penjumlahan vektor); pasangan lain memberi hasil berbeda saat dibalik.',
  },
  {
    // cek: 2 * (-2) + 4 === 0 && 2 * 0 + 4 === 4
    id: 'tg-x05',
    tingkat: 'sangat sulit',
    pertanyaan: 'Garis 2x + y = 4 dicerminkan pada sumbu-y. Persamaan petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[2, 0]], labelBangun: ['(2, 0)'], garis: [{ m: -2, c: 4, label: '2x + y = 4' }], cermin: 'y', jangkauan: [-4, 4, -3, 8] },
    pilihan: ['y = −2x − 4', 'y = 2x + 4', 'y = −2x + 4', 'y = 2x − 4', 'x + 2y = 4'],
    benar: 1,
    langkah: [
      'Ambil sembarang titik (x, y) pada garis. Bayangannya oleh cermin sumbu-y adalah (x′, y′) = (−x, y), sehingga x = −x′ dan y = y′.',
      'Substitusikan pada persamaan garis 2x + y = 4: 2(−x′) + y′ = 4, sehingga y′ = 2x′ + 4.',
      {
        teks: 'Dengan menghilangkan tanda aksen, persamaan petanya adalah y = 2x + 4. Sebagai pemeriksaan, titik potong (2, 0) menjadi (−2, 0), yang memenuhi 0 = 2(−2) + 4, dan titik (0, 4) pada sumbu-y tetap, seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[2, 0], [0, 4]], bayangan: [[-2, 0], [0, 4]], labelBangun: ['(2, 0)', '(0, 4)'], labelBayangan: ['(−2, 0)', '(0, 4) tetap'], garis: [{ m: -2, c: 4, label: '2x + y = 4' }, { m: 2, c: 4, label: 'y = 2x + 4', warna: 'sudut' }], cermin: 'y', panah: true, jangkauan: [-4, 4, -3, 8] },
      },
      'Jadi, persamaan petanya adalah y = 2x + 4. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, y = −2x − 4, membalik tanda konstanta sekaligus mempertahankan gradien negatif, tidak sesuai aturan cermin mana pun; cermin sumbu-x memberi y = 2x − 4 (pilihan D). Pilihan C, y = −2x + 4, adalah garis semula. Pilihan E menukar peran x dan y (cermin y = x).',
    alasan: 'x = −x′: 2(−x′) + y′ = 4, petanya y = 2x + 4.',
  },
  {
    id: 'tg-x06',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah titik dicerminkan pada garis y = x, lalu hasilnya dicerminkan pada sumbu-x. Gabungan keduanya sama dengan satu transformasi tunggal, yaitu…',
    pilihan: ['rotasi 90° berlawanan arah jarum jam terhadap titik asal', 'cermin pada garis y = −x', 'rotasi 180°', 'cermin pada sumbu-y', 'rotasi 90° searah jarum jam terhadap titik asal'],
    benar: 4,
    langkah: [
      'Ambil sembarang titik (x, y) dan buat skema panah: (x, y) → [cermin y = x] → (y, x) → [cermin sumbu-x] → (y, −x).',
      'Aturan gabungannya (x, y) → (y, −x) sama dengan konsep rotasi 90° SEARAH jarum jam terhadap O (rotasi −90°, dari matriks dengan cos(−90°) = 0 dan sin(−90°) = −1).',
      {
        teks: 'Sebagai pemeriksaan dengan P(3, 1): cermin y = x memberi (1, 3), cermin sumbu-x memberi (1, −3), dan (1, −3) memang hasil memutar (3, 1) seperempat putaran searah jarum jam, seperti gambar berikut. Secara umum, dua pencerminan berturut-turut menghasilkan rotasi sebesar dua kali sudut antara kedua cerminnya (di sini 2 × 45° = 90°).',
        gambar: { jenis: 'bidang', bangun: [[3, 1], [1, 3]], bayangan: [[1, 3], [1, -3]], labelBangun: ['P(3, 1)', "P′(1, 3)"], labelBayangan: ["P′", "P″(1, −3)"], cermin: 'y=x', pusat: [0, 0], panah: true, jangkauan: [-2, 4, -4, 4] },
      },
      'Jadi, gabungan keduanya sama dengan rotasi 90° searah jarum jam terhadap titik asal. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, rotasi berlawanan arah jarum jam, adalah hasil bila urutan cerminnya dibalik (sumbu-x dulu, baru y = x): (x, y) → (x, −y) → (−y, x). Pilihan B mengira dua cermin menghasilkan cermin lagi; dua pencerminan selalu menghasilkan rotasi.',
    alasan: '(x, y) → (y, x) → (y, −x): rotasi −90°.',
  },
  {
    id: 'tg-x07',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kurva y = x² dicerminkan pada garis y = x. Persamaan petanya adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x', 'x'], jangkauan: [-3, 5, -3, 5], nama: ['y = x²', 'y = x'] },
    pilihan: ['x = y²', 'y = −x²', 'y = x²', 'x = −y²', 'y = √x'],
    benar: 0,
    langkah: [
      'Ambil sembarang titik (x, y) pada kurva. Bayangannya oleh cermin y = x adalah (x′, y′) = (y, x), sehingga x = y′ dan y = x′.',
      'Substitusikan pada persamaan kurva y = x²: x′ = (y′)², yaitu x′ = y′².',
      {
        teks: 'Dengan menghilangkan tanda aksen, persamaan petanya adalah x = y², parabola yang terbuka ke kanan. Sebagai pemeriksaan, titik (2, 4) pada y = x² menjadi (4, 2), dan (4, 2) memenuhi x = y², seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x', 'x', 'Math.sqrt(x)', '-Math.sqrt(x)'], jangkauan: [-3, 5, -3, 5], titik: [{ x: 2, y: 4, label: '(2, 4)' }, { x: 4, y: 2, label: '(4, 2)' }], nama: ['y = x²', 'y = x', 'x = y²'] },
      },
      'Jadi, persamaan petanya adalah x = y². (Jawaban A)',
    ],
    jebakan: 'Pilihan E, y = √x, hanya SEPARUH bayangan (cabang atas); cabang bawah y = −√x ikut menjadi bayangan dari x negatif pada parabola semula. Pilihan C mengira parabola simetris terhadap y = x. Pilihan B dan D adalah pencerminan pada sumbu.',
    alasan: 'Tukar x dan y: x = y² (parabola terbuka ke kanan).',
  },
  {
    // cek: -1 + 2 * 0 + 1 === 0 && -3 + 2 * 1 + 1 === 0
    id: 'tg-x08',
    tingkat: 'sangat sulit',
    pertanyaan: 'Garis y = 2x + 1 diputar 90° berlawanan arah jarum jam terhadap titik asal. Persamaan petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[0, 1]], labelBangun: ['(0, 1)'], garis: [{ m: 2, c: 1, label: 'y = 2x + 1' }], pusat: [0, 0], jangkauan: [-4, 4, -4, 4] },
    pilihan: ['y = −2x + 1', '2x − y + 1 = 0', 'x + 2y + 1 = 0', 'x − 2y − 1 = 0', 'y = 2x − 1'],
    benar: 2,
    langkah: [
      'Ambil sembarang titik (x, y) pada garis. Bayangannya oleh rotasi 90° berlawanan arah jarum jam adalah (x′, y′) = (−y, x), sehingga y = −x′ dan x = y′.',
      'Substitusikan pada persamaan garis y = 2x + 1: −x′ = 2y′ + 1, sehingga x′ + 2y′ + 1 = 0.',
      {
        teks: 'Dengan menghilangkan tanda aksen, persamaan petanya adalah x + 2y + 1 = 0. Sebagai pemeriksaan, titik (0, 1) menjadi (−1, 0) dan titik (1, 3) menjadi (−3, 1); keduanya memenuhi x + 2y + 1 = 0. Gradien berubah dari 2 menjadi −1/2 (hasil kalinya −1), memang tegak lurus seperti seharusnya untuk rotasi 90°, seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[0, 1], [1, 3]], bayangan: [[-1, 0], [-3, 1]], labelBangun: ['(0, 1)', '(1, 3)'], labelBayangan: ['(−1, 0)', '(−3, 1)'], garis: [{ m: 2, c: 1, label: 'y = 2x + 1' }, { m: -0.5, c: -0.5, label: 'x + 2y + 1 = 0', warna: 'sudut' }], pusat: [0, 0], panah: true, jangkauan: [-4, 4, -4, 4] },
      },
      'Jadi, persamaan petanya adalah x + 2y + 1 = 0. (Jawaban C)',
    ],
    jebakan: 'Pilihan D, x − 2y − 1 = 0, memakai rotasi searah jarum jam ((x, y) → (y, −x)). Pilihan A, y = −2x + 1, hanya membalik gradien tanpa menukar peran koordinat (itu cermin sumbu-y). Pilihan B adalah garis semula dalam bentuk lain.',
    alasan: 'y = −x′, x = y′: −x′ = 2y′ + 1, petanya x + 2y + 1 = 0.',
  },
  {
    // cek: 2 * 3 - 3 === 3 && 2 * (3*3) - 3*3 === 9
    id: 'tg-x09',
    tingkat: 'sangat sulit',
    pertanyaan: 'Garis 2x − y = 3 didilatasi dengan pusat titik asal dan faktor 3. Persamaan petanya adalah…',
    gambar: { jenis: 'bidang', bangun: [[0, -3]], labelBangun: ['(0, −3)'], garis: [{ m: 2, c: -3, label: '2x − y = 3' }], pusat: [0, 0], jangkauan: [-2, 8, -10, 6] },
    pilihan: ['6x − 3y = 3', '2x − y = 3', '2x − y = 1', '6x − y = 9', '2x − y = 9'],
    benar: 4,
    langkah: [
      'Ambil sembarang titik (x, y) pada garis. Bayangannya oleh dilatasi pusat O faktor 3 adalah (x′, y′) = (3x, 3y), sehingga x = x′/3 dan y = y′/3.',
      'Substitusikan pada persamaan garis 2x − y = 3: 2(x′/3) − y′/3 = 3. Kalikan kedua ruas dengan 3: 2x′ − y′ = 9.',
      {
        teks: 'Dengan menghilangkan tanda aksen, persamaan petanya adalah 2x − y = 9: garis yang sejajar dengan garis semula (gradien tetap 2) tetapi tiga kali lebih jauh dari O. Sebagai pemeriksaan, titik (0, −3) menjadi (0, −9), yang memenuhi 2(0) − (−9) = 9, seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[0, -3], [2, 1]], bayangan: [[0, -9], [6, 3]], labelBangun: ['(0, −3)', '(2, 1)'], labelBayangan: ['(0, −9)', '(6, 3)'], garis: [{ m: 2, c: -3, label: '2x − y = 3' }, { m: 2, c: -9, label: '2x − y = 9', warna: 'sudut' }], pusat: [0, 0], panah: true, jangkauan: [-2, 8, -10, 6] },
      },
      'Jadi, persamaan petanya adalah 2x − y = 9. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 6x − 3y = 3, mengalikan koefisien x dan y dengan 3 tetapi tidak konstantanya; bentuk itu sama saja dengan 2x − y = 1 (pilihan C), garis yang lebih DEKAT ke O. Pilihan B mengira dilatasi tidak mengubah garis; itu hanya benar untuk garis yang melalui pusat.',
    alasan: 'x = x′/3, y = y′/3: 2x′ − y′ = 9.',
  },
  {
    // cek: -1 - 2 === -3 && 4 + 1 === 5 && 5 === 5 && 3 === 3
    id: 'tg-x17',
    tingkat: 'sangat sulit',
    pertanyaan: 'Titik P ditransformasikan oleh matriks dengan baris pertama (0, −1) dan baris kedua (1, 0), lalu hasilnya ditranslasikan oleh (2, −1). Peta akhirnya adalah (−1, 4). Koordinat P adalah…',
    pilihan: ['(3, 5)', '(−5, 3)', '(3, −5)', '(5, −3)', '(5, 3)'],
    benar: 4,
    langkah: [
      'Misalkan titik awalnya P(a, b). Buat skema maju: P(a, b) → [matriks (0 −1; 1 0)] → (0 · a + (−1) · b, 1 · a + 0 · b) = (−b, a) → [translasi (2, −1)] → (−b + 2, a − 1).',
      'Karena peta akhirnya (−1, 4), diperoleh −b + 2 = −1 dan a − 1 = 4, sehingga b = 3 dan a = 5.',
      'Cara lain, bekerja mundur: batalkan translasi dulu, (−1 − 2, 4 + 1) = (−3, 5); lalu batalkan matriks (yang merupakan rotasi 90°) dengan rotasi −90°, (u, v) → (v, −u): (−3, 5) → (5, 3), sama.',
      'Sebagai pemeriksaan maju: (5, 3) → (−3, 5) → (−3 + 2, 5 − 1) = (−1, 4), sesuai.',
      'Jadi, koordinat P adalah (5, 3). (Jawaban E)',
    ],
    jebakan: 'Pilihan A, (3, 5), lupa menukar kembali koordinat saat membatalkan rotasi. Pilihan B, (−5, 3), membatalkan translasi dengan tanda terbalik. Pilihan D, (5, −3), memakai rotasi maju sekali lagi alih-alih rotasi baliknya.',
    alasan: 'Maju: (a, b) → (−b + 2, a − 1) = (−1, 4) memberi a = 5, b = 3.',
  },
  {
    // cek: 6 * 2 * 2 === 24
    id: 'tg-x11',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah segitiga berluas 6 satuan diputar 90° terhadap titik asal, lalu didilatasi dengan pusat O dan faktor 2. Luas petanya adalah…',
    pilihan: ['12 satuan', '6 satuan', '48 satuan', '18 satuan', '24 satuan'],
    benar: 4,
    langkah: [
      'Konsep luas pada transformasi: rotasi adalah isometri (tidak mengubah panjang maupun luas), sedangkan dilatasi faktor k mengalikan luas dengan k².',
      'Setelah rotasi 90°, luasnya tetap 6 satuan. Setelah dilatasi faktor 2, luasnya menjadi 2² × 6 = 4 × 6 = 24 satuan.',
      'Cara matriks: matriks rotasi (0 −1; 1 0) berdeterminan 1 dan matriks dilatasi (2 0; 0 2) berdeterminan 4; gabungannya berdeterminan 1 × 4 = 4, sehingga L′ = 4 × 6 = 24.',
      'Jadi, luas petanya adalah 24 satuan. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 12 satuan, hanya mengalikan luas dengan faktor 2, padahal luas berdimensi dua (faktor 4). Pilihan C, 48 satuan, mengalikan lagi dengan 2 untuk rotasi, padahal rotasi tidak mengubah luas. Pilihan B mengira kedua transformasi mempertahankan luas.',
    alasan: 'Rotasi tetap, dilatasi ×k² = 4: 24.',
  },
  {
    id: 'tg-x12',
    tingkat: 'sangat sulit',
    pertanyaan: 'Transformasi T memetakan (1, 0) ke (0, 1) dan memetakan (0, 1) ke (−1, 0). Transformasi T adalah…',
    pilihan: ['cermin pada garis y = x', 'rotasi 90° searah jarum jam terhadap O', 'cermin pada garis y = −x', 'rotasi 90° berlawanan arah jarum jam terhadap O', 'rotasi 180° terhadap O'],
    benar: 3,
    langkah: [
      'Ingat bahwa bayangan (1, 0) dan (0, 1) adalah kolom pertama dan kedua matriks transformasinya. Dengan demikian, matriks T mempunyai kolom pertama (0, 1) dan kolom kedua (−1, 0), yaitu baris pertama (0, −1) dan baris kedua (1, 0).',
      'Bandingkan dengan matriks rotasi (cos θ −sin θ; sin θ cos θ): cos θ = 0 dan sin θ = 1 memberi θ = 90° berlawanan arah jarum jam.',
      'Pemeriksaan geometris: (1, 0) di sumbu-x positif berpindah ke sumbu-y positif, dan (0, 1) di sumbu-y positif berpindah ke sumbu-x negatif; keduanya seperempat putaran berlawanan arah jarum jam.',
      'Jadi, transformasi T adalah rotasi 90° berlawanan arah jarum jam terhadap O. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, cermin y = x, memang memetakan (1, 0) ke (0, 1), tetapi memetakan (0, 1) ke (1, 0), bukan (−1, 0); satu titik uji saja tidak cukup. Pilihan B, rotasi searah jarum jam, memetakan (1, 0) ke (0, −1).',
    alasan: 'Matriks (0 −1; 1 0) = rotasi 90° berlawanan arah jarum jam.',
  },
  {
    // cek: -(2*2)/2 === -2 && Math.abs(-(1*1)/2 + 0.5) < 1e-9
    id: 'tg-x16',
    tingkat: 'sangat sulit',
    pertanyaan: 'Parabola y = x² didilatasi dengan pusat O dan faktor 2, lalu hasilnya diputar 180° terhadap O. Persamaan bayangannya adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-5, 5, -6, 6], nama: ['y = x²'] },
    pilihan: ['y = −(1/2)x²', 'y = (1/2)x²', 'y = −2x²', 'y = 2x²', 'y = −x²'],
    benar: 0,
    langkah: [
      'Ambil sembarang titik (x, y) pada parabola dan buat skema panah: (x, y) → [dilatasi faktor 2] → (x′, y′) = (2x, 2y) → [rotasi 180°] → (x″, y″) = (−2x, −2y).',
      'Dengan demikian, x = −x″/2 dan y = −y″/2.',
      'Substitusikan pada persamaan parabola y = x²: −y″/2 = (−x″/2)² = x″²/4, sehingga y″ = −x″²/2.',
      {
        teks: 'Dengan menghilangkan tanda aksen ganda, persamaan bayangannya adalah y = −(1/2)x²: parabola terbuka ke bawah dan lebih lebar. Sebagai pemeriksaan, titik (1, 1) menjadi (2, 2) lalu (−2, −2), dan (−2, −2) memenuhi y = −(1/2)(4) = −2, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x', '-x*x/2'], jangkauan: [-5, 5, -6, 6], titik: [{ x: 1, y: 1, label: '(1, 1)' }, { x: -2, y: -2, label: '(-2, -2)' }], nama: ['y = x²', 'y = −(1/2)x²'] },
      },
      'Jadi, persamaan bayangannya adalah y = −(1/2)x². (Jawaban A)',
    ],
    jebakan: 'Pilihan C, y = −2x², memakai x = 2x″ (mengalikan alih-alih membagi) sehingga parabolanya menyempit, padahal dilatasi faktor 2 melebarkannya. Pilihan B, y = (1/2)x², lupa rotasi 180° yang membalik parabola ke bawah. Pilihan E lupa dilatasinya.',
    alasan: 'x = −x″/2, y = −y″/2: −y″/2 = x″²/4, bayangannya y = −(1/2)x².',
  },
  {
    // cek: -3 === -3 && 4 === 4
    id: 'tg-x14',
    tingkat: 'sangat sulit',
    pertanyaan: 'Rotasi 90° berlawanan arah jarum jam terhadap titik asal memetakan titik P ke (−3, 4). Koordinat P adalah…',
    gambar: { jenis: 'bidang', bangun: [[-3, 4]], labelBangun: ["P′(−3, 4)"], pusat: [0, 0], jangkauan: [-5, 5, -5, 5] },
    pilihan: ['(−4, −3)', '(3, −4)', '(−4, 3)', '(4, 3)', '(4, −3)'],
    benar: 3,
    langkah: [
      'Misalkan titik awalnya P(a, b). Rotasi 90° berlawanan arah jarum jam memetakan (a, b) ke (−b, a).',
      'Karena bayangannya (−3, 4), diperoleh −b = −3 dan a = 4, sehingga b = 3 dan a = 4: P(4, 3).',
      {
        teks: 'Cara lain: batalkan rotasinya dengan memutar (−3, 4) sebesar 90° SEARAH jarum jam, (u, v) → (v, −u): (−3, 4) → (4, 3), sama. Sebagai pemeriksaan, (4, 3) → (−3, 4), seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[4, 3]], bayangan: [[-3, 4]], labelBangun: ['P(4, 3)'], labelBayangan: ["P′(−3, 4)"], pusat: [0, 0], panah: true, jangkauan: [-5, 5, -5, 5] },
      },
      'Jadi, koordinat P adalah (4, 3). (Jawaban D)',
    ],
    jebakan: 'Pilihan C, (−4, 3), memutar (−3, 4) sekali lagi MAJU (berlawanan arah jarum jam) alih-alih membatalkannya. Pilihan A, (−4, −3), adalah rotasi 180° dari jawaban, hasil membalik tanda setelah menukar. Pilihan E, (4, −3), salah tanda pada ordinat.',
    alasan: '(a, b) → (−b, a) = (−3, 4) memberi a = 4, b = 3.',
  },
  {
    // cek: 5 - 3 === 2 && 1 + 2 === 3
    id: 'tg-x15',
    tingkat: 'sangat sulit',
    pertanyaan: 'Titik P ditranslasikan oleh (3, −2), lalu hasilnya dicerminkan pada garis y = x, dan peta akhirnya (1, 5). Koordinat P adalah…',
    gambar: { jenis: 'bidang', bangun: [[1, 5]], labelBangun: ["P″(1, 5)"], cermin: 'y=x', jangkauan: [-1, 7, -1, 7] },
    pilihan: ['(2, 3)', '(4, 3)', '(−2, 7)', '(8, −1)', '(3, 2)'],
    benar: 0,
    langkah: [
      'Misalkan titik awalnya P(a, b). Buat skema maju: P(a, b) → [translasi (3, −2)] → (a + 3, b − 2) → [cermin y = x] → (b − 2, a + 3).',
      'Karena peta akhirnya (1, 5), diperoleh b − 2 = 1 dan a + 3 = 5, sehingga b = 3 dan a = 2: P(2, 3).',
      {
        teks: 'Cara lain, bekerja mundur dari (1, 5): batalkan cermin (tukar kembali) menjadi (5, 1), lalu batalkan translasi dengan mengurangkan (3, −2): (5 − 3, 1 + 2) = (2, 3), sama. Pemeriksaan maju: (2, 3) → (5, 1) → (1, 5), seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[2, 3], [5, 1]], bayangan: [[5, 1], [1, 5]], labelBangun: ['P(2, 3)', "P′(5, 1)"], labelBayangan: ["P′", "P″(1, 5)"], cermin: 'y=x', panah: true, jangkauan: [-1, 7, -1, 7] },
      },
      'Jadi, koordinat P adalah (2, 3). (Jawaban A)',
    ],
    jebakan: 'Pilihan D, (8, −1), membatalkan translasi dengan MENAMBAHKAN (3, −2) lagi alih-alih mengurangkannya. Pilihan C, (−2, 7), mengurangkan translasi dari (1, 5) tanpa membatalkan cermin dulu. Pilihan E, (3, 2), menukar hasil akhir.',
    alasan: 'Mundur: (1, 5) → (5, 1) → (2, 3).',
  },
]

/**
 * Paket kuis bab: 10 soal yang konsepnya diajarkan materi bab ini, dengan
 * materi asalnya (ARYA 20 Sep 2026). Dikurasi dengan membaca soal dan
 * bacaan materinya; soal bank lain tetap di menu Latihan. Urutan soal dan
 * pilihannya diacak di peramban. Pemeriksa: `node alat/cek_kuis_bab.mjs`.
 */
export const KUIS_BAB: ButirKuisBab[] = [
  { id: 'tg-s05', materi: 'cermin-garis-lurus' },
  { id: 'tg-s06', materi: 'cermin-garis-miring' },
  { id: 'tg-l07', materi: 'cermin-titik' },
  { id: 'tg-s11', materi: 'translasi' },
  { id: 'tg-s08', materi: 'rotasi' },
  { id: 'tg-s10', materi: 'dilatasi' },
  { id: 'tg-luas-dilatasi', materi: 'yang-tetap' },
  { id: 'tg-s16', materi: 'matriks-secukupnya' },
  { id: 'tg-x12', materi: 'matriks-transformasi' },
  { id: 'tg-komposisi-cermin-translasi', materi: 'komposisi' },
]
