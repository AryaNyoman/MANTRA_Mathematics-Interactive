'use client'

import { useRef } from 'react'
import BidangVektor from './BidangVektor'
import Panah from './Panah'
import { busurDariSumbu, siku } from './bentuk'
import {
  angka, jendelaSeimbang, keLayar, mataAngin, panjang, sudutDerajat, tahan, type Vek,
} from './geometri'
import { KERTAS, KOTAK, MONO, NISBAH, WARNA } from './gaya'
import { useSeret } from './useSeret'

export const BATAS = { x: 6, y: 3.5 }

const JANGKAR: Vek[] = [
  { x: -BATAS.x, y: -BATAS.y },
  { x: BATAS.x, y: BATAS.y },
]

/**
 * Widget Materi 04: panjang dan arah sebuah panah.
 *
 * Segitiga siku-sikunya sengaja tetap terlihat samar. Panjang vektor di materi
 * ini diturunkan dari Pythagoras, bukan dari trigonometri, sebab di buku
 * Vektor adalah Bab 3 dan Trigonometri Bab 4. Kalau segitiganya disembunyikan,
 * rumus akar itu berubah jadi mantra yang harus dihafal.
 */
export default function PanjangDanArah({
  v,
  onUbah,
}: {
  v: Vek
  onUbah: (v: Vek) => void
}) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const jendela = jendelaSeimbang([...JANGKAR, v], NISBAH, 0.05)
  const pointer = useSeret(jendela, svgRef, (t) => onUbah(tahan(t, BATAS.x, BATAS.y)))

  const asal: Vek = { x: 0, y: 0 }
  const sudut: Vek = { x: v.x, y: 0 }
  const p = keLayar(jendela, KOTAK)

  const adaSegitiga = Math.abs(v.x) > 0.01 && Math.abs(v.y) > 0.01
  const tandaSiku = adaSegitiga ? siku(sudut, asal, v, jendela, KOTAK) : null
  const busur = busurDariSumbu(asal, v, jendela, KOTAK, 34)
  const derajat = sudutDerajat(v)

  // Label sudut ditaruh di tengah busurnya, sedikit lebih jauh dari pusat
  // supaya tidak menempel pada garis busurnya sendiri.
  const radTengah = ((derajat / 2) * Math.PI) / 180
  const labelSudutX = p.x(0) + 50 * Math.cos(radTengah)
  const labelSudutY = p.y(0) - 50 * Math.sin(radTengah) + 4

  return (
    <BidangVektor
      jendela={jendela}
      aria={`Vektor ${angka(v.x, 1)} dan ${angka(v.y, 1)}, panjang ${angka(panjang(v), 2)}, arah ${angka(derajat, 1)} derajat. Ujungnya bisa ditarik.`}
      keterangan={`v = (${angka(v.x, 1)}  ${angka(v.y, 1)})`}
      svgRef={svgRef}
      pointer={pointer}
      tandaSkala={false}
    >
      {/* segitiga siku-siku pembantu, dibiarkan samar supaya tidak merebut
          perhatian dari panah utamanya */}
      {adaSegitiga && (
        <>
          <line x1={p.x(0)} y1={p.y(0)} x2={p.x(sudut.x)} y2={p.y(sudut.y)}
                stroke={WARNA.samping} strokeWidth={1.6} strokeDasharray="5 4" opacity={0.75} />
          <line x1={p.x(sudut.x)} y1={p.y(sudut.y)} x2={p.x(v.x)} y2={p.y(v.y)}
                stroke={WARNA.depan} strokeWidth={1.6} strokeDasharray="5 4" opacity={0.75} />
        </>
      )}
      {tandaSiku && <path d={tandaSiku} fill="none" stroke={WARNA.redup} strokeWidth={1.3} />}

      {busur && <path d={busur} fill="none" stroke={WARNA.sudut} strokeWidth={1.8} />}
      {derajat > 3 && (
        <text
          x={labelSudutX} y={labelSudutY} textAnchor="middle"
          fontSize={12} fontFamily={MONO} fill={WARNA.sudut}
          stroke={KERTAS} strokeWidth={3.2} paintOrder="stroke"
        >
          {angka(derajat, 1)}°
        </text>
      )}

      <Panah dari={asal} ke={v} kunci="v" jendela={jendela} warna={WARNA.miring} tebal={2.8} pegangan
             label={`panjang ${angka(panjang(v), 2)}`} sisiLabel={-1} bagian={0.7}
             jarakLabel={21} />

      <text
        x={KOTAK.x1} y={KOTAK.y0 - 8} textAnchor="end" fontSize={11} fontFamily={MONO}
        fill={WARNA.miring}
      >
        arah {mataAngin(v)}
      </text>
    </BidangVektor>
  )
}
