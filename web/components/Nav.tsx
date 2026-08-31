import Link from 'next/link'

export default function Nav({ kode }: { kode?: string }) {
  return (
    <nav className="nav">
      <Link href="/" className="merk" style={{ color: 'var(--tinta)', textDecoration: 'none' }}>
        Matra<i>·</i>
      </Link>
      <Link href="/" className="on">Topik</Link>
      <Link href="/latihan">Latihan</Link>
      <Link href="/tentang">Tentang</Link>
      <div className="sp" />
      {kode ? <span className="kode">{kode}</span> : <span className="kode">Kelas 10 — 12</span>}
    </nav>
  )
}
