'use client'
import { useEffect, useRef, useState } from 'react'
import TeksMat from '@/components/latihan/TeksMat'
import type { GambarTanya, PesanRiwayat } from '@/lib/tanya/jenis'

type Props = {
  terbuka: boolean
  onTutup: () => void
  kutipan: string
  onHapusKutipan: () => void
  riwayat: PesanRiwayat[]
  sedang: boolean
  galat: string | null
  sisa: number | null
  onTanya: (pertanyaan: string, gambar: GambarTanya | null) => void
  onBersihkan: () => void
  bab: string
  materi: MateriTautan[]
  onBukaMateri: (slug: string) => void
}

export type MateriTautan = { no: number; slug: string; labelPendek: string }

const POLA_TAUTAN = /(\[\[[a-z0-9-]+:[a-z0-9-]+\]\])/g
const POLA_TEBAL = /(\*\*[^*]+\*\*)/g
const POLA_BUTIR = /^\s*(?:[-•*]|\d+[.)])\s+/

type PropJawaban = {
  teks: string
  bab: string
  materi: MateriTautan[]
  onBukaMateri: (slug: string) => void
}

/**
 * Satu baris jawaban: tanda [[bab:slug]] menjadi tombol "Materi 05 ·
 * Lingkaran satuan" yang membuka materinya di halaman ini (20 Sep 2026);
 * slug yang tidak dikenal atau bab lain dibuang supaya model yang mengarang
 * slug tidak menghasilkan tautan mati. Huruf tebal Markdown (**...**)
 * tetap dihormati walau aturannya melarang, sebab model kadang memakainya.
 */
function Sebaris({ teks, bab, materi, onBukaMateri }: PropJawaban) {
  return (
    <>
      {teks.split(POLA_TEBAL).map((bagian, i) => {
        const tebal = /^\*\*[^*]+\*\*$/.test(bagian)
        const isi = tebal ? bagian.slice(2, -2) : bagian
        const potongan = isi.split(POLA_TAUTAN).map((b, j) => {
          const m = /^\[\[([a-z0-9-]+):([a-z0-9-]+)\]\]$/.exec(b)
          if (m) {
            const t = m[1] === bab ? materi.find((x) => x.slug === m[2]) : undefined
            if (!t) return null
            return (
              <button key={j} type="button" className="tanya-tautan" onClick={() => onBukaMateri(t.slug)}>
                Materi {String(t.no).padStart(2, '0')} · {t.labelPendek}
              </button>
            )
          }
          return b ? <TeksMat key={j} teks={b} blok={false} /> : null
        })
        return tebal ? <b key={i}>{potongan}</b> : <span key={i}>{potongan}</span>
      })}
    </>
  )
}

/**
 * Jawaban asisten: paragraf dipisah baris kosong; baris yang diawali "-",
 * "•", atau "1." dikelompokkan menjadi daftar. Tanda hubung panjang diganti
 * koma (aturan MANTRA: tanpa em-dash).
 */
function Jawaban(p: PropJawaban) {
  const bersih = p.teks.replace(/\s*[—–]\s*/g, ', ')
  return (
    <div className="tanya-jawaban">
      {bersih.split(/\n{2,}/).map((par, i) => {
        const baris = par.split('\n')
        const bagian: { jenis: 'p' | 'ol' | 'ul'; isi: string[] }[] = []
        for (const b of baris) {
          const butir = POLA_BUTIR.test(b)
          const jenis = butir ? (/^\s*\d/.test(b) ? 'ol' : 'ul') : 'p'
          const akhir = bagian[bagian.length - 1]
          if (akhir && akhir.jenis === jenis && jenis !== 'p') akhir.isi.push(b.replace(POLA_BUTIR, ''))
          else if (akhir && akhir.jenis === 'p' && jenis === 'p') akhir.isi.push(b)
          else bagian.push({ jenis, isi: [butir ? b.replace(POLA_BUTIR, '') : b] })
        }
        return bagian.map((bg, j) => {
          const kunci = `${i}-${j}`
          if (bg.jenis === 'p') return <p key={kunci}><Sebaris {...p} teks={bg.isi.join(' ')} /></p>
          const Daftar = bg.jenis
          return (
            <Daftar key={kunci}>
              {bg.isi.map((b, k) => <li key={k}><Sebaris {...p} teks={b} /></li>)}
            </Daftar>
          )
        })
      })}
    </div>
  )
}

/** Gambar dikecilkan di peramban ke 1.280 px sisi terpanjang dan JPEG 82 persen. */
async function kecilkanGambar(berkas: File): Promise<GambarTanya> {
  const bitmap = await createImageBitmap(berkas)
  const skala = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height))
  const kanvas = document.createElement('canvas')
  kanvas.width = Math.round(bitmap.width * skala)
  kanvas.height = Math.round(bitmap.height * skala)
  kanvas.getContext('2d')?.drawImage(bitmap, 0, 0, kanvas.width, kanvas.height)
  const url = kanvas.toDataURL('image/jpeg', 0.82)
  return { jenis: 'image/jpeg', data: url.slice(url.indexOf(',') + 1) }
}

