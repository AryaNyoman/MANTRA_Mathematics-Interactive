'use client'

/**
 * Pengganti sementara untuk widget Turunan yang belum dibuat.
 *
 * Kerangka dari MATRA-MASTER, 6 Sep 2026. Tiap widget di rancangan
 * (docs/superpowers/specs/2026-09-06-turunan-alur-belajar.md) diganti dengan
 * komponen sungguhan di folder ini, lalu pemanggilannya di
 * `components/topik/PanggungTurunan.tsx` diarahkan ke komponen itu. Setelah
 * semua widget jadi, berkas ini DIHAPUS.
 *
 * Bentuknya SVG dengan viewBox tetap supaya tata letak `.layar` bisa dilihat
 * sebelum widgetnya ada: kotak yang sama nanti diisi papan sungguhan.
 */
export default function Rintisan({ nama, keterangan }: { nama: string; keterangan?: string }) {
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label={`widget ${nama} belum dibuat`}>
      <rect x="0.5" y="0.5" width="639" height="399" fill="var(--kertas)" stroke="var(--tinta-20, #cfcac0)" strokeDasharray="6 6" />
      <text x="320" y="180" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="15" letterSpacing="2" fill="var(--tinta-50, #6b6b6b)">
        WIDGET BELUM DIBUAT
      </text>
      <text x="320" y="214" textAnchor="middle" fontFamily="Newsreader, serif" fontSize="26" fill="var(--navy, #101A2B)">
        {nama}
      </text>
      {keterangan && (
        <text x="320" y="248" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="13" fill="var(--tinta-50, #6b6b6b)">
          {keterangan}
        </text>
      )}
    </svg>
  )
}
