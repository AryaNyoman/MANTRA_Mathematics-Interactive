'use client'

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import type { ButirKuisBab, SoalKuis, Tahap } from '@/content/tipe'
import { baca, bacaDiServer, langgan, tulis, tulisDiam } from '@/lib/simpanan'
import { bacaBenih, HURUF, kocok, urutanPilihan } from '@/lib/acak-pilihan'
import { useHitung } from '@/lib/hitung'
import Jendela from '@/components/mantra/Jendela'
import Pembahasan from '@/components/latihan/Pembahasan'
import TeksMat from '@/components/latihan/TeksMat'
import GambarSoal from '@/components/latihan/gambar/GambarSoal'

/**
 * Kuis bab v2 (keputusan ARYA 20 Sep 2026, rancangan
 * docs/superpowers/specs/2026-09-20-kuis-bab-v2-sudut-berelasi-design.md).
 *
 * KUIS ADALAH PENILAIAN, bukan latihan: siswa menjawab kesepuluh soal dulu
 * tanpa umpan balik, boleh mundur dan mengganti jawaban lewat peta soal, lalu
 * menekan Kumpulkan. Baru sesudah itu halaman hasil menampilkan skor dan
 * pembahasannya: langkah bergambar (komponen Pembahasan yang sama dengan
 * menu Latihan), jebakan pengecoh, dan untuk jawaban yang salah tombol
 * "Baca Materi 05 · Lingkaran satuan" yang langsung membuka materinya.
 *
 * Dua tambahan ARYA 21 Sep 2026:
 * - PEMBAHASAN SATU SOAL SEKALIGUS, dijelajahi seperti saat menjawab (peta
 *   soal berwarna benar/salah, Sebelumnya/Berikutnya), bukan sepuluh
 *   pembahasan bertumpuk yang panjang digulir.
 * - JEDA 30 MENIT sebelum boleh mengulang, untuk siswa yang mengumpulkan
 *   asal lalu mengulang dengan jawaban yang baru dilihat. Waktu kumpul
 *   disimpan bersama jawabannya, jadi memuat ulang halaman selama jeda
 *   tetap memperlihatkan hasil yang sama, bukan kuis baru. Mode guru bebas
 *   jeda. Ini BUKAN pengamanan: simpanannya di peramban siswa sendiri.
 *
 * SATU PAKET, DIACAK. Soalnya sepuluh butir `KUIS_BAB` (soal bank yang
 * konsepnya memang diajarkan bab ini, masing-masing menunjuk materi asalnya).
 * Urutan soal dikocok saat kuis dibuka, urutan pilihan dikocok per soal
 * dengan benih tab yang sama dengan Latihan (lib/acak-pilihan.ts), jadi
 * huruf jawaban tidak bisa dihafal walau paketnya tetap.
 *
 * Skor terbaik di `matra:kuis:<bab>` (angka benar dari 10); hasil terakhir di
 * `matra:kuis:<bab>:terakhir` sebagai JSON { tanggal, benar, salah: id[],
 * pada: ms, urutan: id[], jawaban: {id: indeks pilihan asli} }.
 * Tanpa database dan tanpa login: semuanya di peramban siswa.
 *
 * Komponen ini baru dipasang sesudah siswa membuka tab Kuis (dan kuisnya
 * terbuka), jadi Math.random di pengocok tidak pernah berjalan di server.
 */

/** jeda sebelum kuis boleh diulang */
export const JEDA_ULANG_MENIT = 30
const JEDA_ULANG_MS = JEDA_ULANG_MENIT * 60 * 1000

type HasilTersimpan = {
  tanggal: string
  benar: number
  salah: string[]
  pada?: number
  urutan?: string[]
  jawaban?: Record<string, number>
}

function bacaTerakhir(kunci: string): HasilTersimpan | null {
  try {
    const mentah = baca(`${kunci}:terakhir`)
    if (!mentah) return null
    const d = JSON.parse(mentah) as Partial<HasilTersimpan>
    if (typeof d.benar !== 'number') return null
    return {
      tanggal: typeof d.tanggal === 'string' ? d.tanggal : '',
      benar: d.benar,
      salah: Array.isArray(d.salah) ? d.salah : [],
      pada: typeof d.pada === 'number' ? d.pada : undefined,
      urutan: Array.isArray(d.urutan) ? d.urutan : undefined,
      jawaban: d.jawaban && typeof d.jawaban === 'object' ? d.jawaban : undefined,
    }
  } catch {
    return null
  }
}

const menitDetik = (ms: number) => {
  const d = Math.max(0, Math.ceil(ms / 1000))
  return `${Math.floor(d / 60)}:${String(d % 60).padStart(2, '0')}`
}

