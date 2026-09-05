'use client'

import { useSedangDiubah } from '@/components/kendali/sedang-diubah'
import Bidang from '@/components/widget/grafik-fungsi/Bidang'
import {
  KOTAK, MONO, WARNA, jalurFungsi, jendelaMuat, keLayar, type Jendela,
} from '@/components/widget/grafik-fungsi/koordinat'
import {
  nilaiPuncak, tulisPuncak, tulisTitik, type BentukPuncak as Puncak,
} from '@/components/widget/grafik-fungsi/fungsi'

/**
 * Widget "Bentuk Puncak", tahap 3.
 *
 * Tiga penggeser a, h, dan k pada y = a(x - h)² + k. Bentuk sebelum penggeser
 * terakhir disentuh tertinggal sebagai bayangan, sehingga yang terlihat adalah
 * PERPINDAHANNYA, bukan cuma hasil akhirnya. Bayangan itu disiapkan panggung
 * lewat `onPointerDown` pada penggesernya.
 *
 * BINGKAINYA MENYESUAIKAN, DAN ITU WAJIB
 * Nilai a boleh sampai 3, dan pada nilai itu parabola dengan bingkai tetap akan
 * keluar layar dalam dua satuan. Jendela di sini dihitung dari titik-titik
 * kurvanya sendiri, jadi tidak mungkin terpotong. Penunjuk skala di pojok
 * memberi tahu siswa seberapa lebar bidang yang sedang terlihat, supaya
 * parabola yang menyempit tidak disangka berubah bentuk padahal tampilannya
 * yang melebar.
 */

export const BATAS_A = { min: -3, maks: 3, langkah: 0.1 }
export const BATAS_H = { min: -5, maks: 5, langkah: 0.5 }
export const BATAS_K = { min: -6, maks: 6, langkah: 0.5 }

/** Setengah lebar bidang yang selalu ditampilkan di kiri dan kanan puncak. */
const JANGKAU = 4.5

/** Jendela yang pasti memuat seluruh potongan kurva yang digambar. */
function jendelaUntuk(p: Puncak, bayang?: Puncak): Jendela {
  const titik: Array<[number, number]> = []
  const kumpulkan = (b: Puncak) => {
    for (let i = 0; i <= 24; i++) {
      const x = b.h - JANGKAU + (2 * JANGKAU * i) / 24
      titik.push([x, nilaiPuncak(b, x)])
    }
  }
  kumpulkan(p)
  if (bayang) kumpulkan(bayang)
  // sumbu selalu ikut terlihat, supaya siswa punya patokan tetap saat
  // parabolanya bergeser jauh dari titik asal
  titik.push([0, 0])
  return jendelaMuat(titik, 0.1)
}

export default function BentukPuncak({
  nilai,
  bayang,
}: {
  nilai: Puncak
  bayang?: Puncak
}) {
  const dipegang = useSedangDiubah()
  const { a, h, k } = nilai
  const jendela = jendelaUntuk(nilai, bayang)
  const p = keLayar(jendela)

  const datar = Math.abs(a) < 1e-9

  return (
    <Bidang
      jendela={jendela}
      keterangan={tulisPuncak(nilai)}
      catatan={[
        {
          teks: datar
            ? 'a nol: suku x kuadrat hilang, tersisa garis lurus'
            : a > 0
              ? 'a positif: terbuka ke atas, puncaknya TERENDAH'
              : 'a negatif: terbuka ke bawah, puncaknya TERTINGGI',
        },
        { teks: `sumbu simetri x = ${h}`, warna: WARNA.sudut },
      ]}
      aria={`Parabola bentuk puncak dengan a sama dengan ${a}, h sama dengan ${h}, k sama dengan ${k}. Puncaknya di ${tulisTitik(h, k, 1)}.`}
    >
      {/* ---------- bayangan bentuk sebelumnya ---------- */}
      {bayang && (
        <>
          <path d={jalurFungsi((x) => nilaiPuncak(bayang, x), jendela)}
                fill="none" stroke={WARNA.redup} strokeWidth={2} opacity={0.42}
                strokeDasharray="7 5" />
          <circle cx={p.x(bayang.h)} cy={p.y(bayang.k)} r={4}
                  fill="none" stroke={WARNA.redup} strokeWidth={1.6} opacity={0.55} />
        </>
      )}

      {/* ---------- sumbu simetri ---------- */}
      <line className={dipegang === 'h' ? 'nyala' : undefined} x1={p.x(h)} y1={KOTAK.y0} x2={p.x(h)} y2={KOTAK.y1}
            stroke={WARNA.sudut} strokeWidth={1.3} strokeDasharray="5 4" opacity={0.7} />

      {/* ---------- parabolanya ---------- */}
      <path className={dipegang === 'a' ? 'nyala' : undefined} d={jalurFungsi((x) => nilaiPuncak(nilai, x), jendela)}
            fill="none" stroke={WARNA.miring} strokeWidth={2.8} strokeLinecap="round" />

      {/* ---------- puncaknya ---------- */}
      <circle className={dipegang === 'h' || dipegang === 'k' ? 'nyala' : undefined} cx={p.x(h)} cy={p.y(k)} r={dipegang === 'h' || dipegang === 'k' ? 8 : 6} fill={WARNA.sudut}
              stroke="var(--kartu)" strokeWidth={2.2} />
      <text x={p.x(h) + 11} y={p.y(k) + (a >= 0 ? 16 : -9)} fontSize={11.5}
            fill={WARNA.sudut} fontFamily={MONO}>
        puncak {tulisTitik(h, k, 1)}
      </text>

    </Bidang>
  )
}
