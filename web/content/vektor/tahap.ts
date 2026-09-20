/**
 * Vektor, 12 materi belajar. Topik ketiga MANTRA.
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

export const TAHAP: TahapVektor[] = [
  /* ================================================================= */
  {
    no: 1,
    slug: 'angka-saja-tidak-cukup',
    judul: 'Angka saja tidak cukup',
    labelPendek: 'Kenapa',
    pertanyaan: 'Kenapa 3 + 4 tidak selalu 7?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Sebuah perahu menyeberangi sungai. Pendayungnya menghadap lurus ke tepi seberang dan mendayung sekuat tenaga, tidak sekali pun membelokkan haluan. Namun begitu mendarat, perahu tidak berada di seberang tempat berangkatnya. Perahu berada jauh di hilir.',
      },
      {
        jenis: 'paragraf',
        teks: 'Tidak ada yang salah dengan dayungannya. Yang terjadi adalah sungainya ikut bergerak, dan gerak itu punya arah sendiri yang tidak sama dengan arah dayung.',
      },
      { jenis: 'sesi', judul: 'Ada besaran yang tidak selesai dijelaskan satu angka' },
      {
        jenis: 'paragraf',
        teks: 'Sebagian besaran cukup dinyatakan dengan satu angka dan satuannya. Sebagian lagi tidak, dan malah salah kalau dipaksa begitu.',
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
        teks: 'Alat interaktifnya adalah perahu tadi. Kedua panahnya bisa Anda tarik.',
        langkah: [
          'Perbesar panah merah (arus) tanpa mengubah dayungnya. Apa yang terjadi pada titik mendaratnya?',
          'Miringkan panah biru (dayung) melawan arus. Bisakah perahunya mendarat tepat di seberang? Apa yang terjadi pada lama menyeberangnya?',
          'Arahkan dayung sampai gerak tegaknya habis. Ke mana perahu bergerak sekarang?',
          'Dua angka saja, kecepatan dayung dan kecepatan arus, cukup atau tidak untuk meramalkan tempat mendarat? Apa yang kurang?',
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
          'Searah: 3 + 4 = 7 km',
          'Berlawanan arah: sisanya tinggal 1 km',
          'Saling tegak lurus: hasilnya √(3² + 4²) = √25 = 5 km',
        ],
        simpul: 'Angkanya sama persis, jawabannya tiga-tiganya berbeda. Yang membedakan hanya arah.',
      },
      {
        jenis: 'paragraf',
        teks: 'Perahu tadi persis kasus ketiga. Dayung 3 km ke seberang dan arus 4 km ke hilir dalam satu jam menghasilkan gerak sebenarnya sepanjang √(3² + 4²) = 5 km, bukan 7 km.',
      },
    ],
    seringKeliru: {
      judul: 'Menjumlahkan angkanya saja',
      isi: 'Melihat dayung 3 dan arus 4, banyak yang langsung menulis 7. Itu benar HANYA kalau keduanya searah. Pada perahu tadi keduanya saling tegak lurus, sehingga jawabannya 5. Aturannya sederhana: begitu arah ikut dihitung, angka tidak boleh lagi ditumpuk begitu saja.',
    },
    intisari: [
      'Besaran yang butuh arah disebut vektor. Yang cukup satu angka disebut skalar.',
      'Perpindahan, kecepatan, dan gaya adalah vektor. Massa, suhu, dan waktu bukan.',
      'Menjumlahkan vektor bergantung pada arah, jadi 3 + 4 bisa menjadi 7, bisa 1, bisa 5.',
    ],
    widget: 'perahu-sungai',
    video: { berkas: 'vektor1-perahu.mp4', poster: 'vektor1-perahu.jpg' },
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
          'Garis melengkung - vektor harus lurus, karena satu vektor menyatakan satu arah saja.',
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
        teks: 'Alat interaktifnya punya panah acuan yang diam dan satu panah yang bisa Anda pindahkan.',
        langkah: [
          'Tarik pangkal dan ujungnya bergantian sampai bentuknya sama dengan acuan. Perhatikan penilaian alatnya.',
          'Sekarang geser keduanya bersama-sama ke pojok lain, jaga bentuknya. Apakah penilaiannya berubah?',
          'Balikkan arahnya, jaga panjangnya. Menjadi apa penilaiannya sekarang?',
          'Jadi, apa saja yang menentukan dua panah disebut vektor yang sama, dan apa yang tidak ikut menentukan?',
        ],
      },
      { jenis: 'sesi', judul: 'Beberapa jenis yang perlu dikenali' },
      {
        jenis: 'poin',
        butir: [
          'Vektor ekuivalen - panjang sama, arah sama. Dianggap vektor yang sama.',
          'Vektor lawan - panjang sama, arah berkebalikan. Lawan dari AB adalah BA, ditulis juga negatif AB.',
          'Vektor berkebalikan - arahnya sama tetapi panjangnya kebalikannya. Berguna nanti saat membicarakan vektor satuan.',
          'Vektor nol - pangkal dan ujungnya berimpit. Panjangnya nol, dan vektor nol satu-satunya vektor yang tidak punya arah.',
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
        teks: 'Menggambar panah di kertas berpetak memang gamblang. Tetapi begitu panahnya ada sepuluh, menggambar satu per satu jadi melelahkan dan sering meleset satu dua kotak. Ada cara yang jauh lebih ringkas: catat saja perjalanannya sebagai dua langkah.',
      },
      { jenis: 'sesi', judul: 'Satu panah, dua langkah' },
      {
        jenis: 'paragraf',
        teks: 'Ambil satu panah dari titik asal O ke sebuah titik. Semiring apa pun panah itu, perjalanannya selalu bisa diganti dua langkah yang lebih enak dibaca: berjalan mendatar dulu, lalu tegak. Titik yang dituju tetap sama persis.',
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
        teks: 'Tarik ujung panah di alatnya, lalu perhatikan kedua angkanya.',
        langkah: [
          'Tarik ujungnya ke kanan atas. Bagaimana tanda kedua komponennya?',
          'Bawa ke kiri atas. Komponen mana yang berubah tanda, dan mana yang tidak?',
          'Turunkan sampai tepat di sumbu-x. Berapa komponen tegaknya sekarang?',
          'Dari ketiga percobaan, apa yang menentukan tanda tiap komponen?',
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
          'Komponen mendatar: 5 − 1 = 4',
          'Komponen tegak: 5 − 2 = 3',
          'Jadi vektor AB = (4 3)',
        ],
        simpul: 'Ujung dikurangi pangkal. Bukan pangkal dikurangi ujung.',
      },
      {
        jenis: 'paragraf',
        teks: 'Coba periksa sendiri dengan menggambar: dari A(1, 2), melangkah 4 ke kanan sampai di x = 5, lalu 3 ke atas sampai di y = 5. Betul mendarat di B.',
      },
    ],
    seringKeliru: {
      judul: 'Vektor bukan titik koordinat',
      isi: 'Titik butuh sepasang angka untuk menyatakan LETAK. Vektor butuh dua titik untuk menyatakan PERPINDAHAN, dan hasilnya sepasang angka juga. Karena tulisannya mirip, keduanya sering dikira benda yang sama. Cara memeriksanya begini: titik (4, 3) selamanya berada di tempat yang sama, sedangkan vektor (4 3) boleh digambar di mana saja asalkan panjang dan arahnya tidak berubah.',
      sumber: 'Buku Panduan Guru Matematika SMA/SMK Kelas X, Kemendikbudristek 2021, Bab 3, bagian Ayo Berpikir Kritis halaman 106.',
    },
    intisari: [
      'Satu panah bisa diganti dua langkah: mendatar lalu tegak. Kedua angkanya disebut komponen.',
      'Urutan komponen tidak boleh ditukar, karena (3 4) dan (4 3) berbeda arah.',
      'Vektor baris ditulis tanpa koma, supaya tidak tertukar dengan titik koordinat.',
      'Vektor dari A ke B dicari dengan ujung dikurangi pangkal.',
    ],
    widget: 'pecah-komponen',
    video: { berkas: 'vektor3-komponen.mp4', poster: 'vektor3-komponen.jpg' },
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
        teks: 'Komponen sudah memberi tahu ke kanan berapa dan ke atas berapa. Yang belum terjawab: panahnya sendiri sepanjang apa? Jawabannya sudah Anda pelajari di SMP, cuma belum dipakai di tempat ini.',
      },
      { jenis: 'sesi', judul: 'Segitiga siku-siku yang selalu terbentuk' },
      {
        jenis: 'paragraf',
        teks: 'Perhatikan gambar di panel Alat. Langkah mendatar, langkah tegak, dan panah utamanya selalu membentuk segitiga siku-siku, dan panah utamanya selalu menjadi sisi miringnya. Selama itu benar, Pythagoras berlaku.',
      },
      {
        jenis: 'contoh',
        judul: 'Panjang vektor (4 3)',
        baris: [
          'Kuadratkan komponen mendatar: 4² = 16',
          'Kuadratkan komponen tegak: 3² = 9',
          'Jumlahkan: 16 + 9 = 25',
          'Tarik akarnya: √25 = 5',
        ],
        simpul: 'Panjangnya 5 satuan, ditulis dengan tanda mutlak di kedua sisinya: |(4 3)| = √(4² + 3²) = 5.',
      },
      {
        jenis: 'sorot',
        teks: 'Panjang vektor tidak pernah negatif. Komponennya boleh minus, tetapi minusnya hilang begitu dikuadratkan.',
      },
      {
        jenis: 'coba',
        teks: 'Putar panah di alatnya sambil memperhatikan angka di bawah.',
        langkah: [
          'Bawa ujungnya ke kiri bawah sehingga kedua komponennya negatif. Bagaimana tanda panjangnya?',
          'Cari letak yang membuat panjangnya tepat 5. Berapa banyak yang bisa Anda temukan?',
          'Perhatikan busur ungunya. Diukur dari mana, dan ke arah mana?',
          'Bisakah dua vektor punya panjang sama tetapi komponen berbeda? Apa yang membedakan keduanya?',
        ],
      },
      { jenis: 'sesi', judul: 'Arah: derajat dan mata angin' },
      {
        jenis: 'paragraf',
        teks: 'Panjang saja belum cukup. Panah sepanjang 5 ke timur dan panah sepanjang 5 ke utara sama panjangnya, tetapi keduanya bukan vektor yang sama. Arahnya juga harus disebut.',
      },
      {
        jenis: 'poin',
        judul: 'Dua cara menyebut arah, keduanya dipakai',
        butir: [
          'Dalam derajat - diukur dari sumbu-x positif, berputar berlawanan arah jarum jam. Nol derajat menghadap kanan, 90 derajat menghadap atas.',
          'Dalam mata angin - sumbu-x positif dianggap timur dan sumbu-y positif dianggap utara, mengikuti kebiasaan peta. Ini yang dipakai kalau soalnya tentang kapal, pesawat, atau perjalanan.',
        ],
      },
      {
        jenis: 'paragraf',
        teks: 'Untuk sekarang, arahnya cukup diukur dengan busur seperti yang dilakukan di kelas. Kalau Anda sudah membaca topik Trigonometri, sudut itu bisa dihitung tanpa busur. Tetapi itu bukan syarat untuk memahami materi ini.',
      },
    ],
    seringKeliru: {
      judul: 'Menjumlahkan panjang untuk mendapat panjang hasil',
      isi: 'Diberi dua vektor sepanjang 6 dan 8, lalu ditanya panjang jumlahnya, banyak yang menjawab 14. Angka 14 hanya benar kalau keduanya searah. Kalau saling tegak lurus jawabannya 10, dan kalau berlawanan jawabannya 2. Panjang tidak bisa dijumlahkan sebelum arahnya diperhitungkan, dan cara yang aman adalah menjumlahkan komponennya dulu, baru mencari panjangnya.',
    },
    intisari: [
      'Panjang vektor dicari dengan Pythagoras: |(a b)| = √(a² + b²), akar dari jumlah kuadrat kedua komponennya.',
      'Panjang tidak pernah negatif, karena komponennya dikuadratkan lebih dulu.',
      'Arah dinyatakan dalam derajat dari sumbu-x, atau dalam mata angin.',
      'Dua vektor bisa sama panjang tetapi tetap berbeda, karena arahnya belum tentu sama.',
    ],
    widget: 'panjang-dan-arah',
    video: { berkas: 'vektor4-panjang.mp4', poster: 'vektor4-panjang.jpg' },
    siap: true,
  },
  /* ================================================================= */
  {
    no: 5,
    slug: 'arah-tanpa-panjang',
    judul: 'Arah tanpa panjang',
    labelPendek: 'Satuan',
    pertanyaan: 'Bagaimana menyebut arah saja, tanpa ikut menyebut jauhnya?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Kadang yang dibutuhkan hanya arahnya. Petunjuk jalan tidak perlu memberi tahu seberapa jauh untuk menyatakan ke mana. Vektor punya cara rapi untuk itu: buat panah yang arahnya sama persis, tetapi panjangnya dipatok tepat 1.',
      },
      { jenis: 'sesi', judul: 'Membagi vektor dengan panjangnya sendiri' },
      {
        jenis: 'paragraf',
        teks: 'Caranya satu langkah saja: bagi tiap komponen dengan panjang vektornya. Hasilnya disebut VEKTOR SATUAN, dan panjangnya selalu 1 berapa pun vektor asalnya.',
      },
      {
        jenis: 'contoh',
        judul: 'Vektor satuan dari (3 4)',
        baris: [
          'Cari panjangnya dulu: √(9 + 16) = 5',
          'Bagi komponen mendatarnya: 3/5 = 0,6',
          'Bagi komponen tegaknya: 4/5 = 0,8',
          'Periksa: √(0,36 + 0,64) = √1 = 1',
        ],
        simpul: 'Vektor satuannya (3/5 4/5) = (0,6 0,8), dan panjangnya benar-benar 1.',
      },
      {
        jenis: 'coba',
        teks: 'Tarik ujung panah hitam di alatnya.',
        langkah: [
          'Panjangkan panah hitam sampai jauh. Apa yang terjadi pada panah ungunya?',
          'Putar arahnya. Apakah panah ungu ikut berputar?',
          'Perhatikan baris terakhir di tabel: panjang vektor satuan. Pernahkah angkanya berubah?',
          'Jadi, dari panah hitam, apa yang diambil panah ungu dan apa yang dibuangnya?',
        ],
      },
      { jenis: 'sesi', judul: 'Dua vektor satuan yang punya nama sendiri' },
      {
        jenis: 'poin',
        butir: [
          'i - vektor satuan yang menghadap sumbu-x positif, yaitu (1 0).',
          'j - vektor satuan yang menghadap sumbu-y positif, yaitu (0 1).',
        ],
      },
      {
        jenis: 'paragraf',
        teks: 'Dengan keduanya, vektor bisa ditulis tanpa tanda kurung sama sekali. Vektor (3 4) sama artinya dengan 3i + 4j. Bacanya: tiga langkah ke arah i, lalu empat langkah ke arah j.',
      },
      { jenis: 'sesi', judul: 'Vektor posisi' },
      {
        jenis: 'paragraf',
        teks: 'Vektor yang pangkalnya selalu di titik asal O disebut VEKTOR POSISI. Gunanya menyatakan letak sebuah titik dalam bentuk vektor, sehingga letak pun bisa ikut dihitung. Vektor posisi titik P(3, 4) adalah (3 4).',
      },
      { jenis: 'sesi', judul: 'Sedikit bocoran tentang ruang' },
      {
        jenis: 'paragraf',
        teks: 'Di ruang tiga dimensi ceritanya sama, hanya komponennya bertambah satu dan muncul vektor satuan ketiga bernama k. Semua yang Anda pelajari di halaman ini tetap berlaku, termasuk cara mencari panjangnya. Ini bocoran saja, tidak diuji sampai topik Ruang Tiga Dimensi.',
      },
      {
        jenis: 'contoh',
        judul: 'Vektor satuan dari 2i + 2j - k',
        baris: [
          'Panjangnya: √(4 + 4 + 1) = √9 = 3',
          'Bagi tiap komponen dengan 3',
          'Vektor satuannya: (2/3)i + (2/3)j − (1/3)k',
        ],
        simpul: 'Gambarnya memang tidak ditampilkan di sini. Bangun ruang dibahas di topik Ruang Tiga Dimensi.',
      },
    ],
    seringKeliru: {
      judul: 'Vektor satuan dikira selalu i atau j',
      isi: 'Vektor satuan bukan cuma dua. Setiap vektor yang panjangnya 1 adalah vektor satuan, ke arah mana pun vektor itu menghadap. Vektor (0,6  0,8) panjangnya 1, jadi termasuk vektor satuan, walaupun bukan i maupun j. Yang istimewa dari i dan j hanyalah arahnya yang berimpit dengan sumbu, sehingga enak dipakai sebagai patokan.',
    },
    intisari: [
      'Vektor satuan dibuat dengan membagi tiap komponen dengan panjang vektornya.',
      'Panjangnya selalu tepat 1, jadi vektor satuan menyatakan arah saja.',
      'i = (1 0) dan j = (0 1), sehingga (3 4) bisa ditulis 3i + 4j.',
      'Vektor posisi adalah vektor yang pangkalnya di titik asal.',
    ],
    widget: 'vektor-satuan',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 6,
    slug: 'menjumlah-vektor',
    judul: 'Menjumlah itu menyambung perjalanan',
    labelPendek: 'Jumlah',
    pertanyaan: 'Dua perjalanan berturut-turut, hasilnya perjalanan apa?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Anda berjalan ke suatu tempat, lalu dari situ berjalan lagi ke tempat lain. Dilihat dari titik berangkat, ke mana Anda berpindah? Satu panah saja sudah cukup menjawabnya, yaitu panah dari titik awal langsung ke titik akhir.',
      },
      { jenis: 'sesi', judul: 'Aturannya: ujung ke pangkal' },
      {
        jenis: 'paragraf',
        teks: 'Untuk menjumlahkan dua vektor secara gambar, pindahkan vektor kedua sehingga PANGKALNYA menempel di UJUNG vektor pertama. Boleh dipindahkan seperti itu karena letak memang tidak mengubah vektor, seperti yang sudah dibahas di Materi 02.',
      },
      {
        jenis: 'paragraf',
        teks: 'Setelah tersambung, tarik panah dari pangkal yang pertama sampai ujung yang terakhir. Panah itulah hasil penjumlahannya, dan namanya RESULTAN. Cara ini disebut metode segitiga, karena ketiga panahnya membentuk segitiga.',
      },
      {
        jenis: 'coba',
        teks: 'Alat interaktifnya sudah tersambung ujung ke pangkal.',
        langkah: [
          'Tarik ujung panah biru. Apa yang terjadi pada panah merah?',
          'Tarik ujung panah merah. Apa yang terjadi pada panah hitam?',
          'Perhatikan panah hitam pada tiap perubahan. Dari mana panah itu berangkat, dan di mana berakhirnya?',
          'Kalau panah hitam adalah hasil jumlah, apa yang diwakilinya dalam cerita perjalanan?',
        ],
      },
      { jenis: 'sesi', judul: 'Kalau perjalanannya lebih dari dua' },
      {
        jenis: 'paragraf',
        teks: 'Aturannya tidak berubah. Sambung terus ujung ke pangkal, sebanyak apa pun langkahnya, lalu tarik satu panah dari titik awal ke titik akhir. Cara ini disebut metode poligon, dan sebenarnya cuma metode segitiga yang diulang.',
      },
      { jenis: 'sesi', judul: 'Dengan komponen, jauh lebih cepat' },
      {
        jenis: 'paragraf',
        teks: 'Menggambar itu bagus untuk memahami, tetapi lambat dan bergantung ketelitian penggaris. Begitu vektornya sudah berbentuk komponen, penjumlahannya jadi pekerjaan yang sangat singkat: jumlahkan yang mendatar dengan yang mendatar, dan yang tegak dengan yang tegak.',
      },
      {
        jenis: 'contoh',
        judul: 'Jumlahkan (3 1) dan (1 2)',
        baris: [
          'Komponen mendatar: 3 + 1 = 4',
          'Komponen tegak: 1 + 2 = 3',
          'Resultannya (3 1) + (1 2) = (4 3)',
          'Panjang resultannya: √(16 + 9) = 5',
        ],
        simpul: 'Panjang kedua vektor asalnya sekitar 3,16 dan 2,24. Dijumlahkan hasilnya 5,40, bukan 5.',
      },
      {
        jenis: 'sorot',
        teks: 'Komponen boleh dijumlahkan. Panjang tidak boleh.',
      },
    ],
    seringKeliru: {
      judul: 'Menyambung pangkal ke pangkal',
      isi: 'Kesalahan gambar yang paling sering terjadi adalah menempelkan kedua pangkal di satu titik, lalu menarik panah dari ujung ke ujung. Yang terbentuk bukan resultan, tetapi SELISIH kedua vektor itu, dan panjangnya bisa jauh berbeda. Untuk penjumlahan cara segitiga, yang menempel adalah ujung vektor pertama dengan pangkal vektor kedua.',
      sumber: 'Buku Panduan Guru Matematika SMA/SMK Kelas X, Kemendikbudristek 2021, Bab 3 bagian C.1, halaman 111 sampai 114.',
    },
    intisari: [
      'Menjumlahkan vektor secara gambar: sambung ujung ke pangkal, lalu tarik dari awal ke akhir.',
      'Hasil penjumlahan vektor disebut resultan.',
      'Lebih dari dua vektor memakai cara yang sama, namanya metode poligon.',
      'Dengan komponen, cukup jumlahkan yang mendatar dan yang tegak masing-masing.',
    ],
    widget: 'sambung-panah',
    video: { berkas: 'vektor6-sambung.mp4', poster: 'vektor6-sambung.jpg' },
    siap: true,
  },
  /* ================================================================= */
  {
    no: 7,
    slug: 'jajar-genjang',
    judul: 'Dua yang bekerja bersamaan',
    labelPendek: 'Jajar genjang',
    pertanyaan: 'Kalau keduanya bekerja serentak, bukan bergantian?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Dua orang menarik satu peti pada saat yang sama, masing-masing dari arah yang berbeda. Di sini tidak ada yang berurutan: tidak ada tarikan pertama lalu tarikan kedua. Keduanya bekerja serentak dari titik yang sama.',
      },
      {
        jenis: 'paragraf',
        teks: 'Menggambarnya dengan cara sambung akan terasa aneh, karena tidak ada yang perlu disambung. Untuk keadaan semacam ini dipakai METODE JAJAR GENJANG.',
      },
      { jenis: 'sesi', judul: 'Cara menggambarnya' },
      {
        jenis: 'poin',
        butir: [
          'Gambar kedua vektor dari SATU titik pangkal yang sama.',
          'Lengkapi menjadi jajar genjang: tarik garis sejajar masing-masing vektor lewat ujung vektor yang satunya.',
          'Tarik diagonal dari titik pangkal ke pojok seberang. Diagonal itulah resultannya.',
        ],
      },
      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menggambar jajar genjangnya secara otomatis.',
        langkah: [
          'Tarik salah satu ujungnya. Apa yang dilakukan sisi putus-putusnya?',
          'Dekatkan kedua panah sampai hampir sejajar. Bandingkan panjang diagonalnya dengan jumlah kedua panjang panahnya.',
          'Jauhkan sampai hampir berlawanan. Sekarang bandingkan dengan selisih kedua panjangnya.',
          'Kapan panjang hasil jumlah sama dengan jumlah panjangnya, dan kapan lebih kecil?',
        ],
      },
      { jenis: 'sesi', judul: 'Kapan memakai yang mana' },
      {
        jenis: 'poin',
        judul: 'Bedanya cuma pada ceritanya, bukan pada hasilnya',
        butir: [
          'Metode segitiga - untuk yang terjadi BERURUTAN. Berjalan ke sana lalu ke sana lagi.',
          'Metode jajar genjang - untuk yang bekerja SERENTAK. Dua gaya menarik satu benda pada saat yang sama.',
        ],
      },
      {
        jenis: 'sorot',
        teks: 'Kedua cara selalu memberi resultan yang sama persis. Yang berbeda hanya gambarnya, dan gambar dipilih supaya cocok dengan ceritanya.',
      },
      {
        jenis: 'contoh',
        judul: 'Dua gaya saling tegak lurus',
        baris: [
          'Gaya pertama 6 newton ke timur, ditulis (6 0)',
          'Gaya kedua 8 newton ke utara, ditulis (0 8)',
          'Resultannya (6 0) + (0 8) = (6 8)',
          'Besarnya: √(36 + 64) = √100 = 10 newton',
        ],
        simpul: '6 newton dan 8 newton memberi 10 newton, bukan 14. Sudut antara keduanya yang menentukan.',
      },
    ],
    seringKeliru: {
      judul: 'Mengira kedua metode memberi jawaban berbeda',
      isi: 'Karena gambarnya terlihat sangat berlainan, banyak yang mengira harus memilih metode yang benar supaya jawabannya tidak salah. Padahal keduanya selalu memberi resultan yang sama. Jajar genjang sebenarnya berisi segitiga yang sama, cuma digambar lengkap dengan bayangannya. Pilih yang paling cocok dengan ceritanya, jangan takut salah pilih.',
    },
    intisari: [
      'Metode jajar genjang dipakai saat kedua vektor bekerja serentak dari satu titik.',
      'Resultannya adalah diagonal jajar genjang yang berangkat dari titik pangkal.',
      'Hasilnya selalu sama dengan metode segitiga.',
      'Dua gaya 6 N dan 8 N yang tegak lurus memberi resultan 10 N, bukan 14 N.',
    ],
    widget: 'jajar-genjang',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 8,
    slug: 'mengurangi-vektor',
    judul: 'Mengurangi itu menambah lawannya',
    labelPendek: 'Selisih',
    pertanyaan: 'Apa arti mengurangi sebuah panah dengan panah lain?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Pengurangan vektor tidak butuh aturan baru sama sekali. Pengurangan cuma penjumlahan yang salah satu vektornya dibalik arahnya.',
      },
      {
        jenis: 'sorot',
        teks: 'a − b sama artinya dengan a + (−b): a ditambah lawan b.',
      },
      {
        jenis: 'paragraf',
        teks: 'Lawan sebuah vektor sudah dibahas di Materi 02: panjangnya sama, arahnya berkebalikan. Dalam bentuk komponen, membalik arah cukup dengan mengganti tanda kedua komponennya.',
      },
      {
        jenis: 'contoh',
        judul: 'Kurangi (3 1) dengan (1 2)',
        baris: [
          'Lawan dari (1 2) adalah (-1 -2)',
          'Jumlahkan: 3 + (-1) = 2',
          'Lalu: 1 + (-2) = -1',
          'Hasilnya (3 1) − (1 2) = (2 -1)',
        ],
        simpul: 'Lebih singkat lagi: kurangi saja komponennya langsung, mendatar dengan mendatar dan tegak dengan tegak.',
      },
      { jenis: 'sesi', judul: 'Gambaran kedua yang jauh lebih berguna' },
      {
        jenis: 'paragraf',
        teks: 'Ada cara melihat pengurangan yang lebih sering terpakai di soal. Kalau a dan b sama-sama berangkat dari titik asal, maka a − b adalah panah DARI UJUNG b MENUJU UJUNG a.',
      },
      {
        jenis: 'paragraf',
        teks: 'Perhatikan arahnya: dari b menuju a, mengikuti urutan pengurangannya yang terbalik. Inilah yang menjelaskan aturan di Materi 03 tentang vektor dari satu titik ke titik lain.',
      },
      {
        jenis: 'contoh',
        judul: 'Vektor dari A(2, 1) ke B(6, 4)',
        baris: [
          'Vektor posisi A adalah a = (2 1), vektor posisi B adalah b = (6 4)',
          'Vektor AB = b − a, posisi B dikurangi posisi A',
          'Mendatar: 6 − 2 = 4',
          'Tegak: 4 − 1 = 3',
          'Jadi AB = (4 3), panjangnya |AB| = 5',
        ],
        simpul: 'Ujung dikurangi pangkal. Sekarang alasannya terlihat, bukan cuma dihafal.',
      },
      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menggambar keduanya sekaligus.',
        langkah: [
          'Perhatikan dua panah ungu: satu dari titik asal, satu dari ujung b menuju ujung a. Bandingkan bentuk keduanya.',
          'Tarik ujung a. Apakah kedua panah ungu berubah bersamaan?',
          'Buat a dan b sama persis. Apa yang terjadi pada selisihnya?',
          'Panah ungu dari ujung b ke ujung a itu mewakili apa? Kenapa arahnya dari b ke a, bukan sebaliknya?',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Membalik urutan pengurangan',
      isi: 'Ditanya vektor dari A ke B, banyak yang menulis a − b karena A disebut lebih dulu. Yang benar AB = b − a, yaitu ujung dikurangi pangkal. Salah urutan tidak membuat jawabannya sedikit meleset, tetapi menghasilkan panah yang arahnya berlawanan sama sekali. Cara mengingat yang aman: bayangkan berjalan DARI A, jadi A adalah titik yang ditinggalkan, dan yang ditinggalkan itulah yang dikurangkan.',
    },
    intisari: [
      'a − b = a + (−b): a ditambah lawan b.',
      'Dengan komponen, cukup kurangkan komponennya masing-masing.',
      'Kalau keduanya dari titik asal, a − b adalah panah dari ujung b ke ujung a.',
      'Vektor dari A ke B adalah AB = b − a, posisi B dikurangi posisi A, bukan sebaliknya.',
    ],
    widget: 'selisih-panah',
    video: { berkas: 'vektor8-selisih.mp4', poster: 'vektor8-selisih.jpg' },
    siap: true,
  },
  /* ================================================================= */
  {
    no: 9,
    slug: 'kali-skalar',
    judul: 'Dikali angka: panjang berubah, arah tetap',
    labelPendek: 'Kali angka',
    pertanyaan: 'Apa yang terjadi kalau sebuah panah dikali bilangan?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Vektor dikali sebuah bilangan biasa, bukan dikali vektor lain. Bilangan biasa itu namanya SKALAR, dan operasinya disebut perkalian skalar dengan vektor. Hasilnya tetap sebuah vektor.',
      },
      {
        jenis: 'paragraf',
        teks: 'Caranya sederhana: kalikan tiap komponennya dengan bilangan itu. Yang menarik adalah akibatnya pada gambar.',
      },
      {
        jenis: 'poin',
        judul: 'Tiga hal yang terjadi, bergantung pengalinya',
        butir: [
          'Pengali lebih dari 1 - panahnya memanjang, arahnya tidak berubah sedikit pun.',
          'Pengali antara 0 dan 1 - panahnya memendek, arahnya tetap.',
          'Pengali negatif - panahnya berbalik arah, dan panjangnya mengikuti nilai pengali tanpa tandanya.',
        ],
      },
      {
        jenis: 'coba',
        teks: 'Geser pengali di alatnya, dari negatif tiga sampai tiga.',
        langkah: [
          'Mulai dari pengali 2, lalu turunkan pelan-pelan. Apa yang berubah pada panah ungunya, dan apa yang tidak?',
          'Lewati angka nol perlahan. Apa yang terjadi tepat di nol, dan ke mana panahnya menghadap sesudahnya?',
          'Bandingkan pengali 2 dengan negatif 2. Apa yang sama, apa yang berbeda?',
          'Jadi, apa yang diubah oleh besar pengali, dan apa yang diubah oleh tandanya?',
        ],
      },
      { jenis: 'sesi', judul: 'Panjangnya berubah seberapa' },
      {
        jenis: 'contoh',
        judul: 'Kalikan a = (2 1) dengan 3 dan dengan -2',
        baris: [
          'Panjang a: |a| = √(4 + 1) = √5 ≈ 2,24',
          '3a = (6 3), panjangnya 3√5 ≈ 6,71',
          '-2a = (-4 -2), panjangnya 2√5 ≈ 4,47',
        ],
        simpul: 'Panjang barunya adalah panjang lama dikali pengalinya tanpa tanda minus. Panjang tetap tidak pernah negatif.',
      },
      { jenis: 'sesi', judul: 'Kelipatan berarti sejajar' },
      {
        jenis: 'sorot',
        teks: 'Dua vektor yang salah satunya kelipatan yang lain pasti SEJAJAR. Itu cara paling cepat memeriksa kesejajaran.',
      },
      {
        jenis: 'paragraf',
        teks: 'Contohnya (2 1) dan (6 3) sejajar, karena yang kedua adalah tiga kali yang pertama. Begitu juga (2 1) dan (-4 -2): keduanya sejajar walaupun arahnya berlawanan, karena sejajar hanya bicara tentang garisnya, bukan tentang ke mana menghadapnya.',
      },
    ],
    seringKeliru: {
      judul: 'Mengira pengali negatif membuat panjangnya negatif',
      isi: '-2 · (2 1) = (-4 -2), dan panjangnya 2√5 ≈ 4,47. Bukan -4,47. Panjang adalah ukuran, dan ukuran tidak pernah kurang dari nol. Yang dibalik oleh tanda minus adalah ARAHNYA, bukan panjangnya. Kalau perhitungan panjang Anda menghasilkan angka negatif, pasti ada langkah yang keliru.',
    },
    intisari: [
      'Vektor dikali bilangan biasa: kalikan tiap komponennya.',
      'Pengali positif menjaga arah, pengali negatif membalik arah.',
      'Panjang barunya adalah panjang lama dikali pengali tanpa tandanya, jadi tetap tidak negatif.',
      'Pengali nol menghasilkan vektor nol, dan dua vektor yang berkelipatan pasti sejajar.',
    ],
    widget: 'kali-skalar',
    video: { berkas: 'vektor9-kali-skalar.mp4', poster: 'vektor9-kali-skalar.jpg' },
    siap: true,
  },
  /* ================================================================= */
  {
    no: 10,
    slug: 'dunia-nyata',
    judul: 'Vektor di dunia nyata',
    labelPendek: 'Dunia nyata',
    pertanyaan: 'Di mana saja panah ini benar-benar dipakai?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Sembilan materi sebelumnya membahas caranya. Materi ini menunjukkan tempatnya. Keempat foto di alatnya bukan contoh yang dikarang supaya cocok dengan pelajaran: keempatnya memang dikerjakan dengan vektor oleh orang yang bekerja di bidang itu.',
      },
      { jenis: 'sesi', judul: 'Menutup cerita perahu' },
      {
        jenis: 'paragraf',
        teks: 'Materi 01 dibuka dengan perahu yang mendarat di hilir. Sekarang semua alatnya sudah ada di tangan Anda, jadi ceritanya bisa dituntaskan dengan hitungan, bukan cuma gambaran.',
      },
      {
        jenis: 'contoh',
        judul: 'Perahu menyeberang sungai selebar 3 km',
        baris: [
          'Dayung memberi perpindahan (0 3) km tiap jam, lurus ke seberang',
          'Arus memberi perpindahan (4 0) km tiap jam, ke hilir',
          'Gerak sebenarnya: (0 3) + (4 0) = (4 3)',
          'Gerak tegaknya 3 km per jam, jadi menyeberang butuh 1 jam',
          'Selama 1 jam itu arus membawanya 4 km ke hilir',
        ],
        simpul: 'Mendarat 4 km dari titik yang dibidik. Jarak yang benar-benar ditempuh tepat 5 km, bukan 3 km.',
      },
      { jenis: 'sesi', judul: 'Yang sama, di udara' },
      {
        jenis: 'paragraf',
        teks: 'Pesawat menghadapi persoalan yang identik, hanya medianya udara dan angkanya jauh lebih besar. Pilot yang mengarahkan hidung pesawat lurus ke landasan saat ada angin samping akan melenceng, persis seperti perahu tadi. Karena itu pesawat sengaja dihadapkan sedikit melawan angin, supaya jumlah kedua vektornya kembali menuju landasan.',
      },
      { jenis: 'sesi', judul: 'Memecah, bukan menjumlah' },
      {
        jenis: 'paragraf',
        teks: 'Perahu layar memakai arah sebaliknya: bukan menjumlahkan dua vektor, tetapi memecah satu vektor menjadi dua komponen. Gaya angin yang menekan layar dipecah menjadi bagian yang mendorong ke depan dan bagian yang mendorong ke samping. Lunas di bawah perahu menahan yang menyamping, sehingga yang tersisa mendorong perahu maju.',
      },
      {
        jenis: 'paragraf',
        teks: 'Itulah kenapa perahu layar bisa melaju menyerong terhadap angin, bukan cuma searah tiupannya. Caranya persis pemecahan komponen di Materi 03, hanya sumbunya bukan mendatar dan tegak, tetapi arah maju dan arah samping perahu.',
      },
      { jenis: 'sesi', judul: 'Vektor yang dipakai terang-terangan' },
      {
        jenis: 'paragraf',
        teks: 'Peta lempeng bumi di foto keempat bahkan tidak menyembunyikan vektornya. Tiap anak panah menunjukkan ke mana sebuah lempeng bergerak, dan angka di sebelahnya menunjukkan seberapa cepat dalam milimeter per tahun. Karena arah dan besarnya diketahui, para ilmuwan bisa memperkirakan lempeng mana yang mendekat dan mana yang menjauh.',
      },
      {
        jenis: 'sorot',
        teks: 'Peta seperti ini yang dipakai Buku Panduan Guru untuk membuka bab vektor, dan alasannya masuk akal: di situ vektor terlihat apa adanya, tanpa perlu diterjemahkan.',
      },
    ],
    intisari: [
      'Perahu, pesawat, dan layar semuanya persoalan yang sama: dua gerak atau dua gaya yang berlaku bersamaan.',
      'Kadang yang dibutuhkan menjumlahkan vektor, kadang malah memecahnya jadi komponen.',
      'Peta lempeng bumi memakai vektor secara langsung: arah panah dan panjangnya langsung terbaca.',
      'Semua yang dipakai di sini sudah dibahas di Materi 01 sampai 09.',
    ],
    widget: 'dunia-nyata-vektor',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 11,
    slug: 'perkalian-titik',
    judul: 'Seberapa searah?',
    labelPendek: 'Kali titik',
    pertanyaan: 'Bagaimana mengukur seberapa searah dua panah?',
    penjelasan: [
      {
        jenis: 'sorot',
        teks: 'Materi 11 dan 12 di luar bab wajib Kelas 10. Keduanya tidak ada di buku sekolah Anda, tetapi masih keluar di UTBK. Boleh dilewati kalau Anda sedang mengejar ulangan sekolah.',
      },
      {
        jenis: 'paragraf',
        teks: 'Sampai sini semua operasi menghasilkan vektor lagi. Perkalian titik berbeda: dua vektor masuk, sebuah ANGKA yang keluar. Angka itu mengukur seberapa searah keduanya.',
      },
      { jenis: 'sesi', judul: 'Dua cara menghitungnya, hasilnya sama' },
      {
        jenis: 'paragraf',
        teks: 'Cara kedua memakai kosinus sudut. Kalau belum kenal, baca Trigonometri materi 04 dulu, atau pakai cara pertama saja.',
      },
      {
        jenis: 'poin',
        butir: [
          'Lewat komponen - kalikan yang mendatar dengan yang mendatar, kalikan yang tegak dengan yang tegak, lalu jumlahkan keduanya.',
          'Lewat panjang dan sudut - kalikan panjang a, panjang b, dan kosinus sudut antara keduanya.',
        ],
      },
      {
        jenis: 'paragraf',
        teks: 'Cara pertama dipakai kalau komponennya diketahui, dan itu yang paling sering. Cara kedua dipakai kalau yang diketahui panjang dan sudutnya, atau malah kalau sudutnya yang dicari.',
      },
      {
        jenis: 'contoh',
        judul: 'Hasil kali titik (4 3) dengan (2 0)',
        baris: [
          'Lewat komponen: 4 · 2 = 8',
          'Lalu: 3 · 0 = 0',
          'Jumlahkan: (4 3) · (2 0) = 8 + 0 = 8',
        ],
        simpul: 'Hasilnya 8. Sebuah angka, tanpa arah, jadi hasilnya bukan vektor.',
      },
      { jenis: 'sesi', judul: 'Tandanya menunjukkan sudutnya' },
      {
        jenis: 'poin',
        butir: [
          'Hasilnya positif - sudutnya lancip, kurang dari 90 derajat. Keduanya cenderung searah.',
          'Hasilnya nol - keduanya tegak lurus, tepat 90 derajat.',
          'Hasilnya negatif - sudutnya tumpul, lebih dari 90 derajat. Keduanya cenderung berlawanan.',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Membuktikan (3 4) tegak lurus dengan (-4 3)',
        baris: [
          'Mendatar: 3 · (-4) = -12',
          'Tegak: 4 · 3 = 12',
          'Jumlahkan: (3 4) · (-4 3) = -12 + 12 = 0',
        ],
        simpul: 'Nol, jadi keduanya tegak lurus. Tidak perlu busur, tidak perlu menggambar.',
      },
      {
        jenis: 'coba',
        teks: 'Putar salah satu panah di alatnya melewati sudut siku-siku.',
        langkah: [
          'Putar salah satu panah perlahan menjauhi panah yang lain. Apa yang terjadi pada angkanya?',
          'Berhenti tepat saat keduanya tegak lurus. Berapa angkanya?',
          'Teruskan memutarnya. Apa yang terjadi pada tanda angkanya?',
          'Kapan angkanya positif, kapan nol, kapan negatif? Apa hubungannya dengan sudut antara kedua panah?',
        ],
      },
      {
        jenis: 'paragraf',
        teks: 'Kegunaan yang paling sering dipakai adalah mencari sudut: susun ulang rumus keduanya, sehingga cos θ = (a · b)/(|a| |b|): hasil kali titik dibagi hasil kali kedua panjangnya.',
      },
    ],
    seringKeliru: {
      judul: 'Mengira hasilnya sebuah vektor',
      isi: 'Kedua yang dikalikan memang vektor, jadi hasilnya sering ikut ditulis sebagai pasangan angka atau diberi tanda panah. Padahal hasil kali titik selalu berupa satu bilangan biasa. Ciri cepat untuk memeriksa: kalau jawaban Anda masih punya arah, pasti ada yang keliru.',
    },
    intisari: [
      'Perkalian titik menghasilkan sebuah angka, bukan vektor.',
      'Lewat komponen: kalikan yang sejenis lalu jumlahkan.',
      'Lewat panjang dan sudut: a · b = |a| |b| cos θ.',
      'Tandanya menunjukkan lancip, siku-siku, atau tumpul. Nol berarti tegak lurus.',
    ],
    widget: 'perkalian-titik',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 12,
    slug: 'proyeksi',
    judul: 'Bayangan satu panah pada panah lain',
    labelPendek: 'Proyeksi',
    pertanyaan: 'Berapa bagian dari panah ini yang benar-benar searah?',
    penjelasan: [
      {
        jenis: 'sorot',
        teks: 'Sama seperti Materi 11, bagian ini di luar bab wajib Kelas 10 dan ditujukan untuk persiapan UTBK.',
      },
      {
        jenis: 'paragraf',
        teks: 'Bayangkan matahari tepat di atas sebuah tongkat miring. Bayangan tongkat di tanah lebih pendek daripada tongkatnya. Panjang bayangan itulah yang disebut proyeksi, dan pada vektor idenya persis sama.',
      },
      {
        jenis: 'paragraf',
        teks: 'Proyeksi a pada b menjawab pertanyaan: dari vektor a, seberapa banyak yang benar-benar menuju arah b?',
      },
      { jenis: 'sesi', judul: 'Dua jawaban berbeda untuk satu pertanyaan' },
      {
        jenis: 'poin',
        butir: [
          'Panjang proyeksi - sebuah ANGKA: (a · b)/|b|, hasil kali titik dibagi panjang b.',
          'Vektor proyeksi - sebuah PANAH, lengkap dengan arahnya: ((a · b)/|b|²) b, hasil kali titik dibagi kuadrat panjang b, lalu dikalikan b.',
        ],
      },
      {
        jenis: 'paragraf',
        teks: 'Keduanya sama-sama disebut proyeksi di soal, jadi bacalah pertanyaannya baik-baik. Yang diminta angkanya atau panahnya?',
      },
      {
        jenis: 'contoh',
        judul: 'Proyeksi a = (4 3) pada b = (2 0)',
        baris: [
          'Hasil kali titiknya: a · b = 4 · 2 + 3 · 0 = 8',
          'Panjang b: |b| = √(4 + 0) = 2',
          'Panjang proyeksinya: (a · b)/|b| = 8/2 = 4',
          'Vektor proyeksinya: ((a · b)/|b|²) b = (8/4)(2 0) = (4 0)',
        ],
        simpul: 'Vektor a sepanjang 5, tetapi bayangannya pada b cuma 4. Selalu lebih pendek, kecuali kalau keduanya sudah searah.',
      },
      {
        jenis: 'coba',
        teks: 'Putar panah biru di alatnya, perlahan.',
        langkah: [
          'Putar panah biru mendekati panah merah. Apa yang terjadi pada panjang bayangannya?',
          'Buat keduanya tegak lurus. Apa yang terjadi pada bayangannya?',
          'Teruskan sampai melewatinya. Di sisi mana bayangannya muncul, dan bagaimana tanda panjangnya?',
          'Panjang bayangan yang negatif itu memberi tahu apa tentang arah a terhadap b?',
        ],
      },
      {
        jenis: 'paragraf',
        teks: 'Panjang proyeksi yang negatif bukan kesalahan hitung. Tanda minusnya memberi tahu bahwa bayangannya jatuh berlawanan arah dengan b, dan itu keterangan yang berguna. Kalau yang diminta jaraknya saja, barulah tanda minusnya dibuang.',
      },
    ],
    seringKeliru: {
      judul: 'Tertukar antara proyeksi pada b dan proyeksi pada a',
      isi: 'Proyeksi a pada b dan proyeksi b pada a adalah dua hal yang berbeda, dan angkanya hampir selalu berbeda. Pembaginya yang menentukan: kalau diproyeksikan PADA b, yang jadi pembagi adalah panjang b. Kalimat "proyeksi a pada b" dibaca sebagai bayangan a yang jatuh di atas b, jadi b yang berperan sebagai lantainya.',
    },
    intisari: [
      'Proyeksi menjawab seberapa banyak dari a yang menuju arah b.',
      'Panjang proyeksi adalah angka: hasil kali titik dibagi panjang b.',
      'Vektor proyeksi adalah panah, arahnya mengikuti b.',
      'Panjang proyeksi boleh negatif, artinya bayangannya jatuh berlawanan arah dengan b.',
    ],
    widget: 'proyeksi',
    siap: true,
  },
]
