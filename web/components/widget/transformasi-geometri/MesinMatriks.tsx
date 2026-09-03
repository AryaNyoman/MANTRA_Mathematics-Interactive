'use client'

import BidangTransformasi from './BidangTransformasi'
import Legenda from './Legenda'
import { Panah } from './Garis'
import { determinan, kenakan, type Matriks, type Titik } from './matriks'
import { angka, jendelaSeimbang, keLayar } from './papan'
import { GESER, KERTAS, KOTAK, MONO, NISBAH, PETA, PRAPETA, WARNA } from './gaya'

const JANGKAR: Titik[] = [
  { x: -3, y: -1.85 },
  { x: 3, y: 1.85 },
]

const PERSEGI_SATUAN: Titik[] = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
]

/**
 * Widget Materi 09: mesin matriks.
 *
 * YANG DIGAMBAR PERSEGI SATUAN, BUKAN HURUF L
 * Ini satu-satunya widget di topik ini yang tidak memakai bentuk L, dan itu
 * disengaja. Yang sedang diajarkan bukan akibat sebuah transformasi pada
 * sebuah benda, melainkan CARA MEMBACA empat angka di dalam matriks.
 *
 * Cara membacanya: kolom pertama matriks adalah tempat mendaratnya titik
 * (1, 0), dan kolom kedua tempat mendaratnya (0, 1). Kedua titik itu adalah
 * dua sisi persegi satuan, jadi persegi satuanlah gambar yang membuat aturan
 * itu terlihat langsung. Huruf L hanya akan menyembunyikannya di balik empat
 * sudut lain yang tidak ada hubungannya.
 *
 * Kedua panah kolom diberi warna berbeda dan diberi nama, sehingga siswa bisa
 * mengubah satu angka di panel kendali lalu melihat panah MANA yang bergerak.
 * Itu hubungan sebab akibat yang paling langsung yang bisa diberikan gambar.
 */
export default function MesinMatriks({ m }: { m: Matriks }) {
  const asal: Titik = { x: 0, y: 0 }
  const kolom1 = kenakan(m, { x: 1, y: 0 })
  const kolom2 = kenakan(m, { x: 0, y: 1 })
  const peta = PERSEGI_SATUAN.map((t) => kenakan(m, t))
  const det = determinan(m)

  const jendela = jendelaSeimbang([...JANGKAR, ...PERSEGI_SATUAN, ...peta], NISBAH, 0.1)
  const p = keLayar(jendela, KOTAK)

  const jalur = (titik: Titik[]) => titik.map((t) => `${p.x(t.x)},${p.y(t.y)}`).join(' ')

  return (
    <BidangTransformasi
      jendela={jendela}
      aria={`Persegi satuan dikenai matriks dengan baris pertama ${angka(m.a, 2)} dan ${angka(m.b, 2)}, baris kedua ${angka(m.c, 2)} dan ${angka(m.d, 2)}.`}
      keterangan={`determinan ${angka(det, 2)}, jadi luasnya ${angka(Math.abs(det), 2)} kali`}
    >
      <polygon
        points={jalur(PERSEGI_SATUAN)}
        fill={PRAPETA} fillOpacity={0.07}
        stroke={PRAPETA} strokeWidth={1.6} strokeDasharray="5 4"
      />
      <polygon
        points={jalur(peta)}
        fill={PETA} fillOpacity={0.14}
        stroke={PETA} strokeWidth={2.2} strokeLinejoin="round"
      />

      {/* Kedua panah kolom. Inilah isi matriksnya, digambar. */}
      <Panah dari={asal} ke={kolom1} p={p} warna={PETA} tebal={2.8} />
      <Panah dari={asal} ke={kolom2} p={p} warna={GESER} tebal={2.8} />

      <text
        x={p.x(kolom1.x) + 9} y={p.y(kolom1.y) - 7}
        fontSize={10.5} fontWeight={600} fill={PETA} fontFamily={MONO}
        stroke={KERTAS} strokeWidth={2.8} paintOrder="stroke"
      >
        ({angka(kolom1.x, 2)}, {angka(kolom1.y, 2)})
      </text>
      <text
        x={p.x(kolom2.x) + 9} y={p.y(kolom2.y) - 7}
        fontSize={10.5} fontWeight={600} fill={GESER} fontFamily={MONO}
        stroke={KERTAS} strokeWidth={2.8} paintOrder="stroke"
      >
        ({angka(kolom2.x, 2)}, {angka(kolom2.y, 2)})
      </text>

      {Math.abs(det) < 1e-9 && (
        <text
          x={(KOTAK.x0 + KOTAK.x1) / 2} y={KOTAK.y0 + 22} textAnchor="middle"
          fontSize={11} fontWeight={600} fill={WARNA.depan} fontFamily={MONO}
          stroke={KERTAS} strokeWidth={3} paintOrder="stroke"
        >
          kedua panahnya segaris, perseginya runtuh jadi ruas
        </text>
      )}

      <Legenda
        entri={[
          { warna: PRAPETA, teks: 'persegi satuan', putus: true },
          { warna: PETA, teks: 'kolom 1' },
          { warna: GESER, teks: 'kolom 2' },
        ]}
      />
    </BidangTransformasi>
  )
}
