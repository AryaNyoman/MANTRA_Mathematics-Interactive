'use client'

import Bidang from '@/components/widget/grafik-fungsi/Bidang'
import {
  KOTAK, WARNA, angka, jalurFungsi, jendelaMuat, keLayar, type Jendela,
} from '@/components/widget/grafik-fungsi/koordinat'

/**
 * Widget "Dua Mesin", tahap 11.
 *
 * Dua keperluan dalam satu alat, dan keduanya sama pentingnya:
 *
 *   mode komposisi  menggambar f(g(x)) dan g(f(x)) BERSAMAAN, sehingga
 *                   perbedaan urutan terlihat sebagai dua kurva, bukan sebagai
 *                   klaim di dalam teks
 *   mode invers     menggambar f bersama inversnya dan garis y = x, dan
 *                   menjalankan uji garis mendatar
 *
 * KEEMPAT PILIHAN TOMBOLNYA BEREAKSI. Mesin kuadrat di mode invers sengaja
 * TIDAK punya invers, dan alatnya mengatakannya terus terang lengkap dengan
 * alasannya. Itu bukan tombol mati: menampilkan kegagalan uji garis mendatar
 * memang isi pelajarannya.
 */

export type MesinF = 'linear' | 'kuadrat'
export type ModeMesin = 'komposisi' | 'invers'

export const NAMA_F: Record<MesinF, string> = {
  'linear': 'f(x) = 2x + 3',
  'kuadrat': 'f(x) = x² + 1',
}

export const G_RUMUS = 'g(x) = 2x - 3'

export const F: Record<MesinF, (x: number) => number> = {
  'linear': (x) => 2 * x + 3,
  'kuadrat': (x) => x * x + 1,
}

export const g = (x: number) => 2 * x - 3

export const RUMUS_FG: Record<MesinF, string> = {
  'linear': 'f(g(x)) = 4x - 3',
  'kuadrat': 'f(g(x)) = 4x² - 12x + 10',
}

export const RUMUS_GF: Record<MesinF, string> = {
  'linear': 'g(f(x)) = 4x + 3',
  'kuadrat': 'g(f(x)) = 2x² - 1',
}

/** Invers f, atau null kalau f tidak satu-satu sehingga inversnya tidak ada. */
export const INVERS: Record<MesinF, ((x: number) => number) | null> = {
  'linear': (x) => (x - 3) / 2,
  'kuadrat': null,
}

export const RUMUS_INVERS: Record<MesinF, string> = {
  'linear': 'inversnya (x - 3) : 2',
  'kuadrat': 'tidak punya invers',
}

/**
 * Jangkauan angka yang boleh dijalankan lewat kedua mesin.
 *
 * Dipersempit dari -4 sampai 6 menjadi -1 sampai 4 pada 2 September 2026.
 * Alasannya terlihat di potret pertama: pada x = 6, hasil komposisinya 82,
 * sehingga jendelanya melar dan kedua kurva tampil seperti dua paku sempit
 * yang saling menempel. Yang mau ditunjukkan justru bahwa keduanya BERBEDA,
 * dan itu hilang sama sekali.
 */
export const BATAS_MASUK = { min: -1, maks: 4, langkah: 0.5 }

/** Perjalanan satu angka lewat kedua mesin, untuk tabel di kolom kanan. */
export function jejakAngka(mesin: MesinF, x: number) {
  const f = F[mesin]
  return {
    x,
    gDulu: { antara: g(x), akhir: f(g(x)) },
    fDulu: { antara: f(x), akhir: g(f(x)) },
  }
}

const X_TAMPIL = { min: -1.6, maks: 4.6 }

/**
 * Jendela mode komposisi: dihitung dari kedua kurvanya sendiri.
 *
 * Titik yang sedang disorot ikut dimasukkan, jadi ia DIJAMIN terlihat. Pada
 * potret pertama, nilai 26 dan 31 jatuh di luar layar sehingga kedua bulatan
 * penandanya hilang, padahal justru dua angka itulah yang sedang dibicarakan.
 */
function jendelaKomposisi(fg: (x: number) => number, gf: (x: number) => number, masuk: number): Jendela {
  const titik: Array<[number, number]> = [[0, 0], [masuk, fg(masuk)], [masuk, gf(masuk)]]
  for (let i = 0; i <= 60; i++) {
    const x = X_TAMPIL.min + ((X_TAMPIL.maks - X_TAMPIL.min) * i) / 60
    titik.push([x, fg(x)], [x, gf(x)])
  }
  const j = jendelaMuat(titik, 0.12)
  return { ...j, xMin: X_TAMPIL.min, xMax: X_TAMPIL.maks }
}

/**
 * Jendela mode invers: skala kedua sumbu WAJIB sama.
 *
 * Tanpa itu, garis y = x tidak tampil miring 45 derajat dan pencerminannya
 * tidak terlihat sebagai pencerminan. Tingginya menyesuaikan nilai yang sedang
 * diuji supaya garis mendatarnya selalu masuk layar.
 */
function jendelaInvers(yUji: number): Jendela {
  const nisbah = (KOTAK.x1 - KOTAK.x0) / (KOTAK.y1 - KOTAK.y0)
  const batas = Math.max(8, Math.abs(yUji) * 1.2)
  const lebar = 2 * batas * nisbah
  return { xMin: -lebar / 2, xMax: lebar / 2, yMin: -batas, yMax: batas }
}

