'use client'

import { useRef, useState } from 'react'
import { GarisBilangan, TumpukanTitik } from '@/components/widget/statistika/GarisBilangan'
import { MONO, PERAN } from '@/components/widget/statistika/warna-data'
import { VH, VW, angka, petak } from '@/components/widget/statistika/skala'
import { propTitikSeret, useSeret } from '@/components/widget/statistika/seret'
import { ringkasTunggal } from '@/components/widget/statistika/statistik'
import { keterangan, tunggal } from '@/content/statistika/data'
import type { PropWidget } from '@/components/widget/statistika/jenis'

/**
 * Tahap 7. Boxplot yang terbentuk dari titik datanya sendiri.
 *
 * Titik data digambar TEPAT DI BAWAH kotaknya, pada garis bilangan yang sama,
 * supaya hubungan keduanya tidak perlu dijelaskan dengan kalimat. Kotak yang
 * melebar saat titik tengah digeser, dan kumis yang memanjang saat titik ujung
 * digeser, adalah penjelasannya sendiri.
 */

const D = tunggal('t07-waktu')
const MIN = 0
const MAKS = 70
const KIRI = 46
const KANAN = VW - 26
const ke = (v: number) => KIRI + ((v - MIN) / (MAKS - MIN)) * (KANAN - KIRI)
const dari = (px: number) => MIN + ((px - KIRI) / (KANAN - KIRI)) * (MAKS - MIN)
const TIK = petak(MIN, MAKS, 8)

const KOTAK_Y = 96
const KOTAK_TINGGI = 46
const DASAR = 250

