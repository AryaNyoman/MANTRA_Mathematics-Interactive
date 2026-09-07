'use client'

import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import Bidang from '@/components/widget/turunan/Bidang'
import {
  MONO, WARNA, angka, jalurFungsi, jalurGaris, jendelaTetap, keLayar, type Jendela,
} from '@/components/widget/turunan/koordinat'
import { batasi, bulatkanKe, posisiDiGambar, posisiMatematika } from '@/components/widget/turunan/seret'
import { fungsi } from '@/components/widget/turunan/fungsi'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'

/**
 * Widget "Grafik turunan", Materi 03.
 *
 * Dua papan bertumpuk dengan sumbu x yang SAMA. Papan atas kurva f dengan
 * garis singgung yang ikut bergerak; papan bawah kosong sampai siswa menyapu,
 * lalu terisi sendiri oleh jejak kemiringan.
 *
 * KENAPA PAPAN BAWAH MULAI KOSONG
 * Kalau kurva f′ sudah tergambar sejak awal, siswa membaca dua kurva yang
 * kebetulan berdampingan. Kalau ia lahir dari sapuan tangannya sendiri, ia
 * melihat f′ DIBUAT dari kemiringan f, dan itulah satu-satunya gagasan materi
 * ini. Jejaknya bertahan sampai tombol Kembalikan ditekan.
 *
 * KENAPA JEJAKNYA DISIMPAN SEBAGAI DAFTAR x, BUKAN DAFTAR TITIK
 * Titik dihitung ulang dari fungsi yang sedang dipilih. Dengan begitu jejak
 * tidak mungkin tertinggal dari fungsi lama, dan panggung tidak perlu tahu
 * apa pun tentang rumus turunannya.
 *
 * DIPAKAI DUA MATERI
 * Materi 03 memakainya untuk melahirkan gagasan fungsi turunan, dan Materi 08
 * ('kemiringan-sinus') memakai mekanik yang sama untuk fungsi yang bukan
 * pangkat. Yang berbeda hanya daftar fungsinya dan saklar `tebakan`. Menyalin
 * berkas ini menjadi widget kedua akan melipatgandakan tempat memperbaiki bug
 * yang sama, jadi komponennya satu dan dipanggil dua kali.
 *
 * TITIK YANG TURUNANNYA TIDAK ADA
 * Pada |x| di x = 0 kemiringan dari kiri -1 dan dari kanan 1. Widget tidak
 * menggambar garis singgung apa pun di situ dan menuliskannya dengan kalimat,
 * bukan diam-diam menggambar garis mendatar. Menampilkan 0 di sana adalah
 * jawaban yang salah, bukan jawaban yang kosong.
 */

export const BATAS_X = { min: -3, maks: 3, langkah: 0.1 }
export const AWAL = { x: -3, nama: 'kuadrat' }
export const FUNGSI_TERSEDIA = ['kuadrat', 'kubik', 'sinus', 'mutlak']

/** Fungsi untuk Materi 08: yang tidak bisa dikerjakan dengan aturan pangkat. */
export const FUNGSI_SINUS = ['sinus', 'kosinus', 'eksponen']

/** Batas atas banyaknya jejak yang disimpan panggung. */
export const MAKS_JEJAK = 400

/**
 * Jendela papan bawah: rentang x sama dengan papan atas, rentang y dihitung
 * dari nilai f′ pada seluruh rentang itu.
 *
 * Dihitung dari fungsinya, bukan dari jejak yang sudah terkumpul. Kalau
 * mengikuti jejak, papan bawah akan melar tiap kali siswa menyapu ke daerah
 * baru, dan aturan proyek melarang jendela yang melar saat dipakai.
 */
function jendelaTurunan(nama: string): Jendela {
  const fn = fungsi(nama)
  const [xMin, xMax] = fn.jendela
  let lo = Infinity
  let hi = -Infinity
  for (let i = 0; i <= 240; i++) {
    const x = xMin + ((xMax - xMin) * i) / 240
    const y = fn.turunan(x)
    if (!Number.isFinite(y)) continue
    if (y < lo) lo = y
    if (y > hi) hi = y
  }
  if (!Number.isFinite(lo) || !Number.isFinite(hi)) return jendelaTetap(xMin, xMax, -1, 1)
  const tepi = Math.max((hi - lo) * 0.18, 0.4)
  return jendelaTetap(xMin, xMax, lo - tepi, hi + tepi)
}

