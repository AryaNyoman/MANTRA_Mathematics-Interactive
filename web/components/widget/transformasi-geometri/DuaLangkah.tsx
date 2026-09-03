'use client'

import BidangTransformasi from './BidangTransformasi'
import Legenda from './Legenda'
import { Bentuk } from './Bentuk'
import {
  BENTUK_L, kenakanTransformasi, namaTransformasi,
  type Titik, type Transformasi,
} from './matriks'
import { jendelaSeimbang, keLayar } from './papan'
import { GESER, KOTAK, NISBAH, PETA, PRAPETA } from './gaya'

const JANGKAR: Titik[] = [
  { x: -6, y: -3.7 },
  { x: 7, y: 3.7 },
]

/**
 * Widget Materi 11 dan 12: dua transformasi berurutan.
 *
 * TIGA BENTUK DI SATU GAMBAR, DAN KETIGANYA MEMANG PERLU
 * Prapeta, hasil langkah pertama, dan hasil akhir. Menghilangkan yang tengah
 * membuat komposisi terlihat seperti satu transformasi ajaib yang hasilnya
 * harus dipercaya. Dengan hasil antaranya tergambar, siswa bisa menunjuk dua
 * lompatan terpisah dan memeriksa masing-masing.
 *
 * KENAPA HASIL URUTAN TERBALIK JUGA DITAMPILKAN
 * Kalimat "urutan menentukan hasil" tidak berarti apa-apa kalau siswa hanya
 * melihat satu urutan. Yang meyakinkan adalah dua bentuk berbeda di layar yang
 * sama, dari dua transformasi yang sama persis, hanya berbeda urutannya.
 *
 * Bisa dimatikan lewat `tampilkanTerbalik` supaya Materi 11 memulai dengan
 * gambar yang sederhana, dan Materi 12 menyalakannya saat perbandingan itu
 * yang jadi pokok bahasan.
 */
export default function DuaLangkah({
  t1,
  t2,
  tampilkanTerbalik = false,
}: {
  t1: Transformasi
  t2: Transformasi
  tampilkanTerbalik?: boolean
}) {
  const prapeta = BENTUK_L
  const antara = prapeta.map((t) => kenakanTransformasi(t1, t))
  const akhir = antara.map((t) => kenakanTransformasi(t2, t))
  const terbalik = prapeta
    .map((t) => kenakanTransformasi(t2, t))
    .map((t) => kenakanTransformasi(t1, t))

  const semua = tampilkanTerbalik
    ? [...prapeta, ...antara, ...akhir, ...terbalik]
    : [...prapeta, ...antara, ...akhir]

  const jendela = jendelaSeimbang([...JANGKAR, ...semua], NISBAH, 0.06)
  const p = keLayar(jendela, KOTAK)

  return (
    <BidangTransformasi
      jendela={jendela}
      aria={`Bentuk huruf L dikenai ${namaTransformasi(t1)} lalu ${namaTransformasi(t2)}. Hasil antaranya ikut digambar.`}
      keterangan={`${namaTransformasi(t1)}, lalu ${namaTransformasi(t2)}`}
    >
      <Bentuk titik={prapeta} p={p} warna={PRAPETA} isian={0.06} putus labelSudut={false} />

      {/* Hasil langkah pertama, sengaja paling samar: ia cuma persinggahan. */}
      <Bentuk
        titik={antara} p={p} warna={PRAPETA} isian={0} tebal={1.4} putus labelSudut={false}
      />

      <Bentuk titik={akhir} p={p} warna={PETA} isian={0.14} petik="'" />

      {tampilkanTerbalik && (
        <Bentuk
          titik={terbalik} p={p} warna={GESER} isian={0.1} tebal={2}
          tulisSudut={(nama) => `${nama}"`}
        />
      )}

      <Legenda
        entri={
          tampilkanTerbalik
            ? [
                { warna: PRAPETA, teks: 'prapeta', putus: true },
                { warna: PETA, teks: 'urutan 1 lalu 2' },
                { warna: GESER, teks: 'urutan dibalik' },
              ]
            : [
                { warna: PRAPETA, teks: 'prapeta dan hasil 1', putus: true },
                { warna: PETA, teks: 'hasil akhir' },
              ]
        }
      />
    </BidangTransformasi>
  )
}