export default function PanelTanya(p: Props) {
  const [pertanyaan, setPertanyaan] = useState('')
  const [gambar, setGambar] = useState<GambarTanya | null>(null)
  const akhir = useRef<HTMLDivElement>(null)
  const kotak = useRef<HTMLTextAreaElement>(null)
  const { terbuka, onTutup } = p

  useEffect(() => {
    akhir.current?.scrollIntoView({ block: 'end' })
  }, [p.riwayat, p.sedang])

  useEffect(() => {
    if (!terbuka) return
    // Fokus ke kotak pertanyaan hanya di layar bertetikus: di HP fokus otomatis
    // memunculkan papan ketik padahal siswa mungkin cuma ingin membaca jawabannya.
    if (window.matchMedia('(pointer: fine)').matches) kotak.current?.focus()
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onTutup()
    }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [terbuka, onTutup])

  const kirim = () => {
    if (p.sedang || (!pertanyaan.trim() && !p.kutipan && !gambar)) return
    p.onTanya(pertanyaan.trim(), gambar)
    setPertanyaan('')
    setGambar(null)
  }

  return (
    <aside
      className="panel-tanya"
      data-buka={terbuka}
      role="dialog"
      aria-modal="false"
      aria-labelledby="judul-tanya"
      aria-hidden={!terbuka}
      inert={!terbuka || undefined}
    >
      <div className="tanya-kepala">
        <div className="kicker" id="judul-tanya">
          Asisten Tanya
        </div>
        <button type="button" className="tanya-tutup" onClick={onTutup} aria-label="Tutup asisten">
          ✕
        </button>
      </div>
      <div className="tanya-isi">
        {p.riwayat.length === 0 && !p.kutipan && (
          <p className="tanya-pengantar">
            Blok kalimat yang belum jelas lalu tekan Tanya, atau tekan Jelaskan di sebelah paragraf.
            Jawabannya berpijak pada materi yang sedang kamu baca.
          </p>
        )}
        {p.riwayat.map((r, i) => (
          <div key={i} className={`tanya-pesan ${r.peran}`}>
            {r.peran === 'siswa' ? <p>{r.teks}</p> : <Jawaban teks={r.teks} bab={p.bab} materi={p.materi} onBukaMateri={p.onBukaMateri} />}
          </div>
        ))}
        {p.sedang && p.riwayat[p.riwayat.length - 1]?.teks === '' && (
          <div className="tanya-memuat" role="status">
            <i />
            <span className="hanya-pembaca">Asisten sedang menjawab</span>
          </div>
        )}
        {p.galat && (
          <p className="tanya-galat" role="alert">
            {p.galat}
          </p>
        )}
        <div ref={akhir} />
      </div>
      <div className="tanya-kaki">
        {p.kutipan && (
          <div className="tanya-kutipan">
            <span>“{p.kutipan.length > 160 ? p.kutipan.slice(0, 160) + '…' : p.kutipan}”</span>
            <button type="button" onClick={p.onHapusKutipan} aria-label="Hapus kutipan">
              ✕
            </button>
          </div>
        )}
        {gambar && (
          <div className="tanya-kutipan">
            <span>gambar terlampir</span>
            <button type="button" onClick={() => setGambar(null)} aria-label="Hapus gambar">
              ✕
            </button>
          </div>
        )}
        <textarea
          ref={kotak}
          value={pertanyaan}
          onChange={(e) => setPertanyaan(e.target.value.slice(0, 500))}
          rows={2}
          placeholder={p.kutipan ? 'Tambah pertanyaan (boleh kosong)' : 'Tulis pertanyaanmu'}
          aria-label="Pertanyaan"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              kirim()
            }
          }}
        />
        <div className="tanya-aksi">
          <label className="tanya-gambar">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={async (e) => {
                const f = e.target.files?.[0]
                if (f) setGambar(await kecilkanGambar(f))
                e.target.value = ''
              }}
            />
            Foto / screenshot
          </label>
          <button type="button" className="pil-emas" onClick={kirim} disabled={p.sedang}>
            Kirim
          </button>
        </div>
        <div className="tanya-catatan">
          {p.sisa !== null ? `Sisa jatah hari ini: ${p.sisa}` : 'Jatah 20 pertanyaan per hari'}
          {p.riwayat.length > 0 && (
            <>
              {' · '}
              <button type="button" className="tanya-bersih" onClick={p.onBersihkan}>
                bersihkan
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
