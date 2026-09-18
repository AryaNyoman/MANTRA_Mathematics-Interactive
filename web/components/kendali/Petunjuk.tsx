import type { ReactNode } from 'react'
import TeksMat from '@/components/latihan/TeksMat'

/**
 * Satu kalimat "geser X, lalu perhatikan Y" di bawah kendali.
 *
 * Kontrak kendali mewajibkan tiap widget punya satu petunjuk berbentuk itu,
 * supaya siswa tahu apa yang DICARI, bukan sekadar apa yang bisa digerakkan.
 * Menggantikan `.skala-info` yang dulu ditulis ulang di tiap panggung.
 * Petunjuk berupa teks ditata KaTeX (rumus di dalamnya, ARYA 18 Sep 2026);
 * yang berupa JSX dibiarkan.
 */
export default function Petunjuk({ children }: { children: ReactNode }) {
  return (
    <p className="kendali-petunjuk">
      <span className="titik" aria-hidden="true" />
      <span>{typeof children === 'string' ? <TeksMat teks={children} blok={false} /> : children}</span>
    </p>
  )
}
