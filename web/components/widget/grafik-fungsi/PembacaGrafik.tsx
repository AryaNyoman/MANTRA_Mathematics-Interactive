'use client'

import { useSedangDiubah } from '@/components/kendali/sedang-diubah'
import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import Bidang from '@/components/widget/grafik-fungsi/Bidang'
import {
  KOTAK, MONO, WARNA, angka, jendelaTetap, keLayar,
} from '@/components/widget/grafik-fungsi/koordinat'
import { batasi, posisiMatematika } from '@/components/widget/grafik-fungsi/seret'

/**
 * Widget "Pembaca Grafik", tahap 1.
 *
 * Grafik perjalanan Ayu naik motor, tanpa satu pun rumus. Siswa menyeret
 * penunjuk menyusuri sumbu waktu, dan keterangan di dalam gambar berganti
 * mengikuti bagian cerita yang sedang dilewati.
 *
 * KENAPA DISERET, BUKAN DIGESER LEWAT SLIDER
 * Tahap ini soal MEMBACA grafik. Menyeret jari langsung di atas kurvanya
 * membuat gerakan tangan dan gerakan mata terjadi di tempat yang sama, dan itu
 * yang dilatih. Slider di bawah gambar memisahkan keduanya.
 *
 * Slider tetap disediakan panggung sebagai jalan kedua, karena penunjuk yang
 * hanya bisa diseret akan menyulitkan pengguna papan ketik.
 */

/** Titik belok perjalanan: waktu dalam menit, jarak dari rumah dalam km. */
export const TITIK = [
  { t: 0, s: 0 },
  { t: 2, s: 1 },
  { t: 3, s: 1 },
  { t: 6, s: 4 },
  { t: 7, s: 3 },
  { t: 10, s: 6 },
] as const

export const BATAS_WAKTU = { min: 0, maks: 10, langkah: 0.1 }

/**
 * Lima potongan cerita. Tiap potongan HARUS punya keterangan sendiri.
 *
 * Aturan yang lahir dari kegagalan galeri tahap 10 Trigonometri: tidak boleh
 * ada bagian widget yang diam saja saat disentuh. Dulu hanya satu dari empat
 * kartu yang bereaksi, dan ARYA melaporkannya sebagai "interaktifnya tidak
 * bekerja". Laporannya tepat.
 */
export const BABAK = [
  {
    dari: 0, sampai: 2, judul: 'Berangkat',
    isi: 'Garisnya naik. Jarak bertambah dari 0 ke 1 km.',
  },
  {
    dari: 2, sampai: 3, judul: 'Berhenti',
    isi: 'Garisnya MENDATAR. Jaraknya tetap, jadi Ayu berhenti.',
  },
  {
    dari: 3, sampai: 6, judul: 'Jalan lagi, lebih cepat',
    isi: 'Naik lagi, lebih curam: 3 km dalam 3 menit.',
  },
  {
    dari: 6, sampai: 7, judul: 'Berbalik arah',
    isi: 'Garisnya TURUN, 4 km jadi 3 km. Ayu berbalik arah.',
  },
  {
    dari: 7, sampai: 10, judul: 'Sampai sekolah',
    isi: 'Naik lagi sampai 6 km, lalu perjalanannya selesai.',
  },
] as const

/** Jarak dari rumah pada menit ke-t, dihitung lurus di antara titik beloknya. */
export function jarak(t: number): number {
  const waktu = batasi(t, TITIK[0].t, TITIK[TITIK.length - 1].t)
  for (let i = 0; i < TITIK.length - 1; i++) {
    const a = TITIK[i]
    const b = TITIK[i + 1]
    if (waktu <= b.t) {
      if (b.t === a.t) return b.s
      return a.s + ((waktu - a.t) / (b.t - a.t)) * (b.s - a.s)
    }
  }
  return TITIK[TITIK.length - 1].s
}

/** Potongan cerita yang sedang dilewati penunjuk. */
export function babakDi(t: number): (typeof BABAK)[number] {
  return BABAK.find((b) => t < b.sampai) ?? BABAK[BABAK.length - 1]
}

const JENDELA = jendelaTetap(-0.6, 10.6, -0.7, 7)

