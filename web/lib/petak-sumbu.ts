/**
 * Angka pada sumbu, SATU aturan untuk semua bidang.
 *
 * Sampai 5 Sep 2026 fungsi `petak(min, maks, target)` disalin lima kali persis
 * sama (vektor, limit, grafik fungsi, statistika, transformasi), dan tiap
 * pemanggil menebak `target` sendiri: 5, 6, atau 7 label. Hasilnya tidak
 * seragam, dan pada lebar 15,68 satuan dengan target 7 langkahnya jadi 5,
 * sehingga sumbu Transformasi melompat dari 0 langsung ke 5. ARYA menemukannya
 * dan meminta angka yang rinci.
 *
 * Aturan yang baru tidak menebak jumlah label. Ia menghitung dari RUANG yang
 * tersedia: dari calon langkah 0,5 · 1 · 2 · 5 · 10 · 20 · 50 dipilih yang
 * TERKECIL yang masih menyisakan jarak `jarakMin` satuan gambar antara dua
 * label. Karena semua bidang memakai viewBox 460 lebar, jarak dalam satuan
 * gambar itu tetap, dan hasilnya sama di laptop maupun HP: di HP seluruh
 * gambarnya yang mengecil, termasuk hurufnya, jadi labelnya tetap tidak
 * bertabrakan.
 *
 * Akibat yang dijamin (lebar kotak sekitar 400 satuan gambar):
 * - lebar sampai 15 satuan: tiap bilangan bulat berlabel;
 * - lompatan 0 ke 5 baru terjadi di atas 75 satuan, bukan 15.
 */

export type Petak = { nilai: number; label: string }

const CALON_LANGKAH = [0.5, 1, 2, 5, 10, 20, 50, 100]

/** Angka Indonesia: koma sebagai pemisah desimal, nol di belakang dibuang. */
function angka(n: number, desimal: number): string {
  const s = n.toFixed(desimal)
  const rapi = s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s
  return (rapi === '-0' ? '0' : rapi).replace('.', ',')
}

export function petakSumbu(
  min: number,
  maks: number,
  /** panjang sumbu itu dalam satuan gambar (viewBox), bukan piksel layar */
  panjangGambar: number,
  /** jarak minimum antara dua label, satuan gambar. 26 cukup untuk "-10". */
  jarakMin = 26,
): Petak[] {
  const rentang = maks - min
  if (!Number.isFinite(rentang) || rentang <= 0 || panjangGambar <= 0) return []

  const gambarPerSatuan = panjangGambar / rentang
  const langkah =
    CALON_LANGKAH.find((l) => l * gambarPerSatuan >= jarakMin) ??
    CALON_LANGKAH[CALON_LANGKAH.length - 1]

  const desimal = langkah < 1 ? 1 : 0
  const hasil: Petak[] = []
  for (let n = Math.ceil(min / langkah) * langkah; n <= maks + langkah * 1e-9; n += langkah) {
    const nilai = Math.abs(n) < langkah * 1e-9 ? 0 : n
    hasil.push({ nilai, label: angka(nilai, desimal) })
  }
  return hasil
}

/**
 * Garis kisi HALUS di antara label, setengah langkah. Dipakai supaya titik
 * pecahan tetap bisa ditaksir walau labelnya cuma tiap bilangan bulat.
 * Mengembalikan nilai saja, tanpa label.
 */
export function kisiHalus(petak: Petak[], min: number, maks: number): number[] {
  if (petak.length < 2) return []
  const langkah = petak[1].nilai - petak[0].nilai
  const setengah = langkah / 2
  const hasil: number[] = []
  for (let n = Math.ceil(min / setengah) * setengah; n <= maks + setengah * 1e-9; n += setengah) {
    // Lewati yang sudah punya label.
    if (Math.abs((n / langkah) - Math.round(n / langkah)) < 1e-9) continue
    hasil.push(n)
  }
  return hasil
}
