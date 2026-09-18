import type { KanalPerSubbab, Soal } from '@/content/tipe'
import { K, kanal } from '../kanal-youtube.ts'

/**
 * Latihan terbimbing topik Transformasi Geometri: 6 soal pilihan ganda A sampai E.
 *
 * KALIBRASI KESULITAN
 * Ditakar ke Uji Kompetensi Bab 4 pada Buku Siswa Matematika Tingkat Lanjut
 * SMA Kelas XI (Kurikulum Sekolah Penggerak, 2021), halaman buku 222 sampai
 * 225. Isi soal di sana, dibaca langsung dari berkasnya:
 *
 *   nomor 17  mentransformasi GARIS 2x - 3y + 7 = 0 dan KURVA pangkat tiga
 *   nomor 18  titik (6,5) dicerminkan pada y = -x lalu diputar 90 derajat
 *   nomor 19  titik berlambang (x+2, 3y), dua transformasi berurutan
 *   nomor 20  garis 2x + 3y + 5 dengan dua transformasi berurutan
 *   nomor 21  kurva kuadrat dengan TIGA transformasi berurutan
 *   nomor 23  membuktikan dilatasi dan pencerminan komutatif lewat matriks
 *   nomor 25  membuktikan rumus umum cermin pada garis ax + by + c = 0
 *
 * Jadi tingkat buku itu jauh di atas "kenakan satu aturan pada satu titik".
 * Yang dipakai sebagai patokan di sini adalah nomor 18: dua transformasi
 * berurutan pada sebuah titik. Itu jadi soal 5 di bawah, dengan angka yang
 * sama persis seperti di buku supaya patokannya bisa diperiksa siapa pun.
 *
 * Mentransformasi garis dan kurva TIDAK dimasukkan ke latihan terbimbing.
 * Alasannya bukan karena terlalu sulit, tetapi karena keduanya menuntut
 * pemetaan balik yang belum diajarkan di ketiga belas materi topik ini.
 * Menaruhnya di sini berarti menguji hal yang belum diajarkan. Satu soal
 * garis ditaruh di bank kuis pada tingkat "sangat sulit", tempat siswa sudah
 * tahu ia sedang mengambil yang paling berat.
 *
 * PENGECOHNYA BUKAN ASAL SALAH
 * Tiap pilihan yang salah adalah satu kekeliruan yang memang sering terjadi,
 * dan hampir semuanya sudah dibahas di kotak "Sering keliru" pada materinya.
 * Yang paling sering: membaca angka lepas dari tanda minusnya, mengurangi k
 * alih-alih menghitung jaraknya, membalik tanda tanpa menukar koordinat, dan
 * membalik urutan komposisi.
 *
 * LETAK JAWABAN BENARNYA DIACAK
 * Kalau jawaban benar selalu pilihan A, siswa belajar menebak susunannya,
 * bukan materinya. Indeksnya di bawah: 2, 1, 3, 0, 4, 1.
 *
 * SELURUH ANGKA DIPERIKSA MESIN:
 *   python alat/cek_transformasi.py alat/soal-latihan-transformasi.json
 */
