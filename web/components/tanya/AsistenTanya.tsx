'use client'
import { useCallback, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { KonteksTanya } from './konteks'
import PanelTanya from './PanelTanya'
import TombolTanyaBlok from './TombolTanyaBlok'
import { kirimTanya, GalatTanya } from '@/lib/tanya/klien'
import type { GambarTanya, PesanRiwayat } from '@/lib/tanya/jenis'
import { baca, bacaDiServer, langgan, tulis } from '@/lib/simpanan'

const RIWAYAT_MAKS = 12

/**
 * Penyedia Asisten Tanya untuk satu materi: memasang konteks (tombol Jelaskan
 * dan Tanya membukanya), panel jawaban, dan riwayat per materi di localStorage
 * (`matra:tanya:<bab>:<slug>`, maksimal 12 pesan). Server tidak menyimpan
 * apa pun. Dipasang dengan `key={slug}` supaya keadaannya bersih tiap ganti
 * materi. Kalau `slug` null (layar latihan atau kuis), anaknya dirender apa
 * adanya tanpa asisten.
 */
export default function AsistenTanya({ bab, slug, children }: { bab: string; slug: string | null; children: ReactNode }) {
  const kunci = `matra:tanya:${bab}:${slug ?? '-'}`
  const tersimpan = useSyncExternalStore(langgan, () => baca(kunci) ?? '[]', bacaDiServer)
  const riwayatTersimpan = useMemo<PesanRiwayat[]>(() => {
    try {
      const r = JSON.parse(tersimpan ?? '[]') as unknown
      return Array.isArray(r) ? (r as PesanRiwayat[]) : []
    } catch {
      return []
    }
  }, [tersimpan])

  const [terbuka, setTerbuka] = useState(false)
  const [kutipan, setKutipan] = useState('')
  // giliran yang sedang berjalan: pertanyaan siswa dan jawaban yang mengalir
  const [berjalan, setBerjalan] = useState<{ tanya: string; jawab: string } | null>(null)
  const [galat, setGalat] = useState<string | null>(null)
  const [sisa, setSisa] = useState<number | null>(null)
  const batal = useRef<AbortController | null>(null)

  const bukaPanel = useCallback((k: string) => {
    setKutipan(k)
    setTerbuka(true)
    setGalat(null)
  }, [])

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
        const baru = [...riwayatTersimpan, { peran: 'siswa' as const, teks: tanyaTeks }, { peran: 'asisten' as const, teks: jawab }]
        tulis(kunci, JSON.stringify(baru.slice(-RIWAYAT_MAKS)))
        setKutipan('')
      } catch (e) {
        if (ac.signal.aborted) return
        setGalat(e instanceof GalatTanya ? e.message : 'Asisten tidak bisa dihubungi.')
      } finally {
        if (!ac.signal.aborted) setBerjalan(null)
      }
    },
    [bab, slug, kutipan, berjalan, riwayatTersimpan, kunci],
  )

  const nilai = useMemo(() => ({ bukaPanel, aktif: slug !== null }), [bukaPanel, slug])
  if (slug === null) return <>{children}</>

  const riwayat: PesanRiwayat[] = berjalan
    ? [...riwayatTersimpan, { peran: 'siswa', teks: berjalan.tanya }, { peran: 'asisten', teks: berjalan.jawab }]
    : riwayatTersimpan

  return (
    <KonteksTanya.Provider value={nilai}>
      {children}
      <TombolTanyaBlok onTanya={bukaPanel} />
      <PanelTanya
        terbuka={terbuka}
        onTutup={() => {
          setTerbuka(false)
          batal.current?.abort()
          setBerjalan(null)
        }}
        kutipan={kutipan}
        onHapusKutipan={() => setKutipan('')}
        riwayat={riwayat}
        sedang={berjalan !== null}
        galat={galat}
        sisa={sisa}
        onTanya={tanya}
        onBersihkan={() => tulis(kunci, '[]')}
      />
    </KonteksTanya.Provider>
  )
}
