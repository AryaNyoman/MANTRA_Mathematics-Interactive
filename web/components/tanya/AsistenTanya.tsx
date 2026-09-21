'use client'
import { useCallback, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import PanelTanya, { type MateriTautan, type Tampilan } from './PanelTanya'
import TombolTanyaBlok from './TombolTanyaBlok'
import { kirimTanya, GalatTanya } from '@/lib/tanya/klien'
import type { GambarTanya, PesanRiwayat } from '@/lib/tanya/jenis'
import { bacaDiServer, langgan } from '@/lib/simpanan'
import { bacaRiwayat, daftarRiwayat, hapusRiwayat, RIWAYAT_MAKS, sidikRiwayat, tulisRiwayat } from '@/lib/tanya/riwayat'
import { cariTopik } from '@/content/topik'
import { ISI_TOPIK } from '@/content/daftar-isi'

/**
 * Penyedia Asisten Tanya untuk satu halaman bab: tombol Tanya saat teks
 * diblok, panel jawaban, dan riwayat per materi di localStorage
 * (lib/tanya/riwayat.ts: `matra:tanya:<bab>:<slug>`, 12 pesan, 7 hari).
 * Server tidak menyimpan apa pun.
 *
 * Perubahan 21 Sep 2026 (ARYA): tombol "?" per blok dihapus (mengganggu
 * fokus, terutama di HP); bertanya lewat blok teks saja. Panel punya tab
 * "Riwayat" yang memuat percakapan SEMUA bab (dinamai "Trigonometri: Materi
 * 01"), bisa disimpan PDF, dan bisa dibuka dari daftar materi. Di layar
 * latihan dan kuis (`slug` null) hanya riwayatnya yang bisa dilihat.
 * Kutipan (teks yang diblok) disimpan terpisah dari pertanyaan di tiap
 * giliran siswa supaya warnanya bisa dibedakan; ke server keduanya digabung.
 *
 * Dipasang dengan `key={slug}` supaya keadaan percakapan (kutipan, jawaban
 * yang sedang mengalir) bersih tiap ganti materi. Keadaan TERBUKA dan tab
 * panel dipegang rangka halaman (`terbuka`, `tampilan`), supaya panel tetap
 * terbuka saat "Buka" di daftar riwayat berpindah materi di bab yang sama;
 * materi bab lain dibuka lewat alamatnya (`?tanya=1` membuka panelnya lagi).
 */

/** "Trigonometri: Materi 01" plus judul pendek materinya, untuk bab mana pun. */
export function namaPercakapan(bab: string, slug: string): { nama: string; judul: string } {
  const topik = cariTopik(bab)
  const t = ISI_TOPIK[bab]?.tahap.find((x) => x.slug === slug)
  const namaBab = topik?.nama ?? bab
  return {
    nama: t ? `${namaBab}: Materi ${String(t.no).padStart(2, '0')}` : `${namaBab}: ${slug}`,
    judul: t?.labelPendek ?? '',
  }
}

/** Teks satu giliran siswa seperti yang dikirim ke model: kutipan lalu pertanyaan. */
const teksGiliran = (r: PesanRiwayat) =>
  r.kutipan ? [`“${r.kutipan}”`, r.teks].filter(Boolean).join('\n') : r.teks

export default function AsistenTanya({
  bab,
  namaBab,
  slug,
  materi,
  onBukaMateri,
  terbuka,
  onUbahTerbuka,
  tampilan,
  onUbahTampilan,
  children,
}: {
  bab: string
  namaBab: string
  slug: string | null
  /** daftar materi bab ini, untuk nama tautan "Materi 05 · Lingkaran satuan" */
  materi: MateriTautan[]
  /** membuka materi lain di bab ini tanpa memuat ulang halaman (pilihLayar rangka) */
  onBukaMateri: (slug: string) => void
  terbuka: boolean
  onUbahTerbuka: (b: boolean) => void
  tampilan: Tampilan
  onUbahTampilan: (t: Tampilan) => void
  children: ReactNode
}) {
  const router = useRouter()
  // riwayat materi ini dan sidik riwayat semua bab, keduanya external store
  const sidikMateri = useSyncExternalStore(
    langgan,
    () => (slug ? JSON.stringify(bacaRiwayat(bab, slug)) : '[]'),
    () => '[]',
  )
  const riwayatTersimpan = useMemo<PesanRiwayat[]>(() => {
    try {
      const r = JSON.parse(sidikMateri) as unknown
      return Array.isArray(r) ? (r as PesanRiwayat[]) : []
    } catch {
      return []
    }
  }, [sidikMateri])
  const sidikSemua = useSyncExternalStore(langgan, () => sidikRiwayat(), () => bacaDiServer() ?? '')
  const daftar = useMemo(() => (sidikSemua ? daftarRiwayat() : []), [sidikSemua])

  const [kutipan, setKutipan] = useState('')
  // giliran yang sedang berjalan: pertanyaan siswa dan jawaban yang mengalir
  const [berjalan, setBerjalan] = useState<{ tanya: string; kutipan: string; jawab: string } | null>(null)
  const [galat, setGalat] = useState<string | null>(null)
  const [sisa, setSisa] = useState<number | null>(null)
  const batal = useRef<AbortController | null>(null)

  const bukaPanel = useCallback((k: string) => {
    setKutipan(k)
    onUbahTampilan('percakapan')
    onUbahTerbuka(true)
    setGalat(null)
  }, [onUbahTampilan, onUbahTerbuka])

  const tanya = useCallback(
    async (pertanyaan: string, gambar: GambarTanya | null) => {
      if (berjalan || !slug) return
      batal.current?.abort()
      const ac = new AbortController()
      batal.current = ac
      setGalat(null)
      const tanyaTeks = pertanyaan || (kutipan ? '' : '(gambar)')
      setBerjalan({ tanya: tanyaTeks, kutipan, jawab: '' })
      let jawab = ''
      try {
        const akhir = await kirimTanya(
          {
            bab,
            materi: slug,
            kutipan,
            pertanyaan,
            gambar,
            riwayat: riwayatTersimpan.slice(-RIWAYAT_MAKS).map((r) => ({ peran: r.peran, teks: teksGiliran(r) })),
          },
          (t) => {
            jawab += t
            setBerjalan({ tanya: tanyaTeks, kutipan, jawab })
          },
          (ganti) => {
            jawab = ganti
            setBerjalan({ tanya: tanyaTeks, kutipan, jawab })
          },
          ac.signal,
        )
        setSisa(akhir.sisa)
        const giliran: PesanRiwayat = kutipan ? { peran: 'siswa', teks: tanyaTeks, kutipan } : { peran: 'siswa', teks: tanyaTeks }
        tulisRiwayat(bab, slug, [...riwayatTersimpan, giliran, { peran: 'asisten', teks: jawab }])
        setKutipan('')
      } catch (e) {
        if (ac.signal.aborted) return
        setGalat(e instanceof GalatTanya ? e.message : 'Asisten tidak bisa dihubungi.')
      } finally {
        if (!ac.signal.aborted) setBerjalan(null)
      }
    },
    [bab, slug, kutipan, berjalan, riwayatTersimpan],
  )

  const riwayat: PesanRiwayat[] = berjalan
    ? [
        ...riwayatTersimpan,
        berjalan.kutipan ? { peran: 'siswa', teks: berjalan.tanya, kutipan: berjalan.kutipan } : { peran: 'siswa', teks: berjalan.tanya },
        { peran: 'asisten', teks: berjalan.jawab },
      ]
    : riwayatTersimpan

  /* "Buka" di daftar riwayat: materi bab ini lewat pilihLayar (panel tetap
     terbuka); materi bab lain lewat alamatnya, dengan ?tanya=1 supaya
     panelnya langsung terbuka lagi di sana. */
  const bukaPercakapan = useCallback(
    (babTujuan: string, slugTujuan: string) => {
      if (babTujuan === bab) {
        if (slugTujuan !== slug) onBukaMateri(slugTujuan)
        onUbahTampilan('percakapan')
        return
      }
      router.push(`/topik/${babTujuan}?materi=${slugTujuan}&tanya=1`)
    },
    [bab, slug, onBukaMateri, onUbahTampilan, router],
  )

  return (
    <>
      {children}
      {slug !== null && <TombolTanyaBlok onTanya={bukaPanel} />}
      <PanelTanya
        terbuka={terbuka}
        onTutup={() => {
          onUbahTerbuka(false)
          batal.current?.abort()
          setBerjalan(null)
        }}
        tampilan={tampilan}
        onGantiTampilan={onUbahTampilan}
        bab={bab}
        namaBab={namaBab}
        materi={materi}
        slugKini={slug}
        onBukaMateri={onBukaMateri}
        kutipan={kutipan}
        onHapusKutipan={() => setKutipan('')}
        riwayat={riwayat}
        sedang={berjalan !== null}
        galat={galat}
        sisa={sisa}
        onTanya={tanya}
        onBersihkan={() => slug && hapusRiwayat(bab, slug)}
        daftar={daftar}
        namaPercakapan={namaPercakapan}
        onBukaPercakapan={bukaPercakapan}
        onHapusPercakapan={(b, s) => hapusRiwayat(b, s)}
      />
    </>
  )
}
