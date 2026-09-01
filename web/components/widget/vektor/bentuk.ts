import { keLayar, sudutDerajat, type Jendela, type Kotak, type Vek } from './geometri'

/**
 * Bentuk bantu yang digambar dalam KOORDINAT LAYAR, bukan koordinat matematika.
 *
 * KENAPA DALAM PIKSEL LAYAR
 * Tanda siku-siku dan busur sudut adalah lambang, bukan besaran. Ukurannya
 * harus tetap enak dilihat berapa pun perbesaran bidangnya. Kalau digambar
 * dalam satuan matematika, keduanya ikut mengecil sampai tak terbaca begitu
 * jendelanya melebar.
 */

/** Tanda siku-siku di titik `sudut`, menghadap ke arah `ke1` dan `ke2`. */
export function siku(
  sudut: Vek, ke1: Vek, ke2: Vek, jendela: Jendela, kotak: Kotak, sisi = 9,
): string | null {
  const p = keLayar(jendela, kotak)
  const s = { x: p.x(sudut.x), y: p.y(sudut.y) }
  const arah = (t: Vek) => {
    const dx = p.x(t.x) - s.x
    const dy = p.y(t.y) - s.y
    const j = Math.hypot(dx, dy)
    return j < 1 ? null : { x: dx / j, y: dy / j }
  }
  const a = arah(ke1)
  const b = arah(ke2)
  if (!a || !b) return null

  const p1 = { x: s.x + a.x * sisi, y: s.y + a.y * sisi }
  const p2 = { x: s.x + b.x * sisi, y: s.y + b.y * sisi }
  const pojok = { x: p1.x + b.x * sisi, y: p1.y + b.y * sisi }
  return `M ${p1.x} ${p1.y} L ${pojok.x} ${pojok.y} L ${p2.x} ${p2.y}`
}

/**
 * Busur sudut dari sumbu x positif sampai arah vektor `v`, berpusat di `pusat`.
 * Jari-jarinya dalam piksel layar.
 */
export function busurDariSumbu(
  pusat: Vek, v: Vek, jendela: Jendela, kotak: Kotak, jari = 30,
): string | null {
  const derajat = sudutDerajat(v)
  if (derajat === 0) return null
  const p = keLayar(jendela, kotak)
  const cx = p.x(pusat.x)
  const cy = p.y(pusat.y)
  const rad = (derajat * Math.PI) / 180

  const x1 = cx + jari
  const y1 = cy
  const x2 = cx + jari * Math.cos(rad)
  // sumbu y layar terbalik, jadi sinusnya dikurangkan
  const y2 = cy - jari * Math.sin(rad)
  const besar = derajat > 180 ? 1 : 0
  // sapuan 0 berarti berlawanan arah jarum jam di layar, dan itu yang benar
  // karena sudut positif diukur berlawanan arah jarum jam
  return `M ${x1} ${y1} A ${jari} ${jari} 0 ${besar} 0 ${x2} ${y2}`
}
