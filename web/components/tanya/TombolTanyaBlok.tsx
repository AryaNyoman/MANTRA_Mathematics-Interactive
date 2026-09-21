'use client'
import { useEffect, useState } from 'react'

type Posisi = { x: number; y: number; teks: string }

/**
 * Teks yang diblok, dengan rumus KaTeX dikembalikan ke teks aslinya: KaTeX
 * menaruh "90°" sebagai "90", "∘" di simpul terpisah, sehingga
 * `toString()` seleksi menghasilkan "90 ∘". TeksMat menyimpan teks Unicode
 * aslinya di `data-teks`; rumus yang terkena blok (utuh atau sebagian)
 * diganti seluruh teks itu.
 */
function teksSeleksi(sel: Selection): string {
  const rentang = sel.getRangeAt(0)
  const wadah = rentang.commonAncestorContainer
  const induk = wadah instanceof Element ? wadah : wadah.parentElement
  const rumusSaja = induk?.closest('[data-teks]')
  if (rumusSaja) return rumusSaja.getAttribute('data-teks') ?? ''
  const potongan = rentang.cloneContents()
  potongan.querySelectorAll('[data-teks]').forEach((el) => el.replaceWith(el.getAttribute('data-teks') ?? ''))
  return (potongan.textContent ?? '').replace(/\s+/g, ' ').trim()
}

/**
 * Tombol "Tanya" melayang saat siswa memblok 8 sampai 1.200 huruf di bacaan
 * materi: paragraf dan kotak-kotaknya (`.bacaan`), kotak "Sering keliru"
 * (`.miskon`), dan Ringkasan (`.baca-cepat`); ARYA 21 Sep 2026 meminta
 * kotak sering keliru ikut. Posisinya dibaca dari kotak seleksi;
 * `onMouseDown` mencegah seleksinya hilang sebelum klik terdaftar. Sejak
 * tombol "?" per blok dihapus, inilah satu-satunya jalan bertanya dari
 * bacaan, di HP maupun laptop.
 */
export default function TombolTanyaBlok({ onTanya }: { onTanya: (kutipan: string) => void }) {
  const [posisi, setPosisi] = useState<Posisi | null>(null)

  useEffect(() => {
    const perbarui = () => {
      const sel = window.getSelection()
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        setPosisi(null)
        return
      }
      const akar = sel.anchorNode?.parentElement?.closest('.bacaan, .miskon, .baca-cepat')
      if (!akar) {
        setPosisi(null)
        return
      }
      const teks = teksSeleksi(sel)
      if (teks.length < 8 || teks.length > 1200) {
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
