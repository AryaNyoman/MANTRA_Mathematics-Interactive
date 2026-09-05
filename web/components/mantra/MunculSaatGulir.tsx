'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Membungkus sesuatu supaya ia naik dan memudar masuk saat pertama kali
 * masuk layar, lalu dilepaskan.
 * Patokan: `docs/desain-mantra/MANTRA-v2.dc.html` baris 672 sampai 678.
 *
 * Kenapa hanya SEKALI: elemen yang memudar keluar-masuk tiap kali digulir
 * bolak-balik terasa gelisah, dan yang lebih buruk, isinya jadi tidak bisa
 * dipercaya ada di sana saat orang menggulir kembali ke atas.
 *
 * `rootMargin: 0 0 -8% 0` menahan pemicunya sedikit di dalam layar. Tanpa
 * itu elemen dinyatakan masuk saat baris pertamanya baru menyentuh tepi
 * bawah, dan animasinya sudah selesai sebelum orang sempat melihatnya.
 *
 * Kalau pengguna minta gerak dikurangi, isinya langsung ditampilkan penuh.
 * Kalau `IntersectionObserver` tidak ada, isinya juga langsung ditampilkan:
 * gagal dengan isi terlihat jauh lebih baik daripada gagal dengan halaman
 * yang tampak kosong.
 */
export default function MunculSaatGulir({
  children,
  tunda = 0,
  className,
}: {
  children: ReactNode
  /** Tundaan dalam milidetik, untuk mengurutkan beberapa benda sekaligus. */
  tunda?: number
  className?: string
}) {
  const acuan = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = acuan.current
    if (!el) return

    const tampilkan = () => {
      el.style.opacity = '1'
      el.style.animation = ''
    }

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      tampilkan()
      return
    }

    const pengamat = new IntersectionObserver(
      (entri) => {
        for (const e of entri) {
          if (!e.isIntersecting) continue
          pengamat.unobserve(e.target)
          el.style.animation = `naik var(--d-lambat) var(--kurva) ${tunda}ms both`
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    pengamat.observe(el)
    return () => pengamat.disconnect()
  }, [tunda])

  // `opacity: 0` ditulis di gaya sebaris, bukan lewat kelas, supaya tidak
  // ada kedip pada peramban yang menerapkan CSS lebih lambat daripada
  // menggambar isi.
  return (
    <div ref={acuan} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
