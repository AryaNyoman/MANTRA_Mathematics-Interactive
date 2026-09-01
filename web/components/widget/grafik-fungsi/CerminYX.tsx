'use client'

import Bidang from '@/components/widget/grafik-fungsi/Bidang'
import {
  KOTAK, MONO, WARNA, angka, keLayar, type Jendela,
} from '@/components/widget/grafik-fungsi/koordinat'

/**
 * Widget "Cermin y = x", tahap 9.
 *
 * Grafik eksponen dilipat ke seberang garis y = x, dan berhenti sebagai grafik
 * logaritma. Lipatannya dijalankan bertahap lewat satu penggeser, sehingga
 * siswa melihat titik (0, 1) benar-benar berjalan menuju (1, 0), bukan
 * tiba-tiba muncul di sana.
 *
 * SKALA KEDUA SUMBU DIBUAT SAMA, DAN ITU WAJIB DI SINI
 * Pencerminan terhadap garis y = x hanya TERLIHAT seperti pencerminan kalau
 * satu satuan mendatar sama panjangnya dengan satu satuan tegak. Kalau
 * skalanya berbeda, garis y = x tidak tampil miring 45 derajat dan lipatannya
 * terlihat seperti pergeseran acak. Karena itu jendelanya dihitung dari
 * perbandingan sisi bidang gambarnya, bukan ditulis asal.
 *
 * Ini sekaligus alasan `preserveAspectRatio` di Bidang tidak boleh `none`.
 * Cacat itu pernah terjadi di galeri tahap 10 Trigonometri: gambar sudut
 * diregangkan mengikuti kotak foto, sehingga sudut 45 derajat tidak lagi
 * tampil 45 derajat.
 */

export const BATAS_POKOK = { min: 1.3, maks: 4, langkah: 0.1 }
/** 0 berarti masih eksponen, 1 berarti sudah jadi logaritma. */
export const BATAS_LIPAT = { min: 0, maks: 1, langkah: 0.02 }

/** Titik-titik pasangan yang disebut di badan materi. */
export const PASANGAN = [0, 1, 2, 3] as const

const Y_MIN = -2.2
const Y_MAX = 5.2

/**
 * Jendela dengan satu satuan mendatar sepanjang satu satuan tegak.
 *
 * Perbandingan sisi bidang gambarnya dihitung dari KOTAK, bukan ditebak, jadi
 * kalau ukuran bidang diubah nanti, jendelanya ikut benar dengan sendirinya.
 */
function jendelaSeimbang(): Jendela {
  const nisbah = (KOTAK.x1 - KOTAK.x0) / (KOTAK.y1 - KOTAK.y0)
  const tinggi = Y_MAX - Y_MIN
  const lebar = tinggi * nisbah
  const tengahX = 1.4
  return {
    xMin: tengahX - lebar / 2,
    xMax: tengahX + lebar / 2,
    yMin: Y_MIN,
    yMax: Y_MAX,
  }
}

/**
 * Kurva yang sedang dilipat, sebagai senarai titik.
 *
 * Tiap titik (x, y) berjalan lurus menuju tukarannya (y, x). Pada setengah
 * jalan seluruh kurva mendarat tepat di garis y = x, dan itu memang yang
 * terjadi pada pencerminan sungguhan.
 */
export function titikLipatan(pokok: number, lipat: number): Array<[number, number]> {
  const hasil: Array<[number, number]> = []
  for (let i = 0; i <= 160; i++) {
    const x = -3 + (8 * i) / 160
    const y = Math.pow(pokok, x)
    if (!Number.isFinite(y) || y > 40) continue
    hasil.push([(1 - lipat) * x + lipat * y, (1 - lipat) * y + lipat * x])
  }
  return hasil
}

function jalurDari(titik: Array<[number, number]>, j: Jendela): string {
  const p = keLayar(j)
  const potongan: string[] = []
  let menyambung = false
  for (const [x, y] of titik) {
    if (
      x < j.xMin - 4 || x > j.xMax + 4 ||
      y < j.yMin - 4 || y > j.yMax + 4
    ) {
      menyambung = false
      continue
    }
    potongan.push(`${menyambung ? 'L' : 'M'} ${p.x(x).toFixed(2)} ${p.y(y).toFixed(2)}`)
    menyambung = true
  }
  return potongan.join(' ')
}

