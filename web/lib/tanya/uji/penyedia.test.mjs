import test from 'node:test'
import assert from 'node:assert/strict'
import { panggilModel } from '../penyedia.ts'

function aliranSse(baris) {
  return new Response(new ReadableStream({
    start(c) { for (const b of baris) c.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(b)}\n\n`)); c.close() },
  }), { status: 200 })
}

test('merangkai text_delta, membaca stop_reason dan pemakaian tanpa dobel', async () => {
  process.env.ANTHROPIC_API_KEY = 'uji'
  const potongan = []
  const hasil = await panggilModel({ sistem: [{ type: 'text', text: 'a', cache_control: { type: 'ephemeral', ttl: '1h' } }], pesan: [{ role: 'user', content: 'x' }] }, (t) => potongan.push(t), async () => aliranSse([
    { type: 'message_start', message: { usage: { input_tokens: 10, cache_read_input_tokens: 900 } } },
    { type: 'content_block_delta', delta: { type: 'text_delta', text: 'Halo ' } },
    { type: 'content_block_delta', delta: { type: 'text_delta', text: 'siswa' } },
    { type: 'message_delta', delta: { stop_reason: 'end_turn' }, usage: { output_tokens: 5, input_tokens: 10, cache_read_input_tokens: 900 } },
  ]))
  assert.equal(hasil.teks, 'Halo siswa')
  assert.deepEqual(potongan, ['Halo ', 'siswa'])
  assert.equal(hasil.alasanBerhenti, 'end_turn')
  assert.deepEqual(hasil.pemakaian, { masuk: 10, keluar: 5, cacheTulis: 0, cacheBaca: 900 })
})

test('TTL 1 jam ditolak API: mundur ke 5 menit tanpa header beta', async () => {
  process.env.ANTHROPIC_API_KEY = 'uji'
  const panggilan = []
  const hasil = await panggilModel({ sistem: [{ type: 'text', text: 'a', cache_control: { type: 'ephemeral', ttl: '1h' } }], pesan: [{ role: 'user', content: 'x' }] }, undefined, async (url, init) => {
    panggilan.push({ beta: init.headers['anthropic-beta'], ttl: JSON.parse(init.body).system[0].cache_control.ttl, model: JSON.parse(init.body).model })
    if (panggilan.length === 1) return new Response('{"error":"ttl"}', { status: 400 })
    return aliranSse([{ type: 'content_block_delta', delta: { type: 'text_delta', text: 'ok' } }, { type: 'message_delta', delta: { stop_reason: 'end_turn' }, usage: { output_tokens: 1 } }])
  })
  assert.equal(hasil.teks, 'ok')
  assert.equal(panggilan[0].beta, 'extended-cache-ttl-2025-04-11')
  assert.equal(panggilan[0].model, 'claude-haiku-4-5')
  assert.equal(panggilan[1].beta, undefined)
  assert.equal(panggilan[1].ttl, undefined)
})

test('galat API dilempar dengan status', async () => {
  process.env.ANTHROPIC_API_KEY = 'uji'
  await assert.rejects(
    panggilModel({ sistem: [{ type: 'text', text: 'a' }], pesan: [{ role: 'user', content: 'x' }] }, undefined, async () => new Response('overloaded', { status: 529 })),
    /Anthropic 529/,
  )
})
