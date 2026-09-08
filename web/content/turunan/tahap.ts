/**
 * Turunan, 12 tahap belajar. Topik kedelapan MANTRA.
 *
 * Rancangannya: docs/superpowers/specs/2026-09-06-turunan-alur-belajar.md
 * Kerangka ini dibuat MATRA-MASTER 6 Sep 2026; isinya diisi sesi
 * MANTRA-TURUNAN-INTEGRAL. Tiap materi yang selesai diisi dan lolos gerbang
 * dinyalakan dengan `siap: true`, satu per satu.
 *
 * SUMBER MATERI
 * Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi), 2025.
 * Kementerian Pendidikan Dasar dan Menengah. Bab 2 "Turunan Fungsi",
 * halaman cetak 79 sampai 157 (berkas LIMIT.pdf, halaman PDF = cetak + 16).
 * Contoh dan angkanya ditulis sendiri, tetapi urutan konsep dan definisinya
 * mengikuti buku itu. Bagian A.1 (limit dan kontinuitas) TIDAK diulang: itu
 * topik Limit.
 *
 * KENAPA KEMIRINGAN DULU, RUMUS BELAKANGAN
 * Salah paham yang dilawan: "turunan itu rumus pangkat". Empat materi pertama
 * tidak memakai satu pun aturan; siswa melihat garis potong berubah jadi garis
 * singgung, lalu kemiringan itu berubah dari titik ke titik sampai membentuk
 * fungsi baru. Aturan pangkat DITURUNKAN dari definisi di Materi 04.
 *
 * SELURUH ANGKA DI BERKAS INI WAJIB DIPERIKSA MESIN dengan sympy lewat
 * `python alat/cek_soal.py alat/materi-turunan.json` (berkas klaimnya dibuat
 * sesi) sebelum materi dinyatakan siap.
 */

export type WidgetTurunan =
  | 'garis-potong'
  | 'sekan-ke-tangen'
  | 'grafik-turunan'
  | 'mesin-pangkat'
  | 'susun-polinom'
  | 'luas-berubah'
  | 'mesin-bertingkat'
  | 'kemiringan-sinus'
  | 'garis-singgung-geser'
  | 'peta-tanda'
  | 'kotak-terbesar'
  | 'dunia-nyata-turunan'

import type { Tahap } from '@/content/tipe'

/** Nama widget diketatkan ke senarai di atas: salah ketik ditolak TypeScript. */
type TahapTurunan = Omit<Tahap, 'widget'> & { widget?: WidgetTurunan }

/*
 * Blok penjelasan tiap materi masih RINTISAN: satu paragraf pengantar dan satu
 * kotak "coba". Sesi mengisinya sesuai rancangan (pertanyaan, isi pokok,
 * sering keliru, intisari), memecahnya jadi blok pendek, dan WAJIB
 * mempertahankan blok `coba` di tiap materi berwidget (aturan CLAUDE.md,
 * 5 Sep 2026: di HP widget disisipkan tepat di bawah kotak itu).
 */
