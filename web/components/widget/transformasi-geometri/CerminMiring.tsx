'use client'

import BidangTransformasi from './BidangTransformasi'
import Legenda from './Legenda'
import { Bentuk } from './Bentuk'
import { GarisCermin, RuasBerangka } from './Garis'
import { BENTUK_L, SUDUT_BERNAMA, cerminYSamaMinX, cerminYSamaX, type Titik } from './matriks'
import { angka, jendelaSeimbang, keLayar } from './papan'
import { ALAT, BANTU, KERTAS, KOTAK, MONO, NISBAH, PETA, PRAPETA } from './gaya'

/** Titik asal wajib terlihat, sebab kedua garis cerminnya melewatinya. */
const JANGKAR: Titik[] = [
  { x: -1, y: -1 },
  { x: 1, y: 1 },
]

/**
 * Widget Materi 04: pencerminan pada garis y = x dan y = -x.
 *
 * Yang harus TERLIHAT di sini bukan bentuk barunya, melainkan koordinat yang
 * bertukar. Karena itu tiap sudut bernama diberi tulisan koordinatnya, prapeta
 * dan petanya, berdampingan di gambar. Siswa yang membaca A (1, 1) lalu
 * A' (1, 1) tidak belajar apa-apa; yang membaca B (6, 1) lalu B' (1, 6)
 * melihat pertukarannya sendiri.
 *
 * Garis cerminnya TIDAK bisa digeser, dan itu memang benar: y = x dan y = -x
 * adalah dua garis tertentu, bukan keluarga garis seperti x = k di Materi 03.
 * Menyediakan penggeser di sini akan mengajarkan hal yang salah.
 */
export default function CerminMiring({ naik }: { naik: boolean }) {
  const prapeta = BENTUK_L
  const peta = prapeta.map((t) => (naik ? cerminYSamaX(t) : cerminYSamaMinX(t)))

  const jendela = jendelaSeimbang([...JANGKAR, ...prapeta, ...peta], NISBAH, 0.08)
  const p = keLayar(jendela, KOTAK)

  const namaGaris = naik ? 'y = x' : 'y = -x'

  return (
    <BidangTransformasi
      jendela={jendela}
      aria={`Bentuk huruf L dicerminkan pada garis ${namaGaris}. Koordinat tiap sudut ditulis untuk prapeta dan petanya.`}
      keterangan={`cermin pada ${namaGaris}`}
    >
      {prapeta.map((t, i) => (
        <RuasBerangka key={`tl${i}`} dari={t} ke={peta[i]} p={p} warna={BANTU} tampilkanAngka={false} />
      ))}

      <GarisCermin arah={{ jenis: 'miring', naik }} jendela={jendela} p={p} label={namaGaris} />

      <Bentuk titik={prapeta} p={p} warna={PRAPETA} isian={0.08} putus labelSudut={false} />
      <Bentuk titik={peta} p={p} warna={PETA} isian={0.14} petik="'" labelSudut={false} />

      {/* Koordinat ketiga sudut bernama, prapeta dan petanya. Label bawaan
          `Bentuk` dimatikan supaya tidak ada dua tulisan di satu titik. */}
      {SUDUT_BERNAMA.map((s) => {
        const t = prapeta[s.indeks]
        const q = peta[s.indeks]
        if (!t || !q) return null
        return (
          <g key={`k${s.indeks}`}>
            <text
              x={p.x(t.x) + 9} y={p.y(t.y) - 7}
              fontSize={10.5} fontWeight={600} fill={PRAPETA} fontFamily={MONO}
              stroke={KERTAS} strokeWidth={2.8} paintOrder="stroke"
            >
              {s.nama} ({angka(t.x, 0)}, {angka(t.y, 0)})
            </text>
            <text
              x={p.x(q.x) + 9} y={p.y(q.y) - 7}
              fontSize={10.5} fontWeight={600} fill={PETA} fontFamily={MONO}
              stroke={KERTAS} strokeWidth={2.8} paintOrder="stroke"
            >
              {s.nama}&#39; ({angka(q.x, 0)}, {angka(q.y, 0)})
            </text>
          </g>
        )
      })}

      <Legenda
        sudut="kanan-bawah"
        entri={[
          { warna: PRAPETA, teks: 'prapeta', putus: true },
          { warna: PETA, teks: 'peta' },
          { warna: ALAT, teks: `garis cermin ${namaGaris}`, putus: true },
        ]}
      />
    </BidangTransformasi>
  )
}
