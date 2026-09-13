'use client'

import { useId, useRef, useState } from 'react'
import { keluarGuru, masukGuru, useModeGuru } from '@/lib/mode-guru'

/**
 * Tombol "Guru" di ujung kanan nav (ARYA 13 Sep 2026). Menekannya membuka
 * dialog kata kunci; kalau cocok, semua tingkat latihan dan kuis materi
 * terbuka di peramban ini. Saat aktif tombolnya bertuliskan "Guru ✓" dan
 * menekannya keluar dari mode guru. Tidak dipasang di halaman belajar
 * (permintaan ARYA: halaman materi tempat mode fokus).
 */
export default function TombolGuru() {
  const guru = useModeGuru()
  const dialog = useRef<HTMLDialogElement>(null)
  const [kata, setKata] = useState('')
  const [salah, setSalah] = useState(false)
  const [sibuk, setSibuk] = useState(false)
  const idMedan = useId()

  function buka() {
    setKata('')
    setSalah(false)
    dialog.current?.showModal()
  }

  async function kirim(e: React.FormEvent) {
    e.preventDefault()
    setSibuk(true)
    const cocok = await masukGuru(kata)
    setSibuk(false)
    if (cocok) dialog.current?.close()
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
      <button type="button" className="nav-guru" title="Mode guru: buka semua latihan, kuis, dan pembahasan dengan kata kunci" onClick={buka}>
        Guru
      </button>
      <dialog ref={dialog} className="dialog-guru" aria-labelledby={`${idMedan}-judul`}>
        <form onSubmit={kirim} method="dialog">
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
            <button type="button" className="pil-garis" onClick={() => dialog.current?.close()}>
              Batal
            </button>
            <button type="submit" className="pil-gelap" disabled={sibuk || kata.length === 0}>
              Masuk
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}
