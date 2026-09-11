/**
 * Limit, 10 tahap belajar. Topik kedua MANTRA.
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
 * GAGASAN TAMBAHAN dari Essence of Calculus bab 7 (3Blue1Brown), 1 Sep 2026:
 * permainan tantangan di Materi 02 (epsilon-delta tanpa lambangnya), penegasan
 * di Materi 01 bahwa h itu angka biasa dan bukan bilangan gaib, dan peringatan
 * lingkaran setan L Hopital di Materi 08. Yang diambil GAGASANNYA saja; contoh,
 * angka, dan kalimatnya ditulis sendiri. Repo 3b1b berlisensi CC BY-NC-SA 4.0
 * yang menular, jadi menyalin kode atau naskahnya akan memaksa MANTRA ikut
 * berlisensi sama dan non-komersial selamanya.
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

/**
 * Bentuk Tahap dengan nama widget yang DIKETATKAN ke senarai di atas.
 * Tanpa ini, salah ketik nama widget baru ketahuan saat halamannya dibuka dan
 * panggungnya diam saja. Dengan ini, TypeScript menolaknya sebelum dijalankan.
 */
type TahapLimit = Omit<Tahap, 'widget'> & { widget?: WidgetLimit }

export const TAHAP: TahapLimit[] = [
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
      { jenis: 'paragraf', teks: 'Satu hal lagi yang perlu diluruskan sejak awal. Huruf h di atas BUKAN benda ajaib yang "sangat kecil tak berhingga". Ia angka biasa: 1, lalu 0,5, lalu 0,1, lalu 0,001. Angka yang bisa Anda tulis dan hitung sendiri.' },
      { jenis: 'paragraf', teks: 'Yang kita lakukan hanyalah mengecilkan angka biasa itu terus menerus, lalu memperhatikan ke mana hasilnya menuju. Tidak ada satu pun langkah yang memakai bilangan gaib. Membayangkan h sebagai sesuatu yang mistis justru membuat limit terasa jauh lebih sulit daripada yang sebenarnya.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya adalah kejadian tadi. Geser panjang selang waktunya dan amati dua hal sekaligus.',
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
    video: { berkas: 'limit1-kecepatan.webm', poster: 'limit1-kecepatan.jpg' },
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
      { jenis: 'paragraf', teks: 'Pada Materi 01 kita memperpendek selang waktu terus menerus dan melihat angkanya merapat ke 20. Sekarang cara berpikir itu dirapikan supaya bisa dipakai untuk fungsi apa pun.' },

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
      { jenis: 'paragraf', teks: 'Kalimat itu terdengar aneh sekarang, karena pada contoh di atas nilai f(3) kebetulan memang 10, sama dengan limitnya. Materi 03 dan Materi 04 akan menunjukkan bahwa kebetulan itu tidak selalu terjadi, dan justru di situlah limit menjadi berguna.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya adalah garis bilangan dengan satu titik tujuan. Tarik titik x mendekat dan perhatikan tabelnya.',
        langkah: [
          'Tarik x dari sebelah kiri, dekatkan ke titik bertanda',
          'Perhatikan kolom f(x) di tabel: angkanya menyempit ke satu nilai',
          'Sekarang tarik dari sebelah kanan. Angkanya menyempit ke nilai yang sama',
          'Coba letakkan x tepat di titiknya. Alat itu menolak, dan penolakan itu memang bagian dari definisinya',
        ],
      },

      { jenis: 'sesi', judul: 'Seberapa dekat yang Anda mau?' },
      { jenis: 'paragraf', teks: 'Kalimat "f(x) mendekati L" masih terasa longgar. Seberapa dekat itu dekat? Ada satu cara menguji yang membuatnya jadi tegas, dan caranya berbentuk permainan tantangan.' },
      {
        jenis: 'poin',
        judul: 'Aturan permainannya',
        butir: [
          'Anda menantang: saya mau f(x) berjarak kurang dari 0,1 dari 10',
          'Saya menjawab: pakai x yang berjarak kurang dari 0,016 dari 3, pasti terpenuhi',
          'Anda menantang lebih ketat: kurang dari 0,001',
          'Saya menjawab lagi: pakai x yang berjarak kurang dari 0,00016',
        ],
      },
      { jenis: 'sorot', teks: 'Limitnya 10 berarti: berapa pun ketatnya tantangan Anda, saya SELALU punya jawabannya. Tidak ada tantangan yang membuat saya kehabisan akal.' },
      { jenis: 'paragraf', teks: 'Itulah beda antara "kebetulan dekat" dan "benar-benar menuju". Kalau f(x) hanya kebetulan dekat, cepat atau lambat ada tantangan yang tidak bisa dipenuhi. Kalau ia benar-benar menuju L, jawabannya selalu ada.' },
      { jenis: 'paragraf', teks: 'Di bangku kuliah permainan ini ditulis dengan dua huruf Yunani dan disebut definisi epsilon-delta. Anda belum perlu lambangnya sekarang. Yang perlu Anda bawa adalah gagasannya: limit itu janji yang sanggup memenuhi tantangan seketat apa pun.' },

      { jenis: 'sesi', judul: 'Kenapa tidak boleh berhenti di satu arah saja' },
      { jenis: 'paragraf', teks: 'Kalau kita hanya memeriksa dari kiri, kita bisa tertipu. Ada fungsi yang dari kiri menuju satu angka, tapi dari kanan menuju angka yang berbeda. Fungsi seperti itu tidak punya limit di titik tersebut, walaupun kedua sisinya masing-masing rapi.' },
      { jenis: 'paragraf', teks: 'Itu persis yang dibahas pada materi berikutnya, dan contohnya ada di karcis parkir.' },
    ],
    seringKeliru: {
      judul: 'Dikira "mendekati" itu sama dengan "akhirnya sampai"',
      isi: 'Dalam bahasa sehari-hari, mendekat biasanya berujung sampai. Dalam limit tidak. Nilai x boleh dibuat sedekat apa pun ke c, tetapi tidak pernah diletakkan tepat di c. Justru karena tidak pernah sampai itulah limit tetap bisa menjawab walaupun f(c) sendiri tidak ada. Ini bukan kekurangan definisi, melainkan sumber kekuatannya.',
    },
    video: { berkas: 'limit2-mendekati.webm', poster: 'limit2-mendekati.jpg' },
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
        teks: 'Alat interaktifnya adalah grafik tarif tadi. Dua penunjuk merayap dari kiri dan dari kanan.',
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
        judul: 'Bandingkan dengan Materi 03',
        butir: [
          'Tarif parkir - nilainya ADA, limitnya TIDAK ADA',
          'Fungsi berlubang ini - nilainya TIDAK ADA, limitnya ADA',
        ],
      },
      { jenis: 'sorot', teks: 'Nilai fungsi dan limit adalah dua hal yang benar-benar berbeda. Yang satu bisa ada tanpa yang lain.' },
      { jenis: 'paragraf', teks: 'Sekarang kalimat dari Materi 02 itu masuk akal: limit tidak peduli apa yang terjadi tepat di titiknya. Justru karena tidak peduli, ia masih bisa menjawab walaupun titiknya bolong.' },
      { jenis: 'paragraf', teks: 'Dan ternyata ini bukan kasus langka. Hitungan kecepatan sesaat di Materi 01 bentuknya persis seperti ini: 0 dibagi 0 kalau dipaksakan, tetapi punya limit yang rapi setelah disederhanakan. Seluruh kalkulus berdiri di atas bentuk semacam ini.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menggambar fungsi tadi. Perbesar tampilannya ke sekitar x = 1.',
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
    video: { berkas: 'limit4-lubang.webm', poster: 'limit4-lubang.jpg' },
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
          'Penyebut nol tapi pembilang bukan nol - limitnya biasanya tidak ada, dan grafiknya punya asimtot tegak. Dibahas di Materi 09',
          'Penyebut nol DAN pembilang nol - inilah 0 dibagi 0, bentuknya harus ditulis ulang. Dibahas di Materi 06',
        ],
      },
      { jenis: 'paragraf', teks: 'Jadi urutan kerjanya selalu sama: masukkan angkanya dulu untuk melihat apa yang terjadi. Kalau hasilnya wajar, selesai. Kalau muncul 0 dibagi 0, barulah pekerjaan yang sebenarnya dimulai.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya adalah mesin sifat limit. Anda memilih sifat mana yang dipakai di tiap langkah.',
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
      isi: 'Substitusi berhasil pada banyak soal, jadi wajar kalau lama-lama orang mengira memang begitulah cara kerja limit. Padahal urutannya terbalik. Limit didefinisikan lewat pendekatan dari dua arah, dan substitusi hanya jalan pintas yang kebetulan sah untuk fungsi yang tidak punya kejutan di titik itu. Alasan lengkapnya baru dilunasi di Materi 09, saat kata "kontinu" diperkenalkan. Buktinya bahwa substitusi bukan definisi: pada Materi 04 substitusi gagal total, sedangkan limitnya ada dan rapi.',
    },
    widget: 'mesin-sifat',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 6,
    slug: 'nol-per-nol',
    judul: 'Kalau hasilnya 0 dibagi 0',
    labelPendek: '0 per 0',
    pertanyaan: 'Substitusi buntu. Sekarang bagaimana?',
    intisari: [
      'Bentuk 0 dibagi 0 bukan jawaban, melainkan tanda bahwa bentuknya harus ditulis ulang.',
      'Tiga cara menulis ulang: memfaktorkan, mengalikan sekawan, membagi pangkat tertinggi.',
      'Yang dicari selalu sama: coret bagian yang membuat penyebutnya nol.',
      'Setelah tercoret, barulah angkanya dimasukkan.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Materi 05 berakhir pada satu simpul: masukkan angkanya dulu. Kalau hasilnya wajar, selesai. Kalau muncul 0 dibagi 0, pekerjaan yang sebenarnya baru dimulai. Materi ini tentang pekerjaan itu.' },
      { jenis: 'sorot', teks: 'Bentuk 0 dibagi 0 tidak berarti limitnya tidak ada. Ia berarti bentuk yang Anda tulis belum memberi tahu apa-apa.' },
      { jenis: 'paragraf', teks: 'Buktinya begini. Bentuk (x² - 1) : (x - 1) limitnya 2, sedangkan (x² - 4) : (x - 2) limitnya 4. Keduanya sama-sama memberi 0 dibagi 0 kalau angkanya dipaksakan masuk, tetapi jawabannya berbeda. Jadi tulisan 0 dibagi 0 memang belum mengandung keterangan apa pun.' },

      { jenis: 'sesi', judul: 'Cara pertama: memfaktorkan' },
      { jenis: 'paragraf', teks: 'Kalau pembilang dan penyebut sama-sama bernilai nol di titik yang sama, keduanya pasti punya faktor yang sama. Temukan faktor itu, lalu coret.' },
      {
        jenis: 'contoh',
        judul: 'Limit (x² - 4) : (x - 2) saat x mendekati 2',
        baris: [
          'coba masukkan dulu       (4 - 4) : (2 - 2)   =  0 : 0',
          'faktorkan pembilangnya   (x - 2)(x + 2)',
          'coret, asal x bukan 2    x + 2',
          'baru masukkan            2 + 2               =  4',
        ],
        simpul: 'Limitnya 4.',
      },
      { jenis: 'paragraf', teks: 'Perhatikan bahwa langkah mencoret hanya sah untuk x yang bukan 2. Untungnya limit memang tidak pernah meletakkan x tepat di 2, jadi syarat itu selalu terpenuhi dengan sendirinya.' },

      { jenis: 'sesi', judul: 'Cara kedua: mengalikan dengan sekawan' },
      { jenis: 'paragraf', teks: 'Kalau ada tanda akar, memfaktorkan biasanya buntu. Yang dipakai adalah sekawan, yaitu bentuk yang sama persis tetapi tanda tengahnya dibalik. Mengalikan sebuah bentuk dengan sekawannya membuat akarnya hilang.' },
      {
        jenis: 'contoh',
        judul: 'Limit (√(x + 4) - 2) : x saat x mendekati 0',
        baris: [
          'coba masukkan dulu     (2 - 2) : 0            =  0 : 0',
          'sekawan pembilangnya   √(x + 4) + 2',
          'kalikan atas dan bawah dengan sekawan itu',
          'pembilangnya jadi      (x + 4) - 4            =  x',
          'coret x                1 : (√(x + 4) + 2)',
          'baru masukkan          1 : (2 + 2)            =  1/4',
        ],
        simpul: 'Limitnya 1/4, atau 0,25.',
      },
      {
        jenis: 'poin',
        judul: 'Kenapa sekawan bekerja',
        butir: [
          'Bentuk (a - b) dikali (a + b) selalu menghasilkan a² - b²',
          'Mengkuadratkan akar berarti akarnya hilang',
          'Akar yang hilang itulah yang tadi menghalangi pencoretan',
        ],
      },

      { jenis: 'sesi', judul: 'Cara ketiga: membagi dengan pangkat tertinggi' },
      { jenis: 'paragraf', teks: 'Cara ini dipakai kalau x tidak menuju sebuah angka, melainkan menuju tak hingga. Karena itu ia dibahas tuntas di materi berikutnya. Namanya disebut di sini supaya ketiga cara itu terkumpul di satu tempat dan mudah diingat sebagai satu kelompok.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya membongkar soal selangkah demi selangkah. Anda yang menekan majunya.',
        langkah: [
          'Pilih soalnya. Langkah pertama selalu sama: coba masukkan angkanya',
          'Kalau muncul 0 dibagi 0, alat menawarkan cara mana yang cocok',
          'Tekan maju satu langkah, dan perhatikan nama caranya di sebelah tiap baris',
          'Di langkah pencoretan ada catatan kecil "asal x bukan ...". Itu syarat yang membuat langkahnya sah',
        ],
      },

      { jenis: 'sesi', judul: 'Ringkasan urutan kerjanya' },
      {
        jenis: 'poin',
        judul: 'Empat langkah ini, dan urutannya tidak pernah berubah',
        butir: [
          'Masukkan angkanya, lihat apa yang terjadi',
          'Kalau hasilnya wajar, itu jawabannya, selesai',
          'Kalau 0 dibagi 0, tulis ulang bentuknya: faktorkan, atau kalikan sekawan',
          'Setelah faktor pengganggunya tercoret, masukkan lagi angkanya',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Mencoret dianggap boleh kapan saja',
      isi: 'Mencoret (x - 2) dari atas dan bawah terasa seperti aturan aljabar biasa, padahal ia hanya sah kalau (x - 2) bukan nol, yaitu kalau x bukan 2. Kalau syarat itu dilupakan, orang menyimpulkan bahwa fungsi asli dan fungsi hasil coretan sama persis. Padahal keduanya berbeda tepat di satu titik: yang asli berlubang di x = 2, hasil coretannya tidak. Gambar di Materi 04 memperlihatkan bedanya.',
    },
    video: { berkas: 'limit6-nolpernol.webm', poster: 'limit6-nolpernol.jpg' },
    widget: 'bongkar-bertahap',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 7,
    slug: 'tak-hingga',
    judul: 'Kalau x lari ke tak hingga',
    labelPendek: 'Tak hingga',
    pertanyaan: 'Kenapa grafik bisa mendatar tapi tidak pernah menyentuh garisnya?',
    intisari: [
      'Tak hingga bukan bilangan, jadi ia tidak bisa disubstitusi.',
      'Ia keterangan arah: x dibuat sebesar-besarnya tanpa batas.',
      'Caranya membagi pembilang dan penyebut dengan pangkat tertinggi.',
      'Garis yang didekati tapi tidak pernah disentuh disebut asimtot datar.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Sampai sekarang x selalu didorong ke sebuah angka: ke 2, ke 1, ke 0. Sekarang pertanyaannya berbeda. Ke mana f(x) menuju kalau x dibuat besar terus menerus, tanpa pernah berhenti?' },
      { jenis: 'paragraf', teks: 'Contohnya nyata. Sebuah pabrik punya biaya tetap Rp 5.000.000 per hari, ditambah Rp 20.000 untuk tiap barang. Kalau barangnya dibuat semakin banyak, berapa biaya rata-rata per barang?' },
      {
        jenis: 'contoh',
        judul: 'Biaya rata-rata per barang',
        baris: [
          '100 barang       (5.000.000 + 2.000.000) : 100        =  70.000',
          '1.000 barang     (5.000.000 + 20.000.000) : 1.000     =  25.000',
          '10.000 barang    (5.000.000 + 200.000.000) : 10.000   =  20.500',
          '100.000 barang   ...                                  =  20.050',
        ],
        simpul: 'Merapat ke 20.000, tapi tidak pernah sampai. Biaya tetapnya selalu menyisakan sedikit.',
      },
      { jenis: 'sorot', teks: 'Tak hingga bukan bilangan. Ia tidak bisa dimasukkan ke rumus, karena tidak ada angka yang bernama tak hingga.' },

      { jenis: 'sesi', judul: 'Caranya: bagi dengan pangkat tertinggi' },
      { jenis: 'paragraf', teks: 'Kalau x menuju tak hingga, pecahan seperti 1 : x menjadi sangat kecil. Semakin besar x, semakin dekat pecahan itu ke nol. Itulah alat utamanya, dan seluruh cara ini dibangun di atasnya.' },
      {
        jenis: 'contoh',
        judul: 'Limit (3x² + 2x) : (x² - 5) saat x menuju tak hingga',
        baris: [
          'pangkat tertinggi         x²',
          'bagi semuanya dengan x²',
          'pembilangnya jadi         3 + (2 : x)',
          'penyebutnya jadi          1 - (5 : x²)',
          'saat x membesar           2 : x menuju 0,  5 : x² menuju 0',
          'yang tersisa              3 : 1',
        ],
        simpul: 'Limitnya 3.',
      },
      {
        jenis: 'poin',
        judul: 'Tiga kemungkinan, semuanya bisa ditebak dari pangkatnya',
        butir: [
          'Pangkat atas sama dengan pangkat bawah - limitnya hasil bagi angka di depannya',
          'Pangkat atas lebih kecil - limitnya 0, karena penyebutnya tumbuh jauh lebih cepat',
          'Pangkat atas lebih besar - limitnya tak hingga, karena pembilangnya menang',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Contoh yang pangkat atasnya lebih kecil',
        baris: [
          'limit (2x + 7) : (x² + 1) saat x menuju tak hingga',
          'pangkat atas 1, pangkat bawah 2',
          'penyebutnya tumbuh jauh lebih cepat daripada pembilangnya',
        ],
        simpul: 'Limitnya 0.',
      },

      { jenis: 'sesi', judul: 'Asimtot datar' },
      { jenis: 'paragraf', teks: 'Kalau limit sebuah fungsi saat x menuju tak hingga adalah sebuah angka, katakanlah 3, maka grafiknya akan semakin mendatar dan merapat ke garis mendatar y = 3. Garis itu disebut asimtot datar.' },
      { jenis: 'paragraf', teks: 'Kurvanya boleh sedekat apa pun ke garis itu. Pada contoh biaya pabrik tadi ia bahkan tidak pernah menyentuhnya, karena selalu ada sisa kecil dari biaya tetap yang tidak bisa dihilangkan berapa pun banyaknya barang.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya adalah kebalikan dari alat Materi 04. Di sana Anda memperbesar, di sini Anda memperkecil.',
        langkah: [
          'Mulai dari tampilan biasa. Kurvanya masih terlihat jelas melengkung',
          'Perkecil tampilannya. Kurvanya makin lama makin terlihat mendatar',
          'Pada tampilan yang sangat kecil, kurva dan garis asimtotnya nyaris berimpit',
          'Sekarang lihat tabel angkanya. Selisihnya masih ada, hanya terlalu kecil untuk digambar',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Tak hingga dikira sebuah bilangan yang sangat besar',
      isi: 'Kalau tak hingga dianggap bilangan, muncul godaan memasukkannya ke rumus lalu menulis hal seperti tak hingga dibagi tak hingga sama dengan 1. Itu tidak sah, karena tak hingga bukan bilangan dan tidak bisa dibagi. Yang benar, tak hingga adalah keterangan arah: ia memberi tahu bahwa x dibuat membesar tanpa batas. Karena itu jawabannya dicari dari kecenderungan bentuknya, bukan dari substitusi.',
    },
    video: { berkas: 'limit7-takhingga.webm', poster: 'limit7-takhingga.jpg' },
    widget: 'perkecil-tampilan',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 8,
    slug: 'limit-sinus',
    judul: 'Limit sinus jadi angka 1',
    labelPendek: 'Sinus',
    pertanyaan: 'Kenapa sin x dibagi x menuju tepat 1, bukan sekadar mendekati?',
    intisari: [
      'Untuk sudut kecil, panjang busur dan panjang sin hampir sama.',
      'Perbandingannya terjepit di antara cos θ dan 1 : cos θ.',
      'Kedua penjepitnya menuju 1, jadi yang di tengah ikut menuju 1.',
      'Syarat mutlak: sudutnya dalam radian, bukan derajat.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Materi ini menyambung langsung ke topik Trigonometri. Kalau lingkaran satuan di topik itu sudah terasa akrab, bagian ini akan terasa seperti melanjutkan cerita yang sama, bukan memulai cerita baru.' },
      { jenis: 'paragraf', teks: 'Pertanyaannya: berapa limit sin x : x saat x mendekati 0? Kalau dimasukkan langsung, sin 0 sama dengan 0 dan penyebutnya juga 0. Bentuk 0 dibagi 0 lagi.' },
      {
        jenis: 'contoh',
        judul: 'Coba dengan angka, semuanya dalam radian',
        baris: [
          'x = 0,5       sin x : x   =  0,9589',
          'x = 0,1       sin x : x   =  0,9983',
          'x = 0,01      sin x : x   =  0,999983',
          'x = 0,001     sin x : x   =  0,99999983',
        ],
        simpul: 'Merapat ke 1. Tapi kenapa tepat 1, dan bukan 0,9999 sekian?',
      },

      { jenis: 'sesi', judul: 'Buktinya ada di lingkaran satuan' },
      { jenis: 'paragraf', teks: 'Gambar lingkaran berjari-jari 1, lalu ambil sudut lancip θ di pusatnya. Di dalam gambar itu ada tiga daerah yang saling bersarang, dan luas ketiganya bisa dibandingkan.' },
      {
        jenis: 'poin',
        judul: 'Tiga daerah, dari yang terkecil ke yang terbesar',
        butir: [
          'Segitiga di dalam juring - luasnya ½ · cos θ · sin θ',
          'Juring lingkaran itu sendiri - luasnya ½ · θ, karena jari-jarinya 1',
          'Segitiga di luar juring - luasnya ½ · tan θ',
        ],
      },
      { jenis: 'paragraf', teks: 'Karena yang pertama termuat di dalam yang kedua, dan yang kedua termuat di dalam yang ketiga, urutan luasnya sudah pasti naik. Bagi ketiganya dengan sin θ, dan bentuknya menjadi rapi.' },
      { jenis: 'sorot', teks: 'cos θ  <  θ : sin θ  <  1 : cos θ' },
      { jenis: 'paragraf', teks: 'Sekarang kecilkan θ menuju 0. Nilai cos θ menuju 1, dan 1 : cos θ juga menuju 1. Jadi bentuk yang di tengah terjepit di antara dua hal yang sama-sama menuju 1. Ia tidak punya pilihan lain selain ikut menuju 1.' },
      { jenis: 'paragraf', teks: 'Karena θ : sin θ menuju 1, maka kebalikannya, sin θ : θ, juga menuju 1. Selesai. Bukan hampir 1, melainkan tepat 1, dan sekarang alasannya jelas.' },

      { jenis: 'sesi', judul: 'Radian, bukan derajat' },
      { jenis: 'paragraf', teks: 'Bukti tadi memakai luas juring sama dengan ½ · θ. Rumus itu hanya benar kalau θ diukur dalam radian. Kalau sudutnya ditulis dalam derajat, luas juringnya bukan ½ · θ, dan seluruh rangkaian tadi runtuh.' },
      { jenis: 'sorot', teks: 'Kalau sudutnya dalam derajat, limit sin x : x BUKAN 1. Ini kekeliruan yang sering terjadi dan jarang dijelaskan.' },

      { jenis: 'sesi', judul: 'Yang langsung ikut ketahuan' },
      {
        jenis: 'poin',
        judul: 'Sekali sin x : x diketahui, yang lain menyusul',
        butir: [
          'tan x : x juga menuju 1, karena tan x = sin x : cos x, dan cos x menuju 1',
          'sin 3x : 5x menuju 3/5, yaitu perbandingan angka di depan sudutnya',
          'Aturan umumnya: sin ax : bx menuju a : b',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Dipakai langsung',
        baris: [
          'limit sin 3x : 5x saat x mendekati 0',
          'angka di depan sudut atas    3',
          'angka di depan sudut bawah   5',
        ],
        simpul: 'Limitnya 3/5, atau 0,6.',
      },

      { jenis: 'sesi', judul: 'Kalau Anda pernah dengar aturan L Hopital' },
      { jenis: 'paragraf', teks: 'Sebagian siswa sudah pernah mendengar jalan pintas untuk bentuk 0 dibagi 0: turunkan pembilang dan penyebutnya masing-masing, lalu masukkan angkanya. Namanya aturan L Hopital, dan ia memang bekerja pada banyak soal.' },
      { jenis: 'paragraf', teks: 'Ada godaan besar untuk memakainya di sini. Turunan sin x adalah cos x, turunan x adalah 1, jadi hasilnya cos 0 dibagi 1 sama dengan 1. Cepat, rapi, dan jawabannya benar.' },
      { jenis: 'sorot', teks: 'Tetapi sebagai BUKTI, langkah itu berputar-putar. Rumus turunan sin x justru diperoleh dari limit yang sedang kita buktikan ini.' },
      {
        jenis: 'poin',
        judul: 'Urutan sebenarnya, dan urutan itu tidak boleh dibalik',
        butir: [
          'Perbandingan luas di lingkaran satuan membuktikan sin x dibagi x menuju 1',
          'Hasil itu dipakai untuk membuktikan bahwa turunan sin x adalah cos x',
          'Baru setelah itu aturan L Hopital boleh memakai turunan sin x',
        ],
      },
      { jenis: 'paragraf', teks: 'Jadi memakai L Hopital untuk membuktikan limit ini sama saja dengan meminjam uang dari orang yang belum punya uang. Sebagai alat hitung cepat ia sah dipakai di soal lain, tetapi sebagai bukti untuk limit ini ia tidak berlaku. Karena itulah buktinya harus lewat gambar lingkaran tadi.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya adalah lingkaran satuan yang sama seperti di topik Trigonometri, dengan warna yang sama pula.',
        langkah: [
          'Mulai dari sudut besar. Busur dan ruas sin terlihat jelas berbeda panjangnya',
          'Kecilkan sudutnya. Keduanya makin lama makin mirip',
          'Perhatikan angka perbandingannya: 0,95 lalu 0,998 lalu 0,99998',
          'Perhatikan juga bahwa busurnya selalu sedikit lebih panjang. Itu sebabnya perbandingannya selalu sedikit di bawah 1',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Dikira sin x : x bisa dicoret jadi sin',
      isi: 'Tulisan sin x terlihat seperti perkalian antara sin dan x, sehingga muncul godaan mencoret x di atas dan di bawah lalu menyimpulkan hasilnya sin. Itu keliru, karena sin bukan bilangan yang dikalikan melainkan nama sebuah fungsi. Menulis sin tanpa sudut sama tidak bermaknanya dengan menulis tanda akar tanpa isi. Karena itu bentuk ini harus dikerjakan lewat perbandingan luas tadi, bukan lewat pencoretan.',
    },
    video: { berkas: 'limit8-sinus.webm', poster: 'limit8-sinus.jpg' },
    widget: 'busur-lawan-tali',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 9,
    slug: 'kontinu',
    judul: 'Fungsi yang tidak putus',
    labelPendek: 'Kontinu',
    pertanyaan: 'Apa bedanya grafik yang bisa digambar tanpa mengangkat pensil?',
    intisari: [
      'Fungsi kontinu di suatu titik kalau tiga syarat terpenuhi sekaligus.',
      'Nilainya ada, limitnya ada, dan keduanya sama.',
      'Ada tiga cara sebuah fungsi gagal: berlubang, melompat, atau meledak.',
      'Inilah alasan sebenarnya kenapa substitusi langsung boleh dipakai.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Bayangkan rel roller coaster. Relnya boleh menanjak, boleh menukik, boleh berputar. Yang tidak boleh: ada potongan rel yang hilang, atau dua ujung rel yang tidak nyambung. Kereta yang melaju di rel seperti itu tidak akan sampai ke ujung.' },
      { jenis: 'paragraf', teks: 'Fungsi kontinu adalah fungsi yang grafiknya seperti rel yang benar: bisa digambar dari ujung ke ujung tanpa sekali pun mengangkat pensil.' },

      { jenis: 'sesi', judul: 'Tiga syarat kontinu' },
      { jenis: 'paragraf', teks: 'Untuk memastikan sebuah fungsi kontinu di titik c, ketiga hal berikut harus benar sekaligus. Kalau satu saja gagal, fungsinya tidak kontinu di titik itu.' },
      {
        jenis: 'poin',
        judul: 'Ketiganya wajib, bukan pilih salah satu',
        butir: [
          'Nilainya ada - f(c) memang punya hasil, bukan bentuk 0 dibagi 0',
          'Limitnya ada - kiri dan kanan sepakat menuju satu angka',
          'Keduanya sama - angka yang dituju itu persis sama dengan f(c)',
        ],
      },
      { jenis: 'sorot', teks: 'Syarat ketiga inilah yang menyambung dua hal yang selama ini dipisah: kontinu berarti limit dan nilai kebetulan berimpit.' },

      { jenis: 'sesi', judul: 'Tiga cara sebuah fungsi bisa gagal' },
      { jenis: 'paragraf', teks: 'Menariknya, Anda sudah bertemu ketiganya di materi sebelumnya. Sekarang ketiganya dikumpulkan dan diberi nama.' },
      {
        jenis: 'poin',
        judul: 'Gagal syarat pertama: berlubang',
        butir: [
          'Contohnya (x² - 1) : (x - 1) di titik x = 1',
          'Limitnya ada dan rapi, yaitu 2',
          'Tapi nilainya tidak ada sama sekali, jadi syarat pertama gagal',
          'Grafiknya garis lurus dengan satu titik bolong, sudah dibahas di Materi 04',
        ],
      },
      {
        jenis: 'poin',
        judul: 'Gagal syarat kedua: melompat',
        butir: [
          'Contohnya tarif parkir yang berubah tepat pada jam kedua',
          'Nilainya ada, papan tarifnya jelas menyebutkan satu angka',
          'Tapi limit kiri dan limit kanan berbeda, jadi syarat kedua gagal',
          'Grafiknya patah tegak, sudah dibahas di Materi 03',
        ],
      },
      {
        jenis: 'poin',
        judul: 'Gagal karena meledak: asimtot tegak',
        butir: [
          'Contohnya 1 : (x - 2)² di titik x = 2',
          'Penyebutnya nol, tetapi pembilangnya bukan nol',
          'Nilainya membesar tanpa batas, jadi tidak ada angka yang dituju',
          'Grafiknya menjulang tegak di dekat garis x = 2',
        ],
      },
      {
        jenis: 'poin',
        judul: 'Gagal syarat ketiga saja: nilainya digeser',
        butir: [
          'Bentuknya: f(x) = x + 1 untuk semua x kecuali 2, tetapi f(2) sengaja ditetapkan 5',
          'Nilainya ada, limitnya juga ada, jadi syarat 1 dan 2 lolos',
          'Tapi limitnya 3 sedangkan nilainya 5, jadi syarat 3 gagal',
          'Inilah satu-satunya bentuk yang membuat syarat 3 terasa perlu',
        ],
      },
      { jenis: 'paragraf', teks: 'Perhatikan bedanya dengan asimtot datar di Materi 07. Asimtot datar muncul saat x lari ke tak hingga dan f(x) yang mendatar. Asimtot tegak muncul saat x mendekati satu titik dan f(x) yang meledak. Arahnya kebalikan.' },

      { jenis: 'sesi', judul: 'Janji dari Materi 05 dilunasi di sini' },
      { jenis: 'paragraf', teks: 'Pada Materi 05 dikatakan bahwa substitusi langsung sah untuk suku banyak, tetapi alasannya sengaja ditunda. Sekarang alasannya bisa disebutkan utuh.' },
      { jenis: 'sorot', teks: 'Suku banyak kontinu di semua titik. Karena kontinu berarti limit sama dengan nilai fungsi, maka menghitung limitnya boleh dilakukan dengan memasukkan angkanya.' },
      { jenis: 'paragraf', teks: 'Jadi substitusi bukan definisi limit, melainkan akibat dari kontinuitas. Untuk fungsi yang tidak kontinu di titik itu, jalan pintasnya langsung gugur, persis seperti yang terjadi di Materi 04 dan Materi 06. Sekarang seluruh alurnya tertutup rapi.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya memberi Anda sebuah fungsi mulus dan empat cara merusaknya.',
        langkah: [
          'Tekan "bikin lubang". Perhatikan syarat nomor berapa yang menyala merah',
          'Tekan "geser satu titik". Sekarang HANYA syarat 3 yang gagal: nilainya ada, limitnya ada, tapi keduanya beda',
          'Tekan "bikin lompat". Yang gagal syarat 2, karena kiri dan kanan tidak sepakat',
          'Tekan "bikin asimtot". Grafiknya menjulang dan angkanya lepas',
          'Kembalikan ke mulus. Ketiga syaratnya menyala hijau bersamaan',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Kontinu dikira sama dengan mulus tanpa sudut tajam',
      isi: 'Kontinu hanya menuntut grafiknya tidak putus, bukan tidak bersudut. Grafik nilai mutlak, yang bentuknya seperti huruf V, tetap kontinu di titik sudutnya karena pensilnya tidak perlu diangkat. Yang gagal di titik itu bukan kontinuitas, melainkan sifat lain yang baru dipelajari saat masuk ke turunan. Jadi bersudut tetap kontinu, sedangkan berlubang, melompat, dan meledak tidak.',
    },
    video: { berkas: 'limit9-kontinu.webm', poster: 'limit9-kontinu.jpg' },
    widget: 'perusak-fungsi',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 10,
    slug: 'dunia-nyata',
    judul: 'Dipakai di dunia nyata',
    labelPendek: 'Dunia nyata',
    pertanyaan: 'Di mana limit benar-benar bekerja di luar buku pelajaran?',
    intisari: [
      'Rel wahana harus kontinu, kalau tidak keretanya menghantam ujung rel.',
      'Kadar obat dalam darah mendekati satu tingkat tetap.',
      'Biaya rata-rata produksi punya batas bawah yang tidak bisa ditembus.',
      'Populasi berhenti tumbuh di daya dukung lingkungannya.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Empat contoh berikut bukan soal buatan. Semuanya persoalan nyata yang jawabannya memang dicari dengan limit, dan bentuk grafiknya bisa dilihat di alatnya.' },

      { jenis: 'sesi', judul: 'Rel wahana yang harus nyambung' },
      { jenis: 'paragraf', teks: 'Perancang roller coaster menyusun lintasan dari beberapa potongan rumus: bagian menanjak, bagian melengkung, bagian menukik. Di tiap titik sambungan, tinggi rel dari potongan kiri dan potongan kanan harus sama persis.' },
      { jenis: 'paragraf', teks: 'Kalau tidak sama, ada lompatan di rel. Di atas kertas itu hanya selisih angka kecil. Pada wahana sungguhan itu berarti kereta menghantam ujung rel. Jadi syarat kontinu di sini bukan urusan matematika saja.' },

      { jenis: 'sesi', judul: 'Kadar obat dalam darah' },
      { jenis: 'paragraf', teks: 'Obat yang diminum berulang pada jarak waktu tetap akan menumpuk di dalam darah, tetapi tidak selamanya, karena tubuh juga membuangnya. Lama-lama kadarnya mendekati satu tingkat tetap yang disebut kadar mantap.' },
      { jenis: 'paragraf', teks: 'Dokter memakai nilai limit itu untuk menentukan dosis: cukup tinggi supaya obatnya bekerja, cukup rendah supaya tidak meracuni. Yang dihitung adalah limit kadar obat saat banyaknya dosis menuju tak hingga.' },

      { jenis: 'sesi', judul: 'Biaya rata-rata produksi' },
      { jenis: 'paragraf', teks: 'Contoh pabrik di Materi 07 adalah kasus nyata. Biaya tetap dibagi rata ke seluruh barang, jadi semakin banyak barang yang dibuat, semakin kecil bagian biaya tetap yang ditanggung tiap barang.' },
      { jenis: 'paragraf', teks: 'Tapi ada batasnya. Biaya bahan per barang tidak bisa dihilangkan. Limitnya itulah biaya rata-rata terendah yang mungkin dicapai, dan angka itu dipakai untuk menentukan harga jual paling murah yang masih tidak merugi.' },

      { jenis: 'sesi', judul: 'Populasi yang berhenti tumbuh' },
      { jenis: 'paragraf', teks: 'Populasi ikan di sebuah danau tidak tumbuh selamanya. Awalnya cepat, lalu melambat, lalu hampir berhenti di satu jumlah tertentu. Jumlah itu disebut daya dukung lingkungan.' },
      { jenis: 'paragraf', teks: 'Grafiknya berbentuk huruf S yang mendatar di bagian atas. Garis datar yang didekatinya adalah asimtot datar, dan nilainya adalah limit populasi saat waktu menuju tak hingga.' },

      { jenis: 'sesi', judul: 'Satu benang merah' },
      { jenis: 'sorot', teks: 'Keempatnya menanyakan hal yang sama: ke mana sesuatu menuju, bukan berapa nilainya sekarang.' },
      { jenis: 'paragraf', teks: 'Itulah yang membuat limit berguna. Ia menjawab pertanyaan tentang tujuan, bukan tentang keadaan. Dan sering kali tujuan itulah yang perlu diketahui sebelum keputusan diambil: sebelum wahananya dibangun, sebelum dosisnya ditetapkan, sebelum harganya dipasang.' },
    ],
    widget: 'dunia-nyata-limit',
    siap: true,
  },
]
