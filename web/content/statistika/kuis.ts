import type { SoalKuis } from '@/content/tipe'

/**
 * Bank soal kuis Statistika.
 *
 * BELUM LENGKAP. Sasarannya 32 butir seperti Trigonometri dan Limit, dengan
 * empat tingkat kesulitan, supaya empat sesi kuis pertama tidak mengulang satu
 * soal pun. Sekarang baru berisi rombongan pertama.
 *
 * Sisanya ditulis setelah kalibrasi tingkat kesulitan ke sumber nyata, sebab
 * soal buatan sendiri cenderung terlalu mudah. Itu temuan ARYA, bukan dugaan,
 * dan urutannya memang kalibrasi dulu baru menulis.
 *
 * SELURUH ANGKA berasal dari `content/statistika/data.json` dan sudah lolos
 * `alat/cek_statistik.py` serta `alat/cek_statistik_web.mjs`.
 */

export const KUIS: SoalKuis[] = [
  {
    id: 'st-01',
    tingkat: 'mudah',
    pertanyaan: 'Nilai delapan siswa: 4, 5, 6, 7, 7, 8, 8, 11. Berapa modusnya?',
    pilihan: ['7 saja', '8 saja', '7 dan 8', '11', 'Tidak punya modus'],
    benar: 2,
    alasan:
      'Angka 7 muncul dua kali dan 8 juga dua kali, sedangkan sisanya sekali. Keduanya sama-sama paling sering, jadi datanya punya dua modus. Tidak ada aturan yang mengharuskan modus cuma satu.',
  },
  {
    id: 'st-02',
    tingkat: 'mudah',
    pertanyaan: 'Nilai delapan siswa: 6, 6, 7, 7, 7, 7, 8, 8. Berapa rata-ratanya?',
    pilihan: ['6', '6,5', '7', '7,5', '8'],
    benar: 2,
    alasan:
      'Jumlahnya 56 dan banyak datanya 8, jadi 56 dibagi 8 sama dengan 7. Perhatikan mediannya juga 7 dan modusnya juga 7. Untuk data yang setangkup seperti ini, ketiganya memang sering berimpit.',
  },
  {
    id: 'st-03',
    tingkat: 'sedang',
    pertanyaan:
      'Dua kelas punya rata-rata, median, dan modus yang sama persis, yaitu 7. Apa yang PASTI bisa disimpulkan?',
    pilihan: [
      'Kedua kelas punya nilai yang sama',
      'Kedua kelas punya sebaran yang sama',
      'Kedua kelas punya jangkauan yang sama',
      'Belum ada yang bisa disimpulkan tentang sebarannya',
      'Kedua kelas punya banyak siswa yang sama',
    ],
    benar: 3,
    alasan:
      'Ukuran pemusatan sama sekali tidak bicara soal sebaran. Contoh di Materi 01 memperlihatkan dua kelas dengan ketiga ukuran itu sama persis, tetapi jangkauannya 2 lawan 8 dan simpangan bakunya 0,71 lawan 2,69.',
  },
  {
    id: 'st-04',
    tingkat: 'sedang',
    pertanyaan:
      'Dari 40 siswa, 12 di antaranya berangkat naik sepeda motor. Berapa frekuensi relatifnya?',
    pilihan: ['0,12', '0,3', '3', '12 persen', '30'],
    benar: 1,
    alasan:
      'Frekuensi relatif adalah frekuensi dibagi banyak data, yaitu 12 dibagi 40 sama dengan 0,3. Dalam bentuk persen itu 30 persen. Pilihan 0,12 dan 12 persen muncul kalau angka 12 dianggap sudah berupa bagian, padahal ia jumlah orang.',
  },
  {
    id: 'st-05',
    tingkat: 'sulit',
    pertanyaan:
      'Tabel nilai 40 siswa: kelas 40-49 ada 3 siswa, 50-59 ada 8, 60-69 ada 12, 70-79 ada 9, 80-89 ada 6, 90-99 ada 2. Berapa mediannya?',
    pilihan: ['64,5', '65,21', '67', '67,75', '69,5'],
    benar: 2,
    alasan:
      'Setengah dari 40 adalah 20. Frekuensi kumulatifnya 3, lalu 11, lalu 23, jadi median jatuh di kelas 60-69 dengan tepi bawah 59,5. Rumusnya 59,5 + ((20 - 11) dibagi 12) kali 10, hasilnya 59,5 + 7,5 = 67. Pilihan 67,75 adalah meannya, dan 65,21 adalah modusnya. Ketiganya memang berdekatan, dan itu yang membuat soal ini menjebak.',
  },
  {
    id: 'st-06',
    tingkat: 'sangat sulit',
    pertanyaan:
      'Sekumpulan data punya koefisien korelasi r = 0. Manakah yang benar?',
    pilihan: [
      'Kedua peubah pasti tidak berhubungan sama sekali',
      'Kedua peubah tidak punya hubungan LURUS, tetapi bisa saja berhubungan melengkung',
      'Datanya pasti salah kumpul',
      'Garis regresinya tidak ada',
      'Kedua peubah pasti berhubungan terbalik',
    ],
    benar: 1,
    alasan:
      'r hanya mengukur kelurusan. Data x = -3 sampai 3 dengan y = x kuadrat punya r tepat nol, padahal setiap y bisa ditebak dengan sempurna dari x nya. Itu sebabnya angka r tidak pernah boleh dibaca tanpa melihat diagram pencarnya.',
  },
]
