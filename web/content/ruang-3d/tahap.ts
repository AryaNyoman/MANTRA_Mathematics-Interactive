import type { Tahap } from '@/content/tipe'

/**
 * Isi topik Ruang Tiga Dimensi: 10 tahap.
 *
 * SUMBERNYA, DITULIS TERBUKA
 * Geometri ruang tidak ada di buku Kurikulum Merdeka yang dipegang ARYA. Sudah
 * diperiksa isinya satu per satu, bukan ditebak dari judulnya: buku Kelas 10,
 * Kelas 11, Kelas XII Revisi 2025, dan berkas bernama "3 Dimensi.pdf" yang
 * ternyata Buku Siswa Kelas XI tentang bilangan kompleks dan matriks.
 * Materi ini berasal dari Kurikulum 2013 Kelas XII, dan masih keluar di seleksi
 * masuk kuliah.
 *
 * Keputusan ARYA 2 September 2026: jalan terus dengan sumber campuran.
 *  - Ketepatan angka dijamin mesin, `alat/cek_ruang.py`, 32 angka lolos.
 *  - Tingkat kesulitan dikalibrasi ke lima soal Ujian Nasional asli
 *    (UN 2004, EBTANAS 1999, EBTANAS 1992, UAN 2003, UAN 2005).
 *  - Istilah Indonesianya disandarkan pada modul PPPPTK Matematika
 *    (Program BERMUTU, Depdiknas) dan diktat kalkulus ITB.
 *
 * Rancangan lengkapnya: `docs/superpowers/specs/2026-09-01-ruang-3d-alur-belajar.md`
 *
 * SATU GAGASAN MEMAYUNGI TAHAP 3 SAMPAI 7
 * "Setiap soal jarak adalah soal mencari kaki tegak lurus." Buku biasanya
 * menyajikan empat rumus jarak yang terpisah, dan itulah sebabnya siswa
 * menghafal empat hal padahal cuma ada satu. Kalimat itu sengaja diulang.
 */

