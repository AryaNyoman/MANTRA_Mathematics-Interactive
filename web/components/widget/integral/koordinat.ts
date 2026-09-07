import { WARNA } from '@/lib/warna'

/**
 * Alat gambar bersama untuk kesepuluh widget Integral.
 *
 * ASAL BERKAS INI
 * Isinya berasal dari `components/widget/grafik-fungsi/koordinat.ts`, yang
 * sendirinya berasal dari milik Limit. Disalin, bukan diimpor, karena berkas
 * itu berada di wilayah sesi lain dan aturan proyek melarang menyunting wilayah
 * sesi lain. Duplikasi ini disengaja dan dicatat di laporan sesi supaya MASTER
 * bisa menyatukannya sekali untuk semua topik setelah penggabungan.
 *
 * YANG DIBUANG dari versi Grafik Fungsi: `jalurParametrik` (Integral tidak
 * pernah menggambar bentuk yang bukan fungsi) dan `petak` yang usang.
 *
 * TAMBAHAN yang khas Integral, dan alasannya:
 *   `jalurDaerah`   daerah tertutup antara kurva dan sumbu x pada [a, b].
 *                   Dipakai enam widget. Kalau tiap widget menggambarnya
 *                   sendiri, "daerah di bawah sumbu" akan digambar berbeda di
 *                   tiap materi, dan justru itu yang harus konsisten.
 *   `jalurAntara`   daerah antara dua kurva, untuk widget Materi 10.
 *   `potongTanda`   memecah [a, b] di tempat f berganti tanda. Inti Materi 09
 *                   adalah bahwa pemecahan itu WAJIB, jadi alatnya harus ada
 *                   di satu tempat dan dipakai ulang, bukan ditulis ulang.
 *
 * ATURAN PROYEK yang dijaga berkas ini: bingkai wajib menyesuaikan otomatis dan
 * memberi tahu penggunanya lewat penunjuk skala. Widget tidak boleh memotong
 * gambarnya sendiri.
 */

/** Ukuran bidang gambar SVG. Sama untuk semua widget topik ini supaya seragam. */
export const VW = 460
export const VH = 320

/**
 * Ruang tepi bidang gambar. `atas` dan `bawah` sengaja lebar: keterangan widget
 * TIDAK PERNAH digambar di dalam kotak grafik, melainkan di pita miliknya
 * sendiri, sehingga tabrakan teks dengan kurva tidak mungkin terjadi.
 */
export const TEPI = { kiri: 44, kanan: 18, atas: 52, bawah: 42 }

/** Batas panjang satu baris keterangan, dalam huruf. */
export const MAKS_HURUF_CATATAN = 60

export const KOTAK = {
  x0: TEPI.kiri,
  y0: TEPI.atas,
  x1: VW - TEPI.kanan,
  y1: VH - TEPI.bawah,
}

export type Jendela = { xMin: number; xMax: number; yMin: number; yMax: number }

/** Jendela yang ditulis langsung. Sekadar supaya niatnya terbaca di widget. */
export function jendelaTetap(xMin: number, xMax: number, yMin: number, yMax: number): Jendela {
  return { xMin, xMax, yMin, yMax }
}

/** Ubah koordinat matematika menjadi koordinat layar SVG. */
export function keLayar(j: Jendela) {
  const lebar = KOTAK.x1 - KOTAK.x0
  const tinggi = KOTAK.y1 - KOTAK.y0
  return {
    x: (x: number) => KOTAK.x0 + ((x - j.xMin) / (j.xMax - j.xMin)) * lebar,
    /** sumbu y layar terbalik: nilai besar ada di ATAS */
    y: (y: number) => KOTAK.y1 - ((y - j.yMin) / (j.yMax - j.yMin)) * tinggi,
  }
}