export default function GrafikTurunan({
  x, nama, jejak, tebakan = false, onGeser,
}: {
  x: number
  nama: string
  jejak: number[]
  /**
   * Gambar kurva f′ yang sebenarnya di papan bawah, sebagai pembanding jejak.
   *
   * Sengaja MATI secara bawaan. Kalau kurvanya sudah ada sejak awal, siswa
   * membaca dua kurva yang kebetulan berdampingan, bukan menemukan bahwa
   * jejaknya membentuk kurva itu. Materi 08 menyalakannya setelah siswa
   * menyapu, sebagai jawaban atas tebakannya sendiri.
   */
  tebakan?: boolean
  onGeser: (x: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [menyeret, setMenyeret] = useState(false)
  const fn = fungsi(nama)
  const atas: Jendela = jendelaTetap(...fn.jendela)
  const bawah = jendelaTurunan(nama)
  const pa = keLayar(atas)
  const pb = keLayar(bawah)

  const y = fn.f(x)
  const m = fn.turunan(x)
  const adaTurunan = Number.isFinite(m)
  const nyala = dipegang === 'x' || menyeret

  function seret(e: ReactPointerEvent<SVGSVGElement>) {
    const mm = posisiMatematika(e, atas)
    if (!mm) return
    onGeser(batasi(bulatkanKe(mm.x, BATAS_X.langkah), fn.sapuan[0], fn.sapuan[1]))
  }

  function mulai(e: ReactPointerEvent<SVGSVGElement>) {
    if (!posisiDiGambar(e)) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setMenyeret(true)
    seret(e)
  }

  return (
    // Dua papan ditumpuk dengan gaya sebaris, bukan kelas baru di globals.css:
    // berkas itu wilayah sesi MATRA-DESAIN-UI-UX dan tidak boleh disunting sesi
    // topik. Dua baris grid tidak sepadan dengan permintaan lintas wilayah.
    <div style={{ display: 'grid', gap: 6 }}>
      {/* ================= papan atas: kurva f ================= */}
      <Bidang
        jendela={atas}
        keterangan={fn.rumus}
        catatan={[{
          teks: adaTurunan
            ? `kemiringan di x = ${angka(x, 1)} adalah ${angka(m, 2)}`
            : `di x = ${angka(x, 1)} turunannya tidak ada`,
          warna: adaTurunan ? WARNA.sudut : WARNA.depan,
        }]}
        catatanBawah={{ teks: 'seret di gambar untuk menyapu x' }}
        aria={`Papan atas, kurva ${fn.rumus}. Titik pada x sama dengan ${angka(x, 1)}, kemiringannya ${adaTurunan ? angka(m, 2) : 'tidak ada'}.`}
        gaya={{ cursor: menyeret ? 'grabbing' : 'grab', touchAction: 'none' }}
        onPointerDown={mulai}
        onPointerMove={(e) => { if (menyeret) seret(e) }}
        onPointerUp={() => setMenyeret(false)}
      >
        <path d={jalurFungsi(fn.f, atas, 400)} fill="none" stroke={WARNA.miring}
              strokeWidth={2.6} strokeLinecap="round" />
        {adaTurunan && (
          <path d={jalurGaris(x, y, m, atas)} fill="none" stroke={WARNA.sudut}
                strokeWidth={nyala ? 2.8 : 2.2} opacity={0.9} />
        )}
        <line x1={pa.x(x)} y1={pa.y(y)} x2={pa.x(x)} y2={pa.y(atas.yMin)}
              stroke={WARNA.redup} strokeWidth={1} strokeDasharray="3 4" />
        <g className={nyala ? 'nyala' : undefined}>
          <circle cx={pa.x(x)} cy={pa.y(y)} r={18} fill="transparent" />
          <circle cx={pa.x(x)} cy={pa.y(y)} r={nyala ? 8.5 : 7}
                  fill={WARNA.miring} stroke="var(--kartu)" strokeWidth={2.2} />
        </g>
      </Bidang>

      {/* ================= papan bawah: jejak kemiringan ================= */}
      <Bidang
        jendela={bawah}
        keterangan={tebakan
          ? `jejak kemiringan, dibandingkan dengan ${fn.rumusTurunan}`
          : jejak.length > 3 ? 'jejak kemiringan f' : 'papan ini terisi saat Anda menyapu'}
        catatanBawah={{ teks: `${jejak.length} titik terkumpul` }}
        aria={`Papan bawah, jejak kemiringan. ${jejak.length} titik sudah terkumpul.`}
        tandaSkala={false}
      >
        {tebakan && (
          <path d={jalurFungsi(fn.turunan, bawah, 400)} fill="none" stroke={WARNA.depan}
                strokeWidth={2.4} opacity={0.55} strokeLinecap="round" />
        )}
        {jejak.map((jx) => {
          const jy = fn.turunan(jx)
          if (!Number.isFinite(jy)) return null
          return <circle key={jx} cx={pb.x(jx)} cy={pb.y(jy)} r={2.4} fill={WARNA.sudut} opacity={0.75} />
        })}
        <line x1={pb.x(x)} y1={pb.y(bawah.yMin)} x2={pb.x(x)} y2={pb.y(bawah.yMax)}
              stroke={WARNA.redup} strokeWidth={1} strokeDasharray="3 4" />
        {adaTurunan && (
          <g className={nyala ? 'nyala' : undefined}>
            <circle cx={pb.x(x)} cy={pb.y(m)} r={nyala ? 7.5 : 6}
                    fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2.2} />
          </g>
        )}
        {!adaTurunan && (
          <text x={pb.x(x) + 8} y={pb.y(0)} fontSize={10.5} fill={WARNA.depan} fontFamily={MONO}>
            tidak ada di sini
          </text>
        )}
      </Bidang>
    </div>
  )
}

/**
 * Batas sapuan x untuk fungsi yang sedang dipilih.
 *
 * Ikut jendela fungsinya, BUKAN satu angka tetap. Kalau dipatok -3 sampai 3,
 * penggeser tidak bisa mencapai bagian grafik sinus yang justru harus disapu,
 * sementara seretan di gambar bisa. Dua kendali yang jangkauannya berbeda
 * untuk besaran yang sama adalah cacat, bukan kelonggaran.
 */
export function batasX(nama: string): { min: number; maks: number; langkah: number } {
  const fn = fungsi(nama)
  return { min: fn.sapuan[0], maks: fn.sapuan[1], langkah: BATAS_X.langkah }
}

/** Baris tabel untuk kolom kanan panggung. */
export function tabelGrafikTurunan(x: number, nama: string): Array<{ nama: string; nilai: string }> {
  const fn = fungsi(nama)
  const m = fn.turunan(x)
  return [
    { nama: 'x', nilai: angka(x, 1) },
    { nama: 'tinggi f(x)', nilai: angka(fn.f(x), 3) },
    { nama: 'kemiringan f′(x)', nilai: Number.isFinite(m) ? angka(m, 3) : 'tidak ada' },
  ]
}
