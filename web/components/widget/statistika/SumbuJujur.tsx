'use client'

import { Angka, Petunjuk } from '@/components/kendali'
import { useState } from 'react'
import { GARIS_PETAK, GARIS_SUMBU, MONO, PERAN } from '@/components/widget/statistika/warna-data'
import { VH, VW, angka, petak } from '@/components/widget/statistika/skala'
import { keterangan, tunggal } from '@/content/statistika/data'
import type { PropWidget } from '@/components/widget/statistika/jenis'

/**
 * Tahap 13. Data yang sama persis, dua sumbu tegak, dua kesan yang berbeda jauh.
 *
 * KENAPA BERDAMPINGAN, BUKAN BERGANTIAN
 * Kalau kedua versi ditampilkan bergantian lewat tombol, siswa harus mengingat
 * gambar sebelumnya untuk membandingkan, dan ingatan gambar itu lemah. Justru
 * kekuatan penipuan sumbu terpotong ada pada perbandingan langsung. Jadi
 * keduanya dipasang bersebelahan, dan yang bisa digeser adalah dari angka
 * berapa sumbu grafik kanan dimulai.
 */

const D = tunggal('t13-kunjungan')
const BULAN = ['Agu', 'Sep', 'Okt', 'Nov', 'Des']
const MAKS = Math.max(...D.data)
const MIN_DATA = Math.min(...D.data)

const ATAS = 46
const BAWAH = 232
const LEBAR_PANEL = 186
const KIRI_A = 40
const KIRI_B = 254

function Panel({
  x0, dasarY, judul, nadaJudul,
}: {
  x0: number
  /** dari angka berapa sumbu tegaknya dimulai */
  dasarY: number
  judul: string
  nadaJudul: string
}) {
  const atasY = MAKS + (MAKS - dasarY) * 0.12 || MAKS + 1
  const ke = (v: number) => ATAS + ((atasY - v) / (atasY - dasarY)) * (BAWAH - ATAS)
  const keX = (i: number) => x0 + 26 + (i / (D.data.length - 1)) * (LEBAR_PANEL - 40)
  const tik = petak(dasarY, atasY, 4)

  const jalur = D.data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${keX(i).toFixed(1)} ${ke(v).toFixed(1)}`).join(' ')

  return (
    <g>
      <text x={x0 + LEBAR_PANEL / 2} y={26} textAnchor="middle" fontSize={10.5}
            fontFamily={MONO} fill={nadaJudul}>{judul}</text>

      {tik.map((t) => (
        <g key={t.nilai}>
          <line x1={x0 + 26} y1={ke(t.nilai)} x2={x0 + LEBAR_PANEL - 8} y2={ke(t.nilai)}
                stroke={GARIS_PETAK} strokeWidth={1} opacity={0.5} />
          <text x={x0 + 22} y={ke(t.nilai) + 3.4} textAnchor="end" fontSize={9}
                fontFamily={MONO} fill={PERAN.redup}>{t.label}</text>
        </g>
      ))}

      <line x1={x0 + 26} y1={BAWAH} x2={x0 + LEBAR_PANEL - 8} y2={BAWAH}
            stroke={GARIS_SUMBU} strokeWidth={1.6} />
      <line x1={x0 + 26} y1={ATAS} x2={x0 + 26} y2={BAWAH} stroke={GARIS_SUMBU} strokeWidth={1.6} />

      <path d={jalur} fill="none" stroke={nadaJudul} strokeWidth={2.5}
            strokeLinejoin="round" strokeLinecap="round" />
      {D.data.map((v, i) => (
        <circle key={i} cx={keX(i)} cy={ke(v)} r={4.5} fill={nadaJudul}
                stroke="#FFFDFA" strokeWidth={1.5} />
      ))}
      {BULAN.map((b, i) => (
        <text key={b} x={keX(i)} y={BAWAH + 14} textAnchor="middle" fontSize={8.5}
              fontFamily={MONO} fill={PERAN.redup}>{b}</text>
      ))}
    </g>
  )
}

export default function SumbuJujur({ children }: PropWidget) {
  const [potong, setPotong] = useState(410)

  const kiri = (
    <>
      <div className="layar">
        <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" role="img"
             aria-label="Dua grafik dari data yang sama, satu sumbunya mulai dari nol, satu dipotong">
          <Panel x0={KIRI_A} dasarY={0} judul="sumbu mulai dari nol" nadaJudul={PERAN.data} />
          <Panel x0={KIRI_B} dasarY={potong} judul={`sumbu dipotong di ${potong}`} nadaJudul={PERAN.banding} />
          <line x1={(KIRI_A + LEBAR_PANEL + KIRI_B) / 2} y1={36} x2={(KIRI_A + LEBAR_PANEL + KIRI_B) / 2} y2={BAWAH + 18}
                stroke={GARIS_PETAK} strokeWidth={1} />
          <text x={VW / 2} y={VH - 8} textAnchor="middle" fontSize={9.5} fontFamily={MONO}
                fill={PERAN.redup}>
            angkanya sama persis di kedua grafik
          </text>
        </svg>
      </div>
      <div className="kendali">
        <Angka nama="Sumbu kanan mulai dari" arti="0 berarti jujur, makin besar makin banyak yang dipotong" kunci="potong"
          nilai={potong} onUbah={setPotong} min={0} max={MIN_DATA} langkah={5} />
        <Petunjuk>
            {potong === 0
              ? 'kedua grafik sekarang sama. Naikkan angkanya dan perhatikan grafik kanan mulai berlebihan'
              : `naik ${angka(MAKS - MIN_DATA, 0)} orang dari ${angka(MIN_DATA, 0)}, sekitar ${angka(((MAKS - MIN_DATA) / MIN_DATA) * 100, 1)} persen. Di grafik kanan kenaikan itu memenuhi hampir seluruh tingginya`}
          </Petunjuk>
      </div>
    </>
  )

  const kanan = (
    <div className="blok">
      <div className="cap">Pengunjung perpustakaan, lima bulan</div>
      <table className="tabel-angka">
        <tbody>
          {D.data.map((v, i) => (
            <tr key={i}><td>{BULAN[i]}</td><td>{v} orang</td></tr>
          ))}
          <tr className="tegas"><td>selisih terbesar</td><td>{MAKS - MIN_DATA} orang</td></tr>
          <tr><td>naiknya</td><td>{angka(((MAKS - MIN_DATA) / MIN_DATA) * 100, 1)}%</td></tr>
        </tbody>
      </table>
      <div className="catatan">
        Kedua grafik memakai angka yang sama persis, dan tidak ada satu pun yang salah.
        Yang berbeda cuma dari angka berapa sumbu tegaknya dimulai. Memotong sumbu tidak
        selalu curang, misalnya untuk suhu tubuh justru wajib. Yang membedakan curang
        dan tidak adalah apakah pemotongan itu diberitahukan dengan jelas.
        {' '}{keterangan(D)}
      </div>
    </div>
  )

  return <>{children({ kiri, kanan })}</>
}
