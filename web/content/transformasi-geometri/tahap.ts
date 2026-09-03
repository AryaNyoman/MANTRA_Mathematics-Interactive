/**
 * Transformasi Geometri, 13 materi belajar. Topik ketujuh MANTRA.
 *
 * Rancangannya:
 * docs/superpowers/specs/2026-09-03-transformasi-geometri-alur-belajar.md
 *
 * SUMBER MATERI
 * Buku Siswa **Matematika Tingkat Lanjut** untuk SMA Kelas XI, Kurikulum
 * Sekolah Penggerak, Tim Penulis, Oktober 2021. Bab 4 "Transformasi
 * Geometri", halaman buku 175 sampai 227. Berkasnya ada di
 * `D:\BAHAN MATEMATIKA\3 Dimensi.pdf`, dan NAMA BERKAS ITU MENYESATKAN:
 * isinya bukan geometri ruang. Urutan konsep, kosakata (prapeta, peta), dan
 * garis cermin yang dibahas mengikuti buku itu. Contoh, angka, dan kalimatnya
 * ditulis sendiri.
 *
 * PENEMPATAN KURIKULUM SUDAH DIPERIKSA, BUKAN DIINGAT
 * Ini bukan Matematika wajib. Buku Panduan Guru Matematika Kelas XI Kurikulum
 * Merdeka hanya memuat TIGA bab: Komposisi Fungsi dan Fungsi Invers,
 * Lingkaran, dan Statistika. Transformasi Geometri tidak ada di sana. Ia ada
 * di jalur peminatan, Matematika Tingkat Lanjut Kelas XI, sebagai Bab 4.
 *
 * Di Kurikulum 2013, yang masih dipakai banyak sekolah dan masih jadi dasar
 * sebagian besar bahan latihan UTBK, Transformasi Geometri adalah materi
 * Kelas XI wajib. Jadi topik ini bukan bahan pinggiran: banyak siswa tetap
 * mempelajarinya, dan soalnya tetap keluar di UTBK.
 *
 * Aturan proyek (`STANDAR-MENGAJAR.md`, kompetensi "Jujur") mewajibkan bahan
 * di luar kurikulum wajib diberi label DI BADAN TEKS, bukan cuma di komentar
 * kode. Labelnya ada di Materi 01, blok `poin` berjudul "Sebelum mulai".
 * Perlakuan yang sama pernah dipakai untuk Materi 11 dan 12 topik Vektor.
 *
 * Bab 3 buku yang sama adalah Matriks, halaman 130 sampai 174, dan itu pun
 * bukan Matematika wajib. Jadi jurang prasyaratnya lebih dalam daripada
 * dugaan awal: siswa jalur wajib belum pernah bertemu matriks sama sekali.
 * Itu memperkuat keputusan ARYA di bawah.
 *
 * URUTANNYA SENGAJA BERBEDA DARI BUKU
 * Buku memulai dari pencerminan terhadap garis. Di sini urutannya dimulai dari
 * translasi. Alasannya: MANTRA sudah punya topik Vektor di Kelas 10, dan
 * translasi adalah penjumlahan vektor yang dikenakan pada titik. Memulai dari
 * situ membuat materi ini menyambung ke yang siswa sudah pelajari, bukan
 * berdiri sendiri. Keputusan ARYA 3 September 2026.
 *
 * MATRIKS DIAJARKAN DI DALAM TOPIK INI, SECUKUPNYA
 * Bagian B dan C buku berdiri di atas Bab 3 Matriks, dan MANTRA tidak punya
 * topik Matriks. Aturan `docs/tugas/STANDAR-MENGAJAR.md` butir 1.1 melarang
 * memakai gagasan yang belum dimiliki siswa. Keputusan ARYA: Materi 09
 * mengajarkan matriks 2x2 dikali koordinat dan perkalian dua matriks, tidak
 * lebih. Determinan hanya disebut, tidak dilatih sebagai prosedur.
 *
 * DUA PRASYARAT LAIN SUDAH ADA DAN LETAKNYA LEBIH AWAL
 * Penjumlahan vektor dari topik Vektor (Kelas 10) dipakai di Materi 02.
 * Nilai sin dan cos dari topik Trigonometri (Kelas 10) dipakai di Materi 06.
 *
 * BEDANYA DENGAN TAHAP "TRANSFORMASI" DI TOPIK GRAFIK FUNGSI
 * Topik Grafik Fungsi punya tahap tentang geser, cermin, dan regang pada
 * grafik. Itu barang lain: di sana kurva yang berubah lewat rumusnya, di sini
 * titik yang berpindah lewat pemetaan. Ditautkan di Materi 13, tidak diulang.
 */

