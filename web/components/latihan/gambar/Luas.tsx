import { useId } from 'react'
import { WARNA } from '@/lib/warna'
import Sumbu from './Sumbu'
import { LEBAR, MONO, buatBidang, buatFungsi, jalurKurva, type Jangkauan } from './dasar'

/**
 * Daerah di bawah kurva (atau di antara dua kurva) dari `dari` sampai
 * `sampai`. Dengan `persegi`, daerahnya dipotong jadi persegi panjang
 * Riemann kiri, seperti di video Integral.
 */
export default function Luas({
  fungsi, dari, sampai, persegi, fungsi2, jangkauan,
}: {
  fungsi: string
  dari: number
  sampai: number
  persegi?: number
  fungsi2?: string
  jangkauan?: Jangkauan
}) {
  const TINGGI = 290
  const f = buatFungsi(fungsi)
  const g = fungsi2 ? buatFungsi(fungsi2) : () => 0
  const j: Jangkauan = jangkauan ?? jangkauanOtomatis(f, g, dari, sampai)
  const b = buatBidang(j, TINGGI, undefined, false)
  const idKlip = useId()
  const N = 120
  const atasJalur: string[] = []
  const bawahJalur: string[] = []
  for (let i = 0; i <= N; i++) {
    const x = dari + ((sampai - dari) * i) / N
    atasJalur.push(`${b.X(x).toFixed(1)},${b.Y(f(x)).toFixed(1)}`)
    bawahJalur.push(`${b.X(x).toFixed(1)},${b.Y(g(x)).toFixed(1)}`)
  }
  const daerah = `M ${atasJalur.join(' L ')} L ${bawahJalur.reverse().join(' L ')} Z`
  const kotak: { x: number; y: number; w: number; h: number }[] = []
  if (persegi && persegi > 0) {
    const dx = (sampai - dari) / persegi
    for (let i = 0; i < persegi; i++) {
      const x = dari + i * dx
      const y1 = f(x), y0 = g(x)
      kotak.push({ x: b.X(x), y: b.Y(Math.max(y0, y1)), w: b.X(x + dx) - b.X(x), h: Math.abs(b.Y(y1) - b.Y(y0)) })
    }
  }
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Daerah di bawah ${fungsi} dari ${dari} sampai ${sampai}`}>
      <defs>
        <clipPath id={idKlip}>
          <rect x={b.kiri} y={b.atas} width={b.kanan - b.kiri} height={b.bawah - b.atas} />
        </clipPath>
      </defs>
      <Sumbu b={b} />
      <g clipPath={`url(#${idKlip})`}>
      {!persegi && <path d={daerah} fill="rgba(58, 110, 165, 0.22)" stroke="none" />}
      {kotak.map((k, i) => (
        <rect key={i} x={k.x} y={k.y} width={k.w} height={k.h} fill="rgba(58, 110, 165, 0.22)" stroke={WARNA.samping} strokeWidth={1} />
      ))}
      <path d={jalurKurva(b, f)} fill="none" stroke={WARNA.miring} strokeWidth={2.2} />
      {fungsi2 && <path d={jalurKurva(b, g)} fill="none" stroke={WARNA.depan} strokeWidth={2.2} />}
      </g>
      <line x1={b.X(dari)} y1={b.Y(0)} x2={b.X(dari)} y2={b.Y(f(dari))} stroke={WARNA.redup} strokeWidth={1.2} strokeDasharray="4 3" />
      <line x1={b.X(sampai)} y1={b.Y(0)} x2={b.X(sampai)} y2={b.Y(f(sampai))} stroke={WARNA.redup} strokeWidth={1.2} strokeDasharray="4 3" />
      <text x={b.X(dari)} y={b.Y(0) + 24} fontSize={10.5} textAnchor="middle" fill={WARNA.sudut} fontFamily={MONO}>{dari}</text>
      <text x={b.X(sampai)} y={b.Y(0) + 24} fontSize={10.5} textAnchor="middle" fill={WARNA.sudut} fontFamily={MONO}>{sampai}</text>
    </svg>
  )
}

function jangkauanOtomatis(f: (x: number) => number, g: (x: number) => number, dari: number, sampai: number): Jangkauan {
  let yMin = 0, yMaks = 0
  for (let i = 0; i <= 40; i++) {
    const x = dari + ((sampai - dari) * i) / 40
    for (const y of [f(x), g(x)]) if (Number.isFinite(y)) { yMin = Math.min(yMin, y); yMaks = Math.max(yMaks, y) }
  }
  const lebar = sampai - dari
  return [Math.min(0, dari) - lebar * 0.2, sampai + lebar * 0.2, yMin - (yMaks - yMin) * 0.15 - 0.5, yMaks + (yMaks - yMin) * 0.15 + 0.5]
}
