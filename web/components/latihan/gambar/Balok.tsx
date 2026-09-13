import { WARNA } from '@/lib/warna'
import { LEBAR, MONO } from './dasar'

/**
 * Balok (atau kubus) dalam proyeksi miring: rusuk depan tegak lurus, rusuk
 * ke belakang menyerong 35 derajat dengan panjang separuh (proyeksi
 * kabinet, seperti buku pelajaran). Rusuk yang tersembunyi putus-putus.
 * Nama titik: A B C D alas dari kiri depan berlawanan jarum jam (dilihat
 * dari atas), E F G H tepat di atasnya. Titik tambahan diberi lewat pecahan
 * (px, py, pz) dalam 0 sampai 1 dari panjang, lebar, tinggi.
 */
export default function Balok({
  ukuran, titik = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], ruas = [], tambahan = [], bidang = [],
}: {
  ukuran: [number, number, number]
  titik?: string[]
  ruas?: [string, string][]
  tambahan?: { nama: string; di: [number, number, number] }[]
  bidang?: string[]
}) {
  const TINGGI = 270
  const [p, l, t] = ukuran
  const K = 0.5, TH = (35 * Math.PI) / 180
  // skala supaya lebar total (p + l*K*cos) dan tinggi (t + l*K*sin) muat
  const lebarTotal = p + l * K * Math.cos(TH)
  const tinggiTotal = t + l * K * Math.sin(TH)
  const s = Math.min(300 / lebarTotal, 190 / tinggiTotal)
  const ox = (LEBAR - lebarTotal * s) / 2
  const oy = 30 + tinggiTotal * s
  const proyeksi = (x: number, y: number, z: number): [number, number] => [
    ox + (x + y * K * Math.cos(TH)) * s,
    oy - (z + y * K * Math.sin(TH)) * s,
  ]
  const sudut: Record<string, [number, number]> = {}
  const koor: [number, number, number][] = [
    [0, 0, 0], [p, 0, 0], [p, l, 0], [0, l, 0],
    [0, 0, t], [p, 0, t], [p, l, t], [0, l, t],
  ]
  titik.forEach((nama, i) => { sudut[nama] = proyeksi(...koor[i]!) })
  for (const tb of tambahan) sudut[tb.nama] = proyeksi(tb.di[0] * p, tb.di[1] * l, tb.di[2] * t)
  const [A, B, C, D, E, F, G, H] = titik
  const tampak: [string, string][] = [[A!, B!], [B!, C!], [B!, F!], [A!, E!], [C!, G!], [E!, F!], [F!, G!], [G!, H!], [H!, E!]]
  const tersembunyi: [string, string][] = [[A!, D!], [D!, C!], [D!, H!]]
  // arah label: menjauh dari pusat gambar
  const pusat = proyeksi(p / 2, l / 2, t / 2)
  const label = (nama: string) => {
    const [x, y] = sudut[nama]!
    const dx = x - pusat[0], dy = y - pusat[1]
    const n = Math.hypot(dx, dy) || 1
    return { x: x + (dx / n) * 13, y: y + (dy / n) * 13 + 4 }
  }
  const garis = (pasangan: [string, string], putus: boolean, key: string) => {
    const a = sudut[pasangan[0]], b = sudut[pasangan[1]]
    if (!a || !b) return null
    return <line key={key} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={WARNA.miring} strokeWidth={1.6} strokeDasharray={putus ? '5 4' : undefined} />
  }
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Balok ${titik.slice(0, 8).join('')} berukuran ${p} kali ${l} kali ${t}`}>
      {bidang.length >= 3 && (
        <polygon points={bidang.map((n) => sudut[n]).filter(Boolean).map((q) => `${q![0]},${q![1]}`).join(' ')}
                 fill="rgba(106, 76, 147, 0.18)" stroke={WARNA.sudut} strokeWidth={1.2} />
      )}
      {tersembunyi.map((ps, i) => garis(ps, true, `s${i}`))}
      {tampak.map((ps, i) => garis(ps, false, `t${i}`))}
      {ruas.map((ps, i) => {
        const a = sudut[ps[0]], b = sudut[ps[1]]
        return a && b ? <line key={`r${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={WARNA.depan} strokeWidth={2.8} /> : null
      })}
      {Object.keys(sudut).map((nama) => {
        const q = sudut[nama]!
        const lb = label(nama)
        const ekstra = tambahan.some((tb) => tb.nama === nama)
        return (
          <g key={nama}>
            <circle cx={q[0]} cy={q[1]} r={ekstra ? 3.6 : 2.6} fill={ekstra ? WARNA.depan : WARNA.miring} />
            <text x={lb.x} y={lb.y} fontSize={12} textAnchor="middle" fill={ekstra ? WARNA.depan : WARNA.miring} fontFamily={MONO}>{nama}</text>
          </g>
        )
      })}
      <text x={(sudut[A!]![0] + sudut[B!]![0]) / 2} y={sudut[A!]![1] + 26} fontSize={10.5} textAnchor="middle" fill={WARNA.samping} fontFamily={MONO}>{p}</text>
      <text x={sudut[B!]![0] + 14} y={(sudut[B!]![1] + sudut[F!]![1]) / 2 + 4} fontSize={10.5} fill={WARNA.depan} fontFamily={MONO}>{t}</text>
      <text x={(sudut[B!]![0] + sudut[C!]![0]) / 2 + 12} y={(sudut[B!]![1] + sudut[C!]![1]) / 2 + 12} fontSize={10.5} fill={WARNA.sudut} fontFamily={MONO}>{l}</text>
    </svg>
  )
}
