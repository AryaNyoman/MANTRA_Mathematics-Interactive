'use client'

import Bingkai3D, { Ruas } from '@/components/widget/ruang-3d/Bingkai3D'
import {
  KOTAK, MONO, VH, WARNA, bulat, jarakDuaGaris, kameraTitik, kedudukanDuaGaris,
  kubus, type Sudut,
} from '@/components/widget/ruang-3d/ruang'

/**
 * Widget "Kubus Putar", Ruang 3D tahap 1: gambar ruang boleh berbohong.
 *
 * Dua ruas garis disorot: BD pada alas, dan EG pada tutup. Pada sudut pandang
 * awal keduanya JELAS berpotongan di tengah gambar. Padahal keduanya terpisah
 * setinggi satu rusuk penuh, dan tidak pernah bersentuhan.
 *
 * Siswa menarik kubusnya sendiri, dan potongan itu terurai. Sesudah merasakan
 * itu, barulah kata "bersilangan" punya arti. Kalau kata itu diberikan lebih
 * dulu, ia cuma satu istilah lagi yang harus dihafalkan.
 */

export const RUSUK = 6
const BANGUN = kubus(RUSUK)

/** Dua ruas yang disorot. Keduanya diagonal sisi, satu di alas satu di tutup. */
const ALAS = ['B', 'D'] as const
const TUTUP = ['E', 'G'] as const

/**
 * Sudut pandang awal khusus widget ini, mengalahkan SUDUT_AWAL bersama.
 *
 * Nilainya bukan selera. BD dan EG hanya TAMPAK berpotongan kalau matanya cukup
 * tinggi: di bawah 52 derajat keduanya sudah terlihat terpisah, sehingga tipuan
 * yang mau ditunjukkan tahap ini tidak pernah terjadi. Batasnya dihitung, bukan
 * dikira kira, dengan menyapu seluruh sudut dan memeriksa perpotongan di layar.
 *
 * 64 derajat dipilih supaya masih ada jarak aman ke batas 52, tetapi kubusnya
 * belum gepeng seperti dilihat tepat dari atas.
 */
export const SUDUT_MULAI: Sudut = { mendatar: -34, menunduk: 64 }

export const JARAK_ASLI = jarakDuaGaris(
  BANGUN.titik[ALAS[0]], BANGUN.titik[ALAS[1]],
  BANGUN.titik[TUTUP[0]], BANGUN.titik[TUTUP[1]],
)

export const LETAK = kedudukanDuaGaris(
  BANGUN.titik[ALAS[0]], BANGUN.titik[ALAS[1]],
  BANGUN.titik[TUTUP[0]], BANGUN.titik[TUTUP[1]],
)

type Titik2 = { x: number; y: number }

/** Benar kalau dua ruas garis di LAYAR benar-benar berpotongan. */
function ruasBerpotongan(a1: Titik2, a2: Titik2, b1: Titik2, b2: Titik2): boolean {
  const arah = (p: Titik2, q: Titik2, r: Titik2) =>
    (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x)

  const d1 = arah(b1, b2, a1)
  const d2 = arah(b1, b2, a2)
  const d3 = arah(a1, a2, b1)
  const d4 = arah(a1, a2, b2)
  return d1 > 0 !== d2 > 0 && d3 > 0 !== d4 > 0
}

/** Sedang tampak berpotongan atau tidak, pada sudut pandang ini. */
export function tampakBerpotongan(sudut: Sudut): boolean {
  const kam = kameraTitik(BANGUN.titik, sudut)
  return ruasBerpotongan(
    kam.layar(BANGUN.titik[ALAS[0]]), kam.layar(BANGUN.titik[ALAS[1]]),
    kam.layar(BANGUN.titik[TUTUP[0]]), kam.layar(BANGUN.titik[TUTUP[1]]),
  )
}

export default function KubusPutar({
  sudut,
  onUbah,
}: {
  sudut: Sudut
  onUbah: (s: Sudut) => void
}) {
  const potong = tampakBerpotongan(sudut)

  return (
    <Bingkai3D
      bangun={BANGUN}
      sudut={sudut}
      onUbah={onUbah}
      keterangan={`kubus ABCD.EFGH, rusuk ${RUSUK} satuan`}
      bawah={`sebenarnya: BD dan EG ${LETAK}, jaraknya ${bulat(JARAK_ASLI)} satuan`}
      aria={
        `Kubus ABCD.EFGH rusuk ${RUSUK} satuan, bisa diputar. Ruas BD pada alas dan ruas EG pada tutup ` +
        `${potong ? 'terlihat berpotongan di gambar' : 'terlihat terpisah di gambar'}, ` +
        `padahal keduanya ${LETAK} dengan jarak ${bulat(JARAK_ASLI)} satuan.`
      }
    >
      {(_kam, layar) => (
        <>
          <Ruas a={layar[ALAS[0]]} b={layar[ALAS[1]]} warna={WARNA.samping} tebal={3.6} />
          <Ruas a={layar[TUTUP[0]]} b={layar[TUTUP[1]]} warna={WARNA.depan} tebal={3.6} />
          {/* Baris ini sejajar dengan penunjuk skala yang rata kanan. Panjangnya
              sengaja dijaga pendek supaya keduanya tidak pernah bertindih, cacat
              yang sudah pernah terjadi dan tertangkap dari potret layar. */}
          <text x={KOTAK.x0} y={VH - 21} fontSize={12} fontFamily={MONO}
                fill={potong ? WARNA.depan : WARNA.redup}>
            di gambar: {potong ? 'tampak berpotongan' : 'tampak terpisah'}
          </text>
        </>
      )}
    </Bingkai3D>
  )
}
