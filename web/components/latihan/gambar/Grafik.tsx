import { useId } from 'react'
import { WARNA } from '@/lib/warna'
import Sumbu from './Sumbu'
import { LEBAR, MONO, URUT_WARNA, buatBidang, buatFungsi, jalurKurva, type Jangkauan } from './dasar'

/**
 * Grafik satu atau beberapa fungsi. Kurva lahir dari nilai yang dihitung
 * (240 titik), titik penting bertanda, garis tegak putus-putus untuk asimtot
 * atau batas, titik berlubang untuk limit.
 */
export default function Grafik({
  fungsi, jangkauan = [-5, 5, -5, 5], titik = [], tegak = [], nama = [], lubang = [], arsir = [], datar = [],
}: {
  fungsi: string[]
  jangkauan?: Jangkauan
  titik?: { x: number; y: number; label?: string }[]
  tegak?: number[]
  nama?: string[]
  lubang?: { x: number; y: number }[]
  /** selang x yang diarsir (naik, turun, daerah syarat), berlabel di atas */
  arsir?: { dari: number; sampai: number; label?: string }[]
  /** garis mendatar putus-putus, misalnya asimtot datar */
  datar?: number[]
}) {
  const TINGGI = 300
  // Skala x dan y boleh berbeda: grafik fungsi lazim begitu di buku, dan
  // jangkauan seperti [-4, 5, -6, 8] tetap memenuhi lebar gambar.
  const b = buatBidang(jangkauan, TINGGI, { kiri: 34, kanan: 16, atas: 14, bawah: nama.length ? 40 : 26 }, false)
  const f = fungsi.map(buatFungsi)
  const idKlip = useId()
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Grafik ${nama.length ? nama.join(' dan ') : fungsi.join(' dan ')}`}>
      <defs>
        <clipPath id={idKlip}>
          <rect x={b.kiri} y={b.atas} width={b.kanan - b.kiri} height={b.bawah - b.atas} />
        </clipPath>
      </defs>
      <Sumbu b={b} />
      {arsir.map((a, i) => {
        const x0 = b.X(Math.max(a.dari, b.xMin)), x1 = b.X(Math.min(a.sampai, b.xMaks))
        return (
          <g key={`a${i}`}>
            <rect x={x0} y={b.atas} width={Math.max(x1 - x0, 0)} height={b.bawah - b.atas} fill="rgba(106, 76, 147, 0.12)" />
            {a.label && (
              <text x={(x0 + x1) / 2} y={b.atas + 14} fontSize={11} textAnchor="middle" fill={WARNA.sudut} fontFamily={MONO}>{a.label}</text>
            )}
          </g>
        )
      })}
      {datar.map((y) => (
        <line key={`d${y}`} x1={b.kiri} y1={b.Y(y)} x2={b.kanan} y2={b.Y(y)} stroke={WARNA.redup} strokeWidth={1.3} strokeDasharray="5 4" />
      ))}
      {tegak.map((x) => (
        <line key={`t${x}`} x1={b.X(x)} y1={b.atas} x2={b.X(x)} y2={b.bawah} stroke={WARNA.redup} strokeWidth={1.3} strokeDasharray="5 4" />
      ))}
      <g clipPath={`url(#${idKlip})`}>
        {f.map((fn, i) => (
          <path key={i} d={jalurKurva(b, fn)} fill="none" stroke={URUT_WARNA[i % URUT_WARNA.length]} strokeWidth={2.2} strokeLinejoin="round" />
        ))}
      </g>
      {nama.map((n, i) => (
        <text key={n} x={b.kiri + i * ((b.kanan - b.kiri) / Math.max(nama.length, 1))} y={TINGGI - 6} fontSize={11}
              fill={URUT_WARNA[i % URUT_WARNA.length]} fontFamily={MONO}>
          {n}
        </text>
      ))}
      {lubang.map((p, i) => (
        <circle key={`l${i}`} cx={b.X(p.x)} cy={b.Y(p.y)} r={4.5} fill="var(--kartu)" stroke={WARNA.sudut} strokeWidth={1.8} />
      ))}
      {titik.map((p, i) => (
        <g key={`p${i}`}>
          <circle cx={b.X(p.x)} cy={b.Y(p.y)} r={4.2} fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={1.4} />
          {p.label && (
            <text x={b.X(p.x) + 7} y={b.Y(p.y) - 7} fontSize={11} fill={WARNA.sudut} fontFamily={MONO}>{p.label}</text>
          )}
        </g>
      ))}
    </svg>
  )
}
