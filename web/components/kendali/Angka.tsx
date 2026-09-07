'use client'

import { useId, useState } from 'react'
import { lepas, pegang } from './sedang-diubah'

/**
 * Satu besaran angka: nama dan artinya, angka yang tampil, kolom ketik, dan
 * penggeser. Keempatnya selalu sepakat karena semuanya membaca `nilai` yang
 * sama dan menulis lewat `onUbah` yang sama.
 *
 * Kontrak kendali (spek 5 Sep 2026), butir 1 sampai 4. Butir 5 (seret di
 * layar) bukan urusan komponen ini; widget yang bisa diseret memanggil
 * `onUbah` yang sama dari penangan pointer-nya.
 *
 * KETIK LALU DIPOTONG, BUKAN DITOLAK. Siswa yang mengetik 200 pada sudut
 * yang batasnya 80 mendapat 80, bukan pesan galat dan kolom merah. Kolom
 * ketik menyimpan teks mentah selama diketik (supaya "3," tidak langsung
 * dipaksa jadi 3) dan baru dibulatkan saat fokus lepas atau Enter ditekan.
 *
 * `kunci` dilaporkan ke `sedang-diubah` saat kendali dipegang, supaya widget
 * bisa menyalakan bagian gambarnya.
 */
export default function Angka({
  nama,
  arti,
  nilai,
  onUbah,
  min,
  max,
  langkah = 1,
  satuan = '',
  desimal,
  kunci,
  onPegang,
}: {
  /** nama pendek, misalnya "Sudut θ" atau "h" */
  nama: string
  /** artinya dalam bahasa siswa, misalnya "geser puncak ke kiri-kanan" */
  arti?: string
  nilai: number
  onUbah: (n: number) => void
  min: number
  max: number
  langkah?: number
  /** ditampilkan di belakang angka, misalnya "°" atau " cm" */
  satuan?: string
  /** banyak desimal saat ditampilkan; bawaan mengikuti `langkah` */
  desimal?: number
  /** nama besaran untuk `sedang-diubah`; bawaan `nama` */
  kunci?: string
  /**
   * Dipanggil sekali saat kendali mulai dipegang, SEBELUM nilainya berubah.
   * Dipakai widget yang perlu mengingat keadaan sebelumnya, misalnya parabola
   * yang meninggalkan bayangan bentuk lamanya.
   */
  onPegang?: () => void
}) {
  const id = useId()
  const k = kunci ?? nama
  const tempat = desimal ?? (langkah < 1 ? Math.max(1, -Math.floor(Math.log10(langkah))) : 0)
  const mulaiPegang = () => {
    onPegang?.()
    pegang(k)
  }
  const tampil = nilai.toFixed(tempat).replace('.', ',')

  // Teks mentah kolom ketik selama disunting. `null` berarti tidak sedang
  // disunting, dan kolom menampilkan nilai yang sebenarnya.
  const [ketik, setKetik] = useState<string | null>(null)

  const terapkan = (mentah: string) => {
    const n = Number(mentah.replace(',', '.'))
    if (Number.isFinite(n)) {
      const dijepit = Math.min(max, Math.max(min, n))
      const dibulatkan = Math.round(dijepit / langkah) * langkah
      onUbah(Number(Math.min(max, Math.max(min, dibulatkan)).toFixed(6)))
    }
    setKetik(null)
  }

  return (
    <div className="kendali-angka" data-kunci={k}>
      <label htmlFor={id} className="kendali-nama">
        <span>
          <b>{nama}</b>
          {arti && <span className="kendali-arti"> · {arti}</span>}
        </span>
        <span className="kendali-nilai angka-rata">
          {tampil}
          {satuan}
        </span>
      </label>
      <div className="kendali-baris">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={langkah}
          value={nilai}
          aria-label={nama}
          onChange={(e) => onUbah(Number(e.target.value))}
          onPointerDown={mulaiPegang}
          onPointerUp={() => lepas(k)}
          onPointerCancel={() => lepas(k)}
          onFocus={mulaiPegang}
          onBlur={() => lepas(k)}
        />
        <input
          type="text"
          inputMode="decimal"
          className="kendali-ketik angka-rata"
          aria-label={`${nama}, ketik angka antara ${min} dan ${max}`}
          value={ketik ?? tampil}
          onChange={(e) => setKetik(e.target.value)}
          onFocus={(e) => {
            mulaiPegang()
            e.target.select()
          }}
          onBlur={(e) => {
            terapkan(e.target.value)
            lepas(k)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
            if (e.key === 'Escape') {
              setKetik(null)
              ;(e.target as HTMLInputElement).blur()
            }
          }}
        />
      </div>
    </div>
  )
}