export const TAHAP: TahapTurunan[] = [
  /* ================================================================= */
  {
    no: 1,
    slug: 'laju-rata-rata',
    judul: 'Seberapa cepat, rata-ratanya',
    labelPendek: 'Kenapa',
    pertanyaan: 'Pabrik membuat 20 barang sampai jam pertama dan 64 barang sampai jam ketiga. Kenapa laju produksinya terlihat sebagai kemiringan sebuah garis?',
    intisari: [
      'Laju perubahan rata-rata adalah selisih hasil dibagi selisih waktu.',
      'Angka itu sama persis dengan kemiringan garis yang menghubungkan dua titik pada kurva.',
      'Garis penghubung dua titik pada kurva itu namanya garis potong, atau garis sekan.',
      'Nilainya bergantung pada dua titik mana yang dipilih. Itulah sebabnya ia disebut rata-rata.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Sebuah pabrik kecil mencatat berapa barang yang sudah selesai sejak mesin dinyalakan. Catatannya begini.' },
      {
        jenis: 'contoh',
        judul: 'Catatan produksi, jam demi jam',
        baris: [
          'jam ke-0    0 barang',
          'jam ke-1   20 barang',
          'jam ke-2   44 barang',
          'jam ke-3   64 barang',
          'jam ke-4   78 barang',
          'jam ke-5   86 barang',
          'jam ke-6   90 barang',
        ],
        simpul: 'Sesudah jam kedua, tambahannya makin lama makin kecil. Pekerjanya lelah.',
      },
      { jenis: 'paragraf', teks: 'Pemilik pabrik bertanya: seberapa cepat pabrik ini bekerja antara jam ke-1 dan jam ke-3? Pertanyaannya sederhana, tapi cara menjawabnya yang akan kita pakai sepanjang topik ini.' },

      { jenis: 'sesi', judul: 'Selisih dibagi selisih' },
      { jenis: 'paragraf', teks: 'Dari jam ke-1 sampai jam ke-3, jumlah barang naik dari 20 menjadi 64. Jadi ada tambahan 44 barang, dan tambahan itu terjadi selama 2 jam.' },
      {
        jenis: 'contoh',
        judul: 'Menghitung laju rata-ratanya',
        baris: [
          'tambahan barang     64 - 20   = 44 barang',
          'lama waktunya       3 - 1     = 2 jam',
          'dibagi              44 : 2    = 22 barang per jam',
        ],
        simpul: 'Antara jam ke-1 dan jam ke-3, pabrik ini rata-rata membuat 22 barang tiap jam.',
      },
      { jenis: 'paragraf', teks: 'Hitungan itu punya nama: laju perubahan rata-rata. Bentuknya selalu sama, yaitu selisih nilai dibagi selisih waktu.' },

      { jenis: 'sesi', judul: 'Angka yang sama, dilihat sebagai gambar' },
      { jenis: 'paragraf', teks: 'Sekarang catatan tadi kita gambar sebagai kurva: waktu ke kanan, jumlah barang ke atas. Titik jam ke-1 dan titik jam ke-3 kita hubungkan dengan sebuah garis lurus.' },
      { jenis: 'paragraf', teks: 'Ingat lagi pelajaran SMP tentang kemiringan garis. Garis yang melewati dua titik punya kemiringan sebesar selisih tinggi dibagi selisih mendatar. Persis bentuk yang barusan kita hitung.' },
      { jenis: 'paragraf', teks: 'Untuk mengingatnya, kita singkat: miring = naik/datar. Kata miring di sini berarti kemiringan garis, bukan panjang sisi miring segitiga.' },
      {
        jenis: 'contoh',
        judul: 'Segitiga yang sama, dua pertanyaan',
        baris: [
          'Contoh panjang: sisi datar 4 cm, sisi tegak 3 cm',
          'Panjang sisi miring: √(3² + 4²) = √25 = 5 cm',
          'Kemiringan: 3/4 = 0,75',
        ],
        simpul: 'Pythagoras mencari panjang sisi miring. Kemiringan menjawab berapa naiknya untuk setiap satu langkah ke kanan.',
      },
      { jenis: 'paragraf', teks: 'Pada grafik pabrik, sisi tegak menunjukkan 44 barang dan sisi datar menunjukkan 2 jam. Keduanya bukan dua panjang dalam sentimeter, jadi kita tidak menjumlahkan kuadrat barang dan jam. Yang dicari adalah tambahan barang tiap jam: 44 barang / 2 jam = 22 barang per jam. Bacalah nilai sumbu dan satuannya, bukan panjang garis di layar.' },
      {
        jenis: 'poin',
        judul: 'Dua bahasa, satu angka',
        butir: [
          'Bahasa pabrik - tambahan barang dibagi lama waktu, hasilnya 22 barang per jam',
          'Bahasa gambar - selisih tinggi dibagi selisih mendatar, hasilnya kemiringan 22',
          'Keduanya hitungan yang sama, hanya diceritakan dengan cara berbeda',
        ],
      },
      { jenis: 'sorot', teks: 'Laju perubahan rata-rata dan kemiringan garis penghubung dua titik adalah angka yang sama. Yang berbeda hanya cara menyebutnya.' },
      { jenis: 'paragraf', teks: 'Garis yang menghubungkan dua titik pada sebuah kurva itu ada namanya sendiri: garis potong, atau dalam buku sering ditulis garis sekan. Kata potong dipakai karena garis itu memotong kurva di dua tempat.' },

      {
        jenis: 'coba',
        teks: 'Alatnya adalah kurva produksi tadi. Ada dua titik yang bisa Anda geser, dan garis potong di antara keduanya.',
        langkah: [
          'Atur jam awal di 1 dan selang waktu 2 jam. Bacalah kemiringannya: 22 barang per jam',
          'Geser jam awalnya ke 3, selangnya tetap 2 jam. Kemiringannya turun jauh',
          'Perhatikan segitiga di bawah garis: sisi mendatarnya selang waktu, sisi tegaknya tambahan barang',
          'Perkecil selang waktunya sedikit demi sedikit, dan lihat angkanya berhenti berubah banyak',
        ],
      },

      { jenis: 'sesi', judul: 'Kenapa disebut rata-rata' },
      { jenis: 'paragraf', teks: 'Kata rata-rata di sini bukan hiasan. Angkanya berubah kalau dua titik yang dipilih berubah, walaupun kurvanya itu-itu juga.' },
      {
        jenis: 'contoh',
        judul: 'Kurva yang sama, tiga jawaban berbeda',
        baris: [
          'jam ke-1 sampai jam ke-2   (44 - 20) : 1  = 24 barang per jam',
          'jam ke-1 sampai jam ke-3   (64 - 20) : 2  = 22 barang per jam',
          'jam ke-3 sampai jam ke-5   (86 - 64) : 2  = 11 barang per jam',
        ],
        simpul: 'Satu pabrik, satu hari yang sama, tiga angka yang berbeda. Semuanya benar.',
      },
      { jenis: 'paragraf', teks: 'Jadi laju rata-rata selalu menuntut jawaban atas pertanyaan tambahan: rata-rata antara jam berapa sampai jam berapa? Tanpa itu, angkanya belum punya arti.' },
      { jenis: 'paragraf', teks: 'Di topik Limit, Materi 01, Anda sudah melihat selang waktu yang dibuat menyusut terus menerus sampai tinggal satu saat. Di sini kita mulai dari selang yang masih lebar dan sengaja dibiarkan lebar dulu. Selang itu akan kita perkecil pada materi berikutnya, dan di situlah garis potong berubah menjadi sesuatu yang lain.' },
    ],
    seringKeliru: {
      judul: 'Laju rata-rata bukan nilai di tengah selang',
      isi: 'Godaannya masuk akal: kalau ditanya rata-rata antara jam ke-1 dan jam ke-3, banyak yang langsung melihat jam ke-2 lalu menjawab 44. Yang dibaca itu jumlah barang di tengah selang, bukan lajunya. Laju rata-rata sama sekali tidak peduli apa yang terjadi di antara kedua titik. Ia hanya menghitung selisih ujung dibagi selisih waktu, yaitu 22 barang per jam. Cara membedakannya: laju selalu punya satuan gabungan, yaitu barang PER jam. Kalau jawaban Anda satuannya cuma barang, yang Anda hitung bukan laju.',
    },
    video: { berkas: 'turunan1-laju-rata-rata.mp4', poster: 'turunan1-laju-rata-rata.jpg' },
    widget: 'garis-potong',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 2,
    slug: 'garis-singgung-lahir',
    judul: 'Garis potong yang berubah jadi garis singgung',
    labelPendek: 'Definisi',
    pertanyaan: 'Kalau titik Q terus mendekati P, garis potongnya menjadi garis apa, dan angka apa yang tersisa?',
    intisari: [
      'Saat titik kedua mendekati titik pertama, garis potong dapat mendekati suatu garis. Jika limit kemiringannya ada dan terhingga, garis yang dituju itu adalah garis singgung.',
      'Kemiringan garis singgung itu disebut kemiringan sesaat, dan angkanya disebut turunan di titik itu.',
      'Rumusnya limit dari selisih dibagi selisih: f(x₁ + h) dikurangi f(x₁), dibagi h, saat h menuju 0.',
      'Pada pecahan asal, h harus bukan nol. Kita mencari limit ketika h mendekati nol; pada contoh ini, menyederhanakan pecahan membantu menghitung limitnya.',
      'Hasilnya satu angka untuk satu titik, bukan sebuah garis dan bukan sebuah rumus.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Di materi sebelumnya, pabrik tadi menghasilkan 22 barang per jam rata-rata antara jam ke-1 dan jam ke-3. Sekarang pertanyaannya dipersempit: seberapa cepat pabrik itu bekerja TEPAT pada jam ke-1?' },
      { jenis: 'paragraf', teks: 'Kalau dijawab dengan cara lama, kita perlu dua titik. Tapi tepat pada jam ke-1 hanya ada satu titik. Selisih waktunya nol, selisih barangnya juga nol, dan nol dibagi nol tidak punya jawaban.' },
      { jenis: 'paragraf', teks: 'Persoalan itu sudah Anda temui di topik Limit, Materi 01, lewat speedometer. Jalan keluarnya sama: jangan menghitung tepat di satu titik, tapi di selang yang terus diperpendek.' },

      { jenis: 'sesi', judul: 'Titik kedua digeser mendekat' },
      { jenis: 'paragraf', teks: 'Sebut titik pertamanya P, dan titik kedua Q. Selisih mendatar dari P ke Q kita namai h. Untuk Q di kanan P, h positif; untuk Q di kiri P, h negatif. Saat besar selisih ini diperkecil, Q mendekati P dan arah garis potong PQ ikut berubah.' },
      { jenis: 'paragraf', teks: 'Agar asal hitungannya terlihat jelas, kita beralih ke contoh baru, f(x) = x². Ini bukan kurva produksi pabrik tadi. Pada x = 1, tingginya 1² = 1, sehingga P = (1, 1). Pada x = 2, tingginya 2² = 4. Dari P ke titik itu, langkah mendatarnya 2 − 1 = 1 dan kenaikannya 4 − 1 = 3. Jadi kemiringan garis potongnya 3 : 1 = 3.' },
      {
        jenis: 'contoh',
        judul: 'Kemiringan garis potong saat h diperkecil',
        baris: [
          'h = 1      dari (1, 1) ke (2, 4)          (4 - 1) : 1           = 3',
          'h = 0,5    dari (1, 1) ke (1,5 ; 2,25)    (2,25 - 1) : 0,5      = 2,5',
          'h = 0,1    dari (1, 1) ke (1,1 ; 1,21)    (1,21 - 1) : 0,1      = 2,1',
          'h = 0,01   dari (1, 1) ke (1,01 ; 1,0201) (1,0201 - 1) : 0,01   = 2,01',
        ],
        simpul: 'Angkanya merapat ke 2, dan garis potongnya makin menempel pada kurva di titik (1, 1).',
      },
      { jenis: 'paragraf', teks: 'Untuk contoh x² di x = 1 ini, kemiringan garis potong dapat dibuat sedekat yang kita mau ke 2 dengan mengambil h cukup dekat ke nol. Tabel memberi dugaan; hitungan berikut menjelaskan mengapa limitnya tepat 2.' },

      { jenis: 'paragraf', teks: 'Mengapa posisi Q ditulis 1 + h? Karena P mulai pada x = 1, lalu kita melangkah sejauh h. Tinggi Q adalah f(1 + h) = (1 + h)². Selisih tingginya (1 + h)² − 1, sedangkan selisih mendatarnya h. Jadi pecahan [(1 + h)² − 1] : h berasal dari kenaikan dibagi langkah mendatar, bukan rumus yang muncul tiba-tiba.' },

      { jenis: 'sesi', judul: 'Dikerjakan dengan huruf, bukan dengan tabel' },
      { jenis: 'paragraf', teks: 'Tabel di atas meyakinkan, tapi belum membuktikan. Sekarang hitungan yang sama kita kerjakan dengan huruf h, tanpa memasukkan angka satu per satu.' },
      {
        jenis: 'contoh',
        judul: 'Kemiringan garis potong f(x) = x² di x = 1',
        baris: [
          'tinggi titik Q       f(1 + h) = (1 + h)² = 1 + 2h + h²',
          'tinggi titik P       f(1) = 1',
          'selisih tingginya    (1 + 2h + h²) - 1 = 2h + h²',
          'dibagi selisih x     (2h + h²) : h',
          'faktorkan lalu bagi  h(2 + h) : h = 2 + h, untuk h ≠ 0',
          'ambil limit          saat h → 0, maka 2 + h → 2',
        ],
        simpul: 'Kemiringan sesaat kurva f(x) = x² di titik x = 1 adalah 2.',
      },
      {
        jenis: 'poin',
        judul: 'Urutan langkahnya tidak boleh dibalik',
        butir: [
          'Sebelum disederhanakan - mengisi h = 0 memberi 0 dibagi 0, dan itu tidak punya arti',
          'Mencoret h - hanya sah selama h bukan nol, sebab kita sedang membaginya',
          'Sesudah disederhanakan - untuk h ≠ 0, pecahan asal sama dengan 2 + h. Karena 2 + h mendekati 2 saat h mendekati nol, limit pecahan asal adalah 2; pecahan asal tetap tidak terdefinisi pada h = 0',
        ],
      },
      { jenis: 'paragraf', teks: 'Aturan urutan ini persis yang Anda pelajari di topik Limit, Materi 04, pada bentuk 0 per 0. Di sini bentuk itu muncul lagi, dan kali ini ia punya arti gambar.' },

      { jenis: 'paragraf', teks: 'Asal 1 + 2h + h² dapat dilihat lewat luas. Untuk h positif, pecah persegi bersisi 1 + h menjadi satu petak 1 × 1, dua persegi panjang 1 × h, dan satu petak h × h. Luasnya 1 + h + h + h² = 1 + 2h + h². Setelah dikurangi 1, tersisa 2h + h². Identitas aljabarnya juga berlaku untuk h negatif, walaupun gambar panjang tadi memakai h positif.' },
      { jenis: 'paragraf', teks: 'Kita juga harus memeriksa dari kiri P. Untuk h = −0,1, kemiringannya 2 + h = 1,9; untuk h = −0,01, kemiringannya 1,99. Dari kiri maupun kanan, nilai yang dituju sama, yaitu 2. Itulah alasan limit dua sisinya ada.' },

      { jenis: 'sesi', judul: 'Tiga nama untuk satu kejadian' },
      { jenis: 'paragraf', teks: 'Saat Q makin dekat ke P, garis potong mendekati garis melalui P dengan kemiringan 2. Garis yang dituju inilah garis singgung. Kita tidak membentuk garis potong dari dua titik yang sudah sama. Garis singgung juga tidak didefinisikan sebagai garis yang hanya punya satu perpotongan: pada kurva lain, garis singgung dapat memotong kurva lagi.' },
      {
        jenis: 'poin',
        judul: 'Yang baru saja diberi nama',
        butir: [
          'Garis singgung - garis yang dituju garis potong saat Q mendekati P, jika limit kemiringannya ada dan terhingga',
          'Kemiringan sesaat - kemiringan garis singgung itu, yaitu satu angka',
          'Turunan di sebuah titik - nama resmi untuk kemiringan sesaat tadi, ditulis f′(x₁)',
        ],
      },
      { jenis: 'sorot', teks: 'Turunan di titik x₁ adalah limit dari [ f(x₁ + h) dikurangi f(x₁) ] dibagi h, saat h menuju 0, jika limitnya ada dan terhingga. Di titik bagian dalam domain, limit dari kiri dan kanan harus sama.' },
      { jenis: 'paragraf', teks: 'Untuk contoh tadi berarti f′(1) = 2. Satu angka, untuk satu titik. Bukan sebuah garis, dan bukan sebuah rumus yang berlaku di mana-mana.' },

      {
        jenis: 'coba',
        teks: 'Alatnya menggambar kejadian tadi. Garis potong biru mengejar garis singgung ungu yang sudah dipasang samar sebagai pembanding.',
        langkah: [
          'Mulai dari h = 2. Garis birunya masih jauh miring dibanding garis ungu',
          'Turunkan h ke 1, lalu 0,5, lalu 0,1. Perhatikan tabel di sampingnya, angkanya turun menuju 2',
          'Turunkan sampai h = 0,01. Garis biru hampir menutupi garis ungu, tapi belum pernah sama persis',
          'Ganti fungsinya ke x³ - 3x lalu ulangi. Angka yang dituju berubah, tapi caranya sama',
        ],
      },

      { jenis: 'paragraf', teks: 'Satu titik lain akan memberi angka lain. Di x = 2, kurva x² terlihat lebih curam daripada di x = 1. Berarti tiap titik punya angkanya sendiri, dan kumpulan angka itu akan kita urus pada materi berikutnya.' },
    ],
    seringKeliru: {
      judul: 'Turunan itu angkanya, bukan garisnya',
      isi: 'Karena garis singgung yang paling menonjol di gambar, banyak yang menjawab pertanyaan "berapa turunannya" dengan menggambar sebuah garis. Godaannya wajar: garis itulah yang baru saja lahir di layar. Tapi yang disebut turunan adalah KEMIRINGAN garis itu, yaitu satu angka seperti 2. Garisnya sendiri punya persamaan tersendiri, dan cara menulisnya akan dibahas belakangan. Cara membedakannya: turunan bisa Anda tulis di kalkulator, garis singgung tidak.',
    },
    video: { berkas: 'turunan2-garis-singgung.mp4', poster: 'turunan2-garis-singgung.jpg' },
    widget: 'sekan-ke-tangen',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 3,
    slug: 'turunan-sebagai-fungsi',
    judul: 'Turunan sebagai fungsi baru',
    labelPendek: 'Fungsi f′',
    pertanyaan: 'Kalau tiap titik punya kemiringannya sendiri, apa yang terjadi kalau semua kemiringan itu digambar?',
    intisari: [
      'Turunan di satu titik adalah angka. Dengan mencatat kemiringan pada tiap titik yang turunannya ada, kita mendapat fungsi baru, ditulis f′.',
      'Untuk f(x) = x², kemiringannya di tiap titik ternyata selalu 2x, jadi f′(x) = 2x.',
      'Dua cara menulis turunan yang sama: notasi aksen f′(x), dan notasi Leibniz dy/dx.',
      'dy/dx menyatakan laju perubahan y terhadap x; ini bukan pembagian nilai y dengan nilai x.',
      'Bentuk f′ bisa sangat berbeda dari bentuk f, sebab f′ mencatat kemiringan, bukan tinggi.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Di Materi 02 kita baru mendapat satu angka: kemiringan kurva f(x) = x² di titik x = 1 adalah 2. Wajar kalau muncul pertanyaan berikutnya. Bagaimana di titik lain?' },
      { jenis: 'paragraf', teks: 'Ingat kemiringan dari Materi 01: kenaikan dibagi langkah mendatar. Tulisan singkatnya miring = naik/datar; miring berarti kemiringan, bukan panjang sisi miring yang dicari dengan Pythagoras. Materi 02 lalu mendekatkan dua titik untuk mendapatkan kemiringan garis singgung. Sekarang kita ulangi cara itu di titik yang berbeda.' },
      {
        jenis: 'contoh',
        judul: 'Cara yang sama, di tiga titik berbeda',
        baris: [
          'di x = 2     [ (2 + h)² - 2² ] : h  =  (4h + h²) : h  =  4 + h    menuju 4',
          'di x = 1     [ (1 + h)² - 1² ] : h  =  (2h + h²) : h  =  2 + h    menuju 2',
          'di x = -1    [ (-1 + h)² - 1 ] : h  =  (-2h + h²) : h = -2 + h    menuju -2',
        ],
        simpul: 'Tiga titik, tiga angka: 4, 2, dan -2. Tidak ada yang baru selain titik yang dipilih.',
      },
      { jenis: 'paragraf', teks: 'Kalau dikerjakan juga di x = 0, hasilnya 0. Sekarang keempat angka itu kita susun berdampingan dengan titiknya.' },
      {
        jenis: 'contoh',
        judul: 'Kemiringan kurva x² di beberapa titik',
        baris: [
          'x        -1     0     1     2',
          'f(x)      1     0     1     4',
          'kemiringan   -2     0     2     4',
        ],
        simpul: 'Barisan bawahnya selalu dua kali barisan atasnya: -2 = 2(-1), 0 = 2(0), 2 = 2(1), 4 = 2(2).',
      },

      { jenis: 'sesi', judul: 'Kemiringannya sendiri membentuk sebuah kurva' },
      { jenis: 'paragraf', teks: 'Kalau pasangan (x, kemiringan) tadi digambar sebagai titik-titik pada papan sendiri, keempatnya duduk rapi pada satu garis lurus, yaitu garis y = 2x.' },
      { jenis: 'paragraf', teks: 'Empat titik baru memperlihatkan pola. Supaya tahu alasan rumusnya berlaku di titik mana pun, gantikan angka titik awal dengan huruf x. Tinggi awalnya x², sedangkan tinggi di titik sebelah adalah (x + h)². Langkah mendatarnya h, yang belum nol.' },
      {
        jenis: 'contoh',
        judul: 'Dari selisih tinggi menuju rumus kemiringan',
        baris: [
          'kuadrat adalah perkalian     (x + h)(x + h) = x² + xh + hx + h²',
          'dua suku tengah sejenis      xh + hx = 2xh',
          'kurangi tinggi awal          (x² + 2xh + h²) - x² = 2xh + h²',
          'bagi langkah mendatar        (2xh + h²) : h = 2x + h, dengan h ≠ 0',
          'dekatkan h ke nol            2x + h menuju 2x, dari kedua sisi',
        ],
        simpul: 'Jadi kemiringan kurva x² di titik x adalah 2x. Rumus ini berlaku untuk setiap x real, bukan hanya empat contoh tadi.',
      },
      { jenis: 'sorot', teks: 'Kemiringan berhenti menjadi satu angka dan berubah menjadi sebuah fungsi. Fungsi itu namanya fungsi turunan, ditulis f′.' },
      { jenis: 'paragraf', teks: 'Jadi f(x) = x² punya f′(x) = 2x. Masukkan x = 3 ke f′ dan Anda langsung dapat kemiringannya di sana, yaitu 6, tanpa perlu mengulang hitungan limit dari awal.' },
      {
        jenis: 'poin',
        judul: 'Dua benda yang sering tertukar',
        butir: [
          'f(x) - tinggi kurva di titik x. Untuk x = 3 nilainya 9',
          'f′(x) - kemiringan kurva di titik x. Untuk x = 3 nilainya 6',
          'Keduanya dibaca dari kurva yang sama, tapi menjawab pertanyaan yang berbeda',
        ],
      },

      { jenis: 'sesi', judul: 'Dua cara menuliskannya' },
      { jenis: 'paragraf', teks: 'Fungsi turunan dapat ditulis dengan beberapa notasi. Dua bentuk berikut sering muncul dalam pelajaran. Jika y = f(x), keduanya menyatakan turunan fungsi yang sama.' },
      {
        jenis: 'poin',
        judul: 'Dua notasi, satu arti',
        butir: [
          'Notasi aksen - f′(x), dibaca "f aksen x". Lambang aksen menandai fungsi turunannya',
          'Cara Leibniz - dy/dx, dibaca "de y de x". Ia mengingatkan asal usulnya, yaitu perubahan y dibagi perubahan x',
        ],
      },
      { jenis: 'paragraf', teks: 'Pada tahap ini, baca dy/dx sebagai satu lambang turunan. Artinya laju perubahan y terhadap x, yang berasal dari limit perbandingan perubahan tinggi dengan perubahan mendatar. Ini bukan pembagian nilai y oleh nilai x.' },

      {
        jenis: 'coba',
        teks: 'Alatnya punya dua papan bertumpuk. Papan atas kurva f, papan bawah tempat kemiringannya dicatat.',
        langkah: [
          'Sapu x dari kiri ke kanan pelan-pelan. Garis singgung di papan atas ikut berputar',
          'Perhatikan papan bawah: tiap kemiringan meninggalkan jejak titik, dan jejaknya membentuk kurva f′',
          'Untuk x², jejaknya membentuk garis lurus. Untuk x³ - 3x, jejaknya melengkung',
          'Pilih fungsi |x|, lalu lewati x = 0. Dari kiri kemiringannya -1, dari kanan +1. Kedua hasil berbeda, jadi f′(0) tidak ada. Di sana widget menampilkan keterangan tidak ada di sini',
        ],
      },

      { jenis: 'sesi', judul: 'Bentuk f′ menceritakan bentuk f' },
      { jenis: 'paragraf', teks: 'Sambil menyapu tadi, ada tiga hal yang mungkin sudah Anda perhatikan sendiri di papan bawah.' },
      {
        jenis: 'poin',
        butir: [
          'Di bagian yang kurvanya menanjak, jejaknya berada di atas sumbu, jadi nilainya positif',
          'Di puncak atau dasar lembah yang mulus dan memiliki turunan, garis singgung mendatar dan nilai turunannya nol. Sudut tajam |x| di nol tidak memenuhi syarat ini',
          'Di bagian yang kurvanya menurun, jejaknya berada di bawah sumbu, jadi nilainya negatif',
        ],
      },
      { jenis: 'paragraf', teks: 'Tiga pengamatan itu akan kita pakai serius nanti untuk membaca bentuk grafik tanpa menggambarnya. Untuk sekarang cukup dilihat saja.' },
    ],
    seringKeliru: {
      judul: 'f′ bukan f yang digambar lebih kecil',
      isi: 'Karena keduanya digambar berdampingan dan sama-sama berasal dari satu kurva, f′ sering dikira versi mengecil atau versi bergeser dari f. Godaannya kuat pada f(x) = x², sebab di sana f′ memang terlihat lebih landai. Coba pada f(x) = x³ dikurangi 3x: bentuk f punya dua belokan, sedangkan f′ hanya sebuah parabola. Keduanya bukan kurva yang sama, dan itu langsung terlihat. Sebabnya sederhana: f mencatat TINGGI, sedangkan f′ mencatat KEMIRINGAN, dan dua hal itu tidak harus mirip.',
    },
    video: { berkas: 'turunan3-fungsi-turunan.mp4', poster: 'turunan3-fungsi-turunan.jpg' },
    widget: 'grafik-turunan',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 4,
    slug: 'aturan-pangkat',
    judul: 'Aturan pangkat lahir dari definisi',
    labelPendek: 'Pangkat',
    pertanyaan: 'Kenapa turunan x² adalah 2x, x³ adalah 3x², dan seterusnya?',
    intisari: [
      'Aturan pangkat bukan hafalan. Ia hasil hitungan limit yang sama, diulang untuk tiap pangkat.',
      'Untuk f(x) = axⁿ berlaku f′(x) = a·n·xⁿ⁻¹: pangkat dikalikan ke depan, lalu pangkatnya berkurang satu.',
      'Turunan fungsi konstan adalah 0, sebab grafiknya garis mendatar yang kemiringannya nol.',
      'Aturan yang sama berlaku untuk pangkat pecahan dan pangkat negatif, asal ditulis dulu sebagai pangkat.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Di Materi 03 kita sudah membuktikan f′(x) = 2x dari definisi turunan. Sekarang kita ulas hitungannya sebagai pijakan untuk memahami turunan pangkat lain.' },

      { jenis: 'sesi', judul: 'Dibuktikan untuk x pangkat dua' },
      {
        jenis: 'contoh',
        judul: 'Kemiringan f(x) = x² di titik x mana pun',
        baris: [
          'tinggi di titik sebelah    f(x + h) = (x + h)² = x² + 2xh + h²',
          'selisih tingginya          (x² + 2xh + h²) - x² = 2xh + h²',
          'dibagi jarak mendatarnya   (2xh + h²) : h',
          'h dicoret                  2x + h',
          'h didekatkan ke nol        2x + 0 = 2x',
        ],
        simpul: 'Jadi f(x) = x² memang punya f′(x) = 2x, untuk titik mana pun, bukan cuma empat titik tadi.',
      },
      { jenis: 'paragraf', teks: 'Perhatikan siapa yang menyelamatkan hitungan ini. Setelah dibagi h, semua sisa yang masih mengandung h lenyap begitu h didekatkan ke nol. Yang tertinggal hanya suku yang sama sekali tidak memuat h.' },

      { jenis: 'sesi', judul: 'Diulang untuk pangkat tiga' },
      {
        jenis: 'contoh',
        judul: 'Kemiringan f(x) = x³',
        baris: [
          'uraikan             (x + h)³ = x³ + 3x²h + 3xh² + h³',
          'selisih tingginya   3x²h + 3xh² + h³',
          'dibagi h            3x² + 3xh + h²',
          'h menuju nol        3x² + 0 + 0 = 3x²',
        ],
        simpul: 'f(x) = x³ punya f′(x) = 3x².',
      },
      { jenis: 'paragraf', teks: 'Kalau diteruskan ke x⁴, caranya sama persis dan hasilnya 4x³. Sekarang hasil-hasil itu kita jajarkan.' },
      {
        jenis: 'contoh',
        judul: 'Polanya mulai kelihatan',
        baris: [
          'f(x) = x       f′(x) = 1',
          'f(x) = x²      f′(x) = 2x',
          'f(x) = x³      f′(x) = 3x²',
          'f(x) = x⁴      f′(x) = 4x³',
        ],
        simpul: 'Pangkatnya turun dari depan menjadi pengali, lalu pangkat yang tertinggal berkurang satu.',
      },
      { jenis: 'sorot', teks: 'Aturan pangkat: untuk f(x) = a·xⁿ berlaku f′(x) = a·n·xⁿ⁻¹.' },
      { jenis: 'paragraf', teks: 'Huruf a di depan hanya ikut terbawa. Misalnya f(x) = 5x³ memberi f′(x) = 5 kali 3 kali x², yaitu 15x².' },

      {
        jenis: 'coba',
        teks: 'Alatnya membongkar hitungan tadi baris demi baris, untuk pangkat yang Anda pilih sendiri.',
        langkah: [
          'Pilih pangkat n = 2. Kotak hitungnya menulis uraian (x + h)² sampai hasilnya 2x',
          'Perhatikan baris yang masih memuat h, lalu kecilkan h dan lihat baris itu menyusut ke nol',
          'Ganti n ke 3 dan ke 4. Sisanya makin banyak, tapi semuanya tetap memuat h dan tetap lenyap',
          'Bandingkan angka hasil rumus di panel kanan dengan kemiringan garis potong di gambar. Keduanya bertemu saat h kecil',
        ],
      },

      { jenis: 'sesi', judul: 'Bagaimana kalau fungsinya cuma angka' },
      { jenis: 'paragraf', teks: 'Fungsi f(x) = 7 memberi nilai 7 untuk x berapa pun. Grafiknya garis mendatar. Garis mendatar tidak menanjak dan tidak menurun, jadi kemiringannya nol di mana-mana.' },
      {
        jenis: 'contoh',
        judul: 'Diperiksa dengan hitungan yang sama',
        baris: [
          'selisih tingginya   f(x + h) - f(x) = 7 - 7 = 0',
          'dibagi h            0 : h = 0',
          'h menuju nol        0',
        ],
        simpul: 'Turunan sebuah konstanta selalu 0.',
      },

      { jenis: 'sesi', judul: 'Pangkat pecahan dan pangkat negatif' },
      { jenis: 'paragraf', teks: 'Aturan tadi tidak berhenti pada bilangan bulat. Syaratnya cuma satu: bentuknya harus ditulis sebagai pangkat lebih dulu. Ini memakai sifat eksponen yang sudah Anda pelajari di kelas sebelumnya.' },
      {
        jenis: 'contoh',
        judul: 'Ditulis ulang dulu, baru diturunkan',
        baris: [
          '√x    ditulis  x^(1/2)    turunannya  (1/2)·x^(-1/2)  =  1 : (2√x)',
          '1/x   ditulis  x^(-1)     turunannya  (-1)·x^(-2)     =  -1 : x²',
          '1/x²  ditulis  x^(-2)     turunannya  (-2)·x^(-3)     =  -2 : x³',
        ],
        simpul: 'Aturannya tidak berubah. Yang berubah hanya cara menuliskan fungsinya sebelum aturan dipakai.',
      },
      { jenis: 'paragraf', teks: 'Tanda minus pada dua baris terakhir masuk akal kalau dilihat grafiknya: kurva 1/x untuk x positif selalu menurun, jadi kemiringannya memang harus negatif.' },
    ],
    seringKeliru: {
      judul: 'Turunan x² bukan x',
      isi: 'Kalimat pendek "pangkatnya turun satu" sering diingat separuh, sehingga x² menjadi x dan x³ menjadi x². Godaannya besar karena separuh kalimat itu memang benar. Yang hilang adalah langkah pertamanya: pangkat lama dikalikan ke depan dulu. Jadi x² memberi 2x, bukan x. Cara memeriksanya cepat: pada kurva x² di titik x = 3, kemiringannya terlihat lebih curam daripada 3. Alat di atas menunjukkan angka 6, dan 6 itulah 2 kali 3.',
    },
    video: { berkas: 'turunan4-aturan-pangkat.mp4', poster: 'turunan4-aturan-pangkat.jpg' },
    widget: 'mesin-pangkat',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 5,
    slug: 'suku-demi-suku',
    judul: 'Menurunkan suku demi suku',
    labelPendek: 'Jumlah',
    pertanyaan: 'Kalau fungsinya jumlah beberapa suku, bolehkah tiap suku diturunkan sendiri-sendiri?',
    intisari: [
      'Fungsi yang berupa jumlah atau selisih boleh diturunkan suku demi suku.',
      'Angka pengali di depan sebuah suku ikut terbawa apa adanya.',
      'Alasannya dari sifat limit: limit sebuah jumlah sama dengan jumlah limitnya.',
      'Hasil kali dan hasil bagi TIDAK boleh diperlakukan begitu, dan itu bisa dibantah dengan satu contoh angka.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Sampai Materi 04, semua fungsi yang kita turunkan cuma punya satu suku. Fungsi yang ditemui di soal jarang sesederhana itu. Bentuk seperti 3x⁴ dikurangi 2x² ditambah 5x dikurangi 7 jauh lebih sering muncul.' },
      { jenis: 'paragraf', teks: 'Pertanyaannya wajar: apakah kita harus mengulang hitungan limit dari awal untuk bentuk sepanjang itu, atau boleh dikerjakan potong demi potong?' },

      { jenis: 'sesi', judul: 'Angka pengali ikut terbawa' },
      { jenis: 'paragraf', teks: 'Mengalikan sebuah fungsi dengan 3 berarti membuat grafiknya tiga kali lebih tinggi. Kalau setiap tingginya dikali tiga, setiap kemiringannya juga ikut tiga kali lipat.' },
      {
        jenis: 'contoh',
        judul: 'Kelipatan tidak mengubah caranya',
        baris: [
          'f(x) = x²        f′(x) = 2x',
          'f(x) = 3x²       f′(x) = 3 · 2x   = 6x',
          'f(x) = -5x³      f′(x) = -5 · 3x² = -15x²',
        ],
        simpul: 'Angka pengalinya tinggal ditulis ulang di depan hasil turunannya.',
      },

      { jenis: 'sesi', judul: 'Jumlah dan selisih boleh dipecah' },
      { jenis: 'paragraf', teks: 'Untuk jumlah, alasannya datang dari topik Limit, Materi 05: limit sebuah jumlah sama dengan jumlah dari masing-masing limitnya. Karena turunan dibangun dari limit, sifat itu ikut menurun ke sini.' },
      { jenis: 'paragraf', teks: 'Akibatnya, fungsi yang tersusun dari beberapa suku boleh diturunkan satu suku demi satu suku, lalu hasilnya dirangkai kembali dengan tanda yang sama.' },
      {
        jenis: 'contoh',
        judul: 'Menurunkan 3x⁴ - 2x² + 5x - 7',
        baris: [
          'suku 3x⁴    pangkat 4 ke depan     4 · 3 x³   = 12x³',
          'suku -2x²   pangkat 2 ke depan     2 · (-2) x = -4x',
          'suku 5x     pangkat 1 ke depan     5 · 1      = 5',
          'suku -7     sebuah konstanta       0',
          'dirangkai                          12x³ - 4x + 5',
        ],
        simpul: 'Jadi f′(x) = 12x³ dikurangi 4x ditambah 5. Suku -7 hilang tanpa bekas.',
      },
      { jenis: 'sorot', teks: 'Menurunkan jumlah berarti menurunkan tiap sukunya, lalu menjumlahkan hasilnya kembali.' },
      { jenis: 'paragraf', teks: 'Hilangnya angka -7 bukan kecerobohan. Menambahkan 7 pada sebuah fungsi hanya mengangkat seluruh grafiknya ke atas tanpa memiringkannya sedikit pun, jadi kemiringannya tidak berubah di titik mana pun.' },

      {
        jenis: 'coba',
        teks: 'Alatnya punya empat angka yang bisa Anda atur untuk menyusun fungsi ax³ + bx² + cx + d, lengkap dengan kurva turunannya di bawah.',
        langkah: [
          'Ubah d saja, naik turun. Kurva atas bergeser ke atas dan ke bawah, tapi kurva bawah diam sama sekali',
          'Kembalikan d, lalu ubah c. Sekarang kurva bawah bergeser, sebab suku cx punya kemiringan sendiri',
          'Perhatikan rumus f′ di panel kanan: suku yang sedang Anda pegang ikut menyala',
          'Buat a = 0 dan b = 0. Fungsinya jadi garis lurus, dan turunannya jadi angka tetap',
        ],
      },

      { jenis: 'sesi', judul: 'Yang justru tidak boleh dipecah' },
      { jenis: 'paragraf', teks: 'Kemudahan tadi menggoda untuk dipakai di mana-mana. Sayangnya ia hanya berlaku untuk jumlah dan selisih. Untuk perkalian, cara itu langsung salah, dan salahnya bisa diperlihatkan dengan satu contoh yang sangat sederhana.' },
      {
        jenis: 'contoh',
        judul: 'Bukti bahwa perkalian tidak boleh dipecah',
        baris: [
          'ambil fungsi   f(x) = x · x, yang tidak lain adalah x²',
          'jawaban benar  f′(x) = 2x. Di x = 3 nilainya 6',
          'kalau dipecah  turunan x adalah 1, jadi 1 · 1 = 1',
          'bandingkan     6 tidak sama dengan 1',
        ],
        simpul: 'Satu contoh tandingan sudah cukup untuk membatalkan sebuah aturan.',
      },
      { jenis: 'paragraf', teks: 'Jadi perkalian dan pembagian butuh aturannya sendiri, dan itu yang akan kita bangun pada materi berikutnya, lengkap dengan alasan gambarnya.' },
    ],
    seringKeliru: {
      judul: 'Turunan hasil kali bukan hasil kali turunan',
      isi: 'Setelah melihat jumlah boleh dipecah, hampir semua orang mencoba memecah perkalian dengan cara yang sama, lalu menulis turunan u kali v sebagai turunan u dikali turunan v. Godaannya kuat sebab polanya terasa seragam. Contoh x kali x membantahnya dalam satu baris: jawabannya 2x, bukan 1. Cara mengingatnya: menambah dua hal berarti menambah kedua kemiringannya, tetapi mengalikan dua hal membuat keduanya saling memperbesar, dan pengaruh itu tidak bisa dipisah begitu saja.',
    },
    widget: 'susun-polinom',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 6,
    slug: 'hasil-kali-dan-bagi',
    judul: 'Hasil kali dan hasil bagi',
    labelPendek: 'Kali, bagi',
    pertanyaan: 'Kenapa turunan hasil kali bukan hasil kali turunan?',
    intisari: [
      'Aturan hasil kali: turunan dari u kali v adalah u′v ditambah uv′.',
      'Alasannya terlihat pada persegi panjang yang kedua sisinya bertambah: tambahan luasnya dua pita, ditambah pojok kecil yang lenyap.',
      'Aturan hasil bagi: turunan dari u dibagi v adalah (u′v dikurangi uv′) dibagi v².',
      'Urutan pada pembilang hasil bagi tidak boleh dibalik, sebab tandanya ikut berbalik.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Materi 05 berakhir dengan sebuah bantahan: turunan dari x kali x adalah 2x, bukan 1. Jadi perkalian butuh aturannya sendiri. Sebelum aturannya ditulis, kita lihat dulu kenapa bentuknya harus begitu.' },

      { jenis: 'sesi', judul: 'Persegi panjang yang kedua sisinya bertambah' },
      { jenis: 'paragraf', teks: 'Bayangkan sebuah persegi panjang. Panjangnya sebuah fungsi yang kita sebut u, lebarnya fungsi lain yang kita sebut v. Luasnya u kali v, dan itulah fungsi yang mau kita turunkan.' },
      { jenis: 'paragraf', teks: 'Sekarang x digeser sedikit sebesar h. Panjangnya bertambah sedikit, lebarnya juga bertambah sedikit. Luas yang baru bertambah, dan tambahan itu berbentuk huruf L di dua sisi persegi panjang lama.' },
      {
        jenis: 'poin',
        judul: 'Tambahan luasnya terdiri atas tiga bagian',
        butir: [
          'Pita kanan - selebar tambahan pada u, setinggi v yang lama. Luasnya tambahan-u dikali v',
          'Pita atas - setebal tambahan pada v, selebar u yang lama. Luasnya u dikali tambahan-v',
          'Pojok kecil - tambahan u dikali tambahan v, sebuah kotak mungil di sudut',
        ],
      },
      { jenis: 'paragraf', teks: 'Ketiganya dibagi h. Dua pita pertama menyisakan angka yang berarti. Pojok kecilnya tidak: ia hasil perkalian DUA tambahan yang sama-sama mengecil, jadi ia menyusut jauh lebih cepat dan hilang begitu h menuju nol.' },
      { jenis: 'sorot', teks: 'Aturan hasil kali: turunan dari u kali v adalah u′ kali v, ditambah u kali v′.' },
      {
        jenis: 'contoh',
        judul: 'Menurunkan (x² + 1)(x - 3)',
        baris: [
          'pilih bagiannya    u = x² + 1     dan   v = x - 3',
          'turunkan sendiri   u′ = 2x        dan   v′ = 1',
          'susun rumusnya     u′v + uv′ = 2x(x - 3) + (x² + 1)(1)',
          'jabarkan           2x² - 6x + x² + 1',
          'rapikan            3x² - 6x + 1',
        ],
        simpul: 'Diperiksa dengan cara lain: kalikan dulu menjadi x³ - 3x² + x - 3, lalu turunkan suku demi suku. Hasilnya juga 3x² - 6x + 1.',
      },
      { jenis: 'paragraf', teks: 'Pemeriksaan terakhir itu penting. Untuk fungsi sesederhana ini, kedua jalan bisa ditempuh dan hasilnya wajib sama. Kalau berbeda, ada langkah yang keliru.' },

      {
        jenis: 'coba',
        teks: 'Alatnya menggambar persegi panjang tadi beserta ketiga tambahan luasnya.',
        langkah: [
          'Atur h = 1. Terlihat dua pita berwarna dan satu pojok kecil di sudut kanan atas',
          'Baca panel kanan: luas tiap bagian sudah dibagi h',
          'Kecilkan h ke 0,5, lalu 0,2, lalu 0,05. Perhatikan pojoknya menyusut jauh lebih cepat daripada kedua pitanya',
          'Bandingkan jumlah kedua pita dengan angka hasil rumus. Selisihnya makin kecil, dan selisih itu persis luas pojoknya',
        ],
      },

      { jenis: 'sesi', judul: 'Kalau bentuknya pembagian' },
      { jenis: 'paragraf', teks: 'Untuk u dibagi v, aturannya mirip tetapi ada dua perbedaan yang harus dijaga: tandanya pengurangan, bukan penjumlahan, dan seluruhnya dibagi v kuadrat.' },
      { jenis: 'sorot', teks: 'Aturan hasil bagi: turunan dari u dibagi v adalah (u′v dikurangi uv′), dibagi v².' },
      {
        jenis: 'contoh',
        judul: 'Menurunkan (2x + 1) dibagi (x - 1)',
        baris: [
          'pilih bagiannya    u = 2x + 1     dan   v = x - 1',
          'turunkan sendiri   u′ = 2         dan   v′ = 1',
          'pembilangnya       u′v - uv′ = 2(x - 1) - (2x + 1)(1)',
          'jabarkan           2x - 2 - 2x - 1 = -3',
          'penyebutnya        v² = (x - 1)²',
          'hasilnya           -3 : (x - 1)²',
          'periksa angkanya   di x = 2 rumusnya memberi -3',
          'dengan selisih kecil  (f(2,01) - f(2)) : 0,01 = -2,97, sudah dekat ke -3',
        ],
        simpul: 'Hasilnya selalu negatif untuk x berapa pun selain 1, dan itu cocok dengan grafiknya yang memang selalu menurun.',
      },
      { jenis: 'paragraf', teks: 'Syarat tambahan yang sering terlupa: v tidak boleh nol. Pada contoh tadi berarti x tidak boleh 1, sebab di situ fungsinya sendiri tidak punya nilai.' },
    ],
    seringKeliru: {
      judul: 'Pembilang aturan hasil bagi tidak boleh dibalik',
      isi: 'Karena aturan hasil kali boleh ditulis dalam urutan mana saja, banyak yang mengira aturan hasil bagi juga begitu, lalu menulis uv′ dikurangi u′v. Godaannya masuk akal, sebab pada perkalian urutan memang tidak penting. Di sini penting, sebab yang di tengah adalah tanda kurang. Membalik urutannya membalik tanda seluruh jawaban. Pada contoh di atas, jawabannya berubah dari -3 menjadi 3, dan grafik yang terlihat menurun akan terbaca menanjak. Cara mengingatnya: yang diturunkan lebih dulu selalu bagian ATAS.',
    },
    video: { berkas: 'turunan6-hasil-kali.mp4', poster: 'turunan6-hasil-kali.jpg' },
    widget: 'luas-berubah',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 7,
    slug: 'aturan-rantai',
    judul: 'Fungsi di dalam fungsi, aturan rantai',
    labelPendek: 'Rantai',
    pertanyaan: 'Kalau y bergantung pada u, dan u bergantung pada x, seberapa cepat y berubah terhadap x?',
    intisari: [
      'Fungsi bertingkat punya bagian dalam dan bagian luar. Contohnya (x² + 1)³: yang dalam x² + 1, yang luar pangkat tiga.',
      'Aturan rantai: turunkan bagian luarnya dulu, lalu kalikan dengan turunan bagian dalamnya.',
      'Dalam notasi Leibniz: dy/dx sama dengan dy/du dikali du/dx.',
      'Kesalahan tersering adalah lupa mengalikan turunan bagian dalam.',
      'Bagian dalam boleh berupa waktu: kalau ukuran benda berubah tiap detik, isinya ikut berubah lewat aturan rantai.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Sampai Materi 06 semua fungsi bisa dijabarkan dulu, lalu diturunkan suku demi suku. Cara itu masih bisa dipakai untuk (x² + 1)². Untuk (2x - 5)⁸, menjabarkannya butuh kesabaran yang tidak masuk akal.' },
      { jenis: 'paragraf', teks: 'Jadi kita cari jalan lain. Caranya seperti biasa: kerjakan yang mudah dijabarkan dulu, lalu cari polanya.' },

      { jenis: 'sesi', judul: 'Dijabarkan dulu, supaya polanya terlihat' },
      {
        jenis: 'contoh',
        judul: 'Menurunkan (x² + 1)² dengan cara lama',
        baris: [
          'jabarkan      (x² + 1)² = x⁴ + 2x² + 1',
          'turunkan      4x³ + 4x',
          'faktorkan     4x(x² + 1)',
          'tulis ulang   2(x² + 1) · 2x',
        ],
        simpul: 'Baris terakhir sengaja ditulis begitu. Ruas kirinya turunan pangkat dua, ruas kanannya turunan dari x² + 1.',
      },
      {
        jenis: 'contoh',
        judul: 'Sekali lagi untuk (x² + 1)³',
        baris: [
          'jabarkan      (x² + 1)³ = x⁶ + 3x⁴ + 3x² + 1',
          'turunkan      6x⁵ + 12x³ + 6x',
          'faktorkan     6x(x⁴ + 2x² + 1) = 6x(x² + 1)²',
          'tulis ulang   3(x² + 1)² · 2x',
        ],
        simpul: 'Bentuknya sama persis: turunan pangkat, dikali 2x.',
      },
      { jenis: 'paragraf', teks: 'Dua hasil itu memberi pola yang sulit dianggap kebetulan. Angka 2x yang selalu muncul di belakang bukan angka sembarangan. Ia turunan dari x² + 1, yaitu bagian yang duduk di dalam kurung.' },

      { jenis: 'sesi', judul: 'Bagian dalam dan bagian luar' },
      { jenis: 'paragraf', teks: 'Fungsi seperti (x² + 1)³ sebenarnya dua mesin yang dipasang berderet. Angka x masuk ke mesin pertama yang menghitung x² + 1. Hasilnya, sebut saja u, masuk ke mesin kedua yang memangkatkan tiga. Bentuk seperti ini di kelas sebelumnya Anda kenal sebagai komposisi fungsi.' },
      {
        jenis: 'poin',
        judul: 'Dua bagian yang perlu dikenali sebelum menurunkan',
        butir: [
          'Bagian dalam - yang dikerjakan lebih dulu. Di sini u = x² + 1',
          'Bagian luar - yang mengolah hasilnya. Di sini pangkat tiga, yaitu u³',
        ],
      },
      { jenis: 'sorot', teks: 'Aturan rantai: turunkan bagian luarnya seolah bagian dalam sebuah huruf biasa, lalu kalikan dengan turunan bagian dalamnya.' },
      { jenis: 'paragraf', teks: 'Dengan notasi Leibniz dari Materi 03, aturan itu terlihat sangat rapi: dy/dx sama dengan dy/du dikali du/dx. Seolah du-nya saling meniadakan, walaupun perlu diingat lambang itu bukan pecahan biasa.' },
      { jenis: 'paragraf', teks: 'Kenapa dikalikan, bukan dijumlahkan? Karena pengaruhnya bertingkat. Kalau u berubah tiga kali lebih cepat daripada x, dan y berubah lima kali lebih cepat daripada u, maka y berubah lima belas kali lebih cepat daripada x.' },

      {
        jenis: 'coba',
        teks: 'Alatnya memasang dua mesin berderet, dengan pita kecil yang memperlihatkan seberapa besar perubahan diteruskan di tiap tingkat.',
        langkah: [
          'Pilih mesin dalam 3x dan mesin luar u², lalu seret pelan di garis x',
          'Bandingkan pita di garis u dengan pita di garis x: keduanya memakai satu skala, dan pita u selalu tiga kali lebih panjang',
          'Baca angka pengali di sebelah kiri: ×3 di tingkat pertama, lalu angka lain di tingkat kedua',
          'Ganti mesin dalam ke x². Sekarang pengali tingkat pertama ikut berubah mengikuti x, dan hasil kalinya juga',
        ],
      },

      { jenis: 'sesi', judul: 'Dipakai pada bentuk yang tidak mungkin dijabarkan' },
      {
        jenis: 'contoh',
        judul: 'Menurunkan (2x - 5)⁸',
        baris: [
          'bagian dalam    u = 2x - 5, turunannya 2',
          'bagian luar     u⁸, turunannya 8u⁷',
          'kalikan         8(2x - 5)⁷ · 2',
          'rapikan         16(2x - 5)⁷',
        ],
        simpul: 'Tanpa menjabarkan satu suku pun.',
      },
      {
        jenis: 'contoh',
        judul: 'Menurunkan akar dari (3x + 1)',
        baris: [
          'tulis sebagai pangkat   (3x + 1)^(1/2)',
          'bagian dalam            u = 3x + 1, turunannya 3',
          'bagian luar             u^(1/2), turunannya (1/2)u^(-1/2)',
          'kalikan                 (1/2)(3x + 1)^(-1/2) · 3',
          'rapikan                 3 : (2√(3x + 1))',
        ],
        simpul: 'Aturan pangkat dari Materi 04 tetap dipakai. Yang ditambahkan hanya pengali di belakang.',
      },

      { jenis: 'sesi', judul: 'Kalau bagian dalamnya adalah waktu' },
      { jenis: 'paragraf', teks: 'Sejauh ini bagian dalamnya selalu berupa x. Padahal bagian dalam boleh apa saja, termasuk sesuatu yang berubah menurut waktu. Sebuah balon yang ditiup, sebatang logam yang memuai, sebuah kubus yang sisinya memanjang: ukurannya berubah tiap detik, dan isinya ikut berubah.' },
      { jenis: 'paragraf', teks: 'Dua tingkat itu persis bentuk yang barusan kita bangun. Isi bergantung pada sisi, dan sisi bergantung pada waktu. Jadi pengalinya juga dikalikan.' },
      {
        jenis: 'contoh',
        judul: 'Kubus yang sisinya memanjang 2 cm tiap detik',
        baris: [
          'isi kubus             V = s³, jadi dV/ds = 3s²',
          'sisinya memanjang     ds/dt = 2 cm per detik',
          'aturan rantai         dV/dt = dV/ds · ds/dt = 3s² · 2',
          'saat sisinya 5 cm     3 · 25 · 2 = 150',
        ],
        simpul: 'Isinya bertambah 150 cm³ tiap detik, padahal sisinya hanya memanjang 2 cm tiap detik.',
      },
      { jenis: 'paragraf', teks: 'Perhatikan betapa jauh selisihnya. Sisi bertambah 2, tetapi isi bertambah 150. Sebabnya kubus punya tiga arah sekaligus, dan aturan rantai yang menghitungkan hal itu untuk kita.' },
      { jenis: 'paragraf', teks: 'Pola ini muncul di banyak soal terapan, dan bentuknya selalu sama: cari dulu turunan yang menghubungkan kedua besaran, lalu kalikan dengan laju yang sudah diketahui.' },
    ],
    seringKeliru: {
      judul: 'Turunan bagian dalam sering tertinggal',
      isi: 'Jawaban yang paling sering muncul untuk (2x - 5)⁵ adalah 5(2x - 5)⁴, lalu berhenti. Godaannya besar sebab bagian itu sudah terlihat lengkap dan mirip aturan pangkat yang sudah dikuasai. Yang hilang adalah pengali 2, yaitu turunan dari 2x - 5. Jawaban benarnya 10(2x - 5)⁴. Cara memeriksanya tanpa menghitung ulang: kalau bagian dalamnya diganti menjadi x saja, pengalinya menjadi 1 dan jawaban pendek tadi baru benar. Selama bagian dalamnya bukan x polos, selalu ada pengali yang harus ikut.',
    },
    video: { berkas: 'turunan7-aturan-rantai.mp4', poster: 'turunan7-aturan-rantai.jpg' },
    widget: 'mesin-bertingkat',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 8,
    slug: 'sinus-kosinus-eksponen',
    judul: 'Turunan sinus, kosinus, dan eˣ',
    labelPendek: 'Trigonometri, eˣ',
    pertanyaan: 'Kalau fungsinya bukan pangkat, dari mana turunannya?',
    intisari: [
      'Kemiringan grafik sinus di setiap titik sama dengan tinggi grafik kosinus di titik yang sama, jadi turunan sin x adalah cos x.',
      'Turunan cos x adalah negatif sin x. Tanda minusnya tidak boleh hilang.',
      'Turunan tan x adalah 1 dibagi cos²x, diperoleh dari aturan hasil bagi.',
      'Semua rumus itu hanya berlaku kalau sudutnya diukur dalam radian.',
      'Ada satu bilangan pokok yang membuat kemiringan kurva sama persis dengan tingginya. Bilangan itu disebut bilangan e, kira-kira 2,718.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Semua aturan sampai Materi 07 berangkat dari bentuk pangkat. Fungsi sin x bukan pangkat, dan tidak bisa diubah menjadi pangkat. Jadi aturan pangkat tidak punya pegangan di sini, dan kita harus kembali ke gambar.' },

      { jenis: 'sesi', judul: 'Kemiringan sinus dibaca dari grafiknya' },
      { jenis: 'paragraf', teks: 'Grafik sin x sudah Anda kenal dari topik Trigonometri, Materi 09. Sekarang grafik itu kita sapu dari kiri ke kanan, dan di tiap titik kita catat kemiringannya.' },
      {
        jenis: 'contoh',
        judul: 'Kemiringan grafik sin x di empat titik penting',
        baris: [
          'di x = 0        grafik menanjak paling curam       kemiringan  1',
          'di x = π/2      grafik di puncak, mendatar         kemiringan  0',
          'di x = π        grafik menurun paling curam        kemiringan -1',
          'di x = 3π/2     grafik di dasar lembah, mendatar   kemiringan  0',
        ],
        simpul: 'Deretan angka 1, 0, -1, 0 itu persis nilai cos x di keempat titik yang sama.',
      },
      { jenis: 'paragraf', teks: 'Kalau seluruh kemiringan itu digambar sebagai kurva baru, cara yang sudah kita pakai di Materi 03, hasilnya bukan kurva asing. Ia grafik kosinus.' },
      { jenis: 'sorot', teks: 'Turunan sin x adalah cos x.' },
      { jenis: 'paragraf', teks: 'Diperlakukan sama, grafik kosinus memberi hasil yang mirip tetapi terbalik. Di x = 0 grafik kosinus sedang di puncak, jadi kemiringannya 0. Sesudah itu ia menurun, jadi kemiringannya negatif.' },
      { jenis: 'sorot', teks: 'Turunan cos x adalah negatif sin x.' },

      { jenis: 'sesi', judul: 'Diperiksa lewat definisi, bukan cuma dilihat' },
      { jenis: 'paragraf', teks: 'Membaca gambar meyakinkan, tapi kita sudah sepakat sejak Materi 04 bahwa pola perlu diperiksa. Untuk sinus, hitungannya bertumpu pada satu limit yang sudah Anda buktikan di topik Limit, Materi 08.' },
      {
        jenis: 'contoh',
        judul: 'Kenapa turunan sin x keluar sebagai cos x',
        baris: [
          'mulai dari definisi   [ sin(x + h) - sin x ] : h',
          'jabarkan sin(x + h)   sin x · cos h + cos x · sin h',
          'kelompokkan           sin x · (cos h - 1) : h  +  cos x · (sin h : h)',
          'saat h menuju nol     (cos h - 1) : h menuju 0, dan (sin h : h) menuju 1',
          'tersisa               sin x · 0 + cos x · 1 = cos x',
        ],
        simpul: 'Jadi hasil bacaan grafik tadi memang benar, bukan kebetulan.',
      },
      { jenis: 'paragraf', teks: 'Satu syarat penting menempel pada hitungan itu. Limit sin h dibagi h bernilai 1 hanya kalau sudut diukur dalam radian. Kalau sudutnya derajat, semua rumus di materi ini berubah dan menjadi jauh lebih berantakan. Karena itu, sejak sekarang sudut selalu radian.' },

      {
        jenis: 'coba',
        teks: 'Alatnya memakai dua papan seperti di Materi 03, tetapi kali ini untuk fungsi yang bukan pangkat.',
        langkah: [
          'Pilih sin x, lalu sapu x dari kiri ke kanan. Perhatikan jejak kemiringan yang terbentuk di papan bawah',
          'Nyalakan Tampilkan tebakan. Jejak tadi berimpit dengan grafik cos x',
          'Ganti ke cos x. Jejaknya sekarang grafik sinus yang terbalik, yaitu negatif sin x',
          'Ganti ke eˣ. Jejak di papan bawah berbentuk sama persis dengan kurva di papan atas: eˣ adalah turunannya sendiri',
        ],
      },

      { jenis: 'sesi', judul: 'Turunan tan x' },
      { jenis: 'paragraf', teks: 'Untuk tangen kita tidak perlu mengulang apa pun. tan x adalah sin x dibagi cos x, dan aturan hasil bagi dari Materi 06 sudah cukup.' },
      {
        jenis: 'contoh',
        judul: 'Menurunkan tan x',
        baris: [
          'tulis sebagai bagi   u = sin x, v = cos x',
          'turunannya           u′ = cos x, v′ = -sin x',
          'pembilangnya         cos x · cos x - sin x · (-sin x) = cos²x + sin²x',
          'pakai identitas      cos²x + sin²x = 1',
          'penyebutnya          cos²x',
          'hasilnya             1 : cos²x',
        ],
        simpul: 'Bentuk 1 dibagi cos²x sering ditulis sec²x. Nilainya tidak pernah negatif, dan itu cocok dengan grafik tangen yang selalu menanjak.',
      },

      { jenis: 'sesi', judul: 'Bilangan yang kemiringannya sama dengan tingginya' },
      { jenis: 'paragraf', teks: 'Sekarang fungsi eksponen, yaitu fungsi yang x-nya duduk di pangkat, seperti 2ˣ. Perhatikan bedanya dengan x²: yang berubah bukan yang dipangkatkan, melainkan pangkatnya sendiri.' },
      { jenis: 'paragraf', teks: 'Kalau kemiringan kurva 2ˣ dihitung di beberapa titik lalu dibandingkan dengan tingginya sendiri, muncul hal yang menarik: perbandingannya selalu angka yang sama.' },
      {
        jenis: 'contoh',
        judul: 'Kemiringan dibagi tinggi, untuk beberapa bilangan pokok',
        baris: [
          'kurva 2ˣ    kemiringan selalu 0,693 kali tingginya',
          'kurva 3ˣ    kemiringan selalu 1,099 kali tingginya',
          'kurva 2,7ˣ  kemiringan selalu 0,993 kali tingginya',
        ],
        simpul: 'Pengalinya menyeberangi angka 1 di suatu tempat antara 2,7 dan 3.',
      },
      { jenis: 'paragraf', teks: 'Bilangan pokok yang membuat pengali itu tepat 1 memang ada, dan ia bukan bilangan bulat. Nilainya kira-kira 2,71828, dan diberi nama bilangan e.' },
      { jenis: 'sorot', teks: 'Turunan eˣ adalah eˣ. Di antara semua kurva berbentuk aˣ, hanya kurva inilah yang tingginya sama persis dengan kemiringannya di setiap titik.' },
      { jenis: 'paragraf', teks: 'Itulah sebabnya e muncul di mana-mana pada persoalan pertumbuhan, dan sebabnya kalkulator punya tombolnya sendiri. Untuk bilangan pokok lain seperti 2ˣ, turunannya masih ada, hanya ikut membawa angka pengali seperti pada tabel di atas.' },
    ],
    seringKeliru: {
      judul: 'Tanda minus pada turunan cos x sering hilang',
      isi: 'Karena sin dan cos selalu muncul berpasangan dan saling bertukar, banyak yang menghafalnya sebagai "sin jadi cos, cos jadi sin" lalu berhenti. Godaannya besar sebab setengahnya memang benar. Yang hilang adalah tanda minusnya: turunan cos x adalah negatif sin x. Cara memeriksanya tanpa menghafal: lihat grafik kosinus tepat sesudah x = 0. Grafiknya terlihat MENURUN di sana, jadi turunannya wajib negatif. Padahal sin x justru positif sesudah 0. Berarti yang benar negatif sin x.',
    },
    widget: 'kemiringan-sinus',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 9,
    slug: 'persamaan-garis-singgung',
    judul: 'Persamaan garis singgung',
    labelPendek: 'Garis singgung',
    pertanyaan: 'Sekarang kemiringannya diketahui; bagaimana menulis persamaan garisnya?',
    intisari: [
      'Persamaan garis singgung memakai rumus garis lama: y dikurangi y₁ sama dengan m dikali (x dikurangi x₁).',
      'Yang baru hanya sumber nilai m, yaitu f′(x₁), bukan angka yang diberikan soal.',
      'Tiga langkahnya: cari titik singgungnya, cari turunannya, lalu susun persamaannya.',
      'Di puncak atau di dasar lembah, gradien garis singgungnya nol, dan garisnya mendatar.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Sejak Materi 02 kita selalu berhenti pada satu angka: kemiringannya. Garisnya sendiri sudah muncul di gambar, tetapi belum pernah kita tulis persamaannya. Sekarang saatnya.' },
      { jenis: 'paragraf', teks: 'Kabar baiknya, tidak ada rumus baru yang perlu dihafal. Rumus garis yang melalui satu titik dengan kemiringan tertentu sudah Anda pelajari di SMP.' },
      { jenis: 'sorot', teks: 'y dikurangi y₁ sama dengan m dikali (x dikurangi x₁), dengan m diambil dari f′(x₁).' },
      { jenis: 'paragraf', teks: 'Satu-satunya hal baru adalah dari mana m datang. Dulu m diberikan oleh soal. Sekarang m harus dihitung sendiri, dan alatnya turunan.' },

      { jenis: 'sesi', judul: 'Tiga langkah yang selalu sama' },
      {
        jenis: 'poin',
        judul: 'Urutan mengerjakannya',
        butir: [
          'Cari titik singgungnya - masukkan x₁ ke f untuk mendapat y₁',
          'Cari gradiennya - turunkan f, lalu masukkan x₁ ke f′',
          'Susun persamaannya - pasang x₁, y₁, dan m ke rumus di atas, lalu rapikan',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Garis singgung kurva y = x² + 2x + 1 di x = 0',
        baris: [
          'langkah 1  y₁ = f(0) = 0 + 0 + 1 = 1, jadi titiknya (0, 1)',
          'langkah 2  f′(x) = 2x + 2, maka m = f′(0) = 2',
          'langkah 3  y - 1 = 2(x - 0)',
          'rapikan    y = 2x + 1',
        ],
        simpul: 'Garis y = 2x + 1 menyentuh kurva itu tepat di titik (0, 1).',
      },
      { jenis: 'paragraf', teks: 'Sekarang titik yang berbeda pada kurva yang sama. Perhatikan bahwa langkahnya tidak berubah sedikit pun, hanya angkanya.' },
      {
        jenis: 'contoh',
        judul: 'Kurva yang sama, tetapi di x = -1',
        baris: [
          'langkah 1  y₁ = f(-1) = 1 - 2 + 1 = 0, jadi titiknya (-1, 0)',
          'langkah 2  m = f′(-1) = 2(-1) + 2 = 0',
          'langkah 3  y - 0 = 0 · (x + 1)',
          'rapikan    y = 0',
        ],
        simpul: 'Gradiennya nol, jadi garis singgungnya mendatar. Titik (-1, 0) memang titik terendah kurva itu.',
      },
      { jenis: 'paragraf', teks: 'Hasil kedua itu bukan kebetulan dan bukan kasus aneh. Garis singgung yang mendatar sering menandai tempat kurva berhenti menurun dan mulai menanjak, atau sebaliknya. Tetapi tidak selalu, dan pengecualiannya kita bahas di Materi 10. Sifat itu akan kita pakai serius di dua materi terakhir.' },

      {
        jenis: 'coba',
        teks: 'Alatnya menggambar garis singgung yang ikut bergerak saat titik singgungnya digeser, lengkap dengan persamaannya.',
        langkah: [
          'Atur x₁ = 0 dengan Contoh buku. Panel kanan menulis m, titiknya, lalu persamaannya bertahap',
          'Geser x₁ ke -1. Perhatikan garisnya berubah mendatar dan persamaannya menjadi y = 0',
          'Geser terus ke kiri sampai -3. Garisnya sekarang menurun, dan m bertanda negatif',
          'Ganti kurvanya ke x³ - 3x, lalu cari sendiri kedua tempat garisnya mendatar',
        ],
      },

      { jenis: 'sesi', judul: 'Satu garis lagi yang sering disebut bersamanya' },
      { jenis: 'paragraf', teks: 'Kadang soal meminta garis yang tegak lurus terhadap garis singgung di titik yang sama. Namanya garis normal, dan gradiennya negatif satu dibagi m. Materi ini tidak memperdalamnya, sebab yang penting sudah Anda punya: begitu m diketahui, semua garis lain di titik itu tinggal mengikuti.' },
    ],
    seringKeliru: {
      judul: 'Gradien diambil dari f′(x₁), bukan dari f(x₁)',
      isi: 'Kedua angka itu lahir dari titik yang sama dan ditulis berdekatan, jadi tertukarnya mudah sekali. Pada contoh pertama tadi, f(0) = 1 dan f′(0) = 2. Yang menjadi gradien adalah 2, sedangkan 1 adalah tinggi titiknya. Kalau tertukar, persamaannya menjadi y - 2 = 1(x - 0), dan garis itu bahkan tidak melewati titik singgungnya. Cara memeriksanya: masukkan x₁ ke persamaan yang sudah jadi. Hasilnya wajib sama dengan y₁. Kalau tidak, ada yang tertukar.',
    },
    widget: 'garis-singgung-geser',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 10,
    slug: 'naik-turun-diam',
    judul: 'Naik, turun, dan diam',
    labelPendek: 'Naik, turun',
    pertanyaan: 'Bisakah tanda turunan memberi tahu bentuk grafik tanpa menggambarnya?',
    intisari: [
      'Fungsi naik di tempat f′(x) bernilai positif, dan turun di tempat f′(x) bernilai negatif.',
      'Tempat f′(x) = 0 disebut stasioner, artinya kurvanya sedang diam mendatar.',
      'Caranya: cari akar f′, tandai pada garis bilangan, lalu uji tanda f′ di tiap selang.',
      'Satu tanda saja yang perlu dibaca, bukan seluruh nilainya. Yang penting positif atau negatif.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Menggambar grafik dengan menghitung banyak titik itu lambat, dan hasilnya belum tentu benar di antara titik-titik yang dihitung. Pertanyaannya: bisakah bentuk kasarnya diketahui hanya dari turunannya?' },
      { jenis: 'paragraf', teks: 'Jawabannya bisa, dan alasannya sudah Anda lihat sejak Materi 03. Waktu itu jejak kemiringan berada di atas sumbu ketika kurvanya menanjak, dan di bawah sumbu ketika kurvanya menurun. Sekarang pengamatan itu kita jadikan alat.' },
      {
        jenis: 'poin',
        judul: 'Tanda turunan menceritakan arah kurvanya',
        butir: [
          'f′(x) positif - kurva sedang menanjak. Fungsinya disebut fungsi naik di situ',
          'f′(x) negatif - kurva sedang menurun. Fungsinya disebut fungsi turun di situ',
          'f′(x) = 0 - kurva sedang mendatar. Titiknya disebut stasioner, atau titik diam',
        ],
      },
      { jenis: 'sorot', teks: 'Untuk mengetahui bentuk kurva, yang perlu dibaca hanya TANDA turunannya, bukan nilainya.' },

      { jenis: 'sesi', judul: 'Tabel tanda, langkah demi langkah' },
      { jenis: 'paragraf', teks: 'Karena yang dicari cuma tanda, kerjanya menjadi rapi. Tanda f′ hanya boleh berganti di tempat f′ bernilai nol, atau di tempat f′ tidak ada sama sekali seperti sudut |x| pada Materi 03. Untuk fungsi polinom seperti contoh berikut, f′ ada di mana-mana, jadi cukup akarnya yang dicari.' },
      {
        jenis: 'contoh',
        judul: 'Menyelidiki f(x) = x³ - 3x',
        baris: [
          'turunkan          f′(x) = 3x² - 3',
          'cari akarnya      3x² - 3 = 0, jadi x² = 1, jadi x = -1 dan x = 1',
          'uji di x = -2     f′(-2) = 12 - 3 = 9, bertanda positif, berarti naik',
          'uji di x = 0      f′(0) = -3, bertanda negatif, berarti turun',
          'uji di x = 2      f′(2) = 12 - 3 = 9, bertanda positif, berarti naik',
        ],
        simpul: 'Jadi kurvanya naik sampai x = -1, lalu turun sampai x = 1, lalu naik lagi. Bentuk berlekuk dua yang khas.',
      },
      { jenis: 'paragraf', teks: 'Angka penguji seperti -2, 0, dan 2 boleh dipilih bebas, asal berada di selang yang benar. Nilai f′ di situ tidak perlu rapi, sebab yang dibaca hanya tandanya.' },
      { jenis: 'paragraf', teks: 'Dua titik stasioner tadi, x = -1 dan x = 1, adalah tempat kurvanya berhenti sejenak sebelum berganti arah. Di gambar, di situlah garis singgungnya mendatar seperti yang Anda temukan sendiri di Materi 09.' },

      {
        jenis: 'coba',
        teks: 'Alatnya memasang pita tanda tepat di bawah sumbu, dengan warna berbeda untuk bagian yang naik dan yang turun.',
        langkah: [
          'Pilih x³ - 3x, lalu geser x pelan-pelan dari kiri ke kanan',
          'Baca panel kanan: nilai f′(x), tandanya, dan kata naik, turun, atau diam',
          'Perhatikan pitanya berganti warna tepat di x = -1 dan x = 1, bukan di tempat lain',
          'Ganti ke -x² + 4x. Sekarang hanya ada satu pergantian warna, dan kurvanya cuma punya satu puncak',
        ],
      },

      { jenis: 'sesi', judul: 'Satu peringatan sebelum lanjut' },
      { jenis: 'paragraf', teks: 'Godaan terbesar setelah menguasai tabel tanda adalah menyimpulkan bahwa setiap tempat f′ bernilai nol pasti puncak atau lembah. Itu tidak benar, dan bantahannya sederhana.' },
      {
        jenis: 'contoh',
        judul: 'Kurva f(x) = x³ di sekitar nol',
        baris: [
          'turunkan       f′(x) = 3x²',
          'cari akarnya   3x² = 0, jadi x = 0',
          'uji di x = -1  f′(-1) = 3, bertanda positif',
          'uji di x = 1   f′(1) = 3, bertanda positif',
        ],
        simpul: 'Tandanya positif di kedua sisi. Kurvanya cuma mendatar sesaat lalu menanjak lagi, tanpa pernah berbalik arah.',
      },
      { jenis: 'paragraf', teks: 'Jadi f′ bernilai nol baru memberi tahu bahwa kurvanya sedang diam. Apakah ia benar-benar berbalik arah atau hanya beristirahat sejenak, itu yang akan kita putuskan pada materi berikutnya.' },
    ],
    seringKeliru: {
      judul: 'Turunan nol belum tentu puncak atau lembah',
      isi: 'Hampir semua contoh di soal sekolah memang berupa puncak atau lembah, jadi wajar kalau siswa menyimpulkan f′ = 0 selalu berarti begitu. Kurva x³ di titik x = 0 membantahnya: turunannya nol di sana, tetapi kurvanya tetap menanjak sebelum dan sesudahnya. Cara membedakannya bukan dengan menghafal, melainkan dengan memeriksa tanda f′ di KEDUA sisi titik itu. Kalau tandanya berbeda, kurvanya berbalik. Kalau tandanya sama, ia hanya mendatar sesaat.',
    },
    widget: 'peta-tanda',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 11,
    slug: 'titik-balik',
    judul: 'Titik balik, terbesar dan terkecil',
    labelPendek: 'Ekstrem',
    pertanyaan: 'Kotak tanpa tutup dibuat dari karton persegi 18 cm dengan memotong pojoknya. Berapa potongan pojok yang membuat volumenya terbesar?',
    intisari: [
      'Titik ekstrem dicari dari f′(x) = 0, lalu diputuskan jenisnya dengan memeriksa tanda f′ di kedua sisinya.',
      'Tanda berubah dari negatif ke positif berarti titik balik minimum, dari positif ke negatif berarti maksimum.',
      'Kalau tandanya tidak berubah, titik itu bukan titik balik.',
      'Jawaban soal terbesar dan terkecil harus masuk akal untuk bendanya, dan ujung selangnya juga wajib diperiksa.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Selembar karton berbentuk persegi dengan sisi 18 cm. Keempat pojoknya dipotong berbentuk persegi kecil dengan sisi x, lalu keempat sisinya dilipat ke atas sehingga terbentuk kotak tanpa tutup.' },
      { jenis: 'paragraf', teks: 'Kalau potongannya terlalu kecil, kotaknya lebar tetapi sangat ceper. Kalau potongannya terlalu besar, kotaknya tinggi tetapi alasnya tinggal sedikit. Di antara dua keadaan itu pasti ada potongan yang memberi isi paling banyak. Berapa?' },
      { jenis: 'paragraf', teks: 'Soal kotak dari karton ini contoh klasik yang juga dipakai buku Matematika Tingkat Lanjut Kelas XII, dan angkanya sengaja dipakai apa adanya supaya bisa Anda bandingkan dengan buku.' },

      { jenis: 'sesi', judul: 'Susun dulu rumus isinya' },
      {
        jenis: 'contoh',
        judul: 'Ukuran kotak setelah dipotong dan dilipat',
        baris: [
          'tinggi kotak        x',
          'panjang alasnya     18 - 2x, sebab dipotong di kedua ujung',
          'lebar alasnya       18 - 2x, karena kartonnya persegi',
          'isinya              V(x) = (18 - 2x)² · x',
        ],
        simpul: 'x tidak boleh nol atau kurang, dan tidak boleh 9 atau lebih, sebab alasnya akan habis.',
      },
      { jenis: 'paragraf', teks: 'Sebelum diturunkan, kurungnya dijabarkan supaya bisa dikerjakan suku demi suku dengan cara Materi 05.' },
      {
        jenis: 'contoh',
        judul: 'Mencari titik stasionernya',
        baris: [
          'jabarkan     V(x) = 324x - 72x² + 4x³',
          'turunkan     V′(x) = 324 - 144x + 12x²',
          'samakan nol  12x² - 144x + 324 = 0',
          'bagi 12      x² - 12x + 27 = 0',
          'faktorkan    (x - 3)(x - 9) = 0',
          'akarnya      x = 3 atau x = 9',
        ],
        simpul: 'x = 9 dibuang karena alas kotaknya habis. Tersisa x = 3.',
      },
      { jenis: 'paragraf', teks: 'Pembuangan x = 9 itu bukan main coret. Matematikanya sah, tetapi bendanya tidak ada: dengan potongan 9 cm, panjang alasnya menjadi nol. Soal cerita selalu menuntut pemeriksaan seperti ini.' },

      { jenis: 'sesi', judul: 'Memastikan itu memang yang terbesar' },
      { jenis: 'paragraf', teks: 'Turunan bernilai nol di x = 3, tetapi Materi 10 sudah memperingatkan bahwa itu belum cukup. Kita periksa tanda V′ di kedua sisinya. Cara ini namanya uji turunan pertama.' },
      {
        jenis: 'contoh',
        judul: 'Uji turunan pertama di sekitar x = 3',
        baris: [
          'di x = 2   V′(2) = 324 - 288 + 48 = 84, bertanda positif, isinya masih bertambah',
          'di x = 3   V′(3) = 0, isinya berhenti bertambah',
          'di x = 4   V′(4) = 324 - 576 + 192 = -60, bertanda negatif, isinya mulai berkurang',
        ],
        simpul: 'Tandanya berubah dari positif ke negatif, jadi x = 3 adalah titik balik maksimum.',
      },
      {
        jenis: 'poin',
        judul: 'Cara membaca perubahan tandanya',
        butir: [
          'Negatif lalu positif - kurva turun lalu naik, jadi titik balik minimum',
          'Positif lalu negatif - kurva naik lalu turun, jadi titik balik maksimum',
          'Tandanya sama di kedua sisi - bukan titik balik, kurvanya hanya mendatar sesaat',
        ],
      },
      { jenis: 'paragraf', teks: 'Terakhir, isinya dihitung. Ini langkah yang paling sering terlewat, padahal justru inilah yang ditanyakan.' },
      {
        jenis: 'contoh',
        judul: 'Isi kotak terbesarnya',
        baris: [
          'masukkan x = 3   V(3) = (18 - 6)² · 3 = 144 · 3 = 432',
          'periksa ujungnya V(0) = 0 dan V(9) = 0',
        ],
        simpul: 'Isi terbesarnya 432 cm³, dicapai saat pojoknya dipotong 3 cm.',
      },
      { jenis: 'paragraf', teks: 'Pemeriksaan ujung selang itu bukan basa basi. Untuk sebagian soal, nilai terbesarnya justru berada di ujung dan bukan di titik yang turunannya nol. Di soal ini kedua ujungnya memberi isi nol, jadi x = 3 aman sebagai jawabannya.' },

      {
        jenis: 'coba',
        teks: 'Alatnya memperlihatkan kartonnya di kiri dan grafik isinya di kanan, keduanya bergerak bersamaan.',
        langkah: [
          'Geser potongan pojoknya dari 0,5 cm ke atas. Perhatikan kotaknya berubah dari ceper menjadi tinggi',
          'Baca panel kanan: panjang, lebar, tinggi, isi, dan nilai V′(x)',
          'Cari sendiri x yang membuat garis singgung di grafik isinya mendatar, lalu bandingkan dengan x = 3',
          'Geser sampai 8,5 cm. Kotaknya tinggi tetapi isinya justru hampir nol',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Nilai terbesarnya bukan nilai x, melainkan nilai fungsinya',
      isi: 'Setelah bersusah payah mendapat x = 3, banyak yang berhenti di situ dan menulis 3 sebagai jawaban. Godaannya wajar sebab angka itulah hasil kerja paling berat. Tapi yang ditanyakan isi kotaknya, dan isinya 432 cm³. Angka 3 menjawab pertanyaan DI MANA, bukan BERAPA. Cara memeriksanya: lihat satuannya. Potongan pojok satuannya cm, sedangkan isi kotak satuannya cm³. Kalau jawaban Anda bersatuan cm untuk pertanyaan tentang isi, ada satu langkah yang belum dikerjakan.',
    },
    widget: 'kotak-terbesar',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 12,
    slug: 'turunan-di-sekitar-kita',
    judul: 'Turunan di sekitar kita',
    labelPendek: 'Dunia nyata',
    pertanyaan: 'Di mana kemiringan sebuah kurva benar-benar dipakai?',
    intisari: [
      'Setiap kali muncul kata "per", "laju", atau "seberapa cepat", di baliknya hampir selalu ada turunan.',
      'Menurunkan dua kali memberi turunan kedua: dari posisi ke kecepatan, lalu ke percepatan.',
      'Mencari nilai optimum adalah cara yang sama seperti Materi 11, hanya bendanya berganti.',
      'Di ekonomi, turunan biaya total disebut biaya marginal, yaitu biaya membuat satu barang tambahan.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Topik ini dibuka dengan satu pertanyaan sederhana di Materi 01: seberapa cepat sebuah pabrik bekerja. Sekarang lingkarannya kita tutup, dan Anda akan melihat bahwa pertanyaan itu bentuknya sama di banyak tempat yang kelihatannya tidak berhubungan.' },

      { jenis: 'sesi', judul: 'Bola yang dilempar ke atas' },
      { jenis: 'paragraf', teks: 'Sebuah bola dilempar lurus ke atas. Tingginya setelah t detik, dalam meter, kira-kira h(t) = 50t - 5t². Angka 5 di situ datang dari percepatan gravitasi yang dibulatkan.' },
      {
        jenis: 'contoh',
        judul: 'Diturunkan sekali, lalu diturunkan lagi',
        baris: [
          'tinggi         h(t) = 50t - 5t²',
          'kecepatan      h′(t) = 50 - 10t',
          'percepatan     turunan sekali lagi, hasilnya -10',
          'saat berhenti  50 - 10t = 0, jadi t = 5 detik',
          'tinggi puncak  h(5) = 250 - 125 = 125 meter',
        ],
        simpul: 'Kecepatan bernilai nol tepat di puncak, persis titik stasioner dari Materi 10.',
      },
      { jenis: 'paragraf', teks: 'Menurunkan dua kali punya nama sendiri, yaitu turunan kedua. Di sini artinya langsung terbaca: turunan pertama memberi kecepatan, turunan kedua memberi percepatan. Nilainya tetap -10, dan tanda minus itu berarti tarikan bumi bekerja ke bawah sepanjang waktu, bahkan saat bolanya masih naik.' },

      { jenis: 'sesi', judul: 'Sesuatu yang tumbuh sebanding dengan jumlahnya' },
      { jenis: 'paragraf', teks: 'Bakteri di cawan bertambah lebih cepat kalau bakterinya sudah banyak, sebab yang membelah diri lebih banyak. Jadi lajunya sebanding dengan jumlahnya sendiri. Sebagai angka contoh, ambil jumlah bakteri N(t) = 200 · e^(t/2) dengan t dalam jam.' },
      {
        jenis: 'contoh',
        judul: 'Lajunya selalu setengah dari jumlahnya',
        baris: [
          'jumlahnya   N(t) = 200 · e^(t/2)',
          'bagian dalam  t/2, turunannya 1/2, jadi aturan rantai Materi 07 dipakai',
          'turunkan    N′(t) = 200 · e^(t/2) · 1/2 = 100 · e^(t/2)',
          'bandingkan  N′(t) = N(t) : 2',
          'saat t = 0  N = 200 ekor, lajunya 100 ekor per jam',
          'saat t = 2  N kira-kira 544 ekor, lajunya kira-kira 272 ekor per jam',
        ],
        simpul: 'Inilah alasan bilangan e dari Materi 08 selalu muncul di persoalan pertumbuhan.',
      },
      { jenis: 'paragraf', teks: 'Bentuk yang sama dipakai untuk bunga tabungan, penyebaran penyakit, dan peluruhan zat radioaktif. Yang membedakan hanya angka pengalinya, dan tandanya: pengali negatif berarti menyusut, bukan bertambah.' },

      { jenis: 'sesi', judul: 'Kaleng yang paling hemat bahan' },
      { jenis: 'paragraf', teks: 'Pabrik minuman membuat kaleng berisi 1 liter, yaitu 1000 cm³. Isinya sudah ditetapkan, jadi yang bisa dipilih hanya bentuknya: gemuk pendek, atau ramping tinggi. Bentuk mana yang memakai pelat paling sedikit?' },
      {
        jenis: 'contoh',
        judul: 'Nilai optimum untuk luas pelatnya',
        baris: [
          'isi tetap        π r² t = 1000, jadi t = 1000 : (π r²)',
          'luas pelatnya    L = 2π r² + 2π r t',
          'ganti t          L(r) = 2π r² + 2000 : r',
          'turunkan         L′(r) = 4π r - 2000 : r²',
          'samakan nol      4π r = 2000 : r²',
          'kalikan r²       4π r³ = 2000',
          'bagi 4π          r³ = 500 : π, jadi r kira-kira 5,42 cm',
          'tingginya        t kira-kira 10,84 cm',
        ],
        simpul: 'Tinggi kaleng paling hemat sama dengan diameternya, dua kali jari-jarinya.',
      },
      { jenis: 'paragraf', teks: 'Uji tandanya juga wajib, seperti yang ditegaskan Materi 11: L′(4) kira-kira -74,7 dan L′(7) kira-kira 47,1. Tandanya berubah dari negatif ke positif, jadi ukuran itu memang membuat pelatnya paling sedikit, bukan paling banyak. Langkahnya sama persis dengan soal kotak di Materi 11: susun rumusnya, turunkan, samakan nol. Yang berganti hanya bendanya. Kaleng di rak toko biasanya tidak sependek itu, sebab bentuk juga dipilih agar enak digenggam dan muat di rak, bukan cuma agar hemat pelat.' },

      { jenis: 'sesi', judul: 'Biaya membuat satu barang berikutnya' },
      { jenis: 'paragraf', teks: 'Sebuah usaha punya biaya tetap dan biaya yang bertambah seiring jumlah produksi. Sebagai angka contoh, biaya total untuk membuat x barang adalah B(x) = 2.000.000 + 15.000x + 20x² rupiah.' },
      {
        jenis: 'contoh',
        judul: 'Biaya marginal saat produksi 100 barang',
        baris: [
          'biaya total     B(x) = 2.000.000 + 15.000x + 20x²',
          'turunkan        B′(x) = 15.000 + 40x',
          'di x = 100      B′(100) = 15.000 + 4.000 = 19.000 rupiah',
        ],
        simpul: 'Barang ke-101 kira-kira menambah biaya 19.000 rupiah, bukan 15.000 rupiah.',
      },
      { jenis: 'paragraf', teks: 'Turunan biaya total itu disebut biaya marginal. Angkanya naik seiring produksi, dan itulah yang memberi tahu pemilik usaha kapan menambah produksi mulai tidak menguntungkan lagi.' },

      { jenis: 'sesi', judul: 'Satu gagasan, banyak wajah' },
      {
        jenis: 'poin',
        judul: 'Empat cerita tadi, satu pertanyaan yang sama',
        butir: [
          'Bola dilempar - seberapa cepat tingginya berubah tiap detik',
          'Bakteri - seberapa cepat jumlahnya berubah tiap jam',
          'Kaleng - di titik mana luas pelatnya berhenti berkurang',
          'Biaya usaha - seberapa besar biaya bertambah untuk satu barang berikutnya',
        ],
      },
      { jenis: 'paragraf', teks: 'Keempatnya dijawab dengan kemiringan garis singgung, benda yang kita bangun pelan-pelan sejak Materi 02. Semua angka pada halaman ini angka contoh, dipilih agar hitungannya bisa Anda periksa sendiri.' },
    ],
    widget: 'dunia-nyata-turunan',
    siap: true,
  },
]
