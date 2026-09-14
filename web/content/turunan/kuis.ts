/**
 * Bank soal latihan Turunan: 60 soal, 15 tiap tingkat.
 *
 * 14 Sep 2026: seluruh pembahasan ditulis ulang meniru cara mathcyber1997
 * (catatan belajar `PELAJARI BENTUK SOAL MATEMATIKA/CATATAN-BELAJAR-PEMBAHASAN.md`
 * bagian 4.3): "Gunakan aturan turunan dasar." lalu bentuk ditulis ke pangkat
 * dan turunannya ditulis dengan pangkat yang masih terlihat; pada aturan
 * hasil kali dan rantai bagian-bagiannya DINAMAI ("Misalkan u = x² + 3
 * sehingga u′ = 2x"); konsep didefinisikan sebelum dihitung ("Laju perubahan
 * pada saat x = 2 dinyatakan oleh f′(2)"); optimasi: peubah dimisalkan
 * beserta artinya, kendala dipakai menghapus satu peubah, fungsi sasaran
 * dibentuk, "akan maksimum saat L′(x) = 0", akar yang tidak masuk akal
 * dibuang dengan alasan, lalu nilai disubstitusikan; laju terkait lewat
 * aturan rantai dV/dt = dV/dr · dr/dt; penutup "Jadi, ... (Jawaban B)".
 * Gambar bantu: grafik dengan garis singgung dan dua titik yang dilewatinya,
 * garis bilangan uji tanda untuk naik/turun, sketsa benda dengan peubahnya.
 *
 * Id soal lama dipertahankan. Delapan soal yang kembar atau terlalu tipis
 * diganti jenis yang belum ada (pola mathcyber1997, ditulis sendiri):
 * mudah-09 dan mudah-13 jadi mudah-16 (membaca f′(0) dari garis singgung
 * pada grafik) dan mudah-17 (x√x ditulis ke pangkat); sedang-06 dan
 * sedang-15 jadi sedang-16 ((f∘g)′ lewat rantai) dan sedang-17 (f′ dari
 * f(2x + 1) yang diketahui); sulit-06 dan sulit-13 jadi sulit-16
 * (percepatan saat kecepatan nol) dan sulit-17 (selang turun dengan
 * parameter); sangat-07 dan sangat-09 jadi sangat-16 (luas minimum segitiga
 * oleh garis lewat (4, 3)) dan sangat-17 (laju terkait kerucut dengan
 * kesebangunan). Jawaban benar semula SEMUA di pilihan A; sekarang disebar
 * oleh `alat/acak_pilihan.mjs`.
 *
 * Tiap jawaban berangka punya `// cek:` (turunan dihitung numerik dengan
 * beda hingga) yang dijalankan `alat/cek_kuis.mjs`; `--ketat` juga memeriksa
 * gaya pembahasannya.
 */
export type { TingkatKuis, SoalKuis } from '@/content/tipe'
import type { SoalKuis } from '@/content/tipe'

