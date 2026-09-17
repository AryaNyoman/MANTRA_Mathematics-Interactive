/**
 * Menampilkan hasil pengubah rumus (web/lib/mat-latex.ts) untuk teks yang
 * diberikan lewat argumen, satu per baris: potongan prosa dan LaTeX-nya.
 *
 *   node alat/lihat_latex.ts "Hasilnya x⁶/6 + C." "(1/2) ∫ u⁵ du"
 */
import { pisahkan } from '../web/lib/mat-latex.ts'

for (const teks of process.argv.slice(2)) {
  console.log(`> ${teks}`)
  for (const p of pisahkan(teks)) {
    console.log(p.jenis === 'prosa' ? `    prosa: "${p.teks}"` : `    MAT  : "${p.teks}"  ->  ${p.latex}`)
  }
}
