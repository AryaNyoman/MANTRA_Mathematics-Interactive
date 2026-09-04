'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

/**
 * Logo hero yang bergeser pelan saat halaman digulir (paralaks).
 *
 * Besarnya kecil dan sengaja: `y × -0,05`, dibatasi -26 piksel. Lebih dari itu
 * logonya terlihat lepas dari halaman, bukan sekadar punya kedalaman.
 *
 * Tiga hal yang membuatnya tidak membebani halaman:
 * 1. Posisi ditulis langsung ke `style.transform`, bukan lewat keadaan React.
 *    Pendengar `scroll` menyala sangat sering; melewatkannya ke React berarti
 *    menggambar ulang pohon komponen puluhan kali per detik.
 * 2. Satu `requestAnimationFrame` sebagai penjaga, jadi paling banyak satu
 *    penulisan per frame walau peristiwa gulirnya menumpuk.
 * 3. `passive: true`, supaya peramban tidak perlu menunggu kita sebelum
 *    menggulir.
 *
 * Kalau pengguna meminta gerak dikurangi, paralaksnya dimatikan sama sekali.
 */
export default function LogoParalaks() {
  const acuan = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const kurangiGerak = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (kurangiGerak) return

    let menunggu = false
    const perbarui = () => {
      menunggu = false
      const el = acuan.current
      if (!el) return
      const geser = Math.max(-26, window.scrollY * -0.05)
      el.style.transform = `translateY(${geser}px)`
    }
    const saatGulir = () => {
      if (menunggu) return
      menunggu = true
      requestAnimationFrame(perbarui)
    }
    window.addEventListener('scroll', saatGulir, { passive: true })
    perbarui()
    return () => window.removeEventListener('scroll', saatGulir)
  }, [])

  return (
    <div ref={acuan} className="naik naik-1" style={{ willChange: 'transform' }}>
      <Image
        src="/mantra/mantra-penuh.png"
        alt="MANTRA"
        width={860}
        height={262}
        priority
        className="hero-logo"
      />
    </div>
  )
}
