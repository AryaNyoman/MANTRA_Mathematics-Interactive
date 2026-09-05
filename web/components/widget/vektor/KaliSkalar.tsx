'use client'

import { useRef } from 'react'
import BidangVektor from './BidangVektor'
import Legenda from './Legenda'
import Panah from './Panah'
import {
  angka, jendelaSeimbang, kali, keLayar, panjang, tahan, type Vek,
} from './geometri'
import { KERTAS, KOTAK, MONO, NISBAH, WARNA } from './gaya'
import { useSeret } from './useSeret'

export const BATAS = { x: 2.5, y: 1.5 }
export const BATAS_K = { min: -3, maks: 3, langkah: 0.25 }

const JANGKAR: Vek[] = [
  { x: -6, y: -3.5 },
  { x: 6, y: 3.5 },
]

/**
 * Widget Materi 09: mengalikan vektor dengan sebuah bilangan.
 *
 * Batas tarikan vektor asalnya sengaja lebih sempit daripada widget lain,
 * sebab hasil kalinya bisa tiga kali lipat. Kalau batasnya sama, hasil kali
 * pada pengali 3 akan keluar dari bingkai jangkarnya dan memaksa gambar
 * mengecil terus-menerus saat digeser.
 */
export default function KaliSkalar({
  a,
  k,
  onUbah,
}: {
  a: Vek
  k: number
  onUbah: (a: Vek) => void
}) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const hasil = kali(k, a)
  const jendela = jendelaSeimbang([...JANGKAR, a, hasil], NISBAH, 0.05)
  const pointer = useSeret(jendela, svgRef, (t) => onUbah(tahan(t, BATAS.x, BATAS.y, 0.5)))

  const asal: Vek = { x: 0, y: 0 }
  const p = keLayar(jendela, KOTAK)
  const nol = panjang(hasil) < 0.01

  return (
    <BidangVektor
      jendela={jendela}
      aria={`Vektor a dikali ${angka(k, 2)}. Hasilnya ${angka(hasil.x, 2)} dan ${angka(hasil.y, 2)}. Ujung vektor a bisa ditarik.`}
      keterangan={`${angka(k, 2)} x a = (${angka(hasil.x, 2)}  ${angka(hasil.y, 2)})`}
      svgRef={svgRef}
      pointer={pointer}
      tandaSkala={false}
    >
      {/* hasil kali digambar lebih dulu supaya panah asalnya tetap terlihat
          di atasnya saat pengalinya kecil dan keduanya berimpit */}
      <Panah dari={asal} ke={hasil} kunci="k" jendela={jendela} warna={WARNA.sudut} tebal={3.4} />
      <Panah dari={asal} ke={a} kunci="a" jendela={jendela} warna={WARNA.miring} tebal={2.4} pegangan />

      {nol && (
        // Pada pengali nol, panahnya memang lenyap. Tanpa keterangan ini,
        // widgetnya terlihat rusak padahal justru sedang menunjukkan vektor nol.
        <text
          x={p.x(0) + 10} y={p.y(0) - 10} fontSize={12} fontFamily={MONO} fill={WARNA.sudut}
          stroke={KERTAS} strokeWidth={3.2} paintOrder="stroke"
        >
          hasilnya vektor nol
        </text>
      )}

      <Legenda
        sudut="kanan-bawah"
        entri={[
          { warna: WARNA.miring, teks: `a, panjang ${angka(panjang(a), 2)}` },
          { warna: WARNA.sudut, teks: `${angka(k, 2)} x a, panjang ${angka(panjang(hasil), 2)}` },
        ]}
      />
    </BidangVektor>
  )
}
