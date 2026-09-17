'use client'

import { useId, useState } from 'react'
import { keluarGuru, masukGuru, useModeGuru } from '@/lib/mode-guru'
import Jendela from '@/components/mantra/Jendela'

/**
 * Tombol "Guru" di ujung kanan nav (ARYA 13 Sep 2026). Menekannya membuka
 * dialog kata kunci; kalau cocok, semua tingkat latihan dan kuis materi
 * terbuka di peramban ini. Saat aktif tombolnya bertuliskan "Guru ✓" dan
 * menekannya keluar dari mode guru. Tidak dipasang di halaman belajar
 * (permintaan ARYA: halaman materi tempat mode fokus).
 *
 * Jendelanya memakai `Jendela` bersama (17 Sep 2026 malam): satu bentuk dan
 * satu gerak dengan jendela skor, lencana, dan keluar di bank soal.
 */
export default function TombolGuru() {
  const guru = useModeGuru()
  const [buka, setBuka] = useState(false)
  const [kata, setKata] = useState('')
  const [salah, setSalah] = useState(false)
  const [sibuk, setSibuk] = useState(false)
  const idMedan = useId()

  function bukaDialog() {
    setKata('')
    setSalah(false)
    setBuka(true)
  }

  async function kirim(e: React.FormEvent) {
    e.preventDefault()
    setSibuk(true)
    const cocok = await masukGuru(kata)
    setSibuk(false)
    if (cocok) setBuka(false)
    else setSalah(true)
  }

  if (guru) {
    return (
      <button type="button" className="nav-guru nav-guru-aktif" title="Mode guru aktif: semua tingkat dan kuis terbuka. Tekan untuk keluar."
              onClick={keluarGuru}>
        Guru <span aria-hidden>&#10003;</span>
      </button>
    )
  }

  return (
    <>
      <button type="button" className="nav-guru" title="Mode guru: buka semua latihan, kuis, dan pembahasan dengan kata kunci" onClick={bukaDialog}>
        Guru
      </button>
      <Jendela buka={buka} onTutup={() => setBuka(false)} kelas="dialog-guru" labelId={`${idMedan}-judul`}>
        <form onSubmit={kirim}>
          <div className="kicker">Mode guru</div>
          <h2 id={`${idMedan}-judul`}>Masukkan kata kunci</h2>
          <p>
            Semua tingkat latihan dan kuis materi terbuka di peramban ini, supaya
            soal dan pembahasannya bisa dibaca kapan saja. Kemajuan siswa di
            peramban ini tidak ikut berubah.
          </p>
          <label htmlFor={idMedan}>Kata kunci</label>
          <input
            id={idMedan}
            type="password"
            autoComplete="off"
            value={kata}
            onChange={(e) => {
              setKata(e.target.value)
              setSalah(false)
            }}
            aria-invalid={salah}
            aria-describedby={salah ? `${idMedan}-salah` : undefined}
          />
          {salah && (
            <p id={`${idMedan}-salah`} className="dialog-guru-salah" role="alert">
              Kata kunci tidak cocok.
            </p>
          )}
          <div className="dialog-guru-aksi">
            <button type="button" className="pil-garis" onClick={() => setBuka(false)}>
              Batal
            </button>
            <button type="submit" className="pil-gelap" disabled={sibuk || kata.length === 0}>
              Masuk
            </button>
          </div>
        </form>
      </Jendela>
    </>
  )
}
