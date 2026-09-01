'use client'

import { useCallback, useRef, type PointerEvent, type RefObject } from 'react'
import { keMatematika, type Jendela, type Vek } from './geometri'
import { KOTAK, VH, VW } from './gaya'

/**
 * Mengubah sentuhan atau tetikus pada SVG menjadi koordinat matematika.
 *
 * KENAPA getBoundingClientRect DAN BUKAN offsetX
 * SVG di sini melar mengikuti lebar kolom lewat `viewBox`, jadi satu piksel
 * layar tidak sama dengan satu satuan viewBox. `offsetX` memberi piksel layar,
 * dan melesetnya makin jauh makin lebar layarnya. Perbandingan lebar kotak
 * nyata terhadap lebar viewBox harus dihitung sendiri, dan VW serta VH di bawah
 * adalah ukuran viewBox, BUKAN ukuran layar.
 *
 * KENAPA setPointerCapture
 * Tanpa itu, panah lepas begitu jari bergerak keluar gambar dan siswa harus
 * mengejar panahnya. Dengan itu, seretan tetap terikat sampai jari diangkat.
 */
export function useSeret(
  jendela: Jendela,
  svgRef: RefObject<SVGSVGElement | null>,
  onGeser: (t: Vek) => void,
) {
  const menyeret = useRef(false)

  const bacaTitik = useCallback(
    (e: PointerEvent): Vek | null => {
      const svg = svgRef.current
      if (!svg) return null
      const kotak = svg.getBoundingClientRect()
      if (kotak.width === 0 || kotak.height === 0) return null

      const vx = ((e.clientX - kotak.left) / kotak.width) * VW
      const vy = ((e.clientY - kotak.top) / kotak.height) * VH
      const m = keMatematika(jendela, KOTAK)
      return { x: m.x(vx), y: m.y(vy) }
    },
    [jendela, svgRef],
  )

  const onPointerDown = useCallback(
    (e: PointerEvent) => {
      menyeret.current = true
      ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
      const t = bacaTitik(e)
      if (t) onGeser(t)
    },
    [bacaTitik, onGeser],
  )

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!menyeret.current) return
      const t = bacaTitik(e)
      if (t) onGeser(t)
    },
    [bacaTitik, onGeser],
  )

  const onPointerUp = useCallback((e: PointerEvent) => {
    menyeret.current = false
    const sasaran = e.currentTarget as Element
    if (sasaran.hasPointerCapture(e.pointerId)) sasaran.releasePointerCapture(e.pointerId)
  }, [])

  return { onPointerDown, onPointerMove, onPointerUp }
}
