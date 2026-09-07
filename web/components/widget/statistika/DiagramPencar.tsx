'use client'

import { Petunjuk, Pilihan } from '@/components/kendali'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'
import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import TitikPegang from '@/components/widget/statistika/TitikPegang'
import Papan from '@/components/widget/statistika/Papan'
import { PERAN } from '@/components/widget/statistika/warna-data'
import { TEPI, angka, keData, keLayar, rentangMuat } from '@/components/widget/statistika/skala'
import { useSeret } from '@/components/widget/statistika/seret'
import { bentukTrend } from '@/components/widget/statistika/statistik'
import { bivariat, keterangan } from '@/content/statistika/data'
import type { PropWidget } from '@/components/widget/statistika/jenis'

/**
 * Tahap 10. Membaca arah, bentuk, dan kekuatan dari sebaran titik.
 *
 * ANGKA r SENGAJA BELUM DITAMPILKAN DI SINI.
 * Tahap ini melatih membaca gambar. Kalau angkanya sudah ada sejak sekarang,
 * siswa akan membaca angkanya dan berhenti melihat gambarnya, padahal justru
 * urutan itu yang mau dilatih. Angka r baru muncul di Tahap 12, setelah
 * kebiasaan melihat terbentuk.
 */

const CONTOH = [
  { kunci: 'naik', nama: 'Naik', butir: bivariat('t10-belajar') },
  { kunci: 'turun', nama: 'Turun', butir: bivariat('t10-main-game') },
  { kunci: 'tanpa', nama: 'Tidak berhubungan', butir: bivariat('t10-tanpa-hubungan') },
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

export default function DiagramPencar({ children }: PropWidget) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [pilih, setPilih] = useState(0)
  const [titik, setTitik] = useState<Array<[number, number]>>(
    () => CONTOH[0].butir.pasangan.map((p) => [p[0], p[1]]),
  )

  const contoh = CONTOH[pilih]
  const j = jendelaContoh(contoh.butir.pasangan, 0.12, 0.15)
  const p = keLayar(j, TEPI)
  const balik = keData(j, TEPI)

  const pindah = (i: number, px: number, py: number) => {
    setTitik((lama) => {
      const baru = lama.map((t) => [...t] as [number, number])
      baru[i] = [
        Math.round(jepit(balik.x(px), j.xMin, j.xMax) * 10) / 10,
        Math.round(jepit(balik.y(py), j.yMin, j.yMax) * 10) / 10,
      ]
      return baru
    })
  }

  const { aktif, propSvg, mulai } = useSeret(svgRef, pindah)
  const dipegang = useSedangDiubah()
  const trend = bentukTrend(titik)
  // "arah tidak ada arah" janggal dibaca, jadi kata "arah" dilepas untuk keadaan itu
  const arahTertulis = trend.arah === 'tidak ada arah' ? 'tidak ada arah' : `arah ${trend.arah}`

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
          keterangan={`${arahTertulis} · bentuk ${trend.bentuk} · ${trend.kekuatan}`}
          aria={`Diagram pencar, arah ${trend.arah}, bentuk ${trend.bentuk}`}
          svgRef={svgRef}
          propSvg={propSvg}
        >
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
                      const naik = e.key === 'ArrowUp' ? 1 : e.key === 'ArrowDown' ? -1 : 0
                      const samping = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
                      if (naik === 0 && samping === 0) return
                      e.preventDefault()
                      const langkahY = (j.yMax - j.yMin) / 40
                      const langkahX = (j.xMax - j.xMin) / 40
                      setTitik((lama) => {
                        const baru = lama.map((t) => [...t] as [number, number])
                        baru[i] = [
                          Math.round(jepit(x + samping * langkahX, j.xMin, j.xMax) * 10) / 10,
                          Math.round(jepit(y + naik * langkahY, j.yMin, j.yMax) * 10) / 10,
                        ]
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
        <Petunjuk>
            {trend.bentuk === 'melengkung'
              ? 'polanya melengkung. Garis lurus tidak akan cocok untuk data seperti ini, dan angka hubungannya pun akan menyesatkan'
              : `titiknya ${trend.kekuatan === 'kuat' ? 'menempel rapat pada pola' : trend.kekuatan === 'sedang' ? 'agak berpencar dari pola' : 'berpencar jauh, polanya samar'}`}
          </Petunjuk>
      </div>
    </>
  )

  const kanan = (
    <div className="blok">
      <div className="cap">{contoh.butir.judul}</div>
      <table className="tabel-angka">
        <tbody>
          <tr><td>banyak pasangan</td><td>{titik.length}</td></tr>
          <tr className="tegas"><td>arah</td><td>{trend.arah}</td></tr>
          <tr className="tegas"><td>bentuk</td><td>{trend.bentuk}</td></tr>
          <tr><td>kekuatan</td><td>{trend.kekuatan}</td></tr>
        </tbody>
      </table>
      <div className="catatan">
        Ketiga baris itu dibaca dari GAMBARNYA, bukan dari rumus. Angka yang mengukur
        kekuatan hubungan baru diperkenalkan di Materi 12, dan di situ akan terlihat
        bahwa angka saja tidak pernah cukup tanpa melihat sebarannya.
        {' '}{keterangan(contoh.butir)}
      </div>
    </div>
  )

  return <>{children({ kiri, kanan })}</>
}
