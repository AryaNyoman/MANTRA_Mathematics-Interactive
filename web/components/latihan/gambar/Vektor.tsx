import { WARNA } from '@/lib/warna'
import Sumbu from './Sumbu'
import { LEBAR, MONO, buatBidang, type Jangkauan } from './dasar'

type Panah = { dari?: [number, number]; ke: [number, number]; label?: string; warna?: 'samping' | 'depan' | 'sudut' | 'miring' }

/**
 * Panah vektor di bidang koordinat. `ke` adalah ujung relatif terhadap
 * `dari` (bawaan titik asal), jadi (3, 1) selalu berarti tiga ke kanan
 * satu ke atas, di mana pun pangkalnya. `komponen` menggambar kaki
 * mendatar biru dan tegak merah putus-putus untuk panah yang disebut.
 */
export default function Vektor({
  panah, jangkauan, komponen = [], proyeksi,
}: {
  panah: Panah[]
  jangkauan?: Jangkauan
  komponen?: number[]
  /** proyeksi panah `dari` pada garis panah `ke`; keduanya harus berpangkal sama */
  proyeksi?: { dari: number; ke: number; label?: string }
}) {
  const TINGGI = 280
  const j: Jangkauan = jangkauan ?? jangkauanOtomatis(panah)
  const b = buatBidang(j, TINGGI)
  const warnaUrut: Panah['warna'][] = ['sudut', 'samping', 'depan', 'miring']
  // kaki proyeksi: pangkal + ((a . u) u), u = arah satuan panah `ke`
  const pro = (() => {
    if (!proyeksi) return null
    const a = panah[proyeksi.dari], v = panah[proyeksi.ke]
    if (!a || !v) return null
    const [x0, y0] = v.dari ?? [0, 0]
    const n = Math.hypot(v.ke[0], v.ke[1]) || 1
    const ux = v.ke[0] / n, uy = v.ke[1] / n
    const t = a.ke[0] * ux + a.ke[1] * uy
    return { x0, y0, ax: x0 + a.ke[0], ay: y0 + a.ke[1], kx: x0 + t * ux, ky: y0 + t * uy }
  })()
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Vektor ${panah.map((p) => `(${p.ke[0]}, ${p.ke[1]})`).join(', ')}`}>
      <defs>
        {(['sudut', 'samping', 'depan', 'miring'] as const).map((w) => (
          <marker key={w} id={`panah-${w}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={WARNA[w]} />
          </marker>
        ))}
      </defs>
      <Sumbu b={b} />
      {pro && (
        <g>
          <line x1={b.X(pro.ax)} y1={b.Y(pro.ay)} x2={b.X(pro.kx)} y2={b.Y(pro.ky)} stroke={WARNA.redup} strokeWidth={1.4} strokeDasharray="4 3" />
          <line x1={b.X(pro.x0)} y1={b.Y(pro.y0)} x2={b.X(pro.kx)} y2={b.Y(pro.ky)} stroke={WARNA.depan} strokeWidth={5} strokeLinecap="butt" opacity={0.85} />
          {(() => {
            // tanda siku di kaki proyeksi
            const sx = b.X(pro.kx), sy = b.Y(pro.ky)
            const dx = b.X(pro.x0) - sx, dy = b.Y(pro.y0) - sy
            const n = Math.hypot(dx, dy) || 1
            const ex = b.X(pro.ax) - sx, ey = b.Y(pro.ay) - sy
            const m = Math.hypot(ex, ey) || 1
            const k = 8
            return (
              <polyline points={`${sx + (dx / n) * k},${sy + (dy / n) * k} ${sx + (dx / n) * k + (ex / m) * k},${sy + (dy / n) * k + (ey / m) * k} ${sx + (ex / m) * k},${sy + (ey / m) * k}`}
                        fill="none" stroke={WARNA.redup} strokeWidth={1.2} />
            )
          })()}
          {proyeksi?.label && (
            <text x={(b.X(pro.x0) + b.X(pro.kx)) / 2} y={(b.Y(pro.y0) + b.Y(pro.ky)) / 2 + 18} fontSize={11.5} textAnchor="middle" fill={WARNA.depan} fontFamily={MONO}>{proyeksi.label}</text>
          )}
        </g>
      )}
      {panah.map((p, i) => {
        const [x0, y0] = p.dari ?? [0, 0]
        const x1 = x0 + p.ke[0], y1 = y0 + p.ke[1]
        const w = p.warna ?? warnaUrut[i % warnaUrut.length]!
        return (
          <g key={i}>
            {komponen.includes(i) && (
              <>
                <line x1={b.X(x0)} y1={b.Y(y0)} x2={b.X(x1)} y2={b.Y(y0)} stroke={WARNA.samping} strokeWidth={1.6} strokeDasharray="4 3" />
                <line x1={b.X(x1)} y1={b.Y(y0)} x2={b.X(x1)} y2={b.Y(y1)} stroke={WARNA.depan} strokeWidth={1.6} strokeDasharray="4 3" />
                <text x={(b.X(x0) + b.X(x1)) / 2} y={b.Y(y0) + (y1 >= y0 ? 13 : -6)} fontSize={10.5} textAnchor="middle" fill={WARNA.samping} fontFamily={MONO}>{p.ke[0]}</text>
                <text x={b.X(x1) + (x1 >= x0 ? 6 : -6)} y={(b.Y(y0) + b.Y(y1)) / 2 + 4} fontSize={10.5} textAnchor={x1 >= x0 ? 'start' : 'end'} fill={WARNA.depan} fontFamily={MONO}>{p.ke[1]}</text>
              </>
            )}
            <line x1={b.X(x0)} y1={b.Y(y0)} x2={b.X(x1)} y2={b.Y(y1)} stroke={WARNA[w]} strokeWidth={2.4} markerEnd={`url(#panah-${w})`} />
            {p.label && (() => {
              // Label di sisi kiri panah (tegak lurus arahnya), pada 55, 70,
              // atau 40 persen panjangnya bergantian, supaya dua panah yang
              // berpangkal sama tidak menumpuk labelnya (galeri 13 Sep).
              const sx0 = b.X(x0), sy0 = b.Y(y0), sx1 = b.X(x1), sy1 = b.Y(y1)
              const dx = sx1 - sx0, dy = sy1 - sy0
              const pj = Math.hypot(dx, dy) || 1
              const nx = dy / pj, ny = -dx / pj
              const t = [0.55, 0.72, 0.4][i % 3]!
              const lx = sx0 + dx * t + nx * 13, ly = sy0 + dy * t + ny * 13
              return (
                <text x={lx} y={ly + 4} fontSize={12} textAnchor={nx < -0.3 ? 'end' : nx > 0.3 ? 'start' : 'middle'} fill={WARNA[w]} fontFamily={MONO}>{p.label}</text>
              )
            })()}
          </g>
        )
      })}
    </svg>
  )
}

function jangkauanOtomatis(panah: Panah[]): Jangkauan {
  let xMin = 0, xMaks = 0, yMin = 0, yMaks = 0
  for (const p of panah) {
    const [x0, y0] = p.dari ?? [0, 0]
    for (const [x, y] of [[x0, y0], [x0 + p.ke[0], y0 + p.ke[1]]] as [number, number][]) {
      xMin = Math.min(xMin, x); xMaks = Math.max(xMaks, x)
      yMin = Math.min(yMin, y); yMaks = Math.max(yMaks, y)
    }
  }
  return [xMin - 1, xMaks + 1, yMin - 1, yMaks + 1]
}
