'use client'

import BidangTransformasi from './BidangTransformasi'
import Legenda from './Legenda'
import { Bentuk, Penghubung } from './Bentuk'
import { BENTUK_L, kenakanTransformasi, namaTransformasi, type Titik, type Transformasi } from './matriks'
import { jendelaSeimbang, keLayar } from './papan'
import { BANTU, KOTAK, NISBAH, PETA, PRAPETA } from './gaya'

/**
 * Jendela paling kecil yang dipertahankan, supaya gambarnya tidak melompat
 * ukuran setiap kali siswa berganti pilihan transformasi. Nisbahnya dibuat
 * sama dengan nisbah papan, jadi jangkar ini tidak ikut melebarkan apa pun.
 */
const JANGKAR: Titik[] = [
  { x: -7, y: -4.3 },
  { x: 7, y: 4.3 },
]

/**
 * Widget Materi 01: setiap titik ikut pindah.
 *
 * INI SATU-SATUNYA WIDGET YANG TUGASNYA BUKAN MENGAJARKAN SEBUAH RUMUS.
 * Tugasnya meruntuhkan satu dugaan: bahwa yang dipindahkan oleh sebuah
 * transformasi adalah gambarnya. Karena itu garis penghubung dari tiap titik
 * ke pasangannya adalah isi utama gambar ini, bukan hiasan. Tanpa garis-garis
 * itu siswa melihat sebuah gambar berpindah; dengan garis-garis itu ia melihat
 * enam titik yang masing-masing punya tujuan sendiri.
 *
 * Pilihan transformasinya ada di panel kendali, bukan di dalam sini, mengikuti
 * pola widget topik lain: keadaan dipegang panggung supaya tidak hilang saat
 * siswa berpindah materi lalu kembali.
 */
export default function PapanBebas({ transformasi }: { transformasi: Transformasi }) {
  const prapeta = BENTUK_L
  const peta = prapeta.map((t) => kenakanTransformasi(transformasi, t))

  const jendela = jendelaSeimbang([...JANGKAR, ...prapeta, ...peta], NISBAH, 0.06)
  const p = keLayar(jendela, KOTAK)

  return (
    <BidangTransformasi
      jendela={jendela}
      aria={`Bentuk huruf L dan petanya oleh ${namaTransformasi(transformasi)}. Garis putus-putus menghubungkan tiap titik sudut ke pasangannya.`}
      keterangan={namaTransformasi(transformasi)}
    >
      <Penghubung prapeta={prapeta} peta={peta} p={p} />
      <Bentuk titik={prapeta} p={p} warna={PRAPETA} isian={0.08} putus />
      <Bentuk titik={peta} p={p} warna={PETA} isian={0.14} petik="'" />

      <Legenda
        sudut="kanan-atas"
        entri={[
          { warna: PRAPETA, teks: 'prapeta, bentuk asal', putus: true },
          { warna: PETA, teks: 'peta, hasilnya' },
          { warna: BANTU, teks: 'tiap titik ke pasangannya', putus: true },
        ]}
      />
    </BidangTransformasi>
  )
}