export default function DuaMesin({
  mesin,
  mode,
  masuk,
}: {
  mesin: MesinF
  mode: ModeMesin
  masuk: number
}) {
  const f = F[mesin]
  const inv = INVERS[mesin]
  const jejak = jejakAngka(mesin, masuk)

  const fg = (x: number) => f(g(x))
  const gf = (x: number) => g(f(x))

  if (mode === 'komposisi') {
    const jendela = jendelaKomposisi(fg, gf, masuk)
    const p = keLayar(jendela)
    return (
      <Bidang
        jendela={jendela}
        keterangan={`${NAMA_F[mesin]}  ·  ${G_RUMUS}`}
        catatan={[
          { teks: `${RUMUS_FG[mesin]} = ${angka(jejak.gDulu.akhir, 2)}`, warna: WARNA.sudut },
          { teks: `${RUMUS_GF[mesin]} = ${angka(jejak.fDulu.akhir, 2)}`, warna: WARNA.depan },
        ]}
        catatanKanan={[{ teks: `x = ${angka(masuk, 1)}` }]}
        catatanBawah={{
          teks: Math.abs(jejak.gDulu.akhir - jejak.fDulu.akhir) < 1e-9
            ? 'di sini kebetulan sama. Geser angkanya'
            : 'dua kurva berbeda: urutan berpengaruh',
        }}
        aria={`Dua urutan komposisi digambar bersamaan. Pada x sama dengan ${angka(masuk, 1)}, f setelah g memberi ${angka(jejak.gDulu.akhir, 2)} dan g setelah f memberi ${angka(jejak.fDulu.akhir, 2)}.`}
      >
        <path d={jalurFungsi(fg, jendela, 600)} fill="none" stroke={WARNA.sudut} strokeWidth={2.8} />
        <path d={jalurFungsi(gf, jendela, 600)} fill="none" stroke={WARNA.depan} strokeWidth={2.8}
              strokeDasharray="8 5" />

        {/* garis tegak pada angka yang sedang dijalankan */}
        <line x1={p.x(masuk)} y1={KOTAK.y0} x2={p.x(masuk)} y2={KOTAK.y1}
              stroke={WARNA.redup} strokeWidth={1.2} strokeDasharray="4 4" opacity={0.7} />

        <circle cx={p.x(masuk)} cy={p.y(jejak.gDulu.akhir)} r={5.5} fill={WARNA.sudut}
                stroke="var(--kartu)" strokeWidth={2} />
        <circle cx={p.x(masuk)} cy={p.y(jejak.fDulu.akhir)} r={5.5} fill={WARNA.depan}
                stroke="var(--kartu)" strokeWidth={2} />

      </Bidang>
    )
  }

  // ---------- mode invers ----------
  const yUji = f(masuk)
  const jendela = jendelaInvers(yUji)
  const p = keLayar(jendela)
  const potongMendatar = mesin === 'kuadrat'
    ? (yUji > 1 ? 2 : yUji === 1 ? 1 : 0)
    : 1

  return (
    <Bidang
      jendela={jendela}
      keterangan={`${NAMA_F[mesin]}  ·  ${RUMUS_INVERS[mesin]}`}
      catatan={[
        {
          teks: `garis mendatar memotong ${potongMendatar} kali`,
          warna: potongMendatar > 1 ? WARNA.depan : WARNA.miring,
        },
        {
          teks: potongMendatar > 1
            ? 'dua masukan memberi keluaran sama, jadi tidak bisa dibalik'
            : inv
              ? 'satu-satu, jadi inversnya ada. Yang biru itu inversnya'
              : 'geser angkanya ke atas untuk melihat inversnya gagal',
          warna: potongMendatar > 1 ? WARNA.depan : WARNA.samping,
        },
      ]}
      catatanBawah={{ teks: 'ungu putus-putus = y = x, cerminnya' }}
      aria={`Mode invers. ${NAMA_F[mesin]}. Garis mendatar memotong grafiknya ${potongMendatar} kali.`}
      tandaSkala={false}
    >
      {/* garis cermin */}
      <line x1={p.x(jendela.yMin)} y1={p.y(jendela.yMin)}
            x2={p.x(jendela.yMax)} y2={p.y(jendela.yMax)}
            stroke={WARNA.sudut} strokeWidth={1.4} strokeDasharray="6 5" opacity={0.75} />

      {/* fungsi aslinya */}
      <path d={jalurFungsi(f, jendela, 600)} fill="none" stroke={WARNA.miring} strokeWidth={2.8} />

      {/* inversnya, kalau ada */}
      {inv && (
        <path d={jalurFungsi(inv, jendela, 600)} fill="none" stroke={WARNA.samping}
              strokeWidth={2.8} strokeDasharray="8 5" />
      )}

      {/* uji garis mendatar */}
      <line x1={KOTAK.x0} y1={p.y(yUji)} x2={KOTAK.x1} y2={p.y(yUji)}
            stroke={potongMendatar > 1 ? WARNA.depan : WARNA.redup}
            strokeWidth={1.6} strokeDasharray="5 4" opacity={0.9} />

      {/* titik potong garis mendatar dengan grafiknya */}
      {mesin === 'kuadrat' && yUji >= 1 && (
        <>
          <circle cx={p.x(Math.sqrt(yUji - 1))} cy={p.y(yUji)} r={5}
                  fill={WARNA.depan} stroke="var(--kartu)" strokeWidth={2} />
          {yUji > 1 && (
            <circle cx={p.x(-Math.sqrt(yUji - 1))} cy={p.y(yUji)} r={5}
                    fill={WARNA.depan} stroke="var(--kartu)" strokeWidth={2} />
          )}
        </>
      )}
      {mesin === 'linear' && (
        <circle cx={p.x(masuk)} cy={p.y(yUji)} r={5} fill={WARNA.sudut}
                stroke="var(--kartu)" strokeWidth={2} />
      )}

    </Bidang>
  )
}
