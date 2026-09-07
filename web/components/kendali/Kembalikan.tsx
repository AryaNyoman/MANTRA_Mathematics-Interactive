'use client'

/**
 * Tombol "Kembalikan semula" untuk widget yang bisa diseret.
 *
 * Keluhan ARYA 5 Sep 2026: siswa yang sudah menyeret terlalu jauh "bingung
 * cara untuk mengembalikan seperti semula". Jendela yang dikunci mencegah
 * tersesat, dan tombol ini memberi jalan pulang yang selalu sama di semua
 * widget: satu tombol, satu kalimat, di bawah kendali, di atas petunjuk.
 */
export default function Kembalikan({ onClick, label = 'Kembalikan semula' }: {
  onClick: () => void
  label?: string
}) {
  return (
    <button type="button" className="tombol garis kendali-kembali" onClick={onClick}>
      {label}
    </button>
  )
}
