'use client'

import { useRef, useState } from 'react'
import { GarisBilangan, Penanda, TumpukanTitik } from '@/components/widget/statistika/GarisBilangan'
import { MONO, PERAN } from '@/components/widget/statistika/warna-data'
import { VH, VW, angka, petak } from '@/components/widget/statistika/skala'
import { propTitikSeret, useSeret } from '@/components/widget/statistika/seret'
import { ringkasTunggal } from '@/components/widget/statistika/statistik'
import { keterangan, tunggal } from '@/content/statistika/data'
import type { PropWidget } from '@/components/widget/statistika/jenis'

/**
 * Tahap 5. Mean sebagai TITIK SEIMBANG, bukan sekadar jumlah dibagi banyak.
 *
 * KENAPA PAPAN JUNGKAT-JUNGKIT
 * Rumus mean gampang dihafal dan gampang dipakai, tetapi tidak menjelaskan
 * apa-apa. Yang menjelaskan adalah sifatnya: jumlah simpangan ke kiri selalu
 * sama dengan jumlah simpangan ke kanan. Sifat itu bisa dilihat, dan papan
 * yang miring saat penopangnya salah tempat adalah cara melihatnya.
 *
 * Penopangnya bisa digeser sendiri oleh siswa, dan papannya akan miring, supaya
 * kalimat "mean adalah titik seimbang" jadi sesuatu yang diuji, bukan diberitahu.
 */

const D = tunggal('t05-ulangan')
const MIN = 0
const MAKS = 14
const KIRI = 46
const KANAN = VW - 22
const ke = (v: number) => KIRI + ((v - MIN) / (MAKS - MIN)) * (KANAN - KIRI)
const dari = (px: number) => MIN + ((px - KIRI) / (KANAN - KIRI)) * (MAKS - MIN)
const TIK = petak(MIN, MAKS, 8)

// Papan sengaja ditaruh agak ke atas. Pada susunan sebelumnya papan berada di
// 214 dan sepertiga atas bingkainya kosong melompong, terlihat jelas di potret
// layar. Sekarang isinya memenuhi bingkai.
const DASAR = 168
const TINGGI_PENOPANG = 26
const GARIS_Y = 258