/** Kebalikan `keLayar`, dibutuhkan widget yang titiknya bisa diseret. */
export function keMatematika(j: Jendela) {
  const lebar = KOTAK.x1 - KOTAK.x0
  const tinggi = KOTAK.y1 - KOTAK.y0
  return {
    x: (px: number) => j.xMin + ((px - KOTAK.x0) / lebar) * (j.xMax - j.xMin),
    y: (py: number) => j.yMin + ((KOTAK.y1 - py) / tinggi) * (j.yMax - j.yMin),
  }
}

/** Angka Indonesia: koma sebagai pemisah desimal, nol di belakang dibuang. */
export function angka(n: number, desimal = 2): string {
  if (!Number.isFinite(n)) return n > 0 ? 'tak hingga' : 'minus tak hingga'
  const s = n.toFixed(desimal)
  const rapi = s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s
  return (rapi === '-0' ? '0' : rapi).replace('.', ',')
}

/**
 * Penunjuk skala, wajib ditampilkan tiap widget yang bisa berubah tampilan.
 * Isinya seberapa lebar bidang yang sedang terlihat, supaya siswa tahu ia
 * sedang mengintip sedekat apa.
 */
export function labelSkala(j: Jendela): string {
  const lebar = j.xMax - j.xMin
  const desimal = lebar < 0.01 ? 5 : lebar < 0.1 ? 4 : lebar < 1 ? 3 : 2
  return `lebar tampilan ${angka(lebar, desimal)} satuan`
}

/**
 * Jalur SVG untuk sebuah fungsi.
 *
 * Jalurnya DIPUTUS di tempat fungsinya meledak atau tidak terdefinisi, supaya
 * asimtot tegak tidak digambar sebagai garis miring raksasa yang menyeberangi
 * layar.
 */
export function jalurFungsi(f: (x: number) => number, j: Jendela, langkah = 400): string {
  const p = keLayar(j)
  const potongan: string[] = []
  let menyambung = false

  for (let i = 0; i <= langkah; i++) {
    const x = j.xMin + ((j.xMax - j.xMin) * i) / langkah
    const y = f(x)
    if (!Number.isFinite(y) || y < j.yMin - (j.yMax - j.yMin) || y > j.yMax + (j.yMax - j.yMin)) {
      menyambung = false
      continue
    }
    potongan.push(`${menyambung ? 'L' : 'M'} ${p.x(x).toFixed(2)} ${p.y(y).toFixed(2)}`)
    menyambung = true
  }
  return potongan.join(' ')
}

/**
 * Daerah tertutup antara kurva f dan sumbu x, dari a sampai b.
 *
 * Turun ke sumbu di kedua ujungnya lalu ditutup, jadi bagian yang berada di
 * BAWAH sumbu ikut terwarnai sebagaimana adanya. Itu memang yang harus terlihat:
 * seluruh Materi 09 bertumpu pada siswa melihat dua daerah yang letaknya beda
 * sisi terhadap sumbu.
 *
 * Kalau a dan b terbalik, keduanya ditukar lebih dulu. Jalur berlebar negatif
 * digambar peramban sebagai bentuk yang melipat dirinya sendiri, dan itu
 * tampilan yang membohongi.
 */
export function jalurDaerah(
  f: (x: number) => number,
  a: number,
  b: number,
  j: Jendela,
  langkah = 240,
): string {
  const [kiri, kanan] = a <= b ? [a, b] : [b, a]
  if (!(kanan > kiri)) return ''
  const p = keLayar(j)
  const nol = p.y(0)
  const titik: string[] = [`M ${p.x(kiri).toFixed(2)} ${nol.toFixed(2)}`]

  for (let i = 0; i <= langkah; i++) {
    const x = kiri + ((kanan - kiri) * i) / langkah
    const y = f(x)
    if (!Number.isFinite(y)) continue
    titik.push(`L ${p.x(x).toFixed(2)} ${p.y(y).toFixed(2)}`)
  }
  titik.push(`L ${p.x(kanan).toFixed(2)} ${nol.toFixed(2)}`, 'Z')
  return titik.join(' ')
}

