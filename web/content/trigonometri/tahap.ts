/**
 * Trigonometri — 10 tahap belajar, urut dari KONSEP menuju rumus.
 *
 * Rancangannya: docs/superpowers/specs/2026-08-31-trigonometri-alur-belajar.md
 *
 * BENTUK PENJELASAN (permintaan ARYA, revisi 31 Agu):
 * Isinya tetap lengkap, tapi JANGAN berupa tembok paragraf seperti cerpen.
 * Dipecah jadi blok yang bisa dipindai mata: paragraf pendek, daftar poin,
 * kalimat kunci yang disorot, dan kotak contoh berhitung.
 *
 * Kotak "Sering keliru" tetap di BAWAH, setelah siswa paham — bukan menyambut
 * di halaman depan. Kata "miskonsepsi" tidak dipakai; itu istilah guru.
 */

export type Widget = 'bayangan' | 'segitiga-sebangun' | 'penamaan-sisi'

/** Satu potongan penjelasan. Bentuknya sengaja beragam supaya tidak monoton. */
export type Blok =
  | { jenis: 'paragraf'; teks: string }
  /** daftar poin; tiap butir boleh diawali "Label — isi" untuk ditebalkan */
  | { jenis: 'poin'; judul?: string; butir: string[] }
  /** satu kalimat kunci yang ditonjolkan */
  | { jenis: 'sorot'; teks: string }
  /** kotak contoh berhitung, tiap baris satu langkah */
  | { jenis: 'contoh'; judul: string; baris: string[]; simpul?: string }

