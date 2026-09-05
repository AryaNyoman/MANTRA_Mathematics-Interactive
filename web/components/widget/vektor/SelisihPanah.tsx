'use client'

import { useRef } from 'react'
import BidangVektor from './BidangVektor'
import Legenda from './Legenda'
import Panah from './Panah'
import { angka, kali, kurang, type Vek, tahanBersama, jendelaTetap } from './geometri'
import { NISBAH, WARNA } from './gaya'
import { useSeretTitik } from './useSeret'

export const BATAS = { x: 5.5, y: 3.2 }

/**
 * Widget Materi 08: mengurangi vektor.
 *
 * Dua gambaran ditampilkan sekaligus, sebab keduanya benar dan siswa perlu
 * melihat bahwa keduanya panah yang sama:
 *
 * 1. a dikurangi b adalah a ditambah lawan b, digambar dari titik asal.
 * 2. a dikurangi b adalah perjalanan DARI ujung b MENUJU ujung a.
 *
 * Gambaran kedua itulah yang menjelaskan kenapa vektor dari A ke B dicari
 * dengan posisi B dikurangi posisi A, dan bukan sebaliknya.
 */
export default function SelisihPanah({
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
  const selisih = kurang(a, b)
  const lawanB = kali(-1, b)

  const jendela = jendelaTetap(BATAS.x, BATAS.y, NISBAH)
  const pointer = useSeretTitik(jendela, svgRef, [a, b], (i, t) => {
    // Selisih a - b digambar juga, jadi a ditahan bersama -b dan b bersama -a
    // supaya selisihnya tetap di kotak.
    if (i === 0) onUbah(tahanBersama(t, { x: -b.x, y: -b.y }, BATAS.x, BATAS.y), b)
    else onUbah(a, tahanBersama(t, { x: -a.x, y: -a.y }, BATAS.x, BATAS.y))
  })

  return (
    <BidangVektor
      jendela={jendela}
      aria={`Vektor a dikurangi b. a sama dengan ${angka(a.x, 1)} dan ${angka(a.y, 1)}, b sama dengan ${angka(b.x, 1)} dan ${angka(b.y, 1)}. Kedua ujungnya bisa ditarik.`}
      keterangan={`a - b = (${angka(selisih.x, 1)}  ${angka(selisih.y, 1)})`}
      svgRef={svgRef}
      pointer={pointer}
      tandaSkala={false}
    >
      <Panah dari={asal} ke={lawanB} jendela={jendela} warna={WARNA.depan} tebal={2}
             putus opasitas={0.75} />

      {/* panah selisih digambar dua kali: dari titik asal, dan dari ujung b */}
      <Panah dari={b} ke={a} jendela={jendela} warna={WARNA.sudut} tebal={2.6} />
      <Panah dari={asal} ke={selisih} jendela={jendela} warna={WARNA.sudut} tebal={3} />

      <Panah dari={asal} ke={a} kunci="a" jendela={jendela} warna={WARNA.samping} tebal={2.6} pegangan />
      <Panah dari={asal} ke={b} kunci="b" jendela={jendela} warna={WARNA.depan} tebal={2.6} pegangan />

      <Legenda
        sudut="kanan-bawah"
        entri={[
          { warna: WARNA.samping, teks: 'a' },
          { warna: WARNA.depan, teks: 'b' },
          { warna: WARNA.depan, teks: 'lawan b', putus: true },
          { warna: WARNA.sudut, teks: 'a - b, dari ujung b ke ujung a' },
        ]}
      />
    </BidangVektor>
  )
}
