/**
 * Latar matematis tiap kartu latihan (ARYA 13 Sep 2026): motif SVG halus
 * khas babnya di belakang isi kartu. Warna emas atau navy dengan opasitas
 * rendah (diatur CSS `.latar-bab`), tanpa gerak: aturan gerak v2 melarang
 * animasi tanpa alasan. Semua motif memakai viewBox yang sama dan
 * `preserveAspectRatio="xMidYMid slice"` supaya memenuhi kartu apa pun
 * ukurannya.
 */
const EMAS = '#B08A3E'
const NAVY = '#101A2B'

function jalurSinus(amp: number, periode: number, y0: number, x0 = 0, x1 = 400) {
  const bagian: string[] = []
  for (let x = x0; x <= x1; x += 6) {
    const y = y0 - amp * Math.sin(((x - x0) / periode) * 2 * Math.PI)
    bagian.push(`${bagian.length ? 'L' : 'M'} ${x} ${y.toFixed(1)}`)
  }
  return bagian.join(' ')
}

function jalurFungsi(f: (x: number) => number, x0: number, x1: number, sx: number, sy: number, ox: number, oy: number) {
  const bagian: string[] = []
  for (let x = x0; x <= x1; x += (x1 - x0) / 80) {
    const y = f(x)
    if (!Number.isFinite(y)) continue
    bagian.push(`${bagian.length ? 'L' : 'M'} ${(ox + x * sx).toFixed(1)} ${(oy - y * sy).toFixed(1)}`)
  }
  return bagian.join(' ')
}

