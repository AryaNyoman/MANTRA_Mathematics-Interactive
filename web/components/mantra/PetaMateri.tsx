'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { bacaKemajuan } from '@/lib/kemajuan'
import { langgan } from '@/lib/simpanan'
import KartuBayang from './KartuBayang'

/**
 * Peta Materi: enam bab dikelompokkan per kelas, tiap bab memperlihatkan
 * sub-babnya dan seberapa jauh siswa sudah berjalan.
 *
 * Kemajuan dibaca dari `localStorage` lewat `lib/kemajuan.ts` yang sudah ada,
 * bukan dihitung ulang di sini. Karena `localStorage` tidak ada di server,
 * angkanya dimulai dari nol pada gambaran pertama lalu terisi setelah
 * komponen hidup di peramban; itu juga yang membuat animasi cincin terlihat
 * bergerak dari nol, bukan melompat ke angka akhir.
 *
 * `langgan` membuat kartu ikut berubah saat tab lain menyimpan kemajuan baru,
 * jadi dua tab yang terbuka tidak menampilkan angka yang berbeda.
 */

export type SubTampil = {
  huruf: string
  nama: string
  jumlah: number
  /** ringkasan "01 Judul · 02 Judul", sudah dirakit di server */
  ringkas: string
  nomor: number[]
}

export type BabTampil = {
  slug: string
  no: number
  kelas: string
  urutanKelas: number
  sumber: string
  nama: string
  pertanyaan: string
  jumlahMateri: number
  /** slug tahap urut belajar, dipakai menghitung yang sudah dibuka */
  slugTahap: string[]
  sub: SubTampil[]
}

/** Keliling lingkaran berjari-jari 17 pada viewBox 40, dibulatkan seperti rancangan. */
const KELILING = 107

export default function PetaMateri({ bab }: { bab: BabTampil[] }) {
  const [dibuka, setDibuka] = useState<Record<string, string[]>>({})
  // `maju` naik dari 0 ke 1 sekali saat komponen hidup, dipakai supaya cincin
  // dan angka persen bertumbuh, bukan langsung terpampang.
  const [maju, setMaju] = useState(0)

  useEffect(() => {
    const baca = () => {
      const isi: Record<string, string[]> = {}
      for (const b of bab) isi[b.slug] = bacaKemajuan(b.slug).dibuka
      setDibuka(isi)
    }
    baca()
    return langgan(baca)
  }, [bab])

  useEffect(() => {
    const kurangiGerak = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (kurangiGerak) {
      // Lewat requestAnimationFrame, BUKAN setMaju(1) langsung. React 19
      // melarang setState serentak di dalam effect (react-hooks/set-state-in-effect)
      // karena memicu gambar ulang berantai; menundanya satu frame membuatnya
      // jatuh di luar fase itu, dan bagi mata hasilnya sama saja.
      const id = requestAnimationFrame(() => setMaju(1))
      return () => cancelAnimationFrame(id)
    }
    const mulai = performance.now()
    let hidup = true
    const langkah = (t: number) => {
      if (!hidup) return
      const p = Math.min(1, (t - mulai) / 900)
      // Pelan di akhir: 1 - (1-p)^3, sesuai rancangan.
      setMaju(1 - Math.pow(1 - p, 3))
      if (p < 1) requestAnimationFrame(langkah)
    }
    requestAnimationFrame(langkah)
    return () => {
      hidup = false
    }
  }, [])

  const kelompok = [
    { nama: 'Kelas 10 dan 11', isi: bab.filter((b) => b.urutanKelas === 10) },
    { nama: 'Kelas 12', isi: bab.filter((b) => b.urutanKelas === 12) },
  ]

  return (
    <>
      {kelompok.map((k) => (
        <section key={k.nama}>
          <div className="kelas-tajuk">
            <h2>{k.nama}</h2>
            <span className="jml angka-rata">{k.isi.length} bab</span>
            <span className="rel" />
          </div>
          <div className="kisi-dua">
            {k.isi.map((b) => {
              const sudah = dibuka[b.slug] ?? []
              const jumlahDibuka = b.slugTahap.filter((s) => sudah.includes(s)).length
              const persen = Math.round((jumlahDibuka / b.jumlahMateri) * 100)
              const tampil = Math.round(persen * maju)
              const offset = (KELILING - (KELILING * persen * maju) / 100).toFixed(1)
              // Aksi menyesuaikan keadaan: belum mulai, sedang berjalan, atau tuntas.
              const aksi =
                jumlahDibuka === 0
                  ? 'Mulai'
                  : jumlahDibuka >= b.jumlahMateri
                    ? 'Ulangi kuis'
                    : `Lanjut Materi ${String(jumlahDibuka + 1).padStart(2, '0')}`

              return (
                <KartuBayang key={b.slug} className="kartu-mantra kartu-bab">
                  <div className="bab-atas">
                    <div>
                      <div className="bab-kicker">
                        Bab {b.no} · {b.kelas} · {b.sumber}
                      </div>
                      <h3>{b.nama}</h3>
                      <p className="bab-tanya">{b.pertanyaan}</p>
                    </div>
                    <div
                      className="cincin"
                      role="img"
                      aria-label={`Kemajuan ${persen} persen`}
                    >
                      <svg viewBox="0 0 40 40" aria-hidden="true">
                        <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(16,26,43,.12)" strokeWidth="3.2" />
                        <circle
                          className="maju"
                          cx="20" cy="20" r="17" fill="none"
                          stroke="#B08A3E" strokeWidth="3.2" strokeLinecap="round"
                          strokeDasharray={KELILING} strokeDashoffset={offset}
                        />
                      </svg>
                      <span className="isi">{tampil}%</span>
                    </div>
                  </div>

                  <div className="bab-sub">
                    {b.sub.map((s) => (
                      <div key={s.huruf} className="bab-sub-baris">
                        <span className="huruf">{s.huruf}</span>
                        <div>
                          <div className="nama">{s.nama}</div>
                          <div className="materi">{s.ringkas}</div>
                        </div>
                        <span className="jml">{s.jumlah} materi</span>
                      </div>
                    ))}
                  </div>

                  <div className="bab-aksi">
                    <Link href={`/topik/${b.slug}`} className="pil-kecil-emas">
                      {aksi}
                    </Link>
                    <Link href={`/latihan/${b.slug}`} className="pil-kecil-garis">
                      Latihan bab
                    </Link>
                  </div>
                </KartuBayang>
              )
            })}
          </div>
        </section>
      ))}
    </>
  )
}
