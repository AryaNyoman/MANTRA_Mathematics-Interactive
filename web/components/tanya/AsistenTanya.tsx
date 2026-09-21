'use client'
import { useCallback, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import PanelTanya, { type MateriTautan, type Tampilan } from './PanelTanya'
import TombolTanyaBlok from './TombolTanyaBlok'
import { kirimTanya, GalatTanya } from '@/lib/tanya/klien'
import type { GambarTanya, PesanRiwayat } from '@/lib/tanya/jenis'
import { bacaDiServer, langgan } from '@/lib/simpanan'
import { bacaRiwayat, daftarRiwayat, hapusRiwayat, RIWAYAT_MAKS, sidikRiwayat, tulisRiwayat } from '@/lib/tanya/riwayat'

/**
 * Penyedia Asisten Tanya untuk satu halaman bab: tombol Tanya saat teks
 * diblok, panel jawaban, dan riwayat per materi di localStorage
 * (lib/tanya/riwayat.ts: `matra:tanya:<bab>:<slug>`, 12 pesan, 7 hari).
 * Server tidak menyimpan apa pun.
 *
 * Perubahan 21 Sep 2026 (ARYA): tombol "?" per blok dihapus (mengganggu
 * fokus, terutama di HP); bertanya lewat blok teks saja. Panel punya tab
 * "Riwayat bab" (semua percakapan bab ini, bisa disimpan PDF) dan bisa dibuka
 * dari daftar materi. Di layar latihan dan kuis (`slug` null) hanya
 * riwayatnya yang bisa dilihat.
 *
 * Dipasang dengan `key={slug}` supaya keadaan percakapan (kutipan, jawaban
 * yang sedang mengalir) bersih tiap ganti materi. Keadaan TERBUKA dan tab
 * panel dipegang rangka halaman (`terbuka`, `tampilan`), supaya panel tetap
 * terbuka saat "Buka" di daftar riwayat berpindah materi.
 */
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
  /** membuka materi lain tanpa memuat ulang halaman (pilihLayar rangka) */
  onBukaMateri: (slug: string) => void
  terbuka: boolean
  onUbahTerbuka: (b: boolean) => void
  tampilan: Tampilan
  onUbahTampilan: (t: Tampilan) => void
  children: ReactNode
}) {
  // riwayat materi ini dan sidik riwayat bab, keduanya external store
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
  const sidikBab = useSyncExternalStore(langgan, () => sidikRiwayat(bab), () => bacaDiServer() ?? '')
  const daftar = useMemo(() => (sidikBab ? daftarRiwayat(bab) : []), [sidikBab, bab])

  const [kutipan, setKutipan] = useState('')
  // giliran yang sedang berjalan: pertanyaan siswa dan jawaban yang mengalir
  const [berjalan, setBerjalan] = useState<{ tanya: string; jawab: string } | null>(null)
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
      const tanyaTeks = [kutipan ? `“${kutipan}”` : '', pertanyaan].filter(Boolean).join('\n') || '(gambar)'
      setBerjalan({ tanya: tanyaTeks, jawab: '' })
      let jawab = ''
      try {
        const akhir = await kirimTanya(
          { bab, materi: slug, kutipan, pertanyaan, gambar, riwayat: riwayatTersimpan.slice(-RIWAYAT_MAKS) },
          (t) => {
            jawab += t
            setBerjalan({ tanya: tanyaTeks, jawab })
          },
          (ganti) => {
            jawab = ganti
            setBerjalan({ tanya: tanyaTeks, jawab })
          },
          ac.signal,
        )
        setSisa(akhir.sisa)
        tulisRiwayat(bab, slug, [...riwayatTersimpan, { peran: 'siswa', teks: tanyaTeks }, { peran: 'asisten', teks: jawab }])
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
    ? [...riwayatTersimpan, { peran: 'siswa', teks: berjalan.tanya }, { peran: 'asisten', teks: berjalan.jawab }]
    : riwayatTersimpan

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
        onHapusPercakapan={(s) => hapusRiwayat(bab, s)}
      />
    </>
  )
}
