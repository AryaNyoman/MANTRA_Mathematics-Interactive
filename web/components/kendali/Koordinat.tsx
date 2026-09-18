'use client'

import TeksMat from '@/components/latihan/TeksMat'
import Angka from './Angka'

/**
 * Satu vektor atau titik: dua kolom `x` dan `y`, ditambah pratinjau hidup
 * dalam dua notasi lain, bentuk kolom dan bentuk i-j.
 *
 * Keputusan ARYA 5 Sep 2026: kolom isiannya x dan y (paling mudah di HP dan
 * bentuk kolom yang dipakai buku sekolah), tetapi ketiga bentuknya
 * ditampilkan bersamaan supaya siswa melihat bahwa (4, 3), kolom 4 di atas 3,
 * dan 4i + 3j adalah SATU benda yang sama ditulis tiga cara.
 *
 * Pembulatannya mengikuti `langkah` supaya sama dengan hasil seretan di layar
 * (widget Vektor membulatkan ke 0,5). Kalau tidak sama, mengetik 3 lalu
 * menyeret sedikit akan mengembalikan 3 menjadi 3,0 lalu 2,5, dan itu terasa
 * seperti alatnya bandel.
 */
export default function Koordinat({
  nama,
  arti,
  nilai,
  onUbah,
  batas,
  langkah = 0.5,
  kunci,
  vektor = true,
}: {
  nama: string
  arti?: string
  nilai: { x: number; y: number }
  onUbah: (v: { x: number; y: number }) => void
  /** batas mutlak tiap komponen; x dan y boleh berbeda */
  batas: { x: number; y: number }
  langkah?: number
  kunci?: string
  /** false untuk TITIK (tanpa pratinjau i-j, sebab titik bukan vektor) */
  vektor?: boolean
}) {
  const k = kunci ?? nama
  const rapi = (n: number) => String(Number(n.toFixed(2))).replace('.', ',')
  const tandaJ = nilai.y < 0 ? '-' : '+'

  return (
    <div className="kendali-koordinat" data-kunci={k}>
      <div className="kendali-nama">
        <span>
          <b><TeksMat teks={nama} blok={false} /></b>
          {arti && <span className="kendali-arti"> · <TeksMat teks={arti} blok={false} /></span>}
        </span>
        <span className="kendali-notasi angka-rata" aria-label={`${nama} sama dengan ${rapi(nilai.x)} koma ${rapi(nilai.y)}`}>
          <span className="notasi-kolom" aria-hidden="true">
            <i>{rapi(nilai.x)}</i>
            <i>{rapi(nilai.y)}</i>
          </span>
          {vektor && (
            <span className="notasi-ij" aria-hidden="true">
              {rapi(nilai.x)}i {tandaJ} {rapi(Math.abs(nilai.y))}j
            </span>
          )}
        </span>
      </div>
      <div className="kendali-dua">
        <Angka
          nama="x"
          nilai={nilai.x}
          onUbah={(x) => onUbah({ x, y: nilai.y })}
          min={-batas.x}
          max={batas.x}
          langkah={langkah}
          kunci={k}
        />
        <Angka
          nama="y"
          nilai={nilai.y}
          onUbah={(y) => onUbah({ x: nilai.x, y })}
          min={-batas.y}
          max={batas.y}
          langkah={langkah}
          kunci={k}
        />
      </div>
    </div>
  )
}
