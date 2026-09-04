/**
 * Statistika, tahap 5 sampai 9: ukuran pemusatan dan ukuran penyebaran.
 *
 * SUMBER MATERI
 * Buku Panduan Guru Matematika untuk SMA/SMK Kelas X, Dicky Susanto dkk,
 * Kemendikbudristek 2021, Bab 7 Statistika, subbab C (Ukuran Pemusatan),
 * D (Ukuran Penempatan), dan E (Ukuran Penyebaran), halaman 203 sampai 246.
 *
 * CARA KUARTIL yang dipakai di sini mengikuti buku itu, halaman 227 sampai 228:
 * median membelah data, lalu Q1 dan Q3 adalah median belahan kiri dan kanan,
 * TANPA menyertakan median saat banyak datanya ganjil.
 *
 * SELURUH ANGKA berasal dari `content/statistika/data.json` dan sudah diperiksa
 * mesin dua kali, lewat `alat/cek_statistik.py` dan `alat/cek_statistik_web.mjs`.
 */

import type { Tahap } from '@/content/tipe'
import type { WidgetStatistika } from '@/content/statistika/widget'

type TahapStatistika = Omit<Tahap, 'widget'> & { widget?: WidgetStatistika }

export const TAHAP_PEMUSATAN: TahapStatistika[] = [
  /* ================================================================= */
  {
    no: 5,
    slug: 'tiga-ukuran',
    judul: 'Mean, median, modus',
    labelPendek: 'Tiga ukuran',
    pertanyaan: 'Kalau ditanya "biasanya berapa", angka mana yang menjawab?',
    intisari: [
      'Modus yang paling sering muncul, median yang di tengah setelah diurutkan, mean titik seimbangnya.',
      'Median wajib diurutkan dulu. Data genap: rata-rata dua nilai tengahnya.',
      'Mean adalah titik seimbang: jumlah simpangan ke kiri selalu sama dengan jumlah simpangan ke kanan.',
      'Data boleh punya lebih dari satu modus, dan boleh tidak punya modus sama sekali.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Delapan siswa mengikuti ulangan. Nilainya: 4, 5, 6, 7, 7, 8, 8, 11. Kalau ada yang bertanya "nilainya biasanya berapa", ada tiga jawaban yang sama-sama sah, dan ketiganya menjawab pertanyaan yang sedikit berbeda.' },

      { jenis: 'sesi', judul: 'Modus, yang paling sering' },
      { jenis: 'paragraf', teks: 'Modus adalah nilai yang paling sering muncul. Pada data di atas, 7 muncul dua kali dan 8 juga muncul dua kali, sedangkan sisanya sekali. Jadi datanya punya DUA modus: 7 dan 8.' },
      {
        jenis: 'poin',
        judul: 'Yang sering luput',
        butir: [
          'Modus boleh lebih dari satu. Tidak ada aturan yang mengharuskan modus tunggal.',
          'Kalau semua nilai muncul sama seringnya, datanya tidak punya modus sama sekali.',
          'Modus adalah satu-satunya ukuran pemusatan yang bisa dipakai untuk data kategori. Tidak ada rata-rata dari "jalan kaki, sepeda, angkot", tetapi ada yang paling sering.',
        ],
      },

      { jenis: 'sesi', judul: 'Median, yang di tengah' },
      { jenis: 'paragraf', teks: 'Median adalah nilai yang berada tepat di tengah SETELAH data diurutkan. Kata "setelah diurutkan" itu bukan tambahan, itu bagian dari definisinya.' },
      {
        jenis: 'contoh',
        judul: 'Median untuk 8 data',
        baris: [
          'urutkan     4  5  6  7 | 7  8  8  11',
          'banyak data 8, genap, jadi tengahnya ada dua',
          'data ke-4 = 7,  data ke-5 = 7',
          'median = (7 + 7) : 2 = 7',
        ],
        simpul: 'Untuk data ganjil langkahnya lebih pendek: mediannya satu nilai, yaitu yang tepat di tengah.',
      },

      { jenis: 'sesi', judul: 'Mean, dan kenapa ia disebut titik seimbang' },
      { jenis: 'paragraf', teks: 'Mean, atau rata-rata, adalah jumlah seluruh data dibagi banyaknya data.' },
      {
        jenis: 'contoh',
        judul: 'Mean data di atas',
        baris: [
          'jumlah = 4 + 5 + 6 + 7 + 7 + 8 + 8 + 11 = 56',
          'banyak data = 8',
          'mean = 56 : 8 = 7',
        ],
      },
      { jenis: 'paragraf', teks: 'Sekarang bagian yang jarang diajarkan, padahal ini yang membuat mean masuk akal. Bayangkan data sebagai beban yang ditaruh di atas papan, dan mean sebagai letak penopang papan itu. Papannya akan seimbang tepat di mean.' },
      {
        jenis: 'contoh',
        judul: 'Jumlah simpangan ke mean selalu nol',
        baris: [
          'simpangan tiap data terhadap 7:',
          '4 - 7 = -3      5 - 7 = -2      6 - 7 = -1',
          '7 - 7 =  0      7 - 7 =  0',
          '8 - 7 =  1      8 - 7 =  1      11 - 7 = 4',
          '',
          'jumlah simpangan negatif = -6',
          'jumlah simpangan positif = +6',
          'totalnya = 0',
        ],
        simpul: 'Ini bukan kebetulan pada contoh ini saja. Untuk data apa pun, jumlah simpangan terhadap mean selalu tepat nol. Itulah arti "titik seimbang".',
      },
      { jenis: 'paragraf', teks: 'Sifat ini akan kita pakai lagi di Tahap 8. Ia sekaligus menjelaskan kenapa simpangan baku harus dikuadratkan dulu: kalau simpangannya dijumlah apa adanya, hasilnya selalu nol, dan ukuran yang selalu nol tidak mengukur apa-apa.' },

      {
        jenis: 'coba',
        teks: 'Alat di sebelah kiri menaruh data di atas papan jungkat-jungkit. Penopangnya adalah mean, median ditandai garis di bawah papan, dan modus terbaca dari tumpukan titik yang paling tinggi.',
        langkah: [
          'Seret satu titik ke kanan. Perhatikan penopang, yaitu mean, ikut bergeser ke kanan.',
          'Perhatikan median sering tidak ikut bergeser sama sekali.',
          'Coba buat papannya miring dengan memindahkan penopang. Papan hanya seimbang kalau penopangnya tepat di mean.',
        ],
      },

      { jenis: 'sesi', judul: 'Jadi yang mana yang dipakai?' },
      {
        jenis: 'poin',
        judul: 'Pegangan singkat',
        butir: [
          'Data kategori - hanya modus yang bisa dipakai.',
          'Data angka yang setangkup dan tanpa pencilan - mean paling banyak memberi informasi, sebab ia memakai semua data.',
          'Data yang miring atau punya pencilan, misalnya gaji dan harga rumah - median lebih jujur mewakili "orang kebanyakan".',
        ],
      },
      { jenis: 'paragraf', teks: 'Alasan pegangan terakhir itu adalah isi Tahap 6, dan contohnya cukup mengejutkan untuk dibahas terpisah.' },
    ],
    seringKeliru: {
      judul: 'Median itu angka yang ada di tengah daftar',
      isi: 'Hanya benar kalau daftarnya sudah terurut. Pada data 8, 3, 5, angka yang tertulis di tengah adalah 3, tetapi mediannya 5, sebab setelah diurutkan datanya menjadi 3, 5, 8. Melewatkan langkah mengurutkan adalah kesalahan yang paling sering terjadi pada soal median, dan paling sederhana dihindari: urutkan dulu.',
    },
    widget: 'tiga-ukuran',
    video: { berkas: 'statistika5-pemusatan.mp4', poster: 'statistika5-pemusatan.jpg' },
    siap: true,
  },

  /* ================================================================= */
  {
    no: 6,
    slug: 'pencilan',
    judul: 'Pencilan, kapan rata-rata berbohong',
    labelPendek: 'Pencilan',
    pertanyaan: 'Gaji rata-rata di kantor itu 12 juta. Kenapa hampir semua karyawannya tidak merasa begitu?',
    intisari: [
      'Pencilan adalah data yang letaknya jauh terpisah dari kumpulan lainnya.',
      'Mean tertarik ke arah pencilan; median hampir tidak bergeming.',
      'Karena itu untuk gaji, harga rumah, dan data miring lainnya, median lebih mewakili orang kebanyakan.',
      'Pencilan tidak otomatis salah, dan tidak boleh langsung dibuang.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Sebuah kantor kecil berisi sembilan karyawan dan satu direktur. Ini gaji mereka, dalam juta rupiah.' },
      {
        jenis: 'contoh',
        judul: 'Gaji sepuluh orang',
        baris: [
          'karyawan   4,2   4,5   4,8   5,0   5,0   5,2   5,5   6,0   7,0',
          'direktur   75,0',
          '',
          'mean   = 122,2 : 10 = 12,22 juta',
          'median = 5,1 juta',
        ],
        simpul: 'Rata-ratanya 12,22 juta. Padahal sembilan dari sepuluh orang di kantor itu bergaji 7 juta atau kurang. Tidak ada satu pun karyawan yang gajinya mendekati rata-rata.',
      },
      { jenis: 'sorot', teks: 'Rata-ratanya tidak salah hitung. Yang salah adalah memakainya untuk menjawab "berapa gaji orang kebanyakan di kantor ini".' },
      { jenis: 'paragraf', teks: 'Bandingkan dengan kantor yang sama tanpa direkturnya. Sembilan karyawan itu saja punya mean 5,24 juta dan median 5 juta. Kedua angka itu berdekatan, dan keduanya masuk akal sebagai gambaran.' },

      { jenis: 'sesi', judul: 'Kenapa mean tertarik tetapi median tidak' },
      { jenis: 'paragraf', teks: 'Di Tahap 5 kita membuktikan mean adalah titik seimbang: jumlah simpangan ke kirinya sama besar dengan jumlah simpangan ke kanannya. Sifat itu juga yang membuatnya bisa diseret. Mean memakai NILAI setiap data. Satu data yang nilainya raksasa ikut masuk ke dalam penjumlahan dengan bobot penuh, jadi ia menyeret hasilnya.' },
      { jenis: 'paragraf', teks: 'Median hanya memakai POSISI. Bagi median, gaji direktur itu cuma "satu data yang ada di paling kanan". Mau 75 juta atau 750 juta, posisinya tetap sama, dan mediannya tidak berubah sedikit pun.' },
      {
        jenis: 'coba',
        teks: 'Alat di sebelah kiri punya satu titik yang bisa diseret sejauh mungkin ke kanan.',
        langkah: [
          'Seret titik paling kanan menjauh perlahan.',
          'Perhatikan penanda mean ikut lari mengejarnya, sementara penanda median berhenti di tempat.',
          'Perhatikan selisih mean dan median membesar terus. Selisih yang besar itu sendiri adalah tanda datanya miring.',
        ],
      },

      { jenis: 'sesi', judul: 'Apakah pencilan harus dibuang?' },
      { jenis: 'paragraf', teks: 'Tidak. Ini keputusan yang sering diambil terlalu cepat.' },
      {
        jenis: 'poin',
        judul: 'Tiga kemungkinan asal-usul pencilan',
        butir: [
          'Salah catat - misalnya tinggi badan tertulis 1670 cm. Ini memang pantas diperbaiki atau dibuang, dan pembuangannya wajib disebutkan.',
          'Kejadian yang jarang tetapi nyata - gaji direktur benar segitu. Membuangnya berarti berbohong tentang kantor itu.',
          'Justru yang paling penting - satu pasien yang sembuh padahal obatnya sama, satu sekolah yang nilainya melonjak. Dalam banyak penelitian, pencilan adalah temuannya, bukan gangguannya.',
        ],
      },
      { jenis: 'paragraf', teks: 'Karena itu urutan yang benar adalah: temukan pencilannya, periksa dari mana asalnya, baru putuskan. Cara menemukannya dengan hitungan, bukan dengan perasaan, ada di tahap berikutnya lewat pagar 1,5 kali jangkauan antar kuartil. Untuk data gaji tadi, pagar itu ada di 7,8 juta, dan gaji 75 juta jatuh jauh di luarnya.' },
    ],
    seringKeliru: {
      judul: 'Data yang jauh sendiri itu pasti salah catat, hapus saja',
      isi: 'Menghapus data karena ia mengganggu adalah cara paling cepat membuat kesimpulan yang salah, dan sulit dilacak orang lain. Pencilan diperiksa asal-usulnya lebih dulu. Kalau ternyata memang nyata, ia tetap tinggal, dan yang berubah bukan datanya melainkan ukuran yang dipakai: gunakan median, bukan mean.',
      sumber: 'Pokok materi "Penggunaan Ukuran Pemusatan" dengan kosakata "Pencilan" ada di Buku Panduan Guru Matematika SMA/SMK Kelas X, Kemendikbudristek 2021, halaman 206.',
    },
    widget: 'tarik-pencilan',
    video: { berkas: 'statistika6-pencilan.mp4', poster: 'statistika6-pencilan.jpg' },
    siap: true,
  },

  /* ================================================================= */
  {
    no: 7,
    slug: 'kuartil',
    judul: 'Kuartil, boxplot, dan jangkauan antar kuartil',
    labelPendek: 'Kuartil',
    pertanyaan: 'Bagaimana menggambarkan sebaran seluruh data hanya dengan lima angka?',
    intisari: [
      'Kuartil membelah data terurut menjadi empat bagian yang sama banyak.',
      'Ringkasan lima angka: minimum, Q1, median, Q3, maksimum.',
      'Jangkauan antar kuartil (JAK) = Q3 - Q1, yaitu lebar setengah data yang di tengah.',
      'JAK kebal terhadap pencilan, sedangkan jangkauan biasa langsung ikut tertipu olehnya.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Lima belas siswa mencatat berapa menit waktu tempuh mereka ke sekolah. Setelah diurutkan: 5, 7, 8, 10, 10, 12, 15, 15, 18, 20, 22, 25, 30, 35, 60.' },
      { jenis: 'paragraf', teks: 'Median sudah kita kenal: ia membelah data menjadi dua bagian sama banyak. Kuartil melanjutkan gagasan itu, tetapi membelahnya menjadi empat.' },

      { jenis: 'sesi', judul: 'Menemukan ketiga kuartil' },
      {
        jenis: 'contoh',
        judul: 'Membelah 15 data',
        baris: [
          '5  7  8  10  10  12  15 | 15 | 18  20  22  25  30  35  60',
          '',
          'Q2 = median = data ke-8 = 15',
          'belahan kiri  : 5 7 8 10 10 12 15      mediannya 10   -> Q1 = 10',
          'belahan kanan : 18 20 22 25 30 35 60   mediannya 25   -> Q3 = 25',
        ],
        simpul: 'Karena banyak datanya ganjil, median tidak ikut masuk ke belahan mana pun. Ini cara yang dipakai buku sekolah.',
      },
      {
        jenis: 'poin',
        judul: 'Arti ketiga angka itu',
        butir: [
          'Q1 = 10 - seperempat siswa menempuh 10 menit atau kurang.',
          'Q2 = 15 - setengah siswa menempuh 15 menit atau kurang.',
          'Q3 = 25 - tiga perempat siswa menempuh 25 menit atau kurang.',
        ],
      },
      { jenis: 'paragraf', teks: 'Kuartil sebenarnya kasus khusus dari persentil. Q1 adalah persentil ke-25, median persentil ke-50, dan Q3 persentil ke-75. Persentil ke-90 pada data ini berarti nilai yang membuat 90 persen data berada di bawahnya.' },

      { jenis: 'sesi', judul: 'Boxplot, lima angka yang jadi satu gambar' },
      { jenis: 'paragraf', teks: 'Boxplot, atau diagram kotak garis, menggambar kelima angka itu sekaligus: sebuah kotak dari Q1 sampai Q3, sebuah garis di dalam kotak untuk median, dan dua kumis yang menjulur ke data terkecil dan terbesar.' },
      {
        jenis: 'poin',
        judul: 'Cara membacanya',
        butir: [
          'Kotaknya berisi setengah data yang di tengah, jadi kotak yang lebar berarti separuh tengah datanya berpencar.',
          'Garis median yang tidak di tengah kotak berarti datanya miring ke satu sisi.',
          'Kumis yang panjang sebelah menandakan ada ekor data yang menjulur jauh.',
        ],
      },

      { jenis: 'sesi', judul: 'JAK, dan cara menemukan pencilan dengan hitungan' },
      { jenis: 'paragraf', teks: 'Jangkauan antar kuartil adalah Q3 dikurangi Q1. Pada data kita, JAK = 25 - 10 = 15 menit. Ia mengukur lebar setengah data yang di tengah, jadi ia sama sekali tidak peduli pada nilai terjauh.' },
      { jenis: 'paragraf', teks: 'Bandingkan dengan jangkauan biasa, yang di sini 60 - 5 = 55 menit. Angka 55 itu sepenuhnya ditentukan oleh dua orang saja, yaitu yang paling dekat dan yang paling jauh rumahnya.' },
      {
        jenis: 'contoh',
        judul: 'Pagar 1,5 kali JAK',
        baris: [
          'JAK = 25 - 10 = 15',
          '1,5 × JAK = 22,5',
          '',
          'pagar bawah = Q1 - 22,5 = 10 - 22,5 = -12,5',
          'pagar atas  = Q3 + 22,5 = 25 + 22,5 = 47,5',
          '',
          'data di luar pagar: 60',
        ],
        simpul: 'Jadi waktu tempuh 60 menit ditandai sebagai pencilan, dan itu keputusan hitungan, bukan perasaan. Ia belum tentu salah, mungkin memang ada siswa yang rumahnya jauh sekali.',
      },
      {
        jenis: 'coba',
        teks: 'Alat di sebelah kiri membentuk boxplot dari titik data di bawahnya.',
        langkah: [
          'Seret titik paling kanan mendekat ke kelompoknya. Perhatikan kumisnya memendek tetapi kotaknya nyaris tidak berubah.',
          'Nyalakan tanda pagar 1,5 × JAK, lalu perhatikan titik pencilan berubah warna sendiri.',
          'Seret titik di dalam kotak. Sekarang kotaknyalah yang berubah.',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Kotak yang lebih lebar berarti datanya lebih banyak',
      isi: 'Godaannya datang dari histogram. Di sana batang yang lebih besar memang berarti data yang lebih banyak, dan mata membawa kebiasaan itu ke boxplot. Padahal setiap bagian dari boxplot selalu berisi tepat seperempat data, berapa pun lebarnya. Kotak yang lebar berarti seperempat sampai setengah data yang di tengah itu tersebar di rentang yang luas, bukan berarti jumlah datanya lebih banyak. Boxplot memang tidak menampilkan banyak data sama sekali, dan itu kelemahannya: dua boxplot yang identik bisa berasal dari 10 data dan dari 10.000 data.',
      sumber: 'Cara menentukan kuartil mengikuti Buku Panduan Guru Matematika SMA/SMK Kelas X, Kemendikbudristek 2021, halaman 227 sampai 228.',
    },
    widget: 'kotak-garis',
    video: { berkas: 'statistika7-boxplot.mp4', poster: 'statistika7-boxplot.jpg' },
    siap: true,
  },

  /* ================================================================= */
  {
    no: 8,
    slug: 'simpangan-baku',
    judul: 'Simpangan baku, rata-rata jarak dari pusat',
    labelPendek: 'Simpangan baku',
    pertanyaan: 'Dua mesin isi ulang sama-sama rata-rata 500 ml. Kenapa yang satu tetap ditolak pabrik?',
    intisari: [
      'Simpangan baku mengukur seberapa jauh data biasanya menyimpang dari mean.',
      'Simpangan tidak bisa langsung dijumlah, sebab jumlahnya selalu nol.',
      'Karena itu simpangan dikuadratkan dulu, dirata-ratakan (itu varian), lalu diakarkan.',
      'Diakarkan supaya satuannya kembali sama dengan satuan data aslinya.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Sebuah pabrik minuman menguji dua mesin pengisi botol. Lima botol diambil dari tiap mesin lalu diukur isinya.' },
      {
        jenis: 'contoh',
        judul: 'Isi lima botol dari tiap mesin, dalam ml',
        baris: [
          'Mesin A    498   499   500   501   502      mean 500',
          'Mesin B    490   495   500   505   510      mean 500',
        ],
        simpul: 'Rata-ratanya sama persis. Tetapi kalau botolnya berlabel 500 ml, Mesin B mengirim botol berisi 490 ml ke pembeli, dan itu masalah.',
      },
      { jenis: 'paragraf', teks: 'Kita butuh satu angka yang membedakan keduanya. Bangunnya bertahap, dan tiap langkahnya punya alasan.' },

      { jenis: 'sesi', judul: 'Langkah 1, ukur jarak tiap data ke mean' },
      {
        jenis: 'contoh',
        judul: 'Simpangan tiap botol',
        baris: [
          'Mesin A    -2   -1   0   1   2',
          'Mesin B   -10   -5   0   5  10',
        ],
        simpul: 'Sudah terlihat bedanya. Sekarang tinggal meringkasnya jadi satu angka.',
      },

      { jenis: 'sesi', judul: 'Langkah 2, kenapa tidak boleh langsung dijumlah' },
      { jenis: 'paragraf', teks: 'Cara paling wajar adalah menjumlahkan simpangan itu lalu dibagi banyaknya. Sayangnya cara itu gagal total, dan gagalnya bukan kadang-kadang.' },
      {
        jenis: 'contoh',
        judul: 'Jumlah simpangan kedua mesin',
        baris: [
          'Mesin A    -2 + (-1) + 0 + 1 + 2 = 0',
          'Mesin B   -10 + (-5) + 0 + 5 + 10 = 0',
        ],
        simpul: 'Keduanya nol. Bukan kebetulan: seperti di Tahap 5, jumlah simpangan terhadap mean SELALU nol, untuk data apa pun. Ukuran yang selalu nol tidak mengukur apa-apa.',
      },

      { jenis: 'sesi', judul: 'Langkah 3, kuadratkan supaya tidak saling menghapus' },
      { jenis: 'paragraf', teks: 'Yang membuat jumlahnya nol adalah tanda minus. Jadi tanda itu harus dihilangkan. Caranya dikuadratkan, sebab bilangan negatif dikuadratkan menjadi positif.' },
      {
        jenis: 'contoh',
        judul: 'Kuadrat simpangan, lalu dirata-ratakan',
        baris: [
          'Mesin A    4 + 1 + 0 + 1 + 4 = 10        varian = 10 : 5 = 2',
          'Mesin B    100 + 25 + 0 + 25 + 100 = 250  varian = 250 : 5 = 50',
        ],
        simpul: 'Angka ini disebut varian. Ia sudah berhasil membedakan kedua mesin: 2 lawan 50.',
      },
      { jenis: 'paragraf', teks: 'Kuadrat itu bisa dibayangkan sebagai luas persegi yang sisinya sepanjang simpangan. Alat di sebelah kiri menggambarnya persis seperti itu, jadi varian adalah rata-rata luas persegi tersebut.' },

      { jenis: 'sesi', judul: 'Langkah 4, akarkan supaya satuannya masuk akal' },
      { jenis: 'paragraf', teks: 'Varian punya satu cacat: satuannya ikut terkuadratkan. Isi botol diukur dalam ml, jadi variannya bersatuan ml kuadrat, dan tidak ada orang yang bisa membayangkan ml kuadrat.' },
      {
        jenis: 'contoh',
        judul: 'Simpangan baku, akar dari varian',
        baris: [
          'Mesin A    akar dari 2  = 1,41 ml',
          'Mesin B    akar dari 50 = 7,07 ml',
        ],
        simpul: 'Sekarang angkanya bisa dibaca sebagai kalimat: isi botol Mesin A biasanya meleset sekitar 1,41 ml dari 500, sedangkan Mesin B sekitar 7,07 ml.',
      },
      {
        jenis: 'coba',
        teks: 'Alat di sebelah kiri menggambar seluruh langkah tadi sekaligus.',
        langkah: [
          'Seret satu botol menjauh dari mean. Perhatikan sisi bawah perseginya memanjang, dan perseginya membesar mengikuti.',
          'Perhatikan persegi tumbuh jauh lebih cepat daripada garisnya. Jarak dua kali lipat membuat luasnya empat kali lipat.',
          'Itu sebabnya simpangan baku sangat peka terhadap pencilan, jauh lebih peka daripada jangkauan antar kuartil di Tahap 7.',
        ],
      },

      { jenis: 'sesi', judul: 'Catatan kecil soal pembagi' },
      { jenis: 'paragraf', teks: 'Di sini varian dihitung dengan pembagi n, yaitu banyak datanya, dan itu yang dipakai buku SMA. Kalkulator dan program pengolah angka sering menyediakan pilihan lain dengan pembagi n - 1, yang dipakai kalau data yang kita punya cuma sampel dari kelompok yang jauh lebih besar. Untuk data satu kelas yang lengkap seperti contoh kita, pembagi n sudah tepat. Jangan kaget kalau angka di kalkulator berbeda sedikit, periksa dulu pilihannya.' },
    ],
    seringKeliru: {
      judul: 'Simpangan baku besar berarti nilainya jelek',
      isi: 'Simpangan baku tidak tahu apa-apa tentang bagus atau jelek. Ia cuma mengukur lebar sebaran. Kelas dengan rata-rata 90 dan simpangan baku besar berarti ada yang sangat tinggi dan ada yang tertinggal, bukan berarti kelasnya buruk. Dan untuk beberapa hal, sebaran lebar justru bagus: kalau yang diukur adalah keragaman jawaban dalam sebuah diskusi, simpangan baku nol berarti semua orang menjawab persis sama.',
      sumber: 'Urutan varian lalu simpangan baku mengikuti Buku Panduan Guru Matematika SMA/SMK Kelas X, Kemendikbudristek 2021, subbab E halaman 207.',
    },
    widget: 'jarak-ke-rata',
    video: { berkas: 'statistika8-simpangan.mp4', poster: 'statistika8-simpangan.jpg' },
    siap: true,
  },

  /* ================================================================= */
  {
    no: 9,
    slug: 'data-kelompok',
    judul: 'Data berkelompok',
    labelPendek: 'Data kelompok',
    pertanyaan: 'Kalau yang kita punya cuma tabelnya, dan angka aslinya sudah hilang, apa yang masih bisa dihitung?',
    intisari: [
      'Pada data berkelompok, setiap kelas diwakili titik tengahnya.',
      'Karena itu semua hasilnya hampiran, bukan nilai persis.',
      'Median dan kuartil dicari dengan interpolasi: masuk ke dalam kelas sejauh bagian yang masih kurang.',
      'Modus dicari lewat kesebangunan di dalam batang tertinggi.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Data yang sampai ke tangan kita sering sudah berupa tabel, bukan daftar angka. Laporan sekolah, data pemerintah, dan hasil sensus hampir selalu begitu, sebab menampilkan ribuan angka satu per satu tidak ada gunanya.' },
      {
        jenis: 'contoh',
        judul: 'Nilai ujian 40 siswa',
        baris: [
          'kelas      frekuensi   titik tengah',
          '40 - 49        3           44,5',
          '50 - 59        8           54,5',
          '60 - 69       12           64,5',
          '70 - 79        9           74,5',
          '80 - 89        6           84,5',
          '90 - 99        2           94,5',
          '           jumlah 40',
        ],
        simpul: 'Kita tahu ada 12 siswa bernilai 60-an, tetapi tidak tahu nilai persis satu pun di antaranya.',
      },

      { jenis: 'sesi', judul: 'Tepi kelas, yang sering dilewati' },
      { jenis: 'paragraf', teks: 'Kelas "40 sampai 49" dan "50 sampai 59" terlihat punya lubang di antaranya, yaitu 49,5. Padahal nilai 49,5 harus punya tempat. Karena itu untuk menghitung, yang dipakai adalah tepi kelas, bukan batas yang tertulis.' },
      {
        jenis: 'poin',
        judul: 'Tepi kelas',
        butir: [
          'Tepi bawah = batas bawah dikurangi 0,5, jadi 40 menjadi 39,5.',
          'Tepi atas = batas atas ditambah 0,5, jadi 49 menjadi 49,5.',
          'Panjang kelas p = tepi atas dikurangi tepi bawah = 49,5 - 39,5 = 10.',
        ],
      },

      { jenis: 'sesi', judul: 'Mean, dan kenapa hasilnya cuma hampiran' },
      { jenis: 'paragraf', teks: 'Karena nilai asli tiap siswa tidak diketahui, setiap kelas diwakili titik tengahnya. Kita berpura-pura ketiga siswa di kelas pertama semuanya bernilai 44,5.' },
      {
        jenis: 'contoh',
        judul: 'Mean data berkelompok',
        baris: [
          'banyak siswa × titik tengah kelasnya:',
          '3 × 44,5  = 133,5',
          '8 × 54,5  = 436',
          '12 × 64,5 = 774',
          '9 × 74,5  = 670,5',
          '6 × 84,5  = 507',
          '2 × 94,5  = 189',
          '            jumlah = 2710',
          '',
          'mean = 2710 : 40 = 67,75',
        ],
        simpul: 'Angka asli keempat puluh siswa itu sebenarnya masih ada, dan mean sesungguhnya adalah 68. Jadi hampirannya meleset 0,25. Dekat, tetapi tidak sama, dan itu memang sifatnya.',
      },
      { jenis: 'sorot', teks: 'Setiap hasil pada data berkelompok adalah hampiran. Menulis "mean = 67,75" tanpa menyadari itu adalah kesalahan pemahaman, bukan kesalahan hitung.' },

      { jenis: 'sesi', judul: 'Median lewat interpolasi' },
      { jenis: 'paragraf', teks: 'Median membelah data jadi dua, jadi kita mencari nilai yang di bawahnya ada 20 siswa. Frekuensi kumulatifnya: 3, lalu 11, lalu 23. Angka 20 terlampaui di kelas ketiga, jadi median ada di kelas 60 sampai 69.' },
      {
        jenis: 'contoh',
        judul: 'Menyusup ke dalam kelas median',
        baris: [
          'tepi bawah kelas median   L  = 59,5',
          'frekuensi sebelum kelas   F  = 11',
          'frekuensi kelas median    f  = 12',
          'panjang kelas             p  = 10',
          '',
          'median = L + ((n:2 - F) : f) × p',
          '       = 59,5 + ((20 - 11) : 12) × 10',
          '       = 59,5 + 7,5',
          '       = 67',
        ],
        simpul: 'Bacanya: masuk ke kelas 60-an sejauh 9 dari 12 langkahnya, lalu ambil sekian persen dari lebar kelas. Median asli keempat puluh siswa itu 67,5, jadi hampirannya lagi-lagi dekat tetapi tidak sama.',
      },
      { jenis: 'paragraf', teks: 'Kuartil dihitung dengan rumus yang persis sama, cuma n:2 diganti. Untuk Q1 dipakai n:4, untuk Q3 dipakai 3n:4. Hasilnya Q1 = 58,25 dan Q3 = 77,28.' },

      { jenis: 'paragraf', teks: 'Sebelum masuk ke modus, panggil ulang dua hal dari awal tahap ini. Pertama, setiap kelas hanya diwakili titik tengahnya, jadi hasilnya tetap hampiran. Kedua, batang yang paling tinggi memang menunjuk kelas modusnya, tetapi modusnya belum tentu jatuh tepat di tengah batang itu.' },
      { jenis: 'sesi', judul: 'Modus lewat kesebangunan' },
      { jenis: 'paragraf', teks: 'Modus data berkelompok berada di kelas dengan batang tertinggi, di sini kelas 60 sampai 69 dengan frekuensi 12. Letak persisnya di dalam kelas itu ditentukan oleh tetangga kiri dan kanannya: batang condong ke arah tetangga yang lebih tinggi.' },
      {
        jenis: 'contoh',
        judul: 'Modus data berkelompok',
        baris: [
          'selisih dengan tetangga kiri   d1 = 12 - 8 = 4',
          'selisih dengan tetangga kanan  d2 = 12 - 9 = 3',
          '',
          'modus = L + (d1 : (d1 + d2)) × p',
          '      = 59,5 + (4 : 7) × 10',
          '      = 59,5 + 5,71',
          '      = 65,21',
        ],
        simpul: 'Karena tetangga kanannya lebih tinggi daripada tetangga kiri, modusnya condong ke kanan dari tengah kelas. Kalau kedua tetangganya sama tinggi, modusnya jatuh tepat di tengah kelas.',
      },
      {
        jenis: 'coba',
        teks: 'Alat di sebelah kiri menampilkan histogram dan tabelnya berdampingan.',
        langkah: [
          'Sentuh satu baris tabel, dan batang yang bersangkutan ikut menyala. Keduanya benda yang sama.',
          'Geser garis median sampai luas di kirinya sama dengan luas di kanannya.',
          'Bandingkan letak garis yang Anda temukan dengan hasil rumus interpolasi. Keduanya jatuh di titik yang sama, dan itulah bukti rumusnya.',
        ],
      },
      {
        jenis: 'coba',
        teks: 'Alat yang sama punya dua penggeser lagi: frekuensi tetangga kiri dan tetangga kanan dari batang tertinggi. Garis putus berwarna bata di dalam batang tertinggi adalah modusnya.',
        langkah: [
          'Biarkan tetangga kiri di 8, lalu naikkan tetangga kanan sampai 11. Modusnya bergeser ke kanan, dari 65,21 menjadi 67,5.',
          'Sekarang naikkan tetangga kiri sampai 11 juga, jadi kedua tetangganya sama tinggi. Modusnya pindah tepat ke tengah kelas, 64,5.',
          'Turunkan tetangga kanan sampai 0. Sekarang tetangga kirinya yang jauh lebih tinggi, dan modusnya condong ke kiri, menjadi 60,27.',
          'Selama ketiga langkah tadi batang tertingginya tidak pernah berpindah. Yang berpindah cuma letak modus di dalam batang itu, dan yang menariknya adalah tetangga yang lebih tinggi.',
        ],
      },
    ],
    seringKeliru: {
      judul: 'Mean data berkelompok pasti sama dengan mean data aslinya',
      isi: 'Tidak. Pada contoh di halaman ini, mean berkelompok 67,75 sedangkan mean data aslinya 68. Selisihnya kecil karena datanya tersebar cukup merata di dalam tiap kelas. Kalau data menumpuk di satu ujung kelas, misalnya semua siswa kelas 60-an ternyata bernilai 69, selisihnya bisa jauh lebih besar. Titik tengah adalah tebakan yang masuk akal, bukan kebenaran.',
      sumber: 'Kosakata "Interpolasi, kesebangunan" untuk median dan modus data kelompok ada di Buku Panduan Guru Matematika SMA/SMK Kelas X, Kemendikbudristek 2021, halaman 206.',
    },
    widget: 'data-kelompok',
    video: { berkas: 'statistika9-kelompok.mp4', poster: 'statistika9-kelompok.jpg' },
    siap: true,
  },
]
