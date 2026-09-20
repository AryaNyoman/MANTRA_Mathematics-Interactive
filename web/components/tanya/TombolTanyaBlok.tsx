'use client'
import { useEffect, useState } from 'react'

type Posisi = { x: number; y: number; teks: string }

/**
 * Tombol "Tanya" melayang saat siswa memblok 8 sampai 1.200 huruf di dalam
 * `.bacaan`. Posisinya dibaca dari kotak seleksi; `onMouseDown` mencegah
 * seleksinya hilang sebelum klik terdaftar.
 */
export default function TombolTanyaBlok({ onTanya }: { onTanya: (kutipan: string) => void }) {
  const [posisi, setPosisi] = useState<Posisi | null>(null)

  useEffect(() => {
    const perbarui = () => {
      const sel = window.getSelection()
      const teks = sel?.toString().replace(/\s+/g, ' ').trim() ?? ''
      if (!sel || sel.isCollapsed || sel.rangeCount === 0 || teks.length < 8 || teks.length > 1200) {
        setPosisi(null)
        return
      }
      const akar = sel.anchorNode?.parentElement?.closest('.bacaan')
      if (!akar) {
        setPosisi(null)
        return
      }
      const r = sel.getRangeAt(0).getBoundingClientRect()
      setPosisi({ x: Math.min(Math.max(r.left + r.width / 2, 60), window.innerWidth - 60), y: r.bottom + 8, teks })
    }
    document.addEventListener('selectionchange', perbarui)
    window.addEventListener('scroll', perbarui, true)
    return () => {
      document.removeEventListener('selectionchange', perbarui)
      window.removeEventListener('scroll', perbarui, true)
    }
  }, [])

  if (!posisi) return null
  return (
    <button
      type="button"
      className="tombol-tanya-blok"
      style={{ left: posisi.x, top: posisi.y }}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => {
        onTanya(posisi.teks)
        window.getSelection()?.removeAllRanges()
        setPosisi(null)
      }}
    >
      Tanya
    </button>
  )
}
