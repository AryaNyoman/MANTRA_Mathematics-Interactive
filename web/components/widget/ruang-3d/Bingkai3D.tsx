'use client'

import { useRef, useState, type ReactNode } from 'react'
import {
  BATAS_MENUNDUK, KOTAK, MONO, VH, VW, WARNA,
  bolaMuat, bulat, jepitMenunduk, kamera, kunciRusuk, rusukTerhalang, sisiMenghadap,
  type Bangun, type Kamera, type Sudut, type Titik3,
} from '@/components/widget/ruang-3d/ruang'

/**
 * Bingkai gambar ruang yang dipakai bersama SEMUA widget Ruang 3D.
 *
 * Sejajar dengan `widget/limit/Bidang.tsx`. Ia menggambar bagian yang sama di
 * setiap widget: sisi tembus pandang, rusuk (yang terhalang jadi putus putus),
 * titik sudut beserta hurufnya, penunjuk skala, dan sudut pandang sekarang.
 * Ia juga yang menangani tarikan jari.
 *
 * Isi khusus tiap widget masuk lewat `children`, yang menerima kameranya dan
 * daftar titik yang sudah dipetakan ke layar, jadi widget cukup menggambar
 * ruas atau bidang tambahannya tanpa mengurus proyeksi lagi.
 *
 * KENAPA DIPISAH. Delapan widget menggambar kubus yang sama. Kalau kodenya
 * disalin delapan kali, cepat atau lambat salah satunya lupa menggambar rusuk
 * terhalang sebagai garis putus putus, dan gambar itu berbohong tentang benda
 * yang justru sedang diajarkan.
 */

export type Layar = Record<string, { x: number; y: number }>

/** Seberapa cepat kubus berputar mengikuti tarikan, dalam derajat per piksel.
 *  Semula 0,42 (satu putaran penuh tiap 860 px); diturunkan ke 0,3 (satu
 *  putaran tiap 1.200 px) atas permintaan ARYA 16 Sep 2026: "atur
 *  sensitivitasnya pelan-pelan saja". Diukur: tarikan 60 px kini memutar 18
 *  derajat, rusuk kubus bergeser belasan piksel. */
const KEPEKAAN = 0.3

