'use client'

import BidangTransformasi from './BidangTransformasi'
import Legenda from './Legenda'
import { Bentuk, Penghubung } from './Bentuk'
import { BENTUK_L, kenakanTransformasi, namaTransformasi, type Titik, type Transformasi } from './matriks'
import { jendelaSeimbang, keLayar } from './papan'
import { BANTU, KOTAK, NISBAH, PETA, PRAPETA } from './gaya'

/**
 * Jendela paling kecil yang dipertahankan, supaya gambarnya tidak melompat
 * ukuran setiap kali siswa berganti pilihan transformasi.
 *
 * Angkanya bukan tebakan. Ini kotak terkecil yang memuat kelima pilihan di
 * `PILIHAN_MATERI_1` sekaligus: translasi mendorong bentuknya sampai x = 10,
 * cermin sumbu Y sampai x = -6, rotasi 90 derajat sampai y = 6, dan cermin
 * sumbu X sampai y = -3.
 *
 * Jangkar yang lebih longgar (dicoba lebih dulu dengan x dan y sebesar 7 dan
 * 4,3) membuat jendelanya selebar 19 satuan, dan bentuknya tinggal seperempat
 * lebar layar padahal ruangnya tidak terpakai. Jangkar yang lebih ketat
 * daripada ini membuat gambarnya melompat ukuran tiap kali pilihannya
 * berganti, dan lompatan itu membuat kelima pilihan sulit dibandingkan.
 */
const JANGKAR: Titik[] = [
  { x: -6.5, y: -3.5 },
  { x: 10, y: 6 },
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
        entri={[
          { warna: PRAPETA, teks: 'prapeta', putus: true },
          { warna: PETA, teks: 'peta' },
          { warna: BANTU, teks: 'pasangannya', putus: true },
        ]}
      />
    </BidangTransformasi>
  )
}
