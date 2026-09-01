'use client'

import Bingkai3D, { Ruas, TandaSiku, TitikBantu } from '@/components/widget/ruang-3d/Bingkai3D'
import {
  KOTAK, MONO, VH, WARNA, bulat, jarakTitik, kubus, sepanjang,
  type Sudut, type Titik3,
} from '@/components/widget/ruang-3d/ruang'

/**
 * Widget "Kaki Tegak Lurus", Ruang 3D tahap 3.
 *
 * Titik B tetap, garis AC tetap. Titik Q digeser sepanjang AC, dan panjang BQ
 * ditampilkan hidup. Panjang itu punya satu nilai terkecil, dan nilai terkecil
 * itu jatuh TEPAT saat BQ tegak lurus AC.
 *
 * KENAPA BEGINI, BUKAN DIBERI DEFINISINYA
 * Buku menuliskan "jarak adalah panjang ruas garis yang tegak lurus" sebagai
 * definisi yang harus diterima. Di sini urutannya dibalik: siswa menggeser
 * dulu, melihat angkanya turun lalu naik lagi, dan menemukan sendiri bahwa
 * titik terendahnya persis di posisi siku-siku. Definisinya jadi kesimpulan,
 * bukan aturan yang datang entah dari mana.
 *
 * Angka yang keluar sudah dicocokkan dengan `alat/cek_ruang.py`:
 * jarak B ke garis AC pada kubus rusuk 6 adalah 3*sqrt(2), sekitar 4,243.
 */

export const RUSUK = 6
const BANGUN = kubus(RUSUK)

const P = BANGUN.titik.B
const GARIS: [Titik3, Titik3] = [BANGUN.titik.A, BANGUN.titik.C]

/** Kaki tegak lurusnya jatuh tepat di tengah AC, jadi t = 0,5. */
export const T_TERBAIK = 0.5

export function kakiDi(t: number): Titik3 {
  return sepanjang(GARIS[0], GARIS[1], t)
}

export function panjangDi(t: number): number {
  return jarakTitik(P, kakiDi(t))
}

export const JARAK_TERPENDEK = panjangDi(T_TERBAIK)

export default function KakiTegakLurus({
  t,
  sudut,
  onUbah,
}: {
  /** letak Q sepanjang AC, 0 di A dan 1 di C */
  t: number
  sudut: Sudut
  onUbah: (s: Sudut) => void
}) {
  const Q = kakiDi(t)
  const panjang = panjangDi(t)
  const siku = Math.abs(t - T_TERBAIK) < 0.02

  return (
    <Bingkai3D
      bangun={BANGUN}
      sudut={sudut}
      onUbah={onUbah}
      titikBantu={{ Q }}
      keterangan={`titik B ke garis AC`}
      bawah={
        siku
          ? `siku-siku. Inilah jaraknya: ${bulat(JARAK_TERPENDEK, 3)} satuan`
          : `BQ = ${bulat(panjang, 3)} satuan, belum yang terpendek`
      }
      warnaBawah={siku ? WARNA.sudut : WARNA.redup}
      aria={
        `Kubus ABCD.EFGH rusuk ${RUSUK}. Titik Q berada pada garis AC, panjang BQ ` +
        `${bulat(panjang, 3)} satuan. ${siku ? 'Sekarang BQ tegak lurus AC, jadi inilah jaraknya.' : 'BQ belum tegak lurus AC.'}`
      }
    >
      {(_kam, layar) => (
        <>
          {/* garis AC, yang jaraknya sedang diukur */}
          <Ruas a={layar.A} b={layar.C} warna={WARNA.samping} tebal={3.4} />
          {/* ruas BQ yang panjangnya berubah */}
          <Ruas
            a={layar.B}
            b={layar.Q}
            warna={siku ? WARNA.sudut : WARNA.depan}
            tebal={siku ? 4 : 3}
          />
          {siku && (
            <TandaSiku sudut={layar.Q} ke1={layar.A} ke2={layar.B} warna={WARNA.sudut} />
          )}
          <TitikBantu p={layar.Q} nama="Q" warna={siku ? WARNA.sudut : WARNA.depan} />
          <text x={KOTAK.x0} y={VH - 21} fontSize={11.5} fontFamily={MONO} fill={WARNA.redup}>
            Q di {bulat(t * 100, 0)}% panjang AC
          </text>
        </>
      )}
    </Bingkai3D>
  )
}

/**
 * Grafik kecil panjang BQ terhadap letak Q, untuk kolom kanan.
 *
 * Sengaja tidak ditaruh di dalam gambar kubusnya. Bingkai kubus dihitung dari
 * bola pembungkus sehingga gambarnya mengisi hampir seluruh bidang, dan
 * menyelipkan grafik di sana pasti menimpa kubusnya. Aturan proyek melarang
 * widget memotong atau menimpa gambarnya sendiri.
 */
export function GrafikPanjang({ t }: { t: number }) {
  const L = 250
  const T = 96
  const kiri = 34
  const kanan = L - 12
  const atas = 10
  const bawah = T - 20

  const contoh = Array.from({ length: 61 }, (_, i) => i / 60)
  const nilai = contoh.map(panjangDi)
  const maks = Math.max(...nilai)
  const min = Math.min(...nilai)
  const rentang = maks - min || 1

  const x = (u: number) => kiri + u * (kanan - kiri)
  const y = (v: number) => bawah - ((v - min) / rentang) * (bawah - atas)

  const jalur = contoh
    .map((u, i) => `${i === 0 ? 'M' : 'L'} ${x(u).toFixed(1)} ${y(nilai[i]).toFixed(1)}`)
    .join(' ')

  const sekarang = panjangDi(t)

  return (
    <svg viewBox={`0 0 ${L} ${T}`} width="100%" role="img"
         aria-label={`Grafik panjang BQ terhadap letak Q. Panjangnya paling kecil, ${bulat(JARAK_TERPENDEK, 3)} satuan, saat Q di tengah AC.`}>
      <line x1={kiri} y1={bawah} x2={kanan} y2={bawah} stroke={WARNA.redup} strokeWidth={1} opacity={0.5} />
      <line x1={kiri} y1={atas} x2={kiri} y2={bawah} stroke={WARNA.redup} strokeWidth={1} opacity={0.5} />

      {/* garis mendatar di nilai terkecil, supaya lembahnya terbaca sebagai batas */}
      <line x1={kiri} y1={y(min)} x2={kanan} y2={y(min)} stroke={WARNA.sudut}
            strokeWidth={1} strokeDasharray="4 4" opacity={0.7} />

      <path d={jalur} fill="none" stroke={WARNA.miring} strokeWidth={2} strokeLinejoin="round" />
      <circle cx={x(t)} cy={y(sekarang)} r={4} fill={WARNA.depan}
              stroke="var(--kartu)" strokeWidth={1.6} />

      <text x={kiri - 4} y={y(min) + 3.5} textAnchor="end" fontSize={9} fontFamily={MONO} fill={WARNA.sudut}>
        {bulat(min, 2)}
      </text>
      <text x={kiri} y={T - 6} fontSize={9} fontFamily={MONO} fill={WARNA.redup}>A</text>
      <text x={kanan} y={T - 6} textAnchor="end" fontSize={9} fontFamily={MONO} fill={WARNA.redup}>C</text>
      <text x={(kiri + kanan) / 2} y={T - 6} textAnchor="middle" fontSize={9}
            fontFamily={MONO} fill={WARNA.redup}>
        letak Q sepanjang AC
      </text>
    </svg>
  )
}
