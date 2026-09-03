'use client'

import { useRef } from 'react'
import BidangTransformasi from './BidangTransformasi'
import Legenda from './Legenda'
import { Bentuk, Pegangan } from './Bentuk'
import { Busur, RuasBerangka } from './Garis'
import { BENTUK_L, rotasi, type Titik } from './matriks'
import { angka, jendelaSeimbang, keLayar, tahan } from './papan'
import { ALAT, BANTU, KOTAK, NISBAH, PETA, PRAPETA } from './gaya'
import { useSeret } from './useSeret'

export const BATAS_PUSAT_PUTAR = { x: 5, y: 3 }

const JANGKAR: Titik[] = [
  { x: -5, y: -3.1 },
  { x: 7, y: 3.1 },
]

/**
 * Widget Materi 06: rotasi.
 *
 * BUSURNYA DIGAMBAR PADA SATU TITIK SAJA, YAITU B
 * Enam busur di satu gambar membuat pusatnya tertutup jaring-jaring lengkung
 * dan tak satu pun sudutnya terbaca. Satu busur sudah cukup menunjukkan
 * gagasannya, sebab keenam titik memang diputar sejauh sudut yang sama.
 *
 * Dipilih B, bukan A, sebab B adalah sudut yang paling jauh dari pusat bawaan,
 * sehingga jari-jari busurnya paling panjang dan sudutnya paling terbaca.
 * Pada sudut kecil, busur berjari-jari pendek nyaris tak terlihat.
 *
 * KEDUA JARI-JARINYA DIBERI ANGKA
 * Jarak B ke pusat dan jarak B aksen ke pusat selalu sama, dan kesamaan itulah
 * yang membedakan rotasi dari dilatasi di Materi 07. Angkanya ditulis supaya
 * siswa bisa memeriksanya, bukan mempercayainya.
 */
export default function PutarBentuk({
  derajat,
  pusat,
  onUbahPusat,
}: {
  derajat: number
  pusat: Titik
  onUbahPusat: (t: Titik) => void
}) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  const prapeta = BENTUK_L
  const peta = prapeta.map((t) => rotasi(t, derajat, pusat))

  const jendela = jendelaSeimbang([...JANGKAR, ...prapeta, ...peta, pusat], NISBAH, 0.08)
  const pointer = useSeret(jendela, svgRef, (t) =>
    onUbahPusat(tahan(t, BATAS_PUSAT_PUTAR.x, BATAS_PUSAT_PUTAR.y)),
  )

  const p = keLayar(jendela, KOTAK)

  const B = prapeta[1]
  const Bksen = peta[1]
  const jariB = Math.hypot(B.x - pusat.x, B.y - pusat.y)
  const sudutB = (Math.atan2(B.y - pusat.y, B.x - pusat.x) * 180) / Math.PI

  const diTitikAsal = pusat.x === 0 && pusat.y === 0

  return (
    <BidangTransformasi
      jendela={jendela}
      aria={`Bentuk huruf L diputar ${angka(derajat, 0)} derajat terhadap titik ${angka(pusat.x, 1)}, ${angka(pusat.y, 1)}. Pusat putarnya bisa ditarik.`}
      keterangan={`rotasi ${angka(derajat, 0)}° terhadap ${diTitikAsal ? 'titik asal' : `(${angka(pusat.x, 1)}, ${angka(pusat.y, 1)})`}`}
      svgRef={svgRef}
      pointer={pointer}
    >
      {/* Jari-jari ke B dan ke B aksen, keduanya diberi angka. */}
      <RuasBerangka dari={pusat} ke={B} p={p} warna={BANTU} desimal={2} sisi={1} />
      <RuasBerangka dari={pusat} ke={Bksen} p={p} warna={BANTU} desimal={2} sisi={-1} />

      <Busur
        pusat={pusat}
        jariMatematika={jariB * 0.62}
        dariDerajat={sudutB}
        keDerajat={sudutB + derajat}
        p={p}
        label={`${angka(derajat, 0)}°`}
      />

      <Bentuk titik={prapeta} p={p} warna={PRAPETA} isian={0.08} putus />
      <Bentuk titik={peta} p={p} warna={PETA} isian={0.14} petik="'" />

      <Pegangan titik={pusat} p={p} warna={ALAT} label={diTitikAsal ? 'O' : 'P'} />

      <Legenda
        entri={[
          { warna: PRAPETA, teks: 'prapeta', putus: true },
          { warna: PETA, teks: 'peta' },
          { warna: ALAT, teks: 'pusat putar' },
        ]}
      />
    </BidangTransformasi>
  )
}
