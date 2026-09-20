'use client'
import type { ReactNode } from 'react'
import { useTanya } from './konteks'

/**
 * Membungkus satu blok bacaan dengan tombol kecil "Jelaskan": desktop tampil
 * saat kursor di atas blok, HP selalu tampak kecil di kanan atas blok.
 * Tanpa penyedia (halaman di luar materi) blok dirender apa adanya.
 */
export default function TombolJelaskan({ teks, children }: { teks: string; children: ReactNode }) {
  const { bukaPanel, aktif } = useTanya()
  if (!aktif) return <>{children}</>
  return (
    <div className="blok-tanya">
      {children}
      <button
        type="button"
        className="tombol-jelaskan"
        aria-label="Jelaskan bagian ini"
        title="Jelaskan bagian ini"
        onClick={() => bukaPanel(teks.slice(0, 1200))}
      >
        ?
      </button>
    </div>
  )
}
