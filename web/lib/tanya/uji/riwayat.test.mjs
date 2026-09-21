import test from 'node:test'
import assert from 'node:assert/strict'

// localStorage tiruan sebelum modulnya dimuat (simpanan.ts memakai global)
const gudang = new Map()
globalThis.localStorage = {
  getItem: (k) => (gudang.has(k) ? gudang.get(k) : null),
  setItem: (k, v) => gudang.set(k, String(v)),
  removeItem: (k) => gudang.delete(k),
  key: (i) => [...gudang.keys()][i] ?? null,
  get length() {
    return gudang.size
  },
}
const { bacaRiwayat, tulisRiwayat, hapusRiwayat, daftarRiwayat, sidikRiwayat, umurTeks, sisaHari } = await import('../riwayat.ts')

const HARI = 24 * 3600 * 1000
const pesan = (n) => Array.from({ length: n }, (_, i) => ({ peran: i % 2 ? 'asisten' : 'siswa', teks: `p${i}` }))

test('tulis lalu baca; bentuk lama (array) masih terbaca', () => {
  gudang.clear()
  tulisRiwayat('limit', 'mendekati', pesan(4), 1000)
  assert.equal(bacaRiwayat('limit', 'mendekati', 2000).length, 4)
  gudang.set('matra:tanya:limit:lubang', JSON.stringify(pesan(2)))
  assert.equal(bacaRiwayat('limit', 'lubang', 2000).length, 2)
})

test('kedaluwarsa 7 hari: dihapus saat dibaca dan tidak muncul di daftar', () => {
  gudang.clear()
  tulisRiwayat('limit', 'mendekati', pesan(2), 0)
  tulisRiwayat('limit', 'lubang', pesan(2), 6 * HARI)
  assert.equal(bacaRiwayat('limit', 'mendekati', 7 * HARI + 1).length, 0)
  assert.equal(gudang.has('matra:tanya:limit:mendekati'), false)
  const daftar = daftarRiwayat('limit', 7 * HARI + 1)
  assert.deepEqual(daftar.map((p) => p.slug), ['lubang'])
  assert.equal(sisaHari(6 * HARI, 7 * HARI + 1), 6)
})

test('daftar per bab terbaru dulu, sidik berubah saat isinya berubah, hapus membersihkan', () => {
  gudang.clear()
  tulisRiwayat('limit', 'a', pesan(2), 100)
  tulisRiwayat('limit', 'b', pesan(4), 300)
  tulisRiwayat('turunan', 'c', pesan(2), 200)
  assert.deepEqual(daftarRiwayat('limit', 400).map((p) => p.slug), ['b', 'a'])
  const s1 = sidikRiwayat('limit', 400)
  tulisRiwayat('limit', 'a', pesan(6), 500)
  assert.notEqual(sidikRiwayat('limit', 600), s1)
  hapusRiwayat('limit', 'a')
  assert.equal(gudang.has('matra:tanya:limit:a'), false)
  assert.deepEqual(daftarRiwayat('limit', 600).map((p) => p.slug), ['b'])
  // di luar 7 hari semuanya lenyap dari sidik (dan dibersihkan dari gudang)
  assert.equal(sidikRiwayat('limit', 8 * HARI), '')
  assert.equal(gudang.has('matra:tanya:limit:b'), false)
  assert.equal(gudang.has('matra:tanya:turunan:c'), true)
})

test('paling banyak 12 pesan disimpan; umur teks', () => {
  gudang.clear()
  tulisRiwayat('limit', 'a', pesan(20), 100)
  assert.equal(bacaRiwayat('limit', 'a', 200).length, 12)
  assert.equal(umurTeks(0, 30 * 1000), 'baru saja')
  assert.equal(umurTeks(0, 5 * 60 * 1000), '5 menit lalu')
  assert.equal(umurTeks(0, 3 * 3600 * 1000), '3 jam lalu')
  assert.equal(umurTeks(0, 2 * HARI), '2 hari lalu')
})
