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

/**
 * Seperti `useSeret`, tetapi untuk widget yang punya BEBERAPA titik bisa
 * ditarik. Saat jari turun, titik yang paling dekat dengan jari itulah yang
 * dipegang, dan ia tetap dipegang sampai jari diangkat.
 *
 * KENAPA TITIKNYA DIKUNCI SAAT JARI TURUN
 * Kalau titik terdekat dihitung ulang tiap kali jari bergerak, dua panah yang
 * berpapasan akan saling merebut jari di tengah seretan, dan yang tadinya
 * ditarik tiba-tiba ditinggalkan. Sekali dipegang, tetap dipegang.
 */
export function useSeretTitik(
  jendela: Jendela,
  svgRef: RefObject<SVGSVGElement | null>,
  titik: Vek[],
  onGeser: (indeks: number, t: Vek) => void,
) {
  // Hanya indeks yang sedang dipegang yang disimpan di ref, dan ref itu cuma
  // ditulis di dalam penangan peristiwa. Senarai titiknya TIDAK disalin ke ref:
  // React 19 melarang menulis ref saat render, dan membaca `titik` langsung
  // dari lingkup fungsi sudah benar, sebab penangan ini dibuat ulang tiap kali
  // titiknya berubah.
  const dipegang = useRef<number | null>(null)

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
      const t = bacaTitik(e)
      if (!t) return
      let terdekat = 0
      let jarakTerdekat = Infinity
      titik.forEach((d, i) => {
        const j = Math.hypot(d.x - t.x, d.y - t.y)
        if (j < jarakTerdekat) {
          jarakTerdekat = j
          terdekat = i
        }
      })
      dipegang.current = terdekat
      ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
      onGeser(terdekat, t)
    },
    [bacaTitik, onGeser, titik],
  )

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (dipegang.current === null) return
      const t = bacaTitik(e)
      if (t) onGeser(dipegang.current, t)
    },
    [bacaTitik, onGeser],
  )

  const onPointerUp = useCallback((e: PointerEvent) => {
    dipegang.current = null
    const sasaran = e.currentTarget as Element
    if (sasaran.hasPointerCapture(e.pointerId)) sasaran.releasePointerCapture(e.pointerId)
  }, [])

  return { onPointerDown, onPointerMove, onPointerUp }
}
