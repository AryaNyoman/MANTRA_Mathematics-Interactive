/**
 * Vektor, 12 materi belajar. Topik ketiga MATRA.
 *
 * Rancangannya: docs/superpowers/specs/2026-09-01-vektor-alur-belajar.md
 * Rencana kerjanya: docs/superpowers/plans/2026-09-01-topik-vektor.md
 *
 * SUMBER MATERI
 * Buku Panduan Guru Matematika untuk SMA/SMK Kelas X, Kemendikbudristek 2021,
 * penulis Dicky Susanto dkk, ISBN 978-602-244-537-1. Bab 3 "Vektor dan
 * Operasinya", halaman buku 92 sampai 126. Urutan konsep, kosakata, dan
 * kekeliruan yang disorot mengikuti buku itu. Contoh, angka, dan kalimatnya
 * ditulis sendiri.
 *
 * PENEMPATAN KELAS SUDAH DIPERIKSA, BUKAN DIINGAT
 * Vektor ada di Kelas 10 (Fase E) saja. Buku Guru Kelas 11 menyebut kata
 * "vektor" hanya di daftar Capaian Pembelajaran, dan Buku Siswa Kelas XII tidak
 * menyebutnya sama sekali.
 *
 * KENAPA TRIGONOMETRI TIDAK DIPAKAI SEBAGAI DASAR
 * Di buku, Vektor adalah Bab 3 dan Trigonometri Bab 4. Siswa yang membaca
 * berurutan BELUM tahu sin dan cos di sini. Karena itu panjang vektor
 * diturunkan dari Pythagoras, dan arah dinyatakan dalam derajat yang diukur
 * busur, bukan lewat rumus tangen. Kaitan ke trigonometri ditulis sebagai
 * selipan opsional, bukan prasyarat.
 *
 * MATERI 11 DAN 12 DI LUAR KURIKULUM MERDEKA. Perkalian titik dan proyeksi
 * tidak ada di Bab 3, tetapi masih keluar di UTBK. Keputusan ARYA 1 September
 * 2026: keduanya dimasukkan DAN ditandai terus terang di dalam materinya.
 */

import type { Tahap } from '@/content/tipe'

export type WidgetVektor =
  | 'perahu-sungai'
  | 'panah-berpindah'
  | 'pecah-komponen'
  | 'panjang-dan-arah'
  | 'vektor-satuan'
  | 'sambung-panah'
  | 'jajar-genjang'
  | 'selisih-panah'
  | 'kali-skalar'
  | 'dunia-nyata-vektor'
  | 'perkalian-titik'
  | 'proyeksi'

/**
 * Bentuk Tahap dengan nama widget yang DIKETATKAN ke senarai di atas.
 * Tanpa ini, salah ketik nama widget baru ketahuan saat halamannya dibuka dan
 * panggungnya diam saja. Dengan ini, TypeScript menolaknya sebelum dijalankan.
 */
type TahapVektor = Omit<Tahap, 'widget'> & { widget?: WidgetVektor }

/** Penanda sementara untuk materi yang naskahnya belum ditulis. */
const BELUM = [
  { jenis: 'paragraf' as const, teks: 'Naskah materi ini sedang ditulis.' },
]

