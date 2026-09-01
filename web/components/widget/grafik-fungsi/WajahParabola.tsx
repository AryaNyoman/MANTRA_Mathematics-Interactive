'use client'

import Bidang from '@/components/widget/grafik-fungsi/Bidang'
import {
  KOTAK, WARNA, angka, jalurFungsi, jendelaMuat, keLayar, type Jendela,
} from '@/components/widget/grafik-fungsi/koordinat'
import {
  akar, diskriminan, kePuncak, tulisTitik, type BentukUmum,
} from '@/components/widget/grafik-fungsi/fungsi'

/**
 * Widget "Dua Wajah Satu Parabola", tahap 4.
 *
 * Menjalankan melengkapkan kuadrat SELANGKAH DEMI SELANGKAH pada satu parabola,
 * sambil menyorot bagian gambar yang sedang dijelaskan tiap langkah. Nilai c
 * bisa digeser supaya diskriminannya berganti tanda dan titik potongnya
 * benar-benar menghilang di depan mata, bukan cuma diceritakan.
 *
 * a dan b sengaja DIKUNCI di 2 dan -4, mengikuti contoh Uji Kompetensi Bab 6
 * buku Kelas 10. Dengan begitu langkah aljabarnya tetap berupa angka bulat yang
 * bisa diikuti siswa, dan yang berubah cuma satu hal saja pada satu waktu.
 */

export const A_TETAP = 2
export const B_TETAP = -4
export const BATAS_C = { min: -20, maks: 10, langkah: 0.5 }

export const JUMLAH_LANGKAH = 5

/** Setengah lebar bidang di kiri dan kanan puncak. */
const JANGKAU = 4.5

export function umumDari(c: number): BentukUmum {
  return { a: A_TETAP, b: B_TETAP, c }
}

/**
 * Kelima langkah melengkapkan kuadrat, ditulis untuk nilai c yang sedang aktif.
 *
 * Sengaja dikembalikan sebagai teks jadi, bukan dirakit di dalam JSX, supaya
 * urutannya bisa dibaca sekali jalan di sini dan tidak tercecer di antara
 * elemen gambar.
 */
export function langkahLengkap(c: number): Array<{ baris: string; catatan: string }> {
  const { h, k } = kePuncak(umumDari(c))
  const bagiA = B_TETAP / A_TETAP
  return [
    {
      baris: `y = ${A_TETAP}x² ${B_TETAP < 0 ? '-' : '+'} ${Math.abs(B_TETAP)}x ${c < 0 ? '-' : '+'} ${angka(Math.abs(c), 1)}`,
      catatan: 'bentuk umum, apa adanya',
    },
    {
      baris: `y = ${A_TETAP}(x² ${bagiA < 0 ? '-' : '+'} ${angka(Math.abs(bagiA), 1)}x) ${c < 0 ? '-' : '+'} ${angka(Math.abs(c), 1)}`,
      catatan: `keluarkan ${A_TETAP} dari dua suku depan saja`,
    },
    {
      baris: `x² ${bagiA < 0 ? '-' : '+'} ${angka(Math.abs(bagiA), 1)}x = (x ${h > 0 ? '-' : '+'} ${angka(Math.abs(h), 1)})² - ${angka(h * h, 2)}`,
      catatan: `setengah dari ${angka(bagiA, 1)} adalah ${angka(-h, 1)}, lalu kuadratnya dikurangkan lagi`,
    },
    {
      baris: `y = ${A_TETAP}[(x ${h > 0 ? '-' : '+'} ${angka(Math.abs(h), 1)})² - ${angka(h * h, 2)}] ${c < 0 ? '-' : '+'} ${angka(Math.abs(c), 1)}`,
      catatan: 'masukkan kembali ke rumus semula',
    },
    {
      baris: `y = ${A_TETAP}(x ${h > 0 ? '-' : '+'} ${angka(Math.abs(h), 1)})² ${k < 0 ? '-' : '+'} ${angka(Math.abs(k), 1)}`,
      catatan: `bentuk puncak. Puncaknya terbaca langsung: ${tulisTitik(h, k, 1)}`,
    },
  ]
}

