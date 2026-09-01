/**
 * Bank soal kuis Trigonometri: 32 soal.
 *
 * KENAPA 32 DAN BUKAN 8 (permintaan ARYA, 1 Sep 2026):
 * Dengan 8 soal tetap, siswa yang mengulang kuis bertemu soal yang sama persis
 * dan yang diuji berubah menjadi ingatan terhadap kunci jawaban, bukan paham.
 * Sekarang tiap sesi mengambil 8 soal dari 32, dan pengambilannya MENGHINDARI
 * soal yang sudah pernah keluar (lihat `ambilSoal` di lib/acak.ts), jadi empat
 * sesi pertama tidak akan mengulang satu soal pun.
 *
 * Sengaja BUKAN empat paket berisi 8 soal. Paket membuat urutannya ikut hafal,
 * dan peluang bertemu soal yang sama tetap 1 banding 4.
 *
 * TINGKAT KESULITAN sengaja dinaikkan dibanding delapan soal lama, yang
 * kebanyakan hanya menanyakan definisi. Di sini campurannya: definisi yang
 * harus dipahami, hitungan dua langkah, tanda di tiap kuadran, membaca grafik,
 * dan soal cerita yang harus diterjemahkan dulu ke gambar.
 *
 * Semua soal TULISAN SENDIRI, tidak menyalin dari buku mana pun, jadi tidak
 * ada keterangan sumber (aturan proyek: soal salinan wajib bersumber).
 * Cakupannya dibatasi pada apa yang benar-benar diajarkan di materi 1 sampai
 * 10; identitas sudut ganda dan aturan sinus/kosinus sengaja TIDAK dipakai
 * karena belum pernah diperkenalkan.
 *
 * Seluruh jawaban numerik sudah diperiksa ulang dengan hitungan mesin
 * (skrip periksa di manim/../ tidak diperlukan: lihat catatan PROGRESS.md).
 */

/*
 * Bentuk `TingkatKuis` dan `SoalKuis` dipakai bersama semua topik, jadi tinggal
 * di `content/tipe.ts` sejak 1 September 2026.
 */
export type { TingkatKuis, SoalKuis } from '@/content/tipe'
import type { SoalKuis } from '@/content/tipe'

