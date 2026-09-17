/**
 * Integral, 11 tahap belajar. Topik kesembilan MANTRA.
 *
 * Rancangannya: docs/superpowers/specs/2026-09-06-integral-alur-belajar.md
 * Kerangka dibuat MATRA-MASTER 6 Sep 2026, diisi sesi MANTRA-INTEGRAL 7 Sep
 * 2026 di cabang sesi/integral-materi. Tiap materi yang selesai dan lolos
 * gerbang dinyalakan dengan `siap: true`, satu per satu.
 *
 * SUMBER MATERI
 * Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi), 2025.
 * Kementerian Pendidikan Dasar dan Menengah. Bab 3 "Integral", halaman cetak
 * 159 sampai 219 (berkas LIMIT.pdf, halaman PDF = cetak + 16). Contoh dan
 * angkanya ditulis sendiri, urutan konsep dan definisinya mengikuti buku.
 * Materi 10 (luas antara dua kurva) di luar bab buku, ditambahkan karena lazim
 * di ujian SMA; dinyatakan begitu di bacaannya. Volume benda putar TIDAK
 * masuk (keputusan ARYA 5 Sep 2026).
 *
 * SATU SELISIH DENGAN BUKU, DISENGAJA
 * Buku mencetak Sifat 3.2 dengan syarat "n bilangan rasional dan n != 0"
 * (halaman cetak 168, PDF 184; sudah dilihat sebagai gambar, bukan hasil
 * ekstraksi teks). Syarat itu keliru: yang membuat rumus xˆ(n+1)/(n+1) tidak
 * berlaku adalah n = -1, sebab di situ penyebutnya nol. Nilai n = 0 justru
 * aman, hasilnya x + C, sama dengan Sifat 3.1. Halaman ini menulis syarat
 * yang benar (n tidak sama dengan -1) dan tidak menyebut salah cetak itu ke
 * siswa; catatannya ada di sini dan di laporan sesi.
 *
 * KENAPA LUAS DULU, RUMUS BELAKANGAN
 * Salah paham yang dilawan: "integral itu cuma menaikkan pangkat". Buku sendiri
 * membuka dengan luas di bawah kurva pengeluaran sebelum menyebut antiturunan,
 * dan urutan itu dijaga: dari laju ke jumlah, membalik turunan, luas dari
 * persegi panjang, lalu Teorema Dasar Kalkulus yang menyatukan keduanya.
 *
 * SELURUH ANGKA DI BERKAS INI DIPERIKSA MESIN dengan sympy lewat
 * `python alat/cek_integral.py alat/materi-integral.json`. Pemeriksanya sendiri
 * dibuktikan dua arah dengan `alat/uji-cek-integral-salah.json --harus-gagal`.
 * Urutan istilah dijaga `python alat/cek_urutan_integral.py`.
 */

export type WidgetIntegral =
  | 'mesin-balik'
  | 'naik-pangkat'
  | 'cocokkan-lapisan'
  | 'pasangkan-turunan-integral'
  | 'persegi-panjang-menumpuk'
  | 'pecah-selang'
  | 'luas-yang-tumbuh'
  | 'hitung-bertahap'
  | 'luas-dua-daerah'
  | 'dua-kurva'
  | 'dunia-nyata-integral'

import type { Tahap } from '@/content/tipe'

/** Nama widget diketatkan ke senarai di atas: salah ketik ditolak TypeScript. */
type TahapIntegral = Omit<Tahap, 'widget'> & { widget?: WidgetIntegral }

