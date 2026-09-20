import test from 'node:test'
import assert from 'node:assert/strict'
import { buatIndeks, cari } from '../cari.ts'

const potongan = [
  { id: '1', bab: 'turunan', materi: 'a', sumber: 'mantra', judul: 'Laju rata-rata', teks: 'Laju rata-rata adalah perubahan dibagi selang waktu.' },
  { id: '2', bab: 'turunan', materi: 'b', sumber: 'mantra', judul: 'Aturan pangkat', teks: 'Turunan x pangkat n adalah n x pangkat n dikurangi satu.' },
  { id: '3', bab: 'turunan', materi: 'c', sumber: 'mantra', judul: 'Garis singgung', teks: 'Garis singgung menyentuh kurva di satu titik.' },
]

test('kueri menemukan potongan yang paling cocok lebih dulu', () => {
  const idx = buatIndeks(potongan)
  const hasil = cari(idx, 'apa itu aturan pangkat turunan dan laju', 2)
  assert.equal(hasil[0].id, '2')
  assert.equal(hasil[1].id, '1')
  assert.equal(hasil.length, 2)
  // potongan tanpa satu pun kata kueri tidak ikut, walau k lebih besar
  assert.equal(cari(idx, 'aturan pangkat', 3).length, 1)
})

test('kueri tanpa kata yang dikenal mengembalikan kosong', () => {
  assert.equal(cari(buatIndeks(potongan), 'zzz qqq').length, 0)
})