function jendelaUntuk(u: BentukUmum): Jendela {
  const { h } = kePuncak(u)
  const titik: Array<[number, number]> = []
  for (let i = 0; i <= 24; i++) {
    const x = h - JANGKAU + (2 * JANGKAU * i) / 24
    titik.push([x, u.a * x * x + u.b * x + u.c])
  }
  titik.push([0, u.c])
  titik.push([0, 0])
  return jendelaMuat(titik, 0.1)
}

export default function WajahParabola({
  c,
  langkah,
}: {
  c: number
  /** 0 sampai 4, langkah melengkapkan kuadrat yang sedang ditampilkan */
  langkah: number
}) {
  const u = umumDari(c)
  const { h, k } = kePuncak(u)
  const D = diskriminan(u)
  const akarnya = akar(u)
  const jendela = jendelaUntuk(u)
  const p = keLayar(jendela)

  const i = Math.min(Math.max(langkah, 0), JUMLAH_LANGKAH - 1)
  const daftar = langkahLengkap(c)

  // Tiap langkah menyorot bagian gambar yang sedang dibicarakan. Sorotan yang
  // tidak berpindah membuat siswa mengira semua langkah bicara soal hal yang
  // sama.
  const sorotPotongY = i === 0
  const sorotSumbu = i >= 2
  const sorotPuncak = i >= 4

  return (
    <Bidang
      jendela={jendela}
      keterangan={daftar[i].baris}
      catatan={[
        { teks: `langkah ${i + 1}/${JUMLAH_LANGKAH}: ${daftar[i].catatan}` },
        sorotPotongY
          ? { teks: `memotong sumbu y di (0, ${angka(c, 1)}), yaitu nilai c`, warna: WARNA.depan }
          : { teks: `puncaknya ${tulisTitik(h, k, 1)}`, warna: WARNA.sudut },
      ]}
      catatanKanan={[
        {
          teks: `D = ${angka(D, 1)}`,
          warna: D > 0 ? WARNA.samping : D === 0 ? WARNA.sudut : WARNA.depan,
        },
        {
          teks: D > 0 ? 'dua titik potong' : D === 0 ? 'menyinggung' : 'tidak menyentuh sumbu x',
          warna: D > 0 ? WARNA.samping : D === 0 ? WARNA.sudut : WARNA.depan,
        },
      ]}
      aria={`Parabola y sama dengan 2x kuadrat kurang 4x tambah ${angka(c, 1)}. Langkah ${i + 1} dari ${JUMLAH_LANGKAH}. Diskriminannya ${angka(D, 1)}.`}
    >
      {/* ---------- sumbu simetri ---------- */}
      <line x1={p.x(h)} y1={KOTAK.y0} x2={p.x(h)} y2={KOTAK.y1}
            stroke={WARNA.sudut} strokeWidth={sorotSumbu ? 1.8 : 1}
            strokeDasharray="5 4" opacity={sorotSumbu ? 0.85 : 0.3} />

      {/* ---------- parabolanya ---------- */}
      <path d={jalurFungsi((x) => u.a * x * x + u.b * x + u.c, jendela)}
            fill="none" stroke={WARNA.miring} strokeWidth={2.8} strokeLinecap="round" />

      {/* ---------- titik potong sumbu y, disorot di langkah pertama ---------- */}
      <circle cx={p.x(0)} cy={p.y(c)} r={sorotPotongY ? 6 : 4}
              fill={sorotPotongY ? WARNA.depan : 'var(--kartu)'}
              stroke={WARNA.depan} strokeWidth={2} />

      {/* ---------- titik potong sumbu x, ada atau tidak tergantung D ---------- */}
      {akarnya.map((r) => (
        <circle key={r} cx={p.x(r)} cy={p.y(0)} r={5}
                fill={WARNA.samping} stroke="var(--kartu)" strokeWidth={2} />
      ))}

      {/* ---------- puncaknya, disorot di langkah terakhir ---------- */}
      <circle cx={p.x(h)} cy={p.y(k)} r={sorotPuncak ? 6.5 : 4}
              fill={sorotPuncak ? WARNA.sudut : 'var(--kartu)'}
              stroke={WARNA.sudut} strokeWidth={2.2} />

    </Bidang>
  )
}
