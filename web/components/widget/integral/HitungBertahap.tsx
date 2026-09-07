'use client'

/**
 * Widget Materi 08: menghitung integral tentu, dibuka baris demi baris.
 *
 * Bentuknya mengikuti `widget/limit/BongkarBertahap` yang sudah terbukti
 * dipakai topik Limit, termasuk nama kelas CSS-nya, supaya siswa yang sudah
 * pernah memakai alat itu langsung mengenali cara kerjanya. Yang berbeda cuma
 * isinya, dan satu tambahan: kolom `sifat`, yang menyebut sifat mana yang
 * dipakai tiap baris. Materi 08 memang bukan tentang jawabannya, melainkan
 * tentang urutan kerja yang tidak tersesat.
 *
 * SATU SOAL SENGAJA MEMAKAI SUBSTITUSI, dan barisnya menuliskan batas lama dan
 * batas baru berdampingan. Itulah satu-satunya tempat kekeliruan paling sering
 * terjadi: rumus sudah dalam u sementara batasnya masih batas x.
 *
 * SELURUH ANGKA DI BERKAS INI SUDAH DIPERIKSA sympy lewat
 * `alat/cek_integral.py alat/materi-integral.json`: 3/2 (m08-tiga-suku-tentu),
 * 26/3 (m07-satu-sampai-tiga), 4/3 (m08-substitusi-tentu), dan 0
 * (m06-pecah-total).
 */

export type BarisHitung = {
  /** nama langkahnya, ditulis di kolom kiri */
  nama: string
  /** isi barisnya */
  teks: string
  /** sifat atau aturan yang membuat baris itu sah */
  sifat?: string
}

export type SoalHitung = {
  nilai: string
  label: string
  judul: string
  cara: string
  baris: BarisHitung[]
  jawaban: string
}

export const SOAL: SoalHitung[] = [
  {
    nilai: 'tiga-suku',
    label: 'tiga suku',
    judul: 'hitung x² - 3x + 2 dari 0 sampai 3',
    cara: 'kerjakan suku demi suku',
    baris: [
      { nama: 'pecah', teks: 'kerjakan x², lalu -3x, lalu 2, satu per satu', sifat: 'Sifat 3.13 dan 3.14, penjumlahan dan pengurangan' },
      { nama: 'antiturunan', teks: '[ x³/3 - 3x²/2 + 2x ] dari 0 sampai 3', sifat: 'aturan pangkat, Sifat 3.2' },
      { nama: 'batas atas', teks: '27/3 - 27/2 + 6  =  9 - 13,5 + 6  =  1,5' },
      { nama: 'batas bawah', teks: '0 - 0 + 0  =  0' },
      { nama: 'kurangkan', teks: '1,5 - 0' },
    ],
    jawaban: '3/2, yaitu 1,5',
  },
  {
    nilai: 'pangkat-dua',
    label: 'x²',
    judul: 'hitung x² dari 1 sampai 3',
    cara: 'langsung dengan aturan pangkat',
    baris: [
      { nama: 'antiturunan', teks: '[ x³/3 ] dari 1 sampai 3', sifat: 'aturan pangkat, Sifat 3.2' },
      { nama: 'batas atas', teks: '27/3  =  9' },
      { nama: 'batas bawah', teks: '1/3' },
      { nama: 'kurangkan', teks: '9 - 1/3' },
    ],
    jawaban: '26/3, kira-kira 8,67',
  },
  {
    nilai: 'substitusi',
    label: 'substitusi',
    judul: 'hitung x² dibagi akar (x³ + 1), dari 0 sampai 2',
    cara: 'substitusi, batasnya ikut diganti',
    baris: [
      { nama: 'pilih u', teks: 'u = x³ + 1, maka du = 3x² dx', sifat: 'Sifat 3.6, aturan substitusi' },
      { nama: 'sesuaikan', teks: 'soal punya x² dx, jadi seluruhnya dikali sepertiga' },
      { nama: 'ganti batas', teks: 'x = 0 memberi u = 1, dan x = 2 memberi u = 9', sifat: 'INI yang paling sering terlewat: batasnya ikut berganti ke u' },
      { nama: 'kerjakan', teks: '(1/3) [ 2 akar u ] dari 1 sampai 9' },
      { nama: 'masukkan', teks: '(2/3) (akar 9 - akar 1)  =  (2/3)(3 - 1)' },
    ],
    jawaban: '4/3, kira-kira 1,33',
  },
  {
    nilai: 'bertanda',
    label: 'ada yang di bawah',
    judul: 'hitung x³ - 4x dari -2 sampai 2',
    cara: 'perhatikan tandanya',
    baris: [
      { nama: 'antiturunan', teks: '[ x⁴/4 - 2x² ] dari -2 sampai 2', sifat: 'aturan pangkat, Sifat 3.2' },
      { nama: 'batas atas', teks: '16/4 - 8  =  -4' },
      { nama: 'batas bawah', teks: '16/4 - 8  =  -4' },
      { nama: 'kurangkan', teks: '-4 - (-4)' },
      { nama: 'baca hasilnya', teks: 'nol, padahal daerahnya jelas ada', sifat: 'bagian di bawah sumbu masuk dengan tanda minus; luasnya dibahas Materi 09' },
    ],
    jawaban: '0, dan itu BUKAN luas daerahnya',
  },
]

export const AWAL = { soal: 'tiga-suku', langkah: 1 }

export function soalDari(nilai: string): SoalHitung {
  return SOAL.find((s) => s.nilai === nilai) ?? SOAL[0]
}

/** Banyak baris soal terpanjang, dipakai menentukan batas kendali Langkah. */
export const LANGKAH_MAKS = Math.max(...SOAL.map((s) => s.baris.length))

export default function HitungBertahap({ soal, langkah }: { soal: string; langkah: number }) {
  const s = soalDari(soal)
  const tampil = s.baris.slice(0, Math.min(Math.max(langkah, 0), s.baris.length))
  const selesai = langkah >= s.baris.length

  return (
    <div className="bongkar">
      <div className="bongkar-atas">
        <div className="bongkar-soal">{s.judul}</div>
        <div className="bongkar-cara">cara: {s.cara}</div>
      </div>

      <ol className="bongkar-baris">
        {tampil.map((b, i) => (
          <li key={i}>
            <span className="bongkar-nama">{b.nama}</span>
            <span className="bongkar-teks">{b.teks}</span>
            {b.sifat && <span className="bongkar-syarat">{b.sifat}</span>}
          </li>
        ))}
      </ol>

      {selesai ? (
        <div className="mesin-selesai" role="status">
          <b>Selesai.</b> Hasilnya {s.jawaban}
        </div>
      ) : (
        <div className="bongkar-sisa">
          masih ada {s.baris.length - tampil.length} langkah lagi
        </div>
      )}
    </div>
  )
}
