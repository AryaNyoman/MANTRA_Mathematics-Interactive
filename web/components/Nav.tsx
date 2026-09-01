'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

/**
 * `label` diisi nama topik, misalnya "Trigonometri".
 *
 * Sebelumnya di sini tampil kode seperti "TRIG-10-B4". Kode itu berguna untuk
 * yang membangun situs, tapi bagi siswa ia hanya deretan huruf tanpa arti.
 * (Permintaan ARYA, 1 Sep 2026.)
 *
 * REVISI 1 Sep 2026: lambangnya saja, tanpa tulisan "Matra" di sebelahnya,
 * dan ukurannya dinaikkan supaya terbaca sebagai logo, bukan ikon kecil.
 * Tulisan "Matra" di situ mengulang apa yang sudah dikatakan lambangnya.
 *
 * "Beranda" ditambahkan sebagai menu tersendiri. Dulu satu-satunya jalan
 * kembali ke halaman perkenalan adalah mengeklik logo, dan itu tidak terlihat
 * seperti tautan bagi orang yang belum terbiasa.
 *
 * REVISI 2 Sep 2026 (sesi UI/UX): di layar sempit isinya butuh 428 piksel
 * padahal layar HP cuma 375, jadi seluruh situs bisa digeser ke samping dan
 * lencana nama topik terpotong. Sekarang di bawah 860 piksel tautan dan
 * lencana pindah ke balik tombol tiga garis. (Keputusan ARYA, 1 Sep 2026.)
 *
 * Komponen ini jadi komponen klien karena menyimpan keadaan buka atau tutup.
 * Tanpa pustaka tambahan: satu `useState` dan satu pendengar tombol Esc.
 *
 * Di layar lebar `.nav-menu` memakai `display: contents`, artinya kotaknya
 * sendiri tidak ikut menggambar apa pun dan keempat tautan tetap menjadi
 * anak langsung baris nav persis seperti sebelumnya. Itu sebabnya tampilan
 * laptop tidak berubah sedikit pun oleh pembungkus baru ini.
 */
export default function Nav({ label }: { label?: string }) {
  const [buka, setBuka] = useState(false)

  // Esc menutup menu. Tanpa ini, di layar sentuh yang memakai papan ketik
  // luar menu hanya bisa ditutup dengan menekan tombolnya lagi.
  useEffect(() => {
    if (!buka) return
    const saatTekan = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setBuka(false)
    }
    window.addEventListener('keydown', saatTekan)
    return () => window.removeEventListener('keydown', saatTekan)
  }, [buka])

  const tutup = () => setBuka(false)

  return (
    <nav className="nav">
      <Link href="/" className="merk" aria-label="MATRA, halaman depan" onClick={tutup}>
        <Image
          src="/merek/matra-simbol.png"
          alt=""
          width={40}
          height={44}
          className="merk-ikon"
          priority
        />
      </Link>

      <div className="nav-menu" id="nav-menu" data-buka={buka}>
        <Link href="/" className="on" onClick={tutup}>Beranda</Link>
        <Link href="/#materi" onClick={tutup}>Topik</Link>
        <Link href="/latihan" onClick={tutup}>Latihan</Link>
        <Link href="/tentang" onClick={tutup}>Tentang</Link>
        <span className="kode">{label ?? 'Matematika SMA'}</span>
      </div>

      <button
        type="button"
        className="nav-tombol"
        aria-expanded={buka}
        aria-controls="nav-menu"
        aria-label={buka ? 'Tutup menu' : 'Buka menu'}
        onClick={() => setBuka((b) => !b)}
      >
        <span aria-hidden />
        <span aria-hidden />
        <span aria-hidden />
      </button>
    </nav>
  )
}
