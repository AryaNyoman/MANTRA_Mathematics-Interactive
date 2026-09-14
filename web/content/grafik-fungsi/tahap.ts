/**
 * Grafik Fungsi, 13 tahap belajar. Topik ketiga MANTRA.
 *
 * Rancangannya: docs/superpowers/specs/2026-09-01-grafik-fungsi-alur-belajar.md
 *
 * SUMBER MATERI
 * Buku Panduan Guru Matematika untuk SMA/SMK, Kementerian Pendidikan,
 * Kebudayaan, Riset, dan Teknologi:
 *   Kelas X  Bab 6 "Fungsi Kuadrat", halaman cetak 168 sampai 197
 *   Kelas X  Bab 1 "Eksponen dan Logaritma", halaman cetak 20 sampai 46
 *   Kelas XI Bab 1 "Komposisi Fungsi dan Invers", halaman cetak 21 sampai 64
 * Contoh dan kalimatnya ditulis sendiri, tetapi urutan konsep, istilah, dan
 * beberapa angka acuannya mengikuti buku itu dan disebutkan sumbernya.
 *
 * DUA TAHAP DI LUAR BAB WAJIB
 * Materi 07 (nilai mutlak) dan Materi 10 (fungsi rasional) TIDAK ada di kedua buku
 * itu. Sudah diperiksa halaman demi halaman: nol kemunculan. Keduanya masuk
 * atas keputusan ARYA pada 1 September 2026 karena sering ditemui siswa di luar
 * bab wajib. Statusnya disebut terus terang di badan teksnya, bukan
 * disembunyikan, supaya siswa tahu mana yang bab sekolah dan mana yang bonus.
 *
 * BATAS DENGAN TOPIK LAIN
 * Grafik sin, cos, tan milik Trigonometri tahap 8 dan 9: di sini hanya dipakai
 * sebagai contoh transformasi, tidak diajarkan pembentukannya. Asimtot dan
 * perilaku menuju tak hingga milik Limit materi 07: di sini gambarnya
 * ditunjukkan dan namanya disebut, alasannya dirujuk ke sana.
 *
 * SELURUH ANGKA DI BERKAS INI DIPERIKSA MESIN dengan sympy, lewat
 * `python alat/cek_grafik_fungsi.py alat/materi-grafik-fungsi.json`.
 * Kalau ada angka yang diubah, jalankan lagi alat itu sebelum bilang selesai.
 */

import type { Tahap } from '@/content/tipe'

export type WidgetGrafikFungsi =
  | 'pembaca-grafik'
  | 'uji-garis-tegak'
  | 'bentuk-puncak'
  | 'wajah-parabola'
  | 'susun-parabola'
  | 'papan-transformasi'
  | 'lipat-mutlak'
  | 'balapan-tumbuh'
  | 'cermin-yx'
  | 'asimtot-rasional'
  | 'dua-mesin'
  | 'mesin-balik'
  | 'dunia-nyata-grafik'

/**
 * Bentuk Tahap dengan nama widget yang DIKETATKAN ke senarai di atas.
 * Tanpa ini, salah ketik nama widget baru ketahuan saat halamannya dibuka dan
 * panggungnya diam saja. Dengan ini, TypeScript menolaknya sebelum dijalankan.
 */
type TahapGrafik = Omit<Tahap, 'widget'> & { widget?: WidgetGrafikFungsi }

