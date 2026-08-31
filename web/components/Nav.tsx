import Link from 'next/link'
import Image from 'next/image'

/**
 * `label` diisi nama topik, misalnya "Trigonometri".
 *
 * Sebelumnya di sini tampil kode seperti "TRIG-10-B4". Kode itu berguna untuk
 * yang membangun situs, tapi bagi siswa ia hanya deretan huruf tanpa arti.
 * (Permintaan ARYA, 1 Sep 2026.)
 */
export default function Nav({ label }: { label?: string }) {
  return (
    <nav className="nav">
      <Link href="/" className="merk" aria-label="MATRA, halaman depan">
        <Image
          src="/merek/matra-simbol.png"
          alt=""
          width={22}
          height={24}
          className="merk-ikon"
        />
        Matra<i>·</i>
      </Link>
      <Link href="/" className="on">Topik</Link>
      <Link href="/latihan">Latihan</Link>
      <Link href="/tentang">Tentang</Link>
      <div className="sp" />
      <span className="kode">{label ?? 'Matematika SMA'}</span>
    </nav>
  )
}
