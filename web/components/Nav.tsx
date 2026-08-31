import Link from 'next/link'
import Image from 'next/image'

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
 */
export default function Nav({ label }: { label?: string }) {
  return (
    <nav className="nav">
      <Link href="/" className="merk" aria-label="MATRA, halaman depan">
        <Image
          src="/merek/matra-simbol.png"
          alt=""
          width={40}
          height={44}
          className="merk-ikon"
          priority
        />
      </Link>
      <Link href="/" className="on">Beranda</Link>
      <Link href="/#materi">Topik</Link>
      <Link href="/latihan">Latihan</Link>
      <Link href="/tentang">Tentang</Link>
      <div className="sp" />
      <span className="kode">{label ?? 'Matematika SMA'}</span>
    </nav>
  )
}
