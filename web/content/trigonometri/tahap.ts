/**
 * Trigonometri — 10 tahap belajar, urut dari KONSEP menuju rumus.
 *
 * Rancangannya: docs/superpowers/specs/2026-08-31-trigonometri-alur-belajar.md
 *
 * DUA ATURAN dari ARYA yang mengikat berkas ini:
 *
 * 1. JANGAN MEMAMPATKAN PENJELASAN. Ada siswa yang belajar dengan membaca dan
 *    ada yang dengan menonton. `penjelasan` ditulis untuk yang membaca — utuh,
 *    bukan poin-poin telegrafis. Kalau ragu, tulis lebih panjang.
 *
 * 2. Kotak "Sering keliru" ada di BAWAH, setelah siswa paham. Bukan di atas.
 *    Menyambut siswa dengan "kamu mungkin salah paham" itu menghakimi sebelum
 *    mengajar, dan kata "miskonsepsi" sendiri asing bagi siswa.
 */

export type Widget = 'bayangan' | 'segitiga-sebangun' | 'penamaan-sisi'

export type Tahap = {
  no: number
  slug: string
  judul: string
  /** pertanyaan pemantik, dipakai sebagai subjudul */
  pertanyaan: string
  /** label pendek untuk daftar tahap di panggung kiri */
  labelPendek: string
  /** paragraf penjelasan lengkap — untuk siswa yang belajar dengan membaca */
  penjelasan: string[]
  /** ditampilkan sebagai kotak tips DI BAWAH penjelasan */
  seringKeliru?: { judul: string; isi: string; sumber?: string }
  /** intisari yang bisa dibaca sekilas sebelum atau sesudah membaca panjang */
  intisari?: string[]
  widget?: Widget
  video?: { berkas: string; poster: string }
  siap: boolean
}

