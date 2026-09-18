'use client'

import { useEffect, useState } from 'react'

/**
 * Grafik tangen yang putus di 90 derajat untuk halaman 404: momen tanda
 * tangan (sistem gerak Panggung, I). Dua ruas kurvanya tergambar 1,6 detik
 * (ruas kedua mulai 0,7 detik) dan label x = 90 derajat muncul di 1,8 detik;
 * seluruhnya selesai sekitar 2,2 detik.
 *
 * Sesudah itu `data-selesai` dinyalakan: aturan CSS `.galat-grafik[data-selesai]`
 * mengunci keadaan akhir tanpa animasi, jadi perakitan ulang apa pun (tema,
 * ukuran layar) tidak mengulang gambarnya. Gerak dikurangi: aturan CSS yang
 * sama menggambar semuanya langsung.
 */
const SELESAI_MS = 2200

export default function GrafikTan() {
  const [selesai, setSelesai] = useState(false)
  useEffect(() => {
    const id = window.setTimeout(() => setSelesai(true), SELESAI_MS)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <svg viewBox="0 0 320 120" aria-hidden="true" className="galat-grafik" data-selesai={selesai}>
      <line x1="0" y1="100" x2="320" y2="100" stroke="rgba(16,26,43,.3)" />
      <line x1="160" y1="0" x2="160" y2="120" stroke="#E8582C" strokeDasharray="4 5" strokeOpacity={0.7} />
      <path
        pathLength={400}
        strokeDasharray={400}
        strokeDashoffset={400}
        style={{ animation: 'gambar 1600ms var(--kurva) 200ms both' }}
        d="M20 96 C 80 92 120 80 150 8"
        fill="none"
        stroke="#B08A3E"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <path
        pathLength={400}
        strokeDasharray={400}
        strokeDashoffset={400}
        style={{ animation: 'gambar 1600ms var(--kurva) 700ms both' }}
        d="M170 112 C 200 40 240 30 300 22"
        fill="none"
        stroke="#B08A3E"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <text
        x="168"
        y="14"
        fontSize="11"
        fill="#E8582C"
        style={{ animation: 'muncul 400ms 1.8s both' }}
      >
        x = 90°
      </text>
    </svg>
  )
}
