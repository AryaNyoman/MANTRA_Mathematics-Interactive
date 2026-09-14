import { WARNA } from '@/lib/warna'
import { GARIS_SUMBU, LEBAR, MONO, angka } from './dasar'

/**
 * Garis bilangan untuk uji tanda turunan (naik/turun), tanda faktor, dan
 * selang penyelesaian (14 Sep 2026). Titik penuh berarti termasuk, titik
 * kosong berarti tidak termasuk. Tiap selang boleh membawa tanda ("+",
 * "−", "naik") dan disorot bila itu jawabannya.
 */
export default function GarisBilangan({
  jangkauan, titik, selang = [],
}: {
  jangkauan?: [number, number]
  titik: { x: number; label?: string; kosong?: boolean }[]
  selang?: { dari: number; sampai: number; tanda?: string; sorot?: boolean }[]
}) {
  const TINGGI = 120
  const xs = [...titik.map((t) => t.x), ...selang.flatMap((s) => [s.dari, s.sampai])].filter(Number.isFinite)
  const lebarData = xs.length ? Math.max(...xs) - Math.min(...xs) : 2
  const tepi = Math.max(lebarData * 0.25, 1)
  const [kiri, kanan] = jangkauan ?? [Math.min(...xs) - tepi, Math.max(...xs) + tepi]
  const X0 = 34, X1 = LEBAR - 34, Y = 68
  const X = (x: number) => X0 + ((Math.min(Math.max(x, kiri), kanan) - kiri) / (kanan - kiri)) * (X1 - X0)
  const takHingga = (x: number) => !Number.isFinite(x) || x <= kiri || x >= kanan
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Garis bilangan dengan titik ${titik.map((t) => t.label ?? angka(t.x)).join(', ')}`}>
      <defs>
        <marker id="ujung-garis-bilangan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={GARIS_SUMBU} />
        </marker>
      </defs>
      {selang.map((s, i) => {
        const a = X(Math.max(s.dari, kiri)), b = X(Math.min(s.sampai, kanan))
        return (
          <g key={`s${i}`}>
            <line x1={a} y1={Y} x2={b} y2={Y} stroke={s.sorot ? WARNA.depan : 'rgba(58, 110, 165, 0.35)'} strokeWidth={s.sorot ? 6 : 6} strokeLinecap="butt" />
            {s.tanda && (
              <text x={(a + b) / 2} y={Y - 16} fontSize={13} textAnchor="middle" fontWeight={s.sorot ? 700 : 500}
                    fill={s.sorot ? WARNA.depan : WARNA.samping} fontFamily={MONO}>{s.tanda}</text>
            )}
          </g>
        )
      })}
      <line x1={X0 - 12} y1={Y} x2={X1 + 12} y2={Y} stroke={GARIS_SUMBU} strokeWidth={1.4} markerEnd="url(#ujung-garis-bilangan)" markerStart="url(#ujung-garis-bilangan)" />
      {titik.map((t, i) => {
        if (takHingga(t.x)) return null
        const x = X(t.x)
        return (
          <g key={`t${i}`}>
            <line x1={x} y1={Y - 7} x2={x} y2={Y + 7} stroke={GARIS_SUMBU} strokeWidth={1.2} />
            <circle cx={x} cy={Y} r={5} fill={t.kosong ? 'var(--kartu)' : WARNA.miring} stroke={WARNA.miring} strokeWidth={1.8} />
            <text x={x} y={Y + 26} fontSize={12} textAnchor="middle" fill={WARNA.miring} fontFamily={MONO}>{t.label ?? angka(t.x)}</text>
          </g>
        )
      })}
    </svg>
  )
}