export default function PembacaGrafik({
  waktu,
  onGeser,
}: {
  waktu: number
  onGeser: (t: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [menyeret, setMenyeret] = useState(false)
  const p = keLayar(JENDELA)
  const s = jarak(waktu)
  const babak = babakDi(waktu)

  const jalur = TITIK.map((k, i) => `${i === 0 ? 'M' : 'L'} ${p.x(k.t)} ${p.y(k.s)}`).join(' ')

  // Arah kemiringan kurva di sekitar penunjuk. Dipakai untuk memutuskan di
  // sebelah mana tulisan angkanya ditaruh supaya tidak menimpa garisnya.
  const menanjak = jarak(Math.min(waktu + 0.15, BATAS_WAKTU.maks)) >
                   jarak(Math.max(waktu - 0.15, BATAS_WAKTU.min))

  function tangkap(e: ReactPointerEvent<SVGSVGElement>) {
    const m = posisiMatematika(e, JENDELA)
    if (!m) return
    onGeser(batasi(Math.round(m.x * 10) / 10, BATAS_WAKTU.min, BATAS_WAKTU.maks))
  }

  return (
    <Bidang
      jendela={JENDELA}
      keterangan="jarak dari rumah (km) terhadap waktu (menit)"
      catatan={[
        { teks: babak.judul, warna: WARNA.sudut },
        { teks: babak.isi },
      ]}
      catatanKanan={[{ teks: `${angka(waktu, 1)} menit`, warna: WARNA.samping }]}
      catatanBawah={{ teks: 'seret titiknya, atau pakai penggeser di bawah' }}
      aria={`Grafik perjalanan. Penunjuk di menit ${angka(waktu, 1)}, jarak ${angka(s, 2)} kilometer. ${babak.judul}: ${babak.isi}`}
      tandaSkala={false}
      gaya={{ cursor: menyeret ? 'grabbing' : 'grab', touchAction: 'none' }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        setMenyeret(true)
        tangkap(e)
      }}
      onPointerMove={(e) => { if (menyeret) tangkap(e) }}
      onPointerUp={() => setMenyeret(false)}
    >
      {/* ---------- potongan cerita yang sedang aktif, disorot lembut ---------- */}
      <rect
        x={p.x(babak.dari)} y={KOTAK.y0}
        width={p.x(babak.sampai) - p.x(babak.dari)} height={KOTAK.y1 - KOTAK.y0}
        fill={WARNA.sudut} opacity={0.09}
      />

      {/* ---------- garis perjalanannya ---------- */}
      <path d={jalur} fill="none" stroke={WARNA.miring} strokeWidth={2.8}
            strokeLinejoin="round" strokeLinecap="round" />

      {/* titik belok, supaya batas antar potongan cerita terlihat */}
      {TITIK.map((k) => (
        <circle key={k.t} cx={p.x(k.t)} cy={p.y(k.s)} r={3} fill="var(--kartu)"
                stroke={WARNA.redup} strokeWidth={1.4} />
      ))}

      {/* ---------- garis bantu dari penunjuk ke kedua sumbu ---------- */}
      <line x1={p.x(waktu)} y1={p.y(s)} x2={p.x(waktu)} y2={p.y(0)}
            stroke={WARNA.samping} strokeWidth={1.3} strokeDasharray="5 4" opacity={0.8} />
      <line x1={p.x(waktu)} y1={p.y(s)} x2={KOTAK.x0} y2={p.y(s)}
            stroke={WARNA.depan} strokeWidth={1.3} strokeDasharray="5 4" opacity={0.8} />

      {/* ---------- penunjuknya ---------- */}
      {/* Lingkaran luar yang bening dibuat jauh lebih besar daripada titiknya.
          Ia tidak terlihat, tetapi membuat sasaran sentuhnya cukup lebar untuk
          jari, tanpa membuat titiknya sendiri jadi bulatan raksasa. */}
      <circle cx={p.x(waktu)} cy={p.y(s)} r={16} fill="transparent" />
      <circle className={dipegang === 'waktu' ? 'nyala' : undefined} cx={p.x(waktu)} cy={p.y(s)} r={menyeret || dipegang === 'waktu' ? 8 : 6.5} fill={WARNA.sudut}
              stroke="var(--kartu)" strokeWidth={2.2} />

      {/* ---------- angka yang sedang dibaca ----------
          Ditaruh di sisi yang BERLAWANAN dengan arah kemiringan kurvanya:
          kalau garisnya sedang menanjak, tulisan di atas titik pasti menimpa
          garis itu, jadi tulisannya dipindah ke bawah. Potret pertama tanggal
          2 September 2026 memperlihatkan tabrakan itu terjadi sungguhan. */}
      <text
        x={p.x(waktu) + (waktu > 8.6 ? -12 : 12)}
        y={p.y(s) + (menanjak ? 19 : -13)}
        textAnchor={waktu > 8.6 ? 'end' : 'start'}
        fontSize={11} fill={WARNA.miring} fontFamily={MONO}
      >
        {angka(s, 2)} km
      </text>
    </Bidang>
  )
}
