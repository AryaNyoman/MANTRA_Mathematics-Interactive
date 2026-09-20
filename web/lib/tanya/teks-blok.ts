/**
 * Mengubah blok penjelasan (content/tipe.ts) jadi teks polos. Dipakai dua
 * tempat: alat/bekal_asisten.mjs (bekal untuk model) dan tombol "Jelaskan"
 * (teks blok yang dikirim sebagai kutipan). Impor RELATIF supaya Node bisa
 * memuatnya tanpa alias.
 */
import type { Blok } from '../../content/tipe'

/** salinan pecahKolom dari components/topik/Penjelasan.tsx */
function pecahKolom(baris: string): string[] {
  const kosongDepan = /^\s{2,}/.test(baris)
  const sel = baris.trim().split(/\s{2,}/).filter((s) => s.length > 0)
  return kosongDepan ? ['', ...sel] : sel
}

export function teksBlok(b: Blok): string {
  switch (b.jenis) {
    case 'paragraf':
      return b.teks
    case 'sesi':
      return `## ${b.judul}`
    case 'sorot':
      return `Kalimat kunci: ${b.teks}`
    case 'poin':
      return `${b.judul ? b.judul + ':' : 'Poin:'}\n${b.butir.map((x) => `- ${x}`).join('\n')}`
    case 'contoh': {
      const baris = b.baris.map((r) => pecahKolom(r).join(' | ')).join('; ')
      return `Contoh (${b.judul}): ${baris}${b.simpul ? `. ${b.simpul}` : ''}`
    }
    case 'coba':
      return `Yuk bereksperimen: ${b.teks}${b.langkah ? '\n' + b.langkah.map((l, i) => `${i + 1}. ${l}`).join('\n') : ''}`
  }
}

export function teksBacaan(t: {
  penjelasan: Blok[]
  seringKeliru?: { judul: string; isi: string }
  intisari?: string[]
}): string {
  const bagian = t.penjelasan.map(teksBlok)
  if (t.seringKeliru) bagian.push(`Sering keliru (${t.seringKeliru.judul}): ${t.seringKeliru.isi}`)
  if (t.intisari?.length) bagian.push(`Ringkasan:\n${t.intisari.map((x) => `- ${x}`).join('\n')}`)
  return bagian.join('\n\n')
}
