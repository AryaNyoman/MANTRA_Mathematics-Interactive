'use client'

import { Petunjuk, Pilihan } from '@/components/kendali'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'
import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import TitikPegang from '@/components/widget/statistika/TitikPegang'
import Papan from '@/components/widget/statistika/Papan'
import { PERAN } from '@/components/widget/statistika/warna-data'
import { TEPI, angka, angkaTetap, keData, keLayar, rentangMuat } from '@/components/widget/statistika/skala'
import { useSeret } from '@/components/widget/statistika/seret'
import { bentukTrend, regresi } from '@/components/widget/statistika/statistik'
import { bivariat, keterangan } from '@/content/statistika/data'
import type { PropWidget } from '@/components/widget/statistika/jenis'
import TeksMat from '@/components/latihan/TeksMat'

/**
 * Tahap 12. Angka r, dan batasnya.
 *
 * Contoh melengkung adalah bagian terpentingnya: setiap y bisa ditebak dengan
 * sempurna dari x, tetapi r nya tepat nol. Kalau siswa cuma membaca angka, ia
 * akan melaporkan "tidak ada hubungan" untuk hubungan yang justru sempurna.
 */

const CONTOH = [
  { kunci: 'kuat', nama: 'Kuat naik', butir: bivariat('t12-kuat-naik') },
  { kunci: 'turun', nama: 'Kuat turun', butir: bivariat('t10-main-game') },
  { kunci: 'lemah', nama: 'Lemah', butir: bivariat('t12-lemah') },
  { kunci: 'lengkung', nama: 'Melengkung', butir: bivariat('t12-melengkung') },
] as const


/**
 * Jendela DIKUNCI pada contoh yang dipilih (keputusan ARYA 5 Sep 2026):
 * dihitung dari data awal contoh, bukan dari titik yang sedang diseret,
 * supaya sumbunya diam saat bola ditarik. Untuk data yang memang tidak bisa
 * negatif (jam belajar, nilai ujian) batas bawahnya tidak turun di bawah nol.
 */
function jendelaContoh(
  pasangan: ReadonlyArray<readonly [number, number]>, tepiX: number, tepiY: number,
) {
  const xs = pasangan.map((p) => p[0])
  const ys = pasangan.map((p) => p[1])
  const rx = rentangMuat(xs, tepiX)
  const ry = rentangMuat(ys, tepiY)
  return {
    xMin: Math.min(...xs) >= 0 ? Math.max(0, rx.min) : rx.min,
    xMax: rx.maks,
    yMin: Math.min(...ys) >= 0 ? Math.max(0, ry.min) : ry.min,
    yMax: ry.maks,
  }
}

const jepit = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

