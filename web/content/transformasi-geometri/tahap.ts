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
        teks: 'Alat interaktifnya memuat bentuk huruf L dan petanya. Pilihan transformasinya ada di bawah gambar.',
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
      isi: 'Ini menggoda karena di layar memang gambar yang terlihat bergerak, dan tangan kita memang biasa memindahkan benda utuh. Cara membedakannya ada di alat interaktifnya: pilih dilatasi, lalu perhatikan jarak antara dua titik sudut ikut berubah. Benda utuh yang dipindahkan tangan tidak bisa berubah jarak antarbagiannya. Yang bisa hanya aturan yang bekerja pada setiap titik satu per satu.',
    },
    intisari: [
      'Transformasi memasangkan setiap titik dengan satu titik tujuan.',
      'Prapeta adalah bentuk asalnya, peta adalah hasilnya.',
      'Gambar ikut pindah karena semua titiknya pindah, bukan sebaliknya.',
    ],
    widget: 'papan-bebas',
    video: { berkas: 'transformasi1-setiap-titik.mp4', poster: 'transformasi1-setiap-titik.jpg' },
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
        teks: 'Alat interaktifnya punya panah geseran yang ujungnya bisa Anda tarik. Bentuk L abu-abu putus-putus adalah prapetanya.',
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
        jenis: 'paragraf',
        teks: 'Sebelum itu, satu catatan. Pada translasi di Materi 02, setiap titik bergerak sejauh vektor yang sama, sehingga keenam garis penghubungnya sejajar dan sama panjang. Pencerminan tidak begitu: titik yang jauh dari kaca berpindah lebih jauh daripada titik yang dekat. Jadi aturannya memang harus kita cari dari awal.',
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
        teks: 'Alat interaktifnya punya garis cermin ungu yang bisa Anda tarik. Bulatan ungunya pegangannya.',
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
    video: { berkas: 'transformasi2-cermin-garis.mp4', poster: 'transformasi2-cermin-garis.jpg' },
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
        teks: 'Di Materi 03 garis cerminnya selalu tegak atau mendatar, dan itu memberi kita kemudahan yang mungkin tidak kamu sadari: salah satu koordinat pasti aman, tidak tersentuh sama sekali. Sekarang garisnya miring, dan kemudahan itu hilang. Kedua koordinatnya sama-sama berubah.',
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
        teks: 'Alat interaktifnya menuliskan koordinat ketiga sudut bernama, prapeta dan petanya berdampingan. Pilihan garisnya ada di bawah gambar.',
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
        teks: 'Alat interaktifnya punya pusat cermin yang bisa Anda tarik ke mana saja.',
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

  /* ================================================================= */
  {
    no: 6,
    slug: 'rotasi',
    judul: 'Memutar terhadap sebuah pusat',
    labelPendek: 'Rotasi',
    pertanyaan: 'Jarum jam berputar seperempat putaran. Kalau ujungnya semula di titik (4, 0), di mana ia sekarang?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Pertanyaan itu bisa dijawab tanpa rumus apa pun. Ujung jarumnya berjarak 4 satuan dari pusat, dan berputar seperempat putaran tidak mengubah jaraknya. Yang berubah hanya arahnya.',
      },
      {
        jenis: 'paragraf',
        teks: 'Kalau diputar berlawanan arah jarum jam, ia berpindah dari sumbu X positif ke sumbu Y positif. Jadi jawabannya (0, 4). Kita mulai dari kasus-kasus seperti ini, yang bisa dibaca dari gambar.',
      },
      { jenis: 'sesi', judul: 'Kesepakatan arah, supaya tidak salah paham' },
      {
        jenis: 'poin',
        butir: [
          'Sudut positif berarti BERLAWANAN arah jarum jam. Ini kesepakatan yang dipakai semua buku matematika, dan sama dengan yang kamu pakai di topik Trigonometri.',
          'Sudut negatif berarti searah jarum jam. Rotasi -90 derajat sama hasilnya dengan rotasi 270 derajat.',
          'Kalau soal menyebut arah putar tanpa menyebut tandanya, gambarkan dulu. Salah arah membuat jawabannya masuk ke kuadran yang berbeda.',
        ],
      },
      { jenis: 'sesi', judul: 'Tiga sudut bulat yang paling sering dipakai' },
      {
        jenis: 'contoh',
        judul: 'Rotasi terhadap titik asal, dibaca dari gambar',
        baris: [
          'Putar 90 derajat: P(x, y) menjadi (-y, x). Coba pada (4, 0), hasilnya (0, 4), sama dengan jawaban jarum jam tadi',
          'Putar 180 derajat: P(x, y) menjadi (-x, -y)',
          'Putar 270 derajat: P(x, y) menjadi (y, -x)',
        ],
        simpul: 'Ketiganya tidak perlu dihafal terpisah. Putar 180 derajat sama dengan memutar 90 derajat dua kali, dan putar 270 derajat sama dengan tiga kali.',
      },
      {
        jenis: 'sorot',
        teks: 'Baris kedua itu persis rumus pencerminan pada titik asal di Materi 05. Janji yang dibuat di sana sekarang terbukti.',
      },
      {
        jenis: 'paragraf',
        teks: 'Jadi pencerminan pada sebuah titik bukan jenis transformasi yang berdiri sendiri. Ia setengah putaran, dan kita boleh menyebutnya dengan nama mana pun.',
      },
      {
        jenis: 'coba',
        teks: 'Alat interaktifnya punya penggeser sudut, dan pusat putarnya bisa ditarik.',
        langkah: [
          'Setel sudutnya ke 90, lalu ke 180, lalu ke 270. Perhatikan kedua angka jaraknya di layar SELALU sama, berapa pun sudutnya.',
          'Setel ke 180 dengan pusat di titik asal, lalu bandingkan dengan gambar Materi 05 yang pusatnya juga di titik asal. Keduanya sama persis.',
          'Sekarang tarik pusat putarnya ke tempat lain. Bentuknya tidak lagi berputar di tempat, melainkan berayun mengelilingi pusat barunya.',
        ],
      },
      { jenis: 'sesi', judul: 'Sudut yang bukan kelipatan 90' },
      {
        jenis: 'paragraf',
        teks: 'Untuk sudut seperti 37 derajat, gambar saja tidak cukup. Di sinilah sin dan cos dari topik Trigonometri dipakai.',
      },
      {
        jenis: 'paragraf',
        teks: 'Mulai dari yang sudah kamu tahu. Di lingkaran satuan, titik (1, 0) yang diputar sejauh sudut a mendarat tepat di (cos a, sin a). Itu bukan rumus baru: itu memang definisi cos dan sin di lingkaran satuan.',
      },
      {
        jenis: 'paragraf',
        teks: 'Sekarang titik (0, 1). Ia berada seperempat putaran di depan (1, 0), dan tetap begitu setelah keduanya diputar bersama. Jadi ia mendarat di (-sin a, cos a).',
      },
      {
        jenis: 'sorot',
        teks: 'P(x, y) diputar sejauh sudut a terhadap titik asal menjadi (x cos a - y sin a, x sin a + y cos a).',
      },
      {
        jenis: 'paragraf',
        teks: 'Kenapa dari dua titik tadi bisa langsung ke rumus untuk SEMUA titik? Alasannya dibahas di Materi 09, saat kita mengenal matriks. Untuk sekarang, mari kita periksa dulu apakah rumusnya benar.',
      },
      {
        jenis: 'contoh',
        judul: 'Menguji rumusnya pada sudut yang jawabannya sudah kita tahu',
        baris: [
          'Untuk a = 90 derajat: cos 90 bernilai 0 dan sin 90 bernilai 1',
          'Masukkan: (x dikali 0 dikurangi y dikali 1, x dikali 1 ditambah y dikali 0)',
          'Hasilnya (-y, x), sama persis dengan aturan 90 derajat yang tadi kita baca dari gambar',
          'Untuk a = 180 derajat: cos 180 bernilai -1 dan sin 180 bernilai 0, hasilnya (-x, -y). Cocok juga',
        ],
        simpul: 'Rumus yang lolos diuji pada kasus yang jawabannya sudah diketahui lebih layak dipercaya daripada rumus yang cuma dihafal.',
      },
      { jenis: 'sesi', judul: 'Kalau pusatnya bukan titik asal' },
      {
        jenis: 'paragraf',
        teks: 'Semua rumus di atas hanya berlaku untuk pusat di titik asal. Untuk pusat lain, jangan cari rumus baru. Pindahkan saja masalahnya.',
      },
      {
        jenis: 'poin',
        judul: 'Resep tiga langkah',
        butir: [
          'Geser semuanya, sehingga pusat putarnya jatuh di titik asal. Caranya kurangi koordinat pusatnya.',
          'Putar dengan rumus yang sudah kita punya.',
          'Geser kembali, sebanyak yang tadi dikurangi.',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Titik (2, 1) diputar 90 derajat terhadap pusat (1, 1)',
        baris: [
          'Langkah 1, ukur dari pusatnya: (2 dikurangi 1, 1 dikurangi 1) sama dengan (1, 0)',
          'Langkah 2, putar 90 derajat dengan aturan (x, y) menjadi (-y, x): (1, 0) menjadi (0, 1)',
          'Langkah 3, kembalikan dari pusatnya: (1 ditambah 0, 1 ditambah 1) sama dengan (1, 2)',
        ],
        simpul: 'Resep yang sama akan kita pakai lagi di Materi 07 untuk dilatasi. Sekali dikuasai, ia berlaku untuk semua transformasi yang punya pusat.',
      },
    ],
    seringKeliru: {
      judul: 'Rotasi 90 derajat berarti nilai x dan y ditukar',
      isi: 'Yang menggoda: hasilnya (-y, x) memang mengandung pertukaran, jadi separuh dugaan itu benar dan separuhnya lagi terlupakan. Cara membedakannya: bandingkan dengan cermin pada garis y = x di Materi 04, yang hasilnya (y, x) tanpa tanda minus. Kalau keduanya sama, dua transformasi yang gambarnya jelas berbeda akan punya rumus yang sama, dan itu mustahil. Uji dengan titik (2, 0): rotasi 90 derajat memberi (0, 2) yang berada di atas, sedangkan cermin y = x memberi (0, 2) juga. Kebetulan sama. Uji lagi dengan (2, 1): rotasi memberi (-1, 2), cermin memberi (1, 2). Sekarang bedanya terlihat.',
    },
    intisari: [
      'Rotasi menjaga jarak setiap titik ke pusatnya, hanya arahnya yang berubah.',
      'Rotasi 180 derajat sama dengan pencerminan pada pusatnya.',
      'Untuk sudut sembarang: (x cos a - y sin a, x sin a + y cos a), berlaku untuk pusat di titik asal.',
      'Pusat yang bukan titik asal dikerjakan tiga langkah: geser, putar, geser kembali.',
    ],
    widget: 'putar-bentuk',
    video: { berkas: 'transformasi3-rotasi.mp4', poster: 'transformasi3-rotasi.jpg' },
    siap: true,
  },

  /* ================================================================= */
  {
    no: 7,
    slug: 'dilatasi',
    judul: 'Memperbesar dan memperkecil',
    labelPendek: 'Dilatasi',
    pertanyaan: 'Sebuah foto diperbesar dua kali di layar. Semua titiknya menjauh dari mana?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Pertanyaan itu punya jebakan kecil. Kita biasa bilang "fotonya membesar", seolah tidak ada tempat tertentu yang jadi acuan. Padahal ada, dan tanpa acuan itu perintah "perbesar dua kali" belum lengkap.',
      },
      {
        jenis: 'paragraf',
        teks: 'Coba perbesar foto di ponsel dengan dua jari. Ada satu titik di layar yang tidak bergerak sama sekali, yaitu titik di antara kedua jarimu. Semua titik lain menjauh dari situ.',
      },
      { jenis: 'sesi', judul: 'Aturannya' },
      {
        jenis: 'paragraf',
        teks: 'Dilatasi butuh dua keterangan: sebuah pusat, dan sebuah angka pengali yang biasa disebut faktor skala, ditulis k.',
      },
      {
        jenis: 'sorot',
        teks: 'Dilatasi berpusat M dengan faktor k memindahkan setiap titik sepanjang garis dari M, sehingga jaraknya menjadi k kali semula.',
      },
      {
        jenis: 'contoh',
        judul: 'Dua bentuk rumusnya',
        baris: [
          'Pusat di titik asal: P(x, y) menjadi (kx, ky). Kedua koordinatnya dikalikan k',
          'Pusat di M(a, b): P(x, y) menjadi (a + k(x - a), b + k(y - b))',
        ],
        simpul: 'Bentuk kedua adalah resep tiga langkah dari Materi 06 yang ditulis dalam satu baris: ukur dari pusatnya, kalikan, kembalikan dari pusatnya.',
      },
      {
        jenis: 'contoh',
        judul: 'Titik A(2, 1) didilatasi faktor 3 berpusat di M(1, 1)',
        baris: [
          'Langkah 1, ukur A dari pusat M: (2 dikurangi 1, 1 dikurangi 1) sama dengan (1, 0)',
          'Langkah 2, kalikan dengan 3: (3, 0)',
          'Langkah 3, kembalikan dari M: (1 ditambah 3, 1 ditambah 0) sama dengan (4, 1)',
          'Jadi A aksen (4, 1)',
        ],
        simpul: 'Periksa masuk akalnya: A berjarak 1 satuan dari M, dan A aksen berjarak 3 satuan. Tiga kali, sesuai faktornya.',
      },
      { jenis: 'sesi', judul: 'Empat watak k yang harus kamu coba sendiri' },
      {
        jenis: 'poin',
        butir: [
          'k lebih dari 1 - bentuknya membesar dan menjauh dari pusat.',
          'k antara 0 dan 1 - bentuknya mengecil dan mendekat ke pusat. Faktor 0,5 membuatnya separuh, bukan setengahnya hilang.',
          'k negatif - bentuknya menyeberang ke sisi lain pusatnya, sambil berubah ukuran sebanyak nilai k tanpa tandanya.',
          'k sama dengan 1 tidak mengubah apa pun, dan k sama dengan 0 meruntuhkan seluruh bentuk ke satu titik, yaitu pusatnya sendiri.',
        ],
      },
      {
        jenis: 'coba',
        teks: 'Alat interaktifnya punya penggeser faktor dari -3 sampai 3, dan pusatnya bisa ditarik.',
        langkah: [
          'Geser faktornya melewati angka 1. Di situ petanya menempel tepat pada prapetanya, lalu berpisah lagi.',
          'Lewati angka 0 perlahan. Bentuknya menciut ke satu titik, lalu muncul kembali di sisi seberang pusatnya.',
          'Perhatikan keterangan nisbah di pita bawah. Angkanya selalu sama dengan faktor yang sedang Anda setel.',
          'Setel ke 3, lalu lihat penunjuk skala di pojok kanan bawah. Bingkainya melebar sendiri supaya bentuknya tidak terpotong.',
        ],
      },
      { jenis: 'sesi', judul: 'Inilah yang membedakannya dari empat yang lain' },
      {
        jenis: 'paragraf',
        teks: 'Translasi, kedua pencerminan, dan rotasi tidak pernah mengubah ukuran. Bentuk hasilnya selalu sama besar dengan bentuk asalnya, hanya berpindah tempat atau berputar.',
      },
      {
        jenis: 'paragraf',
        teks: 'Dilatasi satu-satunya yang mengubah ukuran. Karena itu ia sering disebut terpisah dari keempat yang lain. Perbandingannya kita periksa dengan angka di Materi 08.',
      },
    ],
    seringKeliru: {
      judul: 'Dilatasi faktor 3 berarti setiap koordinat dikalikan 3',
      isi: 'Yang menggoda: untuk pusat di titik asal, kalimat itu memang benar, dan kasus itulah yang paling sering muncul di contoh. Kekeliruannya baru terlihat saat pusatnya dipindah. Cara membedakannya: uji dengan pusat M(1, 1) dan titik A(2, 1). Mengalikan langsung memberi (6, 3), yang berjarak lebih dari 5 satuan dari M. Padahal jaraknya seharusnya 3 kali 1, yaitu 3 satuan saja. Selalu ukur dari pusatnya dulu.',
    },
    intisari: [
      'Dilatasi butuh dua keterangan: pusat dan faktor skala k.',
      'Jarak setiap titik ke pusat menjadi k kali semula.',
      'Faktor negatif melempar bentuknya ke sisi seberang pusat.',
      'Ini satu-satunya dari lima transformasi yang mengubah ukuran.',
    ],
    widget: 'perbesar-bentuk',
    video: { berkas: 'transformasi4-dilatasi.mp4', poster: 'transformasi4-dilatasi.jpg' },
    siap: true,
  },

  /* ================================================================= */
  {
    no: 8,
    slug: 'yang-tetap',
    judul: 'Apa yang tetap, apa yang berubah',
    labelPendek: 'Yang tetap',
    pertanyaan: 'Dari lima transformasi yang sudah kita pakai, mana yang bisa mengubah luas sebuah bangun, dan mana yang tidak mungkin?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Kita sudah punya lima aturan. Sekarang kita berhenti sejenak, dan mengukur. Bukan menghitung peta sebuah titik, melainkan menanyakan sifat apa yang bertahan dan sifat apa yang runtuh.',
      },
      {
        jenis: 'paragraf',
        teks: 'Ada empat hal yang layak diukur pada sebuah bangun: panjang sisinya, besar sudutnya, luasnya, dan arah putar titik-titiknya.',
      },
      { jenis: 'sesi', judul: 'Arah putar, ukuran yang mungkin baru buatmu' },
      {
        jenis: 'paragraf',
        teks: 'Ambil tiga titik bernama A, B, dan C pada sebuah bangun. Berjalanlah dari A ke B lalu ke C. Kamu berputar berlawanan arah jarum jam, atau searah jarum jam. Itulah arah putarnya.',
      },
      {
        jenis: 'paragraf',
        teks: 'Kenapa ini penting? Karena arah putar adalah satu-satunya ukuran yang membedakan pencerminan dari transformasi lain. Bayangan tangan kananmu di kaca adalah tangan kiri: jarinya sama panjang, sudutnya sama, tetapi urutannya berbalik.',
      },
      { jenis: 'sesi', judul: 'Tabelnya' },
      {
        jenis: 'contoh',
        judul: 'Yang tetap dan yang berubah pada kelima transformasi',
        baris: [
          'Translasi: panjang tetap, sudut tetap, luas tetap, arah putar tetap',
          'Cermin pada garis: panjang tetap, sudut tetap, luas tetap, arah putar BERBALIK',
          'Cermin pada titik: panjang tetap, sudut tetap, luas tetap, arah putar tetap',
          'Rotasi: panjang tetap, sudut tetap, luas tetap, arah putar tetap',
          'Dilatasi faktor k: panjang menjadi k kali tanpa tandanya, sudut TETAP, luas menjadi k kuadrat kali, arah putar tetap',
        ],
        simpul: 'Empat baris pertama sama persis kecuali satu sel. Karena itu keempatnya sering disebut satu keluarga: transformasi yang mempertahankan jarak.',
      },
      {
        jenis: 'sorot',
        teks: 'Hanya dilatasi yang mengubah ukuran. Hanya pencerminan pada garis yang membalik arah putar.',
      },
      { jenis: 'sesi', judul: 'Dua baris yang paling sering mengejutkan' },
      {
        jenis: 'paragraf',
        teks: 'Yang pertama: dilatasi mengubah luas sebanyak k KUADRAT kali, bukan k kali. Alasannya bisa dilihat tanpa rumus. Luas ditentukan oleh dua ukuran sekaligus, panjang dan lebar, dan keduanya sama-sama dikalikan k.',
      },
      {
        jenis: 'contoh',
        judul: 'Persegi bersisi 2, didilatasi faktor 3',
        baris: [
          'Luas semula: 2 dikali 2 sama dengan 4 satuan luas',
          'Sisinya menjadi 3 kali, yaitu 6',
          'Luas barunya: 6 dikali 6 sama dengan 36 satuan luas',
          'Nisbahnya: 36 dibagi 4 sama dengan 9, dan 9 adalah 3 kuadrat',
        ],
        simpul: 'Kalau kamu pernah membeli pizza, ini alasan pizza berdiameter dua kali lipat berisi EMPAT kali lebih banyak, bukan dua kali.',
      },
      {
        jenis: 'paragraf',
        teks: 'Yang kedua: dilatasi dengan k negatif TIDAK membalik arah putar, walaupun bentuknya terlihat terjungkir. Sebabnya, dilatasi berfaktor negatif sama saja dengan dilatasi berfaktor positif lalu diputar setengah lingkaran, dan setengah putaran tidak membalik arah putar.',
      },
      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menandai sisi AB dan sudut di B pada kedua bentuk sekaligus. Pilihan transformasinya ada di bawah gambar.',
        langkah: [
          'Bandingkan ketebalan sisi AB pada prapeta dan peta untuk translasi, rotasi, dan kedua pencerminan. Panjangnya sama.',
          'Ganti ke dilatasi 2. Sekarang sisi AB petanya jelas lebih panjang, tetapi busur sudut di B tetap menunjukkan angka yang sama.',
          'Ganti ke cermin sumbu X, lalu baca baris arah putar di tabel angkanya. Baris itu satu-satunya yang berubah.',
          'Terakhir ganti ke dilatasi -2. Bentuknya terjungkir, tetapi baris arah putar TETAP. Inilah baris yang paling sering ditulis salah.',
        ],
      },
      { jenis: 'sesi', judul: 'Kenapa ini berguna, bukan sekadar daftar' },
      {
        jenis: 'poin',
        butir: [
          'Memeriksa jawaban - kalau soal memintamu memutar sebuah segitiga dan jawabanmu punya sisi yang lebih panjang, jawabannya salah tanpa perlu dihitung ulang.',
          'Menebak transformasi dari gambar - kalau ukurannya berubah, pasti ada dilatasi. Kalau arah putarnya berbalik, pasti ada pencerminan pada garis, dan jumlahnya ganjil.',
          'Menghitung luas bayangan - tidak perlu menghitung koordinat semua titiknya. Untuk dilatasi, kalikan saja luas semula dengan k kuadrat.',
        ],
      },
      {
        jenis: 'paragraf',
        teks: 'Catatan jujur: pernyataan luas berubah k kuadrat kali kita terima di sini dari contoh persegi tadi, bukan dari bukti umum. Bukti untuk bangun apa pun memakai determinan matriks, yang cuma kita singgung sekali di Materi 09 dan tidak diujikan di topik ini.',
      },
    ],
    seringKeliru: {
      judul: 'Dilatasi selalu mempertahankan jarak antara dua titik',
      isi: 'Pernyataan ini diambil dari daftar benar-salah di rangkuman Bab 4 buku sumber, dan pernyataan itu SALAH. Yang menggoda: empat transformasi lain memang mempertahankan jarak, jadi kita terbawa menganggap kelimanya sekeluarga. Cara membedakannya: satu contoh sudah cukup meruntuhkannya. Ambil dua titik berjarak 3, lalu dilatasi dengan k = 2. Jaraknya menjadi 6. Jarak yang berubah itulah tanda pengenal dilatasi, dan itu sebabnya ia tidak masuk keluarga yang empat.',
      sumber: 'Buku Siswa Matematika Tingkat Lanjut SMA Kelas XI, Bab 4, bagian Rangkuman',
    },
    intisari: [
      'Empat transformasi menjaga panjang dan sudut. Hanya dilatasi yang mengubah ukuran.',
      'Hanya pencerminan pada garis yang membalik arah putar.',
      'Dilatasi mengubah luas sebanyak k kuadrat kali, bukan k kali.',
      'Dilatasi dengan k negatif tetap tidak membalik arah putar.',
    ],
    widget: 'meja-ukur',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 9,
    slug: 'matriks-secukupnya',
    judul: 'Matriks secukupnya',
    labelPendek: 'Matriks',
    pertanyaan: 'Kelima aturan kita semuanya berbentuk "x baru dari x dan y, y baru dari x dan y". Bisakah keempat angka pengalinya ditulis dalam satu benda saja?',
    penjelasan: [
      {
        jenis: 'poin',
        judul: 'Sebelum mulai, dua keterangan',
        butir: [
          'Materi ini BUKAN bab Matriks. Yang diambil hanya sebanyak yang dibutuhkan empat materi berikutnya: matriks 2x2 dikalikan koordinat, dan perkalian dua matriks. Tidak lebih.',
          'Kalau di sekolahmu Matriks sudah diajarkan, materi ini bisa kamu lewati cepat. Kalau belum, tidak apa-apa: yang dibutuhkan di sini sedikit dan semuanya dibangun dari nol.',
        ],
      },
      {
        jenis: 'paragraf',
        teks: 'Coba tumpuk kelima aturan yang sudah kita punya, dan perhatikan bentuknya, bukan angkanya.',
      },
      {
        jenis: 'contoh',
        judul: 'Empat aturan, satu bentuk yang sama',
        baris: [
          'Cermin sumbu X: x baru = 1 kali x ditambah 0 kali y, dan y baru = 0 kali x ditambah -1 kali y',
          'Cermin y = x: x baru = 0 kali x ditambah 1 kali y, dan y baru = 1 kali x ditambah 0 kali y',
          'Rotasi 90 derajat: x baru = 0 kali x ditambah -1 kali y, dan y baru = 1 kali x ditambah 0 kali y',
          'Dilatasi faktor k: x baru = k kali x ditambah 0 kali y, dan y baru = 0 kali x ditambah k kali y',
        ],
        simpul: 'Yang berbeda hanya empat angka pengalinya. Kalimatnya identik. Kalau begitu, keempat angka itulah yang layak kita catat, dan kalimatnya cukup ditulis sekali.',
      },
      { jenis: 'sesi', judul: 'Empat angka, disusun dua baris dua kolom' },
      {
        jenis: 'paragraf',
        teks: 'Susunan empat angka dalam dua baris dan dua kolom itu disebut matriks 2x2. Mengalikannya dengan koordinat sebuah titik berarti mengerjakan kalimat panjang tadi.',
      },
      {
        jenis: 'sorot',
        teks: 'Matriks baris pertama a b dan baris kedua c d, dikalikan titik (x, y), memberi (ax + by, cx + dy).',
      },
      {
        jenis: 'poin',
        judul: 'Cara mengerjakannya, baris demi baris',
        butir: [
          'Baris pertama matriks bertemu koordinat titiknya, angka demi angka, lalu dijumlahkan. Hasilnya nilai x yang baru.',
          'Baris kedua dikerjakan dengan cara yang sama. Hasilnya nilai y yang baru.',
          'Perhatikan yang bertemu adalah BARIS matriks dengan koordinat titik, bukan kolom.',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Matriks baris pertama 0 dan -1, baris kedua 1 dan 0, dikalikan titik (3, 2)',
        baris: [
          'Baris pertama: 0 dikali 3 ditambah -1 dikali 2, hasilnya -2',
          'Baris kedua: 1 dikali 3 ditambah 0 dikali 2, hasilnya 3',
          'Jadi (3, 2) menjadi (-2, 3)',
          'Bandingkan dengan Materi 06: rotasi 90 derajat memberi (-y, x), dan untuk (3, 2) itu (-2, 3). Sama',
        ],
        simpul: 'Jadi matriks itu bukan hal baru. Ia cuma cara lain menuliskan rotasi 90 derajat yang sudah kita kenal.',
      },
      { jenis: 'sesi', judul: 'Cara membaca matriks yang membuatnya berhenti terasa acak' },
      {
        jenis: 'paragraf',
        teks: 'Sampai di sini matriks masih terasa seperti empat angka yang harus dihafal. Ada satu cara membaca yang mengubahnya jadi sesuatu yang bisa dilihat.',
      },
      {
        jenis: 'paragraf',
        teks: 'Coba kalikan matriks itu dengan titik (1, 0). Baris pertama memberi a, baris kedua memberi c. Jadi (1, 0) mendarat di (a, c), dan itu tepat kolom pertama matriksnya.',
      },
      {
        jenis: 'sorot',
        teks: 'Kolom pertama matriks adalah tempat mendaratnya titik (1, 0). Kolom kedua adalah tempat mendaratnya titik (0, 1).',
      },
      {
        jenis: 'paragraf',
        teks: 'Sekali kamu melihat ini, matriks bisa dibaca dari gambarnya. Lihat ke mana kedua titik itu pergi, tulis keduanya sebagai kolom, dan matriksnya selesai tanpa satu hitungan pun.',
      },
      {
        jenis: 'coba',
        teks: 'Alat interaktifnya punya empat kotak isian a, b, c, dan d. Persegi satuan digambar bersama petanya.',
        langkah: [
          'Ubah angka a saja. Perhatikan panah biru bergerak, sedangkan panah merah diam. Panah biru adalah kolom pertama.',
          'Sekarang ubah b saja. Sekarang panah merah yang bergerak. Kedua angka di kolom yang sama menggerakkan panah yang sama.',
          'Setel matriksnya jadi baris pertama 0 dan 1, baris kedua 1 dan 0. Bandingkan gambarnya dengan Materi 04: itu cermin pada garis y = x.',
          'Terakhir, buat kedua panahnya segaris, misalnya baris pertama 1 dan 2, baris kedua 2 dan 4. Perseginya runtuh jadi ruas, dan luasnya jadi nol.',
        ],
      },
      { jenis: 'sesi', judul: 'Mengalikan dua matriks' },
      {
        jenis: 'paragraf',
        teks: 'Satu hal lagi yang kita butuhkan, dan cuma untuk Materi 12. Dua matriks bisa dikalikan, dan hasilnya matriks lagi.',
      },
      {
        jenis: 'paragraf',
        teks: 'Caranya persis sama dengan tadi, hanya dikerjakan dua kali. Perlakukan tiap KOLOM matriks kanan sebagai sebuah titik, lalu kalikan matriks kiri dengan kolom itu. Hasilnya jadi kolom pada matriks jawabannya.',
      },
      {
        jenis: 'contoh',
        judul: 'Matriks rotasi 90 derajat dikali matriks cermin sumbu X',
        baris: [
          'Yang kiri: baris pertama 0 dan -1, baris kedua 1 dan 0',
          'Yang kanan: baris pertama 1 dan 0, baris kedua 0 dan -1',
          'Kolom pertama kanan adalah (1, 0). Dikalikan yang kiri: (0 dikali 1 ditambah -1 dikali 0, 1 dikali 1 ditambah 0 dikali 0) sama dengan (0, 1)',
          'Kolom kedua kanan adalah (0, -1). Dikalikan yang kiri: (0 dikali 0 ditambah -1 dikali -1, 1 dikali 0 ditambah 0 dikali -1) sama dengan (1, 0)',
          'Susun keduanya sebagai kolom: hasilnya baris pertama 0 dan 1, baris kedua 1 dan 0',
        ],
        simpul: 'Hasilnya matriks cermin pada garis y = x. Kenapa gabungan rotasi dan pencerminan bisa memberi pencerminan, dibahas tuntas di Materi 12.',
      },
      {
        jenis: 'paragraf',
        teks: 'Catatan sekali lewat: angka ad dikurangi bc disebut determinan. Besarnya adalah pengali luas, dan tandanya menyatakan arah putarnya berbalik atau tidak. Kita tidak melatih determinan di topik ini, dan ia tidak akan keluar di soal. Disebut di sini hanya supaya kamu mengenalinya kalau bertemu nanti.',
      },
    ],
    seringKeliru: {
      judul: 'Baris matriks dikalikan dengan baris koordinatnya',
      isi: 'Yang menggoda: koordinat (x, y) dan baris matriks sama-sama deretan dua angka, jadi keduanya terlihat sejenis. Cara membedakannya: hitung sekali dengan matriks yang tidak simetris, misalnya baris pertama 1 dan 2, baris kedua 0 dan 1, pada titik (3, 4). Cara yang benar memberi (1 dikali 3 ditambah 2 dikali 4, 0 dikali 3 ditambah 1 dikali 4), yaitu (11, 4). Lalu periksa di alatnya dengan angka yang sama. Kalau jawabanmu tidak cocok dengan gambarnya, caranya yang perlu diperbaiki, bukan gambarnya.',
    },
    intisari: [
      'Matriks 2x2 adalah empat angka pengali, disusun dua baris dua kolom.',
      'Yang bertemu koordinat titik adalah BARIS matriks, bukan kolomnya.',
      'Kolom pertama adalah peta dari (1, 0), kolom kedua peta dari (0, 1).',
      'Dua matriks dikalikan dengan mengerjakan tiap kolom matriks kanan satu per satu.',
    ],
    widget: 'mesin-matriks',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 10,
    slug: 'matriks-transformasi',
    judul: 'Matriks tiap transformasi',
    labelPendek: 'Matriksnya',
    pertanyaan: 'Kalau setiap transformasi punya matriksnya sendiri, bisakah kita mengenali sebuah transformasi hanya dari empat angkanya?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Sekarang kita panen. Aturan kolom dari Materi 09 membuat daftar berikut bisa kita susun sendiri, tanpa menghafal satu pun barisnya.',
      },
      {
        jenis: 'paragraf',
        teks: 'Resepnya selalu sama: tanyakan ke mana titik (1, 0) pergi, tulis jawabannya sebagai kolom pertama. Lalu tanyakan ke mana (0, 1) pergi, tulis sebagai kolom kedua. Selesai.',
      },
      {
        jenis: 'contoh',
        judul: 'Menyusun matriks cermin sumbu X, langkah demi langkah',
        baris: [
          'Ke mana (1, 0) pergi? Cermin sumbu X membalik tanda y, dan y-nya sudah nol, jadi ia tetap di (1, 0)',
          'Itu kolom pertama: 1 di atas, 0 di bawah',
          'Ke mana (0, 1) pergi? Nilai y-nya berbalik tanda, jadi ke (0, -1)',
          'Itu kolom kedua: 0 di atas, -1 di bawah',
          'Jadi matriksnya baris pertama 1 dan 0, baris kedua 0 dan -1',
        ],
        simpul: 'Tidak ada yang dihafal di sini. Yang dipakai cuma aturan cermin sumbu X yang sudah kamu tahu sejak Materi 03.',
      },
      { jenis: 'sesi', judul: 'Daftar lengkapnya' },
      {
        jenis: 'contoh',
        judul: 'Matriks tujuh transformasi, semua berpusat di titik asal',
        baris: [
          'Cermin sumbu X: baris pertama 1 dan 0, baris kedua 0 dan -1',
          'Cermin sumbu Y: baris pertama -1 dan 0, baris kedua 0 dan 1',
          'Cermin garis y = x: baris pertama 0 dan 1, baris kedua 1 dan 0',
          'Cermin garis y = -x: baris pertama 0 dan -1, baris kedua -1 dan 0',
          'Cermin titik asal, sama dengan rotasi 180: baris pertama -1 dan 0, baris kedua 0 dan -1',
          'Rotasi sudut a: baris pertama cos a dan -sin a, baris kedua sin a dan cos a',
          'Dilatasi faktor k: baris pertama k dan 0, baris kedua 0 dan k',
        ],
        simpul: 'Periksa baris keenam pada a = 90 derajat: cos 90 bernilai 0 dan sin 90 bernilai 1, jadi matriksnya baris pertama 0 dan -1, baris kedua 1 dan 0. Itu yang kita pakai di Materi 09.',
      },
      { jenis: 'sesi', judul: 'Satu yang tidak ada di daftar itu, dan kenapa' },
      {
        jenis: 'paragraf',
        teks: 'Kamu mungkin sudah menyadarinya: translasi tidak ada. Itu bukan kelupaan.',
      },
      {
        jenis: 'sorot',
        teks: 'Translasi TIDAK punya matriks 2x2 pengali. Ia ditulis sebagai PENJUMLAHAN matriks kolom.',
      },
      {
        jenis: 'paragraf',
        teks: 'Alasannya bisa kamu buktikan sendiri dalam satu baris. Kalikan matriks apa pun dengan titik (0, 0). Baris pertama memberi a dikali 0 ditambah b dikali 0, yaitu nol. Baris kedua juga nol.',
      },
      {
        jenis: 'paragraf',
        teks: 'Jadi perkalian matriks apa pun selalu memetakan titik asal ke titik asal. Padahal translasi justru memindahkannya. Karena itu translasi mustahil ditulis sebagai perkalian, seberapa pun kita mencari matriksnya.',
      },
      {
        jenis: 'poin',
        judul: 'Jadi bentuk tulisannya',
        butir: [
          'Empat transformasi lain: koordinat titiknya DIKALIKAN sebuah matriks 2x2.',
          'Translasi: koordinat titiknya DITAMBAH sebuah matriks kolom yang berisi a dan b.',
        ],
      },
      { jenis: 'sesi', judul: 'Batas yang jujur' },
      {
        jenis: 'paragraf',
        teks: 'Ketujuh matriks di atas hanya berlaku kalau pusat atau garis cerminnya melewati titik asal. Alasannya sama persis dengan yang barusan: perkalian matriks tidak pernah memindahkan titik asal.',
      },
      {
        jenis: 'paragraf',
        teks: 'Untuk pusat lain, tidak ada matriks 2x2 yang bisa dipakai. Yang dipakai tetap resep tiga langkah dari Materi 06 dan 07: geser ke titik asal, kerjakan, geser kembali.',
      },
      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menggambar kedua panah kolom bersama bentuknya. Pilihan transformasinya ada di bawah gambar.',
        langkah: [
          'Pilih cermin sumbu Y. Baca ujung panah birunya, lalu ujung panah merahnya. Kedua angka itu adalah kedua kolom matriksnya, dan bisa kamu baca sebelum melihat tabel angkanya.',
          'Pilih rotasi 53 derajat. Kedua panahnya tidak lagi menunjuk ke arah yang bulat, dan matriksnya berisi cos dan sin.',
          'Pilih translasi. Layar berkata terus terang bahwa transformasi itu tidak punya matriks 2x2, dan kedua panahnya pun tidak lagi berpangkal di titik asal.',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Translasi juga punya matriks 2x2, jadi tinggal dikalikan',
      isi: 'Yang menggoda: empat transformasi lain memang begitu, dan buku pun menaruh translasi di bawah judul yang sama, yaitu "matriks yang berkaitan dengan translasi". Kata "berkaitan" itu benar, tetapi kaitannya lewat penjumlahan, bukan perkalian. Cara membedakannya: coba cari matriks yang memindahkan titik asal ke tempat lain. Kalikan matriks mana pun dengan (0, 0), hasilnya selalu (0, 0). Jadi tidak ada matriks 2x2 yang bisa menggeser bidang, dan pencarian itu memang tidak akan pernah berhasil.',
      sumber: 'Buku Siswa Matematika Tingkat Lanjut SMA Kelas XI, Bab 4 bagian B nomor 3',
    },
    intisari: [
      'Matriks sebuah transformasi disusun dari peta titik (1, 0) dan (0, 1), bukan dihafal.',
      'Translasi tidak punya matriks 2x2 pengali, sebab perkalian matriks selalu menahan titik asal.',
      'Ketujuh matriks itu hanya berlaku untuk pusat di titik asal.',
      'Untuk pusat lain, resep tiga langkah tetap dipakai.',
    ],
    widget: 'cocokkan-matriks',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 11,
    slug: 'komposisi',
    judul: 'Dua transformasi berurutan',
    labelPendek: 'Komposisi',
    pertanyaan: 'Sebuah bentuk dicerminkan pada sumbu X, lalu diputar 90 derajat. Kalau urutannya dibalik, apakah hasilnya sama?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Dari Materi 02 sampai Materi 07 kita mengumpulkan lima aturan, dan tiap kali hanya satu yang dipakai pada satu bentuk. Di dunia nyata jarang begitu. Sebuah benda di layar permainan digeser, diputar, lalu diperbesar, semuanya dalam satu kedipan mata.',
      },
      {
        jenis: 'paragraf',
        teks: 'Mengerjakan dua transformasi berurutan disebut komposisi. Aturannya sederhana: kerjakan yang pertama, lalu kerjakan yang kedua PADA HASILNYA.',
      },
      { jenis: 'sesi', judul: 'Kerjakan satu langkah pada satu waktu' },
      {
        jenis: 'contoh',
        judul: 'Titik P(3, 1) dicerminkan pada sumbu X, lalu diputar 90 derajat',
        baris: [
          'Langkah pertama, cermin sumbu X membalik tanda y: (3, 1) menjadi (3, -1)',
          'Langkah kedua dikerjakan PADA (3, -1), bukan pada (3, 1)',
          'Rotasi 90 derajat memakai aturan (x, y) menjadi (-y, x): (3, -1) menjadi (1, 3)',
          'Jadi hasil akhirnya (1, 3)',
        ],
        simpul: 'Tulis hasil antaranya. Menggabungkan dua aturan di kepala adalah tempat kekeliruan paling sering lahir, dan satu baris tambahan mencegahnya.',
      },
      { jenis: 'sesi', judul: 'Sekarang balik urutannya' },
      {
        jenis: 'contoh',
        judul: 'Titik P(3, 1) diputar 90 derajat dulu, baru dicerminkan pada sumbu X',
        baris: [
          'Langkah pertama, rotasi 90 derajat: (3, 1) menjadi (-1, 3)',
          'Langkah kedua, cermin sumbu X: (-1, 3) menjadi (-1, -3)',
          'Jadi hasil akhirnya (-1, -3)',
        ],
        simpul: 'Bandingkan dengan (1, 3) tadi. Bukan cuma berbeda, tetapi berada di kuadran yang berlawanan. Urutan bukan hal kecil di sini.',
      },
      {
        jenis: 'sorot',
        teks: 'Urutan menentukan hasil. Itu keadaan yang biasa, bukan kekecualian yang jarang.',
      },
      { jenis: 'sesi', judul: 'Cara menuliskannya, dan satu jebakan di dalamnya' },
      {
        jenis: 'paragraf',
        teks: 'Komposisi ditulis dengan lambang lingkaran kecil. Tulisan T2 lingkaran T1 dibaca "T2 komposisi T1", dan artinya T1 dikerjakan LEBIH DAHULU.',
      },
      {
        jenis: 'paragraf',
        teks: 'Ini terasa terbalik dari cara kita membaca kalimat. Sebabnya bukan kesengajaan yang menyulitkan: lambang itu diwarisi dari komposisi fungsi, tempat yang di kanan memang dikerjakan lebih dulu karena ia yang paling dekat dengan bilangannya.',
      },
      {
        jenis: 'poin',
        judul: 'Cara mengingatnya tanpa menghafal',
        butir: [
          'Tulis titiknya di paling kanan, misalnya T2 lingkaran T1 lalu (x, y).',
          'Yang paling dekat dengan titiknya, itu yang menyentuhnya lebih dulu. Di sini T1.',
          'Kerjakan dari kanan ke kiri, seperti membuka bungkus berlapis dari yang terluar.',
        ],
      },
      { jenis: 'sesi', judul: 'Kapan urutan boleh dibalik' },
      {
        jenis: 'paragraf',
        teks: 'Ada beberapa pasangan yang hasilnya sama walau urutannya dibalik. Jumlahnya sedikit, dan mengetahuinya membantu memeriksa jawaban.',
      },
      {
        jenis: 'poin',
        butir: [
          'Dua translasi - selalu boleh dibalik. Hasilnya sama dengan menjumlahkan kedua vektornya, dan penjumlahan tidak peduli urutan.',
          'Dua rotasi dengan PUSAT YANG SAMA - boleh dibalik. Hasilnya rotasi sejauh jumlah kedua sudutnya.',
          'Dua dilatasi dengan pusat yang sama - boleh dibalik. Faktornya dikalikan.',
          'Campuran jenis yang berbeda, atau pusat yang berbeda - hampir selalu TIDAK boleh dibalik.',
        ],
      },
      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menggambar tiga bentuk: prapeta, hasil langkah pertama yang paling samar, dan hasil akhir.',
        langkah: [
          'Perhatikan bentuk yang paling samar. Itu persinggahan, bukan jawaban. Soal yang menanyakan hasil akhir tidak berhenti di situ.',
          'Tekan tombol tukar urutan. Bentuk hasil akhirnya berpindah tempat, padahal kedua transformasinya sama persis.',
          'Sekarang pilih dua translasi, lalu tukar urutannya. Kali ini hasilnya tidak berpindah sama sekali.',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Sudah dicerminkan, jadi tinggal dijawab hasil pencerminannya',
      isi: 'Yang menggoda: langkah pertama sudah memberi jawaban yang terlihat lengkap, berupa sebuah titik yang rapi. Otak kita cenderung berhenti begitu ada jawaban di tangan. Cara membedakannya: baca ulang soalnya dan hitung berapa kali kata "lalu" atau "dilanjutkan" muncul. Setiap satu kata itu berarti satu langkah lagi. Kalau kamu berhenti setelah satu langkah pada soal dua langkah, jawabanmu adalah hasil antaranya, dan itu biasanya sudah disediakan sebagai pengecoh.',
    },
    intisari: [
      'Komposisi berarti mengerjakan transformasi kedua pada HASIL yang pertama.',
      'Urutan menentukan hasil, dan itu keadaan yang biasa.',
      'Pada tulisan T2 lingkaran T1, yang dikerjakan lebih dahulu adalah T1, yang di kanan.',
      'Dua translasi, atau dua rotasi sepusat, boleh dibalik urutannya.',
    ],
    widget: 'dua-langkah',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 12,
    slug: 'komposisi-matriks',
    judul: 'Komposisi lewat perkalian matriks',
    labelPendek: 'Urutan',
    pertanyaan: 'Dua transformasi punya dua matriks. Kalau keduanya dikalikan, matriks mana yang ditulis di depan?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Di Materi 11 kita mengerjakan komposisi satu langkah pada satu waktu. Cara itu selalu benar, tetapi melelahkan kalau langkahnya tiga atau empat.',
      },
      {
        jenis: 'paragraf',
        teks: 'Ada jalan yang lebih pendek. Kalikan dulu kedua matriksnya, lalu kenakan hasilnya sekali saja pada titiknya.',
      },
      { jenis: 'sesi', judul: 'Yang dikerjakan pertama ditulis paling kanan' },
      {
        jenis: 'sorot',
        teks: 'Kalau T1 dikerjakan lebih dahulu lalu T2, matriks gabungannya adalah M2 dikali M1.',
      },
      {
        jenis: 'paragraf',
        teks: 'Kenapa terbalik? Karena koordinat titiknya berada di ujung kanan tulisan, dan matriks yang paling dekat dengannyalah yang menyentuhnya lebih dulu.',
      },
      {
        jenis: 'paragraf',
        teks: 'Tulis begini: M2 lalu M1 lalu (x, y). Baca dari kanan. Titiknya bertemu M1 lebih dulu, baru hasilnya bertemu M2. Itu tepat urutan yang kita mau.',
      },
      {
        jenis: 'contoh',
        judul: 'Cermin sumbu X lalu rotasi 90 derajat, pada titik (3, 1)',
        baris: [
          'M1 adalah cermin sumbu X: baris pertama 1 dan 0, baris kedua 0 dan -1',
          'M2 adalah rotasi 90 derajat: baris pertama 0 dan -1, baris kedua 1 dan 0',
          'Kalikan M2 dengan M1, hasilnya baris pertama 0 dan 1, baris kedua 1 dan 0',
          'Kenakan pada (3, 1): baris pertama memberi 0 dikali 3 ditambah 1 dikali 1, yaitu 1',
          'Baris kedua memberi 1 dikali 3 ditambah 0 dikali 1, yaitu 3',
          'Jadi hasilnya (1, 3), sama persis dengan hitungan langkah demi langkah di Materi 11',
        ],
        simpul: 'Dan ada bonusnya: matriks gabungannya ternyata matriks cermin pada garis y = x. Jadi kedua langkah itu, digabung, sama dengan SATU pencerminan.',
      },
      { jenis: 'sesi', judul: 'Sekarang lihat apa yang terjadi kalau urutannya salah' },
      {
        jenis: 'contoh',
        judul: 'Kalau M1 yang ditulis di depan',
        baris: [
          'Kalikan M1 dengan M2, hasilnya baris pertama 0 dan -1, baris kedua -1 dan 0',
          'Kenakan pada (3, 1): hasilnya (-1, -3)',
          'Itu bukan jawaban yang salah begitu saja. Itu jawaban untuk urutan yang SEBALIKNYA, yaitu diputar dulu baru dicerminkan',
        ],
        simpul: 'Inilah yang membuat jebakan ini berbahaya: hasilnya terlihat masuk akal, dan biasanya tersedia sebagai pilihan di soal.',
      },
      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menggambar KEDUA urutan sekaligus, dengan warna berbeda.',
        langkah: [
          'Perhatikan bentuk biru dan bentuk merah. Keduanya dari dua transformasi yang sama persis, hanya berbeda urutan.',
          'Baca kedua matriks gabungannya di tabel angkanya. Keempat angkanya bertukar tempat dan berganti tanda.',
          'Ganti pilihannya ke dua translasi. Sekarang bentuk biru dan merahnya menempel jadi satu, sebab dua translasi memang boleh dibalik urutannya.',
        ],
      },
      { jenis: 'sesi', judul: 'Kalau langkahnya lebih dari dua' },
      {
        jenis: 'paragraf',
        teks: 'Aturannya tidak berubah, cuma memanjang. Untuk T1 lalu T2 lalu T3, matriks gabungannya M3 dikali M2 dikali M1. Yang pertama dikerjakan tetap paling kanan.',
      },
      {
        jenis: 'paragraf',
        teks: 'Catatan penting: kalau salah satu langkahnya translasi, cara ini tidak bisa dipakai untuk langkah itu, sebab translasi bukan perkalian. Kerjakan translasinya terpisah, pada urutan yang tepat.',
      },
    ],
    seringKeliru: {
      judul: 'Dikerjakan T1 dulu, jadi M1 ditulis dulu',
      isi: 'Yang menggoda: begitulah cara kita membaca kalimat, dari kiri ke kanan, dan urutan itu terasa alami. Cara membedakannya: jangan mengingat aturannya, tulis titiknya. Letakkan koordinat titiknya di ujung kanan, lalu tanyakan matriks mana yang menyentuhnya lebih dulu. Yang menyentuh lebih dulu adalah yang paling dekat, dan itu yang dikerjakan lebih dulu. Kalau masih ragu, kerjakan satu langkah pada satu waktu seperti Materi 11: caranya lebih panjang, tetapi tidak punya jebakan ini sama sekali.',
    },
    intisari: [
      'Matriks gabungan dua langkah adalah M2 dikali M1, dengan M1 yang dikerjakan lebih dahulu.',
      'Yang dikerjakan pertama ditulis paling kanan, sebab ia yang paling dekat dengan titiknya.',
      'Urutan yang tertukar memberi jawaban untuk urutan sebaliknya, bukan jawaban yang kacau.',
      'Translasi tidak bisa digabungkan lewat perkalian, sebab ia penjumlahan.',
    ],
    widget: 'urutan-matriks',
    video: { berkas: 'transformasi6-urutan.mp4', poster: 'transformasi6-urutan.jpg' },
    siap: true,
  },

  /* ================================================================= */
  {
    no: 13,
    slug: 'dunia-nyata',
    judul: 'Dipakai di dunia nyata',
    labelPendek: 'Nyata',
    pertanyaan: 'Di luar buku soal, siapa yang benar-benar memakai transformasi geometri setiap hari?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Ketiga gambar di panel Alat bukan foto, dan bukan pula ilustrasi yang digambar tangan. Ketiganya dihitung oleh rumus yang baru saja kamu pelajari, memakai fungsi yang sama persis dengan yang dipakai kedua belas alat di materi sebelumnya.',
      },
      {
        jenis: 'paragraf',
        teks: 'Kalau rumus di halaman ini salah, ketiga gambar itu ikut salah. Jadi gambarnya bukan sekadar menemani materinya, melainkan membuktikannya.',
      },
      { jenis: 'sesi', judul: 'Tiga tempat yang paling sering' },
      {
        jenis: 'poin',
        butir: [
          'Motif berulang - satu motif digambar sekali, lalu ditranslasikan dan dicerminkan. Batik parang memakai translasi miring, kawung memakai pencerminan pada dua garis.',
          'Animasi dan permainan - bentuk aslinya disimpan sekali, dan yang dihitung ulang enam puluh kali per detik hanya transformasinya. Menyimpan tiap posisi sebagai gambar terpisah jauh lebih boros.',
          'Lengan robot dan mesin bersendi - tiap sendi adalah rotasi terhadap pusat yang berbeda, dan pusat sendi kedua ikut berpindah saat sendi pertama bergerak. Itu komposisi dari Materi 11, dipakai di pabrik.',
        ],
      },
      { jenis: 'sesi', judul: 'Kenapa matriksnya benar-benar dipakai, bukan cuma rumus di sekolah' },
      {
        jenis: 'paragraf',
        teks: 'Sebuah benda di layar permainan bisa punya ribuan titik. Menggesernya, memutarnya, lalu memperbesarnya berarti tiga hitungan untuk setiap titik, dan itu ribuan kali tiga.',
      },
      {
        jenis: 'paragraf',
        teks: 'Dengan matriks, ketiga transformasi itu dikalikan lebih dulu menjadi SATU matriks. Setelah itu tiap titik cukup dikenai satu hitungan saja. Itulah alasan Materi 12 ada, dan alasannya bukan kerapian, melainkan kecepatan.',
      },
      { jenis: 'sesi', judul: 'Bedanya dengan tahap Transformasi di topik Grafik Fungsi' },
      {
        jenis: 'paragraf',
        teks: 'Kalau kamu sudah membaca topik Grafik Fungsi, kamu bertemu tahap bernama Transformasi di sana: geser, cermin, dan regang pada sebuah grafik. Keduanya terdengar sama, dan sering membuat siswa mengira salah satunya keliru.',
      },
      {
        jenis: 'poin',
        judul: 'Keduanya berbeda, dan keduanya benar',
        butir: [
          'Di Grafik Fungsi - yang dipindahkan sebuah KURVA, dan cara memindahkannya dengan mengubah rumusnya. Menulis f(x - 3) menggeser grafiknya ke kanan.',
          'Di sini - yang dipindahkan TITIK, satu per satu, lewat pemetaan. Kurvanya ikut pindah karena semua titiknya pindah, persis gagasan Materi 01.',
          'Hubungannya - keduanya menghasilkan gambar yang sama. Yang berbeda cuma dari sisi mana kita memandangnya, dan sisi mana yang lebih pendek jalannya bergantung pada soalnya.',
        ],
      },
      { jenis: 'sesi', judul: 'Ke mana materi ini bermuara' },
      {
        jenis: 'paragraf',
        teks: 'Matriks yang kita pakai di sini yang paling sederhana, ukuran dua kali dua, dan hanya untuk bidang datar. Di kuliah, matriks yang sama dipakai untuk ruang tiga dimensi, dan itulah dasar semua tampilan tiga dimensi di komputer.',
      },
      {
        jenis: 'paragraf',
        teks: 'Bidang ilmunya bernama aljabar linear. Kalau kamu tertarik pada animasi, permainan, robotika, atau pengolahan gambar, materi inilah pintu masuknya.',
      },
    ],
    intisari: [
      'Motif berulang, animasi, dan lengan robot semuanya transformasi geometri.',
      'Matriks dipakai karena cepat: banyak transformasi digabung dulu jadi satu.',
      'Transformasi grafik di topik Grafik Fungsi memandang hal yang sama dari sisi rumusnya.',
      'Lanjutannya di kuliah bernama aljabar linear.',
    ],
    widget: 'dunia-nyata-transformasi',
    siap: true,
  },
]
