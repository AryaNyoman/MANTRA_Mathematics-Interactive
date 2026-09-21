/**
 * Ekspor riwayat Asisten Tanya menjadi berkas PDF di peramban (keputusan ARYA
 * 21 Sep 2026: berkas langsung, bukan dialog cetak). Elemen yang sudah
 * tertata (rumus KaTeX ikut) difoto html2canvas menjadi kanvas, lalu dipotong
 * per halaman A4 ke jsPDF. Hasilnya gambar, bukan teks yang bisa disalin,
 * tetapi setiap rumus tampil persis seperti di layar; pustaka teks murni
 * merusak KaTeX. Kedua pustaka dimuat saat tombolnya ditekan saja
 * (import dinamis), jadi halaman materi tidak menanggung 600 KB itu.
 */

const A4 = { lebar: 210, tinggi: 297 } // mm
const TEPI = 12 // mm

export async function eksporPdf(elemen: HTMLElement, namaBerkas: string): Promise<void> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import('html2canvas'), import('jspdf')])
  const kanvas = await html2canvas(elemen, {
    scale: 2,
    backgroundColor: '#FFFFFF',
    useCORS: true,
    logging: false,
    windowWidth: elemen.scrollWidth,
  })
  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
  const lebarIsi = A4.lebar - TEPI * 2
  const tinggiIsi = A4.tinggi - TEPI * 2
  // tinggi kanvas (px) yang muat di satu halaman, pada skala lebar penuh
  const pxPerMm = kanvas.width / lebarIsi
  const tinggiHalamanPx = Math.floor(tinggiIsi * pxPerMm)
  let y = 0
  let halaman = 0
  while (y < kanvas.height) {
    const potong = Math.min(tinggiHalamanPx, kanvas.height - y)
    const irisan = document.createElement('canvas')
    irisan.width = kanvas.width
    irisan.height = potong
    const ctx = irisan.getContext('2d')
    if (!ctx) break
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, irisan.width, irisan.height)
    ctx.drawImage(kanvas, 0, y, kanvas.width, potong, 0, 0, kanvas.width, potong)
    if (halaman > 0) pdf.addPage()
    pdf.addImage(irisan.toDataURL('image/jpeg', 0.9), 'JPEG', TEPI, TEPI, lebarIsi, potong / pxPerMm)
    pdf.setFontSize(9)
    pdf.setTextColor(120)
    pdf.text(`MANTRA · Asisten Tanya · halaman ${halaman + 1}`, A4.lebar - TEPI, A4.tinggi - 6, { align: 'right' })
    y += potong
    halaman++
  }
  pdf.save(namaBerkas)
}
