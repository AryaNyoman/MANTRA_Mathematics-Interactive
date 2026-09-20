/**
 * Isi materi Trigonometri, Kelas 10, Bab 4 buku sekolah.
 *
 * SOAL DITULIS SENDIRI, tapi tingkat kesulitannya dikalibrasi dulu ke kunci
 * jawaban Buku Panduan Guru Kelas X Bab 4. Pola yang dipakai buku itu, dan
 * kita tiru polanya (bukan soalnya):
 *   - Latihan 4.2 no.1 : soal JEBAKAN, segitiganya bukan siku-siku
 *   - Latihan 4.1 no.2 : soal CARI-KESALAHAN, siswa mengoreksi jawaban orang
 *   - Latihan 4.4 no.2 : HITUNG dua langkah (x = 12,07 cm dsb.)
 * Tanpa kalibrasi ini soal buatan Claude cenderung satu langkah dan terlalu mudah.
 */

/*
 * Bentuk `Soal` dan `Kanal` dipakai bersama semua topik, jadi tinggal di
 * `content/tipe.ts` sejak 1 September 2026.
 */
export type { Soal, Kanal } from '@/content/tipe'
import type { Soal, KanalPerSubbab } from '@/content/tipe'
import { K, kanal } from '../kanal-youtube.ts'

/* Tipe SoalKuis dan bank soalnya pindah ke ./kuis.ts (1 Sep 2026). */

