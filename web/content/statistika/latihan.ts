import type { Kanal, Soal } from '@/content/tipe'

/**
 * Latihan terbimbing di dalam halaman topik Statistika.
 *
 * PENGECOHNYA BUKAN ASAL SALAH
 * Tiap pilihan yang keliru adalah kekeliruan yang benar-benar sering terjadi:
 * median dihitung tanpa mengurutkan, frekuensi mentah dibandingkan langsung
 * antar kelompok berbeda ukuran, varian dilaporkan sebagai simpangan baku, dan
 * pembagi n - 1 dipakai untuk data satu kelas yang lengkap. Siswa yang memilih
 * salah satu di antaranya jadi belajar sesuatu, bukan cuma kehilangan nilai.
 *
 * SELURUH ANGKA sudah diperiksa mesin. Datanya ada di `data.json` dengan id
 * `latihan-1-waktu-tunggu`, `latihan-3-pencilan`, dan `latihan-4-simpangan`,
 * dan jawabannya dicocokkan lewat `alat/cek_statistik.py`.
 */

export const LATIHAN: Soal[] = [
  {
    no: 1,
    label: 'Median',
    pertanyaan:
      'Waktu tunggu tujuh pasien di sebuah puskesmas, dalam menit: 12, 7, 15, 9, 11, 8, 14. Berapa mediannya?',
    pilihan: ['9 menit', '10,86 menit', '11 menit', '12 menit', '15 menit'],
    benar: 2,
    jawaban: '11 menit',
    pembahasan: [
      'Median menuntut data diurutkan lebih dulu. Ini langkah yang paling sering dilewati.',
      'Setelah diurutkan: 7, 8, 9, 11, 12, 14, 15.',
      'Banyak datanya 7, jadi ganjil, dan mediannya satu nilai yaitu data ke-4.',
      'Data ke-4 adalah 11. Jadi mediannya 11 menit.',
      'Kalau daftar aslinya tidak diurutkan, angka yang tertulis di tengah adalah 9. Itu pengecoh pilihan pertama, dan itu bukan median.',
      'Pilihan 10,86 adalah rata-ratanya, yaitu 76 dibagi 7. Rata-rata dan median dua hal berbeda.',
    ],
  },
  {
    no: 2,
    label: 'Frekuensi relatif',
    pertanyaan:
      'Di Sekolah A, 18 dari 60 siswa ikut ekstrakurikuler musik. Di Sekolah B, 25 dari 100 siswa. Pernyataan mana yang benar?',
    pilihan: [
      'Sekolah B lebih tinggi, sebab 25 siswa lebih banyak daripada 18 siswa',
      'Sekolah A lebih tinggi, yaitu 30 persen lawan 25 persen',
      'Keduanya sama saja, sebab selisihnya kecil',
      'Tidak bisa dibandingkan sama sekali, sebab jumlah siswanya berbeda',
      'Sekolah B lebih tinggi, yaitu 25 persen lawan 18 persen',
    ],
    benar: 1,
    jawaban: 'Sekolah A lebih tinggi, 30 persen lawan 25 persen',
    pembahasan: [
      'Jumlah siswa kedua sekolah berbeda, jadi jumlah mentahnya tidak bisa langsung diadu.',
      'Ubah dulu menjadi frekuensi relatif, yaitu dibagi banyak siswanya sendiri.',
      'Sekolah A: 18 dibagi 60 sama dengan 0,3, yaitu 30 persen.',
      'Sekolah B: 25 dibagi 100 sama dengan 0,25, yaitu 25 persen.',
      'Jadi bagian siswa yang ikut musik lebih besar di Sekolah A, walaupun jumlah orangnya lebih sedikit.',
      'Pilihan terakhir menganggap angka 18 itu sendiri sudah berupa persen. Itu kekeliruan yang sering terjadi saat penyebutnya tidak diperhatikan.',
      'Pilihan "tidak bisa dibandingkan" terlalu jauh: justru karena jumlahnya berbeda, frekuensi relatif diciptakan.',
    ],
  },
  {
    no: 3,
    label: 'Pencilan',
    pertanyaan:
      'Data terurut: 3, 5, 6, 8, 9, 11, 12, 14, 30. Dengan aturan pagar 1,5 kali jangkauan antar kuartil, nilai mana yang ditandai sebagai pencilan?',
    pilihan: ['Tidak ada', 'Hanya 3', 'Hanya 30', '14 dan 30', '3 dan 30'],
    benar: 2,
    jawaban: 'Hanya 30',
    pembahasan: [
      'Banyak datanya 9, jadi mediannya data ke-5, yaitu 9. Median tidak ikut masuk ke belahan mana pun.',
      'Belahan kiri: 3, 5, 6, 8. Mediannya (5 + 6) dibagi 2 sama dengan 5,5. Jadi Q1 = 5,5.',
      'Belahan kanan: 11, 12, 14, 30. Mediannya (12 + 14) dibagi 2 sama dengan 13. Jadi Q3 = 13.',
      'JAK = 13 - 5,5 = 7,5. Lalu 1,5 kali JAK sama dengan 11,25.',
      'Pagar bawah = 5,5 - 11,25 = -5,75. Pagar atas = 13 + 11,25 = 24,25.',
      'Yang berada di luar pagar hanya 30. Nilai 3 masih jauh di dalam pagar bawah, dan 14 masih di bawah 24,25.',
      'Ditandai sebagai pencilan bukan berarti harus dibuang. Ia berarti perlu diperiksa dari mana asalnya.',
    ],
  },
  {
    no: 4,
    label: 'Simpangan baku',
    pertanyaan:
      'Nilai delapan siswa: 2, 4, 4, 4, 5, 5, 7, 9. Berapa simpangan bakunya? Gunakan pembagi n seperti pada buku SMA.',
    pilihan: ['1,5', '2', '2,14', '4', '32'],
    benar: 1,
    jawaban: '2',
    pembahasan: [
      'Mean dulu: (2 + 4 + 4 + 4 + 5 + 5 + 7 + 9) dibagi 8 sama dengan 40 dibagi 8, yaitu 5.',
      'Simpangan tiap data terhadap 5: -3, -1, -1, -1, 0, 0, 2, 4.',
      'Jumlah simpangan itu nol, seperti selalu terjadi. Jadi harus dikuadratkan dulu.',
      'Kuadratnya: 9, 1, 1, 1, 0, 0, 4, 16. Jumlahnya 32.',
      'Varian = 32 dibagi 8 = 4.',
      'Simpangan baku = akar dari 4 = 2.',
      'Pilihan 4 adalah variannya, yang satuannya belum dikembalikan. Pilihan 32 adalah jumlah kuadratnya, belum dibagi.',
      'Pilihan 2,14 muncul kalau pembaginya 7, bukan 8. Pembagi n - 1 dipakai saat data kita cuma sampel dari kelompok yang jauh lebih besar, bukan untuk satu kelas yang datanya lengkap.',
      'Pilihan 1,5 adalah rata-rata jarak tanpa dikuadratkan, yaitu (3 + 1 + 1 + 1 + 0 + 0 + 2 + 4) dibagi 8. Ukuran itu ada namanya sendiri dan bukan simpangan baku.',
    ],
  },
]

/**
 * Kanal YouTube berbahasa Indonesia. Tautannya langsung ke hasil pencarian di
 * dalam kanal itu, bukan ke halaman depannya, jadi siswa cukup satu klik.
 * Kanalnya sama dengan yang dipakai topik lain di situs ini; yang berbeda cuma
 * kata kunci pencariannya.
 */
export const KANAL: Kanal[] = [
  {
    nama: 'm4th-lab',
    handle: '@m4thlab',
    url: 'https://www.youtube.com/@m4thlab',
    cari: 'statistika data kelompok kelas 10',
  },
  {
    nama: 'Belajar Matematika SMA',
    handle: '@TrieRush',
    url: 'https://www.youtube.com/@TrieRush',
    cari: 'ukuran pemusatan dan penyebaran data',
  },
  {
    nama: 'Bimbel SMARRT',
    handle: '@BimbelSMARRT',
    url: 'https://www.youtube.com/@BimbelSMARRT',
    cari: 'kuartil desil persentil data kelompok',
  },
  {
    nama: 'Ajar Pipolondo',
    handle: '@AjarPipolondo',
    url: 'https://www.youtube.com/@AjarPipolondo',
    cari: 'regresi linear dan korelasi kelas 11',
  },
]
