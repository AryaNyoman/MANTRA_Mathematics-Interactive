import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import HalamanTopik from '@/components/topik/HalamanTopik'
import { TOPIK, cariTopik } from '@/content/topik'

/**
 * Halaman topik.
 *
 * CATATAN Next 16: `params` adalah Promise dan WAJIB di-await.
 * Ini berbeda dari Next versi lama, lihat peringatan di `web/AGENTS.md`.
 */

export function generateStaticParams() {
  return TOPIK.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const topik = cariTopik(slug)
  if (!topik) return { title: 'Topik tidak ditemukan | MATRA' }
  return { title: `${topik.nama} | MATRA`, description: topik.pertanyaan }
}

export default async function RuteTopik({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const topik = cariTopik(slug)
  if (!topik) notFound()

  return (
    <>
      <Nav label={topik.nama} />
      {topik.siap ? (
        <HalamanTopik topik={topik} />
      ) : (
        <main className="beranda">
          <div className="jalur">{topik.kelas}</div>
          <h1>{topik.nama}</h1>
          <p className="sub">{topik.pertanyaan}</p>
          <div className="miskon" style={{ marginTop: 26, maxWidth: 620 }}>
            <div className="cap merah">Belum dibangun</div>
            Halaman ini belum berisi apa-apa. Animasi dan alat interaktifnya sedang dikerjakan.
            <div className="sumber">
              Rencana pengerjaan ada di <code>PROGRESS.md</code>.
            </div>
          </div>
          <Link href="/" className="tombol garis" style={{ marginTop: 22, width: 'fit-content' }}>
            ← KEMBALI KE DAFTAR TOPIK
          </Link>
        </main>
      )}
    </>
  )
}
