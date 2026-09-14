/**
 * Bank soal latihan Integral: 60 soal, 15 tiap tingkat.
 *
 * 14 Sep 2026: seluruh pembahasan ditulis ulang meniru cara mathcyber1997
 * (catatan belajar `PELAJARI BENTUK SOAL MATEMATIKA/CATATAN-BELAJAR-PEMBAHASAN.md`
 * bagian 4.4): integran diubah ke bentuk pangkat dulu; "Dengan menggunakan
 * aturan integral dasar beserta definisi integral tentu, diperoleh" lalu
 * KEDUA substitusi batas ditulis lengkap dalam kurung; luas daerah: cari
 * titik potong dengan menyamakan fungsi, batas dari absisnya, kurva mana yang
 * di atas diputuskan lewat uji titik, daerah di bawah sumbu dibalik tandanya,
 * partisi dengan garis tegak dijelaskan lewat batang tegak; cara lain diberi
 * judul "Cara 2"; penutup "Jadi, nilai dari ∫ ... = 4. (Jawaban D)". Gambar
 * bantu: daerah diarsir dengan titik potong berlabel, garis partisi, batang
 * tegak (strip), dan bagian daerah bernama L₁, L₂.
 * Pertanyaan ditulis formal: "Nilai dari ∫₀³ 2x dx adalah…".
 *
 * Id soal lama dipertahankan. Delapan soal kembar atau terlalu tipis diganti
 * jenis yang belum ada (pola mathcyber1997, ditulis sendiri): md4 dan md10
 * jadi md16 (kelinearan integral tentu) dan md17 (membalik batas); sd3 dan
 * sd12 jadi sd16 (fungsi genap pada selang simetris) dan sd17 (jumlah
 * Riemann titik tengah); sl9 dan sl13 jadi sl16 (∫f(5 − x) dari ∫f(x)) dan
 * sl17 (garis x = k yang membagi daerah sama luas); ss2 dan ss14 jadi ss16
 * (f(x) memuat integral dirinya sendiri) dan ss17 (fungsi periodik).
 * Jawaban benar disebar merata oleh `alat/acak_pilihan.mjs`.
 *
 * Tiap jawaban berangka punya `// cek:` yang dijalankan `alat/cek_kuis.mjs`;
 * `--ketat` juga memeriksa gaya pembahasannya.
 */
export type { TingkatKuis, SoalKuis } from '@/content/tipe'
import type { SoalKuis } from '@/content/tipe'

