'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { BAB } from '@/content/subbab'
import { cariTopik } from '@/content/topik'
import { bacaKemajuan } from '@/lib/kemajuan'
import { langgan } from '@/lib/simpanan'

/**
 * Laci "Lanjutkan" di nav (permintaan ARYA, 10 Sep 2026).
 *
 * Sebelumnya "Lanjutkan" adalah satu pil di ujung kanan nav yang membawa ke
 * SATU tujuan: materi terakhir yang dibuka. Siswa yang belajar tidak urut
 * (Vektor dulu, lalu loncat ke Limit) bingung: tujuan tombolnya tidak
 * terbaca, dan letaknya di kanan pun sering tidak terlihat. Sekarang ia
 * duduk di samping "Peta Materi", dan menekannya membuka daftar SEMUA bab
 * dengan persen kemajuannya, jadi siswa memilih sendiri bab mana yang mau
 * diteruskan. Empat bab terlihat sekaligus; sisanya digulir di dalam laci.
 *
 * Angka persennya berjalan dari 0 ke nilainya tiap kali laci dibuka, seperti
 * cincin di Peta Materi, supaya "kemajuan" terasa sebagai sesuatu yang
 * bertambah, bukan angka mati. `prefers-reduced-motion` langsung ke angka
 * akhir.
 *
 * Tujuan tiap baris `?materi=lanjut`: halaman topiklah yang tahu materi mana
 * yang belum dibuka (ia punya daftar materinya dan catatan kemajuannya),
 * jadi nav tidak perlu memuat seluruh isi materi ke tiap halaman. Jumlah
 * materi per bab diambil dari `subbab.ts` yang ringan.
 */

const DAFTAR = BAB.map((b) => ({
  slug: b.slug,
  nama: cariTopik(b.slug)?.nama ?? b.slug,
  jumlah: b.sub.reduce((n, s) => n + s.nomor.length, 0),
}))

export default function LaciLanjut({ onPilih }: { onPilih?: () => void }) {
  const [buka, setBuka] = useState(false)
  const [maju, setMaju] = useState(0)
  const [dibuka, setDibuka] = useState<Record<string, number>>({})
  const akar = useRef<HTMLDivElement>(null)
  const idPanel = useId()
  const jalur = usePathname() ?? '/'

  // Kemajuan dibaca saat laci dibuka, dan ikut berubah kalau tab lain
  // menyimpan kemajuan baru. Pola yang sama dengan `PetaMateri`.
  useEffect(() => {
    if (!buka) return
    const baca = () => {
      const isi: Record<string, number> = {}
      for (const b of DAFTAR) isi[b.slug] = bacaKemajuan(b.slug).dibuka.length
      setDibuka(isi)
    }
    baca()
    return langgan(baca)
  }, [buka])

  // Angka berjalan 0 ke 1 selama 600 ms, pelan di akhir (1 - (1-p)^3).
  useEffect(() => {
    if (!buka) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const id = requestAnimationFrame(() => setMaju(1))
      return () => cancelAnimationFrame(id)
    }
    // Mulai 80 ms sesudah panelnya naik masuk (rancangan gerak: batang
    // menyusul panel), lalu 600 ms.
    const mulai = performance.now() + 80
    let hidup = true
    const langkah = (t: number) => {
      if (!hidup) return
      const p = Math.min(1, Math.max(0, (t - mulai) / 600))
      setMaju(1 - Math.pow(1 - p, 3))
      if (p < 1) requestAnimationFrame(langkah)
    }
    const id = requestAnimationFrame(langkah)
    return () => {
      hidup = false
      cancelAnimationFrame(id)
    }
  }, [buka])

  // Tutup saat Esc, saat menekan di luar laci, dan saat alamat berganti.
  useEffect(() => {
    if (!buka) return
    const saatTekan = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setBuka(false)
    }
    const saatKlik = (e: MouseEvent) => {
      if (akar.current && !akar.current.contains(e.target as Node)) setBuka(false)
    }
    window.addEventListener('keydown', saatTekan)
    window.addEventListener('mousedown', saatKlik)
    return () => {
      window.removeEventListener('keydown', saatTekan)
      window.removeEventListener('mousedown', saatKlik)
    }
  }, [buka])

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setBuka(false)
      setMaju(0)
    })
    return () => cancelAnimationFrame(id)
  }, [jalur])

  return (
    <div className="nav-laci" ref={akar} data-buka={buka}>
      <button
        type="button"
        className="nav-tab nav-laci-tombol"
        aria-expanded={buka}
        aria-controls={idPanel}
        onClick={() => {
          setMaju(0)
          setBuka((b) => !b)
        }}
      >
        Lanjutkan
        <span className="nav-laci-panah" aria-hidden>
          &#9662;
        </span>
      </button>
      {buka && (
        <div className="nav-laci-panel" id={idPanel} role="menu" aria-label="Kemajuan tiap bab">
          <div className="nav-laci-judul">Kemajuan tiap bab</div>
          {DAFTAR.map((b) => {
            const n = dibuka[b.slug] ?? 0
            const persen = b.jumlah ? Math.min(100, Math.round((n / b.jumlah) * 100)) : 0
            const tuntas = persen >= 100
            return (
              <Link
                key={b.slug}
                href={`/topik/${b.slug}?materi=lanjut`}
                className="nav-laci-baris"
                role="menuitem"
                data-tuntas={tuntas}
                title={tuntas ? `${b.nama}: semua materi sudah dibuka` : `Lanjutkan ${b.nama}`}
                onClick={() => {
                  setBuka(false)
                  onPilih?.()
                }}
              >
                <span className="nama">{b.nama}</span>
                <span className="persen angka-rata">{Math.round(persen * maju)}%</span>
                <span className="batang" aria-hidden>
                  {/* scaleX, bukan width: digerakkan compositor, tidak memicu
                      tata letak ulang tiap bingkai (sistem gerak tahap 3). */}
                  <span style={{ transform: `scaleX(${(persen * maju) / 100})` }} />
                </span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
