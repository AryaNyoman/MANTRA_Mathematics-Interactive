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

export type Widget =
  | 'bayangan'
  | 'segitiga-sebangun'
  | 'penamaan-sisi'
  | 'pabrik-rasio'
  | 'lingkaran-satuan'
  | 'enam-rasio'
  | 'perjalanan-sudut'
  | 'lingkaran-ke-grafik'
  | 'tiga-grafik'
  | 'dunia-nyata'

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
    video: { berkas: 'tahap2-perbandingan-tetap.webm', poster: 'tahap2-perbandingan-tetap.jpg' },
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
    no: 4,
    slug: 'lahirnya-sin-cos-tan',
    judul: 'Lahirnya sin, cos, dan tan',
    labelPendek: 'sin cos tan',
    pertanyaan: 'Dari mana ketiga nama itu datang?',
    intisari: [
      'Tiga sisi bisa dipasangkan jadi enam pembagian berbeda.',
      'Keenamnya punya nama resmi — bukan cuma tiga.',
      'sin, cos, tan adalah tiga yang paling sering dipakai.',
      'Namanya datang dari sejarah, bukan dari logika matematika.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Kita sudah punya tiga sisi dengan nama masing-masing. Pertanyaan berikutnya sederhana: ada berapa cara membagi satu sisi dengan sisi lainnya?' },
      {
        jenis: 'poin',
        judul: 'Hitung dulu',
        butir: [
          'Pembilang — bebas pilih satu dari 3 sisi',
          'Penyebut — pilih satu dari 2 sisi yang tersisa',
          'Total — 3 × 2 = 6 pasangan yang berbeda',
        ],
      },
      { jenis: 'sorot', teks: 'Enam pembagian, enam nama. sin, cos, dan tan hanyalah tiga di antaranya.' },
      {
        jenis: 'contoh',
        judul: 'Keenamnya pada segitiga 3-4-5',
        baris: [
          'depan ÷ miring   =  3/5  =  0,600   →  sin θ   sinus',
          'samping ÷ miring =  4/5  =  0,800   →  cos θ   kosinus',
          'depan ÷ samping  =  3/4  =  0,750   →  tan θ   tangen',
          'miring ÷ depan   =  5/3  =  1,667   →  csc θ   kosekan',
          'miring ÷ samping =  5/4  =  1,250   →  sec θ   sekan',
          'samping ÷ depan  =  4/3  =  1,333   →  cot θ   kotangen',
        ],
        simpul: 'Tiga baris bawah adalah kebalikan tiga baris atas — pecahannya tinggal dibalik.',
      },
      {
        jenis: 'poin',
        judul: 'Kenapa hanya tiga yang diajarkan di SMA',
        butir: [
          'Tiga sisanya cuma kebalikan — bisa dihitung dari yang tiga',
          'Kalkulator pun biasanya hanya menyediakan tombol sin, cos, tan',
          'Tiga itu sudah cukup untuk hampir semua soal',
        ],
      },
      { jenis: 'paragraf', teks: 'Lalu dari mana nama-nama aneh itu datang? Jawabannya bukan matematika, tapi sejarah — dan salah satunya lahir dari salah terjemah.' },
      {
        jenis: 'poin',
        judul: 'Asal-usul namanya',
        butir: [
          'Sinus — berawal dari kata Sanskerta jya-ardha, artinya setengah tali busur. Diserap ke bahasa Arab jadi jiba, lalu keliru dibaca sebagai jaib yang berarti teluk atau lipatan. Penerjemah Latin memakai kata sinus, yang juga berarti teluk. Jadi nama itu sebenarnya kecelakaan penerjemahan',
          'Kosinus — dari complementi sinus, sinus dari sudut pelengkap. Pelengkap 30° adalah 60°, dan memang cos 30° sama dengan sin 60°',
          'Tangen — dari kata Latin tangens, yang menyentuh. Di tahap 6 Anda akan melihat ia benar-benar berupa garis yang menyentuh lingkaran',
        ],
      },
      { jenis: 'paragraf', teks: 'Coba sendiri di gambar sebelah kiri: pilih sisi mana yang jadi pembilang dan mana yang jadi penyebut, lalu lihat nama resminya muncul.' },
    ],
    seringKeliru: {
      judul: 'Dikira tiga rumus terpisah yang harus dihafal',
      isi: 'Ketiganya bukan rumus terpisah, melainkan tiga label untuk tiga pembagian dari kumpulan yang sama. Begitu panjang ketiga sisinya diketahui, keenam nilai itu bisa dihitung tanpa menghafal apa pun. Yang perlu diingat cuma sisi mana dibagi sisi mana.',
    },
    widget: 'pabrik-rasio',
    video: { berkas: 'tahap4-lahirnya-rasio.webm', poster: 'tahap4-lahirnya-rasio.jpg' },
    siap: true,
  },
  {
    no: 5,
    slug: 'lingkaran-satuan',
    judul: 'Lingkaran satuan',
    labelPendek: 'Lingkaran satuan',
    pertanyaan: 'Kenapa jari-jari 1 menyederhanakan segalanya?',
    intisari: [
      'Buat sisi miringnya tepat 1 satuan.',
      'Membagi dengan 1 tidak mengubah apa pun.',
      'Maka cos θ jadi koordinat mendatar, sin θ koordinat tegak.',
      'Rumus berubah menjadi posisi titik.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Sampai sini semua perbandingan masih berupa pecahan. Ada satu trik yang membuat dua di antaranya berhenti jadi pecahan sama sekali.' },
      { jenis: 'sorot', teks: 'Buat sisi miringnya tepat 1. Membagi dengan 1 tidak mengubah apa pun.' },
      {
        jenis: 'contoh',
        judul: 'Apa yang terjadi kalau miring = 1',
        baris: [
          'sin θ  =  depan ÷ miring    =  depan ÷ 1    =  depan',
          'cos θ  =  samping ÷ miring  =  samping ÷ 1  =  samping',
        ],
        simpul: 'Penyebutnya lenyap. Yang tersisa hanya panjang sisinya sendiri.',
      },
      { jenis: 'paragraf', teks: 'Sekarang letakkan segitiga itu di dalam lingkaran berjari-jari 1, sudutnya di pusat. Jari-jari lingkaran otomatis menjadi sisi miring — dan panjangnya selalu 1, ke arah mana pun ia menunjuk.' },
      {
        jenis: 'poin',
        judul: 'Akibatnya, untuk titik di lingkaran itu',
        butir: [
          'cos θ — persis koordinat mendatarnya, nilai x',
          'sin θ — persis koordinat tegaknya, nilai y',
          'Titiknya sendiri — selalu berada di (cos θ, sin θ)',
        ],
      },
      { jenis: 'sorot', teks: 'Rumus berubah jadi posisi. Tidak perlu membagi lagi — cukup dibaca dari letak titiknya.' },
      {
        jenis: 'poin',
        judul: 'Tiga hal yang langsung terlihat',
        butir: [
          'Nilai sin dan cos tidak pernah melebihi 1 atau kurang dari −1, karena titiknya tidak bisa keluar lingkaran',
          'Sudut boleh lebih dari 90° — segitiga tidak sanggup, lingkaran sanggup. Titiknya tinggal terus berputar',
          'Di kiri sumbu tegak cos jadi negatif, di bawah sumbu mendatar sin jadi negatif. Tandanya mengikuti arah, bukan aturan hafalan',
        ],
      },
      { jenis: 'paragraf', teks: 'Inilah alasan lingkaran satuan digambar di mana-mana. Ia bukan hiasan — ia mengubah tiga pecahan jadi satu titik yang bisa ditunjuk. Seret titik ungu di sebelah kiri dan perhatikan kedua angkanya bergerak.' },
    ],
    seringKeliru: {
      judul: 'Dikira topik terpisah dari segitiga siku-siku',
      isi: 'Banyak siswa memperlakukan lingkaran satuan sebagai bab baru yang harus dihafal sendiri. Padahal ia segitiga yang sama, hanya dengan sisi miring dipaksa bernilai 1 lalu diletakkan di pusat lingkaran. Tidak ada konsep baru — hanya penyederhanaan.',
    },
    widget: 'lingkaran-satuan',
    video: { berkas: 'tahap5-lingkaran-satuan.webm', poster: 'tahap5-lingkaran-satuan.jpg' },
    siap: true,
  },
  {
    no: 6,
    slug: 'enam-rasio',
    judul: 'Enam rasio sebagai panjang nyata',
    labelPendek: 'Enam rasio',
    pertanyaan: 'Di mana letak tan, cot, sec, dan csc pada gambarnya?',
    intisari: [
      'Keenam rasio bukan rumus — semuanya ruas garis yang bisa diukur.',
      'tan hidup di garis singgung x = 1, cot di garis singgung y = 1.',
      'sec dan csc adalah garis dari pusat yang menembus kedua singgung itu.',
      'Nama tangen memang berarti menyentuh.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Di tahap 4 kita menemukan enam pembagian. Di tahap 5 dua di antaranya berubah jadi koordinat. Sekarang pertanyaannya: di mana empat sisanya berada pada gambar?' },
      { jenis: 'sorot', teks: 'Jawabannya: keenamnya adalah ruas garis sungguhan pada lingkaran satuan. Tidak ada yang cuma rumus.' },
      {
        jenis: 'poin',
        judul: 'Dua yang sudah kita kenal',
        butir: [
          'cos θ — ruas mendatar dari pusat sampai kaki titik',
          'sin θ — ruas tegak dari kaki titik naik ke titiknya',
        ],
      },
      {
        jenis: 'poin',
        judul: 'Dua yang hidup di garis singgung',
        butir: [
          'tan θ — tarik garis tegak menyentuh lingkaran di x = 1. Perpanjang jari-jari sampai menabraknya. Tinggi tabrakan itulah tan θ',
          'cot θ — hal yang sama, tapi dengan garis mendatar yang menyentuh di y = 1',
        ],
      },
      { jenis: 'sorot', teks: 'Inilah asal nama tangen: tangens berarti “yang menyentuh”. Ia memang ruas pada garis singgung.' },
      {
        jenis: 'poin',
        judul: 'Dua yang menembus keluar',
        butir: [
          'sec θ — panjang jari-jari yang diperpanjang, dari pusat sampai menabrak garis singgung x = 1',
          'csc θ — dari pusat sampai menabrak garis singgung y = 1',
          'Keduanya selalu lebih panjang dari 1 — karena harus menembus keluar lingkaran dulu',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Pada sudut 45°',
        baris: [
          'sin 45°  =  0,707      cos 45°  =  0,707',
          'tan 45°  =  1,000      cot 45°  =  1,000',
          'sec 45°  =  1,414      csc 45°  =  1,414',
        ],
        simpul: 'Di 45° semuanya berpasangan kembar, karena segitiganya sama kaki.',
      },
      { jenis: 'paragraf', teks: 'Geser sudutnya di sebelah kiri, lalu klik nama rasio yang ingin disorot. Perhatikan tan memanjang tak terkendali saat sudut mendekati 90°, sementara cot justru menyusut — dan sebaliknya saat sudut mengecil.' },
    ],
    seringKeliru: {
      judul: 'sec dikira kebalikan sin',
      isi: 'Namanya mirip, jadi sering tertukar. Yang benar: sec adalah kebalikan cos, dan csc kebalikan sin. Cara mengingatnya lewat huruf ketiga — se-C-an berpasangan dengan C-osinus, ko-S-ekan dengan S-inus. Persis terbalik dari dugaan kebanyakan orang.',
    },
    widget: 'enam-rasio',
    video: { berkas: 'tahap6-enam-rasio.webm', poster: 'tahap6-enam-rasio.jpg' },
    siap: true,
  },
  {
    no: 7,
    slug: 'sudut-istimewa',
    judul: 'Sudut istimewa',
    labelPendek: 'Sudut istimewa',
    pertanyaan: 'Kenapa 30°, 45°, dan 60° disebut istimewa?',
    intisari: [
      'Istimewa bukan karena angkanya bagus.',
      'Ketiganya lahir dari dua bangun yang bisa digambar siapa pun.',
      'Nilainya EKSAK — pecahan dan akar, bukan desimal tak berujung.',
      'Sudut lain butuh kalkulator; ketiganya tidak.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Coba hitung sin 37° tanpa kalkulator. Tidak bisa. Tapi sin 30° bisa dijawab siapa pun yang pernah menggambar segitiga sama sisi. Di situlah letak keistimewaannya.' },
      { jenis: 'sorot', teks: 'Sudut istimewa bukan sudut yang angkanya bagus — tapi sudut yang nilainya bisa dihitung persis, tanpa alat.' },
      {
        jenis: 'poin',
        judul: '45° lahir dari persegi',
        butir: [
          'Gambar persegi dengan sisi 1, lalu potong sepanjang diagonalnya',
          'Muncul segitiga siku-siku dengan dua sisi sama panjang, keduanya 1',
          'Diagonalnya, lewat Pythagoras, panjangnya √2',
          'Karena kedua sisinya kembar, sin 45° dan cos 45° juga kembar, dan tan 45° tepat 1',
        ],
      },
      {
        jenis: 'poin',
        judul: '30° dan 60° lahir dari segitiga sama sisi',
        butir: [
          'Gambar segitiga sama sisi bersisi 2, lalu belah tepat di tengah',
          'Alasnya terpotong jadi 1, sisi miringnya tetap 2, dan tingginya √3',
          'Sudut 60° tetap utuh, sudut 30° adalah separuh dari yang dibelah',
          'Jadi sin 30° = 1/2 — tepat setengah, bukan kebetulan',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Nilai eksaknya',
        baris: [
          '          sin        cos        tan',
          '30°       1/2        √3/2       1/√3',
          '45°       √2/2       √2/2       1',
          '60°       √3/2       1/2        √3',
        ],
        simpul: 'Perhatikan 30° dan 60° tertukar nilainya — karena keduanya sudut pelengkap.',
      },
      {
        jenis: 'poin',
        judul: 'Kenapa ini berguna',
        butir: [
          'Jawaban ujian bisa ditulis persis, bukan angka desimal yang dibulatkan',
          'Kesalahan pembulatan tidak menumpuk pada perhitungan bertingkat',
          'Nilai di kuadran lain tinggal dicerminkan — tandanya berubah, besarnya tidak',
        ],
      },
      { jenis: 'paragraf', teks: 'Telusuri perjalanannya di sebelah kiri. Jari-jari berhenti di tiap sudut istimewa, dan nilai eksaknya muncul di bawah — lengkap dengan asal-usul bangunnya.' },
    ],
    seringKeliru: {
      judul: 'Tabel sudut istimewa dihafal mentah',
      isi: 'Banyak siswa menghafal tabelnya lalu lupa separuh saat ujian. Padahal cukup ingat dua bangun: persegi dibelah diagonal, dan segitiga sama sisi dibelah dua. Dari dua gambar itu seluruh tabel bisa disusun ulang dalam satu menit — dan kalau lupa, tinggal digambar lagi.',
    },
    widget: 'perjalanan-sudut',
    video: { berkas: 'tahap7-sudut-istimewa.webm', poster: 'tahap7-sudut-istimewa.jpg' },
    siap: true,
  },
  {
    no: 8,
    slug: 'grafik-sin',
    judul: 'Terbentuknya grafik sinus',
    labelPendek: 'Grafik sin',
    pertanyaan: 'Bagaimana putaran berubah menjadi gelombang?',
    intisari: [
      'Biarkan titiknya terus berputar, jangan berhenti.',
      'Catat tingginya pada setiap sudut.',
      'Catatan itulah kurva sinus.',
      'Gelombang bukan bentuk baru — ia rekaman tinggi sebuah putaran.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Sampai tahap 7 titiknya selalu kita hentikan di sudut tertentu. Sekarang biarkan ia terus berputar, dan catat tingginya sepanjang perjalanan.' },
      {
        jenis: 'poin',
        judul: 'Cara membacanya',
        butir: [
          'Sumbu mendatar grafik — bukan jarak, melainkan besar sudut yang sudah disapu',
          'Sumbu tegak grafik — tinggi titik di lingkaran pada sudut itu, yaitu sin θ',
          'Garis putus-putus — penghubung antara tinggi di lingkaran dan titik di grafik',
        ],
      },
      { jenis: 'sorot', teks: 'Kurva sinus adalah catatan tinggi sebuah titik yang berputar. Bukan bentuk baru yang perlu dihafal.' },
      {
        jenis: 'poin',
        judul: 'Yang langsung terbaca dari bentuknya',
        butir: [
          'Puncaknya tepat 1 di sudut 90° — di situ titik berada paling atas',
          'Turun ke nol di 180° — titiknya kembali sejajar pusat',
          'Lembahnya −1 di 270° — titik berada paling bawah',
          'Kembali nol di 360°, lalu seluruhnya mengulang persis sama',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Kenapa kurvanya melandai di puncak',
        baris: [
          'Dekat 0°    tinggi berubah cepat   →  kurva menanjak curam',
          'Dekat 90°   tinggi hampir diam     →  kurva mendatar di puncak',
          'Dekat 180°  tinggi turun cepat     →  kurva menukik lagi',
        ],
        simpul: 'Di puncak, titik sedang bergerak menyamping — bukan naik. Karena itu kurvanya melandai.',
      },
      { jenis: 'paragraf', teks: 'Geser sudutnya di sebelah kiri dan perhatikan kurvanya tumbuh sendiri. Naikkan sampai lewat 360° — kurva mengulang persis, karena putarannya memang mengulang.' },
    ],
    seringKeliru: {
      judul: 'Grafik sinus dikira gambar bentuk sesuatu',
      isi: 'Sumbu mendatarnya bukan jarak atau posisi, melainkan besar sudut. Jadi kurva ini tidak menggambarkan bentuk benda apa pun — ia grafik nilai terhadap sudut, sama seperti grafik suhu terhadap waktu.',
    },
    widget: 'lingkaran-ke-grafik',
    video: { berkas: 'tahap8-grafik-sin.webm', poster: 'tahap8-grafik-sin.jpg' },
    siap: true,
  },
  {
    no: 9,
    slug: 'tiga-grafik',
    judul: 'Sin, cos, dan tan berdampingan',
    labelPendek: 'Tiga grafik',
    pertanyaan: 'Kenapa grafik tan punya jurang, sedangkan sin dan cos tidak?',
    intisari: [
      'Satu putaran yang sama, tiga hal berbeda yang dicatat.',
      'sin mencatat tinggi, cos mencatat posisi mendatar.',
      'Grafik cos adalah grafik sin yang digeser 90°.',
      'tan meledak setiap 90° karena penyebutnya menjadi nol.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Ketiga panel di sebelah kiri digerakkan oleh satu sudut yang sama. Yang berbeda hanya apa yang dicatat dari putaran itu.' },
      {
        jenis: 'poin',
        judul: 'Apa yang dicatat masing-masing',
        butir: [
          'sin θ — tinggi titik, ruas tegak',
          'cos θ — posisi mendatarnya, ruas mendatar',
          'tan θ — ruas pada garis singgung, yang kita temui di tahap 6',
        ],
      },
      { jenis: 'sorot', teks: 'Grafik cos bentuknya persis grafik sin — hanya berangkat 90° lebih awal.' },
      { jenis: 'paragraf', teks: 'Masuk akal: saat sudut nol, titiknya berada paling kanan. Posisi mendatarnya sudah maksimum, sementara tingginya masih nol. Cos sudah di puncak ketika sin baru mulai.' },
      {
        jenis: 'poin',
        judul: 'Kenapa tan punya jurang',
        butir: [
          'tan θ = sin θ ÷ cos θ',
          'Di 90° dan 270°, cos bernilai nol — dan pembagian dengan nol tidak terdefinisi',
          'Mendekati sudut itu, penyebutnya makin kecil, jadi hasilnya melesat tanpa batas',
          'Garis putus-putus tegak pada grafik menandai jurang itu; kurvanya tidak pernah menyentuhnya',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'tan mendekati 90°',
        baris: [
          'tan 80°   =    5,67',
          'tan 89°   =   57,29',
          'tan 89,9° =  572,96',
          'tan 90°   =  tidak terdefinisi',
        ],
        simpul: 'Bukan “tak hingga”, melainkan tidak terdefinisi — tidak ada angka yang bisa ditulis di situ.',
      },
      {
        jenis: 'poin',
        judul: 'Tiga perbedaan yang terlihat sekaligus',
        butir: [
          'sin dan cos — terkurung antara −1 dan 1, tidak pernah keluar',
          'tan — tidak punya batas atas maupun bawah',
          'Pengulangan — sin dan cos mengulang tiap 360°, tan tiap 180°',
        ],
      },
      { jenis: 'paragraf', teks: 'Geser sudutnya dan perhatikan ketiga kurva tumbuh bersamaan dari satu putaran yang sama.' },
    ],
    seringKeliru: {
      judul: 'Jurang grafik tan dikira “nilainya tak hingga”',
      isi: 'Tak hingga bukan sebuah angka. Yang benar: pada 90° nilai tan tidak terdefinisi — tidak ada bilangan yang bisa ditulis di sana. Kurvanya mendekati garis putus-putus itu sedekat apa pun, tapi tidak pernah menyentuhnya.',
    },
    widget: 'tiga-grafik',
    video: { berkas: 'tahap9-tiga-grafik.webm', poster: 'tahap9-tiga-grafik.jpg' },
    siap: true,
  },
  {
    no: 10,
    slug: 'dunia-nyata',
    judul: 'Dipakai di dunia nyata',
    labelPendek: 'Dunia nyata',
    pertanyaan: 'Di gawai yang Anda pegang sekarang, di mana trigonometrinya?',
    intisari: [
      'Kamera tahu seberapa lebar yang muat lewat tangen.',
      'Layar berputar karena ponsel menghitung sudut kemiringannya.',
      'Setiap benda yang berputar di game digerakkan sin dan cos.',
      'Suara yang Anda dengar bentuknya gelombang sinus.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Trigonometri terasa jauh dari hidup sehari-hari — sampai Anda sadar bahwa benda yang sedang Anda pegang memakainya ribuan kali setiap detik.' },
      { jenis: 'sorot', teks: 'Keempat contoh di bawah semuanya ada di dalam satu ponsel.' },

      {
        jenis: 'poin',
        judul: '1. Kamera — seberapa lebar yang muat',
        butir: [
          'Setiap lensa punya sudut pandang tetap, misalnya 78°',
          'Yang menentukan lebar hasil foto adalah sudut itu dan jarak Anda',
          'Setengah sudut pandang membentuk segitiga siku-siku dengan garis tengah lensa — di situlah tangen masuk',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Berapa lebar yang muat dari jarak 1 meter?',
        baris: [
          'sudut pandang     = 78°',
          'setengahnya       = 39°',
          'setengah lebar    = 1 × tan 39°  =  0,81 m',
          'lebar seluruhnya  = 2 × 0,81     =  1,62 m',
        ],
        simpul: 'Itu sebabnya untuk foto beramai-ramai Anda harus mundur. Bukan sihir — tangen.',
      },

      {
        jenis: 'poin',
        judul: '2. Layar yang berputar sendiri',
        butir: [
          'Di dalam ponsel ada sensor yang merasakan tarikan gravitasi',
          'Sensor itu memecah tarikan tadi menjadi dua arah: mendatar dan tegak',
          'Kemiringan ponsel = sudut yang tangennya sama dengan perbandingan kedua arah itu',
          'Begitu sudutnya melewati batas, layar dibalik',
        ],
      },
      { jenis: 'paragraf', teks: 'Jadi setiap kali layar berputar saat ponsel Anda miringkan, yang baru saja terjadi adalah pembacaan sudut dari sebuah perbandingan sisi — persis yang Anda pelajari di tahap 4.' },

      {
        jenis: 'poin',
        judul: '3. Game — memutar apa pun',
        butir: [
          'Karakter berbalik, peluru melengkung, kamera mengitari arena — semuanya perputaran',
          'Memutar titik (x, y) sejauh θ menghasilkan (x cos θ − y sin θ, x sin θ + y cos θ)',
          'Game yang berjalan 60 gambar per detik menghitung rumus itu puluhan ribu kali tiap detik',
        ],
      },
      { jenis: 'paragraf', teks: 'Perhatikan bahwa rumus itu hanya memakai sin dan cos dari sudut putarnya. Tidak ada yang lain. Seluruh gerak berputar di layar game dibangun dari dua angka yang Anda kenal sejak tahap 4.' },

      {
        jenis: 'poin',
        judul: '4. Suara — bentuk aslinya kurva sinus',
        butir: [
          'Nada A yang dipakai menyetem gitar bergetar 440 kali per detik',
          'Bentuk getarannya persis kurva yang lahir di tahap 8',
          'Nada lebih tinggi = kurva lebih rapat; suara lebih keras = kurva lebih tinggi',
          'Equalizer memecah lagu menjadi tumpukan gelombang sinus, lalu mengeraskan atau memelankan tiap kelompok',
        ],
      },
      { jenis: 'sorot', teks: 'Kurva yang Anda gambar di tahap 8 itu bukan latihan. Itu bentuk suara yang sedang Anda dengar.' },

      { jenis: 'paragraf', teks: 'Empat contoh, satu benda. Dan itu belum termasuk yang di luar genggaman: gelombang radio, arus listrik di rumah, pasang surut air laut, dan denyut jantung yang terbaca di layar rumah sakit — semuanya dijelaskan dengan kurva yang sama.' },
    ],
    seringKeliru: {
      judul: 'Mengira trigonometri hanya untuk mengukur tinggi pohon',
      isi: 'Mengukur yang tidak terjangkau memang pintu masuknya, dan itu memang cerita tahap 1. Tapi begitu sesuatu berputar atau berulang secara teratur — suara, cahaya, arus listrik, pasang surut, gerak game — sin dan cos hampir selalu ikut. Trigonometri lebih sering dipakai untuk hal yang BERULANG daripada untuk segitiga.',
    },
    widget: 'dunia-nyata',
    siap: true,
  },
]

export const cariTahap = (slug: string) => TAHAP.find((t) => t.slug === slug)
