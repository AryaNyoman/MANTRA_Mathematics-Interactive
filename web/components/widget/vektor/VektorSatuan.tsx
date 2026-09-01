'use client'

import { useRef } from 'react'
import BidangVektor from './BidangVektor'
import Legenda from './Legenda'
import Panah from './Panah'
import { angka, jendelaSeimbang, panjang, satuan, tahan, type Vek } from './geometri'
import { NISBAH, WARNA } from './gaya'
import { useSeret } from './useSeret'

export const BATAS = { x: 6, y: 3.5 }

const JANGKAR: Vek[] = [
  { x: -BATAS.x, y: -BATAS.y },
  { x: BATAS.x, y: BATAS.y },
]

/**
 * Widget Materi 05: vektor satuan.
 *
 * Panah panjang boleh ditarik ke mana saja, dan panah satuannya selalu
 * menempel searah dengannya dengan panjang tepat 1. Itulah yang ingin
 * ditunjukkan: arah bisa dipisahkan dari jauhnya.
 */
export default function VektorSatuan({
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
  const e = satuan(v)
  const p = panjang(v)

  return (
    <BidangVektor
      jendela={jendela}
      aria={`Vektor ${angka(v.x, 1)} dan ${angka(v.y, 1)} sepanjang ${angka(p, 2)}, beserta vektor satuannya yang selalu sepanjang 1. Ujungnya bisa ditarik.`}
      keterangan={`v = (${angka(v.x, 1)}  ${angka(v.y, 1)}), panjang ${angka(p, 2)}`}
      svgRef={svgRef}
      pointer={pointer}
      tandaSkala={false}
    >
      {/* i dan j, dua vektor satuan yang arahnya sudah tetap */}
      <Panah dari={asal} ke={{ x: 1, y: 0 }} jendela={jendela} warna={WARNA.redup} tebal={2} />
      <Panah dari={asal} ke={{ x: 0, y: 1 }} jendela={jendela} warna={WARNA.redup} tebal={2} />

      <Panah dari={asal} ke={v} jendela={jendela} warna={WARNA.miring} tebal={2.6} pegangan />
      <Panah dari={asal} ke={e} jendela={jendela} warna={WARNA.sudut} tebal={3.4} />

      <Legenda
        sudut="kanan-bawah"
        entri={[
          { warna: WARNA.miring, teks: `v, panjang ${angka(p, 2)}` },
          { warna: WARNA.sudut, teks: 'vektor satuan, panjang 1' },
          { warna: WARNA.redup, teks: 'i dan j' },
        ]}
      />
    </BidangVektor>
  )
}
