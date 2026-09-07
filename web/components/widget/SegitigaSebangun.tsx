'use client'

import { useCallback, useMemo, useRef } from 'react'
import { WARNA } from '@/lib/warna'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'

/**
 * Widget "Segitiga Sebangun", Trigonometri Kelas 10.
 *
 * DUA ATURAN yang lahir dari temuan ARYA:
 *
 * 1. Widget tidak boleh memotong gambarnya sendiri. Saat sudut membesar, sisi
 *    depan tumbuh sangat cepat (di 80°, 5,7x sisi samping). Bingkai karena itu
 *    dihitung dari segitiga TERBESAR pada sudut tersebut, lalu digambar sesuai
 *    skala, tidak pernah terpotong, tapi slider ukuran tetap terasa efeknya.
 *    Perubahan bingkai DIBERITAHUKAN lewat `ppc` (skala tampilan).
 *
 * 2. Segitiganya harus bisa DITARIK LANGSUNG, bukan cuma lewat slider.
 *    Titik puncak diberi pegangan: geser ke atas-bawah mengubah sudut,
 *    ke kiri-kanan mengubah ukuran.
 */

const VW = 460
const VH = 300
const PAD = 40
const LEBAR = VW - PAD * 2
const TINGGI = VH - PAD * 2
const SAMPING_MAKS = 5 // cm saat slider 100%

export const BATAS = { derajatMin: 10, derajatMaks: 80, skalaMin: 35, skalaMaks: 100 }

export type Geometri = {
  sampingCm: number
  depanCm: number
  miringCm: number
  tan: number
  sin: number
  cos: number
  /** piksel per cm, berubah saat bingkai menyesuaikan */
  ppc: number
}

export function hitungGeometri(skalaPersen: number, derajat: number): Geometri {
  const s = skalaPersen / 100
  const rad = (derajat * Math.PI) / 180
  const ppc = Math.min(LEBAR / SAMPING_MAKS, TINGGI / (SAMPING_MAKS * Math.tan(rad)))
  const sampingCm = SAMPING_MAKS * s
  const depanCm = sampingCm * Math.tan(rad)
  return {
    sampingCm,
    depanCm,
    miringCm: Math.hypot(sampingCm, depanCm),
    tan: Math.tan(rad),
    sin: Math.sin(rad),
    cos: Math.cos(rad),
    ppc,
  }
}

/** Angka gaya Indonesia: pemisah desimal koma. */
export const angka = (n: number, desimal = 2) => n.toFixed(desimal).replace('.', ',')

const jepit = (n: number, min: number, maks: number) => Math.min(maks, Math.max(min, n))

