// Worker Cloudflare "mantra-video": melayani video MANTRA dari bucket R2
// `mantra-anim` lewat alamat *.workers.dev.
//
// KENAPA ADA (15 Sep 2026): alamat publik bawaan R2 (pub-....r2.dev) diblokir
// Telkomsel lewat DNS (Internet Baik, IP 202.3.218.137), jadi siswa Indonesia
// tidak bisa memutar video dari sana. workers.dev dan pages.dev tidak diblokir.
// Worker ini cuma meneruskan GET/HEAD ke bucket dengan dukungan Range (untuk
// menggeser waktu video), ETag (304 bila peramban sudah punya salinannya),
// dan Cache-Control yang ditulis saat unggah (immutable setahun; alamat video
// memuat sidik ?v= sehingga salinan lama tidak pernah terpakai).
//
// Diterbitkan oleh alat/terbitkan_worker_video.py (API Cloudflare, tanpa
// wrangler). Binding R2 bernama VIDEO menunjuk ke bucket mantra-anim.

const POLA_NAMA = /^[A-Za-z0-9._-]+\.(mp4|webm)$/

function kepala(obj) {
  const h = new Headers()
  obj.writeHttpMetadata(h) // content-type dan cache-control dari saat unggah
  h.set('etag', obj.httpEtag)
  h.set('accept-ranges', 'bytes')
  h.set('access-control-allow-origin', '*')
  h.set('last-modified', obj.uploaded.toUTCString())
  if (!h.has('cache-control')) h.set('cache-control', 'public, max-age=31536000, immutable')
  return h
}

export default {
  async fetch(request, env) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Metode tidak didukung', { status: 405, headers: { allow: 'GET, HEAD' } })
    }
    const url = new URL(request.url)
    let kunci
    try {
      kunci = decodeURIComponent(url.pathname.replace(/^\/+/, ''))
    } catch {
      return new Response('Nama tidak sah', { status: 400 })
    }
    if (!POLA_NAMA.test(kunci)) return new Response('Tidak ada', { status: 404 })

    if (request.method === 'HEAD') {
      const obj = await env.VIDEO.head(kunci)
      if (!obj) return new Response(null, { status: 404 })
      const h = kepala(obj)
      h.set('content-length', String(obj.size))
      return new Response(null, { status: 200, headers: h })
    }

    let obj
    try {
      obj = await env.VIDEO.get(kunci, { range: request.headers, onlyIf: request.headers })
    } catch {
      // Range yang tidak masuk akal (di luar ukuran berkas)
      return new Response('Rentang tidak sah', { status: 416 })
    }
    if (!obj) return new Response('Tidak ada', { status: 404 })
    const h = kepala(obj)
    if (obj.body === undefined) {
      // prasyarat If-None-Match terpenuhi: peramban sudah punya isinya
      return new Response(null, { status: 304, headers: h })
    }
    let status = 200
    // Patokannya PERMINTAAN: hanya bila peramban mengirim Range, jawabannya
    // 206 berisi Content-Range. `obj.range` dari R2 tidak bisa dijadikan
    // patokan: ia terisi (offset 0, length penuh) walau tidak ada Range, dan
    // kuncinya ada semua dengan nilai undefined, sehingga `'suffix' in` pun
    // menyesatkan (uji 15 Sep 2026: GET biasa dijawab 206 "bytes NaN-NaN").
    const r = obj.range || {}
    if (request.headers.has('range')) {
      let awal
      let panjang
      if (r.suffix !== undefined) {
        panjang = Math.min(r.suffix, obj.size)
        awal = obj.size - panjang
      } else {
        awal = r.offset ?? 0
        panjang = r.length ?? obj.size - awal
      }
      h.set('content-range', `bytes ${awal}-${awal + panjang - 1}/${obj.size}`)
      h.set('content-length', String(panjang))
      status = 206
    } else {
      h.set('content-length', String(obj.size))
    }
    return new Response(obj.body, { status, headers: h })
  },
}