export default function Kuis({
  paket,
  bank,
  tahap,
  kunciSimpan,
  onBacaMateri,
  guru = false,
}: {
  /** sepuluh butir kuis bab beserta materi asalnya */
  paket: ButirKuisBab[]
  /** bank soal bab ini, tempat butir paket mengambil soalnya */
  bank: SoalKuis[]
  /** daftar materi bab ini, untuk nama tombol "Baca Materi NN · Judul" */
  tahap: Tahap[]
  kunciSimpan: string
  /** membuka materi dengan slug itu (pilihLayar di rangka halaman) */
  onBacaMateri: (slug: string) => void
  /** mode guru: boleh mengulang tanpa jeda */
  guru?: boolean
}) {
  const soalPerId = new Map(bank.map((s) => [s.id, s]))
  const butirSah = paket.filter((b) => soalPerId.has(b.id))

  /* Keadaan awal: kalau hasil terakhir masih dalam jeda 30 menit, kuis
     dibuka LANGSUNG di halaman hasilnya (urutan dan jawaban dipulihkan),
     supaya memuat ulang halaman tidak menjadi jalan pintas mengulang. */
  const [awal] = useState(() => {
    const t = bacaTerakhir(kunciSimpan)
    const dalamJeda = t?.pada !== undefined && Date.now() - t.pada < JEDA_ULANG_MS
    if (t && dalamJeda && t.urutan && t.jawaban) {
      const perId = new Map(butirSah.map((b) => [b.id, b]))
      const urutan = t.urutan.map((id) => perId.get(id)).filter((b): b is ButirKuisBab => Boolean(b))
      if (urutan.length === butirSah.length) return { urutan, jawaban: t.jawaban, dikumpulkan: true, pada: t.pada as number }
    }
    return { urutan: kocok(butirSah), jawaban: {} as Record<string, number>, dikumpulkan: false, pada: 0 }
  })
  const [urutan, setUrutan] = useState<ButirKuisBab[]>(awal.urutan)
  const [i, setI] = useState(0)
  /** jawaban per id soal: indeks pilihan ASLI di bank */
  const [jawaban, setJawaban] = useState<Record<string, number>>(awal.jawaban)
  const [dikumpulkan, setDikumpulkan] = useState(awal.dikumpulkan)
  /** waktu Kumpulkan terakhir (ms), 0 kalau belum */
  const [pada, setPada] = useState(awal.pada)
  const [tanyaKumpul, setTanyaKumpul] = useState(false)
  /** soal yang sedang dibuka di halaman hasil */
  const [h, setH] = useState(0)

  // benih kocokan pilihan: tetap selama tab hidup, '0' (urutan asli) di server
  const benih = useSyncExternalStore(() => () => {}, bacaBenih, () => '0')
  const tersimpan = useSyncExternalStore(
    langgan,
    useCallback(() => baca(kunciSimpan), [kunciSimpan]),
    bacaDiServer,
  )
  const rekor = tersimpan === null ? null : Number(tersimpan)

  /* Sisa jeda, dihitung ulang tiap detik selama halaman hasil terbuka dan
     jedanya belum habis. `kini` dari interval, bukan Date.now() saat render,
     supaya hasil rakitan server dan peramban tidak berbeda. */
  const [kini, setKini] = useState(() => Date.now())
  const sisaJeda = guru || !dikumpulkan || !pada ? 0 : Math.max(0, pada + JEDA_ULANG_MS - kini)
  useEffect(() => {
    if (!dikumpulkan || guru || !pada) return
    const id = window.setInterval(() => setKini(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [dikumpulkan, guru, pada])

  const jumlah = urutan.length
  const terjawab = urutan.filter((b) => jawaban[b.id] !== undefined).length
  const butir = urutan[i]
  const s = butir ? soalPerId.get(butir.id) : undefined
  const urut = s ? urutanPilihan(s.id, benih, s.pilihan.length) : []

  const benarSemua = urutan.filter((b) => jawaban[b.id] === soalPerId.get(b.id)?.benar).length
  const skorTampil = useHitung(benarSemua, dikumpulkan)

  function kumpulkan() {
    const sekarang = Date.now()
    setTanyaKumpul(false)
    setDikumpulkan(true)
    setPada(sekarang)
    setKini(sekarang)
    setH(0)
    const salah = urutan.filter((b) => jawaban[b.id] !== soalPerId.get(b.id)?.benar).map((b) => b.id)
    if (rekor === null || benarSemua > rekor) tulis(kunciSimpan, String(benarSemua))
    const hasil: HasilTersimpan = {
      tanggal: new Date().toISOString().slice(0, 10),
      benar: benarSemua,
      salah,
      pada: sekarang,
      urutan: urutan.map((b) => b.id),
      jawaban,
    }
    tulisDiam(`${kunciSimpan}:terakhir`, JSON.stringify(hasil))
  }

  /* Mengulang mengocok ulang paket yang sama: urutan soal baru, dan pilihan
     tetap ikut benih tab. Jawaban lama dibuang. Ditolak selama jeda. */
  function ulang() {
    if (sisaJeda > 0) return
    setUrutan(kocok(butirSah))
    setI(0)
    setJawaban({})
    setDikumpulkan(false)
    setPada(0)
  }

  if (jumlah === 0) {
    return <p className="soal-kosong">Paket kuis bab ini belum disusun.</p>
  }

  /* ---------------------------------------------------------------- hasil */
  if (dikumpulkan) {
    const persen = Math.round((benarSemua / jumlah) * 100)
    const bH = urutan[Math.min(h, jumlah - 1)]
    const q = bH ? soalPerId.get(bH.id) : undefined
    const urutQ = q ? urutanPilihan(q.id, benih, q.pilihan.length) : []
    const pilihH = q ? jawaban[q.id] : undefined
    const benarH = q ? pilihH === q.benar : false
    const materiH = bH ? tahap.find((t) => t.slug === bH.materi) : undefined
    return (
      <div className="kuis-hasil">
        <div className="kuis-selesai">
          <div className="cap">Hasil</div>
          <div className="skor mono" aria-live="polite">{skorTampil} / {jumlah}</div>
          <p>
            {persen === 100
              ? 'Semua benar. Bab ini sudah kamu kuasai.'
              : persen >= 70
                ? 'Sudah bagus. Baca pembahasan soal yang salah di bawah, lalu buka materinya sekali lagi.'
                : persen >= 50
                  ? 'Setengahnya benar. Tiap soal yang salah di bawah menunjuk materi yang perlu dibaca ulang.'
                  : 'Masih banyak yang salah. Baca pembahasannya, buka materi yang ditunjuk, lalu ulangi kuisnya.'}
          </p>
          {rekor !== null && <p className="catatan">Nilai terbaik Anda di perangkat ini: {rekor} / {jumlah}</p>}
        </div>

        {/* Peta hasil: hijau benar, jingga salah; klik untuk membuka
            pembahasannya. Satu soal sekaligus (ARYA 21 Sep 2026). */}
        <div className="latihan-atas">
          <span className="cap" style={{ margin: 0 }}>Pembahasan soal {h + 1} dari {jumlah}</span>
          <span className="label-soal mono">benar: {benarSemua} / {jumlah}</span>
        </div>
        <div className="peta-soal" role="group" aria-label="Peta hasil">
          {urutan.map((b, n) => {
            const sq = soalPerId.get(b.id)
            const benar = sq ? jawaban[b.id] === sq.benar : false
            return (
              <button
                key={b.id}
                type="button"
                className="peta-kotak"
                data-keadaan={benar ? 'benar' : 'salah'}
                data-kini={n === h}
                aria-current={n === h ? 'step' : undefined}
                aria-label={`Soal ${n + 1}, ${benar ? 'benar' : 'salah'}`}
                onClick={() => setH(n)}
              >
                {n + 1}
              </button>
            )
          })}
        </div>

        {q && (
          <div className="hasil-soal" data-benar={benarH} key={q.id}>
            <div className="hasil-kepala">
              <span className="kicker">Soal {h + 1}</span>
              <span className="hasil-tanda">
                {benarH ? 'Benar' : pilihH === undefined ? 'Tidak dijawab' : 'Salah'}
              </span>
            </div>
            <p className="soal-teks"><TeksMat teks={q.pertanyaan} /></p>
            {q.gambar && <GambarSoal gambar={q.gambar} />}
            <div className="opsi-daftar">
              {urutQ.map((asli, posisi) => {
                const keadaan = asli === q.benar ? 'benar' : pilihH === asli ? 'salah' : 'redam'
                return (
                  <div key={asli} className="opsi-mantra opsi-diam" data-keadaan={keadaan}>
                    <span className="huruf">{HURUF[posisi]}</span>
                    <span className="isi"><TeksMat teks={q.pilihan[asli]} /></span>
                    <span className="tanda" aria-hidden="true">
                      {keadaan === 'benar' ? '✓' : keadaan === 'salah' ? '✕' : ''}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="hasil-bahas">
              <div className="kicker">Pembahasan</div>
              <Pembahasan soal={q} urut={urutQ} />
            </div>
            {!benarH && materiH && (
              <button type="button" className="pil-garis baca-materi" onClick={() => onBacaMateri(materiH.slug)}>
                Baca Materi {String(materiH.no).padStart(2, '0')} · {materiH.labelPendek}
              </button>
            )}
          </div>
        )}

        <div className="soal-aksi hasil-arah">
          <div className="soal-arah">
            <button type="button" className="pil-garis" disabled={h === 0} onClick={() => setH(h - 1)}>
              ← Sebelumnya
            </button>
            <button type="button" className="pil-garis" disabled={h === jumlah - 1} onClick={() => setH(h + 1)}>
              Berikutnya →
            </button>
          </div>
          <button
            type="button"
            className="pil-gelap"
            disabled={sisaJeda > 0}
            title={sisaJeda > 0 ? `Kuis bisa diulang ${JEDA_ULANG_MENIT} menit sesudah dikumpulkan` : undefined}
            onClick={ulang}
          >
            {sisaJeda > 0 ? `Ulangi dalam ${menitDetik(sisaJeda)}` : 'Ulangi kuis'}
          </button>
        </div>
        {sisaJeda > 0 && (
          <p className="tanya-catatan hasil-jeda">
            Kuis bisa diulang {JEDA_ULANG_MENIT} menit sesudah dikumpulkan. Sambil menunggu, baca pembahasan
            soal yang salah dan buka materinya.
          </p>
        )}
      </div>
    )
  }

  /* --------------------------------------------------------------- jawab */
  if (!s) return null
  const pilih = jawaban[s.id]
  const belum = jumlah - terjawab

  return (
    <div className="kuis">
      <div className="latihan-atas">
        <span className="cap" style={{ margin: 0 }}>Soal {i + 1} dari {jumlah}</span>
        <span className="label-soal mono">terjawab: {terjawab} / {jumlah}</span>
      </div>

      {/* Peta soal: satu kotak per soal, terisi bila sudah dijawab; benar
          atau salahnya BELUM ditunjukkan sampai dikumpulkan. */}
      <div className="peta-soal" role="group" aria-label="Peta soal">
        {urutan.map((b, n) => (
          <button
            key={b.id}
            type="button"
            className="peta-kotak"
            data-keadaan={jawaban[b.id] !== undefined ? 'terjawab' : ''}
            data-kini={n === i}
            aria-current={n === i ? 'step' : undefined}
            aria-label={`Soal ${n + 1}${jawaban[b.id] !== undefined ? ', sudah dijawab' : ''}`}
            onClick={() => setI(n)}
          >
            {n + 1}
          </button>
        ))}
      </div>

      <p className="soal-teks"><TeksMat teks={s.pertanyaan} /></p>
      {s.gambar && <GambarSoal gambar={s.gambar} />}

      <div className="opsi-daftar">
        {urut.map((asli, posisi) => (
          <button
            key={asli}
            type="button"
            className="opsi-mantra"
            data-keadaan={pilih === asli ? 'pilih' : ''}
            aria-pressed={pilih === asli}
            onClick={() => setJawaban((j) => ({ ...j, [s.id]: asli }))}
          >
            <span className="huruf">{HURUF[posisi]}</span>
            <span className="isi"><TeksMat teks={s.pilihan[asli]} /></span>
            <span className="tanda" aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="soal-aksi">
        <div className="soal-arah">
          <button type="button" className="pil-garis" disabled={i === 0} onClick={() => setI(i - 1)}>
            ← Sebelumnya
          </button>
          <button type="button" className="pil-garis" disabled={i === jumlah - 1} onClick={() => setI(i + 1)}>
            Berikutnya →
          </button>
        </div>
        <button
          type="button"
          className="pil-gelap"
          disabled={terjawab === 0}
          onClick={() => (belum === 0 ? kumpulkan() : setTanyaKumpul(true))}
        >
          Kumpulkan
        </button>
      </div>

      <Jendela buka={tanyaKumpul} onTutup={() => setTanyaKumpul(false)} labelId="judul-kumpul">
        <div className="jendela-kecil">
          <h3 id="judul-kumpul">{belum} soal belum dijawab</h3>
          <p>Soal yang kosong dihitung salah. Kumpulkan sekarang, atau kembali dan jawab dulu?</p>
          <div className="jendela-aksi">
            <button type="button" className="pil-garis" onClick={() => setTanyaKumpul(false)} autoFocus>
              Jawab dulu
            </button>
            <button type="button" className="pil-gelap" onClick={kumpulkan}>
              Kumpulkan sekarang
            </button>
          </div>
        </div>
      </Jendela>
    </div>
  )
}
