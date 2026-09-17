/**
 * Bank soal latihan Statistika: 60 soal, 15 tiap tingkat.
 *
 * 14 Sep 2026: seluruh pembahasan ditulis ulang meniru cara mathcyber1997
 * (catatan belajar `PELAJARI BENTUK SOAL MATEMATIKA/CATATAN-BELAJAR-PEMBAHASAN.md`
 * bagian 4.7): tabel ditulis ULANG di pembahasan dengan baris kelas modus
 * atau median disorot dan kolom baru (frekuensi kumulatif, x_i, f_i x_i)
 * ditambahkan; tiap besaran disebut namanya lalu angkanya (tepi bawah L₀,
 * lebar kelas c, d₁, d₂, ΣF_k, f_m); "Untuk itu, Me = L₀ + c((n/2 − ΣF_k)/f_m)
 * = ..."; soal cerita dimulai "Misalkan banyak bilangan itu n. Karena
 * rata-ratanya 40, jumlah seluruhnya 40n."; pernyataan diperiksa satu per
 * satu; penutup "Jadi, ... (Jawaban C)". Gambar bantu utama: TABEL yang
 * diperluas dan disorot; untuk histogram, batang kelas yang dibahas disorot.
 *
 * Id soal lama dipertahankan. Delapan soal kembar atau terlalu tipis diganti
 * jenis yang belum ada (pola mathcyber1997, ditulis sendiri): st-37 dan
 * st-39 jadi st-61 (rata-rata setelah satu data ditambah) dan st-62
 * (rata-rata dari tabel frekuensi); st-46 dan st-11 jadi st-63 (bilangan
 * salah baca) dan st-64 (desil data tunggal); st-48 dan st-52 jadi st-65
 * (persentil data berkelompok) dan st-66 (pernyataan benar/salah dari
 * tabel, gaya UTBK); st-58 dan st-28 jadi st-67 (banyak data dari
 * rata-rata yang berubah) dan st-68 (data dikali lalu dikurangi).
 * Jawaban benar disebar merata oleh `alat/acak_pilihan.mjs`.
 *
 * Tiap jawaban berangka punya `// cek:` yang dijalankan `alat/cek_kuis.mjs`;
 * `--ketat` juga memeriksa gaya pembahasannya.
 */
export type { TingkatKuis, SoalKuis } from '@/content/tipe'
import type { SoalKuis } from '@/content/tipe'

const TABEL40 = {
  kepala: ['Nilai', 'f'],
  baris: [['40 − 49', '3'], ['50 − 59', '8'], ['60 − 69', '12'], ['70 − 79', '9'], ['80 − 89', '6'], ['90 − 99', '2']],
  jumlah: ['Jumlah', '40'],
}