/* ------------------------------------------------------------------ */
/* Narasi audio, dibaca mesin TTS, mengiringi animasi Manim            */
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
Dan malah karena nilainya perbandingan, ukurannya tidak penting.
Mau segitiganya sebesar buku tulis atau sebesar lapangan bola, selama sudutnya sama,
hasil baginya tetap sama.
Itulah sebabnya kalkulator sanggup menjawab, walaupun kalkulator tidak pernah tahu
segitiga mana yang sedang kamu maksud.
`.trim()

/* ------------------------------------------------------------------ */
/* Latihan, 4 soal bertingkat                                          */
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
      'Periksa ulang: tan θ pada STU = 12/16 = 0,75 - sama persis dengan 3/4 pada PQR. Perbandingannya memang tidak ikut berubah.',
    ],
    jawaban: 'sisi depan 12 cm, sisi samping 16 cm',
    pilihan: [
      'sisi depan 12 cm, sisi samping 16 cm',
      'sisi depan 16 cm, sisi samping 12 cm',
      'sisi depan 7 cm, sisi samping 8 cm',
      'sisi depan 9 cm, sisi samping 12 cm',
      'tidak bisa ditentukan tanpa besar sudutnya',
    ],
    benar: 0,
  },
  {
    no: 2,
    label: 'Jebakan · periksa syaratnya dulu',
    pertanyaan:
      'Pada segitiga ABC diketahui ∠A = 50°, AB = 6 cm, dan BC = 7 cm. Seorang siswa menulis: “tan 50° = BC/AB = 7/6”. Apakah langkah itu benar? Jelaskan.',
    pembahasan: [
      'Salah. Soal tidak pernah menyebut segitiga ABC siku-siku.',
      'Perbandingan sin, cos, dan tan yang dipelajari di bab ini hanya berlaku untuk segitiga siku-siku - istilah “sisi depan”, “sisi samping”, dan “sisi miring” baru punya arti kalau ada sudut siku-sikunya.',
      'Jadi 7/6 tidak boleh disebut tan 50°.',
      'Untuk segitiga sembarang, hubungan sisi dan sudut memakai aturan sinus atau aturan kosinus - bukan materi bab ini.',
    ],
    jawaban: 'Salah, segitiganya belum tentu siku-siku',
    pilihan: [
      'Benar, karena tan adalah depan dibagi samping',
      'Salah, segitiganya belum tentu siku-siku',
      'Salah, seharusnya tan 50° = AB/BC',
      'Benar, tetapi hasilnya harus dibalik',
      'Salah, karena 50° bukan sudut istimewa',
    ],
    benar: 1,
  },
  {
    no: 3,
    label: 'Cari kesalahannya',
    pertanyaan:
      'Segitiga ABC siku-siku di B. Diketahui ∠A = 30° dan BC = 5 cm. Rani menulis: “tan 30° = BC/AC = 5/AC”. Di mana letak kesalahan Rani, dan bagaimana seharusnya?',
    pembahasan: [
      'Kesalahannya pada pemilihan sisi penyebut. Karena siku-siku di B, sisi yang menghadap sudut B adalah AC - jadi AC adalah sisi MIRING, bukan sisi samping.',
      'Tangen memakai sisi depan dibagi sisi SAMPING, bukan dibagi sisi miring.',
      'Terhadap sudut A: sisi depan = BC, sisi samping = AB, sisi miring = AC.',
      'Yang benar: tan 30° = BC/AB = 5/AB.',
      'Kalau memang AC yang ingin dipakai, perbandingannya bukan tangen tetapi sinus: sin 30° = BC/AC = 5/AC.',
    ],
    jawaban: 'AC adalah sisi miring; seharusnya tan 30° = BC/AB',
    pilihan: [
      'Tidak ada kesalahan, penulisannya sudah benar',
      'Kesalahannya pada nilai 30°, seharusnya 60°',
      'AC adalah sisi miring; seharusnya tan 30° = BC/AB',
      'BC bukan sisi depan sudut A, tetapi sisi samping',
      'Seharusnya memakai sin, bukan tan',
    ],
    benar: 2,
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
    pilihan: [
      '≈ 38,1 meter',
      '≈ 85,8 meter',
      '≈ 18,7 meter',
      '≈ 124,0 meter',
      '≈ 40,0 meter',
    ],
    benar: 0,
  },
]

/* ------------------------------------------------------------------ */
/* Kuis, 8 soal pilihan ganda                                          */
/* ------------------------------------------------------------------ */



/* ------------------------------------------------------------------ */
/* Belajar lebih lanjut, kanal Indonesia, sudah diverifikasi ada       */
/* Kami menautkan KANAL-nya, bukan video tertentu, supaya tautannya     */
/* tidak mati saat video dihapus atau diganti pemiliknya.               */
/* ------------------------------------------------------------------ */

export const KANAL: KanalPerSubbab = {
  // A · Perbandingan Trigonometri
  A: [
    kanal(K.bigCourse, 'trigonometri dasar', 'y1BZBU5YXcM', 'Matematika kelas X - Trigonometri dasar part 1 - Definisi, Konversi dan Dasar dasar'),
    kanal(K.billykur, 'trigonometri', 'JEd8rox_yNs', 'Pembahasan materi TRIGONOMETRI dasar! Belajar bersama di #MatematikAsik'),
    kanal(K.matemaKita, 'trigonometri dasar sin cos tan', 'u_ciJpBlFJs', 'Trigonometri Dasar: Sin Cos Tan | Depan Samping Miring | Matematika SMA'),
  ],
  // B · Lingkaran Satuan dan Sudut Istimewa
  B: [
    kanal(K.m4thlab, 'sudut istimewa semua kuadran', '-Y4w7E-cgWU', 'Cara Mudah Menentukan Nilai Trigonometri Sudut Istimewa Semua Kuadran'),
    kanal(K.seekorLebah, 'perbandingan trigonometri sudut berelasi', 'CyHFrAivR8E', 'PERBANDINGAN TRIGONOMETRI SUDUT BERELASI (10 SMA - WAJIB)'),
    kanal(K.leGuruLes, 'sistem kuadran relasi sudut trigonometri', 'sn-ZSKpLGmE', 'Matematika SMA - Trigonometri (3) -Sistem Kuadran, Relasi Sudut Trigonometri (A)'),
  ],
  // C · Grafik Fungsi Trigonometri
  C: [
    kanal(K.bigCourse, 'grafik fungsi trigonometri', 'oSfFRzijT-A', 'Matematika kelas X - Grafik Fungsi Trigonometri'),
    kanal(K.bomMatematika, 'grafik fungsi trigonometri', '1t_KJ5Gyrh0', 'Grafik fungsi trigonometri, grafik trigonometri'),
    kanal(K.jendelaSains, 'menggambar grafik fungsi trigonometri', 'ugEECyCVwnY', 'Trigonometri • Part 31: Menggambar Grafik Fungsi y=sin x dengan Lingkaran Satuan'),
  ],
  // D · Penerapan Trigonometri
  D: [
    kanal(K.leGuruLes, 'aplikasi perbandingan trigonometri sudut depresi', 'pFslqVEMmOY', 'Matematika SMA - Trigonometri (2) - Aplikasi Perbandingan Trigonometri, Sudut Depresi & Elevasi (A)'),
    kanal(K.jendelaSains, 'sudut elevasi sudut depresi', 'p4l1EEZv1AQ', 'Trigonometri • Part 29: Sudut Elevasi, Sudut Depresi, dan Jurusan Tiga Angka'),
    kanal(K.seekorLebah, 'soal cerita trigonometri', 'qmD8uhdiGxk', 'SOAL CERITA TRIGONOMETRI‼️KELUAR DI PTS DAN PAS GENAP MTK WAJIB'),
  ],
}