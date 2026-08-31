'use client'

import { useEffect, useState } from 'react'

/**
 * Tombol "Pasang di HP".
 *
 * Peramban memberi tahu lewat peristiwa `beforeinstallprompt` ketika situs ini
 * memenuhi syarat pemasangan (manifest sah + ikon + HTTPS). Tombol ini hanya
 * muncul kalau peristiwa itu benar-benar datang.
 *
 * Itu disengaja: menampilkan tombol yang tidak bisa berfungsi jauh lebih buruk
 * daripada tidak menampilkan apa-apa. Di localhost dan di peramban yang tidak
 * mendukung (Safari iOS), tombolnya diam saja dan tidak ada yang terlihat
 * rusak. Begitu situs online, ia menyala sendiri.
 */
type PeristiwaPasang = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function TombolPasang() {
  const [tawaran, setTawaran] = useState<PeristiwaPasang | null>(null)
  const [terpasang, setTerpasang] = useState(false)

  useEffect(() => {
    const tangkap = (e: Event) => {
      e.preventDefault()
      setTawaran(e as PeristiwaPasang)
    }
    const selesai = () => {
      setTerpasang(true)
      setTawaran(null)
    }
    window.addEventListener('beforeinstallprompt', tangkap)
    window.addEventListener('appinstalled', selesai)
    return () => {
      window.removeEventListener('beforeinstallprompt', tangkap)
      window.removeEventListener('appinstalled', selesai)
    }
  }, [])

  if (terpasang || !tawaran) return null

  return (
    <button
      type="button"
      className="tombol-pasang"
      onClick={async () => {
        await tawaran.prompt()
        await tawaran.userChoice
        setTawaran(null)
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="6" y="2" width="12" height="20" rx="2.5"
              stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 8v7m0 0 3-3m-3 3-3-3" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Pasang di HP
    </button>
  )
}
