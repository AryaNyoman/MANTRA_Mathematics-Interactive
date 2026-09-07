'use client'

import { Angka, Petunjuk, Pilihan } from '@/components/kendali'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'
import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import TitikPegang from '@/components/widget/statistika/TitikPegang'
import Papan from '@/components/widget/statistika/Papan'
import { PERAN } from '@/components/widget/statistika/warna-data'
import { TEPI, angka, keData, keLayar, rentangMuat } from '@/components/widget/statistika/skala'
import { useSeret } from '@/components/widget/statistika/seret'
import { kuadratResiduGaris, regresi } from '@/components/widget/statistika/statistik'
import { bivariat, keterangan } from '@/content/statistika/data'
import type { PropWidget } from '@/components/widget/statistika/jenis'

/**
 * Tahap 11. Siswa menarik garisnya sendiri, lalu diadu dengan garis kuadrat
 * terkecil.
 *
 * KENAPA SISWA MENARIK LEBIH DULU
 * Rumus kuadrat terkecil gampang dipakai dan sama sekali tidak menjelaskan
 * kenapa garis itu yang terbaik. Setelah siswa mencoba sendiri memperkecil
 * jumlah kuadrat residu dan menemukan bahwa ada batasnya, rumus itu berubah
 * dari mantra menjadi jalan pintas menuju sesuatu yang sudah ia rasakan.
 */

const D = bivariat('t10-belajar')
const TITIK = D.pasangan
const HITUNG = regresi(TITIK)

const rx = rentangMuat(TITIK.map((p) => p[0]), 0.1)
const ry = rentangMuat(TITIK.map((p) => p[1]), 0.18)
const J = { xMin: rx.min, xMax: rx.maks, yMin: ry.min, yMax: ry.maks }
const P = keLayar(J, TEPI)
const BALIK = keData(J, TEPI)

