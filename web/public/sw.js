/* Petugas simpanan video MANTRA (service worker), 15 Sep 2026.
 *
 * Tugasnya SATU: kalau sebuah video sudah tersimpan di perangkat siswa (Cache
 * Storage), permintaan pemutar dijawab dari simpanan itu, termasuk permintaan
 * Range untuk menggeser waktu. Yang belum tersimpan diteruskan ke jaringan
 * persis seperti tanpa petugas. Permintaan lain (halaman, gambar, subtitle,
 * skrip) TIDAK disentuh sama sekali: tidak ada respondWith.
 *
 * Yang MENGISI simpanan bukan petugas ini, melainkan halaman
 * (lib/simpanan-video.ts, dipanggil PemutarVideo saat video ditonton hampir
 * habis): halaman mengunduh berkas utuh lalu menaruhnya di Cache Storage.
 * Sengaja begitu, bukan "menyalin arus sambil diputar" di sini, sebab arus
 * buatan JavaScript di service worker ikut mati bila petugasnya dihentikan
 * peramban (Chrome mematikan petugas yang menganggur 30 detik, dan
 * membatasi satu peristiwa 5 menit), dan yang mati itu pemutaran videonya.
 * Jawaban dari simpanan berupa Blob dan jawaban jaringan berupa fetch biasa;
 * keduanya tidak butuh petugas tetap hidup.
 *
 * Alamat video memuat sidik ?v=, jadi satu alamat = satu isi; versi lama
 * dibuang oleh halaman saat versi baru tersimpan.
 *
 * Jawaban dari simpanan membawa tajuk `x-mantra-simpanan: ada` supaya halaman
 * dan pengujian bisa membedakannya dari jawaban jaringan.
 */
const NAMA_SIMPANAN = 'mantra-video-v1'
const POLA_VIDEO = /\/[A-Za-z0-9._-]+\.(mp4|webm)$/
const TAJUK_DISALIN = ['content-type', 'etag', 'cache-control', 'last-modified']

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))

function alamatVideo(req) {
  if (req.method !== 'GET') return null
  const u = new URL(req.url)
  if (!POLA_VIDEO.test(u.pathname)) return null
  // &j=1 = halaman memutuskan elemen ini memakai JARINGAN sepanjang hidupnya
  // (belum tersimpan saat elemennya dibuat). Tidak disentuh sama sekali:
  // Chrome menolak jawaban Range yang berpindah sumber di tengah jalan
  // ("FFmpegDemuxer: data source error", uji 15 Sep 2026), jadi satu elemen
  // hanya boleh dilayani satu sumber, dan sumber jaringan paling aman tanpa
  // petugas di tengahnya.
  if (u.searchParams.has('j')) return null
  const sendiri = u.origin === self.location.origin && u.pathname.startsWith('/anim/')
  const worker = u.hostname.endsWith('.workers.dev')
  return sendiri || worker ? u : null
}

self.addEventListener('fetch', (event) => {
  const u = alamatVideo(event.request)
  if (!u) return
  event.respondWith(
    (async () => {
      try {
        const cache = await caches.open(NAMA_SIMPANAN)
        const tersimpan = await cache.match(u.href)
        if (tersimpan) return await dariSimpanan(tersimpan, event.request)
      } catch {
        // simpanan tidak bisa dibaca: pakai jaringan
      }
      // Sampai di sini hanya bila elemen yang diputuskan "dari simpanan"
      // ternyata simpanannya sudah lenyap (dihapus peramban karena memori
      // penuh). Pemutar akan gagal dan menawarkan "Coba lagi", yang membuat
      // elemen baru dengan keputusan jaringan.
      return fetch(event.request)
    })(),
  )
})

async function dariSimpanan(tersimpan, req) {
  const blob = await tersimpan.blob()
  const total = blob.size
  const h = new Headers()
  for (const k of TAJUK_DISALIN) {
    const v = tersimpan.headers.get(k)
    if (v) h.set(k, v)
  }
  h.set('accept-ranges', 'bytes')
  h.set('x-mantra-simpanan', 'ada')
  const range = (req.headers.get('range') || '').trim()
  const m = /^bytes=(\d*)-(\d*)$/i.exec(range)
  if (!range || !m || (m[1] === '' && m[2] === '')) {
    h.set('content-length', String(total))
    return new Response(blob, { status: 200, headers: h })
  }
  let awal
  let akhir
  if (m[1] === '') {
    const n = Math.min(Number(m[2]), total)
    awal = total - n
    akhir = total - 1
  } else {
    awal = Number(m[1])
    akhir = m[2] === '' ? total - 1 : Math.min(Number(m[2]), total - 1)
  }
  if (awal >= total || awal > akhir) {
    h.set('content-range', `bytes */${total}`)
    return new Response(null, { status: 416, headers: h })
  }
  h.set('content-range', `bytes ${awal}-${akhir}/${total}`)
  h.set('content-length', String(akhir - awal + 1))
  return new Response(blob.slice(awal, akhir + 1), { status: 206, headers: h })
}
