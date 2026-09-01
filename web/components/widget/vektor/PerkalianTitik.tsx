'use client'

import { useRef } from 'react'
import BidangVektor from './BidangVektor'
import Legenda from './Legenda'
import Panah from './Panah'
import { busurAntara } from './bentuk'
import { angka, jendelaSeimbang, sudutAntara, tahan, titik, type Vek } from './geometri'
import { KERTAS, KOTAK, MONO, NISBAH, WARNA } from './gaya'
import { useSeretTitik } from './useSeret'

export const BATAS = { x: 5.5, y: 3.2 }

const JANGKAR: Vek[] = [
  { x: -BATAS.x, y: -BATAS.y },
  { x: BATAS.x, y: BATAS.y },
]

/**
 * Di bawah nilai ini, hasil kali titik ditampilkan sebagai nol bulat.
 *
 * Dua vektor yang siswa buat tegak lurus lewat seretan hampir tidak pernah
 * tepat 90 derajat, jadi hasilnya keluar sebagai 0,004 dan bukan 0. Angka
 * seperti itu MEMBANTAH kalimat "tegak lurus memberi nol" yang baru saja
 * dibaca di sebelahnya, dan siswa akan menyalahkan pemahamannya sendiri.
 */
const AMBANG_NOL = 0.005

/** Widget Materi 11: hasil kali titik dan sudut antara dua vektor. */
export default function PerkalianTitik({
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
  const jendela = jendelaSeimbang([...JANGKAR, a, b], NISBAH, 0.05)
  const pointer = useSeretTitik(jendela, svgRef, [a, b], (i, t) => {
    const p = tahan(t, BATAS.x, BATAS.y)
    if (i === 0) onUbah(p, b)
    else onUbah(a, p)
  })

  const hasil = titik(a, b)
  const nol = Math.abs(hasil) < AMBANG_NOL
  const sudut = sudutAntara(a, b)
  const busur = busurAntara(asal, a, b, jendela, KOTAK, 32)

  const warnaHasil = nol ? WARNA.redup : hasil > 0 ? WARNA.samping : WARNA.depan
  const kalimat = nol
    ? 'tegak lurus, hasilnya nol'
    : hasil > 0
      ? 'sudutnya lancip, hasilnya positif'
      : 'sudutnya tumpul, hasilnya negatif'

  return (
    <BidangVektor
      jendela={jendela}
      aria={`Hasil kali titik a dan b sama dengan ${angka(hasil, 2)}, sudut antara keduanya ${angka(sudut, 1)} derajat. Kedua ujungnya bisa ditarik.`}
      keterangan={`a . b = ${nol ? '0' : angka(hasil, 2)}`}
      svgRef={svgRef}
      pointer={pointer}
      tandaSkala={false}
    >
      {busur && <path d={busur} fill="none" stroke={WARNA.sudut} strokeWidth={1.8} />}

      <Panah dari={asal} ke={a} jendela={jendela} warna={WARNA.samping} tebal={2.8} pegangan />
      <Panah dari={asal} ke={b} jendela={jendela} warna={WARNA.depan} tebal={2.8} pegangan />

      <text
        x={(KOTAK.x0 + KOTAK.x1) / 2} y={KOTAK.y0 + 15} textAnchor="middle"
        fontSize={12} fontFamily={MONO} fill={warnaHasil}
        stroke={KERTAS} strokeWidth={3.4} paintOrder="stroke"
      >
        {angka(sudut, 1)}°, {kalimat}
      </text>

      <Legenda
        sudut="kanan-bawah"
        entri={[
          { warna: WARNA.samping, teks: 'a' },
          { warna: WARNA.depan, teks: 'b' },
          { warna: WARNA.sudut, teks: 'sudut antara keduanya' },
        ]}
      />
    </BidangVektor>
  )
}
