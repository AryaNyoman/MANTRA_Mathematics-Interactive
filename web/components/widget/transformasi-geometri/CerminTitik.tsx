'use client'

import { useRef } from 'react'
import BidangTransformasi from './BidangTransformasi'
import Legenda from './Legenda'
import { Bentuk, Pegangan } from './Bentuk'
import { RuasBerangka } from './Garis'
import { BENTUK_L, cerminTitik, type Titik } from './matriks'
import { angka, jendelaSeimbang, keLayar, tahan } from './papan'
import { ALAT, BANTU, KOTAK, NISBAH, PETA, PRAPETA } from './gaya'
import { useSeret } from './useSeret'

export const BATAS_PUSAT = { x: 6, y: 3.5 }

const JANGKAR: Titik[] = [
  { x: -5, y: -3.1 },
  { x: 7, y: 3.1 },
]

/**
 * Widget Materi 05: pencerminan pada sebuah titik.
 *
 * Pusatnya bisa ditarik ke mana saja, dan garis lurus dari tiap titik prapeta
 * MELEWATI pusat itu menuju petanya. Itu definisinya, dan definisi itulah yang
 * digambar: bukan "hasilnya kebetulan begini", melainkan "pusatnya selalu
 * tepat di tengah".
 *
 * Kedua potongan pada titik A diberi angka, dengan alasan yang sama seperti di
 * Materi 03: kesamaan yang diberi angka bisa diperiksa siswa, kesamaan yang
 * hanya diberi tanda harus dipercaya.
 *
 * Widget ini juga menyiapkan Materi 06. Kalau siswa menaruh pusatnya di titik
 * asal, gambarnya sama persis dengan rotasi 180 derajat, dan janji itu ditagih
 * di materi berikutnya.
 */
export default function CerminTitik({
  pusat,
  onUbah,
}: {
  pusat: Titik
  onUbah: (t: Titik) => void
}) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  const prapeta = BENTUK_L
  const peta = prapeta.map((t) => cerminTitik(t, pusat))

  const jendelaHitung = jendelaSeimbang([...JANGKAR, ...prapeta, ...peta], NISBAH, 0.06)
  const pointer = useSeret(jendelaHitung, svgRef, (t) =>
    onUbah(tahan(t, BATAS_PUSAT.x, BATAS_PUSAT.y)),
  )
  const jendela = pointer.jendela

  const p = keLayar(jendela, KOTAK)
  const A = prapeta[0]
  const Aksen = peta[0]

  const diTitikAsal = pusat.x === 0 && pusat.y === 0

  return (
    <BidangTransformasi
      jendela={jendela}
      aria={`Bentuk huruf L dicerminkan pada titik ${angka(pusat.x, 1)}, ${angka(pusat.y, 1)}. Pusat cerminnya bisa ditarik.`}
      keterangan={
        diTitikAsal
          ? 'cermin pada titik asal, sama dengan rotasi 180 derajat'
          : `cermin pada titik (${angka(pusat.x, 1)}, ${angka(pusat.y, 1)})`
      }
      svgRef={svgRef}
      pointer={pointer}
    >
      {/* Garis lurus dari tiap titik prapeta, MELEWATI pusat, sampai petanya. */}
      {prapeta.map((t, i) => (
        <RuasBerangka key={`lw${i}`} dari={t} ke={peta[i]} p={p} warna={BANTU} tampilkanAngka={false} />
      ))}

      <Bentuk titik={prapeta} p={p} warna={PRAPETA} isian={0.08} putus />
      <Bentuk titik={peta} p={p} warna={PETA} isian={0.14} petik="'" />

      <RuasBerangka dari={A} ke={pusat} p={p} warna={ALAT} sisi={1} />
      <RuasBerangka dari={pusat} ke={Aksen} p={p} warna={ALAT} sisi={-1} />

      <Pegangan titik={pusat} p={p} warna={ALAT} label={diTitikAsal ? 'O' : 'M'} kunci="pusat" />

      <Legenda
        entri={[
          { warna: PRAPETA, teks: 'prapeta', putus: true },
          { warna: PETA, teks: 'peta' },
          { warna: ALAT, teks: 'pusat cermin' },
        ]}
      />
    </BidangTransformasi>
  )
}