export type Tahap = {
  no: number
  slug: string
  judul: string
  pertanyaan: string
  labelPendek: string
  penjelasan: Blok[]
  seringKeliru?: { judul: string; isi: string; sumber?: string }
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
    intisari: [
      'Ada panjang yang tidak bisa diukur langsung.',
      'Tapi jarak di tanah dan sudut selalu mudah diukur.',
      'Trigonometri menukar sudut menjadi panjang.',
      'Buktinya sudah ada di halaman rumah: bayangan.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Ambil meteran, ukur meja. Gampang. Sekarang coba ukur tinggi pohon kelapa di depan rumah — meteran Anda tidak sampai, dan memanjatnya bukan ide bagus.' },
      {
        jenis: 'poin',
        judul: 'Yang tidak bisa diukur langsung',
        butir: [
          'Tinggi pohon atau gedung — terlalu tinggi untuk dijangkau',
          'Lebar sungai — arusnya deras, tidak bisa diseberangi',
          'Jarak kapal dari pantai — tidak ada pijakan di antaranya',
          'Jarak Bumi ke Bulan — tidak perlu dijelaskan',
        ],
      },
      {
        jenis: 'poin',
        judul: 'Tapi dua hal ini selalu mudah',
        butir: [
          'Jarak mendatar di atas tanah — tinggal direntang meteran',
          'Sudut — cukup busur derajat, bahkan aplikasi ponsel bisa',
        ],
      },
      { jenis: 'sorot', teks: 'Trigonometri adalah ilmu yang menukar sudut menjadi panjang.' },
      { jenis: 'paragraf', teks: 'Petunjuk pertamanya sudah ada di halaman rumah Anda: bayangan. Coba bandingkan pohon dengan diri Anda sendiri, pada jam yang sama.' },
      {
        jenis: 'contoh',
        judul: 'Bayangan di siang yang sama',
        baris: [
          'Pohon:  tinggi 10 m,  bayangan 8 m       →  10 ÷ 8 = 1,25',
          'Anda:   tinggi 1,6 m, bayangan 1,28 m    →  1,6 ÷ 1,28 = 1,25',
        ],
        simpul: 'Angkanya sama persis. Bukan kebetulan.',
      },
      { jenis: 'paragraf', teks: 'Sebabnya: matahari begitu jauh sehingga sinarnya sampai ke pohon dan ke Anda dengan sudut yang praktis sama. Sudut sama, perbandingan sama.' },
      { jenis: 'sorot', teks: 'Sudut yang sama memberi perbandingan yang sama — tidak peduli objeknya pohon, orang, atau menara.' },
      {
        jenis: 'poin',
        judul: 'Jadi tinggi pohon bisa dihitung tanpa memanjat',
        butir: [
          'Ukur bayangan pohon',
          'Ukur tinggi dan bayangan Anda sendiri',
          'Bagi tinggi Anda dengan bayangan Anda — dapat angka perbandingannya',
          'Kalikan angka itu dengan bayangan pohon',
        ],
      },
      { jenis: 'paragraf', teks: 'Sisa bab ini menggali satu kalimat itu sampai dalam. Sin, cos, dan tan yang nanti muncul hanyalah nama untuk perbandingan-perbandingan tersebut.' },
    ],
    seringKeliru: {
      judul: 'Dikira sekadar hafalan sin-cos-tan',
      isi: 'Trigonometri sering dianggap daftar rumus yang harus dihafal untuk lulus ujian. Padahal ia lahir dari kebutuhan praktis: mengukur yang tidak terjangkau. Astronom Yunani memakainya untuk memperkirakan jarak ke Bulan lebih dari dua ribu tahun lalu — jauh sebelum ada kalkulator.',
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
    intisari: [
      'Segitiga sebangun: bentuk sama, ukuran berbeda.',
      'Panjang sisinya berubah, hasil baginya tidak.',
      'Sebabnya: pembilang dan penyebut dikali angka yang sama.',
      'Maka perbandingan hanya bergantung pada sudut.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Tahap 1 berakhir pada satu dugaan: sudut yang sama memberi perbandingan yang sama. Sekarang kita buktikan.' },
      {
        jenis: 'poin',
        judul: 'Dua segitiga sebangun',
        butir: [
          'Sudutnya sama persis',
          'Bentuknya identik — seperti foto yang sama dicetak di dua ukuran kertas',
          'Hanya ukurannya yang berbeda',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Ukur keduanya, lalu bagi',
        baris: [
          'Segitiga kecil:  depan 1,8 cm,  samping 2,4 cm  →  1,8 ÷ 2,4 = 0,75',
          'Segitiga besar:  depan 3 cm,    samping 4 cm    →  3 ÷ 4 = 0,75',
        ],
        simpul: 'Panjangnya berbeda jauh. Hasil baginya sama persis.',
      },
      { jenis: 'sorot', teks: 'Diperbesar 4 kali? Pembilang dikali 4, penyebut dikali 4. Pada pembagian, keduanya saling menghapus.' },
      {
        jenis: 'poin',
        judul: 'Akibatnya',
        butir: [
          'Panjang bergantung pada ukuran — tidak bisa dijadikan patokan',
          'Perbandingan tidak bergantung pada ukuran — hanya pada sudut',
          'Satu sudut, satu angka — berlaku untuk semua segitiga siku-siku di dunia',
        ],
      },
      {
        jenis: 'poin',
        judul: 'Coba sendiri di gambar sebelah kiri',
        butir: [
          'Tarik titik puncak menyamping — dua angka pertama berubah, angka bawah diam',
          'Tarik ke atas atau ke bawah — baru angka bawah ikut bergerak, karena sudutnya berubah',
        ],
      },
      { jenis: 'paragraf', teks: 'Karena hasil baginya hanya bergantung pada sudut, angka itu bisa dihitung sekali lalu dibukukan. Itulah yang tersimpan di dalam kalkulator Anda — dan ia memang tidak perlu tahu segitiga mana yang Anda maksud.' },
    ],
    seringKeliru: {
      judul: '“tan 37° itu angka mati dari kalkulator”',
      isi: 'Nilai tan, sin, dan cos sering dianggap angka hafalan yang disimpan pabrik di dalam mesin. Padahal itu hasil bagi dua sisi. Justru karena tidak bergantung pada ukuran segitiga, ia bisa disimpan.',
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
    intisari: [
      'Sisi miring: menghadap sudut siku-siku, namanya tetap.',
      'Sisi depan: di seberang sudut yang dilihat.',
      'Sisi samping: menempel pada sudut itu.',
      'Pindah sudut → depan dan samping bertukar.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Sebelum bisa membicarakan perbandingan, kita perlu cara menyebut sisi mana yang dibagi sisi mana. Muncullah tiga nama.' },
      {
        jenis: 'poin',
        judul: 'Tiga nama sisi',
        butir: [
          'Sisi miring — menghadap sudut siku-siku, selalu terpanjang, namanya tidak pernah berubah',
          'Sisi depan — tepat di seberang sudut yang sedang dilihat, tidak menyentuhnya sama sekali',
          'Sisi samping — menempel pada sudut itu, tapi bukan sisi miring',
        ],
      },
      { jenis: 'sorot', teks: 'Nama sisi ditentukan oleh SUDUT yang dirujuk — bukan oleh posisinya di gambar.' },
      { jenis: 'paragraf', teks: 'Di sinilah siswa paling sering tersandung. Segitiga siku-siku punya dua sudut lancip. Pindah dari sudut yang satu ke sudut yang lain, sisi depan dan sisi samping bertukar tempat.' },
      {
        jenis: 'contoh',
        judul: 'Segitiga ABC, siku-siku di B',
        baris: [
          'Dari sudut A:   depan = BC,   samping = AB,   miring = AC',
          'Dari sudut C:   depan = AB,   samping = BC,   miring = AC',
        ],
        simpul: 'Garisnya tidak bergerak sedikit pun. Yang berubah hanya dari mana kita memandang.',
      },
      {
        jenis: 'poin',
        judul: 'Kenapa ini perlu satu tahap sendiri',
        butir: [
          'Semua perhitungan setelah ini bertumpu padanya',
          'Salah menentukan sisi depan → salah membagi → jawaban salah, meskipun caranya benar',
          'Kesalahan ini paling sering terjadi dan paling sering luput, karena kelihatannya sepele',
        ],
      },
      { jenis: 'paragraf', teks: 'Klik sudut A atau C di gambar sebelah kiri untuk merasakan pertukaran itu sendiri.' },
    ],
    seringKeliru: {
      judul: 'Nama sisi dikira melekat pada garisnya',
      isi: 'Banyak siswa menghafal “yang tegak itu sisi depan” lalu memakainya untuk semua soal. Begitu segitiganya diputar atau sudut yang ditanya berpindah, hafalan itu langsung menyesatkan.',
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
    penjelasan: [{ jenis: 'paragraf', teks: 'Tahap ini sedang disiapkan.' }], siap: false,
  },
  {
    no: 5, slug: 'lingkaran-satuan', judul: 'Lingkaran satuan',
    labelPendek: 'Lingkaran satuan',
    pertanyaan: 'Kenapa jari-jari 1 menyederhanakan segalanya?',
    penjelasan: [{ jenis: 'paragraf', teks: 'Tahap ini sedang disiapkan.' }], siap: false,
  },
  {
    no: 6, slug: 'enam-rasio', judul: 'Enam rasio sebagai panjang nyata',
    labelPendek: 'Enam rasio',
    pertanyaan: 'Di mana letak tan, cot, sec, dan csc pada gambarnya?',
    penjelasan: [{ jenis: 'paragraf', teks: 'Tahap ini sedang disiapkan.' }], siap: false,
  },
  {
    no: 7, slug: 'sudut-istimewa', judul: 'Sudut istimewa',
    labelPendek: 'Sudut istimewa',
    pertanyaan: 'Kenapa 30°, 45°, dan 60° disebut istimewa?',
    penjelasan: [{ jenis: 'paragraf', teks: 'Tahap ini sedang disiapkan.' }], siap: false,
  },
  {
    no: 8, slug: 'grafik-sin', judul: 'Terbentuknya grafik sinus',
    labelPendek: 'Grafik sin',
    pertanyaan: 'Bagaimana putaran berubah menjadi gelombang?',
    penjelasan: [{ jenis: 'paragraf', teks: 'Tahap ini sedang disiapkan.' }], siap: false,
  },
  {
    no: 9, slug: 'tiga-grafik', judul: 'Sin, cos, dan tan berdampingan',
    labelPendek: 'Tiga grafik',
    pertanyaan: 'Kenapa grafik tan punya jurang, sedangkan sin dan cos tidak?',
    penjelasan: [{ jenis: 'paragraf', teks: 'Tahap ini sedang disiapkan.' }], siap: false,
  },
  {
    no: 10, slug: 'dunia-nyata', judul: 'Dipakai di dunia nyata',
    labelPendek: 'Dunia nyata',
    pertanyaan: 'Di gawai yang Anda pegang sekarang, di mana trigonometrinya?',
    penjelasan: [{ jenis: 'paragraf', teks: 'Tahap ini sedang disiapkan.' }], siap: false,
  },
]

export const cariTahap = (slug: string) => TAHAP.find((t) => t.slug === slug)
