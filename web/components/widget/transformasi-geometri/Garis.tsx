'use client'

import type { Titik } from './matriks'
import { angka, type Jendela, type Pemeta } from './papan'
import { ALAT, BANTU, KERTAS, MONO } from './gaya'

/**
 * Garis, panah, dan ukuran: tiga hal yang dipakai berulang oleh widget topik
 * ini dan tidak termasuk gambar bendanya.
 */

/* ------------------------------------------------------------------ */
/* Garis cermin                                                        */
/* ------------------------------------------------------------------ */

export type ArahCermin =
  /** garis tegak x = nilai; sumbu Y adalah kasus nilai = 0 */
  | { jenis: 'tegak'; nilai: number }
  /** garis mendatar y = nilai; sumbu X adalah kasus nilai = 0 */
  | { jenis: 'datar'; nilai: number }
  /** garis y = x, atau y = -x kalau `naik` bernilai salah */
  | { jenis: 'miring'; naik: boolean }

/**
 * Garis cermin, digambar MENEMBUS seluruh bidang dari tepi ke tepi.
 *
 * KENAPA MENEMBUS, BUKAN SEPANJANG BENDANYA SAJA
 * Garis cermin adalah garis, bukan ruas. Kalau digambar hanya sepanjang
 * bendanya, siswa akan mengira pencerminan cuma berlaku di potongan itu, dan
 * pertanyaan "kalau bendanya digeser ke atas, cerminnya ikut pindah?" jadi
 * masuk akal padahal jawabannya tidak.
 */
