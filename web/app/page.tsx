import Link from 'next/link'
import Nav from '@/components/Nav'
import { TOPIK } from '@/content/topik'

export default function Beranda() {
  return (
    <>
      <Nav />
      <main className="beranda">
        <div className="jalur">Matematika SMA · Kurikulum Merdeka</div>
        <h1>Bukan menghafal rumus.<br />Melihat kenapa rumusnya begitu.</h1>
        <p className="sub">
          Tiap topik dimulai dari animasi yang menjelaskan, lalu alat yang bisa Anda geser
          sendiri — supaya bedanya terasa, bukan sekadar dibaca.
        </p>

        <div className="kisi">
          {TOPIK.map((t) => (
            <Link
              key={t.slug}
              href={`/topik/${t.slug}`}
              className="kartu-topik"
              data-siap={t.siap}
            >
              {t.unggulan && <span className="bintang">★ UNGGULAN</span>}
              <div className="jalur">{t.kelas}</div>
              <h2>{t.nama}</h2>
              <p>{t.pertanyaan}</p>
              <p style={{ marginTop: 10, fontStyle: 'italic' }}>
                Melawan: {t.miskonsepsiSingkat}
              </p>
              {!t.siap && <span className="belum">belum dibangun</span>}
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
