'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Membungkus sesuatu supaya ia naik dan memudar masuk saat pertama kali
 * masuk layar, lalu dilepaskan.
 * Patokan: `docs/desain-mantra/MANTRA-v2.dc.html` baris 672 sampai 678;
 * sistem gerak Panggung (K) `docs/desain-mantra/gerak/HANDOFF-GERAK.md`.
 *
 * Kenapa hanya SEKALI: elemen yang memudar keluar-masuk tiap kali digulir
 * bolak-balik terasa gelisah, dan yang lebih buruk, isinya jadi tidak bisa
 * dipercaya ada di sana saat orang menggulir kembali ke atas.
 *
 * Pemicunya: seperlima elemen sudah masuk layar (`threshold: 0.2`) dan
 * tepi bawah layar dianggap 40 px lebih tinggi (`rootMargin`). Tanpa itu
 * elemen dinyatakan masuk saat baris pertamanya baru menyentuh tepi bawah,
 * dan animasinya sudah selesai sebelum orang sempat melihatnya.
 *
 * Geraknya ditulis di CSS (`.muncul-gulir[data-tampil]`, globals.css):
 * naik 12 px dan memudar, 400 ms, kurva masuk. `data-tampil` ditulis
 * langsung ke DOM, bukan lewat state React: satu atribut berubah tidak perlu
 * merakit ulang seluruh isinya. Kalau pengguna minta gerak dikurangi, aturan
 * CSS yang sama menampilkannya langsung. Kalau `IntersectionObserver` tidak
 * ada, isinya juga langsung ditampilkan: gagal dengan isi terlihat jauh
 * lebih baik daripada gagal dengan halaman yang tampak kosong.
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
    const tampilkan = () => { el.dataset.tampil = 'true' }

    if (typeof IntersectionObserver === 'undefined') {
      tampilkan()
      return
    }

    const pengamat = new IntersectionObserver(
      (entri) => {
        for (const e of entri) {
          if (!e.isIntersecting) continue
          pengamat.unobserve(e.target)
          tampilkan()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    )
    pengamat.observe(el)
    return () => pengamat.disconnect()
  }, [])

  return (
    <div
      ref={acuan}
      className={className ? `muncul-gulir ${className}` : 'muncul-gulir'}
      style={tunda ? { transitionDelay: `${tunda}ms` } : undefined}
    >
      {children}
    </div>
  )
}
