'use client'

import { useState } from 'react'
import Papan from '@/components/widget/statistika/Papan'
import { GarisBilangan, TumpukanTitik } from '@/components/widget/statistika/GarisBilangan'
import { MONO, PERAN, warnaKategori } from '@/components/widget/statistika/warna-data'
import { TEPI_KATEGORI, VH, VW, angka, keLayar, kotak, petak, pita } from '@/components/widget/statistika/skala'
import { kelompokkan } from '@/components/widget/statistika/statistik'
import { kategori as ambilKategori, keterangan, tunggal } from '@/content/statistika/data'
import type { PropWidget } from '@/components/widget/statistika/jenis'

/**
 * Tahap 2. Satu kumpulan data, empat bentuk gambar.
 *
 * KENAPA BENTUK YANG SALAH TETAP DIGAMBAR
 * Gampang saja menyembunyikan tombol yang tidak cocok. Tetapi yang sedang
 * diajarkan justru KENAPA sebuah bentuk tidak cocok, dan itu tidak bisa
 * dipelajari dari tombol yang hilang. Jadi gambarnya tetap muncul, dengan
 * peringatan yang menyebutkan alasannya.
 */

const KAT = ambilKategori('t02-cara-ke-sekolah')
const ANGKA = tunggal('t03-tinggi')

type Bentuk = 'line-plot' | 'batang' | 'histogram' | 'lingkaran'
type Jenis = 'kategori' | 'angka'

const NAMA_BENTUK: Record<Bentuk, string> = {
  'line-plot': 'Line plot',
  batang: 'Diagram batang',
  histogram: 'Histogram',
  lingkaran: 'Diagram lingkaran',
}

/**
 * Peringatan kalau bentuknya tidak cocok dengan jenis datanya. Senarai kosong
 * berarti cocok.
 */
const PERINGATAN: Record<Jenis, Partial<Record<Bentuk, string>>> = {
  kategori: {
    'line-plot': 'Line plot butuh garis bilangan. "Sepeda" dan "Angkot" tidak punya letak pada garis bilangan, jadi jarak antar titiknya tidak berarti apa-apa.',
    histogram: 'Histogram menempelkan batangnya karena kelas yang bersebelahan bersambung. Kategori tidak bersambung, dan urutannya pun boleh ditukar.',
  },
  angka: {
    batang: 'Diagram batang memberi sela antar batang, seolah tinggi 160 dan 170 adalah dua hal terpisah. Padahal di antara keduanya ada 165. Yang tepat histogram.',
    lingkaran: 'Diagram lingkaran menjawab "berapa bagian dari keseluruhan". Tinggi badan bukan bagian dari keseluruhan, jadi pertanyaannya sendiri tidak berlaku.',
  },
}

const LEBAR_KELAS = 5

function jalurJuring(cx: number, cy: number, r: number, mulai: number, akhir: number): string {
  const x1 = cx + r * Math.cos(mulai)
  const y1 = cy + r * Math.sin(mulai)
  const x2 = cx + r * Math.cos(akhir)
  const y2 = cy + r * Math.sin(akhir)
  const besar = akhir - mulai > Math.PI ? 1 : 0
  return `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${besar} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`
}