export const KUIS: SoalKuis[] = [
  // ================================================================ MUDAH
  {
    id: 'st-01',
    tingkat: 'mudah',
    pertanyaan: 'Nilai delapan siswa: 4, 5, 6, 7, 7, 8, 8, 11. Modus data itu adalah…',
    gambar: { jenis: 'batang', kategori: ['4', '5', '6', '7', '8', '11'], nilai: [1, 1, 1, 2, 2, 1], satuan: 'banyak siswa' },
    pilihan: ['7 saja', '8 saja', '7 dan 8', '11', 'tidak punya modus'],
    benar: 2,
    langkah: [
      'Modus adalah nilai yang paling sering muncul pada data. Hitung frekuensi tiap nilai.',
      {
        teks: 'Lengkapi tabel frekuensinya: nilai 4, 5, 6, dan 11 masing-masing muncul sekali, sedangkan 7 dan 8 masing-masing muncul dua kali.',
        gambar: { jenis: 'tabel', kepala: ['Nilai', 'Frekuensi'], baris: [['4', '1'], ['5', '1'], ['6', '1'], ['7', '2'], ['8', '2'], ['11', '1']], sorot: [3, 4] },
      },
      'Tampak bahwa frekuensi tertinggi, yaitu 2, dicapai oleh dua nilai sekaligus: 7 dan 8. Data seperti ini mempunyai dua modus (bimodal).',
      'Jadi, modus data tersebut adalah 7 dan 8. (Jawaban C)',
    ],
    jebakan: 'Pilihan D, 11, mengira modus adalah nilai terbesar. Pilihan E, tidak punya modus, menganggap data dengan dua nilai terbanyak tidak bermodus; itu baru berlaku bila SEMUA nilai frekuensinya sama. Pilihan A dan B hanya mengambil salah satu.',
    alasan: '7 dan 8 sama-sama muncul dua kali, terbanyak: dua modus.',
  },
  {
    // cek: (6+6+7+7+7+7+8+8)/8 === 7
    id: 'st-02',
    tingkat: 'mudah',
    pertanyaan: 'Nilai delapan siswa: 6, 6, 7, 7, 7, 7, 8, 8. Rata-rata data itu adalah…',
    pilihan: ['6', '7', '6,5', '7,5', '8'],
    benar: 1,
    langkah: [
      'Rata-rata (mean) dihitung dengan membagi jumlah seluruh data dengan banyaknya data: x̄ = Σx/n.',
      'Jumlah datanya 6 + 6 + 7 + 7 + 7 + 7 + 8 + 8 = 56 dan banyaknya n = 8.',
      'Untuk itu, x̄ = 56/8 = 7. Hasil ini masuk akal: dua nilai 6 dan dua nilai 8 saling mengimbangi di sekitar 7.',
      'Jadi, rata-rata data tersebut adalah 7. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, 6,5, dan pilihan D, 7,5, muncul bila jumlahnya salah dihitung (52 atau 60). Pilihan A, 6, dan E, 8, mengambil nilai terkecil atau terbesar.',
    alasan: 'Σx = 56, n = 8, x̄ = 7.',
  },
  {
    // cek: [7,9,11,12,15][2] === 11
    id: 'st-03',
    tingkat: 'mudah',
    pertanyaan: 'Data: 12, 7, 15, 9, 11. Median data itu adalah…',
    pilihan: ['9', '11', '12', '15', '10,8'],
    benar: 1,
    langkah: [
      'Median adalah nilai tengah data SETELAH diurutkan; datanya harus diurutkan lebih dulu.',
      'Urutkan dari kecil ke besar: 7, 9, 11, 12, 15.',
      'Banyak data n = 5 (ganjil), sehingga median adalah datum ke-(n + 1)/2 = ke-3, yaitu 11; ada dua data di bawahnya dan dua data di atasnya.',
      'Jadi, median data tersebut adalah 11. (Jawaban B)',
    ],
    jebakan: 'Pilihan D, 15, mengambil nilai tengah dari urutan ASLI (12, 7, 15, 9, 11) tanpa mengurutkan. Pilihan E, 10,8, adalah rata-ratanya, bukan median. Pilihan A, 9, salah menghitung posisi tengah.',
    alasan: 'Terurut 7, 9, 11, 12, 15; datum ke-3 adalah 11.',
  },
  {
    // cek: 11 - 3 === 8
    id: 'st-04',
    tingkat: 'mudah',
    pertanyaan: 'Data: 3, 4, 5, 7, 7, 9, 10, 11. Jangkauan data itu adalah…',
    pilihan: ['3', '7', '11', '14', '8'],
    benar: 4,
    langkah: [
      'Jangkauan (range) adalah selisih nilai terbesar dan nilai terkecil: J = x_maks − x_min.',
      'Nilai terbesar 11 dan nilai terkecil 3, sehingga J = 11 − 3 = 8.',
      'Jadi, jangkauan data tersebut adalah 8. (Jawaban E)',
    ],
    jebakan: 'Pilihan C, 11, hanya mengambil nilai terbesar tanpa dikurangi nilai terkecil. Pilihan D, 14, menjumlahkan keduanya. Pilihan B, 7, mengambil modus.',
    alasan: 'J = 11 − 3 = 8.',
  },
  {
    id: 'st-05',
    tingkat: 'mudah',
    pertanyaan: 'Data cara siswa berangkat ke sekolah: jalan kaki, sepeda, sepeda motor, angkot, diantar. Sajian yang tepat untuk data ini adalah…',
    gambar: { jenis: 'batang', kategori: ['jalan', 'sepeda', 'motor', 'angkot', 'diantar'], nilai: [6, 4, 12, 10, 8], satuan: 'siswa' },
    pilihan: ['histogram, karena batangnya rapat', 'line plot, karena tiap data satu titik', 'diagram batang, karena datanya berupa kategori', 'diagram garis, karena menunjukkan perubahan', 'semuanya sama saja'],
    benar: 2,
    langkah: [
      'Perhatikan jenis datanya: cara berangkat adalah data KATEGORI (nominal), bukan angka; antar kategori tidak ada urutan maupun jarak.',
      'Diagram batang dipakai untuk membandingkan banyaknya anggota tiap kategori, dengan batang-batang terpisah karena kategorinya terputus satu sama lain.',
      'Histogram dan diagram garis dipakai untuk data angka: histogram untuk data berkelompok yang batangnya menyambung, diagram garis untuk perubahan sepanjang waktu.',
      'Jadi, sajian yang tepat adalah diagram batang, karena datanya berupa kategori. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, histogram, menggoda karena bentuknya mirip diagram batang; bedanya histogram untuk data angka berkelas dan batangnya rapat. Pilihan D, diagram garis, keliru karena tidak ada urutan waktu yang menghubungkan "sepeda" ke "motor".',
    alasan: 'Data kategori disajikan dengan diagram batang terpisah.',
  },
  {
    // cek: Math.abs(12/40 - 0.3) < 1e-9
    id: 'st-06',
    tingkat: 'mudah',
    pertanyaan: 'Dari 40 siswa, 12 di antaranya naik sepeda motor. Frekuensi relatifnya adalah…',
    pilihan: ['0,12', '3', '0,3', '12 persen', '30'],
    benar: 2,
    langkah: [
      'Frekuensi relatif adalah frekuensi suatu kategori dibagi banyak seluruh data: f_rel = f/n.',
      'Untuk itu, f_rel = 12/40 = 0,3, atau 30 persen.',
      'Jadi, frekuensi relatifnya adalah 0,3. (Jawaban C)',
    ],
    jebakan: 'Pilihan D, 12 persen, menyalin frekuensinya sebagai persen tanpa membagi 40. Pilihan E, 30, adalah persentasenya tetapi tanpa tanda persen, sehingga bukan frekuensi relatif (yang selalu antara 0 dan 1). Pilihan B, 3, membagi 12 dengan 4.',
    alasan: 'f_rel = 12/40 = 0,3.',
  },
  {
    id: 'st-07',
    tingkat: 'mudah',
    pertanyaan: 'Bagian data yang nilainya di bawah kuartil bawah Q₁ adalah…',
    pilihan: ['10 persen', '50 persen', '75 persen', '25 persen', 'tergantung datanya'],
    benar: 3,
    langkah: [
      'Ingat bahwa kuartil membagi data terurut menjadi empat bagian yang sama banyak: Q₁ membatasi seperempat pertama, Q₂ (median) setengahnya, dan Q₃ tiga perempatnya.',
      'Dengan demikian, di bawah Q₁ terdapat seperempat data, yaitu 25 persen.',
      'Jadi, bagian data yang nilainya di bawah Q₁ adalah 25 persen. (Jawaban D)',
    ],
    jebakan: 'Pilihan B, 50 persen, adalah bagian di bawah median (Q₂). Pilihan C, 75 persen, adalah bagian di bawah Q₃. Pilihan E menggoda karena NILAI Q₁ memang bergantung data, tetapi bagiannya selalu seperempat.',
    alasan: 'Kuartil membagi data jadi empat bagian sama banyak: di bawah Q₁ ada 25 persen.',
  },
  {
    id: 'st-08',
    tingkat: 'mudah',
    pertanyaan: 'Sebuah kumpulan data mempunyai simpangan baku 0. Artinya…',
    pilihan: ['datanya kosong', 'semua nilainya sama', 'rata-ratanya nol', 'datanya tersebar sangat lebar', 'ada kesalahan hitung'],
    benar: 1,
    langkah: [
      'Ingat bahwa simpangan baku mengukur seberapa jauh data menyebar dari rata-ratanya: s = √(Σ(x − x̄)²/n).',
      'Simpangan baku 0 berarti Σ(x − x̄)² = 0, dan jumlah kuadrat hanya bisa nol bila setiap sukunya nol, yaitu x − x̄ = 0 untuk semua data.',
      'Dengan demikian, setiap nilai sama dengan rata-ratanya, sehingga semua nilai data sama, misalnya 7, 7, 7, 7.',
      'Jadi, simpangan baku 0 berarti semua nilainya sama. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, rata-ratanya nol, mengacaukan ukuran sebaran dengan ukuran pemusatan; data 5, 5, 5 bersimpangan baku 0 walau rata-ratanya 5. Pilihan D justru kebalikannya: sebaran lebar berarti simpangan baku besar.',
    alasan: 'Σ(x − x̄)² = 0 hanya bila semua x = x̄.',
  },
  {
    // cek: (5 + 7 + 9)/3 === 7
    id: 'st-33',
    tingkat: 'mudah',
    pertanyaan: 'Rata-rata dari 5, 7, dan 9 adalah…',
    pilihan: ['7', '6', '8', '21', '5'],
    benar: 0,
    langkah: [
      'Rata-rata dihitung dengan membagi jumlah data dengan banyaknya data: x̄ = (5 + 7 + 9)/3.',
      'Jumlahnya 21 dan banyaknya 3, sehingga x̄ = 21/3 = 7.',
      'Jadi, rata-rata dari 5, 7, dan 9 adalah 7. (Jawaban A)',
    ],
    jebakan: 'Pilihan D, 21, berhenti pada jumlahnya tanpa dibagi 3. Pilihan B, 6, dan C, 8, salah membagi. Pilihan E, 5, mengambil nilai terkecil.',
    alasan: '(5 + 7 + 9)/3 = 7.',
  },
  {
    // cek: (8 + 9)/2 === 8.5
    id: 'st-34',
    tingkat: 'mudah',
    pertanyaan: 'Data terurut: 3, 4, 6, 8, 9, 12, 15, 20. Median data itu adalah…',
    pilihan: ['8', '9', '9,625', '8,5', '12'],
    benar: 3,
    langkah: [
      'Data sudah terurut dengan banyak data n = 8 (genap), sehingga tidak ada satu datum yang tepat di tengah; median adalah rata-rata dua datum tengah, yaitu datum ke-n/2 = 4 dan ke-(n/2 + 1) = 5.',
      'Datum ke-4 adalah 8 dan datum ke-5 adalah 9, sehingga Me = (8 + 9)/2 = 8,5.',
      'Jadi, median data tersebut adalah 8,5. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 8, dan C, 9, hanya mengambil salah satu datum tengah, padahal untuk n genap keduanya dirata-ratakan. Pilihan C, 9,625, adalah rata-rata seluruh data (77/8), bukan median.',
    alasan: 'n genap: Me = (datum ke-4 + ke-5)/2 = (8 + 9)/2 = 8,5.',
  },
  {
    id: 'st-35',
    tingkat: 'mudah',
    pertanyaan: 'Diagram batang berikut menyajikan pengunjung perpustakaan selama lima bulan. Bulan dengan pengunjung terbanyak adalah…',
    gambar: { jenis: 'batang', kategori: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'], nilai: [412, 418, 425, 421, 430], satuan: 'orang' },
    pilihan: ['Mar', 'Mei', 'Apr', 'Jan', 'Feb'],
    benar: 1,
    langkah: [
      {
        teks: 'Baca tinggi tiap batang lalu tulis dalam tabel supaya mudah dibandingkan.',
        gambar: { jenis: 'tabel', kepala: ['Bulan', 'Pengunjung'], baris: [['Jan', '412'], ['Feb', '418'], ['Mar', '425'], ['Apr', '421'], ['Mei', '430']], sorot: [4] },
      },
      'Tampak bahwa nilai terbesar adalah 430 pada bulan Mei; Maret (425) tertinggi kedua, lalu April turun ke 421 sebelum naik lagi.',
      'Jadi, bulan dengan pengunjung terbanyak adalah Mei. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, Mar, menggoda karena batang Maret terlihat menonjol setelah kenaikan dua bulan berturut-turut, tetapi Mei tetap lebih tinggi. Perbedaan antar batang kecil (belasan orang), sehingga angkanya harus dibaca, bukan dikira-kira.',
    alasan: 'Batang tertinggi 430 pada Mei.',
  },
  {
    id: 'st-36',
    tingkat: 'mudah',
    pertanyaan: 'Data tinggi badan 40 siswa (dalam cm) paling tepat disajikan dengan…',
    pilihan: ['diagram batang kategori', 'diagram lingkaran', 'tabel nama siswa', 'histogram', 'diagram garis'],
    benar: 3,
    langkah: [
      'Perhatikan jenis datanya: tinggi badan adalah data angka kontinu (bisa 156,5 cm) dan jumlahnya cukup banyak (40), sehingga nilainya perlu dikelompokkan ke dalam kelas, misalnya 150 − 154, 155 − 159, dan seterusnya.',
      'Histogram adalah sajian untuk data berkelompok seperti itu: batang-batangnya menyambung karena kelas-kelasnya bersambungan, dan tingginya menunjukkan banyak siswa tiap kelas.',
      'Diagram batang kategori cocok untuk data kategori, diagram lingkaran untuk bagian dari keseluruhan, diagram garis untuk perubahan sepanjang waktu, dan tabel nama tidak meringkas apa pun.',
      'Jadi, data tinggi badan 40 siswa paling tepat disajikan dengan histogram. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, diagram batang kategori, keliru karena tinggi badan bukan kategori terputus; membuat satu batang tiap siswa (40 batang) tidak memperlihatkan sebaran. Pilihan E, diagram garis, keliru karena tidak ada urutan waktu.',
    alasan: 'Data angka kontinu berjumlah banyak: dikelompokkan lalu disajikan histogram.',
  },
  {
    // cek: (35 + 13)/6 === 8
    id: 'st-61',
    tingkat: 'mudah',
    pertanyaan: 'Rata-rata nilai lima siswa adalah 7. Seorang siswa lain yang bernilai 13 bergabung. Rata-rata nilai keenam siswa itu adalah…',
    pilihan: ['10', '7,5', '9', '20', '8'],
    benar: 4,
    langkah: [
      'Ingat bahwa jumlah data sama dengan rata-rata dikalikan banyak data. Karena rata-rata lima siswa 7, jumlah nilai mereka adalah 5 × 7 = 35.',
      'Setelah siswa bernilai 13 bergabung, jumlah nilainya menjadi 35 + 13 = 48 dan banyak siswanya 6.',
      'Untuk itu, rata-rata baru = 48/6 = 8.',
      'Jadi, rata-rata nilai keenam siswa itu adalah 8. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 10, merata-ratakan 7 dan 13 seolah keduanya satu siswa; padahal 7 mewakili lima siswa. Pilihan C, 9, dan C, 7,5, menebak "naik sedikit" tanpa menghitung jumlahnya.',
    alasan: 'Jumlah 5 × 7 + 13 = 48; dibagi 6 = 8.',
  },
  {
    // cek: (70*2 + 80*5 + 90*3)/10 === 81
    id: 'st-62',
    tingkat: 'mudah',
    pertanyaan: 'Tabel berikut menyajikan nilai ulangan sepuluh siswa. Rata-rata nilainya adalah…',
    gambar: { jenis: 'tabel', kepala: ['Nilai', 'f'], baris: [['70', '2'], ['80', '5'], ['90', '3']], jumlah: ['Jumlah', '10'] },
    pilihan: ['80', '81', '82', '83', '78'],
    benar: 1,
    langkah: [
      'Untuk data dalam tabel frekuensi, rata-rata dihitung dengan x̄ = Σf_i x_i / Σf_i: tiap nilai dikalikan frekuensinya, dijumlahkan, lalu dibagi banyak data.',
      {
        teks: 'Lengkapi tabel dengan kolom f_i x_i.',
        gambar: { jenis: 'tabel', kepala: ['Nilai (x_i)', 'f_i', 'f_i x_i'], baris: [['70', '2', '140'], ['80', '5', '400'], ['90', '3', '270']], kolomBaru: [2], jumlah: ['Jumlah', '10', '810'] },
      },
      'Diperoleh Σf_i = 10 dan Σf_i x_i = 140 + 400 + 270 = 810, sehingga x̄ = 810/10 = 81.',
      'Jadi, rata-rata nilai ulangan itu adalah 81. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 80, merata-ratakan 70, 80, 90 tanpa memperhatikan frekuensinya, seolah tiap nilai hanya muncul sekali. Pilihan D, 83, salah menghitung jumlah f_i x_i.',
    alasan: 'Σf_i x_i = 810, Σf_i = 10, x̄ = 81.',
  },
  {
    // cek: [2,4,6,8,10,12,14][5] === 12
    id: 'st-38',
    tingkat: 'mudah',
    pertanyaan: 'Data terurut: 2, 4, 6, 8, 10, 12, 14. Kuartil atas Q₃ data itu adalah…',
    pilihan: ['10', '8', '14', '12', '11'],
    benar: 3,
    langkah: [
      'Data terurut dengan n = 7. Median (Q₂) adalah datum ke-4, yaitu 8, yang membagi data menjadi separuh bawah 2, 4, 6 dan separuh atas 10, 12, 14.',
      'Kuartil atas Q₃ adalah median separuh atas: dari 10, 12, 14, nilai tengahnya 12. (Dengan rumus letak, Q₃ berada di datum ke-3(n + 1)/4 = ke-6, yaitu 12.)',
      'Jadi, kuartil atas Q₃ adalah 12. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 10, mengambil datum pertama separuh atas, bukan tengahnya. Pilihan C, 14, mengira Q₃ adalah nilai terbesar. Pilihan B, 8, adalah median (Q₂).',
    alasan: 'Separuh atas 10, 12, 14; tengahnya Q₃ = 12.',
  },
  // =============================================================== SEDANG
  {
    id: 'st-09',
    tingkat: 'sedang',
    pertanyaan: 'Dua kelas mempunyai rata-rata, median, dan modus yang sama persis, yaitu 7. Yang PASTI dapat disimpulkan adalah…',
    pilihan: ['kedua kelas mempunyai nilai yang sama', 'belum ada yang bisa disimpulkan tentang sebarannya', 'kedua kelas mempunyai sebaran yang sama', 'kedua kelas mempunyai jangkauan yang sama', 'kedua kelas mempunyai banyak siswa yang sama'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa rata-rata, median, dan modus adalah ukuran PEMUSATAN: ketiganya menunjuk letak "tengah" data, bukan seberapa jauh data menyebar.',
      {
        teks: 'Ambil contoh tandingan: kelas pertama 6, 7, 7, 7, 8 dan kelas kedua 3, 7, 7, 7, 11. Keduanya berrata-rata 7, bermedian 7, dan bermodus 7, tetapi jangkauannya 2 lawan 8, seperti tabel berikut.',
        gambar: { jenis: 'tabel', kepala: ['', 'Kelas 1', 'Kelas 2'], baris: [['data', '6, 7, 7, 7, 8', '3, 7, 7, 7, 11'], ['rata-rata', '7', '7'], ['median', '7', '7'], ['modus', '7', '7'], ['jangkauan', '2', '8']], sorot: [4], kolomBaru: [] },
      },
      'Dengan demikian, kesamaan ketiga ukuran pemusatan tidak menjamin apa pun tentang sebaran (jangkauan, simpangan baku) maupun banyak siswanya.',
      'Jadi, yang pasti dapat disimpulkan hanyalah belum ada yang bisa disimpulkan tentang sebarannya. (Jawaban B)',
    ],
    jebakan: 'Pilihan C dan D menggoda karena "sama persis" terdengar menyeluruh, padahal ketiga ukuran itu satu jenis (pemusatan). Pilihan A terlalu jauh: dua kelas dengan ringkasan yang sama bisa berisi nilai yang sangat berbeda.',
    alasan: 'Pemusatan sama tidak menentukan sebaran; contoh 6,7,7,7,8 dan 3,7,7,7,11.',
  },
  {
    // cek: Math.abs(18/60 - 0.3) < 1e-9 && Math.abs(25/100 - 0.25) < 1e-9
    id: 'st-10',
    tingkat: 'sedang',
    pertanyaan: 'Sekolah A: 18 dari 60 siswa ikut ekstrakurikuler musik. Sekolah B: 25 dari 100 siswa. Sekolah yang bagian pesertanya lebih besar adalah…',
    pilihan: ['sekolah B, sebab 25 lebih banyak daripada 18', 'sama saja', 'tidak bisa dibandingkan', 'sekolah A, yaitu 30 persen lawan 25 persen', 'sekolah B, yaitu 25 persen lawan 18 persen'],
    benar: 3,
    langkah: [
      'Karena banyak siswa kedua sekolah berbeda, yang dibandingkan haruslah frekuensi RELATIF (bagian dari keseluruhan), bukan frekuensi mutlak.',
      {
        teks: 'Hitung frekuensi relatif tiap sekolah: A memberi 18/60 = 0,30 = 30 persen dan B memberi 25/100 = 0,25 = 25 persen, seperti tabel berikut.',
        gambar: { jenis: 'tabel', kepala: ['Sekolah', 'Peserta', 'Siswa', 'Frekuensi relatif'], baris: [['A', '18', '60', '18/60 = 30%'], ['B', '25', '100', '25/100 = 25%']], kolomBaru: [3], sorot: [0] },
      },
      'Tampak bahwa 30 persen lebih besar dari 25 persen, sehingga bagian peserta di sekolah A lebih besar walaupun jumlah orangnya lebih sedikit.',
      'Jadi, bagian pesertanya lebih besar di sekolah A, yaitu 30 persen lawan 25 persen. (Jawaban D)',
    ],
    jebakan: 'Pilihan A membandingkan frekuensi mutlak 25 dan 18, padahal dasarnya berbeda (100 lawan 60 siswa). Pilihan E menyalin 18 sebagai persen tanpa membaginya dengan 60.',
    alasan: '18/60 = 30% > 25/100 = 25%.',
  },
  {
    // cek: (20*45 - 30 + 60)/20 === 46.5
    id: 'st-63',
    tingkat: 'sedang',
    pertanyaan: 'Rata-rata 20 bilangan adalah 45. Ternyata satu bilangan yang seharusnya 60 terbaca 30. Rata-rata yang sebenarnya adalah…',
    pilihan: ['47', '46', '45,5', '48', '46,5'],
    benar: 4,
    langkah: [
      'Ingat bahwa jumlah data sama dengan rata-rata dikali banyak data. Dengan bacaan yang salah, jumlah 20 bilangan itu adalah 20 × 45 = 900.',
      'Bilangan yang terbaca 30 seharusnya 60, sehingga jumlah sebenarnya lebih besar 60 − 30 = 30: jumlah sebenarnya = 900 + 30 = 930.',
      'Untuk itu, rata-rata sebenarnya = 930/20 = 46,5.',
      'Jadi, rata-rata yang sebenarnya adalah 46,5. (Jawaban E)',
    ],
    jebakan: 'Pilihan D, 48, menambahkan 60/20 = 3 tanpa mengurangkan bacaan salah 30. Pilihan B, 46, membulatkan 30/20 = 1,5 ke bawah. Pilihan C, 45,5, membagi selisih 30 dengan 60 secara keliru.',
    alasan: 'Jumlah naik 30 menjadi 930; 930/20 = 46,5.',
  },
  {
    id: 'st-12',
    tingkat: 'sedang',
    pertanyaan: 'Gaji sembilan karyawan sekitar 5 juta, lalu satu direktur bergaji 75 juta ikut dihitung. Ukuran yang paling mewakili gaji orang kebanyakan di kantor itu adalah…',
    gambar: { jenis: 'batang', kategori: ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'dir'], nilai: [4.5, 4.8, 5, 5, 5.1, 5.2, 5.5, 6, 7, 75], satuan: 'juta', sorot: [9] },
    pilihan: ['median, sebab tidak tertarik oleh satu nilai yang jauh', 'mean, sebab memakai semua data', 'modus, sebab paling sering muncul', 'jangkauan', 'ketiganya sama saja'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa nilai 75 juta jauh terpisah dari sembilan nilai lainnya; nilai seperti itu disebut pencilan.',
      {
        teks: 'Bandingkan kedua ukuran: mean seluruh data = (4,5 + 4,8 + 5 + 5 + 5,1 + 5,2 + 5,5 + 6 + 7 + 75)/10 = 123,1/10 ≈ 12,3 juta, padahal tidak ada karyawan biasa yang gajinya mendekati 12 juta. Median (rata-rata datum ke-5 dan ke-6 setelah diurutkan) = (5,1 + 5,2)/2 = 5,15 juta, seperti tabel berikut.',
        gambar: { jenis: 'tabel', kepala: ['Ukuran', 'Nilai', 'Mewakili orang kebanyakan?'], baris: [['mean', '≈ 12,3 juta', 'tidak; tertarik oleh 75 juta'], ['median', '5,15 juta', 'ya']], sorot: [1] },
      },
      'Mean ikut tertarik ke atas oleh satu nilai ekstrem karena semua nilai ikut dijumlahkan, sedangkan median hanya memakai POSISI tengah sehingga tidak terpengaruh seberapa jauh pencilan itu.',
      'Jadi, ukuran yang paling mewakili gaji orang kebanyakan adalah median, sebab tidak tertarik oleh satu nilai yang jauh. (Jawaban A)',
    ],
    jebakan: 'Pilihan B menggoda karena "memakai semua data" terdengar adil, tetapi justru itulah yang membuat mean mudah tertarik pencilan. Pilihan C, modus, tidak tepat karena gaji yang persis sama jarang berulang.',
    alasan: 'Ada pencilan 75 juta; mean tertarik ke 12,3 juta, median tetap 5,15 juta.',
  },
  {
    id: 'st-13',
    tingkat: 'sedang',
    pertanyaan: 'Pada sebuah boxplot, kotaknya lebar sekali. Artinya…',
    pilihan: ['datanya banyak', 'ada banyak pencilan', 'rata-ratanya besar', 'setengah data yang di tengah tersebar di rentang yang luas', 'datanya sedikit'],
    benar: 3,
    langkah: [
      'Ingat bahwa kotak pada boxplot membentang dari Q₁ sampai Q₃, sehingga lebarnya adalah jangkauan antarkuartil (JAK = Q₃ − Q₁), dan di dalam kotak itu selalu berada 50 persen data yang di tengah.',
      'Kotak yang lebar berarti Q₁ dan Q₃ berjauhan: setengah data yang di tengah tersebar di rentang nilai yang luas.',
      'Lebar kotak tidak berkaitan dengan BANYAK data (kotak berisi 50 persen data berapa pun jumlahnya), tidak menunjukkan pencilan (pencilan digambar sebagai titik di luar pagar), dan tidak menyatakan besar rata-rata.',
      'Jadi, kotak yang lebar sekali berarti setengah data yang di tengah tersebar di rentang yang luas. (Jawaban D)',
    ],
    jebakan: 'Pilihan A dan E mengira ukuran kotak menunjukkan jumlah data; boxplot tidak memperlihatkan jumlah data sama sekali. Pilihan B keliru karena pencilan ditandai titik terpisah, bukan lebar kotak.',
    alasan: 'Lebar kotak = JAK = Q₃ − Q₁: sebaran 50% data tengah.',
  },
  {
    id: 'st-14',
    tingkat: 'sedang',
    pertanyaan: 'Sebuah grafik garis memperlihatkan lonjakan tajam. Ternyata sumbu-y dimulai dari 410, bukan dari 0. Kesimpulan yang sebaiknya diambil adalah…',
    gambar: { jenis: 'garis-data', kategori: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'], nilai: [412, 418, 425, 421, 430], satuan: 'orang', mulai: 410 },
    pilihan: ['kenaikannya nyata, tetapi terlihat jauh lebih besar daripada sebenarnya', 'grafiknya salah dan angkanya palsu', 'kenaikannya memang besar', 'grafik seperti itu selalu curang', 'sumbu-y memang tidak pernah dimulai dari nol'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa angkanya tetap benar: dari 412 ke 430 memang naik 18 orang. Yang berubah hanyalah KESAN yang ditimbulkan gambarnya.',
      {
        teks: 'Bandingkan dengan grafik yang sumbu tegaknya dimulai dari 0: kenaikan 18 dari 412 hanya sekitar 4 persen, sehingga garisnya nyaris datar, seperti gambar berikut.',
        gambar: { jenis: 'garis-data', kategori: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'], nilai: [412, 418, 425, 421, 430], satuan: 'orang', mulai: 0 },
      },
      'Memotong sumbu-y di 410 membuat selisih 20 orang memenuhi seluruh tinggi gambar, sehingga perubahan kecil tampak seperti lonjakan. Sumbu yang dipotong boleh dipakai untuk memperlihatkan perubahan kecil, tetapi pembaca harus memperhatikan angka sumbunya.',
      'Jadi, kenaikannya nyata, tetapi terlihat jauh lebih besar daripada sebenarnya. (Jawaban A)',
    ],
    jebakan: 'Pilihan B dan D terlalu jauh: angkanya tidak palsu dan memotong sumbu tidak selalu curang, hanya perlu dibaca dengan hati-hati. Pilihan C tertipu oleh kesan gambar tanpa membaca skala sumbunya.',
    alasan: 'Angkanya benar (naik 18 dari 412, sekitar 4%), tetapi sumbu yang dipotong membesarkan kesannya.',
  },
  {
    id: 'st-15',
    tingkat: 'sedang',
    pertanyaan: 'Dari data yang sama persis dapat lahir dua histogram yang bentuknya berbeda. Penyebabnya adalah…',
    pilihan: ['salah satunya pasti salah hitung', 'lebar kelasnya dipilih berbeda', 'datanya diurutkan berbeda', 'satunya memakai frekuensi relatif', 'itu tidak mungkin terjadi'],
    benar: 1,
    langkah: [
      'Ingat bahwa histogram dibuat dengan mengelompokkan data ke dalam kelas-kelas, dan lebar kelas adalah PILIHAN pembuatnya.',
      {
        teks: 'Ambil contoh data 1, 2, 3, 8, 9, 10: dengan lebar kelas 5 (kelas 1 − 5 dan 6 − 10) diperoleh dua batang sama tinggi, sedangkan dengan lebar kelas 3 (1 − 3, 4 − 6, 7 − 9, 10 − 12) diperoleh batang tinggi, kosong, tinggi, rendah; bentuknya berbeda padahal datanya sama, seperti tabel berikut.',
        gambar: { jenis: 'tabel', kepala: ['Lebar kelas 5', 'f', 'Lebar kelas 3', 'f'], baris: [['1 − 5', '3', '1 − 3', '3'], ['6 − 10', '3', '4 − 6', '0'], ['', '', '7 − 9', '2'], ['', '', '10 − 12', '1']] },
      },
      'Mengurutkan data tidak mengubah histogram (histogram memang menghitung per kelas), dan memakai frekuensi relatif hanya mengubah skala tinggi batang, bukan bentuknya.',
      'Jadi, dua histogram dari data yang sama dapat berbeda bentuk karena lebar kelasnya dipilih berbeda. (Jawaban B)',
    ],
    jebakan: 'Pilihan D menggoda karena frekuensi relatif memang mengubah angka sumbu tegak, tetapi perbandingan tinggi antar batang tetap sama sehingga bentuknya tidak berubah. Pilihan A dan E mengira histogram tunggal untuk satu data.',
    alasan: 'Lebar kelas adalah pilihan; kelas berbeda memberi bentuk berbeda.',
  },
  {
    id: 'st-16',
    tingkat: 'sedang',
    pertanyaan: 'Diagram pencar menunjukkan titik-titik yang naik dari kiri bawah ke kanan atas dan menempel rapat pada satu garis. Cara membacanya adalah…',
    gambar: { jenis: 'grafik', fungsi: [], jangkauan: [0, 10, 40, 100], titik: [{ x: 2, y: 55 }, { x: 3, y: 58 }, { x: 4, y: 62 }, { x: 5, y: 65 }, { x: 6, y: 68 }, { x: 7, y: 72 }, { x: 8, y: 75 }, { x: 9, y: 78 }] },
    pilihan: ['arah naik, bentuk melengkung, hubungan lemah', 'arah turun, hubungan kuat', 'arah naik, bentuk mendekati lurus, hubungan kuat', 'tidak ada hubungan', 'yang satu pasti menyebabkan yang lain'],
    benar: 2,
    langkah: [
      'Diagram pencar dibaca dari tiga hal: ARAH (naik atau turun), BENTUK (lurus atau melengkung), dan KEKUATAN (seberapa rapat titik-titik pada polanya).',
      {
        teks: 'Titik-titik naik dari kiri bawah ke kanan atas, sehingga arahnya positif; letaknya hampir segaris, sehingga bentuknya mendekati lurus; dan menempel rapat pada garis itu, sehingga hubungannya kuat, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['48.5 + 3.3*x'], jangkauan: [0, 10, 40, 100], titik: [{ x: 2, y: 55 }, { x: 3, y: 58 }, { x: 4, y: 62 }, { x: 5, y: 65 }, { x: 6, y: 68 }, { x: 7, y: 72 }, { x: 8, y: 75 }, { x: 9, y: 78 }], nama: ['garis tren, titik menempel rapat'] },
      },
      'Kerapatan titik pada garis menunjukkan kekuatan hubungan, bukan sebab-akibat; diagram pencar tidak pernah membuktikan bahwa yang satu menyebabkan yang lain.',
      'Jadi, bacaannya: arah naik, bentuk mendekati lurus, hubungan kuat. (Jawaban C)',
    ],
    jebakan: 'Pilihan E menggoda karena hubungan kuat terasa seperti sebab-akibat, padahal korelasi hanya menyatakan kebersamaan pola. Pilihan A keliru pada dua hal: bentuknya lurus dan hubungannya kuat karena titik-titiknya rapat.',
    alasan: 'Naik, hampir segaris, rapat: positif, linear, kuat.',
  },
  {
    // cek: (20*70 + 30*80)/50 === 76
    id: 'st-40',
    tingkat: 'sedang',
    pertanyaan: 'Kelas A (20 siswa) mempunyai rata-rata 70 dan kelas B (30 siswa) rata-rata 80. Rata-rata gabungan kedua kelas adalah…',
    pilihan: ['75', '74', '77', '78', '76'],
    benar: 4,
    langkah: [
      'Ingat bahwa jumlah nilai sama dengan rata-rata dikali banyak siswa. Jumlah nilai kelas A adalah 20 × 70 = 1.400 dan kelas B adalah 30 × 80 = 2.400.',
      'Rata-rata gabungan adalah jumlah seluruh nilai dibagi seluruh siswa: x̄ = (1.400 + 2.400)/(20 + 30) = 3.800/50 = 76.',
      'Hasilnya lebih dekat ke 80 daripada ke 70 karena kelas B lebih banyak siswanya (rata-rata tertimbang).',
      'Jadi, rata-rata gabungan kedua kelas adalah 76. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 75, merata-ratakan 70 dan 80 begitu saja, mengabaikan bahwa banyak siswanya berbeda. Pilihan C, 77, dan E, 78, menebak "lebih dekat ke 80" tanpa menghitung.',
    alasan: '(20·70 + 30·80)/50 = 76.',
  },
  {
    // cek: 9*5 - (5 + 8 + 10 + 12) === 10
    id: 'st-41',
    tingkat: 'sedang',
    pertanyaan: 'Data 5, 8, x, 10, 12 mempunyai rata-rata 9. Nilai x adalah…',
    pilihan: ['9', '11', '8', '35', '10'],
    benar: 4,
    langkah: [
      'Karena rata-rata lima data adalah 9, jumlah seluruh data adalah 5 × 9 = 45.',
      'Jumlah data yang diketahui: 5 + 8 + 10 + 12 = 35, sehingga x = 45 − 35 = 10.',
      'Sebagai pemeriksaan, (5 + 8 + 10 + 10 + 12)/5 = 45/5 = 9, sesuai.',
      'Jadi, nilai x adalah 10. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 9, mengira x harus sama dengan rata-ratanya. Pilihan D, 35, berhenti pada jumlah data yang diketahui. Pilihan B, 11, salah menjumlahkan 5 + 8 + 10 + 12 sebagai 34.',
    alasan: 'Jumlah harus 45; 45 − 35 = 10.',
  },
  {
    id: 'st-42',
    tingkat: 'sedang',
    pertanyaan: 'Histogram nilai 40 siswa: 40 − 49 (3 siswa), 50 − 59 (8), 60 − 69 (12), 70 − 79 (9), 80 − 89 (6), 90 − 99 (2). Kelas modusnya adalah…',
    gambar: { jenis: 'batang', kategori: ['40-49', '50-59', '60-69', '70-79', '80-89', '90-99'], nilai: [3, 8, 12, 9, 6, 2], satuan: 'siswa' },
    pilihan: ['70 − 79', '50 − 59', '90 − 99', '60 − 69', '40 − 49'],
    benar: 3,
    langkah: [
      'Kelas modus pada data berkelompok adalah kelas dengan frekuensi tertinggi, yaitu batang paling tinggi pada histogram.',
      {
        teks: 'Ubah histogram menjadi tabel dan cari frekuensi terbesar: 12 pada kelas 60 − 69, seperti tabel berikut.',
        gambar: { jenis: 'tabel', ...TABEL40, sorot: [2] },
      },
      'Jadi, kelas modusnya adalah 60 − 69. (Jawaban D)',
    ],
    jebakan: 'Pilihan C, 90 − 99, mengira modus adalah kelas dengan nilai tertinggi, padahal modus soal frekuensi. Pilihan A, 70 − 79, batang tertinggi kedua (9), tertukar bila membaca histogram sekilas.',
    alasan: 'Frekuensi tertinggi 12 ada di kelas 60 − 69.',
  },
  {
    // cek: Math.abs(Math.sqrt((4+1+0+1+4)/5) - 1.41) < 0.01
    id: 'st-43',
    tingkat: 'sedang',
    pertanyaan: 'Data 1, 2, 3, 4, 5. Simpangan bakunya (pembagi n) kira-kira…',
    pilihan: ['1,41', '2', '1', '2,5', '10'],
    benar: 0,
    langkah: [
      'Simpangan baku dihitung dengan s = √(Σ(x − x̄)²/n). Pertama, rata-ratanya x̄ = (1 + 2 + 3 + 4 + 5)/5 = 15/5 = 3.',
      {
        teks: 'Lengkapi tabel simpangan tiap data terhadap rata-rata dan kuadratnya.',
        gambar: { jenis: 'tabel', kepala: ['x', 'x − x̄', '(x − x̄)²'], baris: [['1', '−2', '4'], ['2', '−1', '1'], ['3', '0', '0'], ['4', '1', '1'], ['5', '2', '4']], kolomBaru: [1, 2], jumlah: ['Jumlah', '0', '10'] },
      },
      'Diperoleh Σ(x − x̄)² = 10, sehingga ragam = 10/5 = 2 dan simpangan baku s = √2 ≈ 1,41.',
      'Jadi, simpangan bakunya kira-kira 1,41. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 2, adalah RAGAM (variansi), belum ditarik akarnya. Pilihan E, 10, berhenti pada jumlah kuadrat simpangan. Pilihan C, 1, mengambil simpangan rata-rata seolah selalu 1.',
    alasan: 'Σ(x − x̄)² = 10, ragam 2, s = √2 ≈ 1,41.',
  },
  {
    // cek: 40 * 90/360 === 10
    id: 'st-44',
    tingkat: 'sedang',
    pertanyaan: 'Diagram lingkaran jajanan 40 siswa: sektor "bakso" bersudut 90°. Banyak siswa yang memilih bakso adalah…',
    pilihan: ['90', '4', '10', '20', '25'],
    benar: 2,
    langkah: [
      'Pada diagram lingkaran, besar sudut tiap sektor sebanding dengan bagiannya terhadap keseluruhan; satu lingkaran penuh 360° mewakili seluruh 40 siswa.',
      'Bagian sektor bakso adalah 90°/360° = 1/4 dari keseluruhan.',
      'Untuk itu, banyak siswa yang memilih bakso adalah (90/360) × 40 = (1/4) × 40 = 10 siswa.',
      'Jadi, banyak siswa yang memilih bakso adalah 10. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 90, menyalin besar sudut sebagai banyak siswa. Pilihan E, 25, mengira 90° berarti 25 orang karena 25 persen; 25 persen dari 40 adalah 10, bukan 25. Pilihan B, 4, membagi 40 dengan 10.',
    alasan: '90/360 = 1/4; (1/4)(40) = 10.',
  },
  {
    // cek: (430 - 421) > (425 - 418) && (430 - 421) > (418 - 412)
    id: 'st-45',
    tingkat: 'sedang',
    pertanyaan: 'Diagram garis pengunjung: Jan 412, Feb 418, Mar 425, Apr 421, Mei 430. Kenaikan terbesar terjadi antara…',
    gambar: { jenis: 'garis-data', kategori: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'], nilai: [412, 418, 425, 421, 430], satuan: 'orang' },
    pilihan: ['Feb ke Mar', 'Jan ke Feb', 'Mar ke Apr', 'Jan ke Mei', 'Apr ke Mei'],
    benar: 4,
    langkah: [
      'Kenaikan antara dua bulan berurutan adalah selisih nilainya, yaitu kemiringan ruas garis di antara keduanya; ruas yang paling curam ke atas menunjukkan kenaikan terbesar.',
      {
        teks: 'Lengkapi tabel dengan kolom perubahan tiap bulan.',
        gambar: { jenis: 'tabel', kepala: ['Selang', 'Perubahan'], baris: [['Jan ke Feb', '418 − 412 = +6'], ['Feb ke Mar', '425 − 418 = +7'], ['Mar ke Apr', '421 − 425 = −4'], ['Apr ke Mei', '430 − 421 = +9']], kolomBaru: [1], sorot: [3] },
      },
      'Tampak bahwa perubahan terbesar adalah +9, dari April ke Mei.',
      'Jadi, kenaikan terbesar terjadi antara Apr ke Mei. (Jawaban E)',
    ],
    jebakan: 'Pilihan D, Jan ke Mei, memang selisihnya paling besar (18), tetapi itu perubahan sepanjang empat bulan, bukan antara dua bulan berurutan. Pilihan A, Feb ke Mar (+7), terbesar kedua dan mudah tertukar bila dibaca dari gambar saja.',
    alasan: 'Perubahan: +6, +7, −4, +9; terbesar Apr ke Mei.',
  },
  {
    // cek: Math.abs(5 + 0.3*(6 - 5) - 5.3) < 1e-9
    id: 'st-64',
    tingkat: 'sedang',
    pertanyaan: 'Data terurut: 3, 4, 5, 6, 7, 8, 9, 10, 11, 12. Desil ke-3 (D₃) data itu adalah…',
    pilihan: ['5', '5,3', '6', '3,3', '5,5'],
    benar: 1,
    langkah: [
      'Desil membagi data terurut menjadi sepuluh bagian sama banyak. Letak desil ke-i pada n data dinyatakan oleh datum ke-i(n + 1)/10.',
      'Dengan n = 10 dan i = 3, letak D₃ adalah datum ke-3(11)/10 = ke-3,3, yaitu di antara datum ke-3 dan datum ke-4, sejauh 0,3 bagian dari datum ke-3.',
      'Datum ke-3 adalah 5 dan datum ke-4 adalah 6, sehingga D₃ = x₃ + 0,3(x₄ − x₃) = 5 + 0,3(6 − 5) = 5 + 0,3 = 5,3.',
      'Jadi, desil ke-3 data tersebut adalah 5,3. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 5, membulatkan letak 3,3 ke datum ke-3 tanpa interpolasi. Pilihan C, 6, membulatkannya ke atas. Pilihan D, 3,3, menyalin LETAK desil sebagai nilainya.',
    alasan: 'Letak datum ke-3,3: D₃ = 5 + 0,3(6 − 5) = 5,3.',
  },
  // ================================================================ SULIT
  {
    // cek: Math.abs(Math.sqrt(40/5) - 2.83) < 0.01
    id: 'st-17',
    tingkat: 'sulit',
    pertanyaan: 'Data: 2, 4, 6, 8, 10. Simpangan bakunya (pembagi n, seperti pada buku SMA) kira-kira…',
    pilihan: ['2,4', '3,16', '8', '40', '2,83'],
    benar: 4,
    langkah: [
      'Simpangan baku dihitung dengan s = √(Σ(x − x̄)²/n). Pertama, rata-ratanya x̄ = (2 + 4 + 6 + 8 + 10)/5 = 30/5 = 6.',
      {
        teks: 'Lengkapi tabel simpangan tiap data terhadap rata-rata dan kuadratnya.',
        gambar: { jenis: 'tabel', kepala: ['x', 'x − x̄', '(x − x̄)²'], baris: [['2', '−4', '16'], ['4', '−2', '4'], ['6', '0', '0'], ['8', '2', '4'], ['10', '4', '16']], kolomBaru: [1, 2], jumlah: ['Jumlah', '0', '40'] },
      },
      'Diperoleh Σ(x − x̄)² = 40, sehingga ragam = 40/5 = 8 dan simpangan baku s = √8 = 2√2 ≈ 2,83.',
      'Jadi, simpangan bakunya kira-kira 2,83. (Jawaban E)',
    ],
    jebakan: 'Pilihan C, 8, adalah RAGAM, belum ditarik akarnya. Pilihan D, 40, berhenti pada jumlah kuadrat simpangan. Pilihan B, 3,16, memakai pembagi n − 1 = 4 (√10), versi sampel yang tidak diminta soal. Pilihan A, 2,4, adalah simpangan rata-rata (Σ|x − x̄|/n = 12/5).',
    alasan: 'Σ(x − x̄)² = 40, ragam 8, s = √8 ≈ 2,83.',
  },
  {
    // cek: 59.5 + ((20 - 11)/12)*10 === 67
    id: 'st-18',
    tingkat: 'sulit',
    pertanyaan: 'Tabel nilai 40 siswa: 40 − 49 ada 3 siswa, 50 − 59 ada 8, 60 − 69 ada 12, 70 − 79 ada 9, 80 − 89 ada 6, 90 − 99 ada 2. Median data itu adalah…',
    gambar: { jenis: 'tabel', ...TABEL40 },
    pilihan: ['64,5', '67', '65,21', '67,75', '69,5'],
    benar: 1,
    langkah: [
      {
        teks: 'Lengkapi tabel di atas dengan menambahkan kolom frekuensi kumulatif.',
        gambar: { jenis: 'tabel', kepala: ['Nilai', 'f', 'F kumulatif'], baris: [['40 − 49', '3', '3'], ['50 − 59', '8', '11'], ['60 − 69', '12', '23'], ['70 − 79', '9', '32'], ['80 − 89', '6', '38'], ['90 − 99', '2', '40']], kolomBaru: [2], sorot: [2], jumlah: ['Jumlah', '40', ''] },
      },
      'Kelas median terletak di kelas yang memuat datum ke-n/2 = 40/2 = 20. Frekuensi kumulatif sampai kelas 50 − 59 baru 11, dan sampai kelas 60 − 69 sudah 23, sehingga datum ke-20 berada di kelas 60 − 69.',
      'Tepi bawah kelas median L₀ = 60 − 0,5 = 59,5. Lebar kelas c = 10. Frekuensi kumulatif sebelum kelas median ΣF_k = 11. Frekuensi kelas median f_m = 12.',
      'Untuk itu, Me = L₀ + c((n/2 − ΣF_k)/f_m) = 59,5 + 10((20 − 11)/12) = 59,5 + 10(9/12) = 59,5 + 7,5 = 67.',
      'Jadi, median data tersebut adalah 67. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 64,5, adalah titik tengah kelas median, bukan mediannya. Pilihan C, 65,21, adalah MODUS data berkelompok ini. Pilihan D, 67,75, adalah MEAN data berkelompoknya. Pilihan E, 69,5, adalah tepi atas kelas median.',
    alasan: 'Kelas median 60 − 69: Me = 59,5 + 10(9/12) = 67.',
  },
  {
    // cek: Math.abs(59.5 + (4/7)*10 - 65.21) < 0.01
    id: 'st-19',
    tingkat: 'sulit',
    pertanyaan: 'Dari tabel nilai 40 siswa yang sama (40 − 49: 3, 50 − 59: 8, 60 − 69: 12, 70 − 79: 9, 80 − 89: 6, 90 − 99: 2), modus data berkelompoknya adalah…',
    gambar: { jenis: 'tabel', ...TABEL40 },
    pilihan: ['59,5', '64,5', '65,21', '67', '69,5'],
    benar: 2,
    langkah: [
      {
        teks: 'Dari tabel distribusi, kelas modusnya adalah kelas 60 − 69 karena frekuensinya tertinggi (12). Kelas sebelumnya berfrekuensi 8 dan kelas sesudahnya 9.',
        gambar: { jenis: 'tabel', ...TABEL40, sorot: [2] },
      },
      'Tepi bawah kelas modus L₀ = 60 − 0,5 = 59,5. Lebar kelas c = 10. Selisih frekuensi kelas modus dengan kelas sebelumnya d₁ = 12 − 8 = 4. Selisih frekuensi kelas modus dengan kelas sesudahnya d₂ = 12 − 9 = 3.',
      'Untuk itu, Mo = L₀ + c(d₁/(d₁ + d₂)) = 59,5 + 10(4/(4 + 3)) = 59,5 + 10(4/7) = 59,5 + 5,71 = 65,21.',
      'Nilai ini masuk akal: modus condong ke arah tetangga yang frekuensinya lebih tinggi (kelas 70 − 79 dengan 9 lebih tinggi dari 50 − 59 dengan 8), sehingga sedikit di atas titik tengah 64,5.',
      'Jadi, modus data tersebut adalah 65,21. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, 64,5, mengambil titik tengah kelas modus tanpa memperhitungkan tetangganya. Pilihan D, 67, adalah MEDIAN data ini. Pilihan A, 59,5, hanya tepi bawah kelas modus.',
    alasan: 'Kelas modus 60 − 69: Mo = 59,5 + 10(4/7) ≈ 65,21.',
  },
  {
    id: 'st-20',
    tingkat: 'sulit',
    pertanyaan: 'Setiap nilai pada data 2, 4, 6, 8, 10 ditambah 5 sehingga menjadi 7, 9, 11, 13, 15. Ukuran yang TIDAK berubah adalah…',
    pilihan: ['mean', 'simpangan baku', 'median', 'modus', 'semuanya berubah'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa menambah setiap nilai dengan 5 berarti menggeser seluruh data ke kanan sejauh 5 tanpa mengubah jarak antar data.',
      {
        teks: 'Bandingkan ukuran-ukurannya: mean naik dari 6 menjadi 11, median naik dari 6 menjadi 11, sedangkan simpangan tiap data terhadap rata-ratanya tetap (−4, −2, 0, 2, 4), sehingga simpangan bakunya tetap √8 ≈ 2,83, seperti tabel berikut.',
        gambar: { jenis: 'tabel', kepala: ['Ukuran', 'Data lama', 'Data baru'], baris: [['mean', '6', '11'], ['median', '6', '11'], ['jangkauan', '8', '8'], ['simpangan baku', '2,83', '2,83']], sorot: [3] },
      },
      'Ukuran pemusatan (mean, median) ikut bergeser 5, sedangkan ukuran sebaran (jangkauan, simpangan baku) tidak berubah karena hanya bergantung pada jarak antar data. (Modus tidak ada pada data ini karena semua nilai muncul sekali.)',
      'Jadi, ukuran yang tidak berubah adalah simpangan baku. (Jawaban B)',
    ],
    jebakan: 'Pilihan A dan C keliru karena pemusatan ikut bergeser bersama datanya. Pilihan E melupakan bahwa sebaran hanya bergantung pada jarak antar data, yang tidak berubah oleh pergeseran.',
    alasan: 'Menambah konstanta menggeser pemusatan, tetapi sebaran (simpangan baku) tetap.',
  },
  {
    // cek: Math.abs(3 * 2.83 - 8.49) < 0.01
    id: 'st-21',
    tingkat: 'sulit',
    pertanyaan: 'Setiap nilai pada data 2, 4, 6, 8, 10 dikali 3 sehingga menjadi 6, 12, 18, 24, 30. Simpangan bakunya…',
    pilihan: ['tetap 2,83', 'bertambah 3 menjadi 5,83', 'menjadi 9 kali lipat', 'menjadi 3 kali lipat, yaitu 8,49', 'tidak bisa ditentukan'],
    benar: 3,
    langkah: [
      'Perhatikan bahwa mengalikan setiap nilai dengan 3 juga mengalikan rata-ratanya dengan 3 (dari 6 menjadi 18), sehingga setiap simpangan x − x̄ ikut menjadi 3 kali lipat: dari −4, −2, 0, 2, 4 menjadi −12, −6, 0, 6, 12.',
      'Kuadrat simpangannya menjadi 9 kali lipat (Σ(x − x̄)² dari 40 menjadi 360), sehingga ragamnya 9 kali lipat, dari 8 menjadi 72.',
      'Simpangan baku adalah akar ragam, sehingga menjadi √72 = 3√8 = 3 × 2,83 ≈ 8,49; tepat 3 kali lipat, sesuai faktor pengalinya.',
      'Jadi, simpangan bakunya menjadi 3 kali lipat, yaitu 8,49. (Jawaban D)',
    ],
    jebakan: 'Pilihan C, 9 kali lipat, adalah perubahan RAGAM (kuadrat simpangan baku), bukan simpangan bakunya. Pilihan B, bertambah 3, mencampur perkalian dengan penambahan; menambah konstanta tidak mengubah simpangan baku, mengalikan yang mengubahnya.',
    alasan: 'Simpangan tiap data dikali 3, ragam dikali 9, simpangan baku dikali 3.',
  },
  {
    // cek: Math.abs(49.2 + 3.2*7 - 71.6) < 1e-9
    id: 'st-22',
    tingkat: 'sulit',
    pertanyaan: 'Garis regresi sebuah data adalah ŷ = 49,2 + 3,2x, dengan x lama belajar dalam jam. Ramalan nilai untuk siswa yang belajar 7 jam adalah…',
    gambar: { jenis: 'grafik', fungsi: ['49.2 + 3.2*x'], jangkauan: [0, 12, 40, 90], nama: ['ŷ = 49,2 + 3,2x'] },
    pilihan: ['71,6', '52,4', '56,2', '347,6', '76,4'],
    benar: 0,
    langkah: [
      'Garis regresi ŷ = 49,2 + 3,2x dipakai untuk meramal nilai (ŷ) dari lama belajar (x) dengan mensubstitusikan x ke persamaannya.',
      'Substitusikan x = 7, diperoleh ŷ = 49,2 + 3,2(7) = 49,2 + 22,4 = 71,6.',
      {
        teks: 'Pada grafik, ramalan itu adalah ordinat titik pada garis regresi di x = 7, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['49.2 + 3.2*x'], jangkauan: [0, 12, 40, 90], titik: [{ x: 7, y: 71.6, label: '(7; 71,6)' }], tegak: [7], datar: [71.6], nama: ['ŷ = 49,2 + 3,2x'] },
      },
      'Jadi, ramalan nilai untuk siswa yang belajar 7 jam adalah 71,6. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 52,4, menjumlahkan 49,2 + 3,2 tanpa mengalikan dengan 7. Pilihan D, 347,6, mengalikan 49,2 dengan 7 lalu menambah 3,2 (urutan operasi terbalik). Pilihan E, 76,4, salah menghitung 3,2 × 7 sebagai 27,2.',
    alasan: 'ŷ(7) = 49,2 + 3,2(7) = 71,6.',
  },
  {
    id: 'st-23',
    tingkat: 'sulit',
    pertanyaan: 'Pada garis regresi ŷ = 49,2 + 3,2x (x lama belajar dalam jam, ŷ nilai ujian), arti angka 3,2 dalam bahasa sehari-hari adalah…',
    pilihan: ['tiap tambahan satu jam belajar, nilai diramalkan naik sekitar 3,2 poin', 'nilai siswa yang tidak belajar sama sekali', 'rata-rata nilai seluruh siswa', 'banyak siswa yang diamati', 'kesalahan ramalan garis itu'],
    benar: 0,
    langkah: [
      'Pada persamaan garis ŷ = a + bx, angka a adalah perpotongan dengan sumbu tegak dan angka b adalah KEMIRINGAN (gradien): perubahan ŷ untuk setiap kenaikan x sebesar satu satuan.',
      'Di sini b = 3,2, sehingga setiap tambahan satu jam belajar diramalkan menaikkan nilai sebesar 3,2 poin. Sebagai pemeriksaan: ŷ(7) − ŷ(6) = 71,6 − 68,4 = 3,2.',
      'Angka 49,2 (a) adalah ramalan nilai untuk x = 0, yaitu siswa yang tidak belajar sama sekali.',
      'Jadi, angka 3,2 berarti tiap tambahan satu jam belajar, nilai diramalkan naik sekitar 3,2 poin. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, nilai siswa yang tidak belajar, adalah arti angka 49,2 (perpotongan), bukan 3,2. Pilihan E mengira koefisien adalah galat; galat ramalan diukur terpisah lewat sisaan.',
    alasan: 'b = 3,2 adalah gradien: kenaikan ŷ per satu jam belajar.',
  },
  {
    // cek: 25 + 1.5*(25 - 10) === 47.5 && 60 > 47.5 && 35 < 47.5
    id: 'st-24',
    tingkat: 'sulit',
    pertanyaan: 'Data waktu tempuh (menit): 5, 7, 8, 10, 10, 12, 15, 15, 18, 20, 22, 25, 30, 35, 60. Dengan Q₁ = 10 dan Q₃ = 25, nilai yang ditandai sebagai pencilan oleh pagar 1,5 × JAK adalah…',
    pilihan: ['hanya 60', 'tidak ada', 'hanya 5', '35 dan 60', '5 dan 60'],
    benar: 0,
    langkah: [
      'Pencilan menurut aturan pagar adalah data di luar pagar bawah Q₁ − 1,5 × JAK atau pagar atas Q₃ + 1,5 × JAK, dengan JAK = Q₃ − Q₁.',
      'Hitung JAK = 25 − 10 = 15, sehingga 1,5 × JAK = 22,5. Pagar bawah = 10 − 22,5 = −12,5 dan pagar atas = 25 + 22,5 = 47,5.',
      {
        teks: 'Periksa data terhadap kedua pagar: tidak ada data di bawah −12,5 (nilai terkecil 5 masih di dalam), dan di atas 47,5 hanya ada 60; nilai 35 masih di dalam pagar, seperti garis bilangan berikut.',
        gambar: { jenis: 'garis-bilangan', jangkauan: [-15, 65], titik: [{ x: -12.5, label: 'pagar −12,5', kosong: true }, { x: 10, label: 'Q₁' }, { x: 25, label: 'Q₃' }, { x: 47.5, label: 'pagar 47,5', kosong: true }, { x: 60, label: '60' }], selang: [{ dari: 10, sampai: 25, tanda: 'kotak (JAK = 15)', sorot: true }, { dari: 47.5, sampai: 65, tanda: 'pencilan' }] },
      },
      'Jadi, nilai yang ditandai sebagai pencilan hanya 60. (Jawaban A)',
    ],
    jebakan: 'Pilihan D, 35 dan 60, mengira nilai yang "terlihat besar" otomatis pencilan; 35 masih di bawah pagar atas 47,5. Pilihan E, 5 dan 60, mengira nilai terkecil selalu pencilan; pagar bawahnya −12,5 sehingga 5 tidak di luar.',
    alasan: 'JAK = 15, pagar atas 47,5: hanya 60 yang di luar.',
  },
  {
    // cek: Math.abs((44.5*3 + 54.5*8 + 64.5*12 + 74.5*9 + 84.5*6 + 94.5*2)/40 - 67.75) < 1e-9
    id: 'st-47',
    tingkat: 'sulit',
    pertanyaan: 'Dari tabel nilai 40 siswa (40 − 49: 3, 50 − 59: 8, 60 − 69: 12, 70 − 79: 9, 80 − 89: 6, 90 − 99: 2), mean data berkelompoknya adalah…',
    gambar: { jenis: 'tabel', ...TABEL40 },
    pilihan: ['67', '65,21', '67,75', '69,5', '70'],
    benar: 2,
    langkah: [
      'Alternatif I, rata-rata hitung: setiap kelas diwakili titik tengahnya x_i, yaitu setengah dari jumlah batas bawah dan batas atas, lalu x̄ = Σf_i x_i / Σf_i.',
      {
        teks: 'Lengkapi tabel dengan kolom titik tengah x_i dan hasil kali f_i x_i.',
        gambar: { jenis: 'tabel', kepala: ['Nilai', 'f_i', 'x_i', 'f_i x_i'], baris: [['40 − 49', '3', '44,5', '133,5'], ['50 − 59', '8', '54,5', '436'], ['60 − 69', '12', '64,5', '774'], ['70 − 79', '9', '74,5', '670,5'], ['80 − 89', '6', '84,5', '507'], ['90 − 99', '2', '94,5', '189']], kolomBaru: [2, 3], jumlah: ['Jumlah', '40', '', '2.710'] },
      },
      'Diperoleh Σf_i = 40 dan Σf_i x_i = 2.710, sehingga x̄ = 2.710/40 = 67,75.',
      {
        teks: 'Alternatif II, rata-rata sementara: pilih x_s = 64,5 (titik tengah kelas terbanyak), lalu hitung simpangan d_i = x_i − x_s dan f_i d_i.',
        gambar: { jenis: 'tabel', kepala: ['x_i', 'f_i', 'd_i = x_i − 64,5', 'f_i d_i'], baris: [['44,5', '3', '−20', '−60'], ['54,5', '8', '−10', '−80'], ['64,5', '12', '0', '0'], ['74,5', '9', '10', '90'], ['84,5', '6', '20', '120'], ['94,5', '2', '30', '60']], kolomBaru: [2, 3], jumlah: ['Jumlah', '40', '', '130'] },
      },
      'Diperoleh Σf_i d_i = 130, sehingga x̄ = x_s + Σf_i d_i/Σf_i = 64,5 + 130/40 = 64,5 + 3,25 = 67,75, sama dengan cara pertama.',
      'Jadi, mean data berkelompoknya adalah 67,75. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 67, adalah MEDIAN data ini dan pilihan B, 65,21, MODUSNYA; ketiga ukuran berbeda karena sebarannya tidak simetris. Pilihan D, 69,5, adalah rata-rata titik tengah tanpa ditimbang frekuensi.',
    alasan: 'Σf_i x_i = 2.710, dibagi 40 = 67,75 (juga lewat rata-rata sementara 64,5 + 130/40).',
  },
  {
    // cek: Math.abs(69.5 + ((32 - 23)/9)*10 - 79.5) < 1e-9
    id: 'st-65',
    tingkat: 'sulit',
    pertanyaan: 'Dari tabel nilai 40 siswa (40 − 49: 3, 50 − 59: 8, 60 − 69: 12, 70 − 79: 9, 80 − 89: 6, 90 − 99: 2), persentil ke-80 (P₈₀) data berkelompoknya adalah…',
    gambar: { jenis: 'tabel', ...TABEL40 },
    pilihan: ['74,5', '69,5', '79,5', '80', '77,5'],
    benar: 2,
    langkah: [
      'Persentil ke-i pada data berkelompok dihitung seperti median, dengan letak datum ke-(i/100)n: P_i = L₀ + c(((i/100)n − ΣF_k)/f_p).',
      {
        teks: 'Lengkapi tabel dengan kolom frekuensi kumulatif. Letak P₈₀ adalah datum ke-(80/100)(40) = ke-32.',
        gambar: { jenis: 'tabel', kepala: ['Nilai', 'f', 'F kumulatif'], baris: [['40 − 49', '3', '3'], ['50 − 59', '8', '11'], ['60 − 69', '12', '23'], ['70 − 79', '9', '32'], ['80 − 89', '6', '38'], ['90 − 99', '2', '40']], kolomBaru: [2], sorot: [3] },
      },
      'Frekuensi kumulatif sampai kelas 60 − 69 baru 23, dan sampai kelas 70 − 79 tepat 32, sehingga datum ke-32 adalah datum terakhir kelas 70 − 79; kelas P₈₀ adalah 70 − 79.',
      'Tepi bawah L₀ = 69,5. Lebar kelas c = 10. Frekuensi kumulatif sebelum kelas itu ΣF_k = 23. Frekuensi kelasnya f_p = 9.',
      'Untuk itu, P₈₀ = 69,5 + 10((32 − 23)/9) = 69,5 + 10(9/9) = 69,5 + 10 = 79,5, tepat di tepi atas kelas, sesuai dengan datum ke-32 yang merupakan datum terakhir kelas itu.',
      'Jadi, persentil ke-80 data tersebut adalah 79,5. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, 69,5, hanya tepi bawah kelas tanpa menambahkan bagian c((32 − 23)/9). Pilihan A, 74,5, mengambil titik tengah kelas. Pilihan D, 80, membulatkan atau memakai batas atas 79 + 1 secara keliru.',
    alasan: 'Datum ke-32 di kelas 70 − 79: P₈₀ = 69,5 + 10(9/9) = 79,5.',
  },
  {
    id: 'st-49',
    tingkat: 'sulit',
    pertanyaan: 'Diagram pencar jumlah jam bermain gim (x) dan nilai ujian (y): titik-titik turun dari kiri atas ke kanan bawah dan cukup rapat. Kesimpulan yang tepat adalah…',
    gambar: { jenis: 'grafik', fungsi: [], jangkauan: [0, 8, 30, 100], titik: [{ x: 1, y: 90 }, { x: 2, y: 82 }, { x: 3, y: 78 }, { x: 4, y: 70 }, { x: 5, y: 66 }, { x: 6, y: 58 }, { x: 7, y: 52 }] },
    pilihan: ['korelasi positif kuat', 'korelasi negatif kuat: makin lama bermain, nilai cenderung makin rendah', 'tidak ada korelasi', 'bermain gim pasti menyebabkan nilai turun', 'korelasi negatif lemah'],
    benar: 1,
    langkah: [
      'Baca diagram pencar dari arah, bentuk, dan kekuatannya. Titik-titik turun dari kiri atas ke kanan bawah, sehingga arahnya NEGATIF: ketika x bertambah, y cenderung berkurang.',
      {
        teks: 'Titik-titik menempel cukup rapat pada satu garis turun, sehingga hubungannya KUAT, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['96 - 6.3*x'], jangkauan: [0, 8, 30, 100], titik: [{ x: 1, y: 90 }, { x: 2, y: 82 }, { x: 3, y: 78 }, { x: 4, y: 70 }, { x: 5, y: 66 }, { x: 6, y: 58 }, { x: 7, y: 52 }], nama: ['garis tren turun, titik rapat'] },
      },
      'Korelasi, sekuat apa pun, hanya menyatakan kebersamaan pola, bukan sebab-akibat; bisa saja siswa yang nilainya rendah karena hal lain lalu lebih banyak bermain, atau ada faktor ketiga.',
      'Jadi, kesimpulan yang tepat: korelasi negatif kuat, makin lama bermain, nilai cenderung makin rendah. (Jawaban B)',
    ],
    jebakan: 'Pilihan D mengubah korelasi menjadi sebab-akibat dengan kata "pasti"; data pengamatan tidak membuktikan itu. Pilihan E, negatif lemah, keliru karena titik-titiknya rapat, bukan berpencar.',
    alasan: 'Turun dan rapat: korelasi negatif kuat; bukan bukti sebab-akibat.',
  },
  {
    // cek: Math.abs(55 - 3.2*2 - 48.6) < 1e-9
    id: 'st-50',
    tingkat: 'sulit',
    pertanyaan: 'Garis regresi mempunyai kemiringan b = 3,2 dan melalui titik (2, 55). Nilai perpotongannya (a) adalah…',
    pilihan: ['61,4', '55', '48,6', '3,2', '27,5'],
    benar: 2,
    langkah: [
      'Garis regresi berbentuk ŷ = a + bx. Diketahui b = 3,2, sehingga ŷ = a + 3,2x, dan garis melalui (2, 55) berarti ŷ = 55 ketika x = 2.',
      'Substitusikan: 55 = a + 3,2(2) = a + 6,4, sehingga a = 55 − 6,4 = 48,6.',
      'Dengan demikian, persamaan garisnya ŷ = 48,6 + 3,2x; angka 48,6 adalah ramalan ŷ untuk x = 0.',
      'Jadi, nilai perpotongan a adalah 48,6. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 61,4, menambahkan 6,4 alih-alih mengurangkannya (55 + 6,4). Pilihan B, 55, menyalin ordinat titik seolah titik itu di sumbu tegak. Pilihan E, 27,5, membagi 55 dengan 2.',
    alasan: '55 = a + 3,2(2) memberi a = 48,6.',
  },
  {
    // cek: 30 + 1.5*(30 - 20) === 45 && 48 > 45
    id: 'st-51',
    tingkat: 'sulit',
    pertanyaan: 'Suatu data mempunyai Q₁ = 20 dan Q₃ = 30. Nilai yang termasuk pencilan menurut pagar 1,5 × JAK adalah…',
    pilihan: ['44', '40', '35', '5', '48'],
    benar: 4,
    langkah: [
      'Hitung jangkauan antarkuartil: JAK = Q₃ − Q₁ = 30 − 20 = 10, sehingga 1,5 × JAK = 15.',
      'Pagar bawah = Q₁ − 15 = 20 − 15 = 5 dan pagar atas = Q₃ + 15 = 30 + 15 = 45. Pencilan adalah data yang berada DI LUAR kedua pagar itu (lebih kecil dari 5 atau lebih besar dari 45).',
      {
        teks: 'Periksa tiap pilihan: 48 > 45 sehingga pencilan; 44, 40, dan 35 masih di bawah 45; dan 5 tepat pada pagar bawah, belum di luar, seperti garis bilangan berikut.',
        gambar: { jenis: 'garis-bilangan', jangkauan: [0, 55], titik: [{ x: 5, label: 'pagar 5', kosong: true }, { x: 20, label: 'Q₁' }, { x: 30, label: 'Q₃' }, { x: 45, label: 'pagar 45', kosong: true }, { x: 48, label: '48' }], selang: [{ dari: 20, sampai: 30, tanda: 'kotak', sorot: true }, { dari: 45, sampai: 55, tanda: 'pencilan' }] },
      },
      'Jadi, nilai yang termasuk pencilan adalah 48. (Jawaban E)',
    ],
    jebakan: 'Pilihan D, 5, menggoda karena tampak jauh dari Q₁, tetapi 5 tepat sama dengan pagar bawah sehingga tidak di luar pagar. Pilihan A, 44, dan C, 40, berada di antara Q₃ dan pagar atas, masih wajar.',
    alasan: 'JAK = 10, pagar 5 dan 45; hanya 48 yang di luar.',
  },
  {
    // cek: 9 + 6 + 2 === 17 && Math.abs(8/40 - 0.2) < 1e-9
    id: 'st-66',
    tingkat: 'sulit',
    pertanyaan: 'Dari tabel nilai 40 siswa (40 − 49: 3, 50 − 59: 8, 60 − 69: 12, 70 − 79: 9, 80 − 89: 6, 90 − 99: 2), perhatikan pernyataan berikut. (1) Banyak siswa yang nilainya paling sedikit 70 adalah 17. (2) Kelas modusnya 60 − 69. (3) Median terletak di kelas 70 − 79. (4) Frekuensi relatif kelas 50 − 59 adalah 20 persen. Pernyataan yang BENAR adalah…',
    gambar: { jenis: 'tabel', ...TABEL40 },
    pilihan: ['(1) dan (2)', '(2) dan (3)', 'semua benar', '(1), (2), dan (4)', '(3) dan (4)'],
    benar: 3,
    langkah: [
      {
        teks: 'Mari periksa kebenaran tiap pernyataan. Lengkapi dulu tabel dengan kolom frekuensi kumulatif.',
        gambar: { jenis: 'tabel', kepala: ['Nilai', 'f', 'F kumulatif'], baris: [['40 − 49', '3', '3'], ['50 − 59', '8', '11'], ['60 − 69', '12', '23'], ['70 − 79', '9', '32'], ['80 − 89', '6', '38'], ['90 − 99', '2', '40']], kolomBaru: [2] },
      },
      'Pernyataan (1): siswa dengan nilai paling sedikit 70 ada di kelas 70 − 79, 80 − 89, dan 90 − 99, yaitu 9 + 6 + 2 = 17. Benar.',
      'Pernyataan (2): frekuensi tertinggi adalah 12 pada kelas 60 − 69, sehingga kelas modusnya 60 − 69. Benar.',
      'Pernyataan (3): median adalah datum ke-40/2 = 20; frekuensi kumulatif sampai kelas 50 − 59 baru 11 dan sampai 60 − 69 sudah 23, sehingga median terletak di kelas 60 − 69, bukan 70 − 79. Salah.',
      'Pernyataan (4): frekuensi relatif kelas 50 − 59 adalah 8/40 = 0,2 = 20 persen. Benar.',
      'Jadi, pernyataan yang benar adalah (1), (2), dan (4). (Jawaban D)',
    ],
    jebakan: 'Pilihan C, semua benar, tertipu pernyataan (3) yang mengira kelas median adalah kelas setelah "setengah tabel" (kelas ke-4 dari 6); kelas median ditentukan oleh frekuensi kumulatif, bukan urutan kelas. Pilihan A melewatkan (4) karena mengira frekuensi relatif harus pecahan.',
    alasan: '(1) 17 benar, (2) 60 − 69 benar, (3) salah (median di 60 − 69), (4) 20% benar.',
  },
  {
    // cek: 3 + 8 + 12 === 23
    id: 'st-53',
    tingkat: 'sulit',
    pertanyaan: 'Dari tabel nilai 40 siswa (40 − 49: 3, 50 − 59: 8, 60 − 69: 12, 70 − 79: 9, 80 − 89: 6, 90 − 99: 2), banyak siswa yang nilainya kurang dari 70 adalah…',
    gambar: { jenis: 'tabel', ...TABEL40 },
    pilihan: ['20', '11', '23', '17', '32'],
    benar: 2,
    langkah: [
      'Nilai kurang dari 70 mencakup seluruh kelas 40 − 49, 50 − 59, dan 60 − 69, karena batas atas kelas 60 − 69 adalah 69, masih di bawah 70.',
      {
        teks: 'Jumlahkan frekuensi ketiga kelas itu, atau baca frekuensi kumulatif pada kelas 60 − 69, seperti tabel berikut.',
        gambar: { jenis: 'tabel', kepala: ['Nilai', 'f', 'F kumulatif'], baris: [['40 − 49', '3', '3'], ['50 − 59', '8', '11'], ['60 − 69', '12', '23'], ['70 − 79', '9', '32'], ['80 − 89', '6', '38'], ['90 − 99', '2', '40']], kolomBaru: [2], sorot: [0, 1, 2] },
      },
      'Diperoleh 3 + 8 + 12 = 23 siswa.',
      'Jadi, banyak siswa yang nilainya kurang dari 70 adalah 23. (Jawaban C)',
    ],
    jebakan: 'Pilihan E, 32, ikut menghitung kelas 70 − 79, padahal nilai 70 sampai 79 tidak kurang dari 70. Pilihan B, 11, berhenti di kelas 50 − 59. Pilihan D, 17, adalah banyak siswa yang nilainya 70 ke atas (kebalikannya).',
    alasan: 'Tiga kelas pertama: 3 + 8 + 12 = 23.',
  },
  // ========================================================= SANGAT SULIT
  {
    id: 'st-25',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sekumpulan data mempunyai koefisien korelasi r = 0. Pernyataan yang benar adalah…',
    gambar: { jenis: 'grafik', fungsi: [], jangkauan: [-3.5, 3.5, -1, 10], titik: [{ x: -3, y: 9 }, { x: -2, y: 4 }, { x: -1, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 4 }, { x: 3, y: 9 }] },
    pilihan: ['kedua peubah pasti tidak berhubungan sama sekali', 'datanya pasti salah kumpul', 'garis regresinya tidak ada', 'kedua peubah pasti berhubungan terbalik', 'tidak ada hubungan LURUS, tetapi bisa saja berhubungan melengkung'],
    benar: 4,
    langkah: [
      'Ingat bahwa koefisien korelasi r hanya mengukur kekuatan hubungan LINEAR (lurus) antara dua peubah; r = 0 berarti tidak ada kecenderungan lurus naik maupun turun.',
      {
        teks: 'Perhatikan contoh tandingan pada diagram pencar: titik-titik (−3, 9), (−2, 4), (−1, 1), (0, 0), (1, 1), (2, 4), (3, 9) terletak tepat pada parabola y = x², hubungannya sangat kuat, tetapi r = 0 karena setiap kenaikan di kiri diimbangi penurunan di kanan, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-3.5, 3.5, -1, 10], titik: [{ x: -3, y: 9 }, { x: -2, y: 4 }, { x: -1, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 4 }, { x: 3, y: 9 }], nama: ['y = x²: hubungan kuat, r = 0'] },
      },
      'Karena itu r = 0 tidak boleh dibaca sebagai "tidak berhubungan sama sekali"; yang tidak ada hanyalah hubungan lurusnya. Garis regresinya tetap dapat dihitung (mendatar), hanya tidak berguna.',
      'Jadi, pernyataan yang benar: tidak ada hubungan lurus, tetapi bisa saja berhubungan melengkung. (Jawaban E)',
    ],
    jebakan: 'Pilihan A adalah kekeliruan paling lazim: menyamakan "tidak berkorelasi" dengan "tidak berhubungan". Pilihan D menukar r = 0 dengan r negatif. Pilihan C keliru karena garis regresi selalu bisa dihitung selama datanya ada.',
    alasan: 'r mengukur hubungan lurus saja; y = x² berhubungan kuat tetapi r = 0.',
  },
  {
    id: 'st-26',
    tingkat: 'sangat sulit',
    pertanyaan: 'Penjualan es krim dan jumlah orang tenggelam ternyata naik bersamaan dengan korelasi kuat. Kesimpulan yang paling tepat adalah…',
    pilihan: ['es krim menyebabkan orang tenggelam', 'orang tenggelam menyebabkan penjualan es krim naik', 'korelasinya pasti salah hitung', 'ada faktor ketiga, misalnya cuaca panas, yang menaikkan keduanya', 'keduanya tidak berhubungan sama sekali'],
    benar: 3,
    langkah: [
      'Ingat bahwa korelasi kuat hanya menyatakan kedua besaran naik-turun bersamaan; ia tidak menyatakan yang satu menyebabkan yang lain.',
      'Cari penjelasan yang masuk akal: pada cuaca panas, lebih banyak orang membeli es krim DAN lebih banyak orang berenang, sehingga kejadian tenggelam pun bertambah. Cuaca panas adalah faktor ketiga (peubah pengganggu) yang menggerakkan keduanya.',
      'Dengan demikian, korelasinya benar (tidak salah hitung) dan keduanya memang berhubungan lewat faktor ketiga, tetapi tidak saling menyebabkan.',
      'Jadi, kesimpulan yang paling tepat: ada faktor ketiga, misalnya cuaca panas, yang menaikkan keduanya. (Jawaban D)',
    ],
    jebakan: 'Pilihan A dan B menarik sebab-akibat dari korelasi, padahal arah sebabnya tidak bisa dibaca dari data pengamatan. Pilihan E menyangkal korelasinya, padahal hubungannya nyata hanya tidak langsung.',
    alasan: 'Korelasi bukan sebab-akibat; faktor ketiga (cuaca panas) menjelaskan keduanya.',
  },
  {
    // cek: Math.abs(49.2 + 3.2*40 - 177.2) < 1e-9
    id: 'st-27',
    tingkat: 'sangat sulit',
    pertanyaan: 'Garis regresi ŷ = 49,2 + 3,2x dibuat dari data siswa yang belajar 2 sampai 11 jam. Garis itu dipakai untuk meramal siswa yang belajar 40 jam, hasilnya 177,2. Masalahnya adalah…',
    gambar: { jenis: 'grafik', fungsi: ['49.2 + 3.2*x'], jangkauan: [0, 42, 40, 190], titik: [{ x: 2, y: 55.6, label: 'data 2 sampai 11' }, { x: 11, y: 84.4 }, { x: 40, y: 177.2, label: '177,2?' }], tegak: [11] },
    pilihan: ['ekstrapolasi terlalu jauh, dan nilainya mustahil sebab maksimal 100', 'tidak ada masalah, rumusnya sudah benar', 'seharusnya memakai median', 'angka 40 kurang besar', 'garisnya harus dihitung ulang'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa garis regresi hanya dibangun dari data dengan x antara 2 dan 11 jam; di luar rentang itu tidak ada bukti bahwa polanya tetap lurus.',
      'Meramal untuk x = 40 berarti memperpanjang garis jauh ke luar rentang data (ekstrapolasi). Hitungannya ŷ = 49,2 + 3,2(40) = 177,2 memang mengikuti rumus, tetapi hasilnya mustahil karena nilai ujian paling tinggi 100.',
      {
        teks: 'Pada grafik, daerah data berakhir di x = 11; garis yang diteruskan ke x = 40 menembus batas nilai 100, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['49.2 + 3.2*x'], jangkauan: [0, 42, 40, 190], titik: [{ x: 11, y: 84.4, label: 'ujung data' }, { x: 40, y: 177.2, label: '177,2 mustahil' }], tegak: [11], datar: [100], arsir: [{ dari: 2, sampai: 11, label: 'rentang data' }] },
      },
      'Rumusnya tidak salah dan tidak perlu dihitung ulang; yang keliru adalah memakainya jauh di luar rentang data.',
      'Jadi, masalahnya adalah ekstrapolasi terlalu jauh, dan nilainya mustahil sebab maksimal 100. (Jawaban A)',
    ],
    jebakan: 'Pilihan B percaya rumus tanpa memeriksa kemasukakalan hasilnya. Pilihan E mengira garisnya salah, padahal garis itu tetap sah untuk 2 sampai 11 jam; yang salah pemakaiannya.',
    alasan: 'Ekstrapolasi ke x = 40 jauh di luar data 2 sampai 11; 177,2 melebihi nilai maksimum 100.',
  },
  {
    // cek: 3*20 - 5 === 55 && 3*12 === 36
    id: 'st-68',
    tingkat: 'sangat sulit',
    pertanyaan: 'Suatu data mempunyai mean 20 dan jangkauan 12. Setiap nilai dikali 3 lalu dikurangi 5. Mean dan jangkauan data baru berturut-turut adalah…',
    pilihan: ['55 dan 36', '55 dan 31', '60 dan 36', '55 dan 12', '65 dan 36'],
    benar: 0,
    langkah: [
      'Misalkan tiap nilai lama x diubah menjadi y = 3x − 5. Untuk mean: menjumlahkan semua y lalu membagi n memberi ȳ = 3x̄ − 5, karena setiap nilai dikali 3 dan dikurangi 5 yang sama.',
      'Untuk itu, mean baru = 3(20) − 5 = 60 − 5 = 55.',
      'Untuk jangkauan: nilai terbesar dan terkecil ikut berubah menjadi 3x_maks − 5 dan 3x_min − 5, sehingga selisihnya 3(x_maks − x_min) = 3 × jangkauan lama; pengurangan 5 hilang karena kedua ujung dikurangi sama besar.',
      'Untuk itu, jangkauan baru = 3(12) = 36.',
      'Sebagai pemeriksaan dengan data contoh 14, 20, 26 (mean 20, jangkauan 12): data barunya 37, 55, 73, dengan mean 55 dan jangkauan 36, sesuai.',
      'Jadi, mean dan jangkauan data baru berturut-turut adalah 55 dan 36. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 55 dan 31, mengurangkan 5 dari jangkauan juga, padahal pengurangan yang sama pada semua nilai tidak mengubah jarak antar data. Pilihan C, 60 dan 36, lupa mengurangkan 5 pada mean. Pilihan D lupa bahwa perkalian melebarkan sebaran.',
    alasan: 'Mean: 3(20) − 5 = 55; jangkauan: 3(12) = 36 (pengurangan tidak mengubah jangkauan).',
  },
  {
    // cek: 2*6 + 5 === 17 && Math.abs(2*2.83 - 5.66) < 1e-9
    id: 'st-29',
    tingkat: 'sangat sulit',
    pertanyaan: 'Data 2, 4, 6, 8, 10 mempunyai mean 6 dan simpangan baku 2,83. Setiap nilai dikali 2 lalu ditambah 5. Mean dan simpangan baku yang baru adalah…',
    pilihan: ['mean 12, simpangan baku 5,66', 'mean 17, simpangan baku 10,66', 'mean 17, simpangan baku 2,83', 'mean 17, simpangan baku 5,66', 'mean 12, simpangan baku 2,83'],
    benar: 3,
    langkah: [
      'Misalkan tiap nilai x diubah menjadi y = 2x + 5. Data barunya 9, 13, 17, 21, 25.',
      'Mean mengikuti perubahan yang sama: ȳ = 2x̄ + 5 = 2(6) + 5 = 17. (Pemeriksaan: (9 + 13 + 17 + 21 + 25)/5 = 85/5 = 17.)',
      'Simpangan baku hanya terpengaruh oleh PENGALI, tidak oleh penambahan: simpangan tiap data terhadap mean menjadi 2 kali lipat (dari −4, −2, 0, 2, 4 menjadi −8, −4, 0, 4, 8), sehingga s_baru = 2 × 2,83 = 5,66; penambahan 5 hanya menggeser semua data bersama-sama.',
      'Jadi, mean dan simpangan baku yang baru adalah 17 dan 5,66. (Jawaban D)',
    ],
    jebakan: 'Pilihan B, simpangan baku 10,66, ikut menambahkan 5 pada simpangan baku, padahal pergeseran tidak mengubah sebaran. Pilihan C, 2,83, lupa bahwa pengali 2 melebarkan sebaran. Pilihan A dan E lupa menambahkan 5 pada mean.',
    alasan: 'Mean: 2(6) + 5 = 17; simpangan baku: 2(2,83) = 5,66 (penambahan tidak berpengaruh).',
  },
  {
    // cek: (2*12 + 2*4)/4 === 8
    id: 'st-30',
    tingkat: 'sangat sulit',
    pertanyaan: 'Pada histogram, dua kelas bersebelahan digabung. Kelas 8 − 10 tingginya 12 dan kelas 10 − 12 tingginya 4. Tinggi kelas gabungan 8 − 12 adalah…',
    gambar: { jenis: 'batang', kategori: ['8-10', '10-12'], nilai: [12, 4], satuan: 'frekuensi per satuan' },
    pilihan: ['8', '4', '12', '16', '32'],
    benar: 0,
    langkah: [
      'Ingat bahwa pada histogram, yang mewakili banyak data adalah LUAS batang (lebar × tinggi), bukan tingginya saja. Ketika lebar kelas berubah, tingginya harus disesuaikan supaya luasnya tetap.',
      {
        teks: 'Lengkapi tabel luas tiap batang: kelas 8 − 10 lebar 2 dan tinggi 12, luasnya 24; kelas 10 − 12 lebar 2 dan tinggi 4, luasnya 8. Kelas gabungan 8 − 12 harus memuat kedua data itu, luasnya 24 + 8 = 32, dengan lebar 4.',
        gambar: { jenis: 'tabel', kepala: ['Kelas', 'Lebar', 'Tinggi', 'Luas'], baris: [['8 − 10', '2', '12', '24'], ['10 − 12', '2', '4', '8'], ['8 − 12 (gabungan)', '4', '?', '32']], kolomBaru: [3], sorot: [2] },
      },
      'Untuk itu, tinggi kelas gabungan = luas/lebar = 32/4 = 8.',
      {
        teks: 'Batang gabungan setinggi 8 selebar 4 mempunyai luas yang sama dengan kedua batang semula bersama-sama, seperti gambar berikut.',
        gambar: { jenis: 'batang', kategori: ['8-10', '10-12', '8-12 gabungan'], nilai: [12, 4, 8], satuan: 'frekuensi per satuan', sorot: [2] },
      },
      'Jadi, tinggi kelas gabungan 8 − 12 adalah 8. (Jawaban A)',
    ],
    jebakan: 'Pilihan D, 16, menjumlahkan tinggi 12 + 4 seolah tinggi mewakili banyak data, padahal lebarnya berubah dua kali lipat. Pilihan E, 32, adalah LUAS gabungan (banyak datanya), belum dibagi lebar 4.',
    alasan: 'Luas tetap: (24 + 8)/4 = 8.',
  },
  {
    id: 'st-31',
    tingkat: 'sangat sulit',
    pertanyaan: 'Mean dari tabel data berkelompok terhitung 67,75, sedangkan mean dari angka aslinya 68. Perbedaan itu terjadi karena…',
    pilihan: ['ada kesalahan hitung pada salah satunya', 'tabelnya memakai frekuensi relatif', 'banyak datanya berbeda', 'seharusnya keduanya selalu sama', 'tiap kelas diwakili titik tengahnya, jadi hasilnya hampiran'],
    benar: 4,
    langkah: [
      'Ingat bahwa ketika data dikelompokkan ke dalam kelas, nilai aslinya tidak lagi diketahui; yang tersisa hanya berapa banyak data di tiap kelas.',
      'Untuk menghitung mean dari tabel, setiap data dianggap sama dengan TITIK TENGAH kelasnya (misalnya semua data di kelas 60 − 69 dianggap 64,5), padahal nilai aslinya tersebar di dalam kelas itu.',
      'Karena itu mean dari tabel adalah hampiran; selisih kecil seperti 67,75 lawan 68 wajar dan bukan tanda kesalahan. Selisihnya mengecil bila lebar kelasnya diperkecil.',
      'Jadi, perbedaan itu terjadi karena tiap kelas diwakili titik tengahnya, sehingga hasilnya hampiran. (Jawaban E)',
    ],
    jebakan: 'Pilihan A menganggap dua cara yang berbeda harus memberi angka yang persis sama, padahal salah satunya memang taksiran. Pilihan D membalik kenyataan: keduanya hampir tidak pernah sama persis.',
    alasan: 'Tabel mengganti tiap data dengan titik tengah kelasnya: hasilnya hampiran.',
  },
  {
    id: 'st-32',
    tingkat: 'sangat sulit',
    pertanyaan: 'Pada data gaji, satu nilai ditarik makin jauh ke kanan. Mean ikut bergerak tetapi median berhenti. Median tidak bergerak karena…',
    pilihan: ['median hanya memakai posisi data, bukan nilainya', 'median selalu bilangan bulat', 'median dihitung sebelum data diurutkan', 'median mengabaikan data terbesar', 'datanya genap'],
    benar: 0,
    langkah: [
      'Ingat bahwa median adalah datum di POSISI tengah setelah data diurutkan; nilai datum lain hanya menentukan urutan, bukan ikut dijumlahkan.',
      {
        teks: 'Ambil contoh 4, 5, 6, 7, 8 (mean 6, median 6). Bila 8 ditarik menjadi 80, mean melonjak ke 20,4, tetapi urutannya tetap dan datum ke-3 tetap 6, seperti tabel berikut.',
        gambar: { jenis: 'tabel', kepala: ['Data', 'Mean', 'Median'], baris: [['4, 5, 6, 7, 8', '6', '6'], ['4, 5, 6, 7, 80', '20,4', '6'], ['4, 5, 6, 7, 800', '164,4', '6']], kolomBaru: [1, 2] },
      },
      'Selama nilai yang ditarik tetap berada di sisi kanan, ia tetap menempati posisi terakhir, sehingga posisi tengah dan nilainya tidak berubah; mean berubah karena setiap nilai ikut dijumlahkan.',
      'Jadi, median tidak bergerak karena median hanya memakai posisi data, bukan nilainya. (Jawaban A)',
    ],
    jebakan: 'Pilihan D, mengabaikan data terbesar, hampir benar tetapi keliru: median tidak "mengabaikan" apa pun, ia tetap memperhitungkan posisi data terbesar; hanya besarnya nilai yang tidak berpengaruh. Pilihan C terbalik: median justru memerlukan pengurutan.',
    alasan: 'Median bergantung posisi tengah; nilai ekstrem hanya mengubah urutan ujung.',
  },
  {
    // cek: (80*60 - 78*61)/2 === 21
    id: 'st-54',
    tingkat: 'sangat sulit',
    pertanyaan: 'Rata-rata nilai 80 peserta adalah 60. Dua peserta didiskualifikasi, dan rata-rata 78 peserta sisanya menjadi 61. Rata-rata nilai dua peserta yang didiskualifikasi itu adalah…',
    pilihan: ['22', '23', '20', '21', '41'],
    benar: 3,
    langkah: [
      'Ingat bahwa jumlah nilai dihitung dengan mengalikan banyak peserta dan rata-ratanya. Jumlah nilai 80 peserta adalah 80 × 60 = 4.800.',
      'Jumlah nilai 78 peserta sisanya adalah 78 × 61 = 4.758.',
      'Dengan demikian, jumlah nilai dua peserta yang didiskualifikasi adalah 4.800 − 4.758 = 42, sehingga rata-ratanya 42/2 = 21.',
      'Hasil ini masuk akal: karena rata-rata sisanya NAIK setelah keduanya dikeluarkan, nilai keduanya pasti jauh di bawah rata-rata semula.',
      'Jadi, rata-rata nilai dua peserta yang didiskualifikasi adalah 21. (Jawaban D)',
    ],
    jebakan: 'Pilihan E, 41, berhenti pada jumlah 42 lalu salah membagi, atau menghitung 60 − 19. Pilihan C, 20, dan B, 22, salah pada perkalian 78 × 61 = 4.758.',
    alasan: '(80·60 − 78·61)/2 = (4.800 − 4.758)/2 = 21.',
  },
  {
    // cek: [4, 10, 22].every(x => { const d = [1,7,5,2,5,x]; const m = d.reduce((a,b)=>a+b,0)/6; return d.includes(m) }) && 4 + 10 + 22 === 36
    id: 'st-55',
    tingkat: 'sangat sulit',
    pertanyaan: 'Data 1, 7, 5, 2, 5, x (x bilangan bulat positif) mempunyai rata-rata yang sama dengan salah satu nilai datanya. Jumlah semua nilai x yang mungkin adalah…',
    pilihan: ['26', '32', '10', '40', '36'],
    benar: 4,
    langkah: [
      'Jumlah lima data yang diketahui adalah 1 + 7 + 5 + 2 + 5 = 20, sehingga rata-rata keenam data adalah x̄ = (20 + x)/6.',
      'Rata-rata itu harus sama dengan salah satu nilai data, yaitu 1, 2, 5, 7, atau x sendiri. Periksa satu per satu: x̄ = 1 memberi x = −14 (bukan positif); x̄ = 2 memberi x = −8 (bukan positif); x̄ = 5 memberi 20 + x = 30, x = 10; x̄ = 7 memberi 20 + x = 42, x = 22.',
      'Kasus x̄ = x: (20 + x)/6 = x memberi 20 + x = 6x, sehingga 5x = 20 dan x = 4; rata-ratanya 4, sama dengan x sendiri yang memang anggota data.',
      {
        teks: 'Nilai x yang memenuhi adalah 4, 10, dan 22, seperti tabel berikut.',
        gambar: { jenis: 'tabel', kepala: ['x', 'Data', 'Rata-rata', 'Sama dengan data?'], baris: [['4', '1, 7, 5, 2, 5, 4', '24/6 = 4', 'ya (x sendiri)'], ['10', '1, 7, 5, 2, 5, 10', '30/6 = 5', 'ya (5)'], ['22', '1, 7, 5, 2, 5, 22', '42/6 = 7', 'ya (7)']], kolomBaru: [2, 3] },
      },
      'Dengan demikian, jumlah semua nilai x yang mungkin adalah 4 + 10 + 22 = 36.',
      'Jadi, jumlah semua nilai x yang mungkin adalah 36. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 32, melupakan kasus rata-rata sama dengan x sendiri (x = 4). Pilihan C, 10, hanya mengambil satu nilai. Pilihan D, 40, ikut menghitung x = 4 dua kali atau salah menjumlahkan.',
    alasan: 'x̄ = (20 + x)/6 ∈ {5, 7, x} memberi x = 10, 22, 4; jumlahnya 36.',
  },
  {
    // cek: 10*16 - 10*15 === 10 && 24 - 10 === 14
    id: 'st-56',
    tingkat: 'sangat sulit',
    pertanyaan: 'Rata-rata sepuluh bilangan adalah 15. Satu bilangan diganti dengan 24, dan rata-ratanya menjadi 16. Bilangan yang diganti itu adalah…',
    pilihan: ['15', '13', '10', '9', '14'],
    benar: 4,
    langkah: [
      'Jumlah sepuluh bilangan semula adalah 10 × 15 = 150, dan sesudah penggantian menjadi 10 × 16 = 160.',
      'Jumlahnya bertambah 160 − 150 = 10, dan pertambahan itu hanya berasal dari bilangan yang diganti: bilangan baru 24 lebih besar 10 daripada bilangan lama.',
      'Untuk itu, bilangan yang diganti adalah 24 − 10 = 14.',
      'Sebagai pemeriksaan, mengganti 14 dengan 24 menambah jumlah sebesar 10, sehingga rata-rata naik 10/10 = 1, dari 15 menjadi 16, sesuai.',
      'Jadi, bilangan yang diganti itu adalah 14. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 15, mengira bilangan yang diganti sama dengan rata-rata lama. Pilihan C, 10, menyalin pertambahan jumlah (10) sebagai bilangannya. Pilihan D, 9, menghitung 24 − 15.',
    alasan: 'Jumlah naik 10; bilangan lama = 24 − 10 = 14.',
  },
  {
    // cek: 5 + 7 + 8 + 10 + 10 === 40
    id: 'st-57',
    tingkat: 'sangat sulit',
    pertanyaan: 'Lima bilangan bulat positif mempunyai mean 8, median 8, dan modus tunggal 10. Nilai TERKECIL yang mungkin dari data itu adalah…',
    pilihan: ['1', '4', '5', '6', '7'],
    benar: 2,
    langkah: [
      'Misalkan kelima bilangan terurut a ≤ b ≤ c ≤ d ≤ e. Median 8 berarti c = 8, dan mean 8 berarti jumlahnya a + b + c + d + e = 5 × 8 = 40.',
      'Modus tunggal 10 berarti 10 muncul paling sering, dan karena 10 > c = 8, nilai 10 hanya bisa menempati d dan e: d = e = 10. (Kalau hanya satu 10, ia tidak menjadi modus.)',
      'Dengan demikian, a + b = 40 − 8 − 10 − 10 = 12, dengan a ≤ b < 8 dan a ≠ b (kalau a = b, akan ada dua modus, padahal modusnya tunggal).',
      'Supaya a sekecil mungkin, b harus sebesar mungkin: b maksimum 7 (harus kurang dari median 8, dan b = 8 membuat 8 muncul dua kali menyaingi modus), sehingga a = 12 − 7 = 5. Datanya 5, 7, 8, 10, 10: mean 40/5 = 8, median 8, modus tunggal 10.',
      'Jadi, nilai terkecil yang mungkin adalah 5. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 1, mengabaikan syarat jumlah 40: dengan a = 1 diperlukan b = 11 > median. Pilihan B, 4, memerlukan b = 8, yang membuat 8 muncul dua kali sehingga modusnya tidak tunggal lagi. Pilihan D, 6, memerlukan b = 6 = a, dua modus.',
    alasan: 'c = 8, d = e = 10, a + b = 12 dengan a < b ≤ 7: a = 5, b = 7.',
  },
  {
    // cek: 40*16 - 70 === 38*15
    id: 'st-67',
    tingkat: 'sangat sulit',
    pertanyaan: 'Rata-rata nilai suatu kelompok siswa adalah 40. Jika satu siswa yang nilainya 70 dikeluarkan, rata-rata siswa sisanya menjadi 38. Banyak siswa semula adalah…',
    pilihan: ['15', '17', '16', '14', '20'],
    benar: 2,
    langkah: [
      'Misalkan banyak siswa semula n. Karena rata-ratanya 40, jumlah nilai seluruhnya adalah 40n.',
      'Setelah siswa bernilai 70 dikeluarkan, banyak siswanya n − 1 dengan jumlah nilai 40n − 70, dan rata-ratanya 38, sehingga 40n − 70 = 38(n − 1).',
      'Selesaikan: 40n − 70 = 38n − 38, sehingga 2n = 32 dan n = 16.',
      'Sebagai pemeriksaan, 16 siswa berjumlah 640; tanpa nilai 70 tersisa 570 untuk 15 siswa, rata-ratanya 570/15 = 38, sesuai.',
      'Jadi, banyak siswa semula adalah 16. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 15, adalah banyak siswa SESUDAH satu dikeluarkan (n − 1). Pilihan B, 17, salah tanda saat memindahkan ruas (2n = 34). Pilihan E, 20, menebak dari 70 − 40 = 30 dibagi 2 tanpa persamaan.',
    alasan: '40n − 70 = 38(n − 1) memberi n = 16.',
  },
  {
    // cek: Math.abs(49.5 + ((10 - 3)/8)*10 - 58.25) < 1e-9
    id: 'st-59',
    tingkat: 'sangat sulit',
    pertanyaan: 'Dari tabel nilai 40 siswa (40 − 49: 3, 50 − 59: 8, 60 − 69: 12, 70 − 79: 9, 80 − 89: 6, 90 − 99: 2), kuartil bawah Q₁ data berkelompoknya adalah…',
    gambar: { jenis: 'tabel', ...TABEL40 },
    pilihan: ['54,5', '58,25', '59,5', '57,5', '52,5'],
    benar: 1,
    langkah: [
      'Kuartil bawah pada data berkelompok dihitung seperti median dengan letak datum ke-n/4: Q₁ = L₀ + c((n/4 − ΣF_k)/f_q).',
      {
        teks: 'Lengkapi tabel dengan kolom frekuensi kumulatif. Letak Q₁ adalah datum ke-40/4 = ke-10.',
        gambar: { jenis: 'tabel', kepala: ['Nilai', 'f', 'F kumulatif'], baris: [['40 − 49', '3', '3'], ['50 − 59', '8', '11'], ['60 − 69', '12', '23'], ['70 − 79', '9', '32'], ['80 − 89', '6', '38'], ['90 − 99', '2', '40']], kolomBaru: [2], sorot: [1] },
      },
      'Frekuensi kumulatif sampai kelas 40 − 49 baru 3, dan sampai kelas 50 − 59 sudah 11, sehingga datum ke-10 berada di kelas 50 − 59.',
      'Tepi bawah L₀ = 49,5. Lebar kelas c = 10. Frekuensi kumulatif sebelum kelas itu ΣF_k = 3. Frekuensi kelasnya f_q = 8.',
      'Untuk itu, Q₁ = 49,5 + 10((10 − 3)/8) = 49,5 + 10(7/8) = 49,5 + 8,75 = 58,25.',
      'Jadi, kuartil bawah Q₁ data tersebut adalah 58,25. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 54,5, mengambil titik tengah kelas Q₁. Pilihan C, 59,5, adalah tepi atas kelas Q₁ (atau tepi bawah kelas median). Pilihan D, 57,5, memakai ΣF_k keliru (4/8 × 10 ditambahkan pada 52,5).',
    alasan: 'Datum ke-10 di kelas 50 − 59: Q₁ = 49,5 + 10(7/8) = 58,25.',
  },
  {
    // cek: Math.abs(0.8*0.8 - 0.64) < 1e-9
    id: 'st-60',
    tingkat: 'sangat sulit',
    pertanyaan: 'Koefisien korelasi jam belajar dan nilai ujian adalah r = 0,8. Persentase keragaman nilai ujian yang dijelaskan oleh garis regresinya adalah…',
    pilihan: ['64 persen', '80 persen', '40 persen', '89 persen', '16 persen'],
    benar: 0,
    langkah: [
      'Ingat bahwa bagian keragaman y yang dijelaskan garis regresi dinyatakan oleh koefisien determinasi, yaitu r², bukan r.',
      'Dengan r = 0,8, diperoleh r² = 0,8 × 0,8 = 0,64, yaitu 64 persen.',
      'Artinya, sekitar 64 persen naik-turunnya nilai ujian dapat dijelaskan oleh perbedaan jam belajar lewat garis lurus, dan 36 persen sisanya oleh hal lain.',
      'Jadi, persentase keragaman nilai ujian yang dijelaskan garis regresinya adalah 64 persen. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 80 persen, menyalin r sebagai persentase, padahal yang menyatakan bagian keragaman adalah r². Pilihan D, 89 persen, menarik akar 0,8 (√0,8 ≈ 0,89), arah yang terbalik. Pilihan E, 16 persen, mengkuadratkan sisa 1 − 0,8 = 0,2 lalu salah membaca hasilnya.',
    alasan: 'r² = 0,8² = 0,64 = 64 persen.',
  },
]
