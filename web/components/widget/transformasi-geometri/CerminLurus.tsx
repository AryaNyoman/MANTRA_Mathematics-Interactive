'use client'

import { useRef } from 'react'
import BidangTransformasi from './BidangTransformasi'
import Legenda from './Legenda'
import { Bentuk, Pegangan } from './Bentuk'
import { GarisCermin, RuasBerangka } from './Garis'
import { BENTUK_L, cerminGarisDatar, cerminGarisTegak, type Titik } from './matriks'
import { angka, jendelaSeimbang, keLayar } from './papan'
import { ALAT, BANTU, KOTAK, NISBAH, PETA, PRAPETA } from './gaya'
import { useSeret } from './useSeret'

export const BATAS_CERMIN = 6

const JANGKAR: Titik[] = [
  { x: -6, y: -3.7 },
  { x: 7, y: 3.7 },
]

/**
 * Widget Materi 03: pencerminan pada garis tegak dan garis mendatar.
 *
 * Garis cerminnya bisa DIGESER, dan itu inti materinya: sumbu Y hanyalah garis
 * `x = k` dengan k bernilai nol. Siswa yang menggeser garisnya dari nol ke
 * lima melihat sendiri bahwa yang berubah cuma letak cerminnya, bukan
 * aturannya.
 *
 * KENAPA ANGKA JARAK HANYA DI TITIK A
 * Enam titik sudut kali dua potongan berarti dua belas angka di satu gambar,
 * dan pada bidang selebar ini angka-angka itu saling bertindih sampai tak
 * terbaca. Garis tegak lurus tetap digambar untuk keenamnya, sebab yang perlu
 * terlihat pada keenamnya adalah ketegaklurusannya. Angkanya cukup pada satu
 * titik: begitu siswa memeriksa satu pasang dan menemukannya sama, ia akan
 * menerima yang lain.
 */
export default function CerminLurus({
  arah,
  nilai,
  onUbah,
}: {
  arah: 'tegak' | 'datar'
  nilai: number
  onUbah: (n: number) => void
}) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  const tegak = arah === 'tegak'
  const prapeta = BENTUK_L
  const peta = prapeta.map((t) => (tegak ? cerminGarisTegak(t, nilai) : cerminGarisDatar(t, nilai)))

  const jendela = jendelaSeimbang([...JANGKAR, ...prapeta, ...peta], NISBAH, 0.06)

  // Yang diseret garis cerminnya. Untuk garis tegak hanya nilai x jari yang
  // dipakai, untuk garis mendatar hanya nilai y-nya.
  const pointer = useSeret(jendela, svgRef, (t) => {
    const mentah = tegak ? t.x : t.y
    const jepit = Math.min(BATAS_CERMIN, Math.max(-BATAS_CERMIN, mentah))
    onUbah(Math.round(jepit * 2) / 2)
  })

  const p = keLayar(jendela, KOTAK)

  const A = prapeta[0]
  const Aksen = peta[0]
  /** kaki tegak lurus dari A ke garis cerminnya */
  const kaki: Titik = tegak ? { x: nilai, y: A.y } : { x: A.x, y: nilai }
  const pegangan: Titik = tegak ? { x: nilai, y: jendela.yMin + (jendela.yMax - jendela.yMin) * 0.18 }
    : { x: jendela.xMin + (jendela.xMax - jendela.xMin) * 0.82, y: nilai }

  const namaGaris = nilai === 0
    ? (tegak ? 'sumbu Y' : 'sumbu X')
    : `${tegak ? 'x' : 'y'} = ${angka(nilai, 1)}`

  return (
    <BidangTransformasi
      jendela={jendela}
      aria={`Bentuk huruf L dicerminkan pada garis ${namaGaris}. Garis cerminnya bisa ditarik.`}
      keterangan={`cermin pada ${namaGaris}`}
      svgRef={svgRef}
      pointer={pointer}
    >
      {/* Garis tegak lurus untuk keenam titik, tanpa angka. */}
      {prapeta.map((t, i) => (
        <RuasBerangka
          key={`tl${i}`}
          dari={t}
          ke={peta[i]}
          p={p}
          warna={BANTU}
          tampilkanAngka={false}
        />
      ))}

      <GarisCermin
        arah={tegak ? { jenis: 'tegak', nilai } : { jenis: 'datar', nilai }}
        jendela={jendela}
        p={p}
        label={namaGaris}
      />

      <Bentuk titik={prapeta} p={p} warna={PRAPETA} isian={0.08} putus />
      <Bentuk titik={peta} p={p} warna={PETA} isian={0.14} petik="'" />

      {/* Kedua potongan pada titik A, dengan angkanya, supaya kesamaan
          jaraknya bisa DIPERIKSA siswa dan bukan cuma dipercaya. */}
      <RuasBerangka dari={A} ke={kaki} p={p} warna={ALAT} sisi={1} />
      <RuasBerangka dari={kaki} ke={Aksen} p={p} warna={ALAT} sisi={-1} />

      <Pegangan titik={pegangan} p={p} warna={ALAT} kunci="cermin" />

      <Legenda
        entri={[
          { warna: PRAPETA, teks: 'prapeta', putus: true },
          { warna: PETA, teks: 'peta' },
          { warna: ALAT, teks: 'garis cermin', putus: true },
        ]}
      />
    </BidangTransformasi>
  )
}
