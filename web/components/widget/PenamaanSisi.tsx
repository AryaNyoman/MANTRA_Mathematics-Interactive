'use client'

import { WARNA } from '@/lib/warna'

/**
 * Widget "Penamaan Sisi", Trigonometri tahap 3.
 *
 * Melawan kekeliruan yang paling sering dan paling sering luput: nama sisi
 * dikira melekat pada garisnya ("yang tegak itu sisi depan"). Padahal nama
 * ditentukan oleh SUDUT yang sedang dirujuk.
 *
 * Siswa mengklik salah satu dari dua sudut lancip. Segitiganya tidak bergerak
 * sedikit pun, hanya namanya yang bertukar. Itu justru intinya: yang berubah
 * bukan gambarnya, tapi dari mana kita memandang.
 */

const VW = 460
const VH = 300

// Titik segitiga: siku-siku di B. Tetap, tidak pernah berpindah.
const A = { x: 62, y: 244 }   // sudut lancip kiri bawah
const B = { x: 366, y: 244 }  // sudut siku-siku
const C = { x: 366, y: 66 }   // sudut lancip kanan atas

export type SudutAktif = 'A' | 'C'


/** Tombol sudut. Didefinisikan DI LUAR render, kalau di dalam, React membuat
 *  komponen baru tiap render dan state-nya ikut ter-reset. */
function TombolSudut({
  id, cx, cy, aktif, onPilih,
}: {
  id: SudutAktif; cx: number; cy: number; aktif: boolean
  onPilih: (s: SudutAktif) => void
}) {
  return (
    <g
      onClick={() => onPilih(id)}
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      aria-label={`Lihat dari sudut ${id}`}
      aria-pressed={aktif}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPilih(id) } }}
    >
      <circle cx={cx} cy={cy} r={19} fill="transparent" />
      <circle
        cx={cx} cy={cy} r={11}
        fill={aktif ? WARNA.sudut : 'var(--kartu)'}
        stroke={aktif ? WARNA.sudut : 'var(--garis, #E1D9CC)'}
        strokeWidth={2}
      />
      <text
        x={cx} y={cy + 4} textAnchor="middle" fontSize={12} fontWeight={600}
        fill={aktif ? '#FFFDFA' : '#7C7469'}
        fontFamily="var(--font-mono), sans-serif"
        style={{ pointerEvents: 'none' }}
      >
        {id}
      </text>
    </g>
  )
}

export default function PenamaanSisi({
  aktif,
  onPilih,
}: {
  aktif: SudutAktif
  onPilih: (s: SudutAktif) => void
}) {
  // Dilihat dari A: depan = BC (tegak), samping = AB (alas)
  // Dilihat dari C: depan = AB (alas), samping = BC (tegak)
  const dariA = aktif === 'A'
  const warnaAlas = dariA ? WARNA.samping : WARNA.depan
  const warnaTegak = dariA ? WARNA.depan : WARNA.samping
  const namaAlas = dariA ? 'sisi samping' : 'sisi depan'
  const namaTegak = dariA ? 'sisi depan' : 'sisi samping'

  const rBusur = 42
  // arah busur: dari A menghadap ke kanan-atas; dari C menghadap ke kiri-bawah
  const busur = dariA
    ? `M ${A.x + rBusur} ${A.y} A ${rBusur} ${rBusur} 0 0 0 ${A.x + rBusur * 0.86} ${A.y - rBusur * 0.5}`
    : `M ${C.x} ${C.y + rBusur} A ${rBusur} ${rBusur} 0 0 0 ${C.x - rBusur * 0.86} ${C.y + rBusur * 0.5}`


  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Segitiga siku-siku, sedang dilihat dari sudut ${aktif}`}>
      {/* sisi-sisi */}
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={warnaAlas} strokeWidth={4} strokeLinecap="round" />
      <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke={warnaTegak} strokeWidth={4} strokeLinecap="round" />
      <line x1={C.x} y1={C.y} x2={A.x} y2={A.y} stroke={WARNA.miring} strokeWidth={4} strokeLinecap="round" />

      {/* tanda siku-siku, di dalam segitiga */}
      <path d={`M ${B.x - 15} ${B.y} L ${B.x - 15} ${B.y - 15} L ${B.x} ${B.y - 15}`}
            fill="none" stroke={WARNA.redup} strokeWidth={2} />

      {/* busur sudut yang sedang dilihat */}
      <path d={busur} fill="none" stroke={WARNA.sudut} strokeWidth={3} />

      {/* nama sisi */}
      <text x={(A.x + B.x) / 2} y={B.y + 26} textAnchor="middle" fontSize={16} fill={warnaAlas}
            fontFamily="var(--font-sans), sans-serif">{namaAlas}</text>
      <text x={B.x + 12} y={(B.y + C.y) / 2} fontSize={16} fill={warnaTegak}
            fontFamily="var(--font-sans), sans-serif">{namaTegak}</text>
      {/* digeser tegak lurus terhadap sisi miring supaya tidak menindih garisnya */}
      <text x={(A.x + C.x) / 2 - 14} y={(A.y + C.y) / 2 - 22} textAnchor="middle"
            fontSize={16} fill={WARNA.miring}
            fontFamily="var(--font-sans), sans-serif">sisi miring</text>

      {/* label titik sudut */}
      <text x={B.x + 14} y={B.y + 6} fontSize={13} fill="#7C7469"
            fontFamily="var(--font-mono), sans-serif">B</text>

      {/* dua sudut lancip yang bisa diklik */}
      <TombolSudut id="A" cx={A.x} cy={A.y} aktif={aktif === 'A'} onPilih={onPilih} />
      <TombolSudut id="C" cx={C.x} cy={C.y} aktif={aktif === 'C'} onPilih={onPilih} />

      <text x={VW / 2} y={VH - 10} textAnchor="middle" fontSize={11} fill="#7C7469"
            fontFamily="var(--font-mono), sans-serif">
        klik sudut A atau C
      </text>
    </svg>
  )
}
