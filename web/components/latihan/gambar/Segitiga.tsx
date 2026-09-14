import { WARNA } from '@/lib/warna'
import { LEBAR, MONO } from './dasar'

/**
 * Segitiga siku-siku: siku di kanan bawah, sudut yang dibahas di kiri bawah.
 * Sisi depan (tegak) merah, samping (mendatar) biru, miring hitam, sama
 * dengan warna di video dan widget. Ukurannya dipilih supaya segitiga
 * selalu memenuhi tinggi gambar, apa pun sudutnya.
 */
export default function Segitiga({
  sudut = 35, label, namaSudut, sorot,
}: {
  sudut?: number
  label: [string, string, string]
  namaSudut?: string
  /** sisi yang dicari atau dibicarakan: lebih tebal, labelnya ditebalkan */
  sorot?: 'depan' | 'samping' | 'miring'
}) {
  const TINGGI = 230
  const d = Math.min(Math.max(sudut, 15), 75)
  const rad = (d * Math.PI) / 180
  // alas dan tinggi dipas ke kotak 300 x 160
  const alasMaks = 300, tinggiMaks = 160
  let alas = alasMaks
  let tinggi = alas * Math.tan(rad)
  if (tinggi > tinggiMaks) {
    tinggi = tinggiMaks
    alas = tinggi / Math.tan(rad)
  }
  const ax = (LEBAR - alas) / 2 - 10
  const ay = 196
  const bx = ax + alas
  const cy = ay - tinggi
  const [depan, samping, miring] = label
  const R = 30
  const busur = `M ${ax + R} ${ay} A ${R} ${R} 0 0 0 ${ax + R * Math.cos(rad)} ${ay - R * Math.sin(rad)}`
  const s = 12
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Segitiga siku-siku dengan sisi depan ${depan}, samping ${samping}, miring ${miring}`}>
      <polygon points={`${ax},${ay} ${bx},${ay} ${bx},${cy}`} fill="rgba(58, 110, 165, 0.06)" stroke="none" />
      <line x1={ax} y1={ay} x2={bx} y2={ay} stroke={WARNA.samping} strokeWidth={sorot === 'samping' ? 4 : 2.4} />
      <line x1={bx} y1={ay} x2={bx} y2={cy} stroke={WARNA.depan} strokeWidth={sorot === 'depan' ? 4 : 2.4} />
      <line x1={ax} y1={ay} x2={bx} y2={cy} stroke={WARNA.miring} strokeWidth={sorot === 'miring' ? 4 : 2.4} />
      <polyline points={`${bx - s},${ay} ${bx - s},${ay - s} ${bx},${ay - s}`} fill="none" stroke={WARNA.redup} strokeWidth={1.3} />
      {namaSudut && (
        <>
          <path d={busur} fill="none" stroke={WARNA.sudut} strokeWidth={1.8} />
          <text x={ax + R + 8} y={ay - 8} fontSize={13} fill={WARNA.sudut} fontFamily={MONO}>{namaSudut}</text>
        </>
      )}
      <text x={(ax + bx) / 2} y={ay + 20} fontSize={13} textAnchor="middle" fontWeight={sorot === 'samping' ? 700 : 400} fill={WARNA.samping} fontFamily={MONO}>{samping}</text>
      <text x={bx + 10} y={(ay + cy) / 2 + 5} fontSize={13} fontWeight={sorot === 'depan' ? 700 : 400} fill={WARNA.depan} fontFamily={MONO}>{depan}</text>
      <text x={(ax + bx) / 2 - 12} y={(ay + cy) / 2 - 10} fontSize={13} textAnchor="end" fontWeight={sorot === 'miring' ? 700 : 400} fill={WARNA.miring} fontFamily={MONO}>{miring}</text>
    </svg>
  )
}