export const KUIS: SoalKuis[] = [
  // ================================================================ MUDAH
  {
    // cek: Math.abs((1.0001**6/6 - 0.9999**6/6) / 2e-4 - 1) < 1e-6
    id: 'int-md1',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari x⁵ adalah…',
    pilihan: ['x⁶/6 + C', '5x⁴ + C', 'x⁶ + C', 'x⁴/4 + C', '6x⁶ + C'],
    benar: 0,
    langkah: [
      'Gunakan aturan integral dasar untuk fungsi pangkat: ∫xⁿ dx = xⁿ⁺¹/(n + 1) + C untuk n ≠ −1; pangkatnya naik satu, lalu dibagi pangkat yang baru.',
      'Dengan n = 5, diperoleh ∫x⁵ dx = x⁵⁺¹/(5 + 1) + C = x⁶/6 + C.',
      'Sebagai pemeriksaan, turunkan hasilnya: (x⁶/6)′ = 6x⁵/6 = x⁵, kembali ke integrannya.',
      'Jadi, antiturunan dari x⁵ adalah x⁶/6 + C. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 5x⁴ + C, adalah TURUNAN x⁵, arah yang berlawanan. Pilihan C, x⁶ + C, menaikkan pangkat tetapi lupa membagi 6; turunannya 6x⁵, bukan x⁵. Pilihan E, 6x⁶, mengalikan alih-alih membagi.',
    alasan: 'Aturan pangkat: ∫xⁿ dx = xⁿ⁺¹/(n + 1) + C, jadi x⁶/6 + C.',
  },
  {
    // cek: Math.abs((1.0001**3 - 0.9999**3) / 2e-4 - 3) < 1e-6
    id: 'int-md2',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari 3x² adalah…',
    pilihan: ['x³ + C', '9x³ + C', '6x + C', '3x³ + C', 'x³/3 + C'],
    benar: 0,
    langkah: [
      'Gunakan aturan integral dasar: konstanta pengali boleh dikeluarkan, lalu ∫xⁿ dx = xⁿ⁺¹/(n + 1) + C.',
      'Dengan demikian, ∫3x² dx = 3 · x³/3 + C = x³ + C; pengali 3 tercoret oleh pembagi 3.',
      'Sebagai pemeriksaan, (x³)′ = 3x², kembali ke integrannya.',
      'Jadi, antiturunan dari 3x² adalah x³ + C. (Jawaban A)',
    ],
    jebakan: 'Pilihan D, 3x³ + C, menaikkan pangkat tetapi lupa membagi dengan pangkat baru; turunannya 9x². Pilihan C, 6x + C, adalah turunan 3x². Pilihan B, 9x³, mengalikan 3 dengan 3 alih-alih membaginya.',
    alasan: '∫3x² dx = 3 · x³/3 + C = x³ + C.',
  },
  {
    // cek: Math.abs(((1.0001**2 + 1.0001) - (0.9999**2 + 0.9999)) / 2e-4 - 3) < 1e-6
    id: 'int-md3',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari 2x + 1 adalah…',
    pilihan: ['2x² + x + C', 'x² + x + C', 'x² + x', '2 + C', 'x² + 1 + C'],
    benar: 1,
    langkah: [
      'Gunakan aturan integral dasar suku demi suku: integral jumlah adalah jumlah integralnya.',
      'Integralkan tiap suku: ∫2x dx = 2 · x²/2 = x², dan ∫1 dx = x. Dengan demikian, ∫(2x + 1) dx = x² + x + C.',
      'Konstanta C wajib ditulis, karena setiap fungsi x² + x + C (berapa pun C) mempunyai turunan 2x + 1; antiturunan tak tentu adalah seluruh keluarga fungsi itu.',
      'Jadi, antiturunan dari 2x + 1 adalah x² + x + C. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, x² + x, benar bentuknya tetapi tanpa konstanta C, padahal antiturunan tak tentu selalu memuat C. Pilihan A, 2x² + x + C, lupa membagi 2x dengan pangkat baru 2. Pilihan D, 2 + C, adalah turunan, bukan antiturunan.',
    alasan: 'Suku demi suku: x² + x + C (C wajib).',
  },
  {
    // cek: 2*5 - 3*(-2) === 16
    id: 'int-md16',
    tingkat: 'mudah',
    pertanyaan: 'Diketahui ∫₁³ f(x) dx = 5 dan ∫₁³ g(x) dx = −2. Nilai dari ∫₁³ (2f(x) − 3g(x)) dx adalah…',
    pilihan: ['4', '11', '16', '−16', '1'],
    benar: 2,
    langkah: [
      'Ingat sifat kelinearan integral tentu: ∫(a·f(x) − b·g(x)) dx = a∫f(x) dx − b∫g(x) dx pada batas yang sama; konstanta pengali boleh dikeluarkan dan integral selisih adalah selisih integralnya.',
      'Dengan sifat itu, diperoleh ∫₁³ (2f(x) − 3g(x)) dx = 2∫₁³ f(x) dx − 3∫₁³ g(x) dx.',
      'Substitusikan nilai yang diketahui: 2(5) − 3(−2) = 10 + 6 = 16.',
      'Jadi, nilai dari ∫₁³ (2f(x) − 3g(x)) dx = 16. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 4, menghitung 10 − 6, lupa bahwa integral g bernilai NEGATIF sehingga −3(−2) = +6. Pilihan B, 11, hanya menghitung 2(5) + 1 secara keliru; pilihan E, 1, menghitung 5 − 2 − 2 tanpa pengali.',
    alasan: 'Kelinearan: 2(5) − 3(−2) = 16.',
  },
  {
    // cek: Math.abs((-Math.cos(1.0001) + Math.cos(0.9999)) / 2e-4 - Math.sin(1)) < 1e-6
    id: 'int-md5',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari sin x adalah…',
    pilihan: ['cos x + C', '−sin x + C', 'sin x + C', '−cos x + C', 'tan x + C'],
    benar: 3,
    langkah: [
      'Antiturunan dari sin x adalah fungsi yang turunannya sin x. Ingat aturan turunan trigonometri: (cos x)′ = −sin x, sehingga (−cos x)′ = sin x.',
      'Dengan demikian, ∫sin x dx = −cos x + C.',
      'Sebagai pemeriksaan, turunkan hasilnya: (−cos x + C)′ = −(−sin x) + 0 = sin x, kembali ke integrannya.',
      'Jadi, antiturunan dari sin x adalah −cos x + C. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, cos x + C, lupa tanda negatif; turunan cos x adalah −sin x, bukan sin x. Pilihan B, −sin x + C, menukar turunan dengan integral. Urutan integralnya: sin → −cos → −sin → cos → sin.',
    alasan: '(−cos x)′ = sin x, jadi ∫sin x dx = −cos x + C.',
  },
  {
    // cek: Math.abs((Math.sin(1.0001) - Math.sin(0.9999)) / 2e-4 - Math.cos(1)) < 1e-6
    id: 'int-md6',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari cos x adalah…',
    pilihan: ['−sin x + C', 'sin x + C', '−cos x + C', 'sec² x + C', 'cos x + C'],
    benar: 1,
    langkah: [
      'Antiturunan dari cos x adalah fungsi yang turunannya cos x. Ingat aturan turunan trigonometri: (sin x)′ = cos x.',
      'Dengan demikian, ∫cos x dx = sin x + C.',
      'Sebagai pemeriksaan, (sin x + C)′ = cos x, kembali ke integrannya.',
      'Jadi, antiturunan dari cos x adalah sin x + C. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, −sin x + C, memberi tanda negatif yang tidak perlu; tanda negatif hanya muncul pada ∫sin x dx = −cos x. Pilihan D, sec² x + C, adalah turunan tan x, tidak berkaitan.',
    alasan: '(sin x)′ = cos x, jadi ∫cos x dx = sin x + C.',
  },
  {
    // cek: Math.abs((Math.exp(1.0001) - Math.exp(0.9999)) / 2e-4 - Math.E) < 1e-6
    id: 'int-md7',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari eˣ adalah…',
    pilihan: ['ln x + C', 'x eˣ + C', 'eˣ/x + C', 'eˣ + C', 'e^(x+1)/(x + 1) + C'],
    benar: 3,
    langkah: [
      'Ingat bahwa eˣ adalah fungsi eksponen (peubah di pangkat), sehingga aturan pangkat ∫xⁿ dx = xⁿ⁺¹/(n + 1) tidak berlaku.',
      'Sifat istimewa fungsi eksponen alami: turunannya sama dengan dirinya, (eˣ)′ = eˣ, sehingga antiturunannya juga dirinya sendiri: ∫eˣ dx = eˣ + C.',
      'Jadi, antiturunan dari eˣ adalah eˣ + C. (Jawaban D)',
    ],
    jebakan: 'Pilihan E, e^(x+1)/(x + 1), memakai aturan pangkat seolah eˣ adalah xᵉ; aturan itu untuk peubah di alas. Pilihan A, ln x + C, adalah antiturunan dari 1/x, bukan dari eˣ.',
    alasan: '(eˣ)′ = eˣ, jadi ∫eˣ dx = eˣ + C.',
  },
  {
    // cek: Math.abs(((2/3)*1.0001**1.5 - (2/3)*0.9999**1.5) / 2e-4 - 1) < 1e-6
    id: 'int-md8',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari √x adalah…',
    pilihan: ['(2/3)x√x + C', 'x²/2 + C', '(1/2)√x + C', '(3/2)x√x + C', '√x + C'],
    benar: 0,
    langkah: [
      'Ubah bentuk integrannya terlebih dahulu ke bentuk pangkat: √x = x^(1/2).',
      'Dengan aturan integral dasar, ∫x^(1/2) dx = x^(1/2 + 1)/(1/2 + 1) + C = x^(3/2)/(3/2) + C = (2/3)x^(3/2) + C.',
      'Tulis kembali ke bentuk akar: x^(3/2) = x · x^(1/2) = x√x, sehingga hasilnya (2/3)x√x + C.',
      'Sebagai pemeriksaan, ((2/3)x^(3/2))′ = (2/3)(3/2)x^(1/2) = √x, kembali ke integrannya.',
      'Jadi, antiturunan dari √x adalah (2/3)x√x + C. (Jawaban A)',
    ],
    jebakan: 'Pilihan D, (3/2)x√x + C, membalik pembagi: hasil bagi oleh 3/2 adalah dikali 2/3, bukan dikali 3/2. Pilihan C, (1/2)√x, adalah turunan √x dikali x, arah yang berlawanan. Pilihan B, x²/2, mengira √x sama dengan x.',
    alasan: '√x = x^(1/2); integralnya x^(3/2)/(3/2) = (2/3)x√x + C.',
  },
  {
    // cek: Math.abs((1.0001**4 - 0.9999**4) / 2e-4 - 4) < 1e-6
    id: 'int-md9',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari 4x³ adalah…',
    pilihan: ['12x² + C', '4x⁴ + C', 'x⁴/4 + C', 'x⁴ + C', 'x³ + C'],
    benar: 3,
    langkah: [
      'Gunakan aturan integral dasar: ∫4x³ dx = 4 · x⁴/4 + C; pangkat naik satu menjadi 4 lalu dibagi 4.',
      'Pengali 4 tercoret oleh pembagi 4, sehingga hasilnya x⁴ + C.',
      'Sebagai pemeriksaan, (x⁴)′ = 4x³, kembali ke integrannya.',
      'Jadi, antiturunan dari 4x³ adalah x⁴ + C. (Jawaban D)',
    ],
    jebakan: 'Pilihan B, 4x⁴ + C, lupa membagi dengan pangkat baru 4. Pilihan C, x⁴/4 + C, membagi 4 tetapi lupa pengali 4 di depan; itu antiturunan dari x³ saja. Pilihan A, 12x², adalah turunannya.',
    alasan: '∫4x³ dx = 4 · x⁴/4 + C = x⁴ + C.',
  },
  {
    // cek: -7 === -7
    id: 'int-md17',
    tingkat: 'mudah',
    pertanyaan: 'Diketahui ∫₂⁵ f(x) dx = 7. Nilai dari ∫₅² f(x) dx adalah…',
    pilihan: ['7', '0', '−7', '14', '3'],
    benar: 2,
    langkah: [
      'Ingat sifat integral tentu tentang batas: menukar batas atas dengan batas bawah mengubah tanda hasilnya, ∫ₐᵇ f(x) dx = −∫ᵇₐ f(x) dx.',
      'Alasannya dari definisi integral tentu: ∫ₐᵇ f(x) dx = F(b) − F(a), sedangkan ∫ᵇₐ f(x) dx = F(a) − F(b), yang tepat berlawanan tanda.',
      'Dengan demikian, ∫₅² f(x) dx = −∫₂⁵ f(x) dx = −7.',
      'Jadi, nilai dari ∫₅² f(x) dx = −7. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 7, mengira integral tentu tidak peduli urutan batas, seperti luas; luas memang tidak negatif, tetapi integral tentu bertanda. Pilihan B, 0, mengira menukar batas "membatalkan" integralnya.',
    alasan: 'Menukar batas mengubah tanda: −7.',
  },
  {
    // cek: Math.abs(((1.0001**3/3 + 1.0001**2/2) - (0.9999**3/3 + 0.9999**2/2)) / 2e-4 - 2) < 1e-6
    id: 'int-md11',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari x² + x adalah…',
    pilihan: ['2x + 1 + C', 'x³/3 + x²/2 + C', 'x³ + x² + C', 'x³/3 + x + C', '(x² + x)²/2 + C'],
    benar: 1,
    langkah: [
      'Gunakan aturan integral dasar suku demi suku: ∫(x² + x) dx = ∫x² dx + ∫x dx.',
      'Integralkan tiap suku dengan aturan pangkat: ∫x² dx = x³/3 dan ∫x dx = x²/2, sehingga hasilnya x³/3 + x²/2 + C.',
      'Sebagai pemeriksaan, (x³/3 + x²/2)′ = x² + x, kembali ke integrannya.',
      'Jadi, antiturunan dari x² + x adalah x³/3 + x²/2 + C. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, x³ + x² + C, menaikkan pangkat tanpa membaginya. Pilihan E, (x² + x)²/2 + C, memperlakukan x² + x seolah satu peubah u dengan ∫u du; itu keliru karena du ≠ dx. Pilihan A, 2x + 1, adalah turunannya.',
    alasan: 'Suku demi suku: x³/3 + x²/2 + C.',
  },
  {
    // cek: Math.abs(((-1/2.0001) - (-1/1.9999)) / 2e-4 - 1/4) < 1e-6
    id: 'int-md12',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari 1/x² adalah…',
    pilihan: ['1/x + C', '−2/x³ + C', '−1/x', 'ln x² + C', '−1/x + C'],
    benar: 4,
    langkah: [
      'Ubah bentuk integrannya terlebih dahulu ke bentuk pangkat: 1/x² = x⁻².',
      'Dengan aturan integral dasar, ∫x⁻² dx = x^(−2 + 1)/(−2 + 1) + C = x⁻¹/(−1) + C = −x⁻¹ + C.',
      'Tulis kembali ke bentuk pecahan: −x⁻¹ = −1/x, sehingga hasilnya −1/x + C.',
      'Sebagai pemeriksaan, (−1/x)′ = (−x⁻¹)′ = x⁻² = 1/x², kembali ke integrannya.',
      'Jadi, antiturunan dari 1/x² adalah −1/x + C. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 1/x + C, lupa tanda negatif dari pembagi −1. Pilihan B, −2/x³ + C, adalah TURUNAN 1/x². Pilihan C, −1/x, benar bentuknya tetapi tanpa konstanta C.',
    alasan: '1/x² = x⁻²; integralnya x⁻¹/(−1) = −1/x + C.',
  },
  {
    // cek: 3*3 - 0 === 9
    id: 'int-md13',
    tingkat: 'mudah',
    pertanyaan: 'Nilai dari ∫₀³ 2x dx adalah…',
    gambar: { jenis: 'luas', fungsi: '2*x', dari: 0, sampai: 3, jangkauan: [0, 4, 0, 7] },
    pilihan: ['6', '3', '18', '9', '4,5'],
    benar: 3,
    langkah: [
      'Dengan menggunakan aturan integral dasar beserta definisi integral tentu, diperoleh ∫₀³ 2x dx = [x²]₀³ = (3²) − (0²) = 9 − 0 = 9.',
      {
        teks: 'Secara geometris, nilai itu adalah luas daerah di bawah garis y = 2x dari x = 0 sampai x = 3, yaitu segitiga dengan alas 3 dan tinggi 6: (1/2)(3)(6) = 9, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: '2*x', dari: 0, sampai: 3, jangkauan: [0, 4, 0, 7], titik: [{ x: 3, y: 6, label: '(3, 6)' }], labelBagian: ['9'] },
      },
      'Jadi, nilai dari ∫₀³ 2x dx = 9. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 6, adalah nilai integran 2x di x = 3, bukan integralnya. Pilihan C, 18, adalah luas persegi panjang 3 × 6, lupa faktor 1/2 segitiga (atau lupa membagi 2x² dengan 2). Pilihan E, 4,5, adalah ∫₀³ x dx.',
    alasan: '[x²]₀³ = 9 − 0 = 9 (luas segitiga alas 3 tinggi 6).',
  },
  {
    // cek: Math.abs((3*Math.sin(1.0001) - 3*Math.sin(0.9999)) / 2e-4 - 3*Math.cos(1)) < 1e-6
    id: 'int-md14',
    tingkat: 'mudah',
    pertanyaan: 'Antiturunan dari 3 cos x adalah…',
    pilihan: ['−3 sin x + C', '3 sin x + C', '3 cos x + C', 'sin 3x + C', '(3/2) sin x + C'],
    benar: 1,
    langkah: [
      'Gunakan aturan integral dasar: konstanta pengali boleh dikeluarkan, ∫3 cos x dx = 3∫cos x dx.',
      'Karena ∫cos x dx = sin x + C (sebab (sin x)′ = cos x), diperoleh 3 sin x + C.',
      'Jadi, antiturunan dari 3 cos x adalah 3 sin x + C. (Jawaban B)',
    ],
    jebakan: 'Pilihan D, sin 3x + C, memindahkan pengali 3 ke dalam sudut; sin 3x turunannya 3 cos 3x, bukan 3 cos x. Pilihan E, (3/2) sin x, membagi pengali 2 seolah aturan pangkat berlaku pada konstanta.',
    alasan: '3∫cos x dx = 3 sin x + C.',
  },
  {
    // cek: 0*0 + 1 === 1 && Math.abs((2.0001**2 - 1.9999**2) / 2e-4 - 4) < 1e-6
    id: 'int-md15',
    tingkat: 'mudah',
    pertanyaan: 'Diketahui F′(x) = 2x dan F(0) = 1. Fungsi F(x) adalah…',
    gambar: { jenis: 'grafik', fungsi: ['x*x + 1', 'x*x', 'x*x - 1'], jangkauan: [-2, 2, -1.5, 5], nama: ['x² + 1', 'x²', 'x² − 1'] },
    pilihan: ['x²', 'x² + 1', 'x² + C', '2x + 1', 'x² − 1'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa F adalah antiturunan dari 2x, sehingga F(x) = ∫2x dx = x² + C untuk suatu konstanta C yang masih harus ditentukan.',
      'Gunakan syarat F(0) = 1 untuk menentukan C: F(0) = 0² + C = C, sehingga C = 1.',
      {
        teks: 'Dengan demikian, F(x) = x² + 1. Dari seluruh keluarga kurva x² + C yang gradiennya sama (2x), hanya yang melalui (0, 1) yang dipilih, seperti gambar berikut.',
        gambar: { jenis: 'grafik', fungsi: ['x*x + 1', 'x*x', 'x*x - 1'], jangkauan: [-2, 2, -1.5, 5], titik: [{ x: 0, y: 1, label: '(0, 1)' }], nama: ['F = x² + 1', 'x²', 'x² − 1'] },
      },
      'Jadi, F(x) = x² + 1. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, x² + C, berhenti sebelum memakai syarat F(0) = 1 yang justru menentukan C. Pilihan A, x², mengambil C = 0 tanpa alasan. Pilihan D, 2x + 1, mengintegralkan dengan keliru (hanya menambah 1 pada turunannya).',
    alasan: 'F = x² + C; F(0) = 1 memberi C = 1.',
  },
  // =============================================================== SEDANG
  {
    // cek: Math.abs(8/3 - (Array.from({length:2000},(_,i)=>((i+0.5)/1000)**2).reduce((a,b)=>a+b,0)/1000)) < 1e-4
    id: 'int-sd1',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari ∫₀² x² dx adalah…',
    gambar: { jenis: 'luas', fungsi: 'x*x', dari: 0, sampai: 2, jangkauan: [0, 3, 0, 5] },
    pilihan: ['8', '8/3', '2/3', '4/3', '4'],
    benar: 1,
    langkah: [
      'Dengan menggunakan aturan integral dasar beserta definisi integral tentu, diperoleh ∫₀² x² dx = [x³/3]₀² = ((1/3)(2)³) − ((1/3)(0)³) = 8/3 − 0 = 8/3.',
      {
        teks: 'Secara geometris, 8/3 ≈ 2,67 adalah luas daerah di bawah parabola y = x² dari 0 sampai 2; masuk akal karena daerah itu lebih kecil dari segitiga (0,0), (2,0), (2,4) yang luasnya 4, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: 'x*x', dari: 0, sampai: 2, jangkauan: [0, 3, 0, 5], titik: [{ x: 2, y: 4, label: '(2, 4)' }], labelBagian: ['8/3'] },
      },
      'Jadi, nilai dari ∫₀² x² dx = 8/3. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 8, adalah 2³ tanpa dibagi 3. Pilihan E, 4, adalah nilai integran di x = 2 atau luas segitiga pembatasnya. Pilihan D, 4/3, membagi 8 dengan 6 atau menghitung ∫₀² x dx dengan keliru.',
    alasan: '[x³/3]₀² = 8/3.',
  },
  {
    // cek: 9/2 - 1/2 === 4
    id: 'int-sd2',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari ∫₁³ x dx adalah…',
    gambar: { jenis: 'luas', fungsi: 'x', dari: 1, sampai: 3, jangkauan: [0, 4, 0, 4] },
    pilihan: ['4', '2', '9/2', '8', '3'],
    benar: 0,
    langkah: [
      'Dengan menggunakan aturan integral dasar beserta definisi integral tentu, diperoleh ∫₁³ x dx = [x²/2]₁³ = ((1/2)(3)²) − ((1/2)(1)²) = 9/2 − 1/2 = 8/2 = 4.',
      {
        teks: 'Secara geometris, 4 adalah luas trapesium di bawah garis y = x dari x = 1 sampai x = 3, dengan sisi sejajar 1 dan 3 serta tinggi 2: (1/2)(1 + 3)(2) = 4, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: 'x', dari: 1, sampai: 3, jangkauan: [0, 4, 0, 4], titik: [{ x: 1, y: 1, label: '(1, 1)' }, { x: 3, y: 3, label: '(3, 3)' }], labelBagian: ['4'] },
      },
      'Jadi, nilai dari ∫₁³ x dx = 4. (Jawaban A)',
    ],
    jebakan: 'Pilihan C, 9/2, hanya mensubstitusikan batas atas dan lupa mengurangkan nilai di batas bawah. Pilihan B, 2, adalah selisih batas 3 − 1 (lebar selang), bukan luasnya.',
    alasan: '[x²/2]₁³ = 9/2 − 1/2 = 4.',
  },
  {
    // cek: 2 * 4 === 8
    id: 'int-sd16',
    tingkat: 'sedang',
    pertanyaan: 'Fungsi f adalah fungsi genap dan ∫₀³ f(x) dx = 4. Nilai dari ∫₋₃³ f(x) dx adalah…',
    pilihan: ['4', '0', '8', '−4', '12'],
    benar: 2,
    langkah: [
      'Ingat bahwa fungsi genap memenuhi f(−x) = f(x), sehingga grafiknya simetris terhadap sumbu-y; daerah di kiri sumbu-y adalah cermin daerah di kanannya.',
      'Dengan sifat itu, pada selang simetris berlaku ∫₋ₐᵃ f(x) dx = 2∫₀ᵃ f(x) dx: bagian kiri dan bagian kanan sama nilainya.',
      {
        teks: 'Untuk itu, ∫₋₃³ f(x) dx = 2∫₀³ f(x) dx = 2(4) = 8. Sebagai gambaran, pada f(x) = x² (fungsi genap) kedua bagian yang diarsir sama luas, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: 'x*x/2.25', dari: -3, sampai: 3, jangkauan: [-4, 4, -0.5, 5], pecah: [0], labelBagian: ['4', '4'] },
      },
      'Jadi, nilai dari ∫₋₃³ f(x) dx = 8. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, 0, adalah sifat fungsi GANJIL (f(−x) = −f(x)), tempat kedua bagian saling meniadakan; untuk fungsi genap keduanya justru berjumlah. Pilihan A, 4, hanya mengambil separuh selang.',
    alasan: 'Genap: ∫₋₃³ f = 2∫₀³ f = 8.',
  },
  {
    // cek: Math.abs(((2*1.0001 + 1)**6/12 - (2*0.9999 + 1)**6/12) / 2e-4 - 3**5) < 1e-3
    id: 'int-sd4',
    tingkat: 'sedang',
    pertanyaan: 'Antiturunan dari (2x + 1)⁵ adalah…',
    pilihan: ['(2x + 1)⁶ + C', '(2x + 1)⁶/6 + C', '(2x + 1)⁶/12 + C', '(2x + 1)⁶/2 + C', '5(2x + 1)⁴ + C'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa integrannya pangkat dari fungsi linear, sehingga dipakai aturan integral substitusi. Misalkan u = 2x + 1, maka du = 2 dx, sehingga dx = du/2.',
      'Dengan pemisalan itu, ∫(2x + 1)⁵ dx = ∫u⁵ · du/2 = (1/2)∫u⁵ du = (1/2) · u⁶/6 + C = u⁶/12 + C.',
      'Kembalikan ke peubah x: (2x + 1)⁶/12 + C.',
      'Sebagai pemeriksaan, turunkan dengan aturan rantai: ((2x + 1)⁶/12)′ = 6(2x + 1)⁵ · 2/12 = (2x + 1)⁵, kembali ke integrannya.',
      'Jadi, antiturunan dari (2x + 1)⁵ adalah (2x + 1)⁶/12 + C. (Jawaban C)',
    ],
    jebakan: 'Pilihan B, (2x + 1)⁶/6 + C, lupa membagi dengan turunan bagian dalam, 2; turunannya 2(2x + 1)⁵. Pilihan E, 5(2x + 1)⁴, adalah turunan yang keliru pula (tanpa faktor 2). Pilihan A lupa kedua pembagi.',
    alasan: 'Substitusi u = 2x + 1, dx = du/2: u⁶/12 + C.',
  },
  {
    // cek: Math.abs(((1.0001**2 + 1)**4/4 - (0.9999**2 + 1)**4/4) / 2e-4 - 2*8) < 1e-3
    id: 'int-sd5',
    tingkat: 'sedang',
    pertanyaan: 'Antiturunan dari 2x(x² + 1)³ adalah…',
    pilihan: ['2x(x² + 1)⁴/4 + C', '3(x² + 1)² + C', '(x² + 1)⁴/8 + C', '(x² + 1)⁴/4 + C', '(x² + 1)⁴ + C'],
    benar: 3,
    langkah: [
      'Perhatikan bahwa faktor 2x adalah turunan dari x² + 1, tanda bahwa integral substitusi cocok. Misalkan u = x² + 1, maka du = 2x dx.',
      'Dengan pemisalan itu, ∫2x(x² + 1)³ dx = ∫u³ du = u⁴/4 + C; faktor 2x dx terserap seluruhnya menjadi du.',
      'Kembalikan ke peubah x: (x² + 1)⁴/4 + C.',
      'Sebagai pemeriksaan, ((x² + 1)⁴/4)′ = 4(x² + 1)³ · 2x/4 = 2x(x² + 1)³, kembali ke integrannya.',
      'Jadi, antiturunan dari 2x(x² + 1)³ adalah (x² + 1)⁴/4 + C. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 2x(x² + 1)⁴/4, mengintegralkan (x² + 1)³ seolah 2x konstanta dan membiarkannya ikut; padahal 2x justru terpakai sebagai du. Pilihan C, (x² + 1)⁴/8, membagi 2 sekali lagi padahal 2x sudah terserap.',
    alasan: 'Substitusi u = x² + 1, du = 2x dx: u⁴/4 + C.',
  },
  {
    // cek: Math.abs(Math.sin(Math.PI/2) - Math.sin(0) - 1) < 1e-9
    id: 'int-sd6',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari ∫₀^(π/2) cos x dx adalah…',
    gambar: { jenis: 'luas', fungsi: 'Math.cos(x)', dari: 0, sampai: 1.5708, jangkauan: [0, 2, 0, 1.3] },
    pilihan: ['−1', 'π/2', '2', '0', '1'],
    benar: 4,
    langkah: [
      'Ingat bahwa ∫cos x dx = sin x + C. Dengan definisi integral tentu, diperoleh ∫₀^(π/2) cos x dx = [sin x]₀^(π/2) = sin(π/2) − sin 0 = 1 − 0 = 1.',
      {
        teks: 'Secara geometris, 1 adalah luas daerah di bawah satu busur kosinus dari 0 sampai π/2, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: 'Math.cos(x)', dari: 0, sampai: 1.5708, jangkauan: [0, 2, 0, 1.3], labelBagian: ['1'] },
      },
      'Jadi, nilai dari ∫₀^(π/2) cos x dx = 1. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, π/2, menyalin batas atas seolah integral konstanta 1. Pilihan A, −1, memakai antiturunan −sin x (tertukar dengan ∫sin x dx = −cos x). Pilihan D, 0, menghitung cos(π/2) − cos 0 secara keliru.',
    alasan: '[sin x]₀^(π/2) = 1 − 0 = 1.',
  },
  {
    // cek: Math.abs((Math.exp(3*1.0001)/3 - Math.exp(3*0.9999)/3) / 2e-4 - Math.exp(3)) < 1e-2
    id: 'int-sd7',
    tingkat: 'sedang',
    pertanyaan: 'Antiturunan dari e^(3x) adalah…',
    pilihan: ['e^(3x) + C', '3e^(3x) + C', 'e^(3x)/x + C', 'e^(3x)/3 + C', 'e^(4x)/4 + C'],
    benar: 3,
    langkah: [
      'Perhatikan bahwa pangkatnya 3x, bukan x, sehingga dipakai integral substitusi. Misalkan u = 3x, maka du = 3 dx, sehingga dx = du/3.',
      'Dengan pemisalan itu, ∫e^(3x) dx = ∫eᵘ · du/3 = (1/3)eᵘ + C = e^(3x)/3 + C.',
      'Sebagai pemeriksaan, (e^(3x)/3)′ = 3e^(3x)/3 = e^(3x), kembali ke integrannya.',
      'Jadi, antiturunan dari e^(3x) adalah e^(3x)/3 + C. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, e^(3x) + C, lupa membagi 3; turunannya 3e^(3x). Pilihan B, 3e^(3x), adalah turunannya. Pilihan E, e^(4x)/4, memakai aturan pangkat seolah 3 adalah pangkat yang dinaikkan, padahal peubahnya ada di pangkat.',
    alasan: 'Substitusi u = 3x: e^(3x)/3 + C.',
  },
  {
    // cek: 1/4 - 1/4 === 0
    id: 'int-sd8',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari ∫₋₁¹ x³ dx adalah…',
    gambar: { jenis: 'luas', fungsi: 'x*x*x', dari: -1, sampai: 1, jangkauan: [-1.5, 1.5, -1.5, 1.5] },
    pilihan: ['1/2', '2', '0', '1/4', '−1/2'],
    benar: 2,
    langkah: [
      'Dengan menggunakan aturan integral dasar beserta definisi integral tentu, diperoleh ∫₋₁¹ x³ dx = [x⁴/4]₋₁¹ = ((1/4)(1)⁴) − ((1/4)(−1)⁴) = 1/4 − 1/4 = 0.',
      {
        teks: 'Secara geometris, kurva y = x³ berada di bawah sumbu-x pada −1 < x < 0 dan di atasnya pada 0 < x < 1 dengan bentuk yang sama (fungsi ganjil), sehingga bagian negatif dan positifnya saling meniadakan, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: 'x*x*x', dari: -1, sampai: 1, jangkauan: [-1.5, 1.5, -1.5, 1.5], pecah: [0], labelBagian: ['−1/4', '+1/4'] },
      },
      'Jadi, nilai dari ∫₋₁¹ x³ dx = 0. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 1/2, menjumlahkan 1/4 + 1/4, yaitu LUAS kedua bagian tanpa memperhatikan tanda; itu jawaban untuk soal luas, bukan integral tentu. Pilihan D, 1/4, hanya menghitung bagian kanan.',
    alasan: 'Fungsi ganjil pada selang simetris: 1/4 − 1/4 = 0.',
  },
  {
    // cek: (8 + 4) - 0 === 12
    id: 'int-sd9',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari ∫₀² (3x² + 2) dx adalah…',
    gambar: { jenis: 'luas', fungsi: '3*x*x + 2', dari: 0, sampai: 2, jangkauan: [0, 3, 0, 16] },
    pilihan: ['12', '8', '14', '16', '4'],
    benar: 0,
    langkah: [
      'Dengan menggunakan aturan integral dasar suku demi suku, antiturunannya adalah x³ + 2x.',
      'Dengan definisi integral tentu, diperoleh ∫₀² (3x² + 2) dx = [x³ + 2x]₀² = ((2)³ + 2(2)) − ((0)³ + 2(0)) = (8 + 4) − 0 = 12.',
      'Jadi, nilai dari ∫₀² (3x² + 2) dx = 12. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 8, lupa mengintegralkan suku konstanta 2 (menjadi 2x). Pilihan C, 14, adalah nilai integran di x = 2 (3·4 + 2), bukan integralnya. Pilihan E, 4, hanya menghitung ∫₀² 2 dx.',
    alasan: '[x³ + 2x]₀² = 8 + 4 = 12.',
  },
  {
    // cek: Math.abs(-Math.cos(Math.PI) + Math.cos(0) - 2) < 1e-9
    id: 'int-sd10',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari ∫₀^π sin x dx adalah…',
    gambar: { jenis: 'luas', fungsi: 'Math.sin(x)', dari: 0, sampai: 3.1416, jangkauan: [0, 3.5, 0, 1.3] },
    pilihan: ['0', '1', 'π', '2', '−2'],
    benar: 3,
    langkah: [
      'Ingat bahwa ∫sin x dx = −cos x + C. Dengan definisi integral tentu, diperoleh ∫₀^π sin x dx = [−cos x]₀^π = (−cos π) − (−cos 0) = (−(−1)) − (−1) = 1 + 1 = 2.',
      {
        teks: 'Secara geometris, 2 adalah luas satu bukit sinus penuh dari 0 sampai π, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: 'Math.sin(x)', dari: 0, sampai: 3.1416, jangkauan: [0, 3.5, 0, 1.3], labelBagian: ['2'] },
      },
      'Jadi, nilai dari ∫₀^π sin x dx = 2. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 0, menghitung cos π − cos 0 dengan tanda antiturunan yang keliru lalu salah hitung, atau mengira bukit sinus saling meniadakan; itu baru terjadi pada selang 0 sampai 2π. Pilihan E, −2, memakai antiturunan cos x (lupa tanda negatif).',
    alasan: '[−cos x]₀^π = 1 + 1 = 2.',
  },
  {
    // cek: Math.abs(((3*1.0001 - 2)**5/15 - (3*0.9999 - 2)**5/15) / 2e-4 - 1) < 1e-3
    id: 'int-sd11',
    tingkat: 'sedang',
    pertanyaan: 'Antiturunan dari (3x − 2)⁴ adalah…',
    pilihan: ['(3x − 2)⁵/5 + C', '3(3x − 2)⁵/5 + C', '(3x − 2)⁵ + C', '4(3x − 2)³ + C', '(3x − 2)⁵/15 + C'],
    benar: 4,
    langkah: [
      'Perhatikan bahwa integrannya pangkat dari fungsi linear, sehingga dipakai integral substitusi. Misalkan u = 3x − 2, maka du = 3 dx, sehingga dx = du/3.',
      'Dengan pemisalan itu, ∫(3x − 2)⁴ dx = ∫u⁴ · du/3 = (1/3) · u⁵/5 + C = u⁵/15 + C.',
      'Kembalikan ke peubah x: (3x − 2)⁵/15 + C.',
      'Sebagai pemeriksaan, ((3x − 2)⁵/15)′ = 5(3x − 2)⁴ · 3/15 = (3x − 2)⁴, kembali ke integrannya.',
      'Jadi, antiturunan dari (3x − 2)⁴ adalah (3x − 2)⁵/15 + C. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, (3x − 2)⁵/5, lupa membagi dengan turunan bagian dalam 3. Pilihan B, 3(3x − 2)⁵/5, MENGALIKAN 3 alih-alih membaginya. Pilihan D, 4(3x − 2)³, adalah turunan yang keliru.',
    alasan: 'Substitusi u = 3x − 2, dx = du/3: u⁵/15 + C.',
  },
  {
    // cek: 1 * (0.5*0.5 + 1.5*1.5) === 2.5
    id: 'int-sd17',
    tingkat: 'sedang',
    pertanyaan: 'Selang 0 ≤ x ≤ 2 dibagi menjadi 2 subselang sama lebar. Jumlah Riemann fungsi f(x) = x² dengan titik sampel TITIK TENGAH tiap subselang adalah…',
    gambar: { jenis: 'luas', fungsi: 'x*x', dari: 0, sampai: 2, jangkauan: [0, 3, 0, 5] },
    pilihan: ['1', '5', '8/3', '3', '2,5'],
    benar: 4,
    langkah: [
      'Jumlah Riemann adalah jumlah luas persegi panjang yang lebarnya Δx dan tingginya nilai fungsi di titik sampel tiap subselang. Lebar subselang: Δx = (2 − 0)/2 = 1, sehingga subselangnya [0, 1] dan [1, 2].',
      {
        teks: 'Titik tengah kedua subselang adalah x = 0,5 dan x = 1,5, dengan tinggi f(0,5) = 0,25 dan f(1,5) = 2,25, seperti tabel berikut.',
        gambar: { jenis: 'tabel', kepala: ['subselang', 'titik tengah', 'f(titik tengah)', 'luas persegi panjang'], baris: [['[0, 1]', '0,5', '0,25', '1 × 0,25 = 0,25'], ['[1, 2]', '1,5', '2,25', '1 × 2,25 = 2,25']], kolomBaru: [2, 3], jumlah: ['', '', 'jumlah', '2,5'] },
      },
      'Untuk itu, jumlah Riemann titik tengah = Δx · (f(0,5) + f(1,5)) = 1 · (0,25 + 2,25) = 2,5.',
      'Sebagai pembanding, nilai integral sebenarnya ∫₀² x² dx = 8/3 ≈ 2,67; hampiran titik tengah (2,5) lebih dekat daripada hampiran titik kiri (1) maupun titik kanan (5).',
      'Jadi, jumlah Riemann dengan titik tengah adalah 2,5. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 1, adalah jumlah Riemann titik KIRI (0 + 1), dan pilihan B, 5, titik KANAN (1 + 4). Pilihan C, 8/3, adalah nilai integralnya yang tepat, bukan hampiran Riemannnya.',
    alasan: 'Δx = 1, titik tengah 0,5 dan 1,5: 0,25 + 2,25 = 2,5.',
  },
  {
    // cek: Math.abs(((-Math.exp(-2*1.0001)/2) - (-Math.exp(-2*0.9999)/2)) / 2e-4 - Math.exp(-2)) < 1e-6
    id: 'int-sd13',
    tingkat: 'sedang',
    pertanyaan: 'Antiturunan dari e^(−2x) adalah…',
    pilihan: ['−e^(−2x)/2 + C', 'e^(−2x)/2 + C', '−2e^(−2x) + C', 'e^(−2x) + C', 'e^(−x²) + C'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa pangkatnya −2x, sehingga dipakai integral substitusi. Misalkan u = −2x, maka du = −2 dx, sehingga dx = −du/2.',
      'Dengan pemisalan itu, ∫e^(−2x) dx = ∫eᵘ · (−du/2) = −(1/2)eᵘ + C = −e^(−2x)/2 + C.',
      'Sebagai pemeriksaan, (−e^(−2x)/2)′ = −(1/2) · (−2)e^(−2x) = e^(−2x), kembali ke integrannya.',
      'Jadi, antiturunan dari e^(−2x) adalah −e^(−2x)/2 + C. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, e^(−2x)/2, lupa tanda negatif dari pembagi −2. Pilihan C, −2e^(−2x), adalah turunannya. Pilihan E, e^(−x²), mengira −2x adalah turunan dari −x² yang harus "diintegralkan" ke pangkat.',
    alasan: 'Substitusi u = −2x, dx = −du/2: −e^(−2x)/2 + C.',
  },
  {
    // cek: (1/2 - 1) - 0 === -0.5
    id: 'int-sd14',
    tingkat: 'sedang',
    pertanyaan: 'Nilai dari ∫₀¹ (x − 1) dx adalah…',
    gambar: { jenis: 'luas', fungsi: 'x - 1', dari: 0, sampai: 1, jangkauan: [-0.5, 2, -1.5, 1] },
    pilihan: ['1/2', '0', '−1', '1', '−1/2'],
    benar: 4,
    langkah: [
      'Dengan menggunakan aturan integral dasar beserta definisi integral tentu, diperoleh ∫₀¹ (x − 1) dx = [x²/2 − x]₀¹ = ((1/2)(1)² − 1) − ((1/2)(0)² − 0) = (1/2 − 1) − 0 = −1/2.',
      {
        teks: 'Hasilnya negatif karena pada 0 < x < 1 garis y = x − 1 berada DI BAWAH sumbu-x: integral tentu daerah di bawah sumbu bernilai negatif, walaupun luas daerahnya sendiri 1/2, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: 'x - 1', dari: 0, sampai: 1, jangkauan: [-0.5, 2, -1.5, 1], labelBagian: ['−1/2'] },
      },
      'Jadi, nilai dari ∫₀¹ (x − 1) dx = −1/2. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 1/2, memberi LUAS daerah segitiga itu, padahal yang ditanya nilai integral tentu, yang bertanda. Pilihan C, −1, hanya mengintegralkan suku −1 dan melupakan x²/2.',
    alasan: '[x²/2 − x]₀¹ = −1/2 (daerah di bawah sumbu).',
  },
  {
    // cek: 1 * (0*0 + 1*1) === 1
    id: 'int-sd15',
    tingkat: 'sedang',
    pertanyaan: 'Selang 0 ≤ x ≤ 2 dibagi menjadi 2 subselang sama lebar. Jumlah Riemann fungsi f(x) = x² dengan titik sampel KIRI tiap subselang adalah…',
    gambar: { jenis: 'luas', fungsi: 'x*x', dari: 0, sampai: 2, persegi: 2, jangkauan: [0, 3, 0, 5] },
    pilihan: ['1', '5', '8/3', '2', '4'],
    benar: 0,
    langkah: [
      'Jumlah Riemann adalah jumlah luas persegi panjang yang lebarnya Δx dan tingginya nilai fungsi di titik sampel tiap subselang. Lebar subselang: Δx = (2 − 0)/2 = 1, sehingga subselangnya [0, 1] dan [1, 2].',
      'Dengan titik sampel kiri, tingginya diambil di ujung kiri tiap subselang: f(0) = 0 dan f(1) = 1.',
      {
        teks: 'Untuk itu, jumlah Riemann kiri = Δx · (f(0) + f(1)) = 1 · (0 + 1) = 1. Persegi panjang pertama tingginya 0 (tidak terlihat) dan yang kedua tingginya 1, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: 'x*x', dari: 0, sampai: 2, persegi: 2, jangkauan: [0, 3, 0, 5], titik: [{ x: 1, y: 1, label: 'f(1) = 1' }] },
      },
      'Hampiran ini jauh di bawah nilai integral sebenarnya, 8/3 ≈ 2,67, karena untuk fungsi naik persegi panjang kiri selalu berada di bawah kurva.',
      'Jadi, jumlah Riemann dengan titik sampel kiri adalah 1. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 5, adalah jumlah Riemann titik KANAN (f(1) + f(2) = 1 + 4). Pilihan C, 8/3, adalah nilai integral tepatnya, bukan hampiran Riemann. Pilihan E, 4, hanya mengambil f(2).',
    alasan: 'Δx = 1, titik kiri 0 dan 1: 0 + 1 = 1.',
  },
  // ================================================================ SULIT
  {
    // cek: Math.abs((2*Math.sqrt(9) - 2*Math.sqrt(1))/3 - 4/3) < 1e-9
    id: 'int-sl1',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari ∫₀² x²/√(x³ + 1) dx adalah…',
    pilihan: ['8/3', '2/3', '16/3', '4/3', '4'],
    benar: 3,
    langkah: [
      'Perhatikan bahwa x² (pembilang) sebanding dengan turunan x³ + 1 (di dalam akar), tanda bahwa integral substitusi cocok. Misalkan u = x³ + 1, maka du = 3x² dx, sehingga x² dx = du/3.',
      'Ubah batasnya ikut ke u: untuk x = 0, u = 0 + 1 = 1; untuk x = 2, u = 8 + 1 = 9.',
      'Dengan pemisalan itu, ∫₀² x²/√(x³ + 1) dx = ∫₁⁹ (1/√u) · du/3 = (1/3)∫₁⁹ u^(−1/2) du.',
      'Dengan aturan integral dasar, (1/3)[2u^(1/2)]₁⁹ = (1/3)(2√9 − 2√1) = (1/3)(6 − 2) = 4/3.',
      'Jadi, nilai dari ∫₀² x²/√(x³ + 1) dx = 4/3. (Jawaban D)',
    ],
    jebakan: 'Pilihan E, 4, lupa membagi 3 dari du = 3x² dx. Pilihan A, 8/3, hanya menghitung (1/3)(2√9) tanpa mengurangkan nilai di batas bawah u = 1. Pilihan B, 2/3, salah menghitung 2√9 sebagai 3.',
    alasan: 'Substitusi u = x³ + 1 (batas 1 sampai 9): (1/3)[2√u]₁⁹ = 4/3.',
  },
  {
    // cek: (16/4 - 8) - (16/4 - 8) === 0
    id: 'int-sl2',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari ∫₋₂² (x³ − 4x) dx adalah…',
    gambar: { jenis: 'luas', fungsi: 'x*x*x - 4*x', dari: -2, sampai: 2, jangkauan: [-2.5, 2.5, -4, 4] },
    pilihan: ['4', '0', '16', '8', '−8'],
    benar: 1,
    langkah: [
      'Dengan menggunakan aturan integral dasar beserta definisi integral tentu, diperoleh ∫₋₂² (x³ − 4x) dx = [x⁴/4 − 2x²]₋₂² = ((1/4)(2)⁴ − 2(2)²) − ((1/4)(−2)⁴ − 2(−2)²) = (4 − 8) − (4 − 8) = (−4) − (−4) = 0.',
      {
        teks: 'Hasil 0 itu bukan kebetulan: f(x) = x³ − 4x adalah fungsi ganjil (f(−x) = −f(x)), sehingga pada selang simetris bagian di atas sumbu (−2 < x < 0) dan bagian di bawah sumbu (0 < x < 2) sama besar dan saling meniadakan, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: 'x*x*x - 4*x', dari: -2, sampai: 2, jangkauan: [-2.5, 2.5, -4, 4], pecah: [0], labelBagian: ['+4', '−4'] },
      },
      'Jadi, nilai dari ∫₋₂² (x³ − 4x) dx = 0. (Jawaban B)',
    ],
    jebakan: 'Pilihan D, 8, adalah LUAS total kedua bagian (4 + 4), jawaban untuk soal luas, bukan integral tentu yang bertanda. Pilihan A, 4, hanya menghitung satu bagian.',
    alasan: 'Fungsi ganjil pada selang simetris: (−4) − (−4) = 0.',
  },
  {
    // cek: Math.abs((64/3 - 32) + 32/3) < 1e-9 && Math.abs(32/3 + 32/3 - 64/3) < 1e-9
    id: 'int-sl3',
    tingkat: 'sulit',
    pertanyaan: 'Luas daerah yang dibatasi kurva y = x² − 4x dan sumbu-x, dari x = 0 sampai x = 6, adalah…',
    gambar: { jenis: 'luas', fungsi: 'x*x - 4*x', dari: 0, sampai: 6, jangkauan: [-0.5, 6.5, -5, 13] },
    pilihan: ['32/3', '24', '16/3', '0', '64/3'],
    benar: 4,
    langkah: [
      'Pertama, cari titik potong kurva dengan sumbu-x dengan menyelesaikan x² − 4x = 0, yaitu x(x − 4) = 0, sehingga x = 0 atau x = 4. Kurva memotong sumbu-x di dalam selang, maka daerahnya harus dipartisi dengan garis tegak x = 4 sebagai pembatas.',
      {
        teks: 'Pada selang 0 < x < 4 kurva berada di bawah sumbu-x (uji x = 2: y = 4 − 8 = −4 < 0), dan pada 4 < x < 6 kurva berada di atas sumbu-x (uji x = 5: y = 25 − 20 = 5 > 0). Misalkan L₁ bagian bawah dan L₂ bagian atas, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: 'x*x - 4*x', dari: 0, sampai: 6, jangkauan: [-0.5, 6.5, -5, 13], pecah: [4], labelBagian: ['L₁', 'L₂'], titik: [{ x: 4, y: 0, label: '(4, 0)' }] },
      },
      'Hitung integral tiap bagian: ∫₀⁴ (x² − 4x) dx = [x³/3 − 2x²]₀⁴ = (64/3 − 32) − 0 = −32/3, dan ∫₄⁶ (x² − 4x) dx = [x³/3 − 2x²]₄⁶ = (72 − 72) − (64/3 − 32) = 0 + 32/3 = 32/3.',
      'Karena L₁ berada di bawah sumbu-x, hasil integralnya negatif, padahal luas tidak mungkin negatif. Untuk itu, L₁ = |−32/3| = 32/3, sedangkan L₂ = 32/3.',
      'Dengan demikian, luas seluruhnya L = L₁ + L₂ = 32/3 + 32/3 = 64/3 satuan luas.',
      'Jadi, luas daerah yang dibatasi kurva y = x² − 4x dan sumbu-x dari x = 0 sampai x = 6 adalah 64/3. (Jawaban E)',
    ],
    jebakan: 'Pilihan D, 0, adalah nilai ∫₀⁶ (x² − 4x) dx yang dihitung sekaligus: bagian negatif dan positif saling meniadakan, padahal keduanya sama-sama LUAS. Pilihan A, 32/3, hanya menghitung satu bagian.',
    alasan: 'Partisi di x = 4: |−32/3| + 32/3 = 64/3.',
  },
  {
    // cek: Math.abs(((1.0001*Math.sin(1.0001) + Math.cos(1.0001)) - (0.9999*Math.sin(0.9999) + Math.cos(0.9999))) / 2e-4 - Math.cos(1)) < 1e-6
    id: 'int-sl4',
    tingkat: 'sulit',
    pertanyaan: 'Antiturunan dari x cos x adalah…',
    pilihan: ['x sin x − cos x + C', 'x sin x + cos x + C', 'x sin x + C', '(x²/2) sin x + C', '−x sin x + cos x + C'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa integrannya hasil kali fungsi aljabar x dan fungsi trigonometri cos x, sehingga dipakai integral parsial: ∫u dv = uv − ∫v du.',
      'Misalkan u = x sehingga du = dx, dan dv = cos x dx sehingga v = ∫cos x dx = sin x. (Pilih u yang turunannya lebih sederhana.)',
      'Dengan rumus integral parsial, diperoleh ∫x cos x dx = x sin x − ∫sin x dx = x sin x − (−cos x) + C = x sin x + cos x + C.',
      'Sebagai pemeriksaan, turunkan hasilnya dengan aturan hasil kali: (x sin x + cos x)′ = sin x + x cos x − sin x = x cos x, kembali ke integrannya.',
      'Jadi, antiturunan dari x cos x adalah x sin x + cos x + C. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, x sin x − cos x + C, salah tanda pada langkah −∫sin x dx = +cos x. Pilihan D, (x²/2) sin x, mengintegralkan x dan cos x masing-masing lalu mengalikannya; integral hasil kali bukan hasil kali integral. Pilihan C lupa suku dari ∫v du.',
    alasan: 'Parsial: u = x, dv = cos x dx: x sin x − ∫sin x dx = x sin x + cos x + C.',
  },
  {
    // cek: Math.abs((9 - 13.5 + 6) - 1.5) < 1e-9
    id: 'int-sl5',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari ∫₀³ (x² − 3x + 2) dx adalah…',
    gambar: { jenis: 'luas', fungsi: 'x*x - 3*x + 2', dari: 0, sampai: 3, jangkauan: [-0.5, 3.5, -1, 3] },
    pilihan: ['9/2', '0', '−3/2', '6', '3/2'],
    benar: 4,
    langkah: [
      'Dengan menggunakan aturan integral dasar suku demi suku, antiturunannya adalah x³/3 − (3/2)x² + 2x.',
      'Dengan definisi integral tentu, diperoleh ∫₀³ (x² − 3x + 2) dx = [x³/3 − (3/2)x² + 2x]₀³ = ((27/3) − (3/2)(9) + 2(3)) − (0) = 9 − 27/2 + 6 = 15 − 13,5 = 3/2.',
      {
        teks: 'Perhatikan bahwa kurva memotong sumbu-x di x = 1 dan x = 2 (dari (x − 1)(x − 2) = 0), sehingga pada 1 < x < 2 kurva berada di bawah sumbu. Integral tentu menjumlahkan bagian atas (positif) dan bagian bawah (negatif) dengan tandanya: 5/6 + (−1/6) + 5/6 = 3/2, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: 'x*x - 3*x + 2', dari: 0, sampai: 3, jangkauan: [-0.5, 3.5, -1, 3], pecah: [1, 2], labelBagian: ['+5/6', '−1/6', '+5/6'], titik: [{ x: 1, y: 0, label: '(1, 0)' }, { x: 2, y: 0, label: '(2, 0)' }] },
      },
      'Jadi, nilai dari ∫₀³ (x² − 3x + 2) dx = 3/2. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 9/2, lupa mengurangkan suku (3/2)x². Pilihan D, 6, hanya menghitung suku 2x di x = 3. Pilihan B, 0, mengira bagian atas dan bawah saling meniadakan, padahal bagian bawahnya jauh lebih kecil.',
    alasan: '[x³/3 − (3/2)x² + 2x]₀³ = 9 − 27/2 + 6 = 3/2.',
  },
  {
    // cek: 2*Math.sqrt(4) - 2*Math.sqrt(1) === 2
    id: 'int-sl6',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari ∫₁⁴ 1/√x dx adalah…',
    gambar: { jenis: 'luas', fungsi: '1/Math.sqrt(x)', dari: 1, sampai: 4, jangkauan: [0.3, 5, 0, 1.5] },
    pilihan: ['1/2', '4', '2', '1', '3'],
    benar: 2,
    langkah: [
      'Ubah bentuk integrannya terlebih dahulu ke bentuk pangkat: 1/√x = x^(−1/2).',
      'Dengan aturan integral dasar, ∫x^(−1/2) dx = x^(−1/2 + 1)/(−1/2 + 1) = x^(1/2)/(1/2) = 2√x.',
      'Dengan definisi integral tentu, diperoleh ∫₁⁴ 1/√x dx = [2√x]₁⁴ = (2√4) − (2√1) = 4 − 2 = 2.',
      {
        teks: 'Secara geometris, 2 adalah luas daerah di bawah kurva y = 1/√x dari 1 sampai 4, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: '1/Math.sqrt(x)', dari: 1, sampai: 4, jangkauan: [0.3, 5, 0, 1.5], titik: [{ x: 1, y: 1, label: '(1, 1)' }, { x: 4, y: 0.5, label: '(4, 1/2)' }], labelBagian: ['2'] },
      },
      'Jadi, nilai dari ∫₁⁴ 1/√x dx = 2. (Jawaban C)',
    ],
    jebakan: 'Pilihan D, 1, memakai antiturunan √x (lupa pembagi 1/2 yang menjadi pengali 2). Pilihan B, 4, hanya mensubstitusikan batas atas tanpa mengurangkan nilai di batas bawah.',
    alasan: '1/√x = x^(−1/2); [2√x]₁⁴ = 4 − 2 = 2.',
  },
  {
    // cek: 1+2+3+4+5+6+7 === 28
    id: 'int-sl7',
    tingkat: 'sulit',
    pertanyaan: 'Selang 0 ≤ x ≤ 7 dibagi menjadi 7 subselang sama lebar. Jumlah Riemann fungsi f(x) = x dengan titik sampel KANAN tiap subselang adalah…',
    gambar: { jenis: 'luas', fungsi: 'x', dari: 0, sampai: 7, persegi: 7, jangkauan: [0, 8, 0, 8] },
    pilihan: ['49', '3,5', '28', '21', '24,5'],
    benar: 2,
    langkah: [
      'Lebar subselang: Δx = (7 − 0)/7 = 1, sehingga subselangnya [0, 1], [1, 2], …, [6, 7], dan titik sampel kanannya x = 1, 2, 3, 4, 5, 6, 7.',
      'Tinggi tiap persegi panjang adalah f di titik kanan: f(1) = 1, f(2) = 2, …, f(7) = 7.',
      'Untuk itu, jumlah Riemann kanan = Δx · (1 + 2 + 3 + 4 + 5 + 6 + 7) = 1 · 28 = 28.',
      {
        teks: 'Sebagai pembanding, luas sebenarnya di bawah y = x dari 0 sampai 7 adalah segitiga (1/2)(7)(7) = 24,5; persegi panjang kanan melebihi kurva (fungsi naik), sehingga hampirannya lebih besar, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: 'x', dari: 0, sampai: 7, persegi: 7, jangkauan: [0, 8, 0, 8], titik: [{ x: 7, y: 7, label: '(7, 7)' }] },
      },
      'Jadi, jumlah Riemann dengan titik sampel kanan adalah 28. (Jawaban C)',
    ],
    jebakan: 'Pilihan D, 21, adalah jumlah Riemann titik KIRI (0 + 1 + … + 6). Pilihan E, 24,5, adalah luas sebenarnya (integralnya), bukan hampiran Riemann. Pilihan A, 49, adalah 7², luas persegi pembatasnya.',
    alasan: 'Δx = 1, titik kanan 1 sampai 7: jumlahnya 28.',
  },
  {
    // cek: Math.abs((2 + 4 - 8/3) - (1/2 - 2 + 1/3) - 4.5) < 1e-9
    id: 'int-sl8',
    tingkat: 'sulit',
    pertanyaan: 'Luas daerah yang dibatasi kurva y = x² dan garis y = x + 2 adalah…',
    gambar: { jenis: 'luas', fungsi: 'x + 2', fungsi2: 'x*x', dari: -1, sampai: 2, jangkauan: [-2, 3, -0.5, 5] },
    pilihan: ['3/2', '27/2', '4', '9/2', '9'],
    benar: 3,
    langkah: [
      'Daerah yang dicari terbatas pada selang titik potong kedua kurva. Untuk itu, cari koordinat titik potongnya dulu dengan menyamakan kedua fungsi: x² = x + 2, sehingga x² − x − 2 = 0, (x + 1)(x − 2) = 0. Diperoleh x = −1 atau x = 2. Untuk x = −1, y = 1; untuk x = 2, y = 4. Jadi titik potongnya (−1, 1) dan (2, 4).',
      'Karena variabel integralnya x, batas bawah dan batas atas diambil dari absis titik potong: x = −1 sebagai batas bawah dan x = 2 sebagai batas atas.',
      {
        teks: 'Tentukan kurva mana yang di atas dengan uji titik: pilih x = 0, garis memberi y = 2 sedangkan parabola memberi y = 0, sehingga garis y = x + 2 berada di atas parabola y = x² pada −1 < x < 2. Batang tegak pada gambar berikut menunjukkan tinggi (x + 2) − x² yang diintegralkan.',
        gambar: { jenis: 'luas', fungsi: 'x + 2', fungsi2: 'x*x', dari: -1, sampai: 2, jangkauan: [-2, 3, -0.5, 5], titik: [{ x: -1, y: 1, label: '(-1, 1)' }, { x: 2, y: 4, label: '(2, 4)' }], strip: { x: 0.8, label: 'y_atas − y_bawah' }, nama: ['y = x + 2', 'y = x²'] },
      },
      'Dengan demikian, L = ∫₋₁² ((x + 2) − x²) dx = [x²/2 + 2x − x³/3]₋₁² = ((2 + 4 − 8/3)) − ((1/2 − 2 + 1/3)) = 10/3 − (−7/6) = 20/6 + 7/6 = 27/6 = 9/2.',
      'Cara 2: menggunakan diskriminan. Untuk daerah antara parabola dan garis, L = D√D/(6a²) dengan D diskriminan persamaan x² − x − 2 = 0, yaitu D = 1 + 8 = 9, dan a = 1: L = 9√9/(6 · 1) = 27/6 = 9/2, sama.',
      'Jadi, luas daerah yang dibatasi kedua kurva itu adalah 9/2 satuan luas. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 3/2, hanya menghitung selisih batas 2 − (−1) dibagi 2, bukan luas. Pilihan E, 9, lupa membagi dengan 6 pada rumus D√D/(6a²) atau memakai ∫ tanpa mengurangkan nilai di batas bawah. Pilihan B, 27/2, salah menyederhanakan 27/6.',
    alasan: 'Titik potong x = −1 dan 2; ∫₋₁² ((x + 2) − x²) dx = 9/2 (juga D√D/(6a²) = 27/6).',
  },
  {
    // cek: 6 === 6
    id: 'int-sl16',
    tingkat: 'sulit',
    pertanyaan: 'Diketahui ∫₁⁴ f(x) dx = 6. Nilai dari ∫₁⁴ f(5 − x) dx adalah…',
    pilihan: ['−6', '0', '12', '6', '3'],
    benar: 3,
    langkah: [
      'Gunakan integral substitusi untuk mengubah f(5 − x) menjadi f(u). Misalkan u = 5 − x, maka du = −dx, sehingga dx = −du.',
      'Ubah batasnya ikut ke u: untuk x = 1, u = 5 − 1 = 4; untuk x = 4, u = 5 − 4 = 1. Batasnya tertukar arah.',
      'Dengan pemisalan itu, ∫₁⁴ f(5 − x) dx = ∫₄¹ f(u)(−du) = −∫₄¹ f(u) du = ∫₁⁴ f(u) du, karena tanda negatif membalik urutan batas kembali.',
      'Nilai integral tidak bergantung pada nama peubahnya, sehingga ∫₁⁴ f(u) du = ∫₁⁴ f(x) dx = 6. Secara geometris, mengganti x dengan 5 − x mencerminkan grafik terhadap garis x = 5/2, tepat titik tengah selang [1, 4], sehingga luasnya tetap.',
      'Jadi, nilai dari ∫₁⁴ f(5 − x) dx = 6. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, −6, berhenti pada tanda negatif dari dx = −du tanpa memperhatikan bahwa batasnya juga tertukar (4 ke 1), yang menghapus tanda negatif itu. Pilihan B, 0, mengira pencerminan meniadakan integral.',
    alasan: 'u = 5 − x menukar batas dan tanda sekaligus: hasilnya tetap 6.',
  },
  {
    // cek: Math.abs((8 - 8/3) * 2 - 32/3) < 1e-9
    id: 'int-sl10',
    tingkat: 'sulit',
    pertanyaan: 'Luas daerah yang dibatasi kurva y = 4 − x² dan sumbu-x adalah…',
    gambar: { jenis: 'luas', fungsi: '4 - x*x', dari: -2, sampai: 2, jangkauan: [-3, 3, -0.5, 5] },
    pilihan: ['16/3', '32/3', '8', '16', '64/3'],
    benar: 1,
    langkah: [
      'Pertama, cari titik potong kurva dengan sumbu-x dengan menyelesaikan 4 − x² = 0, yaitu (2 − x)(2 + x) = 0, sehingga x = −2 atau x = 2. Keduanya menjadi batas integral.',
      {
        teks: 'Pada −2 < x < 2 kurva berada di atas sumbu-x (uji x = 0: y = 4 > 0), sehingga luasnya L = ∫₋₂² (4 − x²) dx. Karena kurva simetris terhadap sumbu-y (fungsi genap), boleh dihitung L = 2∫₀² (4 − x²) dx, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: '4 - x*x', dari: -2, sampai: 2, jangkauan: [-3, 3, -0.5, 5], pecah: [0], labelBagian: ['A₁', 'A₁'], titik: [{ x: -2, y: 0, label: '(-2, 0)' }, { x: 2, y: 0, label: '(2, 0)' }] },
      },
      'Dengan menggunakan aturan integral dasar beserta definisi integral tentu, diperoleh L = 2[4x − x³/3]₀² = 2((8 − 8/3) − (0)) = 2(16/3) = 32/3.',
      'Cara 2: menggunakan diskriminan. Untuk daerah antara parabola y = −x² + 4 dan garis y = 0, L = D√D/(6a²) dengan D = 0² − 4(−1)(4) = 16 dan a = −1: L = 16√16/(6 · 1) = 64/6 = 32/3, sama.',
      'Jadi, luas daerah yang dibatasi kurva y = 4 − x² dan sumbu-x adalah 32/3 satuan luas. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 16/3, hanya menghitung separuh kanan (∫₀²) tanpa dikalikan 2. Pilihan D, 16, adalah luas persegi panjang 4 × 4 yang membingkai daerah itu. Pilihan E, 64/3, lupa membagi 2 pada 64/6.',
    alasan: 'Batas −2 dan 2; 2∫₀² (4 − x²) dx = 32/3 (juga D√D/(6a²) = 64/6).',
  },
  {
    // cek: Math.abs(Math.sin(Math.PI/2)/2 - 0 - 0.5) < 1e-9
    id: 'int-sl11',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari ∫₀^(π/4) cos 2x dx adalah…',
    pilihan: ['1', '1/2', '0', '2', 'π/4'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa sudutnya 2x, sehingga dipakai integral substitusi. Misalkan u = 2x, maka du = 2 dx, sehingga dx = du/2; batasnya: x = 0 memberi u = 0, x = π/4 memberi u = π/2.',
      'Dengan pemisalan itu, ∫₀^(π/4) cos 2x dx = ∫₀^(π/2) cos u · du/2 = (1/2)[sin u]₀^(π/2) = (1/2)(sin(π/2) − sin 0) = (1/2)(1 − 0) = 1/2.',
      'Cara lain tanpa mengubah batas: antiturunan cos 2x adalah (1/2) sin 2x, sehingga [(1/2) sin 2x]₀^(π/4) = (1/2) sin(π/2) − (1/2) sin 0 = 1/2.',
      'Jadi, nilai dari ∫₀^(π/4) cos 2x dx = 1/2. (Jawaban B)',
    ],
    jebakan: 'Pilihan A, 1, lupa membagi 2 dari du = 2 dx (memakai antiturunan sin 2x). Pilihan C, 0, mensubstitusikan x = π/4 ke sin 2x sebagai sin(π/4 · 2) tetapi salah menghitung, atau mengira integral kosinus selalu nol. Pilihan E menyalin batas atas.',
    alasan: 'Antiturunan (1/2) sin 2x; [(1/2) sin 2x]₀^(π/4) = 1/2.',
  },
  {
    // cek: Math.abs(((1.0001*Math.exp(1.0001) - Math.exp(1.0001)) - (0.9999*Math.exp(0.9999) - Math.exp(0.9999))) / 2e-4 - Math.E) < 1e-5
    id: 'int-sl12',
    tingkat: 'sulit',
    pertanyaan: 'Antiturunan dari x eˣ adalah…',
    pilihan: ['x eˣ + C', '(x²/2) eˣ + C', 'x eˣ + eˣ + C', 'eˣ + C', 'x eˣ − eˣ + C'],
    benar: 4,
    langkah: [
      'Perhatikan bahwa integrannya hasil kali fungsi aljabar x dan fungsi eksponen eˣ, sehingga dipakai integral parsial: ∫u dv = uv − ∫v du.',
      'Misalkan u = x sehingga du = dx, dan dv = eˣ dx sehingga v = eˣ.',
      'Dengan rumus integral parsial, diperoleh ∫x eˣ dx = x eˣ − ∫eˣ dx = x eˣ − eˣ + C.',
      'Sebagai pemeriksaan, (x eˣ − eˣ)′ = eˣ + x eˣ − eˣ = x eˣ, kembali ke integrannya.',
      'Jadi, antiturunan dari x eˣ adalah x eˣ − eˣ + C. (Jawaban E)',
    ],
    jebakan: 'Pilihan C, x eˣ + eˣ + C, salah tanda pada langkah −∫eˣ dx. Pilihan B, (x²/2) eˣ, mengintegralkan x dan eˣ masing-masing lalu mengalikannya. Pilihan A, x eˣ, lupa suku ∫v du seluruhnya.',
    alasan: 'Parsial: u = x, dv = eˣ dx: x eˣ − ∫eˣ dx = x eˣ − eˣ + C.',
  },
  {
    // cek: Math.abs(Math.cbrt(4)**3/3 - (1/2)*(8/3)) < 1e-9
    id: 'int-sl17',
    tingkat: 'sulit',
    pertanyaan: 'Daerah yang dibatasi kurva y = x², sumbu-x, dan garis x = 2 dibagi menjadi dua bagian sama luas oleh garis x = k. Nilai k adalah…',
    gambar: { jenis: 'luas', fungsi: 'x*x', dari: 0, sampai: 2, jangkauan: [0, 3, 0, 5] },
    pilihan: ['1', '√2', '4/3', '∛2', '∛4'],
    benar: 4,
    langkah: [
      'Pertama, hitung luas seluruh daerah: L = ∫₀² x² dx = [x³/3]₀² = 8/3.',
      {
        teks: 'Garis x = k membagi daerah menjadi bagian kiri (0 sampai k) dan bagian kanan (k sampai 2) yang sama luas, sehingga luas bagian kiri harus setengah dari seluruhnya: ∫₀ᵏ x² dx = (1/2)(8/3) = 4/3, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: 'x*x', dari: 0, sampai: 2, jangkauan: [0, 3, 0, 5], pecah: [1.587], labelBagian: ['4/3', '4/3'], titik: [{ x: 1.587, y: 0, label: 'x = k' }] },
      },
      'Hitung integralnya: ∫₀ᵏ x² dx = [x³/3]₀ᵏ = k³/3. Samakan dengan 4/3: k³/3 = 4/3, sehingga k³ = 4 dan k = ∛4 ≈ 1,59.',
      'Nilai ini masuk akal: k lebih besar dari 1 (titik tengah selang) karena kurva y = x² lebih tinggi di sebelah kanan, sehingga pembatasnya harus bergeser ke kanan.',
      'Jadi, nilai k adalah ∛4. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 1, membagi SELANG sama panjang, bukan luasnya; bagian kanan jauh lebih luas karena kurvanya naik. Pilihan B, √2, muncul bila persamaannya keliru ditulis k²/2 = 1 seolah integran x, bukan x². Pilihan D, ∛2, salah menyamakan k³/3 dengan 2/3.',
    alasan: 'Luas total 8/3; k³/3 = 4/3 memberi k = ∛4.',
  },
  {
    // cek: Math.abs((8 + 2*2) - (1/2 + 2) - 9.5) < 1e-9
    id: 'int-sl14',
    tingkat: 'sulit',
    pertanyaan: 'Nilai dari ∫₁⁴ (x + 1/√x) dx adalah…',
    pilihan: ['15/2', '17/2', '19/2', '10', '8'],
    benar: 2,
    langkah: [
      'Ubah bentuk integrannya terlebih dahulu ke bentuk pangkat: x + 1/√x = x + x^(−1/2).',
      'Dengan aturan integral dasar suku demi suku, antiturunannya adalah x²/2 + x^(1/2)/(1/2) = x²/2 + 2√x.',
      'Dengan definisi integral tentu, diperoleh ∫₁⁴ (x + 1/√x) dx = [x²/2 + 2√x]₁⁴ = ((16/2) + 2√4) − ((1/2) + 2√1) = (8 + 4) − (1/2 + 2) = 12 − 5/2 = 19/2.',
      'Jadi, nilai dari ∫₁⁴ (x + 1/√x) dx = 19/2. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 15/2, memakai antiturunan √x (lupa pengali 2) untuk suku 1/√x. Pilihan D, 10, hanya menghitung ∫₁⁴ x dx = 15/2 ditambah 5/2 secara keliru. Pilihan E, 8, menghitung ∫₁⁴ x dx dengan salah mengurangkan.',
    alasan: '[x²/2 + 2√x]₁⁴ = 12 − 5/2 = 19/2.',
  },
  {
    // cek: (8 + 2) - 0 === 10
    id: 'int-sl15',
    tingkat: 'sulit',
    pertanyaan: 'Kecepatan sebuah benda adalah v(t) = 3t² + 1 m/s. Jarak yang ditempuh benda dari t = 0 sampai t = 2 detik adalah…',
    gambar: { jenis: 'luas', fungsi: '3*x*x + 1', dari: 0, sampai: 2, jangkauan: [0, 3, 0, 15] },
    pilihan: ['13 m', '26 m', '6 m', '10 m', '8 m'],
    benar: 3,
    langkah: [
      'Ingat bahwa jarak tempuh adalah integral kecepatan terhadap waktu, s = ∫v(t) dt, karena kecepatan adalah turunan posisi; secara geometris, jarak sama dengan luas di bawah grafik v(t) selama kecepatannya positif (di sini v(t) = 3t² + 1 > 0 untuk semua t).',
      'Dengan menggunakan aturan integral dasar beserta definisi integral tentu, diperoleh s = ∫₀² (3t² + 1) dt = [t³ + t]₀² = ((2)³ + 2) − (0) = 8 + 2 = 10 m.',
      {
        teks: 'Luas daerah di bawah grafik kecepatan dari 0 sampai 2 detik itulah jaraknya, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: '3*x*x + 1', dari: 0, sampai: 2, jangkauan: [0, 3, 0, 15], labelBagian: ['10'], titik: [{ x: 2, y: 13, label: 'v(2) = 13' }] },
      },
      'Jadi, jarak yang ditempuh benda dari t = 0 sampai t = 2 detik adalah 10 m. (Jawaban D)',
    ],
    jebakan: 'Pilihan A, 13 m, adalah KECEPATAN pada t = 2 (v(2) = 12 + 1), bukan jaraknya. Pilihan B, 26 m, mengalikan v(2) dengan 2 seolah kecepatannya tetap 13 sepanjang waktu. Pilihan E, 8 m, lupa mengintegralkan suku konstanta 1.',
    alasan: 's = ∫₀² (3t² + 1) dt = [t³ + t]₀² = 10 m.',
  },
  // ========================================================= SANGAT SULIT
  {
    // cek: Math.abs(63/4 + 16/3 - 253/12) < 1e-9
    id: 'int-ss1',
    tingkat: 'sangat sulit',
    pertanyaan: 'Luas daerah yang dibatasi kurva y = x³ − 2x² − 5x + 6 dan sumbu-x, dari x = −2 sampai x = 3, adalah…',
    gambar: { jenis: 'luas', fungsi: 'x*x*x - 2*x*x - 5*x + 6', dari: -2, sampai: 3, jangkauan: [-2.5, 3.5, -8, 12] },
    pilihan: ['125/12', '63/4', '253/12', '16/3', '189/12'],
    benar: 2,
    langkah: [
      'Pertama, cari titik potong kurva dengan sumbu-x. Uji x = 1: 1 − 2 − 5 + 6 = 0, jadi (x − 1) faktor; dengan pembagian, x³ − 2x² − 5x + 6 = (x − 1)(x² − x − 6) = (x − 1)(x − 3)(x + 2). Akarnya x = −2, x = 1, x = 3, sehingga di dalam selang [−2, 3] kurva memotong sumbu di x = 1 dan daerahnya dipartisi dengan garis tegak x = 1.',
      {
        teks: 'Pada −2 < x < 1 kurva berada di atas sumbu-x (uji x = 0: y = 6 > 0), dan pada 1 < x < 3 di bawah sumbu-x (uji x = 2: y = 8 − 8 − 10 + 6 = −4 < 0). Misalkan L₁ bagian atas dan L₂ bagian bawah, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: 'x*x*x - 2*x*x - 5*x + 6', dari: -2, sampai: 3, jangkauan: [-2.5, 3.5, -8, 12], pecah: [1], labelBagian: ['L₁', 'L₂'], titik: [{ x: -2, y: 0, label: '(-2, 0)' }, { x: 1, y: 0, label: '(1, 0)' }, { x: 3, y: 0, label: '(3, 0)' }] },
      },
      'Antiturunannya F(x) = x⁴/4 − (2/3)x³ − (5/2)x² + 6x. Hitung F di ketiga batas: F(−2) = 4 + 16/3 − 10 − 12 = −38/3; F(1) = 1/4 − 2/3 − 5/2 + 6 = 37/12; F(3) = 81/4 − 18 − 45/2 + 18 = −9/4.',
      'Untuk itu, L₁ = F(1) − F(−2) = 37/12 + 38/3 = 37/12 + 152/12 = 189/12 = 63/4, dan ∫₁³ = F(3) − F(1) = −9/4 − 37/12 = −27/12 − 37/12 = −64/12 = −16/3, sehingga L₂ = |−16/3| = 16/3 (di bawah sumbu, tandanya dibalik).',
      'Dengan demikian, luas seluruhnya L = L₁ + L₂ = 63/4 + 16/3 = 189/12 + 64/12 = 253/12 satuan luas.',
      'Jadi, luas daerah tersebut adalah 253/12. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 125/12, adalah nilai ∫₋₂³ f(x) dx = 63/4 − 16/3 yang dihitung sekaligus: bagian bawah sumbu mengurangi bagian atas, padahal keduanya luas. Pilihan B, 63/4, hanya bagian atas; pilihan D, 16/3, hanya bagian bawah.',
    alasan: 'Partisi di x = 1: 63/4 + |−16/3| = 253/12.',
  },
  {
    // cek: (function(){ const C = -1; return Math.abs(C - (1 + 2*C)) < 1e-9 })()
    id: 'int-ss16',
    tingkat: 'sangat sulit',
    pertanyaan: 'Fungsi f memenuhi f(x) = 3x² + 2∫₀¹ f(t) dt untuk semua x. Nilai dari ∫₀¹ f(t) dt adalah…',
    pilihan: ['1', '0', '2', '−2', '−1'],
    benar: 4,
    langkah: [
      'Perhatikan bahwa ∫₀¹ f(t) dt adalah integral tentu, jadi nilainya suatu BILANGAN tetap, bukan fungsi x. Misalkan bilangan itu C, sehingga f(x) = 3x² + 2C.',
      'Karena C sendiri adalah integral dari f pada [0, 1], substitusikan bentuk f itu: C = ∫₀¹ (3t² + 2C) dt.',
      'Hitung integralnya: ∫₀¹ (3t² + 2C) dt = [t³ + 2Ct]₀¹ = (1 + 2C) − 0 = 1 + 2C.',
      'Selesaikan persamaan C = 1 + 2C, diperoleh −C = 1, sehingga C = −1. Dengan demikian, f(x) = 3x² − 2.',
      'Sebagai pemeriksaan, ∫₀¹ (3t² − 2) dt = [t³ − 2t]₀¹ = 1 − 2 = −1 = C, sesuai.',
      'Jadi, nilai dari ∫₀¹ f(t) dt = −1. (Jawaban E)',
    ],
    jebakan: 'Pilihan A, 1, hanya menghitung ∫₀¹ 3t² dt dan melupakan bahwa suku 2C ikut terintegralkan. Pilihan B, 0, mengira integral dari f "hilang" karena f memuat dirinya sendiri. Pilihan D, −2, adalah nilai 2C.',
    alasan: 'Misalkan C = ∫₀¹ f; C = 1 + 2C memberi C = −1.',
  },
  {
    // cek: Math.abs(1/4 + 1/4 - 0.5) < 1e-9
    id: 'int-ss3',
    tingkat: 'sangat sulit',
    pertanyaan: 'Luas daerah yang dibatasi kurva y = x³ dan garis y = x adalah…',
    gambar: { jenis: 'luas', fungsi: 'x', fungsi2: 'x*x*x', dari: -1, sampai: 1, jangkauan: [-1.5, 1.5, -1.5, 1.5] },
    pilihan: ['3/4', '1/2', '0', '1/4', '1'],
    benar: 1,
    langkah: [
      'Daerah yang dicari terbatas pada selang titik potong kedua kurva. Cari titik potongnya dengan menyamakan kedua fungsi: x³ = x, sehingga x³ − x = 0, x(x − 1)(x + 1) = 0. Diperoleh x = −1, x = 0, atau x = 1. Ada TIGA titik potong, sehingga daerahnya terdiri atas dua bagian yang dipisah di x = 0.',
      {
        teks: 'Tentukan kurva mana yang di atas pada tiap bagian dengan uji titik: pada 0 < x < 1, pilih x = 1/2, garis memberi 1/2 dan kubik memberi 1/8, sehingga garis y = x di atas; pada −1 < x < 0, pilih x = −1/2, garis memberi −1/2 dan kubik memberi −1/8, sehingga kubik y = x³ di atas. Misalkan kedua bagian A₁ dan A₂, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: 'x', fungsi2: 'x*x*x', dari: -1, sampai: 1, jangkauan: [-1.5, 1.5, -1.5, 1.5], pecah: [0], labelBagian: ['A₂', 'A₁'], titik: [{ x: -1, y: -1, label: '(-1, -1)' }, { x: 1, y: 1, label: '(1, 1)' }], nama: ['y = x', 'y = x³'] },
      },
      'Hitung bagian kanan: A₁ = ∫₀¹ (x − x³) dx = [x²/2 − x⁴/4]₀¹ = (1/2 − 1/4) − 0 = 1/4.',
      'Karena kedua kurva simetris terhadap titik asal (keduanya fungsi ganjil), bagian kiri sama luas dengan bagian kanan: A₂ = A₁ = 1/4. (Perhitungan langsung: ∫₋₁⁰ (x³ − x) dx = [x⁴/4 − x²/2]₋₁⁰ = 0 − (1/4 − 1/2) = 1/4.)',
      'Dengan demikian, luas seluruhnya L = A₁ + A₂ = 1/4 + 1/4 = 1/2 satuan luas.',
      'Jadi, luas daerah yang dibatasi kurva y = x³ dan garis y = x adalah 1/2. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, 0, adalah nilai ∫₋₁¹ (x − x³) dx yang dihitung sekaligus tanpa memisahkan bagian: kedua bagian saling meniadakan karena tanda selisihnya berbalik di x = 0. Pilihan D, 1/4, hanya satu bagian.',
    alasan: 'Tiga titik potong (−1, 0, 1); dua bagian masing-masing 1/4, total 1/2.',
  },
  {
    // cek: Math.abs((27 - 5*Math.sqrt(5))/3 - (1/3)*(9**1.5 - 5**1.5)) < 1e-9
    id: 'int-ss4',
    tingkat: 'sangat sulit',
    pertanyaan: 'Luas daerah di kuadran pertama yang dibatasi kurva y = x√(x² + 5), sumbu-x, dan garis x = 2 adalah…',
    gambar: { jenis: 'luas', fungsi: 'x*Math.sqrt(x*x + 5)', dari: 0, sampai: 2, jangkauan: [0, 2.5, 0, 7] },
    pilihan: ['(9 − 5√5)/3', '2√5', '(27 + 5√5)/3', '27/3', '(27 − 5√5)/3'],
    benar: 4,
    langkah: [
      'Karena kurva berada di atas sumbu-x pada 0 ≤ x ≤ 2 (y ≥ 0 untuk x ≥ 0), luasnya L = ∫₀² x√(x² + 5) dx.',
      'Perhatikan bahwa faktor x sebanding dengan turunan x² + 5, tanda bahwa integral substitusi cocok. Misalkan u = x² + 5, maka du = 2x dx, sehingga x dx = du/2. Batasnya: x = 0 memberi u = 5, x = 2 memberi u = 9.',
      'Dengan pemisalan itu, L = ∫₅⁹ √u · du/2 = (1/2)∫₅⁹ u^(1/2) du = (1/2)[(2/3)u^(3/2)]₅⁹ = (1/3)[u^(3/2)]₅⁹.',
      'Substitusikan batasnya: (1/3)(9^(3/2) − 5^(3/2)) = (1/3)(27 − 5√5), karena 9^(3/2) = (√9)³ = 27 dan 5^(3/2) = 5√5.',
      'Jadi, luas daerah tersebut adalah (27 − 5√5)/3 satuan luas. (Jawaban E)',
    ],
    jebakan: 'Pilihan C, (27 + 5√5)/3, salah tanda pada pengurangan nilai batas bawah. Pilihan D, 27/3, lupa mengurangkan nilai di batas bawah u = 5. Pilihan A, (9 − 5√5)/3, salah menghitung 9^(3/2) sebagai 9.',
    alasan: 'Substitusi u = x² + 5: (1/3)[u^(3/2)]₅⁹ = (27 − 5√5)/3.',
  },
  {
    // cek: Math.abs(((-(1.0001**2)*Math.cos(1.0001) + 2*1.0001*Math.sin(1.0001) + 2*Math.cos(1.0001)) - (-(0.9999**2)*Math.cos(0.9999) + 2*0.9999*Math.sin(0.9999) + 2*Math.cos(0.9999))) / 2e-4 - Math.sin(1)) < 1e-5
    id: 'int-ss5',
    tingkat: 'sangat sulit',
    pertanyaan: 'Antiturunan dari x² sin x adalah…',
    pilihan: ['−x² cos x + 2x sin x + 2 cos x + C', 'x² cos x − 2x sin x − 2 cos x + C', '−x² cos x + 2x sin x − 2 cos x + C', '(x³/3) sin x + C', '−x² cos x + C'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa integrannya hasil kali x² dan sin x, sehingga dipakai integral parsial dua kali (pangkat x turun satu tiap kali).',
      'Parsial pertama: misalkan u = x² sehingga du = 2x dx, dan dv = sin x dx sehingga v = −cos x. Diperoleh ∫x² sin x dx = −x² cos x − ∫(−cos x)(2x) dx = −x² cos x + 2∫x cos x dx.',
      'Parsial kedua untuk ∫x cos x dx: misalkan u = x sehingga du = dx, dan dv = cos x dx sehingga v = sin x. Diperoleh ∫x cos x dx = x sin x − ∫sin x dx = x sin x + cos x.',
      'Gabungkan: ∫x² sin x dx = −x² cos x + 2(x sin x + cos x) + C = −x² cos x + 2x sin x + 2 cos x + C.',
      'Sebagai pemeriksaan, turunkan hasilnya: (−x² cos x)′ = −2x cos x + x² sin x; (2x sin x)′ = 2 sin x + 2x cos x; (2 cos x)′ = −2 sin x. Jumlahnya x² sin x, kembali ke integrannya.',
      'Jadi, antiturunan dari x² sin x adalah −x² cos x + 2x sin x + 2 cos x + C. (Jawaban A)',
    ],
    jebakan: 'Pilihan C, −x² cos x + 2x sin x − 2 cos x, salah tanda pada suku terakhir (lupa bahwa ∫sin x dx = −cos x memberi +cos x setelah dikurangkan). Pilihan E, −x² cos x, berhenti setelah parsial pertama tanpa menghitung ∫v du. Pilihan D mengintegralkan faktor-faktornya terpisah.',
    alasan: 'Parsial dua kali: −x² cos x + 2(x sin x + cos x) + C.',
  },
  {
    // cek: 2000 * 8 + 4000 === 20000
    id: 'int-ss6',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah ponsel terjual dengan laju 3.000√x + 1.000 unit per tahun pada tahun ke-x. Total penjualan selama 4 tahun pertama adalah…',
    gambar: { jenis: 'luas', fungsi: '3000*Math.sqrt(x) + 1000', dari: 0, sampai: 4, jangkauan: [0, 4.5, 0, 8000] },
    pilihan: ['28.000 unit', '13.000 unit', '7.000 unit', '20.000 unit', '16.000 unit'],
    benar: 3,
    langkah: [
      'Misalkan r(x) = 3.000√x + 1.000 menyatakan laju penjualan (unit per tahun) pada tahun ke-x. Total penjualan dari x = 0 sampai x = 4 adalah integral lajunya, N = ∫₀⁴ r(x) dx, yaitu luas di bawah grafik laju.',
      'Ubah bentuk integrannya ke pangkat: r(x) = 3.000x^(1/2) + 1.000, sehingga antiturunannya 3.000 · (2/3)x^(3/2) + 1.000x = 2.000x^(3/2) + 1.000x.',
      'Dengan definisi integral tentu, diperoleh N = [2.000x^(3/2) + 1.000x]₀⁴ = (2.000 · 4^(3/2) + 1.000 · 4) − (0) = 2.000 · 8 + 4.000 = 16.000 + 4.000 = 20.000, karena 4^(3/2) = (√4)³ = 8.',
      {
        teks: 'Luas di bawah grafik laju penjualan dari tahun 0 sampai 4 itulah total unitnya, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: '3000*Math.sqrt(x) + 1000', dari: 0, sampai: 4, jangkauan: [0, 4.5, 0, 8000], labelBagian: ['20.000'], titik: [{ x: 4, y: 7000, label: 'r(4) = 7.000' }] },
      },
      'Jadi, total penjualan selama 4 tahun pertama adalah 20.000 unit. (Jawaban D)',
    ],
    jebakan: 'Pilihan C, 7.000 unit, adalah LAJU penjualan pada tahun ke-4 (r(4)), bukan totalnya. Pilihan A, 28.000, mengalikan r(4) dengan 4 seolah lajunya tetap. Pilihan E, 16.000, lupa menambahkan suku 1.000x.',
    alasan: 'N = ∫₀⁴ (3.000√x + 1.000) dx = [2.000x^(3/2) + 1.000x]₀⁴ = 20.000.',
  },
  {
    // cek: Math.abs((9 + 9) - (1/3 + 1) - 50/3) < 1e-9
    id: 'int-ss7',
    tingkat: 'sangat sulit',
    pertanyaan: 'Sebuah gaya sebesar x² + 2x newton bekerja pada benda di jarak x meter. Usaha untuk memindahkan benda dari x = 1 ke x = 3 adalah…',
    gambar: { jenis: 'luas', fungsi: 'x*x + 2*x', dari: 1, sampai: 3, jangkauan: [0, 4, 0, 16] },
    pilihan: ['50/3 joule', '18 joule', '4/3 joule', '22/3 joule', '54 joule'],
    benar: 0,
    langkah: [
      'Ingat bahwa usaha oleh gaya yang berubah terhadap posisi adalah integral gaya terhadap perpindahan, W = ∫ₐᵇ F(x) dx; bila gayanya tetap, rumus ini kembali menjadi W = F · s.',
      'Dengan menggunakan aturan integral dasar beserta definisi integral tentu, diperoleh W = ∫₁³ (x² + 2x) dx = [x³/3 + x²]₁³ = ((27/3) + 9) − ((1/3) + 1) = 18 − 4/3 = 54/3 − 4/3 = 50/3 joule.',
      {
        teks: 'Secara geometris, usaha itu adalah luas di bawah grafik gaya dari x = 1 sampai x = 3, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: 'x*x + 2*x', dari: 1, sampai: 3, jangkauan: [0, 4, 0, 16], labelBagian: ['50/3'], titik: [{ x: 1, y: 3, label: 'F(1) = 3' }, { x: 3, y: 15, label: 'F(3) = 15' }] },
      },
      'Jadi, usaha untuk memindahkan benda dari x = 1 ke x = 3 adalah 50/3 joule. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 18 joule, hanya mensubstitusikan batas atas tanpa mengurangkan nilai di batas bawah. Pilihan E, 54 joule, memakai antiturunan yang keliru x³ + x² (lupa membagi x³ dengan 3) di batas atas: 27 + 27 = 54, tanpa mengurangkan batas bawah. Pilihan C, 4/3, hanya nilai antiturunan di batas bawah.',
    alasan: 'W = ∫₁³ (x² + 2x) dx = 18 − 4/3 = 50/3 joule.',
  },
  {
    // cek: 2*16 + 4 - 36 === 0
    id: 'int-ss8',
    tingkat: 'sangat sulit',
    pertanyaan: 'Peralatan seharga 36.000 menghemat biaya dengan laju 4.000x + 1.000 per tahun pada tahun ke-x. Setelah berapa tahun penghematannya menutup harga beli?',
    gambar: { jenis: 'luas', fungsi: '4000*x + 1000', dari: 0, sampai: 4, jangkauan: [0, 5, 0, 20000] },
    pilihan: ['9 tahun', '3 tahun', '5 tahun', '6 tahun', '4 tahun'],
    benar: 4,
    langkah: [
      'Misalkan T banyaknya tahun yang dicari. Total penghematan selama T tahun adalah integral lajunya: H(T) = ∫₀ᵀ (4.000x + 1.000) dx.',
      'Dengan aturan integral dasar, H(T) = [2.000x² + 1.000x]₀ᵀ = 2.000T² + 1.000T.',
      'Penghematan menutup harga beli ketika H(T) = 36.000: 2.000T² + 1.000T = 36.000, dibagi 1.000 menjadi 2T² + T − 36 = 0, difaktorkan (2T + 9)(T − 4) = 0.',
      'Diperoleh T = −9/2 atau T = 4. Karena T menyatakan lamanya waktu, nilainya tidak mungkin negatif, sehingga T yang diambil adalah T = 4.',
      {
        teks: 'Sebagai pemeriksaan, luas di bawah grafik laju penghematan dari 0 sampai 4 tahun adalah 2.000(16) + 4.000 = 36.000, tepat harga belinya, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: '4000*x + 1000', dari: 0, sampai: 4, jangkauan: [0, 5, 0, 20000], labelBagian: ['36.000'] },
      },
      'Jadi, penghematannya menutup harga beli setelah 4 tahun. (Jawaban E)',
    ],
    jebakan: 'Pilihan B, 3 tahun, hanya memakai laju akhir: 36.000/(4.000 · 3) tanpa mengintegralkan. Pilihan A, 9 tahun, mengambil 36.000/4.000 seolah lajunya tetap 4.000. Pilihan D, 6 tahun, salah memfaktorkan 2T² + T − 36.',
    alasan: '2.000T² + 1.000T = 36.000 memberi (2T + 9)(T − 4) = 0, T = 4.',
  },
  {
    // cek: Math.abs((4 - 8/3) - 4/3) < 1e-9
    id: 'int-ss9',
    tingkat: 'sangat sulit',
    pertanyaan: 'Luas daerah yang dibatasi kurva y = x² dan garis y = 2x adalah…',
    gambar: { jenis: 'luas', fungsi: '2*x', fungsi2: 'x*x', dari: 0, sampai: 2, jangkauan: [-0.5, 3, -0.5, 5] },
    pilihan: ['8/3', '4', '4/3', '2/3', '2'],
    benar: 2,
    langkah: [
      'Daerah yang dicari terbatas pada selang titik potong kedua kurva. Cari titik potongnya dengan menyamakan kedua fungsi: x² = 2x, sehingga x² − 2x = 0, x(x − 2) = 0. Diperoleh x = 0 atau x = 2; titik potongnya (0, 0) dan (2, 4).',
      {
        teks: 'Tentukan kurva mana yang di atas dengan uji titik: pilih x = 1, garis memberi y = 2 dan parabola memberi y = 1, sehingga garis y = 2x berada di atas parabola pada 0 < x < 2, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: '2*x', fungsi2: 'x*x', dari: 0, sampai: 2, jangkauan: [-0.5, 3, -0.5, 5], titik: [{ x: 0, y: 0, label: '(0, 0)' }, { x: 2, y: 4, label: '(2, 4)' }], strip: { x: 1, label: '2x − x²' }, nama: ['y = 2x', 'y = x²'] },
      },
      'Dengan demikian, L = ∫₀² (2x − x²) dx = [x² − x³/3]₀² = (4 − 8/3) − 0 = 4/3.',
      'Cara 2: menggunakan diskriminan. Dari x² − 2x = 0, D = (−2)² − 4(1)(0) = 4 dan a = 1, sehingga L = D√D/(6a²) = 4 · 2/6 = 8/6 = 4/3, sama.',
      'Cara 3: menggunakan selisih absis titik potong. L = |a/6| · (x₂ − x₁)³ = (1/6)(2 − 0)³ = 8/6 = 4/3, sama.',
      'Jadi, luas daerah yang dibatasi kurva y = x² dan garis y = 2x adalah 4/3 satuan luas. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 8/3, hanya menghitung ∫₀² x² dx (luas di bawah parabola saja). Pilihan B, 4, hanya menghitung ∫₀² 2x dx (segitiga di bawah garis); luas yang ditanya adalah selisih keduanya, 4 − 8/3.',
    alasan: 'Titik potong 0 dan 2; ∫₀² (2x − x²) dx = 4/3 (juga D√D/(6a²) = 8/6).',
  },
  {
    // cek: Math.abs((16 - 16/3) * 2 - 64/3) < 1e-9
    id: 'int-ss10',
    tingkat: 'sangat sulit',
    pertanyaan: 'Luas daerah yang dibatasi parabola y = x² dan parabola y = 8 − x² adalah…',
    gambar: { jenis: 'luas', fungsi: '8 - x*x', fungsi2: 'x*x', dari: -2, sampai: 2, jangkauan: [-3, 3, -0.5, 9] },
    pilihan: ['64/3', '32/3', '16', '128/3', '8'],
    benar: 0,
    langkah: [
      'Daerah yang dicari terbatas pada selang titik potong kedua parabola. Samakan kedua fungsi: x² = 8 − x², sehingga 2x² = 8, x² = 4, dan x = −2 atau x = 2; titik potongnya (−2, 4) dan (2, 4).',
      {
        teks: 'Tentukan kurva mana yang di atas dengan uji titik: pilih x = 0, parabola pertama memberi 0 dan parabola kedua memberi 8, sehingga y = 8 − x² berada di atas y = x² pada −2 < x < 2. Karena kedua kurva simetris terhadap sumbu-y, luasnya boleh dihitung dua kali bagian kanan, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: '8 - x*x', fungsi2: 'x*x', dari: -2, sampai: 2, jangkauan: [-3, 3, -0.5, 9], pecah: [0], labelBagian: ['A₁', 'A₁'], titik: [{ x: -2, y: 4, label: '(-2, 4)' }, { x: 2, y: 4, label: '(2, 4)' }], nama: ['y = 8 − x²', 'y = x²'] },
      },
      'Dengan demikian, L = 2∫₀² ((8 − x²) − x²) dx = 2∫₀² (8 − 2x²) dx = 2[8x − (2/3)x³]₀² = 2((16 − 16/3) − 0) = 2(32/3) = 64/3.',
      'Cara 2: menggunakan diskriminan. Selisih kedua fungsi adalah 2x² − 8 = 0, dengan D = 0² − 4(2)(−8) = 64 dan a = 2, sehingga L = D√D/(6a²) = 64 · 8/(6 · 4) = 512/24 = 64/3, sama.',
      'Jadi, luas daerah yang dibatasi kedua parabola itu adalah 64/3 satuan luas. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 32/3, hanya menghitung bagian kanan (∫₀²) tanpa dikalikan 2. Pilihan D, 128/3, mengalikan 2 dua kali. Pilihan C, 16, adalah luas persegi panjang 4 × 4 di dalam daerah itu, bukan luas daerahnya.',
    alasan: 'Titik potong ±2; 2∫₀² (8 − 2x²) dx = 64/3.',
  },
  {
    // cek: 4*4 === 16
    id: 'int-ss11',
    tingkat: 'sangat sulit',
    pertanyaan: 'Diketahui ∫₀ᵃ 2x dx = 16 dengan a > 0. Nilai a adalah…',
    gambar: { jenis: 'luas', fungsi: '2*x', dari: 0, sampai: 4, jangkauan: [0, 5, 0, 9] },
    pilihan: ['4', '8', '16', '2', '√8'],
    benar: 0,
    langkah: [
      'Hitung integralnya dengan batas atas a yang belum diketahui: ∫₀ᵃ 2x dx = [x²]₀ᵃ = a² − 0 = a².',
      'Samakan dengan nilai yang diketahui: a² = 16, sehingga a = 4 atau a = −4.',
      'Karena a merupakan batas atas integral yang nilainya harus lebih besar dari batas bawahnya, yaitu 0 (dan soal menyebut a > 0), diambil a = 4.',
      {
        teks: 'Secara geometris, luas segitiga di bawah garis y = 2x dari 0 sampai a adalah (1/2)(a)(2a) = a², dan a² = 16 tepat saat a = 4, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: '2*x', dari: 0, sampai: 4, jangkauan: [0, 5, 0, 9], labelBagian: ['16'], titik: [{ x: 4, y: 8, label: '(a, 2a) = (4, 8)' }] },
      },
      'Jadi, nilai a adalah 4. (Jawaban A)',
    ],
    jebakan: 'Pilihan B, 8, adalah nilai integran 2x di x = 4, atau memakai a²/2 = 16 secara keliru (lupa bahwa ∫2x dx = x², bukan x²/2). Pilihan C, 16, menyalin nilai integralnya. Pilihan E, √8, muncul dari 2a² = 16.',
    alasan: '[x²]₀ᵃ = a² = 16, a = 4 (a > 0).',
  },
  {
    // cek: Math.abs((Math.E - 1)/2 - Array.from({length:2000},(_,i)=>{const x=(i+0.5)/2000;return x*Math.exp(x*x)}).reduce((a,b)=>a+b,0)/2000) < 1e-4
    id: 'int-ss12',
    tingkat: 'sangat sulit',
    pertanyaan: 'Nilai dari ∫₀¹ x e^(x²) dx adalah…',
    gambar: { jenis: 'luas', fungsi: 'x*Math.exp(x*x)', dari: 0, sampai: 1, jangkauan: [0, 1.3, 0, 3] },
    pilihan: ['e − 1', 'e/2', '(e − 1)/2', '(e + 1)/2', '1/2'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa faktor x sebanding dengan turunan pangkat x², tanda bahwa integral substitusi cocok. Misalkan u = x², maka du = 2x dx, sehingga x dx = du/2. Batasnya: x = 0 memberi u = 0, x = 1 memberi u = 1.',
      'Dengan pemisalan itu, ∫₀¹ x e^(x²) dx = ∫₀¹ eᵘ · du/2 = (1/2)[eᵘ]₀¹ = (1/2)(e¹ − e⁰) = (1/2)(e − 1).',
      'Jadi, nilai dari ∫₀¹ x e^(x²) dx = (e − 1)/2. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, e − 1, lupa membagi 2 dari du = 2x dx. Pilihan B, e/2, lupa mengurangkan nilai di batas bawah e⁰ = 1. Pilihan D, (e + 1)/2, salah tanda pada pengurangan itu.',
    alasan: 'Substitusi u = x²: (1/2)[eᵘ]₀¹ = (e − 1)/2.',
  },
  {
    // cek: 8 - 8 + 3 === 3 && 1 - 2 + 3 === 2
    id: 'int-ss13',
    tingkat: 'sangat sulit',
    pertanyaan: 'Fungsi f mempunyai turunan f′(x) = 3x² − 4x dan memenuhi f(1) = 2. Nilai f(2) adalah…',
    pilihan: ['4', '3', '0', '5', '2'],
    benar: 1,
    langkah: [
      'Perhatikan bahwa f adalah antiturunan dari f′, sehingga f(x) = ∫(3x² − 4x) dx = x³ − 2x² + C untuk suatu konstanta C.',
      'Gunakan syarat f(1) = 2 untuk menentukan C: 1 − 2 + C = 2, sehingga C = 3. Dengan demikian, f(x) = x³ − 2x² + 3.',
      'Substitusikan x = 2: f(2) = 8 − 8 + 3 = 3.',
      'Cara lain lewat integral tentu: f(2) − f(1) = ∫₁² f′(x) dx = [x³ − 2x²]₁² = (8 − 8) − (1 − 2) = 1, sehingga f(2) = f(1) + 1 = 3, sama.',
      'Jadi, nilai f(2) = 3. (Jawaban B)',
    ],
    jebakan: 'Pilihan C, 0, mengambil f(x) = x³ − 2x² tanpa konstanta C (mengabaikan syarat f(1) = 2). Pilihan A, 4, adalah nilai f′(2) = 12 − 8, bukan f(2). Pilihan E, 2, menyalin f(1).',
    alasan: 'f = x³ − 2x² + C; f(1) = 2 memberi C = 3; f(2) = 3.',
  },
  {
    // cek: 3 * 4 === 12
    id: 'int-ss17',
    tingkat: 'sangat sulit',
    pertanyaan: 'Fungsi f memenuhi f(x + 3) = f(x) untuk semua x (periodik dengan periode 3), dan ∫₀³ f(x) dx = 4. Nilai dari ∫₀⁹ f(x) dx adalah…',
    pilihan: ['12', '4', '8', '36', '0'],
    benar: 0,
    langkah: [
      'Perhatikan bahwa f(x + 3) = f(x) berarti grafik f berulang persis setiap 3 satuan; daerah di bawah grafik pada [3, 6] dan pada [6, 9] adalah salinan daerah pada [0, 3].',
      'Pecah integralnya menurut periode: ∫₀⁹ f(x) dx = ∫₀³ f(x) dx + ∫₃⁶ f(x) dx + ∫₆⁹ f(x) dx.',
      'Dengan substitusi u = x − 3 pada suku kedua, ∫₃⁶ f(x) dx = ∫₀³ f(u + 3) du = ∫₀³ f(u) du = 4, karena f(u + 3) = f(u). Dengan cara yang sama (u = x − 6), ∫₆⁹ f(x) dx = 4.',
      'Dengan demikian, ∫₀⁹ f(x) dx = 4 + 4 + 4 = 3 · 4 = 12.',
      'Jadi, nilai dari ∫₀⁹ f(x) dx = 12. (Jawaban A)',
    ],
    jebakan: 'Pilihan D, 36, mengalikan 4 dengan panjang selang 9 alih-alih dengan banyaknya periode 3. Pilihan B, 4, mengira integral fungsi periodik sama untuk selang berapa pun. Pilihan E, 0, menukar dengan sifat fungsi ganjil.',
    alasan: 'Tiga periode penuh: 3 × 4 = 12.',
  },
  {
    // cek: Math.abs((50 - 25) + Math.abs((80 - 64) - (50 - 25)) - 34) < 1e-9
    id: 'int-ss15',
    tingkat: 'sangat sulit',
    pertanyaan: 'Kecepatan sebuah benda adalah v(t) = 10 − 2t m/s. Jarak TEMPUH benda itu dari t = 0 sampai t = 8 detik adalah…',
    gambar: { jenis: 'luas', fungsi: '10 - 2*x', dari: 0, sampai: 8, jangkauan: [0, 9, -8, 12] },
    pilihan: ['16 m', '25 m', '34 m', '9 m', '80 m'],
    benar: 2,
    langkah: [
      'Perhatikan bahwa kecepatan berganti tanda: v(t) = 10 − 2t = 0 pada t = 5, positif untuk t < 5 (bergerak maju) dan negatif untuk t > 5 (bergerak mundur). Jarak tempuh menjumlahkan KEDUA gerak tanpa memperhatikan arah, sehingga integralnya dipartisi di t = 5 dan bagian negatifnya dibalik tandanya: s = ∫₀⁵ v dt + |∫₅⁸ v dt|.',
      {
        teks: 'Pada grafik kecepatan, bagian di atas sumbu (0 sampai 5) adalah gerak maju dan bagian di bawah sumbu (5 sampai 8) adalah gerak mundur, seperti gambar berikut.',
        gambar: { jenis: 'luas', fungsi: '10 - 2*x', dari: 0, sampai: 8, jangkauan: [0, 9, -8, 12], pecah: [5], labelBagian: ['+25', '−9'], titik: [{ x: 5, y: 0, label: '(5, 0)' }] },
      },
      'Hitung tiap bagian: ∫₀⁵ (10 − 2t) dt = [10t − t²]₀⁵ = (50 − 25) − 0 = 25, dan ∫₅⁸ (10 − 2t) dt = [10t − t²]₅⁸ = (80 − 64) − (50 − 25) = 16 − 25 = −9.',
      'Untuk itu, jarak tempuh s = 25 + |−9| = 25 + 9 = 34 m. (Perpindahannya hanya 25 − 9 = 16 m, karena benda sempat mundur.)',
      'Jadi, jarak tempuh benda dari t = 0 sampai t = 8 detik adalah 34 m. (Jawaban C)',
    ],
    jebakan: 'Pilihan A, 16 m, adalah PERPINDAHAN (∫₀⁸ v dt = 25 − 9), bukan jarak tempuh; gerak mundur ikut dihitung sebagai jarak. Pilihan B, 25 m, hanya bagian maju. Pilihan E, 80 m, mengalikan kecepatan awal 10 dengan 8 detik.',
    alasan: 'Partisi di t = 5: 25 + |−9| = 34 m.',
  },
]
