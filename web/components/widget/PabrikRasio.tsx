'use client'

import { WARNA } from '@/lib/warna'

/**
 * Widget "Pabrik Rasio" — Trigonometri tahap 4.
 *
 * Siswa memilih sendiri sisi mana dibagi sisi mana. Dari tiga sisi ada enam
 * pasangan berbeda, dan setiap pasangan sudah punya nama resmi. Jadi sin, cos,
 * dan tan bukan rumus ajaib yang jatuh dari langit — ketiganya cuma label
 * untuk tiga dari enam pembagian yang mungkin.
 *
 * Segitiga yang dipakai 3-4-5 supaya semua angkanya rapi dan bisa diperiksa
 * siswa dengan tangan.
 */

const VW = 460
const VH = 300

export const SISI = {
  depan: { nama: 'depan', panjang: 3, warna: WARNA.depan },
  samping: { nama: 'samping', panjang: 4, warna: WARNA.samping },
  miring: { nama: 'miring', panjang: 5, warna: WARNA.miring },
} as const

export type NamaSisi = keyof typeof SISI

/** Nama resmi untuk tiap pasangan pembilang/penyebut. */
const NAMA_RASIO: Record<string, { nama: string; lambang: string; catatan: string }> = {
  'depan/miring': { nama: 'sinus', lambang: 'sin θ', catatan: 'Salah satu dari tiga yang paling sering dipakai.' },
  'samping/miring': { nama: 'kosinus', lambang: 'cos θ', catatan: 'Namanya berarti “sinus dari sudut pelengkap”.' },
  'depan/samping': { nama: 'tangen', lambang: 'tan θ', catatan: 'Namanya dari garis singgung — lihat tahap 6.' },
  'miring/depan': { nama: 'kosekan', lambang: 'csc θ', catatan: 'Kebalikan sinus. Jarang dipakai di SMA.' },
  'miring/samping': { nama: 'sekan', lambang: 'sec θ', catatan: 'Kebalikan kosinus. Jarang dipakai di SMA.' },
  'samping/depan': { nama: 'kotangen', lambang: 'cot θ', catatan: 'Kebalikan tangen. Jarang dipakai di SMA.' },
}

export function hitungRasio(pembilang: NamaSisi, penyebut: NamaSisi) {
  const nilai = SISI[pembilang].panjang / SISI[penyebut].panjang
  const kunci = `${pembilang}/${penyebut}`
  return {
    nilai,
    sama: pembilang === penyebut,
    resmi: NAMA_RASIO[kunci] ?? null,
    pecahan: `${SISI[pembilang].panjang} / ${SISI[penyebut].panjang}`,
  }
}

export const SEMUA_PASANGAN = Object.keys(NAMA_RASIO) as `${NamaSisi}/${NamaSisi}`[]

// titik segitiga 3-4-5, siku-siku di B
const A = { x: 74, y: 236 }
const B = { x: 366, y: 236 }
const C = { x: 366, y: 17 }

export default function PabrikRasio({
  pembilang,
  penyebut,
}: {
  pembilang: NamaSisi
  penyebut: NamaSisi
}) {
  const tebal = (s: NamaSisi) => (s === pembilang || s === penyebut ? 8 : 3)
  const buram = (s: NamaSisi) => (s === pembilang || s === penyebut ? 1 : 0.28)

  const peran = (s: NamaSisi) =>
    s === pembilang && s === penyebut ? 'atas & bawah'
      : s === pembilang ? 'pembilang'
      : s === penyebut ? 'penyebut'
      : ''

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Segitiga 3-4-5, sisi ${pembilang} dibagi sisi ${penyebut}`}>
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y}
            stroke={SISI.samping.warna} strokeWidth={tebal('samping')}
            opacity={buram('samping')} strokeLinecap="round" />
      <line x1={B.x} y1={B.y} x2={C.x} y2={C.y}
            stroke={SISI.depan.warna} strokeWidth={tebal('depan')}
            opacity={buram('depan')} strokeLinecap="round" />
      <line x1={C.x} y1={C.y} x2={A.x} y2={A.y}
            stroke={SISI.miring.warna} strokeWidth={tebal('miring')}
            opacity={buram('miring')} strokeLinecap="round" />

      <path d={`M ${B.x - 15} ${B.y} L ${B.x - 15} ${B.y - 15} L ${B.x} ${B.y - 15}`}
            fill="none" stroke={WARNA.redup} strokeWidth={2} />
      <path d={`M ${A.x + 40} ${A.y} A 40 40 0 0 0 ${A.x + 40 * Math.cos(0.6435)} ${A.y - 40 * Math.sin(0.6435)}`}
            fill="none" stroke={WARNA.sudut} strokeWidth={3} />
      <text x={A.x + 50} y={A.y - 12} fontSize={17} fill={WARNA.sudut} fontStyle="italic"
            fontFamily="var(--font-fraunces), Georgia, serif">θ</text>

      {/* panjang + peran tiap sisi */}
      <text x={(A.x + B.x) / 2} y={B.y + 24} textAnchor="middle" fontSize={15}
            fill={SISI.samping.warna} opacity={buram('samping')}
            fontFamily="var(--font-inter), sans-serif">samping = 4</text>
      <text x={(A.x + B.x) / 2} y={B.y + 41} textAnchor="middle" fontSize={11}
            fill={WARNA.redup} opacity={buram('samping')}
            fontFamily="var(--font-plex-mono), monospace">{peran('samping')}</text>

      <text x={B.x + 12} y={(B.y + C.y) / 2 - 4} fontSize={15}
            fill={SISI.depan.warna} opacity={buram('depan')}
            fontFamily="var(--font-inter), sans-serif">depan = 3</text>
      <text x={B.x + 12} y={(B.y + C.y) / 2 + 13} fontSize={11}
            fill={WARNA.redup} opacity={buram('depan')}
            fontFamily="var(--font-plex-mono), monospace">{peran('depan')}</text>

      <text x={(A.x + C.x) / 2 - 26} y={(A.y + C.y) / 2 - 20} textAnchor="middle" fontSize={15}
            fill={SISI.miring.warna} opacity={buram('miring')}
            fontFamily="var(--font-inter), sans-serif">miring = 5</text>
      <text x={(A.x + C.x) / 2 - 26} y={(A.y + C.y) / 2 - 5} textAnchor="middle" fontSize={11}
            fill={WARNA.redup} opacity={buram('miring')}
            fontFamily="var(--font-plex-mono), monospace">{peran('miring')}</text>
    </svg>
  )
}
