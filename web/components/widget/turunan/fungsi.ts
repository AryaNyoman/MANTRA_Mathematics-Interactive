/**
 * Kumpulan fungsi yang boleh dipilih siswa di widget Turunan.
 *
 * KENAPA TURUNANNYA DITULIS TANGAN, BUKAN DIHITUNG HAMPIRAN
 * Beberapa widget membandingkan kemiringan garis potong dengan turunan yang
 * sebenarnya, dan selisih keduanya justru yang ingin diperlihatkan mengecil.
 * Kalau pembandingnya sendiri hampiran, selisih yang tampil bercampur dengan
 * galat alat ukurnya, dan pada h kecil siswa akan melihat angka yang goyah
 * tanpa sebab yang bisa dijelaskan. Jadi tiap fungsi membawa rumus turunannya
 * sendiri, yang sudah diperiksa sympy lewat `alat/materi-turunan.json`.
 *
 * `mulus` menandai fungsi yang turunannya ada di seluruh jendela. `mutlak`
 * sengaja tidak mulus: Materi 03 memakainya untuk memperlihatkan titik yang
 * tidak punya satu garis singgung pun.
 */

export type FungsiPilihan = {
  nilai: string
  /** label pendek untuk tombol `Pilihan` */
  label: string
  /** rumus f(x) sebagaimana ditulis di layar */
  rumus: string
  /** rumus f aksen, kosong kalau materinya belum boleh menyebutkannya */
  rumusTurunan: string
  f: (x: number) => number
  /** NaN di titik yang turunannya tidak ada */
  turunan: (x: number) => number
  mulus: boolean
  /** jendela yang pas untuk fungsi ini: [xMin, xMax, yMin, yMax] */
  jendela: [number, number, number, number]
  /**
   * Rentang x yang AMAN disapu: di dalamnya f(x) dijamin masih berada di dalam
   * jendela, jadi titik yang diseret tidak pernah keluar bingkai.
   *
   * Dipisah dari `jendela` karena keduanya menjawab pertanyaan berbeda. Jendela
   * menentukan berapa lebar gambar yang terlihat; kurva boleh menjulur keluar
   * dan itu wajar. Titik yang sedang DIPEGANG siswa tidak boleh, sebab widget
   * yang memotong bagian yang sedang digerakkan membuat siswa mengira alatnya
   * rusak. Cacat ini nyata: pada f(x) = x³ - 3x titik Q hilang sama sekali
   * sebelum batas ini dipasang.
   */
  sapuan: [number, number]
}

const daftar: FungsiPilihan[] = [
  {
    nilai: 'kuadrat',
    label: 'x²',
    rumus: 'f(x) = x²',
    rumusTurunan: 'f′(x) = 2x',
    f: (x) => x * x,
    turunan: (x) => 2 * x,
    mulus: true,
    jendela: [-3, 3, -2, 10.5],
    sapuan: [-3, 3],
  },
  {
    nilai: 'kubik',
    label: 'x³ - 3x',
    rumus: 'f(x) = x³ - 3x',
    rumusTurunan: 'f′(x) = 3x² - 3',
    f: (x) => x * x * x - 3 * x,
    turunan: (x) => 3 * x * x - 3,
    mulus: true,
    jendela: [-3, 3, -6, 6],
    sapuan: [-2.3, 2.3],
  },
  {
    nilai: 'sinus',
    label: 'sin x',
    rumus: 'f(x) = sin x',
    rumusTurunan: 'f′(x) = cos x',
    f: Math.sin,
    turunan: Math.cos,
    mulus: true,
    jendela: [-6.3, 6.3, -1.8, 1.8],
    sapuan: [-6.3, 6.3],
  },
  {
    nilai: 'kosinus',
    label: 'cos x',
    rumus: 'f(x) = cos x',
    rumusTurunan: 'f′(x) = -sin x',
    f: Math.cos,
    turunan: (x) => -Math.sin(x),
    mulus: true,
    jendela: [-6.3, 6.3, -1.8, 1.8],
    sapuan: [-6.3, 6.3],
  },
  {
    nilai: 'eksponen',
    label: 'eˣ',
    rumus: 'f(x) = eˣ',
    rumusTurunan: 'f′(x) = eˣ',
    f: Math.exp,
    turunan: Math.exp,
    mulus: true,
    jendela: [-2, 2, -1, 7.6],
    sapuan: [-2, 2],
  },
  {
    nilai: 'mutlak',
    label: '|x|',
    rumus: 'f(x) = |x|',
    rumusTurunan: 'tidak ada di x = 0',
    f: Math.abs,
    // Di x = 0 kemiringan dari kiri -1 dan dari kanan 1, jadi tidak ada satu
    // angka pun yang layak. NaN, bukan 0: 0 adalah jawaban yang salah, bukan
    // jawaban yang kosong.
    turunan: (x) => (x === 0 ? NaN : x > 0 ? 1 : -1),
    mulus: false,
    jendela: [-3, 3, -0.8, 3.2],
    sapuan: [-3, 3],
  },
]

const peta = new Map(daftar.map((f) => [f.nilai, f]))

/** Ambil fungsi menurut namanya; jatuh ke x² kalau namanya tidak dikenal. */
export function fungsi(nama: string): FungsiPilihan {
  return peta.get(nama) ?? daftar[0]
}

/** Tombol `Pilihan` untuk sebagian fungsi saja. */
export function pilihanFungsi(nama: string[]): Array<{ nilai: string; label: string }> {
  return nama.map((n) => {
    const f = fungsi(n)
    return { nilai: f.nilai, label: f.label }
  })
}
