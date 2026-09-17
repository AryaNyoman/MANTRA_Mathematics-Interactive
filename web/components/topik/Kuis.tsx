'use client'

import { useCallback, useState, useSyncExternalStore } from 'react'
import { baca, bacaDiServer, langgan, tulis } from '@/lib/simpanan'
import { ambilSoal } from '@/lib/soal-acak'
import type { SoalKuis } from '@/content/trigonometri'
import TeksMat from '@/components/latihan/TeksMat'
import GambarSoal from '@/components/latihan/gambar/GambarSoal'

/**
 * Kuis berskor. Tanpa database dan tanpa login, skor disimpan di browser
 * siswa lewat localStorage (lihat keputusan di docs/.../matra-design.md).
 *
 * Saat salah, yang ditampilkan bukan sekadar "salah" tapi ALASANNYA, termasuk
 * kenapa pilihan yang keliru itu terasa masuk akal. Menyalahkan tanpa
 * menjelaskan tidak mengajari apa pun.
 */
export default function Kuis({
  bank,
  jumlah,
  kunciSimpan,
  topik,
}: {
  /** seluruh bank soal, 32 butir untuk Trigonometri */
  bank: SoalKuis[]
  /** berapa soal per sesi */
  jumlah: number
  kunciSimpan: string
  /** slug topik, dipakai mencatat soal mana yang sudah pernah keluar */
  topik: string
}) {
  /* Soal dipilih SEKALI saat kuis dibuka, lewat inisialisasi malas useState.
     Aman memakai Math.random() di sini: komponen ini baru dipasang setelah
     siswa menekan tab Kuis, jadi tidak pernah dirender di server dan tidak
     ada ketidakcocokan hidrasi. */
  const [soal, setSoal] = useState<SoalKuis[]>(() => ambilSoal(bank, jumlah, topik))
  const [i, setI] = useState(0)
  const [dipilih, setDipilih] = useState<number | null>(null)
  const [benar, setBenar] = useState(0)
  const [selesai, setSelesai] = useState(false)

  // Dibaca lewat useSyncExternalStore, BUKAN setState di useEffect:
  // di server hasilnya null, di browser dibaca dari localStorage.
  const tersimpan = useSyncExternalStore(
    langgan,
    useCallback(() => baca(kunciSimpan), [kunciSimpan]),
    bacaDiServer,
  )
  const rekor = tersimpan === null ? null : Number(tersimpan)

  const s = soal[i]

  function jawab(n: number) {
    if (dipilih !== null) return
    setDipilih(n)
    if (n === s.benar) setBenar((b) => b + 1)
  }

  function lanjut() {
    const skorAkhir = benar
    if (i === soal.length - 1) {
      setSelesai(true)
      if (rekor === null || skorAkhir > rekor) tulis(kunciSimpan, String(skorAkhir))
    } else {
      setI(i + 1)
      setDipilih(null)
    }
  }

  /* Mengulang berarti soal BARU, bukan soal yang sama diulang. Itu seluruh
     alasan bank 32 soal ini ada. */
  function ulang() {
    setSoal(ambilSoal(bank, jumlah, topik))
    setI(0); setDipilih(null); setBenar(0); setSelesai(false)
  }

  if (selesai) {
    const persen = Math.round((benar / soal.length) * 100)
    return (
      <div className="kuis-selesai">
        <div className="cap">Hasil</div>
        <div className="skor mono">{benar} / {soal.length}</div>
        <p>
          {persen === 100
            ? 'Semua benar. Konsep rasionya sudah pegang.'
            : persen >= 75
              ? 'Sudah kuat. Baca lagi pembahasan yang salah, lalu ulangi.'
              : persen >= 50
                ? 'Separuh jalan. Tonton animasinya sekali lagi, lalu coba alat interaktifnya.'
                : 'Belum nyantol. Mulai lagi dari animasi dan alat interaktifnya, jangan langsung ke soal.'}
        </p>
        {rekor !== null && <p className="catatan">Nilai terbaik Anda di perangkat ini: {rekor} / {soal.length}</p>}
        <button className="tombol" onClick={ulang}>ULANGI DENGAN SOAL BARU</button>
      </div>
    )
  }

  return (
    <div className="kuis">
      <div className="latihan-atas">
        <span className="cap" style={{ margin: 0 }}>Soal {i + 1} dari {soal.length}</span>
        <span className="label-soal mono">benar: {benar}</span>
      </div>

      <p className="soal-teks"><TeksMat teks={s.pertanyaan} /></p>
      {s.gambar && <GambarSoal gambar={s.gambar} />}

      <div className="pilihan">
        {s.pilihan.map((p, n) => {
          const terpilih = dipilih === n
          const iniBenar = n === s.benar
          const kelas = dipilih === null ? '' : iniBenar ? 'benar' : terpilih ? 'salah' : 'redam'
          return (
            <button key={n} className={`opsi ${kelas}`} onClick={() => jawab(n)} disabled={dipilih !== null}>
              <span className="huruf">{String.fromCharCode(65 + n)}</span>
              <span className="isi"><TeksMat teks={p} blok={false} /></span>
              {/* tanda ✓ atau ✕ tumbuh sesudah menjawab, bahasa umpan balik yang sama dengan bank soal */}
              <span className="tanda" aria-hidden="true">{kelas === 'benar' ? '✓' : kelas === 'salah' ? '✕' : ''}</span>
            </button>
          )
        })}
      </div>

      {dipilih !== null && (
        <div className="pembahasan">
          <div className="cap">{dipilih === s.benar ? 'Benar' : 'Belum tepat'}</div>
          <p style={{ margin: 0 }}><TeksMat teks={s.alasan} /></p>
        </div>
      )}

      <div className="latihan-bawah" style={{ justifyContent: 'flex-end' }}>
        <button className="tombol" disabled={dipilih === null} onClick={lanjut}>
          {i === soal.length - 1 ? 'LIHAT HASIL' : 'LANJUT →'}
        </button>
      </div>
    </div>
  )
}
