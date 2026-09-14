import { WARNA } from '@/lib/warna'
import { GARIS_SUMBU, LEBAR, MONO, angka } from './dasar'

/**
 * Bagan empat kuadran untuk pembahasan tanda perbandingan trigonometri
 * (gambar bantu ala mathcyber1997, 14 Sep 2026). Tiap kuadran ditulis
 * namanya dan fungsi yang bernilai positif di sana; kuadran yang sedang
 * dibahas disorot. Sudut, kalau diberi, digambar sebagai sinar dari
 * sumbu-x positif lengkap dengan busurnya, supaya terlihat KENAPA sudut
 * itu jatuh di kuadran tersebut.
 */
export default function Kuadran({ sorot, sudut, label }: { sorot?: 1 | 2 | 3 | 4; sudut?: number; label?: string }) {
  const TINGGI = 260
  const CX = LEBAR / 2, CY = 130
  const RX = 170, RY = 104
  const ISI: Record<1 | 2 | 3 | 4, { nama: string; positif: string; x: number; y: number }> = {
    // nama kuadran ditaruh dekat pojok luar, menjauh dari sinar sudut di tengah
    1: { nama: 'Kuadran I', positif: 'semua positif', x: CX + RX * 0.62, y: CY - RY * 0.6 },
    2: { nama: 'Kuadran II', positif: 'sin positif', x: CX - RX * 0.62, y: CY - RY * 0.6 },
    3: { nama: 'Kuadran III', positif: 'tan positif', x: CX - RX * 0.62, y: CY + RY * 0.55 },
    4: { nama: 'Kuadran IV', positif: 'cos positif', x: CX + RX * 0.62, y: CY + RY * 0.55 },
  }
  const kotak = (k: 1 | 2 | 3 | 4) => ({
    x: k === 1 || k === 4 ? CX : CX - RX,
    y: k === 1 || k === 2 ? CY - RY : CY,
  })
  const rad = sudut === undefined ? 0 : (sudut * Math.PI) / 180
  const panjang = 66
  const ux = CX + panjang * Math.cos(rad), uy = CY - panjang * Math.sin(rad)
  const rb = 20
  const besar = sudut !== undefined && ((sudut % 360) + 360) % 360 > 180 ? 1 : 0
  const busur = `M ${CX + rb} ${CY} A ${rb} ${rb} 0 ${besar} 0 ${CX + rb * Math.cos(rad)} ${CY - rb * Math.sin(rad)}`
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Bagan empat kuadran${sorot ? `, kuadran ${sorot} disorot` : ''}${sudut !== undefined ? `, sudut ${angka(sudut, 1)} derajat` : ''}`}>
      {sorot && (
        <rect {...kotak(sorot)} width={RX} height={RY} fill="rgba(106, 76, 147, 0.14)" stroke={WARNA.sudut} strokeWidth={1.4} strokeDasharray="6 4" />
      )}
      <line x1={CX - RX - 8} y1={CY} x2={CX + RX + 8} y2={CY} stroke={GARIS_SUMBU} strokeWidth={1.4} />
      <line x1={CX} y1={CY + RY + 8} x2={CX} y2={CY - RY - 8} stroke={GARIS_SUMBU} strokeWidth={1.4} />
      <text x={CX + RX + 12} y={CY + 4} fontSize={11} fill={GARIS_SUMBU} fontFamily={MONO}>0°</text>
      <text x={CX + 6} y={CY - RY - 12} fontSize={11} fill={GARIS_SUMBU} fontFamily={MONO}>90°</text>
      <text x={CX - RX - 12} y={CY + 4} fontSize={11} textAnchor="end" fill={GARIS_SUMBU} fontFamily={MONO}>180°</text>
      <text x={CX + 6} y={CY + RY + 20} fontSize={11} fill={GARIS_SUMBU} fontFamily={MONO}>270°</text>
      {([1, 2, 3, 4] as const).map((k) => {
        const i = ISI[k]
        const aktif = sorot === k
        return (
          <g key={k}>
            <text x={i.x} y={i.y - 6} fontSize={13} textAnchor="middle" fontWeight={aktif ? 700 : 500}
                  fill={aktif ? WARNA.sudut : WARNA.miring} fontFamily={MONO}>{i.nama}</text>
            <text x={i.x} y={i.y + 12} fontSize={11.5} textAnchor="middle" fill={aktif ? WARNA.sudut : WARNA.redup} fontFamily={MONO}>{i.positif}</text>
          </g>
        )
      })}
      {sudut !== undefined && (
        <>
          <path d={busur} fill="none" stroke={WARNA.depan} strokeWidth={1.8} />
          <line x1={CX} y1={CY} x2={ux} y2={uy} stroke={WARNA.depan} strokeWidth={2.2} />
          <circle cx={ux} cy={uy} r={3.6} fill={WARNA.depan} />
          <text x={ux + (Math.cos(rad) >= 0 ? 8 : -8)} y={uy + (Math.sin(rad) >= 0 ? -6 : 14)} fontSize={12}
                textAnchor={Math.cos(rad) >= 0 ? 'start' : 'end'} fill={WARNA.depan} fontFamily={MONO}>
            {label ?? `${angka(sudut, 1)}°`}
          </text>
        </>
      )}
    </svg>
  )
}
