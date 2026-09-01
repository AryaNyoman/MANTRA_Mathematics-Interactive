'use client'

import { useRef, useState } from 'react'
import Papan from '@/components/widget/statistika/Papan'
import { MONO, PERAN } from '@/components/widget/statistika/warna-data'
import { TEPI, angka, keLayar, kotak } from '@/components/widget/statistika/skala'
import { useSeret } from '@/components/widget/statistika/seret'
import { ringkasKelompok } from '@/components/widget/statistika/statistik'
import { kelompok, keterangan } from '@/content/statistika/data'
import type { PropWidget } from '@/components/widget/statistika/jenis'

/**
 * Tahap 9. Rumus interpolasi dibuktikan oleh gambarnya sendiri.
 *
 * Siswa menggeser garis sampai banyak data di kirinya sama dengan di kanannya.
 * Letak yang ia temukan sendiri ternyata jatuh tepat di angka yang dihitung
 * rumus median data berkelompok. Rumus itu jadi sesuatu yang terbukti, bukan
 * sesuatu yang dihafal.
 *
 * Perhitungan "banyak data di kiri garis" memakai anggapan yang SAMA dengan
 * anggapan rumusnya, yaitu data tersebar merata di dalam tiap kelas. Itu bukan
 * kecurangan yang membuat keduanya cocok dengan sendirinya, melainkan justru
 * yang sedang ditunjukkan: rumus interpolasi tidak lain adalah anggapan itu,
 * ditulis sebagai hitungan.
 */

const D = kelompok('t09-nilai-kelompok')
const R = ringkasKelompok(D.kelas)
const MIN = D.kelas[0].bawah
const MAKS = D.kelas[D.kelas.length - 1].atas
const PUNCAK = Math.max(...D.kelas.map((k) => k.f))

const J = { xMin: MIN, xMax: MAKS, yMin: 0, yMax: PUNCAK * 1.2 }
const P = keLayar(J, TEPI)
const K = kotak(TEPI)
const dari = (px: number) => MIN + ((px - K.x0) / (K.x1 - K.x0)) * (MAKS - MIN)

/** Banyak data di sebelah kiri sebuah nilai, dengan anggapan sebaran merata. */
function banyakDiKiri(x: number): number {
  let jumlah = 0
  for (const kl of D.kelas) {
    if (x >= kl.atas) jumlah += kl.f
    else if (x > kl.bawah) jumlah += kl.f * ((x - kl.bawah) / (kl.atas - kl.bawah))
  }
  return jumlah
}

