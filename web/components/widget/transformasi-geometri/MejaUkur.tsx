'use client'

import BidangTransformasi from './BidangTransformasi'
import Legenda from './Legenda'
import { Bentuk } from './Bentuk'
import { Busur } from './Garis'
import {
  BENTUK_L, kenakanTransformasi, namaTransformasi, sudutDi,
  type Titik, type Transformasi,
} from './matriks'
import { angka, jendelaSeimbang, keLayar } from './papan'
import { ALAT, KOTAK, NISBAH, PETA, PRAPETA } from './gaya'

const JANGKAR: Titik[] = [
  { x: -7, y: -4.3 },
  { x: 8, y: 4.3 },
]

/** Sudut ruas dari `dari` ke `ke`, dalam derajat. */
const arah = (dari: Titik, ke: Titik) =>
  (Math.atan2(ke.y - dari.y, ke.x - dari.x) * 180) / Math.PI

/**
 * Busur sudut di titik B, antara ruas BA dan ruas BC.
 *
 * Selisih sudutnya dinormalkan ke rentang -180 sampai 180 supaya busurnya
 * selalu menempuh jalan yang PENDEK. Tanpa itu, sebuah sudut 90 derajat bisa
 * tergambar sebagai busur 270 derajat yang melingkari titiknya, dan siswa
 * membaca angka yang berbeda dari gambar yang dilihatnya.
 */
function SudutDiB({
  titik,
  p,
  warna,
  jari,
}: {
  titik: Titik[]
  p: import('./papan').Pemeta
  warna: string
  jari: number
}) {
  const A = titik[0]
  const B = titik[1]
  const C = titik[2]
  const a1 = arah(B, A)
  let beda = arah(B, C) - a1
  while (beda > 180) beda -= 360
  while (beda < -180) beda += 360

  return (
    <Busur
      pusat={B}
      jariMatematika={jari}
      dariDerajat={a1}
      keDerajat={a1 + beda}
      p={p}
      warna={warna}
      label={`${angka(sudutDi(A, B, C), 0)}°`}
    />
  )
}

/**
 * Widget Materi 08: apa yang tetap dan apa yang berubah.
 *
 * TUGASNYA MEMBANDINGKAN, BUKAN MENGHITUNG
 * Sisi AB digambar tebal pada kedua bentuk, dan sudut di B diberi busur pada
 * keduanya. Dua hal itu yang dibandingkan siswa langsung dari gambar, tanpa
 * membaca satu angka pun: panjangnya berubah atau tidak, sudutnya berubah
 * atau tidak. Angka lengkapnya ada di tabel angkanya, untuk yang ingin
 * memeriksa.
 *
 * PILIHAN "DILATASI -2" WAJIB ADA DI DAFTARNYA
 * Itu satu-satunya pilihan yang membantah dugaan yang paling sering: bahwa
 * faktor negatif membalik arah putar. Determinannya k kuadrat, selalu
 * positif, jadi arah putarnya TETAP. Tanpa pilihan itu di layar, pernyataan
 * di tabel Materi 08 cuma klaim yang harus dipercaya siswa.
 */
export default function MejaUkur({ transformasi }: { transformasi: Transformasi }) {
  const prapeta = BENTUK_L
  const peta = prapeta.map((t) => kenakanTransformasi(transformasi, t))

  const jendela = jendelaSeimbang([...JANGKAR, ...prapeta, ...peta], NISBAH, 0.06)
  const p = keLayar(jendela, KOTAK)

  const sisi = (t: Titik[], warna: string, key: string) => (
    <line
      key={key}
      x1={p.x(t[0].x)} y1={p.y(t[0].y)} x2={p.x(t[1].x)} y2={p.y(t[1].y)}
      stroke={warna} strokeWidth={4.5} strokeLinecap="round" opacity={0.85}
    />
  )

  // Jari-jari busur dibuat sebanding dengan panjang AB bentuknya sendiri,
  // supaya pada peta yang mengecil busurnya ikut mengecil dan tidak menutupi
  // seluruh bentuknya.
  const jari = (t: Titik[]) => Math.hypot(t[1].x - t[0].x, t[1].y - t[0].y) * 0.28

  return (
    <BidangTransformasi
      jendela={jendela}
      aria={`Bentuk huruf L dan petanya oleh ${namaTransformasi(transformasi)}. Sisi AB dan sudut di B ditandai pada keduanya untuk dibandingkan.`}
      keterangan={namaTransformasi(transformasi)}
    >
      <Bentuk titik={prapeta} p={p} warna={PRAPETA} isian={0.08} putus />
      <Bentuk titik={peta} p={p} warna={PETA} isian={0.14} petik="'" />

      {sisi(prapeta, PRAPETA, 'ab-prapeta')}
      {sisi(peta, PETA, 'ab-peta')}

      <SudutDiB titik={prapeta} p={p} warna={ALAT} jari={jari(prapeta)} />
      <SudutDiB titik={peta} p={p} warna={ALAT} jari={jari(peta)} />

      <Legenda
        entri={[
          { warna: PRAPETA, teks: 'prapeta', putus: true },
          { warna: PETA, teks: 'peta' },
          { warna: ALAT, teks: 'sudut di B' },
        ]}
      />
    </BidangTransformasi>
  )
}
