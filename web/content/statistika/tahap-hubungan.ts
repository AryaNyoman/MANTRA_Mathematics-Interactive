/**
 * Statistika, tahap 10 sampai 13: hubungan dua data, dan membaca dengan kritis.
 *
 * SUMBER MATERI
 * Tahap 10 sampai 12 mengikuti Buku Panduan Guru Matematika untuk SMA/SMK
 * Kelas XI, Dicky Susanto dkk, Kemendikbudristek 2021, Bab 3 Statistika,
 * halaman 137 sampai 177. Subbab A (diagram pencar), B (regresi linear),
 * C (korelasi product moment dan koefisien determinasi).
 *
 * NOTASI GARIS REGRESI mengikuti buku itu, yang menulis persamaannya sebagai
 * y-topi = a + bx, dengan a perpotongan dan b kemiringan. Contohnya ada di
 * halaman 161: y-topi = 367000 + 16000x. Buku yang sama juga mencatat bahwa
 * tertukarnya a dan b saat substitusi adalah kesalahan yang sering terjadi
 * (halaman 168), jadi keduanya di sini selalu disebut namanya, bukan hurufnya
 * saja.
 *
 * Tahap 13 di luar kurikulum, atas permintaan file tugas MANTRA-STATISTIKA.
 *
 * SELURUH ANGKA berasal dari `content/statistika/data.json` dan sudah diperiksa
 * mesin lewat `alat/cek_statistik.py` dan `alat/cek_statistik_web.mjs`.
 */

import type { Tahap } from '@/content/tipe'
import type { WidgetStatistika } from '@/content/statistika/widget'

type TahapStatistika = Omit<Tahap, 'widget'> & { widget?: WidgetStatistika }

