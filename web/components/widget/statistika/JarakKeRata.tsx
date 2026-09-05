'use client'

import { Petunjuk, Pilihan } from '@/components/kendali'
import { useRef, useState } from 'react'
import { GarisBilangan } from '@/components/widget/statistika/GarisBilangan'
import { MONO, PERAN } from '@/components/widget/statistika/warna-data'
import { VH, VW, angka, petak } from '@/components/widget/statistika/skala'
import { propTitikSeret, useSeret } from '@/components/widget/statistika/seret'
import { ringkasTunggal } from '@/components/widget/statistika/statistik'
import { keterangan, tunggal } from '@/content/statistika/data'
import type { PropWidget } from '@/components/widget/statistika/jenis'

/**
 * Tahap 8. Simpangan baku dibangun bertahap, dan kuadratnya digambar sebagai
 * LUAS PERSEGI sungguhan.
 *
 * KENAPA JENDELANYA DIPATOK, BUKAN MENGIKUTI DATA
 * Kalau jendelanya menyesuaikan diri dengan data, Mesin A dan Mesin B akan
 * terlihat persis sama, cuma beda angka pada sumbunya. Padahal seluruh isi
 * tahap ini adalah perbandingan keduanya. Jadi jendelanya dipatok 485 sampai
 * 515 untuk keduanya, dan persegi Mesin B benar-benar terlihat jauh lebih
 * besar daripada persegi Mesin A. Aturan bingkai menyesuaikan diri tetap
 * dipatuhi lewat penunjuk skala yang menyebutkan lebar tampilannya.
 */

const A = tunggal('t08-mesin-a')
const B = tunggal('t08-mesin-b')

const MIN = 485
const MAKS = 515
const KIRI = 46
const KANAN = VW - 26
const ke = (v: number) => KIRI + ((v - MIN) / (MAKS - MIN)) * (KANAN - KIRI)
const dari = (px: number) => MIN + ((px - KIRI) / (KANAN - KIRI)) * (MAKS - MIN)
const TIK = petak(MIN, MAKS, 7)
const DASAR = 254

