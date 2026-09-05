'use client'

import { Petunjuk, Pilihan } from '@/components/kendali'
import { useState } from 'react'
import Papan from '@/components/widget/statistika/Papan'
import { MONO, PERAN } from '@/components/widget/statistika/warna-data'
import { TEPI, angka, keLayar, kotak, pita } from '@/components/widget/statistika/skala'
import { kelompokkan } from '@/components/widget/statistika/statistik'
import { keterangan, tunggal } from '@/content/statistika/data'
import type { PropWidget } from '@/components/widget/statistika/jenis'

/**
 * Tahap 4. Dua kelompok berbeda ukuran, dibandingkan dua cara.
 *
 * KENAPA BATANG BERPASANGAN, BUKAN DUA GAMBAR TERPISAH
 * Dua gambar berdampingan menggoda pembacanya membandingkan tinggi batang
 * lintas gambar, padahal sumbunya bisa berbeda. Batang berpasangan pada SATU
 * sumbu menutup celah itu: kalau tingginya beda, memang nilainya yang beda.
 *
 * Sumbunya SATU, dan tombol di bawah MENGGANTI isinya, bukan menambah sumbu
 * kedua. Grafik dengan dua sumbu tegak berbeda skala adalah kesalahan yang
 * paling sering merusak perbandingan, dan topik ini justru sedang mengajarkan
 * cara membandingkan dengan benar.
 */

const A = tunggal('t04-kelas-a')
const B = tunggal('t04-kelas-b')
const LEBAR = 10

const KELAS_A = kelompokkan(A.data, LEBAR)
const KELAS_B = kelompokkan(B.data, LEBAR)

/** 80 ke atas, yaitu dua kelas teratas. Angka inilah yang jadi kejutannya. */
const ATAS_A = A.data.filter((v) => v >= 80).length
const ATAS_B = B.data.filter((v) => v >= 80).length

export default function FrekuensiRelatif({ children }: PropWidget) {
  const [relatif, setRelatif] = useState(false)

  const ubah = (f: number, n: number) => (relatif ? (f / n) * 100 : f)
  const nilaiA = KELAS_A.map((k) => ubah(k.f, A.data.length))
  const nilaiB = KELAS_B.map((k) => ubah(k.f, B.data.length))
  const puncak = Math.max(...nilaiA, ...nilaiB)

  const j = { xMin: 0, xMax: KELAS_A.length, yMin: 0, yMax: puncak * 1.2 }
  const p = keLayar(j, TEPI)
  const k = kotak(TEPI)
  const band = pita(KELAS_A.length, TEPI, 0.3)
  const lebarBatang = (band.lebar - 2) / 2

  const batang = (nilai: number[], geser: number, warna: string) =>
    nilai.map((v, i) => (
      <g key={`${warna}${i}`}>
        <rect x={band.kiri(i) + geser} y={p.y(v)} width={lebarBatang}
              height={Math.max(k.y1 - p.y(v), 0)} fill={warna} rx={2} />
        <text x={band.kiri(i) + geser + lebarBatang / 2} y={p.y(v) - 4} textAnchor="middle"
              fontSize={8.5} fontFamily={MONO} fill={PERAN.tinta}>
          {relatif ? `${angka(v, 1)}%` : v}
        </text>
      </g>
    ))

  const kiri = (
    <>
      <div className="layar">
        <Papan
          jendela={j}
          kategori={KELAS_A.map((kl) => `${kl.bawah}-${kl.atas}`)}
          labelX="nilai"
          labelY={relatif ? 'bagian dari kelasnya (%)' : 'banyak siswa'}
          aria={`Batang berpasangan, ${relatif ? 'frekuensi relatif' : 'frekuensi asli'} Kelas A dan Kelas B`}
        >
          {batang(nilaiA, 0, PERAN.data)}
          {batang(nilaiB, lebarBatang + 2, PERAN.banding)}
          {/* keterangan warna wajib ada begitu seri lebih dari satu, sebab
              tanpa itu identitas kelompok cuma dibawa oleh warna saja */}
          <g transform="translate(60 24)">
            <rect width={11} height={11} rx={2} fill={PERAN.data} />
            <text x={16} y={9.5} fontSize={10} fontFamily={MONO} fill={PERAN.tinta}>
              Kelas A, {A.data.length} siswa
            </text>
            <rect x={130} width={11} height={11} rx={2} fill={PERAN.banding} />
            <text x={146} y={9.5} fontSize={10} fontFamily={MONO} fill={PERAN.tinta}>
              Kelas B, {B.data.length} siswa
            </text>
          </g>
        </Papan>
      </div>
      <div className="kendali">
        <Pilihan nama="Sumbu tegaknya menampilkan" arti="banyak siswa, atau bagian dari seluruh kelas"
          pilihan={[{ nilai: 'asli', label: 'Frekuensi asli' }, { nilai: 'relatif', label: 'Frekuensi relatif' }]}
          nilai={relatif ? 'relatif' : 'asli'} onPilih={(n) => setRelatif(n === 'relatif')} />
        <Petunjuk>
            {relatif
              ? 'takarannya sudah disamakan. Sekarang kedua kelas benar-benar bisa diadu'
              : 'Kelas B menang hampir di semua kelompok nilai, dan itu wajar saja: siswanya memang lebih banyak'}
          </Petunjuk>
      </div>
    </>
  )

  const kanan = (
    <div className="blok">
      <div className="cap">Siswa bernilai 80 ke atas</div>
      <table className="tabel-angka">
        <tbody>
          <tr>
            <td>Kelas A</td>
            <td>{ATAS_A} dari {A.data.length}</td>
          </tr>
          <tr>
            <td>Kelas B</td>
            <td>{ATAS_B} dari {B.data.length}</td>
          </tr>
          <tr className="tegas">
            <td>bagiannya, Kelas A</td>
            <td>{angka((ATAS_A / A.data.length) * 100, 1)}%</td>
          </tr>
          <tr className="tegas">
            <td>bagiannya, Kelas B</td>
            <td>{angka((ATAS_B / B.data.length) * 100, 1)}%</td>
          </tr>
        </tbody>
      </table>
      <div className="catatan">
        Dihitung mentah, Kelas B menang: {ATAS_B} orang lawan {ATAS_A} orang. Dihitung
        sebagai bagian dari kelasnya sendiri, kesimpulannya berbalik. Kedua hitungan
        itu benar; yang berbeda adalah pertanyaan yang dijawabnya.
        {' '}{keterangan(A)}
      </div>
    </div>
  )

  return <>{children({ kiri, kanan })}</>
}
