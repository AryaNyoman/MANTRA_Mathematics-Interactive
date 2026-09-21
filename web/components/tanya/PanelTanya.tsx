'use client'
import { useEffect, useRef, useState } from 'react'
import TeksMat from '@/components/latihan/TeksMat'
import type { GambarTanya, PesanRiwayat } from '@/lib/tanya/jenis'
import { UMUR_HARI, sisaHari, umurTeks, type Percakapan } from '@/lib/tanya/riwayat'

export type MateriTautan = { no: number; slug: string; labelPendek: string }
export type Tampilan = 'percakapan' | 'riwayat'

type Props = {
  terbuka: boolean
  onTutup: () => void
  tampilan: Tampilan
  onGantiTampilan: (t: Tampilan) => void
  bab: string
  namaBab: string
  materi: MateriTautan[]
  /** materi yang sedang dibuka; null di layar latihan dan kuis */
  slugKini: string | null
  onBukaMateri: (slug: string) => void
  // ---- percakapan materi ini ----
  kutipan: string
  onHapusKutipan: () => void
  riwayat: PesanRiwayat[]
  sedang: boolean
  galat: string | null
  sisa: number | null
  onTanya: (pertanyaan: string, gambar: GambarTanya | null) => void
  onBersihkan: () => void
  // ---- riwayat seluruh bab ----
  daftar: Percakapan[]
  onHapusPercakapan: (slug: string) => void
}

const POLA_TAUTAN = /(\[\[[a-z0-9-]+:[a-z0-9-]+\]\])/g
const POLA_TEBAL = /(\*\*[^*]+\*\*)/g
const POLA_BUTIR = /^\s*(?:[-•*]|\d+[.)])\s+/

const dua = (n: number) => String(n).padStart(2, '0')
const labelMateri = (materi: MateriTautan[], slug: string) => {
  const t = materi.find((x) => x.slug === slug)
  return t ? `Materi ${dua(t.no)} · ${t.labelPendek}` : slug
}

type PropJawaban = {
  teks: string
  bab: string
  materi: MateriTautan[]
  onBukaMateri: (slug: string) => void
  /** true di lembar PDF: tautan jadi teks biasa, tidak ada tombol */
  cetak?: boolean
}

/**
 * Satu baris jawaban: tanda [[bab:slug]] menjadi tombol "Materi 05 ·
 * Lingkaran satuan" yang membuka materinya di halaman ini (20 Sep 2026);
 * slug yang tidak dikenal atau bab lain dibuang supaya model yang mengarang
 * slug tidak menghasilkan tautan mati. Huruf tebal Markdown (**...**)
 * tetap dihormati walau aturannya melarang, karena model kadang memakainya.
 */
