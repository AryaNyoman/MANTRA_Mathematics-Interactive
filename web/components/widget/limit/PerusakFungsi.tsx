'use client'

import Bidang from '@/components/widget/limit/Bidang'
import { KOTAK, MONO, WARNA, angka, jalurFungsi, keLayar, type Jendela } from '@/components/widget/limit/koordinat'

/**
 * Widget "Perusak Fungsi", Limit tahap 9.
 *
 * Satu fungsi mulus, dan tiga tombol untuk merusaknya. Tiap kerusakan
 * menampilkan syarat kontinu nomor berapa yang dilanggar.
 *
 * Ketiga kerusakannya sengaja yang SUDAH pernah ditemui siswa: berlubang di
 * Tahap 4, melompat di Tahap 3, dan meledak yang baru diperkenalkan di sini.
 * Jadi tahap ini terasa mengumpulkan, bukan menambah beban baru.
 */

export type Kerusakan = 'mulus' | 'lubang' | 'lompat' | 'asimtot'

export const URUT_RUSAK: Kerusakan[] = ['mulus', 'lubang', 'lompat', 'asimtot']

export const NAMA_RUSAK: Record<Kerusakan, string> = {
  mulus: 'Mulus',
  lubang: 'Bikin lubang',
  lompat: 'Bikin lompat',
  asimtot: 'Bikin asimtot',
}

/** Titik yang diperiksa. */
export const C = 2

/** Fungsi dasarnya, mulus di mana-mana. Nilainya di x = 2 adalah 3. */
const dasar = (x: number) => 0.5 * x * x - x + 3

export type Periksa = { nilaiAda: boolean; limitAda: boolean; samaNilainya: boolean }

/** Ketiga syarat kontinu untuk tiap jenis kerusakan. */
export function periksa(rusak: Kerusakan): Periksa {
  switch (rusak) {
    case 'mulus':   return { nilaiAda: true,  limitAda: true,  samaNilainya: true }
    case 'lubang':  return { nilaiAda: false, limitAda: true,  samaNilainya: false }
    case 'lompat':  return { nilaiAda: true,  limitAda: false, samaNilainya: false }
    case 'asimtot': return { nilaiAda: false, limitAda: false, samaNilainya: false }
  }
}

export const KETERANGAN: Record<Kerusakan, string> = {
  mulus: 'Ketiga syarat terpenuhi. Fungsinya kontinu di x = 2.',
  lubang: 'Syarat 1 gagal: f(2) tidak ada. Limitnya tetap 3, karena limit hanya melihat tetangga.',
  lompat: 'Syarat 2 gagal: dari kiri menuju 3, dari kanan menuju 5. Nilainya ada, tapi limitnya tidak.',
  asimtot: 'Syarat 1 dan 2 gagal: di x = 2 penyebutnya nol, nilainya membesar tanpa batas.',
}

const JENDELA: Jendela = { xMin: -0.6, xMax: 4.6, yMin: -0.5, yMax: 9 }

function fungsi(rusak: Kerusakan) {
  return (x: number): number => {
    switch (rusak) {
      case 'mulus':
        return dasar(x)
      case 'lubang':
        return Math.abs(x - C) < 1e-9 ? NaN : dasar(x)
      case 'lompat':
        return x > C ? dasar(x) + 2 : dasar(x)
      case 'asimtot':
        return 1.2 / ((x - C) * (x - C))
    }
  }
}

export default function PerusakFungsi({ rusak }: { rusak: Kerusakan }) {
  const f = fungsi(rusak)
  const p = keLayar(JENDELA)
  const hasil = periksa(rusak)

  const syarat: Array<[string, boolean]> = [
    ['1. f(2) ada', hasil.nilaiAda],
    ['2. limitnya ada', hasil.limitAda],
    ['3. keduanya sama', hasil.samaNilainya],
  ]

  return (
    <Bidang
      jendela={JENDELA}
      keterangan={`diperiksa di x = 2   ·   ${NAMA_RUSAK[rusak].toLowerCase()}`}
      tandaSkala={false}
      aria={`Grafik dalam keadaan ${NAMA_RUSAK[rusak]}. ${KETERANGAN[rusak]}`}
    >
      {/* garis bantu di titik yang diperiksa */}
      <line x1={p.x(C)} y1={KOTAK.y0} x2={p.x(C)} y2={KOTAK.y1}
            stroke={WARNA.sudut} strokeWidth={1.3} strokeDasharray="6 5" opacity={0.75} />

      {/* kurvanya. Untuk yang melompat, dua potongan digambar terpisah supaya
          lompatannya tidak tersambung jadi garis tegak yang menyesatkan. */}
      {rusak === 'lompat' ? (
        <>
          <path d={jalurFungsi((x) => (x <= C ? dasar(x) : NaN), JENDELA, 400)}
                fill="none" stroke={WARNA.miring} strokeWidth={2.6} strokeLinejoin="round" />
          <path d={jalurFungsi((x) => (x > C ? dasar(x) + 2 : NaN), JENDELA, 400)}
                fill="none" stroke={WARNA.miring} strokeWidth={2.6} strokeLinejoin="round" />
          <circle cx={p.x(C)} cy={p.y(dasar(C))} r={5} fill={WARNA.miring} />
          <circle cx={p.x(C)} cy={p.y(dasar(C) + 2)} r={5} fill="var(--kartu)"
                  stroke={WARNA.miring} strokeWidth={2.2} />
        </>
      ) : (
        <path d={jalurFungsi(f, JENDELA, 500)} fill="none" stroke={WARNA.miring}
              strokeWidth={2.6} strokeLinejoin="round" />
      )}

      {rusak === 'lubang' && (
        <circle cx={p.x(C)} cy={p.y(dasar(C))} r={6} fill="var(--kartu)"
                stroke={WARNA.sudut} strokeWidth={2.4} />
      )}
      {rusak === 'mulus' && (
        <circle cx={p.x(C)} cy={p.y(dasar(C))} r={5} fill={WARNA.sudut}
                stroke="var(--kartu)" strokeWidth={2} />
      )}

      {/* daftar ketiga syarat */}
      {syarat.map(([label, lolos], i) => (
        <g key={label}>
          <circle cx={KOTAK.x0 + 12} cy={KOTAK.y0 + 16 + i * 19} r={4.5}
                  fill={lolos ? '#2F5D50' : '#A6503F'} />
          <text x={KOTAK.x0 + 24} y={KOTAK.y0 + 20 + i * 19} fontSize={11.5}
                fill={lolos ? '#2F5D50' : '#A6503F'} fontFamily={MONO}>
            {label} {lolos ? 'ya' : 'tidak'}
          </text>
        </g>
      ))}

      <text x={KOTAK.x1} y={KOTAK.y1 + 26} textAnchor="end" fontSize={10.5}
            fill={WARNA.redup} fontFamily={MONO}>
        {rusak === 'mulus' ? `f(2) = ${angka(dasar(C), 0)}` : 'kontinu di x = 2: TIDAK'}
      </text>
    </Bidang>
  )
}
