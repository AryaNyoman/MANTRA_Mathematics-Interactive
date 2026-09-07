import type { ReactNode } from 'react'

/**
 * Satu kalimat "geser X, lalu perhatikan Y" di bawah kendali.
 *
 * Kontrak kendali mewajibkan tiap widget punya satu petunjuk berbentuk itu,
 * supaya siswa tahu apa yang DICARI, bukan sekadar apa yang bisa digerakkan.
 * Menggantikan `.skala-info` yang dulu ditulis ulang di tiap panggung.
 */
export default function Petunjuk({ children }: { children: ReactNode }) {
  return (
    <p className="kendali-petunjuk">
      <span className="titik" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
