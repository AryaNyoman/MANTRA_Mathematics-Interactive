/**
 * Limit, 10 tahap belajar. Topik kedua MATRA.
 *
 * Rancangannya: docs/superpowers/specs/2026-09-01-limit-alur-belajar.md
 *
 * SUMBER MATERI
 * Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi), 2025.
 * Kementerian Pendidikan Dasar dan Menengah. Bab 2 bagian A.1 "Limit dan
 * Kontinuitas Fungsi", halaman 82 sampai 97. Contoh dan angkanya ditulis
 * sendiri, tetapi urutan konsep dan definisinya mengikuti buku itu.
 *
 * KENAPA URUTANNYA DIBALIK DARI BUKU
 * Buku mulai dari definisi, lalu sifat, lalu bentuk sulit. Di sini bentuk yang
 * TIDAK bisa disubstitusi diperkenalkan lebih dulu (Tahap 1 dan Tahap 4), baru
 * cara cepatnya (Tahap 5). Alasannya: salah paham "limit itu ya nilai fungsi
 * di titik itu" lahir justru karena hampir semua soal sekolah bisa dijawab
 * dengan memasukkan angka, sehingga siswa mengira limit adalah substitusi
 * yang dibuat berbelit.
 *
 * SELURUH ANGKA DI BERKAS INI SUDAH DIPERIKSA MESIN dengan sympy, lewat
 * `python alat/cek_soal.py alat/materi-limit.json`. Kalau ada angka yang
 * diubah, jalankan lagi alat itu sebelum menyatakan selesai.
 */

export type WidgetLimit =
  | 'selang-menyusut'
  | 'garis-mendekati'
  | 'tarif-melompat'
  | 'lubang-grafik'
  | 'mesin-sifat'
  | 'bongkar-bertahap'
  | 'perkecil-tampilan'
  | 'busur-lawan-tali'
  | 'perusak-fungsi'
  | 'dunia-nyata-limit'

import type { Tahap } from '@/content/tipe'