export default function SegitigaSebangun({
  skala,
  derajat,
  onUbah,
}: {
  skala: number
  derajat: number
  /** dipanggil saat pengguna menarik segitiganya langsung */
  onUbah?: (skalaBaru: number, derajatBaru: number) => void
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const menarik = useRef(false)
  // Bagian gambar yang menyala mengikuti kendali yang sedang dipegang:
  // busur sudut saat "sudut", ketiga sisi saat "skala".
  const dipegang = useSedangDiubah()
  const nyalaSudut = dipegang === 'sudut'
  const nyalaSkala = dipegang === 'skala'

  const { sampingCm, depanCm, ppc } = hitungGeometri(skala, derajat)
  const rad = (derajat * Math.PI) / 180

  // Titik asal ditempatkan agar segitiga TERBESAR pada sudut ini berada di
  // tengah bidang. Dihitung dari ukuran maksimum (bukan ukuran sekarang),
  // supaya titik sudut theta tidak melompat-lompat saat slider ukuran digeser.
  const sampingMaksPx = SAMPING_MAKS * ppc
  const depanMaksPx = SAMPING_MAKS * Math.tan(rad) * ppc
  const ox = (VW - sampingMaksPx) / 2
  const oy = (VH + depanMaksPx) / 2

  const bx = ox + sampingCm * ppc
  const cy = oy - depanCm * ppc

  // ---- menarik langsung: ubah titik puncak jadi sudut + ukuran ----
  const keSvg = useCallback((e: React.PointerEvent): { x: number; y: number } | null => {
    const svg = svgRef.current
    if (!svg) return null
    const ctm = svg.getScreenCTM()
    if (!ctm) return null
    const p = svg.createSVGPoint()
    p.x = e.clientX
    p.y = e.clientY
    const t = p.matrixTransform(ctm.inverse())
    return { x: t.x, y: t.y }
  }, [])

  const tarik = useCallback(
    (e: React.PointerEvent) => {
      if (!menarik.current || !onUbah) return
      const t = keSvg(e)
      if (!t) return
      const lebarPx = Math.max(t.x - ox, 6)     // sisi samping, dalam piksel
      const tinggiPx = Math.max(oy - t.y, 4)    // sisi depan, dalam piksel
      const derajatBaru = jepit(
        (Math.atan2(tinggiPx, lebarPx) * 180) / Math.PI,
        BATAS.derajatMin, BATAS.derajatMaks,
      )
      const skalaBaru = jepit(
        (lebarPx / ppc / SAMPING_MAKS) * 100,
        BATAS.skalaMin, BATAS.skalaMaks,
      )
      onUbah(Math.round(skalaBaru), Math.round(derajatBaru))
    },
    [keSvg, onUbah, ox, oy, ppc],
  )

  const mulai = (e: React.PointerEvent) => {
    if (!onUbah) return
    menarik.current = true
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    tarik(e)
  }
  const selesai = (e: React.PointerEvent) => {
    menarik.current = false
    ;(e.target as Element).releasePointerCapture?.(e.pointerId)
  }

  // petak latar ikut merapat saat bingkai menjauh, tanda visual bahwa
  // tampilan sedang "mundur", bukan segitiganya yang mengecil
  const petak = useMemo(() => {
    const garis: { key: string; x1: number; y1: number; x2: number; y2: number }[] = []
    const langkah = Math.max(ppc, 6) // jangan menggambar ribuan garis saat ppc kecil
    for (let x = ox, i = 0; x <= VW - 5; x += langkah, i++)
      garis.push({ key: `v+${i}`, x1: x, y1: 5, x2: x, y2: VH - 5 })
    for (let x = ox - langkah, i = 0; x >= 5; x -= langkah, i++)
      garis.push({ key: `v-${i}`, x1: x, y1: 5, x2: x, y2: VH - 5 })
    for (let y = oy, i = 0; y >= 5; y -= langkah, i++)
      garis.push({ key: `h-${i}`, x1: 5, y1: y, x2: VW - 5, y2: y })
    for (let y = oy + langkah, i = 0; y <= VH - 5; y += langkah, i++)
      garis.push({ key: `h+${i}`, x1: 5, y1: y, x2: VW - 5, y2: y })
    return garis
  }, [ppc, ox, oy])

  // tanda siku-siku DI DALAM segitiga (kiri-atas dari titik siku)
  const t = Math.max(5, Math.min(13, (bx - ox) * 0.3, (oy - cy) * 0.3))
  const r = Math.max(16, Math.min(46, (bx - ox) * 0.42))

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid meet"
      onPointerMove={tarik}
      onPointerUp={selesai}
      onPointerCancel={selesai}
      style={{ touchAction: 'none' }}
      role="img"
      aria-label={`Segitiga siku-siku dengan sudut ${derajat} derajat, sisi samping ${angka(
        sampingCm,
      )} sentimeter dan sisi depan ${angka(depanCm)} sentimeter`}
    >
      <g>
        {petak.map(({ key, ...garis }) => (
          <line key={key} {...garis} stroke="#EDE6DA" strokeWidth={1} />
        ))}
      </g>
      <g className={nyalaSkala ? 'nyala' : undefined}>
        <line x1={ox} y1={oy} x2={bx} y2={oy} stroke={WARNA.samping} strokeWidth={nyalaSkala ? 5 : 3.5} strokeLinecap="round" />
        <line x1={bx} y1={oy} x2={bx} y2={cy} stroke={WARNA.depan} strokeWidth={nyalaSkala ? 5 : 3.5} strokeLinecap="round" />
        <line x1={bx} y1={cy} x2={ox} y2={oy} stroke={WARNA.miring} strokeWidth={nyalaSkala ? 5 : 3.5} strokeLinecap="round" />
      </g>
      <path d={`M ${bx - t} ${oy} L ${bx - t} ${oy - t} L ${bx} ${oy - t}`} fill="none" stroke={WARNA.redup} strokeWidth={2} />
      <path
        className={nyalaSudut ? 'nyala' : undefined}
        d={`M ${ox + r} ${oy} A ${r} ${r} 0 0 0 ${ox + r * Math.cos(rad)} ${oy - r * Math.sin(rad)}`}
        fill="none"
        stroke={WARNA.sudut}
        strokeWidth={nyalaSudut ? 5 : 3}
      />
      <text
        x={ox + (r + 13) * Math.cos(rad / 2)}
        y={oy - (r + 13) * Math.sin(rad / 2) + 5}
        fontSize={17}
        fill={WARNA.sudut}
        fontStyle="italic"
        fontFamily="var(--font-serif), Georgia, serif"
      >
        θ
      </text>

      {/* pegangan di titik puncak, inilah yang ditarik langsung */}
      {onUbah && (
        <g onPointerDown={mulai} style={{ cursor: 'grab' }}>
          <circle cx={bx} cy={cy} r={16} fill="transparent" />
          <circle cx={bx} cy={cy} r={7} fill="var(--kartu)" stroke={WARNA.miring} strokeWidth={2.5} />
          <circle cx={bx} cy={cy} r={2.5} fill={WARNA.miring} />
        </g>
      )}
    </svg>
  )
}