export const TAHAP: TahapGrafik[] = [
  /* ================================================================= */
  {
    no: 1,
    slug: 'grafik-bercerita',
    judul: 'Grafik itu bercerita',
    labelPendek: 'Membaca',
    pertanyaan: 'Apa yang sebenarnya diceritakan sebuah grafik?',
    intisari: [
      'Grafik adalah cerita tentang bagaimana satu hal berubah mengikuti hal lain.',
      'Yang dibaca orang: naik atau turun, seberapa curam, di mana tertinggi dan terendah.',
      'Sumbu-x dan sumbu-y bukan peta. Grafik yang menanjak belum tentu benda yang mendaki.',
      'Membaca grafik bisa dilakukan sebelum tahu satu pun rumusnya.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Anda sudah sering melihat grafik, walaupun mungkin tidak pernah menyebutnya begitu: grafik kasus penyakit di berita, grafik langkah harian di ponsel, grafik nilai rapor. Semuanya dibaca dengan cara yang sama, dan cara itu yang kita rapikan di sini.' },
      { jenis: 'paragraf', teks: 'Sebelum bicara rumus, mari lihat gambar dulu. Ini grafik perjalanan Ayu naik motor dari rumah ke sekolah. Sumbu-x adalah waktu dalam menit, sumbu-y adalah jarak dari rumah dalam kilometer.' },
      { jenis: 'paragraf', teks: 'Tidak ada rumus di sini, dan Anda memang tidak butuh rumus untuk membacanya. Yang Anda butuhkan cuma satu kebiasaan: baca grafiknya dari kiri ke kanan, seperti membaca kalimat.' },
      { jenis: 'sorot', teks: 'Bergerak ke kanan artinya waktu berjalan. Naik turunnya garis menceritakan apa yang terjadi pada saat itu.' },

      { jenis: 'sesi', judul: 'Lima potongan cerita dalam satu gambar' },
      {
        jenis: 'poin',
        judul: 'Baca dari kiri ke kanan',
        butir: [
          'Menit 0 sampai 2 - garisnya naik, jarak bertambah dari 0 ke 1 km. Ayu berangkat',
          'Menit 2 sampai 3 - garisnya MENDATAR. Jaraknya tidak berubah, jadi Ayu berhenti. Lampu merah',
          'Menit 3 sampai 6 - naik lagi, dan lebih curam. Jaraknya bertambah 3 km dalam 3 menit, jadi lebih cepat daripada tadi',
          'Menit 6 sampai 7 - garisnya TURUN, dari 4 km ke 3 km. Jaraknya berkurang, berarti Ayu berbalik arah. Dompetnya ketinggalan',
          'Menit 7 sampai 10 - naik lagi sampai 6 km. Ayu melanjutkan perjalanan dan sampai',
        ],
      },
      { jenis: 'paragraf', teks: 'Perhatikan bahwa Anda baru saja menceritakan sepuluh menit perjalanan orang lain hanya dengan melihat garis. Itulah gunanya grafik: satu gambar menggantikan satu paragraf.' },

      { jenis: 'sesi', judul: 'Empat hal yang selalu dicari orang di sebuah grafik' },
      {
        jenis: 'poin',
        butir: [
          'Naik atau turun - apakah nilainya bertambah atau berkurang saat bergerak ke kanan',
          'Seberapa curam - makin tegak garisnya, makin cepat perubahannya',
          'Titik tertinggi dan terendah - kapan nilainya paling besar dan paling kecil',
          'Titik potong dengan sumbu - di mana nilainya nol, dan berapa nilainya saat dimulai',
        ],
      },
      { jenis: 'paragraf', teks: 'Keempat hal itu berlaku untuk grafik apa pun: harga cabai sebulan terakhir, suhu badan pasien, jumlah penonton sebuah video, atau tinggi bola yang dilempar. Isi ceritanya berbeda, tapi cara membacanya sama persis.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya adalah grafik perjalanan Ayu tadi. Seret penunjuknya menyusuri garisnya.',
        langkah: [
          'Tarik penunjuk pelan-pelan dari kiri ke kanan',
          'Perhatikan keterangan di bawah gambar berganti sendiri saat Anda melewati batas potongan cerita',
          'Berhentilah di menit ke-6 sampai ke-7, bagian yang menurun. Baca keterangannya baik-baik',
          'Cari titik tertinggi. Apakah titik tertinggi itu berarti Ayu paling cepat di sana?',
        ],
      },

      { jenis: 'sesi', judul: 'Satu hal yang harus diluruskan sekarang juga' },
      { jenis: 'paragraf', teks: 'Grafik tadi menanjak di menit 3 sampai 6. Menanjak di sini BUKAN berarti jalanannya menanjak. Sumbu-y berisi jarak dari rumah, bukan ketinggian tanah. Yang naik adalah angkanya, bukan Ayu.' },
      { jenis: 'paragraf', teks: 'Kekeliruan ini terdengar sepele, tapi ia terbawa terus. Nanti saat melihat grafik keuntungan perusahaan yang menurun, orang yang sama akan membayangkan sesuatu yang meluncur ke bawah, padahal yang terjadi adalah angkanya mengecil.' },
      { jenis: 'sorot', teks: 'Selalu baca dulu: sumbu-x berisi apa, dan sumbu-y berisi apa. Tanpa itu, grafik yang sama bisa diceritakan dengan dua cara yang bertentangan.' },
    ],
    seringKeliru: {
      judul: 'Grafik yang naik berarti bendanya naik ke atas',
      isi: 'Godaannya kuat karena kata naik memang berarti bergerak ke atas di dunia nyata, dan mata langsung membacanya begitu. Padahal yang naik adalah nilai pada sumbu-y, dan isinya belum tentu ketinggian. Pada grafik perjalanan Ayu, sumbu-y berisi jarak dari rumah. Garis yang menanjak berarti Ayu makin jauh dari rumah, bukan Ayu sedang mendaki. Kalau sumbu-y diganti menjadi ketinggian tanah, gambar yang sama akan bercerita hal yang berbeda.',
    },
    widget: 'pembaca-grafik',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 2,
    slug: 'potret-aturan',
    judul: 'Potret sebuah aturan',
    labelPendek: 'Fungsi?',
    pertanyaan: 'Setiap gambar di bidang koordinat itu grafik fungsi, bukan?',
    intisari: [
      'Fungsi itu mesin: satu masukan menghasilkan tepat satu keluaran.',
      'Grafik adalah kumpulan titik (x, f(x)), yaitu jejak mesin itu dijalankan berkali-kali.',
      'Uji garis tegak: kalau ada garis tegak yang memotong dua kali, gambarnya bukan grafik fungsi.',
      'Domain adalah x yang boleh dimasukkan, range adalah y yang mungkin keluar.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Materi 01 membaca grafik yang sudah jadi. Sekarang kebalikannya: dari mana grafik itu datang?' },
      { jenis: 'paragraf', teks: 'Bayangkan sebuah mesin. Anda masukkan sebuah angka, mesin mengolahnya, lalu mengeluarkan satu angka. Mesin itulah yang disebut fungsi. Aturannya boleh apa saja, misalnya "kalikan dua lalu tambah satu".' },
      { jenis: 'paragraf', teks: 'Sebelum melangkah, ingat garis lurus yang sudah Anda pelajari di SMP: y = mx + c, dengan m kemiringannya dan c tempat grafiknya memotong sumbu y. Itu fungsi juga, dan mesin di bawah ini persis garis itu.' },
      {
        jenis: 'contoh',
        judul: 'Jalankan mesin f(x) = 2x + 1 lima kali',
        baris: [
          'masuk -2   2(-2) + 1 = -3   titik (-2, -3)',
          'masuk -1   2(-1) + 1 = -1   titik (-1, -1)',
          'masuk 0   2(0) + 1 = 1   titik (0, 1)',
          'masuk 1   2(1) + 1 = 3   titik (1, 3)',
          'masuk 2   2(2) + 1 = 5   titik (2, 5)',
        ],
        simpul: 'Kelima titik itu diplot, lalu titik-titik lain di antaranya ikut dihitung. Yang terbentuk adalah garis lurus.',
      },
      { jenis: 'sorot', teks: 'Grafik bukan bentuk yang harus dihafal. Grafik adalah jejak dari menjalankan aturannya berkali-kali.' },
      { jenis: 'paragraf', teks: 'Kalimat itu terdengar biasa, tapi ia yang membedakan siswa yang menghafal dari siswa yang mengerti. Kalau grafik adalah jejak sebuah aturan, maka mengubah aturannya sedikit akan mengubah jejaknya dengan cara yang bisa ditebak. Seluruh sisa topik ini berdiri di atas kalimat itu.' },

      { jenis: 'sesi', judul: 'Satu masukan, satu keluaran. Tidak boleh lebih' },
      { jenis: 'paragraf', teks: 'Ada satu syarat yang membuat sebuah mesin layak disebut fungsi: satu masukan hanya boleh menghasilkan satu keluaran. Mesin yang kadang mengeluarkan 3 dan kadang mengeluarkan -3 untuk masukan yang sama bukan fungsi, ia mesin rusak.' },
      { jenis: 'paragraf', teks: 'Sekarang lihat akibatnya pada gambar. Semua titik dengan nilai x yang sama berjajar pada satu garis tegak. Jadi kalau ada garis tegak yang memotong gambarnya di dua tempat, berarti ada satu x dengan dua y sekaligus.' },
      { jenis: 'sorot', teks: 'Uji garis tegak: geser sebuah garis tegak menyusuri gambarnya. Kalau ada satu saja posisi yang memotong lebih dari sekali, gambar itu bukan grafik fungsi.' },
      {
        jenis: 'contoh',
        judul: 'Lingkaran gagal uji ini',
        baris: [
          'lingkaran berjari-jari 5   x² + y² = 25',
          'masukkan x = 3   9 + y² = 25',
          '   y² = 16',
          '   y = 4 atau y = -4',
        ],
        simpul: 'Satu masukan, dua keluaran. Jadi lingkaran punya rumus, tetapi bukan grafik fungsi.',
      },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya berisi lima gambar. Seret garis tegaknya ke kiri dan ke kanan pada tiap gambar.',
        langkah: [
          'Mulai dari garis lurus. Geser garis tegaknya ke mana pun, dan hitung berapa kali garis itu memotong grafik.',
          'Pindah ke lingkaran. Cari posisi garis tegak yang memotongnya dua kali, lalu perhatikan vonis alatnya.',
          'Coba parabola tidur, lalu grafik tangga. Perhatikan vonisnya pada tiap gambar.',
          'Dari kelima gambar, mana yang lolos dan mana yang gagal? Apa satu-satunya hal yang membedakan keduanya?',
        ],
      },

      { jenis: 'sesi', judul: 'Domain dan range, dibaca dari gambarnya' },
      {
        jenis: 'poin',
        butir: [
          'Domain - kumpulan semua x yang boleh dimasukkan. Pada gambar: seberapa jauh grafiknya melebar ke kiri dan ke kanan',
          'Range - kumpulan semua y yang mungkin keluar. Pada gambar: seberapa jauh grafiknya naik dan turun',
        ],
      },
      { jenis: 'paragraf', teks: 'Untuk f(x) = 2x + 1, apa pun boleh dimasukkan dan apa pun bisa keluar, jadi domain dan rangenya semua bilangan real. Tapi tidak semua fungsi seberuntung itu. Akar kuadrat menolak bilangan negatif, dan pembagian menolak penyebut nol. Keduanya akan kita temui nanti di materi 09 dan 10.' },
    ],
    seringKeliru: {
      judul: 'Lingkaran itu fungsi karena rumusnya ada',
      isi: 'Punya rumus bukan syaratnya. Syaratnya satu masukan menghasilkan satu keluaran. Pada lingkaran x² + y² = 25, masukan x = 3 menghasilkan y = 4 dan y = -4 sekaligus, jadi ia gagal. Yang benar: lingkaran adalah kurva yang bagus dan berguna, tetapi ia bukan grafik fungsi. Kalau dipotong jadi setengah lingkaran atas saja, barulah ia menjadi fungsi.',
    },
    widget: 'uji-garis-tegak',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 3,
    slug: 'bentuk-puncak',
    judul: 'Parabola dan bentuk puncak',
    labelPendek: 'Puncak',
    pertanyaan: 'Kenapa satu angka bisa memindahkan seluruh parabola?',
    intisari: [
      'Bentuk puncak y = a(x - h)² + k bisa dibaca langsung tanpa dihitung.',
      'Puncaknya persis di (h, k), dan sumbu simetrinya garis tegak x = h.',
      'Tanda a menentukan arah bukaan, besar a menentukan lebar sempitnya.',
      'Tanda minus di dalam kurung menggeser ke KANAN, bukan ke kiri.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Bola basket yang dilempar membentuk lengkung. Air mancur juga. Kabel jembatan gantung juga. Ketiganya bentuk yang sama, namanya parabola, dan itu grafik fungsi kuadrat.' },
      { jenis: 'paragraf', teks: 'Buku Kelas 10 memperkenalkan fungsi kuadrat lewat lintasan bola basket, dan kita mulai dari tempat yang sama. Tapi rumusnya kita tulis dulu dalam bentuk yang puncaknya bisa dibaca langsung.' },
      { jenis: 'sorot', teks: 'y = a(x - h)² + k' },
      { jenis: 'paragraf', teks: 'Bentuk ini namanya bentuk puncak. Alasannya sederhana: puncaknya bisa dibaca langsung dari rumusnya, tanpa satu pun hitungan.' },

      { jenis: 'sesi', judul: 'Kenapa puncaknya tepat di (h, k)' },
      { jenis: 'paragraf', teks: 'Perhatikan bagian (x - h)². Apa pun isinya, dikuadratkan pasti nol atau positif. Jadi bagian itu tidak pernah negatif, dan nilai terkecilnya adalah nol.' },
      { jenis: 'paragraf', teks: 'Kapan ia nol? Hanya saat x = h. Di situlah kurungnya kosong, dan yang tersisa cuma k. Jadi kalau a positif, titik itulah yang paling rendah.' },
      {
        jenis: 'contoh',
        judul: 'Coba pada y = 2(x - 3)² - 5',
        baris: [
          'x = 3   2(3 - 3)² - 5 = 2(0) - 5 = -5, paling rendah',
          'x = 4   2(4 - 3)² - 5 = 2(1) - 5 = -3',
          'x = 2   2(2 - 3)² - 5 = 2(1) - 5 = -3, sama dengan x = 4',
          'x = 5   2(5 - 3)² - 5 = 2(4) - 5 = 3',
          'x = 1   2(1 - 3)² - 5 = 2(4) - 5 = 3, sama dengan x = 5',
        ],
        simpul: 'Puncaknya (3, -5). Dan perhatikan: yang sama jauhnya dari x = 3 selalu punya nilai yang sama.',
      },
      { jenis: 'paragraf', teks: 'Kesamaan berpasangan itulah yang membuat parabola terlihat simetris. Garis tegak x = 3 membelahnya menjadi dua sisi yang saling bayangan. Garis itu namanya sumbu simetri.' },

      { jenis: 'sesi', judul: 'Peran a: arah dan lebar' },
      {
        jenis: 'poin',
        judul: 'Yang ditentukan oleh a',
        butir: [
          'a positif - parabolanya terbuka ke atas, puncaknya titik terendah',
          'a negatif - parabolanya terbuka ke bawah, puncaknya titik tertinggi',
          'a besar - parabolanya sempit dan curam, misalnya a = 3',
          'a kecil mendekati nol - parabolanya melebar dan melandai, misalnya a = 0,2',
          'a nol - bukan parabola lagi. Suku x² hilang dan yang tersisa garis lurus',
        ],
      },
      { jenis: 'paragraf', teks: 'Peran a ini bukan hafalan yang dikarang. Buku Kelas 10 justru membuat siswa menemukannya sendiri: sepuluh grafik digambar, lalu dikelompokkan mana yang terbuka ke atas dan mana yang ke bawah, sampai kesimpulannya muncul dari pengamatan.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya punya tiga penggeser: a, h, dan k. Kurva sebelumnya tertinggal sebagai bayangan supaya Anda melihat perpindahannya, bukan cuma hasil akhirnya.',
        langkah: [
          'Geser k saja. Perhatikan apa yang terjadi pada letak parabola dan pada bentuknya.',
          'Geser h saja. Sekarang ke arah mana parabola bergerak?',
          'Perhatikan baik-baik: saat h Anda besarkan, ke arah mana parabolanya pergi? Sesuai dugaan Anda, atau kebalikannya?',
          'Terakhir, geser a sampai melewati nol. Apa yang terjadi pada arah bukaan parabola?',
        ],
      },

      { jenis: 'sesi', judul: 'Jebakan tanda, dan kenapa jawabannya masuk akal' },
      { jenis: 'paragraf', teks: 'Ini bagian yang paling sering salah, jadi kita pelankan. Pada y = (x - 3)², tanda di dalam kurung adalah minus, tetapi parabolanya bergeser ke KANAN sejauh 3.' },
      { jenis: 'paragraf', teks: 'Terasa terbalik? Memang. Tapi alasannya sebenarnya sederhana, dan begitu Anda melihatnya sekali, Anda tidak akan lupa lagi.' },
      {
        jenis: 'poin',
        judul: 'Ikuti alasannya, jangan dihafal',
        butir: [
          'Titik terendah terjadi saat isi kurungnya nol',
          'Isi kurungnya x - 3, dan itu nol saat x bernilai 3',
          'Jadi titik terendahnya pindah ke x = 3, yaitu ke kanan',
          'Kalau kurungnya x + 3, ia nol saat x bernilai -3, jadi pindahnya ke kiri',
        ],
      },
      { jenis: 'sorot', teks: 'Bukan tandanya yang dibaca, melainkan angka yang membuat kurungnya kosong.' },
    ],
    seringKeliru: {
      judul: 'Tanda minus di dalam kurung berarti geser ke kiri',
      isi: 'Justru ke kanan. Yang menentukan letak puncak bukan tanda yang tertulis, melainkan nilai x yang membuat isi kurungnya menjadi nol. Pada (x - 3)², isi kurungnya nol saat x = 3, jadi puncaknya di kanan. Pada (x + 3)², isi kurungnya nol saat x = -3, jadi puncaknya di kiri. Aturan ini akan muncul lagi di materi 06 dalam bentuk yang lebih umum, dan berlaku untuk semua fungsi, bukan cuma parabola.',
    },
    widget: 'bentuk-puncak',
    video: { berkas: 'grafik3-puncak.mp4', poster: 'grafik3-puncak.jpg' },
    siap: true,
  },

  /* ================================================================= */
  {
    no: 4,
    slug: 'bentuk-umum',
    judul: 'Bentuk umum dan diskriminan',
    labelPendek: 'Umum',
    pertanyaan: 'Kalau rumusnya ditulis ax² + bx + c, puncaknya di mana?',
    intisari: [
      'Bentuk umum adalah bentuk puncak yang kurungnya sudah dijabarkan.',
      'Sumbu simetrinya x = -b/2a, dan ordinat puncaknya didapat dengan mensubstitusi nilai itu.',
      'Melengkapkan kuadrat mengembalikan bentuk umum menjadi bentuk puncak.',
      'Diskriminan D = b² - 4ac menentukan berapa kali grafiknya memotong sumbu x.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Parabola jembatan gantung dari materi 03 tidak berubah bentuknya sedikit pun di materi ini. Yang berubah cuma cara menuliskannya, dan itu penting karena buku dan soal ujian hampir selalu memakai tulisan yang satu lagi.' },
      { jenis: 'paragraf', teks: 'Bentuk yang dipakai buku dan soal ujian:' },
      { jenis: 'sorot', teks: 'y = ax² + bx + c' },
      { jenis: 'paragraf', teks: 'Namanya bentuk umum. Bentuk ini tidak seramah bentuk puncak, karena puncaknya tidak kelihatan. Tapi ia bukan parabola jenis lain. Ia parabola yang sama, cuma kurungnya sudah dijabarkan.' },
      {
        jenis: 'contoh',
        judul: 'Buktikan sendiri: jabarkan bentuk puncak',
        baris: [
          'mulai dari      y = 2(x - 1)² - 18',
          'jabarkan kurung y = 2(x² - 2x + 1) - 18',
          'kalikan 2       y = 2x² - 4x + 2 - 18',
          'rapikan         y = 2x² - 4x - 16',
        ],
        simpul: 'Dua tulisan yang berbeda, satu parabola yang sama persis.',
      },

      { jenis: 'sesi', judul: 'Dua jalan menemukan puncaknya kembali' },
      { jenis: 'paragraf', teks: 'Cara pertama memakai rumus sumbu simetri, dan ini yang paling cepat di ujian.' },
      {
        jenis: 'contoh',
        judul: 'Cara 1: lewat sumbu simetri x = -b/2a',
        baris: [
          'y = 2x² - 4x - 16   jadi a = 2, b = -4, c = -16',
          'sumbu simetri   x = -(-4) : (2 × 2) = 4 : 4 = 1',
          'substitusi x = 1   y = 2(1)² - 4(1) - 16',
          '   y = 2 - 4 - 16 = -18',
        ],
        simpul: 'Puncaknya (1, -18).',
      },
      { jenis: 'paragraf', teks: 'Cara kedua namanya melengkapkan kuadrat. Lebih panjang, tetapi ia tidak sekadar memberi jawaban: ia mengembalikan rumusnya ke bentuk puncak, sehingga seluruh isi materi 03 bisa dipakai lagi.' },
      {
        jenis: 'contoh',
        judul: 'Cara 2: melengkapkan kuadrat',
        baris: [
          'y = 2x² - 4x - 16',
          'keluarkan 2 dari dua suku depan   y = 2(x² - 2x) - 16',
          'setengah dari -2 adalah -1        (x - 1)² = x² - 2x + 1',
          'jadi x² - 2x sama dengan          (x - 1)² - 1',
          'masukkan kembali                  y = 2[(x - 1)² - 1] - 16',
          'kalikan 2                         y = 2(x - 1)² - 2 - 16',
          'rapikan                           y = 2(x - 1)² - 18',
        ],
        simpul: 'Bentuk puncak kembali. Puncaknya (1, -18), sama dengan cara pertama.',
      },
      { jenis: 'paragraf', teks: 'Peran c juga bisa dibaca tanpa hitungan. Masukkan x = 0, maka suku ax² dan bx keduanya hilang, dan yang tersisa cuma c. Jadi grafiknya selalu memotong sumbu y di titik (0, c). Pada contoh kita, di (0, -16).' },

      { jenis: 'sesi', judul: 'Diskriminan: berapa kali grafiknya menyentuh sumbu x' },
      { jenis: 'paragraf', teks: 'Sekarang pertanyaan yang berbeda. Di mana grafiknya memotong sumbu x, yaitu di mana y bernilai nol? Jawabannya ditentukan oleh satu angka saja, namanya diskriminan.' },
      { jenis: 'sorot', teks: 'D = b² - 4ac' },
      {
        jenis: 'poin',
        judul: 'Tiga kemungkinan, dan cuma tiga',
        butir: [
          'D lebih dari nol - dua akar berbeda, grafiknya memotong sumbu x di dua titik',
          'D sama dengan nol - dua akar kembar, grafiknya menyinggung sumbu x di satu titik',
          'D kurang dari nol - tidak ada akar real, grafiknya tidak menyentuh sumbu x sama sekali',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Hitung untuk y = 2x² - 4x - 16',
        baris: [
          'D = b² - 4ac',
          'D = (-4)² - 4(2)(-16)',
          'D = 16 + 128 = 144   D lebih dari nol, jadi dua titik potong',
          'akarnya   x = (4 ± 12) : 4',
          '   x = 16 : 4 = 4 dan x = -8 : 4 = -2',
        ],
        simpul: 'Memotong sumbu x di (-2, 0) dan (4, 0).',
      },
      { jenis: 'paragraf', teks: 'Kita sekarang tahu segalanya tentang parabola ini tanpa menggambarnya: terbuka ke atas karena a positif, puncaknya di (1, -18), memotong sumbu y di (0, -16), dan memotong sumbu x di (-2, 0) dan (4, 0). Angka-angka ini persis contoh Uji Kompetensi Bab 6 di buku Kelas 10.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menampilkan bentuk umum dan bentuk puncak berdampingan pada satu parabola yang sama.',
        langkah: [
          'Tekan tombol maju untuk menjalankan melengkapkan kuadrat selangkah demi selangkah.',
          'Pada tiap langkah, perhatikan bagian rumus yang disorot dan bagian grafik yang ikut menyala.',
          'Ubah nilai c sampai tanda D berubah. Apa yang terjadi pada titik potong dengan sumbu x?',
          'Cari nilai c yang membuat D tepat nol. Berapa titik potongnya saat itu?',
        ],
      },
    ],
    seringKeliru: {
      judul: 'D negatif berarti grafiknya tidak ada',
      isi: 'Godaannya masuk akal: di banyak soal, D negatif memang berarti tidak ada jawaban, jadi kata tidak ada terbawa ke grafiknya sekalian. Padahal yang tidak ada cuma akarnya. Grafiknya tetap ada, tetap parabola utuh, dan tetap bisa digambar. Yang tidak ada adalah titik potongnya dengan sumbu x. Parabola dengan D negatif melayang seluruhnya di satu sisi sumbu x, entah semuanya di atas atau semuanya di bawah. Contohnya y = x² + 4: D = 0 - 4(1)(4) = -16, dan memang grafiknya ada di atas sumbu x sepenuhnya, dengan puncak di (0, 4).',
    },
    widget: 'wajah-parabola',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 5,
    slug: 'menyusun-parabola',
    judul: 'Menyusun rumus dari gambarnya',
    labelPendek: 'Menyusun',
    pertanyaan: 'Kalau yang diketahui gambarnya, bagaimana menemukan rumusnya?',
    intisari: [
      'Bentuk faktor y = a(x - p)(x - q) memperlihatkan titik potong sumbu x secara langsung.',
      'Diketahui puncak dan satu titik lain: pakai bentuk puncak.',
      'Diketahui dua titik potong sumbu x dan satu titik lain: pakai bentuk faktor.',
      'Satu parabola bisa ditulis tiga cara, dan ketiganya benar.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Sampai sini kita selalu mulai dari rumus lalu menggambar. Di dunia nyata urutannya justru sering terbalik: yang ada datanya, dan rumusnya yang harus dicari.' },
      { jenis: 'paragraf', teks: 'Sebelum itu, satu bentuk terakhir perlu diperkenalkan.' },
      { jenis: 'sorot', teks: 'y = a(x - p)(x - q)' },
      { jenis: 'paragraf', teks: 'Namanya bentuk faktor. Kegunaannya persis seperti bentuk puncak, hanya saja yang terbaca langsung bukan puncaknya, melainkan titik potongnya dengan sumbu x.' },
      { jenis: 'paragraf', teks: 'Alasannya sama seperti materi 03. Hasil kali dua bilangan bernilai nol kalau salah satunya nol. Jadi y bernilai nol saat x = p atau saat x = q, dan di kedua tempat itulah grafiknya menyentuh sumbu x.' },

      { jenis: 'sesi', judul: 'Satu parabola, tiga cara menulisnya' },
      { jenis: 'paragraf', teks: 'Mari kita lihat parabola yang sama dari materi 04, sekarang dalam ketiga bentuknya sekaligus.' },
      {
        jenis: 'contoh',
        judul: 'Ketiganya adalah parabola yang sama',
        baris: [
          'bentuk umum   y = 2x² - 4x - 16',
          'bentuk puncak   y = 2(x - 1)² - 18, puncaknya terbaca: (1, -18)',
          'bentuk faktor   y = 2(x + 2)(x - 4), akarnya terbaca: -2 dan 4',
        ],
        simpul: 'Jabarkan yang mana pun, Anda selalu kembali ke 2x² - 4x - 16.',
      },
      { jenis: 'sorot', teks: 'Tidak ada bentuk yang paling benar. Yang dipilih adalah bentuk yang paling cocok dengan apa yang sudah diketahui.' },

      { jenis: 'sesi', judul: 'Tiga cara menyusun, sesuai apa yang diketahui' },
      { jenis: 'paragraf', teks: 'Buku Kelas 10 mendaftar tiga situasi, dan ketiganya memang yang muncul di soal.' },
      {
        jenis: 'contoh',
        judul: 'Cara 1: diketahui puncak dan satu titik lain',
        baris: [
          'puncak (2, 8), melalui (0, 4)',
          'mulai dari bentuk puncak     y = a(x - 2)² + 8',
          'masukkan titik (0, 4)        4 = a(0 - 2)² + 8',
          '                             4 = 4a + 8',
          '                            -4 = 4a',
          '                             a = -1',
        ],
        simpul: 'Jawabannya y = -(x - 2)² + 8, atau kalau dijabarkan y = -x² + 4x + 4.',
      },
      {
        jenis: 'contoh',
        judul: 'Cara 2: diketahui dua titik potong sumbu x dan satu titik lain',
        baris: [
          'memotong sumbu x di -2 dan 4, melalui (0, -16)',
          'mulai dari bentuk faktor     y = a(x + 2)(x - 4)',
          'masukkan titik (0, -16)    -16 = a(0 + 2)(0 - 4)',
          '                           -16 = a(2)(-4)',
          '                           -16 = -8a',
          '                             a = 2',
        ],
        simpul: 'Jawabannya y = 2(x + 2)(x - 4), yaitu parabola contoh kita tadi.',
      },
      {
        jenis: 'poin',
        judul: 'Cara 3: diketahui tiga titik sembarang',
        butir: [
          'Pakai bentuk umum y = ax² + bx + c',
          'Masukkan ketiga titik satu per satu, sehingga terbentuk tiga persamaan',
          'Pecahkan ketiganya bersama untuk mendapat a, b, dan c',
          'Cara ini paling panjang, jadi pakai hanya kalau puncak dan akarnya memang tidak diketahui',
        ],
      },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya membalik arahnya: Anda yang menentukan gambarnya, rumusnya yang mengikuti.',
        langkah: [
          'Seret titik puncaknya ke mana saja, lalu perhatikan ketiga rumus di sampingnya.',
          'Seret titik kedua untuk mengubah lebar dan arah parabolanya.',
          'Coba buat parabola yang tidak memotong sumbu x sama sekali. Apa yang terjadi pada bentuk faktornya? Bacalah keterangannya.',
          'Coba tempatkan titik kedua tepat di atas puncak. Apa yang dilakukan alatnya, dan menurut Anda kenapa?',
        ],
      },
      { jenis: 'paragraf', teks: 'Bentuk faktor menghilang saat parabolanya tidak memotong sumbu x, dan itu bukan kerusakan. Bentuk faktor dibangun dari akar-akarnya, jadi kalau akarnya tidak ada, bentuk itu memang tidak bisa ditulis. Bentuk umum dan bentuk puncak tetap ada, karena keduanya tidak bergantung pada akar.' },
    ],
    seringKeliru: {
      judul: 'Kalau titik potongnya -2 dan 3, rumusnya (x + 2)(x + 3)',
      isi: 'Godaannya wajar: akarnya memang tertulis -2, jadi tangan langsung menyalin tanda minusnya menjadi (x - 2), atau menyalin angkanya apa adanya menjadi (x + 2)(x + 3). Padahal yang dikurangkan adalah akarnya, jadi bentuknya (x - p)(x - q). Untuk akar -2 dan 3, hasilnya (x - (-2))(x - 3), yaitu (x + 2)(x - 3). Cara mengeceknya cepat: masukkan x = 3 dan lihat apakah hasilnya nol. Pada (x + 2)(x - 3) hasilnya 5 kali 0 sama dengan nol, jadi benar. Pada (x + 2)(x + 3) hasilnya 5 kali 6 sama dengan 30, jelas bukan nol, jadi salah.',
    },
    widget: 'susun-parabola',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 6,
    slug: 'geser-cermin-regang',
    judul: 'Geser, cermin, regang',
    labelPendek: 'Transformasi',
    pertanyaan: 'Apakah aturan geser tadi cuma berlaku untuk parabola?',
    intisari: [
      'Angka di luar kurung mengerjakan apa yang tertulis. Angka di dalam kurung mengerjakan kebalikannya.',
      'f(x) + k menggeser ke atas, f(x - h) menggeser ke kanan.',
      'Tanda minus di luar mencerminkan terhadap sumbu x, tanda minus di dalam terhadap sumbu y.',
      'Aturan ini berlaku untuk semua fungsi, bukan cuma parabola.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Ini bagian tengah topik, dan yang paling berharga. Kalau Anda hanya sempat memahami satu materi dengan benar, pilih materi ini.' },
      { jenis: 'paragraf', teks: 'Di materi 03, h dan k memindahkan parabola. Pertanyaannya sekarang: apakah itu sifat khusus parabola, atau berlaku lebih luas? Jawabannya berlaku lebih luas, dan jauh lebih luas daripada yang biasanya disadari siswa.' },
      { jenis: 'sorot', teks: 'Apa pun bentuk grafik awalnya, keenam perlakuan di bawah ini selalu memberi akibat yang sama.' },

      { jenis: 'sesi', judul: 'Enam perlakuan, dan akibatnya pada gambar' },
      {
        jenis: 'poin',
        judul: 'Yang ditulis di LUAR kurung',
        butir: [
          'f(x) + k - seluruh grafik naik sejauh k. Kalau k negatif, turun',
          'a f(x) - grafiknya diregangkan tegak a kali, jadi lebih tinggi atau lebih pendek',
          'minus f(x) - dicerminkan terhadap sumbu x, terbalik atas bawah',
        ],
      },
      {
        jenis: 'poin',
        judul: 'Yang ditulis di DALAM kurung',
        butir: [
          'f(x - h) - seluruh grafik geser ke kanan sejauh h. Perhatikan tandanya',
          'f(bx) - grafiknya diregangkan mendatar 1/b kali. Kalau b = 2, lebarnya jadi SETENGAH',
          'f(minus x) - dicerminkan terhadap sumbu y, terbalik kiri kanan',
        ],
      },
      { jenis: 'paragraf', teks: 'Daftar itu terlihat seperti enam hafalan terpisah, dan begitulah biasanya ia diajarkan. Padahal keenamnya hanya dua kalimat.' },
      { jenis: 'sorot', teks: 'Angka yang ada di LUAR kurung mengerjakan apa yang tertulis. Angka yang masuk ke DALAM kurung mengerjakan kebalikannya.' },

      { jenis: 'sesi', judul: 'Kenapa yang di dalam kurung bekerja terbalik' },
      { jenis: 'paragraf', teks: 'Ini pertanyaan yang jarang dijawab di sekolah, padahal jawabannya bisa dimengerti siswa kelas 10.' },
      { jenis: 'paragraf', teks: 'Yang ada di luar kurung mengubah HASILNYA. Mesin sudah selesai bekerja, lalu hasilnya ditambah atau dikalikan. Wajar kalau akibatnya persis seperti yang tertulis.' },
      { jenis: 'paragraf', teks: 'Yang ada di dalam kurung mengubah MASUKANNYA, sebelum mesin bekerja. Jadi untuk mendapat keluaran yang sama seperti sebelumnya, Anda harus memberi x yang berbeda. Itulah yang memindahkan grafiknya.' },
      {
        jenis: 'contoh',
        judul: 'Lihat pada f(x) = x², lalu f(2x)',
        baris: [
          'fungsi asli    f(x) = x²        f(2) = 4       titik (2, 4)',
          'fungsi baru    g(x) = (2x)²     g(1) = 4       titik (1, 4)',
          '',
          'nilai 4 yang tadinya muncul di x = 2, sekarang muncul di x = 1',
        ],
        simpul: 'Jadi grafiknya memampat ke SETENGAH lebarnya, bukan jadi dua kali lebih lebar.',
      },
      { jenis: 'paragraf', teks: 'Cara mengingatnya begini: kalau x sudah dikalikan dua sebelum masuk mesin, maka mesinnya sampai ke nilai yang sama pada x yang setengahnya. Semua kejadian pada grafiknya terjadi lebih awal, jadi grafiknya terlihat mampat.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya berisi tiga fungsi dasar dan enam tombol transformasi. Bentuk aslinya tertinggal sebagai bayangan.',
        langkah: [
          'Mulai dari parabola. Tekan geser kanan, lalu geser atas, dan perhatikan rumus di bawahnya tersusun.',
          'Tekan tombol bersihkan, ganti fungsi dasarnya menjadi akar, lalu ulangi kedua tombol tadi.',
          'Bandingkan kedua percobaan: apa yang berbeda, dan apa yang persis sama?',
          'Sekarang coba cermin terhadap sumbu y pada parabola. Kenapa parabolanya terlihat tidak berubah?',
        ],
      },
      { jenis: 'paragraf', teks: 'Pertanyaan terakhir itu bukan jebakan. Parabola y = x² memang sudah simetris terhadap sumbu y sejak awal, jadi mencerminkannya menghasilkan gambar yang sama. Coba tombol yang sama pada fungsi akar, dan bedanya langsung terlihat.' },

      { jenis: 'sesi', judul: 'Berlaku juga untuk grafik yang belum kita pelajari' },
      { jenis: 'paragraf', teks: 'Salah satu fungsi dasar di alat itu adalah kurva sinus, yang bentuknya bergelombang. Kurva itu milik topik Trigonometri, dan pembentukannya dijelaskan lengkap di sana pada materi 08.' },
      { jenis: 'paragraf', teks: 'Di sini ia dipakai untuk satu keperluan saja: membuktikan bahwa aturan tadi tidak peduli bentuk grafiknya. Gelombang yang digeser ke kanan tetap bergeser ke kanan, dan f(2x) tetap memampatkannya jadi setengah. Anda belum perlu tahu dari mana gelombang itu berasal untuk melihat itu.' },
      { jenis: 'sorot', teks: 'Enam aturan tadi dipelajari sekali, lalu dipakai di sisa topik ini dan di topik lain. Materi 07, 9, dan 10 semuanya berdiri di atasnya.' },
    ],
    seringKeliru: {
      judul: 'f(2x) berarti grafiknya jadi dua kali lebih lebar',
      isi: 'Godaannya kuat karena mengalikan dua di mana pun biasanya berarti membesarkan, dan itu benar untuk angka yang di LUAR kurung. Di dalam kurung akibatnya justru terbalik: hasilnya setengahnya. Angka 2 mengalikan x sebelum masuk mesin, jadi mesinnya mencapai nilai yang sama pada x yang setengahnya, dan seluruh kejadian pada grafik terjadi lebih awal. Cek cepat pada f(x) = x²: nilai 4 muncul di x = 2, tetapi pada f(2x) nilai 4 sudah muncul di x = 1. Yang membuat grafik dua kali lebih lebar justru f(x/2), karena di situ x dibagi dua dulu.',
    },
    widget: 'papan-transformasi',
    video: { berkas: 'grafik6-transformasi.mp4', poster: 'grafik6-transformasi.jpg' },
    siap: true,
  },

  /* ================================================================= */
  {
    no: 7,
    slug: 'nilai-mutlak',
    judul: 'Nilai mutlak, cara melipat grafik',
    labelPendek: 'Mutlak',
    pertanyaan: 'Apa yang terjadi kalau bagian grafik di bawah sumbu dipaksa naik?',
    intisari: [
      'Nilai mutlak adalah jarak dari nol, jadi hasilnya tidak pernah negatif.',
      'y = |f(x)| melipat bagian yang di bawah sumbu x ke atas.',
      'y = f(|x|) membuang bagian kiri, lalu menyalin bagian kanan sebagai cerminnya.',
      'Keduanya berbeda, dan bedanya langsung terlihat begitu digambar.',
    ],
    penjelasan: [
      {
        jenis: 'poin',
        judul: 'Catatan sebelum mulai',
        butir: [
          'Bahan ini pengayaan, bukan bab wajib: fungsi nilai mutlak tidak ada di buku Kelas 10 maupun Kelas 11',
          'Tetap dipelajari - karena sering muncul di soal seleksi masuk perguruan tinggi dan di bimbingan belajar',
          'Modalnya sudah ada - seluruh materi ini cuma penerapan aturan materi 06',
        ],
      },
      { jenis: 'paragraf', teks: 'Nilai mutlak sebenarnya sudah Anda kenal sejak SMP. Lambangnya dua garis tegak, dan artinya jarak dari nol.' },
      {
        jenis: 'contoh',
        judul: 'Jarak tidak pernah negatif',
        baris: [
          '| 5 | = 5   jaraknya 5 langkah dari nol',
          '| -5 | = 5   juga 5 langkah dari nol, cuma arahnya berbeda',
          '| 0 | = 0',
          '| -0,3 | = 0,3',
        ],
        simpul: 'Yang masuk boleh negatif, yang keluar tidak pernah negatif.',
      },

      { jenis: 'sesi', judul: 'Grafik y = |x|, bentuk V' },
      { jenis: 'paragraf', teks: 'Coba jalankan mesin |x| seperti di materi 02. Untuk x positif, hasilnya sama dengan x sendiri, jadi grafiknya garis miring naik. Untuk x negatif, tandanya dibalik, jadi grafiknya garis miring turun.' },
      { jenis: 'paragraf', teks: 'Kedua garis itu bertemu di titik (0, 0), dan hasilnya bentuk V dengan ujung runcing di titik asal.' },
      { jenis: 'paragraf', teks: 'Begitu bentuk dasarnya diketahui, seluruh aturan materi 06 langsung berlaku tanpa perlu hafalan baru. Pada y = 2|x - 1| - 3, ujung V-nya pindah ke (1, -3) dan kedua sayapnya jadi dua kali lebih curam. Sama persis cara membacanya dengan bentuk puncak parabola.' },

      { jenis: 'sesi', judul: 'Dua hal yang berbeda dan sering dikira sama' },
      { jenis: 'paragraf', teks: 'Sekarang bagian yang penting. Lambang mutlak bisa dipasang di dua tempat, dan akibatnya sama sekali berbeda.' },
      {
        jenis: 'poin',
        judul: 'Ingat aturan materi 06',
        butir: [
          'y = |f(x)| - mutlaknya di LUAR, jadi ia mengerjakan HASILNYA. Semua hasil negatif dibalik jadi positif',
          'y = f(|x|) - mutlaknya di DALAM, jadi ia mengerjakan MASUKANNYA. Semua x negatif diganti pasangan positifnya',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Coba pada f(x) = x - 2, di titik x = -1',
        baris: [
          'fungsi asli   f(-1) = -1 - 2 = -3',
          '',
          'mutlak di luar   |f(-1)| = |-3| = 3, hasilnya dibalik ke atas',
          'mutlak di dalam   f(|-1|) = f(1) = 1 - 2 = -1, x-nya yang diganti jadi 1',
        ],
        simpul: 'Satu titik, dua jawaban berbeda: 3 dan -1. Jadi keduanya bukan hal yang sama.',
      },
      {
        jenis: 'poin',
        judul: 'Akibatnya pada gambar',
        butir: [
          'y = |f(x)| - bagian grafik yang di bawah sumbu x DILIPAT ke atas seperti kertas. Bagian yang sudah di atas tidak berubah',
          'y = f(|x|) - bagian grafik di sebelah KIRI sumbu y dibuang, lalu bagian kanan disalin sebagai cerminnya. Hasilnya selalu simetris kiri kanan',
        ],
      },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya punya satu grafik dan dua tombol. Bentuk aslinya tetap membayang supaya perubahannya terlihat.',
        langkah: [
          'Tekan tombol pertama, mutlak di luar. Perhatikan apa yang terjadi pada bagian grafik di bawah sumbu x.',
          'Bersihkan, lalu tekan tombol kedua, mutlak di dalam. Perhatikan apa yang terjadi pada bagian kiri sumbu y.',
          'Bandingkan kedua hasilnya. Di sisi mana keduanya sama, dan di sisi mana berbeda?',
          'Ganti fungsi dasarnya dan ulangi. Apakah polanya tetap sama?',
        ],
      },
      { jenis: 'paragraf', teks: 'Satu pengamatan yang layak diingat: di sebelah kanan sumbu y, kedua hasil itu tidak selalu sama. Mereka sama hanya kalau grafiknya di sana memang sudah di atas sumbu x. Kalau di kanan pun ada bagian yang negatif, mutlak di luar akan melipatnya sedangkan mutlak di dalam membiarkannya.' },
    ],
    seringKeliru: {
      judul: 'Dua-duanya kan jadi positif, jadi sama saja',
      isi: 'Yang selalu positif hanya y = |f(x)|, karena yang dimutlakkan adalah hasilnya. Pada y = f(|x|), yang dimutlakkan masukannya, sedangkan hasilnya bebas saja bernilai negatif. Contohnya pada f(x) = x - 2: di x = -1, bentuk pertama memberi 3, bentuk kedua memberi -1. Yang kedua bahkan tidak menyentuh tanda hasilnya sama sekali.',
    },
    widget: 'lipat-mutlak',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 8,
    slug: 'eksponen',
    judul: 'Eksponen, tumbuh dan meluruh',
    labelPendek: 'Eksponen',
    pertanyaan: 'Kenapa sesuatu yang mulanya pelan bisa tiba-tiba meledak?',
    intisari: [
      'Fungsi linear menambah dengan jumlah tetap, fungsi eksponen mengalikan dengan angka tetap.',
      'Bentuknya y = a b pangkat x, dengan a nilai awal dan b pengalinya.',
      'b lebih dari 1 berarti tumbuh, b antara 0 dan 1 berarti meluruh.',
      'Grafiknya mendekati sumbu x tanpa pernah menyentuhnya.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Sampai materi 07, semua grafik yang kita temui dibangun dari penjumlahan dan perkalian biasa: garis lurus menambah dengan jumlah tetap, parabola memangkatkan x dengan 2. Sekarang x pindah tempat, dan akibatnya jauh lebih besar daripada yang biasanya diduga.' },
      { jenis: 'paragraf', teks: 'Buku Kelas 10 membuka bab ini dengan penularan virus. Satu orang menulari tiga orang, ketiganya masing-masing menulari tiga lagi, dan seterusnya.' },
      {
        jenis: 'contoh',
        judul: 'Delapan fase penularan',
        baris: [
          'fase 1        3 orang',
          'fase 2        9 orang',
          'fase 3       27 orang',
          'fase 4       81 orang',
          'fase 5      243 orang',
          'fase 6      729 orang',
          'fase 7    2.187 orang',
          'fase 8    6.561 orang',
        ],
        simpul: 'Empat fase pertama masih terasa kecil. Empat fase berikutnya sudah ribuan.',
      },
      { jenis: 'paragraf', teks: 'Yang membuat angka itu meledak bukan penambahan yang besar, melainkan cara bertambahnya. Tiap fase, angkanya DIKALIKAN tiga, bukan ditambah tiga.' },
      { jenis: 'sorot', teks: 'Fungsi linear menambah dengan jumlah yang sama tiap langkah. Fungsi eksponen mengalikan dengan angka yang sama tiap langkah.' },
      { jenis: 'paragraf', teks: 'Perbedaan satu kata itu, ditambah lawan dikalikan, yang membuat keduanya berpisah sangat jauh.' },

      { jenis: 'sesi', judul: 'Tiga jenis pertumbuhan diadu langsung' },
      { jenis: 'paragraf', teks: 'Buku Kelas 10 menyandingkan tiga fungsi pada satu bidang, dan perbandingan itu memang yang paling meyakinkan.' },
      {
        jenis: 'contoh',
        judul: 'Adu tiga fungsi',
        baris: [
          'x        2x        x²        2 pangkat x',
          '1         2         1              2',
          '2         4         4              4',
          '3         6         9              8',
          '5        10        25             32',
          '10       20       100          1.024',
          '20       40       400      1.048.576',
        ],
        simpul: 'Di x = 2 ketiganya masih berdekatan. Di x = 20, yang eksponen sudah jutaan.',
      },
      { jenis: 'paragraf', teks: 'Perhatikan bahwa di awal, fungsi eksponen justru kalah dari fungsi kuadrat. Di x = 3, x² memberi 9 sedangkan 2 pangkat x baru memberi 8. Itu sebabnya pertumbuhan eksponen sering terlambat disadari orang: pada awalnya ia memang terlihat biasa saja.' },

      { jenis: 'sesi', judul: 'Bentuk umumnya, dan dua wajahnya' },
      { jenis: 'sorot', teks: 'y = a b pangkat x' },
      {
        jenis: 'poin',
        butir: [
          'a - nilai awal, yaitu berapa nilainya saat x sama dengan nol',
          'b - pengali tiap langkah, dan inilah yang menentukan wajahnya',
          'b lebih dari 1 - PERTUMBUHAN. Grafiknya naik makin curam',
          'b antara 0 dan 1 - PELURUHAN. Grafiknya turun makin melandai',
          'b sama dengan 1 - bukan eksponen lagi, karena 1 dipangkatkan berapa pun tetap 1',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Contoh peluruhan dari buku: bola basket memantul',
        baris: [
          'tinggi awal 300 cm, tiap pantulan tinggal 0,6 kalinya',
          'pantulan 1    300 × 0,6      =  180 cm',
          'pantulan 2    180 × 0,6      =  108 cm',
          'pantulan 3    108 × 0,6      =  64,8 cm',
          'pantulan 4    64,8 × 0,6     =  38,88 cm',
          'pantulan 5    38,88 × 0,6    =  23,328 cm',
        ],
        simpul: 'Rumusnya y = 300 × 0,6 pangkat x. Selalu berkurang, tetapi tidak pernah benar-benar nol.',
      },
      { jenis: 'paragraf', teks: 'Contoh peluruhan lain yang dipakai buku: kadar obat dalam darah yang berkurang tiap jam, dan itu justru alasan dokter menentukan jadwal minum obat, bukan asal.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya mengadu ketiga fungsi tadi pada satu bidang, sebagai balapan.',
        langkah: [
          'Jalankan balapannya dari awal. Siapa yang memimpin di beberapa langkah pertama?',
          'Perhatikan penunjuk skala di pojok. Kenapa tampilannya harus terus diperkecil?',
          'Cari langkah ke berapa kurva eksponen menyalip kurva kuadrat, lalu baca angkanya di tabel.',
          'Ubah pengalinya menjadi kurang dari 1. Apa yang terjadi pada arah kurvanya?',
        ],
      },

      { jenis: 'sesi', judul: 'Grafiknya menempel pada sumbu, tapi tidak menyentuh' },
      { jenis: 'paragraf', teks: 'Perhatikan grafik peluruhan tadi. Ia turun terus, makin lama makin mendatar, dan makin dekat ke sumbu x. Tetapi ia tidak pernah menyentuhnya.' },
      { jenis: 'paragraf', teks: 'Alasannya bisa dicek sendiri: 300 dikalikan 0,6 berkali-kali tetap menghasilkan bilangan positif, sekecil apa pun. Tidak ada satu pun langkah yang bisa membuatnya nol.' },
      { jenis: 'paragraf', teks: 'Garis yang didekati tanpa pernah disentuh seperti itu punya nama: asimtot. Untuk grafik eksponen, asimtotnya sumbu x sendiri.' },
      { jenis: 'sorot', teks: 'Kenapa jaraknya bisa mengecil terus tanpa pernah menjadi nol, dan bagaimana perilaku itu dihitung, dijawab lengkap di topik Limit materi 07. Di sini kita cukup mengenalinya di gambar.' },
    ],
    seringKeliru: {
      judul: 'Dua pangkat x dan x kuadrat itu mirip, sama-sama pangkat',
      isi: 'Letak x nya yang berbeda, dan itu mengubah segalanya. Pada x kuadrat, yang berubah adalah bilangan yang dipangkatkan, sedangkan pangkatnya tetap 2. Pada 2 pangkat x, yang berubah justru pangkatnya. Akibatnya terlihat begitu angkanya dibesarkan: di x = 10, x kuadrat memberi 100 sedangkan 2 pangkat x memberi 1.024. Di x = 20, selisihnya 400 lawan lebih dari satu juta.',
    },
    widget: 'balapan-tumbuh',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 9,
    slug: 'logaritma',
    judul: 'Logaritma, eksponen yang dicerminkan',
    labelPendek: 'Logaritma',
    pertanyaan: 'Kalau 2 pangkat x sama dengan 10, x nya berapa?',
    intisari: [
      'Logaritma menanyakan pangkatnya, bukan hasilnya.',
      'Grafik logaritma adalah grafik eksponen yang dicerminkan terhadap garis y = x.',
      'Karena pencerminan itu, domainnya hanya x positif dan grafiknya selalu lewat (1, 0).',
      'Naiknya sangat lambat, justru karena eksponen naiknya sangat cepat.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Materi 08 selalu menanyakan hal yang sama: diketahui pangkatnya, berapa hasilnya. Dua pangkat 3 berapa? Delapan.' },
      { jenis: 'paragraf', teks: 'Sekarang balik pertanyaannya. Dua pangkat berapa yang menghasilkan 8? Jawabannya 3, dan Anda pasti bisa menebaknya. Tapi bagaimana kalau pertanyaannya: dua pangkat berapa yang menghasilkan 10?' },
      { jenis: 'paragraf', teks: 'Jawabannya ada di antara 3 dan 4, karena 2 pangkat 3 adalah 8 dan 2 pangkat 4 adalah 16. Angka pastinya sekitar 3,32. Pertanyaan seperti inilah yang dijawab logaritma.' },
      { jenis: 'sorot', teks: 'Eksponen menanyakan hasilnya. Logaritma menanyakan pangkatnya. Keduanya pertanyaan yang sama, dibaca dari arah berlawanan.' },
      {
        jenis: 'contoh',
        judul: 'Dua tulisan untuk satu kenyataan',
        baris: [
          '2 pangkat 3 = 8   dibaca "dua pangkat tiga sama dengan delapan"',
          'log 8 basis 2 = 3   dibaca "dua pangkat berapa supaya jadi delapan? tiga"',
          '',
          '10 pangkat 2 = 100   log 100 basis 10 = 2',
          '3 pangkat 4 = 81   log 81 basis 3 = 4',
        ],
        simpul: 'Angka yang sama, cuma dipindah tempat.',
      },

      { jenis: 'sesi', judul: 'Kenapa grafiknya cerminan' },
      { jenis: 'paragraf', teks: 'Kalau eksponen dan logaritma menukar peran masukan dan keluaran, maka pada grafiknya, koordinat x dan y ikut bertukar tempat.' },
      {
        jenis: 'contoh',
        judul: 'Titik-titiknya bertukar',
        baris: [
          'pada grafik eksponen   pada grafik logaritma',
          '(0, 1)   (1, 0)',
          '(1, 2)   (2, 1)',
          '(2, 4)   (4, 2)',
          '(3, 8)   (8, 3)',
        ],
        simpul: 'Tiap titik bertukar koordinat. Dan menukar x dengan y sama artinya dengan mencerminkan terhadap garis y = x.',
      },
      { jenis: 'paragraf', teks: 'Garis y = x adalah garis miring yang lewat titik asal, tempat nilai x dan y selalu sama. Melipat gambar pada garis itu persis memindahkan tiap titik ke posisi tukarannya.' },
      { jenis: 'sorot', teks: 'Grafik logaritma bukan bentuk baru yang perlu dihafal. Ia grafik eksponen yang dilipat pada garis y = x.' },

      { jenis: 'sesi', judul: 'Empat hal yang langsung terbaca dari pencerminan itu' },
      {
        jenis: 'poin',
        judul: 'Tidak satu pun perlu dihafal terpisah',
        butir: [
          'Domainnya hanya x positif - karena hasil eksponen selalu positif, dan hasil itu sekarang jadi masukannya',
          'Selalu lewat titik (1, 0) - karena eksponen selalu lewat (0, 1), dan koordinatnya bertukar',
          'Punya asimtot TEGAK di sumbu y - karena eksponen punya asimtot MENDATAR di sumbu x, dan sumbunya ikut bertukar',
          'Naiknya sangat lambat - karena eksponen naiknya sangat cepat. Untuk menambah tinggi satu satuan, x nya harus dilipatgandakan',
        ],
      },
      { jenis: 'paragraf', teks: 'Kelambatan itu justru yang membuat logaritma berguna. Skala Richter untuk gempa, satuan desibel untuk suara, dan pH untuk keasaman semuanya memakai logaritma, supaya angka yang jangkauannya jutaan kali lipat bisa ditulis dalam skala 1 sampai 14.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menggambar garis y = x sebagai garis putus-putus, lalu melipat grafik eksponen ke seberangnya.',
        langkah: [
          'Jalankan pelipatannya pelan-pelan. Di mana titik (0, 1) mendarat?',
          'Perhatikan asimtot mendatarnya. Menjadi apa ia setelah dilipat?',
          'Ubah bilangan pokoknya. Apakah kedua kurva berubah sendiri-sendiri, atau bersamaan?',
          'Coba bilangan pokok antara 0 dan 1. Apa yang terjadi pada kedua grafiknya?',
        ],
      },
      { jenis: 'paragraf', teks: 'Satu istilah untuk nanti. Pasangan seperti ini, dua fungsi yang saling membatalkan dan grafiknya saling mencerminkan pada garis y = x, punya nama resmi. Namanya akan diberikan di materi 12, setelah Anda melihatnya bekerja di sini.' },
    ],
    seringKeliru: {
      judul: 'Logaritma dari bilangan negatif hasilnya negatif',
      isi: 'Godaannya masuk akal: di hampir semua hitungan lain, memasukkan bilangan negatif memberi hasil negatif, jadi polanya terasa berlaku di sini juga. Padahal di sini tidak ada hasilnya sama sekali. Logaritma menanyakan "pangkat berapa", dan tidak ada satu pun pangkat yang membuat bilangan positif berubah menjadi negatif. Dua pangkat berapa pun, termasuk pangkat negatif dan pangkat pecahan, hasilnya selalu positif. Itu sebabnya domain fungsi logaritma hanya bilangan positif, dan grafiknya berhenti di sumbu y tanpa pernah menyeberang ke kiri.',
    },
    widget: 'cermin-yx',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 10,
    slug: 'fungsi-rasional',
    judul: 'Fungsi rasional dan asimtotnya',
    labelPendek: 'Asimtot',
    pertanyaan: 'Kenapa ada grafik yang terbelah dua dan menempel pada garis tanpa menyentuhnya?',
    intisari: [
      'Fungsi rasional adalah pecahan yang pembilang dan penyebutnya berupa fungsi.',
      'Asimtot tegak muncul di tempat penyebutnya nol, karena di situ fungsinya tidak punya nilai.',
      'Asimtot datar terlihat saat x dibuat sangat besar.',
      'Menggeser 1/x menggeser kedua asimtotnya sekaligus. Itu aturan materi 06 lagi.',
    ],
    penjelasan: [
      {
        jenis: 'poin',
        judul: 'Catatan sebelum mulai',
        butir: [
          'Bahan ini pengayaan, bukan bab wajib: fungsi rasional tidak ada di buku Kelas 10 maupun Kelas 11',
          'Tetap dipelajari - karena sering muncul di soal seleksi masuk perguruan tinggi',
          'Sebagian sudah pernah lewat - kata asimtot sudah dipakai di materi 08',
        ],
      },
      { jenis: 'paragraf', teks: 'Ada satu grafik yang bentuknya paling mengejutkan siswa waktu pertama kali melihatnya: grafik y = 1 dibagi x. Ia terbelah menjadi dua bagian yang tidak bersambung, dan kedua bagiannya menempel pada sumbu tanpa pernah menyentuhnya.' },
      { jenis: 'paragraf', teks: 'Padahal rumusnya sederhana sekali. Mari kita lihat dari mana bentuk itu datang, seperti biasa: jalankan mesinnya.' },
      {
        jenis: 'contoh',
        judul: 'Jalankan mesin y = 1 dibagi x',
        baris: [
          'x = 4      ->   1 : 4     =  0,25',
          'x = 2      ->   1 : 2     =  0,5',
          'x = 1      ->   1 : 1     =  1',
          'x = 0,5    ->   1 : 0,5   =  2',
          'x = 0,1    ->   1 : 0,1   =  10',
          'x = 0,01   ->   1 : 0,01  =  100',
          'x = 0      ->   1 : 0     =  TIDAK ADA',
        ],
        simpul: 'Makin x mendekat ke nol, makin besar hasilnya. Dan tepat di nol, mesinnya berhenti bekerja.',
      },
      { jenis: 'paragraf', teks: 'Pembagian dengan nol memang tidak punya jawaban, jadi x = 0 tidak boleh dimasukkan. Itulah sebabnya grafiknya terbelah: ada satu nilai x yang benar-benar kosong, dan kurvanya tidak bisa menyeberanginya.' },
      { jenis: 'sorot', teks: 'Asimtot tegak muncul di tempat penyebutnya bernilai nol. Bukan karena grafiknya malas menyentuh garis itu, melainkan karena di sana fungsinya memang tidak punya nilai.' },

      { jenis: 'sesi', judul: 'Asimtot yang satu lagi, arahnya mendatar' },
      { jenis: 'paragraf', teks: 'Sekarang dorong ke arah sebaliknya. Bukan mendekati nol, melainkan menjauh sejauh-jauhnya.' },
      {
        jenis: 'contoh',
        judul: 'Besarkan x nya terus',
        baris: [
          'x = 10          ->   0,1',
          'x = 100         ->   0,01',
          'x = 1.000       ->   0,001',
          'x = 1.000.000   ->   0,000001',
        ],
        simpul: 'Hasilnya mengecil terus mendekati nol, tetapi tidak pernah benar-benar nol.',
      },
      { jenis: 'paragraf', teks: 'Satu dibagi sejuta memang sangat kecil, tetapi ia masih bilangan positif. Berapa pun besarnya x, satu dibagi x tidak akan pernah menghasilkan nol tepat. Jadi grafiknya mendekati sumbu x tanpa menyentuh, dan sumbu x itulah asimtot datarnya.' },
      { jenis: 'sorot', teks: 'Sama seperti materi 08: alasan lengkap kenapa jaraknya mengecil terus tanpa pernah nol, dan cara menghitung perilakunya, ada di topik Limit materi 07. Bukalah materi itu kalau ingin jawabannya, bukan cuma gambarnya.' },

      { jenis: 'sesi', judul: 'Menggeser 1 dibagi x, dan asimtotnya ikut pindah' },
      { jenis: 'paragraf', teks: 'Bagian ini tidak menuntut aturan baru sama sekali, karena aturannya sudah dipelajari di materi 06. Yang baru hanya nama bentuknya.' },
      {
        jenis: 'contoh',
        judul: 'Bandingkan dengan y = 1/(x - 2) + 3',
        baris: [
          'kurungnya x - 2   geser ke KANAN 2, jadi asimtot tegaknya pindah ke x = 2',
          'ditambah 3   geser ke ATAS 3, jadi asimtot datarnya pindah ke y = 3',
          '',
          'cek: penyebut nol saat x - 2 = 0, yaitu saat x = 2, cocok',
          'cek: x sangat besar, 1 dibagi angka besar mendekati 0, jadi y mendekati 3, cocok',
        ],
        simpul: 'Bentuknya sama persis dengan 1 dibagi x. Yang berpindah cuma letaknya, berikut kedua asimtotnya.',
      },
      { jenis: 'paragraf', teks: 'Untuk pecahan yang lebih rumit seperti y = (2x + 1) dibagi (x - 3), caranya sama. Asimtot tegaknya di x = 3, karena di situ penyebutnya nol. Asimtot datarnya di y = 2, karena untuk x yang sangat besar, angka 1 dan angka -3 hampir tidak berpengaruh, sehingga pecahannya mendekati 2x dibagi x, yaitu 2.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya punya dua penggeser untuk memindahkan grafik 1 dibagi x. Kedua asimtotnya digambar putus-putus dan ikut bergeser.',
        langkah: [
          'Geser ke kanan dan ke kiri. Perhatikan apa yang terjadi pada asimtot tegaknya.',
          'Geser ke atas dan ke bawah. Sekarang asimtot mana yang ikut pindah?',
          'Perhatikan kurvanya di sekitar asimtot: disambung menyeberang, atau diputus?',
          'Baca tabel angkanya. Makin dekat ke asimtot, apakah nilainya pernah sama persis dengan asimtotnya?',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Kalau ditarik cukup jauh, grafiknya akhirnya menyentuh asimtotnya',
      isi: 'Godaannya datang dari mata: di layar, jarak sepersejuta satuan memang tidak bisa dibedakan dari nol, jadi kurvanya terlihat menempel. Tetapi menyentuh tidak pernah terjadi. Yang terjadi hanya jaraknya mengecil terus. Pada y = 1 dibagi x, di x sama dengan sejuta nilainya masih 0,000001, dan itu bukan nol. Di x sama dengan semiliar pun ia masih positif. Tidak ada satu pun nilai x yang membuatnya tepat nol, jadi kurvanya tidak pernah menyentuh sumbu x. Kalimat "mendekati tanpa menyentuh" itu bukan kiasan, melainkan pernyataan yang bisa dibuktikan, dan pembuktiannya ada di topik Limit.',
    },
    widget: 'asimtot-rasional',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 11,
    slug: 'komposisi',
    judul: 'Dua mesin dirangkai',
    labelPendek: 'Rangkai',
    pertanyaan: 'Kalau keluaran satu mesin dimasukkan ke mesin lain, hasilnya mesin apa?',
    intisari: [
      'Pada f komposisi g, yang bekerja lebih dulu adalah g, yaitu yang paling dekat dengan x.',
      'Menukar urutannya biasanya memberi hasil yang berbeda.',
      'Soal ujian sering membalik arahnya: hasil komposisinya diketahui, koefisien mesinnya yang dicari.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Di materi 02, fungsi diperkenalkan sebagai mesin: masukkan satu angka, keluar satu angka. Sekarang kita pasang dua mesin berderet, sehingga keluaran mesin pertama langsung masuk ke mesin kedua.' },
      { jenis: 'paragraf', teks: 'Contoh sehari-harinya banyak. Harga barang dikenai diskon dulu, lalu hasilnya dikenai pajak. Dua aturan, dijalankan berurutan.' },
      { jenis: 'sorot', teks: '(f komposisi g)(x) = f(g(x))' },
      { jenis: 'paragraf', teks: 'Yang paling sering salah adalah urutannya, jadi kita tegaskan sekali dan pakai terus: yang bekerja lebih dulu adalah yang paling dekat dengan x. Pada f(g(x)), yang paling dekat dengan x adalah g, jadi g yang jalan duluan.' },
      { jenis: 'paragraf', teks: 'Sebelum melihat hitungannya, coba tebak dulu. Kalau kedua mesin itu ditukar urutannya, apakah hasilnya tetap sama?' },
      {
        jenis: 'contoh',
        judul: 'f(x) = x² + 1 dan g(x) = 2x - 3, hitung f(g(4))',
        baris: [
          'g jalan dulu   g(4) = 2(4) - 3 = 5',
          'hasilnya masuk f   f(5) = 5² + 1 = 26',
          '',
          'kalau ditukar urutannya',
          'f jalan dulu   f(4) = 4² + 1 = 17',
          'hasilnya masuk g   g(17) = 2(17) - 3 = 31',
        ],
        simpul: '26 dan 31. Urutannya benar-benar berpengaruh.',
      },

      { jenis: 'sesi', judul: 'Menyusun rumus komposisinya, bukan cuma nilainya' },
      { jenis: 'paragraf', teks: 'Menghitung satu angka sudah cukup untuk melihat urutannya berpengaruh. Tapi soal biasanya meminta rumus lengkapnya, bukan satu nilai. Caranya sama persis, hanya saja yang dimasukkan bukan angka melainkan seluruh rumus mesin pertama.' },
      {
        jenis: 'contoh',
        judul: 'Rumus lengkap untuk kedua urutan',
        baris: [
          'f(g(x)) = (2x - 3)² + 1',
          '        = 4x² - 12x + 9 + 1',
          '        = 4x² - 12x + 10',
          '',
          'g(f(x)) = 2(x² + 1) - 3',
          '        = 2x² + 2 - 3',
          '        = 2x² - 1',
        ],
        simpul: 'Dua rumus yang berbeda. Cek dengan x = 4: yang pertama memberi 26, yang kedua 31.',
      },

      { jenis: 'sesi', judul: 'Bentuk soal yang arahnya dibalik' },
      { jenis: 'paragraf', teks: 'Sampai sini rumus kedua mesin diketahui, dan komposisinya yang dicari. Soal ujian sering membalik arahnya: komposisinya yang diketahui, salah satu koefisien mesinnya yang dicari. Contoh dari buku Kelas 11: diketahui f(x) = 2x + b, dan diketahui pula f(f(x)) = 4x + 6. Berapa b?' },
      { jenis: 'paragraf', teks: 'Kuncinya jangan mencoba membalik. Kerjakan tetap ke arah maju sampai bertemu bentuk yang bisa disamakan.' },
      {
        jenis: 'contoh',
        judul: 'Kerjakan maju dulu, baru samakan',
        baris: [
          'susun f(f(x))     f(f(x)) = 2(2x + b) + b',
          '                          = 4x + 2b + b',
          '                          = 4x + 3b',
          'samakan dengan yang diketahui    4x + 3b = 4x + 6',
          'suku x sudah cocok, sisanya      3b = 6',
          '                                  b = 2',
        ],
        simpul: 'Jadi f(x) = 2x + 2. Periksa: f(f(x)) = 2(2x + 2) + 2 = 4x + 6. Cocok.',
      },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menggambar KEDUA urutan sekaligus, jadi bedanya terlihat sebagai dua kurva, bukan sebagai kalimat.',
        langkah: [
          'Geser angka yang dijalankan ke 4, lalu baca kedua hasilnya di keterangan atas.',
          'Perhatikan ada dua kurva, satu utuh dan satu putus-putus. Dari mana masing-masing berasal?',
          'Ganti mesin f menjadi f(x) = 2x + 3. Bagaimana bentuk kedua kurvanya sekarang, dan apakah keduanya berimpit?',
          'Geser angkanya pelan-pelan. Pernahkah kedua bulatan penandanya bertemu?',
        ],
      },
      { jenis: 'paragraf', teks: 'Satu pertanyaan sengaja disimpan untuk materi berikutnya. Kalau sebuah mesin mengubah 5 menjadi 13, adakah mesin lain yang mengembalikan 13 menjadi 5? Mesin itu ada, dan ia yang menutup seluruh isi topik ini.' },
    ],
    seringKeliru: {
      judul: 'f komposisi g sama saja dengan g komposisi f, kan mesinnya itu-itu juga',
      isi: 'Mesinnya memang sama, tetapi urutan kerjanya berbeda, dan itu mengubah hasilnya. Bandingkan dengan memakai kaus kaki lalu sepatu, dibanding memakai sepatu lalu kaus kaki: bendanya sama, hasilnya tidak. Pada f(x) = x² + 1 dan g(x) = 2x - 3 di titik x = 4, urutan pertama memberi 26 dan urutan kedua memberi 31. Menukar urutan komposisi hanya aman kalau memang sudah diperiksa, bukan diandaikan.',
    },
    widget: 'dua-mesin',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 12,
    slug: 'invers',
    judul: 'Mesin yang membatalkan',
    labelPendek: 'Invers',
    pertanyaan: 'Kalau sebuah mesin mengubah 5 menjadi 13, adakah mesin yang mengembalikannya?',
    intisari: [
      'Fungsi invers membatalkan fungsi aslinya, langkah demi langkah dengan urutan terbalik.',
      'Grafik inversnya adalah grafik aslinya yang dicerminkan terhadap garis y = x.',
      'Invers hanya ada kalau fungsinya satu-satu, dan itu diperiksa dengan uji garis mendatar.',
      'Logaritma di materi 09 ternyata invers dari eksponen di materi 08.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Materi 11 merangkai dua mesin supaya bekerja berurutan. Sekarang pertanyaan yang arahnya berbeda: kalau sebuah mesin mengubah 5 menjadi 13, adakah mesin lain yang mengembalikan 13 menjadi 5?' },
      { jenis: 'paragraf', teks: 'Mesin itu ada, dan namanya fungsi invers. Ia membatalkan pekerjaan fungsi aslinya, langkah demi langkah dengan urutan terbalik.' },
      { jenis: 'paragraf', teks: 'Perhatikan kata terbalik itu, karena di situlah letak seluruh caranya. Kalau memakai kaus kaki lalu sepatu, melepasnya bukan kaus kaki dulu, melainkan sepatu dulu.' },
      {
        jenis: 'contoh',
        judul: 'Bongkar f(x) = 2x + 3',
        baris: [
          'yang dikerjakan f   kalikan 2, lalu tambah 3',
          'membatalkannya   kurangi 3 dulu, baru bagi 2',
          '',
          'jadi inversnya   (x - 3) : 2',
          '',
          'periksa maju   f(5) = 2(5) + 3 = 13',
          'periksa balik   (13 - 3) : 2 = 5, kembali ke asal',
        ],
        simpul: 'Cara memeriksanya selalu itu: jalankan maju lalu balik, dan angkanya harus kembali ke asal.',
      },

      { jenis: 'sesi', judul: 'Kenapa grafiknya dicerminkan terhadap y = x' },
      { jenis: 'paragraf', teks: 'Fungsi invers menukar peran masukan dan keluaran: yang tadinya masuk sekarang keluar. Pada grafiknya, itu berarti koordinat x dan y tiap titik ikut bertukar tempat.' },
      { jenis: 'paragraf', teks: 'Menukar x dengan y sama artinya dengan melipat gambar pada garis y = x. Jadi grafik fungsi invers adalah grafik fungsi aslinya yang dicerminkan terhadap garis itu. Buku Kelas 11 memakai kata pencerminan itu persis.' },
      { jenis: 'sorot', teks: 'Di sinilah janji materi 09 dilunasi: logaritma adalah invers dari eksponen. Anda sudah melihat pencerminannya bekerja sebelum tahu namanya.' },

      { jenis: 'sesi', judul: 'Tidak semua fungsi punya invers' },
      { jenis: 'paragraf', teks: 'Ada syaratnya, dan syarat itu berpasangan dengan uji garis tegak di materi 02.' },
      { jenis: 'paragraf', teks: 'Supaya bisa dibalik, tiap keluaran hanya boleh berasal dari satu masukan. Fungsi seperti itu disebut fungsi satu-satu. Kalau ada dua masukan berbeda yang memberi keluaran sama, mesin pembalinya bingung harus mengembalikan yang mana.' },
      {
        jenis: 'contoh',
        judul: 'Kenapa y = x² tidak punya invers',
        baris: [
          'f(3)  = 9',
          'f(-3) = 9        dua masukan berbeda, satu keluaran yang sama',
          '',
          'kalau dibalik, 9 harus kembali menjadi apa? 3 atau -3?',
        ],
        simpul: 'Tidak ada jawabannya, jadi y = x² tidak punya invers, kecuali domainnya dibatasi.',
      },
      {
        jenis: 'poin',
        judul: 'Dua uji yang berpasangan',
        butir: [
          'Uji garis TEGAK (materi 02) - memastikan gambarnya memang grafik fungsi',
          'Uji garis MENDATAR (di sini) - memastikan fungsinya satu-satu, jadi punya invers',
          'Cara memakainya sama - geser garisnya, dan kalau ada yang memotong lebih dari sekali, ujinya gagal',
        ],
      },
      { jenis: 'paragraf', teks: 'Kalau y = x² dibatasi hanya untuk x nol atau positif, garis mendatar hanya memotong sekali, dan inversnya ada: akar kuadrat. Itu sebabnya kalkulator memberi akar 9 sama dengan 3 saja, bukan 3 dan -3 sekaligus.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menggambar fungsinya bersama inversnya, dengan garis y = x sebagai cerminnya.',
        langkah: [
          'Mulai dari f(x) = 2x + 3. Garis biru putus-putus adalah inversnya; perhatikan letaknya terhadap garis ungu y = x.',
          'Pilih satu titik pada grafik f, lalu cari pasangannya pada grafik invers. Apa hubungan kedua koordinatnya?',
          'Ganti mesin f menjadi f(x) = x² + 1, lalu geser angkanya menjauh dari nol.',
          'Berapa kali garis mendatarnya memotong grafik sekarang? Baca keterangan alatnya: kenapa inversnya tidak ada?',
        ],
      },
      { jenis: 'paragraf', teks: 'Dengan ini lingkaran topik ini tertutup. Materi 02 menuntut satu masukan satu keluaran; materi 12 menuntut syarat kebalikannya, satu keluaran satu masukan. Yang pertama membuat sebuah gambar layak disebut fungsi, yang kedua membuat fungsi itu layak dibalik.' },
    ],
    seringKeliru: {
      judul: 'Lambang pangkat minus satu artinya satu per fungsinya',
      isi: 'Di sini artinya bukan pecahan, melainkan mesin kebalikannya. Pada f(x) = x + 3, inversnya adalah x - 3, bukan 1 dibagi (x + 3). Godaannya kuat karena di aljabar biasa pangkat minus satu memang berarti satu per sesuatu. Cara mengeceknya: jalankan maju lalu balik, dan hasilnya harus kembali ke angka semula. Mulai dari 5, f(5) = 8, lalu 8 - 3 = 5, kembali ke asal, jadi benar. Kalau dipakai 1 dibagi 8, hasilnya 0,125, dan itu jelas tidak kembali ke 5.',
    },
    widget: 'mesin-balik',
    siap: true,
  },

  /* ================================================================= */
  {
    no: 13,
    slug: 'dunia-nyata',
    judul: 'Dipakai di dunia nyata',
    labelPendek: 'Nyata',
    pertanyaan: 'Di mana keenam jenis grafik ini benar-benar dipakai orang?',
    intisari: [
      'Parabola dipakai untuk lintasan benda yang dilempar dan untuk bentuk yang mengumpulkan sinar.',
      'Eksponen tumbuh dipakai untuk bunga bank dan penyebaran informasi.',
      'Eksponen luruh dipakai untuk kadar obat dan penanggalan umur benda purba.',
      'Logaritma dipakai untuk memampatkan angka yang jangkauannya raksasa.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Dua belas materi sebelumnya membahas bentuk dan aturannya. Materi ini menunjukkan di mana bentuk-bentuk itu benar-benar dipakai orang untuk bekerja, bukan untuk ujian.' },
      { jenis: 'paragraf', teks: 'Tidak ada alat yang perlu dicoba di sini. Yang perlu dilakukan cuma satu: mengenali bentuk yang sudah Anda pelajari saat ia muncul di luar buku pelajaran.' },
      { jenis: 'sorot', teks: 'Kalau setelah membaca bagian ini Anda mulai melihat parabola di air mancur dan grafik eksponen di berita bunga bank, tujuan topik ini sudah tercapai.' },
      {
        jenis: 'poin',
        judul: 'Yang ditunjukkan di alatnya',
        butir: [
          'Parabola pada lintasan - bola basket yang dilempar dan kabel jembatan gantung, dua contoh yang dipakai buku Kelas 10',
          'Parabola pada pemantul - antena parabola dan lampu sorot, bentuk itu mengumpulkan semua sinar sejajar ke satu titik',
          'Eksponen tumbuh - bunga majemuk di bank dan penyebaran informasi di media sosial',
          'Eksponen luruh - kadar obat dalam darah dan penanggalan umur benda purba lewat karbon',
          'Logaritma - skala Richter untuk gempa, desibel untuk suara, dan pH untuk keasaman',
          'Rasional - waktu tempuh terhadap kecepatan, yang mendekati nol tetapi tidak pernah mencapainya',
        ],
      },
      { jenis: 'paragraf', teks: 'Contoh terakhir layak dipikirkan sebentar. Waktu tempuh sama dengan jarak dibagi kecepatan, dan itu fungsi rasional. Grafiknya turun tajam lalu melandai. Artinya menambah kecepatan dari 20 ke 40 km per jam menghemat banyak sekali waktu, tetapi menambah dari 100 ke 120 hampir tidak terasa.' },
      { jenis: 'paragraf', teks: 'Kesimpulan itu tidak bisa ditebak dari perasaan. Ia terbaca langsung dari bentuk grafiknya, dan itulah gunanya mempelajari bentuk.' },
    ],
    widget: 'dunia-nyata-grafik',
    siap: true,
  },
]
