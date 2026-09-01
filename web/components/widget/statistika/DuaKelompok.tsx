'use client'

import { useRef, useState } from 'react'
import { GarisBilangan, Penanda, TumpukanTitik } from '@/components/widget/statistika/GarisBilangan'
import { MONO, PERAN } from '@/components/widget/statistika/warna-data'
import { VH, VW, angka, petak } from '@/components/widget/statistika/skala'
import { propTitikSeret, useSeret } from '@/components/widget/statistika/seret'
import { ringkasTunggal } from '@/components/widget/statistika/statistik'
import { tunggal } from '@/content/statistika/data'
import type { PropWidget } from '@/components/widget/statistika/jenis'

/**
 * Tahap 1. Dua kelompok yang ketiga ukuran pemusatannya sama persis, tetapi
 * sebarannya jauh berbeda.
 *
 * Yang harus terasa saat dipakai: menyeret titik di Kelas B mengubah bentuk
 * datanya habis-habisan, sementara rata-ratanya bisa dikembalikan ke 7 kapan
 * saja. Jadi rata-rata yang sama sekali-kali bukan jaminan data yang mirip.
 */

const A = tunggal('t01-kelas-a')
const B = tunggal('t01-kelas-b')

const MIN = 0
const MAKS = 12
const JUMLAH_SASARAN = B.data.reduce((a, b) => a + b, 0)

const KIRI = 46
const KANAN = VW - 20
const ke = (v: number) => KIRI + ((v - MIN) / (MAKS - MIN)) * (KANAN - KIRI)
const dari = (px: number) => MIN + ((px - KIRI) / (KANAN - KIRI)) * (MAKS - MIN)

const DASAR_A = 128
const DASAR_B = 262
// target 8 menghasilkan langkah 2, jadi angkanya 0 2 4 6 8 10 12. Target 6
// menghasilkan langkah 5, dan garis bilangan bernilai bulat kecil jadi sulit
// dibaca kalau angkanya cuma 0, 5, dan 10.
const TIK = petak(MIN, MAKS, 8)

/**
 * Kembalikan jumlah data ke sasaran tanpa mengembalikan bentuknya.
 *
 * Dibagi rata ke titik mana pun yang masih punya ruang, satu langkah pada satu
 * waktu. Cara ini sengaja dipilih supaya bentuk data yang sudah diacak siswa
 * tetap terasa acak setelah rata-ratanya dibetulkan. Kalau semua selisih
 * ditumpuk ke satu titik saja, hasilnya malah terlihat seperti pencilan buatan
 * dan pesan tahap ini jadi kabur.
 */
function samakanJumlah(data: number[], sasaran: number): number[] {
  const hasil = [...data]
  let sisa = sasaran - hasil.reduce((a, b) => a + b, 0)
  let putaran = 0
  while (sisa !== 0 && putaran < 200) {
    let berubah = false
    for (let i = 0; i < hasil.length && sisa !== 0; i++) {
      const arah = sisa > 0 ? 1 : -1
      const baru = hasil[i] + arah
      if (baru < MIN || baru > MAKS) continue
      hasil[i] = baru
      sisa -= arah
      berubah = true
    }
    if (!berubah) break
    putaran++
  }
  return hasil
}

