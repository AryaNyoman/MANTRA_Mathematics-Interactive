'use client'

import { useRef } from 'react'
import BidangVektor from './BidangVektor'
import Legenda from './Legenda'
import Panah from './Panah'
import { angka, keLayar, tambah, type Vek, tahanBersama, jendelaTetap } from './geometri'
import { KOTAK, NISBAH, WARNA } from './gaya'
import { useSeretTitik } from './useSeret'

export const BATAS = { x: 5.5, y: 3.2 }

/**
 * Widget Materi 07: metode jajar genjang.
 *
 * Kedua panah berangkat dari SATU titik, tidak disambung. Itulah bedanya
 * dengan Materi 06, dan bedanya bukan soal selera: metode segitiga untuk dua
 * hal yang terjadi berurutan, jajar genjang untuk dua hal yang bekerja
 * serentak. Hasil akhirnya kebetulan sama, dan itu justru yang menarik.
 */
export default function JajarGenjang({
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

  const jendela = jendelaTetap(BATAS.x, BATAS.y, NISBAH)
  const pointer = useSeretTitik(jendela, svgRef, [a, b], (i, t) => {
    // Ditahan BERSAMA pasangannya: resultan a + b juga harus tetap di kotak,
    // sebab jendelanya tidak lagi melebar mengikuti resultan.
    if (i === 0) onUbah(tahanBersama(t, b, BATAS.x, BATAS.y), b)
    else onUbah(a, tahanBersama(t, a, BATAS.x, BATAS.y))
  })

  const p = keLayar(jendela, KOTAK)
  const sisiJajar = [
    `M ${p.x(a.x)} ${p.y(a.y)} L ${p.x(hasil.x)} ${p.y(hasil.y)}`,
    `M ${p.x(b.x)} ${p.y(b.y)} L ${p.x(hasil.x)} ${p.y(hasil.y)}`,
  ].join(' ')

  return (
    <BidangVektor
      jendela={jendela}
      aria={`Jajar genjang dari vektor a ${angka(a.x, 1)} dan ${angka(a.y, 1)} dengan vektor b ${angka(b.x, 1)} dan ${angka(b.y, 1)}. Kedua ujungnya bisa ditarik.`}
      keterangan={`resultan = (${angka(hasil.x, 1)}  ${angka(hasil.y, 1)})`}
      svgRef={svgRef}
      pointer={pointer}
      tandaSkala={false}
    >
      <path d={sisiJajar} fill="none" stroke={WARNA.redup} strokeWidth={1.5} strokeDasharray="6 5" />

      <Panah dari={asal} ke={a} kunci="a" jendela={jendela} warna={WARNA.samping} tebal={2.6} pegangan />
      <Panah dari={asal} ke={b} kunci="b" jendela={jendela} warna={WARNA.depan} tebal={2.6} pegangan />
      <Panah dari={asal} ke={hasil} jendela={jendela} warna={WARNA.miring} tebal={3} />

      <Legenda
        sudut="kanan-bawah"
        entri={[
          { warna: WARNA.samping, teks: 'a' },
          { warna: WARNA.depan, teks: 'b' },
          { warna: WARNA.miring, teks: 'resultan, diagonalnya' },
          { warna: WARNA.redup, teks: 'sisi jajar genjang', putus: true },
        ]}
      />
    </BidangVektor>
  )
}
