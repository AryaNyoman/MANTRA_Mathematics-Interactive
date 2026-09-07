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
        simpul: 'Awalnya menanjak cepat, lalu makin lama makin melandai. Pekerjanya lelah.',
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
      'Kalau titik kedua digeser mendekati titik pertama, garis potongnya berubah menjadi garis singgung.',
      'Kemiringan garis singgung itu disebut kemiringan sesaat, dan angkanya disebut turunan di titik itu.',
      'Rumusnya limit dari selisih dibagi selisih: f(x₁ + h) dikurangi f(x₁), dibagi h, saat h menuju 0.',
      'Bentuk aslinya tidak boleh langsung diisi h = 0. Sederhanakan dulu, baru h didekatkan ke nol.',
      'Hasilnya satu angka untuk satu titik, bukan sebuah garis dan bukan sebuah rumus.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Di materi sebelumnya, pabrik tadi menghasilkan 22 barang per jam rata-rata antara jam ke-1 dan jam ke-3. Sekarang pertanyaannya dipersempit: seberapa cepat pabrik itu bekerja TEPAT pada jam ke-1?' },
      { jenis: 'paragraf', teks: 'Kalau dijawab dengan cara lama, kita perlu dua titik. Tapi tepat pada jam ke-1 hanya ada satu titik. Selisih waktunya nol, selisih barangnya juga nol, dan nol dibagi nol tidak punya jawaban.' },
      { jenis: 'paragraf', teks: 'Persoalan itu sudah Anda temui di topik Limit, Materi 01, lewat speedometer. Jalan keluarnya sama: jangan menghitung tepat di satu titik, tapi di selang yang terus diperpendek.' },

      { jenis: 'sesi', judul: 'Titik kedua digeser mendekat' },
      { jenis: 'paragraf', teks: 'Sebut titik pertamanya P, dan titik kedua Q. Jarak mendatar antara keduanya kita namai h. Kalau h diperkecil, titik Q merayap mendekati P, dan garis potong PQ ikut berputar sedikit demi sedikit.' },
      { jenis: 'paragraf', teks: 'Untuk menghitungnya kita butuh rumus, bukan sekadar tabel. Kita pakai kurva melengkung yang paling sederhana, yaitu f(x) = x², dan kita amati titik di x = 1.' },
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
      { jenis: 'paragraf', teks: 'Perhatikan bahwa 2 tidak pernah benar-benar tercapai selama h masih ada. Yang terjadi adalah angkanya bisa dibuat sedekat apa pun ke 2. Itu cukup, dan itulah yang disebut limit.' },

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
          'h dicoret            2 + h',
          'baru sekarang h didekatkan ke nol      2 + 0 = 2',
        ],
        simpul: 'Kemiringan sesaat kurva f(x) = x² di titik x = 1 adalah 2.',
      },
      {
        jenis: 'poin',
        judul: 'Urutan langkahnya tidak boleh dibalik',
        butir: [
          'Sebelum disederhanakan - mengisi h = 0 memberi 0 dibagi 0, dan itu tidak punya arti',
          'Mencoret h - hanya sah selama h bukan nol, sebab kita sedang membaginya',
          'Sesudah disederhanakan - bentuk 2 + h aman untuk h berapa pun, termasuk nol',
        ],
      },
      { jenis: 'paragraf', teks: 'Aturan urutan ini persis yang Anda pelajari di topik Limit, Materi 04, pada bentuk 0 per 0. Di sini bentuk itu muncul lagi, dan kali ini ia punya arti gambar.' },

      { jenis: 'sesi', judul: 'Tiga nama untuk satu kejadian' },
      { jenis: 'paragraf', teks: 'Saat h benar-benar menuju nol, titik Q berimpit dengan P dan garis potongnya berhenti berputar. Garis terakhir itu hanya menyentuh kurva di satu titik, dan namanya garis singgung.' },
      {
        jenis: 'poin',
        judul: 'Yang baru saja diberi nama',
        butir: [
          'Garis singgung - garis yang dituju oleh garis potong saat kedua titiknya berimpit',
          'Kemiringan sesaat - kemiringan garis singgung itu, yaitu satu angka',
          'Turunan di sebuah titik - nama resmi untuk kemiringan sesaat tadi, ditulis f′(x₁)',
        ],
      },
      { jenis: 'sorot', teks: 'Turunan di titik x₁ adalah limit dari [ f(x₁ + h) dikurangi f(x₁) ] dibagi h, saat h menuju 0, jika limitnya ada.' },
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

      { jenis: 'paragraf', teks: 'Satu titik lain akan memberi angka lain. Di x = 2, kurva x² jelas lebih curam daripada di x = 1. Berarti tiap titik punya angkanya sendiri, dan kumpulan angka itu akan kita urus pada materi berikutnya.' },
    ],
    seringKeliru: {
      judul: 'Turunan itu angkanya, bukan garisnya',
      isi: 'Karena garis singgung yang paling menonjol di gambar, banyak yang menjawab pertanyaan "berapa turunannya" dengan menggambar sebuah garis. Godaannya wajar: garis itulah yang baru saja lahir di layar. Tapi yang disebut turunan adalah KEMIRINGAN garis itu, yaitu satu angka seperti 2. Garisnya sendiri punya persamaan tersendiri, dan cara menulisnya akan dibahas belakangan. Cara membedakannya: turunan bisa Anda tulis di kalkulator, garis singgung tidak.',
    },
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
      'Turunan di satu titik adalah angka. Turunan di semua titik adalah fungsi baru, ditulis f′.',
      'Untuk f(x) = x², kemiringannya di tiap titik ternyata selalu 2x, jadi f′(x) = 2x.',
      'Dua cara menulis yang sama artinya: f′(x) cara Newton, dan dy/dx cara Leibniz.',
      'dy/dx dibaca sebagai perubahan y per perubahan x, bukan sebagai pembagian biasa.',
      'Bentuk f′ bisa sangat berbeda dari bentuk f, sebab f′ mencatat kemiringan, bukan tinggi.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Di Materi 02 kita baru mendapat satu angka: kemiringan kurva f(x) = x² di titik x = 1 adalah 2. Wajar kalau muncul pertanyaan berikutnya. Bagaimana di titik lain?' },
      { jenis: 'paragraf', teks: 'Caranya tidak berubah sama sekali. Yang berganti hanya titik yang dipilih.' },
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
      { jenis: 'paragraf', teks: 'Perlu jujur di sini: empat titik belum membuktikan apa pun. Ia baru memperlihatkan pola. Bukti aljabarnya kita kerjakan pada materi berikutnya. Untuk sekarang, terimalah bahwa kemiringan kurva x² di titik x mana pun adalah 2x.' },
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
      { jenis: 'paragraf', teks: 'Fungsi turunan sudah dipakai orang selama ratusan tahun, dan dua penemunya menulisnya dengan cara berbeda. Keduanya masih dipakai sampai sekarang, jadi keduanya perlu Anda kenali.' },
      {
        jenis: 'poin',
        judul: 'Dua notasi, satu arti',
        butir: [
          'Cara Newton - f′(x), dibaca "f aksen x". Ringkas, enak dipakai saat berhitung',
          'Cara Leibniz - dy/dx, dibaca "de y de x". Ia mengingatkan asal usulnya, yaitu perubahan y dibagi perubahan x',
        ],
      },
      { jenis: 'paragraf', teks: 'Satu peringatan tentang dy/dx. Bentuknya memang seperti pecahan, tetapi dy dan dx bukan dua bilangan yang bisa dipisah lalu dicoret. Lambang itu satu kesatuan yang berarti laju perubahan y terhadap x.' },

      {
        jenis: 'coba',
        teks: 'Alatnya punya dua papan bertumpuk. Papan atas kurva f, papan bawah tempat kemiringannya dicatat.',
        langkah: [
          'Sapu x dari kiri ke kanan pelan-pelan. Garis singgung di papan atas ikut berputar',
          'Perhatikan papan bawah: tiap kemiringan meninggalkan jejak titik, dan jejaknya membentuk kurva f′',
          'Untuk x², jejaknya membentuk garis lurus. Untuk x³ - 3x, jejaknya melengkung',
          'Pilih fungsi |x|, lalu lewati x = 0. Jejaknya melompat dari -1 ke 1, sebab di sudut tajam itu tidak ada satu garis singgung pun',
        ],
      },

      { jenis: 'sesi', judul: 'Bentuk f′ menceritakan bentuk f' },
      { jenis: 'paragraf', teks: 'Sambil menyapu tadi, ada tiga hal yang mungkin sudah Anda perhatikan sendiri di papan bawah.' },
      {
        jenis: 'poin',
        butir: [
          'Di bagian yang kurvanya menanjak, jejaknya berada di atas sumbu, jadi nilainya positif',
          'Tepat di puncak atau di dasar lembah, jejaknya menyentuh sumbu, jadi nilainya nol',
          'Di bagian yang kurvanya menurun, jejaknya berada di bawah sumbu, jadi nilainya negatif',
        ],
      },
      { jenis: 'paragraf', teks: 'Tiga pengamatan itu akan kita pakai serius nanti untuk membaca bentuk grafik tanpa menggambarnya. Untuk sekarang cukup dilihat saja.' },
    ],
    seringKeliru: {
      judul: 'f′ bukan f yang digambar lebih kecil',
      isi: 'Karena keduanya digambar berdampingan dan sama-sama berasal dari satu kurva, f′ sering dikira versi mengecil atau versi bergeser dari f. Godaannya kuat pada f(x) = x², sebab di sana f′ memang terlihat lebih landai. Coba pada f(x) = x³ dikurangi 3x: bentuk f punya dua belokan, sedangkan f′ hanya sebuah parabola. Keduanya jelas bukan kurva yang sama. Sebabnya sederhana: f mencatat TINGGI, sedangkan f′ mencatat KEMIRINGAN, dan dua hal itu tidak harus mirip.',
    },
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
      { jenis: 'paragraf', teks: 'Di Materi 03 kita menyimpulkan f′(x) = 2x hanya dari empat titik. Itu pola, bukan bukti. Sekarang hitungannya kita kerjakan sekali lagi, tapi dengan x yang dibiarkan berupa huruf, supaya berlaku untuk semua titik sekaligus.' },

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
      isi: 'Kalimat pendek "pangkatnya turun satu" sering diingat separuh, sehingga x² menjadi x dan x³ menjadi x². Godaannya besar karena separuh kalimat itu memang benar. Yang hilang adalah langkah pertamanya: pangkat lama dikalikan ke depan dulu. Jadi x² memberi 2x, bukan x. Cara memeriksanya cepat: pada kurva x² di titik x = 3, kemiringannya jelas lebih curam daripada 3. Alat di atas menunjukkan angka 6, dan 6 itulah 2 kali 3.',
    },
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
          'Pita mendatar - selebar tambahan pada u, sepanjang v yang lama',
          'Pita tegak - setinggi tambahan pada v, selebar u yang lama',
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
        ],
        simpul: 'Hasilnya selalu negatif untuk x berapa pun selain 1, dan itu cocok dengan grafiknya yang memang selalu menurun.',
      },
      { jenis: 'paragraf', teks: 'Syarat tambahan yang sering terlupa: v tidak boleh nol. Pada contoh tadi berarti x tidak boleh 1, sebab di situ fungsinya sendiri tidak punya nilai.' },
    ],
    seringKeliru: {
      judul: 'Pembilang aturan hasil bagi tidak boleh dibalik',
      isi: 'Karena aturan hasil kali boleh ditulis dalam urutan mana saja, banyak yang mengira aturan hasil bagi juga begitu, lalu menulis uv′ dikurangi u′v. Godaannya masuk akal, sebab pada perkalian urutan memang tidak penting. Di sini penting, sebab yang di tengah adalah tanda kurang. Membalik urutannya membalik tanda seluruh jawaban. Pada contoh di atas, jawabannya berubah dari -3 menjadi 3, dan grafik yang jelas menurun akan terbaca menanjak. Cara mengingatnya: yang diturunkan lebih dulu selalu bagian ATAS.',
    },
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
          'Pilih mesin dalam g = 3x dan mesin luar f = u². Geser x pelan-pelan',
          'Perhatikan pita di garis u: panjangnya selalu tiga kali pita di garis x, apa pun mesin luarnya',
          'Ganti mesin luar ke u³. Pita terakhir memanjang, tapi pita tengahnya tetap tiga kali',
          'Baca panel kanan: angka pengali tiap tingkat dan hasil kalinya, yang tidak lain adalah dy/dx',
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
    ],
    seringKeliru: {
      judul: 'Turunan bagian dalam sering tertinggal',
      isi: 'Jawaban yang paling sering muncul untuk (2x - 5)⁵ adalah 5(2x - 5)⁴, lalu berhenti. Godaannya besar sebab bagian itu sudah terlihat lengkap dan mirip aturan pangkat yang sudah dikuasai. Yang hilang adalah pengali 2, yaitu turunan dari 2x - 5. Jawaban benarnya 10(2x - 5)⁴. Cara memeriksanya tanpa menghitung ulang: kalau bagian dalamnya diganti menjadi x saja, pengalinya menjadi 1 dan jawaban pendek tadi baru benar. Selama bagian dalamnya bukan x polos, selalu ada pengali yang harus ikut.',
    },
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
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 08: kemiringan sinus adalah kosinus (memakai kembali Trigonometri Materi 09), bilangan e.' },
      { jenis: 'coba', teks: 'Untuk eˣ, tinggi kurva dan kemiringannya selalu sama persis. Itulah yang membuat e istimewa.' },
    ],
    widget: 'kemiringan-sinus',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 9,
    slug: 'persamaan-garis-singgung',
    judul: 'Persamaan garis singgung',
    labelPendek: 'Garis singgung',
    pertanyaan: 'Sekarang kemiringannya diketahui; bagaimana menulis persamaan garisnya?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 09: y − y₁ = f\'(x₁)(x − x₁), tiga langkah buku.' },
      { jenis: 'coba', teks: 'Geser ke puncak atau lembah, dan garis singgungnya mendatar: m = 0.' },
    ],
    widget: 'garis-singgung-geser',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 10,
    slug: 'naik-turun-diam',
    judul: 'Naik, turun, dan diam',
    labelPendek: 'Naik, turun',
    pertanyaan: 'Bisakah tanda turunan memberi tahu bentuk grafik tanpa menggambarnya?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 10: Definisi 2.6, tabel tanda f\', contoh x³ − 3x.' },
      { jenis: 'coba', teks: 'Cari kedua tempat garis singgungnya mendatar, lalu baca pitanya berganti warna tepat di situ.' },
    ],
    widget: 'peta-tanda',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 11,
    slug: 'titik-balik',
    judul: 'Titik balik, terbesar dan terkecil',
    labelPendek: 'Ekstrem',
    pertanyaan: 'Kotak tanpa tutup dibuat dari karton persegi 18 cm dengan memotong pojoknya. Berapa potongan pojok yang membuat volumenya terbesar?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 11: titik stasioner, uji turunan pertama, soal kotak V(x) = (18 − 2x)²x dengan x = 3 dan V = 432.' },
      { jenis: 'coba', teks: 'Cari x yang membuat garis singgungnya mendatar, lalu bandingkan dengan x = 3 dari hitungan.' },
    ],
    widget: 'kotak-terbesar',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 12,
    slug: 'turunan-di-sekitar-kita',
    judul: 'Turunan di sekitar kita',
    labelPendek: 'Dunia nyata',
    pertanyaan: 'Di mana kemiringan sebuah kurva benar-benar dipakai?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 12: kecepatan dan percepatan, pertumbuhan eksponensial, kotak termurah, biaya marginal. Galeri tidak interaktif.' },
    ],
    widget: 'dunia-nyata-turunan',
    siap: false,
  },
]