export const TAHAP: TahapIntegral[] = [
  /* ================================================================= */
  {
    no: 1,
    slug: 'membalik-turunan',
    judul: 'Dari laju ke jumlah, membalik turunan',
    labelPendek: 'Kenapa',
    video: { berkas: 'integral01-laju-ke-jumlah.mp4', poster: 'integral01-laju-ke-jumlah.jpg' },
    pertanyaan: 'Pengeluaran naik dengan laju 2x + 1 juta per bulan pada bulan ke-x. Berapa totalnya setahun, kalau yang diketahui cuma lajunya?',
    intisari: [
      'Kalau yang diketahui lajunya, jumlah totalnya adalah luas di bawah grafik laju itu.',
      'Jalan lain menuju jawaban yang sama: cari fungsi yang turunannya adalah laju tadi.',
      'Fungsi seperti itu disebut antiturunan.',
      'Antiturunan tidak pernah tunggal. Selalu ada tambahan tetapan C, dan C baru bisa dipilih kalau ada satu keterangan tambahan.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Sebuah keluarga mencatat pengeluaran mereka. Yang tercatat bukan totalnya, melainkan seberapa cepat pengeluaran itu bertambah tiap bulan. Pada bulan ke-x, angkanya 2x + 1 juta rupiah per bulan.' },
      { jenis: 'paragraf', teks: 'Angka itu laju pada satu saat, bukan tambahan sebulan penuh. Pada bulan ke-1 lajunya 3 juta per bulan, pada bulan ke-2 sudah 5 juta per bulan, pada bulan ke-3 sudah 7 juta per bulan, dan terus naik di antaranya. Pertanyaan keluarga itu sederhana: setahun ini kami menghabiskan berapa?' },
      { jenis: 'sorot', teks: 'Yang dipegang adalah lajunya. Yang dicari adalah jumlahnya. Seluruh materi ini soal perjalanan dari laju kembali ke jumlah.' },

      { jenis: 'sesi', judul: 'Jalan pertama: jumlahnya terlihat sebagai luas' },
      { jenis: 'paragraf', teks: 'Gambar grafik lajunya, dengan bulan pada sumbu-x dan juta rupiah per bulan pada sumbu-y. Untuk satu bulan saja, pengeluarannya adalah laju dikali lama waktu, dan itu persis luas sebuah persegi panjang setinggi laju dan selebar satu bulan.' },
      { jenis: 'paragraf', teks: 'Kalau tiap bulan dibuatkan persegi panjangnya, lalu semua luasnya dijumlahkan, yang didapat sudah dekat dengan total setahun. Baru dekat, belum tepat: laju di dalam satu bulan tidak benar-benar tetap, sedangkan persegi panjang menganggapnya tetap. Menjumlahkan potongan-potongan itu sama saja dengan mengukur luas daerah di bawah grafik lajunya.' },
      { jenis: 'paragraf', teks: 'Buku Matematika Tingkat Lanjut Kelas XII membuka bab ini dengan cara itu, memakai potongan berbentuk trapesium supaya tepi miringnya tertutup rapi. Untuk laju yang grafiknya garis lurus seperti ini, trapesium menutupinya tanpa sisa sedikit pun, jadi hasilnya tepat. Cara mengukur yang berlaku untuk kurva apa pun kita rapikan nanti.' },
      { jenis: 'sorot', teks: 'Kalau yang Anda punya adalah laju, maka jumlahnya adalah luas daerah di bawah grafik laju itu.' },

      { jenis: 'sesi', judul: 'Jalan kedua: mesin turunan dijalankan mundur' },
      { jenis: 'paragraf', teks: 'Ada jalan lain yang kelihatannya tidak berhubungan sama sekali. Sebut T(x) total pengeluaran sampai bulan ke-x. Laju bertambahnya T adalah turunannya. Jadi kita sebenarnya sedang mencari fungsi T yang turunannya 2x + 1.' },
      { jenis: 'paragraf', teks: 'Di topik Turunan, arah kerjanya begini: diberi fungsi, cari turunannya. Sekarang arahnya dibalik. Diberi turunannya, cari fungsi asalnya. Coba tebak dulu sebelum membaca baris berikutnya: fungsi apa yang kalau diturunkan menjadi 2x + 1?' },
      {
        jenis: 'contoh',
        judul: 'Menebak, lalu memeriksa tebakannya',
        baris: [
          'tebakan          T(x) = x² + x',
          'periksa          turunkan tebakan itu, hasilnya 2x + 1',
          'cocok            karena turunan x² adalah 2x, dan turunan x adalah 1',
        ],
        simpul: 'Tebakan diperiksa dengan satu cara saja: turunkan lagi. Kalau kembali ke laju semula, tebakannya benar.',
      },
      { jenis: 'paragraf', teks: 'Fungsi yang turunannya adalah f disebut antiturunan dari f. Awalan anti di situ berarti melawan arah, bukan meniadakan. Buku menuliskannya sebagai Definisi 3.1 pada halaman 166.' },

      { jenis: 'sesi', judul: 'Kenapa selalu ada tambahan C' },
      { jenis: 'paragraf', teks: 'Sekarang periksa tebakan lain: x² + x + 7. Turunannya juga 2x + 1, sebab turunan sebuah tetapan adalah nol. Begitu pula x² + x - 3, dan x² + x + 1000.' },
      { jenis: 'paragraf', teks: 'Jadi antiturunan tidak pernah tunggal. Ada satu keluarga fungsi yang semuanya punya turunan sama, dan anggotanya beda hanya oleh sebuah tetapan. Tetapan itu ditulis C.' },
      {
        jenis: 'poin',
        judul: 'Apa arti C pada gambar dan pada cerita',
        butir: [
          'Pada gambar - semua kurva keluarga itu bentuknya sama persis, hanya digeser naik atau turun. Menggeser kurva tidak mengubah kemiringannya di titik mana pun',
          'Pada cerita - C adalah pengeluaran yang sudah ada sebelum bulan pertama dihitung. Lajunya tidak tahu apa-apa soal itu',
          'Untuk memilih satu - perlu satu keterangan tambahan, misalnya "pada bulan ke-0 totalnya nol". Baru dari situ C bisa dihitung',
        ],
      },
      { jenis: 'sorot', teks: 'Laju hanya memberi tahu bentuk kurvanya, bukan letaknya. Untuk mengunci letaknya, diperlukan satu keterangan di luar laju.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya adalah mesin turunan yang berjalan mundur. Masukkan sebuah laju, tebak fungsi asalnya, lalu geser C.',
        langkah: [
          'Pilih laju 2x + 1, lalu pilih satu calon jawaban. Perhatikan cara mesin memeriksanya.',
          'Kalau calonnya salah, lihat hasil turunannya di panel. Bagian mana yang meleset?',
          'Setelah dapat yang benar, geser C dari -3 sampai 3. Apa yang terjadi pada kurvanya?',
          'Perhatikan garis singgung di titik x pilihan Anda saat C digeser. Apakah kemiringannya berubah? Menurut Anda, kenapa turunannya tetap sama?',
        ],
      },

      { jenis: 'sesi', judul: 'Kembali ke pertanyaan keluarga tadi' },
      {
        jenis: 'contoh',
        judul: 'Total pengeluaran dua belas bulan',
        baris: [
          'laju                     2x + 1 juta per bulan',
          'antiturunannya           T(x) = x² + x + C',
          'awal tahun kosong        T(0) = 0, sehingga C = 0',
          'setelah dua belas bulan  T(12) = 144 + 12',
        ],
        simpul: 'Totalnya 156 juta rupiah setahun. Angka yang sama juga muncul kalau luas di bawah grafik lajunya diukur, dan alasan kedua jalan itu bertemu baru akan kita buktikan di Materi 07.',
      },
      { jenis: 'paragraf', teks: 'Dua jalan tadi terasa sangat berbeda. Yang satu soal mengukur luas, yang satu soal membalik mesin turunan. Bahwa keduanya memberi jawaban yang sama adalah hal yang mengejutkan, dan itu justru puncak topik ini.' },
      { jenis: 'paragraf', teks: 'Materi berikutnya memberi lambang tetap untuk "semua antiturunan f", supaya pekerjaan menebak tadi tidak perlu diulang tiap kali.' },
    ],
    seringKeliru: {
      judul: 'Dikira menurunkan lalu membalikkannya mengembalikan fungsi yang persis sama',
      isi: 'Turunkan x² + x, hasilnya 2x + 1. Balikkan lagi, hasilnya x² + x + C. Fungsi yang keluar bukan yang tadi masuk, melainkan seluruh keluarganya. Kekeliruan ini menggoda karena pada contoh sekolah C sering kebetulan nol, sehingga jawabannya kelihatan sama. Cara membedakannya: tanyakan apakah soal memberi satu keterangan tambahan di luar laju. Kalau tidak ada, jawabannya wajib memuat C, dan menghilangkan C berarti memilih satu anggota keluarga tanpa alasan.',
    },
    widget: 'mesin-balik',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 2,
    slug: 'tanda-integral',
    judul: 'Tanda integral dan aturan pangkatnya',
    labelPendek: 'Notasi',
    pertanyaan: 'Bagaimana menuliskan "semua antiturunan f" dengan satu lambang, dan apa aturan cepatnya?',
    intisari: [
      'Lambang integral membaca "semua antiturunan f terhadap x", dan hasilnya selalu ditulis dengan + C.',
      'Aturan pangkat: naikkan pangkatnya satu, lalu bagi dengan pangkat yang baru. Berlaku untuk semua pangkat kecuali -1.',
      'Kelipatan boleh dikeluarkan, penjumlahan dan pengurangan boleh dikerjakan satu per satu.',
      'Setiap hasil bisa diperiksa sendiri dengan menurunkannya kembali.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Di Materi 01 kita mencari fungsi yang turunannya 2x + 1 dengan cara menebak lalu memeriksa. Cara itu jujur, tetapi lambat. Kalau lajunya x⁵ atau 3x² - 4x + 1, menebak jadi tidak nyaman.' },
      { jenis: 'paragraf', teks: 'Yang dibutuhkan ada dua: satu lambang tetap untuk menyebut "semua antiturunan f", dan beberapa aturan yang membuat pencariannya bisa dikerjakan, bukan ditebak.' },

      { jenis: 'sesi', judul: 'Lambangnya dan cara membacanya' },
      { jenis: 'paragraf', teks: 'Buku menuliskannya pada halaman 167 begini: ∫ f(x) dx = F(x) + C. Lambang panjang mirip huruf S itu tanda integral. Bentuknya memang berasal dari huruf S, singkatan dari kata "jumlah", dan itu petunjuk yang berguna untuk nanti.' },
      {
        jenis: 'poin',
        judul: 'Tiga bagian yang perlu dikenali',
        butir: [
          'Tanda integral - membuka pekerjaan, artinya "carilah semua antiturunan dari"',
          'Fungsi di dalamnya - yang dicari antiturunannya, disebut integran',
          'dx di belakang - menyebut peubah mana yang dipakai, dan sekaligus menandai di mana pekerjaannya berhenti',
        ],
      },
      { jenis: 'paragraf', teks: 'Seluruh tulisan itu bernama integral tak tentu. Kata "tak tentu" bukan berarti hasilnya tidak jelas. Artinya hasilnya belum satu, sebab C belum ditentukan, persis seperti yang kita lihat di Materi 01.' },

      { jenis: 'sesi', judul: 'Aturan pangkat, dan satu pangkat yang dikecualikan' },
      { jenis: 'paragraf', teks: 'Aturan yang paling sering dipakai adalah aturan pangkat, yaitu Sifat 3.2 di buku. Bunyinya: untuk mencari antiturunan xⁿ, naikkan pangkatnya satu, lalu bagi dengan pangkat yang baru itu: ∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C.' },
      {
        jenis: 'contoh',
        judul: 'Kenapa aturan itu berlaku',
        baris: [
          'kalau tebakannya   xⁿ⁺¹',
          'turunkan            hasilnya (n + 1) · xⁿ, kelebihan faktor n + 1',
          'buang kelebihannya  bagi tebakan tadi dengan n + 1',
          'jadi jawabannya     xⁿ⁺¹/(n + 1) + C',
        ],
        simpul: 'Pembaginya bukan hiasan. Ia ada untuk membatalkan faktor yang muncul saat pangkat diturunkan.',
      },
      { jenis: 'paragraf', teks: 'Dari cara itu terlihat kapan aturannya tidak bisa dipakai: kalau n + 1 bernilai nol, yaitu saat n bernilai -1. Membagi dengan nol tidak punya arti, jadi pangkat -1 adalah satu-satunya pangkat yang harus dikeluarkan dari aturan ini. Antiturunan dari x⁻¹ memang ada, tetapi bentuknya lain dan tidak dibahas di SMA.' },
      { jenis: 'sorot', teks: 'Naikkan pangkatnya, lalu bagi dengan pangkat yang baru. Berlaku untuk pangkat berapa pun kecuali -1.' },

      { jenis: 'sesi', judul: 'Tiga aturan perapian' },
      {
        jenis: 'poin',
        judul: 'Sifat 3.3 sampai 3.5, semuanya warisan dari sifat turunan',
        butir: [
          'Kelipatan - angka pengali boleh dikeluarkan dulu, dikerjakan belakangan',
          'Penjumlahan - dua suku yang dijumlahkan boleh dikerjakan satu per satu, lalu hasilnya dijumlahkan',
          'Pengurangan - berlaku sama, tinggal tandanya dijaga',
        ],
      },
      { jenis: 'paragraf', teks: 'Ketiganya berlaku karena turunan juga berperilaku begitu. Semua sifat di halaman ini dibuktikan buku dengan cara yang sama: tulis hasilnya, lalu turunkan, lalu lihat apakah kembali ke bentuk semula.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menaruh fungsi di papan atas dan antiturunannya di papan bawah, lalu membiarkan Anda mengubah pangkatnya.',
        langkah: [
          'Pilih pangkat 2 dan koefisien 1. Baca apa yang ditampilkan papan bawah dan pemeriksaan yang ditulis panel.',
          'Seret titik x pada papan atas. Bandingkan tinggi kurva di atas dengan kemiringan kurva di bawah pada x yang sama.',
          'Geser C. Apa yang berubah pada papan bawah, dan apa yang tidak?',
          'Sekarang pilih pangkat -1. Apa yang dilakukan mesinnya, dan alasan apa yang disebut panel?',
        ],
      },

      { jenis: 'sesi', judul: 'Dua contoh yang dikerjakan penuh' },
      {
        jenis: 'contoh',
        judul: 'Antiturunan dari x⁵',
        baris: [
          'pangkat sekarang   5',
          'naikkan satu       jadi 6',
          'bagi pangkat baru  x⁶/6',
          'periksa            turunan x⁶/6 adalah 6x⁵/6 = x⁵',
        ],
        simpul: 'Hasilnya ∫ x⁵ dx = x⁶/6 + C. Ini Contoh Soal 3.2 di buku, halaman 170.',
      },
      {
        jenis: 'contoh',
        judul: 'Antiturunan dari 3x² - 4x + 1',
        baris: [
          'pisahkan tiga suku   kerjakan satu per satu, lalu gabungkan',
          'suku 3x²             pangkat naik jadi 3, bagi 3: 3x³/3 = x³',
          'suku -4x             pangkat naik jadi 2, bagi 2: -4x²/2 = -2x²',
          'suku 1               pangkat naik jadi 1, bagi 1: x',
          'periksa              turunan x³ - 2x² + x adalah 3x² - 4x + 1',
        ],
        simpul: 'Hasilnya ∫ (3x² - 4x + 1) dx = x³ - 2x² + x + C. Satu C saja untuk seluruh jawaban, bukan satu C tiap suku, sebab jumlah beberapa tetapan tetap sebuah tetapan.',
      },
      { jenis: 'paragraf', teks: 'Aturan pangkat tadi hanya bekerja kalau yang dipangkatkan adalah x sendirian. Materi berikutnya menangani bentuk yang isinya sudah bukan x saja, misalnya (2x + 1)⁵.' },
    ],
    seringKeliru: {
      judul: 'Dikira antiturunan x² adalah 2x',
      isi: 'Yang ditulis di situ adalah turunannya, bukan antiturunannya. Kekeliruan ini menggoda karena kedua kata itu memakai bahan yang sama, yaitu pangkat dan koefisien, sehingga tangan bergerak ke arah yang sudah lebih sering dilatih di topik Turunan. Cara membedakannya cuma satu dan selalu berhasil: turunkan jawaban Anda. Turunan 2x adalah 2, bukan x², jadi 2x bukan jawabannya. Turunan x³/3 adalah x², jadi ∫ x² dx = x³/3 + C.',
    },
    widget: 'naik-pangkat',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 3,
    slug: 'substitusi',
    video: { berkas: 'integral03-substitusi.mp4', poster: 'integral03-substitusi.jpg' },
    judul: 'Substitusi, melihat lapisan',
    labelPendek: 'Substitusi',
    pertanyaan: 'Bagaimana mengintegralkan (2x + 1)⁵ tanpa menguraikannya?',
    intisari: [
      'Substitusi adalah aturan rantai dari topik Turunan yang dibaca dari arah sebaliknya.',
      'Namai lapisan dalamnya u, lalu hitung du. Bentuk soalnya harus memuat du itu.',
      'Kalau yang kurang hanya sebuah angka pengali, angka itu boleh disesuaikan. Kalau yang kurang memuat x, substitusinya tidak bisa dipakai.',
      'Jawaban selalu dikembalikan ke dalam x, dan selalu bisa diperiksa dengan menurunkannya.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Antiturunan dari (2x + 1)⁵ bisa dicari dengan cara yang sudah kita punya: uraikan dulu pangkat limanya, lalu kerjakan suku demi suku. Cara itu benar, dan melelahkan. Sekali diuraikan, ada enam suku dengan angka besar.' },
      { jenis: 'paragraf', teks: 'Sebelum lanjut, coba tebak dulu. Kalau aturan pangkat dipakai apa adanya, jawabannya akan berbentuk (2x + 1)⁶/6. Periksa tebakan itu dengan menurunkannya, dan Anda akan menemukan ada yang tidak pas.' },

      { jenis: 'sesi', judul: 'Kenapa tebakan langsung itu meleset' },
      {
        jenis: 'contoh',
        judul: 'Memeriksa tebakan (2x + 1)⁶/6',
        baris: [
          'turunkan lapisan luar   6(2x + 1)⁵/6 = (2x + 1)⁵',
          'aturan rantai           kalikan lagi dengan turunan isinya, yaitu 2',
          'hasil akhirnya          2(2x + 1)⁵',
        ],
        simpul: 'Kelebihan faktor 2. Jadi tebakan tadi harus dibagi 2, dan jawabannya (2x + 1)⁶/12 + C.',
      },
      { jenis: 'paragraf', teks: 'Angka 2 itu bukan datang dari mana-mana. Ia turunan dari isi kurungnya. Di topik Turunan, faktor itu muncul karena aturan rantai. Substitusi adalah cara merapikan urusan faktor tersebut supaya tidak perlu ditebak dan dibetulkan belakangan.' },

      { jenis: 'sesi', judul: 'Memberi nama pada lapisan dalam' },
      { jenis: 'paragraf', teks: 'Namai isi kurungnya u. Jadi u = 2x + 1. Turunan u terhadap x adalah 2, dan itu ditulis sebagai du = 2 dx. Bentuk du inilah yang harus dicari di dalam soal.' },
      {
        jenis: 'poin',
        judul: 'Empat langkah yang urutannya selalu sama',
        butir: [
          'Pilih u - biasanya bagian yang berada di dalam kurung, di bawah tanda akar, atau di pangkat',
          'Hitung du - turunkan u, lalu tempelkan dx',
          'Cocokkan - lihat apakah du sudah ada di dalam soal. Kalau kurang angka pengali saja, sesuaikan',
          'Kerjakan lalu kembalikan - selesaikan dalam u, lalu tulis lagi u sebagai bentuk aslinya dalam x',
        ],
      },
      { jenis: 'sorot', teks: 'Substitusi bukan trik. Ia aturan rantai yang dibaca dari kanan ke kiri.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya memberi sebuah soal dan tiga calon u. Pilih satu, dan mesin menunjukkan akibatnya.',
        langkah: [
          'Pilih dulu calon u yang menurut Anda salah, lalu perhatikan bagian soal yang disorot.',
          'Lihat sisanya di panel. Apakah sisa itu bisa menjadi du? Baca sebab yang disebut mesin.',
          'Sekarang pilih calon yang menurut Anda benar. Bagaimana sisanya sekarang dibandingkan dengan du?',
          'Buka langkahnya satu per satu sampai jawaban akhir. Apa yang dilakukan baris terakhir terhadap u?',
        ],
      },

      { jenis: 'sesi', judul: 'Tiga contoh dengan tingkat kesulitan menaik' },
      {
        jenis: 'contoh',
        judul: 'Contoh 1, faktornya perlu disesuaikan',
        baris: [
          'soal        ∫ (2x + 1)⁵ dx',
          'pilih u     u = 2x + 1, maka du = 2 dx',
          'cocokkan    soal hanya punya dx = du/2, jadi ∫ (2x + 1)⁵ dx = (1/2) ∫ u⁵ du',
          'kerjakan    (1/2) · u⁶/6 = u⁶/12',
          'kembalikan  ganti u dengan 2x + 1',
        ],
        simpul: 'Hasilnya (2x + 1)⁶/12 + C. Diperiksa dengan menurunkannya kembali.',
      },
      {
        jenis: 'contoh',
        judul: 'Contoh 2, faktornya sudah ada di soal',
        baris: [
          'soal        ∫ 2x(x² + 5)⁴ dx',
          'pilih u     u = x² + 5, maka du = 2x dx',
          'cocokkan    bagian 2x dx sudah ada di soal: ∫ 2x(x² + 5)⁴ dx = ∫ u⁴ du',
          'kerjakan    ∫ u⁴ du = u⁵/5',
          'kembalikan  ganti u dengan x² + 5',
        ],
        simpul: 'Hasilnya (x² + 5)⁵/5 + C. Ini Contoh Soal 3.3 di buku, halaman 172.',
      },
      {
        jenis: 'contoh',
        judul: 'Contoh 3, bentuk akar yang faktornya juga kurang',
        baris: [
          'soal        ∫ x √(x² + 5) dx',
          'pilih u     u = x² + 5, maka du = 2x dx',
          'cocokkan    soal punya x dx = du/2, jadi ∫ x √(x² + 5) dx = (1/2) ∫ √u du',
          'tulis ulang √u = u^(1/2)',
          'kerjakan    bagi 3/2 berarti kali 2/3: (1/2) · (2/3) u^(3/2) = (1/3) u^(3/2)',
          'kembalikan  ganti u dengan x² + 5',
        ],
        simpul: 'Hasilnya (1/3)(x² + 5)^(3/2) + C. Contoh ini menggabungkan dua kesulitan sekaligus: isinya bukan bentuk sederhana, dan faktornya kurang setengah.',
      },

      { jenis: 'sesi', judul: 'Kapan substitusi tidak bisa dipakai' },
      { jenis: 'paragraf', teks: 'Substitusi bukan alat yang cocok untuk semua bentuk. Ia hanya bekerja kalau sisa soal, setelah bagian u diambil, memang berbentuk du atau kelipatan angkanya.' },
      { jenis: 'paragraf', teks: 'Contoh 3 tadi berhasil karena yang kurang cuma sebuah angka, yaitu setengah. Angka boleh dipindah-pindah keluar masuk tanda integral, jadi kekurangan seperti itu selalu bisa ditambal.' },
      { jenis: 'paragraf', teks: 'Sekarang ganti soalnya menjadi ∫ √(x² + 5) dx saja, tanpa x di depan. Dengan u yang sama, du tetap menuntut 2x dx, sementara yang tersedia hanya dx. Yang kurang memuat x, dan x tidak boleh dipindah-pindah seperti angka. Substitusi berhenti di situ, dan bentuk seperti itu tidak dibahas di SMA.' },
      { jenis: 'sorot', teks: 'Kekurangan berupa angka boleh diperbaiki. Kekurangan yang memuat x tidak.' },
      { jenis: 'paragraf', teks: 'Materi berikutnya menambah dua kelompok bentuk lagi, yaitu perkalian dua jenis fungsi yang berbeda, serta fungsi trigonometri dan eksponensial.' },
    ],
    seringKeliru: {
      judul: 'Lupa membagi turunan isinya',
      isi: 'Jawaban (2x + 1)⁶/6 terlihat sangat masuk akal, sebab bentuknya persis mengikuti aturan pangkat. Yang tidak terlihat adalah faktor 2 yang muncul saat lapisan dalamnya ikut diturunkan. Godaannya kuat karena pada bentuk seperti (x + 1)⁵ jawaban itu memang benar, dan turunan isinya kebetulan 1 sehingga tidak mengubah apa-apa. Cara membedakannya: turunkan jawaban Anda sampai selesai, termasuk mengalikan dengan turunan isi kurung. Kalau muncul angka tambahan, jawabannya harus dibagi angka itu.',
    },
    widget: 'cocokkan-lapisan',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 4,
    slug: 'parsial-trigonometri-eksponen',
    judul: 'Parsial, trigonometri, dan eksponen',
    labelPendek: 'Parsial',
    pertanyaan: 'Kalau integrannya hasil kali dua fungsi berbeda jenis, seperti x sin x, bagaimana?',
    intisari: [
      'Aturan parsial adalah aturan hasil kali dari topik Turunan yang dibaca dari arah sebaliknya.',
      'Pilih u yang menjadi sederhana kalau diturunkan, dan dv yang masih bisa dicari antiturunannya.',
      'Antiturunan sinus membawa tanda minus, antiturunan kosinus tidak.',
      'Semua aturan di materi ini diperiksa dengan cara yang sama: turunkan hasilnya.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Di Materi 02 kita menangani bentuk pangkat biasa, dan di Materi 03 bentuk berlapis lewat substitusi. Sekarang bentuknya lain lagi: x · sin x. Dua bahan yang jenisnya berbeda, dikalikan.' },
      { jenis: 'paragraf', teks: 'Substitusi tidak menolong di sini. Kalau u dipilih sin x, sisanya x dx dan itu bukan du. Kalau u dipilih x, sisanya sin x dx dan itu juga bukan du. Perkalian dua jenis fungsi memang butuh alat lain.' },

      { jenis: 'sesi', judul: 'Aturan hasil kali, dibaca dari arah sebaliknya' },
      { jenis: 'paragraf', teks: 'Di topik Turunan ada aturan untuk menurunkan hasil kali dua fungsi: (uv)′ = u′v + uv′, turunan yang pertama dikali yang kedua, ditambah yang pertama dikali turunan yang kedua. Sekarang persamaan itu kita baca mundur.' },
      {
        jenis: 'contoh',
        judul: 'Dari aturan hasil kali ke aturan parsial',
        baris: [
          'mulai dari     d(uv), turunan dari u · v',
          'hasilnya       d(uv) = v du + u dv',
          'pindahkan      u dv = d(uv) − v du',
          'integralkan    ∫ u dv = uv − ∫ v du',
        ],
        simpul: 'Yang didapat: ∫ u dv = uv − ∫ v du. Inilah Sifat 3.7 di buku, halaman 169.',
      },
      { jenis: 'paragraf', teks: 'Nama parsial dipakai karena pekerjaannya diselesaikan sebagian dulu. Bagian uv langsung selesai, sedangkan sisanya masih berupa soal antiturunan lagi. Aturan ini berguna kalau sisa itu lebih ringan daripada soal semula.' },

      { jenis: 'sesi', judul: 'Memilih mana yang jadi u' },
      {
        jenis: 'poin',
        judul: 'Dua syarat yang harus dipenuhi sekaligus',
        butir: [
          'u sebaiknya menjadi lebih sederhana kalau diturunkan - x menjadi 1, dan itu kemajuan',
          'dv harus masih bisa dicari antiturunannya - sin x dx bisa, jadi boleh dipilih',
          'Kalau pilihannya terbalik - sisanya justru menjadi lebih rumit daripada soal semula, dan itu tanda untuk menukar pilihan',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Antiturunan dari x cos x',
        baris: [
          'pilih         u = x, maka du = dx',
          'pilih         dv = cos x dx, maka v = sin x',
          'pasang        ∫ x cos x dx = x sin x − ∫ sin x dx',
          'sisanya       ∫ sin x dx = -cos x, jadi x sin x − (-cos x) = x sin x + cos x',
        ],
        simpul: 'Hasilnya ∫ x cos x dx = x sin x + cos x + C. Turunkan hasil itu: sin x + x cos x - sin x = x cos x.',
      },
      { jenis: 'paragraf', teks: 'Perhatikan bahwa sisanya tadi jauh lebih ringan daripada soal awal. Itulah tanda pilihan u dan dv sudah tepat.' },

      { jenis: 'sesi', judul: 'Antiturunan bentuk trigonometri dan eksponensial' },
      {
        jenis: 'poin',
        judul: 'Sifat 3.8 dan 3.9, semuanya bisa Anda periksa sendiri',
        butir: [
          '∫ sin x dx = -cos x + C - sebab turunan -cos x adalah sin x',
          '∫ cos x dx = sin x + C - sebab turunan sin x adalah cos x',
          '∫ sec² x dx = tan x + C - sebab turunan tan x adalah sec² x',
          '∫ eˣ dx = eˣ + C - sebab eˣ adalah fungsi yang turunannya dirinya sendiri',
          '∫ eᵃˣ dx = eᵃˣ/a + C - dengan a ≠ 0',
        ],
      },
      { jenis: 'sorot', teks: 'Tanda minus itu milik sinus, bukan milik kosinus: ∫ sin x dx = -cos x + C, sedangkan ∫ cos x dx = sin x + C tanpa minus.' },
      { jenis: 'paragraf', teks: 'Alasannya bisa dilihat dari arah turunan. Turunan cos x adalah -sin x. Untuk membalikkannya, minus itu harus dipindahkan ke depan, dan hasilnya -cos x. Sementara turunan sin x adalah cos x, bersih tanpa tanda, jadi membalikkannya juga bersih.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya berupa permainan mencocokkan. Enam fungsi di kiri, enam antiturunan di kanan.',
        langkah: [
          'Pasangkan sin x lebih dulu. Anda memilih cos x atau -cos x? Perhatikan tanggapan alatnya.',
          'Kalau pilihannya salah, baca turunan kartu yang Anda pilih di panel. Di mana selisihnya?',
          'Lanjutkan sampai enam pasang, sampai semua kartu menyala.',
          'Ulangi tanpa melihat. Dengan cara apa tiap tebakan diperiksa?',
        ],
      },

      { jenis: 'sesi', judul: 'Pengayaan, parsial yang dikerjakan dua kali' },
      { jenis: 'paragraf', teks: 'Bagian ini pengayaan. Boleh dilewati tanpa kehilangan apa pun yang dipakai di materi berikutnya.' },
      {
        jenis: 'contoh',
        judul: 'Antiturunan dari x² sin x',
        baris: [
          'putaran pertama  u = x², dv = sin x dx, sehingga v = -cos x',
          'hasil sementara  ∫ x² sin x dx = -x² cos x + ∫ 2x cos x dx',
          'putaran kedua    kerjakan ∫ 2x cos x dx dengan parsial lagi, u = 2x, dv = cos x dx',
          'hasil putaran 2  ∫ 2x cos x dx = 2x sin x − ∫ 2 sin x dx = 2x sin x + 2 cos x',
        ],
        simpul: 'Hasilnya ∫ x² sin x dx = -x² cos x + 2x sin x + 2 cos x + C. Ini Contoh Soal 3.5 di buku, halaman 175.',
      },
      { jenis: 'paragraf', teks: 'Perlu dikatakan apa adanya: di antara semua alat di topik ini, parsial paling jarang muncul di soal ujian SMA. Ia dimuat di sini karena ada di buku dan karena asal usulnya bagus untuk dipahami, bukan karena akan sering Anda pakai.' },
      { jenis: 'paragraf', teks: 'Sampai di sini semua pekerjaan kita masih soal membalik turunan. Belum satu pun yang menghitung luas. Materi berikutnya memulai dari titik yang sama sekali lain, dan untuk sementara tampak tidak berhubungan dengan empat materi ini.' },
    ],
    seringKeliru: {
      judul: 'Tanda minus dipasang pada kosinus',
      isi: 'Menulis antiturunan cos x sebagai -sin x adalah kekeliruan yang sangat sering muncul, dan sebabnya masuk akal. Di topik Turunan, tanda minus memang melekat pada kosinus: turunan cos x adalah -sin x. Ingatan itu terbawa ke sini, padahal arah kerjanya sudah dibalik dan minusnya ikut berpindah. Cara membedakannya: turunkan jawaban Anda. Turunan -sin x adalah -cos x, yang berarti jawaban itu milik soal yang berbeda tandanya.',
    },
    widget: 'pasangkan-turunan-integral',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 5,
    slug: 'jumlahan-riemann',
    judul: 'Luas dari persegi panjang, jumlahan Riemann',
    labelPendek: 'Riemann',
    video: { berkas: 'integral05-riemann.mp4', poster: 'integral05-riemann.jpg' },
    pertanyaan: 'Bagaimana mengukur luas daerah yang salah satu tepinya melengkung?',
    intisari: [
      'Daerah bertepi lengkung diukur dengan menutupinya memakai persegi panjang yang luasnya bisa dihitung.',
      'Selang dibagi menjadi n bagian, dan tinggi tiap persegi panjang diambil dari satu titik sampel.',
      'Makin banyak bagiannya, makin kecil selisihnya terhadap luas sebenarnya.',
      'Pada kurva yang naik saja atau turun saja, titik sampel kiri dan kanan mengapit luas sebenarnya dari dua sisi; mana yang lebih besar tergantung naik atau turunnya.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Empat materi terakhir seluruhnya soal membalik turunan. Sekarang kita tinggalkan itu sebentar dan mulai dari tempat yang sama sekali lain: mengukur luas.' },
      { jenis: 'paragraf', teks: 'Luas persegi panjang sudah punya rumus, tinggal panjang dikali lebar. Luas segitiga dan trapesium juga sudah punya rumus. Tetapi daerah di bawah sebuah kurva tidak punya rumus siap pakai, sebab tepi atasnya melengkung dan tidak ada dua sisi yang bisa langsung dikalikan.' },
      { jenis: 'sorot', teks: 'Kalau bentuknya tidak bisa diukur langsung, tutupi dengan bentuk yang bisa. Itu gagasan seluruh materi ini.' },

      { jenis: 'sesi', judul: 'Menutupi daerah dengan persegi panjang' },
      { jenis: 'paragraf', teks: 'Ambil daerah di bawah kurva pada selang dari a sampai b. Potong selang itu menjadi n bagian yang sama lebar. Pembagian seperti itu namanya partisi, dan lebar tiap bagiannya kita sebut Δx = (b − a)/n.' },
      { jenis: 'paragraf', teks: 'Di tiap bagian, dirikan sebuah persegi panjang. Lebarnya Δx. Tingginya diambil dari nilai fungsi di satu titik yang dipilih di bagian itu, dan titik pilihan itu namanya titik sampel.' },
      { jenis: 'paragraf', teks: 'Jumlahkan luas semua persegi panjang tadi. Hasilnya disebut jumlahan Riemann, mengikuti nama Bernhard Riemann yang merapikan gagasan ini pada abad ke-19. Buku membahasnya di halaman 178 sampai 183.' },
      {
        jenis: 'poin',
        judul: 'Tiga pilihan titik sampel yang lazim',
        butir: [
          'Kiri - tinggi diambil dari ujung kiri tiap bagian',
          'Kanan - tinggi diambil dari ujung kanan tiap bagian',
          'Tengah - tinggi diambil dari titik tengah tiap bagian',
        ],
      },

      { jenis: 'sesi', judul: 'Satu contoh yang bisa diperiksa dengan gambar' },
      { jenis: 'paragraf', teks: 'Buku memakai contoh yang sengaja dipilih supaya jawabannya bisa diperiksa tanpa alat baru: f(x) = x pada selang [0, 7], dibagi menjadi 7 bagian. Daerah di bawahnya berbentuk segitiga siku-siku, jadi luas sebenarnya bisa dihitung dengan rumus SMP.' },
      {
        jenis: 'contoh',
        judul: 'Tujuh persegi panjang pada f(x) = x',
        baris: [
          'lebar tiap bagian   Δx = 7/7 = 1',
          'titik sampel kanan  tingginya 1, 2, 3, 4, 5, 6, 7',
          'jumlahkan           (1 + 2 + 3 + 4 + 5 + 6 + 7) · 1 = 28',
          'titik sampel kiri   tingginya 0, 1, 2, 3, 4, 5, 6, jumlahan luasnya 21',
          'luas segitiga       (1/2) · 7 · 7 = 24,5',
        ],
        simpul: 'Jumlahan kiri 21 terlalu kecil, jumlahan kanan 28 terlalu besar, dan luas sebenarnya 24,5 terjepit di antaranya.',
      },
      { jenis: 'paragraf', teks: 'Perhatikan bahwa dua jumlahan tadi mengapit jawabannya dari dua sisi. Itu berguna: walaupun belum tahu nilai pastinya, kita sudah tahu jawabannya pasti berada di antara 21 dan 28.' },

      { jenis: 'sesi', judul: 'Menambah bagian, mempersempit jepitan' },
      { jenis: 'paragraf', teks: 'Selisih 28 − 21 = 7, dan itu masih lebar. Sekarang bagi selang yang sama menjadi 14 bagian, lalu 70 bagian. Jepitan itu menyempit terus.' },
      { jenis: 'paragraf', teks: 'Alasannya bisa dilihat pada gambar. Bagian kurva yang tidak tertutup persegi panjang berbentuk segitiga kecil di tiap bagian. Kalau bagiannya digandakan, segitiga sisanya menjadi separuh lebarnya, dan totalnya menyusut.' },
      { jenis: 'sorot', teks: 'Makin banyak persegi panjangnya, makin rapat jepitan terhadap luas sebenarnya. Jawaban pastinya diambil dari arah yang dituju jepitan itu.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menumpuk persegi panjang di bawah kurva pilihan Anda, dan menghitungnya seketika.',
        langkah: [
          'Pilih fungsi f(x) = x pada selang [0, 7], dengan n = 7 dan titik sampel kanan. Bandingkan angka di panel dengan hitungan di atas.',
          'Naikkan n pelan-pelan sampai 60. Apa yang terjadi pada selisih terhadap luas sebenarnya?',
          'Ganti titik sampel ke kiri, lalu ke tengah. Mana yang paling cepat mendekat?',
          'Ganti fungsinya menjadi f(x) = 4 − x², lalu ulangi. Apa yang berbeda dari percobaan pertama?',
        ],
      },

      { jenis: 'sesi', judul: 'Kiri dan kanan, mana yang lebih besar' },
      { jenis: 'paragraf', teks: 'Pada contoh f(x) = x tadi, jumlahan kanan lebih besar daripada jumlahan kiri. Godaannya besar untuk menyimpulkan bahwa itu selalu terjadi. Coba periksa dengan kurva yang menurun.' },
      {
        jenis: 'contoh',
        judul: 'Empat persegi panjang pada f(x) = 4 − x², selang [0, 2]',
        baris: [
          'lebar tiap bagian   Δx = 2/4 = 0,5',
          'titik sampel kiri   tingginya 4; 3,75; 3; 1,75, jumlahan luasnya 6,25',
          'titik sampel kanan  tingginya 3,75; 3; 1,75; 0, jumlahan luasnya 4,25',
        ],
        simpul: 'Kali ini justru kiri yang lebih besar. Luas sebenarnya kira-kira 5,33, dan cara menghitungnya baru akan kita punya di Materi 07.',
      },
      { jenis: 'paragraf', teks: 'Jadi bukan kanan yang selalu besar, melainkan sisi tempat kurvanya lebih tinggi. Pada kurva naik itu sisi kanan, pada kurva turun itu sisi kiri.' },
      { jenis: 'paragraf', teks: 'Sampai di sini kita punya cara mengukur yang jujur tetapi belum selesai: hasilnya selalu berupa hampiran, dan makin baik hanya kalau n diperbesar. Materi berikutnya memberi nama untuk nilai yang dituju jepitan itu, dan lambang untuk menuliskannya.' },
    ],
    seringKeliru: {
      judul: 'Dikira jumlahan dengan titik sampel kanan selalu lebih besar',
      isi: 'Pada contoh pertama tadi memang begitu, dan hampir semua contoh pengenalan memakai kurva yang naik, sehingga polanya terasa seperti hukum. Padahal yang menentukan bukan kiri atau kanannya, melainkan di sisi mana kurva itu lebih tinggi. Pada kurva yang menurun seperti f(x) = 4 − x², jumlahan kiri justru yang lebih besar. Cara membedakannya: sebelum menyimpulkan, lihat dulu kurvanya naik atau turun pada selang yang diminta.',
    },
    widget: 'persegi-panjang-menumpuk',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 6,
    slug: 'integral-tentu',
    judul: 'Integral tentu dan sifat-sifatnya',
    labelPendek: 'Integral tentu',
    pertanyaan: 'Kalau bagiannya dibuat tak hingga banyak, apa nama hasilnya, dan bagaimana menuliskannya?',
    intisari: [
      'Integral tentu adalah nilai yang dituju jumlahan Riemann saat banyak bagiannya diperbesar tanpa henti.',
      'Batas bawah dan batas atas ditulis pada tanda integral, dan hasilnya sebuah bilangan, bukan sebuah fungsi.',
      'Bagian daerah yang berada di bawah sumbu x masuk hitungan dengan tanda negatif.',
      'Selang boleh dipecah di titik mana pun di dalamnya, dan jumlah kedua bagian selalu sama dengan keseluruhannya.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Di Materi 05, jumlahan Riemann selalu meleset sedikit, dan kelesetannya mengecil kalau bagiannya diperbanyak. Yang belum kita punya adalah nama untuk nilai yang dituju.' },
      { jenis: 'paragraf', teks: 'Di topik Limit, cara berpikir seperti itu sudah punya namanya sendiri: bukan hasil pada satu langkah tertentu, melainkan nilai yang dituju barisan hasilnya. Gagasan yang sama dipakai di sini.' },

      { jenis: 'sesi', judul: 'Namanya dan cara menuliskannya' },
      { jenis: 'paragraf', teks: 'Nilai yang dituju jumlahan Riemann saat banyaknya bagian diperbesar tanpa henti disebut integral tentu. Lambangnya tanda integral yang sudah kita kenal, ditambah dua angka: batas bawah di kakinya dan batas atas di kepalanya, ∫ₐᵇ f(x) dx.' },
      {
        jenis: 'poin',
        judul: 'Beda tegas dengan yang di Materi 02',
        butir: [
          'Tanpa batas - hasilnya sebuah keluarga fungsi, lengkap dengan C',
          'Dengan batas - hasilnya sebuah bilangan, dan C tidak muncul sama sekali',
          'Kata "tentu" - berarti nilainya sudah tertentu, sebab selangnya sudah dipatok dari a sampai b',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Menghitung ∫₀⁷ x dx lewat jumlahannya',
        baris: [
          'bagi jadi n bagian  Δx = 7/n',
          'titik sampel kanan  xᵢ = 7i/n, tingginya f(xᵢ) = 7i/n, untuk i = 1, 2, ..., n',
          'jumlahkan           Σ (7i/n)(7/n) = (49/n²)(1 + 2 + ... + n)',
          'pakai rumus deret   1 + 2 + ... + n = n(n + 1)/2',
          'rapikan             (49/n²) · n(n + 1)/2 = (49/2)(1 + 1/n)',
          'perbesar n          suku 1/n menuju nol, hasilnya 49/2',
        ],
        simpul: 'Nilainya ∫₀⁷ x dx = 49/2 = 24,5, persis luas segitiga yang kita hitung di Materi 05. Ini Contoh Soal 3.7 di buku, halaman 184.',
      },
      { jenis: 'paragraf', teks: 'Cara di atas benar dan melelahkan. Untuk fungsi yang lebih rumit, rumus deretnya tidak selalu ada. Cara cepatnya baru akan kita temukan di Materi 07; untuk sekarang yang penting adalah tahu apa sebenarnya benda yang sedang dihitung.' },

      { jenis: 'sesi', judul: 'Enam sifat yang membuat hitungan bisa dirapikan' },
      {
        jenis: 'poin',
        judul: 'Sifat 3.10 sampai 3.15, halaman 188 sampai 190',
        butir: [
          'Batas sama - kalau batas bawah dan batas atasnya sama, hasilnya nol. Tidak ada lebar, tidak ada luas',
          'Batas dibalik - menukar batas atas dan bawah membalik tanda hasilnya',
          'Kelipatan - angka pengali boleh dikeluarkan ke depan tanda integral',
          'Penjumlahan - dua fungsi yang dijumlahkan boleh dikerjakan satu per satu',
          'Pengurangan - berlaku sama, tandanya dijaga',
          'Pemecahan selang - untuk c di antara a dan b, ∫ₐᵇ f(x) dx = ∫ₐᶜ f(x) dx + ∫ᶜᵇ f(x) dx',
        ],
      },
      { jenis: 'paragraf', teks: 'Sifat pemecahan selang adalah yang paling sering dipakai nanti, dan artinya bisa dilihat langsung pada gambar: memotong sebuah daerah menjadi dua bagian tidak menambah atau mengurangi luasnya.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya memecah sebuah daerah di titik c yang bisa Anda geser sendiri.',
        langkah: [
          'Pilih kurva f(x) = x pada selang [0, 3]. Baca nilai bagian kiri, bagian kanan, dan seluruhnya di panel.',
          'Geser c ke mana pun di antara batasnya. Apa yang berubah, dan apa yang tidak?',
          'Geser c sampai menyentuh batas kiri. Berapa nilai bagian kiri sekarang?',
          'Ganti kurvanya menjadi f(x) = x³ − 4x pada selang [-2, 2]. Berapa angka di panel, dan cocokkah dengan daerah berwarna yang Anda lihat?',
        ],
      },

      { jenis: 'sesi', judul: 'Bagian yang berada di bawah sumbu' },
      { jenis: 'paragraf', teks: 'Sejauh ini semua kurva contoh berada di atas sumbu x, sehingga semua persegi panjangnya punya tinggi positif. Sekarang lihat apa yang terjadi kalau kurvanya turun melewati sumbu.' },
      { jenis: 'paragraf', teks: 'Di daerah itu nilai fungsinya negatif. Tinggi persegi panjangnya ikut negatif, jadi luas yang dijumlahkan juga negatif. Ini bukan kesalahan hitung, melainkan memang begitu cara kerjanya, dan hasil seperti itu disebut luas bertanda.' },
      {
        jenis: 'contoh',
        judul: 'Kurva f(x) = x³ − 4x pada selang [-2, 2]',
        baris: [
          'dari -2 sampai 0   kurvanya di atas sumbu, ∫₋₂⁰ (x³ − 4x) dx = 4',
          'dari 0 sampai 2    kurvanya di bawah sumbu, ∫₀² (x³ − 4x) dx = -4',
          'jumlahkan          ∫₋₂² (x³ − 4x) dx = 4 + (-4) = 0',
        ],
        simpul: 'Hasilnya nol, walaupun di layar jelas terlihat ada dua daerah berwarna yang tidak kosong. Dua bagian itu sama besar dan tandanya berlawanan.',
      },
      { jenis: 'sorot', teks: 'Integral tentu menghitung luas bertanda, bukan luas yang terlihat. Keduanya sama hanya kalau kurvanya tidak pernah turun di bawah sumbu.' },
      { jenis: 'paragraf', teks: 'Bedanya kelihatan sepele sekarang, tetapi justru di situlah kekeliruan paling sering terjadi pada soal ujian. Materi 09 khusus membahasnya.' },
      { jenis: 'paragraf', teks: 'Sekarang kita punya dua dunia yang lengkap dan terpisah: membalik turunan di Materi 01 sampai 04, dan mengukur luas di Materi 05 dan 06. Materi berikutnya menunjukkan bahwa keduanya ternyata benda yang sama.' },
    ],
    seringKeliru: {
      judul: 'Dikira hasilnya tidak mungkin negatif karena luas selalu positif',
      isi: 'Luas sebuah bidang di dunia nyata memang tidak pernah negatif, dan naluri itu benar untuk bidang. Yang dihitung integral tentu bukan bidangnya, melainkan jumlah persegi panjang yang tingginya diambil dari nilai fungsi, dan nilai fungsi boleh negatif. Godaannya kuat karena semua contoh awal memakai kurva di atas sumbu, sehingga dua hal yang berbeda terlihat sama. Cara membedakannya: gambar dulu kurvanya. Kalau ada bagian yang berada di bawah sumbu pada selang yang diminta, hasil integralnya bukan luas yang terlihat.',
    },
    widget: 'pecah-selang',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 7,
    slug: 'teorema-dasar-kalkulus',
    video: { berkas: 'integral07-teorema-dasar.mp4', poster: 'integral07-teorema-dasar.jpg' },
    judul: 'Dua dunia yang ternyata satu, Teorema Dasar Kalkulus',
    labelPendek: 'TDK',
    pertanyaan: 'Luas dari persegi panjang dan antiturunan tidak kelihatan berhubungan. Kenapa ternyata sama?',
    intisari: [
      'Fungsi luas A(x) mengukur luas bertanda dari a sampai x, jadi ia berubah saat x digeser.',
      'Teorema Dasar Kalkulus I: laju bertambahnya luas di titik x persis sama dengan tinggi kurva di titik itu.',
      'Karena itu fungsi luas adalah salah satu antiturunan dari fungsinya.',
      'Teorema Dasar Kalkulus II: ∫ₐᵇ f(x) dx = F(b) − F(a), dan C hilang dengan sendirinya.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Kita punya dua pekerjaan yang asal usulnya berbeda jauh. Yang pertama membalik mesin turunan. Yang kedua menumpuk persegi panjang dan menjumlahkan luasnya. Tidak ada alasan yang jelas kenapa keduanya harus berhubungan.' },
      { jenis: 'paragraf', teks: 'Namun di Materi 01 kita sudah melihat tanda pertamanya: total pengeluaran bisa dicari lewat luas di bawah grafik laju, dan bisa juga lewat antiturunan, dan keduanya memberi 156 juta. Materi ini menjelaskan kenapa itu bukan kebetulan.' },

      { jenis: 'sesi', judul: 'Luas yang dibiarkan tumbuh' },
      { jenis: 'paragraf', teks: 'Selama ini batas atas selalu sebuah angka tetap. Sekarang biarkan batas atasnya bergerak. Sebut A(x) luas bertanda dari a sampai x, dengan x bisa digeser ke kanan.' },
      { jenis: 'paragraf', teks: 'A bukan bilangan lagi, melainkan fungsi. Untuk tiap letak x ada satu nilai luas. Kalau x digeser ke kanan, A bertambah selama kurvanya berada di atas sumbu; kalau kurvanya sedang di bawah sumbu, A justru berkurang, sesuai luas bertanda di Materi 06. Fungsi seperti ini disebut fungsi luas.' },
      { jenis: 'paragraf', teks: 'Sekarang pertanyaan kuncinya. Kalau x digeser sedikit ke kanan, seberapa cepat A bertambah? Coba tebak dulu sebelum membaca lanjutannya, sambil membayangkan kurva yang tinggi dan kurva yang rendah.' },

      { jenis: 'sesi', judul: 'Pita tipis di ujung kanan' },
      {
        jenis: 'contoh',
        judul: 'Menghitung pertambahan luas',
        baris: [
          'geser batas atas   dari x menjadi x + h, dengan h sangat kecil',
          'tambahan luasnya   A(x + h) − A(x), berupa pita tipis di ujung kanan daerah',
          'bentuk pita itu    hampir persegi panjang, lebarnya h dan tingginya f(x)',
          'jadi tambahannya   A(x + h) − A(x) ≈ f(x) · h',
          'laju bertambahnya  (A(x + h) − A(x))/h ≈ f(x)',
        ],
        simpul: 'Jadi A′(x) = f(x): turunan fungsi luas di titik x sama dengan tinggi kurva di titik itu. Inilah Teorema Dasar Kalkulus I, halaman 190.',
      },
      { jenis: 'paragraf', teks: 'Kata "hampir" di baris ketiga memang perlu. Tepi atas pita itu ikut melengkung sedikit, jadi bentuknya bukan persegi panjang yang sempurna. Tetapi makin kecil h, makin tidak berarti lengkungan itu, dan di situlah cara berpikir dari topik Limit dipakai.' },
      { jenis: 'sorot', teks: 'Kecepatan bertambahnya luas di sebuah titik adalah tinggi kurva di titik itu. Kurva yang tinggi menambah luas dengan cepat, kurva yang rendah menambahnya pelan.' },
      { jenis: 'paragraf', teks: 'Sekarang bacalah kalimat itu sekali lagi dengan kata lain: turunan A adalah f. Yang berarti A adalah antiturunan dari f. Dua dunia tadi bertemu di kalimat ini.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya punya dua papan bertumpuk. Papan atas kurvanya, papan bawah luas yang sedang tumbuh.',
        langkah: [
          'Seret x pelan-pelan ke kanan. Perhatikan apa yang terjadi di papan atas dan di papan bawah.',
          'Berhenti di suatu titik. Perhatikan pita tipis yang menyala di ujung kanan daerah: berapa tingginya?',
          'Lihat papan bawah pada x yang sama, dan baca kedua angka yang ditulis panel berdampingan. Apa hubungannya?',
          'Ganti fungsinya menjadi f(x) = 4 − x². Saat kurva atas menurun mendekati nol, apa yang terjadi pada jejak di papan bawah?',
        ],
      },

      { jenis: 'sesi', judul: 'Dari sini lahir cara cepatnya' },
      { jenis: 'paragraf', teks: 'Kalau A adalah antiturunan f, dan F juga antiturunan f, maka A dan F hanya berbeda sebuah tetapan. Dari kenyataan sederhana itu keluar cara menghitung yang tidak memerlukan satu persegi panjang pun.' },
      {
        jenis: 'contoh',
        judul: 'Kenapa jawabannya cukup F(b) − F(a)',
        baris: [
          'sifat batas sama  A(a) = 0, sebab lebarnya nol',
          'yang dicari       A(b), yaitu luas dari a sampai b',
          'tulis ulang       A(b) = A(b) − A(a)',
          'ganti A dengan F  A(x) = F(x) + C, jadi selisih itu menjadi (F(b) + C) − (F(a) + C)',
          'C saling hapus    ∫ₐᵇ f(x) dx = F(b) − F(a)',
        ],
        simpul: 'Inilah Teorema Dasar Kalkulus II, halaman 192. C hilang bukan karena diabaikan, melainkan karena benar-benar terhapus saat dikurangkan.',
      },
      {
        jenis: 'contoh',
        judul: 'Mencoba cara baru itu pada ∫₁³ x² dx',
        baris: [
          'cari antiturunan     F(x) = x³/3',
          'masukkan batas atas  F(3) = 27/3 = 9',
          'masukkan batas bawah F(1) = 1/3',
          'kurangkan            9 − 1/3 = 26/3',
        ],
        simpul: 'Hasilnya ∫₁³ x² dx = 26/3 ≈ 8,67. Ini Contoh Soal 3.9 di buku, halaman 193, dan didapat tanpa menumpuk satu persegi panjang pun.',
      },
      { jenis: 'paragraf', teks: 'Bandingkan dengan pekerjaan di Materi 06 yang memerlukan rumus deret dan perhitungan limit. Perbedaan tenaganya besar sekali, dan itulah sebabnya teorema ini disebut dasar: ia menopang hampir semua hitungan integral yang akan Anda temui.' },
      { jenis: 'paragraf', teks: 'Materi berikutnya melatih cara memakainya dengan rapi, termasuk saat soalnya perlu disubstitusi lebih dulu.' },
    ],
    seringKeliru: {
      judul: 'C ikut dituliskan pada hasil yang memakai batas',
      isi: 'Sudah tertanam bahwa antiturunan wajib memakai C, jadi tangan otomatis menuliskannya juga di sini. Yang terlewat adalah bahwa jawabannya berupa selisih dua nilai, dan tetapan yang sama muncul di kedua nilai itu lalu saling menghapus. Bukan berarti C boleh dilupakan; ia memang ada, cuma tidak pernah bertahan sampai jawaban akhir. Cara membedakannya: lihat apakah ada dua angka batas pada tanda integralnya. Kalau ada, jawabannya sebuah bilangan dan tidak boleh memuat C.',
    },
    widget: 'luas-yang-tumbuh',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 8,
    slug: 'menghitung-integral-tentu',
    judul: 'Menghitung integral tentu',
    labelPendek: 'Menghitung',
    pertanyaan: 'Sekarang alatnya lengkap; bagaimana urutan kerja yang tidak tersesat?',
    intisari: [
      'Urutannya tetap: cari antiturunannya, masukkan batas atas, kurangi hasil batas bawah.',
      'Tanda kurung siku dengan dua angka di tepinya adalah cara menyimpan pekerjaan yang belum selesai.',
      'Kalau soalnya perlu disubstitusi, batasnya ikut diganti ke dalam u, atau dikembalikan dulu ke x sebelum batas dipakai.',
      'Kedua cara itu sah, tetapi tidak boleh dicampur dalam satu pengerjaan.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Semua bahan sudah ada. Aturan pangkat dan perapian dari Materi 02, substitusi dari Materi 03, sifat trigonometri dan eksponensial dari Materi 04, sifat integral tentu dari Materi 06, dan cara cepat dari Materi 07.' },
      { jenis: 'paragraf', teks: 'Yang belum ada adalah kebiasaan menuliskannya. Soal integral tentu jarang salah karena konsepnya; ia salah karena langkahnya tertukar atau ada batas yang lupa diganti.' },

      { jenis: 'sesi', judul: 'Tiga langkah dan satu tanda' },
      {
        jenis: 'poin',
        judul: 'Urutan yang tidak pernah berubah',
        butir: [
          'Cari antiturunannya - tanpa C, sebab C akan terhapus',
          'Masukkan batas atas - ganti setiap x dengan angka batas atas',
          'Kurangi dengan batas bawah - ganti setiap x dengan angka batas bawah, lalu kurangkan',
        ],
      },
      { jenis: 'paragraf', teks: 'Di antara langkah pertama dan kedua, antiturunannya ditulis di dalam tanda kurung siku, dengan batas bawah di kaki kanan dan batas atas di kepala kanan: [F(x)]ₐᵇ = F(b) − F(a). Tanda kurung siku itu bukan hiasan: ia mengingatkan bahwa pekerjaannya belum selesai, batasnya belum dimasukkan.' },
      {
        jenis: 'contoh',
        judul: 'Menghitung ∫₀³ (x² − 3x + 2) dx',
        baris: [
          'antiturunan tiap suku  F(x) = x³/3 − 3x²/2 + 2x',
          'tulis dalam kurung siku  [x³/3 − 3x²/2 + 2x]₀³',
          'masukkan batas atas    F(3) = 9 − 13,5 + 6 = 1,5',
          'masukkan batas bawah   F(0) = 0',
          'kurangkan              F(3) − F(0) = 1,5 − 0 = 1,5',
        ],
        simpul: 'Hasilnya ∫₀³ (x² − 3x + 2) dx = 3/2 = 1,5. Angka positif walaupun sebagian kurvanya berada di bawah sumbu, sebab bagian yang di atas lebih besar.',
      },

      { jenis: 'sesi', judul: 'Kalau soalnya perlu disubstitusi' },
      { jenis: 'paragraf', teks: 'Di Materi 03 substitusi selalu berakhir dengan mengembalikan u menjadi bentuk dalam x. Dengan batas, ada satu pilihan tambahan: batasnya sekalian diganti ke dalam u, sehingga tidak perlu kembali ke x sama sekali.' },
      {
        jenis: 'contoh',
        judul: 'Cara pertama, batasnya ikut diganti',
        baris: [
          'soal            ∫₀² x²/√(x³ + 1) dx',
          'pilih u         u = x³ + 1, maka du = 3x² dx',
          'sesuaikan       soal punya x² dx = du/3, jadi seluruhnya dikali 1/3',
          'ganti batasnya  x = 0 memberi u = 1, dan x = 2 memberi u = 9',
          'kerjakan        (1/3) ∫₁⁹ u^(-1/2) du = (1/3) [2√u]₁⁹',
          'masukkan        (2/3)(√9 − √1) = (2/3)(3 − 1) = 4/3',
        ],
        simpul: 'Hasilnya ∫₀² x²/√(x³ + 1) dx = 4/3. Setelah batasnya diganti, huruf x tidak muncul lagi sampai selesai.',
      },
      { jenis: 'paragraf', teks: 'Cara kedua: kerjakan seperti Materi 03 sampai jawabannya kembali dalam x, yaitu (2/3)√(x³ + 1), baru masukkan batas 0 dan 2. Hasilnya juga 4/3.' },
      { jenis: 'sorot', teks: 'Pilih satu cara, lalu selesaikan dengan cara itu. Yang berbahaya adalah mencampur keduanya: rumus sudah dalam u tetapi batasnya masih batas x.' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya membuka penyelesaian baris demi baris, dan tiap baris menyebutkan sifat mana yang dipakai.',
        langkah: [
          'Pilih soal pertama, lalu naikkan langkahnya satu per satu. Jangan langsung ke akhir.',
          'Pada tiap baris, tutup layar sebentar dan tebak baris berikutnya sebelum membukanya.',
          'Pilih soal yang memakai substitusi. Cari baris tempat batas lama dan batas baru ditulis berdampingan.',
          'Ulangi soal itu dengan cara yang satunya, yaitu kembali ke x dulu. Apakah jawabannya sama? Apa yang berbeda?',
        ],
      },
      { jenis: 'paragraf', teks: 'Sampai sini kita sudah bisa menghitung. Tiga materi terakhir memakainya untuk menjawab pertanyaan yang benar-benar ditanyakan orang, dan yang pertama adalah pertanyaan yang paling sering dijawab keliru.' },
    ],
    seringKeliru: {
      judul: 'Rumusnya sudah dalam u tetapi batasnya masih batas x',
      isi: 'Setelah substitusi, bentuk soalnya berubah menjadi u, dan di papan tulis batas 0 dan 2 tetap terlihat menempel di tanda integral. Pekerjaannya lalu diteruskan begitu saja, tanpa menyadari bahwa dua angka itu sekarang mengukur benda yang berbeda. Godaannya kuat karena hasilnya tetap keluar berupa angka yang kelihatan wajar, jadi tidak ada tanda bahaya apa pun. Cara membedakannya: setiap kali huruf peubahnya berganti, tanyakan batas ini milik siapa. Kalau rumusnya sudah dalam u, batasnya harus batas u.',
    },
    widget: 'hitung-bertahap',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 9,
    slug: 'luas-daerah',
    video: { berkas: 'integral09-luas-daerah.mp4', poster: 'integral09-luas-daerah.jpg' },
    judul: 'Luas daerah, termasuk yang di bawah sumbu',
    labelPendek: 'Luas',
    pertanyaan: 'Kalau kurvanya memotong sumbu x, kenapa integralnya bisa lebih kecil daripada luas yang terlihat?',
    intisari: [
      'Kalau kurva tidak pernah berada di bawah sumbu pada selang itu, luas daerahnya sama dengan hasil integralnya.',
      'Kalau kurva seluruhnya di bawah sumbu, luasnya adalah hasil integral yang dijadikan positif.',
      'Kalau kurva memotong sumbu, selang wajib dipecah di titik potongnya, lalu tiap bagian dipositifkan sebelum dijumlahkan.',
      'Menghitung tanpa memecah bisa memberi jawaban nol untuk daerah yang jelas-jelas ada.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Di Materi 06 kita sudah bertemu kurva yang sebagian berada di bawah sumbu, dan hasilnya nol padahal ada dua daerah berwarna di layar. Sekarang kita hadapi hal itu langsung, sebab inilah bentuk soal yang paling sering dijawab keliru.' },
      { jenis: 'paragraf', teks: 'Pertanyaannya harus dibaca hati-hati. "Berapa hasil integralnya" dan "berapa luas daerahnya" adalah dua pertanyaan berbeda, dan jawabannya hanya kebetulan sama pada kasus tertentu.' },

      { jenis: 'sesi', judul: 'Tiga keadaan, tiga perlakuan' },
      {
        jenis: 'poin',
        judul: 'Yang menentukan cuma satu hal: kurvanya di atas atau di bawah sumbu',
        butir: [
          'Seluruhnya di atas sumbu - luas daerahnya sama persis dengan hasil integralnya',
          'Seluruhnya di bawah sumbu - hasil integralnya negatif, dan luasnya adalah angka itu tanpa tanda minus',
          'Memotong sumbu - pecah selangnya di titik potong, hitung tiap bagian, jadikan positif satu per satu, baru dijumlahkan',
        ],
      },
      { jenis: 'paragraf', teks: 'Titik potong dengan sumbu dicari dengan menyamakan fungsinya dengan nol. Di titik itulah kurva bisa berpindah dari atas ke bawah atau sebaliknya. Kadang ia cuma menyentuh sumbu lalu kembali ke sisi yang sama, dan memotong di situ tetap aman: bagian yang terbentuk sekadar dua potong yang tandanya sama.' },
      { jenis: 'sorot', teks: 'Positifkan dulu tiap bagian, baru jumlahkan. Kalau dijumlahkan dulu, dua bagian yang berlawanan tanda akan saling memakan.' },

      { jenis: 'sesi', judul: 'Contoh yang memperlihatkan bedanya paling tajam' },
      { jenis: 'paragraf', teks: 'Ambil kurva y = x² − 4x pada selang [0, 6]. Samakan dengan nol: x² − 4x = x(x − 4) = 0, dan didapat dua titik potong, yaitu x = 0 dan x = 4. Jadi selangnya dipecah di x = 4.' },
      {
        jenis: 'contoh',
        judul: 'Dua bagian yang ternyata sama besar',
        baris: [
          'bagian 0 sampai 4  kurvanya di bawah sumbu, ∫₀⁴ (x² − 4x) dx = -32/3',
          'bagian 4 sampai 6  kurvanya di atas sumbu, ∫₄⁶ (x² − 4x) dx = 32/3',
          'kalau langsung dijumlah  -32/3 + 32/3 = 0',
          'positifkan dulu    32/3 + 32/3 = 64/3',
        ],
        simpul: 'Luas daerahnya 64/3 ≈ 21,3 satuan luas. Hasil integralnya nol. Dua jawaban yang sangat berbeda dari satu gambar yang sama.',
      },
      { jenis: 'paragraf', teks: 'Angka nol itu bukan salah hitung. Ia jawaban yang benar untuk pertanyaan "berapa hasil integralnya". Ia hanya salah kalau dipakai menjawab pertanyaan "berapa luas daerahnya".' },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya mewarnai daerah di atas sumbu dengan warna berbeda dari yang di bawah, dan menghitung keduanya sekaligus.',
        langkah: [
          'Pilih kurva y = x² − 4x, lalu tarik batas kiri ke 0 dan batas kanan ke 6.',
          'Bandingkan dua angka di panel: hasil integral dan luas. Sama atau beda?',
          'Geser batas kanan pelan-pelan dari 4 ke 6. Ke arah mana hasil integral bergerak?',
          'Ganti kurvanya menjadi sin x. Bisakah Anda menemukan batas yang membuat hasil integralnya nol? Bagaimana daerah biru dan merah saat itu?',
        ],
      },

      { jenis: 'sesi', judul: 'Contoh dengan tiga titik potong' },
      { jenis: 'paragraf', teks: 'Buku memakai soal yang lebih panjang: kurva y = x³ − 2x² − 5x + 6 pada selang [-2, 3]. Samakan dengan nol: (x + 2)(x − 1)(x − 3) = 0, dan didapat tiga titik potong, yaitu x = -2, x = 1, dan x = 3.' },
      { jenis: 'paragraf', teks: 'Dua di antaranya kebetulan persis batas selangnya, jadi yang benar-benar memotong di tengah hanya x = 1. Selangnya dipecah di situ.' },
      {
        jenis: 'contoh',
        judul: 'Menghitung dua bagian lalu menjumlahkannya',
        baris: [
          'bagian -2 sampai 1  kurvanya di atas sumbu, ∫₋₂¹ (x³ − 2x² − 5x + 6) dx = 63/4',
          'bagian 1 sampai 3   kurvanya di bawah sumbu, ∫₁³ (x³ − 2x² − 5x + 6) dx = -16/3',
          'hasil integralnya   63/4 + (-16/3) = 125/12',
          'luas daerahnya      63/4 + 16/3 = 253/12',
        ],
        simpul: 'Hasil integralnya kira-kira 10,4 dan luasnya kira-kira 21,1. Yang satu hampir separuh yang lain, padahal gambarnya sama.',
      },
      { jenis: 'paragraf', teks: 'Perhatikan bahwa dua angka itu berbeda jauh. Kalau soal ujian menanyakan luas dan Anda menjawab dengan hasil integralnya, selisihnya tidak akan terlihat sebagai kesalahan kecil.' },

      { jenis: 'sesi', judul: 'Kalau kurvanya tidak memotong sumbu' },
      { jenis: 'paragraf', teks: 'Tidak semua soal serumit itu. Buku juga memberi contoh yang aman: kurva y = x √(x² + 5) di kuadran pertama, dibatasi sumbu x dan garis x = 2.' },
      {
        jenis: 'contoh',
        judul: 'Luas yang tidak perlu dipecah',
        baris: [
          'periksa dulu       pada selang [0, 2] kurvanya selalu di atas sumbu',
          'jadi boleh langsung  L = ∫₀² x √(x² + 5) dx',
          'pakai substitusi   u = x² + 5, sehingga du = 2x dx, batasnya u = 5 sampai u = 9',
          'hasilnya           (1/2) ∫₅⁹ √u du = (1/3)(27 − 5√5)',
        ],
        simpul: 'L = (1/3)(27 − 5√5) ≈ 5,27 satuan luas. Ini Contoh Soal 3.13 di buku, halaman 204. Langkah pertamanya bukan menghitung, melainkan memeriksa letak kurvanya.',
      },
      { jenis: 'sorot', teks: 'Langkah pertama soal luas selalu sama: gambar dulu, lalu cari titik potongnya. Menghitung adalah langkah terakhir, bukan langkah pertama.' },
      { jenis: 'paragraf', teks: 'Materi berikutnya mengganti sumbu x dengan kurva kedua, dan cara berpikirnya ternyata hampir tidak berubah.' },
    ],
    seringKeliru: {
      judul: 'Luas dijawab langsung dengan hasil integralnya',
      isi: 'Pada hampir semua contoh pengenalan, kurvanya berada di atas sumbu, sehingga luas dan hasil integral memang sama. Dari puluhan latihan seperti itu terbentuk kebiasaan yang terasa seperti aturan. Padahal kesamaan itu bersyarat, dan syaratnya jarang disebut ulang. Cara membedakannya: sebelum menghitung apa pun, cari titik potong kurva dengan sumbu x di dalam selang yang diminta. Kalau ada, jawaban luasnya wajib dipecah dan dipositifkan per bagian. Kalau tidak ada, barulah keduanya boleh disamakan.',
    },
    widget: 'luas-dua-daerah',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 10,
    slug: 'luas-antara-dua-kurva',
    judul: 'Luas antara dua kurva',
    labelPendek: 'Dua kurva',
    pertanyaan: 'Kalau daerahnya dibatasi dua kurva, bukan kurva dan sumbu, apa yang diintegralkan?',
    intisari: [
      'Tinggi tiap persegi panjang sekarang adalah selisih dua kurva, yaitu yang di atas dikurangi yang di bawah.',
      'Batas kiri dan kanan didapat dari titik potong kedua kurva, yang dicari dengan menyamakan keduanya.',
      'Urutan pengurangan tidak bebas. Yang di atas harus dikurangi yang di bawah, kalau terbalik hasilnya negatif.',
      'Kalau kedua kurva bertukar posisi di dalam selang, daerahnya dipecah di titik tukar itu.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Bagian ini di luar Bab 3 buku Matematika Tingkat Lanjut Kelas XII, tetapi lazim keluar di ujian SMA, jadi dimuat di sini. Bahannya seluruhnya berasal dari materi sebelumnya.' },
      { jenis: 'paragraf', teks: 'Sampai sekarang daerah yang kita ukur selalu punya alas berupa sumbu x. Sekarang alasnya diganti dengan kurva lain. Contohnya daerah yang terkurung antara parabola y = x² dan garis y = x + 2.' },

      { jenis: 'sesi', judul: 'Persegi panjang yang alasnya bukan sumbu' },
      { jenis: 'paragraf', teks: 'Kembali ke gambar di Materi 05. Waktu itu tiap persegi panjang berdiri di atas sumbu, sehingga tingginya adalah nilai fungsi. Sekarang persegi panjangnya berdiri di atas kurva bawah dan berhenti di kurva atas.' },
      { jenis: 'paragraf', teks: 'Jadi tingginya bukan lagi f(x), melainkan selisih antara kurva atas dan kurva bawah, f(x) − g(x). Sisanya sama persis: lebarnya tetap Δx, jumlahnya tetap dijumlahkan, dan bagiannya tetap diperbanyak.' },
      { jenis: 'sorot', teks: 'Yang berubah cuma tinggi persegi panjangnya. Seluruh cara berpikirnya sama dengan Materi 05 sampai 07.' },
      { jenis: 'paragraf', teks: 'Karena itu jawabannya berupa integral dari selisih kedua kurva, yaitu yang di atas dikurangi yang di bawah, dihitung dari batas kiri sampai batas kanan: L = ∫ₐᵇ (f(x) − g(x)) dx.' },

      { jenis: 'sesi', judul: 'Mencari batas kiri dan kanan' },
      { jenis: 'paragraf', teks: 'Batasnya tidak diberikan pada soal seperti ini. Batas itu adalah tempat kedua kurva bertemu, sebab di luar titik pertemuan daerahnya tidak lagi terkurung.' },
      {
        jenis: 'contoh',
        judul: 'Titik potong parabola y = x² dan garis y = x + 2',
        baris: [
          'samakan keduanya  x² = x + 2',
          'pindahkan ruas    x² − x − 2 = 0',
          'faktorkan         (x + 1)(x − 2) = 0',
          'akarnya           x = -1 dan x = 2',
        ],
        simpul: 'Batas kirinya -1 dan batas kanannya 2. Dua angka itu yang dipakai pada integralnya.',
      },
      { jenis: 'paragraf', teks: 'Sekarang tentukan mana yang di atas. Cukup ambil satu titik di antara -1 dan 2, misalnya x = 0. Di situ garisnya bernilai 0 + 2 = 2 dan parabolanya bernilai 0² = 0, jadi garisnya yang di atas.' },
      {
        jenis: 'contoh',
        judul: 'Menghitung luasnya',
        baris: [
          'tinggi persegi panjang  (x + 2) − x²',
          'luasnya                 L = ∫₋₁² (x + 2 − x²) dx',
          'antiturunannya          F(x) = x²/2 + 2x − x³/3',
          'masukkan batas atas     F(2) = 2 + 4 − 8/3 = 10/3',
          'masukkan batas bawah    F(-1) = 1/2 − 2 + 1/3 = -7/6',
          'kurangkan               L = 10/3 − (-7/6) = 27/6 = 9/2',
        ],
        simpul: 'Luasnya 9/2 = 4,5 satuan luas.',
      },

      {
        jenis: 'coba',
        teks: 'Alat interaktifnya menggambar dua kurva sekaligus, lengkap dengan persegi panjang yang tingginya selisih keduanya.',
        langkah: [
          'Pilih parabola dan garis, lalu tekan tombol yang mengisi batas dari titik potongnya. Baca kedua batas di panel.',
          'Naikkan banyak persegi panjangnya. Di mana alas persegi panjangnya menempel?',
          'Geser batas kanan melewati titik potong 2. Apa yang terjadi pada persegi panjangnya?',
          'Perhatikan angka di panel saat itu. Apa yang berubah, dan menurut Anda kenapa urutan pengurangan tidak boleh ditebak?',
        ],
      },

      { jenis: 'sesi', judul: 'Kalau kedua kurva bertukar posisi' },
      { jenis: 'paragraf', teks: 'Tidak selalu ada satu kurva yang menang di seluruh selang. Ambil y = x³ dan y = x. Samakan keduanya: x³ = x, jadi x³ − x = x(x − 1)(x + 1) = 0, dan didapat tiga titik potong, yaitu x = -1, x = 0, dan x = 1.' },
      { jenis: 'paragraf', teks: 'Periksa satu titik di tiap bagian. Di antara -1 dan 0, ambil x = -0,5: x³ = -0,125 dan x = -0,5, jadi kurva y = x³ yang di atas. Di antara 0 dan 1 keadaannya terbalik.' },
      {
        jenis: 'contoh',
        judul: 'Dua bagian dengan urutan pengurangan yang berbeda',
        baris: [
          'bagian -1 sampai 0  yang di atas y = x³, jadi ∫₋₁⁰ (x³ − x) dx = 1/4',
          'bagian 0 sampai 1   yang di atas y = x, jadi ∫₀¹ (x − x³) dx = 1/4',
          'jumlahkan           L = 1/4 + 1/4 = 1/2',
        ],
        simpul: 'Luas seluruhnya 1/2. Kalau selangnya tidak dipecah dan urutannya dipakai satu macam saja, hasilnya nol.',
      },
      { jenis: 'sorot', teks: 'Di titik potong, urutan atas dan bawah bisa bertukar. Periksa satu titik di tiap bagian sebelum menuliskan pengurangannya.' },
      { jenis: 'paragraf', teks: 'Materi terakhir tidak menambah alat baru. Ia memperlihatkan di mana semua ini benar-benar dipakai orang di luar kelas.' },
    ],
    seringKeliru: {
      judul: 'Urutan pengurangan dianggap bebas',
      isi: 'Karena yang dicari luas, dan luas tidak pernah negatif, godaannya besar untuk menganggap urutannya tidak penting dan tanda minus di akhir tinggal dibuang. Persoalannya, membuang tanda minus di akhir kebetulan benar untuk satu daerah, tetapi menyesatkan begitu daerahnya lebih dari satu: dua bagian yang urutannya berbeda akan saling menghapus sebelum sempat dipositifkan. Cara membedakannya: ambil satu angka di dalam selang, masukkan ke kedua kurva, dan lihat sendiri mana yang nilainya lebih besar. Yang lebih besar itulah yang ditulis di depan.',
    },
    widget: 'dua-kurva',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 11,
    slug: 'integral-di-sekitar-kita',
    judul: 'Integral di sekitar kita',
    labelPendek: 'Dunia nyata',
    pertanyaan: 'Di mana luas di bawah sebuah kurva benar-benar dipakai?',
    intisari: [
      'Pola yang sama muncul di mana-mana: yang diketahui lajunya, yang dicari jumlahnya.',
      'Penjualan didapat dari laju penjualan, jarak dari kecepatan, usaha dari gaya, penghematan dari laju penghematan.',
      'Satuan hasilnya selalu satuan sumbu-y dikali satuan sumbu-x.',
      'Pertanyaan "kapan modalnya kembali" dijawab dengan mencari batas atas yang membuat hasilnya sama dengan modal.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Halaman ini tidak menambah aturan baru. Ia memperlihatkan empat keadaan yang bentuk pertanyaannya sama persis dengan pertanyaan pembuka Materi 01, hanya bendanya yang berganti.' },
      { jenis: 'sorot', teks: 'Kalau yang tercatat adalah kecepatan bertambahnya sesuatu, maka jumlah sesuatu itu adalah luas di bawah grafiknya.' },
      { jenis: 'paragraf', teks: 'Semua angka di bawah ini adalah angka contoh, dipilih supaya hitungannya bisa Anda ikuti sampai selesai. Dua di antaranya diambil dari buku dan disebutkan halamannya.' },

      { jenis: 'sesi', judul: 'Satu, penjualan dari laju penjualan' },
      { jenis: 'paragraf', teks: 'Sebuah ponsel model baru dipasarkan selama lima tahun. Banyak unit yang terjual pada tahun ke-x mengikuti f(x) = 3.000√x + 1.000 unit per tahun. Berapa total penjualan selama empat tahun pertama?' },
      {
        jenis: 'contoh',
        judul: 'Total empat tahun pertama',
        baris: [
          'yang diketahui   laju penjualan tiap tahun',
          'yang dicari      jumlahnya, jadi ∫₀⁴ (3.000√x + 1.000) dx',
          'antiturunannya   F(x) = 2.000x^(3/2) + 1.000x',
          'batas atas       F(4) = 2.000 · 8 + 4.000 = 20.000, dan F(0) = 0',
        ],
        simpul: 'Totalnya 20.000 unit. Ini Contoh Soal 3.14 di buku, halaman 207.',
      },

      { jenis: 'sesi', judul: 'Dua, jarak dari kecepatan' },
      { jenis: 'paragraf', teks: 'Sebuah mobil melambat dengan teratur. Pada detik ke-t kecepatannya v(t) = 12 − 2t meter per detik. Berapa jarak yang ditempuh selama lima detik pertama?' },
      {
        jenis: 'contoh',
        judul: 'Jarak dari grafik kecepatan',
        baris: [
          'yang diketahui   kecepatan, yaitu laju bertambahnya jarak: s = ∫₀⁵ (12 − 2t) dt',
          'antiturunannya   F(t) = 12t − t²',
          'batas atas 5     F(5) = 60 − 25 = 35',
          'batas bawah 0    F(0) = 0',
        ],
        simpul: 'Jaraknya s = 35 − 0 = 35 meter. Perhatikan satuannya: meter per detik dikali detik, hasilnya meter.',
      },
      { jenis: 'paragraf', teks: 'Kalau grafik kecepatannya berupa garis lurus seperti ini, luasnya berbentuk trapesium dan bisa dihitung dengan rumus SMP sebagai pemeriksa. Sisi sejajarnya 12 dan 2, tingginya 5, dan hasilnya juga 35.' },

      { jenis: 'sesi', judul: 'Tiga, usaha yang dilakukan sebuah gaya' },
      { jenis: 'paragraf', teks: 'Di fisika, usaha adalah gaya dikali perpindahan, W = F · s. Rumus itu hanya berlaku kalau gayanya tetap. Kalau gayanya berubah sepanjang jalan, jalannya harus dipotong-potong dan hasilnya dijumlahkan, dan itu persis pekerjaan yang sudah kita kuasai.' },
      {
        jenis: 'contoh',
        judul: 'Memindahkan benda dari x = 1 sampai x = 3',
        baris: [
          'gaya pada jarak x  F(x) = x² + 2x newton, jadi W = ∫₁³ (x² + 2x) dx',
          'antiturunannya     G(x) = x³/3 + x²',
          'batas atas 3       G(3) = 9 + 9 = 18',
          'batas bawah 1      G(1) = 1/3 + 1 = 4/3',
        ],
        simpul: 'Usahanya W = 18 − 4/3 = 50/3 joule, kira-kira 16,7 joule. Ini Contoh Soal 3.15 di buku, halaman 209.',
      },

      { jenis: 'sesi', judul: 'Empat, kapan modal kembali' },
      { jenis: 'paragraf', teks: 'Sebuah perusahaan membeli peralatan seharga 36.000 satuan rupiah. Peralatan itu menghemat biaya dengan laju h(x) = 4.000x + 1.000 per tahun pada tahun ke-x. Kapan penghematannya sudah menutup harga beli?' },
      { jenis: 'paragraf', teks: 'Pertanyaan ini bentuknya berbeda dari tiga yang tadi. Yang dicari bukan hasilnya, melainkan batas atasnya. Jadi hasilnya ditulis dulu sebagai fungsi dari batas yang belum diketahui, baru disamakan dengan 36.000.' },
      {
        jenis: 'contoh',
        judul: 'Mencari batas atas yang membuat hasilnya 36.000',
        baris: [
          'antiturunannya      H(x) = 2.000x² + 1.000x',
          'total sampai t      ∫₀ᵗ (4.000x + 1.000) dx = 2.000t² + 1.000t',
          'samakan             2.000t² + 1.000t = 36.000',
          'bagi 1.000          2t² + t − 36 = 0, yaitu (2t + 9)(t − 4) = 0',
          'akar yang masuk akal  t = 4',
        ],
        simpul: 'Modalnya kembali setelah 4 tahun. Persamaan itu punya dua akar, dan yang negatif dibuang karena waktu tidak berjalan mundur.',
      },
      { jenis: 'paragraf', teks: 'Empat keadaan tadi dibicarakan dengan kata yang berbeda-beda: unit terjual, meter, joule, rupiah. Tetapi bentuk pertanyaannya satu dan sama, dan itu jawaban untuk pertanyaan pembuka topik ini.' },
      { jenis: 'sorot', teks: 'Yang dipegang lajunya, yang dicari jumlahnya. Dari pengeluaran rumah tangga di Materi 01 sampai modal peralatan di halaman ini, semuanya pertanyaan yang sama.' },
    ],
    seringKeliru: {
      judul: 'Satuan hasilnya dikira sama dengan satuan sumbu-y',
      isi: 'Sumbu-y grafiknya meter per detik, jadi terasa wajar kalau jawabannya juga dibaca meter per detik. Padahal yang dihitung adalah luas, dan luas selalu berupa perkalian dua sumbu. Kekeliruan ini menggoda karena angka pada sumbu-y itulah yang paling menonjol di layar, sementara satuan sumbu-x sering terlupakan. Cara membedakannya: kalikan satuan kedua sumbunya. Meter per detik dikali detik menghasilkan meter, dan newton dikali meter menghasilkan joule.',
    },
    widget: 'dunia-nyata-integral',
    siap: true,
  },
]