/** Daerah antara dua kurva dari a sampai b. Dipakai widget Materi 10. */
export function jalurAntara(
  atas: (x: number) => number,
  bawah: (x: number) => number,
  a: number,
  b: number,
  j: Jendela,
  langkah = 240,
): string {
  const [kiri, kanan] = a <= b ? [a, b] : [b, a]
  if (!(kanan > kiri)) return ''
  const p = keLayar(j)
  const atasnya: string[] = []
  const bawahnya: string[] = []

  for (let i = 0; i <= langkah; i++) {
    const x = kiri + ((kanan - kiri) * i) / langkah
    const ya = atas(x)
    const yb = bawah(x)
    if (!Number.isFinite(ya) || !Number.isFinite(yb)) continue
    atasnya.push(`${atasnya.length === 0 ? 'M' : 'L'} ${p.x(x).toFixed(2)} ${p.y(ya).toFixed(2)}`)
    bawahnya.push(`L ${p.x(x).toFixed(2)} ${p.y(yb).toFixed(2)}`)
  }
  if (atasnya.length === 0) return ''
  return [...atasnya, ...bawahnya.reverse(), 'Z'].join(' ')
}

/**
 * Pecah [a, b] di tempat f berganti tanda, dan sebutkan tanda tiap potongan.
 *
 * Dicari dengan mengubah tanda lalu membagi dua berulang, bukan dengan rumus
 * akar: widgetnya harus bekerja untuk fungsi apa pun yang dipilih siswa, bukan
 * hanya untuk polinom yang akarnya diketahui sebelumnya.
 *
 * Toleransi 1e-9 pada nilai f dianggap nol. Tanpa itu, akar yang persis di
 * batas selang (misalnya x = 0 pada f = x^2 - 4x, selang [0, 6]) menghasilkan
 * potongan berlebar nol yang mengacaukan pewarnaan.
 */
export function potongTanda(
  f: (x: number) => number,
  a: number,
  b: number,
  bagi = 400,
): Array<{ dari: number; sampai: number; positif: boolean }> {
  if (!(b > a)) return []
  const batas: number[] = [a]
  let x0 = a
  let y0 = f(a)

  for (let i = 1; i <= bagi; i++) {
    const x1 = a + ((b - a) * i) / bagi
    const y1 = f(x1)
    if (Number.isFinite(y0) && Number.isFinite(y1) && y0 * y1 < 0) {
      // bagi dua sampai selangnya cukup sempit; 60 putaran jauh lebih dari cukup
      let lo = x0
      let hi = x1
      let ylo = y0
      for (let k = 0; k < 60; k++) {
        const tengah = (lo + hi) / 2
        const ytengah = f(tengah)
        if (ylo * ytengah <= 0) hi = tengah
        else { lo = tengah; ylo = ytengah }
      }
      batas.push((lo + hi) / 2)
    }
    x0 = x1
    y0 = y1
  }
  batas.push(b)

  const hasil: Array<{ dari: number; sampai: number; positif: boolean }> = []
  for (let i = 0; i < batas.length - 1; i++) {
    const dari = batas[i]
    const sampai = batas[i + 1]
    if (!(sampai - dari > 1e-9)) continue
    const y = f((dari + sampai) / 2)
    hasil.push({ dari, sampai, positif: y >= 0 })
  }
  return hasil
}

/** Warna yang dipakai bersama, supaya kaitannya dengan video dan topik lain utuh. */
export const GARIS_PETAK = '#D6CDBC'
export const GARIS_SUMBU = '#C9BFAE'
export const MONO = 'var(--font-mono), sans-serif'

/**
 * Dua warna daerah, dan kenapa dibedakan.
 *
 * Biru untuk daerah di atas sumbu, merah bata untuk yang di bawah. Pembedaan
 * ini bukan hiasan: ia satu-satunya cara siswa melihat, tanpa membaca angka,
 * bahwa dua bagian sebuah daerah masuk hitungan dengan tanda yang berlawanan.
 */
export const DAERAH_ATAS = '#3E6E8E'
export const DAERAH_BAWAH = '#B3503C'

export { WARNA }