const MOTIF: Record<string, React.ReactNode> = {
  trigonometri: (
    <g fill="none" stroke={EMAS} strokeWidth={1.6}>
      <circle cx={70} cy={100} r={54} />
      <line x1={70} y1={100} x2={116} y2={72} />
      <line x1={116} y1={100} x2={116} y2={72} />
      <path d={`M 88 100 A 18 18 0 0 0 ${70 + 18 * Math.cos(0.55)} ${100 - 18 * Math.sin(0.55)}`} />
      <path d={jalurSinus(28, 150, 100, 140, 420)} />
      <line x1={140} y1={100} x2={420} y2={100} strokeWidth={0.8} />
    </g>
  ),
  vektor: (
    <g fill="none" stroke={NAVY} strokeWidth={1.6}>
      {[[40, 150, 150, 90], [150, 90, 230, 40], [40, 150, 230, 40], [260, 140, 380, 60], [260, 140, 380, 140], [380, 140, 380, 60]].map(([a, b, c, d], i) => (
        <g key={i}>
          <line x1={a} y1={b} x2={c} y2={d} strokeDasharray={i >= 4 ? '5 4' : undefined} />
          {i < 4 && <path d={`M ${c} ${d} l -9 -3 m 9 3 l -6 8`} />}
        </g>
      ))}
    </g>
  ),
  'grafik-fungsi': (
    <g fill="none" stroke={EMAS} strokeWidth={1.6}>
      <line x1={30} y1={140} x2={410} y2={140} strokeWidth={0.8} />
      <line x1={120} y1={20} x2={120} y2={180} strokeWidth={0.8} />
      <path d={jalurFungsi((x) => 0.05 * x * x, -60, 90, 1, 1, 120, 140)} />
      <path d={jalurFungsi((x) => 0.05 * (x - 120) * (x - 120) - 50, 60, 260, 1, 1, 120, 140)} strokeDasharray="6 5" />
      <path d={jalurFungsi((x) => Math.abs(x - 200) * 0.8 - 20, 130, 300, 1, 1, 120, 140)} />
    </g>
  ),
  statistika: (
    <g fill="none" stroke={NAVY} strokeWidth={1.6}>
      {[60, 110, 85, 140, 120, 165, 95].map((h, i) => (
        <rect key={i} x={40 + i * 46} y={180 - h} width={30} height={h} />
      ))}
      <path d="M 55 130 L 101 80 L 147 100 L 193 55 L 239 70 L 285 30 L 331 60" strokeDasharray="5 4" />
    </g>
  ),
  'transformasi-geometri': (
    <g fill="none" stroke={EMAS} strokeWidth={1.6}>
      <line x1={220} y1={10} x2={220} y2={190} strokeDasharray="6 5" strokeWidth={0.9} />
      <polygon points="60,150 170,150 140,60" />
      <polygon points="380,150 270,150 300,60" strokeDasharray="5 4" />
      <polygon points="90,40 130,40 130,20 90,20" transform="rotate(-25 110 30)" />
      <polygon points="330,45 370,45 370,25 330,25" transform="rotate(25 350 35)" strokeDasharray="4 3" />
    </g>
  ),
  limit: (
    <g fill="none" stroke={NAVY} strokeWidth={1.6}>
      <line x1={30} y1={150} x2={410} y2={150} strokeWidth={0.8} />
      <path d={jalurFungsi((x) => 60 + 40 * Math.tanh((x - 220) / 40), 40, 210, 1, 1, 0, 150)} />
      <path d={jalurFungsi((x) => 60 + 40 * Math.tanh((x - 220) / 40), 230, 400, 1, 1, 0, 150)} />
      <circle cx={220} cy={90} r={5} fill="var(--kartu)" />
      <line x1={220} y1={20} x2={220} y2={180} strokeDasharray="4 4" strokeWidth={0.9} />
      {[150, 175, 195, 245, 265, 290].map((x) => (
        <line key={x} x1={x} y1={146} x2={x} y2={154} strokeWidth={1} />
      ))}
    </g>
  ),
  'ruang-3d': (
    <g fill="none" stroke={EMAS} strokeWidth={1.6}>
      <polygon points="80,60 200,60 200,160 80,160" />
      <polygon points="130,25 250,25 250,125 130,125" />
      <line x1={80} y1={60} x2={130} y2={25} /><line x1={200} y1={60} x2={250} y2={25} />
      <line x1={200} y1={160} x2={250} y2={125} /><line x1={80} y1={160} x2={130} y2={125} strokeDasharray="5 4" />
      <line x1={80} y1={160} x2={250} y2={25} strokeDasharray="5 4" />
      <polygon points="300,140 400,140 350,50" />
      <line x1={350} y1={50} x2={350} y2={140} strokeDasharray="4 3" />
    </g>
  ),
  turunan: (
    <g fill="none" stroke={NAVY} strokeWidth={1.6}>
      <line x1={30} y1={160} x2={410} y2={160} strokeWidth={0.8} />
      <path d={jalurFungsi((x) => 0.0025 * (x - 60) * (x - 60) * ((x - 60) / 120 + 0.3) + 20, 60, 400, 1, 1, 0, 160)} />
      <line x1={130} y1={175} x2={330} y2={55} strokeDasharray="6 5" />
      <circle cx={230} cy={115} r={4} />
      <line x1={230} y1={115} x2={230} y2={160} strokeDasharray="3 3" strokeWidth={0.9} />
    </g>
  ),
  integral: (
    <g fill="none" stroke={EMAS} strokeWidth={1.6}>
      <line x1={30} y1={165} x2={410} y2={165} strokeWidth={0.8} />
      {Array.from({ length: 9 }, (_, i) => {
        const x = 90 + i * 32
        const h = 20 + 0.0018 * (x - 60) * (x - 60)
        return <rect key={i} x={x} y={165 - h} width={32} height={h} strokeWidth={1} />
      })}
      <path d={jalurFungsi((x) => 20 + 0.0018 * (x - 60) * (x - 60), 60, 400, 1, 1, 0, 165)} />
      <text x={40} y={70} fontSize={54} fill={EMAS} stroke="none" fontFamily="Georgia, serif" fontStyle="italic">∫</text>
    </g>
  ),
}

export default function LatarBab({ slug }: { slug: string }) {
  const motif = MOTIF[slug]
  if (!motif) return null
  return (
    <svg className="latar-bab" viewBox="0 0 440 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {motif}
    </svg>
  )
}