export function GarisCermin({
  arah,
  jendela,
  p,
  label,
  warna = ALAT,
}: {
  arah: ArahCermin
  jendela: Jendela
  p: Pemeta
  label?: string
  warna?: string
}) {
  let dari: Titik
  let ke: Titik

  if (arah.jenis === 'tegak') {
    dari = { x: arah.nilai, y: jendela.yMin }
    ke = { x: arah.nilai, y: jendela.yMax }
  } else if (arah.jenis === 'datar') {
    dari = { x: jendela.xMin, y: arah.nilai }
    ke = { x: jendela.xMax, y: arah.nilai }
  } else if (arah.naik) {
    // y = x hanya terlihat di rentang x yang nilai y-nya juga masih di jendela.
    const x0 = Math.max(jendela.xMin, jendela.yMin)
    const x1 = Math.min(jendela.xMax, jendela.yMax)
    dari = { x: x0, y: x0 }
    ke = { x: x1, y: x1 }
  } else {
    const x0 = Math.max(jendela.xMin, -jendela.yMax)
    const x1 = Math.min(jendela.xMax, -jendela.yMin)
    dari = { x: x0, y: -x0 }
    ke = { x: x1, y: -x1 }
  }

  // Label ditaruh dekat PANGKAL garisnya, bukan di tengahnya.
  //
  // Versi pertama menaruhnya di tengah, dan di tengah itulah bendanya berada:
  // pada Materi 04 tulisan "y = x" jatuh tepat di atas tepi prapeta. Pangkal
  // garis selalu di tepi bawah bidang (untuk garis tegak dan garis miring)
  // atau di tepi kiri (untuk garis mendatar), dan kedua tempat itu yang paling
  // sering kosong, sebab bentuknya cenderung berada di tengah ke atas.
  const label_t = 0.14
  const dekatPangkal = {
    x: dari.x + (ke.x - dari.x) * label_t,
    y: dari.y + (ke.y - dari.y) * label_t,
  }

  return (
    <g>
      <line
        x1={p.x(dari.x)} y1={p.y(dari.y)} x2={p.x(ke.x)} y2={p.y(ke.y)}
        stroke={warna} strokeWidth={2.4} strokeDasharray="9 5" strokeLinecap="round"
      />
      {label && (
        <text
          x={p.x(dekatPangkal.x) + 8} y={p.y(dekatPangkal.y) - 8}
          fontSize={11} fontWeight={600} fill={warna} fontFamily={MONO}
          stroke={KERTAS} strokeWidth={2.8} paintOrder="stroke"
        >
          {label}
        </text>
      )}
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* Panah                                                               */
/* ------------------------------------------------------------------ */

/** Panah lurus dari satu titik ke titik lain, dengan mata panah di ujungnya. */
export function Panah({
  dari,
  ke,
  p,
  warna,
  tebal = 2.4,
  label,
}: {
  dari: Titik
  ke: Titik
  p: Pemeta
  warna: string
  tebal?: number
  label?: string
}) {
  const x1 = p.x(dari.x)
  const y1 = p.y(dari.y)
  const x2 = p.x(ke.x)
  const y2 = p.y(ke.y)
  const panjang = Math.hypot(x2 - x1, y2 - y1)

  // Panah sependek nol tidak punya arah, dan mata panahnya akan digambar
  // menghadap sembarang arah atau lenyap jadi NaN. Terjadi saat siswa menyetel
  // geseran ke nol, yang justru kasus yang menarik di Materi 02.
  if (panjang < 1) return null

  const ux = (x2 - x1) / panjang
  const uy = (y2 - y1) / panjang
  const sayap = Math.min(9, panjang * 0.4)
  const pangkalKepala = { x: x2 - ux * sayap, y: y2 - uy * sayap }
  const lebarSayap = sayap * 0.5

  return (
    <g>
      <line
        x1={x1} y1={y1} x2={pangkalKepala.x} y2={pangkalKepala.y}
        stroke={warna} strokeWidth={tebal} strokeLinecap="round"
      />
      <polygon
        points={[
          `${x2},${y2}`,
          `${pangkalKepala.x - uy * lebarSayap},${pangkalKepala.y + ux * lebarSayap}`,
          `${pangkalKepala.x + uy * lebarSayap},${pangkalKepala.y - ux * lebarSayap}`,
        ].join(' ')}
        fill={warna}
      />
      {label && (
        <text
          x={(x1 + x2) / 2 - uy * 12} y={(y1 + y2) / 2 + ux * 12 + 3.4}
          textAnchor="middle"
          fontSize={11} fontWeight={600} fill={warna} fontFamily={MONO}
          stroke={KERTAS} strokeWidth={2.8} paintOrder="stroke"
        >
          {label}
        </text>
      )}
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* Ruas berangka                                                       */
/* ------------------------------------------------------------------ */

/**
 * Ruas putus-putus dengan panjangnya tertulis di tengah.
 *
 * Dipakai Materi 03 dan 05 untuk menunjukkan kedua potongan berjarak SAMA.
 * Angkanya ditulis, bukan cuma diberi tanda siku dua garis, sebab yang sedang
 * dibuktikan adalah kesamaan angkanya. Tanda yang sama tanpa angka meminta
 * siswa percaya; angka yang sama membiarkan siswa memeriksa.
 */
export function RuasBerangka({
  dari,
  ke,
  p,
  warna = BANTU,
  desimal = 1,
  tampilkanAngka = true,
  sisi = 1,
}: {
  dari: Titik
  ke: Titik
  p: Pemeta
  warna?: string
  desimal?: number
  tampilkanAngka?: boolean
  /**
   * Sisi mana angkanya ditaruh, TEGAK LURUS terhadap ruasnya: 1 satu sisi,
   * -1 sisi seberangnya.
   *
   * KENAPA PERLU DIATUR DARI LUAR
   * Materi 03 dan 05 menggambar DUA ruas yang berjajar pada satu garis lurus,
   * yaitu dari prapeta ke cerminnya lalu dari cerminnya ke peta. Kalau kedua
   * angkanya ditaruh di sisi yang sama, keduanya berdesakan di dekat titik
   * cerminnya. Pada pemeriksaan visual 3 Sep 2026 hasilnya lebih buruk lagi:
   * kedua angka itu bertumpuk dengan angka sumbu dan dengan angka nol di titik
   * asal, menjadi gumpalan "1,4 0 -1 1,4" yang tidak terbaca.
   *
   * Dengan sisi yang berlawanan, keduanya terpisah oleh lebar ruasnya sendiri.
   */
  sisi?: 1 | -1
}) {
  const panjangNyata = Math.hypot(ke.x - dari.x, ke.y - dari.y)
  if (panjangNyata < 1e-9) return null

  const x1 = p.x(dari.x)
  const y1 = p.y(dari.y)
  const x2 = p.x(ke.x)
  const y2 = p.y(ke.y)

  // Arah tegak lurus ruasnya di koordinat layar. Untuk ruas mendatar hasilnya
  // ke atas atau ke bawah, untuk ruas tegak ke kiri atau ke kanan, dan untuk
  // ruas miring ikut miring. Itu yang membuatnya selalu menjauh dari ruasnya.
  const panjangLayar = Math.hypot(x2 - x1, y2 - y1) || 1
  const tegakX = (-(y2 - y1) / panjangLayar) * 16 * sisi
  const tegakY = ((x2 - x1) / panjangLayar) * 16 * sisi

  return (
    <g>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={warna} strokeWidth={1.3} strokeDasharray="4 3"
      />
      {tampilkanAngka && (
        <text
          x={(x1 + x2) / 2 + tegakX} y={(y1 + y2) / 2 + tegakY + 3.4}
          textAnchor="middle"
          fontSize={9.5} fill={warna} fontFamily={MONO}
          stroke={KERTAS} strokeWidth={2.6} paintOrder="stroke"
        >
          {angka(panjangNyata, desimal)}
        </text>
      )}
    </g>
  )
}
