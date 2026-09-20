import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { kemas, taksirToken, potong } from '../bekal_asisten.mjs'

test('taksiran token 3,4 huruf per token', () => {
  assert.equal(taksirToken('a'.repeat(340)), 100)
})

test('potong membagi teks panjang jadi potongan 300 sampai 500 token dengan judul', () => {
  const p = potong({ bab: 'turunan', materi: 'x', sumber: 'mantra', judul: 'Judul' }, 'kalimat satu. '.repeat(600))
  assert.ok(p.length >= 3)
  for (const x of p) assert.ok(taksirToken(x.teks) <= 520, `potongan ${taksirToken(x.teks)} token`)
  assert.equal(p[0].id, 'turunan:x:mantra:0')
})

test('kemas satu bab menulis bekal, indeks, dan potongan', async () => {
  const keluar = mkdtempSync(path.join(tmpdir(), 'bekal-'))
  const hasil = await kemas(['turunan'], { keluar })
  assert.ok(hasil.materi > 5)
  const satu = JSON.parse(readFileSync(path.join(keluar, 'turunan', 'laju-rata-rata.json'), 'utf8'))
  assert.equal(satu.bab, 'turunan')
  assert.match(satu.bacaan, /laju/i)
  assert.ok(satu.istilah.length >= 15)
  assert.ok(satu.token.total <= 12000 && satu.token.total >= 2000, `total ${satu.token.total}`)
  assert.ok(existsSync(path.join(keluar, 'indeks.json')))
  assert.ok(existsSync(path.join(keluar, 'potongan', 'turunan.json')))
})
