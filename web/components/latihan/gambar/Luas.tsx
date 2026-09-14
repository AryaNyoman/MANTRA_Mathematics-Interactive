import { useId } from 'react'
import { WARNA } from '@/lib/warna'
import Sumbu from './Sumbu'
import { LEBAR, MONO, angka, buatBidang, buatFungsi, jalurKurva, type Jangkauan } from './dasar'

/**
 * Daerah di bawah kurva (atau di antara dua kurva) dari `dari` sampai
 * `sampai`. Dengan `persegi`, daerahnya dipotong jadi persegi panjang
 * Riemann kiri, seperti di video Integral. Untuk pembahasan (14 Sep 2026):
 * `pecah` memotong daerah di absis tertentu dan tiap bagian diberi label
 * (bagian di bawah sumbu, yang integralnya negatif, diwarnai merah);
 * `strip` menggambar satu batang selebar Δx; `titik` memberi label titik
 * potong; `nama` menuliskan keterangan kurva.
 */
export default function Luas({
  fungsi, dari, sampai, persegi, fungsi2, jangkauan, titik = [], pecah = [], labelBagian = [], strip, nama = [],
}: {
  fungsi: string
  dari: number
  sampai: number
  persegi?: number
  fungsi2?: string
  jangkauan?: Jangkauan
  titik?: { x: number; y: number; label?: string }[]
  pecah?: number[]
  labelBagian?: string[]
  strip?: { x: number; label?: string }
  nama?: string[]
}) {
  const TINGGI = 290
  const f = buatFungsi(fungsi)
  const g = fungsi2 ? buatFungsi(fungsi2) : () => 0
  const j: Jangkauan = jangkauan ?? jangkauanOtomatis(f, g, dari, sampai)
  const b = buatBidang(j, TINGGI, { kiri: 34, kanan: 16, atas: 14, bawah: nama.length ? 40 : 26 }, false)
  const idKlip = useId()
  const N = 120
  const batasBagian = [dari, ...pecah.filter((x) => x > dari && x < sampai).sort((p, q) => p - q), sampai]
  const bagian = batasBagian.slice(0, -1).map((x0, i) => {
    const x1 = batasBagian[i + 1]!
    const atas: string[] = []
    const bawah: string[] = []
    for (let k = 0; k <= N; k++) {
      const x = x0 + ((x1 - x0) * k) / N
      atas.push(`${b.X(x).toFixed(1)},${b.Y(f(x)).toFixed(1)}`)
      bawah.push(`${b.X(x).toFixed(1)},${b.Y(g(x)).toFixed(1)}`)
    }
    const xm = (x0 + x1) / 2
    const positif = f(xm) >= g(xm)
    return {
      jalur: `M ${atas.join(' L ')} L ${bawah.reverse().join(' L ')} Z`,
      positif,
      label: labelBagian[i],
      lx: b.X(xm),
      ly: b.Y((f(xm) + g(xm)) / 2),
    }
  })
  const kotak: { x: number; y: number; w: number; h: number }[] = []
  if (persegi && persegi > 0) {
    const dx = (sampai - dari) / persegi
    for (let i = 0; i < persegi; i++) {
      const x = dari + i * dx
      const y1 = f(x), y0 = g(x)
      kotak.push({ x: b.X(x), y: b.Y(Math.max(y0, y1)), w: b.X(x + dx) - b.X(x), h: Math.abs(b.Y(y1) - b.Y(y0)) })
    }
  }
  const dxStrip = (sampai - dari) / 24
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
        {!persegi && bagian.map((bg, i) => (
          <path key={`b${i}`} d={bg.jalur} fill={bg.positif ? 'rgba(58, 110, 165, 0.22)' : 'rgba(194, 94, 77, 0.22)'} stroke="none" />
        ))}
        {kotak.map((k, i) => (
          <rect key={i} x={k.x} y={k.y} width={k.w} height={k.h} fill="rgba(58, 110, 165, 0.22)" stroke={WARNA.samping} strokeWidth={1} />
        ))}
        {strip && (
          <rect x={b.X(strip.x - dxStrip / 2)} y={b.Y(Math.max(f(strip.x), g(strip.x)))} width={b.X(strip.x + dxStrip / 2) - b.X(strip.x - dxStrip / 2)}
                height={Math.abs(b.Y(f(strip.x)) - b.Y(g(strip.x)))} fill="rgba(106, 76, 147, 0.45)" stroke={WARNA.sudut} strokeWidth={1} />
        )}
        <path d={jalurKurva(b, f)} fill="none" stroke={WARNA.miring} strokeWidth={2.2} />
        {fungsi2 && <path d={jalurKurva(b, g)} fill="none" stroke={WARNA.depan} strokeWidth={2.2} />}
        {pecah.map((x) => (
          <line key={`p${x}`} x1={b.X(x)} y1={b.atas} x2={b.X(x)} y2={b.bawah} stroke={WARNA.redup} strokeWidth={1.2} strokeDasharray="4 3" />
        ))}
      </g>
      {bagian.map((bg, i) => bg.label && (
        <text key={`l${i}`} x={bg.lx} y={bg.ly + 5} fontSize={13} textAnchor="middle" fontWeight={700}
              fill={bg.positif ? WARNA.samping : WARNA.depan} fontFamily={MONO}>{bg.label}</text>
      ))}
      {strip?.label && (
        <text x={b.X(strip.x)} y={b.Y(Math.max(f(strip.x), g(strip.x))) - 8} fontSize={11} textAnchor="middle" fill={WARNA.sudut} fontFamily={MONO}>{strip.label}</text>
      )}
      <line x1={b.X(dari)} y1={b.Y(0)} x2={b.X(dari)} y2={b.Y(f(dari))} stroke={WARNA.redup} strokeWidth={1.2} strokeDasharray="4 3" />
      <line x1={b.X(sampai)} y1={b.Y(0)} x2={b.X(sampai)} y2={b.Y(f(sampai))} stroke={WARNA.redup} strokeWidth={1.2} strokeDasharray="4 3" />
      <text x={b.X(dari)} y={b.Y(0) + 24} fontSize={10.5} textAnchor="middle" fill={WARNA.sudut} fontFamily={MONO}>{labelBatas(dari)}</text>
      <text x={b.X(sampai)} y={b.Y(0) + 24} fontSize={10.5} textAnchor="middle" fill={WARNA.sudut} fontFamily={MONO}>{labelBatas(sampai)}</text>
      {titik.map((p, i) => (
        <g key={`t${i}`}>
          <circle cx={b.X(p.x)} cy={b.Y(p.y)} r={4.2} fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={1.4} />
          {p.label && (
            <text x={b.X(p.x) + 7} y={b.Y(p.y) - 7} fontSize={11} fill={WARNA.sudut} fontFamily={MONO}>{p.label}</text>
          )}
        </g>
      ))}
      {nama.map((n, i) => (
        <text key={n} x={b.kiri + i * ((b.kanan - b.kiri) / Math.max(nama.length, 1))} y={TINGGI - 6} fontSize={11}
              fill={i === 0 ? WARNA.miring : WARNA.depan} fontFamily={MONO}>
          {n}
        </text>
      ))}
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

/** Batas integral: kelipatan π/2 ditulis dengan lambang π, selebihnya angka Indonesia. */
function labelBatas(n: number): string {
  const k = Math.round(n / (Math.PI / 2))
  if (k !== 0 && Math.abs(n - k * Math.PI / 2) < 1e-3) {
    const nama = ['', 'π/2', 'π', '3π/2', '2π']
    return (k < 0 ? '-' : '') + (nama[Math.abs(k)] ?? `${Math.abs(k)}π/2`)
  }
  return angka(n, 2)
}