export const TAHAP: Tahap[] = [
  /* ================================================================= */
  {
    no: 1,
    slug: 'kecepatan-sesaat',
    judul: 'Kecepatan pada satu detik',
    labelPendek: 'Kenapa',
    pertanyaan: 'Kalau kecepatan itu jarak dibagi waktu, kenapa speedometer punya angka?',
    intisari: [
      'Jarak dibagi waktu hanya berlaku untuk satu selang, bukan satu titik waktu.',
      'Pada satu saat, hitungan itu jadi 0 dibagi 0, dan itu tidak punya arti.',
      'Jalan keluarnya: perpendek selangnya terus, lalu lihat angkanya menuju ke mana.',
      'Angka yang dituju itulah yang disebut limit.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Anda sedang di boncengan motor. Jarum speedometer menunjuk 60 km per jam. Angka itu terasa biasa saja, sampai Anda memikirkannya sedikit lebih lama.' },
      { jenis: 'paragraf', teks: 'Kecepatan itu jarak dibagi waktu. Tapi jarum tadi menunjukkan kecepatan pada SATU SAAT, bukan sepanjang perjalanan. Dan pada satu saat, waktunya nol, jaraknya juga nol. Nol dibagi nol. Hitungan itu tidak punya jawaban.' },
      { jenis: 'sorot', teks: 'Jadi speedometer menampilkan angka untuk sesuatu yang, kalau dihitung apa adanya, tidak bisa dihitung. Materi ini menjelaskan bagaimana itu mungkin.' },

      { jenis: 'sesi', judul: 'Jangan hitung di satu titik, hitung di selang yang mengecil' },
      { jenis: 'paragraf', teks: 'Kalau menghitung tepat pada satu saat mustahil, jangan dipaksa. Hitung saja pada selang waktu yang pendek, lalu perpendek terus selangnya dan perhatikan angkanya bergerak ke mana.' },
      { jenis: 'paragraf', teks: 'Kita pakai contoh yang bisa dihitung sendiri: sebutir kelapa jatuh dari pohon. Setelah t detik, kelapa itu sudah turun sejauh 5t² meter. Berapa kecepatannya tepat pada detik ke-2?' },
      {
        jenis: 'contoh',
        judul: 'Perpendek selangnya, lihat angkanya',
        baris: [
          'detik 2 sampai 3      (45 - 20) : 1        =  25 m/s',
          'detik 2 sampai 2,5    (31,25 - 20) : 0,5   =  22,5 m/s',
          'detik 2 sampai 2,1    (22,05 - 20) : 0,1   =  20,5 m/s',
          'detik 2 sampai 2,01   (20,2005 - 20) : 0,01 =  20,05 m/s',
          'detik 2 sampai 2,001  ...                   =  20,005 m/s',
        ],
        simpul: 'Angkanya merapat ke 20. Itulah kecepatan kelapa tepat pada detik ke-2.',
      },
      { jenis: 'paragraf', teks: 'Perhatikan bahwa 20 tidak pernah benar-benar tercapai. Selang waktunya boleh dipendekkan sependek apa pun, hasilnya selalu sedikit di atas 20. Tapi kita bisa membuatnya sedekat yang kita mau ke 20, dan itu sudah cukup.' },

      { jenis: 'sesi', judul: 'Kenapa selangnya tidak boleh langsung dibuat nol' },
      { jenis: 'paragraf', teks: 'Sebut panjang selangnya h. Kecepatan rata-rata dari detik 2 sampai detik 2 + h adalah:' },
      {
        jenis: 'contoh',
        judul: 'Rumusnya disederhanakan dulu',
        baris: [
          'jarak yang ditempuh   5(2 + h)² - 5(2)²   =  20h + 5h²',
          'dibagi waktunya       (20h + 5h²) : h',
          'coret h               20 + 5h',
        ],
        simpul: 'Setelah h dicoret, barulah h boleh didekatkan ke nol. Hasilnya 20.',
      },
      {
        jenis: 'poin',
        judul: 'Urutannya penting, dan ini yang sering terlewat',
        butir: [
          'Sebelum disederhanakan - masukkan h = 0 memberi 0 dibagi 0, tidak punya arti',
          'Mencoret h - hanya sah kalau h bukan nol, karena kita membaginya',
          'Sesudah disederhanakan - bentuk 20 + 5h aman untuk h berapa pun, termasuk nol',
        ],
      },
      { jenis: 'sorot', teks: 'Limit bukan cara berbelit untuk memasukkan angka. Limit adalah cara menjawab pertanyaan yang angkanya justru tidak boleh dimasukkan.' },

      {
        jenis: 'coba',
        teks: 'Alat di sebelah kiri adalah kejadian tadi. Geser panjang selang waktunya dan amati dua hal sekaligus.',
        langkah: [
          'Mulai dari selang 1 detik. Garis pada grafik memotong kurva di dua titik yang berjauhan',
          'Perpendek selangnya. Kedua titik itu saling mendekat',
          'Perhatikan angka kecepatan di bawah gambar: 25, lalu 22,5, lalu 20,5',
          'Kalau selangnya sudah sangat pendek, garis potongnya berubah jadi garis singgung. Itu gambar dari kecepatan sesaat',
        ],
      },

      { jenis: 'sesi', judul: 'Untuk apa ini nantinya' },
      { jenis: 'paragraf', teks: 'Cara berpikir barusan bukan hanya soal kelapa jatuh. Ia dipakai untuk menghitung laju perubahan apa pun: kecepatan kendaraan, laju obat berkurang di dalam darah, laju penambahan penduduk, dan kemiringan grafik di satu titik. Semuanya berpangkal pada satu ide: jangan hitung di titiknya, hitung di sekitarnya lalu rapatkan.' },
      { jenis: 'paragraf', teks: 'Materi berikutnya merapikan ide "merapat" itu jadi kalimat yang tepat, supaya bisa dipakai untuk fungsi apa pun, bukan cuma untuk kelapa.' },
    ],
    seringKeliru: {
      judul: 'Dikira limit cuma cara berbelit untuk memasukkan angka',
      isi: 'Kalau bentuk 20 + 5h dimasukkan h = 0, hasilnya memang 20. Dari situ mudah menyimpulkan bahwa limit hanya gaya-gayaan. Tapi bentuk 20 + 5h itu sendiri baru ada SETELAH h dicoret, dan mencoret h hanya boleh dilakukan untuk h yang bukan nol. Pada bentuk aslinya, memasukkan h = 0 memberi 0 dibagi 0 dan berhenti di situ. Jadi yang menyelamatkan hitungan ini bukan substitusi, melainkan penyederhanaan yang sah untuk semua h kecuali nol.',
    },
    widget: 'selang-menyusut',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 2,
    slug: 'mendekati',
    judul: 'Mendekati, bukan menyentuh',
    labelPendek: 'Mendekati',
    pertanyaan: 'Apa artinya "mendekati" kalau tidak pernah sampai?',
    intisari: [
      'Limit menanyakan ke mana f(x) menuju, saat x didorong ke suatu titik c.',
      'x didorong dari kiri dan dari kanan, tapi tidak pernah diletakkan tepat di c.',
      'Limit sama sekali tidak peduli apa yang terjadi tepat di c.',
      'Yang dipedulikan hanya tetangga-tetangga c.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Pada Tahap 1 kita memperpendek selang waktu terus menerus dan melihat angkanya merapat ke 20. Sekarang cara berpikir itu dirapikan supaya bisa dipakai untuk fungsi apa pun.' },

      { jenis: 'sesi', judul: 'Didorong dari dua arah' },
      { jenis: 'paragraf', teks: 'Ambil fungsi sederhana f(x) = x² + 1, dan tanyakan: ke mana f(x) menuju kalau x didorong mendekati 3?' },
      {
        jenis: 'contoh',
        judul: 'Didekati dari kiri',
        baris: [
          'x = 2,9      f(x) = 9,41',
          'x = 2,99     f(x) = 9,9401',
          'x = 2,999    f(x) = 9,994001',
        ],
        simpul: 'Dari kiri, f(x) merapat ke 10.',
      },
      {
        jenis: 'contoh',
        judul: 'Didekati dari kanan',
        baris: [
          'x = 3,1      f(x) = 10,61',
          'x = 3,01     f(x) = 10,0601',
          'x = 3,001    f(x) = 10,006001',
        ],
        simpul: 'Dari kanan, f(x) juga merapat ke 10.',
      },
      { jenis: 'paragraf', teks: 'Kedua arah sepakat menuju 10. Kalau begitu, kita katakan limit f(x) untuk x mendekati 3 adalah 10.' },

      { jenis: 'sesi', judul: 'Kalimat resminya' },
      { jenis: 'paragraf', teks: 'Buku Matematika Tingkat Lanjut Kelas XII menuliskannya begini: limit f(x) untuk x mendekati c sama dengan L berarti, untuk x yang mendekati c dari kiri maupun dari kanan, nilai f(x) mendekati L.' },
      {
        jenis: 'poin',
        judul: 'Tiga hal yang perlu diperhatikan dari kalimat itu',
        butir: [
          'Yang bergerak adalah x, dan yang diamati adalah f(x)',
          'Dua arah, bukan satu. Kiri dan kanan harus sepakat',
          'Kata "mendekati", bukan "sampai". x tidak pernah diletakkan tepat di c',
        ],
      },
      { jenis: 'sorot', teks: 'Limit sama sekali tidak peduli apa yang terjadi tepat di titik c. Ia hanya melihat tetangga-tetangganya.' },
      { jenis: 'paragraf', teks: 'Kalimat itu terdengar aneh sekarang, karena pada contoh di atas nilai f(3) kebetulan memang 10, sama dengan limitnya. Tahap 3 dan Tahap 4 akan menunjukkan bahwa kebetulan itu tidak selalu terjadi, dan justru di situlah limit menjadi berguna.' },

      {
        jenis: 'coba',
        teks: 'Alat di sebelah kiri adalah garis bilangan dengan satu titik tujuan. Tarik titik x mendekat dan perhatikan tabelnya.',
        langkah: [
          'Tarik x dari sebelah kiri, dekatkan ke titik bertanda',
          'Perhatikan kolom f(x) di tabel: angkanya menyempit ke satu nilai',
          'Sekarang tarik dari sebelah kanan. Angkanya menyempit ke nilai yang sama',
          'Coba letakkan x tepat di titiknya. Alat itu menolak, dan penolakan itu memang bagian dari definisinya',
        ],
      },

      { jenis: 'sesi', judul: 'Kenapa tidak boleh berhenti di satu arah saja' },
      { jenis: 'paragraf', teks: 'Kalau kita hanya memeriksa dari kiri, kita bisa tertipu. Ada fungsi yang dari kiri menuju satu angka, tapi dari kanan menuju angka yang berbeda. Fungsi seperti itu tidak punya limit di titik tersebut, walaupun kedua sisinya masing-masing rapi.' },
      { jenis: 'paragraf', teks: 'Itu persis yang dibahas pada materi berikutnya, dan contohnya ada di karcis parkir.' },
    ],
    seringKeliru: {
      judul: 'Dikira "mendekati" itu sama dengan "akhirnya sampai"',
      isi: 'Dalam bahasa sehari-hari, mendekat biasanya berujung sampai. Dalam limit tidak. Nilai x boleh dibuat sedekat apa pun ke c, tetapi tidak pernah diletakkan tepat di c. Justru karena tidak pernah sampai itulah limit tetap bisa menjawab walaupun f(c) sendiri tidak ada. Ini bukan kekurangan definisi, melainkan sumber kekuatannya.',
    },
    widget: 'garis-mendekati',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 3,
    slug: 'dua-arah',
    judul: 'Dua arah harus sepakat',
    labelPendek: 'Dua arah',
    pertanyaan: 'Kenapa ada fungsi yang limitnya tidak ada?',
    intisari: [
      'Limit kiri dan limit kanan dihitung terpisah.',
      'Kalau keduanya berbeda, limitnya tidak ada.',
      'Punya nilai di suatu titik bukan jaminan punya limit di titik itu.',
      'Tarif yang melompat adalah contoh yang sehari-hari.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Anda parkir di mal. Papan tarifnya berbunyi: dua jam pertama Rp 3.000, lewat dari itu Rp 8.000. Anda keluar tepat pada jam kedua. Berapa yang Anda bayar?' },
      { jenis: 'paragraf', teks: 'Pertanyaan itu bukan main-main, dan jawabannya bergantung dari arah mana Anda mendekati jam kedua.' },
      {
        jenis: 'contoh',
        judul: 'Tarif parkir menjelang jam kedua',
        baris: [
          'lama parkir 1,9 jam     Rp 3.000',
          'lama parkir 1,99 jam    Rp 3.000',
          'lama parkir 2,01 jam    Rp 8.000',
          'lama parkir 2,1 jam     Rp 8.000',
        ],
        simpul: 'Dari kiri menuju 3.000, dari kanan menuju 8.000. Tidak ada satu angka yang dituju keduanya.',
      },

      { jenis: 'sesi', judul: 'Limit kiri dan limit kanan' },
      { jenis: 'paragraf', teks: 'Karena kedua arah bisa berbeda, keduanya diberi nama sendiri.' },
      {
        jenis: 'poin',
        butir: [
          'Limit kiri - x didorong ke c hanya dari sisi yang lebih kecil, ditulis dengan tanda minus kecil di atas c',
          'Limit kanan - x didorong ke c hanya dari sisi yang lebih besar, ditulis dengan tanda plus kecil di atas c',
          'Limit biasa ada HANYA kalau keduanya ada DAN nilainya sama',
        ],
      },
      { jenis: 'sorot', teks: 'Pada tarif parkir tadi, limit kirinya 3.000 dan limit kanannya 8.000. Karena berbeda, limitnya tidak ada. Bukan nol, bukan tak hingga: tidak ada.' },

      { jenis: 'sesi', judul: 'Punya nilai belum tentu punya limit' },
      { jenis: 'paragraf', teks: 'Yang menarik, pada jam kedua tarifnya tetap punya nilai. Papan tarif itu jelas menyebutkan satu angka untuk parkir tepat dua jam, katakanlah Rp 3.000. Jadi nilainya ada, tapi limitnya tidak.' },
      {
        jenis: 'poin',
        judul: 'Dua hal yang sering dikira sama, padahal berbeda',
        butir: [
          'Nilai fungsi di c - berapa hasilnya kalau x memang diletakkan tepat di c',
          'Limit di c - ke mana f(x) menuju kalau x hanya mendekati c',
        ],
      },
      { jenis: 'paragraf', teks: 'Materi ini menunjukkan arah yang satu: nilai ada, limit tidak ada. Materi berikutnya menunjukkan arah sebaliknya, dan itu yang lebih sering muncul dalam soal.' },

      {
        jenis: 'coba',
        teks: 'Alat di sebelah kiri adalah grafik tarif tadi. Dua penunjuk merayap dari kiri dan dari kanan.',
        langkah: [
          'Jalankan penunjuk kiri. Angkanya berhenti di 3.000',
          'Jalankan penunjuk kanan. Angkanya berhenti di 8.000',
          'Perhatikan lompatan di grafik: ada patahan tegak di jam kedua',
          'Geser titik tujuannya ke tempat lain yang tidak ada lompatannya. Kedua penunjuk sekarang berhenti di angka yang sama',
        ],
      },

      { jenis: 'sesi', judul: 'Di mana ini muncul selain parkir' },
      {
        jenis: 'poin',
        judul: 'Semua ini melompat, jadi semua ini punya titik tanpa limit',
        butir: [
          'Tarif ojek daring yang berubah saat jam sibuk dimulai',
          'Ongkos kirim yang naik begitu berat paket melewati satu kilogram',
          'Pajak yang berubah persentasenya di batas penghasilan tertentu',
          'Nilai huruf di rapor: 79 dapat B, 80 dapat A',
        ],
      },
      { jenis: 'paragraf', teks: 'Semuanya punya satu ciri yang sama: ada titik tempat grafiknya patah, dan di titik itu pertanyaan "menuju ke mana" tidak punya jawaban tunggal.' },
    ],
    seringKeliru: {
      judul: 'Dikira "limitnya tidak ada" berarti hasilnya nol',
      isi: 'Tidak ada bukan nol. Nol adalah sebuah bilangan, dan mengatakan limitnya nol berarti f(x) merapat ke nol. Sedangkan "tidak ada" berarti pertanyaannya sendiri tidak punya jawaban tunggal, karena dua arah menjawab berbeda. Bedanya seperti ditanya arah pulang lalu menjawab "nol kilometer" dibandingkan dengan "pertanyaannya tidak bisa dijawab karena ada dua rumah".',
    },
    widget: 'tarif-melompat',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 4,
    slug: 'lubang',
    judul: 'Lubang yang tidak mengubah tujuan',
    labelPendek: 'Lubang',
    pertanyaan: 'Titiknya kosong, kenapa limitnya tetap ada?',
    intisari: [
      'Ada fungsi yang di suatu titik sama sekali tidak punya nilai.',
      'Grafiknya berlubang persis di titik itu.',
      'Tapi tetangga kiri dan kanannya tetap menuju satu angka.',
      'Jadi limitnya ada, walaupun nilai fungsinya tidak ada.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Perhatikan fungsi ini, dan jangan buru-buru menghitungnya:' },
      { jenis: 'sorot', teks: 'f(x) = (x² - 1) dibagi (x - 1)' },
      { jenis: 'paragraf', teks: 'Sekarang coba masukkan x = 1. Pembilangnya 1 - 1 = 0. Penyebutnya juga 1 - 1 = 0. Nol dibagi nol. Fungsi ini tidak punya nilai di x = 1, titik.' },
      { jenis: 'paragraf', teks: 'Bukan bernilai nol, bukan bernilai tak hingga. Di x = 1, fungsi ini tidak terdefinisi sama sekali, seperti pertanyaan yang tidak punya jawaban.' },

      { jenis: 'sesi', judul: 'Tapi tetangganya baik-baik saja' },
      {
        jenis: 'contoh',
        judul: 'Coba angka di sekitar 1',
        baris: [
          'x = 0,9     f(x) = 1,9',
          'x = 0,99    f(x) = 1,99',
          'x = 1       tidak ada',
          'x = 1,01    f(x) = 2,01',
          'x = 1,1     f(x) = 2,1',
        ],
        simpul: 'Kiri menuju 2, kanan menuju 2. Limitnya 2, walaupun f(1) tidak ada.',
      },
      { jenis: 'paragraf', teks: 'Kenapa bisa serapi itu? Karena untuk setiap x yang BUKAN 1, pecahan tadi bisa disederhanakan:' },
      {
        jenis: 'contoh',
        judul: 'Sederhanakan, dengan satu syarat',
        baris: [
          'x² - 1 difaktorkan          (x - 1)(x + 1)',
          'dibagi (x - 1)              (x - 1)(x + 1) : (x - 1)',
          'coret, asal x bukan 1       x + 1',
        ],
        simpul: 'Jadi fungsinya sebenarnya garis y = x + 1, kecuali di x = 1 tempat ia berlubang.',
      },
      { jenis: 'paragraf', teks: 'Grafiknya adalah garis lurus biasa, dengan satu lubang sekecil titik tepat di (1, 2). Kalau lubang itu tidak digambar, tidak ada yang bisa membedakannya dari garis biasa.' },

      { jenis: 'sesi', judul: 'Inilah alasan limit dibuat orang' },
      {
        jenis: 'poin',
        judul: 'Bandingkan dengan Tahap 3',
        butir: [
          'Tarif parkir - nilainya ADA, limitnya TIDAK ADA',
          'Fungsi berlubang ini - nilainya TIDAK ADA, limitnya ADA',
        ],
      },
      { jenis: 'sorot', teks: 'Nilai fungsi dan limit adalah dua hal yang benar-benar berbeda. Yang satu bisa ada tanpa yang lain.' },
      { jenis: 'paragraf', teks: 'Sekarang kalimat dari Tahap 2 itu masuk akal: limit tidak peduli apa yang terjadi tepat di titiknya. Justru karena tidak peduli, ia masih bisa menjawab walaupun titiknya bolong.' },
      { jenis: 'paragraf', teks: 'Dan ternyata ini bukan kasus langka. Hitungan kecepatan sesaat di Tahap 1 bentuknya persis seperti ini: 0 dibagi 0 kalau dipaksakan, tetapi punya limit yang rapi setelah disederhanakan. Seluruh kalkulus berdiri di atas bentuk semacam ini.' },

      {
        jenis: 'coba',
        teks: 'Alat di sebelah kiri menggambar fungsi tadi. Perbesar tampilannya ke sekitar x = 1.',
        langkah: [
          'Pada tampilan biasa, grafiknya terlihat seperti garis lurus polos',
          'Perbesar terus ke arah titik (1, 2)',
          'Lubangnya muncul sebagai lingkaran kosong, bukan titik penuh',
          'Perhatikan penunjuk skala di pojok: ia memberi tahu seberapa dekat Anda sudah mengintip',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Dikira 0 dibagi 0 sama dengan 0, atau sama dengan 1',
      isi: 'Bentuk 0 dibagi 0 bukan sebuah bilangan, dan tidak bernilai 0 maupun 1. Ia disebut bentuk tak tentu, artinya bentuk itu belum memberi tahu apa-apa. Fungsi yang berbeda bisa sama-sama menghasilkan 0 dibagi 0 tetapi punya limit yang berbeda: (x² - 1) dibagi (x - 1) limitnya 2, sedangkan (x² - 4) dibagi (x - 2) limitnya 4, padahal keduanya 0 dibagi 0 kalau dipaksakan. Karena itu bentuknya harus ditulis ulang dulu, bukan dijawab langsung.',
    },
    widget: 'lubang-grafik',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 5,
    slug: 'cara-cepat',
    judul: 'Cara cepat, masukkan saja angkanya',
    labelPendek: 'Cara cepat',
    pertanyaan: 'Kapan limit boleh dihitung dengan langsung memasukkan angkanya?',
    intisari: [
      'Untuk banyak fungsi, limit memang bisa dihitung dengan substitusi langsung.',
      'Yang membolehkannya adalah tujuh sifat limit.',
      'Syaratnya: penyebut tidak boleh nol, dan akar tidak boleh negatif.',
      'Substitusi adalah jalan pintas yang kebetulan sah, bukan definisi limit.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Sampai di sini limit terlihat merepotkan: harus membuat tabel, mendekat dari dua arah, dan berhati-hati soal lubang. Untungnya, untuk sebagian besar fungsi yang ditemui di sekolah, ada jalan pintas yang jauh lebih cepat.' },
      { jenis: 'paragraf', teks: 'Jalan pintas itu bukan tebakan. Ia berdiri di atas tujuh sifat limit yang sudah dibuktikan orang.' },

      { jenis: 'sesi', judul: 'Tujuh sifat limit' },
      {
        jenis: 'poin',
        judul: 'Dua sifat dasar, tempat semuanya berpijak',
        butir: [
          'Limit sebuah angka tetap adalah angka itu sendiri. Limit dari 4 adalah 4',
          'Limit dari x saat x mendekati c adalah c itu sendiri',
        ],
      },
      {
        jenis: 'poin',
        judul: 'Lima sifat yang membolehkan limit dipecah',
        butir: [
          'Kelipatan - angka pengali boleh dikeluarkan dari limit',
          'Jumlah dan selisih - limit dari penjumlahan sama dengan penjumlahan limitnya',
          'Hasil kali - limit dari perkalian sama dengan perkalian limitnya',
          'Hasil bagi - boleh dipecah, ASALKAN limit penyebutnya bukan nol',
          'Pangkat dan akar - limit boleh masuk ke dalam pangkat atau akar, dengan syarat akar genap tidak boleh berisi bilangan negatif',
        ],
      },
      { jenis: 'paragraf', teks: 'Gabungkan ketujuhnya, dan hasilnya satu aturan praktis yang bisa dipakai langsung.' },
      { jenis: 'sorot', teks: 'Untuk suku banyak, dan untuk pecahan yang penyebutnya tidak nol di titik itu, limitnya bisa dihitung dengan langsung memasukkan angkanya.' },

      { jenis: 'sesi', judul: 'Dipakai pada soal sungguhan' },
      {
        jenis: 'contoh',
        judul: 'Limit dari (3x² - x + 4) dibagi (x + 2) saat x mendekati 2',
        baris: [
          'periksa penyebutnya dulu   2 + 2 = 4, bukan nol, jadi aman',
          'masukkan ke pembilang      3(4) - 2 + 4  =  14',
          'masukkan ke penyebut       4',
          'bagi                       14 : 4  =  3,5',
        ],
        simpul: 'Limitnya 3,5 atau 7/2. Tanpa tabel, tanpa mendekat dari dua arah.',
      },
      {
        jenis: 'contoh',
        judul: 'Yang mengandung akar juga boleh',
        baris: [
          'akar x dibagi (x² + 3x), saat x mendekati 4',
          'penyebutnya                16 + 12 = 28, bukan nol',
          'pembilangnya               akar dari 4 = 2',
          'bagi                       2 : 28  =  1/14',
        ],
        simpul: 'Limitnya 1/14.',
      },

      { jenis: 'sesi', judul: 'Kapan jalan pintas ini TIDAK boleh dipakai' },
      {
        jenis: 'poin',
        judul: 'Periksa penyebutnya lebih dulu, selalu',
        butir: [
          'Penyebut tidak nol - substitusi langsung sah, selesai',
          'Penyebut nol tapi pembilang bukan nol - limitnya biasanya tidak ada, dan grafiknya punya asimtot tegak. Dibahas di Tahap 9',
          'Penyebut nol DAN pembilang nol - inilah 0 dibagi 0, bentuknya harus ditulis ulang. Dibahas di Tahap 6',
        ],
      },
      { jenis: 'paragraf', teks: 'Jadi urutan kerjanya selalu sama: masukkan angkanya dulu untuk melihat apa yang terjadi. Kalau hasilnya wajar, selesai. Kalau muncul 0 dibagi 0, barulah pekerjaan yang sebenarnya dimulai.' },

      {
        jenis: 'coba',
        teks: 'Alat di sebelah kiri adalah mesin sifat limit. Anda memilih sifat mana yang dipakai di tiap langkah.',
        langkah: [
          'Pilih soalnya, lalu pilih sifat untuk langkah pertama',
          'Kalau sifatnya tepat, langkahnya terbuka dan soalnya menyusut',
          'Kalau keliru, mesin menolak dan menyebutkan alasannya',
          'Coba sengaja pakai sifat hasil bagi pada soal yang penyebutnya nol. Perhatikan apa yang dikatakan mesin',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Dikira substitusi itulah definisi limit',
      isi: 'Substitusi berhasil pada banyak soal, jadi wajar kalau lama-lama orang mengira memang begitulah cara kerja limit. Padahal urutannya terbalik. Limit didefinisikan lewat pendekatan dari dua arah, dan substitusi hanya jalan pintas yang kebetulan sah untuk fungsi yang tidak punya kejutan di titik itu. Alasan lengkapnya baru dilunasi di Tahap 9, saat kata "kontinu" diperkenalkan. Buktinya bahwa substitusi bukan definisi: pada Tahap 4 substitusi gagal total, sedangkan limitnya ada dan rapi.',
    },
    widget: 'mesin-sifat',
    siap: true,
  },
]
