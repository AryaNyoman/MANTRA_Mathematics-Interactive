'use client'

import { useRef } from 'react'
import BidangTransformasi from './BidangTransformasi'
import Legenda from './Legenda'
import { Bentuk, Pegangan } from './Bentuk'
import { Panah } from './Garis'
import { BENTUK_L, translasi, type Titik } from './matriks'
import { angka, jendelaSeimbang, keLayar, tahan } from './papan'
import { GESER, KOTAK, NISBAH, PETA, PRAPETA } from './gaya'
import { useSeret } from './useSeret'

/** Batas geseran, supaya jendelanya tidak melebar tak terkendali. */
export const BATAS_GESER = { x: 5, y: 3 }

const JANGKAR: Titik[] = [
  { x: -6, y: -3.7 },
  { x: 8, y: 3.7 },
]

/**
 * Widget Materi 02: translasi.
 *
 * Yang ditarik siswa adalah UJUNG PANAH GESERAN, bukan bentuknya. Bedanya
 * penting: kalau bentuknya yang ditarik, siswa merasa sedang memindahkan benda
 * dengan tangan, dan translasi kembali terasa seperti "menggeser gambar".
 * Dengan panah geseran yang ditarik, yang ia setel adalah ATURANNYA, dan
 * bentuknya berpindah sebagai akibat.
 *
 * Panahnya digambar dari titik A ke A', jadi geseran yang sama juga terlihat
 * berlaku pada titik lain lewat kesejajaran keenam pasangannya.
 */
export default function GeserBentuk({
  geser,
  onUbah,
}: {
  geser: Titik
  onUbah: (t: Titik) => void
}) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  const prapeta = BENTUK_L
  const peta = prapeta.map((t) => translasi(t, geser))
  const A = prapeta[0]
  const Aksen = peta[0]

  const jendela = jendelaSeimbang([...JANGKAR, ...prapeta, ...peta], NISBAH, 0.06)

  // Yang diseret adalah ujung panah, jadi nilai geserannya adalah selisih
  // antara jari dan titik A.
  const pointer = useSeret(jendela, svgRef, (t) =>
    onUbah(tahan({ x: t.x - A.x, y: t.y - A.y }, BATAS_GESER.x, BATAS_GESER.y)),
  )

  const p = keLayar(jendela, KOTAK)

  return (
    <BidangTransformasi
      jendela={jendela}
      aria={`Bentuk huruf L digeser sejauh ${angka(geser.x, 1)} mendatar dan ${angka(geser.y, 1)} tegak. Ujung panah geserannya bisa ditarik.`}
      keterangan={`translasi (${angka(geser.x, 1)}, ${angka(geser.y, 1)})`}
      svgRef={svgRef}
      pointer={pointer}
    >
      {/* Keenam pasangan digambar sejajar, sebab kesejajaran itulah yang
          membedakan translasi dari keempat transformasi lain. */}
      {prapeta.map((t, i) => (
        <line
          key={`sejajar${i}`}
          x1={p.x(t.x)} y1={p.y(t.y)}
          x2={p.x(peta[i].x)} y2={p.y(peta[i].y)}
          stroke={GESER} strokeWidth={1} strokeDasharray="3 3" opacity={0.5}
        />
      ))}

      <Bentuk titik={prapeta} p={p} warna={PRAPETA} isian={0.08} putus />
      <Bentuk titik={peta} p={p} warna={PETA} isian={0.14} petik="'" />

      <Panah dari={A} ke={Aksen} p={p} warna={GESER} tebal={2.8} />
      <Pegangan titik={Aksen} p={p} warna={GESER} />

      <Legenda
        entri={[
          { warna: PRAPETA, teks: 'prapeta', putus: true },
          { warna: PETA, teks: 'peta' },
          { warna: GESER, teks: 'vektor geseran' },
        ]}
      />
    </BidangTransformasi>
  )
}
