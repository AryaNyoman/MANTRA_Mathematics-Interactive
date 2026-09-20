'use client'

import { useCallback, useState, useSyncExternalStore } from 'react'
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
 * SEMUA pembahasan: langkah bergambar (komponen Pembahasan yang sama dengan
 * menu Latihan), jebakan pengecoh, dan untuk jawaban yang salah tombol
 * "Baca Materi 05 · Lingkaran satuan" yang langsung membuka materinya.
 *
 * SATU PAKET, DIACAK. Soalnya sepuluh butir `KUIS_BAB` (soal bank yang
 * konsepnya memang diajarkan bab ini, masing-masing menunjuk materi asalnya).
 * Urutan soal dikocok saat kuis dibuka, urutan pilihan dikocok per soal
 * dengan benih tab yang sama dengan Latihan (lib/acak-pilihan.ts), jadi
 * huruf jawaban tidak bisa dihafal walau paketnya tetap.
 *
 * Skor terbaik di `matra:kuis:<bab>` (angka benar dari 10); hasil terakhir di
 * `matra:kuis:<bab>:terakhir` sebagai JSON { tanggal, benar, salah: id[] }.
 * Tanpa database dan tanpa login: semuanya di peramban siswa.
 *
 * Komponen ini baru dipasang sesudah siswa membuka tab Kuis (dan kuisnya
 * terbuka), jadi Math.random di pengocok tidak pernah berjalan di server.
 */
export default function Kuis({
  paket,
  bank,
  tahap,
  kunciSimpan,
  onBacaMateri,
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
}) {
  const soalPerId = new Map(bank.map((s) => [s.id, s]))
  const butirSah = paket.filter((b) => soalPerId.has(b.id))

  const [urutan, setUrutan] = useState<ButirKuisBab[]>(() => kocok(butirSah))
  const [i, setI] = useState(0)
  /** jawaban per id soal: indeks pilihan ASLI di bank */
  const [jawaban, setJawaban] = useState<Record<string, number>>({})
  const [dikumpulkan, setDikumpulkan] = useState(false)
  const [tanyaKumpul, setTanyaKumpul] = useState(false)

  // benih kocokan pilihan: tetap selama tab hidup, '0' (urutan asli) di server
  const benih = useSyncExternalStore(() => () => {}, bacaBenih, () => '0')
  const tersimpan = useSyncExternalStore(
    langgan,
    useCallback(() => baca(kunciSimpan), [kunciSimpan]),
    bacaDiServer,
  )
  const rekor = tersimpan === null ? null : Number(tersimpan)

  const jumlah = urutan.length
  const terjawab = urutan.filter((b) => jawaban[b.id] !== undefined).length
  const butir = urutan[i]
  const s = butir ? soalPerId.get(butir.id) : undefined
  const urut = s ? urutanPilihan(s.id, benih, s.pilihan.length) : []

  const benarSemua = urutan.filter((b) => jawaban[b.id] === soalPerId.get(b.id)?.benar).length
  const skorTampil = useHitung(benarSemua, dikumpulkan)

  function kumpulkan() {
    setTanyaKumpul(false)
    setDikumpulkan(true)
    const salah = urutan.filter((b) => jawaban[b.id] !== soalPerId.get(b.id)?.benar).map((b) => b.id)
    if (rekor === null || benarSemua > rekor) tulis(kunciSimpan, String(benarSemua))
    tulisDiam(`${kunciSimpan}:terakhir`, JSON.stringify({ tanggal: new Date().toISOString().slice(0, 10), benar: benarSemua, salah }))
  }

  /* Mengulang mengocok ulang paket yang sama: urutan soal baru, dan pilihan
     tetap ikut benih tab. Jawaban lama dibuang. */
  function ulang() {
    setUrutan(kocok(butirSah))
    setI(0)
    setJawaban({})
    setDikumpulkan(false)
  }

  if (jumlah === 0) {
    return <p className="soal-kosong">Paket kuis bab ini belum disusun.</p>
  }

  /* ---------------------------------------------------------------- hasil */
  if (dikumpulkan) {
    const persen = Math.round((benarSemua / jumlah) * 100)
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

        <ol className="hasil-daftar">
          {urutan.map((b, n) => {
            const q = soalPerId.get(b.id)
            if (!q) return null
            const urutQ = urutanPilihan(q.id, benih, q.pilihan.length)
            const pilih = jawaban[q.id]
            const benar = pilih === q.benar
            const materi = tahap.find((t) => t.slug === b.materi)
            return (
              <li key={q.id} className="hasil-soal" data-benar={benar}>
                <div className="hasil-kepala">
                  <span className="kicker">Soal {n + 1}</span>
                  <span className="hasil-tanda">
                    {benar ? 'Benar' : pilih === undefined ? 'Tidak dijawab' : 'Salah'}
                  </span>
                </div>
                <p className="soal-teks"><TeksMat teks={q.pertanyaan} /></p>
                {q.gambar && <GambarSoal gambar={q.gambar} />}
                <div className="opsi-daftar">
                  {urutQ.map((asli, posisi) => {
                    const keadaan = asli === q.benar ? 'benar' : pilih === asli ? 'salah' : 'redam'
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
                {!benar && materi && (
                  <button type="button" className="pil-garis baca-materi" onClick={() => onBacaMateri(materi.slug)}>
                    Baca Materi {String(materi.no).padStart(2, '0')} · {materi.labelPendek}
                  </button>
                )}
              </li>
            )
          })}
        </ol>

        <div className="hasil-aksi">
          <button type="button" className="tombol" onClick={ulang}>ULANGI KUIS</button>
        </div>
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
