'use client'

import { useRef } from 'react'
import BidangVektor from './BidangVektor'
import Panah from './Panah'
import { angka, kurang, panjang, tahan, type Vek, jendelaTetap } from './geometri'
import { KERTAS, KOTAK, MONO, NISBAH, WARNA } from './gaya'
import { useSeretTitik } from './useSeret'

export const BATAS = { x: 6, y: 3.5 }

/** Panah acuan yang tidak bisa digeser, sebagai pembanding. */
export const ACUAN = { pangkal: { x: -5, y: -2 } as Vek, ujung: { x: -2, y: 0 } as Vek }

/** Selisih komponen yang masih dianggap sama, supaya pembulatan tidak menuduh. */
const TOLERANSI = 0.001

/**
 * Menilai hubungan panah coba terhadap panah acuan, sekaligus MENYEBUTKAN
 * alasannya. Jawaban "tidak sama" tanpa alasan tidak mengajarkan apa pun.
 */
export function nilaiHubungan(coba: Vek, acuan: Vek) {
  // Kalimatnya sengaja pendek, maksimal sekitar 45 huruf. Bidang gambar cuma
  // selebar 400 satuan, dan kalimat 62 huruf pada ukuran huruf 12 sudah
  // meluber keluar tepi SVG lalu terpotong tanpa peringatan apa pun.
  const samaX = Math.abs(coba.x - acuan.x) < TOLERANSI
  const samaY = Math.abs(coba.y - acuan.y) < TOLERANSI
  if (samaX && samaY) {
    return { jenis: 'sama' as const, kalimat: 'vektor yang SAMA walaupun letaknya berbeda' }
  }
  const lawanX = Math.abs(coba.x + acuan.x) < TOLERANSI
  const lawanY = Math.abs(coba.y + acuan.y) < TOLERANSI
  if (lawanX && lawanY) {
    return { jenis: 'lawan' as const, kalimat: 'vektor LAWAN: sama panjang, arah berkebalikan' }
  }
  const panjangSama = Math.abs(panjang(coba) - panjang(acuan)) < TOLERANSI
  if (panjangSama) {
    return { jenis: 'beda' as const, kalimat: 'sama panjang, tetapi arahnya berbeda' }
  }
  return { jenis: 'beda' as const, kalimat: 'vektor BERBEDA: komponennya tidak sama' }
}

/**
 * Widget Materi 02: satu panah acuan yang diam, satu panah yang boleh
 * dipindahkan ke mana saja. Yang dipegang bukan cuma ujungnya, tetapi juga
 * pangkalnya, supaya siswa bisa memindahkan seluruh panah tanpa mengubah
 * bentuknya dan melihat sendiri bahwa nilainya tidak berubah.
 */
export default function PanahBerpindah({
  pangkal,
  ujung,
  onUbah,
}: {
  pangkal: Vek
  ujung: Vek
  onUbah: (pangkal: Vek, ujung: Vek) => void
}) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const coba = kurang(ujung, pangkal)
  const acuan = kurang(ACUAN.ujung, ACUAN.pangkal)
  const nilai = nilaiHubungan(coba, acuan)

  const jendela = jendelaTetap(BATAS.x, BATAS.y, NISBAH)
  const pointer = useSeretTitik(jendela, svgRef, [pangkal, ujung], (i, t) => {
    if (i === 0) onUbah(tahan(t, BATAS.x, BATAS.y), ujung)
    else onUbah(pangkal, tahan(t, BATAS.x, BATAS.y))
  })

  const warnaNilai =
    nilai.jenis === 'sama' ? WARNA.samping : nilai.jenis === 'lawan' ? WARNA.sudut : WARNA.depan

  return (
    <BidangVektor
      jendela={jendela}
      aria={`Panah acuan dengan komponen ${angka(acuan.x, 1)} dan ${angka(acuan.y, 1)}, dibandingkan dengan panah yang bisa dipindah. Pangkal dan ujungnya sama-sama bisa ditarik.`}
      keterangan={`acuan (${angka(acuan.x, 1)}  ${angka(acuan.y, 1)})    coba (${angka(coba.x, 1)}  ${angka(coba.y, 1)})`}
      svgRef={svgRef}
      pointer={pointer}
      tandaSkala={false}
    >
      <Panah dari={ACUAN.pangkal} ke={ACUAN.ujung} jendela={jendela} warna={WARNA.redup}
             label="acuan" sisiLabel={-1} tebal={2.4} />

      <Panah dari={pangkal} ke={ujung} kunci="ujung" jendela={jendela} warna={warnaNilai}
             label="coba" sisiLabel={-1} tebal={2.8} pegangan />

      <text
        x={(KOTAK.x0 + KOTAK.x1) / 2} y={KOTAK.y1 - 6} textAnchor="middle"
        fontSize={12} fontFamily={MONO} fill={warnaNilai}
        stroke={KERTAS} strokeWidth={3.4} paintOrder="stroke"
      >
        {nilai.kalimat}
      </text>
    </BidangVektor>
  )
}