export const KUIS: SoalKuis[] = [
  // ================================================================ MUDAH
  {
    // cek: Math.abs((1.0001**5 - 0.9999**5) / 2e-4 - 5) < 1e-6
    id: 'turunan-mudah-01',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = x⁵ adalah…',
    pilihan: ['x⁴', '5x⁶', '5x⁴', '4x⁵', '5x'],
    benar: 2,
    langkah: [
      'Gunakan aturan turunan dasar untuk fungsi pangkat: jika f(x) = xⁿ, maka f′(x) = n·xⁿ⁻¹; pangkatnya turun ke depan sebagai pengali, lalu pangkatnya berkurang satu.',
      'Dengan n = 5, diperoleh f′(x) = 5·x⁵⁻¹ = 5x⁴.',
      'Jadi, turunan dari f(x) = x⁵ adalah 5x⁴. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, 5x⁶, menaikkan pangkat alih-alih menurunkannya; itu arah integral. Pilihan D, 4x⁵, memakai pangkat baru sebagai pengali, padahal pengalinya pangkat lama (5). Pilihan A, x⁴, lupa mengalikan dengan 5.',
    alasan: 'Aturan pangkat: (xⁿ)′ = n·xⁿ⁻¹, jadi 5x⁴.',
  },
  {
    // cek: Math.abs((7 - 7) / 2e-4) < 1e-9
    id: 'turunan-mudah-02',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = 7 adalah…',
    gambar: { jenis: 'grafik', fungsi: ['7'], jangkauan: [-3, 3, 0, 9] },
    pilihan: ['7', '7x', '1', '0', 'tidak ada'],
    benar: 3,
    langkah: [
      'Ingat bahwa turunan menyatakan laju perubahan nilai fungsi terhadap x, atau secara geometris, gradien garis singgung grafiknya.',
      {
        teks: 'Fungsi f(x) = 7 bernilai tetap: berapa pun x-nya, nilainya 7, sehingga tidak pernah berubah. Grafiknya garis mendatar y = 7 yang gradiennya 0, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['7'], jangkauan: [-3, 3, 0, 9], nama: ['y = 7, gradien 0 di setiap titik'] },
      },
      'Dengan aturan turunan dasar, turunan konstanta adalah 0: f′(x) = 0. (Bisa juga dilihat sebagai 7 = 7x⁰, sehingga f′(x) = 7·0·x⁻¹ = 0.)',
      'Jadi, turunan dari f(x) = 7 adalah 0. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 7, mengira turunan konstanta adalah konstanta itu sendiri; yang berlaku begitu hanyalah eˣ. Pilihan C, 1, adalah turunan dari f(x) = x, bukan dari konstanta.',
    alasan: 'Nilai tetap tidak berubah, gradien garis datar 0: turunan konstanta = 0.',
  },
  {
    // cek: Math.abs(((3*1.0001**2 - 5*1.0001 + 2) - (3*0.9999**2 - 5*0.9999 + 2)) / 2e-4 - 1) < 1e-6
    id: 'turunan-mudah-03',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = 3x² − 5x + 2 adalah…',
    pilihan: ['6x − 5', '6x − 5 + 2', '3x − 5', '6x + 5', '6x² − 5x'],
    benar: 0,
    langkah: [
      'Gunakan aturan turunan dasar suku demi suku: turunan jumlah adalah jumlah turunannya, konstanta pengali tetap ikut, dan turunan konstanta adalah 0.',
      'Turunkan tiap suku: (3x²)′ = 3·2x²⁻¹ = 6x; (−5x)′ = −5·1·x⁰ = −5; (2)′ = 0.',
      'Dengan demikian, f′(x) = 6x − 5 + 0 = 6x − 5.',
      'Jadi, turunan dari f(x) = 3x² − 5x + 2 adalah 6x − 5. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 6x − 5 + 2, membiarkan konstanta 2 ikut, padahal turunan konstanta adalah 0. Pilihan C, 3x − 5, lupa mengalikan koefisien 3 dengan pangkat 2. Pilihan E, 6x² − 5x, hanya menurunkan pangkat pengali tanpa mengurangi pangkatnya.',
    alasan: 'Suku demi suku: 6x − 5 + 0.',
  },
  {
    // cek: Math.abs((Math.sqrt(4.0001) - Math.sqrt(3.9999)) / 2e-4 - 0.25) < 1e-6
    id: 'turunan-mudah-04',
    tingkat: 'mudah',
    pertanyaan: 'Jika f(x) = √x, nilai f′(4) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.sqrt(x)'], jangkauan: [0, 9, 0, 4], titik: [{ x: 4, y: 2, label: '(4, 2)' }] },
    pilihan: ['1/2', '2', '1/4', '1/8', '4'],
    benar: 2,
    langkah: [
      'Gunakan aturan turunan dasar dengan menulis bentuk akar ke bentuk pangkat lebih dulu: f(x) = √x = x^(1/2).',
      'Dengan aturan pangkat, f′(x) = (1/2)·x^(1/2 − 1) = (1/2)·x^(−1/2) = 1/(2√x).',
      'Substitusikan x = 4, diperoleh f′(4) = 1/(2√4) = 1/(2·2) = 1/4.',
      {
        teks: 'Secara geometris, f′(4) = 1/4 adalah gradien garis singgung kurva y = √x di titik (4, 2), yaitu garis y = (1/4)x + 1, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['Math.sqrt(x)', '0.25*x + 1'], jangkauan: [0, 9, 0, 4], titik: [{ x: 4, y: 2, label: '(4, 2)' }], nama: ['y = √x', 'garis singgung, gradien 1/4'] },
      },
      'Jadi, nilai f′(4) = 1/4. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 1/2, berhenti pada pengali 1/2 tanpa menghitung x^(−1/2) = 1/√4 = 1/2 lalu mengalikannya. Pilihan B, 2, adalah nilai f(4) = √4, bukan turunannya.',
    alasan: '√x = x^(1/2), turunannya 1/(2√x); di x = 4 nilainya 1/4.',
  },
  {
    // cek: (68 - 20) / (5 - 1) === 12
    id: 'turunan-mudah-05',
    tingkat: 'mudah',
    pertanyaan: 'Sebuah benda menempuh jarak 20 meter pada detik ke-1 dan 68 meter pada detik ke-5. Kecepatan rata-ratanya pada selang itu adalah…',
    gambar: { jenis: 'tabel', kepala: ['t (detik)', 's (meter)'], baris: [['1', '20'], ['5', '68']] },
    pilihan: ['48 m/s', '17 m/s', '12 m/s', '13,6 m/s', '4 m/s'],
    benar: 2,
    langkah: [
      'Kecepatan rata-rata pada suatu selang waktu didefinisikan sebagai perubahan jarak dibagi perubahan waktu, yaitu Δs/Δt; secara geometris, ini gradien garis yang menghubungkan kedua titik pada grafik jarak terhadap waktu.',
      {
        teks: 'Lengkapi tabel dengan perubahannya: Δs = 68 − 20 = 48 meter dan Δt = 5 − 1 = 4 detik.',
        gambar: { jenis: 'tabel', kepala: ['t (detik)', 's (meter)', 'perubahan'], baris: [['1', '20', ''], ['5', '68', 'Δs = 48, Δt = 4']], kolomBaru: [2] },
      },
      'Untuk itu, kecepatan rata-rata = Δs/Δt = 48/4 = 12 m/s.',
      'Jadi, kecepatan rata-rata benda pada selang itu adalah 12 m/s. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, 17 m/s, membagi 68 dengan 4 (jarak akhir dibagi selang waktu), padahal yang dibagi adalah PERUBAHAN jarak. Pilihan D, 13,6 m/s, membagi 68 dengan 5, seolah benda mulai dari 0 pada detik ke-0. Pilihan A, 48 m/s, lupa membagi dengan waktu.',
    alasan: 'Kecepatan rata-rata = Δs/Δt = (68 − 20)/(5 − 1) = 12 m/s.',
  },
  {
    // cek: Math.abs((Math.sin(0.0001) - Math.sin(-0.0001)) / 2e-4 - Math.cos(0)) < 1e-6
    id: 'turunan-mudah-06',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = sin x adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.sin(x)'], jangkauan: [-6.5, 6.5, -1.5, 1.5], nama: ['y = sin x'] },
    pilihan: ['cos x', '−cos x', '−sin x', 'sin x', 'tan x'],
    benar: 0,
    langkah: [
      'Gunakan aturan turunan dasar fungsi trigonometri: (sin x)′ = cos x dan (cos x)′ = −sin x.',
      {
        teks: 'Hubungan itu terbaca pada grafik: di x = 0 kurva sin x sedang menanjak paling curam dengan gradien 1, dan cos 0 = 1; di puncak x = π/2 gradiennya 0, dan cos(π/2) = 0; di x = π kurva menurun dengan gradien −1, dan cos π = −1, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['Math.sin(x)', 'Math.cos(x)'], jangkauan: [-6.5, 6.5, -1.5, 1.5], titik: [{ x: 1.5708, y: 1, label: 'gradien 0' }], nama: ['y = sin x', 'y = cos x = gradien sin x'] },
      },
      'Jadi, turunan dari f(x) = sin x adalah cos x. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, −cos x, adalah turunan dari −sin x atau hasil menukar rumus dengan turunan cos x. Pilihan C, −sin x, adalah turunan cos x. Urutan yang benar: sin → cos → −sin → −cos → sin.',
    alasan: '(sin x)′ = cos x: gradien sin x di 0 adalah 1 = cos 0.',
  },
  {
    // cek: Math.abs((1/2.0001**2 - 1/1.9999**2) / 2e-4 - (-2/8)) < 1e-6
    id: 'turunan-mudah-07',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = 1/x² adalah…',
    gambar: { jenis: 'grafik', fungsi: ['1/(x*x)'], jangkauan: [0.3, 4, 0, 5] },
    pilihan: ['−2/x³', '2/x³', '−1/x³', '−2/x', '1/(2x)'],
    benar: 0,
    langkah: [
      'Gunakan aturan turunan dasar dengan menulis bentuk pecahan ke bentuk pangkat negatif lebih dulu: f(x) = 1/x² = x⁻².',
      'Dengan aturan pangkat, f′(x) = (−2)·x^(−2 − 1) = −2x⁻³.',
      'Tulis kembali ke bentuk pecahan: f′(x) = −2/x³.',
      'Jadi, turunan dari f(x) = 1/x² adalah −2/x³. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 2/x³, lupa tanda negatif dari pangkat −2 yang turun ke depan. Pilihan D, −2/x, mengurangi pangkat dari −2 menjadi −1, padahal pangkat berkurang satu menjadi −3. Pilihan C, −1/x³, lupa pengali 2.',
    alasan: '1/x² = x⁻², turunannya −2x⁻³ = −2/x³.',
  },
  {
    // cek: Math.abs((2*1.0001**3 - 2*0.9999**3) / 2e-4 - 6) < 1e-6
    id: 'turunan-mudah-08',
    tingkat: 'mudah',
    pertanyaan: 'Jika f(x) = 2x³, nilai f′(1) adalah…',
    pilihan: ['2', '3', '9', '1', '6'],
    benar: 4,
    langkah: [
      'Gunakan aturan turunan dasar: f′(x) = 2·3·x³⁻¹ = 6x².',
      'Substitusikan x = 1, diperoleh f′(1) = 6·1² = 6.',
      'Jadi, nilai f′(1) = 6. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 2, adalah nilai f(1) = 2·1³, bukan turunannya. Pilihan B, 3, hanya mengambil pangkat tanpa mengalikannya dengan koefisien 2.',
    alasan: 'f′(x) = 6x², jadi f′(1) = 6.',
  },
  {
    // cek: Math.abs((6 - 2) / (-1 - 0) + 4) < 1e-9
    id: 'turunan-mudah-16',
    tingkat: 'mudah',
    pertanyaan: 'Garis singgung kurva y = f(x) di titik dengan absis 0 melalui titik (−1, 6) dan (0, 2). Nilai f′(0) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x - 4*x + 2', '-4*x + 2'], jangkauan: [-2, 4, -3, 8], titik: [{ x: -1, y: 6, label: '(-1, 6)' }, { x: 0, y: 2, label: '(0, 2)' }], nama: ['y = f(x)', 'garis singgung di x = 0'] },
    pilihan: ['4', '−4', '−1/4', '2', '6'],
    benar: 1,
    langkah: [
      'Ingat bahwa f′(0) menyatakan gradien garis singgung kurva y = f(x) di titik dengan absis 0.',
      {
        teks: 'Tampak pada grafik bahwa garis singgung itu melalui (−1, 6) dan (0, 2), sehingga gradiennya adalah m = (6 − 2)/(−1 − 0) = 4/(−1) = −4, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x - 4*x + 2', '-4*x + 2'], jangkauan: [-2, 4, -3, 8], titik: [{ x: -1, y: 6, label: '(-1, 6)' }, { x: 0, y: 2, label: '(0, 2)' }], nama: ['y = f(x)', 'gradien = (6 − 2)/(−1 − 0) = −4'] },
      },
      'Dengan demikian, f′(0) = m = −4. Nilai negatif ini sesuai dengan grafik yang sedang menurun di x = 0.',
      'Jadi, nilai f′(0) = −4. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 4, salah tanda saat membagi 4 dengan −1; kurva yang turun harus bergradien negatif. Pilihan D, 2, adalah nilai f(0) (ordinat titik singgung), bukan gradiennya. Pilihan C, −1/4, membalik pecahan gradien.',
    alasan: 'f′(0) = gradien garis singgung = (6 − 2)/(−1 − 0) = −4.',
  },
  {
    // cek: Math.abs(((2.0001**2 + 3*2.0001) - (1.9999**2 + 3*1.9999)) / 2e-4 - 7) < 1e-6
    id: 'turunan-mudah-10',
    tingkat: 'mudah',
    pertanyaan: 'Jika f(x) = x² + 3x, nilai f′(2) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x + 3*x'], jangkauan: [-4, 3, -3, 12], titik: [{ x: 2, y: 10, label: '(2, 10)' }] },
    pilihan: ['10', '4', '5', '7', '3'],
    benar: 3,
    langkah: [
      'Gunakan aturan turunan dasar suku demi suku: f′(x) = 2x²⁻¹ + 3·1 = 2x + 3.',
      'Substitusikan x = 2, diperoleh f′(2) = 2(2) + 3 = 4 + 3 = 7.',
      {
        teks: 'Secara geometris, 7 adalah gradien garis singgung kurva di titik (2, 10), yaitu garis y = 7x − 4, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x + 3*x', '7*x - 4'], jangkauan: [-4, 3, -3, 12], titik: [{ x: 2, y: 10, label: '(2, 10)' }], nama: ['y = x² + 3x', 'garis singgung, gradien 7'] },
      },
      'Jadi, nilai f′(2) = 7. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 10, adalah nilai f(2) = 4 + 6, bukan turunannya. Pilihan B, 4, hanya menghitung 2x tanpa menambahkan turunan suku 3x. Pilihan E, 3, hanya turunan suku 3x.',
    alasan: 'f′(x) = 2x + 3, jadi f′(2) = 7.',
  },
  {
    // cek: Math.abs((Math.cos(1.0001) - Math.cos(0.9999)) / 2e-4 - (-Math.sin(1))) < 1e-6
    id: 'turunan-mudah-11',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = cos x adalah…',
    pilihan: ['sin x', '−cos x', '−sin x', 'cos x', 'tan x'],
    benar: 2,
    langkah: [
      'Gunakan aturan turunan dasar fungsi trigonometri: (cos x)′ = −sin x.',
      {
        teks: 'Tanda negatifnya terbaca pada grafik: tepat setelah x = 0 kurva cos x mulai menurun (gradien negatif), padahal sin x di sana positif, sehingga gradiennya adalah −sin x, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['Math.cos(x)', '-Math.sin(x)'], jangkauan: [-6.5, 6.5, -1.5, 1.5], nama: ['y = cos x', 'y = −sin x = gradien cos x'] },
      },
      'Jadi, turunan dari f(x) = cos x adalah −sin x. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, sin x, lupa tanda negatif; kurva cos x turun setelah puncaknya di x = 0, sehingga gradiennya harus negatif di sana. Pilihan B, −cos x, adalah turunan kedua sin x, atau turunan dari sin x yang tertukar.',
    alasan: '(cos x)′ = −sin x; cos turun tepat setelah puncak x = 0.',
  },
  {
    // cek: Math.abs((Math.exp(1.0001) - Math.exp(0.9999)) / 2e-4 - Math.E) < 1e-6
    id: 'turunan-mudah-12',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = eˣ adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.exp(x)'], jangkauan: [-2, 2.5, 0, 8] },
    pilihan: ['x · e^(x−1)', 'e', '1', 'eˣ', 'x eˣ'],
    benar: 3,
    langkah: [
      'Ingat bahwa eˣ adalah fungsi EKSPONEN: peubah x berada di pangkat, sedangkan bilangan e ≈ 2,718 tetap. Aturan pangkat (xⁿ)′ = n·xⁿ⁻¹ hanya berlaku bila peubahnya di alas, jadi tidak boleh dipakai di sini.',
      'Sifat istimewa fungsi eksponen alami: turunannya sama dengan dirinya sendiri, (eˣ)′ = eˣ. Laju pertumbuhannya di tiap titik sama dengan nilainya di titik itu.',
      {
        teks: 'Sebagai gambaran, di titik (1, e) gradien garis singgungnya juga e ≈ 2,718, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['Math.exp(x)', 'Math.E*x'], jangkauan: [-2, 2.5, 0, 8], titik: [{ x: 1, y: 2.718, label: '(1, e)' }], nama: ['y = eˣ', 'garis singgung, gradien e'] },
      },
      'Jadi, turunan dari f(x) = eˣ adalah eˣ. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, x · e^(x−1), memakai aturan pangkat seolah eˣ adalah xᵉ; aturan itu untuk peubah di alas, bukan di pangkat. Pilihan E, x eˣ, adalah turunan yang keliru dari aturan hasil kali yang tidak diperlukan di sini.',
    alasan: '(eˣ)′ = eˣ: turunan fungsi eksponen alami sama dengan dirinya.',
  },
  {
    // cek: Math.abs((4.0001**1.5 - 3.9999**1.5) / 2e-4 - 3) < 1e-5
    id: 'turunan-mudah-17',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = x√x adalah…',
    pilihan: ['√x', '(3/2)√x', '(1/2)√x', '3√x', 'x/(2√x)'],
    benar: 1,
    langkah: [
      'Gunakan aturan turunan dasar dengan menulis bentuk akar ke bentuk pangkat lebih dulu: f(x) = x√x = x¹ · x^(1/2) = x^(1 + 1/2) = x^(3/2).',
      'Dengan aturan pangkat, f′(x) = (3/2)·x^(3/2 − 1) = (3/2)·x^(1/2).',
      'Tulis kembali ke bentuk akar: f′(x) = (3/2)√x.',
      'Sebagai pemeriksaan di x = 4: f′(4) = (3/2)(2) = 3, dan memang f(x) = x^(3/2) naik dari 8 di x = 4 dengan laju sekitar 3 per satuan x.',
      'Jadi, turunan dari f(x) = x√x adalah (3/2)√x. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, √x, menurunkan x saja dan membiarkan √x seolah konstanta; √x memuat x sehingga ikut diturunkan. Pilihan E, x/(2√x), hanya menurunkan √x dan membiarkan x; keduanya harus digabung (aturan hasil kali memberi √x + x/(2√x) = (3/2)√x, sama).',
    alasan: 'x√x = x^(3/2), turunannya (3/2)x^(1/2) = (3/2)√x.',
  },
  {
    // cek: (9 - 1) / (3 - 1) === 4
    id: 'turunan-mudah-14',
    tingkat: 'mudah',
    pertanyaan: 'Tinggi air dalam tangki setelah t menit adalah h(t) = t² cm. Laju rata-rata kenaikan air dari menit ke-1 sampai menit ke-3 adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [0, 4, 0, 12], titik: [{ x: 1, y: 1, label: '(1, 1)' }, { x: 3, y: 9, label: '(3, 9)' }] },
    pilihan: ['4 cm/menit', '8 cm/menit', '3 cm/menit', '6 cm/menit', '2 cm/menit'],
    benar: 0,
    langkah: [
      'Laju rata-rata kenaikan pada selang 1 ≤ t ≤ 3 didefinisikan sebagai perubahan tinggi dibagi perubahan waktu, Δh/Δt, yaitu gradien garis yang menghubungkan titik (1, h(1)) dan (3, h(3)) pada grafik.',
      'Hitung tingginya: h(1) = 1² = 1 cm dan h(3) = 3² = 9 cm, sehingga Δh = 9 − 1 = 8 cm dan Δt = 3 − 1 = 2 menit.',
      {
        teks: 'Untuk itu, laju rata-rata = 8/2 = 4 cm/menit, yaitu gradien garis yang menghubungkan (1, 1) dan (3, 9), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x', '4*x - 3'], jangkauan: [0, 4, 0, 12], titik: [{ x: 1, y: 1, label: '(1, 1)' }, { x: 3, y: 9, label: '(3, 9)' }], nama: ['h = t²', 'garis penghubung, gradien 4'] },
      },
      'Jadi, laju rata-rata kenaikan air adalah 4 cm/menit. (Jawaban A)',
    ],
    jebakan: 'Pilihan D, 6 cm/menit, adalah laju SESAAT pada t = 3 (h′(3) = 2·3), bukan laju rata-rata pada selang itu. Pilihan B, 8 cm/menit, lupa membagi dengan Δt = 2. Pilihan C, 3 cm/menit, membagi 9 dengan 3 seolah mulai dari t = 0.',
    alasan: 'Δh/Δt = (9 − 1)/(3 − 1) = 4 cm/menit.',
  },
  {
    // cek: Math.abs((1/2.0001 - 1/1.9999) / 2e-4 - (-1/4)) < 1e-6
    id: 'turunan-mudah-15',
    tingkat: 'mudah',
    pertanyaan: 'Turunan dari f(x) = 1/x adalah…',
    gambar: { jenis: 'grafik', fungsi: ['1/x'], jangkauan: [0.3, 5, 0, 4] },
    pilihan: ['1/x²', '−1/x²', 'ln x', '−1/x', '1'],
    benar: 1,
    langkah: [
      'Gunakan aturan turunan dasar dengan menulis bentuk pecahan ke bentuk pangkat negatif lebih dulu: f(x) = 1/x = x⁻¹.',
      'Dengan aturan pangkat, f′(x) = (−1)·x^(−1 − 1) = −x⁻² = −1/x².',
      {
        teks: 'Tanda negatifnya sesuai grafik: kurva y = 1/x selalu menurun untuk x > 0, sehingga gradiennya selalu negatif, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['1/x', '-0.25*x + 1'], jangkauan: [0.3, 5, 0, 4], titik: [{ x: 2, y: 0.5, label: '(2, 1/2), gradien −1/4' }], nama: ['y = 1/x', 'garis singgung di x = 2'] },
      },
      'Jadi, turunan dari f(x) = 1/x adalah −1/x². (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 1/x², lupa tanda negatif dari pangkat −1 yang turun ke depan; padahal kurva menurun sehingga gradiennya negatif. Pilihan C, ln x, adalah INTEGRAL dari 1/x, arah yang berlawanan.',
    alasan: '1/x = x⁻¹, turunannya −x⁻² = −1/x².',
  },
  // =============================================================== SEDANG
  {
    // cek: Math.abs((((2.0001**2 + 3)*(2.0001 - 1)) - ((1.9999**2 + 3)*(1.9999 - 1))) / 2e-4 - 11) < 1e-5
    id: 'turunan-sedang-01',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = (x² + 3)(x − 1), nilai f′(2) adalah…',
    pilihan: ['7', '4', '11', '14', '3'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa f adalah hasil kali dua fungsi, sehingga dipakai aturan hasil kali: jika f = u·v, maka f′ = u′v + uv′.',
      'Misalkan u = x² + 3 sehingga u′ = 2x, dan v = x − 1 sehingga v′ = 1.',
      'Dengan aturan hasil kali dalam turunan, diperoleh f′(x) = u′v + uv′ = 2x(x − 1) + (x² + 3)(1) = 2x² − 2x + x² + 3 = 3x² − 2x + 3.',
      'Substitusikan x = 2, diperoleh f′(2) = 3(4) − 2(2) + 3 = 12 − 4 + 3 = 11.',
      'Sebagai pemeriksaan, kalikan dulu: f(x) = x³ − x² + 3x − 3, sehingga f′(x) = 3x² − 2x + 3 dan f′(2) = 11, sama.',
      'Jadi, nilai f′(2) = 11. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, 4, mengalikan turunan masing-masing, u′·v′ = 2x·1 = 4, padahal turunan hasil kali bukan hasil kali turunan. Pilihan A, 7, adalah nilai f(2) = 7·1, bukan turunannya.',
    alasan: 'Aturan hasil kali: f′ = 2x(x − 1) + (x² + 3) = 3x² − 2x + 3; f′(2) = 11.',
  },
  {
    // cek: Math.abs(((3*1.0001 - 2)**4 - (3*0.9999 - 2)**4) / 2e-4 - 12) < 1e-5
    id: 'turunan-sedang-02',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = (3x − 2)⁴, nilai f′(1) adalah…',
    pilihan: ['4', '36', '12', '3', '1'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa f adalah pangkat dari fungsi lain, sehingga dipakai aturan rantai: jika f(x) = (p(x))ⁿ, maka f′(x) = n·(p(x))ⁿ⁻¹ · p′(x); turunan bagian dalam ikut dikalikan.',
      'Misalkan p = 3x − 2 sehingga p′ = 3. Dengan aturan rantai, diperoleh f′(x) = 4(3x − 2)³ · 3 = 12(3x − 2)³.',
      'Substitusikan x = 1, diperoleh f′(1) = 12(3 − 2)³ = 12(1)³ = 12.',
      'Jadi, nilai f′(1) = 12. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 4, lupa mengalikan dengan turunan bagian dalam p′ = 3; itu kekeliruan paling sering pada aturan rantai. Pilihan B, 36, mengalikan 12 dengan 3 sekali lagi.',
    alasan: 'Rantai: f′(x) = 4(3x − 2)³ · 3; f′(1) = 12.',
  },
  {
    // cek: Math.abs((((3.0001 + 1)/(3.0001 - 2)) - ((2.9999 + 1)/(2.9999 - 2))) / 2e-4 - (-3)) < 1e-5
    id: 'turunan-sedang-03',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = (x + 1)/(x − 2), nilai f′(3) adalah…',
    pilihan: ['3', '1', '−1', '4', '−3'],
    benar: 4,
    langkah: [
      'Perhatikan bahwa f adalah hasil bagi dua fungsi, sehingga dipakai aturan hasil bagi: jika f = u/v, maka f′ = (u′v − uv′)/v².',
      'Misalkan u = x + 1 sehingga u′ = 1, dan v = x − 2 sehingga v′ = 1.',
      'Dengan aturan hasil bagi dalam turunan, diperoleh f′(x) = (1·(x − 2) − (x + 1)·1)/(x − 2)² = (x − 2 − x − 1)/(x − 2)² = −3/(x − 2)².',
      'Substitusikan x = 3, diperoleh f′(3) = −3/(3 − 2)² = −3/1 = −3.',
      'Jadi, nilai f′(3) = −3. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 3, menukar urutan pengurangan pada pembilang (uv′ − u′v); urutannya harus u′v − uv′. Pilihan D, 4, adalah nilai f(3) = 4/1, bukan turunannya.',
    alasan: 'Aturan hasil bagi: f′(x) = −3/(x − 2)², jadi f′(3) = −3.',
  },
  {
    // cek: 4 * 2 - 4 === 4
    id: 'turunan-sedang-04',
    tingkat: 'sedang',
    pertanyaan: 'Persamaan garis singgung kurva y = x² di titik dengan absis 2 adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-1, 4, -2, 10], titik: [{ x: 2, y: 4, label: '(2, 4)' }] },
    pilihan: ['y = 4x − 4', 'y = 4x + 4', 'y = 2x − 4', 'y = 4x', 'y = 4'],
    benar: 0,
    langkah: [
      'Persamaan garis singgung di titik (x₁, y₁) adalah y − y₁ = m(x − x₁) dengan gradien m = f′(x₁). Tentukan dulu titik singgung dan gradiennya.',
      'Titik singgung: untuk x = 2, y = 2² = 4, sehingga titiknya (2, 4).',
      'Gradien: f′(x) = 2x, sehingga m = f′(2) = 2(2) = 4.',
      {
        teks: 'Substitusikan ke persamaan garis: y − 4 = 4(x − 2), sehingga y = 4x − 8 + 4 = 4x − 4. Garis ini menyentuh parabola tepat di (2, 4), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x', '4*x - 4'], jangkauan: [-1, 4, -2, 10], titik: [{ x: 2, y: 4, label: '(2, 4)' }], nama: ['y = x²', 'y = 4x − 4'] },
      },
      'Jadi, persamaan garis singgungnya adalah y = 4x − 4. (Jawaban A)',
    ],
    jebakan: 'Pilihan D, y = 4x, memakai gradien yang benar tetapi lupa menggeser garis supaya melalui (2, 4); y = 4x melewati (2, 8). Pilihan C, y = 2x − 4, memakai rumus turunan 2x sebagai gradien tanpa mensubstitusikan x = 2.',
    alasan: 'Titik (2, 4), gradien f′(2) = 4: y − 4 = 4(x − 2), yaitu y = 4x − 4.',
  },
  {
    // cek: Math.abs((Math.cos(Math.PI/2 + 0.0001) - Math.cos(Math.PI/2 - 0.0001)) / 2e-4 - (-1)) < 1e-6
    id: 'turunan-sedang-05',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = cos x, nilai f′(π/2) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.cos(x)'], jangkauan: [-0.5, 3.5, -1.5, 1.5], titik: [{ x: 1.5708, y: 0, label: '(π/2, 0)' }] },
    pilihan: ['1', '0', '−π/2', 'tidak ada', '−1'],
    benar: 4,
    langkah: [
      'Gunakan aturan turunan dasar fungsi trigonometri: f′(x) = (cos x)′ = −sin x.',
      'Substitusikan x = π/2, diperoleh f′(π/2) = −sin(π/2) = −1.',
      {
        teks: 'Secara geometris, di titik (π/2, 0) kurva cos x sedang memotong sumbu-x sambil menurun paling curam, sehingga gradien garis singgungnya −1, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['Math.cos(x)', '-(x - 1.5708)'], jangkauan: [-0.5, 3.5, -1.5, 1.5], titik: [{ x: 1.5708, y: 0, label: '(π/2, 0)' }], nama: ['y = cos x', 'garis singgung, gradien −1'] },
      },
      'Jadi, nilai f′(π/2) = −1. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 0, adalah nilai f(π/2) = cos(π/2), bukan turunannya. Pilihan A, 1, memakai turunan sin x seolah (cos x)′ = sin x, lupa tanda negatif.',
    alasan: 'f′(x) = −sin x, jadi f′(π/2) = −1.',
  },
  {
    // cek: Math.abs((((2*2.0001 - 3)**2 + 1) - ((2*1.9999 - 3)**2 + 1)) / 2e-4 - 4) < 1e-5
    id: 'turunan-sedang-16',
    tingkat: 'sedang',
    pertanyaan: 'Diketahui f(x) = x² + 1 dan g(x) = 2x − 3. Nilai (f∘g)′(2) adalah…',
    pilihan: ['8', '2', '6', '12', '4'],
    benar: 4,
    langkah: [
      'Ingat bahwa (f∘g)(x) = f(g(x)), dan turunannya mengikuti aturan rantai: (f∘g)′(x) = f′(g(x)) · g′(x).',
      'Hitung bagian-bagiannya: f′(x) = 2x, sehingga f′(g(x)) = 2·g(x) = 2(2x − 3); dan g′(x) = 2.',
      'Dengan aturan rantai, diperoleh (f∘g)′(x) = 2(2x − 3) · 2 = 4(2x − 3).',
      'Substitusikan x = 2, diperoleh (f∘g)′(2) = 4(4 − 3) = 4.',
      'Sebagai pemeriksaan, susun dulu komposisinya: (f∘g)(x) = (2x − 3)² + 1 = 4x² − 12x + 10, turunannya 8x − 12, dan di x = 2 nilainya 16 − 12 = 4, sama.',
      'Jadi, nilai (f∘g)′(2) = 4. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 2, menghitung f′(g(2)) = 2·1 = 2 tanpa mengalikan g′(x) = 2. Pilihan A, 8, menghitung f′(2)·g′(2) = 4·2, yaitu memasukkan x = 2 ke f′ langsung, bukan ke f′(g(x)).',
    alasan: 'Rantai: (f∘g)′(x) = f′(g(x))·g′(x) = 2(2x − 3)·2; di x = 2 nilainya 4.',
  },
  {
    // cek: Math.abs(((40*2.0001 - 5*2.0001**2) - (40*1.9999 - 5*1.9999**2)) / 2e-4 - 20) < 1e-6
    id: 'turunan-sedang-07',
    tingkat: 'sedang',
    pertanyaan: 'Tinggi sebuah bola setelah t detik adalah h(t) = 40t − 5t² meter. Kecepatannya pada detik ke-2 adalah…',
    gambar: { jenis: 'grafik', fungsi: ['40*x - 5*x*x'], jangkauan: [0, 8, 0, 90], titik: [{ x: 2, y: 60, label: '(2, 60)' }] },
    pilihan: ['60 m/s', '30 m/s', '10 m/s', '40 m/s', '20 m/s'],
    benar: 4,
    langkah: [
      'Kecepatan sesaat pada saat t dinyatakan oleh turunan pertama fungsi tinggi terhadap waktu, v(t) = h′(t).',
      'Dengan aturan turunan dasar, h′(t) = 40 − 5·2t = 40 − 10t.',
      'Substitusikan t = 2, diperoleh v(2) = 40 − 10(2) = 40 − 20 = 20 m/s.',
      {
        teks: 'Pada grafik tinggi terhadap waktu, 20 adalah gradien garis singgung di titik (2, 60); bola masih naik, tetapi lebih lambat daripada saat dilempar (v(0) = 40 m/s), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['40*x - 5*x*x', '20*x + 20'], jangkauan: [0, 8, 0, 90], titik: [{ x: 2, y: 60, label: '(2, 60)' }], nama: ['h = 40t − 5t²', 'garis singgung, gradien 20'] },
      },
      'Jadi, kecepatan bola pada detik ke-2 adalah 20 m/s. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 60 m/s, adalah TINGGI bola pada t = 2 (h(2) = 80 − 20 = 60), bukan kecepatannya. Pilihan B, 30 m/s, adalah kecepatan rata-rata dari t = 0 sampai t = 2 (60/2), bukan kecepatan sesaat.',
    alasan: 'v(t) = h′(t) = 40 − 10t, jadi v(2) = 20 m/s.',
  },
  {
    // cek: Math.abs((Math.sin(2*(Math.PI/6 + 0.0001)) - Math.sin(2*(Math.PI/6 - 0.0001))) / 2e-4 - 1) < 1e-6
    id: 'turunan-sedang-08',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = sin 2x, nilai f′(π/6) adalah…',
    pilihan: ['2', '1', '1/2', '√3', '(1/2)√3'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa sudutnya 2x, bukan x, sehingga dipakai aturan rantai: misalkan p = 2x sehingga p′ = 2.',
      'Dengan aturan rantai, diperoleh f′(x) = cos(2x) · 2 = 2 cos 2x.',
      'Substitusikan x = π/6, diperoleh f′(π/6) = 2 cos(2 · π/6) = 2 cos(π/3) = 2 · 1/2 = 1.',
      'Jadi, nilai f′(π/6) = 1. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, 1/2, lupa mengalikan dengan turunan bagian dalam, 2. Pilihan E, (1/2)√3, menghitung cos(π/6) alih-alih cos(2 · π/6) = cos(π/3); sudut yang dimasukkan ke kosinus harus 2x.',
    alasan: 'f′(x) = 2 cos 2x; f′(π/6) = 2 cos(π/3) = 1.',
  },
  {
    // cek: Math.abs(((1.0001**2 + 1)**2 - (0.9999**2 + 1)**2) / 2e-4 - 8) < 1e-5
    id: 'turunan-sedang-09',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = (x² + 1)², nilai f′(1) adalah…',
    pilihan: ['4', '2', '16', '6', '8'],
    benar: 4,
    langkah: [
      'Perhatikan bahwa f adalah kuadrat dari fungsi lain, sehingga dipakai aturan rantai. Misalkan p = x² + 1 sehingga p′ = 2x.',
      'Dengan aturan rantai, diperoleh f′(x) = 2(x² + 1) · 2x = 4x(x² + 1).',
      'Substitusikan x = 1, diperoleh f′(1) = 4(1)(1 + 1) = 8.',
      'Sebagai pemeriksaan, jabarkan dulu: f(x) = x⁴ + 2x² + 1, sehingga f′(x) = 4x³ + 4x dan f′(1) = 8, sama.',
      'Jadi, nilai f′(1) = 8. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 4, lupa mengalikan dengan turunan bagian dalam 2x. Pilihan C, 16, mengkuadratkan hasil 4 atau menghitung (2 · 2)²; pilihan B, 2, hanya mengambil pangkat.',
    alasan: 'Rantai: f′(x) = 2(x² + 1)·2x; f′(1) = 8.',
  },
  {
    // cek: Math.abs(((Math.PI/2 + 0.0001)*Math.sin(Math.PI/2 + 0.0001) - (Math.PI/2 - 0.0001)*Math.sin(Math.PI/2 - 0.0001)) / 2e-4 - 1) < 1e-6
    id: 'turunan-sedang-10',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = x sin x, nilai f′(π/2) adalah…',
    pilihan: ['0', '1', 'π/2', '−1', 'π/2 + 1'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa f adalah hasil kali dua fungsi, sehingga dipakai aturan hasil kali f′ = u′v + uv′.',
      'Misalkan u = x sehingga u′ = 1, dan v = sin x sehingga v′ = cos x.',
      'Dengan aturan hasil kali dalam turunan, diperoleh f′(x) = 1 · sin x + x · cos x = sin x + x cos x.',
      'Substitusikan x = π/2, diperoleh f′(π/2) = sin(π/2) + (π/2) cos(π/2) = 1 + (π/2)(0) = 1.',
      'Jadi, nilai f′(π/2) = 1. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, π/2, adalah nilai f(π/2) = (π/2)(1), bukan turunannya. Pilihan E, π/2 + 1, menjumlahkan sin x + x tanpa mengalikan x dengan cos x = 0. Pilihan A, 0, mengalikan turunan masing-masing, 1 · cos(π/2) = 0.',
    alasan: 'Hasil kali: f′ = sin x + x cos x; di π/2 nilainya 1 + 0 = 1.',
  },
  {
    // cek: 3 * 1 - 2 === 1
    id: 'turunan-sedang-11',
    tingkat: 'sedang',
    pertanyaan: 'Persamaan garis singgung kurva y = x³ di titik (1, 1) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x*x'], jangkauan: [-2, 2.5, -4, 6], titik: [{ x: 1, y: 1, label: '(1, 1)' }] },
    pilihan: ['y = 3x + 1', 'y = x', 'y = 3x − 2', 'y = 3x', 'y = 3x − 1'],
    benar: 2,
    langkah: [
      'Persamaan garis singgung di titik (x₁, y₁) adalah y − y₁ = m(x − x₁) dengan m = f′(x₁). Titik singgungnya sudah diketahui, (1, 1).',
      'Gradien: f′(x) = 3x², sehingga m = f′(1) = 3(1)² = 3.',
      {
        teks: 'Substitusikan: y − 1 = 3(x − 1), sehingga y = 3x − 3 + 1 = 3x − 2. Garis ini menyentuh kurva tepat di (1, 1), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x*x', '3*x - 2'], jangkauan: [-2, 2.5, -4, 6], titik: [{ x: 1, y: 1, label: '(1, 1)' }], nama: ['y = x³', 'y = 3x − 2'] },
      },
      'Jadi, persamaan garis singgungnya adalah y = 3x − 2. (Jawaban C)',
    ],
    jebakan: 'Pilihan D, y = 3x, memakai gradien yang benar tetapi tidak melalui (1, 1). Pilihan B, y = x, mengira garis singgung di (1, 1) selalu y = x; gradiennya harus dari f′(1) = 3, bukan dari letak titiknya.',
    alasan: 'm = f′(1) = 3; y − 1 = 3(x − 1) memberi y = 3x − 2.',
  },
  {
    // cek: Math.abs((Math.sqrt(2*4.0001 + 1) - Math.sqrt(2*3.9999 + 1)) / 2e-4 - 1/3) < 1e-6
    id: 'turunan-sedang-12',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = √(2x + 1), nilai f′(4) adalah…',
    pilihan: ['1/6', '2/3', '1/3', '3', '1/2'],
    benar: 2,
    langkah: [
      'Tulis bentuk akar ke bentuk pangkat: f(x) = (2x + 1)^(1/2). Karena bagian dalamnya bukan x saja, dipakai aturan rantai. Misalkan p = 2x + 1 sehingga p′ = 2.',
      'Dengan aturan rantai, diperoleh f′(x) = (1/2)(2x + 1)^(−1/2) · 2 = 1/√(2x + 1).',
      'Substitusikan x = 4, diperoleh f′(4) = 1/√(8 + 1) = 1/√9 = 1/3.',
      'Jadi, nilai f′(4) = 1/3. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 1/6, lupa mengalikan dengan turunan bagian dalam 2, sehingga berhenti pada 1/(2√9). Pilihan D, 3, adalah nilai f(4) = √9, bukan turunannya.',
    alasan: 'Rantai: f′(x) = 1/√(2x + 1); f′(4) = 1/3.',
  },
  {
    // cek: Math.abs((((2*0.0001 - 1)/(0.0001 + 1)) - ((2*(-0.0001) - 1)/(-0.0001 + 1))) / 2e-4 - 3) < 1e-5
    id: 'turunan-sedang-13',
    tingkat: 'sedang',
    pertanyaan: 'Jika f(x) = (2x − 1)/(x + 1), nilai f′(0) adalah…',
    pilihan: ['3', '−3', '2', '−1', '1'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa f adalah hasil bagi dua fungsi, sehingga dipakai aturan hasil bagi f′ = (u′v − uv′)/v².',
      'Misalkan u = 2x − 1 sehingga u′ = 2, dan v = x + 1 sehingga v′ = 1.',
      'Dengan aturan hasil bagi dalam turunan, diperoleh f′(x) = (2(x + 1) − (2x − 1)(1))/(x + 1)² = (2x + 2 − 2x + 1)/(x + 1)² = 3/(x + 1)².',
      'Substitusikan x = 0, diperoleh f′(0) = 3/(0 + 1)² = 3.',
      'Jadi, nilai f′(0) = 3. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, −3, menukar urutan pengurangan pada pembilang. Pilihan D, −1, adalah nilai f(0) = −1/1, bukan turunannya. Pilihan C, 2, membagi turunan pembilang dengan turunan penyebut, padahal aturan hasil bagi bukan begitu.',
    alasan: 'Aturan hasil bagi: f′(x) = 3/(x + 1)²; f′(0) = 3.',
  },
  {
    // cek: Math.abs(((2.0001**3 - 3*2.0001) - (1.9999**3 - 3*1.9999)) / 2e-4 - 9) < 1e-5
    id: 'turunan-sedang-14',
    tingkat: 'sedang',
    pertanyaan: 'Posisi sebuah benda pada waktu t detik adalah s(t) = t³ − 3t meter. Kecepatannya saat t = 2 adalah…',
    pilihan: ['9 m/s', '2 m/s', '12 m/s', '1 m/s', '6 m/s'],
    benar: 0,
    langkah: [
      'Kecepatan sesaat pada saat t dinyatakan oleh turunan pertama fungsi posisi terhadap waktu, v(t) = s′(t).',
      'Dengan aturan turunan dasar, s′(t) = 3t² − 3.',
      'Substitusikan t = 2, diperoleh v(2) = 3(2)² − 3 = 12 − 3 = 9 m/s.',
      'Jadi, kecepatan benda saat t = 2 adalah 9 m/s. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 2 m/s, adalah POSISI benda pada t = 2 (s(2) = 8 − 6), bukan kecepatannya. Pilihan C, 12 m/s, lupa mengurangkan turunan suku −3t. Pilihan E, 6 m/s, adalah percepatan a(2) = s″(2) = 6t.',
    alasan: 'v(t) = s′(t) = 3t² − 3, jadi v(2) = 9 m/s.',
  },
  {
    // cek: Math.abs(((4*1.0001**2 + 6*1.0001) - (4*0.9999**2 + 6*0.9999)) / 2e-4 / 2 - 7) < 1e-5
    id: 'turunan-sedang-17',
    tingkat: 'sedang',
    pertanyaan: 'Diketahui f(2x + 1) = 4x² + 6x. Nilai f′(3) adalah…',
    pilihan: ['14', '5', '10', '7', '3'],
    benar: 3,
    langkah: [
      'Perhatikan bahwa yang diketahui adalah f dari bentuk 2x + 1, bukan f(x). Turunkan kedua ruas terhadap x; ruas kiri diturunkan dengan aturan rantai: d/dx f(2x + 1) = f′(2x + 1) · 2.',
      'Ruas kanan diturunkan dengan aturan dasar: (4x² + 6x)′ = 8x + 6. Dengan demikian, 2 f′(2x + 1) = 8x + 6, sehingga f′(2x + 1) = 4x + 3.',
      'Yang ditanya f′(3), yaitu ketika 2x + 1 = 3, sehingga x = 1. Substitusikan x = 1, diperoleh f′(3) = 4(1) + 3 = 7.',
      'Sebagai pemeriksaan dengan mencari f dulu: misalkan u = 2x + 1 sehingga x = (u − 1)/2, maka f(u) = 4((u − 1)/2)² + 6(u − 1)/2 = (u − 1)² + 3(u − 1) = u² + u − 2, sehingga f′(u) = 2u + 1 dan f′(3) = 7, sama.',
      'Jadi, nilai f′(3) = 7. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 14, lupa membagi 8x + 6 dengan turunan bagian dalam 2 (menganggap f′(2x + 1) = 8x + 6). Pilihan C, 10, memasukkan x = 3 ke f′(2x + 1) = 4x + 3 alih-alih ke 2x + 1 = 3.',
    alasan: 'Rantai: 2f′(2x + 1) = 8x + 6 → f′(2x + 1) = 4x + 3; 2x + 1 = 3 di x = 1 → f′(3) = 7.',
  },
  // ================================================================ SULIT
  {
    // cek: (3*(-1)**2 - 6*(-1)) > 0 && (3*1 - 6) < 0 && (3*9 - 18) > 0
    id: 'turunan-sulit-01',
    tingkat: 'sulit',
    pertanyaan: 'Fungsi f(x) = x³ − 3x² naik pada selang…',
    gambar: { jenis: 'grafik', fungsi: ['x*x*x - 3*x*x'], jangkauan: [-2, 4, -6, 6] },
    pilihan: ['0 < x < 2', 'x > 2 saja', 'x < 0 saja', 'x < 0 atau x > 2', 'seluruh bilangan real'],
    benar: 3,
    langkah: [
      'Ingat bahwa fungsi naik pada selang tempat f′(x) > 0 dan turun pada selang tempat f′(x) < 0.',
      'Hitung turunannya: f′(x) = 3x² − 6x = 3x(x − 2). Titik stasionernya diperoleh dari f′(x) = 0, yaitu x = 0 atau x = 2.',
      {
        teks: 'Uji tanda f′ pada tiap selang dengan garis bilangan: ambil x = −1, f′(−1) = 3(−1)(−3) = 9 > 0 (positif); x = 1, f′(1) = 3(1)(−1) = −3 < 0 (negatif); x = 3, f′(3) = 3(3)(1) = 9 > 0 (positif), seperti gambar berikut.',
        gambar: { jenis: 'garis-bilangan', titik: [{ x: 0 }, { x: 2 }], selang: [{ dari: -3, sampai: 0, tanda: '+ (naik)', sorot: true }, { dari: 0, sampai: 2, tanda: '− (turun)' }, { dari: 2, sampai: 5, tanda: '+ (naik)', sorot: true }] },
      },
      {
        teks: 'Dengan demikian, f naik pada x < 0 dan pada x > 2, sedangkan pada 0 < x < 2 fungsi turun; ini sesuai grafik yang menanjak, lalu melandai turun di antara (0, 0) dan (2, −4), lalu menanjak lagi, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x*x - 3*x*x'], jangkauan: [-2, 4, -6, 6], titik: [{ x: 0, y: 0, label: '(0, 0)' }, { x: 2, y: -4, label: '(2, -4)' }], arsir: [{ dari: 0, sampai: 2, label: 'turun' }] },
      },
      'Jadi, f naik pada selang x < 0 atau x > 2. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 0 < x < 2, adalah selang TURUN, tempat f′ negatif. Pilihan B, x > 2 saja, melupakan cabang kiri yang juga menanjak sebelum puncak (0, 0).',
    alasan: 'f′ = 3x(x − 2) positif untuk x < 0 dan x > 2.',
  },
  {
    // cek: 1 - 6 + 9 + 1 === 5 && 3*1 - 12 + 9 === 0
    id: 'turunan-sulit-02',
    tingkat: 'sulit',
    pertanyaan: 'Titik balik maksimum fungsi f(x) = x³ − 6x² + 9x + 1 adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x*x - 6*x*x + 9*x + 1'], jangkauan: [-0.5, 4.5, -1, 7] },
    pilihan: ['(3, 1)', '(1, 1)', '(3, 5)', '(1, 5)', '(2, 3)'],
    benar: 3,
    langkah: [
      'Titik balik (ekstrem) terjadi di titik stasioner, yaitu tempat f′(x) = 0. Hitung turunannya: f′(x) = 3x² − 12x + 9 = 3(x² − 4x + 3) = 3(x − 1)(x − 3).',
      'Untuk itu, f′(x) = 0 di x = 1 atau x = 3.',
      {
        teks: 'Tentukan jenisnya dengan uji tanda f′: untuk x < 1 (ambil x = 0), f′ = 9 > 0; untuk 1 < x < 3 (ambil x = 2), f′ = −3 < 0; untuk x > 3 (ambil x = 4), f′ = 9 > 0. Tanda berubah dari positif ke negatif di x = 1 (naik lalu turun), sehingga x = 1 adalah titik balik maksimum, dan berubah dari negatif ke positif di x = 3, titik balik minimum.',
        gambar: { jenis: 'garis-bilangan', titik: [{ x: 1, label: '1 (maks)' }, { x: 3, label: '3 (min)' }], selang: [{ dari: -1, sampai: 1, tanda: '+' }, { dari: 1, sampai: 3, tanda: '−' }, { dari: 3, sampai: 5, tanda: '+' }] },
      },
      'Substitusikan x = 1 ke f: f(1) = 1 − 6 + 9 + 1 = 5, sehingga titik balik maksimumnya (1, 5). (Untuk pembanding, titik balik minimumnya (3, f(3)) = (3, 1).)',
      'Jadi, titik balik maksimum fungsi itu adalah (1, 5). (Jawaban D)',
    ],
    jebakan: 'Pilihan A, (3, 1), adalah titik balik MINIMUM; kedua titik stasioner harus dibedakan lewat uji tanda atau turunan kedua (f″(1) = −6 < 0 maksimum, f″(3) = 6 > 0 minimum). Pilihan B, (1, 1), salah menghitung f(1).',
    alasan: 'f′ = 3(x − 1)(x − 3); di x = 1 tanda f′ berubah + ke −, maksimum (1, 5).',
  },
  {
    // cek: Math.abs((4.0001**2.5 - 3.9999**2.5) / 2e-4 - 20) < 1e-4
    id: 'turunan-sulit-03',
    tingkat: 'sulit',
    pertanyaan: 'Jika f(x) = x²√x, nilai f′(4) adalah…',
    pilihan: ['32', '10', '40', '8', '20'],
    benar: 4,
    langkah: [
      'Gunakan aturan turunan dasar dengan menulis bentuk akar ke bentuk pangkat lebih dulu: f(x) = x² · x^(1/2) = x^(2 + 1/2) = x^(5/2).',
      'Dengan aturan pangkat, f′(x) = (5/2)·x^(5/2 − 1) = (5/2)·x^(3/2) = (5/2)·x√x.',
      'Substitusikan x = 4, diperoleh f′(4) = (5/2)·4·√4 = (5/2)·4·2 = 20.',
      'Jadi, nilai f′(4) = 20. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 32, adalah nilai f(4) = 16 · 2, bukan turunannya. Pilihan D, 8, hanya menurunkan x² menjadi 2x lalu mengalikan √4, seolah √x konstanta.',
    alasan: 'x²√x = x^(5/2), turunannya (5/2)x^(3/2); f′(4) = (5/2)(8) = 20.',
  },
  {
    // cek: 2*3 - 4 === 2 && 9 - 12 + 5 === 2 && 2*3 - 4 === 2
    id: 'turunan-sulit-04',
    tingkat: 'sulit',
    pertanyaan: 'Garis singgung kurva y = x² − 4x + 5 yang sejajar dengan garis y = 2x + 7 mempunyai persamaan…',
    gambar: { jenis: 'grafik', fungsi: ['x*x - 4*x + 5', '2*x + 7'], jangkauan: [-2, 6, -2, 12], nama: ['y = x² − 4x + 5', 'y = 2x + 7'] },
    pilihan: ['y = 2x − 4', 'y = 2x + 2', 'y = 2x − 1', 'y = 2x + 7', 'y = 2x − 7'],
    benar: 0,
    langkah: [
      'Ingat bahwa dua garis sejajar mempunyai gradien sama. Gradien garis y = 2x + 7 adalah 2, sehingga garis singgung yang dicari juga bergradien 2.',
      'Gradien garis singgung di titik dengan absis x adalah f′(x) = 2x − 4. Samakan dengan 2: 2x − 4 = 2, sehingga x = 3.',
      'Titik singgungnya: y = 3² − 4(3) + 5 = 9 − 12 + 5 = 2, yaitu (3, 2).',
      {
        teks: 'Persamaan garis singgung: y − 2 = 2(x − 3), sehingga y = 2x − 4. Garis ini sejajar y = 2x + 7 dan menyentuh parabola di (3, 2), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x - 4*x + 5', '2*x + 7', '2*x - 4'], jangkauan: [-2, 6, -2, 12], titik: [{ x: 3, y: 2, label: '(3, 2)' }], nama: ['y = x² − 4x + 5', 'y = 2x + 7', 'y = 2x − 4'] },
      },
      'Jadi, persamaan garis singgungnya adalah y = 2x − 4. (Jawaban A)',
    ],
    jebakan: 'Pilihan D, y = 2x + 7, adalah garis yang diberikan, bukan garis singgungnya; garis itu memotong parabola, tidak menyinggungnya. Pilihan B, y = 2x + 2, memakai gradien benar tetapi titik singgung keliru (x = 3 dimasukkan ke garis, bukan ke kurva).',
    alasan: 'Gradien 2: f′(x) = 2x − 4 = 2 memberi x = 3, titik (3, 2), garis y = 2x − 4.',
  },
  {
    // cek: 2 * (12 - 4)**2 === 128 && 12*4 - 96*2 + 144 === 0
    id: 'turunan-sulit-05',
    tingkat: 'sulit',
    pertanyaan: 'Selembar karton persegi bersisi 12 cm dipotong keempat pojoknya berbentuk persegi bersisi x, lalu dilipat menjadi kotak tanpa tutup. Isi kotak terbesarnya adalah…',
    gambar: { jenis: 'svg', viewBox: '0 0 460 230', isi: '<rect x="130" y="25" width="200" height="180" fill="none" stroke="#1F2430" stroke-width="1.8"/><rect x="130" y="25" width="40" height="40" fill="rgba(194,94,77,0.18)" stroke="#C25E4D" stroke-width="1.2" stroke-dasharray="4 3"/><rect x="290" y="25" width="40" height="40" fill="rgba(194,94,77,0.18)" stroke="#C25E4D" stroke-width="1.2" stroke-dasharray="4 3"/><rect x="130" y="165" width="40" height="40" fill="rgba(194,94,77,0.18)" stroke="#C25E4D" stroke-width="1.2" stroke-dasharray="4 3"/><rect x="290" y="165" width="40" height="40" fill="rgba(194,94,77,0.18)" stroke="#C25E4D" stroke-width="1.2" stroke-dasharray="4 3"/><g font-family="var(--font-mono), sans-serif" font-size="12"><text x="230" y="18" text-anchor="middle" fill="#3A6EA5">12 cm</text><text x="150" y="50" text-anchor="middle" fill="#C25E4D">x</text><text x="230" y="120" text-anchor="middle" fill="#1F2430">12 − 2x</text><text x="345" y="120" fill="#3A6EA5">12 cm</text></g>' },
    pilihan: ['2 cm³', '128 cm³', '64 cm³', '144 cm³', '108 cm³'],
    benar: 1,
    langkah: [
      'Misalkan x menyatakan sisi persegi yang dipotong (cm), sekaligus tinggi kotak. Setelah pojoknya dipotong, alas kotak berukuran (12 − 2x) × (12 − 2x), dengan syarat 0 < x < 6 supaya alasnya masih ada.',
      'Nyatakan isi kotak sebagai fungsi terhadap x: V(x) = x(12 − 2x)² = x(144 − 48x + 4x²) = 4x³ − 48x² + 144x.',
      'Isi kotak akan maksimum saat V′(x) = 0, sehingga ditulis 12x² − 96x + 144 = 0, yaitu x² − 8x + 12 = 0, (x − 2)(x − 6) = 0. Diperoleh x = 2 atau x = 6.',
      'Nilai x = 6 tidak memenuhi karena alasnya menjadi 12 − 12 = 0 (isi kotak 0). Jadi x yang diambil adalah x = 2. (Uji tanda: V′(1) = 60 > 0 dan V′(3) = −36 < 0, sehingga di x = 2 isi kotak maksimum.)',
      {
        teks: 'Substitusikan x = 2 ke V(x): V(2) = 2(12 − 4)² = 2(8)² = 2 · 64 = 128 cm³. Grafik V(x) memperlihatkan puncaknya di (2, 128), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*(12 - 2*x)*(12 - 2*x)'], jangkauan: [0, 6, 0, 140], titik: [{ x: 2, y: 128, label: '(2, 128)' }], nama: ['V = x(12 − 2x)²'] },
      },
      'Jadi, isi kotak terbesarnya adalah 128 cm³. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 2 cm³, adalah nilai x yang memberi isi terbesar, bukan isinya. Pilihan C, 64 cm³, adalah luas alas (8 × 8) tanpa dikalikan tinggi 2. Pilihan D, 144 cm³, adalah luas karton semula.',
    alasan: 'V = x(12 − 2x)²; V′ = 0 memberi x = 2 (x = 6 tidak memenuhi); V(2) = 128 cm³.',
  },
  {
    // cek: 3*1 - 12*1 + 9 === 0 && 6*1 - 12 === -6
    id: 'turunan-sulit-16',
    tingkat: 'sulit',
    pertanyaan: 'Posisi sebuah partikel pada waktu t detik adalah s(t) = t³ − 6t² + 9t meter. Percepatan partikel saat kecepatannya nol untuk pertama kali adalah…',
    pilihan: ['6 m/s²', '−6 m/s²', '0 m/s²', '−12 m/s²', '3 m/s²'],
    benar: 1,
    langkah: [
      'Ingat bahwa kecepatan adalah turunan pertama posisi, v(t) = s′(t), dan percepatan adalah turunan kecepatan, a(t) = v′(t) = s″(t).',
      'Hitung kecepatannya: v(t) = 3t² − 12t + 9 = 3(t² − 4t + 3) = 3(t − 1)(t − 3). Kecepatan nol saat t = 1 atau t = 3; yang pertama kali terjadi adalah t = 1 detik.',
      'Hitung percepatannya: a(t) = v′(t) = 6t − 12.',
      'Substitusikan t = 1, diperoleh a(1) = 6(1) − 12 = −6 m/s². Tanda negatif berarti pada saat itu partikel sedang diperlambat lalu berbalik arah.',
      'Jadi, percepatan partikel saat kecepatannya nol untuk pertama kali adalah −6 m/s². (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 6 m/s², adalah percepatan pada t = 3, saat kecepatan nol untuk KEDUA kalinya. Pilihan C, 0 m/s², mengira percepatan juga nol ketika kecepatan nol; keduanya besaran yang berbeda. Pilihan D, −12 m/s², memasukkan t = 0.',
    alasan: 'v = 3(t − 1)(t − 3) nol pertama di t = 1; a = 6t − 12, a(1) = −6.',
  },
  {
    // cek: Math.abs((Math.sqrt(4.0001**2 + 9) - Math.sqrt(3.9999**2 + 9)) / 2e-4 - 0.8) < 1e-6
    id: 'turunan-sulit-07',
    tingkat: 'sulit',
    pertanyaan: 'Jika f(x) = √(x² + 9), nilai f′(4) adalah…',
    pilihan: ['1/5', '5', '8/5', '1/10', '4/5'],
    benar: 4,
    langkah: [
      'Tulis bentuk akar ke bentuk pangkat: f(x) = (x² + 9)^(1/2). Karena bagian dalamnya fungsi lain, dipakai aturan rantai. Misalkan p = x² + 9 sehingga p′ = 2x.',
      'Dengan aturan rantai, diperoleh f′(x) = (1/2)(x² + 9)^(−1/2) · 2x = x/√(x² + 9).',
      'Substitusikan x = 4, diperoleh f′(4) = 4/√(16 + 9) = 4/√25 = 4/5.',
      'Jadi, nilai f′(4) = 4/5. (Jawaban E)',
    ],
    jebakan: 'Pilihan C, 8/5, lupa bahwa faktor 1/2 dari aturan pangkat mencoret faktor 2 dari p′ = 2x. Pilihan B, 5, adalah nilai f(4) = √25, bukan turunannya. Pilihan D, 1/10, berhenti pada (1/2)·1/√25 tanpa mengalikan 2x.',
    alasan: 'Rantai: f′(x) = x/√(x² + 9); f′(4) = 4/5.',
  },
  {
    // cek: 20 + 2*50/10 === 30
    id: 'turunan-sulit-08',
    tingkat: 'sulit',
    pertanyaan: 'Biaya total membuat x barang adalah B(x) = 1.000 + 20x + x²/10 (dalam ribu rupiah). Biaya marginal saat produksi 50 barang adalah…',
    pilihan: ['25 ribu rupiah', '30 ribu rupiah', '20 ribu rupiah', '2.250 ribu rupiah', '45 ribu rupiah'],
    benar: 1,
    langkah: [
      'Biaya marginal pada tingkat produksi x didefinisikan sebagai laju perubahan biaya total terhadap banyak barang, yaitu B′(x); nilainya kira-kira tambahan biaya untuk membuat satu barang berikutnya.',
      'Dengan aturan turunan dasar, B′(x) = 0 + 20 + 2x/10 = 20 + x/5.',
      'Substitusikan x = 50, diperoleh B′(50) = 20 + 50/5 = 20 + 10 = 30 (ribu rupiah).',
      'Jadi, biaya marginal saat produksi 50 barang adalah 30 ribu rupiah. (Jawaban B)',
    ],
    jebakan: 'Pilihan D, 2.250 ribu rupiah, adalah biaya TOTAL B(50) = 1.000 + 1.000 + 250, bukan biaya marginalnya. Pilihan E, 45 ribu rupiah, adalah biaya rata-rata per barang, B(50)/50. Pilihan C, 20, lupa suku x/5.',
    alasan: 'Biaya marginal = B′(x) = 20 + x/5; B′(50) = 30.',
  },
  {
    // cek: 2**3 - 12*2 === -16 && 3*4 - 12 === 0
    id: 'turunan-sulit-09',
    tingkat: 'sulit',
    pertanyaan: 'Nilai minimum lokal fungsi f(x) = x³ − 12x adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x*x - 12*x'], jangkauan: [-4, 4, -20, 20] },
    pilihan: ['16', '2', '−2', '0', '−16'],
    benar: 4,
    langkah: [
      'Nilai ekstrem lokal terjadi di titik stasioner. Hitung turunannya: f′(x) = 3x² − 12 = 3(x² − 4) = 3(x − 2)(x + 2), sehingga f′(x) = 0 di x = −2 atau x = 2.',
      {
        teks: 'Uji tanda f′: untuk x < −2, f′ > 0; untuk −2 < x < 2, f′ < 0; untuk x > 2, f′ > 0. Di x = 2 tanda berubah dari negatif ke positif (turun lalu naik), sehingga x = 2 memberi minimum lokal; di x = −2 sebaliknya, maksimum lokal.',
        gambar: { jenis: 'garis-bilangan', titik: [{ x: -2, label: '−2 (maks)' }, { x: 2, label: '2 (min)' }], selang: [{ dari: -4, sampai: -2, tanda: '+' }, { dari: -2, sampai: 2, tanda: '−' }, { dari: 2, sampai: 4, tanda: '+' }] },
      },
      {
        teks: 'Substitusikan x = 2 ke f: f(2) = 2³ − 12(2) = 8 − 24 = −16. Pada grafik, lembah terendah di sekitar itu ada di (2, −16), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x*x - 12*x'], jangkauan: [-4, 4, -20, 20], titik: [{ x: 2, y: -16, label: '(2, -16)' }, { x: -2, y: 16, label: '(-2, 16)' }] },
      },
      'Jadi, nilai minimum lokal fungsi itu adalah −16. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 2, adalah absis tempat minimum terjadi, bukan nilai minimumnya (yang ditanya nilai f). Pilihan A, 16, adalah nilai maksimum lokal f(−2).',
    alasan: 'f′ = 3(x − 2)(x + 2); minimum lokal di x = 2 dengan f(2) = −16.',
  },
  {
    // cek: 2*1 + 2 === 4 && 1 + 2 === 3 && 4*1 - 1 === 3
    id: 'turunan-sulit-10',
    tingkat: 'sulit',
    pertanyaan: 'Garis singgung kurva y = x² + 2x yang tegak lurus garis y = −x/4 + 1 mempunyai persamaan…',
    gambar: { jenis: 'grafik', fungsi: ['x*x + 2*x', '-x/4 + 1'], jangkauan: [-4, 3, -3, 8], nama: ['y = x² + 2x', 'y = −x/4 + 1'] },
    pilihan: ['y = 4x − 1', 'y = −x/4 + 3', 'y = 4x + 3', 'y = 4x', 'y = −4x + 7'],
    benar: 0,
    langkah: [
      'Ingat bahwa dua garis tegak lurus mempunyai hasil kali gradien −1. Gradien garis y = −x/4 + 1 adalah −1/4, sehingga gradien garis singgung yang dicari adalah m = −1/(−1/4) = 4.',
      'Gradien garis singgung di titik dengan absis x adalah f′(x) = 2x + 2. Samakan dengan 4: 2x + 2 = 4, sehingga x = 1.',
      'Titik singgungnya: y = 1² + 2(1) = 3, yaitu (1, 3).',
      {
        teks: 'Persamaan garis singgung: y − 3 = 4(x − 1), sehingga y = 4x − 1, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x + 2*x', '-x/4 + 1', '4*x - 1'], jangkauan: [-4, 3, -3, 8], titik: [{ x: 1, y: 3, label: '(1, 3)' }], nama: ['y = x² + 2x', 'y = −x/4 + 1', 'y = 4x − 1'] },
      },
      'Jadi, persamaan garis singgungnya adalah y = 4x − 1. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, y = −x/4 + 3, memakai gradien garis yang diberikan (sejajar, bukan tegak lurus). Pilihan E, y = −4x + 7, salah tanda gradien tegak lurus: kebalikan dari −1/4 adalah −4, lalu diNEGATIFKAN menjadi 4. Pilihan D, y = 4x, tidak melalui (1, 3).',
    alasan: 'Tegak lurus: m = 4; f′(x) = 2x + 2 = 4 memberi x = 1, titik (1, 3), garis y = 4x − 1.',
  },
  {
    // cek: Math.abs(-9 * Math.sin(3 * Math.PI / 6) - (-9)) < 1e-9
    id: 'turunan-sulit-11',
    tingkat: 'sulit',
    pertanyaan: 'Jika f(x) = sin 3x, nilai f″(π/6) adalah…',
    pilihan: ['9', '−9', '−3', '0', '3'],
    benar: 1,
    langkah: [
      'Turunan kedua adalah turunan dari turunan pertama. Hitung dulu f′ dengan aturan rantai (p = 3x, p′ = 3): f′(x) = cos 3x · 3 = 3 cos 3x.',
      'Turunkan sekali lagi dengan aturan rantai: f″(x) = 3 · (−sin 3x) · 3 = −9 sin 3x.',
      'Substitusikan x = π/6, diperoleh f″(π/6) = −9 sin(3 · π/6) = −9 sin(π/2) = −9 · 1 = −9.',
      'Jadi, nilai f″(π/6) = −9. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, −3, hanya mengalikan faktor 3 sekali; aturan rantai berlaku pada setiap kali menurunkan, sehingga faktornya 3 × 3 = 9. Pilihan A, 9, lupa tanda negatif dari turunan kosinus. Pilihan D, 0, menghitung f′(π/6) = 3 cos(π/2) = 0, turunan pertama.',
    alasan: 'f″(x) = −9 sin 3x; di π/6 nilainya −9 sin(π/2) = −9.',
  },
  {
    // cek: (4*(-2)**3 - 4*(-2)) < 0 && (4*0.5**3 - 4*0.5) < 0 && (4*(-0.5)**3 - 4*(-0.5)) > 0
    id: 'turunan-sulit-12',
    tingkat: 'sulit',
    pertanyaan: 'Fungsi f(x) = x⁴ − 2x² turun pada selang…',
    gambar: { jenis: 'grafik', fungsi: ['x*x*x*x - 2*x*x'], jangkauan: [-2, 2, -2, 4] },
    pilihan: ['x < −1 atau 0 < x < 1', '−1 < x < 0 atau x > 1', 'x < 0', '−1 < x < 1', 'x > 1'],
    benar: 0,
    langkah: [
      'Ingat bahwa fungsi turun pada selang tempat f′(x) < 0. Hitung turunannya: f′(x) = 4x³ − 4x = 4x(x² − 1) = 4x(x − 1)(x + 1).',
      'Titik stasionernya diperoleh dari f′(x) = 0, yaitu x = −1, x = 0, atau x = 1; ketiganya membagi garis bilangan menjadi empat selang.',
      {
        teks: 'Uji tanda f′ pada tiap selang: x = −2 memberi 4(−2)(−3)(−1) = −24 < 0; x = −0,5 memberi 4(−0,5)(−1,5)(0,5) = 1,5 > 0; x = 0,5 memberi 4(0,5)(−0,5)(1,5) = −1,5 < 0; x = 2 memberi 24 > 0, seperti gambar berikut.',
        gambar: { jenis: 'garis-bilangan', titik: [{ x: -1 }, { x: 0 }, { x: 1 }], selang: [{ dari: -3, sampai: -1, tanda: '−', sorot: true }, { dari: -1, sampai: 0, tanda: '+' }, { dari: 0, sampai: 1, tanda: '−', sorot: true }, { dari: 1, sampai: 3, tanda: '+' }] },
      },
      {
        teks: 'Dengan demikian, f turun pada x < −1 dan pada 0 < x < 1, sesuai grafik berbentuk W yang menurun menuju lembah (−1, −1) dan lembah (1, −1), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x*x*x - 2*x*x'], jangkauan: [-2, 2, -2, 4], titik: [{ x: -1, y: -1, label: '(-1, -1)' }, { x: 1, y: -1, label: '(1, -1)' }, { x: 0, y: 0, label: '(0, 0)' }], arsir: [{ dari: -2, sampai: -1, label: 'turun' }, { dari: 0, sampai: 1, label: 'turun' }] },
      },
      'Jadi, f turun pada selang x < −1 atau 0 < x < 1. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, −1 < x < 0 atau x > 1, adalah selang NAIK. Pilihan D, −1 < x < 1, mengabaikan bahwa di antara kedua lembah ada puncak (0, 0) tempat fungsi sempat naik.',
    alasan: 'f′ = 4x(x − 1)(x + 1) negatif pada x < −1 dan 0 < x < 1.',
  },
  {
    // cek: 3*1 - 2*6*1 + 9 === 0 && 3*9 - 2*6*3 + 9 === 0
    id: 'turunan-sulit-17',
    tingkat: 'sulit',
    pertanyaan: 'Fungsi f(x) = x³ − ax² + 9x turun pada selang 1 < x < 3. Nilai a adalah…',
    pilihan: ['3', '6', '4', '2', '12'],
    benar: 1,
    langkah: [
      'Ingat bahwa fungsi turun pada selang tempat f′(x) < 0. Hitung turunannya: f′(x) = 3x² − 2ax + 9.',
      'Karena f turun tepat pada 1 < x < 3, maka f′(x) < 0 tepat pada selang itu, sehingga x = 1 dan x = 3 adalah akar-akar f′(x) = 0, yaitu batas tempat tanda f′ berganti.',
      'Dengan sifat jumlah akar persamaan kuadrat 3x² − 2ax + 9 = 0, diperoleh x₁ + x₂ = −(−2a)/3 = 2a/3. Karena x₁ + x₂ = 1 + 3 = 4, maka 2a/3 = 4, sehingga a = 6. (Hasil kali akarnya 9/3 = 3 = 1 · 3, memang cocok.)',
      {
        teks: 'Sebagai pemeriksaan, dengan a = 6 diperoleh f′(x) = 3x² − 12x + 9 = 3(x − 1)(x − 3), yang bernilai negatif tepat di antara kedua akarnya, seperti garis bilangan berikut.',
        gambar: { jenis: 'garis-bilangan', titik: [{ x: 1 }, { x: 3 }], selang: [{ dari: -1, sampai: 1, tanda: '+' }, { dari: 1, sampai: 3, tanda: '− (turun)', sorot: true }, { dari: 3, sampai: 5, tanda: '+' }] },
      },
      'Jadi, nilai a adalah 6. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 3, mengira a adalah batas kanan selang atau lupa faktor 2 pada suku −2ax. Pilihan E, 12, adalah nilai 2a, yaitu koefisien x pada f′ tanpa dibagi 2. Pilihan C, 4, menyalin jumlah akar tanpa menyelesaikan 2a/3 = 4.',
    alasan: 'f′ = 3x² − 2ax + 9 berakar 1 dan 3: jumlah akar 2a/3 = 4 memberi a = 6.',
  },
  {
    // cek: Math.abs((1.0001*Math.exp(1.0001) - 0.9999*Math.exp(0.9999)) / 2e-4 - 2*Math.E) < 1e-5
    id: 'turunan-sulit-14',
    tingkat: 'sulit',
    pertanyaan: 'Jika f(x) = x eˣ, nilai f′(1) adalah…',
    pilihan: ['e', '1', 'e + 1', '2e', 'e²'],
    benar: 3,
    langkah: [
      'Perhatikan bahwa f adalah hasil kali dua fungsi, sehingga dipakai aturan hasil kali f′ = u′v + uv′.',
      'Misalkan u = x sehingga u′ = 1, dan v = eˣ sehingga v′ = eˣ (turunan eksponen alami sama dengan dirinya).',
      'Dengan aturan hasil kali dalam turunan, diperoleh f′(x) = 1 · eˣ + x · eˣ = (1 + x)eˣ.',
      'Substitusikan x = 1, diperoleh f′(1) = (1 + 1)e¹ = 2e.',
      'Jadi, nilai f′(1) = 2e. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, e, hanya menghitung salah satu suku (x · eˣ di x = 1) atau mengalikan turunan masing-masing, 1 · eˣ. Pilihan C, e + 1, menjumlahkan eˣ dan x tanpa mengalikan x dengan eˣ.',
    alasan: 'Hasil kali: f′ = (1 + x)eˣ; f′(1) = 2e.',
  },
  {
    // cek: 30*3 - 5*9 === 45 && 30 - 10*3 === 0
    id: 'turunan-sulit-15',
    tingkat: 'sulit',
    pertanyaan: 'Tinggi sebuah bola setelah t detik adalah h(t) = 30t − 5t² meter. Tinggi maksimum yang dicapai bola adalah…',
    gambar: { jenis: 'grafik', fungsi: ['30*x - 5*x*x'], jangkauan: [0, 6, 0, 50] },
    pilihan: ['3 m', '30 m', '25 m', '45 m', '90 m'],
    benar: 3,
    langkah: [
      'Bola mencapai tinggi maksimum pada saat kecepatannya nol, yaitu ketika h′(t) = 0 (di puncak, bola berhenti sesaat sebelum turun).',
      'Hitung turunannya: h′(t) = 30 − 10t. Dari h′(t) = 0 diperoleh 10t = 30, sehingga t = 3 detik. (Untuk t < 3, h′ > 0 bola naik; untuk t > 3, h′ < 0 bola turun, sehingga t = 3 memang memberi maksimum.)',
      {
        teks: 'Substitusikan t = 3 ke h(t): h(3) = 30(3) − 5(3)² = 90 − 45 = 45 m. Pada grafik, puncak lintasan ada di (3, 45), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['30*x - 5*x*x'], jangkauan: [0, 6, 0, 50], titik: [{ x: 3, y: 45, label: '(3, 45)' }], datar: [45] },
      },
      'Jadi, tinggi maksimum yang dicapai bola adalah 45 m. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 3 m, adalah WAKTU saat puncak tercapai, bukan tingginya. Pilihan B, 30 m, adalah kecepatan awal (koefisien t). Pilihan E, 90 m, hanya menghitung suku 30t di t = 3 tanpa mengurangkan 5t².',
    alasan: 'h′ = 30 − 10t = 0 di t = 3; h(3) = 45 m.',
  },
  // ========================================================= SANGAT SULIT
  {
    // cek: Math.abs((((2*2.0001 + 1)**3/(2.0001 - 1)) - ((2*1.9999 + 1)**3/(1.9999 - 1))) / 2e-4 - 25) < 1e-3
    id: 'turunan-sangat-01',
    tingkat: 'sangat sulit',
    pertanyaan: 'Jika f(x) = (2x + 1)³/(x − 1), nilai f′(2) adalah…',
    pilihan: ['−50', '150', '275', '25', '125'],
    benar: 3,
    langkah: [
      'Perhatikan bahwa f adalah hasil bagi, dan pembilangnya sendiri memerlukan aturan rantai. Gunakan aturan hasil bagi f′ = (u′v − uv′)/v².',
      'Misalkan u = (2x + 1)³ sehingga, dengan aturan rantai (p = 2x + 1, p′ = 2), u′ = 3(2x + 1)² · 2 = 6(2x + 1)²; dan v = x − 1 sehingga v′ = 1.',
      'Dengan aturan hasil bagi, diperoleh f′(x) = (6(2x + 1)²(x − 1) − (2x + 1)³ · 1)/(x − 1)².',
      'Substitusikan x = 2: u′ = 6(5)² = 150, v = 1, u = 5³ = 125, v′ = 1, v² = 1, sehingga f′(2) = (150 · 1 − 125 · 1)/1 = 25.',
      'Jadi, nilai f′(2) = 25. (Jawaban D)',
    ],
    jebakan: 'Pilihan B, 150, hanya menghitung u′v dan melupakan pengurangan uv′. Pilihan E, 125, adalah nilai f(2) = 125/1. Pilihan C, 275, menjumlahkan u′v + uv′ seolah aturan hasil kali.',
    alasan: 'Hasil bagi dengan rantai: f′(2) = (150 · 1 − 125 · 1)/1² = 25.',
  },
  {
    // cek: 2*1*0 - 1 === -1 && 2*1 - 1 === 1
    id: 'turunan-sangat-02',
    tingkat: 'sangat sulit',
    pertanyaan: 'Salah satu garis singgung kurva y = x² yang melalui titik (0, −1) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-3, 3, -2, 6], titik: [{ x: 0, y: -1, label: '(0, -1)' }] },
    pilihan: ['y = 2x + 1', 'y = x − 1', 'y = −1', 'y = 2x − 1', 'y = 2x'],
    benar: 3,
    langkah: [
      'Perhatikan bahwa titik (0, −1) TIDAK terletak pada parabola (0² ≠ −1), sehingga ia bukan titik singgung. Misalkan titik singgungnya (a, a²).',
      'Gradien garis singgung di titik itu adalah f′(a) = 2a, sehingga persamaan garis singgungnya y − a² = 2a(x − a), yaitu y = 2ax − a².',
      'Garis itu harus melalui (0, −1): −1 = 2a(0) − a², sehingga a² = 1 dan a = 1 atau a = −1. Ada dua garis singgung, yaitu dari titik singgung (1, 1) dan (−1, 1).',
      {
        teks: 'Untuk a = 1, persamaannya y = 2x − 1 (untuk a = −1, y = −2x − 1). Kedua garis menyinggung parabola dan bertemu di (0, −1), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x', '2*x - 1', '-2*x - 1'], jangkauan: [-3, 3, -2, 6], titik: [{ x: 0, y: -1, label: '(0, -1)' }, { x: 1, y: 1, label: '(1, 1)' }, { x: -1, y: 1, label: '(-1, 1)' }], nama: ['y = x²', 'y = 2x − 1', 'y = −2x − 1'] },
      },
      'Jadi, salah satu garis singgung yang melalui (0, −1) adalah y = 2x − 1. (Jawaban D)',
    ],
    jebakan: 'Pilihan E, y = 2x, memakai gradien f′(1) = 2 tetapi tidak melalui (0, −1). Pilihan C, y = −1, memang melalui (0, −1) tetapi tidak menyentuh parabola (semua titik parabola berordinat ≥ 0). Pilihan A, y = 2x + 1, memotong parabola, bukan menyinggung.',
    alasan: 'Garis singgung di (a, a²): y = 2ax − a²; lewat (0, −1) memberi a² = 1; a = 1 memberi y = 2x − 1.',
  },
  {
    // cek: 100 + 4*10*5 === 300 && 10*10*5 === 500
    id: 'turunan-sangat-03',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah kotak beralas persegi TANPA tutup dibuat dari bahan seluas 300 cm². Isi kotak terbesar yang mungkin adalah…',
    pilihan: ['1.000 cm³', '250 cm³', '300 cm³', '750 cm³', '500 cm³'],
    benar: 4,
    langkah: [
      'Misalkan sisi alas kotak x cm dan tingginya t cm. Bahan yang dipakai adalah alas ditambah empat sisi tegak: x² + 4xt = 300.',
      'Nyatakan t dalam x dengan menggunakan kendala luas bahan itu: 4xt = 300 − x², sehingga t = (300 − x²)/(4x).',
      'Nyatakan isi kotak (V) sebagai fungsi terhadap variabel x: V(x) = x²t = x² · (300 − x²)/(4x) = (300x − x³)/4 = 75x − (1/4)x³.',
      'Isi kotak akan maksimum saat V′(x) = 0, sehingga ditulis 75 − (3/4)x² = 0, yaitu x² = 100. Diperoleh x = 10 (nilai x = −10 tidak memenuhi karena panjang sisi tidak mungkin negatif). Uji tanda: V′(5) > 0 dan V′(15) < 0, jadi di x = 10 isi kotak maksimum.',
      {
        teks: 'Untuk x = 10, tingginya t = (300 − 100)/40 = 5 cm. Substitusikan ke V: V = 10 · 10 · 5 = 500 cm³. Grafik V(x) berpuncak di (10, 500), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['(300*x - x*x*x)/4'], jangkauan: [0, 17, 0, 600], titik: [{ x: 10, y: 500, label: '(10, 500)' }], nama: ['V = (300x − x³)/4'] },
      },
      'Jadi, isi kotak terbesar yang mungkin adalah 500 cm³. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 1.000 cm³, memakai kotak BERTUTUP (x² + 4xt = 300 dianggap 2x² + 4xt) atau salah menghitung t = 10. Pilihan C, 300 cm³, menyalin luas bahan. Pilihan B, 250 cm³, membagi dua tanpa alasan.',
    alasan: 'Kendala x² + 4xt = 300 memberi V = 75x − x³/4; V′ = 0 di x = 10, t = 5, V = 500.',
  },
  {
    // cek: 3 * 25 * 2 === 150
    id: 'turunan-sangat-04',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sisi sebuah kubus memanjang dengan laju tetap 2 cm per detik. Pada saat sisinya 5 cm, isinya bertambah dengan laju…',
    gambar: { jenis: 'balok', ukuran: [1, 1, 1] },
    pilihan: ['150 cm³ per detik', '75 cm³ per detik', '50 cm³ per detik', '250 cm³ per detik', '30 cm³ per detik'],
    benar: 0,
    langkah: [
      'Diketahui: ds/dt = 2 cm/detik (laju pertambahan sisi) dan s = 5 cm pada saat yang ditinjau. Ditanya: dV/dt, laju pertambahan isi.',
      'Diketahui juga bahwa isi kubus dinyatakan oleh V = s³, sehingga turunannya terhadap s adalah dV/ds = 3s².',
      'Menurut aturan rantai, dV/dt = dV/ds · ds/dt = 3s² · ds/dt.',
      'Substitusikan s = 5 dan ds/dt = 2, diperoleh dV/dt = 3(5)²(2) = 3 · 25 · 2 = 150 cm³/detik.',
      'Jadi, pada saat sisinya 5 cm, isi kubus bertambah dengan laju 150 cm³ per detik. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 75 cm³ per detik, lupa mengalikan dengan ds/dt = 2 (hanya dV/ds). Pilihan D, 250 cm³ per detik, memakai V = 125 dikalikan 2, seolah isi bertambah sebanding dengan isinya. Pilihan E, 30, memakai 3s · ds/dt.',
    alasan: 'dV/dt = 3s² · ds/dt = 3(25)(2) = 150.',
  },
  {
    // cek: 1 - 3 === -2 && 3*1 - 3 === 0
    id: 'turunan-sangat-05',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kurva y = x³ − 3x mempunyai dua titik dengan garis singgung mendatar. Persamaan garis singgung di titik yang ORDINATNYA negatif adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x*x - 3*x'], jangkauan: [-2.5, 2.5, -4, 4] },
    pilihan: ['y = 2', 'x = 1', 'y = −2', 'y = 0', 'y = −2x'],
    benar: 2,
    langkah: [
      'Garis singgung mendatar mempunyai gradien 0, sehingga titiknya memenuhi f′(x) = 0. Hitung turunannya: f′(x) = 3x² − 3 = 3(x − 1)(x + 1), sehingga x = 1 atau x = −1.',
      'Hitung ordinatnya: f(1) = 1 − 3 = −2 dan f(−1) = −1 + 3 = 2. Titik yang ordinatnya negatif adalah (1, −2).',
      {
        teks: 'Garis singgung mendatar melalui (1, −2) adalah garis y = −2 (gradien 0, sehingga persamaannya y − (−2) = 0(x − 1)), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x*x - 3*x', '-2'], jangkauan: [-2.5, 2.5, -4, 4], titik: [{ x: 1, y: -2, label: '(1, -2)' }, { x: -1, y: 2, label: '(-1, 2)' }], nama: ['y = x³ − 3x', 'y = −2'] },
      },
      'Jadi, persamaan garis singgung di titik yang ordinatnya negatif adalah y = −2. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, y = 2, adalah garis singgung di titik lainnya, (−1, 2), yang ordinatnya positif. Pilihan B, x = 1, adalah garis TEGAK melalui titik itu, bukan garis mendatar. Pilihan E, y = −2x, bergradien −2, bukan 0.',
    alasan: 'f′ = 0 di x = ±1; (1, −2) berordinat negatif; garis mendatar y = −2.',
  },
  {
    // cek: 16 + 4*4*2 === 48 && 16 * 2 === 32
    id: 'turunan-sangat-06',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah tangki tanpa tutup beralas persegi mempunyai isi 32 m³. Luas bahan paling sedikit yang diperlukan adalah…',
    pilihan: ['32 m²', '64 m²', '48 m²', '96 m²', '16 m²'],
    benar: 2,
    langkah: [
      'Misalkan alas tangki berbentuk persegi dengan sisi s meter dan tingginya t meter. Karena isinya 32 m³, berlaku s²t = 32.',
      'Nyatakan t dalam s dengan menggunakan kendala isi itu: t = 32/s².',
      'Luas bahan tangki tanpa tutup adalah alas ditambah empat sisi tegak. Nyatakan L sebagai fungsi terhadap variabel s: L(s) = s² + 4st = s² + 4s · 32/s² = s² + 128/s.',
      'Luas bahan akan minimum saat L′(s) = 0, sehingga ditulis 2s − 128/s² = 0, yaitu 2s³ = 128, s³ = 64, dan s = 4. (Uji tanda: L′(2) = 4 − 32 < 0 dan L′(8) = 16 − 2 > 0, sehingga di s = 4 luasnya minimum.)',
      'Untuk s = 4, diperoleh t = 32/16 = 2 m.',
      {
        teks: 'Substitusikan s = 4 ke L(s): L(4) = 16 + 128/4 = 16 + 32 = 48 m². Grafik L(s) berlembah di (4, 48), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x + 128/x'], jangkauan: [1, 9, 0, 140], titik: [{ x: 4, y: 48, label: '(4, 48)' }], nama: ['L = s² + 128/s'] },
      },
      'Jadi, luas bahan paling sedikit yang diperlukan adalah 48 m². (Jawaban C)',
    ],
    jebakan: 'Pilihan B, 64 m², menambahkan tutup (2s² + 4st), padahal tangkinya tanpa tutup. Pilihan A, 32 m², menyalin angka isi. Pilihan E, 16 m², hanya luas alasnya.',
    alasan: 'L = s² + 128/s; L′ = 0 di s = 4, t = 2; L(4) = 48 m².',
  },
  {
    // cek: Math.abs(0.5 * (4 - 3/(-0.75)) * (3 - 4*(-0.75)) - 24) < 1e-9 && Math.abs(-16 + 9/((-0.75)**2)) < 1e-9
    id: 'turunan-sangat-16',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah garis melalui titik (4, 3) memotong sumbu-x positif di A dan sumbu-y positif di B. Luas minimum segitiga OAB adalah…',
    gambar: { jenis: 'bidang', bangun: [[0, 0], [8, 0], [0, 6]], labelBangun: ['O', 'A', 'B'], jangkauan: [-1, 10, -1, 8], garis: [{ m: -0.75, c: 6, label: 'garis lewat (4, 3)' }] },
    pilihan: ['12', '48', '24', '30', '20'],
    benar: 2,
    langkah: [
      'Misalkan gradien garis itu m; karena garis memotong kedua sumbu positif setelah melalui (4, 3), haruslah m < 0. Persamaan garisnya y − 3 = m(x − 4).',
      'Cari titik potongnya dengan sumbu. Untuk y = 0: −3 = m(x − 4), sehingga x = 4 − 3/m, yaitu A(4 − 3/m, 0). Untuk x = 0: y = 3 − 4m, yaitu B(0, 3 − 4m).',
      'Nyatakan luas segitiga OAB sebagai fungsi terhadap m: L(m) = (1/2)(4 − 3/m)(3 − 4m) = (1/2)(12 − 16m − 9/m + 12) = (1/2)(24 − 16m − 9/m).',
      'Luas akan minimum saat L′(m) = 0, sehingga ditulis (1/2)(−16 + 9/m²) = 0, yaitu m² = 9/16 dan m = −3/4 (nilai m = 3/4 tidak memenuhi karena m harus negatif).',
      {
        teks: 'Substitusikan m = −3/4: A(4 + 4, 0) = A(8, 0) dan B(0, 3 + 3) = B(0, 6), sehingga L = (1/2)(8)(6) = 24 satuan luas, seperti gambar berikut.',
        gambar: { jenis: 'bidang', bangun: [[0, 0], [8, 0], [0, 6]], labelBangun: ['O', 'A(8, 0)', 'B(0, 6)'], jangkauan: [-1, 10, -1, 8], garis: [{ m: -0.75, c: 6, label: 'y = −(3/4)x + 6' }], pusat: [4, 3] },
      },
      'Jadi, luas minimum segitiga OAB adalah 24 satuan luas. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 12, adalah luas persegi panjang dari titik asal ke (4, 3), bukan luas segitiga. Pilihan B, 48, lupa faktor 1/2 pada rumus luas segitiga (8 × 6). Pilihan D, 30, muncul dari garis y = −x + 7 (m = −1), yang bukan yang terkecil.',
    alasan: 'L(m) = (1/2)(24 − 16m − 9/m); L′ = 0 di m = −3/4; A(8, 0), B(0, 6), luas 24.',
  },
  {
    // cek: 12*(-1) + 4*3 === 0 && -1 + 3 + 3 === 5
    id: 'turunan-sangat-08',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kurva y = ax³ + bx² + 3 mempunyai titik stasioner di x = 2 dan melalui titik (1, 5). Nilai a adalah…',
    pilihan: ['1', '−3', '3', '2', '−1'],
    benar: 4,
    langkah: [
      'Terjemahkan kedua keterangan menjadi persamaan. Titik stasioner di x = 2 berarti y′(2) = 0; melalui (1, 5) berarti y(1) = 5.',
      'Hitung turunannya: y′ = 3ax² + 2bx. Syarat y′(2) = 0 memberi 12a + 4b = 0, sehingga b = −3a.',
      'Syarat y(1) = 5 memberi a + b + 3 = 5, sehingga a + b = 2.',
      'Substitusikan b = −3a: a − 3a = 2, sehingga −2a = 2 dan a = −1 (dan b = 3).',
      'Sebagai pemeriksaan, y = −x³ + 3x² + 3 memberi y′ = −3x² + 6x = −3x(x − 2), yang nol di x = 2, dan y(1) = −1 + 3 + 3 = 5.',
      'Jadi, nilai a adalah −1. (Jawaban E)',
    ],
    jebakan: 'Pilihan C, 3, adalah nilai b, bukan a. Pilihan A, 1, salah tanda saat menyelesaikan −2a = 2. Pilihan B, −3, mengira b = −3a berarti a = −3.',
    alasan: 'y′(2) = 0 memberi b = −3a; y(1) = 5 memberi a + b = 2; jadi a = −1.',
  },
  {
    // cek: Math.abs(6*Math.PI / (Math.PI * 36 / 9) - 1.5) < 1e-9
    id: 'turunan-sangat-17',
    tingkat: 'sangat sulit',
    pertanyaan: 'Air dituang ke dalam wadah berbentuk kerucut terbalik (puncak di bawah) yang tingginya 12 cm dan jari-jari alasnya 4 cm, dengan laju 6π cm³ per menit. Laju kenaikan permukaan air pada saat tinggi air 6 cm adalah…',
    gambar: { jenis: 'svg', viewBox: '0 0 460 230', isi: '<line x1="130" y1="30" x2="330" y2="30" stroke="#1F2430" stroke-width="1.8"/><line x1="130" y1="30" x2="230" y2="210" stroke="#1F2430" stroke-width="1.8"/><line x1="330" y1="30" x2="230" y2="210" stroke="#1F2430" stroke-width="1.8"/><ellipse cx="230" cy="30" rx="100" ry="14" fill="none" stroke="#1F2430" stroke-width="1.2"/><line x1="180" y1="120" x2="280" y2="120" stroke="#3A6EA5" stroke-width="2"/><polygon points="180,120 280,120 230,210" fill="rgba(58,110,165,0.18)"/><line x1="230" y1="30" x2="230" y2="210" stroke="#8B8378" stroke-width="1.2" stroke-dasharray="4 3"/><g font-family="var(--font-mono), sans-serif" font-size="12"><text x="342" y="34" fill="#1F2430">r = 4 cm</text><text x="240" y="70" fill="#8B8378">12 cm</text><text x="290" y="124" fill="#3A6EA5">r</text><text x="240" y="170" fill="#3A6EA5">h</text></g>' },
    pilihan: ['3 cm per menit', '0,5 cm per menit', '6 cm per menit', '2 cm per menit', '1,5 cm per menit'],
    benar: 4,
    langkah: [
      'Diketahui: dV/dt = 6π cm³/menit. Ditanya: dh/dt pada saat h = 6 cm. Misalkan h tinggi air dan r jari-jari permukaan air pada saat itu.',
      {
        teks: 'Perhatikan sketsa berikut. Air di dalam kerucut juga berbentuk kerucut yang sebangun dengan wadahnya, sehingga r/h = 4/12, yaitu r = h/3. Dengan begitu isi air hanya bergantung pada h.',
        gambar: { jenis: 'segitiga-umum', titik: ['T', 'Q', 'P'], panjang: [12.649, 4, 12], sisi: ['', 'r = 4 cm', 't = 12 cm'], siku: 2, sorot: 1 },
      },
      'Nyatakan isi air sebagai fungsi terhadap h: V = (1/3)πr²h = (1/3)π(h/3)²h = (1/3)π(h²/9)h = πh³/27. Turunannya terhadap h adalah dV/dh = 3πh²/27 = πh²/9.',
      'Menurut aturan rantai, dV/dt = dV/dh · dh/dt. Substitusikan h = 6 dan dV/dt = 6π: 6π = (π · 36/9) · dh/dt = 4π · dh/dt.',
      'Untuk itu, dh/dt = 6π/(4π) = 1,5 cm/menit.',
      'Jadi, laju kenaikan permukaan air pada saat tinggi air 6 cm adalah 1,5 cm per menit. (Jawaban E)',
    ],
    jebakan: 'Pilihan C, 6 cm per menit, memakai dV/dh = π h² tanpa faktor 1/9 dari kesebangunan r = h/3, atau membagi dV/dt dengan π saja. Pilihan B, 0,5 cm per menit, memakai r = 4 tetap (dV/dh = 16π), padahal jari-jari permukaan air mengecil ke bawah.',
    alasan: 'r = h/3 → V = πh³/27 → dV/dt = (πh²/9) dh/dt; di h = 6: 6π = 4π dh/dt, dh/dt = 1,5.',
  },
  {
    // cek: 1 - 4 + 3 === 0 && 9 - 12 + 3 === 0 && 2*1 + 2*3 === 8
    id: 'turunan-sangat-10',
    tingkat: 'sangat sulit',
    pertanyaan: 'Dari titik (2, 3) dapat ditarik dua garis singgung ke parabola y = x². Jumlah gradien kedua garis singgung itu adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-1, 4, -1, 10], titik: [{ x: 2, y: 3, label: '(2, 3)' }] },
    pilihan: ['4', '8', '6', '12', '2'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa (2, 3) tidak terletak pada parabola (2² = 4 ≠ 3), sehingga bukan titik singgung. Misalkan titik singgungnya (a, a²) dengan gradien f′(a) = 2a.',
      'Persamaan garis singgung di (a, a²) adalah y − a² = 2a(x − a), yaitu y = 2ax − a². Garis ini harus melalui (2, 3): 3 = 4a − a², sehingga a² − 4a + 3 = 0, (a − 1)(a − 3) = 0, dan a = 1 atau a = 3.',
      {
        teks: 'Kedua gradiennya adalah 2(1) = 2 dan 2(3) = 6, dari titik singgung (1, 1) dan (3, 9), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x', '2*x - 1', '6*x - 9'], jangkauan: [-1, 4, -1, 10], titik: [{ x: 2, y: 3, label: '(2, 3)' }, { x: 1, y: 1, label: '(1, 1)' }, { x: 3, y: 9, label: '(3, 9)' }], nama: ['y = x²', 'y = 2x − 1', 'y = 6x − 9'] },
      },
      'Dengan demikian, jumlah gradiennya 2 + 6 = 8. (Jalan pintas: jumlah akar a₁ + a₂ = 4, sehingga jumlah gradien 2(a₁ + a₂) = 8.)',
      'Jadi, jumlah gradien kedua garis singgung itu adalah 8. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 4, adalah jumlah absis titik singgung (a₁ + a₂), belum dikalikan 2. Pilihan C, 6, hanya gradien salah satu garis. Pilihan D, 12, adalah hasil kali gradiennya.',
    alasan: 'Garis singgung y = 2ax − a² lewat (2, 3): a = 1 atau 3; gradien 2 + 6 = 8.',
  },
  {
    // cek: 3*1 + 2*(-6)*1 + 9 === 0 && 3*9 + 2*(-6)*3 + 9 === 0 && -6 + 9 === 3
    id: 'turunan-sangat-11',
    tingkat: 'sangat sulit',
    pertanyaan: 'Fungsi f(x) = x³ + ax² + bx mempunyai titik stasioner di x = 1 dan x = 3. Nilai a + b adalah…',
    pilihan: ['−3', '15', '−15', '3', '9'],
    benar: 3,
    langkah: [
      'Titik stasioner adalah tempat f′(x) = 0. Hitung turunannya: f′(x) = 3x² + 2ax + b.',
      'Karena x = 1 dan x = 3 adalah akar-akar f′(x) = 0, maka f′(x) = 3(x − 1)(x − 3) = 3(x² − 4x + 3) = 3x² − 12x + 9.',
      'Samakan koefisiennya: 2a = −12 sehingga a = −6, dan b = 9.',
      'Untuk itu, a + b = −6 + 9 = 3.',
      'Jadi, nilai a + b = 3. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, −3, salah tanda pada b (menulis f′ = 3(x − 1)(x − 3) dengan hasil kali akar keliru). Pilihan C, −15, menjumlahkan −12 dan −3, memakai koefisien x sebagai a tanpa dibagi 2 dan salah tanda b.',
    alasan: 'f′ = 3(x − 1)(x − 3) = 3x² − 12x + 9, jadi a = −6, b = 9, a + b = 3.',
  },
  {
    // cek: Math.abs((20 - 2*(10/3)) * (20 - 6*(10/3))) < 1e-9
    id: 'turunan-sangat-12',
    tingkat: 'sangat sulit',
    pertanyaan: 'Karton persegi bersisi 20 cm dipotong keempat pojoknya berbentuk persegi bersisi x, lalu dilipat menjadi kotak tanpa tutup. Nilai x supaya isinya terbesar adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*(20 - 2*x)*(20 - 2*x)'], jangkauan: [0, 10, 0, 650], nama: ['V = x(20 − 2x)²'] },
    pilihan: ['10/3 cm', '10 cm', '5 cm', '20/3 cm', '2 cm'],
    benar: 0,
    langkah: [
      'Misalkan x menyatakan sisi persegi yang dipotong (cm), sekaligus tinggi kotak; alas kotak berukuran (20 − 2x) × (20 − 2x), dengan syarat 0 < x < 10.',
      'Nyatakan isi kotak sebagai fungsi terhadap x: V(x) = x(20 − 2x)².',
      'Isi kotak akan maksimum saat V′(x) = 0. Dengan aturan hasil kali dan rantai, V′(x) = (20 − 2x)² + x · 2(20 − 2x)(−2) = (20 − 2x)[(20 − 2x) − 4x] = (20 − 2x)(20 − 6x).',
      'Dari V′(x) = 0 diperoleh x = 10 atau x = 10/3. Nilai x = 10 tidak memenuhi karena alasnya lenyap (isi 0). Jadi x yang diambil adalah x = 10/3. (Uji tanda: V′(3) = 14 · 2 > 0 dan V′(4) = 12 · (−4) < 0, sehingga di x = 10/3 isi maksimum.)',
      {
        teks: 'Grafik V(x) berpuncak di x = 10/3 ≈ 3,33 dengan V = (10/3)(40/3)² = 16.000/27 ≈ 592,6 cm³, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*(20 - 2*x)*(20 - 2*x)'], jangkauan: [0, 10, 0, 650], titik: [{ x: 3.333, y: 592.6, label: '(10/3; 592,6)' }], nama: ['V = x(20 − 2x)²'] },
      },
      'Jadi, nilai x supaya isinya terbesar adalah 10/3 cm. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 10 cm, adalah akar V′ yang lain, tetapi memberi isi nol (alasnya habis dipotong). Pilihan C, 5 cm, mengira potongan seperempat sisi selalu optimal. Pilihan E, 2 cm, meniru jawaban soal karton 12 cm tanpa menghitung.',
    alasan: 'V′ = (20 − 2x)(20 − 6x) = 0 memberi x = 10/3 (x = 10 tidak memenuhi).',
  },
  {
    // cek: Math.abs(4 * Math.PI * 9 * 2 - 72 * Math.PI) < 1e-9
    id: 'turunan-sangat-13',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah balon berbentuk bola ditiup sehingga jari-jarinya bertambah 2 cm per detik. Pada saat jari-jarinya 3 cm, isinya bertambah dengan laju… (V = (4/3)πr³)',
    pilihan: ['36π cm³ per detik', '24π cm³ per detik', '72π cm³ per detik', '12π cm³ per detik', '108π cm³ per detik'],
    benar: 2,
    langkah: [
      'Diketahui: dr/dt = 2 cm/detik dan r = 3 cm pada saat yang ditinjau. Ditanya: dV/dt.',
      'Diketahui juga bahwa rumus isi bola dinyatakan oleh V = (4/3)πr³, sehingga turunannya terhadap r adalah dV/dr = (4/3)π · 3r² = 4πr².',
      'Menurut aturan rantai, dV/dt = dV/dr · dr/dt = 4πr² · dr/dt.',
      'Substitusikan r = 3 dan dr/dt = 2, diperoleh dV/dt = 4π(3)²(2) = 4π · 9 · 2 = 72π cm³/detik.',
      'Jadi, pada saat jari-jarinya 3 cm, isi balon bertambah dengan laju 72π cm³ per detik. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 36π, lupa mengalikan dengan dr/dt = 2 (hanya dV/dr). Pilihan B, 24π, memakai dV/dr = 4πr (pangkatnya kurang satu). Pilihan D, 12π, mengalikan 4π dengan r dan dr/dt tanpa mengkuadratkan r.',
    alasan: 'dV/dt = 4πr² · dr/dt = 4π(9)(2) = 72π.',
  },
  {
    // cek: Math.abs(Math.sin(Math.PI/4) + Math.cos(Math.PI/4) - Math.SQRT2) < 1e-9
    id: 'turunan-sangat-14',
    tingkat: 'sangat sulit',
    pertanyaan: 'Nilai maksimum fungsi f(x) = sin x + cos x pada 0 ≤ x ≤ 2π adalah…',
    gambar: { jenis: 'grafik', fungsi: ['Math.sin(x) + Math.cos(x)'], jangkauan: [0, 6.3, -2, 2] },
    pilihan: ['2', '1', '√3', '√2', '1 + √2'],
    benar: 3,
    langkah: [
      'Nilai maksimum pada selang tertutup dicapai di titik stasioner atau di ujung selang. Hitung turunannya: f′(x) = cos x − sin x.',
      'Titik stasioner: cos x − sin x = 0, sehingga sin x = cos x, yaitu tan x = 1, dan pada 0 ≤ x ≤ 2π diperoleh x = π/4 atau x = 5π/4.',
      'Hitung nilai f di titik stasioner dan ujung selang: f(π/4) = (1/2)√2 + (1/2)√2 = √2; f(5π/4) = −(1/2)√2 − (1/2)√2 = −√2; f(0) = 0 + 1 = 1; f(2π) = 1.',
      {
        teks: 'Nilai terbesarnya adalah √2 ≈ 1,414 di x = π/4, seperti puncak pada grafik berikut. (Sebagai pemeriksaan, sin x + cos x = √2 sin(x + π/4) yang amplitudonya √2.)',
        gambar: { jenis: 'grafik', fungsi: ['Math.sin(x) + Math.cos(x)'], jangkauan: [0, 6.3, -2, 2], titik: [{ x: 0.785, y: 1.414, label: '(π/4, √2)' }, { x: 3.927, y: -1.414, label: '(5π/4, -√2)' }], datar: [1.414] },
      },
      'Jadi, nilai maksimum f(x) = sin x + cos x pada 0 ≤ x ≤ 2π adalah √2. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 2, menjumlahkan nilai maksimum sin x dan cos x masing-masing (1 + 1), padahal keduanya tidak pernah bernilai 1 pada x yang sama. Pilihan B, 1, hanya memeriksa ujung selang x = 0 tanpa titik stasioner.',
    alasan: 'f′ = cos x − sin x = 0 di x = π/4; f(π/4) = √2, lebih besar dari nilai ujung 1.',
  },
  {
    // cek: Math.abs(Math.sqrt(2.5 + (2.5 - 3)**2) - Math.sqrt(11)/2) < 1e-9 && 4*Math.sqrt(2.5)**3 - 10*Math.sqrt(2.5) < 1e-9
    id: 'turunan-sangat-15',
    tingkat: 'sangat sulit',
    pertanyaan: 'Jarak terdekat dari titik (0, 3) ke parabola y = x² adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-3, 3, -1, 6], titik: [{ x: 0, y: 3, label: '(0, 3)' }] },
    pilihan: ['3', '(1/2)√11', '√3', '(1/2)√5', '2'],
    benar: 1,
    langkah: [
      'Misalkan titik pada parabola adalah (x, x²). Kuadrat jaraknya ke (0, 3) adalah D(x) = x² + (x² − 3)²; meminimumkan jarak sama dengan meminimumkan kuadrat jaraknya, dan bentuk kuadrat lebih mudah diturunkan.',
      'Jabarkan: D(x) = x² + x⁴ − 6x² + 9 = x⁴ − 5x² + 9.',
      'Jarak akan minimum saat D′(x) = 0, sehingga ditulis 4x³ − 10x = 0, yaitu 2x(2x² − 5) = 0. Diperoleh x = 0 atau x² = 5/2.',
      'Uji nilainya: D(0) = 9 (jarak 3, ini maksimum lokal karena D″(0) = −10 < 0), sedangkan untuk x² = 5/2 diperoleh D = 25/4 − 25/2 + 9 = 11/4.',
      {
        teks: 'Dengan demikian, jarak terdekatnya √(11/4) = (1/2)√11 ≈ 1,66, dicapai di dua titik (±√(5/2), 5/2), seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x'], jangkauan: [-3, 3, -1, 6], titik: [{ x: 0, y: 3, label: '(0, 3)' }, { x: 1.581, y: 2.5, label: '(√(5/2), 5/2)' }, { x: -1.581, y: 2.5 }] },
      },
      'Jadi, jarak terdekat dari titik (0, 3) ke parabola y = x² adalah (1/2)√11. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 3, adalah jarak ke titik puncak (0, 0), yang ternyata bukan yang terdekat; titik terdekat berada di kedua sisi parabola. Pilihan D, (1/2)√5, menyalin akar x² = 5/2 sebagai jaraknya.',
    alasan: 'D(x) = x⁴ − 5x² + 9; D′ = 0 di x² = 5/2 memberi D = 11/4, jarak (1/2)√11.',
  },
]
