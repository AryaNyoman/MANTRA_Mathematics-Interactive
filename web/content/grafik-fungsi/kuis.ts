/**
 * Bank soal latihan Grafik Fungsi: 60 soal, 15 tiap tingkat.
 *
 * 14 Sep 2026: seluruh pembahasan ditulis ulang meniru cara mathcyber1997
 * (catatan belajar `PELAJARI BENTUK SOAL MATEMATIKA/CATATAN-BELAJAR-PEMBAHASAN.md`
 * bagian 4.9): "Karena f(x) = 2x² − 4x + 5, berarti a = 2, b = −4, c = 5."
 * lalu "Absis titik balik dinyatakan oleh x_p = −b/(2a) = ..." dan
 * "Substitusikan x = 1 pada f(x) sehingga diperoleh y_p = ..."; titik yang
 * dilalui diperiksa satu per satu; syarat ganda diiriskan dengan garis
 * bilangan; pernyataan diperiksa satu per satu; penutup "Jadi, ... (Jawaban
 * A)". Gambar bantu: parabola dengan titik balik hasil hitungan, garis
 * bilangan irisan syarat, grafik asal dan hasil geseran berdampingan.
 *
 * Id soal lama dipertahankan. Delapan soal terlalu tipis atau kembar diganti
 * jenis yang belum ada (pola mathcyber1997, ditulis sendiri): gf-m14 dan
 * gf-m09 jadi gf-m16 (titik yang dilalui diperiksa satu per satu) dan gf-m17
 * (persamaan dari geseran titik balik); gf-s06 dan gf-s14 jadi gf-s16 (puncak
 * (m, m)) dan gf-s17 (daerah hasil pada domain terbatas); gf-t13 dan gf-t14
 * jadi gf-t16 (parabola dengan titik balik sama) dan gf-t17 (dua akar positif,
 * tiga syarat); gf-x10 dan gf-x11 jadi gf-x18 (pernyataan benar/salah) dan
 * gf-x19 (parabola menyinggung garis). Jawaban benar semula SEMUA di pilihan
 * A; sekarang disebar oleh `alat/acak_pilihan.mjs`.
 *
 * Tiap jawaban berangka punya `// cek:` yang dijalankan `alat/cek_kuis.mjs`;
 * `--ketat` juga memeriksa gaya pembahasannya.
 */
export type { TingkatKuis, SoalKuis } from '@/content/tipe'
import type { ButirKuisBab, SoalKuis } from '@/content/tipe'

