'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { bacaKemajuan } from '@/lib/kemajuan'
import { langgan } from '@/lib/simpanan'
import KartuBayang from './KartuBayang'
import MunculSaatGulir from './MunculSaatGulir'

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
 *
 * PEROMBAKAN 3 Sep 2026 (permintaan ARYA):
 *
 * 1. TIAP MATERI BISA DIKLIK. Sebelumnya daftar materi hanya tulisan, dan
 *    satu-satunya jalan masuk adalah tombol di kaki kartu. Halaman ini
 *    berjudul Peta Materi, jadi materinya sendiri yang harus jadi pintu.
 *    Tautannya membawa nomor materi (`?materi=`), dan halaman topik membuka
 *    tepat di materi itu.
 *
 * 2. TOMBOL UTAMA MENGIKUTI KEADAAN, bukan selalu menyebut kuis:
 *      belum pernah dibuka  -> "Mulai"
 *      baru sebagian        -> "Lanjutkan Materi 07" (materi pertama yang
 *                              BELUM dibuka menurut urutan sub-bab, bukan
 *                              sekadar jumlah yang sudah dibuka)
 *      sudah semua          -> "Ulangi belajar", dan tautan kuis muncul
 *                              karena syarat kuis otomatis terpenuhi.
 */

export type MateriTampil = {
  no: number
  judul: string
  /** slug tahap, dipakai sebagai alamat `?materi=` */
  slug: string
  siap: boolean
}

export type SubTampil = {
  huruf: string
  nama: string
  jumlah: number
  materi: MateriTampil[]
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

const dua = (n: number) => String(n).padStart(2, '0')

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
          <div className="kisi-bab">
            {k.isi.map((b, i) => {
              const sudah = new Set(dibuka[b.slug] ?? [])
              const jumlahDibuka = b.slugTahap.filter((s) => sudah.has(s)).length
              const tuntas = jumlahDibuka >= b.jumlahMateri && b.jumlahMateri > 0
              const persen = Math.round((jumlahDibuka / b.jumlahMateri) * 100)
              const tampil = Math.round(persen * maju)
              const offset = (KELILING - (KELILING * persen * maju) / 100).toFixed(1)

              // Materi pertama yang BELUM dibuka, menurut urutan sub-bab.
              // Bukan `jumlahDibuka + 1`: siswa boleh melompat, dan kalau ia
              // membuka materi 05 lebih dulu, "lanjutkan" harus tetap
              // menunjuk materi 01, bukan materi 02.
              const semuaMateri = b.sub.flatMap((s) => s.materi)
              const lanjut = semuaMateri.find((m) => !sudah.has(m.slug))

              const aksi = tuntas
                ? 'Ulangi belajar'
                : jumlahDibuka === 0
                  ? 'Mulai'
                  : `Lanjutkan Materi ${dua(lanjut?.no ?? 1)}`
              // Ke mana tombolnya membawa: awal saat mengulang, materi
              // terakhir yang belum dibuka saat melanjutkan.
              const tujuan =
                tuntas || !lanjut
                  ? `/topik/${b.slug}`
                  : `/topik/${b.slug}?materi=${lanjut.slug}`

              // Hijau saat 100 persen, emas selama masih berjalan. Warna
              // yang berubah di ujung membuat "selesai" terasa sebagai
              // peristiwa, bukan sekadar angka yang kebetulan 100.
              const warnaMaju = tuntas ? '#6E9C7A' : '#B08A3E'

              return (
                <MunculSaatGulir key={b.slug} tunda={(i % 2) * 90}>
                <KartuBayang
                  className="kartu-mantra kartu-bab"
                  data-mulai={jumlahDibuka > 0}
                  data-tuntas={tuntas}
                >
                  {/* Garis emas di bibir atas kartu. Ia tumbuh dari kiri saat
                      babnya sudah pernah dibuka atau saat kursor lewat, jadi
                      "sudah pernah ke sini" terbaca sebelum angka persennya
                      sempat dibaca. */}
                  <span className="bab-nyala" aria-hidden />
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
                          stroke={warnaMaju} strokeWidth="3.2" strokeLinecap="round"
                          strokeDasharray={KELILING} strokeDashoffset={offset}
                        />
                      </svg>
                      <span className="isi">{tampil}%</span>
                    </div>
                  </div>

                  {/* SATU BARIS PER SUB-BAB, bisa diklik, membuka materi
                      pertama sub-bab itu. Sampai 4 Sep 2026 tiap sub-bab
                      diikuti daftar keping berisi seluruh judul materinya,
                      sehingga satu kartu bab bisa setinggi 700 piksel dan
                      halaman ini terbaca sebagai daftar isi yang padat, bukan
                      sebagai peta. Pemilihan materi satu per satu tetap ada,
                      tempatnya di daftar materi halaman belajar. */}
                  <div className="bab-sub">
                    {b.sub.map((s) => {
                      const selesai = s.materi.filter((m) => sudah.has(m.slug)).length
                      const awal = s.materi.find((m) => m.siap) ?? s.materi[0]
                      const isi = (
                        <>
                          <span className="huruf">{s.huruf}</span>
                          <span className="nama">{s.nama}</span>
                          <span className="hitung angka-rata">
                            {selesai}/{s.jumlah}
                          </span>
                        </>
                      )
                      return awal?.siap ? (
                        <Link
                          key={s.huruf}
                          href={`/topik/${b.slug}?materi=${awal.slug}`}
                          className="bab-sub-baris"
                          title={`Buka ${s.nama}, mulai dari ${awal.judul}`}
                        >
                          {isi}
                        </Link>
                      ) : (
                        <span
                          key={s.huruf}
                          className="bab-sub-baris mati"
                          title="Sub-bab ini belum dibangun"
                        >
                          {isi}
                        </span>
                      )
                    })}
                  </div>

                  <div className="bab-aksi">
                    <Link
                      href={tujuan}
                      className="pil-kecil-emas"
                      style={{ background: warnaMaju }}
                    >
                      {aksi}
                    </Link>
                    <Link href={`/latihan/${b.slug}`} className="pil-kecil-garis">
                      Latihan bab
                    </Link>
                    {/* Kuis hanya muncul kalau seluruh materi sudah dibuka.
                        Syarat kuncinya memang itu, jadi menampilkannya lebih
                        awal berarti menjanjikan tombol yang akan mati. */}
                    {tuntas && (
                      <Link href={`/topik/${b.slug}?materi=kuis`} className="pil-kecil-garis">
                        Kuis
                      </Link>
                    )}
                  </div>
                </KartuBayang>
                </MunculSaatGulir>
              )
            })}
          </div>
        </section>
      ))}
    </>
  )
}
