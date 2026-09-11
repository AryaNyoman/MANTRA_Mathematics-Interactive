/**
 * Statistika, tahap 1 sampai 4: menyajikan dan membaca data.
 *
 * Rancangannya: docs/superpowers/specs/2026-09-01-statistika-alur-belajar.md
 *
 * SUMBER MATERI
 * Buku Panduan Guru Matematika untuk SMA/SMK Kelas X, Dicky Susanto dkk,
 * Kemendikbudristek 2021, Bab 7 Statistika, halaman 203 sampai 246. Subbab A
 * (Histogram) dan subbab B (Frekuensi Relatif). Urutan konsepnya mengikuti
 * buku; contoh, angka, dan kalimatnya ditulis sendiri.
 *
 * SELURUH ANGKA DI BERKAS INI BERASAL DARI `content/statistika/data.json`
 * dan sudah diperiksa mesin dua kali: `python alat/cek_statistik.py` untuk
 * angka yang tertulis, dan `node alat/cek_statistik_web.mjs` untuk memastikan
 * hitungan widget memberi angka yang sama. Kalau datanya diubah, jalankan
 * keduanya lagi sebelum menyatakan selesai.
 */

import type { Tahap } from '@/content/tipe'
import type { WidgetStatistika } from '@/content/statistika/widget'

type TahapStatistika = Omit<Tahap, 'widget'> & { widget?: WidgetStatistika }