export default function BentukData({ children }: PropWidget) {
  const [jenis, setJenis] = useState<Jenis>('kategori')
  const [bentuk, setBentuk] = useState<Bentuk>('batang')

  const peringatan = PERINGATAN[jenis][bentuk]
  const kelas = kelompokkan(ANGKA.data, LEBAR_KELAS)
  const nilaiKat = KAT.kategori.map((k) => k.f)
  const totalKat = nilaiKat.reduce((a, b) => a + b, 0)

  /* ---------------- gambar ---------------- */

  let gambar = null

  if (bentuk === 'lingkaran') {
    const cx = 150, cy = 158, r = 96
    let sudut = -Math.PI / 2
    const potongan = (jenis === 'kategori' ? nilaiKat : kelas.map((k) => k.f)).map((v, i) => {
      const total = jenis === 'kategori' ? totalKat : ANGKA.data.length
      const lebar = (v / total) * Math.PI * 2
      const mulai = sudut
      sudut += lebar
      return { i, v, mulai, akhir: sudut, persen: (v / total) * 100 }
    })
    const nama = jenis === 'kategori' ? KAT.kategori.map((k) => k.nama) : kelas.map((k) => k.label)

    gambar = (
      <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" role="img"
           aria-label={`Diagram lingkaran ${jenis === 'kategori' ? 'cara berangkat ke sekolah' : 'tinggi badan'}`}>
        {potongan.map((p) => (
          <path key={p.i} d={jalurJuring(cx, cy, r, p.mulai, p.akhir)}
                fill={warnaKategori(p.i)} stroke="#FFFDFA" strokeWidth={2} />
        ))}
        {/* angka ditulis langsung di potongannya. Ini bukan hiasan: palet
            kategori punya satu warna yang kontrasnya di bawah ambang, dan
            label langsung itulah tebusannya. */}
        {potongan.filter((p) => p.persen >= 7).map((p) => {
          const t = (p.mulai + p.akhir) / 2
          return (
            <text key={p.i} x={cx + Math.cos(t) * r * 0.66} y={cy + Math.sin(t) * r * 0.66 + 4}
                  textAnchor="middle" fontSize={11} fontFamily={MONO} fill="#FFFDFA" fontWeight={600}>
              {angka(p.persen, 1)}%
            </text>
          )
        })}
        {potongan.map((p, i) => (
          <g key={`l${p.i}`} transform={`translate(276 ${72 + i * 26})`}>
            <rect width={13} height={13} rx={2} fill={warnaKategori(p.i)} />
            <text x={19} y={11} fontSize={11} fontFamily={MONO} fill={PERAN.tinta}>
              {nama[i]} · {p.v}
            </text>
          </g>
        ))}
      </svg>
    )
  } else if (bentuk === 'line-plot') {
    const data = jenis === 'angka' ? ANGKA.data : nilaiKat
    const min = Math.min(...data)
    const maks = Math.max(...data)
    const KIRI = 46, KANAN = VW - 24
    const ke = (v: number) => KIRI + ((v - min + 1) / (maks - min + 2)) * (KANAN - KIRI)
    gambar = (
      <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" role="img"
           aria-label="Line plot, satu titik untuk satu data">
        <text x={KIRI} y={22} fontSize={11} fontFamily={MONO} fill={PERAN.tinta}>
          satu titik untuk satu data, tidak ada yang disembunyikan
        </text>
        <TumpukanTitik data={data} ke={ke} dasar={244} jejari={4.5} sela={1.5} warna={PERAN.data} />
        <GarisBilangan ke={ke} y={244} tik={petak(min - 1, maks + 1, 7)} dariX={min - 1} sampaiX={maks + 1} />
      </svg>
    )
  } else {
    // diagram batang dan histogram sama-sama batang, bedanya ada tidaknya sela
    const label = jenis === 'kategori' ? KAT.kategori.map((k) => k.nama) : kelas.map((k) => k.label)
    const nilai = jenis === 'kategori' ? nilaiKat : kelas.map((k) => k.f)
    const puncak = Math.max(...nilai)
    const j = { xMin: 0, xMax: nilai.length, yMin: 0, yMax: puncak * 1.15 }
    const p = keLayar(j, TEPI_KATEGORI)
    const k = kotak(TEPI_KATEGORI)
    const band = pita(nilai.length, TEPI_KATEGORI, bentuk === 'histogram' ? 0 : 0.32)

    gambar = (
      <Papan jendela={j} tepi={TEPI_KATEGORI} kategori={label} labelY="banyak data"
             labelX={jenis === 'kategori' ? 'cara berangkat' : 'tinggi badan (cm)'}
             aria={`${NAMA_BENTUK[bentuk]} dari data ${jenis}`}>
        {nilai.map((v, i) => (
          <g key={i}>
            <rect
              x={band.kiri(i) + (bentuk === 'histogram' ? 1 : 0)}
              y={p.y(v)}
              width={Math.max(band.lebar - (bentuk === 'histogram' ? 2 : 0), 2)}
              height={Math.max(k.y1 - p.y(v), 0)}
              rx={3}
              fill={jenis === 'kategori' ? warnaKategori(i) : PERAN.data}
            />
            <text x={band.tengah(i)} y={p.y(v) - 5} textAnchor="middle" fontSize={10}
                  fontFamily={MONO} fill={PERAN.tinta}>{v}</text>
          </g>
        ))}
      </Papan>
    )
  }

  /* ---------------- kendali ---------------- */

  const kiri = (
    <>
      <div className="layar">{gambar}</div>
      <div className="kendali">
        <div style={{ gridColumn: '1 / -1' }}>
          <label><span>Jenis datanya</span></label>
          <div className="pilih-sisi">
            <button aria-pressed={jenis === 'kategori'} onClick={() => setJenis('kategori')}>
              Kategori
            </button>
            <button aria-pressed={jenis === 'angka'} onClick={() => setJenis('angka')}>
              Angka
            </button>
          </div>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label><span>Bentuk gambarnya</span></label>
          <div className="pilih-sisi" style={{ flexWrap: 'wrap' }}>
            {(Object.keys(NAMA_BENTUK) as Bentuk[]).map((b) => (
              <button key={b} aria-pressed={bentuk === b} onClick={() => setBentuk(b)}
                      style={{ flex: '1 1 42%' }}>
                {NAMA_BENTUK[b]}
              </button>
            ))}
          </div>
        </div>
        <div className="skala-info">
          <span className="titik" />
          <span>
            {peringatan
              ? `tidak cocok. ${peringatan}`
              : `${NAMA_BENTUK[bentuk]} memang bentuk yang tepat untuk data ${jenis} ini`}
          </span>
        </div>
      </div>
    </>
  )

  /* ---------------- tabel ---------------- */

  const barisTabel = jenis === 'kategori'
    ? KAT.kategori.map((k) => [k.nama, `${k.f} · ${angka((k.f / totalKat) * 100, 1)}%`] as const)
    : kelas.map((k) => [`${k.bawah} sampai ${k.atas}`, `${k.f} siswa`] as const)

  const kanan = (
    <div className="blok">
      <div className="cap">
        {jenis === 'kategori' ? 'Cara 40 siswa berangkat ke sekolah' : `Tinggi badan 40 siswa, kelas selebar ${LEBAR_KELAS} cm`}
      </div>
      <table className="tabel-angka">
        <tbody>
          {barisTabel.map(([nama, isi]) => (
            <tr key={nama}><td>{nama}</td><td>{isi}</td></tr>
          ))}
          <tr className="tegas">
            <td>jumlah</td>
            <td>{jenis === 'kategori' ? `${totalKat} siswa` : `${ANGKA.data.length} siswa`}</td>
          </tr>
        </tbody>
      </table>
      <div className="catatan">
        {peringatan
          ? `Gambar yang sedang tampil TIDAK cocok untuk data ini. ${peringatan}`
          : 'Tabel dan gambar di sebelah kiri adalah benda yang sama dalam dua bentuk. Kalau salah satunya bercerita lain, ada yang salah.'}
        {' '}{keterangan(jenis === 'kategori' ? KAT : ANGKA)}
      </div>
    </div>
  )

  return <>{children({ kiri, kanan })}</>
}
