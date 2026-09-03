'use client'

import { useRef, type ReactNode } from 'react'

/**
 * Kartu yang bayangannya mengikuti kursor.
 *
 * Bayangan digeser berlawanan arah kursor, seolah ada satu sumber cahaya di
 * bawah telunjuk. Efeknya kecil tetapi membuat kartu terasa punya ketebalan
 * saat mouse lewat, bukan sekadar melompat naik.
 *
 * Ditulis LANGSUNG ke `element.style`, bukan lewat keadaan React. Ini bukan
 * jalan pintas: `mousemove` menyala puluhan kali per detik, dan setiap
 * penulisan keadaan React akan memicu gambar ulang seluruh pohon komponen.
 * Bayangan adalah hiasan murni, jadi ia tidak perlu melewati React sama
 * sekali. Aturan ini disebut tegas di HANDOFF ("never through React state").
 *
 * Di layar sentuh tidak ada `mousemove`, jadi kartunya cuma tidak berbayang;
 * tidak ada yang rusak.
 */
export default function KartuBayang({
  children,
  className = '',
  ...sisa
}: {
  children: ReactNode
  className?: string
} & React.HTMLAttributes<HTMLElement>) {
  const acuan = useRef<HTMLElement>(null)

  const saatGerak = (e: React.MouseEvent<HTMLElement>) => {
    const el = acuan.current
    if (!el) return
    const k = el.getBoundingClientRect()
    // dx dan dy: posisi kursor di dalam kartu, -0,5 sampai 0,5.
    const dx = (e.clientX - k.left) / k.width - 0.5
    const dy = (e.clientY - k.top) / k.height - 0.5
    el.style.boxShadow = `${-dx * 26}px ${18 - dy * 14}px 42px -26px rgba(16,26,43,.55)`
  }

  const saatLepas = () => {
    if (acuan.current) acuan.current.style.boxShadow = ''
  }

  return (
    <article
      ref={acuan}
      className={className}
      onMouseMove={saatGerak}
      onMouseLeave={saatLepas}
      {...sisa}
    >
      {children}
    </article>
  )
}
