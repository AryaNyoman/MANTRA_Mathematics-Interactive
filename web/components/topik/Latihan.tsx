'use client'

import TeksMat from '@/components/latihan/TeksMat'
import { useState } from 'react'
import type { Soal } from '@/content/trigonometri'

/**
 * Latihan: satu soal per layar, pilihan ganda A sampai E.
 *
 * REVISI 1 Sep 2026 (permintaan ARYA): sebelumnya latihan berupa isian dengan
 * tombol "buka pembahasan". Masalahnya, siswa tidak pernah harus memutuskan
 * apa pun sebelum melihat jawabannya, jadi mudah merasa paham padahal belum.
 * Dengan pilihan ganda ia harus memilih dulu, dan barulah pembahasan terbuka.
 *
 * Bedanya dengan kuis: latihan TIDAK berskor dan boleh diulang. Tujuannya
 * berlatih, bukan dinilai. Karena itu setelah salah pun soalnya tetap bisa
 * dicoba lagi.
 */
export default function Latihan({ soal }: { soal: Soal[] }) {
  const [i, setI] = useState(0)
  const [dipilih, setDipilih] = useState<number | null>(null)

  const s = soal[i]
  const pindah = (ke: number) => {
    setI(ke)
    setDipilih(null)
  }

  return (
    <div className="latihan">
      <div className="latihan-atas">
        <span className="cap" style={{ margin: 0 }}>
          Soal {s.no} dari {soal.length}
        </span>
        <span className="label-soal">{s.label}</span>
      </div>

      <p className="soal-teks"><TeksMat teks={s.pertanyaan} /></p>

      <div className="pilihan">
        {s.pilihan.map((p, n) => {
          const terpilih = dipilih === n
          const iniBenar = n === s.benar
          const kelas =
            dipilih === null ? '' : iniBenar ? 'benar' : terpilih ? 'salah' : 'redam'
          return (
            <button
              key={n}
              className={`opsi ${kelas}`}
              onClick={() => setDipilih(n)}
              disabled={dipilih !== null}
            >
              <span className="huruf">{String.fromCharCode(65 + n)}</span>
              <TeksMat teks={p} blok={false} />
            </button>
          )
        })}
      </div>

      {dipilih !== null && (
        <div className="pembahasan">
          <div className="cap">
            {dipilih === s.benar ? 'Benar' : 'Belum tepat, ini langkahnya'}
          </div>
          {/* Langkah muncul BERURUTAN, 120 milidetik jarak antarnya, bukan
              serentak. Pembahasan adalah urutan berpikir, dan urutan yang
              muncul sekaligus terbaca sebagai daftar, bukan sebagai jalan.
              Tundaannya kecil, jadi yang sudah tahu jawabannya tidak
              menunggu. `prefers-reduced-motion` mematikan animasinya lewat
              aturan menyeluruh di globals.css, dan `both` menahan keadaan
              akhir sehingga langkahnya tetap terbaca. */}
          <ol>
            {s.pembahasan.map((baris, n) => (
              <li key={n} style={{ animationDelay: `${n * 120}ms` }}>
                <TeksMat teks={baris} />
              </li>
            ))}
          </ol>
          <div className="jawaban">
            <span className="cap" style={{ margin: 0 }}>Jawaban</span>
            <b>{s.jawaban}</b>
          </div>
          {dipilih !== s.benar && (
            <button
              className="tombol garis"
              style={{ marginTop: 12 }}
              onClick={() => setDipilih(null)}
            >
              COBA LAGI SOAL INI
            </button>
          )}
        </div>
      )}

      <div className="latihan-bawah">
        <button
          className="tombol garis"
          disabled={i === 0}
          onClick={() => pindah(i - 1)}
        >
          &#8592; SEBELUMNYA
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
          BERIKUTNYA &#8594;
        </button>
      </div>
    </div>
  )
}