export default function CerminYX({
  pokok,
  lipat,
}: {
  pokok: number
  lipat: number
}) {
  const jendela = jendelaSeimbang()
  const p = keLayar(jendela)
  const t = Math.min(Math.max(lipat, 0), 1)

  const jalurAsli = jalurDari(titikLipatan(pokok, 0), jendela)
  const jalurSedang = jalurDari(titikLipatan(pokok, t), jendela)

  const selesai = t > 0.97
  const belum = t < 0.03

  return (
    <Bidang
      jendela={jendela}
      keterangan={
        belum
          ? `y = ${angka(pokok, 1)} pangkat x`
          : selesai
            ? `y = log x basis ${angka(pokok, 1)}`
            : `sedang dilipat, ${angka(t * 100, 0)} persen`
      }
      catatan={[
        {
          teks: belum
            ? 'asimtot mendatar di sumbu x, domainnya semua bilangan'
            : selesai
              ? 'asimtot tegak di sumbu y, domainnya cuma x positif'
              : 'tiap titik berjalan menuju tukaran koordinatnya',
        },
        { teks: `titik penanda: ${belum ? '(0, 1)' : selesai ? '(1, 0)' : 'sedang pindah'}`, warna: WARNA.depan },
      ]}
      catatanKanan={[{ teks: `lipatan ${angka(t * 100, 0)} persen`, warna: WARNA.sudut }]}
      aria={`Grafik eksponen berbasis ${angka(pokok, 1)} dilipat ke seberang garis y sama dengan x. Lipatan ${angka(t * 100, 0)} persen.`}
      tandaSkala={false}
    >
      {/* ---------- garis cerminnya ---------- */}
      <line x1={p.x(jendela.xMin)} y1={p.y(jendela.xMin)}
            x2={p.x(jendela.yMax)} y2={p.y(jendela.yMax)}
            stroke={WARNA.sudut} strokeWidth={1.6} strokeDasharray="6 5" opacity={0.85} />
      {/* Label ditaruh di SISI BAWAH garisnya, bukan tepat di atasnya. Pada
          potret pertama, garis y = x lewat persis di tengah tulisan sehingga
          tulisannya terlihat tercoret. */}
      <text x={p.x(4.1) + 6} y={p.y(4.1) + 15} fontSize={11} fill={WARNA.sudut} fontFamily={MONO}>
        y = x
      </text>

      {/* ---------- asimtot: mendatar sebelum dilipat, tegak sesudahnya ---------- */}
      <line
        x1={p.x((1 - t) * jendela.xMin + t * 0)} y1={p.y((1 - t) * 0 + t * jendela.yMin)}
        x2={p.x((1 - t) * jendela.xMax + t * 0)} y2={p.y((1 - t) * 0 + t * jendela.yMax)}
        stroke={WARNA.samping} strokeWidth={1.3} strokeDasharray="3 4" opacity={0.7}
      />

      {/* ---------- bentuk eksponen aslinya, tetap membayang ---------- */}
      {!belum && (
        <path d={jalurAsli} fill="none" stroke={WARNA.redup} strokeWidth={1.8}
              opacity={0.4} strokeDasharray="7 5" />
      )}

      {/* ---------- kurva yang sedang dilipat ---------- */}
      <path d={jalurSedang} fill="none" stroke={WARNA.miring} strokeWidth={2.8}
            strokeLinecap="round" />

      {/* ---------- titik pasangan yang bertukar koordinat ---------- */}
      {PASANGAN.map((x) => {
        const y = Math.pow(pokok, x)
        if (y > jendela.yMax + 1) return null
        const cx = (1 - t) * x + t * y
        const cy = (1 - t) * y + t * x
        return (
          <circle key={x} cx={p.x(cx)} cy={p.y(cy)} r={4.5} fill={WARNA.depan}
                  stroke="var(--kartu)" strokeWidth={1.8} />
        )
      })}

    </Bidang>
  )
}
