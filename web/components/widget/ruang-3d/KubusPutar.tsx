'use client'

import { useRef } from 'react'
import {
  BATAS_MENUNDUK, KOTAK, MONO, VH, VW, WARNA,
  bulat, jarakDuaGaris, jepitMenunduk, kamera, kedudukanDuaGaris, kubus,
  kunciRusuk, rusukTerhalang, sisiMenghadap, bolaMuat,
  type Sudut, type Titik3,
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
 *
 * Keterangan di dalam gambar sengaja menyebut DUA hal sekaligus dan hidup
 * mengikuti putaran: apa yang terlihat sekarang, dan apa yang sebenarnya.
 * Selisih itulah pelajarannya.
 */

const RUSUK = 6
const BANGUN = kubus(RUSUK)
const BOLA = bolaMuat(Object.values(BANGUN.titik))

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

/** Dua ruas yang disorot. Keduanya diagonal sisi, satu di alas satu di tutup. */
const RUAS_ALAS = ['B', 'D'] as const
const RUAS_TUTUP = ['E', 'G'] as const

/** Seberapa cepat kubus berputar mengikuti tarikan, dalam derajat per piksel. */
const KEPEKAAN = 0.42

/** Benar kalau dua ruas garis di LAYAR benar-benar berpotongan. */
function ruasBerpotongan(
  a1: { x: number; y: number }, a2: { x: number; y: number },
  b1: { x: number; y: number }, b2: { x: number; y: number },
): boolean {
  const arah = (p: { x: number; y: number }, q: { x: number; y: number }, r: { x: number; y: number }) =>
    (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x)

  const d1 = arah(b1, b2, a1)
  const d2 = arah(b1, b2, a2)
  const d3 = arah(a1, a2, b1)
  const d4 = arah(a1, a2, b2)

  return ((d1 > 0) !== (d2 > 0)) && ((d3 > 0) !== (d4 > 0))
}

export default function KubusPutar({
  sudut,
  onUbah,
}: {
  sudut: Sudut
  /** dipanggil saat siswa menarik gambarnya */
  onUbah: (s: Sudut) => void
}) {
  const seret = useRef<{ x: number; y: number; awal: Sudut } | null>(null)

  const kam = kamera(BOLA, sudut)
  const titik = BANGUN.titik
  const layar = Object.fromEntries(
    Object.entries(titik).map(([n, p]) => [n, kam.layar(p)]),
  ) as Record<string, { x: number; y: number }>

  const terhalang = rusukTerhalang(BANGUN, kam)

  // Sisi digambar dari yang paling jauh, supaya yang dekat menutupinya. Untuk
  // benda cembung urutan ini sudah cukup, tidak perlu pemilahan yang rumit.
  const sisiTerurut = [...BANGUN.sisi]
    .map((s) => {
      const p = s.titik.map((n) => titik[n]) as Titik3[]
      const tengah: Titik3 = [
        p.reduce((j, q) => j + q[0], 0) / p.length,
        p.reduce((j, q) => j + q[1], 0) / p.length,
        p.reduce((j, q) => j + q[2], 0) / p.length,
      ]
      return { ...s, dekat: kam.dekat(tengah), menghadap: sisiMenghadap(p, kam) }
    })
    .sort((a, b) => a.dekat - b.dekat)

  const a1 = layar[RUAS_ALAS[0]], a2 = layar[RUAS_ALAS[1]]
  const b1 = layar[RUAS_TUTUP[0]], b2 = layar[RUAS_TUTUP[1]]
  const tampakPotong = ruasBerpotongan(a1, a2, b1, b2)

  const jarakAsli = jarakDuaGaris(
    titik[RUAS_ALAS[0]], titik[RUAS_ALAS[1]],
    titik[RUAS_TUTUP[0]], titik[RUAS_TUTUP[1]],
  )
  const letak = kedudukanDuaGaris(
    titik[RUAS_ALAS[0]], titik[RUAS_ALAS[1]],
    titik[RUAS_TUTUP[0]], titik[RUAS_TUTUP[1]],
  )

  // Label huruf didorong menjauhi pusat gambar supaya tidak menempel pada
  // rusuknya sendiri. Huruf yang menumpuk garis adalah cacat yang persis
  // dilarang aturan proyek.
  const pusatLayar = kam.layar(BOLA.pusat)
  const labelTitik = (nama: string) => {
    const p = layar[nama]
    const dx = p.x - pusatLayar.x
    const dy = p.y - pusatLayar.y
    const jauh = Math.hypot(dx, dy) || 1
    return { x: p.x + (dx / jauh) * 13, y: p.y + (dy / jauh) * 13 + 3.5 }
  }

  function mulai(e: React.PointerEvent<SVGSVGElement>) {
    e.currentTarget.setPointerCapture(e.pointerId)
    seret.current = { x: e.clientX, y: e.clientY, awal: sudut }
  }

  function gerak(e: React.PointerEvent<SVGSVGElement>) {
    const s = seret.current
    if (!s) return
    onUbah({
      mendatar: s.awal.mendatar - (e.clientX - s.x) * KEPEKAAN,
      menunduk: jepitMenunduk(s.awal.menunduk + (e.clientY - s.y) * KEPEKAAN),
    })
  }

  function selesai(e: React.PointerEvent<SVGSVGElement>) {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    seret.current = null
  }

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={
        `Kubus ABCD.EFGH rusuk ${RUSUK} satuan, bisa diputar. Ruas BD pada alas dan ruas EG pada tutup ` +
        `${tampakPotong ? 'terlihat berpotongan di gambar' : 'terlihat terpisah di gambar'}, ` +
        `padahal keduanya bersilangan dengan jarak ${bulat(jarakAsli)} satuan.`
      }
      /* `userSelect: none` bukan hiasan: tanpa itu, menarik kubus ikut menyorot
         huruf A sampai H dan seluruh keterangannya menjadi biru, sehingga
         gambarnya tampak rusak saat sedang dipakai. Tertangkap saat memeriksa
         potret layar, bukan dari log. */
      style={{
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: seret.current ? 'grabbing' : 'grab',
      }}
      onPointerDown={mulai}
      onPointerMove={gerak}
      onPointerUp={selesai}
      onPointerCancel={selesai}
    >
      {/* ---------- sisi kubus, tembus pandang ---------- */}
      {sisiTerurut.map((s) => (
        <polygon
          key={s.nama}
          points={s.titik.map((n) => `${layar[n].x},${layar[n].y}`).join(' ')}
          fill={s.menghadap ? WARNA.samping : WARNA.redup}
          opacity={s.menghadap ? 0.1 : 0.05}
          stroke="none"
        />
      ))}

      {/* ---------- rusuk. Yang terhalang digambar putus putus ---------- */}
      {BANGUN.rusuk.map(([a, b]) => {
        const sembunyi = terhalang.has(kunciRusuk(a, b))
        return (
          <line
            key={`${a}${b}`}
            x1={layar[a].x} y1={layar[a].y} x2={layar[b].x} y2={layar[b].y}
            stroke={WARNA.miring}
            strokeWidth={sembunyi ? 1.2 : 2}
            strokeDasharray={sembunyi ? '5 4' : undefined}
            opacity={sembunyi ? 0.45 : 1}
            strokeLinecap="round"
          />
        )
      })}

      {/* ---------- dua ruas yang disorot ---------- */}
      <line x1={a1.x} y1={a1.y} x2={a2.x} y2={a2.y}
            stroke={WARNA.samping} strokeWidth={3.6} strokeLinecap="round" />
      <line x1={b1.x} y1={b1.y} x2={b2.x} y2={b2.y}
            stroke={WARNA.depan} strokeWidth={3.6} strokeLinecap="round" />

      {/* ---------- titik sudut dan hurufnya ---------- */}
      {Object.keys(titik).map((n) => (
        <circle key={n} cx={layar[n].x} cy={layar[n].y} r={3.2}
                fill={WARNA.miring} stroke="var(--kartu)" strokeWidth={1.5} />
      ))}
      {Object.keys(titik).map((n) => {
        const p = labelTitik(n)
        return (
          <text key={`l${n}`} x={p.x} y={p.y} textAnchor="middle"
                fontSize={12} fontFamily={MONO} fill={WARNA.redup}>
            {n}
          </text>
        )
      })}

      {/* ---------- keterangan hidup ----------

          Tata letaknya diperbaiki setelah potret layar pertama: baris
          "sebenarnya" dan penunjuk skala tadinya sama-sama di baris paling
          bawah dan saling bertindih. Sekarang baris paling bawah dipakai
          sendirian, dan yang pendek-pendek naik satu baris. */}
      <text x={KOTAK.x0} y={KOTAK.y0 - 8} fontSize={11.5} fontFamily={MONO} fill={WARNA.miring}>
        kubus ABCD.EFGH, rusuk {RUSUK} satuan
      </text>
      <text x={KOTAK.x1} y={KOTAK.y0 - 8} textAnchor="end" fontSize={9.5}
            fontFamily={MONO} fill={WARNA.redup}>
        putar {bulat(kam.sudut.mendatar, 0)}° · tinggi mata {bulat(kam.sudut.menunduk, 0)}°
        {kam.sudut.menunduk >= BATAS_MENUNDUK.maks ? ' (batas)' : ''}
      </text>

      <text x={KOTAK.x0} y={VH - 21} fontSize={12} fontFamily={MONO}
            fill={tampakPotong ? WARNA.depan : WARNA.redup}>
        di gambar: {tampakPotong ? 'tampak berpotongan' : 'tampak terpisah'}
      </text>
      {/* penunjuk skala, wajib menurut aturan proyek */}
      <text x={KOTAK.x1} y={VH - 21} textAnchor="end" fontSize={9.5}
            fontFamily={MONO} fill={WARNA.redup}>
        {kam.labelSkala}
      </text>
      <text x={KOTAK.x0} y={VH - 6} fontSize={12} fontFamily={MONO} fill={WARNA.sudut}>
        sebenarnya: BD dan EG {letak}, jaraknya {bulat(jarakAsli)} satuan
      </text>
    </svg>
  )
}
