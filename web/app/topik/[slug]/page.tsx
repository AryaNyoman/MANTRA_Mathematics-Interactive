import Link from 'next/link'
import { Suspense } from 'react'
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
  if (!topik) return { title: 'Topik tidak ditemukan | MANTRA' }
  return { title: `${topik.nama} | MANTRA`, description: topik.pertanyaan }
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
        /* Suspense WAJIB: `HalamanTopik` membaca `?materi=` lewat
           `useSearchParams`, dan Next 16 menolak merakit halaman statis yang
           membacanya tanpa batas Suspense. Cadangannya sengaja kotak kosong
           setinggi panel, bukan tulisan "memuat": panelnya muncul dalam
           sekejap dan tulisan yang berkedip lebih mengganggu daripada
           ruang kosong sesaat. */
        <Suspense fallback={<div style={{ minHeight: '70vh' }} />}>
          <HalamanTopik topik={topik} />
        </Suspense>
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
          <Link href="/peta-materi" className="pil-garis" style={{ marginTop: 22, width: 'fit-content' }}>
            ← Kembali ke Peta Materi
          </Link>
        </main>
      )}
    </>
  )
}
