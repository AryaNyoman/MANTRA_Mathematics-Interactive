'use client'
import { useEffect, useState } from 'react'

type Posisi = { x: number; y: number; teks: string }

/** Elemen yang memulai baris baru saat blokan diubah jadi teks. */
const BLOK = new Set([
  'P', 'DIV', 'LI', 'OL', 'UL', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'TR', 'TABLE',
  'BLOCKQUOTE', 'SECTION', 'ARTICLE', 'DL', 'DT', 'DD', 'PRE', 'FIGURE', 'FIGCAPTION', 'HR',
])

/**
 * Menyalin isi blokan menjadi teks yang SUSUNAN BARISNYA terjaga (ARYA 21 Sep
 * 2026: kotak contoh yang diblok tadinya luruh jadi satu paragraf, "Bayangan
 * pohon8 mTinggi Anda1,6 m"). Tiap elemen blok jadi baris sendiri, butir
 * daftar diberi "•", sel kotak contoh (`.sel-contoh`) dipisah " · " supaya
 * satu baris tabel tetap satu baris. Rumus KaTeX dikembalikan ke teks
 * aslinya lewat `data-teks` TeksMat (KaTeX menaruh "90°" sebagai "90" dan
 * "∘" di simpul terpisah).
 */
function kumpulkan(simpul: Node, keluar: string[]): void {
  if (simpul.nodeType === Node.TEXT_NODE) {
    keluar.push(simpul.textContent ?? '')
    return
  }
  if (simpul instanceof Element) {
    const teks = simpul.getAttribute('data-teks')
    if (teks !== null) {
      keluar.push(teks)
      return
    }
    if (simpul.tagName === 'BR') {
      keluar.push('\n')
      return
    }
    const blok = BLOK.has(simpul.tagName)
    if (blok) keluar.push('\n')
    if (simpul.tagName === 'LI') keluar.push('• ')
    for (const anak of Array.from(simpul.childNodes)) kumpulkan(anak, keluar)
    if (simpul.classList.contains('sel-contoh')) keluar.push(' · ')
    if (blok) keluar.push('\n')
    return
  }
  // DocumentFragment
  for (const anak of Array.from(simpul.childNodes)) kumpulkan(anak, keluar)
}

/* Satu baris per blok, tanpa baris kosong: dua blok bersebelahan memberi
   dua ganti baris, dan untuk kutipan satu saja sudah cukup. */
function rapikan(mentah: string): string {
  return mentah
    .split('\n')
    .map((b) => b.replace(/[ \t ]+/g, ' ').replace(/^\s*·\s*/, '').replace(/\s*·\s*$/, '').trim())
    .filter((b) => b !== '')
    .join('\n')
}

function teksSeleksi(sel: Selection): string {
  const rentang = sel.getRangeAt(0)
  const wadah = rentang.commonAncestorContainer
  const induk = wadah instanceof Element ? wadah : wadah.parentElement
  const rumusSaja = induk?.closest('[data-teks]')
  if (rumusSaja) return rumusSaja.getAttribute('data-teks') ?? ''
  const keluar: string[] = []
  kumpulkan(rentang.cloneContents(), keluar)
  return rapikan(keluar.join(''))
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
