'use client'

import BidangTransformasi from './BidangTransformasi'
import Legenda from './Legenda'
import { Bentuk } from './Bentuk'
import { Panah } from './Garis'
import {
  BENTUK_L, kenakanTransformasi, matriksDari, namaTransformasi,
  type Titik, type Transformasi,
} from './matriks'
import { angka, jendelaSeimbang, keLayar } from './papan'
import { GESER, KERTAS, KOTAK, MONO, NISBAH, PETA, PRAPETA, WARNA } from './gaya'

const JANGKAR: Titik[] = [
  { x: -6, y: -3.7 },
  { x: 7, y: 3.7 },
]

/**
 * Widget Materi 10: mencocokkan transformasi dengan matriksnya.
 *
 * KEDUA PANAH KOLOM TETAP DIGAMBAR DI SINI
 * Materi 09 mengajarkan bahwa kolom sebuah matriks adalah tempat mendaratnya
 * (1, 0) dan (0, 1). Kalau widget ini hanya menampilkan bentuk L dan matriksnya
 * di tabel, hubungan itu putus, dan matriksnya kembali terasa seperti empat
 * angka hafalan. Dengan kedua panahnya tetap tergambar, siswa bisa membaca
 * matriksnya LANGSUNG DARI GAMBAR sebelum melihat tabelnya.
 *
 * TRANSLASI SENGAJA MASUK DAFTAR PILIHAN
 * Kalau translasi dikeluarkan dari daftar, kalimat "translasi tidak punya
 * matriks 2x2" tidak pernah diuji siswa. Dengan translasi ada di daftar dan
 * layarnya berkata terus terang bahwa matriksnya tidak ada, kalimat itu jadi
 * hal yang dilihat, bukan yang dihafal.
 */
export default function CocokkanMatriks({ transformasi }: { transformasi: Transformasi }) {
  const asal: Titik = { x: 0, y: 0 }
  const prapeta = BENTUK_L
  const peta = prapeta.map((t) => kenakanTransformasi(transformasi, t))
  const m = matriksDari(transformasi)

  const kolom1 = kenakanTransformasi(transformasi, { x: 1, y: 0 })
  const kolom2 = kenakanTransformasi(transformasi, { x: 0, y: 1 })

  const jendela = jendelaSeimbang([...JANGKAR, ...prapeta, ...peta], NISBAH, 0.06)
  const p = keLayar(jendela, KOTAK)

  return (
    <BidangTransformasi
      jendela={jendela}
      aria={`Bentuk huruf L dikenai ${namaTransformasi(transformasi)}. Kedua panah menunjukkan ke mana titik (1, 0) dan (0, 1) berpindah.`}
      keterangan={namaTransformasi(transformasi)}
    >
      <Bentuk titik={prapeta} p={p} warna={PRAPETA} isian={0.06} putus labelSudut={false} />
      <Bentuk titik={peta} p={p} warna={PETA} isian={0.12} petik="'" labelSudut={false} />

      <Panah dari={asal} ke={kolom1} p={p} warna={PETA} tebal={2.8} />
      <Panah dari={asal} ke={kolom2} p={p} warna={GESER} tebal={2.8} />

      {m === null && (
        <text
          x={(KOTAK.x0 + KOTAK.x1) / 2} y={KOTAK.y0 + 22} textAnchor="middle"
          fontSize={11.5} fontWeight={600} fill={WARNA.depan} fontFamily={MONO}
          stroke={KERTAS} strokeWidth={3} paintOrder="stroke"
        >
          transformasi ini TIDAK punya matriks 2x2 pengali
        </text>
      )}

      <text
        x={p.x(kolom1.x) + 9} y={p.y(kolom1.y) - 7}
        fontSize={10.5} fontWeight={600} fill={PETA} fontFamily={MONO}
        stroke={KERTAS} strokeWidth={2.8} paintOrder="stroke"
      >
        ({angka(kolom1.x, 1)}, {angka(kolom1.y, 1)})
      </text>
      <text
        x={p.x(kolom2.x) + 9} y={p.y(kolom2.y) - 7}
        fontSize={10.5} fontWeight={600} fill={GESER} fontFamily={MONO}
        stroke={KERTAS} strokeWidth={2.8} paintOrder="stroke"
      >
        ({angka(kolom2.x, 1)}, {angka(kolom2.y, 1)})
      </text>

      <Legenda
        entri={[
          { warna: PRAPETA, teks: 'prapeta', putus: true },
          { warna: PETA, teks: 'peta dan kolom 1' },
          { warna: GESER, teks: 'kolom 2' },
        ]}
      />
    </BidangTransformasi>
  )
}
