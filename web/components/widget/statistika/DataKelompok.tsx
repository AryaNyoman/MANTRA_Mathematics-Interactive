'use client'

import { Angka, Petunjuk } from '@/components/kendali'
import { useRef, useState } from 'react'
import Papan from '@/components/widget/statistika/Papan'
import { MONO, PERAN } from '@/components/widget/statistika/warna-data'
import { TEPI, angka, keLayar, kotak } from '@/components/widget/statistika/skala'
import { useSeret } from '@/components/widget/statistika/seret'
import { ringkasKelompok } from '@/components/widget/statistika/statistik'
import { kelompok, keterangan } from '@/content/statistika/data'
import type { Kelas } from '@/components/widget/statistika/statistik'
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
 *
 * BAGIAN KEDUA: MODUS
 * Frekuensi kedua tetangga batang tertinggi bisa diubah siswa. Modusnya
 * bergeser sendiri di dalam batang tertinggi, condong ke tetangga yang lebih
 * tinggi, dan jatuh tepat di tengah kelas kalau kedua tetangganya sama.
 * Itulah isi rumus kesebangunan, tanpa perlu dihafal lebih dulu.
 *
 * Kedua tetangga dibatasi paling tinggi satu di bawah puncak. Kalau tetangga
 * boleh menyamai atau melewati puncak, kelas modusnya sendiri yang berpindah,
 * dan pelajaran "modus bergeser DI DALAM batang tertinggi" jadi kabur.
 */

const D = kelompok('t09-nilai-kelompok')
const ASLI = D.kelas
const MIN = ASLI[0].bawah
const MAKS = ASLI[ASLI.length - 1].atas
const PUNCAK = Math.max(...ASLI.map((k) => k.f))
const I_PUNCAK = ASLI.findIndex((k) => k.f === PUNCAK)
const I_KIRI = I_PUNCAK - 1
const I_KANAN = I_PUNCAK + 1
const BATAS_TETANGGA = PUNCAK - 1

const J = { xMin: MIN, xMax: MAKS, yMin: 0, yMax: PUNCAK * 1.2 }
const P = keLayar(J, TEPI)
const K = kotak(TEPI)
const dari = (px: number) => MIN + ((px - K.x0) / (K.x1 - K.x0)) * (MAKS - MIN)

/** Banyak data di sebelah kiri sebuah nilai, dengan anggapan sebaran merata. */
function banyakDiKiri(kelas: Kelas[], x: number): number {
  let jumlah = 0
  for (const kl of kelas) {
    if (x >= kl.atas) jumlah += kl.f
    else if (x > kl.bawah) jumlah += kl.f * ((x - kl.bawah) / (kl.atas - kl.bawah))
  }
  return jumlah
}

