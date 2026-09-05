'use client'

import { useRef } from 'react'
import BidangVektor from './BidangVektor'
import Legenda from './Legenda'
import Panah from './Panah'
import { siku } from './bentuk'
import {
  angka, jendelaSeimbang, keLayar, panjang, panjangProyeksi, tahan, vektorProyeksi, type Vek,
} from './geometri'
import { KOTAK, NISBAH, WARNA } from './gaya'
import { useSeretTitik } from './useSeret'

export const BATAS = { x: 5.5, y: 3.2 }

const JANGKAR: Vek[] = [
  { x: -BATAS.x, y: -BATAS.y },
  { x: BATAS.x, y: BATAS.y },
]

/**
 * Widget Materi 12: proyeksi a pada b, yaitu bayangan a kalau cahayanya jatuh
 * tegak lurus terhadap b.
 *
 * Garis tegak lurus dari ujung a ke ujung bayangannya sengaja digambar. Tanpa
 * garis itu, kata "bayangan" hanya kiasan; dengan garis itu, siswa melihat
 * dari mana bayangannya jatuh.
 */
export default function Proyeksi({
  a,
  b,
  onUbah,
}: {
  a: Vek
  b: Vek
  onUbah: (a: Vek, b: Vek) => void
}) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const asal: Vek = { x: 0, y: 0 }
  const bayangan = vektorProyeksi(a, b)
  const panjangBayangan = panjangProyeksi(a, b)

  const jendela = jendelaSeimbang([...JANGKAR, a, b, bayangan], NISBAH, 0.05)
  const pointer = useSeretTitik(jendela, svgRef, [a, b], (i, t) => {
    const p = tahan(t, BATAS.x, BATAS.y)
    if (i === 0) onUbah(p, b)
    else onUbah(a, p)
  })

  const p = keLayar(jendela, KOTAK)
  const adaSiku = panjang(a) > 0.05 && panjang(b) > 0.05 && Math.abs(panjangBayangan) > 0.05
  const tandaSiku = adaSiku ? siku(bayangan, asal, a, jendela, KOTAK, 8) : null

  return (
    <BidangVektor
      jendela={jendela}
      aria={`Proyeksi vektor a pada vektor b. Panjang proyeksinya ${angka(panjangBayangan, 2)}. Kedua ujungnya bisa ditarik.`}
      keterangan={`panjang proyeksi a pada b = ${angka(panjangBayangan, 2)}`}
      svgRef={svgRef}
      pointer={pointer}
      tandaSkala={false}
    >
      {/* garis tegak lurus dari ujung a turun ke bayangannya */}
      <line
        x1={p.x(a.x)} y1={p.y(a.y)} x2={p.x(bayangan.x)} y2={p.y(bayangan.y)}
        stroke={WARNA.redup} strokeWidth={1.5} strokeDasharray="5 4"
      />
      {tandaSiku && <path d={tandaSiku} fill="none" stroke={WARNA.redup} strokeWidth={1.3} />}

      <Panah dari={asal} ke={bayangan} jendela={jendela} warna={WARNA.sudut} tebal={5}
             opasitas={0.55} />
      <Panah dari={asal} ke={b} kunci="b" jendela={jendela} warna={WARNA.depan} tebal={2.6} pegangan />
      <Panah dari={asal} ke={a} kunci="a" jendela={jendela} warna={WARNA.samping} tebal={2.8} pegangan />

      <Legenda
        sudut="kanan-bawah"
        entri={[
          { warna: WARNA.samping, teks: 'a, yang diproyeksikan' },
          { warna: WARNA.depan, teks: 'b, tempat jatuhnya' },
          { warna: WARNA.sudut, teks: `bayangan a pada b, ${angka(panjangBayangan, 2)}` },
          { warna: WARNA.redup, teks: 'tegak lurus ke b', putus: true },
        ]}
      />
    </BidangVektor>
  )
}