import type { Tahap } from '@/content/tipe'

export type WidgetTransformasi =
  | 'papan-bebas'
  | 'geser-bentuk'
  | 'cermin-lurus'
  | 'cermin-miring'
  | 'cermin-titik'
  | 'putar-bentuk'
  | 'perbesar-bentuk'
  | 'meja-ukur'
  | 'mesin-matriks'
  | 'cocokkan-matriks'
  | 'dua-langkah'
  | 'urutan-matriks'
  | 'dunia-nyata-transformasi'

/**
 * Bentuk Tahap dengan nama widget yang DIKETATKAN ke senarai di atas.
 * Tanpa ini, salah ketik nama widget baru ketahuan saat halamannya dibuka dan
 * panggungnya diam saja. Dengan ini, TypeScript menolaknya sebelum dijalankan.
 */
type TahapTransformasi = Omit<Tahap, 'widget'> & { widget?: WidgetTransformasi }

export const TAHAP: TahapTransformasi[] = [
  /* ================================================================= */
  {
    no: 1,
    slug: 'prapeta-dan-peta',
    judul: 'Setiap titik ikut pindah',
    labelPendek: 'Prapeta',
    pertanyaan: 'Bayanganmu di kaca dan stiker yang kamu geser di layar, apa yang sama dari keduanya?',
    penjelasan: [
      {
        jenis: 'poin',
        judul: 'Sebelum mulai, satu keterangan yang jujur',
        butir: [
          'Di Kurikulum Merdeka, Transformasi Geometri ada di Matematika Tingkat Lanjut Kelas XI, bukan di Matematika wajib. Buku wajib Kelas XI hanya memuat Komposisi Fungsi, Lingkaran, dan Statistika.',
          'Di Kurikulum 2013, yang masih dipakai banyak sekolah, materi ini Kelas XI wajib. Soalnya juga masih keluar di UTBK. Jadi tetap layak dipelajari, hanya letaknya perlu kamu tahu.',
          'Materi 09 mengajarkan matriks secukupnya di dalam topik ini, sebab Matriks juga tidak ada di Matematika wajib. Kalau di sekolahmu sudah diajarkan, materi itu bisa kamu lewati cepat.',
        ],
      },
      {
        jenis: 'paragraf',
        teks: 'Kamu berdiri di depan kaca. Bayanganmu mengangkat tangan kiri saat kamu mengangkat tangan kanan. Di ponsel, kamu menahan sebuah stiker lalu menggesernya ke sudut layar. Dua kejadian yang terasa jauh berbeda.',
      },
      {
        jenis: 'paragraf',
        teks: 'Padahal keduanya satu hal yang sama. Ada aturan yang bekerja, dan aturan itu memberi tahu setiap titik harus pergi ke mana.',
      },
      { jenis: 'sesi', judul: 'Yang dipindahkan adalah titik, bukan gambar' },
      {
        jenis: 'paragraf',
        teks: 'Ini bagian yang paling mudah salah dibayangkan. Kita melihat sebuah gambar berpindah, jadi kita menyangka gambar itulah yang diangkat dan diletakkan di tempat baru, utuh seperti memindahkan kursi.',
      },
      {
        jenis: 'paragraf',
        teks: 'Yang sebenarnya terjadi lebih sederhana dan lebih kuat. Aturannya bekerja pada satu titik, lalu pada titik berikutnya, lalu pada titik berikutnya lagi. Gambarnya ikut pindah hanya karena semua titiknya pindah.',
      },
      {
        jenis: 'sorot',
        teks: 'Transformasi adalah aturan yang memasangkan setiap titik dengan satu titik tujuan.',
      },
      { jenis: 'sesi', judul: 'Dua kata yang dipakai buku' },
      {
        jenis: 'poin',
        judul: 'Namanya diberikan setelah bendanya kita lihat',
        butir: [
          'Prapeta - bentuk asalnya, yang belum dikenai aturan apa pun. Awalan "pra" berarti sebelum.',
          'Peta - hasilnya, setelah aturan itu dikenakan. Di gambar, titik peta ditandai petik, jadi pasangan titik A adalah A aksen.',
        ],
      },
      {
        jenis: 'paragraf',
        teks: 'Kata "peta" di sini tidak berhubungan dengan peta wilayah. Ia berarti hasil pemetaan, seperti kata "memetakan" pada fungsi di topik Grafik Fungsi.',
      },
      {
        jenis: 'coba',
        teks: 'Alat di sebelah kiri memuat bentuk huruf L dan petanya. Pilihan transformasinya ada di bawah gambar.',
        langkah: [
          'Perhatikan garis putus-putus tipis. Ada enam, satu untuk setiap titik sudut. Setiap titik punya tujuannya sendiri.',
          'Ganti pilihannya ke pencerminan pada sumbu Y. Keenam garis itu berubah arah semuanya sekaligus, sebab aturannya yang berganti.',
          'Ganti ke dilatasi. Sekarang jarak antara titik-titiknya ikut berubah. Kalau yang dipindahkan gambar utuh seperti memindahkan kursi, hal itu mustahil terjadi.',
        ],
      },
      { jenis: 'sesi', judul: 'Lima aturan yang akan kita pelajari' },
      {
        jenis: 'poin',
        butir: [
          'Translasi - menggeser sejauh sebuah vektor, tanpa memutar dan tanpa mengubah ukuran.',
          'Pencerminan - memindahkan ke seberang sebuah garis, atau ke seberang sebuah titik.',
          'Rotasi - memutar sejauh sebuah sudut terhadap sebuah pusat.',
          'Dilatasi - memperbesar atau memperkecil dari sebuah pusat.',
          'Komposisi - mengerjakan dua aturan di atas berurutan, dan itu bukan sekadar penjumlahan.',
        ],
      },
      {
        jenis: 'paragraf',
        teks: 'Empat yang pertama tidak pernah mengubah bentuk bendanya. Hanya dilatasi yang mengubah ukuran, dan itu yang membuatnya berbeda dari yang lain. Kita periksa pernyataan ini dengan angka di Materi 08.',
      },
    ],
    seringKeliru: {
      judul: 'Yang dipindah kan gambarnya, bukan titiknya',
      isi: 'Ini menggoda karena di layar memang gambar yang terlihat bergerak, dan tangan kita memang biasa memindahkan benda utuh. Cara membedakannya ada di alat di sebelah kiri: pilih dilatasi, lalu perhatikan jarak antara dua titik sudut ikut berubah. Benda utuh yang dipindahkan tangan tidak bisa berubah jarak antarbagiannya. Yang bisa hanya aturan yang bekerja pada setiap titik satu per satu.',
    },
    intisari: [
      'Transformasi memasangkan setiap titik dengan satu titik tujuan.',
      'Prapeta adalah bentuk asalnya, peta adalah hasilnya.',
      'Gambar ikut pindah karena semua titiknya pindah, bukan sebaliknya.',
    ],
    widget: 'papan-bebas',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 2,
    slug: 'translasi',
    judul: 'Menggeser sejauh sebuah vektor',
    labelPendek: 'Translasi',
    pertanyaan: 'Kalau seluruh isi peta digeser 3 langkah ke kanan dan 2 ke atas, apa yang berubah dari sebuah titik di dalamnya, dan apa yang tidak?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Di topik Vektor kita sudah menjumlahkan dua vektor lewat komponennya: yang mendatar dengan yang mendatar, yang tegak dengan yang tegak. Translasi memakai persis operasi itu. Yang berbeda cuma apa yang dijumlahkan.',
      },
      {
        jenis: 'paragraf',
        teks: 'Di sana kita menjumlahkan dua panah. Di sini kita menjumlahkan sebuah panah dengan sebuah titik, dan hasilnya titik baru.',
      },
      { jenis: 'sesi', judul: 'Aturannya' },
      {
        jenis: 'paragraf',
        teks: 'Titik yang digeser sejauh vektor dengan komponen a mendatar dan b tegak akan mendarat di tempat yang koordinatnya bertambah sebanyak itu.',
      },
      {
        jenis: 'sorot',
        teks: 'Titik P(x, y) oleh translasi (a, b) menjadi P aksen (x + a, y + b).',
      },
      {
        jenis: 'contoh',
        judul: 'Titik A(1, 2) digeser sejauh (4, -3)',
        baris: [
          'Komponen mendatarnya dijumlahkan, sebab geseran mendatar menambah nilai x: 1 + 4 = 5',
          'Komponen tegaknya dijumlahkan, sebab geseran tegak menambah nilai y: 2 + (-3) = -1',
          'Jadi petanya A aksen (5, -1)',
        ],
        simpul: 'Perhatikan komponen tegaknya negatif, dan negatif itu berarti turun. Angka 3 tidak boleh dibaca lepas dari tanda minusnya.',
      },
      {
        jenis: 'coba',
        teks: 'Alat di sebelah kiri punya panah geseran yang ujungnya bisa Anda tarik. Bentuk L abu-abu putus-putus adalah prapetanya.',
        langkah: [
          'Tarik ujung panahnya ke kanan atas. Bentuk birunya ikut pindah, dan keenam garis tipis penghubungnya tetap sejajar satu sama lain.',
          'Sekarang kerjakan sendiri: titik B(-2, 5) digeser sejauh (3, 1). Jumlahkan x dengan 3, lalu y dengan 1.',
          'Jawabannya B aksen (1, 6). Cocokkan dengan tabel angka di bawah penjelasan ini.',
        ],
      },
      { jenis: 'sesi', judul: 'Kesejajaran itu bukan kebetulan' },
      {
        jenis: 'paragraf',
        teks: 'Di gambar, keenam garis penghubung selalu sejajar dan selalu sama panjang. Sebabnya sederhana: setiap titik dijumlahkan dengan vektor yang sama. Tidak ada titik yang mendapat perlakuan berbeda.',
      },
      {
        jenis: 'paragraf',
        teks: 'Inilah tanda pengenal translasi. Empat transformasi lain tidak punya sifat ini. Pada rotasi, titik yang jauh dari pusat menempuh jarak lebih panjang daripada titik yang dekat.',
      },
      {
        jenis: 'poin',
        judul: 'Yang berubah dan yang tidak',
        butir: [
          'Berubah - letaknya saja.',
          'Tidak berubah - panjang setiap sisi, besar setiap sudut, luasnya, dan arah putarnya.',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Translasi (3, -2) berarti geser 3 ke kanan dan 2 ke atas',
      isi: 'Yang menggoda di sini adalah angka 2 terbaca lepas dari tanda minusnya, sebab kita membaca "dua" lebih dulu daripada tandanya. Cara membedakannya: ingat komponen tegak itu menambah nilai y, dan menambah bilangan negatif berarti nilai y berkurang. Nilai y yang berkurang berarti titiknya turun. Jadi (3, -2) adalah 3 ke kanan dan 2 ke BAWAH.',
    },
    intisari: [
      'Translasi menambahkan vektor geseran ke koordinat setiap titik.',
      'Keenam garis penghubungnya sejajar dan sama panjang, sebab setiap titik dijumlahkan dengan vektor yang sama.',
      'Bentuk, ukuran, dan arah putarnya tidak berubah. Hanya letaknya.',
    ],
    widget: 'geser-bentuk',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 3,
    slug: 'cermin-garis-lurus',
    judul: 'Cermin pada garis tegak dan mendatar',
    labelPendek: 'Cermin lurus',
    pertanyaan: 'Kalau kamu berdiri 2 meter di depan kaca, di mana bayanganmu berada, dan kenapa di situ?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Jawaban yang biasa kita dengar adalah 2 meter di belakang kaca. Jawaban itu benar, dan di dalamnya ada dua hal yang perlu kita sebut terpisah.',
      },
      {
        jenis: 'poin',
        judul: 'Dua hal yang menentukan letak bayangan',
        butir: [
          'Jaraknya sama - kamu 2 meter di depan, bayangan 2 meter di belakang. Tidak lebih, tidak kurang.',
          'Arahnya tegak lurus - bayanganmu tepat di seberang, bukan menyerong ke samping.',
        ],
      },
      {
        jenis: 'sorot',
        teks: 'Pencerminan memindahkan titik ke seberang garis, tegak lurus terhadap garisnya, dengan jarak yang sama.',
      },
      { jenis: 'sesi', judul: 'Mulai dari cermin yang paling sederhana' },
      {
        jenis: 'paragraf',
        teks: 'Kita pakai sumbu Y sebagai kaca. Sebuah titik di kanan sumbu Y akan mendarat di kiri, sejauh yang sama. Nilai tegaknya tidak berubah sedikit pun, sebab bergerak tegak lurus terhadap garis tegak berarti bergerak mendatar saja.',
      },
      {
        jenis: 'contoh',
        judul: 'Empat aturan yang semuanya berasal dari satu gagasan',
        baris: [
          'Cermin sumbu Y, yaitu garis x = 0: P(x, y) menjadi (-x, y), sebab hanya nilai mendatarnya menyeberang',
          'Cermin sumbu X, yaitu garis y = 0: P(x, y) menjadi (x, -y), sebab hanya nilai tegaknya menyeberang',
          'Cermin garis x = k: P(x, y) menjadi (2k - x, y)',
          'Cermin garis y = h: P(x, y) menjadi (x, 2h - y)',
        ],
        simpul: 'Dua baris pertama adalah kasus k = 0 dan h = 0 dari dua baris terakhir. Jadi yang perlu diingat sebenarnya dua, bukan empat.',
      },
      { jenis: 'sesi', judul: 'Dari mana 2k itu datang' },
      {
        jenis: 'paragraf',
        teks: 'Jangan hafalkan 2k. Turunkan saja, dan turunannya cuma satu langkah.',
      },
      {
        jenis: 'contoh',
        judul: 'Titik A(1, 2) dicerminkan pada garis x = 5',
        baris: [
          'Jarak A ke garis cerminnya: 5 - 1 = 4 satuan',
          'Bayangannya harus 4 satuan di seberang, jadi pada 5 + 4 = 9',
          'Nilai y tidak disentuh, sebab garis cerminnya tegak',
          'Jadi A aksen (9, 2)',
          'Diperiksa dengan rumus: 2 dikali 5 dikurangi 1 sama dengan 9. Cocok',
        ],
        simpul: 'Rumus 2k - x hanyalah dua langkah pertama yang digabung: k dikurangi x memberi jaraknya, lalu ditambahkan lagi ke k.',
      },
      {
        jenis: 'coba',
        teks: 'Alat di sebelah kiri punya garis cermin ungu yang bisa Anda tarik. Bulatan ungunya pegangannya.',
        langkah: [
          'Tarik garis cerminnya ke tempat lain. Perhatikan kedua angka ungu pada titik A selalu sama, ke mana pun garisnya dipindah.',
          'Geser garisnya sampai tepat memotong bentuk L. Sebagian bentuknya sekarang bercermin ke dalam dirinya sendiri, dan itu sah.',
          'Sekarang kerjakan sendiri: titik B(3, -1) dicerminkan pada garis y = 2. Jaraknya 2 dikurangi negatif 1 sama dengan 3, jadi bayangannya 3 satuan di atas garisnya.',
          'Jawabannya B aksen (3, 5).',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Dicerminkan pada garis x = 5 berarti nilai x dikurangi 5',
      isi: 'Yang menggoda: angka 5 memang muncul di rumus garisnya, dan mengurangi adalah hal pertama yang terpikir. Cara membedakannya: gambar dulu, baru hitung. Titik dengan x = 1 kalau dikurangi 5 memberi negatif 4, jadi bayangannya akan jatuh jauh di kiri sumbu Y. Padahal garis cerminnya ada di x = 5 dan titiknya di kirinya, sehingga bayangannya wajib berada di KANAN garis itu. Satu gambar sudah cukup meruntuhkan cara itu.',
    },
    intisari: [
      'Pencerminan memindahkan titik tegak lurus ke seberang garis, dengan jarak yang sama.',
      'Sumbu X dan sumbu Y hanyalah kasus h = 0 dan k = 0 dari garis mendatar dan garis tegak.',
      'Angka 2k datang dari menghitung jaraknya lalu menambahkannya kembali, bukan dari hafalan.',
    ],
    widget: 'cermin-lurus',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 4,
    slug: 'cermin-garis-miring',
    judul: 'Cermin pada garis y = x dan y = -x',
    labelPendek: 'Cermin miring',
    pertanyaan: 'Apa yang terjadi pada titik (3, 7) kalau dicerminkan pada garis yang membelah kuadran pertama tepat di tengah?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Garis yang membelah kuadran pertama tepat di tengah adalah garis y = x. Sebelum menghitung apa pun, ada satu hal tentang garis itu yang perlu kita sadari.',
      },
      {
        jenis: 'paragraf',
        teks: 'Setiap titik di garis y = x punya dua koordinat yang sama: (1, 1), (2, 2), (4,5; 4,5). Di garis itu, peran mendatar dan peran tegak tidak bisa dibedakan.',
      },
      { jenis: 'sesi', judul: 'Karena itu mencerminkannya berarti menukar peran' },
      {
        jenis: 'paragraf',
        teks: 'Kalau garis cerminnya sendiri tidak membedakan mendatar dari tegak, maka mencerminkan sesuatu padanya sama dengan menukar kedua peran itu. Yang tadinya sejauh 3 ke kanan menjadi sejauh 3 ke atas.',
      },
      {
        jenis: 'sorot',
        teks: 'Cermin pada y = x menukar koordinatnya: (x, y) menjadi (y, x).',
      },
      {
        jenis: 'contoh',
        judul: 'Tiga titik dicerminkan pada garis y = x',
        baris: [
          'A(2, 5) menjadi A aksen (5, 2), kedua angkanya bertukar tempat',
          'B(-3, 4) menjadi B aksen (4, -3), tandanya ikut pindah bersama angkanya',
          'C(6, 6) menjadi C aksen (6, 6), tidak berpindah sebab titiknya berada DI garis cerminnya',
        ],
        simpul: 'Baris ketiga bukan kegagalan. Titik yang berada tepat di garis cermin memang tidak pernah berpindah, sama seperti kaca tidak memindahkan dirinya sendiri.',
      },
      { jenis: 'sesi', judul: 'Garis yang satu lagi, y = -x' },
      {
        jenis: 'paragraf',
        teks: 'Garis y = -x adalah garis yang membelah kuadran kedua dan keempat. Di garis itu kedua koordinatnya berlawanan tanda: (1, -1), (3, -3), (-5, 5).',
      },
      {
        jenis: 'paragraf',
        teks: 'Jadi pencerminannya menukar tempat DAN membalik kedua tandanya. Dua hal, bukan satu, dan di sinilah kekeliruan paling sering terjadi.',
      },
      {
        jenis: 'sorot',
        teks: 'Cermin pada y = -x: (x, y) menjadi (-y, -x). Bertukar tempat, lalu kedua tandanya berbalik.',
      },
      {
        jenis: 'coba',
        teks: 'Alat di sebelah kiri menuliskan koordinat ketiga sudut bernama, prapeta dan petanya berdampingan. Pilihan garisnya ada di bawah gambar.',
        langkah: [
          'Baca titik B dan B aksen pada pilihan y = x. Angkanya bertukar tempat, dan itu terlihat langsung dari tulisannya.',
          'Ganti ke y = -x. Sekarang angkanya bertukar tempat dan kedua tandanya jadi negatif.',
          'Sekarang kerjakan sendiri: titik B(-3, 4) dicerminkan pada y = -x. Tukar dulu menjadi (4, -3), lalu balik kedua tandanya.',
          'Jawabannya B aksen (-4, 3).',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Cermin pada y = -x cukup membalik tandanya, tanpa menukar',
      isi: 'Yang menggoda: tanda minus di rumus garisnya lebih menarik perhatian daripada pertukaran posisinya, jadi kita mengerjakan yang terlihat dan melupakan yang tidak. Cara membedakannya: uji dengan titik yang kedua koordinatnya berbeda jauh, misalnya (1, 9). Kalau hanya tanda yang dibalik, hasilnya (-1, -9). Gambarkan keduanya, lalu tarik garis dari (1, 9) ke (-1, -9). Garis itu tidak tegak lurus terhadap y = -x, jadi jawabannya tidak mungkin benar. Jawaban yang benar (-9, -1).',
    },
    intisari: [
      'Cermin pada y = x menukar kedua koordinatnya.',
      'Cermin pada y = -x menukar tempatnya DAN membalik kedua tandanya.',
      'Titik yang berada tepat di garis cermin tidak pernah berpindah.',
    ],
    widget: 'cermin-miring',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 5,
    slug: 'cermin-titik',
    judul: 'Cermin pada sebuah titik',
    labelPendek: 'Cermin titik',
    pertanyaan: 'Kalau cerminnya bukan sebuah garis, tapi satu titik saja, ke mana sebuah titik lain akan pergi?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Sampai di sini cermin kita selalu berupa garis. Sekarang cerminnya diganti sebuah titik, dan aturannya jadi lebih pendek daripada sebelumnya.',
      },
      {
        jenis: 'paragraf',
        teks: 'Bayangkan sebuah paku ditancapkan di titik M, lalu seutas karet ditarik dari sebuah titik P melewati paku itu dan diteruskan sejauh yang sama. Di ujung karet itulah petanya berada.',
      },
      { jenis: 'sesi', judul: 'Pusatnya selalu tepat di tengah' },
      {
        jenis: 'sorot',
        teks: 'Pencerminan pada titik M memindahkan P ke seberang M, sehingga M tepat di tengah antara P dan P aksen.',
      },
      {
        jenis: 'paragraf',
        teks: 'Kalimat "tepat di tengah" itu bukan penjelasan tambahan. Itu definisinya, dan dari definisi itu rumusnya bisa kita susun sendiri tanpa menghafal apa pun.',
      },
      {
        jenis: 'contoh',
        judul: 'Titik A(1, 2) dicerminkan pada titik M(3, 3)',
        baris: [
          'M harus jadi titik tengah A dan A aksen, jadi rata-rata koordinat mendatarnya bernilai 3',
          'Untuk sumbu mendatar: (1 + x aksen) dibagi 2 sama dengan 3, sehingga x aksen = 5',
          'Untuk sumbu tegak: (2 + y aksen) dibagi 2 sama dengan 3, sehingga y aksen = 4',
          'Jadi A aksen (5, 4)',
          'Diperiksa dengan rumus jadi: 2 dikali 3 dikurangi 1 sama dengan 5, dan 2 dikali 3 dikurangi 2 sama dengan 4. Cocok',
        ],
        simpul: 'Jadi rumusnya P(x, y) menjadi (2a - x, 2b - y) untuk pusat M(a, b). Bentuknya mirip rumus garis x = k di Materi 03, dan itu bukan kebetulan: keduanya berasal dari gagasan jarak sama.',
      },
      {
        jenis: 'poin',
        judul: 'Kasus yang paling sering keluar di soal',
        butir: [
          'Pusat di titik asal O(0, 0) - P(x, y) menjadi (-x, -y). Kedua tandanya berbalik.',
          'Pusat di titik M(a, b) - P(x, y) menjadi (2a - x, 2b - y).',
        ],
      },
      {
        jenis: 'coba',
        teks: 'Alat di sebelah kiri punya pusat cermin yang bisa Anda tarik ke mana saja.',
        langkah: [
          'Tarik pusatnya. Perhatikan garis dari tiap titik prapeta selalu MELEWATI pusatnya sebelum sampai ke petanya.',
          'Perhatikan juga kedua angka ungu di titik A selalu sama, di mana pun pusatnya diletakkan.',
          'Sekarang kerjakan sendiri: titik B(4, -1) dicerminkan pada M(1, 2). Jawabannya B aksen (-2, 5).',
          'Terakhir, tarik pusatnya sampai tepat ke titik asal, lalu ingat gambarnya. Kita akan menemuinya lagi di materi berikutnya.',
        ],
      },
      { jenis: 'sesi', judul: 'Satu janji untuk materi berikutnya' },
      {
        jenis: 'paragraf',
        teks: 'Kalau kamu menaruh pusatnya di titik asal tadi, bentuknya terlihat seperti diputar setengah lingkaran, bukan seperti dilipat. Itu bukan kebetulan.',
      },
      {
        jenis: 'paragraf',
        teks: 'Pencerminan pada sebuah titik memberi hasil yang sama dengan memutar 180 derajat terhadap titik itu. Kita buktikan dengan angka di Materi 06.',
      },
    ],
    seringKeliru: {
      judul: 'Cermin pada titik itu sama saja dengan cermin pada garis, jadi arah putarnya berbalik',
      isi: 'Yang menggoda: keduanya memakai kata "cermin", dan cermin pada garis memang membalik arah putar. Bayangan tangan kanan di kaca adalah tangan kiri. Cara membedakannya: perhatikan urutan A, B, C pada gambar. Pada cermin garis, urutan itu berbalik arah putarnya. Pada cermin titik, urutan itu TETAP. Sebabnya akan terlihat di Materi 06: cermin titik sebenarnya sebuah rotasi, dan rotasi tidak pernah membalik arah putar.',
    },
    intisari: [
      'Pencerminan pada titik M menaruh M tepat di tengah antara prapeta dan petanya.',
      'Rumusnya (2a - x, 2b - y), dan itu bisa disusun sendiri dari gagasan titik tengah.',
      'Hasilnya sama dengan memutar 180 derajat terhadap titik itu.',
    ],
    widget: 'cermin-titik',
    siap: true,
  },
]