export const LATIHAN: Soal[] = [
  {
    no: 1,
    label: 'Translasi dengan komponen negatif',
    pertanyaan: 'Titik P(-2, 5) ditranslasikan oleh vektor (4, -7). Peta dari P adalah ...',
    pilihan: ['(2  12)', '(-6  12)', '(2  -2)', '(2  -7)', '(-6  -2)'],
    benar: 2,
    jawaban: '(2  -2)',
    pembahasan: [
      'Aturan translasi: koordinatnya DITAMBAH komponen geserannya. Bukan diganti, bukan dikurangi.',
      'Komponen mendatar: -2 ditambah 4, hasilnya 2.',
      'Komponen tegak: 5 ditambah negatif 7. Menambah bilangan negatif berarti mengurangi, jadi 5 dikurangi 7 sama dengan -2.',
      'Jadi petanya (2, -2).',
      'Periksa dengan menggambar: dari (-2, 5) melangkah 4 ke kanan, lalu 7 ke BAWAH sebab komponen tegaknya negatif. Mendarat di (2, -2). Betul.',
    ],
  },
  {
    no: 2,
    label: 'Cermin pada garis tegak yang bukan sumbu',
    pertanyaan: 'Titik A(1, 4) dicerminkan pada garis x = -2. Peta dari A adalah ...',
    pilihan: ['(3  4)', '(-5  4)', '(-3  4)', '(1  -5)', '(-4  4)'],
    benar: 1,
    jawaban: '(-5  4)',
    pembahasan: [
      'Jangan langsung ke rumus. Hitung jaraknya dulu, sebab dari situlah rumusnya datang.',
      'Jarak A ke garis cerminnya: dari x sama dengan 1 ke x sama dengan -2 berjarak 3 satuan.',
      'Bayangannya harus 3 satuan di seberang garis itu, jadi di x sama dengan -2 dikurangi 3, yaitu -5.',
      'Nilai y tidak disentuh sama sekali, sebab garis cerminnya tegak dan perpindahannya mendatar.',
      'Jadi petanya (-5, 4). Diperiksa dengan rumus 2k dikurangi x: 2 dikali -2 dikurangi 1 sama dengan -5. Cocok.',
      'Pilihan (3, 4) datang dari mengurangi k, dan pilihan (-3, 4) datang dari berhenti di jaraknya tanpa menambahkannya kembali. Keduanya bisa dibantah dengan satu gambar: titiknya di kanan garis, jadi bayangannya wajib di kiri garis, dan tidak boleh melewati -5.',
    ],
  },
  {
    no: 3,
    label: 'Cermin pada garis y = -x',
    pertanyaan: 'Titik B(5, -2) dicerminkan pada garis y = -x. Peta dari B adalah ...',
    pilihan: ['(-5  2)', '(-2  5)', '(2  5)', '(2  -5)', '(-5  -2)'],
    benar: 3,
    jawaban: '(2  -5)',
    pembahasan: [
      'Cermin pada y = -x mengerjakan DUA hal, bukan satu: koordinatnya bertukar tempat, lalu kedua tandanya berbalik.',
      'Langkah pertama, bertukar tempat: (5, -2) menjadi (-2, 5).',
      'Langkah kedua, kedua tandanya berbalik: (-2, 5) menjadi (2, -5).',
      'Jadi petanya (2, -5). Ringkasnya (x, y) menjadi (-y, -x).',
      'Pilihan (-5, 2) adalah hasil membalik tanda tanpa menukar, dan pilihan (-2, 5) adalah hasil menukar tanpa membalik tanda, yaitu jawaban untuk garis y = x. Keduanya mengerjakan setengah pekerjaan.',
    ],
  },
  {
    no: 4,
    label: 'Mencari pusat cerminnya',
    pertanyaan: 'Titik A(3, -1) dicerminkan pada suatu titik M, dan petanya A aksen (7, 5). Titik M adalah ...',
    pilihan: ['(5  2)', '(4  6)', '(10  4)', '(11  11)', '(-1  -7)'],
    benar: 0,
    jawaban: '(5  2)',
    pembahasan: [
      'Soal ini arahnya dibalik: yang diketahui prapeta dan petanya, yang dicari cerminnya. Jangan cari rumus baru.',
      'Pakai definisinya. Pada pencerminan terhadap titik, pusatnya SELALU tepat di tengah antara prapeta dan petanya.',
      'Jadi M adalah titik tengah A dan A aksen. Koordinat mendatarnya: (3 ditambah 7) dibagi 2 sama dengan 5.',
      'Koordinat tegaknya: (-1 ditambah 5) dibagi 2 sama dengan 2.',
      'Jadi M(5, 2).',
      'Diperiksa maju: A(3, -1) dicerminkan pada M(5, 2) memberi (2 dikali 5 dikurangi 3, 2 dikali 2 dikurangi -1), yaitu (7, 5). Sama dengan A aksen yang diketahui. Betul.',
      'Pilihan (4, 6) adalah selisih A aksen dikurangi A. Selisih itu memang berguna, tetapi ia menyatakan seberapa jauh titiknya berpindah, bukan di mana cerminnya berada.',
    ],
  },
  {
    no: 5,
    label: 'Dua transformasi berurutan',
    pertanyaan: 'Titik P(6, 5) dicerminkan pada garis y = -x, lalu hasilnya diputar 90 derajat berlawanan arah jarum jam terhadap titik asal. Peta akhirnya adalah ...',
    pilihan: ['(-5  -6)', '(-6  5)', '(-6  -5)', '(5  6)', '(6  -5)'],
    benar: 4,
    jawaban: '(6  -5)',
    pembahasan: [
      'Kerjakan satu langkah pada satu waktu, dan tulis hasil antaranya. Menggabungkan dua aturan di kepala adalah tempat kekeliruan paling sering lahir.',
      'Langkah pertama, cermin pada y = -x: (6, 5) bertukar tempat jadi (5, 6), lalu kedua tandanya berbalik jadi (-5, -6).',
      'Langkah kedua, rotasi 90 derajat berlawanan arah jarum jam terhadap titik asal memakai aturan (x, y) menjadi (-y, x).',
      'Kenakan pada (-5, -6): nilai mendatarnya menjadi negatif dari -6, yaitu 6. Nilai tegaknya menjadi -5.',
      'Jadi peta akhirnya (6, -5).',
      'Pilihan (-5, -6) adalah hasil berhenti di langkah pertama. Pilihan (-6, 5) adalah hasil membalik urutannya, yaitu diputar dulu lalu dicerminkan. Urutan menentukan hasil, dan itu bahasan Materi 11.',
    ],
  },
  {
    no: 6,
    label: 'Dilatasi berfaktor negatif',
    pertanyaan: 'Titik A(2, 3) didilatasi dengan pusat P(-1, 1) dan faktor -2. Peta dari A adalah ...',
    pilihan: ['(-4  -6)', '(-7  -3)', '(5  5)', '(-6  -4)', '(7  3)'],
    benar: 1,
    jawaban: '(-7  -3)',
    pembahasan: [
      'Dilatasi berpusat di titik yang bukan titik asal dikerjakan tiga langkah: ukur dari pusatnya, kalikan, lalu kembalikan dari pusatnya.',
      'Langkah pertama, ukur A dari pusat P: selisihnya (2 dikurangi -1, 3 dikurangi 1), yaitu (3, 2).',
      'Langkah kedua, kalikan selisih itu dengan -2: hasilnya (-6, -4).',
      'Langkah ketiga, kembalikan dari pusatnya: (-1 ditambah -6, 1 ditambah -4), yaitu (-7, -3).',
      'Jadi petanya (-7, -3).',
      'Faktor negatif membuat petanya menyeberang ke sisi lain pusatnya. Periksa di gambar: P(-1, 1) memang berada di antara A(2, 3) dan A aksen (-7, -3), dan ketiganya terletak pada satu garis lurus.',
      'Pilihan (-4, -6) datang dari mengalikan koordinat A langsung dengan -2 tanpa memperhatikan pusatnya, yaitu memperlakukan pusatnya seolah di titik asal. Pilihan (-6, -4) datang dari berhenti di langkah kedua.',
    ],
  },
]