export default function KekuatanHubungan({ children }: PropWidget) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [pilih, setPilih] = useState(0)
  const [titik, setTitik] = useState<Array<[number, number]>>(
    () => CONTOH[0].butir.pasangan.map((p) => [p[0], p[1]]),
  )

  const contoh = CONTOH[pilih]
  const j = jendelaContoh(contoh.butir.pasangan, 0.12, 0.18)
  const p = keLayar(j, TEPI)
  const balik = keData(j, TEPI)

  const dipegang = useSedangDiubah()
  const { aktif, propSvg, mulai } = useSeret(svgRef, (i, px, py) => {
    setTitik((lama) => {
      const baru = lama.map((t) => [...t] as [number, number])
      baru[i] = [
        Math.round(jepit(balik.x(px), j.xMin, j.xMax) * 10) / 10,
        Math.round(jepit(balik.y(py), j.yMin, j.yMax) * 10) / 10,
      ]
      return baru
    })
  })

  const h = regresi(titik)
  const trend = bentukTrend(titik)
  const menyesatkan = trend.bentuk === 'melengkung'

  const gantiContoh = (n: number) => {
    setPilih(n)
    setTitik(CONTOH[n].butir.pasangan.map((q) => [q[0], q[1]]))
  }

  const kiri = (
    <>
      <div className="layar">
        <Papan
          jendela={j}
          petakX
          labelX={contoh.butir.satuanX ?? 'x'}
          labelY={contoh.butir.satuanY ?? 'y'}
          keterangan={`r = ${angkaTetap(h.r, 2)} · r kuadrat = ${angkaTetap(h.r2, 2)}`}
          aria={`Diagram pencar dengan koefisien korelasi ${angkaTetap(h.r, 2)}`}
          svgRef={svgRef}
          propSvg={propSvg}
        >
          {/* garis regresi ditampilkan tipis, sebagai pengingat bahwa r mengukur
              kedekatan titik ke GARIS LURUS, bukan ke pola apa pun */}
          <line x1={p.x(j.xMin)} y1={p.y(h.konstanta + h.gradien * j.xMin)}
                x2={p.x(j.xMax)} y2={p.y(h.konstanta + h.gradien * j.xMax)}
                stroke={menyesatkan ? PERAN.banding : PERAN.sorot}
                strokeWidth={2} strokeDasharray="6 4" />

          {titik.map(([x, y], i) => (
            <TitikPegang key={i} cx={p.x(x)} cy={p.y(y)} r={7} fill={PERAN.data}
                    aktif={aktif === i} nyala={dipegang === `titik-${i}`}
                    prop={{
                      role: 'slider', tabIndex: 0,
                      'aria-label': `Titik ke-${i + 1}, x ${angka(x, 1)}, y ${angka(y, 1)}`,
                      'aria-valuenow': y,
                      style: { cursor: 'grab', touchAction: 'none' },
                      onPointerDown: mulai(i),
                      onKeyDown: (e: ReactKeyboardEvent) => {
                      const arah = e.key === 'ArrowUp' ? 1 : e.key === 'ArrowDown' ? -1 : 0
                      if (arah === 0) return
                      e.preventDefault()
                      const langkah = (j.yMax - j.yMin) / 40
                      setTitik((lama) => {
                        const baru = lama.map((t) => [...t] as [number, number])
                        baru[i] = [x, Math.round(jepit(y + arah * langkah, j.yMin, j.yMax) * 10) / 10]
                        return baru
                      })
                    },
                    }} />
          ))}
        </Papan>
      </div>
      <div className="kendali">
        <Pilihan nama="Contoh siap pakai" arti="atau seret titiknya sendiri di gambar"
          pilihan={CONTOH.map((c, n) => ({ nilai: String(n), label: c.nama }))}
          nilai={String(pilih)} onPilih={(n) => gantiContoh(Number(n))} />
        <Petunjuk><TeksMat teks={`${menyesatkan
              ? `r = ${angkaTetap(h.r, 2)}, seolah tidak ada hubungan. Padahal setiap y bisa ditebak sempurna dari x nya. Inilah sebabnya angka r tidak boleh dibaca tanpa gambarnya`
              : `tanda r menunjukkan arah, besarnya menunjukkan kerapatan titik ke garis`}`} blok={false} /></Petunjuk>
      </div>
    </>
  )

  const kanan = (
    <div className="blok">
      <div className="cap"><TeksMat teks={`${contoh.butir.judul}`} blok={false} /></div>
      <table className="tabel-angka">
        <tbody>
          <tr className="tegas"><td><TeksMat teks="koefisien korelasi r" blok={false} /></td><td>{angkaTetap(h.r, 3)}</td></tr>
          <tr><td><TeksMat teks="koefisien determinasi r kuadrat" blok={false} /></td><td>{angkaTetap(h.r2, 3)}</td></tr>
          <tr><td><TeksMat teks="arah" blok={false} /></td><td><TeksMat teks={`${trend.arah}`} blok={false} /></td></tr>
          <tr><td><TeksMat teks="bentuk" blok={false} /></td><td><TeksMat teks={`${trend.bentuk}`} blok={false} /></td></tr>
        </tbody>
      </table>
      <div className="catatan"><TeksMat teks={`${menyesatkan
          ? 'Contoh ini yang paling penting di seluruh materi ini. Angka r nol berarti tidak ada hubungan LURUS, bukan berarti tidak ada hubungan sama sekali.'
          : `Bacaan r kuadrat: sekitar ${angka(h.r2 * 100, 0)} persen keragaman y bisa dijelaskan oleh garis yang memakai x. Sisanya berasal dari hal lain yang tidak masuk hitungan.`} Dan sekuat apa pun angkanya, ia tetap tidak membuktikan bahwa yang satu menyebabkan yang lain. ${keterangan(contoh.butir)}`} /></div>
    </div>
  )

  return <>{children({ kiri, kanan })}</>
}