function Sebaris({ teks, bab, materi, onBukaMateri, cetak }: PropJawaban) {
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
            const label = `Materi ${dua(t.no)} · ${t.labelPendek}`
            if (cetak) return <span key={j} className="tanya-tautan-cetak">{label}</span>
            return (
              <button key={j} type="button" className="tanya-tautan" onClick={() => onBukaMateri(t.slug)}>
                {label}
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
export function Jawaban(p: PropJawaban) {
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

/**
 * Lembar yang difoto menjadi PDF: seluruh percakapan bab, satu bagian per
 * materi. Dirender hanya selama ekspor, di luar layar.
 */
function LembarCetak({
  namaBab, daftar, materi, bab, onBukaMateri, acuan,
}: {
  namaBab: string
  daftar: Percakapan[]
  materi: MateriTautan[]
  bab: string
  onBukaMateri: (slug: string) => void
  acuan: React.RefObject<HTMLDivElement | null>
}) {
  const tanggal = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <div ref={acuan} className="tanya-cetak" aria-hidden="true">
      <div className="cetak-kepala">
        <div className="cetak-merek">MANTRA · Asisten Tanya</div>
        <h1>Catatan tanya jawab: {namaBab}</h1>
        <div className="cetak-tanggal">Disimpan {tanggal}. Jawaban asisten berpijak pada materi MANTRA; periksa kembali ke bacaannya bila ragu.</div>
      </div>
      {daftar.map((p) => (
        <section key={p.slug} className="cetak-materi">
          <h2>{labelMateri(materi, p.slug)}</h2>
          {p.pesan.map((r, i) => (
            <div key={i} className={`cetak-pesan ${r.peran}`}>
              <div className="cetak-peran">{r.peran === 'siswa' ? 'Pertanyaan' : 'Asisten'}</div>
              {r.peran === 'siswa'
                ? <p>{r.teks}</p>
                : <Jawaban teks={r.teks} bab={bab} materi={materi} onBukaMateri={onBukaMateri} cetak />}
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}

export default function PanelTanya(p: Props) {
  const [pertanyaan, setPertanyaan] = useState('')
  const [gambar, setGambar] = useState<GambarTanya | null>(null)
  const [mengekspor, setMengekspor] = useState(false)
  const [galatEkspor, setGalatEkspor] = useState<string | null>(null)
  const akhir = useRef<HTMLDivElement>(null)
  const kotak = useRef<HTMLTextAreaElement>(null)
  const lembar = useRef<HTMLDivElement>(null)
  const { terbuka, onTutup, tampilan } = p
  const bisaBertanya = p.slugKini !== null
  const lihatRiwayat = tampilan === 'riwayat' || !bisaBertanya

  useEffect(() => {
    if (!lihatRiwayat) akhir.current?.scrollIntoView({ block: 'end' })
  }, [p.riwayat, p.sedang, lihatRiwayat])

  useEffect(() => {
    if (!terbuka) return
    // Fokus ke kotak pertanyaan hanya di layar bertetikus: di HP fokus otomatis
    // memunculkan papan ketik padahal siswa mungkin cuma ingin membaca jawabannya.
    if (!lihatRiwayat && window.matchMedia('(pointer: fine)').matches) kotak.current?.focus()
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onTutup()
    }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [terbuka, onTutup, lihatRiwayat])

  // Lembar cetak dirender dulu (state `mengekspor`), baru difoto sesudah
  // React menaruhnya di DOM; setState-nya terjadi sesudah await, bukan di
  // badan effect.
  useEffect(() => {
    if (!mengekspor || !lembar.current) return
    let batal = false
    ;(async () => {
      try {
        // beri waktu KaTeX dan huruf webnya tergambar
        await new Promise((r) => setTimeout(r, 150))
        if (document.fonts?.ready) await document.fonts.ready
        const { eksporPdf } = await import('@/lib/tanya/pdf')
        if (!lembar.current || batal) return
        const tanggal = new Date().toISOString().slice(0, 10)
        await eksporPdf(lembar.current, `mantra-tanya-${p.bab}-${tanggal}.pdf`)
      } catch (e) {
        if (!batal) setGalatEkspor(e instanceof Error ? `PDF gagal dibuat: ${e.message}` : 'PDF gagal dibuat.')
      } finally {
        if (!batal) setMengekspor(false)
      }
    })()
    return () => {
      batal = true
    }
  }, [mengekspor, p.bab])

  const kirim = () => {
    if (p.sedang || (!pertanyaan.trim() && !p.kutipan && !gambar)) return
    p.onTanya(pertanyaan.trim(), gambar)
    setPertanyaan('')
    setGambar(null)
  }

  const jumlahTanya = (r: PesanRiwayat[]) => r.filter((x) => x.peran === 'siswa').length

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
        <div className="tanya-judul">
          <span className="kicker" id="judul-tanya">Asisten Tanya</span>
          <span className="tanya-bab">{p.namaBab}</span>
        </div>
        <button type="button" className="tanya-tutup" onClick={onTutup} aria-label="Tutup asisten">
          ✕
        </button>
      </div>
      {bisaBertanya && (
        <div className="tanya-tab" role="tablist" aria-label="Bagian panel">
          <button type="button" role="tab" aria-selected={!lihatRiwayat} onClick={() => p.onGantiTampilan('percakapan')}>
            Materi ini
          </button>
          <button type="button" role="tab" aria-selected={lihatRiwayat} onClick={() => p.onGantiTampilan('riwayat')}>
            Riwayat bab{p.daftar.length ? ` (${p.daftar.length})` : ''}
          </button>
        </div>
      )}

      {lihatRiwayat ? (
        <div className="tanya-isi tanya-riwayat">
          {p.daftar.length === 0 ? (
            <p className="tanya-pengantar">
              Belum ada percakapan di bab ini. Buka sebuah materi, blok kalimat yang belum jelas, lalu tekan Tanya.
            </p>
          ) : (
            <ul className="riwayat-daftar">
              {p.daftar.map((c) => (
                <li key={c.slug} className="riwayat-butir" data-kini={c.slug === p.slugKini}>
                  <div className="riwayat-nama">{labelMateri(p.materi, c.slug)}</div>
                  <div className="riwayat-meta">
                    {jumlahTanya(c.pesan)} tanya jawab · {umurTeks(c.t)} · terhapus dalam {sisaHari(c.t)} hari
                  </div>
                  <div className="riwayat-aksi">
                    <button
                      type="button"
                      className="pil-garis"
                      onClick={() => {
                        if (c.slug !== p.slugKini) p.onBukaMateri(c.slug)
                        p.onGantiTampilan('percakapan')
                      }}
                    >
                      {c.slug === p.slugKini ? 'Lihat' : 'Buka'}
                    </button>
                    <button type="button" className="tanya-bersih" onClick={() => p.onHapusPercakapan(c.slug)}>
                      hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="riwayat-kaki">
            <button
              type="button"
              className="pil-emas"
              disabled={p.daftar.length === 0 || mengekspor}
              onClick={() => {
                setGalatEkspor(null)
                setMengekspor(true)
              }}
            >
              {mengekspor ? 'Membuat PDF…' : 'Simpan semua sebagai PDF'}
            </button>
            {galatEkspor && <p className="tanya-galat" role="alert">{galatEkspor}</p>}
            <p className="tanya-catatan">
              Riwayat hanya tersimpan di peramban ini dan terhapus sendiri {UMUR_HARI} hari sesudah percakapan terakhir.
              Simpan PDF-nya kalau ingin dibaca lagi.
            </p>
          </div>
          {mengekspor && (
            <LembarCetak namaBab={p.namaBab} daftar={p.daftar} materi={p.materi} bab={p.bab} onBukaMateri={p.onBukaMateri} acuan={lembar} />
          )}
        </div>
      ) : (
        <>
          <div className="tanya-isi">
            {p.riwayat.length === 0 && !p.kutipan && (
              <p className="tanya-pengantar">
                Blok kalimat yang belum jelas di bacaan lalu tekan Tanya, atau tulis pertanyaanmu di bawah.
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
              {p.sisa !== null ? `Sisa jatah hari ini: ${p.sisa}` : 'Jatah 5 pertanyaan per hari'}
              {' · tersimpan '}{UMUR_HARI} hari
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
        </>
      )}
    </aside>
  )
}
