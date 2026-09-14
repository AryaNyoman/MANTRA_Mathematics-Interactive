import { WARNA } from '@/lib/warna'
import { LEBAR, MONO, angka } from './dasar'

type Titik = [number, number]

/**
 * Segitiga sembarang yang "dicabut" dari bangun ruang atau dari soal cerita,
 * digambar datar dengan nama titik dan panjang tiap sisi (gambar bantu ala
 * mathcyber1997, 14 Sep 2026). Bentuknya DIHITUNG dari ketiga panjang lewat
 * aturan kosinus, jadi segitiga 3-4-5 benar-benar siku-siku di gambar dan
 * segitiga sama kaki benar-benar sama kaki. Titik pertama kiri bawah, kedua
 * kanan bawah, ketiga di atas. Sisi yang dicari diberi "?" lewat `sisi`.
 */
export default function SegitigaUmum({
  titik, panjang, sisi, siku, tinggi, sorot, sudut = [],
}: {
  titik: [string, string, string]
  panjang: [number, number, number]
  sisi?: [string, string, string]
  siku?: 0 | 1 | 2
  tinggi?: { dari: 0 | 1 | 2; label?: string; kaki?: string }
  sorot?: 0 | 1 | 2 | 'tinggi'
  sudut?: { di: 0 | 1 | 2; label: string }[]
}) {
  const TINGGI = 250
  const [p0, p1, p2] = panjang.map((p) => (p > 0 ? p : 1)) as [number, number, number]
  // sudut di titik pertama, diapit sisi p0 (ke titik kedua) dan p2 (ke titik ketiga)
  const cosA = Math.max(-0.999, Math.min(0.999, (p0 * p0 + p2 * p2 - p1 * p1) / (2 * p0 * p2)))
  const A = Math.acos(cosA)
  const mentah: Titik[] = [[0, 0], [p0, 0], [p2 * Math.cos(A), p2 * Math.sin(A)]]

  // garis tinggi: kaki = proyeksi titik `dari` pada garis sisi di hadapannya
  let kakiMentah: Titik | null = null
  if (tinggi) {
    const V = mentah[tinggi.dari]!
    const U = mentah[(tinggi.dari + 1) % 3]!
    const W = mentah[(tinggi.dari + 2) % 3]!
    const dx = W[0] - U[0], dy = W[1] - U[1]
    const t = ((V[0] - U[0]) * dx + (V[1] - U[1]) * dy) / (dx * dx + dy * dy)
    kakiMentah = [U[0] + t * dx, U[1] + t * dy]
  }

  // pas ke kotak gambar; tepi lebar untuk nama titik dan label sisi
  const semua = kakiMentah ? [...mentah, kakiMentah] : mentah
  const xs = semua.map((p) => p[0]), ys = semua.map((p) => p[1])
  const xMin = Math.min(...xs), xMaks = Math.max(...xs), yMin = Math.min(...ys), yMaks = Math.max(...ys)
  // kotak 330 x 176 satuan; sisanya tepi untuk nama titik dan label sisi
  const s = Math.min(330 / Math.max(xMaks - xMin, 1e-6), 176 / Math.max(yMaks - yMin, 1e-6))
  // pusat kotak batas segitiga ditaruh di tengah kanvas (230, 125)
  const ox = LEBAR / 2 - ((xMin + xMaks) / 2) * s
  const oy = 125 + ((yMin + yMaks) / 2) * s
  const P = (p: Titik): Titik => [ox + p[0] * s, oy - p[1] * s]
  const T = mentah.map(P) as [Titik, Titik, Titik]
  const kaki = kakiMentah ? P(kakiMentah) : null
  const pusat: Titik = [(T[0][0] + T[1][0] + T[2][0]) / 3, (T[0][1] + T[1][1] + T[2][1]) / 3]

  const jauh = (q: Titik, jarak: number): Titik => {
    const dx = q[0] - pusat[0], dy = q[1] - pusat[1]
    const n = Math.hypot(dx, dy) || 1
    return [q[0] + (dx / n) * jarak, q[1] + (dy / n) * jarak]
  }
  const tengah = (a: Titik, b: Titik): Titik => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  const sisiPasangan: [number, number][] = [[0, 1], [1, 2], [2, 0]]
  const labelSisi = sisi ?? (panjang.map((p) => angka(p)) as [string, string, string])

  const tandaSiku = (V: Titik, U: Titik, W: Titik, ukuran = 11) => {
    const u = satuan(V, U), w = satuan(V, W)
    const a: Titik = [V[0] + u[0] * ukuran, V[1] + u[1] * ukuran]
    const b: Titik = [a[0] + w[0] * ukuran, a[1] + w[1] * ukuran]
    const c: Titik = [V[0] + w[0] * ukuran, V[1] + w[1] * ukuran]
    return <polyline points={`${a[0]},${a[1]} ${b[0]},${b[1]} ${c[0]},${c[1]}`} fill="none" stroke={WARNA.redup} strokeWidth={1.3} />
  }

  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Segitiga ${titik.join('')} dengan sisi ${labelSisi.join(', ')}`}>
      <polygon points={T.map((q) => `${q[0]},${q[1]}`).join(' ')} fill="rgba(58, 110, 165, 0.07)" stroke="none" />
      {sisiPasangan.map(([i, j], k) => {
        const aktif = sorot === k
        return (
          <line key={`s${k}`} x1={T[i]![0]} y1={T[i]![1]} x2={T[j]![0]} y2={T[j]![1]}
                stroke={aktif ? WARNA.depan : WARNA.miring} strokeWidth={aktif ? 3.2 : 2} />
        )
      })}
      {siku !== undefined && tandaSiku(T[siku], T[(siku + 1) % 3]!, T[(siku + 2) % 3]!)}
      {tinggi && kaki && (() => {
        const V = T[tinggi.dari]
        const U = T[(tinggi.dari + 1) % 3]!, W = T[(tinggi.dari + 2) % 3]!
        const aktif = sorot === 'tinggi'
        // kaki di luar sisi (segitiga tumpul): sisi diperpanjang putus-putus
        const diLuar = ((kaki[0] - U[0]) * (kaki[0] - W[0]) + (kaki[1] - U[1]) * (kaki[1] - W[1])) > 0
        const dekat = Math.hypot(kaki[0] - U[0], kaki[1] - U[1]) < Math.hypot(kaki[0] - W[0], kaki[1] - W[1]) ? U : W
        const tengahTinggi = tengah(V, kaki)
        const arah = satuan(V, kaki)
        // label garis tinggi ditaruh di sisi ujung alas yang lebih jauh dari
        // kaki, supaya tidak menindih label sisi pendek di sebelahnya
        const jauhU = Math.hypot(kaki[0] - U[0], kaki[1] - U[1]) > Math.hypot(kaki[0] - W[0], kaki[1] - W[1])
        const keJauh: Titik = jauhU ? [U[0] - kaki[0], U[1] - kaki[1]] : [W[0] - kaki[0], W[1] - kaki[1]]
        const tanda = (keJauh[0] * arah[1] - keJauh[1] * arah[0]) >= 0 ? 1 : -1
        return (
          <g>
            {diLuar && <line x1={dekat[0]} y1={dekat[1]} x2={kaki[0]} y2={kaki[1]} stroke={WARNA.redup} strokeWidth={1.2} strokeDasharray="3 3" />}
            <line x1={V[0]} y1={V[1]} x2={kaki[0]} y2={kaki[1]} stroke={aktif ? WARNA.depan : WARNA.sudut}
                  strokeWidth={aktif ? 3 : 1.8} strokeDasharray={aktif ? undefined : '5 4'} />
            {tandaSiku(kaki, V, diLuar ? dekat : (dekat === U ? W : U), 9)}
            {tinggi.label && (
              <text x={tengahTinggi[0] + tanda * arah[1] * 13} y={tengahTinggi[1] - tanda * arah[0] * 13 + 4} fontSize={12.5}
                    textAnchor="middle" fill={aktif ? WARNA.depan : WARNA.sudut} fontFamily={MONO}>{tinggi.label}</text>
            )}
            {tinggi.kaki && (() => {
              const q = jauh(kaki, 14)
              return <text x={q[0]} y={q[1] + 4} fontSize={12} textAnchor="middle" fill={WARNA.sudut} fontFamily={MONO}>{tinggi.kaki}</text>
            })()}
            <circle cx={kaki[0]} cy={kaki[1]} r={2.4} fill={WARNA.sudut} />
          </g>
        )
      })()}
      {sudut.map((sd, i) => {
        const V = T[sd.di]
        const U = T[(sd.di + 1) % 3]!, W = T[(sd.di + 2) % 3]!
        const u = satuan(V, U), w = satuan(V, W)
        const r = 22
        const a: Titik = [V[0] + u[0] * r, V[1] + u[1] * r]
        const c: Titik = [V[0] + w[0] * r, V[1] + w[1] * r]
        const silang = u[0] * w[1] - u[1] * w[0]
        const bagi: Titik = [(u[0] + w[0]) / 2, (u[1] + w[1]) / 2]
        const nb = Math.hypot(bagi[0], bagi[1]) || 1
        return (
          <g key={`u${i}`}>
            <path d={`M ${a[0]} ${a[1]} A ${r} ${r} 0 0 ${silang > 0 ? 1 : 0} ${c[0]} ${c[1]}`} fill="none" stroke={WARNA.sudut} strokeWidth={1.6} />
            <text x={V[0] + (bagi[0] / nb) * 34} y={V[1] + (bagi[1] / nb) * 34 + 4} fontSize={12} textAnchor="middle" fill={WARNA.sudut} fontFamily={MONO}>{sd.label}</text>
          </g>
        )
      })}
      {sisiPasangan.map(([i, j], k) => {
        let m = tengah(T[i]!, T[j]!)
        // kaki garis tinggi jatuh dekat tengah sisi: geser label sisi ke arah
        // ujung yang lebih jauh dari kaki supaya tidak menindih nama kakinya
        if (kaki && Math.hypot(kaki[0] - m[0], kaki[1] - m[1]) < 0.25 * Math.hypot(T[j]![0] - T[i]![0], T[j]![1] - T[i]![1])) {
          const jauhDariKaki = Math.hypot(kaki[0] - T[i]![0], kaki[1] - T[i]![1]) > Math.hypot(kaki[0] - T[j]![0], kaki[1] - T[j]![1]) ? T[i]! : T[j]!
          m = [m[0] + (jauhDariKaki[0] - m[0]) * 0.5, m[1] + (jauhDariKaki[1] - m[1]) * 0.5]
        }
        const q = jauh(m, 15)
        const aktif = sorot === k
        return (
          <text key={`l${k}`} x={q[0]} y={q[1] + 4} fontSize={12.5} textAnchor="middle" fontWeight={aktif ? 700 : 400}
                fill={aktif ? WARNA.depan : WARNA.samping} fontFamily={MONO}>{labelSisi[k]}</text>
        )
      })}
      {T.map((q, i) => {
        const n = jauh(q, 16)
        return (
          <g key={`t${i}`}>
            <circle cx={q[0]} cy={q[1]} r={2.8} fill={WARNA.miring} />
            <text x={n[0]} y={n[1] + 4.5} fontSize={13} textAnchor="middle" fill={WARNA.miring} fontFamily={MONO}>{titik[i]}</text>
          </g>
        )
      })}
    </svg>
  )
}

function satuan(dari: Titik, ke: Titik): Titik {
  const dx = ke[0] - dari[0], dy = ke[1] - dari[1]
  const n = Math.hypot(dx, dy) || 1
  return [dx / n, dy / n]
}
