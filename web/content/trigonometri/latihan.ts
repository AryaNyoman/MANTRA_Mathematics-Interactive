/**
 * Isi materi Trigonometri — Kelas 10, Bab 4 (Kurikulum Merdeka).
 *
 * SOAL DITULIS SENDIRI, tapi tingkat kesulitannya dikalibrasi dulu ke kunci
 * jawaban Buku Panduan Guru Kelas X Bab 4. Pola yang dipakai buku itu, dan
 * kita tiru polanya (bukan soalnya):
 *   - Latihan 4.2 no.1 : soal JEBAKAN — segitiganya bukan siku-siku
 *   - Latihan 4.1 no.2 : soal CARI-KESALAHAN — siswa mengoreksi jawaban orang
 *   - Latihan 4.4 no.2 : HITUNG dua langkah (x = 12,07 cm dsb.)
 * Tanpa kalibrasi ini soal buatan Claude cenderung satu langkah dan terlalu mudah.
 */

export type Soal = {
  no: number
  label: string
  pertanyaan: string
  pembahasan: string[]
  jawaban: string
}

export type SoalKuis = {
  pertanyaan: string
  pilihan: string[]
  /** indeks jawaban benar */
  benar: number
  /** dijelaskan setelah dijawab — termasuk kenapa yang salah itu menggoda */
  alasan: string
}

export type Kanal = {
  nama: string
  handle: string
  url: string
  /** kata kunci yang disarankan untuk dicari di kanal itu */
  cari: string
}

/* ------------------------------------------------------------------ */
/* Narasi audio — dibaca mesin TTS, mengiringi animasi Manim            */
/* Panjang ±1.050 karakter (≈70 detik). Bahasa santai, sesuai permintaan */
/* ------------------------------------------------------------------ */

export const NARASI = `
Coba perhatikan dua segitiga ini. Yang satu kecil, yang satu jauh lebih besar.
Tapi sudut yang ditandai theta ini, besarnya sama persis.
Sekarang kita hitung. Di segitiga kecil, sisi depannya satu koma delapan sentimeter,
sisi sampingnya dua koma empat sentimeter. Kalau dibagi, hasilnya nol koma tujuh lima.
Lalu segitiganya kita besarkan. Sisi depannya jadi tiga sentimeter, sisi sampingnya
jadi empat sentimeter. Angkanya berubah semua. Tapi coba bagi lagi: tiga dibagi empat.
Hasilnya? Nol koma tujuh lima. Sama persis.
Nah, di sinilah banyak orang salah paham. Waktu kita menekan tombol tangen di kalkulator,
kita sering mengira jawabannya itu angka mati yang sudah dihafal mesin.
Padahal bukan. Yang kita hitung itu perbandingan. Sisi depan dibagi sisi samping.
Dan justru karena ia perbandingan, ukurannya tidak penting.
Mau segitiganya sebesar buku tulis atau sebesar lapangan bola, selama sudutnya sama,
hasil baginya tetap sama.
Itulah sebabnya kalkulator sanggup menjawab, walaupun ia tidak pernah tahu
segitiga mana yang sedang kamu maksud.
`.trim()

/* ------------------------------------------------------------------ */
/* Latihan — 4 soal bertingkat                                          */
/* ------------------------------------------------------------------ */

