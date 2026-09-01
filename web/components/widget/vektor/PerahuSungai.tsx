'use client'

import { useRef } from 'react'
import BidangVektor from './BidangVektor'
import Panah from './Panah'
import Legenda from './Legenda'
import { angka, jendelaSeimbang, keLayar, tahan, tambah, type Vek } from './geometri'
import { KERTAS, KOTAK, MONO, NISBAH, WARNA } from './gaya'
import { useSeretTitik } from './useSeret'

/** Lebar sungai dalam kilometer. Tepi seberang ada di garis ini. */
export const LEBAR_SUNGAI = 3

export const BATAS = { x: 5, y: 4.5 }

const JANGKAR: Vek[] = [
  { x: -BATAS.x, y: -1.2 },
  { x: BATAS.x, y: BATAS.y },
]

/**
 * Berapa lama menyeberang dan sejauh mana hanyut ke hilir.
 *
 * Dikembalikan sebagai `null` kalau perahunya TIDAK PERNAH sampai. Itu bukan
 * keadaan mustahil yang perlu disembunyikan: kalau siswa mengarahkan dayungnya
 * ke hilir sampai gerak tegaknya nol, perahunya memang hanya terbawa arus. Yang
 * salah justru kalau widget tetap memaksa memberi angka.
 */
export function hasilSeberang(gerak: Vek) {
  if (gerak.y <= 0) return null
  const waktu = LEBAR_SUNGAI / gerak.y
  return { waktu, hanyut: gerak.x * waktu }
}

/**
 * Widget Materi 01: perahu menyeberang sungai berarus.
 *
 * Kedua panah adalah PERPINDAHAN DALAM SATU JAM, bukan kecepatan yang digambar
 * di bidang jarak. Dua besaran berbeda satuan pada satu gambar akan menipu
 * mata, dan di materi pembuka justru itu yang paling merusak.
 */
