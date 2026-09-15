(async () => {
  const INDEKS = Number(new URLSearchParams(location.search).get('p') || 0)
  const JARAK = 60
  const LANGKAH = 6
  Element.prototype.setPointerCapture = function () {}
  Element.prototype.releasePointerCapture = function () {}
  Element.prototype.hasPointerCapture = function () { return true }
  const wadahs = [...document.querySelectorAll('.layar')].filter((w) => !w.querySelector('video'))
  if (!wadahs.length) return JSON.stringify({ tanpaWidget: true })
  const judul = (document.querySelector('h1')?.textContent || '').trim()
  const punya = []
  for (const wadah of wadahs) {
    for (const el of wadah.querySelectorAll('*')) {
      const k = Object.keys(el).find((k) => k.startsWith('__reactProps'))
      if (k && el[k] && typeof el[k].onPointerDown === 'function') punya.push(el)
    }
  }
  if (INDEKS >= punya.length) return JSON.stringify({ selesai: true, jumlah: punya.length, judul })
  const el = punya[INDEKS]
  const svg = el.closest('svg') || el.querySelector('svg') || el
  const ambil = () => [...svg.querySelectorAll('circle,ellipse,line,path,polygon,polyline,rect,text')]
    .map((x) => { const r = x.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 } })
  const teksKendali = () => (document.querySelector('.kendali')?.innerText || '').replace(/\s+/g, ' ').trim()
  // titik mulai: lingkaran terbesar di dalam elemen (pegangan), kalau ada
  let sasaran = el
  const lingkar = [...el.querySelectorAll('circle')].filter((c) => c.getBoundingClientRect().width > 6)
    .sort((a, b) => b.getBoundingClientRect().width - a.getBoundingClientRect().width)[0]
  if (lingkar) sasaran = lingkar
  const jenis = el.tagName + (lingkar ? '>circle' : '')
  const ev = (type, x, y, t) => t.dispatchEvent(new PointerEvent(type, { bubbles: true, cancelable: true, clientX: x, clientY: y, pointerId: 1, isPrimary: true, button: 0, buttons: type === 'pointerup' ? 0 : 1, pointerType: 'mouse' }))
  const seret = async (dx, dy) => {
    const r0 = sasaran.getBoundingClientRect()
    const x0 = r0.left + r0.width / 2, y0 = r0.top + r0.height / 2
    const sebelum = ambil()
    const k0 = teksKendali()
    const vb0 = svg.getAttribute && svg.getAttribute('viewBox')
    ev('pointerdown', x0, y0, sasaran)
    for (let i = 1; i <= LANGKAH; i++) {
      const x = x0 + dx * (JARAK * i / LANGKAH), y = y0 + dy * (JARAK * i / LANGKAH)
      ev('pointermove', x, y, sasaran)
      await new Promise((r) => setTimeout(r, 20))
    }
    ev('pointerup', x0 + dx * JARAK, y0 + dy * JARAK, sasaran)
    await new Promise((r) => setTimeout(r, 200))
    const sesudah = ambil()
    let maks = -1, bergerak = 0
    if (sebelum.length === sesudah.length) {
      maks = 0
      for (let i = 0; i < sebelum.length; i++) {
        const d = Math.hypot(sesudah[i].x - sebelum[i].x, sesudah[i].y - sebelum[i].y)
        if (d > 0.5) bergerak++
        if (d > maks) maks = d
      }
    }
    const r1 = sasaran.getBoundingClientRect()
    const geserPegangan = Math.hypot(r1.left - r0.left, r1.top - r0.top)
    const k1 = teksKendali()
    return { maks: Math.round(maks), pegangan: Math.round(geserPegangan), bergerak, viewBox: vb0 !== (svg.getAttribute && svg.getAttribute('viewBox')), kendali: k0 !== k1, k0: k0.slice(0, 120), k1: k1.slice(0, 120) }
  }
  const hasil = {}
  for (const [nama, dx, dy] of [['kanan', 1, 0], ['kiri', -1, 0], ['atas', 0, -1], ['bawah', 0, 1]]) {
    hasil[nama] = await seret(dx, dy)
  }
  return JSON.stringify({ judul, indeks: INDEKS, jumlah: punya.length, jenis, kelas: (el.getAttribute('class') || '').slice(0, 24), hasil })
})()