export default function DataKelompok({ children }: PropWidget) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [garis, setGaris] = useState(MIN + (MAKS - MIN) * 0.3)
  const [terpilih, setTerpilih] = useState<number | null>(null)
  const [fKiri, setFKiri] = useState(ASLI[I_KIRI].f)
  const [fKanan, setFKanan] = useState(ASLI[I_KANAN].f)

  const diubah = fKiri !== ASLI[I_KIRI].f || fKanan !== ASLI[I_KANAN].f
  const kelas: Kelas[] = ASLI.map((kl, i) =>
    i === I_KIRI ? { ...kl, f: fKiri } : i === I_KANAN ? { ...kl, f: fKanan } : kl,
  )
  const R = ringkasKelompok(kelas)

  const d1 = PUNCAK - fKiri
  const d2 = PUNCAK - fKanan
  const tengahPuncak = (ASLI[I_PUNCAK].bawah + ASLI[I_PUNCAK].atas) / 2
  const condong =
    Math.abs(R.modus - tengahPuncak) < 0.005
      ? 'tepat di tengah kelas, sebab kedua tetangganya sama tinggi'
      : R.modus > tengahPuncak
        ? 'condong ke kanan, sebab tetangga kanannya lebih tinggi'
        : 'condong ke kiri, sebab tetangga kirinya lebih tinggi'

  const geser = (_i: number, nilai: number) =>
    setGaris(Math.min(MAKS, Math.max(MIN, Math.round(nilai * 100) / 100)))

  const { propSvg, mulai } = useSeret(svgRef, (i, x) => geser(i, dari(x)))

  const kiriJumlah = banyakDiKiri(kelas, garis)
  const kananJumlah = R.n - kiriJumlah
  const selisih = kiriJumlah - kananJumlah
  const seimbang = Math.abs(selisih) < 0.05

  const isi = (
    <>
      {kelas.map((kl, i) => (
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

      {/* modus: garis putus di dalam batang tertinggi */}
      <line x1={P.x(R.modus)} y1={P.y(PUNCAK)} x2={P.x(R.modus)} y2={K.y1}
            stroke={PERAN.banding} strokeWidth={2} strokeDasharray="5 3" />

      {/* garis yang digeser siswa */}
      <line x1={P.x(garis)} y1={K.y0 + 30} x2={P.x(garis)} y2={K.y1 + 6}
            stroke={seimbang ? PERAN.sorot : PERAN.tinta} strokeWidth={2.5} />
      {/* Bulatan penarik ditaruh di K.y0 + 30, di BAWAH baris keterangan papan.
          Pada K.y0 - 4 ia menyentuh keterangan yang dulu di tepi atas, dan pada
          K.y0 + 7 ia menindih keterangan yang sekarang sudah masuk bingkai. */}
      <circle cx={P.x(garis)} cy={K.y0 + 30} r={7}
              fill={seimbang ? PERAN.sorot : PERAN.tinta} stroke="#FFFDFA" strokeWidth={1.5}
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

      {/* Label modus digambar PALING AKHIR dan diberi halo krem. Letaknya di
          dalam batang tertinggi, bukan di atasnya: di atas bingkai ada bulatan
          penarik garis median, dan pada susunan sebelumnya bulatan hitam itu
          menutupi huruf "modus" begitu garis median digeser mendekat. Halo
          membuat tulisannya tetap terbaca walau garis putus atau garis median
          lewat di belakangnya.

          Letaknya dipatok di TENGAH batang, bukan mengikuti garis putusnya.
          Lebar tulisannya hampir selebar batang, jadi kalau ia ikut bergeser
          ia akan menjulur keluar dan menabrak angka frekuensi batang sebelah.
          Yang menunjukkan letak persis modus adalah garis putusnya. */}
      <text x={P.x(tengahPuncak)} y={P.y(PUNCAK) + 17} textAnchor="middle" fontSize={9.5}
            fontFamily={MONO} fill={PERAN.banding}
            stroke="#FFFDFA" strokeWidth={3} paintOrder="stroke" strokeLinejoin="round">
        modus {angka(R.modus, 2)}
      </text>
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
          aria="Histogram nilai 40 siswa dengan garis pembelah yang bisa digeser dan penanda modus"
          svgRef={svgRef}
          propSvg={propSvg}
        >
          {isi}
        </Papan>
      </div>
      <div className="kendali">
        <Angka nama="Letak garis" arti="geser sampai siswa di kiri dan kanan sama banyak" kunci="garis"
          nilai={garis} onUbah={(n) => geser(0, n)} min={MIN} max={MAKS} langkah={0.25} desimal={2} />
        <Angka nama={`Tetangga kiri ${ASLI[I_KIRI].label}`} arti="banyak siswa di kelas sebelah kiri" kunci="kiri" satuan=" siswa"
          nilai={fKiri} onUbah={setFKiri} min={0} max={BATAS_TETANGGA} langkah={1} />
        <Angka nama={`Tetangga kanan ${ASLI[I_KANAN].label}`} arti="banyak siswa di kelas sebelah kanan" kunci="kanan" satuan=" siswa"
          nilai={fKanan} onUbah={setFKanan} min={0} max={BATAS_TETANGGA} langkah={1} />
        <div style={{ gridColumn: '1 / -1' }}>
          <label><span>Tabel asli</span></label>
          <div className="pilih-sisi">
            <button onClick={() => { setFKiri(ASLI[I_KIRI].f); setFKanan(ASLI[I_KANAN].f) }}>
              Kembalikan semula
            </button>
          </div>
        </div>
        <Petunjuk>
            {seimbang
              ? `seimbang. Kiri dan kanan sama-sama ${angka(kiriJumlah, 1)} siswa, dan rumus interpolasi memberi angka yang sama`
              : selisih < 0
                ? `masih ${angka(-selisih, 1)} siswa lebih banyak di kanan, geser ke kanan`
                : `masih ${angka(selisih, 1)} siswa lebih banyak di kiri, geser ke kiri`}
          </Petunjuk>
      </div>
    </>
  )

  const kanan = (
    <div className="blok">
      <div className="cap">Tabel frekuensi, klik barisnya untuk menyorot batangnya</div>
      <table className="tabel-angka">
        <tbody>
          {kelas.map((kl, i) => (
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
          <tr className="tegas"><td>modus</td><td>{angka(R.modus, 2)}</td></tr>
          <tr><td>selisih tetangga kiri d1</td><td>{d1}</td></tr>
          <tr><td>selisih tetangga kanan d2</td><td>{d2}</td></tr>
          <tr><td>tengah kelas modus</td><td>{angka(tengahPuncak, 1)}</td></tr>
          <tr><td>Q1</td><td>{angka(R.q1, 2)}</td></tr>
          <tr><td>Q3</td><td>{angka(R.q3, 2)}</td></tr>
        </tbody>
      </table>
      <div className="catatan">
        Modus {angka(R.modus, 2)} jatuh {condong}.
        {' '}{diubah
          ? 'Tabel ini sudah Anda ubah, jadi angkanya bukan lagi angka contoh di bacaan. Modusnya tetap berada di dalam batang tertinggi, tetapi letaknya di dalam batang itu ditarik oleh tetangga yang lebih tinggi. Tekan "Kembalikan semula" untuk kembali ke tabel 40 siswa.'
          : 'Angka aslinya keempat puluh siswa itu sebenarnya masih ada, dan mean sesungguhnya 68 sedangkan mediannya 67,5. Hampiran dari tabel meleset sedikit, dan itu memang sifatnya: titik tengah kelas adalah tebakan yang masuk akal, bukan kebenaran.'}
        {' '}{keterangan(D)}
      </div>
    </div>
  )

  return <>{children({ kiri, kanan })}</>
}