export default function Bingkai3D({
  bangun,
  sudut,
  onUbah,
  keterangan,
  bawah,
  warnaBawah,
  titikBantu,
  gaya,
  aria,
  children,
}: {
  bangun: Bangun
  sudut: Sudut
  /** kalau kosong, gambarnya tidak bisa ditarik */
  onUbah?: (s: Sudut) => void
  /** tulisan kecil di kiri atas */
  keterangan?: string
  /** satu baris kesimpulan di kiri bawah */
  bawah?: string
  warnaBawah?: string
  /** titik di luar titik sudut bangunnya, misalnya kaki tegak lurus */
  titikBantu?: Record<string, Titik3>
  /**
   * Gaya tambahan untuk elemen SVG-nya.
   *
   * Dipakai galeri tahap 10. Di dalam panggung utama, tinggi SVG diatur CSS
   * bersama lewat kelas `.layar`. Di galeri tidak ada kelas itu, sehingga
   * tingginya perlu disebut sendiri; tanpa itu keterangan di baris paling atas
   * terpotong tepi kartu. (Cacat yang tertangkap dari potret layar.)
   */
  gaya?: React.CSSProperties
  aria: string
  children?: (kam: Kamera, layar: Layar) => ReactNode
}) {
  const seret = useRef<{ x: number; y: number; awal: Sudut } | null>(null)
  /* Kursor ikut berubah saat gambar sedang ditarik. Nilai ini WAJIB state,
     bukan ref: ref tidak memicu gambar ulang, jadi kursornya akan tertinggal
     di bentuk lama. Ditemukan eslint react-hooks/refs, 2 Sep. */
  const [sedangTarik, setSedangTarik] = useState(false)

  const semua: Record<string, Titik3> = { ...bangun.titik, ...(titikBantu ?? {}) }
  const bola = bolaMuat(Object.values(semua))
  const kam = kamera(bola, sudut)

  const layar: Layar = {}
  for (const [nama, p] of Object.entries(semua)) layar[nama] = kam.layar(p)

  const terhalang = rusukTerhalang(bangun, kam)

  // Sisi digambar dari yang paling jauh, supaya yang dekat menutupinya. Untuk
  // benda cembung urutan ini sudah cukup, tidak perlu pemilahan yang rumit.
  const sisiTerurut = [...bangun.sisi]
    .map((s) => {
      const p = s.titik.map((n) => bangun.titik[n]) as Titik3[]
      const tengah: Titik3 = [
        p.reduce((j, q) => j + q[0], 0) / p.length,
        p.reduce((j, q) => j + q[1], 0) / p.length,
        p.reduce((j, q) => j + q[2], 0) / p.length,
      ]
      return { ...s, dekat: kam.dekat(tengah), menghadap: sisiMenghadap(p, kam) }
    })
    .sort((a, b) => a.dekat - b.dekat)

  // Huruf didorong menjauhi pusat gambar supaya tidak menempel pada rusuknya
  // sendiri. Huruf yang menumpuk garis adalah cacat yang dilarang aturan proyek.
  const pusat = kam.layar(bola.pusat)
  const label = (nama: string) => {
    const p = layar[nama]
    const dx = p.x - pusat.x
    const dy = p.y - pusat.y
    const jauh = Math.hypot(dx, dy) || 1
    return { x: p.x + (dx / jauh) * 13, y: p.y + (dy / jauh) * 13 + 3.5 }
  }

  function mulai(e: React.PointerEvent<SVGSVGElement>) {
    if (!onUbah) return
    e.currentTarget.setPointerCapture(e.pointerId)
    seret.current = { x: e.clientX, y: e.clientY, awal: sudut }
    setSedangTarik(true)
  }

  function gerak(e: React.PointerEvent<SVGSVGElement>) {
    const s = seret.current
    if (!s || !onUbah) return
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
    setSedangTarik(false)
  }

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={aria}
      /* `userSelect: none` bukan hiasan: tanpa itu, menarik kubus ikut menyorot
         huruf A sampai H menjadi biru, sehingga gambarnya tampak rusak saat
         sedang dipakai. Tertangkap saat memeriksa potret layar. */
      style={{
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: onUbah ? (sedangTarik ? 'grabbing' : 'grab') : 'default',
        /* Lencana INTERAKTIF milik rangka panggung menempel di pojok kiri atas
           dan ukurannya TETAP, sedangkan gambar ini menyusut mengikuti lebar
           layar. Di layar HP 375 piksel keduanya bertemu dan lencana menutupi
           baris keterangan. Ruang 18 piksel ini yang mencegahnya, dan karena
           satuannya piksel CSS, besarnya tidak ikut menyusut. Hanya dipasang
           kalau memang ada keterangan di baris atas. */
        marginTop: keterangan ? 18 : 0,
        ...gaya,
      }}
      onPointerDown={mulai}
      onPointerMove={gerak}
      onPointerUp={selesai}
      onPointerCancel={selesai}
    >
      {sisiTerurut.map((s) => (
        <polygon
          key={s.nama}
          points={s.titik.map((n) => `${layar[n].x},${layar[n].y}`).join(' ')}
          fill={s.menghadap ? WARNA.samping : WARNA.redup}
          opacity={s.menghadap ? 0.09 : 0.05}
          stroke="none"
        />
      ))}

      {bangun.rusuk.map(([a, b]) => {
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

      {/* isi khusus widget, digambar DI ATAS kubus */}
      {children?.(kam, layar)}

      {Object.keys(bangun.titik).map((n) => (
        <circle key={n} cx={layar[n].x} cy={layar[n].y} r={3.2}
                fill={WARNA.miring} stroke="var(--kartu)" strokeWidth={1.5} />
      ))}
      {Object.keys(bangun.titik).map((n) => {
        const p = label(n)
        return (
          /* Halo tipis berwarna kartu supaya huruf tetap terbaca saat sebuah
             ruas berwarna kebetulan lewat tepat di belakangnya. Cara yang sama
             sudah dipakai pada label sin dan cos di widget trigonometri. */
          <text key={`l${n}`} x={p.x} y={p.y} textAnchor="middle"
                fontSize={12} fontFamily={MONO} fill={WARNA.redup}
                stroke="var(--kartu)" strokeWidth={3} paintOrder="stroke">
            {n}
          </text>
        )
      })}

      {keterangan && (
        <text x={KOTAK.x0} y={KOTAK.y0 - 8} fontSize={11.5} fontFamily={MONO} fill={WARNA.miring}>
          {keterangan}
        </text>
      )}
      {/* Penunjuk sudut pandang hanya ditampilkan kalau gambarnya memang bisa
          diputar. Pada gambar tetap seperti galeri tahap 10, angka ini tidak
          berguna dan justru bertabrakan dengan keterangan di sebelah kiri.
          (Cacat yang tertangkap saat memeriksa potret layar.) */}
      {onUbah && (
        <text x={KOTAK.x1} y={KOTAK.y0 - 8} textAnchor="end" fontSize={9.5}
              fontFamily={MONO} fill={WARNA.redup}>
          putar {bulat(kam.sudut.mendatar, 0)}° · tinggi mata {bulat(kam.sudut.menunduk, 0)}°
          {kam.sudut.menunduk >= BATAS_MENUNDUK.maks ? ' (batas)' : ''}
        </text>
      )}

      {/* penunjuk skala, wajib menurut aturan proyek */}
      <text x={KOTAK.x1} y={VH - 21} textAnchor="end" fontSize={9.5}
            fontFamily={MONO} fill={WARNA.redup}>
        {kam.labelSkala}
      </text>
      {bawah && (
        <text x={KOTAK.x0} y={VH - 6} fontSize={12} fontFamily={MONO}
              fill={warnaBawah ?? WARNA.sudut}>
          {bawah}
        </text>
      )}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Potongan gambar yang dipakai berkali kali                           */
/* ------------------------------------------------------------------ */

/** Ruas garis berwarna di antara dua titik yang sudah dipetakan ke layar. */
export function Ruas({
  a, b, warna, tebal = 3.4, putus, opacity = 1,
}: {
  a: { x: number; y: number }
  b: { x: number; y: number }
  warna: string
  tebal?: number
  putus?: boolean
  opacity?: number
}) {
  return (
    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={warna} strokeWidth={tebal}
          strokeDasharray={putus ? '6 5' : undefined} strokeLinecap="round"
          opacity={opacity} />
  )
}

/** Segitiga atau segi banyak tembus pandang, untuk menandai sebuah bidang. */
export function Bidang({
  titik, warna, opacity = 0.22,
}: {
  titik: { x: number; y: number }[]
  warna: string
  opacity?: number
}) {
  return (
    <polygon points={titik.map((p) => `${p.x},${p.y}`).join(' ')} fill={warna}
             opacity={opacity} stroke={warna} strokeWidth={1.4} strokeOpacity={0.65} />
  )
}

/**
 * Tanda siku-siku di titik `sudut`, menghadap dua tetangganya.
 *
 * Digambar dari titik sudut itu sendiri, bukan ditempel di dekatnya, supaya
 * letaknya tetap benar berapa pun kubusnya diputar. Tanda siku-siku yang
 * melenceng adalah cacat yang khusus disebut aturan proyek.
 */
export function TandaSiku({
  sudut, ke1, ke2, warna, ukuran = 11,
}: {
  sudut: { x: number; y: number }
  ke1: { x: number; y: number }
  ke2: { x: number; y: number }
  warna: string
  ukuran?: number
}) {
  const satuan = (p: { x: number; y: number }) => {
    const dx = p.x - sudut.x
    const dy = p.y - sudut.y
    const j = Math.hypot(dx, dy) || 1
    return { x: (dx / j) * ukuran, y: (dy / j) * ukuran }
  }
  const u = satuan(ke1)
  const v = satuan(ke2)
  const d = [
    `M ${sudut.x + u.x} ${sudut.y + u.y}`,
    `L ${sudut.x + u.x + v.x} ${sudut.y + u.y + v.y}`,
    `L ${sudut.x + v.x} ${sudut.y + v.y}`,
  ].join(' ')
  return <path d={d} fill="none" stroke={warna} strokeWidth={1.6} opacity={0.9} />
}

/**
 * Busur penanda sudut di titik `sudut`, menghadap dua tetangganya.
 *
 * PERINGATAN JUJUR: gambar ini proyeksi, jadi busur yang terlihat TIDAK sama
 * besar dengan sudut sebenarnya. Karena itu angkanya selalu ditulis, dan
 * busurnya hanya menandai sudut yang mana yang sedang dibicarakan, bukan
 * seberapa besar. Menganggap busur di gambar sebagai ukuran sudut yang benar
 * justru salah paham yang sedang dilawan topik ini.
 */
export function BusurSudut({
  sudut, ke1, ke2, warna, teks, jari = 30,
}: {
  sudut: { x: number; y: number }
  ke1: { x: number; y: number }
  ke2: { x: number; y: number }
  warna: string
  /**
   * Angka sudutnya. Boleh dikosongkan, dan memang perlu dikosongkan saat sudut
   * yang digambar tampak sempit di layar: pada sudut sempit kedua kakinya
   * berdekatan, sehingga angka apa pun yang ditaruh di tengahnya pasti menimpa
   * garisnya sendiri. Angkanya tetap terbaca di baris bawah dan di tabel.
   */
  teks?: string
  jari?: number
}) {
  const arah = (p: { x: number; y: number }) => {
    const dx = p.x - sudut.x
    const dy = p.y - sudut.y
    const j = Math.hypot(dx, dy) || 1
    return { x: dx / j, y: dy / j }
  }
  const u = arah(ke1)
  const v = arah(ke2)

  const a = { x: sudut.x + u.x * jari, y: sudut.y + u.y * jari }
  const b = { x: sudut.x + v.x * jari, y: sudut.y + v.y * jari }
  // arah putarannya ditentukan dari hasil kali silang, supaya busurnya selalu
  // memotong DI DALAM sudut, bukan memutar lewat sisi luarnya
  const silang2 = u.x * v.y - u.y * v.x
  const d = `M ${a.x} ${a.y} A ${jari} ${jari} 0 0 ${silang2 > 0 ? 1 : 0} ${b.x} ${b.y}`

  const tengah = { x: (u.x + v.x) / 2, y: (u.y + v.y) / 2 }
  const jt = Math.hypot(tengah.x, tengah.y) || 1
  const label = {
    x: sudut.x + (tengah.x / jt) * (jari + 15),
    y: sudut.y + (tengah.y / jt) * (jari + 15) + 4,
  }

  return (
    <>
      <path d={d} fill="none" stroke={warna} strokeWidth={1.8} opacity={0.9} />
      {teks && (
        <text x={label.x} y={label.y} textAnchor="middle" fontSize={12.5}
              fontFamily={MONO} fill={warna}
              stroke="var(--kartu)" strokeWidth={3} paintOrder="stroke">
          {teks}
        </text>
      )}
    </>
  )
}

/** Titik bulat bernama, untuk titik bantu seperti kaki tegak lurus. */
export function TitikBantu({
  p, nama, warna,
}: {
  p: { x: number; y: number }
  nama?: string
  warna: string
}) {
  return (
    <>
      <circle cx={p.x} cy={p.y} r={4.6} fill={warna} stroke="var(--kartu)" strokeWidth={1.8} />
      {nama && (
        <text x={p.x + 10} y={p.y + 12} fontSize={11.5} fontFamily={MONO} fill={warna}
              stroke="var(--kartu)" strokeWidth={3} paintOrder="stroke">
          {nama}
        </text>
      )}
    </>
  )
}
