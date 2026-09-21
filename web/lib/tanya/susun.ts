/**
 * Menyusun blok system dan pesan untuk Anthropic Messages API dari bekal
 * materi dan permintaan siswa. Blok A (aturan) dan blok B (bekal) di cache;
 * blok C (potongan hasil pencarian) tanpa cache karena berubah tiap pertanyaan.
 */
import type { BekalMateri, PermintaanTanya, Potongan } from './jenis'
import { ATURAN } from './aturan.ts'

export type BlokSistem = { type: 'text'; text: string; cache_control?: { type: 'ephemeral'; ttl?: '5m' | '1h' } }
export type IsiPesan =
  | { type: 'text'; text: string }
  | { type: 'image'; source: { type: 'base64'; media_type: string; data: string } }
export type PesanModel = { role: 'user' | 'assistant'; content: string | IsiPesan[] }

const dua = (n: number) => String(n).padStart(2, '0')

/** Blok B: bekal materi sebagai teks; label sumber tanpa nama berkas atau kurikulum. */
export function teksBekal(b: BekalMateri): string {
  const tetangga = (t: BekalMateri['sebelum'], kata: string) =>
    t ? `${kata}: Materi ${dua(t.no)} "${t.judul}" [[${b.bab}:${t.slug}]]` : ''
  const bagian = [
    [
      'BEKAL MATERI',
      `Bab: ${b.namaBab} (${b.bab})${b.sub ? `, sub-bab ${b.sub.huruf} ${b.sub.nama}` : ''}`,
      `Materi ${dua(b.no)}: ${b.judul} [[${b.bab}:${b.slug}]]`,
      `Pertanyaan pembuka: ${b.pertanyaan}`,
      tetangga(b.sebelum, 'Materi sebelumnya'),
      tetangga(b.sesudah, 'Materi berikutnya'),
    ]
      .filter(Boolean)
      .join('\n'),
    b.daftar?.length
      ? `DAFTAR MATERI BAB INI (tautan [[bab:slug]] hanya boleh memakai slug dari daftar ini)\n${b.daftar.map((d) => `Materi ${dua(d.no)}: ${d.judul} [[${b.bab}:${d.slug}]]`).join('\n')}`
      : '',
    `TEKS MATERI MANTRA\n${b.bacaan}`,
    `ISTILAH MANTRA (istilah ini yang dipakai)\n${b.istilah.map((i) => `- ${i.istilah}: ${i.arti}`).join('\n')}`,
  ]
  for (const k of b.kutipan) {
    bagian.push(`RUJUKAN (${k.label}; jelaskan ulang dengan kata sendiri, jangan dikutip)\n${k.teks}`)
  }
  return bagian.filter(Boolean).join('\n\n')
}

export function susun(
  bekal: BekalMateri,
  p: PermintaanTanya,
  potongan: Potongan[],
  ttl: '5m' | '1h',
): { sistem: BlokSistem[]; pesan: PesanModel[] } {
  // ttl 5 menit adalah bawaan API dan medannya tidak dikenal tanpa header beta:
  // ditulis hanya untuk 1 jam
  const cache = ttl === '1h' ? { type: 'ephemeral' as const, ttl } : { type: 'ephemeral' as const }
  const sistem: BlokSistem[] = [
    { type: 'text', text: ATURAN, cache_control: cache },
    { type: 'text', text: teksBekal(bekal), cache_control: cache },
  ]
  if (potongan.length) {
    sistem.push({
      type: 'text',
      text: `POTONGAN TERKAIT PERTANYAAN INI\n${potongan.map((x) => `[${x.judul}] ${x.teks}`).join('\n\n')}`,
    })
  }
  const riwayat: PesanModel[] = p.riwayat.map((r) => ({ role: r.peran === 'siswa' ? 'user' : 'assistant', content: r.teks }))
  const isi: IsiPesan[] = []
  if (p.gambar) isi.push({ type: 'image', source: { type: 'base64', media_type: p.gambar.jenis, data: p.gambar.data } })
  const baris: string[] = []
  if (p.kutipan) baris.push(`<kutipan>${p.kutipan}</kutipan>`)
  baris.push(
    p.pertanyaan
      ? `Pertanyaan siswa: ${p.pertanyaan}`
      : p.kutipan
        ? 'Jelaskan kutipan itu dengan bahasa yang lebih mudah.'
        : 'Jelaskan gambar ini.',
  )
  isi.push({ type: 'text', text: baris.join('\n') })
  // Riwayat harus berselang peran dan berakhir pada asisten sebelum pesan
  // baru; giliran yang melanggar (jawaban yang gagal terkirim) dibuang.
  const rapi: PesanModel[] = []
  for (const m of riwayat) if (!rapi.length || rapi[rapi.length - 1].role !== m.role) rapi.push(m)
  if (rapi.length && rapi[rapi.length - 1].role === 'user') rapi.pop()
  rapi.push({ role: 'user', content: isi })
  return { sistem, pesan: rapi }
}
