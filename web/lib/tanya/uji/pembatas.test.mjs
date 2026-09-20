import test from 'node:test'
import assert from 'node:assert/strict'
import { periksaJatah, kunciHari } from '../pembatas.ts'

test('kunci harian memakai tanggal WIB', () => {
  const k = kunciHari('1.2.3.4', new Date('2026-09-20T18:30:00Z')) // 01:30 WIB 21 Sep
  assert.equal(k, 'tanya:2026-09-21:1.2.3.4')
})

test('di bawah batas boleh, sisa dihitung; di atas batas ditolak', async () => {
  process.env.UPSTASH_REDIS_REST_URL = 'https://u.test'
  process.env.UPSTASH_REDIS_REST_TOKEN = 't'
  process.env.TANYA_BATAS_HARIAN = '20'
  delete process.env.TANYA_TANPA_PEMBATAS
  const buat = (n) => async () => new Response(JSON.stringify([{ result: n }, { result: 1 }]), { status: 200 })
  assert.deepEqual(await periksaJatah('1.2.3.4', buat(3)), { boleh: true, sisa: 17 })
  assert.deepEqual(await periksaJatah('1.2.3.4', buat(21)), { boleh: false, sisa: 0, alasan: 'habis' })
})

test('Upstash gagal atau tidak dikonfigurasi: menolak (gagal-tertutup)', async () => {
  process.env.UPSTASH_REDIS_REST_URL = 'https://u.test'
  process.env.UPSTASH_REDIS_REST_TOKEN = 't'
  delete process.env.TANYA_TANPA_PEMBATAS
  const h = await periksaJatah('1.2.3.4', async () => { throw new Error('putus') })
  assert.deepEqual(h, { boleh: false, sisa: 0, alasan: 'pembatas-mati' })
  delete process.env.UPSTASH_REDIS_REST_URL
  assert.equal((await periksaJatah('1.2.3.4')).alasan, 'pembatas-mati')
})

test('TANYA_TANPA_PEMBATAS=1 melewati pembatas (hanya lokal)', async () => {
  process.env.TANYA_TANPA_PEMBATAS = '1'
  assert.deepEqual(await periksaJatah('1.2.3.4'), { boleh: true, sisa: 20 })
  delete process.env.TANYA_TANPA_PEMBATAS
})
