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
 * Tahap 6. Satu titik ditarik jauh, mean ikut lari, median bertahan.
 *
 * KENAPA CUMA SATU TITIK YANG BISA DISERET
 * Kalau semua titik bisa diseret, siswa akan sibuk mengatur bentuk data dan
 * kehilangan satu-satunya hal yang ingin ditunjukkan tahap ini: pengaruh SATU
 * data terhadap dua ukuran yang berbeda. Titik yang lain sengaja dikunci.
 */

const TANPA = tunggal('t06-tanpa-direktur')
const DENGAN = tunggal('t06-dengan-direktur')

/** Sembilan gaji karyawan, tidak bisa diubah. Yang bisa diseret cuma direkturnya. */
const TETAP = TANPA.data
const MIN = 0
const MAKS = 80
const KIRI = 46
const KANAN = VW - 26
const ke = (v: number) => KIRI + ((v - MIN) / (MAKS - MIN)) * (KANAN - KIRI)
const dari = (px: number) => MIN + ((px - KIRI) / (KANAN - KIRI)) * (MAKS - MIN)
const TIK = petak(MIN, MAKS, 8)
// Letaknya dicari dua kali. Pada 232 sepertiga ATAS bingkainya kosong, pada 186
// giliran sepertiga BAWAH yang kosong. 210 membuat isinya duduk di tengah.
const DASAR = 210

export default function TarikPencilan({ children }: PropWidget) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [direktur, setDirektur] = useState<number>(
    DENGAN.data[DENGAN.data.length - 1],
  )

  const pindah = (_i: number, nilai: number) => {
    // dibatasi di atas gaji karyawan tertinggi supaya ia tetap berperan sebagai
    // data yang paling kanan, yang memang sedang dibahas
    const bulat = Math.round(Math.min(MAKS, Math.max(7.5, nilai)) * 10) / 10
    setDirektur(bulat)
  }

  const { aktif, propSvg, mulai } = useSeret(svgRef, (i, x) => pindah(i, dari(x)))

  const data = [...TETAP, direktur]
  const r = ringkasTunggal(data)
  const rTanpa = ringkasTunggal(TETAP)
  const selisih = r.mean - r.median

  const kiri = (
    <>
      <div className="layar">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet"
             role="img" aria-label="Gaji sepuluh orang, gaji direktur bisa diseret"
             {...propSvg}>
          <text x={KIRI} y={22} fontSize={11} fontFamily={MONO} fill={PERAN.tinta}>
            gaji sepuluh orang, dalam juta rupiah
          </text>

          {/* Garis rata-rata ditarik sampai dekat puncak bingkai, dan labelnya
              ikut naik ke situ. Pada susunan sebelumnya labelnya jatuh setinggi
              tumpukan sembilan titik karyawan dan menembusnya. */}
          <Penanda x={ke(r.mean)} dariY={62} sampaiY={DASAR} warna={PERAN.sorot}
                   label="rata-rata" nilai={r.mean} putus />
          {/* label median didorong ke bawah angka sumbu. Tanpa dorongan itu ia
              duduk tepat di atas angka nol dan keduanya jadi tak terbaca. */}
          <Penanda x={ke(r.median)} dariY={DASAR - 46} sampaiY={DASAR} warna={PERAN.tinta}
                   label="median" nilai={r.median} sisi="bawah" jarak={20} />

          <TumpukanTitik data={TETAP} ke={ke} dasar={DASAR} jejari={6} warna={PERAN.data} />
          <TumpukanTitik
            data={[direktur]}
            ke={ke}
            dasar={DASAR}
            jejari={8}
            warna={PERAN.banding}
            propTitik={(i, v) => ({
              ...propTitikSeret({
                indeks: i, nilai: v, mulai, geser: pindah, langkah: 0.5,
                nama: `Gaji direktur, sekarang ${angka(v, 1)} juta`,
              }),
              strokeWidth: aktif === i ? 3 : 1.5,
            })}
          />
          <GarisBilangan ke={ke} y={DASAR} tik={TIK} dariX={MIN} sampaiX={MAKS} />

          <text x={ke(direktur)} y={DASAR - 24} textAnchor="middle" fontSize={10}
                fontFamily={MONO} fill={PERAN.banding}>
            seret saya
          </text>
        </svg>
      </div>
      <div className="kendali">
        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="direktur">
            <span>Gaji direktur</span>
            <span className="mono">{angka(direktur, 1)} juta</span>
          </label>
          <input id="direktur" type="range" min={7.5} max={MAKS} step={0.5} value={direktur}
                 onChange={(e) => pindah(0, +e.target.value)} />
        </div>
        <div className="skala-info">
          <span className="titik" />
          <span>
            median berhenti di {angka(r.median, 2)} juta dan tidak bergerak lagi, berapa pun
            gaji direkturnya. Rata-rata terus mengejar
          </span>
        </div>
      </div>
    </>
  )

  const kanan = (
    <div className="blok">
      <div className="cap">Sepuluh orang, dengan direktur</div>
      <table className="tabel-angka">
        <tbody>
          <tr><td>gaji direktur</td><td>{angka(direktur, 1)} juta</td></tr>
          <tr className="tegas"><td>rata-rata</td><td>{angka(r.mean, 2)} juta</td></tr>
          <tr className="tegas"><td>median</td><td>{angka(r.median, 2)} juta</td></tr>
          <tr><td>selisih keduanya</td><td>{angka(selisih, 2)} juta</td></tr>
          <tr><td>pagar atas 1,5 x JAK</td><td>{angka(r.pagarAtas, 2)} juta</td></tr>
          <tr>
            <td>ditandai pencilan</td>
            <td>{r.pencilan.length > 0 ? r.pencilan.map((v) => angka(v, 1)).join(', ') : 'tidak ada'}</td>
          </tr>
        </tbody>
      </table>
      <div className="catatan">
        Tanpa direktur, sembilan karyawan itu punya rata-rata {angka(rTanpa.mean, 2)} juta dan
        median {angka(rTanpa.median, 2)} juta, dua angka yang berdekatan dan sama-sama masuk akal.
        Selisih rata-rata dan median yang membesar adalah tanda datanya miring.
        {' '}{keterangan(DENGAN)}
      </div>
    </div>
  )

  return <>{children({ kiri, kanan })}</>
}
