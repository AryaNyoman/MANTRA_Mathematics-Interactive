'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Kolom alat di halaman belajar layar lebar, dengan PENYESUAI TINGGI gambar
 * (ARYA 18 Sep 2026: saat kolom alat dilebarkan, gambar widget ikut membesar
 * sampai penggeser dan tabel angkanya terdorong keluar layar; saat kolom
 * disempitkan gambarnya kecil dan sulit dibaca; dua papan yang bertumpuk
 * harus terlihat bersama-sama dengan kendalinya).
 *
 * Semua widget MANTRA menggambar dengan lebar penuh kolom, dan tingginya
 * mengikuti lebar (SVG dengan viewBox). Di sini yang dijaga adalah TINGGINYA:
 * tinggi yang tersedia untuk gambar = tinggi kolom dikurangi kepala, kendali,
 * tabel angka, dan jaraknya. Kalau gambar pada lebar penuh lebih tinggi dari
 * itu, lebar isi `.layar` dikecilkan secukupnya (gambarnya menyusut di
 * tengah) supaya gambar, penggeser, dan tabel muat sekaligus tanpa gulir.
 * Tiga tingkat, diputuskan dari pengukuran 18 Sep 2026 (survei semua widget:
 * `node alat/survei_alat.mjs`):
 * 1. Kalau semuanya muat dengan gambar yang masih selebar LEBAR_TERBACA
 *    piksel atau lebih, gambar dikecilkan secukupnya (Turunan 03 di
 *    1920 x 937: 411 px, gambar, penggeser, dan tabel angka terlihat sekaligus
 *    tanpa gulir). Batasnya piksel, bukan persen: huruf di gambar berukuran
 *    tetap dalam satuan gambar (lebar rancangan 460), jadi yang menentukan
 *    terbaca atau tidak adalah lebar piksel yang tergambar.
 * 2. Kalau muat pun tidak mungkin tanpa mengecilkan lebih jauh, gambar
 *    dibiarkan selebar kolom dan kendalinya menggulir di bawah gambar yang
 *    lengket: mengecilkan gambar yang tetap tidak memuat apa-apa hanya
 *    membuatnya sulit dibaca. Di laptop 1366 x 768 kolomnya 381 px, jadi
 *    gambar TIDAK PERNAH dikecilkan demi muat; kendali dan tabel menggulir.
 * 3. Kecuali kalau gambar selebar kolom kelewat tinggi sampai kendali
 *    pertamanya pun tersembunyi (dua papan penuh Turunan 05 sebelum
 *    papannya dipendekkan): gambar dikecilkan sampai menyisakan JEJAK_KENDALI
 *    piksel untuk kendali, tetapi tidak lebih kecil dari skala 0,6.
 *
 * Diukur ulang saat kolom berubah ukuran (jendela diubah, pembatas kolom
 * ditarik) dan saat tinggi kendali berubah. Isi `.layar` sendiri TIDAK
 * diamati: mengamatinya sambil mengubah lebarnya akan berputar tanpa henti.
 */
/** Lebar gambar (px) paling kecil yang masih dianggap terbaca saat dikecilkan demi muat. */
const LEBAR_TERBACA = 380
/** Batas bawah pengecilan saat gambar kelewat tinggi (tingkat 3). */
const SKALA_TERKECIL = 0.6
/** Tinggi (px) yang disisakan untuk kendali pertama di bawah gambar. */
const JEJAK_KENDALI = 150