export default function KotakGaris({ children }: PropWidget) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [data, setData] = useState<number[]>(D.data)
  const [pagar, setPagar] = useState(false)

  const pindah = (indeks: number, nilai: number) => {
    const bulat = Math.round(Math.min(MAKS, Math.max(MIN, nilai)))
    setData((lama) => {
      if (lama[indeks] === bulat) return lama
      const baru = [...lama]
      baru[indeks] = bulat
      return baru
    })
  }

  const { aktif, propSvg, mulai } = useSeret(svgRef, (i, x) => pindah(i, dari(x)))

  const r = ringkasTunggal(data)
  const pencilan = new Set(r.pencilan)
  // kumis berhenti di data terjauh yang MASIH di dalam pagar, itu kesepakatan
  // yang lazim dan yang membuat pencilan terlihat terpisah dari kumisnya
  const dalam = data.filter((v) => !pencilan.has(v))
  const ujungKiri = pagar ? Math.min(...dalam) : r.min
  const ujungKanan = pagar ? Math.max(...dalam) : r.maks
  const tengahY = KOTAK_Y + KOTAK_TINGGI / 2

  const kiri = (
    <>
      <div className="layar">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet"
             role="img" aria-label="Diagram kotak garis yang terbentuk dari titik data di bawahnya"
             {...propSvg}>
          <text x={KIRI} y={22} fontSize={11} fontFamily={MONO} fill={PERAN.tinta}>
            waktu tempuh 15 siswa ke sekolah, dalam menit
          </text>

          {/* kumis */}
          <line x1={ke(ujungKiri)} y1={tengahY} x2={ke(r.q1)} y2={tengahY}
                stroke={PERAN.tinta} strokeWidth={1.6} />
          <line x1={ke(r.q3)} y1={tengahY} x2={ke(ujungKanan)} y2={tengahY}
                stroke={PERAN.tinta} strokeWidth={1.6} />
          <line x1={ke(ujungKiri)} y1={KOTAK_Y + 10} x2={ke(ujungKiri)} y2={KOTAK_Y + KOTAK_TINGGI - 10}
                stroke={PERAN.tinta} strokeWidth={1.6} />
          <line x1={ke(ujungKanan)} y1={KOTAK_Y + 10} x2={ke(ujungKanan)} y2={KOTAK_Y + KOTAK_TINGGI - 10}
                stroke={PERAN.tinta} strokeWidth={1.6} />

          {/* kotak Q1 sampai Q3 */}
          <rect x={ke(r.q1)} y={KOTAK_Y} width={Math.max(ke(r.q3) - ke(r.q1), 1)} height={KOTAK_TINGGI}
                fill={PERAN.data} fillOpacity={0.22} stroke={PERAN.data} strokeWidth={1.8} rx={2} />
          <line x1={ke(r.median)} y1={KOTAK_Y} x2={ke(r.median)} y2={KOTAK_Y + KOTAK_TINGGI}
                stroke={PERAN.sorot} strokeWidth={3} />

          {/* label lima angka */}
          {/* Ujung kumis TIDAK selalu nilai terbesar. Begitu pagar dinyalakan,
              pencilan tidak lagi dijangkau kumisnya, dan menamainya "maks" akan
              berbohong: pada data ini nilai terbesarnya 60, sedangkan ujung
              kumisnya 35. Di topik yang sedang mengajarkan cara membaca grafik
              dengan jujur, kesalahan itu tidak boleh dibiarkan. */}
          {([
            [ujungKiri, ujungKiri === r.min ? 'min' : 'ujung kumis'],
            [r.q1, 'Q1'],
            [r.median, 'median'],
            [r.q3, 'Q3'],
            [ujungKanan, ujungKanan === r.maks ? 'maks' : 'ujung kumis'],
          ] as Array<[number, string]>).map(([v, nama], i) => (
            <text key={nama} x={ke(v)} y={i % 2 === 0 ? KOTAK_Y - 8 : KOTAK_Y + KOTAK_TINGGI + 16}
                  textAnchor="middle" fontSize={9.5} fontFamily={MONO}
                  fill={nama === 'median' ? PERAN.sorot : PERAN.redup}>
              {nama} {angka(v, 1)}
            </text>
          ))}

          {/* pagar 1,5 x JAK */}
          {pagar && (
            <>
              {[r.pagarBawah, r.pagarAtas].filter((v) => v >= MIN && v <= MAKS).map((v) => (
                <line key={v} x1={ke(v)} y1={KOTAK_Y - 22} x2={ke(v)} y2={DASAR}
                      stroke={PERAN.banding} strokeWidth={1.4} strokeDasharray="5 4" />
              ))}
              <text x={ke(Math.min(r.pagarAtas, MAKS))} y={KOTAK_Y - 28} textAnchor="middle"
                    fontSize={9.5} fontFamily={MONO} fill={PERAN.banding}>
                pagar {angka(r.pagarAtas, 2)}
              </text>
            </>
          )}

          <TumpukanTitik
            data={data}
            ke={ke}
            dasar={DASAR}
            jejari={6}
            warna={PERAN.data}
            warnaKhusus={(v) => (pagar && pencilan.has(v) ? PERAN.banding : undefined)}
            propTitik={(i, v) => ({
              ...propTitikSeret({
                indeks: i, nilai: v, mulai, geser: pindah,
                nama: `Waktu tempuh siswa ke-${i + 1}, sekarang ${v} menit`,
              }),
              strokeWidth: aktif === i ? 2.5 : 1.5,
            })}
          />
          <GarisBilangan ke={ke} y={DASAR} tik={TIK} dariX={MIN} sampaiX={MAKS} />
        </svg>
      </div>
      <div className="kendali">
        <div>
          <label><span>Pagar 1,5 x JAK</span></label>
          <div className="pilih-sisi">
            <button aria-pressed={pagar} onClick={() => setPagar((p) => !p)}>
              {pagar ? 'Sembunyikan' : 'Tampilkan'}
            </button>
          </div>
        </div>
        <div>
          <label><span>Data asli</span></label>
          <div className="pilih-sisi">
            <button onClick={() => setData(D.data)}>Kembalikan semula</button>
          </div>
        </div>
        <div className="skala-info">
          <span className="titik" />
          <span>
            {pagar
              ? r.pencilan.length > 0
                ? `${r.pencilan.length} titik di luar pagar, ditandai warna bata dan tidak dijangkau kumisnya`
                : 'tidak ada titik yang jatuh di luar pagar'
              : 'seret titik paling kanan mendekat. Kumisnya memendek, tetapi kotaknya nyaris tidak berubah'}
          </span>
        </div>
      </div>
    </>
  )

  const kanan = (
    <div className="blok">
      <div className="cap">Ringkasan lima angka</div>
      <table className="tabel-angka">
        <tbody>
          <tr><td>minimum</td><td>{angka(r.min, 1)}</td></tr>
          <tr><td>Q1</td><td>{angka(r.q1, 2)}</td></tr>
          <tr className="tegas"><td>median, yaitu Q2</td><td>{angka(r.median, 2)}</td></tr>
          <tr><td>Q3</td><td>{angka(r.q3, 2)}</td></tr>
          <tr><td>maksimum</td><td>{angka(r.maks, 1)}</td></tr>
          <tr className="tegas"><td>JAK = Q3 - Q1</td><td>{angka(r.jak, 2)}</td></tr>
          <tr><td>jangkauan biasa</td><td>{angka(r.jangkauan, 2)}</td></tr>
          <tr>
            <td>pencilan menurut pagar</td>
            <td>{r.pencilan.length > 0 ? r.pencilan.map((v) => angka(v, 1)).join(', ') : 'tidak ada'}</td>
          </tr>
        </tbody>
      </table>
      <div className="catatan">
        Bandingkan dua baris tebal dengan jangkauan biasa. Jangkauan sepenuhnya
        ditentukan oleh dua orang saja, yang paling dekat dan yang paling jauh rumahnya.
        JAK mengukur setengah data yang di tengah, jadi ia tidak ikut tertipu oleh satu
        orang yang rumahnya jauh sekali. {keterangan(D)}
      </div>
    </div>
  )

  return <>{children({ kiri, kanan })}</>
}