export default function DataKelompok({ children }: PropWidget) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [garis, setGaris] = useState(MIN + (MAKS - MIN) * 0.3)
  const [terpilih, setTerpilih] = useState<number | null>(null)

  const geser = (_i: number, nilai: number) =>
    setGaris(Math.min(MAKS, Math.max(MIN, Math.round(nilai * 100) / 100)))

  const { propSvg, mulai } = useSeret(svgRef, (i, x) => geser(i, dari(x)))

  const kiriJumlah = banyakDiKiri(garis)
  const kananJumlah = R.n - kiriJumlah
  const selisih = kiriJumlah - kananJumlah
  const seimbang = Math.abs(selisih) < 0.05

  const isi = (
    <>
      {D.kelas.map((kl, i) => (
        <g key={i} onPointerDown={() => setTerpilih(i === terpilih ? null : i)}
           style={{ cursor: 'pointer' }}>
          <rect x={P.x(kl.bawah) + 1} y={P.y(kl.f)}
                width={Math.max(P.lebarX(kl.atas - kl.bawah) - 2, 1)}
                height={Math.max(K.y1 - P.y(kl.f), 0)}
                fill={terpilih === i ? PERAN.sorot : PERAN.data}
                fillOpacity={terpilih === null || terpilih === i ? 1 : 0.45} rx={2} />
          <text x={P.x((kl.bawah + kl.atas) / 2)} y={P.y(kl.f) - 5} textAnchor="middle"
                fontSize={10} fontFamily={MONO} fill={PERAN.tinta}>{kl.f}</text>
        </g>
      ))}

      {/* garis yang digeser siswa */}
      <line x1={P.x(garis)} y1={K.y0 + 7} x2={P.x(garis)} y2={K.y1 + 6}
            stroke={seimbang ? PERAN.sorot : PERAN.banding} strokeWidth={2.5} />
      {/* bulatan penarik diturunkan ke dalam bingkai: pada K.y0 - 4 ia
          menyentuh baris keterangan di atasnya */}
      <circle cx={P.x(garis)} cy={K.y0 + 7} r={7}
              fill={seimbang ? PERAN.sorot : PERAN.banding} stroke="#FFFDFA" strokeWidth={1.5}
              role="slider" tabIndex={0}
              aria-label={`Garis pembelah, sekarang di nilai ${angka(garis, 2)}`}
              aria-valuenow={garis}
              style={{ cursor: 'grab', touchAction: 'none' }}
              onPointerDown={mulai(0)}
              onKeyDown={(e) => {
                const arah = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
                if (arah === 0) return
                e.preventDefault()
                geser(0, garis + arah * 0.5)
              }} />
    </>
  )

  const kiri = (
    <>
      <div className="layar">
        <Papan
          jendela={J}
          petakX
          labelX="nilai"
          labelY="banyak siswa"
          keterangan={seimbang
            ? `garis ${angka(garis, 2)} · seimbang, sama dengan rumus interpolasi`
            : `garis ${angka(garis, 2)} · kiri ${angka(kiriJumlah, 1)} kanan ${angka(kananJumlah, 1)}`}
          aria="Histogram nilai 40 siswa dengan garis pembelah yang bisa digeser"
          svgRef={svgRef}
          propSvg={propSvg}
        >
          {isi}
        </Papan>
      </div>
      <div className="kendali">
        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="garis">
            <span>Letak garis</span>
            <span className="mono">{angka(garis, 2)}</span>
          </label>
          <input id="garis" type="range" min={MIN} max={MAKS} step={0.25} value={garis}
                 onChange={(e) => geser(0, +e.target.value)} />
        </div>
        <div className="skala-info">
          <span className="titik" />
          <span>
            {seimbang
              ? `seimbang. Kiri dan kanan sama-sama ${angka(kiriJumlah, 1)} siswa, dan rumus interpolasi memberi angka yang sama`
              : selisih < 0
                ? `masih ${angka(-selisih, 1)} siswa lebih banyak di kanan, geser ke kanan`
                : `masih ${angka(selisih, 1)} siswa lebih banyak di kiri, geser ke kiri`}
          </span>
        </div>
      </div>
    </>
  )

  const kanan = (
    <div className="blok">
      <div className="cap">Tabel frekuensi, klik barisnya untuk menyorot batangnya</div>
      <table className="tabel-angka">
        <tbody>
          {D.kelas.map((kl, i) => (
            <tr key={i} className={terpilih === i ? 'tegas' : undefined}
                onClick={() => setTerpilih(i === terpilih ? null : i)}
                style={{ cursor: 'pointer' }}>
              <td>{kl.label} · tengah {angka((kl.bawah + kl.atas) / 2, 1)}</td>
              <td>{kl.f}</td>
            </tr>
          ))}
          <tr><td>banyak data</td><td>{R.n}</td></tr>
        </tbody>
      </table>
      <div className="cap" style={{ marginTop: 14 }}>Hasil rumus data berkelompok</div>
      <table className="tabel-angka">
        <tbody>
          <tr><td>mean</td><td>{angka(R.mean, 2)}</td></tr>
          <tr className="tegas"><td>median</td><td>{angka(R.median, 2)}</td></tr>
          <tr><td>modus</td><td>{angka(R.modus, 2)}</td></tr>
          <tr><td>Q1</td><td>{angka(R.q1, 2)}</td></tr>
          <tr><td>Q3</td><td>{angka(R.q3, 2)}</td></tr>
        </tbody>
      </table>
      <div className="catatan">
        Angka aslinya keempat puluh siswa itu sebenarnya masih ada, dan mean sesungguhnya
        68 sedangkan mediannya 67,5. Hampiran dari tabel meleset sedikit, dan itu memang
        sifatnya: titik tengah kelas adalah tebakan yang masuk akal, bukan kebenaran.
        {' '}{keterangan(D)}
      </div>
    </div>
  )

  return <>{children({ kiri, kanan })}</>
}
