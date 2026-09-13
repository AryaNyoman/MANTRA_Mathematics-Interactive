import { WARNA } from '@/lib/warna'
import { GARIS_PETAK, GARIS_SUMBU, MONO, type Bidang } from './dasar'

/**
 * Petak dan dua sumbu untuk gambar koordinat (grafik, vektor, bidang, luas).
 * Angka sumbu-x di bawah sumbu, angka sumbu-y di kiri sumbu; angka nol
 * ditulis sekali saja di pojok. Kalau sumbu jatuh di luar bidang (misalnya
 * yMin > 0), angkanya ditaruh di tepi kiri/bawah bidang.
 */
export default function Sumbu({ b, labelX = 'x', labelY = 'y' }: { b: Bidang; labelX?: string; labelY?: string }) {
  const x0 = b.X(Math.min(Math.max(0, b.xMin), b.xMaks))
  const y0 = b.Y(Math.min(Math.max(0, b.yMin), b.yMaks))
  return (
    <g>
      {b.petakX.map((p) => (
        <line key={`vx${p.nilai}`} x1={b.X(p.nilai)} y1={b.atas} x2={b.X(p.nilai)} y2={b.bawah} stroke={GARIS_PETAK} strokeWidth={1} />
      ))}
      {b.petakY.map((p) => (
        <line key={`hy${p.nilai}`} x1={b.kiri} y1={b.Y(p.nilai)} x2={b.kanan} y2={b.Y(p.nilai)} stroke={GARIS_PETAK} strokeWidth={1} />
      ))}
      <line x1={b.kiri} y1={y0} x2={b.kanan + 6} y2={y0} stroke={GARIS_SUMBU} strokeWidth={1.4} />
      <line x1={x0} y1={b.bawah} x2={x0} y2={b.atas - 6} stroke={GARIS_SUMBU} strokeWidth={1.4} />
      <text x={b.kanan + 10} y={y0 + 4} fontSize={11} fill={WARNA.samping} fontFamily={MONO} fontStyle="italic">{labelX}</text>
      <text x={x0 + 6} y={b.atas - 8} fontSize={11} fill={WARNA.depan} fontFamily={MONO} fontStyle="italic">{labelY}</text>
      {b.petakX.map((p) =>
        p.nilai === 0 && b.yMin < 0 && b.yMaks > 0 ? null : (
          <text key={`tx${p.nilai}`} x={b.X(p.nilai)} y={y0 + 13} fontSize={9.5} textAnchor="middle" fill={GARIS_SUMBU} fontFamily={MONO}>
            {p.label}
          </text>
        ),
      )}
      {b.petakY.map((p) =>
        p.nilai === 0 ? null : (
          <text key={`ty${p.nilai}`} x={x0 - 5} y={b.Y(p.nilai) + 3.5} fontSize={9.5} textAnchor="end" fill={GARIS_SUMBU} fontFamily={MONO}>
            {p.label}
          </text>
        ),
      )}
      {b.xMin < 0 && b.xMaks > 0 && b.yMin < 0 && b.yMaks > 0 && (
        <text x={x0 - 5} y={y0 + 13} fontSize={9.5} textAnchor="end" fill={GARIS_SUMBU} fontFamily={MONO}>0</text>
      )}
    </g>
  )
}