export default function GarisRegresi({ children }: PropWidget) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  // garis siswa disimpan sebagai nilai y pada kedua tepi jendela, sebab itulah
  // yang benar-benar diseret. Gradien dan konstantanya diturunkan dari situ.
  const [kiriY, setKiriY] = useState(J.yMin + (J.yMax - J.yMin) * 0.65)
  const [kananY, setKananY] = useState(J.yMin + (J.yMax - J.yMin) * 0.75)
  const [tampilTerbaik, setTampilTerbaik] = useState(false)

  const pindah = (i: number, _px: number, py: number) => {
    const nilai = Math.min(J.yMax, Math.max(J.yMin, BALIK.y(py)))
    if (i === 0) setKiriY(nilai)
    else setKananY(nilai)
  }

  const { aktif, propSvg, mulai } = useSeret(svgRef, pindah)
  const dipegang = useSedangDiubah()

  const gradienSiswa = (kananY - kiriY) / (J.xMax - J.xMin)
  const konstantaSiswa = kiriY - gradienSiswa * J.xMin
  const kuadratSiswa = kuadratResiduGaris(TITIK, gradienSiswa, konstantaSiswa)
  const selisihLebih = kuadratSiswa - HITUNG.jumlahKuadratResidu

  const yTerbaik = (x: number) => HITUNG.konstanta + HITUNG.gradien * x

  const kiri = (
    <>
      <div className="layar">
        <Papan
          jendela={J}
          petakX
          labelX="jam belajar per minggu"
          labelY="nilai ujian"
          keterangan={`jumlah kuadrat residu ${angka(kuadratSiswa, 1)}`}
          aria="Diagram pencar dengan garis yang bisa ditarik sendiri"
          svgRef={svgRef}
          propSvg={propSvg}
        >
          {/* garis kuadrat terkecil, hanya kalau diminta */}
          {tampilTerbaik && (
            <line x1={P.x(J.xMin)} y1={P.y(yTerbaik(J.xMin))}
                  x2={P.x(J.xMax)} y2={P.y(yTerbaik(J.xMax))}
                  stroke={PERAN.sorot} strokeWidth={2.5} strokeDasharray="6 4" />
          )}

          {/* residu, digambar TEGAK sebab yang diperkecil adalah kesalahan y */}
          {TITIK.map(([x, y], i) => {
            const yGaris = konstantaSiswa + gradienSiswa * x
            return (
              <line key={`r${i}`} x1={P.x(x)} y1={P.y(y)} x2={P.x(x)} y2={P.y(yGaris)}
                    stroke={PERAN.banding} strokeWidth={1.6} strokeOpacity={0.75} />
            )
          })}

          {/* garis siswa */}
          <line x1={P.x(J.xMin)} y1={P.y(kiriY)} x2={P.x(J.xMax)} y2={P.y(kananY)}
                stroke={PERAN.tinta} strokeWidth={2.5} />

          {TITIK.map(([x, y], i) => (
            <circle key={i} cx={P.x(x)} cy={P.y(y)} r={6} fill={PERAN.data}
                    stroke="#FFFDFA" strokeWidth={1.5} />
          ))}

          {/* dua pegangan garis */}
          {([[J.xMin, kiriY, 0], [J.xMax, kananY, 1]] as Array<[number, number, number]>)
            .map(([x, y, i]) => (
              <TitikPegang key={`p${i}`} cx={P.x(x)} cy={P.y(y)} r={8} fill={PERAN.tinta}
                      aktif={aktif === i} nyala={dipegang === (i === 0 ? 'kiri' : 'kanan')}
                      prop={{
                      role: 'slider', tabIndex: 0,
                      'aria-label': `Ujung ${i === 0 ? 'kiri' : 'kanan'} garis, nilai ${angka(y, 1)}`,
                      'aria-valuenow': y,
                      style: { cursor: 'grab', touchAction: 'none' },
                      onPointerDown: mulai(i),
                      onKeyDown: (e: ReactKeyboardEvent) => {
                        const arah = e.key === 'ArrowUp' ? 1 : e.key === 'ArrowDown' ? -1 : 0
                        if (arah === 0) return
                        e.preventDefault()
                        const langkah = (J.yMax - J.yMin) / 50
                        if (i === 0) setKiriY((v) => Math.min(J.yMax, Math.max(J.yMin, v + arah * langkah)))
                        else setKananY((v) => Math.min(J.yMax, Math.max(J.yMin, v + arah * langkah)))
                      },
                    }} />
            ))}
        </Papan>
      </div>
      <div className="kendali">
        <Pilihan nama="Garis kuadrat terkecil" arti="garis yang jumlah kuadrat jaraknya paling kecil"
          pilihan={[{ nilai: 'sembunyi', label: 'Sembunyikan' }, { nilai: 'tampil', label: 'Tunjukkan' }]}
          nilai={tampilTerbaik ? 'tampil' : 'sembunyi'} onPilih={(n) => setTampilTerbaik(n === 'tampil')} />
        <Angka nama="Ujung kiri garis" arti="tinggi garis di tepi kiri; ketik, geser, atau seret bolanya" kunci="kiri"
          nilai={kiriY} onUbah={setKiriY} min={J.yMin} max={J.yMax} langkah={0.1} desimal={1} />
        <Angka nama="Ujung kanan garis" arti="tinggi garis di tepi kanan" kunci="kanan"
          nilai={kananY} onUbah={setKananY} min={J.yMin} max={J.yMax} langkah={0.1} desimal={1} />
        <Petunjuk>
            {selisihLebih <= 0.5
              ? 'garis Anda sudah sedekat itu dengan yang terbaik. Tidak ada garis lain yang bisa lebih kecil lagi'
              : `garis Anda masih ${angka(selisihLebih, 1)} lebih besar daripada yang terbaik. Seret kedua ujungnya`}
          </Petunjuk>
      </div>
    </>
  )

  const kanan = (
    <div className="blok">
      <div className="cap">Garis Anda lawan garis kuadrat terkecil</div>
      <table className="tabel-angka">
        <tbody>
          <tr><td>kemiringan garis Anda</td><td>{angka(gradienSiswa, 2)}</td></tr>
          <tr><td>perpotongan garis Anda</td><td>{angka(konstantaSiswa, 2)}</td></tr>
          <tr className="tegas"><td>jumlah kuadrat residu Anda</td><td>{angka(kuadratSiswa, 1)}</td></tr>
          <tr><td>kemiringan terbaik</td><td>{angka(HITUNG.gradien, 2)}</td></tr>
          <tr><td>perpotongan terbaik</td><td>{angka(HITUNG.konstanta, 2)}</td></tr>
          <tr className="tegas">
            <td>jumlah kuadrat residu terkecil</td>
            <td>{angka(HITUNG.jumlahKuadratResidu, 1)}</td>
          </tr>
        </tbody>
      </table>
      <div className="catatan">
        Garis terbaiknya y-topi = {angka(HITUNG.konstanta, 1)} + {angka(HITUNG.gradien, 1)}x.
        Dibaca begini: tiap tambahan satu jam belajar per minggu, nilai diramalkan
        naik sekitar {angka(HITUNG.gradien, 1)} poin. Angka {angka(HITUNG.konstanta, 1)} adalah
        ramalan untuk nol jam belajar, dan itu di luar rentang datanya, jadi jangan
        dipercaya begitu saja. {keterangan(D)}
      </div>
    </div>
  )

  return <>{children({ kiri, kanan })}</>
}