/**
 * Kanal YouTube rujukan.
 *
 * Keempat kanal ini kanal yang SAMA dengan yang dipakai topik lain di MANTRA,
 * yang kata pencariannya disesuaikan. Kanalnya tidak diganti-ganti per topik
 * dengan sengaja: keempatnya sudah diperiksa nyata dan masih aktif, dan
 * mengarang nama kanal baru berisiko menautkan siswa ke tempat yang tidak ada.
 * Yang ditautkan kanalnya, bukan videonya, sebab video bisa dihapus pemiliknya
 * sedangkan kanal jarang hilang.
 */
export const KANAL: KanalPerSubbab = {
  // A · Prapeta, Peta, dan Pencerminan
  A: [
    kanal(K.benni, 'transformasi geometri refleksi', 'mOZiUChba6Y', 'Transformasi Geometri [Part 1] - Refleksi (Pencerminan)'),
    kanal(K.leGuruLes, 'refleksi pencerminan', '097rIkJ0-Pg', 'Transformasi (2) - Refleksi, Pencerminan, Rumus Pencerminan - Matematika SMP'),
    kanal(K.seekorLebah, 'refleksi', '1QljHgF5Uts', '[FULL] TRIK CEPAT PAHAM REFLEKSI‼️'),
  ],
  // B · Translasi, Rotasi, dan Dilatasi
  B: [
    kanal(K.m4thlab, 'transformasi geometri translasi', 'iojzS-0DI_g', 'Transformasi Geometri Bagian 1 - Translasi (Pergeseran) Matematika Wajib Kelas 11'),
    kanal(K.benni, 'transformasi geometri rotasi', 'D6j16axCf1M', 'Transformasi Geometri [Part 3] - Rotasi (Perputaran)'),
    kanal(K.seekorLebah, 'dilatasi', 'xuDHY9r74no', '[FuLL] TRIK MEMAHAMI SOAL-SOAL DILATASI‼️'),
  ],
  // C · Sifat Transformasi
  C: [
    kanal(K.matematikaHebat, 'transformasi geometri lengkap', '4ojT0jS_pR8', '(LENGKAP) TRANSFORMASI GEOMETRI - Translasi, Refleksi, Rotasi dan Dilatasi'),
    kanal(K.bigCourse, 'transformasi geometri', 'aVqoMTZUrBA', 'Matematika kelas XI - Transformasi Geometri'),
    kanal(K.kakWahyu, 'translasi pergeseran', '5Rlyp-t0R_U', 'Penjelasan Lengkap Tentang Translasi (Pergeseran)'),
  ],
  // D · Matriks Transformasi
  D: [
    kanal(K.m4thlab, 'transformasi geometri bagian 5 transformasi matriks', 'KBX6B1-ULF0', 'Transformasi Geometri Bagian 5 -Transformasi Matriks Matematika Wajib Kelas 11'),
    kanal(K.jendelaSains, 'transformasi geometri dengan matriks translasi pergeseran', '2av7ogY0Iek', 'Transformasi Geometri dengan Matriks • Part 1: Translasi / Pergeseran'),
    kanal(K.bigCourse, 'matriks', '-2pSwVmHySY', 'Matematika kelas XI - Matriks part 1 - Ordo dan Dasar Operasi Matriks'),
  ],
  // E · Komposisi Transformasi
  E: [
    kanal(K.pingLie, 'komposisi transformasi', '1hbJ8nRks7c', 'Trik Cepat Komposisi Transformasi - Transformasi Geometri #TanyaPINGLIE'),
    kanal(K.leGuruLes, 'transformasi campuran', 'EtSZYw0XyE0', 'Transformasi (5) - Transformasi Campuran - Matematika SMP'),
    kanal(K.m4thlab, 'transformasi matriks', 'KBX6B1-ULF0', 'Transformasi Geometri Bagian 5 -Transformasi Matriks Matematika Wajib Kelas 11'),
  ],
  // F · Penerapan Transformasi Geometri
  F: [
    kanal(K.matematikaHebat, 'transformasi geometri lengkap', '4ojT0jS_pR8', '(LENGKAP) TRANSFORMASI GEOMETRI - Translasi, Refleksi, Rotasi dan Dilatasi'),
    kanal(K.benni, 'transformasi geometri', 'mOZiUChba6Y', 'Transformasi Geometri [Part 1] - Refleksi (Pencerminan)'),
    kanal(K.leGuruLes, 'transformasi rotasi', 'tM6RMmQ80QM', 'Transformasi (4) - Transformasi Rotasi, Rumus Tranformasi Rotasi, Soal Rotasi - Matematika SMP'),
  ],
}