export const TAHAP_HUBUNGAN: TahapStatistika[] = [
  /* ================================================================= */
  {
    no: 10,
    slug: 'diagram-pencar',
    judul: 'Diagram pencar dan arah hubungan',
    labelPendek: 'Diagram pencar',
    pertanyaan: 'Apakah lama belajar berhubungan dengan nilai ujian?',
    intisari: [
      'Data bivariat: satu orang atau satu benda dicatat dua angkanya sekaligus.',
      'Tiap pasangan digambar sebagai satu titik, jadi sepuluh siswa menghasilkan sepuluh titik.',
      'Yang dibaca ada tiga: arah hubungan, bentuknya, dan kekuatannya.',
      'Sumbu-x untuk yang dianggap penyebab, sumbu-y untuk yang dianggap akibat.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Sampai Materi 09, semua data kita cuma punya satu angka per orang: satu nilai, satu tinggi badan, satu waktu tempuh. Sekarang tiap siswa dicatat dua angkanya sekaligus.' },
      {
        jenis: 'contoh',
        judul: 'Jam belajar seminggu dan nilai ujian, 10 siswa',
        baris: [
          'jam belajar   2   3   4   5   6   7   8   9  10  11',
          'nilai        55  58  64  63  70  72  75  80  78  85',
        ],
        simpul: 'Angka buatan untuk latihan, bukan hasil penelitian sungguhan.',
      },
      { jenis: 'paragraf', teks: 'Data berpasangan seperti ini disebut data bivariat. Cara membacanya bukan dengan menatap tabelnya, melainkan dengan menggambarnya: tiap pasangan jadi satu titik pada bidang koordinat.' },

      { jenis: 'sesi', judul: 'Sumbu mana untuk yang mana' },
      { jenis: 'paragraf', teks: 'Kesepakatannya: yang dianggap penyebab, atau yang bisa kita atur, diletakkan di sumbu-x. Yang dianggap akibat, atau yang ingin kita ramalkan, diletakkan di sumbu-y.' },
      { jenis: 'paragraf', teks: 'Di sini lama belajar ada di sumbu-x dan nilai ujian di sumbu-y, sebab kita ingin menebak nilai dari lama belajar, bukan sebaliknya. Menukar keduanya bukan cuma memutar gambar: garis yang nanti kita tarik di Materi 11 akan berbeda, dan tafsirannya juga berbeda.' },

      { jenis: 'sesi', judul: 'Tiga hal yang dibaca dari sebaran titik' },
      {
        jenis: 'poin',
        judul: 'Arah',
        butir: [
          'Naik - makin ke kanan makin ke atas. Disebut korelasi positif.',
          'Turun - makin ke kanan makin ke bawah. Disebut korelasi negatif.',
          'Tidak ada arah - titiknya berserakan tanpa kecenderungan.',
        ],
      },
      {
        jenis: 'poin',
        judul: 'Bentuk',
        butir: [
          'Lurus - titiknya menyusuri sebuah garis. Ini yang bisa ditangani garis regresi di Materi 11.',
          'Melengkung - titiknya menyusuri kurva, misalnya naik lalu turun. Memaksakan garis lurus pada data seperti ini akan menghasilkan kesimpulan yang salah.',
        ],
      },
      {
        jenis: 'poin',
        judul: 'Kekuatan',
        butir: [
          'Kuat - titiknya menempel rapat pada pola.',
          'Lemah - polanya masih terasa, tetapi titiknya berpencar jauh dari pola itu.',
        ],
      },
      { jenis: 'paragraf', teks: 'Pada data kita, arahnya naik, bentuknya mendekati lurus, dan titiknya cukup rapat. Perhatikan satu hal: kenaikannya tidak mulus. Siswa yang belajar 5 jam justru bernilai 63, lebih rendah daripada yang belajar 4 jam. Itu wajar, dan itulah sebabnya kita bicara kecenderungan, bukan aturan.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya membiarkan Anda menyeret titiknya sendiri.',
        langkah: [
          'Tekan tombol contoh siap pakai: naik, turun, tidak berhubungan, melengkung.',
          'Perhatikan keterangan arah dan bentuk di bawah gambar pada tiap contoh.',
          'Seret satu titik jauh ke atas. Apa yang terjadi pada keterangannya?',
          'Seberapa besar pengaruh satu titik saja terhadap kesan keseluruhan? Apakah sama besar untuk data yang banyak dan yang sedikit?',
        ],
      },

      { jenis: 'sesi', judul: 'Peringatan yang harus dibawa sejak sekarang' },
      { jenis: 'paragraf', teks: 'Titik yang naik bersama-sama menunjukkan bahwa keduanya BERGERAK BERSAMA. Itu saja. Ia tidak membuktikan bahwa yang satu menyebabkan yang lain. Bahasan lengkapnya ada di Materi 12, dan itu bagian paling penting dari seluruh topik ini.' },
    ],
    seringKeliru: {
      judul: 'Menukar tempat x dan y saat meletakkan titik',
      isi: 'Kesalahan ini sering terjadi saat memindahkan angka dari tabel ke gambar, apalagi kalau tabelnya tersusun mendatar. Akibatnya pola datanya rusak, dan kesimpulan yang diambil ikut salah tanpa ada tanda peringatan apa pun. Periksa ulang satu titik saja sebagai contoh sebelum melanjutkan: siswa yang belajar 2 jam bernilai 55, jadi titiknya harus berada di 2 pada sumbu-x dan 55 pada sumbu-y.',
      sumber: 'Kotak peringatan untuk guru di Buku Panduan Guru Matematika SMA/SMK Kelas XI, Kemendikbudristek 2021, halaman 143, menyebut persis kesalahan ini beserta pemaksaan trend lurus pada data yang melengkung.',
    },
    widget: 'diagram-pencar',
    video: { berkas: 'statistika10-pencar.mp4', poster: 'statistika10-pencar.jpg' },
    siap: true,
  },

  /* ================================================================= */
  {
    no: 11,
    slug: 'garis-regresi',
    judul: 'Garis regresi dan sisa jaraknya',
    labelPendek: 'Garis regresi',
    pertanyaan: 'Kalau sepuluh orang menarik garis "yang paling pas" pada titik yang sama, garis siapa yang benar?',
    intisari: [
      'Residu adalah jarak tegak dari sebuah titik ke garis.',
      'Garis terbaik adalah yang jumlah kuadrat residunya paling kecil. Itulah metode kuadrat terkecil.',
      'Persamaannya ditulis y-topi = a + bx, dengan b kemiringan dan a perpotongan.',
      'Meramal di dalam rentang data itu interpolasi dan relatif aman; di luar rentang itu ekstrapolasi dan berbahaya.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Setiap orang bisa menarik garis di antara titik-titik tadi, dan tiap orang akan menarik garis yang sedikit berbeda. Supaya ada jawaban, kita butuh ukuran untuk membandingkan dua garis.' },

      { jenis: 'sesi', judul: 'Residu, sisa jarak yang tidak tertangkap garis' },
      { jenis: 'paragraf', teks: 'Untuk sebuah titik, residu adalah selisih antara nilai sesungguhnya dan nilai yang diramalkan garis. Jaraknya diukur TEGAK, bukan tegak lurus terhadap garisnya, sebab yang ingin kita perkecil adalah kesalahan meramal nilai y.' },
      {
        jenis: 'poin',
        judul: 'Tanda residu',
        butir: [
          'Titik di ATAS garis punya residu positif, artinya garisnya menebak terlalu rendah.',
          'Titik di BAWAH garis punya residu negatif, artinya garisnya menebak terlalu tinggi.',
          'Titik yang tepat di garis punya residu nol.',
        ],
      },
      { jenis: 'paragraf', teks: 'Seperti pada simpangan di Materi 08, residu tidak bisa langsung dijumlah, sebab yang positif dan yang negatif saling menghapus. Jadi residunya dikuadratkan dulu, lalu dijumlahkan.' },
      { jenis: 'sorot', teks: 'Garis terbaik adalah garis yang membuat jumlah kuadrat residu sekecil mungkin. Itu yang disebut metode kuadrat terkecil, dan hanya ada satu garis yang memenuhinya.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya membiarkan Anda menarik garisnya sendiri.',
        langkah: [
          'Seret ujung garis sampai menurut Anda paling pas.',
          'Perhatikan ruas tegak dari tiap titik ke garis, yaitu residunya. Apa yang terjadi padanya saat garis digeser?',
          'Perhatikan angka jumlah kuadrat residu di bawah gambar, lalu coba perkecil terus.',
          'Kalau sudah menyerah, tekan "tunjukkan garis terbaik". Seberapa jauh garis Anda dari garis itu?',
        ],
      },

      { jenis: 'sesi', judul: 'Rumusnya, setelah gagasannya dipahami' },
      { jenis: 'paragraf', teks: 'Mencari garis terkecil itu dengan coba-coba tidak praktis. Untungnya ada rumus yang langsung memberikan jawabannya.' },
      {
        jenis: 'contoh',
        judul: 'Menghitung kemiringan dan perpotongan',
        baris: [
          'dikumpulkan dulu dari tabel:',
          'n = 10',
          'jumlah x = 65, jumlah y = 700',
          'jumlah x kali y = 4814, jumlah x² = 505',
          '',
          'kemiringan b, memakai keempat jumlah tadi:',
          'b = (n × 4814 - 65 × 700) : (n × 505 - 65²)',
          '   = (48140 - 45500) : (5050 - 4225)',
          '   = 2640 : 825',
          '   = 3,2',
          '',
          'perpotongan a, memakai b yang baru didapat:',
          'a = rata-rata y - b × rata-rata x',
          '   = 70 - 3,2 × 6,5',
          '   = 49,2',
        ],
        simpul: 'Jadi garis regresinya: y-topi = 49,2 + 3,2x',
      },
      { jenis: 'paragraf', teks: 'Tanda topi di atas y itu penting. Ia menandakan bahwa yang dihasilkan garis adalah nilai RAMALAN, bukan nilai sungguhan. Siswa yang belajar 5 jam diramalkan bernilai 65,2 padahal nilai aslinya 63, dan selisih itu adalah residunya.' },

      { jenis: 'sesi', judul: 'Membaca gradien dalam bahasa manusia' },
      { jenis: 'paragraf', teks: 'Angka 3,2 bukan sekadar kemiringan gambar. Ia punya arti: setiap tambahan satu jam belajar per minggu, nilai diramalkan naik sekitar 3,2 poin.' },
      { jenis: 'paragraf', teks: 'Angka 49,2 adalah nilai ramalan saat x sama dengan nol. Hati-hati di sini: data kita paling sedikit 2 jam, tidak ada satu pun siswa yang belajar 0 jam. Jadi 49,2 bukan hasil pengamatan, melainkan hasil menarik garis ke daerah yang tidak ada datanya sama sekali.' },

      { jenis: 'sesi', judul: 'Interpolasi aman, ekstrapolasi berbahaya' },
      {
        jenis: 'contoh',
        judul: 'Dua ramalan, satu masuk akal satu tidak',
        baris: [
          'x = 7 jam (di dalam rentang data 2 sampai 11)',
          '   ramalan = 49,2 + 3,2 × 7 = 71,6, masuk akal',
          '',
          'x = 40 jam (jauh di luar rentang data)',
          '   ramalan = 49,2 + 3,2 × 40 = 177,2, mustahil, nilai tertinggi 100',
        ],
        simpul: 'Garisnya tidak tahu bahwa nilai ujian tidak bisa lebih dari 100. Ia cuma garis, dan ia akan terus naik selamanya kalau diminta.',
      },
      {
        jenis: 'poin',
        judul: 'Kenapa ekstrapolasi sering salah',
        butir: [
          'Pola yang lurus di dalam rentang data belum tentu lurus di luarnya.',
          'Ada batas alami yang tidak diketahui garis: nilai maksimal 100, waktu tidak bisa negatif, tinggi badan tidak bisa 10 meter.',
          'Makin jauh dari data, makin besar kesalahannya, dan tidak ada tanda peringatan yang muncul sendiri.',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Meneruskan garis sejauh-jauhnya karena rumusnya tetap bisa dihitung',
      isi: 'Rumus selalu memberi jawaban, termasuk untuk pertanyaan yang tidak masuk akal. Garis di halaman ini dengan senang hati meramalkan nilai 177,2 untuk siswa yang belajar 40 jam seminggu. Sebelum memakai hasil ramalan, periksa dua hal: apakah nilai x nya masih dekat dengan rentang data aslinya, dan apakah jawabannya mungkin terjadi di dunia nyata. Kesalahan lain yang sering terjadi adalah menukar a dan b saat substitusi, jadi biasakan menyebut namanya: a perpotongan, b kemiringan.',
      sumber: 'Kedua kesalahan itu tercatat di kotak peringatan Buku Panduan Guru Matematika SMA/SMK Kelas XI, Kemendikbudristek 2021, halaman 168, termasuk contoh hasil ekstrapolasi yang mustahil.',
    },
    widget: 'garis-regresi',
    video: { berkas: 'statistika11-regresi.mp4', poster: 'statistika11-regresi.jpg' },
    siap: true,
  },

  /* ================================================================= */
  {
    no: 12,
    slug: 'korelasi',
    judul: 'Korelasi bukan sebab-akibat',
    labelPendek: 'Korelasi',
    pertanyaan: 'Angka hubungannya 0,98. Berarti yang satu menyebabkan yang lain, kan?',
    intisari: [
      'Koefisien korelasi r berada antara -1 dan 1: tandanya arah, besarnya kekuatan.',
      'Koefisien determinasi r kuadrat menyatakan bagian keragaman yang bisa dijelaskan garis.',
      'r hanya mengukur hubungan LURUS. Hubungan melengkung yang sempurna pun bisa memberi r nol.',
      'Korelasi sekuat apa pun tidak membuktikan sebab-akibat.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Di Materi 10 kita membaca kekuatan hubungan dengan mata: titiknya rapat atau berpencar. Sekarang kekuatan itu diberi angka.' },

      { jenis: 'sesi', judul: 'Koefisien korelasi r' },
      {
        jenis: 'poin',
        judul: 'Cara membacanya',
        butir: [
          'r = 1 - semua titik tepat pada satu garis yang naik.',
          'r = -1 - semua titik tepat pada satu garis yang turun.',
          'r = 0 - tidak ada kecenderungan lurus sama sekali.',
          'Tanda menunjukkan arah, besarnya menunjukkan kerapatan titik ke garis.',
        ],
      },
      { jenis: 'paragraf', teks: 'Pada data jam belajar dan nilai tadi, r = 0,98. Itu sangat kuat, dan memang wajar sebab datanya buatan untuk latihan. Data dari dunia nyata jarang serapi itu.' },

      { jenis: 'sesi', judul: 'Koefisien determinasi' },
      { jenis: 'paragraf', teks: 'Kuadratkan r, dan hasilnya punya arti yang lebih langsung bisa dipakai. Pada data kita r kuadrat sama dengan 0,97, artinya sekitar 97 persen keragaman nilai bisa dijelaskan oleh garis yang memakai lama belajar.' },
      { jenis: 'paragraf', teks: 'Sisa 3 persennya berasal dari hal lain yang tidak masuk hitungan: cara belajarnya, kondisi saat ujian, soal yang kebetulan cocok, dan banyak lagi. Angka ini berguna justru karena mengingatkan bahwa selalu ada bagian yang tidak dijelaskan.' },

      { jenis: 'sesi', judul: 'Angka saja tidak pernah cukup' },
      { jenis: 'paragraf', teks: 'Ada jebakan besar pada r, dan jebakan ini sering dilupakan: r hanya mengukur kelurusan. Kalau hubungannya melengkung, r bisa nol padahal hubungannya justru sempurna.' },
      {
        jenis: 'contoh',
        judul: 'Hubungan sempurna dengan r nol',
        baris: [
          'x    -3   -2   -1   0   1   2   3',
          'y     9    4    1   0   1   4   9',
          '',
          'setiap y persis sama dengan x kuadrat',
          'r = 0,00',
        ],
        simpul: 'Setiap nilai y bisa ditebak dengan sempurna dari x nya. Tetapi karena polanya melengkung dan setangkup, r nya nol. Kalau hanya membaca angka r, hubungan sempurna ini akan dilaporkan sebagai "tidak ada hubungan".',
      },
      { jenis: 'sorot', teks: 'Karena itu aturannya: selalu lihat gambarnya, jangan pernah hanya membaca angka r.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menampilkan beberapa sebaran dengan nilai r yang berbeda.',
        langkah: [
          'Bandingkan sebaran dengan r sekitar 0,99 dan r sekitar 0,34. Apa bedanya di gambar?',
          'Buka contoh melengkung. Berapa r nya, dan cocokkah dengan pola yang Anda lihat?',
          'Seret satu titik dan perhatikan r. Seberapa banyak satu titik bisa mengubahnya?',
          'Kalau r bisa nol padahal titiknya membentuk lengkung yang rapi, apa sebenarnya yang diukur r?',
        ],
      },

      { jenis: 'sesi', judul: 'Bagian terpenting: korelasi bukan sebab-akibat' },
      { jenis: 'paragraf', teks: 'Misalkan ditemukan korelasi kuat antara dua hal. Ada empat kemungkinan, dan hanya satu di antaranya berarti yang satu menyebabkan yang lain.' },
      {
        jenis: 'poin',
        judul: 'Empat kemungkinan di balik korelasi kuat',
        butir: [
          'A memang menyebabkan B.',
          'Justru terbalik, B yang menyebabkan A. Contohnya: apakah belajar lama membuat nilai bagus, atau anak yang memang paham jadi betah belajar lama?',
          'Ada faktor ketiga yang menyebabkan keduanya. Penjualan es krim dan jumlah orang tenggelam naik bersamaan, tetapi es krim tidak menenggelamkan siapa pun; yang menaikkan keduanya adalah cuaca panas. Ini ilustrasi yang biasa dipakai untuk menjelaskan, bukan hasil penelitian tertentu.',
          'Kebetulan belaka. Kalau cukup banyak pasangan data diperiksa, pasti ada yang kebetulan bergerak bersama tanpa hubungan apa pun.',
        ],
      },
      { jenis: 'paragraf', teks: 'Membedakan keempatnya tidak bisa dilakukan dari diagram pencar. Ia butuh percobaan yang dirancang, atau setidaknya penalaran tentang bagaimana kedua hal itu mungkin saling berkaitan. Statistika bisa menunjukkan bahwa dua hal bergerak bersama; ia tidak bisa memberi tahu kenapa.' },
      { jenis: 'sorot', teks: 'Kalimat yang aman: "keduanya berhubungan kuat". Kalimat yang butuh bukti jauh lebih banyak: "yang satu menyebabkan yang lain".' },
    ],
    seringKeliru: {
      judul: 'r sama dengan nol berarti tidak ada hubungan sama sekali',
      isi: 'r sama dengan nol berarti tidak ada hubungan LURUS. Contoh di halaman ini punya r nol padahal setiap nilai y bisa ditebak dengan sempurna dari x nya. Kebalikannya juga berlaku: r yang besar tidak menjamin garis lurus itu model yang tepat. Gambarnya yang memutuskan, bukan angkanya.',
      sumber: 'Korelasi product moment, koefisien determinasi, dan pembahasan korelasi dibandingkan sebab-akibat ada di Buku Panduan Guru Matematika SMA/SMK Kelas XI, Kemendikbudristek 2021, subbab A dan C, halaman 138 sampai 177.',
    },
    widget: 'kekuatan-hubungan',
    video: { berkas: 'statistika12-korelasi.mp4', poster: 'statistika12-korelasi.jpg' },
    siap: true,
  },

  /* ================================================================= */
  {
    no: 13,
    slug: 'grafik-menyesatkan',
    judul: 'Grafik yang menyesatkan',
    labelPendek: 'Membaca kritis',
    pertanyaan: 'Semua angkanya benar. Kenapa kesimpulannya tetap salah?',
    intisari: [
      'Grafik bisa menyesatkan tanpa satu pun angka yang salah.',
      'Cara paling sering: sumbu-y tidak dimulai dari nol, sehingga selisih kecil terlihat raksasa.',
      'Pilihan lebar kelas, pilihan jenis rata-rata, dan gambar yang diperbesar dua arah juga bisa menyesatkan.',
      'Tiga pertanyaan wajib pada setiap grafik: sumbunya mulai dari berapa, datanya dari mana, dan apa yang tidak ditampilkan.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Sebelas materi sebelumnya membangun alat untuk MEMBUAT ringkasan data. Materi terakhir ini membalik posisinya: sekarang Anda pembacanya, dan yang membuat grafiknya orang lain yang mungkin punya kepentingan.' },
      { jenis: 'sorot', teks: 'Grafik yang menyesatkan biasanya tidak berisi angka palsu. Justru itu yang membuatnya berbahaya: semuanya bisa diperiksa dan semuanya benar.' },

      { jenis: 'sesi', judul: 'Cara 1, sumbu-y yang dipotong' },
      { jenis: 'paragraf', teks: 'Perpustakaan sekolah mencatat pengunjung selama lima bulan: 412, 418, 425, 421, dan 430 orang. Selisih terbesarnya 18 orang dari rata-rata sekitar 421, jadi sebenarnya cukup datar.' },
      { jenis: 'paragraf', teks: 'Gambar grafiknya dengan sumbu-y mulai dari nol, dan garisnya nyaris rata. Sekarang gambar lagi dengan sumbu-y mulai dari 410. Grafik yang sama persis berubah jadi lonjakan tajam yang terlihat seperti keberhasilan besar.' },
      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menampilkan kedua versi berdampingan.',
        langkah: [
          'Geser batas bawah sumbu pada grafik kanan, dari 0 sampai 412.',
          'Perhatikan angka datanya. Apakah ada yang berubah?',
          'Bandingkan kesan yang ditimbulkan kedua grafik itu, padahal datanya satu.',
          'Grafik mana yang menurut Anda lebih jujur, dan kapan memotong sumbu masih bisa dibenarkan?',
        ],
      },
      { jenis: 'paragraf', teks: 'Memotong sumbu tidak selalu curang. Untuk data seperti suhu tubuh, mulai dari nol justru membuang seluruh informasinya. Yang membedakan curang dan tidak adalah apakah pemotongan itu DIBERITAHUKAN dengan jelas, atau disembunyikan supaya pembaca salah menduga.' },

      { jenis: 'sesi', judul: 'Cara 2, lebar kelas yang dipilih-pilih' },
      { jenis: 'paragraf', teks: 'Kita sudah melihatnya sendiri di Materi 03: data yang sama bisa jadi beberapa histogram yang berbeda bentuk. Orang yang ingin menunjukkan "tidak ada masalah" tinggal memilih lebar kelas yang membuat tumpukan mencurigakan itu larut ke dalam kelas yang besar.' },

      { jenis: 'sesi', judul: 'Cara 3, gambar yang diperbesar dua arah' },
      { jenis: 'paragraf', teks: 'Kalau harga naik dua kali lipat lalu digambar sebagai gambar uang yang tinggi DAN lebarnya sama-sama dilipatduakan, luas gambarnya menjadi empat kali lipat. Mata membaca luas, jadi kenaikan dua kali lipat terbaca sebagai empat kali lipat.' },

      { jenis: 'sesi', judul: 'Cara 4, memilih rata-rata yang paling menguntungkan' },
      { jenis: 'paragraf', teks: 'Ingat kantor pada Materi 06. Kalau ingin kantor itu terdengar makmur, laporkan mean 12,22 juta. Kalau ingin terdengar sederhana, laporkan median 5,1 juta. Keduanya benar, keduanya "rata-rata", dan kata "rata-rata" saja tidak memberi tahu yang mana.' },

      { jenis: 'sesi', judul: 'Cara 5, sumbu-x yang jaraknya tidak sama' },
      { jenis: 'paragraf', teks: 'Grafik garis yang titik-titik waktunya berjarak 1 tahun, 1 tahun, lalu 5 tahun, tetapi digambar dengan jarak yang sama, akan memampatkan periode panjang menjadi terlihat sependek yang lain. Kecepatan perubahannya jadi terbaca salah.' },

      { jenis: 'sesi', judul: 'Tiga pertanyaan untuk setiap grafik' },
      {
        jenis: 'poin',
        judul: 'Tanyakan ini sebelum percaya',
        butir: [
          'Sumbunya mulai dari berapa? Kalau tidak dari nol, apakah itu diberitahukan?',
          'Datanya dari mana, siapa yang mengumpulkan, dan dari berapa banyak? Perbandingan tanpa jumlah tidak bisa dinilai, seperti di Materi 04.',
          'Apa yang TIDAK ditampilkan? Bulan yang dilewati, kelompok yang tidak masuk, dan rentang waktu yang dipotong biasanya bukan kebetulan.',
        ],
      },
      { jenis: 'paragraf', teks: 'Ketiga pertanyaan itu tidak menuntut hitungan apa pun. Ia cuma menuntut kebiasaan untuk berhenti sebentar sebelum menyimpulkan, dan kebiasaan itu jauh lebih berguna daripada rumus mana pun di topik ini.' },
    ],
    seringKeliru: {
      judul: 'Grafik yang datanya benar tidak mungkin menipu',
      isi: 'Justru grafik yang paling menyesatkan hampir selalu berisi data yang benar. Yang menyesatkan bukan angkanya, melainkan pilihan cara menampilkannya: dari mana sumbu dimulai, selebar apa kelasnya, rata-rata jenis mana yang disebut, dan bagian mana yang tidak ikut ditampilkan. Menyalahkan angka adalah cara yang salah untuk memeriksa grafik. Periksalah pilihannya.',
    },
    widget: 'sumbu-jujur',
    video: { berkas: 'statistika13-menyesatkan.mp4', poster: 'statistika13-menyesatkan.jpg' },
    siap: true,
  },
]
