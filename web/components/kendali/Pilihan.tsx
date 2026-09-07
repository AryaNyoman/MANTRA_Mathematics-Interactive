'use client'

/**
 * Pilihan dari beberapa kemungkinan: tombol segmen dalam satu pil, yang aktif
 * terisi navy. Untuk besaran yang bukan angka kontinu, misalnya sudut mana
 * yang sedang dilihat, atau transformasi mana yang dipakai.
 *
 * Bentuknya sama dengan segmen "Tonton / Coba sendiri" di halaman belajar,
 * supaya siswa mengenali "ini pilihan" tanpa dijelaskan.
 */
export default function Pilihan<T extends string>({
  nama,
  arti,
  pilihan,
  nilai,
  onPilih,
}: {
  nama: string
  arti?: string
  pilihan: { nilai: T; label: string }[]
  nilai: T
  onPilih: (n: T) => void
}) {
  return (
    <div className="kendali-pilihan" role="group" aria-label={nama}>
      <div className="kendali-nama">
        <span>
          <b>{nama}</b>
          {arti && <span className="kendali-arti"> · {arti}</span>}
        </span>
      </div>
      <div className="pilihan-segmen">
        {pilihan.map((p) => (
          <button
            key={p.nilai}
            type="button"
            aria-pressed={p.nilai === nilai}
            onClick={() => onPilih(p.nilai)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  )
}