export const KUIS: SoalKuis[] = [
  // ================================================================ MUDAH
  {
    id: 'gf-m01',
    tingkat: 'mudah',
    pertanyaan: 'Pada grafik jarak terhadap waktu, bagian garis yang MENDATAR menunjukkan benda itu sedang…',
    gambar: { jenis: 'grafik', fungsi: ['x < 2 ? 2*x : x < 4 ? 4 : 4 + (x - 4)*1.5'], jangkauan: [0, 6, 0, 8], nama: ['jarak (km) terhadap waktu (menit)'] },
    pilihan: ['berhenti', 'bergerak dengan kecepatan tetap', 'berbalik arah', 'bergerak paling cepat', 'melaju di jalan datar'],
    benar: 0,
    langkah: [
      'Ingat bahwa pada grafik jarak terhadap waktu, sumbu tegak menyatakan jarak dan sumbu mendatar menyatakan waktu, sehingga kemiringan garis menyatakan kecepatan (jarak dibagi waktu).',
      {
        teks: 'Bagian garis yang mendatar mempunyai kemiringan 0: waktu terus berjalan (dari menit ke-2 sampai ke-4) tetapi jaraknya tetap 4 km, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x < 2 ? 2*x : x < 4 ? 4 : 4 + (x - 4)*1.5'], jangkauan: [0, 6, 0, 8], arsir: [{ dari: 2, sampai: 4, label: 'jarak tetap' }], datar: [4], nama: ['jarak (km) terhadap waktu (menit)'] },
      },
      'Jarak yang tidak bertambah berarti benda tidak berpindah: benda sedang berhenti.',
      'Jadi, bagian garis yang mendatar menunjukkan benda sedang berhenti. (Jawaban A)',
    ],
    jebakan: 'Pilihan E, melaju di jalan datar, membaca grafik seolah gambar lintasan jalan; grafik ini menyatakan jarak, bukan bentuk jalan. Pilihan B, kecepatan tetap, memang menghasilkan garis lurus, tetapi garis lurus yang MIRING, bukan mendatar.',
    alasan: 'Kemiringan = kecepatan; garis datar berarti kecepatan 0.',
  },
  {
    id: 'gf-m02',
    tingkat: 'mudah',
    pertanyaan: 'Yang BUKAN grafik sebuah fungsi adalah…',
    pilihan: ['garis lurus miring', 'parabola terbuka ke atas', 'lingkaran', 'grafik tangga', 'kurva sinus'],
    benar: 2,
    langkah: [
      'Ingat bahwa suatu kurva adalah grafik fungsi bila setiap nilai x memberi TEPAT SATU nilai y; secara gambar, setiap garis tegak memotong kurva paling banyak satu kali (uji garis tegak).',
      'Periksa lingkaran: garis tegak yang melalui bagian tengahnya memotong lingkaran di dua titik (atas dan bawah), sehingga satu x memberi dua y. Lingkaran gagal uji garis tegak.',
      'Garis miring, parabola terbuka ke atas, grafik tangga, dan kurva sinus semuanya dipotong setiap garis tegak paling banyak sekali, sehingga ketiganya grafik fungsi.',
      'Jadi, yang bukan grafik fungsi adalah lingkaran. (Jawaban C)',
    ],
    jebakan: 'Pilihan D, grafik tangga, tampak benar karena tampak "putus-putus", tetapi tiap x tetap punya satu y (lompatannya tidak memberi dua nilai di x yang sama). Pilihan E, kurva sinus, tampak benar karena berulang, tetapi tiap x tetap satu y.',
    alasan: 'Lingkaran gagal uji garis tegak: satu x memberi dua y.',
  },
  {
    // cek: 4 === 4 && 1 === 1
    id: 'gf-m03',
    tingkat: 'mudah',
    pertanyaan: 'Koordinat puncak grafik y = (x − 4)² + 1 adalah…',
    gambar: { jenis: 'grafik', fungsi: ['(x - 4)*(x - 4) + 1'], jangkauan: [0, 8, -1, 8] },
    pilihan: ['(−4, 1)', '(1, 4)', '(4, 1)', '(4, −1)', '(−4, −1)'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa persamaannya sudah dalam bentuk puncak y = a(x − p)² + q, yang titik puncaknya (p, q).',
      'Di sini (x − 4)² menunjukkan p = 4 (tandanya berlawanan dengan yang tertulis di dalam kurung) dan +1 menunjukkan q = 1, sehingga puncaknya (4, 1).',
      {
        teks: 'Alasannya, (x − 4)² bernilai paling kecil, yaitu 0, tepat saat x = 4, dan saat itu y = 0 + 1 = 1; untuk x lain nilainya lebih besar, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['(x - 4)*(x - 4) + 1'], jangkauan: [0, 8, -1, 8], titik: [{ x: 4, y: 1, label: '(4, 1)' }], tegak: [4], datar: [1] },
      },
      'Jadi, koordinat puncaknya adalah (4, 1). (Jawaban C)',
    ],
    jebakan: 'Pilihan A, (−4, 1), menyalin tanda di dalam kurung; (x − 4)² nol saat x = +4, bukan −4. Pilihan D, (4, −1), membalik tanda konstanta di luar kurung, padahal tanda itu tidak berubah.',
    alasan: 'Bentuk puncak y = (x − p)² + q: puncak (p, q) = (4, 1).',
  },
  {
    id: 'gf-m04',
    tingkat: 'mudah',
    pertanyaan: 'Grafik y = −2(x + 1)² + 5 terbuka ke arah mana, dan puncaknya titik apa?',
    gambar: { jenis: 'grafik', fungsi: ['-2*(x + 1)*(x + 1) + 5'], jangkauan: [-4, 2, -6, 7] },
    pilihan: ['ke atas, puncaknya titik terendah', 'ke bawah, puncaknya titik terendah', 'ke atas, puncaknya titik tertinggi', 'ke samping, tidak punya puncak', 'ke bawah, puncaknya titik tertinggi'],
    benar: 4,
    langkah: [
      'Perhatikan bentuk puncak y = a(x − p)² + q dengan a = −2, p = −1, dan q = 5.',
      'Karena a = −2 negatif, parabola terbuka ke BAWAH: (x + 1)² selalu ≥ 0, dikalikan −2 menjadi ≤ 0, sehingga y ≤ 5 untuk semua x.',
      {
        teks: 'Nilai terbesar y = 5 tercapai saat x = −1, sehingga puncak (−1, 5) adalah titik TERTINGGI grafik, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['-2*(x + 1)*(x + 1) + 5'], jangkauan: [-4, 2, -6, 7], titik: [{ x: -1, y: 5, label: '(-1, 5)' }], datar: [5] },
      },
      'Jadi, grafiknya terbuka ke bawah dan puncaknya titik tertinggi. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, ke bawah dengan puncak terendah, bertentangan dengan dirinya sendiri: parabola yang terbuka ke bawah selalu berpuncak di atas. Pilihan C membaca a = 2 tanpa tanda negatifnya.',
    alasan: 'a = −2 < 0: terbuka ke bawah, puncak (−1, 5) tertinggi.',
  },
  {
    // cek: 0*0 - 5*0 + 6 === 6
    id: 'gf-m05',
    tingkat: 'mudah',
    pertanyaan: 'Grafik y = x² − 5x + 6 memotong sumbu-y di titik…',
    gambar: { jenis: 'grafik', fungsi: ['x*x - 5*x + 6'], jangkauan: [-1, 6, -2, 8] },
    pilihan: ['(6, 0)', '(0, 6)', '(0, −5)', '(0, 1)', '(2, 0)'],
    benar: 1,
    langkah: [
      'Ingat bahwa setiap titik pada sumbu-y mempunyai absis x = 0, sehingga titik potong dengan sumbu-y diperoleh dengan mensubstitusikan x = 0.',
      'Substitusikan x = 0: y = 0² − 5(0) + 6 = 6, sehingga titik potongnya (0, 6). Secara umum, y = ax² + bx + c memotong sumbu-y di (0, c).',
      {
        teks: 'Pada gambar, parabola memotong sumbu tegak setinggi 6.',
        gambar: { jenis: 'grafik', fungsi: ['x*x - 5*x + 6'], jangkauan: [-1, 6, -2, 8], titik: [{ x: 0, y: 6, label: '(0, 6)' }] },
      },
      'Jadi, grafik memotong sumbu-y di titik (0, 6). (Jawaban B)',
    ],
    jebakan: 'Pilihan A, (6, 0), menukar koordinat; titik (6, 0) ada di sumbu-x, dan f(6) = 12 ≠ 0. Pilihan E, (2, 0), adalah salah satu titik potong dengan sumbu-X. Pilihan C menyalin koefisien b.',
    alasan: 'x = 0 memberi y = c = 6: titik (0, 6).',
  },
  {
    // cek: 3 * 3 ** 3 === 81
    id: 'gf-m06',
    tingkat: 'mudah',
    pertanyaan: 'Sebuah virus menular tiga kali lipat tiap fase. Jika pada fase pertama ada 3 orang tertular, banyak yang tertular pada fase keempat adalah…',
    gambar: { jenis: 'batang', kategori: ['fase 1', 'fase 2', 'fase 3'], nilai: [3, 9, 27], satuan: 'orang' },
    pilihan: ['12 orang', '81 orang', '27 orang', '9 orang', '243 orang'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa "tiga kali lipat tiap fase" berarti pertumbuhan EKSPONEN: banyaknya dikalikan 3 setiap fase, bukan ditambah 3.',
      {
        teks: 'Lengkapi tabel fase demi fase: fase 1 ada 3, fase 2 ada 3 × 3 = 9, fase 3 ada 9 × 3 = 27, fase 4 ada 27 × 3 = 81.',
        gambar: { jenis: 'tabel', kepala: ['Fase', 'Tertular', 'Rumus'], baris: [['1', '3', '3'], ['2', '9', '3 × 3'], ['3', '27', '3 × 3²'], ['4', '81', '3 × 3³']], kolomBaru: [2], sorot: [3] },
      },
      'Secara umum, pada fase ke-n banyaknya adalah f(n) = 3 × 3ⁿ⁻¹ = 3ⁿ, sehingga f(4) = 3⁴ = 81.',
      'Jadi, banyak yang tertular pada fase keempat adalah 81 orang. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 12 orang, menambah 3 tiap fase (pertumbuhan linear), padahal "tiga kali lipat" berarti dikalikan. Pilihan E, 243 orang, adalah fase kelima (3⁵), kelebihan satu kali pengalian. Pilihan C, 27, fase ketiga.',
    alasan: 'Dikali 3 tiap fase: 3, 9, 27, 81.',
  },
  {
    // cek: 2 ** 5 === 32
    id: 'gf-m07',
    tingkat: 'mudah',
    pertanyaan: 'Nilai dari ²log 32 adalah…',
    pilihan: ['16', '5', '6', '4', '64'],
    benar: 1,
    langkah: [
      'Ingat definisi logaritma: ᵃlog b = c berarti aᶜ = b. Dengan demikian, ²log 32 menanyakan "2 dipangkatkan berapa supaya menjadi 32".',
      'Tulis 32 sebagai pangkat dari 2: 32 = 2 × 2 × 2 × 2 × 2 = 2⁵.',
      'Untuk itu, ²log 32 = ²log 2⁵ = 5.',
      'Jadi, nilai dari ²log 32 adalah 5. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 16, membagi 32 dengan 2 seolah logaritma adalah pembagian. Pilihan D, 4, salah menghitung 2⁴ = 16 sebagai 32. Pilihan E, 64, mengalikan 32 dengan 2.',
    alasan: '32 = 2⁵, jadi ²log 32 = 5.',
  },
  {
    // cek: !Number.isFinite(1/0) && Number.isFinite(1/1) && Number.isFinite(1/-1)
    id: 'gf-m08',
    tingkat: 'mudah',
    pertanyaan: 'Grafik y = 1/x tidak mempunyai nilai pada x = …',
    gambar: { jenis: 'grafik', fungsi: ['1/x'], jangkauan: [-4, 4, -4, 4] },
    pilihan: ['1', '−1', '0', 'tidak ada, semua x boleh', '1 dan −1'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa y = 1/x adalah pecahan dengan penyebut x, dan pembagian dengan nol tidak terdefinisi.',
      {
        teks: 'Untuk x = 0, nilai 1/0 tidak ada, sehingga x = 0 dikeluarkan dari daerah asal. Makin dekat x ke 0, nilai 1/x makin besar tanpa batas: (1, 1), (0,5; 2), (0,25; 4), dan seterusnya, sehingga kurva melesat menjauh dari sumbu-y tanpa pernah menyentuhnya, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['1/x'], jangkauan: [-4, 4, -4, 4], titik: [{ x: 1, y: 1, label: '(1, 1)' }, { x: 0.5, y: 2, label: '(0,5; 2)' }, { x: 0.25, y: 4, label: '(0,25; 4)' }, { x: -1, y: -1, label: '(-1, -1)' }, { x: -0.5, y: -2, label: '(-0,5; -2)' }] },
      },
      'Untuk x = 1 dan x = −1 nilainya ada, yaitu 1 dan −1.',
      'Jadi, grafik y = 1/x tidak mempunyai nilai pada x = 0. (Jawaban C)',
    ],
    jebakan: 'Pilihan E, 1 dan −1, tampak benar karena grafiknya "berbelok" di sekitar sana, tetapi f(1) = 1 dan f(−1) = −1 terdefinisi. Pilihan D lupa bahwa penyebut tidak boleh nol.',
    alasan: 'Penyebut x tidak boleh 0.',
  },
  {
    // cek: 2*2 - 3*2 + 1 === -1
    id: 'gf-m16',
    tingkat: 'mudah',
    pertanyaan: 'Titik yang dilalui grafik y = x² − 3x + 1 adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x - 3*x + 1'], jangkauan: [-2, 5, -3, 6] },
    pilihan: ['(2, −1)', '(1, 1)', '(0, −1)', '(3, 2)', '(−1, 3)'],
    benar: 0,
    langkah: [
      'Sebuah titik dilalui grafik bila koordinatnya memenuhi persamaannya: substitusikan absisnya, lalu bandingkan hasilnya dengan ordinatnya. Periksa satu per satu.',
      {
        teks: 'Periksa tiap titik dengan tabel: hanya (2, −1) yang hasil substitusinya cocok.',
        gambar: { jenis: 'tabel', kepala: ['Titik', 'f(absis)', 'Cocok?'], baris: [['(2, −1)', '4 − 6 + 1 = −1', 'ya'], ['(1, 1)', '1 − 3 + 1 = −1', 'tidak'], ['(0, −1)', '0 − 0 + 1 = 1', 'tidak'], ['(3, 2)', '9 − 9 + 1 = 1', 'tidak'], ['(−1, 3)', '1 + 3 + 1 = 5', 'tidak']], kolomBaru: [1, 2], sorot: [0] },
      },
      {
        teks: 'Pada gambar, titik (2, −1) berada tepat pada parabola.',
        gambar: { jenis: 'grafik', fungsi: ['x*x - 3*x + 1'], jangkauan: [-2, 5, -3, 6], titik: [{ x: 2, y: -1, label: '(2, -1)' }] },
      },
      'Jadi, titik yang dilalui grafik adalah (2, −1). (Jawaban A)',
    ],
    jebakan: 'Pilihan C, (0, −1), tampak benar karena konstanta persamaannya 1 dan mudah salah tanda; f(0) = +1, sehingga titik potong sumbu-y adalah (0, 1). Pilihan B, (1, 1), salah menghitung 1 − 3 + 1.',
    alasan: 'f(2) = 4 − 6 + 1 = −1, cocok; titik lain tidak.',
  },
  {
    id: 'gf-m10',
    tingkat: 'mudah',
    pertanyaan: 'Grafik y = x² lolos uji garis tegak. Artinya…',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-3, 3, -1, 8], tegak: [1.5] },
    pilihan: ['grafiknya berdiri tegak', 'setiap garis tegak memotong grafik paling banyak satu kali, jadi tiap x punya satu y', 'grafiknya simetris terhadap sumbu-y', 'setiap y punya tepat satu x', 'grafiknya tidak pernah turun'],
    benar: 1,
    langkah: [
      'Uji garis tegak adalah cara menguji apakah sebuah kurva merupakan grafik fungsi: tarik garis-garis tegak (sejajar sumbu-y) dan lihat berapa kali tiap garis memotong kurva.',
      {
        teks: 'Pada y = x², garis tegak mana pun (misalnya x = 1,5) memotong parabola tepat satu kali, seperti gambar berikut. Artinya, setiap x hanya berpasangan dengan satu y, syarat sebuah fungsi.',
        gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-3, 3, -1, 8], tegak: [1.5, -2], titik: [{ x: 1.5, y: 2.25, label: 'satu titik potong' }, { x: -2, y: 4 }] },
      },
      'Uji ini tidak berbicara tentang y: nilai y = 4 dicapai oleh dua x (2 dan −2), dan itu tidak melanggar syarat fungsi.',
      'Jadi, lolos uji garis tegak berarti setiap garis tegak memotong grafik paling banyak satu kali, sehingga tiap x punya satu y. (Jawaban B)',
    ],
    jebakan: 'Pilihan D, setiap y punya tepat satu x, adalah syarat fungsi SATU-SATU (uji garis mendatar), yang malah gagal pada y = x². Pilihan C, simetris, memang benar untuk y = x² tetapi bukan arti uji garis tegak.',
    alasan: 'Uji garis tegak = tiap x satu y (definisi fungsi).',
  },
  {
    // cek: 0 === 0 && -3 === -3
    id: 'gf-m11',
    tingkat: 'mudah',
    pertanyaan: 'Puncak grafik y = x² − 3 berada di titik…',
    gambar: { jenis: 'grafik', fungsi: ['x*x - 3'], jangkauan: [-3, 3, -4, 6] },
    pilihan: ['(0, −3)', '(−3, 0)', '(3, 0)', '(0, 3)', '(−3, −3)'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa y = x² − 3 adalah bentuk puncak a(x − p)² + q dengan a = 1, p = 0, dan q = −3; grafiknya adalah y = x² yang digeser 3 satuan ke bawah.',
      'Nilai x² paling kecil adalah 0, tercapai saat x = 0, dan saat itu y = 0 − 3 = −3.',
      {
        teks: 'Dengan demikian, puncaknya (0, −3), titik terendah parabola, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x - 3'], jangkauan: [-3, 3, -4, 6], titik: [{ x: 0, y: -3, label: '(0, -3)' }], datar: [-3] },
      },
      'Jadi, puncak grafik y = x² − 3 berada di titik (0, −3). (Jawaban A)',
    ],
    jebakan: 'Pilihan B, (−3, 0), mengira angka −3 menggeser ke kiri; geseran mendatar muncul di dalam kuadrat, (x + 3)². Pilihan D, (0, 3), salah tanda.',
    alasan: 'y = x² digeser 3 ke bawah: puncak (0, −3).',
  },
  {
    // cek: 2 ** 3 === 8
    id: 'gf-m12',
    tingkat: 'mudah',
    pertanyaan: 'Pada fungsi y = 2ˣ, nilai y saat x = 3 adalah…',
    gambar: { jenis: 'grafik', fungsi: ['2 ** x'], jangkauan: [-2, 4, -1, 10] },
    pilihan: ['6', '9', '8', '5', '3'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa pada y = 2ˣ peubah x berada di PANGKAT: 2ˣ berarti 2 dikalikan dengan dirinya sebanyak x kali.',
      'Substitusikan x = 3: y = 2³ = 2 × 2 × 2 = 8.',
      {
        teks: 'Pada gambar, titik (3, 8) berada pada kurva eksponen yang menanjak makin curam.',
        gambar: { jenis: 'grafik', fungsi: ['2 ** x'], jangkauan: [-2, 4, -1, 10], titik: [{ x: 3, y: 8, label: '(3, 8)' }] },
      },
      'Jadi, nilai y saat x = 3 adalah 8. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 6, mengalikan 2 dengan 3 (2 · x), bukan memangkatkan. Pilihan B, 9, menghitung 3², menukar alas dan pangkat. Pilihan D, 5, menjumlahkan 2 + 3.',
    alasan: '2³ = 8.',
  },
  {
    // cek: 0 + 2 === 2
    id: 'gf-m13',
    tingkat: 'mudah',
    pertanyaan: 'Garis y = x + 2 memotong sumbu-y di titik…',
    gambar: { jenis: 'grafik', fungsi: ['x + 2'], jangkauan: [-4, 3, -2, 5] },
    pilihan: ['(2, 0)', '(−2, 0)', '(0, −2)', '(1, 3)', '(0, 2)'],
    benar: 4,
    langkah: [
      'Titik potong dengan sumbu-y mempunyai absis x = 0. Substitusikan x = 0: y = 0 + 2 = 2, sehingga titik potongnya (0, 2).',
      {
        teks: 'Sebagai pembanding, titik potong dengan sumbu-X diperoleh dari y = 0: x + 2 = 0, x = −2, yaitu (−2, 0), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x + 2'], jangkauan: [-4, 3, -2, 5], titik: [{ x: 0, y: 2, label: '(0, 2)' }, { x: -2, y: 0, label: '(-2, 0)' }] },
      },
      'Jadi, garis y = x + 2 memotong sumbu-y di titik (0, 2). (Jawaban E)',
    ],
    jebakan: 'Pilihan B, (−2, 0), adalah titik potong dengan sumbu-X, bukan sumbu-y. Pilihan A, (2, 0), menukar koordinat. Pilihan D, (1, 3), memang pada garis tetapi bukan pada sumbu-y.',
    alasan: 'x = 0 memberi y = 2: (0, 2).',
  },
  {
    // cek: (2 - 2)**2 - 3 === -3
    id: 'gf-m17',
    tingkat: 'mudah',
    pertanyaan: 'Grafik y = x² digeser sehingga puncaknya berpindah ke (2, −3). Persamaan grafik hasil geserannya adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-3, 6, -5, 8], titik: [{ x: 2, y: -3, label: 'puncak baru (2, -3)' }] },
    pilihan: ['y = (x + 2)² − 3', 'y = (x − 2)² + 3', 'y = (x + 2)² + 3', 'y = x² − 3', 'y = (x − 2)² − 3'],
    benar: 4,
    langkah: [
      'Ingat bahwa pergeseran grafik parabola dapat dipandang sebagai pergeseran titik baliknya: y = x² berpuncak di (0, 0), dan bentuk puncak y = (x − p)² + q berpuncak di (p, q).',
      'Puncak baru (2, −3) berarti p = 2 dan q = −3: grafik digeser 2 satuan ke kanan dan 3 satuan ke bawah.',
      {
        teks: 'Dengan demikian, persamaannya y = (x − 2)² − 3, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x', '(x - 2)*(x - 2) - 3'], jangkauan: [-3, 6, -5, 8], titik: [{ x: 0, y: 0, label: '(0, 0)' }, { x: 2, y: -3, label: '(2, -3)' }], nama: ['y = x²', 'y = (x − 2)² − 3'] },
      },
      'Jadi, persamaan grafik hasil geserannya adalah y = (x − 2)² − 3. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, y = (x + 2)² − 3, menulis geseran ke kanan dengan tanda plus; (x + 2)² berpuncak di x = −2. Pilihan B salah tanda geseran tegak. Pilihan D hanya menggeser ke bawah tanpa ke kanan.',
    alasan: 'Puncak (p, q) = (2, −3): y = (x − 2)² − 3.',
  },
  {
    // cek: 0*0 === 0 && (-2)*(-2) > 0
    id: 'gf-m15',
    tingkat: 'mudah',
    pertanyaan: 'Daerah hasil (range) fungsi y = x² adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-3, 3, -2, 8] },
    pilihan: ['y ≥ 0', 'semua bilangan real', 'y > 0', 'x ≥ 0', 'y ≤ 0'],
    benar: 0,
    langkah: [
      'Daerah hasil adalah himpunan semua nilai y yang mungkin dicapai fungsi.',
      'Perhatikan bahwa kuadrat bilangan real tidak pernah negatif: x² ≥ 0 untuk semua x, dan nilai 0 memang tercapai saat x = 0.',
      {
        teks: 'Setiap bilangan y ≥ 0 tercapai (y = 4 tercapai oleh x = 2), sedangkan y negatif tidak pernah tercapai; pada gambar seluruh kurva berada pada atau di atas sumbu-x.',
        gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-3, 3, -2, 8], titik: [{ x: 0, y: 0, label: '(0, 0)' }] },
      },
      'Jadi, daerah hasil fungsi y = x² adalah y ≥ 0. (Jawaban A)',
    ],
    jebakan: 'Pilihan C, y > 0, melupakan nilai 0 yang tercapai di x = 0. Pilihan D, x ≥ 0, keliru menyebut peubah: daerah hasil berisi nilai y, sedangkan x boleh negatif (daerah asalnya semua bilangan real).',
    alasan: 'x² ≥ 0 dan 0 tercapai: range y ≥ 0.',
  },
  // =============================================================== SEDANG
  {
    // cek: -(-8)/(2*2) === 2
    id: 'gf-s01',
    tingkat: 'sedang',
    pertanyaan: 'Sumbu simetri grafik y = 2x² − 8x + 3 adalah garis…',
    pilihan: ['x = 2', 'x = −2', 'x = 4', 'x = −4', 'x = 8'],
    benar: 0,
    langkah: [
      'Karena y = 2x² − 8x + 3, berarti a = 2, b = −8, c = 3.',
      'Sumbu simetri parabola adalah garis tegak yang melalui titik baliknya, dengan persamaan x = −b/(2a).',
      'Substitusikan: x = −(−8)/(2 · 2) = 8/4 = 2. Ordinat titik baliknya y = 2(2)² − 8(2) + 3 = 8 − 16 + 3 = −5.',
      {
        teks: 'Perhatikan sketsa berikut: garis x = 2 membagi parabola menjadi dua bagian yang saling mencerminkan, dan titik balik (2, −5) terletak pada garis itu.',
        gambar: { jenis: 'grafik', fungsi: ['2*x*x - 8*x + 3'], jangkauan: [-2, 6, -6, 6], tegak: [2], titik: [{ x: 2, y: -5, label: '(2, -5)' }] },
      },
      'Jadi, sumbu simetri grafik adalah garis x = 2. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, x = −2, lupa tanda negatif pada rumus −b/(2a): −(−8) = +8. Pilihan C, x = 4, menghitung −b/a tanpa membagi 2. Pilihan E, x = 8, mengambil −b saja.',
    alasan: 'x = −b/(2a) = 8/4 = 2.',
  },
  {
    // cek: (-6)**2 - 4*1*9 === 0
    id: 'gf-s02',
    tingkat: 'sedang',
    pertanyaan: 'Diskriminan y = x² − 6x + 9 bernilai 0. Arti bagi grafiknya adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x - 6*x + 9'], jangkauan: [-1, 7, -1, 8] },
    pilihan: ['memotong sumbu-X di dua titik', 'tidak menyentuh sumbu-X sama sekali', 'grafiknya tidak ada', 'menyinggung sumbu-X di satu titik', 'grafiknya berupa garis lurus'],
    benar: 3,
    langkah: [
      'Ingat bahwa diskriminan D = b² − 4ac menentukan banyaknya titik potong grafik dengan sumbu-X: D > 0 dua titik, D = 0 tepat satu titik (menyinggung), dan D < 0 tidak ada.',
      'Karena y = x² − 6x + 9, berarti a = 1, b = −6, c = 9, sehingga D = (−6)² − 4(1)(9) = 36 − 36 = 0.',
      'Pemeriksaan: x² − 6x + 9 = (x − 3)², bernilai 0 hanya di x = 3 dan positif di tempat lain, sehingga grafik hanya menyentuh sumbu-X di (3, 0).',
      {
        teks: 'Perhatikan sketsa berikut: puncak parabola tepat menempel pada sumbu-X.',
        gambar: { jenis: 'grafik', fungsi: ['x*x - 6*x + 9'], jangkauan: [-1, 7, -1, 8], titik: [{ x: 3, y: 0, label: 'menyinggung di (3, 0)' }], tegak: [3] },
      },
      'Jadi, D = 0 berarti grafik menyinggung sumbu-X di satu titik. (Jawaban D)',
    ],
    jebakan: 'Pilihan B, tidak menyentuh sumbu-X, adalah arti D < 0. Pilihan A, dua titik potong, adalah arti D > 0. Pilihan C keliru: grafik fungsi kuadrat selalu ada; D hanya mengatur letaknya terhadap sumbu-X.',
    alasan: 'D = 0: satu titik potong, yaitu menyinggung.',
  },
  {
    // cek: (-3 + 3) * (-3 - 5) === 0 && (5 + 3) * (5 - 5) === 0
    id: 'gf-s03',
    tingkat: 'sedang',
    pertanyaan: 'Sebuah parabola memotong sumbu-X di x = −3 dan x = 5. Bentuk faktornya adalah…',
    gambar: { jenis: 'grafik', fungsi: ['0.5*(x + 3)*(x - 5)'], jangkauan: [-5, 7, -9, 4], titik: [{ x: -3, y: 0, label: '-3' }, { x: 5, y: 0, label: '5' }] },
    pilihan: ['y = a(x − 3)(x + 5)', 'y = a(x + 3)(x + 5)', 'y = a(x − 3)(x − 5)', 'y = a(x + 3)(x − 5)', 'y = a(x + 8)'],
    benar: 3,
    langkah: [
      'Ingat bahwa bila parabola memotong sumbu-X di x = x₁ dan x = x₂, persamaannya dapat ditulis y = a(x − x₁)(x − x₂) dengan a ≠ 0.',
      'Di sini x₁ = −3 dan x₂ = 5, sehingga x − x₁ = x − (−3) = x + 3 dan x − x₂ = x − 5.',
      'Dengan demikian, y = a(x + 3)(x − 5).',
      {
        teks: 'Pemeriksaan: substitusi x = −3 dan x = 5 masing-masing membuat salah satu faktor nol, sehingga y = 0 di kedua titik itu.',
        gambar: { jenis: 'tabel', kepala: ['x', 'x + 3', 'x − 5', 'y = a(x + 3)(x − 5)'], baris: [['−3', '0', '−8', 'a · 0 · (−8) = 0'], ['5', '8', '0', 'a · 8 · 0 = 0']], kolomBaru: [1, 2, 3] },
      },
      'Jadi, bentuk faktornya adalah y = a(x + 3)(x − 5). (Jawaban D)',
    ],
    jebakan: 'Pilihan A, y = a(x − 3)(x + 5), menyalin tanda pembuat nol apa adanya; faktor dari x = −3 adalah (x + 3), tandanya berlawanan. Pilihan C berpembuat nol x = 3 dan x = 5. Pilihan E bukan fungsi kuadrat.',
    alasan: 'Pembuat nol −3 dan 5: faktor (x + 3)(x − 5).',
  },
  {
    // cek: (-2 + 2) ** 2 === 0
    id: 'gf-s04',
    tingkat: 'sedang',
    pertanyaan: 'Grafik y = f(x + 2) adalah grafik y = f(x) yang digeser…',
    pilihan: ['2 satuan ke kanan', '2 satuan ke atas', '2 satuan ke bawah', '2 satuan ke kiri', 'tidak bergeser, hanya melebar'],
    benar: 3,
    langkah: [
      'Ingat bahwa penggantian x dengan x − h menggeser grafik h satuan ke kanan; penggantian x dengan x + h (h positif) menggeser grafik h satuan ke kiri.',
      'Ambil contoh f(x) = x². Maka f(x + 2) = (x + 2)², yang bernilai 0 saat x = −2, sehingga titik balik (0, 0) berpindah ke (−2, 0).',
      {
        teks: 'Perhatikan sketsa berikut: titik balik bergeser dari x = 0 ke x = −2, yaitu 2 satuan ke kiri, dan seluruh grafik ikut bergeser.',
        gambar: { jenis: 'grafik', fungsi: ['x*x', '(x + 2)*(x + 2)'], jangkauan: [-5, 4, -1, 8], titik: [{ x: 0, y: 0, label: '(0, 0)' }, { x: -2, y: 0, label: '(-2, 0)' }], nama: ['y = f(x)', 'y = f(x + 2)'] },
      },
      'Alasannya, agar f(x + 2) memberi nilai yang sama dengan f(x) di suatu titik, x harus diambil 2 lebih kecil, sehingga setiap titik bergeser ke kiri.',
      'Jadi, grafik y = f(x + 2) adalah grafik y = f(x) yang digeser 2 satuan ke kiri. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 2 satuan ke kanan, mengikuti tanda plus; tanda plus di dalam kurung malah berarti geser ke kiri. Pilihan B, 2 ke atas, adalah arti f(x) + 2, dengan angka di luar f.',
    alasan: 'x → x + 2: geser 2 ke kiri.',
  },
  {
    id: 'gf-s05',
    tingkat: 'sedang',
    pertanyaan: 'Grafik y = −x² diperoleh dari grafik y = x² dengan cara…',
    gambar: { jenis: 'grafik', fungsi: ['x*x', '-x*x'], jangkauan: [-3, 3, -6, 6], nama: ['y = x²', 'y = −x²'] },
    pilihan: ['dicerminkan terhadap sumbu-y', 'digeser ke bawah', 'diregangkan tegak', 'dicerminkan terhadap garis y = x', 'dicerminkan terhadap sumbu-X'],
    benar: 4,
    langkah: [
      'Ingat bahwa y = −f(x) mengganti setiap nilai y dengan lawannya: titik (x, y) menjadi (x, −y). Itulah pencerminan terhadap sumbu-X.',
      'Periksa dengan titik: pada y = x² ada titik (2, 4) dan (−1, 1); pada y = −x² titik itu menjadi (2, −4) dan (−1, −1). Absisnya tetap, ordinatnya berganti tanda.',
      {
        teks: 'Perhatikan sketsa berikut: parabola yang terbuka ke atas dibalik menjadi terbuka ke bawah dengan sumbu-X sebagai cermin.',
        gambar: { jenis: 'grafik', fungsi: ['x*x', '-x*x'], jangkauan: [-3, 3, -6, 6], titik: [{ x: 2, y: 4, label: '(2, 4)' }, { x: 2, y: -4, label: '(2, -4)' }], nama: ['y = x²', 'y = −x²'] },
      },
      'Jadi, grafik y = −x² diperoleh dari y = x² dengan mencerminkannya terhadap sumbu-X. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, cermin terhadap sumbu-y, mengganti x dengan −x: karena (−x)² = x², grafik y = x² tidak berubah sama sekali. Pilihan C, regangan tegak, mengalikan y dengan bilangan positif dan tidak membalik arah bukaan.',
    alasan: 'y → −y: cermin terhadap sumbu-X.',
  },
  {
    // cek: -(-4)/2 === 2 && 2*2 - 4*2 + 6 === 2
    id: 'gf-s16',
    tingkat: 'sedang',
    pertanyaan: 'Grafik fungsi y = x² − 4x + c mempunyai titik balik (m, m). Nilai c adalah…',
    pilihan: ['2', '4', '6', '−2', '8'],
    benar: 2,
    langkah: [
      'Karena y = x² − 4x + c, berarti a = 1, b = −4. Absis titik balik dinyatakan oleh x_p = −b/(2a) = −(−4)/(2 · 1) = 2.',
      'Titik balik (m, m) berarti absis dan ordinatnya sama, sehingga m = x_p = 2 dan ordinatnya juga harus 2.',
      'Substitusikan x = 2 pada persamaan: y_p = 2² − 4(2) + c = 4 − 8 + c = c − 4. Karena y_p = 2, diperoleh c − 4 = 2, sehingga c = 6.',
      {
        teks: 'Pemeriksaan: grafik y = x² − 4x + 6 berpuncak di (2, 2), yang memang terletak pada garis y = x, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x - 4*x + 6', 'x'], jangkauan: [-1, 6, -1, 8], titik: [{ x: 2, y: 2, label: '(2, 2)' }], tegak: [2], datar: [2], nama: ['y = x² − 4x + 6', 'y = x'] },
      },
      'Jadi, nilai c adalah 6. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 2, berhenti di m = 2 dan mengira c = m; c masih harus dihitung dari y_p = 2. Pilihan D, −2, salah tanda saat menyelesaikan c − 4 = 2. Pilihan B, 4, menghitung x_p = −b/a.',
    alasan: 'x_p = 2 = m, lalu f(2) = c − 4 = 2 memberi c = 6.',
  },
  {
    // cek: Math.abs(5000 * 0.8 ** 3 - 2560) < 1e-9
    id: 'gf-s07',
    tingkat: 'sedang',
    pertanyaan: 'Sebuah bola dijatuhkan dari ketinggian 5.000 mm. Tiap pantulan tingginya tinggal 0,8 kali tinggi sebelumnya. Tinggi pantulan ketiga adalah…',
    gambar: { jenis: 'batang', kategori: ['awal', 'pantul 1', 'pantul 2'], nilai: [5000, 4000, 3200], satuan: 'mm' },
    pilihan: ['3.000 mm', '2.000 mm', '2.560 mm', '3.200 mm', '1.024 mm'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa tinggi tiap pantulan diperoleh dengan mengalikan tinggi sebelumnya dengan 0,8, sehingga tinggi pantulan ke-n adalah h(n) = 5.000 × 0,8ⁿ (pertumbuhan eksponen dengan pengali kurang dari 1).',
      {
        teks: 'Hitung berturut-turut: pantulan 1 setinggi 5.000 × 0,8 = 4.000, pantulan 2 setinggi 4.000 × 0,8 = 3.200, dan pantulan 3 setinggi 3.200 × 0,8 = 2.560.',
        gambar: { jenis: 'tabel', kepala: ['Pantulan', 'Hitungan', 'Tinggi (mm)'], baris: [['1', '5.000 × 0,8', '4.000'], ['2', '4.000 × 0,8', '3.200'], ['3', '3.200 × 0,8', '2.560']], kolomBaru: [1, 2], sorot: [2] },
      },
      'Cara 2: langsung h(3) = 5.000 × 0,8³ = 5.000 × 0,512 = 2.560, sama.',
      'Jadi, tinggi pantulan ketiga adalah 2.560 mm. (Jawaban C)',
    ],
    jebakan: 'Pilihan D, 3.200 mm, adalah pantulan kedua (baru dua kali dikalikan 0,8). Pilihan B, 2.000 mm, mengurangi 1.000 tiap pantulan (pola linear), padahal yang hilang adalah 20 persen dari tinggi sebelumnya. Pilihan E, 1.024 mm, mengalikan 0,512 dengan 2.000, bukan 5.000.',
    alasan: '5.000 × 0,8³ = 2.560.',
  },
  {
    // cek: Math.log2(1) === 0 && Number.isNaN(Math.log2(-1))
    id: 'gf-s08',
    tingkat: 'sedang',
    pertanyaan: 'Daerah asal (domain) fungsi y = ²log x adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.log2(x)'], jangkauan: [-1, 9, -4, 4] },
    pilihan: ['x > 0', 'semua bilangan real', 'x ≥ 0', 'x < 0', 'x ≠ 0'],
    benar: 0,
    langkah: [
      'Ingat definisi logaritma: ²log x = y berarti 2ʸ = x. Karena 2ʸ selalu positif untuk setiap y real, bilangan x yang dapat dilogaritmakan hanyalah bilangan positif.',
      'Untuk x = 0, tidak ada y dengan 2ʸ = 0; untuk x negatif juga tidak ada. Keduanya berada di luar daerah asal.',
      {
        teks: 'Perhatikan sketsa berikut: kurva hanya ada di sebelah kanan sumbu-y dan makin mendekati garis x = 0 tanpa menyentuhnya (asimtot tegak).',
        gambar: { jenis: 'grafik', fungsi: ['Math.log2(x)'], jangkauan: [-1, 9, -4, 4], tegak: [0], arsir: [{ dari: 0, sampai: 9, label: 'daerah asal x > 0' }], titik: [{ x: 1, y: 0, label: '(1, 0)' }, { x: 8, y: 3, label: '(8, 3)' }] },
      },
      'Jadi, daerah asal fungsi y = ²log x adalah x > 0. (Jawaban A)',
    ],
    jebakan: 'Pilihan C, x ≥ 0, mengikutkan x = 0, padahal ²log 0 tidak terdefinisi. Pilihan E, x ≠ 0, mengizinkan x negatif, padahal logaritma bilangan negatif tidak ada. Pilihan B menukar daerah asal logaritma dengan daerah asal eksponen.',
    alasan: 'Logaritma hanya untuk bilangan positif.',
  },
  {
    // cek: -3 + 3 === 0
    id: 'gf-s09',
    tingkat: 'sedang',
    pertanyaan: 'Asimtot tegak grafik y = 1/(x + 3) berada di…',
    gambar: { jenis: 'grafik', fungsi: ['1/(x + 3)'], jangkauan: [-7, 2, -4, 4] },
    pilihan: ['x = −3', 'x = 3', 'y = −3', 'y = 3', 'x = 0'],
    benar: 0,
    langkah: [
      'Asimtot tegak fungsi pecahan terletak pada nilai x yang membuat penyebutnya nol sedangkan pembilangnya tidak nol.',
      'Penyebut x + 3 = 0 memberi x = −3, dan pembilangnya 1 ≠ 0. Di dekat x = −3 nilai fungsi membesar tanpa batas: f(−2,9) = 10, f(−2,99) = 100, sedangkan f(−3,1) = −10.',
      {
        teks: 'Perhatikan sketsa berikut: kurva melesat ke atas di kanan garis x = −3 dan ke bawah di kirinya, tanpa pernah menyentuh garis itu.',
        gambar: { jenis: 'grafik', fungsi: ['1/(x + 3)'], jangkauan: [-7, 2, -4, 4], tegak: [-3], titik: [{ x: -2, y: 1, label: '(-2, 1)' }, { x: -4, y: -1, label: '(-4, -1)' }] },
      },
      'Jadi, asimtot tegaknya berada di x = −3. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, x = 3, menyalin angka tanpa membalik tanda; x + 3 = 0 dipenuhi oleh x = −3. Pilihan C dan D menulis asimtot tegak sebagai y = ..., padahal asimtot tegak adalah garis x = konstanta; asimtot datarnya y = 0.',
    alasan: 'Penyebut nol di x = −3.',
  },
  {
    // cek: (11 - 5) / 2 === 3
    id: 'gf-s10',
    tingkat: 'sedang',
    pertanyaan: 'Diketahui f(x) = 2x + 5. Rumus fungsi inversnya adalah…',
    pilihan: ['f⁻¹(x) = 1/(2x + 5)', 'f⁻¹(x) = (x + 5)/2', 'f⁻¹(x) = (x − 5)/2', 'f⁻¹(x) = 2x − 5', 'f⁻¹(x) = x/2 − 5'],
    benar: 2,
    langkah: [
      'Misalkan y = f(x) = 2x + 5. Fungsi invers diperoleh dengan menyatakan x dalam y, lalu menukar nama peubahnya.',
      'Dari y = 2x + 5 diperoleh 2x = y − 5, sehingga x = (y − 5)/2.',
      'Tukar nama peubah x dan y sehingga diperoleh f⁻¹(x) = (x − 5)/2.',
      {
        teks: 'Pemeriksaan: f(3) = 11 dan f⁻¹(11) = (11 − 5)/2 = 3, kembali ke asalnya. Secara grafik, y = f⁻¹(x) adalah pencerminan y = f(x) terhadap garis y = x, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['2*x + 5', '(x - 5)/2', 'x'], jangkauan: [-8, 12, -8, 12], titik: [{ x: 3, y: 11, label: '(3, 11)' }, { x: 11, y: 3, label: '(11, 3)' }], nama: ['y = f(x)', 'y = f⁻¹(x)', 'y = x'] },
      },
      'Jadi, rumus fungsi inversnya adalah f⁻¹(x) = (x − 5)/2. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 1/(2x + 5), mengira invers sama dengan kebalikan (1 dibagi f); invers membalik PEMETAAN, bukan nilai. Pilihan B salah tanda saat memindahkan 5. Pilihan E membagi x dengan 2 dulu baru mengurangi 5, urutan yang terbalik.',
    alasan: 'y = 2x + 5 → x = (y − 5)/2.',
  },
  {
    // cek: 2**4 < 20 && 20 < 2**5
    id: 'gf-x04',
    tingkat: 'sedang',
    pertanyaan: 'Bilangan x memenuhi 2ˣ = 20. Nilai x terletak di antara…',
    pilihan: ['3 dan 4', '9 dan 10', '10 dan 11', '4 dan 5', '19 dan 20'],
    benar: 3,
    langkah: [
      'Perhatikan bahwa 20 bukan pangkat bulat dari 2, sehingga x tidak bulat. Kurung 20 dengan dua pangkat 2 yang berdekatan: 2⁴ = 16 < 20 < 32 = 2⁵.',
      'Karena fungsi y = 2ˣ naik (makin besar x, makin besar 2ˣ), dari 16 < 20 < 32 diperoleh 4 < x < 5.',
      {
        teks: 'Perhatikan sketsa berikut: garis y = 20 memotong kurva y = 2ˣ di antara x = 4 dan x = 5.',
        gambar: { jenis: 'grafik', fungsi: ['2 ** x', '20'], jangkauan: [0, 6, -2, 40], titik: [{ x: 4, y: 16, label: '(4, 16)' }, { x: 5, y: 32, label: '(5, 32)' }], arsir: [{ dari: 4, sampai: 5, label: '4 < x < 5' }], nama: ['y = 2ˣ', 'y = 20'] },
      },
      'Jadi, nilai x terletak di antara 4 dan 5. (Jawaban D)',
    ],
    jebakan: 'Pilihan B, 9 dan 10, membagi 20 dengan 2; persamaan 2x = 20 berbeda dengan 2ˣ = 20. Pilihan E, 19 dan 20, mengira x hampir sama dengan 20. Pilihan A, 3 dan 4, menganggap 2⁴ = 16 sudah melewati 20.',
    alasan: '2⁴ = 16 < 20 < 32 = 2⁵.',
  },
  {
    // cek: 2*2 - 5*2 + 6 === 0 && 3*3 - 5*3 + 6 === 0
    id: 'gf-s11',
    tingkat: 'sedang',
    pertanyaan: 'Grafik y = x² − 5x + 6 memotong sumbu-X di…',
    pilihan: ['x = −2 dan x = −3', 'x = 1 dan x = 6', 'x = 0 dan x = 6', 'x = 2 dan x = 3', 'x = 5 saja'],
    benar: 3,
    langkah: [
      'Titik potong dengan sumbu-X mempunyai ordinat y = 0, sehingga selesaikan x² − 5x + 6 = 0.',
      'Cari dua bilangan yang hasil kalinya 6 dan jumlahnya −5, yaitu −2 dan −3. Dengan demikian, x² − 5x + 6 = (x − 2)(x − 3) = 0.',
      'Hasil kali dua faktor bernilai nol bila salah satunya nol: x − 2 = 0 memberi x = 2, dan x − 3 = 0 memberi x = 3.',
      {
        teks: 'Pemeriksaan: f(2) = 4 − 10 + 6 = 0 dan f(3) = 9 − 15 + 6 = 0; titik baliknya (2,5; −0,25) berada di antara kedua titik potong, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x - 5*x + 6'], jangkauan: [-1, 6, -2, 8], titik: [{ x: 2, y: 0, label: '2' }, { x: 3, y: 0, label: '3' }, { x: 2.5, y: -0.25 }], tegak: [2.5] },
      },
      'Jadi, grafik memotong sumbu-X di x = 2 dan x = 3. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, x = −2 dan x = −3, menyalin tanda dari faktor (x − 2)(x − 3); pembuat nolnya x = +2 dan x = +3. Pilihan B, 1 dan 6, mengambil pasangan yang hasil kalinya 6 tetapi jumlahnya 7, bukan 5.',
    alasan: '(x − 2)(x − 3) = 0.',
  },
  {
    // cek: 0*0 - 3 === -3 && 2*2 - 3 === 1
    id: 'gf-s12',
    tingkat: 'sedang',
    pertanyaan: 'Grafik y = f(x) − 3 adalah grafik y = f(x) yang…',
    pilihan: ['digeser 3 satuan ke kiri', 'digeser 3 satuan ke atas', 'digeser 3 satuan ke kanan', 'digeser 3 satuan ke bawah', 'dicerminkan'],
    benar: 3,
    langkah: [
      'Ingat bahwa y = f(x) + k menambah k pada setiap nilai y: titik (x, y) berpindah ke (x, y + k); k positif berarti ke atas, k negatif berarti ke bawah.',
      'Di sini k = −3, sehingga setiap titik turun 3 satuan. Ambil f(x) = x²: puncak (0, 0) berpindah ke (0, −3), dan titik (2, 4) berpindah ke (2, 1).',
      {
        teks: 'Perhatikan sketsa berikut: bentuk parabola tidak berubah, hanya turun 3 satuan.',
        gambar: { jenis: 'grafik', fungsi: ['x*x', 'x*x - 3'], jangkauan: [-3, 3, -4, 8], titik: [{ x: 0, y: 0, label: '(0, 0)' }, { x: 0, y: -3, label: '(0, -3)' }, { x: 2, y: 4, label: '(2, 4)' }, { x: 2, y: 1, label: '(2, 1)' }], nama: ['y = f(x)', 'y = f(x) − 3'] },
      },
      'Jadi, grafik y = f(x) − 3 adalah grafik y = f(x) yang digeser 3 satuan ke bawah. (Jawaban D)',
    ],
    jebakan: 'Pilihan C, 3 ke kanan, adalah arti f(x − 3), dengan angka di DALAM kurung. Pilihan B, 3 ke atas, membaca tanda minus terbalik. Pilihan E keliru: pencerminan mengubah arah bukaan atau letak kiri kanan, bukan cuma menggeser.',
    alasan: 'y − 3: setiap titik turun 3.',
  },
  {
    // cek: Math.abs(800 * 0.5 ** 3 - 100) < 1e-9
    id: 'gf-s13',
    tingkat: 'sedang',
    pertanyaan: 'Suatu zat meluruh: tiap jam massanya tinggal setengahnya. Mula-mula massanya 800 gram. Massa yang tersisa setelah 3 jam adalah…',
    gambar: { jenis: 'garis-data', kategori: ['0 jam', '1 jam', '2 jam'], nilai: [800, 400, 200], satuan: 'gram' },
    pilihan: ['100 gram', '200 gram', '400 gram', '266,7 gram', '50 gram'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa "tinggal setengahnya" tiap jam berarti massa dikalikan 1/2 setiap jam, sehingga massa setelah t jam adalah m(t) = 800 × (1/2)ᵗ.',
      {
        teks: 'Hitung jam demi jam: 800 menjadi 400, lalu 200, lalu 100.',
        gambar: { jenis: 'tabel', kepala: ['t (jam)', 'Hitungan', 'Massa (gram)'], baris: [['0', 'awal', '800'], ['1', '800 : 2', '400'], ['2', '400 : 2', '200'], ['3', '200 : 2', '100']], kolomBaru: [1, 2], sorot: [3] },
      },
      'Cara 2: langsung m(3) = 800 × (1/2)³ = 800 × 1/8 = 100, sama.',
      'Jadi, setelah 3 jam tersisa 100 gram. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 200 gram, adalah massa setelah 2 jam. Pilihan D, 266,7 gram, membagi 800 dengan 3 seolah meluruh sepertiga sekaligus. Pilihan E, 50 gram, kelebihan satu jam.',
    alasan: '800 × (1/2)³ = 100.',
  },
  {
    // cek: 2*2 - 4*2 + 1 === -3 && 1 + 4 + 1 === 6 && 16 - 16 + 1 === 1
    id: 'gf-s17',
    tingkat: 'sedang',
    pertanyaan: 'Daerah hasil fungsi f(x) = x² − 4x + 1 untuk −1 ≤ x ≤ 4 adalah…',
    pilihan: ['1 ≤ y ≤ 6', '−3 ≤ y ≤ 1', 'y ≥ −3', '−3 ≤ y ≤ 6', '−1 ≤ y ≤ 4'],
    benar: 3,
    langkah: [
      'Karena f(x) = x² − 4x + 1, berarti a = 1, b = −4, c = 1. Karena a > 0, parabola terbuka ke atas dan nilai terkecilnya dicapai di titik balik, asalkan titik balik itu berada di dalam daerah asal.',
      'Absis titik balik x_p = −b/(2a) = 4/2 = 2, dan 2 memang berada dalam selang −1 ≤ x ≤ 4. Substitusikan x = 2: y_p = 4 − 8 + 1 = −3, nilai terkecil f.',
      'Nilai terbesar pada selang tertutup dicapai di salah satu ujung selang: f(−1) = 1 + 4 + 1 = 6 dan f(4) = 16 − 16 + 1 = 1. Yang terbesar adalah 6.',
      {
        teks: 'Perhatikan sketsa berikut: pada selang −1 ≤ x ≤ 4, grafik berada di antara garis y = −3 dan y = 6.',
        gambar: { jenis: 'grafik', fungsi: ['x*x - 4*x + 1'], jangkauan: [-2, 5, -4, 8], titik: [{ x: 2, y: -3, label: '(2, -3)' }, { x: -1, y: 6, label: '(-1, 6)' }, { x: 4, y: 1, label: '(4, 1)' }], arsir: [{ dari: -1, sampai: 4, label: 'daerah asal' }], datar: [-3, 6] },
      },
      'Jadi, daerah hasilnya adalah −3 ≤ y ≤ 6. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 1 ≤ y ≤ 6, hanya menghitung kedua ujung selang dan lupa titik balik (2, −3) yang lebih rendah. Pilihan B, −3 ≤ y ≤ 1, mengambil ujung kanan sebagai nilai terbesar padahal f(−1) = 6 lebih besar. Pilihan C lupa daerah asalnya terbatas.',
    alasan: 'Minimum di titik balik (2, −3), maksimum di ujung f(−1) = 6.',
  },
  // ================================================================ SULIT
  {
    // cek: 3*4 + 12*(-2) + 5 === -7 && -12/6 === -2
    id: 'gf-t01',
    tingkat: 'sulit',
    pertanyaan: 'Koordinat titik puncak grafik y = 3x² + 12x + 5 adalah…',
    pilihan: ['(−2, 7)', '(2, −7)', '(−4, 5)', '(−2, −7)', '(−2, −19)'],
    benar: 3,
    langkah: [
      'Karena y = 3x² + 12x + 5, berarti a = 3, b = 12, c = 5.',
      'Absis titik balik dinyatakan oleh x_p = −b/(2a) = −12/(2 · 3) = −12/6 = −2.',
      'Substitusikan x = −2 pada persamaan: y_p = 3(−2)² + 12(−2) + 5 = 12 − 24 + 5 = −7.',
      'Cara 2: ordinat titik balik y_p = −D/(4a) dengan D = b² − 4ac = 144 − 60 = 84, sehingga y_p = −84/12 = −7, sama.',
      {
        teks: 'Perhatikan sketsa berikut: parabola terbuka ke atas (a = 3 > 0) dan titik terendahnya (−2, −7) terletak pada sumbu simetri x = −2.',
        gambar: { jenis: 'grafik', fungsi: ['3*x*x + 12*x + 5'], jangkauan: [-5, 1, -9, 8], titik: [{ x: -2, y: -7, label: '(-2, -7)' }], tegak: [-2] },
      },
      'Jadi, koordinat titik puncaknya adalah (−2, −7). (Jawaban D)',
    ],
    jebakan: 'Pilihan B, (2, −7), lupa tanda negatif pada x_p = −b/(2a). Pilihan A, (−2, 7), salah tanda saat menghitung 12 − 24 + 5. Pilihan E, (−2, −19), menghitung 3(−2)² sebagai −12. Pilihan C, (−4, 5), memakai −b/a dan c.',
    alasan: 'x_p = −12/6 = −2, y_p = 12 − 24 + 5 = −7.',
  },
  {
    // cek: 2*1*1 + 4*1 - 6 === 0 && 2*(-1)*(-1) + 4*(-1) - 6 === -8
    id: 'gf-t02',
    tingkat: 'sulit',
    pertanyaan: 'Sebuah parabola berpuncak di (−1, −8) dan melalui titik (1, 0). Bentuk umumnya adalah…',
    gambar: { jenis: 'grafik', fungsi: ['2*x*x + 4*x - 6'], jangkauan: [-5, 3, -10, 6], titik: [{ x: -1, y: -8, label: 'puncak (-1, -8)' }, { x: 1, y: 0, label: '(1, 0)' }] },
    pilihan: ['y = 2x² − 4x − 6', 'y = x² + 2x − 7', 'y = 2x² + 4x − 6', 'y = 2x² + 4x − 8', 'y = −2x² − 4x − 6'],
    benar: 2,
    langkah: [
      'Karena titik puncaknya (x_p, y_p) = (−1, −8), tulis persamaannya dalam bentuk puncak y = a(x − x_p)² + y_p = a(x + 1)² − 8.',
      'Grafik melalui (1, 0), sehingga substitusikan x = 1 dan y = 0: 0 = a(1 + 1)² − 8 = 4a − 8, diperoleh a = 2.',
      'Dengan demikian, y = 2(x + 1)² − 8 = 2(x² + 2x + 1) − 8 = 2x² + 4x + 2 − 8 = 2x² + 4x − 6.',
      {
        teks: 'Pemeriksaan: x_p = −4/(2 · 2) = −1 dan y_p = 2 − 4 − 6 = −8, cocok; grafik juga memotong sumbu-X di x = −3 dan x = 1, simetris terhadap x = −1.',
        gambar: { jenis: 'grafik', fungsi: ['2*x*x + 4*x - 6'], jangkauan: [-5, 3, -10, 6], titik: [{ x: -1, y: -8, label: '(-1, -8)' }, { x: 1, y: 0, label: '(1, 0)' }, { x: -3, y: 0, label: '(-3, 0)' }], tegak: [-1] },
      },
      'Jadi, bentuk umumnya adalah y = 2x² + 4x − 6. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, y = 2x² − 4x − 6, menulis bentuk puncak sebagai a(x − 1)², menyalin tanda absis puncak. Pilihan D, 2x² + 4x − 8, lupa bahwa 2(x + 1)² menyumbang +2 yang harus digabung dengan −8. Pilihan E membalik tanda a, padahal 4a − 8 = 0 memberi a = +2.',
    alasan: 'y = a(x + 1)² − 8, a = 2 dari (1, 0).',
  },
  {
    // cek: 2 * 3 === 6
    id: 'gf-t03',
    tingkat: 'sulit',
    pertanyaan: 'Titik (6, 5) terletak pada grafik y = f(x). Pada grafik y = f(2x), titik itu berpindah ke…',
    pilihan: ['(12, 5)', '(6, 10)', '(3, 5)', '(6, 2,5)', '(3, 10)'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa y = f(2x) mengambil nilai f pada 2x. Agar nilainya sama dengan f(6) = 5, haruslah 2x = 6, sehingga x = 3.',
      'Dengan demikian, titik (3, 5) berada pada grafik y = f(2x): absisnya dibagi 2, ordinatnya tetap. Seluruh grafik dimampatkan mendatar ke arah sumbu-y dengan faktor 1/2.',
      {
        teks: 'Sebagai contoh, ambil f(x) = 5x/6 yang melalui (6, 5); maka f(2x) = 5x/3 melalui (3, 5), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['5*x/6', '5*x/3'], jangkauan: [0, 8, 0, 8], titik: [{ x: 6, y: 5, label: '(6, 5)' }, { x: 3, y: 5, label: '(3, 5)' }], datar: [5], nama: ['y = f(x)', 'y = f(2x)'] },
      },
      'Jadi, titik itu berpindah ke (3, 5). (Jawaban C)',
    ],
    jebakan: 'Pilihan A, (12, 5), mengalikan absis dengan 2; yang benar, 2x harus sama dengan 6 sehingga x malah mengecil. Pilihan B, (6, 10), mengalikan ordinat, yaitu arti y = 2f(x), bukan f(2x).',
    alasan: '2x = 6 memberi x = 3; y tetap 5.',
  },
  {
    // cek: Math.abs(-2 - 5) === 7 && Math.abs(-2) - 5 === -3
    id: 'gf-t04',
    tingkat: 'sulit',
    pertanyaan: 'Diketahui f(x) = x − 5. Nilai |f(−2)| dan f(|−2|) berturut-turut adalah…',
    pilihan: ['7 dan −3', '7 dan 3', '−7 dan −3', '3 dan 7', '7 dan 7'],
    benar: 0,
    langkah: [
      'Hitung |f(−2)|: f(−2) = −2 − 5 = −7, sehingga |f(−2)| = |−7| = 7.',
      'Hitung f(|−2|): |−2| = 2, sehingga f(|−2|) = f(2) = 2 − 5 = −3.',
      {
        teks: 'Perhatikan bahwa urutan pengerjaannya berbeda: pada |f(−2)| harga mutlak diambil SETELAH f dihitung, sedangkan pada f(|−2|) harga mutlak diambil SEBELUM masuk ke f, sehingga hasilnya tidak sama.',
        gambar: { jenis: 'tabel', kepala: ['Bentuk', 'Dikerjakan dulu', 'Lalu', 'Hasil'], baris: [['|f(−2)|', 'f(−2) = −7', '|−7|', '7'], ['f(|−2|)', '|−2| = 2', 'f(2) = 2 − 5', '−3']], kolomBaru: [1, 2, 3] },
      },
      'Jadi, nilai |f(−2)| dan f(|−2|) berturut-turut adalah 7 dan −3. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 7 dan 3, mengambil harga mutlak lagi pada hasil kedua; harga mutlak hanya dikenakan pada −2, bukan pada hasil akhirnya. Pilihan E, 7 dan 7, mengira kedua bentuk selalu sama. Pilihan C lupa harga mutlak pada bentuk pertama.',
    alasan: '|−7| = 7 dan f(2) = −3.',
  },
  {
    // cek: 200 * 2 ** 5 === 6400
    id: 'gf-t05',
    tingkat: 'sulit',
    pertanyaan: 'Sebuah kultur bakteri mula-mula 200 sel dan jumlahnya menjadi dua kali lipat tiap jam. Jumlahnya mencapai 6.400 sel setelah…',
    pilihan: ['32 jam', '6 jam', '4 jam', '31 jam', '5 jam'],
    benar: 4,
    langkah: [
      'Banyak sel setelah t jam adalah N(t) = 200 × 2ᵗ. Dicari t yang memenuhi 200 × 2ᵗ = 6.400.',
      'Bagi kedua ruas dengan 200: 2ᵗ = 6.400/200 = 32.',
      'Tulis 32 sebagai pangkat 2: 32 = 2⁵, sehingga 2ᵗ = 2⁵ dan t = 5.',
      {
        teks: 'Pemeriksaan jam demi jam: 200, 400, 800, 1.600, 3.200, 6.400; angka 6.400 tercapai tepat pada jam ke-5.',
        gambar: { jenis: 'tabel', kepala: ['t (jam)', '0', '1', '2', '3', '4', '5'], baris: [['sel', '200', '400', '800', '1.600', '3.200', '6.400']], kolomBaru: [1, 2, 3, 4, 5, 6] },
      },
      'Jadi, jumlahnya mencapai 6.400 sel setelah 5 jam. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 32 jam, berhenti pada 2ᵗ = 32 dan menganggap 32 sebagai jawaban; 32 = 2⁵, sehingga t = 5. Pilihan C, 4 jam, baru 3.200 sel. Pilihan B, 6 jam, sudah 12.800 sel.',
    alasan: '2ᵗ = 32 = 2⁵.',
  },
  {
    // cek: Math.abs((3*1e6 - 2)/(1e6 + 4) - 3) < 1e-3
    id: 'gf-t06',
    tingkat: 'sulit',
    pertanyaan: 'Asimtot datar grafik y = (3x − 2)/(x + 4) berada di…',
    gambar: { jenis: 'grafik', fungsi: ['(3*x - 2)/(x + 4)'], jangkauan: [-14, 8, -6, 10], tegak: [-4], nama: ['y = (3x − 2)/(x + 4)'] },
    pilihan: ['y = −2', 'y = 4', 'y = −4', 'y = 0', 'y = 3'],
    benar: 4,
    langkah: [
      'Asimtot datar menyatakan nilai yang didekati y ketika x membesar tanpa batas (x → ∞ atau x → −∞).',
      'Bagi pembilang dan penyebut dengan x: y = (3 − 2/x)/(1 + 4/x). Ketika x membesar tanpa batas, 2/x dan 4/x mendekati 0, sehingga y mendekati 3/1 = 3.',
      'Secara umum, bila derajat pembilang sama dengan derajat penyebut, asimtot datarnya adalah perbandingan koefisien pangkat tertinggi: y = 3/1 = 3.',
      {
        teks: 'Pemeriksaan dengan angka: makin besar x, nilai y makin dekat ke 3.',
        gambar: { jenis: 'tabel', kepala: ['x', 'y = (3x − 2)/(x + 4)'], baris: [['10', '28/14 = 2'], ['100', '298/104 ≈ 2,87'], ['1.000', '2.998/1.004 ≈ 2,99'], ['10.000', '29.998/10.004 ≈ 2,999']], kolomBaru: [1] },
      },
      {
        teks: 'Perhatikan sketsa berikut: di kiri dan kanan, kurva makin menempel pada garis y = 3, sedangkan garis x = −4 adalah asimtot tegaknya.',
        gambar: { jenis: 'grafik', fungsi: ['(3*x - 2)/(x + 4)'], jangkauan: [-14, 8, -6, 10], tegak: [-4], datar: [3] },
      },
      'Jadi, asimtot datarnya berada di y = 3. (Jawaban E)',
    ],
    jebakan: 'Pilihan C, y = −4, mengambil letak asimtot TEGAK (x = −4, dari penyebut nol) dan menulisnya sebagai y. Pilihan D, y = 0, hanya berlaku bila derajat pembilang lebih kecil daripada derajat penyebut. Pilihan A membagi konstanta −2 dengan 1.',
    alasan: 'Derajat sama: y = 3/1 = 3.',
  },
  {
    // cek: (2*1 - 3)**2 + 1 === 2 && 4*1 - 12*1 + 10 === 2
    id: 'gf-t07',
    tingkat: 'sulit',
    pertanyaan: 'Diketahui f(x) = x² + 1 dan g(x) = 2x − 3. Rumus (f ∘ g)(x) adalah…',
    pilihan: ['2x² − 1', '4x² + 10', '4x² − 12x + 10', '2x² + 2', '4x² − 12x + 8'],
    benar: 2,
    langkah: [
      'Ingat bahwa (f ∘ g)(x) = f(g(x)): hasil g dimasukkan ke f.',
      'Karena f(x) = x² + 1, setiap x pada f diganti dengan g(x) = 2x − 3: f(g(x)) = (2x − 3)² + 1.',
      'Jabarkan: (2x − 3)² = 4x² − 12x + 9, sehingga (f ∘ g)(x) = 4x² − 12x + 9 + 1 = 4x² − 12x + 10.',
      {
        teks: 'Pemeriksaan dengan beberapa nilai x: hasil lewat pemetaan bertahap sama dengan hasil rumus.',
        gambar: { jenis: 'tabel', kepala: ['x', 'g(x) = 2x − 3', 'f(g(x)) = g(x)² + 1', '4x² − 12x + 10'], baris: [['0', '−3', '10', '10'], ['1', '−1', '2', '2'], ['2', '1', '2', '2']], kolomBaru: [1, 2, 3] },
      },
      'Jadi, (f ∘ g)(x) = 4x² − 12x + 10. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 2x² − 1, adalah (g ∘ f)(x) = 2(x² + 1) − 3, urutannya terbalik. Pilihan B, 4x² + 10, menjabarkan (2x − 3)² sebagai 4x² + 9, lupa suku tengah −12x. Pilihan E lupa menambahkan 1 dari f.',
    alasan: '(2x − 3)² + 1 = 4x² − 12x + 10.',
  },
  {
    // cek: Math.sqrt(9 - 9) === 0 && Math.sqrt(9 - 0) === 3
    id: 'gf-t08',
    tingkat: 'sulit',
    pertanyaan: 'Setengah lingkaran ATAS berjari-jari 3 dengan pusat di titik asal digambar di bidang koordinat. Daerah asal dan daerah hasilnya adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.sqrt(9 - x*x)'], jangkauan: [-4, 4, -1, 4] },
    pilihan: ['daerah asal −3 ≤ x ≤ 3, daerah hasil −3 ≤ y ≤ 3', 'daerah asal 0 ≤ x ≤ 3, daerah hasil 0 ≤ y ≤ 3', 'daerah asal −3 ≤ x ≤ 3, daerah hasil 0 ≤ y ≤ 9', 'daerah asal −3 ≤ x ≤ 3, daerah hasil 0 ≤ y ≤ 3', 'bukan fungsi, jadi tidak punya daerah asal'],
    benar: 3,
    langkah: [
      'Setengah lingkaran atas berpusat di O dengan jari-jari 3 adalah grafik y = √(9 − x²), diambil akar yang tak negatif.',
      'Daerah asal: agar akarnya ada, 9 − x² ≥ 0, yaitu x² ≤ 9, sehingga −3 ≤ x ≤ 3. Secara gambar, setengah lingkaran membentang dari x = −3 sampai x = 3.',
      'Daerah hasil: y = √(9 − x²) paling kecil 0 (saat x = ±3) dan paling besar √9 = 3 (saat x = 0), sehingga 0 ≤ y ≤ 3.',
      {
        teks: 'Perhatikan sketsa berikut: lebar grafik dari −3 sampai 3 (daerah asal) dan tingginya dari 0 sampai 3 (daerah hasil). Setiap garis tegak memotongnya paling banyak sekali, sehingga kurva itu memang fungsi.',
        gambar: { jenis: 'grafik', fungsi: ['Math.sqrt(9 - x*x)'], jangkauan: [-4, 4, -1, 4], titik: [{ x: -3, y: 0, label: '(-3, 0)' }, { x: 3, y: 0, label: '(3, 0)' }, { x: 0, y: 3, label: '(0, 3)' }], arsir: [{ dari: -3, sampai: 3, label: 'daerah asal' }], datar: [3] },
      },
      'Jadi, daerah asalnya −3 ≤ x ≤ 3 dan daerah hasilnya 0 ≤ y ≤ 3. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, daerah hasil −3 ≤ y ≤ 3, mengira lingkaran penuh; yang digambar hanya setengah ATAS sehingga y tidak pernah negatif. Pilihan E benar untuk lingkaran penuh (gagal uji garis tegak), tetapi setengah lingkaran lolos uji itu. Pilihan C mengira y sampai 9, lupa akarnya.',
    alasan: 'y = √(9 − x²): x dari −3 sampai 3, y dari 0 sampai 3.',
  },
  {
    id: 'gf-x06',
    tingkat: 'sulit',
    pertanyaan: 'Fungsi y = x² dengan daerah asal semua bilangan real TIDAK mempunyai fungsi invers karena…',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-4, 4, -1, 12] },
    pilihan: ['grafiknya melengkung, bukan garis lurus', 'hasilnya tidak pernah negatif', 'dua masukan berbeda bisa memberi keluaran yang sama', 'grafiknya tidak memotong sumbu-X di dua titik', 'rumusnya tidak bisa dibalik secara aljabar'],
    benar: 2,
    langkah: [
      'Ingat bahwa suatu fungsi mempunyai fungsi invers hanya bila fungsi itu satu-satu: dua masukan berbeda selalu memberi keluaran berbeda, sehingga tiap keluaran dapat dikembalikan ke tepat satu masukan.',
      'Pada f(x) = x², masukan 3 dan −3 sama-sama memberi keluaran 9. Bila f⁻¹ ada, nilai f⁻¹(9) harus 3 sekaligus −3, yang mustahil bagi sebuah fungsi.',
      {
        teks: 'Secara gambar, garis mendatar y = 9 memotong grafik di dua titik: grafik gagal uji garis mendatar, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-4, 4, -1, 12], datar: [9], titik: [{ x: 3, y: 9, label: '(3, 9)' }, { x: -3, y: 9, label: '(-3, 9)' }] },
      },
      'Bila daerah asalnya dibatasi menjadi x ≥ 0, fungsi menjadi satu-satu dan inversnya ada, yaitu f⁻¹(x) = √x.',
      'Jadi, y = x² pada seluruh bilangan real tidak mempunyai invers karena dua masukan berbeda bisa memberi keluaran yang sama. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, grafiknya melengkung, bukan alasannya: y = x³ juga melengkung tetapi punya invers. Pilihan B, hasil tak pernah negatif, hanya membatasi daerah hasil dan tidak menghalangi invers (y = √x juga tak pernah negatif tetapi punya invers). Pilihan E keliru: secara aljabar y = x² memberi x = ±√y, dan tanda ± itulah masalahnya.',
    alasan: 'Tidak satu-satu: f(3) = f(−3) = 9.',
  },
  {
    // cek: 3*3 - 6*3 + 11 === 2
    id: 'gf-t09',
    tingkat: 'sulit',
    pertanyaan: 'Nilai minimum fungsi y = x² − 6x + 11 adalah…',
    pilihan: ['3', '11', '−7', '20', '2'],
    benar: 4,
    langkah: [
      'Karena y = x² − 6x + 11, berarti a = 1, b = −6, c = 11. Karena a > 0, parabola terbuka ke atas sehingga titik baliknya adalah titik minimum.',
      'Absis titik balik x_p = −b/(2a) = 6/2 = 3. Substitusikan x = 3: y_p = 9 − 18 + 11 = 2.',
      'Cara 2: lengkapkan kuadrat, y = (x² − 6x + 9) + 2 = (x − 3)² + 2; karena (x − 3)² ≥ 0, nilai terkecil y adalah 2, tercapai saat x = 3.',
      {
        teks: 'Perhatikan sketsa berikut: seluruh grafik berada pada atau di atas garis y = 2.',
        gambar: { jenis: 'grafik', fungsi: ['x*x - 6*x + 11'], jangkauan: [-1, 7, -1, 12], titik: [{ x: 3, y: 2, label: '(3, 2)' }], datar: [2], tegak: [3] },
      },
      'Jadi, nilai minimum fungsi adalah 2. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 3, adalah ABSIS titik minimum, bukan nilai minimumnya; yang ditanya nilai y. Pilihan B, 11, adalah f(0), titik potong dengan sumbu-y. Pilihan C, −7, salah tanda pada 9 − 18 + 11.',
    alasan: 'y_p = f(3) = 2.',
  },
  {
    // cek: 2*0 - 0 + 3 === 3 && 2*1 - 4*1 + 3 === 1
    id: 'gf-t10',
    tingkat: 'sulit',
    pertanyaan: 'Parabola berpuncak di (1, 1) dan memotong sumbu-y di (0, 3). Bentuk umumnya adalah…',
    gambar: { jenis: 'grafik', fungsi: ['2*x*x - 4*x + 3'], jangkauan: [-2, 4, -1, 8], titik: [{ x: 1, y: 1, label: 'puncak (1, 1)' }, { x: 0, y: 3, label: '(0, 3)' }] },
    pilihan: ['y = x² − 2x + 3', 'y = 2x² + 4x + 3', 'y = 3x² − 6x + 1', 'y = 2x² − 4x + 1', 'y = 2x² − 4x + 3'],
    benar: 4,
    langkah: [
      'Titik puncak (1, 1) memberi bentuk puncak y = a(x − 1)² + 1.',
      'Grafik melalui (0, 3): substitusikan x = 0 dan y = 3: 3 = a(0 − 1)² + 1 = a + 1, sehingga a = 2.',
      'Jabarkan: y = 2(x − 1)² + 1 = 2(x² − 2x + 1) + 1 = 2x² − 4x + 3.',
      {
        teks: 'Pemeriksaan: x_p = −(−4)/(2 · 2) = 1, y_p = 2 − 4 + 3 = 1, dan f(0) = 3, cocok. Titik (2, 3) juga dilalui karena simetris dengan (0, 3) terhadap garis x = 1.',
        gambar: { jenis: 'grafik', fungsi: ['2*x*x - 4*x + 3'], jangkauan: [-2, 4, -1, 8], titik: [{ x: 1, y: 1, label: '(1, 1)' }, { x: 0, y: 3, label: '(0, 3)' }, { x: 2, y: 3, label: '(2, 3)' }], tegak: [1] },
      },
      'Jadi, bentuk umumnya adalah y = 2x² − 4x + 3. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, x² − 2x + 3, mengambil a = 1 tanpa memakai titik (0, 3); dengan a = 1 grafik memotong sumbu-y di (0, 2). Pilihan B, 2x² + 4x + 3, berpuncak di x = −1. Pilihan D salah menjumlahkan 2 + 1.',
    alasan: 'y = a(x − 1)² + 1, a = 2 dari (0, 3).',
  },
  {
    // cek: Math.abs(2*5 - 4) === 6 && Math.abs(2*(-1) - 4) === 6
    id: 'gf-t11',
    tingkat: 'sulit',
    pertanyaan: 'Penyelesaian persamaan |2x − 4| = 6 adalah…',
    pilihan: ['x = 5 saja', 'x = 5 atau x = −1', 'x = 1 atau x = 5', 'x = −5 atau x = 1', 'x = 3'],
    benar: 1,
    langkah: [
      'Ingat bahwa |u| = 6 berarti u = 6 atau u = −6. Dengan u = 2x − 4, diperoleh dua persamaan linear.',
      'Kasus 1: 2x − 4 = 6, maka 2x = 10, sehingga x = 5. Kasus 2: 2x − 4 = −6, maka 2x = −2, sehingga x = −1.',
      'Pemeriksaan: |2(5) − 4| = |6| = 6 dan |2(−1) − 4| = |−6| = 6, keduanya memenuhi.',
      {
        teks: 'Secara gambar, grafik y = |2x − 4| berbentuk V dengan titik terendah (2, 0); garis y = 6 memotongnya di x = −1 dan x = 5, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['Math.abs(2*x - 4)', '6'], jangkauan: [-3, 7, -1, 10], titik: [{ x: 5, y: 6, label: 'x = 5' }, { x: -1, y: 6, label: 'x = -1' }, { x: 2, y: 0, label: '(2, 0)' }], nama: ['y = |2x − 4|', 'y = 6'] },
      },
      'Jadi, penyelesaiannya adalah x = 5 atau x = −1. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, x = 5 saja, lupa kasus negatif: harga mutlak menghapus tanda, sehingga 2x − 4 bisa bernilai −6. Pilihan C, 1 atau 5, salah menyelesaikan 2x = −2. Pilihan E, x = 3, adalah penyelesaian 2x − 4 = 2, salah membaca 6.',
    alasan: '2x − 4 = ±6.',
  },
  {
    // cek: Math.abs(2 ** -20 - 4 - (-4)) < 1e-5
    id: 'gf-t12',
    tingkat: 'sulit',
    pertanyaan: 'Asimtot datar grafik y = 2ˣ − 4 adalah…',
    gambar: { jenis: 'grafik', fungsi: ['2 ** x - 4'], jangkauan: [-5, 4, -6, 10], nama: ['y = 2ˣ − 4'] },
    pilihan: ['y = 0', 'y = 4', 'x = −4', 'y = −4', 'y = 2'],
    benar: 3,
    langkah: [
      'Ingat bahwa grafik y = 2ˣ mempunyai asimtot datar y = 0: ketika x → −∞, nilai 2ˣ mendekati 0 dari atas tanpa pernah mencapainya (2⁻¹⁰ = 1/1024, dan seterusnya).',
      'Grafik y = 2ˣ − 4 adalah grafik y = 2ˣ yang digeser 4 satuan ke bawah, sehingga asimtotnya ikut turun dari y = 0 menjadi y = −4.',
      'Pemeriksaan: untuk x = −10, y = 2⁻¹⁰ − 4 ≈ −3,999; makin ke kiri makin dekat ke −4 tetapi tidak pernah sama dengan −4.',
      {
        teks: 'Perhatikan sketsa berikut: kedua kurva sebangun, dan kurva yang bawah mendekati garis putus-putus y = −4.',
        gambar: { jenis: 'grafik', fungsi: ['2 ** x', '2 ** x - 4'], jangkauan: [-5, 4, -6, 10], datar: [-4], titik: [{ x: 0, y: 1, label: '(0, 1)' }, { x: 0, y: -3, label: '(0, -3)' }], nama: ['y = 2ˣ', 'y = 2ˣ − 4'] },
      },
      'Jadi, asimtot datarnya adalah y = −4. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, y = 0, adalah asimtot y = 2ˣ sebelum digeser. Pilihan C, x = −4, menulis garis tegak; fungsi eksponen tidak mempunyai asimtot tegak. Pilihan B salah tanda geseran.',
    alasan: 'Asimtot y = 0 ikut turun 4 menjadi y = −4.',
  },
  {
    // cek: -((0-3)**2) - 4 === -13 && -(3*3) + 6*3 - 13 === -4
    id: 'gf-t16',
    tingkat: 'sulit',
    pertanyaan: 'Grafik fungsi kuadrat f mempunyai titik balik yang sama dengan grafik y = x² − 6x + 5 dan melalui titik (0, −13). Rumus f(x) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x - 6*x + 5'], jangkauan: [-1, 7, -16, 8], titik: [{ x: 0, y: -13, label: '(0, -13)' }], nama: ['y = x² − 6x + 5'] },
    pilihan: ['x² − 6x − 13', '−x² + 6x − 4', '−x² − 6x − 13', '−x² + 6x + 5', '−x² + 6x − 13'],
    benar: 4,
    langkah: [
      'Cari titik balik grafik y = x² − 6x + 5: a = 1, b = −6, sehingga x_p = −b/(2a) = 6/2 = 3, dan y_p = 3² − 6(3) + 5 = 9 − 18 + 5 = −4. Titik baliknya (3, −4).',
      'Karena f mempunyai titik balik yang sama, tulis f(x) = a(x − 3)² − 4 dengan a belum diketahui (a mengatur arah bukaan dan lebarnya).',
      'Grafik f melalui (0, −13): substitusikan x = 0 dan f = −13: −13 = a(0 − 3)² − 4 = 9a − 4, sehingga 9a = −9 dan a = −1.',
      'Jabarkan: f(x) = −(x − 3)² − 4 = −(x² − 6x + 9) − 4 = −x² + 6x − 13.',
      {
        teks: 'Perhatikan sketsa berikut: kedua parabola berpuncak di titik yang sama (3, −4); yang satu terbuka ke atas, sedangkan f terbuka ke bawah dan melalui (0, −13).',
        gambar: { jenis: 'grafik', fungsi: ['x*x - 6*x + 5', '-x*x + 6*x - 13'], jangkauan: [-1, 7, -16, 8], titik: [{ x: 3, y: -4, label: '(3, -4)' }, { x: 0, y: -13, label: '(0, -13)' }], tegak: [3], nama: ['y = x² − 6x + 5', 'y = f(x)'] },
      },
      'Jadi, rumus f(x) adalah −x² + 6x − 13. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, −x² + 6x − 4, lupa menjabarkan −(x − 3)² sepenuhnya: sukunya −9 harus digabung dengan −4. Pilihan A, x² − 6x − 13, hanya mengganti konstanta; titik baliknya berubah menjadi (3, −22). Pilihan C salah tanda pada 6x, sehingga puncaknya pindah ke x = −3.',
    alasan: 'f(x) = a(x − 3)² − 4, a = −1 dari (0, −13).',
  },
  {
    // cek: (8 + 1)**2 - 36 > 0 && 8 + 1 > 0 && (5 + 1)**2 - 36 === 0
    id: 'gf-t17',
    tingkat: 'sulit',
    pertanyaan: 'Persamaan kuadrat x² − (m + 1)x + 9 = 0 mempunyai dua akar real berbeda yang keduanya positif. Batas nilai m yang memenuhi adalah…',
    pilihan: ['m < −7 atau m > 5', 'm > 5', 'm > −1', '−1 < m < 5', 'm < −7'],
    benar: 1,
    langkah: [
      'Misalkan akar-akarnya x₁ dan x₂. Karena x² − (m + 1)x + 9 = 0, berarti a = 1, b = −(m + 1), c = 9, sehingga x₁ + x₂ = −b/a = m + 1 dan x₁x₂ = c/a = 9.',
      'Agar kedua akar real, berbeda, dan positif, haruslah tiga syarat terpenuhi sekaligus: D > 0, x₁ + x₂ > 0, dan x₁x₂ > 0.',
      'Syarat D > 0: (m + 1)² − 4 · 1 · 9 > 0, yaitu (m + 1)² > 36, sehingga m + 1 < −6 atau m + 1 > 6, diperoleh m < −7 atau m > 5.',
      'Syarat jumlah: m + 1 > 0, diperoleh m > −1. Syarat hasil kali: 9 > 0, selalu terpenuhi.',
      {
        teks: 'Iriskan ketiganya dengan garis bilangan: bagian m < −7 gugur karena bertentangan dengan m > −1, sehingga yang memenuhi semua syarat hanyalah m > 5.',
        gambar: { jenis: 'garis-bilangan', jangkauan: [-10, 9], titik: [{ x: -7, label: '-7', kosong: true }, { x: -1, label: '-1', kosong: true }, { x: 5, label: '5', kosong: true }], selang: [{ dari: -10, sampai: -7, tanda: 'jumlah < 0' }, { dari: -7, sampai: -1, tanda: 'D < 0' }, { dari: -1, sampai: 5, tanda: 'D < 0' }, { dari: 5, sampai: 9, tanda: 'memenuhi', sorot: true }] },
      },
      'Pemeriksaan dengan m = 8: x² − 9x + 9 = 0 mempunyai D = 81 − 36 = 45 > 0, jumlah akar 9 > 0, dan hasil kali 9 > 0, sehingga kedua akarnya positif (sekitar 1,15 dan 7,85).',
      'Jadi, batas nilai m adalah m > 5. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, m < −7 atau m > 5, hanya memakai syarat D > 0 dan lupa syarat tanda akar; untuk m < −7 jumlah akarnya negatif sehingga kedua akar negatif. Pilihan C, m > −1, hanya syarat jumlah tanpa D. Pilihan D, −1 < m < 5, salah membaca D > 0 sebagai D < 0.',
    alasan: 'D > 0 (m < −7 atau m > 5) diiris dengan m + 1 > 0.',
  },
  // ========================================================= SANGAT SULIT
  {
    // cek: 2*0 - 0 - 16 === -16 && 2*4*4 - 4*4 - 16 === 0
    id: 'gf-x01',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah parabola memotong sumbu-X di (−2, 0) dan (4, 0), serta memotong sumbu-y di (0, −16). Bentuk umumnya adalah…',
    gambar: { jenis: 'grafik', fungsi: ['2*x*x - 4*x - 16'], jangkauan: [-4, 6, -20, 8], titik: [{ x: -2, y: 0, label: '-2' }, { x: 4, y: 0, label: '4' }, { x: 0, y: -16, label: '(0, -16)' }] },
    pilihan: ['y = 2x² − 4x − 16', 'y = x² − 2x − 8', 'y = 2x² + 4x − 16', 'y = −2x² + 4x + 16', 'y = 2x² − 4x + 16'],
    benar: 0,
    langkah: [
      'Karena grafik memotong sumbu-X di x = −2 dan x = 4, tulis y = a(x + 2)(x − 4).',
      'Grafik melalui (0, −16): substitusikan x = 0 dan y = −16: −16 = a(0 + 2)(0 − 4) = −8a, sehingga a = 2.',
      'Jabarkan: y = 2(x + 2)(x − 4) = 2(x² − 2x − 8) = 2x² − 4x − 16.',
      {
        teks: 'Pemeriksaan: f(−2) = 8 + 8 − 16 = 0, f(4) = 32 − 16 − 16 = 0, dan f(0) = −16, cocok. Titik baliknya (1, −18), tepat di tengah kedua pembuat nol.',
        gambar: { jenis: 'grafik', fungsi: ['2*x*x - 4*x - 16'], jangkauan: [-4, 6, -20, 8], titik: [{ x: -2, y: 0, label: '(-2, 0)' }, { x: 4, y: 0, label: '(4, 0)' }, { x: 0, y: -16, label: '(0, -16)' }, { x: 1, y: -18, label: '(1, -18)' }], tegak: [1] },
      },
      'Jadi, bentuk umumnya adalah y = 2x² − 4x − 16. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, x² − 2x − 8, berpembuat nol sama tetapi memotong sumbu-y di (0, −8), belum dikalikan a = 2. Pilihan D, −2x² + 4x + 16, salah tanda a: dari −16 = −8a diperoleh a = +2. Pilihan C berpembuat nol x = 2 dan x = −4.',
    alasan: 'y = a(x + 2)(x − 4), a = 2 dari (0, −16).',
  },
  {
    // cek: 3*3 === 9 && 3*2 + 2 === 8 && 3 + 2 === 5
    id: 'gf-x02',
    tingkat: 'sangat sulit',
    pertanyaan: 'Diketahui f(x) = ax + b dengan a bilangan positif, dan (f ∘ f)(x) = 9x + 8. Nilai a + b adalah…',
    pilihan: ['5', '11', '7', '17', '4'],
    benar: 0,
    langkah: [
      'Hitung (f ∘ f)(x) = f(f(x)) = a(ax + b) + b = a²x + ab + b.',
      'Samakan dengan 9x + 8: koefisien x memberi a² = 9, dan konstanta memberi ab + b = 8.',
      'Dari a² = 9 dan a positif diperoleh a = 3. Substitusikan ke ab + b = 8: 3b + b = 4b = 8, sehingga b = 2.',
      {
        teks: 'Pemeriksaan: f(x) = 3x + 2, maka f(f(x)) = 3(3x + 2) + 2 = 9x + 8, cocok untuk setiap x.',
        gambar: { jenis: 'tabel', kepala: ['x', 'f(x) = 3x + 2', 'f(f(x))', '9x + 8'], baris: [['0', '2', '8', '8'], ['1', '5', '17', '17'], ['2', '8', '26', '26']], kolomBaru: [1, 2, 3] },
      },
      'Jadi, a + b = 3 + 2 = 5. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 11, mengambil a = 9 dan b = 2 dengan membaca f(f(x)) seolah f(x) sendiri. Pilihan C, 7, memakai a = 3 lalu salah menyelesaikan 4b = 8 sebagai b = 4. Pilihan E, 4, mengambil a = −3 (b = −4) yang dilarang oleh syarat a positif.',
    alasan: 'a² = 9, a = 3; 4b = 8, b = 2.',
  },
  {
    // cek: (2*2 - 3)**2 === 1
    id: 'gf-x03',
    tingkat: 'sangat sulit',
    pertanyaan: 'Grafik y = x² mula-mula digeser 3 satuan ke kanan, BARU kemudian dikenai penggantian x menjadi 2x. Rumus akhirnya adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-2, 6, -1, 10], nama: ['y = x²'] },
    pilihan: ['y = 4(x − 3)²', 'y = (2x + 3)²', 'y = 2(x − 3)²', 'y = (x − 6)²', 'y = (2x − 3)²'],
    benar: 4,
    langkah: [
      'Langkah pertama, geser y = x² sebanyak 3 satuan ke kanan: ganti x dengan x − 3, diperoleh y = (x − 3)². Titik baliknya (3, 0).',
      'Langkah kedua, ganti x dengan 2x pada hasil terakhir: y = (2x − 3)². Titik baliknya sekarang saat 2x − 3 = 0, yaitu x = 3/2.',
      'Perhatikan bahwa urutan menentukan hasil: bila x diganti 2x dulu lalu digeser 3 ke kanan, hasilnya y = (2(x − 3))² = (2x − 6)² dengan titik balik (3, 0), berbeda.',
      {
        teks: 'Perhatikan sketsa berikut: titik balik berpindah dari (0, 0) ke (3, 0), lalu dimampatkan mendatar menjadi (3/2, 0).',
        gambar: { jenis: 'grafik', fungsi: ['x*x', '(x - 3)*(x - 3)', '(2*x - 3)*(2*x - 3)'], jangkauan: [-2, 6, -1, 10], titik: [{ x: 0, y: 0, label: '(0, 0)' }, { x: 3, y: 0, label: '(3, 0)' }, { x: 1.5, y: 0, label: '(3/2, 0)' }], nama: ['y = x²', 'y = (x − 3)²', 'y = (2x − 3)²'] },
      },
      'Pemeriksaan: pada y = (2x − 3)², x = 2 memberi y = 1; titik (2, 1) memang berjarak 1/2 dari titik balik 3/2 dengan tinggi (2 · 1/2)² = 1.',
      'Jadi, rumus akhirnya adalah y = (2x − 3)². (Jawaban E)',
    ],
    jebakan: 'Pilihan D, y = (x − 6)², keliru: penggantian x menjadi 2x memampatkan grafik, bukan menggeser. Pilihan A, 4(x − 3)², sama dengan (2(x − 3))², yaitu hasil urutan yang terbalik (mampatkan dulu baru geser). Pilihan C mengalikan y dengan 2, bukan x.',
    alasan: 'x² → (x − 3)² → (2x − 3)².',
  },
  {
    // cek: 6*6 - 36 === 0 && (-6)*(-6) - 36 === 0
    id: 'gf-x05',
    tingkat: 'sangat sulit',
    pertanyaan: 'Grafik y = x² + mx + 9 menyinggung sumbu-X. Nilai m yang memenuhi adalah…',
    pilihan: ['6 saja', '3 atau −3', '6 atau −6', '9 atau −9', '0 saja'],
    benar: 2,
    langkah: [
      'Grafik menyinggung sumbu-X berarti mempunyai tepat satu titik persekutuan dengan sumbu-X, sehingga diskriminannya nol: D = 0.',
      'Karena y = x² + mx + 9, berarti a = 1, b = m, c = 9, sehingga D = m² − 4(1)(9) = m² − 36.',
      'Dari m² − 36 = 0 diperoleh (m − 6)(m + 6) = 0, sehingga m = 6 atau m = −6.',
      {
        teks: 'Pemeriksaan: m = 6 memberi y = (x + 3)² yang menyinggung di (−3, 0), dan m = −6 memberi y = (x − 3)² yang menyinggung di (3, 0), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x + 6*x + 9', 'x*x - 6*x + 9'], jangkauan: [-6, 6, -1, 10], titik: [{ x: -3, y: 0, label: '(-3, 0)' }, { x: 3, y: 0, label: '(3, 0)' }], nama: ['m = 6', 'm = −6'] },
      },
      'Jadi, nilai m yang memenuhi adalah 6 atau −6. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 6 saja, membuang akar negatif dari m² = 36; kedua nilai sah. Pilihan B, 3 atau −3, mengakarkan 9 alih-alih 36 (lupa faktor 4a). Pilihan D, 9 atau −9, mengira m² = 81.',
    alasan: 'D = m² − 36 = 0.',
  },
  {
    // cek: (2*2 - 4*(-1)*(-3)) < 0
    id: 'gf-x07',
    tingkat: 'sangat sulit',
    pertanyaan: 'Grafik y = ax² + bx + c terbuka ke bawah, tidak memotong sumbu-X, dan memotong sumbu-y di bawah sumbu-X. Tanda a, c, dan D berturut-turut adalah…',
    gambar: { jenis: 'grafik', fungsi: ['-x*x + 2*x - 3'], jangkauan: [-3, 5, -10, 3] },
    pilihan: ['a < 0, c < 0, D < 0', 'a > 0, c < 0, D > 0', 'a < 0, c > 0, D < 0', 'a > 0, c > 0, D < 0', 'a < 0, c < 0, D > 0'],
    benar: 0,
    langkah: [
      'Arah bukaan parabola ditentukan oleh tanda a: terbuka ke bawah berarti a < 0.',
      'Titik potong dengan sumbu-y adalah (0, c); memotong sumbu-y di bawah sumbu-X berarti c < 0.',
      'Banyaknya titik potong dengan sumbu-X ditentukan oleh diskriminan: tidak memotong sumbu-X berarti D < 0.',
      {
        teks: 'Perhatikan sketsa contoh y = −x² + 2x − 3: a = −1 < 0, c = −3 < 0, D = 4 − 12 = −8 < 0; seluruh grafik berada di bawah sumbu-X (definit negatif).',
        gambar: { jenis: 'grafik', fungsi: ['-x*x + 2*x - 3'], jangkauan: [-3, 5, -10, 3], titik: [{ x: 0, y: -3, label: '(0, c), c < 0' }, { x: 1, y: -2, label: 'puncak (1, -2)' }], datar: [0] },
      },
      'Jadi, tanda a, c, dan D berturut-turut adalah a < 0, c < 0, D < 0. (Jawaban A)',
    ],
    jebakan: 'Pilihan E, D > 0, bertentangan dengan "tidak memotong sumbu-X": D > 0 malah berarti dua titik potong. Pilihan C, c > 0, mustahil di sini: parabola terbuka ke bawah yang memotong sumbu-y di atas sumbu-X pasti memotong sumbu-X dua kali. Pilihan B dan D membaca bukaan ke bawah sebagai a > 0.',
    alasan: 'Bukaan → a, titik (0, c) → c, titik potong sumbu-X → D.',
  },
  {
    // cek: 5*5 - 36 < 0 && 6*6 - 36 === 0
    id: 'gf-x08',
    tingkat: 'sangat sulit',
    pertanyaan: 'Fungsi f(x) = x² + mx + 9 selalu bernilai positif untuk semua x (definit positif). Nilai m yang memenuhi adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x + 2*x + 9', 'x*x + 6*x + 9', 'x*x + 8*x + 9'], jangkauan: [-9, 4, -9, 14], nama: ['m = 2', 'm = 6', 'm = 8'] },
    pilihan: ['m < −6 atau m > 6', 'm > 0', '−3 < m < 3', '−6 < m < 6', 'm ≠ 0'],
    benar: 3,
    langkah: [
      'Fungsi kuadrat selalu positif (definit positif) bila parabolanya terbuka ke atas (a > 0) DAN tidak menyentuh sumbu-X (D < 0).',
      'Karena f(x) = x² + mx + 9, berarti a = 1 > 0, sudah terpenuhi. Tinggal syarat D = m² − 4(1)(9) = m² − 36 < 0.',
      'Selesaikan m² − 36 < 0: (m − 6)(m + 6) < 0 dengan pembuat nol m = −6 dan m = 6. Uji tanda: m = 0 memberi (−6)(6) < 0 (memenuhi), m = 7 memberi (1)(13) > 0, m = −7 memberi (−13)(−1) > 0.',
      {
        teks: 'Daerah yang bertanda negatif adalah −6 < m < 6, seperti garis bilangan berikut.',
        gambar: { jenis: 'garis-bilangan', jangkauan: [-9, 9], titik: [{ x: -6, label: '-6', kosong: true }, { x: 6, label: '6', kosong: true }], selang: [{ dari: -9, sampai: -6, tanda: '+' }, { dari: -6, sampai: 6, tanda: '−', sorot: true }, { dari: 6, sampai: 9, tanda: '+' }] },
      },
      'Pemeriksaan pada gambar soal: m = 2 tidak menyentuh sumbu-X; m = 6 menyinggung di satu titik sehingga tidak lagi selalu positif (f(−3) = 0); m = 8 memotong sumbu-X dua kali.',
      'Jadi, nilai m yang memenuhi adalah −6 < m < 6. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, m < −6 atau m > 6, adalah daerah D > 0 (grafik memotong sumbu-X dua kali). Pilihan C, −3 < m < 3, mengakarkan 9 alih-alih 36. Pilihan B, m > 0, mengira tanda m menentukan bukaan; bukaan ditentukan oleh a.',
    alasan: 'a > 0 dan D = m² − 36 < 0.',
  },
  {
    // cek: -5*2*2 + 20*2 + 1 === 21
    id: 'gf-x09',
    tingkat: 'sangat sulit',
    pertanyaan: 'Tinggi bola (meter) setelah t detik mengikuti h(t) = −5t² + 20t + 1. Tinggi maksimum bola adalah…',
    gambar: { jenis: 'grafik', fungsi: ['-5*x*x + 20*x + 1'], jangkauan: [0, 4.5, 0, 25], nama: ['h(t) = −5t² + 20t + 1'] },
    pilihan: ['20 m', '2 m', '1 m', '41 m', '21 m'],
    benar: 4,
    langkah: [
      'Karena h(t) = −5t² + 20t + 1, berarti a = −5, b = 20, c = 1. Karena a < 0, parabola terbuka ke bawah sehingga titik baliknya adalah titik maksimum.',
      'Saat mencapai tinggi maksimum: t_p = −b/(2a) = −20/(2 · (−5)) = −20/(−10) = 2 detik.',
      'Substitusikan t = 2: h(2) = −5(4) + 20(2) + 1 = −20 + 40 + 1 = 21.',
      'Cara 2: h maksimum = −D/(4a) = −(400 − 4(−5)(1))/(4 · (−5)) = −420/(−20) = 21, sama.',
      {
        teks: 'Perhatikan sketsa berikut: bola naik sampai 21 m pada detik ke-2, lalu turun.',
        gambar: { jenis: 'grafik', fungsi: ['-5*x*x + 20*x + 1'], jangkauan: [0, 4.5, 0, 25], titik: [{ x: 2, y: 21, label: '(2, 21)' }], tegak: [2], datar: [21] },
      },
      'Jadi, tinggi maksimum bola adalah 21 m. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 20 m, lupa menambahkan tinggi awal 1 m (suku c). Pilihan B, 2 m, adalah WAKTU mencapai puncak (t = 2 detik), bukan tingginya. Pilihan D, 41 m, salah tanda: −5(2)² = −20, bukan +20.',
    alasan: 't_p = 2, h(2) = 21.',
  },
  {
    // cek: -1 + 2 + 3 === 4 && 0 + 0 + 3 === 3 && -1*1 - 2 + 3 === 0 && -9 + 6 + 3 === 0
    id: 'gf-x18',
    tingkat: 'sangat sulit',
    pertanyaan: 'Perhatikan grafik fungsi kuadrat y = f(x) berikut. Diberikan pernyataan: (1) a < 0; (2) f(0) = 3; (3) sumbu simetrinya x = 1; (4) f(x) > 0 untuk x < −1 atau x > 3. Pernyataan yang benar adalah…',
    gambar: { jenis: 'grafik', fungsi: ['-x*x + 2*x + 3'], jangkauan: [-3, 5, -6, 6], titik: [{ x: 1, y: 4, label: '(1, 4)' }, { x: -1, y: 0, label: '-1' }, { x: 3, y: 0, label: '3' }, { x: 0, y: 3, label: '(0, 3)' }] },
    pilihan: ['(1), (2), dan (4)', '(1), (2), dan (3)', '(1) dan (3)', '(2), (3), dan (4)', 'semua benar'],
    benar: 1,
    langkah: [
      'Baca grafik: parabola terbuka ke bawah, berpuncak di (1, 4), memotong sumbu-X di x = −1 dan x = 3, serta memotong sumbu-y di (0, 3).',
      'Periksa pernyataan (1): terbuka ke bawah berarti a < 0. Benar. Pemeriksaan lewat rumus: dari pembuat nol, f(x) = a(x + 1)(x − 3), dan f(0) = −3a = 3 memberi a = −1, sehingga f(x) = −x² + 2x + 3.',
      'Periksa pernyataan (2): f(0) adalah ordinat titik potong dengan sumbu-y, yaitu 3. Benar.',
      'Periksa pernyataan (3): sumbu simetri melalui puncak, x = 1, tepat di tengah −1 dan 3. Benar.',
      {
        teks: 'Periksa pernyataan (4): f(x) > 0 saat grafik berada DI ATAS sumbu-X, yaitu di antara kedua pembuat nol, −1 < x < 3; untuk x < −1 atau x > 3 grafik malah di bawah sumbu-X. Salah.',
        gambar: { jenis: 'grafik', fungsi: ['-x*x + 2*x + 3'], jangkauan: [-3, 5, -6, 6], titik: [{ x: -1, y: 0, label: '-1' }, { x: 3, y: 0, label: '3' }], arsir: [{ dari: -1, sampai: 3, label: 'f(x) > 0' }], datar: [0] },
      },
      'Jadi, pernyataan yang benar adalah (1), (2), dan (3). (Jawaban B)',
    ],
    jebakan: 'Pilihan E, semua benar, menerima pernyataan (4) karena pola "x < x₁ atau x > x₂" terasa akrab; pola itu berlaku bagi parabola terbuka ke ATAS. Pilihan C, (1) dan (3), meragukan f(0) = 3 padahal grafik jelas memotong sumbu-y di 3. Pilihan D membaca bukaan ke bawah sebagai a > 0.',
    alasan: 'f(x) = −x² + 2x + 3; (4) salah karena f > 0 malah di −1 < x < 3.',
  },
  {
    // cek: 36 - 4*(5 - (-4)) === 0 && 3*3 - 4*3 + 5 === 2*3 - 4
    id: 'gf-x19',
    tingkat: 'sangat sulit',
    pertanyaan: 'Garis y = 2x + k menyinggung parabola y = x² − 4x + 5. Nilai k adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x - 4*x + 5'], jangkauan: [-1, 7, -4, 10], nama: ['y = x² − 4x + 5'] },
    pilihan: ['4', '−4', '−9', '5', '−1'],
    benar: 1,
    langkah: [
      'Garis menyinggung parabola bila keduanya mempunyai tepat satu titik persekutuan. Samakan ordinatnya: x² − 4x + 5 = 2x + k.',
      'Susun menjadi persamaan kuadrat dalam x: x² − 6x + (5 − k) = 0. Tepat satu titik persekutuan berarti persamaan ini berakar kembar, yaitu D = 0.',
      'D = (−6)² − 4(1)(5 − k) = 36 − 20 + 4k = 16 + 4k. Dari 16 + 4k = 0 diperoleh k = −4.',
      'Titik singgungnya diperoleh dari akar kembar x = −b/(2a) = 6/2 = 3, dengan y = 2(3) − 4 = 2; pada parabola, 9 − 12 + 5 = 2, cocok.',
      {
        teks: 'Perhatikan sketsa berikut: garis y = 2x − 4 menyentuh parabola tepat di (3, 2) tanpa memotongnya.',
        gambar: { jenis: 'grafik', fungsi: ['x*x - 4*x + 5', '2*x - 4'], jangkauan: [-1, 7, -4, 10], titik: [{ x: 3, y: 2, label: 'titik singgung (3, 2)' }], nama: ['y = x² − 4x + 5', 'y = 2x − 4'] },
      },
      'Jadi, nilai k adalah −4. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 4, salah tanda saat menyelesaikan 16 + 4k = 0. Pilihan C, −9, menghitung −4(5 − k) sebagai −20 − 4k, salah tanda pada −4 · (−k). Pilihan D, 5, mengira garis harus melalui titik potong parabola dengan sumbu-y.',
    alasan: 'x² − 6x + (5 − k) = 0 berakar kembar: D = 16 + 4k = 0.',
  },
  {
    // cek: 4*9 - 4*(3 + 6) === 0 && 4*4 - 4*(-2 + 6) === 0
    id: 'gf-x12',
    tingkat: 'sangat sulit',
    pertanyaan: 'Grafik y = x² − 2kx + k + 6 menyinggung sumbu-X. Nilai k yang memenuhi adalah…',
    pilihan: ['k = 3 saja', 'k = −3 atau k = 2', 'k = 6', 'k = 0 atau k = 1', 'k = 3 atau k = −2'],
    benar: 4,
    langkah: [
      'Menyinggung sumbu-X berarti D = 0. Karena y = x² − 2kx + k + 6, berarti a = 1, b = −2k, c = k + 6.',
      'D = (−2k)² − 4(1)(k + 6) = 4k² − 4k − 24. Dari 4k² − 4k − 24 = 0, bagi dengan 4: k² − k − 6 = 0.',
      'Faktorkan: cari dua bilangan yang hasil kalinya −6 dan jumlahnya −1, yaitu −3 dan 2, sehingga (k − 3)(k + 2) = 0 dan k = 3 atau k = −2.',
      {
        teks: 'Pemeriksaan: k = 3 memberi y = x² − 6x + 9 = (x − 3)², menyinggung di (3, 0); k = −2 memberi y = x² + 4x + 4 = (x + 2)², menyinggung di (−2, 0), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x - 6*x + 9', 'x*x + 4*x + 4'], jangkauan: [-5, 6, -1, 10], titik: [{ x: 3, y: 0, label: '(3, 0)' }, { x: -2, y: 0, label: '(-2, 0)' }], nama: ['k = 3', 'k = −2'] },
      },
      'Jadi, nilai k yang memenuhi adalah k = 3 atau k = −2. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, k = −3 atau k = 2, membalik tanda pembuat nol dari faktor (k − 3)(k + 2). Pilihan A, k = 3 saja, membuang akar negatif tanpa alasan; k = −2 juga sah. Pilihan C, k = 6, mengira c = 0.',
    alasan: 'D = 4k² − 4k − 24 = 0 → (k − 3)(k + 2) = 0.',
  },
  {
    // cek: Math.abs((4 + 4 - 1)/3 - 7/3) < 1e-9 && Math.abs(2*(7/3) + (-2/3) - 4) < 1e-9 && Math.abs(2*(-2/3) + 7/3 - 1) < 1e-9
    id: 'gf-x13',
    tingkat: 'sangat sulit',
    pertanyaan: 'Fungsi f memenuhi 2f(x) + f(1 − x) = x² untuk setiap bilangan real x. Nilai f(2) adalah…',
    pilihan: ['4/3', '7/3', '4', '2', '5/3'],
    benar: 1,
    langkah: [
      'Persamaan berlaku untuk setiap x. Substitusikan x = 2: 2f(2) + f(1 − 2) = 2², yaitu 2f(2) + f(−1) = 4.',
      'Substitusikan x = −1 supaya f(−1) dan f(2) muncul lagi (karena 1 − (−1) = 2): 2f(−1) + f(2) = (−1)² = 1.',
      {
        teks: 'Misalkan p = f(2) dan q = f(−1), sehingga diperoleh sistem dua persamaan: 2p + q = 4 dan p + 2q = 1.',
        gambar: { jenis: 'tabel', kepala: ['Substitusi', 'Persamaan yang diperoleh', 'Dengan p = f(2), q = f(−1)'], baris: [['x = 2', '2f(2) + f(−1) = 4', '2p + q = 4'], ['x = −1', '2f(−1) + f(2) = 1', 'p + 2q = 1']], kolomBaru: [1, 2] },
      },
      'Kalikan persamaan pertama dengan 2: 4p + 2q = 8. Kurangkan dengan persamaan kedua: 3p = 7, sehingga p = 7/3 (dan q = 4 − 14/3 = −2/3).',
      'Pemeriksaan: 2(7/3) + (−2/3) = 12/3 = 4, cocok untuk x = 2; 2(−2/3) + 7/3 = 3/3 = 1, cocok untuk x = −1.',
      'Jadi, nilai f(2) adalah 7/3. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 4/3, menukar hasil eliminasi (mengambil 3p = 4). Pilihan D, 2, membagi 4 dengan 2 seolah f(−1) = 0. Pilihan C, 4, mengira f(2) = 2² tanpa memperhatikan suku f(1 − x).',
    alasan: 'Substitusi x = 2 dan x = −1, lalu eliminasi: f(2) = 7/3.',
  },
  {
    // cek: 3 + 2 * 9 === 21
    id: 'gf-x14',
    tingkat: 'sangat sulit',
    pertanyaan: 'Fungsi f memenuhi f(x + 1) = f(x) + 2 untuk semua x, dan f(1) = 3. Nilai f(10) adalah…',
    pilihan: ['20', '21', '23', '12', '30'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa f(x + 1) = f(x) + 2 berarti setiap kali x bertambah 1, nilai f bertambah 2: nilai-nilai f pada bilangan bulat membentuk barisan aritmetika dengan beda 2.',
      {
        teks: 'Lengkapi tabelnya mulai dari f(1) = 3: f(2) = 5, f(3) = 7, f(4) = 9, dan seterusnya.',
        gambar: { jenis: 'tabel', kepala: ['x', '1', '2', '3', '4', '…', '10'], baris: [['f(x)', '3', '5', '7', '9', '…', '21']], kolomBaru: [2, 3, 4, 5, 6] },
      },
      'Dari 1 ke 10 ada 9 kali penambahan, sehingga f(10) = 3 + 9 × 2 = 21.',
      'Secara umum, f(n) = 3 + 2(n − 1) = 2n + 1 untuk n bulat positif, sehingga f(10) = 2(10) + 1 = 21, sama.',
      'Jadi, nilai f(10) adalah 21. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, 23, menghitung 10 kali penambahan (3 + 20); dari 1 ke 10 hanya ada 9 langkah. Pilihan A, 20, menghitung 2 × 10 tanpa suku awal. Pilihan E, 30, mengalikan f(1) dengan 10.',
    alasan: 'Barisan aritmetika beda 2: f(10) = 3 + 9 · 2 = 21.',
  },
  {
    // cek: Math.abs(3*3 - 4) === 5 && Math.abs((-3)*(-3) - 4) === 5 && 9 + 9 === 18
    id: 'gf-x15',
    tingkat: 'sangat sulit',
    pertanyaan: 'Jumlah kuadrat semua nilai x yang memenuhi |x² − 4| = 5 adalah…',
    pilihan: ['9', '18', '0', '6', '10'],
    benar: 1,
    langkah: [
      'Ingat bahwa |u| = 5 berarti u = 5 atau u = −5. Dengan u = x² − 4 diperoleh dua kasus.',
      'Kasus 1: x² − 4 = 5, maka x² = 9, sehingga x = 3 atau x = −3.',
      'Kasus 2: x² − 4 = −5, maka x² = −1, yang tidak mempunyai penyelesaian real (kuadrat bilangan real tidak pernah negatif).',
      {
        teks: 'Perhatikan sketsa berikut: garis y = 5 memotong grafik y = |x² − 4| hanya di x = −3 dan x = 3; bagian tengah grafik (yang dilipat ke atas) paling tinggi hanya 4, tidak sampai 5.',
        gambar: { jenis: 'grafik', fungsi: ['Math.abs(x*x - 4)', '5'], jangkauan: [-4, 4, -1, 12], titik: [{ x: 3, y: 5, label: '3' }, { x: -3, y: 5, label: '-3' }, { x: 0, y: 4, label: '(0, 4)' }], nama: ['y = |x² − 4|', 'y = 5'] },
      },
      'Jumlah kuadrat semua penyelesaian: 3² + (−3)² = 9 + 9 = 18.',
      'Jadi, jumlah kuadrat semua nilai x yang memenuhi adalah 18. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 9, hanya menghitung x = 3 dan lupa x = −3. Pilihan C, 0, menjumlahkan 3 + (−3) tanpa dikuadratkan. Pilihan E, 10, memasukkan x² = 1 dari kasus kedua, padahal x² = −1 tidak punya penyelesaian real.',
    alasan: 'x² = 9 (x = ±3); x² = −1 tak ada; 9 + 9 = 18.',
  },
  {
    // cek: Math.abs((1 + Math.sqrt(9)) - (1 - Math.sqrt(9))) === 6 && (-2)*4 === -8
    id: 'gf-x16',
    tingkat: 'sangat sulit',
    pertanyaan: 'Parabola y = x² − 2x + c memotong sumbu-X di dua titik yang berjarak 6 satuan. Nilai c adalah…',
    pilihan: ['8', '−3', '3', '−8', '−9'],
    benar: 3,
    langkah: [
      'Misalkan pembuat nolnya x₁ dan x₂ dengan x₂ − x₁ = 6. Karena y = x² − 2x + c, berarti a = 1, b = −2, sehingga x₁ + x₂ = 2 dan x₁x₂ = c.',
      'Kedua titik potong simetris terhadap sumbu simetri x = −b/(2a) = 1, masing-masing berjarak 3 dari garis itu, sehingga x₁ = 1 − 3 = −2 dan x₂ = 1 + 3 = 4.',
      'Dengan demikian, c = x₁x₂ = (−2)(4) = −8.',
      'Cara 2: jarak kedua akar dinyatakan oleh √D/|a| = 6, sehingga D = 36: (−2)² − 4(1)c = 4 − 4c = 36, diperoleh c = −8, sama.',
      {
        teks: 'Perhatikan sketsa berikut: kedua titik potong berjarak 3 satuan di kiri dan kanan sumbu simetri x = 1, dan titik baliknya (1, −9).',
        gambar: { jenis: 'grafik', fungsi: ['x*x - 2*x - 8'], jangkauan: [-4, 6, -10, 6], titik: [{ x: -2, y: 0, label: '(-2, 0)' }, { x: 4, y: 0, label: '(4, 0)' }, { x: 1, y: -9, label: '(1, -9)' }], tegak: [1] },
      },
      'Jadi, nilai c adalah −8. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 8, salah tanda hasil kali (−2)(4). Pilihan E, −9, mengira jarak 6 berarti c = −(6/2)²; itu hanya berlaku bila sumbu simetrinya x = 0. Pilihan C, 3, mengambil setengah jarak sebagai jawaban.',
    alasan: 'Akar −2 dan 4 (simetris terhadap x = 1): c = −8.',
  },
  {
    // cek: 5 * 3 ** 2 === 45 && 5 * 3 ** 3 === 135
    id: 'gf-x17',
    tingkat: 'sangat sulit',
    pertanyaan: 'Fungsi eksponen f(x) = a · bˣ melalui (0, 5) dan (2, 45). Nilai f(3) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['5 * 3 ** x'], jangkauan: [-1, 3.5, -10, 150], titik: [{ x: 0, y: 5, label: '(0, 5)' }, { x: 2, y: 45, label: '(2, 45)' }] },
    pilihan: ['90', '135', '65', '405', '125'],
    benar: 1,
    langkah: [
      'Substitusikan (0, 5): f(0) = a · b⁰ = a = 5.',
      'Substitusikan (2, 45): 5 · b² = 45, sehingga b² = 9 dan b = 3 (bilangan pokok eksponen diambil positif).',
      'Dengan demikian, f(x) = 5 · 3ˣ, sehingga f(3) = 5 · 27 = 135.',
      {
        teks: 'Pemeriksaan: tiap x bertambah 1, nilai f dikalikan 3: 5, 15, 45, 135.',
        gambar: { jenis: 'tabel', kepala: ['x', '0', '1', '2', '3'], baris: [['f(x)', '5', '15', '45', '135']], kolomBaru: [2, 4] },
      },
      'Jadi, nilai f(3) adalah 135. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 90, mengalikan 45 dengan 2, mengira b = 2. Pilihan C, 65, menambah 20 tiap langkah (pola linear 5, 25, 45, 65), padahal fungsinya eksponen. Pilihan D, 405, adalah f(4).',
    alasan: 'a = 5, b = 3: f(3) = 5 · 27 = 135.',
  },
]

/**
 * Paket kuis bab: 10 soal yang konsepnya diajarkan materi bab ini, dengan
 * materi asalnya (ARYA 20 Sep 2026). Dikurasi dengan membaca soal dan
 * bacaan materinya; soal bank lain tetap di menu Latihan. Urutan soal dan
 * pilihannya diacak di peramban. Pemeriksa: `node alat/cek_kuis_bab.mjs`.
 */
export const KUIS_BAB: ButirKuisBab[] = [
  { id: 'gf-m01', materi: 'grafik-bercerita' },
  { id: 'gf-m02', materi: 'potret-aturan' },
  { id: 'gf-m03', materi: 'bentuk-puncak' },
  { id: 'gf-s02', materi: 'bentuk-umum' },
  { id: 'gf-s03', materi: 'menyusun-parabola' },
  { id: 'gf-s04', materi: 'geser-cermin-regang' },
  { id: 'gf-m06', materi: 'eksponen' },
  { id: 'gf-m07', materi: 'logaritma' },
  { id: 'gf-s09', materi: 'fungsi-rasional' },
  { id: 'gf-s10', materi: 'invers' },
]