export const LATIHAN: Soal[] = [
  {
    no: 1,
    label: 'Rasio yang tidak berubah · 2 langkah',
    pertanyaan:
      'Segitiga siku-siku PQR dan STU sebangun. Pada PQR, sisi depan sudut θ panjangnya 3 cm dan sisi sampingnya 4 cm. Pada STU, sisi miringnya 20 cm. Tentukan panjang sisi depan dan sisi samping pada STU.',
    pembahasan: [
      'Cari dulu sisi miring PQR dengan Pythagoras: √(3² + 4²) = √25 = 5 cm.',
      'Bandingkan sisi miring keduanya untuk mendapat faktor pembesaran: 20 ÷ 5 = 4.',
      'Karena sebangun, semua sisi ikut dikali 4. Sisi depan STU = 3 × 4 = 12 cm, sisi samping = 4 × 4 = 16 cm.',
      'Periksa ulang: tan θ pada STU = 12/16 = 0,75 — sama persis dengan 3/4 pada PQR. Perbandingannya memang tidak ikut berubah.',
    ],
    jawaban: 'sisi depan 12 cm, sisi samping 16 cm',
  },
  {
    no: 2,
    label: 'Jebakan · periksa syaratnya dulu',
    pertanyaan:
      'Pada segitiga ABC diketahui ∠A = 50°, AB = 6 cm, dan BC = 7 cm. Seorang siswa menulis: “tan 50° = BC/AB = 7/6”. Apakah langkah itu benar? Jelaskan.',
    pembahasan: [
      'Salah. Soal tidak pernah menyebut segitiga ABC siku-siku.',
      'Perbandingan sin, cos, dan tan yang dipelajari di bab ini hanya berlaku untuk segitiga siku-siku — istilah “sisi depan”, “sisi samping”, dan “sisi miring” baru punya arti kalau ada sudut siku-sikunya.',
      'Jadi 7/6 tidak boleh disebut tan 50°.',
      'Untuk segitiga sembarang, hubungan sisi dan sudut memakai aturan sinus atau aturan kosinus — bukan materi bab ini.',
    ],
    jawaban: 'Salah — segitiganya belum tentu siku-siku',
  },
  {
    no: 3,
    label: 'Cari kesalahannya',
    pertanyaan:
      'Segitiga ABC siku-siku di B. Diketahui ∠A = 30° dan BC = 5 cm. Rani menulis: “tan 30° = BC/AC = 5/AC”. Di mana letak kesalahan Rani, dan bagaimana seharusnya?',
    pembahasan: [
      'Kesalahannya pada pemilihan sisi penyebut. Karena siku-siku di B, sisi yang menghadap sudut B adalah AC — jadi AC adalah sisi MIRING, bukan sisi samping.',
      'Tangen memakai sisi depan dibagi sisi SAMPING, bukan dibagi sisi miring.',
      'Terhadap sudut A: sisi depan = BC, sisi samping = AB, sisi miring = AC.',
      'Yang benar: tan 30° = BC/AB = 5/AB.',
      'Kalau memang AC yang ingin dipakai, perbandingannya bukan tangen melainkan sinus: sin 30° = BC/AC = 5/AC.',
    ],
    jawaban: 'AC adalah sisi miring; seharusnya tan 30° = BC/AB',
  },
  {
    no: 4,
    label: 'Terapan · dua kali tangen',
    pertanyaan:
      'Dari puncak sebuah menara setinggi 40 m, sudut depresi ke sebuah mobil adalah 25°. Mobil itu lalu bergerak mendekati menara sampai sudut depresinya menjadi 40°. Berapa jarak yang ditempuh mobil? (bulatkan sampai satu angka di belakang koma)',
    pembahasan: [
      'Sudut depresi dari puncak sama besar dengan sudut elevasi dari mobil ke puncak (sudut dalam berseberangan). Jadi kita punya dua segitiga siku-siku dengan tinggi yang sama, 40 m.',
      'Posisi awal: tan 25° = 40/d₁, sehingga d₁ = 40 / tan 25° = 40 / 0,4663 ≈ 85,8 m.',
      'Posisi akhir: tan 40° = 40/d₂, sehingga d₂ = 40 / tan 40° = 40 / 0,8391 ≈ 47,7 m.',
      'Jarak yang ditempuh = d₁ − d₂ ≈ 85,8 − 47,7 = 38,1 m.',
      'Perhatikan: sudut hampir dua kali lipat, tapi jaraknya tidak jadi setengahnya. Tangen tidak tumbuh secara lurus.',
    ],
    jawaban: '≈ 38,1 meter',
  },
]

/* ------------------------------------------------------------------ */
/* Kuis — 8 soal pilihan ganda                                          */
/* ------------------------------------------------------------------ */

