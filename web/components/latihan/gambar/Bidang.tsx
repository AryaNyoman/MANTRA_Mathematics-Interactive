import { WARNA } from '@/lib/warna'
import Sumbu from './Sumbu'
import { LEBAR, MONO, buatBidang, type Jangkauan } from './dasar'

/**
 * Bangun dan bayangannya di bidang koordinat (transformasi geometri).
 * Bangun asal biru tua, bayangan ungu, garis cermin putus-putus, pusat
 * rotasi/dilatasi bertanda silang.
 */
export default function Bidang({
  bangun, bayangan, cermin, pusat, jangkauan, labelBangun = [], labelBayangan = [], panah = false, garis = [],
}: {
  bangun: [number, number][]
  bayangan?: [number, number][]
  cermin?: string
  pusat?: [number, number]
  jangkauan?: Jangkauan
  labelBangun?: string[]
  labelBayangan?: string[]
  /** panah tipis dari tiap titik bangun ke bayangannya */
  panah?: boolean
  /** garis y = mx + c tambahan, misalnya garis yang ditransformasi */
  garis?: { m: number; c: number; label?: string; warna?: 'samping' | 'sudut' | 'depan' }[]
}) {
  const TINGGI = 300
  const j: Jangkauan = jangkauan ?? jangkauanOtomatis([...bangun, ...(bayangan ?? []), ...(pusat ? [pusat] : [])])
  const b = buatBidang(j, TINGGI)
  const poli = (p: [number, number][]) => p.map(([x, y]) => `${b.X(x)},${b.Y(y)}`).join(' ')
  const garisCermin = cermin ? jalurCermin(cermin, b) : null
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Bangun ${labelBangun.join('') || 'asal'}${bayangan ? ' dan bayangannya' : ''}`}>
      <defs>
        <marker id="panah-bidang" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={WARNA.redup} />
        </marker>
      </defs>
      <Sumbu b={b} />
      {garisCermin && <line {...garisCermin} stroke={WARNA.redup} strokeWidth={1.5} strokeDasharray="6 4" />}
      {garis.map((g, i) => {
        const w = WARNA[g.warna ?? 'samping']
        const yKiri = g.m * b.xMin + g.c, yKanan = g.m * b.xMaks + g.c
        // potong garis pada tepi bidang supaya tidak keluar kanvas
        const titik: [number, number][] = []
        const coba = (x: number, y: number) => { if (x >= b.xMin - 1e-9 && x <= b.xMaks + 1e-9 && y >= b.yMin - 1e-9 && y <= b.yMaks + 1e-9) titik.push([x, y]) }
        coba(b.xMin, yKiri); coba(b.xMaks, yKanan)
        if (g.m !== 0) { coba((b.yMin - g.c) / g.m, b.yMin); coba((b.yMaks - g.c) / g.m, b.yMaks) }
        if (titik.length < 2) return null
        const [p, q] = [titik[0]!, titik[titik.length - 1]!]
        return (
          <g key={`g${i}`}>
            <line x1={b.X(p[0])} y1={b.Y(p[1])} x2={b.X(q[0])} y2={b.Y(q[1])} stroke={w} strokeWidth={2} />
            {g.label && <text x={b.X(q[0]) - 6} y={b.Y(q[1]) - 8} fontSize={11} textAnchor="end" fill={w} fontFamily={MONO}>{g.label}</text>}
          </g>
        )
      })}
      {panah && bayangan && bangun.map(([x, y], i) => {
        const t = bayangan[i]
        if (!t) return null
        return <line key={`p${i}`} x1={b.X(x)} y1={b.Y(y)} x2={b.X(t[0])} y2={b.Y(t[1])} stroke={WARNA.redup} strokeWidth={1.2} strokeDasharray="3 3" markerEnd="url(#panah-bidang)" />
      })}
      <polygon points={poli(bangun)} fill="rgba(58, 110, 165, 0.16)" stroke={WARNA.samping} strokeWidth={2} strokeLinejoin="round" />
      {bayangan && (
        <polygon points={poli(bayangan)} fill="rgba(106, 76, 147, 0.16)" stroke={WARNA.sudut} strokeWidth={2} strokeDasharray="7 4" strokeLinejoin="round" />
      )}
      {pusat && (
        <g>
          <line x1={b.X(pusat[0]) - 5} y1={b.Y(pusat[1]) - 5} x2={b.X(pusat[0]) + 5} y2={b.Y(pusat[1]) + 5} stroke={WARNA.depan} strokeWidth={2} />
          <line x1={b.X(pusat[0]) - 5} y1={b.Y(pusat[1]) + 5} x2={b.X(pusat[0]) + 5} y2={b.Y(pusat[1]) - 5} stroke={WARNA.depan} strokeWidth={2} />
        </g>
      )}
      {bangun.map(([x, y], i) => (
        <g key={`a${i}`}>
          <circle cx={b.X(x)} cy={b.Y(y)} r={3.4} fill={WARNA.samping} />
          <text x={b.X(x) + 6} y={b.Y(y) - 6} fontSize={11} fill={WARNA.samping} fontFamily={MONO}>{labelBangun[i] ?? `(${x}, ${y})`}</text>
        </g>
      ))}
      {bayangan?.map(([x, y], i) => (
        <g key={`b${i}`}>
          <circle cx={b.X(x)} cy={b.Y(y)} r={3.4} fill={WARNA.sudut} />
          <text x={b.X(x) + 6} y={b.Y(y) + 14} fontSize={11} fill={WARNA.sudut} fontFamily={MONO}>{labelBayangan[i] ?? `(${x}, ${y})`}</text>
        </g>
      ))}
    </svg>
  )
}

function jangkauanOtomatis(titik: [number, number][]): Jangkauan {
  let xMin = 0, xMaks = 0, yMin = 0, yMaks = 0
  for (const [x, y] of titik) {
    xMin = Math.min(xMin, x); xMaks = Math.max(xMaks, x)
    yMin = Math.min(yMin, y); yMaks = Math.max(yMaks, y)
  }
  return [xMin - 1, xMaks + 1, yMin - 1, yMaks + 1]
}

/** Garis cermin: "x" (sumbu-x), "y", "y=x", "y=-x", "x=2", "y=-1". */
function jalurCermin(c: string, b: ReturnType<typeof buatBidang>) {
  const s = c.replace(/\s/g, '')
  if (s === 'x') return { x1: b.kiri, y1: b.Y(0), x2: b.kanan, y2: b.Y(0) }
  if (s === 'y') return { x1: b.X(0), y1: b.atas, x2: b.X(0), y2: b.bawah }
  if (s === 'y=x') return { x1: b.X(b.xMin), y1: b.Y(b.xMin), x2: b.X(b.xMaks), y2: b.Y(b.xMaks) }
  if (s === 'y=-x') return { x1: b.X(b.xMin), y1: b.Y(-b.xMin), x2: b.X(b.xMaks), y2: b.Y(-b.xMaks) }
  const mx = s.match(/^x=(-?\d+(?:\.\d+)?)$/)
  if (mx) return { x1: b.X(Number(mx[1])), y1: b.atas, x2: b.X(Number(mx[1])), y2: b.bawah }
  const my = s.match(/^y=(-?\d+(?:\.\d+)?)$/)
  if (my) return { x1: b.kiri, y1: b.Y(Number(my[1])), x2: b.kanan, y2: b.Y(Number(my[1])) }
  return null
}
