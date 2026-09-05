'use client'

import { useId, useState } from 'react'
import { lepas, pegang } from './sedang-diubah'

/**
 * Tabel kecil untuk data yang terdiri dari BANYAK angka: nilai sepuluh
 * siswa, isi dua belas botol, atau pasangan (x, y) di diagram pencar.
 *
 * Lahir 5 Sep 2026 dari keluhan ARYA: di Statistika, bola-bola data hanya
 * bisa diseret di gambar, dan menyeretnya sulit. `Angka` cocok untuk SATU
 * besaran; untuk sepuluh angka ia terlalu boros tempat. Di sini tiap angka
 * jadi satu kotak ketik kecil, tanpa penggeser.
 *
 * Kontraknya sama dengan `Angka`: ketik lalu DIPOTONG ke batas, bukan
 * ditolak; teks mentah dipertahankan selama disunting; Enter menerapkan,
 * Escape membatalkan. Saat sebuah kotak dipegang, ia melapor
 * `${kunci}-${indeks}` ke `sedang-diubah`, dan widget menyalakan bola yang
 * bersangkutan di gambar. Sebaliknya, bola yang diseret di gambar
 * memperbarui kotaknya lewat `nilai` yang sama.
 *
 * Satu komponen untuk dua bentuk data: `nilai` berupa `number[]` (satu
 * kolom) atau `[number, number][]` (dua kolom, x dan y). Bentuknya dibaca
 * dari isinya, jadi widget tidak perlu memilih varian.
 */

type Pasangan = [number, number]

type PropDasar = {
  /** nama kumpulan datanya, misalnya "Nilai siswa Kelas B" */
  nama: string
  /** artinya dalam bahasa siswa */
  arti?: string
  /** label tiap baris; bawaan nomor urut */
  label?: (indeks: number) => string
  /** awalan kunci `sedang-diubah`; bawaan `nama` */
  kunci?: string
  /** banyak desimal yang ditampilkan; bawaan mengikuti `langkah` */
  desimal?: number
}

type PropSatu = PropDasar & {
  nilai: number[]
  onUbah: (indeks: number, nilaiBaru: number) => void
  min: number
  max: number
  langkah?: number
}

type PropDua = PropDasar & {
  nilai: Pasangan[]
  onUbah: (indeks: number, nilaiBaru: Pasangan) => void
  min: Pasangan
  max: Pasangan
  langkah?: Pasangan
  /** nama kedua kolom; bawaan "x" dan "y" */
  kolom?: [string, string]
}

const tempatDesimal = (langkah: number, desimal?: number) =>
  desimal ?? (langkah < 1 ? Math.max(1, -Math.floor(Math.log10(langkah))) : 0)

const tampilkan = (n: number, tempat: number) => n.toFixed(tempat).replace('.', ',')

/** Satu kotak ketik: teks mentah selama disunting, dipotong dan dibulatkan saat lepas. */
function Kotak({
  id, nilai, min, max, langkah, tempat, label, onUbah, onPegang, onLepas,
}: {
  id: string
  nilai: number
  min: number
  max: number
  langkah: number
  tempat: number
  label: string
  onUbah: (n: number) => void
  onPegang: () => void
  onLepas: () => void
}) {
  const [ketik, setKetik] = useState<string | null>(null)
  const tampil = tampilkan(nilai, tempat)

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
    <input
      id={id}
      type="text"
      inputMode="decimal"
      className="tabel-ketik angka-rata"
      aria-label={`${label}, ketik angka antara ${min} dan ${max}`}
      value={ketik ?? tampil}
      onChange={(e) => setKetik(e.target.value)}
      onFocus={(e) => {
        onPegang()
        e.target.select()
      }}
      onBlur={(e) => {
        terapkan(e.target.value)
        onLepas()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
        if (e.key === 'Escape') {
          setKetik(null)
          ;(e.target as HTMLInputElement).blur()
        }
      }}
    />
  )
}

export default function TabelData(prop: PropSatu | PropDua) {
  const id = useId()
  const k = prop.kunci ?? prop.nama
  const label = prop.label ?? ((i: number) => String(i + 1))
  const dua = prop.nilai.length > 0 && Array.isArray(prop.nilai[0])

  return (
    <div className={`kendali-tabel${dua ? ' dua-kolom' : ''}`} data-kunci={k}>
      <div className="kendali-nama">
        <span>
          <b>{prop.nama}</b>
          {prop.arti && <span className="kendali-arti"> · {prop.arti}</span>}
        </span>
        <span className="kendali-nilai angka-rata">{prop.nilai.length} data</span>
      </div>
      <div className="tabel-data" role="group" aria-label={prop.nama}>
        {dua
          ? (prop as PropDua).nilai.map((pasang, i) => {
              const p = prop as PropDua
              const langkah = p.langkah ?? [1, 1]
              const kolom = p.kolom ?? ['x', 'y']
              return (
                <div className="tabel-sel" key={i}>
                  <span className="tabel-label">{label(i)}</span>
                  <div className="tabel-pasangan">
                    {([0, 1] as const).map((c) => (
                      <label key={c} className="tabel-kolom">
                        <span>{kolom[c]}</span>
                        <Kotak
                          id={`${id}-${i}-${c}`}
                          nilai={pasang[c]}
                          min={p.min[c]}
                          max={p.max[c]}
                          langkah={langkah[c]}
                          tempat={tempatDesimal(langkah[c], p.desimal)}
                          label={`${label(i)}, ${kolom[c]}`}
                          onUbah={(n) => {
                            const baru: Pasangan = [pasang[0], pasang[1]]
                            baru[c] = n
                            p.onUbah(i, baru)
                          }}
                          onPegang={() => pegang(`${k}-${i}`)}
                          onLepas={() => lepas(`${k}-${i}`)}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )
            })
          : (prop as PropSatu).nilai.map((v, i) => {
              const p = prop as PropSatu
              const langkah = p.langkah ?? 1
              return (
                <label className="tabel-sel" key={i} htmlFor={`${id}-${i}`}>
                  <span className="tabel-label">{label(i)}</span>
                  <Kotak
                    id={`${id}-${i}`}
                    nilai={v}
                    min={p.min}
                    max={p.max}
                    langkah={langkah}
                    tempat={tempatDesimal(langkah, p.desimal)}
                    label={label(i)}
                    onUbah={(n) => p.onUbah(i, n)}
                    onPegang={() => pegang(`${k}-${i}`)}
                    onLepas={() => lepas(`${k}-${i}`)}
                  />
                </label>
              )
            })}
      </div>
    </div>
  )
}
