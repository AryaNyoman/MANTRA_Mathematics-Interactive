'use client'

import { useState } from 'react'
import type { Soal } from '@/content/trigonometri'

/**
 * Latihan: satu soal per layar, pembahasan disembunyikan sampai siswa minta.
 *
 * Sengaja TIDAK langsung menampilkan pembahasan. Kalau jawabannya terlihat
 * bersama soalnya, siswa membaca alih-alih mengerjakan — dan merasa paham
 * padahal belum. Tombolnya diberi label jujur: "menyerah dulu".
 */
export default function Latihan({ soal }: { soal: Soal[] }) {
  const [i, setI] = useState(0)
  const [buka, setBuka] = useState(false)

  const s = soal[i]
  const pindah = (ke: number) => {
    setI(ke)
    setBuka(false)
  }

  return (
    <div className="latihan">
      <div className="latihan-atas">
        <span className="cap" style={{ margin: 0 }}>
          Soal {s.no} dari {soal.length}
        </span>
        <span className="label-soal">{s.label}</span>
      </div>

      <p className="soal-teks">{s.pertanyaan}</p>

      {buka ? (
        <div className="pembahasan">
          <div className="cap">Pembahasan</div>
          <ol>
            {s.pembahasan.map((baris, n) => (
              <li key={n}>{baris}</li>
            ))}
          </ol>
          <div className="jawaban">
            <span className="cap" style={{ margin: 0 }}>Jawaban</span>
            <b>{s.jawaban}</b>
          </div>
        </div>
      ) : (
        <button className="tombol garis buka-bahas" onClick={() => setBuka(true)}>
          COBA DULU · BUKA PEMBAHASAN KALAU SUDAH MENTOK
        </button>
      )}

      <div className="latihan-bawah">
        <button
          className="tombol garis"
          disabled={i === 0}
          onClick={() => pindah(i - 1)}
        >
          ← SEBELUMNYA
        </button>
        <div className="titik-soal">
          {soal.map((_, n) => (
            <button
              key={n}
              aria-label={`Soal ${n + 1}`}
              aria-current={n === i}
              className={n === i ? 'aktif' : ''}
              onClick={() => pindah(n)}
            />
          ))}
        </div>
        <button
          className="tombol garis"
          disabled={i === soal.length - 1}
          onClick={() => pindah(i + 1)}
        >
          BERIKUTNYA →
        </button>
      </div>
    </div>
  )
}