export const KUIS: SoalKuis[] = [
  // ---------------------------------------------------------------- mudah
  {
    id: 'k01',
    tingkat: 'mudah',
    pertanyaan: 'Pada segitiga siku-siku, sisi yang menghadap sudut siku-siku disebut sisi…',
    pilihan: ['depan', 'samping', 'miring', 'alas', 'tegak'],
    benar: 2,
    alasan: 'Sisi miring selalu yang menghadap sudut siku-siku, dan selalu sisi terpanjang.',
  },
  {
    id: 'k02',
    tingkat: 'mudah',
    pertanyaan: 'sin θ adalah perbandingan antara…',
    pilihan: ['depan : samping', 'depan : miring', 'samping : miring', 'miring : depan', 'samping : depan'],
    benar: 1,
    alasan: 'sin θ = depan : miring. Yang "depan : samping" itu tan, "samping : miring" itu cos.',
  },
  {
    id: 'k03',
    tingkat: 'mudah',
    pertanyaan: 'Nilai tan 45° adalah…',
    pilihan: ['0,5', '1', '√2', '√3', '0'],
    benar: 1,
    alasan:
      'Pada sudut 45° sisi depan dan sisi samping sama panjang, jadi hasil baginya 1. Inilah kenapa segitiga 45° selalu sama kaki.',
  },
  {
    id: 'k04',
    tingkat: 'mudah',
    pertanyaan: 'Segitiga siku-siku dengan sisi depan 3 cm dan sisi miring 5 cm. Nilai sin θ =',
    pilihan: ['0,6', '0,8', '0,75', '1,67', '0,375'],
    benar: 0,
    alasan: 'sin θ = depan : miring = 3 : 5 = 0,6. Yang 0,8 itu cos θ, karena sisi sampingnya 4.',
  },
  {
    id: 'k05',
    tingkat: 'mudah',
    pertanyaan: 'Pada lingkaran satuan, titik di ujung jari-jari yang membentuk sudut θ berkoordinat…',
    pilihan: ['(sin θ, cos θ)', '(cos θ, sin θ)', '(tan θ, 1)', '(1, tan θ)', '(θ, sin θ)'],
    benar: 1,
    alasan:
      'Mendatar dulu baru tegak: (cos θ, sin θ). Tertukar adalah kekeliruan paling sering, dan akibatnya semua tanda kuadran ikut salah.',
  },
  {
    id: 'k06',
    tingkat: 'mudah',
    pertanyaan: 'Satu putaran penuh sama dengan…',
    pilihan: ['π radian', '2π radian', '180 radian', '360 radian', 'π/2 radian'],
    benar: 1,
    alasan: 'Satu putaran = 360° = 2π radian. Setengah putaran (180°) yang sama dengan π radian.',
  },
  {
    id: 'k07',
    tingkat: 'mudah',
    pertanyaan: 'Nilai cos 0° adalah…',
    pilihan: ['0', '0,5', '1', '√3/2', 'tidak terdefinisi'],
    benar: 2,
    alasan:
      'Pada sudut 0° titik lingkaran satuan ada di (1, 0). Koordinat mendatarnya 1, jadi cos 0° = 1 dan sin 0° = 0.',
  },
  {
    id: 'k08',
    tingkat: 'mudah',
    pertanyaan: 'Nilai terbesar yang mungkin dicapai sin θ adalah…',
    pilihan: ['1', '90', '180', 'tak terhingga', '0,5'],
    benar: 0,
    alasan:
      'sin θ adalah tinggi titik pada lingkaran BERJARI-JARI SATU, jadi tidak mungkin lebih dari 1. Yang 90 itu sudutnya, bukan nilainya.',
  },

  // --------------------------------------------------------------- sedang
  {
    id: 'k09',
    tingkat: 'sedang',
    pertanyaan:
      'Segitiga siku-siku dengan sisi depan 5 cm dan sisi samping 12 cm. Nilai sin θ =',
    pilihan: ['0,385', '0,417', '0,923', '2,400', '0,600'],
    benar: 0,
    alasan:
      'Cari miringnya dulu: √(5² + 12²) = 13. Baru sin θ = 5 : 13 ≈ 0,385. Yang 0,417 itu tan θ = 5 : 12, jebakan bagi yang lupa mencari miring.',
  },
  {
    id: 'k10',
    tingkat: 'sedang',
    pertanyaan: 'Jika θ sudut lancip dan sin θ = 0,6, maka cos θ =',
    pilihan: ['0,4', '0,6', '0,8', '1,6', '0,36'],
    benar: 2,
    alasan:
      'Dari sin² θ + cos² θ = 1: cos² θ = 1 − 0,36 = 0,64, jadi cos θ = 0,8. Yang 0,4 datang dari mengira 1 − 0,6, padahal yang berjumlah 1 adalah kuadratnya.',
  },
  {
    id: 'k11',
    tingkat: 'sedang',
    pertanyaan: 'Jika cos θ = 0,5 maka sec θ =',
    pilihan: ['0,5', '1', '2', '−0,5', '0,25'],
    benar: 2,
    alasan: 'sec θ = 1 : cos θ = 1 : 0,5 = 2. Sekan adalah kebalikan kosinus, bukan lawan tandanya.',
  },
  {
    id: 'k12',
    tingkat: 'sedang',
    pertanyaan: 'Periode grafik y = sin x adalah…',
    pilihan: ['90°', '180°', '270°', '360°', '720°'],
    benar: 3,
    alasan:
      'Kurva sinus mengulang persis setelah satu putaran penuh, yaitu 360°. Yang 180° adalah periode tangen.',
  },
  {
    id: 'k13',
    tingkat: 'sedang',
    pertanyaan: 'Pada kuadran II (sudut antara 90° dan 180°), tanda sin θ dan cos θ berturut-turut…',
    pilihan: [
      'positif dan positif',
      'positif dan negatif',
      'negatif dan positif',
      'negatif dan negatif',
      'nol dan negatif',
    ],
    benar: 1,
    alasan:
      'Di kuadran II titiknya ada di kiri atas: tegaknya masih ke atas (sin positif), mendatarnya sudah ke kiri (cos negatif).',
  },
  {
    id: 'k14',
    tingkat: 'sedang',
    pertanyaan: 'Sudut 60° sama dengan…',
    pilihan: ['π/6 radian', 'π/4 radian', 'π/3 radian', 'π/2 radian', '2π/3 radian'],
    benar: 2,
    alasan: '180° = π radian, jadi 60° = π × 60/180 = π/3. Yang π/6 itu 30°.',
  },
  {
    id: 'k15',
    tingkat: 'sedang',
    pertanyaan: 'Nilai maksimum grafik y = 3 sin x adalah…',
    pilihan: ['1', '3', '6', '360', '0,33'],
    benar: 1,
    alasan:
      'sin x paling besar bernilai 1, jadi 3 sin x paling besar 3. Angka 3 di depan itulah amplitudonya.',
  },
  {
    id: 'k16',
    tingkat: 'sedang',
    pertanyaan: 'Sebuah tangga sepanjang 5 m bersandar ke dinding membentuk sudut 60° dengan tanah. Tinggi ujung tangga dari tanah kira-kira…',
    pilihan: ['2,50 m', '2,89 m', '4,33 m', '5,77 m', '10,00 m'],
    benar: 2,
    alasan:
      'Tinggi = sisi depan sudut 60° = 5 × sin 60° = 5 × 0,866 ≈ 4,33 m. Yang 2,50 m keluar kalau tanpa sengaja memakai cos 60°, itu jarak kaki tangga ke dinding.',
  },
  {
    id: 'k17',
    tingkat: 'sedang',
    pertanyaan: 'cot θ adalah perbandingan…',
    pilihan: ['depan : samping', 'samping : depan', 'miring : depan', 'miring : samping', 'samping : miring'],
    benar: 1,
    alasan:
      'cot θ = 1 : tan θ = samping : depan. Yang "miring : depan" itu kosekan, "miring : samping" itu sekan.',
  },
  {
    id: 'k18',
    tingkat: 'sedang',
    pertanyaan: 'Dua segitiga sebangun. Segitiga kedua tiga kali lebih besar. Nilai cos θ pada segitiga kedua…',
    pilihan: ['tiga kali lipat', 'sepertiganya', 'sama saja', 'sembilan kali lipat', 'tidak bisa ditentukan'],
    benar: 2,
    alasan:
      'Inti seluruh bab ini. Sisi samping dan sisi miring sama-sama dikali 3, jadi hasil baginya tidak berubah: 3a : 3b = a : b.',
  },

  // ---------------------------------------------------------------- sulit
  {
    id: 'k19',
    tingkat: 'sulit',
    pertanyaan: 'Jika θ sudut lancip dan tan θ = 3/4, maka sin θ =',
    pilihan: ['0,60', '0,75', '0,80', '1,25', '0,43'],
    benar: 0,
    alasan:
      'tan θ = depan : samping = 3 : 4, jadi miringnya √(3² + 4²) = 5. Maka sin θ = 3 : 5 = 0,6. Yang 0,75 adalah nilai tan-nya sendiri.',
  },
  {
    id: 'k20',
    tingkat: 'sulit',
    pertanyaan: 'Nilai sin 150° adalah…',
    pilihan: ['0,5', '−0,5', '0,866', '−0,866', '0'],
    benar: 0,
    alasan:
      '150° ada di kuadran II, tingginya sama dengan tinggi pada 30°, dan di kuadran II sin masih positif. Jadi sin 150° = sin 30° = 0,5.',
  },
  {
    id: 'k21',
    tingkat: 'sulit',
    pertanyaan: 'Nilai tan 120° adalah…',
    pilihan: ['1,73', '−1,73', '0,58', '−0,58', 'tidak terdefinisi'],
    benar: 1,
    alasan:
      'Di kuadran II sin positif dan cos negatif, jadi tan yang merupakan hasil baginya bernilai negatif. Besarnya sama dengan tan 60° = √3 ≈ 1,73, jadi tan 120° ≈ −1,73.',
  },
  {
    id: 'k22',
    tingkat: 'sulit',
    pertanyaan: 'Periode grafik y = sin 2x adalah…',
    pilihan: ['90°', '180°', '360°', '720°', '2°'],
    benar: 1,
    alasan:
      'Angka 2 membuat sudutnya berjalan dua kali lebih cepat, jadi satu gelombang penuh selesai dalam separuh waktu: 360° : 2 = 180°.',
  },
  {
    id: 'k23',
    tingkat: 'sulit',
    pertanyaan: 'Tiang setinggi 12 m. Sudut elevasi matahari 30°. Panjang bayangan tiang kira-kira…',
    pilihan: ['6,0 m', '10,4 m', '13,9 m', '20,8 m', '24,0 m'],
    benar: 3,
    alasan:
      'tan 30° = tinggi : bayangan, jadi bayangan = 12 : tan 30° = 12 : 0,577 ≈ 20,8 m. Matahari yang rendah membuat bayangan LEBIH PANJANG dari tiangnya, itu tanda jawabannya masuk akal.',
  },
  {
    id: 'k24',
    tingkat: 'sulit',
    pertanyaan: 'Pada sudut berapa saja tan θ tidak terdefinisi, untuk 0° ≤ θ < 360°?',
    pilihan: ['0° dan 180°', '90° dan 270°', '45° dan 225°', '180° saja', '90° saja'],
    benar: 1,
    alasan:
      'tan θ = sin θ : cos θ, dan penyebutnya nol saat cos θ = 0, yaitu di 90° dan 270°. Di situlah grafik tangen melompat ke tak terhingga.',
  },
  {
    id: 'k25',
    tingkat: 'sulit',
    pertanyaan: 'Jika sin θ = 0,8 dan θ berada di kuadran II, maka cos θ =',
    pilihan: ['0,6', '−0,6', '0,2', '−0,2', '−0,8'],
    benar: 1,
    alasan:
      'Besarnya tetap dari sin² + cos² = 1, yaitu 0,6. Tapi di kuadran II cos bertanda negatif, jadi −0,6. Menjawab 0,6 berarti lupa memeriksa kuadrannya.',
  },
  {
    id: 'k26',
    tingkat: 'sulit',
    pertanyaan: 'Nilai cos 180° adalah…',
    pilihan: ['1', '0', '−1', '0,5', '−0,5'],
    benar: 2,
    alasan:
      'Pada 180° titik lingkaran satuan ada di (−1, 0). Koordinat mendatarnya −1, jadi cos 180° = −1 dan sin 180° = 0.',
  },

  // -------------------------------------------------------- sangat sulit
  {
    id: 'k27',
    tingkat: 'sangat sulit',
    pertanyaan: 'Berapa banyak sudut θ pada 0° ≤ θ < 360° yang memenuhi sin θ = 0,5?',
    pilihan: ['satu', 'dua', 'tiga', 'empat', 'tak terhingga'],
    benar: 1,
    alasan:
      'Ada dua, yaitu 30° dan 150°. Garis mendatar pada ketinggian 0,5 memotong satu gelombang sinus tepat dua kali, sekali saat naik dan sekali saat turun.',
  },
  {
    id: 'k28',
    tingkat: 'sangat sulit',
    pertanyaan: 'Grafik y = 4 cos(3x) memiliki amplitudo dan periode berturut-turut…',
    pilihan: ['4 dan 360°', '4 dan 120°', '3 dan 120°', '3 dan 360°', '12 dan 120°'],
    benar: 1,
    alasan:
      'Angka di depan menentukan tingginya (amplitudo 4), angka di dalam kurung menentukan kecepatannya: periode = 360° : 3 = 120°. Keduanya sering tertukar.',
  },
  {
    id: 'k29',
    tingkat: 'sangat sulit',
    pertanyaan:
      'Dari puncak menara setinggi 40 m, sebuah kapal terlihat dengan sudut depresi 25°. Jarak mendatar kapal dari kaki menara kira-kira…',
    pilihan: ['16,9 m', '18,7 m', '44,1 m', '85,8 m', '94,6 m'],
    benar: 3,
    alasan:
      'Sudut depresi dari atas sama besar dengan sudut elevasi dari bawah. tan 25° = 40 : jarak, jadi jarak = 40 : 0,466 ≈ 85,8 m. Yang 18,7 m keluar kalau memakai 40 × tan 25°, itu membalik letak pembilang dan penyebut.',
  },
  {
    id: 'k30',
    tingkat: 'sangat sulit',
    pertanyaan: 'Nilai dari sin² 40° + cos² 40° adalah…',
    pilihan: ['0', '0,5', '1', '1,64', 'bergantung pada sudutnya'],
    benar: 2,
    alasan:
      'Selalu 1, berapa pun sudutnya. Ini teorema Pythagoras pada segitiga di dalam lingkaran satuan: sisi miringnya selalu 1.',
  },
  {
    id: 'k31',
    tingkat: 'sangat sulit',
    pertanyaan:
      'Sebuah roda berputar dan tinggi satu titik di tepinya mengikuti y = 2 sin x meter dari sumbu. Selisih antara titik tertinggi dan terendah adalah…',
    pilihan: ['1 m', '2 m', '4 m', '6,28 m', '360 m'],
    benar: 2,
    alasan:
      'Tertingginya +2 dan terendahnya −2, jadi selisihnya 4 m. Menjawab 2 m berarti membaca amplitudo saja, padahal yang ditanya jarak dari puncak ke lembah.',
  },
  {
    id: 'k32',
    tingkat: 'sangat sulit',
    pertanyaan: 'Jika tan θ = 1 dan 0° ≤ θ < 360°, nilai θ yang mungkin adalah…',
    pilihan: ['45° saja', '45° dan 135°', '45° dan 225°', '135° dan 315°', '45°, 135°, 225°, dan 315°'],
    benar: 2,
    alasan:
      'tan bernilai positif saat sin dan cos bertanda sama, yaitu di kuadran I dan III. Jadi 45° dan 225°. Di kuadran II dan IV tandanya berbeda sehingga tan-nya negatif.',
  },
]
