'use client'

import { useRef } from 'react'
import BidangVektor from './BidangVektor'
import Panah from './Panah'
import { angka, jendelaSeimbang, keLayar, panjang, tahan, type Vek } from './geometri'
import { KERTAS, KOTAK, MONO, NISBAH, WARNA } from './gaya'
import { useSeret } from './useSeret'

/** Sejauh mana ujung panah boleh ditarik. Dijaga supaya gambar tidak terpotong. */
export const BATAS = { x: 6, y: 3.5 }

/**
 * Titik jangkar tetap. Jendelanya dihitung dari titik-titik ini DITAMBAH letak
 * panah, sehingga bingkainya diam saat panah digeser (enak dipakai) tetapi
 * tetap melebar sendiri kalau suatu saat ada yang keluar batas (aman).
 */
const JANGKAR: Vek[] = [
  { x: -BATAS.x, y: -BATAS.y },
  { x: BATAS.x, y: BATAS.y },
]

/**
 * Widget Materi 03: memecah satu panah menjadi langkah mendatar dan langkah
 * tegak. Ujung panahnya ditarik langsung dengan jari atau tetikus.
 */
export default function PecahKomponen({
  v,
  onUbah,
}: {
  v: Vek
  onUbah: (v: Vek) => void
}) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const jendela = jendelaSeimbang([...JANGKAR, v], NISBAH, 0.05)
  const pointer = useSeret(jendela, svgRef, (t) => onUbah(tahan(t, BATAS.x, BATAS.y)))

  const asal: Vek = { x: 0, y: 0 }
  const sudut: Vek = { x: v.x, y: 0 }
  const p = keLayar(jendela, KOTAK)

  // Tanda siku-siku di titik sudut, menghadap ke arah yang benar mengikuti
  // tanda komponennya. Digambar dalam piksel layar supaya ukurannya tetap
  // walau jendelanya berubah.
  const sisi = 9
  const arahX = v.x >= 0 ? -1 : 1
  const arahY = v.y >= 0 ? -1 : 1
  const sx = p.x(sudut.x)
  const sy = p.y(sudut.y)
  const siku = `M ${sx + arahX * sisi} ${sy} L ${sx + arahX * sisi} ${sy + arahY * sisi} L ${sx} ${sy + arahY * sisi}`
  const adaSiku = Math.abs(v.x) > 0.01 && Math.abs(v.y) > 0.01

  /**
   * Di sisi mana label komponen ditulis.
   *
   * `Panah` menggeser labelnya tegak lurus batangnya, dan arah tegak lurus itu
   * ikut berbalik saat panahnya berbalik, jadi tandanya tidak bisa ditulis
   * tetap. Dua aturan yang dipakai, keduanya lahir dari tabrakan sungguhan
   * yang terlihat di potret layar:
   *
   * 1. Label MENDATAR selalu di ATAS sumbu, tidak peduli segitiganya di mana.
   *    Jalur di bawah sumbu sudah dipakai angka sumbu, dan dua kali percobaan
   *    menaruhnya di sana berakhir bertindih ("4" terbaca "4 pangkat 2", lalu
   *    "-3,5" menimpa "-2").
   * 2. Label TEGAK di dalam segitiga, yaitu menghadap sumbu tegak. Di luar
   *    segitiga ia meleset keluar bingkai saat vektornya menunjuk ke kiri.
   */
  const tanda = (positif: boolean): 1 | -1 => (positif ? 1 : -1)
  const sisiMendatar: 1 | -1 = tanda(v.x < 0)
  const sisiTegak: 1 | -1 = tanda(v.x >= 0 ? v.y < 0 : v.y >= 0)

  return (
    <BidangVektor
      jendela={jendela}
      aria={`Vektor dengan komponen mendatar ${angka(v.x, 1)} dan komponen tegak ${angka(v.y, 1)}, ujungnya bisa ditarik`}
      keterangan={`v = (${angka(v.x, 1)}  ${angka(v.y, 1)})`}
      svgRef={svgRef}
      pointer={pointer}
    >
      {/* langkah mendatar lalu langkah tegak, keduanya sebagai panah bantu.
          Letak labelnya diatur oleh sisiMendatar dan sisiTegak di atas. */}
      <Panah dari={asal} ke={sudut} jendela={jendela} warna={WARNA.samping} tebal={2}
             label={Math.abs(v.x) > 0.01 ? angka(v.x, 1) : undefined} sisiLabel={sisiMendatar}
             bagian={0.38} />
      <Panah dari={sudut} ke={v} jendela={jendela} warna={WARNA.depan} tebal={2}
             label={Math.abs(v.y) > 0.01 ? angka(v.y, 1) : undefined} sisiLabel={sisiTegak} />

      {adaSiku && <path d={siku} fill="none" stroke={WARNA.redup} strokeWidth={1.3} />}

      {/* panah utama digambar TERAKHIR supaya berada di atas panah bantu.
          Labelnya digeser ke arah ujung supaya tidak berdesakan dengan label
          komponen mendatar saat vektornya hampir berbaring. */}
      <Panah dari={asal} ke={v} jendela={jendela} warna={WARNA.miring} tebal={2.8} pegangan
             label="v" sisiLabel={-1} bagian={0.68} />

      <text
        x={p.x(0) + 6} y={p.y(0) + 14} fontSize={10} fontFamily={MONO}
        fill={WARNA.redup} stroke={KERTAS} strokeWidth={3} paintOrder="stroke"
      >
        O
      </text>

      <text
        x={KOTAK.x1} y={KOTAK.y0 - 8} textAnchor="end" fontSize={11} fontFamily={MONO}
        fill={WARNA.miring}
      >
        panjang {angka(panjang(v), 2)}
      </text>
    </BidangVektor>
  )
}
