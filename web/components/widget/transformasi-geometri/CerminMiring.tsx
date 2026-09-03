'use client'

import BidangTransformasi from './BidangTransformasi'
import Legenda from './Legenda'
import { Bentuk } from './Bentuk'
import { GarisCermin, RuasBerangka } from './Garis'
import { BENTUK_L, cerminYSamaMinX, cerminYSamaX, type Titik } from './matriks'
import { jendelaSeimbang, keLayar } from './papan'
import { ALAT, BANTU, KOTAK, NISBAH, PETA, PRAPETA } from './gaya'

/** Titik asal wajib terlihat, sebab kedua garis cerminnya melewatinya. */
const JANGKAR: Titik[] = [
  { x: -1, y: -1 },
  { x: 1, y: 1 },
]

/**
 * Widget Materi 04: pencerminan pada garis y = x dan y = -x.
 *
 * Garis cerminnya TIDAK bisa digeser, dan itu memang benar: y = x dan y = -x
 * adalah dua garis tertentu, bukan keluarga garis seperti x = k di Materi 03.
 * Menyediakan penggeser di sini akan mengajarkan hal yang salah.
 *
 * KOORDINATNYA TIDAK DITULIS DI ATAS GAMBAR
 * Versi pertama menuliskan koordinat prapeta dan peta di sebelah tiap sudut,
 * supaya pertukarannya terlihat langsung. Itu gagal, dan gagalnya tertangkap
 * saat pemeriksaan visual 3 Sep 2026: tulisannya bertindih menjadi bubur.
 * "B' (1, 6)" dan "C' (2, 6)" tampil sebagai "B' (1C'6(2, 6)", dan yang
 * paling parah "A' (1, 1)" bertumpuk dengan "A (1, 1)" menjadi "A' ((1,11)".
 *
 * Sebab yang terakhir bukan kelalaian tata letak, melainkan matematika:
 * sudut A(1, 1) berada TEPAT di garis y = x, jadi ia tidak berpindah dan
 * kedua labelnya memang menempati satu titik. Menggeser salah satunya membuat
 * label itu menunjuk tempat yang salah.
 *
 * Sekarang gambarnya hanya memberi nama sudut, dan angkanya dibaca di tabel
 * panel kanan yang memang sudah menyandingkan prapeta dengan petanya. Sudut
 * yang tidak berpindah diberi satu label bertuliskan "A = A'", sehingga
 * ketetapannya justru jadi terlihat, bukan jadi kekacauan.
 */
export default function CerminMiring({ naik }: { naik: boolean }) {
  const prapeta = BENTUK_L
  const peta = prapeta.map((t) => (naik ? cerminYSamaX(t) : cerminYSamaMinX(t)))

  const jendela = jendelaSeimbang([...JANGKAR, ...prapeta, ...peta], NISBAH, 0.08)
  const p = keLayar(jendela, KOTAK)

  const namaGaris = naik ? 'y = x' : 'y = -x'

  /** Sudut yang berada di garis cerminnya sendiri, jadi tidak berpindah. */
  const tetap = (i: number) =>
    Math.abs(prapeta[i].x - peta[i].x) < 1e-9 && Math.abs(prapeta[i].y - peta[i].y) < 1e-9

  return (
    <BidangTransformasi
      jendela={jendela}
      aria={`Bentuk huruf L dicerminkan pada garis ${namaGaris}. Angka koordinatnya ada di tabel sebelah kanan.`}
      keterangan={`cermin pada ${namaGaris}`}
    >
      {prapeta.map((t, i) => (
        <RuasBerangka key={`tl${i}`} dari={t} ke={peta[i]} p={p} warna={BANTU} tampilkanAngka={false} />
      ))}

      <GarisCermin arah={{ jenis: 'miring', naik }} jendela={jendela} p={p} label={namaGaris} />

      <Bentuk
        titik={prapeta} p={p} warna={PRAPETA} isian={0.08} putus
        tulisSudut={(nama, i) => (tetap(i) ? `${nama} = ${nama}'` : nama)}
      />
      <Bentuk
        titik={peta} p={p} warna={PETA} isian={0.14}
        tulisSudut={(nama, i) => (tetap(i) ? null : `${nama}'`)}
      />

      <Legenda
        entri={[
          { warna: PRAPETA, teks: 'prapeta', putus: true },
          { warna: PETA, teks: 'peta' },
          { warna: ALAT, teks: `cermin ${namaGaris}`, putus: true },
        ]}
      />
    </BidangTransformasi>
  )
}