export default function DuaKelompok({ children }: PropWidget) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [dataB, setDataB] = useState<number[]>(B.data)

  const pindah = (indeks: number, nilai: number) => {
    const bulat = Math.round(Math.min(MAKS, Math.max(MIN, nilai)))
    setDataB((lama) => {
      if (lama[indeks] === bulat) return lama
      const baru = [...lama]
      baru[indeks] = bulat
      return baru
    })
  }

  const { aktif, propSvg, mulai } = useSeret(svgRef, (i, x) => pindah(i, dari(x)))

  const rA = ringkasTunggal(A.data)
  const rB = ringkasTunggal(dataB)
  const utuh = dataB.every((v, i) => v === B.data[i])

  const kiri = (
    <>
      <div className="layar">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet"
             role="img" aria-label="Dua kelompok nilai di atas garis bilangan, kelompok bawah bisa digeser"
             {...propSvg}>
          <text x={KIRI} y={20} fontSize={11} fontFamily={MONO} fill={PERAN.tinta}>
            Kelas A, tidak bisa digeser
          </text>
          <Penanda x={ke(rA.mean)} dariY={DASAR_A - 62} sampaiY={DASAR_A} warna={PERAN.sorot}
                   label="rata-rata" nilai={rA.mean} putus />
          <TumpukanTitik data={A.data} ke={ke} dasar={DASAR_A} warna={PERAN.data} />
          <GarisBilangan ke={ke} y={DASAR_A} tik={TIK} dariX={MIN} sampaiX={MAKS} />

          <text x={KIRI} y={DASAR_A + 44} fontSize={11} fontFamily={MONO} fill={PERAN.tinta}>
            Kelas B, seret titiknya
          </text>
          <Penanda x={ke(rB.mean)} dariY={DASAR_B - 62} sampaiY={DASAR_B} warna={PERAN.sorot}
                   label="rata-rata" nilai={rB.mean} putus />
          <TumpukanTitik
            data={dataB}
            ke={ke}
            dasar={DASAR_B}
            warna={PERAN.banding}
            jejari={6.5}
            propTitik={(i, v) => ({
              ...propTitikSeret({
                indeks: i, nilai: v, mulai, geser: pindah,
                nama: `Nilai siswa ke-${i + 1} di Kelas B, sekarang ${v}`,
              }),
              strokeWidth: aktif === i ? 2.5 : 1.5,
            })}
          />
          <GarisBilangan ke={ke} y={DASAR_B} tik={TIK} dariX={MIN} sampaiX={MAKS} />
        </svg>
      </div>
      <div className="kendali">
        <div>
          <label><span>Kembalikan rata-rata ke 7</span></label>
          <div className="pilih-sisi">
            <button onClick={() => setDataB((d) => samakanJumlah(d, JUMLAH_SASARAN))}>
              Samakan rata-ratanya
            </button>
          </div>
        </div>
        <div>
          <label><span>Data asli</span></label>
          <div className="pilih-sisi">
            <button disabled={utuh} onClick={() => setDataB(B.data)}>Kembalikan semula</button>
          </div>
        </div>
        <div className="skala-info">
          <span className="titik" />
          <span>
            acak dulu titik Kelas B sesuka Anda, lalu tekan samakan. Rata-ratanya kembali 7,
            tetapi bentuk datanya tetap berantakan
          </span>
        </div>
      </div>
    </>
  )

  const baris: Array<[string, string, string, boolean]> = [
    ['banyak data', String(rA.n), String(rB.n), false],
    ['rata-rata', angka(rA.mean, 2), angka(rB.mean, 2), true],
    ['median', angka(rA.median, 2), angka(rB.median, 2), false],
    ['modus', rA.modus.map((m) => angka(m, 2)).join(', ') || 'tidak ada',
      rB.modus.map((m) => angka(m, 2)).join(', ') || 'tidak ada', false],
    ['jangkauan', angka(rA.jangkauan, 2), angka(rB.jangkauan, 2), true],
    ['simpangan baku', angka(rA.simpanganBaku, 2), angka(rB.simpanganBaku, 2), false],
  ]

  const kanan = (
    <div className="blok">
      <div className="cap">Angka dari alat di sebelah kiri</div>
      <table className="tabel-angka">
        <thead>
          <tr>
            <td />
            <td style={{ textAlign: 'right', fontFamily: 'var(--font-plex-mono), monospace' }}>Kelas A</td>
            <td style={{ textAlign: 'right' }}>Kelas B</td>
          </tr>
        </thead>
        <tbody>
          {baris.map(([nama, a, b, tegas]) => (
            <tr key={nama} className={tegas ? 'tegas' : undefined}>
              <td>{nama}</td>
              {/*
                Kolom terakhir sudah disorot oleh globals.css pada baris tegas.
                Kolom Kelas A disamakan di sini, sebab kalau tidak, baris
                "rata-rata 7 lawan 7" terlihat seolah angka Kelas B yang
                istimewa, padahal justru KESAMAAN keduanya yang jadi intinya.
              */}
              <td style={{
                textAlign: 'right',
                fontFamily: 'var(--font-plex-mono), monospace',
                ...(tegas ? { color: 'var(--bata)', fontSize: 20 } : null),
              }}>{a}</td>
              <td style={{ textAlign: 'right' }}>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="catatan">
        {utuh
          ? 'Data aslinya: ketiga ukuran pemusatan sama persis, 7 semua. Yang membedakan cuma jangkauan, 2 lawan 8.'
          : 'Data Kelas B sudah Anda ubah. Perhatikan rata-rata boleh sama sambil jangkauannya jauh berbeda.'}
        {' '}Angka ini dibuat untuk latihan, bukan data sungguhan.
      </div>
    </div>
  )

  return <>{children({ kiri, kanan })}</>
}
