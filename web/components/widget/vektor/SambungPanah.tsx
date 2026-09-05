'use client'

import { useRef } from 'react'
import BidangVektor from './BidangVektor'
import Legenda from './Legenda'
import Panah from './Panah'
import { angka, jendelaSeimbang, kurang, tahan, tambah, type Vek } from './geometri'
import { NISBAH, WARNA } from './gaya'
import { useSeretTitik } from './useSeret'

export const BATAS = { x: 6, y: 3.5 }

const JANGKAR: Vek[] = [
  { x: -BATAS.x, y: -BATAS.y },
  { x: BATAS.x, y: BATAS.y },
]

/**
 * Widget Materi 06: menjumlah dengan cara menyambung, ujung ke pangkal.
 *
 * Yang diseret adalah UJUNG a dan UJUNG b, bukan nilai a dan b secara terpisah.
 * Dengan begitu bentuk sambungannya terjaga: b selalu berangkat dari tempat a
 * berhenti, dan siswa tidak bisa keliru menyambungnya pangkal ke pangkal.
 */
export default function SambungPanah({
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
  const hasil = tambah(a, b)

  const jendela = jendelaSeimbang([...JANGKAR, a, b, hasil], NISBAH, 0.05)
  // Titik yang bisa dipegang: ujung a, dan ujung b yang letaknya di a tambah b.
  const pointer = useSeretTitik(jendela, svgRef, [a, hasil], (i, t) => {
    const titik = tahan(t, BATAS.x, BATAS.y)
    if (i === 0) onUbah(titik, b)
    else onUbah(a, kurang(titik, a))
  })

  return (
    <BidangVektor
      jendela={jendela}
      aria={`Vektor a sama dengan ${angka(a.x, 1)} dan ${angka(a.y, 1)} disambung dengan b sama dengan ${angka(b.x, 1)} dan ${angka(b.y, 1)}. Kedua ujungnya bisa ditarik.`}
      keterangan={`a (${angka(a.x, 1)}  ${angka(a.y, 1)}) + b (${angka(b.x, 1)}  ${angka(b.y, 1)}) = (${angka(hasil.x, 1)}  ${angka(hasil.y, 1)})`}
      svgRef={svgRef}
      pointer={pointer}
      tandaSkala={false}
    >
      <Panah dari={asal} ke={a} kunci="a" jendela={jendela} warna={WARNA.samping} tebal={2.6} pegangan />
      <Panah dari={a} ke={hasil} kunci="b" jendela={jendela} warna={WARNA.depan} tebal={2.6} pegangan />
      <Panah dari={asal} ke={hasil} jendela={jendela} warna={WARNA.miring} tebal={3} />

      <Legenda
        sudut="kanan-bawah"
        entri={[
          { warna: WARNA.samping, teks: 'a, langkah pertama' },
          { warna: WARNA.depan, teks: 'b, disambung dari ujung a' },
          { warna: WARNA.miring, teks: 'a + b, hasilnya' },
        ]}
      />
    </BidangVektor>
  )
}
