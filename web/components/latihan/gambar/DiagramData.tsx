import { WARNA } from '@/lib/warna'
import { petakSumbu } from '@/lib/petak-sumbu'
import { GARIS_PETAK, GARIS_SUMBU, LEBAR, MONO, angka } from './dasar'

/**
 * Diagram batang atau garis untuk soal statistika. Sumbu tegak mulai dari
 * `mulai` (bawaan 0); kalau soalnya tentang sumbu yang dipotong, `mulai`
 * diisi supaya gambarnya persis seperti yang dibahas.
 */
export default function DiagramData({
  jenis, kategori, nilai, satuan, mulai = 0, sorot = [],
}: {
  jenis: 'batang' | 'garis-data'
  kategori: string[]
  nilai: number[]
  satuan?: string
  mulai?: number
  sorot?: number[]
}) {
  const TINGGI = 260
  const kiri = 48, kanan = LEBAR - 16, atas = 18, bawah = TINGGI - 36
  const maks = Math.max(...nilai)
  const yMaks = maks + (maks - mulai) * 0.12
  const petak = petakSumbu(mulai, yMaks, bawah - atas)
  const Y = (v: number) => bawah - ((v - mulai) / (yMaks - mulai)) * (bawah - atas)
  const n = kategori.length
  const lebarSel = (kanan - kiri) / n
  const lebarBatang = Math.min(lebarSel * 0.62, 56)
  const Xtengah = (i: number) => kiri + lebarSel * (i + 0.5)
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Diagram ${jenis === 'batang' ? 'batang' : 'garis'}: ${kategori.map((k, i) => `${k} ${angka(nilai[i]!)}`).join(', ')}`}>
      {petak.map((p) => (
        <g key={p.nilai}>
          <line x1={kiri} y1={Y(p.nilai)} x2={kanan} y2={Y(p.nilai)} stroke={GARIS_PETAK} strokeWidth={1} />
          <text x={kiri - 6} y={Y(p.nilai) + 3.5} fontSize={9.5} textAnchor="end" fill={GARIS_SUMBU} fontFamily={MONO}>{p.label}</text>
        </g>
      ))}
      <line x1={kiri} y1={atas - 4} x2={kiri} y2={bawah} stroke={GARIS_SUMBU} strokeWidth={1.4} />
      <line x1={kiri} y1={bawah} x2={kanan} y2={bawah} stroke={GARIS_SUMBU} strokeWidth={1.4} />
      {satuan && (
        <text x={kiri + 4} y={atas - 6} fontSize={9.5} fill={GARIS_SUMBU} fontFamily={MONO}>{satuan}</text>
      )}
      {mulai !== 0 && (
        <text x={kiri} y={TINGGI - 4} fontSize={9.5} fill={WARNA.depan} fontFamily={MONO}>sumbu tegak mulai dari {angka(mulai)}, bukan 0</text>
      )}
      {jenis === 'batang'
        ? nilai.map((v, i) => (
            <g key={i}>
              <rect x={Xtengah(i) - lebarBatang / 2} y={Y(v)} width={lebarBatang} height={bawah - Y(v)} rx={3}
                    fill={sorot.includes(i) ? WARNA.depan : WARNA.samping} opacity={sorot.length && !sorot.includes(i) ? 0.55 : 0.9} />
              <text x={Xtengah(i)} y={Y(v) - 5} fontSize={10} textAnchor="middle" fill={WARNA.miring} fontFamily={MONO}>{angka(v)}</text>
            </g>
          ))
        : (
            <>
              <polyline points={nilai.map((v, i) => `${Xtengah(i)},${Y(v)}`).join(' ')} fill="none" stroke={WARNA.samping} strokeWidth={2.2} strokeLinejoin="round" />
              {nilai.map((v, i) => (
                <g key={i}>
                  <circle cx={Xtengah(i)} cy={Y(v)} r={4} fill={sorot.includes(i) ? WARNA.depan : WARNA.samping} stroke="var(--kartu)" strokeWidth={1.4} />
                  <text x={Xtengah(i)} y={Y(v) - 9} fontSize={10} textAnchor="middle" fill={WARNA.miring} fontFamily={MONO}>{angka(v)}</text>
                </g>
              ))}
            </>
          )}
      {kategori.map((k, i) => (
        <text key={k + i} x={Xtengah(i)} y={bawah + 15} fontSize={10} textAnchor="middle" fill={GARIS_SUMBU} fontFamily={MONO}>{k}</text>
      ))}
    </svg>
  )
}
