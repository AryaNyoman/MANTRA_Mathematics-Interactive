'use client'

import Lembar, { LembarLangkah, LembarSelesai, LembarSisa, LembarSoal } from '@/components/widget/Lembar'

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
    judul: '∫₀³ (x² - 3x + 2) dx',
    cara: 'kerjakan suku demi suku',
    baris: [
      { nama: 'pecah', teks: 'kerjakan x², lalu -3x, lalu 2, satu per satu', sifat: 'Sifat 3.13 dan 3.14, penjumlahan dan pengurangan' },
      { nama: 'antiturunan', teks: '[x³/3 - 3x²/2 + 2x]₀³', sifat: 'aturan pangkat, Sifat 3.2' },
      { nama: 'batas atas', teks: '27/3 - 27/2 + 6 = 9 - 13,5 + 6 = 1,5' },
      { nama: 'batas bawah', teks: '0 - 0 + 0 = 0' },
      { nama: 'kurangkan', teks: '1,5 - 0' },
    ],
    jawaban: '3/2 = 1,5',
  },
  {
    nilai: 'pangkat-dua',
    label: 'x²',
    judul: '∫₁³ x² dx',
    cara: 'langsung dengan aturan pangkat',
    baris: [
      { nama: 'antiturunan', teks: '[x³/3]₁³', sifat: 'aturan pangkat, Sifat 3.2' },
      { nama: 'batas atas', teks: '27/3 = 9' },
      { nama: 'batas bawah', teks: '1/3' },
      { nama: 'kurangkan', teks: '9 - 1/3' },
    ],
    jawaban: '26/3 ≈ 8,67',
  },
  {
    nilai: 'substitusi',
    label: 'substitusi',
    judul: '∫₀² x²/√(x³ + 1) dx',
    cara: 'substitusi, batasnya ikut diganti',
    baris: [
      { nama: 'pilih u', teks: 'u = x³ + 1, maka du = 3x² dx', sifat: 'Sifat 3.6, aturan substitusi' },
      { nama: 'sesuaikan', teks: 'soal punya x² dx, jadi seluruhnya dikali 1/3' },
      { nama: 'ganti batas', teks: 'x = 0 memberi u = 1, dan x = 2 memberi u = 9', sifat: 'INI yang paling sering terlewat: batasnya ikut berganti ke u' },
      { nama: 'kerjakan', teks: '(1/3) [2√u]₁⁹' },
      { nama: 'masukkan', teks: '(2/3)(√9 - √1) = (2/3)(3 - 1)' },
    ],
    jawaban: '4/3 ≈ 1,33',
  },
  {
    nilai: 'bertanda',
    label: 'ada yang di bawah',
    judul: '∫₋₂² (x³ - 4x) dx',
    cara: 'perhatikan tandanya',
    baris: [
      { nama: 'antiturunan', teks: '[x⁴/4 - 2x²]₋₂²', sifat: 'aturan pangkat, Sifat 3.2' },
      { nama: 'batas atas', teks: '16/4 - 8 = -4' },
      { nama: 'batas bawah', teks: '16/4 - 8 = -4' },
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
  const terbuka = Math.min(Math.max(langkah, 0), s.baris.length)
  const selesai = langkah >= s.baris.length

  return (
    <Lembar>
      <LembarSoal soal={`hitung ${s.judul}`} cara={`cara: ${s.cara}`} />
      <LembarLangkah langkah={s.baris.map((b) => ({ nama: b.nama, teks: b.teks, syarat: b.sifat }))} terbuka={terbuka} />
      {selesai
        ? <LembarSelesai teks={`Hasilnya ${s.jawaban}`} />
        : <LembarSisa terbuka={terbuka} total={s.baris.length} />}
    </Lembar>
  )
}