export const TAHAP: TahapVektor[] = [
  /* ================================================================= */
  {
    no: 1,
    slug: 'angka-saja-tidak-cukup',
    judul: 'Angka saja tidak cukup',
    labelPendek: 'Kenapa',
    pertanyaan: 'Kenapa 3 tambah 4 tidak selalu 7?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Sebuah perahu menyeberangi sungai. Pendayungnya menghadap lurus ke tepi seberang dan mendayung sekuat tenaga, tidak sekali pun membelokkan haluan. Namun begitu mendarat, ia tidak berada di seberang tempat ia berangkat. Ia berada jauh di hilir.',
      },
      {
        jenis: 'paragraf',
        teks: 'Tidak ada yang salah dengan dayungannya. Yang terjadi adalah sungainya ikut bergerak, dan gerak itu punya arah sendiri yang tidak sama dengan arah dayung.',
      },
      { jenis: 'sesi', judul: 'Ada besaran yang tidak selesai dijelaskan satu angka' },
      {
        jenis: 'paragraf',
        teks: 'Sebagian besaran cukup dinyatakan dengan satu angka dan satuannya. Sebagian lagi tidak, dan justru menyesatkan kalau dipaksa begitu.',
      },
      {
        jenis: 'poin',
        judul: 'Bandingkan keduanya',
        butir: [
          'Cukup satu angka - massa 60 kg, suhu 27 derajat, waktu 2 jam. Menyebut arahnya tidak ada gunanya. Massa 60 kg ke utara adalah kalimat yang tidak berarti apa-apa.',
          'Wajib disertai arah - perpindahan 5 km, kecepatan 60 km per jam, gaya 10 newton. Tanpa arah, ketiganya belum selesai diceritakan.',
        ],
      },
      {
        jenis: 'sorot',
        teks: 'Besaran yang butuh arah itulah yang disebut VEKTOR. Yang cukup satu angka disebut skalar.',
      },
      {
        jenis: 'coba',
        teks: 'Alat di sebelah kiri adalah perahu tadi. Kedua panahnya bisa kamu tarik.',
        langkah: [
          'Perbesar panah merah (arus). Titik mendaratnya bergeser makin jauh ke hilir, padahal dayungnya tidak diubah sama sekali.',
          'Miringkan panah biru (dayung) melawan arus. Perahunya bisa mendarat tepat di seberang, tetapi menyeberangnya jadi lebih lama.',
          'Arahkan dayung sampai gerak tegaknya habis. Perahu berhenti menyeberang dan hanya terbawa arus.',
        ],
      },
      { jenis: 'sesi', judul: 'Karena itu cara menjumlahkannya ikut berubah' },
      {
        jenis: 'paragraf',
        teks: 'Kalau arah ikut dicatat, penjumlahan tidak bisa lagi dikerjakan dengan menumpuk angkanya. Ambil dua perpindahan, yang satu 3 km dan yang lain 4 km. Hasilnya bergantung pada arah keduanya.',
      },
      {
        jenis: 'contoh',
        judul: 'Tiga km dan empat km, tiga kemungkinan',
        baris: [
          'Searah: 3 tambah 4 memberi 7 km',
          'Berlawanan arah: sisanya tinggal 1 km',
          'Saling tegak lurus: hasilnya 5 km, dari akar 3 kuadrat ditambah 4 kuadrat',
        ],
        simpul: 'Angkanya sama persis, jawabannya tiga-tiganya berbeda. Yang membedakan hanya arah.',
      },
      {
        jenis: 'paragraf',
        teks: 'Perahu tadi persis kasus ketiga. Dayung 3 km ke seberang dan arus 2 km ke hilir dalam satu jam menghasilkan gerak sebenarnya sepanjang akar dari 3 kuadrat ditambah 2 kuadrat, yaitu sekitar 3,61 km, bukan 5 km.',
      },
    ],
    seringKeliru: {
      judul: 'Menjumlahkan angkanya saja',
      isi: 'Melihat dayung 3 dan arus 2, banyak yang langsung menulis 5. Itu benar HANYA kalau keduanya searah. Pada perahu tadi keduanya saling tegak lurus, sehingga jawabannya sekitar 3,61. Aturannya sederhana: begitu arah ikut dihitung, angka tidak boleh lagi ditumpuk begitu saja.',
    },
    intisari: [
      'Besaran yang butuh arah disebut vektor. Yang cukup satu angka disebut skalar.',
      'Perpindahan, kecepatan, dan gaya adalah vektor. Massa, suhu, dan waktu bukan.',
      'Menjumlahkan vektor bergantung pada arah, jadi 3 tambah 4 bisa menjadi 7, bisa 1, bisa 5.',
    ],
    widget: 'perahu-sungai',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 2,
    slug: 'panah-yang-boleh-dipindah',
    judul: 'Panah yang boleh dipindah',
    labelPendek: 'Notasi',
    pertanyaan: 'Dua panah di tempat berbeda, apakah vektor yang sama?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Vektor digambar sebagai ruas garis berarah: sepotong garis lurus yang salah satu ujungnya diberi mata panah. Pangkalnya tempat berangkat, ujungnya tempat tiba.',
      },
      {
        jenis: 'poin',
        judul: 'Yang BUKAN vektor, dan alasannya',
        butir: [
          'Garis melengkung - vektor harus lurus, sebab satu vektor menyatakan satu arah saja.',
          'Garis berkepala panah di kedua ujungnya - arahnya jadi dua, dan itu sama saja dengan tidak menyebut arah.',
          'Garis patah yang berbelok - itu dua vektor yang disambung, bukan satu.',
        ],
      },
      { jenis: 'sesi', judul: 'Tiga cara menuliskannya' },
      {
        jenis: 'poin',
        butir: [
          'Dua huruf berpanah - AB dengan panah kecil di atasnya, dari titik A ke titik B. Urutannya penting: AB dan BA berlawanan arah.',
          'Satu huruf tebal - a, b, u, v. Dipakai kalau titik pangkalnya tidak perlu disebut.',
          'Satu huruf bergaris bawah - dipakai saat menulis tangan, karena huruf tebal sulit dibedakan di buku tulis.',
        ],
      },
      { jenis: 'sesi', judul: 'Yang menentukan hanya panjang dan arah' },
      {
        jenis: 'paragraf',
        teks: 'Inilah sifat vektor yang paling sering mengejutkan: letaknya tidak ikut menentukan. Dua panah yang panjangnya sama dan arahnya sama adalah vektor yang sama, walaupun digambar berjauhan di kertas. Vektor semacam itu disebut EKUIVALEN.',
      },
      {
        jenis: 'paragraf',
        teks: 'Masuk akal kalau dipikir dari maknanya. Hujan yang jatuh di halaman depan dan di halaman belakang punya kecepatan jatuh yang sama, walaupun tempatnya berbeda. Yang dicatat vektor adalah seberapa dan ke mana, bukan di mana.',
      },
      {
        jenis: 'coba',
        teks: 'Alat di sebelah kiri punya panah acuan yang diam dan satu panah yang bisa kamu pindahkan.',
        langkah: [
          'Tarik pangkal dan ujungnya bergantian sampai bentuknya sama dengan acuan. Penilaiannya berubah menjadi vektor yang SAMA.',
          'Sekarang geser keduanya bersama-sama ke pojok lain, jaga bentuknya. Penilaiannya tetap SAMA, walaupun letaknya sudah jauh.',
          'Balikkan arahnya, jaga panjangnya. Sekarang ia menjadi vektor LAWAN.',
        ],
      },
      { jenis: 'sesi', judul: 'Beberapa jenis yang perlu dikenali' },
      {
        jenis: 'poin',
        butir: [
          'Vektor ekuivalen - panjang sama, arah sama. Dianggap vektor yang sama.',
          'Vektor lawan - panjang sama, arah berkebalikan. Lawan dari AB adalah BA, ditulis juga negatif AB.',
          'Vektor berkebalikan - arahnya sama tetapi panjangnya kebalikannya. Berguna nanti saat membicarakan vektor satuan.',
          'Vektor nol - pangkal dan ujungnya berimpit. Panjangnya nol, dan ia satu-satunya vektor yang tidak punya arah.',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Dua hal yang sering tertukar di sini',
      isi: 'Pertama, mengira dua panah berbeda hanya karena letaknya berbeda. Yang menentukan cuma panjang dan arah, jadi panah yang digeser ke mana pun tetap vektor yang sama. Kedua, mengira semua panah yang berlawanan arah adalah vektor lawan. Berlawanan arah saja belum cukup, panjangnya harus sama persis juga. Panah sepanjang 2 ke kiri bukan lawan dari panah sepanjang 5 ke kanan.',
      sumber: 'Buku Panduan Guru Matematika SMA/SMK Kelas X, Kemendikbudristek 2021, Bab 3 bagian A, halaman 96 sampai 98.',
    },
    intisari: [
      'Vektor adalah ruas garis berarah: lurus, dan berkepala panah di satu ujung saja.',
      'Ditulis sebagai dua huruf berpanah, satu huruf tebal, atau satu huruf bergaris bawah.',
      'Yang menentukan hanya panjang dan arah. Letaknya tidak ikut menentukan.',
      'Vektor lawan wajib sama panjang sekaligus berlawanan arah.',
    ],
    widget: 'panah-berpindah',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 3,
    slug: 'memecah-panah',
    judul: 'Memecah panah jadi dua langkah',
    labelPendek: 'Komponen',
    pertanyaan: 'Bagaimana caranya panah bisa dihitung, bukan cuma digambar?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Menggambar panah di kertas berpetak memang jelas. Tetapi begitu panahnya ada sepuluh, menggambar satu per satu jadi melelahkan dan gampang meleset satu dua kotak. Ada cara yang jauh lebih ringkas: catat saja perjalanannya sebagai dua langkah.',
      },
      { jenis: 'sesi', judul: 'Satu panah, dua langkah' },
      {
        jenis: 'paragraf',
        teks: 'Ambil satu panah dari titik asal O ke sebuah titik. Semiring apa pun panah itu, perjalanannya selalu bisa diganti dua langkah yang lebih mudah dibaca: berjalan mendatar dulu, lalu tegak. Titik yang dituju tetap sama persis.',
      },
      {
        jenis: 'poin',
        judul: 'Dua angka itu namanya komponen',
        butir: [
          'Komponen mendatar - berapa jauh bergeser ke kanan. Bertanda negatif berarti bergeser ke kiri.',
          'Komponen tegak - berapa jauh bergeser ke atas. Bertanda negatif berarti bergeser ke bawah.',
          'Urutannya tidak boleh ditukar. (3 4) dan (4 3) menunjuk ke arah yang berbeda.',
        ],
      },
      {
        jenis: 'sorot',
        teks: 'Dua angka sudah cukup mewakili satu panah. Itulah sebabnya vektor bisa dihitung, bukan cuma digambar.',
      },
      {
        jenis: 'coba',
        teks: 'Tarik ujung panah di sebelah kiri, lalu perhatikan kedua angkanya.',
        langkah: [
          'Tarik ujungnya ke kanan atas. Kedua komponen bertanda positif.',
          'Bawa ke kiri atas. Komponen mendatarnya berubah tanda, komponen tegaknya tidak.',
          'Turunkan sampai tepat di sumbu mendatar. Komponen tegaknya jadi nol, dan panahnya berbaring rata.',
        ],
      },
      { jenis: 'sesi', judul: 'Menuliskannya: baris atau kolom' },
      {
        jenis: 'paragraf',
        teks: 'Ada dua cara menulis yang artinya sama persis. Vektor baris ditulis mendatar, misalnya (3 4). Vektor kolom ditulis bertumpuk, angka mendatar di atas dan angka tegak di bawah. Keduanya dipakai di sekolah, jadi keduanya perlu dikenali.',
      },
      {
        jenis: 'poin',
        judul: 'Kenapa vektor baris ditulis tanpa koma',
        butir: [
          'Titik koordinat memakai koma, misalnya A(3, 4).',
          'Vektor baris tidak memakai koma, ditulis (3 4).',
          'Bedanya sengaja, supaya pembaca langsung tahu yang satu menyatakan letak dan yang lain menyatakan perpindahan.',
        ],
      },
      { jenis: 'sesi', judul: 'Vektor yang tidak berangkat dari titik asal' },
      {
        jenis: 'paragraf',
        teks: 'Tidak semua panah berangkat dari O. Panah dari titik A ke titik B pun punya komponen, dan cara mencarinya sama saja: hitung berapa jauh berpindahnya ke kanan, lalu berapa jauh naiknya.',
      },
      {
        jenis: 'contoh',
        judul: 'Dari A(1, 2) ke B(5, 5)',
        baris: [
          'Komponen mendatar: 5 dikurangi 1, hasilnya 4',
          'Komponen tegak: 5 dikurangi 2, hasilnya 3',
          'Jadi vektor AB ditulis (4 3)',
        ],
        simpul: 'Ujung dikurangi pangkal. Bukan pangkal dikurangi ujung.',
      },
      {
        jenis: 'paragraf',
        teks: 'Coba periksa sendiri dengan menggambar: dari A(1, 2), melangkah 4 ke kanan sampai di x sama dengan 5, lalu 3 ke atas sampai di y sama dengan 5. Betul mendarat di B.',
      },
    ],
    seringKeliru: {
      judul: 'Vektor bukan titik koordinat',
      isi: 'Titik butuh sepasang angka untuk menyatakan LETAK. Vektor butuh dua titik untuk menyatakan PERPINDAHAN, dan hasilnya sepasang angka juga. Karena tulisannya mirip, keduanya sering dikira benda yang sama. Ujinya gampang: titik (4, 3) selamanya berada di tempat yang sama, sedangkan vektor (4 3) boleh digambar di mana saja asalkan panjang dan arahnya tidak berubah.',
      sumber: 'Buku Panduan Guru Matematika SMA/SMK Kelas X, Kemendikbudristek 2021, Bab 3, bagian Ayo Berpikir Kritis halaman 106.',
    },
    intisari: [
      'Satu panah bisa diganti dua langkah: mendatar lalu tegak. Kedua angkanya disebut komponen.',
      'Urutan komponen tidak boleh ditukar, sebab (3 4) dan (4 3) berbeda arah.',
      'Vektor baris ditulis tanpa koma, supaya tidak tertukar dengan titik koordinat.',
      'Vektor dari A ke B dicari dengan ujung dikurangi pangkal.',
    ],
    widget: 'pecah-komponen',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 4,
    slug: 'panjang-dan-arah',
    judul: 'Panjang panah itu Pythagoras',
    labelPendek: 'Panjang',
    pertanyaan: 'Sudah punya dua angka, lalu berapa panjang panahnya?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Komponen sudah memberi tahu ke kanan berapa dan ke atas berapa. Yang belum terjawab: panahnya sendiri sepanjang apa? Jawabannya sudah kamu pelajari di SMP, cuma belum dipakai di tempat ini.',
      },
      { jenis: 'sesi', judul: 'Segitiga siku-siku yang selalu terbentuk' },
      {
        jenis: 'paragraf',
        teks: 'Perhatikan gambar di sebelah kiri. Langkah mendatar, langkah tegak, dan panah utamanya selalu membentuk segitiga siku-siku, dan panah utamanya selalu menjadi sisi miringnya. Selama itu benar, Pythagoras berlaku.',
      },
      {
        jenis: 'contoh',
        judul: 'Panjang vektor (4 3)',
        baris: [
          'Kuadratkan komponen mendatar: 4 kuadrat sama dengan 16',
          'Kuadratkan komponen tegak: 3 kuadrat sama dengan 9',
          'Jumlahkan: 16 ditambah 9 sama dengan 25',
          'Tarik akarnya: akar 25 sama dengan 5',
        ],
        simpul: 'Panjangnya 5 satuan. Ditulis dengan tanda mutlak di kedua sisinya.',
      },
      {
        jenis: 'sorot',
        teks: 'Panjang vektor tidak pernah negatif. Komponennya boleh minus, tetapi minusnya hilang begitu dikuadratkan.',
      },
      {
        jenis: 'coba',
        teks: 'Putar panah di sebelah kiri sambil memperhatikan angka di bawah.',
        langkah: [
          'Bawa ujungnya ke kiri bawah sehingga kedua komponennya negatif. Panjangnya tetap positif.',
          'Cari letak yang membuat panjangnya tepat 5. Ada banyak, misalnya (4 3), (3 4), dan (-5 0).',
          'Perhatikan busur ungunya: itulah arah, diukur dari sumbu mendatar berlawanan arah jarum jam.',
        ],
      },
      { jenis: 'sesi', judul: 'Arah: derajat dan mata angin' },
      {
        jenis: 'paragraf',
        teks: 'Panjang saja belum cukup. Panah sepanjang 5 ke timur dan panah sepanjang 5 ke utara sama panjangnya, tetapi jelas bukan vektor yang sama. Arahnya juga harus disebut.',
      },
      {
        jenis: 'poin',
        judul: 'Dua cara menyebut arah, keduanya dipakai',
        butir: [
          'Dalam derajat - diukur dari sumbu mendatar positif, berputar berlawanan arah jarum jam. Nol derajat menghadap kanan, 90 derajat menghadap atas.',
          'Dalam mata angin - sumbu mendatar positif dianggap timur dan sumbu tegak positif dianggap utara, mengikuti kebiasaan peta. Ini yang dipakai kalau soalnya tentang kapal, pesawat, atau perjalanan.',
        ],
      },
      {
        jenis: 'paragraf',
        teks: 'Untuk sekarang, arahnya cukup diukur dengan busur seperti yang dilakukan di kelas. Kalau kamu sudah membaca topik Trigonometri, sudut itu bisa dihitung tanpa busur. Tetapi itu bukan syarat untuk memahami materi ini.',
      },
    ],
    seringKeliru: {
      judul: 'Menjumlahkan panjang untuk mendapat panjang hasil',
      isi: 'Diberi dua vektor sepanjang 6 dan 8, lalu ditanya panjang jumlahnya, banyak yang menjawab 14. Angka 14 hanya benar kalau keduanya searah. Kalau saling tegak lurus jawabannya 10, dan kalau berlawanan jawabannya 2. Panjang tidak bisa dijumlahkan sebelum arahnya diperhitungkan, dan cara yang aman adalah menjumlahkan komponennya dulu, baru mencari panjangnya.',
    },
    intisari: [
      'Panjang vektor dicari dengan Pythagoras: akar dari jumlah kuadrat kedua komponennya.',
      'Panjang tidak pernah negatif, sebab komponennya dikuadratkan lebih dulu.',
      'Arah dinyatakan dalam derajat dari sumbu mendatar, atau dalam mata angin.',
      'Dua vektor bisa sama panjang tetapi tetap berbeda, karena arahnya belum tentu sama.',
    ],
    widget: 'panjang-dan-arah',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 5,
    slug: 'arah-tanpa-panjang',
    judul: 'Arah tanpa panjang',
    labelPendek: 'Satuan',
    pertanyaan: 'Bagaimana menyebut arah saja, tanpa ikut menyebut jauhnya?',
    penjelasan: BELUM,
    widget: 'vektor-satuan',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 6,
    slug: 'menjumlah-vektor',
    judul: 'Menjumlah itu menyambung perjalanan',
    labelPendek: 'Jumlah',
    pertanyaan: 'Dua perjalanan berturut-turut, hasilnya perjalanan apa?',
    penjelasan: BELUM,
    widget: 'sambung-panah',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 7,
    slug: 'jajar-genjang',
    judul: 'Dua yang bekerja bersamaan',
    labelPendek: 'Jajar genjang',
    pertanyaan: 'Kalau keduanya bekerja serentak, bukan bergantian?',
    penjelasan: BELUM,
    widget: 'jajar-genjang',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 8,
    slug: 'mengurangi-vektor',
    judul: 'Mengurangi itu menambah lawannya',
    labelPendek: 'Selisih',
    pertanyaan: 'Apa arti mengurangi sebuah panah dengan panah lain?',
    penjelasan: BELUM,
    widget: 'selisih-panah',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 9,
    slug: 'kali-skalar',
    judul: 'Dikali angka: panjang berubah, arah tetap',
    labelPendek: 'Kali angka',
    pertanyaan: 'Apa yang terjadi kalau sebuah panah dikali bilangan?',
    penjelasan: BELUM,
    widget: 'kali-skalar',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 10,
    slug: 'dunia-nyata',
    judul: 'Vektor di dunia nyata',
    labelPendek: 'Dunia nyata',
    pertanyaan: 'Di mana saja panah ini benar-benar dipakai?',
    penjelasan: BELUM,
    widget: 'dunia-nyata-vektor',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 11,
    slug: 'perkalian-titik',
    judul: 'Seberapa searah?',
    labelPendek: 'Kali titik',
    pertanyaan: 'Bagaimana mengukur seberapa searah dua panah?',
    penjelasan: BELUM,
    widget: 'perkalian-titik',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 12,
    slug: 'proyeksi',
    judul: 'Bayangan satu panah pada panah lain',
    labelPendek: 'Proyeksi',
    pertanyaan: 'Berapa bagian dari panah ini yang benar-benar searah?',
    penjelasan: BELUM,
    widget: 'proyeksi',
    siap: false,
  },
]