export const TAHAP: Tahap[] = [
  /* ================================================================= */
  {
    no: 1,
    slug: 'kenapa',
    judul: 'Kenapa kita butuh trigonometri',
    labelPendek: 'Kenapa',
    pertanyaan: 'Bagaimana mengukur sesuatu yang tidak bisa kita sentuh?',
    penjelasan: [
      'Ambil meteran, ukur meja. Gampang. Sekarang coba ukur tinggi pohon kelapa di depan rumah. Meteran Anda tidak sampai, dan memanjatnya bukan ide bagus.',
      'Masalah yang sama muncul di mana-mana. Berapa tinggi gedung itu? Berapa lebar sungai yang arusnya deras? Seberapa jauh kapal itu dari pantai? Berapa jarak Bumi ke Bulan? Semuanya tidak bisa didekati, apalagi dilingkari meteran.',
      'Tapi ada dua hal yang hampir selalu mudah diukur, bahkan dari tempat kita berdiri: jarak mendatar di atas tanah, dan sudut. Sudut bisa diukur dengan busur derajat sederhana, atau bahkan dengan aplikasi di ponsel.',
      'Trigonometri adalah ilmu yang menukar sudut menjadi panjang. Kalau kita tahu sudutnya dan tahu satu sisi, kita bisa menghitung sisi-sisi lain yang tidak terjangkau. Itu saja isinya — dan itu sudah cukup untuk mengukur gunung, memetakan laut, dan mendaratkan pesawat.',
      'Petunjuk pertamanya sudah ada di halaman rumah Anda: bayangan. Siang hari, pohon setinggi 10 meter menjatuhkan bayangan sepanjang 8 meter. Pada saat yang sama, Anda yang tingginya 1,6 meter menjatuhkan bayangan 1,28 meter.',
      'Bagi tinggi dengan bayangannya. Pohon: 10 ÷ 8 = 1,25. Anda: 1,6 ÷ 1,28 = 1,25. Angkanya sama. Bukan kebetulan — matahari begitu jauh sehingga sinarnya sampai ke pohon dan ke Anda dengan sudut yang praktis sama.',
      'Di situlah pintunya terbuka. Kalau sudutnya sama, perbandingan tinggi terhadap bayangan juga sama — tidak peduli objeknya pohon, orang, atau menara. Jadi cukup ukur bayangan pohon, ukur tinggi dan bayangan Anda sendiri, lalu hitung. Tinggi pohon ketemu tanpa memanjat sebatang pun.',
      'Sisa bab ini pada dasarnya menggali satu kalimat itu sampai dalam: sudut yang sama memberi perbandingan yang sama. Sin, cos, dan tan yang nanti Anda temui hanyalah nama untuk perbandingan-perbandingan itu.',
    ],
    intisari: [
      'Ada panjang yang tidak bisa diukur langsung: tinggi pohon, lebar sungai, jarak kapal.',
      'Yang mudah diukur: jarak di tanah, dan sudut.',
      'Trigonometri menukar sudut menjadi panjang.',
      'Petunjuknya ada pada bayangan: sudut yang sama memberi perbandingan yang sama.',
    ],
    seringKeliru: {
      judul: 'Dikira sekadar hafalan sin-cos-tan',
      isi: 'Banyak yang mengira trigonometri adalah daftar rumus yang harus dihafal untuk lulus ujian. Padahal ia lahir dari kebutuhan praktis: mengukur yang tidak terjangkau. Astronom Yunani memakainya untuk memperkirakan jarak ke Bulan lebih dari dua ribu tahun lalu, jauh sebelum ada kalkulator.',
    },
    widget: 'bayangan',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 2,
    slug: 'perbandingan-tetap',
    judul: 'Perbandingan yang tidak berubah',
    labelPendek: 'Perbandingan',
    pertanyaan: 'Kenapa sudut yang sama selalu memberi angka yang sama?',
    penjelasan: [
      'Tahap sebelumnya berakhir pada satu dugaan: sudut yang sama memberi perbandingan yang sama. Sekarang kita buktikan, dan lihat kenapa itu masuk akal.',
      'Gambar sebuah segitiga siku-siku. Tandai salah satu sudut lancipnya, sebut saja theta. Sekarang gambar segitiga siku-siku kedua yang lebih besar, tapi dengan sudut theta yang sama persis. Dua segitiga seperti ini disebut sebangun — bentuknya identik, hanya ukurannya berbeda, seperti foto yang sama dicetak di dua ukuran kertas.',
      'Ukur kedua segitiga itu. Panjang sisinya jelas berbeda: yang besar bisa dua kali, lima kali, atau seratus kali yang kecil. Tapi begitu Anda membagi satu sisi dengan sisi lainnya, hasilnya sama persis.',
      'Alasannya sederhana kalau dilihat dari sisi pembesaran. Kalau segitiga diperbesar empat kali, semua sisinya dikali empat. Pembilang dikali empat, penyebut juga dikali empat — dan pada pembagian, kedua faktor itu saling menghapus. Empat per empat sama dengan satu.',
      'Inilah kenapa perbandingan begitu berharga. Panjang bergantung pada ukuran, jadi tidak bisa dijadikan patokan. Perbandingan tidak bergantung pada ukuran, jadi ia hanya bergantung pada sudutnya. Satu sudut, satu angka — berlaku untuk semua segitiga siku-siku di dunia yang punya sudut itu.',
      'Coba sendiri lewat alat di sebelah kiri. Tarik titik puncaknya menyamping untuk membesarkan segitiga. Perhatikan dua angka pertama berubah terus, sementara angka di baris paling bawah diam. Baru kalau Anda menarik ke atas atau ke bawah — yang berarti mengubah sudutnya — angka itu ikut bergerak.',
      'Dan justru karena hasil baginya hanya bergantung pada sudut, angka itu bisa dihitung sekali lalu dibukukan. Itulah yang tersimpan di dalam kalkulator Anda. Ia tidak pernah tahu segitiga mana yang sedang Anda maksud, dan memang tidak perlu tahu.',
    ],
    intisari: [
      'Segitiga sebangun: bentuk sama, ukuran berbeda.',
      'Panjang sisinya berubah, tapi hasil bagi antar sisinya tidak.',
      'Sebabnya: pembesaran mengalikan pembilang dan penyebut dengan angka yang sama.',
      'Maka perbandingan hanya bergantung pada sudut — bukan pada ukuran.',
    ],
    seringKeliru: {
      judul: '“tan 37° itu angka mati dari kalkulator”',
      isi: 'Nilai tan, sin, dan cos sering dianggap angka hafalan yang disimpan pabrik di dalam mesin. Padahal itu hasil bagi dua sisi. Ia bisa disimpan justru karena tidak bergantung pada ukuran segitiganya.',
      sumber: 'Buku Panduan Guru Matematika Kelas X, Bab 4 — “membuktikan sinus dan cosinus suatu sudut berupa rasio, bukan nilai tetap”',
    },
    widget: 'segitiga-sebangun',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 3,
    slug: 'menamai-sisi',
    judul: 'Menamai sisi',
    labelPendek: 'Menamai sisi',
    pertanyaan: 'Kenapa sisi yang sama bisa berganti nama?',
    penjelasan: [
      'Sebelum bisa membicarakan perbandingan, kita perlu cara menyebut sisi mana yang dibagi sisi mana. Di sinilah muncul tiga nama: sisi depan, sisi samping, dan sisi miring.',
      'Sisi miring paling mudah. Ia selalu sisi yang menghadap sudut siku-siku, dan selalu yang terpanjang. Namanya tidak pernah berubah, apa pun yang terjadi.',
      'Dua sisi lainnya tidak sesetia itu. Nama mereka bergantung pada sudut mana yang sedang kita bicarakan.',
      'Sisi depan adalah sisi yang berada tepat di seberang sudut yang sedang dilihat — sisi yang tidak menyentuh sudut itu sama sekali. Sisi samping adalah sisi yang menempel pada sudut itu, tapi bukan sisi miring.',
      'Sekarang bagian yang sering membuat siswa tersandung. Segitiga siku-siku punya dua sudut lancip. Kalau kita pindah dari sudut yang satu ke sudut yang lain, sisi depan dan sisi samping bertukar tempat. Sisi yang tadi disebut depan kini jadi samping, dan sebaliknya.',
      'Bayangkan segitiga ABC yang siku-siku di titik B. Dilihat dari sudut A, sisi depannya adalah BC dan sisi sampingnya AB. Tapi dilihat dari sudut C, justru AB yang jadi sisi depan dan BC yang jadi sisi samping. Sisinya sama, garisnya tidak bergerak sedikit pun — yang berubah hanya dari mana kita memandang.',
      'Klik salah satu sudut di gambar sebelah kiri untuk merasakan pertukaran itu sendiri.',
      'Kenapa ini penting sampai perlu satu tahap sendiri? Karena semua perhitungan setelah ini bertumpu padanya. Salah menentukan sisi depan berarti salah membagi, dan jawaban yang keluar akan salah meskipun cara menghitungnya sudah benar. Kesalahan seperti ini paling sering terjadi, dan paling sering luput karena kelihatannya sepele.',
    ],
    intisari: [
      'Sisi miring: selalu menghadap sudut siku-siku, selalu terpanjang, namanya tetap.',
      'Sisi depan: di seberang sudut yang sedang dilihat, tidak menyentuhnya.',
      'Sisi samping: menempel pada sudut itu, tapi bukan sisi miring.',
      'Pindah sudut → depan dan samping bertukar. Sisi miring tidak.',
    ],
    seringKeliru: {
      judul: 'Nama sisi dikira melekat pada garisnya',
      isi: 'Banyak siswa menghafal “yang tegak itu sisi depan” lalu memakainya untuk semua soal. Padahal nama sisi ditentukan oleh sudut yang dirujuk, bukan oleh posisinya di gambar. Begitu segitiganya diputar atau sudut yang ditanya berpindah, hafalan itu langsung menyesatkan.',
      sumber: 'Buku Panduan Guru Matematika Kelas X, Bab 4 — kunci jawaban Latihan 4.1 nomor 2',
    },
    widget: 'penamaan-sisi',
    siap: true,
  },

  /* ============ tahap yang belum dibangun — ditulis jujur ============ */
  {
    no: 4, slug: 'lahirnya-sin-cos-tan', judul: 'Lahirnya sin, cos, dan tan',
    labelPendek: 'sin cos tan',
    pertanyaan: 'Dari mana ketiga nama itu datang?',
    penjelasan: ['Tahap ini sedang disiapkan.'], siap: false,
  },
  {
    no: 5, slug: 'lingkaran-satuan', judul: 'Lingkaran satuan',
    labelPendek: 'Lingkaran satuan',
    pertanyaan: 'Kenapa jari-jari 1 menyederhanakan segalanya?',
    penjelasan: ['Tahap ini sedang disiapkan.'], siap: false,
  },
  {
    no: 6, slug: 'enam-rasio', judul: 'Enam rasio sebagai panjang nyata',
    labelPendek: 'Enam rasio',
    pertanyaan: 'Di mana letak tan, cot, sec, dan csc pada gambarnya?',
    penjelasan: ['Tahap ini sedang disiapkan.'], siap: false,
  },
  {
    no: 7, slug: 'sudut-istimewa', judul: 'Sudut istimewa',
    labelPendek: 'Sudut istimewa',
    pertanyaan: 'Kenapa 30°, 45°, dan 60° disebut istimewa?',
    penjelasan: ['Tahap ini sedang disiapkan.'], siap: false,
  },
  {
    no: 8, slug: 'grafik-sin', judul: 'Terbentuknya grafik sinus',
    labelPendek: 'Grafik sin',
    pertanyaan: 'Bagaimana putaran berubah menjadi gelombang?',
    penjelasan: ['Tahap ini sedang disiapkan.'], siap: false,
  },
  {
    no: 9, slug: 'tiga-grafik', judul: 'Sin, cos, dan tan berdampingan',
    labelPendek: 'Tiga grafik',
    pertanyaan: 'Kenapa grafik tan punya jurang, sedangkan sin dan cos tidak?',
    penjelasan: ['Tahap ini sedang disiapkan.'], siap: false,
  },
  {
    no: 10, slug: 'dunia-nyata', judul: 'Dipakai di dunia nyata',
    labelPendek: 'Dunia nyata',
    pertanyaan: 'Di gawai yang Anda pegang sekarang, di mana trigonometrinya?',
    penjelasan: ['Tahap ini sedang disiapkan.'], siap: false,
  },
]

export const cariTahap = (slug: string) => TAHAP.find((t) => t.slug === slug)