export const TAHAP_PENYAJIAN: TahapStatistika[] = [
  /* ================================================================= */
  {
    no: 1,
    slug: 'satu-angka-menipu',
    judul: 'Kenapa satu angka bisa menipu',
    labelPendek: 'Kenapa',
    pertanyaan: 'Dua kelas rata-ratanya sama persis. Apakah keduanya sama saja?',
    intisari: [
      'Meringkas data jadi satu angka selalu membuang sesuatu.',
      'Dua kelompok bisa punya mean, median, dan modus yang sama persis tetapi isinya jauh berbeda.',
      'Yang membedakan keduanya adalah SEBARAN, seberapa jauh datanya berpencar.',
      'Karena itu statistika butuh dua jenis ukuran sekaligus: ukuran pemusatan dan ukuran penyebaran.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Dua kelas baru saja ulangan. Wali kelas melaporkan rata-ratanya: Kelas A 7, Kelas B juga 7. Kepala sekolah mengangguk, keduanya dianggap sama saja.' },
      { jenis: 'paragraf', teks: 'Sekarang lihat nilai aslinya.' },
      {
        jenis: 'contoh',
        judul: 'Nilai kedelapan siswa di tiap kelas',
        baris: [
          'Kelas A    6  6  7  7  7  7  8  8',
          'Kelas B    3  4  5  7  7  9  10  11',
          '',
          'rata-rata  keduanya 7',
          'median     keduanya 7',
          'modus      keduanya 7',
        ],
        simpul: 'Ketiga ukuran pemusatan yang biasa dipakai memberi jawaban yang sama persis. Rata-rata adalah jumlah dibagi banyaknya, median adalah nilai yang di tengah setelah diurutkan, modus adalah nilai yang paling sering muncul; ketiganya dibongkar tuntas di Materi 05. Padahal isi kedua kelas itu berbeda jauh.',
      },
      { jenis: 'sorot', teks: 'Di Kelas A tidak ada yang tertinggal jauh. Di Kelas B ada yang dapat 3, dan ada yang dapat 11. Kalau Anda guru, kedua kelas itu butuh perlakuan yang sama sekali berbeda.' },

      { jenis: 'sesi', judul: 'Yang hilang saat data diringkas' },
      { jenis: 'paragraf', teks: 'Meringkas delapan angka menjadi satu angka berarti membuang tujuh angka. Itu bukan kesalahan, itu memang gunanya meringkas. Masalahnya muncul kalau kita lupa bahwa ada yang dibuang.' },
      {
        jenis: 'poin',
        judul: 'Dua pertanyaan yang harus dijawab bersama',
        butir: [
          'Di mana pusatnya - angka berapa yang mewakili "biasanya segitu"?',
          'Seberapa lebar sebarannya - apakah datanya berkumpul rapat atau berpencar jauh?',
        ],
      },
      { jenis: 'paragraf', teks: 'Menjawab yang pertama saja, seperti yang dilakukan wali kelas tadi, membuat dua keadaan yang sangat berbeda terlihat identik. Sepanjang topik ini kita membangun alat untuk keduanya.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menampilkan kedua kelas sebagai titik di garis bilangan.',
        langkah: [
          'Seret titik di Kelas B menjauh ke kiri atau ke kanan.',
          'Perhatikan rata-ratanya sering tidak berubah banyak, tetapi jangkauannya melompat.',
          'Tekan "samakan rata-ratanya" untuk membuktikan bentuk data bisa diobrak-abrik sambil rata-ratanya dipertahankan tetap 7.',
        ],
      },

      { jenis: 'sesi', judul: 'Angka pertama untuk sebaran' },
      { jenis: 'paragraf', teks: 'Ukuran sebaran yang paling sederhana adalah jangkauan, yaitu nilai terbesar dikurangi nilai terkecil.' },
      {
        jenis: 'contoh',
        judul: 'Jangkauan kedua kelas',
        baris: [
          'Kelas A    8 - 6  = 2',
          'Kelas B    11 - 3 = 8',
        ],
        simpul: 'Sekarang kedua kelas itu akhirnya terlihat berbeda: 2 lawan 8.',
      },
      { jenis: 'paragraf', teks: 'Jangkauan sudah lumayan, tetapi ia cuma melihat dua data, yang paling kecil dan yang paling besar, lalu mengabaikan semua yang di tengah. Di Materi 07 dan Materi 08 kita akan bertemu ukuran sebaran yang lebih jujur, yaitu jangkauan antar kuartil dan simpangan baku. Sebagai bocoran, simpangan baku Kelas A adalah 0,71 sedangkan Kelas B 2,69.' },
    ],
    seringKeliru: {
      judul: 'Rata-rata sama, jadi datanya mirip',
      isi: 'Ini kesimpulan yang paling sering diambil, dan paling sering salah. Rata-rata hanya memberi tahu di mana pusatnya, sama sekali tidak memberi tahu seberapa jauh data berpencar dari pusat itu. Kelas A dan Kelas B di atas rata-ratanya sama, mediannya sama, modusnya juga sama, tetapi jangkauannya 2 lawan 8. Setiap kali Anda mendengar sebuah rata-rata, pertanyaan berikutnya selalu: sebarannya berapa?',
    },
    widget: 'dua-kelompok',
    video: { berkas: 'statistika1-menipu.mp4', poster: 'statistika1-menipu.jpg' },
    siap: true,
  },

  /* ================================================================= */
  {
    no: 2,
    slug: 'bentuk-data',
    judul: 'Dari daftar angka jadi gambar',
    labelPendek: 'Bentuk',
    pertanyaan: 'Kapan pakai diagram batang, kapan histogram?',
    intisari: [
      'Data kategori dan data angka butuh gambar yang berbeda.',
      'Diagram batang untuk kategori: batangnya renggang, urutannya boleh ditukar.',
      'Histogram untuk data angka yang dikelompokkan: batangnya rapat, urutannya tidak boleh ditukar.',
      'Line plot menampilkan setiap data apa adanya, tidak ada yang disembunyikan.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Empat puluh angka yang berbaris di dalam tabel hampir tidak bisa dibaca manusia. Mata kita jauh lebih cepat menangkap panjang dan tinggi daripada menangkap deretan angka. Itu sebabnya data digambar.' },
      { jenis: 'paragraf', teks: 'Tetapi tidak semua gambar cocok untuk semua data. Yang menentukan bukan selera, melainkan jenis datanya.' },
      {
        jenis: 'poin',
        judul: 'Dua jenis data',
        butir: [
          'Data kategori - jawabannya berupa nama, bukan angka. Contohnya cara berangkat ke sekolah: jalan kaki, sepeda, sepeda motor, angkot, diantar. Tidak ada yang namanya "setengah angkot", dan tidak ada urutan alaminya.',
          'Data angka - jawabannya berupa bilangan yang bisa diukur dan diurutkan. Contohnya tinggi badan, nilai ulangan, waktu tempuh.',
        ],
      },

      { jenis: 'sesi', judul: 'Diagram batang, untuk kategori' },
      { jenis: 'paragraf', teks: 'Pada diagram batang, tiap batang mewakili satu kategori dan tingginya menunjukkan banyaknya. Antar batang diberi sela, dan sela itu bukan hiasan: ia menandakan bahwa kategori sebelah menyebelah tidak menyambung. Karena itu pula urutan batangnya boleh ditukar tanpa mengubah arti.' },
      {
        jenis: 'contoh',
        judul: 'Cara 40 siswa berangkat ke sekolah',
        baris: [
          'Jalan kaki      8 siswa    20%',
          'Sepeda          6 siswa    15%',
          'Sepeda motor   12 siswa    30%',
          'Angkot          5 siswa    12,5%',
          'Diantar         9 siswa    22,5%',
          '',
          'jumlah         40 siswa    100%',
        ],
        simpul: 'Angka buatan untuk latihan. Persentase dihitung dari 40, misalnya 8 dibagi 40 sama dengan 0,2 atau 20 persen.',
      },

      { jenis: 'sesi', judul: 'Histogram, untuk data angka' },
      { jenis: 'paragraf', teks: 'Histogram terlihat mirip diagram batang, dan justru itu yang membuatnya sering tertukar. Bedanya mendasar, bukan sekadar gaya gambar.' },
      {
        jenis: 'poin',
        judul: 'Tiga beda yang menentukan',
        butir: [
          'Sumbu mendatarnya garis bilangan - jadi urutan batangnya TIDAK boleh ditukar.',
          'Batangnya menempel tanpa sela - sebab kelas yang bersebelahan memang bersambung, misalnya 150 sampai 160 lalu 160 sampai 170.',
          'Yang dibaca sebenarnya LUAS batang, bukan tingginya. Ini penting saat lebar kelasnya tidak sama, dan akan kita pakai di materi berikutnya.',
        ],
      },

      { jenis: 'sesi', judul: 'Line plot (diagram titik), gambar yang paling jujur' },
      { jenis: 'paragraf', teks: 'Untuk data yang sedikit, ada gambar yang tidak menyembunyikan apa pun: line plot, dalam bahasa Indonesia diagram titik, dan di buku lain kadang disebut dot plot. Setiap data digambar sebagai satu titik di atas garis bilangan. Nilai yang muncul dua kali membuat dua titik bertumpuk ke atas.' },
      { jenis: 'paragraf', teks: 'Kelebihannya besar: modus terlihat sebagai tumpukan tertinggi, median bisa dihitung dengan menghitung titik dari kiri, dan pencilan langsung terlihat sebagai titik yang terpencil sendirian. Kekurangannya juga nyata, yaitu jadi berantakan kalau datanya ratusan. Kita akan sering memakainya di Materi 05 sampai Materi 07.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menampilkan satu kumpulan data dalam empat bentuk gambar.',
        langkah: [
          'Tekan bergantian: line plot, diagram batang, histogram, diagram lingkaran.',
          'Perhatikan tampilan yang tidak cocok dengan jenis datanya diberi tanda peringatan, bukan disembunyikan.',
          'Bacalah peringatannya, sebab di situ letak pelajarannya.',
        ],
      },

      { jenis: 'sesi', judul: 'Diagram lingkaran, dan kenapa harus hati-hati' },
      { jenis: 'paragraf', teks: 'Diagram lingkaran menjawab satu pertanyaan saja dengan baik: berapa bagian tiap kategori dari keseluruhan. Ia gagal untuk hal lain, sebab mata manusia buruk sekali membandingkan luas juring yang mirip.' },
      { jenis: 'paragraf', teks: 'Coba tebak mana yang lebih besar antara 22,5 persen dan 20 persen hanya dengan melihat dua juring tanpa angka. Hampir mustahil. Itu sebabnya tiap potongan di alatnya selalu diberi label angkanya, dan itu bukan hiasan melainkan syarat supaya gambarnya bisa dibaca.' },
    ],
    seringKeliru: {
      judul: 'Diagram batang dan histogram itu sama, cuma beda nama',
      isi: 'Keduanya memang sama-sama batang, tetapi menjawab jenis data yang berbeda. Ujinya begini: coba tukar posisi dua batang yang bersebelahan. Kalau artinya tidak berubah, itu diagram batang, sebab kategori tidak punya urutan. Kalau artinya jadi kacau, itu histogram, sebab sumbunya garis bilangan dan angka 160 tidak bisa dipindah ke sebelah kanan angka 170.',
      sumber: 'Pembahasannya mengikuti Buku Panduan Guru Matematika SMA/SMK Kelas X, Kemendikbudristek 2021, subbab A halaman 211.',
    },
    widget: 'bentuk-data',
    video: { berkas: 'statistika2-bentuk.mp4', poster: 'statistika2-bentuk.jpg' },
    siap: true,
  },

  /* ================================================================= */
  {
    no: 3,
    slug: 'lebar-kelas',
    judul: 'Lebar kelas mengubah cerita',
    labelPendek: 'Lebar kelas',
    pertanyaan: 'Dari data yang sama persis, kenapa bisa lahir dua histogram yang bentuknya berbeda?',
    intisari: [
      'Lebar kelas itu pilihan manusia, bukan hasil rumus. Tidak ada satu histogram yang "benar".',
      'Kelas terlalu sempit membuat data terlihat berantakan; terlalu lebar menghapus polanya.',
      'Saat dua kelas digabung, yang dipertahankan adalah LUAS batangnya, bukan tingginya.',
      'Karena itu histogram wajib dibaca lewat luas, bukan lewat tinggi saja.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Empat puluh siswa diukur tinggi badannya. Angka terkecil 152 cm, terbesar 180 cm, rata-ratanya 166,1 cm. Data yang sama ini akan kita gambar berkali-kali, dan tiap kali hasilnya bisa bercerita lain.' },
      { jenis: 'paragraf', teks: 'Untuk membuat histogram, tinggi badan harus dikelompokkan lebih dulu. Nah, selebar apa satu kelompok? Lima sentimeter? Sepuluh? Dua? Tidak ada rumus yang mewajibkan salah satunya.' },
      { jenis: 'sorot', teks: 'Data tidak berubah sedikit pun. Yang berubah cuma cara mengelompokkannya. Tetapi bentuk gambarnya, dan kesimpulan yang diambil orang darinya, bisa berbeda jauh.' },

      {
        jenis: 'coba',
        teks: 'Geser penggeser lebar kelas di alatnya, dari 1 sampai 10.',
        langkah: [
          'Pada lebar 1, hampir tiap batang cuma berisi satu atau dua siswa. Gambarnya bergerigi dan polanya tenggelam.',
          'Pada lebar 4 atau 5, terlihat kumpulan siswa menumpuk di sekitar 160 sampai 170.',
          'Pada lebar 10, seluruh data cuma jadi empat batang, dan yang paling kanan cuma berisi satu siswa. Rapi, tetapi tumpukan di sekitar 160 sampai 170 sudah tidak terlihat lagi.',
          'Perhatikan tabel frekuensi di sebelahnya ikut berubah, sebab tabel dan histogram itu benda yang sama dalam dua bentuk.',
        ],
      },

      { jenis: 'sesi', judul: 'Aturan luas, kunci yang sering dilewati' },
      { jenis: 'paragraf', teks: 'Kalau dua kelas yang bersebelahan digabung menjadi satu kelas yang lebih lebar, apa yang terjadi pada tingginya? Jawaban cepat yang salah: tingginya dijumlah. Jawaban yang benar: luasnya yang dijumlah.' },
      {
        jenis: 'contoh',
        judul: 'Menggabung dua kelas',
        baris: [
          'kelas 8 sampai 10    lebar 2   tinggi 12   luas 2 × 12 = 24',
          'kelas 10 sampai 12   lebar 2   tinggi  4   luas 2 ×  4 =  8',
          '                                        luas gabungan = 32',
          '',
          'kelas 8 sampai 12    lebar 4   tinggi  8   luas 4 ×  8 = 32',
        ],
        simpul: 'Tinggi gabungannya 8, bukan 16. Yang dipertahankan luasnya, sebab luas itulah yang mewakili banyaknya data.',
      },
      { jenis: 'paragraf', teks: 'Contoh perhitungan ini diambil dari buku panduan guru Kelas X. Selama lebar semua kelas sama, membaca tinggi saja aman, dan itu sebabnya di sekolah aturan luas sering tidak terasa. Begitu ada satu kelas yang lebih lebar dari yang lain, membaca tinggi langsung menyesatkan.' },

      { jenis: 'sesi', judul: 'Jadi lebar berapa yang dipilih?' },
      {
        jenis: 'poin',
        judul: 'Yang biasa dipakai',
        butir: [
          'Banyak kelas biasanya antara 5 sampai 15. Kurang dari itu polanya hilang, lebih dari itu gambarnya bergerigi.',
          'Batas kelas dipilih yang enak dibaca, misalnya kelipatan 5 atau 10, bukan angka seperti 151,7.',
          'Kalau ragu, coba beberapa lebar lalu bandingkan. Itu bukan kecurangan, itu cara kerja yang wajar.',
        ],
      },
      { jenis: 'paragraf', teks: 'Ada juga aturan praktis yang sering diajarkan, yaitu aturan Sturges, yang memberi saran banyak kelas berdasarkan banyak data. Perlakukan ia sebagai saran awal, bukan sebagai kebenaran. Aturan itu tidak tahu apa-apa tentang data Anda.' },
    ],
    seringKeliru: {
      judul: 'Banyak kelas sudah ditentukan rumus, jadi cuma ada satu histogram yang benar',
      isi: 'Tidak. Rumus seperti aturan Sturges memberi saran, bukan keharusan, dan buku pun menunjukkan dua histogram berbeda yang lahir dari sumber data yang sama. Yang benar-benar salah bukan memilih lebar yang berbeda, melainkan memilih lebar tertentu supaya kesimpulan yang diinginkan muncul, lalu menyembunyikan bahwa pilihan itu pernah dibuat. Kita bahas lagi di Materi 13.',
      sumber: 'Perhitungan luas gabungan kelas mengikuti Buku Panduan Guru Matematika SMA/SMK Kelas X, Kemendikbudristek 2021, halaman 211.',
    },
    widget: 'lebar-kelas',
    video: { berkas: 'statistika3-lebar-kelas.mp4', poster: 'statistika3-lebar-kelas.jpg' },
    siap: true,
  },

  /* ================================================================= */
  {
    no: 4,
    slug: 'frekuensi-relatif',
    judul: 'Membandingkan dua kelompok yang jumlahnya beda',
    labelPendek: 'Frekuensi relatif',
    pertanyaan: 'Kelas A 25 siswa, Kelas B 40 siswa. Kelas mana yang lebih banyak siswanya bernilai 80 ke atas?',
    intisari: [
      'Membandingkan frekuensi mentah antar kelompok berbeda ukuran hampir selalu menyesatkan.',
      'Frekuensi relatif adalah frekuensi dibagi banyak data, jadi takarannya disamakan.',
      'Bentuknya boleh pecahan desimal atau persen; keduanya angka yang sama.',
      'Jumlah seluruh frekuensi relatif selalu 1, atau 100 persen.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Pertanyaan di atas terlihat sederhana. Hitung saja siapa yang lebih banyak.' },
      {
        jenis: 'contoh',
        judul: 'Hitungan mentah',
        baris: [
          'Kelas A    11 siswa bernilai 80 ke atas    dari 25 siswa',
          'Kelas B    13 siswa bernilai 80 ke atas    dari 40 siswa',
        ],
        simpul: 'Tiga belas lebih banyak daripada sebelas. Jadi Kelas B menang. Begitu?',
      },
      { jenis: 'paragraf', teks: 'Sekarang bagi dengan banyak siswanya masing-masing.' },
      {
        jenis: 'contoh',
        judul: 'Hitungan yang takarannya disamakan',
        baris: [
          'Kelas A    11 : 25 = 0,44    yaitu 44%',
          'Kelas B    13 : 40 = 0,325   yaitu 32,5%',
        ],
        simpul: 'Kesimpulannya berbalik. Di Kelas A hampir separuh siswa bernilai 80 ke atas, di Kelas B cuma sekitar sepertiga.',
      },
      { jenis: 'sorot', teks: 'Kedua hitungan itu sama-sama benar sebagai hitungan. Yang berbeda adalah pertanyaan yang dijawabnya. Kalau yang ditanya "kelas mana yang lebih berhasil", membandingkan jumlah mentah dari kelompok berbeda ukuran adalah jawaban yang salah.' },

      { jenis: 'sesi', judul: 'Frekuensi relatif' },
      { jenis: 'paragraf', teks: 'Frekuensi relatif adalah frekuensi dibagi banyak seluruh data. Karena selalu dibagi dengan jumlah kelompoknya sendiri, angkanya jadi bisa diadu antar kelompok berbeda ukuran.' },
      {
        jenis: 'poin',
        judul: 'Tiga hal yang selalu berlaku',
        butir: [
          'Nilainya selalu antara 0 dan 1, atau antara 0 persen dan 100 persen.',
          'Jumlah seluruh frekuensi relatif dalam satu kelompok selalu tepat 1, atau 100 persen. Kalau tidak, ada yang salah hitung.',
          'Bentuk desimal dan bentuk persen itu angka yang sama: 0,3 dan 30 persen tidak berbeda.',
        ],
      },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menampilkan kedua kelas berdampingan.',
        langkah: [
          'Mulai dengan tampilan frekuensi asli. Kelas B terlihat menang hampir di semua kelompok nilai, dan memang wajar, siswanya lebih banyak.',
          'Tekan tombol untuk beralih ke frekuensi relatif.',
          'Perhatikan kesimpulan di bawah gambar ikut berubah. Itu bukan kesalahan alatnya, itu memang intinya.',
        ],
      },

      { jenis: 'sesi', judul: 'Di mana ini muncul di kehidupan nyata' },
      {
        jenis: 'poin',
        judul: 'Perbandingan yang menuntut frekuensi relatif',
        butir: [
          'Jumlah kelulusan dua sekolah yang jumlah siswanya jauh berbeda.',
          'Jumlah kecelakaan di dua kota yang jumlah penduduknya jauh berbeda.',
          'Jumlah penjualan dua toko yang jam bukanya berbeda.',
        ],
      },
      { jenis: 'paragraf', teks: 'Dalam ketiga contoh itu, angka mentah selalu memenangkan yang lebih besar. Itu sebabnya berita yang menyebut jumlah kejadian tanpa menyebut dari berapa hampir selalu perlu dipertanyakan.' },
    ],
    seringKeliru: {
      judul: 'Kelompok yang batangnya lebih tinggi pasti lebih banyak',
      isi: 'Lebih banyak dalam jumlah orang, ya. Lebih banyak dalam arti "lebih sering terjadi di kelompok itu", belum tentu. Sebelum membandingkan dua batang dari kelompok berbeda, periksa dulu apakah kedua kelompok itu sama besarnya. Kalau tidak sama, ubah dulu jadi frekuensi relatif.',
      sumber: 'Gagasan membandingkan dua kelompok berbeda ukuran mengikuti Buku Panduan Guru Matematika SMA/SMK Kelas X, Kemendikbudristek 2021, subbab B halaman 204.',
    },
    widget: 'frekuensi-relatif',
    video: { berkas: 'statistika4-relatif.mp4', poster: 'statistika4-relatif.jpg' },
    siap: true,
  },
]