export const KUIS: SoalKuis[] = [
  {
    pertanyaan: 'Pada segitiga siku-siku, sisi yang menghadap sudut siku-siku disebut sisi…',
    pilihan: ['depan', 'samping', 'miring', 'alas'],
    benar: 2,
    alasan: 'Sisi miring selalu yang menghadap sudut siku-siku, dan selalu sisi terpanjang.',
  },
  {
    pertanyaan: 'tan θ adalah perbandingan antara…',
    pilihan: ['depan / miring', 'samping / miring', 'depan / samping', 'miring / samping'],
    benar: 2,
    alasan: 'tan θ = depan / samping. Yang “depan / miring” itu sin, “samping / miring” itu cos.',
  },
  {
    pertanyaan:
      'Dua segitiga siku-siku sebangun. Yang kedua dua kali lebih besar. Nilai tan θ pada segitiga kedua…',
    pilihan: ['dua kali lipat', 'setengahnya', 'sama saja', 'tidak bisa ditentukan'],
    benar: 2,
    alasan:
      'Inti bab ini. Kedua sisi sama-sama dikali 2, jadi hasil baginya tidak berubah — 2a/2b = a/b.',
  },
  {
    pertanyaan: 'Segitiga siku-siku dengan sisi depan 6 cm dan sisi samping 8 cm. Nilai tan θ =',
    pilihan: ['0,60', '0,75', '0,80', '1,33'],
    benar: 1,
    alasan:
      '6/8 = 0,75. Yang menjawab 0,60 memakai depan/miring (itu sin), yang menjawab 1,33 membalik pembilang dan penyebutnya.',
  },
  {
    pertanyaan: 'Sisi depan 6 cm dan sisi miring 10 cm. Nilai sin θ =',
    pilihan: ['0,60', '0,75', '0,80', '1,67'],
    benar: 0,
    alasan: 'sin θ = depan/miring = 6/10 = 0,60. (Sisi sampingnya 8 cm, jadi cos θ = 0,80.)',
  },
  {
    pertanyaan: 'Untuk θ antara 0° dan 90°, saat θ diperbesar maka nilai tan θ…',
    pilihan: ['mengecil', 'membesar', 'tetap', 'mengecil lalu membesar'],
    benar: 1,
    alasan:
      'Sudut makin curam berarti sisi depan makin panjang dibanding sisi samping, jadi tan θ membesar — dan pertumbuhannya makin cepat mendekati 90°.',
  },
  {
    pertanyaan:
      'Pada segitiga yang TIDAK siku-siku, bolehkah tan θ dihitung sebagai sisi depan dibagi sisi samping?',
    pilihan: [
      'Boleh, asal sudutnya diketahui',
      'Boleh, asal panjang dua sisi diketahui',
      'Tidak boleh — perbandingan itu hanya berlaku pada segitiga siku-siku',
      'Boleh, asal segitiganya sama kaki',
    ],
    benar: 2,
    alasan:
      'Istilah “sisi depan”, “sisi samping”, dan “sisi miring” baru punya arti kalau ada sudut siku-siku. Untuk segitiga sembarang dipakai aturan sinus atau kosinus.',
  },
  {
    pertanyaan: 'Nilai sin θ sama dengan…',
    pilihan: ['cos θ', 'cos(90° − θ)', 'tan θ', 'cos(180° − θ)'],
    benar: 1,
    alasan:
      'Pada segitiga siku-siku, kedua sudut lancipnya berjumlah 90°. Sisi depan sudut yang satu adalah sisi samping sudut yang lain — jadi sin θ = cos(90° − θ).',
  },
]

/* ------------------------------------------------------------------ */
/* Belajar lebih lanjut — kanal Indonesia, sudah diverifikasi ada       */
/* Kami menautkan KANAL-nya, bukan video tertentu, supaya tautannya     */
/* tidak mati saat video dihapus atau diganti pemiliknya.               */
/* ------------------------------------------------------------------ */

export const KANAL: Kanal[] = [
  {
    nama: 'm4th-lab',
    handle: '@m4thlab',
    url: 'https://www.youtube.com/@m4thlab',
    cari: 'perbandingan trigonometri segitiga siku-siku kelas 10',
  },
  {
    nama: 'Belajar Matematika SMA',
    handle: '@TrieRush',
    url: 'https://www.youtube.com/@TrieRush',
    cari: 'trigonometri dasar sudut istimewa',
  },
  {
    nama: 'Bimbel SMARRT',
    handle: '@BimbelSMARRT',
    url: 'https://www.youtube.com/@BimbelSMARRT',
    cari: 'perbandingan trigonometri',
  },
  {
    nama: 'Ajar Pipolondo',
    handle: '@AjarPipolondo',
    url: 'https://www.youtube.com/@AjarPipolondo',
    cari: 'soal trigonometri segitiga siku-siku',
  },
]