export default function TigaUkuran({ children }: PropWidget) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [data, setData] = useState<number[]>(D.data)
  const [tumpu, setTumpu] = useState<number | null>(null) // null berarti ikut mean

  const r = ringkasTunggal(data)
  const letakTumpu = tumpu ?? r.mean

  // Torsi: jumlah simpangan terhadap penopang. Nol berarti seimbang, dan itu
  // hanya terjadi kalau penopangnya tepat di mean.
  const torsi = data.reduce((a, v) => a + (v - letakTumpu), 0)
  const miring = Math.max(-14, Math.min(14, torsi * 1.6))

  const pindah = (indeks: number, nilai: number) => {
    const bulat = Math.round(Math.min(MAKS, Math.max(MIN, nilai)))
    setData((lama) => {
      if (lama[indeks] === bulat) return lama
      const baru = [...lama]
      baru[indeks] = bulat
      return baru
    })
  }

  const { aktif, propSvg, mulai } = useSeret(svgRef, (i, x) => pindah(i, dari(x)))

  const seimbang = Math.abs(torsi) < 1e-9
  const px = ke(letakTumpu)

  const kiri = (
    <>
      <div className="layar">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet"
             role="img" aria-label="Papan jungkat-jungkit berisi data, penopangnya di rata-rata"
             {...propSvg}>
          {/* papan yang miring kalau penopangnya bukan di mean */}
          <g transform={`rotate(${miring.toFixed(2)} ${px} ${DASAR})`}>
            <line x1={KIRI - 8} y1={DASAR} x2={KANAN + 8} y2={DASAR}
                  stroke={PERAN.tinta} strokeWidth={3} strokeLinecap="round" />
            <TumpukanTitik
              data={data}
              ke={ke}
              dasar={DASAR - 2}
              jejari={6.5}
              warna={PERAN.data}
              propTitik={(i, v) => ({
                ...propTitikSeret({
                  indeks: i, nilai: v, mulai, geser: pindah,
                  nama: `Nilai siswa ke-${i + 1}, sekarang ${v}`,
                }),
                strokeWidth: aktif === i ? 2.5 : 1.5,
              })}
            />
          </g>

          {/* penopang */}
          <polygon
            points={`${px},${DASAR + 2} ${px - 11},${DASAR + TINGGI_PENOPANG} ${px + 11},${DASAR + TINGGI_PENOPANG}`}
            fill={seimbang ? PERAN.sorot : PERAN.banding}
          />
          <text x={px} y={DASAR + TINGGI_PENOPANG + 14} textAnchor="middle" fontSize={10}
                fontFamily={MONO} fill={seimbang ? PERAN.sorot : PERAN.banding}>
            penopang {angka(letakTumpu, 2)}
          </text>

          {/* penanda median dan modus di bawah garis bilangan */}
          <Penanda x={ke(r.median)} dariY={GARIS_Y - 26} sampaiY={GARIS_Y} warna={PERAN.tinta}
                   label="median" nilai={r.median} sisi="atas" />
          <GarisBilangan ke={ke} y={GARIS_Y} tik={TIK} dariX={MIN} sampaiX={MAKS} />

          <text x={KIRI} y={22} fontSize={11} fontFamily={MONO} fill={PERAN.tinta}>
            {seimbang ? 'seimbang, penopangnya tepat di rata-rata' : 'miring, penopangnya bukan di rata-rata'}
          </text>
        </svg>
      </div>
      <div className="kendali">
        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="tumpu">
            <span>Letak penopang</span>
            <span className="mono">{angka(letakTumpu, 2)}</span>
          </label>
          <input id="tumpu" type="range" min={MIN} max={MAKS} step={0.25} value={letakTumpu}
                 onChange={(e) => setTumpu(+e.target.value)} />
        </div>
        <div>
          <label><span>Kembalikan</span></label>
          <div className="pilih-sisi">
            <button disabled={tumpu === null} onClick={() => setTumpu(null)}>
              Taruh di rata-rata
            </button>
          </div>
        </div>
        <div>
          <label><span>Data asli</span></label>
          <div className="pilih-sisi">
            <button onClick={() => { setData(D.data); setTumpu(null) }}>Kembalikan semula</button>
          </div>
        </div>
        <div className="skala-info">
          <span className="titik" />
          <span>
            {seimbang
              ? 'geser penopangnya sedikit saja, papannya langsung miring'
              : `jumlah simpangan ke penopang ${angka(torsi, 2)}, bukan nol, jadi papannya miring`}
          </span>
        </div>
      </div>
    </>
  )

  const simpangan = data.map((v) => v - r.mean)
  const kanan = (
    <div className="blok">
      <div className="cap">Angka dari alat di sebelah kiri</div>
      <table className="tabel-angka">
        <tbody>
          <tr><td>data terurut</td><td>{[...data].sort((a, b) => a - b).join('  ')}</td></tr>
          <tr><td>jumlah</td><td>{angka(r.jumlah, 2)}</td></tr>
          <tr className="tegas"><td>rata-rata</td><td>{angka(r.mean, 3)}</td></tr>
          <tr><td>median</td><td>{angka(r.median, 2)}</td></tr>
          <tr><td>modus</td><td>{r.modus.map((m) => angka(m, 2)).join(', ') || 'tidak ada'}</td></tr>
          <tr className="tegas">
            <td>jumlah simpangan ke rata-rata</td>
            <td>{angka(simpangan.reduce((a, b) => a + b, 0), 3)}</td>
          </tr>
        </tbody>
      </table>
      <div className="catatan">
        Baris terakhir selalu nol, berapa pun datanya diubah. Itulah arti mean sebagai
        titik seimbang, dan itu pula sebabnya simpangan harus dikuadratkan dulu sebelum
        bisa dipakai mengukur sebaran di Tahap 8. {keterangan(D)}
      </div>
    </div>
  )

  return <>{children({ kiri, kanan })}</>
}
