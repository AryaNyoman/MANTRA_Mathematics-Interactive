import type { Kanal, Soal } from '@/content/tipe'

/**
 * Latihan dan kanal rujukan topik Ruang Tiga Dimensi.
 *
 * KALIBRASI KESULITAN, DILAKUKAN SEBELUM MENULIS
 * Aturan proyek: soal buatan Claude cenderung terlalu mudah, jadi tingkat
 * kesulitannya dikalibrasi dulu ke sumber nyata. Patokannya lima soal Ujian
 * Nasional asli yang ditemukan di makalah dimensi tiga milik ARYA
 * (UN 2004, EBTANAS 1999, EBTANAS 1992, UAN 2003, UAN 2005). Dua di antaranya
 * dipakai langsung di sini, lengkap dengan sumbernya.
 *
 * Semua jawaban numerik sudah diperiksa `alat/cek_ruang.py` dengan sympy,
 * lewat berkas `alat/soal-ruang-3d.json`.
 *
 * Pengecohnya bukan asal salah. Tiap butir adalah kekeliruan yang benar-benar
 * sering terjadi, sehingga siswa yang memilihnya belajar sesuatu.
 */

export const LATIHAN: Soal[] = [
  {
    no: 1,
    label: 'Diagonal ruang',
    pertanyaan:
      'Kubus ABCD.EFGH mempunyai rusuk 8 cm. Berapa panjang diagonal ruang AG?',
    pilihan: ['8 akar 2 cm', '8 akar 3 cm', '8 akar 5 cm', '16 cm', '24 cm'],
    benar: 1,
    jawaban: '8 akar 3 cm, kira-kira 13,856 cm',
    pembahasan: [
      'Pythagoras dipakai dua kali, dan hasil yang pertama menjadi sisi pada yang kedua.',
      'Langkah 1, segitiga ABC siku-siku di B: AC² = 8² + 8² = 128. Jangan diakarkan dulu.',
      'Langkah 2, segitiga ACG siku-siku di C: AG² = AC² + CG² = 128 + 64 = 192.',
      'AG = akar 192 = akar (64 kali 3) = 8 akar 3.',
      'Periksa cepat: rumus umumnya rusuk dikali akar 3, dan 8 kali akar 3 memang 8 akar 3.',
    ],
  },
  {
    no: 2,
    label: 'Kedudukan',
    pertanyaan:
      'Pada kubus ABCD.EFGH, bagaimana kedudukan garis AE terhadap garis BG?',
    pilihan: [
      'Berpotongan di titik B',
      'Sejajar',
      'Bersilangan',
      'Berimpit',
      'Tegak lurus dan berpotongan',
    ],
    benar: 2,
    jawaban: 'Bersilangan',
    pembahasan: [
      'Periksa dulu apakah keduanya punya titik persekutuan. AE memakai titik A dan E, BG memakai B dan G. Tidak ada yang sama, jadi keduanya tidak berpotongan.',
      'Periksa arahnya. AE adalah rusuk tegak, arahnya lurus ke atas. BG adalah diagonal sisi kanan, arahnya miring. Arahnya berbeda, jadi bukan sejajar.',
      'Tinggal satu kemungkinan: bersilangan.',
      'Uji terakhir yang menentukan: carilah satu bidang yang memuat AE sekaligus BG. Bidang yang memuat AE adalah sisi kiri atau sisi depan, dan BG tidak ada di keduanya. Tidak ada bidang seperti itu, jadi benar bersilangan.',
    ],
  },
  {
    no: 3,
    label: 'Jarak titik ke garis',
    pertanyaan:
      'Kubus ABCD.EFGH mempunyai rusuk 4 cm. Titik P adalah titik tengah rusuk EH. Berapa jarak titik P ke garis CF? (Soal UAN 2003)',
    pilihan: [
      'akar 8 cm',
      'akar 12 cm',
      'akar 14 cm',
      'akar 18 cm',
      'akar 20 cm',
    ],
    benar: 3,
    jawaban: 'akar 18 cm, yaitu 3 akar 2, kira-kira 4,243 cm',
    pembahasan: [
      'Jarak titik ke garis adalah panjang ruas yang tegak lurus garis itu, jadi yang dicari kaki tegak lurus dari P pada CF.',
      'Cara paling aman: pasang koordinat. Ambil A di titik asal, maka C = (4, 4, 0) dan F = (4, 0, 4).',
      'P titik tengah EH, dengan E = (0, 0, 4) dan H = (0, 4, 4), jadi P = (0, 2, 4).',
      'Panjang PC = akar (16 + 4 + 16) = 6, dan panjang PF = akar (16 + 4 + 0) = akar 20.',
      'CF adalah diagonal sisi, panjangnya 4 akar 2. Pakai jalan pintas luas segitiga PCF.',
      'Hitung luasnya, lalu jarak = 2 kali luas dibagi CF. Hasilnya 3 akar 2, yaitu akar 18.',
      'Perhatikan bahwa pilihan lain semuanya bentuk akar yang mirip. Menghafal bentuk jawaban tidak menolong di sini, hitungannya memang harus dikerjakan.',
    ],
  },
  {
    no: 4,
    label: 'Panjang proyeksi',
    pertanyaan:
      'Kubus ABCD.EFGH mempunyai rusuk 8 cm. Berapa panjang proyeksi DE pada bidang BDHF? (Soal UN 2004)',
    pilihan: [
      '2 akar 2 cm',
      '2 akar 6 cm',
      '4 akar 2 cm',
      '4 akar 6 cm',
      '8 akar 2 cm',
    ],
    benar: 3,
    jawaban: '4 akar 6 cm, kira-kira 9,798 cm',
    pembahasan: [
      'Proyeksi sebuah ruas pada bidang didapat dengan memproyeksikan kedua ujungnya, lalu menghubungkan hasilnya.',
      'Titik D sudah terletak pada bidang BDHF, sebab D memang salah satu sudut bidang itu. Jadi bayangan D adalah D sendiri.',
      'Tinggal mencari bayangan titik E. Bidang BDHF adalah bidang diagonal yang tegak, dan bayangan E jatuh di tengah antara E dan G, yaitu titik pusat tutup kubus.',
      'Sebut bayangan itu titik K. Jarak E ke bidang BDHF adalah setengah diagonal tutup, yaitu 4 akar 2.',
      'Sekarang hitung DK dengan Pythagoras pada segitiga siku-siku yang terbentuk. Hasilnya 4 akar 6.',
      'Pengecoh 4 akar 2 adalah jarak E ke bidangnya, bukan panjang proyeksinya. Keduanya sering tertukar.',
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Kanal YouTube untuk belajar lebih lanjut.                           */
/* Kami menautkan KANAL-nya, bukan video tertentu, supaya tautannya    */
/* tidak mati saat video dihapus atau diganti pemiliknya.              */
/* ------------------------------------------------------------------ */

export const KANAL: Kanal[] = [
  {
    nama: 'm4th-lab',
    handle: '@m4thlab',
    url: 'https://www.youtube.com/@m4thlab',
    cari: 'dimensi tiga jarak titik ke bidang',
  },
  {
    nama: 'Belajar Matematika SMA',
    handle: '@TrieRush',
    url: 'https://www.youtube.com/@TrieRush',
    cari: 'kedudukan titik garis dan bidang',
  },
  {
    nama: 'Bimbel SMARRT',
    handle: '@BimbelSMARRT',
    url: 'https://www.youtube.com/@BimbelSMARRT',
    cari: 'sudut antara garis dan bidang dimensi tiga',
  },
  {
    nama: 'Ajar Pipolondo',
    handle: '@AjarPipolondo',
    url: 'https://www.youtube.com/@AjarPipolondo',
    cari: 'proyeksi pada bangun ruang',
  },
]
