'use client'

import { Petunjuk, Pilihan } from '@/components/kendali'
import { useState } from 'react'
import Papan from '@/components/widget/statistika/Papan'
import { MONO, PERAN } from '@/components/widget/statistika/warna-data'
import { TEPI, angka, keLayar, kotak } from '@/components/widget/statistika/skala'
import { kelompokkan, ringkasTunggal } from '@/components/widget/statistika/statistik'
import { keterangan, tunggal } from '@/content/statistika/data'
import type { PropWidget } from '@/components/widget/statistika/jenis'
import TeksMat from '@/components/latihan/TeksMat'

/**
 * Tahap 3. Data yang sama, lebar kelas berbeda, bentuk histogram berbeda.
 *
 * Yang harus terasa: lebar kelas itu PILIHAN, dan pilihan itu mengubah cerita.
 * Pada lebar 1 gambarnya bergerigi dan polanya tenggelam, pada lebar 10 seluruh
 * data cuma jadi tiga batang yang rapi tetapi hampir tidak berkata apa-apa.
 */

const D = tunggal('t03-tinggi')
const R = ringkasTunggal(D.data)
const LEBAR_PILIHAN = [1, 2, 3, 4, 5, 6, 8, 10]

export default function LebarKelas({ children }: PropWidget) {
  const [pilihan, setPilihan] = useState(4) // mulai dari lebar 5 cm
  const lebar = LEBAR_PILIHAN[pilihan]
  const kelas = kelompokkan(D.data, lebar)

  const puncak = Math.max(...kelas.map((k) => k.f))
  const j = {
    xMin: kelas[0].bawah,
    xMax: kelas[kelas.length - 1].atas,
    yMin: 0,
    yMax: puncak * 1.18,
  }
  const p = keLayar(j, TEPI)
  const k = kotak(TEPI)

  const kiri = (
    <>
      <div className="layar">
        <Papan
          jendela={j}
          petakX
          labelX="tinggi badan (cm)"
          labelY="banyak siswa"
          keterangan={`lebar kelas ${lebar} cm`}
          tandaSkala={`${kelas.length} kelas`}
          aria={`Histogram tinggi badan 40 siswa dengan lebar kelas ${lebar} sentimeter`}
        >
          {kelas.map((kl, i) => {
            const x = p.x(kl.bawah)
            const w = Math.max(p.lebarX(lebar) - 2, 1)
            return (
              <g key={i}>
                <rect x={x + 1} y={p.y(kl.f)} width={w} height={Math.max(k.y1 - p.y(kl.f), 0)}
                      fill={PERAN.data} rx={2} />
                {kl.f > 0 && w > 13 && (
                  <text x={x + 1 + w / 2} y={p.y(kl.f) - 4} textAnchor="middle" fontSize={9.5}
                        fontFamily={MONO} fill={PERAN.tinta}>{kl.f}</text>
                )}
              </g>
            )
          })}
        </Papan>
      </div>
      <div className="kendali">
        <Pilihan nama="Lebar kelas" arti={`jadi ${kelas.length} kelas`}
          pilihan={LEBAR_PILIHAN.map((l, i) => ({ nilai: String(i), label: `${l} cm` }))}
          nilai={String(pilihan)} onPilih={(n) => setPilihan(Number(n))} />
        <Petunjuk><TeksMat teks={`${lebar <= 2
              ? 'terlalu sempit. Tiap batang cuma berisi satu dua siswa, dan polanya tenggelam di antara gerigi'
              : lebar >= 8
                ? 'terlalu lebar. Rapi, tetapi tumpukan siswa di sekitar 160 sampai 170 sudah tidak terlihat lagi'
                : 'di rentang ini polanya paling terbaca: siswa menumpuk di sekitar 160 sampai 170 cm'}`} blok={false} /></Petunjuk>
      </div>
    </>
  )

  const kanan = (
    <div className="blok">
      <div className="cap"><TeksMat teks={`Tabel frekuensi, lebar kelas ${lebar} cm`} blok={false} /></div>
      <table className="tabel-angka">
        <tbody>
          {kelas.map((kl, i) => (
            <tr key={i}>
              <td><TeksMat teks={`${kl.bawah} sampai ${kl.atas}`} blok={false} /></td>
              <td>{kl.f}</td>
            </tr>
          ))}
          <tr className="tegas"><td><TeksMat teks="jumlah" blok={false} /></td><td>{D.data.length}</td></tr>
        </tbody>
      </table>
      <div className="catatan"><TeksMat teks={`Datanya tidak berubah sedikit pun saat penggesernya digerakkan. Yang berubah cuma cara mengelompokkannya. Nilai terkecil tetap ${angka(R.min, 0)} cm, terbesar tetap ${angka(R.maks, 0)} cm, dan rata-ratanya tetap ${angka(R.mean, 1)} cm. ${keterangan(D)}`} /></div>
    </div>
  )

  return <>{children({ kiri, kanan })}</>
}
