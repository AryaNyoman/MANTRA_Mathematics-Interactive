import test from 'node:test'
import assert from 'node:assert/strict'
import { susun, teksBekal } from '../susun.ts'
import { ATURAN } from '../aturan.ts'

const bekal = {
  bab: 'turunan', namaBab: 'Turunan', sub: { huruf: 'A', nama: 'Laju' }, no: 1, slug: 'laju-rata-rata',
  judul: 'Laju rata-rata', pertanyaan: 'Kenapa?', sebelum: null, sesudah: { no: 2, slug: 'laju-sesaat', judul: 'Laju sesaat' },
  bacaan: 'Laju rata-rata adalah ...', istilah: [{ istilah: 'laju', arti: 'perubahan per waktu' }],
  kutipan: [{ sumber: 'lanjut-12', label: 'buku: laju', teks: 'Definisi laju ...', token: 4 }],
  token: { bacaan: 5, istilah: 4, kutipan: 4, total: 13 },
}

test('teks bekal memuat identitas, bacaan, istilah, kutipan tanpa nama berkas', () => {
  const t = teksBekal(bekal)
  assert.match(t, /Turunan/)
  assert.match(t, /laju: perubahan per waktu/)
  assert.match(t, /Definisi laju/)
  assert.match(t, /\[\[turunan:laju-sesaat\]\]/)
  assert.doesNotMatch(t, /lanjut-12|\.pdf/)
})

test('susun: aturan dan bekal di cache, kutipan dibungkus, potongan hanya bila ada', () => {
  const { sistem, pesan } = susun(bekal, { bab: 'turunan', materi: 'laju-rata-rata', kutipan: 'Laju rata-rata adalah ...', pertanyaan: '', riwayat: [], gambar: null }, [], '1h')
  assert.equal(sistem.length, 2)
  assert.equal(sistem[0].text, ATURAN)
  assert.deepEqual(sistem[0].cache_control, { type: 'ephemeral', ttl: '1h' })
  assert.deepEqual(sistem[1].cache_control, { type: 'ephemeral', ttl: '1h' })
  assert.equal(pesan.length, 1)
  assert.equal(pesan[0].role, 'user')
  const teks = pesan[0].content[0].text
  assert.match(teks, /<kutipan>Laju rata-rata adalah \.\.\.<\/kutipan>/)
  assert.match(teks, /Jelaskan kutipan itu/)
})

test('susun: riwayat berganti peran, gambar jadi blok image, potongan jadi blok ketiga tanpa cache', () => {
  const { sistem, pesan } = susun(bekal, {
    bab: 'turunan', materi: 'laju-rata-rata', kutipan: '', pertanyaan: 'apa ini?', gambar: { jenis: 'image/png', data: 'AAAA' },
    riwayat: [{ peran: 'siswa', teks: 'halo' }, { peran: 'asisten', teks: 'hai' }],
  }, [{ id: 'p', bab: 'turunan', materi: null, sumber: 'istilah', judul: 'laju', teks: 'laju: perubahan' }], '5m')
  assert.equal(sistem.length, 3)
  assert.equal(sistem[2].cache_control, undefined)
  assert.equal(pesan.length, 3)
  assert.equal(pesan[0].role, 'user'); assert.equal(pesan[1].role, 'assistant'); assert.equal(pesan[2].role, 'user')
  assert.equal(pesan[2].content[0].type, 'image')
})

test('susun: riwayat yang berakhir di siswa (jawaban gagal) dibuang supaya peran berselang', () => {
  const { pesan } = susun(bekal, {
    bab: 'turunan', materi: 'laju-rata-rata', kutipan: '', pertanyaan: 'lagi', gambar: null,
    riwayat: [{ peran: 'siswa', teks: 'satu' }, { peran: 'asisten', teks: 'dua' }, { peran: 'siswa', teks: 'tiga' }],
  }, [], '1h')
  assert.deepEqual(pesan.map((p) => p.role), ['user', 'assistant', 'user'])
  assert.equal(pesan[2].content[0].text, 'Pertanyaan siswa: lagi')
})