export default function PerahuSungai({
  dayung,
  arus,
  onUbah,
}: {
  dayung: Vek
  arus: Vek
  onUbah: (dayung: Vek, arus: Vek) => void
}) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const asal: Vek = { x: 0, y: 0 }
  const gerak = tambah(dayung, arus)
  const hasil = hasilSeberang(gerak)
  const mendarat: Vek | null = hasil ? { x: hasil.hanyut, y: LEBAR_SUNGAI } : null

  const jendela = jendelaSeimbang(
    [...JANGKAR, dayung, arus, gerak, ...(mendarat ? [mendarat] : [])],
    NISBAH,
    0.05,
  )
  const pointer = useSeretTitik(jendela, svgRef, [dayung, arus], (i, t) => {
    if (i === 0) onUbah(tahan(t, BATAS.x, BATAS.y), arus)
    // Arus mengalir sepanjang sungai, jadi ia tidak punya bagian tegak.
    // Menguncinya di nol lebih jujur daripada membiarkan siswa membuat arus
    // yang menyeberangi sungainya sendiri.
    else onUbah(dayung, { ...tahan({ x: t.x, y: 0 }, BATAS.x, 0), y: 0 })
  })

  const p = keLayar(jendela, KOTAK)
  const yDekat = p.y(0)
  const ySeberang = p.y(LEBAR_SUNGAI)

  // Label titik mendarat ditulis di tengah titiknya, tetapi begitu titiknya
  // mendekati tepi, tulisannya menjulur keluar SVG dan terpotong tanpa
  // peringatan. Karena itu jangkarnya berpindah ke ujung kanan atau kiri.
  const xLabelMendarat = mendarat ? p.x(mendarat.x) : 0
  const dekatKanan = xLabelMendarat > KOTAK.x1 - 70
  const dekatKiri = xLabelMendarat < KOTAK.x0 + 70
  const jangkarLabel = dekatKanan ? 'end' : dekatKiri ? 'start' : 'middle'
  const xLabelAman = dekatKanan ? KOTAK.x1 : dekatKiri ? KOTAK.x0 : xLabelMendarat

  return (
    <BidangVektor
      jendela={jendela}
      aria={`Perahu menyeberang sungai. Dayung ${angka(dayung.x, 1)} dan ${angka(dayung.y, 1)}, arus ${angka(arus.x, 1)}. Kedua ujung panah bisa ditarik.`}
      keterangan="jarak dalam kilometer, panah = perpindahan 1 jam"
      svgRef={svgRef}
      pointer={pointer}
    >
      {/* badan sungai, digambar paling belakang */}
      <rect
        x={KOTAK.x0} y={ySeberang} width={KOTAK.x1 - KOTAK.x0} height={yDekat - ySeberang}
        fill={WARNA.samping} opacity={0.07}
      />
      <line x1={KOTAK.x0} y1={ySeberang} x2={KOTAK.x1} y2={ySeberang}
            stroke={WARNA.samping} strokeWidth={2} opacity={0.5} />
      {/* Nama tepi ditempel di kiri, titik mendaratnya diberi label di bawah.
          Keduanya sempat berdesakan di kanan atas garis yang sama, dan begitu
          arusnya diperbesar labelnya pasti bertindih. */}
      <text x={KOTAK.x0 + 4} y={ySeberang - 6} textAnchor="start" fontSize={10}
            fontFamily={MONO} fill={WARNA.samping}
            stroke={KERTAS} strokeWidth={2.6} paintOrder="stroke">
        tepi seberang
      </text>

      {/* lintasan sesungguhnya, dan titik mendaratnya */}
      {mendarat && (
        <>
          <line
            x1={p.x(0)} y1={p.y(0)} x2={p.x(mendarat.x)} y2={p.y(mendarat.y)}
            stroke={WARNA.sudut} strokeWidth={1.6} strokeDasharray="6 5" opacity={0.85}
          />
          <circle cx={p.x(mendarat.x)} cy={p.y(mendarat.y)} r={4.5} fill={WARNA.sudut} />
          <text
            x={xLabelAman} y={p.y(mendarat.y) + 16} textAnchor={jangkarLabel}
            fontSize={11} fontFamily={MONO} fill={WARNA.sudut}
            stroke={KERTAS} strokeWidth={3} paintOrder="stroke"
          >
            mendarat di {angka(mendarat.x, 2)}
          </text>
        </>
      )}

      {/* Tanpa label di badan panah. Ketiganya berangkat dari satu titik dan
          bebas diseret siswa, jadi label yang menempel pasti saling menimpa
          pada suatu susunan. Namanya dipindah ke kotak keterangan di bawah. */}
      <Panah dari={asal} ke={dayung} jendela={jendela} warna={WARNA.samping} pegangan />
      <Panah dari={asal} ke={arus} jendela={jendela} warna={WARNA.depan} pegangan />
      <Panah dari={asal} ke={gerak} jendela={jendela} warna={WARNA.miring} tebal={2.8} />

      {/* Pojok kanan atas, bukan kiri bawah. Sumbu mendatar pada widget ini
          berada di bagian bawah bidang, jadi kotak di pojok bawah mana pun akan
          menutupi angka sumbunya. Sudah terbukti: angka "-4" sempat hilang. */}
      <Legenda
        sudut="kanan-atas"
        entri={[
          { warna: WARNA.samping, teks: 'dayung' },
          { warna: WARNA.depan, teks: 'arus' },
          { warna: WARNA.miring, teks: 'gerak nyata' },
          { warna: WARNA.sudut, teks: 'lintasan perahu', putus: true },
        ]}
      />

      {!mendarat && (
        <text
          x={(KOTAK.x0 + KOTAK.x1) / 2} y={KOTAK.y0 + 16} textAnchor="middle"
          fontSize={12} fontFamily={MONO} fill={WARNA.depan}
          stroke={KERTAS} strokeWidth={3.4} paintOrder="stroke"
        >
          perahu tidak pernah sampai ke seberang
        </text>
      )}
    </BidangVektor>
  )
}