export const TAHAP: Tahap[] = [
  /* ---------------------------------------------------------------- */
  {
    no: 1,
    slug: 'gambar-boleh-berbohong',
    judul: 'Gambar ruang boleh berbohong',
    pertanyaan:
      'Dua garis ini jelas berpotongan di gambar. Kenapa di benda aslinya tidak?',
    labelPendek: 'Gambar yang menipu',
    widget: 'kubus-putar',
    siap: true,
    penjelasan: [
      { jenis: 'sesi', judul: 'Coba dulu, baru dibahas' },
      {
        jenis: 'paragraf',
        teks:
          'Di sebelah kiri ada kubus ABCD.EFGH. Dua ruas garis diberi warna: BD di alas, dan EG di tutup. Pada tampilan awalnya, keduanya menyilang tepat di tengah gambar.',
      },
      {
        jenis: 'coba',
        teks: 'Tarik kubusnya, lalu perhatikan kedua ruas berwarna itu.',
        langkah: [
          'Tarik ke kiri atau ke kanan untuk memutari kubusnya.',
          'Tarik ke atas atau ke bawah untuk mengubah ketinggian mata.',
          'Perhatikan tulisan di bawah gambar: kapan ia berubah dari tampak berpotongan menjadi tampak terpisah.',
        ],
      },
      {
        jenis: 'sorot',
        teks:
          'Yang berubah cuma sudut pandangnya. Kubusnya sendiri sama sekali tidak berubah.',
      },
      { jenis: 'sesi', judul: 'Kenapa gambarnya bisa menipu' },
      {
        jenis: 'paragraf',
        teks:
          'Kertas itu datar, benda ruang itu tidak. Setiap gambar bangun ruang adalah ruang yang dipipihkan menjadi dua arah saja. Dalam pemipihan itu selalu ada yang hilang, dan yang paling sering hilang adalah keterangan mana yang lebih dekat ke mata.',
      },
      {
        jenis: 'paragraf',
        teks:
          'BD terletak di lantai kubus. EG terletak di atapnya, enam satuan lebih tinggi. Keduanya tidak mungkin bersentuhan. Tetapi kalau dilihat dari atas, lantai dan atap saling bertumpuk di layar, dan kedua ruas itu tampak menyilang di satu titik yang sebenarnya tidak ada.',
      },
      {
        jenis: 'poin',
        judul: 'Tiga hal yang perlu dibaca di setiap gambar ruang',
        butir: [
          'Garis putus-putus - rusuk yang terhalang badan bendanya sendiri, jadi ia ada tetapi tidak terlihat langsung.',
          'Bidang tembus pandang - digambar samar supaya isinya terlihat, bukan berarti bidangnya berlubang.',
          'Panjang di gambar bukan panjang sebenarnya - rusuk yang menjauh dari mata digambar lebih pendek, padahal panjangnya sama.',
        ],
      },
      {
        jenis: 'paragraf',
        teks:
          'Hal ketiga itu punya nama di buku gambar teknik. Rusuk yang sejajar bidang gambar dinamai garis frontal dan panjangnya boleh dipercaya. Rusuk yang menusuk ke belakang dinamai garis ortogonal, dan panjangnya di gambar sengaja dipendekkan supaya kesan ruangnya muncul.',
      },
      { jenis: 'sesi', judul: 'Namanya bersilangan' },
      {
        jenis: 'paragraf',
        teks:
          'Dua garis yang tidak sejajar dan juga tidak punya titik persekutuan disebut bersilangan. Itulah kedudukan BD dan EG. Kata ini penting karena tidak ada padanannya di bidang datar: pada satu bidang, dua garis yang tidak sejajar pasti berpotongan. Bersilangan hanya mungkin terjadi di ruang.',
      },
      {
        jenis: 'contoh',
        judul: 'Memeriksanya tanpa gambar',
        baris: [
          'BD terletak seluruhnya pada bidang alas ABCD.',
          'EG terletak seluruhnya pada bidang tutup EFGH.',
          'Alas dan tutup sejajar, jaraknya 6 satuan.',
          'Dua garis pada dua bidang sejajar yang berbeda tidak mungkin bertemu.',
        ],
        simpul: 'Jadi BD dan EG bersilangan, dan jaraknya 6 satuan.',
      },
      {
        jenis: 'sorot',
        teks:
          'Aturan pertama topik ini: yang menentukan kedudukan adalah bendanya, bukan gambarnya.',
      },
    ],
    seringKeliru: {
      judul: 'Dua garis yang menyilang di gambar dikira berpotongan',
      isi:
        'Perpotongan di gambar cuma berarti kedua garis melewati arah pandang yang sama, bukan berarti keduanya menyentuh. Cara memeriksanya: cari satu bidang yang memuat kedua garis itu sekaligus. Kalau ada, keduanya sebidang, jadi sejajar atau berpotongan. Kalau tidak ada bidang seperti itu, keduanya bersilangan, berapa pun meyakinkannya gambar itu terlihat.',
    },
    intisari: [
      'Gambar bangun ruang adalah ruang yang dipipihkan, jadi ada keterangan yang selalu hilang.',
      'Garis putus-putus berarti terhalang, bukan berarti tidak ada.',
      'Bersilangan: tidak sejajar, tidak berpotongan, dan hanya mungkin terjadi di ruang.',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    no: 2,
    slug: 'kosakata-kedudukan',
    judul: 'Kosakata kedudukan',
    pertanyaan:
      'Ada berapa cara dua garis bisa bertemu, dan berapa cara mereka tidak bertemu?',
    labelPendek: 'Kedudukan',
    widget: 'pemilih-kedudukan',
    siap: true,
    penjelasan: [
      { jenis: 'sesi', judul: 'Tiga kemungkinan untuk dua garis' },
      {
        jenis: 'paragraf',
        teks:
          'Ambil dua garis mana pun di dalam ruang. Hanya ada tiga kemungkinan, dan tidak ada yang keempat.',
      },
      {
        jenis: 'poin',
        judul: 'Dua garis',
        butir: [
          'Berpotongan - punya tepat satu titik persekutuan. Ada satu bidang yang memuat keduanya. Contoh: AC dan BD, bertemu di tengah alas.',
          'Sejajar - arahnya sama, tidak punya titik persekutuan, tetapi tetap ada satu bidang yang memuat keduanya. Contoh: AB dan HG.',
          'Bersilangan - tidak punya titik persekutuan DAN tidak ada satu bidang pun yang memuat keduanya. Contoh: AB dan CG.',
        ],
      },
      {
        jenis: 'sorot',
        teks:
          'Yang membedakan sejajar dari bersilangan bukan "tidak bertemu", sebab keduanya memang tidak bertemu. Yang membedakan: ada tidaknya satu bidang yang memuat keduanya.',
      },
      {
        jenis: 'coba',
        teks:
          'Pilih dua ruas di alat sebelah kiri, lalu baca alasannya di bawah tabel angka.',
        langkah: [
          'Mulai dari AB dan HG. Keduanya sejajar, dan Anda bisa membayangkan satu bidang, yaitu sisi depan yang direntangkan, memuat keduanya.',
          'Ganti yang kedua jadi CG. Sekarang bersilangan. Coba cari bidang yang memuat keduanya, dan Anda tidak akan menemukannya.',
          'Coba juga AC dengan BD, dua diagonal yang sama-sama di alas.',
        ],
      },
      { jenis: 'sesi', judul: 'Garis terhadap bidang' },
      {
        jenis: 'poin',
        judul: 'Tiga kemungkinan lagi',
        butir: [
          'Terletak pada bidang - seluruh garis ada di dalam bidang itu. Contoh: AB pada bidang alas.',
          'Sejajar bidang - tidak menyentuh sama sekali. Contoh: EF terhadap bidang alas.',
          'Menembus bidang - memotong tepat di satu titik. Contoh: diagonal ruang AG menembus alas di titik A.',
        ],
      },
      {
        jenis: 'paragraf',
        teks:
          'Ada satu kalimat yang sering dipakai buku dan berguna dihafal karena isinya masuk akal: kalau sebuah garis punya dua titik persekutuan dengan sebuah bidang, maka seluruh garis itu terletak pada bidang tersebut. Dua titik sudah cukup mengunci sebuah garis, jadi tidak ada bagian yang bisa keluar.',
      },
      { jenis: 'sesi', judul: 'Bidang terhadap bidang' },
      {
        jenis: 'poin',
        judul: 'Hanya dua kemungkinan',
        butir: [
          'Sejajar - tidak punya titik persekutuan sama sekali. Contoh: alas ABCD dan tutup EFGH.',
          'Berpotongan - persekutuannya bukan satu titik, melainkan satu garis penuh, yang disebut garis potong. Contoh: bidang BDG memotong alas pada garis BD.',
        ],
      },
      {
        jenis: 'sorot',
        teks:
          'Dua bidang tidak pernah berpotongan di satu titik saja. Kalau sudah punya satu titik bersama, seluruh garis potongnya ikut serta.',
      },
      {
        jenis: 'contoh',
        judul: 'Latihan membaca satu kubus',
        baris: [
          'AB dan CG: tidak sejajar, tidak bertemu, tidak sebidang, jadi bersilangan.',
          'AB dan HG: arah sama, tidak bertemu, sebidang, jadi sejajar.',
          'AC dan BD: bertemu di tengah alas, jadi berpotongan.',
          'AG terhadap alas ABCD: hanya menyentuh di titik A, jadi menembus.',
        ],
        simpul:
          'Keempatnya diperiksa mesin dengan koordinat, bukan dikira-kira dari gambar.',
      },
    ],
    seringKeliru: {
      judul: 'Bersilangan dikira sama dengan sejajar',
      isi:
        'Keduanya memang sama-sama tidak pernah bertemu, jadi wajar tertukar. Bedanya di arah: garis sejajar punya arah yang sama persis, sehingga jaraknya tetap sama di sepanjang garis. Garis bersilangan arahnya berbeda, dan keduanya berada pada dua bidang sejajar yang berlainan. Uji cepatnya: kalau kedua garis bisa dimuat oleh satu bidang, ia sejajar atau berpotongan. Kalau tidak bisa, ia bersilangan.',
    },
    intisari: [
      'Dua garis: berpotongan, sejajar, atau bersilangan. Tidak ada kemungkinan lain.',
      'Garis dan bidang: terletak pada, sejajar, atau menembus.',
      'Dua bidang: sejajar, atau berpotongan pada satu garis penuh.',
      'Kunci pembedanya selalu sama: adakah satu bidang yang memuat keduanya.',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    no: 3,
    slug: 'jarak-terpendek',
    judul: 'Jarak selalu yang terpendek',
    pertanyaan: 'Kenapa jarak harus tegak lurus? Kenapa bukan yang miring sedikit?',
    labelPendek: 'Kaki tegak lurus',
    widget: 'kaki-tegak-lurus',
    siap: true,
    penjelasan: [
      { jenis: 'sesi', judul: 'Masalahnya dulu' },
      {
        jenis: 'paragraf',
        teks:
          'Dari titik B ke garis AC bisa ditarik ruas garis sebanyak yang Anda mau, dan semuanya sah disebut "menghubungkan B ke AC". Panjangnya berbeda-beda. Jadi kalimat "jarak dari B ke AC" belum punya arti sampai kita memilih yang mana.',
      },
      {
        jenis: 'sorot',
        teks: 'Yang dipilih matematika selalu sama: yang paling pendek.',
      },
      {
        jenis: 'coba',
        teks:
          'Geser titik Q sepanjang AC, dan perhatikan dua hal sekaligus.',
        langkah: [
          'Angka BQ di bawah gambar naik turun mengikuti geseran.',
          'Grafik kecil di kolom ini melacak angka itu. Bentuknya seperti lembah.',
          'Cari dasar lembahnya. Persis di situ, tanda siku-siku menyala di titik Q.',
        ],
      },
      { jenis: 'sesi', judul: 'Kenapa titik terendahnya pasti yang siku-siku' },
      {
        jenis: 'paragraf',
        teks:
          'Ambil kaki tegak lurus itu, sebut Q. Sekarang ambil titik lain di garis yang sama, sebut R. Segitiga BQR siku-siku di Q, dengan BR sebagai sisi miringnya.',
      },
      {
        jenis: 'contoh',
        judul: 'Pythagoras yang menutup perkara',
        baris: [
          'BR² = BQ² + QR²',
          'QR itu panjang, jadi QR² selalu positif.',
          'Maka BR² selalu lebih besar daripada BQ².',
        ],
        simpul:
          'Jadi ruas mana pun selain yang tegak lurus PASTI lebih panjang. Bukan biasanya, tetapi pasti.',
      },
      {
        jenis: 'paragraf',
        teks:
          'Karena itu "jarak" dan "tegak lurus" bukan dua aturan yang harus dihafal terpisah. Tegak lurus adalah akibat dari memilih yang terpendek. Sisi miring selalu lebih panjang daripada sisi tegak, dan itu saja seluruh alasannya.',
      },
      { jenis: 'sesi', judul: 'Satu kalimat untuk lima tahap ke depan' },
      {
        jenis: 'sorot',
        teks: 'Setiap soal jarak adalah soal mencari kaki tegak lurus.',
      },
      {
        jenis: 'poin',
        judul: 'Bentuknya berganti-ganti, tetapi isinya itu-itu saja',
        butir: [
          'Jarak titik ke garis - kakinya sebuah titik pada garis itu.',
          'Jarak titik ke bidang - kakinya sebuah titik pada bidang itu.',
          'Jarak garis ke bidang sejajar - ambil satu titik saja, lalu kembali ke kasus sebelumnya.',
          'Jarak dua bidang sejajar - sama, ambil satu titik saja.',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Angka pada kubus rusuk 6',
        baris: [
          'Kaki tegak lurus dari B ke AC jatuh tepat di tengah AC.',
          'Setengah diagonal alas: 3 akar 2.',
          'BQ = 3 akar 2, kira-kira 4,243.',
        ],
        simpul:
          'Kaki jatuh di tengah karena segitiga ABC sama kaki, AB dan BC sama panjang.',
      },
    ],
    seringKeliru: {
      judul: 'Jarak diukur ke titik yang paling gampang dilihat',
      isi:
        'Godaannya besar: menghubungkan B ke ujung A atau ujung C, karena keduanya titik bernama yang jelas kelihatan di gambar. Padahal kaki tegak lurus sering jatuh di tengah-tengah, di titik yang tidak punya nama. Sebelum menghitung, tentukan dulu di mana kakinya jatuh. Kalau kakinya di luar ruas garisnya, barulah ujung terdekat yang dipakai.',
    },
    intisari: [
      'Jarak adalah yang terpendek, dan yang terpendek selalu yang tegak lurus.',
      'Alasannya Pythagoras: sisi miring selalu lebih panjang daripada sisi tegaknya.',
      'Semua soal jarak di bangun ruang berujung pada mencari kaki tegak lurus.',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    no: 4,
    slug: 'dua-kali-pythagoras',
    judul: 'Dua kali Pythagoras',
    pertanyaan:
      'Kenapa diagonal ruang kubus rusuk 1 panjangnya akar 3, bukan akar 2 ditambah 1?',
    labelPendek: 'Diagonal',
    widget: 'diagonal-kubus',
    siap: true,
    penjelasan: [
      { jenis: 'sesi', judul: 'Langkah pertama: diagonal sisi' },
      {
        jenis: 'paragraf',
        teks:
          'Diagonal sisi adalah ruas yang menghubungkan dua titik sudut pada satu sisi kubus yang sama. Contohnya AC pada alas. Karena semuanya masih di satu bidang datar, Pythagoras dipakai seperti biasa.',
      },
      {
        jenis: 'contoh',
        judul: 'Segitiga ABC, siku-siku di B',
        baris: [
          'AB = 6, BC = 6',
          'AC² = 6² + 6² = 36 + 36 = 72',
          'AC = akar 72 = 6 akar 2',
        ],
        simpul: 'AC kira-kira 8,485 satuan.',
      },
      { jenis: 'sesi', judul: 'Langkah kedua: diagonal ruang' },
      {
        jenis: 'paragraf',
        teks:
          'Diagonal ruang menghubungkan dua titik sudut yang tidak berada pada satu sisi, misalnya A dengan G. Ia menembus bagian dalam kubus. Di sinilah orang sering tersesat, karena segitiga penolongnya tidak tergambar di kertas dan harus dibayangkan berdiri di dalam kubus.',
      },
      {
        jenis: 'coba',
        teks: 'Tekan tombol Langkah 2 di bawah gambar, lalu putar kubusnya.',
        langkah: [
          'Segitiga ACG berdiri tegak di dalam kubus, tidak menempel pada sisi mana pun.',
          'Alasnya AC, hasil hitungan langkah pertama tadi.',
          'Sisi tegaknya CG, yaitu satu rusuk biasa.',
          'Siku-sikunya di C, karena rusuk tegak selalu tegak lurus alas.',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Segitiga ACG, siku-siku di C',
        baris: [
          'AC² = 72 (dari langkah pertama, jangan diakarkan dulu)',
          'CG = 6, jadi CG² = 36',
          'AG² = 72 + 36 = 108',
          'AG = akar 108 = 6 akar 3',
        ],
        simpul: 'AG kira-kira 10,392 satuan.',
      },
      {
        jenis: 'sorot',
        teks:
          'Diagonal ruang bukan rumus baru. Ia Pythagoras yang dipakai untuk kedua kalinya, dengan hasil yang pertama sebagai salah satu sisinya.',
      },
      { jenis: 'sesi', judul: 'Kenapa jawabannya akar 3' },
      {
        jenis: 'paragraf',
        teks:
          'Kalau rusuknya a, langkah pertama memberi a akar 2, lalu langkah kedua menjumlahkan 2a² dengan a², hasilnya 3a². Jadi diagonal ruangnya a akar 3. Angka 3 di dalam akar itu bukan kebetulan: ia menghitung ada berapa arah yang dilewati, yaitu panjang, lebar, dan tinggi.',
      },
      {
        jenis: 'poin',
        judul: 'Tiga panjang penting pada kubus rusuk a',
        butir: [
          'Rusuk - a',
          'Diagonal sisi - a akar 2, melewati dua arah',
          'Diagonal ruang - a akar 3, melewati tiga arah',
        ],
      },
      {
        jenis: 'paragraf',
        teks:
          'Pada balok caranya sama persis, hanya angkanya tidak sama. Untuk balok berukuran p, l, dan t, diagonal ruangnya akar dari p² ditambah l² ditambah t². Kubus cuma kejadian khusus saat ketiganya sama.',
      },
    ],
    seringKeliru: {
      judul: 'Akar 2 ditambah 1',
      isi:
        'Kekeliruan ini muncul karena akarnya diakarkan terlalu cepat. Setelah mendapat AC = 6 akar 2, angka itu langsung dijumlahkan dengan rusuk 6 seolah keduanya searah. Padahal AC dan CG saling tegak lurus, jadi yang dijumlahkan adalah KUADRATNYA, bukan panjangnya. Kebiasaan yang menyelamatkan: simpan hasil langkah pertama dalam bentuk kuadrat, yaitu 72, dan baru akarkan di akhir.',
    },
    intisari: [
      'Diagonal sisi kubus rusuk a: a akar 2.',
      'Diagonal ruang kubus rusuk a: a akar 3.',
      'Caranya Pythagoras dua kali, dan hasil pertama dipakai sebagai sisi pada yang kedua.',
      'Simpan dalam bentuk kuadrat sampai langkah terakhir.',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    no: 5,
    slug: 'jarak-titik-ke-garis',
    judul: 'Jarak titik ke garis',
    pertanyaan: 'Titiknya di pojok, garisnya diagonal ruang. Di mana kakinya jatuh?',
    labelPendek: 'Titik ke garis',
    widget: 'jarak-ke-garis',
    siap: true,
    penjelasan: [
      { jenis: 'sesi', judul: 'Soalnya' },
      {
        jenis: 'paragraf',
        teks:
          'Kubus ABCD.EFGH dengan rusuk 6. Berapa jarak titik B ke garis AG? Garis AG adalah diagonal ruang, jadi kakinya tidak jatuh di titik sudut mana pun. Ia jatuh di suatu tempat di dalam kubus yang tidak punya nama.',
      },
      {
        jenis: 'coba',
        teks: 'Putar kubusnya dan perhatikan letak titik K, si kaki tegak lurus.',
        langkah: [
          'K tidak berada di rusuk mana pun, ia melayang di dalam kubus.',
          'Ganti titiknya ke D, lalu ke E, dan bandingkan angkanya.',
          'Ketiganya memberi angka yang sama persis. Itu bukan kebetulan.',
        ],
      },
      { jenis: 'sesi', judul: 'Cara pertama: lewat segitiga' },
      {
        jenis: 'paragraf',
        teks:
          'Perhatikan segitiga ABG. Rusuk AB tegak lurus bidang BCGF, dan BG terletak di bidang itu, jadi segitiga ABG siku-siku di B. Ketiga sisinya sudah bisa dihitung dari tahap sebelumnya.',
      },
      {
        jenis: 'contoh',
        judul: 'Segitiga ABG pada kubus rusuk 6',
        baris: [
          'AB = 6 (satu rusuk)',
          'BG = 6 akar 2 (diagonal sisi kanan)',
          'AG = 6 akar 3 (diagonal ruang)',
          'Periksa: 6² + (6 akar 2)² = 36 + 72 = 108 = (6 akar 3)². Benar siku-siku di B.',
        ],
      },
      { jenis: 'sesi', judul: 'Cara kedua: jalan pintas luas' },
      {
        jenis: 'paragraf',
        teks:
          'Luas segitiga bisa dihitung dari dua pasangan alas dan tinggi yang berbeda, dan hasilnya wajib sama. Pasangan itulah yang dipakai untuk memancing jaraknya keluar.',
      },
      {
        jenis: 'contoh',
        judul: 'Memancing BK keluar',
        baris: [
          'Pakai AB sebagai alas: luas = setengah kali 6 kali 6 akar 2 = 18 akar 2',
          'Pakai AG sebagai alas, tingginya BK: luas = setengah kali 6 akar 3 kali BK',
          'Samakan: setengah kali 6 akar 3 kali BK = 18 akar 2',
          'BK = 36 akar 2 dibagi 6 akar 3 = 6 akar 2 dibagi akar 3',
          'Rasionalkan: BK = 6 akar 6 dibagi 3 = 2 akar 6',
        ],
        simpul: 'BK = 2 akar 6, kira-kira 4,899 satuan.',
      },
      {
        jenis: 'sorot',
        teks:
          'Jarak titik ke garis = 2 kali luas segitiga dibagi panjang alasnya. Rumus itu bukan hafalan baru, ia cuma luas segitiga yang dibalik.',
      },
      { jenis: 'sesi', judul: 'Kenapa B, D, dan E memberi angka yang sama' },
      {
        jenis: 'paragraf',
        teks:
          'B, D, dan E adalah tiga tetangga titik A. Diagonal ruang AG adalah sumbu simetri kubus: kalau kubus diputar sepertiga putaran mengelilingi AG, ketiga titik itu bertukar tempat dan kubusnya kembali seperti semula. Karena itu jaraknya ke AG wajib sama, dan mengeceknya tidak perlu dihitung tiga kali.',
      },
      {
        jenis: 'contoh',
        judul: 'Soal Ujian Nasional yang setipe',
        baris: [
          'UAN 2003: kubus rusuk 4, P titik tengah EH. Jarak P ke garis CF?',
          'Jawabannya 3 akar 2, kira-kira 4,243.',
          'Bentuknya sama: cari kaki tegak lurusnya, lalu pakai segitiga atau jalan pintas luas.',
        ],
        simpul: 'Sumber: soal UAN 2003.',
      },
    ],
    seringKeliru: {
      judul: 'Jarak diukur ke ujung garisnya',
      isi:
        'Karena A dan G adalah titik sudut yang jelas terlihat, banyak yang menghitung BA atau BG lalu menyebutnya jarak. BA = 6 dan BG = 8,485, keduanya lebih besar daripada 4,899. Keduanya memang menghubungkan B ke garis AG, tetapi bukan yang terpendek. Yang terpendek jatuh di titik tanpa nama di tengah, dan justru itulah yang dicari.',
    },
    intisari: [
      'Jarak titik ke garis pada kubus rusuk 6, dari B ke AG: 2 akar 6.',
      'Dua jalan: segitiga siku-siku, atau jalan pintas 2 kali luas dibagi alas.',
      'Kaki tegak lurus sering jatuh di titik yang tidak bernama.',
      'Diagonal ruang adalah sumbu simetri, jadi ketiga tetangga A berjarak sama ke sana.',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    no: 6,
    slug: 'jarak-titik-ke-bidang',
    judul: 'Jarak titik ke bidang',
    pertanyaan: 'Bidangnya miring dan tidak menyentuh titik itu sama sekali.',
    labelPendek: 'Titik ke bidang',
    widget: 'jarak-ke-bidang',
    siap: true,
    penjelasan: [
      { jenis: 'sesi', judul: 'Soalnya' },
      {
        jenis: 'paragraf',
        teks:
          'Kubus ABCD.EFGH rusuk 6. Berapa jarak titik A ke bidang BDE? Bidang BDE dibentuk oleh tiga diagonal sisi yang bertemu di sekitar titik A, dan ia memotong pojok kubus seperti pisau memotong ujung tahu.',
      },
      {
        jenis: 'paragraf',
        teks:
          'Aturannya sama seperti tahap sebelumnya, tinggal diganti sasarannya: tarik ruas dari A yang tegak lurus bidang itu, lalu ukur sampai menusuk. Yang berubah cuma bentuk sasarannya, dari garis menjadi bidang.',
      },
      {
        jenis: 'coba',
        teks: 'Putar kubusnya sampai ruas ungu itu terlihat benar-benar menembus.',
        langkah: [
          'Ruas AK ungu adalah jaraknya, dan ia berhenti tepat di permukaan bidang.',
          'Garis putus-putus samar adalah diagonal ruang AG. Titik K duduk persis di atasnya.',
          'Ganti ke soal kedua, C ke bidang BDG, dan bandingkan angkanya.',
        ],
      },
      { jenis: 'sesi', judul: 'Cara pertama: memakai simetri' },
      {
        jenis: 'paragraf',
        teks:
          'AB, AD, dan AE sama panjang, dan ketiganya saling tegak lurus. Karena itu titik A duduk simetris terhadap segitiga BDE, dan kaki tegak lurusnya jatuh tepat di titik berat segitiga itu. Titik berat itu kebetulan terletak pada diagonal ruang AG, di sepertiga panjangnya.',
      },
      {
        jenis: 'contoh',
        judul: 'Sepertiga diagonal ruang',
        baris: [
          'AG = 6 akar 3',
          'AK = sepertiga dari AG = 2 akar 3',
        ],
        simpul: 'AK = 2 akar 3, kira-kira 3,464 satuan.',
      },
      { jenis: 'sesi', judul: 'Cara kedua: jalan pintas volume' },
      {
        jenis: 'paragraf',
        teks:
          'Cara simetri hanya jalan kalau bangunnya kebetulan simetris. Cara volume selalu jalan, jadi inilah yang perlu dikuasai. Gagasannya sama dengan jalan pintas luas di tahap sebelumnya: hitung satu benda dengan dua cara, lalu samakan.',
      },
      {
        jenis: 'contoh',
        judul: 'Limas A.BDE dihitung dua kali',
        baris: [
          'Cara 1, alasnya segitiga ABD yang datar di lantai:',
          'luas ABD = setengah kali 6 kali 6 = 18, tingginya AE = 6',
          'volume = sepertiga kali 18 kali 6 = 36',
          'Cara 2, alasnya segitiga BDE yang miring:',
          'BDE segitiga sama sisi bersisi 6 akar 2, luasnya 18 akar 3',
          'volume = sepertiga kali 18 akar 3 kali AK',
          'Samakan: sepertiga kali 18 akar 3 kali AK = 36',
          'AK = 36 dibagi 6 akar 3 = 2 akar 3',
        ],
        simpul: 'Hasilnya sama, 2 akar 3. Dua cara berbeda, satu jawaban.',
      },
      {
        jenis: 'sorot',
        teks:
          'Jarak titik ke bidang = 3 kali volume dibagi luas alasnya. Sama seperti sebelumnya, ini rumus volume yang dibalik, bukan hafalan baru.',
      },
      { jenis: 'sesi', judul: 'Dua soal, satu jawaban' },
      {
        jenis: 'paragraf',
        teks:
          'Soal kedua di alat sebelah kiri, jarak C ke bidang BDG, adalah soal EBTANAS 1992. Jawabannya juga 2 akar 3. Titik dan bidangnya berbeda, tetapi susunannya kembar: sebuah titik sudut dan bidang yang memotong ketiga tetangganya. Mengenali kembaran seperti ini menghemat banyak waktu di ujian.',
      },
      {
        jenis: 'contoh',
        judul: 'Sumber soal',
        baris: [
          'EBTANAS 1992: Panjang rusuk kubus ABCD.EFGH adalah 6 cm. Jarak titik C ke bidang BDG?',
          'Jawaban: 2 akar 3 cm.',
        ],
        simpul: 'Sumber: soal EBTANAS 1992.',
      },
    ],
    seringKeliru: {
      judul: 'Jarak ditarik ke titik sudut bidangnya',
      isi:
        'Karena B, D, dan E adalah titik yang bernama dan terlihat, godaannya adalah menghitung AB, AD, atau AE lalu menyebutnya jarak ke bidang BDE. Ketiganya bernilai 6, sedangkan jarak yang benar 3,464. Ruas AB memang menyentuh bidang BDE, tetapi ia miring terhadap bidang itu, jadi bukan yang terpendek. Yang tegak lurus menusuk di titik K yang tidak bernama.',
    },
    intisari: [
      'Jarak titik ke bidang: tarik ruas tegak lurus bidang itu, ukur sampai menusuk.',
      'Pada kubus rusuk 6, jarak A ke bidang BDE adalah 2 akar 3.',
      'Jalan pintas volume: jarak = 3 kali volume dibagi luas alas.',
      'Cara simetri cepat tetapi tidak selalu ada. Cara volume selalu ada.',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    no: 7,
    slug: 'jarak-sejajar',
    judul: 'Kalau yang diukur garis atau bidang, bukan titik',
    pertanyaan: 'Kenapa cukup mengambil satu titik saja?',
    labelPendek: 'Yang sejajar',
    widget: 'jarak-sejajar',
    siap: true,
    penjelasan: [
      { jenis: 'sesi', judul: 'Tahap ini sengaja pendek' },
      {
        jenis: 'paragraf',
        teks:
          'Buku biasanya memberi dua rumus lagi di sini: jarak garis ke bidang sejajar, dan jarak dua bidang sejajar. Sebenarnya tidak ada yang baru. Keduanya runtuh menjadi soal tahap 6 begitu satu titik sembarang dipilih.',
      },
      {
        jenis: 'coba',
        teks: 'Geser titik P sepanjang rusuk AE, dan awasi angkanya.',
        langkah: [
          'Geser sampai ujung bawah, lalu sampai ujung atas.',
          'Angka jaraknya tidak bergerak sedikit pun. Tetap 6.',
          'Ruas ungu PK ikut berpindah, tetapi panjangnya tidak berubah.',
        ],
      },
      { jenis: 'sesi', judul: 'Kenapa titiknya boleh mana saja' },
      {
        jenis: 'paragraf',
        teks:
          'Garis AE sejajar bidang BCGF. Sejajar berarti tidak pernah bertemu, berapa pun jauhnya diperpanjang. Kalau di suatu tempat jaraknya menyempit, cepat atau lambat keduanya akan bertemu, dan itu bertentangan dengan sejajar. Jadi jaraknya wajib tetap.',
      },
      {
        jenis: 'sorot',
        teks:
          'Karena jaraknya tetap di sepanjang garis, mengambil satu titik saja sudah mewakili seluruhnya.',
      },
      {
        jenis: 'poin',
        judul: 'Resepnya, dan pilih titik yang paling memudahkan',
        butir: [
          'Jarak garis ke bidang sejajar - ambil satu titik pada garisnya, hitung jaraknya ke bidang.',
          'Jarak dua bidang sejajar - ambil satu titik pada bidang pertama, hitung jaraknya ke bidang kedua.',
          'Titiknya boleh mana saja, jadi pilih yang paling mudah dihitung. Biasanya titik sudut.',
        ],
      },
      {
        jenis: 'contoh',
        judul: 'Angkanya pada kubus rusuk 6',
        baris: [
          'Garis AE sejajar bidang BCGF (sisi kanan kubus).',
          'Ambil titik A. Jarak A ke bidang itu adalah panjang AB, yaitu 6.',
          'Bidang alas ABCD sejajar bidang tutup EFGH.',
          'Ambil titik A. Jarak A ke tutup adalah panjang AE, yaitu 6.',
        ],
        simpul: 'Dua-duanya 6, dan tidak perlu rumus baru sama sekali.',
      },
      { jenis: 'sesi', judul: 'Satu syarat yang tidak boleh dilewati' },
      {
        jenis: 'paragraf',
        teks:
          'Semua ini hanya berlaku kalau memang sejajar. Kalau garisnya menembus bidang, jaraknya nol, sebab keduanya bersentuhan. Kalau garisnya terletak pada bidang, jaraknya juga nol. Jadi periksa kedudukannya dulu, seperti di tahap 2, baru hitung.',
      },
    ],
    seringKeliru: {
      judul: 'Titik yang dipilih dianggap mengubah jawaban',
      isi:
        'Banyak yang ragu dan mencoba beberapa titik lalu bingung karena hasilnya sama, mengira ada yang salah. Justru itu tandanya benar. Yang perlu dipastikan bukan titiknya, melainkan sejajarnya. Kalau ternyata tidak sejajar, hasilnya memang akan berbeda-beda, dan itu pertanda soalnya bukan soal jarak sejajar.',
    },
    intisari: [
      'Jarak garis ke bidang sejajar dan jarak dua bidang sejajar bukan rumus baru.',
      'Ambil satu titik sembarang, lalu kembali ke jarak titik ke bidang.',
      'Boleh sembarang karena jaraknya tetap. Kalau menyempit, keduanya tidak sejajar.',
      'Periksa dulu kedudukannya sebelum memakai cara ini.',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    no: 8,
    slug: 'sudut-garis-bersilangan',
    judul: 'Sudut dua garis yang tidak pernah bertemu',
    pertanyaan:
      'Bagaimana mengukur sudut antara dua garis yang tidak punya titik potong?',
    labelPendek: 'Sudut bersilangan',
    widget: 'sudut-bersilangan',
    siap: true,
    penjelasan: [
      { jenis: 'sesi', judul: 'Masalahnya' },
      {
        jenis: 'paragraf',
        teks:
          'Sudut selalu punya titik sudut. Itu sebabnya sudut antara dua garis yang berpotongan gampang: titik sudutnya ya titik potongnya. Tetapi garis AC dan garis BG bersilangan, jadi tidak punya titik potong sama sekali. Lalu sudutnya diukur di mana?',
      },
      {
        jenis: 'sorot',
        teks:
          'Jalan keluarnya: geser salah satu garis sejajar dirinya sendiri sampai keduanya bertemu, lalu ukur sudut di sana.',
      },
      { jenis: 'sesi', judul: 'Kenapa menggeser itu sah' },
      {
        jenis: 'paragraf',
        teks:
          'Menggeser garis tanpa memutarnya tidak mengubah arahnya. Sudut hanya bergantung pada arah kedua garis, bukan pada di mana keduanya kebetulan berada. Jadi hasil pengukurannya tetap sah, di mana pun pertemuannya diatur.',
      },
      {
        jenis: 'paragraf',
        teks:
          'Karena itu boleh juga sebaliknya: geser AC ke BG, atau geser keduanya ke titik ketiga yang lebih enak dilihat. Jawabannya sama. Yang biasanya dipilih adalah geseran yang mendarat di rusuk atau diagonal yang sudah ada, supaya tidak perlu menggambar garis baru.',
      },
      {
        jenis: 'coba',
        teks: 'Geser BG dengan penggeser di bawah gambar, sampai penuh.',
        langkah: [
          'Garis merah berjalan pelan-pelan tanpa berputar sedikit pun.',
          'Posisi asalnya tetap terlihat samar sebagai pembanding.',
          'Pada geseran penuh, BG mendarat tepat menjadi AH, diagonal sisi yang memang sudah ada.',
        ],
      },
      { jenis: 'sesi', judul: 'Jawabannya bisa ditebak tanpa kalkulator' },
      {
        jenis: 'paragraf',
        teks:
          'Setelah geseran, yang dicari menjadi sudut antara AC dan AH, dan keduanya bertemu di titik A. Sekarang perhatikan segitiga ACH.',
      },
      {
        jenis: 'contoh',
        judul: 'Segitiga ACH pada kubus rusuk 6',
        baris: [
          'AC diagonal sisi alas: 6 akar 2',
          'AH diagonal sisi kiri: 6 akar 2',
          'CH diagonal sisi belakang: 6 akar 2',
          'Ketiga sisinya sama panjang, jadi segitiga sama sisi.',
        ],
        simpul: 'Semua sudut segitiga sama sisi adalah 60 derajat.',
      },
      {
        jenis: 'sorot',
        teks:
          'Jadi sudut antara AC dan BG adalah 60 derajat, dan itu didapat tanpa satu pun perhitungan trigonometri.',
      },
      { jenis: 'sesi', judul: 'Kalau angkanya tidak sebulat itu' },
      {
        jenis: 'paragraf',
        teks:
          'Tidak semua soal sebaik ini. Kalau segitiga yang terbentuk bukan segitiga istimewa, pakai aturan kosinus pada segitiga hasil geseran itu. Langkah pertamanya tetap sama: geser dulu sampai bertemu, baru hitung.',
      },
      {
        jenis: 'poin',
        judul: 'Urutan kerjanya',
        butir: [
          'Periksa dulu kedudukannya. Kalau berpotongan, langsung ukur, tidak perlu digeser.',
          'Kalau bersilangan, geser salah satunya sejajar dirinya sendiri sampai bertemu.',
          'Pilih geseran yang mendarat pada rusuk atau diagonal yang sudah ada.',
          'Hitung sudutnya pada segitiga yang terbentuk.',
          'Sudut antara dua garis selalu diambil yang tidak tumpul, jadi jawabannya antara 0 dan 90 derajat.',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Garis diputar, bukan digeser',
      isi:
        'Saat memindahkan garis supaya bertemu, yang sering terjadi adalah garisnya ikut dimiringkan sedikit agar "pas" ke titik yang diinginkan. Begitu arahnya berubah, sudutnya ikut berubah, dan jawabannya salah. Yang boleh dilakukan hanya menggeser sejajar: setiap titik pada garis bergerak ke arah yang sama sejauh yang sama. Uji cepatnya, garis hasil geseran wajib sejajar dengan garis asalnya. Pada contoh ini, AH memang sejajar BG.',
    },
    intisari: [
      'Sudut dua garis bersilangan diukur setelah salah satunya digeser sejajar sampai bertemu.',
      'Menggeser tidak mengubah arah, jadi tidak mengubah sudut.',
      'Sudut AC dan BG pada kubus: 60 derajat, karena segitiga ACH sama sisi.',
      'Sudut antara dua garis selalu diambil yang tidak tumpul.',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    no: 9,
    slug: 'sudut-dengan-bidang',
    judul: 'Sudut dengan bidang dan sudut antarbidang',
    pertanyaan: 'Kenapa memiringkan penggaris sedikit saja mengubah sudutnya?',
    labelPendek: 'Sudut bidang',
    widget: 'sudut-bidang',
    siap: true,
    penjelasan: [
      { jenis: 'sesi', judul: 'Bagian pertama: garis dengan bidang' },
      {
        jenis: 'paragraf',
        teks:
          'Sebuah garis miring menembus bidang. Sudut yang dimaksud adalah sudut antara garis itu dan BAYANGANNYA pada bidang tersebut, yaitu bayangan yang jatuh kalau cahaya datang tegak lurus dari atas.',
      },
      {
        jenis: 'paragraf',
        teks:
          'Bayangan itu punya nama resmi: proyeksi. Cara mendapatkannya sederhana, yaitu memproyeksikan titik-titik ujung garisnya, lalu menghubungkan hasilnya.',
      },
      {
        jenis: 'contoh',
        judul: 'Diagonal ruang AG terhadap alas ABCD',
        baris: [
          'Bayangan titik A pada alas adalah A sendiri, sebab A memang di alas.',
          'Bayangan titik G pada alas adalah C, sebab GC tegak lurus alas.',
          'Jadi bayangan AG adalah AC, panjangnya 6 akar 2.',
          'Sekarang lihat segitiga ACG, siku-siku di C.',
          'tan sudut = CG dibagi AC = 6 dibagi 6 akar 2',
          'sudutnya kira-kira 35,26 derajat',
        ],
        simpul: 'Sudut antara diagonal ruang dan alas kira-kira 35,26 derajat.',
      },
      {
        jenis: 'coba',
        teks: 'Putar kubusnya sampai segitiga ACG terlihat jelas.',
        langkah: [
          'Ruas merah AG adalah garisnya.',
          'Ruas ungu AC adalah bayangannya di alas.',
          'Garis putus-putus CG adalah tiang tegak yang menghubungkan keduanya.',
          'Tanda siku-siku di C memastikan segitiganya memang siku-siku di sana.',
        ],
      },
      { jenis: 'sesi', judul: 'Bagian kedua: bidang dengan bidang' },
      {
        jenis: 'paragraf',
        teks:
          'Dua bidang yang berpotongan bertemu pada satu garis, disebut garis potong. Sudut antara kedua bidang diukur dengan dua garis bantu, satu di tiap bidang, yang keduanya tegak lurus garis potong itu DAN bertumpu di titik yang sama.',
      },
      {
        jenis: 'sorot',
        teks:
          'Dua syaratnya harus dipenuhi bersamaan: tegak lurus garis potong, dan bertumpu di satu titik yang sama.',
      },
      {
        jenis: 'contoh',
        judul: 'Bidang BDG terhadap alas ABCD',
        baris: [
          'Garis potongnya BD, sebab B dan D dimiliki kedua bidang.',
          'Ambil titik P di tengah BD.',
          'PC tegak lurus BD, dan PC ada di alas. Panjang PC = 3 akar 2.',
          'PG tegak lurus BD, dan PG ada di bidang BDG.',
          'Segitiga PCG siku-siku di C, dengan CG = 6.',
          'tan sudut = CG dibagi PC = 6 dibagi 3 akar 2',
          'sudutnya kira-kira 54,74 derajat',
        ],
        simpul: 'Sudut bidang BDG terhadap alas kira-kira 54,74 derajat.',
      },
      {
        jenis: 'paragraf',
        teks:
          'Kenapa titik P harus di tengah BD? Karena di situlah PC bisa tegak lurus BD. Segitiga BCD sama kaki, jadi garis dari C yang tegak lurus BD pasti mengenai titik tengahnya. Kalau P digeser, PC tidak lagi tegak lurus dan sudut yang terbaca menjadi salah.',
      },
      { jenis: 'sesi', judul: 'Sudut selalu diambil yang tidak tumpul' },
      {
        jenis: 'paragraf',
        teks:
          'Dua garis yang berpotongan sebenarnya membentuk dua sudut yang berjumlah 180 derajat. Kesepakatannya, yang disebut sudut antara keduanya adalah yang tidak tumpul. Jadi jawaban soal sudut di bangun ruang selalu antara 0 dan 90 derajat.',
      },
      {
        jenis: 'contoh',
        judul: 'Soal Ujian Nasional yang setipe',
        baris: [
          'UAN 2005: pada kubus ABCD.EFGH, berapa besar sudut antara garis AH dan bidang diagonal BDHF?',
          'Bayangan AH pada bidang BDHF perlu dicari lebih dulu.',
          'Jawabannya 30 derajat.',
        ],
        simpul: 'Sumber: soal UAN 2005.',
      },
    ],
    seringKeliru: {
      judul: 'Dua garis bantunya bertumpu di titik yang berbeda',
      isi:
        'Ini kekeliruan yang paling sering di seluruh topik. Kedua garis dipilih sudah benar tegak lurus garis potong, tetapi yang satu bertumpu di titik B dan yang lain di titik D. Sudut yang terbaca lalu bukan sudut antara kedua bidang itu, melainkan angka yang tidak berarti apa-apa. Kebiasaan yang menyelamatkan: tandai dulu satu titik pada garis potong, beri nama, dan tarik kedua garis bantu DARI titik itu.',
    },
    intisari: [
      'Sudut garis dengan bidang: sudut antara garis dan bayangannya (proyeksinya) pada bidang.',
      'Diagonal ruang terhadap alas kubus: kira-kira 35,26 derajat.',
      'Sudut dua bidang: pakai garis potongnya, dua garis tegak lurus garis potong, bertumpu di satu titik yang sama.',
      'Bidang BDG terhadap alas kubus: kira-kira 54,74 derajat.',
      'Jawaban sudut selalu antara 0 dan 90 derajat.',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    no: 10,
    slug: 'dunia-nyata',
    judul: 'Dipakai di dunia nyata',
    pertanyaan: 'Di mana orang benar-benar menghitung ini?',
    labelPendek: 'Dunia nyata',
    widget: 'dunia-nyata-ruang',
    siap: true,
    penjelasan: [
      { jenis: 'sesi', judul: 'Empat bangun ruang yang bersembunyi' },
      {
        jenis: 'paragraf',
        teks:
          'Empat gambar di sebelah kiri bukan soal buatan. Semuanya benda yang biasa dijumpai, dan di dalam tiap benda itu ada bangun ruang yang sedang dihitung orang sungguhan.',
      },
      {
        jenis: 'poin',
        judul: 'Apa yang dihitung di tiap gambar',
        butir: [
          'Lampu kelas - jarak titik ke bidang. Tukang listrik mengukur lurus ke bawah, bukan ke pojok ruangan.',
          'Atap rumah - sudut bidang dengan bidang. Terlalu landai, air menggenang. Terlalu curam, boros bahan.',
          'Menara rangka - dua batang bersilangan. Di foto keduanya tampak menyilang di satu titik, aslinya lewat di sisi yang berbeda, dan justru karena itu keduanya bisa dipasang tanpa bertabrakan.',
          'Tangga bersandar - sudut garis dengan bidang. Aturan tukang: sekitar 75 derajat.',
        ],
      },
      { jenis: 'sesi', judul: 'Kenapa ini bukan sekadar soal sekolah' },
      {
        jenis: 'paragraf',
        teks:
          'Yang menyatukan keempatnya: semuanya berangkat dari gambar dua dimensi, entah denah, foto, atau rancangan di layar, sementara benda yang dikerjakan tiga dimensi. Persis masalah tahap 1. Orang yang bekerja dengan benda ruang harus terbiasa tidak percaya begitu saja pada gambarnya.',
      },
      {
        jenis: 'paragraf',
        teks:
          'Contoh menara rangka itu bukan cerita karangan. Dua batang penguat yang di gambar tampak bersilang memang sengaja dirancang lewat di bidang yang berbeda, supaya tidak perlu dilubangi atau disambung di titik silangnya. Yang membaca gambarnya sebagai perpotongan akan salah memesan bahan.',
      },
      {
        jenis: 'sorot',
        teks:
          'Semua angka di keempat gambar dihitung dengan cara yang sama seperti tahap 1 sampai 9, dan diperiksa mesin sebelum dipasang di sini.',
      },
      { jenis: 'sesi', judul: 'Lanjutannya kalau tertarik' },
      {
        jenis: 'poin',
        judul: 'Ke mana materi ini bermuara',
        butir: [
          'Vektor - cara aljabar untuk jarak dan sudut yang sama, memakai koordinat. Ada di topik Vektor.',
          'Grafik komputer - setiap benda dalam permainan tiga dimensi diproyeksikan ke layar datar, persis seperti alat di halaman ini.',
          'Teknik sipil dan arsitektur - jarak, sudut, dan kemiringan adalah pekerjaan sehari-hari.',
        ],
      },
    ],
    intisari: [
      'Jarak titik ke bidang: memasang lampu, mengukur tinggi ruangan.',
      'Sudut bidang dengan bidang: kemiringan atap.',
      'Garis bersilangan: batang penguat pada rangka baja.',
      'Sudut garis dengan bidang: kemiringan tangga yang aman.',
    ],
  },
]
