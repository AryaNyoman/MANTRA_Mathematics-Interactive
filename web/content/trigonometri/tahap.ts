/**
 * Trigonometri, 10 tahap belajar, urut dari KONSEP menuju rumus.
 *
 * Rancangannya: docs/superpowers/specs/2026-08-31-trigonometri-alur-belajar.md
 *
 * BENTUK PENJELASAN (permintaan ARYA, revisi 31 Agu):
 * Isinya tetap lengkap, tapi JANGAN berupa tembok paragraf seperti cerpen.
 * Dipecah jadi blok yang bisa dipindai mata: paragraf pendek, daftar poin,
 * kalimat kunci yang disorot, dan kotak contoh berhitung.
 *
 * Kotak "Sering keliru" tetap di BAWAH, setelah siswa paham, bukan menyambut
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
  | 'sudut-berelasi'
  | 'dunia-nyata'

/*
 * Bentuk `Blok` dan `Tahap` dipakai bersama semua topik, jadi tinggal di
 * `content/tipe.ts` sejak 1 September 2026. Diekspor ulang dari sini supaya
 * berkas yang sudah mengimpor dari `@/content/trigonometri` tidak perlu diubah.
 */
export type { Blok, Tahap } from '@/content/tipe'
import type { Tahap } from '@/content/tipe'

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
      /* PEMBUKA: satu masalah kecil yang bisa dibayangkan siapa pun, lalu
         langsung dipecahkan. Baru setelah itu masuk ke sesi bernomor. */
      { jenis: 'paragraf', teks: 'Di depan rumah Anda ada pohon kelapa. Berapa tingginya? Meteran Anda cuma tiga meter, dan memanjat jelas bukan pilihan. Pertanyaannya terdengar sepele, tapi jawabannya butuh cara yang sama sekali berbeda dari cuma mengukur.' },
      { jenis: 'paragraf', teks: 'Caranya begini: tunggu siang yang cerah, lalu ukur panjang bayangan pohon itu di tanah. Ukur juga tinggi badan Anda dan panjang bayangan Anda sendiri, pada jam yang sama. Empat angka itu sudah cukup untuk mengetahui tinggi pohonnya, tanpa menyentuh pohon sama sekali.' },
      {
        jenis: 'contoh',
        judul: 'Coba dengan angka sungguhan',
        baris: [
          'Bayangan pohon   8 m',
          'Tinggi Anda   1,6 m',
          'Bayangan Anda   1,28 m',
          'Tinggi dibagi bayangan   1,6 : 1,28 = 1,25',
          'Tinggi pohon   8 × 1,25 = 10 m',
        ],
        simpul: 'Pohonnya 10 meter. Diukur dari tanah, tanpa memanjat.',
      },
      { jenis: 'paragraf', teks: 'Yang barusan Anda lakukan itulah trigonometri. Sisa materi ini menjelaskan kenapa cara itu boleh dipakai, dan kenapa hasilnya bisa dipercaya.' },

      { jenis: 'sesi', judul: 'Ada panjang yang tidak bisa disentuh' },
      { jenis: 'paragraf', teks: 'Pohon tadi bukan kasus khusus. Begitu Anda mulai memperhatikan, panjang yang tidak terjangkau ada di mana-mana.' },
      {
        jenis: 'poin',
        judul: 'Yang tidak bisa diukur dengan meteran',
        butir: [
          'Tinggi pohon atau gedung - terlalu tinggi untuk dijangkau',
          'Lebar sungai - arusnya deras, tidak bisa diseberangi',
          'Jarak kapal dari pantai - tidak ada pijakan di antaranya',
          'Jarak Bumi ke Bulan - tidak perlu dijelaskan',
        ],
      },
      { jenis: 'paragraf', teks: 'Tetapi ada dua hal yang malah selalu gampang diukur, bahkan dengan alat seadanya.' },
      {
        jenis: 'poin',
        judul: 'Yang selalu mudah',
        butir: [
          'Jarak mendatar di atas tanah - tinggal direntangkan meteran',
          'Sudut - cukup busur derajat, bahkan aplikasi ponsel pun bisa',
        ],
      },
      { jenis: 'sorot', teks: 'Trigonometri adalah ilmu yang menukar sudut menjadi panjang. Yang mudah diukur ditukar dengan yang tidak bisa dijangkau.' },

      { jenis: 'sesi', judul: 'Kenapa cara bayangan tadi boleh dipakai' },
      { jenis: 'paragraf', teks: 'Perhatikan lagi hitungan di awal. Tinggi dibagi bayangan pada diri Anda hasilnya 1,25. Pada pohon, angka itu juga 1,25. Padahal tinggi Anda dan tinggi pohon berbeda jauh.' },
      { jenis: 'paragraf', teks: 'Sebabnya matahari sangat jauh, sehingga sinarnya sampai ke Anda dan ke pohon dengan kemiringan yang praktis sama. Sudutnya sama, jadi perbandingannya pun sama.' },
      { jenis: 'sorot', teks: 'Sudut yang sama selalu memberi perbandingan yang sama, tidak peduli objeknya pohon, orang, atau menara.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya adalah kejadian tadi dalam bentuk yang bisa Anda utak-atik. Geser sudut sinar mataharinya dan amati baik-baik.',
        langkah: [
          'Geser ke sudut kecil, lalu ke sudut besar. Perhatikan apa yang terjadi pada panjang kedua bayangan dan pada letak mataharinya.',
          'Baca dua angka hasil bagi di bawah gambar (tinggi dibagi bayangan) pada beberapa sudut yang berbeda.',
          'Bandingkan hasil bagi milik orang dengan milik pohon pada sudut yang sama. Sama atau beda?',
          'Menurut Anda, hasil bagi itu bergantung pada apa: tinggi bendanya, atau sudut mataharinya?',
        ],
      },

      { jenis: 'sesi', judul: 'Cara memakainya' },
      {
        jenis: 'poin',
        judul: 'Menghitung tinggi apa pun tanpa memanjat',
        butir: [
          'Ukur panjang bayangan benda yang ingin diketahui tingginya',
          'Ukur tinggi badan Anda dan panjang bayangan Anda sendiri',
          'Bagi tinggi Anda dengan bayangan Anda, itulah angka perbandingannya',
          'Kalikan angka itu dengan bayangan benda tadi',
        ],
      },
      { jenis: 'paragraf', teks: 'Materi berikutnya membuktikan bahwa perbandingan itu memang tidak pernah berubah selama sudutnya tetap. Setelah itu barulah muncul nama sin, cos, dan tan, yang ternyata hanya sebutan untuk perbandingan semacam ini.' },
    ],
    seringKeliru: {
      judul: 'Dikira daftar rumus yang harus dihafal',
      isi: 'Banyak yang menganggap trigonometri sebagai kumpulan rumus untuk dihafal menjelang ujian, lalu dilupakan. Padahal trigonometri lahir dari kebutuhan yang sangat praktis: mengukur sesuatu yang tidak bisa didatangi. Astronom Yunani memakainya untuk memperkirakan jarak Bumi ke Bulan lebih dari dua ribu tahun lalu, jauh sebelum ada kalkulator. Yang mereka punya hanya sudut, bayangan, dan pembagian.',
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
      /* Ditulis ulang 14 Sep 2026 atas kritik ARYA: kotak coba tidak boleh
         memuat kesimpulan, sub judul "Akibatnya" tidak bermakna, sesi "Coba
         sendiri di alatnya" mengulang kotak coba, dan kotak Sering keliru
         menyebut tan padahal sin, cos, tan baru lahir di Materi 04. Alur
         sekarang: sebangun, percobaan, KENAPA hasil baginya tetap, lalu apa
         akibatnya bagi seluruh trigonometri. */
      { jenis: 'paragraf', teks: 'Materi 01 berakhir pada satu dugaan: sudut yang sama memberi perbandingan yang sama. Sekarang kita buktikan, mula-mula dengan mengukur, lalu dengan alasan yang berlaku untuk semua segitiga.' },

      { jenis: 'sesi', judul: 'Dua segitiga sebangun' },
      { jenis: 'paragraf', teks: 'Dua segitiga disebut sebangun bila ketiga sudutnya sama besar. Bentuknya persis sama; yang boleh berbeda hanya ukurannya, seperti satu foto yang dicetak di dua ukuran kertas.' },
      {
        jenis: 'poin',
        butir: [
          'Sudutnya sama persis - inilah syaratnya, bukan panjang sisinya',
          'Bentuknya identik - yang satu adalah pembesaran atau pengecilan yang lain',
          'Ukurannya boleh berbeda - segitiga kecil dan besar sama-sama sah',
        ],
      },
      { jenis: 'paragraf', teks: 'Ambil dua segitiga siku-siku sebangun dengan sudut 37° di titik A. Pada tiap segitiga, bagi sisi di depan sudut A dengan sisi di sampingnya.' },
      {
        jenis: 'contoh',
        judul: 'Ukur keduanya, lalu bagi',
        baris: [
          'Segitiga kecil:  depan 1,8 cm,  samping 2,4 cm  →  1,8 ÷ 2,4 = 0,75',
          'Segitiga besar:  depan 3 cm,    samping 4 cm    →  3 ÷ 4 = 0,75',
        ],
        simpul: 'Panjangnya berbeda jauh. Hasil baginya sama persis.',
      },

      {
        jenis: 'coba',
        teks: 'Sekarang buktikan sendiri di alatnya. Di bawah kendalinya ada tabel "Angka dari segitiga": tiga baris pertama panjang sisi samping, depan, dan miring; baris terakhir hasil bagi depan ÷ samping.',
        langkah: [
          'Geser kendali Besar segitiga, atau tarik titik puncaknya ke kanan dan ke kiri. Perhatikan ketiga panjang sisi di tabel.',
          'Sambil menggeser, awasi baris terakhir, depan ÷ samping. Ikut berubah atau tidak?',
          'Sekarang geser kendali Sudut θ, atau tarik titik puncaknya ke atas dan ke bawah. Apa yang terjadi pada baris terakhir itu?',
          'Jadi, mana yang mengubah hasil bagi: ukuran segitiga atau sudutnya?',
        ],
      },

      { jenis: 'sesi', judul: 'Kenapa hasil baginya tidak ikut berubah' },
      { jenis: 'paragraf', teks: 'Segitiga besar adalah segitiga kecil yang diperbesar. Kalau pembesarannya 4 kali, SETIAP sisinya dikali 4: sisi depan, sisi samping, sisi miring, semuanya. Tidak ada sisi yang dikali lebih banyak dari sisi lain, karena kalau ada, bentuknya berubah dan sudutnya ikut berubah.' },
      {
        jenis: 'contoh',
        judul: 'Pembesaran 4 kali, diikuti angkanya',
        baris: [
          'Segitiga kecil   1,8 ÷ 2,4 = 0,75',
          'Diperbesar 4 kali   (4 × 1,8) ÷ (4 × 2,4) = 7,2 ÷ 9,6 = 0,75',
          'Diperbesar k kali   (k × 1,8) ÷ (k × 2,4) = 1,8 ÷ 2,4 = 0,75',
        ],
        simpul: 'Angka pembesaran muncul di atas dan di bawah garis bagi, lalu saling menghapus. Berapa pun pembesarannya, hasilnya 0,75.',
      },
      { jenis: 'sorot', teks: 'Pembilang dan penyebut dikali angka yang sama, jadi hasil baginya tetap. Yang tersisa hanyalah bentuk segitiganya, dan bentuk itu ditentukan oleh sudutnya.' },
      { jenis: 'paragraf', teks: 'Inilah yang Anda lihat di alat tadi. Menarik puncak ke samping hanya mengalikan semua sisi dengan angka yang sama, sehingga baris terakhir diam. Menarik ke atas mengubah sudutnya, bentuknya berubah, dan barulah hasil baginya ikut berubah.' },

      { jenis: 'sesi', judul: 'Yang berubah dan yang tidak' },
      {
        jenis: 'poin',
        butir: [
          'Panjang sisi bergantung pada ukuran - tidak bisa dijadikan patokan',
          'Hasil bagi dua sisi tidak bergantung pada ukuran - hanya pada sudut',
          'Satu sudut, satu angka - berlaku untuk semua segitiga siku-siku bersudut 37°, sebesar apa pun, di mana pun',
        ],
      },
      { jenis: 'paragraf', teks: 'Karena hasil bagi itu hanya bergantung pada sudut, angkanya bisa dihitung sekali lalu dibukukan: 37° memberi 0,75, dan sudut lain memberi angka lain. Itulah yang tersimpan di dalam kalkulator Anda, dan kalkulator memang tidak perlu tahu segitiga mana yang Anda maksud.' },
      { jenis: 'paragraf', teks: 'Yang belum ada hanyalah namanya. Hasil bagi depan ÷ samping ini, dan hasil bagi pasangan sisi lainnya, akan mendapat nama resmi di Materi 04. Sebelum itu, Materi 03 memastikan kita sepakat dulu sisi mana yang disebut depan dan mana yang samping.' },
    ],
    seringKeliru: {
      judul: 'Dikira sudutnya ikut membesar',
      isi: 'Saat segitiga diperbesar dua kali, sering dikira sudutnya ikut dua kali lebih besar, atau hasil baginya ikut naik. Padahal pembesaran hanya mengalikan panjang sisi. Sudut mengukur bukaan antara dua sisi, bukan panjangnya, dan bukaan itu tidak berubah walaupun kedua sisinya diperpanjang. Karena sudutnya tetap, hasil bagi dua sisinya pun tetap.',
    },
    widget: 'segitiga-sebangun',
    video: { berkas: 'tahap2-perbandingan-tetap.mp4', poster: 'tahap2-perbandingan-tetap.jpg' },
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
      { jenis: 'sesi', judul: 'Tiga nama sisi' },
      {
        jenis: 'poin',
        butir: [
          'Sisi miring - menghadap sudut siku-siku, selalu terpanjang, namanya tidak pernah berubah',
          'Sisi depan - tepat di seberang sudut yang sedang dilihat, tidak menyentuhnya sama sekali',
          'Sisi samping - menempel pada sudut itu, tapi bukan sisi miring',
        ],
      },
      {
        jenis: 'coba',
        teks: 'Nama sisi bergantung sudut mana yang sedang dilihat. Buktikan di alatnya.',
        langkah: [
          'Klik sudut A, lalu catat nama ketiga sisinya: mana depan, mana samping, mana miring.',
          'Sekarang klik sudut C pada segitiga yang sama, dan catat lagi nama ketiga sisinya.',
          'Bandingkan kedua catatan Anda. Sisi mana saja yang berganti nama, dan sisi mana yang tidak?',
          'Menurut Anda, apa yang menentukan nama sebuah sisi: letaknya di gambar, atau sudut yang sedang dilihat?',
        ],
      },
      { jenis: 'paragraf', teks: 'Di sinilah siswa paling sering tersandung. Segitiga siku-siku punya dua sudut lancip. Pindah dari sudut yang satu ke sudut yang lain, sisi depan dan sisi samping bertukar tempat.' },
      { jenis: 'sorot', teks: 'Nama sisi ditentukan oleh SUDUT yang dirujuk, bukan oleh posisinya di gambar.' },
      {
        jenis: 'contoh',
        judul: 'Segitiga ABC, siku-siku di B',
        baris: [
          'Dari sudut A:   depan = BC,   samping = AB,   miring = AC',
          'Dari sudut C:   depan = AB,   samping = BC,   miring = AC',
        ],
        simpul: 'Garisnya tidak bergerak sedikit pun. Yang berubah hanya dari mana kita memandang.',
      },
      { jenis: 'sesi', judul: 'Kenapa ini perlu satu materi sendiri' },
      {
        jenis: 'poin',
        butir: [
          'Semua perhitungan setelah ini bertumpu padanya',
          'Salah menentukan sisi depan → salah membagi → jawaban salah, meskipun caranya benar',
          'Kesalahan ini paling sering terjadi dan paling sering luput, karena kelihatannya sepele',
        ],
      },
      { jenis: 'paragraf', teks: 'Klik sudut A atau C di alatnya untuk merasakan pertukaran itu sendiri.' },
    ],
    seringKeliru: {
      judul: 'Nama sisi dikira melekat pada garisnya',
      isi: 'Banyak siswa menghafal “yang tegak itu sisi depan” lalu memakainya untuk semua soal. Begitu segitiganya diputar atau sudut yang ditanya berpindah, hafalan itu langsung salah.',
      sumber: 'Buku Panduan Guru Matematika Kelas X, Bab 4, kunci jawaban Latihan 4.1 nomor 2',
    },
    widget: 'penamaan-sisi',
    siap: true,
  },

  /* ============ tahap yang belum dibangun, ditulis jujur ============ */
  {
    no: 4,
    slug: 'lahirnya-sin-cos-tan',
    judul: 'Lahirnya sin, cos, dan tan',
    labelPendek: 'sin cos tan',
    pertanyaan: 'Dari mana ketiga nama itu datang?',
    intisari: [
      'Tiga sisi bisa dipasangkan jadi enam pembagian berbeda.',
      'Keenamnya punya nama resmi - bukan cuma tiga.',
      'sin, cos, tan adalah tiga yang paling sering dipakai.',
      'Namanya datang dari sejarah, bukan dari logika matematika.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Kita sudah punya tiga sisi dengan nama masing-masing. Pertanyaan berikutnya sederhana: ada berapa cara membagi satu sisi dengan sisi lainnya?' },
      { jenis: 'sesi', judul: 'Hitung dulu ada berapa pasangan' },
      {
        jenis: 'poin',
        butir: [
          'Pembilang - bebas pilih satu dari 3 sisi',
          'Penyebut - pilih satu dari 2 sisi yang tersisa',
          'Total - 3 × 2 = 6 pasangan yang berbeda',
        ],
      },
      {
        jenis: 'coba',
        teks: 'Alat interaktifnya adalah pabrik perbandingan. Pilih sendiri pembilang dan penyebutnya.',
        langkah: [
          'Pilih pembilang depan dan penyebut miring. Baca nama yang muncul untuk pembagian itu.',
          'Ganti menjadi samping dibagi miring, lalu depan dibagi samping. Catat nama yang muncul untuk masing-masing.',
          'Coba juga tiga pasangan sisanya. Berapa pasangan seluruhnya, dan adakah pasangan yang tidak punya nama?',
          'Dari keenam nama itu, mana yang sudah pernah Anda dengar sebelum materi ini?',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Keenamnya pada segitiga 3-4-5',
        baris: [
          'depan ÷ miring   3/5 = 0,600   sin θ, sinus',
          'samping ÷ miring   4/5 = 0,800   cos θ, kosinus',
          'depan ÷ samping   3/4 = 0,750   tan θ, tangen',
          'miring ÷ depan   5/3 = 1,667   csc θ, kosekan',
          'miring ÷ samping   5/4 = 1,250   sec θ, sekan',
          'samping ÷ depan   4/3 = 1,333   cot θ, kotangen',
        ],
        simpul: 'Tiga baris bawah adalah kebalikan tiga baris atas, pecahannya tinggal dibalik.',
      },
      { jenis: 'sorot', teks: 'Enam pembagian, enam nama. sin, cos, dan tan hanyalah tiga di antaranya.' },
      { jenis: 'sesi', judul: 'Kenapa hanya tiga yang diajarkan di SMA' },
      {
        jenis: 'poin',
        butir: [
          'Tiga sisanya cuma kebalikan - bisa dihitung dari yang tiga',
          'Kalkulator pun biasanya hanya menyediakan tombol sin, cos, tan',
          'Tiga itu sudah cukup untuk hampir semua soal',
        ],
      },
      { jenis: 'paragraf', teks: 'Lalu dari mana nama-nama aneh itu datang? Jawabannya bukan matematika, tapi sejarah, dan salah satunya lahir dari salah terjemah.' },
      { jenis: 'sesi', judul: 'Asal-usul namanya' },
      {
        jenis: 'poin',
        butir: [
          'Sinus - berawal dari kata Sanskerta jya-ardha, artinya setengah tali busur. Diserap ke bahasa Arab jadi jiba, lalu keliru dibaca sebagai jaib yang berarti teluk atau lipatan. Penerjemah Latin memakai kata sinus, yang juga berarti teluk. Jadi nama itu sebenarnya kecelakaan penerjemahan',
          'Kosinus - dari complementi sinus, sinus dari sudut pelengkap. Pelengkap 30° adalah 60°, dan memang cos 30° = sin 60°',
          'Tangen - dari kata Latin tangens, yang menyentuh. Di Materi 06 Anda akan melihat tangen benar-benar berupa ruas garis yang menyentuh lingkaran',
        ],
      },
      { jenis: 'paragraf', teks: 'Coba sendiri di alatnya: pilih sisi mana yang jadi pembilang dan mana yang jadi penyebut, lalu lihat nama resminya muncul.' },
    ],
    seringKeliru: {
      judul: 'Dikira tiga rumus terpisah yang harus dihafal',
      isi: 'Ketiganya bukan rumus terpisah, tetapi tiga label untuk tiga pembagian dari kumpulan yang sama. Begitu panjang ketiga sisinya diketahui, keenam nilai itu bisa dihitung tanpa menghafal apa pun. Yang perlu diingat cuma sisi mana dibagi sisi mana.',
    },
    widget: 'pabrik-rasio',
    video: { berkas: 'tahap4-lahirnya-rasio.mp4', poster: 'tahap4-lahirnya-rasio.jpg' },
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
      { jenis: 'paragraf', teks: 'Sekarang letakkan segitiga itu di dalam lingkaran berjari-jari 1, sudutnya di pusat. Jari-jari lingkaran otomatis menjadi sisi miring, dan panjangnya selalu 1, ke arah mana pun jari-jarinya menunjuk.' },
      { jenis: 'sesi', judul: 'Akibatnya, untuk titik di lingkaran itu' },
      {
        jenis: 'poin',
        butir: [
          'cos θ - persis koordinat mendatarnya, nilai x',
          'sin θ - persis koordinat tegaknya, nilai y',
          'Titiknya sendiri - selalu berada di (cos θ, sin θ)',
        ],
      },
      {
        jenis: 'coba',
        teks: 'Geser titik di lingkaran satuan dan amati kedua angka koordinatnya.',
        langkah: [
          'Geser titiknya ke sudut kecil, lalu baca kedua koordinatnya. Koordinat mana yang mendekati 1?',
          'Terus geser sampai melewati 90°. Perhatikan tanda kedua koordinatnya.',
          'Setelah lewat 90°, koordinat mana yang berubah tanda, dan mana yang belum?',
          'Lihat letak titiknya di lingkaran saat itu. Menurut Anda, apa hubungan letak titik dengan tanda koordinatnya?',
        ],
      },
      { jenis: 'sesi', judul: 'Tiga hal yang langsung terlihat' },
      {
        jenis: 'poin',
        butir: [
          'Nilai sin dan cos tidak pernah melebihi 1 atau kurang dari −1, karena titiknya tidak bisa keluar lingkaran',
          'Sudut boleh lebih dari 90° - segitiga tidak sanggup, lingkaran sanggup. Titiknya tinggal terus berputar',
          'Di kiri sumbu-y cos jadi negatif, di bawah sumbu-x sin jadi negatif. Tandanya mengikuti arah, bukan aturan hafalan',
        ],
      },
      { jenis: 'sorot', teks: 'Rumus berubah jadi posisi. Tidak perlu membagi lagi, cukup dibaca dari letak titiknya.' },
      { jenis: 'paragraf', teks: 'Inilah alasan lingkaran satuan digambar di mana-mana. Lingkaran satuan bukan gambar tambahan; lingkaran itu mengubah tiga pecahan jadi satu titik yang bisa ditunjuk. Seret titik ungu di alatnya dan perhatikan kedua angkanya bergerak.' },
    ],
    seringKeliru: {
      judul: 'Dikira topik terpisah dari segitiga siku-siku',
      isi: 'Banyak siswa memperlakukan lingkaran satuan sebagai bab baru yang harus dihafal sendiri. Padahal lingkaran satuan memakai segitiga yang sama, hanya dengan sisi miring dipaksa bernilai 1 lalu diletakkan di pusat lingkaran. Tidak ada konsep baru, hanya penyederhanaan.',
    },
    widget: 'lingkaran-satuan',
    video: { berkas: 'tahap5-lingkaran-satuan.mp4', poster: 'tahap5-lingkaran-satuan.jpg' },
    siap: true,
  },
  {
    no: 6,
    slug: 'enam-rasio',
    judul: 'Enam rasio sebagai panjang nyata',
    labelPendek: 'Enam rasio',
    pertanyaan: 'Di mana letak tan, cot, sec, dan csc pada gambarnya?',
    intisari: [
      'Keenam rasio bukan rumus - semuanya ruas garis yang bisa diukur.',
      'tan hidup di garis singgung x = 1, cot di garis singgung y = 1.',
      'sec dan csc adalah garis dari pusat yang menembus kedua singgung itu.',
      'Nama tangen memang berarti menyentuh.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Di Materi 04 kita menemukan enam pembagian. Di Materi 05 dua di antaranya berubah jadi koordinat. Sekarang pertanyaannya: di mana empat sisanya berada pada gambar?' },
      { jenis: 'sorot', teks: 'Jawabannya: keenamnya adalah ruas garis sungguhan pada lingkaran satuan. Tidak ada yang cuma rumus.' },
      { jenis: 'sesi', judul: 'Dua yang sudah kita kenal' },
      {
        jenis: 'poin',
        butir: [
          'cos θ - ruas mendatar dari pusat sampai kaki titik',
          'sin θ - ruas tegak dari kaki titik naik ke titiknya',
        ],
      },
      { jenis: 'sesi', judul: 'Dua yang hidup di garis singgung' },
      {
        jenis: 'poin',
        butir: [
          'tan θ - tarik garis tegak menyentuh lingkaran di x = 1. Perpanjang jari-jari sampai menabraknya. Tinggi tabrakan itulah tan θ',
          'cot θ - hal yang sama, tapi dengan garis mendatar yang menyentuh di y = 1',
        ],
      },
      { jenis: 'sorot', teks: 'Inilah asal nama tangen: tangens berarti “yang menyentuh”. Tangen memang ruas pada garis singgung.' },
      {
        jenis: 'coba',
        teks: 'Enam ruas garis, satu sudut. Geser sudutnya dan lihat keenamnya bergerak bersama.',
        langkah: [
          'Geser ke sudut kecil. Perhatikan ruas tan dan ruas cot: mana yang memendek, mana yang memanjang?',
          'Geser ke sudut besar, lalu bandingkan dengan yang tadi.',
          'Amati ruas sec pada beberapa sudut. Pernahkah ruas itu lebih pendek daripada jari-jari?',
          'Kalau tidak pernah, menurut Anda apa sebabnya?',
        ],
      },
      { jenis: 'sesi', judul: 'Dua yang menembus keluar' },
      {
        jenis: 'poin',
        butir: [
          'sec θ - panjang jari-jari yang diperpanjang, dari pusat sampai menabrak garis singgung x = 1',
          'csc θ - dari pusat sampai menabrak garis singgung y = 1',
          'Keduanya selalu lebih panjang dari 1 - karena harus menembus keluar lingkaran dulu',
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
      { jenis: 'paragraf', teks: 'Geser sudutnya di alatnya, lalu klik nama rasio yang ingin disorot. Perhatikan tan memanjang tak terkendali saat sudut mendekati 90°, sementara cot malah menyusut, dan sebaliknya saat sudut mengecil.' },
    ],
    seringKeliru: {
      judul: 'sec dikira kebalikan sin',
      isi: 'Namanya mirip, jadi sering tertukar. Yang benar: sec adalah kebalikan cos, dan csc kebalikan sin. Cara mengingatnya lewat huruf ketiga, se-C-an berpasangan dengan C-osinus, ko-S-ekan dengan S-inus. Persis terbalik dari dugaan kebanyakan orang.',
    },
    widget: 'enam-rasio',
    video: { berkas: 'tahap6-enam-rasio.mp4', poster: 'tahap6-enam-rasio.jpg' },
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
      'Nilainya EKSAK - pecahan dan akar, bukan desimal tak berujung.',
      'Sudut lain butuh kalkulator; ketiganya tidak.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Coba hitung sin 37° tanpa kalkulator. Tidak bisa. Tapi sin 30° bisa dijawab siapa pun yang pernah menggambar segitiga sama sisi. Di situlah letak keistimewaannya.' },
      {
        jenis: 'coba',
        teks: 'Jalankan perjalanan sudutnya langkah demi langkah, jangan langsung ke akhir.',
        langkah: [
          'Mulai dari 30°, lalu catat kedua koordinat titiknya.',
          'Lanjut ke 45°. Bandingkan kedua koordinatnya satu sama lain.',
          'Lanjut ke 60°, lalu bandingkan koordinatnya dengan catatan di 30°.',
          'Apa yang Anda perhatikan pada pasangan 30° dan 60°? Menurut Anda kebetulan, atau ada sebabnya?',
        ],
      },
      { jenis: 'sesi', judul: '45° lahir dari persegi' },
      {
        jenis: 'poin',
        butir: [
          'Gambar persegi dengan sisi 1, lalu potong sepanjang diagonalnya',
          'Muncul segitiga siku-siku dengan dua sisi sama panjang, keduanya 1',
          'Diagonalnya, lewat Pythagoras, panjangnya √2',
          'Karena kedua sisinya kembar, sin 45° dan cos 45° juga kembar, dan tan 45° tepat 1',
        ],
      },
      { jenis: 'sorot', teks: 'Sudut istimewa bukan sudut yang angkanya bagus, tapi sudut yang nilainya bisa dihitung persis, tanpa alat.' },
      { jenis: 'sesi', judul: '30° dan 60° lahir dari segitiga sama sisi' },
      {
        jenis: 'poin',
        butir: [
          'Gambar segitiga sama sisi bersisi 2, lalu belah tepat di tengah',
          'Alasnya terpotong jadi 1, sisi miringnya tetap 2, dan tingginya √3',
          'Sudut 60° tetap utuh, sudut 30° adalah separuh dari yang dibelah',
          'Jadi sin 30° = 1/2 - tepat setengah, dan memang harus begitu',
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
        simpul: 'Perhatikan 30° dan 60° tertukar nilainya, karena keduanya sudut pelengkap.',
      },
      { jenis: 'sesi', judul: 'Kenapa nilai persis ini berguna' },
      {
        jenis: 'poin',
        butir: [
          'Jawaban ujian bisa ditulis persis, bukan angka desimal yang dibulatkan',
          'Kesalahan pembulatan tidak menumpuk pada perhitungan bertingkat',
          'Nilai di kuadran lain tinggal dicerminkan - tandanya berubah, besarnya tidak',
        ],
      },
      { jenis: 'paragraf', teks: 'Telusuri perjalanannya di alatnya. Jari-jari berhenti di tiap sudut istimewa, dan nilai eksaknya muncul di bawah, lengkap dengan asal-usul bangunnya.' },
    ],
    seringKeliru: {
      judul: 'Tabel sudut istimewa dihafal mentah',
      isi: 'Banyak siswa menghafal tabelnya lalu lupa separuh saat ujian. Padahal cukup ingat dua bangun: persegi dibelah diagonal, dan segitiga sama sisi dibelah dua. Dari dua gambar itu seluruh tabel bisa disusun ulang dalam satu menit, dan kalau lupa, tinggal digambar lagi.',
    },
    widget: 'perjalanan-sudut',
    video: { berkas: 'tahap7-sudut-istimewa.mp4', poster: 'tahap7-sudut-istimewa.jpg' },
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
      'Gelombang bukan bentuk baru - gelombang itu rekaman tinggi sebuah putaran.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Sampai Materi 07 titiknya selalu kita hentikan di sudut tertentu. Sekarang biarkan titiknya terus berputar, dan catat tingginya sepanjang perjalanan.' },
      { jenis: 'sesi', judul: 'Cara membacanya' },
      {
        jenis: 'poin',
        butir: [
          'Sumbu-x grafik - bukan jarak, tetapi besar sudut yang sudah disapu',
          'Sumbu-y grafik - tinggi titik di lingkaran pada sudut itu, yaitu sin θ',
          'Garis putus-putus - penghubung antara tinggi di lingkaran dan titik di grafik',
        ],
      },
      {
        jenis: 'coba',
        teks: 'Sapukan sudutnya pelan-pelan dan perhatikan kurvanya terbentuk.',
        langkah: [
          'Sapukan sudutnya sampai 90°. Setinggi apa kurvanya saat itu?',
          'Lanjut ke 180°, lalu ke 270°. Di mana kurva menyentuh nol, dan di mana kurva paling rendah?',
          'Lanjut terus melewati 360°.',
          'Bandingkan bentuk kurva sesudah 360° dengan bentuk sebelumnya. Apa yang Anda temukan?',
        ],
      },
      { jenis: 'sesi', judul: 'Yang langsung terbaca dari bentuknya' },
      {
        jenis: 'poin',
        butir: [
          'Puncaknya tepat 1 di sudut 90° - di situ titik berada paling atas',
          'Turun ke nol di 180° - titiknya kembali sejajar pusat',
          'Lembahnya −1 di 270° - titik berada paling bawah',
          'Kembali nol di 360°, lalu seluruhnya mengulang persis sama',
        ],
      },
      { jenis: 'sorot', teks: 'Kurva sinus adalah catatan tinggi sebuah titik yang berputar. Bukan bentuk baru yang perlu dihafal.' },
      {
        jenis: 'contoh',
        judul: 'Kenapa kurvanya melandai di puncak',
        baris: [
          'Dekat 0°    tinggi berubah cepat   →  kurva menanjak curam',
          'Dekat 90°   tinggi hampir diam     →  kurva mendatar di puncak',
          'Dekat 180°  tinggi turun cepat     →  kurva menukik lagi',
        ],
        simpul: 'Di puncak, titik sedang bergerak menyamping, bukan naik. Karena itu kurvanya melandai.',
      },
      { jenis: 'paragraf', teks: 'Geser sudutnya di alatnya dan perhatikan kurvanya tumbuh sendiri. Naikkan sampai lewat 360°, kurva mengulang persis, karena putarannya memang mengulang.' },
    ],
    seringKeliru: {
      judul: 'Grafik sinus dikira gambar bentuk sesuatu',
      isi: 'Sumbu-x bukan jarak atau posisi, tetapi besar sudut. Jadi kurva ini tidak menggambarkan bentuk benda apa pun, kurva ini grafik nilai terhadap sudut, sama seperti grafik suhu terhadap waktu.',
    },
    widget: 'lingkaran-ke-grafik',
    video: { berkas: 'tahap8-grafik-sin.mp4', poster: 'tahap8-grafik-sin.jpg' },
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
      { jenis: 'paragraf', teks: 'Ketiga panel di alatnya digerakkan oleh satu sudut yang sama. Yang berbeda hanya apa yang dicatat dari putaran itu.' },
      { jenis: 'sesi', judul: 'Apa yang dicatat masing-masing' },
      {
        jenis: 'poin',
        butir: [
          'sin θ - tinggi titik, ruas tegak',
          'cos θ - posisi mendatarnya, ruas mendatar',
          'tan θ - ruas pada garis singgung, yang kita temui di Materi 06',
        ],
      },
      {
        jenis: 'coba',
        teks: 'Gerakkan satu sudut dan amati ketiga kurva sekaligus.',
        langkah: [
          'Bandingkan kurva sin dan cos. Apa persamaannya, dan apa bedanya?',
          'Sekarang dekati 90° pelan-pelan sambil mengawasi kurva tan.',
          'Perhatikan garis putus-putus di 90°. Apakah kurva tan pernah menyentuhnya?',
          'Lihat nilai cos tepat di 90°. Menurut Anda, apa hubungannya dengan tingkah kurva tan di sana?',
        ],
      },
      { jenis: 'paragraf', teks: 'Masuk akal: saat sudut nol, titiknya berada paling kanan. Posisi mendatarnya sudah maksimum, sementara tingginya masih nol. Cos sudah di puncak ketika sin baru mulai.' },
      { jenis: 'sorot', teks: 'Grafik cos bentuknya persis grafik sin, hanya berangkat 90° lebih awal.' },
      { jenis: 'sesi', judul: 'Kenapa tan punya jurang' },
      {
        jenis: 'poin',
        butir: [
          'tan θ = sin θ ÷ cos θ',
          'Di 90° dan 270°, cos bernilai nol - dan pembagian dengan nol tidak terdefinisi',
          'Mendekati sudut itu, penyebutnya makin kecil, jadi hasilnya melesat tanpa batas',
          'Garis putus-putus tegak pada grafik menandai jurang itu; kurvanya tidak pernah menyentuhnya',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'tan mendekati 90°',
        baris: [
          'tan 80°   5,67',
          'tan 89°   57,29',
          'tan 89,9°   572,96',
          'tan 90°   tidak terdefinisi',
        ],
        simpul: 'Bukan “tak hingga”, tetapi tidak terdefinisi, tidak ada angka yang bisa ditulis di situ.',
      },
      { jenis: 'sesi', judul: 'Tiga perbedaan yang terlihat sekaligus' },
      {
        jenis: 'poin',
        butir: [
          'sin dan cos - terkurung antara −1 dan 1, tidak pernah keluar',
          'tan - tidak punya batas atas maupun bawah',
          'Pengulangan - sin dan cos mengulang tiap 360°, tan tiap 180°',
        ],
      },
      { jenis: 'paragraf', teks: 'Geser sudutnya dan perhatikan ketiga kurva tumbuh bersamaan dari satu putaran yang sama.' },
      { jenis: 'sesi', judul: 'Bonus: kebalikannya juga punya grafik' },
      { jenis: 'paragraf', teks: 'Tiga perbandingan sisanya dari Materi 06 adalah kebalikan dari sin, cos, dan tan, jadi grafiknya bisa dibaca dari grafik ketiganya: kurvanya melesat persis di tempat pembaginya nol.' },
      {
        jenis: 'poin',
        butir: [
          'csc θ = 1 ÷ sin θ - melesat di 0°, 180°, dan 360° (tempat sin nol), dan tidak pernah masuk ke antara −1 dan 1',
          'sec θ = 1/cos θ - melesat di 90° dan 270° (tempat cos nol), jurangnya sama dengan tan',
          'cot θ = cos θ ÷ sin θ - kebalikan tan: melesat di tempat sin nol, dan turun di tempat tan naik',
        ],
      },
      { jenis: 'sorot', teks: 'Tidak ada bentuk baru yang perlu dihafal: jurang csc, sec, dan cot selalu ada di tempat sin atau cos bernilai nol.' },
    ],
    seringKeliru: {
      judul: 'Jurang grafik tan dikira “nilainya tak hingga”',
      isi: 'Tak hingga bukan sebuah angka. Yang benar: pada 90° nilai tan tidak terdefinisi, tidak ada bilangan yang bisa ditulis di sana. Kurvanya mendekati garis putus-putus itu sedekat apa pun, tapi tidak pernah menyentuhnya.',
    },
    widget: 'tiga-grafik',
    video: { berkas: 'tahap9-tiga-grafik.mp4', poster: 'tahap9-tiga-grafik.jpg' },
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
      { jenis: 'paragraf', teks: 'Trigonometri terasa jauh dari hidup sehari-hari, sampai Anda sadar bahwa benda yang sedang Anda pegang memakainya ribuan kali setiap detik.' },
      { jenis: 'sorot', teks: 'Keempat contoh di bawah semuanya ada di dalam satu ponsel.' },

      {
        jenis: 'poin',
        judul: '1. Kamera, seberapa lebar yang muat',
        butir: [
          'Setiap lensa punya sudut pandang tetap, misalnya 78°',
          'Yang menentukan lebar hasil foto adalah sudut itu dan jarak Anda',
          'Setengah sudut pandang membentuk segitiga siku-siku dengan garis tengah lensa - di situlah tangen masuk',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Berapa lebar yang muat dari jarak 1 meter?',
        baris: [
          'sudut pandang   78°',
          'setengahnya   39°',
          'setengah lebar   1 × tan 39° = 0,81 m',
          'lebar seluruhnya   2 × 0,81 = 1,62 m',
        ],
        simpul: 'Itu sebabnya untuk foto beramai-ramai Anda harus mundur. Bukan sihir, tangen.',
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
      { jenis: 'paragraf', teks: 'Jadi setiap kali layar berputar saat ponsel Anda miringkan, yang baru saja terjadi adalah pembacaan sudut dari sebuah perbandingan sisi, persis yang Anda pelajari di Materi 04.' },

      {
        jenis: 'poin',
        judul: '3. Game, memutar apa pun',
        butir: [
          'Karakter berbalik, peluru melengkung, kamera mengitari arena - semuanya perputaran',
          'Memutar titik (x, y) sejauh θ menghasilkan (x cos θ − y sin θ, x sin θ + y cos θ)',
          'Game yang berjalan 60 gambar per detik menghitung rumus itu puluhan ribu kali tiap detik',
        ],
      },
      { jenis: 'paragraf', teks: 'Perhatikan bahwa rumus itu hanya memakai sin dan cos dari sudut putarnya. Tidak ada yang lain. Seluruh gerak berputar di layar game dibangun dari dua angka yang Anda kenal sejak Materi 04.' },

      {
        jenis: 'poin',
        judul: '4. Suara, bentuk aslinya kurva sinus',
        butir: [
          'Nada A yang dipakai menyetem gitar bergetar 440 kali per detik',
          'Bentuk getarannya persis kurva yang lahir di Materi 08',
          'Nada lebih tinggi = kurva lebih rapat; suara lebih keras = kurva lebih tinggi',
          'Equalizer memecah lagu menjadi tumpukan gelombang sinus, lalu mengeraskan atau memelankan tiap kelompok',
        ],
      },
      {
        /* Materi ini tidak lagi punya alat yang bisa digeser, jadi ajakannya
           diarahkan ke benda sungguhan di tangan siswa, bukan ke penggeser
           yang sudah tidak ada. (Perubahan 1 Sep 2026.) */
        jenis: 'coba',
        teks: 'Yang ini tidak perlu alat di layar. Ponsel di tangan Anda sudah cukup.',
        langkah: [
          'Buka kamera ponsel, lalu mundur selangkah. Perhatikan berapa banyak pemandangan yang tiba-tiba muat di layar.',
          'Miringkan ponselnya pelan-pelan sampai layarnya berbalik sendiri.',
          'Perhatikan kira-kira pada kemiringan berapa layarnya berbalik. Ulangi beberapa kali: selalu di sudut yang sama?',
          'Lihat keempat contoh di samping. Menurut Anda, contoh mana saja yang sedang bekerja di dalam ponsel Anda?',
        ],
      },
      { jenis: 'paragraf', teks: 'Empat contoh, satu benda. Dan itu belum termasuk yang di luar genggaman: gelombang radio, arus listrik di rumah, pasang surut air laut, dan denyut jantung yang terbaca di layar rumah sakit, semuanya dijelaskan dengan kurva yang sama.' },
      { jenis: 'sorot', teks: 'Kurva yang Anda gambar di Materi 08 itu bukan latihan. Itu bentuk suara yang sedang Anda dengar.' },
    ],
    seringKeliru: {
      judul: 'Mengira trigonometri hanya untuk mengukur tinggi pohon',
      isi: 'Mengukur yang tidak terjangkau memang pintu masuknya, dan itu memang cerita Materi 01. Tapi begitu sesuatu berputar atau berulang secara teratur, suara, cahaya, arus listrik, pasang surut, gerak game, sin dan cos hampir selalu ikut. Trigonometri lebih sering dipakai untuk hal yang BERULANG daripada untuk segitiga.',
    },
    widget: 'dunia-nyata',
    siap: true,
  },
  {
    /* Materi 11 ditambahkan 20 Sep 2026 (keputusan ARYA): tiga soal kuis bab
       (k48, k50, k59) menguji sudut berelasi, padahal belum ada materi yang
       mengajarkannya. Nomornya 11 tetapi urutan belajarnya di sub-bab B
       sesudah Sudut istimewa (content/subbab.ts). */
    no: 11,
    slug: 'sudut-berelasi',
    judul: 'Sudut berelasi: berputar melewati kuadran',
    labelPendek: 'Sudut berelasi',
    pertanyaan: 'Kalau titiknya diputar 90°, ke mana sin dan cos-nya pergi?',
    intisari: [
      'Setiap sudut di kuadran mana pun punya sudut acuan di kuadran I: besar sin dan cos-nya sama, hanya tandanya yang mengikuti kuadran.',
      'Diputar 90°: (cos θ, sin θ) menjadi (−sin θ, cos θ). Tinggi lama jadi jarak mendatar baru dengan tanda minus, jarak mendatar lama jadi tinggi baru.',
      'Dicerminkan ke kiri (180° − θ): sin tetap, cos berbalik tanda. Dibalik ke seberang (180° + θ): keduanya berbalik. Dicerminkan ke bawah (360° − θ): sin berbalik, cos tetap.',
      'Rumus relasinya tidak dihafal, dibaca dari letak titik di lingkaran satuan.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Di Materi 05 titik pada lingkaran satuan selalu berada di (cos θ, sin θ), dan di Materi 07 nilainya dihitung untuk sudut istimewa di kuadran I. Sekarang pertanyaannya: bagaimana dengan 130°, 220°, atau 320°? Tidak ada segitiga siku-siku yang sudutnya 130°.' },
      { jenis: 'sorot', teks: 'Setiap sudut di kuadran mana pun punya pasangan di kuadran I, namanya sudut acuan. Besar sin dan cos-nya sama persis; yang berbeda hanya tandanya.' },

      { jenis: 'sesi', judul: 'Dua titik yang berpasangan' },
      { jenis: 'paragraf', teks: 'Ambil θ = 40°. Titik P-nya berada di (cos 40°, sin 40°) = (0,77; 0,64). Sekarang pindahkan P dengan empat cara: diputar seperempat putaran, dicerminkan ke kiri, dibalik ke seberang pusat, dan dicerminkan ke bawah. Tiap cara menghasilkan titik baru Q, dan koordinat Q ternyata bisa dibaca dari koordinat P tanpa menghitung ulang.' },

      { jenis: 'sesi', judul: 'Diputar 90°: θ + 90°' },
      { jenis: 'paragraf', teks: 'Putar P seperempat putaran berlawanan arah jarum jam. Jari-jarinya ikut berputar 90°, dan segitiga kecil di bawah P ikut berputar: sisi yang tadinya mendatar kini tegak, yang tadinya tegak kini mendatar. Tinggi P yang lama, sin θ, menjadi jarak mendatar Q, tetapi ke arah kiri, jadi bertanda minus. Jarak mendatar P yang lama, cos θ, menjadi tinggi Q.' },
      {
        jenis: 'contoh',
        judul: 'Titik 40° diputar 90° menjadi titik 130°',
        baris: [
          'P pada 40°   (cos 40°, sin 40°)   (0,77; 0,64)',
          'Q pada 130°   (−sin 40°, cos 40°)   (−0,64; 0,77)',
        ],
        simpul: 'Angkanya bertukar tempat, dan yang pindah ke kiri mendapat tanda minus. Jadi sin(θ + 90°) = cos θ dan cos(θ + 90°) = −sin θ.',
      },

      { jenis: 'sesi', judul: 'Dicerminkan ke kiri: 180° − θ' },
      { jenis: 'paragraf', teks: 'Cerminkan P pada sumbu y. Tingginya tidak berubah, jarak mendatarnya sama besar tetapi sekarang di sebelah kiri. Sudut Q, diukur dari sumbu x positif, besarnya 180° − θ.' },
      {
        jenis: 'contoh',
        judul: 'Titik 40° dicerminkan ke kiri menjadi titik 140°',
        baris: [
          'P pada 40°   (cos 40°, sin 40°)   (0,77; 0,64)',
          'Q pada 140°   (−cos 40°, sin 40°)   (−0,77; 0,64)',
        ],
        simpul: 'sin(180° − θ) = sin θ, sedangkan cos(180° − θ) = −cos θ.',
      },

      { jenis: 'sesi', judul: 'Dibalik ke seberang: 180° + θ' },
      { jenis: 'paragraf', teks: 'Putar P setengah putaran, atau cerminkan pada pusat lingkaran. Q berada tepat di seberang, jadi kedua koordinatnya berbalik tanda.' },
      {
        jenis: 'contoh',
        judul: 'Titik 40° dibalik menjadi titik 220°',
        baris: [
          'P pada 40°   (cos 40°, sin 40°)   (0,77; 0,64)',
          'Q pada 220°   (−cos 40°, −sin 40°)   (−0,77; −0,64)',
        ],
        simpul: 'sin(180° + θ) = −sin θ dan cos(180° + θ) = −cos θ. Karena keduanya berbalik, hasil baginya tidak berubah: tan(180° + θ) = tan θ.',
      },

      { jenis: 'sesi', judul: 'Dicerminkan ke bawah: 360° − θ, atau −θ' },
      { jenis: 'paragraf', teks: 'Cerminkan P pada sumbu x. Jarak mendatarnya tetap, tingginya berbalik ke bawah. Sudut Q boleh disebut 360° − θ atau −θ: keduanya menunjuk titik yang sama.' },
      {
        jenis: 'contoh',
        judul: 'Titik 40° dicerminkan ke bawah menjadi titik 320°',
        baris: [
          'P pada 40°   (cos 40°, sin 40°)   (0,77; 0,64)',
          'Q pada 320°   (cos 40°, −sin 40°)   (0,77; −0,64)',
        ],
        simpul: 'sin(360° − θ) = −sin θ, sedangkan cos(360° − θ) = cos θ.',
      },

      { jenis: 'sesi', judul: 'Satu lagi yang masih di kuadran I: 90° − θ' },
      { jenis: 'paragraf', teks: 'Cerminkan P pada garis y = x, garis miring yang membelah kuadran I. Koordinatnya bertukar tempat tanpa berubah tanda: Q = (sin θ, cos θ). Dari sinilah nama kosinus berasal: cos θ = sin(90° − θ), sinus dari sudut pelengkapnya.' },
      {
        jenis: 'contoh',
        judul: 'Kelima relasi dalam satu tabel, θ di kuadran I',
        baris: [
          'sudut   sin   cos   tan',
          '90° − θ   cos θ   sin θ   cot θ',
          '90° + θ   cos θ   −sin θ   −cot θ',
          '180° − θ   sin θ   −cos θ   −tan θ',
          '180° + θ   −sin θ   −cos θ   tan θ',
          '360° − θ   −sin θ   cos θ   −tan θ',
        ],
        simpul: 'Kolom tan tidak perlu dihafal terpisah: tan = sin : cos, jadi tandanya tinggal dibagi. Untuk cot, sec, dan csc, balik saja pecahannya.',
      },
      {
        jenis: 'poin',
        judul: 'Cara membaca tanpa menghafal',
        butir: [
          'Tentukan kuadran Q, lalu tandanya: di kuadran II hanya sin yang positif, di kuadran III hanya tan, di kuadran IV hanya cos',
          'Besarnya ambil dari sudut acuan θ di kuadran I',
          'Kalau relasinya lewat 90° atau 270° (θ + 90°, 90° − θ), sin dan cos bertukar peran; kalau lewat 180° atau 360°, tidak bertukar',
        ],
      },
      {
        jenis: 'coba',
        teks: 'Putar dan cerminkan titik P, lalu bandingkan koordinat Q dengan koordinat P.',
        langkah: [
          'Atur θ ke 40° dan pilih relasi θ + 90°. Baca koordinat P dan Q. Angka mana yang pindah tempat, dan mana yang berubah tanda?',
          'Ganti ke 180° − θ. Sekarang angka mana yang tetap sama persis?',
          'Seret P ke sudut lain, misalnya 70°, lalu ulangi kedua relasi tadi. Apakah pola tukar dan tandanya ikut berubah?',
          'Pilih 180° + θ dan 360° − θ. Di kuadran mana Q berada pada tiap pilihan, dan koordinat mana yang negatif?',
        ],
      },

      { jenis: 'sesi', judul: 'Kalau sudutnya ditulis dalam radian' },
      { jenis: 'paragraf', teks: 'Sudut boleh ditulis dalam radian: satu putaran penuh adalah 2π radian, jadi 180° = π radian dan 1 radian ≈ 57,3°. Relasinya sama persis, hanya tulisannya berganti: 180° − θ menjadi π − θ, 180° + θ menjadi π + θ, dan seterusnya. Angka seperti "sin 2" berarti sinus dari 2 radian, sekitar 115°: titiknya di kuadran II, jadi nilainya positif dan sama besar dengan sin 65°.' },
      { jenis: 'sorot', teks: 'Tanda mengikuti kuadran, besarnya mengikuti sudut acuan. Rumus relasi hanyalah cara singkat menulis kedua hal itu.' },
    ],
    seringKeliru: {
      judul: 'Dikira −cos θ, padahal −sin θ: putaran dan cerminan itu berbeda',
      isi: 'Titik yang diputar 90° sering dikira cuma "pindah ke kuadran II, jadi cos-nya negatif", lalu ditulis (−cos θ, sin θ). Itu koordinat untuk cerminan 180° − θ, bukan untuk putaran θ + 90°. Pada putaran, segitiga kecilnya ikut berputar, jadi sin dan cos bertukar peran: hasilnya (−sin θ, cos θ). Cara memeriksanya: θ = 40° memberi 130°, dan cos 130° ≈ −0,64 = −sin 40°, bukan −0,77.',
    },
    widget: 'sudut-berelasi',
    video: { berkas: 'tahap11-sudut-berelasi.mp4', poster: 'tahap11-sudut-berelasi.jpg' },
    siap: true,
  },
]

export const cariTahap = (slug: string) => TAHAP.find((t) => t.slug === slug)