export default function JarakKeRata({ children }: PropWidget) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [data, setData] = useState<number[]>(A.data)
  const [mesin, setMesin] = useState<'A' | 'B' | 'sendiri'>('A')

  const pindah = (indeks: number, nilai: number) => {
    const bulat = Math.round(Math.min(MAKS, Math.max(MIN, nilai)))
    setData((lama) => {
      if (lama[indeks] === bulat) return lama
      const baru = [...lama]
      baru[indeks] = bulat
      setMesin('sendiri')
      return baru
    })
  }

  const { aktif, propSvg, mulai } = useSeret(svgRef, (i, x) => pindah(i, dari(x)))
  const r = ringkasTunggal(data)
  const xMean = ke(r.mean)
  // Garis rata-rata dibuat setinggi persegi terbesar, bukan setinggi tetap.
  // Dengan tinggi tetap, Mesin A yang perseginya kecil menyisakan garis panjang
  // yang menjulang ke ruang kosong dan terlihat seperti kesalahan gambar.
  const sisiTerbesar = Math.max(...data.map((v) => Math.abs(ke(v) - xMean)), 0)
  const puncakGaris = DASAR - Math.max(sisiTerbesar + 26, 52)

  const kiri = (
    <>
      <div className="layar">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet"
             role="img" aria-label="Isi lima botol, jarak tiap botol ke rata-rata digambar sebagai persegi"
             {...propSvg}>
          <text x={KIRI} y={20} fontSize={11} fontFamily={MONO} fill={PERAN.tinta}>
            luas persegi = kuadrat simpangan
          </text>
          <text x={KANAN} y={20} textAnchor="end" fontSize={9} fontFamily={MONO} fill={PERAN.redup}>
            tampilan selebar {MAKS - MIN} ml
          </text>

          {/* persegi kuadrat simpangan, digambar duduk di atas garis bilangan */}
          {data.map((v, i) => {
            const sisi = Math.abs(ke(v) - xMean)
            if (sisi < 1) return null
            const x = Math.min(ke(v), xMean)
            return (
              <rect key={`k${i}`} x={x} y={DASAR - sisi} width={sisi} height={sisi}
                    fill={PERAN.data} fillOpacity={0.16} stroke={PERAN.data}
                    strokeWidth={1} strokeOpacity={0.5} />
            )
          })}

          {/* garis mean */}
          <line x1={xMean} y1={puncakGaris} x2={xMean} y2={DASAR + 8}
                stroke={PERAN.sorot} strokeWidth={2} />
          <text x={xMean} y={puncakGaris - 7} textAnchor="middle" fontSize={10}
                fontFamily={MONO} fill={PERAN.sorot}>
            rata-rata {angka(r.mean, 1)}
          </text>

          {/* titik data, bisa diseret */}
          {data.map((v, i) => (
            <circle key={i} cx={ke(v)} cy={DASAR} r={5.5}
                    fill={PERAN.data} stroke="#FFFDFA"
                    strokeWidth={aktif === i ? 3 : 1.5}
                    {...propTitikSeret({
                      indeks: i, nilai: v, mulai, geser: pindah,
                      nama: `Isi botol ke-${i + 1}, sekarang ${v} mililiter`,
                    })} />
          ))}
          <GarisBilangan ke={ke} y={DASAR} tik={TIK} dariX={MIN} sampaiX={MAKS} />
        </svg>
      </div>
      <div className="kendali">
        <Pilihan nama="Ambil contoh" arti="dua mesin dengan sebaran botol yang berbeda"
          pilihan={[{ nilai: 'A', label: 'Mesin A' }, { nilai: 'B', label: 'Mesin B' }]}
          nilai={mesin} onPilih={(n) => { setData(n === 'A' ? A.data : B.data); setMesin(n) }} />
        <Petunjuk>
            seret satu botol menjauh dari rata-rata. Perseginya tumbuh jauh lebih cepat
            daripada jaraknya: jarak dua kali lipat membuat luas empat kali lipat
          </Petunjuk>
      </div>
    </>
  )

  const simpangan = data.map((v) => v - r.mean)
  const kuadrat = simpangan.map((s) => s * s)

  const kanan = (
    <div className="blok">
      <div className="cap">
        {mesin === 'sendiri' ? 'Data yang Anda ubah sendiri' : `Mesin ${mesin}`}
      </div>
      <table className="tabel-angka">
        <tbody>
          <tr><td>isi botol</td><td>{data.join('  ')}</td></tr>
          <tr><td>rata-rata</td><td>{angka(r.mean, 2)} ml</td></tr>
          <tr><td>simpangan</td><td>{simpangan.map((s) => angka(s, 1)).join('  ')}</td></tr>
          <tr className="tegas">
            <td>jumlah simpangan</td>
            <td>{angka(simpangan.reduce((a, b) => a + b, 0), 2)}</td>
          </tr>
          <tr><td>kuadratnya</td><td>{kuadrat.map((s) => angka(s, 1)).join('  ')}</td></tr>
          <tr><td>jumlah kuadrat</td><td>{angka(kuadrat.reduce((a, b) => a + b, 0), 2)}</td></tr>
          <tr><td>varian, dibagi {data.length}</td><td>{angka(r.varian, 3)}</td></tr>
          <tr className="tegas"><td>simpangan baku</td><td>{angka(r.simpanganBaku, 3)} ml</td></tr>
        </tbody>
      </table>
      <div className="catatan">
        Baris tebal pertama selalu nol, dan itulah alasan seluruh langkah pengkuadratan
        ada. Baris tebal terakhir dibaca begini: isi botolnya biasanya meleset
        sekitar {angka(r.simpanganBaku, 2)} ml dari rata-ratanya. {keterangan(A)}
      </div>
    </div>
  )

  return <>{children({ kiri, kanan })}</>
}
