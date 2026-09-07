'use client'

import { useCallback, useRef, useState, type PointerEvent, type RefObject } from 'react'
import { keMatematika, type Jendela, type Titik } from './papan'
import { KOTAK, VH, VW } from './gaya'

/**
 * Mengubah sentuhan atau tetikus pada SVG menjadi koordinat matematika.
 *
 * Disalin dari `widget/vektor/useSeret.ts` dan disesuaikan, dengan alasan yang
 * tercatat di kepala `papan.ts`. Yang berubah hanya nama tipenya (`Titik`
 * menggantikan `Vek`) dan berkas asal `KOTAK`.
 *
 * KENAPA getBoundingClientRect DAN BUKAN offsetX
 * SVG di sini melar mengikuti lebar kolom lewat `viewBox`, jadi satu piksel
 * layar tidak sama dengan satu satuan viewBox. `offsetX` memberi piksel layar,
 * dan melesetnya makin jauh makin lebar layarnya. VW dan VH di bawah adalah
 * ukuran viewBox, BUKAN ukuran layar.
 *
 * KENAPA setPointerCapture
 * Tanpa itu, yang sedang ditarik lepas begitu jari bergerak keluar gambar dan
 * siswa harus mengejarnya. Dengan itu, seretan tetap terikat sampai jari
 * diangkat.
 */
export function useSeret(
  jendelaHitung: Jendela,
  svgRef: RefObject<SVGSVGElement | null>,
  onGeser: (t: Titik) => void,
) {
  const menyeret = useRef(false)
  // Jendela DIBEKUKAN selama diseret (keputusan ARYA 5 Sep 2026): transformasi
  // bisa melempar bayangan jauh, jadi jendelanya memang harus menyesuaikan,
  // tetapi TIDAK di tengah seretan. Selama jari menahan, jendela yang dipakai
  // untuk memetakan pointer dan untuk menggambar adalah jendela saat jari
  // pertama menyentuh; setelah dilepas barulah ia menyesuaikan.
  const [beku, setBeku] = useState<Jendela | null>(null)
  const jendelaPakai = beku ?? jendelaHitung

  const bacaTitik = useCallback(
    (e: PointerEvent): Titik | null => {
      const svg = svgRef.current
      if (!svg) return null
      const kotak = svg.getBoundingClientRect()
      if (kotak.width === 0 || kotak.height === 0) return null

      const vx = ((e.clientX - kotak.left) / kotak.width) * VW
      const vy = ((e.clientY - kotak.top) / kotak.height) * VH
      const m = keMatematika(jendelaPakai, KOTAK)
      return { x: m.x(vx), y: m.y(vy) }
    },
    [jendelaPakai, svgRef],
  )

  const onPointerDown = useCallback(
    (e: PointerEvent) => {
      menyeret.current = true
      setBeku(jendelaPakai)
      ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
      const t = bacaTitik(e)
      if (t) onGeser(t)
    },
    [bacaTitik, onGeser, jendelaPakai],
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
    setBeku(null)
    const sasaran = e.currentTarget as Element
    if (sasaran.hasPointerCapture(e.pointerId)) sasaran.releasePointerCapture(e.pointerId)
  }, [])

  return { onPointerDown, onPointerMove, onPointerUp, jendela: jendelaPakai }
}

/**
 * Seperti `useSeret`, tetapi untuk widget yang punya BEBERAPA titik bisa
 * ditarik, misalnya Materi 07 yang pusat dilatasinya dan bentuknya sama-sama
 * bisa dipindah.
 *
 * KENAPA TITIKNYA DIKUNCI SAAT JARI TURUN
 * Kalau titik terdekat dihitung ulang tiap kali jari bergerak, dua titik yang
 * berpapasan akan saling merebut jari di tengah seretan, dan yang tadinya
 * ditarik tiba-tiba ditinggalkan. Di topik ini kejadiannya sering, sebab
 * pusat putar memang dilewati bentuknya saat diputar. Sekali dipegang, tetap
 * dipegang.
 */
export function useSeretTitik(
  jendelaHitung: Jendela,
  svgRef: RefObject<SVGSVGElement | null>,
  titik: Titik[],
  onGeser: (indeks: number, t: Titik) => void,
) {
  // Hanya indeks yang sedang dipegang yang disimpan di ref, dan ref itu cuma
  // ditulis di dalam penangan peristiwa. Senarai titiknya TIDAK disalin ke ref:
  // React 19 melarang menulis ref saat render, dan membaca `titik` langsung
  // dari lingkup fungsi sudah benar, sebab penangan ini dibuat ulang tiap kali
  // titiknya berubah.
  const dipegang = useRef<number | null>(null)
  const [beku, setBeku] = useState<Jendela | null>(null)
  const jendelaPakai = beku ?? jendelaHitung

  const bacaTitik = useCallback(
    (e: PointerEvent): Titik | null => {
      const svg = svgRef.current
      if (!svg) return null
      const kotak = svg.getBoundingClientRect()
      if (kotak.width === 0 || kotak.height === 0) return null
      const vx = ((e.clientX - kotak.left) / kotak.width) * VW
      const vy = ((e.clientY - kotak.top) / kotak.height) * VH
      const m = keMatematika(jendelaPakai, KOTAK)
      return { x: m.x(vx), y: m.y(vy) }
    },
    [jendelaPakai, svgRef],
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
      setBeku(jendelaPakai)
      ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
      onGeser(terdekat, t)
    },
    [bacaTitik, onGeser, titik, jendelaPakai],
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
    setBeku(null)
    const sasaran = e.currentTarget as Element
    if (sasaran.hasPointerCapture(e.pointerId)) sasaran.releasePointerCapture(e.pointerId)
  }, [])

  return { onPointerDown, onPointerMove, onPointerUp, jendela: jendelaPakai }
}
