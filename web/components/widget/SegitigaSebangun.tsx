'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import { WARNA } from '@/lib/warna'
import { lepas, pegang, useSedangDiubah } from '@/components/kendali/sedang-diubah'

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
 *
 * 3. Satu tarikan hanya mengubah SATU besaran (ARYA, 14 Sep 2026: tarikan
 *    bebas "terlalu licin", ukuran dan sudut berubah bersamaan padahal siswa
 *    justru ingin membedakan keduanya). Arah tarikan yang menang di beberapa
 *    piksel pertama mengunci tarikan itu: mendatar berarti ukuran saja,
 *    tegak berarti sudut saja. Kunci yang aktif menyalakan kendali yang
 *    bersangkutan, dan garis bantu putus-putus memperlihatkan arah yang
 *    sedang dituruti.
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
  // keadaan tarikan: titik mulai (satuan SVG), nilai saat mulai, dan kunci
  // arah yang diputuskan setelah jari bergerak cukup jauh
  const tarikan = useRef<{ x: number; y: number; skala: number; derajat: number } | null>(null)
  const [kunci, setKunci] = useState<'skala' | 'sudut' | null>(null)
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

  const AMBANG = 6 // piksel SVG sebelum arah tarikan diputuskan
  // Peredam tarikan (ARYA 16 Sep 2026: "terlalu cepat berubah, licin"):
  // pegangan bergerak 0,4 kali jarak jari, jadi 10 piksel jari = 4 piksel
  // perubahan. Pegangan sengaja tidak lagi persis di bawah jari; yang
  // dipentingkan perubahan ukuran dan sudutnya terkendali.
  const PEREDAM = 0.4

  const tarik = useCallback(
    (e: React.PointerEvent) => {
      const awal = tarikan.current
      if (!awal || !onUbah) return
      const t = keSvg(e)
      if (!t) return
      const dx = t.x - awal.x
      const dy = t.y - awal.y
      let arah = kunci
      if (!arah) {
        if (Math.abs(dx) < AMBANG && Math.abs(dy) < AMBANG) return
        arah = Math.abs(dx) >= Math.abs(dy) ? 'skala' : 'sudut'
        setKunci(arah)
        pegang(arah)
      }
      // titik acuan = titik mulai ditambah jarak jari yang sudah diredam
      const xRedam = awal.x + dx * PEREDAM
      const yRedam = awal.y + dy * PEREDAM
      if (arah === 'skala') {
        // hanya ukuran: sisi samping mengikuti jari (diredam), sudut dibekukan
        const lebarPx = Math.max(xRedam - ox, 6)
        const skalaBaru = jepit((lebarPx / ppc / SAMPING_MAKS) * 100, BATAS.skalaMin, BATAS.skalaMaks)
        onUbah(Math.round(skalaBaru), awal.derajat)
      } else {
        // hanya sudut: sisi samping dibekukan, puncak naik turun mengikuti jari
        const lebarPx = (awal.skala / 100) * SAMPING_MAKS * ppc
        const tinggiPx = Math.max(oy - yRedam, 4)
        const derajatBaru = jepit((Math.atan2(tinggiPx, lebarPx) * 180) / Math.PI, BATAS.derajatMin, BATAS.derajatMaks)
        onUbah(awal.skala, Math.round(derajatBaru))
      }
    },
    [keSvg, onUbah, ox, oy, ppc, kunci],
  )

  const mulai = (e: React.PointerEvent) => {
    if (!onUbah) return
    const t = keSvg(e)
    if (!t) return
    tarikan.current = { x: t.x, y: t.y, skala, derajat }
    setKunci(null)
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }
  const selesai = (e: React.PointerEvent) => {
    tarikan.current = null
    if (kunci) lepas(kunci)
    setKunci(null)
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

      {/* garis bantu arah tarikan yang sedang dikunci: mendatar untuk ukuran,
          tegak untuk sudut, supaya siswa melihat hanya satu arah yang dituruti */}
      {kunci === 'skala' && (
        <line x1={ox + 10} y1={cy} x2={VW - 10} y2={cy} stroke={WARNA.samping} strokeWidth={1.4} strokeDasharray="6 5" opacity={0.75} />
      )}
      {kunci === 'sudut' && (
        <line x1={bx} y1={12} x2={bx} y2={oy - 8} stroke={WARNA.sudut} strokeWidth={1.4} strokeDasharray="6 5" opacity={0.75} />
      )}

      {/* pegangan di titik puncak, inilah yang ditarik langsung; dua panah
          kecil memberi tahu arah mana mengubah apa (ukuran ke samping, sudut
          ke atas bawah) tanpa harus membaca petunjuk */}
      {onUbah && (
        <g onPointerDown={mulai} style={{ cursor: kunci ? 'grabbing' : 'grab' }}>
          <circle cx={bx} cy={cy} r={18} fill="transparent" />
          {!kunci && (
            <g fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" opacity={0.85}>
              {/* panah dibalik arahnya bila puncak terlalu dekat tepi kanan atau tepi atas */}
              {bx < VW - 84 ? (
                <>
                  <path d={`M ${bx + 13} ${cy} h 16 m -5 -4 l 5 4 l -5 4`} stroke={WARNA.samping} />
                  <text x={bx + 33} y={cy + 4} fontSize={10.5} fill={WARNA.samping} fontFamily="var(--font-sans), sans-serif">ukuran</text>
                </>
              ) : (
                <>
                  <path d={`M ${bx - 13} ${cy} h -16 m 5 -4 l -5 4 l 5 4`} stroke={WARNA.samping} />
                  <text x={bx - 33} y={cy + 4} textAnchor="end" fontSize={10.5} fill={WARNA.samping} fontFamily="var(--font-sans), sans-serif">ukuran</text>
                </>
              )}
              {cy > 58 ? (
                <>
                  <path d={`M ${bx} ${cy - 13} v -16 m -4 5 l 4 -5 l 4 5`} stroke={WARNA.sudut} />
                  <text x={bx + 6} y={cy - 32} fontSize={10.5} fill={WARNA.sudut} fontFamily="var(--font-sans), sans-serif">sudut</text>
                </>
              ) : (
                <>
                  <path d={`M ${bx} ${cy + 13} v 16 m -4 -5 l 4 5 l 4 -5`} stroke={WARNA.sudut} />
                  <text x={bx + 6} y={cy + 42} fontSize={10.5} fill={WARNA.sudut} fontFamily="var(--font-sans), sans-serif">sudut</text>
                </>
              )}
            </g>
          )}
          <circle cx={bx} cy={cy} r={7} fill="var(--kartu)" stroke={WARNA.miring} strokeWidth={2.5} />
          <circle cx={bx} cy={cy} r={2.5} fill={WARNA.miring} />
        </g>
      )}
    </svg>
  )
}
