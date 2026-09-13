import { WARNA } from '@/lib/warna'
import { GARIS_SUMBU, LEBAR, MONO, angka } from './dasar'

/**
 * Lingkaran satuan dengan satu titik pada sudut tertentu. Kaki x biru dan
 * kaki y merah (cos dan sin) mengikuti aturan warna video. Label titik
 * ditaruh menjauhi pusat, di sisi luar lingkaran.
 */
export default function Lingkaran({ sudut, label, kaki = true }: { sudut: number; label?: string; kaki?: boolean }) {
  const TINGGI = 250
  const CX = LEBAR / 2, CY = 125, R = 92
  const rad = (sudut * Math.PI) / 180
  const px = CX + R * Math.cos(rad)
  const py = CY - R * Math.sin(rad)
  const besar = Math.abs(sudut % 360) > 180 ? 1 : 0
  const rb = 26
  const busur = `M ${CX + rb} ${CY} A ${rb} ${rb} 0 ${besar} 0 ${CX + rb * Math.cos(rad)} ${CY - rb * Math.sin(rad)}`
  const sisiX = Math.cos(rad) >= 0 ? 1 : -1
  const sisiY = Math.sin(rad) >= 0 ? -1 : 1
  // kaki yang panjangnya nol (sudut 0, 90, 180, 270) tidak diberi label:
  // labelnya cuma menindih angka sumbu (lembar kontak galeri, 13 Sep)
  const adaCos = Math.abs(Math.cos(rad)) > 0.06
  const adaSin = Math.abs(Math.sin(rad)) > 0.06
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Lingkaran satuan, titik pada sudut ${angka(sudut, 1)} derajat`}>
      <line x1={CX - R - 22} y1={CY} x2={CX + R + 22} y2={CY} stroke={GARIS_SUMBU} strokeWidth={1.2} />
      <line x1={CX} y1={CY + R + 16} x2={CX} y2={CY - R - 16} stroke={GARIS_SUMBU} strokeWidth={1.2} />
      <text x={CX + R + 26} y={CY + 4} fontSize={11} fill={WARNA.samping} fontFamily={MONO} fontStyle="italic">x</text>
      <text x={CX - 8} y={CY - R - 12} fontSize={11} textAnchor="end" fill={WARNA.depan} fontFamily={MONO} fontStyle="italic">y</text>
      <text x={CX + R + 3} y={CY + 13} fontSize={9.5} fill={GARIS_SUMBU} fontFamily={MONO}>1</text>
      <text x={CX - R - 10} y={CY + 13} fontSize={9.5} fill={GARIS_SUMBU} fontFamily={MONO}>-1</text>
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={WARNA.miring} strokeWidth={1.6} />
      {kaki && (
        <>
          <line x1={CX} y1={CY} x2={px} y2={CY} stroke={WARNA.samping} strokeWidth={2.6} />
          <line x1={px} y1={CY} x2={px} y2={py} stroke={WARNA.depan} strokeWidth={2.6} />
          {adaCos && (
            <text x={(CX + px) / 2} y={CY + sisiY * -1 * 14 + (sisiY < 0 ? 0 : 4)} fontSize={11} textAnchor="middle" fill={WARNA.samping} fontFamily={MONO}>
              cos
            </text>
          )}
          {adaSin && (
            <text x={px + sisiX * 12} y={(CY + py) / 2 + 4} fontSize={11} textAnchor={sisiX > 0 ? 'start' : 'end'} fill={WARNA.depan} fontFamily={MONO}>
              sin
            </text>
          )}
        </>
      )}
      <line x1={CX} y1={CY} x2={px} y2={py} stroke={WARNA.miring} strokeWidth={1.8} />
      <path d={busur} fill="none" stroke={WARNA.sudut} strokeWidth={1.8} />
      <text x={CX + 32} y={CY - 8} fontSize={11.5} fill={WARNA.sudut} fontFamily={MONO}>{angka(sudut, 1)}°</text>
      <circle cx={px} cy={py} r={4.5} fill={WARNA.miring} stroke="var(--kartu)" strokeWidth={1.6} />
      {label && (
        <text x={px + sisiX * 10} y={py + (sisiY < 0 ? -8 : 16)} fontSize={11.5} textAnchor={sisiX > 0 ? 'start' : 'end'} fill={WARNA.miring} fontFamily={MONO}>
          {label}
        </text>
      )}
    </svg>
  )
}
