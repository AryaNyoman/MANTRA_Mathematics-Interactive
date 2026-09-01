'use client'

/**
 * Tombol pilihan kecil untuk panel kendali widget Ruang 3D.
 *
 * KENAPA GAYANYA DITULIS DI SINI, BUKAN DI globals.css
 * Berkas `app/globals.css` milik sesi MATRA-DESAIN-UI-UX, dan aturan sesi
 * paralel melarang menyentuh berkas yang bukan wilayah sendiri. Kelas `.tombol`
 * yang sudah ada berupa tombol blok besar, tidak cocok untuk deretan sembilan
 * pilihan pendek seperti AB, CG, AG.
 *
 * Nilainya sengaja menyalin bahasa rupa `.tombol` dan `.tombol.garis` yang ada
 * di sana: sudut membulat 8, huruf IBM Plex Mono, dan warna dari peubah yang
 * sama. Jadi ia terlihat sekeluarga, bukan gaya baru yang dikarang sendiri.
 * Kalau nanti kelas kecil resmi dibuat di globals.css, berkas ini tinggal
 * diganti pakai kelas itu.
 */
export default function TombolPilih({
  aktif,
  onClick,
  children,
}: {
  aktif: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={aktif}
      onClick={onClick}
      style={{
        background: aktif ? 'var(--tegas)' : 'transparent',
        color: aktif ? 'var(--kartu)' : 'var(--tinta)',
        border: `1px solid ${aktif ? 'var(--tegas)' : 'var(--garis)'}`,
        padding: '7px 11px',
        borderRadius: 8,
        fontFamily: 'var(--font-plex-mono), monospace',
        fontSize: 11,
        letterSpacing: '0.07em',
        cursor: 'pointer',
        lineHeight: 1.2,
      }}
    >
      {children}
    </button>
  )
}