export default function KolomAlat({ kunci, children }: { kunci: string; children: ReactNode }) {
  const akar = useRef<HTMLElement>(null)

  useEffect(() => {
    const kolom = akar.current
    if (!kolom) return
    let bingkai = 0
    const pas = () => {
      // kolom 500 px ke atas: kendali dan tabel angka berdampingan (globals.css)
      kolom.dataset.lebar = kolom.clientWidth >= 500 ? 'lebar' : 'sempit'
      const layar = kolom.querySelector<HTMLElement>(':scope > .layar')
      if (!layar) return
      // Isi kotak gambar: satu pembungkus, satu <svg>, atau BEBERAPA papan
      // yang bersaudara langsung di dalam kotak (Integral 02 dan 07 menaruh
      // dua papannya tanpa pembungkus). Semuanya diukur dan dikecilkan
      // bersama-sama.
      const isi = Array.from(layar.children) as HTMLElement[]
      if (isi.length === 0) return
      // ukur pada lebar alami dulu
      for (const a of isi) a.style.width = ''
      const gayaLayar = getComputedStyle(layar)
      const bingkaiLayar =
        parseFloat(gayaLayar.paddingTop) + parseFloat(gayaLayar.paddingBottom) +
        parseFloat(gayaLayar.borderTopWidth) + parseFloat(gayaLayar.borderBottomWidth) +
        parseFloat(gayaLayar.marginBottom)
      // Tinggi semua anak selain `.layar` dibaca dari letaknya di grid: dari
      // tepi atas anak pertama sampai tepi bawah (plus margin) anak terakhir,
      // dikurangi kotak gambar. Dengan begitu kendali dan tabel yang
      // berdampingan, atau kendali yang membentang dua baris (kolom lebar),
      // terhitung sekali, setinggi yang sebenarnya dipakai.
      let atas = Infinity
      let bawah = 0
      for (const anak of Array.from(kolom.children)) {
        const el = anak as HTMLElement
        const g = getComputedStyle(el)
        atas = Math.min(atas, el.offsetTop - parseFloat(g.marginTop))
        bawah = Math.max(bawah, el.offsetTop + el.offsetHeight + parseFloat(g.marginBottom))
      }
      const lain = bawah - atas - (layar.offsetHeight + parseFloat(gayaLayar.marginTop) + parseFloat(gayaLayar.marginBottom))
      const gayaKolom = getComputedStyle(kolom)
      const tinggiKolom = kolom.clientHeight - parseFloat(gayaKolom.paddingTop) - parseFloat(gayaKolom.paddingBottom)
      const tersedia = tinggiKolom - lain - bingkaiLayar
      // Lebar dari kotak isi pertama (getBoundingClientRect, bukan
      // offsetWidth: <svg> tidak punya offsetWidth, dan karena itu widget
      // berpapan satu sempat tidak pernah dikecilkan). Tinggi dari
      // scrollHeight kotak gambar: itu tinggi SELURUH isinya, berapa pun
      // papannya, termasuk jarak di antaranya.
      const lebar = isi[0].getBoundingClientRect().width
      const tinggi = layar.scrollHeight - parseFloat(gayaLayar.paddingTop) - parseFloat(gayaLayar.paddingBottom)
      let target = 0
      if (tinggi > 0 && lebar > 0 && tinggi > tersedia) {
        if ((lebar * tersedia) / tinggi >= LEBAR_TERBACA) {
          target = tersedia
        } else {
          // yang di atas kotak gambar (kepala alat) ikut memakan tinggi kolom
          const diAtas = layar.offsetTop - parseFloat(gayaLayar.marginTop) - atas
          const batas = tinggiKolom - diAtas - bingkaiLayar - JEJAK_KENDALI
          if (tinggi > batas) target = Math.max(batas, tinggi * SKALA_TERKECIL)
        }
      }
      for (const a of isi) {
        if (target > 0) {
          // dikurangi 1 px: pembulatan tinggi SVG sempat menyisakan gulir 1 px
          a.style.width = `${Math.max(220, Math.floor((lebar * target) / tinggi) - 1)}px`
          a.style.marginLeft = 'auto'
          a.style.marginRight = 'auto'
        } else {
          a.style.marginLeft = ''
          a.style.marginRight = ''
        }
      }
    }
    const jadwalkan = () => {
      cancelAnimationFrame(bingkai)
      bingkai = requestAnimationFrame(pas)
    }
    jadwalkan()
    const pengamat = new ResizeObserver(jadwalkan)
    pengamat.observe(kolom)
    for (const anak of Array.from(kolom.children)) {
      if (!anak.classList.contains('layar')) pengamat.observe(anak)
    }
    return () => {
      cancelAnimationFrame(bingkai)
      pengamat.disconnect()
    }
  }, [kunci])

  return (
    <aside ref={akar} className="kolom alat" aria-label="Alat interaktif">
      {children}
    </aside>
  )
}
